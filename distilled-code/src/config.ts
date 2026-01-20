/**
 * Configuration types and helpers for distilled-code
 */

import type { Effect } from "effect";
import type { AgentDefinition } from "./agent.ts";

export { agent } from "./agent.ts";
export type { AgentDefinition, AgentMetadata } from "./agent.ts";

export interface DistilledConfig {
  /**
   * Name of this project/workspace
   */
  name?: string;

  /**
   * List of agent definitions, or an Effect that resolves to them.
   */
  agents?: AgentDefinition<any>[] | Effect.Effect<AgentDefinition<any>[]>;

  /**
   * Default model to use
   */
  model?: string;
}

/**
 * Define a distilled configuration.
 */
export const defineConfig = (config: DistilledConfig): DistilledConfig =>
  config;

/**
 * Load a configuration file.
 */
export const loadConfig = async (
  configPath: string,
): Promise<DistilledConfig> => {
  const configModule = await import(configPath);
  return configModule.default as DistilledConfig;
};

/**
 * Filter agents by tag.
 */
export const byTag = (
  agents: AgentDefinition[],
  tag: string,
): AgentDefinition[] => agents.filter((a) => a.metadata?.tags?.includes(tag));

/**
 * Filter agents by key prefix.
 */
export const byPrefix = (
  agents: AgentDefinition[],
  prefix: string,
): AgentDefinition[] => agents.filter((a) => a.key.startsWith(prefix));
