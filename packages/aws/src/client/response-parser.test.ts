import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import { isTransientError } from "../category.ts";
import {
  CreateFunctionRequest,
  FunctionConfiguration,
  InvalidParameterValueException,
  LambdaInternalKmsError,
  UpdateFunctionCodeRequest,
} from "../services/lambda.ts";
import { makeResponseParser } from "./response-parser.ts";

const parseCreateFunction = makeResponseParser({
  input: CreateFunctionRequest,
  output: FunctionConfiguration,
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
      input: UpdateFunctionCodeRequest,
      output: FunctionConfiguration,
      errors: [InvalidParameterValueException],
    });
    const error = await Effect.runPromise(
      parseUpdateFunctionCode(invalidParameterResponse(internalKmsMessage)).pipe(Effect.flip),
    );
    expect(error).toBeInstanceOf(InvalidParameterValueException);
    expect(isTransientError(error)).toBe(false);
  });
});
