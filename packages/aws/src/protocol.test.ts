import { inspect } from "node:util";
import { References } from "effect";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as Credentials from "./credentials-service.ts";
import { createFunction } from "./services/lambda.ts";
import { getSecretValue, putSecretValue } from "./services/secrets-manager.ts";

const SECRET = "hunter2-SENTINEL-secret-value";
const PLAIN = "plain-secret-SENTINEL-string";

/**
 * Runs `effect` at Debug level against a canned Secrets Manager response and
 * returns every log line it emitted, rendered the way a log sink would.
 */
const captureDebugLogs = async (effect: Effect.Effect<unknown, unknown, any>, respond: object) => {
  const lines: Array<string> = [];
  const sent: Array<string> = [];
  const capture = Logger.layer([
    Logger.make(({ message }) => {
      lines.push(inspect(message, { depth: null, maxStringLength: null }));
    }),
  ]);
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) => {
      // The request actually sent, to show masking never touches it.
      if (request.body._tag === "Uint8Array") {
        sent.push(new TextDecoder().decode(request.body.body));
      }
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(respond), {
            status: 200,
            headers: { "content-type": "application/x-amz-json-1.1" },
          }),
        ),
      );
    }),
  );
  await Effect.runPromise(
    effect.pipe(
      Effect.provide(Layer.mergeAll(client, Credentials.mock, capture)),
      Effect.provideService(References.MinimumLogLevel, "Debug"),
    ) as Effect.Effect<unknown, never, never>,
  );
  return { logs: lines.join("\n"), sent: sent.join("\n") };
};

describe("AWS protocol debug logging", () => {
  test("does not log secret request values passed as Redacted", async () => {
    const { logs, sent } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretString: Redacted.make(SECRET) }),
      { Name: "app/db" },
    );
    expect(logs).toContain("Built Request");
    expect(logs).not.toContain(SECRET);
    // The request on the wire still carries the real value.
    expect(sent).toContain(SECRET);
  });

  test("does not log secret request values passed as plain strings", async () => {
    const { logs } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretString: PLAIN }),
      { Name: "app/db" },
    );
    expect(logs).not.toContain(PLAIN);
  });

  test("does not log secret response values", async () => {
    const { logs } = await captureDebugLogs(getSecretValue({ SecretId: "app/db" }), {
      Name: "app/db",
      SecretString: SECRET,
    });
    expect(logs).toContain("Parsed Response");
    expect(logs).not.toContain(SECRET);
  });

  test("still logs non-secret request and response fields", async () => {
    const { logs } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db-control", SecretString: Redacted.make(SECRET) }),
      { Name: "app/db-control-response" },
    );
    expect(logs).toContain("app/db-control");
    expect(logs).toContain("app/db-control-response");
  });

  test("does not log secret binary values", async () => {
    const bytes = new TextEncoder().encode(SECRET);
    const { logs, sent } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretBinary: Redacted.make(bytes) }),
      { Name: "app/db" },
    );
    expect(logs).not.toContain(Buffer.from(bytes).toString("base64"));
    expect(sent).toContain(Buffer.from(bytes).toString("base64"));
  });

  test("does not log nested environment variable values", async () => {
    const { logs, sent } = await captureDebugLogs(
      createFunction({
        FunctionName: "worker",
        Role: "arn:aws:iam::123456789012:role/worker",
        Code: { ZipFile: new Uint8Array([1]) },
        Environment: { Variables: { API_KEY: SECRET, WRAPPED: Redacted.make(PLAIN) } },
      }),
      { FunctionName: "worker" },
    );
    expect(logs).toContain("worker");
    expect(logs).not.toContain(SECRET);
    expect(logs).not.toContain(PLAIN);
    expect(sent).toContain(SECRET);
    expect(sent).toContain(PLAIN);
  });

  test("logs the idempotency token the request is sent with", async () => {
    const { logs, sent } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretString: Redacted.make(SECRET) }),
      { Name: "app/db" },
    );
    const token = /"ClientRequestToken":"([^"]+)"/.exec(sent)?.[1];
    expect(token).toBeDefined();
    expect(logs).toContain(token);
  });
});
