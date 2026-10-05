import * as CoreErrors from "@distilled.cloud/core/errors";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, fromAccessToken } from "./credentials.ts";
import { MongodbAtlasParseError, PaymentRequired, UnknownMongodbAtlasError } from "./errors.ts";
import * as Retry from "./retry.ts";
import {
  BadRequest,
  createGroup,
  deleteGroupCluster,
  getGroup,
  getGroupCluster,
  listGroups,
  NotFound,
} from "./services/atlas.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const fakeAtlas = (
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

const token = fromAccessToken({ accessToken: Redacted.make("atlas-token") });

const run = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
  creds: Layer.Layer<Credentials> = token,
) => Effect.runPromise(operation.pipe(Retry.none, Effect.provide(creds), Effect.provide(http)));

const runFlip = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(token), Effect.provide(http), Effect.flip),
  );

const groupId = "5f1a2b3c4d5e6f7a8b9c0d1e";

const atlasError = (status: number, errorCode: string, detail?: string, reason?: string) =>
  JSON.stringify({
    error: status,
    errorCode,
    ...(detail ? { detail } : {}),
    ...(reason ? { reason } : {}),
  });

describe("request encoding", () => {
  test("sends Bearer auth to the default base URL", async () => {
    const { calls, layer } = fakeAtlas(200, JSON.stringify({ id: groupId }));
    await run(getGroup({ groupId }), layer);
    expect(calls[0].headers.authorization).toBe("Bearer atlas-token");
    expect(calls[0].url.href).toBe(`https://cloud.mongodb.com/api/atlas/v2/groups/${groupId}`);
  });

  test("uses the credentials' apiBaseUrl", async () => {
    const { calls, layer } = fakeAtlas(200, JSON.stringify({}));
    await run(
      getGroup({ groupId }),
      layer,
      fromAccessToken({
        accessToken: Redacted.make("t"),
        apiBaseUrl: "https://cloud.mongodbgov.com",
      }),
    );
    expect(calls[0].url.origin).toBe("https://cloud.mongodbgov.com");
  });

  test("resolves credentials per request", async () => {
    const { calls, layer } = fakeAtlas(200, JSON.stringify({}));
    let n = 0;
    const rotating = Layer.succeed(
      Credentials,
      Effect.sync(() => ({
        accessToken: Redacted.make(`t${++n}`),
        apiBaseUrl: "https://cloud.mongodb.com",
      })),
    );
    await run(getGroup({ groupId }), layer, rotating);
    await run(getGroup({ groupId }), layer, rotating);
    expect(calls.map((c) => c.headers.authorization)).toEqual(["Bearer t1", "Bearer t2"]);
  });

  test("a credentials failure surfaces without a request", async () => {
    const { calls, layer } = fakeAtlas();
    const failing = Layer.succeed(
      Credentials,
      Effect.fail(new CoreErrors.ConfigError({ message: "token exchange failed" })),
    );
    const error = await Effect.runPromise(
      getGroup({ groupId }).pipe(
        Retry.none,
        Effect.provide(failing),
        Effect.provide(layer),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(CoreErrors.ConfigError);
    expect(calls).toHaveLength(0);
  });

  test("each operation sends its own date-versioned Accept header", async () => {
    const cases = [
      [getGroup({ groupId }), "application/vnd.atlas.2023-01-01+json"],
      [getGroupCluster({ groupId, clusterName: "c0" }), "application/vnd.atlas.2024-08-05+json"],
      [deleteGroupCluster({ groupId, clusterName: "c0" }), "application/vnd.atlas.2023-02-01+json"],
    ] as const;
    for (const [operation, accept] of cases) {
      const { calls, layer } = fakeAtlas(200, JSON.stringify({}));
      await run(
        operation as Effect.Effect<unknown, unknown, Credentials | HttpClient.HttpClient>,
        layer,
      );
      expect(calls[0].headers.accept).toBe(accept);
    }
  });

  test("labels are encoded, query members stringified, body members sent as JSON", async () => {
    const get = fakeAtlas(200, JSON.stringify({}));
    await run(getGroupCluster({ groupId, clusterName: "my cluster" }), get.layer);
    expect(get.calls[0].url.pathname).toBe(`/api/atlas/v2/groups/${groupId}/clusters/my%20cluster`);

    const list = fakeAtlas(200, JSON.stringify({ results: [] }));
    await run(listGroups({ itemsPerPage: 10, pageNum: 2, includeCount: true }), list.layer);
    expect(list.calls[0].url.search).toBe("?includeCount=true&itemsPerPage=10&pageNum=2");

    const create = fakeAtlas(200, JSON.stringify({ id: groupId, name: "p", orgId: "o" }));
    await run(createGroup({ name: "p", orgId: "o", projectOwnerId: "u" }), create.layer);
    expect(create.calls[0].method).toBe("POST");
    expect(create.calls[0].url.searchParams.get("projectOwnerId")).toBe("u");
    expect(JSON.parse(create.calls[0].body!)).toEqual({ name: "p", orgId: "o" });
    expect(create.calls[0].headers.accept).toBe("application/vnd.atlas.2023-01-01+json");
  });
});

describe("Atlas error envelope decoding", () => {
  test("a declared status class carries `detail` as the message", async () => {
    const { layer } = fakeAtlas(
      404,
      atlasError(404, "GROUP_NOT_FOUND", `No group with ID ${groupId} exists.`, "Not Found"),
    );
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: `No group with ID ${groupId} exists.` });
  });

  test("`reason` is the message when `detail` is absent", async () => {
    const { layer } = fakeAtlas(
      400,
      atlasError(400, "INVALID_ATTRIBUTE", undefined, "Bad Request"),
    );
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: "Bad Request" });
  });

  test("402 maps to PaymentRequired when the operation does not declare it", async () => {
    const { layer } = fakeAtlas(402, atlasError(402, "NO_PAYMENT_INFORMATION_FOUND", "Add a card"));
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(PaymentRequired);
    expect(error).toMatchObject({ message: "Add a card" });
  });

  test("undeclared statuses fall back to the core HTTP classes with Retry-After", async () => {
    const { layer } = fakeAtlas(429, atlasError(429, "RATE_LIMITED", "Slow down"), {
      "retry-after": "5",
    });
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.TooManyRequests);
    expect(error).toMatchObject({ message: "Slow down" });
    expect((error as CoreErrors.TooManyRequests).retryAfter).toBeDefined();
  });

  test("unmapped 5xx becomes InternalServerError; non-JSON text is the message", async () => {
    const { layer } = fakeAtlas(507, " storage full \n");
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.InternalServerError);
    expect(error).toMatchObject({ message: "storage full" });
  });

  test("an empty error body uses `HTTP <status>` as message", async () => {
    const { layer } = fakeAtlas(404, "");
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "HTTP 404" });
  });

  test("unmapped 4xx becomes UnknownMongodbAtlasError carrying the envelope", async () => {
    const body = { error: 418, errorCode: "TEAPOT", reason: "I'm a teapot", detail: "short" };
    const { layer } = fakeAtlas(418, JSON.stringify(body));
    const error = await runFlip(getGroup({ groupId }), layer);
    expect(error).toBeInstanceOf(UnknownMongodbAtlasError);
    expect(error).toMatchObject({
      errorCode: "TEAPOT",
      reason: "I'm a teapot",
      detail: "short",
      body,
    });
  });
});

describe("success decoding", () => {
  test("the 2xx JSON body is the payload", async () => {
    const group = {
      id: groupId,
      name: "p",
      orgId: "o",
      clusterCount: 0,
      created: "2024-01-01T00:00:00Z",
    };
    const { layer } = fakeAtlas(200, JSON.stringify(group));
    expect(await run(getGroup({ groupId }), layer)).toEqual(group);
  });

  test("202/204 with empty bodies decode to {}", async () => {
    for (const [status, body] of [
      [202, ""],
      [204, null],
    ] as const) {
      const { layer } = fakeAtlas(status, body);
      expect(await run(deleteGroupCluster({ groupId, clusterName: "c0" }), layer)).toEqual({});
    }
  });

  test("strict validation fails a mismatched payload with MongodbAtlasParseError", async () => {
    const { layer } = fakeAtlas(200, JSON.stringify({ name: 42 }));
    const error = await Effect.runPromise(
      getGroup({ groupId }).pipe(
        Retry.none,
        Effect.provide(token),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(MongodbAtlasParseError);
  });
});
