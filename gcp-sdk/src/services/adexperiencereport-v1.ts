// ==========================================================================
// Ad Experience Report API (adexperiencereport v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "adexperiencereport",
  version: "v1",
  rootUrl: "https://adexperiencereport.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PlatformSummary {
  /** Whether the site is currently under review on this platform. */
  underReview?: boolean;
  /** The time at which [enforcement](https://support.google.com/webtools/answer/7308033) against the site began or will begin on this platform. Not set when the filter_status is OFF. */
  enforcementTime?: string;
  /** A link to the full Ad Experience Report for the site on this platform.. Not set in ViolatingSitesResponse. Note that you must complete the [Search Console verification process](https://support.google.com/webmasters/answer/9008080) for the site before you can access the full report. */
  reportUrl?: string;
  /** The site's regions on this platform. No longer populated, because there is no longer any semantic difference between sites in different regions. */
  region?: Array<"REGION_UNKNOWN" | "REGION_A" | "REGION_B" | "REGION_C" | (string & {})>;
  /** The site's [enforcement status](https://support.google.com/webtools/answer/7308033) on this platform. */
  filterStatus?: "UNKNOWN" | "ON" | "OFF" | "PAUSED" | "PENDING" | (string & {});
  /** The time at which the site's status last changed on this platform. */
  lastChangeTime?: string;
  /** The site's Ad Experience Report status on this platform. */
  betterAdsStatus?: "UNKNOWN" | "PASSING" | "WARNING" | "FAILING" | (string & {});
}

export const PlatformSummary: Schema.Schema<PlatformSummary> = Schema.suspend(() => Schema.Struct({
  underReview: Schema.optional(Schema.Boolean),
  enforcementTime: Schema.optional(Schema.String),
  reportUrl: Schema.optional(Schema.String),
  region: Schema.optional(Schema.Array(Schema.String)),
  filterStatus: Schema.optional(Schema.String),
  lastChangeTime: Schema.optional(Schema.String),
  betterAdsStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "PlatformSummary" }) as any as Schema.Schema<PlatformSummary>;

export interface SiteSummaryResponse {
  /** The site's Ad Experience Report summary on mobile. */
  mobileSummary?: PlatformSummary;
  /** The name of the reviewed site, e.g. `google.com`. */
  reviewedSite?: string;
  /** The site's Ad Experience Report summary on desktop. */
  desktopSummary?: PlatformSummary;
}

export const SiteSummaryResponse: Schema.Schema<SiteSummaryResponse> = Schema.suspend(() => Schema.Struct({
  mobileSummary: Schema.optional(PlatformSummary),
  reviewedSite: Schema.optional(Schema.String),
  desktopSummary: Schema.optional(PlatformSummary),
})).annotate({ identifier: "SiteSummaryResponse" }) as any as Schema.Schema<SiteSummaryResponse>;

export interface ViolatingSitesResponse {
  /** The list of violating sites. */
  violatingSites?: Array<SiteSummaryResponse>;
}

export const ViolatingSitesResponse: Schema.Schema<ViolatingSitesResponse> = Schema.suspend(() => Schema.Struct({
  violatingSites: Schema.optional(Schema.Array(SiteSummaryResponse)),
})).annotate({ identifier: "ViolatingSitesResponse" }) as any as Schema.Schema<ViolatingSitesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetSitesRequest {
  /** Required. The name of the site whose summary to get, e.g. `sites/http%3A%2F%2Fwww.google.com%2F`. Format: `sites/{site}` */
  name: string;
}

export const GetSitesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/sites/{sitesId}" }),
  svc,
) as unknown as Schema.Schema<GetSitesRequest>;

export type GetSitesResponse = SiteSummaryResponse;
export const GetSitesResponse = SiteSummaryResponse;

export type GetSitesError = DefaultErrors;

/** Gets a site's Ad Experience Report summary. */
export const getSites: API.OperationMethod<GetSitesRequest, GetSitesResponse, GetSitesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetSitesRequest,
  output: GetSitesResponse,
  errors: [],
}));

export interface ListViolatingSitesRequest {
}

export const ListViolatingSitesRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/violatingSites" }),
  svc,
) as unknown as Schema.Schema<ListViolatingSitesRequest>;

export type ListViolatingSitesResponse = ViolatingSitesResponse;
export const ListViolatingSitesResponse = ViolatingSitesResponse;

export type ListViolatingSitesError = DefaultErrors;

/** Lists sites that are failing in the Ad Experience Report on at least one platform. */
export const listViolatingSites: API.OperationMethod<ListViolatingSitesRequest, ListViolatingSitesResponse, ListViolatingSitesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListViolatingSitesRequest,
  output: ListViolatingSitesResponse,
  errors: [],
}));

