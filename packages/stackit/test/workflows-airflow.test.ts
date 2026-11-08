import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as Retry from "../src/retry.ts";
import * as airflow from "../src/services/workflows_airflow.ts";
import {
  makeWorkflowsAirflowSession,
  withWorkflowsAirflowSession,
  workflowsAirflowApiUrl,
} from "../src/workflows-airflow.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly cookie: string | undefined;
  readonly body: unknown;
}

interface Answer {
  readonly status: number;
  readonly body?: unknown;
  readonly setCookie?: ReadonlyArray<string>;
}

const DISCOVERY = "https://idp.example.test/.well-known/openid-configuration";
const TOKEN_URL = "https://idp.example.test/oauth2/token";
const INSTANCE_URL = "https://airflow.example.test/";
const SECRET = "a-client-secret";

/** Bodies below are the ones the apache/airflow:3.1.8 image answered, so these pin the spec. */
const DAG_RUN = {
  dag_run_id: "r1",
  dag_id: "probe",
  logical_date: null,
  queued_at: "2026-11-01T16:09:46.367804Z",
  start_date: null,
  end_date: null,
  duration: null,
  data_interval_start: null,
  data_interval_end: null,
  run_after: "2026-11-01T16:09:46.355196Z",
  last_scheduling_decision: null,
  run_type: "manual",
  state: "queued",
  triggered_by: "rest_api",
  triggering_user_name: "Anonymous",
  conf: { a: 1 },
  note: "hello",
  dag_versions: [
    {
      id: "01a197df-8327-7921-b85e-d427f1073140",
      version_number: 1,
      dag_id: "probe",
      bundle_name: "dags-folder",
      bundle_version: null,
      created_at: "2026-11-01T16:09:30.151618Z",
      dag_display_name: "probe",
      bundle_url: null,
    },
  ],
  bundle_version: null,
  dag_display_name: "probe",
};

/** Answered by the image for `POST` and `PATCH /api/v2/variables`, read 2026-11-01. */
const VARIABLE = {
  key: "alchemy_v",
  value: "a-value",
  description: null,
  is_encrypted: true,
};

/** Answered by the image for `POST` and `PATCH /api/v2/connections`, read 2026-11-01. */
const CONNECTION = {
  connection_id: "alchemy_c",
  conn_type: "http",
  description: "d",
  host: "example.com",
  login: "u",
  schema: "s",
  port: 443,
  password: "***",
  extra: '{"a": 1}',
};

const DAG = {
  dag_id: "probe",
  dag_display_name: "probe",
  is_paused: false,
  is_stale: false,
  last_parsed_time: "2026-11-01T16:09:30.128689Z",
  last_parse_duration: 0.07133909099502489,
  last_expired: null,
  bundle_name: "dags-folder",
  bundle_version: null,
  relative_fileloc: "probe.py",
  fileloc: "/opt/airflow/dags/probe.py",
  description: null,
  timetable_summary: null,
  timetable_description: "Never, external triggers only",
  tags: [],
  max_active_tasks: 16,
  max_active_runs: 16,
  max_consecutive_failed_dag_runs: 0,
  has_task_concurrency_limits: false,
  has_import_errors: false,
  next_dagrun_logical_date: null,
  next_dagrun_data_interval_start: null,
  next_dagrun_data_interval_end: null,
  next_dagrun_run_after: null,
  owners: ["airflow"],
  file_token: "a-signed-file-token",
};

const TASK_INSTANCE = {
  id: "01a197df-c29f-7ac9-87af-567c2e61921e",
  task_id: "noop",
  dag_id: "probe",
  dag_run_id: "r1",
  map_index: -1,
  logical_date: null,
  run_after: "2026-11-01T16:09:46.355196Z",
  start_date: "2026-11-01T16:09:47.932403Z",
  end_date: "2026-11-01T16:09:47.932412Z",
  duration: 0.0,
  state: "success",
  try_number: 1,
  max_tries: 0,
  task_display_name: "noop",
  dag_display_name: "probe",
  hostname: "",
  unixname: "airflow",
  pool: "default_pool",
  pool_slots: 1,
  queue: "default",
  priority_weight: 1,
  operator: "EmptyOperator",
  operator_name: "EmptyOperator",
  queued_when: null,
  scheduled_when: null,
  pid: null,
  executor: null,
  executor_config: "{}",
  note: null,
  rendered_map_index: null,
  rendered_fields: {},
  trigger: null,
  triggerer_job: null,
  dag_version: DAG_RUN.dag_versions[0],
};

