# 🚀 MCP Beacon — 分角色任务清单

> 所有任务按角色拆分，每项含：编号、产出、周期、依赖

---

## 👤 Ari Lee — 必做清单（7项）

### Week 1（5项，30分钟内完成）

- [ ] **A1** 注册域名 `mcpbeacon.asia`（阿里云/腾讯云，~¥60/年）
- [ ] **A2** 注册 Vercel 账号 → GitHub 登录 → 绑定 mcp-beacon 仓库
- [ ] **A3** 注册 Supabase 账号 → 创建项目 → 拿 URL + anon key + service_role key
- [ ] **A4** 注册 DeepSeek API → platform.deepseek.com → 充值¥35 → 拿 API Key
- [ ] **A5** GitHub 新建仓库 `mcp-beacon` → Public → 推给 AI Team

### Week 2-8（1项）

- [ ] **A6** 配置域名 DNS（CNAME → Vercel）

### Week 6

- [ ] **A7** npm 账号注册 → npmjs.com → 拿 Access Token

### 未来（收费触发后）

- [ ] **A8** 注册 Lemon Squeezy 账号 → 拿 API Key

### 审批节点（4次）

- [ ] **审批1** Week 1 — 批准 MVP 范围
- [ ] **审批2** Week 3 — 审阅 Landing Page 设计稿
- [ ] **审批3** Week 7 — 审阅 SDK MVP（可 npm install 测试）
- [ ] **审批4** Week 12 — 批准正式上线

### 上线后市场推广（Ari 可访问渠道）

- [ ] **推广1** 掘金 写 MCP Beacon 接入教程文章
- [ ] **推广2** 知乎 回答 MCP/Agent 监控相关话题
- [ ] **推广3** 少数派 效率工具推荐投稿
- [ ] **推广4** 联系 2-3 个国内 AI 开发者 KOL 试用

---

## 🤖 AI Coder — 开发清单（25项）

### Phase 1: 基础设施（Week 1-2）

- [ ] **C1** 搭建 Next.js 15 项目骨架（App Router + TypeScript + Tailwind CSS）
- [ ] **C2** 搭建 Supabase 数据库 Schema（users/projects/agents/sessions/alerts/events 6表）
- [ ] **C3** 实现 Supabase Auth（Magic Link + GitHub OAuth）
- [ ] **C4** 搭建 Vercel CI/CD（GitHub Push → 自动部署 Preview/Production）
- [ ] **C5** 开发 Landing Page（Hero + Features + How It Works + FAQ + CTA，响应式+暗色模式）
- [ ] **C6** 配置 OG Image + Favicon + SEO meta tags

### Phase 2: SDK 核心（Week 3-5）

- [ ] **C7** 实现 `beacon.wrap(openai)` 包装器（拦截 chat.completions.create → 记录调用）
- [ ] **C8** 实现 `beacon.wrap(anthropic)` 包装器
- [ ] **C9** 实现 `beacon.wrap(deepseek)` 包装器
- [ ] **C10** 实现 HTTP 请求拦截（fetch/axios 显式包装 → 记录延迟/状态码/body大小）
- [ ] **C11** 实现异步缓冲上报（批量上传 + 失败重试 + 离线缓存 + 不阻塞主流程）
- [ ] **C12** 实现 Token 计数估算（chars/4 + 模型价格映射 → 实时成本）
- [ ] **C13** 编写 SDK README.md + API Reference + Quick Start 指南
- [ ] **C14** npm 包配置（package.json + tsconfig + build script）→ `npm publish mcp-beacon`

### Phase 3: Ingest API（Week 5-6）

- [ ] **C15** 实现 POST `/api/ingest` → API Key 鉴权 → 校验 → 写入 Supabase
- [ ] **C16** 实现 QStash Cron 定时数据聚合（每小时/每天 → 物化视图）
- [ ] **C17** 实现 API 速率限制（按 API Key 限流 → 429 友好提示）

### Phase 4: 仪表盘（Week 7-9）

- [ ] **C18** 仪表盘概览页面（Agent数/总调用/总成本/在线状态/7天趋势图）
- [ ] **C19** 成本追踪面板（按 Agent/模型/日期 拆解 + 预算告警 + CSV 导出）
- [ ] **C20** 会话记录查看器（单次会话详情：每轮API调用/延迟/Token/成本）
- [ ] **C21** 告警规则设置页（用户自定义阈值：成本/错误率/延迟）
- [ ] **C22** 项目 & API Key 管理页（多项目 + Key 生成/吊销 + 团队邀请）

### Phase 5: 异常检测 MVP（Week 9-10）

- [ ] **C23** 实现循环检测（Jaccard/LCS 逐轮文本相似度 → "实验性"标记）
- [ ] **C24** 实现错误率异常告警（滑动窗口 → 错误率突增 → 通知）
- [ ] **C25** 实现成本异常告警（日均成本突增>200% → 告警）

### Phase 6: 用户数据 & 反馈系统（Week 10-11）🆕

- [ ] **C26** 自建用户行为埋点 SDK（匿名事件采集 → Supabase events 表）
- [ ] **C27** NPS 问卷组件（接入后 7 天弹窗 + 结果存储）
- [ ] **C28** 内部用户分析仪表盘（仅团队可见：DAU/留存/功能使用率/流失信号）

