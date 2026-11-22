import type { ErrorOf, Protocol, ProtocolOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import { Credentials, type BaseUrls, type ClobCredentials, type Config } from "./credentials.ts";
import {
  PolymarketParseError,
  UnknownPolymarketError,
  type PolymarketServiceError,
} from "./errors.ts";
import { signL2 } from "./signing.ts";

/**
 * What every generated Polymarket operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PolymarketOpError, PolymarketOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type PolymarketOpError =
  | PolymarketServiceError
  // A plain protocol and an L2-signed one: the others are built the same two ways.
  | ErrorOf<typeof GammaProtocol | typeof ClobProtocol>;

/** Context (requirements) shared by every generated Polymarket operation. */
export type PolymarketOpContext = Credentials | HttpClient.HttpClient;

// A failed status becomes the class the service declares for it
// (`PolymarketServiceErrors`: core's status classes, and `PayloadTooLarge`
// for 413).
const rest = (
  api: keyof BaseUrls,
  headers: (creds: Config) => Record<string, string> = () => ({}),
) =>
  restProtocol({
    // Resolved on the calling fiber per request.
    credentials: Credentials,
    baseUrl: (creds) => creds.baseUrls[api],
    headers,
    // Failure bodies are `{ error, code? }`, which the default envelope
    // reader already handles (`error` as the message).
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
const l2Signed = (api: "clob" | "combosRfq") => {
  const inner = rest(api);
  const methods = {
    encode: (args) =>
      Effect.gen(function* () {
        const request = yield* inner.encode(args);
        const resolve = yield* Credentials;
        const creds = yield* resolve;
        if (creds.clob === undefined) return request;
        return yield* withL2Headers(request, creds.clob, creds.baseUrls[api]);
      }),
    decode: inner.decode,
  } satisfies Protocol<unknown, unknown>;
  // Typed from the methods above: what they fail with, what they read.
  const protocol: ProtocolOf<typeof methods> = methods;
  return protocol;
};

export const GammaProtocol = /*@__PURE__*/ rest("gamma");
export const DataProtocol = /*@__PURE__*/ rest("data");
export const BridgeProtocol = /*@__PURE__*/ rest("bridge");

export const ClobProtocol = /*@__PURE__*/ l2Signed("clob");
export const CombosRfqProtocol = /*@__PURE__*/ l2Signed("combosRfq");

export const RelayerProtocol = /*@__PURE__*/ rest("relayer", (creds): Record<string, string> =>
  creds.relayer === undefined
    ? {}
    : {
        RELAYER_API_KEY: Redacted.value(creds.relayer.apiKey),
        RELAYER_API_KEY_ADDRESS: creds.relayer.address,
      },
);

export const PerpsProtocol = /*@__PURE__*/ rest("perps", (creds): Record<string, string> =>
  creds.perps === undefined
    ? {}
    : {
        "POLYMARKET-PROXY": creds.perps.proxy,
        "POLYMARKET-SECRET": Redacted.value(creds.perps.secret),
      },
);
