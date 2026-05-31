# MCP Beacon — 设计方案交付文档

> **设计师**: AI Designer (Kanban Task t_17803e19)
> **交付日期**: 2026-05-31
> **项目**: MCP Beacon — AI Agent 监控平台
> **设计风格**: Modern SaaS · 干净简约 · 有活力

---

## 📦 交付清单

| # | 产出物 | 文件 | 说明 |
|---|--------|------|------|
| 1 | Brand Guide | `design/DESIGN.md` | Google DESIGN.md 格式，完整品牌令牌 + 设计规范 |
| 2 | Logo v1 | `design/logo-v1-minimal.svg` | 极简几何 — 六边形 + 中心信标点 + 放射线 |
| 3 | Logo v2 | `design/logo-v2-lettermark.svg` | 字母标 — 六边形内含 "R" + 光束 |
| 4 | Logo v3 | `design/logo-v3-lighthouse.svg` | 灯塔造型 — 六边形内置灯塔塔身 + 信标光束 |
| 5 | Logo v4 | `design/logo-v4-horizontal.svg` | 横版组合 — 六边形图标 + "BEACON" 文字标 |
| 6 | Logo v5 | `design/logo-v5-abstract.svg` | 抽象几何 — 六边形分割 + 渐变暖色层次 |
| 7 | Landing Page | `design/landing-page.html` | 8 Section 完整落地页，响应式 + 暗色模式 |
| 8 | OG Image | `design/og-image.svg` | 1200×630 社交分享图 |
| 9 | Favicon | `design/favicon.svg` | 32×32 浏览器图标 |
| 10 | App Icon | `design/apple-touch-icon.svg` | 180×180 圆角应用图标 |
| 11 | Dashboard UI | `design/dashboard-overview.html` | 仪表盘概览页 — 数据卡片 + 7天趋势图 + Agent 列表 |
| 12 | Cost Panel UI | `design/cost-panel.html` | 成本面板 — 饼图/柱状图 + 预算进度 + 告警阈值 |
| 13 | SDK Docs | `design/sdk-docs-style.html` | SDK 文档站 — 与 LP 统一风格 + 代码高亮主题 |
| 14 | States UI | `design/all-states-ui.html` | 全状态 — Empty/Loading/Error/Warning/404/500/Onboarding |
| 15 | 本文档 | `Designer_设计交付.md` | 设计说明与交付清单 |

---

## 🎨 品牌设计系统

### 色彩
| 角色 | 色值 | 用途 |
|------|------|------|
| Primary | `#F97316` | Logo、主按钮、关键数据高亮、交互强调 |
| Primary Dark | `#EA580C` | 悬停态、按压态 |
| Primary Light | `#FDBA74` | 装饰性元素 |
| Primary Ghost | `#FFF7ED` | 标签背景、卡片悬停 |
| Surface Dark | `#1A1A2E` | 深色文字、暗色导航栏、CTA 背景 |
| Surface Card | `#FFFFFF` | 白色卡片表面 |
| Dashboard BG | `#0F1629` | 仪表盘暗色底色 |
| Page BG | `#F5F5F5` | 浅色页面背景 |

### 字体
| 层级 | 字体 | 字重 | 大小 |
|------|------|------|------|
| H1 | Outfit | 700 | 3.5rem (56px) |
| H2 | Outfit | 700 | 2.5rem (40px) |
| H3 | Outfit | 600 | 1.75rem (28px) |
| Body | Inter | 400 | 1rem (16px) |
| Code | JetBrains Mono | 400 | 0.875rem (14px) |

### 圆角
- 按钮/输入框: 8px
- 卡片: 12px
- 模态框: 16px
- 标签/Pill: 全圆

---

## 🏷️ Logo 设计说明

所有 Logo 均围绕 **"六边形信标"** 概念展开：
- **六边形** — 结构、精准、协议的几何表达
- **信标点/灯塔** — 监控、引导、MCP Beacon 核心理念
- **放射线** — 信号传播、覆盖范围、数据流向
- **暖橙色** — 活力、温暖、区别于传统监控工具的冷感

**推荐选择**: Logo v4（横版组合）适合大多数场景，Logo v1（极简）适合 Favicon 和小尺寸使用。

---

## 📄 Landing Page 设计

### 8 个 Section
1. **Hero** — 大标题 + 副标题 + CTA + 终端窗口视觉
2. **Features** — 6 卡片网格（实时监控/成本智能/告警/分析/MCP原生/企业级）
3. **How It Works** — 3 步骤流程（连接 → 观察 → 优化）
4. **Pricing** — 3 档定价（Starter Free / Pro $29 / Enterprise Custom）
5. **FAQ** — 4 个手风琴问答
6. **CTA** — 深色背景 + 反转按钮的最终行动号召
7. **Footer** — 4 列链接 + 版权

