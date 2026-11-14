/**
 * Credential providers, no network: every token endpoint is a fake
 * HttpClient, and the environment is a ConfigProvider. The token cache
 * itself is tested in core (`token-cache.test.ts`).
 */
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  ARM_SCOPE,
  armScopeFor,
  Credentials,
  fromClientSecret,
  fromEnv,
  fromManagedIdentity,
  fromStaticToken,
  fromWorkloadIdentity,
} from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import * as secrets from "../src/services/keyvault-secrets.ts";
import {
  GetResourceGroup,
  ListResourceGroups,
  type ListResourceGroupsRequest,
} from "../src/services/resources.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

type Reply = { readonly status: number; readonly json?: unknown } | "unreachable";

/** A fake HttpClient: `route` answers each request; every request is captured. */
const fakeHttp = (route: (call: Captured) => Reply) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.suspend(() => {
        const call: Captured = {
          method: request.method,
          url,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : undefined,
        };
        calls.push(call);
        const reply = route(call);
        if (reply === "unreachable") {
          return Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({ request, description: "ECONNREFUSED" }),
            }),
          );
        }
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(reply.json === undefined ? "" : JSON.stringify(reply.json), {
              status: reply.status,
            }),
          ),
        );
      }),
    ),
  );
  return { calls, layer };
};

const env = (vars: Record<string, string>) =>
  Layer.succeed(ConfigProvider.ConfigProvider, ConfigProvider.fromUnknown(vars));

const run = <A, E>(
  effect: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  credentials: Layer.Layer<Credentials>,
  http: Layer.Layer<HttpClient.HttpClient>,
  vars: Record<string, string> = {},
) =>
  Effect.runPromise(
    effect.pipe(
      Retry.none,
      Effect.provide(credentials),
      Effect.provide(http),
      Effect.provide(env(vars)),
    ),
  );

const runFlip = <A, E>(
  effect: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  credentials: Layer.Layer<Credentials>,
  http: Layer.Layer<HttpClient.HttpClient>,
  vars: Record<string, string> = {},
) => run(Effect.flip(effect), credentials, http, vars);

/** The current `Config`, as the protocol resolves it. */
const config = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

/** The token an operation would send for `scope`. */
const tokenFor = (scope: string) => Effect.flatMap(config, (c) => c.token(scope));

/** The token an ARM operation would send. */
const armToken = tokenFor(ARM_SCOPE);

const nowSeconds = () => Math.floor(Date.now() / 1000);

const SECRET = "s3cret-value";

const SP = {
  tenantId: "tenant-1",
  clientId: "client-1",
  clientSecret: Redacted.make(SECRET),
  subscriptionId: "00000000-0000-0000-0000-000000000001",
};

const LOGIN = "https://login.microsoftonline.com/tenant-1/oauth2/v2.0/token";
const VAULT_SCOPE = "https://vault.azure.net/.default";

/** Entra ID issues `entra:<scope>` for any scope; ARM and data planes answer `{}`. */
const entraRoute = (call: Captured): Reply => {
  if (call.url.host === "login.microsoftonline.com") {
    const scope = new URLSearchParams(call.body).get("scope");
    return {
      status: 200,
      json: { token_type: "Bearer", expires_in: 3599, access_token: `entra:${scope}` },
    };
  }
  return { status: 200, json: { value: [] } };
};

