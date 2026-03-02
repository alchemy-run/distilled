/**
 * Builds HTTP requests from annotated Effect schemas.
 *
 * Reads trait annotations from the schema AST to categorize each property:
 * - T.HttpPath("name") -> substitutes into URL path template
 * - T.HttpQuery("name") -> adds to query string
 * - T.HttpHeader("name") -> adds to headers
 * - remaining properties -> become JSON body
 */

import type * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import * as T from "../traits.ts";

export interface BuiltRequest {
  method: string;
  path: string;
  query: Record<string, string | string[] | undefined>;
  headers: Record<string, string>;
  body?: unknown;
}

/**
 * Build an HTTP request from an annotated input schema and payload.
 */
export function buildRequest<I extends Schema.Top>(
  inputSchema: I,
  payload: unknown,
): BuiltRequest {
  const ast = inputSchema.ast;
  const httpOp = T.getHttpOperation(ast);

  if (!httpOp) {
    throw new Error("Input schema missing T.Http annotation");
  }

  const data = payload as Record<string, unknown>;
  const pathParams: Record<string, string> = {};
  const queryParams: Record<string, string | string[] | undefined> = {};
  const headers: Record<string, string> = {};
  const bodyFields: Record<string, unknown> = {};

  // Walk the schema's property signatures to categorize each property
  const props = getPropertySignatures(ast);

  for (const prop of props) {
    const name = prop.name as string;
    const value = data[name];

    if (value === undefined) continue;

    const pathName = T.getHttpPath(prop);
    if (pathName) {
      pathParams[pathName] = String(value);
      continue;
    }

    const queryName = T.getHttpQuery(prop);
    if (queryName) {
      if (Array.isArray(value)) {
        queryParams[queryName] = value.map(String);
      } else {
        queryParams[queryName] = String(value);
      }
      continue;
    }

    const headerName = T.getHttpHeader(prop);
    if (headerName) {
      headers[headerName] = String(value);
      continue;
    }

    if (T.hasHttpBody(prop)) {
      // Entire property is the body
      return {
        method: httpOp.method,
        path: expandPath(httpOp.path, pathParams),
        query: queryParams,
        headers,
        body: value,
      };
    }

    // Default: goes into JSON body
    const wireName = T.getJsonName(prop) ?? name;
    bodyFields[wireName] = value;
  }

  // Build path with URI template expansion
  const path = expandPath(httpOp.path, pathParams);

  // Construct body (only if there are body fields and method supports body)
  const hasBody =
    httpOp.hasBody !== false &&
    (httpOp.method === "POST" ||
      httpOp.method === "PUT" ||
      httpOp.method === "PATCH");
  const body =
    hasBody && Object.keys(bodyFields).length > 0 ? bodyFields : undefined;

  return { method: httpOp.method, path, query: queryParams, headers, body };
}

/**
 * Expand a URI template path with variable values.
 *
 * GCP uses URI Template v04 syntax:
 * - {var} - simple variable
 * - {+var} - reserved expansion (no percent-encoding of /)
 */
function expandPath(
  template: string,
  params: Record<string, string>,
): string {
  return template.replace(/\{(\+?)([^}]+)\}/g, (_match, _plus, name) => {
    const value = params[name];
    if (value === undefined) {
      return `{${_plus}${name}}`;
    }
    // For {+var}, don't encode slashes
    if (_plus === "+") {
      return value;
    }
    return encodeURIComponent(value);
  });
}

/**
 * Get property signatures from a schema AST, unwrapping Suspend and encoding.
 */
function getPropertySignatures(ast: AST.AST): AST.PropertySignature[] {
  // Follow Suspend
  if (ast._tag === "Suspend") {
    return getPropertySignatures(ast.thunk());
  }

  // Follow encoding chain
  if (ast.encoding && ast.encoding.length > 0) {
    return getPropertySignatures(ast.encoding[0].to);
  }

  // Objects (v4 renamed from TypeLiteral)
  if (ast._tag === "Objects") {
    return ast.propertySignatures as AST.PropertySignature[];
  }

  return [];
}
