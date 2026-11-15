import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as SigV4 from "../src/index.ts";

// AWS SigV4 documentation examples (S3 "GET Object" / query-string auth).
const creds = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
};
const datetime = "20130524T000000Z";

describe("aws4signer", () => {
  test("signs a header-authenticated S3 GET (AWS docs example)", async () => {
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
    expect(signed.headers.authorization).toBe(
      "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=5c0d4ff29e72b8f94c5b6720369921e587e39bf7a64e456887dec4b43a2d1b77",
    );
  });

  test("presigns an S3 GET into the query string (AWS docs example)", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "GET",
        url: "https://examplebucket.s3.amazonaws.com/test.txt",
        service: "s3",
        region: "us-east-1",
        datetime,
        signQuery: true,
      }),
    );
    const url = new URL(signed.url);
    expect(url.searchParams.get("X-Amz-Expires")).toBe("86400");
    expect(url.searchParams.get("X-Amz-SignedHeaders")).toBe("host");
    expect(url.searchParams.get("X-Amz-Signature")).toBe(
      "aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404",
    );
  });

  test("presigns an R2 object URL with region auto", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "PUT",
        url: "https://0123456789abcdef.r2.cloudflarestorage.com/bucket/a/b.txt?X-Amz-Expires=900",
        service: "s3",
        region: "auto",
        datetime,
        signQuery: true,
      }),
    );
    const url = new URL(signed.url);
    expect(signed.method).toBe("PUT");
    expect(url.searchParams.get("X-Amz-Credential")).toBe(
      "AKIAIOSFODNN7EXAMPLE/20130524/auto/s3/aws4_request",
    );
    expect(url.searchParams.get("X-Amz-Expires")).toBe("900");
    expect(url.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
  });

  test("fails with InvalidSigningUrl on a relative URL", async () => {
    const error = await Effect.runPromise(
      Effect.flip(SigV4.sign({ ...creds, url: "/relative", service: "s3", region: "us-east-1" })),
    );
    expect(error._tag).toBe("AWS::SigV4::InvalidSigningUrl");
  });
});
