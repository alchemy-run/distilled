// ==========================================================================
// Abusive Experience Report API (abusiveexperiencereport v1)
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
  name: "abusiveexperiencereport",
  version: "v1",
  rootUrl: "https://abusiveexperiencereport.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SiteSummaryResponse {
  /** The name of the reviewed site, e.g. `google.com`. */
  reviewedSite?: string;
  /** The site's [enforcement status](https://support.google.com/webtools/answer/7538608). */
  filterStatus?: "UNKNOWN" | "ON" | "OFF" | "PAUSED" | "PENDING" | (string & {});
  /** The time at which [enforcement](https://support.google.com/webtools/answer/7538608) against the site began or will begin. Not set when the filter_status is OFF. */
  enforcementTime?: string;
  /** Whether the site is currently under review. */
  underReview?: boolean;
  /** The time at which the site's status last changed. */
  lastChangeTime?: string;
  /** The site's Abusive Experience Report status. */
  abusiveStatus?: "UNKNOWN" | "PASSING" | "FAILING" | (string & {});
  /** A link to the full Abusive Experience Report for the site. Not set in ViolatingSitesResponse. Note that you must complete the [Search Console verification process](https://support.google.com/webmasters/answer/9008080) for the site before you can access the full report. */
  reportUrl?: string;
}

export const SiteSummaryResponse: Schema.Schema<SiteSummaryResponse> = Schema.suspend(() => Schema.Struct({
  reviewedSite: Schema.optional(Schema.String),
  filterStatus: Schema.optional(Schema.String),
  enforcementTime: Schema.optional(Schema.String),
  underReview: Schema.optional(Schema.Boolean),
  lastChangeTime: Schema.optional(Schema.String),
  abusiveStatus: Schema.optional(Schema.String),
  reportUrl: Schema.optional(Schema.String),
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

/** Gets a site's Abusive Experience Report summary. */
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

/** Lists sites that are failing in the Abusive Experience Report. */
export const listViolatingSites: API.OperationMethod<ListViolatingSitesRequest, ListViolatingSitesResponse, ListViolatingSitesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListViolatingSitesRequest,
  output: ListViolatingSitesResponse,
  errors: [],
}));

