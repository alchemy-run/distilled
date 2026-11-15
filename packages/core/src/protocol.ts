/**
 * What a protocol is, typed by the errors of an operation.
 *
 * Every operation fails with three groups of errors:
 *
 *   1. operation errors  the classes in the operation's own `errors` list
 *   2. service errors    what the server can answer on any operation of the
 *                        SDK (`Unauthorized`, `TooManyRequests`, the 5xx
 *                        classes, `Unknown<Sdk>Error`)
 *   3. protocol errors   what the SDK's own code fails with; the server did
 *                        not send them (`<Sdk>ParseError`, `HttpClientError`,
 *                        `InvalidInput`, `SdkError`, `ConfigError`)
 *
 * A {@link Protocol} states groups 2 and 3 in its type, and `API.make` adds
 * them to every operation that names it, next to the operation's own group
 * 1. An SDK writes the two groups once, as `<Sdk>ServiceError` and
 * `<Sdk>ProtocolError`, and types its protocol with them:
 *
 *   export const NeonProtocol: Protocol<NeonServiceError, NeonProtocolError, Credentials> =
 *     restProtocol({ ... });
 *
 * The compiler then checks each group on its own: a failure of the protocol
 * that neither union lists, or that sits in the wrong one, does not compile.
 *
 * Types only: this module has no runtime code.
 */
import type * as Effect from "effect/Effect";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type * as AST from "effect/SchemaAST";
import type * as Stream from "effect/Stream";
import type { PreparedOperation, ProtocolOperationConfig } from "./api.ts";

declare const operationError: unique symbol;

/**
 * Group 1 as a protocol sees it: an instance of one of the classes in the
 * operation's `errors` list. A protocol gets those classes as
 * {@link OperationErrorClass} and can only construct one and fail with it;
 * `API.make` puts the real classes in the operation's error type.
 */
export interface OperationError {
  readonly [operationError]: true;
}

/** A class from the operation's `errors` list, as its protocol receives it. */
export type OperationErrorClass = new (props: any) => OperationError;

/** What {@link Protocol.encode} receives. */
export interface EncodeArgs {
  readonly input: unknown;
  readonly inputAst: AST.AST;
  /** The operation's config (the same object on every call of the operation). */
  readonly config: ProtocolOperationConfig;
}

/** What {@link Protocol.decode} receives. */
export interface DecodeArgs {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  /** The operation's own error classes, matched against the response. */
  readonly errors: ReadonlyArray<OperationErrorClass>;
  /** The operation's config (the same object on every call of the operation). */
  readonly config: ProtocolOperationConfig;
}

/** One operation as {@link Protocol.call} and {@link Protocol.stream} see it. */
export interface Operation extends Omit<PreparedOperation, "errors"> {
  /** The operation's own error classes, matched against the response. */
  readonly errors: ReadonlyArray<OperationErrorClass>;
}

/**
 * How an SDK turns an input into an HTTP request and a response into an
 * output. `ServiceError` is group 2, `ProtocolError` is group 3, and
 * `Requirements` is what its methods read from the calling fiber
 * (credentials, a region).
 *
 * A request that was not sent has no answer from the server, so `encode`
 * fails with protocol errors only.
 */
export interface Protocol<ServiceError, ProtocolError, Requirements = never> {
  readonly encode: (
    args: EncodeArgs,
  ) => Effect.Effect<HttpClientRequest.HttpClientRequest, ProtocolError, Requirements>;
  readonly decode: (
    args: DecodeArgs,
  ) => Effect.Effect<unknown, OperationError | ServiceError | ProtocolError, Requirements>;
  /**
   * Optional whole call. When present, `API.make` runs a call as
   * `call(operation, input)` in place of encode, send, decode. It reads the
   * `HttpClient` from the calling fiber and produces the same request,
   * result and errors as `encode` and `decode`.
   */
  readonly call?: (
    operation: Operation,
    input: unknown,
  ) => Effect.Effect<unknown, OperationError | ServiceError | ProtocolError, Requirements>;
  /**
   * Server streaming (see `API.makeStreaming`): each response message as it
   * arrives. A protocol that can't stream leaves it out.
   */
  readonly stream?: (
    operation: Operation,
    input: unknown,
  ) => Stream.Stream<unknown, OperationError | ServiceError | ProtocolError, Requirements>;
}
