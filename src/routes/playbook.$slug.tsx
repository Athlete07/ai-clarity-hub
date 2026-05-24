import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { Nav, Footer } from "@/components/site-nav";
import { ExampleTabs } from "@/components/example-tabs";
import { HighlightExplainer } from "@/components/highlight-explainer";
import { Quiz } from "@/components/quiz";
import { DiagramBlock } from "@/components/diagrams";
import {
  concepts,
  conceptBySlug,
  nextConcept,
  prevConcept,
  type ConceptBodyBlock,
} from "@/lib/concepts";
import { useProgress } from "@/lib/storage";
import { Clock, Hand, Menu, X, Check } from "lucide-react";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-red-100 p-3 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div>
        <h2 className="text-[16px] font-semibold">Something went wrong</h2>
        <p className="mt-1 text-[14px] text-muted-foreground max-w-[400px]">
          There was an error loading this concept. Please try again.
        </p>
      </div>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-2 rounded-md bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Try again
      </button>
    </div>
  );
}

export const Route = createFileRoute("/playbook/$slug")({
  loader: ({ params }) => {
    const concept = conceptBySlug(params.slug);
    if (!concept) throw notFound();
    return { concept };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.concept;
    if (!c) return { meta: [{ title: "Concept — FactorBeam" }] };
    return {
      meta: [
        { title: `${c.title} — AI Playbook · FactorBeam` },
        { name: "description", content: c.summary },
        { property: "og:title", content: `${c.title} — FactorBeam` },
        { property: "og:description", content: c.summary },
        { property: "og:url", content: `/playbook/${c.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/playbook/${c.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-medium">Concept not found</h1>
        <Link to="/playbook" className="mt-3 inline-block text-purple hover:underline">
          ← Back to playbook
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-xl font-medium">Something went wrong loading this concept.</h1>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-3 rounded-md bg-purple px-4 py-2 text-[13px] text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  },
  component: ConceptPage,
});

function ConceptPage() {
  const { concept } = Route.useLoaderData() as {
    concept: NonNullable<ReturnType<typeof conceptBySlug>>;
  };
  const { progress, markDone, markInProgress } = useProgress();
  const articleRef = useRef<HTMLElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    markInProgress(concept.slug);
  }, [concept.slug, markInProgress]);

  const doneCount = concepts.filter((c) => progress[c.slug] === "done").length;
  const pct = Math.round((doneCount / concepts.length) * 100);
  const next = nextConcept(concept.slug);
  const prev = prevConcept(concept.slug);

  const currentIdx = concepts.findIndex((c) => c.slug === concept.slug);
  const displayNum = currentIdx + 1;

  return (
    <div className="min-h-screen">
      <div
        className="fixed top-0 left-0 h-[2px] bg-purple z-50 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
      {/* Slim top nav with progress */}
      <header
        className="sticky top-0 z-40 hairline-b bg-background/85 backdrop-blur"
        style={{ height: 52 }}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open concept menu"
            >
              <Menu size={18} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span
                className="inline-block rounded-full bg-purple"
                style={{ width: 8, height: 8 }}
              />
              <span className="text-[15px] font-medium">FactorBeam</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <Sidebar
          currentSlug={concept.slug}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main */}
        <main className="min-w-0 flex-1 px-5 py-12 sm:px-10 lg:px-16">
          <article ref={articleRef} className="relative mx-auto max-w-[660px]">
            <HighlightExplainer containerRef={articleRef} />

            <h1
              id="concept"
              className="text-4xl tracking-tight font-semibold leading-tight text-foreground"
            >
              {concept.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
              <Clock size={14} className="opacity-70" />
              <span>{concept.readingMinutes} min read</span>
              <span className="opacity-50">·</span>
              <span>{concept.quiz.length} quiz questions</span>
            </div>

            <p className="hairline-b mt-6 pb-5 text-base leading-relaxed text-muted-foreground">
              {concept.summary}
            </p>

            <div
              className="mt-6 rounded-xl bg-purple-light/70 px-5 py-4 text-[14px] text-purple-dark"
              style={{ borderLeft: "3px solid var(--purple)" }}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-purple">
                Key takeaway
              </p>
              <p className="mt-1 font-medium leading-relaxed">{concept.keyTakeaway}</p>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2 text-[12px] text-muted-foreground">
              <Hand size={13} />
              Select any sentence below to get a plain-English explanation
            </div>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-foreground">
              {concept.body.map((block, i) => (
                <BodyBlock key={i} block={block} />
              ))}
            </div>

            {/* Examples */}
            {concept.examples.length > 0 && (
              <section id="examples" className="mt-14">
                <p className="section-label">Examples</p>

                <div
                  className="mt-3 rounded-xl bg-amber-bg/70 px-5 py-4 text-[14px] italic text-foreground"
                  style={{ borderLeft: "3px solid var(--amber)" }}
                >
                  {concept.pmCallout}
                </div>

                <div className="mt-5">
                  <ExampleTabs examples={concept.examples} />
                </div>
              </section>
            )}

            {/* Quiz */}
            <section id="quiz">
              <Quiz
                questions={concept.quiz}
                onComplete={() => markDone(concept.slug)}
                nextSlug={next?.slug}
                nextTitle={next?.shortTitle}
              />
            </section>

            {/* Bottom nav */}
            <div className="hairline-t mt-10 flex flex-wrap items-center justify-between gap-3 pt-5">
              {prev ? (
                <Link
                  to="/playbook/$slug"
                  params={{ slug: prev.slug }}
                  className="hairline rounded-md px-3 py-2 text-[13px] text-foreground hover:bg-muted"
                >
                  ← {prev.shortTitle}
                </Link>
              ) : (
                <span />
              )}
              <span className="text-[12px] text-muted-foreground">
                {progress[concept.slug] === "done" ? (
                  <span className="inline-flex items-center gap-1 text-success">
                    <Check size={12} /> Concept complete
                  </span>
                ) : (
                  "Finish the quiz to mark complete"
                )}
              </span>
              {next ? (
                <div className="group relative inline-block">
                  <Link
                    to="/playbook/$slug"
                    params={{ slug: next.slug }}
                    className={`rounded-md px-3 py-2 text-[13px] font-medium inline-block ${
                      progress[concept.slug] === "done"
                        ? "bg-purple text-white hover:bg-purple-dark"
                        : "hairline text-muted-foreground pointer-events-none opacity-60"
                    }`}
                  >
                    {next.shortTitle} →
                  </Link>
                  {progress[concept.slug] !== "done" && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[11px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                      Complete quiz to unlock
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/playbook"
                  className="rounded-md bg-purple px-3 py-2 text-[13px] font-medium text-white hover:bg-purple-dark"
                >
                  Back to playbook
                </Link>
              )}
            </div>
          </article>
        </main>
        {/* Right TOC */}
        <TableOfContents concept={concept} />
      </div>
      <Footer />
    </div>
  );
}

function BodyBlock({ block }: { block: ConceptBodyBlock }) {
  if (block.kind === "h") {
    return (
      <div
        className="hairline-t mt-10 pt-6"
        id={block.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-purple">
          Section {block.number}
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight leading-snug text-foreground">
          {block.title}
        </h2>
        {block.subtitle && (
          <p className="mt-1 text-[14px] italic text-muted-foreground">{block.subtitle}</p>
        )}
      </div>
    );
  }
  if (block.kind === "h3") {
    return (
      <div
        className="mb-2 mt-10 first:mt-2"
        id={block.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      >
        <h3 className="text-xl font-medium tracking-tight leading-snug text-foreground">
          {block.title}
        </h3>
        {block.subtitle && (
          <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{block.subtitle}</p>
        )}
      </div>
    );
  }
  if (block.kind === "take") {
    return (
      <div
        className="rounded-xl bg-purple-light/70 px-5 py-4 text-[14px] text-purple-dark"
        style={{ borderLeft: "3px solid var(--purple)" }}
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-purple">Key takeaway</p>
        <p className="mt-1 font-medium leading-relaxed">{block.text}</p>
      </div>
    );
  }
  if (block.kind === "why") {
    return (
      <div
        className="rounded-xl bg-amber-bg/70 px-5 py-4 text-[14px] italic text-foreground"
        style={{ borderLeft: "3px solid var(--amber)" }}
      >
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-foreground/70 not-italic">
          Why this matters for you
        </p>
        {block.text}
      </div>
    );
  }
  if (block.kind === "ex") {
    return (
      <div className="hairline rounded-xl bg-card px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Example
        </p>
        <p className="mt-1 text-[14px] font-medium text-foreground">{block.title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">{block.body}</p>
      </div>
    );
  }
  if (block.kind === "trans") {
    return <p className="text-[14px] italic leading-relaxed text-muted-foreground">{block.text}</p>;
  }
  if (block.kind === "diagram") {
    return <DiagramBlock block={block} />;
  }
  return (
    <p>
      {block.parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        return (
          <span
            key={i}
            data-explain={part.explain}
            className="rounded-sm bg-purple-light/40 underline decoration-purple/30 decoration-dotted underline-offset-4 transition-colors hover:bg-purple-light"
          >
            {part.text}
          </span>
        );
      })}
    </p>
  );
}

function Sidebar({
  currentSlug,
  open,
  onClose,
}: {
  currentSlug: string;
  open: boolean;
  onClose: () => void;
}) {
  const { progress } = useProgress();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      setSidebarWidth((w) => Math.max(200, Math.min(600, w + e.movementX)));
    };
    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const list = (
    <nav className="px-5 py-6 flex flex-col">
      <Link
        to="/playbook"
        className="inline-flex items-center text-[13px] text-muted-foreground transition-colors hover:text-foreground mb-6"
      >
        ← All concepts
      </Link>
      <p className="section-label">AI Foundations for PMs</p>
      <ul className="mt-4 space-y-1">
        {concepts.map((c, idx) => {
          const isCurrent = c.slug === currentSlug;
          const done = progress[c.slug] === "done";

          return (
            <li key={c.slug} className="flex flex-col">
              <Link
                to="/playbook/$slug"
                params={{ slug: c.slug }}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                  isCurrent
                    ? "bg-purple-light text-purple-dark"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                <span
                  className={`flex items-center justify-center rounded-full text-[10px] font-medium shrink-0 ${
                    done
                      ? "bg-success-bg text-success"
                      : isCurrent
                        ? "bg-purple text-white"
                        : "hairline text-muted-foreground"
                  }`}
                  style={{ width: 20, height: 20 }}
                >
                  {done ? <Check size={11} /> : idx + 1}
                </span>
                <span className="truncate">{c.shortTitle}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-8 text-[12px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
      >
        ↑ Back to top
      </button>
    </nav>
  );

  return (
    <>
      <aside
        className="hairline-r relative sticky top-[52px] hidden h-[calc(100vh-52px)] shrink-0 overflow-y-auto bg-background lg:block"
        style={{ width: sidebarWidth }}
      >
        {list}
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-purple-light active:bg-purple"
          onMouseDown={(e) => {
            e.preventDefault();
            isResizing.current = true;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
        />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-[260px] overflow-y-auto bg-background">
            <div className="hairline-b flex items-center justify-between px-4 py-3">
              <span className="text-[14px] font-medium">Concepts</span>
              <button onClick={onClose} aria-label="Close menu">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            {list}
          </div>
        </div>
      )}
    </>
  );
}

function TableOfContents({
  concept,
  mobile,
}: {
  concept: NonNullable<ReturnType<typeof conceptBySlug>>;
  mobile?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => {
    const list: { id: string; title: string; kind: string }[] = [];
    concept.body.forEach((b) => {
      if (b.kind === "h" || b.kind === "h3") {
        list.push({
          id: b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: b.title,
          kind: b.kind,
        });
      }
    });
    if (concept.examples.length > 0) {
      list.push({ id: "examples", title: "Examples", kind: "h" });
    }
    list.push({ id: "quiz", title: "Quiz", kind: "h" });
    return list;
  }, [concept]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If multiple entries are intersecting, we pick the one closest to the top
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    headings.forEach((h: { id: string; title: string; kind: string }) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav
      className={
        mobile
          ? "w-full"
          : "sticky top-[52px] h-[calc(100vh-52px)] w-[240px] shrink-0 overflow-y-auto hidden xl:block px-6 py-12"
      }
    >
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-2.5">
        {headings.map((h: { id: string; title: string; kind: string }) => (
          <li key={h.id} className={h.kind === "h3" ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className={`block text-[13px] leading-snug transition-colors ${
                activeId === h.id
                  ? "text-purple font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
