import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { fromApiToken } from "./credentials.ts";
import { listObservabilityDestinations } from "./services/workers.ts";

const destination = (index: number) => ({
  configuration: {
    destination_conf: "https://example.invalid/ingest",
    headers: {},
    job_status: {
      error_message: "",
      last_complete: "",
      last_error: "",
    },
    logpush_dataset: "opentelemetry-traces",
    type: "logpush",
    url: "https://example.invalid/ingest",
  },
  enabled: true,
  name: `destination-${index}`,
  scripts: [],
  slug: `destination-${index}`,
});

describe("Workers observability destination pagination", () => {
  test("fetches every page when the API omits result_info", async () => {
    const requests: Array<Request> = [];
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          const webRequest = Result.getOrThrow(HttpClientRequest.toWebResult(request));
          requests.push(webRequest);
          const page = Number(new URL(webRequest.url).searchParams.get("page"));
          const result =
            page === 1
              ? Array.from({ length: 20 }, (_, index) => destination(index + 1))
              : page === 2
                ? [destination(21)]
                : [];

          return HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify({ success: true, errors: [], messages: [], result }), {
              status: 200,
              headers: { "content-type": "application/json" },
            }),
          );
        }),
      ),
    );

    const destinations = await Effect.runPromise(
      Stream.runCollect(listObservabilityDestinations.items({ accountId: "test-account" })).pipe(
        Effect.provide(
          Layer.mergeAll(http, fromApiToken({ apiToken: Redacted.make("test-token") })),
        ),
      ),
    );

    expect(requests.map((request) => new URL(request.url).searchParams.get("page"))).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(destinations).toHaveLength(21);
    expect(destinations.map((item) => item.slug)).toContain("destination-21");
  });
});
