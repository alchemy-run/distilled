import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { credentials } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { v2Exchange } from "../src/services/oauth.ts";

const reply = (body: string) =>
  Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.succeed(HttpClientResponse.fromWeb(request, new Response(body, { status: 200 }))),
      ),
    ),
    credentials({ token: Redacted.make("xoxb-test") }),
  );

const logged = vi.spyOn(console, "error").mockImplementation(() => {});

beforeAll(() => {
  process.env.DISTILLED_DEBUG_HTTP = "1";
});

afterAll(() => {
  delete process.env.DISTILLED_DEBUG_HTTP;
  logged.mockRestore();
});

describe("DISTILLED_DEBUG_HTTP response line", () => {
  test("withholds the body of a response whose output has sensitive members", async () => {
    logged.mockClear();
    await Effect.runPromise(
      v2Exchange({ client_id: "cid", client_secret: "s" }).pipe(
        Retry.none,
        Effect.provide(
          reply(
            JSON.stringify({
              ok: true,
              app_id: "A1",
              access_token: "xoxb-fixture-access",
              refresh_token: "xoxe-fixture-refresh",
            }),
          ),
        ),
      ),
    );
    const lines = logged.mock.calls.map((call) => String(call[0]));
    expect(lines).toContain("[distilled] <- 200 [REDACTED]");
    expect(lines.join("\n")).not.toContain("xoxb-fixture-access");
    expect(lines.join("\n")).not.toContain("xoxe-fixture-refresh");
  });
});
