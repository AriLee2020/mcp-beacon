# MCP Beacon — 项目状态卡片

最后更新: 2026-06-02 01:30

## 基本信息
- **文件夹**: `D:\Hermes\mcp-beacon\`
- **GitHub**: `AriLee2020/mcp-beacon`
- **域名**: `https://mcpbeacon.asia`
- **部署**: Vercel (自动部署)
- **后端**: Supabase (`lhgogfjqcnsaehinctrt`)
- **状态**: 🔴 开发中

## 当前阻塞
- 🟡 Magic Link 登录 → hash token 处理刚部署，待验证
- 🟢 邮件限制已解除（200 OK）

## 关键配置
| 配置项 | 值 |
|--------|-----|
| Supabase Site URL | `https://mcpbeacon.asia` |
| Redirect URLs | `.../auth/callback`, `...` |
| NEXT_PUBLIC_SUPABASE_URL | `https://lhgogfjqcnsaehinctrt.supabase.co` |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | `.env.local` 中 |
| SUPABASE_SERVICE_ROLE_KEY | `.env.local` 中 |

## 数据库
- 8 张表已创建（`001_initial_schema.sql`）
- RLS 已启用

## 认证
- Email Magic Link ✅ (配置完成)
- GitHub OAuth ⬜ (未启用)
- 中间件: 保护 `/dashboard`，根路径/login 已登录跳转

## 待开发
- Dashboard 核心功能（Agent 状态、延迟、告警）
- SDK 包 (`packages/mcp-beacon-sdk/`)
- 计费系统

## 最近提交
- `ba13b19` fix: handle Supabase PKCE hash tokens on root page
- `673ece6` fix: redirect logged-in users from root to dashboard
- `b677487` chore: remove internal docs from public repo
- `2d3ace4` fix: add callback route, try-catch on signInWithOtp
