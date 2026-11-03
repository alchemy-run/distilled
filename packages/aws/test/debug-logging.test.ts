import { inspect } from "node:util";
import { TelemetryDebug } from "@distilled.cloud/core/telemetry-debug";
import { References } from "effect";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";
import * as Credentials from "../src/credentials-service.ts";
import { createFunction } from "../src/services/lambda.ts";

// The redaction rule is core's (`core/test/sensitive.test.ts`). This checks
// that AWS `Sensitive*` schemas carry core's marker, end to end.
test("debug log lines redact AWS sensitive values; the request still carries them", async () => {
  const lines: Array<string> = [];
  const sent: Array<string> = [];
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) => {
      if (request.body._tag === "Uint8Array") {
        sent.push(new TextDecoder().decode(request.body.body));
      }
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify({ FunctionName: "worker" }), { status: 200 }),
        ),
      );
    }),
  );
  const capture = Logger.layer([
    Logger.make(({ message }) => {
      lines.push(inspect(message, { depth: null, maxStringLength: null }));
    }),
  ]);
  await Effect.runPromise(
    createFunction({
      FunctionName: "worker",
      Role: "arn:aws:iam::123456789012:role/worker",
      Code: { ZipFile: new Uint8Array([1]) },
      Environment: {
        Variables: { API_KEY: "fixture-plain", TOKEN: Redacted.make("fixture-wrapped") },
      },
    }).pipe(
      Effect.provide(Layer.mergeAll(client, Credentials.mock, TelemetryDebug.layer, capture)),
      Effect.provideService(References.MinimumLogLevel, "Debug"),
    ) as Effect.Effect<unknown, never, never>,
  );
  const logs = lines.join("\n");
  expect(logs).toContain("FunctionName: 'worker'");
  expect(logs).not.toContain("fixture-");
  expect(sent.join("\n")).toContain("fixture-plain");
  expect(sent.join("\n")).toContain("fixture-wrapped");
});
