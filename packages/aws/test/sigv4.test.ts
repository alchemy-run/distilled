import { createHash, createHmac } from "node:crypto";
import * as Signer from "@distilled.cloud/aws4signer";
import * as CoreCrypto from "@distilled.cloud/core/crypto";
import { InvalidInput } from "@distilled.cloud/core/errors";
import * as Cache from "effect/Cache";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as Credentials from "../src/credentials.browser.ts";
import * as Endpoint from "../src/endpoint.ts";
import * as Presign from "../src/presign.ts";
import * as Region from "../src/region.ts";
import * as SigV4 from "../src/sigv4.ts";
import * as Reference from "./fixtures/sigv4-reference.ts";

// AWS SigV4 test-suite credentials (S3 "GET Object" / "PUT Object" examples).
const creds = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
};
const datetime = "20130524T000000Z";

test("SigV4 re-exports every runtime export of @distilled.cloud/aws4signer", () => {
  expect(Object.keys(SigV4).sort()).toEqual(Object.keys(Signer).sort());
});

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
    expect(url.searchParams.get("X-Amz-SignedHeaders")).toBe("content-type;host");
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

  test("a failed key derivation is not retained by the built-in key store", async () => {
    let attempts = 0;
    const flaky: CoreCrypto.CryptoImpl = {
      ...CoreCrypto.makeWebCrypto(),
      importHmacKey: (key) =>
        attempts++ === 0
          ? Effect.fail(new CoreCrypto.CryptoError({ operation: "importKey", cause: "boom" }))
          : CoreCrypto.makeWebCrypto().importHmacKey(key),
    };
    const request = {
      ...creds,
      secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
      method: "GET",
      url: "https://examplebucket.s3.amazonaws.com/test.txt",
      headers: { Range: "bytes=0-9" },
      service: "s3",
      region: "us-east-1",
      datetime,
    } as const;
    const withCrypto = Effect.provide(CoreCrypto.layer(flaky));

    const first = await Effect.runPromise(SigV4.sign(request).pipe(Effect.flip, withCrypto));
    expect(first).toBeInstanceOf(SigV4.CryptoError);

    const second = await Effect.runPromise(SigV4.sign(request).pipe(withCrypto));
    expect(second.headers.authorization).toBe(
      "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=5c0d4ff29e72b8f94c5b6720369921e587e39bf7a64e456887dec4b43a2d1b77",
    );
    // Five imports: four derivation steps and the final key.
    expect(attempts).toBe(1 + 5);
  });

  test("signs with keys from a SigningKeyCache store, which may refuse", async () => {
    let attempts = 0;
    const hmac = (key: string | Buffer, data: string) =>
      createHmac("sha256", key).update(data).digest();
    const flakyCache = Effect.runSync(
      Cache.makeWith(
        (scope: SigV4.SigningKeyScope) =>
          Effect.suspend(() => {
            if (attempts++ === 0) {
              return Effect.fail(new SigV4.CryptoError({ operation: "hmac", cause: "boom" }));
            }
            const raw = hmac(
              hmac(
                hmac(
                  hmac("AWS4" + Redacted.value(scope.secretAccessKey), scope.date),
                  scope.region,
                ),
                scope.service,
              ),
              "aws4_request",
            );
            const impl = CoreCrypto.makeWebCrypto();
            return Effect.map(
              Effect.orDie(impl.importHmacKey(new Uint8Array(raw))),
              (key): SigV4.SigningKey => ({ impl, key }),
            );
          }),
        {
          capacity: 4,
          timeToLive: (exit) => (Exit.isSuccess(exit) ? Duration.infinity : Duration.zero),
        },
      ),
    );
    const request = {
      ...creds,
      method: "GET",
      url: "https://examplebucket.s3.amazonaws.com/test.txt",
      headers: { Range: "bytes=0-9" },
      service: "s3",
      region: "us-east-1",
      datetime,
    } as const;
    const withCache = Effect.provideService(SigV4.SigningKeyCache, {
      get: (scope) => Cache.get(flakyCache, scope),
    });

    const first = await Effect.runPromise(SigV4.sign(request).pipe(Effect.flip, withCache));
    expect(first).toBeInstanceOf(SigV4.CryptoError);

    const second = await Effect.runPromise(SigV4.sign(request).pipe(withCache));
    expect(second.headers.authorization).toBe(
      "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=5c0d4ff29e72b8f94c5b6720369921e587e39bf7a64e456887dec4b43a2d1b77",
    );
    expect(attempts).toBe(2);
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
    expect(keys.indexOf("X-Amz-Security-Token")).toBeGreaterThan(keys.indexOf("X-Amz-Signature"));
  });

  // Reference signature over an explicit canonical request (header-signed GET, no body).
  const referenceSignature = (
    canonicalUri: string,
    host: string,
    service: string,
    payloadHash: string,
  ) => {
    const sha = (s: string) => createHash("sha256").update(s).digest("hex");
    const mac = (key: string | Buffer, s: string) => createHmac("sha256", key).update(s).digest();
    const amzHeaders = service === "s3" ? ["x-amz-content-sha256", "x-amz-date"] : ["x-amz-date"];
    const values: Record<string, string> = {
      host,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": datetime,
    };
    const signed = ["host", ...amzHeaders];
    const canonicalRequest = [
      "GET",
      canonicalUri,
      "",
      signed.map((h) => `${h}:${values[h]}`).join("\n") + "\n",
      signed.join(";"),
      payloadHash,
    ].join("\n");
    const scope = `20130524/us-east-1/${service}/aws4_request`;
    const key = mac(
      mac(
        mac(mac(`AWS4${Redacted.value(creds.secretAccessKey)}`, "20130524"), "us-east-1"),
        service,
      ),
      "aws4_request",
    );
    return createHmac("sha256", key)
      .update(["AWS4-HMAC-SHA256", datetime, scope, sha(canonicalRequest)].join("\n"))
      .digest("hex");
  };

  for (const path of [
    "/photos/2024/a%20b.txt",
    "//leading-slash",
    "/a%2Bb~c/%C3%A9%21%28x%29",
    "/dir/100%25/",
  ]) {
    test(`S3 canonical URI keeps "/" and is not double-encoded: ${path}`, async () => {
      const signed = await Effect.runPromise(
        SigV4.sign({
          ...creds,
          method: "GET",
          url: `https://examplebucket.s3.amazonaws.com${path}`,
          service: "s3",
          region: "us-east-1",
          datetime,
        }),
      );
      expect(new URL(signed.url).pathname).toBe(path);
      expect(signed.headers.authorization).toContain(
        `Signature=${referenceSignature(path, "examplebucket.s3.amazonaws.com", "s3", "UNSIGNED-PAYLOAD")}`,
      );
    });
  }

  test("non-S3 canonical URI double-encodes segments but keeps /", async () => {
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "GET",
        url: "https://api.example.com/objects/a%20b/c%2Bd",
        service: "execute-api",
        region: "us-east-1",
        datetime,
      }),
    );
    const emptyHash = createHash("sha256").update("").digest("hex");
    expect(signed.headers.authorization).toContain(
      `Signature=${referenceSignature("/objects/a%2520b/c%252Bd", "api.example.com", "execute-api", emptyHash)}`,
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
    Layer.succeed(Region.Region, Effect.succeed("us-east-1" as Region.RegionName)),
  );

  test("presignS3Url signs and escapes an explicit version and special object key", async () => {
    const options = {
      bucket: "examplebucket",
      key: "dir/a b+%?#/雪.txt",
      versionId: "version+/= %?#&雪",
      responseContentType: "text/plain; charset=utf-8",
      datetime,
    };
    const signed = await Effect.runPromise(
      Presign.presignS3Url(options).pipe(Effect.provide(layer)),
    );
    const parsed = new URL(signed);
    expect(parsed.pathname).toBe("/dir/a%20b%2B%25%3F%23/%E9%9B%AA.txt");
    expect(parsed.hash).toBe("");
    expect(parsed.searchParams.getAll("versionId")).toEqual([options.versionId]);
    expect(parsed.searchParams.get("response-content-type")).toBe(options.responseContentType);
    expect(parsed.search).toContain("versionId=version%2B%2F%3D+%25%3F%23%26%E9%9B%AA");

    const expected = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "GET",
        url: "https://examplebucket.s3.us-east-1.amazonaws.com/dir/a%20b%2B%25%3F%23/%E9%9B%AA.txt?versionId=version%2B%2F%3D%20%25%3F%23%26%E9%9B%AA&response-content-type=text%2Fplain%3B%20charset%3Dutf-8&X-Amz-Expires=900",
        service: "s3",
        region: "us-east-1",
        signQuery: true,
        datetime,
      }),
    );
    const signature = parsed.searchParams.get("X-Amz-Signature");
    expect(signature).toMatch(/^[0-9a-f]{64}$/);
    expect(signature).toBe(new URL(expected.url).searchParams.get("X-Amz-Signature"));
    for (const versionId of ["another-version", undefined]) {
      const changed = await Effect.runPromise(
        Presign.presignS3Url({ ...options, versionId }).pipe(Effect.provide(layer)),
      );
      expect(new URL(changed).searchParams.get("X-Amz-Signature")).not.toBe(signature);
    }
  });

  test("presignS3Url encodes keys like the S3 greedy {Key+} label", async () => {
    const signed = await Effect.runPromise(
      Presign.presignS3Url({ bucket: "examplebucket", key: "/a/(x)!~.txt", datetime }).pipe(
        Effect.provide(layer),
      ),
    );
    const parsed = new URL(signed);
    expect(parsed.pathname).toBe("//a/%28x%29%21~.txt");
    const expected = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "GET",
        url: "https://examplebucket.s3.us-east-1.amazonaws.com//a/%28x%29%21~.txt?X-Amz-Expires=900",
        service: "s3",
        region: "us-east-1",
        signQuery: true,
        datetime,
      }),
    );
    expect(parsed.searchParams.get("X-Amz-Signature")).toBe(
      new URL(expected.url).searchParams.get("X-Amz-Signature"),
    );
  });

  test("presignS3Url signs versions under a custom path-style endpoint", async () => {
    const signed = await Effect.runPromise(
      Presign.presignS3Url({
        bucket: "examplebucket",
        key: "dir/a b+%.txt",
        versionId: "version+/=",
        datetime,
      }).pipe(Effect.provide(layer), Effect.provide(Endpoint.of("http://localhost:4566/s3/"))),
    );
    const parsed = new URL(signed);
    expect(parsed.origin).toBe("http://localhost:4566");
    expect(parsed.pathname).toBe("/s3/examplebucket/dir/a%20b%2B%25.txt");
    expect(parsed.searchParams.get("versionId")).toBe("version+/=");
    const expected = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "GET",
        url: "http://localhost:4566/s3/examplebucket/dir/a%20b%2B%25.txt?versionId=version%2B%2F%3D&X-Amz-Expires=900",
        service: "s3",
        region: "us-east-1",
        signQuery: true,
        datetime,
      }),
    );
    expect(parsed.searchParams.get("X-Amz-Signature")).toBe(
      new URL(expected.url).searchParams.get("X-Amz-Signature"),
    );
  });

  test("presignS3Url fails with InvalidInput for a bucket or key that addresses another resource", async () => {
    const cases: Array<[bucket: string, key: string, member: string, custom?: boolean]> = [
      ["examplebucket", "", "key"],
      ["examplebucket", "..", "key"],
      ["examplebucket", "a/../../other/k", "key"],
      ["", "k", "bucket"],
      ["..", "k", "bucket", true],
      ["attacker.invalid/x", "k", "bucket"],
      ["attacker.invalid#", "k", "bucket"],
    ];
    for (const [bucket, key, member, custom] of cases) {
      const program = Presign.presignS3Url({ bucket, key, datetime }).pipe(Effect.provide(layer));
      const error = await Effect.runPromise(
        Effect.flip(
          custom ? program.pipe(Effect.provide(Endpoint.of("http://localhost:4566"))) : program,
        ),
      );
      expect(error, `${bucket} ${key}`).toBeInstanceOf(InvalidInput);
      expect((error as InvalidInput).member).toBe(member);
    }
  });

  test("presignS3Url keeps a custom-endpoint bucket in one path segment", async () => {
    const signed = await Effect.runPromise(
      Presign.presignS3Url({ bucket: "a/b", key: "k", datetime }).pipe(
        Effect.provide(layer),
        Effect.provide(Endpoint.of("http://localhost:4566")),
      ),
    );
    expect(new URL(signed).pathname).toBe("/a%2Fb/k");
  });

  test("presignS3Url leaves current-version URLs unchanged when versionId is omitted", async () => {
    const options = {
      bucket: "examplebucket",
      key: "dir/a b.txt",
      datetime,
    };
    const signed = await Effect.runPromise(
      Presign.presignS3Url(options).pipe(Effect.provide(layer)),
    );
    const explicitUndefined = await Effect.runPromise(
      Presign.presignS3Url({ ...options, versionId: undefined }).pipe(Effect.provide(layer)),
    );
    const expected = await Effect.runPromise(
      Presign.presignUrl({
        url: "https://examplebucket.s3.us-east-1.amazonaws.com/dir/a%20b.txt",
        service: "s3",
        datetime,
      }).pipe(Effect.provide(layer)),
    );
    expect(new URL(signed).searchParams.has("versionId")).toBe(false);
    expect(signed).toBe(expected);
    expect(explicitUndefined).toBe(signed);
  });

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
    expect(parsed.searchParams.get("X-Amz-SignedHeaders")).toBe("content-type;host");
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("60");
    expect(parsed.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("SigV4.sign crypto implementations", () => {
  const program = SigV4.sign({
    ...creds,
    method: "GET",
    url: "https://examplebucket.s3.amazonaws.com/test.txt",
    headers: { Range: "bytes=0-9" },
    service: "s3",
    region: "us-east-1",
    datetime,
  });
  const expected = "Signature=5c0d4ff29e72b8f94c5b6720369921e587e39bf7a64e456887dec4b43a2d1b77";
  test.each([
    ["webcrypto", CoreCrypto.webCrypto],
    ["node:crypto", CoreCrypto.nodeCrypto],
  ])("%s produces the AWS reference signature", async (_name, layer) => {
    const signed = await Effect.runPromise(program.pipe(Effect.provide(layer)));
    expect(signed.headers.authorization).toContain(expected);
  });

  test("a custom implementation is used for every hash and HMAC", async () => {
    const calls: string[] = [];
    const web = CoreCrypto.makeWebCrypto();
    const custom: CoreCrypto.CryptoImpl = {
      name: "counting",
      sha256: (d) => (calls.push("sha256"), web.sha256(d)),
      importHmacKey: (k) => (calls.push("import"), web.importHmacKey(k)),
      hmacSha256: (k, d) => (calls.push("hmac"), web.hmacSha256(k, d)),
    };
    const signed = await Effect.runPromise(
      SigV4.sign({
        ...creds,
        method: "POST",
        url: "https://sts.amazonaws.com/",
        body: "x",
        service: "sts",
        region: "us-west-2",
        datetime: "20240101T000000Z",
      }).pipe(Effect.provide(CoreCrypto.layer(custom))),
    );
    expect(signed.headers.authorization).toMatch(/Signature=[0-9a-f]{64}$/);
    expect(calls.filter((c) => c === "sha256")).toHaveLength(2);
    expect(calls).toContain("hmac");
  });
});

describe("SigV4.sign against the Headers-based reference signer", () => {
  /** The signed request, or the error's tag, from one signer. */
  const outcome = (sign: typeof SigV4.sign, options: SigV4.SignOptions) => {
    const exit = Effect.runSyncExit(sign(options));
    return Exit.isSuccess(exit) ? { signed: exit.value } : { error: String(exit.cause) };
  };

  const urls = [
    "https://s3.us-east-1.amazonaws.com",
    "https://s3.us-east-1.amazonaws.com/",
    "http://localhost:4566/a%20b/c?uploadId=%C3%BC-%C3%A9&x-id=Abort",
    "https://x.example.com/b/a/../x?b=2&a=1&a=0&=empty&k%27=v'(x)",
    "https://x.example.com/b/%2e%2E/x?tagging",
    "https://x.example.com//x//y?n=0&n=1",
    "https://Example.COM:443/k+e y/é?q=a+b",
    "https://x.example.com/a%2Fb~!$'()*?X-Amz-Expires=10",
  ];
  const headerSets: Array<Record<string, string>> = [
    {},
    { "Content-Type": "application/xml", "X-Amz-Meta-A": "  x  y  ", "x-amz-meta-a": "z" },
    {
      Host: "evil",
      "X-Amz-Date": "19990101T000000Z",
      Range: "bytes=0-1",
      "x-amz-content-sha256": "abc",
    },
    { "x-amz-meta-u": "ünicode" },
    { "X-Amz-Meta-D": "1", "x-amz-meta-d": "2", "x-amz-meta-e": "a  \t b" },
    { "x-amz-meta-w": "\u0100wide" },
    { "bad header": "x" },
    { "x-amz-meta-nl": "a\nb" },
    { "X-Amz-Target": "\tT.Op \t", "x-amz-meta-n": 5 as unknown as string },
    { "Set-Cookie": "a=1", "x-amz-meta-z": "" },
  ];

  test("produces the same signature, headers and URL", () => {
    let compared = 0;
    for (const service of ["s3", "dynamodb", "iotdevicegateway"]) {
      for (const url of urls) {
        for (const headers of headerSets) {
          for (const signQuery of [false, true]) {
            for (const allHeaders of [false, true]) {
              const options: SigV4.SignOptions = {
                ...creds,
                sessionToken: service === "s3" ? undefined : Redacted.make("TOKEN"),
                method: compared % 3 === 0 ? undefined : "PUT",
                url,
                headers,
                body: compared % 2 === 0 ? "body" : undefined,
                service,
                region: "us-east-1",
                datetime,
                signQuery,
                allHeaders,
              };
              expect(
                outcome(SigV4.sign, options),
                `${service} ${url} ${JSON.stringify(headers)}`,
              ).toEqual(outcome(Reference.sign as typeof SigV4.sign, options));
              compared++;
            }
          }
        }
      }
    }
    expect(compared).toBe(3 * 8 * 10 * 2 * 2);
  });
});
