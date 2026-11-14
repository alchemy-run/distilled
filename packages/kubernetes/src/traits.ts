/**
 * Kubernetes SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place). Kubernetes has no response envelope of
 * its own; the REST-protocol traits (SensitiveValue / RawResponse) come from
 * `core/protocol-rest`.
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
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * A resource field in a patch operation's input: every nested field is
 * optional, and `null` removes it (JSON merge patch, RFC 7396). The same
 * shape serves a strategic merge patch and a server-side apply, where the
 * object names only the fields the caller sets.
 */
export type MergePatch<T> =
  T extends ReadonlyArray<infer U>
    ? ReadonlyArray<MergePatch<U>>
    : T extends string | number | boolean | bigint | Uint8Array | Date
      ? T
      : T extends object
        ? { [K in keyof T]?: MergePatch<T[K]> | null }
        : T;
