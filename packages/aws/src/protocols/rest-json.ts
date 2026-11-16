/**
 * AWS restJson1 Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-restjson1-protocol.html
 *
 * Key characteristics:
 * - JSON payloads with HTTP binding traits
 * - jsonName trait for custom property names
 * - Default timestamp format is epoch-seconds
 */

import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import type { Operation } from "@distilled.cloud/s3/client/operation";
import {
  Unreadable,
  type ProtocolImpl,
  type ProtocolHandler,
  type Serialized,
  type TextResponse,
} from "@distilled.cloud/s3/client/protocol";
import type { Request } from "@distilled.cloud/s3/client/request";
import type { Response } from "@distilled.cloud/s3/client/response";
import type { InputEvent } from "@distilled.cloud/s3/eventstream/serializer";
import { getEncodedPropertySignatures, getIdentifier } from "@distilled.cloud/s3/util/ast";
import { fromBase64 } from "@distilled.cloud/s3/util/base64";
import { inputEncoderSync, outputBody } from "@distilled.cloud/s3/util/codec";
import {
  extractJsonErrorCode,
  extractJsonErrorData,
  sanitizeErrorCode,
} from "@distilled.cloud/s3/util/error";
import { headerReader, notBase64 } from "@distilled.cloud/s3/util/headers";
import { extractStaticQueryParams } from "@distilled.cloud/s3/util/query-params";
import { applyHttpTrait, bindInputToRequest } from "@distilled.cloud/s3/util/serialize-input";
import {
  convertStreamingInput,
  isEffectStream,
  readableToEffectStream,
  readStreamAsBytes,
  readStreamAsText,
  type StreamBody,
} from "@distilled.cloud/s3/util/stream";
import * as Effect from "effect/Effect";
import type * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import type * as Stream from "effect/Stream";
import { applyApiGatewayCustomizations, isApiGateway } from "../customizations/api-gateway.ts";
import { applyGlacierCustomizations, isGlacier } from "../customizations/glacier.ts";
import { ParseError } from "../errors.ts";
import {
  getAwsApiService,
  getEventPayloadMap,
  getEventSchema,
  getHttpHeader,
  getOutputEventPayloadMap,
  getHttpPrefixHeaders,
  getHttpQuery,
  getMediaType,
  getPropAnnotations,
  getServiceVersion,
  hasHttpLabel,
  hasHttpPayload,
  hasHttpQueryParams,
  isInputEventStream,
  isOutputEventStream,
  isStreamingType,
  type StreamingInputBody,
  eventStreamWith,
  eventStreamBody,
} from "../traits.ts";

