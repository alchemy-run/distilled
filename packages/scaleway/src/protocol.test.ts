import * as CoreErrors from "@distilled.cloud/core/errors";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { Credentials, credentials } from "./credentials.ts";
import {
  AlreadyExistsError,
  DeniedAuthenticationError,
  InvalidArgumentsError,
  OutOfStockError,
  PermissionsDeniedError,
  PreconditionFailedError,
  QuotasExceededError,
  ResourceExpiredError,
  ResourceLockedError,
  ResourceNotFoundError,
  ScalewayParseError,
  TransientStateError,
  UnknownScalewayError,
} from "./errors.ts";
import * as Retry from "./retry.ts";
import {
  downloadContractSignature,
  downloadContractSignatureRaw,
} from "./services/account_contract_v3.ts";
import { listEvents } from "./services/audit_trail_v1alpha1.ts";
import { createContainer } from "./services/containers_v1.ts";
import { listModels } from "./services/generative_apis_openai_v1.ts";
import {
  getServer,
  getServerUserData,
  listServers,
  setServerUserData,
} from "./services/instance_v1.ts";
import { listVPCs } from "./services/vpc_v2.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

type Reply = readonly [
  status: number,
  body: string | Uint8Array<ArrayBuffer> | null,
  headers?: Record<string, string>,
];

const json = (status: number, body: unknown, headers: Record<string, string> = {}): Reply => [
  status,
  JSON.stringify(body),
  { "content-type": "application/json", ...headers },
];

/** Fake HTTP client answering each request with the next reply (the last one repeats). */
const fakeScaleway = (...replies: Reply[]) => {
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
        const [status, body, headers] = replies[Math.min(calls.length - 1, replies.length - 1)]!;
        return HttpClientResponse.fromWeb(request, new Response(body, { status, headers }));
      }),
    ),
  );
  return { calls, layer };
};

const creds = (config: { region?: string; zone?: string; apiUrl?: string } = {}) =>
  credentials({ secretKey: Redacted.make("scw-secret"), ...config });

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
) => run(Effect.flip(operation), http);

const serverId = "11111111-2222-3333-4444-555555555555";

describe("request encoding", () => {
  test("sends X-Auth-Token to api.scaleway.com with the zone in the path", async () => {
    const { calls, layer } = fakeScaleway(json(200, { server: { id: serverId } }));
    await run(getServer({ zone: "nl-ams-1", server_id: serverId }), layer);
    expect(calls[0]!.headers["x-auth-token"]).toBe("scw-secret");
    expect(calls[0]!.headers.authorization).toBeUndefined();
    expect(calls[0]!.url.href).toBe(
      `https://api.scaleway.com/instance/v1/zones/nl-ams-1/servers/${serverId}`,
    );
  });

  test("an omitted zone / region comes from the credentials' defaults", async () => {
    const zoned = fakeScaleway(json(200, { server: {} }));
    await run(getServer({ server_id: serverId }), zoned.layer);
    expect(zoned.calls[0]!.url.pathname).toBe(`/instance/v1/zones/fr-par-1/servers/${serverId}`);

    const regional = fakeScaleway(json(200, { vpcs: [], total_count: 0 }));
    await run(listVPCs({}), regional.layer, creds({ region: "pl-waw" }));
    expect(regional.calls[0]!.url.pathname).toBe("/vpc/v2/regions/pl-waw/vpcs");
  });

  test("SCW_API_URL replaces api.scaleway.com", async () => {
    const { calls, layer } = fakeScaleway(json(200, { server: {} }));
    await run(
      getServer({ server_id: serverId }),
      layer,
      creds({ apiUrl: "http://localhost:8080/" }),
    );
    expect(calls[0]!.url.href).toBe(
      `http://localhost:8080/instance/v1/zones/fr-par-1/servers/${serverId}`,
    );
  });

  test("Generative APIs answer on api.scaleway.ai and take a Bearer key", async () => {
    const { calls, layer } = fakeScaleway(json(200, { object: "list", data: [] }));
    await run(listModels({}), layer, creds({ apiUrl: "http://localhost:8080" }));
    expect(calls[0]!.url.href).toBe("https://api.scaleway.ai/v1/models");
    expect(calls[0]!.headers.authorization).toBe("Bearer scw-secret");
  });

  test("resolves credentials per request", async () => {
    const { calls, layer } = fakeScaleway(json(200, { server: {} }));
    let n = 0;
    const rotating = Layer.succeed(
      Credentials,
      Effect.sync(() => ({
        secretKey: Redacted.make(`k${++n}`),
        region: "fr-par",
        zone: n === 1 ? "fr-par-1" : "fr-par-2",
      })),
    );
    await run(getServer({ server_id: serverId }), layer, rotating);
    await run(getServer({ server_id: serverId }), layer, rotating);
    expect(calls.map((c) => [c.headers["x-auth-token"], c.url.pathname.split("/")[4]])).toEqual([
      ["k1", "fr-par-1"],
      ["k2", "fr-par-2"],
    ]);
  });

  test("array queries repeat the key", async () => {
    const { calls, layer } = fakeScaleway(json(200, { vpcs: [], total_count: 0 }));
    await run(listVPCs({ tags: ["a", "b"], page_size: 10 }), layer);
    expect(calls[0]!.url.searchParams.getAll("tags")).toEqual(["a", "b"]);
    expect(calls[0]!.url.searchParams.get("page_size")).toBe("10");
  });

  test("user data is sent and read as text/plain", async () => {
    const put = fakeScaleway([204, null]);
    await run(
      setServerUserData({ server_id: serverId, key: "cloud-init", content: "#cloud-config\n" }),
      put.layer,
    );
    expect(put.calls[0]!.method).toBe("PATCH");
    expect(put.calls[0]!.headers["content-type"]).toBe("text/plain");
    expect(put.calls[0]!.body).toBe("#cloud-config\n");

    // A body that would parse as JSON stays text under a text/plain type.
    const get = fakeScaleway([200, "42", { "content-type": "text/plain" }]);
    expect(await run(getServerUserData({ server_id: serverId, key: "n" }), get.layer)).toBe("42");
  });
});

