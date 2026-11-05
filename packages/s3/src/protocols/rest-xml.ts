/**
 * AWS restXml Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-restxml-protocol.html
 */

import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import type * as S from "effect/Schema";
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
import type { PayloadParser } from "../eventstream/parser.ts";
import {
  getEventSchema,
  getHttpHeader,
  getHttpPrefixHeaders,
  getHttpQuery,
  getPropAnnotations,
  getTimestampFormatFromAST,
  getXmlNameProp,
  hasHttpLabel,
  hasHttpPayload,
  hasHttpQueryParams,
  hasS3UnwrappedXmlOutput,
  hasXmlAttribute,
  hasXmlFlattened,
  isOutputEventStream,
  isStreamingType,
  type StreamingInputBody,
  eventStreamWith,
} from "../traits.ts";
import {
  getArrayElementAST,
  getEncodedPropertySignatures,
  getIdentifier,
  getXmlNameFromAST,
  getXmlNamespace,
  isArrayAST,
  isBooleanAST,
  isNumberAST,
  isStringAST,
  unwrapUnion,
} from "../util/ast.ts";
import { errorBody, inputEncoderSync } from "../util/codec.ts";
import { sanitizeErrorCode } from "../util/error.ts";
import { extractStaticQueryParams } from "../util/query-params.ts";
import { applyHttpTrait, bindInputToRequest } from "../util/serialize-input.ts";
import { convertStreamingInput, readableToEffectStream, readStreamAsText } from "../util/stream.ts";
import { formatTimestamp } from "../util/timestamp.ts";
import {
  escapeXml,
  parseXml,
  parseXmlSync,
  readXml,
  XmlParseError,
  unwrapArrayValue,
  wrapTag,
} from "../util/xml.ts";

// =============================================================================
// Protocol Export
// =============================================================================

