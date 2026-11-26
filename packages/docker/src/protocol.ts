import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * DockerProtocol -- hand-written.
 *
 * Docker Engine speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> optional `Authorization: Bearer <apiKey>` +
 *             base URL (default http://localhost/v1.56), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownDockerError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownDockerError, DockerParseError, type DockerServiceError } from "./errors.ts";

/**
 * What every generated Docker operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, DockerOpError, DockerOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type DockerOpError = DockerServiceError | ErrorOf<typeof DockerProtocol>;

/** Context (requirements) shared by every generated Docker operation. */
export type DockerOpContext = Credentials | HttpClient.HttpClient;

export const DockerProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds): Record<string, string> => {
    const headers: Record<string, string> = {};
    if (creds.apiKey !== undefined) {
      headers.Authorization = `Bearer ${Redacted.value(creds.apiKey)}`;
    }
    return headers;
  },
  // Docker's error body is `{ message: string }` -- the factory's default
  // lenient envelope covers it.
  unknownError: (info) => new UnknownDockerError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new DockerParseError({ body, cause }),
});
