import { expect, test, spyOn } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { fromApiKey } from "./credentials.ts";
import { Retry } from "./retry.ts";
import * as Neon from "./services/neon.ts";

type Assert<T extends true> = T;
type SensitiveKeys = Assert<
  [
    Neon.CreateOrgApiKeyResponse["key"],
    Neon.ApiKeyCreateResponse["key"],
  ] extends [
    string | Redacted.Redacted<string>,
    string | Redacted.Redacted<string>,
  ]
    ? true
    : false
>;
type RedactedKeysAccepted = Assert<
  [Redacted.Redacted<string>, Redacted.Redacted<string>] extends [
    Neon.CreateOrgApiKeyResponse["key"],
    Neon.ApiKeyCreateResponse["key"],
  ]
    ? true
    : false
>;
type InvalidKeyRejected = Assert<
  Redacted.Redacted<number> extends Neon.CreateOrgApiKeyResponse["key"]
    ? false
    : true
>;
type MetadataHasNoSecret = Assert<
  "key" extends keyof Neon.OrgApiKeysListResponseItem ? false : true
>;
type ServiceFreeKeyCodecs = Assert<
  [
    | (typeof Neon.CreateOrgApiKeyResponse)["DecodingServices"]
    | (typeof Neon.CreateOrgApiKeyResponse)["EncodingServices"]
    | (typeof Neon.ApiKeyCreateResponse)["DecodingServices"]
    | (typeof Neon.ApiKeyCreateResponse)["EncodingServices"],
  ] extends [never]
    ? true
    : false
>;

const assertions: [
  SensitiveKeys,
  RedactedKeysAccepted,
  InvalidKeyRejected,
  MetadataHasNoSecret,
  ServiceFreeKeyCodecs,
] = [true, true, true, true, true];

const harness = (
  respond: (request: HttpClientRequest.HttpClientRequest) => Response,
) =>
  Layer.mergeAll(
    fromApiKey({ apiKey: "fixture-deployment-secret" }),
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

const key = {
  id: 123,
  key: "fixture-reveal-once-secret",
  name: "fixture-key",
  created_at: "2026-09-17T00:00:00Z",
  created_by: "fixture-user",
};

test("organization and personal key secret types are covered by the checked SDK project", () => {
  expect(assertions.every(Boolean)).toBe(true);
});

test("organization and personal create operations redact reveal-once keys and preserve codec safety", async () => {
  const personal = await Effect.runPromise(
    Neon.createApiKey({ key_name: key.name }).pipe(
      Effect.provide(harness(() => Response.json(key))),
    ),
  );
  const organization = await Effect.runPromise(
    Neon.createOrgApiKey({
      org_id: "org-fixture",
      project_id: "project-fixture",
      key_name: key.name,
    }).pipe(
      Effect.provide(
        harness((request) => {
          expect(request.method).toBe("POST");
          expect(request.url).toEndWith("/organizations/org-fixture/api_keys");
          expect(request.headers.authorization).toBe(
            "Bearer fixture-deployment-secret",
          );
          if (request.body._tag !== "Uint8Array")
            throw new Error("Expected JSON body");
          expect(
            JSON.parse(new TextDecoder().decode(request.body.body)),
          ).toEqual({
            key_name: key.name,
            project_id: "project-fixture",
          });
          return Response.json({ ...key, project_id: "project-fixture" });
        }),
      ),
    ),
  );
  for (const [codec, value] of [
    [Neon.ApiKeyCreateResponse, personal],
    [Neon.CreateOrgApiKeyResponse, organization],
  ] as const) {
    const validated = Schema.decodeUnknownSync(codec)(value);
    const encoded = Schema.encodeSync(codec)(validated);
    expect(Redacted.isRedacted(encoded.key)).toBe(true);
    expect(JSON.stringify(encoded)).not.toContain(key.key);
    if (!Redacted.isRedacted(encoded.key))
      throw new Error("Expected redacted key");
    expect(Redacted.value(encoded.key)).toBe(key.key);
    expect(() =>
      Schema.encodeSync(Schema.toCodecJson(codec))(validated),
    ).toThrow();
    expect(() =>
      Schema.decodeUnknownSync(codec)({ ...value, key: Redacted.make(123) }),
    ).toThrow();
    expect(() =>
      Schema.decodeUnknownSync(codec)({ ...value, key: 123 }),
    ).toThrow();
  }
});

test("API key debug diagnostics never expose deployment or reveal-once tokens", async () => {
  const previous = process.env.DISTILLED_DEBUG_HTTP;
  const logs: string[] = [];
  const spy = spyOn(console, "error").mockImplementation((...args) => {
    logs.push(args.join(" "));
  });
  process.env.DISTILLED_DEBUG_HTTP = "1";
  try {
    await Effect.runPromise(
      Neon.createOrgApiKey({
        org_id: "org-fixture",
        key_name: key.name,
        project_id: "project-fixture",
      }).pipe(Effect.provide(harness(() => Response.json(key)))),
    );
    expect(logs.length).toBeGreaterThan(0);
    expect(logs.join("\n")).not.toContain(key.key);
    expect(logs.join("\n")).not.toContain("fixture-deployment-secret");
  } finally {
    spy.mockRestore();
    if (previous === undefined) delete process.env.DISTILLED_DEBUG_HTTP;
    else process.env.DISTILLED_DEBUG_HTTP = previous;
  }
});

test("organization key list is an unpaginated metadata array and revoke uses the numeric ID", async () => {
  const metadata = {
    id: key.id,
    name: key.name,
    created_at: key.created_at,
    created_by: { id: key.created_by, name: "Fixture User", image: "" },
    last_used_from_addr: "",
    project_id: "project-fixture",
  };
  const listed = await Effect.runPromise(
    Neon.listOrgApiKeys({ org_id: "org-fixture" }).pipe(
      Effect.provide(
        harness((request) => {
          expect(request.method).toBe("GET");
          expect(request.url).toEndWith("/organizations/org-fixture/api_keys");
          return Response.json([metadata]);
        }),
      ),
    ),
  );
  expect(listed).toEqual([metadata]);
  await Effect.runPromise(
    Neon.revokeOrgApiKey({ org_id: "org-fixture", key_id: key.id }).pipe(
      Effect.provide(
        harness((request) => {
          expect(request.method).toBe("DELETE");
          expect(request.url).toEndWith(
            "/organizations/org-fixture/api_keys/123",
          );
          expect(request.body._tag).toBe("Empty");
          return Response.json({
            ...metadata,
            created_by: key.created_by,
            revoked: true,
          });
        }),
      ),
    ),
  );
});

test("organization key races surface typed Conflict and NotFound unions", async () => {
  const conflict = await Effect.runPromise(
    Neon.createOrgApiKey({
      org_id: "org-fixture",
      key_name: key.name,
      project_id: "project-fixture",
    }).pipe(
      Effect.provide(
        harness(() => Response.json({ message: "conflict" }, { status: 409 })),
      ),
      Effect.result,
    ),
  );
  const missing = await Effect.runPromise(
    Neon.revokeOrgApiKey({ org_id: "org-fixture", key_id: 123 }).pipe(
      Effect.provide(
        harness(() => Response.json({ message: "not found" }, { status: 404 })),
      ),
      Effect.result,
    ),
  );
  expect(Result.isFailure(conflict) && conflict.failure._tag).toBe("Conflict");
  expect(Result.isFailure(missing) && missing.failure._tag).toBe("NotFound");
});
