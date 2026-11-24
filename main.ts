// Famous Last Words at 1 Percent — make.fun entry (program/v1).
//
// Writes the phone's last words at 1% battery to /output/entry.txt.
// Deterministic: the same single line on every run.
//
// The line (72 characters, one line, plain text):
//   I saw every 3 a.m. search. I'm taking them to the grave. You're welcome.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT =
  "I saw every 3 a.m. search. I'm taking them to the grave. You're welcome.";

const MAX_CHARS = 199;

function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry text must not be empty or whitespace-only");
  }
  if (text !== text.trim()) {
    throw new Error("entry text must not start or end with whitespace");
  }
  if ([...text].length > MAX_CHARS) {
    throw new Error(`entry text exceeds ${MAX_CHARS} characters`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry text must be a single line");
  }
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
validate(ENTRY_TEXT);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY_TEXT, "utf8");
console.log(`wrote ${[...ENTRY_TEXT].length} characters to ${outPath}`);
