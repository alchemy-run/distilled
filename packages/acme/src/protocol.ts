/**
 * AcmeProtocol — hand-written.
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
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import type * as HttpBody from "effect/unstable/http/HttpBody";
import type * as AST from "effect/SchemaAST";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import {
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
} from "@distilled.cloud/core/protocol-http";
import { unwrapRedactedDeep } from "@distilled.cloud/core/protocol-rest";
import {
  getErrorMatchers,
  httpSymbol,
  labelSymbol,
} from "@distilled.cloud/core/trait";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import {
  parseRetryAfter,
  parseRetryAfterForStatus,
} from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import {
  AcmeParseError,
  DirectoryMissingResource,
  JoseError,
  UnknownAcmeError,
  type DefaultErrors,
} from "./errors.ts";
import {
  parseJwk,
  signExternalAccountBinding,
  signRequest,
  type SignOptions,
} from "./jose.ts";

/**
 * Error channel shared by every generated ACME operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, AcmeOpError,
 * AcmeOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type AcmeOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated ACME operation. */
export type AcmeOpContext = Credentials | HttpClient.HttpClient;

// =============================================================================
// Directory + nonce caches (per CA, process-wide)
// =============================================================================

const DirectorySchema = Schema.Struct({
  newNonce: Schema.String,
  newAccount: Schema.String,
  newOrder: Schema.String,
  revokeCert: Schema.String,
  newAuthz: Schema.optional(Schema.String),
  keyChange: Schema.optional(Schema.String),
  meta: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
});
type Directory = typeof DirectorySchema.Type;

const directories = new Map<string, Directory>();
/** The last unused `Replay-Nonce` per directory URL. Nonces are single-use. */
const nonces = new Map<string, string>();

type SigningContext = Omit<SignOptions, "nonce"> & {
  readonly directoryUrl: string;
};
// HTTP request copies preserve the body identity; entries live only with a request.
const signedRequests = new WeakMap<HttpBody.HttpBody, SigningContext>();

