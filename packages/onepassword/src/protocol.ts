import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorInfo,
  type RestParseErrorInfo,
} from "@distilled.cloud/core/protocol-rest";
/**
 * 1Password protocols -- hand-written. Every 1Password API is plain JSON
 * REST, so each protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`. They differ in credentials, host and error body:
 *
 *   ConnectProtocol      Connect      ConnectCredentials      Bearer   `{ status?, message }`
 *   EventsProtocol       Events       EventsCredentials       Bearer   `{ Error: { Message } }`
 *   UsersProtocol        Users        UsersCredentials        Bearer   `{ code, message }`
 *   OAuthProtocol        OAuth        OAuthCredentials        Basic    `{ error, error_description }`
 *   PartnershipProtocol  Partnership  PartnershipCredentials  Bearer   `{ code, error, description }`
 *
 * ConnectProtocol:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (default http://localhost:8080/v1), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ status?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownOnepasswordError}.
 */
import * as Base64 from "effect/encoding/Base64";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  ConnectCredentials,
  EventsCredentials,
  OAuthCredentials,
  PartnershipCredentials,
  UsersCredentials,
  type ConnectConfig,
  type EventsConfig,
  type OAuthConfig,
  type PartnershipConfig,
  type UsersConfig,
} from "./credentials.ts";
import { UnknownOnepasswordError, OnepasswordParseError } from "./errors.ts";

/**
 * Error channel shared by every generated 1Password operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * OnepasswordOpError, OnepasswordOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type OnepasswordOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownOnepasswordError
  | ConfigError
  | HttpClientError.HttpClientError
  | OnepasswordParseError;

/** Context (requirements) of every generated Connect operation. */
export type ConnectOpContext = ConnectCredentials | HttpClient.HttpClient;
/** Context (requirements) of every generated Events API operation. */
export type EventsOpContext = EventsCredentials | HttpClient.HttpClient;
/** Context (requirements) of every generated Users API operation. */
export type UsersOpContext = UsersCredentials | HttpClient.HttpClient;
/** Context (requirements) of every generated OAuth API operation. */
export type OAuthOpContext = OAuthCredentials | HttpClient.HttpClient;
/** Context (requirements) of every generated Partnership API operation. */
export type PartnershipOpContext = PartnershipCredentials | HttpClient.HttpClient;

const unknownError = ({ code, message, body }: RestErrorInfo) =>
  new UnknownOnepasswordError({
    code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
    message,
    body,
  });

const parseError = ({ body, cause }: RestParseErrorInfo) =>
  new OnepasswordParseError({ body, cause });

const record = (body: unknown): Record<string, unknown> | undefined =>
  body !== null && typeof body === "object" ? (body as Record<string, unknown>) : undefined;

const trimBase = (url: string) => url.replace(/\/+$/, "");

/** Connect server API (default `http://localhost:8080/v1`). */
export const ConnectProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<ConnectConfig>({
    credentials: ConnectCredentials,
    baseUrl: (creds) => trimBase(creds.apiBaseUrl),
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    // `{ status?: number, message: string }` -- the factory's default
    // lenient envelope covers `message`.
    unknownError,
    parseError,
  });

/** Events API at `https://events.1password.com` (or the account's regional host). */
export const EventsProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<EventsConfig>({
    credentials: EventsCredentials,
    baseUrl: (creds) => trimBase(creds.apiBaseUrl),
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    // `{ "Error": { "Message": "..." } }`
    errorEnvelope: (body) => {
      const error = record(record(body)?.Error);
      return { message: typeof error?.Message === "string" ? error.Message : undefined };
    },
    unknownError,
    parseError,
  });

/** Users API at `https://api.1password.com` (or the account's regional host). */
export const UsersProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<UsersConfig>(
  {
    credentials: UsersCredentials,
    baseUrl: (creds) => trimBase(creds.apiBaseUrl),
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    }),
    // `{ code, message }` -- the factory's default envelope.
    unknownError,
    parseError,
  },
);

/** OAuth API (token, introspect, revoke) with the application's client credentials. */
export const OAuthProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<OAuthConfig>(
  {
    credentials: OAuthCredentials,
    baseUrl: (creds) => trimBase(creds.apiBaseUrl),
    headers: (creds) => ({
      Authorization: `Basic ${Base64.encode(`${creds.clientId}:${Redacted.value(creds.clientSecret)}`)}`,
    }),
    // RFC 6749 §5.2: `{ error, error_description }`
    errorEnvelope: (body) => {
      const b = record(body);
      return {
        code: typeof b?.error === "string" ? b.error : undefined,
        message:
          typeof b?.error_description === "string"
            ? b.error_description
            : typeof b?.error === "string"
              ? b.error
              : undefined,
      };
    },
    unknownError,
    parseError,
  },
);

/** Partnership API at `https://billing.1password.com`. */
export const PartnershipProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<PartnershipConfig>({
    credentials: PartnershipCredentials,
    baseUrl: (creds) => trimBase(creds.apiBaseUrl),
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    // `{ code: 410, error: "gone", description: "..." }`
    errorEnvelope: (body) => {
      const b = record(body);
      return {
        code: typeof b?.error === "string" ? b.error : undefined,
        message:
          typeof b?.description === "string"
            ? b.description
            : typeof b?.error === "string"
              ? b.error
              : undefined,
      };
    },
    unknownError,
    parseError,
  });
