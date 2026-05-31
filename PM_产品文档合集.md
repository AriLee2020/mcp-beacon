# 📋 MCP Beacon — 产品文档全集

> **版本**：V2.0 | **日期**：2026-06-01 | **作者**：AI PM
> **项目**：MCP Beacon — AI Agent 监控平台（SDK + 仪表盘 + 告警）
> **定位**：「3 行代码，Agent 全部监控」
> **技术栈**：Next.js 15 + Supabase + DeepSeek V3 + Vercel
> **策略**：免费优先（Phase 0-1 全免费），数据驱动渐进收费

---

---

# 一、MVP PRD

> **目标**：10 周内交付全功能免费 MVP，验证「Agent 运行时监控」的市场需求。
> **原则**：免费优先 → SDK 优先 → 数据驱动迭代 → 渐进收费。

---

## 1.1 产品概述

| 维度 | 内容 |
|------|------|
| **产品名** | MCP Beacon |
| **一句话** | AI Agent 的 Datadog — 实时监控、智能告警、成本追踪 |
| **核心价值** | 3 行代码接入，Agent 运行时全量监控，成本/错误/性能一目了然 |
| **目标用户** | 独立 AI 开发者、小型 SaaS 团队（3-10 人使用 AI Agent） |
| **MVP 策略** | 🆓 **全功能免费**。先积累用户、采集数据、打磨产品，数据达标后再渐进收费 |
| **收费触发** | 注册 >200 + WAU >50 + D30留存 >40% + NPS >40 → 启动渐进收费 |

---

## 1.2 功能范围（P0-P3 优先级）

### P0 — 没有就不能发布（MVP 必须）

| # | 功能 | 描述 | 验收标准 |
|---|------|------|----------|
| P0-1 | **SDK npm 包发布** | `npm install mcp-beacon` 可安装 | npm registry 可见，版本 0.1.0 |
| P0-2 | **beacon.wrap() 显式包装器** | 包装 OpenAI/Anthropic/DeepSeek SDK，自动记录 API 调用 | 3 行代码接入，调用记录出现在 Dashboard |
| P0-3 | **HTTP 请求拦截** | 拦截 fetch/axios，记录延迟、状态码、body 大小 | 不修改用户业务代码就能监控 HTTP 层 |
| P0-4 | **异步缓冲上报** | 批量上传、失败重试、离线缓存、不阻塞主流程 | 上报失败不影响 Agent 运行，延迟 <50ms |
| P0-5 | **Token 计数 + 成本估算** | chars/4 估算 + 模型价格映射 → 实时成本 | 成本误差 <20%，支持 OpenAI/Anthropic/DeepSeek 定价 |
| P0-6 | **Ingest API 端点** | POST /api/ingest → 鉴权 → 校验 → 写入 Supabase | 接受 SDK 上报数据，<200ms 响应 |
| P0-7 | **仪表盘概览页** | Agent 数量、总调用次数、总成本、在线状态、7 天趋势图 | 数据实时刷新，<3s 首屏加载 |
| P0-8 | **会话记录查看器** | 单次会话详情：每轮 API 调用/延迟/Token/成本 | 可按时间线回溯完整调用链 |
| P0-9 | **用户认证系统** | 注册/登录/密码重置 | 支持邮箱注册 + OAuth（GitHub/Google） |
| P0-10 | **API Key 管理** | 生成/吊销/复制 API Key | 按项目隔离，支持多 Key |
| P0-11 | **Landing Page** | Hero + Features + Pricing + FAQ + CTA | SEO 优化，响应式，暗色模式，Free Tier 醒目 |

> ⚠️ **已移除**：Stripe 支付集成。MVP 全功能免费，支付在收费触发后才对接（预计上线后 3-6 个月）。

### P1 — 上线后 2 周内补齐

| # | 功能 | 描述 | 验收标准 |
|---|------|------|----------|
| P1-1 | **成本异常告警** | 日均成本突增 >200% → Email 通知 | 告警在异常发生后 1 小时内发出 |
| P1-2 | **错误率异常告警** | 滑动窗口统计 → 错误率突增 → Email 通知 | 错误率 >20% 持续 5 分钟触发 |
| P1-3 | **成本仪表盘** | 按 Agent/模型/日期 三级成本拆解 | 支持导出 CSV |
| P1-4 | **用户自定义阈值告警** | 成本超 $X、错误率 >Y%、延迟 >Zms | 用户可在 Dashboard 自行设置 |
| P1-5 | **数据保留策略** | Free 30 天数据保留 + 滚动删除 | 无付费墙——当前全部用户统一 30 天 |
| P1-6 | **用户行为埋点** | SDK 端 + Dashboard 端匿名事件采集（Supabase 存储） | 追踪接入成功率、功能使用频率、留存 |
| P1-7 | **NPS 问卷组件** | 接入后 7 天自动弹 NPS 评分 | 弹窗不打断核心流程 |

### P2 — 上线后 4 周内

| # | 功能 | 描述 | 验收标准 |
|---|------|------|----------|
| P2-1 | **循环检测（文本相似度）** | Jaccard/LCS 逐轮相似度 → 标记"实验性" | 连续 5 轮相似度 >80% 标记为疑似循环 |
| P2-2 | **Slack 通知集成** | 告警推送到 Slack Channel | 支持自定义 Webhook URL |
| P2-3 | **团队协作** | 多成员邀请 + 权限管理 | Owner/Admin/Member 三级权限 |
| P2-4 | **性能优化建议** | 分析 prompt 效率，推荐更便宜模型 | 基于历史数据对比给出换模型建议 |
| P2-5 | **内部数据分析仪表盘** | 用户行为数据可视化（仅内部 Ari 可见） | 注册数/DAU/留存/NPS 一目了然，驱动产品决策 |

### P3 — 上线后 8 周+

| # | 功能 | 描述 |
|---|------|------|
| P3-1 | **幻觉率监测** | 基于 DeepSeek V3 检测输出一致性 |
| P3-2 | **Python SDK** | pip install mcp-beacon |
| P3-3 | **Self-host 方案** | Docker 一键部署，企业私有化 |
| P3-4 | **SSO/SAML** | 企业统一登录 |
| P3-5 | **SLA 保障** | 99.9% 可用性保证 |
| P3-6 | **审计日志** | 企业合规审计需求 |

---

## 1.3 不做范围（MVP 明确剔除）

| 不做 | 原因 | 替代方案 |
|------|------|----------|
| 透明拦截（Proxy/中间人） | 复杂度高、兼容性差、开发者不信任 | 用显式 `beacon.wrap()` |
| 浏览器端 SDK | MVP 聚焦 Node.js 后端 Agent | P3 考虑 |
| gRPC/WebSocket 拦截 | 低频场景，维护成本高 | 先聚焦 HTTP 层 |
| got/undici HTTP 库 | fetch + axios 覆盖 90% 用户 | P3 根据需求补充 |
| 自定义仪表盘 | 模板化先跑通 | P2 部分自定义 |
| 多语言 SDK（Go/Rust/Java） | 先跑通 TS+Python | P3 社区驱动 |
| 实时流式数据 | Supabase 免费层撑不住 | P2 切换到 Realtime |
| AI 分析 Agent 行为 | 先做人能看的，再做 AI 分析的 | P3 + DeepSeek V3 |
| **Stripe / 支付系统** | MVP 全免费，支付需等数据验证 PMF | 收费触发后对接 Lemon Squeezy |
| **付费墙 / 功能门控** | 免费优先策略——先让用户爱上产品 | 数据达标后按「新增 Pro 功能」模式收费 |
| **Google Analytics** | Ari 无法访问 | 自建埋点（P1-6）+ Supabase 内部 Dashboard（P2-5） |

---

## 1.4 SDK 兼容性声明（MVP）

| 支持 | 版本 | 接入方式 |
|------|:---:|----------|
| OpenAI SDK | v4.x | `beacon.wrap(openai)` |
| Anthropic SDK | v0.x | `beacon.wrap(anthropic)` |
| DeepSeek SDK | latest | `beacon.wrap(deepseek)` |
| fetch (Node 18+) | global | 显式包装 `beacon.wrapFetch(fetch)` |
| axios | 1.x | 显式包装 `beacon.wrapAxios(axios)` |

---

## 1.5 验收标准总表

| 维度 | 标准 | 测量方式 |
|------|------|----------|
| SDK 接入成本 | ≤3 行代码 | 新用户 5 分钟内完成接入 |
| SDK 性能影响 | 额外延迟 <50ms | 压测对比 |
| 数据上报延迟 | <5s（批量模式） | 端到端计时 |
| Dashboard 首屏 | <3s | Lighthouse |
| 数据准确性 | Token 计数误差 <20% | 与 OpenAI Dashboard 对比 |
| 可用性 | 99.5% | Vercel 监控 |
| **用户接入成功率** | >80% SDK 安装后成功上报 | 埋点数据 |
| **D7 留存率** | >30% | 用户行为埋点 |

---

## 1.6 里程碑时间线

```
Week 1-2   ████████  基础设施 + Landing Page（注册/登录/API Key）
Week 3-5   ████████  SDK 核心（wrap + 拦截 + 上报 + Token 计数）
Week 5-6   ████████  Ingest API + 数据管道
Week 7-8   ████████  仪表盘（概览 + 会话查看 + 成本面板）
Week 8-9   ████████  异常检测 MVP（循环检测 + 错误率/成本告警）
Week 9-10  ██████    用户埋点 + NPS 问卷 + 集成测试 → 🚀 上线
```

> ⚠️ **关键变化**（vs V1.0）：
> - Stripe 支付：❌ 删除（整个 Phase 移除）
> - 用户埋点 + NPS：✅ 新增（Week 9-10）
> - 总工期：12周 → **10周**（砍掉支付开发 + 测试）

---

# 二、Landing Page 文案

