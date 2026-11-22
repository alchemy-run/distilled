import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
/**
 * Data-plane request encoding, no network: one request per fat-head module,
 * captured by a fake HttpClient. Each case pins the URL (host template +
 * path + constant query + api-version), the method, the auth header (token
 * for the module's audience), the headers the operation adds, and the body.
 */
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { ARM_SCOPE, Credentials, type Config } from "../src/credentials.ts";
import { AzureDataPlaneProtocol } from "../src/data-plane-protocol.ts";
import { AzureProtocol } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import * as appconfig from "../src/services/appconfiguration-data.ts";
import * as attestation from "../src/services/attestation-data.ts";
import * as batch from "../src/services/batch-data.ts";
import * as eventgridNamespace from "../src/services/eventgrid-namespace.ts";
import * as certificates from "../src/services/keyvault-certificates.ts";
import * as keys from "../src/services/keyvault-keys.ts";
import * as secrets from "../src/services/keyvault-secrets.ts";
import * as loadtesting from "../src/services/loadtesting-data.ts";
import * as mapsSearch from "../src/services/maps-search.ts";
import * as ingestion from "../src/services/monitor-ingestion.ts";
import { GetResourceGroup } from "../src/services/resources.ts";
import * as schemaregistry from "../src/services/schemaregistry-data.ts";
import * as search from "../src/services/search-data.ts";
import * as webpubsub from "../src/services/webpubsub-data.ts";
import * as T from "../src/traits.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const capture = () => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url: url.href,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(request, new Response("{}", { status: 200 }));
      }),
    ),
  );
  return { calls, layer };
};

const subscriptionId = "00000000-0000-0000-0000-000000000001";

/**
 * Credentials whose `token` returns `arm-token` for the ARM scope and
 * `aad:<scope>` for any other, so the header names the audience. A static
 * token answers every scope with `arm-token`.
 */
const credentials = (staticToken = false) =>
  Layer.succeed(
    Credentials,
    Effect.succeed<Config>({
      token: (scope) =>
        Effect.succeed(
          Redacted.make(staticToken || scope === ARM_SCOPE ? "arm-token" : `aad:${scope}`),
        ),
      subscriptionId,
      apiBaseUrl: "https://management.azure.com",
    }),
  );

/** Run one operation and return the single request it sent (the response is not under test). */
const send = async <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  staticToken = false,
): Promise<Captured> => {
  const { calls, layer } = capture();
  await Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(credentials(staticToken)),
      Effect.provide(layer),
      Effect.exit,
    ),
  );
  expect(calls).toHaveLength(1);
  return calls[0]!;
};

const VAULT = "https://my-vault.vault.azure.net/";

interface Case {
  readonly module: string;
  readonly run: () => Effect.Effect<unknown, unknown, Credentials | HttpClient.HttpClient>;
  readonly method: string;
  readonly url: string;
  /** Expected `Authorization` header. */
  readonly auth: string;
  /** Headers the request must carry (lower-case names), beyond Authorization. */
  readonly headers?: Record<string, string>;
  /** Expected body, parsed as JSON; `undefined` for a bodyless request. */
  readonly body?: unknown;
}

const vault = "Bearer aad:https://vault.azure.net/.default";

