import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromAccessToken } from "./credential-providers/from-access-token.ts";
import { Credentials } from "./credentials-service.ts";
import * as Endpoint from "./endpoint.ts";
import { GCPCredentialsError, GCPParseError, TooManyRequests, UnknownGCPError } from "./errors.ts";
import * as Region from "./region.ts";
import * as Retry from "./retry.ts";
import { allocateIdsProjects } from "./services/datastore_v1.ts";
import { getProjectsLocationsServices } from "./services/run_v2.ts";
import {
  accessProjectsSecretsVersions,
  createProjectsSecrets,
  deleteProjectsSecrets,
  getProjectsLocationsSecrets,
  listProjectsSecrets,
  NotFound,
  SecretVersionNotEnabled,
} from "./services/secretmanager_v1.ts";
import { getObjects, testIamPermissionsBuckets } from "./services/storage_v1.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const fakeGoogle = (
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

const token = fromAccessToken({ accessToken: Redacted.make("ya29.test-token") });

const run = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) => Effect.runPromise(operation.pipe(Retry.none, Effect.provide(token), Effect.provide(http)));

const runFlip = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(token), Effect.provide(http), Effect.flip),
  );

const envelope = (code: number, status: string, message: string, details?: unknown[]) =>
  JSON.stringify({ error: { code, status, message, ...(details ? { details } : {}) } });

describe("request encoding", () => {
  test("sends the access token as a Bearer Authorization header", async () => {
    const { calls, layer } = fakeGoogle(200, JSON.stringify({ name: "projects/p/secrets/s" }));
    await run(getProjectsLocationsSecrets({ name: "projects/p/secrets/s" }), layer);
    expect(calls[0].headers.authorization).toBe("Bearer ya29.test-token");
  });

  test("resolves credentials per request so rotated tokens are picked up", async () => {
    const { calls, layer } = fakeGoogle();
    let n = 0;
    const rotating = Layer.succeed(
      Credentials,
      Effect.sync(() => ({ accessToken: Redacted.make(`token-${++n}`) })),
    );
    const op = deleteProjectsSecrets({ name: "projects/p/secrets/s" }).pipe(
      Retry.none,
      Effect.provide(rotating),
      Effect.provide(layer),
    );
    await Effect.runPromise(op);
    await Effect.runPromise(op);
    expect(calls.map((c) => c.headers.authorization)).toEqual(["Bearer token-1", "Bearer token-2"]);
  });

  test("surfaces a credentials failure without sending a request", async () => {
    const { calls, layer } = fakeGoogle();
    const failing = Layer.succeed(
      Credentials,
      Effect.fail(new GCPCredentialsError({ message: "token exchange rejected" })),
    );
    const error = await Effect.runPromise(
      deleteProjectsSecrets({ name: "projects/p/secrets/s" }).pipe(
        Retry.none,
        Effect.provide(failing),
        Effect.provide(layer),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(GCPCredentialsError);
    expect(calls).toHaveLength(0);
  });

  test("prefixes the per-service base URL including its service path", async () => {
    const { calls, layer } = fakeGoogle();
    await run(getObjects({ bucket: "my-bucket", object: "file.txt" }), layer);
    expect(calls[0].method).toBe("GET");
    expect(calls[0].url.href).toBe(
      "https://storage.googleapis.com/storage/v1/b/my-bucket/o/file.txt",
    );
  });

  test("{+name} reserved expansion keeps '/' but encodes other characters", async () => {
    const { calls, layer } = fakeGoogle();
    await run(getProjectsLocationsSecrets({ name: "projects/p/secrets/a b%" }), layer);
    expect(calls[0].url.href).toBe(
      "https://secretmanager.googleapis.com/v1/projects/p/secrets/a%20b%25",
    );
  });

  test("plain {param} labels are fully percent-encoded, including '/'", async () => {
    const { calls, layer } = fakeGoogle();
    await run(getObjects({ bucket: "b", object: "dir/sub file.txt" }), layer);
    expect(calls[0].url.pathname).toBe("/storage/v1/b/b/o/dir%2Fsub%20file.txt");
  });

  test("scalar query members are stringified and undefined ones omitted", async () => {
    const { calls, layer } = fakeGoogle(200, JSON.stringify({ secrets: [] }));
    await run(
      listProjectsSecrets({ parent: "projects/p", pageSize: 10, filter: "labels.env=prod" }),
      layer,
    );
    const url = calls[0].url;
    expect(url.pathname).toBe("/v1/projects/p/secrets");
    expect(url.searchParams.get("pageSize")).toBe("10");
    expect(url.searchParams.get("filter")).toBe("labels.env=prod");
    expect(url.searchParams.has("pageToken")).toBe(false);
  });

  test("array query members are sent as repeated key=value pairs", async () => {
    const { calls, layer } = fakeGoogle(200, JSON.stringify({ permissions: [] }));
    await run(
      testIamPermissionsBuckets({
        bucket: "b",
        permissions: ["storage.buckets.get", "storage.objects.list"],
      }),
      layer,
    );
    expect(calls[0].url.searchParams.getAll("permissions")).toEqual([
      "storage.buckets.get",
      "storage.objects.list",
    ]);
    expect(calls[0].url.search).toBe(
      "?permissions=storage.buckets.get&permissions=storage.objects.list",
    );
  });

  test("the HttpBody member is the whole JSON request body", async () => {
    const { calls, layer } = fakeGoogle(200, JSON.stringify({ name: "projects/p/secrets/s" }));
    await run(
      createProjectsSecrets({
        parent: "projects/p",
        secretId: "s",
        body: { replication: { automatic: {} }, labels: { env: "test" } },
      }),
      layer,
    );
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url.href).toBe(
      "https://secretmanager.googleapis.com/v1/projects/p/secrets?secretId=s",
    );
    expect(calls[0].headers["content-type"]).toBe("application/json");
    expect(JSON.parse(calls[0].body!)).toEqual({
      replication: { automatic: {} },
      labels: { env: "test" },
    });
  });

  test("requests without a body member send no body", async () => {
    const { calls, layer } = fakeGoogle();
    await run(deleteProjectsSecrets({ name: "projects/p/secrets/s", etag: '"abc"' }), layer);
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].body).toBeUndefined();
    expect(calls[0].url.searchParams.get("etag")).toBe('"abc"');
  });

  test("header members are sent as lower-cased request headers", async () => {
    const { calls, layer } = fakeGoogle();
    await run(
      allocateIdsProjects({
        projectId: "p",
        requestParams: "project_id=p",
        body: { keys: [] },
      }),
      layer,
    );
    expect(calls[0].url.href).toBe("https://datastore.googleapis.com/v1/projects/p:allocateIds");
    expect(calls[0].headers["x-goog-request-params"]).toBe("project_id=p");
  });
});

