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
      "We help investors make confident decisions before deploying capital into blockchain projects.",
      "Our evaluation covers three pillars:",
      "Technical Due Diligence: Deep analysis of protocol architecture, scalability, and code maturity.",
      "Tokenomics: Scenario modeling for incentives, dilution, and long-term sustainability.",
      "Ecosystem Fit: Assessment of adoption potential, network effects, and competitive positioning.",
      "The result: a clear investment memo with a Go, Revise, or Pass recommendation built for decision-makers."
    ],
  },
  {
    id: "02",
    title: "Portfolio Support & Advisory",
    image: "/services/service-advisory.jpg",
    alt: "Portfolio dashboards and performance analytics",
    copy: [
      "We partner with founders post-investment to protect and grow investor capital through hands-on, high-leverage support.",
      "This includes:",
      "Cadence Reviews & KPI Tracking: Ensuring progress is measurable and momentum is real.",
      "Hiring & Governance Support: Filling key gaps and aligning teams around outcomes.",
      "Turnaround Plans: When things stall, we diagnose issues across product, infra, or token design and deliver clear roadmaps to get back on track.",
      "Our systematic approach uncovers friction early, accelerates execution, and helps restore both growth and investor confidence."
    ],
  },
  {
    id: "03",
    title: "Custom Blockchain & AI Development",
    image: "/services/service-development.jpg",
    alt: "Developer working on smart contracts and AI models",
    copy: [
      "We design and build real-world applications at the intersection of blockchain and AI from concept to production.",
      "Whether it's a decentralized protocol, validator infrastructure, AI-powered smart contract logic, or full-stack dApps, our in-house and partner teams deliver:",
      "Blockchain Architecture & Protocol Design",
      "Smart Contracts & Token Infrastructure",
      "AI Integration & On-Chain Analytics",
      "Validator & Staking Systems",
      "We turn ideas into audited, deployable systems that are fast, secure, and built for scale."
    ],
  },
  {
    id: "04",
    title: "Strategic Advisory on Emerging Trends",
    image: "/services/service-strategy.jpg",
    alt: "Futuristic network visual with trend vectors",
    copy: [
      "We help investors and founders stay ahead of the curve by identifying and executing on what's next in Web3 and AI.",
      "Our focus areas include:",
      "AI x Blockchain: Intelligent agents, on-chain inference, and trustless data pipelines.",
      "DePIN: Decentralized physical infrastructure networks and tokenized coordination.",
      "Restaking & Modular Chains: Capital-efficient security and scalable protocol design.",
      "ZK Proofs: Privacy, scalability, and composability through zero-knowledge systems.",
      "We translate complex trends into actionable strategies before they become mainstream."
    ],
  },
];