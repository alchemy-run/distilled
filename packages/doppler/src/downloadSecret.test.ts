import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { fromApiKey } from "./credentials.ts";
import * as Retry from "./retry.ts";
import {
  downloadSecret,
  DownloadSecretRequest,
  DownloadSecretResponse,
} from "./services/doppler.ts";

const secrets = {
  CUSTOM_API_TOKEN: "test-token",
  DATABASE_URL: "postgres://example.invalid/database",
  EMPTY: "",
  MULTILINE: "first\nsecond",
  UNICODE: "hello 🌎",
};

describe("downloadSecret", () => {
  for (const { name, input } of [
    { name: "service token with default format", input: {} },
    { name: "service token with JSON format", input: { format: "json" } },
    {
      name: "explicit project and config",
      input: { project: "my-project", config: "dev", format: "json" },
    },
  ] satisfies Array<{ name: string; input: DownloadSecretRequest }>) {
    test(`downloads arbitrary secrets using ${name}`, async () => {
      expect(
        Schema.decodeUnknownSync(Schema.toType(DownloadSecretRequest))(input),
      ).toEqual(input);
      let requests = 0;
      const result: Record<string, string | undefined> =
        await Effect.runPromise(
          downloadSecret(input).pipe(
            Retry.none,
            Effect.provide(
              Layer.mergeAll(
                fromApiKey({ apiKey: "test-service-token" }),
                Layer.succeed(
                  HttpClient.HttpClient,
                  HttpClient.make((request) =>
                    Effect.sync(() => {
                      requests++;
                      expect(request.method).toBe("GET");
                      const url = new URL(request.url);
                      expect(`${url.origin}${url.pathname}`).toBe(
                        "https://api.doppler.com/v3/configs/config/secrets/download",
                      );
                      expect(Object.fromEntries(url.searchParams)).toEqual(
                        input,
                      );
                      expect(request.headers.authorization).toBe(
                        "Bearer test-service-token",
                      );
                      expect(request.headers.accept).toBe("application/json");
                      return HttpClientResponse.fromWeb(
                        request,
                        Response.json(secrets),
                      );
                    }),
                  ),
                ),
              ),
            ),
          ),
        );
      expect(requests).toBe(1);
      expect(result).toEqual(secrets);
    });
  }

  test("the generated response schema preserves arbitrary keys and empty strings", () => {
    const result: Record<string, string | undefined> = Schema.decodeUnknownSync(
      Schema.toType(DownloadSecretResponse),
    )(secrets);
    expect(result).toEqual(secrets);
    expect(
      Schema.decodeUnknownSync(Schema.toType(DownloadSecretResponse))({}),
    ).toEqual({});
  });

  test("the generated response schema rejects non-string secret values", () => {
    for (const value of [123, null, { nested: "value" }, ["value"]]) {
      expect(() =>
        Schema.decodeUnknownSync(Schema.toType(DownloadSecretResponse))({
          CUSTOM_SECRET: value,
        }),
      ).toThrow();
    }
  });
});