describe("endpoint selection", () => {
  const regional = "projects/p/locations/europe-west1/secrets/s";

  test("region-required services go to the regional host by default", async () => {
    const { calls, layer } = fakeGoogle();
    await run(getProjectsLocationsSecrets({ name: regional }), layer);
    expect(calls[0].url.href).toBe(
      `https://secretmanager.europe-west1.rep.googleapis.com/v1/${regional}`,
    );
  });

  test("global and wildcard locations stay on the global host", async () => {
    for (const location of ["global", "-"]) {
      const { calls, layer } = fakeGoogle();
      const name = `projects/p/locations/${location}/secrets/s`;
      await run(getProjectsLocationsSecrets({ name }), layer);
      expect(calls[0].url.host).toBe("secretmanager.googleapis.com");
    }
  });

  test("other services stay global unless RegionalEndpoints is 'prefer'", async () => {
    const name = "projects/p/locations/us-central1/services/api";
    const global = fakeGoogle();
    await run(getProjectsLocationsServices({ name }), global.layer);
    expect(global.calls[0].url.host).toBe("run.googleapis.com");

    const preferred = fakeGoogle();
    await run(
      getProjectsLocationsServices({ name }).pipe(
        Effect.provide(Region.regionalEndpoints("prefer")),
      ),
      preferred.layer,
    );
    expect(preferred.calls[0].url.href).toBe(
      `https://run.us-central1.rep.googleapis.com/v2/${name}`,
    );
  });

  test("RegionalEndpoints 'never' keeps region-required services global", async () => {
    const { calls, layer } = fakeGoogle();
    await run(
      getProjectsLocationsSecrets({ name: regional }).pipe(
        Effect.provide(Region.regionalEndpoints("never")),
      ),
      layer,
    );
    expect(calls[0].url.host).toBe("secretmanager.googleapis.com");
  });

  test("an unpublished location falls back to the global host", async () => {
    const { calls, layer } = fakeGoogle();
    await run(
      getProjectsLocationsSecrets({ name: "projects/p/locations/mars-north1/secrets/s" }),
      layer,
    );
    expect(calls[0].url.host).toBe("secretmanager.googleapis.com");
  });

  test("an Endpoint override replaces the origin and keeps the service path", async () => {
    const { calls, layer } = fakeGoogle();
    await run(
      getObjects({ bucket: "b", object: "o" }).pipe(
        Effect.provide(Endpoint.of("http://localhost:4443/proxy/")),
      ),
      layer,
    );
    expect(calls[0].url.href).toBe("http://localhost:4443/proxy/storage/v1/b/b/o/o");
  });

  test("an Endpoint override wins over regional routing", async () => {
    const { calls, layer } = fakeGoogle();
    await run(
      getProjectsLocationsSecrets({ name: regional }).pipe(
        Effect.provide(Endpoint.of("http://localhost:9000")),
      ),
      layer,
    );
    expect(calls[0].url.href).toBe(`http://localhost:9000/v1/${regional}`);
  });

  test("an Endpoint override resolving undefined is ignored", async () => {
    const { calls, layer } = fakeGoogle();
    await run(
      getObjects({ bucket: "b", object: "o" }).pipe(
        Effect.provide(Layer.succeed(Endpoint.Endpoint, Effect.succeed(undefined))),
      ),
      layer,
    );
    expect(calls[0].url.origin).toBe("https://storage.googleapis.com");
  });
});

