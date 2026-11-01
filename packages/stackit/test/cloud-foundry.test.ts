import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { cloudFoundryJobGuid, fromCloudFoundryPassword } from "../src/cloud-foundry.ts";
import * as Retry from "../src/retry.ts";
import * as cf from "../src/services/cloud_foundry.ts";

const API_URL = "https://api.system.example.test";
const LOGIN_URL = "https://login.system.example.test";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly contentType: string | undefined;
  readonly body: string | undefined;
}

const fake = (
  reply: (call: Captured) => {
    readonly status: number;
    readonly body?: unknown;
    readonly headers?: Record<string, string>;
  },
  token: { readonly status: number; readonly body?: unknown } = {
    status: 200,
    body: { access_token: "uaa-token", token_type: "bearer", expires_in: 3600 },
  },
) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.suspend(() => {
        const body = request.body._tag === "Uint8Array" ? request.body.body : undefined;
        const call: Captured = {
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          contentType: request.body._tag === "Uint8Array" ? request.body.contentType : undefined,
          body: body === undefined ? undefined : new TextDecoder().decode(body),
        };
        calls.push(call);
        const answer =
          url.toString() === `${API_URL}/`
            ? { status: 200, body: { links: { login: { href: LOGIN_URL } } } }
            : url.pathname === "/oauth/token"
              ? token
              : reply(call);
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
              status: answer.status,
              headers: {
                "content-type": "application/json",
                ...("headers" in answer ? answer.headers : {}),
              },
            }),
          ),
        );
      }),
    ),
  );
  return { calls, layer };
};

const provide = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  layer: Layer.Layer<HttpClient.HttpClient>,
) =>
  effect.pipe(
    Effect.provide(
      fromCloudFoundryPassword({
        apiUrl: API_URL,
        username: "manager",
        password: Redacted.make("hunter2"),
      }).pipe(Layer.provideMerge(layer)),
    ),
    Retry.none,
  ) as Effect.Effect<A, E, never>;

const GUID = "2d3f8b7e-98a0-4f0f-8b1e-000000000000";

