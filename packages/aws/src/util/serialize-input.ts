/**
 * Input Serialization
 *
 * Binds input values to HTTP request parts (headers, path labels, query
 * params) from the operation descriptor's member bindings.
 */

import {
  membersOf,
  shapeOf,
  specOf,
  timestampFormatOf,
  toText,
  type MemberSpec,
  type Shape,
  type Struct,
} from "@distilled.cloud/core/shape";
import type { Request } from "../client/request.ts";

/** Parse `METHOD /uri` into the request's method and path. */
export function applyHttpTrait(
  http: string | undefined,
  request: Request,
): void {
  if (http === undefined) return;
  const space = http.indexOf(" ");
  request.method = http.slice(0, space);
  request.path = http.slice(space + 1);
}

/** Path label names in a URI template (`{Bucket}`, `{Key+}`). */
export const labelsOf = (http: string | undefined): Set<string> => {
  const labels = new Set<string>();
  if (http === undefined) return labels;
  for (const match of http.matchAll(/\{([^}+]+)\+?\}/g)) labels.add(match[1]!);
  return labels;
};

export interface BoundInput {
  /** The httpPayload member's value, if bound. */
  payloadValue: unknown;
  /** The httpPayload member's name and spec. */
  payloadName: string | undefined;
  payloadSpec: MemberSpec | undefined;
  payloadShape: Shape | undefined;
  /** Members serialized into the body (unbound members). */
  bodyMembers: Record<string, unknown>;
  hasBodyMembers: boolean;
}

/**
 * Bind input values to the request:
 * - header bindings → request.headers (http-date timestamps by default)
 * - path labels → request.path
 * - query bindings / httpQueryParams → request.query (date-time timestamps)
 * - prefix headers → request.headers
 * - the payload member and remaining body members are returned
 */
export function bindInputToRequest(
  struct: Struct | undefined,
  labels: Set<string>,
  input: Record<string, unknown>,
  request: Request,
): BoundInput {
  const bound: BoundInput = {
    payloadValue: undefined,
    payloadName: undefined,
    payloadSpec: undefined,
    payloadShape: undefined,
    bodyMembers: {},
    hasBodyMembers: false,
  };

  // The payload member is found even when unset, so the protocol can pick
  // the body's content type and shape.
  if (struct !== undefined) {
    for (const [name, member] of membersOf(struct)) {
      const spec = specOf(member);
      if (spec?.payload === true) {
        bound.payloadName = name;
        bound.payloadSpec = spec;
        bound.payloadShape = shapeOf(member);
      }
    }
  }

  for (const name in input) {
    const value = input[name];
    if (value === undefined) continue;
    // Closed structure: keys the model doesn't have are dropped
    if (struct !== undefined && !(name in struct)) continue;
    const member = struct?.[name];
    const spec = specOf(member as never);
    const format = timestampFormatOf(shapeOf(member as never));

    if (labels.has(name)) {
      request.path = request.path.replace(
        new RegExp(`\\{${name}\\+?\\}`),
        encodeURIComponent(toText(value, format ?? "date-time")),
      );
    } else if (spec?.header !== undefined) {
      request.headers[spec.header] = Array.isArray(value)
        ? value.map((v) => toText(v, format ?? "http-date")).join(",")
        : toText(value, format ?? "http-date");
    } else if (spec?.query !== undefined) {
      request.query[spec.query] = Array.isArray(value)
        ? value.map((v) => toText(v, format ?? "date-time"))
        : toText(value, format ?? "date-time");
    } else if (spec?.queryParams === true && typeof value === "object") {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (!(k in request.query) && v !== undefined) {
          request.query[k] = v as string | string[];
        }
      }
    } else if (spec?.prefix !== undefined && typeof value === "object") {
      for (const [k, v] of Object.entries(value as Record<string, string>)) {
        // Undefined map values are accepted for convenience, dropped on wire
        if (v !== undefined) request.headers[`${spec.prefix}${k}`] = v;
      }
    } else if (name === bound.payloadName) {
      bound.payloadValue = value;
    } else {
      bound.bodyMembers[name] = value;
      bound.hasBodyMembers = true;
    }
  }

  return bound;
}
