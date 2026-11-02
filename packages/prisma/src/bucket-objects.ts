/**
 * Client for the object API of a Prisma bucket.
 *
 * Prisma buckets are served by Tigris through an S3-compatible endpoint. This
 * client covers only the requests Prisma documents as supported: `GetObject`,
 * `HeadObject`, `PutObject`, `DeleteObject`, `ListObjectsV2`, and presigned
 * `GET` and `PUT` URLs. Requests are signed with SigV4 under the `auto`
 * region and address the bucket path-style (`<endpoint>/<bucket>/<key>`).
 * Transient failures (408, 429, 5xx, transport errors) are retried up to 5
 * times with jittered exponential backoff from 200 ms; the policy is fixed
 * and does not read `Prisma.Retry`.
 *
 * @example
 * ```ts
 * import * as BucketObjects from "@distilled.cloud/prisma/BucketObjects";
 *
 * const bucket = BucketObjects.make({ endpoint, bucket: "uploads", credentials });
 * const object = yield* bucket.getObject("reports/2026.json");
 * ```
 */
import type { SigningError } from "@distilled.cloud/aws4signer";
import * as AwsClient from "@distilled.cloud/aws4signer/AwsClient";
import { parseXml, type XmlParseError, type XmlValue } from "@distilled.cloud/core/xml";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type * as Redacted from "effect/Redacted";
import * as Schedule from "effect/Schedule";
import * as Stream from "effect/Stream";

/** Prisma reports no region on a bucket key; Tigris accepts the `auto` scope. */
const SIGNING_REGION = "auto";

const DEFAULT_PRESIGN_EXPIRES_IN = 900;

export interface ClientConfig {
  /** The bucket key's S3 endpoint, e.g. `https://t3.storage.dev`. */
  endpoint: string;
  bucket: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: Redacted.Redacted<string>;
  };
}

export interface ObjectInfo {
  key: string;
  size: number;
  /** Without the surrounding quotes. */
  etag: string;
  lastModified: Date | undefined;
  contentType: string | undefined;
  /** `x-amz-meta-*` headers, without the prefix. */
  metadata: Record<string, string>;
}

export interface ObjectWithBody extends ObjectInfo {
  /** Can be consumed once. */
  body: Stream.Stream<Uint8Array, HttpClientError.HttpClientError>;
}

export interface ByteRange {
  offset: number;
  /** Reads to the end of the object when omitted. */
  length?: number | undefined;
}

export interface GetObjectOptions {
  range?: ByteRange | undefined;
}

/** A stream is read into memory before it is sent, so every upload carries `Content-Length`. */
export type PutObjectBody =
  | string
  | Uint8Array
  | ArrayBuffer
  | Blob
  | ReadableStream<Uint8Array>
  | Stream.Stream<Uint8Array, unknown>;

export interface PutObjectOptions {
  contentType?: string | undefined;
  cacheControl?: string | undefined;
  contentDisposition?: string | undefined;
  contentEncoding?: string | undefined;
  metadata?: Record<string, string> | undefined;
}

export interface PutObjectResult {
  etag: string;
}

export interface ListObjectsV2Options {
  prefix?: string | undefined;
  delimiter?: string | undefined;
  continuationToken?: string | undefined;
  maxKeys?: number | undefined;
  startAfter?: string | undefined;
}

/** A truncated page always carries the token that continues it. */
export type ListObjectsV2Result =
  | {
      contents: ObjectInfo[];
      commonPrefixes: string[];
      isTruncated: true;
      nextContinuationToken: string;
    }
  | {
      contents: ObjectInfo[];
      commonPrefixes: string[];
      isTruncated: false;
    };

export interface PresignGetObjectOptions {
  /** Seconds. @default 900 */
  expiresIn?: number | undefined;
  /** Sent back as the download's `Content-Type`. */
  responseContentType?: string | undefined;
}

export interface PresignPutObjectOptions {
  /** Seconds. @default 900 */
  expiresIn?: number | undefined;
  /** The upload must send this `Content-Type`. */
  contentType?: string | undefined;
}

