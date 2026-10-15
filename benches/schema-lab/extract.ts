/**
 * Extract the lab corpora: every shape and operation of a few real services,
 * as library-neutral IR in .out/corpus/<service>.json.
 *
 *   node --conditions=bun extract.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { extract, type Corpus, type Node, type Ref } from "./src/ir.ts";

export const SERVICES: ReadonlyArray<readonly [name: string, specifier: string]> = [
  ["aws-ec2", "@distilled.cloud/aws/ec2"],
  ["aws-s3", "@distilled.cloud/aws/s3"],
  ["aws-dynamodb", "@distilled.cloud/aws/dynamodb"],
  ["stripe", "@distilled.cloud/stripe/stripe"],
  ["cloudflare-workers", "@distilled.cloud/cloudflare/workers"],
];

const OUT = join(import.meta.dirname, ".out", "corpus");
mkdirSync(OUT, { recursive: true });

const stats = (c: Corpus) => {
  let fields = 0,
    meta = 0,
    refs = 0,
    unions = 0,
    dates = 0,
    blobs = 0;
  const visit = (r: Ref) => {
    if (r.meta) meta++;
    const n: Node = r.node;
    if (n.k === "ref") refs++;
    if (n.k === "union") {
      unions++;
      n.members.forEach(visit);
    }
    if (n.k === "date") dates++;
    if (n.k === "blob" || n.k === "stream") blobs++;
    if (n.k === "array") visit(n.item);
    if (n.k === "record") visit(n.value);
    if (n.k === "struct")
      n.fields.forEach((f) => {
        fields++;
        visit(f.type);
      });
  };
  Object.values(c.shapes).forEach(visit);
  return {
    shapes: Object.keys(c.shapes).length,
    operations: c.operations.length,
    fields,
    withMeta: meta,
    refs,
    unions,
    dates,
    blobs,
  };
};

for (const [name, specifier] of SERVICES) {
  const mod = await import(specifier);
  const corpus = extract(name, mod);
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(corpus));
  console.log(name.padEnd(20), JSON.stringify(stats(corpus)));
}
