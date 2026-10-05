import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import { type Credentials, DEFAULT_API_BASE_URL, layer } from "./credentials.ts";
import {
  Forbidden,
  InternalServerError,
  NotFound,
  UnknownZeroSslError,
  ZeroSslParseError,
} from "./errors.ts";
import type { ZeroSslOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { generateEabCredentials, InvalidAccessKey, RateLimitExceeded } from "./services/zerossl.ts";

interface Reply {
  readonly status?: number;
  readonly body?: string;
  readonly headers?: Record<string, string>;
}

const defaultCreds = layer({
  accessKey: Redacted.make("zs-key"),
  apiBaseUrl: DEFAULT_API_BASE_URL,
});

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
  operation: Effect.Effect<A, E, ZeroSslOpContext>,
  reply: Reply,
  creds: Layer.Layer<Credentials> = defaultCreds,
) => {
  const { requests, http } = fakeHttp(reply);
  const promise = Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(Layer.mergeAll(http, creds))),
  );
  return { requests, promise };
};

const mint = () => generateEabCredentials({});

const succeed = (reply: Reply) => run(mint(), reply).promise;
const failWith = (reply: Reply, operation = mint()) => run(Effect.flip(operation), reply).promise;

const failure = (
  error: { code?: number; type?: string; info?: string },
  success: unknown = false,
) => JSON.stringify({ success, error });

const eab = { success: true, eab_kid: "kid-1", eab_hmac_key: "hmac-secret" };

describe("request encoding", () => {
  test("sends the access key as `Authorization: ApiKey` to the default host", async () => {
    const { requests, promise } = run(mint(), { body: JSON.stringify(eab) });
    await promise;
    expect(requests).toHaveLength(1);
    const request = requests[0]!;
    expect(request.method).toBe("POST");
    expect(request.url).toBe("https://api.zerossl.com/acme/eab-credentials");
    expect(request.headers.get("authorization")).toBe("ApiKey zs-key");
    expect(request.headers.get("accept")).toBe("application/json");
  });

  test("resolves credentials per request from an effect", async () => {
    const { requests, promise } = run(
      mint(),
      { body: JSON.stringify(eab) },
      layer(Effect.succeed({ accessKey: Redacted.make("rotated"), apiBaseUrl: "https://zs.test" })),
    );
    await promise;
    expect(requests[0]!.url).toBe("https://zs.test/acme/eab-credentials");
    expect(requests[0]!.headers.get("authorization")).toBe("ApiKey rotated");
  });
});

describe("success responses", () => {
  test("a JSON body maps onto the output; sensitive members are Redacted", async () => {
    const result = await succeed({ body: JSON.stringify(eab) });
    expect(result.success).toBe(true);
    expect(result.eab_kid).toBe("kid-1");
    expect(Redacted.isRedacted(result.eab_hmac_key)).toBe(true);
    expect(Redacted.value(result.eab_hmac_key)).toBe("hmac-secret");
  });

  test("the documented numeric success flag 1 decodes as true", async () => {
    const result = await succeed({ body: JSON.stringify({ ...eab, success: 1 }) });
    expect(result.success).toBe(true);
    // Strict mode accepts it too: the flag is normalized before validation.
    const strict = await run(mint().pipe(Effect.provide(ResponseValidation.strict)), {
      body: JSON.stringify({ ...eab, success: 1 }),
    }).promise;
    expect(strict.success).toBe(true);
  });
});

