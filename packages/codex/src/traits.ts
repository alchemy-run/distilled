/**
 * Codex SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. The JSON-RPC protocol reads the same
 * wire-name (`Body`), sensitivity (`SensitiveValue`) and error-matcher traits
 * as the REST protocols.
 */
export {
  Body,
  KeyDictionary,
  UnionCases,
  applyErrorMatchers,
  getErrorMatchers,
  type ErrorMatcher,
  bodySymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

export { SensitiveValue, sensitiveValueSymbol } from "@distilled.cloud/core/protocol-rest";