describe("Google error envelope decoding", () => {
  const name = "projects/p/secrets/s/versions/1";

  test("a declared status matcher yields the per-operation class with envelope fields", async () => {
    const details = [
      { "@type": "type.googleapis.com/google.rpc.ResourceInfo", resourceName: name },
    ];
    const { layer } = fakeGoogle(
      404,
      envelope(404, "NOT_FOUND", "Secret [s] not found or has no versions.", details),
    );
    const error = await runFlip(accessProjectsSecretsVersions({ name }), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({
      code: 404,
      message: "Secret [s] not found or has no versions.",
      status: "NOT_FOUND",
      details,
    });
  });

  test("a message matcher wins over the bare status matcher", async () => {
    const message = `Secret Version [${name}] is in DISABLED state.`;
    const { layer } = fakeGoogle(400, envelope(400, "FAILED_PRECONDITION", message));
    const error = await runFlip(accessProjectsSecretsVersions({ name }), layer);
    expect(error).toBeInstanceOf(SecretVersionNotEnabled);
    expect(error).toMatchObject({ message, status: "FAILED_PRECONDITION", code: 400 });
  });

  test("undeclared statuses fall back to HTTP_STATUS_MAP with envelope fields", async () => {
    const { layer } = fakeGoogle(
      429,
      envelope(429, "RESOURCE_EXHAUSTED", "Quota exceeded for quota metric 'Requests'."),
      { "retry-after": "7" },
    );
    const error = await runFlip(accessProjectsSecretsVersions({ name }), layer);
    expect(error).toBeInstanceOf(TooManyRequests);
    expect(error).toMatchObject({
      message: "Quota exceeded for quota metric 'Requests'.",
      status: "RESOURCE_EXHAUSTED",
    });
    expect((error as TooManyRequests).retryAfter).toBeDefined();
  });

  test("unmapped statuses become UnknownGCPError carrying code and body", async () => {
    const body = { error: { code: 418, status: "UNKNOWN", message: "teapot" } };
    const { layer } = fakeGoogle(418, JSON.stringify(body));
    const error = await runFlip(accessProjectsSecretsVersions({ name }), layer);
    expect(error).toBeInstanceOf(UnknownGCPError);
    expect(error).toMatchObject({ code: 418, message: "teapot", status: "UNKNOWN", body });
  });

  test("a non-JSON error body becomes the message", async () => {
    const { layer } = fakeGoogle(418, "<html>bad gateway</html>");
    const error = await runFlip(accessProjectsSecretsVersions({ name }), layer);
    expect(error).toBeInstanceOf(UnknownGCPError);
    expect(error).toMatchObject({
      code: 418,
      message: "<html>bad gateway</html>",
      body: "<html>bad gateway</html>",
    });
  });

  test("an empty or envelope-less error body uses the HTTP status as message", async () => {
    for (const body of ["", JSON.stringify({ unexpected: true })]) {
      const { layer } = fakeGoogle(404, body);
      const error = await runFlip(accessProjectsSecretsVersions({ name }), layer);
      expect(error).toBeInstanceOf(NotFound);
      expect(error).toMatchObject({ message: "404" });
    }
  });
});

describe("success decoding", () => {
  test("a JSON body is returned verbatim", async () => {
    const secret = { name: "projects/p/secrets/s", labels: { env: "prod" } };
    const { layer } = fakeGoogle(200, JSON.stringify(secret));
    expect(await run(getProjectsLocationsSecrets({ name: secret.name }), layer)).toEqual(secret);
  });

  test("an empty body (Empty response) decodes to {}", async () => {
    for (const status of [200, 204]) {
      const { layer } = fakeGoogle(status, status === 204 ? null : "");
      expect(await run(deleteProjectsSecrets({ name: "projects/p/secrets/s" }), layer)).toEqual({});
    }
  });

  test("strict validation fails a mismatched payload with GCPParseError", async () => {
    const { layer } = fakeGoogle(200, JSON.stringify({ name: 42 }));
    const error = await Effect.runPromise(
      getProjectsLocationsSecrets({ name: "projects/p/secrets/s" }).pipe(
        Retry.none,
        Effect.provide(token),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(GCPParseError);
  });

  test("a non-JSON success body is returned as text in lenient mode", async () => {
    const { layer } = fakeGoogle(200, "plain");
    expect(
      (await run(getProjectsLocationsSecrets({ name: "projects/p/secrets/s" }), layer)) as unknown,
    ).toBe("plain");
  });
});
