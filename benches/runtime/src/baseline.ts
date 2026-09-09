/**
 * Baselines that isolate harness/runtime overhead from Distilled's own cost.
 *
 *   effect-runSync        Effect.runSync(Effect.succeed(1))
 *   effect-runPromise     Effect.runPromise(Effect.succeed(1))
 *   mock-http-roundtrip   HttpClient.execute on the mock transport + read
 *                         the canned body as text — everything the "call"
 *                         stage pays that is not Distilled.
 *
 * Subtract `mock-http-roundtrip` from any `call` row to estimate the SDK's
 * share (protocol encode + signing + envelope decode + retry wrapper).
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";

import {
  type Case,
  buildLayer,
  mockHttpLayer,
  runPromise,
  runSync,
} from "./harness.ts";

export const baselineCases = async (): Promise<Case[]> => {
  const body = JSON.stringify({
    success: true,
    errors: [],
    messages: [],
    result: { id: "x" },
  });
  const ctx = await buildLayer(
    mockHttpLayer({ headers: { "content-type": "application/json" }, body }),
  );
  const request = HttpClientRequest.get("https://mock.invalid/v4/thing");
  const roundtrip = Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const response = yield* client.execute(request);
    return yield* response.text;
  }).pipe(Effect.provideContext(ctx));
  const one = Effect.succeed(1);

  return [
    {
      provider: "baseline",
      service: "effect",
      op: "runSync",
      stage: "call",
      note: "Effect.succeed(1)",
      fn: () => runSync(one),
    },
    {
      provider: "baseline",
      service: "effect",
      op: "runPromise",
      stage: "call",
      note: "Effect.succeed(1)",
      fn: () => runPromise(one),
    },
    {
      provider: "baseline",
      service: "mock-http",
      op: "roundtrip",
      stage: "call",
      note: "HttpClient.execute + response.text on canned 200",
      fn: () => runPromise(roundtrip),
    },
  ];
};
