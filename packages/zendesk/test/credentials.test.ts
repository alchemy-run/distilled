import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, fromApiToken } from "../src/credentials.ts";

describe("fromApiToken", () => {
  test("no subdomain or apiBaseUrl fails the credentials with ConfigError instead of throwing", async () => {
    const layer = fromApiToken({ email: "a@example.com", apiToken: Redacted.make("t") });
    const context = await Effect.runPromise(Layer.build(layer).pipe(Effect.scoped));
    const error = await Effect.runPromise(Effect.flip(Context.get(context, Credentials)));
    expect(error._tag).toBe("ConfigError");
  });
});
