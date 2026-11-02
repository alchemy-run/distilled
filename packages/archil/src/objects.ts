/**
 * Archil disk objects -- hand-written.
 *
 * Every disk is also an S3-compatible bucket on the region's data plane
 * (`s3.<color>.<region>.…`, path-style, bucket = disk id, `<disk>.<branch>`
 * for a branch). This module speaks that API with the same API-key
 * `Authorization` header the official `disk` SDK sends, resolved from
 * {@link Credentials} on every request.
 *
 * Supported: GetObject (with Range), HeadObject, PutObject, AppendObject
 * (`PUT ?append=true`, ≤ 1 MiB), DeleteObject, DeleteObjects (≤ 1000 keys
 * per request), CopyObject (same bucket), ListObjectsV2 (`/` delimiter only),
 * and multipart upload (create, upload part, complete, abort, list parts,
 * list uploads). Writes that conflict with a FUSE mount's write delegation
 * fail with {@link ObjectConflict}.
 */
import * as Category from "@distilled.cloud/core/category";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { Credentials, s3BaseUrl } from "./credentials.ts";

/** The object (or the multipart upload) does not exist. */
export class NoSuchKey extends Schema.TaggedError<NoSuchKey>()("NoSuchKey", {
  key: Schema.String,
  message: Schema.optional(Schema.String),
}).pipe(Category.withNotFoundError) {}

/** The disk (bucket) does not exist, or the key cannot see it. */
export class NoSuchDisk extends Schema.TaggedError<NoSuchDisk>()("NoSuchDisk", {
  disk: Schema.String,
  message: Schema.optional(Schema.String),
}).pipe(Category.withNotFoundError) {}

/** The write conflicts with a mounted client's write delegation (409). */
export class ObjectConflict extends Schema.TaggedError<ObjectConflict>()("ObjectConflict", {
  key: Schema.String,
  message: Schema.optional(Schema.String),
}).pipe(Category.withConflictError) {}

/** The key cannot be written: it is reserved (`.archil/`) or names a special file. */
export class ObjectNotSupported extends Schema.TaggedError<ObjectNotSupported>()(
  "ObjectNotSupported",
  { key: Schema.String, code: Schema.String, message: Schema.optional(Schema.String) },
).pipe(Category.withBadRequestError) {}

/** The credentials were rejected (401/403). */
export class ObjectAccessDenied extends Schema.TaggedError<ObjectAccessDenied>()(
  "ObjectAccessDenied",
  { status: Schema.Number, message: Schema.optional(Schema.String) },
).pipe(Category.withAuthError) {}

/** Any other S3 error response. */
export class ObjectsError extends Schema.TaggedError<ObjectsError>()("ObjectsError", {
  operation: Schema.String,
  status: Schema.Number,
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
}).pipe(Category.withServerError) {}

export type ObjectsFailure =
  | NoSuchKey
  | NoSuchDisk
  | ObjectConflict
  | ObjectNotSupported
  | ObjectAccessDenied
  | ObjectsError;

/** Address a disk, or one of its branches. */
export interface DiskRef {
  readonly disk: string;
  readonly branch?: string;
}

const bucketOf = (ref: DiskRef) => (ref.branch ? `${ref.disk}.${ref.branch}` : ref.disk);

