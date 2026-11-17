import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import { getBook, getOrders } from "../src/services/clob.ts";
import { signL2 } from "../src/signing.ts";

// The vector Polymarket's own clients test against
// (Polymarket/clob-client tests/signing/hmac.test.ts,
// Polymarket/py-clob-client tests/signing/test_hmac.py).
const SECRET = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
const EXPECTED = "ZwAdJKvoYRlEKDkNMwd5BuwNNtg93kNaR_oU2HrfVvc=";

describe("signL2", () => {
  test("matches the official clients' vector", async () => {
    const signature = await Effect.runPromise(
      signL2({
        secret: SECRET,
        timestamp: 1000000,
        method: "test-sign",
        requestPath: "/orders",
        body: '{"hash": "0x123"}',
      }),
    );
    expect(signature).toBe(EXPECTED);
  });

  test("reads a base64url secret without padding as base64", async () => {
    const sign = (secret: string) =>
      Effect.runPromise(
        signL2({
          secret,
          timestamp: 1000000,
          method: "test-sign",
          requestPath: "/orders",
          body: '{"hash": "0x123"}',
        }),
      );
    expect(await sign("--_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")).toBe(
      await sign("++/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="),
    );
  });
});

describe("ClobProtocol", () => {
  const clob = {
    address: "0x1111111111111111111111111111111111111111",
    apiKey: Redacted.make("7b1e2d60-6f9a-4dd7-8f3e-21b8f94c77a2"),
    secret: Redacted.make(SECRET),
    passphrase: Redacted.make("passphrase-value"),
  };

  const capture = () => {
    const requests: Array<HttpClientRequest.HttpClientRequest> = [];
    const client = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) => {
        requests.push(request);
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response("{}", { status: 200, headers: { "content-type": "application/json" } }),
          ),
        );
      }),
    );
    return { requests, client };
  };

  test("signs the route path without the query string", async () => {
    const { requests, client } = capture();
    await Effect.runPromise(
      getOrders({ market: "0xabc" }).pipe(
        Effect.provide(Layer.mergeAll(client, credentials({ clob }))),
      ),
    );
    expect(requests[0]!.url).toContain("?market=0xabc");
    const headers = requests[0]!.headers;
    expect(headers["poly_address"]).toBe(clob.address);
    expect(headers["poly_api_key"]).toBe(Redacted.value(clob.apiKey));
    expect(headers["poly_passphrase"]).toBe("passphrase-value");
    const expected = await Effect.runPromise(
      signL2({
        secret: SECRET,
        timestamp: headers["poly_timestamp"]!,
        method: "GET",
        requestPath: "/data/orders",
      }),
    );
    expect(headers["poly_signature"]).toBe(expected);
  });

  test("sends public requests unsigned without CLOB credentials", async () => {
    const { requests, client } = capture();
    await Effect.runPromise(
      getBook({ token_id: "123" }).pipe(Effect.provide(Layer.mergeAll(client, credentials({})))),
    );
    expect(requests[0]!.headers["poly_signature"]).toBeUndefined();
  });
});
