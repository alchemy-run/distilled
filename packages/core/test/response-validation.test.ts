import { inspect } from "node:util";
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import { makeRestProtocol, SensitiveValue, validateSuccess } from "../src/protocol-rest.ts";
import * as ResponseValidation from "../src/response-validation.ts";

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

const decode = (body: string, outputAst = Output.ast) =>
  Effect.gen(function* () {
    const protocol = yield* API.Protocol;
    const request = HttpClientRequest.get("https://api.test/thing");
    return yield* protocol.decode({
      response: HttpClientResponse.fromWeb(request, new Response(body, { status: 200 })),
      outputAst,
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

  test("additionalProperties passes a matching body through unchanged, extra members included", async () => {
    const result = await run(
      decode(JSON.stringify({ id: "a", extra: 1 })),
      ResponseValidation.additionalProperties,
    );
    expect(result).toMatchObject({
      _tag: "Success",
      success: { id: "a", extra: 1 },
    });
  });

  test("additionalProperties fails a body missing a required member", async () => {
    const result = await run(decode("{}"), ResponseValidation.additionalProperties);
    expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
  });

  test("strict fails a member the schema does not model, at its path", async () => {
    const result = await run(
      decode(JSON.stringify({ id: "a", extra: 1 })),
      ResponseValidation.strict,
    );
    expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
    expect(result).toMatchObject({
      failure: {
        cause: { path: ["extra"], expected: "no value (the schema does not model this key)" },
      },
    });
  });

  test("strict passes a body with exactly the modeled members", async () => {
    const result = await run(decode(JSON.stringify({ id: "a" })), ResponseValidation.strict);
    expect(result).toMatchObject({ _tag: "Success", success: { id: "a" } });
  });

  test("strict accepts any key on an open object and on an empty struct", async () => {
    const Open = Schema.StructWithRest(Schema.Struct({ id: Schema.String }), [
      Schema.Record(Schema.String, Schema.Unknown),
    ]);
    const open = await run(
      decode(JSON.stringify({ id: "a", title: "x" }), Open.ast),
      ResponseValidation.strict,
    );
    expect(open).toMatchObject({ _tag: "Success", success: { id: "a", title: "x" } });
    const opaque = await run(
      decode(JSON.stringify({ anything: 1 }), Schema.Struct({}).ast),
      ResponseValidation.strict,
    );
    expect(opaque).toMatchObject({ _tag: "Success", success: { anything: 1 } });
  });

  test("an inner lenient layer overrides an outer strict one", async () => {
    const result = await run(
      decode("{}").pipe(Effect.provide(ResponseValidation.lenient)),
      ResponseValidation.strict,
    );
    expect(result).toMatchObject({ _tag: "Success", success: {} });
  });
});

describe("makeRestProtocol with sensitive output members", () => {
  const SECRET = "sentinel-secret-7f3a";
  const Secret = Schema.Struct({
    id: Schema.String,
    keys: Schema.Array(Schema.Struct({ token: Schema.String.pipe(SensitiveValue()) })),
  });
  const runBothModes = (body: string) =>
    Promise.all(
      [ResponseValidation.lenient, ResponseValidation.strict].map((mode) =>
        run(decode(body, Secret.ast), mode),
      ),
    );
  const exposesSecret = (result: unknown) => inspect(result, { depth: Infinity }).includes(SECRET);

  test("a body cut off mid-secret fails in both modes without the body", async () => {
    for (const result of await runBothModes(`{"id":"a","keys":[{"token":"${SECRET}"`)) {
      expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
      expect(result).toMatchObject({
        failure: { body: "[REDACTED]", cause: "Invalid JSON response" },
      });
      expect(exposesSecret(result)).toBe(false);
    }
  });

  test("a mismatched body: lenient redacts the member, strict fails without the body", async () => {
    const [lenient, strict] = await runBothModes(JSON.stringify({ keys: [{ token: SECRET }] }));
    expect(lenient._tag).toBe("Success");
    expect(Result.isFailure(strict) && strict.failure).toBeInstanceOf(TestParseError);
    expect(strict).toMatchObject({ failure: { body: "[REDACTED]" } });
    expect(Result.isFailure(strict) && strict.failure).toMatchObject({
      cause: expect.objectContaining({ name: "SchemaError" }),
    });
    expect(exposesSecret(lenient)).toBe(false);
    expect(exposesSecret(strict)).toBe(false);
  });

  test("a strict mismatch at the sensitive member keeps its value out of the cause", async () => {
    const body = JSON.stringify({ id: "a", keys: [{ token: [SECRET] }] });
    const result = await run(decode(body, Secret.ast), ResponseValidation.strict);
    expect(result).toMatchObject({
      failure: { body: "[REDACTED]", cause: { path: ["keys", 0, "token"], actual: "[REDACTED]" } },
    });
    expect(exposesSecret(result)).toBe(false);
  });

  describe("inside a map", () => {
    const InMap = Schema.Struct({
      id: Schema.String,
      keys: Schema.Record(
        Schema.String,
        Schema.Struct({ token: Schema.String.pipe(SensitiveValue()) }),
      ),
    });

    test("a body cut off mid-secret fails in both modes without the body", async () => {
      for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
        const result = await run(
          decode(`{"id":"a","keys":{"k":{"token":"${SECRET}"`, InMap.ast),
          mode,
        );
        expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
        expect(result).toMatchObject({ failure: { body: "[REDACTED]" } });
        expect(exposesSecret(result)).toBe(false);
      }
    });

    test("a strict mismatch fails without the body", async () => {
      const body = JSON.stringify({ keys: { k: { token: SECRET } } });
      const result = await run(decode(body, InMap.ast), ResponseValidation.strict);
      expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
      expect(result).toMatchObject({ failure: { body: "[REDACTED]" } });
      expect(exposesSecret(result)).toBe(false);
    });
  });

  describe("as a list element", () => {
    const InList = Schema.Struct({
      id: Schema.String,
      header: Schema.Record(Schema.String, Schema.Array(Schema.String.pipe(SensitiveValue()))),
    });

    test("a body cut off mid-secret fails in both modes without the body", async () => {
      for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
        const result = await run(
          decode(`{"id":"a","header":{"Authorization":["${SECRET}`, InList.ast),
          mode,
        );
        expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
        expect(result).toMatchObject({ failure: { body: "[REDACTED]" } });
        expect(exposesSecret(result)).toBe(false);
      }
    });

    test("a strict mismatch fails without the body", async () => {
      const body = JSON.stringify({ header: { Authorization: [SECRET] } });
      const result = await run(decode(body, InList.ast), ResponseValidation.strict);
      expect(Result.isFailure(result) && result.failure).toBeInstanceOf(TestParseError);
      expect(result).toMatchObject({ failure: { body: "[REDACTED]" } });
      expect(exposesSecret(result)).toBe(false);
    });
  });

  test("a matching body succeeds in both modes with the member redacted", async () => {
    for (const result of await runBothModes(
      JSON.stringify({ id: "a", keys: [{ token: SECRET }] }),
    )) {
      expect(result._tag).toBe("Success");
      const { keys } = Result.getOrThrow(result) as { keys: ReadonlyArray<{ token: unknown }> };
      const token = keys[0].token;
      expect(Redacted.isRedacted(token) && Redacted.value(token)).toBe(SECRET);
      expect(exposesSecret(result)).toBe(false);
    }
  });
});

