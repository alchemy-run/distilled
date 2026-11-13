/**
 * Fly.io SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. REST services use the bare-payload and
 * sensitive-value traits.
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

export {
  RawResponse,
  RawResponseRoot,
  SensitiveValue,
  rawResponseSymbol,
  rawResponseRootSymbol,
  sensitiveValueSymbol,
} from "@distilled.cloud/core/protocol-rest";
