// ==========================================================================
// versionhistory.googleapis.com API (versionhistory v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "versionhistory",
  version: "v1",
  rootUrl: "https://versionhistory.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Platform {
  /** Platform name. Format is "{product}/platforms/{platform}" */
  name?: string;
  /** Type of platform. */
  platformType?: "PLATFORM_TYPE_UNSPECIFIED" | "WIN" | "WIN64" | "MAC" | "LINUX" | "ANDROID" | "WEBVIEW" | "IOS" | "ALL" | "MAC_ARM64" | "LACROS" | "LACROS_ARM32" | "CHROMEOS" | "LACROS_ARM64" | "FUCHSIA" | "WIN_ARM64" | (string & {});
}

export const Platform: Schema.Schema<Platform> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  platformType: Schema.optional(Schema.String),
})).annotate({ identifier: "Platform" }) as any as Schema.Schema<Platform>;

export interface ListPlatformsResponse {
  /** The list of platforms. */
  platforms?: Array<Platform>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPlatformsResponse: Schema.Schema<ListPlatformsResponse> = Schema.suspend(() => Schema.Struct({
  platforms: Schema.optional(Schema.Array(Platform)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPlatformsResponse" }) as any as Schema.Schema<ListPlatformsResponse>;

export interface Channel {
  /** Channel name. Format is "{product}/platforms/{platform}/channels/{channel}" */
  name?: string;
  /** Type of channel. */
  channelType?: "CHANNEL_TYPE_UNSPECIFIED" | "STABLE" | "BETA" | "DEV" | "CANARY" | "CANARY_ASAN" | "ALL" | "EXTENDED" | "LTS" | "LTC" | (string & {});
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  channelType: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface ListChannelsResponse {
  /** The list of channels. */
  channels?: Array<Channel>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListChannelsResponse: Schema.Schema<ListChannelsResponse> = Schema.suspend(() => Schema.Struct({
  channels: Schema.optional(Schema.Array(Channel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListChannelsResponse" }) as any as Schema.Schema<ListChannelsResponse>;

export interface Version {
  /** Version name. Format is "{product}/platforms/{platform}/channels/{channel}/versions/{version}" e.g. "chrome/platforms/win/channels/beta/versions/84.0.4147.38" */
  name?: string;
  /** String containing just the version number. e.g. "84.0.4147.38" */
  version?: string;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface ListVersionsResponse {
  /** The list of versions. */
  versions?: Array<Version>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  versions: Schema.optional(Schema.Array(Version)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVersionsResponse" }) as any as Schema.Schema<ListVersionsResponse>;

export interface Interval {
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface RolloutData {
  /** The name of the rollout. */
  rolloutName?: string;
  /** Tags associated with a release's role in a rollout. Most rollouts will have at least one release with a "rollout" tag and another release with a "control" tag. Some rollouts may have additional named arms. */
  tag?: Array<string>;
}

export const RolloutData: Schema.Schema<RolloutData> = Schema.suspend(() => Schema.Struct({
  rolloutName: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RolloutData" }) as any as Schema.Schema<RolloutData>;

export interface Release {
  /** Release name. Format is "{product}/platforms/{platform}/channels/{channel}/versions/{version}/releases/{release}" */
  name?: string;
  /** Timestamp interval of when the release was live. If end_time is unspecified, the release is currently live. */
  serving?: Interval;
  /** Rollout fraction. This fraction indicates the fraction of people that should receive this version in this release. If the fraction is not specified in ReleaseManager, the API will assume fraction is 1. */
  fraction?: number;
  /** String containing just the version number. e.g. "84.0.4147.38" */
  version?: string;
  /** Rollout fraction group. Only fractions with the same fraction_group are statistically comparable: there may be non-fractional differences between different fraction groups. */
  fractionGroup?: string;
  /** Whether or not the release was available for version pinning. */
  pinnable?: boolean;
  /** Rollout-related metadata. Some releases are part of one or more A/B rollouts. This field contains the names and data describing this release's role in any rollouts. */
  rolloutData?: Array<RolloutData>;
}

export const Release: Schema.Schema<Release> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serving: Schema.optional(Interval),
  fraction: Schema.optional(Schema.Number),
  version: Schema.optional(Schema.String),
  fractionGroup: Schema.optional(Schema.String),
  pinnable: Schema.optional(Schema.Boolean),
  rolloutData: Schema.optional(Schema.Array(RolloutData)),
})).annotate({ identifier: "Release" }) as any as Schema.Schema<Release>;

export interface ListReleasesResponse {
  /** The list of releases. */
  releases?: Array<Release>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListReleasesResponse: Schema.Schema<ListReleasesResponse> = Schema.suspend(() => Schema.Struct({
  releases: Schema.optional(Schema.Array(Release)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReleasesResponse" }) as any as Schema.Schema<ListReleasesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns list of platforms that are available for a given product. The resource "product" has no resource name in its name. */
export interface ListPlatformsRequest {
  /** Required. The product, which owns this collection of platforms. Format: {product} */
  parent: string;
  /** Optional. Optional limit on the number of channels to include in the response. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListChannels` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListPlatformsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/platforms" }),
  svc,
) as unknown as Schema.Schema<ListPlatformsRequest>;

export type ListPlatformsResponse_Op = ListPlatformsResponse;
export const ListPlatformsResponse_Op = ListPlatformsResponse;

export type ListPlatformsError = CommonErrors;

export const listPlatforms = API.makePaginated(() => ({
  input: ListPlatformsRequest,
  output: ListPlatformsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns list of channels that are available for a given platform. */
export interface ListPlatformsChannelsRequest {
  /** Required. The platform, which owns this collection of channels. Format: {product}/platforms/{platform} */
  parent: string;
  /** Optional. Optional limit on the number of channels to include in the response. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListChannels` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListPlatformsChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/platforms/{platformsId}/channels" }),
  svc,
) as unknown as Schema.Schema<ListPlatformsChannelsRequest>;

export type ListPlatformsChannelsResponse = ListChannelsResponse;
export const ListPlatformsChannelsResponse = ListChannelsResponse;

export type ListPlatformsChannelsError = CommonErrors;

export const listPlatformsChannels = API.makePaginated(() => ({
  input: ListPlatformsChannelsRequest,
  output: ListPlatformsChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns list of version for the given platform/channel. */
export interface ListPlatformsChannelsVersionsRequest {
  /** Required. The channel, which owns this collection of versions. Format: {product}/platforms/{platform}/channels/{channel} */
  parent: string;
  /** Optional. Optional limit on the number of versions to include in the response. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListVersions` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Ordering string. Valid order_by strings are "version", "name", "platform", and "channel". Optionally, you can append " desc" or " asc" to specify the sorting order. Multiple order_by strings can be used in a comma separated list. Ordering by channel will sort by distance from the stable channel (not alphabetically). A list of channels sorted in this order is: stable, beta, dev, canary, and canary_asan. Sorting by name may cause unexpected behaviour as it is a naive string sort. For example, 1.0.0.8 will be before 1.0.0.10 in descending order. If order_by is not specified the response will be sorted by version in descending order. Ex) "...?order_by=version asc" Ex) "...?order_by=platform desc, channel, version" */
  orderBy?: string;
  /** Optional. Filter string. Format is a comma separated list of All comma separated filter clauses are conjoined with a logical "and". Valid field_names are "version", "name", "platform", and "channel". Valid operators are "<", "<=", "=", ">=", and ">". Channel comparison is done by distance from stable. Ex) stable < beta, beta < dev, canary < canary_asan. Version comparison is done numerically. If version is not entirely written, the version will be appended with 0 in missing fields. Ex) version > 80 becoms version > 80.0.0.0 Name and platform are filtered by string comparison. Ex) "...?filter=channel<=beta, version >= 80 Ex) "...?filter=version > 80, version < 81 */
  filter?: string;
}

export const ListPlatformsChannelsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/platforms/{platformsId}/channels/{channelsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListPlatformsChannelsVersionsRequest>;

export type ListPlatformsChannelsVersionsResponse = ListVersionsResponse;
export const ListPlatformsChannelsVersionsResponse = ListVersionsResponse;

export type ListPlatformsChannelsVersionsError = CommonErrors;

export const listPlatformsChannelsVersions = API.makePaginated(() => ({
  input: ListPlatformsChannelsVersionsRequest,
  output: ListPlatformsChannelsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns list of releases of the given version. */
export interface ListPlatformsChannelsVersionsReleasesRequest {
  /** Required. The version, which owns this collection of releases. Format: {product}/platforms/{platform}/channels/{channel}/versions/{version} */
  parent: string;
  /** Optional. Optional limit on the number of releases to include in the response. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListReleases` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Ordering string. Valid order_by strings are "version", "name", "starttime", "endtime", "platform", "channel", and "fraction". Optionally, you can append "desc" or "asc" to specify the sorting order. Multiple order_by strings can be used in a comma separated list. Ordering by channel will sort by distance from the stable channel (not alphabetically). A list of channels sorted in this order is: stable, beta, dev, canary, and canary_asan. Sorting by name may cause unexpected behaviour as it is a naive string sort. For example, 1.0.0.8 will be before 1.0.0.10 in descending order. If order_by is not specified the response will be sorted by starttime in descending order. Ex) "...?order_by=starttime asc" Ex) "...?order_by=platform desc, channel, startime desc" */
  orderBy?: string;
  /** Optional. Filter string. Format is a comma separated list of All comma separated filter clauses are conjoined with a logical "and". Valid field_names are "version", "name", "platform", "channel", "fraction" "starttime", and "endtime". Valid operators are "<", "<=", "=", ">=", and ">". Channel comparison is done by distance from stable. must be a valid channel when filtering by channel. Ex) stable < beta, beta < dev, canary < canary_asan. Version comparison is done numerically. Ex) 1.0.0.8 < 1.0.0.10. If version is not entirely written, the version will be appended with 0 for the missing fields. Ex) version > 80 becoms version > 80.0.0.0 When filtering by starttime or endtime, string must be in RFC 3339 date string format. Name and platform are filtered by string comparison. Ex) "...?filter=channel<=beta, version >= 80 Ex) "...?filter=version > 80, version < 81 Ex) "...?filter=starttime>2020-01-01T00:00:00Z */
  filter?: string;
}

export const ListPlatformsChannelsVersionsReleasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/platforms/{platformsId}/channels/{channelsId}/versions/{versionsId}/releases" }),
  svc,
) as unknown as Schema.Schema<ListPlatformsChannelsVersionsReleasesRequest>;

export type ListPlatformsChannelsVersionsReleasesResponse = ListReleasesResponse;
export const ListPlatformsChannelsVersionsReleasesResponse = ListReleasesResponse;

export type ListPlatformsChannelsVersionsReleasesError = CommonErrors;

export const listPlatformsChannelsVersionsReleases = API.makePaginated(() => ({
  input: ListPlatformsChannelsVersionsReleasesRequest,
  output: ListPlatformsChannelsVersionsReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