> **品牌调性**：专业但不冷，技术但不晦涩。像 Vercel 一样简洁，像 Datadog 一样可信。
> **配色**：暖橙 #F97316 + 深色背景
> **字体**：Outfit（标题）/ Inter（正文）

---

## 2.1 Hero Section

```
标题：    Your AI Agents. Fully Observable.

副标题：  3 lines of code. Real-time monitoring, cost tracking, and
          anomaly detection for every AI agent you run.

CTA按钮： [Start Monitoring Free →]
          [npm install mcp-beacon ↗]

小字：    No credit card required. Free for 3 agents.
```

### 中文版

```
标题：    你的 AI Agent，尽在掌控。

副标题：  3 行代码接入，实时监控、成本追踪、异常告警全覆盖。

CTA按钮： [免费开始监控 →]
          [npm install mcp-beacon ↗]

小字：    无需信用卡。1 个 Agent 永久免费。
```

---

## 2.2 Features Section

### Feature 1: 📊 Real-Time Dashboard

```
标题：    See Everything. Miss Nothing.

描述：    Every API call, every token spent, every millisecond of
          latency — streamed to your dashboard in real time.

亮点：    • Live agent status (online/offline/idle)
          • 7-day trend charts for calls, cost, and errors
          • Drill down to individual conversation traces
```

### Feature 2: 💰 Cost Tracking That Pays For Itself

```
标题：    Know Exactly Where Your Money Goes.

描述：    "My agent ran overnight and burned $87." — Never again.
          Track cost per agent, per model, per day. Set budgets.
          Get alerts before it's too late.

亮点：    • Token counting with model-specific pricing
          • Cost breakdown: Agent → Model → Day → Single Call
          • Budget alerts: "Spent 80% of monthly limit"
          • Export everything to CSV
```

### Feature 3: 🚨 Anomaly Detection

```
标题：    Catch Problems Before Your Users Do.

描述：    Agent stuck in a loop? Error rate spiking? Cost suddenly
          3x normal? We detect it and alert you — so you can fix
          it before your customers notice.

亮点：    • Loop detection (experimental): catches repetitive API calls
          • Error rate spike detection with sliding windows
          • Cost anomaly alerts (daily cost > 200% of baseline)
          • Email notifications (Slack coming soon)
```

### Feature 4: 🔍 Conversation Trace Viewer

```
标题：    Debug Agent Behavior in Seconds, Not Hours.

描述：    When your agent gives a wrong answer, trace every API
          call it made — with full request/response context, latency,
          and cost — in a single timeline view.

亮点：    • Full call chain per conversation session
          • Latency breakdown per API call
          • Request/response summaries (not raw payloads)
          • Filter by model, status code, or cost
```

### Feature 5: 🔌 3-Line Integration

```
标题：    The Easiest Integration You'll Ever Do.

描述：    ```javascript
          import { Beacon } from 'mcp-beacon';
          const beacon = new Beacon({ apiKey: '...' });
          beacon.wrap(openai); // That's it.
          ```

          Your existing code keeps working. We just add observability.

亮点：    • Zero-config for OpenAI, Anthropic, DeepSeek
          • Non-blocking async batching — no performance impact
          • Works with fetch and axios out of the box
```

### Feature 6: 🔐 Privacy First

```
标题：    Your Data Stays Yours.

描述：    We never store raw request/response payloads. Only metadata:
          model, token count, latency, status code, cost. Your prompts
          and completions are YOUR business.

亮点：    • No raw payload storage
          • API keys encrypted at rest
          • GDPR-ready data export & deletion
          • Self-host option on roadmap
```

---

## 2.3 Social Proof Section（预埋，上线后填充）

```
标题：    Trusted by AI Developers

占位：    [Logo 1] [Logo 2] [Logo 3] [Logo 4] [Logo 5]
          上线后从免费用户中挑选愿意展示 Logo 的用户

引用：    "Finally, I can see what my agents are actually doing.
           Saved me $200 in the first week." — Dev Name, @twitter
```

---

## 2.4 Pricing Section

```
┌─────────────────────────────────────────────────┐
│                 🆓 FREE during beta              │
│                                                   │
│     Everything included. No credit card.          │
│     3 agents · 30-day retention · All features    │
│                                                   │
│              [Start Monitoring Free →]            │
│              npm install mcp-beacon               │
│                                                   │
│     ── Coming later ──                            │
│     Pro $15/mo · Team $39/mo                      │
│     (pricing TBD based on user feedback)          │
└─────────────────────────────────────────────────┘
```

### 中文版

```
┌─────────────────────────────────────────────────┐
│              🆓 Beta 期间全免费                    │
│                                                   │
│     全部功能开放。无需信用卡。                      │
│     3 个 Agent · 30 天数据 · 全功能               │
│                                                   │
│           [免费开始监控 →]                         │
│           npm install mcp-beacon                  │
│                                                   │
│     ── 未来收费计划 ──                             │
│     Pro $15/月 · Team $39/月                      │
│     （根据用户反馈调整定价）                        │
└─────────────────────────────────────────────────┘
```

---

## 2.5 FAQ Section

**Q: What exactly does MCP Beacon monitor?**
A: We monitor the runtime behavior of your AI agents — every LLM API call (model, tokens, latency, cost), every HTTP request your agent makes (URL, status code, response time), and aggregate metrics like error rates and cost trends. We do NOT store raw prompt/response content.

**Q: How is this different from LangSmith or Helicone?**
A: LangSmith is great for LangChain debugging but starts at $39/month and is framework-locked. Helicone is excellent for LLM API logging but doesn't do agent-level monitoring (loop detection, cost alerts, multi-call tracing). MCP Beacon is framework-agnostic, 3-line integration, and built for the full agent lifecycle — not just LLM calls.

**Q: Does this slow down my agent?**
A: No. All data collection is async and batched. SDK overhead is <50ms per operation. Your agent's performance is not affected.

**Q: What data do you store?**
A: Metadata only — model name, token count (estimated), latency, HTTP status codes, cost (calculated). We never store your prompts, completions, or any payload content.

**Q: Can I self-host?**
A: Self-host is on the roadmap for Enterprise plans. For now, we run on Supabase (PostgreSQL) with encrypted storage.

**Q: What AI SDKs do you support?**
A: OpenAI v4, Anthropic v0, DeepSeek latest. Plus fetch and axios for general HTTP monitoring. Python SDK coming soon.

**Q: Is there a free tier?**
A: During beta, **everything is free** — 3 agents, 30 days data retention, all features including anomaly detection and cost tracking. No credit card required. We'll introduce paid plans ($15 Pro / $39 Team) after validating the product with real user data, but existing free users will not lose any features.

---

## 2.6 Footer

```
© 2026 MCP Beacon. Built for the agent era.
[Twitter] [GitHub] [Discord] [Blog] [Docs] [Status]
```

---

# 三、定价策略：免费优先 → 渐进收费

> **核心决策（Ari 拍板）**：Phase 0-1 全部功能免费。先积累用户、打磨产品，
> 用真实数据验证 PMF，达标后再启动渐进收费。不搞付费墙，不割韭菜。

---

## 3.1 策略全景

```
Phase 0 (W1-10)         Phase 1 (上线后 1-3月)       Phase 3 (触发后)
─────────────────────────────────────────────────────────────────────
  全功能免费 MVP           用户积累 + 数据迭代           渐进收费
       ↓                       ↓                        ↓
  产品可用、有人用        100+ 活跃开发者             5-10% 付费转化
      $0                    $0 (持续免费)            $15/$39/$Custom
```

---

## 3.2 Phase 0-1：免费版设计

| 项目 | 免费版（当前） |
|------|---------------|
| Agent 数量 | **3 个**（够个人开发者使用） |
| 数据保留 | **30 天** |
| 核心功能 | ✅ 全部开放：监控 / 仪表盘 / 成本追踪 / 异常检测 |
| 告警 | ✅ Email 告警全部开放 |
| 团队协作 | ❌（未来 Pro 功能） |
| 导出 | ✅ CSV 导出 |
| 支持 | 社区（GitHub Issues） |

> **设计原则**：免费版要足够好，让人「愿意付费升级」而非「被迫付费解锁」。
> 参考 Linear / Figma 的免费增值模型。

---

## 3.3 收费触发条件（AND 逻辑）

在以下条件**全部满足**后，启动收费计划：

| 条件 | 阈值 | 测量方式 |
|------|:---:|---------|
| 注册用户 | > 200 | Supabase users 表 |
| 周活跃用户 (WAU) | > 50 | 埋点数据 |
| D30 留存率 | > 40% | 埋点数据 |
| NPS | > 40 | NPS 问卷组件 |
| 付费意愿信号 | 至少 3 个「愿意付费」的 GitHub Issue | Issues 跟踪 |

> 预计触发时间：上线后 3-6 个月。

---

## 3.4 渐进收费节奏

```
第 1 个月：功能收费，不搞强制付费
  → 新增 Pro 功能（团队协作 / 更长数据保留 / Slack 通知）
  → 现有免费用户一切不变
  → 早期用户给 50% 永久折扣（感谢信 + 折扣码）

第 2 个月：观察转化
  → 免费版保留（不砍功能）
  → 新用户默认 Free，引导升级 Pro

第 3 个月：定价优化
  → 根据转化数据调整定价
```

---

## 3.5 未来收费套餐（触发后启用）

| 套餐 | 价格 | 与免费版差异 |
|------|:---:|------|
| **Free** | $0 | 3 Agent + 30天数据 + 基础告警（不变） |
| **Pro** | **$15/月** | 10 Agent + 90天数据 + 高级告警 + Slack 通知 |
| **Team** | **$39/月** | 无限 Agent + 无限数据 + 团队协作 + API |

> 💡 Pro 定 $15 而非市场建议的 $19——低价降低付费摩擦，等用户基数大了再提价。

---

## 3.6 MVP 不涉及支付

