import { mockHttpClient } from "@distilled.cloud/dev/testing";
import * as Effect from "effect/Effect";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { fromToken, resolveConfig } from "../src/credentials.ts";
import { NamespaceLabsProtocol, baseUrlFor, hostFor } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import * as compute from "../src/services/compute.ts";
import * as githubProfile from "../src/services/github_profile.ts";
import * as vault from "../src/services/vault.ts";

const creds = resolveConfig({ token: Redacted.make("test"), region: "eu" });

describe("hostFor", () => {
  test.each([
    ["/namespace.cloud.compute.v1beta.ComputeService/ListInstances", "compute"],
    ["/namespace.cloud.testing.v1beta.TestResultsService/ListTestRuns", "global"],
    ["/namespace.cloud.compute.v1beta.StorageService/ListCacheVolumes", "compute"],
    ["/namespace.cloud.builder.v1beta.BuilderService/GetBuilderConfiguration", "compute"],
    ["/namespace.experimental.compute.ReservationService/ListReservations", "compute"],
    ["/namespace.cloud.storage.v1beta.ArtifactsService/ListArtifacts", "storage"],
    ["/namespace.cloud.iam.v1beta.TokenService/ListRevokableTokens", "global"],
    ["/namespace.cloud.registry.v1beta.ContainerRegistryService/ListImages", "global"],
    ["/namespace.cloud.vault.v1beta.VaultService/ListObjects", "global"],
    ["/namespace.cloud.integrations.bazel.v1beta.BazelCacheService/EnsureBazelCache", "global"],
    ["/namespace.cloud.github.v1beta.ProfileService/ListProfiles", "privateApi"],
    ["/namespace.private.devbox.v1beta.DevBoxService/List", "privateApi"],
    ["/namespace.private.sessions.v1beta.UserSessionsService/ListSessions", "privateApi"],
  ] as const)("%s → %s", (uri, host) => {
    expect(hostFor(uri)).toBe(host);
  });
});

describe("baseUrlFor", () => {
  test("regional hosts follow the configured region", () => {
    expect(baseUrlFor(creds, "/namespace.cloud.compute.v1beta.ComputeService/ListInstances")).toBe(
      "https://eu.compute.namespaceapis.com",
    );
    expect(
      baseUrlFor(creds, "/namespace.cloud.storage.v1beta.ArtifactsService/ListArtifacts"),
    ).toBe("https://eu.storage.namespaceapis.com");
  });

  test("global and private hosts do not", () => {
    expect(baseUrlFor(creds, "/namespace.cloud.iam.v1beta.TenantService/ListTenants")).toBe(
      "https://global.namespaceapis.com",
    );
    expect(baseUrlFor(creds, "/namespace.private.devbox.v1beta.DevBoxService/List")).toBe(
      "https://private-api.global.namespaceapis.com",
    );
  });

  test("an explicit host override wins", () => {
    const custom = resolveConfig({
      token: Redacted.make("test"),
      computeBaseUrl: "http://localhost:8080",
    });
    expect(baseUrlFor(custom, "/namespace.cloud.compute.v1beta.ComputeService/ListInstances")).toBe(
      "http://localhost:8080",
    );
    expect(
      baseUrlFor(custom, "/namespace.cloud.storage.v1beta.ArtifactsService/ListArtifacts"),
    ).toBe("https://us.storage.namespaceapis.com");
  });
});

const seen: HttpClientRequest.HttpClientRequest[] = [];

const bodyOf = (request: HttpClientRequest.HttpClientRequest): string =>
  request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : "";

const call = <A, E>(
  effect: Effect.Effect<A, E, compute.NamespaceLabsOpContext>,
  response:
    | { status?: number; body: string }
    | ((request: HttpClientRequest.HttpClientRequest) => { status?: number; body: string }),
) =>
  Effect.runPromise(
    effect.pipe(
      Retry.none,
      Effect.provide(NamespaceLabsProtocol),
      Effect.provide(fromToken(Redacted.make("test-token"))),
      Effect.provide(
        mockHttpClient((request) => {
          seen.push(request);
          return typeof response === "function" ? response(request) : response;
        }),
      ),
      Effect.result,
    ),
  );

