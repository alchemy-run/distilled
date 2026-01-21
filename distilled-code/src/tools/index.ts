import { Toolkit as EffectToolkit } from "@effect/ai";
import * as Layer from "effect/Layer";
import { bashTooklit, bashTooklitLayer } from "./bash.ts";
import { editTooklit, editTooklitLayer } from "./edit.ts";
import { globTooklit, globTooklitLayer } from "./glob.ts";
import { grepTooklit, grepTooklitLayer } from "./grep.ts";
import { readTooklit, readTooklitLayer } from "./read.ts";
import { readLintsToolkit, readLintsToolkitLayer } from "./readlints.ts";
import { defaultTaskToolkitLayer, taskToolkit } from "./task.ts";
import { todoToolkit, todoToolkitLayer } from "./todo.ts";
import { writeTooklit, writeTooklitLayer } from "./write.ts";

export {
  SecurityViolationError,
  ToolError,
  ToolValidationError,
} from "./errors.ts";

export type CodingTools = typeof CodingTools;

/**
 * All coding tools including bash, diagnostics, edit, glob, grep, read, write, spawn, task, and todo.
 */
export const CodingTools = EffectToolkit.merge(
  bashTooklit,
  readLintsToolkit,
  editTooklit,
  globTooklit,
  grepTooklit,
  readTooklit,
  writeTooklit,
  todoToolkit,
  taskToolkit,
);

/**
 * Layer providing all coding tools.
 * @param agentKey - The agent key for state persistence (todos, file tracking)
 */
export const CodingToolsLayer = (agentKey: string) =>
  Layer.mergeAll(
    bashTooklitLayer,
    readLintsToolkitLayer,
    editTooklitLayer(agentKey),
    globTooklitLayer,
    grepTooklitLayer,
    readTooklitLayer,
    todoToolkitLayer(agentKey),
    defaultTaskToolkitLayer,
    writeTooklitLayer(agentKey),
  );

/**
 * Pre-built toolkits for common use cases.
 */
export const Toolkit = {
  /**
   * Full coding toolkit including all tools.
   */
  Coding: CodingTools,
} as const;
