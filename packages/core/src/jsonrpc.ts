/**
 * JSON-RPC 2.0 — the runtime half of distilled's JSON-RPC protocol family.
 *
 * A JSON-RPC API is described along independent axes, each a swappable part
 * here:
 *
 *   • framing    — how messages are delimited on a byte stream
 *                  ({@link ndjson}; `Content-Length` headers for LSP later)
 *   • transport  — the endpoint the messages flow over: any byte stream
 *                  pair ({@link fromStreams}: stdio, TCP), a socket
 *                  ({@link fromSocket}: WebSocket), or {@link memoryPair}
 *                  for tests. Distilled never spawns or hosts the peer —
 *                  callers hand it an endpoint.
 *   • direction  — outbound calls we make ({@link request}, {@link notify})
 *                  and inbound calls the peer makes back into us
 *                  ({@link bindHandlers}, {@link notifications})
 *
 * A {@link Peer} multiplexes both directions over one transport: outgoing
 * requests are correlated with their responses by id, incoming requests are
 * dispatched to handlers and answered, incoming notifications are published
 * to subscribers. Generated SDKs never touch the peer directly — operations
 * are typed callables (like REST operations) that resolve a per-package
 * {@link Connection} service from context.
 *
 * Errors follow the distilled doctrine: a JSON-RPC error response becomes the
 * operation's typed error when an `errorMatchers` entry on one of its error
 * classes matches the `code`/`message` (patchable like any other provider),
 * and the package's `unknownError` otherwise.
 */
import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Option from "effect/Option";
import { pipeArguments } from "effect/Pipeable";
import * as PubSub from "effect/PubSub";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import type * as S from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import * as Scope from "effect/Scope";
import type * as Sink from "effect/Sink";
import * as Socket from "effect/socket/Socket";
import * as Stream from "effect/Stream";
import { SingleShotGen } from "effect/Utils";
import type { ApiErrorClass } from "./api.ts";
import { mapKeys, matchTypedError } from "./protocol-http.ts";
import { unwrapRedactedDeep, wrapSensitive } from "./protocol-rest.ts";
import { validateResponse } from "./response-validation.ts";

//#region Wire

export type JsonRpcId = string | number;

/** The `error` member of a JSON-RPC error response. */
export interface JsonRpcErrorObject {
  readonly code: number;
  readonly message: string;
  readonly data?: unknown;
}

/** Standard JSON-RPC 2.0 error codes. */
export const ErrorCode = {
  ParseError: -32700,
  InvalidRequest: -32600,
  MethodNotFound: -32601,
  InvalidParams: -32602,
  InternalError: -32603,
} as const;

//#endregion

//#region Errors

/**
 * The transport ended or failed: the peer process exited, the stream closed,
 * a write failed, or an incoming frame could not be parsed. Every pending and
 * future call on the connection fails with it. Part of every JSON-RPC
 * operation's error channel (like `HttpClientError` for REST).
 */
export class JsonRpcTransportError extends Data.TaggedError("JsonRpcTransportError")<{
  readonly reason: "closed" | "read" | "write" | "parse";
  readonly message: string;
  readonly cause?: unknown;
}> {}

/**
 * Raised BY an inbound handler to answer the peer with a JSON-RPC error
 * response (`{ code, message, data }`). Handler defects answer with
 * `InternalError` (-32603).
 */
export class HandlerError extends Data.TaggedError("JsonRpcHandlerError")<{
  readonly code: number;
  readonly message: string;
  readonly data?: unknown;
}> {}

/** A JSON-RPC error response, before it is mapped to a typed error. */
class ErrorResponse extends Data.TaggedError("JsonRpcErrorResponse")<{
  readonly method: string;
  readonly error: JsonRpcErrorObject;
}> {}

//#endregion

//#region Framing + transport

