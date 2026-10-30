import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { isTransientError } from "../../src/category.ts";
import { makeResponseParser } from "../../src/client/response-parser.ts";
import { InternalError, ParseError } from "../../src/errors.ts";
import { ValidationException, getContactInformation } from "../../src/services/account.ts";
import { getCredentialsForIdentity } from "../../src/services/cognito-identity.ts";
import { listTables } from "../../src/services/dynamodb.ts";
import {
  InvalidParameterValueException,
  LambdaInternalKmsError,
  createFunction,
  updateFunctionCode,
} from "../../src/services/lambda.ts";
import { SlowDown, putObject } from "../../src/services/s3.ts";
import { getSecretValue } from "../../src/services/secrets-manager.ts";
import { createOAuth2Token } from "../../src/services/signin.ts";

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

describe("a response that does not decode keeps sensitive members redacted", () => {
  const SECRET = "SENSITIVE_SENTINEL";

  const ok = (body: string) => ({
    status: 200,
    statusText: "OK",
    headers: { "content-type": "application/x-amz-json-1.1" },
    body,
  });

  const parseGetSecretValue = makeResponseParser({
    input: getSecretValue.input,
    output: getSecretValue.output,
    errors: [],
  });

  // VersionStages is a list in the model.
  const mismatched = ok(
    JSON.stringify({ Name: "db", SecretString: SECRET, VersionStages: "AWSCURRENT" }),
  );

  test("lenient converts what fits", async () => {
    const output = (await Effect.runPromise(parseGetSecretValue(mismatched))) as Record<
      string,
      unknown
    >;
    expect(Redacted.isRedacted(output.SecretString)).toBe(true);
    expect(Redacted.value(output.SecretString as Redacted.Redacted<string>)).toBe(SECRET);
    expect(output).toMatchObject({ Name: "db", VersionStages: "AWSCURRENT" });
  });

  test("strict does not quote a value of an output that can hold a secret", async () => {
    const error = await Effect.runPromise(
      parseGetSecretValue(ok(JSON.stringify({ Name: "db", Unmodeled: SECRET }))).pipe(
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).toContain('got "[REDACTED]" at ["Unmodeled"]');
    expect((error as ParseError).message).not.toContain(SECRET);
  });

  test("a body that is not JSON fails in every mode without quoting it", async () => {
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const error = await Effect.runPromise(
        parseGetSecretValue(ok(`{"SecretString":"${SECRET}`)).pipe(
          Effect.provide(mode),
          Effect.flip,
        ),
      );
      expect(error).toBeInstanceOf(ParseError);
      expect((error as ParseError).message).not.toContain(SECRET);
    }
  });

  test("a value that holds a secret and does not fit is Redacted whole", async () => {
    const parse = makeResponseParser({
      input: getCredentialsForIdentity.input,
      output: getCredentialsForIdentity.output,
      errors: [],
    });
    const output = (await Effect.runPromise(
      parse(ok(JSON.stringify({ IdentityId: "id", Credentials: [{ SecretKey: SECRET }] }))),
    )) as Record<string, unknown>;
    expect(output.IdentityId).toBe("id");
    expect(Redacted.isRedacted(output.Credentials)).toBe(true);
    expect(JSON.stringify(output)).not.toContain(SECRET);
  });

  test("an output without sensitive members still quotes its body", async () => {
    const parse = makeResponseParser({
      input: listTables.input,
      output: listTables.output,
      errors: [],
    });
    const error = await Effect.runPromise(
      parse(ok("not json")).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
    );
    expect((error as ParseError).message).toContain("not json");
  });

  // account's ValidationException (400) has a sensitive message.
  const parseGetContactInformation = makeResponseParser({
    input: getContactInformation.input,
    output: getContactInformation.output,
    errors: [ValidationException],
  });

  const failed = (status: number, body: string) => ({
    status,
    statusText: "Error",
    headers: { "content-type": "application/json" },
    body,
  });

  test("a declared error that does not decode keeps its sensitive members Redacted", async () => {
    const error = await Effect.runPromise(
      parseGetContactInformation({
        ...failed(400, JSON.stringify({ message: SECRET, reason: 1, Unmodeled: "kept out" })),
        headers: { "content-type": "application/json", "x-amzn-errortype": "ValidationException" },
      }).pipe(Effect.flip),
    );
    expect(error).toMatchObject({ _tag: "ValidationException", reason: 1 });
    expect(error).not.toHaveProperty("Unmodeled");
    expect(Redacted.isRedacted((error as Record<string, unknown>).message)).toBe(true);
    expect(JSON.stringify(error)).not.toContain(SECRET);
  });

  test("a plain-text error body is the message of the error its status matches", async () => {
    const error = await Effect.runPromise(
      parseGetContactInformation(failed(400, SECRET)).pipe(Effect.flip),
    );
    expect(error).toBeInstanceOf(ValidationException);
    const message = (error as unknown as Record<string, unknown>).message;
    expect(Redacted.value(message as Redacted.Redacted<string>)).toBe(SECRET);
  });

  test("an error body that matches no declared error is not quoted", async () => {
    const error = await Effect.runPromise(
      parseGetContactInformation(failed(409, JSON.stringify({ message: SECRET }))).pipe(
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ParseError);
    expect((error as ParseError).message).toContain("[REDACTED]");
    expect((error as ParseError).message).not.toContain(SECRET);
  });
});

describe("REST-JSON structure payload", () => {
  const parse = makeResponseParser({
    input: createOAuth2Token.input,
    output: createOAuth2Token.output,
    errors: [],
  });

  test("the body is the payload member, decoded in every mode", async () => {
    const body = {
      accessToken: { accessKeyId: "k", secretAccessKey: "s", sessionToken: "t" },
      tokenType: "Bearer",
      expiresIn: 3600,
      refreshToken: "SENSITIVE_SENTINEL",
    };
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const output = (await Effect.runPromise(
        parse({
          status: 200,
          statusText: "OK",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }).pipe(Effect.provide(mode)),
      )) as { tokenOutput: Record<string, unknown> };
      expect(output.tokenOutput).toMatchObject({ tokenType: "Bearer", expiresIn: 3600 });
      expect(Redacted.isRedacted(output.tokenOutput.refreshToken)).toBe(true);
    }
  });
});
