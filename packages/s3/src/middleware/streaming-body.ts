/**
 * Streaming Body Middleware
 *
 * Handles streaming bodies that don't have Content-Length by buffering
 * the stream and computing the Content-Length.
 *
 * Note: While HTTP supports Transfer-Encoding: chunked, many AWS services
 * (including S3 PutObject) don't support it. Buffering ensures compatibility
 * with all services.
 *
 * @see https://smithy.io/2.0/spec/streaming.html#requireslength-trait
 */

import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import type * as S from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import * as Stream from "effect/Stream";
import type { Request as ProtocolRequest } from "../client/request.ts";
import {
  hasHttpPayload,
  hasRequiresLength,
  isInputEventStream,
  isStreamingType,
} from "../traits.ts";
import { bodyStream, isStreamBody, type StreamBody } from "../util/stream.ts";

/**
 * Info about the streaming payload in a schema.
 * Pre-computed once during middleware creation.
 */
interface StreamingPayloadInfo {
  hasStreamingPayload: boolean;
  isEventStream: boolean;
  requiresLength: boolean;
}

/**
 * Create a streaming body middleware for a given schema.
 *
 * The expensive schema analysis is done once at creation time.
 * Returns a function that processes requests.
 *
 * @param schema - The request schema with streaming annotations
 * @returns A function that applies streaming body handling to requests
 */
export const makeStreamingBodyMiddleware = (schema: S.Top) => {
  // Pre-compute streaming payload info (done once)
  const info = getStreamingPayloadInfo(schema.ast);

  // Return the request processor function
  return (request: ProtocolRequest): Effect.Effect<ProtocolRequest, InvalidInput> =>
    Effect.gen(function* () {
      const body = request.body;

      // No body or not a streaming body - pass through
      if (!isStreamBody(body)) {
        return request;
      }

      // Schema doesn't have a streaming payload - pass through
      if (!info.hasStreamingPayload) {
        return request;
      }

      // Event streams (like Transcribe AudioStream) use their own encoding
      // and should not be buffered - they handle their own framing
      if (info.isEventStream) {
        return request;
      }

      // Check if Content-Length is already provided
      const hasContentLength = Object.keys(request.headers).some(
        (k) => k.toLowerCase() === "content-length",
      );

      // Also check for x-amz-decoded-content-length (used in aws-chunked encoding)
      const hasDecodedContentLength = Object.keys(request.headers).some(
        (k) => k.toLowerCase() === "x-amz-decoded-content-length",
      );

      // If Content-Length is provided, stream optimally - no action needed
      if (hasContentLength || hasDecodedContentLength) {
        return request;
      }

      // Content-Length not provided - buffer and compute it
      // Note: While HTTP supports Transfer-Encoding: chunked, many AWS services
      // don't support it (e.g., S3 PutObject, aws-query protocol).
      // The only reliable approach is to buffer and provide Content-Length.
      // For very large streams, users should use multipart upload instead.
      const bufferedBody = yield* bufferStream(body);
      return {
        ...request,
        body: bufferedBody,
        headers: {
          ...request.headers,
          "Content-Length": String(bufferedBody.byteLength),
        },
      };
    });
};

/** Read a streaming body into bytes, in the calling fiber. */
const bufferStream = (stream: StreamBody): Effect.Effect<Uint8Array, InvalidInput> =>
  Stream.mkUint8Array(bodyStream(stream)).pipe(
    Effect.mapError(
      (cause) =>
        new InvalidInput({
          member: "body",
          message: `the request body could not be read: ${cause instanceof Error ? cause.message : String(cause)}`,
        }),
    ),
  );

/**
 * Check if an AST is an event stream, handling Union wrappers (from S.optional).
 */
const checkIsEventStream = (ast: AST.AST): boolean => {
  if (isInputEventStream(ast)) return true;

  // Handle S.optional() wrapping - check union members
  if (ast._tag === "Union") {
    for (const member of (ast as AST.Union).types) {
      if (member._tag === "Undefined") continue;
      if (isInputEventStream(member)) return true;
    }
  }

  return false;
};

/**
 * Get streaming payload info from an AST.
 * Returns whether the schema has a streaming payload, if it's an event stream,
 * and if it requires length.
 */
export const getStreamingPayloadInfo = (ast: AST.AST): StreamingPayloadInfo => {
  // For Suspend (S.suspend), unwrap and recurse
  if (ast._tag === "Suspend") {
    return getStreamingPayloadInfo(ast.thunk());
  }

  // For Objects (struct), check property signatures
  if (ast._tag === "Objects") {
    for (const prop of ast.propertySignatures) {
      if (hasHttpPayload(prop) && isStreamingType(prop.type)) {
        return {
          hasStreamingPayload: true,
          isEventStream: checkIsEventStream(prop.type),
          requiresLength: hasRequiresLength(prop.type),
        };
      }
    }
  }

  // For Declaration (S.Class), check via encoding chain
  if (ast._tag === "Declaration" && ast.encoding?.length) {
    return getStreamingPayloadInfo(ast.encoding[0].to);
  }

  // Follow encoding chain for other transformed types
  if (ast.encoding && ast.encoding.length > 0) {
    return getStreamingPayloadInfo(ast.encoding[0].to);
  }

  return {
    hasStreamingPayload: false,
    isEventStream: false,
    requiresLength: false,
  };
};
