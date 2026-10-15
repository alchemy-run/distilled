/**
 * Remove JSDoc blocks from the compiled `packages/<pkg>/lib/**.js` that tsc
 * emits (run after `tsc -b`; `pnpm build` does).
 *
 * V8 keeps every loaded module's source text in the heap, so doc comments
 * cost memory in every process that imports an SDK: 13% of AWS EC2's
 * compiled service module and 44% of S3's. The docs stay where editors read
 * them: in the `.d.ts` files and in `src/`.
 *
 * Only whole-line JSDoc blocks are removed (never PURE markers), and each is
 * replaced with the same number of newlines, so line numbers -- and the
 * emitted source maps -- stay valid. Every rewritten file is re-parsed and
 * its string literals compared with the original, so a doc-like block inside
 * a template literal can never be cut.
 *
 * Generated service modules (`lib/services/*.js`) are then rewritten into
 * data operations (`packages/core/src/codegen/datafy.ts`): each operation
 * and its schemas become a description evaluated on first call, so
 * importing a service builds no schema code. `src/` keeps the code form,
 * which bundlers resolving the `bun` condition read and tree-shake. The
 * rewrite moves lines, so the services' `.js.map` files are removed.
 *
 *   node scripts/strip-lib-docs.ts [packages/<pkg> ...]
 */
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, sep } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const require = createRequire(join(ROOT, "packages", "core", "package.json"));
const { parseAst } = (await import(require.resolve("rolldown/parseAst"))) as {
  parseAst: (code: string, options: object, filename: string) => unknown;
};
const { datafyOperations } = (await import(
  join(ROOT, "packages", "core", "src", "codegen", "datafy.ts")
)) as typeof import("../packages/core/src/codegen/datafy.ts");
const DOC = /^[ \t]*\/\*\*(?![ \t]*[@#]__PURE__)[\s\S]*?\*\/[ \t]*$/gm;

const literals = (code: string, file: string): string => {
  const out: string[] = [];
  const visit = (node: any): void => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    if (node.type === "Literal" && typeof node.value === "string") out.push(node.value);
    if (node.type === "TemplateElement") out.push(node.value?.raw ?? "");
    for (const k in node)
      if (k !== "type" && node[k] && typeof node[k] === "object") visit(node[k]);
  };
  visit(parseAst(code, { sourceType: "module" }, file));
  return out.join("\u0000");
};

const walk = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".js")) out.push(p);
  }
  return out;
};

const pkgs = process.argv.slice(2).length
  ? process.argv.slice(2).map((p) => join(ROOT, p))
  : readdirSync(join(ROOT, "packages")).map((p) => join(ROOT, "packages", p));

let files = 0;
let before = 0;
let after = 0;
let skipped = 0;
let datafied = 0;
for (const pkg of pkgs) {
  const lib = join(pkg, "lib");
  if (!existsSync(lib)) continue;
  for (const file of walk(lib)) {
    if (file.startsWith(join(lib, "services") + sep)) {
      const code = readFileSync(file, "utf8");
      const r = datafyOperations(code, file);
      if (r.operations) {
        writeFileSync(file, r.code.replace(/^\/\/# sourceMappingURL=.*$/m, ""));
        rmSync(`${file}.map`, { force: true });
        datafied++;
      }
    }
    const code = readFileSync(file, "utf8");
    if (!code.includes("/**")) continue;
    const stripped = code.replace(DOC, (m) => "\n".repeat(m.split("\n").length - 1));
    if (stripped === code) continue;
    if (literals(stripped, file) !== literals(code, file)) {
      skipped++;
      continue;
    }
    writeFileSync(file, stripped);
    files++;
    before += code.length;
    after += stripped.length;
  }
}
console.log(
  `strip-lib-docs: ${files} files, ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB` +
    (skipped ? `, ${skipped} skipped (literal check)` : "") +
    `; ${datafied} service modules as data`,
);