describe("pagination", () => {
  test("page / total_count: sized by the first page, X-Total-Count folded in", async () => {
    const { calls, layer } = fakeScaleway(
      json(200, { servers: [{ id: "1" }, { id: "2" }] }, { "x-total-count": "5" }),
      json(200, { servers: [{ id: "3" }, { id: "4" }] }, { "x-total-count": "5" }),
      json(200, { servers: [{ id: "5" }] }, { "x-total-count": "5" }),
    );
    const items = await run(Stream.runCollect(listServers.items({ per_page: 2 })), layer);
    expect(Array.from(items).map((s) => s.id)).toEqual(["1", "2", "3", "4", "5"]);
    expect(calls.map((c) => c.url.searchParams.get("page"))).toEqual(["1", "2", "3"]);
  });

  test("page / total_count from the body stops on an empty page", async () => {
    const { calls, layer } = fakeScaleway(
      json(200, { vpcs: [{ id: "a" }], total_count: 10 }),
      json(200, { vpcs: [], total_count: 10 }),
    );
    const pages = await run(Stream.runCollect(listVPCs.pages({})), layer);
    expect(Array.from(pages)).toHaveLength(2);
    expect(calls).toHaveLength(2);
  });

  test("page_token / next_page_token", async () => {
    const { calls, layer } = fakeScaleway(
      json(200, { events: [{ id: "e1" }], next_page_token: "t2" }),
      json(200, { events: [{ id: "e2" }] }),
    );
    const items = await run(
      Stream.runCollect(listEvents.items({ organization_id: serverId })),
      layer,
    );
    expect(Array.from(items).map((e) => e.id)).toEqual(["e1", "e2"]);
    expect(calls.map((c) => c.url.searchParams.get("page_token"))).toEqual([null, "t2"]);
  });
});

