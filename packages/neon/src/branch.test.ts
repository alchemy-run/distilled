import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Result from "effect/Result";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { fromApiKey } from "./credentials.ts";
import { Retry } from "./retry.ts";
import * as Neon from "./services/neon.ts";

const request = {
  project_id: "project-fixture",
  branch: { name: "existing-branch" },
};

const harness = (status: number, message: string) =>
  Layer.mergeAll(
    fromApiKey({ apiKey: "fixture-account-secret" }),
    Layer.succeed(Retry, { while: () => false }),
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          expect(request.method).toBe("POST");
          expect(new URL(request.url).pathname).toBe(
            "/api/v2/projects/project-fixture/branches",
          );
          return HttpClientResponse.fromWeb(
            request,
            Response.json({ message }, { status }),
          );
        }),
      ),
    ),
  );

test("createProjectBranch decodes HTTP 409 with its generated Conflict class", () =>
  Effect.runPromise(
    Effect.gen(function* () {
      let handled = false;
      yield* Neon.createProjectBranch(request).pipe(
        Effect.catchTag("Conflict", (error) =>
          Effect.sync(() => {
            handled = true;
            expect(error).toBeInstanceOf(Neon.Conflict);
            expect(error.message).toBe(
              "branch with the same name already exists",
            );
          }),
        ),
      );
      expect(handled).toBe(true);
    }).pipe(
      Effect.provide(harness(409, "branch with the same name already exists")),
    ),
  ));

test("createProjectBranch preserves other HTTP error classifications", () =>
  Effect.runPromise(
    Effect.gen(function* () {
      const result = yield* Neon.createProjectBranch(request).pipe(
        Effect.result,
      );
      expect(Result.isFailure(result)).toBe(true);
      if (Result.isFailure(result)) {
        expect(result.failure._tag).toBe("NotFound");
      }
    }).pipe(Effect.provide(harness(404, "project not found"))),
  ));
