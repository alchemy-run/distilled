/**
 * STACKIT SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core and extends `Http` with
 * the per-product base URL: every STACKIT service has its own host (from
 * its OpenAPI `servers` entry), which `scripts/convert.ts` bakes into each
 * operation's `T.Http({ ... baseUrl })` pipe. `StackitProtocol` reads it
 * and applies the configured region.
 */
import { httpSymbol, makeAnnotation, type HttpTrait } from "@distilled.cloud/core/trait";

export {
  Body,
  Header,
  Query,
  Label,
  HttpBody,
  FormDataFile,
  KeyDictionary,
  UnionCases,
  ResponseCode,
  applyErrorMatchers,
  getErrorMatchers,
  makeAnnotation,
  type ErrorMatcher,
  type HttpTrait,
  bodySymbol,
  headerSymbol,
  querySymbol,
  labelSymbol,
  httpSymbol,
  httpBodySymbol,
  formDataFileSymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  responseCodeSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

export {
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * Core `HttpTrait` plus the product host from the OpenAPI `servers` entry.
 *
 * `baseUrl` is the spec URL (possibly still containing `{region}`); the
 * operation's `uri` is the path template and is appended by the protocol.
 */
export interface StackitHttpTrait extends HttpTrait {
  readonly baseUrl: string;
}

/** Operation-level HTTP binding carrying the STACKIT per-product base URL. */
export const Http = (trait: StackitHttpTrait) => makeAnnotation(httpSymbol, trait);