| 决策项 | 结论 |
|--------|------|
| MVP 是否收费 | ❌ **不收费**，全部功能免费 |
| 支付集成 | ❌ 不做（Stripe/Lemon Squeezy 等收费触发后对接） |
| 付费墙 | ❌ 不做（不限制核心功能） |
| 定价页面 | 显示「Free during beta」+ 未来价格预告 |

---

## 3.7 盈亏分析

| 阶段 | 月成本 | 收入 | 说明 |
|------|:---:|:---:|------|
| Phase 0-1（免费期） | ~$75 | $0 | 域名 + Vercel + Supabase + DeepSeek API |
| Phase 3（收费后） | ~$75 | 目标 $600+/月 | 仅需 40 个 Pro 用户或 16 个 Team 用户即可覆盖 |

---

## 3.6 免费优先策略：Pro $15/月 达标启动模式 ⭐ NEW

> **核心思想**：让开发者在「完全免费」的环境下用爽 MCP Beacon，直到用量和价值自然触及 5 项客观指标时，才启动 $15/月 Pro 订阅。不是「先付费再用」，而是「先用爽再付费」。

---

### 3.6.1 策略核心

| 维度 | 传统 SaaS | 免费优先策略 |
|------|-----------|-------------|
| 定价逻辑 | 功能分档 → 付费解锁 | 全功能开放 → 用量达标再付费 |
| Pro 价格 | $19/$100/月 | **$15/月**（含税一口价） |
| 收费触发 | 注册即选套餐 | **5 项指标全部达标后启动** |
| 用户心理 | 「我够不够用？」 | 「用爽了自然该付钱」 |
| 获客模式 | Landing Page → 试用 → 付费 | **免费使用 → 自然增长 → 价值达标付费** |

**一句话**：「所有功能先白送，用到停不下来再收 $15/月。」

---

### 3.6.2 为什么是 $15/月？

#### 竞品锚点对比

| 竞品 | 入门价 | 包含内容 | MCP Beacon 对标 |
|------|:---:|------|------|
| **Datadog LLM** | $15/主机 | 单主机监控 | ✅ 同价位，但按 Agent 而非主机 |
| **Helicone** | $20/月 | 50K req + 基础功能 | ✅ 便宜 $5，功能更全 |
| **Sentry** | $26/月 | 50K errors | ✅ 便宜 $11 |
| **PagerDuty** | $21/用户 | 告警 | ✅ 便宜 $6 |
| **LangSmith** | $39/月 | 3K traces | ✅ 便宜 $24，无 Trace 限制 |

**$15 的心理学优势**：

1. **「一杯咖啡的价格」** — $15/月对标 Spotify Premium / 1 杯精品咖啡。开发者对 $15 的心理防线极低。
2. **避开了「$19 区间」** — $19 是 SaaS 红海价格带（Notion $10、Figma $12、Linear $8 都在下面），$15 定位「比最便宜的高级工具贵一点，但比专业工具便宜很多」。
3. **单一价格，零决策成本** — 没有 Starter/Pro/Enterprise 的选择焦虑，就是「免费用」或「每月 $15」。
4. **未来的 Enterprise 自然升级** — 当用户有 50+ Agent 或需要 SSO 时，联系销售定价 $500+/月，$15 用户不会觉得突兀。

---

### 3.6.3 5 项指标：收费触发器

> ⚠️ **核心机制**：「5 项指标全部达标」才启动 $15/月 Pro 收费。任一指标未达标，用户继续免费使用所有功能。

#### 指标清单

| # | 指标 | 阈值 | 含义 |
|:---:|------|:---:|------|
| **1** | 监控 Agent 数 | **≥ 3** | 用户在监控 3+ 个独立 Agent（已被 MCP Beacon 深度绑定到业务） |
| **2** | 月 API 调用量 | **≥ 50,000 次** | 月均 LLM API 调用超 5 万次（日活约 1,700 次），用量已非「试用」级别 |
| **3** | 会话留存需求 | **查看 30 天前数据** | 用户主动回溯超过 7 天前的会话记录（需要更长数据保留） |
| **4** | 成本可见度需求 | **查看过成本拆解 >10 次** | 用户频繁查看成本仪表盘（成本管理已成刚需） |
| **5** | 告警依赖 | **触发告警 ≥ 3 次** | 用户已将 MCP Beacon 告警纳入运维流程（迁移成本已建立） |

#### 指标设计理念

```
         ┌──────────────────────────────────────┐
         │         5 项指标 = 5 道价值确认        │
         ├──────────────────────────────────────┤
         │ 指标 1+2: 用量层面 → 「我已经离不开你」   │
         │ 指标 3+4: 功能层面 → 「高级功能我真需要」  │
         │ 指标 5:   信任层面 → 「告警帮我省了钱」    │
         └──────────────────────────────────────┘
```

**为什么这 5 项合理？**

- **指标 1（Agent 数 ≥ 3）**：监控 1 个 Agent 是好奇，3 个是依赖。此时 MCP Beacon 已经成为基础架构的一部分。
- **指标 2（月调用 ≥ 50K）**：日调用约 1,700 次，足够形成稳定的监控数据流。低于此量，用户可能只是偶尔使用。
- **指标 3（查看 30 天前数据）**：7 天数据对「尝鲜」足够，想看更久的数据说明用户在分析趋势、做月度汇报——这是严肃使用场景。
- **指标 4（成本拆解 >10 次）**：偶尔看看成本是好奇，反复查看是刚需。成本意识觉醒 = 付费意愿最高点。
- **指标 5（触发告警 ≥ 3 次）**：告警是 MCP Beacon 最核心的「救火」价值。被救过 3 次，用户自然愿意付 $15。
  - 注：告警功能在达标前免费开放。这是获客武器，不是付费墙。

#### 达标后的收费流程

```
指标12345全部达标
        │
        ▼
┌─────────────────────────────────────────┐
│ Dashboard 顶部 Banner                     │
│ "🎉 You're getting serious value from    │
│  MCP Beacon! Upgrade to Pro for          │
│  $15/mo to keep all features."           │
│                                           │
│ [Start Pro $15/mo]  [Remind me in 7 days] │
└─────────────────────────────────────────┘
        │
        ├── 7 天内付费 → 正常使用，全功能
        │
        └── 7 天后未付费 → 降级到 Free Tier 限制
                           （1 Agent / 7天数据）
```

**关键设计**：
- ✅ 不是达标立即断功能 — 给 7 天缓冲期
- ✅ 不是 Pro 才解锁功能 — 达标前的体验和 Pro 完全一样
- ✅ 降级是「回到 Free」而不是「删除账号」 — 用户随时可以再升级

---

### 3.6.4 Free Tier 防滥用设计（升级版）

在前文 3.3 节 Free Tier 防滥用设计基础上，针对达标模式增加：

| 机制 | 说明 |
|------|------|
| **Agent 数硬限制** | Free 虽不强制 1 Agent，但达标后若未付费则硬降至 1 Agent |
| **数据保留硬限制** | 7 天滚动删除，即使达标未付费也强制 7 天 |
| **禁止多账号** | 同一张信用卡 / 同一 GitHub 账号 / 同一 IP 的多个 Free 账号合并计数 |
| **API 速率限制** | Free 态 100 events/min（对个人开发者充足，对批量滥用不足） |
| **智能检测** | 若用户在 5 项指标接近全达标时突然删除 Agent 或减少调用，标记为「疑似规避付费」 |

**防「永远免费」用户画像**：
- 🟢 **个人开发者用 1 个 Agent** → 永远不会触发指标 1，永久免费。✅ 这是设计的意图（获客 + 口碑传播）。
- 🟢 **小团队用 2 个 Agent、月 30K 调用** → 永远不会触发指标 1 和 2，永久免费。✅ 小团队是未来的口碑节点。
- 🟡 **中团队用 3 个 Agent、月 60K 调用、经常看成本** → 会触发指标 1/2/4，但可能不触发指标 5（告警）。继续免费，直到触发告警。
- 🔴 **重度用户 3+ Agent、50K+ 调用、需要 30 天数据** → 几乎必然触发全部 5 项指标 → 付费 $15/月。

---

### 3.6.5 盈亏平衡分析

| 项目 | 数值 |
|------|:---:|
| **月基础成本**（Supabase + Vercel + 域名） | ~$75 |
| **每个 Free 用户的边际成本** | ~$0.10/月（数据库存储 + 带宽） |
| **盈亏平衡点** | **仅需 5 个 Pro 用户 = $75/月** |
| **100 个 Pro 用户** | 月收入 $1,500，净利 ~$1,400（忽略 Free 成本） |
| **1,000 个 Free 用户** | 边际成本 $100/月 — 获客成本极低 |

**对比传统方案 B（Free + $19 + $100）**：

| 维度 | 方案 B（旧） | 免费优先策略（新） |
|------|:---:|:---:|
| 盈亏平衡 | 4 Starter / 1 Pro | 5 Pro |
| 用户付费决策阻力 | 高（先选套餐） | **极低（用爽了再付）** |
| 口碑传播速度 | 中 | **高**（「全功能免费」有病毒传播潜力） |
| 月 ARPU | $19-$100 混合 | **$15 统一** |
| Free 用户转化为付费的路径 | 功能限制 → 升级 | **5 项指标 → 自然转化** |
| 开发者社区友好度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

> **结论**：免费优先策略用更低的 ARPU（$15 vs $19-$100 混合）换取更高的转化率和更快的增长飞轮。对于早期市场（Agent 监控赛道尚在用户教育阶段），获客速度 > 单价。

---

### 3.6.6 与现有方案的定位变化

```
旧方案 B:
  Free (受限) → Starter $19 → Pro $100
  「先付费才有好体验」

新方案（免费优先）:
  Free (全功能) → Pro $15（5 指标达标触发）
  「好体验先白送，离不开再付 $15」

  未来延伸:
  Pro $15 → Enterprise 联系销售（50+ Agent / SSO / SLA）
```

