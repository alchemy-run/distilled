import { Toolkit as EffectToolkit } from "@effect/ai";
import * as Layer from "effect/Layer";
import { bashTooklit, bashTooklitLayer } from "./bash.ts";
import { editTooklit, editTooklitLayer } from "./edit.ts";
import { globTooklit, globTooklitLayer } from "./glob.ts";
import { grepTooklit, grepTooklitLayer } from "./grep.ts";
import { readTooklit, readTooklitLayer } from "./read.ts";
import { spawnToolkit, spawnToolkitLayer } from "./spawn.ts";
import { writeTooklit, writeTooklitLayer } from "./write.ts";

export {
  ToolValidationError,
  SecurityViolationError,
  ToolError,
} from "./errors.ts";

export type CodingTools = typeof CodingTools;

export const CodingTools = EffectToolkit.merge(
  EffectToolkit.merge(
    EffectToolkit.merge(editTooklit, globTooklit),
    EffectToolkit.merge(grepTooklit, readTooklit),
  ),
  EffectToolkit.merge(
    EffectToolkit.merge(writeTooklit, spawnToolkit),
    bashTooklit,
  ),
);

export const CodingToolsLayer = Layer.mergeAll(
  bashTooklitLayer,
  editTooklitLayer,
  globTooklitLayer,
  grepTooklitLayer,
  readTooklitLayer,
  writeTooklitLayer,
  spawnToolkitLayer,
);

/**
 * Pre-built toolkits for common use cases.
 */
export const Toolkit = {
  /**
   * Coding toolkit with bash, edit, glob, grep, read, spawn, and write tools.
   */
  Coding: CodingTools,
} as const;
