import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import {
  createBetaWorkerVersion,
  createScriptVersion,
  getBetaWorkerVersion,
  getScriptVersion,
  listBetaWorkerVersions,
  putScript,
} from "./services/workers.ts";

const envelope = (result: unknown) =>
  JSON.stringify({ success: true, errors: [], messages: [], result });
// Image names are user-defined keys, including names that look like wire fields.
const images = {
  "node:24": "sha256:node-digest",
  custom_image: "sha256:custom-digest",
  class_name: "sha256:class-digest",
  className: "sha256:camel-class-digest",
};
const containers = [{ className: "Sandbox", name: "sandbox", images }];
const wireContainers = [{ class_name: "Sandbox", name: "sandbox", images }];
const version = {
  id: "version",
  resources: { bindings: [], script_runtime: { containers: wireContainers } },
};
const betaVersion = {
  id: "version",
  created_on: "2026-09-30T00:00:00Z",
  number: 1,
  urls: [],
  containers: wireContainers,
};

describe("Worker container metadata", () => {
  test("uploads named images in Worker multipart metadata", async () => {
    const { lenient, strict } = await runValidationModes(
      putScript({
        accountId: "account",
        scriptName: "worker",
        metadata: { mainModule: "index.js", containers },
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.method).toBe("PUT");
        expect(request.url).toEndWith(
          "/accounts/account/workers/scripts/worker",
        );
        expect(request.body._tag).toBe("FormData");
        if (request.body._tag === "FormData") {
          const metadata = request.body.formData.get("metadata");
          expect(typeof metadata).toBe("string");
          if (typeof metadata === "string") {
            expect(JSON.parse(metadata)).toMatchObject({
              main_module: "index.js",
              containers: wireContainers,
            });
          }
        }
        return { body: envelope({ id: "worker", startup_time_ms: 0 }) };
      },
    );
    expect(lenient._tag).toBe("Success");
    expect(strict._tag).toBe("Success");
  });

  test("retains named images when uploading a Worker version", async () => {
    const { lenient, strict } = await runValidationModes(
      createScriptVersion({
        accountId: "account",
        scriptName: "worker",
        metadata: { mainModule: "index.js", containers },
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.method).toBe("POST");
        expect(request.url).toEndWith(
          "/accounts/account/workers/scripts/worker/versions",
        );
        expect(request.body._tag).toBe("FormData");
        if (request.body._tag === "FormData") {
          const metadata = request.body.formData.get("metadata");
          expect(typeof metadata).toBe("string");
          if (typeof metadata === "string") {
            expect(JSON.parse(metadata)).toMatchObject({
              containers: wireContainers,
            });
          }
        }
        return { body: envelope(version) };
      },
    );
    const expected = {
      _tag: "Success",
      success: { resources: { scriptRuntime: { containers } } },
    };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("retains named images when reading a Worker version", async () => {
    const { lenient, strict } = await runValidationModes(
      getScriptVersion({
        accountId: "account",
        scriptName: "worker",
        versionId: "version",
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      { body: envelope(version) },
    );
    const expected = {
      _tag: "Success",
      success: { resources: { scriptRuntime: { containers } } },
    };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("reads older Worker versions without native image metadata", async () => {
    const { lenient, strict } = await runValidationModes(
      getScriptVersion({
        accountId: "account",
        scriptName: "worker",
        versionId: "version",
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      {
        body: envelope({
          resources: {
            bindings: [],
            script_runtime: { containers: [{ class_name: "Legacy" }] },
          },
        }),
      },
    );
    const expected = {
      _tag: "Success",
      success: {
        resources: { scriptRuntime: { containers: [{ className: "Legacy" }] } },
      },
    };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("uploads named images in beta Worker version JSON metadata", async () => {
    const { lenient, strict } = await runValidationModes(
      createBetaWorkerVersion({
        accountId: "account",
        workerId: "worker",
        containers,
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.body._tag).toBe("Uint8Array");
        if (request.body._tag === "Uint8Array") {
          expect(
            JSON.parse(new TextDecoder().decode(request.body.body)),
          ).toEqual({ containers: wireContainers });
        }
        return { body: envelope(betaVersion) };
      },
    );
    const expected = { _tag: "Success", success: { containers } };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("retains named images when reading a beta Worker version", async () => {
    const { lenient, strict } = await runValidationModes(
      getBetaWorkerVersion({
        accountId: "account",
        workerId: "worker",
        versionId: "version",
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      { body: envelope(betaVersion) },
    );
    const expected = { _tag: "Success", success: { containers } };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("retains named images when listing beta Worker versions", async () => {
    const { lenient, strict } = await runValidationModes(
      listBetaWorkerVersions({ accountId: "account", workerId: "worker" }).pipe(
        Retry.none,
        Effect.provide(credentials({ apiToken: "test" })),
      ),
      { body: envelope([betaVersion]) },
    );
    const expected = { _tag: "Success", success: { result: [{ containers }] } };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("preserves nullable container metadata on version responses", async () => {
    const { lenient, strict } = await runValidationModes(
      getBetaWorkerVersion({
        accountId: "account",
        workerId: "worker",
        versionId: "version",
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      {
        body: envelope({
          ...betaVersion,
          containers: [{ class_name: "Sandbox", name: null, images: null }],
        }),
      },
    );
    const expected = {
      _tag: "Success",
      success: {
        containers: [{ className: "Sandbox", name: null, images: null }],
      },
    };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });
});
