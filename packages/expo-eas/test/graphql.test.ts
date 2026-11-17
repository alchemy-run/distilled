import {
  GqlTransport,
  GraphQLTransportError,
  type CompiledOperation,
  type GraphQLResponse,
} from "@distilled.cloud/core/graphql";
import { Query } from "@distilled.cloud/core/query";
import { Credentials, Eas, GraphQLLive } from "@distilled.cloud/expo-eas";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
/** Mock-transport regressions for the EAS Query SDK. */
import { describe, expect, test } from "vitest";

const answer = (response: GraphQLResponse) => {
  const requests: CompiledOperation[] = [];
  const layer = Layer.succeed(GqlTransport, {
    execute: (request) =>
      Effect.sync(() => {
        requests.push(request);
        return response;
      }),
  });
  return { layer, requests };
};

const failure = async <A, E>(
  effect: Effect.Effect<A, E, GqlTransport>,
  layer: Layer.Layer<GqlTransport>,
): Promise<E> => {
  const result = await Effect.runPromise(Effect.result(effect.pipe(Effect.provide(layer))));
  if (Result.isSuccess(result)) throw new Error("expected a failure");
  return result.failure;
};

const appName = Query.fn((appId: string) => Eas.app().byId({ appId }).name);

const createChannel = Query.fn(
  (appId: string, name: string) =>
    Eas.updateChannel().createUpdateChannelForApp({ appId, name, branchMapping: "{}" }).id,
);

describe("EAS Query SDK", () => {
  test("a namespaced lookup passes its argument to the nested field", async () => {
    const { layer, requests } = answer({ data: { app: { byId: { name: "my-app" } } } });
    const name = await Effect.runPromise(appName("app-1").pipe(Effect.provide(layer)));
    expect(name).toBe("my-app");
    expect(requests).toHaveLength(1);
    expect(requests[0]!.document).toMatch(/app \{\s*byId\(appId: \$v0\) \{\s*name/);
    expect(requests[0]!.variables).toEqual({ v0: "app-1" });
  });

  test("extensions.errorCode classifies into the typed EAS error", async () => {
    const { layer } = answer({
      data: null,
      errors: [
        {
          message: "Channel already exists",
          path: ["updateChannel", "createUpdateChannelForApp"],
          extensions: { errorCode: "CHANNEL_ALREADY_EXISTS" },
        },
      ],
    });
    const error = await failure(createChannel("app-1", "production"), layer);
    expect(error).toMatchObject({
      _tag: "EasChannelAlreadyExists",
      code: "CHANNEL_ALREADY_EXISTS",
    });
  });

  test("the free-tier platform variants share one tag", async () => {
    const { layer } = answer({
      data: null,
      errors: [
        {
          message: "Free tier disabled for iOS",
          path: ["updateChannel"],
          extensions: { errorCode: "EAS_BUILD_FREE_TIER_DISABLED_IOS" },
        },
      ],
    });
    const error = await failure(createChannel("app-1", "production"), layer);
    expect(error).toMatchObject({
      _tag: "EasBuildFreeTierDisabled",
      code: "EAS_BUILD_FREE_TIER_DISABLED_IOS",
    });
  });

  test("GraphQLLive posts to <apiBaseUrl>/graphql with a Bearer token", async () => {
    const seen: Array<{ url: string; authorization: string | undefined }> = [];
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          seen.push({ url: request.url, authorization: request.headers["authorization"] });
          return HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify({ data: { app: { byId: { name: "my-app" } } } }), {
              status: 200,
            }),
          );
        }),
      ),
    );
    const credentials = Layer.succeed(
      Credentials,
      Effect.succeed({
        accessToken: Redacted.make("expo-token"),
        apiBaseUrl: "https://staging-api.expo.dev/",
      }),
    );
    const name = await Effect.runPromise(
      appName("app-1").pipe(
        Effect.provide(GraphQLLive.pipe(Layer.provideMerge(http), Layer.provideMerge(credentials))),
      ),
    );
    expect(name).toBe("my-app");
    expect(seen).toEqual([
      { url: "https://staging-api.expo.dev/graphql", authorization: "Bearer expo-token" },
    ]);
  });

  test("an HTTP error without GraphQL errors is GraphQLTransportError", async () => {
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }),
          ),
        ),
      ),
    );
    const credentials = Layer.succeed(
      Credentials,
      Effect.succeed({ accessToken: Redacted.make("bad"), apiBaseUrl: "https://api.expo.dev" }),
    );
    const error = await failure(
      appName("app-1"),
      GraphQLLive.pipe(Layer.provideMerge(http), Layer.provideMerge(credentials)),
    );
    expect(error).toBeInstanceOf(GraphQLTransportError);
    expect(error).toMatchObject({ status: 401, message: "EAS HTTP 401: Unauthorized" });
  });
});
