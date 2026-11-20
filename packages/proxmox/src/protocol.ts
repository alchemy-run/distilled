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
import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config, type CredentialsError } from "./credentials.ts";
import { ProxmoxParseError, UnknownProxmoxError, type ProxmoxServiceError } from "./errors.ts";

/**
 * The errors declared on Proxmox's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link ProxmoxParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownProxmoxError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type ProxmoxProtocolError = RestProtocolError | ProxmoxParseError | UnknownProxmoxError;

/**
 * What every generated Proxmox operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ProxmoxOpError, ProxmoxOpContext>` explicitly.
 */
export type ProxmoxOpError = ProxmoxServiceError | ProxmoxProtocolError | CredentialsError;

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

const RestProtocol = /*@__PURE__*/ restProtocol({
  credentials: Credentials,
  baseUrl: (config) => config.endpoint,
  headers: authHeaders,
  errorEnvelope,
  transformResponse: (body) => (isObject(body) && "data" in body ? body.data : body),
  unknownError: ({ status, message, body }) => new UnknownProxmoxError({ status, message, body }),
  parseError: ({ body, cause }) => new ProxmoxParseError({ body, cause }),
});

/** Core's REST protocol with booleans sent the way Proxmox reads them. */
// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const ProxmoxProtocol: Protocol<ProxmoxProtocolError | CredentialsError, Credentials> = {
  ...RestProtocol,
  encode: (args) => RestProtocol.encode({ ...args, input: toWire(args.input) }),
  // The REST protocol always has `call`.
  call: (operation, input) => RestProtocol.call!(operation, toWire(input)),
};
