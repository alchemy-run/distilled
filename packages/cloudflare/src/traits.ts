/**
 * Cloudflare traits - re-exports shared traits and adds Cloudflare-specific ones.
 */
export * from "@distilled.cloud/sdk-core/traits";

import {
  makeAnnotation,
  getAnnotation,
} from "@distilled.cloud/sdk-core/traits";
import * as AST from "effect/SchemaAST";

// =============================================================================
// Cloudflare-specific Traits
// =============================================================================

/** Symbol for error matchers (code + message pattern matching) */
export const errorMatchersSymbol = Symbol.for(
  "@distilled.cloud/cf/error-matchers",
);

export interface ErrorMatcher {
  code?: number;
  status?: number;
  message?: string | { includes: string };
}

/**
 * Apply error matchers directly to a class's AST annotations.
 * Used for TaggedErrorClass where .pipe() on a class returns a schema
 * (not a class), breaking `extends ... .pipe(...)`.
 */
export const applyErrorMatchers = (
  cls: { ast: AST.AST },
  matchers: ErrorMatcher[],
): void => {
  const annotations = cls.ast.annotations as Record<symbol, unknown>;
  annotations[errorMatchersSymbol] = matchers;
};

export const getErrorMatchers = (ast: AST.AST) =>
  getAnnotation<ErrorMatcher[]>(ast, errorMatchersSymbol);

/** Symbol for content type override (e.g., multipart) */
export const contentTypeSymbol = Symbol.for("@distilled.cloud/cf/content-type");

export const ContentType = (type: string) =>
  makeAnnotation(contentTypeSymbol, type);

export const getContentType = (ast: AST.AST) =>
  getAnnotation<string>(ast, contentTypeSymbol);
