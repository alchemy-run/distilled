import * as Prisma from "@distilled.cloud/prisma";
import * as Management from "@distilled.cloud/prisma/management";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";

const sendGetWorkspaces = (credentials: Layer.Layer<Prisma.Credentials>) => {
  const requests: HttpClientRequest.HttpClientRequest[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(request);
        return HttpClientResponse.fromWeb(
          request,
          new Response(
            JSON.stringify({ data: [], pagination: { nextCursor: null, hasMore: false } }),
            {
              headers: { "content-type": "application/json" },
            },
          ),
        );
      }),
    ),
  );
  return Management.getWorkspaces({}).pipe(
    Effect.provide(Layer.mergeAll(credentials, http)),
    Effect.map(() => requests),
    Effect.runPromise,
  );
};

test("sends the bearer token when one is configured", async () => {
  const requests = await sendGetWorkspaces(Prisma.fromApiToken({ apiToken: Redacted.make("t") }));
  expect(requests).toHaveLength(1);
  expect(requests[0]!.headers.authorization).toBe("Bearer t");
});

test("sends no Authorization header without a token", async () => {
  const requests = await sendGetWorkspaces(
    Prisma.fromApiToken({ apiBaseUrl: "https://management.example" }),
  );
  expect(requests).toHaveLength(1);
  expect(requests[0]!.url).toBe("https://management.example/v1/workspaces");
  expect(requests[0]!.headers.authorization).toBeUndefined();
});
