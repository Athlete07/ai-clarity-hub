import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FactorBeam" },
      {
        name: "description",
        content:
          "FactorBeam is a personal AI playbook made public — written for people who think in products, not models.",
      },
      { property: "og:title", content: "About — FactorBeam" },
      {
        property: "og:description",
        content: "Why FactorBeam exists, and who it's for.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[600px] px-6 pt-[72px] pb-20">
        <h1 className="text-[28px] font-medium">Why I built this</h1>
        <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-foreground">
          <p>
            I'm a product manager trying to genuinely understand AI — not just the
            surface layer. Every resource I found was either too technical or too
            vague. So I built the thing I wished existed.
          </p>
          <p>
            FactorBeam is a personal playbook made public. Every concept is written
            for people who think in products, not models. The highlight-to-explain
            feature exists because I kept getting stuck on single sentences.
          </p>
          <p>
            This is free, always. I'm learning in public. If it helps you too,
            that's the whole point.
          </p>
        </div>

        <div className="hairline mt-10 rounded-xl bg-card px-5 py-4 text-[13px] text-muted-foreground">
          Currently building · Module 1: AI Foundations · 7 concepts · Updated May 2026
        </div>
      </main>
      <Footer />
    </>
  );
}
