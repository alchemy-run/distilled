import * as CoreErrors from "@distilled.cloud/core/errors";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, credentials } from "./credentials.ts";
import { StackitParseError, UnknownStackitError } from "./errors.ts";
import { applyRegion } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listServers } from "./services/iaas.ts";
import {
  BadRequest,
  Conflict,
  deleteProject,
  getProject,
  listProjects,
  NotFound,
} from "./services/resource_manager.ts";
import { getInstance } from "./services/secrets_manager.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const fakeStackit = (
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

const creds = (config: { region?: string; apiBaseUrl?: string } = {}) =>
  credentials({ token: Redacted.make("stackit-token"), ...config });

const run = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
  credentialsLayer: Layer.Layer<Credentials> = creds(),
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(credentialsLayer), Effect.provide(http)),
  );

const runFlip = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(creds()), Effect.provide(http), Effect.flip),
  );

const projectId = "11111111-2222-3333-4444-555555555555";

describe("applyRegion", () => {
  test("inserts the region into a version-less product host", () => {
    expect(applyRegion("https://ske.api.stackit.cloud", "eu01")).toBe(
      "https://ske.api.eu01.stackit.cloud",
    );
    expect(applyRegion("https://load-balancer.api.stackit.cloud/", "eu02")).toBe(
      "https://load-balancer.api.eu02.stackit.cloud/",
    );
  });

  test("substitutes a glued {region} template, adding the trailing dot", () => {
    expect(applyRegion("https://argus.api.{region}stackit.cloud", "eu01")).toBe(
      "https://argus.api.eu01.stackit.cloud",
    );
    expect(applyRegion("https://argus.api.{region}stackit.cloud", "eu01.")).toBe(
      "https://argus.api.eu01.stackit.cloud",
    );
  });

  test("substitutes a non-glued {region} template verbatim", () => {
    expect(applyRegion("https://example.{region}.stackit.cloud", "eu01")).toBe(
      "https://example.eu01.stackit.cloud",
    );
  });

  test("'global' leaves hosts alone and drops a leftover {region}", () => {
    expect(applyRegion("https://dns.api.stackit.cloud", "global")).toBe(
      "https://dns.api.stackit.cloud",
    );
    expect(applyRegion("https://argus.api.{region}stackit.cloud", "global")).toBe(
      "https://argus.api.stackit.cloud",
    );
  });

  test("leaves non-STACKIT and already-regional hosts alone", () => {
    expect(applyRegion("https://proxy.example.com", "eu01")).toBe("https://proxy.example.com");
    expect(applyRegion("https://ske.api.eu01.stackit.cloud", "eu02")).toBe(
      "https://ske.api.eu01.stackit.cloud",
    );
  });
});

describe("request encoding", () => {
  test("sends Bearer auth to the product host in the default region (eu01)", async () => {
    const { calls, layer } = fakeStackit(200, JSON.stringify({}));
    await run(getProject({ id: projectId }), layer);
    expect(calls[0].headers.authorization).toBe("Bearer stackit-token");
    expect(calls[0].url.href).toBe(
      `https://resource-manager.api.eu01.stackit.cloud/v2/projects/${projectId}`,
    );
  });

  test("each product uses its own host; the configured region is applied", async () => {
    const iaas = fakeStackit(200, JSON.stringify({ items: [] }));
    await run(
      listServers({ projectId, region: "eu02", details: true }),
      iaas.layer,
      creds({ region: "eu02" }),
    );
    expect(iaas.calls[0].url.href).toBe(
      `https://iaas.api.eu02.stackit.cloud/v2/projects/${projectId}/regions/eu02/servers?details=true`,
    );

    const secrets = fakeStackit(200, JSON.stringify({}));
    await run(
      getInstance({ projectId, instanceId: "i-1" }),
      secrets.layer,
      creds({ region: "eu02" }),
    );
    expect(secrets.calls[0].url.href).toBe(
      `https://secrets-manager.api.eu02.stackit.cloud/v1/projects/${projectId}/instances/i-1`,
    );
  });

  test("region 'global' keeps the spec host", async () => {
    const { calls, layer } = fakeStackit(200, JSON.stringify({}));
    await run(getProject({ id: projectId }), layer, creds({ region: "global" }));
    expect(calls[0].url.origin).toBe("https://resource-manager.api.stackit.cloud");
  });

  test("an explicit apiBaseUrl overrides every product host", async () => {
    const { calls, layer } = fakeStackit(200, JSON.stringify({}));
    await run(
      getInstance({ projectId, instanceId: "i-1" }),
      layer,
      creds({ apiBaseUrl: "http://localhost:8080" }),
    );
    expect(calls[0].url.href).toBe(`http://localhost:8080/v1/projects/${projectId}/instances/i-1`);
  });

  test("resolves credentials per request", async () => {
    const { calls, layer } = fakeStackit(200, JSON.stringify({}));
    let n = 0;
    const rotating = Layer.succeed(
      Credentials,
      Effect.sync(() => ({ token: Redacted.make(`t${++n}`), region: n === 1 ? "eu01" : "eu02" })),
    );
    await run(getProject({ id: projectId }), layer, rotating);
    await run(getProject({ id: projectId }), layer, rotating);
    expect(calls.map((c) => [c.headers.authorization, c.url.host])).toEqual([
      ["Bearer t1", "resource-manager.api.eu01.stackit.cloud"],
      ["Bearer t2", "resource-manager.api.eu02.stackit.cloud"],
    ]);
  });

  test("labels are encoded; array queries repeat; wire query names are used", async () => {
    const get = fakeStackit(200, JSON.stringify({}));
    await run(getProject({ id: "a b/c" }), get.layer);
    expect(get.calls[0].url.pathname).toBe("/v2/projects/a%20b%2Fc");

    const list = fakeStackit(200, JSON.stringify({ items: [] }));
    await run(
      listProjects({
        containerIds: ["p1", "p2"],
        limit: 10,
        creation_time_start: "2024-01-01T00:00:00Z",
      }),
      list.layer,
    );
    const url = list.calls[0].url;
    expect(url.searchParams.getAll("containerIds")).toEqual(["p1", "p2"]);
    expect(url.searchParams.get("limit")).toBe("10");
    expect(url.searchParams.get("creation-time-start")).toBe("2024-01-01T00:00:00Z");
  });
});

