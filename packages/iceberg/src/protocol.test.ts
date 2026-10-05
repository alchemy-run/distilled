import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as UrlParams from "effect/http/UrlParams";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { type Config, credentials, fromCatalogConfig } from "./credentials.ts";
import { AuthenticationTimeout, Forbidden, NotFound } from "./errors.ts";
import { baseUrlFor, IcebergProtocol, type IcebergOpContext } from "./protocol.ts";
import {
  CommitStateUnknownException,
  getConfig,
  listTables,
  loadTable,
  NoSuchNamespaceException,
  NoSuchTableException,
  tableExists,
  updateTable,
} from "./services/catalog.ts";

interface Recorded {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
}

const makeClient = (respond: (request: Recorded) => Response) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request: HttpClientRequest.HttpClientRequest) =>
    Effect.sync(() => {
      const query = UrlParams.toString(request.urlParams);
      const recorded = {
        method: request.method,
        url: query ? `${request.url}?${query}` : request.url,
        headers: { ...request.headers },
      };
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded));
    }),
  );
  return { client, requests };
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const icebergError = (status: number, type: string) =>
  json(status, { error: { message: `${type} happened`, type, code: status } });

const run = <A, E>(
  effect: Effect.Effect<A, E, IcebergOpContext>,
  respond: (request: Recorded) => Response,
  config: Config = {
    uri: "https://catalog.test/acct/bucket/",
    prefix: "wh-1",
    token: Redacted.make("t0k"),
  },
) => {
  const { client, requests } = makeClient(respond);
  const layer = Layer.mergeAll(
    Layer.succeed(HttpClient.HttpClient, client),
    credentials(config),
    IcebergProtocol,
  );
  return Effect.runPromise(Effect.result(effect.pipe(Effect.provide(layer)))).then((result) => ({
    result,
    requests,
  }));
};

describe("baseUrlFor", () => {
  test("adds /v1 and the warehouse prefix to catalog routes", () => {
    expect(baseUrlFor({ uri: "https://c.test/", prefix: "/wh/" }, "/namespaces")).toBe(
      "https://c.test/v1/wh",
    );
  });

  test("leaves /config unprefixed — it is how a client learns the prefix", () => {
    expect(baseUrlFor({ uri: "https://c.test", prefix: "wh" }, "/config")).toBe(
      "https://c.test/v1",
    );
  });

  test("serves catalogs without a prefix from /v1", () => {
    expect(baseUrlFor({ uri: "https://c.test" }, "/namespaces")).toBe("https://c.test/v1");
  });
});

