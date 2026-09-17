import { describe, expect, test, spyOn } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { fromApiKey } from "./credentials.ts";
import * as Neon from "./services/neon.ts";
import { Retry } from "./retry.ts";

const scope = { project_id: "project-fixture", branch_id: "br-fixture" };
const harness = (
  respond: (request: HttpClientRequest.HttpClientRequest) => Response,
) =>
  Layer.mergeAll(
    fromApiKey({ apiKey: "fixture-account-secret" }),
    Layer.succeed(Retry, { while: () => false }),
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() =>
          HttpClientResponse.fromWeb(request, respond(request)),
        ),
      ),
    ),
  );

const secret = {
  token_id: "nak_fixture",
  token_id_short: "fixture",
  api_token: "fixture-api-secret",
  s3_secret_access_key: "fixture-s3-secret",
  scopes: ["storage:read"],
  branch_id: scope.branch_id,
  principal_type: "user",
  created_at: "2026-09-17T00:00:00Z",
};

const deployment = {
  id: 7,
  status: "completed",
  memory_mib: 256,
  runtime: "nodejs24",
  created_at: "2026-09-17T00:00:00Z",
  environment: ["SECRET"],
};

const roundTrip = <A>(codec: Schema.Codec<A>, value: A): A =>
  Schema.encodeSync(codec)(Schema.decodeUnknownSync(codec)(value));

