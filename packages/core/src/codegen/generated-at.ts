/**
 * Records when an SDK was last generated, as `distilled.generatedAt` in the
 * package's `package.json` (a UTC `YYYY-MM-DD` date).
 *
 * Every successful generator run calls this, so the date lands in the same
 * commit as the regenerated code and ships to npm with the package. A date
 * keeps repeat runs on the same day from churning the manifest.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Today's date in UTC, `YYYY-MM-DD`. */
export const generatedAtDate = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

/** Set `distilled.generatedAt` in `<root>/package.json`; returns the date written. */
export const stampGeneratedAt = (root: string, now: Date = new Date()): string => {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  const date = generatedAtDate(now);
  if (pkg.distilled?.generatedAt === date) return date;
  pkg.distilled = { ...pkg.distilled, generatedAt: date };
  writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
  return date;
};
