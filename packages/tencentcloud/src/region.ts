/**
 * The region a Tencent Cloud call goes to (`X-TC-Region`).
 *
 * A call picks its region in this order:
 *
 * 1. the call's own `region` member (`CVM.describeInstances({ region })`)
 * 2. the {@link Region} layer for every call in a scope
 *    (`Effect.provide(Region.of("ap-guangzhou"))`)
 * 3. the credentials' `region` (`TENCENTCLOUD_REGION` for
 *    `CredentialsFromEnv`)
 *
 * With none of them the request carries no `X-TC-Region` header, which is
 * what products that are not regional (CAM, DNSPod, SSL, Tag, ...) expect.
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

/** A Tencent Cloud region, e.g. `ap-guangzhou` or `na-siliconvalley`. */
export type RegionName = string;

export class Region
  extends /*@__PURE__*/ Context.Service<Region, RegionName>()("TencentCloud::Region") {}

/** Send every call in a scope to one region, e.g. `Region.of("ap-singapore")`. */
export const of = (region: RegionName): Layer.Layer<Region> => Layer.succeed(Region, region);
