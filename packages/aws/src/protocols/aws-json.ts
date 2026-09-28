/**
 * AWS JSON Protocol Implementation (shared between 1.0 and 1.1)
 *
 * https://smithy.io/2.0/aws/protocols/aws-json-1_0-protocol.html
 * https://smithy.io/2.0/aws/protocols/aws-json-1_1-protocol.html
 *
 * Key characteristics:
 * - All requests are POST to "/" with JSON body
 * - X-Amz-Target header: {ServiceName}.{OperationName}
 * - HTTP binding traits are ignored
 * - Default timestamp format is epoch-seconds
 *
 * Differences between 1.0 and 1.1:
 * - Content-Type: application/x-amz-json-1.0 vs application/x-amz-json-1.1
 * - Error serialization: 1.0 uses full shape-id, 1.1 uses shape name only
 *   (clients must accept either format for both protocols)
 */

import * as Effect from "effect/Effect";
import { decodeJson, encodeJson } from "@distilled.cloud/core/shape";
import type { Operation } from "../client/operation.ts";
import type { Protocol, ProtocolHandler } from "../client/protocol.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import { ParseError } from "../errors.ts";
import { parseEventStreamToUnion } from "../eventstream/parser.ts";
import {
  extractJsonErrorCode,
  extractJsonErrorData,
  sanitizeErrorCode,
} from "../util/error.ts";
import { readStreamAsText } from "../util/stream.ts";
import { eventDecoder, findStreamingMember } from "./events.ts";

/** AWS JSON 1.0 Protocol */
export const awsJson1_0Protocol = createAwsJsonProtocol("1.0");

/** AWS JSON 1.1 Protocol */
export const awsJson1_1Protocol = createAwsJsonProtocol("1.1");

/** JSON.parse reviver: AWS returns null for absent fields. */
const dropNull = (_: string, v: unknown) => (v === null ? undefined : v);

function createAwsJsonProtocol(version: "1.0" | "1.1"): Protocol {
  const contentType = `application/x-amz-json-${version}`;

  return (operation: Operation): ProtocolHandler => {
    const { descriptor, operationName } = operation;
    // Per the Smithy spec, X-Amz-Target is the service shape name joined
    // to the operation shape name (e.g. TrentService.CreateKey).
    const targetHeader = `${descriptor.service.target}.${operationName}`;
    const streaming = findStreamingMember(descriptor.output);

    return {
      serializeRequest: Effect.fn(function* (input: unknown) {
        const request: Request = {
          method: "POST",
          path: "/",
          query: {},
          headers: {
            "Content-Type": contentType,
            "X-Amz-Target": targetHeader,
          },
        };
        request.body = JSON.stringify(
          encodeJson(input, descriptor.input, "epoch-seconds") ?? {},
        );
        return request;
      }),

      deserializeResponse: Effect.fn(function* (response: Response) {
        if (streaming && response.body) {
          if (streaming.events) {
            return {
              [streaming.name]: parseEventStreamToUnion(
                response.body as ReadableStream<Uint8Array>,
                undefined,
                eventDecoder(streaming.events),
              ),
            };
          }
          return { [streaming.name]: response.body };
        }

        const bodyText = yield* readStreamAsText(response.body);
        if (bodyText) {
          try {
            const parsed = JSON.parse(bodyText, dropNull);
            if (parsed && typeof parsed === "object") {
              return decodeJson(parsed, descriptor.output) as Record<
                string,
                unknown
              >;
            }
          } catch {
            return yield* new ParseError({
              message: `Failed to parse JSON body: ${bodyText}`,
            });
          }
        }
        return {};
      }),

      deserializeError: Effect.fn(function* (response: Response) {
        const bodyText = yield* readStreamAsText(response.body);
        let body: Record<string, unknown> = {};
        if (bodyText) {
          try {
            const parsed = JSON.parse(bodyText, dropNull);
            if (parsed && typeof parsed === "object") {
              body = parsed as Record<string, unknown>;
            }
          } catch {
            return yield* new ParseError({
              message: `Failed to parse error JSON body: ${bodyText}`,
            });
          }
        }

        // X-Amzn-Errortype first (Smithy), then the Coral X-Amz-Errortype
        // spelling, then body fields.
        const rawErrorCode =
          response.headers["x-amzn-errortype"] ??
          response.headers["X-Amzn-Errortype"] ??
          response.headers["x-amz-errortype"] ??
          response.headers["X-Amz-Errortype"] ??
          extractJsonErrorCode(body);

        if (!rawErrorCode) {
          return yield* new ParseError({
            message: `No error code found in response. Headers: ${JSON.stringify(response.headers)}, Body: ${bodyText}`,
          });
        }

        return {
          errorCode: sanitizeErrorCode(rawErrorCode),
          data: extractJsonErrorData(body),
        };
      }),
    };
  };
}
