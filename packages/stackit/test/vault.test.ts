import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as Retry from "../src/retry.ts";
import * as kv from "../src/services/secrets_manager_kv.ts";
import { fromAppRole, userpassVaultCredentials, VaultCredentials } from "../src/vault.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly token: string | undefined;
  readonly body: unknown;
}

const API_URL = "https://prod.sm.eu01.stackit.cloud";

/** Answers logins with a token, anything else with `reply`, and records every call. */
const fakeVault = (
  reply: (call: Captured) => { readonly status: number; readonly body?: unknown },
  login: { readonly status: number; readonly body?: unknown } = {
    status: 200,
    body: { auth: { client_token: "t-1", lease_duration: 900, renewable: true } },
  },
  /** How long a login takes to answer, so other callers arrive during it. */
  loginDelayMs = 0,
) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.suspend(() => {
        const call: Captured = {
          method: request.method,
          url: url.toString(),
          token: request.headers["x-vault-token"],
          body:
            request.body._tag === "Uint8Array"
              ? JSON.parse(new TextDecoder().decode(request.body.body))
              : undefined,
        };
        calls.push(call);
        const isLogin = url.pathname.startsWith("/v1/auth/");
        const answer = isLogin ? login : reply(call);
        return Effect.as(
          Effect.sleep(isLogin ? `${loginDelayMs} millis` : "0 millis"),
          HttpClientResponse.fromWeb(
            request,
            new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
              status: answer.status,
            }),
          ),
        );
      }),
    ),
  );
  return { calls, layer };
};

const withAppRole = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  layer: Layer.Layer<HttpClient.HttpClient>,
) =>
  effect.pipe(
    Effect.provide(
      fromAppRole({
        apiUrl: `${API_URL}/`,
        roleId: "role",
        secretId: Redacted.make("secret"),
      }).pipe(Layer.provideMerge(layer)),
    ),
  );

const run = <A, E>(effect: Effect.Effect<A, E, never>) => Effect.runPromise(Effect.exit(effect));

describe("secrets_manager_kv", () => {
  test("a secret path keeps its slashes, and the token is sent as X-Vault-Token", async () => {
    const { calls, layer } = fakeVault(() => ({
      status: 200,
      body: { data: { data: { password: "hunter2" }, metadata: { version: 3 } } },
    }));
    const exit = await run(
      withAppRole(kv.getSecret({ mount: "instance-1", secretPath: "app 1/my secret" }), layer),
    );
    expect(exit._tag).toBe("Success");
    expect(calls.map((call) => [call.method, call.url])).toEqual([
      ["POST", `${API_URL}/v1/auth/approle/login`],
      ["GET", `${API_URL}/v1/instance-1/data/app%201/my%20secret`],
    ]);
    expect(calls[0]!.token).toBeUndefined();
    expect(calls[0]!.body).toEqual({ role_id: "role", secret_id: "secret" });
    expect(calls[1]!.token).toBe("t-1");
    if (exit._tag !== "Success") return;
    const value = exit.value.data.data.password;
    expect(Redacted.isRedacted(value)).toBe(true);
    expect(Redacted.value(value as Redacted.Redacted<string>)).toBe("hunter2");
    expect(exit.value.data.metadata.version).toBe(3);
  });

  test("a redacted value is unwrapped on the wire", async () => {
    const { calls, layer } = fakeVault(() => ({
      status: 200,
      body: { data: { version: 1 } },
    }));
    const exit = await run(
      withAppRole(
        kv.putSecret({
          mount: "instance-1",
          secretPath: "app",
          data: { password: Redacted.make("hunter2") },
          options: { cas: 0 },
        }),
        layer,
      ),
    );
    expect(exit._tag).toBe("Success");
    expect(calls[1]!.body).toEqual({ data: { password: "hunter2" }, options: { cas: 0 } });
  });

  test("a listing keeps the trailing slash and the list flag", async () => {
    const { calls, layer } = fakeVault(() => ({
      status: 200,
      body: { data: { keys: ["a", "b/"] } },
    }));
    const exit = await run(
      withAppRole(
        Effect.all([
          kv.listSecrets({ mount: "instance-1", secretPath: "app/sub", list: "true" }),
          kv.listRootSecrets({ mount: "instance-1", list: "true" }),
        ]),
        layer,
      ),
    );
    expect(exit._tag).toBe("Success");
    expect(calls.slice(1).map((call) => call.url)).toEqual([
      `${API_URL}/v1/instance-1/metadata/app/sub/?list=true`,
      `${API_URL}/v1/instance-1/metadata/?list=true`,
    ]);
  });

  test("Vault's errors array is the message of a typed error", async () => {
    const { layer } = fakeVault(() => ({ status: 403, body: { errors: ["permission denied"] } }));
    const error = await Effect.runPromise(
      withAppRole(kv.getSecretMetadata({ mount: "m", secretPath: "p" }), layer).pipe(Effect.flip),
    );
    expect(error._tag).toBe("Forbidden");
    expect((error as kv.Forbidden).message).toBe("permission denied");
  });

  test("a 404 with an empty errors list is NotFound", async () => {
    const { layer } = fakeVault(() => ({ status: 404, body: { errors: [] } }));
    const error = await Effect.runPromise(
      withAppRole(kv.getSecret({ mount: "m", secretPath: "p" }), layer).pipe(Effect.flip),
    );
    expect(error._tag).toBe("NotFound");
  });

  test("a check-and-set refusal has its own tag", async () => {
    const { layer } = fakeVault(() => ({
      status: 400,
      body: { errors: ["check-and-set parameter did not match the current version"] },
    }));
    const error = await Effect.runPromise(
      withAppRole(
        kv.putSecret({ mount: "m", secretPath: "p", data: { a: "b" }, options: { cas: 1 } }),
        layer,
      ).pipe(Effect.flip),
    );
    expect(error._tag).toBe("CheckAndSetMismatch");
  });
});

