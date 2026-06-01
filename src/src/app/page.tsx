export default function HomePage() {
  return (
    <main className="min-h-screen bg-page-bg flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.svg"
            alt="MCP Beacon"
            className="h-16"
          />
        </div>

        {/* Hero */}
        <h1 className="text-5xl sm:text-7xl font-bold font-outfit tracking-tight text-surface-dark">
          MCP Beacon
        </h1>
        <p className="text-xl text-gray-500 font-inter max-w-lg mx-auto">
          AI Agent Monitoring, Illuminated — Real-time observability,
          cost tracking, and smart alerts.
        </p>

        {/* CTA */}
        <div className="flex gap-4 justify-center">
          <a href="#" className="btn-primary">
            Get Started Free
          </a>
          <a href="#" className="btn-secondary">
            View Demo
          </a>
        </div>

        {/* Tagline */}
        <div className="flex gap-3 justify-center flex-wrap">
          {['Real-time observability', 'Cost tracking', 'Smart alerts'].map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
