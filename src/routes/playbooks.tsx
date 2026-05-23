import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav, Footer } from "@/components/site-nav";
import { concepts } from "@/lib/concepts";
import { useProgress } from "@/lib/storage";
import {
  Briefcase,
  Rocket,
  Megaphone,
  Telescope,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Route = createFileRoute("/playbooks")({
  head: () => ({
    meta: [
      { title: "AI concepts, sequenced for your role — FactorBeam" },
      {
        name: "description",
        content:
          "Same AI concepts, sequenced for how you actually work. Pick your role and read in the order that makes the most sense for you.",
      },
      { property: "og:title", content: "AI concepts, sequenced for your role — FactorBeam" },
      {
        property: "og:description",
        content: "Role-based sequences through the FactorBeam AI playbook.",
      },
    ],
    links: [{ rel: "canonical", href: "/playbooks" }],
  }),
  component: PlaybooksPage,
});

type RoleId = "pm" | "founder" | "marketer" | "curious";

type Role = {
  id: RoleId;
  title: string;
  description: string;
  icon: typeof Briefcase;
  iconBg: string;
  iconColor: string;
  popular?: boolean;
};

const ROLES: Role[] = [
  {
    id: "pm",
    title: "Product Manager",
    description:
      "Understand AI well enough to write better specs, challenge your engineering team, and spot BS in vendor pitches.",
    icon: Briefcase,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    popular: true,
  },
  {
    id: "founder",
    title: "Founder",
    description:
      "Learn what's actually possible with AI today so you can make faster product decisions and evaluate technical co-founders.",
    icon: Rocket,
    iconBg: "#FAEEDA",
    iconColor: "#B5761A",
  },
  {
    id: "marketer",
    title: "Marketer",
    description:
      "Cut through the AI hype and understand what the tools you're already using are actually doing under the hood.",
    icon: Megaphone,
    iconBg: "#E1F5EE",
    iconColor: "#1F8A6B",
  },
  {
    id: "curious",
    title: "Curious Mind",
    description:
      "No agenda, no job title. Just want to genuinely understand what AI is and how it works before everyone assumes you already do.",
    icon: Telescope,
    iconBg: "#E6F1FB",
    iconColor: "#2E6FB5",
  },
];

type Seq = { slug: string; note: string };

const SEQUENCES: Record<RoleId, Seq[]> = {
  pm: [
    {
      slug: "what-is-ai",
      note: "The foundation every PM needs before their next roadmap conversation.",
    },
    {
      slug: "machine-learning",
      note: "This is what your data team means when they say 'the model'.",
    },
    {
      slug: "large-language-models",
      note: "Know exactly what you're building on before you write the spec.",
    },
    {
      slug: "prompting",
      note: "The skill that immediately makes you more effective in every AI tool you use.",
    },
    {
      slug: "transformers",
      note: "Go deeper on the architecture so you can have real technical conversations.",
    },
    { slug: "neural-networks", note: "Context for understanding why AI behaves the way it does." },
    { slug: "ai-agents", note: "Where the product opportunities are in the next 2 years." },
  ],
  founder: [
    {
      slug: "what-is-ai",
      note: "Start with a definition that cuts through the hype you're hearing from investors.",
    },
    {
      slug: "large-language-models",
      note: "This is what most AI startups are building on top of right now.",
    },
    {
      slug: "ai-agents",
      note: "The architecture behind most AI products being funded in 2025 and 2026.",
    },
    {
      slug: "prompting",
      note: "Your fastest path to building and testing without an engineering team.",
    },
    {
      slug: "transformers",
      note: "Understand the foundation so you can evaluate technical decisions.",
    },
    { slug: "machine-learning", note: "The broader context behind every AI product claim." },
    {
      slug: "neural-networks",
      note: "Go deep if you want to talk credibly with technical co-founders.",
    },
  ],
  marketer: [
    { slug: "what-is-ai", note: "Separate what AI actually is from what vendors claim it is." },
    {
      slug: "prompting",
      note: "The most immediately useful concept for your day-to-day work right now.",
    },
    {
      slug: "large-language-models",
      note: "Understand what's powering every AI writing and content tool you use.",
    },
    {
      slug: "machine-learning",
      note: "Why personalisation and recommendation engines behave the way they do.",
    },
    { slug: "ai-agents", note: "Where AI marketing automation is heading in the next 18 months." },
    {
      slug: "transformers",
      note: "The architecture behind the tools — useful for technical content writing.",
    },
    {
      slug: "neural-networks",
      note: "Optional deep dive if you want to go beyond surface-level understanding.",
    },
  ],
  curious: [
    { slug: "what-is-ai", note: "The honest, no-jargon starting point." },
    { slug: "machine-learning", note: "The concept that unlocks everything else." },
    { slug: "neural-networks", note: "How the brain metaphor became actual technology." },
    { slug: "transformers", note: "The single most important architecture in modern AI." },
    { slug: "large-language-models", note: "What ChatGPT, Claude and Gemini actually are." },
    { slug: "prompting", note: "How to talk to these systems effectively." },
    { slug: "ai-agents", note: "Where all of this is heading next." },
  ],
};

const THEMES = {
  pm: {
    border: "border-purple",
    glow: "from-purple-light/20",
    badge: "bg-purple-light text-purple-dark border border-purple/10",
    progress: "bg-purple",
    textHover: "group-hover/card:text-purple",
  },
  founder: {
    border: "border-amber",
    glow: "from-amber-bg/25",
    badge: "bg-amber-bg text-amber border border-amber/10",
    progress: "bg-amber",
    textHover: "group-hover/card:text-amber",
  },
  marketer: {
    border: "border-teal",
    glow: "from-teal-bg/25",
    badge: "bg-teal-bg text-teal border border-teal/10",
    progress: "bg-teal",
    textHover: "group-hover/card:text-teal",
  },
  curious: {
    border: "border-blue",
    glow: "from-blue-bg/25",
    badge: "bg-blue-bg text-blue border border-blue/10",
    progress: "bg-blue",
    textHover: "group-hover/card:text-blue",
  },
} as const;

const PM_FOUNDATIONS_SEQUENCE = [
  {
    slug: "what-is-ai",
    note: "Learn the core definitions (AI vs ML vs DL) and probability-based thinking.",
  },
  {
    slug: "machine-learning",
    note: "Understand how models learn from data & labels and how they are evaluated.",
  },
  {
    slug: "neural-networks",
    note: "Demystify neural network layers and training (weights adjusting) vs inference.",
  },
  {
    slug: "large-language-models",
    note: "Learn how next-word prediction leads to hallucination and bias.",
  },
];

type Playbook = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readingMinutes: number;
  topics: string[];
  sequence: { slug: string; note: string }[];
};

