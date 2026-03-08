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
  message?: string;
}

/**
 * Apply error matchers to an error class.
 * Used to match Cloudflare API error responses to typed error classes.
 */
export const applyErrorMatchers = (matchers: ErrorMatcher[]) =>
  makeAnnotation(errorMatchersSymbol, matchers);

export const getErrorMatchers = (ast: AST.AST) =>
  getAnnotation<ErrorMatcher[]>(ast, errorMatchersSymbol);

/** Symbol for content type override (e.g., multipart) */
export const contentTypeSymbol = Symbol.for("@distilled.cloud/cf/content-type");

export const ContentType = (type: string) =>
  makeAnnotation(contentTypeSymbol, type);

export const getContentType = (ast: AST.AST) =>
  getAnnotation<string>(ast, contentTypeSymbol);
