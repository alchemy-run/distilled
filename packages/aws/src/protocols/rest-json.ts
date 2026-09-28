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

import * as Effect from "effect/Effect";
import type * as Stream from "effect/Stream";
import {
  decodeJson,
  decodeLeaf,
  encodeJson,
  Events,
  ListShape,
  membersOf,
  shapeOf,
  specOf,
  type Shape,
} from "@distilled.cloud/core/shape";
import type { Operation } from "../client/operation.ts";
import type { Protocol, ProtocolHandler } from "../client/protocol.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import {
  applyApiGatewayCustomizations,
  isApiGateway,
} from "../customizations/api-gateway.ts";
import {
  applyGlacierCustomizations,
  isGlacier,
} from "../customizations/glacier.ts";
import { ParseError } from "../errors.ts";
import { parseEventStreamToUnion } from "../eventstream/parser.ts";
import {
  serializeInputEventStream,
  serializeInputEventStreamWithPayloads,
  type InputEvent,
} from "../eventstream/serializer.ts";
import {
  extractJsonErrorCode,
  extractJsonErrorData,
  sanitizeErrorCode,
} from "../util/error.ts";
import { extractStaticQueryParams } from "../util/query-params.ts";
import {
  applyHttpTrait,
  bindInputToRequest,
  labelsOf,
} from "../util/serialize-input.ts";
import {
  convertStreamingInput,
  isEffectStream,
  readableToEffectStream,
  readStreamAsBytes,
  readStreamAsText,
} from "../util/stream.ts";
import type { StreamingInputBody } from "../util/streaming-types.ts";
import { eventDecoder } from "./events.ts";

/** JSON.parse reviver: AWS returns null for absent fields. */
const dropNull = (_: string, v: unknown) => (v === null ? undefined : v);

export interface HeaderBinding {
  readonly name: string;
  readonly header: string;
  readonly shape: Shape | undefined;
}

/** Decode a response header value through its member shape. */
export const decodeHeader = (
  shape: Shape | undefined,
  value: string,
): unknown => {
  if (typeof shape === "string") return decodeLeaf(shape, value);
  if (shape instanceof ListShape) {
    // List-valued header: comma separated
    const items = value.split(",").map((v) => v.trim());
    const el = shape.element;
    return typeof el === "string" ? items.map((i) => decodeLeaf(el, i)) : items;
  }
  return value;
};

