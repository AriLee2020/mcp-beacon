export type Plan = "free" | "pro" | "enterprise";

export interface PricingTier {
  name: string;
  plan: Plan;
  price: number;
  interval: "monthly" | "yearly";
  priceId: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