export class NoSuchKey
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::NoSuchKey")<{
    message: string;
    status: number;
  }> {}

export class NoSuchBucket
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::NoSuchBucket")<{
    message: string;
    status: number;
  }> {}

/** A 404 with no S3 error body, as `HeadObject` returns. */
export class NotFound
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::NotFound")<{
    message: string;
    status: number;
  }> {}

/** Any other S3 error response. */
export class S3ServiceError
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::S3ServiceError")<{
    message: string;
    status: number;
    code: string | undefined;
  }> {}

export class InvalidS3Response
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::InvalidS3Response")<{
    message: string;
  }> {}

/** An argument that cannot be sent: a key with `.` or `..` segments, or a string that is not valid UTF-16. */
export class InvalidInput
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::InvalidInput")<{
    message: string;
  }> {}

export class BodyReadError
  extends /*@__PURE__*/ Data.TaggedError("Prisma::BucketObjects::BodyReadError")<{
    message: string;
    cause: unknown;
  }> {}

export type ClientError =
  | NoSuchKey
  | NoSuchBucket
  | NotFound
  | S3ServiceError
  | InvalidS3Response
  | InvalidInput
  | BodyReadError
  | HttpClientError.HttpClientError
  | SigningError
  | AwsClient.SignRequestError
  | XmlParseError;

export interface Client {
  /** `null` when the key does not exist. */
  headObject: (key: string) => Effect.Effect<ObjectInfo | null, ClientError, HttpClient.HttpClient>;
  /** `null` when the key does not exist. */
  getObject: (
    key: string,
    options?: GetObjectOptions,
  ) => Effect.Effect<ObjectWithBody | null, ClientError, HttpClient.HttpClient>;
  putObject: (
    key: string,
    body: PutObjectBody,
    options?: PutObjectOptions,
  ) => Effect.Effect<PutObjectResult, ClientError, HttpClient.HttpClient>;
  /** Deleting a key that does not exist succeeds. */
  deleteObject: (key: string) => Effect.Effect<void, ClientError, HttpClient.HttpClient>;
  /** One page. */
  listObjectsV2: (
    options?: ListObjectsV2Options,
  ) => Effect.Effect<ListObjectsV2Result, ClientError, HttpClient.HttpClient>;
  /** Sends no request. */
  presignGetObject: (
    key: string,
    options?: PresignGetObjectOptions,
  ) => Effect.Effect<string, InvalidInput | SigningError>;
  /** Sends no request. */
  presignPutObject: (
    key: string,
    options?: PresignPutObjectOptions,
  ) => Effect.Effect<string, InvalidInput | SigningError>;
}

const rangeHeader = (range: ByteRange) => {
  const end = range.length === undefined ? "" : String(range.offset + range.length - 1);
  return `bytes=${range.offset}-${end}`;
};

/** RFC 3986 percent-encoding. Throws on a lone surrogate, which has no UTF-8 form. */
const encodeComponent = (value: string) =>
  encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );

/**
 * An empty key addresses the bucket itself. The URL parser resolves `.` and `..` path segments before a request is sent,
 * so such a key would address a different object, or another bucket.
 */
const encodeKey = (key: string): Effect.Effect<string, InvalidInput> => {
  if (key === "") {
    return Effect.fail(new InvalidInput({ message: "Object key must not be empty" }));
  }
  const segments = key.split("/");
  if (segments.some((segment) => segment === "." || segment === "..")) {
    return Effect.fail(
      new InvalidInput({
        message: `Object key must not contain "." or ".." segments: ${JSON.stringify(key)}`,
      }),
    );
  }
  return Effect.try({
    try: () => segments.map(encodeComponent).join("/"),
    catch: () =>
      new InvalidInput({ message: `Object key is not valid UTF-16: ${JSON.stringify(key)}` }),
  });
};

const stripQuotes = (etag: string | undefined) =>
  etag === undefined ? "" : etag.replaceAll('"', "");

const META_PREFIX = "x-amz-meta-";

