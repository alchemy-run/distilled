/**
 * Rolldown bundle benchmark for Distilled SDKs.
 *
 *   bun benches/bundle/run.ts [--runs N] [--only name,…] [--variants a,b]
 *                             [--all-variants] [--json] [--keep]
 *
 * Each fixture × variant is built in a fresh `bun` process (cold = first
 * build in that process, warm = median of the remaining `--runs`). Prints a
 * markdown report and writes `.out/report.md` + `.out/results.json`.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { BuildRequest, BuildResult } from "./src/build.ts";
import { fixtures, type Fixture, type ServiceRef } from "./src/fixtures.ts";
import { variantId, type BuildVariant } from "./src/options.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const outRoot = path.join(here, ".out");

// --- CLI --------------------------------------------------------------------
const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : (args[i + 1] ?? "");
};
const has = (name: string) => args.includes(`--${name}`);

const runs = Number(flag("runs") ?? 3);
const only = flag("only")?.split(",").filter(Boolean);
const keep = has("keep");

/**
 * Default variant matrix. `bun` = Alchemy's `BUN_CONDITION_NAMES` with the
 * PURE annotator and full minify (Worker settings). The no-PURE variant is
 * run on the two deep fixtures so the report shows what the annotator buys.
 */
const BUN: BuildVariant = { conditions: "bun", pure: true, minify: true };
const BUN_NOPURE: BuildVariant = {
  conditions: "bun",
  pure: false,
  minify: true,
};
const BUN_NOMINIFY: BuildVariant = {
  conditions: "bun",
  pure: true,
  minify: false,
};
const ALL_VARIANTS = {
  bun: BUN,
  "bun+nopure": BUN_NOPURE,
  "bun+nominify": BUN_NOMINIFY,
};

const defaultVariants = (f: Fixture): BuildVariant[] =>
  f.name === "aws-s3-deep" || f.name === "cf-workers-deep"
    ? [BUN, BUN_NOPURE]
    : [BUN];

const variantsFor = (f: Fixture): BuildVariant[] => {
  const requested = flag("variants")?.split(",").filter(Boolean);
  if (has("all-variants")) return Object.values(ALL_VARIANTS);
  if (requested) {
    return requested.map((v) => {
      const found = ALL_VARIANTS[v as keyof typeof ALL_VARIANTS];
      if (!found)
        throw new Error(
          `unknown variant ${v}; known: ${Object.keys(ALL_VARIANTS)}`,
        );
      return found;
    });
  }
  return defaultVariants(f);
};

// --- helpers ----------------------------------------------------------------
const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
const ms = (n: number) => `${n.toFixed(0)} ms`;
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length === 0 ? Number.NaN : s[Math.floor(s.length / 2)]!;
};

