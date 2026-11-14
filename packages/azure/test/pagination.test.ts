/**
 * `x-ms-pageable` pagination, no network: `.pages()` / `.items()` follow an
 * absolute `nextLink` as-is, Storage's `NextMarker` goes back as `marker`,
 * and `nextLinkName: null` is a single page. A fake HttpClient answers each
 * request with the next canned page.
 */
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { ARM_SCOPE, Credentials, fromClientSecret, type Config } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { ListServers } from "../src/services/analysisservices.ts";
import { ListResourceGroups } from "../src/services/resources.ts";
import * as blob from "../src/services/storage-blob.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
}

interface Canned {
  readonly body: string;
  readonly headers?: Record<string, string>;
}

const subscriptionId = "00000000-0000-0000-0000-000000000001";
const ARM = "https://management.azure.com";
const RG_LIST = `${ARM}/subscriptions/${subscriptionId}/resourcegroups`;
const BLOB = "https://acct.blob.core.windows.net";

const credentials = Layer.succeed(
  Credentials,
  Effect.succeed<Config>({
    token: (scope) =>
      Effect.succeed(Redacted.make(scope === ARM_SCOPE ? "arm-token" : `aad:${scope}`)),
    subscriptionId,
    apiBaseUrl: ARM,
  }),
);

/** A client answering the i-th request with `pages[i]`; extra requests fail the test. */
const fakePages = (pages: readonly Canned[]) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const page = pages[calls.length];
        calls.push({ method: request.method, url: url.href, headers: { ...request.headers } });
        if (page === undefined) throw new Error(`unexpected request #${calls.length}: ${url.href}`);
        return HttpClientResponse.fromWeb(
          request,
          new Response(page.body, {
            status: 200,
            headers: page.headers ?? { "Content-Type": "application/json" },
          }),
        );
      }),
    ),
  );
  return { calls, layer };
};

const collect = <A, E>(
  stream: Stream.Stream<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
): Promise<ReadonlyArray<A>> =>
  Effect.runPromise(
    Stream.runCollect(stream).pipe(Retry.none, Effect.provide(credentials), Effect.provide(http)),
  );

const json = (body: unknown): Canned => ({ body: JSON.stringify(body) });

