import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { describe, expect, test } from "vitest";
import { loadRetryTraits, pathKey, traitOf } from "../scripts/retry-configs.ts";

describe("traitOf", () => {
  test("skips the generated templates", () => {
    for (const [initialBackoff, maxBackoff] of [
      ["1s", "10s"],
      ["0.100s", "60s"],
      ["1s", "60s"],
      ["0.100s", "10s"],
    ]) {
      expect(traitOf({ maxAttempts: 5, initialBackoff, maxBackoff, backoffMultiplier: 1.3 })).toBe(
        undefined,
      );
    }
  });

  test("keeps a policy with its own numbers", () => {
    expect(
      traitOf({ maxAttempts: 5, initialBackoff: "2s", maxBackoff: "60s", backoffMultiplier: 2 }),
    ).toEqual({ maxAttempts: 5, baseMs: 2000, capMs: 60_000, factor: 2 });
    expect(
      traitOf({ initialBackoff: "0.250s", maxBackoff: "32s", backoffMultiplier: 1.3 }),
    ).toEqual({ baseMs: 250, capMs: 32_000, factor: 1.3 });
  });
});

describe("pathKey", () => {
  test("a proto binding and a discovery flatPath get the same key", () => {
    expect(pathKey("/v1/{name=projects/*/secrets/*/versions/*}:access")).toBe(
      pathKey("v1/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:access"),
    );
    expect(pathKey("/v1/{topic=projects/*/topics/*}:publish")).toBe(
      "v1/projects/*/topics/*:publish",
    );
  });
});

describe("loadRetryTraits", () => {
  const mirror = () => {
    const specs = fs.mkdtempSync(path.join(os.tmpdir(), "gcp-retry-"));
    const dir = path.join(specs, "googleapis", "google", "example", "v1");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "example_grpc_service_config.json"),
      JSON.stringify({
        methodConfig: [
          {
            name: [{ service: "google.example.v1.Things" }],
            retryPolicy: {
              maxAttempts: 5,
              initialBackoff: "1s",
              maxBackoff: "10s",
              backoffMultiplier: 1.3,
              retryableStatusCodes: ["UNAVAILABLE"],
            },
          },
          {
            name: [{ service: "google.example.v1.Things", method: "CreateThing" }],
            timeout: "60s",
          },
          {
            name: [{ service: "google.example.v1.Things", method: "GetThing" }],
            retryPolicy: {
              maxAttempts: 5,
              initialBackoff: "2s",
              maxBackoff: "60s",
              backoffMultiplier: 2,
              retryableStatusCodes: ["UNAVAILABLE"],
            },
          },
        ],
      }),
    );
    fs.writeFileSync(
      path.join(specs, "googleapis", "http-rules.json"),
      JSON.stringify({
        "google.example.v1.Things/GetThing": [{ method: "GET", path: "/v1/{name=things/*}" }],
        "google.example.v1.Things/ListThings": [{ method: "GET", path: "/v1/things" }],
        "google.example.v1.Things/CreateThing": [{ method: "POST", path: "/v1/things" }],
      }),
    );
    fs.writeFileSync(
      path.join(specs, "googleapis", "hosts.json"),
      JSON.stringify({ "google.example.v1.Things": "example.googleapis.com" }),
    );
    return specs;
  };

  test("a method's own policy wins; the service's template gives nothing", () => {
    const retryOf = loadRetryTraits(mirror());
    expect(retryOf("example.googleapis.com", "GET", "v1/things/{thingsId}")).toEqual({
      maxAttempts: 5,
      baseMs: 2000,
      capMs: 60_000,
      factor: 2,
    });
    expect(retryOf("example.googleapis.com", "GET", "v1/things")).toBeUndefined();
  });

  test("a method listed with no retryPolicy gets one attempt", () => {
    const retryOf = loadRetryTraits(mirror());
    expect(retryOf("example.googleapis.com", "POST", "v1/things")).toEqual({ maxAttempts: 1 });
  });

  test("a GET with no retryPolicy keeps the default", () => {
    const specs = mirror();
    const rules = path.join(specs, "googleapis", "http-rules.json");
    const r = JSON.parse(fs.readFileSync(rules, "utf8"));
    r["google.example.v1.Things/CreateThing"] = [{ method: "GET", path: "/v1/things:new" }];
    fs.writeFileSync(rules, JSON.stringify(r));
    expect(
      loadRetryTraits(specs)("example.googleapis.com", "GET", "v1/things:new"),
    ).toBeUndefined();
  });

  test("a config that retries nothing changes nothing", () => {
    const specs = mirror();
    const dir = path.join(specs, "googleapis", "google", "example", "v1");
    fs.writeFileSync(
      path.join(dir, "example_grpc_service_config.json"),
      JSON.stringify({
        methodConfig: [{ name: [{ service: "google.example.v1.Things" }], timeout: "60s" }],
      }),
    );
    const retryOf = loadRetryTraits(specs);
    expect(retryOf("example.googleapis.com", "POST", "v1/things")).toBeUndefined();
    expect(retryOf("example.googleapis.com", "GET", "v1/things")).toBeUndefined();
  });

  test("the host scopes the match", () => {
    const retryOf = loadRetryTraits(mirror());
    expect(retryOf("other.googleapis.com", "GET", "v1/things/{thingsId}")).toBeUndefined();
    expect(retryOf("example.googleapis.com", "DELETE", "v1/things/{thingsId}")).toBeUndefined();
  });

  test("a mirror without the googleapis files fails with the fix", () => {
    expect(() => loadRetryTraits(os.tmpdir())).toThrow(/specs:update/);
  });
});