/** Splits a byte stream into message frames and encodes frames back to bytes. */
export interface Framing {
  readonly decode: <E>(bytes: Stream.Stream<Uint8Array, E>) => Stream.Stream<string, E>;
  readonly encode: (frame: string) => Uint8Array;
}

const encoder = new TextEncoder();

/**
 * Newline-delimited JSON: one message per line (ACP, Codex app-server, MCP
 * stdio). Blank lines are skipped; a trailing unterminated line is flushed
 * when the stream ends.
 */
export const ndjson: Framing = {
  decode: (bytes) =>
    bytes.pipe(
      Stream.decodeText(),
      Stream.splitLines,
      Stream.filter((line) => line.trim().length > 0),
    ),
  encode: (frame) => encoder.encode(`${frame}\n`),
};

/** Where frames flow: the incoming side and a way to drain the outgoing side. */
export interface Transport {
  readonly incoming: Stream.Stream<string, JsonRpcTransportError>;
  /** Run until `outgoing` ends, writing every frame. */
  readonly send: (outgoing: Stream.Stream<string>) => Effect.Effect<void, JsonRpcTransportError>;
}

/**
 * A transport over any byte-stream endpoint: frames are decoded from
 * `readable` and encoded into `writable`. Stdio of a process the caller
 * spawned, a TCP connection, a pipe — distilled only speaks the protocol.
 */
export const fromStreams = <RE, WE>(options: {
  readonly readable: Stream.Stream<Uint8Array, RE>;
  readonly writable: Sink.Sink<unknown, Uint8Array, unknown, WE>;
  readonly framing?: Framing;
}): Transport => {
  const framing = options.framing ?? ndjson;
  return {
    incoming: framing
      .decode(options.readable)
      .pipe(
        Stream.mapError(
          (cause) => new JsonRpcTransportError({ reason: "read", message: "read failed", cause }),
        ),
      ),
    send: (outgoing) =>
      outgoing.pipe(
        Stream.map(framing.encode),
        Stream.run(options.writable),
        Effect.asVoid,
        Effect.mapError(
          (cause) => new JsonRpcTransportError({ reason: "write", message: "write failed", cause }),
        ),
      ),
  };
};

const textDecoder = new TextDecoder();

/**
 * A transport over an Effect `Socket` — e.g. a WebSocket endpoint
 * (`Socket.makeWebSocket(url)`). Message-oriented sockets carry one
 * JSON-RPC message per message (the default); pass `framing` for a raw
 * byte socket. The socket's reader and writer live in the ambient `Scope`.
 */
export const fromSocket = (
  socket: Socket.Socket,
  options?: { readonly framing?: Framing },
): Effect.Effect<Transport, JsonRpcTransportError, Scope.Scope> =>
  Effect.gen(function* () {
    const reader = yield* socket.reader.pipe(
      Effect.mapError(
        (cause) =>
          new JsonRpcTransportError({ reason: "closed", message: "socket failed to open", cause }),
      ),
    );
    const writer = yield* socket.writer;
    const chunks = Stream.repeat(Stream.fromEffect(reader.pull), Schedule.forever).pipe(
      Stream.flatMap((batch) => Stream.fromIterable(batch)),
      // A clean close ends the stream; anything else is a read failure.
      Stream.catchIf(
        (e) => Socket.isSocketError(e) && e.reason._tag === "SocketCloseError",
        () => Stream.empty,
      ),
      Stream.mapError(
        (cause) =>
          new JsonRpcTransportError({ reason: "read", message: "socket read failed", cause }),
      ),
    );
    const incoming: Stream.Stream<string, JsonRpcTransportError> = options?.framing
      ? options.framing.decode(
          chunks.pipe(
            Stream.map((chunk) => (typeof chunk === "string" ? encoder.encode(chunk) : chunk)),
          ),
        )
      : chunks.pipe(
          Stream.map((chunk) => (typeof chunk === "string" ? chunk : textDecoder.decode(chunk))),
        );
    return {
      incoming,
      send: (outgoing) =>
        outgoing.pipe(
          Stream.runForEach((frame) =>
            writer.write(options?.framing ? options.framing.encode(frame) : frame),
          ),
          Effect.mapError(
            (cause) =>
              new JsonRpcTransportError({ reason: "write", message: "socket write failed", cause }),
          ),
        ),
    } satisfies Transport;
  });

