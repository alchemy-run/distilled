/**
 * Microsoft Graph SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. Graph speaks plain bearer-REST JSON with no
 * success envelope, so there are no provider-specific traits.
 */
export {
  Body,
  Header,
  Query,
  CommaDelimited,
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
  commaDelimitedSymbol,
  labelSymbol,
  httpSymbol,
  responseCodeSymbol,
  httpBodySymbol,
  formDataFileSymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

// Bearer-REST protocol traits (sensitive strings, bare-payload responses).
export {
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";
