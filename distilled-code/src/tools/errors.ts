import * as S from "effect/Schema";

/**
 * Validation error for malformed tool calls.
 * Used when the LLM provides invalid parameters that cannot be recovered from.
 */
export class ToolValidationError extends S.TaggedError<ToolValidationError>()(
  "ToolValidationError",
  {
    tool: S.String,
    message: S.String,
  },
) {}

/**
 * Security violation error for rejected commands.
 * Used when a command is blocked by the CommandValidator.
 */
export class SecurityViolationError extends S.TaggedError<SecurityViolationError>()(
  "SecurityViolationError",
  {
    tool: S.String,
    message: S.String,
  },
) {}

// Union of all tool errors
export const ToolError = S.Union(ToolValidationError, SecurityViolationError);
export type ToolError = typeof ToolError.Type;
