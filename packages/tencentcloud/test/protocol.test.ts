import { isThrottling, isTransientError } from "@distilled.cloud/core/category";
import { BadGateway, ServiceUnavailable } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import {
  AuthFailure,
  RequestLimitExceeded,
  ResourceNotFound,
  TencentCloudParseError,
  UnknownTencentCloudError,
} from "../src/errors.ts";
import { CONTENT_TYPE } from "../src/protocol.ts";
import * as Region from "../src/region.ts";
import * as Retry from "../src/retry.ts";
import { describeInstances } from "../src/services/cvm.ts";
import { describeDomainList } from "../src/services/dnspod.ts";
import { sign } from "../src/signer.ts";

const SECRET_KEY = "sentinel-secret-key-7f3a";

interface Captured {
  request?: HttpClientRequest.HttpClientRequest;
  body?: string;
}

const respondWith = (
  status: number,
  body: string,
  captured: Captured = {},
  creds: { readonly region?: string; readonly sessionToken?: string } = {},
) =>
  Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          captured.request = request;
          captured.body = new TextDecoder().decode((request.body as { body: Uint8Array }).body);
          return HttpClientResponse.fromWeb(request, new Response(body, { status }));
        }),
      ),
    ),
    credentials({
      secretId: "AKIDtest",
      secretKey: Redacted.make(SECRET_KEY),
      region: creds.region,
      sessionToken: creds.sessionToken ? Redacted.make(creds.sessionToken) : undefined,
    }),
  );

const ok = (payload: Record<string, unknown>) =>
  JSON.stringify({ Response: { ...payload, RequestId: "req-1" } });

const failure = (code: string, message = "boom") =>
  JSON.stringify({ Response: { Error: { Code: code, Message: message }, RequestId: "req-2" } });

describe("request", () => {
  test("POSTs the input as JSON to the product host, signed", async () => {
    const captured: Captured = {};
    const result = await Effect.runPromise(
      describeInstances({ region: "ap-guangzhou", Limit: 1, InstanceIds: ["ins-1"] }).pipe(
        Effect.provide(respondWith(200, ok({ TotalCount: 0, InstanceSet: [] }), captured)),
      ),
    );
    expect(result).toEqual({ TotalCount: 0, InstanceSet: [], RequestId: "req-1" });

    const request = captured.request!;
    expect(request.method).toBe("POST");
    expect(request.url).toBe("https://cvm.tencentcloudapi.com/");
    expect(captured.body).toBe('{"Limit":1,"InstanceIds":["ins-1"]}');
    const headers = request.headers;
    expect(headers["content-type"]).toBe(CONTENT_TYPE);
    expect(headers["x-tc-action"]).toBe("DescribeInstances");
    expect(headers["x-tc-version"]).toBe("2017-03-12");
    expect(headers["x-tc-region"]).toBe("ap-guangzhou");
    expect(headers["x-tc-token"]).toBeUndefined();

    const timestamp = Number(headers["x-tc-timestamp"]);
    expect(Math.abs(timestamp - Date.now() / 1000)).toBeLessThan(60);
    const expected = await Effect.runPromise(
      sign({
        secretId: "AKIDtest",
        secretKey: Redacted.make(SECRET_KEY),
        service: "cvm",
        host: "cvm.tencentcloudapi.com",
        action: "DescribeInstances",
        timestamp,
        contentType: CONTENT_TYPE,
        payload: captured.body!,
      }),
    );
    expect(headers.authorization).toBe(expected.authorization);
    expect(headers.authorization).not.toContain(SECRET_KEY);
  });

  test("sends the session token of temporary credentials", async () => {
    const captured: Captured = {};
    await Effect.runPromise(
      describeDomainList({}).pipe(
        Effect.provide(respondWith(200, ok({}), captured, { sessionToken: "sts-token" })),
      ),
    );
    expect(captured.request!.headers["x-tc-token"]).toBe("sts-token");
    expect(captured.request!.url).toBe("https://dnspod.tencentcloudapi.com/");
  });

  describe("region", () => {
    const regionOf = async (
      call: Parameters<typeof describeInstances>[0],
      options: { layer?: string; credentials?: string } = {},
    ) => {
      const captured: Captured = {};
      const program = describeInstances(call).pipe(
        Effect.provide(respondWith(200, ok({}), captured, { region: options.credentials })),
      );
      await Effect.runPromise(
        options.layer === undefined
          ? program
          : program.pipe(Effect.provide(Region.of(options.layer))),
      );
      return captured.request!.headers["x-tc-region"];
    };

    test("the call's region wins over the layer and the credentials", async () => {
      expect(
        await regionOf(
          { region: "ap-beijing" },
          { layer: "ap-shanghai", credentials: "ap-guangzhou" },
        ),
      ).toBe("ap-beijing");
    });

    test("the layer wins over the credentials", async () => {
      expect(await regionOf({}, { layer: "ap-shanghai", credentials: "ap-guangzhou" })).toBe(
        "ap-shanghai",
      );
    });

    test("the credentials' region is the fallback", async () => {
      expect(await regionOf({}, { credentials: "ap-guangzhou" })).toBe("ap-guangzhou");
    });

    test("no region sends no header", async () => {
      expect(await regionOf({})).toBeUndefined();
    });
  });
});

describe("response", () => {
  const errorOf = (status: number, body: string) =>
    Effect.runPromise(
      describeInstances({}).pipe(
        Retry.none,
        Effect.provide(respondWith(status, body)),
        Effect.flip,
      ),
    );

  test("maps a common code by its first segment, keeping the full code", async () => {
    const error = await errorOf(200, failure("ResourceNotFound.InstanceNotExist", "gone"));
    expect(error).toBeInstanceOf(ResourceNotFound);
    expect(error).toMatchObject({
      code: "ResourceNotFound.InstanceNotExist",
      message: "gone",
      requestId: "req-2",
    });
  });

  test("maps auth failures", async () => {
    const error = await errorOf(200, failure("AuthFailure.SignatureFailure"));
    expect(error).toBeInstanceOf(AuthFailure);
  });

  test("maps throttling to a retryable error", async () => {
    const error = await errorOf(200, failure("RequestLimitExceeded"));
    expect(error).toBeInstanceOf(RequestLimitExceeded);
    expect(isThrottling(error)).toBe(true);
  });

  test("does not retry a client error", async () => {
    const error = await errorOf(200, failure("InvalidParameterValue.Range"));
    expect(isTransientError(error)).toBe(false);
  });

  test("maps ServiceUnavailable to core's class", async () => {
    const error = await errorOf(200, failure("ServiceUnavailable"));
    expect(error).toBeInstanceOf(ServiceUnavailable);
  });

  test("keeps a product's own code on UnknownTencentCloudError", async () => {
    const error = await errorOf(200, failure("InvalidInstanceId.NotFound"));
    expect(error).toBeInstanceOf(UnknownTencentCloudError);
    expect(error).toMatchObject({ code: "InvalidInstanceId.NotFound", requestId: "req-2" });
  });

  test("maps a failure without the envelope by HTTP status", async () => {
    const error = await errorOf(502, "<html>bad gateway</html>");
    expect(error).toBeInstanceOf(BadGateway);
  });

  test("fails a 2xx body without the envelope with the parse error", async () => {
    const error = await errorOf(200, JSON.stringify({ TotalCount: 1 }));
    expect(error).toBeInstanceOf(TencentCloudParseError);
  });
});