const OP_MARKER: Record<ServiceRef["pkg"], RegExp> = {
  aws: /operationName:\s*[`"']/g,
  cloudflare: /uri:\s*[`"']\/(?:accounts|zones)\/\{/g,
};
const count = (text: string, re: RegExp) => text.match(re)?.length ?? 0;

async function serviceOpTotal(ref: ServiceRef): Promise<number> {
  const file = path.join(
    repoRoot,
    "packages",
    ref.pkg,
    "src/services",
    ref.file,
  );
  return count(await fs.readFile(file, "utf8"), OP_MARKER[ref.pkg]);
}

/** Group rendered module sizes by owning package (workspace or node_modules). */
function composition(
  result: BuildResult,
): Array<{ pkg: string; bytes: number; modules: number }> {
  const groups = new Map<string, { bytes: number; modules: number }>();
  for (const m of result.modules) {
    const id = m.id.replace(/\\/g, "/");
    let pkg: string;
    const nm = id.lastIndexOf("/node_modules/");
    if (nm !== -1) {
      const parts = id.slice(nm + "/node_modules/".length).split("/");
      pkg = parts[0]!.startsWith("@") ? `${parts[0]}/${parts[1]}` : parts[0]!;
    } else {
      const ws = id.match(/\/packages\/([^/]+)\//);
      pkg = ws
        ? `@distilled.cloud/${ws[1]}`
        : id.includes("/benches/bundle/")
          ? "(entry)"
          : id;
    }
    const g = groups.get(pkg) ?? { bytes: 0, modules: 0 };
    g.bytes += m.renderedLength;
    g.modules += 1;
    groups.set(pkg, g);
  }
  return [...groups.entries()]
    .map(([pkg, g]) => ({ pkg, ...g }))
    .sort((a, b) => b.bytes - a.bytes);
}

interface Row {
  fixture: Fixture;
  variant: BuildVariant;
  result: BuildResult;
  expectMissing: string[];
  forbidPresent: string[];
  opsRetained: Array<{ service: string; retained: number; total: number }>;
  composition: ReturnType<typeof composition>;
}

async function runOne(fixture: Fixture, variant: BuildVariant): Promise<Row> {
  const id = variantId(variant);
  const req: BuildRequest = {
    entry: path.join(here, fixture.entry),
    cwd: here,
    outDir: path.join(outRoot, fixture.name, id),
    variant,
    runs,
  };
  const proc = Bun.spawn(
    ["bun", path.join(here, "src/build.ts"), JSON.stringify(req)],
    {
      cwd: here,
      stdout: "pipe",
      stderr: "inherit",
    },
  );
  const stdout = await new Response(proc.stdout).text();
  const code = await proc.exited;
  if (code !== 0)
    throw new Error(`${fixture.name}/${id}: build process exited ${code}`);
  const result = JSON.parse(stdout) as BuildResult;

  const bundle = await fs.readFile(result.outputFile, "utf8");
  const expectMissing = fixture.expect
    .filter((m) => !m.pattern.test(bundle))
    .map((m) => m.label);
  const forbidPresent = fixture.forbid
    .filter((m) => m.pattern.test(bundle))
    .map((m) => m.label);
  const opsRetained = await Promise.all(
    fixture.services.map(async (s) => ({
      service: `${s.pkg}/${s.file.replace(/\.ts$/, "")}`,
      retained: count(bundle, OP_MARKER[s.pkg]),
      total: await serviceOpTotal(s),
    })),
  );
  return {
    fixture,
    variant,
    result,
    expectMissing,
    forbidPresent,
    opsRetained,
    composition: composition(result),
  };
}

// --- report -----------------------------------------------------------------
function shakeNotes(row: Row): string {
  const notes: string[] = [];
  if (row.expectMissing.length)
    notes.push(`❌ missing: ${row.expectMissing.join(", ")}`);
  if (row.forbidPresent.length)
    notes.push(`⚠️ leaked: ${row.forbidPresent.join("; ")}`);
  for (const o of row.opsRetained)
    notes.push(`${o.service}: ${o.retained}/${o.total} ops`);
  if (!row.expectMissing.length && !row.forbidPresent.length)
    notes.unshift("✅");
  return notes.join(" · ");
}

function report(rows: Row[], rolldownVersion: string): string {
  const lines: string[] = [];
  lines.push(`# Distilled rolldown bundle bench`);
  lines.push("");
  lines.push(
    `rolldown ${rolldownVersion} · bun ${Bun.version} · runs/fixture: ${runs} (cold = 1st build in a fresh process, warm = median of the rest) · conditions \`bun,module,default\` (resolves \`packages/*/src\`) · PURE annotator on unless \`+nopure\` · minify on unless \`+nominify\``,
  );
  lines.push("");
  lines.push(
    "| fixture | variant | cold | warm | bytes | gzip | modules | tree-shake |",
  );
  lines.push("|---|---|---:|---:|---:|---:|---:|---|");
  for (const r of rows) {
    const [cold, ...rest] = r.result.timesMs;
    lines.push(
      `| ${r.fixture.name} | ${variantId(r.variant)} | ${ms(cold!)} | ${rest.length ? ms(median(rest)) : "–"} | ${kb(r.result.bytes)} | ${kb(r.result.gzipBytes)} | ${r.result.moduleCount} | ${shakeNotes(r)} |`,
    );
  }
  lines.push("");
  lines.push("## Fixtures");
  lines.push("");
  for (const f of fixtures)
    lines.push(`- **${f.name}** (\`${f.entry}\`): ${f.description}`);
  lines.push("");
  lines.push(
    "## Composition (rendered bytes per package, post-treeshake / pre-minify)",
  );
  lines.push("");
  for (const r of rows) {
    const top = r.composition.slice(0, 8);
    const total = r.composition.reduce((n, c) => n + c.bytes, 0);
    lines.push(`### ${r.fixture.name} / ${variantId(r.variant)}`);
    lines.push("");
    lines.push(
      `${kb(total)} rendered → ${kb(r.result.bytes)} written (×${(r.result.bytes / total).toFixed(2)}; scale rendered numbers below by this for a minified estimate). PURE plugin: ${r.result.pure.annotations} annotations in ${r.result.pure.annotatedModules}/${r.result.pure.matchedModules} matched modules, ${r.result.pure.sideEffectFreeModules} marked side-effect free.`,
    );
    lines.push("");
    lines.push("| package | rendered | share | modules |");
    lines.push("|---|---:|---:|---:|");
    for (const c of top) {
      lines.push(
        `| ${c.pkg} | ${kb(c.bytes)} | ${((100 * c.bytes) / total).toFixed(1)}% | ${c.modules} |`,
      );
    }
    for (const svc of r.result.services) {
      lines.push("");
      lines.push(
        `**\`${path.relative(repoRoot, svc.id)}\`** — ${kb(svc.renderedBytes)} rendered, ${svc.decls} top-level bindings retained; ${svc.unreferenced} of them (${kb(svc.unreferencedBytes)}) are unreferenced — kept only because rolldown could not prove the initializer pure:`,
      );
      lines.push("");
      lines.push(
        "| kind | bytes | share | retained | unreferenced | unreferenced bytes |",
      );
      lines.push("|---|---:|---:|---:|---:|---:|");
      const kinds = Object.keys(svc.bytesByKind) as Array<
        keyof typeof svc.bytesByKind
      >;
      for (const k of kinds.sort(
        (a, b) => svc.bytesByKind[b] - svc.bytesByKind[a],
      )) {
        if (svc.countByKind[k] === 0) continue;
        lines.push(
          `| ${k} | ${kb(svc.bytesByKind[k])} | ${((100 * svc.bytesByKind[k]) / svc.renderedBytes).toFixed(1)}% | ${svc.countByKind[k]} | ${svc.unreferencedByKind[k]} | ${kb(svc.unreferencedBytesByKind[k])} |`,
        );
      }
      if (svc.largestUnreferenced.length) {
        lines.push("");
        lines.push(
          `Largest unreferenced: ${svc.largestUnreferenced
            .slice(0, 6)
            .map((d) => `\`${d.name}\` (${d.bytes} B, ${d.kind})`)
            .join(", ")}`,
        );
      }
    }
    if (r.result.warnings.length) {
      lines.push("");
      lines.push(
        `Warnings (${r.result.warnings.length}): ${r.result.warnings.slice(0, 3).join(" | ")}`,
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

// --- main -------------------------------------------------------------------
const selected = fixtures.filter((f) => !only || only.includes(f.name));
if (selected.length === 0) {
  console.error(
    `no fixtures match --only ${only}; known: ${fixtures.map((f) => f.name).join(",")}`,
  );
  process.exit(2);
}

const rolldownVersion = (
  JSON.parse(
    await fs.readFile(
      path.join(here, "node_modules/rolldown/package.json"),
      "utf8",
    ),
  ) as {
    version: string;
  }
).version;

const rows: Row[] = [];
const t0 = performance.now();
for (const fixture of selected) {
  for (const variant of variantsFor(fixture)) {
    process.stderr.write(`▶ ${fixture.name} [${variantId(variant)}] …`);
    const row = await runOne(fixture, variant);
    process.stderr.write(
      ` cold ${ms(row.result.timesMs[0]!)} · ${kb(row.result.bytes)} · gzip ${kb(row.result.gzipBytes)}\n`,
    );
    rows.push(row);
  }
}
const wall = performance.now() - t0;

const md = report(rows, rolldownVersion);
await fs.mkdir(outRoot, { recursive: true });
await fs.writeFile(path.join(outRoot, "report.md"), md);
await fs.writeFile(
  path.join(outRoot, "results.json"),
  JSON.stringify(
    {
      rolldown: rolldownVersion,
      bun: Bun.version,
      runs,
      wallMs: wall,
      rows: rows.map((r) => ({
        fixture: r.fixture.name,
        variant: variantId(r.variant),
        timesMs: r.result.timesMs,
        bytes: r.result.bytes,
        gzipBytes: r.result.gzipBytes,
        moduleCount: r.result.moduleCount,
        pure: r.result.pure,
        expectMissing: r.expectMissing,
        forbidPresent: r.forbidPresent,
        opsRetained: r.opsRetained,
        composition: r.composition,
        warnings: r.result.warnings,
      })),
    },
    null,
    2,
  ),
);
if (!keep) {
  for (const r of rows) {
    await fs.rm(path.dirname(r.result.outputFile), {
      recursive: true,
      force: true,
    });
  }
}
console.log(md);
console.log(
  `\n_total wall time ${(wall / 1000).toFixed(1)} s · report: ${path.relative(process.cwd(), path.join(outRoot, "report.md"))}_`,
);
if (has("json"))
  console.log(
    JSON.stringify(
      rows.map((r) => ({
        fixture: r.fixture.name,
        variant: variantId(r.variant),
        bytes: r.result.bytes,
        gzip: r.result.gzipBytes,
        timesMs: r.result.timesMs,
      })),
    ),
  );
