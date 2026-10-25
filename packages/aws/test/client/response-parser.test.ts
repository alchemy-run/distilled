import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { isTransientError } from "../../src/category.ts";
import { makeResponseParser } from "../../src/client/response-parser.ts";
import { InternalError, ParseError } from "../../src/errors.ts";
import {
  AccessDeniedException,
  ValidationException,
  getContactInformation,
} from "../../src/services/account.ts";
import {
  InvalidParameterValueException,
  LambdaInternalKmsError,
  createFunction,
  updateFunctionCode,
} from "../../src/services/lambda.ts";
import { describeChannel } from "../../src/services/mediapackage.ts";
import { SlowDown, putObject } from "../../src/services/s3.ts";
import { getSecretValue } from "../../src/services/secrets-manager.ts";

const parseCreateFunction = makeResponseParser({
  input: createFunction.input,
  output: createFunction.output,
  errors: [InvalidParameterValueException, LambdaInternalKmsError],
});

const invalidParameterResponse = (message: string) => ({
  status: 400,
  statusText: "Bad Request",
  headers: {
    "content-type": "application/json",
    "x-amzn-errortype": "InvalidParameterValueException",
  },
  body: JSON.stringify({ Type: "User", message }),
});

const parsePutObject = makeResponseParser({
  input: putObject.input,
  output: putObject.output,
  errors: [SlowDown],
});

const unstructuredBodies = [
  ["HTML", "<html><body>SENSITIVE_SENTINEL</body></html>"],
  ["HTML doctype", "<!doctype html><html><body>SENSITIVE_SENTINEL</body></html>"],
  ["JSON", '{"message":"SENSITIVE_SENTINEL"}'],
  ["text", "SENSITIVE_SENTINEL"],
  ["XML without code", "<Error><Message>SENSITIVE_SENTINEL</Message></Error>"],
  ["malformed XML", "<Error><Message>SENSITIVE_SENTINEL"],
  ["empty", ""],
] as const;

describe("REST-XML unstructured server errors", () => {
  for (const status of [500, 502, 503, 504]) {
    for (const [name, body] of unstructuredBodies) {
      test(`${status} ${name} is retryable without retaining the response body`, async () => {
        const error = await Effect.runPromise(
          parsePutObject({
            status,
            statusText: "Server Error",
            headers: {},
            body,
          }).pipe(Effect.flip),
        );
        if (status === 503 && !body) {
          expect(error).toMatchObject({ _tag: "ServiceUnavailable" });
        } else {
          expect(error).toBeInstanceOf(InternalError);
        }
        expect(isTransientError(error)).toBe(true);
        expect(JSON.stringify(error)).not.toContain("SENSITIVE_SENTINEL");
      });
    }
  }

  for (const [name, body] of unstructuredBodies.filter(([, body]) => body !== "")) {
    test(`malformed 400 ${name} remains a parse error`, async () => {
      const error = await Effect.runPromise(
        parsePutObject({
          status: 400,
          statusText: "Bad Request",
          headers: {},
          body,
        }).pipe(Effect.flip),
      );
      expect(error).toBeInstanceOf(ParseError);
      expect(isTransientError(error)).toBe(false);
    });
  }

  for (const body of [
    "<Error><Code>SlowDown</Code><Message>Try later</Message></Error>",
    "<html><body><li>Code: SlowDown</li><li>Message: Try later</li></body></html>",
  ]) {
    test(`preserves recognized ${body.startsWith("<html") ? "HTML" : "XML"} server error codes`, async () => {
      const error = await Effect.runPromise(
        parsePutObject({
          status: 503,
          statusText: "Unavailable",
          headers: {},
          body,
        }).pipe(Effect.flip),
      );
      expect(error).toBeInstanceOf(SlowDown);
      expect(error).toMatchObject({ message: "Try later" });
      expect(isTransientError(error)).toBe(true);
    });
  }
});

const internalKmsMessage = "Internal KMS service error. Try again.";

