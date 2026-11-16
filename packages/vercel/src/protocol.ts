import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  type RestProtocolError,
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * VercelProtocol -- the shared bearer-REST protocol instantiated for Vercel.
 *
 * Vercel speaks plain JSON with no success envelope: a list endpoint returns
 * its collection object (`{ projects: [...], pagination: {...} }`), a single
 * resource returns the object itself. FAILURES are enveloped, and uniformly
 * so -- `{ "error": { "code": "forbidden", "message": "Not authorized" } }` --
 * with `code` a machine-readable string that error matchers can key on.
 *
 * The API version is part of the PATH (`/v9/projects`, `/v5/domains`), not a
 * header, so each generated operation carries the version it was generated
 * from; a retired version answers 410 (see `Gone` in errors.ts).
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownVercelError, VercelParseError, type VercelServiceError } from "./errors.ts";

/**
 * The errors declared on Vercel's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link VercelParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownVercelError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type VercelProtocolError = RestProtocolError | VercelParseError | UnknownVercelError;

/**
 * What every generated Vercel operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, VercelOpError, VercelOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type VercelOpError = VercelServiceError | VercelProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Vercel operation. */
export type VercelOpContext = Credentials | HttpClient.HttpClient;

/**
 * Vercel error bodies nest under `error`: `{ error: { code, message } }`.
 * A handful of edge paths (proxy 502s, HTML error pages) answer without that
 * envelope -- those fall through to the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

// A failed status becomes the class the service declares for it
// (`VercelServiceErrors`: core's status classes, and the two statuses Vercel
// uses that core has no class for: 402, billing, and 410, a retired path
// version. Both are declared so broadly in the spec that leaving them out
// would funnel routine failures into UnknownVercelError).
//
// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const VercelProtocol: Protocol<VercelProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request; the Credentials service holds
    // an effect, so a token rotated between calls is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownVercelError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new VercelParseError({ body, cause }),
  });
