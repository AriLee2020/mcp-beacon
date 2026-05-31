"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is MCP Beacon?",
    answer: "MCP Beacon is an observability platform for AI agents. It monitors your OpenAI, Anthropic, and DeepSeek API calls, tracking costs, detecting loops, and alerting you when things go wrong — without slowing down your agents.",
  },
  {
    question: "How does the SDK work?",
    answer: "You wrap your existing LLM client with beacon.wrap(). After that, every API call is automatically logged — prompts, responses, token counts, and costs are sent to the MCP Beacon dashboard in real-time.",
  },
  {
    question: "Does it slow down my API calls?",
    answer: "No. Reporting happens asynchronously in the background. Your API calls complete at the same speed. MCP Beacon uses a non-blocking buffer that batches uploads for minimum overhead.",
  },
  {
    question: "What happens if my internet goes down?",
    answer: "The SDK includes offline caching. All events are buffered to local storage and automatically synced when connectivity is restored. You won't lose any data.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All data is encrypted in transit and at rest. Prompt content is stored only if you opt in. API keys are never sent to our servers. We're SOC 2 compliant (in progress).",
  },
  {
    question: "Can I use it with any LLM provider?",
    answer: "MCP Beacon has first-class support for OpenAI, Anthropic, and DeepSeek. Custom HTTP wrappers also work for any API. We're adding more providers regularly.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about MCP Beacon.
        </p>
      </div>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
