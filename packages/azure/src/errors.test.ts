import { describe, expect, test } from "bun:test";
import { mockHttpClient } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import { InvalidParameter, LocationNotAvailable } from "./errors.ts";
import * as Retry from "./retry.ts";
import { ServersCreateOrUpdate } from "./services/postgresql.ts";
import { ResourceGroupsCreateOrUpdate } from "./services/resources.ts";

const subscriptionId = "00000000-0000-0000-0000-000000000000";

const TestCredentials = Layer.succeed(
  Credentials,
  Effect.succeed({
    bearerToken: Redacted.make("test"),
    subscriptionId,
    apiBaseUrl: DEFAULT_API_BASE_URL,
  }),
);

const fail = <A, E>(
  effect: Effect.Effect<A, E, any>,
  status: number,
  error: { code: string; message: string },
) =>
  Effect.runPromise(
    effect.pipe(
      Retry.none,
      Effect.provide(TestCredentials),
      Effect.provide(
        mockHttpClient({ status, body: JSON.stringify({ error }) }),
      ),
      Effect.flip,
    ) as Effect.Effect<E>,
  );

// Error bodies recorded from Azure Resource Manager on 2026-10-01.
describe("Azure error codes", () => {
  test("ParameterOutOfRange is an InvalidParameter", async () => {
    const message =
      "The value of the 'Version' should be in: [11,12,13,14,15,16,17,18]. Verify that the specified parameter value is correct.";
    const error = await fail(
      ServersCreateOrUpdate({
        subscriptionId,
        resourceGroupName: "rg",
        serverName: "pg",
        location: "centralus",
      }),
      400,
      { code: "ParameterOutOfRange", message },
    );
    expect(error).toBeInstanceOf(InvalidParameter);
    expect(error).toMatchObject({ code: "ParameterOutOfRange", message });
  });

  test("LocationNotAvailableForResourceGroup is a LocationNotAvailable", async () => {
    const message =
      "The provided location 'nowhere' is not available for resource group. List of available regions is 'eastasia,southeastasia,centralus'.";
    const error = await fail(
      ResourceGroupsCreateOrUpdate({
        subscriptionId,
        resourceGroupName: "rg",
        location: "nowhere",
      }),
      400,
      { code: "LocationNotAvailableForResourceGroup", message },
    );
    expect(error).toBeInstanceOf(LocationNotAvailable);
    expect(error).toMatchObject({
      code: "LocationNotAvailableForResourceGroup",
      message,
    });
  });
});
