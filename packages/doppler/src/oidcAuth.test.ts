import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { authOidc } from "./services/doppler.ts";
import * as Retry from "./retry.ts";

const client = (response: unknown, status = 200) =>
  HttpClient.make((request) =>
    Effect.sync(() => {
      // The OIDC token is the credential; no bearer token is sent.
      expect(request.headers.authorization).toBeUndefined();
      expect(new URL(request.url).pathname).toBe("/v3/auth/oidc");
      return HttpClientResponse.fromWeb(
        request,
        Response.json(response, { status }),
      );
    }),
  );

test("exchanges a platform OIDC token for a redacted short-lived token", async () => {
  const response = await Effect.runPromise(
    authOidc({ identity: "identity-1", token: "platform-jwt" }).pipe(
      Retry.none,
      Effect.provideService(
        HttpClient.HttpClient,
        client({ token: "dp.st.short", expires_at: "2026-09-20T00:00:00Z" }),
      ),
    ),
  );
  expect(Redacted.isRedacted(response.token)).toBe(true);
  expect(Redacted.value(response.token as Redacted.Redacted<string>)).toBe(
    "dp.st.short",
  );
  expect(response.expires_at).toBe("2026-09-20T00:00:00Z");
});

test("a rejected identity surfaces as Unauthorized", async () => {
  const result = await Effect.runPromise(
    authOidc({ identity: "identity-1", token: "bad" }).pipe(
      Retry.none,
      Effect.provideService(
        HttpClient.HttpClient,
        client({ messages: ["Invalid token"] }, 401),
      ),
      Effect.result,
    ),
  );
  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result))
    expect(result.failure._tag).toBe("Unauthorized");
});
