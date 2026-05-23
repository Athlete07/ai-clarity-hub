import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-nav";
import { useGlossary } from "@/lib/storage";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Personal glossary — FactorBeam" },
      {
        name: "description",
        content: "Every phrase you highlighted while reading, with its plain-English explanation.",
      },
      { property: "og:title", content: "Personal glossary — FactorBeam" },
      { property: "og:url", content: "/glossary" },
    ],
    links: [{ rel: "canonical", href: "/glossary" }],
  }),
  component: Glossary,
});

function Glossary() {
  const { entries, remove } = useGlossary();
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[820px] px-6 pt-12 pb-24">
        <h1 className="text-[26px] font-medium">Your glossary</h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Every phrase you highlighted while reading. Saved automatically.
        </p>

        {entries.length === 0 ? (
          <div className="hairline mt-10 rounded-xl bg-card px-6 py-12 text-center text-[14px] text-muted-foreground">
            Nothing here yet. Highlight a sentence in any concept to add it.
          </div>
        ) : (
          <div className="hairline mt-8 overflow-hidden rounded-xl bg-card">
            {entries.map((e, i) => (
              <div
                key={e.id}
                className={`grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-[1fr_2fr_auto] sm:items-start ${
                  i > 0 ? "hairline-t" : ""
                }`}
              >
                <p className="text-[14px] font-medium text-foreground">{e.term}</p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{e.explanation}</p>
                <button
                  onClick={() => remove(e.id)}
                  className="justify-self-end rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-error"
                  aria-label={`Delete ${e.term}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
