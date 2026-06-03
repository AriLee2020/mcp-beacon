# 一行代码监控你的 AI Agent：开源 SDK MCP Beacon 实战

> 用 DeepSeek、OpenAI、Claude 做 AI Agent 的开发者，都逃不开一个问题：**花了多少钱、调了多少次、有没有异常循环？** MCP Beacon 用一行 `wrap()` 解决所有监控，开源免费，5 分钟接入。

---

## 为什么需要它？

| 痛点 | MCP Beacon 方案 |
|------|----------------|
| 不知道花了多少钱 | 实时 Token 统计 + 模型定价表 |
| Agent 陷入死循环 | Jaccard/LCS 相似度检测，自动告警 |
| 调试全靠 print | Dashboard 可视化 Traces、Sessions |
| 多平台分散 | 统一 SDK 支持 OpenAI / Anthropic / DeepSeek / HTTP |

**一行代码，全自动。**

---

## 3 步接入

### 1. 安装

```bash
npm install mcp-beacon
```

### 2. 注册项目

打开 [mcpbeacon.asia](https://mcpbeacon.asia)，邮箱登录，创建项目，复制 API Key。

### 3. 包裹你的 LLM 客户端

```ts
import { createBeacon, wrap } from "mcp-beacon";
import OpenAI from "openai";

const beacon = createBeacon({
  endpoint: "https://mcpbeacon.asia",
  apiKey: "mb_xxxxx",  // 从 Dashboard 复制
  agentId: "my-agent",
});

//   只用一行 wrap，所有调用自动追踪
const ai = wrap(beacon, new OpenAI({
  apiKey: process.env.DEEPSEEK_KEY,
  baseURL: "https://api.deepseek.com",
}));

// 正常使用，完全透明
const r = await ai.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "Hello!" }],
});

await beacon.shutdown(); // 优雅退出，刷送缓存
```

**就这么简单。** Dashboard 立刻显示：

- 📊 Token 消耗、成本（精确到 6 位小数）
- ⏱ 每次调用延迟
- 🔁 循环检测告警
- 📈 按 Agent / Model 聚合统计

---

## 支持平台

| 平台 | SDK | 接入方式 |
|------|-----|---------|
| OpenAI | `openai` ≥4.x | `wrap()` 自动检测 |
| Anthropic | `@anthropic-ai/sdk` | `wrap()` 自动检测 |
| DeepSeek | OpenAI 兼容 | `wrap()` + `baseURL` |
| 任意 HTTP | `fetch` / `axios` | `wrapFetch()` / `wrapAxios()` |

---

## 开源 & 免费

- **GitHub:** [github.com/AriLee2020/mcp-beacon](https://github.com/AriLee2020/mcp-beacon)
- **npm:** `mcp-beacon`
- **完全免费，无用量限制**

---

## 适合谁？

- 用 AI API 做产品的独立开发者
- 做 Multi-Agent 系统的团队
- 部署了 AI Agent 想了解实际消耗的创业者
- 想检测 Agent 是否陷入诡异循环的任何人

**一行 `wrap()`，告别猜成本、找 bug、人工盯盘。**