describe("Neon backend wire contracts", () => {
  test("hard_delete remains an optional query parameter, never a body field", async () => {
    for (const hard_delete of [true, false, undefined]) {
      await Effect.runPromise(
        Neon.deleteProjectBranch({ ...scope, hard_delete }).pipe(
          Effect.provide(
            harness((request) => {
              expect(request.method).toBe("DELETE");
              expect(new URL(request.url).searchParams.get("hard_delete")).toBe(
                hard_delete === undefined ? null : String(hard_delete),
              );
              expect(request.body._tag).toBe("Empty");
              return Response.json({
                branch: { id: scope.branch_id },
                operations: [],
              });
            }),
          ),
        ),
      );
    }
  });

  test("sensitive environment codecs validate and encode plain or redacted strings", () => {
    const plain = JSON.stringify({ SECRET: "fixture-env-secret" });
    const redacted = Redacted.make(plain);
    for (const environment of [plain, redacted]) {
      const input = { ...scope, slug: "fixture", environment };
      const output = roundTrip(
        Neon.CreateProjectBranchFunctionDeploymentRequest,
        input,
      );
      expect(output.environment).toBe(environment);
    }
    const decode = Schema.decodeUnknownSync(
      Neon.CreateProjectBranchFunctionDeploymentRequest,
    );
    expect(() =>
      decode({ ...scope, slug: "fixture", environment: Redacted.make(123) }),
    ).toThrow();
    expect(() =>
      decode({ ...scope, slug: "fixture", environment: 123 }),
    ).toThrow();
    expect(() =>
      Schema.encodeSync(
        Schema.toCodecJson(Neon.CreateProjectBranchFunctionDeploymentRequest),
      )({ ...scope, slug: "fixture", environment: redacted }),
    ).toThrow();
  });

  test("returned credential and presign codecs preserve redaction when validating and encoding", async () => {
    const layer = harness(() => Response.json(secret));
    const issued = await Effect.runPromise(
      Neon.createCredential({
        ...scope,
        principal_type: "user",
        scopes: ["storage:read"],
      }).pipe(Effect.provide(layer)),
    );
    const revealed = await Effect.runPromise(
      Neon.revealCredential({ ...scope, token_id: secret.token_id }).pipe(
        Effect.provide(layer),
      ),
    );
    const rotated = await Effect.runPromise(
      Neon.rotateCredential({ ...scope, token_id: secret.token_id }).pipe(
        Effect.provide(layer),
      ),
    );
    for (const value of [
      roundTrip(Neon.CreateCredentialResponse, issued),
      roundTrip(Neon.CredentialSecret, revealed),
      roundTrip(Neon.RotateCredentialResponse, rotated),
    ]) {
      expect(Redacted.isRedacted(value.api_token)).toBe(true);
      expect(Redacted.isRedacted(value.s3_secret_access_key)).toBe(true);
      expect(JSON.stringify(value)).not.toContain("fixture-api-secret");
      expect(JSON.stringify(value)).not.toContain("fixture-s3-secret");
    }
    const presign = await Effect.runPromise(
      Neon.presignProjectBranchBucketObject({
        ...scope,
        bucket_name: "fixture",
        object_key: "file.bin",
        operation: "upload",
      }).pipe(
        Effect.provide(
          harness(() =>
            Response.json({
              url: "https://fixture.test/?signature=fixture-secret",
              method: "PUT",
              headers: {},
              expires_at: "2026-09-17T00:15:00Z",
            }),
          ),
        ),
      ),
    );
    const encoded = roundTrip(Neon.PresignResponse, presign);
    expect(Redacted.isRedacted(encoded.url)).toBe(true);
    expect(JSON.stringify(encoded)).not.toContain("fixture-secret");
    expect(() =>
      Schema.encodeSync(Schema.toCodecJson(Neon.PresignResponse))(presign),
    ).toThrow();
    expect(() =>
      Schema.decodeUnknownSync(Neon.CredentialSecret)({
        ...revealed,
        api_token: Redacted.make(123),
      }),
    ).toThrow();
    expect(() =>
      Schema.decodeUnknownSync(Neon.PresignResponse)({
        ...presign,
        url: Redacted.make(123),
      }),
    ).toThrow();
  });

  test("ZIP bytes and one JSON environment string survive the generated operation", async () => {
    const zip = new File([new Uint8Array([80, 75, 0, 255])], "bundle.zip", {
      type: "application/zip",
    });
    const environment = JSON.stringify({
      SECRET: "fixture-env-secret",
      REMOVE: "",
    });
    let form: FormData | undefined;
    const result = await Effect.runPromise(
      Neon.createProjectBranchFunctionDeployment({
        ...scope,
        slug: "fixture",
        zip,
        environment: Redacted.make(environment),
      }).pipe(
        Effect.provide(
          harness((request) => {
            expect(request.headers.authorization).toBe(
              "Bearer fixture-account-secret",
            );
            if (request.body._tag !== "FormData")
              throw new Error("Expected multipart");
            form = request.body.formData;
            expect(form.getAll("environment")).toEqual([environment]);
            expect((form.get("zip") as File).name).toBe("bundle.zip");
            return Response.json({ deployment });
          }),
        ),
      ),
    );
    expect(
      new Uint8Array(await (form!.get("zip") as File).arrayBuffer()),
    ).toEqual(new Uint8Array([80, 75, 0, 255]));
    expect(result.deployment.id).toBe(7);
    expect(result.deployment.environment).toEqual(["SECRET"]);
  });

  test("config-only deployment omits ZIP and preserves empty deletion values", async () => {
    await Effect.runPromise(
      Neon.createProjectBranchFunctionDeployment({
        ...scope,
        slug: "fixture",
        environment: JSON.stringify({ REMOVE: "" }),
      }).pipe(
        Effect.provide(
          harness((request) => {
            if (request.body._tag !== "FormData")
              throw new Error("Expected multipart");
            expect(request.body.formData.has("zip")).toBe(false);
            expect(request.body.formData.getAll("environment")).toEqual([
              '{"REMOVE":""}',
            ]);
            return Response.json({ deployment });
          }),
        ),
      ),
    );
  });

  test("declared Function and Trigger not-found errors retain their typed class", async () => {
    const functionMessage = "function not visible on branch";
    const functionError = await Effect.runPromise(
      Neon.getProjectBranchFunction({ ...scope, slug: "missing" }).pipe(
        Effect.flip,
        Effect.provide(
          harness(() =>
            Response.json({ message: functionMessage }, { status: 404 }),
          ),
        ),
      ),
    );
    expect(functionError).toBeInstanceOf(Neon.NotFound);
    expect(functionError.message).toBe(functionMessage);

    const triggerMessage = "function trigger not visible on branch";
    const triggerError = await Effect.runPromise(
      Neon.getProjectBranchTrigger({ ...scope, trigger_id: "missing" }).pipe(
        Effect.flip,
        Effect.provide(
          harness(() =>
            Response.json({ message: triggerMessage }, { status: 404 }),
          ),
        ),
      ),
    );
    expect(triggerError).toBeInstanceOf(Neon.NotFound);
    expect(triggerError.message).toBe(triggerMessage);
  });

  test("nullable Function/deployment fields validate without inventing values", () => {
    const empty = Schema.decodeUnknownSync(Neon.NeonFunction)({
      id: "fixture",
      slug: "fixture",
      name: "fixture",
      invocation_url: "",
      created_at: "2026-09-17T00:00:00Z",
      current_deployment: null,
      active_deployment: null,
    });
    expect(empty.current_deployment).toBeNull();
    expect(empty.active_deployment).toBeNull();
    const pending = Schema.decodeUnknownSync(Neon.NeonFunctionDeployment)({
      ...deployment,
      status: "pending",
      environment: null,
      error: null,
    });
    expect(pending.error).toBeNull();
    expect(pending.environment).toBeNull();
  });

  test("issue, reveal and rotate redact both credential secrets", async () => {
    const layer = harness(() => Response.json(secret));
    for (const operation of [
      Neon.createCredential({
        ...scope,
        principal_type: "user",
        scopes: ["storage:read"],
      }),
      Neon.revealCredential({ ...scope, token_id: secret.token_id }),
      Neon.rotateCredential({ ...scope, token_id: secret.token_id }),
    ]) {
      const result = await Effect.runPromise(
        operation.pipe(Effect.provide(layer)),
      );
      expect(Redacted.isRedacted(result.api_token)).toBe(true);
      expect(Redacted.isRedacted(result.s3_secret_access_key)).toBe(true);
      expect(JSON.stringify(result)).not.toContain("fixture-api-secret");
      expect(JSON.stringify(result)).not.toContain("fixture-s3-secret");
    }
  });

  test("binary downloads preserve invalid UTF-8 and nested object keys", async () => {
    const bytes = new Uint8Array([0, 255, 128, 80, 75]);
    const result = await Effect.runPromise(
      Neon.getProjectBranchBucketObject({
        ...scope,
        bucket_name: "fixture",
        object_key: "nested/file.bin",
      }).pipe(
        Effect.provide(
          harness((request) => {
            expect(request.url).toContain("nested%2Ffile.bin/download");
            return new Response(bytes, {
              headers: { "content-type": "application/octet-stream" },
            });
          }),
        ),
      ),
    );
    expect(result).toEqual(bytes);
  });

  test("download redirects preserve bytes without forwarding account credentials across origins", async () => {
    const bytes = new Uint8Array([0, 255, 128, 80, 75]);
    let authorization: string | null | undefined;
    const storage = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      fetch(request) {
        authorization = request.headers.get("authorization");
        return new Response(bytes, {
          headers: { "content-type": "application/octet-stream" },
        });
      },
    });
    const api = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      fetch() {
        return Response.redirect(storage.url, 302);
      },
    });
    try {
      const result = await Effect.runPromise(
        Neon.getProjectBranchBucketObject({
          ...scope,
          bucket_name: "fixture",
          object_key: "file.bin",
        }).pipe(
          Effect.timeout("5 seconds"),
          Effect.provide(
            Layer.mergeAll(
              fromApiKey({
                apiKey: "fixture-account-secret",
                apiBaseUrl: api.url.origin,
              }),
              FetchHttpClient.layer,
              Layer.succeed(Retry, { while: () => false }),
            ),
          ),
        ),
      );
      expect(result).toEqual(bytes);
      expect(authorization).toBeNull();
    } finally {
      await api.stop(true);
      await storage.stop(true);
    }
  });

  test("bodyless trigger deletion decodes 204", async () => {
    await Effect.runPromise(
      Neon.deleteProjectBranchTrigger({
        ...scope,
        trigger_id: "tr-fixture",
      }).pipe(
        Effect.provide(
          harness((request) => {
            expect(request.method).toBe("DELETE");
            expect(request.body._tag).toBe("Empty");
            return new Response(null, { status: 204 });
          }),
        ),
      ),
    );
  });

  test("function pagination terminates at an empty cursor", async () => {
    let calls = 0;
    const pages = await Effect.runPromise(
      Neon.listProjectBranchFunctions.pages({ ...scope, limit: 1 }).pipe(
        Stream.runCollect,
        Effect.provide(
          harness((request) => {
            calls++;
            expect(calls).toBeLessThanOrEqual(2);
            if (calls === 2) expect(request.url).toContain("cursor=next");
            return Response.json({
              functions: [],
              pagination: { next: calls === 1 ? "next" : "" },
            });
          }),
        ),
      ),
    );
    expect(pages).toHaveLength(2);
    expect(calls).toBe(2);
  });

  test("debug diagnostics never emit request or response secrets", async () => {
    const previous = process.env.DISTILLED_DEBUG_HTTP;
    const logs: string[] = [];
    const spy = spyOn(console, "error").mockImplementation((...args) => {
      logs.push(args.join(" "));
    });
    process.env.DISTILLED_DEBUG_HTTP = "1";
    try {
      await Effect.runPromise(
        Neon.createCredential({
          ...scope,
          principal_type: "user",
          scopes: ["storage:read"],
          name: "private-label",
        }).pipe(Effect.provide(harness(() => Response.json(secret)))),
      );
      expect(logs.length).toBeGreaterThan(0);
      const text = logs.join("\n");
      for (const value of [
        "fixture-account-secret",
        "fixture-api-secret",
        "fixture-s3-secret",
        "private-label",
      ])
        expect(text).not.toContain(value);
    } finally {
      spy.mockRestore();
      if (previous === undefined) delete process.env.DISTILLED_DEBUG_HTTP;
      else process.env.DISTILLED_DEBUG_HTTP = previous;
    }
  });
});

