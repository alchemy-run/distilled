/**
 * Test helpers for SDK packages: a canned-response `HttpClient` and a runner
 * that executes one operation under both response-validation modes.
 *
 * ```ts
 * const { lenient, strict } = await runValidationModes(
 *   Pkg.getThing({ id: "a" }).pipe(Retry.none, Effect.provide(TestCredentials)),
 *   { body: "{}" },
 * );
 * expect(lenient).toMatchObject({ _tag: "Success", success: {} });
 * expect(strict).toMatchObject({ _tag: "Failure" });
 * ```
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Result from "effect/Result";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as ResponseValidation from "./response-validation.ts";

export interface MockResponse {
  /** Default 200. */
  readonly status?: number;
  /** Default `application/json`. */
  readonly headers?: Record<string, string>;
  readonly body: string;
}

/**
 * An `HttpClient` that answers every request with `response` (or with what
 * `response(request)` returns, for protocols that make more than one call).
 */
export const mockHttpClient = (
  response:
    | MockResponse
    | ((request: HttpClientRequest.HttpClientRequest) => MockResponse),
): Layer.Layer<HttpClient.HttpClient> =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        const r = typeof response === "function" ? response(request) : response;
        return HttpClientResponse.fromWeb(
          request,
          new Response(r.body, {
            status: r.status ?? 200,
            headers: r.headers ?? { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );

/**
 * Run `effect` against `mockHttpClient(response)` once in lenient mode and
 * once in strict mode.
 */
export const runValidationModes = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
  response: Parameters<typeof mockHttpClient>[0],
): Promise<{
  readonly lenient: Result.Result<A, E>;
  readonly strict: Result.Result<A, E>;
}> => {
  const run = (mode: Layer.Layer<never>) =>
    effect.pipe(
      Effect.provide(mockHttpClient(response)),
      Effect.provide(mode),
      Effect.result,
    );
  return Effect.runPromise(
    Effect.all({
      lenient: run(ResponseValidation.lenient),
      strict: run(ResponseValidation.strict),
    }),
  );
};