describe("{ type, message } failure envelope", () => {
  const cases = [
    [
      400,
      {
        type: "invalid_arguments",
        message: "invalid argument(s)",
        details: [{ argument_name: "name", reason: "constraint", help_message: "too long" }],
      },
      InvalidArgumentsError,
      { details: [{ argument_name: "name", reason: "constraint", help_message: "too long" }] },
    ],
    [
      401,
      { type: "denied_authentication", message: "denied", method: "api_key", reason: "expired" },
      DeniedAuthenticationError,
      { method: "api_key", reason: "expired" },
    ],
    [
      403,
      {
        type: "permissions_denied",
        message: "insufficient permissions",
        details: [{ resource: "instance_server", action: "read" }],
      },
      PermissionsDeniedError,
      { details: [{ resource: "instance_server", action: "read" }] },
    ],
    [
      403,
      {
        type: "quotas_exceeded",
        message: "quota(s) exceeded",
        details: [{ resource: "instances", quota: 10, current: 10 }],
      },
      QuotasExceededError,
      { details: [{ resource: "instances", quota: 10, current: 10 }] },
    ],
    [
      404,
      { type: "not_found", message: "not found", resource: "instance_server", resource_id: "x" },
      ResourceNotFoundError,
      { resource: "instance_server", resource_id: "x" },
    ],
    [
      410,
      { type: "expired", message: "gone", resource: "r", resource_id: "x", expired_since: "2024" },
      ResourceExpiredError,
      { expired_since: "2024" },
    ],
    [
      423,
      { type: "locked", message: "locked", resource: "r", resource_id: "x" },
      ResourceLockedError,
      { resource: "r" },
    ],
    [
      409,
      {
        type: "transient_state",
        message: "busy",
        resource: "instance_server",
        resource_id: "x",
        current_state: "starting",
      },
      TransientStateError,
      { current_state: "starting" },
    ],
    [
      409,
      { type: "already_exists", message: "exists", resource: "r", resource_id: "x" },
      AlreadyExistsError,
      { resource_id: "x" },
    ],
    [
      412,
      { type: "precondition_failed", message: "no", precondition: "resource_still_in_use" },
      PreconditionFailedError,
      { precondition: "resource_still_in_use" },
    ],
    [
      503,
      { type: "out_of_stock", message: "out of stock", resource: "GP1-XL" },
      OutOfStockError,
      { resource: "GP1-XL" },
    ],
  ] as const;

  for (const [status, body, ErrorClass, fields] of cases) {
    test(`${body.type} → ${ErrorClass.name}`, async () => {
      const { layer } = fakeScaleway(json(status, body));
      const error = await runFlip(getServer({ server_id: serverId }), layer);
      expect(error).toBeInstanceOf(ErrorClass);
      expect(error).toMatchObject({ ...fields, body });
    });
  }

  test("invalid_arguments appends each help_message to the message", async () => {
    const { layer } = fakeScaleway(
      json(400, {
        type: "invalid_arguments",
        message: "invalid argument(s)",
        details: [{ argument_name: "name", reason: "constraint", help_message: "too long" }],
      }),
    );
    const error = await runFlip(getServer({ server_id: serverId }), layer);
    expect(error).toMatchObject({ message: "invalid argument(s) (name: too long)" });
  });

  test("too_many_requests is core TooManyRequests with reset_seconds as the hint", async () => {
    const { layer } = fakeScaleway(
      json(429, { type: "too_many_requests", message: "slow down", reset_seconds: 3 }),
    );
    const error = await runFlip(getServer({ server_id: serverId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.TooManyRequests);
    expect((error as CoreErrors.TooManyRequests).retryAfter).toBeDefined();
  });

  test("legacy unknown_resource names the missing UUID", async () => {
    const body = { type: "unknown_resource", message: `Security group '${serverId}' not found` };
    const { layer } = fakeScaleway(json(404, body));
    const error = await runFlip(getServer({ server_id: serverId }), layer);
    expect(error).toBeInstanceOf(ResourceNotFoundError);
    expect(error).toMatchObject({ resource: "security_group", resource_id: serverId });
  });

  test("legacy invalid_request_error: fields → InvalidArgumentsError, quota → QuotasExceeded", async () => {
    const fields = fakeScaleway(
      json(400, {
        type: "invalid_request_error",
        message: "Validation Error",
        fields: { name: ["required"] },
      }),
    );
    expect(await runFlip(getServer({ server_id: serverId }), fields.layer)).toMatchObject({
      _tag: "InvalidArgumentsError",
      details: [{ argument_name: "name", reason: "constraint", help_message: "required" }],
    });

    const quota = fakeScaleway(
      json(403, {
        type: "invalid_request_error",
        message: "Quota exceeded for this resource.",
        resource: "compute_snapshots",
      }),
    );
    expect(await runFlip(getServer({ server_id: serverId }), quota.layer)).toBeInstanceOf(
      QuotasExceededError,
    );
  });

  test("an unrecognised type falls back to the HTTP status class", async () => {
    const { layer } = fakeScaleway(json(409, { type: "something_new", message: "conflict" }));
    const error = await runFlip(getServer({ server_id: serverId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.Conflict);
    expect(error).toMatchObject({ message: "conflict" });
  });

  test("unmapped 5xx becomes InternalServerError; plain text is the message", async () => {
    const { layer } = fakeScaleway([507, "  insufficient storage\n"]);
    const error = await runFlip(getServer({ server_id: serverId }), layer);
    expect(error).toBeInstanceOf(CoreErrors.InternalServerError);
    expect(error).toMatchObject({ message: "insufficient storage" });
  });

  test("unmapped 4xx becomes UnknownScalewayError with `type` as code", async () => {
    const body = { type: "teapot", message: "short and stout" };
    const { layer } = fakeScaleway(json(418, body));
    const error = await runFlip(getServer({ server_id: serverId }), layer);
    expect(error).toBeInstanceOf(UnknownScalewayError);
    expect(error).toMatchObject({ code: "teapot", message: "short and stout", body });
  });
});

describe("file downloads", () => {
  const contract_signature_id = serverId;

  test("the generated operation reads the JSON file object, without dl", async () => {
    const file = { name: "tos.pdf", content_type: "application/pdf", content: "JVBERi0=" };
    const { calls, layer } = fakeScaleway(json(200, file));
    expect(
      await run(downloadContractSignature({ contract_signature_id, locale: "en_US" }), layer),
    ).toEqual(file);
    expect(calls[0]!.url.searchParams.get("dl")).toBeNull();
  });

  test("…Raw asks for dl=1 beside the other query params and answers the bytes", async () => {
    const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x00, 0xff]);
    const { calls, layer } = fakeScaleway([200, pdf, { "content-type": "application/pdf" }]);
    const bytes = await run(
      downloadContractSignatureRaw({ contract_signature_id, locale: "en_US" }),
      layer,
    );
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(Array.from(bytes)).toEqual(Array.from(pdf));
    expect(calls[0]!.url.searchParams.get("dl")).toBe("1");
    expect(calls[0]!.url.searchParams.get("locale")).toBe("en_US");
  });

  test("a failed …Raw download is still a typed error", async () => {
    const { layer } = fakeScaleway(
      json(400, {
        type: "invalid_arguments",
        message: "invalid argument(s)",
        details: [
          {
            argument_name: "locale",
            reason: "constraint",
            help_message: "value must be in list [1 2]",
          },
        ],
      }),
    );
    const error = await runFlip(downloadContractSignatureRaw({ contract_signature_id }), layer);
    expect(error).toBeInstanceOf(InvalidArgumentsError);
  });
});

describe("secret maps", () => {
  test("Redacted values are unwrapped into the request body", async () => {
    const { calls, layer } = fakeScaleway(json(200, { id: "c" }));
    await run(
      createContainer({
        namespace_id: serverId,
        name: "web",
        image: "rg.fr-par.scw.cloud/ns/web:latest",
        secret_environment_variables: { TOKEN: Redacted.make("s3cr3t"), PLAIN: "x" },
      }),
      layer,
    );
    expect(JSON.parse(calls[0]!.body!).secret_environment_variables).toEqual({
      TOKEN: "s3cr3t",
      PLAIN: "x",
    });
  });
});

describe("success decoding", () => {
  test("null properties are dropped, as the official SDKs do", async () => {
    const { layer } = fakeScaleway(
      json(200, { server: { id: serverId, name: "web", public_ip: null, tags: ["a"] } }),
    );
    const result = await Effect.runPromise(
      getServer({ server_id: serverId }).pipe(
        Retry.none,
        Effect.provide(creds()),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.result,
      ),
    );
    expect(result._tag).toBe("Success");
    expect((result as any).success.server).not.toHaveProperty("public_ip");
  });

  test("the 2xx JSON body is the payload", async () => {
    const server = { server: { id: serverId, name: "web" } };
    const get = fakeScaleway(json(200, server));
    expect(await run(getServer({ server_id: serverId }), get.layer)).toEqual(server);
  });

  test("strict validation fails a mismatched payload with ScalewayParseError", async () => {
    const { layer } = fakeScaleway(json(200, { server: { id: 42 } }));
    const error = await Effect.runPromise(
      getServer({ server_id: serverId }).pipe(
        Retry.none,
        Effect.provide(creds()),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ScalewayParseError);
  });
});
