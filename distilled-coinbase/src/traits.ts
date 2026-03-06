/**
 * Annotation-based traits for declarative operation definitions.
 *
 * Re-exports core traits from distilled-core plus Coinbase-specific extensions.
 */

// Re-export all core traits
export {
  // Annotation infrastructure
  type Annotation,
  makeAnnotation,
  all,
  // HTTP traits
  httpSymbol,
  type HttpMethod,
  type HttpTrait,
  Http,
  // Path parameter traits
  pathParamSymbol,
  PathParam,
  // Query parameter traits
  queryParamSymbol,
  QueryParam,
  // API error code trait
  apiErrorCodeSymbol,
  ApiErrorCode,
  // Annotation retrieval helpers
  getAnnotation,
  getHttpTrait,
  isPathParam,
  getQueryParam,
  getApiErrorCode,
  getPathParams,
  buildPath,
} from "distilled-core/Traits";

// ============================================================================
// Coinbase-Specific Traits
// ============================================================================

import { makeAnnotation } from "distilled-core/Traits";

/** Symbol for header parameter annotation */
export const headerParamSymbol = Symbol.for("coinbase/header-param");

/**
 * HeaderParam trait - marks a field as a header parameter.
 * The value is the header name.
 */
export const HeaderParam = (name: string) =>
  makeAnnotation(headerParamSymbol, name);

/** Symbol for requiring wallet auth */
export const walletAuthSymbol = Symbol.for("coinbase/wallet-auth");

/**
 * WalletAuth trait - marks an operation as requiring X-Wallet-Auth header.
 */
export const WalletAuth = () => makeAnnotation(walletAuthSymbol, true);

// ============================================================================
// Coinbase-Specific Annotation Retrieval Helpers
// ============================================================================

import * as AST from "effect/SchemaAST";
import { getAnnotation } from "distilled-core/Traits";

/**
 * Get header param name from a PropertySignature.
 */
export const getHeaderParam = (
  prop: AST.PropertySignature,
): string | undefined => {
  return getAnnotation<string>(prop.type, headerParamSymbol);
};

/**
 * Check if an operation requires wallet auth.
 */
export const requiresWalletAuth = (ast: AST.AST): boolean =>
  getAnnotation<boolean>(ast, walletAuthSymbol) === true;