describe("{ message, error } failure envelope", () => {
  test("a declared status class carries `message`", async () => {
    const { layer } = fakeStackit(
      404,
      JSON.stringify({ message: "project not found", error: "Not Found" }),
    );
    const error = await runFlip(getProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "project not found" });
  });

  test("409 matches the declared Conflict", async () => {
    const { layer } = fakeStackit(
      409,
      JSON.stringify({ message: "has children", error: "Conflict" }),
    );
    const error = await runFlip(deleteProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(Conflict);
  });

  test("400 matches the declared BadRequest", async () => {
    const { layer } = fakeStackit(
      400,
      JSON.stringify({ message: "bad limit", error: "Bad Request" }),
    );
    const error = await runFlip(listProjects({ limit: -1 }), layer);
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: "bad limit" });
  });

  test("undeclared statuses fall back to the core HTTP classes with Retry-After", async () => {
    const { layer } = fakeStackit(429, JSON.stringify({ message: "slow down" }), {
      "retry-after": "4",
    });
    const error = await runFlip(getProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.TooManyRequests);
    expect(error).toMatchObject({ message: "slow down" });
    expect((error as CoreErrors.TooManyRequests).retryAfter).toBeDefined();
  });

  test("unmapped 5xx becomes InternalServerError; plain text is the message", async () => {
    const { layer } = fakeStackit(507, "  insufficient storage\n");
    const error = await runFlip(getProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.InternalServerError);
    expect(error).toMatchObject({ message: "insufficient storage" });
  });

  test("an empty body uses `HTTP <status>` as message", async () => {
    const { layer } = fakeStackit(404, "");
    const error = await runFlip(getProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "HTTP 404" });
  });

  test("unmapped 4xx becomes UnknownStackitError with `error` as code", async () => {
    const body = { message: "teapot", error: "I'm a teapot" };
    const { layer } = fakeStackit(418, JSON.stringify(body));
    const error = await runFlip(getProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(UnknownStackitError);
    expect(error).toMatchObject({ code: "I'm a teapot", message: "teapot", body });
  });

  test("a numeric `code` is stringified when `error` is absent", async () => {
    const body = { message: "teapot", code: 4180 };
    const { layer } = fakeStackit(418, JSON.stringify(body));
    const error = await runFlip(getProject({ id: projectId }), layer);
    expect(error).toBeInstanceOf(UnknownStackitError);
    expect(error).toMatchObject({ code: "4180", message: "teapot" });
  });
});

describe("success decoding", () => {
  test("the 2xx JSON body is the payload; empty bodies decode to {}", async () => {
    const project = { containerId: "c", projectId, name: "p" };
    const get = fakeStackit(200, JSON.stringify(project));
    expect(await run(getProject({ id: projectId }), get.layer)).toEqual(project);

    for (const [status, body] of [
      [202, ""],
      [204, null],
    ] as const) {
      const del = fakeStackit(status, body);
      expect(await run(deleteProject({ id: projectId }), del.layer)).toEqual({});
    }
  });

  test("strict validation fails a mismatched payload with StackitParseError", async () => {
    const { layer } = fakeStackit(200, JSON.stringify({ name: 42 }));
    const error = await Effect.runPromise(
      getProject({ id: projectId }).pipe(
        Retry.none,
        Effect.provide(creds()),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(StackitParseError);
  });
});
