# 🚀 MCP Beacon — Vercel 部署指南

## 前置条件

- [ ] Ari 完成 **A2**: Vercel 账号创建
- [ ] Ari 完成 **A5**: GitHub 仓库创建

---

## 一、Vercel 项目配置（Ari 操作）

### 1.1 导入 GitHub 仓库

1. 登录 [vercel.com](https://vercel.com)
2. 点击 **Add New → Project**
3. 选择 GitHub 仓库 `mcp-beacon`
4. Vercel 自动检测 Next.js 框架，无需手动配置

### 1.2 环境变量（后续需要配置）

| Key | 描述 | 值来源 |
|-----|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名 Key | Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务端 Key | Supabase Dashboard |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | DeepSeek Platform |

> 注：环境变量可在 Vercel Dashboard → Settings → Environment Variables 中配置。支持按 Preview/Production 不同值。

### 1.3 域名绑定（可选）

1. Vercel Dashboard → Settings → Domains
2. 添加自定义域名（如 `mcpbeacon.dev`）
3. 按指引完成 DNS 配置

---

## 二、自动部署流程

### 2.1 Preview 部署（自动）

```
git push origin <branch>  →  Vercel 自动创建 Preview 部署
```

- 每次 Push 到非 `main` 分支，Vercel 自动生成预览 URL
- URL 格式：`<project-name>-<unique-hash>-<scope>.vercel.app`
- 预览 URL 自动评论到 GitHub PR

### 2.2 Production 部署（自动）

```
git push origin main  →  Vercel 自动发布到 Production
```

- Push 到 `main` 分支即触发 Production 部署
- Production 域名：`<project-name>.vercel.app`（或自定义域名）

### 2.3 部署状态检查

- Vercel Dashboard 实时显示部署状态
- GitHub 仓库 Settings → Deployments 查看历史
- Vercel 部署失败时自动邮件通知

---

## 三、项目结构

```
mcp-beacon/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # Landing Page (首页)
│   └── globals.css        # 全局样式
├── public/                # 静态资源
│   ├── favicon.svg
│   └── apple-touch-icon.svg
├── vercel.json            # Vercel 配置
├── package.json           # 依赖声明
├── tsconfig.json          # TypeScript 配置
└── next.config.js         # Next.js 配置
```

---

## 四、CI/CD 配置说明（vercel.json）

### 框架检测
- `framework: "nextjs"` — 自动使用 Next.js 优化构建

### 部署区域
- `regions: ["hkg1", "sin1", "icn1"]` — 亚太区域部署（低延迟）

### 安全 Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- 静态资源 1 年缓存

### GitHub 集成
- `autoJobCancelation: true` — 新 Push 时自动取消旧构建

---

## 五、首次部署检查清单

- [ ] GitHub 仓库已创建
- [ ] Vercel 已连接 GitHub
- [ ] 项目已导入 Vercel
- [ ] `vercel.json` 配置无误
- [ ] 首次 `git push origin main` 完成
- [ ] Vercel Production 部署成功
- [ ] 访问生产域名，Landing Page 正常显示
