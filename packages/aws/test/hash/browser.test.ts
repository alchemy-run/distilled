import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { crc32 } from "node:zlib";
import { rolldown } from "rolldown";
import { describe, expect, test } from "vitest";
import { getCrc32ChecksumAlgorithmFunction } from "../../src/hash/crc32.browser.ts";
import { getMd5ChecksumAlgorithmFunction } from "../../src/hash/md5.browser.ts";
import { toUint8Array } from "../../src/hash/utf8.browser.ts";

const pkg = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Feed `data` in chunks cut at `cuts`, then digest. */
const digest = async (
  Hash: new () => { update(d: Uint8Array): void; digest(): Promise<Uint8Array> },
  data: Uint8Array,
  cuts: number[],
) => {
  const hash = new Hash();
  let at = 0;
  for (const cut of [...cuts, data.length]) {
    hash.update(data.subarray(at, cut));
    at = cut;
  }
  return Buffer.from(await hash.digest()).toString("hex");
};

describe("browser hash variants match Node", () => {
  const sizes = [0, 1, 55, 56, 63, 64, 65, 119, 120, 127, 128, 1000, 1 << 20];

  test("md5", async () => {
    const Md5 = getMd5ChecksumAlgorithmFunction();
    expect(await digest(Md5, toUint8Array("abc"), [])).toBe("900150983cd24fb0d6963f7d28e17f72");
    for (const size of sizes) {
      const data = randomBytes(size);
      const expected = createHash("md5").update(data).digest("hex");
      expect(await digest(Md5, data, [])).toBe(expected);
      expect(await digest(Md5, data, [Math.floor(size / 3), Math.floor(size / 2)])).toBe(expected);
    }
  });

  test("crc32", async () => {
    const Crc32 = getCrc32ChecksumAlgorithmFunction();
    for (const size of sizes) {
      const data = randomBytes(size);
      const expected = crc32(data).toString(16).padStart(8, "0");
      expect(await digest(Crc32, data, [Math.floor(size / 2)])).toBe(expected);
    }
  });

  test("utf8", () => {
    for (const s of ["", "plain", "ünïcødé ✓ 🙂", "lone \ud800 surrogate"]) {
      expect(Buffer.from(toUint8Array(s))).toEqual(Buffer.from(s, "utf-8"));
    }
  });
});

test("the browser entry bundles with no Node built-ins or Buffer", async () => {
  const imports: Record<string, Record<string, string>> = JSON.parse(
    readFileSync(join(pkg, "package.json"), "utf8"),
  ).imports;
  const nodeImports: string[] = [];
  const bundle = await rolldown({
    input: join(pkg, "src/index.browser.ts"),
    platform: "browser",
    logLevel: "silent",
    external: (id) => (id.startsWith("node:") ? (nodeImports.push(id), true) : false),
    plugins: [
      {
        // `#md5` etc. as a browser bundler resolves them, on the sources.
        name: "browser-imports",
        resolveId: (id) =>
          imports[id]
            ? join(pkg, imports[id]!.browser!.replace("./lib/", "src/").replace(/\.js$/, ".ts"))
            : null,
      },
    ],
  });
  const { output } = await bundle.generate({ format: "esm" });
  const code = output.map((c) => (c.type === "chunk" ? c.code : "")).join("\n");
  expect(nodeImports).toEqual([]);
  expect(code.match(/\bBuffer\.\w+/g) ?? []).toEqual([]);
}, 60_000);
