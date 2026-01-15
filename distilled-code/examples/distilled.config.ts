/**
 * Example distilled configuration
 *
 * Run with:
 *   bun run src/index.ts ./examples/distilled.config.ts
 *
 * Or in non-interactive mode:
 *   bun run src/index.ts ./examples/distilled.config.ts -p "Write tests for src/math.ts"
 *
 * List agents:
 *   bun run src/index.ts --list-agents ./examples/distilled.config.ts
 */
import * as Effect from "effect/Effect";
import { agent, defineConfig } from "../src/config.ts";

export default defineConfig({
  name: "example-project",

  // Default model
  model: "claude-sonnet",

  // Orchestrator system prompt
  orchestratorSystem: `You are an orchestrator managing a team of specialized AI agents.
Your job is to:
1. Understand the user's request
2. Delegate tasks to appropriate agents
3. Coordinate their work
4. Report results back to the user

Always use the delegate_task tool to send work to agents.`,

  // Agents as a flat list with paths and metadata
  agents: Effect.gen(function* () {
    return [
      // Test writing agents
      yield* agent("test/unit", {
        tags: ["test", "fast", "unit"],
        description: "Writes comprehensive unit tests using vitest",
      }),
      yield* agent("test/integration", {
        tags: ["test", "slow", "integration"],
        description: "Writes integration tests for component interactions",
      }),
      yield* agent("test/e2e", {
        tags: ["test", "slow", "e2e"],
        description: "Writes end-to-end tests for full workflows",
      }),

      // Code review agents
      yield* agent("review/code", {
        tags: ["review", "quality"],
        description: "Reviews code for bugs, logic errors, and improvements",
      }),
      yield* agent("review/security", {
        tags: ["review", "security"],
        description: "Reviews code for security vulnerabilities",
      }),
      yield* agent("review/performance", {
        tags: ["review", "performance"],
        description: "Reviews code for performance issues and optimizations",
      }),

      // Documentation agents
      yield* agent("docs/api", {
        tags: ["docs", "api"],
        description: "Writes API documentation and JSDoc comments",
      }),
      yield* agent("docs/readme", {
        tags: ["docs", "readme"],
        description: "Writes README files and guides",
      }),

      // Utility agents
      yield* agent("refactor", {
        tags: ["refactor", "quality"],
        description: "Refactors code to improve structure and maintainability",
      }),
    ];
  }),
});
