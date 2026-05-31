import { BarChart3, BellRing, Repeat, DollarSign, Code, Activity } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Cost Analytics",
    description: "Track token usage and cost in real-time across all your AI providers. Break down spending by agent, model, and session.",
  },
  {
    icon: <BellRing className="w-6 h-6" />,
    title: "Smart Alerts",
    description: "Get notified about cost spikes, rate limit warnings, and anomalies. Configure thresholds and receive alerts via email or webhook.",
  },
  {
    icon: <Repeat className="w-6 h-6" />,
    title: "Loop Detection",
    description: "Automatically detect when agents get stuck in repetitive loops. Uses text similarity analysis to catch infinite cycles before they waste tokens.",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Budget Controls",
    description: "Set daily spend limits per project. Get early warnings at 50%, 75%, and 90% thresholds. Stop agents before they run up a bill.",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "One-Line Setup",
    description: "Drop beacon.wrap() into your existing code. Works with OpenAI, Anthropic, and DeepSeek SDKs. No proxy, no config file, no vendor lock-in.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Session Replay",
    description: "Review every API call your agents made. Inspect prompts, responses, and timing. Debug failures with full request/response context.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything You Need to Ship Confidently
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          From cost tracking to loop detection — MCP Beacon gives you full visibility into your AI agents without the infrastructure headache.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all"
          >
            <div className="inline-flex p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
