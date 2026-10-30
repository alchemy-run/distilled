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
 * - jsonName trait for custom property names
 *
 * Differences between 1.0 and 1.1:
 * - Content-Type: application/x-amz-json-1.0 vs application/x-amz-json-1.1
 * - Error serialization: 1.0 uses full shape-id, 1.1 uses shape name only
 *   (clients must accept either format for both protocols)
 */

import * as Effect from "effect/Effect";
import type * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import type { Operation } from "../client/operation.ts";
import {
  Unreadable,
  type ProtocolImpl,
  type ProtocolHandler,
  type TextResponse,
} from "../client/protocol.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import { ParseError } from "../errors.ts";
import {
  getAwsApiService,
  getEventSchema,
  isOutputEventStream,
  isStreamingType,
  eventStreamWith,
} from "../traits.ts";
import { getEncodedPropertySignatures, getIdentifier } from "../util/ast.ts";
import { errorBody, inputEncoderSync, outputBody } from "../util/codec.ts";
import { extractJsonErrorCode, extractJsonErrorData, sanitizeErrorCode } from "../util/error.ts";
import { readStreamAsText } from "../util/stream.ts";

/** AWS JSON 1.0 Protocol */
export const awsJson1_0Protocol = /*@__PURE__*/ createAwsJsonProtocol("1.0");

/** AWS JSON 1.1 Protocol */
export const awsJson1_1Protocol = /*@__PURE__*/ createAwsJsonProtocol("1.1");

/**
 * Create an AWS JSON protocol handler for the specified version.
 */
function createAwsJsonProtocol(version: "1.0" | "1.1"): ProtocolImpl {
  const contentType = `application/x-amz-json-${version}`;

  return (operation: Operation): ProtocolHandler => {
    const inputSchema = operation.input;
    const outputSchema = operation.output;
    const inputAst = inputSchema.ast;
    const outputAst = outputSchema.ast;

    // Pre-compute encoder (done once at init)
    const encodeInput = inputEncoderSync(inputAst as any);

    // Prefer the explicit operation name emitted by the generator; fall back
    // to extracting it from the input schema's identifier by removing the
    // "Request", "Input", or "Message" suffix. RDS-family query services
    // (RDS, ElastiCache, Redshift, ...) name their input shapes "XxxMessage"
    // rather than "XxxRequest".
    const identifier = getIdentifier(inputAst) ?? "";
    const operationName =
      operation.operationName ?? identifier.replace(/(?:Request|Input|Message)$/, "");

    // Build X-Amz-Target from the identifier structure
    const targetHeader = buildXAmzTarget(inputAst, operationName);

    // Check for streaming output member (event stream)
    let streamingOutputProp:
      | {
          name: string;
          isEventStream: boolean;
          eventSchema?: Schema.Schema<unknown>;
        }
      | undefined;
    for (const prop of getEncodedPropertySignatures(outputAst)) {
      if (isStreamingType(prop.type)) {
        const isEventStream = isOutputEventStream(prop.type);
        streamingOutputProp = {
          name: String(prop.name),
          isEventStream,
          eventSchema: isEventStream ? getEventSchema(prop.type) : undefined,
        };
        break;
      }
    }

    const serialize = (input: unknown): Request => {
      // Encode the input via schema - handles all transformations
      const encoded = encodeInput(input);

      const request: Request = {
        method: "POST",
        path: "/",
        query: {},
        headers: {
          "Content-Type": contentType,
          "X-Amz-Target": targetHeader,
        },
      };

      request.body = JSON.stringify(encoded ?? {});

      return request;
    };

    const deserializeText = (response: TextResponse): unknown => {
      const bodyText = response.body;
      // Parse JSON body (reviver converts null -> undefined since AWS returns null for absent fields)
      if (bodyText) {
        try {
          const parsed = JSON.parse(bodyText, (_, v) => (v === null ? undefined : v));
          if (parsed && typeof parsed === "object") {
            return parsed as Record<string, unknown>;
          }
        } catch {
          // Lenient mode returns the body as read.
          return new Unreadable(
            new ParseError({
              message: `Failed to parse JSON body: ${outputBody(operation, bodyText)}`,
            }),
            bodyText,
          );
        }
      }
      return {};
    };

    return {
      serialize,
      deserializeText,

      deserializeStream: (response) => {
        // Handle streaming output (event stream)
        if (!streamingOutputProp || !response.body) return undefined;
        if (streamingOutputProp.isEventStream) {
          // Parse event stream to typed union events, decoded through the
          // event schema so blob/timestamp members match the generated types
          return Effect.succeed({
            [streamingOutputProp.name]: eventStreamWith(streamingOutputProp.eventSchema, (codec) =>
              codec.parseEventStreamToUnion(
                response.body as ReadableStream<Uint8Array>,
                undefined,
                streamingOutputProp.eventSchema,
              ),
            ),
          });
        }
        // Raw streaming output (shouldn't happen for awsJson, but handle it)
        return Effect.succeed({ [streamingOutputProp.name]: response.body });
      },

      deserializeError: Effect.fnUntraced(function* (response: Response) {
        // Read body as text
        const bodyText = yield* readStreamAsText(response.body);

        // Parse JSON body (reviver converts null -> undefined)
        let body: Record<string, unknown> = {};
        if (bodyText) {
          try {
            const parsed = JSON.parse(bodyText, (_, v) => (v === null ? undefined : v));
            if (parsed && typeof parsed === "object") {
              body = parsed as Record<string, unknown>;
            }
          } catch {
            return yield* new ParseError({
              message: `Failed to parse error JSON body: ${errorBody(operation, bodyText)}`,
            });
          }
        }

        // Extract error code: X-Amzn-Errortype first (Smithy), then the
        // Coral X-Amz-Errortype spelling, then body fields.
        const rawErrorCode =
          response.headers["x-amzn-errortype"] ??
          response.headers["X-Amzn-Errortype"] ??
          response.headers["x-amz-errortype"] ??
          response.headers["X-Amz-Errortype"] ??
          extractJsonErrorCode(body);

        if (!rawErrorCode) {
          return yield* new ParseError({
            message: `No error code found in response. Headers: ${JSON.stringify(response.headers)}, Body: ${errorBody(operation, bodyText)}`,
          });
        }

        // Sanitize the error code
        const errorCode = sanitizeErrorCode(rawErrorCode);

        // Extract data (remove __type and code fields)
        const data = extractJsonErrorData(body);

        return { errorCode, data };
      }),
    };
  };
}

/**
 * Build the X-Amz-Target header value.
 * Format: ServiceShapeName.OperationName
 * Example: TrentService.CreateKey, AWSStepFunctions.CreateStateMachine
 *
 * Per the Smithy spec, the X-Amz-Target is the service's shape name joined
 * to the operation's shape name with a period.
 * @see https://smithy.io/2.0/aws/protocols/aws-json-1_1-protocol.html
 */
function buildXAmzTarget(ast: AST.AST, operationName: string): string {
  const awsApiService = getAwsApiService(ast);

  // Use the service shape name from the Smithy model
  // This is the proper spec-compliant value (e.g., "TrentService" for KMS,
  // "AWSStepFunctions" for SFN, "DynamoDB_20120810" for DynamoDB)
  const serviceName = awsApiService?.serviceShapeName ?? awsApiService?.sdkId ?? "";

  if (serviceName) {
    return `${serviceName}.${operationName}`;
  }

  return operationName;
}
