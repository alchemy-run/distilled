import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { fromApiToken } from "../src/credentials.ts";
import { listStoreSecrets } from "../src/services/secrets_store.ts";

const secret = (name: string) => ({
  id: `id-${name}`,
  created: "2026-01-01T00:00:00Z",
  modified: "2026-01-01T00:00:00Z",
  name,
  status: "active",
  store_id: "store",
});

/**
 * Serve `pages` (1-indexed) of secrets with a `result_info` built by
 * `info(page, items)`, and record the page number of every request.
 */
const list = async (
  pages: ReadonlyArray<ReadonlyArray<string>>,
  info: (page: number, items: ReadonlyArray<string>) => Record<string, number> | undefined,
  input: { perPage?: number } = {},
) => {
  const requested: Array<number> = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        const webRequest = Result.getOrThrow(HttpClientRequest.toWebResult(request));
        const page = Number(new URL(webRequest.url).searchParams.get("page"));
        requested.push(page);
        const items = pages[page - 1] ?? [];
        const result_info = info(page, items);
        return HttpClientResponse.fromWeb(
          request,
          new Response(
            JSON.stringify({
              success: true,
              errors: [],
              messages: [],
              result: items.map(secret),
              ...(result_info ? { result_info } : {}),
            }),
            { status: 200, headers: { "content-type": "application/json" } },
          ),
        );
      }),
    ),
  );
  const items = await Effect.runPromise(
    Stream.runCollect(
      listStoreSecrets.items({ accountId: "account", storeId: "store", ...input }),
    ).pipe(
      Effect.provide(Layer.mergeAll(http, fromApiToken({ apiToken: Redacted.make("token") }))),
    ),
  );
  return { requested, names: Array.from(items).map((s) => s.name) };
};

const names = (prefix: string, n: number) => Array.from({ length: n }, (_, i) => `${prefix}-${i}`);

describe("Cloudflare page pagination", () => {
  test("stops after a short page that reaches total_count", async () => {
    const { requested, names: got } = await list([["only"]], (page, items) => ({
      page,
      per_page: 20,
      count: items.length,
      total_count: 1,
    }));
    expect(requested).toEqual([1]);
    expect(got).toEqual(["only"]);
  });

  test("stops after the last short page of several", async () => {
    const pages = [names("a", 20), names("b", 20), names("c", 3)];
    const { requested, names: got } = await list(pages, (page, items) => ({
      page,
      per_page: 20,
      count: items.length,
      total_count: 43,
    }));
    expect(requested).toEqual([1, 2, 3]);
    expect(got).toHaveLength(43);
  });

  test("stops at total_pages", async () => {
    const pages = [names("a", 2), names("b", 2)];
    const { requested, names: got } = await list(pages, (page, items) => ({
      page,
      per_page: 2,
      count: items.length,
      total_count: 4,
      total_pages: 2,
    }));
    expect(requested).toEqual([1, 2]);
    expect(got).toHaveLength(4);
  });

  test("asks for one more page when a full last page exactly reaches total_count", async () => {
    // Without total_pages, a full page that reaches total_count can't be told
    // apart from an endpoint whose total_count only counts the current page.
    const pages = [names("a", 2), names("b", 2)];
    const { requested } = await list(pages, (page, items) => ({
      page,
      per_page: 2,
      count: items.length,
      total_count: 4,
    }));
    expect(requested).toEqual([1, 2, 3]);
  });

  test("keeps paging past a short page when total_count is not reached", async () => {
    // The server capped the page below the reported per_page.
    const pages = [names("a", 10), names("b", 10), names("c", 5)];
    const { requested, names: got } = await list(pages, (page, items) => ({
      page,
      per_page: 20,
      count: items.length,
      total_count: 25,
    }));
    expect(requested).toEqual([1, 2, 3]);
    expect(got).toHaveLength(25);
  });

  test("falls back to the requested per_page when result_info omits it", async () => {
    const { requested } = await list(
      [["only"]],
      (page, items) => ({
        page,
        count: items.length,
        total_count: 1,
      }),
      { perPage: 50 },
    );
    expect(requested).toEqual([1]);
  });

  test("pages until an empty page when result_info has no totals", async () => {
    const pages = [names("a", 20), ["last"]];
    const { requested, names: got } = await list(pages, () => undefined);
    expect(requested).toEqual([1, 2, 3]);
    expect(got).toHaveLength(21);
  });
});