export const restJson1Protocol: Protocol = (
  operation: Operation,
): ProtocolHandler => {
  const { descriptor } = operation;
  const service = descriptor.service;
  const isApiGatewayService = isApiGateway(service.sdkId);
  const isGlacierService = isGlacier(service.sdkId);
  const labels = labelsOf(descriptor.http);

  // Classify output members by HTTP binding once.
  const headerProps: HeaderBinding[] = [];
  const prefixHeaderProps: Array<{ name: string; prefix: string }> = [];
  let responseCodePropName: string | undefined;
  let outputPayload: { name: string; shape: Shape | undefined } | undefined;
  if (descriptor.output !== undefined) {
    for (const [name, member] of membersOf(descriptor.output)) {
      const spec = specOf(member);
      const shape = shapeOf(member);
      if (spec?.status) responseCodePropName = name;
      else if (spec?.header !== undefined) {
        headerProps.push({ name, header: spec.header.toLowerCase(), shape });
      } else if (spec?.prefix !== undefined) {
        prefixHeaderProps.push({ name, prefix: spec.prefix.toLowerCase() });
      } else if (
        spec?.payload ||
        shape === "stream" ||
        shape instanceof Events
      ) {
        outputPayload = { name, shape };
      }
    }
  }

  return {
    serializeRequest: Effect.fn(function* (input: unknown) {
      const request: Request = {
        method: "POST",
        path: "/",
        query: {},
        headers: {},
      };
      applyHttpTrait(descriptor.http, request);
      const bound = bindInputToRequest(
        descriptor.input,
        labels,
        (input ?? {}) as Record<string, unknown>,
        request,
      );
      extractStaticQueryParams(request);

      // Respect an explicit Content-Type header binding
      const userSetContentType = request.headers["Content-Type"] !== undefined;
      const setContentType = (type: string) => {
        if (!userSetContentType) request.headers["Content-Type"] = type;
      };

      const payloadShape = bound.payloadShape;
      if (bound.payloadValue !== undefined) {
        const value = bound.payloadValue;
        if (payloadShape instanceof Events && isEffectStream(value)) {
          const payloads = payloadShape.payloads;
          request.body =
            Object.keys(payloads).length > 0
              ? serializeInputEventStreamWithPayloads(
                  value as Stream.Stream<InputEvent, unknown>,
                  payloads,
                )
              : serializeInputEventStream(
                  value as Stream.Stream<InputEvent, unknown>,
                );
          request.headers["Content-Type"] =
            "application/vnd.amazon.eventstream";
        } else if (payloadShape === "stream" || payloadShape === "blob") {
          request.body = convertStreamingInput(value as StreamingInputBody);
          // Raw-byte payloads are signed UNSIGNED-PAYLOAD — some services
          // (Lex Runtime V2) reject payload-hash signatures.
          request.hasStreamingInput = true;
          setContentType("application/octet-stream");
        } else if (payloadShape === "text" || typeof value === "string") {
          request.body = value as string;
          setContentType("application/json");
        } else {
          request.body = JSON.stringify(
            encodeJson(value, payloadShape, "epoch-seconds"),
          );
          setContentType("application/json");
        }
      } else if (bound.hasBodyMembers) {
        request.body = JSON.stringify(
          encodeJson(bound.bodyMembers, descriptor.input, "epoch-seconds"),
        );
        setContentType("application/json");
      } else {
        // Body-capable members exist but none were set: send an explicit
        // empty JSON document (AWS SDK v3 / botocore behavior; e.g.
        // resource-explorer-2 rejects an absent body).
        if (descriptor.body === true) request.body = "{}";
        setContentType("application/json");
      }

      let result = request;
      if (isApiGatewayService) result = applyApiGatewayCustomizations(result);
      if (isGlacierService && service.version) {
        result = applyGlacierCustomizations(result, service.version);
      }
      return result;
    }),

    deserializeResponse: Effect.fn(function* (response: Response) {
      const result: Record<string, unknown> = {};

      if (responseCodePropName) result[responseCodePropName] = response.status;

      for (const hp of headerProps) {
        const v = response.headers[hp.header];
        if (v !== undefined) result[hp.name] = decodeHeader(hp.shape, v);
      }

      for (const php of prefixHeaderProps) {
        const prefixed: Record<string, string> = {};
        for (const [k, v] of Object.entries(response.headers)) {
          if (k.toLowerCase().startsWith(php.prefix)) {
            prefixed[k.slice(php.prefix.length)] = v;
          }
        }
        if (Object.keys(prefixed).length) result[php.name] = prefixed;
      }

      const payloadShape = outputPayload?.shape;
      if (outputPayload !== undefined) {
        if (payloadShape instanceof Events) {
          if (response.body) {
            result[outputPayload.name] = parseEventStreamToUnion(
              response.body as ReadableStream<Uint8Array>,
              undefined,
              eventDecoder(payloadShape),
              payloadShape.payloads,
            );
          }
          return result;
        }
        if (payloadShape === "stream") {
          result[outputPayload.name] = readableToEffectStream(response.body);
          return result;
        }
        // Non-streaming blob payload: the raw body bytes ARE the payload
        if (payloadShape === "blob" || payloadShape === "secretBlob") {
          const bytes = yield* readStreamAsBytes(response.body);
          if (bytes.byteLength > 0) {
            result[outputPayload.name] =
              payloadShape === "blob" ? bytes : decodeLeaf("secretBlob", bytes);
          }
          return result;
        }
      }

      const bodyText = yield* readStreamAsText(response.body);

      if (outputPayload !== undefined && payloadShape === "text") {
        if (bodyText) result[outputPayload.name] = bodyText;
        return result;
      }

      if (bodyText) {
        let parsed: unknown;
        try {
          parsed = JSON.parse(bodyText, dropNull);
        } catch {
          return yield* new ParseError({
            message: `Failed to parse JSON body: ${bodyText}`,
          });
        }
        if (outputPayload !== undefined) {
          // Structured httpPayload: the document IS that member
          result[outputPayload.name] = decodeJson(parsed, payloadShape);
        } else if (
          parsed &&
          typeof parsed === "object" &&
          !Array.isArray(parsed)
        ) {
          Object.assign(result, decodeJson(parsed, descriptor.output));
        }
      }
      return result;
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
          // Some API Gateway-fronted services return plain-text error
          // bodies. Treat the text as the message and let the response
          // parser fall back to matching declared errors by status.
          return { errorCode: "", data: { message: bodyText } };
        }
      }

      // X-Amzn-Errortype first (Smithy restJson1), then the Coral
      // X-Amz-Errortype spelling, then body fields.
      const rawErrorCode =
        response.headers["x-amzn-errortype"] ??
        response.headers["X-Amzn-Errortype"] ??
        response.headers["x-amz-errortype"] ??
        response.headers["X-Amz-Errortype"] ??
        extractJsonErrorCode(body);

      if (!rawErrorCode) {
        // No error code at all (some API Gateway-fronted services): let the
        // response parser match declared errors by status.
        return { errorCode: "", data: extractJsonErrorData(body) };
      }

      return {
        errorCode: sanitizeErrorCode(rawErrorCode),
        data: extractJsonErrorData(body),
      };
    }),
  };
};
