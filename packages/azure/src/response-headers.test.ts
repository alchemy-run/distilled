import { describe, expect, test } from "bun:test";
import { mockHttpClient } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import * as Retry from "./retry.ts";
import { AttachedDatabaseConfigurationsCreateOrUpdate } from "./services/azure_kusto.ts";
import { UpdateServer } from "./services/postgresql.ts";

const subscriptionId = "00000000-0000-0000-0000-000000000000";

const TestCredentials = Layer.succeed(
  Credentials,
  Effect.succeed({
    bearerToken: Redacted.make("test"),
    subscriptionId,
    apiBaseUrl: DEFAULT_API_BASE_URL,
  }),
);

const monitor = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/northcentralus/azureAsyncOperation/5dfd3b67-b6cf-4e17-b5de-5389ca1f8c2f?api-version=2025-08-01`;
const results = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/northcentralus/operationResults/5dfd3b67-b6cf-4e17-b5de-5389ca1f8c2f?api-version=2025-08-01`;

const run = <A, E>(
  effect: Effect.Effect<A, E, any>,
  response: Parameters<typeof mockHttpClient>[0],
) =>
  Effect.runPromise(
    effect.pipe(
      Retry.none,
      Effect.provide(TestCredentials),
      Effect.provide(mockHttpClient(response)),
    ) as Effect.Effect<A>,
  );

// Headers recorded from Azure Resource Manager on 2026-10-01: a major
// version upgrade answered 202 with the operation's status monitor.
describe("Azure response headers", () => {
  test("a 202 carries the long-running operation's status monitor", async () => {
    const output = await run(
      UpdateServer({
        subscriptionId,
        resourceGroupName: "rg",
        serverName: "pg",
        properties: { createMode: "Update", version: "17" },
      }),
      {
        status: 202,
        headers: {
          "content-type": "application/json",
          "azure-asyncoperation": monitor,
          location: results,
          "retry-after": "60",
        },
        body: JSON.stringify({
          operation: "UpsertServerManagementOperationV2",
          startTime: "2026-10-01T20:47:48.6Z",
        }),
      },
    );
    expect(output).toMatchObject({
      azureAsyncOperation: monitor,
      location: results,
      retryAfter: 60,
    });
  });

  test("a body member keeps its name next to a same-named header", async () => {
    // The body's `location` is the region; the `Location` header is suffixed.
    const output = await run(
      AttachedDatabaseConfigurationsCreateOrUpdate({
        subscriptionId,
        resourceGroupName: "rg",
        clusterName: "kusto",
        attachedDatabaseConfigurationName: "attached",
        location: "westus",
      }),
      {
        status: 200,
        headers: { "content-type": "application/json", location: results },
        body: JSON.stringify({ name: "attached", location: "West US" }),
      },
    );
    expect(output).toMatchObject({
      name: "attached",
      location: "West US",
      locationHeader: results,
    });
  });
});
