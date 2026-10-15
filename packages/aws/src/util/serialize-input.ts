/**
 * Input Serialization
 *
 * Binds input values to HTTP request parts (headers, path labels, query params)
 * based on Smithy HTTP trait annotations.
 */

import type * as AST from "effect/SchemaAST";
import type { Request } from "../client/request.ts";
import {
  getHttpHeader,
  getHttpLabelName,
  getHttpPrefixHeaders,
  getHttpQuery,
  getHttpTrait,
  hasHttpLabel,
  hasHttpPayload,
  hasHttpQueryParams,
} from "../traits.ts";
import { getEncodedPropertySignatures } from "./ast.ts";

/**
 * Percent-encode a URI label value: everything except RFC 3986 unreserved
 * characters, so "/" becomes "%2F" (Smithy / AWS SDK `extendedEncodeURIComponent`).
 */
export const encodeLabel = (value: string): string =>
  encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
  );

/**
 * Encode a greedy `{Label+}` value: each "/"-separated segment is encoded
 * with {@link encodeLabel} and the "/" separators are kept, so an S3 key
 * `a/b c` becomes `a/b%20c` and `/a` becomes `/a`.
 */
export const encodeGreedyLabel = (value: string): string =>
  value.split("/").map(encodeLabel).join("/");

/** The @http trait of each input schema, read once. */
const httpTraits = /*@__PURE__*/ new WeakMap<AST.AST, { trait: ReturnType<typeof getHttpTrait> }>();

/**
 * Apply the @http trait (method, uri) to the request.
 */
export function applyHttpTrait(ast: AST.AST, request: Request): void {
  let cached = httpTraits.get(ast);
  if (cached === undefined) {
    cached = { trait: getHttpTrait(ast) };
    httpTraits.set(ast, cached);
  }
  const httpTrait = cached.trait;
  if (httpTrait) {
    request.method = httpTrait.method;
    request.path = httpTrait.uri;
  }
}

/** How one input member binds to the request, read from its traits once. */
interface MemberBinding {
  readonly name: string;
  readonly type: AST.AST;
  readonly header: string | undefined;
  /** The `{Label}` / `{Label+}` placeholder of an @httpLabel member. */
  readonly label: RegExp | undefined;
  readonly queryParam: string | undefined;
  readonly queryParams: boolean;
  readonly prefixHeaders: string | undefined;
  readonly isPayload: boolean;
}

const bindings = /*@__PURE__*/ new WeakMap<AST.AST, ReadonlyArray<MemberBinding>>();

const bindingsOf = (ast: AST.AST): ReadonlyArray<MemberBinding> => {
  let members = bindings.get(ast);
  if (members === undefined) {
    // Use encoded property signatures - these have wire format keys matching the encoded input
    members = getEncodedPropertySignatures(ast).map((prop) => {
      const name = prop.name as string;
      // Use explicit label name if provided (needed when JsonName differs from URI template placeholder)
      const labelName = getHttpLabelName(prop) ?? name;
      return {
        name,
        type: prop.type,
        header: getHttpHeader(prop),
        label: hasHttpLabel(prop) ? new RegExp(`\\{${labelName}(\\+?)\\}`) : undefined,
        queryParam: getHttpQuery(prop),
        queryParams: hasHttpQueryParams(prop),
        prefixHeaders: getHttpPrefixHeaders(prop),
        isPayload: hasHttpPayload(prop),
      };
    });
    bindings.set(ast, members);
  }
  return members;
};

/**
 * Bind input values to HTTP request based on trait annotations.
 *
 * This processes each input member and:
 * - Adds @httpHeader values to request.headers
 * - Substitutes @httpLabel values in request.path
 * - Adds @httpQuery values to request.query
 * - Adds @httpPrefixHeaders values to request.headers
 * - Collects @httpPayload for body serialization
 * - Collects remaining members as body content
 */
export function bindInputToRequest(ast: AST.AST, input: Record<string, unknown>, request: Request) {
  let payloadValue: unknown = undefined;
  let payloadAst: AST.AST | undefined = undefined;
  const bodyMembers: Record<string, unknown> = {};
  let hasBodyMembers = false;

  for (const member of bindingsOf(ast)) {
    const name = member.name;
    const value = input[name];
    if (value === undefined) continue;

    if (member.header !== undefined) {
      // Value should already be encoded (dates as formatted strings, etc.)
      request.headers[member.header] = String(value);
    } else if (member.label !== undefined) {
      request.path = request.path.replace(member.label, (_, greedy: string) =>
        greedy ? encodeGreedyLabel(String(value)) : encodeLabel(String(value)),
      );
    } else if (member.queryParam !== undefined) {
      // Handle arrays as repeated query parameters (e.g., tagKeys=A&tagKeys=B)
      if (Array.isArray(value)) {
        request.query[member.queryParam] = value.map(String);
      } else {
        request.query[member.queryParam] = String(value);
      }
    } else if (member.queryParams && typeof value === "object") {
      Object.assign(request.query, value);
    } else if (member.prefixHeaders !== undefined && typeof value === "object") {
      for (const [k, v] of Object.entries(value as Record<string, string>)) {
        // Skip undefined values (allowed in schema for user convenience, dropped on wire)
        if (v !== undefined) {
          request.headers[`${member.prefixHeaders}${k}`] = v;
        }
      }
    } else if (member.isPayload) {
      payloadValue = value;
      payloadAst = member.type;
    } else {
      bodyMembers[name] = value;
      hasBodyMembers = true;
    }
  }

  return { payloadValue, payloadAst, bodyMembers, hasBodyMembers };
}
