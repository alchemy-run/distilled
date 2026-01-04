import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type { ErrorResponse } from "./error-response.ts";
import type { Operation } from "./operation.ts";
import type { Response } from "./response.ts";

export class ParseError extends Data.TaggedError("ParseError")<{
  message: string;
}> {}

export type ParseErrors = (
  response: Response,
) => Effect.Effect<ErrorResponse, ParseError, never>;

export type ParseErrorsMiddleware = (op: Operation) => ParseErrors;

export class ErrorParser extends Context.Tag("ErrorParser")<
  ErrorParser,
  ParseErrors
>() {}
