import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  OpenSearchCredentials,
  opensearchApiUrl,
  opensearchBulkBody,
  opensearchCredentialsOf,
} from "../src/opensearch.ts";
import * as data from "../src/services/opensearch_data.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly contentType: string | undefined;
  readonly body: string | undefined;
}

const PASSWORD = "s3cret-password";

/** Answers every request with `answer`, and records it. */
const fakeInstance = (answer: { readonly status: number; readonly body?: unknown }) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const requestBody = request.body;
        calls.push({
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          contentType: requestBody._tag === "Uint8Array" ? requestBody.contentType : undefined,
          body:
            requestBody._tag === "Uint8Array"
              ? new TextDecoder().decode(requestBody.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
            status: answer.status,
          }),
        );
      }),
    ),
  );
  const credentials = Layer.succeed(
    OpenSearchCredentials,
    opensearchCredentialsOf({
      uri: `https://user:${PASSWORD}@search.example:9200/`,
      username: "user",
      password: Redacted.make(PASSWORD),
    }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

const WRITE = {
  _index: "orders",
  _id: "1",
  _version: 1,
  result: "created",
  _shards: { total: 2, successful: 1, failed: 0 },
  _seq_no: 0,
  _primary_term: 1,
};

/** The bodies below are what opensearchproject/opensearch:2 (2.19.7) answered. */
const INDEX_NOT_FOUND = {
  error: {
    type: "index_not_found_exception",
    reason: "no such index [missing]",
    index: "missing",
  },
  status: 404,
};

const VERSION_CONFLICT = {
  error: {
    type: "version_conflict_engine_exception",
    reason: "[1]: version conflict, document already exists (current version [1])",
  },
  status: 409,
};

const run = <A, E>(
  effect: Effect.Effect<A, E, data.OpenSearchOpContext>,
  layer: Layer.Layer<data.OpenSearchOpContext>,
) => Effect.runPromise(effect.pipe(Effect.provide(layer)));

const failureOf = <A, E extends { readonly _tag: string }>(
  effect: Effect.Effect<A, E, data.OpenSearchOpContext>,
  layer: Layer.Layer<data.OpenSearchOpContext>,
) => run(effect.pipe(Effect.flip), layer);

describe("opensearchApiUrl", () => {
  test("drops the user, the password and a trailing slash", () => {
    expect(opensearchApiUrl("https://user:pw@search.example:9200/")).toEqual(
      "https://search.example:9200",
    );
  });

  test("keeps a path prefix and gives a bare host https", () => {
    expect(opensearchApiUrl("https://search.example/os/")).toEqual("https://search.example/os");
    expect(opensearchApiUrl("search.example")).toEqual("https://search.example");
  });

  test("refuses what isn't a URL, without quoting it", async () => {
    expect(opensearchApiUrl("https://user:pw@")).toBeUndefined();
    const error = await Effect.runPromise(
      opensearchCredentialsOf({
        uri: `https://user:${PASSWORD}@`,
        username: "user",
        password: Redacted.make(PASSWORD),
      }).pipe(Effect.flip),
    );
    expect(error._tag).toEqual("ConfigError");
    expect(error.message).not.toContain(PASSWORD);
  });
});

describe("opensearchBulkBody", () => {
  test("writes one line per value and ends in a newline", () => {
    expect(opensearchBulkBody([{ index: { _id: "1" } }, { sku: "tea" }])).toEqual(
      '{"index":{"_id":"1"}}\n{"sku":"tea"}\n',
    );
  });
});

describe("the REST operations", () => {
  test("signs with Basic auth against the URL without its credentials", async () => {
    const { calls, layer } = fakeInstance({ status: 201, body: WRITE });
    const written = await run(
      data.indexDocument({ index: "orders", id: "1", refresh: "true", body: { sku: "tea" } }),
      layer,
    );
    expect(written.result).toEqual("created");
    expect(calls[0]?.method).toEqual("PUT");
    expect(calls[0]?.url).toEqual("https://search.example:9200/orders/_doc/1?refresh=true");
    expect(calls[0]?.authorization).toEqual(`Basic ${btoa(`user:${PASSWORD}`)}`);
    expect(calls[0]?.body).toEqual('{"sku":"tea"}');
  });

  test("keeps a wildcard in the index of a search", async () => {
    const { calls, layer } = fakeInstance({
      status: 200,
      body: {
        took: 1,
        timed_out: false,
        _shards: { total: 1, successful: 1, failed: 0 },
        hits: { max_score: null, hits: [{ _index: "logs-1", _id: "a", _score: null }] },
      },
    });
    const found = await run(data.search({ index: "logs-*", size: 1 }), layer);
    expect(found.hits.hits[0]?._id).toEqual("a");
    expect(found.hits.total).toBeUndefined();
    expect(calls[0]?.url).toEqual("https://search.example:9200/logs-*/_search");
    expect(calls[0]?.body).toEqual('{"size":1}');
  });

  test("sends a bulk body as NDJSON", async () => {
    const { calls, layer } = fakeInstance({
      status: 200,
      body: {
        took: 5,
        errors: false,
        items: [{ index: { _index: "orders", _id: "2", status: 201, result: "created" } }],
      },
    });
    const answer = await run(
      data.bulk({
        index: "orders",
        body: opensearchBulkBody([{ index: { _id: "2" } }, { sku: "z" }]),
      }),
      layer,
    );
    expect(answer.items[0]?.index?.status).toEqual(201);
    expect(calls[0]?.url).toEqual("https://search.example:9200/orders/_bulk");
  });

  test("types a missing document on GET, from its body", async () => {
    const { layer } = fakeInstance({
      status: 404,
      body: { _index: "orders", _id: "nope", found: false },
    });
    const error = await failureOf(data.getDocument({ index: "orders", id: "nope" }), layer);
    expect(error._tag).toEqual("DocumentNotFound");
  });

  test("types a missing document on DELETE, from its body", async () => {
    const { layer } = fakeInstance({ status: 404, body: { ...WRITE, result: "not_found" } });
    const error = await failureOf(data.deleteDocument({ index: "orders", id: "nope" }), layer);
    expect(error._tag).toEqual("DocumentNotFound");
  });

  test("types a missing index, with OpenSearch's reason", async () => {
    const { layer } = fakeInstance({ status: 404, body: INDEX_NOT_FOUND });
    const error = await failureOf(data.search({ index: "missing" }), layer);
    expect(error._tag).toEqual("IndexNotFound");
    expect((error as data.IndexNotFound).message).toEqual("no such index [missing]");
  });

  test("types a version conflict", async () => {
    const { layer } = fakeInstance({ status: 409, body: VERSION_CONFLICT });
    const error = await failureOf(
      data.indexDocument({ index: "orders", id: "1", op_type: "create", body: {} }),
      layer,
    );
    expect(error._tag).toEqual("VersionConflict");
  });

  test("surfaces wrong credentials as Unauthorized, without the password", async () => {
    const { layer } = fakeInstance({ status: 401, body: { error: "Unauthorized", status: 401 } });
    const error = await failureOf(data.search({ index: "orders" }), layer);
    expect(error._tag).toEqual("Unauthorized");
    expect(JSON.stringify(error)).not.toContain(PASSWORD);
  });
});
