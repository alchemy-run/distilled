import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  DremioEndpoint,
  dremioApiUrl,
  dremioFromToken,
  makeDremioLogin,
  withDremioLogin,
} from "../src/dremio.ts";
import * as Retry from "../src/retry.ts";
import * as rest from "../src/services/dremio_rest.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly body: unknown;
}

interface Answer {
  readonly status: number;
  readonly body?: unknown;
}

const UI_URL = "https://dremio.example.test/";
const PASSWORD = "a-password-of-the-user";
const FAR_FUTURE = 4_102_444_800_000;

const LOGIN_OK: Answer = {
  status: 200,
  body: { token: "token-1", expires: FAR_FUTURE, userName: "probe" },
};

/**
 * Bodies below are the ones the dremio/dremio-oss image answered (26.0.5), so these tests
 * pin the spec to the wire. Answers `/apiv2/login` with `login`, anything else with `reply`.
 */
const fakeDremio = (reply: (call: Captured) => Answer, login: () => Answer = () => LOGIN_OK) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const call: Captured = {
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          body:
            request.body._tag === "Uint8Array"
              ? JSON.parse(new TextDecoder().decode(request.body.body))
              : undefined,
        };
        calls.push(call);
        const answer = url.pathname === "/apiv2/login" ? login() : reply(call);
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
            status: answer.status,
          }),
        );
      }),
    ),
  );
  return { calls, layer };
};

const newLogin = () =>
  makeDremioLogin({
    uiUrl: UI_URL,
    username: "probe",
    password: Redacted.make(PASSWORD),
  });

/** Run with the fake and no retries, so a typed error surfaces at once. */
const run = <A, E, R>(effect: Effect.Effect<A, E, R>, layer: Layer.Layer<HttpClient.HttpClient>) =>
  effect.pipe(Retry.none, Effect.provide(layer), Effect.runPromise) as Promise<A>;

const failure = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  layer: Layer.Layer<HttpClient.HttpClient>,
) => run(Effect.flip(effect), layer);

describe("dremioApiUrl", () => {
  test("normalizes an instance's UI endpoint", () => {
    expect(dremioApiUrl("https://dremio.example.test/")).toEqual("https://dremio.example.test");
    expect(dremioApiUrl("dremio.example.test")).toEqual("https://dremio.example.test");
    expect(dremioApiUrl("https://user:pw@dremio.example.test/x/")).toEqual(
      "https://dremio.example.test/x",
    );
    expect(dremioApiUrl("not a url")).toBeUndefined();
  });
});

