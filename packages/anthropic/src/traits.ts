/**
 * Anthropic SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place). Anthropic has no success envelope; the
 * REST-protocol traits (SensitiveValue / RawResponse) come from
 * `core/protocol-rest`, plus `BinaryResponse` for file downloads.
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

export {
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
  BinaryResponse,
  binaryResponseSymbol,
} from "@distilled.cloud/core/protocol-rest";
