/**
 * Per-package spec-patch statistics for the /shame page and the homepage
 * award. Read-only over `packages/<dir>/{patches,src/services}`.
 *
 * "Fixes" are counted from the committed patch files, not by running the
 * generator:
 * - RFC-6902 files (`{ patches: [...] }`, every package but AWS): one fix per
 *   operation in `patches`.
 * - AWS's declarative `patches/<sdkId>.json`: one fix per named entry under
 *   `operations`, `structures`, `errors` and `errorCategories`.
 *
 * "Operations" are the `API.OperationMethod` / `API.PaginatedOperationMethod`
 * exports in the generated services, so the ratio is fixes per 100 SDK calls.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

export interface PatchStats {
  readonly dir: string;
  readonly files: number;
  readonly fixes: number;
  readonly operations: number;
  /** Fixes per 100 SDK operations; `null` when there are no operations. */
  readonly per100: number | null;
  readonly ops: Readonly<Record<string, number>>;
}

const OP_KINDS = ["add", "remove", "replace", "move", "copy", "test"] as const;

const walk = async (dir: string, out: string[] = []): Promise<string[]> => {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
};

const countDeclarativeAws = (doc: Record<string, unknown>): number => {
  let n = 0;
  for (const key of ["operations", "structures", "errors", "errorCategories"]) {
    const section = doc[key];
    if (section && typeof section === "object") {
      n += Object.keys(section as object).length;
    }
  }
  return n;
};

const countOperations = async (servicesDir: string): Promise<number> => {
  const re =
    /^export const [A-Za-z0-9_]+: API\.(?:Paginated)?OperationMethod</gm;
  let n = 0;
  for (const file of await walk(servicesDir)) {
    if (!file.endsWith(".ts")) continue;
    const src = await readFile(file, "utf8");
    n += src.match(re)?.length ?? 0;
  }
  return n;
};

export const readPatchStats = async (
  packagesDir: string,
  dir: string,
): Promise<PatchStats> => {
  const pkgRoot = join(packagesDir, dir);
  const ops: Record<string, number> = {};
  let files = 0;
  let fixes = 0;

  const patchFiles = (await walk(join(pkgRoot, "patches"))).filter((f) =>
    f.endsWith(".json"),
  );
  for (const file of patchFiles) {
    let doc: unknown;
    try {
      doc = JSON.parse(await readFile(file, "utf8"));
    } catch {
      continue;
    }
    files++;
    if (Array.isArray(doc)) {
      fixes += doc.length;
      for (const op of doc) tally(ops, op);
    } else if (doc && typeof doc === "object") {
      const rec = doc as Record<string, unknown>;
      if (Array.isArray(rec.patches)) {
        fixes += rec.patches.length;
        for (const op of rec.patches) tally(ops, op);
      } else {
        const n = countDeclarativeAws(rec);
        fixes += n;
        ops.declare = (ops.declare ?? 0) + n;
      }
    }
  }

  const servicesDir = join(pkgRoot, "src", "services");
  const hasServices = await stat(servicesDir)
    .then((s) => s.isDirectory())
    .catch(() => false);
  const operations = hasServices ? await countOperations(servicesDir) : 0;

  return {
    dir,
    files,
    fixes,
    operations,
    per100: operations > 0 ? (fixes / operations) * 100 : null,
    ops,
  };
};

const tally = (ops: Record<string, number>, op: unknown): void => {
  const kind =
    op &&
    typeof op === "object" &&
    typeof (op as { op?: unknown }).op === "string"
      ? (op as { op: string }).op
      : "other";
  const key = (OP_KINDS as readonly string[]).includes(kind) ? kind : "other";
  ops[key] = (ops[key] ?? 0) + 1;
};