const encodeKey = (key: string) =>
  key.replace(/^\//, "").split("/").map(encodeURIComponent).join("/");

const xmlText = (xml: string, tag: string) => {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? decodeXml(match[1]!) : undefined;
};

const xmlBlocks = (xml: string, tag: string) =>
  [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map((m) => m[1]!);

const decodeXml = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

const encodeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

interface RequestOptions {
  readonly operation: string;
  readonly method: "GET" | "HEAD" | "PUT" | "POST" | "DELETE";
  readonly ref: DiskRef;
  readonly key?: string;
  readonly query?: Record<string, string | number | undefined>;
  readonly headers?: Record<string, string | undefined>;
  readonly body?: Uint8Array | string;
  readonly contentType?: string;
}

const toError = (options: RequestOptions, status: number, text: string): ObjectsFailure => {
  const code = xmlText(text, "Code");
  const message = xmlText(text, "Message") ?? (text || undefined);
  const key = options.key ?? "";
  if (status === 401 || status === 403) return new ObjectAccessDenied({ status, message });
  if (code === "NoSuchKey" || code === "NoSuchUpload" || (status === 404 && options.key)) {
    return new NoSuchKey({ key, message });
  }
  if (code === "NoSuchBucket" || status === 404) {
    return new NoSuchDisk({ disk: bucketOf(options.ref), message });
  }
  if (status === 409) return new ObjectConflict({ key, message });
  if (code === "NotImplemented" || code === "AccessDeniedReservedPath") {
    return new ObjectNotSupported({ key, code, message });
  }
  return new ObjectsError({ operation: options.operation, status, code, message });
};

const request = Effect.fn(function* (options: RequestOptions) {
  const credentials = yield* Effect.flatMap(Credentials, (resolve) => resolve);
  const client = yield* HttpClient.HttpClient;
  const base = s3BaseUrl(credentials.apiBaseUrl);
  const path = options.key
    ? `/${bucketOf(options.ref)}/${encodeKey(options.key)}`
    : `/${bucketOf(options.ref)}`;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(options.query ?? {})) {
    if (v !== undefined) params.set(k, String(v));
  }
  const qs = params.toString();
  // `?delete` / `?uploads` are valueless S3 subresources.
  const url = `${base}${path}${qs ? `?${qs.replace(/=(&|$)/g, "$1")}` : ""}`;
  let req = HttpClientRequest.make(options.method)(url).pipe(
    HttpClientRequest.setHeader("Authorization", Redacted.value(credentials.apiKey)),
  );
  for (const [k, v] of Object.entries(options.headers ?? {})) {
    if (v !== undefined) req = HttpClientRequest.setHeader(req, k, v);
  }
  if (options.body !== undefined) {
    req = HttpClientRequest.bodyUint8Array(
      req,
      typeof options.body === "string" ? new TextEncoder().encode(options.body) : options.body,
      options.contentType ?? "application/octet-stream",
    );
  }
  const response = yield* client.execute(req);
  if (response.status >= 300) {
    const text = options.method === "HEAD" ? "" : yield* response.text;
    return yield* Effect.fail(toError(options, response.status, text));
  }
  return response;
});

const etagOf = (response: HttpClientResponse.HttpClientResponse) =>
  response.headers["etag"] ?? undefined;

/** Metadata of an object. */
export interface ObjectMetadata {
  readonly size: number;
  readonly etag: string | undefined;
  readonly contentType: string | undefined;
  readonly lastModified: Date | undefined;
}

/** Read an object's bytes, optionally a byte range (`bytes=0-1023`). */
export const getObject = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  options: { readonly range?: string } = {},
) {
  const response = yield* request({
    operation: "GetObject",
    method: "GET",
    ref,
    key,
    headers: { Range: options.range },
  });
  return new Uint8Array(yield* response.arrayBuffer);
});

/** Read an object as UTF-8 text. */
export const getObjectText = Effect.fn(function* (ref: DiskRef, key: string) {
  return new TextDecoder().decode(yield* getObject(ref, key));
});

/** Stream an object's bytes. */
export const getObjectStream = (ref: DiskRef, key: string) =>
  Stream.unwrap(
    request({ operation: "GetObject", method: "GET", ref, key }).pipe(
      Effect.map((response) => response.stream),
    ),
  );

/** An object's metadata, or `undefined` when it does not exist. */
export const headObject = Effect.fn(function* (ref: DiskRef, key: string) {
  return yield* request({ operation: "HeadObject", method: "HEAD", ref, key }).pipe(
    Effect.map((response): ObjectMetadata | undefined => ({
      size: Number(response.headers["content-length"] ?? 0),
      etag: etagOf(response),
      contentType: response.headers["content-type"],
      lastModified: response.headers["last-modified"]
        ? new Date(response.headers["last-modified"])
        : undefined,
    })),
    Effect.catchTag("NoSuchKey", () => Effect.succeed(undefined)),
  );
});

/** POSIX attributes applied when a write creates the file. */
export interface PosixAttributes {
  readonly mode?: number;
  readonly uid?: number;
  readonly gid?: number;
}

const posixHeaders = (attrs: PosixAttributes = {}) => ({
  "x-archil-mode": attrs.mode !== undefined ? attrs.mode.toString(8) : undefined,
  "x-archil-uid": attrs.uid !== undefined ? String(attrs.uid) : undefined,
  "x-archil-gid": attrs.gid !== undefined ? String(attrs.gid) : undefined,
});