const SESSION_OK: Answer = {
  status: 200,
  setCookie: ["_token=cookie-1; Path=/; Max-Age=86400; HttpOnly"],
};

const fakeAirflow = (
  reply: (call: Captured) => Answer,
  overrides: {
    readonly session?: () => Answer;
    readonly token?: () => Answer;
    readonly discovery?: () => Answer;
  } = {},
) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const text =
          request.body._tag === "Uint8Array"
            ? new TextDecoder().decode(request.body.body)
            : undefined;
        const call: Captured = {
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          cookie: request.headers.cookie,
          body: text === undefined ? undefined : text.startsWith("{") ? JSON.parse(text) : text,
        };
        calls.push(call);
        const answer =
          url.toString() === DISCOVERY
            ? (overrides.discovery?.() ?? {
                status: 200,
                body: { issuer: "https://idp.example.test", token_endpoint: TOKEN_URL },
              })
            : url.toString() === TOKEN_URL
              ? (overrides.token?.() ?? {
                  status: 200,
                  body: { access_token: "an-access-token", expires_in: 300 },
                })
              : url.pathname === "/api/stackit/v1/session"
                ? (overrides.session?.() ?? SESSION_OK)
                : reply(call);
        const headers = new Headers();
        for (const cookie of answer.setCookie ?? []) headers.append("set-cookie", cookie);
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
            status: answer.status,
            headers,
          }),
        );
      }),
    ),
  );
  return { calls, layer };
};

const newSession = () =>
  makeWorkflowsAirflowSession({
    instanceUrl: INSTANCE_URL,
    discoveryEndpoint: DISCOVERY,
    clientId: "ci",
    clientSecret: Redacted.make(SECRET),
    scope: "workflows",
  });

/** Run with the fake and no retries, so a typed error surfaces at once. */
const run = <A, E, R>(effect: Effect.Effect<A, E, R>, layer: Layer.Layer<HttpClient.HttpClient>) =>
  effect.pipe(Retry.none, Effect.provide(layer), Effect.runPromise) as Promise<A>;

const failure = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  layer: Layer.Layer<HttpClient.HttpClient>,
) => run(Effect.flip(effect), layer);

const getDag = airflow.getDag({ dag_id: "probe" });

describe("workflowsAirflowApiUrl", () => {
  test("normalizes an instance's URL", () => {
    expect(workflowsAirflowApiUrl("https://airflow.example.test/")).toEqual(
      "https://airflow.example.test",
    );
    expect(workflowsAirflowApiUrl("airflow.example.test")).toEqual("https://airflow.example.test");
    expect(workflowsAirflowApiUrl("https://user:pw@airflow.example.test/x/")).toEqual(
      "https://airflow.example.test/x",
    );
    expect(workflowsAirflowApiUrl("not a url")).toBeUndefined();
  });
});

