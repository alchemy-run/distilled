import { InternalServerError } from "@distilled.cloud/core/errors";
import type { DecodeArgs, EncodeArgs, Protocol } from "@distilled.cloud/core/protocol";
import {
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import { declaredStatusClass, unwrapRedactedDeep } from "@distilled.cloud/core/protocol-rest";
/**
 * AcmeProtocol -- hand-written.
 *
 * ACME (RFC 8555) is JSON over HTTPS with two twists the generic REST
 * protocol cannot express:
 *
 *   signing:    every POST body is a flattened JWS (RFC 8555 §6.2) signed by
 *               the account key from `Credentials`, carrying a fresh
 *               anti-replay nonce and the request URL in its protected
 *               header. `newAccount` embeds the public JWK; every later
 *               request references the account URL as `kid`. A CA-issued
 *               External Account Binding is attached to `newAccount` when
 *               the credentials carry one. Reads are "POST-as-GET" (empty
 *               payload).
 *
 *   addressing: the provider endpoint is the CA's **directory URL**. The
 *               protocol fetches the directory once per CA and resolves
 *               `newNonce`/`newAccount`/`newOrder`/`revokeCert` from it;
 *               every other operation names its resource by the absolute
 *               URL the CA returned (`url` label).
 *
 * Responses are JSON; `Location` (account/order URL), `Replay-Nonce` and
 * `Link` headers are folded into declared output members. Failures are
 * RFC 7807 problem documents matched on their `type` URN against the
 * operation's typed error classes; an unmatched URN is `UnknownAcmeError`.
 * A failure that is not a problem document becomes core's class for its
 * status, which the service declares (`AcmeServiceErrors`).
 */
import {
  failUnlessLenient,
  isValidating,
  validateResponse,
} from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import { httpSymbol, labelSymbol } from "@distilled.cloud/core/trait";
import * as Effect from "effect/Effect";
import type * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  AcmeParseError,
  DirectoryMissingResource,
  JoseError,
  UnknownAcmeError,
  type AcmeServiceError,
} from "./errors.ts";
import { parseJwk, signExternalAccountBinding, signRequest, type SignOptions } from "./jose.ts";

/**
 * The errors declared on ACME's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link AcmeParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownAcmeError}, and
 * `InternalServerError` for a 5xx), an account key that can't sign or an
 * operation without a resource URL ({@link JoseError}), a directory without
 * the resource ({@link DirectoryMissingResource}), and the transport or a
 * body read (`HttpClientError`): the protocol fetches the directory and
 * nonces itself.
 */
export type AcmeProtocolError =
  | AcmeParseError
  | UnknownAcmeError
  | InternalServerError
  | JoseError
  | DirectoryMissingResource
  | HttpClientError.HttpClientError;

/**
 * What every generated ACME operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, AcmeOpError, AcmeOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type AcmeOpError =
  | AcmeServiceError
  | AcmeProtocolError
  | CredentialsError
  // Not the protocol's: core fails a call with it when the operation can't
  // be loaded (`API.make`), and its type does not say so yet.
  | SdkError;

/** Context (requirements) shared by every generated ACME operation. */
export type AcmeOpContext = Credentials | HttpClient.HttpClient;

// =============================================================================
// Directory + nonce caches (per CA, process-wide)
// =============================================================================

const DirectorySchema = /*@__PURE__*/ Schema.Struct({
  newNonce: Schema.String,
  newAccount: Schema.String,
  newOrder: Schema.String,
  revokeCert: Schema.String,
  newAuthz: /*@__PURE__*/ Schema.optional(Schema.String),
  keyChange: /*@__PURE__*/ Schema.optional(Schema.String),
  meta: /*@__PURE__*/ Schema.optional(/*@__PURE__*/ Schema.Record(Schema.String, Schema.Unknown)),
});
type Directory = typeof DirectorySchema.Type;

const directories = /*@__PURE__*/ new Map<string, Directory>();
/** The last unused `Replay-Nonce` per directory URL. Nonces are single-use. */
const nonces = /*@__PURE__*/ new Map<string, string>();