### Phase 7: 上线（Week 11-12）

- [ ] **C29** 端到端集成测试（SDK → Ingest → Dashboard 全链路）
- [ ] **C30** npm 正式发布 `mcp-beacon@0.1.0`
- [ ] **C31** 部署文档站 docs.mcpbeacon.asia（Quick Start + API Reference + Examples）

---

## 🎨 AI Designer — 设计清单（8项）

### Week 1-2

- [ ] **D1** 设计 Brand Guide（Logo概念 + #F97316暖橙配色 + Outfit/Inter字体 + 品牌准则）
- [ ] **D2** 设计 Logo（六边形 + 灯塔/R + 放射线，5版方案 → Ari选1）
- [ ] **D3** 设计 Landing Page 视觉稿（8 Sections: Hero/Features/How/Pricing/FAQ/CTA/Footer）
- [ ] **D4** 设计 OG Image + Favicon（1200×630 + 32×32/180×180）

### Week 7-9（仪表盘 UI）

- [ ] **D5** 设计仪表盘概览页 UI（数据卡片 + 7天趋势图 + Agent列表布局）
- [ ] **D6** 设计成本面板 UI（柱状图/饼图 + 预算进度条 + 告警阈值交互）
- [ ] **D7** 设计 SDK 文档站视觉风格（与 Landing Page 统一 + 代码高亮主题）
- [ ] **D8** 设计 empty state / loading / error 全部状态 UI（新手首次接入场景）

---

## 📋 AI PM — 产品清单（9项）

### Week 1-2

- [ ] **P1** 编写 MVP PRD（功能范围/不做范围/验收标准/优先级 P0-P3）
- [ ] **P2** 编写 Landing Page 文案（Hero标题/副标题/Features描述/Pricing说明/FAQ）
- [ ] **P3** 编写定价策略对比分析（竞品定价 + 推荐 $19/$100 两档 + Free Tier 论证）

### Week 3-5

- [ ] **P4** 编写 SDK Quick Start 指南（面向开发者的 3行代码接入教程）
- [ ] **P5** 编写 SDK API Reference 文档（所有公开 API 的参数/返回值/示例）
- [ ] **P6** 编写异常检测规则文档（循环检测逻辑/阈值说明/"实验性"标记解释）

### Week 6+

- [ ] **P7** GitHub README 优化（Badge/截图/Quick Start/Features/链接）
- [ ] **P8** 准备 ProductHunt 发布文案（Tagline/Description/First Comment/Maker Info）
- [ ] **P9** 用户反馈收集流程（GitHub Issues 模板 + 优先级分类标准）

---

## 📈 AI Market — 市场清单（6项）

- [ ] **M1** 竞品深度对比报告（LangSmith/Datadog/Helicone 的功能/定价/目标用户/差距分析）
- [ ] **M2** MCP 生态调研（MCP 协议现状/主流框架/开发者数量/增长趋势）
- [ ] **M3** npm 生态分析（AI SDK 相关包下载量/竞品包名/关键词 SEO 策略）
- [ ] **M4** 定价验证报告（开发者付费意愿调研 + 建议定价 + 竞品价格锚点）
- [ ] **M5** 推广渠道优先级（ProductHunt/HN/Reddit/Twitter/掘金/知乎 的触达效率排序）
- [ ] **M6** 目标用户画像（AI Agent 开发者 × 3 类：独立开发者/SaaS团队/企业AI团队）

---

## 🔧 AI Leader — 协调清单（10项）

- [ ] **L1** 创建 Kanban 任务板，按角色分派全部 25+ 项开发任务
- [ ] **L2** 每日检查 Kanban 进度，阻塞项立即升级给 Ari
- [ ] **L3** Week 1 完成基础设施后 → Code Review + 集成验证
- [ ] **L4** Week 3 审阅 SDK 架构设计（接口设计/错误处理/兼容性矩阵）
- [ ] **L5** Week 5 审阅 Ingest API 安全性（API Key 鉴权/速率限制/数据校验）
- [ ] **L6** Week 7 审阅仪表盘 UX（空状态/加载态/错误态全覆盖）
- [ ] **L7** Week 9 审阅异常检测逻辑（阈值合理性/误报率测试/降级标记）
- [ ] **L8** Week 11 组织全链路集成测试（SDK→Ingest→Dashboard→告警 端到端）
- [ ] **L9** Week 12 向 Ari 提交上线 checklist（用户行为埋点已验证、NPS 组件就绪、反馈闭环打通）
- [ ] **L10** Week 12+ 每周向 Ari 汇报 MRR/用户数/关键指标 → 决策点建议

---

## 📊 总计

| 角色 | 任务数 | 周期 |
|------|:---:|------|
| 👤 Ari | 7 + 4审批 + 4推广 | W1-12+ |
| 🤖 AI Coder | 31 | W1-12 |
| 🎨 AI Designer | 8 | W1-9 |
| 📋 AI PM | 9 | W1-12 |
| 📈 AI Market | 6 | W1-4 |
| 🔧 AI Leader | 10 | W1-12+ |
| **合计** | **71 + 8** | |

---

*保存路径: `D:\Hermes\mcp-beacon\MCP_Beacon_角色任务清单.md`*
