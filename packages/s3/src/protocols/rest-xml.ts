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
  getAnnotationUnwrap,
  getEventSchema,
  getHttpHeader,
  getHttpPrefixHeaders,
  getHttpQuery,
  getMemberAnnotation,
  getOwnAnnotation,
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
  xmlNamespacePrefixSymbol,
  xmlNamespaceSymbol,
  xmlNameSymbol,
} from "../traits.ts";
import {
  getArrayElementAST,
  getEncodedPropertySignatures,
  getIdentifier,
  getMapKeyValueAST,
  getXmlNameFromAST,
  getXmlNamespace,
  isArrayAST,
  isBooleanAST,
  isMapAST,
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
  elementText,
  escapeXml,
  parseXml,
  parseXmlSync,
  readXml,
  readXmlMap,
  unwrapArrayValue,
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
    ? outputProps.find((prop) => memberXmlName(prop) === outputXmlName)?.name
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
  // A document root carries its shape's namespace, or the service's.
  const inputXmlNamespace = rootNs(inputAst);
  const payloadXmlNamespace = payloadProp
    ? rootNs(payloadProp.type) || inputXmlNamespace
    : inputXmlNamespace;

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
        request.body = serializeValue(
          payloadAst,
          payloadValue,
          payloadXmlName,
          payloadXmlNamespace,
        );
      }
    } else if (hasBodyMembers) {
      request.headers["Content-Type"] = "application/xml";
      const tagName = getXmlNameFromAST(inputAst) ?? getIdentifier(inputAst);
      request.body = serializeObject(inputAst, bodyMembers, tagName, inputXmlNamespace);
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
          } catch {
            // Not XML: the event carries the text as is.
            return { payload: text };
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
        // The payload is the document's root element, whatever its name.
        const root = outputPayloadProp.xmlName ? parsed[outputPayloadProp.xmlName] : undefined;
        result[outputPayloadProp.name] = deserializeValue(
          outputPayloadProp.type,
          root ?? Object.values(parsed)[0] ?? parsed,
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

/** A namespace declaration attribute: ` xmlns="uri"`, or ` xmlns:prefix="uri"`. */
const nsAttribute = (uri: string | undefined, prefix: string | undefined): string =>
  uri === undefined ? "" : ` xmlns${prefix ? `:${prefix}` : ""}="${escapeXml(uri)}"`;

/** The namespace of a document root: its shape's, or the service's. */
const rootNs = (ast: AST.AST): string =>
  nsAttribute(getXmlNamespace(ast), getAnnotationUnwrap<string>(ast, xmlNamespacePrefixSymbol));

/** The namespace of a member, list member, or map key or value. */
const ownNs = (ast: AST.AST): string =>
  nsAttribute(
    getOwnAnnotation<string>(ast, xmlNamespaceSymbol),
    getOwnAnnotation<string>(ast, xmlNamespacePrefixSymbol),
  );

const memberNs = (prop: AST.PropertySignature): string =>
  nsAttribute(
    getMemberAnnotation<string>(prop, xmlNamespaceSymbol),
    getMemberAnnotation<string>(prop, xmlNamespacePrefixSymbol),
  );

/** A member's element name: its own `@xmlName`, or its name. */
const memberXmlName = (prop: AST.PropertySignature): string =>
  getMemberAnnotation<string>(prop, xmlNameSymbol) ?? String(prop.name);

const element = (tag: string, content: string, ns = ""): string =>
  `<${tag}${ns}>${content}</${tag}>`;

/** `ns` is the element's namespace declaration (see {@link nsAttribute}). */
function serializeValue(ast: AST.AST, value: unknown, tagName?: string, ns = ""): string {
  if (value == null) return "";

  // Primitives and Dates
  if (typeof value !== "object") {
    const content = escapeXml(String(value));
    return tagName ? element(tagName, content, ns) : content;
  }

  if (value instanceof Date) {
    const content = formatTimestamp(value, getTimestampFormatFromAST(ast));
    return tagName ? element(tagName, content, ns) : content;
  }

  // Maps
  if (tagName && isMapAST(ast)) {
    return serializeMap(ast, value as Record<string, unknown>, tagName, false, ns);
  }

  // Lists: <List><member>a</member><member>b</member></List>, the member
  // renamed by its `@xmlName`
  if (tagName && Array.isArray(value)) {
    const elementAST = getArrayElementAST(ast);
    const itemTag = (elementAST && getXmlNameFromAST(elementAST)) ?? "member";
    const itemNs = elementAST ? ownNs(elementAST) : "";
    const items = value.map((item) => serializeValue(elementAST ?? ast, item, itemTag, itemNs));
    return element(tagName, items.join(""), ns);
  }

  // Arrays
  if (Array.isArray(value)) {
    const elementAST = getArrayElementAST(ast);
    const tag = elementAST && getIdentifier(elementAST);
    return value
      .map((item, i) => serializeValue(elementAST ?? ast, item, tag, i === 0 ? ns : ""))
      .join("");
  }

  // Objects
  return serializeObject(ast, value as Record<string, unknown>, tagName, ns);
}

/**
 * A structure. Only a document root carries the structure's own namespace
 * (the caller passes it); a member element carries the member's.
 */
function serializeObject(
  ast: AST.AST,
  value: Record<string, unknown>,
  tagName?: string,
  ns = "",
): string {
  const props = getEncodedPropertySignatures(ast);
  const attrs: string[] = [];
  const elems: string[] = [];

  for (const prop of props) {
    const key = String(prop.name);
    const v = value[key];
    if (v === undefined) continue;

    const xmlName = memberXmlName(prop);
    if (hasXmlAttribute(prop)) {
      attrs.push(`${xmlName}="${escapeXml(String(v))}"`);
      continue;
    }

    const propNs = memberNs(prop);
    if (isMapAST(prop.type)) {
      elems.push(
        serializeMap(
          prop.type,
          v as Record<string, unknown>,
          xmlName,
          hasXmlFlattened(prop),
          propNs,
        ),
      );
      continue;
    }
    if (!Array.isArray(v)) {
      elems.push(serializeValue(prop.type, v, xmlName, propNs));
      continue;
    }

    if (hasXmlFlattened(prop)) {
      const elementAST = getArrayElementAST(prop.type);
      elems.push(
        v.map((item) => serializeValue(elementAST ?? prop.type, item, xmlName, propNs)).join(""),
      );
    } else {
      elems.push(serializeValue(prop.type, v, xmlName, propNs));
    }
  }

  if (!tagName) return elems.join("");

  const attrStr = ns + (attrs.length ? ` ${attrs.join(" ")}` : "");
  return `<${tagName}${attrStr}>${elems.join("")}</${tagName}>`;
}

/**
 * A map: `<Map><entry><key>k</key><value>v</value></entry>...</Map>`, or for
 * a flattened map the member element once per entry,
 * `<Map><key>k</key><value>v</value></Map>...`. `@xmlName` on the map's key
 * and value renames `<key>` and `<value>`.
 */
function serializeMap(
  ast: AST.AST,
  value: Record<string, unknown>,
  tagName: string,
  flattened: boolean,
  ns = "",
): string {
  const kv = getMapKeyValueAST(ast);
  const keyTag = (kv && getXmlNameFromAST(kv.keyAST)) ?? "key";
  const valueTag = (kv && getXmlNameFromAST(kv.valueAST)) ?? "value";
  const keyNs = kv ? ownNs(kv.keyAST) : "";
  const valueNs = kv ? ownNs(kv.valueAST) : "";
  const entries: string[] = [];
  for (const [k, v] of Object.entries(value)) {
    if (v === undefined) continue;
    entries.push(
      element(keyTag, escapeXml(k), keyNs) +
        serializeValue(kv?.valueAST ?? ast, v, valueTag, valueNs),
    );
  }
  if (flattened) return entries.map((entry) => element(tagName, entry, ns)).join("");
  return element(tagName, entries.map((entry) => `<entry>${entry}</entry>`).join(""), ns);
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
  /** Maps: the key and value schemas, and the tags of the key and value. */
  readonly map:
    | {
        readonly value: AST.AST;
        readonly keyTag: string;
        readonly valueTag: string;
      }
    | undefined;
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
    const kv = isMapAST(ast) ? getMapKeyValueAST(ast) : undefined;
    const array = !kv && isArrayAST(ast);
    const element = array ? getArrayElementAST(ast) : undefined;
    plan = {
      structure: isStructureAST(ast),
      map: kv && {
        value: kv.valueAST,
        keyTag: getXmlNameFromAST(kv.keyAST) ?? "key",
        valueTag: getXmlNameFromAST(kv.valueAST) ?? "value",
      },
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

function deserializeValue(ast: AST.AST, value: unknown, flattened = false): unknown {
  if (value == null) return undefined;
  const plan = valuePlanOf(ast);

  // Maps; an empty element reads as absent, like an empty list
  const map = plan.map;
  if (map) {
    if (value === "") return undefined;
    return readXmlMap(value, flattened, map.keyTag, map.valueTag, (v) =>
      deserializeValue(map.value, v),
    );
  }
  if (!plan.structure) value = elementText(value);

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
  /** Flattened maps: each entry is a member element. */
  readonly flattenedMap: boolean;
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
      const xmlName = memberXmlName(prop);
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
        flattenedMap: hasXmlFlattened(prop) && isMapAST(prop.type),
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
      const deserialized = deserializeValue(member.type, propValue, member.flattenedMap);
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
