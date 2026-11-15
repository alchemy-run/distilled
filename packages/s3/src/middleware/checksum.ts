import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import type * as S from "effect/Schema";
import * as Stream from "effect/Stream";
// `#crc32`, `#md5`, `#utf8`: Node builds and browser builds differ (package.json `imports`).
import { getCrc32ChecksumAlgorithmFunction } from "#crc32";
import { getMd5ChecksumAlgorithmFunction } from "#md5";
import { toUint8Array } from "#utf8";
import type { Request as ProtocolRequest } from "../client/request.ts";
import type { Checksum } from "../hash/checksum.ts";
import { getAwsProtocolsHttpChecksum } from "../traits.ts";
import { toBase64 } from "../util/base64.ts";
import { bodyStream, isStreamBody, minChunkSize, type StreamBody } from "../util/stream.ts";

export type SourceData = string | ArrayBuffer | ArrayBufferView;

export interface ChecksumConstructor {
  new (secret?: SourceData): Checksum;
}

/** The checksum of a buffered body. */
export const stringHasher = (
  checksumAlgorithmFn: ChecksumConstructor,
  body: string | Uint8Array,
): Uint8Array => {
  const hash = new checksumAlgorithmFn();
  hash.update(toUint8Array(body));
  return hash.digest();
};

// Minimum chunk size for S3 aws-chunked encoding (8KB, except for the last chunk)
const MIN_CHUNK_SIZE = 8 * 1024;
/**
 * Apply checksum to a protocol Request based on schema annotations.
 * Uses the aws.protocols#httpChecksum trait to determine checksum requirements.
 *
 * For streaming bodies, uses aws-chunked encoding with trailing checksum.
 * For non-streaming bodies, computes checksum directly and adds header.
 *
 * @param schema - The request schema with checksum annotations
 * @param request - The protocol request to add checksum to
 * @returns Effect that produces the request with checksum header added
 */
export const applyHttpChecksum = (
  schema: S.Top,
  request: ProtocolRequest,
): Effect.Effect<ProtocolRequest, InvalidInput> =>
  Effect.gen(function* () {
    const checksumTrait = getAwsProtocolsHttpChecksum(schema.ast);

    // No checksum trait - return request as-is
    if (!checksumTrait) {
      return request;
    }

    const body = request.body;

    // No body - skip
    if (!body) {
      return request;
    }

    // Check if checksum is required or if algorithm was specified
    const algorithmHeader = checksumTrait.requestAlgorithmMember
      ? `x-amz-sdk-checksum-algorithm`
      : undefined;
    const specifiedAlgorithm = algorithmHeader
      ? request.headers[algorithmHeader]?.toLowerCase()
      : undefined;

    // If checksum not required and no algorithm specified, skip
    if (!checksumTrait.requestChecksumRequired && !specifiedAlgorithm) {
      return request;
    }

    // Determine algorithm: use specified, or default to CRC32 for streaming, MD5 for non-streaming
    const isStreaming = isStreamBody(body);
    const algorithm = specifiedAlgorithm ?? (isStreaming ? "crc32" : "md5");
    const checksumHeader = algorithm === "md5" ? "Content-MD5" : `x-amz-checksum-${algorithm}`;

    // Skip if checksum header already provided
    if (request.headers[checksumHeader] || request.headers[checksumHeader.toLowerCase()]) {
      return request;
    }

    // Get the hasher
    let hasher: ChecksumConstructor;
    if (algorithm === "crc32") {
      hasher = getCrc32ChecksumAlgorithmFunction();
    } else if (algorithm === "md5") {
      hasher = getMd5ChecksumAlgorithmFunction();
    } else {
      // Unsupported algorithm - skip checksum
      return request;
    }

    // Handle streaming body with aws-chunked encoding
    if (isStreaming) {
      // Create aws-chunked encoded stream with trailing checksum
      const chunkedBody = createAwsChunkedStream(body, hasher, checksumHeader);

      const contentLength = request.headers["Content-Length"] || request.headers["content-length"];

      // Remove Content-Length as it's now chunked
      const {
        "Content-Length": _cl,
        "content-length": _cl2,
        ...headersWithoutContentLength
      } = request.headers;

      return {
        ...request,
        body: chunkedBody,
        headers: {
          ...headersWithoutContentLength,
          "Content-Encoding": request.headers["Content-Encoding"]
            ? `${request.headers["Content-Encoding"]},aws-chunked`
            : "aws-chunked",
          "x-amz-decoded-content-length": contentLength,
          "x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER",
          "x-amz-trailer": checksumHeader,
        },
      };
    }

    // Non-streaming: compute checksum directly
    const checksum = toBase64(stringHasher(hasher, body));

    return {
      ...request,
      headers: {
        ...request.headers,
        [checksumHeader]: checksum,
      },
    };
  });

/**
 * Create an aws-chunked encoded stream with trailing checksum, its chunks
 * joined to S3's 8KB minimum. It runs in the fiber that sends the request,
 * with a fresh hash each run (a retried request re-runs it).
 * Format: <chunk-size-hex>\r\n<chunk-data>\r\n...0\r\n<trailer>\r\n\r\n
 *
 * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-streaming.html
 */
export const createAwsChunkedStream = (
  source: StreamBody,
  checksumAlgorithmFn: ChecksumConstructor,
  checksumLocationName: string,
): Stream.Stream<Uint8Array, unknown> =>
  Stream.suspend(() => {
    const hash = new checksumAlgorithmFn();
    const encoder = new TextEncoder();
    const trailer = Stream.sync(() =>
      encoder.encode(`0\r\n${checksumLocationName}:${toBase64(hash.digest())}\r\n\r\n`),
    );
    return bodyStream(source).pipe(
      minChunkSize(MIN_CHUNK_SIZE),
      Stream.map((chunk) => {
        hash.update(chunk);
        // <hex-size>\r\n<data>\r\n
        const header = encoder.encode(`${chunk.byteLength.toString(16)}\r\n`);
        const framed = new Uint8Array(header.length + chunk.length + 2);
        framed.set(header, 0);
        framed.set(chunk, header.length);
        framed.set(CRLF, header.length + chunk.length);
        return framed;
      }),
      Stream.concat(trailer),
    );
  });

const CRLF = /*@__PURE__*/ new TextEncoder().encode("\r\n");
