/**
 * Jira SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. Jira is plain REST JSON with no
 * success envelope; the REST-protocol traits (SensitiveValue / RawResponse)
 * come from `core/protocol-rest`.
 */
export {
  Body,
  Header,
  IdempotencyToken,
  Query,
  Label,
  Http,
  ResponseCode,
  HttpBody,
  FormDataFile,
  StringEncoded,
  KeyDictionary,
  UnionCases,
  applyErrorMatchers,
  getErrorMatchers,
  type HttpTrait,
  type ErrorMatcher,
  bodySymbol,
  headerSymbol,
  querySymbol,
  labelSymbol,
  httpSymbol,
  responseCodeSymbol,
  httpBodySymbol,
  formDataFileSymbol,
  stringEncodedSymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

// REST protocol traits (sensitive strings, bare-payload and binary responses).
export {
  SensitiveValue,
  BinaryResponse,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";