describe("Lambda synthetic error parsing", () => {
  test("classifies the observed internal KMS response as retryable", async () => {
    const error = await Effect.runPromise(
      parseCreateFunction(invalidParameterResponse(internalKmsMessage)).pipe(Effect.flip),
    );
    expect(error).toBeInstanceOf(LambdaInternalKmsError);
    expect(error).toMatchObject({ message: internalKmsMessage });
    expect(isTransientError(error)).toBe(true);
  });

  test("keeps other invalid parameters non-retryable", async () => {
    const error = await Effect.runPromise(
      parseCreateFunction(invalidParameterResponse("The provided execution role is invalid.")).pipe(
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(InvalidParameterValueException);
    expect(isTransientError(error)).toBe(false);
  });

  test("only specializes operations declaring the synthetic error", async () => {
    const parseUpdateFunctionCode = makeResponseParser({
      input: updateFunctionCode.input,
      output: createFunction.output,
      errors: [InvalidParameterValueException],
    });
    const error = await Effect.runPromise(
      parseUpdateFunctionCode(invalidParameterResponse(internalKmsMessage)).pipe(Effect.flip),
    );
    expect(error).toBeInstanceOf(InvalidParameterValueException);
    expect(isTransientError(error)).toBe(false);
  });
});

describe("2xx response validation", () => {
  const mismatched = {
    status: 200,
    statusText: "OK",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ FunctionName: 123 }),
  };

  test("lenient (default) falls back to the raw response on a mismatch", async () => {
    const output = await Effect.runPromise(parseCreateFunction(mismatched));
    expect(output).toMatchObject({ FunctionName: 123 });
  });

  test("strict fails a mismatch with ParseError", async () => {
    const error = await Effect.runPromise(
      parseCreateFunction(mismatched).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect(isTransientError(error)).toBe(false);
  });

  test("strict decodes a matching response", async () => {
    const output = await Effect.runPromise(
      parseCreateFunction({
        ...mismatched,
        body: JSON.stringify({ FunctionName: "fn" }),
      }).pipe(Effect.provide(ResponseValidation.strict)),
    );
    expect(output).toMatchObject({ FunctionName: "fn" });
  });

  const withExtra = {
    ...mismatched,
    body: JSON.stringify({ FunctionName: "fn", NotInTheModel: 1 }),
  };

  test("additionalProperties allows a member the model does not declare", async () => {
    const output = await Effect.runPromise(
      parseCreateFunction(withExtra).pipe(Effect.provide(ResponseValidation.additionalProperties)),
    );
    expect(output).toMatchObject({ FunctionName: "fn" });
  });

  test("additionalProperties still fails a mismatch", async () => {
    const error = await Effect.runPromise(
      parseCreateFunction(mismatched).pipe(
        Effect.provide(ResponseValidation.additionalProperties),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ParseError);
  });

  test("strict fails a member the model does not declare", async () => {
    const error = await Effect.runPromise(
      parseCreateFunction(withExtra).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).toContain('["NotInTheModel"]');
  });
});

const SECRET = "sentinel-secret-7f3a";

const parseGetSecretValue = makeResponseParser({
  input: getSecretValue.input,
  output: getSecretValue.output,
  errors: [],
});

const secretsManagerResponse = (body: string) => ({
  status: 200,
  statusText: "OK",
  headers: { "content-type": "application/x-amz-json-1.1" },
  body,
});

const modes = [
  ["lenient", ResponseValidation.lenient],
  ["strict", ResponseValidation.strict],
] as const;

describe("2xx responses with sensitive fields", () => {
  test("lenient: a response that does not match its schema still returns sensitive fields as Redacted", async () => {
    const output = await Effect.runPromise(
      parseGetSecretValue(
        secretsManagerResponse(
          JSON.stringify({ Name: "db", SecretString: SECRET, VersionStages: "AWSCURRENT" }),
        ),
      ),
    );
    expect(Redacted.isRedacted(output.SecretString)).toBe(true);
    expect(Redacted.value(output.SecretString)).toBe(SECRET);
    expect(output).toMatchObject({ Name: "db", VersionStages: "AWSCURRENT" });
    expect(JSON.stringify(output)).not.toContain(SECRET);
  });

  test("lenient: sensitive values inside a map stay Redacted and undeclared fields stay when the response does not match its schema", async () => {
    const output = await Effect.runPromise(
      parseCreateFunction({
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          FunctionName: 123,
          Environment: { Variables: { DB_PASSWORD: SECRET }, FutureField: "keep" },
        }),
      }),
    );
    expect(output.Environment).toMatchObject({ FutureField: "keep" });
    expect(Redacted.isRedacted(output.Environment.Variables.DB_PASSWORD)).toBe(true);
    expect(JSON.stringify(output)).not.toContain(SECRET);
  });

  test("lenient: a field holding sensitive values that arrives in the wrong shape is Redacted whole", async () => {
    const output = await Effect.runPromise(
      parseCreateFunction({
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          FunctionName: "fn",
          Environment: { Variables: [`DB_PASSWORD=${SECRET}`] },
        }),
      }),
    );
    expect(Redacted.isRedacted(output.Environment.Variables)).toBe(true);
    expect(JSON.stringify(output)).not.toContain(SECRET);
  });

  test("lenient: sensitive fields in a list stay Redacted, read from the JSON keys AWS sends", async () => {
    const parse = makeResponseParser({
      input: describeChannel.input,
      output: describeChannel.output,
      errors: [],
    });
    const output = await Effect.runPromise(
      parse({
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: "channel",
          createdAt: 1700000000,
          hlsIngest: { ingestEndpoints: [{ url: "https://ingest", password: SECRET }] },
        }),
      }),
    );
    const [endpoint] = output.HlsIngest!.IngestEndpoints!;
    expect(Redacted.isRedacted(endpoint!.Password)).toBe(true);
    expect(endpoint!.Url).toBe("https://ingest");
    expect(output).toMatchObject({ Id: "channel", CreatedAt: 1700000000 });
    expect(JSON.stringify(output)).not.toContain(SECRET);
  });

  for (const [mode, layer] of modes) {
    test(`${mode}: a body that is not JSON fails with ParseError and leaves the secret out`, async () => {
      const error = await Effect.runPromise(
        parseGetSecretValue(secretsManagerResponse(`{"SecretString":"${SECRET}`)).pipe(
          Effect.provide(layer),
          Effect.flip,
        ),
      );
      expect(error).toBeInstanceOf(ParseError);
      expect(JSON.stringify(error)).not.toContain(SECRET);
      expect((error as ParseError).message).not.toContain(SECRET);
    });
  }

  test("strict: a mismatch message leaves out the value it found", async () => {
    const error = await Effect.runPromise(
      parseGetSecretValue(
        secretsManagerResponse(JSON.stringify({ SecretBinary: `!${SECRET}!` })),
      ).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).not.toContain(SECRET);
    expect((error as ParseError).message).toContain('got "[REDACTED]" at ["SecretBinary"]');
  });
});

