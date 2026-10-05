import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import { Credentials, CredentialsFromEnv } from "./credentials.ts";
import {
  BadRequest,
  EasChannelAlreadyExists,
  EasExperienceNotFound,
  EasParseError,
  EasUnauthorizedOperation,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
  UnknownEasError,
} from "./errors.ts";
import type { ExpoEasOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { accessTokenDeleteAccessToken, accessTokenSetAccessTokenRevoked } from "./services/eas.ts";

interface Reply {
  readonly status?: number;
  readonly body?: string;
  readonly headers?: Record<string, string>;
}

const credentialsLayer = (apiBaseUrl: string, token = "expo-token") =>
  Layer.succeed(Credentials, Effect.succeed({ accessToken: Redacted.make(token), apiBaseUrl }));

const prod = credentialsLayer("https://api.expo.dev");

/** A fake HttpClient that records each request (as a web Request) and answers with `reply`. */
const fakeHttp = (reply: Reply) => {
  const requests: Array<Request> = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(Result.getOrThrow(HttpClientRequest.toWebResult(request)));
        return HttpClientResponse.fromWeb(
          request,
          new Response(reply.body ?? "", {
            status: reply.status ?? 200,
            headers: reply.headers,
          }),
        );
      }),
    ),
  );
  return { requests, http };
};

const run = <A, E>(
  operation: Effect.Effect<A, E, ExpoEasOpContext>,
  reply: Reply,
  creds: Layer.Layer<Credentials> = prod,
) => {
  const { requests, http } = fakeHttp(reply);
  const promise = Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(Layer.mergeAll(http, creds))),
  );
  return { requests, promise };
};

const deleteToken = () => accessTokenDeleteAccessToken({ id: "tok-1" });

const succeed = (reply: Reply) => run(deleteToken(), reply).promise;
const failWith = (reply: Reply, operation = deleteToken()) =>
  run(Effect.flip(operation), reply).promise;

const data = (id: unknown) =>
  JSON.stringify({ data: { accessToken: { deleteAccessToken: { id } } } });

const graphqlErrors = (
  errors: ReadonlyArray<{ message: string; extensions?: Record<string, string> }>,
  extra: Record<string, unknown> = {},
) => JSON.stringify({ data: null, errors, ...extra });

describe("request envelope", () => {
  test("POSTs { query, operationName, variables } to <base>/graphql with a Bearer token", async () => {
    const { requests, promise } = run(deleteToken(), { body: data("tok-1") });
    await promise;
    expect(requests).toHaveLength(1);
    const request = requests[0]!;
    expect(request.method).toBe("POST");
    expect(request.url).toBe("https://api.expo.dev/graphql");
    expect(request.headers.get("authorization")).toBe("Bearer expo-token");
    expect(request.headers.get("accept")).toBe("application/json");
    expect(request.headers.get("content-type")).toContain("application/json");
    const body = await request.json();
    expect(body).toEqual({
      query: expect.stringContaining("mutation accessTokenDeleteAccessToken($id: ID!)"),
      operationName: "accessTokenDeleteAccessToken",
      variables: { id: "tok-1" },
    });
  });

  test("input members are variables verbatim: undefined dropped, null kept", async () => {
    const omitted = run(accessTokenSetAccessTokenRevoked({ id: "tok-1", revoked: undefined }), {
      body: JSON.stringify({ data: { accessToken: { setAccessTokenRevoked: null } } }),
    });
    await omitted.promise;
    expect((await omitted.requests[0]!.json()).variables).toEqual({ id: "tok-1" });

    const nulled = run(accessTokenSetAccessTokenRevoked({ id: "tok-1", revoked: null }), {
      body: JSON.stringify({ data: { accessToken: { setAccessTokenRevoked: null } } }),
    });
    await nulled.promise;
    expect((await nulled.requests[0]!.json()).variables).toEqual({ id: "tok-1", revoked: null });
  });

  test("the staging base URL is honoured", async () => {
    const { requests, promise } = run(
      deleteToken(),
      { body: data("tok-1") },
      credentialsLayer("https://staging-api.expo.dev", "staging-token"),
    );
    await promise;
    expect(requests[0]!.url).toBe("https://staging-api.expo.dev/graphql");
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer staging-token");
  });

  const fromEnv = (env: Record<string, string>) =>
    Layer.mergeAll(
      CredentialsFromEnv,
      Layer.succeed(ConfigProvider.ConfigProvider, ConfigProvider.fromUnknown(env)),
    );

  test("CredentialsFromEnv targets production by default and staging via EXPO_API_URL", async () => {
    const production = run(
      deleteToken(),
      { body: data("tok-1") },
      fromEnv({ EXPO_TOKEN: "env-token" }),
    );
    await production.promise;
    expect(production.requests[0]!.url).toBe("https://api.expo.dev/graphql");
    expect(production.requests[0]!.headers.get("authorization")).toBe("Bearer env-token");

    const staging = run(
      deleteToken(),
      { body: data("tok-1") },
      fromEnv({ EXPO_TOKEN: "env-token", EXPO_API_URL: "https://staging-api.expo.dev" }),
    );
    await staging.promise;
    expect(staging.requests[0]!.url).toBe("https://staging-api.expo.dev/graphql");
  });
});

describe("data envelope", () => {
  test("returns the value at data.<responsePath>", async () => {
    expect(await succeed({ body: data("tok-1") })).toEqual({ id: "tok-1" });
  });

  test("a missing or null path segment yields null", async () => {
    expect(await succeed({ body: JSON.stringify({ data: { accessToken: null } }) })).toBeNull();
    expect(await succeed({ body: JSON.stringify({ data: null }) })).toBeNull();
  });

  test("an empty errors array is not a failure", async () => {
    const body = JSON.stringify({
      data: { accessToken: { deleteAccessToken: { id: "tok-1" } } },
      errors: [],
    });
    expect(await succeed({ body })).toEqual({ id: "tok-1" });
  });
});

