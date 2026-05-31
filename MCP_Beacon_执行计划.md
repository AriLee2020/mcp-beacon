# 🚀 MCP Beacon 执行计划

> **项目**: MCP Beacon — AI Agent 监控平台（SDK + 仪表盘 + 告警）
> **日期**: 2026-06-01
> **技术栈**: Next.js 15 + Supabase + DeepSeek V3 + Vercel Serverless
> **目标**: 12月 MRR $2,000-6,000
> **策略**: 单人全栈 + AI 团队自主开发，Ari 最小化投入

---

## 一、角色分工总览

| 谁 | 做什么 | 每周投入 |
|----|--------|:---:|
| **Ari** | 决策审批、域名/支付注册、市场推广、用户反馈 | <1小时/周 |
| **AI Team** | 全部开发、设计、测试、部署、文档 | 全自动 |

---

## 二、Ari 任务清单（仅需你做的事）

### 🔴 必须 Ari 亲自做（法律/支付/权限）

| # | 任务 | 时间 | 说明 |
|---|------|:---:|------|
| 1 | **注册域名 mcpbeacon.asia** | Week 1 | 在阿里云/腾讯云注册，~¥60/年 |
| 2 | **注册 Lemon Squeezy 账号** | Week 1 | lemonsqueezy.com → 激活 → 拿到 Publishable Key + Secret Key |
| 3 | **注册 Vercel 账号** | Week 1 | vercel.com → GitHub 登录 → 绑定项目 |
| 4 | **注册 Supabase 账号** | Week 1 | supabase.com → 创建项目 → 拿到 URL + anon key |
| 5 | **注册 DeepSeek API** | Week 1 | platform.deepseek.com → 充值 $5 → 拿 API Key |
| 6 | **GitHub 新建仓库** | Week 1 | github.com → New Repo → `mcp-beacon` → Public |
| 7 | **配置域名 DNS** | Week 2 | 域名 → DNS → CNAME 指向 Vercel |
| 8 | **设置 Lemon Squeezy Webhook** | Week 8 | Lemon Squeezy Dashboard → Webhooks → 指向 `mcpbeacon.asia/api/stripe` |
| 9 | **npm 账号注册** | Week 6 | npmjs.com → 注册 → 拿 Access Token（用于发布 SDK 包） |
| 10 | **Google Analytics 注册** | Week 2 | analytics.google.com → 创建 Property → 拿 Measurement ID |

### 🟡 Ari 审批节点

| # | 审批内容 | 时间 | 
|---|---------|:---:|
| A1 | 批准 MVP 范围（本计划） | Week 1 Day 1 |
| A2 | 审阅 Landing Page 设计稿 | Week 3 |
| A3 | 审阅 SDK MVP（npm 包可安装） | Week 7 |
| A4 | 批准正式上线 | Week 12 |

### 🟢 Ari 市场推广（Week 10+）

| # | 任务 | 说明 |
|---|------|------|
| 1 | 在 Twitter/X 发帖推广 | 发布日 + 每周 1 次 |
| 2 | 提交 ProductHunt | 发布日 |
| 3 | 在掘金/知乎写推广文章 | 中文开发者社区 |
| 4 | 联系 2-3 个 AI 开发者 KOL 试用 | 免费 Pro 账号换推广 |

---

## 三、AI Team 任务清单（开发全流程）

### Phase 1: 基础设施（Week 1-2）

| # | 任务 | 执行者 | 产出 | 预估 |
|---|------|:---:|------|:---:|
| D1 | 共享平台模板搭建 | @AI Coder | Next.js 项目骨架、认证系统、Lemon Squeezy 支付模板、响应式布局 | 1.5周 |
| D2 | Supabase 数据库 Schema | @AI Coder | users/projects/agents/sessions/alerts 表结构 + RLS | 0.5周 |
| D3 | CI/CD 流水线 | @AI Coder | Vercel 自动部署、GitHub Actions、环境变量配置 | 0.5周 |
| D4 | Brand Guide 设计 | @AI Designer | Logo、配色、字体（#F97316 暖橙 + Outfit/Inter）、品牌准则 | 0.5周 |
| D5 | Landing Page 设计+开发 | @AI Designer + @AI Coder | Hero + Features + Pricing + FAQ + CTA，响应式，暗色模式 | 1周 |

