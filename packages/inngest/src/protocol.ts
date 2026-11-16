import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * InngestProtocol -- hand-written.
 *
 * Inngest speaks bearer-authenticated JSON REST. Success bodies keep the
 * `{ data, metadata, page? }` envelope the OpenAPI document describes.
 * Failures nest under `{ errors: [{ code, message }] }`.
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.inngest.com/v2; `/v1/` routes go to
 *             its origin), resolved from the calling fiber on every request;
 *             the `Environment` layer, when provided, as `X-Inngest-Env`
 *             (a call's own `xInngestEnv` wins)
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: [{ code, message }] }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownInngestError}.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config, type CredentialsError } from "./credentials.ts";
import { Environment } from "./environment.ts";
import { UnknownInngestError, InngestParseError, type InngestServiceError } from "./errors.ts";

/**
 * The errors declared on Inngest's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link InngestParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownInngestError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type InngestProtocolError = RestProtocolError | InngestParseError | UnknownInngestError;

/**
 * What every generated Inngest operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, InngestOpError, InngestOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type InngestOpError = InngestServiceError | InngestProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Inngest operation. */
export type InngestOpContext = Credentials | HttpClient.HttpClient;

/**
 * Inngest wraps failures as `{ errors: [{ code, message }] }`. Some 401
 * examples are a bare string (`"Authentication failed"`).
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (typeof body === "string") return { message: body };
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  if (Array.isArray(rec.errors) && rec.errors.length > 0) {
    const first = rec.errors[0];
    if (first !== null && typeof first === "object") {
      const err = first as Record<string, unknown>;
      const message = typeof err.message === "string" ? err.message : undefined;
      const code =
        typeof err.code === "string" || typeof err.code === "number" ? err.code : undefined;
      if (code !== undefined || message !== undefined) {
        return { code, message };
      }
    }
  }
  const message =
    typeof rec.message === "string"
      ? rec.message
      : typeof rec.error === "string"
        ? rec.error
        : undefined;
  const code = typeof rec.code === "string" || typeof rec.code === "number" ? rec.code : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

/** The resolved credentials plus the calling fiber's `Environment` layer, if any. */
interface Resolved extends Config {
  readonly environment?: string;
}

const resolveCredentials = /*@__PURE__*/ Effect.flatten(Credentials);

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const InngestProtocol: Protocol<InngestProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials
    // and the `Environment` layer.
    credentials: /*@__PURE__*/ Effect.withFiber(
      (fiber): Effect.Effect<Resolved, CredentialsError, Credentials> => {
        const environment = Context.getOrUndefined(fiber.context, Environment);
        return environment === undefined
          ? resolveCredentials
          : Effect.map(resolveCredentials, (creds): Resolved => ({ ...creds, environment }));
      },
    ),
    // v1 routes carry their own `/v1/` prefix and live at the base URL's
    // origin. URL.parse never throws: a malformed base URL fails like v2 calls.
    baseUrl: (creds, target) =>
      target.uri.startsWith("/v1/")
        ? (URL.parse(creds.apiBaseUrl)?.origin ?? creds.apiBaseUrl)
        : creds.apiBaseUrl,
    // Lowercase, so a call's own `xInngestEnv` header member replaces it.
    headers: (creds) => {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      };
      if (creds.environment !== undefined) headers["x-inngest-env"] = creds.environment;
      return headers;
    },
    errorEnvelope,
    unknownError: (info) => new UnknownInngestError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new InngestParseError({ body, cause }),
  });
