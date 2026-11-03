import { inspect } from "node:util";
import { References } from "effect";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as Credentials from "../src/credentials-service.ts";
import { ParseError } from "../src/errors.ts";
import { createFunction } from "../src/services/lambda.ts";
import { getSecretValue, putSecretValue } from "../src/services/secrets-manager.ts";

const SECRET = "hunter2-SENTINEL-secret-value";
const PLAIN = "plain-secret-SENTINEL-string";

const mockClient = (respond: object, sent: Array<string>) =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) => {
      // The request actually sent, to show redaction never touches it.
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

/**
 * Runs `effect` at Debug level against a canned response and returns every
 * log line it emitted, rendered the way a log sink would.
 */
const captureDebugLogs = async (effect: Effect.Effect<unknown, unknown, any>, respond: object) => {
  const lines: Array<string> = [];
  const sent: Array<string> = [];
  const capture = Logger.layer([
    Logger.make(({ message }) => {
      lines.push(inspect(message, { depth: null, maxStringLength: null }));
    }),
  ]);
  await Effect.runPromise(
    effect.pipe(
      Effect.provide(Layer.mergeAll(mockClient(respond, sent), Credentials.mock, capture)),
      Effect.provideService(References.MinimumLogLevel, "Debug"),
    ) as Effect.Effect<unknown, never, never>,
  );
  return { logs: lines, all: lines.join("\n"), sent: sent.join("\n") };
};

const line = (logs: ReadonlyArray<string>, message: string) =>
  logs.find((l) => l.includes(`'${message}'`)) ?? "";

describe("AWS protocol debug logging", () => {
  test("does not log secret request values passed as Redacted", async () => {
    const { all, sent } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretString: Redacted.make(SECRET) }),
      { Name: "app/db" },
    );
    expect(all).toContain("Built Request");
    expect(all).not.toContain(SECRET);
    // The request on the wire still carries the real value.
    expect(sent).toContain(SECRET);
  });

  test("does not log secret request values passed as plain strings", async () => {
    const { all, sent } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretString: PLAIN }),
      { Name: "app/db" },
    );
    expect(all).not.toContain(PLAIN);
    expect(sent).toContain(PLAIN);
  });

  test("redacts the whole built request and only the sensitive members of the payload", async () => {
    const { logs } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db-control", SecretString: PLAIN }),
      { Name: "app/db" },
    );
    const payload = line(logs, "Payload");
    expect(payload).toContain("SecretId: 'app/db-control'");
    expect(payload).toContain("SecretString: <redacted>");
    const built = line(logs, "Built Request");
    expect(built).toContain("method: 'POST'");
    expect(built).toContain("body: '[REDACTED]'");
    expect(built).toContain("headers: '[REDACTED]'");
    expect(built).not.toContain("app/db-control");
  });

  test("does not log secret binary values", async () => {
    const bytes = new TextEncoder().encode(SECRET);
    const { all, sent } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretBinary: Redacted.make(bytes) }),
      { Name: "app/db" },
    );
    expect(all).not.toContain(Buffer.from(bytes).toString("base64"));
    expect(sent).toContain(Buffer.from(bytes).toString("base64"));
  });

  test("does not log nested environment variable values", async () => {
    const { logs, all, sent } = await captureDebugLogs(
      createFunction({
        FunctionName: "worker",
        Role: "arn:aws:iam::123456789012:role/worker",
        Code: { ZipFile: new Uint8Array([1]) },
        Environment: { Variables: { API_KEY: SECRET, WRAPPED: Redacted.make(PLAIN) } },
      }),
      { FunctionName: "worker" },
    );
    expect(line(logs, "Payload")).toContain("FunctionName: 'worker'");
    expect(all).not.toContain(SECRET);
    expect(all).not.toContain(PLAIN);
    expect(sent).toContain(SECRET);
    expect(sent).toContain(PLAIN);
  });

  // Input and output are redacted independently, each by its own schema.

  test("a secret input does not redact a response that holds no secret", async () => {
    const { logs } = await captureDebugLogs(
      putSecretValue({ SecretId: "app/db", SecretString: Redacted.make(SECRET) }),
      { Name: "app/db-response", VersionId: "v-1" },
    );
    const parsed = line(logs, "Parsed Response");
    expect(parsed).toContain("Name: 'app/db-response'");
    expect(parsed).toContain("VersionId: 'v-1'");
  });

  test("a secret output does not redact a request that holds no secret", async () => {
    const { logs, all } = await captureDebugLogs(getSecretValue({ SecretId: "app/db-request" }), {
      Name: "app/db",
      SecretString: SECRET,
    });
    expect(line(logs, "Payload")).toContain("SecretId: 'app/db-request'");
    expect(line(logs, "Built Request")).toContain('"SecretId":"app/db-request"');
    expect(line(logs, "Parsed Response")).toContain("SecretString: <redacted>");
    expect(all).not.toContain(SECRET);
  });
});

describe("AWS input encode failures", () => {
  const encodeError = (effect: Effect.Effect<unknown, unknown, any>) =>
    Effect.runPromise(
      effect.pipe(
        Effect.flip,
        Effect.provide(Layer.mergeAll(mockClient({}, []), Credentials.mock)),
      ) as Effect.Effect<unknown, never, never>,
    );

  test("withholds the value when the input can hold a secret", async () => {
    const error = await encodeError(
      putSecretValue({ SecretId: "app/db", SecretString: 424242 as unknown as string }),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).toContain("[REDACTED]");
    expect((error as ParseError).message).not.toContain("424242");
  });

  test("quotes the value when the input holds no secret", async () => {
    const error = await encodeError(getSecretValue({ SecretId: 424242 as unknown as string }));
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).toContain("424242");
  });
});
