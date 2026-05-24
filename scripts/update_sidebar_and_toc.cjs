const fs = require("fs");
const path = "C:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\routes\\playbook.$slug.tsx";
let text = fs.readFileSync(path, "utf8");

// 1. Refactor TableOfContents
text = text.replace(
  "function TableOfContents({ concept }: { concept: NonNullable<ReturnType<typeof conceptBySlug>> }) {",
  "function TableOfContents({ concept, mobile }: { concept: NonNullable<ReturnType<typeof conceptBySlug>>, mobile?: boolean }) {",
);

text = text.replace(
  '<nav className="sticky top-[52px] h-[calc(100vh-52px)] w-[240px] shrink-0 overflow-y-auto hidden xl:block px-6 py-12">',
  '<nav className={mobile ? "w-full" : "sticky top-[52px] h-[calc(100vh-52px)] w-[240px] shrink-0 overflow-y-auto hidden xl:block px-6 py-12"}>',
);

// 2. Inject Mobile TOC into ConceptPage
const summaryOriginal = `<p className="hairline-b mt-3 pb-6 text-base leading-relaxed text-muted-foreground">
              {concept.summary}
            </p>`;

const summaryReplacement = `<p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {concept.summary}
            </p>
            
            <div className="hairline-b pb-6 xl:hidden mt-6 mb-2">
              <div className="rounded-xl border border-muted/60 bg-muted/30 p-5">
                <TableOfContents concept={concept} mobile />
              </div>
            </div>
            <div className="hairline-b pb-6 hidden xl:block" />`;

text = text.replace(summaryOriginal, summaryReplacement);

// 3. Clean up Sidebar
const sidebarStart = `  const [expanded, setExpanded] = useState<Record<string, boolean>>({ [currentSlug]: true });

  const toggleExpanded = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const list = (
    <nav className="px-5 py-6">
      <p className="section-label">AI Foundations for PMs</p>
      <ul className="mt-4 space-y-1">
        {concepts.map((c, idx) => {
          const isCurrent = c.slug === currentSlug;
          const done = progress[c.slug] === "done";
          const isExpanded = expanded[c.slug];

          const subConcepts = c.body.filter((b) => b.kind === "h" || b.kind === "h3");

          return (
            <li key={c.slug} className="flex flex-col">
              <Link
                to="/playbook/$slug"
                params={{ slug: c.slug }}
                onClick={onClose}
                className={\`group flex items-center justify-between rounded-md px-2.5 py-2 text-[13px] transition-colors \${
                  isCurrent
                    ? "bg-purple-light text-purple-dark"
                    : "text-foreground hover:bg-muted/60"
                }\`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span
                    className={\`flex items-center justify-center rounded-full text-[10px] font-medium shrink-0 \${
                      done
                        ? "bg-success-bg text-success"
                        : isCurrent
                          ? "bg-purple text-white"
                          : "hairline text-muted-foreground"
                    }\`}
                    style={{ width: 20, height: 20 }}
                  >
                    {done ? <Check size={11} /> : idx + 1}
                  </span>
                  <span className="truncate">{c.shortTitle}</span>
                </div>
                {subConcepts.length > 0 && (
                  <button
                    onClick={(e) => toggleExpanded(e, c.slug)}
                    className={\`shrink-0 rounded p-1 transition-transform hover:bg-black/5 \${
                      isExpanded ? "rotate-90" : ""
                    }\`}
                  >
                    <ChevronRight
                      size={14}
                      className={isCurrent ? "text-purple-dark" : "text-muted-foreground"}
                    />
                  </button>
                )}
              </Link>
              {isExpanded && subConcepts.length > 0 && (
                <ul className="mt-1 mb-2 ml-5 space-y-1 border-l-2 border-muted/60 pl-3">
                  {subConcepts.map((sub, idx) => {
                    const title = sub.kind === "h" ? sub.title : sub.kind === "h3" ? sub.title : "";
                    const number = sub.kind === "h" ? sub.number + " " : "";
                    return (
                      <li key={idx}>
                        <a
                          href={\`#\${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`}
                          className="block truncate py-1.5 text-[12px] text-muted-foreground hover:text-foreground"
                          title={title}
                          onClick={onClose}
                        >
                          {number}
                          {title}
                        </a>
                      </li>
                    );
                  })}
                  {c.examples.length > 0 && (
                    <li key="examples">
                      <a
                        href="#examples"
                        className="block truncate py-1.5 text-[12px] text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                      >
                        Examples
                      </a>
                    </li>
                  )}
                  {c.quiz.length > 0 && (
                    <li key="quiz">
                      <a
                        href="#quiz"
                        className="block truncate py-1.5 text-[12px] text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                      >
                        Quiz
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );`;

const sidebarReplacement = `  const list = (
    <nav className="px-5 py-6">
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
                className={\`flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-colors \${
                  isCurrent
                    ? "bg-purple-light text-purple-dark"
                    : "text-foreground hover:bg-muted/60"
                }\`}
              >
                <span
                  className={\`flex items-center justify-center rounded-full text-[10px] font-medium shrink-0 \${
                    done
                      ? "bg-success-bg text-success"
                      : isCurrent
                        ? "bg-purple text-white"
                        : "hairline text-muted-foreground"
                  }\`}
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
    </nav>
  );`;

text = text.replace(sidebarStart, sidebarReplacement);

// 4. Remove ChevronRight import if it's there
text = text.replace("Check, ChevronRight", "Check");

fs.writeFileSync(path, text, "utf8");
console.log("Successfully updated sidebar and mobile TOC");
