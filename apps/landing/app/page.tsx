import { grinders } from "@sip-club/core";

/**
 * Faithful port of design_handoff_coffee_drip/"Coffee Drip - Landing.dc.html".
 * Layout, colors, gradients, glow layers and structure match the HTML reference
 * 1:1; brand name is "Sip Club", body copy is Thai.
 */

const MONO = "var(--font-jetbrains-mono), 'JetBrains Mono', monospace";
const APP_HREF = "/app"; // TODO: point at the deployed Expo app entry

const heroGrinders = grinders.map((g) => g.name);

const allGear = [
  "Comandante C40",
  "Timemore C2 / C3",
  "Kingrinder K6",
  "1Zpresso JX / K-Max",
  "Fellow Ode Gen 2",
  "Baratza Encore",
  "DF64",
  "Mahlkönig X54",
  "Hario V60",
  "Kalita Wave 185",
  "Origami",
  "April",
  "Orea V3",
  "Chemex",
];

const featB = [
  {
    title: "ปรับสูตรจาก feedback ของคุณ",
    desc: "บอกว่ารสชาติเป็นยังไง ระบบปรับสูตรครั้งหน้าให้",
    icon: "dot" as const,
  },
  {
    title: "Calibrate เครื่องที่ไม่มีในระบบได้",
    desc: "ตั้งค่าเบอร์บดของเครื่องเองได้ แม้ไม่มีในฐานข้อมูล",
    icon: "square" as const,
  },
  {
    title: "ใช้ได้ทันทีไม่ต้องสมัครสมาชิก",
    desc: "เปิดแล้วใช้ได้เลย ไม่ต้องกรอกข้อมูล",
    icon: "diamond" as const,
  },
  {
    title: "เลือกร้อน เย็น หรือดริปกาแฟตามใจ",
    desc: "สูตรปรับตามวิธีที่คุณอยากชง",
    icon: "ring" as const,
  },
];

const steps = [
  {
    n: "01",
    title: "Setup เครื่องมือ",
    cta: "เลือกอุปกรณ์",
    desc: "เลือกเครื่องบดและดริปเปอร์ครั้งเดียว ระบบจำไว้ให้",
    items: ["เลือกจากเครื่องบด 12+ รุ่น", "เลือกดริปเปอร์ 6 แบบ", "calibrate เองได้ถ้าไม่มีในระบบ"],
    highlighted: false,
  },
  {
    n: "02",
    title: "ถ่ายรูปถุงกาแฟ",
    cta: "ถ่ายรูปเลย",
    desc: "AI อ่านข้อมูลบนถุงให้อัตโนมัติ",
    items: ["อ่าน roast level", "อ่าน processing method", "อ่านคำแนะนำถุงให้"],
    highlighted: true,
  },
  {
    n: "03",
    title: "ชงตาม timer guide",
    cta: "ดูตัวอย่าง",
    desc: "ทำตามจังหวะเท แล้วบอกเราว่ารสเป็นยังไง",
    items: ["timer ทีละรอบ", "ปรับสูตรครั้งหน้าจาก feedback", "บันทึกประวัติการชง"],
    highlighted: false,
  },
];

