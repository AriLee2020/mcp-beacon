# 🔦 MCP Beacon

**AI Agent Observability — monitor OpenAI, Anthropic, and DeepSeek agents with a single line of code.**

[![npm version](https://img.shields.io/npm/v/mcp-beacon)](https://www.npmjs.com/package/mcp-beacon)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

👉 **[mcpbeacon.asia](https://mcpbeacon.asia)** — Free dashboard

---

## 🚀 Quick Start

```bash
npm install mcp-beacon
```

```ts
import { createBeacon, wrap } from "mcp-beacon";
import OpenAI from "openai";

const beacon = createBeacon({
  endpoint: "https://mcpbeacon.asia",
  apiKey: "mb_xxxxx",
  agentId: "my-agent",
});

//    One line — full observability
const ai = wrap(beacon, new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://api.deepseek.com",
}));

const r = await ai.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "Hi!" }],
});

await beacon.shutdown();
```

Dashboard shows real-time tokens, cost, latency, traces.

---

## ✨ Features

- 🔌 **One-line setup** — `wrap(beacon, client)` and done
- 💰 **Real-time cost** — token counting + model-aware pricing
- 🔁 **Loop detection** — Jaccard/LCS similarity (experimental)
- 📡 **Async reporting** — non-blocking, batched, offline cache
- 🌐 **HTTP monitoring** — fetch/axios wrappers
- 🤖 **Multi-provider** — OpenAI, Anthropic, DeepSeek, custom

---

## 📊 Supported Providers

| Provider  | SDK                | Wrapper              |
|-----------|--------------------|----------------------|
| OpenAI    | `openai` ≥4.x      | `wrap()`             |
| Anthropic | `@anthropic-ai/sdk`| `wrap()`             |
| DeepSeek  | OpenAI-compatible  | `wrap()` + baseURL   |
| HTTP      | fetch / axios      | `wrapFetch()` / `wrapAxios()` |

---

## 🔧 Local Development

```bash
# Dashboard (Next.js)
npm install
npm run dev

# SDK
cd packages/mcp-beacon-sdk
npm install
npm run build
```

---

## 📄 License

MIT — free to use, modify, distribute.
