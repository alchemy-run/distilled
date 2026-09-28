/**
 * AWS restXml Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-restxml-protocol.html
 */

import * as Effect from "effect/Effect";
import {
  decodeLeaf,
  Events,
  membersOf,
  shapeOf,
  specOf,
  type Shape,
  type Struct,
} from "@distilled.cloud/core/shape";
import type { Operation } from "../client/operation.ts";
import type { Protocol, ProtocolHandler } from "../client/protocol.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import { ParseError } from "../errors.ts";
import {
  parseEventStreamToUnion,
  type PayloadParser,
} from "../eventstream/parser.ts";
import { sanitizeErrorCode } from "../util/error.ts";
import { extractStaticQueryParams } from "../util/query-params.ts";
import {
  applyHttpTrait,
  bindInputToRequest,
  labelsOf,
} from "../util/serialize-input.ts";
import {
  convertStreamingInput,
  readableToEffectStream,
  readStreamAsBytes,
  readStreamAsText,
} from "../util/stream.ts";
import type { StreamingInputBody } from "../util/streaming-types.ts";
import { parseXml, parseXmlSync, XmlParseError } from "../util/xml.ts";
import { eventDecoder } from "./events.ts";
import { decodeHeader, type HeaderBinding } from "./rest-json.ts";
import {
  decodeXmlStruct,
  decodeXmlValue,
  encodeXmlElement,
  encodeXmlMembers,
  identityNaming,
  xmlRoot,
} from "./xml-codec.ts";

// =============================================================================
// Protocol Export
// =============================================================================

