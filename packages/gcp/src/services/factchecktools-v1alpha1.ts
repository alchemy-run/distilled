// ==========================================================================
// Fact Check Tools API (factchecktools v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
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

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating {
  /** The truthfulness rating as a human-readible short word or phrase. Corresponds to `ClaimReview.reviewRating.alternateName`. */
  textualRating?: string;
  /** For numeric ratings, the best value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.bestRating`. */
  bestRating?: number;
  /** Corresponds to `ClaimReview.reviewRating.ratingExplanation`. */
  ratingExplanation?: string;
  /** For numeric ratings, the worst value possible in the scale from worst to best. Corresponds to `ClaimReview.reviewRating.worstRating`. */
  worstRating?: number;
  /** A numeric rating of this claim, in the range worstRating — bestRating inclusive. Corresponds to `ClaimReview.reviewRating.ratingValue`. */
  ratingValue?: number;
  /** Corresponds to `ClaimReview.reviewRating.image`. */
  imageUrl?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textualRating: Schema.optional(Schema.String),
      bestRating: Schema.optional(Schema.Number),
      ratingExplanation: Schema.optional(Schema.String),
      worstRating: Schema.optional(Schema.Number),
      ratingValue: Schema.optional(Schema.Number),
      imageUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor {
  /** Name of the organization that is publishing the fact check. Corresponds to `ClaimReview.author.name`. */
  name?: string;
  /** Corresponds to `ClaimReview.author.image`. */
  imageUrl?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor {
  /** Corresponds to `ClaimReview.itemReviewed.author.image`. */
  imageUrl?: string;
  /** A person or organization stating the claim. For instance, "John Doe". Corresponds to `ClaimReview.itemReviewed.author.name`. */
  name?: string;
  /** Corresponds to `ClaimReview.itemReviewed.author.jobTitle`. */
  jobTitle?: string;
  /** Corresponds to `ClaimReview.itemReviewed.author.sameAs`. */
  sameAs?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageUrl: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      jobTitle: Schema.optional(Schema.String),
      sameAs: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup {
  /** A list of links to works in which this claim appears, aside from the one specified in `claim_first_appearance`. Corresponds to `ClaimReview.itemReviewed[@type=Claim].appearance.url`. */
  claimAppearances?: Array<string>;
  /** The location where this claim was made. Corresponds to `ClaimReview.itemReviewed.name`. */
  claimLocation?: string;
  /** This field is optional, and will default to the page URL. We provide this field to allow you the override the default value, but the only permitted override is the page URL plus an optional anchor link ("page jump"). Corresponds to `ClaimReview.url` */
  url?: string;
  /** A link to a work in which this claim first appears. Corresponds to `ClaimReview.itemReviewed[@type=Claim].firstAppearance.url`. */
  claimFirstAppearance?: string;
  /** Info about the rating of this claim review. */
  rating?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating;
  /** The date when the claim was made or entered public discourse. Corresponds to `ClaimReview.itemReviewed.datePublished`. */
  claimDate?: string;
  /** Info about the author of this claim. */
  claimAuthor?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor;
  /** A short summary of the claim being evaluated. Corresponds to `ClaimReview.claimReviewed`. */
  claimReviewed?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      claimAppearances: Schema.optional(Schema.Array(Schema.String)),
      claimLocation: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      claimFirstAppearance: Schema.optional(Schema.String),
      rating: Schema.optional(
        GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating,
      ),
      claimDate: Schema.optional(Schema.String),
      claimAuthor: Schema.optional(
        GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor,
      ),
      claimReviewed: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage {
  /** The URL of the page associated with this `ClaimReview` markup. While every individual `ClaimReview` has its own URL field, semantically this is a page-level field, and each `ClaimReview` on this page will use this value unless individually overridden. Corresponds to `ClaimReview.url` */
  pageUrl?: string;
  /** The version ID for this markup. Except for update requests, this field is output-only and should not be set by the user. */
  versionId?: string;
  /** The date when the fact check was published. Similar to the URL, semantically this is a page-level field, and each `ClaimReview` on this page will contain the same value. Corresponds to `ClaimReview.datePublished` */
  publishDate?: string;
  /** Info about the author of this claim review. Similar to the above, semantically these are page-level fields, and each `ClaimReview` on this page will contain the same values. */
  claimReviewAuthor?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor;
  /** The name of this `ClaimReview` markup page resource, in the form of `pages/{page_id}`. Except for update requests, this field is output-only and should not be set by the user. */
  name?: string;
  /** A list of individual claim reviews for this page. Each item in the list corresponds to one `ClaimReview` element. */
  claimReviewMarkups?: Array<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup>;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pageUrl: Schema.optional(Schema.String),
      versionId: Schema.optional(Schema.String),
      publishDate: Schema.optional(Schema.String),
      claimReviewAuthor: Schema.optional(
        GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor,
      ),
      name: Schema.optional(Schema.String),
      claimReviewMarkups: Schema.optional(
        Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup),
      ),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1Publisher {
  /** Host-level site name, without the protocol or "www" prefix. For instance, "awesomefactchecks.com". This value of this field is based purely on the claim review URL. */
  site?: string;
  /** The name of this publisher. For instance, "Awesome Fact Checks". */
  name?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1Publisher: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Publisher> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      site: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1Publisher",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Publisher>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview {
  /** Textual rating. For instance, "Mostly false". */
  textualRating?: string;
  /** The URL of this claim review. */
  url?: string;
  /** The publisher of this claim review. */
  publisher?: GoogleFactcheckingFactchecktoolsV1alpha1Publisher;
  /** The date the claim was reviewed. */
  reviewDate?: string;
  /** The language this review was written in. For instance, "en" or "de". */
  languageCode?: string;
  /** The title of this claim review, if it can be determined. */
  title?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textualRating: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      publisher: Schema.optional(
        GoogleFactcheckingFactchecktoolsV1alpha1Publisher,
      ),
      reviewDate: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1Claim {
  /** A person or organization stating the claim. For instance, "John Doe". */
  claimant?: string;
  /** The date that the claim was made. */
  claimDate?: string;
  /** The claim text. For instance, "Crime has doubled in the last 2 years." */
  text?: string;
  /** One or more reviews of this claim (namely, a fact-checking article). */
  claimReview?: Array<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview>;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1Claim: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Claim> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      claimant: Schema.optional(Schema.String),
      claimDate: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      claimReview: Schema.optional(
        Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview),
      ),
    }),
  ).annotate({
    identifier: "GoogleFactcheckingFactchecktoolsV1alpha1Claim",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1Claim>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult {
  /** A claim which matched the query. */
  claim?: GoogleFactcheckingFactchecktoolsV1alpha1Claim;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      claim: Schema.optional(GoogleFactcheckingFactchecktoolsV1alpha1Claim),
    }),
  ).annotate({
    identifier:
      "GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse {
  /** The next pagination token in the Search response. It should be used as the `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
  /** The result list of pages of `ClaimReview` markup. */
  claimReviewMarkupPages?: Array<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage>;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      claimReviewMarkupPages: Schema.optional(
        Schema.Array(
          GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse {
  /** The next pagination token in the Search response. It should be used as the `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
  /** The list of claims and all of their associated information. */
  results?: Array<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult>;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      results: Schema.optional(
        Schema.Array(
          GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponseResult,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse {
  /** The list of claims and all of their associated information. */
  claims?: Array<GoogleFactcheckingFactchecktoolsV1alpha1Claim>;
  /** The next pagination token in the Search response. It should be used as the `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
}

export const GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse: Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      claims: Schema.optional(
        Schema.Array(GoogleFactcheckingFactchecktoolsV1alpha1Claim),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse",
  }) as any as Schema.Schema<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchClaimsRequest {
  /** The pagination size. We will return up to that many results. Defaults to 10 if not set. */
  pageSize?: number;
  /** Textual query string. Required unless `review_publisher_site_filter` is specified. */
  query?: string;
  /** The maximum age of the returned search results, in days. Age is determined by either claim date or review date, whichever is newer. */
  maxAgeDays?: number;
  /** The review publisher site to filter results by, e.g. nytimes.com. */
  reviewPublisherSiteFilter?: string;
  /** An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result. */
  offset?: number;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". Can be used to restrict results by language, though we do not currently consider the region. */
  languageCode?: string;
  /** The pagination token. You may provide the `next_page_token` returned from a previous List request, if any, in order to get the next page. All other fields must have the same values as in the previous request. */
  pageToken?: string;
}

export const SearchClaimsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  maxAgeDays: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxAgeDays")),
  reviewPublisherSiteFilter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("reviewPublisherSiteFilter"),
  ),
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/claims:search" }),
  svc,
) as unknown as Schema.Schema<SearchClaimsRequest>;

export type SearchClaimsResponse =
  GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse;
export const SearchClaimsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse;

export type SearchClaimsError = DefaultErrors;

/** Search through fact-checked claims. */
export const searchClaims: API.PaginatedOperationMethod<
  SearchClaimsRequest,
  SearchClaimsResponse,
  SearchClaimsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchClaimsRequest,
  output: SearchClaimsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ImageSearchClaimsRequest {
  /** Optional. The pagination size. We will return up to that many results. Defaults to 10 if not set. */
  pageSize?: number;
  /** Optional. The pagination token. You may provide the `next_page_token` returned from a previous List request, if any, in order to get the next page. All other fields must have the same values as in the previous request. */
  pageToken?: string;
  /** Required. The URI of the source image. This must be a publicly-accessible image HTTP/HTTPS URL. When fetching images from HTTP/HTTPS URLs, Google cannot guarantee that the request will be completed. Your request may fail if the specified host denies the request (e.g. due to request throttling or DOS prevention), or if Google throttles requests to the site for abuse prevention. You should not depend on externally-hosted images for production applications. */
  imageUri?: string;
  /** Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". Can be used to restrict results by language, though we do not currently consider the region. */
  languageCode?: string;
  /** Optional. An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result. */
  offset?: number;
}

export const ImageSearchClaimsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    imageUri: Schema.optional(Schema.String).pipe(T.HttpQuery("imageUri")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha1/claims:imageSearch" }),
    svc,
  ) as unknown as Schema.Schema<ImageSearchClaimsRequest>;

export type ImageSearchClaimsResponse =
  GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse;
export const ImageSearchClaimsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimImageSearchResponse;

export type ImageSearchClaimsError = DefaultErrors;

/** Search through fact-checked claims using an image as the query. */
export const imageSearchClaims: API.PaginatedOperationMethod<
  ImageSearchClaimsRequest,
  ImageSearchClaimsResponse,
  ImageSearchClaimsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ImageSearchClaimsRequest,
  output: ImageSearchClaimsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeletePagesRequest {
  /** The name of the resource to delete, in the form of `pages/{page_id}`. */
  name: string;
}

export const DeletePagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePagesRequest>;

export type DeletePagesResponse = GoogleProtobufEmpty;
export const DeletePagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeletePagesError = DefaultErrors;

/** Delete all `ClaimReview` markup on a page. */
export const deletePages: API.OperationMethod<
  DeletePagesRequest,
  DeletePagesResponse,
  DeletePagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePagesRequest,
  output: DeletePagesResponse,
  errors: [],
}));

export interface GetPagesRequest {
  /** The name of the resource to get, in the form of `pages/{page_id}`. */
  name: string;
}

export const GetPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<GetPagesRequest>;

export type GetPagesResponse =
  GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
export const GetPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;

export type GetPagesError = DefaultErrors;

/** Get all `ClaimReview` markup on a page. */
export const getPages: API.OperationMethod<
  GetPagesRequest,
  GetPagesResponse,
  GetPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPagesRequest,
  output: GetPagesResponse,
  errors: [],
}));

export interface CreatePagesRequest {
  /** Request body */
  body?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
}

export const CreatePagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(
    GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePagesRequest>;

export type CreatePagesResponse =
  GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
export const CreatePagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;

export type CreatePagesError = DefaultErrors;

/** Create `ClaimReview` markup on a page. */
export const createPages: API.OperationMethod<
  CreatePagesRequest,
  CreatePagesResponse,
  CreatePagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePagesRequest,
  output: CreatePagesResponse,
  errors: [],
}));

