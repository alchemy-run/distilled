/**
 * OpenAI SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place), the REST-protocol traits
 * (SensitiveValue / RawResponse / BinaryResponse), and OpenAI's own
 * {@link AdminAuth} marker.
 */
import { makeAnnotation } from "@distilled.cloud/core/trait";

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
  BinaryResponse,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
  binaryResponseSymbol,
} from "@distilled.cloud/core/protocol-rest";

export const adminAuthSymbol = Symbol.for("@distilled.cloud/openai/admin-auth");

/**
 * Marks an operation input as an Admin-API call: the protocol authenticates
 * it with the admin key (`OPENAI_ADMIN_KEY`) instead of the API key.
 * Stamped by scripts/generate.ts from the spec's `AdminApiKeyAuth` security.
 */
export const AdminAuth = () => makeAnnotation(adminAuthSymbol, true);
