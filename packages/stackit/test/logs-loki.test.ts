import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, LokiCredentials, lokiCredentialsOf } from "../src/credentials.ts";
import * as loki from "../src/services/logs_loki.ts";
import * as link from "../src/services/telemetry_link.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly ifNoneMatch: string | undefined;
  readonly body: string | undefined;
}

const TOKEN = "s3cret-access-token";

const fakeHttp = (answer: { readonly status: number; readonly body?: string }) => {
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
          ifNoneMatch: request.headers["if-none-match"],
          body:
            requestBody._tag === "Uint8Array"
              ? new TextDecoder().decode(requestBody.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body ?? null, { status: answer.status }),
        );
      }),
    ),
  );
  return { calls, http };
};

/** Answers every request with `answer`, and records it. */
const fakeInstance = (answer: { readonly status: number; readonly body?: string }) => {
  const { calls, http } = fakeHttp(answer);
  const credentials = Layer.succeed(
    LokiCredentials,
    lokiCredentialsOf({
      datasourceUrl: "https://0000.logs.eu01.onstackit.cloud/",
      token: Redacted.make(TOKEN),
    }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

const run = <A, E>(
  effect: Effect.Effect<A, E, loki.LokiOpContext>,
  layer: Layer.Layer<loki.LokiOpContext>,
) => Effect.runPromise(effect.pipe(Effect.provide(layer)));

/** The bodies below are what grafana/loki:3.5.0 answered. */
const STREAMS = JSON.stringify({
  status: "success",
  data: {
    resultType: "streams",
    result: [
      {
        stream: { app: "probe", service_name: "probe" },
        values: [["1793548133000000000", "hello"]],
      },
    ],
    stats: { summary: { totalLinesProcessed: 1 } },
  },
});

const MATRIX = JSON.stringify({
  status: "success",
  data: {
    resultType: "matrix",
    result: [{ metric: {}, values: [[1793548140, "0.0066"]] }],
    stats: {},
  },
});

const VECTOR = JSON.stringify({
  status: "success",
  data: {
    resultType: "vector",
    result: [{ metric: {}, value: [1793548136.137, "0.0066"] }],
    stats: {},
  },
});

describe("lokiCredentialsOf", () => {
  test("drops a trailing slash, and refuses what isn't a URL", async () => {
    const config = await Effect.runPromise(
      lokiCredentialsOf({
        datasourceUrl: "https://0000.logs.eu01.onstackit.cloud/",
        token: Redacted.make(TOKEN),
      }),
    );
    expect(config.apiUrl).toEqual("https://0000.logs.eu01.onstackit.cloud");
    const error = await Effect.runPromise(
      lokiCredentialsOf({ datasourceUrl: "https://", token: Redacted.make(TOKEN) }).pipe(
        Effect.flip,
      ),
    );
    expect(error._tag).toEqual("ConfigError");
  });

  test("a token with no known value fails without a request", async () => {
    const error = await Effect.runPromise(
      lokiCredentialsOf({
        datasourceUrl: "https://0000.logs.eu01.onstackit.cloud",
        token: undefined,
      }).pipe(Effect.flip),
    );
    expect(error.message).toContain("no known value");
  });
});

describe("the Loki operations", () => {
  test("push sends the streams with the bearer token, and takes a 204", async () => {
    const { calls, layer } = fakeInstance({ status: 204 });
    await run(
      loki.push({
        streams: [{ stream: { app: "tea" }, values: [["1793548133000000000", "hello"]] }],
      }),
      layer,
    );
    expect(calls).toEqual([
      {
        method: "POST",
        url: "https://0000.logs.eu01.onstackit.cloud/loki/api/v1/push",
        authorization: `Bearer ${TOKEN}`,
        ifNoneMatch: undefined,
        body: JSON.stringify({
          streams: [{ stream: { app: "tea" }, values: [["1793548133000000000", "hello"]] }],
        }),
      },
    ]);
  });

  test("pushOtlp posts to the OTLP route", async () => {
    const { calls, layer } = fakeInstance({ status: 204 });
    await run(loki.pushOtlp({ resourceLogs: [{ scopeLogs: [] }] }), layer);
    expect(calls[0]?.url).toEqual("https://0000.logs.eu01.onstackit.cloud/otlp/v1/logs");
    expect(calls[0]?.body).toEqual(JSON.stringify({ resourceLogs: [{ scopeLogs: [] }] }));
  });

  test("queryRange encodes the LogQL query and decodes streams", async () => {
    const { calls, layer } = fakeInstance({ status: 200, body: STREAMS });
    const found = await run(loki.queryRange({ query: '{app="tea"}', limit: 10 }), layer);
    expect(calls[0]?.method).toEqual("GET");
    const url = new URL(calls[0]!.url);
    expect(url.pathname).toEqual("/loki/api/v1/query_range");
    expect(url.searchParams.get("query")).toEqual('{app="tea"}');
    expect(url.searchParams.get("limit")).toEqual("10");
    expect(found.data.resultType).toEqual("streams");
    expect(found.data.result[0]?.stream).toEqual({ app: "probe", service_name: "probe" });
    expect(found.data.result[0]?.values).toEqual([["1793548133000000000", "hello"]]);
  });

  test("queryRange decodes a matrix", async () => {
    const { layer } = fakeInstance({ status: 200, body: MATRIX });
    const found = await run(
      loki.queryRange({ query: "sum(rate({a=`b`}[5m]))", step: "60" }),
      layer,
    );
    expect(found.data.resultType).toEqual("matrix");
    expect(found.data.result[0]?.values).toEqual([[1793548140, "0.0066"]]);
  });

  test("query decodes a vector", async () => {
    const { calls, layer } = fakeInstance({ status: 200, body: VECTOR });
    const found = await run(loki.query({ query: "vector(1)" }), layer);
    expect(new URL(calls[0]!.url).pathname).toEqual("/loki/api/v1/query");
    expect(found.data.resultType).toEqual("vector");
    expect(found.data.result).toEqual([{ metric: {}, value: [1793548136.137, "0.0066"] }]);
  });

  test("Loki's plain text 400 is a BadRequest carrying its message", async () => {
    const { layer } = fakeInstance({
      status: 400,
      body: "parse error at line 1, col 1: syntax error: unexpected IDENTIFIER",
    });
    const error = await run(loki.queryRange({ query: "nonsense{" }).pipe(Effect.flip), layer);
    expect(error._tag).toEqual("BadRequest");
    expect(error.message).toContain("syntax error");
  });

  test("a gateway's 401 is typed, and never holds the token", async () => {
    const { layer } = fakeInstance({ status: 401, body: '{"message":"invalid token"}' });
    const error = await run(loki.query({ query: "vector(1)" }).pipe(Effect.flip), layer);
    expect(error._tag).toEqual("Unauthorized");
    expect(JSON.stringify(error)).not.toContain(TOKEN);
  });
});

describe("the telemetry link's create precondition", () => {
  const credentials = Layer.succeed(
    Credentials,
    Effect.succeed({ token: Redacted.make("stackit-token"), region: "eu01" }),
  );

  test("sends If-None-Match and keeps it out of the body", async () => {
    const { calls, http } = fakeHttp({
      status: 201,
      body: JSON.stringify({
        id: "l-1",
        displayName: "audit",
        regionId: "eu01",
        telemetryRouterId: "r-1",
        enabled: true,
        status: "reconciling",
        createTime: "2026-11-01T00:00:00Z",
      }),
    });
    await Effect.runPromise(
      link
        .createOrUpdateProjectTelemetryLink({
          projectId: "p-1",
          regionId: "eu01",
          ifNoneMatch: "*",
          accessToken: Redacted.make("a.b.c"),
          displayName: "audit",
          telemetryRouterId: "r-1",
        })
        .pipe(Effect.provide(Layer.mergeAll(http, credentials))),
    );
    expect(calls[0]?.ifNoneMatch).toEqual("*");
    expect(JSON.parse(calls[0]!.body!)).toEqual({
      accessToken: "a.b.c",
      displayName: "audit",
      telemetryRouterId: "r-1",
    });
  });

  test("a 412 is PreconditionFailed", async () => {
    const { http } = fakeHttp({ status: 412, body: '{"message":"already exists"}' });
    const error = await Effect.runPromise(
      link
        .createOrUpdateProjectTelemetryLink({
          projectId: "p-1",
          regionId: "eu01",
          ifNoneMatch: "*",
          accessToken: "a.b.c",
          displayName: "audit",
          telemetryRouterId: "r-1",
        })
        .pipe(Effect.flip, Effect.provide(Layer.mergeAll(http, credentials))),
    );
    expect(error._tag).toEqual("PreconditionFailed");
  });
});
