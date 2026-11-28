/**
 * Upload a body of any size to S3 without holding it in memory, as the AWS
 * SDK's `Upload` (`@aws-sdk/lib-storage`) does.
 *
 * The body is cut into parts of `partSize` bytes (5 MiB by default), and up
 * to `queueSize` parts (4 by default) upload at a time, so the upload holds
 * about `partSize * (queueSize + 2)` bytes whatever the body's size. Each
 * part is plain bytes with a known length, so a failed part retries and
 * every HttpClient sends it with its `Content-Length`. A body that fits in
 * one part goes out as one `PutObject`.
 */
import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Stream from "effect/Stream";
import type { Credentials } from "./credentials.ts";
import type { RegionInput } from "./region.ts";
import {
  abortMultipartUpload,
  type CompletedPart,
  completeMultipartUpload,
  type CompleteMultipartUploadError,
  type CompleteMultipartUploadOutput,
  createMultipartUpload,
  type CreateMultipartUploadError,
  putObject,
  type PutObjectError,
  type PutObjectOutput,
  type PutObjectRequest,
  uploadPart,
  type UploadPartError,
} from "./services/s3.ts";

/** S3's smallest part, except the last. */
const MIN_PART_SIZE = 5 * 1024 * 1024;
/** S3's most parts in one upload. */
const MAX_PARTS = 10_000;

/** The body of an {@link upload}. A stream is read once, part by part. */
export type UploadBody =
  | string
  | Uint8Array<ArrayBufferLike>
  | ArrayBuffer
  | globalThis.Blob
  | ReadableStream<Uint8Array<ArrayBufferLike>>
  | Stream.Stream<Uint8Array<ArrayBufferLike>, unknown>;

/**
 * The input of an {@link upload}: a `PutObject` request without the members
 * that describe the whole body at once (its length, MD5, checksum values
 * and write offset), which a multipart upload cannot send.
 */
export type UploadInput = Omit<
  PutObjectRequest,
  | "Body"
  | "ContentLength"
  | "ContentMD5"
  | "WriteOffsetBytes"
  | "ChecksumCRC32"
  | "ChecksumCRC32C"
  | "ChecksumCRC64NVME"
  | "ChecksumSHA1"
  | "ChecksumSHA256"
  | "ChecksumSHA512"
  | "ChecksumMD5"
  | "ChecksumXXHASH64"
  | "ChecksumXXHASH3"
  | "ChecksumXXHASH128"
> &
  RegionInput & { readonly Body: UploadBody };

export interface UploadOptions {
  /**
   * Bytes per part. At least 5 MiB; raised when a body of known size would
   * need more than 10,000 parts.
   * @default 5 MiB
   */
  readonly partSize?: number;
  /**
   * Parts that upload at a time.
   * @default 4
   */
  readonly queueSize?: number;
}

/** The `PutObject` output of a one-part upload, or the multipart upload's. */
export type UploadOutput = PutObjectOutput | CompleteMultipartUploadOutput;

export type UploadError =
  | PutObjectError
  | CreateMultipartUploadError
  | UploadPartError
  | CompleteMultipartUploadError
  | InvalidInput;

/** The body's size in bytes, when it is known before it is read. */
const sizeOf = (body: UploadBody): number | undefined => {
  if (typeof body === "string") return new TextEncoder().encode(body).byteLength;
  if (body instanceof Uint8Array || body instanceof ArrayBuffer) return body.byteLength;
  if (typeof globalThis.Blob !== "undefined" && body instanceof globalThis.Blob) return body.size;
  return undefined;
};

const unreadable = (cause: unknown) =>
  new InvalidInput({
    member: "Body",
    message: `the upload body could not be read: ${cause instanceof Error ? cause.message : String(cause)}`,
  });

/** The body as a stream of bytes, read once. */
const streamOf = (body: UploadBody): Stream.Stream<Uint8Array, InvalidInput> => {
  if (typeof body === "string") return Stream.make(new TextEncoder().encode(body));
  if (body instanceof Uint8Array) return Stream.make(body);
  if (body instanceof ArrayBuffer) return Stream.make(new Uint8Array(body));
  if (body instanceof ReadableStream) {
    return Stream.fromReadableStream({ evaluate: () => body, onError: unreadable });
  }
  if (Stream.isStream(body)) return Stream.mapError(body, unreadable);
  return Stream.fromReadableStream({ evaluate: () => body.stream(), onError: unreadable });
};

interface Part {
  readonly number: number;
  readonly bytes: Uint8Array;
  readonly last: boolean;
}

const concat = (chunks: ReadonlyArray<Uint8Array>, size: number): Uint8Array => {
  if (chunks.length === 1 && chunks[0]!.byteLength === size) return chunks[0]!;
  const out = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
};

/**
 * `stream` cut into parts of exactly `partSize` bytes (the last can be
 * smaller), numbered from 1. A part is held back until the next one starts,
 * so the last part is known to be last.
 */
const partsOf = (
  stream: Stream.Stream<Uint8Array, InvalidInput>,
  partSize: number,
): Stream.Stream<Part, InvalidInput> => {
  interface State {
    chunks: Uint8Array[];
    size: number;
    held: Uint8Array | undefined;
    count: number;
  }
  const emitHeld = (state: State, out: Part[]) => {
    if (state.held !== undefined)
      out.push({ number: ++state.count, bytes: state.held, last: false });
  };
  return Stream.mapAccum(
    stream,
    (): State => ({ chunks: [], size: 0, held: undefined, count: 0 }),
    (state, chunk) => {
      const out: Part[] = [];
      let rest = chunk;
      while (rest.byteLength > 0) {
        const take = Math.min(partSize - state.size, rest.byteLength);
        state.chunks.push(rest.subarray(0, take));
        state.size += take;
        rest = rest.subarray(take);
        if (state.size === partSize) {
          emitHeld(state, out);
          state.held = concat(state.chunks, partSize);
          state.chunks = [];
          state.size = 0;
        }
      }
      return [state, out];
    },
    {
      onHalt: (state) => {
        const out: Part[] = [];
        if (state.size > 0) {
          emitHeld(state, out);
          out.push({
            number: ++state.count,
            bytes: concat(state.chunks, state.size),
            last: true,
          });
        } else if (state.held !== undefined) {
          out.push({ number: ++state.count, bytes: state.held, last: true });
        } else {
          // An empty body is one empty part.
          out.push({ number: 1, bytes: new Uint8Array(0), last: true });
        }
        return out;
      },
    },
  );
};

