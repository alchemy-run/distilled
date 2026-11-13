/**
 * ProxmoxProtocol: core's REST protocol, adapted to the Proxmox VE API.
 *
 * - Requests authenticate with `Authorization: PVEAPIToken=<id>=<secret>`.
 * - Proxmox reads a boolean parameter only as `1` or `0`, in the query
 *   string and in a JSON body alike. Top-level booleans are sent as `1`/`0`
 *   (see {@link toWire}); JSON bodies are otherwise sent as core builds them.
 * - Every response is `{ "data": ... }`; the payload is `data`.
 * - A failed call answers `{ "data": null, "message": ..., "errors"?: ... }`.
 *   `errors` names each rejected parameter and is folded into the message.
 */
import * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { ProxmoxParseError, UnknownProxmoxError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Proxmox operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ProxmoxOpError, ProxmoxOpContext>` explicitly.
 */
export type ProxmoxOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput;

/** Context (requirements) shared by every generated Proxmox operation. */
export type ProxmoxOpContext = Credentials | HttpClient.HttpClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/** The input with every top-level boolean as `1` or `0`, the only spellings Proxmox accepts. */
const toWire = (input: unknown): unknown => {
  if (!isObject(input)) return input;
  let wire: Record<string, unknown> | undefined;
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "boolean") (wire ??= { ...input })[key] = value ? 1 : 0;
  }
  return wire ?? input;
};

/** `message`, followed by each rejected parameter and the reason Proxmox gives. */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (!isObject(body)) return undefined;
  const message = typeof body.message === "string" ? body.message.trim() : undefined;
  const fields = isObject(body.errors)
    ? Object.entries(body.errors)
        .filter((entry): entry is [string, string] => typeof entry[1] === "string")
        .map(([name, reason]) => `${name}: ${reason.trim()}`)
    : [];
  if (fields.length === 0) return { message };
  return { message: [message ?? "Parameter verification failed.", ...fields].join("\n") };
};

const authHeaders = (config: Config) => ({
  Authorization: `PVEAPIToken=${Redacted.value(config.tokenId)}=${Redacted.value(config.tokenSecret)}`,
  Accept: "application/json",
});

/** Core's REST protocol with booleans sent the way Proxmox reads them. */
const proxmox = (): Layer.Layer<API.Protocol> =>
  Layer.effect(
    API.Protocol,
    Effect.gen(function* () {
      const base = yield* API.Protocol;
      const call = base.call;
      return API.Protocol.of({
        ...base,
        encode: (args) => base.encode({ ...args, input: toWire(args.input) }),
        call: call && ((operation, input) => call(operation, toWire(input))),
      });
    }),
  ).pipe(
    Layer.provide(
      makeRestProtocol<Config>({
        credentials: Credentials,
        baseUrl: (config) => config.endpoint,
        headers: authHeaders,
        errorEnvelope,
        transformResponse: (body) => (isObject(body) && "data" in body ? body.data : body),
        unknownError: ({ status, message, body }) =>
          new UnknownProxmoxError({ status, message, body }),
        parseError: ({ body, cause }) => new ProxmoxParseError({ body, cause }),
      }),
    ),
  );

export const ProxmoxProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ proxmox();
