const fs = require("fs");
const path = "C:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\routes\\playbook.$slug.tsx";
let text = fs.readFileSync(path, "utf8");

const originalHeader = `            <p className="text-[11px] text-muted-foreground">Module 1 › {concept.shortTitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px]">
              <span className="rounded-md bg-purple-light px-2 py-0.5 text-[11px] font-medium text-purple-dark">
                Concept {displayNum} of {concepts.length}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock size={12} />
                {concept.readingMinutes} min read · {concept.quiz.length} quiz questions
              </span>
            </div>

            <h1 id="concept" className="mt-4 text-4xl tracking-tight font-semibold leading-tight">
              {concept.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {concept.summary}
            </p>`;

const simplifiedHeader = `            <h1 id="concept" className="text-4xl tracking-tight font-semibold leading-tight text-foreground">
              {concept.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
              <Clock size={14} className="opacity-70" />
              <span>{concept.readingMinutes} min read</span>
              <span className="opacity-50">·</span>
              <span>{concept.quiz.length} quiz questions</span>
            </div>
            
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {concept.summary}
            </p>`;

text = text.replace(originalHeader, simplifiedHeader);

fs.writeFileSync(path, text, "utf8");
console.log("Successfully simplified ConceptPage header");
