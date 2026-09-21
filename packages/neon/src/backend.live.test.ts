import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schedule from "effect/Schedule";
import * as Schema from "effect/Schema";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import { CredentialsFromEnv } from "./credentials.ts";
import { Retry } from "./retry.ts";
import * as Neon from "./services/neon.ts";

// Fixed ZIP containing a native Node 24 Fetch handler in index.mjs.
const archive =
  "UEsDBBQAAAAAAAAAIVx6Tx7PbAAAAGwAAAAJAAAAaW5kZXgubWpzZXhwb3J0IGRlZmF1bHQgeyBmZXRjaCgpIHsgcmV0dXJuIFJlc3BvbnNlLmpzb24oe29rOnRydWUsIHZhbHVlOnByb2Nlc3MuZW52LkRJU1RJTExFRF9QUk9CRSA/PyBudWxsfSk7IH0gfTsKUEsBAhQDFAAAAAAAAAAhXHpPHs9sAAAAbAAAAAkAAAAAAAAAAAAAAIABAAAAAGluZGV4Lm1qc1BLBQYAAAAAAQABADcAAACTAAAAAAA=";
const projectName = "distilled-neon-backend-companion";
const live = Layer.mergeAll(
  CredentialsFromEnv,
  FetchHttpClient.layer,
  Layer.succeed(Retry, { while: () => false }),
);

