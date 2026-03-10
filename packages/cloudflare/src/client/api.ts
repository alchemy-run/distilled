/**
 * Cloudflare API operations factory.
 *
 * This module is imported as `import * as API from "../client/api.ts"` by
 * generated service files so that `API.make()`, `API.OperationMethod`, etc.
 * are all accessible as namespace members.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import {
  makeAPI,
  type ApiErrorClass,
  type OperationMethod,
  type PaginatedOperationMethod,
} from "@distilled.cloud/core/client";
import { CloudflareHttpError, UnknownCloudflareError } from "../errors.ts";
import { Credentials } from "../credentials.ts";
import { type ErrorMatcher, getErrorMatchers } from "../traits.ts";

export type { OperationMethod, PaginatedOperationMethod };

// ============================================================================
// Error matching
// ============================================================================

/**
 * Extract the _tag literal value from a TaggedError schema AST.
 */
function extractTagFromAst(ast: AST.AST): string | undefined {
  if (ast.encoding && ast.encoding.length > 0) {
    return extractTagFromAst(ast.encoding[0].to);
  }
  if (ast._tag === "Objects") {
    const tagProp = ast.propertySignatures.find(
      (p: { name: PropertyKey }) => p.name === "_tag",
    );
    if (
      tagProp &&
      tagProp.type._tag === "Literal" &&
      typeof tagProp.type.literal === "string"
    ) {
      return tagProp.type.literal;
    }
  }
  return undefined;
}

/**
 * Check if an error matches an expression-based matcher.
 */
function matchesExpression(
  matcher: ErrorMatcher,
  code: number | undefined,
  status: number,
  message: string,
): boolean {
  if (matcher.code === undefined && matcher.status === undefined) return false;
  if (matcher.code !== undefined && matcher.code !== code) return false;
  if (matcher.status !== undefined && matcher.status !== status) return false;
  if (matcher.message !== undefined) {
    if (typeof matcher.message === "string") {
      if (matcher.message !== message) return false;
    } else if (matcher.message.includes !== undefined) {
      if (!message.includes(matcher.message.includes)) return false;
    }
  }
  return true;
}

/**
 * Calculate specificity score for a matcher.
 */
function matcherSpecificity(matcher: ErrorMatcher): number {
  let score = 0;
  if (matcher.code !== undefined) score += 1;
  if (matcher.status !== undefined) score += 1;
  if (matcher.message !== undefined) score += 1;
  return score;
}

interface MatchedError {
  schema: Schema.Top;
  tag: string;
}

/**
 * Find matching error schema using annotations from the schema AST.
 */
function findMatchingError(
  errorSchemas: Map<string, Schema.Top>,
  code: number | undefined,
  status: number,
  message: string,
): MatchedError | undefined {
  let bestMatch: MatchedError | undefined;
  let bestScore = 0;

  for (const [name, schema] of errorSchemas) {
    const ast = schema.ast;
    const matchers = getErrorMatchers(ast);
    if (!matchers || matchers.length === 0) continue;

    for (const matcher of matchers) {
      if (matchesExpression(matcher, code, status, message)) {
        const score = matcherSpecificity(matcher);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = { schema, tag: name };
        }
      }
    }
  }

  return bestMatch;
}

/**
 * Match a Cloudflare API error response using per-operation error schemas.
 */
const matchError = (
  status: number,
  errorBody: unknown,
  errors?: readonly ApiErrorClass[],
): Effect.Effect<never, unknown> => {
  // Handle non-JSON error responses (e.g., HTML from malformed URLs)
  const isNonJsonError =
    typeof errorBody === "object" &&
    errorBody !== null &&
    "_nonJsonError" in errorBody;
  if (isNonJsonError) {
    return Effect.fail(
      new CloudflareHttpError({
        status,
        statusText: String(status),
        body: String((errorBody as any).body),
      }),
    );
  }

  // Parse the Cloudflare error envelope
  const envelope =
    typeof errorBody === "object" && errorBody !== null ? errorBody : undefined;
  const cfErrors =
    envelope && "errors" in envelope && Array.isArray((envelope as any).errors)
      ? ((envelope as any).errors as Array<{
          code?: number;
          message?: string;
        }>)
      : undefined;
  const firstError = cfErrors?.[0];
  // Cloudflare sometimes omits the code field entirely (e.g., webhook errors).
  // Treat missing code as 0 (the default) so matchers with { code: 0 } can match.
  const errorCode =
    firstError && typeof firstError.code === "number"
      ? firstError.code
      : firstError
        ? 0
        : undefined;
  const errorMessage = firstError?.message ?? String(status);

  // Check if this is a valid Cloudflare envelope (has success field)
  const isEnvelope =
    envelope && "success" in envelope && (envelope as any).success === false;

  if (!isEnvelope) {
    // Not a Cloudflare envelope — HTTP-level error
    return Effect.fail(
      new CloudflareHttpError({
        status,
        statusText: String(status),
        body:
          typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody),
      }),
    );
  }

  // Build error schema map from the per-operation errors
  if (errors && errors.length > 0) {
    const errorSchemas = new Map<string, Schema.Top>();
    for (const errorSchema of errors) {
      const identifier = extractTagFromAst(
        (errorSchema as unknown as Schema.Top).ast,
      );
      if (identifier) {
        errorSchemas.set(identifier, errorSchema as unknown as Schema.Top);
      }
    }

    const matched = findMatchingError(
      errorSchemas,
      errorCode,
      status,
      errorMessage,
    );

    if (matched) {
      // Decode using the schema - properly instantiates TaggedError classes
      const errorData = {
        _tag: matched.tag,
        code: errorCode ?? 0,
        message: errorMessage,
      };
      return Schema.decodeUnknownEffect(matched.schema)(errorData).pipe(
        Effect.flatMap((decoded: unknown) => Effect.fail(decoded)),
        Effect.catchIf(
          (e: unknown) =>
            typeof e === "object" &&
            e !== null &&
            "_tag" in e &&
            (e as any)._tag === "SchemaError",
          () =>
            Effect.fail(
              new UnknownCloudflareError({
                code: errorCode,
                message: errorMessage,
              }),
            ),
        ),
      ) as Effect.Effect<never, unknown>;
    }
  }

  // No match — return unknown Cloudflare error
  return Effect.fail(
    new UnknownCloudflareError({
      code: errorCode,
      message: errorMessage,
    }),
  );
};

/**
 * Wrap schema decode failures as CloudflareHttpError to match the original's behavior.
 * The original project maps all decode errors to CloudflareHttpError (not a separate parse error type).
 */
class CloudflareDecodeError extends CloudflareHttpError {
  constructor(props: { body: unknown; cause: unknown }) {
    super({
      status: 200,
      statusText: "Schema decode failed",
      body:
        typeof props.body === "string"
          ? props.body
          : JSON.stringify(props.body),
    });
  }
}

const _API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${creds.apiToken}`,
  }),
  matchError,
  ParseError: CloudflareDecodeError as any,
  transformResponse: (body: unknown) => {
    // Cloudflare API wraps responses in { result: <data>, success, errors, messages }
    if (typeof body === "object" && body !== null && "result" in body) {
      // result: null is common for delete operations — treat as empty object
      return (body as any).result ?? {};
    }
    return body;
  },
});

export const make = _API.make;
export const makePaginated = _API.makePaginated;
