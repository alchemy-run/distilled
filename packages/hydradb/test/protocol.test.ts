import { ResponseValidation } from "@distilled.cloud/core";
import * as HydraDB from "@distilled.cloud/hydradb";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";

interface Recorded {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  /** The JSON body as text, or the multipart form. */
  readonly body: string | FormData | undefined;
}

const record = (request: Parameters<Parameters<typeof HttpClient.make>[0]>[0]): Recorded => ({
  method: request.method,
  url: request.url,
  headers: { ...request.headers },
  body:
    request.body._tag === "FormData"
      ? request.body.formData
      : request.body._tag === "Uint8Array"
        ? new TextDecoder().decode(request.body.body)
        : undefined,
});

const run = <A, E>(
  effect: Effect.Effect<A, E, HydraDB.HydraDBOpContext>,
  respond: (request: Recorded) => Response,
  credentials: Layer.Layer<HydraDB.Credentials> = HydraDB.credentials({
    apiKey: Redacted.make("hdb-test-key"),
  }),
) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const recorded = record(request);
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded));
    }),
  );
  return Effect.runPromise(
    effect.pipe(
      HydraDB.Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          credentials,
          HydraDB.HydraDBProtocol,
        ),
      ),
      Effect.result,
    ),
  ).then((result) => ({ result, requests }));
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const meta = { request_id: "9d13aef4-02f4-4e73-8c62-4c2601d04f9d", latency_ms: 12.3 };
const envelope = (data: unknown) => ({ success: true, data, error: null, meta });
const failure = (code: string, message: string) => ({
  success: false,
  data: null,
  error: { code, message },
  detail: { error_code: code, message },
  meta,
});

