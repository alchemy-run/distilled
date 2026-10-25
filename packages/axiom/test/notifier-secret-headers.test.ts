import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { getNotifier } from "../src/services/v2.ts";

const respondWith = (body: unknown) =>
  Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify(body), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
          ),
        ),
      ),
    ),
    Layer.succeed(
      Credentials,
      Effect.succeed({
        apiKey: Redacted.make("xaat-test"),
        apiBaseUrl: "https://api.axiom.test",
      }),
    ),
  );

describe("getNotifier", () => {
  test("custom webhook secret header values come back Redacted", async () => {
    const result = await Effect.runPromise(
      getNotifier({ id: "notify_1" }).pipe(
        Retry.none,
        Effect.provide(
          respondWith({
            id: "notify_1",
            name: "pager",
            properties: {
              customWebhook: {
                url: "https://hooks.example.com/axiom",
                body: "{}",
                headers: { "X-Team": "ops" },
                secretHeaders: { Authorization: "Bearer fixture-axiom-token" },
              },
            },
          }),
        ),
      ),
    );

    const webhook = result.properties.customWebhook;
    expect(webhook?.headers).toEqual({ "X-Team": "ops" });
    const authorization = webhook?.secretHeaders?.Authorization;
    expect(Redacted.isRedacted(authorization)).toBe(true);
    expect(Redacted.value(authorization as Redacted.Redacted<string>)).toBe(
      "Bearer fixture-axiom-token",
    );
    expect(JSON.stringify(result)).not.toContain("fixture-axiom-token");
  });
});