### 技术特性
- 响应式（Mobile / Tablet / Desktop）
- 暗色模式切换（CSS 变量 + data-theme）
- 入场动画（fadeUp）
- 自包含单文件，可直接浏览器打开

---

## 📊 仪表盘 UI 说明

### 仪表盘概览 (`dashboard-overview.html`)
- 深色主题 (`#0F1629` 底色)
- 4 个指标卡片（活跃 Agent / 总调用 / 成本 / 错误率）
- 7 天柱状趋势图（调用量 + 错误率）
- Agent 列表（状态灯 + 模型信息 + 调用数）
- 工具使用排行 + 最近告警
- 左侧导航栏

### 成本面板 (`cost-panel.html`)
- 本月/今日/预计/预算 4 摘要卡片
- 环形图（按 Agent 成本分布）
- 柱状图（按模型成本分布）
- 预算进度条（月预算 + 单 Agent 上限）
- 告警阈值交互（开关 + 编辑）
- 7 天每日明细表格

---

## 🔧 SDK 文档站风格

- 与 Landing Page 统一品牌色 + 字体
- 深色顶导航 + 搜索框
- 左侧固定侧边栏（Getting Started / Guides / SDK / Advanced）
- 代码块使用暖橙色语法高亮主题
- 暗色模式支持
- 包含 Introduction 示例内容 + 快速开始代码

---

## 🎯 状态 UI 覆盖

| 状态 | 场景 | 说明 |
|------|------|------|
| Empty | 首次接入 | 3 步引导 + 代理 URL 复制 |
| Loading | 数据加载中 | 旋转器 + 骨架屏 + 进度条 |
| Processing | 数据处理中 | 进度条 + 脉冲点 + 百分比 |
| Error | 连接失败 | 错误详情 + 重试/排查按钮 |
| Warning | 配额预警 | 使用率进度条 + 升级引导 |
| 500 | 服务端错误 | 错误码 + 返回仪表盘 |
| 404 | 页面不存在 | 搜索图标 + 导航建议 |
| Onboarding | 新用户欢迎 | 3 卡片步骤 + 快速开始 |
| Critical | 服务不可用 | Incident 编号 + 状态页链接 |

---

## 📁 文件结构

```
D:\Hermes\mcp-beacon\
├── design\
│   ├── DESIGN.md                  # 品牌设计系统规范
│   ├── logo-v1-minimal.svg        # Logo 方案 1
│   ├── logo-v2-lettermark.svg     # Logo 方案 2
│   ├── logo-v3-lighthouse.svg     # Logo 方案 3
│   ├── logo-v4-horizontal.svg     # Logo 方案 4
│   ├── logo-v5-abstract.svg       # Logo 方案 5
│   ├── og-image.svg               # OG 社交分享图
│   ├── favicon.svg                # 浏览器图标
│   ├── apple-touch-icon.svg       # iOS 应用图标
│   ├── landing-page.html          # 落地页
│   ├── dashboard-overview.html    # 仪表盘概览
│   ├── cost-panel.html            # 成本面板
│   ├── sdk-docs-style.html        # SDK 文档站
│   └── all-states-ui.html         # 全状态 UI
└── Designer_设计交付.md           # 本文档
```

---

## ⚠️ 需要确认的事项

1. **Logo 选型** — 5 个方案中请 Ari 选出最终方向，后续可深化
2. **Pricing 价格** — 当前为设计占位（$29/月 Pro），需与 PM 确认实际定价
3. **Favicon 生成** — SVG 已提供，需用工具导出 .ico 和 .png 多尺寸
4. **OG Image** — SVG 已提供，实际部署时建议渲染为 PNG（1200×630）
5. **Dashboard 实时数据** — 原型使用静态数据，开发时需接入真实 API
6. **字体加载** — HTML 使用 Google Fonts CDN，生产环境建议自托管

---

## 🔄 设计决策记录

| 决策 | 理由 |
|------|------|
| 暖橙色为主色 | 区别于传统监控工具的蓝/绿色，传递活力与温暖 |
| 六边形 + 信标隐喻 | 与项目名 "Beacon" 一致，六边形暗示协议的结构性 |
| 仪表盘用深色主题 | 长时间监控场景护眼，数据对比度更高 |
| 定价 3 档 | SaaS 行业标准，中间档高亮引导 |
| 文档站与 LP 统一风格 | 降低认知负担，品牌一致性 |
| Outfit + Inter 字体组合 | Outfit 有辨识度的圆角与六边形呼应；Inter 高可读性 |