const PLAYBOOKS_BY_ROLE: Record<RoleId, Playbook[]> = {
  pm: [
    {
      id: "pm-complete",
      title: "Complete AI Syllabus",
      subtitle: "The full foundational sequence tailored for Product Managers.",
      description:
        "A comprehensive journey through all core AI concepts. Best for PMs looking to gain a complete end-to-end understanding of modern AI systems.",
      difficulty: "Beginner",
      readingMinutes: 37,
      topics: [
        "What is AI?",
        "Machine Learning",
        "LLMs Under the Hood",
        "Prompting Mechanics",
        "Attention & Transformers",
        "Neural Networks",
        "AI Agents",
      ],
      sequence: SEQUENCES.pm,
    },
    {
      id: "pm-foundations",
      title: "AI Foundations for PMs",
      subtitle: "A technical fast-track focusing on models and evaluation.",
      description:
        "A specialized sequence focusing on the technical mechanics of AI, model training vs inference, validation metrics, and handling bias/hallucination.",
      difficulty: "Intermediate",
      readingMinutes: 20,
      topics: [
        "AI vs ML vs DL",
        "How models learn",
        "Training vs inference",
        "Data & labels",
        "Probability & confidence",
        "Model evaluation",
        "Bias & hallucination",
      ],
      sequence: PM_FOUNDATIONS_SEQUENCE,
    },
    {
      id: "pm-advanced",
      title: "Product Strategy & Agents",
      subtitle: "Master prompt engineering, transformers, and agentic workflows.",
      description:
        "Learn how to design, budget, and scope autonomous agentic loops and deep learning capabilities for enterprise products.",
      difficulty: "Advanced",
      readingMinutes: 17,
      topics: [
        "Attention Mechanism",
        "System Budgets",
        "Few-shot Examples",
        "Agent Loop Guardrails",
      ],
      sequence: [
        {
          slug: "transformers",
          note: "Deep dive into the architecture that powered the generative AI wave.",
        },
        {
          slug: "prompting",
          note: "Learn systemic prompt design, chains of thought, and few-shot formatting.",
        },
        {
          slug: "ai-agents",
          note: "Understand how to design constraints, tools, and error-recovery loops.",
        },
      ],
    },
  ],
  founder: [
    {
      id: "founder-complete",
      title: "Complete Founder Track",
      subtitle: "Full sequence focused on rapid builder insights.",
      description:
        "Understand the full scope of AI capabilities to make fast product decisions and evaluate technical co-founders.",
      difficulty: "Beginner",
      readingMinutes: 37,
      topics: [
        "Hype vs Reality",
        "Startup Architectures",
        "Fast Prototyping",
        "Founder-Co-founder Dialectics",
      ],
      sequence: SEQUENCES.founder,
    },
    {
      id: "founder-prototyping",
      title: "Prototyping & APIs",
      subtitle: "A builder fast-track to ship products quickly.",
      description: "Focus on API mechanics, prompting hooks, and rapid development loops.",
      difficulty: "Intermediate",
      readingMinutes: 16,
      topics: ["LLM API Selection", "Rapid Prototyping", "Attention Constraints"],
      sequence: [
        { slug: "large-language-models", note: "The central model engine you'll query." },
        { slug: "prompting", note: "Your fastest way to build mock capabilities without code." },
        { slug: "ai-agents", note: "The architecture behind autonomous startup tools." },
      ],
    },
  ],
  marketer: [
    {
      id: "marketer-complete",
      title: "Complete Marketer Track",
      subtitle: "Cut through hype and master AI-powered tools.",
      description:
        "Understand the statistical mechanics behind recommendations, personalization, and generative content models.",
      difficulty: "Beginner",
      readingMinutes: 37,
      topics: ["Content Gen", "Recommendation Systems", "Prompting Loops", "Copilots"],
      sequence: SEQUENCES.marketer,
    },
  ],
  curious: [
    {
      id: "curious-complete",
      title: "General Curiosity Track",
      subtitle: "A non-technical deep dive into how AI works.",
      description:
        "Get a clear, jargon-free understanding of what AI actually is, how models learn, and where the industry is going next.",
      difficulty: "Beginner",
      readingMinutes: 37,
      topics: ["Brain Analogies", "Statistical Learning", "Neural Weights", "General AI"],
      sequence: SEQUENCES.curious,
    },
  ],
};