describe("error envelopes in a 2xx", () => {
  test("success:false is matched to a typed error on `error.type`", async () => {
    const error = await failWith({
      body: failure({
        code: 101,
        type: "invalid_access_key",
        info: "You have not supplied a valid API Access Key.",
      }),
    });
    expect(error).toBeInstanceOf(InvalidAccessKey);
    // The matcher keys on `type`, which becomes the message.
    expect(error).toMatchObject({ code: 101, message: "invalid_access_key" });
  });

  test("a typed error also matches on `error.code` alone", async () => {
    const error = await failWith({ body: failure({ code: 101, type: "renamed_type" }) });
    expect(error).toBeInstanceOf(InvalidAccessKey);
    expect(error).toMatchObject({ code: 101 });
  });

  test("success:0 is a failure too", async () => {
    const error = await failWith({ body: failure({ code: 101, type: "invalid_access_key" }, 0) });
    expect(error).toBeInstanceOf(InvalidAccessKey);
  });

  test("a throttling typed error picks up Retry-After", async () => {
    const error = await failWith({
      body: failure({ code: 429, type: "rate_limit_reached" }),
      headers: { "retry-after": "9" },
    });
    expect(error).toBeInstanceOf(RateLimitExceeded);
    expect(Duration.toSeconds((error as RateLimitExceeded).retryAfter!)).toBe(9);
  });

  test("an unknown type falls back to UnknownZeroSslError with a redacted body", async () => {
    const body = failure({
      code: 2800,
      type: "certificate_not_found",
      info: "Certificate not found.",
    });
    const error = await failWith({ body });
    expect(error).toBeInstanceOf(UnknownZeroSslError);
    expect(error).toMatchObject({
      code: 2800,
      type: "certificate_not_found",
      message: "Certificate not found.",
    });
    const redacted = (error as UnknownZeroSslError).body;
    expect(Redacted.isRedacted(redacted)).toBe(true);
    expect(Redacted.value(redacted as Redacted.Redacted<unknown>)).toEqual(JSON.parse(body));
  });

  test("without `info` the type is the message", async () => {
    const error = await failWith({ body: failure({ code: 2800, type: "certificate_not_found" }) });
    expect(error).toMatchObject({
      type: "certificate_not_found",
      message: "certificate_not_found",
    });
  });
});

describe("HTTP status failures", () => {
  test("a typed error still wins under an error status", async () => {
    const error = await failWith({
      status: 401,
      body: failure({ code: 101, type: "invalid_access_key" }),
    });
    expect(error).toBeInstanceOf(InvalidAccessKey);
  });

  test("an unmatched envelope under a mapped status uses the status class and `info`", async () => {
    const error = await failWith({
      status: 403,
      body: failure({ code: 9999, type: "permission_denied", info: "Not allowed." }),
    });
    expect(error).toBeInstanceOf(Forbidden);
    expect(error).toMatchObject({ message: "Not allowed." });
  });

  test("a non-JSON error body falls back to the status class", async () => {
    const error = await failWith({ status: 404, body: "<html>nope</html>" });
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "HTTP 404" });
  });

  test("an unmapped 5xx is InternalServerError", async () => {
    const error = await failWith({ status: 520, body: "" });
    expect(error).toBeInstanceOf(InternalServerError);
  });

  test("an unmapped 4xx is UnknownZeroSslError", async () => {
    const error = await failWith({ status: 418, body: "teapot" });
    expect(error).toBeInstanceOf(UnknownZeroSslError);
    expect(error).toMatchObject({ message: "HTTP 418" });
  });
});

describe("response validation", () => {
  const strict = mint().pipe(Effect.provide(ResponseValidation.strict));
  const mismatched = JSON.stringify({ ...eab, eab_kid: 7 });

  test("lenient mode returns a mismatched payload as read", async () => {
    const result = await succeed({ body: mismatched });
    expect(result.eab_kid as unknown).toBe(7);
  });

  test("strict mode fails a mismatched payload with ZeroSslParseError", async () => {
    const error = await failWith({ body: mismatched }, strict);
    expect(error).toBeInstanceOf(ZeroSslParseError);
  });

  test("a non-JSON 2xx body: lenient returns the text, strict fails", async () => {
    expect((await succeed({ body: "not json" })) as unknown).toBe("not json");
    expect(await failWith({ body: "not json" }, strict)).toBeInstanceOf(ZeroSslParseError);
  });

  test("a non-object JSON 2xx body: lenient returns it, strict fails", async () => {
    expect((await succeed({ body: "[1,2]" })) as unknown).toEqual([1, 2]);
    expect(await failWith({ body: "[1,2]" }, strict)).toBeInstanceOf(ZeroSslParseError);
  });
});
