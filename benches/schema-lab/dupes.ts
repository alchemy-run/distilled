import { readdirSync, readFileSync } from "node:fs";
import { dedupe, inlineDuplicates } from "./src/dedupe.ts";
for (const f of readdirSync(".out/corpus")) {
  const c = JSON.parse(readFileSync(`.out/corpus/${f}`, "utf8"));
  const before = Object.keys(c.shapes).length;
  const t = performance.now();
  const d = dedupe(c);
  const ms = performance.now() - t;
  // Biggest classes, for a feel of what repeats.
  const groups = new Map<string, string[]>();
  for (const [n, k] of d.canonical) groups.set(k, [...(groups.get(k) ?? []), n]);
  const big = [...groups.values()].filter((g) => g.length > 1).sort((a, b) => b.length - a.length);
  const inl = inlineDuplicates(c);
  console.log(
    `${f.replace(".json", "").padEnd(20)} named ${before} -> ${d.classes} (-${((1 - d.classes / before) * 100).toFixed(1)}%) in ${d.rounds} rounds, ${ms.toFixed(0)} ms; inline structs ${inl.inlineStructs}, ${inl.removable} duplicates`,
  );
  for (const g of big.slice(0, 3))
    console.log(`    ${g.length}x  ${g.slice(0, 4).join(", ")}${g.length > 4 ? ", ..." : ""}`);
}
