/**
 * The requests every token-minting provider makes: call a Google token
 * endpoint, turn its error body into a `GCPCredentialsError`, and read the
 * OAuth2 token response.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import type { Token } from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";

export const CLOUD_PLATFORM_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
export const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";

/** OAuth: `{ error, error_description }`; Google APIs: `{ error: { message } }`. */
const errorText = (body: unknown): string | undefined => {
  if (typeof body !== "object" || body === null) return undefined;
  const { error, error_description } = body as {
    error?: unknown;
    error_description?: unknown;
  };
  if (typeof error_description === "string") return error_description;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return undefined;
};

/**
 * Send `request` and return the body as text, failing with the endpoint's
 * own error text on a non-2xx status. `step` names the call in the message;
 * no message ever contains a credential.
 */
export const requestText = (
  step: string,
  request: HttpClientRequest.HttpClientRequest,
): Effect.Effect<
  { readonly text: string; readonly headers: Readonly<Record<string, string>> },
  GCPCredentialsError,
  HttpClient.HttpClient
> =>
  Effect.gen(function* () {
    const http = yield* HttpClient.HttpClient;
    const response = yield* http.execute(request);
    const text = yield* response.text;
    if (response.status < 200 || response.status >= 300) {
      let body: unknown;
      try {
        body = JSON.parse(text);
      } catch {
        body = undefined;
      }
      return yield* new GCPCredentialsError({
        message: `${step} failed with status ${response.status}: ${errorText(body) ?? text.slice(0, 200)}`,
        status: response.status,
      });
    }
    return { text, headers: response.headers };
  }).pipe(
    Effect.catchTag(
      "HttpClientError",
      (cause) => new GCPCredentialsError({ message: `${step} failed: ${cause.message}`, cause }),
    ),
  );

/** {@link requestText}, parsed as a JSON object. */
export const requestJson = (step: string, request: HttpClientRequest.HttpClientRequest) =>
  requestText(step, request).pipe(
    Effect.flatMap(({ text }) => {
      let body: unknown;
      try {
        body = JSON.parse(text);
      } catch {
        body = undefined;
      }
      return typeof body === "object" && body !== null
        ? Effect.succeed(body as Record<string, unknown>)
        : Effect.fail(
            new GCPCredentialsError({ message: `${step} returned a body that is not JSON.` }),
          );
    }),
  );

/**
 * An OAuth2 token response (`access_token`, `expires_in`). `issuedAt` is
 * when the request was sent, so the expiry errs early.
 */
export const oauthToken = (
  step: string,
  body: Record<string, unknown>,
  issuedAt: number,
): Effect.Effect<Token, GCPCredentialsError> => {
  if (typeof body.access_token !== "string") {
    return Effect.fail(new GCPCredentialsError({ message: `${step} returned no access_token.` }));
  }
  const expiresIn = typeof body.expires_in === "number" ? body.expires_in : 3600;
  return Effect.succeed({
    accessToken: Redacted.make(body.access_token),
    expiresAt: issuedAt + expiresIn * 1000,
  });
};