describe("error responses with sensitive fields", () => {
  const parseGetContactInformation = makeResponseParser({
    input: getContactInformation.input,
    output: getContactInformation.output,
    errors: [AccessDeniedException, ValidationException],
  });

  for (const [sentAs, message] of [
    ["message", { message: SECRET }],
    ["Message", { Message: SECRET }],
    ["both spellings", { message: SECRET, Message: SECRET }],
    ["both spellings, the secret in Message", { message: "m", Message: SECRET }],
  ] as const) {
    test(`a declared error that does not match its schema still returns sensitive fields as Redacted, sent as ${sentAs}`, async () => {
      const error = await Effect.runPromise(
        Effect.flip(
          parseGetContactInformation({
            status: 400,
            statusText: "Bad Request",
            headers: {
              "content-type": "application/json",
              "x-amzn-errortype": "ValidationException",
            },
            body: JSON.stringify({ ...message, reason: 123 }),
          }),
        ),
      );
      expect(error).toMatchObject({ _tag: "ValidationException", reason: 123 });
      expect(Redacted.isRedacted((error as { message: unknown }).message)).toBe(true);
      expect(JSON.stringify(error)).not.toContain(SECRET);
    });
  }

  test("a REST-JSON error body that is not JSON leaves a declared error's secret message out", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        parseGetContactInformation({
          status: 403,
          statusText: "Forbidden",
          headers: { "content-type": "application/json" },
          body: `{"message":"${SECRET}`,
        }),
      ),
    );
    expect(error).toBeInstanceOf(AccessDeniedException);
    expect((error as AccessDeniedException).message).not.toContain(SECRET);
  });

  test("an error response without an error code fails with a ParseError that leaves the body out", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        parseGetContactInformation({
          status: 409,
          statusText: "Conflict",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: SECRET }),
        }),
      ),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).not.toContain(SECRET);
  });
});