/**
 * Upload `input.Body` to `input.Bucket` / `input.Key` in parts, without
 * holding the whole body in memory.
 *
 * On a failure after the multipart upload started, the upload is aborted
 * so S3 keeps no parts, and the call fails with the first error.
 *
 * @example
 * ```ts
 * import { upload } from "@distilled.cloud/s3/Upload";
 *
 * yield* upload({ Bucket: "my-bucket", Key: "video.mp4", Body: response.body!, ContentType: "video/mp4" });
 * ```
 */
export const upload = (
  input: UploadInput,
  options?: UploadOptions,
): Effect.Effect<UploadOutput, UploadError, Credentials | HttpClient.HttpClient> =>
  Effect.suspend(() => {
    const { Body, IfMatch, IfNoneMatch, ...rest } = input;
    const queueSize = options?.queueSize ?? 4;
    if (!Number.isInteger(queueSize) || queueSize < 1) {
      return Effect.fail(
        new InvalidInput({ member: "queueSize", message: "queueSize must be a whole number >= 1" }),
      );
    }
    if (options?.partSize !== undefined && !(options.partSize >= MIN_PART_SIZE)) {
      return Effect.fail(
        new InvalidInput({
          member: "partSize",
          message: `partSize must be at least ${MIN_PART_SIZE} bytes`,
        }),
      );
    }
    const size = sizeOf(Body);
    const partSize = Math.max(
      Math.floor(options?.partSize ?? MIN_PART_SIZE),
      size === undefined ? 0 : Math.ceil(size / MAX_PARTS),
    );
    // Members every part and the completion repeat.
    const shared = {
      Bucket: input.Bucket,
      Key: input.Key,
      SSECustomerAlgorithm: input.SSECustomerAlgorithm,
      SSECustomerKey: input.SSECustomerKey,
      SSECustomerKeyMD5: input.SSECustomerKeyMD5,
      RequestPayer: input.RequestPayer,
      ExpectedBucketOwner: input.ExpectedBucketOwner,
      region: input.region,
    };
    let uploadId: string | undefined;

    return Effect.flatMap(
      Effect.cached(
        Effect.flatMap(createMultipartUpload(rest), (created) => {
          if (created.UploadId === undefined) {
            return Effect.fail(
              new InvalidInput({
                member: "UploadId",
                message: "CreateMultipartUpload returned no UploadId",
              }),
            );
          }
          uploadId = created.UploadId;
          return Effect.succeed(created.UploadId);
        }),
      ),
      (startUpload) => {
        const send = (
          part: Part,
        ): Effect.Effect<
          CompletedPart | UploadOutput,
          UploadError,
          Credentials | HttpClient.HttpClient
        > => {
          if (part.number > MAX_PARTS) {
            return Effect.fail(
              new InvalidInput({
                member: "Body",
                message: `the body needs more than ${MAX_PARTS} parts of ${partSize} bytes; raise partSize`,
              }),
            );
          }
          if (part.number === 1 && part.last) {
            return putObject({ ...rest, IfMatch, IfNoneMatch, Body: part.bytes });
          }
          return Effect.flatMap(startUpload, (UploadId) =>
            Effect.map(
              uploadPart({
                ...shared,
                UploadId,
                PartNumber: part.number,
                Body: part.bytes,
                ChecksumAlgorithm: input.ChecksumAlgorithm,
              }),
              // S3 wants the parts' checksums back only when the upload
              // was created with a checksum algorithm.
              (out): CompletedPart =>
                input.ChecksumAlgorithm === undefined
                  ? { PartNumber: part.number, ETag: out.ETag }
                  : {
                      PartNumber: part.number,
                      ETag: out.ETag,
                      ChecksumCRC32: out.ChecksumCRC32,
                      ChecksumCRC32C: out.ChecksumCRC32C,
                      ChecksumCRC64NVME: out.ChecksumCRC64NVME,
                      ChecksumSHA1: out.ChecksumSHA1,
                      ChecksumSHA256: out.ChecksumSHA256,
                    },
            ),
          );
        };

        const run = Effect.flatMap(
          Stream.runCollect(
            Stream.mapEffect(partsOf(streamOf(Body), partSize), send, { concurrency: queueSize }),
          ),
          (results) => {
            if (uploadId === undefined) return Effect.succeed(results[0] as UploadOutput);
            const Parts = (results as CompletedPart[]).sort(
              (a, b) => (a.PartNumber ?? 0) - (b.PartNumber ?? 0),
            );
            return completeMultipartUpload({
              ...shared,
              UploadId: uploadId,
              MultipartUpload: { Parts },
              IfMatch,
              IfNoneMatch,
            });
          },
        );
        // A started upload that fails is aborted, so S3 keeps no parts. The
        // call fails with its own error; an abort that fails too leaves the
        // parts to the bucket's lifecycle rules.
        return Effect.onError(run, () =>
          uploadId === undefined
            ? Effect.void
            : Effect.ignore(abortMultipartUpload({ ...shared, UploadId: uploadId })),
        );
      },
    );
  });
