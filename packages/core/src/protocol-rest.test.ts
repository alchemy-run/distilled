import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as API from "./api.ts";
import { makeRestProtocol } from "./protocol-rest.ts";
import * as T from "./trait.ts";

class TestParseError extends Schema.TaggedError<TestParseError>()(
  "TestParseError",
  { body: Schema.Unknown, cause: Schema.Unknown },
) {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()(
  "TestUnknownError",
  { message: Schema.String },
) {}

// The generator's default error fields: `code` is a number.
class NotFound extends T.applyErrorMatchers(
  Schema.TaggedError<NotFound>()("NotFound", {
    code: Schema.Number,
    message: Schema.String,
  }),
  [{ status: 404 }],
) {}

// A provider that opts in declares `code` as number | string.
class StringNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<StringNotFound>()("StringNotFound", {
    code: Schema.Union([Schema.Number, Schema.String]),
    message: Schema.String,
  }),
  [{ status: 404 }],
) {}

const protocol = (forwardStringCodes?: boolean) =>
  makeRestProtocol<{}>({
    credentials: Effect.succeed({}),
    baseUrl: () => "https://api.test",
    headers: () => ({}),
    forwardStringCodes,
    unknownError: ({ message }) => new TestUnknownError({ message }),
    parseError: ({ body, cause }) => new TestParseError({ body, cause }),
  });

/** Decode a 404 `{ code, message }` body and return the typed error. */
const notFound = (
  code: string | number,
  errorClass: API.ApiErrorClass,
  forwardStringCodes?: boolean,
) =>
  Effect.runPromise(
    Effect.flip(
      Effect.gen(function* () {
        const p = yield* API.Protocol;
        const request = HttpClientRequest.get("https://api.test/thing");
        return yield* p.decode({
          response: HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify({ code, message: "not found" }), {
              status: 404,
            }),
          ),
          outputAst: Schema.Struct({}).ast,
          errors: [errorClass],
          config: {},
        });
      }).pipe(Effect.provide(protocol(forwardStringCodes))),
    ),
  ) as Promise<{ readonly code: unknown }>;

describe("makeRestProtocol typed error codes", () => {
  test("a numeric envelope code reaches the typed error", async () => {
    const error = await notFound(10007, NotFound);
    expect(error).toBeInstanceOf(NotFound);
    expect(error.code).toBe(10007);
  });

  test("by default a string envelope code is dropped to 0", async () => {
    const error = await notFound("resource_not_found", NotFound);
    expect(error).toBeInstanceOf(NotFound);
    expect(error.code).toBe(0);
  });

  test("forwardStringCodes passes a string envelope code through", async () => {
    const error = await notFound("resource_not_found", StringNotFound, true);
    expect(error).toBeInstanceOf(StringNotFound);
    expect(error.code).toBe("resource_not_found");
  });

  test("forwardStringCodes degrades to 0 on a numeric code field", async () => {
    // Misconfigured opt-in: the class still declares `code: Schema.Number`.
    const error = await notFound("resource_not_found", NotFound, true);
    expect(error).toBeInstanceOf(NotFound);
    expect(error.code).toBe(0);
  });

  test("forwardStringCodes keeps a numeric envelope code numeric", async () => {
    const error = await notFound(10007, StringNotFound, true);
    expect(error.code).toBe(10007);
  });
});
