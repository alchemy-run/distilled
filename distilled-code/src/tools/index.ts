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

// ============================================================================
// Coding Toolkit - Full toolkit with all tools
// ============================================================================

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

// ============================================================================
// Read-Only Toolkit - For analysis and review
// ============================================================================

export type ReadOnlyTools = typeof ReadOnlyTools;

/**
 * Read-only tools for analysis and review.
 * Includes glob, grep, read, readlints, and todo (read-only operations).
 *
 * Use this for reviewer agents that need to analyze code without modifying it.
 */
export const ReadOnlyTools = EffectToolkit.merge(
  globTooklit,
  grepTooklit,
  readTooklit,
  readLintsToolkit,
  todoToolkit,
);

// ============================================================================
// Planning Toolkit - Read/write files and todos, no bash
// ============================================================================

export type PlanningTools = typeof PlanningTools;

/**
 * Planning tools for design and documentation.
 * Includes read-only tools plus write and edit capabilities, but no bash.
 *
 * Use this for planner agents that need to read the codebase, write plans,
 * and manage todos without executing commands.
 */
export const PlanningTools = EffectToolkit.merge(
  ReadOnlyTools,
  writeTooklit,
  editTooklit,
);

// ============================================================================
// Tool Layer Options
// ============================================================================

/**
 * Options for creating tool layers.
 */
export interface ToolLayerOptions {
  /**
   * The agent key for state persistence (chat history, file tracking).
   */
  agentKey: string;

  /**
   * Todo scope for this agent. Defaults to agentKey.
   * Use a different scope to share todos between agents.
   */
  todoScope?: string;
}

// ============================================================================
// Layer factories
// ============================================================================

/**
 * Layer providing all coding tools.
 * @param agentKey - The agent key for state persistence (todos, file tracking)
 * @param options - Optional configuration (use ToolLayerOptions for advanced options)
 */
export function CodingToolsLayer(keyOrOptions: string | ToolLayerOptions) {
  const options =
    typeof keyOrOptions === "string"
      ? { agentKey: keyOrOptions }
      : keyOrOptions;
  const { agentKey, todoScope = agentKey } = options;

  return Layer.mergeAll(
    bashTooklitLayer,
    readLintsToolkitLayer,
    editTooklitLayer(agentKey),
    globTooklitLayer,
    grepTooklitLayer,
    readTooklitLayer,
    todoToolkitLayer(todoScope),
    defaultTaskToolkitLayer,
    writeTooklitLayer(agentKey),
  );
}

/**
 * Layer providing read-only tools.
 * @param agentKey - The agent key for state persistence
 * @param options - Optional configuration
 */
export function ReadOnlyToolsLayer(keyOrOptions: string | ToolLayerOptions) {
  const options =
    typeof keyOrOptions === "string"
      ? { agentKey: keyOrOptions }
      : keyOrOptions;
  const { todoScope = options.agentKey } = options;

  return Layer.mergeAll(
    globTooklitLayer,
    grepTooklitLayer,
    readTooklitLayer,
    readLintsToolkitLayer,
    todoToolkitLayer(todoScope),
  );
}

/**
 * Layer providing planning tools (read/write, no bash).
 * @param agentKey - The agent key for state persistence
 * @param options - Optional configuration
 */
export function PlanningToolsLayer(keyOrOptions: string | ToolLayerOptions) {
  const options =
    typeof keyOrOptions === "string"
      ? { agentKey: keyOrOptions }
      : keyOrOptions;
  const { agentKey, todoScope = agentKey } = options;

  return Layer.mergeAll(
    globTooklitLayer,
    grepTooklitLayer,
    readTooklitLayer,
    readLintsToolkitLayer,
    todoToolkitLayer(todoScope),
    writeTooklitLayer(agentKey),
    editTooklitLayer(agentKey),
  );
}

// ============================================================================
// Pre-built Toolkit export
// ============================================================================

/**
 * Pre-built toolkits for common use cases.
 *
 * @example
 * ```ts
 * import { agent, Toolkit } from "distilled-code";
 *
 * // Full coding toolkit
 * agent("feature/implement", { toolkit: Toolkit.Coding });
 *
 * // Planning only (no bash)
 * agent("planner", { toolkit: Toolkit.Planning });
 *
 * // Read-only for reviewers
 * agent("reviewer", { toolkit: Toolkit.ReadOnly });
 * ```
 */
export const Toolkit = {
  /**
   * Full coding toolkit including all tools (bash, edit, write, etc.).
   */
  Coding: CodingTools,

  /**
   * Planning toolkit: read/write files and todos, but no bash.
   * Good for planner agents that design implementations.
   */
  Planning: PlanningTools,

  /**
   * Read-only toolkit for analysis and review.
   * Good for reviewer agents that verify implementations.
   */
  ReadOnly: ReadOnlyTools,
} as const;