const metadataFrom = (headers: Record<string, string>): Record<string, string> => {
  const metadata: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    if (name.startsWith(META_PREFIX)) metadata[name.slice(META_PREFIX.length)] = value;
  }
  return metadata;
};

const headerDate = (value: string | undefined) => {
  const date = value === undefined ? undefined : new Date(value);
  return date === undefined || Number.isNaN(date.getTime()) ? undefined : date;
};

const objectFromHeaders = (key: string, headers: Record<string, string>): ObjectInfo => ({
  key,
  size: Number(headers["content-length"] ?? 0) || 0,
  etag: stripQuotes(headers.etag),
  lastModified: headerDate(headers["last-modified"]),
  contentType: headers["content-type"],
  metadata: metadataFrom(headers),
});

const concatBytes = (chunks: Iterable<Uint8Array>): Uint8Array => {
  const list = [...chunks];
  const total = list.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of list) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
};

const xmlText = (value: XmlValue | undefined): string | undefined =>
  typeof value === "string" ? value : undefined;

const xmlList = (value: XmlValue | undefined): XmlValue[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

const xmlChild = (value: XmlValue | undefined, name: string): XmlValue | undefined =>
  typeof value === "object" && !Array.isArray(value) ? value[name] : undefined;

const errorDetailsOf = (body: string) =>
  body.trim() === ""
    ? Effect.succeed({ code: undefined, message: undefined })
    : parseXml(body).pipe(
        Effect.map((document) => ({
          code: xmlText(xmlChild(document.Error, "Code")),
          message: xmlText(xmlChild(document.Error, "Message")),
        })),
        Effect.orElseSucceed(() => ({ code: undefined, message: undefined })),
      );

const s3Error = (
  operation: string,
  status: number,
  code: string | undefined,
  detail: string | undefined,
): NoSuchKey | NoSuchBucket | NotFound | S3ServiceError => {
  const message = [
    `${operation} failed with HTTP ${status}`,
    code === undefined ? "" : ` (${code})`,
    detail === undefined ? "" : `: ${detail}`,
  ].join("");
  if (code === "NoSuchKey") return new NoSuchKey({ message, status });
  if (code === "NoSuchBucket") return new NoSuchBucket({ message, status });
  if (code === undefined && status === 404) return new NotFound({ message, status });
  return new S3ServiceError({ message, status, code });
};

const ensureOk = (operation: string) => (response: HttpClientResponse.HttpClientResponse) =>
  response.status >= 200 && response.status < 300
    ? Effect.succeed(response)
    : response.text.pipe(
        Effect.orElseSucceed(() => ""),
        Effect.flatMap(errorDetailsOf),
        Effect.flatMap(({ code, message }) =>
          Effect.fail(s3Error(operation, response.status, code, message)),
        ),
      );

const missingObject = [
  "Prisma::BucketObjects::NoSuchKey",
  "Prisma::BucketObjects::NotFound",
] as const;

const isTransient = (error: ClientError) =>
  (error._tag === "Prisma::BucketObjects::S3ServiceError" &&
    (error.status === 408 || error.status === 429 || error.status >= 500)) ||
  (error._tag === "HttpClientError" && error.reason._tag === "TransportError");

/**
 * Effect's fetch client drops `Content-Length` from a streamed body, and
 * `PutObject` rejects an upload without one.
 */
const requestBody = (
  value: PutObjectBody,
  contentType: string | undefined,
): Effect.Effect<HttpBody.HttpBody, BodyReadError> => {
  if (typeof value === "string") return Effect.succeed(HttpBody.text(value, contentType));
  if (value instanceof Uint8Array) return Effect.succeed(HttpBody.uint8Array(value, contentType));
  if (value instanceof ArrayBuffer) {
    return Effect.succeed(HttpBody.uint8Array(new Uint8Array(value), contentType));
  }
  const readError = (cause: unknown) =>
    new BodyReadError({ message: "Reading the upload body failed", cause });
  if (value instanceof Blob) {
    return Effect.tryPromise({ try: () => value.arrayBuffer(), catch: readError }).pipe(
      Effect.map((buffer) => HttpBody.uint8Array(new Uint8Array(buffer), contentType)),
    );
  }
  const stream =
    value instanceof ReadableStream
      ? Stream.fromReadableStream({ evaluate: () => value, onError: readError })
      : value.pipe(Stream.mapError(readError));
  return Stream.runCollect(stream).pipe(
    Effect.map((chunks) => HttpBody.uint8Array(concatBytes(chunks), contentType)),
  );
};

const putHeaders = (options: PutObjectOptions | undefined): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (options?.cacheControl !== undefined) headers["cache-control"] = options.cacheControl;
  if (options?.contentDisposition !== undefined) {
    headers["content-disposition"] = options.contentDisposition;
  }
  if (options?.contentEncoding !== undefined) {
    headers["content-encoding"] = options.contentEncoding;
  }
  for (const [name, value] of Object.entries(options?.metadata ?? {})) {
    headers[`${META_PREFIX}${name}`] = value;
  }
  return headers;
};