describe("GraphQL errors", () => {
  test("errors[] inside HTTP 200 map extensions.errorCode to the typed class", async () => {
    const error = await failWith({
      body: graphqlErrors([
        { message: "Channel already exists", extensions: { errorCode: "CHANNEL_ALREADY_EXISTS" } },
      ]),
    });
    expect(error).toBeInstanceOf(EasChannelAlreadyExists);
    expect(error).toMatchObject({ message: "Channel already exists" });
  });

  test("extensions.code is the fallback code field", async () => {
    const error = await failWith({
      body: graphqlErrors([{ message: "Not allowed", extensions: { code: "UNAUTHORIZED_ERROR" } }]),
    });
    expect(error).toBeInstanceOf(EasUnauthorizedOperation);
  });

  test("only the first error is used", async () => {
    const error = await failWith({
      body: graphqlErrors([
        { message: "missing", extensions: { errorCode: "EXPERIENCE_NOT_FOUND" } },
        { message: "taken", extensions: { errorCode: "CHANNEL_ALREADY_EXISTS" } },
      ]),
    });
    expect(error).toBeInstanceOf(EasExperienceNotFound);
    expect(error).toMatchObject({ message: "missing" });
  });

  test("errors win over partial data", async () => {
    const error = await failWith({
      body: JSON.stringify({
        data: { accessToken: { deleteAccessToken: { id: "tok-1" } } },
        errors: [{ message: "partial", extensions: { errorCode: "CHANNEL_ALREADY_EXISTS" } }],
      }),
    });
    expect(error).toBeInstanceOf(EasChannelAlreadyExists);
  });

  test("an unknown code inside HTTP 200 is UnknownEasError carrying code, message and body", async () => {
    const body = graphqlErrors([
      { message: "Something new", extensions: { errorCode: "BRAND_NEW_CODE" } },
    ]);
    const error = await failWith({ body });
    expect(error).toBeInstanceOf(UnknownEasError);
    expect(error).toMatchObject({
      code: "BRAND_NEW_CODE",
      message: "Something new",
      body: JSON.parse(body),
    });
  });

  test("an error without extensions inside HTTP 200 is UnknownEasError without a code", async () => {
    const error = await failWith({
      body: graphqlErrors([{ message: 'Cannot query field "nope" on type "Query".' }]),
    });
    expect(error).toBeInstanceOf(UnknownEasError);
    expect(error).toMatchObject({ message: 'Cannot query field "nope" on type "Query".' });
    expect((error as UnknownEasError).code).toBeUndefined();
  });

  test("an unknown code under an error status uses the HTTP status class", async () => {
    const error = await failWith({
      status: 400,
      body: graphqlErrors([
        { message: "Variable $id is required", extensions: { code: "GRAPHQL_VALIDATION_FAILED" } },
      ]),
    });
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: "Variable $id is required" });
  });

  test("a typed code still wins under an error status", async () => {
    const error = await failWith({
      status: 403,
      body: graphqlErrors([
        { message: "Not allowed", extensions: { errorCode: "UNAUTHORIZED_ERROR" } },
      ]),
    });
    expect(error).toBeInstanceOf(EasUnauthorizedOperation);
  });
});

describe("HTTP-level failures", () => {
  test("a REST-ish { message } body uses the status class", async () => {
    const error = await failWith({
      status: 401,
      body: JSON.stringify({ message: "Invalid access token" }),
    });
    expect(error).toBeInstanceOf(Unauthorized);
    expect(error).toMatchObject({ message: "Invalid access token" });
  });

  test("429 carries the Retry-After hint", async () => {
    const error = await failWith({
      status: 429,
      body: JSON.stringify({ message: "Too many requests" }),
      headers: { "retry-after": "5" },
    });
    expect(error).toBeInstanceOf(TooManyRequests);
    expect(Duration.toSeconds((error as TooManyRequests).retryAfter!)).toBe(5);
  });

  test("an empty JSON object under 500 is InternalServerError", async () => {
    const error = await failWith({ status: 500, body: "{}" });
    expect(error).toBeInstanceOf(InternalServerError);
  });

  test("a REST-ish body under an unmapped status is UnknownEasError", async () => {
    const error = await failWith({
      status: 418,
      body: JSON.stringify({ message: "teapot", code: "TEAPOT" }),
    });
    expect(error).toBeInstanceOf(UnknownEasError);
    expect(error).toMatchObject({ code: "TEAPOT", message: "teapot" });
  });
});

describe("response validation", () => {
  const strict = deleteToken().pipe(Effect.provide(ResponseValidation.strict));

  test("lenient mode returns a mismatched payload as read", async () => {
    expect((await succeed({ body: data(42) })) as unknown).toEqual({ id: 42 });
  });

  test("strict mode fails a mismatched payload with EasParseError", async () => {
    expect(await failWith({ body: data(42) }, strict)).toBeInstanceOf(EasParseError);
  });

  test("strict mode passes a matching payload", async () => {
    expect(await run(strict, { body: data("tok-1") }).promise).toEqual({ id: "tok-1" });
  });

  test("a non-JSON 2xx body: lenient returns the text, strict fails", async () => {
    expect((await succeed({ body: "not json" })) as unknown).toBe("not json");
    expect(await failWith({ body: "not json" }, strict)).toBeInstanceOf(EasParseError);
  });
});
