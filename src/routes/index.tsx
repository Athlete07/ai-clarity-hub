import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-nav";
import { FaqItem } from "@/components/faq-item";
import { StatusIndicator, StatusBadge } from "@/components/status";
import { useProgress } from "@/lib/storage";
import { concepts } from "@/lib/concepts";
import { Highlighter, ListChecks, BarChart3, Bookmark } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FactorBeam — Learn AI concepts without the jargon" },
      {
        name: "description",
        content:
          "A guided playbook for founders, operators and curious minds who want to understand AI — not just use it. Highlight anything confusing and get an instant explanation.",
      },
      { property: "og:title", content: "FactorBeam — Learn AI concepts without the jargon" },
      {
        property: "og:description",
        content:
          "A guided playbook for founders, operators and curious minds who want to understand AI — not just use it.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { progress } = useProgress();
  const doneCount = concepts.filter((c) => progress[c.slug] === "done").length;
  const activeSlug = concepts.find((c) => progress[c.slug] === "in-progress")?.slug;
  const pct = Math.round((doneCount / concepts.length) * 100);

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[680px] px-6 pt-[72px] text-center">
          <span className="inline-block rounded-full bg-purple-light px-3 py-1 text-[12px] font-medium text-purple-dark">
            Practical AI for real people
          </span>
          <h1 className="mt-5 text-[38px] font-medium leading-[1.25] tracking-tight">
            Learn AI concepts
            <br />
            <span className="text-purple">without the jargon</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground">
            A guided playbook for founders, operators and curious minds who want to
            understand AI — not just use it. Highlight anything confusing and get an
            instant explanation.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/playbook"
              className="rounded-md bg-purple px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-purple-dark"
            >
              Start the playbook →
            </Link>
            <Link
              to="/playbook"
              className="hairline rounded-md px-4 py-2.5 text-[13px] text-foreground transition-colors hover:bg-muted"
            >
              See what's inside
            </Link>
          </div>

          {/* Progress preview card */}
          <div className="hairline mx-auto mt-10 rounded-xl bg-card p-5 text-left">
            <div className="flex items-center justify-between text-[12px] text-muted-foreground">
              <span>{doneCount} of {concepts.length} concepts done</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-purple transition-all"
                style={{ width: `${Math.max(pct, doneCount === 0 ? 42 : pct)}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {concepts.map((c) => {
                const state = progress[c.slug];
                const isActive = !state && c.slug === activeSlug;
                const cls =
                  state === "done"
                    ? "bg-success-bg text-success"
                    : state === "in-progress" || isActive
                      ? "bg-purple text-white"
                      : "hairline text-muted-foreground";
                return (
                  <span
                    key={c.slug}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${cls}`}
                  >
                    {c.shortTitle}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto mt-28 max-w-[800px] px-6">
          <div className="text-center">
            <p className="section-label">Why this playbook</p>
            <h2 className="mt-2 text-[24px] font-medium">Four small things that change everything</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={<Highlighter size={18} />}
              tone="purple"
              title="Highlight to understand"
              body="Select any confusing sentence and get a plain-English explanation instantly."
            />
            <FeatureCard
              icon={<ListChecks size={18} />}
              tone="teal"
              title="5 examples per concept"
              body="Every concept comes with real-world examples before you hit a single quiz question."
            />
            <FeatureCard
              icon={<BarChart3 size={18} />}
              tone="amber"
              title="Quiz after every chapter"
              body="Short quizzes that test recall, not trick you. Retry instantly if you get it wrong."
            />
            <FeatureCard
              icon={<Bookmark size={18} />}
              tone="blue"
              title="Progress saved always"
              body="Close the tab, come back later. Resume exactly where you stopped."
            />
          </div>
        </section>

        {/* Playbook preview */}
        <section className="mx-auto mt-28 max-w-[720px] px-6">
          <div className="text-center">
            <p className="section-label">Inside the playbook</p>
            <h2 className="mt-2 text-[24px] font-medium">Seven concepts, in order</h2>
          </div>
          <div className="hairline mt-8 overflow-hidden rounded-xl bg-card">
            {concepts.map((c, i) => {
              const status =
                progress[c.slug] === "done"
                  ? "done"
                  : progress[c.slug] === "in-progress"
                    ? "active"
                    : "todo";
              return (
                <Link
                  to="/playbook/$slug"
                  params={{ slug: c.slug }}
                  key={c.slug}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40 ${i > 0 ? "hairline-t" : ""}`}
                >
                  <StatusIndicator status={status} number={c.number} />
                  <span className="flex-1 text-[14px] font-medium text-foreground">
                    {c.shortTitle}
                  </span>
                  <StatusBadge status={status} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-28 max-w-[680px] px-6">
          <div className="text-center">
            <p className="section-label">Common questions</p>
            <h2 className="mt-2 text-[24px] font-medium">Frequently asked</h2>
          </div>
          <div className="hairline-t mt-8">
            <FaqItem
              q="Do I need a technical background?"
              a="None at all. Written for operators, founders, and curious people — not engineers."
            />
            <FaqItem
              q="How long does each concept take?"
              a="Most concepts take 20–35 minutes including reading, examples, and the quiz. No timer."
            />
            <FaqItem
              q="What if the highlight explanation doesn't help?"
              a="You can flag it and ask a follow-up question directly. The goal is zero confusion before you move on."
            />
            <FaqItem
              q="Will this stay updated as AI evolves?"
              a="Yes. Every concept shows a last-updated date and you'll be notified if a completed concept changes significantly."
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const toneMap = {
  purple: { bg: "bg-purple-light", fg: "text-purple-dark" },
  teal: { bg: "bg-teal-bg", fg: "text-teal" },
  amber: { bg: "bg-amber-bg", fg: "text-amber" },
  blue: { bg: "bg-blue-bg", fg: "text-blue" },
} as const;

function FeatureCard({
  icon,
  tone,
  title,
  body,
}: {
  icon: React.ReactNode;
  tone: keyof typeof toneMap;
  title: string;
  body: string;
}) {
  const t = toneMap[tone];
  return (
    <div className="hairline rounded-xl bg-card p-5">
      <div
        className={`mb-3 inline-flex items-center justify-center rounded-md ${t.bg} ${t.fg}`}
        style={{ width: 36, height: 36 }}
      >
        {icon}
      </div>
      <h3 className="text-[14px] font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