describe("fromClientSecret", () => {
  test("posts the client-credentials grant and caches one token per scope", async () => {
    const { calls, layer } = fakeHttp(entraRoute);
    const result = await run(
      Effect.gen(function* () {
        const first = yield* config;
        const second = yield* config;
        // Reading the credentials mints nothing.
        const mintedOnRead = calls.length;
        const arm = yield* first.token(ARM_SCOPE);
        const armAgain = yield* second.token(ARM_SCOPE);
        const vault = yield* first.token(VAULT_SCOPE);
        const vaultAgain = yield* second.token(VAULT_SCOPE);
        return { first, mintedOnRead, arm, armAgain, vault, vaultAgain };
      }),
      fromClientSecret(SP),
      layer,
    );
    expect(result.mintedOnRead).toBe(0);
    expect(Redacted.value(result.arm)).toBe(`entra:${ARM_SCOPE}`);
    expect(Redacted.value(result.armAgain)).toBe(`entra:${ARM_SCOPE}`);
    expect(Redacted.value(result.vault)).toBe(`entra:${VAULT_SCOPE}`);
    expect(Redacted.value(result.vaultAgain)).toBe(`entra:${VAULT_SCOPE}`);
    expect(result.first.subscriptionId).toBe(SP.subscriptionId);
    expect(result.first.tenantId).toBe("tenant-1");
    expect(calls).toHaveLength(2);
    const [arm, vault] = calls;
    expect(arm!.method).toBe("POST");
    expect(arm!.url.toString()).toBe(LOGIN);
    expect(arm!.headers["content-type"]).toBe("application/x-www-form-urlencoded");
    expect(Object.fromEntries(new URLSearchParams(arm!.body))).toEqual({
      grant_type: "client_credentials",
      client_id: "client-1",
      client_secret: SECRET,
      scope: ARM_SCOPE,
    });
    expect(new URLSearchParams(vault!.body).get("scope")).toBe(VAULT_SCOPE);
  });

  test("an ARM operation sends the ARM token and a data-plane operation its audience's token", async () => {
    const { calls, layer } = fakeHttp(entraRoute);
    await run(
      Effect.gen(function* () {
        yield* ListResourceGroups({ subscriptionId: SP.subscriptionId });
        yield* secrets.GetSecret({
          vaultBaseUrl: "https://my-vault.vault.azure.net",
          secretName: "s",
        });
      }),
      fromClientSecret(SP),
      layer,
    );
    const arm = calls.find((c) => c.url.host === "management.azure.com");
    const vault = calls.find((c) => c.url.host === "my-vault.vault.azure.net");
    expect(arm!.headers.authorization).toBe(`Bearer entra:${ARM_SCOPE}`);
    expect(arm!.url.pathname).toBe(`/subscriptions/${SP.subscriptionId}/resourcegroups`);
    expect(vault!.headers.authorization).toBe(`Bearer entra:${VAULT_SCOPE}`);
  });

  test("a Key Vault-only program mints only the vault token", async () => {
    const { calls, layer } = fakeHttp(entraRoute);
    await run(
      secrets.GetSecret({ vaultBaseUrl: "https://my-vault.vault.azure.net", secretName: "s" }),
      fromClientSecret(SP),
      layer,
    );
    const scopes = calls
      .filter((c) => c.url.host === "login.microsoftonline.com")
      .map((c) => new URLSearchParams(c.body).get("scope"));
    expect(scopes).toEqual([VAULT_SCOPE]);
    expect(calls.map((c) => c.url.host)).toEqual([
      "login.microsoftonline.com",
      "my-vault.vault.azure.net",
    ]);
  });

  test("one layer value keeps its tokens across separate runs", async () => {
    const { calls, layer } = fakeHttp(entraRoute);
    const credentials = fromClientSecret(SP);
    const list = ListResourceGroups({ subscriptionId: SP.subscriptionId });
    await run(list, credentials, layer);
    await run(list, credentials, layer);
    expect(calls.filter((c) => c.url.host === "login.microsoftonline.com")).toHaveLength(1);
    const arm = calls.filter((c) => c.url.host === "management.azure.com");
    expect(arm.map((c) => c.headers.authorization)).toEqual([
      `Bearer entra:${ARM_SCOPE}`,
      `Bearer entra:${ARM_SCOPE}`,
    ]);
  });

  test("authorityHost and a sovereign apiBaseUrl change the endpoint and the ARM scope", async () => {
    const { calls, layer } = fakeHttp((call) => ({
      status: 200,
      json: { expires_in: 3599, access_token: `t:${new URLSearchParams(call.body).get("scope")}` },
    }));
    const result = await run(
      Effect.gen(function* () {
        const c = yield* config;
        // The scope an ARM operation asks for.
        const token = yield* c.token(armScopeFor(c.apiBaseUrl));
        return { apiBaseUrl: c.apiBaseUrl, token };
      }),
      fromClientSecret({
        ...SP,
        authorityHost: "https://login.chinacloudapi.cn/",
        apiBaseUrl: "https://management.chinacloudapi.cn",
      }),
      layer,
    );
    expect(calls[0]!.url.toString()).toBe(
      "https://login.chinacloudapi.cn/tenant-1/oauth2/v2.0/token",
    );
    expect(Redacted.value(result.token)).toBe("t:https://management.chinacloudapi.cn/.default");
    expect(result.apiBaseUrl).toBe("https://management.chinacloudapi.cn");
  });

  test("a rejected secret fails with InvalidClientSecret and never echoes the secret", async () => {
    const { calls, layer } = fakeHttp(() => ({
      status: 401,
      json: {
        error: "invalid_client",
        error_description: "AADSTS7000215: Invalid client secret provided.",
        error_codes: [7000215],
      },
    }));
    const error = await runFlip(armToken, fromClientSecret(SP), layer);
    expect(error._tag).toBe("InvalidClientSecret");
    if (error._tag !== "InvalidClientSecret") throw error;
    expect(error.code).toBe("invalid_client");
    expect(error.status).toBe(401);
    expect(error.scope).toBe(ARM_SCOPE);
    expect(error.message).toContain("AADSTS7000215");
    expect(error.message).not.toContain(SECRET);
    // A credential error is not retried.
    expect(calls).toHaveLength(1);
  });

  test("another Entra ID error fails with TokenRequestFailed", async () => {
    const { layer } = fakeHttp(() => ({
      status: 400,
      json: {
        error: "invalid_scope",
        error_description: "AADSTS70011: The provided scope is invalid.",
      },
    }));
    const error = await runFlip(armToken, fromClientSecret(SP), layer);
    expect(error._tag).toBe("TokenRequestFailed");
    if (error._tag !== "TokenRequestFailed") throw error;
    expect(error.code).toBe("invalid_scope");
  });

  test("throttling and server errors are retried, a bounded number of times", async () => {
    let n = 0;
    const recovering = fakeHttp(() =>
      ++n === 1
        ? { status: 503 }
        : { status: 200, json: { expires_in: 3599, access_token: "after-retry" } },
    );
    const ok = await run(armToken, fromClientSecret(SP), recovering.layer);
    expect(Redacted.value(ok)).toBe("after-retry");
    expect(recovering.calls).toHaveLength(2);

    const down = fakeHttp(() => ({ status: 500, json: { error: "temporarily_unavailable" } }));
    const error = await runFlip(armToken, fromClientSecret(SP), down.layer);
    expect(error._tag).toBe("TokenRequestFailed");
    if (error._tag !== "TokenRequestFailed") throw error;
    expect(error.status).toBe(500);
    // One attempt plus three retries.
    expect(down.calls).toHaveLength(4);
  });

  test("an unreachable endpoint fails with TokenRequestFailed", async () => {
    const { calls, layer } = fakeHttp(() => "unreachable");
    const error = await runFlip(armToken, fromClientSecret(SP), layer);
    expect(error._tag).toBe("TokenRequestFailed");
    expect(error.message).toContain("request failed");
    expect(calls).toHaveLength(4);
  });
});

