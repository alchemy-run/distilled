#!/usr/bin/env node
/**
 * Mirrors Namespace's public protobuf API (the Buf Schema Registry module
 * `buf.build/namespace/cloud`) into ../specs/proto/namespace/. The registry
 * has no raw per-file URL, so the module is exported with the `buf` CLI (run
 * through `pnpm dlx`, whose binary download is not a blocked install script);
 * `--exclude-imports` leaves out the `buf.build/namespace/bazel` dependency.
 */

import { spawnSync } from "child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { dirname, join, relative } from "path";

const MODULE = "buf.build/namespace/cloud";
const KEEP_PREFIX = "proto/namespace/";

const SPECS_DIR = "../specs";

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const isProto3 = (text: string): boolean => /syntax\s*=\s*"proto3"\s*;/.test(text);
const hasService = (text: string): boolean => /\bservice\s+\w+\s*\{/.test(text);

async function main() {
  const exportDir = mkdtempSync(join(tmpdir(), "buf-export-"));
  try {
    console.log(`Exporting ${MODULE}...`);
    const buf = spawnSync(
      "pnpm",
      ["dlx", "@bufbuild/buf", "export", MODULE, "--exclude-imports", "-o", exportDir],
      { stdio: "inherit" },
    );
    if (buf.error) throw buf.error;
    if (buf.status !== 0) throw new Error(`buf export exited with ${buf.status}`);

    const files = walk(exportDir)
      .map((file) => relative(exportDir, file))
      .filter((file) => file.startsWith(KEEP_PREFIX) && file.endsWith(".proto"))
      .sort();
    if (files.length === 0) {
      throw new Error(
        `${MODULE} exported no ${KEEP_PREFIX}*.proto files — refusing to empty the mirror`,
      );
    }

    const contents = new Map<string, string>();
    let services = 0;
    for (const file of files) {
      const text = readFileSync(join(exportDir, file), "utf-8");
      if (!isProto3(text)) {
        throw new Error(`${file} is not proto3 — the generator only converts proto3 files`);
      }
      if (hasService(text)) services++;
      contents.set(file, text.endsWith("\n") ? text : `${text}\n`);
    }
    if (services === 0) {
      throw new Error(
        `${MODULE} exported no service definitions — refusing to write a gutted module`,
      );
    }

    rmSync(join(SPECS_DIR, "proto"), { recursive: true, force: true });
    for (const [file, text] of contents) {
      const outputPath = join(SPECS_DIR, file);
      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, text);
    }
    console.log(
      `Wrote ${files.length} files (${services} with services) to ${SPECS_DIR}/${KEEP_PREFIX}`,
    );
  } finally {
    rmSync(exportDir, { recursive: true, force: true });
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