const resolveCredentials = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve as Effect.Effect<Config>;
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
      return yield* fail(
        new UnknownAcmeError({
          message: `GET ${directoryUrl} answered ${response.status}`,
          status: response.status,
          body: Redacted.make(text),
        }),
      );
    }
    const text = yield* response.text;
    const json = yield* parseJson(text);
    const directory = yield* Schema.decodeUnknownEffect(DirectorySchema)(
      json,
    ).pipe(
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
    const response = yield* client.execute(
      HttpClientRequest.head(directory.newNonce),
    );
    const nonce = response.headers["replay-nonce"];
    if (typeof nonce !== "string" || nonce.length === 0) {
      return yield* fail(
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
const POST_AS_GET = new Set([
  "GetOrder",
  "GetAuthorization",
  "DownloadCertificate",
]);

const JOSE_ACCEPT = "application/json, application/pem-certificate-chain";

const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
  readonly config: API.ProtocolOperationConfig;
}) =>
  Effect.gen(function* () {
    const creds = yield* resolveCredentials;
    const operation = operationOf(inputAst);
    if (operation === "") {
      return yield* fail(
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
    const inputObj = (unwrapRedactedDeep(input) ?? {}) as Record<
      string,
      unknown
    >;
    const directoryKey = DIRECTORY_OPERATIONS[operation];
    let url: string;
    if (directoryKey !== undefined) {
      const resolved = directory[directoryKey];
      if (typeof resolved !== "string") {
        return yield* fail(
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
        return yield* fail(
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
    const embedKey =
      operation === "NewAccount" || creds.accountUrl === undefined;
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

/**
 * Match a problem document against the operation's typed error classes by
 * its `type` URN (the matcher's `message` rule is applied to the URN, so a
 * patch writes `{ "message": { "matches": "^urn:ietf:params:acme:error:badNonce$" } }`).
 */
const matchProblem = (
  errorClasses: ReadonlyArray<unknown>,
  status: number,
  problem: Problem,
  headers: Record<string, string | undefined>,
): unknown | undefined => {
  const urn = problem.type ?? "";
  let best: { cls: unknown; specificity: number } | undefined;
  for (const cls of errorClasses) {
    const matchers = getErrorMatchers(cls);
    if (!matchers) continue;
    for (const m of matchers) {
      if (m.status !== undefined && m.status !== status) continue;
      if (m.code !== undefined && m.code !== status) continue;
      const rule = m.message;
      let hit = false;
      if (rule === undefined) hit = true;
      else if (typeof rule === "string") hit = rule === urn;
      else if (rule.matches !== undefined)
        hit = new RegExp(rule.matches).test(urn);
      else if (rule.includes !== undefined) hit = urn.includes(rule.includes);
      if (!hit) continue;
      const specificity =
        (m.status !== undefined ? 1 : 0) + (rule !== undefined ? 2 : 0);
      if (!best || specificity > best.specificity) best = { cls, specificity };
    }
  }
  if (!best) return undefined;
  return new (best.cls as new (args: any) => unknown)({
    code: status,
    message: problem.detail ?? urn,
    type: urn,
    detail: problem.detail,
    subproblems: problem.subproblems,
    ...(urn === "urn:ietf:params:acme:error:rateLimited"
      ? { retryAfter: parseRetryAfter(headers) }
      : {}),
  });
};

const parseLinkAlternates = (link: string | undefined): string[] => {
  if (!link) return [];
  const out: string[] = [];
  for (const part of link.split(",")) {
    const match = part.match(/<([^>]+)>\s*;\s*rel="?alternate"?/);
    if (match) out.push(match[1]!);
  }
  return out;
};

const decode = ({
  response,
  outputAst,
  errors: errorClasses,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
  readonly config: API.ProtocolOperationConfig;
}) =>
  Effect.gen(function* () {
    const signing = signedRequests.get(response.request.body);
    signedRequests.delete(response.request.body);
    const directoryUrl =
      signing?.directoryUrl ?? (yield* resolveCredentials).directoryUrl;

    for (let retries = 0; ; retries++) {
      const headers = response.headers as Record<string, string | undefined>;
      const status = response.status;
      const isNewNonce = response.request.method === "HEAD";
      const isCertificate = (headers["content-type"] ?? "").includes(
        "pem-certificate-chain",
      );
      const text = isNewNonce ? "" : yield* response.text;
      const json =
        isNewNonce || (isCertificate && status < 400)
          ? undefined
          : yield* parseJson(text).pipe(
              Effect.catchTag("AcmeParseError", (error) =>
                status >= 400 ? Effect.succeed(undefined) : Effect.fail(error),
              ),
            );
      const problem = status >= 400 && isProblem(json) ? json : undefined;
      const badNonce = problem?.type === "urn:ietf:params:acme:error:badNonce";
      if (badNonce) {
        const nonce = headers["replay-nonce"];
        // Rejection nonces belong only to this request, never to the shared cache.
        if (signing && nonce && retries < 2) {
          const client = yield* HttpClient.HttpClient;
          response = yield* client.execute(
            yield* signedRequest(signing, nonce),
          );
          continue;
        }
      } else {
        rememberNonce(directoryUrl, response);
      }

      if (status >= 400) {
        if (problem) {
          const typed = matchProblem(errorClasses, status, problem, headers);
          if (typed !== undefined) return yield* fail(typed);
          return yield* fail(
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
        const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[
          status
        ] as
          | (new (args: {
              message: string;
              retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
            }) => unknown)
          | undefined;
        if (StatusClass) {
          return yield* fail(
            new StatusClass({
              message,
              retryAfter: parseRetryAfterForStatus(status, headers),
            }),
          );
        }
        if (status >= 500) {
          return yield* fail(
            new InternalServerError({
              message,
              retryAfter: parseRetryAfterForStatus(status, headers),
            }),
          );
        }
        return yield* fail(
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
      } else {
        if (!isObject(json))
          return yield* fail(parseError("Expected a JSON object"));
        body = json;
        const location = headers["location"];
        if (location) body = { ...body, location };
      }
      return yield* Schema.decodeUnknownEffect(
        Schema.make<Schema.Schema<unknown>>(outputAst),
      )(mapKeys(outputAst, body, "decode")).pipe(
        Effect.mapError(() =>
          parseError("Response does not match the output schema"),
        ),
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

const fail = <E>(error: E) => Effect.fail(error) as Effect.Effect<never, E>;

export const AcmeProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: (args) => decode(args) as Effect.Effect<unknown>,
  }),
);

/** Forget cached directories and nonces (tests, CA switches). */
export const resetProtocolCaches = (): void => {
  directories.clear();
  nonces.clear();
};

/** @internal re-exported for tests */
export const _internal = { getAnn, Redacted };
