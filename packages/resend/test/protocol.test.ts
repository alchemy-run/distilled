import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "../src/credentials.ts";
import { USER_AGENT, type ResendOpContext } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import { createEmail, listDomains } from "../src/services/resend.ts";

// Response bodies below are from a live run against the Resend API
// (2026-10-29), ids kept, secrets replaced.

const API_KEY = "re_test_key";

interface Recorded {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: HttpClientRequest.HttpClientRequest["body"];
}

const json = (value: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });

const run = <A, E>(
  operation: Effect.Effect<A, E, ResendOpContext>,
  respond: (request: Recorded, attempt: number) => Response,
  { retry = false }: { retry?: boolean } = {},
) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const recorded: Recorded = {
        method: request.method,
        url: new URL(request.url),
        headers: { ...request.headers },
        body: request.body,
      };
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded, requests.length));
    }),
  );
  const layers = Layer.mergeAll(
    Layer.succeed(HttpClient.HttpClient, client),
    fromApiKey({ apiKey: Redacted.make(API_KEY) }),
  );
  const result = Effect.runPromise(
    Effect.result(
      (retry ? operation : operation.pipe(Retry.none)).pipe(
        Effect.provide(ResponseValidation.strict),
        Effect.provide(layers),
      ),
    ),
  );
  return { result, requests };
};

const bodyJson = (request: Recorded): unknown => {
  const body = request.body as { _tag: string; body?: Uint8Array };
  return JSON.parse(new TextDecoder().decode(body.body));
};

describe("requests", () => {
  test("every request carries the bearer key and a User-Agent", async () => {
    const { result, requests } = run(listDomains({}), () =>
      json({ object: "list", has_more: false, data: [] }),
    );
    expect((await result)._tag).toBe("Success");
    expect(requests[0]!.headers.authorization).toBe(`Bearer ${API_KEY}`);
    expect(requests[0]!.headers["user-agent"]).toBe(USER_AGENT);
  });

  test("createEmail sends Idempotency-Key as a header, not in the body", async () => {
    const { result, requests } = run(
      createEmail({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Hello",
        text: "Hi",
        idempotencyKey: "order-42",
      }),
      () => json({ id: "01a185a9-f053-7ec0-b4a8-88987cc2330d" }),
    );
    expect((await result)._tag).toBe("Success");
    expect(requests[0]!.headers["idempotency-key"]).toBe("order-42");
    expect(bodyJson(requests[0]!)).not.toHaveProperty("idempotencyKey");
  });
});

describe("retries", () => {
  test("a rate limit is retried", async () => {
    const { result, requests } = run(
      listDomains({}),
      (_, attempt) =>
        attempt === 1
          ? json(
              { statusCode: 429, message: "Too many requests.", name: "rate_limit_exceeded" },
              429,
              { "retry-after": "0" },
            )
          : json({ object: "list", has_more: false, data: [] }),
      { retry: true },
    );
    expect((await result)._tag).toBe("Success");
    expect(requests).toHaveLength(2);
  });
});