/**
 * Two transports wired back to back in memory — what one sends the other
 * receives. For tests: run a fake agent on one end and the SDK on the other.
 */
export const memoryPair: Effect.Effect<readonly [Transport, Transport]> = Effect.gen(function* () {
  const aToB = yield* Queue.unbounded<string, Cause.Done<void>>();
  const bToA = yield* Queue.unbounded<string, Cause.Done<void>>();
  const end = (
    from: Queue.Queue<string, Cause.Done<void>>,
    to: Queue.Queue<string, Cause.Done<void>>,
  ) =>
    ({
      incoming: Stream.fromQueue(from),
      send: (outgoing) =>
        outgoing.pipe(
          Stream.runForEach((frame) => Queue.offer(to, frame)),
          Effect.ensuring(Queue.end(to)),
        ),
    }) satisfies Transport;
  return [end(bToA, aToB), end(aToB, bToA)] as const;
});

//#endregion

//#region Peer

/** Raw inbound request handler (params/results are wire values). */
export type RawHandler = (params: unknown) => Effect.Effect<unknown, HandlerError>;

export interface IncomingNotification {
  readonly method: string;
  readonly params: unknown;
}

export interface PeerOptions {
  /**
   * Inbound request handlers by wire method. A request for a method with no
   * handler is answered `MethodNotFound` (-32601).
   */
  readonly requests?: ReadonlyMap<string, RawHandler>;
  /** Inbound notification callbacks by wire method (in addition to the stream). */
  readonly notifications?: ReadonlyMap<string, (params: unknown) => Effect.Effect<void>>;
  /**
   * Omit the `"jsonrpc": "2.0"` member on outgoing messages — for peers that
   * speak JSON-RPC without the version tag (Codex app-server). Incoming
   * messages are accepted either way.
   */
  readonly omitVersion?: boolean;
  /**
   * What a malformed incoming frame does: end the connection (default — a
   * peer emitting garbage on its protocol channel can't be trusted to stay
   * in sync) or skip it (for peers that log to stdout).
   */
  readonly onMalformed?: "fail" | "ignore";
}

/** The inbound handler maps a connection's peer dispatches to (see {@link bindHandlers}). */
export type PeerHandlers = Pick<PeerOptions, "requests" | "notifications">;

export interface Peer {
  /** Send a request and await its response. */
  readonly request: (
    method: string,
    params: unknown,
  ) => Effect.Effect<unknown, JsonRpcTransportError | ErrorResponse>;
  /** Send a notification (no response). */
  readonly notify: (method: string, params: unknown) => Effect.Effect<void, JsonRpcTransportError>;
  /**
   * Incoming notifications from the moment of subscription onward. Use the
   * `notifications` handler map in {@link PeerOptions} when none may be missed.
   */
  readonly notifications: Stream.Stream<IncomingNotification>;
  /** Completes (with the reason) when the connection ends. */
  readonly closed: Effect.Effect<JsonRpcTransportError>;
}

const isObject = (u: unknown): u is Record<string, unknown> => typeof u === "object" && u !== null;
const isId = (u: unknown): u is JsonRpcId => typeof u === "string" || typeof u === "number";

/**
 * Run a JSON-RPC peer over a transport in the ambient `Scope`. Closing the
 * scope ends the outgoing stream, interrupts in-flight handlers, and fails
 * pending requests with `JsonRpcTransportError("closed")`.
 */
