import { describe, expect, test } from "bun:test";
import * as API from "@distilled.cloud/core/api";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type { Operation } from "./client/operation.ts";
import { makeRequestBuilder } from "./client/request-builder.ts";
import * as Credentials from "./credentials.browser.ts";
import * as Endpoint from "./endpoint.ts";
import { AwsProtocol } from "./protocol.ts";
import type * as Region from "./region.ts";
import * as S3 from "./services/s3.ts";
import * as SigV4 from "./sigv4.ts";

const credentials = {
  accessKeyId: Redacted.make("AKIAIOSFODNN7EXAMPLE"),
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
  sessionToken: Redacted.make("SESSION+/="),
  region: "us-east-1" as Region.RegionName,
};

const layer = Layer.mergeAll(
  AwsProtocol,
  Layer.succeed(Credentials.Credentials, Effect.succeed(credentials)),
  Endpoint.of("https://s3.us-east-1.amazonaws.com"),
);

const multipart = {
  input: S3.CreateMultipartUploadRequest,
  output: S3.CreateMultipartUploadOutput,
  errors: [],
  operationName: "CreateMultipartUpload",
} satisfies Operation;

const putObject = {
  input: S3.PutObjectRequest,
  output: S3.PutObjectOutput,
  errors: [],
  operationName: "PutObject",
} satisfies Operation;

const serialize = (operation: Operation, input: unknown) =>
  Effect.gen(function* () {
    const wire = yield* makeRequestBuilder(operation)(input);
    const protocol = yield* API.Protocol;
    const request = yield* protocol.encode({
      input,
      inputAst: operation.input.ast,
      config: operation,
    });
    expect(request.headers["x-amz-date"]).toMatch(/^\d{8}T\d{6}Z$/);

    // Re-sign the serialized input at the protocol's signing time.
    const signed = yield* SigV4.sign({
      method: wire.method,
      url: request.url,
      headers: wire.headers,
      body: wire.body instanceof ReadableStream ? undefined : wire.body,
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
    return { wire, request };
  }).pipe(Effect.provide(layer));

const object = { Bucket: "examplebucket", Key: "reports/part.md" };

describe("AwsProtocol Content-Type serialization", () => {
  test("preserves CreateMultipartUpload ContentType with an empty body", async () => {
    const { wire, request } = await Effect.runPromise(
      serialize(multipart, { ...object, ContentType: "text/markdown" }),
    );
    expect(wire.body).toBeUndefined();
    expect(wire.headers["Content-Type"]).toBe("text/markdown");
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
    const { wire, request } = await Effect.runPromise(
      serialize(multipart, object),
    );
    expect(wire.body).toBeUndefined();
    expect(wire.headers["Content-Type"]).toBeUndefined();
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
      const { request } = await Effect.runPromise(
        serialize(putObject, {
          ...object,
          Body,
          ContentType: "text/markdown",
        }),
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
    const { wire, request } = await Effect.runPromise(
      serialize(putObject, {
        ...object,
        Body: new TextEncoder().encode(content),
      }),
    );
    expect(wire.headers["Content-Type"]).toBeUndefined();
    expect(request.body._tag).toBe("Uint8Array");
    expect(request.headers["content-type"]).toBe("application/octet-stream");
    expect(request.headers["content-length"]).toBe(String(content.length));
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    expect(await web.text()).toBe(content);
  });
});