export const restXmlProtocol: Protocol = (
  operation: Operation,
): ProtocolHandler => {
  const { descriptor } = operation;
  const xmlns = descriptor.service.xmlns;
  const labels = labelsOf(descriptor.http);

  // Classify output members by HTTP binding once.
  const headerProps: HeaderBinding[] = [];
  const prefixHeaderProps: Array<{ name: string; prefix: string }> = [];
  let responseCodePropName: string | undefined;
  let outputPayload:
    | { name: string; shape: Shape | undefined; wire: string | undefined }
    | undefined;
  if (descriptor.output !== undefined) {
    for (const [name, member] of membersOf(descriptor.output)) {
      const spec = specOf(member);
      const shape = shapeOf(member);
      if (spec?.status) responseCodePropName = name;
      else if (spec?.header !== undefined) {
        headerProps.push({ name, header: spec.header.toLowerCase(), shape });
      } else if (spec?.prefix !== undefined) {
        prefixHeaderProps.push({ name, prefix: spec.prefix.toLowerCase() });
      } else if (spec?.payload) {
        outputPayload = { name, shape, wire: spec.wire };
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

      const value = bound.payloadValue;
      if (value !== undefined) {
        const shape = bound.payloadShape;
        if (shape === "stream" || shape === "blob") {
          request.body = convertStreamingInput(value as StreamingInputBody);
        } else if (typeof value === "string") {
          request.body = value;
        } else {
          // Structured payload: the root element is the member's xmlName,
          // else the target shape's xmlName or name.
          request.headers["Content-Type"] = "application/xml";
          request.body = encodeXmlElement(
            value,
            shape,
            bound.payloadSpec?.wire ?? bound.payloadName!,
            xmlns,
          );
        }
      } else if (bound.hasBodyMembers) {
        request.headers["Content-Type"] = "application/xml";
        const root =
          typeof descriptor.body === "string"
            ? descriptor.body
            : `${operation.operationName}Request`;
        const { attrs, children } = encodeXmlMembers(
          bound.bodyMembers,
          descriptor.input as Struct | undefined,
        );
        const ns = xmlns ? ` xmlns="${xmlns}"` : "";
        request.body = `<${root}${ns}${attrs}>${children}</${root}>`;
      }

      return request;
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
      if (outputPayload !== undefined && payloadShape instanceof Events) {
        if (response.body) {
          // Event payloads are XML documents
          const xmlPayloadParser: PayloadParser = (payload: Uint8Array) => {
            const text = new TextDecoder().decode(payload);
            if (!text) return {};
            try {
              return decodeXmlValue(
                parseXmlSync(text),
                undefined,
                identityNaming,
              );
            } catch (error) {
              if (error instanceof XmlParseError) return { payload: text };
              throw error;
            }
          };
          result[outputPayload.name] = parseEventStreamToUnion(
            response.body as ReadableStream<Uint8Array>,
            xmlPayloadParser,
            eventDecoder(payloadShape),
          );
        }
        return result;
      }
      if (outputPayload !== undefined && payloadShape === "stream") {
        result[outputPayload.name] = readableToEffectStream(response.body);
        return result;
      }
      // Non-streaming blob payload: the raw body bytes ARE the payload
      if (
        outputPayload !== undefined &&
        (payloadShape === "blob" || payloadShape === "secretBlob")
      ) {
        const bytes = yield* readStreamAsBytes(response.body);
        if (bytes.byteLength > 0) {
          result[outputPayload.name] =
            payloadShape === "blob" ? bytes : decodeLeaf("secretBlob", bytes);
        }
        return result;
      }

      const bodyText = yield* readStreamAsText(response.body);
      if (!bodyText) return result;

      if (outputPayload !== undefined) {
        if (payloadShape === "text" || payloadShape === undefined) {
          result[outputPayload.name] = bodyText;
        } else {
          const parsed = yield* parseXml(bodyText);
          result[outputPayload.name] = decodeXmlValue(
            xmlRoot(parsed).content,
            payloadShape,
            identityNaming,
          );
        }
        return result;
      }

      const parsed = yield* parseXml(bodyText);
      const { content } = xmlRoot(parsed);

      if (descriptor.unwrapped !== undefined) {
        // aws.customizations#s3UnwrappedXmlOutput: the root element's text
        // is the member value (e.g. GetBucketLocation).
        const text = decodeXmlValue(content, undefined, identityNaming);
        if (typeof text === "string" && text !== "") {
          result[descriptor.unwrapped] = text;
        }
      } else if (content && typeof content === "object") {
        Object.assign(
          result,
          decodeXmlStruct(
            content as Record<string, unknown>,
            descriptor.output,
            identityNaming,
            true,
          ),
        );
      }

      return result;
    }),

    deserializeError: Effect.fn(
      function* (response: Response) {
        // Read body as text
        const bodyText = yield* readStreamAsText(response.body);
        const serverFailure = response.status >= 500 && response.status < 600;

        if (!bodyText) {
          // S3 HEAD requests and some other operations return empty body on error
          // Derive error code from HTTP status code
          const statusCodeMap: Record<number, string> = {
            400: "BadRequest",
            403: "AccessDenied",
            404: "NotFound",
            405: "MethodNotAllowed",
            409: "Conflict",
            412: "PreconditionFailed",
            416: "InvalidRange",
            500: "InternalError",
            503: "ServiceUnavailable",
          };
          const errorCode =
            statusCodeMap[response.status] ??
            (serverFailure ? "InternalError" : `HttpError${response.status}`);
          return { errorCode, data: {} };
        }

        // Check if this is an HTML error response (e.g., S3 503 Slow Down)
        // Format: <html>...<li>Code: SlowDown</li><li>Message: ...</li>...</html>
        if (bodyText.trimStart().toLowerCase().startsWith("<html")) {
          const htmlError = parseHtmlError(bodyText);
          if (htmlError) {
            return htmlError;
          }
          // HTML response without parseable error - don't try XML parsing
          return yield* new ParseError({
            message: `Could not parse HTML error response: ${bodyText}`,
          });
        }

        // Parse XML body
        const parsed = yield* parseXml(bodyText);

        // restXml error structure:
        // Default: <ErrorResponse><Error><Code>...</Code><Message>...</Message>...</Error><RequestId>...</RequestId></ErrorResponse>
        // With noErrorWrapping: <Error><Code>...</Code><Message>...</Message>...</Error>
        // Note: noErrorWrapping is a protocol trait, but we handle both formats for flexibility
        let errorContent: Record<string, unknown> | undefined;

        // Try wrapped format first: <ErrorResponse><Error>...</Error></ErrorResponse>
        if (parsed.ErrorResponse && typeof parsed.ErrorResponse === "object") {
          const errorResponse = parsed.ErrorResponse as Record<string, unknown>;
          if (errorResponse.Error && typeof errorResponse.Error === "object") {
            errorContent = errorResponse.Error as Record<string, unknown>;
          }
        }

        // Try unwrapped format: <Error>...</Error>
        if (!errorContent && parsed.Error && typeof parsed.Error === "object") {
          errorContent = parsed.Error as Record<string, unknown>;
        }

        if (!errorContent) {
          return yield* new ParseError({
            message: `Could not find Error element in XML response: ${bodyText}`,
          });
        }

        // Extract error code from <Code> element
        const rawErrorCode = errorContent.Code;
        if (typeof rawErrorCode !== "string") {
          return yield* new ParseError({
            message: `No Code element found in error response: ${bodyText}`,
          });
        }

        const errorCode = sanitizeErrorCode(rawErrorCode);

        // Extract remaining data (remove Code, keep Message, Type, RequestId, etc.)
        const { Code: _Code, ...data } = errorContent;

        return { errorCode, data };
      },
      (effect, response) =>
        effect.pipe(
          Effect.catchTag("ParseError", (error) => {
            if (response.status < 500 || response.status >= 600) {
              return Effect.fail(error);
            }
            // makeResponseParser converts this descriptor into a typed failure.
            return Effect.succeed({ errorCode: "InternalError", data: {} });
          }),
        ),
    ),
  };
};

/**
 * Parse HTML error responses (e.g., S3 503 Slow Down rate limiting).
 * Format: <html>...<li>Code: SlowDown</li><li>Message: ...</li>...</html>
 */
function parseHtmlError(
  html: string,
): { errorCode: string; data: Record<string, unknown> } | undefined {
  // Extract <li>Key: Value</li> pairs
  const liPattern = /<li>([^:]+):\s*([^<]*)<\/li>/gi;
  const data: Record<string, string> = {};
  let errorCode: string | undefined;

  let match: RegExpExecArray | null;
  while ((match = liPattern.exec(html)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    if (key === "Code") {
      errorCode = sanitizeErrorCode(value);
    } else {
      data[key] = value;
    }
  }

  if (!errorCode) return undefined;

  return { errorCode, data };
}