describe("fromManagedIdentity", () => {
  const APP_SERVICE = {
    IDENTITY_ENDPOINT: "http://localhost:42356/msi/token",
    IDENTITY_HEADER: "header-secret",
  };

  test("App Service / Functions / Container Apps: IDENTITY_ENDPOINT with X-IDENTITY-HEADER", async () => {
    const expiresOn = nowSeconds() + 86_400;
    const { calls, layer } = fakeHttp((call) => ({
      status: 200,
      json: {
        access_token: `mi:${call.url.searchParams.get("resource")}`,
        expires_on: String(expiresOn),
        resource: call.url.searchParams.get("resource"),
        token_type: "Bearer",
      },
    }));
    const result = await run(
      Effect.gen(function* () {
        const c = yield* config;
        const arm = yield* c.token(ARM_SCOPE);
        const vault = yield* c.token(VAULT_SCOPE);
        return { c, arm, vault };
      }),
      fromManagedIdentity({ clientId: "user-assigned-1", subscriptionId: SP.subscriptionId }),
      layer,
      APP_SERVICE,
    );
    expect(Redacted.value(result.arm)).toBe("mi:https://management.azure.com");
    expect(Redacted.value(result.vault)).toBe("mi:https://vault.azure.net");
    expect(result.c.subscriptionId).toBe(SP.subscriptionId);
    expect(calls).toHaveLength(2);
    const arm = calls[0]!;
    expect(arm.method).toBe("GET");
    expect(`${arm.url.origin}${arm.url.pathname}`).toBe("http://localhost:42356/msi/token");
    expect(Object.fromEntries(arm.url.searchParams)).toEqual({
      resource: "https://management.azure.com",
      "api-version": "2019-08-01",
      client_id: "user-assigned-1",
    });
    expect(arm.headers["x-identity-header"]).toBe("header-secret");
    expect(arm.headers.metadata).toBeUndefined();
  });

  test("VMs / AKS: IMDS with Metadata: true, system-assigned when no clientId", async () => {
    const { calls, layer } = fakeHttp(() => ({
      status: 200,
      json: {
        access_token: "imds-token",
        expires_in: "3599",
        expires_on: String(nowSeconds() + 3599),
      },
    }));
    const result = await run(
      Effect.gen(function* () {
        const c = yield* config;
        return { subscriptionId: c.subscriptionId, token: yield* c.token(ARM_SCOPE) };
      }),
      fromManagedIdentity(),
      layer,
      { AZURE_SUBSCRIPTION_ID: SP.subscriptionId },
    );
    expect(Redacted.value(result.token)).toBe("imds-token");
    expect(result.subscriptionId).toBe(SP.subscriptionId);
    const imds = calls[0]!;
    expect(`${imds.url.origin}${imds.url.pathname}`).toBe(
      "http://169.254.169.254/metadata/identity/oauth2/token",
    );
    expect(Object.fromEntries(imds.url.searchParams)).toEqual({
      "api-version": "2018-02-01",
      resource: "https://management.azure.com",
    });
    expect(imds.headers.metadata).toBe("true");
  });

  test("IMDS 400 (no identity assigned) fails with ManagedIdentityUnavailable", async () => {
    const { layer } = fakeHttp(() => ({
      status: 400,
      json: { error: "invalid_request", error_description: "Identity not found" },
    }));
    const error = await runFlip(armToken, fromManagedIdentity({ clientId: "missing" }), layer);
    expect(error._tag).toBe("ManagedIdentityUnavailable");
    expect(error.message).toContain("Identity not found");
    expect(error.message).toContain("missing");
  });

  test("an unreachable IMDS fails with ManagedIdentityUnavailable", async () => {
    const { layer } = fakeHttp(() => "unreachable");
    const error = await runFlip(armToken, fromManagedIdentity(), layer);
    expect(error._tag).toBe("ManagedIdentityUnavailable");
    expect(error.message).toContain("IMDS");
  });

  test("IMDS 404 while it starts is retried", async () => {
    let n = 0;
    const { calls, layer } = fakeHttp(() =>
      ++n === 1
        ? { status: 404 }
        : { status: 200, json: { access_token: "late", expires_in: "3599" } },
    );
    const result = await run(armToken, fromManagedIdentity(), layer);
    expect(Redacted.value(result)).toBe("late");
    expect(calls).toHaveLength(2);
  });

  test("without a subscription, an ARM operation that needs one fails with ConfigError", async () => {
    const { calls, layer } = fakeHttp(() => ({
      status: 200,
      json: { access_token: "imds-token", expires_in: "3599" },
    }));
    // No subscriptionId member: the protocol takes it from the credentials, which have none.
    const input = {} as ListResourceGroupsRequest;
    const error = await runFlip(ListResourceGroups(input), fromManagedIdentity(), layer);
    expect(error._tag).toBe("ConfigError");
    expect(calls.every((c) => c.url.host === "169.254.169.254")).toBe(true);
  });
});

