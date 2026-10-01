import { describe, expect, test } from "bun:test";
import { mockHttpClient } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import * as Errors from "./errors.ts";
import * as Retry from "./retry.ts";
import type { OpenRouterOpContext } from "./protocol.ts";
import * as Ops from "./services/openrouter.ts";

const fail = <A, E>(
  effect: Effect.Effect<A, E, OpenRouterOpContext | Retry.Retry>,
  status: number,
  body: unknown,
) =>
  effect.pipe(
    Retry.none,
    Effect.provide(credentials({ apiKey: "test" })),
    Effect.provide(mockHttpClient({ status, body: JSON.stringify(body) })),
    Effect.flip,
    Effect.runPromise,
  );

const outOfCredit = {
  error: { code: 402, message: "Insufficient credits" },
};

describe("OpenRouter error mapping", () => {
  test("402 on an operation that declares it raises its own PaymentRequired", async () => {
    const error = await fail(
      Ops.createAudioTranscriptions({
        model: "openai/whisper-large-v3-turbo",
        input_audio: { url: "https://example.com/a.mp3" },
      }),
      402,
      outOfCredit,
    );
    expect(error).toBeInstanceOf(Ops.PaymentRequired);
  });

  test("402 on an operation that does not declare it falls back to the status map", async () => {
    const error = await fail(Ops.getCredits({}), 402, outOfCredit);
    expect(error).toBeInstanceOf(Errors.PaymentRequired);
    expect((error as Errors.PaymentRequired).message).toBe(
      "Insufficient credits",
    );
  });

  test("an unmapped status keeps OpenRouter's numeric code and message", async () => {
    const error = await fail(Ops.getCredits({}), 418, {
      error: { code: 418, message: "teapot" },
    });
    expect(error).toBeInstanceOf(Errors.UnknownOpenRouterError);
    expect(error).toMatchObject({ code: "418", message: "teapot" });
  });
});