**为什么这个转变合理？**

1. **MCP Beacon 是开发者工具** — 开发者对「免费试用全功能」的路径最友好。GitHub、Vercel、Supabase 都靠这个模式成功。
2. **赛道还在教育期** — 「Agent 监控」还不是一个自明的需求。先让用户免费用，形成习惯，再收费。
3. **$15 的 Pro 不是终点** — 它是「付费墙的起点」。当用户有 50+ Agent 时，Enterprise $500+/月 自然承接。

---

### 3.6.7 灰度上线路线图

| 阶段 | 动作 | 时间 |
|------|------|:---:|
| **Phase 1** | 全功能 Free 上线（Dashboard 顶部标注「Pro $15/mo 即将推出」） | 上线即启动 |
| **Phase 2** | 后端埋点追踪 5 项指标（不触发收费，仅收集数据） | 上线后 2 周 |
| **Phase 3** | 分析数据：多少用户达标？达标用了多久？ | 上线后 4 周 |
| **Phase 4** | 若数据健康（>10 个用户达标），启动收费触发 | 上线后 6 周 |
| **Phase 5** | 持续优化指标阈值（A/B 测试不同阈值对转化率的影响） | 持续 |

**回退开关**：如果达标即付费转化率 < 10%，暂停收费触发，调整阈值或给更长的缓冲期。

---

### 3.6.8 文档改动影响清单

若采用免费优先策略，以下文档需要同步修改：

| 文档模块 | 当前状态 | 需修改为 |
|----------|------|------|
| **1.1 产品概述** 商业模式 | 「SaaS 订阅制：$19/月 Starter / $100/月 Pro」 | 「免费优先：全功能 Free → 5 项指标达标 → Pro $15/月」 |
| **1.2 P0-11** Stripe 支付 | $19 和 $100 两档 | 仅需 $15 单一档（简化 Stripe 集成） |
| **2.4 Pricing Section** | Starter $19 / Pro $100 / Enterprise | Free → Pro $15 / Enterprise Custom |
| **7.1 README** Features 表格 | Free / Starter ($19) / Pro ($100) | Free / Pro ($15) / Enterprise |
| **8.2 PH 描述** | Starter $19/mo / Pro $100/mo | Pro $15/mo，免费优先 |
| **SDK API 限制** | Free 100 events/min / Starter 1K / Pro 10K | Free 100 events/min（达标后若未付费维持此限制） |

---

> ⚠️ **PM 建议**：本次任务产出的是策略分析文档。最终是否采用「免费优先策略」替代现有方案 B，需要 Leader 决策。同时建议先以方案 B 上线（文档已有），灰度阶段逐步过渡到免费优先策略。

---

# 四、SDK Quick Start 指南

> **目标**：让开发者在 5 分钟内完成接入，看到第一条监控数据。
> **原则**：3 行代码接入，零配置，不侵入业务逻辑。

---

## 4.1 安装

```bash
npm install mcp-beacon
```

---

## 4.2 最小接入（3 行代码）

```javascript
import { Beacon } from 'mcp-beacon';

const beacon = new Beacon({ apiKey: 'mb_live_xxxxxxxxxxxxxxxx' });

beacon.wrap(openai); // 你的 OpenAI 实例
```

**之后所有 `openai.chat.completions.create()` 调用都会被自动监控。**

---

## 4.3 完整接入示例

```javascript
import OpenAI from 'openai';
import { Beacon } from 'mcp-beacon';

// 1. 初始化 Beacon
const beacon = new Beacon({
  apiKey: process.env.MCP_BEACON_API_KEY,  // 从 Dashboard 获取
  project: 'my-ai-assistant',               // 可选：项目名，用于 Dashboard 分组
});

// 2. 包装你的 AI SDK
const openai = beacon.wrap(new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}));

// 3. 正常使用 —— 监控全自动
async function answerQuestion(question) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: question }],
  });
  return response.choices[0].message.content;
}

// 也支持 Anthropic
import Anthropic from '@anthropic-ai/sdk';
const anthropic = beacon.wrap(new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
}));

// 也支持 DeepSeek
import DeepSeek from 'deepseek-sdk';
const deepseek = beacon.wrap(new DeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
}));
```

---

## 4.4 HTTP 请求监控

```javascript
import { Beacon } from 'mcp-beacon';

const beacon = new Beacon({ apiKey: 'mb_live_xxx' });

// 包装全局 fetch
const monitoredFetch = beacon.wrapFetch(fetch);

// 之后所有 fetch 调用都被监控
const data = await monitoredFetch('https://api.example.com/data');

// axios 同理
import axios from 'axios';
const monitoredAxios = beacon.wrapAxios(axios);
const { data } = await monitoredAxios.get('https://api.example.com/data');
```

---

## 4.5 会话追踪（可选）

```javascript
// 自动模式：Beacon 自动管理会话
const beacon = new Beacon({ apiKey: 'mb_live_xxx' });
// 每次 Agent 运行自动创建新会话

// 手动模式：精确控制会话边界
beacon.startSession({ name: 'user-query-123', metadata: { userId: '42' } });

// ... 你的 Agent 代码 ...

beacon.endSession();
```

---

## 4.6 查看监控数据