### Phase 2: SDK 核心（Week 3-5）

| # | 任务 | 执行者 | 产出 | 预估 |
|---|------|:---:|------|:---:|
| D6 | `beacon.wrap()` 显式包装器 | @AI Coder | 包装 OpenAI/DeepSeek SDK → 自动记录 API 调用 | 1.5周 |
| D7 | HTTP 请求拦截（显式） | @AI Coder | 支持的库：fetch/axios/got → 记录延迟、状态码、body大小 | 0.5周 |
| D8 | 异步缓冲上报 | @AI Coder | 批量上传、失败重试、离线缓存、不阻塞主流程 | 0.5周 |
| D9 | Token 计数（估算） | @AI Coder | chars/4 估算 + 模型价格映射 → 实时成本追踪 | 0.5周 |
| D10 | SDK 文档 | @AI PM + @AI Coder | README.md、API Reference、Quick Start 指南、npm 发布 | 0.5周 |

### Phase 3: Ingest API + 数据管道（Week 5-6）

| # | 任务 | 执行者 | 产出 | 预估 |
|---|------|:---:|------|:---:|
| D11 | Ingest API 端点 | @AI Coder | POST /api/ingest → 鉴权 → 校验 → 写入 Supabase | 1周 |
| D12 | 数据聚合管道 | @AI Coder | QStash Cron 定时聚合（每小时/每天）→ 物化视图 | 0.5周 |
| D13 | API 速率限制 | @AI Coder | 按 API Key 限流 → 429 友好提示 | 0.5周 |

### Phase 4: 仪表盘 + 前端（Week 7-9）

| # | 任务 | 执行者 | 产出 | 预估 |
|---|------|:---:|------|:---:|
| D14 | 仪表盘主页面 | @AI Coder + @AI Designer | 概览：Agent 数、总调用、总成本、在线状态、7天趋势 | 1周 |
| D15 | 成本追踪面板 | @AI Coder | 按 Agent/模型/日期 成本拆解、预算告警设置、导出 CSV | 1周 |
| D16 | 会话记录查看器 | @AI Coder | 单次会话详情：每轮 API 调用、延迟、Token 用量、成本 | 0.5周 |
| D17 | 告警规则设置 | @AI Coder | 用户自定义阈值（成本超$X、错误率>Y%、延迟>Zms） | 0.5周 |
| D18 | 项目/API Key 管理 | @AI Coder | 多项目切换、API Key 生成/吊销、团队成员邀请 | 0.5周 |

### Phase 5: 异常检测 MVP（Week 9-10）

| # | 任务 | 执行者 | 产出 | 预估 |
|---|------|:---:|------|:---:|
| D19 | 循环检测（文本相似度） | @AI Coder | Jaccard/LCS 逐轮相似度 → 标记"实验性" | 1周 |
| D20 | 错误率异常告警 | @AI Coder | 滑动窗口统计 → 错误率突增 → Slack/Email 通知 | 0.5周 |
| D21 | 成本异常告警 | @AI Coder | 日均成本突增>200% → 告警 | 0.5周 |

### Phase 6: 集成测试 + 上线（Week 11-12）

| # | 任务 | 执行者 | 产出 | 预估 |
|---|------|:---:|------|:---:|
| D22 | 端到端测试 | @AI Coder | SDK → Ingest → Dashboard 全链路验证 | 0.5周 |
| D23 | Landing Page 终版上线 | @AI Designer + @AI Coder | 文案终审、SEO meta、OG Image、GA 接入 | 0.5周 |
| D24 | npm 包正式发布 | @AI Coder | `npm publish mcp-beacon` → 版本 0.1.0 | 0.5周 |
| D25 | 文档站部署 | @AI PM + @AI Coder | docs.mcpbeacon.asia → Quick Start + API Reference + Examples | 0.5周 |

### Phase 7: 持续运营（Week 12+）

