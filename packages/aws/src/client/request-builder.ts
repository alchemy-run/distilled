/**
 * Request Builder - wraps Protocol and Middleware to build complete requests.
 *
 * This layer:
 * 1. Fills in idempotency tokens with generated UUIDs if not provided
 * 2. Uses the Protocol to serialize the input into a Request
 * 3. Applies middleware (checksums, streaming body handling)
 * 4. Adds common headers
 *
 * This is independently testable without making HTTP requests.
 */

import * as Effect from "effect/Effect";
import { applyHttpChecksum } from "../middleware/checksum.ts";
import { makeStreamingBodyMiddleware } from "../middleware/streaming-body.ts";
import {
  fillIdempotencyTokens,
  findIdempotencyTokenProps,
} from "./generate-idempotency-tokens.ts";
import type { Operation } from "./operation.ts";
import type { Protocol, ProtocolHandler } from "./protocol.ts";

export interface RequestBuilderOptions {
  /** Override the service's protocol. */
  protocol?: Protocol;
}

/**
 * Create a request builder for a given operation. Per-operation preprocessing
 * runs once at creation time.
 */
export const makeRequestBuilder = (
  operation: Operation,
  options?: RequestBuilderOptions,
) => {
  const { descriptor } = operation;
  const protocolFactory = options?.protocol ?? descriptor.service.protocol;
  const protocol: ProtocolHandler = protocolFactory(operation);
  const applyStreamingBody = makeStreamingBodyMiddleware(descriptor.input);
  const idempotencyTokenProps = findIdempotencyTokenProps(descriptor.input);

  return Effect.fn(function* (input: unknown) {
    const filledInput = fillIdempotencyTokens(input, idempotencyTokenProps);

    let request = yield* protocol.serializeRequest(filledInput);

    if (descriptor.checksum !== undefined) {
      request = yield* applyHttpChecksum(descriptor.checksum, request);
    }

    // Buffers streaming bodies without Content-Length to compute the length
    request = yield* applyStreamingBody(request);

    return {
      ...request,
      headers: {
        ...request.headers,
        "User-Agent": "distilled-aws/1.0",
      },
    };
  });
};
