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
import { AzureProtocol } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import * as appconfig from "../src/services/appconfiguration-data.ts";
import * as attestation from "../src/services/attestation-data.ts";
import * as batch from "../src/services/batch-data.ts";
import * as transparency from "../src/services/confidentialledger-code-transparency.ts";
import * as ledger from "../src/services/confidentialledger-data.ts";
import * as ledgerIdentity from "../src/services/confidentialledger-identity.ts";
import * as acr from "../src/services/containerregistry-data.ts";
import * as tables from "../src/services/cosmos-tables.ts";
import * as dps from "../src/services/deviceprovisioning-data.ts";
import * as twins from "../src/services/digitaltwins-data.ts";
import * as eventgrid from "../src/services/eventgrid-data.ts";
import * as eventgridNamespace from "../src/services/eventgrid-namespace.ts";
import * as kvAdmin from "../src/services/keyvault-administration.ts";
import * as certificates from "../src/services/keyvault-certificates.ts";
import * as keys from "../src/services/keyvault-keys.ts";
import * as secrets from "../src/services/keyvault-secrets.ts";
import * as loadtesting from "../src/services/loadtesting-data.ts";
import * as mapsSearch from "../src/services/maps-search.ts";
import * as ingestion from "../src/services/monitor-ingestion.ts";
import { GetResourceGroup } from "../src/services/resources.ts";
import * as schemaregistry from "../src/services/schemaregistry-data.ts";
import * as search from "../src/services/search-data.ts";
import * as servicebus from "../src/services/servicebus-data.ts";
import * as blob from "../src/services/storage-blob.ts";
import * as datalake from "../src/services/storage-datalake.ts";
import * as file from "../src/services/storage-file.ts";
import * as queue from "../src/services/storage-queue.ts";
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
const BLOB = "https://acct.blob.core.windows.net";
const QUEUE = "https://acct.queue.core.windows.net";
const FILE = "https://acct.file.core.windows.net";
const DFS = "https://acct.dfs.core.windows.net";

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
const storage = "Bearer aad:https://storage.azure.com/.default";

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
    module: "keyvault-administration",
    run: () =>
      kvAdmin.GetSetting({
        vaultBaseUrl: "https://my-hsm.managedhsm.azure.net",
        settingName: "AllowKeyManagementOperationsThroughARM",
      }),
    method: "GET",
    url: "https://my-hsm.managedhsm.azure.net/settings/AllowKeyManagementOperationsThroughARM?api-version=2026-04-01",
    // A Managed HSM host takes a token for its own audience, not the vault's.
    auth: "Bearer aad:https://managedhsm.azure.net/.default",
  },
  {
    module: "storage-blob",
    run: () =>
      blob.GetBlobTags({
        url: BLOB,
        containerName: "assets",
        blob: "logo.png",
        xMsClientRequestId: "req-1",
      }),
    method: "GET",
    url: `${BLOB}/assets/logo.png?comp=tags`,
    auth: storage,
    headers: { "x-ms-version": "2027-03-07", "x-ms-client-request-id": "req-1" },
  },
  {
    module: "storage-queue",
    run: () => queue.MessagesPeek({ url: QUEUE, queueName: "jobs", numofmessages: 5 }),
    method: "GET",
    url: `${QUEUE}/jobs/messages?numofmessages=5&peekonly=true`,
    auth: storage,
    headers: { "x-ms-version": "2026-04-06" },
  },
  {
    module: "storage-file",
    run: () => file.GetShareProperties({ url: FILE, shareName: "data" }),
    method: "GET",
    url: `${FILE}/data?restype=share`,
    auth: storage,
    headers: { "x-ms-version": "2027-03-07" },
  },
  {
    module: "storage-datalake",
    run: () =>
      datalake.SetPathExpiry({
        url: DFS,
        filesystem: "lake",
        path: "raw.csv",
        xMsExpiryOption: "NeverExpire",
      }),
    method: "PUT",
    url: `${DFS}/lake/raw.csv?comp=expiry`,
    auth: storage,
    headers: {
      "x-ms-version": "2026-06-06",
      "x-ms-expiry-option": "NeverExpire",
      "content-length": "0",
    },
    // A Storage write with no payload sends a zero-length body, not `{}`.
  },
  {
    module: "cosmos-tables",
    run: () => tables.DeleteTable({ url: "https://acct.table.cosmos.azure.com", table: "orders" }),
    method: "DELETE",
    url: "https://acct.table.cosmos.azure.com/Tables('orders')",
    auth: "Bearer aad:https://cosmos.azure.com/.default",
    headers: { "x-ms-version": "2019-02-02", accept: "application/json;odata=minimalmetadata" },
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
    module: "eventgrid-data",
    run: () =>
      eventgrid.PublishEventGridEvents({
        topicHostname: "my-topic.westus-1.eventgrid.azure.net",
        body: [
          {
            id: "1",
            subject: "orders/1",
            data: { total: 3 },
            eventType: "Order.Created",
            eventTime: "2026-10-23T00:00:00Z",
            dataVersion: "1.0",
          },
        ],
      }),
    method: "POST",
    url: "https://my-topic.westus-1.eventgrid.azure.net/api/events?api-version=2018-01-01",
    auth: "Bearer aad:https://eventgrid.azure.net/.default",
    body: [
      {
        id: "1",
        subject: "orders/1",
        data: { total: 3 },
        eventType: "Order.Created",
        eventTime: "2026-10-23T00:00:00Z",
        dataVersion: "1.0",
      },
    ],
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
    module: "servicebus-data",
    run: () => servicebus.GetNamespace({ endpoint: "my-ns.servicebus.windows.net" }),
    method: "GET",
    url: "https://my-ns.servicebus.windows.net/$namespaceinfo?api-version=2021-05",
    auth: "Bearer aad:https://servicebus.azure.net/.default",
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
    module: "confidentialledger-data",
    run: () =>
      ledger.GetUser({
        ledgerEndpoint: "https://my-ledger.confidential-ledger.azure.com",
        userId: "alice",
      }),
    method: "GET",
    url: "https://my-ledger.confidential-ledger.azure.com/app/users/alice?api-version=2026-02-23",
    auth: "Bearer aad:https://confidential-ledger.azure.com/.default",
  },
  {
    module: "digitaltwins-data",
    run: () =>
      twins.GetDigitalTwinById({
        endpoint: "https://my-twins.api.wus2.digitaltwins.azure.net",
        id: "room-1",
      }),
    method: "GET",
    url: "https://my-twins.api.wus2.digitaltwins.azure.net/digitaltwins/room-1?api-version=2023-10-31",
    auth: "Bearer aad:https://digitaltwins.azure.net/.default",
  },
  {
    // The encoded `{dpsName}` builds the host.
    module: "deviceprovisioning-data",
    run: () => dps.GetDeviceRegistrationState({ dpsName: "my-dps", id: "device-1" }),
    method: "GET",
    url: "https://my-dps.azure-devices-provisioning.net/registrations/device-1?api-version=2021-10-01",
    auth: "Bearer aad:https://azure-devices-provisioning.net/.default",
  },
  {
    module: "confidentialledger-code-transparency",
    run: () =>
      transparency.GetPublicKeys({ endpoint: "https://my-cts.confidential-ledger.azure.com" }),
    method: "GET",
    url: "https://my-cts.confidential-ledger.azure.com/jwks?api-version=2026-03-26",
    auth: "Bearer aad:https://confidential-ledger.azure.com/.default",
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
  test("Container Registry trades the Entra token for a registry access token", async () => {
    const calls: Captured[] = [];
    const registry = Layer.succeed(
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
          const reply =
            url.pathname === "/oauth2/exchange"
              ? { refresh_token: "acr-refresh" }
              : url.pathname === "/oauth2/token"
                ? { access_token: "acr-access" }
                : {};
          return HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify(reply), { status: 200 }),
          );
        }),
      ),
    );
    await Effect.runPromise(
      acr
        .CheckContainerRegistryDockerV2Support({ endpoint: "https://myreg.azurecr.io" })
        .pipe(Retry.none, Effect.provide(credentials()), Effect.provide(registry)),
    );
    expect(calls.map((c) => `${c.method} ${c.url}`)).toEqual([
      "POST https://myreg.azurecr.io/oauth2/exchange",
      "POST https://myreg.azurecr.io/oauth2/token",
      "GET https://myreg.azurecr.io/v2/?api-version=2021-07-01",
    ]);
    const exchange = new URLSearchParams(calls[0]!.body);
    expect(exchange.get("service")).toBe("myreg.azurecr.io");
    expect(exchange.get("access_token")).toBe("aad:https://containerregistry.azure.net/.default");
    expect(new URLSearchParams(calls[1]!.body).get("refresh_token")).toBe("acr-refresh");
    expect(calls[2]!.headers.authorization).toBe("Bearer acr-access");
  });

  test("Storage pins x-ms-version as a header, never api-version", async () => {
    const req = await send(blob.GetBlobTags({ url: BLOB, containerName: "c", blob: "b" }));
    expect(req.headers["x-ms-version"]).toBe("2027-03-07");
    expect(new URL(req.url).searchParams.has("api-version")).toBe(false);
  });

  test("secrets.GetSecret({ vaultBaseUrl, secretName }) reads the latest version", async () => {
    const req = await send(secrets.GetSecret({ vaultBaseUrl: VAULT, secretName: "db-password" }));
    expect(req.method).toBe("GET");
    expect(req.url).toBe(
      "https://my-vault.vault.azure.net/secrets/db-password/?api-version=2026-04-01",
    );
    expect(req.headers.authorization).toBe(vault);
  });

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

  test("the Confidential Ledger identity endpoint gets no token", async () => {
    let resolved = 0;
    const { calls, layer } = capture();
    await Effect.runPromise(
      ledgerIdentity.GetLedgerIdentity({ ledgerId: "my-ledger" }).pipe(
        Retry.none,
        Effect.provide(
          Layer.succeed(
            Credentials,
            Effect.sync((): Config => {
              resolved++;
              return {
                token: () => Effect.succeed(Redacted.make("arm-token")),
                subscriptionId,
                apiBaseUrl: "",
              };
            }),
          ),
        ),
        Effect.provide(layer),
        Effect.exit,
      ),
    );
    expect(calls).toHaveLength(1);
    expect(calls[0]!.url).toBe(
      "https://identity.confidential-ledger.core.azure.com/ledgerIdentity/my-ledger?api-version=2026-02-23",
    );
    expect(calls[0]!.headers.authorization).toBeUndefined();
    expect(resolved).toBe(0);
  });

  test("a data-plane operation without an audience fails instead of sending the ARM token", async () => {
    // No generated module lacks an audience, so pin the rule on a synthetic one.
    const NoAudience = API.make(() => ({
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
