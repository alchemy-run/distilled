import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "../src/credentials.ts";
import { UnknownRevenueCatError } from "../src/errors.ts";
import * as Retry from "../src/retry.ts";
import { getApp, listApps } from "../src/services/revenuecat.ts";

const app = (id: string) => ({
  object: "app",
  id,
  name: id,
  created_at: 0,
  type: "test_store",
  project_id: "proj1",
});

const serve = (respond: (url: URL) => { status: number; body: unknown }) => {
  const requests: Array<{ url: URL; authorization: string | null }> = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        const webRequest = Result.getOrThrow(HttpClientRequest.toWebResult(request));
        const url = new URL(webRequest.url);
        requests.push({ url, authorization: webRequest.headers.get("authorization") });
        const { status, body } = respond(url);
        return HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(body), {
            status,
            headers: { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  const layer = Layer.mergeAll(http, fromApiKey({ apiKey: Redacted.make("sk_test") }));
  return { requests, layer };
};

describe("RevenueCat next_page pagination", () => {
  test("sends starting_after from each next_page URL until it is null", async () => {
    const pages: Record<string, { ids: string[]; next: string | null }> = {
      "": { ids: ["app1", "app2"], next: "/v2/projects/proj1/apps?starting_after=app2&limit=2" },
      app2: { ids: ["app3"], next: null },
    };
    const { requests, layer } = serve((url) => {
      const page = pages[url.searchParams.get("starting_after") ?? ""]!;
      return {
        status: 200,
        body: {
          object: "list",
          items: page.ids.map(app),
          next_page: page.next,
          url: "/v2/projects/proj1/apps",
        },
      };
    });

    const items = await Effect.runPromise(
      Stream.runCollect(listApps.items({ project_id: "proj1", limit: 2 })).pipe(
        Effect.provide(layer),
      ),
    );

    expect(Array.from(items, (a) => a.id)).toEqual(["app1", "app2", "app3"]);
    expect(requests.map((r) => r.url.pathname)).toEqual([
      "/v2/projects/proj1/apps",
      "/v2/projects/proj1/apps",
    ]);
    expect(requests.map((r) => r.url.searchParams.get("starting_after"))).toEqual([null, "app2"]);
    expect(requests[0]!.authorization).toBe("Bearer sk_test");
  });
});

describe("RevenueCat errors", () => {
  test("carries the error type as the code of an unmapped failure", async () => {
    const { layer } = serve(() => ({
      status: 402,
      body: {
        object: "error",
        type: "store_error",
        message: "The store rejected the request",
        retryable: false,
        doc_url: "https://errors.rev.cat/store-error",
      },
    }));

    const error = await Effect.runPromise(
      getApp({ project_id: "proj1", app_id: "app1" }).pipe(
        Effect.flip,
        Retry.none,
        Effect.provide(layer),
      ),
    );

    expect(error).toBeInstanceOf(UnknownRevenueCatError);
    expect(error).toMatchObject({ code: "store_error", message: "The store rejected the request" });
  });
});
