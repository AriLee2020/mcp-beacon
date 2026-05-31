// MCP Beacon — AI Agent Observability SDK
//
// Monitor OpenAI, Anthropic, and DeepSeek agents with a single line of code.

import { Beacon } from "./beacon";
import { wrapOpenAI } from "./wrappers/openai";
import { wrapAnthropic } from "./wrappers/anthropic";
import { wrapDeepSeek } from "./wrappers/deepseek";
import { wrapFetch, wrapAxios } from "./wrappers/http";
import type { BeaconConfig, BeaconEvent, LLMEvent, HTTPEvent, LoopAlert } from "./types";
import { MODEL_PRICING } from "./types";

// Re-export tokens module functions
export { estimateTokens } from "./tokens";
export { estimateCost } from "./tokens";

export { MODEL_PRICING };

export type { BeaconConfig, BeaconEvent, LLMEvent, HTTPEvent, LoopAlert };

/**
 * Create a new Beacon instance.
 *
 * @example
 * ```ts
 * import { createBeacon } from 'mcp-beacon';
 *
 * const beacon = createBeacon({
 *   endpoint: 'https://api.mcpbeacon.dev',
 *   apiKey: 'mb_live_xxx',
 *   agentId: 'my-agent-1',
 * });
 * ```
 */
export function createBeacon(config: BeaconConfig): Beacon {
  return new Beacon(config);
}

/**
 * Wrap a client for monitoring. Auto-detects provider type.
 *
 * @example
 * ```ts
 * import OpenAI from 'openai';
 * import Anthropic from '@anthropic-ai/sdk';
 * import { createBeacon, wrap } from 'mcp-beacon';
 *
 * const beacon = createBeacon({ endpoint: '...', apiKey: '...' });
 *
 * const openai = wrap(beacon, new OpenAI({ apiKey: '...' }));
 * const anthropic = wrap(beacon, new Anthropic({ apiKey: '...' }));
 * ```
 */
export function wrap(beacon: Beacon, client: unknown): unknown {
  const c = client as Record<string, unknown>;

  // OpenAI / DeepSeek detection (chat.completions.create)
  if (c.chat && typeof c.chat === "object") {
    const chat = c.chat as Record<string, unknown>;
    if (chat.completions && typeof chat.completions === "object") {
      const completions = chat.completions as Record<string, unknown>;
      if (typeof completions.create === "function") {
        // Check if it's likely DeepSeek (baseURL contains deepseek)
        const baseURL = (c.baseURL as string) || "";
        if (baseURL.includes("deepseek")) {
          return wrapDeepSeek(beacon, client as Parameters<typeof wrapDeepSeek>[1]);
        }
        return wrapOpenAI(beacon, client as Parameters<typeof wrapOpenAI>[1]);
      }
    }
  }

  // Anthropic detection (messages.create)
  if (c.messages && typeof c.messages === "object") {
    const messages = c.messages as Record<string, unknown>;
    if (typeof messages.create === "function") {
      return wrapAnthropic(beacon, client as Parameters<typeof wrapAnthropic>[1]);
    }
  }

  throw new Error(
    "Unsupported client type. Use explicit wrappers: wrapOpenAI, wrapAnthropic, wrapDeepSeek, wrapFetch, or wrapAxios.",
  );
}

// Explicit wrappers
export { wrapOpenAI, wrapAnthropic, wrapDeepSeek, wrapFetch, wrapAxios };

// Beacon class for advanced usage
export { Beacon };