describe("validateSuccess (hand-written protocols)", () => {
  const SECRET = "sentinel-secret-7f3a";
  const Secret = Schema.Struct({ id: Schema.String, token: Schema.String.pipe(SensitiveValue()) });
  const check = (
    outputAst: Schema.Top["ast"],
    read: { value: unknown; body: unknown; nonJson: boolean },
    mode: Layer.Layer<never>,
  ) =>
    run(
      validateSuccess(outputAst, read, (info) => new TestParseError(info)),
      mode,
    );
  const exposesSecret = (result: unknown) => inspect(result, { depth: Infinity }).includes(SECRET);

  test("an output without sensitive members keeps today's behaviour", async () => {
    const text = "not json";
    const lenient = await check(
      Output.ast,
      { value: text, body: text, nonJson: true },
      ResponseValidation.lenient,
    );
    expect(lenient).toMatchObject({ _tag: "Success", success: text });
    const strict = await check(
      Output.ast,
      { value: {}, body: { raw: 1 }, nonJson: false },
      ResponseValidation.strict,
    );
    expect(strict).toMatchObject({ failure: { body: { raw: 1 } } });
  });

  test("a non-JSON body for a sensitive output fails in both modes without the body", async () => {
    const text = `{"id":"a","token":"${SECRET}"`;
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const result = await check(Secret.ast, { value: text, body: text, nonJson: true }, mode);
      expect(result).toMatchObject({
        failure: { body: "[REDACTED]", cause: "Invalid JSON response" },
      });
      expect(exposesSecret(result)).toBe(false);
    }
  });

  test("a strict mismatch withholds the body and the value found", async () => {
    const json = { id: 1, token: SECRET };
    const result = await check(
      Secret.ast,
      { value: json, body: json, nonJson: false },
      ResponseValidation.strict,
    );
    expect(result).toMatchObject({ failure: { body: "[REDACTED]" } });
    expect(exposesSecret(result)).toBe(false);
  });

  test("a match comes back with the sensitive member redacted", async () => {
    const json = { id: "a", token: SECRET };
    const result = await check(
      Secret.ast,
      { value: json, body: json, nonJson: false },
      ResponseValidation.strict,
    );
    const { token } = Result.getOrThrow(result) as { token: unknown };
    expect(Redacted.isRedacted(token) && Redacted.value(token)).toBe(SECRET);
  });
});