describe("the login", () => {
  test("posts the password, sends no token, and caches what it gets", async () => {
    const { calls, layer } = fakeDremio(() => ({
      status: 200,
      body: { id: "1518a114-38c6-37b9-17f2-b0a6044cfb00" },
    }));
    const login = newLogin();
    const submit = rest.submitSql({ sql: "SELECT 1" }).pipe(withDremioLogin(login));
    const first = await run(submit, layer);
    const second = await run(submit, layer);

    expect(first.id).toEqual("1518a114-38c6-37b9-17f2-b0a6044cfb00");
    expect(second.id).toEqual(first.id);
    const logins = calls.filter((call) => call.url.endsWith("/apiv2/login"));
    expect(logins).toHaveLength(1);
    expect(logins[0]).toMatchObject({
      method: "POST",
      url: "https://dremio.example.test/apiv2/login",
      authorization: undefined,
      body: { userName: "probe", password: PASSWORD },
    });
    expect(calls.filter((call) => call.url.endsWith("/api/v3/sql"))[1]).toMatchObject({
      method: "POST",
      authorization: "Bearer token-1",
      body: { sql: "SELECT 1" },
    });
  });

  test("keeps the token Redacted", async () => {
    const { layer } = fakeDremio(() => ({ status: 200 }));
    const login = await run(
      rest
        .login({ userName: "probe", password: Redacted.make(PASSWORD) })
        .pipe(Effect.provideService(DremioEndpoint, "https://dremio.example.test")),
      layer,
    );
    expect(Redacted.isRedacted(login.token)).toEqual(true);
    expect(JSON.stringify(login)).not.toContain("token-1");
  });

  test("logs in again when the token nears its expiry", async () => {
    const { calls, layer } = fakeDremio(
      () => ({ status: 200, body: { id: "job" } }),
      () => ({ status: 200, body: { token: "token-1", expires: 0 } }),
    );
    const submit = rest.submitSql({ sql: "SELECT 1" }).pipe(withDremioLogin(newLogin()));
    await run(submit, layer);
    await run(submit, layer);
    expect(calls.filter((call) => call.url.endsWith("/apiv2/login"))).toHaveLength(2);
  });

  test("logs in once more on Unauthorized, and repeats the call once", async () => {
    let answers = 0;
    let logins = 0;
    const { calls, layer } = fakeDremio(
      () => (answers++ === 0 ? { status: 401 } : { status: 200, body: { id: "job" } }),
      () => ({ status: 200, body: { token: `token-${++logins}`, expires: FAR_FUTURE } }),
    );
    const submitted = await run(
      rest.submitSql({ sql: "SELECT 1" }).pipe(withDremioLogin(newLogin())),
      layer,
    );
    expect(submitted.id).toEqual("job");
    expect(calls.filter((call) => call.url.endsWith("/api/v3/sql")).at(-1)?.authorization).toEqual(
      "Bearer token-2",
    );
  });

  test("a second Unauthorized is the caller's", async () => {
    const { calls, layer } = fakeDremio(() => ({ status: 401 }));
    const error = await failure(
      rest.submitSql({ sql: "SELECT 1" }).pipe(withDremioLogin(newLogin())),
      layer,
    );
    expect(error._tag).toEqual("Unauthorized");
    expect(calls.filter((call) => call.url.endsWith("/api/v3/sql"))).toHaveLength(2);
  });

  test("holds a refused login, and never quotes the password", async () => {
    const { calls, layer } = fakeDremio(
      () => ({ status: 200, body: { id: "job" } }),
      () => ({
        status: 401,
        body: {
          errorMessage: "Login failed: Invalid username or password, user probe",
          moreInfo: "",
          stackTrace: [],
        },
      }),
    );
    const submit = rest.submitSql({ sql: "SELECT 1" }).pipe(withDremioLogin(newLogin()));
    const first = await failure(submit, layer);
    const second = await failure(submit, layer);

    expect(first).toBeInstanceOf(ConfigError);
    expect((second as ConfigError).message).toEqual((first as ConfigError).message);
    expect((first as ConfigError).message).toContain("LoginRefused");
    expect((first as ConfigError).message).toContain("Invalid username or password");
    expect((first as ConfigError).message).not.toContain(PASSWORD);
    expect(calls.filter((call) => call.url.endsWith("/apiv2/login"))).toHaveLength(1);
    expect(calls.filter((call) => call.url.endsWith("/api/v3/sql"))).toHaveLength(0);
  });

  test("a UI endpoint that isn't a URL fails each call with ConfigError", async () => {
    const { layer } = fakeDremio(() => ({ status: 200 }));
    const login = makeDremioLogin({
      uiUrl: "not a url",
      username: "probe",
      password: Redacted.make(PASSWORD),
    });
    const error = await failure(
      rest.submitSql({ sql: "SELECT 1" }).pipe(withDremioLogin(login)),
      layer,
    );
    expect(error).toBeInstanceOf(ConfigError);
  });
});