export const restJson1Protocol: ProtocolImpl = (operation: Operation): ProtocolHandler => {
  const inputSchema = operation.input;
  const outputSchema = operation.output;
  const inputAst = inputSchema.ast;
  const outputAst = outputSchema.ast;

  // Pre-compute encoder (done once at init)
  const encodeInput = inputEncoderSync(inputAst as any);

  // Check for service-specific customizations (done once at init)
  const serviceInfo = getAwsApiService(inputAst);
  const isApiGatewayService = isApiGateway(serviceInfo?.sdkId);
  const isGlacierService = isGlacier(serviceInfo?.sdkId);
  const serviceVersion = getServiceVersion(inputAst);

  // Pre-classify output properties by their HTTP binding (done once at init)
  type HeaderProp = {
    name: string;
    header: string;
    headerLower: string;
    /** The header's wire value: lists split, numbers and booleans parsed. */
    read: (value: string) => unknown;
  };
  type PrefixHeaderProp = { name: string; prefix: string };
  type PayloadProp = {
    name: string;
    isStreaming: boolean;
    isRaw: boolean;
    isBlob: boolean;
    isEventStream: boolean;
    eventSchema?: Schema.Schema<unknown>;
    /** event type -> `eventPayload` member name (raw-bytes events). */
    eventPayloadMap?: Record<string, string>;
  };

  const headerProps: HeaderProp[] = [];
  const prefixHeaderProps: PrefixHeaderProp[] = [];
  let outputPayloadProp: PayloadProp | undefined;
  let responseCodePropName: string | undefined;

  for (const prop of getEncodedPropertySignatures(outputAst)) {
    const name = String(prop.name);
    const header = getHttpHeader(prop);
    const prefix = getHttpPrefixHeaders(prop);
    const annotations = getPropAnnotations(prop);

    if (annotations.responseCode) {
      // Property bound to HTTP response status code
      responseCodePropName = name;
    } else if (header) {
      headerProps.push({
        name,
        header,
        headerLower: header.toLowerCase(),
        read: headerReader(prop.type, getMediaType(prop)),
      });
    } else if (prefix !== undefined) {
      // An empty prefix binds every response header (Smithy
      // RestJsonHttpEmptyPrefixHeadersResponseClient), including ones also
      // bound to httpHeader members.
      prefixHeaderProps.push({ name, prefix: prefix.toLowerCase() });
    } else if (hasHttpPayload(prop)) {
      const isEventStream = isOutputEventStream(prop.type);
      const eventSchema = isEventStream ? getEventSchema(prop.type) : undefined;
      outputPayloadProp = {
        name,
        isStreaming: isStreamingType(prop.type),
        isRaw: isRawPayload(prop.type),
        isBlob: isBlobPayload(prop.type),
        isEventStream,
        eventSchema,
        eventPayloadMap: eventSchema ? getOutputEventPayloadMap(eventSchema) : undefined,
      };
    } else if (isStreamingType(prop.type)) {
      // Streaming members (including event streams) implicitly become the payload
      const isEventStream = isOutputEventStream(prop.type);
      const eventSchema = isEventStream ? getEventSchema(prop.type) : undefined;
      outputPayloadProp = {
        name,
        isStreaming: true,
        isRaw: false,
        isBlob: false,
        isEventStream,
        eventSchema,
        eventPayloadMap: eventSchema ? getOutputEventPayloadMap(eventSchema) : undefined,
      };
    }
  }

  // restJson1 sends an explicit empty JSON document (`{}`) whenever the
  // input shape has at least one member bound to the body but none were
  // set (matching the AWS SDK v3 / botocore behavior -- see
  // AwsRestJsonProtocol.serializeRequest + ProtocolLib.resolveRestContentType
  // in aws-sdk-js-v3). Several services reject an absent body outright:
  // resource-explorer-2's ListIndexes/ListViews return
  // `ValidationException: Invalid request body` when called with no body.
  // Unit inputs (zero members) and inputs whose members are all bound to
  // labels/query/headers keep an empty body.
  const hasBodyCapableInputMembers = getEncodedPropertySignatures(inputAst).some(
    (prop) =>
      getHttpHeader(prop) === undefined &&
      !hasHttpLabel(prop) &&
      getHttpQuery(prop) === undefined &&
      !hasHttpQueryParams(prop) &&
      getHttpPrefixHeaders(prop) === undefined &&
      !hasHttpPayload(prop),
  );

  // The @mediaType of the input's payload member: its Content-Type.
  const payloadMember = getEncodedPropertySignatures(inputAst).find(hasHttpPayload);
  const payloadMediaType = payloadMember ? getMediaType(payloadMember) : undefined;
  // An unset structure payload is sent as an empty JSON document, like body
  // members (AWS SDK v3; Smithy RestJsonHttpWithEmptyStructurePayload).
  const payloadIsStructure = payloadMember !== undefined && isStructure(payloadMember.type);

  const serialize = (input: unknown): Serialized => {
    const encoded = encodeInput(input);

    // Start without Content-Type - we'll set it based on the body type
    // unless user explicitly provides one via httpHeader binding
    let request: Request = {
      method: "POST",
      path: "/",
      query: {},
      headers: {},
    };

    applyHttpTrait(inputAst, request);
    const bound = bindInputToRequest(inputAst, encoded as Record<string, unknown>, request);
    if (bound instanceof InvalidInput) return bound;
    const { payloadValue, payloadAst, bodyMembers, hasBodyMembers } = bound;
    extractStaticQueryParams(request);

    // Track if user set Content-Type explicitly via httpHeader binding
    const userSetContentType = request.headers["Content-Type"] !== undefined;
    // An input event stream's body, once its codec has loaded.
    let eventBody: Effect.Effect<Stream.Stream<Uint8Array, unknown>> | undefined;

    // Serialize body
    if (payloadValue !== undefined && payloadAst !== undefined) {
      // Check for input event stream - only when the schema explicitly marks it as an event stream
      // (not for regular streaming blobs like S3 putObject or EBS putSnapshotBlock)
      const isInputEventStreamPayload =
        isInputEventStream(payloadAst) && isEffectStream(payloadValue);

      if (isInputEventStreamPayload) {
        // Input event stream - frame each event per its eventPayload /
        // eventHeader member annotations (as the output side does).
        eventBody = eventStreamBody(getEventSchema(payloadAst), (codec) =>
          codec.serializeInputEventStreamWithSchema(
            payloadValue as Stream.Stream<InputEvent, unknown>,
            getEventSchema(payloadAst),
            getEventPayloadMap(payloadAst),
          ),
        );
        // Set content type for event streams (always override)
        request.headers["Content-Type"] = "application/vnd.amazon.eventstream";
      } else if (isStreamingType(payloadAst)) {
        request.body = convertStreamingInput(payloadValue as StreamingInputBody);
        // Streaming-input operations are signed UNSIGNED-PAYLOAD (see
        // Request.hasStreamingInput) -- some services (Lex Runtime V2)
        // reject payload-hash signatures on these routes.
        request.hasStreamingInput = true;
        // Default to octet-stream for streaming payloads, unless user set explicitly
        if (!userSetContentType) {
          request.headers["Content-Type"] = payloadMediaType ?? "application/octet-stream";
        }
      } else if (isBlobPayload(payloadAst)) {
        // A non-streaming blob payload is the body's raw bytes; the encoder
        // made it base64.
        request.body = fromBase64(payloadValue as string);
        if (!userSetContentType) {
          request.headers["Content-Type"] = payloadMediaType ?? "application/octet-stream";
        }
      } else if (isRawPayload(payloadAst)) {
        request.body = payloadValue as string;
        // A string payload is text unless its @mediaType says otherwise.
        if (!userSetContentType) {
          request.headers["Content-Type"] = payloadMediaType ?? "text/plain";
        }
      } else {
        request.body = JSON.stringify(payloadValue);
        // Default to JSON for structured payloads
        if (!userSetContentType) {
          request.headers["Content-Type"] = "application/json";
        }
      }
    } else if (hasBodyMembers) {
      request.body = JSON.stringify(bodyMembers);
      // Default to JSON for body members
      if (!userSetContentType) {
        request.headers["Content-Type"] = "application/json";
      }
    } else if (hasBodyCapableInputMembers || payloadIsStructure) {
      // Body-capable members exist but none were set: send an explicit
      // empty JSON document, matching AWS SDK v3 / botocore.
      request.body = "{}";
      if (!userSetContentType) {
        request.headers["Content-Type"] = "application/json";
      }
    }
    // A request with no body has no Content-Type.

    // Apply API Gateway customizations
    if (isApiGatewayService) {
      request = applyApiGatewayCustomizations(request);
    }

    // Apply Glacier customizations
    if (isGlacierService && serviceVersion) {
      request = applyGlacierCustomizations(request, serviceVersion);
    }

    const built = request;
    return eventBody === undefined ? built : Effect.map(eventBody, (body) => ({ ...built, body }));
  };

  /**
   * The members bound to the status code and headers, or {@link Unreadable}
   * with them as read when a `@mediaType` header is not base64.
   */
  const bindResponse = (response: Response): Record<string, unknown> | Unreadable => {
    const result: Record<string, unknown> = {};
    let notBase64Header: string | undefined;

    // Extract HTTP response status code if bound to a property
    if (responseCodePropName) {
      result[responseCodePropName] = response.status;
    }

    // Extract header-bound properties using pre-computed metadata
    for (const hp of headerProps) {
      const v = response.headers[hp.headerLower] ?? response.headers[hp.header];
      if (v !== undefined) {
        const read = hp.read(v);
        if (read === notBase64) notBase64Header ??= hp.header;
        result[hp.name] = read === notBase64 ? v : read;
      }
    }

    // Extract prefix header properties
    for (const php of prefixHeaderProps) {
      const prefixed: Record<string, string> = {};
      for (const [k, v] of Object.entries(response.headers)) {
        if (k.toLowerCase().startsWith(php.prefix)) {
          prefixed[k.slice(php.prefix.length)] = v;
        }
      }
      if (Object.keys(prefixed).length) result[php.name] = prefixed;
    }
    return notBase64Header === undefined
      ? result
      : new Unreadable(
          new ParseError({
            message: `Response header ${notBase64Header} is not base64, as its @mediaType requires`,
          }),
          result,
        );
  };

  return {
    serialize,
    deserializeText,

    deserializeStream: (response) => {
      // Streaming and blob payloads; everything else is read as text.
      if (!outputPayloadProp?.isStreaming && !outputPayloadProp?.isBlob) return undefined;
      const result = bindResponse(response);
      if (result instanceof Unreadable) return Effect.succeed(result);

      if (outputPayloadProp.isStreaming) {
        if (outputPayloadProp.isEventStream && response.body) {
          // Parse event stream - converts raw bytes to typed union events,
          // decoded through the event schema so blob/timestamp members match
          // the generated types
          result[outputPayloadProp.name] = eventStreamWith(outputPayloadProp.eventSchema, (codec) =>
            codec.parseEventStreamToUnion(
              response.body as StreamBody,
              undefined,
              outputPayloadProp.eventSchema,
              outputPayloadProp.eventPayloadMap,
            ),
          );
        } else {
          // Raw streaming output (blob)
          result[outputPayloadProp.name] = readableToEffectStream(response.body);
        }
        return Effect.succeed(result);
      }

      // Non-streaming blob payload (e.g. geo-maps GetTile / GetStaticMap):
      // the raw body bytes ARE the payload. Read them as bytes and re-encode
      // to the wire (base64 string) form the Blob schema decodes from.
      // The body is binary, not a JSON document, so JSON parsing is skipped.
      return Effect.map(readStreamAsBytes(response.body), (bytes) => {
        if (bytes.byteLength > 0) {
          result[outputPayloadProp.name] = bytesToBase64(bytes);
        }
        return result;
      });
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
          // Some API Gateway-fronted services (e.g. FinSpace Data) return
          // plain-text error bodies ("Failed to retrieve environment").
          // Treat the text as the error message and fall back to matching
          // the operation's declared errors by httpError status instead of
          // failing the deserializer.
          return { errorCode: "", data: { message: bodyText } };
        }
      }

      // Extract error code: X-Amzn-Errortype first (Smithy restJson1), then
      // the Coral X-Amz-Errortype spelling, then body fields.
      const rawErrorCode =
        response.headers["x-amzn-errortype"] ??
        response.headers["X-Amzn-Errortype"] ??
        response.headers["x-amz-errortype"] ??
        response.headers["X-Amz-Errortype"] ??
        extractJsonErrorCode(body);

      if (!rawErrorCode) {
        // Some services (API Gateway-fronted, e.g. IoT Managed Integrations)
        // return error responses with no error code at all -- no
        // X-Amzn-Errortype header and no __type/code body field. Return an
        // empty error code so the response parser can fall back to matching
        // the operation's declared errors by smithy.api#httpError status.
        return { errorCode: "", data: extractJsonErrorData(body) };
      }

      // Sanitize the error code
      const errorCode = sanitizeErrorCode(rawErrorCode);

      // Extract data (remove __type and code fields)
      // Note: Error shapes can have HTTP bindings (httpHeader, etc.) but we extract
      // those in the response-parser when matching against error schemas
      const data = extractJsonErrorData(body);

      return { errorCode, data };
    }),
  };

  function deserializeText(response: TextResponse): unknown {
    const result = bindResponse(response);
    if (result instanceof Unreadable) return result;
    const bodyText = response.body;

    // A string httpPayload is the body as-is, not a JSON document.
    if (outputPayloadProp?.isRaw) {
      if (bodyText) result[outputPayloadProp.name] = bodyText;
      return result;
    }

    // Parse JSON body (reviver converts null -> undefined since AWS returns null for absent fields)
    if (bodyText) {
      try {
        const parsed = JSON.parse(bodyText, (_, v) => (v === null ? undefined : v));
        if (outputPayloadProp) {
          // A structure, union or document payload is the whole body.
          result[outputPayloadProp.name] = parsed;
        } else if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          Object.assign(result, parsed);
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

    return result;
  }
};

/**
 * Whether the AST is a structure, optional or not: a union (even of one
 * member), a map or a document is not.
 */
function isStructure(ast: AST.AST): boolean {
  if (ast._tag === "Suspend") return isStructure(ast.thunk());
  if (ast._tag === "Union") {
    // S.optional(X) is X | undefined; any other union is a Smithy union.
    const [only, ...rest] = ast.types.filter((t) => t._tag !== "Undefined");
    return only !== undefined && rest.length === 0 && only._tag !== "Union" && isStructure(only);
  }
  return ast._tag === "Objects" && ast.indexSignatures.length === 0;
}

/** Check if AST represents a raw payload type (string, blob, stream) */
function isRawPayload(ast: AST.AST): boolean {
  if (isStreamingType(ast)) return true;
  if (ast._tag === "String") return true;
  if (ast._tag === "Union") return ast.types.some(isRawPayload);
  return false;
}

/**
 * Check if AST represents a non-streaming blob payload (T.Blob -- decoded
 * Uint8Array with a base64-string wire form). For httpPayload bindings the
 * HTTP body carries the raw bytes directly, so the deserializer must read
 * bytes instead of JSON-parsing the body.
 */
function isBlobPayload(ast: AST.AST): boolean {
  if (ast._tag === "Union") return ast.types.some(isBlobPayload);
  return getIdentifier(ast) === "Blob";
}

/** Base64-encode bytes without blowing the stack on large payloads. */
function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x2000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
