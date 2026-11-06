import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";
import { Credentials, CredentialsFromEnv, fromApiKey } from "../src/credentials.ts";

const exchanges: string[] = [];

const client = HttpClient.make((request) =>
  Effect.sync(() => {
    const body =
      request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : "";
    exchanges.push(new URLSearchParams(body).get("client_secret") ?? "");
    return HttpClientResponse.fromWeb(
      request,
      new Response(
        JSON.stringify({ access_token: `token-${exchanges.length}`, expires_in: 3600 }),
        { headers: { "content-type": "application/json" } },
      ),
    );
  }),
);

const resolveWith = <A, E>(resolve: Effect.Effect<A, E>, env: Record<string, string>) =>
  resolve.pipe(
    Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env })),
  );

test("the OAuth token is reused until the client secret changes", () =>
  Effect.runPromise(
    Effect.gen(function* () {
      exchanges.length = 0;
      const resolve = yield* Credentials;
      const first = { TAILSCALE_OAUTH_CLIENT_ID: "client", TAILSCALE_OAUTH_CLIENT_SECRET: "one" };
      const a = yield* resolveWith(resolve, first);
      const b = yield* resolveWith(resolve, first);
      const c = yield* resolveWith(resolve, { ...first, TAILSCALE_OAUTH_CLIENT_SECRET: "two" });
      expect(exchanges).toEqual(["one", "two"]);
      expect(Redacted.value(a.token)).toBe("token-1");
      expect(Redacted.value(b.token)).toBe("token-1");
      expect(Redacted.value(c.token)).toBe("token-2");
    }).pipe(
      Effect.provide(CredentialsFromEnv),
      Effect.provideService(HttpClient.HttpClient, client),
    ),
  ));

test("an empty API key counts as unset", () =>
  Effect.runPromise(
    Effect.gen(function* () {
      exchanges.length = 0;
      const resolve = yield* Credentials;
      const config = yield* resolveWith(resolve, {
        TAILSCALE_API_KEY: "",
        TAILSCALE_OAUTH_CLIENT_ID: "client",
        TAILSCALE_OAUTH_CLIENT_SECRET: "one",
      });
      expect(exchanges).toEqual(["one"]);
      expect(Redacted.value(config.token)).toBe("token-1");
    }).pipe(
      Effect.provide(CredentialsFromEnv),
      Effect.provideService(HttpClient.HttpClient, client),
    ),
  ));

test("TAILSCALE_BASE_URL is an origin and an explicit apiBaseUrl is the API root", () =>
  Effect.runPromise(
    Effect.gen(function* () {
      const fromEnv = yield* resolveWith(yield* Credentials, {
        TAILSCALE_API_KEY: "key",
        TAILSCALE_BASE_URL: "https://tailscale.example/",
      });
      expect(fromEnv.apiBaseUrl).toBe("https://tailscale.example/api/v2");
      const explicit = yield* Effect.flatten(Credentials).pipe(
        Effect.provide(
          fromApiKey({ apiKey: Redacted.make("key"), apiBaseUrl: "https://proxy.example/v2" }),
        ),
      );
      expect(explicit.apiBaseUrl).toBe("https://proxy.example/v2");
    }).pipe(
      Effect.provide(CredentialsFromEnv),
      Effect.provideService(HttpClient.HttpClient, client),
    ),
  ));