const connectError = (status: number, code: string, message = code) => ({
  status,
  body: JSON.stringify({ code, message, details: [{ debug: { id: "req-1" } }] }),
});

describe("requests", () => {
  test("an Empty request is a JSON POST with a {} body and the bearer token", async () => {
    seen.length = 0;
    const result = await call(githubProfile.listProfiles({}), {
      body: JSON.stringify({ profiles: [] }),
    });
    expect(result).toMatchObject({ _tag: "Success", success: { profiles: [] } });
    const [request] = seen;
    expect(request!.method).toBe("POST");
    expect(request!.url).toBe(
      "https://private-api.global.namespaceapis.com/namespace.cloud.github.v1beta.ProfileService/ListProfiles",
    );
    expect(request!.headers["authorization"]).toBe("Bearer test-token");
    expect(request!.headers["content-type"]).toBe("application/json");
    expect(bodyOf(request!)).toBe("{}");
  });

  test("a request body is proto3 JSON on the regional compute host", async () => {
    seen.length = 0;
    await call(compute.describeInstance({ instanceId: "abc" }), { body: "{}" });
    expect(seen[0]!.url).toBe(
      "https://us.compute.namespaceapis.com/namespace.cloud.compute.v1beta.ComputeService/DescribeInstance",
    );
    expect(JSON.parse(bodyOf(seen[0]!))).toEqual({ instanceId: "abc" });
  });
});

describe("Connect errors", () => {
  test("not_found is a typed NotFound carrying the Connect body", async () => {
    const result = await call(
      compute.describeInstance({ instanceId: "missing" }),
      connectError(404, "not_found", "instance not found"),
    );
    expect(result).toMatchObject({
      _tag: "Failure",
      failure: {
        _tag: "NotFound",
        message: "instance not found",
        body: { code: "not_found", details: [{ debug: { id: "req-1" } }] },
      },
    });
  });

  test.each([
    [400, "invalid_argument", "InvalidArgument"],
    [400, "failed_precondition", "FailedPrecondition"],
    [400, "out_of_range", "OutOfRange"],
    [401, "unauthenticated", "Unauthenticated"],
    [403, "permission_denied", "PermissionDenied"],
    [409, "already_exists", "AlreadyExists"],
    [409, "aborted", "Aborted"],
    [429, "resource_exhausted", "ResourceExhausted"],
    [499, "canceled", "Canceled"],
    [501, "unimplemented", "Unimplemented"],
  ] as const)("%d %s is %s", async (status, code, tag) => {
    const result = await call(vault.describeObject({ objectId: "x" }), connectError(status, code));
    expect(result).toMatchObject({ _tag: "Failure", failure: { _tag: tag, message: code } });
  });

  test("an unmapped status is UnknownNamespaceLabsError with the code and details", async () => {
    const result = await call(
      vault.describeObject({ objectId: "x" }),
      connectError(418, "unknown"),
    );
    expect(result).toMatchObject({
      _tag: "Failure",
      failure: {
        _tag: "UnknownNamespaceLabsError",
        code: "unknown",
        message: "unknown",
        details: [{ debug: { id: "req-1" } }],
      },
    });
  });
});

describe("pagination", () => {
  test("listInstances follows paginationCursor until it is absent", async () => {
    seen.length = 0;
    const pages = [
      { instances: [{ metadata: { instanceId: "a" } }], paginationCursor: "c1" },
      { instances: [{ metadata: { instanceId: "b" } }] },
    ];
    const result = await call(Stream.runCollect(compute.listInstances.items({})), () => ({
      body: JSON.stringify(pages[seen.length - 1]),
    }));
    expect(result).toMatchObject({ _tag: "Success" });
    expect(Array.from((result as any).success).map((i: any) => i.metadata.instanceId)).toEqual([
      "a",
      "b",
    ]);
    expect(seen.map((r) => JSON.parse(bodyOf(r)))).toEqual([{}, { paginationCursor: "c1" }]);
  });
});