const ROLE_KEY = "factorbeam_selected_role";

const HOVER_BORDERS: Record<RoleId, string> = {
  pm: "hover:border-purple/50 dark:hover:border-purple-dark/50",
  founder: "hover:border-amber/50 dark:hover:border-amber/50",
  marketer: "hover:border-teal/50 dark:hover:border-teal/50",
  curious: "hover:border-blue/50 dark:hover:border-blue/50",
};

function PlaybooksPage() {
  const [role, setRole] = useState<RoleId | null>(null);
  const { progress } = useProgress();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ROLE_KEY) as RoleId | null;
      if (saved && PLAYBOOKS_BY_ROLE[saved]) {
        setRole(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const selectRole = (id: RoleId) => {
    setRole(id);
    try {
      window.localStorage.setItem(ROLE_KEY, id);
    } catch {
      // ignore
    }
  };

  const playbooks = role ? PLAYBOOKS_BY_ROLE[role] || [] : [];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 pt-16 pb-24">
        {role === null ? (
          /* State A: Unselected */
          <div className="animate-fade-in-up relative">
            {/* Ambient Background Mesh Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-20 w-[280px] h-[280px] rounded-full bg-purple-light/35 blur-[80px] dark:bg-purple-light/5 pointer-events-none mesh-glow-1" />
            <div className="absolute top-1/3 right-1/4 -translate-y-1/2 -z-20 w-[240px] h-[240px] rounded-full bg-blue-bg/40 blur-[80px] dark:bg-blue-bg/5 pointer-events-none mesh-glow-2" />

            {/* Intro */}
            <div className="text-center relative z-10">
              <h1 className="text-[32px] font-medium leading-tight text-foreground">
                AI concepts, sequenced for your role
              </h1>
              <p className="mt-3 text-[16px] text-muted-foreground">
                Same AI concepts, sequenced for how you actually work. Choose your role to begin.
              </p>
            </div>

            {/* Role Selectors Grid */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 relative z-10">
              {ROLES.map((r, index) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => selectRole(r.id)}
                    className={`relative rounded-xl p-4 text-left bg-card hairline transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer animate-fade-in-up duration-300 ${HOVER_BORDERS[r.id]}`}
                    style={{
                      minHeight: 44,
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-lg shrink-0"
                        style={{ width: 32, height: 32, background: r.iconBg, color: r.iconColor }}
                      >
                        <Icon size={16} />
                      </div>
                      <h3 className="text-[14px] font-semibold text-foreground">{r.title}</h3>
                    </div>
                    <p className="mt-2 text-[12px] text-muted-foreground leading-snug">
                      {r.description}
                    </p>
                    {r.popular && (
                      <span className="absolute top-2 right-2 rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-purple text-white">
                        Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* State B: Active Role Selected */
          <div className="animate-fade-in-down">
            {/* Compact Header & Horizontal Selector Pills */}
            <div className="text-center">
              <h1 className="text-[24px] font-medium leading-tight text-foreground">
                AI concepts, sequenced for your role
              </h1>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const active = r.id === role;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => selectRole(r.id)}
                      aria-pressed={active}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        active
                          ? "bg-purple text-white border-purple"
                          : "bg-muted/40 hover:bg-muted text-muted-foreground border-border/40"
                      }`}
                    >
                      <span
                        className="flex items-center justify-center rounded shrink-0"
                        style={{
                          width: 14,
                          height: 14,
                          background: active ? "transparent" : r.iconBg,
                          color: active ? "white" : r.iconColor,
                        }}
                      >
                        <Icon size={10} />
                      </span>
                      {r.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Playbooks Vertical Stack */}
            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center justify-between pl-1">
                <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Available Playbooks
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setRole(null);
                    try {
                      window.localStorage.removeItem(ROLE_KEY);
                    } catch {
                      // ignore
                    }
                  }}
                  className="text-[11px] text-purple hover:underline font-medium cursor-pointer"
                >
                  View all roles
                </button>
              </div>
              {playbooks.map((p, index) => {
                const pDoneCount = p.sequence.filter((s) => progress[s.slug] === "done").length;
                const pPct = Math.round((pDoneCount / p.sequence.length) * 100);
                const theme = THEMES[role];
                const nextIncompleteSlug =
                  p.sequence.find((s) => progress[s.slug] !== "done")?.slug || p.sequence[0]?.slug;

                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border p-4 pr-[150px] sm:p-5 sm:pr-[165px] bg-card relative transition-all duration-300 border-border/60 hover:border-purple/40 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 120}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {/* Glow backplate effect */}
                    <div
                      className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr ${theme.glow} to-transparent blur-xl pointer-events-none opacity-50 dark:opacity-100`}
                    />

                    {/* Absolute CTA button */}
                    <Link
                      to="/playbook/$slug"
                      params={{ slug: nextIncompleteSlug }}
                      className={`absolute top-4 right-4 sm:top-5 sm:right-5 py-1.5 px-3.5 text-[11px] font-semibold rounded-lg text-white transition-all inline-flex items-center gap-1.5 justify-center cursor-pointer ${theme.progress} hover:opacity-90`}
                    >
                      {pPct === 0 ? (
                        <>
                          Start Playbook <ArrowRight size={12} />
                        </>
                      ) : pPct === 100 ? (
                        "Review Playbook"
                      ) : (
                        "Resume Playbook"
                      )}
                    </Link>

                    <div className="flex flex-col gap-3">
                      {/* Top Row: Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${theme.badge}`}
                        >
                          {p.difficulty}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          ~{p.readingMinutes} min read
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {p.sequence.length} Modules
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-[17px] font-bold text-foreground tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      {/* Topics Covered */}
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 mr-1">
                          Topics:
                        </span>
                        {p.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-muted/40 text-muted-foreground border border-border/60"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Slim Progress bar */}
                      {pPct > 0 && (
                        <div className="flex items-center gap-3 w-full sm:max-w-[280px] mt-1">
                          <div className="h-1 w-24 overflow-hidden rounded-full bg-muted shrink-0">
                            <div
                              className={`h-full transition-all duration-500 rounded-full ${theme.progress}`}
                              style={{ width: `${pPct}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-muted-foreground font-medium whitespace-nowrap">
                            {pPct}% complete ({pDoneCount} of {p.sequence.length})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
