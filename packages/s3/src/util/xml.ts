/**
 * Shared XML utilities for AWS protocols (aws-query, ec2-query, rest-xml)
 */

import { parseXmlSync, XmlParseError, type XmlObject } from "@distilled.cloud/core/xml";
import * as Effect from "effect/Effect";
import type * as AST from "effect/SchemaAST";
import { Unreadable } from "../client/protocol.ts";
import { ParseError } from "../errors.ts";
import { isBooleanAST, isNumberAST } from "./ast.ts";

export {
  escapeXml,
  wrapTag,
  parseXmlSync,
  XmlParseError,
  type XmlObject,
  type XmlValue,
  type XmlParseOptions,
} from "@distilled.cloud/core/xml";

/** Parse XML, failing with the AWS protocol error type. */
export const parseXml = (xml: string): Effect.Effect<XmlObject, ParseError> => {
  const parsed = readXml(xml);
  return parsed instanceof Unreadable ? Effect.fail(parsed.error) : Effect.succeed(parsed);
};

/**
 * A 2xx XML body, parsed; a malformed one is {@link Unreadable} with the
 * `ParseError` {@link parseXml} fails with.
 */
export const readXml = (xml: string): XmlObject | Unreadable => {
  try {
    return parseXmlSync(xml);
  } catch (error) {
    if (error instanceof XmlParseError) {
      return new Unreadable(new ParseError({ message: error.message }), xml);
    }
    throw error;
  }
};

// =============================================================================
// XML Response Helpers
// =============================================================================

/**
 * Extract the root element content from parsed XML.
 * Used by aws-query and ec2-query protocols.
 */
export function extractXmlRoot(parsed: Record<string, unknown>): Record<string, unknown> {
  const responseKey = Object.keys(parsed)[0];
  return responseKey
    ? (parsed[responseKey] as Record<string, unknown>)
    : (parsed as Record<string, unknown>);
}

// =============================================================================
// XML Deserialization Helpers
// =============================================================================

/**
 * Deserialize a primitive string value based on AST type.
 * Converts strings to numbers or booleans as needed.
 * Note: Dates are left as strings - Schema.decode handles the Date transformation.
 */
export function deserializePrimitive(ast: AST.AST, value: string): unknown {
  if (isNumberAST(ast)) return Number(value);
  if (isBooleanAST(ast)) return value.trim() === "true";
  // Dates stay as strings - S.Date (DateFromString) handles the conversion
  return value;
}

/**
 * Unwrap an array value from a wrapper object.
 * XML parsers often produce { member: [...] } instead of just [...].
 *
 * @param value - The value to unwrap
 * @param primaryTag - Primary tag to look for (e.g., from xmlName or identifier)
 * @param fallbackTags - Additional fallback tags to try (e.g., ["member", "item"])
 * @returns The unwrapped array value
 */
export function unwrapArrayValue(
  value: unknown,
  primaryTag: string | undefined,
  fallbackTags: string[] = [],
): unknown {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return value;
  }

  const objValue = value as Record<string, unknown>;

  // Try primary tag first
  if (primaryTag && primaryTag in objValue) {
    return objValue[primaryTag];
  }

  // Try fallback tags
  for (const tag of fallbackTags) {
    if (tag in objValue) {
      return objValue[tag];
    }
  }

  return value;
}