const runBackend = (verifyEnvironment: boolean) =>
  Effect.runPromise(
    Effect.gen(function* () {
      const name = verifyEnvironment ? `${projectName}-env` : projectName;
      const existing = yield* Neon.listProjects({ search: name, limit: 400 });
      expect(existing.projects.filter((project) => project.name === name)).toHaveLength(0);
      const created = yield* Neon.createProject({
        project: { name, region_id: "aws-us-east-2" },
      });
      const project_id = created.project.id;
      yield* Effect.gen(function* () {
        const branches = yield* Neon.listProjectBranches({ project_id });
        const branch = branches.branches.find((item) => item.default);
        expect(branch).toBeDefined();
        const scope = { project_id, branch_id: branch!.id };
        const credential = yield* Neon.createCredential({
          ...scope,
          name: "sdk-recovery",
          scopes: ["storage:read"],
          principal_type: "user",
        });
        expect(Redacted.isRedacted(credential.api_token)).toBe(true);
        expect(Redacted.isRedacted(credential.s3_secret_access_key)).toBe(true);
        const revealed = yield* Neon.revealCredential({
          ...scope,
          token_id: credential.token_id,
        });
        expect(Redacted.isRedacted(revealed.api_token)).toBe(true);
        expect(Redacted.isRedacted(revealed.s3_secret_access_key)).toBe(true);
        expect(
          Redacted.isRedacted(credential.api_token) &&
            Redacted.isRedacted(revealed.api_token) &&
            Redacted.value(credential.api_token) === Redacted.value(revealed.api_token),
        ).toBe(true);
        expect(
          Redacted.isRedacted(credential.s3_secret_access_key) &&
            Redacted.isRedacted(revealed.s3_secret_access_key) &&
            Redacted.value(credential.s3_secret_access_key) ===
              Redacted.value(revealed.s3_secret_access_key),
        ).toBe(true);
        yield* Neon.revokeCredential({
          ...scope,
          token_id: credential.token_id,
        });
        const revoked = (yield* Neon.listCredentials(scope)).credentials.find(
          (item) => item.token_id === credential.token_id,
        );
        expect(revoked?.revoked_at).toBeTruthy();

        const target = { ...scope, slug: "sdkprobe" };
        const missingFunction = yield* Neon.getProjectBranchFunction(target).pipe(Effect.flip);
        expect(missingFunction._tag).toBe("NotFound");
        console.log("Missing Function:", missingFunction._tag, missingFunction.message);
        const missingTrigger = yield* Neon.getProjectBranchTrigger({
          ...scope,
          trigger_id: "sdk-missing-trigger",
        }).pipe(Effect.flip);
        expect(missingTrigger._tag).toBe("NotFound");
        console.log("Missing Trigger:", missingTrigger._tag, missingTrigger.message);
        const zip = yield* Effect.sync(
          () =>
            new File([Buffer.from(archive, "base64")], "bundle.zip", {
              type: "application/zip",
            }),
        );
        const deployed = yield* Neon.createProjectBranchFunctionDeployment({
          ...target,
          zip,
          runtime: "nodejs24",
          environment: JSON.stringify({ DISTILLED_PROBE: "first" }),
        });
        yield* Schema.decodeUnknownEffect(Neon.NeonFunctionDeployment)(deployed.deployment);
        yield* Schema.decodeUnknownEffect(Neon.NeonFunction)(
          (yield* Neon.getProjectBranchFunction(target)).function,
        );
        const waitFor = (id: number) =>
          Neon.getProjectBranchFunction(target).pipe(
            Effect.repeat({
              schedule: Schedule.spaced("3 seconds"),
              times: 8,
              until: ({ function: fn }) =>
                fn.active_deployment?.id === id || fn.current_deployment?.status === "failed",
            }),
          );
        const first = (yield* waitFor(deployed.deployment.id)).function;
        yield* Schema.decodeUnknownEffect(Neon.NeonFunction)(first);
        expect(first.active_deployment?.id).toBe(deployed.deployment.id);
        const http = yield* HttpClient.HttpClient;
        const response = yield* http.get(first.invocation_url);
        expect(response.status).toBe(200);
        expect(yield* response.json).toEqual({ ok: true, value: "first" });
        const schedule = yield* Neon.createProjectBranchTrigger({
          ...scope,
          body: {
            type: "schedule",
            function_slug: target.slug,
            name: "sdk-disabled-schedule",
            schedule: { cron: "0 0 1 1 *" },
            enabled: false,
          },
        });
        expect(schedule.trigger.type).toBe("schedule");
        yield* Schema.decodeUnknownEffect(Neon.Trigger)(schedule.trigger);
        const triggerTarget = {
          ...scope,
          trigger_id: schedule.trigger.trigger_id,
        };
        yield* Neon.updateProjectBranchTrigger({
          ...triggerTarget,
          body: { type: "schedule", name: "sdk-renamed-schedule" },
        });
        expect((yield* Neon.getProjectBranchTrigger(triggerTarget)).trigger.name).toBe(
          "sdk-renamed-schedule",
        );
        expect(
          (yield* Neon.listProjectBranchTriggers(scope)).triggers.some(
            (item) => item.trigger_id === schedule.trigger.trigger_id,
          ),
        ).toBe(true);
        yield* Neon.deleteProjectBranchTrigger(triggerTarget);
        const bucket_name = "sdk-binary-probe";
        yield* Neon.createProjectBranchBucket({ ...scope, name: bucket_name });
        const uploadTrigger = yield* Neon.createProjectBranchTrigger({
          ...scope,
          body: {
            type: "storage_object_created",
            function_slug: target.slug,
            name: "sdk-disabled-upload",
            storage_object_created: { bucket_name, prefix: "nested/" },
            enabled: false,
          },
        });
        expect(uploadTrigger.trigger.type).toBe("storage_object_created");
        yield* Schema.decodeUnknownEffect(Neon.Trigger)(uploadTrigger.trigger);
        yield* Neon.deleteProjectBranchTrigger({
          ...scope,
          trigger_id: uploadTrigger.trigger.trigger_id,
        });
        const object = {
          ...scope,
          bucket_name,
          object_key: "nested/probe.bin",
        };
        const bytes = new Uint8Array([0, 255, 128, 80, 75]);
        const presign = yield* Neon.presignProjectBranchBucketObject({
          ...object,
          operation: "upload",
          content_type: "application/octet-stream",
        });
        expect(Redacted.isRedacted(presign.url)).toBe(true);
        const uploadUrl = Redacted.isRedacted(presign.url)
          ? Redacted.value(presign.url)
          : presign.url;
        const uploaded = yield* http
          .execute(
            HttpClientRequest.put(uploadUrl).pipe(
              HttpClientRequest.setHeaders(presign.headers),
              HttpClientRequest.bodyUint8Array(bytes, "application/octet-stream"),
            ),
          )
          .pipe(Effect.mapError(() => new Error("Owned binary fixture upload transport failed")));
        expect(uploaded.status).toBe(200);
        expect(yield* Neon.getProjectBranchBucketObject(object)).toEqual(bytes);
        yield* Neon.deleteProjectBranchBucketObject(object);
        yield* Neon.deleteProjectBranchBucket({ ...scope, bucket_name });
        const changed = yield* Neon.createProjectBranchFunctionDeployment({
          ...target,
          environment: JSON.stringify({ DISTILLED_PROBE: "second" }),
        });
        expect(changed.deployment.id).toBeGreaterThan(deployed.deployment.id);
        const second = (yield* waitFor(changed.deployment.id)).function;
        expect(second.active_deployment?.id).toBe(changed.deployment.id);
        if (verifyEnvironment) {
          const response2 = yield* http.get(second.invocation_url).pipe(
            Effect.flatMap((response) => response.json),
            Effect.repeat({
              schedule: Schedule.spaced("2 seconds"),
              times: 8,
              until: (body) =>
                typeof body === "object" &&
                body !== null &&
                "value" in body &&
                body.value === "second",
            }),
          );
          expect(response2).toEqual({ ok: true, value: "second" });
          const removed = yield* Neon.createProjectBranchFunctionDeployment({
            ...target,
            environment: JSON.stringify({ DISTILLED_PROBE: "" }),
          });
          const third = (yield* waitFor(removed.deployment.id)).function;
          const response3 = yield* http.get(third.invocation_url).pipe(
            Effect.flatMap((response) => response.json),
            Effect.repeat({
              schedule: Schedule.spaced("2 seconds"),
              times: 8,
              until: (body) =>
                typeof body === "object" && body !== null && "value" in body && body.value === null,
            }),
          );
          expect(response3).toEqual({ ok: true, value: null });
        }
        yield* Neon.deleteProjectBranchFunction(target);
      }).pipe(Effect.ensuring(Neon.deleteProject({ project_id }).pipe(Effect.orDie)));
      const after = yield* Neon.listProjects({ search: name, limit: 400 });
      expect(after.projects.filter((project) => project.name === name)).toHaveLength(0);
    }).pipe(Effect.timeout("110 seconds"), Effect.provide(live)),
  );

