/**
 * Configuration types and helpers for distilled-code
 */

import * as Effect from "effect/Effect";
import type { Agent } from "./agent.ts";

// =============================================================================
// Agent Metadata
// =============================================================================

export interface AgentMetadata {
  /**
   * Tags for filtering/searching agents
   */
  tags?: string[];

  /**
   * Description of what this agent does
   */
  description?: string;

  /**
   * System prompt for this agent
   */
  system?: string;
}

/**
 * An agent with its path and metadata.
 */
export interface ConfiguredAgent {
  /**
   * The agent instance
   */
  agent: Agent;

  /**
   * Path for organizing agents (e.g., "test/unit", "review/security")
   */
  path: string;

  /**
   * Optional metadata
   */
  metadata?: AgentMetadata;
}

// =============================================================================
// Main Configuration
// =============================================================================

export interface DistilledConfig {
  /**
   * Name of this project/workspace
   */
  name?: string;

  /**
   * Effect that returns a list of configured agents.
   *
   * @example
   * ```ts
   * agents: Effect.gen(function* () {
   *   return [
   *     yield* agent("test/unit", { tags: ["test", "fast"] }),
   *     yield* agent("test/integration", { tags: ["test", "slow"] }),
   *     yield* agent("review/code", { tags: ["review"] }),
   *   ];
   * }),
   * ```
   */
  agents?: Effect.Effect<ConfiguredAgent[], any, any>;

  /**
   * System prompt for the orchestrator
   */
  orchestratorSystem?: string;

  /**
   * Default model to use
   * @default "claude-sonnet"
   */
  model?: string;

  /**
   * Directory to store session data
   * @default ".distilled"
   */
  sessionDir?: string;
}

// =============================================================================
// Agent Builder
// =============================================================================

import { spawn } from "./agent.ts";

/**
 * Create a configured agent with path and optional metadata.
 *
 * @example
 * ```ts
 * const testAgent = yield* agent("test/unit", {
 *   tags: ["test", "fast"],
 *   description: "Writes unit tests",
 * });
 * ```
 */
export const agent = (
  path: string,
  metadata?: AgentMetadata,
): Effect.Effect<ConfiguredAgent, any, any> =>
  Effect.gen(function* () {
    const agentInstance = yield* spawn(path);
    return {
      agent: agentInstance,
      path,
      metadata,
    };
  });

// =============================================================================
// Filter Helpers
// =============================================================================

/**
 * Filter agents by tag.
 */
export function filterByTag(
  agents: ConfiguredAgent[],
  tag: string,
): ConfiguredAgent[] {
  return agents.filter((a) => a.metadata?.tags?.includes(tag));
}

/**
 * Filter agents by path prefix.
 */
export function filterByPath(
  agents: ConfiguredAgent[],
  prefix: string,
): ConfiguredAgent[] {
  return agents.filter((a) => a.path.startsWith(prefix));
}

/**
 * Find an agent by exact path.
 */
export function findByPath(
  agents: ConfiguredAgent[],
  path: string,
): ConfiguredAgent | undefined {
  return agents.find((a) => a.path === path);
}

// =============================================================================
// Config Helper
// =============================================================================

/**
 * Define a distilled-code configuration.
 *
 * @example
 * ```ts
 * // distilled.config.ts
 * import { defineConfig, agent } from "distilled-code";
 * import * as Effect from "effect/Effect";
 *
 * export default defineConfig({
 *   name: "my-project",
 *
 *   agents: Effect.gen(function* () {
 *     return [
 *       yield* agent("test/unit", {
 *         tags: ["test", "fast"],
 *         description: "Writes unit tests using vitest",
 *       }),
 *       yield* agent("test/e2e", {
 *         tags: ["test", "slow"],
 *         description: "Writes end-to-end tests",
 *       }),
 *       yield* agent("review/code", {
 *         tags: ["review", "quality"],
 *         description: "Reviews code for bugs and improvements",
 *       }),
 *       yield* agent("docs", {
 *         tags: ["documentation"],
 *         description: "Writes documentation",
 *       }),
 *     ];
 *   }),
 * });
 * ```
 */
export function defineConfig(config: DistilledConfig): DistilledConfig {
  return config;
}

// =============================================================================
// Config Loading
// =============================================================================

/**
 * Load configuration from a file path.
 * Supports .ts files via bun's native TypeScript support.
 */
export async function loadConfig(configPath: string): Promise<DistilledConfig> {
  const absolutePath = configPath.startsWith("/")
    ? configPath
    : `${process.cwd()}/${configPath}`;

  const module = await import(absolutePath);
  const config = module.default as DistilledConfig;

  if (!config) {
    throw new Error(
      `Config file "${configPath}" must have a default export. Use defineConfig({...})`,
    );
  }

  return config;
}

// =============================================================================
// Re-exports for config files
// =============================================================================

export { Effect } from "effect";