describe("fromWorkloadIdentity", () => {
  /** Write a projected service-account token where the AKS webhook would mount it. */
  const tokenFile = (token: string) =>
    Effect.runPromise(
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const dir = yield* fs.makeTempDirectory({ prefix: "azure-wi-" });
        const file = `${dir}/azure-identity-token`;
        yield* fs.writeFileString(file, `${token}\n`);
        return file;
      }).pipe(Effect.provide(NodeFileSystem.layer)),
    );

  const workloadRoute = (call: Captured): Reply => {
    const params = new URLSearchParams(call.body);
    return {
      status: 200,
      json: { expires_in: 3599, access_token: `wi:${params.get("scope")}` },
    };
  };

  test("exchanges the projected token as a client assertion", async () => {
    const file = await tokenFile("projected.jwt");
    const { calls, layer } = fakeHttp(workloadRoute);
    const result = await run(
      Effect.gen(function* () {
        const c = yield* config;
        return { subscriptionId: c.subscriptionId, token: yield* c.token(ARM_SCOPE) };
      }),
      fromWorkloadIdentity(),
      layer,
      {
        AZURE_FEDERATED_TOKEN_FILE: file,
        AZURE_CLIENT_ID: "wi-client",
        AZURE_TENANT_ID: "tenant-1",
        AZURE_AUTHORITY_HOST: "https://login.microsoftonline.com/",
        AZURE_SUBSCRIPTION_ID: SP.subscriptionId,
      },
    );
    expect(Redacted.value(result.token)).toBe(`wi:${ARM_SCOPE}`);
    expect(result.subscriptionId).toBe(SP.subscriptionId);
    expect(calls).toHaveLength(1);
    expect(calls[0]!.url.toString()).toBe(LOGIN);
    expect(Object.fromEntries(new URLSearchParams(calls[0]!.body))).toEqual({
      grant_type: "client_credentials",
      client_id: "wi-client",
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: "projected.jwt",
      scope: ARM_SCOPE,
    });
  });

  test("fromManagedIdentity uses the exchange in a pod the webhook configured", async () => {
    const file = await tokenFile("projected.jwt");
    const { calls, layer } = fakeHttp(workloadRoute);
    const result = await run(armToken, fromManagedIdentity(), layer, {
      AZURE_FEDERATED_TOKEN_FILE: file,
      AZURE_CLIENT_ID: "wi-client",
      AZURE_TENANT_ID: "tenant-1",
    });
    expect(Redacted.value(result)).toBe(`wi:${ARM_SCOPE}`);
    expect(calls.map((c) => c.url.host)).toEqual(["login.microsoftonline.com"]);
  });

  test("fromEnv picks the workload identity before IMDS", async () => {
    const file = await tokenFile("projected.jwt");
    const { calls, layer } = fakeHttp(workloadRoute);
    const result = await run(armToken, fromEnv(), layer, {
      AZURE_FEDERATED_TOKEN_FILE: file,
      AZURE_CLIENT_ID: "wi-client",
      AZURE_TENANT_ID: "tenant-1",
    });
    expect(Redacted.value(result)).toBe(`wi:${ARM_SCOPE}`);
    expect(calls.map((c) => c.url.host)).toEqual(["login.microsoftonline.com"]);
  });

  test("a missing token file fails with ManagedIdentityUnavailable", async () => {
    const { calls, layer } = fakeHttp(workloadRoute);
    const error = await runFlip(
      armToken,
      fromWorkloadIdentity({
        tokenFile: "/nonexistent/azure-identity-token",
        clientId: "wi-client",
        tenantId: "tenant-1",
      }),
      layer,
    );
    expect(error._tag).toBe("ManagedIdentityUnavailable");
    expect(error.message).toContain("/nonexistent/azure-identity-token");
    expect(calls).toHaveLength(0);
  });

  test("an unmatched federated credential fails with TokenRequestFailed", async () => {
    const file = await tokenFile("projected.jwt");
    const { layer } = fakeHttp(() => ({
      status: 400,
      json: {
        error: "invalid_client",
        error_description: "AADSTS70021: No matching federated identity record found",
      },
    }));
    const error = await runFlip(armToken, fromWorkloadIdentity({ tokenFile: file }), layer, {
      AZURE_CLIENT_ID: "wi-client",
      AZURE_TENANT_ID: "tenant-1",
    });
    expect(error._tag).toBe("TokenRequestFailed");
    expect(error.message).toContain("AADSTS70021");
  });
});

