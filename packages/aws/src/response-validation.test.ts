import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromCredentials } from "./credentials.ts";
import { type CommonErrors, ParseError } from "./errors.ts";
import * as Retry from "./retry.ts";
import { describeEndpoints } from "./services/dynamodb.ts";

// DynamoDB (awsJson1_0) describeEndpoints declares
// `{ Endpoints: { Address: string; CachePeriodInMinutes: number }[] }`.
const run = (body: string) =>
  runValidationModes(
    describeEndpoints({}).pipe(
      Retry.none,
      Effect.provide(
        fromCredentials(
          {
            accessKeyId: Redacted.make("AKIDTEST"),
            secretAccessKey: Redacted.make("secret"),
          },
          "us-east-1",
        ),
      ),
    ),
    { body, headers: { "content-type": "application/x-amz-json-1.0" } },
  );

describe("AWS response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      Endpoints: [
        {
          Address: "dynamodb.us-east-1.amazonaws.com",
          CachePeriodInMinutes: 1440,
        },
      ],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {
      Endpoints: [{ Address: "dynamodb.us-east-1.amazonaws.com" }],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(ParseError);
  });
});

// ParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ParseError] extends [CommonErrors] ? true : false = true;
