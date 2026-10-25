import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, fromApiToken } from "../src/credentials.ts";

const resolve = Effect.flatMap(Credentials, (credentials) => credentials);

describe("fromApiToken", () => {
  test("encodes Basic credentials as UTF-8 then base64, including characters above U+00FF", async () => {
    const config = await Effect.runPromise(
      resolve.pipe(
        Effect.provide(
          fromApiToken({
            email: "jürgen@example.com",
            apiToken: Redacted.make("tök€n"),
            subdomain: "acme",
          }),
        ),
      ),
    );
    expect(Redacted.value(config.authorization)).toBe(
      `Basic ${Buffer.from("jürgen@example.com/token:tök€n", "utf8").toString("base64")}`,
    );
    expect(config.apiBaseUrl).toBe("https://acme.zendesk.com");
  });
});