describe("the session", () => {
  test("follows the documented steps once, and signs each call with the cookie", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: DAG }));
    const operation = getDag.pipe(withWorkflowsAirflowSession(newSession()));
    const first = await run(operation, layer);
    await run(operation, layer);

    expect(first.dag_id).toEqual("probe");
    expect(calls.map((call) => `${call.method} ${call.url}`)).toEqual([
      `GET ${DISCOVERY}`,
      `POST ${TOKEN_URL}`,
      "POST https://airflow.example.test/api/stackit/v1/session",
      "GET https://airflow.example.test/api/v2/dags/probe",
      "GET https://airflow.example.test/api/v2/dags/probe",
    ]);
    expect(calls[1]).toMatchObject({
      authorization: `Basic ${btoa(`ci:${SECRET}`)}`,
      body: "grant_type=client_credentials&scope=workflows",
    });
    expect(calls[2]).toMatchObject({ authorization: "Bearer an-access-token" });
    expect(calls[3]).toMatchObject({ cookie: "_token=cookie-1", authorization: undefined });
    expect(calls[4]).toMatchObject({ cookie: "_token=cookie-1" });
  });

  test("sends every live cookie, and drops one the server is clearing", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: DAG }), {
      session: () => ({
        status: 204,
        setCookie: ["_token=a; Path=/", "session=b; Path=/", "old=; Path=/; Max-Age=0"],
      }),
    });
    await run(getDag.pipe(withWorkflowsAirflowSession(newSession())), layer);
    expect(calls.at(-1)?.cookie).toEqual("_token=a; session=b");
  });

  test("drops a cookie whose Expires has passed, and keeps a session with no stated expiry", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: DAG }), {
      session: () => ({
        status: 200,
        setCookie: ["_token=a; Path=/; Expires=Thu, 01 Jan 2015 00:00:00 GMT", "live=b"],
      }),
    });
    const operation = getDag.pipe(withWorkflowsAirflowSession(newSession()));
    await run(operation, layer);
    await run(operation, layer);
    // The first cookie was out of date on arrival, so only `live` is sent, with no stated expiry.
    expect(calls.filter((call) => call.url.endsWith("/session"))).toHaveLength(1);
    expect(calls.at(-1)?.cookie).toEqual("live=b");
  });

  test("a session that nears its expiry is exchanged again, discovery isn't", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: DAG }), {
      session: () => ({ status: 200, setCookie: ["_token=a; Max-Age=1"] }),
    });
    const operation = getDag.pipe(withWorkflowsAirflowSession(newSession()));
    await run(operation, layer);
    await Effect.runPromise(Effect.sleep("600 millis"));
    await run(operation, layer);
    expect(calls.filter((call) => call.url.endsWith("/session"))).toHaveLength(2);
    expect(calls.filter((call) => call.url === DISCOVERY)).toHaveLength(1);
  });

  test.each([
    { status: 401, detail: "Token has expired" },
    { status: 403, detail: "Invalid JWT token" },
  ])("logs in once more on $status $detail, and repeats the call once", async (lost) => {
    let answers = 0;
    let sessions = 0;
    const { calls, layer } = fakeAirflow(
      () =>
        answers++ === 0
          ? { status: lost.status, body: { detail: lost.detail } }
          : { status: 200, body: DAG },
      {
        session: () => ({ status: 200, setCookie: [`_token=cookie-${++sessions}`] }),
      },
    );
    const dag = await run(getDag.pipe(withWorkflowsAirflowSession(newSession())), layer);
    expect(dag.dag_id).toEqual("probe");
    expect(calls.at(-1)?.cookie).toEqual("_token=cookie-2");
  });

  test("a role that doesn't allow the call is the caller's, without a new login", async () => {
    const { calls, layer } = fakeAirflow(() => ({
      status: 403,
      body: { detail: "Forbidden" },
    }));
    const error = await failure(getDag.pipe(withWorkflowsAirflowSession(newSession())), layer);
    expect(error._tag).toEqual("Forbidden");
    expect(calls.filter((call) => call.url.endsWith("/session"))).toHaveLength(1);
  });

  test("a second lost session is the caller's", async () => {
    const { calls, layer } = fakeAirflow(() => ({
      status: 401,
      body: { detail: "Token has expired" },
    }));
    const error = await failure(getDag.pipe(withWorkflowsAirflowSession(newSession())), layer);
    expect(error._tag).toEqual("Unauthorized");
    expect(calls.filter((call) => call.url.endsWith("/api/v2/dags/probe"))).toHaveLength(2);
  });

  test("a refused exchange fails with ConfigError, explains itself, and is held", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: DAG }), {
      session: () => ({ status: 403, body: { detail: "Session endpoint is disabled" } }),
    });
    const session = newSession();
    const first = await failure(getDag.pipe(withWorkflowsAirflowSession(session)), layer);
    const second = await failure(getDag.pipe(withWorkflowsAirflowSession(session)), layer);
    expect(first).toBeInstanceOf(ConfigError);
    expect((first as ConfigError).message).toContain("Session endpoint is disabled");
    expect((first as ConfigError).message).toContain("apiAudience");
    expect(second).toBe(first);
    expect(calls.filter((call) => call.url.endsWith("/session"))).toHaveLength(1);
  });

  test("a refused token request names no secret", async () => {
    const { layer } = fakeAirflow(() => ({ status: 200, body: DAG }), {
      token: () => ({
        status: 401,
        body: { error: "invalid_client", error_description: "Bad client", echoed: SECRET },
      }),
    });
    const error = await failure(getDag.pipe(withWorkflowsAirflowSession(newSession())), layer);
    expect(error).toBeInstanceOf(ConfigError);
    expect((error as ConfigError).message).toContain("invalid_client: Bad client");
    expect((error as ConfigError).message).not.toContain(SECRET);
  });

  test("an outage isn't held", async () => {
    let answers = 0;
    const { layer } = fakeAirflow(() => ({ status: 200, body: DAG }), {
      session: () => (answers++ === 0 ? { status: 503 } : SESSION_OK),
    });
    const session = newSession();
    const operation = getDag.pipe(withWorkflowsAirflowSession(session));
    const error = await failure(operation, layer);
    expect(error).toBeInstanceOf(ConfigError);
    expect((await run(operation, layer)).dag_id).toEqual("probe");
  });

  test.each([
    ["no cookie", { session: () => ({ status: 200 }) }, "set no cookie"],
    [
      "a discovery document without a token endpoint",
      { discovery: () => ({ status: 200, body: { issuer: "x" } }) },
      "token_endpoint",
    ],
    [
      "a token endpoint that isn't https",
      { discovery: () => ({ status: 200, body: { token_endpoint: "http://idp.example.test/t" } }) },
      "token_endpoint",
    ],
    ["no token", { token: () => ({ status: 200, body: {} }) }, "access_token"],
  ])("fails on %s", async (_name, overrides, text) => {
    const { layer } = fakeAirflow(() => ({ status: 200, body: DAG }), overrides);
    const error = await failure(getDag.pipe(withWorkflowsAirflowSession(newSession())), layer);
    expect(error).toBeInstanceOf(ConfigError);
    expect((error as ConfigError).message).toContain(text);
  });

  test("an instance URL that isn't one fails each call with ConfigError", async () => {
    const { layer } = fakeAirflow(() => ({ status: 200, body: DAG }));
    const session = makeWorkflowsAirflowSession({
      instanceUrl: "not a url",
      discoveryEndpoint: DISCOVERY,
      clientId: "ci",
      clientSecret: Redacted.make(SECRET),
    });
    const error = await failure(getDag.pipe(withWorkflowsAirflowSession(session)), layer);
    expect(error).toBeInstanceOf(ConfigError);
  });
});