const cases: readonly Case[] = [
  {
    module: "keyvault-secrets",
    run: () =>
      secrets.SetSecret({
        vaultBaseUrl: VAULT,
        secretName: "db-password",
        value: "hunter2",
        contentType: "text/plain",
      }),
    method: "PUT",
    url: "https://my-vault.vault.azure.net/secrets/db-password?api-version=2026-04-01",
    auth: vault,
    headers: { "content-type": "application/json" },
    body: { value: "hunter2", contentType: "text/plain" },
  },
  {
    module: "keyvault-keys",
    run: () => keys.GetKey({ vaultBaseUrl: VAULT, keyName: "signing", keyVersion: "abc123" }),
    method: "GET",
    url: "https://my-vault.vault.azure.net/keys/signing/abc123?api-version=2026-04-01",
    auth: vault,
  },
  {
    module: "keyvault-certificates",
    run: () => certificates.GetCertificatePolicy({ vaultBaseUrl: VAULT, certificateName: "tls" }),
    method: "GET",
    url: "https://my-vault.vault.azure.net/certificates/tls/policy?api-version=2026-04-01",
    auth: vault,
  },
  {
    module: "appconfiguration-data",
    run: () =>
      appconfig.GetSnapshot({
        endpoint: "https://my-store.azconfig.io",
        name: "release-1",
        syncToken: "sn=1",
      }),
    method: "GET",
    url: "https://my-store.azconfig.io/snapshots/release-1?api-version=2026-04-01",
    auth: "Bearer aad:https://azconfig.io/.default",
    headers: { "sync-token": "sn=1" },
  },
  {
    module: "eventgrid-namespace",
    run: () =>
      eventgridNamespace.AcknowledgeCloudEvents({
        endpoint: "https://ns.westus-1.eventgrid.azure.net",
        topicName: "orders",
        eventSubscriptionName: "billing",
        lockTokens: ["lock-1"],
      }),
    method: "POST",
    url: "https://ns.westus-1.eventgrid.azure.net/topics/orders/eventsubscriptions/billing:acknowledge?api-version=2024-06-01",
    auth: "Bearer aad:https://eventgrid.azure.net/.default",
    body: { lockTokens: ["lock-1"] },
  },
  {
    module: "search-data",
    run: () =>
      search.GetIndex({ endpoint: "https://my-search.search.windows.net", indexName: "hotels" }),
    method: "GET",
    url: "https://my-search.search.windows.net/indexes('hotels')?api-version=2026-10-01",
    auth: "Bearer aad:https://search.azure.com/.default",
  },
  {
    module: "monitor-ingestion",
    run: () =>
      ingestion.Upload({
        endpoint: "https://my-dce.westus-1.ingest.monitor.azure.com",
        ruleId: "dcr-123",
        stream: "Custom-Logs",
        body: [{ message: "hello" }],
      }),
    method: "POST",
    url: "https://my-dce.westus-1.ingest.monitor.azure.com/dataCollectionRules/dcr-123/streams/Custom-Logs?api-version=2023-01-01",
    auth: "Bearer aad:https://monitor.azure.com/.default",
    body: [{ message: "hello" }],
  },
  {
    module: "schemaregistry-data",
    run: () =>
      schemaregistry.ListSchemaGroups({ fullyQualifiedNamespace: "my-ns.servicebus.windows.net" }),
    method: "GET",
    url: "https://my-ns.servicebus.windows.net/$schemaGroups?api-version=2023-07-01",
    auth: "Bearer aad:https://eventhubs.azure.net/.default",
  },
  {
    module: "webpubsub-data",
    run: () =>
      webpubsub.AddUserToGroup({
        endpoint: "https://my-wps.webpubsub.azure.com",
        hub: "chat",
        userId: "alice",
        group: "room-1",
      }),
    method: "PUT",
    url: "https://my-wps.webpubsub.azure.com/api/hubs/chat/users/alice/groups/room-1?api-version=2024-12-01",
    auth: "Bearer aad:https://webpubsub.azure.com/.default",
    body: {},
  },
  {
    module: "attestation-data",
    run: () =>
      attestation.GetPolicy({
        endpoint: "https://my-att.eus.attest.azure.net",
        attestationType: "SgxEnclave",
      }),
    method: "GET",
    url: "https://my-att.eus.attest.azure.net/policies/SgxEnclave?api-version=2025-06-01",
    auth: "Bearer aad:https://attest.azure.net/.default",
  },
  {
    module: "batch-data",
    run: () =>
      batch.ListPoolSupportedImages({
        endpoint: "https://my-batch.westus.batch.azure.com",
        maxresults: 10,
        clientRequestId: "req-2",
      }),
    method: "GET",
    url: "https://my-batch.westus.batch.azure.com/supportedimages?maxresults=10&api-version=2026-10-01",
    auth: "Bearer aad:https://batch.core.windows.net/.default",
    headers: { "client-request-id": "req-2" },
  },
  {
    module: "loadtesting-data",
    run: () =>
      loadtesting.TriggerAdministrationGetTrigger({
        endpoint: "my-lt.eastus.cnt-prod.loadtesting.azure.com",
        triggerId: "nightly",
      }),
    method: "GET",
    url: "https://my-lt.eastus.cnt-prod.loadtesting.azure.com/triggers/nightly?api-version=2026-04-01",
    auth: "Bearer aad:https://cnt-prod.loadtesting.azure.com/.default",
  },
];

describe("data-plane request encoding", () => {
  for (const c of cases) {
    test(c.module, async () => {
      const req = await send(c.run());
      expect(req.method).toBe(c.method);
      expect(req.url).toBe(c.url);
      expect(req.headers.authorization).toBe(c.auth);
      for (const [name, value] of Object.entries(c.headers ?? {})) {
        expect(req.headers[name]).toBe(value);
      }
      // Host members never leak into the query or the body.
      expect(req.url).not.toContain("vaultBaseUrl");
      expect(req.body === undefined || req.body === "" ? undefined : JSON.parse(req.body)).toEqual(
        c.body,
      );
    });
  }
});

