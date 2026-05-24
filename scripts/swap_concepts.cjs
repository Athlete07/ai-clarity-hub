const fs = require("fs");
const path = "C:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\lib\\concepts.ts";
let text = fs.readFileSync(path, "utf8");

const pmIdx = text.indexOf('  {\n    slug: "pm-how-models-learn",');
const aiIdx = text.indexOf('  {\n    slug: "ai-vs-ml-vs-deep-learning",');
const endIdx = text.indexOf("];\n\nexport const conceptBySlug");

if (pmIdx !== -1 && aiIdx !== -1 && endIdx !== -1 && pmIdx < aiIdx) {
  const prefix = text.substring(0, pmIdx);
  const pmConcept = text.substring(pmIdx, aiIdx);
  const aiConcept = text.substring(aiIdx, endIdx);
  const suffix = text.substring(endIdx);

  // Swap them
  const newText = prefix + aiConcept + pmConcept + suffix;
  fs.writeFileSync(path, newText, "utf8");
  console.log("Successfully swapped concepts!");
} else {
  console.log("Failed to find boundaries for swapping.", pmIdx, aiIdx, endIdx);
}
