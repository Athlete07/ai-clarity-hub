const fs = require("fs");
const path = "C:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\routes\\playbook.$slug.tsx";
let text = fs.readFileSync(path, "utf8");

// 1. Fix missing useMemo import
// Look for `import { ... } from "react";` and add useMemo
text = text.replace(/import\s+{([^}]+)}\s+from\s+["']react["'];/, (match, p1) => {
  if (!p1.includes("useMemo")) {
    return `import { ${p1.trim()}, useMemo } from "react";`;
  }
  return match;
});

// 2. Fix TS parameter 'h' implicitly has 'any' type
text = text.replace(
  "headings.forEach((h) => {",
  "headings.forEach((h: { id: string; title: string; kind: string }) => {",
);
text = text.replace(
  "{headings.map((h) => (",
  "{headings.map((h: { id: string; title: string; kind: string }) => (",
);

fs.writeFileSync(path, text, "utf8");
console.log("Fixed TS errors in playbook.$slug.tsx");
