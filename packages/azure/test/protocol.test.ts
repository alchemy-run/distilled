import { inspect } from "node:util";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials } from "../src/credentials.ts";
import {
  AzureParseError,
  InternalServerError,
  InvalidAuthenticationToken,
  ManagedHsmPoolUpdating,
  NotFound,
  ResourceGroupNotFound,
  ResourceNotFound,
  TooManyRequests,
  UnknownAzureError,
} from "../src/errors.ts";
import * as Retry from "../src/retry.ts";
import { RegenerateConfigurationStoreKey } from "../src/services/appconfiguration.ts";
import { CreateRoleAssignment, GetRoleAssignment } from "../src/services/authorization.ts";
import { CommunicationServicesLinkNotificationHub } from "../src/services/communication.ts";
import {
  DeleteResourceGroup,
  GetResourceGroup,
  ListResourceGroups,
} from "../src/services/resources.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const fakeArm = (
  status = 200,
  body: string | null = "{}",
  headers: Record<string, string> = {},
) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(request, new Response(body, { status, headers }));
      }),
    ),
  );
  return { calls, layer };
};

const subscriptionId = "00000000-0000-0000-0000-000000000001";

const credentials = (apiBaseUrl = "https://management.azure.com", token = "arm-token") =>
  Layer.succeed(
    Credentials,
    Effect.succeed({ bearerToken: Redacted.make(token), subscriptionId, apiBaseUrl }),
  );

const run = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
  creds = credentials(),
) => Effect.runPromise(operation.pipe(Retry.none, Effect.provide(creds), Effect.provide(http)));

const runFlip = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(credentials()), Effect.provide(http), Effect.flip),
  );

const rg = { subscriptionId, resourceGroupName: "my-rg" };

const SECRET = "sentinel-secret-7f3a";

describe("request encoding", () => {
  test("sends Bearer auth and Accept: application/json", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    await run(GetResourceGroup(rg), layer);
    expect(calls[0].headers.authorization).toBe("Bearer arm-token");
    expect(calls[0].headers.accept).toBe("application/json");
  });

  test("resolves credentials per request", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    let n = 0;
    const rotating = Layer.succeed(
      Credentials,
      Effect.sync(() => ({
        bearerToken: Redacted.make(`t${++n}`),
        subscriptionId,
        apiBaseUrl: "https://management.azure.com",
      })),
    );
    await run(GetResourceGroup(rg), layer, rotating);
    await run(GetResourceGroup(rg), layer, rotating);
    expect(calls.map((c) => c.headers.authorization)).toEqual(["Bearer t1", "Bearer t2"]);
  });

  test("appends the operation's api-version to every request", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    await run(GetResourceGroup(rg), layer);
    expect(calls[0].url.href).toBe(
      `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/my-rg?api-version=2025-04-01`,
    );
  });

  test("api-version follows existing query parameters, with $-prefixed wire names", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ value: [] }));
    await run(ListResourceGroups({ subscriptionId, _filter: "tagName eq 'env'", _top: 5 }), layer);
    const url = calls[0].url;
    expect([...url.searchParams.keys()]).toEqual(["$filter", "$top", "api-version"]);
    expect(url.searchParams.get("$filter")).toBe("tagName eq 'env'");
    expect(url.searchParams.get("$top")).toBe("5");
    expect(url.searchParams.get("api-version")).toBe("2025-04-01");
  });

  test("uses the credentials' apiBaseUrl", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    await run(GetResourceGroup(rg), layer, credentials("https://management.usgovcloudapi.net"));
    expect(calls[0].url.origin).toBe("https://management.usgovcloudapi.net");
  });

  test("injects subscriptionId from credentials when the caller omits it", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    await run(
      GetResourceGroup({ resourceGroupName: "my-rg" } as Parameters<typeof GetResourceGroup>[0]),
      layer,
    );
    expect(calls[0].url.pathname).toBe(`/subscriptions/${subscriptionId}/resourcegroups/my-rg`);
  });

  test("an explicit subscriptionId wins over the credentials' one", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    await run(GetResourceGroup({ subscriptionId: "other-sub", resourceGroupName: "rg" }), layer);
    expect(calls[0].url.pathname).toBe("/subscriptions/other-sub/resourcegroups/rg");
  });

  test("plain labels are percent-encoded", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ location: "westus" }));
    await run(GetResourceGroup({ subscriptionId, resourceGroupName: "a b/c" }), layer);
    expect(calls[0].url.pathname).toBe(`/subscriptions/${subscriptionId}/resourcegroups/a%20b%2Fc`);
  });

  test("greedy {scope+} labels keep '/' and drop a leading slash", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({}));
    await run(
      GetRoleAssignment({
        scope: `/subscriptions/${subscriptionId}/resourceGroups/my rg`,
        roleAssignmentName: "ra-1",
      }),
      layer,
    );
    expect(calls[0].url.pathname).toBe(
      `/subscriptions/${subscriptionId}/resourceGroups/my%20rg/providers/Microsoft.Authorization/roleAssignments/ra-1`,
    );
    expect(calls[0].url.searchParams.get("api-version")).toBe("2022-04-01");
  });

  test("body members are sent as the JSON body", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({}));
    const properties = {
      roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/r",
      principalId: "p",
      principalType: "ServicePrincipal",
    };
    await run(
      CreateRoleAssignment({
        scope: `subscriptions/${subscriptionId}`,
        roleAssignmentName: "ra-1",
        properties,
      }),
      layer,
    );
    expect(calls[0].method).toBe("PUT");
    expect(JSON.parse(calls[0].body!)).toEqual({ properties });
  });

  test("Redacted sensitive inputs are unwrapped on the wire", async () => {
    const { calls, layer } = fakeArm(200, JSON.stringify({ resourceId: "hub" }));
    await run(
      CommunicationServicesLinkNotificationHub({
        subscriptionId,
        resourceGroupName: "rg",
        communicationServiceName: "comm",
        resourceId: "hub",
        connectionString: Redacted.make("Endpoint=sb://secret"),
      }),
      layer,
    );
    expect(JSON.parse(calls[0].body!)).toEqual({
      resourceId: "hub",
      connectionString: "Endpoint=sb://secret",
    });
  });
});

