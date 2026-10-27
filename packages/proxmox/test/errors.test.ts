import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import { HttpClientError, TransportError } from "effect/http/HttpClientError";
import { expect, it } from "vitest";
import { describeError } from "../src/errors.ts";
import { getClusterResources } from "../src/services/cluster.ts";
import { mockLayer } from "./helpers.ts";

const failure = (status: number) =>
  Effect.runPromise(
    getClusterResources({ type: "vm" }).pipe(
      Effect.flip,
      Effect.provide(mockLayer(() => ({ status, body: { data: null, message: "test-secret" } }))),
    ),
  );

it.each([
  [403, "Forbidden (HTTP 403)"],
  [504, "GatewayTimeout (HTTP 408 or 504)"],
  [418, "UnknownProxmoxError (HTTP 418)"],
])("summarizes HTTP %i without the message", async (status, summary) => {
  expect(describeError(await failure(status))).toBe(summary);
});

it("summarizes transport failures without the request", async () => {
  const error = await Effect.runPromise(
    getClusterResources({ type: "vm" }).pipe(
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.fail(new HttpClientError({ reason: new TransportError({ request }) })),
        ),
      ),
      Effect.flip,
      Effect.provide(mockLayer(() => ({ body: { data: [] } }))),
    ),
  );
  expect(describeError(error)).toBe("HttpClientError (TransportError)");
});
