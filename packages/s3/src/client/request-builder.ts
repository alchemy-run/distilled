/**
 * Request Builder - wraps Protocol and Middleware to build complete requests.
 *
 * This layer:
 * 1. Fills in idempotency tokens with generated UUIDs if not provided
 * 2. Uses the Protocol to serialize the input into a Request
 * 3. Applies middleware (e.g., checksum computation, streaming body handling)
 * 4. Adds common headers
 *
 * This is independently testable without making HTTP requests.
 */

import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import type { ParseError } from "../errors.ts";
import {
  getStreamingPayloadInfo,
  makeStreamingBodyMiddleware,
} from "../middleware/streaming-body.ts";
import { getMiddleware } from "../traits.ts";
import { fillIdempotencyTokens, findIdempotencyTokenProps } from "./generate-idempotency-tokens.ts";
import type { Operation } from "./operation.ts";
import { serializeEffect, type ProtocolHandler } from "./protocol.ts";
import type { Request } from "./request.ts";

/**
 * Create a request builder for a given operation and its (loaded) protocol
 * handler: fills idempotency tokens, serializes, applies middleware
 * (checksums, streaming bodies) and adds the common headers.
 *
 * Operations without middleware or a streaming payload build the request
 * synchronously: the builder returns it directly, returns a failed effect
 * for a path label that would address another resource, and throws the
 * `ParseError` of an input that does not match the schema. Other
 * operations return an effect.
 */
export const makeRequestBuilder = (
  operation: Operation,
  protocol: ProtocolHandler,
): ((input: unknown) => Request | Effect.Effect<Request, ParseError | InvalidInput>) => {
  const inputSchema = operation.input;
  const middleware = getMiddleware(inputSchema.ast);
  const idempotencyTokenProps = findIdempotencyTokenProps(inputSchema);
  const serialize = (input: unknown) =>
    protocol.serialize(fillIdempotencyTokens(input, idempotencyTokenProps));
  if (!middleware.length && !getStreamingPayloadInfo(inputSchema.ast).hasStreamingPayload) {
    return (input) => {
      const request = serialize(input);
      return request instanceof InvalidInput ? Effect.fail(request) : withUserAgent(request);
    };
  }

  // Buffers streaming bodies without Content-Length to compute the length
  const applyStreamingBody = makeStreamingBodyMiddleware(inputSchema);
  return Effect.fnUntraced(function* (input: unknown) {
    let request = yield* serializeEffect(serialize)(input);
    // Apply annotation-based middleware (e.g., checksum)
    for (const mw of middleware) {
      request = yield* mw(inputSchema, request);
    }
    return withUserAgent(yield* applyStreamingBody(request));
  });
};

/** Add the common headers. */
const withUserAgent = (request: Request): Request => ({
  ...request,
  headers: { ...request.headers, "User-Agent": "distilled-aws/1.0" },
});
