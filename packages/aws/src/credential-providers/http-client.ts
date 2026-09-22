/**
 * How the providers that call an HTTP endpoint get a client and read a
 * response.
 */
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import { CredentialSourceError } from "./credential-source.ts";

/**
 * Run `effect` with the fiber's `HttpClient` when one is in scope (an
 * operation always has one), else with the platform `fetch` client. This
 * keeps every credentials layer free of requirements while still letting a
 * caller inject a client, e.g. in tests.
 */
export const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.serviceOption(HttpClient.HttpClient).pipe(
    Effect.flatMap((client) =>
      Option.isSome(client)
        ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
        : Effect.provide(effect, FetchHttpClient.layer),
    ),
  );

interface TextResponse {
  readonly status: number;
  readonly text: string;
}

/**
 * Execute a request and read the whole body. Non-2xx statuses are returned,
 * not failed, because IMDS in particular branches on them.
 */
export const requestText = (
  request: HttpClientRequest.HttpClientRequest,
  timeoutMs: number,
): Effect.Effect<TextResponse, CredentialSourceError> =>
  HttpClient.execute(request).pipe(
    Effect.flatMap((response) =>
      Effect.map(response.text, (text) => ({ status: response.status, text })),
    ),
    Effect.timeout(timeoutMs),
    Effect.mapError(
      (cause) =>
        new CredentialSourceError({
          message:
            cause._tag === "TimeoutError"
              ? "TimeoutError"
              : `Request to ${request.url} failed: ${String(cause)}`,
          cause,
        }),
    ),
    withHttpClient,
  );
