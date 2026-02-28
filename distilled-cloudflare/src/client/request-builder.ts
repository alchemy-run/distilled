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
/**
 * Check if a value is a File or Blob.
 */
function isFileOrBlob(value: unknown): value is File | Blob {
  return value instanceof File || value instanceof Blob;
}

export const buildRequest = <I>(
  inputSchema: Schema.Schema<I>,
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

  // Encode the payload through the schema.
  // Note: In Effect v4, per-property key renaming (fromKey) was removed.
  // Body key remapping is handled via T.JsonName annotations below.
  const encodedPayload = Schema.encodeSync(inputSchema as any)(payload);
  const encodedRecord = encodedPayload as Record<string, unknown>;

  // Get struct properties from the encoded (wire) side of the AST.
  // Annotations (HttpPath, HttpQuery, etc.) are on these properties.
  const props = getStructProperties(ast);

  // Check if this is a multipart operation (from T.Http contentType)
  const isMultipartOp = httpOp.contentType === "multipart";

  // For multipart operations, collect body properties first, then build FormData
  const bodyProps: Array<{
    name: string;
    wireName: string;
    value: unknown;
    prop: AST.PropertySignature;
  }> = [];

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
      // Check if this is FormData
      if (T.hasHttpFormData(prop)) {
        body = value;
        contentType = "multipart/form-data";
      } else {
        // Recursively remap camelCase keys to wire-format (snake_case) using JsonName annotations
        body = remapKeysForEncode(value, prop.type);
      }
      // Check for custom content type on the body
      const propContentType = T.getHttpContentType(prop);
      if (propContentType) {
        contentType = propContentType;
      }
      continue;
    }

    // Collect body properties
    const wireName = T.getJsonName(prop) ?? name;
    bodyProps.push({ name, wireName, value, prop });
  }

  // Build body from collected properties
  if (isMultipartOp && bodyProps.length > 0) {
    // Multipart operation: build a FormData from body properties
    const formData = new FormData();

    for (const { wireName, value } of bodyProps) {
      if (isFileOrBlob(value)) {
        // Single file/blob
        formData.append(
          wireName,
          value,
          value instanceof File ? value.name : wireName,
        );
      } else if (Array.isArray(value) && value.length > 0 && isFileOrBlob(value[0])) {
        // Array of files/blobs
        for (const file of value) {
          if (isFileOrBlob(file)) {
            formData.append(
              file instanceof File ? file.name : wireName,
              file,
              file instanceof File ? file.name : undefined,
            );
          }
        }
      } else if (typeof value === "object" && value !== null) {
        // Object → append as JSON blob
        formData.append(
          wireName,
          new Blob([JSON.stringify(value)], {
            type: "application/json",
          }),
          wireName,
        );
      } else {
        // Primitive → append as string
        formData.append(wireName, String(value));
      }
    }

    body = formData;
    contentType = "multipart/form-data";
  } else {
    // Non-multipart: build plain JSON body as before
    for (const { wireName, value, prop } of bodyProps) {
      if (body === undefined) {
        body = {};
      }
      if (typeof body === "object" && body !== null) {
        // Recursively remap nested object keys to wire-format
        (body as Record<string, unknown>)[wireName] = remapKeysForEncode(
          value,
          prop.type,
        );
      }
    }
  }

  // Determine if the body should be included
  // FormData doesn't have enumerable keys, so we need to check for it specifically
  // Arrays (e.g. empty arrays) are valid bodies even with no enumerable keys
  const hasBody =
    body instanceof FormData ||
    Array.isArray(body) ||
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
 * Recursively remap keys from schema format (camelCase) to wire format (snake_case)
 * using JsonName annotations in the schema AST.
 *
 * This is the inverse of remapKeysForDecode in response-parser.ts.
 */
function remapKeysForEncode(data: unknown, ast: AST.AST): unknown {
  if (data === null || data === undefined || typeof data !== "object") {
    return data;
  }

  // Follow encoding chain
  if (ast.encoding && ast.encoding.length > 0) {
    return remapKeysForEncode(data, ast.encoding[0].to);
  }

  // Unwrap Suspend
  if (ast._tag === "Suspend") {
    return remapKeysForEncode(data, ast.thunk());
  }

  // Handle arrays
  if (Array.isArray(data)) {
    if (ast._tag === "Arrays" && ast.rest.length > 0) {
      return data.map((item) => remapKeysForEncode(item, ast.rest[0]));
    }
    return data;
  }

  // Handle objects (struct schemas)
  if (ast._tag === "Objects") {
    const record = data as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const prop of ast.propertySignatures) {
      const schemaName = String(prop.name);
      const wireName = T.getJsonName(prop) ?? schemaName;
      const value = record[schemaName];

      if (value !== undefined) {
        result[wireName] = remapKeysForEncode(value, prop.type);
      }
    }

    return result;
  }

  // Handle Union types - recurse through to find Objects/Arrays member
  if (ast._tag === "Union") {
    for (const member of ast.types) {
      if (
        member._tag === "Objects" ||
        member._tag === "Union" ||
        member._tag === "Arrays" ||
        (member.encoding && member.encoding.length > 0)
      ) {
        return remapKeysForEncode(data, member);
      }
    }
  }

  return data;
}

/**
 * Extract property signatures from an AST, handling transformations and suspends.
 */
function getStructProperties(ast: AST.AST): AST.PropertySignature[] {
  // v4: Follow encoding chain instead of Transformation
  if (ast.encoding && ast.encoding.length > 0) {
    return getStructProperties(ast.encoding[0].to);
  }

  // Unwrap suspends
  if (ast._tag === "Suspend") {
    return getStructProperties(ast.thunk());
  }

  // Get properties from Objects (v4 renamed from TypeLiteral)
  if (ast._tag === "Objects") {
    return [...ast.propertySignatures];
  }

  return [];
}