describe("the operations", () => {
  const signed = <A, E extends { readonly _tag: string }, R>(operation: Effect.Effect<A, E, R>) =>
    operation.pipe(withWorkflowsAirflowSession(newSession()));

  test("triggerDagRun posts the run, including a null logical date", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: DAG_RUN }));
    const started = await run(
      signed(
        airflow.triggerDagRun({
          dag_id: "probe",
          dag_run_id: "r1",
          logical_date: null,
          conf: { a: 1 },
          note: "hello",
        }),
      ),
      layer,
    );
    expect(started).toMatchObject({ dag_run_id: "r1", state: "queued", conf: { a: 1 } });
    expect(calls.at(-1)).toMatchObject({
      method: "POST",
      url: "https://airflow.example.test/api/v2/dags/probe/dagRuns",
      body: { dag_run_id: "r1", logical_date: null, conf: { a: 1 }, note: "hello" },
    });
  });

  test("triggerDagRun types a run id that exists", async () => {
    const { layer } = fakeAirflow(() => ({
      status: 409,
      body: {
        detail: {
          reason: "Unique constraint violation",
          statement: "INSERT INTO dag_run ...",
          orig_error: "UNIQUE constraint failed: dag_run.dag_id, dag_run.run_id",
          message: "Serious error when handling your request.",
        },
      },
    }));
    const error = await failure(
      signed(airflow.triggerDagRun({ dag_id: "probe", dag_run_id: "r1", logical_date: null })),
      layer,
    );
    expect(error._tag).toEqual("Conflict");
    expect((error as airflow.Conflict).message).toEqual("Unique constraint violation");
  });

  test("a body that doesn't validate is typed, with the field in the message", async () => {
    const { layer } = fakeAirflow(() => ({
      status: 422,
      body: {
        detail: [
          {
            type: "bool_parsing",
            loc: ["body", "is_paused"],
            msg: "Input should be a valid boolean, unable to interpret input",
            input: "maybe x",
          },
        ],
      },
    }));
    const error = await failure(
      signed(airflow.patchDag({ dag_id: "probe", is_paused: true })),
      layer,
    );
    expect(error._tag).toEqual("UnprocessableEntity");
    expect((error as airflow.UnprocessableEntity).message).toContain("body.is_paused");
  });

  test("getDagRun reads a run, and types a missing one", async () => {
    const { calls, layer } = fakeAirflow((call) =>
      call.url.endsWith("/nope")
        ? {
            status: 404,
            body: {
              detail: "The DagRun with dag_id: `probe` and run_id: `nope` was not found",
            },
          }
        : { status: 200, body: { ...DAG_RUN, state: "success", duration: 1.09 } },
    );
    const session = newSession();
    const read = await run(
      airflow
        .getDagRun({ dag_id: "probe", dag_run_id: "r1" })
        .pipe(withWorkflowsAirflowSession(session)),
      layer,
    );
    expect(read).toMatchObject({ state: "success", duration: 1.09 });
    expect(calls.at(-1)?.url).toEqual("https://airflow.example.test/api/v2/dags/probe/dagRuns/r1");
    const error = await failure(
      airflow
        .getDagRun({ dag_id: "probe", dag_run_id: "nope" })
        .pipe(withWorkflowsAirflowSession(session)),
      layer,
    );
    expect(error._tag).toEqual("NotFound");
  });

  test("listDagRuns sends a list filter as repeated parameters", async () => {
    const { calls, layer } = fakeAirflow(() => ({
      status: 200,
      body: { dag_runs: [DAG_RUN], total_entries: 2 },
    }));
    const listed = await run(
      signed(
        airflow.listDagRuns({
          dag_id: "~",
          limit: 1,
          offset: 1,
          state: ["queued", "running"],
          order_by: ["-run_after"],
        }),
      ),
      layer,
    );
    expect(listed.total_entries).toEqual(2);
    expect(listed.dag_runs[0]?.dag_run_id).toEqual("r1");
    const url = new URL(calls.at(-1)!.url);
    expect(url.pathname).toEqual("/api/v2/dags/~/dagRuns");
    expect(url.searchParams.getAll("state")).toEqual(["queued", "running"]);
    expect(url.searchParams.get("limit")).toEqual("1");
    expect(url.searchParams.get("offset")).toEqual("1");
    expect(url.searchParams.getAll("order_by")).toEqual(["-run_after"]);
  });

  test("listTaskInstances reads a run's tasks", async () => {
    const { calls, layer } = fakeAirflow(() => ({
      status: 200,
      body: { task_instances: [TASK_INSTANCE], total_entries: 1 },
    }));
    const listed = await run(
      signed(airflow.listTaskInstances({ dag_id: "probe", dag_run_id: "r1", state: ["success"] })),
      layer,
    );
    expect(listed.task_instances[0]).toMatchObject({ task_id: "noop", state: "success" });
    expect(calls.at(-1)?.url).toEqual(
      "https://airflow.example.test/api/v2/dags/probe/dagRuns/r1/taskInstances?state=success",
    );
  });

  test("patchDag sends the pause state", async () => {
    const { calls, layer } = fakeAirflow(() => ({
      status: 200,
      body: { ...DAG, is_paused: true },
    }));
    const dag = await run(signed(airflow.patchDag({ dag_id: "probe", is_paused: true })), layer);
    expect(dag.is_paused).toEqual(true);
    expect(calls.at(-1)).toMatchObject({
      method: "PATCH",
      url: "https://airflow.example.test/api/v2/dags/probe",
      body: { is_paused: true },
    });
  });

  test("patchVariable sends the key in the path and the body, and types a missing one", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: VARIABLE }));
    const variable = await run(
      signed(
        airflow.patchVariable({
          variable_key: "alchemy_v",
          key: "alchemy_v",
          value: Redacted.make("a-value"),
        }),
      ),
      layer,
    );
    expect(Redacted.isRedacted(variable.value)).toEqual(true);
    expect(calls.at(-1)).toMatchObject({
      method: "PATCH",
      url: "https://airflow.example.test/api/v2/variables/alchemy_v",
      body: { key: "alchemy_v", value: "a-value" },
    });

    const missing = fakeAirflow(() => ({
      status: 404,
      body: { detail: "The Variable with key: `alchemy_v` was not found" },
    }));
    const error = await failure(
      signed(airflow.patchVariable({ variable_key: "alchemy_v", key: "alchemy_v", value: "a" })),
      missing.layer,
    );
    expect(error._tag).toEqual("NotFound");
  });

  test("createVariable types a key that exists", async () => {
    const { layer, calls } = fakeAirflow(() => ({
      status: 409,
      body: { detail: "The Variable with key: `alchemy_v` already exists" },
    }));
    const error = await failure(
      signed(airflow.createVariable({ key: "alchemy_v", value: "a" })),
      layer,
    );
    expect(error._tag).toEqual("Conflict");
    expect(calls.at(-1)).toMatchObject({
      method: "POST",
      url: "https://airflow.example.test/api/v2/variables",
      body: { key: "alchemy_v", value: "a" },
    });
  });

  test("patchConnection sends connection_id in the body too, and keeps secrets Redacted", async () => {
    const { calls, layer } = fakeAirflow(() => ({ status: 200, body: CONNECTION }));
    const connection = await run(
      signed(
        airflow.patchConnection({
          connection_key: "alchemy_c",
          connection_id: "alchemy_c",
          conn_type: "http",
          host: "example.org",
          password: Redacted.make("a-password"),
        }),
      ),
      layer,
    );
    expect(connection.host).toEqual("example.com");
    expect(Redacted.isRedacted(connection.password)).toEqual(true);
    expect(calls.at(-1)).toMatchObject({
      method: "PATCH",
      url: "https://airflow.example.test/api/v2/connections/alchemy_c",
      body: {
        connection_id: "alchemy_c",
        conn_type: "http",
        host: "example.org",
        password: "a-password",
      },
    });
  });

  test("createConnection types an id that exists, whose detail is an object", async () => {
    const { layer } = fakeAirflow(() => ({
      status: 409,
      body: {
        detail: {
          reason: "Unique constraint violation",
          statement: "INSERT INTO connection ...",
          orig_error: "UNIQUE constraint failed: connection.conn_id",
          message: "Serious error when handling your request.",
        },
      },
    }));
    const error = await failure(
      signed(airflow.createConnection({ connection_id: "alchemy_c", conn_type: "http" })),
      layer,
    );
    expect(error._tag).toEqual("Conflict");
  });

  test("getDag keeps the file token Redacted", async () => {
    const { layer } = fakeAirflow(() => ({ status: 200, body: DAG }));
    const dag = await run(signed(getDag), layer);
    expect(Redacted.isRedacted(dag.file_token)).toEqual(true);
    expect(JSON.stringify(dag)).not.toContain("a-signed-file-token");
  });
});
