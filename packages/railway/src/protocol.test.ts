import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Result from "effect/Result";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { CredentialsFromToken } from "./credentials.ts";
import {
  cancelDeployment,
  listEnvironmentServiceInstances,
} from "./services/railway.ts";
import * as Stream from "effect/Stream";
import * as Retry from "./retry.ts";

test("environment instance discovery follows Relay pages and unwraps the nested connection", () => {
  let calls = 0;
  return listEnvironmentServiceInstances
    .items({ environmentId: "env", first: 1 })
    .pipe(
      Stream.runCollect,
      Effect.provide(CredentialsFromToken({ token: "test-token" })),
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.sync(() => {
            calls++;
            return HttpClientResponse.fromWeb(
              request,
              Response.json({
                data: {
                  environment: {
                    serviceInstances: {
                      edges: [
                        {
                          cursor: `cursor-${calls}`,
                          node: {
                            id: `instance-${calls}`,
                            serviceId: `service-${calls}`,
                            environmentId: "env",
                            deletedAt: null,
                            source: { image: "redis" },
                          },
                        },
                      ],
                      pageInfo: {
                        startCursor: `cursor-${calls}`,
                        endCursor: `cursor-${calls}`,
                        hasPreviousPage: calls > 1,
                        hasNextPage: calls < 2,
                      },
                    },
                  },
                },
              }),
            );
          }),
        ),
      ),
      Retry.none,
      Effect.tap((rows) =>
        Effect.sync(() => {
          expect(calls).toBe(2);
          expect(rows.map((row) => row.serviceId)).toEqual([
            "service-1",
            "service-2",
          ]);
        }),
      ),
      Effect.runPromise,
    );
});

const responseError = (body: unknown, status = 200, invalidJson = false) =>
  cancelDeployment({ id: "missing-deployment" }).pipe(
    Effect.provide(CredentialsFromToken({ token: "test-token" })),
    Effect.provideService(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() =>
          HttpClientResponse.fromWeb(
            request,
            invalidJson
              ? new Response("invalid JSON", { status })
              : Response.json(body, { status }),
          ),
        ),
      ),
    ),
    Retry.none,
    Effect.result,
    Effect.runPromise,
  );

for (const code of [
  "NOT_FOUND",
  "PROJECT_NOT_FOUND",
  "SERVICE_NOT_FOUND",
  "ENVIRONMENT_NOT_FOUND",
  "VOLUME_NOT_FOUND",
  "BUCKET_NOT_FOUND",
  "RESOURCE_NOT_FOUND",
]) {
  test(`${code} uses core NotFound`, () =>
    responseError({
      errors: [{ message: "Resource missing", extensions: { code } }],
    }).then((result) => {
      expect(Result.isFailure(result)).toBe(true);
      if (Result.isFailure(result))
        expect(result.failure._tag).toBe("NotFound");
    }));
}

test("HTTP 404 uses the same NotFound as GraphQL", () =>
  responseError({ message: "Resource missing" }, 404).then((result) => {
    expect(Result.isFailure(result)).toBe(true);
    if (Result.isFailure(result)) expect(result.failure._tag).toBe("NotFound");
  }));

for (const [message, tag] of [
  ["Deployment not found", "NotFound"],
  [
    'A service named "api" already exists in this project',
    "RailwayAlreadyExists",
  ],
  ["Not Authorized", "RailwayForbidden"],
  ["Unexpected resolver failure", "RailwayInternalError"],
] as const) {
  test(`classifies observed internal error: ${message}`, () =>
    responseError({
      errors: [{ message, extensions: { code: "INTERNAL_SERVER_ERROR" } }],
    }).then((result) => {
      expect(Result.isFailure(result)).toBe(true);
      if (Result.isFailure(result)) expect(result.failure._tag).toBe(tag);
    }));
}

test("processing failures retain Railway's trace ID and response", () => {
  const body = {
    data: null,
    errors: [
      {
        message: "Problem processing request",
        traceId: "12589155908218604820",
      },
    ],
  };
  return responseError(body).then((result) => {
    expect(Result.isFailure(result)).toBe(true);
    if (Result.isFailure(result)) {
      expect(result.failure._tag).toBe("RailwayRequestProcessingFailed");
      if (result.failure._tag === "RailwayRequestProcessingFailed") {
        expect(result.failure.traceId).toBe(body.errors[0]!.traceId);
        expect(result.failure.body).toEqual(body);
      }
    }
  });
});

test("invalid JSON responses remain parse failures", () =>
  responseError(undefined, 200, true).then((result) => {
    expect(Result.isFailure(result)).toBe(true);
    if (Result.isFailure(result))
      expect(result.failure._tag).toBe("RailwayParseError");
  }));

test("unmatched errors remain failures with their original response", () => {
  const body = {
    errors: [
      { message: "New upstream failure", extensions: { code: "NEW_ERROR" } },
    ],
  };
  return responseError(body).then((result) => {
    expect(Result.isFailure(result)).toBe(true);
    if (Result.isFailure(result)) {
      expect(result.failure._tag).toBe("UnknownRailwayError");
      if (result.failure._tag === "UnknownRailwayError")
        expect(result.failure.body).toEqual(body);
    }
  });
});