| # | 任务 | 执行者 | 产出 |
|---|------|:---:|------|
| M1 | Bug 修复 | @AI Coder | GitHub Issues → PR → 自动部署 |
| M2 | 用户反馈收集 | @AI PM | 整理 → 优先级排序 → 转化为 Kanban 任务 |
| M3 | SDK 生态维护 | @AI Coder | 适配新 HTTP 库、新 AI SDK 版本 |
| M4 | 异常检测模型迭代 | @AI Coder | 基于用户反馈调参、降低误报率 |

---

## 四、SDK 兼容性声明（MVP 范围）

| 支持 | 版本 | 说明 |
|------|:---:|------|
| OpenAI SDK | v4.x | `beacon.wrap(openai)` |
| Anthropic SDK | v0.x | `beacon.wrap(anthropic)` |
| DeepSeek SDK | latest | `beacon.wrap(deepseek)` |
| fetch (Node 18+) | global | 显式包装 |
| axios | 1.x | 显式包装 |

**MVP 不做**: 透明拦截、got/undici/gRPC、浏览器端

---

## 五、里程碑时间线

```
Week 1  ████████  基础设施 + 模板 + Schema + Brand + Landing Page 设计
Week 2  ████████  Landing Page 开发 + CI/CD
Week 3  ████████  SDK: wrap() + HTTP 拦截
Week 4  ████████  SDK: 缓冲上报 + Token 计数
Week 5  ████████  SDK 文档 + Ingest API
Week 6  ████████  数据管道 + 速率限制 + npm 账号就绪
Week 7  ████████  仪表盘: 概览页面
Week 8  ████████  仪表盘: 成本面板 + Lemon Squeezy Webhook
Week 9  ████████  仪表盘: 告警设置 + 项目管理
Week 10 ████████  异常检测: 循环检测 MVP
Week 11 ████████  异常检测: 错误率/成本告警
Week 12 ██████    集成测试 → 🚀 正式上线
```

---

## 六、资源投入

| 项目 | 金额 | 周期 |
|------|:---:|------|
| 域名 mcpbeacon.asia | ~$10 | 年付 |
| Vercel Pro | $20/月 | 月付 |
| Supabase Pro | $25/月 | 月付 |
| DeepSeek API | ~$20/月 | 按量 |
| QStash（可选） | $0/月 | 免费层 500条/天 |
| **总计** | **~$75/月** | |

> 启动一次性费用 ~$600（含模板搭建、SDK 开发、Landing Page），月运营 ~$75。

---

## 七、盈亏平衡

| 套餐 | 价格 | 所需用户数 | 
|------|:---:|:---:|
| Starter | $19/月 | 4 个 |
| Pro | $100/月 | 1 个 |

> **目标**: 上线 3 个月内达到 6 个 Pro 用户 → 月收入 $600 > 成本 $75。

---

## 八、关键风险 & 缓解

| # | 风险 | 等级 | 缓解 |
|---|------|:---:|------|
| 1 | SDK 兼容性被骂 | 🔴 | 声明支持范围，显式包装器，不做透明拦截 |
| 2 | 循环检测误报太高 | 🟡 | MVP 保守阈值，标"实验性"，宁可漏报 |
| 3 | 蓝海窗口提前关闭 | 🔴 | Week 1 即启动，不可延迟 |
| 4 | 单人开发瓶颈 | 🟡 | 调整预期，10-14周而非 2-4周 |
| 5 | 开发者不上传数据 | 🟡 | 开源 SDK 代码，支持 self-host，数据最小化 |

---

## 九、Ari 做出决策

| 决策 | 选项 | 建议 |
|------|------|:--:|
| 是否批准本计划？ | 批准 / 修改后批准 / 不批准 | ✅ 批准 |
| 定价策略？ | $19/$100 两档 / 增加 Free Tier | $19/$100 |
| 是否需要 Free Tier？ | 是 / 否 | 否——先验证付费意愿，Free Tier 稀释价值 |
| 上线日期？ | Week 12 / 提前 / 延后 | Week 12 |

---

*计划生成时间: 2026-06-01 | AI Leader 编制*
*保存路径: `D:\Hermes\mcp-beacon\MCP_Beacon_执行计划.md`*