export const makePeer = (
  transport: Transport,
  options: PeerOptions = {},
): Effect.Effect<Peer, never, Scope.Scope> =>
  Effect.gen(function* () {
    const scope = yield* Scope.Scope;
    const handlerScope = yield* Scope.fork(scope, "parallel");
    const outgoing = yield* Queue.unbounded<string, Cause.Done<void>>();
    const published = yield* PubSub.unbounded<IncomingNotification>();
    const pending = new Map<
      string,
      {
        method: string;
        deferred: Deferred.Deferred<unknown, ErrorResponse | JsonRpcTransportError>;
      }
    >();
    const nextId = yield* Ref.make(1);
    const closedWith = yield* Deferred.make<JsonRpcTransportError>();
    const version = options.omitVersion ? {} : { jsonrpc: "2.0" };

    const terminate = (error: JsonRpcTransportError) =>
      Deferred.succeed(closedWith, error).pipe(
        Effect.flatMap((first) =>
          first
            ? Effect.gen(function* () {
                const waiting = [...pending.values()];
                pending.clear();
                yield* Effect.forEach(waiting, ({ deferred }) => Deferred.fail(deferred, error), {
                  discard: true,
                });
                yield* Queue.end(outgoing);
                yield* PubSub.shutdown(published);
              })
            : Effect.void,
        ),
      );

    const closedError = Deferred.await(closedWith);

    const send = (message: Record<string, unknown>) =>
      Effect.gen(function* () {
        if (yield* Deferred.isDone(closedWith)) return yield* Effect.fail(yield* closedError);
        const accepted = yield* Queue.offer(outgoing, JSON.stringify({ ...version, ...message }));
        if (!accepted) return yield* Effect.fail(yield* closedError);
      });

    const respond = (id: JsonRpcId, exit: Exit.Exit<unknown, HandlerError>) =>
      send(
        Exit.isSuccess(exit)
          ? { id, result: exit.value ?? null }
          : (() => {
              const failure = Cause.findErrorOption(exit.cause);
              const error: JsonRpcErrorObject = Option.isSome(failure)
                ? {
                    code: failure.value.code,
                    message: failure.value.message,
                    ...(failure.value.data !== undefined ? { data: failure.value.data } : {}),
                  }
                : { code: ErrorCode.InternalError, message: Cause.pretty(exit.cause) };
              return { id, error };
            })(),
      ).pipe(Effect.ignore);

    const onRequest = (id: JsonRpcId, method: string, params: unknown) => {
      const handler = options.requests?.get(method);
      const run: Effect.Effect<unknown, HandlerError> = handler
        ? handler(params)
        : Effect.fail(
            new HandlerError({
              code: ErrorCode.MethodNotFound,
              message: `Method not found: ${method}`,
            }),
          );
      return run.pipe(
        Effect.exit,
        Effect.flatMap((exit) => respond(id, exit)),
        Effect.forkIn(handlerScope),
        Effect.asVoid,
      );
    };

    const onNotification = (method: string, params: unknown) =>
      Effect.gen(function* () {
        yield* PubSub.publish(published, { method, params });
        const callback = options.notifications?.get(method);
        if (callback) yield* callback(params);
      });

    const onResponse = (id: JsonRpcId, message: Record<string, unknown>) =>
      Effect.suspend(() => {
        const key = String(id);
        const entry = pending.get(key);
        if (!entry) return Effect.void;
        pending.delete(key);
        if (isObject(message.error)) {
          const error = message.error as unknown as JsonRpcErrorObject;
          return Deferred.fail(entry.deferred, new ErrorResponse({ method: entry.method, error }));
        }
        return Deferred.succeed(entry.deferred, message.result);
      });

    const route = (frame: string) =>
      Effect.gen(function* () {
        let message: unknown;
        try {
          message = JSON.parse(frame);
        } catch (cause) {
          if (options.onMalformed === "ignore") return;
          return yield* Effect.fail(
            new JsonRpcTransportError({
              reason: "parse",
              message: "malformed JSON-RPC frame",
              cause,
            }),
          );
        }
        for (const m of Array.isArray(message) ? message : [message]) {
          if (!isObject(m)) continue;
          if (typeof m.method === "string") {
            if (isId(m.id)) yield* onRequest(m.id, m.method, m.params);
            else yield* onNotification(m.method, m.params);
          } else if (isId(m.id)) {
            yield* onResponse(m.id, m);
          }
        }
      });

    yield* transport.incoming.pipe(
      Stream.runForEach(route),
      Effect.matchEffect({
        onFailure: terminate,
        onSuccess: () =>
          terminate(
            new JsonRpcTransportError({ reason: "closed", message: "peer closed the connection" }),
          ),
      }),
      Effect.forkIn(scope),
    );
    yield* transport
      .send(Stream.fromQueue(outgoing))
      .pipe(Effect.catch(terminate), Effect.forkIn(scope));
    yield* Scope.addFinalizer(
      scope,
      terminate(
        new JsonRpcTransportError({ reason: "closed", message: "connection scope closed" }),
      ),
    );

    const request = (method: string, params: unknown) =>
      Effect.gen(function* () {
        const id = yield* Ref.getAndUpdate(nextId, (n) => n + 1);
        const deferred = yield* Deferred.make<unknown, ErrorResponse | JsonRpcTransportError>();
        pending.set(String(id), { method, deferred });
        yield* send({ id, method, ...(params !== undefined ? { params } : {}) }).pipe(
          Effect.tapError(() => Effect.sync(() => pending.delete(String(id)))),
        );
        return yield* Deferred.await(deferred).pipe(
          Effect.onInterrupt(() => Effect.sync(() => pending.delete(String(id)))),
        );
      });

    const notify = (method: string, params: unknown) =>
      send({ method, ...(params !== undefined ? { params } : {}) });

    return {
      request,
      notify,
      notifications: Stream.fromPubSub(published),
      closed: closedError,
    } satisfies Peer;
  });

