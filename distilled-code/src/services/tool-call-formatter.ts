import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

/**
 * Optional service for customizing tool call formatting.
 * If not provided, agent uses built-in formatters.
 * If format() returns undefined, falls back to built-in.
 */
export interface ToolCallFormatter {
  /**
   * Format a tool call. Return undefined to use built-in default.
   */
  format(name: string, params: unknown): string | undefined;
}

export const ToolCallFormatter =
  Context.GenericTag<ToolCallFormatter>("ToolCallFormatter");

/**
 * Create a ToolCallFormatter layer from a format function.
 * Return undefined from your switch default case for tools you don't handle.
 *
 * @example
 * ```typescript
 * const CustomFormatter = makeToolCallFormatterLayer((name, params) => {
 *   const p = params as Record<string, unknown>;
 *   switch (name) {
 *     case "myCustomTool":
 *       return `custom: ${p.action} on ${p.target}`;
 *     case "bash":
 *       return `shell> ${p.command}`; // override built-in
 *     default:
 *       return undefined; // use built-in
 *   }
 * });
 * ```
 */
export const makeToolCallFormatterLayer = (
  format: (name: string, params: unknown) => string | undefined,
) => Layer.succeed(ToolCallFormatter, { format });