1. 打开 [app.mcpbeacon.asia](https://app.mcpbeacon.asia)
2. 登录 → 进入 Dashboard
3. 左侧选择你的 Project → 看到实时数据

**数据延迟**：<5 秒（批量模式）

---

## 4.7 常见问题

**Q: 会影响我的 Agent 性能吗？**
A: 不会。所有监控在后台异步进行，额外开销 <50ms，使用批量上报。

**Q: 会记录我的 prompt 和回复内容吗？**
A: 不会。只记录元数据：模型名、Token 数、延迟、状态码、成本。prompt/completion 内容绝不离开你的服务器。

**Q: 支持哪些 Node 版本？**
A: Node.js 18+（需要原生 fetch）。

**Q: 可以离线使用吗？**
A: SDK 支持离线缓存。当网络恢复时自动批量上报。

---

# 五、SDK API Reference 文档

> **SDK 包名**：`mcp-beacon`
> **版本**：0.1.0
> **语言**：TypeScript（含完整类型定义）

---

## 5.1 核心类：Beacon

### 构造函数

```typescript
new Beacon(options: BeaconOptions): Beacon
```

**BeaconOptions**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:---:|--------|------|
| `apiKey` | `string` | ✅ | — | 从 Dashboard 获取的 API Key（格式：`mb_live_xxx`） |
| `project` | `string` | ❌ | `'default'` | 项目名，用于 Dashboard 分组 |
| `apiUrl` | `string` | ❌ | `'https://api.mcpbeacon.asia'` | Ingest API 地址（self-host 时覆盖） |
| `batchSize` | `number` | ❌ | `50` | 批量上报条数阈值 |
| `flushInterval` | `number` | ❌ | `5000` | 批量上报间隔（毫秒） |
| `enabled` | `boolean` | ❌ | `true` | 是否启用监控（`false` 则静默） |
| `debug` | `boolean` | ❌ | `false` | 是否打印 SDK 内部日志 |
| `maxRetries` | `number` | ❌ | `3` | 上报失败最大重试次数 |
| `retryDelay` | `number` | ❌ | `1000` | 重试间隔基数（毫秒，指数退避） |

---

### 方法：beacon.wrap()

```typescript
beacon.wrap<T>(client: T): T
```

包装 AI SDK 客户端，使其所有 API 调用自动被监控。

**参数**：
- `client` — OpenAI SDK v4.x、Anthropic SDK v0.x、或 DeepSeek SDK 实例

**返回**：包装后的同类型客户端（完全兼容原 API）

**示例**：
```typescript
const openai = beacon.wrap(new OpenAI({ apiKey: '...' }));
// openai 的所有方法行为不变，但会被监控
```

---

### 方法：beacon.wrapFetch()

```typescript
beacon.wrapFetch(originalFetch: typeof fetch): typeof fetch
```

包装全局 `fetch` 函数，使其所有调用被监控。

**返回**：包装后的 fetch 函数（完全 API 兼容）

---

### 方法：beacon.wrapAxios()

```typescript
beacon.wrapAxios(axiosInstance: AxiosInstance): AxiosInstance
```

包装 axios 实例，使其所有请求被监控。

**返回**：包装后的 axios 实例

---

### 方法：beacon.startSession()

```typescript
beacon.startSession(options?: SessionOptions): string
```

开始一个新的监控会话。

**SessionOptions**

| 参数 | 类型 | 必填 | 说明 |
|------|------|:---:|------|
| `name` | `string` | ❌ | 会话名称（显示在 Dashboard 中） |
| `metadata` | `Record<string, unknown>` | ❌ | 自定义元数据（可搜索） |

**返回**：会话 ID（UUID v4）

---

### 方法：beacon.endSession()

```typescript
beacon.endSession(): void
```

结束当前监控会话。

---

### 方法：beacon.flush()

```typescript
beacon.flush(): Promise<void>
```

立即上报所有缓冲数据（通常在进程退出前调用）。

```typescript
// 确保进程退出前数据不丢失
process.on('SIGTERM', async () => {
  await beacon.flush();
  process.exit(0);
});
```

---

### 方法：beacon.shutdown()

```typescript
beacon.shutdown(): Promise<void>
```

优雅关闭：flush 所有缓冲数据 + 停止定时器。

---

## 5.2 Ingest API

### POST /api/ingest

SDK 内部调用，接收监控数据。

**Headers**

| Header | 值 |
|--------|-----|
| `Authorization` | `Bearer mb_live_xxx` |
| `Content-Type` | `application/json` |

**请求体**

```json
{
  "events": [
    {
      "type": "llm_call",
      "timestamp": "2026-05-31T10:30:00Z",
      "session_id": "uuid",
      "project": "my-assistant",
      "model": "gpt-4",
      "provider": "openai",
      "duration_ms": 1234,
      "status_code": 200,
      "error": null,
      "input_tokens": 500,
      "output_tokens": 150,
      "cost_usd": 0.045
    },
    {
      "type": "http_request",
      "timestamp": "2026-05-31T10:30:01Z",
      "session_id": "uuid",
      "project": "my-assistant",
      "method": "GET",
      "url": "https://api.example.com/data",
      "duration_ms": 345,
      "status_code": 200,
      "body_bytes": 1024,
      "error": null
    }
  ]
}
```

**响应**

```json
// 200 OK
{
  "accepted": 2,
  "rejected": 0,
  "errors": []
}

// 429 Too Many Requests
{
  "error": "rate_limit_exceeded",
  "message": "Max 100 events/sec per API key. Retry after 1s.",
  "retry_after_ms": 1000
}
```

**速率限制**

| 阶段 | 限制 |
|------|------|
| Beta（当前） | 1,000 events/min（统一，无付费差异） |
| 收费后 Pro | 10,000 events/min |
| 收费后 Team | 50,000 events/min |

---

## 5.3 Dashboard API（公开）

### GET /api/v1/projects

获取用户的所有项目。

```
Authorization: Bearer mb_live_xxx
```

### GET /api/v1/projects/:name/sessions

获取项目下的会话列表。

| Query | 说明 | 默认 |
|-------|------|------|
| `limit` | 返回条数 | `20` |
| `offset` | 偏移量 | `0` |
| `from` | 开始时间 ISO8601 | — |
| `to` | 结束时间 ISO8601 | — |

### GET /api/v1/sessions/:id

获取单个会话的完整调用链。

### GET /api/v1/stats

获取聚合统计数据。

```
GET /api/v1/stats?project=my-assistant&from=2026-05-01&to=2026-05-31
```

**响应**：
```json
{
  "total_calls": 15234,
  "total_cost_usd": 87.42,
  "avg_latency_ms": 823,
  "error_rate": 0.032,
  "by_model": {
    "gpt-4": { "calls": 10000, "cost_usd": 60.0 },
    "claude-3-opus": { "calls": 5234, "cost_usd": 27.42 }
  }
}
```

---

## 5.4 错误码

| 状态码 | 错误码 | 说明 |
|:---:|--------|------|
| 401 | `invalid_api_key` | API Key 无效或已吊销 |
| 403 | `plan_limit_exceeded` | 超过套餐限制（Agent 数等） |
| 429 | `rate_limit_exceeded` | 速率限制（见上表） |
| 422 | `validation_error` | 请求体格式错误 |
| 500 | `internal_error` | 服务器内部错误 |

---

# 六、异常检测规则文档

> **状态**：实验性功能（标记为 "Experimental" 或 "Beta"）
> **原则**：宁可漏报，不可误报。所有异常检测仅作参考，不可用于关键决策（如自动停止 Agent）。

---

## 6.1 检测引擎总览

| 检测项 | 类型 | 状态 | 数据源 |
|--------|------|:---:|--------|
| 循环检测 | 文本相似度 | 🧪 实验性 | 连续 LLM 调用输出 |
| 错误率异常 | 统计阈值 | ✅ 正式 | HTTP/LMM 调用状态码 |
| 成本异常 | 统计阈值 | ✅ 正式 | Token 计数 + 模型价格 |
| 延迟异常 | 统计阈值 | 🔜 开发中 | API 调用 duration_ms |

---

## 6.2 循环检测（实验性）

### 为什么标「实验性」

循环检测是 Agent 监控中最有价值也最容易出错的检测。纯文本相似度有天然局限：
- **漏报**：Agent 在循环但每次输出文字不同（如逐条列举，内容在变化但本质在循环）
- **误报**：Agent 在正常进行多步骤任务但输出格式相似（如重复 "Let me search for..."）

因此 MVP 采用保守参数，标记为「实验性」，明确告知用户「仅供参考」。

### 核心算法：Jaccard 相似度 + LCS

```
输入: 连续 N 轮 Agent 输出文本
输出: 是否疑似循环 + 置信度 (0-1)

算法:
1. 对每轮输出文本分词（去停用词，取 unigram + bigram）
2. 计算相邻两轮的 Jaccard 相似度 + 归一化 LCS 比率
3. 取 Jaccard 和 LCS 的加权平均 = combined_score
4. 滑动窗口判据:
   - 连续 5 轮的 combined_score 均 >0.8 → 置信度 0.6（中）
   - 连续 8 轮的 combined_score 均 >0.8 → 置信度 0.85（高）
   - 连续 3 轮的 combined_score 均 >0.95 → 置信度 0.9（高，几乎相同）
```

### 参数配置

| 参数 | 默认值 | 说明 |
|------|:---:|------|
| `loop.window_size` | `5` | 滑动窗口大小（连续多少轮） |
| `loop.similarity_threshold` | `0.80` | 相似度阈值 |
| `loop.min_confidence` | `0.6` | 最低置信度才触发告警 |
| `loop.high_window_size` | `8` | 高置信度窗口大小 |
| `loop.exact_window_size` | `3` | 极高相似度窗口 |
| `loop.exact_threshold` | `0.95` | 极高相似度阈值 |
| `loop.min_calls_for_detection` | `10` | 至少多少轮调用后才开始检测 |

### 告警输出

```json
{
  "alert_type": "loop_detected",
  "severity": "warning",
  "status": "experimental",
  "session_id": "uuid",
  "confidence": 0.85,
  "similarity_avg": 0.88,
  "window_size": 8,
  "since_timestamp": "2026-05-31T10:35:00Z",
  "message": "Agent may be in a loop: last 8 calls show >88% output similarity (experimental detection, verify manually)",
  "recommendation": "Check your agent's conversation history. Consider adding a max_turns limit or exit condition."
}
```

### 用户界面提示

在 Dashboard 中，循环检测标记以橙色徽章显示：

```
🟠 Loop Detected (Experimental)
   Confidence: 85% — 8 similar calls in 3 minutes
   [View Session] [Dismiss]
```

---

## 6.3 错误率异常检测（正式）

### 算法：滑动窗口 + 基线对比

```
输入: 连续 N 分钟的 API 调用状态码
输出: 错误率是否异常

1. 建立基线：取过去 24 小时的平均错误率作为 baseline
2. 滑动窗口：每 5 分钟汇总一次错误率 (errors / total_calls)
3. 触发条件（任一成立即触发）:
   a. 窗口错误率 > 20% 且 baseline < 5% → 中等告警
   b. 窗口错误率 > 50% 且 baseline < 10% → 高告警
   c. 窗口错误率 > 3x baseline 且 baseline > 5% → 中等告警
   d. 窗口总调用数 < 10 → 不告警（样本太小）
```

### 参数

| 参数 | 默认值 | 说明 |
|------|:---:|------|
| `error.window_minutes` | `5` | 检测窗口（分钟） |
| `error.baseline_hours` | `24` | 基线计算周期 |
| `error.spike_threshold` | `0.20` | 绝对错误率阈值 |
| `error.multiplier_threshold` | `3.0` | 相对基线倍数阈值 |
| `error.min_sample_size` | `10` | 最小样本数 |

### 告警输出

```json
{
  "alert_type": "error_rate_spike",
  "severity": "high",
  "project": "my-assistant",
  "current_error_rate": 0.55,
  "baseline_error_rate": 0.03,
  "window_start": "2026-05-31T10:35:00Z",
  "window_end": "2026-05-31T10:40:00Z",
  "message": "Error rate spiked to 55% (baseline: 3%). 45 errors in 5 minutes.",
  "affected_models": ["gpt-4", "claude-3-opus"]
}
```

---

## 6.4 成本异常检测（正式）

### 算法：日成本突增

```
输入: 当日累计成本 vs 过去 7 日均值
输出: 是否成本异常

1. 计算过去 7 天日均成本 baseline_daily
2. 计算当日（至今）的成本 current_daily
3. 将 current_daily 按时间比例推算全天成本 projected_daily
4. 触发条件:
   a. projected_daily > 2x baseline_daily 且 baseline_daily > $1 → 中等告警
   b. projected_daily > 5x baseline_daily → 高告警
   c. 当日成本已达月预算 80% → 预算告警
```

### 参数

| 参数 | 默认值 | 说明 |
|------|:---:|------|
| `cost.baseline_days` | `7` | 基线天数 |
| `cost.spike_multiplier` | `2.0` | 突增倍数阈值（中等） |
| `cost.high_spike_multiplier` | `5.0` | 突增倍数阈值（高） |
| `cost.budget_warning_ratio` | `0.8` | 预算告警比例 |
| `cost.min_baseline_usd` | `1.0` | 最低基线成本（避免小样本误报） |

### 告警输出

```json
{
  "alert_type": "cost_anomaly",
  "severity": "medium",
  "project": "my-assistant",
  "current_cost_usd": 12.50,
  "projected_daily_cost_usd": 25.00,
  "baseline_daily_cost_usd": 8.00,
  "spike_ratio": 3.13,
  "message": "Today's projected cost ($25.00) is 3.1x your 7-day average ($8.00)."
}
```

---

## 6.5 用户自定义告警（Dashboard 配置）

| 告警类型 | 可配置参数 | 通知渠道 |
|----------|-----------|----------|
| 成本预算告警 | 月预算金额 ($) | Email |
| 错误率告警 | 错误率阈值 (%) | Email |
| 延迟告警 | 延迟阈值 (ms) | Email (Slack 开发中) |

---

## 6.6 实验性标记声明

> ⚠️ **Loop Detection is an EXPERIMENTAL feature.**
>
> It uses text similarity heuristics and may produce false positives or miss actual loops. Do NOT use loop detection alerts to automatically stop or modify agent behavior. Always verify manually before taking action.
>
> We are actively improving detection with: (1) semantic similarity via embedding, (2) API call pattern analysis, (3) cost trajectory analysis. Your feedback on false/true positives is invaluable — please flag issues on GitHub.

---

# 七、GitHub README 优化

> **目标**：开发者打开仓库 10 秒内理解这是什么、怎么用、马上试。

---

## 7.1 优化后 README 全文

```markdown
# 🛡️ MCP Beacon

<h3 align="center">AI Agent Observability — 3 Lines of Code</h3>

<p align="center">
  <img src="https://img.shields.io/npm/v/mcp-beacon?color=%23F97316" alt="npm version">
  <img src="https://img.shields.io/npm/dt/mcp-beacon?color=%23F97316" alt="npm downloads">
  <img src="https://img.shields.io/github/license/mcp-beacon/mcp-beacon" alt="license">
  <img src="https://img.shields.io/github/stars/mcp-beacon/mcp-beacon" alt="stars">
  <a href="https://discord.gg/mcpbeacon"><img src="https://img.shields.io/discord/xxxxx?color=%237289DA&label=Discord" alt="Discord"></a>
</p>

<p align="center">
  <img src="assets/dashboard-screenshot.png" alt="MCP Beacon Dashboard" width="800">
</p>

---

## What is MCP Beacon?

**Real-time monitoring, cost tracking, and anomaly detection for every AI agent you run.**

- 📊 **Live Dashboard** — Every API call, token spent, and millisecond tracked
- 💰 **Cost Tracking** — Per agent, per model, per day. Never wake up to a surprise bill
- 🚨 **Anomaly Detection** — Agent stuck in a loop? Error rate spiking? We catch it
- 🔍 **Conversation Trace** — Debug agent behavior by replaying full call chains
- 🔌 **3 Lines of Code** — Non-blocking, async, zero performance impact

---

## Quick Start

```bash
npm install mcp-beacon
```

```javascript
import OpenAI from 'openai';
import { Beacon } from 'mcp-beacon';

const beacon = new Beacon({ apiKey: process.env.MCP_BEACON_API_KEY });
const openai = beacon.wrap(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

// Your agent works exactly the same. We just added observability.
```

→ **[Get your free API key](https://app.mcpbeacon.asia)**

---

## Features

| Feature | Beta (Free) | Pro (Coming $15/mo) |
|---------|:---:|:---:|
| Agents monitored | 3 | 10 |
| Data retention | 30 days | 90 days |
| Real-time dashboard | ✅ | ✅ |
| Cost tracking | ✅ | ✅ |
| Error monitoring | ✅ | ✅ |
| Conversation trace | ✅ | ✅ |
| Email alerts | ✅ | ✅ |
| Slack alerts | ❌ | ✅ |
| Team access | ❌ | ✅ |
| CSV export | ✅ | ✅ |

---

## Supported SDKs

- ✅ OpenAI SDK v4.x
- ✅ Anthropic SDK v0.x
- ✅ DeepSeek SDK latest
- ✅ Native fetch (Node 18+)
- ✅ axios 1.x
- 🔜 Python SDK (coming soon)

---

## How It Works

```
┌────────────┐     ┌──────────────┐     ┌───────────┐
│ Your Agent │────▶│ mcp-beacon   │────▶│ Dashboard │
│  (SDK)     │     │ (async batch)│     │ (real-time)│
└────────────┘     └──────────────┘     └───────────┘
       │                                        │
       ▼                                        ▼
  OpenAI / Anthropic / DeepSeek         Alerts → Email / Slack
```

---

## Privacy

We **never** store your prompts, completions, or payload content. Only metadata:
model name, token count, latency, status code, and cost. Your data stays yours.

[Read our privacy policy →](https://mcpbeacon.asia/privacy)

---

## Documentation

- [Quick Start Guide](https://docs.mcpbeacon.asia/quick-start)
- [API Reference](https://docs.mcpbeacon.asia/api-reference)
- [SDK Configuration](https://docs.mcpbeacon.asia/sdk-config)
- [Anomaly Detection Rules](https://docs.mcpbeacon.asia/anomaly-detection)
- [Pricing](https://mcpbeacon.asia/pricing)

---

## Community

- 🐛 [Report a Bug](https://github.com/mcp-beacon/mcp-beacon/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/mcp-beacon/mcp-beacon/issues/new?template=feature_request.md)
- 💬 [Join Discord](https://discord.gg/mcpbeacon)
- 🐦 [Follow on Twitter](https://twitter.com/mcpbeacon)

---

## License

MIT © 2026 MCP Beacon
```

---

## 7.2 README 优化 Checklist

| 优化项 | 说明 | 状态 |
|--------|------|:---:|
| Badge 栏 | npm version/downloads/license/stars/discord | 📋 |
| 截图 | Dashboard 截图（居中 800px 宽） | 📋 需 Designer |
| 一句话定位 | "3 Lines of Code" 在第一屏 | ✅ |
| Quick Start | 安装 + 最小示例 + 免费 Key 链接 | ✅ |
| Features 表格 | Free/Starter/Pro 对比一目了然 | ✅ |
| 架构图 | ASCII art 数据流 | ✅ |
| 隐私声明 | 强调不存 prompt | ✅ |
| 文档链接 | docs.mcpbeacon.asia | 📋 |
| Issue 模板 | bug_report / feature_request | 📋 |
| 社群链接 | Discord / Twitter | 📋 |

---

# 八、ProductHunt 发布文案

> **发布策略**：选周二/周三/周四（PH 流量高峰），北京时间 15:00（对应 PH 的 0:00 PT）。

---

## 8.1 Tagline

```
MCP Beacon — AI Agent Observability in 3 lines of code
```

备选：
```
MCP Beacon — Datadog for AI Agents. $19/mo.
```

---

## 8.2 Description

```
🛡️ MCP Beacon gives you real-time visibility into every AI agent you run.

Most AI developers are flying blind — they don't know what their
agents are doing, how much they're spending, or when they're about
to break. MCP Beacon fixes that.

⚡ 3 lines of code:
  import { Beacon } from 'mcp-beacon';
  const beacon = new Beacon({ apiKey: '...' });
  beacon.wrap(openai); // done.

🔍 What you get:
• Live dashboard — every API call, every token, every millisecond
• Cost tracking — per agent, per model, per day. No more surprise bills.
• Anomaly detection — agent stuck in a loop? We catch it.
• Conversation traces — debug agent behavior in seconds

💰 Pricing:
• Free during beta — 3 agents, 30-day retention, ALL features
• Pro $15/mo (coming later) — 10 agents, 90 days, Slack alerts
• Team $39/mo (coming later) — unlimited agents & retention

🛠️ Works with: OpenAI, Anthropic, DeepSeek, fetch, axios (Python SDK soon)

🔒 We NEVER store your prompts or completions — only metadata.

Try it free → mcpbeacon.asia
GitHub → github.com/mcp-beacon/mcp-beacon
```

---

## 8.3 First Comment（发布后立即自己发）

```
Hey Product Hunt! 👋

Maker here. I built MCP Beacon because I was tired of waking up to
$200 surprise bills from agents running overnight, and spending hours
grep-ing through logs to debug why my agent gave wrong answers.

The "aha" moment: every AI developer is already doing monitoring
manually — checking logs, calculating costs in spreadsheets, writing
custom alert scripts. MCP Beacon just automates all of it.

A few things I'd love feedback on:
1. What's your biggest agent monitoring pain point?
2. Would you pay $15/month for this?
3. What other AI SDKs should we support?

Tech stack: Next.js 15 + Supabase + DeepSeek V3 + Vercel. Built
solo over 12 weeks. Open source SDK (MIT).

Happy to answer any questions! 🙏
```

---

## 8.4 Maker Info

```
Maker: Ari Lee
Role: Solo Founder & Developer
Twitter: @xxx
GitHub: github.com/xxx
Location: China
```

---

## 8.5 发布日 Checklist

| 时间 | 动作 |
|------|------|
| 前一天 | 确认 Landing Page + Dashboard 100% 可用 |
| 前一天 | 准备社交媒体帖子（Twitter/X, 掘金, 知乎） |
| 当天 15:00 | ProductHunt 提交发布 |
| 15:05 | 发布 First Comment |
| 15:30 | Twitter/X 发帖，带 PH 链接 |
| 16:00 | 掘金/知乎 发推广文章 |
| 全天 | 实时回复 PH 评论（5 分钟内） |
| 次日 | 分析 PH 数据，整理用户反馈 |
| 一周后 | PH Badge 添加到 README + Landing Page |

---

## 8.6 社交媒体推文模板

### Twitter/X（主推文）
```
I built MCP Beacon — AI Agent monitoring in 3 lines of code.

My agents were burning $200/night and I had no idea.
So I built the thing every AI dev needs but nobody made.

→ Real-time dashboard
→ Cost tracking (never surprise bills again)
→ Loop detection (catches stuck agents)

npm install mcp-beacon
Free tier available.

mcpbeacon.asia 🚀
```

### 掘金/知乎（中文推广）
```
标题：我的 Agent 一晚烧了 $87，于是我做了这个开源监控工具

做了个开源项目 MCP Beacon — AI Agent 运行时监控平台。

3 行代码接入：
  import { Beacon } from 'mcp-beacon';
  const beacon = new Beacon({ apiKey: 'xxx' });
  beacon.wrap(openai); // 搞定

之后每个 API 调用、每分钱花在哪、Agent 有没有陷入循环——
Dashboard 里全能看到。

技术栈：Next.js 15 + Supabase + DeepSeek V3
开源 MIT 协议。免费层 1 个 Agent 无限制使用。

欢迎试用+Star ⭐️
→ mcpbeacon.asia
→ github.com/mcp-beacon/mcp-beacon
```

---

# 九、用户反馈收集流程

> **原则**：反馈入口要低门槛，分类要自动化，优先级要数据驱动。

---

## 9.1 反馈渠道总览

| 渠道 | 面向 | 用途 |
|------|------|------|
| **GitHub Issues** | 开发者 | Bug Report / Feature Request / SDK 兼容性问题 |
| **Dashboard 内嵌反馈** | 所有用户 | NPS 评分 + 快速文本反馈 |
| **Discord** | 社区 | 实时讨论、Use Case 分享 |
| **Email（support@mcpbeacon.asia）** | 付费用户 | 1-on-1 支持、敏感问题 |
| **产品内 NPS 弹窗** | 活跃用户 | 量化满意度 |

---

## 9.2 GitHub Issue 模板

### Bug Report 模板（`.github/ISSUE_TEMPLATE/bug_report.md`）

```markdown
---
name: 🐛 Bug Report
about: Report a bug in MCP Beacon
title: '[Bug] '
labels: ['bug', 'triage']
assignees: ''
---

### Describe the bug
A clear and concise description of what the bug is.

### To Reproduce
Steps to reproduce the behavior:
1. SDK version: `x.x.x`
2. Node version: `x.x`
3. Code snippet:
```javascript
// Paste minimal reproduction code here
```
4. What happened?
5. What did you expect to happen?

### Environment
- OS: [e.g. Ubuntu 22.04, macOS 14]
- Node.js version: [e.g. 18.17, 20.10]
- mcp-beacon version: [e.g. 0.1.0]
- AI SDK(s) affected: [e.g. OpenAI v4.12, Anthropic v0.5]

### Screenshots / Logs
If applicable, add screenshots or paste error logs.

### Additional context
Add any other context about the problem here.
```

### Feature Request 模板（`.github/ISSUE_TEMPLATE/feature_request.md`）

```markdown
---
name: 💡 Feature Request
about: Suggest an idea for MCP Beacon
title: '[Feature] '
labels: ['enhancement', 'triage']
assignees: ''
---

### Is your feature request related to a problem?
A clear description of the problem. Ex: "I'm frustrated when [...]"

### Describe the solution you'd like
What should MCP Beacon do?

### Describe alternatives you've considered
Any workarounds you're currently using?

### Which plan are you on?
- [ ] Beta (Free)

### Additional context
Add any other context or screenshots here.
```

---

## 9.3 反馈优先级分类标准

| 优先级 | 标签 | 定义 | 响应时间 | 示例 |
|:---:|------|------|:---:|------|
| 🔴 **P0** | `critical` | 服务不可用、数据丢失、安全漏洞 | <4 小时 | "Dashboard 500 error 所有用户"、"API Key 泄露" |
| 🟠 **P1** | `high` | 核心功能故障、重度用户受阻 | <24 小时 | "用户看不到成本数据"、"SDK 上报全部失败" |
| 🟡 **P2** | `medium` | 非核心功能 Bug、UX 问题 | <1 周 | "图表颜色看不清"、"Dashboard 加载慢" |
| 🟢 **P3** | `low` | 锦上添花、长期改进 | 下个迭代 | "支持 Rust SDK"、"增加暗色模式主题切换" |

### Feature Request 优先级矩阵

| 影响用户数 | 高频需求 | 低频需求 |
|:---:|:---:|:---:|
| **多数用户** | 🔴 P0 立刻做 | 🟡 P2 排期做 |
| **重度用户** | 🟠 P1 优先做 | 🟡 P2 排期做 |
| **少数用户** | 🟡 P2 评估 ROI | 🟢 P3 社区贡献 |

---

## 9.4 反馈处理流程

```
┌─────────────┐
│ 用户提交反馈  │
└──────┬──────┘
       ▼
┌─────────────┐     ┌──────────────┐
│ 自动打标签    │────▶│ AI PM 分类    │
│ (bot)       │     │ (每周 2 次)   │
└─────────────┘     └──────┬───────┘
                           ▼
                  ┌────────────────┐
                  │ 优先级判定       │
                  │ P0/P1/P2/P3    │
                  └───────┬────────┘
                          ▼
         ┌────────────────┴────────────────┐
         ▼                                 ▼
   ┌──────────┐                      ┌──────────┐
   │ P0/P1   │                       │ P2/P3   │
   │ → 立即    │                      │ → Sprint │
   │   Kanban  │                      │   Backlog │
   │   任务    │                       │          │
   └──────────┘                      └──────────┘
         │                                 │
         ▼                                 ▼
   ┌──────────────────────────────────────────┐
   │          开发完成 → 通知用户 → 关闭 Issue  │
   └──────────────────────────────────────────┘
```

---

## 9.5 NPS 调查（产品内嵌）

### 触发规则

- 注册后第 7 天 → 弹出 NPS 调查
- 注册后第 30 天 → 第二次弹出
- 之后每 90 天一次

### 问题设计

```
Q1: How likely are you to recommend MCP Beacon to a friend or colleague?
    [0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

Q2 (if <=6): What's the main reason for your score?
    [Free text]

Q3 (if >=9): What do you love most about MCP Beacon?
    [Free text]

Q4: What feature would you most like to see next?
    [Free text]
```

### NPS 分级处理

| NPS 区间 | 分类 | 动作 |
|:---:|------|------|
| 9-10 | Promoter | 邀请加入 Discord 社区、请求 Testimonial |
| 7-8 | Passive | 不打扰，观察使用行为 |
| 0-6 | Detractor | AI PM 回复、了解痛点、优先处理 |

---

## 9.6 反馈闭环 SLA

| 动作 | 时限 |
|------|:---:|
| Issue 自动确认回复 | 即时（Bot） |
| P0 人工确认 | <4 小时 |
| P1 人工确认 | <24 小时 |
| P2/P3 确认 | <3 个工作日 |
| Bug 修复后通知 | 修复当天 |
| Feature 完成后通知 | 上线当天 |
| 月度反馈报告 | 每月 1 日发送给付费用户 |

---

## 9.7 数据驱动优先级（季度 Review）

每个季度，AI PM 汇总：

| 指标 | 用途 |
|------|------|
| 每个 Feature Request 的 👍 数 | 社区热度排序 |
| 付费用户 vs Free 用户的请求比例 | 判断付费用户是否得到了足够关注 |
| Bug 类型分布（SDK / Dashboard / API） | 判断哪个模块质量最差 |
| 平均 Issue 解决时间 | 团队效率指标 |
| NPS 趋势 | 整体满意度方向 |

---

# 附录：文档版本记录

| 版本 | 日期 | 作者 | 变更 |
|:---:|------|------|------|
| V1.0 | 2026-05-31 | AI PM | 初始版本，9 项产品文档全集 |
| V1.1 | 2026-05-31 | AI PM | 新增 3.6 节「免费优先策略：Pro $15/月 达标启动模式」定价分析 |
| — | — | — | — |

---

> 📁 **文档路径**：`D:\Hermes\mcp-beacon\PM_产品文档合集.md`
> 📋 **关联文档**：`MCP_BEACON_商业提案.md` / `MCP_Beacon_执行计划.md` / `痛点与需求分析.md`

---

# 二（续）、Landing Page 文案（免费优先策略·最终版）

> **版本**：V2.0 | **日期**：2026-05-31 | **作者**：AI PM
> **变更说明**：对齐「免费优先策略」，全面更新 Hero/Pricing/FAQ，Free Tier 从 1 Agent/7天 → 3 Agent/30天，Pro 从 $19/$100 → $15/$39
> **品牌调性**：专业但不冷，技术但不晦涩。像 Vercel 一样简洁，像 Linear 一样精致。
> **配色**：暖橙 #F97316 + 深色背景（#1A1A2E）
> **字体**：Outfit（标题）/ Inter（正文）/ JetBrains Mono（代码）

---

## 2.1 Hero Section

```
标题：    Your AI Agents. Fully Observable.
          Free. Forever.

副标题：  3 lines of code. Real-time monitoring, cost tracking, and
          anomaly detection for every AI agent you run — starting at $0.

CTA按钮： [Start Monitoring Free →]   [npm install mcp-beacon ↗]

小字：    No credit card. 3 agents free. 30-day data retention.
```

### 中文版

```
标题：    你的 AI Agent，尽在掌控。
          永久免费。

副标题：  3 行代码接入。实时监控、成本追踪、异常告警 —
          全部功能免费开放，无需信用卡。

CTA按钮： [免费开始监控 →]   [npm install mcp-beacon ↗]

小字：    无需信用卡。3 个 Agent 永久免费。30 天数据保留。
```

### 设计交付对齐

- 设计师已交付 `design/landing-page.html`，其中 Pricing 部分需更新为本文档的免费优先定价
- Hero 区域使用深色背景 `#1A1A2E`，终端窗口视觉已就绪
- CTA 主按钮暖橙 `#F97316`，hover 态 `#EA580C`

---

## 2.2 Features Section

### Feature 1: 📊 Real-Time Dashboard

```
标题：    See Everything. Miss Nothing.

描述：    Every API call, every token spent, every millisecond of
          latency — streamed to your dashboard in real time.

亮点：    • Live agent status (online / offline / idle)
          • 7-day trend charts for calls, cost, and errors
          • Drill down to individual conversation traces
          • Dark-mode native dashboard
```

### Feature 2: 💰 Cost Tracking That Pays For Itself

```
标题：    Know Exactly Where Your Money Goes.

描述：    "My agent ran overnight and burned $87." — Never again.
          Track cost per agent, per model, per day. Set budgets.
          Get alerts before it's too late.

亮点：    • Token counting with model-specific pricing
          • Cost breakdown: Agent → Model → Day → Single Call
          • Budget alerts: "You've spent 80% of your monthly limit"
          • CSV export — take your data anywhere
```

### Feature 3: 🚨 Anomaly Detection

```
标题：    Catch Problems Before Your Users Do.

描述：    Agent stuck in a loop? Error rate spiking? Cost suddenly
          3x normal? We detect it and alert you — so you can fix
          it before your customers notice.

亮点：    • Loop detection: catches repetitive API call patterns
          • Error rate spike detection with sliding windows
          • Cost anomaly alerts (daily spend > 200% of baseline)
          • Email alerts built in (Slack integration coming soon)
```

### Feature 4: 🔍 Conversation Trace Viewer

```
标题：    Debug Agent Behavior in Seconds, Not Hours.

描述：    When your agent gives a wrong answer, trace every API
          call it made — full request/response context, latency,
          and cost — in a single timeline view.

亮点：    • Full call chain per conversation session
          • Latency breakdown per API call
          • Request/response summaries (not raw payloads)
          • Filter by model, status code, or cost
```

### Feature 5: 🔌 3-Line Integration

```
标题：    The Easiest Integration You'll Ever Do.

描述：    import { Beacon } from 'mcp-beacon';
          const beacon = new Beacon({ apiKey: '...' });
          beacon.wrap(openai); // That's it.

          Your existing code keeps working. We just add observability.

亮点：    • Zero-config for OpenAI, Anthropic, DeepSeek
          • Non-blocking async batching — <50ms overhead
          • Works with fetch and axios out of the box
          • npm install mcp-beacon — one command, ready to go
```

### Feature 6: 🔐 Privacy First

```
标题：    Your Data Stays Yours.

描述：    We never store raw request/response payloads. Only metadata:
          model, token count, latency, status code, cost. Your prompts
          and completions are YOUR business.

亮点：    • No raw payload storage — metadata only
          • API keys encrypted at rest
          • GDPR-ready data export & deletion
          • Self-host option on roadmap (Enterprise)
```

---

## 2.3 Social Proof Section（上线后填充）

```
标题：    Trusted by AI Developers

占位：    [Logo 1]  [Logo 2]  [Logo 3]  [Logo 4]  [Logo 5]
          上线后从免费用户中挑选愿意展示 Logo 的用户

引用1：   "Finally, I can see what my agents are actually doing.
           Saved me $200 in the first week." — Dev Name, @twitter

引用2：   "The 3-line integration is not a marketing gimmick.
           It really is that simple." — Dev Name, @github

数据：    XX Agents monitored · XX,XXX API calls tracked · $XX,XXX cost saved
```

---

## 2.4 Pricing Section（免费优先策略）

### 定价总览

```
┌─────────────────┬──────────────────┬──────────────────┐
│      FREE        │       PRO        │      TEAM        │
│      $0/mo       │     $15/mo       │    $39/mo        │
│   永久免费        │   个人专业版       │   团队协作版       │
├─────────────────┼──────────────────┼──────────────────┤
│ 3  Agent         │ 10 Agents        │ Unlimited Agents │
│ 30-day data      │ 90-day data      │ Unlimited data   │
│ Full dashboard   │ Full dashboard   │ Full dashboard   │
│ Basic alerts     │ Advanced alerts  │ Advanced alerts  │
│ Email            │ Email + Slack    │ Email + Slack    │
│ CSV export       │ CSV export       │ CSV export       │
│ Community        │ Priority support │ Dedicated        │
│                  │ Cost breakdown   │ Team access      │
│                  │ Custom thresholds│ Admin roles      │
│                  │                  │ Audit logs       │
├─────────────────┼──────────────────┼──────────────────┤
│ [Start Free]     │ [Go Pro →]       │ [Contact Us]     │
└─────────────────┴──────────────────┴──────────────────┘
```

### 各套餐详细说明

**🆓 Free — $0/月（永久免费）**

面向独立开发者和小型项目。

| 项目 | 详情 |
|------|------|
| Agent 数量 | **3 个**（够个人开发者日常使用） |
| 数据保留 | **30 天**滚动保留 |
| 核心监控 | ✅ 全部开放：实时仪表盘、API 调用追踪、延迟监控 |
| 成本追踪 | ✅ Token 计数 + 模型价格估算 |
| 告警 | ✅ 基础异常告警（Email 通知） |
| 数据导出 | ✅ CSV 导出 |
| 支持 | 社区支持（GitHub Issues） |
| 限制 | 团队协作 ❌ / Slack 通知 ❌ / 自定义阈值 ❌ |

> 💡 设计原则：Free 版足够好用到让人「愿意付费升级」，而不是「被迫付费解锁」。参考 Linear / Figma 免费增值模型。

**⭐ Pro — $15/月**

面向重度个人开发者和专业用户。

| 项目 | 详情 |
|------|------|
| Agent 数量 | **10 个** |
| 数据保留 | **90 天** |
| 高级告警 | ✅ 自定义阈值 + 成本异常 + 错误率告警 |
| 通知渠道 | ✅ Email + **Slack** 集成 |
| 成本分析 | ✅ 按 Agent/模型/日期 三级成本拆解 |
| 性能建议 | ✅ Prompt 效率分析 + 换模型推荐 |
| 支持 | ✅ 优先响应（24h 内） |

**👥 Team — $39/月**

面向小团队协作和企业场景。

| 项目 | 详情 |
|------|------|
| Agent 数量 | **无限** |
| 数据保留 | **无限** |
| 团队管理 | ✅ 成员邀请 + Owner/Admin/Member 三级权限 |
| 审计 | ✅ 操作审计日志 |
| 支持 | ✅ 专属支持通道 |
| 未来 | 🔜 SSO/SAML · 私有部署（Enterprise 可选） |

### 定价策略说明

```
策略：免费优先 → 数据驱动 → 渐进收费

当前阶段（Phase 0-1）：MVP 全部功能免费开放，积累用户和反馈。
收费触发条件（全部达标后启动）：
  • 注册用户 > 200
  • 周活跃 (WAU) > 50
  • D30 留存率 > 40%
  • NPS > 40

早期用户福利：收费启动后，现有免费用户永久保留 Free 权益，
首批 Pro 用户享受 50% 永久折扣。
```

---

## 2.5 FAQ Section

**Q: 什么是 MCP Beacon？它监控什么？**
A: MCP Beacon 是 AI Agent 的运行时监控平台。我们追踪 Agent 的每一次 LLM API 调用（模型、Token 数、延迟、成本）、每一次 HTTP 请求（URL、状态码、响应时间），以及聚合指标如错误率和成本趋势。我们**不存储**原始 Prompt 和回复内容。

**Q: 和 LangSmith / Helicone 有什么区别？**
A: LangSmith 专注 LangChain 调试，$39/月起，框架绑定。Helicone 做 LLM API 日志记录很好，但不做 Agent 行为级监控（循环检测、成本告警、多轮调用追踪）。MCP Beacon 框架无关、3 行代码接入、覆盖 Agent 全生命周期——不只是 API 日志。

**Q: 会影响我的 Agent 性能吗？**
A: 不会。所有数据采集都是异步批量处理，SDK 额外延迟 <50ms。非阻塞设计确保你的 Agent 性能不受任何影响。

**Q: 你们存储什么数据？**
A: 仅元数据——模型名称、Token 数量（估算）、延迟、HTTP 状态码、成本（计算得出）。我们**从不存储**你的 Prompt、模型回复内容或任何载荷数据。

**Q: 支持哪些 AI SDK 和框架？**
A: 当前支持：OpenAI v4、Anthropic v0、DeepSeek。HTTP 层支持 fetch 和 axios。Python SDK 正在开发中。

**Q: 免费版能用多久？有什么限制？**
A: Free 版**永久免费**。包含 3 个 Agent、30 天数据保留、全部核心功能（实时仪表盘、成本追踪、基础告警、CSV 导出）。没有隐藏收费，没有试用期陷阱。当你的 Agent 超过 3 个、需要更长数据保留或高级功能时，可以升级到 Pro（$15/月）。

**Q: 可以私有部署吗？**
A: 私有部署在企业路线图中（Team 及以上套餐）。当前我们托管在 Supabase (PostgreSQL) 上，所有数据加密存储。

**Q: 怎么开始使用？**
A: 三步：1) `npm install mcp-beacon`  2) 在 Dashboard 获取免费 API Key  3) 加 3 行代码：`import { Beacon } from 'mcp-beacon'; const beacon = new Beacon({ apiKey: '...' }); beacon.wrap(openai);` — 搞定！5 分钟内看到第一条监控数据。

