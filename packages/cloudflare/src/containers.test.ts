import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import {
  createDurableObjectContainerApplication,
  getContainerApplication,
  listContainerApplications,
  prepareContainerImage,
  updateContainerApplication,
} from "./services/containers.ts";

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
const configuration = {
  wranglerSsh: { enabled: true, port: 2222 },
  authorizedKeys: [{ name: "review", publicKey: "ssh-ed25519 test" }],
  experimentalFlags: [],
};
const wireConfiguration = {
  wrangler_ssh: { enabled: true, port: 2222 },
  authorized_keys: [{ name: "review", public_key: "ssh-ed25519 test" }],
  experimental_flags: [],
};
const image = "registry.cloudflare.com/account/sandbox@sha256:digest";

describe("Durable Object Container API", () => {
  test("creates an application without a deployment image or max_instances", async () => {
    const { lenient, strict } = await runValidationModes(
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
    const expected = {
      _tag: "Success",
      success: { configuration: {}, schedulingPolicy: "durable_object" },
    };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("serializes native SSH configuration and application-wide logging", async () => {
    const { lenient, strict } = await runValidationModes(
      createDurableObjectContainerApplication({
        accountId: "account",
        name: "sandbox",
        schedulingPolicy: "durable_object",
        durableObjects: { namespaceId: "namespace" },
        configuration,
        observability: { logs: { enabled: true } },
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.body._tag).toBe("Uint8Array");
        if (request.body._tag === "Uint8Array") {
          expect(
            JSON.parse(new TextDecoder().decode(request.body.body)),
          ).toEqual({
            name: "sandbox",
            scheduling_policy: "durable_object",
            durable_objects: { namespace_id: "namespace" },
            configuration: wireConfiguration,
            observability: { logs: { enabled: true } },
          });
        }
        return {
          body: envelope({
            ...application,
            configuration: wireConfiguration,
            observability: { logs: { enabled: true } },
          }),
        };
      },
    );
    const expected = {
      _tag: "Success",
      success: { configuration, observability: { logs: { enabled: true } } },
    };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  test("updates native configuration without a deployment image", async () => {
    const { lenient, strict } = await runValidationModes(
      updateContainerApplication({
        accountId: "account",
        applicationId: "namespace",
        configuration,
        observability: { logs: { enabled: false } },
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.method).toBe("PATCH");
        expect(request.url).toEndWith(
          "/accounts/account/containers/applications/namespace",
        );
        expect(request.body._tag).toBe("Uint8Array");
        if (request.body._tag === "Uint8Array") {
          expect(
            JSON.parse(new TextDecoder().decode(request.body.body)),
          ).toEqual({
            configuration: wireConfiguration,
            observability: { logs: { enabled: false } },
          });
        }
        return {
          body: envelope({ ...application, configuration: wireConfiguration }),
        };
      },
    );
    const expected = { _tag: "Success", success: { configuration } };
    expect(lenient).toMatchObject(expected);
    expect(strict).toMatchObject(expected);
  });

  for (const [name, operation, result] of [
    [
      "reads",
      getContainerApplication({
        accountId: "account",
        applicationId: "namespace",
      }).pipe(Effect.map((item) => [item])),
      application,
    ],
    [
      "lists",
      listContainerApplications({ accountId: "account" }),
      [application],
    ],
  ] as const) {
    test(`${name} native applications without fleet-only fields`, async () => {
      const { lenient, strict } = await runValidationModes(
        operation.pipe(
          Retry.none,
          Effect.provide(credentials({ apiToken: "test" })),
        ),
        { body: envelope(result) },
      );
      const expected = {
        _tag: "Success",
        success: [
          {
            id: "namespace",
            configuration: {},
            durableObjects: { namespaceId: "namespace" },
          },
        ],
      };
      expect(lenient).toMatchObject(expected);
      expect(strict).toMatchObject(expected);
    });
  }

  for (const status of ["pending", "ready", "error"]) {
    test(`decodes image preparation ${status}`, async () => {
      const { lenient, strict } = await runValidationModes(
        prepareContainerImage({
          accountId: "account",
          image,
        }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
        (request) => {
          expect(request.method).toBe("POST");
          expect(request.url).toEndWith(
            "/accounts/account/containers/image-preparations",
          );
          expect(request.body._tag).toBe("Uint8Array");
          if (request.body._tag === "Uint8Array") {
            expect(
              JSON.parse(new TextDecoder().decode(request.body.body)),
            ).toEqual({ image });
          }
          return {
            body: envelope({
              image,
              status,
              artifact_digest: "digest",
              reason: status === "error" ? "unsupported image" : undefined,
            }),
          };
        },
      );
      const expected = {
        _tag: "Success",
        success: {
          image,
          status,
          artifactDigest: "digest",
          ...(status === "error" ? { reason: "unsupported image" } : {}),
        },
      };
      expect(lenient).toMatchObject(expected);
      expect(strict).toMatchObject(expected);
    });
  }

  // Live API responses captured on 2026-09-30. Code 1000 alone is not image-specific.
  for (const message of [
    '{"error":"image must be digest-pinned and hosted in a supported managed registry"}',
    '{"error":"image does not exist in this account"}',
  ] as const) {
    test(`types the observed image preparation rejection: ${message}`, async () => {
      const { lenient, strict } = await runValidationModes(
        prepareContainerImage({ accountId: "account", image: "image" }).pipe(
          Retry.none,
          Effect.provide(credentials({ apiToken: "test" })),
        ),
        {
          status: 400,
          body: JSON.stringify({
            success: false,
            errors: [{ code: 1000, message }],
          }),
        },
      );
      const expected = {
        _tag: "Failure",
        failure: {
          _tag: "ContainerImagePreparationInvalidImage",
          code: 1000,
          message,
        },
      };
      expect(lenient).toMatchObject(expected);
      expect(strict).toMatchObject(expected);
    });
  }

  for (const [name, status, code, message, tag] of [
    [
      "missing image field",
      400,
      1602,
      '{"error":"VALIDATE_INPUT","details":{"image":"invalid input: expected string, received undefined"}}',
      "BadRequest",
    ],
    [
      "different error message",
      400,
      1000,
      "Invalid request body",
      "BadRequest",
    ],
    [
      "different error code",
      400,
      1001,
      '{"error":"image does not exist in this account"}',
      "BadRequest",
    ],
    [
      "different HTTP status",
      403,
      1000,
      '{"error":"image does not exist in this account"}',
      "Forbidden",
    ],
  ] as const) {
    test(`keeps ${name} distinct from an invalid image`, async () => {
      const { lenient, strict } = await runValidationModes(
        prepareContainerImage({ accountId: "account", image }).pipe(
          Retry.none,
          Effect.provide(credentials({ apiToken: "test" })),
        ),
        {
          status,
          body: JSON.stringify({ success: false, errors: [{ code, message }] }),
        },
      );
      const expected = { _tag: "Failure", failure: { _tag: tag, message } };
      expect(lenient).toMatchObject(expected);
      expect(strict).toMatchObject(expected);
    });
  }
});