describe("fromStaticToken", () => {
  test("sends the one token to ARM and to data planes", async () => {
    const { calls, layer } = fakeHttp(() => ({ status: 200, json: {} }));
    await run(
      Effect.gen(function* () {
        yield* GetResourceGroup({ subscriptionId: SP.subscriptionId, resourceGroupName: "rg" });
        yield* secrets.GetSecret({ vaultBaseUrl: "https://v.vault.azure.net", secretName: "s" });
      }),
      fromStaticToken({ bearerToken: Redacted.make("static"), subscriptionId: SP.subscriptionId }),
      layer,
    );
    expect(calls.map((c) => c.headers.authorization)).toEqual(["Bearer static", "Bearer static"]);
  });
});

describe("fromEnv", () => {
  test("client secret first", async () => {
    const { calls, layer } = fakeHttp(entraRoute);
    const result = await run(armToken, fromEnv(), layer, {
      AZURE_TENANT_ID: SP.tenantId,
      AZURE_CLIENT_ID: SP.clientId,
      AZURE_CLIENT_SECRET: SECRET,
      AZURE_SUBSCRIPTION_ID: SP.subscriptionId,
      IDENTITY_ENDPOINT: "http://localhost:1/never",
      IDENTITY_HEADER: "h",
      AZURE_BEARER_TOKEN: "static",
    });
    expect(Redacted.value(result)).toBe(`entra:${ARM_SCOPE}`);
    expect(calls.map((c) => c.url.toString())).toEqual([LOGIN]);
  });

  test("then the App Service identity endpoint, with AZURE_CLIENT_ID as the user-assigned identity", async () => {
    const { calls, layer } = fakeHttp(() => ({
      status: 200,
      json: { access_token: "mi", expires_on: String(nowSeconds() + 3600) },
    }));
    const result = await run(armToken, fromEnv(), layer, {
      IDENTITY_ENDPOINT: "http://localhost:42356/msi/token",
      IDENTITY_HEADER: "h",
      AZURE_CLIENT_ID: "user-assigned-1",
      AZURE_BEARER_TOKEN: "static",
      AZURE_SUBSCRIPTION_ID: SP.subscriptionId,
    });
    expect(Redacted.value(result)).toBe("mi");
    expect(calls).toHaveLength(1);
    expect(calls[0]!.url.host).toBe("localhost:42356");
    expect(calls[0]!.url.searchParams.get("client_id")).toBe("user-assigned-1");
  });

  test("then IMDS when it answers the probe", async () => {
    const { calls, layer } = fakeHttp((call) =>
      call.headers.metadata === "true"
        ? { status: 200, json: { access_token: "imds", expires_in: "3599" } }
        : {
            status: 400,
            json: {
              error: "bad_request",
              error_description: "Required metadata header not specified",
            },
          },
    );
    const result = await run(armToken, fromEnv(), layer, { AZURE_BEARER_TOKEN: "static" });
    expect(Redacted.value(result)).toBe("imds");
    expect(calls).toHaveLength(2);
    expect(calls[0]!.headers.metadata).toBeUndefined();
    expect(calls[1]!.headers.metadata).toBe("true");
  });

  test("then a static token, and the choice is made once", async () => {
    const { calls, layer } = fakeHttp(() => "unreachable");
    const result = await run(
      Effect.gen(function* () {
        const first = yield* config;
        const second = yield* config;
        return [
          yield* first.token(ARM_SCOPE),
          yield* first.token(VAULT_SCOPE),
          yield* second.token(ARM_SCOPE),
        ].map(Redacted.value);
      }),
      fromEnv(),
      layer,
      { AZURE_BEARER_TOKEN: "static", AZURE_SUBSCRIPTION_ID: SP.subscriptionId },
    );
    // A static token answers every scope.
    expect(result).toEqual(["static", "static", "static"]);
    // Only the first use probes IMDS.
    expect(calls).toHaveLength(1);
  });

  test("nothing configured fails with ConfigError", async () => {
    const { layer } = fakeHttp(() => "unreachable");
    const error = await runFlip(config, fromEnv(), layer);
    expect(error._tag).toBe("ConfigError");
    expect(error.message).toContain("AZURE_CLIENT_SECRET");
  });
});