describe("IcebergProtocol", () => {
  test("routes through the prefix and sends the bearer token", async () => {
    const { result, requests } = await run(listTables({ namespace: "analytics" }), () =>
      json(200, { identifiers: [{ namespace: ["analytics"], name: "events" }] }),
    );
    expect(result._tag).toBe("Success");
    expect(requests[0]!.url).toBe(
      "https://catalog.test/acct/bucket/v1/wh-1/namespaces/analytics/tables",
    );
    expect(requests[0]!.headers.authorization).toBe("Bearer t0k");
  });

  test("omits Authorization when no token is configured", async () => {
    const { requests } = await run(
      getConfig({}),
      () => json(200, { defaults: {}, overrides: {} }),
      {
        uri: "http://localhost:8181",
      },
    );
    expect(requests[0]!.url).toBe("http://localhost:8181/v1/config");
    expect(requests[0]!.headers.authorization).toBeUndefined();
  });

  test("dispatches a 404 on error.type, not on status alone", async () => {
    const missingTable = await run(loadTable({ namespace: "a", table: "b" }), () =>
      icebergError(404, "NoSuchTableException"),
    );
    expect(missingTable.result._tag === "Failure" && missingTable.result.failure).toBeInstanceOf(
      NoSuchTableException,
    );

    const missingNamespace = await run(listTables({ namespace: "a" }), () =>
      icebergError(404, "NoSuchNamespaceException"),
    );
    expect(
      missingNamespace.result._tag === "Failure" && missingNamespace.result.failure,
    ).toBeInstanceOf(NoSuchNamespaceException);
  });

  test("matches a catalog's own spelling of an exception at the same status", async () => {
    // Cloudflare Basin Catalog's 404 for a missing table.
    const { result } = await run(loadTable({ namespace: "a", table: "b" }), () =>
      icebergError(404, "TableActionForbidden"),
    );
    expect(result._tag === "Failure" && result.failure).toBeInstanceOf(NoSuchTableException);
  });

  test("a 403 stays Forbidden even when the catalog means 'not found or forbidden'", async () => {
    const { result } = await run(
      updateTable({ namespace: "a", table: "b", requirements: [], updates: [] }),
      () => icebergError(403, "TableActionForbidden"),
    );
    expect(result._tag === "Failure" && result.failure).toBeInstanceOf(Forbidden);
  });

  test("an undocumented error.type falls back to the shared status class", async () => {
    const { result } = await run(loadTable({ namespace: "a", table: "b" }), () =>
      icebergError(404, "NoSuchNamespaceException"),
    );
    expect(result._tag === "Failure" && result.failure).toBeInstanceOf(NotFound);
  });

  test("a bodiless HEAD 404 is NotFound", async () => {
    const { result } = await run(
      tableExists({ namespace: "a", table: "b" }),
      () => new Response(null, { status: 404 }),
    );
    expect(result._tag === "Failure" && result.failure).toBeInstanceOf(NotFound);
  });

  test("419 is AuthenticationTimeout", async () => {
    const { result } = await run(loadTable({ namespace: "a", table: "b" }), () =>
      icebergError(419, "AuthenticationTimeoutException"),
    );
    expect(result._tag === "Failure" && result.failure).toBeInstanceOf(AuthenticationTimeout);
  });

  test("a commit with an unknown outcome surfaces once and is never retried", async () => {
    const { result, requests } = await run(
      updateTable({ namespace: "a", table: "b", requirements: [], updates: [] }),
      () => icebergError(502, "BadGatewayException"),
    );
    expect(result._tag === "Failure" && result.failure).toBeInstanceOf(CommitStateUnknownException);
    expect(requests).toHaveLength(1);
  });

  test("a read's 5xx stays transient", async () => {
    let calls = 0;
    const { result } = await run(loadTable({ namespace: "a", table: "b" }), () =>
      ++calls === 1
        ? icebergError(503, "SlowDownException")
        : json(200, {
            metadata: { "format-version": 2, "table-uuid": "u", "current-schema-id": 0 },
          }),
    );
    expect(result._tag).toBe("Success");
    expect(calls).toBe(2);
  });
});

describe("fromCatalogConfig", () => {
  const resolve = (respond: (request: Recorded) => Response) => {
    const { client, requests } = makeClient(respond);
    const layer = fromCatalogConfig({
      uri: "https://catalog.test/acct/bucket",
      warehouse: "acct_bucket",
      token: Redacted.make("t0k"),
    }).pipe(Layer.provide(Layer.succeed(HttpClient.HttpClient, client)));
    return { layer, requests };
  };

  test("reads the prefix (and a redirected uri) from the warehouse config", async () => {
    const { layer, requests } = resolve(() =>
      json(200, { defaults: {}, overrides: { prefix: "p-9", uri: "https://other.test" } }),
    );
    const config = await Effect.runPromise(
      Effect.gen(function* () {
        const { Credentials } = yield* Effect.promise(() => import("./credentials.ts"));
        return yield* yield* Credentials;
      }).pipe(Effect.provide(layer)),
    );
    expect(requests[0]!.url).toBe(
      "https://catalog.test/acct/bucket/v1/config?warehouse=acct_bucket",
    );
    expect(requests[0]!.headers.authorization).toBe("Bearer t0k");
    expect(config).toMatchObject({ uri: "https://other.test", prefix: "p-9" });
  });

  test("fails with ConfigError carrying the catalog's message", async () => {
    const { layer } = resolve(() => icebergError(404, "NoSuchWarehouseException"));
    const exit = await Effect.runPromise(Effect.result(Layer.build(layer).pipe(Effect.scoped)));
    expect(exit._tag).toBe("Failure");
    expect(exit._tag === "Failure" && exit.failure.message).toContain(
      "NoSuchWarehouseException happened",
    );
  });
});
