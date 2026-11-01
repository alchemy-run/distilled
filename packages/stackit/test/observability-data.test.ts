import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  LokiCredentials,
  ObservabilityDataCredentials,
  observabilityDataCredentialsOf,
} from "../src/credentials.ts";
import * as loki from "../src/services/logs_loki.ts";
import * as alertmanager from "../src/services/observability_alertmanager.ts";
import * as prometheus from "../src/services/observability_prometheus.ts";

const USERNAME = "metrics-user";
const PASSWORD = "s3cret-password";
const BASIC = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;
const ROOT = "https://metrics.stackit1.argus.eu01.stackit.cloud/instances/0000";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly body: string | undefined;
}

const fake = (answer: { readonly status: number; readonly body?: string }, url = ROOT) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, requestUrl) =>
      Effect.sync(() => {
        const requestBody = request.body;
        calls.push({
          method: request.method,
          url: requestUrl.toString(),
          authorization: request.headers.authorization,
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
  const credentials = observabilityDataCredentialsOf({
    url,
    username: USERNAME,
    password: Redacted.make(PASSWORD),
  });
  return {
    calls,
    layer: Layer.mergeAll(
      http,
      Layer.succeed(ObservabilityDataCredentials, credentials),
      Layer.succeed(LokiCredentials, credentials),
    ),
  };
};

const run = <A, E, R>(effect: Effect.Effect<A, E, R>, layer: Layer.Layer<any>) =>
  Effect.runPromise(effect.pipe(Effect.provide(layer)) as Effect.Effect<A, E>);

describe("observabilityDataCredentialsOf", () => {
  const rootOf = (url: string) =>
    Effect.runPromise(
      observabilityDataCredentialsOf({
        url,
        username: USERNAME,
        password: Redacted.make(PASSWORD),
      }),
    ).then((config) => config.apiUrl);

  test("keeps the root of whichever URL it is given", async () => {
    const host = "https://logs.stackit1.argus.eu01.stackit.cloud/instances/0000";
    expect(await rootOf(`${host}/`)).toEqual(host);
    // The shape STACKIT documents for `logsPushUrl`.
    expect(await rootOf(`${host}/loki/api/v1/push`)).toEqual(host);
    expect(await rootOf(`${host}/api/v1/receive`)).toEqual(host);
    expect(await rootOf(`${host}/api/v2/alerts`)).toEqual(host);
    expect(await rootOf("alerting.example.com")).toEqual("https://alerting.example.com");
  });

  test("a credential with no known password fails without a request", async () => {
    const error = await Effect.runPromise(
      observabilityDataCredentialsOf({ url: ROOT, username: USERNAME, password: undefined }).pipe(
        Effect.flip,
      ),
    );
    expect(error._tag).toEqual("ConfigError");
    expect(error.message).toContain("no known password");
  });

  test("a URL that isn't one fails, and isn't quoted", async () => {
    const error = await Effect.runPromise(
      observabilityDataCredentialsOf({
        url: "https://",
        username: USERNAME,
        password: Redacted.make(PASSWORD),
      }).pipe(Effect.flip),
    );
    expect(error._tag).toEqual("ConfigError");
    expect(error.message).not.toContain("https://");
  });
});

// The bodies below are what prom/prometheus:v3.5.0 answered.
describe("the Prometheus operations", () => {
  test("query signs with the credential and decodes a vector", async () => {
    const { calls, layer } = fake({
      status: 200,
      body: '{"status":"success","data":{"resultType":"vector","result":[{"metric":{},"value":[1793549958.412,"1"]}]}}',
    });
    const found = await run(prometheus.query({ query: "vector(1)" }), layer);
    expect(calls[0]?.method).toEqual("GET");
    expect(calls[0]?.authorization).toEqual(BASIC);
    const url = new URL(calls[0]!.url);
    expect(`${url.origin}${url.pathname}`).toEqual(`${ROOT}/api/v1/query`);
    expect(url.searchParams.get("query")).toEqual("vector(1)");
    expect(found.data.resultType).toEqual("vector");
    expect(found.data.result).toEqual([{ metric: {}, value: [1793549958.412, "1"] }]);
  });

  test("queryRange decodes a matrix", async () => {
    const { calls, layer } = fake({
      status: 200,
      body: '{"status":"success","data":{"resultType":"matrix","result":[{"metric":{},"values":[[1793491200,"1"]]}]}}',
    });
    const found = await run(
      prometheus.queryRange({
        query: "vector(1)",
        start: "2026-11-01T00:00:00Z",
        end: "2026-11-01T00:01:00Z",
        step: "30s",
      }),
      layer,
    );
    expect(new URL(calls[0]!.url).pathname).toEqual("/instances/0000/api/v1/query_range");
    expect(found.data.result).toEqual([{ metric: {}, values: [[1793491200, "1"]] }]);
  });

  test("series repeats match[] for each selector", async () => {
    const { calls, layer } = fake({
      status: 200,
      body: '{"status":"success","data":[{"__name__":"up","job":"prometheus"}]}',
    });
    const found = await run(prometheus.series({ match__: ["up", "down"] }), layer);
    expect(new URL(calls[0]!.url).searchParams.getAll("match[]")).toEqual(["up", "down"]);
    expect(found.data).toEqual([{ __name__: "up", job: "prometheus" }]);
  });

  test("labelValues puts the label in the path", async () => {
    const { calls, layer } = fake({ status: 200, body: '{"status":"success","data":["a"]}' });
    const found = await run(prometheus.labelValues({ name: "job" }), layer);
    expect(new URL(calls[0]!.url).pathname).toEqual("/instances/0000/api/v1/label/job/values");
    expect(found.data).toEqual(["a"]);
  });

  test("a bad query is a BadRequest carrying its message, and never the password", async () => {
    const { layer } = fake({
      status: 400,
      body: '{"status":"error","errorType":"bad_data","error":"invalid parameter \\"query\\": parse error"}',
    });
    const error = await run(prometheus.query({ query: "(" }).pipe(Effect.flip), layer);
    expect(error._tag).toEqual("BadRequest");
    expect(error.message).toContain("parse error");
    expect(JSON.stringify(error)).not.toContain(PASSWORD);
  });
});

// The bodies below are what prom/alertmanager:v0.28.1 answered.
describe("the Alertmanager operations", () => {
  const ALERT = {
    annotations: {},
    endsAt: "2026-11-01T16:25:07.001Z",
    fingerprint: "f09540ac01fd9d84",
    receivers: [{ name: "default" }],
    startsAt: "2026-11-01T16:20:00.798Z",
    status: { inhibitedBy: [], mutedBy: [], silencedBy: [], state: "active" },
    updatedAt: "2026-11-01T16:20:07.001Z",
    labels: { alertname: "probe" },
  };
  const SILENCE = {
    id: "67c9e0fe-32cf-4f70-8646-9d3b9b93c53e",
    status: { state: "active" },
    updatedAt: "2026-11-01T16:20:07.018Z",
    comment: "c",
    createdBy: "t",
    endsAt: "2030-01-01T00:00:00.000Z",
    matchers: [{ isEqual: true, isRegex: false, name: "alertname", value: "probe" }],
    startsAt: "2026-11-01T16:20:07.018Z",
  };

  test("createAlert posts the bare list, and takes an empty 200", async () => {
    const { calls, layer } = fake({ status: 200 });
    await run(alertmanager.createAlert({ body: [{ labels: { alertname: "probe" } }] }), layer);
    expect(calls[0]).toEqual({
      method: "POST",
      url: `${ROOT}/api/v2/alerts`,
      authorization: BASIC,
      body: JSON.stringify([{ labels: { alertname: "probe" } }]),
    });
  });

  test("getAlerts sends its filters and decodes the bare list", async () => {
    const { calls, layer } = fake({ status: 200, body: JSON.stringify([ALERT]) });
    const found = await run(
      alertmanager.getAlerts({ active: true, filter: ['alertname="probe"', 'a="b"'] }),
      layer,
    );
    const url = new URL(calls[0]!.url);
    expect(url.searchParams.get("active")).toEqual("true");
    expect(url.searchParams.getAll("filter")).toEqual(['alertname="probe"', 'a="b"']);
    expect(found[0]?.labels).toEqual({ alertname: "probe" });
    expect(found[0]?.status.state).toEqual("active");
  });

  test("a silence reads back without annotations", async () => {
    const { calls, layer } = fake({ status: 200, body: JSON.stringify(SILENCE) });
    const found = await run(alertmanager.getSilence({ silenceID: SILENCE.id }), layer);
    expect(new URL(calls[0]!.url).pathname).toEqual(`/instances/0000/api/v2/silence/${SILENCE.id}`);
    expect(found.status.state).toEqual("active");
    expect(found.matchers[0]?.name).toEqual("alertname");
  });

  test("createSilence returns the new id", async () => {
    const { calls, layer } = fake({
      status: 200,
      body: JSON.stringify({ silenceID: SILENCE.id }),
    });
    const created = await run(
      alertmanager.createSilence({
        matchers: SILENCE.matchers,
        startsAt: SILENCE.startsAt,
        endsAt: SILENCE.endsAt,
        createdBy: "t",
        comment: "c",
      }),
      layer,
    );
    expect(created.silenceID).toEqual(SILENCE.id);
    expect(JSON.parse(calls[0]!.body!).comment).toEqual("c");
  });

  test("an unknown silence is a NotFound", async () => {
    const { layer } = fake({ status: 404 });
    const error = await run(
      alertmanager.getSilence({ silenceID: SILENCE.id }).pipe(Effect.flip),
      layer,
    );
    expect(error._tag).toEqual("NotFound");
  });

  test("a bad filter's bare JSON string becomes the message of a BadRequest", async () => {
    const { layer } = fake({ status: 400, body: '"unexpected open or close brace: {"' });
    const error = await run(alertmanager.getAlerts({ filter: ["{"] }).pipe(Effect.flip), layer);
    expect(error._tag).toEqual("BadRequest");
    expect(error.message).toContain("unexpected open or close brace");
  });
});

describe("Loki on an Observability instance", () => {
  test("push signs with the credential's HTTP Basic on the root of logsPushUrl", async () => {
    const { calls, layer } = fake(
      { status: 204 },
      "https://logs.stackit1.argus.eu01.stackit.cloud/instances/0000/loki/api/v1/push",
    );
    await run(
      loki.push({
        streams: [{ stream: { app: "tea" }, values: [["1793548133000000000", "hello"]] }],
      }),
      layer,
    );
    expect(calls[0]?.url).toEqual(
      "https://logs.stackit1.argus.eu01.stackit.cloud/instances/0000/loki/api/v1/push",
    );
    expect(calls[0]?.authorization).toEqual(BASIC);
  });
});
