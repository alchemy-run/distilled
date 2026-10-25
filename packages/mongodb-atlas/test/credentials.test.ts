import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Credentials, fromClientCredentials } from "../src/credentials.ts";

const BASE_URL = "https://atlas.test";

/** Stub `fetch` with one token response and record each request's headers. */
const stubTokenEndpoint = (response: () => Response) => {
  const seen: Array<{ url: string; headers: Headers }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      seen.push({ url, headers: new Headers(init.headers) });
      return response();
    }),
  );
  return seen;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

const resolve = (clientSecret: string) =>
  Effect.flatMap(Credentials, (credentials) => credentials).pipe(
    Effect.provide(
      fromClientCredentials({
        clientId: "client-ü",
        clientSecret: Redacted.make(clientSecret),
        apiBaseUrl: BASE_URL,
      }),
    ),
  );

describe("fromClientCredentials", () => {
  test("encodes Basic credentials as UTF-8 then base64, including characters above U+00FF", async () => {
    const seen = stubTokenEndpoint(() =>
      Response.json({ access_token: "atlas-token", expires_in: 3600 }),
    );
    const config = await Effect.runPromise(resolve("s€cret"));
    expect(Redacted.value(config.accessToken)).toBe("atlas-token");
    expect(seen).toHaveLength(1);
    expect(seen[0]!.url).toBe(`${BASE_URL}/api/oauth/token`);
    expect(seen[0]!.headers.get("authorization")).toBe(
      `Basic ${Buffer.from("client-ü:s€cret", "utf8").toString("base64")}`,
    );
  });

  test("a 2xx token response whose JSON body is null fails with ConfigError", async () => {
    stubTokenEndpoint(() => Response.json(null));
    const error = await Effect.runPromise(Effect.flip(resolve("secret")));
    expect(error).toBeInstanceOf(ConfigError);
    expect(error.message).toBe("OAuth2 token exchange response is missing access_token");
  });
});
