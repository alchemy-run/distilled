import { inspect } from "node:util";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import type { HttpClientRequest } from "effect/http/HttpClientRequest";
import * as Response from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import { describe, expect, it } from "vitest";
import { getClusterResources } from "../src/services/cluster.ts";
import { testCredentials } from "./helpers.ts";

const layer = (
  execute: (request: HttpClientRequest) => ReturnType<HttpClient.HttpClient["execute"]>,
) =>
  Layer.mergeAll(testCredentials, Layer.succeed(HttpClient.HttpClient, HttpClient.make(execute)));

// Node prints crashes without Effect's inspect hooks, which are what normally redact headers.
const crashOutput = (value: unknown) => inspect(value, { depth: null, customInspect: false });

describe("credentials in failures", () => {
  it("removes the token from transport errors", async () => {
    const error = await Effect.runPromise(
      getClusterResources({ type: "vm" }).pipe(
        Effect.flip,
        Effect.provide(
          layer((request) =>
            Effect.fail(
              new HttpClientError.HttpClientError({
                reason: new HttpClientError.TransportError({
                  request,
                  cause: new Error("refused"),
                }),
              }),
            ),
          ),
        ),
      ),
    );
    expect(HttpClientError.isHttpClientError(error)).toBe(true);
    if (!HttpClientError.isHttpClientError(error)) return;
    expect(error.reason._tag).toBe("TransportError");
    expect(error.reason.request.url).toBe(
      "https://pve.example.com:8006/api2/json/cluster/resources?type=vm",
    );
    expect(crashOutput(error)).not.toContain("test-secret");
    expect(crashOutput(error)).not.toContain("PVEAPIToken");
  });

  it("removes the token from a failed response body read", async () => {
    const exit = await Effect.runPromiseExit(
      getClusterResources({ type: "vm" }).pipe(
        Effect.provide(
          layer((request) =>
            Effect.succeed(
              Response.fromWeb(
                request,
                new globalThis.Response(
                  new ReadableStream({
                    start: (controller) => controller.error(new Error("reset")),
                  }),
                  { headers: { "content-type": "application/json" } },
                ),
              ),
            ),
          ),
        ),
      ),
    );
    expect(Exit.isFailure(exit)).toBe(true);
    if (!Exit.isFailure(exit)) return;
    const failure = Cause.squash(exit.cause);
    expect(HttpClientError.isHttpClientError(failure)).toBe(true);
    expect(crashOutput(failure)).not.toContain("test-secret");
    expect(crashOutput(failure)).not.toContain("PVEAPIToken");
  });
});
