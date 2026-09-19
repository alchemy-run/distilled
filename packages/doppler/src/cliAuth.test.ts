import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import {
  generateCliAuth,
  authorizeCliAuth,
  revokeCliAuth,
} from "./services/doppler.ts";
import * as Retry from "./retry.ts";

const client = (
  response: unknown,
  status = 200,
  check?: (request: HttpClientRequest.HttpClientRequest) => void,
) =>
  HttpClient.make((request) =>
    Effect.sync(() => {
      expect(request.headers.authorization).toBeUndefined();
      expect(request.headers.accept).toBe("application/json");
      check?.(request);
      return HttpClientResponse.fromWeb(
        request,
        Response.json(response, { status }),
      );
    }),
  );

test("generate browser login without credentials, redacting the polling code", async () => {
  const response = await Effect.runPromise(
    generateCliAuth({
      hostname: "test",
      version: "alchemy",
      os: "darwin",
      arch: "arm64",
    }).pipe(
      Retry.none,
      Effect.provideService(
        HttpClient.HttpClient,
        client(
          {
            code: "user-code",
            polling_code: "poll-secret",
            auth_url: "https://dashboard.doppler.com/auth/cli",
          },
          200,
          (request) => {
            const url = new URL(request.url);
            expect(url.pathname).toBe("/v3/auth/cli/generate/2");
            expect(Object.fromEntries(url.searchParams)).toEqual({
              hostname: "test",
              version: "alchemy",
              os: "darwin",
              arch: "arm64",
            });
          },
        ),
      ),
    ),
  );
  expect(response.code).toBe("user-code");
  expect(Redacted.isRedacted(response.polling_code)).toBe(true);
  expect(JSON.stringify(response)).not.toContain("poll-secret");
});

test("authorize sends the polling code as JSON and redacts the returned token", async () => {
  const response = await Effect.runPromise(
    authorizeCliAuth({ code: Redacted.make("poll-secret") }).pipe(
      Retry.none,
      Effect.provideService(
        HttpClient.HttpClient,
        client(
          {
            token: "issued-secret",
            name: "local",
            dashboard_url: "https://dashboard.doppler.com",
          },
          200,
          (request) => {
            expect(request.method).toBe("POST");
            expect(new URL(request.url).pathname).toBe(
              "/v3/auth/cli/authorize",
            );
            if (request.body._tag !== "Uint8Array")
              throw new Error("Expected JSON request");
            expect(
              JSON.parse(new TextDecoder().decode(request.body.body)),
            ).toEqual({ code: "poll-secret" });
          },
        ),
      ),
    ),
  );
  expect(Redacted.isRedacted(response.token)).toBe(true);
  expect(JSON.stringify(response)).not.toContain("issued-secret");
});

test("pending browser approval is a typed Conflict", async () => {
  const result = await Effect.runPromise(
    authorizeCliAuth({ code: "pending" }).pipe(
      Retry.none,
      Effect.result,
      Effect.provideService(
        HttpClient.HttpClient,
        client({ messages: ["Authorization pending"] }, 409),
      ),
    ),
  );
  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) expect(result.failure._tag).toBe("Conflict");
});

test("revoke sends the login token in JSON without a bearer credential", async () => {
  await Effect.runPromise(
    revokeCliAuth({ token: Redacted.make("issued-secret") }).pipe(
      Retry.none,
      Effect.provideService(
        HttpClient.HttpClient,
        client({ success: true }, 200, (request) => {
          expect(request.method).toBe("POST");
          expect(new URL(request.url).pathname).toBe("/v3/auth/cli/revoke");
          if (request.body._tag !== "Uint8Array")
            throw new Error("Expected JSON request");
          expect(
            JSON.parse(new TextDecoder().decode(request.body.body)),
          ).toEqual({ token: "issued-secret" });
        }),
      ),
    ),
  );
});