const unavailable = !process.env.NEON_API_KEY || process.env.NEON_SDK_LIVE !== "1";
test.skipIf(unavailable)(
  "isolated backend: credential recovery, native ZIP, deployment metadata and trigger CRUD",
  () => runBackend(false),
  120_000,
);

// Active deployment advanced, but invocation retained "first" after eight 2s polls.
test.skipIf(unavailable || process.env.NEON_SDK_VERIFY_ENV_UPDATES !== "1")(
  "config-only environment updates and deletions reach Function invocations",
  () => runBackend(true),
  120_000,
);

const fullRedeployFixtures = [
  {
    code: "v1",
    environment: "first",
    expected: "first",
    zip: "UEsDBBQAAAAAAAAAIVwKuHF0bQAAAG0AAAAJAAAAaW5kZXgubWpzZXhwb3J0IGRlZmF1bHQgeyBmZXRjaCgpIHsgcmV0dXJuIFJlc3BvbnNlLmpzb24oe2NvZGU6InYxIix2YWx1ZTpwcm9jZXNzLmVudi5ESVNUSUxMRURfUFJPQkUgPz8gbnVsbH0pOyB9IH07ClBLAQIUAxQAAAAAAAAAIVwKuHF0bQAAAG0AAAAJAAAAAAAAAAAAAACAAQAAAABpbmRleC5tanNQSwUGAAAAAAEAAQA3AAAAlAAAAAAA",
  },
  {
    code: "v2",
    environment: "second",
    expected: "second",
    zip: "UEsDBBQAAAAAAAAAIVzJaBj3bQAAAG0AAAAJAAAAaW5kZXgubWpzZXhwb3J0IGRlZmF1bHQgeyBmZXRjaCgpIHsgcmV0dXJuIFJlc3BvbnNlLmpzb24oe2NvZGU6InYyIix2YWx1ZTpwcm9jZXNzLmVudi5ESVNUSUxMRURfUFJPQkUgPz8gbnVsbH0pOyB9IH07ClBLAQIUAxQAAAAAAAAAIVzJaBj3bQAAAG0AAAAJAAAAAAAAAAAAAACAAQAAAABpbmRleC5tanNQSwUGAAAAAAEAAQA3AAAAlAAAAAAA",
  },
  {
    code: "v3",
    environment: "",
    expected: null,
    zip: "UEsDBBQAAAAAAAAAIVyI2MCJbQAAAG0AAAAJAAAAaW5kZXgubWpzZXhwb3J0IGRlZmF1bHQgeyBmZXRjaCgpIHsgcmV0dXJuIFJlc3BvbnNlLmpzb24oe2NvZGU6InYzIix2YWx1ZTpwcm9jZXNzLmVudi5ESVNUSUxMRURfUFJPQkUgPz8gbnVsbH0pOyB9IH07ClBLAQIUAxQAAAAAAAAAIVyI2MCJbQAAAG0AAAAJAAAAAAAAAAAAAACAAQAAAABpbmRleC5tanNQSwUGAAAAAAEAAQA3AAAAlAAAAAAA",
  },
] as const;