describe("ARM error envelope decoding", () => {
  const armError = (code: string, message: string, extra: Record<string, unknown> = {}) =>
    JSON.stringify({ error: { code, message, ...extra } });

  test("error.code dispatches to the mapped typed error with code, message and target", async () => {
    const { layer } = fakeArm(
      404,
      armError("ResourceGroupNotFound", "Resource group 'my-rg' could not be found.", {
        target: "my-rg",
      }),
    );
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(ResourceGroupNotFound);
    expect(error).toMatchObject({
      code: "ResourceGroupNotFound",
      message: "Resource group 'my-rg' could not be found.",
      target: "my-rg",
    });
  });

  test("the flat { code, message } shape is accepted", async () => {
    const { layer } = fakeArm(
      401,
      JSON.stringify({ code: "InvalidAuthenticationToken", message: "expired" }),
    );
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(InvalidAuthenticationToken);
    expect(error).toMatchObject({ message: "expired" });
  });

  test("PascalCase Code/Message (legacy RPs) are accepted", async () => {
    const { layer } = fakeArm(
      404,
      JSON.stringify({ Code: "ResourceNotFound", Message: "The resource was not found." }),
    );
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(ResourceNotFound);
    expect(error).toMatchObject({
      code: "ResourceNotFound",
      message: "The resource was not found.",
    });
  });

  test("message matchers win over the code map", async () => {
    const { layer } = fakeArm(
      409,
      armError("409", "The managed HSM pool is still updating its spec. Retry later."),
    );
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(ManagedHsmPoolUpdating);
  });

  test("a mapped nested details[].code is used when the top-level code is generic", async () => {
    const { layer } = fakeArm(
      400,
      armError("ValidationError", "Validation failed", {
        target: "t",
        details: [
          { code: "SomethingUnmapped", message: "ignored" },
          { code: "ResourceNotFound", message: "The parent was not found." },
        ],
      }),
    );
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(ResourceNotFound);
    expect(error).toMatchObject({
      code: "ResourceNotFound",
      message: "The parent was not found.",
      target: "t",
    });
  });

  test("unmapped codes fall back to the HTTP status class", async () => {
    const { layer } = fakeArm(404, armError("SomeNewCode", "Gone fishing"));
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "Gone fishing" });
  });

  test("retryable statuses honor Retry-After", async () => {
    const { layer } = fakeArm(429, armError("SomeThrottle", "slow down"), {
      "retry-after": "12",
    });
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(TooManyRequests);
    expect((error as TooManyRequests).retryAfter).toBeDefined();
  });

  test("a non-JSON error body becomes the trimmed message", async () => {
    const { layer } = fakeArm(404, "  <html>not here</html>\n");
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "<html>not here</html>" });
  });

  test("a bare JSON string body becomes the message", async () => {
    const { layer } = fakeArm(418, JSON.stringify("Guest configuration says no"));
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(UnknownAzureError);
    expect(error).toMatchObject({
      message: "Guest configuration says no",
      body: "Guest configuration says no",
    });
  });

  test("unmapped 5xx becomes a retryable InternalServerError", async () => {
    const { layer } = fakeArm(507, "");
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error).toMatchObject({ message: "HTTP 507" });
  });

  test("unmapped 4xx becomes UnknownAzureError with the ARM fields and body", async () => {
    const body = { error: { code: "Teapot", message: "short and stout", target: "pot" } };
    const { layer } = fakeArm(418, JSON.stringify(body));
    const error = await runFlip(GetResourceGroup(rg), layer);
    expect(error).toBeInstanceOf(UnknownAzureError);
    expect(error).toMatchObject({
      code: "Teapot",
      message: "short and stout",
      target: "pot",
      body,
    });
  });
});