describe("Neon trigger schemas", () => {
  test("both discriminated forms validate and mismatches fail", () => {
    const decode = Schema.decodeUnknownSync(Neon.TriggerCreateRequest);
    expect(
      decode({
        type: "schedule",
        function_slug: "fixture",
        name: "daily",
        schedule: { cron: "0 0 * * *" },
      }).type,
    ).toBe("schedule");
    expect(
      decode({
        type: "storage_object_created",
        function_slug: "fixture",
        name: "uploads",
        storage_object_created: { bucket_name: "uploads", prefix: "incoming/" },
      }).type,
    ).toBe("storage_object_created");
    expect(() =>
      decode({
        type: "schedule",
        function_slug: "fixture",
        name: "wrong",
        storage_object_created: { bucket_name: "uploads" },
      }),
    ).toThrow();
    expect(() =>
      decode({
        type: "unsupported",
        function_slug: "fixture",
        name: "wrong",
        schedule: { cron: "0 0 * * *" },
      }),
    ).toThrow();
  });

  test("disabled and inherited schedules accept a null next occurrence", () => {
    const trigger = Schema.decodeUnknownSync(Neon.Trigger)({
      type: "schedule",
      trigger_id: "tr-fixture",
      function_slug: "fixture",
      name: "daily",
      function_path: "/",
      schedule: { cron: "0 0 * * *" },
      enabled: false,
      version: 1,
      next_run_at: null,
      inherited: true,
    });
    expect(trigger.type).toBe("schedule");
  });
});
