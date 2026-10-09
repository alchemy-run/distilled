#!/usr/bin/env -S node --conditions=bun
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const source = resolveSpecPath(root, "specs/spec-mirror-celld/specs");
const destination = path.join(root, ".generated-specs");
await fs.mkdir(destination, { recursive: true });
const files = (await fs.readdir(source)).filter((file) => file.endsWith(".json")).sort();
if (files.length === 0) throw new Error("No Celld Smithy specifications found");
for (const file of files) {
  const model = JSON.parse(await fs.readFile(path.join(source, file), "utf8"));
  if (model.smithy !== "2.0" || !model.shapes || typeof model.shapes !== "object") {
    throw new Error(`Invalid Celld Smithy specification: ${file}`);
  }
  await fs.writeFile(path.join(destination, file), `${JSON.stringify(model, null, 2)}\n`);
}
await finalizeConvert({ root });