export const restXmlProtocol: ProtocolImpl = (operation: Operation): ProtocolHandler => {
  const inputSchema = operation.input;
  const outputSchema = operation.output;
  const inputAst = inputSchema.ast;
  const outputAst = outputSchema.ast;

  // Pre-compute encoder (done once at init)
  const encodeInput = inputEncoderSync(inputAst as any);
  const outputXmlName = getXmlNameFromAST(outputAst) ?? getIdentifier(outputAst);

  // Pre-compute s3UnwrappedXmlOutput handling (done once at init)
  const isUnwrappedOutput = hasS3UnwrappedXmlOutput(outputAst);
  const outputProps = getEncodedPropertySignatures(outputAst);
  const unwrappedPropName = isUnwrappedOutput
    ? outputProps.find((prop) => (getXmlNameProp(prop) ?? String(prop.name)) === outputXmlName)
        ?.name
    : undefined;

  // Pre-compute httpPayload property info for serialization (done once at init)
  const inputProps = getEncodedPropertySignatures(inputAst);
  const payloadProp = inputProps.find((prop) => hasHttpPayload(prop));
  const payloadXmlName = payloadProp
    ? (getXmlNameProp(payloadProp) ??
      getXmlNameFromAST(payloadProp.type) ??
      getIdentifier(payloadProp.type))
    : undefined;
  const payloadIsStreaming = payloadProp ? isStreamingType(payloadProp.type) : false;
  const inputXmlNamespace = getXmlNamespace(inputAst);

  // Pre-classify output properties by their HTTP binding (done once at init)
  // This avoids repeated trait lookups during deserialization
  type HeaderProp = {
    name: string;
    header: string;
    headerLower: string;
    isNumber: boolean;
    isBoolean: boolean;
  };
  type PrefixHeaderProp = { name: string; prefix: string };
  type PayloadProp = {
    name: string;
    type: AST.AST;
    isStreaming: boolean;
    isEventStream: boolean;
    eventSchema?: S.Schema<unknown>;
    isRawString: boolean;
    xmlName?: string;
  };

  const headerProps: HeaderProp[] = [];
  const prefixHeaderProps: PrefixHeaderProp[] = [];
  let outputPayloadProp: PayloadProp | undefined;
  let responseCodePropName: string | undefined;

  for (const prop of outputProps) {
    const name = String(prop.name);
    const header = getHttpHeader(prop);
    const prefixHeader = getHttpPrefixHeaders(prop);
    const annotations = getPropAnnotations(prop);

    if (annotations.responseCode) {
      // Property bound to HTTP response status code
      responseCodePropName = name;
    } else if (header) {
      headerProps.push({
        name,
        header,
        headerLower: header.toLowerCase(),
        isNumber: isNumberAST(prop.type),
        isBoolean: isBooleanAST(prop.type),
      });
    } else if (prefixHeader) {
      prefixHeaderProps.push({ name, prefix: prefixHeader.toLowerCase() });
    } else if (hasHttpPayload(prop)) {
      const unwrapped = unwrapUnion(prop.type);
      const isEventStream = isOutputEventStream(prop.type);
      outputPayloadProp = {
        name,
        type: prop.type,
        isStreaming: isStreamingType(prop.type),
        isEventStream,
        eventSchema: isEventStream ? getEventSchema(prop.type) : undefined,
        isRawString: unwrapped._tag === "Union" || unwrapped._tag === "String",
        // Use property name as fallback when type annotations aren't preserved
        // (e.g., when using Schema.pipe to add HttpPayload annotation)
        xmlName: getXmlNameFromAST(prop.type) ?? getIdentifier(prop.type) ?? name,
      };
    }
  }

  const serialize = (input: unknown): Request | InvalidInput => {
    // Encode the input via schema - handles all transformations
    const encoded = encodeInput(input);

    const request: Request = {
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

    // Serialize body
    if (payloadValue !== undefined && payloadAst !== undefined) {
      if (payloadIsStreaming) {
        request.body = convertStreamingInput(payloadValue as StreamingInputBody);
      } else if (typeof payloadValue === "string") {
        request.body = payloadValue;
      } else {
        request.headers["Content-Type"] = "application/xml";
        request.body = serializeValue(payloadAst, payloadValue, payloadXmlName, inputXmlNamespace);
      }
    } else if (hasBodyMembers) {
      request.headers["Content-Type"] = "application/xml";
      const tagName = getIdentifier(inputAst);
      request.body = serializeObject(inputAst, bodyMembers, tagName, getXmlNamespace(inputAst));
    }

    return request;
  };

  /** The members bound to the status code and headers. */
  const bindResponse = (response: Response): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    // Extract HTTP response status code if bound to a property
    if (responseCodePropName) {
      result[responseCodePropName] = response.status;
    }

    // Extract header-bound properties using pre-computed metadata
    for (const hp of headerProps) {
      const v = response.headers[hp.headerLower] ?? response.headers[hp.header];
      if (v !== undefined) {
        result[hp.name] = hp.isNumber ? Number(v) : hp.isBoolean ? v === "true" : v;
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
    return result;
  };

  return {
    serialize,
    deserializeText,

    deserializeStream: (response) => {
      // Streaming output payload; everything else is read as text.
      if (!outputPayloadProp?.isStreaming) return undefined;
      const result = bindResponse(response);
      if (outputPayloadProp.isEventStream && response.body) {
        // Parse event stream with XML payload parser
        const xmlPayloadParser: PayloadParser = (payload: Uint8Array) => {
          const text = new TextDecoder().decode(payload);
          if (!text) return {};
          try {
            return parseXmlSync(text);
          } catch (error) {
            if (error instanceof XmlParseError) return { payload: text };
            throw error;
          }
        };
        result[outputPayloadProp.name] = eventStreamWith(outputPayloadProp.eventSchema, (codec) =>
          codec.parseEventStreamToUnion(
            response.body as ReadableStream<Uint8Array>,
            xmlPayloadParser,
            outputPayloadProp.eventSchema,
          ),
        );
      } else {
        // Raw streaming output (blob)
        result[outputPayloadProp.name] = readableToEffectStream(response.body);
      }
      return Effect.succeed(result);
    },

    deserializeError: Effect.fnUntraced(
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
            message: `Could not parse HTML error response: ${errorBody(operation, bodyText)}`,
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
            message: `Could not find Error element in XML response: ${errorBody(operation, bodyText)}`,
          });
        }

        // Extract error code from <Code> element
        const rawErrorCode = errorContent.Code;
        if (typeof rawErrorCode !== "string") {
          return yield* new ParseError({
            message: `No Code element found in error response: ${errorBody(operation, bodyText)}`,
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

  function deserializeText(response: TextResponse): unknown {
    const result = bindResponse(response);
    const bodyText = response.body;

    // Handle httpPayload property
    if (outputPayloadProp && bodyText) {
      if (outputPayloadProp.isRawString) {
        result[outputPayloadProp.name] = bodyText;
      } else {
        const parsed = readXml(bodyText);
        // Lenient mode returns the body as read.
        if (parsed instanceof Unreadable) return parsed;
        result[outputPayloadProp.name] = deserializeValue(
          outputPayloadProp.type,
          outputPayloadProp.xmlName ? (parsed[outputPayloadProp.xmlName] ?? parsed) : parsed,
        );
      }
    }

    // Parse body XML for non-payload properties
    if (bodyText && !outputPayloadProp) {
      const parsed = readXml(bodyText);
      // Lenient mode returns the body as read.
      if (parsed instanceof Unreadable) return parsed;
      const rawContent = outputXmlName ? parsed[outputXmlName] : parsed;

      if (isUnwrappedOutput && unwrappedPropName) {
        const textContent = extractTextContent(rawContent);
        if (textContent !== undefined) {
          result[String(unwrappedPropName)] = textContent;
        }
      } else if (rawContent && typeof rawContent === "object") {
        Object.assign(result, deserializeObject(outputAst, rawContent as Record<string, unknown>));
      }
    }

    return result;
  }
};

// =============================================================================
// XML Serialization
// =============================================================================

function serializeValue(ast: AST.AST, value: unknown, tagName?: string, xmlns?: string): string {
  if (value == null) return "";

  // Primitives and Dates
  if (typeof value !== "object") {
    const content = escapeXml(String(value));
    return tagName ? wrapTag(tagName, content, xmlns) : content;
  }

  if (value instanceof Date) {
    const content = formatTimestamp(value, getTimestampFormatFromAST(ast));
    return tagName ? wrapTag(tagName, content, xmlns) : content;
  }

  // Arrays
  if (Array.isArray(value)) {
    const elementAST = getArrayElementAST(ast);
    const tag = tagName ?? (elementAST && getIdentifier(elementAST));
    return value
      .map((item, i) => serializeValue(elementAST ?? ast, item, tag, i === 0 ? xmlns : undefined))
      .join("");
  }

  // Objects
  return serializeObject(ast, value as Record<string, unknown>, tagName, xmlns);
}

function serializeObject(
  ast: AST.AST,
  value: Record<string, unknown>,
  tagName?: string,
  xmlns?: string,
): string {
  const props = getEncodedPropertySignatures(ast);
  const attrs: string[] = [];
  const elems: string[] = [];

  for (const prop of props) {
    const key = String(prop.name);
    const v = value[key];
    if (v === undefined) continue;

    if (hasXmlAttribute(prop)) {
      attrs.push(`${getXmlNameProp(prop) ?? key}="${escapeXml(String(v))}"`);
      continue;
    }

    const xmlName = getXmlNameProp(prop) ?? key;
    if (!Array.isArray(v)) {
      elems.push(serializeValue(prop.type, v, xmlName));
      continue;
    }

    const elementAST = getArrayElementAST(prop.type);
    if (hasXmlFlattened(prop)) {
      elems.push(v.map((item) => serializeValue(elementAST ?? prop.type, item, xmlName)).join(""));
    } else {
      // Use xmlName trait first, then fall back to class identifier
      const itemTag = elementAST && (getXmlNameFromAST(elementAST) ?? getIdentifier(elementAST));
      elems.push(
        `<${xmlName}>${v.map((item) => serializeValue(elementAST ?? prop.type, item, itemTag)).join("")}</${xmlName}>`,
      );
    }
  }

  if (!tagName) return elems.join("");

  const ns = xmlns ?? getXmlNamespace(ast);
  const attrStr =
    (ns ? ` xmlns="${escapeXml(ns)}"` : "") + (attrs.length ? ` ${attrs.join(" ")}` : "");
  return `<${tagName}${attrStr}>${elems.join("")}</${tagName}>`;
}

// =============================================================================
// XML Deserialization
// =============================================================================

function isStructureAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isStructureAST(unwrapped);
  if (ast._tag === "Suspend") return isStructureAST(ast.thunk());
  if (ast.encoding && ast.encoding.length > 0) {
    return isStructureAST(ast.encoding[0].to);
  }
  return ast._tag === "Objects" && ast.indexSignatures.length === 0;
}

/** What deserializing a value of a schema needs to know about it, read once per schema. */
interface ValuePlan {
  readonly structure: boolean;
  readonly string: boolean;
  readonly array: boolean;
  readonly number: boolean;
  readonly boolean: boolean;
  /** Arrays: the element schema. */
  readonly element: AST.AST | undefined;
  /**
   * Arrays: the element's wrapper tag -- its xmlName trait, then its class
   * identifier, then the Smithy default wrapper for non-flattened lists,
   * <member> (e.g. CloudFront RealtimeLogConfig.EndPoints, whose list
   * member carries no xmlName trait and arrives as
   * <EndPoints><member>...</member>).
   */
  readonly elementTag: string | undefined;
}

const valuePlans = /*@__PURE__*/ new WeakMap<AST.AST, ValuePlan>();

const valuePlanOf = (ast: AST.AST): ValuePlan => {
  let plan = valuePlans.get(ast);
  if (plan === undefined) {
    const array = isArrayAST(ast);
    const element = array ? getArrayElementAST(ast) : undefined;
    plan = {
      structure: isStructureAST(ast),
      string: isStringAST(ast),
      array,
      number: isNumberAST(ast),
      boolean: isBooleanAST(ast),
      element,
      elementTag: element ? (getXmlNameFromAST(element) ?? getIdentifier(element)) : undefined,
    };
    valuePlans.set(ast, plan);
  }
  return plan;
};

const MEMBER = ["member"];

const isEmptyObject = (value: object): boolean => {
  for (const _ in value) return false;
  return true;
};

function deserializeValue(ast: AST.AST, value: unknown): unknown {
  if (value == null) return undefined;
  const plan = valuePlanOf(ast);

  // An empty XML element can represent a present structure, but not a map.
  if (
    value === "" ||
    (typeof value === "object" && !Array.isArray(value) && isEmptyObject(value as object))
  ) {
    if (plan.structure) return {};
    return value === "" && plan.string ? "" : undefined;
  }

  if (plan.array) {
    const elAST = plan.element;
    if (!elAST) return Array.isArray(value) ? value : [value];

    // Handle wrapped arrays: { Item: [...] }
    const unwrapped = unwrapArrayValue(value, plan.elementTag, MEMBER);

    const items = Array.isArray(unwrapped) ? unwrapped : [unwrapped];
    return items.map((item) => deserializeValue(elAST, item));
  }

  if (typeof value === "string") {
    // Dates stay as strings - the codec converts them
    if (plan.number) return Number(value);
    if (plan.boolean) return value.trim() === "true";
    return value;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return deserializeObject(ast, value as Record<string, unknown>);
  }

  return value;
}

/**
 * Extract text content from the compact XML representation.
 * Handles: { "#text": "value", "@_xmlns": "..." } -> "value"
 * Or: { "@_xmlns": "..." } (empty element) -> undefined
 */
function extractTextContent(value: unknown): unknown {
  if (value == null) return undefined;
  if (typeof value !== "object") return value;

  const obj = value as Record<string, unknown>;
  if ("#text" in obj) return obj["#text"];
  if (Object.keys(obj).every((k) => k.startsWith("@_"))) return undefined;
  return value;
}

/** How one output member is read from its XML element, read from its traits once. */
interface MemberPlan {
  readonly key: string;
  readonly type: AST.AST;
  readonly payload: boolean;
  readonly xmlName: string;
  /** XML attributes: the parser's key for the attribute (`@_name`). */
  readonly attribute: string | undefined;
  /** Flattened lists: the element schema. */
  readonly flattened: AST.AST | undefined;
}

const memberPlans = /*@__PURE__*/ new WeakMap<AST.AST, ReadonlyArray<MemberPlan>>();

const memberPlansOf = (ast: AST.AST): ReadonlyArray<MemberPlan> => {
  let plans = memberPlans.get(ast);
  if (plans === undefined) {
    const out: MemberPlan[] = [];
    for (const prop of getEncodedPropertySignatures(ast)) {
      // Skip HTTP-bound properties (headers, query, labels)
      if (
        getHttpHeader(prop) ||
        getHttpQuery(prop) ||
        hasHttpLabel(prop) ||
        getHttpPrefixHeaders(prop) ||
        hasHttpQueryParams(prop)
      )
        continue;
      const key = String(prop.name);
      const xmlName = getXmlNameProp(prop) ?? key;
      out.push({
        key,
        type: prop.type,
        payload: hasHttpPayload(prop),
        xmlName,
        // Handle XML attributes (parser prefixes attributes with @_)
        attribute: hasXmlAttribute(prop) ? `@_${xmlName}` : undefined,
        flattened:
          hasXmlFlattened(prop) && isArrayAST(prop.type)
            ? (getArrayElementAST(prop.type) ?? prop.type)
            : undefined,
      });
    }
    plans = out;
    memberPlans.set(ast, plans);
  }
  return plans;
};

function deserializeObject(ast: AST.AST, value: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const member of memberPlansOf(ast)) {
    const key = member.key;

    if (member.payload) {
      result[key] = deserializeValue(member.type, value);
      continue;
    }

    if (member.attribute !== undefined) {
      const attrValue = value[member.attribute];
      if (attrValue !== undefined) {
        result[key] = deserializeValue(member.type, attrValue);
      }
      continue;
    }

    const propValue = value[member.xmlName];
    if (propValue === undefined) continue;

    if (member.flattened !== undefined) {
      const elAST = member.flattened;
      const items = Array.isArray(propValue) ? propValue : [propValue];
      result[key] = items.map((item) => deserializeValue(elAST, item));
    } else {
      const deserialized = deserializeValue(member.type, propValue);
      if (deserialized !== undefined) {
        result[key] = deserialized;
      }
    }
  }

  return result;
}

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