type SigningContext = Omit<SignOptions, "nonce"> & {
  readonly directoryUrl: string;
};
// HTTP request copies preserve the body identity; entries live only with a request.
const signedRequests = /*@__PURE__*/ new WeakMap<HttpBody.HttpBody, SigningContext>();

const resolveCredentials = /*@__PURE__*/ Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

const fetchDirectory = (directoryUrl: string) =>
  Effect.gen(function* () {
    const cached = directories.get(directoryUrl);
    if (cached) return cached;
    const client = yield* HttpClient.HttpClient;
    const response = yield* client.get(directoryUrl);
    rememberNonce(directoryUrl, response);
    if (response.status >= 400) {
      const text = yield* response.text;
      return yield* Effect.fail(
        new UnknownAcmeError({
          message: `GET ${directoryUrl} answered ${response.status}`,
          status: response.status,
          body: Redacted.make(text),
        }),
      );
    }
    const text = yield* response.text;
    const json = yield* parseJson(text);
    const directory = yield* Schema.decodeUnknownEffect(DirectorySchema)(json).pipe(
      Effect.mapError(() => parseError("Invalid ACME directory response")),
    );
    directories.set(directoryUrl, directory);
    return directory;
  });

const rememberNonce = (
  directoryUrl: string,
  response: HttpClientResponse.HttpClientResponse,
): void => {
  const nonce = response.headers["replay-nonce"];
  if (typeof nonce === "string" && nonce.length > 0) {
    nonces.set(directoryUrl, nonce);
  }
};

/** Take the cached nonce for this CA, or fetch a fresh one from `newNonce`. */
const takeNonce = (directoryUrl: string, directory: Directory) =>
  Effect.gen(function* () {
    const cached = nonces.get(directoryUrl);
    if (cached !== undefined) {
      nonces.delete(directoryUrl);
      return cached;
    }
    const client = yield* HttpClient.HttpClient;
    const response = yield* client.execute(HttpClientRequest.head(directory.newNonce));
    const nonce = response.headers["replay-nonce"];
    if (typeof nonce !== "string" || nonce.length === 0) {
      return yield* Effect.fail(
        new UnknownAcmeError({
          message: `HEAD ${directory.newNonce} returned no Replay-Nonce header`,
          status: response.status,
          body: undefined,
        }),
      );
    }
    return nonce;
  });

// =============================================================================
// Encode
// =============================================================================

/**
 * The generated operations carry no name at runtime; the input's `T.Http`
 * uri (from the Smithy model) identifies which ACME resource an
 * operation addresses.
 */
const OPERATIONS_BY_URI: Record<string, string> = {
  "/directory": "GetDirectory",
  "/newNonce": "NewNonce",
  "/newAccount": "NewAccount",
  "/account/{url}": "UpdateAccount",
  "/newOrder": "NewOrder",
  "/order/{url}": "GetOrder",
  "/finalize/{url}": "FinalizeOrder",
  "/authz/{url}": "GetAuthorization",
  "/authz/{url}/deactivate": "DeactivateAuthorization",
  "/challenge/{url}": "RespondChallenge",
  "/cert/{url}": "DownloadCertificate",
  "/revokeCert": "RevokeCertificate",
};

const operationOf = (inputAst: AST.AST): string => {
  const http = getAnn(inputAst, httpSymbol) as { uri?: string } | undefined;
  return OPERATIONS_BY_URI[http?.uri ?? ""] ?? "";
};

/** Operations resolved from the directory rather than an input `url`. */
const DIRECTORY_OPERATIONS: Record<string, keyof Directory> = {
  NewNonce: "newNonce",
  NewAccount: "newAccount",
  NewOrder: "newOrder",
  RevokeCertificate: "revokeCert",
};

/** Operations whose payload is the empty POST-as-GET. */
const POST_AS_GET = /*@__PURE__*/ new Set(["GetOrder", "GetAuthorization", "DownloadCertificate"]);

const JOSE_ACCEPT = "application/json, application/pem-certificate-chain";