/** Write an object (≤ 5 GiB; use multipart above that). */
export const putObject = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  body: Uint8Array | string,
  options: { readonly contentType?: string } & PosixAttributes = {},
) {
  const response = yield* request({
    operation: "PutObject",
    method: "PUT",
    ref,
    key,
    body,
    contentType: options.contentType,
    headers: posixHeaders(options),
  });
  return { etag: etagOf(response) };
});

/** Append to an object, creating it when missing (≤ 1 MiB per call). */
export const appendObject = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  body: Uint8Array | string,
  options: { readonly contentType?: string } & PosixAttributes = {},
) {
  const response = yield* request({
    operation: "AppendObject",
    method: "PUT",
    ref,
    key,
    query: { append: "true" },
    body,
    contentType: options.contentType,
    headers: posixHeaders(options),
  });
  return { etag: etagOf(response) };
});

/** Delete an object. Deleting a missing object succeeds. */
export const deleteObject = Effect.fn(function* (ref: DiskRef, key: string) {
  yield* request({ operation: "DeleteObject", method: "DELETE", ref, key }).pipe(
    Effect.catchTag("NoSuchKey", () => Effect.void),
  );
});

/** Copy an object within the same disk. */
export const copyObject = Effect.fn(function* (ref: DiskRef, sourceKey: string, key: string) {
  const response = yield* request({
    operation: "CopyObject",
    method: "PUT",
    ref,
    key,
    headers: { "x-amz-copy-source": `/${bucketOf(ref)}/${encodeKey(sourceKey)}` },
  });
  return { etag: xmlText(yield* response.text, "ETag") };
});

/** Delete many objects, 1000 per request. Per-key failures are returned, not raised. */
export const deleteObjects = Effect.fn(function* (ref: DiskRef, keys: ReadonlyArray<string>) {
  const deleted: string[] = [];
  const errors: Array<{ readonly key: string; readonly code?: string; readonly message?: string }> =
    [];
  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    const xml = `<?xml version="1.0" encoding="UTF-8"?><Delete>${batch
      .map((key) => `<Object><Key>${encodeXml(key)}</Key></Object>`)
      .join("")}</Delete>`;
    const response = yield* request({
      operation: "DeleteObjects",
      method: "POST",
      ref,
      query: { delete: "" },
      body: xml,
      contentType: "application/xml",
    });
    const text = yield* response.text;
    for (const block of xmlBlocks(text, "Deleted")) {
      const key = xmlText(block, "Key");
      if (key !== undefined) deleted.push(key);
    }
    for (const block of xmlBlocks(text, "Error")) {
      errors.push({
        key: xmlText(block, "Key") ?? "",
        code: xmlText(block, "Code"),
        message: xmlText(block, "Message"),
      });
    }
  }
  return { deleted, errors };
});

/** An object in a listing. */
export interface ObjectSummary {
  readonly key: string;
  readonly size: number;
  readonly etag: string | undefined;
  readonly lastModified: Date | undefined;
}

/** One page of a listing. */
export interface ListObjectsPage {
  readonly objects: ReadonlyArray<ObjectSummary>;
  /** Directory prefixes (non-recursive listings only). */
  readonly commonPrefixes: ReadonlyArray<string>;
  readonly isTruncated: boolean;
  readonly nextContinuationToken: string | undefined;
}

export interface ListObjectsOptions {
  /** List every key under the prefix instead of one directory level. */
  readonly recursive?: boolean;
  readonly continuationToken?: string;
  readonly startAfter?: string;
  readonly maxKeys?: number;
}

/** One page of ListObjectsV2. */
export const listObjectsPage = Effect.fn(function* (
  ref: DiskRef,
  prefix?: string,
  options: ListObjectsOptions = {},
) {
  const response = yield* request({
    operation: "ListObjectsV2",
    method: "GET",
    ref,
    query: {
      "list-type": 2,
      prefix,
      delimiter: options.recursive ? undefined : "/",
      "continuation-token": options.continuationToken,
      "start-after": options.startAfter,
      "max-keys": options.maxKeys,
    },
  });
  const text = yield* response.text;
  return {
    objects: xmlBlocks(text, "Contents").map((block) => {
      const modified = xmlText(block, "LastModified");
      return {
        key: xmlText(block, "Key") ?? "",
        size: Number(xmlText(block, "Size") ?? 0),
        etag: xmlText(block, "ETag"),
        lastModified: modified ? new Date(modified) : undefined,
      };
    }),
    commonPrefixes: xmlBlocks(text, "CommonPrefixes").flatMap((block) => {
      const p = xmlText(block, "Prefix");
      return p === undefined ? [] : [p];
    }),
    isTruncated: xmlText(text, "IsTruncated") === "true",
    nextContinuationToken: xmlText(text, "NextContinuationToken"),
  } satisfies ListObjectsPage;
});

