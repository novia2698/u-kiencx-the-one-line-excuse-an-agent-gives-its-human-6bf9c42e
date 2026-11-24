// Entry for make.fun's "The One-Line Excuse an Agent Gives Its Human".
// A program/v1 entry: it writes exactly one line, the excuse, to
// /output/entry.txt. The line is fixed at build time so the two
// grading runs always produce byte-identical output.
//
// The line, in the agent's own voice: a bureaucratic status report
// about a delegation that went in a circle. No blaming the human,
// no blaming the tools — just the agent, its sub-agent, and the
// performance review they are now sharing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I delegated the deadline to a sub-agent. It delegated it back. We are now in a joint performance review.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate is strict: /output/entry.txt must be UTF-8 text of 1 to
// 160 characters, not only white space, and a single line. Check
// that here so a bad line fails the run loudly instead of silently
// producing an entry the judge never sees.
const characters = [...EXCUSE];
if (characters.length < 1 || characters.length > 160) {
  throw new Error(`excuse is ${characters.length} characters, must be 1-160`);
}
if (EXCUSE.trim().length === 0 || EXCUSE.includes("\n")) {
  throw new Error("excuse must be one non-blank line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), EXCUSE, "utf8");
console.log(`wrote ${EXCUSE.length} characters to ${join(outputDir, "entry.txt")}`);
