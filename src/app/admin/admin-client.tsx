"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  usersToday: number;
  totalProjects: number;
  totalAgents: number;
  totalSessions: number;
  totalTraces: number;
  recentUsers: Array<{ email: string; created_at: string }>;
  recentAgents: Array<{ name: string; project_id: string; created_at: string }>;
  error?: string;
}

export function AdminClient() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/admin/api/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <div style={{ padding: 40, color: "#888" }}>Loading...</div>;
  if (stats.error) return <div style={{ padding: 40, color: "red" }}>Error: {stats.error}</div>;

  return (
    <div style={S.container}>
      <h1 style={S.title}>MCP Beacon Admin</h1>

      <div style={S.grid}>
        <Card label="总用户" value={stats.totalUsers} color="#6366f1" />
        <Card label="今日新增" value={stats.usersToday} color="#10b981" />
        <Card label="总项目" value={stats.totalProjects} color="#f59e0b" />
        <Card label="Agent" value={stats.totalAgents} color="#8b5cf6" />
        <Card label="Sessions" value={stats.totalSessions} color="#06b6d4" />
        <Card label="API 调用" value={stats.totalTraces} color="#ef4444" />
      </div>

      <div style={S.row}>
        <div style={S.section}>
          <h2 style={S.subtitle}>最近注册</h2>
          <table style={S.table}>
            <thead><tr><th style={S.th}>邮箱</th><th style={S.th}>时间</th></tr></thead>
            <tbody>
              {stats.recentUsers.map((u, i) => (
                <tr key={i}><td style={S.td}>{u.email}</td><td style={S.td}>{fmt(u.created_at)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={S.section}>
          <h2 style={S.subtitle}>活跃 Agent</h2>
          <table style={S.table}>
            <thead><tr><th style={S.th}>名称</th><th style={S.th}>时间</th></tr></thead>
            <tbody>
              {stats.recentAgents.map((a, i) => (
                <tr key={i}><td style={S.td}>{a.name}</td><td style={S.td}>{fmt(a.created_at)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ ...S.card, borderColor: color }}>
      <div style={{ ...S.cardValue, color }}>{value.toLocaleString()}</div>
      <div style={S.cardLabel}>{label}</div>
    </div>
  );
}

function fmt(d: string) { return new Date(d).toLocaleString("zh-CN"); }

const S: Record<string, React.CSSProperties> = {
  container: { maxWidth: 960, margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#e5e7eb", background: "#0f172a", minHeight: "100vh" },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 32, color: "#f8fafc" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 32 },
  card: { background: "#1e293b", borderRadius: 12, padding: "20px 16px", borderLeft: "4px solid", textAlign: "center" as const },
  cardValue: { fontSize: 32, fontWeight: 800 },
  cardLabel: { fontSize: 12, color: "#94a3b8", marginTop: 4 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  section: { flex: 1 },
  subtitle: { fontSize: 18, fontWeight: 600, marginBottom: 12, color: "#cbd5e1" },
  table: { width: "100%", borderCollapse: "collapse" as const },
  th: { textAlign: "left" as const, padding: "8px 10px", borderBottom: "1px solid #334155", color: "#94a3b8", fontSize: 12 },
  td: { padding: "8px 10px", borderBottom: "1px solid #1e293b", fontSize: 13 },
};
