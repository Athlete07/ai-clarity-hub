import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav, Footer } from "@/components/site-nav";
import { concepts } from "@/lib/concepts";
import { useProgress } from "@/lib/storage";
import { Briefcase, Rocket, Megaphone, Telescope, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/playbooks")({
  head: () => ({
    meta: [
      { title: "Playbooks for every role — FactorBeam" },
      {
        name: "description",
        content:
          "Same AI concepts, sequenced for how you actually work. Pick your role and read in the order that makes the most sense for you.",
      },
      { property: "og:title", content: "Playbooks for every role — FactorBeam" },
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
    { slug: "what-is-ai", note: "The foundation every PM needs before their next roadmap conversation." },
    { slug: "machine-learning", note: "This is what your data team means when they say 'the model'." },
    { slug: "large-language-models", note: "Know exactly what you're building on before you write the spec." },
    { slug: "prompting", note: "The skill that immediately makes you more effective in every AI tool you use." },
    { slug: "transformers", note: "Go deeper on the architecture so you can have real technical conversations." },
    { slug: "neural-networks", note: "Context for understanding why AI behaves the way it does." },
    { slug: "ai-agents", note: "Where the product opportunities are in the next 2 years." },
  ],
  founder: [
    { slug: "what-is-ai", note: "Start with a definition that cuts through the hype you're hearing from investors." },
    { slug: "large-language-models", note: "This is what most AI startups are building on top of right now." },
    { slug: "ai-agents", note: "The architecture behind most AI products being funded in 2025 and 2026." },
    { slug: "prompting", note: "Your fastest path to building and testing without an engineering team." },
    { slug: "transformers", note: "Understand the foundation so you can evaluate technical decisions." },
    { slug: "machine-learning", note: "The broader context behind every AI product claim." },
    { slug: "neural-networks", note: "Go deep if you want to talk credibly with technical co-founders." },
  ],
  marketer: [
    { slug: "what-is-ai", note: "Separate what AI actually is from what vendors claim it is." },
    { slug: "prompting", note: "The most immediately useful concept for your day-to-day work right now." },
    { slug: "large-language-models", note: "Understand what's powering every AI writing and content tool you use." },
    { slug: "machine-learning", note: "Why personalisation and recommendation engines behave the way they do." },
    { slug: "ai-agents", note: "Where AI marketing automation is heading in the next 18 months." },
    { slug: "transformers", note: "The architecture behind the tools — useful for technical content writing." },
    { slug: "neural-networks", note: "Optional deep dive if you want to go beyond surface-level understanding." },
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

const ROLE_KEY = "factorbeam_selected_role";

function PlaybooksPage() {
  const [role, setRole] = useState<RoleId>("pm");
  const { progress } = useProgress();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ROLE_KEY) as RoleId | null;
      if (saved && SEQUENCES[saved]) setRole(saved);
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

  const sequence = SEQUENCES[role];
  const activeRole = ROLES.find((r) => r.id === role)!;
  const doneCount = sequence.filter((s) => progress[s.slug] === "done").length;
  const pct = Math.round((doneCount / sequence.length) * 100);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 pt-16 pb-10">
        <h1 className="text-center text-[32px] font-medium leading-tight">
          Playbooks for every role
        </h1>
        <p className="mx-auto mt-3 max-w-[600px] text-center text-[16px] text-muted-foreground">
          Same AI concepts, sequenced for how you actually work. Pick your role and
          read in the order that makes the most sense for you.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const active = r.id === role;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => selectRole(r.id)}
                aria-pressed={active}
                className="relative rounded-xl bg-card p-6 text-left transition-colors hover:bg-muted/30"
                style={{
                  border: active ? "2px solid #534AB7" : "0.5px solid hsl(var(--border))",
                  backgroundColor: active ? "#EEEDFE" : undefined,
                  minHeight: 44,
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{ width: 36, height: 36, background: r.iconBg, color: r.iconColor }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium text-foreground">{r.title}</h3>
                <p className="mt-1 hidden text-[13px] text-muted-foreground sm:block">
                  {r.description}
                </p>
                {r.popular && (
                  <span
                    className="absolute bottom-3 right-3 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ background: "#EEEDFE", color: "#534AB7" }}
                  >
                    Most popular
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-center text-[13px] text-muted-foreground">
          You can switch roles at any time — your progress carries over.
        </p>
      </main>

      <section className="mx-auto max-w-[720px] px-6 pb-24">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Your sequence · {activeRole.title}
        </p>

        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-purple transition-all"
            style={{ width: `${pct}%`, background: "#534AB7" }}
          />
        </div>
        <p className="mt-1.5 text-[12px] text-muted-foreground">
          {doneCount} of {sequence.length} concepts complete
        </p>

        <div className="mt-6 space-y-2.5">
          {sequence.map((item, idx) => {
            const concept = concepts.find((c) => c.slug === item.slug);
            if (!concept) return null;
            const state = progress[item.slug];
            const done = state === "done";
            const inProgress = state === "in-progress";
            const position = idx + 1;
            return (
              <Link
                key={item.slug}
                to="/playbook/$slug"
                params={{ slug: item.slug }}
                className="group flex items-start gap-4 rounded-xl bg-card px-6 py-5 transition-colors hover:bg-muted/30"
                style={{ border: "0.5px solid hsl(var(--border))", minHeight: 44 }}
              >
                <span
                  className="mt-0.5 flex shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-white"
                  style={{
                    width: 24,
                    height: 24,
                    background: done ? "hsl(var(--success))" : "#534AB7",
                  }}
                >
                  {done ? <Check size={13} /> : position}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-muted-foreground">
                    Concept {concept.number} of 7
                  </p>
                  <h3 className="mt-0.5 text-[15px] font-medium text-foreground">
                    {concept.shortTitle}
                  </h3>
                  <p className="mt-1 text-[13px] italic text-muted-foreground">
                    {item.note}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      ~{concept.readingMinutes * 5} min
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {concept.examples.length} examples
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {concept.quiz.length} questions
                    </span>
                  </div>
                </div>

                <div className="shrink-0 self-center">
                  {done ? (
                    <span className="rounded-md bg-success-bg px-2 py-1 text-[11px] font-medium text-success">
                      Done
                    </span>
                  ) : inProgress ? (
                    <span
                      className="rounded-md px-2 py-1 text-[11px] font-medium"
                      style={{ background: "#EEEDFE", color: "#534AB7" }}
                    >
                      In progress
                    </span>
                  ) : (
                    <span className="hairline inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors group-hover:bg-muted">
                      Start <ArrowRight size={11} />
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
