// Slim run files to the fields the page reads, so the runs stay small enough
// to commit. A raw run is about 0.5–1.2 MB; a slim one about 0.1 MB.
//
//   pnpm slim              rewrite every runs/*.json in place
//   pnpm slim -- <file>…   only these files
//
// Slim before you commit a run. `pnpm single` slims on the fly.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const pick = (o, keys) => {
  if (!o || typeof o !== "object") return undefined;
  const out = {};
  for (const k of keys) if (o[k] !== undefined) out[k] = o[k];
  return out;
};
const mapValues = (o, f) =>
  o ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)])) : undefined;
const slimBundle = (b) => pick(b, ["gzip"]);
const slimRuntime = (r) =>
  r && {
    ...pick(r, ["addedP50Us", "firstCallMs", "importObjects", "firstCallObjects"]),
    importHeap: pick(r.importHeap, ["heapUsed"]),
  };
const slimProgram = (p) => ({
  ...pick(p, ["primary"]),
  bundle: slimBundle(p.bundle),
  strictBundle: slimBundle(p.strictBundle),
  runtime: slimRuntime(p.runtime),
  strictRuntime: slimRuntime(p.strictRuntime),
});
const slimSdk = (s) => ({
  ...slimProgram(s),
  target: pick(s.target, ["protocol"]),
  size: pick(s.size, ["tarball", "tarballWithCore"]),
  provider: s.provider,
  services: mapValues(s.services, (v) => pick(v, ["importMs", "heap"])),
  programs: mapValues(s.programs, slimProgram),
});
export const slimRun = (r) => {
  const { metrics: _m, env: _e, timings: _t, sdks, ...rest } = r;
  return { ...rest, sdks: mapValues(sdks, slimSdk) };
};

if (import.meta.main) {
  const runs = join(import.meta.dirname, "..", "runs");
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const files = args.length
    ? args
    : readdirSync(runs)
        .filter((f) => f.endsWith(".json"))
        .map((f) => join(runs, f));
  let before = 0;
  let after = 0;
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const slim = `${JSON.stringify(slimRun(JSON.parse(text)))}\n`;
    before += text.length;
    after += slim.length;
    writeFileSync(file, slim);
  }
  console.log(
    `${files.length} run(s): ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`,
  );
}
