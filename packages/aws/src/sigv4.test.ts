import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Credentials from "./credentials.browser.ts";
import * as Presign from "./presign.ts";
import * as Region from "./region.ts";
import * as SigV4 from "./sigv4.ts";

// AWS SigV4 test-suite credentials (S3 "GET Object" / "PUT Object" examples).
const creds = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
};
const datetime = "20130524T000000Z";

describe("SigV4.sign", () => {
  test("signs S3 GET with UNSIGNED-PAYLOAD and excludes range (AWS docs example)", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "GET",
        url: "https://examplebucket.s3.amazonaws.com/test.txt",
        headers: { Range: "bytes=0-9" },
        service: "s3",
        region: "us-east-1",
        datetime,
      }),
    );
    expect(signed.headers["x-amz-content-sha256"]).toBe("UNSIGNED-PAYLOAD");
    expect(signed.headers["x-amz-date"]).toBe(datetime);
    expect(signed.headers.authorization).toBe(
      "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=5c0d4ff29e72b8f94c5b6720369921e587e39bf7a64e456887dec4b43a2d1b77",
    );
  });

  test("hashes the body for non-S3 services and signs the session token", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        sessionToken: Redacted.make("TOKEN=="),
        method: "POST",
        url: "https://dynamodb.us-west-2.amazonaws.com//x//y?b=2&a=1&a=0&=empty",
        headers: {
          "Content-Type": "application/x-amz-json-1.0",
          "X-Amz-Target": "DynamoDB_20120810.ListTables",
          "user-agent": "ua",
        },
        body: new Uint8Array([1, 2, 3]),
        service: "dynamodb",
        region: "us-west-2",
        datetime,
      }),
    );
    expect(signed.headers["x-amz-security-token"]).toBe("TOKEN==");
    expect(signed.headers["x-amz-content-sha256"]).toBeUndefined();
    expect(signed.headers.authorization).toBe(
      "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-west-2/dynamodb/aws4_request, SignedHeaders=host;x-amz-date;x-amz-security-token;x-amz-target, Signature=5ed05481b0774da674f77f2add0ae15d315f9f7b095ad026bb7d0e7bd9c6b35c",
    );
  });

  test("honours an explicit x-amz-content-sha256 and normalises header whitespace", async () => {
    const a = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "PUT",
        url: "https://s3-control.us-east-1.amazonaws.com/v20180820/accesspoint",
        headers: { "X-Amz-Content-Sha256": "abc", "X-Weird": "  a   b  " },
        body: "<x/>",
        service: "s3",
        region: "us-east-1",
        datetime,
      }),
    );
    const b = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "PUT",
        url: "https://s3-control.us-east-1.amazonaws.com/v20180820/accesspoint",
        headers: { "x-amz-content-sha256": "abc", "x-weird": "a b" },
        body: "<different/>",
        service: "s3",
        region: "us-east-1",
        datetime,
      }),
    );
    expect(a.headers.authorization).toBe(b.headers.authorization);
  });

  test("presigns into the query string with reserved characters encoded", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        sessionToken: Redacted.make("TOK"),
        method: "GET",
        url: "https://examplebucket.s3.amazonaws.com/a b/(x)!*'.txt?X-Amz-Expires=900&foo=bar&foo=baz",
        headers: { "content-type": "image/png" },
        allHeaders: true,
        service: "s3",
        region: "us-east-1",
        datetime,
        signQuery: true,
      }),
    );
    const url = new URL(signed.url);
    expect(url.pathname).toBe("/a%20b/(x)!*'.txt");
    expect(url.searchParams.get("X-Amz-Algorithm")).toBe("AWS4-HMAC-SHA256");
    expect(url.searchParams.get("X-Amz-Credential")).toBe(
      "AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request",
    );
    expect(url.searchParams.get("X-Amz-SignedHeaders")).toBe(
      "content-type;host",
    );
    expect(url.searchParams.get("X-Amz-Security-Token")).toBe("TOK");
    expect(url.searchParams.get("X-Amz-Expires")).toBe("900");
    expect(url.searchParams.get("X-Amz-Signature")).toBe(
      "8623d0f2477209accf78e1b704b10fecd0ffeb2398d9209e9ded51e313878a87",
    );
    expect(signed.headers.authorization).toBeUndefined();
  });

  test("signing stays correct after the derived-key cache evicts entries", async () => {
    const request = {
      ...creds,
      method: "GET",
      url: "https://examplebucket.s3.amazonaws.com/test.txt",
      headers: { Range: "bytes=0-9" },
      service: "s3",
      region: "us-east-1",
      datetime,
    } as const;
    const before = await Effect.runPromise(SigV4.sign(request));
    // Churn well past the cache bound with distinct secrets.
    for (let i = 0; i < 200; i++) {
      await Effect.runPromise(
        SigV4.sign({
          ...request,
          secretAccessKey: Redacted.make(`rotated-${i}`),
        }),
      );
    }
    const after = await Effect.runPromise(SigV4.sign(request));
    expect(after.headers.authorization).toBe(before.headers.authorization);
  });

  test("fails with InvalidSigningUrl for a relative URL", async () => {
    const error = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        url: "/not/absolute",
        service: "s3",
        region: "us-east-1",
      }).pipe(Effect.flip),
    );
    expect(error).toBeInstanceOf(SigV4.InvalidSigningUrl);
    expect(error._tag).toBe("AWS::SigV4::InvalidSigningUrl");
  });

  test("fails with InvalidSigningHeaders for an invalid header name", async () => {
    const error = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        url: "https://examplebucket.s3.amazonaws.com/",
        headers: { "bad header": "x" },
        service: "s3",
        region: "us-east-1",
      }).pipe(Effect.flip),
    );
    expect(error._tag).toBe("AWS::SigV4::InvalidSigningHeaders");
  });

  test("iotdevicegateway appends the session token after the signature", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        sessionToken: Redacted.make("TOK"),
        url: "https://data.iot.us-east-1.amazonaws.com/mqtt",
        service: "iotdevicegateway",
        region: "us-east-1",
        datetime,
        signQuery: true,
      }),
    );
    const keys = [...new URL(signed.url).searchParams.keys()];
    expect(keys.indexOf("X-Amz-Security-Token")).toBeGreaterThan(
      keys.indexOf("X-Amz-Signature"),
    );
  });
});

describe("Presign", () => {
  const layer = Layer.mergeAll(
    Layer.succeed(
      Credentials.Credentials,
      Effect.succeed({
        accessKeyId: Redacted.make(creds.accessKeyId),
        secretAccessKey: creds.secretAccessKey,
        sessionToken: undefined,
        region: "us-east-1" as Region.RegionName,
      }),
    ),
    Layer.succeed(
      Region.Region,
      Effect.succeed("us-east-1" as Region.RegionName),
    ),
  );

  test("presignS3Url pins content-type into the signed headers", async () => {
    const url = await Effect.runPromise(
      Presign.presignS3Url({
        method: "PUT",
        bucket: "examplebucket",
        key: "dir/a b.png",
        contentType: "image/png",
        expiresIn: 60,
        datetime,
      }).pipe(Effect.provide(layer)),
    );
    const parsed = new URL(url);
    expect(parsed.host).toBe("examplebucket.s3.us-east-1.amazonaws.com");
    expect(parsed.pathname).toBe("/dir/a%20b.png");
    expect(parsed.searchParams.get("X-Amz-SignedHeaders")).toBe(
      "content-type;host",
    );
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("60");
    expect(parsed.searchParams.get("X-Amz-Signature")).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });
});