const invalidList = (message: string) =>
  Effect.fail(new InvalidS3Response({ message: `ListObjectsV2 returned ${message}` }));

const listEntryFrom = (entry: XmlValue): Effect.Effect<ObjectInfo, InvalidS3Response> => {
  const key = xmlText(xmlChild(entry, "Key"));
  const size = Number(xmlText(xmlChild(entry, "Size")));
  const modified = xmlText(xmlChild(entry, "LastModified"));
  const lastModified = modified === undefined ? undefined : new Date(modified);
  if (key === undefined) return invalidList("an entry without a Key");
  if (!Number.isFinite(size)) return invalidList(`an invalid Size for ${key}`);
  if (lastModified !== undefined && Number.isNaN(lastModified.getTime())) {
    return invalidList(`an invalid LastModified for ${key}`);
  }
  return Effect.succeed({
    key,
    size,
    etag: stripQuotes(xmlText(xmlChild(entry, "ETag"))),
    lastModified,
    contentType: undefined,
    metadata: {},
  });
};

const listResultFrom = (body: string) =>
  parseXml(body).pipe(
    Effect.flatMap((document) => {
      const result = document.ListBucketResult;
      // An empty `<ListBucketResult></ListBucketResult>` parses to "".
      if (
        result === undefined ||
        Array.isArray(result) ||
        (typeof result === "string" && result.trim() !== "")
      ) {
        return invalidList("a response that is not a ListBucketResult");
      }
      const isTruncated = xmlText(xmlChild(result, "IsTruncated")) === "true";
      const token = xmlText(xmlChild(result, "NextContinuationToken"));
      if (isTruncated && !token) {
        return invalidList("IsTruncated without a NextContinuationToken");
      }
      const commonPrefixes = xmlList(xmlChild(result, "CommonPrefixes")).flatMap((entry) => {
        const prefix = xmlText(xmlChild(entry, "Prefix"));
        return prefix === undefined ? [] : [prefix];
      });
      return Effect.forEach(xmlList(xmlChild(result, "Contents")), listEntryFrom).pipe(
        Effect.map((contents): ListObjectsV2Result =>
          isTruncated && token
            ? { contents, commonPrefixes, isTruncated: true, nextContinuationToken: token }
            : { contents, commonPrefixes, isTruncated: false },
        ),
      );
    }),
  );

const listQuery = (options: ListObjectsV2Options | undefined) =>
  Effect.try({
    try: () =>
      (
        [
          ["list-type", 2],
          ["prefix", options?.prefix],
          ["delimiter", options?.delimiter],
          ["continuation-token", options?.continuationToken],
          ["max-keys", options?.maxKeys],
          ["start-after", options?.startAfter],
        ] as const
      )
        .flatMap(([name, value]) =>
          value === undefined ? [] : [`${name}=${encodeComponent(String(value))}`],
        )
        .join("&"),
    catch: () => new InvalidInput({ message: "List options are not valid UTF-16" }),
  });

