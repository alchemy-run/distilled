/**
 * Scaleway SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core and extends `Http` with
 * the API host: `scripts/convert.ts` bakes each document's `servers` entry
 * into every operation's `T.Http({ ... baseUrl })` pipe —
 * `https://api.scaleway.com` for everything but Generative APIs, which
 * answer on `https://api.scaleway.ai`. `ScalewayProtocol` reads it.
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
  BinaryResponse,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
  binaryResponseSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * Core `HttpTrait` plus the API host from the OpenAPI `servers` entry; the
 * operation's `uri` (`/instance/v1/zones/{zone}/servers`) is appended by the
 * protocol.
 */
export interface ScalewayHttpTrait extends HttpTrait {
  readonly baseUrl: string;
  /** A `…Raw` file download: the protocol appends `dl=1`. */
  readonly rawDownload?: boolean;
}

/** Operation-level HTTP binding carrying the Scaleway API host. */
export const Http = (trait: ScalewayHttpTrait) => makeAnnotation(httpSymbol, trait);