describe("nextLink pagination", () => {
  test(".items() follows nextLink through three pages to the end", async () => {
    const page2 = `${RG_LIST}?api-version=2025-04-01&%24skiptoken=page2`;
    const page3 = `${RG_LIST}?api-version=2025-04-01&%24skiptoken=page3`;
    const { calls, layer } = fakePages([
      json({ value: [{ name: "rg-1" }], nextLink: page2 }),
      json({ value: [{ name: "rg-2" }, { name: "rg-3" }], nextLink: page3 }),
      json({ value: [{ name: "rg-4" }] }),
    ]);

    const items = await collect(
      ListResourceGroups.items({ subscriptionId, _filter: "tagName eq 'env'" }),
      layer,
    );

    expect(items.map((rg) => rg.name)).toEqual(["rg-1", "rg-2", "rg-3", "rg-4"]);
    expect(calls.map((c) => c.url)).toEqual([
      `${RG_LIST}?%24filter=tagName+eq+%27env%27&api-version=2025-04-01`,
      page2,
      page3,
    ]);
    for (const call of calls) {
      expect(call.method).toBe("GET");
      expect(call.headers.authorization).toBe("Bearer arm-token");
    }
  });

  test("an absolute nextLink with $skiptoken is requested as-is", async () => {
    // The link carries its own api-version and query; nothing is re-appended
    // and the first call's $filter is not re-sent.
    const next = `${RG_LIST}?api-version=2025-04-01&$skiptoken=eyJuZXh0IjoiYWJjIn0%3D&$top=1`;
    const { calls, layer } = fakePages([
      json({ value: [{ name: "a" }], nextLink: next }),
      json({ value: [{ name: "b" }], nextLink: null }),
    ]);

    const pages = await collect(
      ListResourceGroups.pages({ subscriptionId, _filter: "x eq 'y'", _top: 1 }),
      layer,
    );

    expect(pages.map((p) => p.value.map((rg) => rg.name))).toEqual([["a"], ["b"]]);
    expect(calls).toHaveLength(2);
    expect(calls[1]!.url).toBe(next);
    expect(new URL(calls[1]!.url).searchParams.getAll("api-version")).toEqual(["2025-04-01"]);
    expect(new URL(calls[1]!.url).searchParams.get("$filter")).toBeNull();
  });

  test("a nextLink without an api-version gets the operation's", async () => {
    const { calls, layer } = fakePages([
      json({ value: [], nextLink: `${RG_LIST}?%24skiptoken=t` }),
      json({ value: [] }),
    ]);

    await collect(ListResourceGroups.pages({ subscriptionId }), layer);

    expect(calls[1]!.url).toBe(`${RG_LIST}?%24skiptoken=t&api-version=2025-04-01`);
  });

  test("a repeated nextLink ends the traversal", async () => {
    const loop = `${RG_LIST}?api-version=2025-04-01&%24skiptoken=same`;
    const { calls, layer } = fakePages([
      json({ value: [{ name: "a" }], nextLink: loop }),
      json({ value: [{ name: "b" }], nextLink: loop }),
    ]);

    const items = await collect(ListResourceGroups.items({ subscriptionId }), layer);

    expect(items.map((rg) => rg.name)).toEqual(["a", "b"]);
    expect(calls).toHaveLength(2);
  });

  test("calling the operation with nextLink fetches that page", async () => {
    const next = `${RG_LIST}?api-version=2025-04-01&%24skiptoken=resume`;
    const { calls, layer } = fakePages([json({ value: [{ name: "c" }] })]);

    const page = await Effect.runPromise(
      ListResourceGroups({ subscriptionId, nextLink: next }).pipe(
        Retry.none,
        Effect.provide(credentials),
        Effect.provide(layer),
      ),
    );

    expect(page.value.map((rg) => rg.name)).toEqual(["c"]);
    expect(calls.map((c) => c.url)).toEqual([next]);
  });

  test("a nextLink on another host fails with InvalidInput and is never requested", async () => {
    const { calls, layer } = fakePages([
      json({
        value: [{ name: "a" }],
        nextLink: `https://evil.example/subscriptions/${subscriptionId}/resourcegroups?api-version=2025-04-01`,
      }),
      json({ value: [{ name: "stolen" }] }),
    ]);

    const error = await Effect.runPromise(
      Stream.runCollect(ListResourceGroups.items({ subscriptionId })).pipe(
        Effect.flip,
        Retry.none,
        Effect.provide(credentials),
        Effect.provide(layer),
      ),
    );

    expect(error._tag).toBe("InvalidInput");
    expect(calls.map((c) => new URL(c.url).host)).toEqual(["management.azure.com"]);
  });

  test("a nextLink on a regional ARM subdomain is followed", async () => {
    const regional = `https://westus.management.azure.com/subscriptions/${subscriptionId}/resourcegroups?api-version=2025-04-01&%24skiptoken=w`;
    const { calls, layer } = fakePages([
      json({ value: [{ name: "a" }], nextLink: regional }),
      json({ value: [{ name: "b" }] }),
    ]);

    const items = await collect(ListResourceGroups.items({ subscriptionId }), layer);

    expect(items.map((rg) => rg.name)).toEqual(["a", "b"]);
    expect(calls[1]!.url).toBe(regional);
    expect(calls[1]!.headers.authorization).toBe("Bearer arm-token");
  });
});

describe("nextLinkName: null", () => {
  test("is a single page, even when the response carries a nextLink", async () => {
    const { calls, layer } = fakePages([
      json({
        value: [{ name: "srv-1" }, { name: "srv-2" }],
        nextLink: `${ARM}/ignored?api-version=2017-08-01`,
      }),
    ]);

    const items = await collect(ListServers.items({ subscriptionId }), layer);

    expect(items.map((s) => s.name)).toEqual(["srv-1", "srv-2"]);
    expect(calls).toHaveLength(1);
  });
});