export interface ListPagesRequest {
  /** The pagination size. We will return up to that many results. Defaults to 10 if not set. Has no effect if a URL is requested. */
  pageSize?: number;
  /** The URL from which to get `ClaimReview` markup. There will be at most one result. If markup is associated with a more canonical version of the URL provided, we will return that URL instead. Cannot be specified along with an organization. */
  url?: string;
  /** The pagination token. You may provide the `next_page_token` returned from a previous List request, if any, in order to get the next page. All other fields must have the same values as in the previous request. */
  pageToken?: string;
  /** An integer that specifies the current offset (that is, starting result location) in search results. This field is only considered if `page_token` is unset, and if the request is not for a specific URL. For example, 0 means to return results starting from the first matching result, and 10 means to return from the 11th result. */
  offset?: number;
  /** The organization for which we want to fetch markups for. For instance, "site.com". Cannot be specified along with an URL. */
  organization?: string;
}

export const ListPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  url: Schema.optional(Schema.String).pipe(T.HttpQuery("url")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  organization: Schema.optional(Schema.String).pipe(
    T.HttpQuery("organization"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/pages" }),
  svc,
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse =
  GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse;
export const ListPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse;

export type ListPagesError = DefaultErrors;

/** List the `ClaimReview` markup pages for a specific URL or for an organization. */
export const listPages: API.PaginatedOperationMethod<
  ListPagesRequest,
  ListPagesResponse,
  ListPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
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

export const UpdatePagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(
    GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1alpha1/pages/{pagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePagesRequest>;

export type UpdatePagesResponse =
  GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
export const UpdatePagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;

export type UpdatePagesError = DefaultErrors;

/** Update for all `ClaimReview` markup on a page Note that this is a full update. To retain the existing `ClaimReview` markup on a page, first perform a Get operation, then modify the returned markup, and finally call Update with the entire `ClaimReview` markup as the body. */
export const updatePages: API.OperationMethod<
  UpdatePagesRequest,
  UpdatePagesResponse,
  UpdatePagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePagesRequest,
  output: UpdatePagesResponse,
  errors: [],
}));
