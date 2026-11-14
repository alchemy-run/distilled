import { inspect } from "node:util";
import { Query } from "@distilled.cloud/core/query";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
/** Fly GraphQL Query SDK: the real transport against canned HTTP responses. */
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import { Fly, GraphQLLive, GraphQLTransportError } from "../src/graphql-index.ts";

const SECRET = "sentinel-secret-7f3a";

const respondWith = (status: number, body: string) => {
  const seen: Array<{ url: string; authorization: string | undefined; body: unknown }> = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        seen.push({
          url: request.url,
          authorization: request.headers["authorization"],
          body: request.body,
        });
        return HttpClientResponse.fromWeb(request, new Response(body, { status }));
      }),
    ),
  );
  const layer = GraphQLLive.pipe(
    Layer.provideMerge(http),
    Layer.provideMerge(
      credentials({ apiKey: Redacted.make("fly-token"), apiBaseUrl: "https://machines.test" }),
    ),
  );
  return { layer, seen };
};

const failure = async <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  layer: Layer.Layer<R>,
): Promise<E> => {
  const result = await Effect.runPromise(Effect.result(effect.pipe(Effect.provide(layer))));
  if (Result.isSuccess(result)) throw new Error("expected a failure");
  return result.failure;
};

const publicUrl = `redis://default:${SECRET}@fly-decoder-test.upstash.io:6379`;
const environment = { AWS_SECRET_ACCESS_KEY: SECRET, BUCKET_NAME: "decoder-test" };

const addOnSecrets = Query.fn((name: string) => {
  const addOn = Fly.addOn({ name });
  return {
    name: addOn.name,
    password: addOn.password,
    publicUrl: addOn.publicUrl,
    environment: addOn.environment,
  };
});

describe("Fly GraphQL Query SDK", () => {
  test("posts to api.fly.io/graphql with the REST token as Bearer", async () => {
    const { layer, seen } = respondWith(
      200,
      JSON.stringify({ data: { organization: { agreedToProviderTos: true } } }),
    );
    const agreed = await Effect.runPromise(
      Query.fn((slug: string) =>
        Fly.organization({ slug }).agreedToProviderTos({ providerName: "tigris" }),
      )("acme").pipe(Effect.provide(layer)),
    );
    expect(agreed).toBe(true);
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatchObject({
      url: "https://api.fly.io/graphql",
      authorization: "Bearer fly-token",
    });
  });

  test("an add-on's password, public URL and environment decode as Redacted", async () => {
    const { layer } = respondWith(
      200,
      JSON.stringify({
        data: { addOn: { name: "decoder-test", password: SECRET, publicUrl, environment } },
      }),
    );
    const result = await Effect.runPromise(
      addOnSecrets("decoder-test").pipe(Effect.provide(layer)),
    );
    expect(result.name).toBe("decoder-test");
    expect(Redacted.value(result.password!)).toBe(SECRET);
    expect(Redacted.value(result.publicUrl!)).toBe(publicUrl);
    expect(Redacted.value(result.environment!)).toEqual(environment);
    expect(inspect(result, { depth: Infinity })).not.toContain(SECRET);
  });

  test("ensureDepotRemoteBuilder returns the build token redacted", async () => {
    const { layer } = respondWith(
      200,
      JSON.stringify({
        data: { ensureDepotRemoteBuilder: { buildId: "b1", buildToken: SECRET } },
      }),
    );
    const result = await Effect.runPromise(
      Query.fn((appName: string) => {
        const payload = Fly.ensureDepotRemoteBuilder({ input: { appName } });
        return { buildId: payload.buildId, buildToken: payload.buildToken };
      })("app").pipe(Effect.provide(layer)),
    );
    expect(result.buildId).toBe("b1");
    expect(Redacted.value(result.buildToken!)).toBe(SECRET);
    expect(inspect(result, { depth: Infinity })).not.toContain(SECRET);
  });

  test("deleteAddOn's missing Tigris bucket is TigrisBucketNotFound", async () => {
    const { layer } = respondWith(
      200,
      JSON.stringify({
        data: { deleteAddOn: null },
        errors: [
          {
            message: "Tigris: The specified bucket does not exist",
            path: ["deleteAddOn"],
          },
        ],
      }),
    );
    const error = await failure(
      Query.fn((name: string) => Fly.deleteAddOn({ input: { name } }).deletedAddOnName)("b"),
      layer,
    );
    expect(error).toMatchObject({ _tag: "TigrisBucketNotFound" });
  });

  test("a missing remote-builder app is RemoteBuilderAppNotFound, other misses FlyNotFound", async () => {
    const notFound = (root: string, message: string) =>
      respondWith(
        200,
        JSON.stringify({
          data: null,
          errors: [{ message, path: [root], extensions: { code: "NOT_FOUND" } }],
        }),
      ).layer;
    const builder = await failure(
      Query.fn((appName: string) => Fly.ensureDepotRemoteBuilder({ input: { appName } }).buildId)(
        "gone",
      ),
      notFound("ensureDepotRemoteBuilder", "Could not find App"),
    );
    expect(builder).toMatchObject({ _tag: "RemoteBuilderAppNotFound" });
    const addOn = await failure(addOnSecrets("gone"), notFound("addOn", "Could not find AddOn"));
    expect(addOn).toMatchObject({ _tag: "FlyNotFound", code: "NOT_FOUND" });
  });

  test("a body cut off mid-secret is GraphQLTransportError without the secret", async () => {
    const { layer } = respondWith(200, `{"data":{"addOn":{"name":"a","password":"${SECRET}`);
    const error = await failure(addOnSecrets("a"), layer);
    expect(error).toBeInstanceOf(GraphQLTransportError);
    expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
  });

  test("an HTTP error without GraphQL errors keeps its status", async () => {
    const { layer } = respondWith(401, JSON.stringify({ error: "unauthorized" }));
    const error = await failure(addOnSecrets("a"), layer);
    expect(error).toBeInstanceOf(GraphQLTransportError);
    expect(error).toMatchObject({ status: 401, message: "Fly HTTP 401: unauthorized" });
  });
});