describe("cloud_foundry", () => {
  test("logs in through the root's login link with the password grant, then signs with the token", async () => {
    const { calls, layer } = fake(() => ({
      status: 200,
      body: { guid: GUID, name: "app", state: "STARTED" },
    }));
    const app = await Effect.runPromise(provide(cf.getApp({ guid: GUID }), layer));
    expect(app.name).toEqual("app");

    expect(calls.map((call) => `${call.method} ${call.url}`)).toEqual([
      `GET ${API_URL}/`,
      `POST ${LOGIN_URL}/oauth/token`,
      `GET ${API_URL}/v3/apps/${GUID}`,
    ]);
    expect(calls[0]!.authorization).toBeUndefined();
    // The public `cf` client with its empty secret.
    expect(calls[1]!.authorization).toEqual(`Basic ${btoa("cf:")}`);
    expect(calls[1]!.contentType).toEqual("application/x-www-form-urlencoded");
    const form = new URLSearchParams(calls[1]!.body);
    expect(Object.fromEntries(form)).toEqual({
      grant_type: "password",
      username: "manager",
      password: "hunter2",
      token_format: "jwt",
    });
    expect(calls[2]!.authorization).toEqual("Bearer uaa-token");
  });

  test("reuses the token across calls", async () => {
    const { calls, layer } = fake(() => ({ status: 200, body: { guid: GUID } }));
    await Effect.runPromise(
      provide(
        Effect.gen(function* () {
          yield* cf.getApp({ guid: GUID });
          yield* cf.getApp({ guid: GUID });
        }),
        layer,
      ),
    );
    expect(calls.filter((call) => call.url.endsWith("/oauth/token"))).toHaveLength(1);
  });

  test("holds a refused login instead of trying again, and never quotes the password", async () => {
    const { calls, layer } = fake(() => ({ status: 200, body: { guid: GUID } }), {
      status: 401,
      body: { error: "unauthorized", error_description: "Bad credentials" },
    });
    const errors = await Effect.runPromise(
      provide(
        Effect.gen(function* () {
          const first = yield* Effect.flip(cf.getApp({ guid: GUID }));
          const second = yield* Effect.flip(cf.getApp({ guid: GUID }));
          return [first, second];
        }),
        layer,
      ),
    );
    expect(errors[0]).toBeInstanceOf(ConfigError);
    expect(errors[1]).toBe(errors[0]);
    expect(String((errors[0] as ConfigError).message)).toContain("Bad credentials");
    expect(String((errors[0] as ConfigError).message)).not.toContain("hunter2");
    expect(calls.filter((call) => call.url.endsWith("/oauth/token"))).toHaveLength(1);
  });

  test("refuses to send a password to a login link that isn't https", async () => {
    const calls: string[] = [];
    const layer = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request, url) =>
        Effect.sync(() => {
          calls.push(url.toString());
          return HttpClientResponse.fromWeb(
            request,
            new Response(
              JSON.stringify({ links: { login: { href: "http://login.example.test" } } }),
              {
                status: 200,
              },
            ),
          );
        }),
      ),
    );
    const error = await Effect.runPromise(provide(Effect.flip(cf.getApp({ guid: GUID })), layer));
    expect(error).toBeInstanceOf(ConfigError);
    expect(calls).toEqual([`${API_URL}/`]);
  });

  test("a delete answers the job from its Location header", async () => {
    const { layer } = fake(() => ({
      status: 202,
      headers: { location: `${API_URL}/v3/jobs/job-1` },
    }));
    const deleted = await Effect.runPromise(provide(cf.deleteApp({ guid: GUID }), layer));
    expect(cloudFoundryJobGuid(deleted.location)).toEqual("job-1");
  });

  test("a managed create's empty 202 decodes", async () => {
    const { layer } = fake(() => ({
      status: 202,
      headers: { location: `${API_URL}/v3/jobs/job-2` },
    }));
    const created = await Effect.runPromise(
      provide(
        cf.createServiceInstance({
          type: "managed",
          name: "db",
          relationships: { space: { data: { guid: GUID } } },
        }),
        layer,
      ),
    );
    expect(created.guid).toBeUndefined();
    expect(cloudFoundryJobGuid(created.location)).toEqual("job-2");
  });

  test("Cloud Controller's error envelope reaches the typed tag", async () => {
    const { layer } = fake(() => ({
      status: 404,
      body: {
        errors: [{ code: 10010, title: "CF-ResourceNotFound", detail: "App not found" }],
      },
    }));
    const error = await Effect.runPromise(provide(Effect.flip(cf.getApp({ guid: GUID })), layer));
    expect(error._tag).toEqual("NotFound");
    expect((error as cf.NotFound).message).toContain("App not found");
  });

  test("environment variables come back Redacted", async () => {
    const { layer } = fake(() => ({ status: 200, body: { var: { SECRET: "value" } } }));
    const env = await Effect.runPromise(
      provide(cf.getEnvironmentVariablesForApp({ guid: GUID }), layer),
    );
    expect(Redacted.isRedacted(env.var?.SECRET)).toBe(true);
  });

  test("a user-provided instance's credentials come back Redacted, and go out plain", async () => {
    const { calls, layer } = fake(() => ({ status: 200, body: { apiKey: "s3cret" } }));
    const credentials = await Effect.runPromise(
      provide(cf.getServiceInstanceCredentials({ guid: GUID }), layer),
    );
    expect(Redacted.isRedacted(credentials.apiKey)).toBe(true);
    expect(String(credentials.apiKey)).not.toContain("s3cret");

    await Effect.runPromise(
      provide(
        cf.updateServiceInstance({
          guid: GUID,
          credentials: { apiKey: Redacted.make("s3cret") },
        }),
        layer,
      ),
    );
    expect(JSON.parse(calls.at(-1)!.body!)).toEqual({ credentials: { apiKey: "s3cret" } });
  });

  test("lists walk every page by total_pages", async () => {
    const { calls, layer } = fake((call) => {
      const page = Number(new URL(call.url).searchParams.get("page") ?? "1");
      return {
        status: 200,
        body: {
          pagination: { total_results: 2, total_pages: 2 },
          resources: [{ guid: `app-${page}` }],
        },
      };
    });
    const apps = await Effect.runPromise(
      provide(Stream.runCollect(cf.listApps.items({ space_guids: "s" })), layer),
    );
    expect([...apps].map((app) => app.guid)).toEqual(["app-1", "app-2"]);
    expect(calls.filter((call) => call.url.includes("/v3/apps"))).toHaveLength(2);
  });
});

describe("scf", () => {
  test("deleteOrgManager types a 410", async () => {
    const scf = await import("../src/services/scf.ts");
    const { Credentials } = await import("../src/credentials.ts");
    const layer = Layer.mergeAll(
      Layer.succeed(
        Credentials,
        Effect.succeed({
          token: Redacted.make("t"),
          region: "eu01",
          apiBaseUrl: "https://scf.example.test",
        }) as never,
      ),
      Layer.succeed(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.succeed(
            HttpClientResponse.fromWeb(
              request,
              new Response(JSON.stringify({ message: "gone" }), { status: 410 }),
            ),
          ),
        ),
      ),
    );
    const error = await Effect.runPromise(
      scf
        .deleteOrgManager({ projectId: "p", region: "eu01", organizationId: "o" })
        .pipe(Effect.flip, Effect.provide(layer), Retry.none) as Effect.Effect<{ _tag: string }>,
    );
    expect(error._tag).toEqual("OrgManagerGone");
  });
});