const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const creds = yield* resolveCredentials;
    const operation = operationOf(inputAst);
    if (operation === "") {
      return yield* Effect.fail(
        new JoseError({
          message: "The operation's input carries no known ACME `T.Http` uri.",
        }),
      );
    }

    if (operation === "GetDirectory") {
      return HttpClientRequest.get(creds.directoryUrl).pipe(
        HttpClientRequest.setHeader("Accept", "application/json"),
      );
    }

    const directory = yield* fetchDirectory(creds.directoryUrl);

    if (operation === "NewNonce") {
      return HttpClientRequest.head(directory.newNonce);
    }

    // Resolve the request URL: from the directory for the well-known
    // resources, else the absolute `url` label the CA handed back.
    const inputObj = (unwrapRedactedDeep(input) ?? {}) as Record<string, unknown>;
    const directoryKey = DIRECTORY_OPERATIONS[operation];
    let url: string;
    if (directoryKey !== undefined) {
      const resolved = directory[directoryKey];
      if (typeof resolved !== "string") {
        return yield* Effect.fail(
          new DirectoryMissingResource({
            resource: directoryKey,
            directoryUrl: creds.directoryUrl,
          }),
        );
      }
      url = resolved;
    } else {
      const label = getProps(inputAst).find((p) => hasPropAnn(p, labelSymbol));
      const value = label ? inputObj[String(label.name)] : undefined;
      if (typeof value !== "string") {
        return yield* Effect.fail(
          new JoseError({
            message: `${operation} needs the resource URL the CA returned (\`url\`).`,
          }),
        );
      }
      url = value;
    }

    // The payload: every input member that isn't the URL label, or the
    // empty POST-as-GET for reads.
    let payload: unknown;
    if (!POST_AS_GET.has(operation)) {
      const body: Record<string, unknown> = {};
      for (const prop of getProps(inputAst)) {
        if (hasPropAnn(prop, labelSymbol)) continue;
        const key = String(prop.name);
        if (inputObj[key] !== undefined) body[key] = inputObj[key];
      }
      payload = body;
    }

    const jwk = yield* parseJwk(creds.accountKey);
    // `newAccount` proves the key by embedding it; a CA that requires an
    // External Account Binding gets it from the credentials unless the
    // caller built one.
    const embedKey = operation === "NewAccount" || creds.accountUrl === undefined;
    if (
      operation === "NewAccount" &&
      creds.externalAccountBinding !== undefined &&
      (payload as Record<string, unknown>).externalAccountBinding === undefined
    ) {
      (payload as Record<string, unknown>).externalAccountBinding =
        yield* signExternalAccountBinding({
          jwk,
          url,
          keyId: creds.externalAccountBinding.keyId,
          hmacKey: creds.externalAccountBinding.hmacKey,
        });
    }

    const nonce = yield* takeNonce(creds.directoryUrl, directory);
    const signing: SigningContext = {
      jwk,
      url,
      kid: embedKey ? undefined : creds.accountUrl,
      payload,
      directoryUrl: creds.directoryUrl,
    };
    const request = yield* signedRequest(signing, nonce);
    signedRequests.set(request.body, signing);
    return request;
  });

const signedRequest = (signing: SigningContext, nonce: string) =>
  Effect.gen(function* () {
    const jws = yield* signRequest({ ...signing, nonce });
    return HttpClientRequest.post(signing.url).pipe(
      HttpClientRequest.setHeader("Accept", JOSE_ACCEPT),
      HttpClientRequest.bodyText(JSON.stringify(jws), "application/jose+json"),
    );
  });

// =============================================================================
// Decode
// =============================================================================

interface Problem {
  readonly type?: string;
  readonly detail?: string;
  readonly status?: number;
  readonly subproblems?: ReadonlyArray<unknown>;
}

const isProblem = (value: unknown): value is Problem =>
  isObject(value) && typeof value.type === "string";

const parseLinkAlternates = (link: string | undefined): string[] => {
  if (!link) return [];
  const out: string[] = [];
  for (const part of link.split(",")) {
    const match = part.match(/<([^>]+)>\s*;\s*rel="?alternate"?/);
    if (match) out.push(match[1]!);
  }
  return out;
};

