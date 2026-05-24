const fs = require("fs");
const path = "C:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\routes\\playbook.$slug.tsx";
let text = fs.readFileSync(path, "utf8");

// 1. Remove the inline header block
const headerBlock = `            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/playbook"
                className="inline-flex items-center text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                ← All concepts
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-muted-foreground">
                  {doneCount} of {concepts.length} · {pct}%
                </span>
                <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-purple" style={{ width: \`\${pct}%\` }} />
                </div>
              </div>
            </div>`;

text = text.replace(headerBlock, "");

// 2. Add "All concepts" to Sidebar
const sidebarStart = `<nav className="px-5 py-6">
      <p className="section-label">AI Foundations for PMs</p>`;

const sidebarReplacement = `<nav className="px-5 py-6 flex flex-col">
      <Link to="/playbook" className="inline-flex items-center text-[13px] text-muted-foreground transition-colors hover:text-foreground mb-6">
        ← All concepts
      </Link>
      <p className="section-label">AI Foundations for PMs</p>`;

text = text.replace(sidebarStart, sidebarReplacement);

// 3. Add "Back to top" to TOC
const tocEnd = `      </ul>
    </nav>`;

const tocReplacement = `      </ul>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-8 text-[12px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
      >
        ↑ Back to top
      </button>
    </nav>`;

text = text.replace(tocEnd, tocReplacement);

fs.writeFileSync(path, text, "utf8");
console.log("Successfully applied UX tweaks");
