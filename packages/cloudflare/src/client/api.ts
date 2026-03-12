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
import * as Stream from "effect/Stream";
import {
  makeAPI,
  type ApiErrorClass,
  type OperationMethod,
  type PaginatedOperationMethod,
} from "@distilled.cloud/core/client";
import {
  paginateCursor,
  paginateSingle,
  paginateWithDefaults,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
import { getPath } from "@distilled.cloud/core/traits";
import {
  CloudflareHttpError,
  HTTP_STATUS_MAP,
  InternalServerError,
  TooManyRequests,
  UnknownCloudflareError,
} from "../errors.ts";
import { Credentials, formatHeaders } from "../credentials.ts";
import { type ErrorMatcher, getErrorMatchers } from "../traits.ts";

// ============================================================================
// Global Cloudflare error codes
// ============================================================================

/**
 * Cloudflare error codes that map to global/default errors regardless of operation.
 * These are infrastructure-level errors that can occur on any endpoint.
 */
const GLOBAL_ERROR_CODE_MAP: Record<number, (message: string) => unknown> = {
  // "Please wait and consider throttling your request speed"
  971: (message) => new TooManyRequests({ message }),
};

/**
 * Create an appropriate error for an HTTP status code.
 *
 * For status codes in HTTP_STATUS_MAP (400, 401, 500, 502, 503, 504, etc.),
 * returns the properly categorized error (with retry categories for 5xx).
 * For unmapped 5xx codes (e.g., Cloudflare-specific 520-530), returns a
 * CloudflareHttpError so the status is preserved.
 */
function httpStatusError(status: number, body?: string): unknown {
  const ErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
  if (ErrorClass) {
    return new ErrorClass({ message: body ?? String(status) });
  }
  // For unmapped 5xx codes (e.g., Cloudflare-specific 520-530), use
  // InternalServerError so they get ServerError + Retryable categories
  if (status >= 500) {
    return new InternalServerError({ message: body ?? String(status) });
  }
  return new CloudflareHttpError({
    status,
    statusText: String(status),
    body,
  });
}

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
  // Handle non-JSON error responses (e.g., HTML from malformed URLs, 520 pages)
  const isNonJsonError =
    typeof errorBody === "object" &&
    errorBody !== null &&
    "_nonJsonError" in errorBody;
  if (isNonJsonError) {
    // For 5xx errors, return a properly categorized error so retries work
    if (status >= 500) {
      return Effect.fail(
        httpStatusError(status, String((errorBody as any).body)),
      );
    }
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
    // For 5xx errors, return a properly categorized error so retries work
    const bodyStr =
      typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody);
    if (status >= 500) {
      return Effect.fail(httpStatusError(status, bodyStr));
    }
    return Effect.fail(
      new CloudflareHttpError({
        status,
        statusText: String(status),
        body: bodyStr,
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

  // Check global error codes before falling through to unknown
  if (errorCode !== undefined && errorCode in GLOBAL_ERROR_CODE_MAP) {
    return Effect.fail(GLOBAL_ERROR_CODE_MAP[errorCode](errorMessage));
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
  getAuthHeaders: formatHeaders,
  matchError,
  ParseError: CloudflareDecodeError as any,
});

const paginatePageByItems: PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  if (!inputToken) {
    return Stream.die(
      new Error("Cloudflare page pagination requires an inputToken"),
    );
  }

  type State = { page: number; done: boolean };
  const startPage =
    typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;

  return Stream.unfold({ page: startPage, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = { ...input, [inputToken]: state.page };
      const response = yield* operation(requestPayload);
      const items =
        pagination.items !== undefined
          ? (getPath(response, pagination.items) as
              | readonly unknown[]
              | undefined)
          : undefined;

      return [
        response,
        {
          page: state.page + 1,
          done: (items ?? []).length === 0,
        },
      ] as const;
    }),
  );
};

const cloudflarePaginate: PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  switch (pagination.mode) {
    case "single":
      return paginateSingle(operation, input, pagination);
    case "page":
      return paginatePageByItems(operation, input, pagination);
    case "cursor":
      return paginateCursor(operation, input, pagination);
    case "token":
    default:
      return paginateWithDefaults(operation, input, pagination);
  }
};

export const make = _API.make;
export const makePaginated = ((
  configFn: any,
  paginateFn?: PaginationStrategy,
) =>
  _API.makePaginated(
    configFn,
    paginateFn ?? cloudflarePaginate,
  )) as typeof _API.makePaginated;
