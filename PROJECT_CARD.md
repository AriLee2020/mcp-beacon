# MCP Beacon — 项目状态卡片

最后更新: 2026-06-03 01:00

## 基本信息
- **文件夹**: `D:\Hermes\mcp-beacon\`
- **GitHub**: `AriLee2020/mcp-beacon`
- **域名**: `https://mcpbeacon.asia`
- **部署**: Vercel (GitHub 自动部署有缓存问题)
- **后端**: Supabase (`lhgogfjqcnsaehinctrt`)
- **状态**: 🟢 代码完成，🟡 等待 Vercel 清缓存部署

## ⚠️ Ari 醒来后需要做
**Vercel Redeploy（不要用 Build Cache）**:
1. 登录 https://vercel.com/arilee2020/mcp-beacon
2. Deployments → 最新一条 → `⋯` → Redeploy
3. ⚠️ 取消勾选 **"Use existing Build Cache"**
4. 选择 Production → Redeploy

## 已完成功能 (GitHub: `de92c47`)
| # | 功能 | 文件 |
|---|------|------|
| 1 | Magic Link 登录 | `auth/login`, `auth/callback` ✅ 测试通过 |
| 2 | Dashboard 首页 | `dashboard/page.tsx` ✅ 显示项目列表 |
| 3 | Create Project 弹窗 | `components/dashboard/create-project-dialog.tsx` |
| 4 | 项目创建 API | `api/projects/route.ts` — 创建项目+生成 API Key |
| 5 | 项目详情页 | `dashboard/projects/[id]/page.tsx` — Agents+Stats+Traces |
| 6 | 项目统计 API | `api/projects/[id]/stats/route.ts` |
| 7 | API Key 管理 | `api/projects/[id]/keys/route.ts` — 创建/列出 |
| 8 | Ingest API | `api/ingest/route.ts` — SDK 数据上报接收端 |
| 9 | SDK 包 | `packages/mcp-beacon-sdk/` — TypeScript 版 |
| 10 | Landing Page | 首页 "Get Started" 链接到 /auth/login |
| 11 | Cookie 修复 | callback 路由正确传递 auth cookies |
| 12 | Profile 自动创建 | Dashboard 兜底创建 profile |
| 13 | 域名修复 | `.dev` → `.asia` |

## 数据库
- 8 张表已迁移（profiles, projects, api_keys, agents, sessions, traces, alerts, alert_logs）
- RLS 策略完整
- 待执行: `002_auto_profile.sql`（需要 SQL Editor 运行）

## 当前阻塞
- 🟡 Vercel 部署缓存问题 — 新 API 路由未生效
- 🟡 Supabase 002 migration 未执行（需 SQL Editor 或管理 API）

## 下一阶段
- 端到端测试 Create Project 流程
- SDK 真实集成测试
- Webhook/Alert 通知
- 计费系统对接 Lemon Squeezy