function FeatBIcon({ kind }: { kind: "dot" | "square" | "diamond" | "ring" }) {
  if (kind === "dot")
    return (
      <span
        style={{
          display: "block",
          width: 14,
          height: 14,
          border: "2px solid #b9a3ff",
          borderRadius: "50%",
          borderTopColor: "transparent",
          transform: "rotate(45deg)",
        }}
      />
    );
  if (kind === "square")
    return <span style={{ display: "block", width: 13, height: 13, borderRadius: 4, background: "#b9a3ff" }} />;
  if (kind === "diamond")
    return (
      <span style={{ display: "block", width: 13, height: 13, background: "#b9a3ff", transform: "rotate(45deg)", borderRadius: 2 }} />
    );
  return <span style={{ display: "block", width: 15, height: 15, border: "3px solid #b9a3ff", borderRadius: "50%" }} />;
}

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0712", overflow: "hidden" }}>
      {/* glow layers */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1100,
          height: 700,
          background: "radial-gradient(ellipse at center, rgba(167,139,250,.22), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          animation: "floatGlow 14s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 900,
          left: -150,
          width: 700,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(124,92,250,.16), transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "floatGlow 18s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1900,
          right: -200,
          width: 700,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(167,139,250,.14), transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "floatGlow 16s ease-in-out infinite",
        }}
      />

      {/* NAVBAR */}
      <div style={{ position: "sticky", top: 18, zIndex: 50, display: "flex", justifyContent: "center", padding: "0 24px" }}>
        <nav
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px 10px 22px",
            borderRadius: 999,
            background: "rgba(20,15,32,.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(167,139,250,.16)",
            boxShadow: "0 8px 40px rgba(0,0,0,.4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "linear-gradient(135deg,#b9a3ff,#7c5cfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(167,139,250,.5)",
              }}
            >
              <div style={{ width: 11, height: 11, border: "2px solid #160f24", borderRadius: "50%", borderTopColor: "transparent", transform: "rotate(45deg)" }} />
            </div>
            <span style={{ color: "#f5f3ff", fontWeight: 600, fontSize: 17, letterSpacing: "-.01em" }}>Sip Club</span>
          </div>
          <div style={{ display: "flex", gap: 30, alignItems: "center" }} className="nav-links">
            <a href="#features" style={{ color: "#9d94b0", textDecoration: "none", fontSize: 14.5 }}>ฟีเจอร์</a>
            <a href="#how" style={{ color: "#9d94b0", textDecoration: "none", fontSize: 14.5 }}>วิธีใช้งาน</a>
            <a href="#gear" style={{ color: "#9d94b0", textDecoration: "none", fontSize: 14.5 }}>เครื่องบดที่รองรับ</a>
            <a href="#contact" style={{ color: "#9d94b0", textDecoration: "none", fontSize: 14.5 }}>ติดต่อ</a>
          </div>
          <a
            href={APP_HREF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 9px 9px 18px",
              borderRadius: 999,
              background: "#ece8ff",
              color: "#160f24",
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            เริ่มใช้เลย
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#160f24", color: "#ece8ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</span>
          </a>
        </nav>
      </div>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 880, margin: "0 auto", padding: "96px 24px 70px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 16px 7px 8px", borderRadius: 999, background: "rgba(167,139,250,.06)", border: "1px solid rgba(167,139,250,.16)", marginBottom: 30 }}>
          <span style={{ display: "flex" }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(167,139,250,.18)", border: "1px solid rgba(167,139,250,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 9, height: 9, border: "1.5px solid #b9a3ff", borderRadius: "50%", borderTopColor: "transparent", transform: "rotate(45deg)" }} />
            </span>
            <span style={{ width: 22, height: 22, borderRadius: 6, marginLeft: -7, background: "rgba(167,139,250,.18)", border: "1px solid rgba(167,139,250,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "8px solid #b9a3ff" }} />
            </span>
          </span>
          <span style={{ color: "#c8bfdb", fontSize: 13.5 }}>รองรับเครื่องบด 12+ รุ่น เครื่องดริป 6 แบบ</span>
        </div>
        <h1 style={{ margin: 0, color: "#f5f3ff", fontSize: "clamp(40px,8vw,60px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-.02em" }}>
          ถ่ายรูปถุงกาแฟ
          <br />
          ได้สูตรดริป
          <span style={{ background: "linear-gradient(110deg,#d9cdff,#a78bfa 55%,#7c5cfa)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>ที่ใช่สำหรับคุณ</span>
        </h1>
        <p style={{ maxWidth: 560, margin: "26px auto 0", color: "#9d94b0", fontSize: 18, lineHeight: 1.6 }}>
          AI วิเคราะห์ roast, process แล้วคำนวณเบอร์บด อุณหภูมิ และจังหวะเทน้ำ ให้กับเครื่องที่คุณมีจริง
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 38, flexWrap: "wrap" }}>
          <a href={APP_HREF} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 999, background: "linear-gradient(135deg,#b9a3ff,#7c5cfa)", color: "#140d22", fontWeight: 600, fontSize: 15.5, textDecoration: "none", boxShadow: "0 8px 30px rgba(124,92,250,.4)" }}>
            <span style={{ width: 8, height: 8, border: "2px solid #140d22", borderRadius: 2 }} />
            ถ่ายรูปเริ่มต้น
          </a>
          <a href="#features" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 26px", borderRadius: 999, background: "rgba(167,139,250,.07)", border: "1px solid rgba(167,139,250,.2)", color: "#e9e4f7", fontWeight: 500, fontSize: 15.5, textDecoration: "none" }}>
            ดูตัวอย่างสูตร
          </a>
        </div>
        <p style={{ color: "#6f667e", fontSize: 13, marginTop: 40, letterSpacing: ".04em" }}>รองรับเครื่องบดยอดนิยม</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 16 }}>
          {heroGrinders.map((g) => (
            <span key={g} style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(167,139,250,.05)", border: "1px solid rgba(167,139,250,.12)", color: "#b3a9c6", fontSize: 13.5, fontFamily: MONO }}>{g}</span>
          ))}
        </div>
      </section>

      {/* FEATURES A */}
      <section id="features" style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 999, background: "rgba(167,139,250,.07)", border: "1px solid rgba(167,139,250,.16)", color: "#b9a3ff", fontSize: 13, fontWeight: 500, marginBottom: 18 }}>ความสามารถหลัก</span>
          <h2 style={{ margin: 0, color: "#f5f3ff", fontSize: 40, fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.15 }}>จากถุงกาแฟ <span style={{ color: "#6f667e" }}>สู่แก้วที่ใช่</span></h2>
          <p style={{ maxWidth: 480, margin: "16px auto 0", color: "#9d94b0", fontSize: 16 }}>ทุกอย่างคำนวณจากอุปกรณ์จริงของคุณ ไม่ใช่สูตรกลางๆ ที่ไม่เข้ากับเครื่องคุณ</p>
        </div>
        <div className="grid-3">
          {/* card 1 */}
          <div style={{ borderRadius: 22, background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.13)", padding: 22, backdropFilter: "blur(8px)" }}>
            <div style={{ height: 184, borderRadius: 14, background: "linear-gradient(160deg,rgba(124,92,250,.12),rgba(20,15,32,.4))", border: "1px solid rgba(167,139,250,.1)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ width: 80, height: 120, borderRadius: "8px 8px 4px 4px", background: "rgba(40,30,58,.8)", border: "1px solid rgba(167,139,250,.2)", position: "relative" }}>
                <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 30, height: 5, borderRadius: 3, background: "rgba(167,139,250,.3)" }} />
                <div style={{ position: "absolute", top: 34, left: 12, right: 12, height: 6, borderRadius: 3, background: "rgba(167,139,250,.18)" }} />
                <div style={{ position: "absolute", top: 48, left: 12, right: 24, height: 6, borderRadius: 3, background: "rgba(167,139,250,.12)" }} />
              </div>
              <div style={{ position: "absolute", inset: "32px 26px", border: "1.5px dashed rgba(185,163,255,.7)", borderRadius: 8 }} />
              <span style={{ position: "absolute", top: 24, left: 26, fontFamily: MONO, fontSize: 10, color: "#b9a3ff", background: "rgba(20,15,32,.85)", padding: "2px 6px", borderRadius: 5 }}>roast 94%</span>
              <span style={{ position: "absolute", bottom: 18, right: 22, fontFamily: MONO, fontSize: 10, color: "#b9a3ff", background: "rgba(20,15,32,.85)", padding: "2px 6px", borderRadius: 5 }}>washed</span>
            </div>
            <h3 style={{ margin: "18px 0 8px", color: "#f5f3ff", fontSize: 18.5, fontWeight: 600 }}>AI อ่านถุงกาแฟให้</h3>
            <p style={{ margin: 0, color: "#9d94b0", fontSize: 14.5, lineHeight: 1.55 }}>ถ่ายรูปถุงกาแฟครั้งเดียว ระบบอ่าน roast level, processing method และ origin ให้อัตโนมัติ อ่านค่าเฉพาะถุงให้ได้เลย</p>
          </div>

          {/* card 2 */}
          <div style={{ borderRadius: 22, background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.13)", padding: 22, backdropFilter: "blur(8px)" }}>
            <div style={{ height: 184, borderRadius: 14, background: "linear-gradient(160deg,rgba(124,92,250,.12),rgba(20,15,32,.4))", border: "1px solid rgba(167,139,250,.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: MONO, fontSize: 30, color: "#f5f3ff", fontWeight: 600 }}>22</div>
                  <div style={{ fontSize: 11, color: "#9d94b0", marginTop: 2 }}>Comandante</div>
                </div>
                <span style={{ color: "#b9a3ff", fontSize: 22 }}>→</span>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: MONO, fontSize: 30, color: "#b9a3ff", fontWeight: 600 }}>15</div>
                  <div style={{ fontSize: 11, color: "#9d94b0", marginTop: 2 }}>Baratza Encore</div>
                </div>
              </div>
              <div style={{ width: 140, height: 1, background: "rgba(167,139,250,.18)" }} />
              <div style={{ fontFamily: MONO, fontSize: 11, color: "#7d738f" }}>เบอร์บดเทียบกัน ทุกละเอียดเครื่อง</div>
            </div>
            <h3 style={{ margin: "18px 0 8px", color: "#f5f3ff", fontSize: 18.5, fontWeight: 600 }}>คำนวณเบอร์บดให้ตรงเครื่องคุณ</h3>
            <p style={{ margin: 0, color: "#9d94b0", fontSize: 14.5, lineHeight: 1.55 }}>เลือกเครื่องบดที่คุณมี แล้วระบบแปลงเบอร์บดเป็นคลิก/สเกลของเครื่องนั้นเลย ไม่ต้องเดาเอง</p>
          </div>

          {/* card 3 */}
          <div style={{ borderRadius: 22, background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.13)", padding: 22, backdropFilter: "blur(8px)" }}>
            <div style={{ height: 184, borderRadius: 14, background: "linear-gradient(160deg,rgba(124,92,250,.12),rgba(20,15,32,.4))", border: "1px solid rgba(167,139,250,.1)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                  <div style={{ position: "absolute", left: 8, right: 8, top: 7, height: 2, background: "rgba(167,139,250,.18)" }} />
                  <div style={{ position: "absolute", left: 8, width: "46%", top: 7, height: 2, background: "linear-gradient(90deg,#b9a3ff,#7c5cfa)" }} />
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#b9a3ff", zIndex: 1, boxShadow: "0 0 12px #b9a3ff" }} />
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#b9a3ff", zIndex: 1, boxShadow: "0 0 12px #b9a3ff" }} />
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(40,30,58,.9)", border: "2px solid rgba(167,139,250,.3)", zIndex: 1 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                  <div style={{ textAlign: "center" }}><div style={{ fontFamily: MONO, color: "#f5f3ff", fontSize: 14 }}>0:00</div><div style={{ fontSize: 10.5, color: "#9d94b0" }}>bloom 45g</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontFamily: MONO, color: "#f5f3ff", fontSize: 14 }}>0:45</div><div style={{ fontSize: 10.5, color: "#9d94b0" }}>เท→150g</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontFamily: MONO, color: "#9d94b0", fontSize: 14 }}>1:30</div><div style={{ fontSize: 10.5, color: "#7d738f" }}>เท→250g</div></div>
                </div>
              </div>
            </div>
            <h3 style={{ margin: "18px 0 8px", color: "#f5f3ff", fontSize: 18.5, fontWeight: 600 }}>Timer guide ทีละรอบ</h3>
            <p style={{ margin: 0, color: "#9d94b0", fontSize: 14.5, lineHeight: 1.55 }}>บอกจังหวะเทน้ำทีละรอบตามสูตรจริง พร้อมปริมาณน้ำและเวลา ไม่ต้องจดโพยติดผนัง</p>
          </div>
        </div>
      </section>

      {/* FEATURES B */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto", padding: "50px 24px" }}>
        <div className="grid-4">
          {featB.map((f) => (
            <div key={f.title} style={{ borderRadius: 20, background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.12)", padding: "26px 22px", textAlign: "center" }}>
              <div style={{ width: 54, height: 54, margin: "0 auto 18px", borderRadius: 15, background: "rgba(167,139,250,.1)", border: "1px solid rgba(167,139,250,.22)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(167,139,250,.18)" }}>
                <FeatBIcon kind={f.icon} />
              </div>
              <h3 style={{ margin: "0 0 8px", color: "#f5f3ff", fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{f.title}</h3>
              <p style={{ margin: 0, color: "#9d94b0", fontSize: 13.5, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW / STEPS */}
      <section id="how" style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 999, background: "rgba(167,139,250,.07)", border: "1px solid rgba(167,139,250,.16)", color: "#b9a3ff", fontSize: 13, fontWeight: 500, marginBottom: 18 }}>วิธีใช้งาน</span>
          <h2 style={{ margin: 0, color: "#f5f3ff", fontSize: 40, fontWeight: 600, letterSpacing: "-.02em" }}>3 ขั้นตอน <span style={{ color: "#6f667e" }}>เริ่มดริปได้เลย</span></h2>
        </div>
        <div className="grid-3" style={{ alignItems: "start" }}>
          {steps.map((s) => (
            <div
              key={s.n}
              style={
                s.highlighted
                  ? { borderRadius: 22, background: "linear-gradient(180deg,rgba(124,92,250,.16),rgba(167,139,250,.04))", border: "1px solid rgba(167,139,250,.32)", padding: "30px 26px", boxShadow: "0 0 50px rgba(124,92,250,.22)" }
                  : { borderRadius: 22, background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.13)", padding: "30px 26px" }
              }
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 13px", borderRadius: 999, background: "rgba(167,139,250,.1)", border: "1px solid rgba(167,139,250,.22)", color: "#b9a3ff", fontSize: 12, fontWeight: 500, fontFamily: MONO }}>STEP {s.n}</span>
              <div style={{ fontFamily: MONO, fontSize: 46, color: "#f5f3ff", fontWeight: 600, margin: "22px 0 4px" }}>{s.n}</div>
              <h3 style={{ margin: "0 0 8px", color: "#f5f3ff", fontSize: 21, fontWeight: 600 }}>{s.title}</h3>
              <p style={{ margin: "0 0 20px", color: "#9d94b0", fontSize: 14.5, lineHeight: 1.55 }}>{s.desc}</p>
              <a
                href={APP_HREF}
                style={
                  s.highlighted
                    ? { display: "block", textAlign: "center", padding: 12, borderRadius: 12, background: "linear-gradient(135deg,#b9a3ff,#7c5cfa)", color: "#140d22", fontWeight: 600, fontSize: 14.5, textDecoration: "none", marginBottom: 22 }
                    : { display: "block", textAlign: "center", padding: 12, borderRadius: 12, background: "rgba(167,139,250,.08)", border: "1px solid rgba(167,139,250,.2)", color: "#e9e4f7", fontWeight: 600, fontSize: 14.5, textDecoration: "none", marginBottom: 22 }
                }
              >
                {s.cta}
              </a>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.items.map((it) => (
                  <div key={it} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: "none", width: 19, height: 19, borderRadius: "50%", background: "rgba(167,139,250,.16)", border: "1px solid rgba(167,139,250,.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b9a3ff", fontSize: 11 }}>✓</span>
                    <span style={{ color: "#c0b7d1", fontSize: 14 }}>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GEAR strip */}
      <section id="gear" style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto", padding: "30px 24px 60px" }}>
        <div style={{ borderRadius: 22, background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.12)", padding: 34, textAlign: "center" }}>
          <h3 style={{ margin: "0 0 6px", color: "#f5f3ff", fontSize: 22, fontWeight: 600 }}>เครื่องบดและดริปเปอร์ที่รองรับ</h3>
          <p style={{ margin: "0 0 22px", color: "#9d94b0", fontSize: 14.5 }}>ไม่มีเครื่องของคุณในรายการ? calibrate เองได้ในไม่กี่นาที</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {allGear.map((g) => (
              <span key={g} style={{ padding: "8px 15px", borderRadius: 999, background: "rgba(20,15,32,.5)", border: "1px solid rgba(167,139,250,.1)", color: "#b3a9c6", fontSize: 13, fontFamily: MONO }}>{g}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto", padding: "30px 24px 80px" }}>
        <div style={{ borderRadius: 34, padding: "72px 32px", textAlign: "center", background: "radial-gradient(ellipse at top, rgba(124,92,250,.28), rgba(20,15,32,.6))", border: "1px solid rgba(167,139,250,.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse,rgba(167,139,250,.3),transparent 70%)", filter: "blur(30px)" }} />
          <span style={{ position: "relative", display: "inline-block", padding: "6px 14px", borderRadius: 999, background: "rgba(167,139,250,.12)", border: "1px solid rgba(167,139,250,.25)", color: "#cabfff", fontSize: 13, fontWeight: 500, marginBottom: 22 }}>เริ่มต้นฟรี</span>
          <h2 style={{ position: "relative", margin: "0 0 16px", color: "#f5f3ff", fontSize: 44, fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.12 }}>พร้อมชงกาแฟแก้วที่ใช่<br />ของคุณหรือยัง</h2>
          <p style={{ position: "relative", maxWidth: 440, margin: "0 auto 34px", color: "#bcb3cf", fontSize: 16.5 }}>ไม่ต้องสมัครสมาชิก เปิดแล้วถ่ายรูปถุงกาแฟได้เลย</p>
          <div style={{ position: "relative", display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={APP_HREF} style={{ display: "flex", alignItems: "center", gap: 10, padding: "15px 30px", borderRadius: 999, background: "linear-gradient(135deg,#cabfff,#a78bfa)", color: "#140d22", fontWeight: 600, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 30px rgba(124,92,250,.45)" }}>เริ่มต้นใช้งานฟรี</a>
            <a href="#features" style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 30px", borderRadius: 999, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.16)", color: "#f0ecfb", fontWeight: 500, fontSize: 16, textDecoration: "none" }}>ดู demo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 10, background: "#c4acfb" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 28px" }}>
          <div className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "#1c1330", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 11, height: 11, border: "2px solid #c4acfb", borderRadius: "50%", borderTopColor: "transparent", transform: "rotate(45deg)" }} />
                </div>
                <span style={{ color: "#1c1330", fontWeight: 700, fontSize: 18 }}>Sip Club</span>
              </div>
              <p style={{ margin: 0, color: "#3d2d63", fontSize: 14, lineHeight: 1.6, maxWidth: 240 }}>ผู้ช่วยของคนชงกาแฟดริปที่คำนวณสูตรจากอุปกรณ์จริงของคุณ</p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 14px", color: "#1c1330", fontSize: 14, fontWeight: 700 }}>Product</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="#features" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>ฟีเจอร์</a>
                <a href="#gear" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>เครื่องบดที่รองรับ</a>
                <a href="#gear" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>ดริปเปอร์ที่รองรับ</a>
              </div>
            </div>
            <div>
              <h4 style={{ margin: "0 0 14px", color: "#1c1330", fontSize: 14, fontWeight: 700 }}>Resources</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="#" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>คู่มือ calibrate เครื่องบด</a>
                <a href="#" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>คำถามที่พบบ่อย</a>
              </div>
            </div>
            <div>
              <h4 style={{ margin: "0 0 14px", color: "#1c1330", fontSize: 14, fontWeight: 700 }}>Company</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="#" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>เกี่ยวกับเรา</a>
                <a href="#contact" style={{ color: "#42326a", textDecoration: "none", fontSize: 14 }}>ติดต่อ</a>
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: "rgba(28,19,48,.15)", margin: "34px 0 20px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ color: "#42326a", fontSize: 13 }}>© 2026 Sip Club · สงวนลิขสิทธิ์</span>
            <div style={{ display: "flex", gap: 22 }}>
              <a href="#" style={{ color: "#42326a", textDecoration: "none", fontSize: 13 }}>นโยบายความเป็นส่วนตัว</a>
              <a href="#" style={{ color: "#42326a", textDecoration: "none", fontSize: 13 }}>ข้อตกลงการใช้งาน</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