//#endregion

//#region Connection + protocol

/**
 * A package's connection service: the running {@link Peer} its operations
 * talk through. Each SDK declares its own tag so several JSON-RPC peers can
 * coexist in one program:
 *
 *   export class AcpConnection extends JsonRpc.Connection<AcpConnection>()("@distilled.cloud/acp/Connection") {}
 */
export const Connection =
  <Self>() =>
  <const Id extends string>(id: Id) =>
    Context.Service<Self, Peer>()(id);

/** A connection tag produced by {@link Connection}. */
export type ConnectionTag<Self> = Context.Key<Self, Peer>;

/** What the wire said about an error nothing typed matched. */
export interface UnknownErrorInfo {
  readonly method: string;
  readonly code: number;
  readonly message: string;
  readonly data?: unknown;
}

/**
 * A package's JSON-RPC protocol: its connection tag plus the fallback and
 * parse-error constructors (the SDK's `Unknown<Pkg>Error` / `<Pkg>ParseError`).
 * Assign to a module-level const in the package's `protocol.ts`.
 */
export interface Protocol<Conn> {
  readonly connection: ConnectionTag<Conn>;
  readonly unknownError: (info: UnknownErrorInfo) => unknown;
  readonly parseError: (info: { readonly body: unknown; readonly cause: unknown }) => unknown;
}

export const protocol = <Conn>(p: Protocol<Conn>): Protocol<Conn> => p;

/**
 * Connect to a peer over a transport: run the protocol with the given
 * inbound handlers in the ambient `Scope`, and return the {@link Peer} a
 * package's operations run against (provide it under the package's
 * connection tag). Closing the scope closes the connection.
 */
export const connect = <HR = never>(
  transport: Transport,
  options?: PeerOptions | Effect.Effect<PeerOptions, never, HR>,
): Effect.Effect<Peer, never, Scope.Scope | HR> =>
  Effect.gen(function* () {
    const peerOptions = Effect.isEffect(options) ? yield* options : options;
    return yield* makePeer(transport, peerOptions);
  });