const invocationBody = Schema.Struct({
  code: Schema.String,
  value: Schema.NullOr(Schema.String),
});

test.skipIf(unavailable || process.env.NEON_SDK_FULL_REDEPLOY !== "1")(
  "full ZIP redeployment updates code and environment, then removes a variable",
  () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const name = `${projectName}-full`;
        const existing = yield* Neon.listProjects({ search: name, limit: 400 });
        expect(existing.projects.filter((project) => project.name === name)).toHaveLength(0);
        const created = yield* Neon.createProject({
          project: { name, region_id: "aws-us-east-2" },
        });
        const project_id = created.project.id;
        const observations = yield* Effect.gen(function* () {
          const branches = yield* Neon.listProjectBranches({ project_id });
          const branch = branches.branches.find((item) => item.default);
          expect(branch).toBeDefined();
          const target = {
            project_id,
            branch_id: branch!.id,
            slug: "sdkfullprobe",
          };
          const http = yield* HttpClient.HttpClient;
          const observations: Array<{ code: string; value: string | null }> = [];
          for (const fixture of fullRedeployFixtures) {
            const zip = yield* Effect.sync(
              () =>
                new File([Buffer.from(fixture.zip, "base64")], "bundle.zip", {
                  type: "application/zip",
                }),
            );
            const deployed = yield* Neon.createProjectBranchFunctionDeployment({
              ...target,
              zip,
              runtime: "nodejs24",
              environment: JSON.stringify({
                DISTILLED_PROBE: fixture.environment,
              }),
            });
            const current = (yield* Neon.getProjectBranchFunction(target).pipe(
              Effect.repeat({
                schedule: Schedule.spaced("1 second"),
                times: 8,
                until: ({ function: fn }) =>
                  fn.active_deployment?.id === deployed.deployment.id ||
                  fn.current_deployment?.status === "failed",
              }),
            )).function;
            expect(current.active_deployment?.id).toBe(deployed.deployment.id);
            const body = yield* http.get(current.invocation_url).pipe(
              Effect.flatMap((response) => response.json),
              Effect.flatMap(Schema.decodeUnknownEffect(invocationBody)),
              Effect.repeat({
                schedule: Schedule.spaced("1 second"),
                times: 8,
                until: (body) => body.code === fixture.code && body.value === fixture.expected,
              }),
            );
            observations.push(body);
            console.log(
              "Full ZIP observation:",
              JSON.stringify({
                requestedCode: fixture.code,
                requestedEnvironment: fixture.environment,
                observed: body,
              }),
            );
          }
          return observations;
        }).pipe(Effect.ensuring(Neon.deleteProject({ project_id }).pipe(Effect.orDie)));
        const remaining = yield* Neon.listProjects({
          search: name,
          limit: 400,
        });
        expect(remaining.projects.filter((project) => project.name === name)).toHaveLength(0);
        console.log("Full ZIP probe cleanup: zero owned projects remain");
        expect(observations).toEqual(
          fullRedeployFixtures.map((fixture) => ({
            code: fixture.code,
            value: fixture.expected,
          })),
        );
      }).pipe(Effect.timeout("110 seconds"), Effect.provide(live)),
    ),
  120_000,
);
