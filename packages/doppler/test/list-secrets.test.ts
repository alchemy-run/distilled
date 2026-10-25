import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { listSecrets } from "../src/services/doppler.ts";

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
        apiKey: Redacted.make("dp.st.test"),
        apiBaseUrl: "https://api.doppler.test",
      }),
    ),
  );

describe("listSecrets", () => {
  test("secret values inside the secrets map come back Redacted", async () => {
    const result = await Effect.runPromise(
      listSecrets({ project: "backend", config: "dev" }).pipe(
        Retry.none,
        Effect.provide(
          respondWith({
            secrets: {
              DATABASE_URL: {
                raw: "postgres://user:hunter2@db/app",
                computed: "postgres://user:hunter2@db/app",
                note: "primary",
              },
              EMPTY: { raw: null, computed: null },
            },
          }),
        ),
      ),
    );

    const entry = result.secrets?.DATABASE_URL;
    expect(Redacted.isRedacted(entry?.raw)).toBe(true);
    expect(Redacted.isRedacted(entry?.computed)).toBe(true);
    expect(Redacted.value(entry!.raw as Redacted.Redacted<string>)).toBe(
      "postgres://user:hunter2@db/app",
    );
    expect(entry?.note).toBe("primary");
    expect(result.secrets?.EMPTY).toEqual({ raw: null, computed: null });
    expect(JSON.stringify(result)).not.toContain("hunter2");
  });
});
