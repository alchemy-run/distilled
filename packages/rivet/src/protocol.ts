import type { Protocol } from "@distilled.cloud/core/protocol";
import { responseErrorFields } from "@distilled.cloud/core/protocol-http";
import {
  restProtocol,
  unknownErrorProps,
  type RestErrorInfo,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * RivetProtocol -- the shared bearer-REST protocol instantiated for the
 * Rivet engine API.
 *
 * Requests carry `Authorization: Bearer <token>` (the admin token or a
 * namespace JWT) and go to the configured control plane. Responses are plain
 * JSON with no success envelope.
 *
 * Failures are `{ group, code, message, metadata? }` with an
 * `x-rivet-error: <group>.<code>` header (for example `pool.not_found`).
 * Per-operation error matchers in `patches/` match that header, so a missing
 * pool and a missing namespace are different tags; status classes from
 * core's shared map cover the rest. The envelope reports `<group>.<code>` as
 * the code of an unknown error. A 404 without `x-rivet-ray-id` did not come
 * from the engine, so it is `EngineNotReady`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  EngineNotReady,
  RivetParseError,
  UnknownRivetError,
  type RivetServiceError,
} from "./errors.ts";

/**
 * The errors declared on Rivet's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link RivetParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownRivetError}), a 404 that did not come from
 * the engine ({@link EngineNotReady}, see {@link engineNotReady}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type RivetProtocolError =
  | RestProtocolError
  | RivetParseError
  | UnknownRivetError
  | EngineNotReady;

/**
 * What every generated Rivet operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RivetOpError, RivetOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type RivetOpError = RivetServiceError | RivetProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Rivet operation. */
export type RivetOpContext = Credentials | HttpClient.HttpClient;

const errorEnvelope = (body: unknown) => {
  if (typeof body !== "object" || body === null) return undefined;
  const { group, code, message } = body as Record<string, unknown>;
  return {
    code:
      typeof group === "string" && typeof code === "string"
        ? `${group}.${code}`
        : typeof code === "string"
          ? code
          : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

/**
 * The engine sends `x-rivet-ray-id` on every response, so a 404 without it
 * came from whatever sits in front of the engine: a platform's router while
 * the engine is starting.
 */
const engineNotReady = (info: RestErrorInfo): EngineNotReady | undefined =>
  info.status === 404 && info.headers["x-rivet-ray-id"] === undefined
    ? new EngineNotReady({
        message: `The Rivet engine did not answer: its endpoint returned a 404 without x-rivet-ray-id (${info.message})`,
        ...responseErrorFields(undefined, { body: info.body, headers: info.headers }),
      })
    : undefined;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const RivetProtocol: Protocol<RivetProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the calling fiber per request, so a rotated token is picked
    // up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.endpoint,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    classifyError: engineNotReady,
    unknownError: (info) => new UnknownRivetError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new RivetParseError({ body, cause }),
  });