describe("success decoding", () => {
  test("the 2xx JSON body is the payload", async () => {
    const group = { id: "/x", name: "my-rg", location: "westus", tags: { env: "prod" } };
    const { layer } = fakeArm(200, JSON.stringify(group));
    expect(await run(GetResourceGroup(rg), layer)).toEqual(group);
  });

  test("empty 202 / 204 / 200 bodies decode to the declared headers, or {}", async () => {
    for (const [status, body] of [
      [202, ""],
      [204, null],
      [200, ""],
    ] as const) {
      const { layer } = fakeArm(status, body, status === 202 ? { location: "https://poll" } : {});
      expect(await run(DeleteResourceGroup(rg), layer)).toEqual(
        status === 202 ? { location: "https://poll" } : {},
      );
    }
  });

  test("sensitive output members are delivered as Redacted", async () => {
    const { layer } = fakeArm(
      200,
      JSON.stringify({ id: "k", connectionString: "Endpoint=secret", readOnly: true }),
    );
    const key = await run(
      RegenerateConfigurationStoreKey({
        subscriptionId,
        resourceGroupName: "rg",
        configStoreName: "store",
        id: "k",
      }),
      layer,
    );
    expect(key.id).toBe("k");
    expect(Redacted.isRedacted(key.connectionString)).toBe(true);
    expect(Redacted.value(key.connectionString as Redacted.Redacted<string>)).toBe(
      "Endpoint=secret",
    );
  });

  test("strict validation fails a mismatched payload with AzureParseError", async () => {
    const { layer } = fakeArm(200, JSON.stringify({ name: "rg" }));
    const error = await Effect.runPromise(
      GetResourceGroup(rg).pipe(
        Retry.none,
        Effect.provide(credentials()),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(AzureParseError);
  });

  const regenerateKey = RegenerateConfigurationStoreKey({
    subscriptionId,
    resourceGroupName: "rg",
    configStoreName: "store",
    id: "k",
  });

  test("a body cut off mid-secret fails in both modes without exposing it", async () => {
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const { layer } = fakeArm(200, `{"id":"k","connectionString":"${SECRET}`);
      const error = await runFlip(regenerateKey.pipe(Effect.provide(mode)), layer);
      expect(error).toBeInstanceOf(AzureParseError);
      expect(error).toMatchObject({ body: "[REDACTED]" });
      expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
    }
  });

  test("a strict mismatch with a sensitive output fails without exposing the body", async () => {
    const { layer } = fakeArm(200, JSON.stringify({ connectionString: SECRET, readOnly: "no" }));
    const error = await runFlip(
      regenerateKey.pipe(Effect.provide(ResponseValidation.strict)),
      layer,
    );
    expect(error).toBeInstanceOf(AzureParseError);
    expect(error).toMatchObject({ body: "[REDACTED]" });
    expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
  });

  test("a strict mismatch whose offending value is the secret fails without exposing it", async () => {
    const { layer } = fakeArm(200, JSON.stringify({ connectionString: "c", readOnly: SECRET }));
    const error = await runFlip(
      regenerateKey.pipe(Effect.provide(ResponseValidation.strict)),
      layer,
    );
    expect(error).toBeInstanceOf(AzureParseError);
    expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
  });
});
