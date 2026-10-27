import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type { HttpClientRequest } from "effect/http/HttpClientRequest";
import * as Response from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { credentials } from "../src/credentials.ts";

export const testCredentials = credentials({
  endpoint: "https://pve.example.com:8006",
  tokenId: Redacted.make("test@pve!reader"),
  tokenSecret: Redacted.make("test-secret"),
});

/** Credentials plus an HTTP client that answers every request with `reply`'s JSON. */
export function mockLayer(
  reply: (request: HttpClientRequest) => { readonly status?: number; readonly body: unknown },
) {
  return Layer.mergeAll(
    testCredentials,
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) => {
        const result = reply(request);
        return Effect.succeed(
          Response.fromWeb(
            request,
            new globalThis.Response(JSON.stringify(result.body), {
              status: result.status ?? 200,
              headers: { "content-type": "application/json" },
            }),
          ),
        );
      }),
    ),
  );
}