describe("requests", () => {
  test("send the bearer key and API-Version: 2 to the default origin", async () => {
    const { result, requests } = await run(
      HydraDB.getDatabaseStatus({ database: "acme_corp" }),
      () => json(200, envelope({ database: "acme_corp", infra: { ready_for_ingestion: true } })),
    );
    expect(result._tag).toBe("Success");
    expect(requests[0]!.method).toBe("GET");
    expect(requests[0]!.url).toBe("https://api.hydradb.com/databases/status?database=acme_corp");
    expect(requests[0]!.headers["authorization"]).toBe("Bearer hdb-test-key");
    expect(requests[0]!.headers["api-version"]).toBe("2");
  });

  test("go to a configured origin, for an on-premises or self-hosted deployment", async () => {
    const { result, requests } = await run(
      HydraDB.listDatabases({}),
      () => json(200, envelope({ databases: ["acme_corp"] })),
      HydraDB.credentials({
        apiKey: Redacted.make("hdb-test-key"),
        apiBaseUrl: "https://hydradb.internal.example:8443/",
      }),
    );
    expect(result._tag).toBe("Success");
    expect(requests[0]!.url).toBe("https://hydradb.internal.example:8443/databases");
    expect(requests[0]!.headers["authorization"]).toBe("Bearer hdb-test-key");
  });

  test("CredentialsFromEnv reads HYDRADB_API_KEY and HYDRADB_API_URL", async () => {
    const saved = { key: process.env.HYDRADB_API_KEY, url: process.env.HYDRADB_API_URL };
    process.env.HYDRADB_API_KEY = "hdb-env-key";
    process.env.HYDRADB_API_URL = "https://hydradb.selfhosted.example";
    try {
      const { requests } = await run(
        HydraDB.listDatabases({}),
        () => json(200, envelope({ databases: [] })),
        HydraDB.CredentialsFromEnv,
      );
      expect(requests[0]!.url).toBe("https://hydradb.selfhosted.example/databases");
      expect(requests[0]!.headers["authorization"]).toBe("Bearer hdb-env-key");
    } finally {
      for (const [name, value] of [
        ["HYDRADB_API_KEY", saved.key],
        ["HYDRADB_API_URL", saved.url],
      ] as const) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
  });

  test("CredentialsFromEnv without HYDRADB_API_KEY fails with ConfigError", async () => {
    const saved = process.env.HYDRADB_API_KEY;
    delete process.env.HYDRADB_API_KEY;
    try {
      const { result, requests } = await run(
        HydraDB.listDatabases({}),
        () => json(200, envelope({ databases: [] })),
        HydraDB.CredentialsFromEnv,
      );
      expect(requests).toHaveLength(0);
      expect(result._tag).toBe("Failure");
      if (result._tag !== "Failure") return;
      expect(result.failure._tag).toBe("ConfigError");
    } finally {
      if (saved !== undefined) process.env.HYDRADB_API_KEY = saved;
    }
  });

  test("a JSON body keeps the wire's snake_case names", async () => {
    const { requests } = await run(
      HydraDB.query({
        database: "acme_corp",
        collection: "team_docs",
        query: "pricing tiers",
        type: "knowledge",
        query_by: "hybrid",
        max_results: 5,
      }),
      () => json(200, envelope({ chunks: [] })),
    );
    expect(requests[0]!.method).toBe("POST");
    expect(requests[0]!.url).toBe("https://api.hydradb.com/query");
    expect(requests[0]!.headers["content-type"]).toContain("application/json");
    expect(JSON.parse(requests[0]!.body as string)).toEqual({
      database: "acme_corp",
      collection: "team_docs",
      query: "pricing tiers",
      type: "knowledge",
      query_by: "hybrid",
      max_results: 5,
    });
  });

  test("deleteContext sends X-HydraDB-Delete-Status", async () => {
    const { requests } = await run(
      HydraDB.deleteContext({
        database: "acme_corp",
        ids: ["HydraDoc1234"],
        xHydraDBDeleteStatus: "strict",
      }),
      () => json(200, envelope({ deleted_count: 1, results: [] })),
    );
    expect(requests[0]!.method).toBe("DELETE");
    expect(requests[0]!.headers["x-hydradb-delete-status"]).toBe("strict");
    expect(JSON.parse(requests[0]!.body as string)).toMatchObject({
      database: "acme_corp",
      ids: ["HydraDoc1234"],
    });
  });

  test("ingestContext is multipart/form-data with each field as its own part", async () => {
    const memories = JSON.stringify([
      { id: "alex_pref_001", text: "Alex prefers concise answers." },
    ]);
    const appKnowledge = JSON.stringify([{ id: "slack_1", kind: "message", fields: {} }]);
    const document = new Blob(["Pricing: Starter, Pro, Enterprise."], { type: "text/plain" });
    const { result, requests } = await run(
      HydraDB.ingestContext({
        database: "acme_corp",
        collection: "user_alex",
        type: "memory",
        memories,
        app_knowledge: appKnowledge,
        upsert: "true",
        documents: [document],
      }),
      () =>
        json(
          202,
          envelope({ success: true, success_count: 1, failed_count: 0, results: [{ id: "a" }] }),
        ),
    );
    expect(result._tag).toBe("Success");
    expect(requests[0]!.url).toBe("https://api.hydradb.com/context/ingest");
    const form = requests[0]!.body;
    if (!(form instanceof FormData)) throw new Error("expected a multipart body");
    expect(form.get("database")).toBe("acme_corp");
    expect(form.get("collection")).toBe("user_alex");
    expect(form.get("type")).toBe("memory");
    expect(form.get("memories")).toBe(memories);
    expect(form.get("app_knowledge")).toBe(appKnowledge);
    expect(form.get("upsert")).toBe("true");
    const part = form.get("documents");
    expect(part).toBeInstanceOf(Blob);
    expect(await (part as Blob).text()).toBe("Pricing: Starter, Pro, Enterprise.");
    const wire = new Request(requests[0]!.url, { method: "POST", body: form });
    expect(wire.headers.get("content-type")).toContain("multipart/form-data; boundary=");
  });

  test("ingestContext sends each document under `documents` with its filename", async () => {
    const { result, requests } = await run(
      HydraDB.ingestContext({
        database: "acme_corp",
        type: "knowledge",
        document_metadata: JSON.stringify([{ title: "Policy" }, { title: "Notes" }]),
        documents: [
          new File(["%PDF-1.7 policy"], "policy.pdf", { type: "application/pdf" }),
          new File(["meeting notes"], "notes.txt", { type: "text/plain" }),
        ],
      }),
      () => json(202, envelope({ success: true, success_count: 2, failed_count: 0, results: [] })),
    );
    expect(result._tag).toBe("Success");
    const form = requests[0]!.body;
    if (!(form instanceof FormData)) throw new Error("expected a multipart body");
    const documents = await Promise.all(
      form.getAll("documents").map(async (part) => {
        if (!(part instanceof File)) throw new Error("expected a file part");
        return { filename: part.name, text: await part.text() };
      }),
    );
    expect(documents).toEqual([
      { filename: "policy.pdf", text: "%PDF-1.7 policy" },
      { filename: "notes.txt", text: "meeting notes" },
    ]);
    expect(form.has("policy.pdf")).toBe(false);
    expect(form.has("notes.txt")).toBe(false);
  });
});

describe("responses", () => {
  test("the { success, data, error, meta } envelope comes back as its data", async () => {
    const { result } = await run(HydraDB.getDatabaseStatus({ database: "acme_corp" }), () =>
      json(200, envelope({ database: "acme_corp", infra: { ready_for_ingestion: true } })),
    );
    expect(result._tag).toBe("Success");
    if (result._tag !== "Success") return;
    expect(result.success).toEqual({ database: "acme_corp", infra: { ready_for_ingestion: true } });
  });

  test("the unwrapped data passes strict response validation", async () => {
    const { result } = await run(
      HydraDB.getDatabaseStatus({ database: "acme_corp" }).pipe(
        Effect.provide(ResponseValidation.strict),
      ),
      () => json(200, envelope({ database: "acme_corp", infra: { ready_for_ingestion: false } })),
    );
    expect(result._tag).toBe("Success");
  });

  test("connector bodies have no envelope and come back as sent", async () => {
    const body = {
      connectors: [{ connector_id: "conn_1", provider: "slack", status: "active" }],
      connector_limit: 10,
    };
    const { result, requests } = await run(HydraDB.listConnectors({}), () => json(200, body));
    expect(requests[0]!.url).toBe("https://api.hydradb.com/connectors");
    expect(result._tag).toBe("Success");
    if (result._tag !== "Success") return;
    expect(result.success).toEqual(body);
  });

  test("a bare body with its own meta and data keys is not unwrapped", async () => {
    const body = { connector_id: "conn_1", configured: 2, meta: { warnings: [] }, data: "x" };
    const { result } = await run(HydraDB.configureConnector({ id: "conn_1", resources: [] }), () =>
      json(200, body),
    );
    expect(result._tag).toBe("Success");
    if (result._tag !== "Success") return;
    expect(result.success).toEqual(body);
  });

  test("updateMetadataSchema comes back without an envelope", async () => {
    const body = { database: "acme_corp", added_fields: ["region"] };
    const { result, requests } = await run(
      HydraDB.updateMetadataSchema({
        database: "acme_corp",
        add_fields: [{ name: "region", data_type: "string" }],
      }),
      () => json(200, body),
    );
    expect(requests[0]!.method).toBe("PATCH");
    expect(requests[0]!.url).toBe("https://api.hydradb.com/databases/acme_corp/metadata-schema");
    expect(result._tag).toBe("Success");
    if (result._tag !== "Success") return;
    expect(result.success).toEqual(body);
  });

  test("a webhook signing secret comes back Redacted", async () => {
    const { result } = await run(HydraDB.setWebhookSigningSecret({}), () =>
      json(200, envelope({ signing_secret: "whsec_0123456789abcdef" })),
    );
    expect(result._tag).toBe("Success");
    if (result._tag !== "Success") return;
    const secret = result.success.signing_secret;
    expect(Redacted.isRedacted(secret)).toBe(true);
    expect(Redacted.value(secret as Redacted.Redacted<string>)).toBe("whsec_0123456789abcdef");
  });
});

describe("errors", () => {
  const failed = async <A, E>(
    effect: Effect.Effect<A, E, HydraDB.HydraDBOpContext>,
    response: Response,
  ) => {
    const { result } = await run(effect, () => response);
    if (result._tag !== "Failure") throw new Error("expected a failure");
    return result.failure as { _tag: string } & Record<string, unknown>;
  };

  test("a 404 with another code falls back to core's NotFound with the envelope message", async () => {
    const error = await failed(
      HydraDB.getDatabaseStatus({ database: "acme_corp" }),
      json(404, failure("NOT_FOUND", "Collection not found")),
    );
    expect(error._tag).toBe("NotFound");
    expect(error.message).toBe("Collection not found");
  });

  test("a 400 INVALID_INPUT is core's BadRequest with the envelope message", async () => {
    const error = await failed(
      HydraDB.listContext({ database: "acme_corp", page_size: 1000 }),
      json(400, failure("INVALID_INPUT", "page_size must be between 1 and 100")),
    );
    expect(error._tag).toBe("BadRequest");
    expect(error.message).toBe("page_size must be between 1 and 100");
  });

  test("a 413 on ingestContext is ContentTooLarge", async () => {
    const error = await failed(
      HydraDB.ingestContext({ database: "acme_corp", type: "knowledge" }),
      json(413, failure("PAYLOAD_TOO_LARGE", "Upload too large")),
    );
    expect(error._tag).toBe("ContentTooLarge");
  });

  test("a connector failure keeps the shared envelope", async () => {
    const error = await failed(
      HydraDB.getConnector({ id: "conn_missing" }),
      json(404, failure("NOT_FOUND", "Connector not found")),
    );
    expect(error._tag).toBe("NotFound");
    expect(error.message).toBe("Connector not found");
  });

  test("a 500 is core's InternalServerError", async () => {
    const error = await failed(
      HydraDB.listDatabases({}),
      json(500, failure("INTERNAL_ERROR", "Internal error")),
    );
    expect(error._tag).toBe("InternalServerError");
  });

  test("an unmapped status is UnknownHydraDBError with the code and the request id", async () => {
    const body = failure("TEAPOT", "I'm a teapot");
    const error = await failed(HydraDB.listDatabases({}), json(418, body));
    expect(error._tag).toBe("UnknownHydraDBError");
    expect(error.status).toBe(418);
    expect(error.code).toBe("TEAPOT");
    expect(error.message).toBe("I'm a teapot");
    expect((error.body as typeof body).meta.request_id).toBe(meta.request_id);
  });

  test("a non-JSON failure keeps its text as the message", async () => {
    const error = await failed(
      HydraDB.listDatabases({}),
      new Response("upstream timed out", { status: 418 }),
    );
    expect(error._tag).toBe("UnknownHydraDBError");
    expect(error.message).toBe("upstream timed out");
  });
});
