/**
 * What a protocol is, typed by the errors it declares.
 *
 * An operation fails with three groups of errors, each named for where it
 * is declared:
 *
 *   1. on the operation  its `errors` list
 *   2. on the service    its `serviceErrors` list, the same for every
 *                        operation of the service
 *   3. on the protocol   the {@link Protocol}'s own error type: what the
 *                        code that builds requests and reads responses
 *                        fails with (a response it can't parse, mostly)
 *
 * `API.make` adds the three together. A protocol never names an error of
 * groups 1 and 2: it receives their classes, matches a failed response
 * against them, and fails with the instance as a {@link DeclaredError}.
 * Everything else it fails with is in its own type, and passes through to
 * every operation that names the protocol. Nobody writes that list: the
 * compiler reads it from the protocol's code ({@link ErrorOf}, and
 * {@link ProtocolOf} for a protocol written by hand).
 *
 *   export const NeonProtocol = restProtocol({ ... });
 *   export type NeonOpError = NeonServiceError | ErrorOf<typeof NeonProtocol>;
 *
 * Types only: this module has no runtime code.
 */
import type * as Effect from "effect/Effect";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type * as AST from "effect/SchemaAST";
import type * as Stream from "effect/Stream";
import type { PreparedOperation, ProtocolOperationConfig } from "./api.ts";

declare const declaredError: unique symbol;

/**
 * An error of group 1 or 2 as a protocol sees it: an instance of a class
 * that the operation or its service declares. A protocol can construct one
 * from a {@link DeclaredErrorClass} and fail with it; `API.make` puts the
 * real classes in the operation's error type.
 */
export interface DeclaredError {
  readonly [declaredError]: true;
}

/** A class that the operation or its service declares, as a protocol receives it. */
export type DeclaredErrorClass = new (props: any) => DeclaredError;

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
  /** The operation's declared classes, then its service's. */
  readonly errors: ReadonlyArray<DeclaredErrorClass>;
  /** The operation's config (the same object on every call of the operation). */
  readonly config: ProtocolOperationConfig;
}

/** One operation as {@link Protocol.call} and {@link Protocol.stream} see it. */
export interface Operation extends Omit<PreparedOperation, "errors"> {
  /** The operation's declared classes, then its service's. */
  readonly errors: ReadonlyArray<DeclaredErrorClass>;
}

/**
 * How an SDK turns an input into an HTTP request and a response into an
 * output. `ProtocolError` is what the protocol declares (group 3), and
 * `Requirements` is what its methods read from the calling fiber
 * (credentials, a region).
 *
 * A request that was not sent has no response to match, so `encode` fails
 * with the protocol's errors only.
 */
export interface Protocol<ProtocolError, Requirements = never> {
  readonly encode: (
    args: EncodeArgs,
  ) => Effect.Effect<HttpClientRequest.HttpClientRequest, ProtocolError, Requirements>;
  readonly decode: (
    args: DecodeArgs,
  ) => Effect.Effect<unknown, DeclaredError | ProtocolError, Requirements>;
  /**
   * Optional whole call. When present, `API.make` runs a call as
   * `call(operation, input)` in place of encode, send, decode. It reads the
   * `HttpClient` from the calling fiber and produces the same request,
   * result and errors as `encode` and `decode`.
   */
  readonly call?: (
    operation: Operation,
    input: unknown,
  ) => Effect.Effect<unknown, DeclaredError | ProtocolError, Requirements>;
  /**
   * Server streaming (see `API.makeStreaming`): each response message as it
   * arrives, decoded as one element of the output's `items`. Ending the
   * stream early cancels the call. A protocol that can't stream leaves it
   * out; one that streams only some operations fails the others with
   * `API.cannotStream`.
   */
  readonly stream?: (
    operation: Operation,
    input: unknown,
  ) => Stream.Stream<unknown, DeclaredError | ProtocolError, Requirements>;
}

/** What the methods of `P` return: its effects and its stream. */
type Outcome<P> = P[Extract<keyof P, keyof Protocol<unknown>>] extends infer Method
  ? Method extends (...args: any) => infer Result
    ? Result
    : never
  : never;

/**
 * The errors a protocol declares (group 3), read from what its methods fail
 * with. An SDK uses it to name what every operation fails with besides its
 * own errors: `<Sdk>ServiceError | ErrorOf<typeof <Sdk>Protocol>`.
 */
export type ErrorOf<P> =
  Outcome<P> extends infer Result
    ? Result extends Effect.Effect<any, infer Failure, any>
      ? Exclude<Failure, DeclaredError>
      : Result extends Stream.Stream<any, infer Failure, any>
        ? Exclude<Failure, DeclaredError>
        : never
    : never;

/** What a protocol's methods read from the calling fiber. */
export type RequirementsOf<P> =
  Outcome<P> extends infer Result
    ? Result extends Effect.Effect<any, any, infer Requirements>
      ? Requirements
      : Result extends Stream.Stream<any, any, infer Requirements>
        ? Requirements
        : never
    : never;

/**
 * The type of a protocol written by hand, read from its methods, so that
 * nobody lists its errors:
 *
 *   const methods = { encode, decode } satisfies Protocol<unknown, unknown>;
 *   export const GcpProtocol: ProtocolOf<typeof methods> = methods;
 */
export type ProtocolOf<Methods> = Protocol<ErrorOf<Methods>, RequirementsOf<Methods>>;
