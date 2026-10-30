/**
 * AWS Query Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-query-protocol.html
 *
 * Key differences from EC2 Query:
 * - Query key uses xmlName directly (not capitalized like EC2)
 * - Lists use .member.N format by default (not flattened)
 * - Maps use .entry.N.key and .entry.N.value format
 * - Response has {Op}Result wrapper inside {Op}Response
 * - Errors wrapped in <ErrorResponse><Error>...</Error><RequestId>...</RequestId></ErrorResponse>
 */

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
import {
  getServiceVersion,
  getXmlName,
  getXmlNameProp,
  hasXmlAttribute,
  hasXmlFlattened,
} from "../traits.ts";
import {
  getArrayElementAST,
  getEncodedPropertySignatures,
  getIdentifier,
  getMapKeyValueAST,
  isArrayAST,
  isBooleanAST,
  isMapAST,
  isNumberAST,
} from "../util/ast.ts";
import { errorBody, inputEncoderSync } from "../util/codec.ts";
import { sanitizeErrorCode } from "../util/error.ts";
import { readStreamAsText } from "../util/stream.ts";
import { extractXmlRoot, parseXml, readXml, unwrapArrayValue } from "../util/xml.ts";

// =============================================================================
// Protocol Export
// =============================================================================

export const awsQueryProtocol: ProtocolImpl = (operation: Operation): ProtocolHandler => {
  const inputSchema = operation.input;
  const outputSchema = operation.output;
  const inputAst = inputSchema.ast;
  const outputAst = outputSchema.ast;

  // Pre-compute encoder (done once at init)
  const encodeInput = inputEncoderSync(inputAst as any);

  // Pre-compute operation name and version from annotations.
  // Prefer the explicit operation name emitted by the generator; fall back to
  // deriving it from the input shape identifier. RDS-family query services
  // (RDS, ElastiCache, Redshift, Neptune, DocDB, ...) name their input shapes
  // "XxxMessage" (e.g. DescribeDBInstancesMessage), so we must strip "Message"
  // in addition to "Request"/"Input" to recover the Action name. Note the
  // fallback is wrong for services whose input shapes aren't named after the
  // operation at all (e.g. AutoScaling's `AutoScalingGroupNamesType`).
  const identifier = getIdentifier(inputAst) ?? "";
  const action = operation.operationName ?? identifier.replace(/(?:Request|Input|Message)$/, "");
  const version = getServiceVersion(inputAst) ?? "";

  const serialize = (input: unknown): Request => {
    // Encode the input via schema - handles all transformations
    // (TimestampFormat -> ISO 8601 strings, etc.)
    const encoded = encodeInput(input);

    const request: Request = {
      method: "POST",
      path: "/",
      query: {},
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    // Build form-urlencoded body
    const params: string[] = [];
    params.push(`Action=${encodeURIComponent(action)}`);
    params.push(`Version=${encodeURIComponent(version)}`);

    // Serialize already-encoded input members
    serializeMembers(inputAst, encoded as Record<string, unknown>, "", params);

    request.body = params.join("&");

    return request;
  };

  return {
    serialize,
    deserializeText,

    deserializeError: Effect.fnUntraced(function* (response: Response) {
      // Read body as text
      const bodyText = yield* readStreamAsText(response.body);

      if (!bodyText) {
        return yield* new ParseError({ message: "Empty error response body" });
      }

      // Parse XML body
      const parsed = yield* parseXml(bodyText);

      // AWS Query error structure:
      // <ErrorResponse>
      //   <Error>
      //     <Type>Sender</Type>
      //     <Code>InvalidGreeting</Code>
      //     <Message>Hi</Message>
      //     ...other members...
      //   </Error>
      //   <RequestId>xxx</RequestId>
      // </ErrorResponse>

      let errorContent: Record<string, unknown> | undefined;
      let requestId: string | undefined;

      if (parsed.ErrorResponse && typeof parsed.ErrorResponse === "object") {
        const errorResponse = parsed.ErrorResponse as Record<string, unknown>;
        if (errorResponse.Error && typeof errorResponse.Error === "object") {
          errorContent = errorResponse.Error as Record<string, unknown>;
        }
        if (typeof errorResponse.RequestId === "string") {
          requestId = errorResponse.RequestId;
        }
      }

      // Legacy query services (SimpleDB) wrap errors EC2-style:
      // <Response><Errors><Error><Code>..</Code><Message>..</Message></Error></Errors><RequestID>..</RequestID></Response>
      if (!errorContent && parsed.Response && typeof parsed.Response === "object") {
        const responseObj = parsed.Response as Record<string, unknown>;
        if (typeof responseObj.RequestID === "string") {
          requestId = responseObj.RequestID;
        }
        if (responseObj.Errors && typeof responseObj.Errors === "object") {
          const errors = responseObj.Errors as Record<string, unknown>;
          if (errors.Error && typeof errors.Error === "object") {
            errorContent = (Array.isArray(errors.Error) ? errors.Error[0] : errors.Error) as Record<
              string,
              unknown
            >;
          }
        }
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

      // Extract remaining data (remove Code, keep Message, Type, etc.)
      const { Code: _code, ...data } = errorContent;

      // Include RequestId if present
      if (requestId) {
        data.RequestId = requestId;
      }

      return { errorCode, data };
    }),
  };

  function deserializeText(response: TextResponse): unknown {
    const result: Record<string, unknown> = {};
    const bodyText = response.body;

    // Parse body XML
    if (bodyText) {
      const parsed = readXml(bodyText);
      // Lenient mode returns the body as read.
      if (parsed instanceof Unreadable) return parsed;

      // AWS Query response structure:
      // <{OperationName}Response xmlns="...">
      //   <{OperationName}Result>
      //     ...actual content...
      //   </{OperationName}Result>
      //   <ResponseMetadata>
      //     <RequestId>...</RequestId>
      //   </ResponseMetadata>
      // </{OperationName}Response>

      let content = extractXmlRoot(parsed);

      // Look for the Result wrapper inside the Response
      if (content && typeof content === "object") {
        // Find the *Result key (e.g., GetUserResult, ListUsersResult)
        const resultKey = Object.keys(content).find((k) => k.endsWith("Result"));
        if (resultKey) {
          content = content[resultKey] as Record<string, unknown>;
        }
      }

      if (content && typeof content === "object") {
        Object.assign(result, deserializeObject(outputAst, content));
      }
    }

    return result;
  }
};

// =============================================================================
// Query String Serialization
// =============================================================================

/**
 * Get the query key name for a member following AWS Query key resolution:
 * 1. Use xmlName trait if present
 * 2. Use member name (no capitalization, unlike EC2)
 */
function getQueryKeyName(prop: AST.PropertySignature): string {
  const xmlName = getXmlNameProp(prop);
  if (xmlName) return xmlName;

  return String(prop.name);
}

/**
 * Serialize object members to query parameters
 */
function serializeMembers(
  ast: AST.AST,
  input: Record<string, unknown>,
  prefix: string,
  params: string[],
): void {
  for (const prop of getEncodedPropertySignatures(ast)) {
    const memberName = String(prop.name);
    const value = input[memberName];
    if (value === undefined || value === null) continue;

    const queryKey = getQueryKeyName(prop);
    const fullKey = prefix ? `${prefix}.${queryKey}` : queryKey;

    serializeValue(prop.type, value, fullKey, params, prop);
  }
}

/**
 * Serialize a value to query parameters.
 * Values are already encoded (dates as ISO 8601 strings, etc.)
 */
function serializeValue(
  ast: AST.AST,
  value: unknown,
  key: string,
  params: string[],
  prop?: AST.PropertySignature,
): void {
  if (value === undefined || value === null) return;

  // Handle Date objects (v4: S.Date remains Date after encode)
  if (value instanceof Date) {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`);
    return;
  }

  // Handle primitives (includes encoded dates as strings, blobs as base64)
  if (typeof value !== "object") {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    return;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    // Empty arrays are not serialized
    if (value.length === 0) return;

    const elementAST = getArrayElementAST(ast);
    const isFlattened = prop ? hasXmlFlattened(prop) : false;

    // AWS Query uses "member" as default for list elements
    // xmlName trait on the element AST can override this
    const elementTag = elementAST ? (getXmlName(elementAST) ?? "member") : "member";

    for (let i = 0; i < value.length; i++) {
      // AWS Query format: Key.member.N for non-flattened, Key.N for flattened
      const itemKey = isFlattened ? `${key}.${i + 1}` : `${key}.${elementTag}.${i + 1}`;
      serializeValue(elementAST ?? ast, value[i], itemKey, params);
    }
    return;
  }

  // Handle maps
  if (isMapAST(ast)) {
    const mapValue = value as Record<string, unknown>;
    // Filter out undefined values (allowed in schema for user convenience, dropped on wire)
    const entries = Object.entries(mapValue).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return;

    const { keyAST, valueAST } = getMapKeyValueAST(ast) ?? {};
    const isFlattened = prop ? hasXmlFlattened(prop) : false;

    // Get custom key/value names if specified via xmlName trait on the schema
    const keyName = keyAST ? (getXmlName(keyAST) ?? "key") : "key";
    const valueName = valueAST ? (getXmlName(valueAST) ?? "value") : "value";

    for (let i = 0; i < entries.length; i++) {
      const [k, v] = entries[i];
      // AWS Query format: Key.entry.N.key/value for non-flattened
      // Flattened: Key.N.key/value
      const entryPrefix = isFlattened ? `${key}.${i + 1}` : `${key}.entry.${i + 1}`;
      params.push(
        `${encodeURIComponent(`${entryPrefix}.${keyName}`)}=${encodeURIComponent(String(k))}`,
      );
      serializeValue(valueAST ?? ast, v, `${entryPrefix}.${valueName}`, params);
    }
    return;
  }

  // Handle objects (nested structures)
  if (typeof value === "object") {
    serializeMembers(ast, value as Record<string, unknown>, key, params);
  }
}

// =============================================================================
// XML Deserialization
// =============================================================================

/** What deserializing a value of a schema needs to know about it, read once per schema. */
interface ValuePlan {
  readonly map: boolean;
  readonly array: boolean;
  readonly number: boolean;
  readonly boolean: boolean;
  /** Arrays: the element schema. */
  readonly element: AST.AST | undefined;
  /** Arrays: the element's wrapper tag (xmlName trait, then class identifier). */
  readonly elementTag: string | undefined;
}

const valuePlans = /*@__PURE__*/ new WeakMap<AST.AST, ValuePlan>();

const valuePlanOf = (ast: AST.AST): ValuePlan => {
  let plan = valuePlans.get(ast);
  if (plan === undefined) {
    const map = isMapAST(ast);
    const array = !map && isArrayAST(ast);
    const element = array ? getArrayElementAST(ast) : undefined;
    plan = {
      map,
      array,
      number: isNumberAST(ast),
      boolean: isBooleanAST(ast),
      element,
      elementTag: element ? (getXmlName(element) ?? getIdentifier(element)) : undefined,
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
  if (value == null || value === "") return undefined;
  const plan = valuePlanOf(ast);

  // Handle maps - must check before general object handling
  if (plan.map) {
    return deserializeMap(ast, value);
  }

  // Handle arrays
  if (plan.array) {
    const elAST = plan.element;
    if (!elAST) return Array.isArray(value) ? value : [value];

    // Handle wrapped arrays: { member: [...] } or { Item: [...] }
    const unwrapped = unwrapArrayValue(value, plan.elementTag, MEMBER);

    const items = Array.isArray(unwrapped) ? unwrapped : [unwrapped];
    return items.map((item) => deserializeValue(elAST, item));
  }

  // Handle strings
  if (typeof value === "string") {
    // Dates stay as strings - the codec converts them
    if (plan.number) return Number(value);
    if (plan.boolean) return value.trim() === "true";
    return value;
  }

  // Handle numbers/booleans from parser
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  // Handle objects
  if (typeof value === "object" && !Array.isArray(value)) {
    return deserializeObject(ast, value as Record<string, unknown>);
  }

  return value;
}

/** How one output member is read from its XML element, read from its traits once. */
interface MemberPlan {
  readonly key: string;
  readonly type: AST.AST;
  readonly xmlName: string;
  /** XML attributes: the parser's key for the attribute (`@_name`). */
  readonly attribute: string | undefined;
  /** Lists: the element schema. */
  readonly element: AST.AST | undefined;
  /** Lists: the element's wrapper tag. */
  readonly elementTag: string | undefined;
}

const memberPlans = /*@__PURE__*/ new WeakMap<AST.AST, ReadonlyArray<MemberPlan>>();

const memberPlansOf = (ast: AST.AST): ReadonlyArray<MemberPlan> => {
  let plans = memberPlans.get(ast);
  if (plans === undefined) {
    plans = getEncodedPropertySignatures(ast).map((prop) => {
      const key = String(prop.name);
      const xmlName = getXmlNameProp(prop) ?? key;
      const element = isArrayAST(prop.type)
        ? (getArrayElementAST(prop.type) ?? prop.type)
        : undefined;
      return {
        key,
        type: prop.type,
        xmlName,
        // Handle XML attributes (parser prefixes attributes with @_)
        attribute: hasXmlAttribute(prop) ? `@_${xmlName}` : undefined,
        element,
        elementTag: element ? (getXmlName(element) ?? getIdentifier(element)) : undefined,
      };
    });
    memberPlans.set(ast, plans);
  }
  return plans;
};

function deserializeObject(ast: AST.AST, value: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const member of memberPlansOf(ast)) {
    const key = member.key;

    if (member.attribute !== undefined) {
      const attrValue = value[member.attribute];
      if (attrValue !== undefined) {
        result[key] = deserializeValue(member.type, attrValue);
      }
      continue;
    }

    // Try member name first, then xmlName
    const propValue = value[key] ?? value[member.xmlName];

    if (propValue === undefined) continue;

    // Handle arrays
    if (member.element !== undefined) {
      const elAST = member.element;

      // Handle empty elements - XML parser returns "" for <Tags />
      if (propValue === "" || propValue === null) {
        result[key] = [];
        continue;
      }

      // Unwrap list wrapper elements from XML parser output
      const arrayValue = unwrapArrayValue(propValue, member.elementTag, MEMBER);

      // Handle empty unwrapped arrays or empty objects (no member elements)
      if (
        arrayValue === "" ||
        arrayValue === null ||
        arrayValue === undefined ||
        (typeof arrayValue === "object" &&
          !Array.isArray(arrayValue) &&
          isEmptyObject(arrayValue as object))
      ) {
        result[key] = [];
        continue;
      }

      const items = Array.isArray(arrayValue) ? arrayValue : [arrayValue];
      // Filter out undefined/null items that may come from empty member elements
      result[key] = items
        .filter((item) => item !== undefined && item !== null && item !== "")
        .map((item) => deserializeValue(elAST, item));
    } else {
      result[key] = deserializeValue(member.type, propValue);
    }
  }

  return result;
}

/**
 * Deserialize AWS Query XML map format: <entry><key>K</key><value>V</value></entry>
 * Handles empty values (from self-closing <value /> tags) by converting to empty strings.
 */
function deserializeMap(ast: AST.AST, value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null) return {};

  const { keyAST, valueAST } = getMapKeyValueAST(ast) ?? {};
  const keyName = keyAST ? (getXmlName(keyAST) ?? "key") : "key";
  const valueName = valueAST ? (getXmlName(valueAST) ?? "value") : "value";

  const objValue = value as Record<string, unknown>;
  const entries = objValue.entry ?? objValue.Entry;
  if (entries == null) return {};

  const result: Record<string, unknown> = {};
  const entriesArray = Array.isArray(entries) ? entries : [entries];

  for (const entry of entriesArray) {
    if (!entry || typeof entry !== "object") continue;

    const entryObj = entry as Record<string, unknown>;
    const key = entryObj[keyName] as string | undefined;
    if (key === undefined) continue;

    const val = entryObj[valueName];
    // Empty XML elements (<value />) become undefined/null/"" - convert to empty string
    if (val == null || val === "") {
      result[key] = "";
    } else {
      const deserialized = valueAST ? deserializeValue(valueAST, val) : val;
      result[key] = deserialized ?? "";
    }
  }

  return result;
}
