/**
 * Tencent Cloud SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place, plus {@link Action}: the API 3.0 routing
 * every operation's input carries.
 */
import { makeAnnotation } from "@distilled.cloud/core/trait";

export {
  Body,
  Header,
  Query,
  Label,
  Http,
  HttpBody,
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
  httpBodySymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

export { SensitiveValue, sensitiveValueSymbol } from "@distilled.cloud/core/protocol-rest";

/** Where an API 3.0 call goes and what it calls. */
export interface ActionTrait {
  /** Product service name: the host's first label and the TC3 signing scope (`cvm`). */
  readonly service: string;
  /** `X-TC-Version`, e.g. `2017-03-12`. */
  readonly version: string;
  /** `X-TC-Action`, e.g. `DescribeInstances`. */
  readonly action: string;
}

export const actionSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/tencentcloud/action");

/**
 * Operation routing, stamped on the input schema: the call is
 * `POST https://<service>.tencentcloudapi.com/` with `X-TC-Action` and
 * `X-TC-Version` set from the trait.
 */
export const Action = (trait: ActionTrait) => makeAnnotation(actionSymbol, trait);
