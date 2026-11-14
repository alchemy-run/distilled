/**
 * Send one HTTP request for an operation: `Telemetry.execute` (spans, trace
 * headers, debug output), plus the facts the retry layer reads after a
 * failure (see `./retry-state.ts`): which host the request went to, whether
 * it succeeded, and the response's bounded retry hint.
 *
 * Every protocol sends through this, so the retry budget and the
 * `x-amz-retry-after` / `x-distilled-retry-after` headers work for all of
 * them. A protocol that calls `client.execute` directly still retries, on
 * the plain backoff, outside the budget.
 */
import type * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as RetryState from "./retry-state.ts";
import * as Telemetry from "./telemetry.ts";

export const send = (
  context: Context.Context<any>,
  client: HttpClient.HttpClient,
  request: HttpClientRequest.HttpClientRequest,
): Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.HttpClientError> =>
  // Inside `suspend`: the retry layer runs this same effect again for each
  // attempt, and each attempt must record its own request.
  Effect.suspend(() => {
    RetryState.recordRequest(request.url);
    return Effect.map(Telemetry.execute(context, client, request), (response) => {
      RetryState.recordResponse(
        response.status,
        response.headers as Readonly<Record<string, string | undefined>>,
      );
      return response;
    });
  });