describe("Vault credentials", () => {
  test("concurrent and later calls share one login while the token is fresh", async () => {
    const { calls, layer } = fakeVault(() => ({ status: 204 }));
    const exit = await run(
      withAppRole(
        Effect.all(
          [1, 2, 3].map(() => kv.deleteSecretMetadata({ mount: "m", secretPath: "p" })),
          { concurrency: "unbounded" },
        ),
        layer,
      ),
    );
    expect(exit._tag).toBe("Success");
    expect(calls.filter((call) => call.url.includes("/auth/")).length).toBe(1);
  });

  test("callers arriving during a login wait for it instead of logging in", async () => {
    const { calls, layer } = fakeVault(() => ({ status: 204 }), undefined, 75);
    const exit = await run(
      withAppRole(
        Effect.all(
          [1, 2, 3, 4, 5].map(() => kv.deleteSecretMetadata({ mount: "m", secretPath: "p" })),
          { concurrency: "unbounded" },
        ),
        layer,
      ),
    );
    expect(exit._tag).toBe("Success");
    expect(calls.filter((call) => call.url.includes("/auth/")).length).toBe(1);
  });

  test("a token about to expire is not reused", async () => {
    const { calls, layer } = fakeVault(() => ({ status: 204 }), {
      status: 200,
      body: { auth: { client_token: "short", lease_duration: 30, renewable: true } },
    });
    const exit = await run(
      withAppRole(
        Effect.gen(function* () {
          yield* kv.deleteSecretMetadata({ mount: "m", secretPath: "p" });
          yield* kv.deleteSecretMetadata({ mount: "m", secretPath: "p" });
        }),
        layer,
      ),
    );
    expect(exit._tag).toBe("Success");
    expect(calls.filter((call) => call.url.includes("/auth/")).length).toBe(2);
  });

  test("a failed login is a ConfigError naming the cause", async () => {
    const { layer } = fakeVault(() => ({ status: 204 }), {
      status: 429,
      body: { errors: ["approle is temporarily locked due to too many failed login attempts"] },
    });
    const error = await Effect.runPromise(
      withAppRole(kv.deleteSecretMetadata({ mount: "m", secretPath: "p" }), layer).pipe(
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ConfigError);
    expect((error as ConfigError).message).toContain("AuthenticationLocked");
  });

  /** N concurrent calls, then one later call, all getting the login's refusal. */
  const refusedCalls = async (login: { readonly status: number; readonly body?: unknown }) => {
    const { calls, layer } = fakeVault(() => ({ status: 204 }), login, 25);
    const call = kv.deleteSecretMetadata({ mount: "m", secretPath: "p" }).pipe(Effect.flip);
    const errors = await Effect.runPromise(
      withAppRole(
        Effect.gen(function* () {
          const concurrent = yield* Effect.all([call, call, call, call], {
            concurrency: "unbounded",
          });
          return [...concurrent, yield* call];
        }),
        layer,
      ).pipe(Retry.none),
    );
    return { errors, logins: calls.filter((call) => call.url.includes("/auth/")).length };
  };

  test("a lockout stops every further login, concurrent or later", async () => {
    const { errors, logins } = await refusedCalls({
      status: 429,
      body: { errors: ["approle is temporarily locked due to too many failed login attempts"] },
    });
    expect(logins).toBe(1);
    expect(errors).toHaveLength(5);
    for (const error of errors) {
      expect(error).toBeInstanceOf(ConfigError);
      expect((error as ConfigError).message).toContain("AuthenticationLocked");
    }
  });

  test("a refused secret id stops every further login, concurrent or later", async () => {
    const { errors, logins } = await refusedCalls({
      status: 400,
      body: { errors: ["invalid role or secret ID"] },
    });
    expect(logins).toBe(1);
    for (const error of errors) expect(error).toBeInstanceOf(ConfigError);
  });

  test("a login that fails for another reason isn't held", async () => {
    const { logins } = await refusedCalls({ status: 418, body: { errors: ["no idea"] } });
    // One at a time, but each call tries again: this says nothing about the
    // credentials, so nothing is held.
    expect(logins).toBe(5);
  });

  test("a redacted secret id is unwrapped on the wire", async () => {
    const { calls, layer } = fakeVault(() => ({ status: 204 }));
    await run(withAppRole(kv.deleteSecretMetadata({ mount: "m", secretPath: "p" }), layer));
    expect(calls[0]!.body).toEqual({ role_id: "role", secret_id: "secret" });
  });

  test("an ACL refusal at login says so", async () => {
    const { layer } = fakeVault(() => ({ status: 204 }), {
      status: 403,
      body: { errors: ["permission denied"] },
    });
    const credentials = userpassVaultCredentials({
      apiUrl: API_URL,
      username: "u",
      password: Redacted.make("p"),
    }).pipe(Effect.provide(layer));
    const error = await Effect.runPromise(credentials.pipe(Effect.flip));
    expect(error.message).toContain("ACL");
    expect(error.message).not.toContain('p"');
  });

  test("the credentials service is what operations read", async () => {
    const { calls, layer } = fakeVault(() => ({ status: 204 }));
    const exit = await run(
      kv
        .deleteSecretMetadata({ mount: "m", secretPath: "p" })
        .pipe(
          Effect.provideService(
            VaultCredentials,
            Effect.succeed({ apiUrl: API_URL, token: Redacted.make("given") }),
          ),
          Effect.provide(layer),
        ),
    );
    expect(exit._tag).toBe("Success");
    expect(calls).toHaveLength(1);
    expect(calls[0]!.token).toBe("given");
  });
});
