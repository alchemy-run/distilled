// ==========================================================================
// Fact Check Tools API (factchecktools v1alpha1)
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
  name: "factchecktools",
  version: "v1alpha1",
  rootUrl: "https://factchecktools.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor {
  /** Name of the organization that is publishing the fact check. Corresponds to `ClaimReview.author.name`. */
  name?: string;
  /** Corresponds to `ClaimReview.author.image`. */
  imageUrl?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  imageUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1Publisher {
  /** The name of this publisher. For instance, "Awesome Fact Checks". */
  name?: string;
  /** Host-level site name, without the protocol or "www" prefix. For instance, "awesomefactchecks.com". This value of this field is based purely on the claim review URL. */
  site?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1Publisher: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Publisher> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  site: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1Publisher" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Publisher>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview {
  /** The publisher of this claim review. */
  publisher?: GoogleFactcheckingFactchecktoolsV1alpha1Publisher;
  /** The URL of this claim review. */
  url?: string;
  /** The date the claim was reviewed. */
  reviewDate?: string;
  /** The language this review was written in. For instance, "en" or "de". */
  languageCode?: string;
  /** Textual rating. For instance, "Mostly false". */
  textualRating?: string;
  /** The title of this claim review, if it can be determined. */
  title?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview> = Schema.suspend(() => Schema.Struct({
  publisher: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1Publisher),
  url: Schema.optional(Schema.String),
  reviewDate: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  textualRating: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1Claim {
  /** The claim text. For instance, "Crime has doubled in the last 2 years." */
  text?: string;
  /** The date that the claim was made. */
  claimDate?: string;
  /** One or more reviews of this claim (namely, a fact-checking article). */
  claimReview?: Array<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview>;
  /** A person or organization stating the claim. For instance, "John Doe". */
  claimant?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1Claim: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Claim> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  claimDate: Schema.optional(Schema.String),
  claimReview: Schema.optional(Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview)),
  claimant: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1Claim" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Claim>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult {
  /** A claim which matched the query. */
  claim?: GoogleFactcheckingFactchecktoolsV1alpha1Claim;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult> = Schema.suspend(() => Schema.Struct({
  claim: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1Claim),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating {
  /** Corresponds to `ClaimReview.reviewRating.image`. */
  imageUrl?: string;
  /** For numeric ratings, the worst value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.worstRating`. */
  worstRating?: number;
  /** Corresponds to `ClaimReview.reviewRating.ratingExplanation`. */
  ratingExplanation?: string;
  /** The truthfulness rating as a human-readible short word or phrase. Corresponds to `ClaimReview.reviewRating.alternateName`. */
  textualRating?: string;
  /** A numeric rating of this claim, in the range worstRating — bestRating inclusive. Corresponds to `ClaimReview.reviewRating.ratingValue`. */
  ratingValue?: number;
  /** For numeric ratings, the best value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.bestRating`. */
  bestRating?: number;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating> = Schema.suspend(() => Schema.Struct({
  imageUrl: Schema.optional(Schema.String),
  worstRating: Schema.optional(Schema.Number),
  ratingExplanation: Schema.optional(Schema.String),
  textualRating: Schema.optional(Schema.String),
  ratingValue: Schema.optional(Schema.Number),
  bestRating: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor {
  /** Corresponds to `ClaimReview.itemReviewed.author.sameAs`. */
  sameAs?: string;
  /** Corresponds to `ClaimReview.itemReviewed.author.image`. */
  imageUrl?: string;
  /** A person or organization stating the claim. For instance, "John Doe". Corresponds to `ClaimReview.itemReviewed.author.name`. */
  name?: string;
  /** Corresponds to `ClaimReview.itemReviewed.author.jobTitle`. */
  jobTitle?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor> = Schema.suspend(() => Schema.Struct({
  sameAs: Schema.optional(Schema.String),
  imageUrl: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  jobTitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup {
  /** This field is optional, and will default to the page URL. We provide this field to allow you the override the default value, but the only permitted override is the page URL plus an optional anchor link ("page jump"). Corresponds to `ClaimReview.url` */
  url?: string;
  /** A short summary of the claim being evaluated. Corresponds to `ClaimReview.claimReviewed`. */
  claimReviewed?: string;
  /** The location where this claim was made. Corresponds to `ClaimReview.itemReviewed.name`. */
  claimLocation?: string;
  /** A link to a work in which this claim first appears. Corresponds to `ClaimReview.itemReviewed[@type=Claim].firstAppearance.url`. */
  claimFirstAppearance?: string;
  /** Info about the rating of this claim review. */
  rating?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating;
  /** The date when the claim was made or entered public discourse. Corresponds to `ClaimReview.itemReviewed.datePublished`. */
  claimDate?: string;
  /** A list of links to works in which this claim appears, aside from the one specified in `claim_first_appearance`. Corresponds to `ClaimReview.itemReviewed[@type=Claim].appearance.url`. */
  claimAppearances?: Array<string>;
  /** Info about the author of this claim. */
  claimAuthor?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  claimReviewed: Schema.optional(Schema.String),
  claimLocation: Schema.optional(Schema.String),
  claimFirstAppearance: Schema.optional(Schema.String),
  rating: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating),
  claimDate: Schema.optional(Schema.String),
  claimAppearances: Schema.optional(Schema.Array(Schema.String)),
  claimAuthor: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage {
  /** The URL of the page associated with this `ClaimReview` markup. While every individual `ClaimReview` has its own URL field, semantically this is a page-level field, and each `ClaimReview` on this page will use this value unless individually overridden. Corresponds to `ClaimReview.url` */
  pageUrl?: string;
  /** Info about the author of this claim review. Similar to the above, semantically these are page-level fields, and each `ClaimReview` on this page will contain the same values. */
  claimReviewAuthor?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor;
  /** The version ID for this markup. Except for update requests, this field is output-only and should not be set by the user. */
  versionId?: string;
  /** The date when the fact check was published. Similar to the URL, semantically this is a page-level field, and each `ClaimReview` on this page will contain the same value. Corresponds to `ClaimReview.datePublished` */
  publishDate?: string;
  /** The name of this `ClaimReview` markup page resource, in the form of `pages/{page_id}`. Except for update requests, this field is output-only and should not be set by the user. */
  name?: string;
  /** A list of individual claim reviews for this page. Each item in the list corresponds to one `ClaimReview` element. */
  claimReviewMarkups?: Array<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup>;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage> = Schema.suspend(() => Schema.Struct({
  pageUrl: Schema.optional(Schema.String),
  claimReviewAuthor: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor),
  versionId: Schema.optional(Schema.String),
  publishDate: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  claimReviewMarkups: Schema.optional(Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup)),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse {
  /** The list of claims and all of their associated information. */
  claims?: Array<GoogleFactcheckingFactchecktoolsV1alpha1Claim>;
  /** The next pagination token in the Search response. It should be used as the `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse> = Schema.suspend(() => Schema.Struct({
  claims: Schema.optional(Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1Claim)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse {
  /** The result list of pages of `ClaimReview` markup. */
  claimReviewMarkupPages?: Array<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage>;
  /** The next pagination token in the Search response. It should be used as the `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse> = Schema.suspend(() => Schema.Struct({
  claimReviewMarkupPages: Schema.optional(Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse {
  /** The list of claims and all of their associated information. */
  results?: Array<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult>;
  /** The next pagination token in the Search response. It should be used as the `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse" }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchClaimsRequest {
  /** An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result. */
  offset?: number;
  /** The review publisher site to filter results by, e.g. nytimes.com. */
  reviewPublisherSiteFilter?: string;
  /** The pagination token. You may provide the `next_page_token` returned from a previous List request, if any, in order to get the next page. All other fields must have the same values as in the previous request. */
  pageToken?: string;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". Can be used to restrict results by language, though we do not currently consider the region. */
  languageCode?: string;
  /** The maximum age of the returned search results, in days. Age is determined by either claim date or review date, whichever is newer. */
  maxAgeDays?: number;
  /** Textual query string. Required unless `review_publisher_site_filter` is specified. */
  query?: string;
  /** The pagination size. We will return up to that many results. Defaults to 10 if not set. */
  pageSize?: number;
}

export const SearchClaimsRequest = Schema.Struct({
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  reviewPublisherSiteFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("reviewPublisherSiteFilter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  maxAgeDays: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAgeDays")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/claims:search" }),
  svc,
) as unknown as Schema.Schema<SearchClaimsRequest>;

export type SearchClaimsResponse = GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse;
export const SearchClaimsResponse = GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse;

export type SearchClaimsError = DefaultErrors;

/** Search through fact-checked claims. */
export const searchClaims: API.PaginatedOperationMethod<SearchClaimsRequest, SearchClaimsResponse, SearchClaimsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchClaimsRequest,
  output: SearchClaimsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ImageSearchClaimsRequest {
  /** Optional. An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result. */
  offset?: number;
  /** Required. The URI of the source image. This must be a publicly-accessible image HTTP/HTTPS URL. When fetching images from HTTP/HTTPS URLs, Google cannot guarantee that the request will be completed. Your request may fail if the specified host denies the request (e.g. due to request throttling or DOS prevention), or if Google throttles requests to the site for abuse prevention. You should not depend on externally-hosted images for production applications. */
  imageUri?: string;
  /** Optional. The pagination token. You may provide the `next_page_token` returned from a previous List request, if any, in order to get the next page. All other fields must have the same values as in the previous request. */
  pageToken?: string;
  /** Optional. The pagination size. We will return up to that many results. Defaults to 10 if not set. */
  pageSize?: number;
  /** Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". Can be used to restrict results by language, though we do not currently consider the region. */
  languageCode?: string;
}

export const ImageSearchClaimsRequest = Schema.Struct({
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  imageUri: Schema.optional(Schema.String).pipe(T.HttpQuery("imageUri")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/claims:imageSearch" }),
  svc,
) as unknown as Schema.Schema<ImageSearchClaimsRequest>;

export type ImageSearchClaimsResponse = GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse;
export const ImageSearchClaimsResponse = GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse;

export type ImageSearchClaimsError = DefaultErrors;

/** Search through fact-checked claims using an image as the query. */
export const imageSearchClaims: API.PaginatedOperationMethod<ImageSearchClaimsRequest, ImageSearchClaimsResponse, ImageSearchClaimsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ImageSearchClaimsRequest,
  output: ImageSearchClaimsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdatePagesRequest {
  /** The name of this `ClaimReview` markup page resource, in the form of `pages/{page_id}`. Except for update requests, this field is output-only and should not be set by the user. */
  name: string;
  /** Request body */
  body?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
}

export const UpdatePagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1alpha1/pages/{pagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePagesRequest>;

export type UpdatePagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
export const UpdatePagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;

export type UpdatePagesError = DefaultErrors;

/** Update for all `ClaimReview` markup on a page Note that this is a full update. To retain the existing `ClaimReview` markup on a page, first perform a Get operation, then modify the returned markup, and finally call Update with the entire `ClaimReview` markup as the body. */
export const updatePages: API.OperationMethod<UpdatePagesRequest, UpdatePagesResponse, UpdatePagesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePagesRequest,
  output: UpdatePagesResponse,
  errors: [],
}));

export interface ListPagesRequest {
  /** The pagination size. We will return up to that many results. Defaults to 10 if not set. Has no effect if a URL is requested. */
  pageSize?: number;
  /** The organization for which we want to fetch markups for. For instance, "site.com". Cannot be specified along with an URL. */
  organization?: string;
  /** The pagination token. You may provide the `next_page_token` returned from a previous List request, if any, in order to get the next page. All other fields must have the same values as in the previous request. */
  pageToken?: string;
  /** The URL from which to get `ClaimReview` markup. There will be at most one result. If markup is associated with a more canonical version of the URL provided, we will return that URL instead. Cannot be specified along with an organization. */
  url?: string;
  /** An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset, and if the request is not for a specific URL. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result. */
  offset?: number;
}

export const ListPagesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  organization: Schema.optional(Schema.String).pipe(T.HttpQuery("organization")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  url: Schema.optional(Schema.String).pipe(T.HttpQuery("url")),
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/pages" }),
  svc,
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse;
export const ListPagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse;

export type ListPagesError = DefaultErrors;

/** List the `ClaimReview` markup pages for a specific URL or for an organization. */
export const listPages: API.PaginatedOperationMethod<ListPagesRequest, ListPagesResponse, ListPagesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePagesRequest {
  /** Request body */
  body?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
}

export const CreatePagesRequest = Schema.Struct({
  body: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePagesRequest>;

export type CreatePagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
export const CreatePagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;

export type CreatePagesError = DefaultErrors;

/** Create `ClaimReview` markup on a page. */
export const createPages: API.OperationMethod<CreatePagesRequest, CreatePagesResponse, CreatePagesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePagesRequest,
  output: CreatePagesResponse,
  errors: [],
}));

export interface DeletePagesRequest {
  /** The name of the resource to delete, in the form of `pages/{page_id}`. */
  name: string;
}

export const DeletePagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePagesRequest>;

export type DeletePagesResponse = GoogleProtobufEmpty;
export const DeletePagesResponse = GoogleProtobufEmpty;

export type DeletePagesError = DefaultErrors;

/** Delete all `ClaimReview` markup on a page. */
export const deletePages: API.OperationMethod<DeletePagesRequest, DeletePagesResponse, DeletePagesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePagesRequest,
  output: DeletePagesResponse,
  errors: [],
}));

export interface GetPagesRequest {
  /** The name of the resource to get, in the form of `pages/{page_id}`. */
  name: string;
}

export const GetPagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<GetPagesRequest>;

export type GetPagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
export const GetPagesResponse = GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;

export type GetPagesError = DefaultErrors;

/** Get all `ClaimReview` markup on a page. */
export const getPages: API.OperationMethod<GetPagesRequest, GetPagesResponse, GetPagesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetPagesRequest,
  output: GetPagesResponse,
  errors: [],
}));

