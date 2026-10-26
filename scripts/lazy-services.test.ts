import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { rolldown } from "rolldown";
import { afterAll, describe, expect, it } from "vitest";
import { lazyExports, lazyServices, stubTargets } from "./lazy-services.ts";

// Lazy service modules read files and load with `require(esm)` / `new
// Function`, which vitest's module runner does not provide: run the
// fixtures in Node itself.
const core = (m: string) =>
  pathToFileURL(join(import.meta.dirname, "..", "packages", "core", "src", m)).href;
const api = core("api.ts");
const dir = mkdtempSync(join(tmpdir(), "distilled-lazy-"));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const run = (script: string, flags: string[] = []): any => {
  const file = join(dir, `run-${Math.random().toString(36).slice(2)}.mjs`);
  writeFileSync(file, script);
  const r = spawnSync(process.execPath, ["--no-warnings", ...flags, file], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(r.stderr);
  return JSON.parse(r.stdout);
};

const CORE = "@distilled.cloud/core/_bundle/base";

// A package as bundle-lib writes it: an SDK group chunk re-exporting core,
// and a minified service chunk. lazy-services.ts turns it into a stub, the
// full module and its slice index; the core specifier is then pointed at
// api.ts (in the stub, and in the group chunk; the full module's offsets
// must not move, so its own core import is never rewritten).
const pkg = join(dir, "pkg");
mkdirSync(join(pkg, "lib", "_bundle"), { recursive: true });
mkdirSync(join(pkg, "lib", "services"), { recursive: true });
writeFileSync(
  join(pkg, "package.json"),
  JSON.stringify({
    name: "@fixture/pkg",
    type: "module",
    exports: {
      ".": { default: "./lib/index.js" },
      "./thing-explicit": { default: "./lib/services/thing.js" },
      "./*": { default: "./lib/services/*.js" },
    },
  }),
);
// A barrel an export names: it keeps the full modules and gets a lazy twin.
const barrel = `export * as Thing from "./services/thing.js";\n`;
writeFileSync(join(pkg, "lib", "index.js"), barrel);
writeFileSync(
  join(pkg, "lib", "_bundle", "sdk.js"),
  `import{api$op as a,api$opPaginated as b,api$error as c,api$newError as d,api$D as e,api$call as f}from"${CORE}";export{a as A,b as B,c as C,d as N,e as Dd,f as Cl};`,
);
writeFileSync(
  join(pkg, "lib", "services", "thing.js"),
  [
    `import{A as i,B as p,C as c,N as n,Dd as y,Cl as s}from"../_bundle/sdk.js";`,
    `const Base=class extends Error{constructor(t){super("oops");this._tag="Oops";Object.assign(this,t)}};`,
    // Never read by the operations below: must never be evaluated.
    `const Never=(globalThis.never=1);`,
    `const Oops=/*@__PURE__*/c(function Oops(t){return n(t,new.target,["$1",[null,Base]])});`,
    `const Other=/*@__PURE__*/c(function Other(t){return n(t,new.target,["$1",[null,Never]])});`,
    // Holders that read each other: a cycle.
    `function __d0(){return[__d1,"zero"]}`,
    `function __d1(){return[__d0,"one"]}`,
    `const getThing=/*@__PURE__*/i(t=>t===y?['{input:$1,output:$1,errors:[$2],operationName:"GetThing"}',[null,{ast:__d0()[1]},Oops]]:s(getThing,t));`,
    `const listThings=/*@__PURE__*/p(t=>t===y?['{input:$1,output:$1,operationName:"ListThings"}',[null,{ast:__d1()[1]}]]:s(listThings,t));`,
    `const unused=/*@__PURE__*/i(t=>t===y?['{input:$1,output:$1,errors:[$2],operationName:"Unused"}',[null,{ast:1},Other]]:s(unused,t));`,
    // The generated shape: data as a template literal, refs as names.
    `function __d2(){return[\`$1\`,[s,__d0]]}`,
    `const dataOp=/*@__PURE__*/i(t=>t===y?[\`{input:$1,output:$1,errors:[$2],operationName:"DataOp",holder:$3}\`,[s,Base,Oops,__d2]]:s(dataOp,t));`,
    // A spec alias (`export const fetchThing = getThing;`), minified.
    `const g=getThing;`,
    `export{Oops,Other,getThing,listThings,unused as "delete",dataOp,g as fetchThing};`,
    "",
  ].join(""),
);
const result = lazyServices(pkg, ["services"], 0);
// The exports `--exports` writes for this layout.
const pkgJsonFile = join(pkg, "package.json");
const pkgJson = JSON.parse(readFileSync(pkgJsonFile, "utf8"));
const exportsBefore = pkgJson.exports;
pkgJson.exports = lazyExports(pkgJson.exports, result.dirs, result.twins);
writeFileSync(pkgJsonFile, JSON.stringify(pkgJson));
// Installed, for code outside the package.
mkdirSync(join(dir, "node_modules", "@fixture"), { recursive: true });
symlinkSync(pkg, join(dir, "node_modules", "@fixture", "pkg"), "dir");
// Core's bundle names its exports `api$<name>`.
const coreFile = join(dir, "core.mjs");
writeFileSync(
  coreFile,
  `export { op as api$op, opPaginated as api$opPaginated, error as api$error, newError as api$newError, D as api$D, call as api$call, lazyService as api$lazyService } from ${JSON.stringify(api)};\n`,
);
const point = (file: string) =>
  writeFileSync(
    file,
    readFileSync(file, "utf8").replaceAll(
      `"${CORE}"`,
      JSON.stringify(pathToFileURL(coreFile).href),
    ),
  );
point(join(pkg, "lib", "_bundle", "sdk.js"));
point(join(pkg, "lib", "_bundle", "lazy.js"));
const stub = join(pkg, "lib", "services.lazy", "thing.js");
const full = join(pkg, "lib", "services", "thing.js");
// The full module, for the whole-module fallback: its core import pointed at api.ts.
writeFileSync(join(pkg, "lib", "services", "whole.js"), readFileSync(full, "utf8"));
writeFileSync(
  join(pkg, "lib", "services.lazy", "whole.js"),
  readFileSync(stub, "utf8")
    .replace("../services/thing.js", "../services/whole.js")
    .replace(/,\d+,\d+\)/, ")"),
);

