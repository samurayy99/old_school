// lib/services.ts
export interface Service {
  id: string;
  title: string;
  image: string;   // Pfad zu deinem Bild (Next/Image, public/-Pfad)
  alt: string;
  copy: string[];  // Absätze für die Rückseite
  cta?: { label: string; href: string };
}

export const services: Service[] = [
  {
    id: "01",
    title: "Blockchain Investment Evaluation",
    image: "/services/service-evaluation.jpg",
    alt: "Abstract blockchain nodes and connections",
    copy: [
      "We stress test architectures, consensus assumptions, and security posture. Our reviews surface edge case risks before capital is deployed.",
      "Token design is validated with scenario analysis and incentive modeling. We quantify dilution, runway, and sustainability under market stress.",
      "Output: a crisp risk memo with clear go, fix, or no go recommendations built for decision makers.",
    ],
  },
  {
    id: "02",
    title: "Portfolio Support & Advisory",
    image: "/services/service-advisory.jpg",
    alt: "Portfolio dashboards and performance analytics",
    copy: [
      "We partner with founders post investment: cadence reviews, KPI tracking, hiring support and hands on unblockers.",
      "When progress stalls, we diagnose gaps across product, infra and governance, then design a tight turnaround plan.",
      "Our systematic approach identifies bottlenecks early and provides actionable roadmaps to restore growth momentum and investor confidence.",
    ],
  },
  {
    id: "03",
    title: "Custom Blockchain & AI Development",
    image: "/services/service-development.jpg",
    alt: "Developer working on smart contracts and AI models",
    copy: [
      "From battle tested smart contracts to AI infused dApps we ship. Secure by design, audited, observable.",
      "We stand up validator and node infra, CI/CD pipelines, telemetry and incident response that scales with usage.",
      "Every deployment includes comprehensive testing, monitoring dashboards, and emergency protocols to ensure bulletproof production operations.",
    ],
  },
  {
    id: "04",
    title: "Strategic Advisory on Emerging Trends",
    image: "/services/service-strategy.jpg",
    alt: "Futuristic network visual with trend vectors",
    copy: [
      "We translate hype into strategy: AI and Blockchain, DePIN, restaking, modular security, ZK. What's real, where to play, how to win.",
      "Clear theses, market maps and partner shortlists updated with signal from Crypto Valley and beyond.",
      "Our advisory combines deep technical knowledge with market intelligence to position your project ahead of emerging trends and competitive threats.",
    ],
  },
];