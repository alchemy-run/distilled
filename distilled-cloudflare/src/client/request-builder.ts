/**
 * Request builder for Cloudflare API.
 *
 * Builds HTTP requests from Effect Schema-annotated input types.
 * Reads trait annotations to determine path, query, header, and body bindings.
 */

import * as AST from "effect/SchemaAST";
import * as Schema from "effect/Schema";
import * as T from "../traits.ts";

export interface ProtocolRequest {
  method: string;
  path: string;
  query: Record<string, string | string[] | undefined>;
  headers: Record<string, string>;
  body?: unknown;
  contentType?: string;
  isFormData?: boolean;
}

/**
 * Build an HTTP request from an input schema and payload.
 *
 * Uses Effect Schema's encode to handle key renaming (fromKey/JsonName)
 * for nested body fields, then categorizes properties by their HTTP trait
 * annotations (path, query, header, body).
 */
export const buildRequest = <I>(
  inputSchema: Schema.Schema<I, unknown>,
  payload: I,
): ProtocolRequest => {
  const ast = inputSchema.ast;

  // Get operation metadata from schema annotations
  const httpOp = T.getHttpOperation(ast);
  if (!httpOp) {
    throw new Error("Input schema missing Http annotation");
  }

  let path = httpOp.path;
  const query: Record<string, string | string[] | undefined> = {};
  const headers: Record<string, string> = {};
  let body: unknown = undefined;
  let contentType: string | undefined = undefined;

  // Encode the payload through the schema to get wire-format keys.
  // This handles all fromKey/JsonName transformations (camelCase → snake_case)
  // for nested body objects automatically.
  const encodedPayload = Schema.encodeSync(inputSchema)(payload);
  const encodedRecord = encodedPayload as Record<string, unknown>;

  // Get struct properties from the encoded (wire) side of the AST.
  // Annotations (HttpPath, HttpQuery, etc.) are on these properties.
  const props = getStructProperties(ast);

  for (const prop of props) {
    const name = String(prop.name);
    const value = encodedRecord[name];

    if (value === undefined || value === null) {
      continue;
    }

    // Check for path parameter
    const pathParam = T.getHttpPath(prop);
    if (pathParam) {
      path = path.replace(`{${pathParam}}`, encodeURIComponent(String(value)));
      continue;
    }

    // Check for query parameter
    const queryParam = T.getHttpQuery(prop);
    if (queryParam) {
      if (Array.isArray(value)) {
        query[queryParam] = value.map(String);
      } else {
        query[queryParam] = String(value);
      }
      continue;
    }

    // Check for header
    const headerName = T.getHttpHeader(prop);
    if (headerName) {
      headers[headerName] = String(value);
      continue;
    }

    // Check for body
    if (T.hasHttpBody(prop)) {
      body = value;
      // Check for custom content type on the body
      const propContentType = T.getHttpContentType(prop);
      if (propContentType) {
        contentType = propContentType;
      }
      // Check if this is FormData
      if (T.hasHttpFormData(prop)) {
        contentType = "multipart/form-data";
      }
      continue;
    }

    // Default: add to body if it's an object property with no annotation.
    // The value is already in wire format (snake_case keys) from encoding.
    if (body === undefined) {
      body = {};
    }
    if (typeof body === "object" && body !== null) {
      (body as Record<string, unknown>)[name] = value;
    }
  }

  // Determine if the body should be included
  // FormData doesn't have enumerable keys, so we need to check for it specifically
  const hasBody =
    body instanceof FormData ||
    (body !== undefined &&
      body !== null &&
      Object.keys(body as object).length > 0);

  return {
    method: httpOp.method,
    path,
    query,
    headers,
    body: hasBody ? body : undefined,
    contentType,
  };
};

/**
 * Extract property signatures from an AST, handling transformations and suspends.
 */
function getStructProperties(ast: AST.AST): AST.PropertySignature[] {
  // Unwrap transformations (S.Class creates these)
  if (ast._tag === "Transformation") {
    return getStructProperties(ast.from);
  }

  // Unwrap suspends
  if (ast._tag === "Suspend") {
    return getStructProperties(ast.f());
  }

  // Get properties from TypeLiteral
  if (ast._tag === "TypeLiteral") {
    return [...ast.propertySignatures];
  }

  return [];
}
