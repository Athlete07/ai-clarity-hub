const fs = require("fs");

const mdPath =
  "C:\\Users\\MY PC\\.gemini\\antigravity\\brain\\87409891-f18c-40b1-9903-bbbdb8bc3c3f\\draft_concept_2.md";
const tsPath = "c:\\Users\\MY PC\\Documents\\FB_01\\ai-clarity-hub\\src\\lib\\concepts.ts";

const mdText = fs.readFileSync(mdPath, "utf8");

function escapeString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

// Parse the MD
const sections = mdText.split("SECTION ");
const chapterHeader = sections[0]; // Not really needed for the body array
const quizSectionStr = sections.pop(); // The last split contains the quiz
const actualSections = sections.slice(1); // 2.1 to 2.8

let bodyItems = [];

actualSections.forEach((sec) => {
  const lines = sec.trim().split("\n");
  const titleLine = lines[0]; // e.g. "2.1: What is a parameter (weight)"
  const titleParts = titleLine.split(": ");
  const number = titleParts[0];
  const title = titleParts[1];

  let takeaway = "";
  let pmLens = "";
  let bodyStartIdx = -1;
  let examplesStartIdx = -1;
  let transLine = "";

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith("KEY TAKEAWAY: ")) takeaway = lines[i].replace("KEY TAKEAWAY: ", "");
    if (lines[i].startsWith("WHY THIS MATTERS (PM LENS): "))
      pmLens = lines[i].replace("WHY THIS MATTERS (PM LENS): ", "");
    if (lines[i].startsWith("BODY:")) bodyStartIdx = i + 1;
    if (lines[i].startsWith("EXAMPLES:")) examplesStartIdx = i;
    if (lines[i].startsWith("TRANSITION: ")) transLine = lines[i].replace("TRANSITION: ", "");
  }

  bodyItems.push(
    `      { kind: "h3", title: "${escapeString(title)}", subtitle: "${escapeString(titleLine)}" },`,
  );
  bodyItems.push(`      { kind: "take", text: "${escapeString(takeaway)}" },`);
  bodyItems.push(`      { kind: "why", text: "${escapeString(pmLens)}" },`);

  const bodyParas = [];
  for (let i = bodyStartIdx; i < examplesStartIdx; i++) {
    if (lines[i].trim()) bodyParas.push(lines[i].trim());
  }

  bodyParas.forEach((p) => {
    // Parse highlights
    let pStr = `      { kind: "p", parts: [\n`;
    const regex = /\{HIGHLIGHT:\s*"([^"]+)"\}/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(p)) !== null) {
      const beforeText = p.substring(lastIndex, match.index);
      if (beforeText) {
        pStr += `        "${escapeString(beforeText)}",\n`;
      }
      const highlightText = match[1];
      // We will use the sentence as the text, and a generic tooltip since we didn't generate one
      pStr += `        { text: "${escapeString(highlightText)}", explanation: "This concept is a core mechanism of how models function under the hood." },\n`;
      lastIndex = regex.lastIndex;
    }
    const afterText = p.substring(lastIndex);
    if (afterText) {
      pStr += `        "${escapeString(afterText)}"\n`;
    }
    pStr += `      ] },`;
    bodyItems.push(pStr);
  });

  // parse examples
  for (let i = examplesStartIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("TRANSITION:")) break;
    if (lines[i].trim().startsWith("Example")) {
      const exLine = lines[i].trim().replace(/^Example \d+ — /, "");
      const exParts = exLine.split(": ");
      if (exParts.length >= 2) {
        const exTitle = exParts[0];
        const exBody = exParts.slice(1).join(": ");
        bodyItems.push(
          `      { kind: "ex", title: "${escapeString(exTitle)}", body: "${escapeString(exBody)}" },`,
        );
      }
    }
  }

  if (transLine) {
    bodyItems.push(`      { kind: "trans", text: "${escapeString(transLine)}" },`);
  }
});

// Parse quiz
const quizRegex =
  /Q\d+ — Section \d+\.\d+: (.*?)\n\s+Option A: (.*?)\n\s+Option B: (.*?)\n\s+Option C: (.*?)\n\s+Option D: (.*?)\n\s+CORRECT: (\d)\n\s+CORRECT FEEDBACK: (.*?)\n\s+WRONG FEEDBACK: (.*?)(?=\n\s+Q|$)/gs;
const quizzes = [];
let qMatch;
while ((qMatch = quizRegex.exec(quizSectionStr)) !== null) {
  quizzes.push(`      {
        q: "${escapeString(qMatch[1])}",
        options: [
          "${escapeString(qMatch[2])}",
          "${escapeString(qMatch[3])}",
          "${escapeString(qMatch[4])}",
          "${escapeString(qMatch[5])}"
        ],
        correct: ${parseInt(qMatch[6]) - 1}, // 0-indexed
        correctFeedback: "${escapeString(qMatch[7])}",
        wrongFeedback: "${escapeString(qMatch[8])}"
      }`);
}

const finalTsString = `  {
    slug: "pm-how-models-learn",
    number: 2,
    shortTitle: "How Models Learn",
    title: "How Models Learn",
    readingMinutes: 20,
    summary: "Parameters, loss functions, and gradient descent — demystified.",
    keyTakeaway: "Training is the process of adjusting parameters to minimize the loss function using gradient descent.",
    pmCallout: "When the model fails to generalize, your job is to fix the data, not the code.",
    body: [
${bodyItems.join("\n")}
    ],
    quiz: [
${quizzes.join(",\n")}
    ]
  },`;

const tsFile = fs.readFileSync(tsPath, "utf8");

// We need to replace the object with slug: "pm-how-models-learn"
// Instead of writing a complex regex to match the exact end of the object,
// we know `pm-how-models-learn` starts around line 39 and ends before `ai-vs-ml-vs-deep-learning`
const startIdx = tsFile.indexOf('  {\n    slug: "pm-how-models-learn"');
const endIdx = tsFile.indexOf('  {\n    slug: "ai-vs-ml-vs-deep-learning"');

if (startIdx !== -1 && endIdx !== -1) {
  const newFile = tsFile.substring(0, startIdx) + finalTsString + "\n" + tsFile.substring(endIdx);
  fs.writeFileSync(tsPath, newFile, "utf8");
  console.log("Successfully replaced concepts.ts");
} else {
  console.log("Could not find the bounds for replacement");
}
