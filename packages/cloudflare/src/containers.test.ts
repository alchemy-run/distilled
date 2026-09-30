import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import {
  createDurableObjectContainerApplication,
  prepareContainerImage,
} from "./services/containers.ts";
import { putScript } from "./services/workers.ts";

const envelope = (result: unknown) =>
  JSON.stringify({ success: true, errors: [], messages: [], result });
const application = {
  id: "namespace",
  name: "sandbox",
  account_id: "account",
  created_at: "2026-09-30T00:00:00Z",
  version: 1,
  scheduling_policy: "durable_object",
  instances: 0,
  configuration: {},
  durable_objects: { namespace_id: "namespace" },
};

describe("Durable Object Container API", () => {
  test("creates an application without a deployment image or max_instances", async () => {
    const { strict } = await runValidationModes(
      createDurableObjectContainerApplication({
        accountId: "account",
        name: "sandbox",
        schedulingPolicy: "durable_object",
        durableObjects: { namespaceId: "namespace" },
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.method).toBe("POST");
        expect(request.url).toEndWith(
          "/accounts/account/containers/applications",
        );
        expect(request.body._tag).toBe("Uint8Array");
        if (request.body._tag === "Uint8Array")
          expect(
            JSON.parse(new TextDecoder().decode(request.body.body)),
          ).toEqual({
            name: "sandbox",
            scheduling_policy: "durable_object",
            durable_objects: { namespace_id: "namespace" },
          });
        return { body: envelope(application) };
      },
    );
    expect(strict).toMatchObject({
      _tag: "Success",
      success: { configuration: {}, schedulingPolicy: "durable_object" },
    });
  });

  for (const status of ["pending", "ready", "error"]) {
    test(`decodes image preparation ${status}`, async () => {
      const { strict } = await runValidationModes(
        prepareContainerImage({
          accountId: "account",
          image: "registry.cloudflare.com/account/sandbox@sha256:digest",
        }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
        {
          body: envelope({
            image: "image",
            status,
            artifact_digest: "digest",
            reason: status === "error" ? "unsupported image" : undefined,
          }),
        },
      );
      expect(strict).toMatchObject({
        _tag: "Success",
        success: { status, artifactDigest: "digest" },
      });
    });
  }

  for (const [status, tag] of [
    [400, "ContainerImagePreparationInvalidImage"],
    [403, "ContainerImagePreparationForbidden"],
  ] as const) {
    test(`types image preparation HTTP ${status}`, async () => {
      const { strict } = await runValidationModes(
        prepareContainerImage({ accountId: "account", image: "image" }).pipe(
          Retry.none,
          Effect.provide(credentials({ apiToken: "test" })),
        ),
        {
          status,
          body: JSON.stringify({
            success: false,
            errors: [{ message: "Image preparation rejected" }],
          }),
        },
      );
      expect(strict).toMatchObject({ _tag: "Failure", failure: { _tag: tag } });
    });
  }

  test("uploads named images in Worker multipart metadata", async () => {
    const { strict } = await runValidationModes(
      putScript({
        accountId: "account",
        scriptName: "worker",
        metadata: {
          mainModule: "index.js",
          containers: [
            {
              className: "Sandbox",
              name: "sandbox",
              images: { node: "digest" },
            },
          ],
        },
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.body._tag).toBe("FormData");
        if (request.body._tag === "FormData") {
          const metadata = request.body.formData.get("metadata");
          expect(typeof metadata).toBe("string");
          expect(JSON.parse(metadata as string).containers).toEqual([
            {
              class_name: "Sandbox",
              name: "sandbox",
              images: { node: "digest" },
            },
          ]);
        }
        return { body: envelope({ id: "worker", startup_time_ms: 0 }) };
      },
    );
    expect(strict._tag).toBe("Success");
  });
});