describe("lazy service modules", () => {
  it("bundle-lib output: a stub, the unchanged full module and its slice index", () => {
    expect(result.stubs).toBe(1);
    const s = readFileSync(stub, "utf8");
    const at = /\$L\("\.\.\/services\/thing\.js","opoo",(\d+),(\d+)\)/.exec(s);
    expect(at).not.toBeNull();
    // One helper import; each export name written once.
    expect(s.startsWith(`import{$L}from"../_bundle/lazy.js";`)).toBe(true);
    expect(s).toContain(
      `export const{Oops,Other}=$E;\nexport const getThing=$o(),listThings=$o();\nconst _0=$o();\nexport const dataOp=$o();\nexport{getThing as fetchThing,_0 as "delete"};`,
    );
    expect(readFileSync(join(pkg, "lib", "_bundle", "lazy.js"), "utf8")).toContain(
      `import*as $0 from"./sdk.js";`,
    );
    // Operations first, then error classes, then the rest.
    const index = readFileSync(full)
      .subarray(+at![1]!, +at![1]! + +at![2]!)
      .toString("latin1");
    expect(
      index
        .split("\n")
        .slice(3)
        .map((l) => l.split("|")[0]!.split(" ")[3]),
    ).toEqual([
      "getThing",
      "listThings",
      "unused",
      "dataOp",
      "Oops",
      "Other",
      "Base",
      "Never",
      "__d0",
      "__d1",
      "__d2",
      "g",
    ]);
    // Data functions in their generated shape are indexed as data.
    expect(index.split("\n").filter((l) => l.includes("|=")).length).toBe(2);
  });

  it("evaluate only the declarations an operation reaches", () => {
    const r = run(`
      const s = await import(${JSON.stringify(pathToFileURL(stub).href)});
      const keys = Object.keys(s);
      const untouchedName = s.Other.name;
      const name = s.getThing.operationName;
      const e = new s.Oops({ code: 1 });
      console.log(JSON.stringify({
        keys, name, untouchedName, never: globalThis.never ?? 0,
        errorsAreStubs: s.getThing.errors[0] === s.Oops,
        instance: e instanceof s.Oops, tag: e._tag, code: e.code, className: s.Oops.name,
        ast: s.getThing.input.ast, listAst: s.listThings.input.ast,
        pages: typeof s.listThings.pages, plainPages: "pages" in s.getThing,
        unusedName: s.delete.operationName,
        alias: s.fetchThing === s.getThing,
        dataOp: [s.dataOp.operationName, s.dataOp.errors[0] === s.Oops, typeof s.dataOp.input],
        otherNeverYet: globalThis.never ?? 0,
      }));
    `);
    expect(r).toEqual({
      keys: ["Oops", "Other", "dataOp", "delete", "fetchThing", "getThing", "listThings"],
      name: "GetThing",
      untouchedName: "Other",
      never: 0,
      errorsAreStubs: true,
      instance: true,
      tag: "Oops",
      code: 1,
      className: "Oops",
      ast: "zero",
      listAst: "one",
      pages: "function",
      plainPages: false,
      unusedName: "Unused",
      alias: true,
      dataOp: ["DataOp", true, "function"],
      otherNeverYet: 0,
    });
  });

  it("one set of objects through the package specifier and the stub", () => {
    const r = run(
      `
      const s = await import(${JSON.stringify(pathToFileURL(stub).href)});
      const { createRequire } = await import("node:module");
      const viaPkg = createRequire(${JSON.stringify(pkgJsonFile)})("@fixture/pkg/thing");
      console.log(JSON.stringify({ same: viaPkg.getThing === s.getThing && viaPkg.Oops === s.Oops }));
    `,
      ["--conditions=distilled-lazy"],
    );
    expect(r).toEqual({ same: true });
  });

  it("exports: the stubs only under distilled-lazy, explicit subpaths included", () => {
    expect(result.twins).toEqual(["index.js"]);
    expect(readFileSync(join(pkg, "lib", "index.js"), "utf8")).toBe(barrel);
    expect(readFileSync(join(pkg, "lib", "index.lazy.js"), "utf8")).toBe(
      `export * as Thing from "./services.lazy/thing.js";\n`,
    );
    expect(pkgJson.exports).toEqual({
      ".": { "distilled-lazy": "./lib/index.lazy.js", default: "./lib/index.js" },
      "./thing-explicit": {
        "distilled-lazy": "./lib/services.lazy/thing.js",
        default: "./lib/services/thing.js",
      },
      "./*": { "distilled-lazy": "./lib/services.lazy/*.js", default: "./lib/services/*.js" },
    });
    // Idempotent; `default` keeps the targets it had.
    expect(lazyExports(pkgJson.exports, result.dirs, result.twins)).toEqual(pkgJson.exports);
    expect(stubTargets(pkgJson.exports, result.dirs, result.twins)).toEqual([]);
    expect(stubTargets(exportsBefore, result.dirs, result.twins)).toEqual([]);
    expect(
      stubTargets(
        {
          "./x": "./lib/services.lazy/thing.js",
          "./y": { default: "./lib/services.lazy/*.js" },
          "./z": { node: "./lib/index.lazy.js" },
        },
        result.dirs,
        result.twins,
      ),
    ).toEqual(["./x", "./y", "./z"]);
  });

  it("Node resolves the full module unless the process opts in", () => {
    const script = `
      const { createRequire } = await import("node:module");
      const req = createRequire(${JSON.stringify(pkgJsonFile)});
      const rel = (p) => p.slice(${JSON.stringify(join(pkg, "lib") + "/")}.length);
      console.log(JSON.stringify({
        import: rel(new URL(import.meta.resolve("@fixture/pkg/thing")).pathname),
        explicit: rel(req.resolve("@fixture/pkg/thing-explicit")),
        require: rel(req.resolve("@fixture/pkg/thing")),
      }));
    `;
    expect(run(script)).toEqual({
      import: "services/thing.js",
      explicit: "services/thing.js",
      require: "services/thing.js",
    });
    expect(run(script, ["--conditions=distilled-lazy"])).toEqual({
      import: "services.lazy/thing.js",
      explicit: "services.lazy/thing.js",
      require: "services.lazy/thing.js",
    });
  });

  it("a bundler never reaches a stub", async () => {
    const entry = join(dir, "entry.mjs");
    writeFileSync(
      entry,
      `import { getThing } from "@fixture/pkg/thing";\nimport { dataOp } from "@fixture/pkg/thing-explicit";\nconsole.log(getThing, dataOp);\n`,
    );
    // Rolldown's defaults, and Alchemy's node bundles.
    for (const resolve of [undefined, { conditionNames: ["node", "module", "default"] }]) {
      const bundle = await rolldown({
        input: entry,
        cwd: dir,
        platform: "node",
        resolve,
        external: (id: string) => id.startsWith("file:") || id.startsWith("@distilled.cloud/"),
        logLevel: "silent",
      });
      const { output } = await bundle.generate({ format: "esm" });
      const ids = output.flatMap((c) => (c.type === "chunk" ? (c.moduleIds ?? []) : []));
      expect(ids.filter((id) => id.startsWith(pkg)).map((id) => id.slice(pkg.length))).toEqual([
        "/lib/_bundle/sdk.js",
        "/lib/services/thing.js",
      ]);
      await bundle.close();
    }
  });

  it("an error class constructed first evaluates its own slice", () => {
    const r = run(`
      const s = await import(${JSON.stringify(pathToFileURL(stub).href)});
      const e = new s.Oops({});
      console.log(JSON.stringify({ instance: e instanceof s.Oops, tag: e._tag, never: globalThis.never ?? 0 }));
    `);
    expect(r).toEqual({ instance: true, tag: "Oops", never: 0 });
  });

  it("without a slice index the whole module loads and adopts the placeholders", () => {
    const r = run(`
      const s = await import(${JSON.stringify(pathToFileURL(join(pkg, "lib", "services.lazy", "whole.js")).href)});
      const name = s.getThing.operationName;
      const f = await import(${JSON.stringify(pathToFileURL(join(pkg, "lib", "services", "whole.js")).href)});
      const e = new s.Oops({});
      console.log(JSON.stringify({
        name, never: globalThis.never ?? 0, sameOp: f.getThing === s.getThing,
        sameError: f.Oops === s.Oops, instance: e instanceof f.Oops,
      }));
    `);
    expect(r).toEqual({
      name: "GetThing",
      never: 1,
      sameOp: true,
      sameError: true,
      instance: true,
    });
  });

  it("a lazy namespace loads its module on first access", () => {
    writeFileSync(
      join(dir, "barrel.mjs"),
      `import { lazyNamespace as $N } from ${JSON.stringify(api)};\nexport const A = $N(import.meta.url, "./pkg/lib/services.lazy/thing.js");\n`,
    );
    const r = run(`
      const b = await import("./barrel.mjs");
      const keys = Object.keys(b.A);
      const s = await import(${JSON.stringify(pathToFileURL(stub).href)});
      console.log(JSON.stringify({
        keys, same: b.A.getThing === s.getThing, has: "Oops" in b.A,
        spread: Object.keys({ ...b.A }), name: b.A.getThing.operationName,
      }));
    `);
    expect(r).toEqual({
      keys: ["Oops", "Other", "dataOp", "delete", "fetchThing", "getThing", "listThings"],
      same: true,
      has: true,
      spread: ["Oops", "Other", "dataOp", "delete", "fetchThing", "getThing", "listThings"],
      name: "GetThing",
    });
  });
});
