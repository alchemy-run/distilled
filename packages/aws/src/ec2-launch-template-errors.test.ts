import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { Credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import * as ec2 from "./services/ec2.ts";

const id = "lt-0ac8192309244d619";
const message = `The specified launch template, with template ID ${id}, does not exist.`;

describe("EC2 launch template not-found wire errors", () => {
  for (const action of [
    "DescribeLaunchTemplates",
    "DeleteLaunchTemplate",
  ] as const) {
    test(`${action} types InvalidLaunchTemplateId.NotFound`, () =>
      Effect.runPromise(
        Effect.gen(function* () {
          const client = HttpClient.make((request, url) =>
            Effect.sync(() => {
              expect(url.hostname).toBe("ec2.us-west-2.amazonaws.com");
              if (request.body._tag !== "Uint8Array") {
                throw new Error("Expected an EC2 Query request body");
              }
              const body = new URLSearchParams(
                new TextDecoder().decode(request.body.body),
              );
              expect(body.get("Action")).toBe(action);
              expect(
                body.get(
                  action === "DescribeLaunchTemplates"
                    ? "LaunchTemplateId.1"
                    : "LaunchTemplateId",
                ),
              ).toBe(id);
              return HttpClientResponse.fromWeb(
                request,
                new Response(
                  `<Response><Errors><Error><Code>InvalidLaunchTemplateId.NotFound</Code><Message>${message}</Message></Error></Errors><RequestID>test</RequestID></Response>`,
                  { status: 400, headers: { "content-type": "text/xml" } },
                ),
              );
            }),
          );
          const operation: Effect.Effect<
            void,
            ec2.DescribeLaunchTemplatesError | ec2.DeleteLaunchTemplateError,
            Credentials | HttpClient.HttpClient
          > =
            action === "DescribeLaunchTemplates"
              ? ec2
                  .describeLaunchTemplates({ LaunchTemplateIds: [id] })
                  .pipe(Effect.asVoid)
              : ec2
                  .deleteLaunchTemplate({ LaunchTemplateId: id })
                  .pipe(Effect.asVoid);
          const result = yield* operation.pipe(
            Retry.none,
            Effect.provideService(HttpClient.HttpClient, client),
            Effect.provideService(
              Credentials,
              Effect.succeed({
                accessKeyId: Redacted.make("AKIATEST"),
                secretAccessKey: Redacted.make("test-secret"),
                sessionToken: undefined,
                region: "us-west-2",
              }),
            ),
            Effect.result,
          );
          expect(Result.isFailure(result)).toBe(true);
          if (Result.isFailure(result)) {
            expect(result.failure).toBeInstanceOf(
              ec2.InvalidLaunchTemplateIdNotFound,
            );
            expect(result.failure._tag).toBe(
              "InvalidLaunchTemplateId.NotFound",
            );
            expect(result.failure.message).toBe(message);
          }
        }),
      ));
  }
});
