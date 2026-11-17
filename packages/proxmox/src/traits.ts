/**
 * Proxmox VE SDK trait surface (hand-written).
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place, plus {@link FamilyKey} for indexed
 * families.
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
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";

import { fromNode, type Lite } from "@distilled.cloud/core/schema-lite-impl";

/**
 * The keys of an indexed family, `<prefix><index>` (`net0`, `net1`, ...).
 * The schema gives no bounds for the index, so the server stays
 * authoritative on which indexes exist.
 */
export const FamilyKey = (prefix: string): Lite => {
  const pattern = new RegExp(`^${prefix}\\d+$`);
  return fromNode({
    _tag: "Declaration",
    typeParameters: [],
    annotations: { identifier: `${prefix}<n>` },
    check: (key) => typeof key === "string" && pattern.test(key),
  });
};