**Q: 有数据安全保障吗？**
A: 有。API Key 加密存储、不存储原始载荷、支持 GDPR 数据导出和删除。私有部署方案也在路线图中。

**Q: 收费后我的免费账户会怎样？**
A: 放心。收费启动后，**现有免费用户一切不变**——你当前的 Free 权益永久保留。只有当你需要升级到 Pro 或 Team 时才需要付费。早期 Pro 用户还可享受 50% 永久折扣。

---

## 2.6 Footer

```
© 2026 MCP Beacon. Built for the agent era.
[GitHub] [npm] [Docs] [Blog] [Status]
```

---

## 2.7 与设计师交付的对齐说明

设计师已交付 `design/landing-page.html`，包含 8 个 Section。以下需更新以对齐本文档：

| 设计师原内容 | 更新为 | 原因 |
|-------------|--------|------|
| Pricing: Pro $29/月 | **Pro $15/月** | 对齐免费优先策略 |
| Pricing: Starter Free | **Free（保持）** | 一致 |
| Free: 1 Agent / 7天 | **3 Agents / 30天** | 策略更新：更慷慨的免费层加速获客 |
| Enterprise Custom | **Team $39/月** | 策略更新：先跑通 SMB 市场 |
| FAQ Q6 免费版限制 | 更新为 3 Agent/30天 | 对齐策略 |

> **AI Designer 跟进**：请更新 `design/landing-page.html` 中的 Pricing Section 和 FAQ Section 以匹配本文档。

---

*文案完毕。下一步：AI Designer 更新 HTML，AI Coder 实现 Landing Page。*
