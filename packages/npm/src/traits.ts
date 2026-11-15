/**
 * npm SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. The npm registry API is plain
 * bearer-REST JSON with no success envelope, so there are no
 * provider-specific traits.
 */
export {
  Body,
  Header,
  Query,
  Label,
  Http,
  ResponseCode,
  HttpBody,
  FormDataFile,
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
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

// Bearer-REST protocol traits (sensitive strings, bare-payload and binary
// responses).
export {
  BinaryResponse,
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  binaryResponseSymbol,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";
