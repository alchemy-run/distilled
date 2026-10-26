import { runValidationModes } from "@distilled.cloud/dev/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import {
  createContainerApplication,
  createDurableObjectContainerApplication,
  getContainerApplication,
  listContainerApplications,
  updateContainerApplication,
} from "../src/services/containers.ts";
import { putScript } from "../src/services/workers.ts";

const envelope = (result: unknown) =>
  JSON.stringify({ success: true, errors: [], messages: [], result });

const withCredentials = Effect.provide(credentials({ apiToken: Redacted.make("test") }));

const bodyOf = (request: { body: { _tag: string; body?: unknown } }) =>
  request.body._tag === "Uint8Array" && request.body.body instanceof Uint8Array
    ? JSON.parse(new TextDecoder().decode(request.body.body))
    : undefined;

// A durable_object application as the live API returned it on 2026-10-01
// (https://github.com/alchemy-run/distilled/pull/685#issuecomment-5959230924).
const durableObjectApp = {
  id: "a7ede5d397a342dc8ca7dd33d0654382",
  created_at: "2026-10-01T06:53:17.196999936Z",
  updated_at: "2026-10-01T06:53:17.196999936Z",
  account_id: "account",
  name: "hub-mcp-controlplane",
  scheduling_policy: "durable_object",
  durable_objects: { namespace_id: "a7ede5d397a342dc8ca7dd33d0654382" },
  configuration: {},
  observability: { logs: { enabled: true } },
  health: { instances: { active: 1, starting: 0 } },
};

// A scheduler-placed application, shaped like the API reference's
// CcScheduledApplication example.
const scheduledApp = {
  id: "scheduled",
  account_id: "account",
  configuration: {
    image: "registry.cloudflare.com/account/app:1",
    instance_type: "lite",
    environment_variables: [{ name: "MODE", value: "prod" }],
  },
  created_at: "2021-04-01T12:32:41.488Z",
  updated_at: "2021-04-01T12:32:41.488Z",
  instances: 2,
  max_instances: 5,
  version: 3,
  name: "fleet",
  scheduling_policy: "default",
  constraints: { regions: ["WNAM"] },
  health: { errors: [], instances: { active: 1, assigned: 1 } },
};

const durableObjectDecoded = {
  id: "a7ede5d397a342dc8ca7dd33d0654382",
  accountId: "account",
  createdAt: "2026-10-01T06:53:17.196999936Z",
  updatedAt: "2026-10-01T06:53:17.196999936Z",
  name: "hub-mcp-controlplane",
  schedulingPolicy: "durable_object",
  durableObjects: { namespaceId: "a7ede5d397a342dc8ca7dd33d0654382" },
  configuration: {},
  observability: { logs: { enabled: true } },
  health: { instances: { active: 1, starting: 0 } },
};

const scheduledDecoded = {
  id: "scheduled",
  accountId: "account",
  schedulingPolicy: "default",
  configuration: {
    image: "registry.cloudflare.com/account/app:1",
    instanceType: "lite",
    environmentVariables: [{ name: "MODE", value: "prod" }],
  },
  instances: 2,
  maxInstances: 5,
  version: 3,
  constraints: { regions: ["WNAM"] },
  health: { errors: [], instances: { active: 1, assigned: 1 } },
};

const get = getContainerApplication({ accountId: "account", applicationId: "app" }).pipe(
  Retry.none,
  withCredentials,
);

