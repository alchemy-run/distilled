import { failUnlessLenient } from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import { ParseError } from "../errors.ts";
import { readStreamAsText } from "../util/stream.ts";
import type { Operation } from "./operation.ts";
import type { Request } from "./request.ts";
import type { Response } from "./response.ts";

/**
 * A ProtocolHandler is created by a Protocol factory function
 * with the operation pre-bound, allowing one-time preprocessing
 * of schema metadata (like getEncodedPropertySignatures, etc.).
 */
/**
 * Result of deserializing an error response.
 * Contains the sanitized error code and any additional data fields.
 */
export interface DeserializedError {
  /** The sanitized error code (e.g., "ValidationException") */
  errorCode: string;
  /** Additional data fields from the error response */
  data: Record<string, unknown>;
}

export interface ProtocolHandler {
  /**
   * Serialize an input object into a request, without effects. Throws the
   * `ParseError` an input that does not match the schema fails with.
   */
  readonly serialize: (input: unknown) => Request;

  /**
   * Deserialize a 2xx response whose body has been read as text, without
   * effects. A body the protocol cannot read comes back as {@link Unreadable}.
   */
  readonly deserializeText: (response: TextResponse) => unknown;

  /**
   * Deserialize a 2xx response of an output with a streaming, event-stream
   * or blob member; `undefined` for outputs that are read as text (see
   * {@link deserialize}).
   */
  readonly deserializeStream?: (
    response: Response,
  ) => Effect.Effect<unknown, ParseError> | undefined;

  /**
   * Deserialize an error response and extract the error code and data.
   * @param response - The HTTP error response to deserialize
   * @returns Effect yielding the error code and additional data
   */
  deserializeError(response: Response): Effect.Effect<DeserializedError, ParseError>;
}

/** A handler whose implementation loads on first use. */
export interface LazyHandler {
  readonly ready: Effect.Effect<ProtocolHandler>;
}

/** A response whose body has been read as text. */
export interface TextResponse extends Response {
  body: string;
}

/**
 * A 2xx body a protocol could not read into its output shape (e.g. invalid
 * JSON). Strict mode fails with `error`; lenient mode returns `asRead`.
 */
export class Unreadable {
  constructor(
    readonly error: ParseError,
    readonly asRead: unknown,
  ) {}
}

/**
 * A Protocol is a factory function that takes an operation
 * and returns a ProtocolHandler with pre-computed metadata.
 *
 * This allows expensive operations like getEncodedPropertySignatures
 * to be done once at initialization time rather than on every request.
 */
export type Protocol = (operation: Operation) => ProtocolHandler | LazyHandler;

/** A protocol implementation: builds the handler directly. */
export type ProtocolImpl = (operation: Operation) => ProtocolHandler;

/** The loaded handler. */
export const loadHandler = (
  handler: ProtocolHandler | LazyHandler,
): Effect.Effect<ProtocolHandler> => ("ready" in handler ? handler.ready : Effect.succeed(handler));

/** `serialize` as an effect: a thrown `ParseError` fails, anything else dies. */
export const serializeEffect =
  (serialize: (input: unknown) => Request) =>
  (input: unknown): Effect.Effect<Request, ParseError> => {
    try {
      return Effect.succeed(serialize(input));
    } catch (e) {
      return e instanceof ParseError ? Effect.fail(e) : Effect.die(e);
    }
  };

/**
 * A 2xx response through the handler: `deserializeStream` for outputs
 * that stream, else the body (read as text) through `deserializeText`,
 * which may be {@link Unreadable}.
 */
export const readResponse = (
  protocol: ProtocolHandler,
  response: Response,
): Effect.Effect<unknown, ParseError> => {
  const fromText = (body: string): Effect.Effect<unknown, ParseError> =>
    Effect.succeed(protocol.deserializeText({ ...response, body }));
  const body = response.body;
  return (
    protocol.deserializeStream?.(response) ??
    (typeof body === "string" ? fromText(body) : Effect.flatMap(readStreamAsText(body), fromText))
  );
};

/**
 * {@link readResponse}, with an {@link Unreadable} body failing in strict
 * mode and returned as read in lenient mode.
 */
export const deserialize = (
  protocol: ProtocolHandler,
  response: Response,
): Effect.Effect<unknown, ParseError> =>
  Effect.flatMap(readResponse(protocol, response), (result) =>
    result instanceof Unreadable
      ? failUnlessLenient(result.error, result.asRead)
      : Effect.succeed(result),
  );

/** The handler with effect-returning `serializeRequest` / `deserializeResponse`, for tests. */
export const withEffects = (handler: ProtocolHandler) => ({
  ...handler,
  serializeRequest: serializeEffect(handler.serialize),
  deserializeResponse: (response: Response) => deserialize(handler, response),
});