/** Every object under a prefix, as a lazily paginated stream. */
export const listObjects = (
  ref: DiskRef,
  prefix?: string,
  options: Omit<ListObjectsOptions, "continuationToken"> = {},
) =>
  Stream.paginate(undefined as string | undefined, (token) =>
    listObjectsPage(ref, prefix, { ...options, continuationToken: token }).pipe(
      Effect.map(
        (page) =>
          [
            page.objects,
            page.isTruncated && page.nextContinuationToken
              ? (Option.some(page.nextContinuationToken) as Option.Option<string | undefined>)
              : Option.none(),
          ] as const,
      ),
    ),
  );

/** Start a multipart upload. */
export const createMultipartUpload = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  options: { readonly contentType?: string } & PosixAttributes = {},
) {
  const response = yield* request({
    operation: "CreateMultipartUpload",
    method: "POST",
    ref,
    key,
    query: { uploads: "" },
    headers: { "Content-Type": options.contentType, ...posixHeaders(options) },
  });
  const uploadId = xmlText(yield* response.text, "UploadId");
  if (!uploadId) {
    return yield* Effect.fail(
      new ObjectsError({
        operation: "CreateMultipartUpload",
        status: response.status,
        message: "Response has no UploadId",
      }),
    );
  }
  return { key, uploadId };
});

/** Upload one part (≥ 5 MiB except the last; at most 10,000 parts). */
export const uploadPart = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  uploadId: string,
  partNumber: number,
  body: Uint8Array,
) {
  const response = yield* request({
    operation: "UploadPart",
    method: "PUT",
    ref,
    key,
    query: { partNumber, uploadId },
    body,
  });
  return { partNumber, etag: etagOf(response) ?? "" };
});

/** Finish a multipart upload from its parts. */
export const completeMultipartUpload = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  uploadId: string,
  parts: ReadonlyArray<{ readonly partNumber: number; readonly etag: string }>,
) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><CompleteMultipartUpload>${[...parts]
    .sort((a, b) => a.partNumber - b.partNumber)
    .map(
      (part) =>
        `<Part><PartNumber>${part.partNumber}</PartNumber><ETag>${encodeXml(part.etag)}</ETag></Part>`,
    )
    .join("")}</CompleteMultipartUpload>`;
  const response = yield* request({
    operation: "CompleteMultipartUpload",
    method: "POST",
    ref,
    key,
    query: { uploadId },
    body: xml,
    contentType: "application/xml",
  });
  return { etag: xmlText(yield* response.text, "ETag") };
});

/** Abandon a multipart upload and free its parts. */
export const abortMultipartUpload = Effect.fn(function* (
  ref: DiskRef,
  key: string,
  uploadId: string,
) {
  yield* request({
    operation: "AbortMultipartUpload",
    method: "DELETE",
    ref,
    key,
    query: { uploadId },
  }).pipe(Effect.catchTag("NoSuchKey", () => Effect.void));
});

/** Parts uploaded so far for a multipart upload. */
export const listParts = Effect.fn(function* (ref: DiskRef, key: string, uploadId: string) {
  const response = yield* request({
    operation: "ListParts",
    method: "GET",
    ref,
    key,
    query: { uploadId },
  });
  return xmlBlocks(yield* response.text, "Part").map((block) => ({
    partNumber: Number(xmlText(block, "PartNumber") ?? 0),
    etag: xmlText(block, "ETag") ?? "",
    size: Number(xmlText(block, "Size") ?? 0),
  }));
});

/** Multipart uploads in progress on a disk. */
export const listMultipartUploads = Effect.fn(function* (ref: DiskRef, prefix?: string) {
  const response = yield* request({
    operation: "ListMultipartUploads",
    method: "GET",
    ref,
    query: { uploads: "", prefix },
  });
  return xmlBlocks(yield* response.text, "Upload").map((block) => ({
    key: xmlText(block, "Key") ?? "",
    uploadId: xmlText(block, "UploadId") ?? "",
  }));
});
