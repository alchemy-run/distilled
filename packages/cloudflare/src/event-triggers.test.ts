import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import { createSubscription } from "./services/queues.ts";
import {
  getScriptEventTriggers,
  putScriptEventTriggers,
} from "./services/workers.ts";

const envelope = (result: unknown) =>
  JSON.stringify({ success: true, errors: [], messages: [], result });

const pushed = {
  type: "cf.artifacts.repo.pushed",
  filter: { namespace: "ns", repo_name: "repo" },
  targets: [
    { type: "workflow", workflow_name: "ci", script_name: "ci-worker" },
  ],
};

const bodyOf = (request: { body: { _tag: string; body?: unknown } }) =>
  request.body._tag === "Uint8Array" && request.body.body instanceof Uint8Array
    ? JSON.parse(new TextDecoder().decode(request.body.body))
    : undefined;

describe("Worker event triggers", () => {
  test("reads a script's triggers, as the live API answers them", async () => {
    const { strict } = await runValidationModes(
      getScriptEventTriggers({
        accountId: "account",
        scriptName: "ci-worker",
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.method).toBe("GET");
        expect(request.url).toEndWith("/accounts/account/triggers/ci-worker");
        return {
          body: envelope({ script_name: "ci-worker", triggers: [pushed] }),
        };
      },
    );
    expect(strict).toMatchObject({
      _tag: "Success",
      success: {
        scriptName: "ci-worker",
        triggers: [
          {
            type: "cf.artifacts.repo.pushed",
            filter: { namespace: "ns", repoName: "repo" },
            targets: [{ workflowName: "ci", scriptName: "ci-worker" }],
          },
        ],
      },
    });
  });

  test("replaces them with the list as the body, in wire names", async () => {
    const { strict } = await runValidationModes(
      putScriptEventTriggers({
        accountId: "account",
        scriptName: "ci-worker",
        body: [
          {
            type: "cf.artifacts.repo.pushed",
            filter: { namespace: "ns", repoName: "repo" },
            targets: [
              { type: "workflow", workflowName: "ci", scriptName: "ci-worker" },
            ],
          },
        ],
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(request.method).toBe("PUT");
        expect(request.url).toEndWith("/accounts/account/triggers/ci-worker");
        expect(bodyOf(request)).toEqual([pushed]);
        return {
          body: envelope({ script_name: "ci-worker", triggers: [pushed] }),
        };
      },
    );
    expect(strict).toMatchObject({
      _tag: "Success",
      success: {
        scriptName: "ci-worker",
        triggers: [{ type: "cf.artifacts.repo.pushed" }],
      },
    });
  });
});

describe("Artifacts event subscription sources", () => {
  test("subscribes a queue to one repository's events", async () => {
    const { strict } = await runValidationModes(
      createSubscription({
        accountId: "account",
        name: "pushes",
        enabled: true,
        source: { type: "artifacts.repo", namespace: "ns", repoName: "repo" },
        destination: { type: "queues.queue", queueId: "queue" },
        events: ["pushed"],
      }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
      (request) => {
        expect(bodyOf(request)?.source).toEqual({
          type: "artifacts.repo",
          namespace: "ns",
          repo_name: "repo",
        });
        return {
          body: envelope({
            id: "subscription",
            name: "pushes",
            enabled: true,
            source: {
              type: "artifacts.repo",
              namespace: "ns",
              repo_name: "repo",
            },
            destination: { type: "queues.queue", queue_id: "queue" },
            events: ["pushed"],
            created_at: "2026-10-03T00:00:00Z",
            modified_at: "2026-10-03T00:00:00Z",
          }),
        };
      },
    );
    expect(strict).toMatchObject({
      _tag: "Success",
      success: { source: { type: "artifacts.repo", repoName: "repo" } },
    });
  });
});

describe("Worker event trigger failures", () => {
  for (const [name, status, code, message] of [
    [
      "EventTriggerWorkflowNotFound",
      404,
      10200,
      "workflows.api.error.workflow.not_found",
    ],
    ["InvalidEventTriggers", 400, 10002, "workflows.api.error.body"],
  ] as const) {
    test(`types ${message} as ${name}`, async () => {
      const { strict } = await runValidationModes(
        putScriptEventTriggers({
          accountId: "account",
          scriptName: "ci-worker",
          body: [],
        }).pipe(Retry.none, Effect.provide(credentials({ apiToken: "test" }))),
        {
          status,
          body: JSON.stringify({
            success: false,
            messages: [],
            errors: [{ code, message }],
            result: null,
          }),
        },
      );
      expect(strict).toMatchObject({
        _tag: "Failure",
        failure: { _tag: name },
      });
    });
  }
});