//#endregion

//#region Operations

/** Wire value → TS value for a schema: key mapping, strict validation, sensitive wrap. */
const decodeValue = (
  ast: AST.AST,
  value: unknown,
  parseError: (cause: unknown) => unknown,
): Effect.Effect<unknown> =>
  validateResponse(ast, mapKeys(ast, value ?? {}, "decode"), parseError).pipe(
    Effect.map((mapped) => wrapSensitive(ast, mapped)),
    Effect.catch((e) => Effect.fail(e) as Effect.Effect<never>),
  );

/** TS value → wire value for a schema. */
const encodeValue = (ast: AST.AST, value: unknown): unknown =>
  value === undefined ? undefined : mapKeys(ast, unwrapRedactedDeep(value), "encode");

const toTypedError = (
  errors: ReadonlyArray<ApiErrorClass>,
  p: Protocol<any>,
  e: ErrorResponse,
): unknown =>
  matchTypedError(errors, 0, [{ code: e.error.code, message: e.error.message }], {
    body: e.error.data,
  }) ??
  p.unknownError({
    method: e.method,
    code: e.error.code,
    message: e.error.message,
    ...(e.error.data !== undefined ? { data: e.error.data } : {}),
  });

/** Make a callable usable directly or via `yield*` (distilled's OperationMethod shape). */
const yieldable = <F extends (...args: any[]) => any>(
  fn: F,
  wrap: (fn: F, ctx: Context.Context<any>) => F,
): F => {
  const Proto = {
    [Symbol.iterator](this: any) {
      return new SingleShotGen(this.asEffect());
    },
    pipe(this: any) {
      return pipeArguments(this.asEffect(), arguments);
    },
    asEffect() {
      return Effect.map(Effect.context<any>(), (ctx) => wrap(fn, ctx));
    },
  };
  return Object.assign(fn, Proto);
};

export interface RequestConfig<
  I extends S.Top,
  O extends S.Top,
  Conn,
  E extends readonly ApiErrorClass[],
> {
  readonly method: string;
  readonly input: I;
  readonly output: O;
  readonly errors?: E;
  readonly protocol: Protocol<Conn>;
}

/** An outbound JSON-RPC request: `op(input)` or `const fn = yield* op`. */
export type RequestMethod<I, O, E, R> = Effect.Effect<
  (input: I) => Effect.Effect<O, E, never>,
  never,
  R
> &
  ((input: I) => Effect.Effect<O, E, R>);

/** Declare an outbound request (the generated op const). Config resolves lazily. */
export const request = <
  I extends S.Top,
  O extends S.Top,
  Conn,
  const E extends readonly ApiErrorClass[] = readonly [],
>(
  configFn: () => RequestConfig<I, O, Conn, E>,
): RequestMethod<
  S.Schema.Type<I>,
  S.Schema.Type<O>,
  InstanceType<E[number]> | JsonRpcTransportError,
  Conn
> => {
  let cfg: RequestConfig<I, O, Conn, E> | undefined;
  const config = () => (cfg ??= configFn());
  const fn = (input: unknown) =>
    Effect.gen(function* () {
      const c = config();
      const peer = yield* c.protocol.connection;
      const result = yield* peer
        .request(c.method, encodeValue(c.input.ast, input))
        .pipe(
          Effect.catchTag("JsonRpcErrorResponse", (e) =>
            Effect.fail(toTypedError(c.errors ?? [], c.protocol, e)),
          ),
        );
      return yield* decodeValue(c.output.ast, result, (cause) =>
        c.protocol.parseError({ body: result, cause }),
      );
    });
  return yieldable(
    fn,
    (f, ctx) =>
      ((input: unknown) =>
        Effect.updateContext(f(input), (current): Context.Context<any> =>
          Context.merge(ctx, current),
        )) as any,
  ) as any;
};

