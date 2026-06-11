"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactModal } from "./contact-modal";

const tiers = [
  {
    name: "Free",
    plan: "free",
    price: 0,
    features: [
      "10,000 requests/month",
      "1 project",
      "Basic cost analytics",
      "Email alerts",
      "7-day data retention",
      "Community support",
    ],
    cta: "Get Started",
    priceId: "",
  },
  {
    name: "Pro",
    plan: "pro",
    price: 29,
    features: [
      "100,000 requests/month",
      "10 projects",
      "Advanced cost analytics",
      "Loop detection",
      "Webhook alerts",
      "30-day data retention",
      "Priority support",
      "Budget controls",
    ],
    highlighted: true,
    cta: "Start Free Trial",
    priceId: "price_pro_monthly",
  },
  {
    name: "Enterprise",
    plan: "enterprise",
    price: 199,
    features: [
      "Unlimited requests",
      "Unlimited projects",
      "Custom analytics dashboard",
      "Advanced loop detection",
      "SSO / SAML",
      "Custom data retention",
      "Dedicated support",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    priceId: "price_enterprise_monthly",
  },
];

export function Pricing() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Start free, scale as you grow. No hidden fees, no surprise bills.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative p-8 rounded-2xl border",
              tier.highlighted
                ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-xl shadow-blue-600/10"
                : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
            )}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">${tier.price}</span>
              {tier.price > 0 && <span className="text-gray-500 dark:text-gray-400">/month</span>}
            </div>
            <ul className="mt-8 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            {tier.name === "Enterprise" ? (
              <button
                onClick={() => setContactOpen(true)}
                className={cn(
                  "mt-8 block w-full text-center py-3 rounded-xl font-semibold transition-colors",
                  "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                )}
              >
                {tier.cta}
              </button>
            ) : (
              <Link
                href="/auth/login"
                className={cn(
                  "mt-8 block w-full text-center py-3 rounded-xl font-semibold transition-colors",
                  tier.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                )}
              >
                {tier.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
