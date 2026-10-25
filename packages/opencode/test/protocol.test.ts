import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromPassword } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { appAgents } from "../src/services/opencode.ts";

describe("OpencodeProtocol", () => {
  test("encodes Basic credentials as UTF-8 then base64, including characters above U+00FF", async () => {
    const seen: Array<Record<string, string>> = [];
    const client = HttpClient.make((request) =>
      Effect.sync(() => {
        seen.push({ ...request.headers });
        return HttpClientResponse.fromWeb(request, Response.json([]));
      }),
    );
    await Effect.runPromise(
      appAgents({}).pipe(
        Retry.none,
        Effect.provide(
          Layer.mergeAll(
            Layer.succeed(HttpClient.HttpClient, client),
            fromPassword({ username: "jürgen", password: Redacted.make("pässwörd€") }),
          ),
        ),
      ),
    );
    expect(seen).toHaveLength(1);
    expect(seen[0]!.authorization).toBe(
      `Basic ${Buffer.from("jürgen:pässwörd€", "utf8").toString("base64")}`,
    );
  });
});
