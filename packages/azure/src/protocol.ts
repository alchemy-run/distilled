import { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import type {
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import {
  buildRequest,
  getAnn,
  mapKeys,
  responseHeaderMembers,
  withResponseHeaders,
} from "@distilled.cloud/core/protocol-http";
import { unwrapRedactedDeep, validateSuccess } from "@distilled.cloud/core/protocol-rest";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import { httpSymbol } from "@distilled.cloud/core/trait";
/**
 * AzureProtocol -- hand-written.
 *
 * Speaks Azure Resource Manager's bearer-authenticated JSON REST protocol.
 * The generic request/response machinery lives in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Azure's own (which is why this is a bespoke protocol rather than a
 * `restProtocol` instantiation). Data-plane operations use
 * `AzureDataPlaneProtocol` (`./data-plane-protocol.ts`) instead, so an
 * ARM-only program never bundles the data-plane code.
 *
 *   request:  `Authorization: Bearer <token>` with the token for the ARM
 *             scope of `apiBaseUrl` (default https://management.azure.com),
 *             resolved from the calling fiber on every request; a
 *             `{subscriptionId}` path placeholder the caller didn't fill is
 *             injected from credentials; the operation's baked `apiVersion`
 *             (see `traits.ts`) is appended as `?api-version=` -- ARM
 *             requires it on every call
 *
 *             pageable operations (`x-ms-pageable`, see convert.ts): an
 *             input carrying a page's `nextLink` is a GET of that URL as-is,
 *             with the same auth, when it stays on the ARM endpoint; core's
 *             cursor strategy feeds each page's `nextLink` back in
 *             (`.pages()` / `.items()`)
 *
 *   response: 2xx JSON is the payload (no envelope; sensitive members
 *             delivered as `Redacted`); errors are matched first against the
 *             operation's own typed errors, then like distilled v0's Azure
 *             client (`./protocol-common.ts`):
 *               1. ARM envelope `{ error: { code, message, target } }` (flat
 *                  `{ code, message }` fallback) -> `AZURE_ERROR_CODE_MAP`
 *                  dispatch on `error.code`
 *               2. core's class for the status (Retry-After honored via
 *                  `parseRetryAfterForStatus`)
 *               3. any other 5xx -> retryable `InternalServerError`
 *               4. `UnknownAzureError` catch-all
 *             The classes of steps 1 and 2 are the service's errors
 *             (`AzureServiceErrors`): the protocol builds one only from the
 *             classes the operation lists.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import { Credentials, armScopeFor } from "./credentials-service.ts";
import type { AzureDataPlaneProtocol } from "./data-plane-protocol.ts";
import { AzureParseError, type AzureServiceError } from "./errors.ts";
import {
  configuredSubscriptionId,
  failResponse,
  nextLinkOf,
  parseArmError,
  parseBody,
  resolveNextLink,
  withoutMember,
} from "./protocol-common.ts";
import type { HttpTrait } from "./traits.ts";

/**
 * What every generated Azure operation, ARM and data plane, fails with
 * besides its own errors: the service's errors, the two protocols', and
 * what resolving the credentials fails with. Generated service files
 * annotate operations with `API.OperationMethod<I, O, AzureOpError,
 * AzureOpContext>` explicitly so the compiler never infers these back out
 * of the schema generics.
 */
export type AzureOpError =
  | AzureServiceError
  | ErrorOf<typeof AzureProtocol | typeof AzureDataPlaneProtocol>;

/** Context (requirements) shared by every generated Azure operation. */
export type AzureOpContext = Credentials | HttpClient.HttpClient;

/** `url` with `pair` appended to its query. */
const withQuery = (url: string, pair: string): string =>
  `${url}${url.includes("?") ? "&" : "?"}${pair}`;

// ---------------------------------------------------------------------------
// Encode
// ---------------------------------------------------------------------------

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const creds = yield* yield* Credentials;
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    // A data-plane operation names its own host and token audience; sent
    // here it would get the ARM token at the ARM endpoint. The generator
    // never wires one to this protocol, so this is a hand-made op's bug.
    if (http?.host !== undefined) {
      return yield* Effect.fail(
        new SdkError({
          message: `${http.uri} names a host: use AzureDataPlaneProtocol for data-plane operations`,
        }),
      );
    }
    const unwrapped = unwrapRedactedDeep(input);
    const baseUrl = creds.apiBaseUrl;

    // Pageable operations: a page's `nextLink` is never sent as a member.
    // It is checked before a token is minted: it must stay on the endpoint.
    const nextLink = nextLinkOf(http, unwrapped);
    const fields =
      http?.nextLink !== undefined ? withoutMember(unwrapped, http.nextLink) : unwrapped;
    const nextUrl = nextLink !== undefined ? resolveNextLink(nextLink, baseUrl) : undefined;
    if (nextLink !== undefined && nextUrl === undefined) {
      return yield* Effect.fail(
        new InvalidInput({
          member: http!.nextLink!,
          message: `${http!.nextLink} must be a page link on ${baseUrl}; the credentials are only sent there`,
        }),
      );
    }

    const token = yield* creds.token(armScopeFor(baseUrl));
    const headers: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(token)}`,
      // ARM speaks JSON; without this, some resource providers negotiate
      // another media type (API Management returns policies as raw XML).
      Accept: http?.accept ?? "application/json",
      ...http?.headers,
    };

    // The next page: GET its `nextLink` as-is with the same auth. The link
    // already carries `api-version` and the skip token; a version is added
    // only when the link has none.
    if (nextUrl !== undefined) {
      const url =
        http?.apiVersion && !/[?&]api-version=/.test(nextUrl)
          ? // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `apiVersion` is the SDK's own data: the version the generator put in the operation's Http trait
            withQuery(nextUrl, `api-version=${encodeURIComponent(http.apiVersion)}`)
          : nextUrl;
      return HttpClientRequest.setHeaders(HttpClientRequest.get(url), headers);
    }

    let request = yield* buildRequest({ input: fields, inputAst, baseUrl, headers });

    // Azure-specific URL rewrites, applied to the built request:
    //  1. `{subscriptionId}` left unfilled by the caller is injected from
    //     credentials (v0 parity: users set AZURE_SUBSCRIPTION_ID once and
    //     individual operations pick it up automatically).
    //  2. Constant query parameters a patch declares.
    //  3. ARM requires `api-version` on every call -- the version baked into
    //     the operation's Http trait at generation time is appended unless
    //     the URL already carries one.
    let url = request.url;
    if (url.includes("{subscriptionId}")) {
      const subscriptionId = configuredSubscriptionId(creds, http?.uri);
      if (subscriptionId instanceof ConfigError) return yield* Effect.fail(subscriptionId);
      url = url.split("{subscriptionId}").join(subscriptionId);
    }
    for (const [key, value] of Object.entries(http?.query ?? {})) {
      url = withQuery(
        url,
        // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `http.query` is the SDK's own data: the constant query a patch declares on the operation
        value === "" ? encodeURIComponent(key) : `${key}=${encodeURIComponent(value)}`,
      );
    }
    if (http?.apiVersion && !/[?&]api-version=/.test(url)) {
      // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `apiVersion` is the SDK's own data: the version the generator put in the operation's Http trait
      url = withQuery(url, `api-version=${encodeURIComponent(http.apiVersion)}`);
    }
    if (url !== request.url) {
      request = HttpClientRequest.setUrl(request, url);
    }
    return request;
  });

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

const decode = ({ response, outputAst, errors }: DecodeArgs) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly -- error pages are often non-JSON.
    // A body read that fails (reset or abort mid-body) fails the call with
    // its `HttpClientError`.
    const read = parseBody((yield* response.text) ?? "");
    const { text, json, nonJson } = read;
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const arm = nonJson ? undefined : parseArmError(json);
      return yield* failResponse({ status, headers, read, arm, errors });
    }

    // 2xx: the response body IS the payload (ARM has no success envelope),
    // plus the response headers the output declares -- the
    // `Azure-AsyncOperation` / `Location` status monitor of a long-running
    // operation's 202, for example.
    // Wire->TS key mapping is schema-driven; `RawResponseRoot` responses are
    // the body verbatim (mapKeys handles arrays/scalars structurally either
    // way). Strict mode (core/response-validation) checks the mapped body
    // against the output schema. Sensitive members are delivered as
    // `Redacted`, and parse errors withhold a body that can hold a secret
    // (core `validateSuccess`).
    const body: unknown = nonJson ? text : json === undefined ? {} : json;
    return yield* validateSuccess(
      outputAst,
      {
        value: withResponseHeaders(
          responseHeaderMembers(outputAst),
          mapKeys(outputAst, body, "decode"),
          headers,
        ),
        body: nonJson ? text : json,
        nonJson,
      },
      (info) => new AzureParseError(info),
    );
  });

const azureProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

export const AzureProtocol: ProtocolOf<typeof azureProtocolMethods> = azureProtocolMethods;
