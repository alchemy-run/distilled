import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as Credentials from "./credentials.browser.ts";
import * as Endpoint from "./endpoint.ts";
import type * as Region from "./region.ts";
import * as S3 from "./services/s3.ts";
import * as SigV4 from "./sigv4.ts";

const credentials = {
  accessKeyId: Redacted.make("AKIAIOSFODNN7EXAMPLE"),
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
  sessionToken: Redacted.make("SESSION+/="),
  region: "us-east-1" as Region.RegionName,
};

const capture = <A, E>(
  operation: Effect.Effect<
    A,
    E,
    Credentials.Credentials | HttpClient.HttpClient
  >,
) =>
  Effect.gen(function* () {
    const requests: HttpClientRequest.HttpClientRequest[] = [];
    const client = HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(request);
        return HttpClientResponse.fromWeb(
          request,
          request.method === "POST"
            ? new Response(
                '<InitiateMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Bucket>examplebucket</Bucket><Key>reports/part.md</Key><UploadId>upload-id</UploadId></InitiateMultipartUploadResult>',
                { headers: { "content-type": "application/xml" } },
              )
            : new Response("", { headers: { etag: '"object-etag"' } }),
        );
      }),
    );
    yield* operation.pipe(
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          Layer.succeed(Credentials.Credentials, Effect.succeed(credentials)),
          Endpoint.of("https://s3.us-east-1.amazonaws.com"),
        ),
      ),
    );
    expect(requests).toHaveLength(1);
    const request = requests[0]!;
    expect(request.headers["x-amz-date"]).toMatch(/^\d{8}T\d{6}Z$/);
    const signedHeaderNames = request.headers.authorization
      .split("SignedHeaders=")[1]!
      .split(",")[0]!
      .split(";");

    // Re-sign the exact headers sent to the HTTP transport.
    const signed = yield* SigV4.sign({
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(
        signedHeaderNames.map((name) => [name, request.headers[name]]),
      ),
      accessKeyId: Redacted.value(credentials.accessKeyId),
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      service: "s3",
      region: credentials.region,
      datetime: request.headers["x-amz-date"],
    });
    expect(request.headers).toMatchObject(signed.headers);
    expect(request.headers.authorization).toBe(signed.headers.authorization);
    expect(request.headers["x-amz-security-token"]).toBe("SESSION+/=");
    expect(request.headers["x-amz-content-sha256"]).toBe("UNSIGNED-PAYLOAD");
    return request;
  });

const object = { Bucket: "examplebucket", Key: "reports/part.md" };

describe("AwsProtocol Content-Type serialization", () => {
  test("preserves CreateMultipartUpload ContentType with an empty body", async () => {
    const request = await Effect.runPromise(
      capture(
        S3.createMultipartUpload({ ...object, ContentType: "text/markdown" }),
      ),
    );
    expect(request.method).toBe("POST");
    expect(new URL(request.url).searchParams.has("uploads")).toBe(true);
    expect(request.body._tag).toBe("Empty");
    expect(request.headers["content-type"]).toBe("text/markdown");
    expect(request.headers["content-length"]).toBeUndefined();

    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    expect(web.headers.get("content-type")).toBe("text/markdown");
    expect(web.headers.get("authorization")).toBe(
      request.headers.authorization,
    );
    expect(await web.text()).toBe("");
  });

  test("does not add Content-Type when CreateMultipartUpload omits it", async () => {
    const request = await Effect.runPromise(
      capture(S3.createMultipartUpload(object)),
    );
    expect(request.body._tag).toBe("Empty");
    expect(request.headers["content-type"]).toBeUndefined();
    expect(request.headers["content-length"]).toBeUndefined();

    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    expect(web.headers.has("content-type")).toBe(false);
    expect(await web.text()).toBe("");
  });

  const content = "# Multipart metadata\n";
  for (const [name, Body] of [
    ["text", content],
    ["bytes", new TextEncoder().encode(content)],
  ] as const) {
    test(`preserves modeled Content-Type and ${name} in a regular PutObject body`, async () => {
      const request = await Effect.runPromise(
        capture(
          S3.putObject({ ...object, Body, ContentType: "text/markdown" }),
        ),
      );
      expect(request.method).toBe("PUT");
      expect(request.body._tag).toBe("Uint8Array");
      expect(request.headers["content-type"]).toBe("text/markdown");
      expect(request.headers["content-length"]).toBe(String(content.length));

      const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
      expect(web.headers.get("content-type")).toBe("text/markdown");
      expect(web.headers.get("authorization")).toBe(
        request.headers.authorization,
      );
      expect(await web.text()).toBe(content);
    });
  }

  test("retains the default content type for a regular byte body", async () => {
    const request = await Effect.runPromise(
      capture(
        S3.putObject({ ...object, Body: new TextEncoder().encode(content) }),
      ),
    );
    expect(request.body._tag).toBe("Uint8Array");
    expect(request.headers["content-type"]).toBe("application/octet-stream");
    expect(request.headers["content-length"]).toBe(String(content.length));
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    expect(await web.text()).toBe(content);
  });
});