// Opt-in live check against the testing tenant; never part of a normal run.
// AZURE_TEST_CREDENTIALS_LIVE=1 reads the service principal from the
// alchemy-testing profile (`values.{tenantId,clientId,clientSecret,subscriptionId}`).
describe.skipIf(!process.env.AZURE_TEST_CREDENTIALS_LIVE)("live", () => {
  test("fromClientSecret lists resource groups and mints a Key Vault token", async () => {
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
          const groups = yield* ListResourceGroups({ subscriptionId: values.subscriptionId! });
          const vault = yield* tokenFor(VAULT_SCOPE);
          return { groups, vault: Redacted.value(vault) };
        }).pipe(Effect.provide(live));
      }).pipe(
        Effect.provide(FetchHttpClient.layer),
        Effect.provide(NodeFileSystem.layer),
        Effect.provide(env({})),
      ),
    );
    expect(Array.isArray(result.groups.value)).toBe(true);
    expect(result.groups.value!.length).toBeGreaterThan(0);
    // A v2.0 token names its audience by application ID: Azure Key Vault's.
    const payload = result.vault.split(".")[1]!;
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString()) as { aud: string };
    expect(claims.aud).toBe("cfa8b339-82a2-471a-a3c9-0fc0be7a4093");
  }, 60_000);
});