describe("Storage NextMarker pagination", () => {
  const listing = (names: readonly string[], nextMarker: string) => ({
    headers: { "Content-Type": "application/xml" },
    body:
      '<?xml version="1.0" encoding="utf-8"?>' +
      `<EnumerationResults ServiceEndpoint="${BLOB}/" ContainerName="assets"><Blobs>` +
      names
        .map(
          (n) =>
            `<Blob><Name>${n}</Name><Deleted>false</Deleted><Snapshot /><Properties>` +
            "<Last-Modified>Fri, 23 Oct 2026 10:00:00 GMT</Last-Modified><Etag>0x1</Etag>" +
            "</Properties></Blob>",
        )
        .join("") +
      `</Blobs>${nextMarker ? `<NextMarker>${nextMarker}</NextMarker>` : "<NextMarker />"}` +
      "</EnumerationResults>",
  });

  test("NextMarker goes back as the marker query parameter until it is empty", async () => {
    const { calls, layer } = fakePages([listing(["a", "b"], "m-2"), listing(["c"], "")]);

    const items = await collect(
      blob.ListContainerBlobFlatSegment.items({ url: BLOB, containerName: "assets" }),
      layer,
    );

    expect(items.map((b) => b.Name.content)).toEqual(["a", "b", "c"]);
    expect(calls.map((c) => c.url)).toEqual([
      `${BLOB}/assets?restype=container&comp=list`,
      `${BLOB}/assets?marker=m-2&restype=container&comp=list`,
    ]);
    expect(calls[1]!.headers.authorization).toBe("Bearer aad:https://storage.azure.com/.default");
  });
});

// Opt-in live check against the testing subscription; never part of a normal
// run. AZURE_TEST_PAGINATION_LIVE=1 reads the service principal from the
// alchemy-testing profile (`values.{tenantId,clientId,clientSecret,subscriptionId}`).
describe.skipIf(!process.env.AZURE_TEST_PAGINATION_LIVE)("live", () => {
  test("ListResourceGroups.pages / .items with $top=1 follow ARM's nextLink to the last page", async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const home = yield* Effect.sync(() => process.env.HOME ?? "");
        const text = yield* fs.readFileString(
          `${home}/.alchemy/profiles/alchemy-testing/azure.json`,
        );
        const { values } = JSON.parse(text) as { values: Record<string, string> };
        const live = fromClientSecret({
          tenantId: values.tenantId!,
          clientId: values.clientId!,
          clientSecret: Redacted.make(values.clientSecret!),
          subscriptionId: values.subscriptionId!,
        });
        return yield* Effect.gen(function* () {
          const all = yield* ListResourceGroups({ subscriptionId: values.subscriptionId! });
          const pages = yield* Stream.runCollect(
            ListResourceGroups.pages({ subscriptionId: values.subscriptionId!, _top: 1 }),
          );
          const items = yield* Stream.runCollect(
            ListResourceGroups.items({ subscriptionId: values.subscriptionId!, _top: 1 }),
          );
          return {
            all: all.value.length,
            items: items.map((rg) => rg.id!),
            pages: pages.map((p) => ({ ids: p.value.map((rg) => rg.id!), nextLink: p.nextLink })),
          };
        }).pipe(Effect.provide(live));
      }).pipe(Effect.provide(FetchHttpClient.layer), Effect.provide(NodeFileSystem.layer)),
    );
    expect(result.all).toBeGreaterThan(1);
    // `$top` is a hint ARM may exceed on the first page, and other runs
    // create and delete groups meanwhile, so counts are not compared
    // exactly: several pages, each but the last linking on, no repeats.
    const ids = result.pages.flatMap((p) => p.ids);
    expect(result.pages.length).toBeGreaterThan(1);
    expect(result.pages.at(-1)!.nextLink).toBeUndefined();
    for (const page of result.pages.slice(0, -1)) {
      expect(new URL(page.nextLink!).searchParams.get("$skiptoken")).not.toBeNull();
    }
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThan(1);
    expect(result.items.length).toBeGreaterThan(1);
    expect(new Set(result.items).size).toBe(result.items.length);
  }, 120_000);
});