describe("the operations", () => {
  const withToken = dremioFromToken({ uiUrl: UI_URL, token: Redacted.make("a-pat") });

  test("reads a job", async () => {
    const { calls, layer } = fakeDremio(() => ({
      status: 200,
      body: {
        jobState: "COMPLETED",
        rowCount: 1,
        errorMessage: "",
        startedAt: "2026-11-01T15:46:51.770Z",
        endedAt: "2026-11-01T15:46:54.856Z",
        queryType: "REST",
        queueName: "SMALL",
        queueId: "SMALL",
        cancellationReason: "",
      },
    }));
    const job = await run(rest.getJob({ id: "job-1" }).pipe(Effect.provide(withToken)), layer);
    expect(job.jobState).toEqual("COMPLETED");
    expect(job.rowCount).toEqual(1);
    expect(calls[0]).toMatchObject({
      method: "GET",
      url: "https://dremio.example.test/api/v3/job/job-1",
      authorization: "Bearer a-pat",
    });
  });

  test("reads a page of results, columns as Dremio names them", async () => {
    const { calls, layer } = fakeDremio(() => ({
      status: 200,
      body: {
        rowCount: 1,
        schema: [
          { name: "a_column", type: { name: "INTEGER" } },
          { name: "c", type: { name: "DECIMAL", precision: 2, scale: 1 } },
          { name: "l", type: { name: "LIST", subSchema: [{ type: { name: "INTEGER" } }] } },
          {
            name: "s",
            type: { name: "STRUCT", subSchema: [{ name: "a", type: { name: "BIGINT" } }] },
          },
        ],
        rows: [{ a_column: 1, c: 2.5, l: [1, 2], s: { a: 1 }, e: null }],
      },
    }));
    const results = await run(
      rest.getJobResults({ id: "job-1", limit: 10, offset: 20 }).pipe(Effect.provide(withToken)),
      layer,
    );
    expect(results.rows).toEqual([{ a_column: 1, c: 2.5, l: [1, 2], s: { a: 1 }, e: null }]);
    expect(results.schema[1]).toEqual({
      name: "c",
      type: { name: "DECIMAL", precision: 2, scale: 1 },
    });
    expect(calls[0]?.url).toEqual(
      "https://dremio.example.test/api/v3/job/job-1/results?offset=20&limit=10",
    );
  });

  test("submits the context and references", async () => {
    const { calls, layer } = fakeDremio(() => ({ status: 200, body: { id: "job" } }));
    await run(
      rest
        .submitSql({
          sql: "SELECT 1",
          context: ["Samples"],
          references: { nessie: { type: "BRANCH", value: "main" } },
        })
        .pipe(Effect.provide(withToken)),
      layer,
    );
    expect(calls[0]?.body).toEqual({
      sql: "SELECT 1",
      context: ["Samples"],
      references: { nessie: { type: "BRANCH", value: "main" } },
    });
  });

  test("cancels with no body", async () => {
    const { calls, layer } = fakeDremio(() => ({ status: 204 }));
    await run(rest.cancelJob({ id: "job-1" }).pipe(Effect.provide(withToken)), layer);
    expect(calls[0]).toMatchObject({
      method: "POST",
      url: "https://dremio.example.test/api/v3/job/job-1/cancel",
    });
  });

  test.each([
    {
      name: "a missing job",
      operation: rest.getJob({ id: "job-1" }),
      status: 404,
      errorMessage: "Could not find a job with id [job-1]",
      tag: "JobNotFound",
    },
    {
      name: "results of a job still running",
      operation: rest.getJobResults({ id: "job-1" }),
      status: 400,
      errorMessage: "Can not fetch details for a job that is in [PLANNING] state.",
      tag: "JobResultsNotReady",
    },
    {
      name: "a limit past the maximum",
      operation: rest.getJobResults({ id: "job-1", limit: 501 }),
      status: 400,
      errorMessage: "limit can not exceed 500 rows",
      tag: "BadRequest",
    },
    {
      name: "a finished job on cancel",
      operation: rest.cancelJob({ id: "job-1" }),
      status: 404,
      errorMessage: "Could not find a job with id [job-1]",
      tag: "JobNotFound",
    },
  ])("types $name", async ({ operation, status, errorMessage, tag }) => {
    const { layer } = fakeDremio(() => ({ status, body: { errorMessage, moreInfo: "" } }));
    const error = await failure(
      (
        operation as Effect.Effect<
          unknown,
          { readonly _tag: string; readonly message?: string },
          any
        >
      ).pipe(Effect.provide(withToken)),
      layer,
    );
    expect(error._tag).toEqual(tag);
    expect(error.message).toEqual(errorMessage);
  });

  test("the empty 401 Dremio answers a stale token with is typed", async () => {
    const { layer } = fakeDremio(() => ({ status: 401 }));
    const error = await failure(
      rest.submitSql({ sql: "SELECT 1" }).pipe(Effect.provide(withToken)),
      layer,
    );
    expect(error._tag).toEqual("Unauthorized");
  });
});