const decode = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
  Effect.gen(function* () {
    const signing = signedRequests.get(response.request.body);
    signedRequests.delete(response.request.body);
    const directoryUrl = signing?.directoryUrl ?? (yield* resolveCredentials).directoryUrl;

    for (let retries = 0; ; retries++) {
      const headers = response.headers as Record<string, string | undefined>;
      const status = response.status;
      const isNewNonce = response.request.method === "HEAD";
      const isCertificate = (headers["content-type"] ?? "").includes("pem-certificate-chain");
      const text = isNewNonce ? "" : yield* response.text;
      const json =
        isNewNonce || (isCertificate && status < 400)
          ? undefined
          : yield* parseJson(text).pipe(
              // A non-JSON 2xx fails unless lenient; lenient returns
              // the text as read.
              Effect.catchTag("AcmeParseError", (error) =>
                status >= 400
                  ? Effect.succeed(undefined)
                  : failUnlessLenient<unknown, typeof error>(error, text),
              ),
            );
      const problem = status >= 400 && isProblem(json) ? json : undefined;
      const badNonce = problem?.type === "urn:ietf:params:acme:error:badNonce";
      if (badNonce) {
        const nonce = headers["replay-nonce"];
        // Rejection nonces belong only to this request, never to the shared cache.
        if (signing && nonce && retries < 2) {
          const client = yield* HttpClient.HttpClient;
          response = yield* client.execute(yield* signedRequest(signing, nonce));
          continue;
        }
      } else {
        rememberNonce(directoryUrl, response);
      }

      if (status >= 400) {
        if (problem) {
          // Matchers key on the problem's `type` URN (a body pointer); the
          // message is the problem's `detail`, and core fills the declared
          // `type`, `detail` and `retryAfter`.
          const typed = matchTypedError(
            errorClasses,
            status,
            [{ code: status, message: problem.detail ?? problem.type ?? `HTTP ${status}` }],
            { body: problem, headers },
          );
          if (typed !== undefined) return yield* Effect.fail(typed);
          return yield* Effect.fail(
            new UnknownAcmeError({
              type: problem.type,
              detail: problem.detail,
              subproblems: problem.subproblems,
              message: problem.detail ?? problem.type,
              status,
              body: Redacted.make(json),
            }),
          );
        }
        const message = `HTTP ${status}`;
        const StatusClass = declaredStatusClass(status, errorClasses);
        if (StatusClass) {
          return yield* Effect.fail(
            new StatusClass({
              message,
              retryAfter: parseRetryAfterForStatus(status, headers),
            }),
          );
        }
        if (status >= 500) {
          return yield* Effect.fail(
            new InternalServerError({
              message,
              retryAfter: parseRetryAfterForStatus(status, headers),
            }),
          );
        }
        return yield* Effect.fail(
          new UnknownAcmeError({
            message,
            status,
            body: Redacted.make(json ?? text),
          }),
        );
      }

      let body: Record<string, unknown>;
      if (isNewNonce) {
        body = { replayNonce: headers["replay-nonce"] || undefined };
      } else if (isCertificate) {
        body = {
          chain: text,
          alternates: parseLinkAlternates(headers["link"]),
        };
      } else if (isObject(json)) {
        body = json;
        // Only outputs that declare `location` get it; elsewhere strict mode
        // would reject it as an unmodeled key.
        const location = headers["location"];
        if (location && getProps(outputAst).some((p) => p.name === "location"))
          body = { ...body, location };
      } else {
        // Lenient mode returns a non-object body as read.
        if (!(yield* isValidating)) return json;
        return yield* Effect.fail(parseError("Expected a JSON object"));
      }
      // Validating modes (core/response-validation) check the output schema.
      return yield* validateResponse(outputAst, mapKeys(outputAst, body, "decode"), () =>
        parseError("Response does not match the output schema"),
      );
    }
  });

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseError = (cause: string) =>
  new AcmeParseError({
    body: "[REDACTED]",
    cause,
  });

const parseJson = (text: string) =>
  Effect.try({
    try: (): unknown => (text.trim().length > 0 ? JSON.parse(text) : {}),
    catch: () => parseError("Invalid JSON response"),
  });

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const AcmeProtocol: Protocol<
  AcmeProtocolError | CredentialsError,
  Credentials | HttpClient.HttpClient
> = {
  encode,
  decode,
};

/** Forget cached directories and nonces (tests, CA switches). */
export const resetProtocolCaches = (): void => {
  directories.clear();
  nonces.clear();
};

/** @internal re-exported for tests */
export const _internal = { getAnn, Redacted };
