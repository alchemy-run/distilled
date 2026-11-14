import * as API from "@distilled.cloud/core/api";
import type { CryptoError } from "@distilled.cloud/core/crypto";
import { HTTP_STATUS_MAP, type ConfigError, type InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * Polymarket protocols -- the shared bearer-REST protocol, once per API.
 *
 * Every Polymarket API is plain JSON with no success envelope, on its own
 * host, so each generated module calls its own protocol: `GammaProtocol`,
 * `ClobProtocol`, `DataProtocol`, `RelayerProtocol`, `BridgeProtocol`,
 * `CombosRfqProtocol`, `PerpsProtocol`. All of them read the one
 * `Credentials` service.
 *
 * Auth, when the credentials carry it:
 *
 * - CLOB and Combos RFQ: the five `POLY_*` L2 headers, signed per request
 *   (`signing.ts`). Without CLOB credentials the request goes out unsigned,
 *   which the public endpoints accept.
 * - Relayer: `RELAYER_API_KEY` + `RELAYER_API_KEY_ADDRESS`.
 * - Perps: `POLYMARKET-PROXY` + `POLYMARKET-SECRET`.
 */
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type BaseUrls, type ClobCredentials, type Config } from "./credentials.ts";
import {
  PayloadTooLarge,
  PolymarketParseError,
  UnknownPolymarketError,
  type DefaultErrors,
} from "./errors.ts";
import { signL2 } from "./signing.ts";

/**
 * Error channel shared by every generated Polymarket operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * PolymarketOpError, PolymarketOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type PolymarketOpError =
  | DefaultErrors
  | ConfigError
  | CryptoError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Polymarket operation. */
export type PolymarketOpContext = Credentials | HttpClient.HttpClient;

const rest = (
  api: keyof BaseUrls,
  headers: (creds: Config) => Record<string, string> = () => ({}),
): Layer.Layer<API.Protocol> =>
  makeRestProtocol<Config>({
    // Resolved on the calling fiber per request.
    credentials: Credentials,
    baseUrl: (creds) => creds.baseUrls[api],
    headers,
    // Failure bodies are `{ error, code? }`, which the default envelope
    // reader already handles (`error` as the message).
    statusMap: { ...HTTP_STATUS_MAP, 413: PayloadTooLarge },
    unknownError: (info) => new UnknownPolymarketError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new PolymarketParseError({ body, cause }),
  });

const bytesText = (bytes: Uint8Array): string | undefined =>
  bytes.length === 0 ? undefined : new TextDecoder().decode(bytes);

/**
 * The request body as the text that goes on the wire, for the signature.
 * CLOB and Combos RFQ only send JSON, so a form or streamed body means the
 * SDK built the request wrong.
 */
const bodyText = (
  request: HttpClientRequest.HttpClientRequest,
): Effect.Effect<string | undefined, SdkError> => {
  const body = request.body;
  switch (body._tag) {
    case "Empty":
      return Effect.succeed(undefined);
    case "Uint8Array":
      return Effect.succeed(bytesText(body.body));
    case "Raw":
      if (typeof body.body === "string") return Effect.succeed(body.body || undefined);
      if (body.body instanceof Uint8Array) return Effect.succeed(bytesText(body.body));
      break;
  }
  return Effect.fail(
    new SdkError({ message: `Polymarket L2 signing cannot read a ${body._tag} request body` }),
  );
};

/**
 * The route path the signature covers: the request URL below the base URL,
 * without the query string (the official clients sign the endpoint path
 * only).
 */
const routePath = (url: string, baseUrl: string): string => {
  const base = baseUrl.replace(/\/+$/, "");
  const below = url.startsWith(base) ? url.slice(base.length) : url;
  const path = below.split(/[?#]/, 1)[0] ?? "";
  return path.startsWith("/") ? path : `/${path}`;
};

/** Add the five L2 headers to an encoded request. */
const withL2Headers = (
  request: HttpClientRequest.HttpClientRequest,
  clob: ClobCredentials,
  baseUrl: string,
) =>
  Effect.gen(function* () {
    const timestamp = Math.floor((yield* Clock.currentTimeMillis) / 1000);
    const signature = yield* signL2({
      secret: Redacted.value(clob.secret),
      timestamp,
      method: request.method,
      requestPath: routePath(request.url, baseUrl),
      body: yield* bodyText(request),
    });
    return HttpClientRequest.setHeaders(request, {
      POLY_ADDRESS: clob.address,
      POLY_SIGNATURE: signature,
      POLY_TIMESTAMP: String(timestamp),
      POLY_API_KEY: Redacted.value(clob.apiKey),
      POLY_PASSPHRASE: Redacted.value(clob.passphrase),
    });
  });

/**
 * A REST protocol whose requests are L2-signed when CLOB credentials are
 * configured. Only `encode`/`decode` are exposed, so every call goes
 * through the signing step.
 */
const l2Signed = (api: "clob" | "combosRfq"): Layer.Layer<API.Protocol> =>
  Layer.effect(
    API.Protocol,
    Effect.gen(function* () {
      const inner = yield* API.Protocol;
      return API.Protocol.of({
        encode: (args) =>
          Effect.gen(function* () {
            const request = yield* inner.encode(args);
            const resolve = yield* Credentials;
            const creds = yield* resolve;
            if (creds.clob === undefined) return request;
            return yield* withL2Headers(request, creds.clob, creds.baseUrls[api]);
          }) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
        decode: inner.decode,
      });
    }),
  ).pipe(Layer.provide(rest(api)));

export const GammaProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ rest("gamma");
export const DataProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ rest("data");
export const BridgeProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ rest("bridge");

export const ClobProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ l2Signed("clob");
export const CombosRfqProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ l2Signed("combosRfq");

export const RelayerProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ rest(
  "relayer",
  (creds): Record<string, string> =>
    creds.relayer === undefined
      ? {}
      : {
          RELAYER_API_KEY: Redacted.value(creds.relayer.apiKey),
          RELAYER_API_KEY_ADDRESS: creds.relayer.address,
        },
);

export const PerpsProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ rest(
  "perps",
  (creds): Record<string, string> =>
    creds.perps === undefined
      ? {}
      : {
          "POLYMARKET-PROXY": creds.perps.proxy,
          "POLYMARKET-SECRET": Redacted.value(creds.perps.secret),
        },
);
