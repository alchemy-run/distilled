import { Toolkit } from "@effect/ai";
import * as Layer from "effect/Layer";
import { editTooklit, editTooklitLayer } from "./edit.ts";
import { globTooklit, globTooklitLayer } from "./glob.ts";
import { grepTooklit, grepTooklitLayer } from "./grep.ts";
import { readTooklit, readTooklitLayer } from "./read.ts";
import { spawnToolkit, spawnToolkitLayer } from "./spawn.ts";
import { writeTooklit, writeTooklitLayer } from "./write.ts";

export type CodingTools = typeof CodingTools;

export const CodingTools = Toolkit.merge(
  editTooklit,
  globTooklit,
  grepTooklit,
  readTooklit,
  writeTooklit,
  spawnToolkit,
  // bashTooklit,
);

export const CodingToolsLayer = Layer.mergeAll(
  editTooklitLayer,
  globTooklitLayer,
  grepTooklitLayer,
  readTooklitLayer,
  writeTooklitLayer,
  spawnToolkitLayer,
  // bashTooklitLayer,
);
