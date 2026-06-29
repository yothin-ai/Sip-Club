import { adjustments, feedbackTaxonomy } from "./data";

/**
 * Combines adjustment text for the currently selected feedback tag ids.
 * Per README.md section 7: "perfect" is mutually exclusive — if present,
 * it is the only tag that can be selected, so its text is returned alone.
 * For normal (non-exclusive) tags, each tag's adjustment text is concatenated.
 */
export function getAdjustmentText(selectedTagIds: string[]): string {
  if (selectedTagIds.length === 0) return "";

  const exclusiveIds = new Set(
    feedbackTaxonomy.filter((tag) => tag.exclusive).map((tag) => tag.id)
  );

  const selectedExclusive = selectedTagIds.find((id) => exclusiveIds.has(id));
  if (selectedExclusive) {
    return adjustments[selectedExclusive] ?? "";
  }

  return selectedTagIds
    .map((id) => adjustments[id])
    .filter((text): text is string => Boolean(text))
    .join(" ");
}
