// Supabase Edge Function: analyze-bag
//
// Receives a coffee bag photo, calls the Claude vision API server-side, and returns
// { roast, process, origin, confidence }. Per design_handoff_coffee_drip/README.md
// section 3 ("AI bag analysis: Claude vision API, called only from a Supabase Edge
// Function (never from client)") and PROMPTS.md Stage 5.
//
// This file is Deno source for Supabase Edge Functions — it is deployed separately
// via `supabase functions deploy analyze-bag` and is NOT built/bundled by the
// pnpm monorepo's normal install/build/typecheck. apps/mobile's photo-scan screen
// still uses a client-side mock (see context/AppContext.tsx) until this function
// is actually deployed and wired up; see the TODO there.
//
// Required secret (set via `supabase secrets set ANTHROPIC_API_KEY=...`, never
// committed or hardcoded):
//   ANTHROPIC_API_KEY

// deno-lint-ignore-file no-explicit-any
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const CLAUDE_MODEL = "claude-sonnet-4-5";

interface AnalyzeBagRequest {
  /** Base64-encoded image data (no data: URL prefix). */
  imageBase64: string;
  /** e.g. "image/jpeg" | "image/png" | "image/webp" */
  mediaType: string;
}

interface AnalyzeBagResponse {
  roast: string;
  process: string;
  origin: string;
  confidence: {
    roast: number;
    process: number;
    origin: number;
  };
}

const ANALYSIS_PROMPT = `You are analyzing a photo of a specialty coffee bag label.
Identify the roast level, processing method, and origin printed or implied on the label.
Respond with ONLY a JSON object, no markdown fences, in exactly this shape:
{
  "roast": "Light" | "Medium-light" | "Medium" | "Medium-dark" | "Dark",
  "process": "Washed" | "Natural" | "Honey" | "Anaerobic",
  "origin": string,
  "confidence": { "roast": number, "process": number, "origin": number }
}
Confidence values are 0..1. If a field is not visible/inferable, make your best guess
and lower its confidence accordingly.`;

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

async function callClaudeVision(
  apiKey: string,
  imageBase64: string,
  mediaType: string
): Promise<AnalyzeBagResponse> {
  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: ANALYSIS_PROMPT,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Claude API error (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as {
    content: Array<{ type: string; text?: string }>;
  };

  const textBlock = data.content.find((block) => block.type === "text");
  if (!textBlock?.text) {
    throw new Error("Claude response did not include a text block");
  }

  let parsed: AnalyzeBagResponse;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch {
    throw new Error(`Failed to parse Claude response as JSON: ${textBlock.text}`);
  }

  return parsed;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return jsonResponse(
      { error: "Server misconfigured: ANTHROPIC_API_KEY secret is not set" },
      500
    );
  }

  let body: AnalyzeBagRequest;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body.imageBase64 || !body.mediaType) {
    return jsonResponse(
      { error: "Request must include imageBase64 and mediaType" },
      400
    );
  }

  try {
    const result = await callClaudeVision(apiKey, body.imageBase64, body.mediaType);
    return jsonResponse(result, 200);
  } catch (err: any) {
    console.error("analyze-bag failed:", err?.message ?? err);
    return jsonResponse({ error: "Bag analysis failed" }, 502);
  }
});
