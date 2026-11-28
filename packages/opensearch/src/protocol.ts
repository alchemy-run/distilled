import * as Signer from "@distilled.cloud/aws4signer";
import { UnsignableBody } from "@distilled.cloud/aws4signer/AwsClient";
import type { ErrorOf, Protocol, ProtocolOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * OpenSearchProtocol -- hand-written.
 *
 * OpenSearch speaks JSON REST with no response envelope, so the request and
 * response handling is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> base URL + `Authorization` (basic or bearer),
 *             resolved from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload; non-2xx `{ error: { type, reason },
 *             status }` bodies map to the operation's typed error classes
 *             by status, then the shared HTTP-status classes, then
 *             {@link UnknownOpenSearchError}.
 *
 * With `sigv4` credentials, the encoded request is then signed with AWS
 * SigV4 (`@distilled.cloud/aws4signer`), with the body's SHA-256 sent as
 * `X-Amz-Content-Sha256`: OpenSearch Serverless requires that header.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { type Auth, Credentials } from "./credentials.ts";
import {
  OpenSearchParseError,
  UnknownOpenSearchError,
  type OpenSearchServiceError,
} from "./errors.ts";

/**
 * What every generated OpenSearch operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, OpenSearchOpError, OpenSearchOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type OpenSearchOpError = OpenSearchServiceError | ErrorOf<typeof OpenSearchProtocol>;

/** Context (requirements) shared by every generated OpenSearch operation. */
export type OpenSearchOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.flatten(Credentials);

const authorization = (auth: Auth): Record<string, string> => {
  switch (auth.type) {
    case "basic":
      return {
        Authorization: `Basic ${btoa(`${auth.username}:${Redacted.value(auth.password)}`)}`,
      };
    case "bearer":
      return { Authorization: `Bearer ${Redacted.value(auth.token)}` };
    case "none":
    case "sigv4":
      return {};
  }
};

/**
 * OpenSearch's error body is `{ error: { type, reason, ... }, status }`;
 * a few plugin routes answer `{ error: "<reason>" }` or `{ message }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const error = b.error;
  if (error !== null && typeof error === "object") {
    const e = error as Record<string, unknown>;
    return {
      code: typeof e.type === "string" ? e.type : undefined,
      message: typeof e.reason === "string" ? e.reason : undefined,
    };
  }
  if (typeof error === "string") return { message: error };
  if (typeof b.message === "string") return { message: b.message };
  return undefined;
};

const OpenSearchRestProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: resolveCredentials,
  baseUrl: (creds) => creds.endpoint,
  headers: (creds) => authorization(creds.auth),
  errorEnvelope,
  unknownError: (info) => new UnknownOpenSearchError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new OpenSearchParseError({ body, cause }),
});

/**
 * The request body as the signer hashes it. The REST protocol sends JSON and
 * NDJSON bodies as bytes or text; a stream or form-data body cannot be hashed.
 */
const bodyOf = (
  request: HttpClientRequest.HttpClientRequest,
): Signer.SignableBody | UnsignableBody => {
  const body = request.body;
  switch (body._tag) {
    case "Empty":
      return "";
    case "Uint8Array":
      return body.body;
    case "Raw":
      if (
        typeof body.body === "string" ||
        body.body instanceof ArrayBuffer ||
        ArrayBuffer.isView(body.body)
      ) {
        return body.body;
      }
  }
  return new UnsignableBody({ body: body._tag });
};

/**
 * `request` signed with SigV4 for `auth`. The signed URL replaces the
 * request's URL and query parameters, so the query goes out exactly as it
 * was signed (the same steps as `AwsClient.signRequest`, which cannot send
 * the payload hash).
 */
const signSigV4 = (
  request: HttpClientRequest.HttpClientRequest,
  auth: Extract<Auth, { readonly type: "sigv4" }>,
) =>
  Effect.gen(function* () {
    const url = Option.getOrUndefined(HttpClientRequest.toUrl(request));
    if (url === undefined) {
      return yield* new Signer.InvalidSigningUrl({
        url: request.url,
        cause: "not an absolute URL",
      });
    }
    url.hash = "";
    const body = bodyOf(request);
    if (body instanceof UnsignableBody) return yield* body;
    const signed = yield* Signer.sign({
      method: request.method,
      url: url.toString(),
      headers: request.headers,
      body,
      hashPayload: true,
      service: auth.service,
      region: auth.region,
      accessKeyId: auth.credentials.accessKeyId,
      secretAccessKey: auth.credentials.secretAccessKey,
      sessionToken: auth.credentials.sessionToken,
    });
    // The signed URL carries the query, so the request's own is dropped.
    url.search = "";
    const unsigned = HttpClientRequest.setUrl(request, url);
    return HttpClientRequest.setHeaders(
      HttpClientRequest.setUrl(unsigned, signed.url),
      signed.headers,
    );
  });

const openSearchProtocolMethods = {
  encode: (args) =>
    Effect.gen(function* () {
      const request = yield* OpenSearchRestProtocol.encode(args);
      const creds = yield* resolveCredentials;
      if (creds.auth.type !== "sigv4") return request;
      return yield* signSigV4(request, creds.auth);
    }),
  decode: OpenSearchRestProtocol.decode,
} satisfies Protocol<unknown, unknown>;

/**
 * The REST protocol, with requests signed when the credentials are `sigv4`.
 * Only `encode`/`decode` are exposed, so every call goes through signing.
 */
export const OpenSearchProtocol: ProtocolOf<typeof openSearchProtocolMethods> =
  openSearchProtocolMethods;
