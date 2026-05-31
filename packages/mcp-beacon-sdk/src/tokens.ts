import { MODEL_PRICING } from "./types";

/**
 * Estimate token count using chars/4 heuristic.
 * This is a rough approximation — not a precise tokenizer.
 */
export function estimateTokens(content: unknown): number {
  if (typeof content === "string") {
    return Math.ceil(content.length / 4);
  }
  if (Array.isArray(content)) {
    return content.reduce((sum, item) => sum + estimateTokensItem(item), 0);
  }
  if (typeof content === "object" && content !== null) {
    return estimateTokens(JSON.stringify(content));
  }
  return 0;
}

function estimateTokensItem(item: unknown): number {
  if (typeof item === "string") return Math.ceil(item.length / 4);
  if (typeof item === "object" && item !== null) {
    const msg = item as Record<string, unknown>;
    if (msg.content) return estimateTokens(msg.content);
    return estimateTokens(JSON.stringify(item));
  }
  return 0;
}

/**
 * Estimate cost for a model based on chars/4 token count.
 */
export function estimateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = MODEL_PRICING[model];
  if (!pricing) {
    // Unknown model — default to gpt-4o-mini pricing
    return (inputTokens / 1000) * 0.00015 + (outputTokens / 1000) * 0.0006;
  }
  return (inputTokens / 1000) * pricing.input + (outputTokens / 1000) * pricing.output;
}