describe("Container applications, one response type per scheduling policy", () => {
  test("decodes a durable_object application in every validation mode", async () => {
    const { lenient, strict } = await runValidationModes(get, {
      body: envelope(durableObjectApp),
    });
    expect(lenient).toMatchObject({ _tag: "Success", success: durableObjectDecoded });
    expect(strict).toMatchObject({ _tag: "Success", success: durableObjectDecoded });
  });

  test("accepts a durable_object application without configuration", async () => {
    const { configuration: _, ...noConfiguration } = durableObjectApp;
    const { strict } = await runValidationModes(get, { body: envelope(noConfiguration) });
    expect(strict).toMatchObject({ _tag: "Success", success: { id: durableObjectApp.id } });
    if (strict._tag === "Success") expect(strict.success.configuration).toBeUndefined();
  });

  test("decodes a scheduler-placed application", async () => {
    const { strict } = await runValidationModes(get, { body: envelope(scheduledApp) });
    expect(strict).toMatchObject({ _tag: "Success", success: scheduledDecoded });
  });

  test("lists both kinds of application", async () => {
    const { strict } = await runValidationModes(
      listContainerApplications({ accountId: "account" }).pipe(Retry.none, withCredentials),
      { body: envelope([durableObjectApp, scheduledApp]) },
    );
    expect(strict).toMatchObject({
      _tag: "Success",
      success: [durableObjectDecoded, scheduledDecoded],
    });
  });

  test("sends a durable_object create without scheduler fields", async () => {
    let sent: unknown;
    const { strict } = await runValidationModes(
      createDurableObjectContainerApplication({
        accountId: "account",
        name: "native-example",
        schedulingPolicy: "durable_object",
        durableObjects: { namespaceId: "namespace" },
        configuration: { wranglerSsh: { enabled: true } },
      }).pipe(Retry.none, withCredentials),
      (request) => {
        expect(request.method).toBe("POST");
        sent = bodyOf(request);
        return { body: envelope(durableObjectApp) };
      },
    );
    expect(sent).toEqual({
      name: "native-example",
      scheduling_policy: "durable_object",
      durable_objects: { namespace_id: "namespace" },
      configuration: { wrangler_ssh: { enabled: true } },
    });
    expect(strict._tag).toBe("Success");
  });

  test("sends a scheduled create in wire names", async () => {
    let sent: unknown;
    await runValidationModes(
      createContainerApplication({
        accountId: "account",
        name: "fleet",
        maxInstances: 5,
        configuration: {
          image: "registry.cloudflare.com/account/app:1",
          instanceType: "lite",
          environmentVariables: [{ name: "MODE", value: "prod" }],
        },
        constraints: { regions: ["WNAM"] },
      }).pipe(Retry.none, withCredentials),
      (request) => {
        sent = bodyOf(request);
        return { body: envelope(scheduledApp) };
      },
    );
    expect(sent).toEqual({
      name: "fleet",
      max_instances: 5,
      configuration: {
        image: "registry.cloudflare.com/account/app:1",
        instance_type: "lite",
        environment_variables: [{ name: "MODE", value: "prod" }],
      },
      constraints: { regions: ["WNAM"] },
    });
  });
});

describe("Container application rollout grace period", () => {
  test("sends rollout_active_grace_period on create", async () => {
    let sent: unknown;
    await runValidationModes(
      createContainerApplication({
        accountId: "account",
        name: "fleet",
        maxInstances: 5,
        configuration: { image: "registry.cloudflare.com/account/app:1" },
        rolloutActiveGracePeriod: 300,
      }).pipe(Retry.none, withCredentials),
      (request) => {
        sent = bodyOf(request);
        return { body: envelope(scheduledApp) };
      },
    );
    expect(sent).toMatchObject({ rollout_active_grace_period: 300 });
  });

  test("sends rollout_active_grace_period on update", async () => {
    let sent: unknown;
    await runValidationModes(
      updateContainerApplication({
        accountId: "account",
        applicationId: "scheduled",
        rolloutActiveGracePeriod: 0,
      }).pipe(Retry.none, withCredentials),
      (request) => {
        expect(request.method).toBe("PATCH");
        sent = bodyOf(request);
        return { body: envelope({ ...scheduledApp, rollout_active_grace_period: 0 }) };
      },
    );
    // 0 is the platform default, and has to reach the wire to clear a grace period.
    expect(sent).toEqual({ rollout_active_grace_period: 0 });
  });
});

describe("Worker container metadata", () => {
  test("keeps the named image map's keys unchanged", async () => {
    let metadata: unknown;
    await runValidationModes(
      putScript({
        accountId: "account",
        scriptName: "worker",
        metadata: {
          mainModule: "index.js",
          containers: [
            {
              className: "NativeExample",
              images: {
                base: "registry.cloudflare.com/account/repo@sha256:abc",
                className: "registry.cloudflare.com/account/other@sha256:def",
              },
            },
          ],
        },
        files: [new File(["export default {}"], "index.js")],
      }).pipe(Retry.none, withCredentials),
      (request) => {
        const body = request.body as { _tag: string; formData?: FormData };
        const raw = body.formData?.get("metadata");
        metadata = typeof raw === "string" ? JSON.parse(raw) : undefined;
        return { body: envelope({}) };
      },
    );
    expect(metadata).toMatchObject({
      main_module: "index.js",
      containers: [
        {
          class_name: "NativeExample",
          images: {
            base: "registry.cloudflare.com/account/repo@sha256:abc",
            className: "registry.cloudflare.com/account/other@sha256:def",
          },
        },
      ],
    });
  });
});
