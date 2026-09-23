import { expect, test } from "bun:test";
import * as API from "@distilled.cloud/core/api";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { SyncFailure } from "./errors.ts";
import { CloudflareProtocol } from "./protocol.ts";

const failure = {
  success: false,
  result: {
    status: "error",
    error: "Authorization failed | Unauthorized",
    error_details: {
      status_code: 401,
      retryable: true,
      is_upstream: true,
      cause: "Authorization required",
    },
  },
};

const decode = (body: unknown, status = 200, optedIn = true) =>
  Effect.gen(function* () {
    const protocol = yield* API.Protocol;
    return yield* protocol
      .decode({
        response: HttpClientResponse.fromWeb(
          HttpClientRequest.get("https://example.com/sync"),
          new Response(JSON.stringify(body), { status }),
        ),
        outputAst: Schema.Struct({ status: Schema.String }).ast,
        errors: optedIn ? [SyncFailure] : [],
        config: {},
      })
      .pipe(Effect.catchCause((cause) => Effect.succeed(Cause.squash(cause))));
  }).pipe(Effect.provide(CloudflareProtocol), Effect.runPromise);

test("structured upstream failure preserves its message and details", async () => {
  const result = await decode(failure);
  expect(result).toBeInstanceOf(SyncFailure);
  expect(result).toMatchObject({
    _tag: "SyncFailure",
    message: failure.result.error,
    errorDetails: {
      statusCode: 401,
      retryable: true,
      isUpstream: true,
      cause: "Authorization required",
    },
  });
});

test("HTTP 200 success still succeeds", async () => {
  expect(await decode({ success: true, result: { status: "ready" } })).toEqual({
    status: "ready",
  });
});

test("HTTP failures keep ordinary API error routing", async () => {
  expect(await decode(failure, 403)).toMatchObject({ _tag: "Forbidden" });
});

test("ordinary envelope errors take priority", async () => {
  expect(
    await decode({
      ...failure,
      errors: [{ code: 10000, message: "Authentication error" }],
    }),
  ).not.toBeInstanceOf(SyncFailure);
});

test("other operations do not opt in implicitly", async () => {
  expect(await decode(failure, 200, false)).not.toBeInstanceOf(SyncFailure);
});

test("missing structured failure is not inferred from HTTP 200", async () => {
  expect(await decode({ success: false, result: {} })).not.toBeInstanceOf(
    SyncFailure,
  );
});
