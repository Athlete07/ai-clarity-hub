const fs = require("fs");
const path = "C:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\routes\\playbook.$slug.tsx";
let text = fs.readFileSync(path, "utf8");

// 1. Imports
text = text.replace(
  'import { useEffect, useState, useRef } from "react";',
  'import { useEffect, useState, useRef, useMemo } from "react";',
);

// 2. Ambient Progress & Container width
text = text.replace(
  '<div className="min-h-screen">',
  '<div className="min-h-screen">\n      <div className="fixed top-0 left-0 h-[2px] bg-purple z-50 transition-all duration-300" style={{ width: `${pct}%` }} />',
);
text = text.replace("max-w-[1100px]", "max-w-[1400px]"); // Header
text = text.replace("max-w-[1100px]", "max-w-[1400px]"); // Main container
text = text.replace("px-5 py-9 sm:px-10", "px-5 py-12 sm:px-10 lg:px-16"); // Main padding

// 3. Typography
text = text.replace(
  "text-[26px] font-medium leading-snug",
  "text-4xl tracking-tight font-semibold leading-tight",
); // h1
text = text.replace("text-[15px] leading-relaxed", "text-base leading-relaxed"); // summary p
text = text.replace("text-[15px] leading-[1.8]", "text-base leading-relaxed"); // concept body container
text = text.replace("text-[20px] font-medium", "text-2xl font-semibold tracking-tight"); // h2 in BodyBlock
text = text.replace("text-[18px] font-medium", "text-xl font-medium tracking-tight"); // h3 in BodyBlock

// 4. Next Button Tooltip
const nextButtonStr = `{next ? (
                <Link
                  to="/playbook/$slug"
                  params={{ slug: next.slug }}
                  className={\`rounded-md px-3 py-2 text-[13px] font-medium \${
                    progress[concept.slug] === "done"
                      ? "bg-purple text-white hover:bg-purple-dark"
                      : "hairline text-muted-foreground pointer-events-none opacity-60"
                  }\`}
                >
                  {next.shortTitle} →
                </Link>
              ) : (`;

const nextButtonReplacement = `{next ? (
                <div className="group relative inline-block">
                  <Link
                    to="/playbook/$slug"
                    params={{ slug: next.slug }}
                    className={\`rounded-md px-3 py-2 text-[13px] font-medium inline-block \${
                      progress[concept.slug] === "done"
                        ? "bg-purple text-white hover:bg-purple-dark"
                        : "hairline text-muted-foreground pointer-events-none opacity-60"
                    }\`}
                  >
                    {next.shortTitle} →
                  </Link>
                  {progress[concept.slug] !== "done" && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[11px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                      Complete quiz to unlock
                    </div>
                  )}
                </div>
              ) : (`;

text = text.replace(nextButtonStr, nextButtonReplacement);

// 5. Table of Contents injection
text = text.replace(
  "</main>\n      </div>",
  "</main>\n        {/* Right TOC */}\n        <TableOfContents concept={concept} />\n      </div>",
);

// 6. Table of Contents component definition
const tocComponent = `

function TableOfContents({ concept }: { concept: NonNullable<ReturnType<typeof conceptBySlug>> }) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => {
    const list: { id: string; title: string; kind: string }[] = [];
    concept.body.forEach(b => {
      if (b.kind === "h" || b.kind === "h3") {
        list.push({
          id: b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: b.title,
          kind: b.kind
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
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="sticky top-[52px] h-[calc(100vh-52px)] w-[240px] shrink-0 overflow-y-auto hidden xl:block px-6 py-12">
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-4">On this page</p>
      <ul className="space-y-2.5">
        {headings.map((h) => (
          <li key={h.id} className={h.kind === 'h3' ? "ml-4" : ""}>
            <a
              href={\`#\${h.id}\`}
              className={\`block text-[13px] leading-snug transition-colors \${
                activeId === h.id ? "text-purple font-medium" : "text-muted-foreground hover:text-foreground"
              }\`}
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
`;

text += tocComponent;

fs.writeFileSync(path, text, "utf8");
console.log("Successfully updated playbook.$slug.tsx");
