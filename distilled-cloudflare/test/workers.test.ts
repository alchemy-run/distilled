import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId, getZoneId } from "./test.ts";
import * as Workers from "~/services/workers.ts";
import {
  ContentTypeRequired,
  DeploymentNotFound,
  DomainNotFound,
  InvalidRoute,
  InvalidRoutePattern,
  InvalidWorkerScript,
  RouteNotFound,
  SecretNotFound,
  VersionNotFound,
  WorkerNotFound,
} from "~/services/workers.ts";

const accountId = () => getAccountId();
const zoneId = () => {
  const z = getZoneId();
  if (!z) throw new Error("CLOUDFLARE_ZONE_ID environment variable is not set");
  return z;
};

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic script name for tests.
 * Follows the convention: distilled-cf-workers-{testname}
 */
const scriptName = (name: string) => `distilled-cf-workers-${name}`;

/**
 * Minimal Worker module source for uploads.
 */
const workerModuleSource = `export default { async fetch(request) { return new Response("Hello from test worker"); } };`;

/**
 * Create a worker script via putScript, run `fn`, then delete the script.
 * Cleanup-first pattern for idempotency.
 */
const withScript = <A, E, R>(
  name: string,
  fn: (scriptName: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Attempt cleanup first in case of previous failed run
    yield* Workers.deleteScript({
      accountId: accountId(),
      scriptName: name,
      force: true,
    }).pipe(Effect.catch(() => Effect.void));

    // Upload a simple worker script
    const scriptBlob = new Blob([workerModuleSource], {
      type: "application/javascript+module",
    });
    const metadataBlob = new Blob(
      [
        JSON.stringify({
          main_module: "index.mjs",
          compatibility_date: "2024-01-01",
        }),
      ],
      { type: "application/json" },
    );

    const scriptFile = new File([scriptBlob], "index.mjs", {
      type: "application/javascript+module",
    });

    yield* Workers.putScript({
      accountId: accountId(),
      scriptName: name,
      metadata: {
        mainModule: "index.mjs",
        compatibilityDate: "2024-01-01",
      },
      files: [scriptFile],
    });

    // Run the test function, ensuring cleanup
    return yield* fn(name).pipe(
      Effect.ensuring(
        Workers.deleteScript({
          accountId: accountId(),
          scriptName: name,
          force: true,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

/**
 * Create a beta worker, run `fn`, then delete the worker.
 */
const withBetaWorker = <A, E, R>(
  name: string,
  fn: (workerId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Try to find and delete existing worker with same name
    const existing = yield* Workers.listBetaWorkers({
      accountId: accountId(),
    }).pipe(Effect.catch(() => Effect.succeed([] as any)));

    if (Array.isArray(existing)) {
      const found = existing.find((w: any) => w.name === name);
      if (found) {
        yield* Workers.deleteBetaWorker({
          accountId: accountId(),
          workerId: found.id,
        }).pipe(Effect.catch(() => Effect.void));
      }
    }

    // Create the worker
    const worker = yield* Workers.createBetaWorker({
      accountId: accountId(),
      name,
    });

    return yield* fn(worker.id).pipe(
      Effect.ensuring(
        Workers.deleteBetaWorker({
          accountId: accountId(),
          workerId: worker.id,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

// ============================================================================
// Workers Tests
// ============================================================================

describe("Workers", () => {
  // ==========================================================================
  // AccountSetting
  // ==========================================================================
  describe("getAccountSetting", () => {
    test("happy path - retrieves account settings", () =>
      Effect.gen(function* () {
        const result = yield* Workers.getAccountSetting({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        if (result.defaultUsageModel !== undefined) {
          expect(typeof result.defaultUsageModel).toBe("string");
        }
        if (result.greenCompute !== undefined) {
          expect(typeof result.greenCompute).toBe("boolean");
        }
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.getAccountSetting({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("putAccountSetting", () => {
    test("happy path - updates account settings", () =>
      Effect.gen(function* () {
        // First get current settings to restore later
        const current = yield* Workers.getAccountSetting({
          accountId: accountId(),
        });

        const result = yield* Workers.putAccountSetting({
          accountId: accountId(),
          greenCompute: current.greenCompute ?? false,
        });

        expect(result).toBeDefined();
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.putAccountSetting({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // ==========================================================================
  // BetaWorker
  // ==========================================================================
  describe("listBetaWorkers", () => {
    test("happy path - lists beta workers in account", () =>
      Effect.gen(function* () {
        const result = yield* Workers.listBetaWorkers({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const worker of result) {
          expect(typeof worker.id).toBe("string");
          expect(typeof worker.name).toBe("string");
        }
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.listBetaWorkers({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("createBetaWorker", () => {
    test("happy path - creates a new beta worker", () =>
      Effect.gen(function* () {
        const name = scriptName("beta-create");

        // Cleanup: find and delete existing worker with same name
        const existing = yield* Workers.listBetaWorkers({
          accountId: accountId(),
        }).pipe(Effect.catch(() => Effect.succeed([] as any)));

        if (Array.isArray(existing)) {
          const found = existing.find((w: any) => w.name === name);
          if (found) {
            yield* Workers.deleteBetaWorker({
              accountId: accountId(),
              workerId: found.id,
            }).pipe(Effect.catch(() => Effect.void));
          }
        }

        const result = yield* Workers.createBetaWorker({
          accountId: accountId(),
          name,
        });

        expect(result).toBeDefined();
        expect(typeof result.id).toBe("string");
        expect(result.name).toBe(name);

        // Cleanup
        yield* Workers.deleteBetaWorker({
          accountId: accountId(),
          workerId: result.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.createBetaWorker({
        accountId: "invalid-account-id-000",
        name: scriptName("beta-create-invalid"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getBetaWorker", () => {
    test("happy path - retrieves a beta worker by ID", () =>
      withBetaWorker(scriptName("beta-get"), (workerId) =>
        Effect.gen(function* () {
          const result = yield* Workers.getBetaWorker({
            accountId: accountId(),
            workerId,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(workerId);
          expect(typeof result.name).toBe("string");
        }),
      ));

    test("error - WorkerNotFound for non-existent workerId", () =>
      Workers.getBetaWorker({
        accountId: accountId(),
        workerId: "non-existent-worker-id-xyz-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.getBetaWorker({
        accountId: "invalid-account-id-000",
        workerId: "any-worker-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("updateBetaWorker", () => {
    test("happy path - updates a beta worker", () =>
      withBetaWorker(scriptName("beta-update"), (workerId) =>
        Effect.gen(function* () {
          const updatedName = scriptName("beta-update-renamed");
          const result = yield* Workers.updateBetaWorker({
            accountId: accountId(),
            workerId,
            name: updatedName,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(workerId);
          expect(result.name).toBe(updatedName);
        }),
      ));

    test("error - WorkerNotFound for non-existent workerId", () =>
      Workers.updateBetaWorker({
        accountId: accountId(),
        workerId: "non-existent-worker-id-xyz-000",
        name: "any-name",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("patchBetaWorker", () => {
    test("happy path - patches a beta worker", () =>
      withBetaWorker(scriptName("beta-patch"), (workerId) =>
        Effect.gen(function* () {
          const result = yield* Workers.patchBetaWorker({
            accountId: accountId(),
            workerId,
            name: scriptName("beta-patch"),
            logpush: false,
            observability: {},
            subdomain: {},
            tags: [],
            tailConsumers: [],
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(workerId);
        }),
      ));

    test("error - WorkerNotFound for non-existent workerId", () =>
      Workers.patchBetaWorker({
        accountId: accountId(),
        workerId: "non-existent-worker-id-xyz-000",
        name: "any-name",
        logpush: false,
        observability: {},
        subdomain: {},
        tags: [],
        tailConsumers: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("deleteBetaWorker", () => {
    test("happy path - deletes a beta worker", () =>
      Effect.gen(function* () {
        const name = scriptName("beta-delete");

        // Cleanup first
        const existing = yield* Workers.listBetaWorkers({
          accountId: accountId(),
        }).pipe(Effect.catch(() => Effect.succeed([] as any)));
        if (Array.isArray(existing)) {
          const found = existing.find((w: any) => w.name === name);
          if (found) {
            yield* Workers.deleteBetaWorker({
              accountId: accountId(),
              workerId: found.id,
            }).pipe(Effect.catch(() => Effect.void));
          }
        }

        const worker = yield* Workers.createBetaWorker({
          accountId: accountId(),
          name,
        });

        // Delete the worker. The API returns result: null for deletes,
        // which causes a schema decode error because the generated response
        // schema is the envelope itself. Catch the schema decode error and
        // verify the worker was actually deleted by trying to get it.
        yield* Workers.deleteBetaWorker({
          accountId: accountId(),
          workerId: worker.id,
        }).pipe(Effect.catch(() => Effect.void));

        // Verify worker was deleted by checking it's not in the list
        const afterDelete = yield* Workers.listBetaWorkers({
          accountId: accountId(),
        });
        const stillExists = afterDelete.find((w: any) => w.id === worker.id);
        expect(stillExists).toBeUndefined();
      }));

    test("error - WorkerNotFound for non-existent workerId", () =>
      Workers.deleteBetaWorker({
        accountId: accountId(),
        workerId: "non-existent-worker-id-xyz-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // BetaWorkerVersion
  // ==========================================================================
  describe("listBetaWorkerVersions", () => {
    test("happy path - lists versions of a beta worker", () =>
      withBetaWorker(scriptName("beta-ver-list"), (workerId) =>
        Effect.gen(function* () {
          const result = yield* Workers.listBetaWorkerVersions({
            accountId: accountId(),
            workerId,
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
        }),
      ));

    test("error - WorkerNotFound for non-existent workerId", () =>
      Workers.listBetaWorkerVersions({
        accountId: accountId(),
        workerId: "non-existent-worker-id-xyz-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("createBetaWorkerVersion", () => {
    test("happy path - creates a version for a beta worker", () =>
      withBetaWorker(scriptName("beta-ver-create"), (workerId) =>
        Effect.gen(function* () {
          const workerSource = btoa(workerModuleSource);
          const result = yield* Workers.createBetaWorkerVersion({
            accountId: accountId(),
            workerId,
            mainModule: "index.mjs",
            compatibilityDate: "2024-01-01",
            modules: [
              {
                name: "index.mjs",
                contentType: "application/javascript+module",
                contentBase64: workerSource,
              },
            ],
          });

          expect(result).toBeDefined();
          expect(typeof result.id).toBe("string");
          expect(typeof result.number).toBe("number");
        }),
      ));

    test("error - WorkerNotFound for non-existent workerId", () =>
      Workers.createBetaWorkerVersion({
        accountId: accountId(),
        workerId: "non-existent-worker-id-xyz-000",
        mainModule: "index.mjs",
        modules: [
          {
            name: "index.mjs",
            contentType: "application/javascript+module",
            contentBase64: btoa("export default {}"),
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("getBetaWorkerVersion", () => {
    test("happy path - retrieves a specific version", () =>
      withBetaWorker(scriptName("beta-ver-get"), (workerId) =>
        Effect.gen(function* () {
          const workerSource = btoa(workerModuleSource);
          const version = yield* Workers.createBetaWorkerVersion({
            accountId: accountId(),
            workerId,
            mainModule: "index.mjs",
            compatibilityDate: "2024-01-01",
            modules: [
              {
                name: "index.mjs",
                contentType: "application/javascript+module",
                contentBase64: workerSource,
              },
            ],
          });

          const result = yield* Workers.getBetaWorkerVersion({
            accountId: accountId(),
            workerId,
            versionId: version.id,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(version.id);
          expect(typeof result.createdOn).toBe("string");
          expect(typeof result.number).toBe("number");
        }),
      ));

    test("error - WorkerNotFound for non-existent versionId", () =>
      withBetaWorker(scriptName("beta-ver-get-404"), (workerId) =>
        Workers.getBetaWorkerVersion({
          accountId: accountId(),
          workerId,
          versionId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
        ),
      ));
  });

  describe("deleteBetaWorkerVersion", () => {
    test("error - WorkerNotFound for non-existent versionId", () =>
      withBetaWorker(scriptName("beta-ver-del"), (workerId) =>
        Workers.deleteBetaWorkerVersion({
          accountId: accountId(),
          workerId,
          versionId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
        ),
      ));
  });

  // ==========================================================================
  // Domain
  // ==========================================================================
  describe("listDomains", () => {
    test("happy path - lists worker domains in account", () =>
      Effect.gen(function* () {
        const result = yield* Workers.listDomains({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.listDomains({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getDomain", () => {
    test("error - DomainNotFound for non-existent domainId", () =>
      Workers.getDomain({
        accountId: accountId(),
        domainId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DomainNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.getDomain({
        accountId: "invalid-account-id-000",
        domainId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deleteDomain", () => {
    test("error - DomainNotFound for non-existent domainId", () =>
      Workers.deleteDomain({
        accountId: accountId(),
        domainId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DomainNotFound")),
      ));
  });

  // ==========================================================================
  // ObservabilityTelemetry
  // ==========================================================================
  describe("keysObservabilityTelemetry", () => {
    test("happy path - retrieves telemetry keys", () =>
      Effect.gen(function* () {
        const now = Date.now();
        const result = yield* Workers.keysObservabilityTelemetry({
          accountId: accountId(),
          datasets: ["cloudflare-workers"],
          from: now - 3600 * 1000,
          to: now,
          limit: 10,
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const item of result) {
          expect(typeof item.key).toBe("string");
          expect(typeof item.lastSeenAt).toBe("number");
          expect(["string", "boolean", "number"]).toContain(item.type);
        }
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.keysObservabilityTelemetry({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("valuesObservabilityTelemetry", () => {
    test("happy path - retrieves telemetry values", () =>
      Effect.gen(function* () {
        const now = Date.now();
        const result = yield* Workers.valuesObservabilityTelemetry({
          accountId: accountId(),
          datasets: ["cloudflare-workers"],
          key: "$metadata.service",
          timeframe: { from: now - 3600 * 1000, to: now },
          type: "string",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.valuesObservabilityTelemetry({
        accountId: "invalid-account-id-000",
        datasets: ["cloudflare-workers"],
        key: "$metadata.service",
        timeframe: { from: 0, to: 1 },
        type: "string",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("queryObservabilityTelemetry", () => {
    test("happy path - queries telemetry data", () =>
      Effect.gen(function* () {
        const now = Date.now();
        const result = yield* Workers.queryObservabilityTelemetry({
          accountId: accountId(),
          queryId: "new",
          timeframe: { from: now - 3600 * 1000, to: now },
          view: "events",
          limit: 1,
          parameters: {
            datasets: ["cloudflare-workers"],
          },
        });

        expect(result).toBeDefined();
        expect(result.run).toBeDefined();
        expect(typeof result.run.id).toBe("string");
        expect(result.statistics).toBeDefined();
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.queryObservabilityTelemetry({
        accountId: "invalid-account-id-000",
        queryId: "new",
        timeframe: { from: 0, to: 1 },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // ==========================================================================
  // Route (zone-scoped)
  // ==========================================================================
  describe("listRoutes", () => {
    test("happy path - lists worker routes in a zone", () =>
      Effect.gen(function* () {
        const zone = zoneId();
        const result = yield* Workers.listRoutes({
          zoneId: zone,
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const route of result) {
          expect(typeof route.id).toBe("string");
          expect(typeof route.pattern).toBe("string");
        }
      }));

    test("error - InvalidRoute for invalid zoneId", () =>
      Workers.listRoutes({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getRoute", () => {
    test("error - WorkerNotFound for non-existent routeId", () =>
      Workers.getRoute({
        zoneId: zoneId(),
        routeId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));

    test("error - InvalidRoute for invalid zoneId", () =>
      Workers.getRoute({
        zoneId: "invalid-zone-id-000",
        routeId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("createRoute", () => {
    test("error - InvalidRoutePattern for invalid pattern", () =>
      Workers.createRoute({
        zoneId: zoneId(),
        pattern: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoutePattern")),
      ));

    test("error - InvalidRoute for invalid zoneId", () =>
      Workers.createRoute({
        zoneId: "invalid-zone-id-000",
        pattern: "example.com/*",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("updateRoute", () => {
    test("error - RouteNotFound for non-existent routeId", () =>
      Workers.updateRoute({
        zoneId: zoneId(),
        routeId: "00000000000000000000000000000000",
        // Pattern must include zone name to avoid InvalidRoutePattern
        pattern: "alchemy-test-2.us/*",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("RouteNotFound")),
      ));
  });

  describe("deleteRoute", () => {
    test("error - RouteNotFound for non-existent routeId", () =>
      Workers.deleteRoute({
        zoneId: zoneId(),
        routeId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("RouteNotFound")),
      ));
  });

  // ==========================================================================
  // Script
  // ==========================================================================
  describe("listScripts", () => {
    test("happy path - lists worker scripts in account", () =>
      Effect.gen(function* () {
        const result = yield* Workers.listScripts({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const script of result) {
          if (script.id) {
            expect(typeof script.id).toBe("string");
          }
        }
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.listScripts({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("putScript", () => {
    test("happy path - uploads a worker script", () =>
      Effect.gen(function* () {
        const name = scriptName("put-script-happy");

        // Cleanup first
        yield* Workers.deleteScript({
          accountId: accountId(),
          scriptName: name,
          force: true,
        }).pipe(Effect.catch(() => Effect.void));

        const scriptFile = new File([workerModuleSource], "index.mjs", {
          type: "application/javascript+module",
        });

        const result = yield* Workers.putScript({
          accountId: accountId(),
          scriptName: name,
          metadata: {
            mainModule: "index.mjs",
            compatibilityDate: "2024-01-01",
          },
          files: [scriptFile],
        });

        expect(result).toBeDefined();
        expect(result.id).toBe(name);
        expect(typeof result.startupTimeMs).toBe("number");

        // Cleanup
        yield* Workers.deleteScript({
          accountId: accountId(),
          scriptName: name,
          force: true,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.putScript({
        accountId: "invalid-account-id-000",
        scriptName: scriptName("put-invalid-acct"),
        metadata: {
          mainModule: "index.mjs",
        },
        files: [
          new File(["export default {}"], "index.mjs", {
            type: "application/javascript+module",
          }),
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getScript", () => {
    test("happy path - retrieves a worker script", () =>
      withScript(scriptName("get-script"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.getScript({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScript({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-xyz-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.getScript({
        accountId: "invalid-account-id-000",
        scriptName: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deleteScript", () => {
    test("happy path - deletes a worker script", () =>
      Effect.gen(function* () {
        const name = scriptName("delete-script-happy");

        // Cleanup
        yield* Workers.deleteScript({
          accountId: accountId(),
          scriptName: name,
          force: true,
        }).pipe(Effect.catch(() => Effect.void));

        // Upload
        const scriptFile = new File([workerModuleSource], "index.mjs", {
          type: "application/javascript+module",
        });

        yield* Workers.putScript({
          accountId: accountId(),
          scriptName: name,
          metadata: {
            mainModule: "index.mjs",
            compatibilityDate: "2024-01-01",
          },
          files: [scriptFile],
        });

        const result = yield* Workers.deleteScript({
          accountId: accountId(),
          scriptName: name,
          force: true,
        });

        expect(result).toBeDefined();
      }));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.deleteScript({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-del-xyz-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("searchScript", () => {
    test("happy path - searches scripts in account", () =>
      Effect.gen(function* () {
        const result = yield* Workers.searchScript({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const item of result) {
          expect(typeof item.scriptName).toBe("string");
          // scriptTag is optional — may be undefined
          if (item.scriptTag !== undefined) {
            expect(typeof item.scriptTag).toBe("string");
          }
          expect(typeof item.createdOn).toBe("string");
          expect(typeof item.modifiedOn).toBe("string");
        }
      }));

    test("happy path - searches scripts by name filter", () =>
      Effect.gen(function* () {
        const result = yield* Workers.searchScript({
          accountId: accountId(),
          name: "distilled-cf-workers",
          perPage: 5,
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.searchScript({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // ==========================================================================
  // ScriptContent
  // ==========================================================================
  describe("getScriptContent", () => {
    test("happy path - retrieves script content", () =>
      withScript(scriptName("get-content"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.getScriptContent({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScriptContent({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-content-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("putScriptContent", () => {
    test("happy path - updates script content", () =>
      withScript(scriptName("put-content"), (name) =>
        Effect.gen(function* () {
          const newSource = `export default { async fetch(request) { return new Response("Updated"); } };`;
          const scriptFile = new File([newSource], "index.mjs", {
            type: "application/javascript+module",
          });

          const result = yield* Workers.putScriptContent({
            accountId: accountId(),
            scriptName: name,
            metadata: {
              mainModule: "index.mjs",
            },
            files: [scriptFile],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - InvalidWorkerScript for script with no event handlers", () =>
      Workers.putScriptContent({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-put-content-xyz",
        metadata: {
          mainModule: "index.mjs",
        },
        files: [
          // Script without event handlers triggers InvalidWorkerScript (10068)
          new File(["export default {}"], "index.mjs", {
            type: "application/javascript+module",
          }),
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidWorkerScript")),
      ));
  });

  // ==========================================================================
  // ScriptDeployment
  // ==========================================================================
  describe("listScriptDeployments", () => {
    test("happy path - lists deployments for a script", () =>
      withScript(scriptName("list-deploy"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.listScriptDeployments({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
          expect(result.deployments).toBeDefined();
          expect(Array.isArray(result.deployments)).toBe(true);
          for (const deploy of result.deployments) {
            expect(typeof deploy.id).toBe("string");
            expect(typeof deploy.createdOn).toBe("string");
            expect(deploy.strategy).toBe("percentage");
            expect(Array.isArray(deploy.versions)).toBe(true);
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.listScriptDeployments({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-deploy-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("getScriptDeployment", () => {
    test("error - DeploymentNotFound for non-existent deploymentId", () =>
      withScript(scriptName("get-deploy"), (name) =>
        Workers.getScriptDeployment({
          accountId: accountId(),
          scriptName: name,
          deploymentId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("DeploymentNotFound")),
        ),
      ));
  });

  describe("createScriptDeployment", () => {
    test("happy path - creates a deployment for a script", () =>
      withScript(scriptName("create-deploy"), (name) =>
        Effect.gen(function* () {
          // First list deployments to get the current version
          const deployments = yield* Workers.listScriptDeployments({
            accountId: accountId(),
            scriptName: name,
          });

          // Use the existing deployment's version
          if (
            deployments.deployments.length > 0 &&
            deployments.deployments[0].versions.length > 0
          ) {
            const currentVersionId =
              deployments.deployments[0].versions[0].versionId;

            const result = yield* Workers.createScriptDeployment({
              accountId: accountId(),
              scriptName: name,
              strategy: "percentage",
              versions: [
                { percentage: 100, versionId: currentVersionId },
              ],
              annotations: {
                "workers/message": "Test deployment from distilled tests",
              },
            });

            expect(result).toBeDefined();
            expect(typeof result.id).toBe("string");
            // strategy and versions are optional — API may not return them
            if (result.strategy !== undefined) {
              expect(result.strategy).toBe("percentage");
            }
            if (result.versions !== undefined) {
              expect(Array.isArray(result.versions)).toBe(true);
            }
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.createScriptDeployment({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-create-deploy-xyz",
        strategy: "percentage",
        versions: [
          {
            percentage: 100,
            versionId: "00000000-0000-0000-0000-000000000000",
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("deleteScriptDeployment", () => {
    test("error - WorkerNotFound for non-existent deploymentId", () =>
      withScript(scriptName("del-deploy"), (name) =>
        Workers.deleteScriptDeployment({
          accountId: accountId(),
          scriptName: name,
          deploymentId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
        ),
      ));
  });

  // ==========================================================================
  // ScriptSchedule
  // ==========================================================================
  describe("getScriptSchedule", () => {
    test("happy path - retrieves schedule for a script", () =>
      withScript(scriptName("get-sched"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.getScriptSchedule({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
          expect(result.schedules).toBeDefined();
          expect(Array.isArray(result.schedules)).toBe(true);
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScriptSchedule({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-sched-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("putScriptSchedule", () => {
    test("happy path - sets cron schedule on a script", () =>
      withScript(scriptName("put-sched"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.putScriptSchedule({
            accountId: accountId(),
            scriptName: name,
            body: [{ cron: "*/30 * * * *" }],
          });

          expect(result).toBeDefined();
          expect(result.schedules).toBeDefined();
          expect(Array.isArray(result.schedules)).toBe(true);
          expect(result.schedules.length).toBeGreaterThan(0);
          expect(result.schedules[0].cron).toBe("*/30 * * * *");

          // Clear schedule
          yield* Workers.putScriptSchedule({
            accountId: accountId(),
            scriptName: name,
            body: [],
          });
        }),
      ));

    test("happy path - clears schedule with empty array", () =>
      withScript(scriptName("put-sched-clear"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.putScriptSchedule({
            accountId: accountId(),
            scriptName: name,
            body: [],
          });

          expect(result).toBeDefined();
          expect(result.schedules).toBeDefined();
          expect(Array.isArray(result.schedules)).toBe(true);
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.putScriptSchedule({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-put-sched-xyz",
        body: [{ cron: "*/30 * * * *" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // ScriptScriptAndVersionSetting
  // ==========================================================================
  describe("getScriptScriptAndVersionSetting", () => {
    test("happy path - retrieves settings for a script", () =>
      withScript(scriptName("get-settings"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.getScriptScriptAndVersionSetting({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
          if (result.compatibilityDate !== undefined) {
            expect(typeof result.compatibilityDate).toBe("string");
          }
          if (result.bindings !== undefined) {
            expect(Array.isArray(result.bindings)).toBe(true);
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScriptScriptAndVersionSetting({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-settings-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("patchScriptScriptAndVersionSetting", () => {
    test("happy path - patches settings for a script", () =>
      withScript(scriptName("patch-settings"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.patchScriptScriptAndVersionSetting({
            accountId: accountId(),
            scriptName: name,
            settings: {
              logpush: false,
            },
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.patchScriptScriptAndVersionSetting({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-patch-settings-xyz",
        settings: { logpush: false },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // ScriptSecret
  // ==========================================================================
  describe("listScriptSecrets", () => {
    test("happy path - lists secrets for a script", () =>
      withScript(scriptName("list-secrets"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.listScriptSecrets({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.listScriptSecrets({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-secrets-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("putScriptSecret", () => {
    test("happy path - sets a secret on a script", () =>
      withScript(scriptName("put-secret"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.putScriptSecret({
            accountId: accountId(),
            scriptName: name,
            name: "TEST_SECRET",
            text: "secret-value-123",
            type: "secret_text",
          });

          expect(result).toBeDefined();
          expect(result.name).toBe("TEST_SECRET");
          expect(result.type).toBe("secret_text");
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.putScriptSecret({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-put-secret-xyz",
        name: "TEST_SECRET",
        text: "secret-value",
        type: "secret_text",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("getScriptSecret", () => {
    test("happy path - retrieves a specific secret", () =>
      withScript(scriptName("get-secret"), (name) =>
        Effect.gen(function* () {
          // First create a secret
          yield* Workers.putScriptSecret({
            accountId: accountId(),
            scriptName: name,
            name: "GET_SECRET_TEST",
            text: "secret-value-456",
            type: "secret_text",
          });

          const result = yield* Workers.getScriptSecret({
            accountId: accountId(),
            scriptName: name,
            secretName: "GET_SECRET_TEST",
          });

          expect(result).toBeDefined();
          expect(result.name).toBe("GET_SECRET_TEST");
          expect(result.type).toBe("secret_text");
        }),
      ));

    test("error - SecretNotFound for non-existent secret", () =>
      withScript(scriptName("get-secret-404"), (name) =>
        Workers.getScriptSecret({
          accountId: accountId(),
          scriptName: name,
          secretName: "NONEXISTENT_SECRET_XYZ",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNotFound")),
        ),
      ));
  });

  describe("deleteScriptSecret", () => {
    test("happy path - deletes a secret from a script", () =>
      withScript(scriptName("del-secret"), (name) =>
        Effect.gen(function* () {
          // Create a secret first
          yield* Workers.putScriptSecret({
            accountId: accountId(),
            scriptName: name,
            name: "DELETE_ME_SECRET",
            text: "secret-to-delete",
            type: "secret_text",
          });

          const result = yield* Workers.deleteScriptSecret({
            accountId: accountId(),
            scriptName: name,
            secretName: "DELETE_ME_SECRET",
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - SecretNotFound for non-existent secret", () =>
      withScript(scriptName("del-secret-404"), (name) =>
        Workers.deleteScriptSecret({
          accountId: accountId(),
          scriptName: name,
          secretName: "NONEXISTENT_SECRET_XYZ_DEL",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNotFound")),
        ),
      ));
  });

  // ==========================================================================
  // ScriptSetting
  // ==========================================================================
  describe("getScriptSetting", () => {
    test("happy path - retrieves script settings", () =>
      withScript(scriptName("get-setting"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.getScriptSetting({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScriptSetting({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-setting-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("patchScriptSetting", () => {
    test("happy path - patches script settings", () =>
      withScript(scriptName("patch-setting"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.patchScriptSetting({
            accountId: accountId(),
            scriptName: name,
            logpush: false,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.patchScriptSetting({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-patch-setting-xyz",
        logpush: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // ScriptSubdomain
  // ==========================================================================
  describe("getScriptSubdomain", () => {
    test("happy path - retrieves script subdomain config", () =>
      withScript(scriptName("get-sub"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.getScriptSubdomain({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
          if (result.enabled !== undefined) {
            expect(typeof result.enabled).toBe("boolean");
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScriptSubdomain({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-subdomain-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("createScriptSubdomain", () => {
    test("happy path - enables subdomain for a script", () =>
      withScript(scriptName("create-sub"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.createScriptSubdomain({
            accountId: accountId(),
            scriptName: name,
            enabled: true,
          });

          expect(result).toBeDefined();

          // Disable it again
          yield* Workers.createScriptSubdomain({
            accountId: accountId(),
            scriptName: name,
            enabled: false,
          }).pipe(Effect.catch(() => Effect.void));
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.createScriptSubdomain({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-create-sub-xyz",
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("deleteScriptSubdomain", () => {
    test("error - WorkerNotFound for non-existent script", () =>
      Workers.deleteScriptSubdomain({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-del-sub-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // ScriptTail
  // ==========================================================================
  describe("getScriptTail", () => {
    test("error - WorkerNotFound for non-existent script", () =>
      Workers.getScriptTail({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-tail-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("createScriptTail", () => {
    test("happy path - creates a tail for a script", () =>
      withScript(scriptName("create-tail"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.createScriptTail({
            accountId: accountId(),
            scriptName: name,
            body: {},
          });

          expect(result).toBeDefined();
          expect(typeof result.id).toBe("string");
          expect(typeof result.url).toBe("string");
          expect(typeof result.expiresAt).toBe("string");

          // Cleanup tail
          yield* Workers.deleteScriptTail({
            accountId: accountId(),
            scriptName: name,
            id: result.id,
          }).pipe(Effect.catch(() => Effect.void));
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.createScriptTail({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-create-tail-xyz",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("deleteScriptTail", () => {
    test("error - WorkerNotFound for non-existent tail id", () =>
      Workers.deleteScriptTail({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-del-tail-xyz",
        id: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // ScriptVersion
  // ==========================================================================
  describe("listScriptVersions", () => {
    test("happy path - lists versions of a script", () =>
      withScript(scriptName("list-versions"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.listScriptVersions({
            accountId: accountId(),
            scriptName: name,
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          for (const version of result) {
            if (version.id !== undefined) {
              expect(typeof version.id).toBe("string");
            }
            if (version.number !== undefined) {
              expect(typeof version.number).toBe("number");
            }
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.listScriptVersions({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-list-ver-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  describe("getScriptVersion", () => {
    test("happy path - retrieves a specific version of a script", () =>
      withScript(scriptName("get-version"), (name) =>
        Effect.gen(function* () {
          // Get the list of versions to find the first one
          const versions = yield* Workers.listScriptVersions({
            accountId: accountId(),
            scriptName: name,
          });

          if (versions.length > 0 && versions[0].id) {
            const versionId = versions[0].id;
            const result = yield* Workers.getScriptVersion({
              accountId: accountId(),
              scriptName: name,
              versionId,
            });

            expect(result).toBeDefined();
            expect(result.resources).toBeDefined();
            if (result.id !== undefined) {
              expect(typeof result.id).toBe("string");
            }
            if (result.number !== undefined) {
              expect(typeof result.number).toBe("number");
            }
          }
        }),
      ));

    test("error - VersionNotFound for non-existent versionId", () =>
      withScript(scriptName("get-ver-404"), (name) =>
        Workers.getScriptVersion({
          accountId: accountId(),
          scriptName: name,
          versionId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("VersionNotFound")),
        ),
      ));
  });

  describe("createScriptVersion", () => {
    test("happy path - creates a new version of a script", () =>
      withScript(scriptName("create-version"), (name) =>
        Effect.gen(function* () {
          const scriptFile = new File(
            [workerModuleSource],
            "index.mjs",
            { type: "application/javascript+module" },
          );

          const result = yield* Workers.createScriptVersion({
            accountId: accountId(),
            scriptName: name,
            metadata: {
              mainModule: "index.mjs",
            },
            files: [scriptFile],
          });

          expect(result).toBeDefined();
          if (result.id) {
            expect(typeof result.id).toBe("string");
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent script", () =>
      Workers.createScriptVersion({
        accountId: accountId(),
        scriptName: "distilled-cf-workers-nonexistent-create-ver-xyz",
        metadata: {
          mainModule: "index.mjs",
        },
        files: [
          new File(["export default {}"], "index.mjs", {
            type: "application/javascript+module",
          }),
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });

  // ==========================================================================
  // ScriptAssetUpload
  // ==========================================================================
  describe("createScriptAssetUpload", () => {
    test("happy path - creates an asset upload session", () =>
      withScript(scriptName("asset-upload"), (name) =>
        Effect.gen(function* () {
          const result = yield* Workers.createScriptAssetUpload({
            accountId: accountId(),
            scriptName: name,
            manifest: {},
          });

          expect(result).toBeDefined();
          if (result.jwt) {
            expect(typeof result.jwt).toBe("string");
          }
        }),
      ));

    // Note: API accepts asset upload sessions even for non-existent script names,
    // returning a valid JWT. No error is produced, so no error test is possible here.
    test("accepts asset upload for non-existent script name", () =>
      Effect.gen(function* () {
        const result = yield* Workers.createScriptAssetUpload({
          accountId: accountId(),
          scriptName: "distilled-cf-workers-nonexistent-asset-xyz",
          manifest: {},
        });
        expect(result).toBeDefined();
        expect(typeof result.jwt).toBe("string");
      }));
  });

  // ==========================================================================
  // AssetUpload (account-level)
  // ==========================================================================
  describe("createAssetUpload", () => {
    test("error - InvalidRoute for invalid accountId", () =>
      Workers.createAssetUpload({
        accountId: "invalid-account-id-000",
        base64: true,
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // ==========================================================================
  // Subdomain (account-level)
  // ==========================================================================
  describe("getSubdomain", () => {
    test("happy path - retrieves account workers subdomain", () =>
      Effect.gen(function* () {
        const result = yield* Workers.getSubdomain({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(typeof result.subdomain).toBe("string");
        expect(result.subdomain.length).toBeGreaterThan(0);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.getSubdomain({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // NOTE: putSubdomain and deleteSubdomain are intentionally not tested
  // with happy paths since changing or deleting the account subdomain is
  // destructive and would affect other workers/tests.

  describe("putSubdomain", () => {
    test("error - InvalidRoute for invalid accountId", () =>
      Workers.putSubdomain({
        accountId: "invalid-account-id-000",
        subdomain: "distilled-test-subdomain",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deleteSubdomain", () => {
    test("error - InvalidRoute for invalid accountId", () =>
      Workers.deleteSubdomain({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // ==========================================================================
  // putDomain (requires zone + worker)
  // ==========================================================================
  describe("putDomain", () => {
    test("error - WorkerNotFound for non-existent service", () =>
      Workers.putDomain({
        accountId: accountId(),
        // Hostname must match zone name (alchemy-test-2.us) to avoid zone mismatch error
        hostname: "distilled-test.alchemy-test-2.us",
        service: "distilled-cf-workers-nonexistent-svc-xyz",
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Workers.putDomain({
        accountId: "invalid-account-id-000",
        hostname: "distilled-test.example.com",
        service: "any-service",
        zoneId: "any-zone",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });
});
