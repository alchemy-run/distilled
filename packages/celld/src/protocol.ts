import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
import type * as HttpClient from "effect/http/HttpClient";
import * as Predicate from "effect/Predicate";
import { Endpoint, endpoint } from "./endpoint.ts";
import { CelldParseError, UnknownCelldError, type CelldServiceError } from "./errors.ts";

export type CelldOpContext = Endpoint | HttpClient.HttpClient;
/**
 * The errors declared on Celld's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link CelldParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownCelldError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type CelldProtocolError = RestProtocolError | CelldParseError | UnknownCelldError;

/**
 * What every generated Celld operation fails with besides its own errors: the
 * service's errors and the protocol's. Reading the {@link Endpoint} fails
 * with nothing. Generated service files annotate operations with
 * `API.OperationMethod<I, O, CelldOpError, CelldOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type CelldOpError = CelldServiceError | CelldProtocolError;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.

/** Standard REST encoding; signed runtime headers are explicit modeled inputs. */
export const CelldProtocol: Protocol<CelldProtocolError, Endpoint> = /*@__PURE__*/ restProtocol({
  credentials: endpoint,
  baseUrl: (url) => url,
  headers: () => ({}),
  errorEnvelope: (body) => {
    if (!Predicate.isObject(body)) return undefined;
    if (
      body.ok === false &&
      Predicate.isObject(body.error) &&
      typeof body.error.kind === "string" &&
      typeof body.error.reason === "string"
    ) {
      return { message: `${body.error.kind}: ${body.error.reason}` };
    }
    return {
      code: typeof body.code === "string" || typeof body.code === "number" ? body.code : undefined,
      message:
        typeof body.message === "string"
          ? body.message
          : typeof body.error === "string"
            ? body.error
            : undefined,
    };
  },
  unknownError: (info) => new UnknownCelldError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new CelldParseError({ body, cause }),
});