export interface NotifyConfig<I extends S.Top, Conn> {
  readonly method: string;
  readonly input: I;
  readonly protocol: Protocol<Conn>;
}

/** Declare an outbound notification (fire-and-forget). */
export const notify = <I extends S.Top, Conn>(
  configFn: () => NotifyConfig<I, Conn>,
): RequestMethod<S.Schema.Type<I>, void, JsonRpcTransportError, Conn> => {
  let cfg: NotifyConfig<I, Conn> | undefined;
  const config = () => (cfg ??= configFn());
  const fn = (input: unknown) =>
    Effect.gen(function* () {
      const c = config();
      const peer = yield* c.protocol.connection;
      yield* peer.notify(c.method, encodeValue(c.input.ast, input));
    });
  return yieldable(
    fn,
    (f, ctx) =>
      ((input: unknown) =>
        Effect.updateContext(f(input), (current): Context.Context<any> =>
          Context.merge(ctx, current),
        )) as any,
  ) as any;
};

export interface NotificationsConfig<P extends S.Top, Conn> {
  readonly method: string;
  readonly params: P;
  readonly protocol: Protocol<Conn>;
}

/**
 * Declare an inbound notification stream: every `method` notification the
 * peer sends from subscription onward, decoded. Malformed params (strict
 * mode) are dropped rather than ending the stream.
 */
export const notifications = <P extends S.Top, Conn>(
  configFn: () => NotificationsConfig<P, Conn>,
): Stream.Stream<S.Schema.Type<P>, never, Conn> =>
  Stream.unwrap(
    Effect.gen(function* () {
      const c = configFn();
      const peer = yield* c.protocol.connection;
      return peer.notifications.pipe(
        Stream.filter((n) => n.method === c.method),
        Stream.mapEffect((n) =>
          decodeValue(c.params.ast, n.params, (cause) =>
            c.protocol.parseError({ body: n.params, cause }),
          ).pipe(Effect.option),
        ),
        Stream.filter(Option.isSome),
        Stream.map((o) => o.value),
      );
    }),
  ) as any;

/** One inbound method in a generated handler table. */
export interface InboundMethod {
  readonly method: string;
  readonly kind: "request" | "notification";
  readonly params: S.Top;
  readonly result?: S.Top;
}

/**
 * Turn typed handler implementations into the peer's raw handler maps,
 * keyed by wire method: decode incoming params, run the handler, encode its
 * result. `table` is the package's generated inbound-method table.
 */
export const bindHandlers = <R>(
  table: Readonly<Record<string, InboundMethod>>,
  impl: Readonly<
    Record<string, ((params: any) => Effect.Effect<any, HandlerError, R>) | undefined>
  >,
): Effect.Effect<PeerHandlers, never, R> =>
  Effect.map(Effect.context<R>(), (ctx) => {
    const requests = new Map<string, RawHandler>();
    const notes = new Map<string, (params: unknown) => Effect.Effect<void>>();
    for (const [key, handler] of Object.entries(impl)) {
      const entry = table[key];
      if (!entry || !handler) continue;
      const decode = (params: unknown) =>
        Effect.suspend(() => {
          try {
            return Effect.succeed(
              wrapSensitive(entry.params.ast, mapKeys(entry.params.ast, params ?? {}, "decode")),
            );
          } catch (cause) {
            return Effect.fail(
              new HandlerError({ code: ErrorCode.InvalidParams, message: String(cause) }),
            );
          }
        });
      if (entry.kind === "request") {
        requests.set(entry.method, (params) =>
          decode(params).pipe(
            Effect.flatMap(handler),
            Effect.map((result) => (entry.result ? encodeValue(entry.result.ast, result) : result)),
            Effect.provideContext(ctx),
          ),
        );
      } else {
        notes.set(entry.method, (params) =>
          decode(params).pipe(Effect.flatMap(handler), Effect.ignore, Effect.provideContext(ctx)),
        );
      }
    }
    return { requests, notifications: notes };
  });

//#endregion
