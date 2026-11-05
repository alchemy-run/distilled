/**
 * Where convert's Smithy models go (dev-time only).
 *
 * `generate` runs its package's convert in-process through
 * {@link collectModels}: every model convert writes lands in memory and is
 * compiled straight into `src/services`, so the converted models are never
 * written to disk or committed. Run `convert` on its own (`pnpm convert`)
 * and the same writes go to disk, under the gitignored `.generated-specs`,
 * for a patch author to read and for `pnpm patches:audit`'s scratch copies.
 *
 * Every convert reads and writes its models through these functions rather
 * than `node:fs`, so one convert serves both.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import * as path from "node:path";

/** A model as convert writes it: two-space JSON with a trailing newline. */
export const modelText = (model: unknown): string => `${JSON.stringify(model, null, 2)}\n`;

/** The models of the {@link collectModels} in progress, by absolute path. */
let memory: Map<string, string> | undefined;

/**
 * Set once a {@link collectModels} has returned. A model written after
 * that is a convert step nobody awaited (a floating `main()`), and would
 * otherwise land on disk while generate compiles an incomplete set.
 */
let collected = false;

const toDisk = (abs: string): void => {
  if (collected) {
    throw new Error(
      `${abs}: convert wrote a model after generate stopped collecting — await every step of convert at the top level`,
    );
  }
};

/** Write `text` as the model file `file`. */
export const writeModelText = (file: string, text: string): void => {
  const abs = path.resolve(file);
  if (memory) {
    memory.set(abs, text);
    return;
  }
  toDisk(abs);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, text);
};

/** Write `model` as the model file `file`. */
export const writeModel = (file: string, model: unknown): void =>
  writeModelText(file, modelText(model));

/** The text of a model file this convert wrote. */
export const readModelText = (file: string): string => {
  const abs = path.resolve(file);
  if (!memory) return readFileSync(abs, "utf8");
  const text = memory.get(abs);
  if (text === undefined) throw new Error(`${abs}: convert wrote no model here`);
  return text;
};

/** A model file this convert wrote, parsed. */
export const readModel = (file: string): any => JSON.parse(readModelText(file));

/** Whether convert wrote the model file `file`. */
export const modelExists = (file: string): boolean => {
  const abs = path.resolve(file);
  return memory ? memory.has(abs) : existsSync(abs);
};

const under = (dir: string, file: string): boolean => file.startsWith(dir + path.sep);

/** Every `*.json` model file under `dir`, recursively, sorted. */
export const listModels = (dir: string): string[] => {
  const abs = path.resolve(dir);
  if (memory) {
    return [...memory.keys()]
      .filter((f) => under(abs, f) && f.endsWith(".json"))
      .sort((a, b) => a.localeCompare(b));
  }
  const walk = (d: string): string[] =>
    readdirSync(d, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(d, e.name);
      return e.isDirectory() ? walk(p) : e.name.endsWith(".json") ? [p] : [];
    });
  return existsSync(abs) ? walk(abs).sort((a, b) => a.localeCompare(b)) : [];
};

/** Remove the model file `file` (a model convert decided to drop). */
export const removeModel = (file: string): void => {
  const abs = path.resolve(file);
  if (memory) {
    memory.delete(abs);
    return;
  }
  toDisk(abs);
  rmSync(abs, { force: true });
};

/** Remove every model file under `dir` (a fresh convert's first step). */
export const clearModels = (dir: string): void => {
  const abs = path.resolve(dir);
  if (memory) {
    for (const f of memory.keys()) if (under(abs, f)) memory.delete(f);
    return;
  }
  toDisk(abs);
  rmSync(abs, { recursive: true, force: true });
};

/**
 * Run `convert` with its model writes kept in memory, and return them as
 * model text by absolute path. Nothing is written to disk.
 */
export const collectModels = async (
  convert: () => unknown,
): Promise<ReadonlyMap<string, string>> => {
  if (memory) throw new Error("collectModels: a convert is already being collected");
  const models = new Map<string, string>();
  memory = models;
  try {
    await convert();
  } finally {
    memory = undefined;
    collected = true;
  }
  return models;
};
