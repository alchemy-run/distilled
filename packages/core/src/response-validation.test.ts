import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as API from "./api.ts";
import { makeRestProtocol } from "./protocol-rest.ts";
import * as ResponseValidation from "./response-validation.ts";

class TestParseError extends Schema.TaggedError<TestParseError>()("TestParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}) {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()("TestUnknownError", {
  message: Schema.String,
}) {}

const TestProtocol = makeRestProtocol<{}>({
  credentials: Effect.succeed({}),
  baseUrl: () => "https://api.test",
  headers: () => ({}),
  unknownError: ({ message }) => new TestUnknownError({ message }),
  parseError: ({ body, cause }) => new TestParseError({ body, cause }),
});

const Output = Schema.Struct({ id: Schema.String });

const decode = (body: string) =>
  Effect.gen(function* () {
    const protocol = yield* API.Protocol;
    const request = HttpClientRequest.get("https://api.test/thing");
    return yield* protocol.decode({
      response: HttpClientResponse.fromWeb(request, new Response(body, { status: 200 })),
      outputAst: Output.ast,
      errors: [],
      config: {},
    });
  }).pipe(Effect.provide(TestProtocol));

const run = <A, E>(effect: Effect.Effect<A, E>, layer?: Layer.Layer<never>) =>
  Effect.runPromise(Effect.result(layer ? effect.pipe(Effect.provide(layer)) : effect));

describe("makeRestProtocol response validation", () => {
  test("lenient (default) returns a non-JSON 2xx body as text", async () => {
    const result = await run(decode("not json"));
    expect(result).toMatchObject({ _tag: "Success", success: "not json" });
  });

  test("lenient (default) returns {} for an output that requires id", async () => {
    const result = await run(decode("{}"));
    expect(result).toMatchObject({ _tag: "Success", success: {} });
  });

  test("strict fails a non-JSON 2xx body with the provider's parse error", async () => {
    const result = await run(decode("not json"), ResponseValidation.strict);
    expect(result._tag).toBe("Failure");
    const error = (result as any).failure;
    expect(error).toBeInstanceOf(TestParseError);
    expect(error.body).toBe("not json");
  });

  test("strict fails a body missing a required member", async () => {
    const result = await run(decode("{}"), ResponseValidation.strict);
    expect(result._tag).toBe("Failure");
    expect((result as any).failure).toBeInstanceOf(TestParseError);
    expect((result as any).failure.body).toEqual({});
  });

  test("strict passes a matching body through unchanged, extra members included", async () => {
    const result = await run(
      decode(JSON.stringify({ id: "a", extra: 1 })),
      ResponseValidation.strict,
    );
    expect(result).toMatchObject({
      _tag: "Success",
      success: { id: "a", extra: 1 },
    });
  });

  test("an inner lenient layer overrides an outer strict one", async () => {
    const result = await run(
      decode("{}").pipe(Effect.provide(ResponseValidation.lenient)),
      ResponseValidation.strict,
    );
    expect(result).toMatchObject({ _tag: "Success", success: {} });
  });
});
