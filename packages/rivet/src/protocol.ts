import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
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
 * the code of an unknown error.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { RivetParseError, UnknownRivetError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Rivet operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, RivetOpError,
 * RivetOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type RivetOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput;

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

export const RivetProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the calling fiber per request, so a rotated token is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.endpoint,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  errorEnvelope,
  unknownError: ({ code, message, body }) =>
    new UnknownRivetError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new RivetParseError({ body, cause }),
});