export const make = (config: ClientConfig): Client => {
  const bucketUrl = `${config.endpoint.replace(/\/+$/, "")}/${config.bucket}`;
  const objectUrl = (key: string) => Effect.map(encodeKey(key), (path) => `${bucketUrl}/${path}`);
  const signing = {
    credentials: config.credentials,
    service: "s3",
    region: SIGNING_REGION,
  };

  const send = (operation: string, request: HttpClientRequest.HttpClientRequest) =>
    HttpClient.HttpClient.pipe(
      Effect.map(AwsClient.sign(signing)),
      Effect.flatMap((client) => client.execute(request)),
      Effect.flatMap(ensureOk(operation)),
      Effect.retry({
        while: isTransient,
        schedule: Schedule.exponential("200 millis").pipe(Schedule.jittered),
        times: 5,
      }),
    );

  const presign = (
    method: "GET" | "PUT",
    url: string,
    expiresIn: number | undefined,
    contentType: string | undefined,
  ) =>
    AwsClient.presign(url, {
      ...signing,
      method,
      expiresIn: expiresIn ?? DEFAULT_PRESIGN_EXPIRES_IN,
      headers: contentType === undefined ? undefined : { "content-type": contentType },
      // A PUT URL pins `content-type`, which signers leave out by default.
      allHeaders: contentType !== undefined,
    });

  return {
    headObject: (key) =>
      objectUrl(key).pipe(
        Effect.flatMap((url) => send("HeadObject", HttpClientRequest.head(url))),
        Effect.map((response): ObjectInfo | null => objectFromHeaders(key, response.headers)),
        Effect.catchTag(missingObject, () => Effect.succeed(null)),
      ),
    getObject: (key, options) =>
      objectUrl(key).pipe(
        Effect.map((url) => {
          const request = HttpClientRequest.get(url);
          return options?.range === undefined
            ? request
            : HttpClientRequest.setHeader(request, "range", rangeHeader(options.range));
        }),
        Effect.flatMap((request) => send("GetObject", request)),
        Effect.map((response): ObjectWithBody | null => ({
          ...objectFromHeaders(key, response.headers),
          body: response.stream,
        })),
        Effect.catchTag(missingObject, () => Effect.succeed(null)),
      ),
    putObject: (key, body, options) =>
      Effect.all([objectUrl(key), requestBody(body, options?.contentType)]).pipe(
        Effect.flatMap(([url, requestBody]) =>
          send(
            "PutObject",
            HttpClientRequest.put(url).pipe(
              HttpClientRequest.setHeaders(putHeaders(options)),
              HttpClientRequest.setBody(requestBody),
            ),
          ),
        ),
        Effect.map((response): PutObjectResult => ({ etag: stripQuotes(response.headers.etag) })),
      ),
    deleteObject: (key) =>
      objectUrl(key).pipe(
        Effect.flatMap((url) => send("DeleteObject", HttpClientRequest.delete(url))),
        Effect.asVoid,
        Effect.catchTag(missingObject, () => Effect.void),
      ),
    listObjectsV2: (options) =>
      listQuery(options).pipe(
        Effect.flatMap((query) =>
          send("ListObjectsV2", HttpClientRequest.get(`${bucketUrl}?${query}`)),
        ),
        Effect.flatMap((response) => response.text),
        Effect.flatMap(listResultFrom),
      ),
    presignGetObject: (key, options) =>
      objectUrl(key).pipe(
        Effect.flatMap((url) => {
          const contentType = options?.responseContentType;
          return contentType === undefined
            ? Effect.succeed(url)
            : Effect.try({
                try: () => `${url}?response-content-type=${encodeComponent(contentType)}`,
                catch: () =>
                  new InvalidInput({ message: "Response content type is not valid UTF-16" }),
              });
        }),
        Effect.flatMap((url) => presign("GET", url, options?.expiresIn, undefined)),
      ),
    presignPutObject: (key, options) =>
      objectUrl(key).pipe(
        Effect.flatMap((url) => presign("PUT", url, options?.expiresIn, options?.contentType)),
      ),
  };
};
