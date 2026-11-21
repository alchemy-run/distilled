/**
 * HydraDB SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. HydraDB speaks JSON REST (and
 * multipart/form-data on `ingestContext`); the protocol unwraps the
 * `{ success, data, error, meta }` envelope (see `protocol.ts`), so there are
 * no provider-specific traits.
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

// REST protocol traits (sensitive strings, bare-payload responses).
export {
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";
