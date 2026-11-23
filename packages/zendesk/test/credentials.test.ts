import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiToken } from "../src/credentials.ts";

describe("fromApiToken", () => {
  test("no subdomain or apiBaseUrl fails the layer with ConfigError when it is built", async () => {
    const layer = fromApiToken({ email: "a@example.com", apiToken: Redacted.make("t") });
    const error = await Effect.runPromise(Effect.flip(Layer.build(layer).pipe(Effect.scoped)));
    expect(error._tag).toBe("ConfigError");
  });
});
