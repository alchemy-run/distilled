/**
 * Parses GCP API responses, handles error matching.
 *
 * GCP API error format:
 * {
 *   error: {
 *     code: 404,
 *     message: "The resource ... was not found",
 *     status: "NOT_FOUND",
 *     errors: [{ message: "...", domain: "global", reason: "notFound" }],
 *     details: [{ "@type": "...", ... }]
 *   }
 * }
 *
 * Success responses are the JSON body directly (no envelope).
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import {
  GCPHttpError,
  GCPNetworkError,
  UnknownGCPError,
} from "../errors.ts";
import * as T from "../traits.ts";

interface GCPErrorResponse {
  error: {
    code: number;
    message: string;
    status: string;
    errors?: Array<{
      message: string;
      domain: string;
      reason: string;
    }>;
    details?: Array<Record<string, unknown>>;
  };
}

interface ParsedResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: ReadableStream<Uint8Array>;
}

/**
 * Parse a GCP API response.
 *
 * - 2xx: decode body with output schema
 * - 4xx/5xx: parse error body, match against error schemas
 */
export const parseResponse = <O extends Schema.Top>(
  response: ParsedResponse,
  outputSchema: O,
  errorSchemas: Map<string, Schema.Top>,
): Effect.Effect<
  Schema.Schema.Type<O>,
  UnknownGCPError | GCPNetworkError | GCPHttpError,
  O["DecodingServices"]
> =>
  Effect.gen(function* () {
    // Read body bytes
    const bodyBytes = yield* Effect.tryPromise({
      try: async () => {
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let done = false;

        while (!done) {
          const result = await reader.read();
          if (result.value) chunks.push(result.value);
          done = result.done;
        }

        const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
        const merged = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          merged.set(chunk, offset);
          offset += chunk.length;
        }

        return merged;
      },
      catch: (error) =>
        new GCPNetworkError({
          message: "Failed to read response body",
          cause: error,
        }),
    });

    const bodyText = new TextDecoder().decode(bodyBytes);

    // Handle success responses (2xx)
    if (response.status >= 200 && response.status < 300) {
      // Empty body (204 No Content, etc.)
      if (!bodyText || bodyText.trim() === "") {
        return yield* Schema.decodeUnknownEffect(outputSchema)({}).pipe(
          Effect.mapError(
            (error) =>
              new UnknownGCPError({
                message: `Failed to decode empty response: ${String(error)}`,
              }),
          ),
        );
      }

      let json: unknown;
      try {
        json = JSON.parse(bodyText);
      } catch {
        return yield* Effect.fail(
          new GCPHttpError({
            status: response.status,
            statusText: response.statusText,
            body: bodyText,
          }),
        );
      }

      return yield* Schema.decodeUnknownEffect(outputSchema)(json).pipe(
        Effect.mapError(
          (error) =>
            new UnknownGCPError({
              message: `Failed to decode response: ${String(error)}`,
              code: response.status,
            }),
        ),
      );
    }

    // Handle error responses (4xx/5xx)
    let errorData: GCPErrorResponse | undefined;
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed && typeof parsed === "object" && "error" in parsed) {
        errorData = parsed as GCPErrorResponse;
      }
    } catch {
      // Not JSON - return raw HTTP error
      return yield* Effect.fail(
        new GCPHttpError({
          status: response.status,
          statusText: response.statusText,
          body: bodyText,
        }),
      );
    }

    if (!errorData) {
      return yield* Effect.fail(
        new GCPHttpError({
          status: response.status,
          statusText: response.statusText,
          body: bodyText,
        }),
      );
    }

    const gcpError = errorData.error;
    const reason = gcpError.errors?.[0]?.reason;
    const domain = gcpError.errors?.[0]?.domain;

    // Try to match against registered error schemas
    const matchedError = findMatchingError(
      errorSchemas,
      gcpError.code,
      gcpError.status,
      reason,
      domain,
      gcpError.message,
    );

    if (matchedError) {
      const { schema, _tag } = matchedError;
      const errorPayload = {
        _tag,
        code: gcpError.code,
        message: gcpError.message,
        status: gcpError.status,
        reason,
        domain,
      };

      return yield* Schema.decodeUnknownEffect(schema)(errorPayload).pipe(
        Effect.flatMap((decoded) => Effect.fail(decoded as any)),
        Effect.catch(() =>
          Effect.fail(
            new UnknownGCPError({
              code: gcpError.code,
              message: gcpError.message,
              status: gcpError.status,
              reason,
              domain,
              errorData: gcpError,
            }),
          ),
        ),
      );
    }

    // No match - return UnknownGCPError
    return yield* Effect.fail(
      new UnknownGCPError({
        code: gcpError.code,
        message: gcpError.message,
        status: gcpError.status,
        reason,
        domain,
        errorData: gcpError,
      }),
    );
  });

/**
 * Find the best matching error schema based on GCP error properties.
 */
function findMatchingError(
  errorSchemas: Map<string, Schema.Top>,
  httpStatus: number,
  status: string | undefined,
  reason: string | undefined,
  domain: string | undefined,
  message: string | undefined,
): { schema: Schema.Top; _tag: string } | undefined {
  let bestMatch: { schema: Schema.Top; _tag: string; score: number } | undefined;

  for (const [tag, schema] of errorSchemas) {
    const matchers = T.getHttpErrorMatchers(schema.ast);
    if (!matchers) continue;

    for (const matcher of matchers) {
      let score = 0;
      let matched = true;

      // Check httpStatus
      if (matcher.httpStatus !== undefined) {
        if (matcher.httpStatus === httpStatus) {
          score += 1;
        } else {
          matched = false;
          continue;
        }
      }

      // Check gRPC status
      if (matcher.status !== undefined) {
        if (matcher.status === status) {
          score += 1;
        } else {
          matched = false;
          continue;
        }
      }

      // Check reason
      if (matcher.reason !== undefined) {
        if (matcher.reason === reason) {
          score += 2; // Reason is most specific
        } else {
          matched = false;
          continue;
        }
      }

      // Check domain
      if (matcher.domain !== undefined) {
        if (matcher.domain === domain) {
          score += 1;
        } else {
          matched = false;
          continue;
        }
      }

      // Check message
      if (matcher.message !== undefined) {
        if (message) {
          if (
            matcher.message.includes &&
            message.includes(matcher.message.includes)
          ) {
            score += 1;
          } else if (
            matcher.message.matches &&
            new RegExp(matcher.message.matches).test(message)
          ) {
            score += 1;
          } else {
            matched = false;
            continue;
          }
        } else {
          matched = false;
          continue;
        }
      }

      if (matched && score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { schema, _tag: tag, score };
      }
    }
  }

  return bestMatch;
}

/**
 * Extract the _tag literal value from a TaggedError schema AST.
 */
export function extractTagFromAst(ast: AST.AST): string | undefined {
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