describe("data-plane protocol details", () => {
  test("a host member with a spec default may be omitted", async () => {
    const req = await send(mapsSearch.SearchGetGeocoding({ query: "Seattle" }));
    expect(req.url).toBe(
      "https://atlas.microsoft.com/geocode?query=Seattle&api-version=2026-01-01",
    );
    expect(req.headers.authorization).toBe("Bearer aad:https://atlas.microsoft.com/.default");
  });

  test("a static token is sent to data planes too", async () => {
    const req = await send(
      secrets.GetSecret({ vaultBaseUrl: VAULT, secretName: "s", secretVersion: "" }),
      true,
    );
    expect(req.headers.authorization).toBe("Bearer arm-token");
    expect(req.url).toBe("https://my-vault.vault.azure.net/secrets/s/?api-version=2026-04-01");
  });

  test("ARM operations ask for the ARM scope and keep apiBaseUrl", async () => {
    const req = await send(GetResourceGroup({ subscriptionId, resourceGroupName: "rg" }));
    expect(req.headers.authorization).toBe("Bearer arm-token");
    expect(req.url).toBe(
      `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/rg?api-version=2025-04-01`,
    );
  });

  test("a data-plane operation without an audience fails instead of sending the ARM token", async () => {
    // No generated module lacks an audience, so pin the rule on a synthetic one.
    const NoAudience = API.make(() => ({
      input: S.Struct({ endpoint: S.String.pipe(T.HostLabel()) }).pipe(
        T.Http({ method: "GET", uri: "/things", host: "{endpoint}", hostRaw: ["endpoint"] }),
      ),
      output: S.Struct({}),
      errors: [],
      protocol: AzureDataPlaneProtocol,
      retry: Retry.Retry,
    }));
    const { calls, layer } = capture();
    const error = await Effect.runPromise(
      NoAudience({ endpoint: "https://attacker.example" }).pipe(
        Retry.none,
        Effect.provide(credentials()),
        Effect.provide(layer),
        Effect.flip,
      ),
    );
    expect(calls).toHaveLength(0);
    expect((error as { _tag: string })._tag).toBe("MissingTokenAudience");
  });

  test("the ARM protocol refuses an operation that names a host", async () => {
    const Misrouted = API.make(() => ({
      input: S.Struct({ endpoint: S.String.pipe(T.HostLabel()) }).pipe(
        T.Http({ method: "GET", uri: "/things", host: "{endpoint}", hostRaw: ["endpoint"] }),
      ),
      output: S.Struct({}),
      errors: [],
      protocol: AzureProtocol,
      retry: Retry.Retry,
    }));
    const { calls, layer } = capture();
    const error = await Effect.runPromise(
      Misrouted({ endpoint: "https://attacker.example" }).pipe(
        Retry.none,
        Effect.provide(credentials()),
        Effect.provide(layer),
        Effect.flip,
      ),
    );
    expect(calls).toHaveLength(0);
    expect((error as { _tag: string })._tag).toBe("SdkError");
  });

  test("a missing host member fails with InvalidInput before any request is sent", async () => {
    const { calls, layer } = capture();
    // vaultBaseUrl is required; a caller that bypasses the type still gets a typed failure.
    const input = { secretName: "s", secretVersion: "" } as unknown as secrets.GetSecretRequest;
    const exit = await Effect.runPromise(
      secrets
        .GetSecret(input)
        .pipe(Retry.none, Effect.provide(credentials()), Effect.provide(layer), Effect.exit),
    );
    expect(calls).toHaveLength(0);
    expect(Exit.isFailure(exit)).toBe(true);
    if (Exit.isFailure(exit)) {
      const error = exit.cause.reasons.find(Cause.isFailReason)?.error;
      expect(error).toMatchObject({ _tag: "InvalidInput", member: "vaultBaseUrl" });
    }
  });

  test("an empty host member fails with InvalidInput before any request is sent", async () => {
    const { calls, layer } = capture();
    const error = await Effect.runPromise(
      secrets
        .GetSecret({ vaultBaseUrl: "", secretName: "s", secretVersion: "" })
        .pipe(Retry.none, Effect.provide(credentials()), Effect.provide(layer), Effect.flip),
    );
    expect(calls).toHaveLength(0);
    expect(error).toMatchObject({ _tag: "InvalidInput", member: "vaultBaseUrl" });
  });
});
