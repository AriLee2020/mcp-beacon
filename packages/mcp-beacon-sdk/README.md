# MCP Beacon SDK

**AI Agent Observability — monitor OpenAI, Anthropic, and DeepSeek agents with a single line of code.**

[![npm version](https://img.shields.io/npm/v/mcp-beacon)](https://www.npmjs.com/package/mcp-beacon)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- 🔌 **One-line setup** — `wrap(beacon, client)` and you're done
- 💰 **Cost tracking** — real-time token counting + model-aware pricing
- 🔁 **Loop detection** — Jaccard/LCS similarity to catch infinite loops
- 📡 **Async reporting** — non-blocking, batched, with offline cache
- 🌐 **HTTP monitoring** — optional fetch/axios wrappers
- 🤖 **Multi-provider** — OpenAI, Anthropic, DeepSeek, and custom

## Quick Start

```bash
npm install mcp-beacon
```

```typescript
import OpenAI from "openai";
import { createBeacon, wrap } from "mcp-beacon";

// 1. Create a Beacon instance
const beacon = createBeacon({
  endpoint: "https://mcpbeacon.asia",
  apiKey: "mb_live_xxx",
  agentId: "my-agent-1",
});

// 2. Wrap your LLM client
const openai = wrap(beacon, new OpenAI({ apiKey: "..." }));

// 3. Use your client normally — everything is tracked
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});

// 4. Shutdown when done
await beacon.shutdown();
```

## Supported Providers

| Provider  | SDK                | Wrapper              |
|-----------|--------------------|----------------------|
| OpenAI    | `openai` >= 4.x    | `wrap()` / `wrapOpenAI()` |
| Anthropic | `@anthropic-ai/sdk` >= 0.30 | `wrap()` / `wrapAnthropic()` |
| DeepSeek  | OpenAI-compatible  | `wrap()` / `wrapDeepSeek()` |
| HTTP      | fetch / axios      | `wrapFetch()` / `wrapAxios()` |

## API Reference

### `createBeacon(config)`

Creates a new Beacon monitoring instance.

```typescript
interface BeaconConfig {
  endpoint: string;       // MCP Beacon API endpoint
  apiKey: string;         // Project API key from dashboard
  agentId?: string;       // Agent identifier (auto-generated)
  flushIntervalMs?: number; // Default: 5000
  maxBufferSize?: number;   // Default: 100
  offlineCache?: boolean;   // Default: true
  maxRetries?: number;      // Default: 3
}
```

### `wrap(beacon, client)` → `client`

Auto-detects the provider type and wraps the client. Falls back to explicit wrappers for edge cases.

### Explicit Wrappers

```typescript
import { wrapOpenAI, wrapAnthropic, wrapDeepSeek, wrapFetch, wrapAxios } from "mcp-beacon";

wrapOpenAI(beacon, openaiClient);
wrapAnthropic(beacon, anthropicClient);
wrapDeepSeek(beacon, deepseekClient);

// HTTP monitoring
const unwrap = wrapFetch(beacon);
// ... make fetch calls ...
unwrap(); // restore original fetch

wrapAxios(beacon, axiosInstance);
```

### `beacon.getSession()`

Returns current session statistics:

```typescript
const stats = beacon.getSession();
// { inputTokens: 1234, outputTokens: 567, totalCost: 0.0042, requestCount: 5 }
```

### `beacon.shutdown()`

Flushes all pending events and stops the reporter. Call this before your process exits.

## Loop Detection (Experimental)

⚠️ **This is an experimental feature.** The loop detector uses Jaccard similarity and Longest Common Subsequence (LCS) heuristics to detect when agents get stuck in repetitive message patterns. False positives are expected — tune thresholds for your use case.

Alerts are sent automatically to the MCP Beacon dashboard when a loop is detected (≥85% Jaccard or ≥90% LCS similarity).

## Token Counting

Tokens are estimated using the **chars/4 heuristic** — not a precise tokenizer. This is intentional: it's fast, works offline, and requires no model-specific tokenizer libraries. Cost estimates use our built-in pricing table (updated regularly) for accurate billing calculations.

## Offline Support

When the network is unavailable, events are cached to `localStorage` and automatically replayed when connectivity is restored. No data is lost.

## License

MIT
