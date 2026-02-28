// ==========================================================================
// Display & Video 360 API (displayvideo v4)
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
  name: "displayvideo",
  version: "v4",
  rootUrl: "https://displayvideo.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface YoutubeVideoAsset {
  /** Required. The YouTube video id of the asset. This is the 11 char string value used in the YouTube video URL. */
  youtubeVideoId?: string;
}

export const YoutubeVideoAsset: Schema.Schema<YoutubeVideoAsset> = Schema.suspend(() => Schema.Struct({
  youtubeVideoId: Schema.optional(Schema.String),
})).annotate({ identifier: "YoutubeVideoAsset" }) as any as Schema.Schema<YoutubeVideoAsset>;

export interface AdAsset {
  /** Output only. The ID of the ad asset. Referred to as the asset ID when assigned to an ad. */
  adAssetId?: string;
  /** Identifier. The resource name of the ad asset. */
  name?: string;
  /** Output only. The entity status of the ad asset. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Required. The type of the ad asset. */
  adAssetType?: "AD_ASSET_TYPE_UNSPECIFIED" | "AD_ASSET_TYPE_IMAGE" | "AD_ASSET_TYPE_YOUTUBE_VIDEO" | (string & {});
  /** Youtube video asset data. */
  youtubeVideoAsset?: YoutubeVideoAsset;
}

export const AdAsset: Schema.Schema<AdAsset> = Schema.suspend(() => Schema.Struct({
  adAssetId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  adAssetType: Schema.optional(Schema.String),
  youtubeVideoAsset: Schema.optional(YoutubeVideoAsset),
})).annotate({ identifier: "AdAsset" }) as any as Schema.Schema<AdAsset>;

export interface ListAdAssetsResponse {
  /** The list of ad assets. The list will only contain assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. This list will be absent if empty. */
  adAssets?: Array<AdAsset>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdAssets` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdAssetsResponse: Schema.Schema<ListAdAssetsResponse> = Schema.suspend(() => Schema.Struct({
  adAssets: Schema.optional(Schema.Array(AdAsset)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdAssetsResponse" }) as any as Schema.Schema<ListAdAssetsResponse>;

export interface UploadAdAssetRequest {
  /** Required. The filename of the ad asset, including the file extension. The filename must be UTF-8 encoded with a maximum size of 240 bytes. */
  filename?: string;
  /** Required. The type of the ad asset. Only `AD_ASSET_TYPE_IMAGE` is supported. */
  adAssetType?: "AD_ASSET_TYPE_UNSPECIFIED" | "AD_ASSET_TYPE_IMAGE" | "AD_ASSET_TYPE_YOUTUBE_VIDEO" | (string & {});
}

export const UploadAdAssetRequest: Schema.Schema<UploadAdAssetRequest> = Schema.suspend(() => Schema.Struct({
  filename: Schema.optional(Schema.String),
  adAssetType: Schema.optional(Schema.String),
})).annotate({ identifier: "UploadAdAssetRequest" }) as any as Schema.Schema<UploadAdAssetRequest>;

export interface UploadAdAssetResponse {
  /** The created ad asset. */
  adAsset?: AdAsset;
}

export const UploadAdAssetResponse: Schema.Schema<UploadAdAssetResponse> = Schema.suspend(() => Schema.Struct({
  adAsset: Schema.optional(AdAsset),
})).annotate({ identifier: "UploadAdAssetResponse" }) as any as Schema.Schema<UploadAdAssetResponse>;

export interface CreateAdAssetRequest {
  /** Required. The ad asset to create. Only supports assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
  adAsset?: AdAsset;
}

export const CreateAdAssetRequest: Schema.Schema<CreateAdAssetRequest> = Schema.suspend(() => Schema.Struct({
  adAsset: Schema.optional(AdAsset),
})).annotate({ identifier: "CreateAdAssetRequest" }) as any as Schema.Schema<CreateAdAssetRequest>;

export interface BulkCreateAdAssetsRequest {
  /** Required. Ad assets to create. Only supports assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
  adAssets?: Array<AdAsset>;
}

export const BulkCreateAdAssetsRequest: Schema.Schema<BulkCreateAdAssetsRequest> = Schema.suspend(() => Schema.Struct({
  adAssets: Schema.optional(Schema.Array(AdAsset)),
})).annotate({ identifier: "BulkCreateAdAssetsRequest" }) as any as Schema.Schema<BulkCreateAdAssetsRequest>;

export interface BulkCreateAdAssetsResponse {
  /** The created ad assets. */
  adAssets?: Array<AdAsset>;
}

export const BulkCreateAdAssetsResponse: Schema.Schema<BulkCreateAdAssetsResponse> = Schema.suspend(() => Schema.Struct({
  adAssets: Schema.optional(Schema.Array(AdAsset)),
})).annotate({ identifier: "BulkCreateAdAssetsResponse" }) as any as Schema.Schema<BulkCreateAdAssetsResponse>;

export interface AdPolicyTopicEvidenceTextList {
  /** The fragments of text from the resource that caused the policy finding. */
  texts?: Array<string>;
}

export const AdPolicyTopicEvidenceTextList: Schema.Schema<AdPolicyTopicEvidenceTextList> = Schema.suspend(() => Schema.Struct({
  texts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdPolicyTopicEvidenceTextList" }) as any as Schema.Schema<AdPolicyTopicEvidenceTextList>;

export interface AdPolicyTopicEvidenceWebsiteList {
  /** Websites that caused the policy finding. */
  websites?: Array<string>;
}

export const AdPolicyTopicEvidenceWebsiteList: Schema.Schema<AdPolicyTopicEvidenceWebsiteList> = Schema.suspend(() => Schema.Struct({
  websites: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdPolicyTopicEvidenceWebsiteList" }) as any as Schema.Schema<AdPolicyTopicEvidenceWebsiteList>;

export interface AdPolicyTopicEvidenceDestinationTextList {
  /** Destination text that caused the policy finding. */
  destinationTexts?: Array<string>;
}

export const AdPolicyTopicEvidenceDestinationTextList: Schema.Schema<AdPolicyTopicEvidenceDestinationTextList> = Schema.suspend(() => Schema.Struct({
  destinationTexts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdPolicyTopicEvidenceDestinationTextList" }) as any as Schema.Schema<AdPolicyTopicEvidenceDestinationTextList>;

export interface AdPolicyTopicEvidenceDestinationMismatch {
  /** The set of URLs that do not match. The list can include single or multiple uri types. Example 1: [`DISPLAY_URL`, `FINAL_URL`] means ad display URL does not match with the ad final URL. Example 2: [`FINAL_URL`] means ad final URL did not match the crawled url, which is also considered as destination mismatch. */
  uriTypes?: Array<"AD_POLICY_TOPIC_EVIDENCE_DESTINATION_MISMATCH_URL_TYPE_UNKNOWN" | "DISPLAY_URL" | "FINAL_URL" | "FINAL_MOBILE_URL" | "TRACKING_URL" | "MOBILE_TRACKING_URL" | (string & {})>;
}

export const AdPolicyTopicEvidenceDestinationMismatch: Schema.Schema<AdPolicyTopicEvidenceDestinationMismatch> = Schema.suspend(() => Schema.Struct({
  uriTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdPolicyTopicEvidenceDestinationMismatch" }) as any as Schema.Schema<AdPolicyTopicEvidenceDestinationMismatch>;

export interface AdPolicyTopicEvidenceDestinationNotWorking {
  /** The type of DNS error. */
  dnsErrorType?: "AD_POLICY_TOPIC_EVIDENCE_DESTINATION_NOT_WORKING_DNS_ERROR_TYPE_UNKNOWN" | "HOSTNAME_NOT_FOUND" | "GOOGLE_CRAWLER_DNS_ISSUE" | (string & {});
  /** The HTTP error code. */
  httpErrorCode?: string;
  /** The full URL that didn't work. */
  expandedUri?: string;
  /** The device where visiting the URL resulted in the error. */
  device?: "AD_POLICY_TOPIC_EVIDENCE_DESTINATION_NOT_WORKING_DEVICE_TYPE_UNKNOWN" | "DESKTOP" | "ANDROID" | "IOS" | (string & {});
  /** The last time the error was seen when navigating to URL. */
  lastCheckedTime?: string;
}

export const AdPolicyTopicEvidenceDestinationNotWorking: Schema.Schema<AdPolicyTopicEvidenceDestinationNotWorking> = Schema.suspend(() => Schema.Struct({
  dnsErrorType: Schema.optional(Schema.String),
  httpErrorCode: Schema.optional(Schema.String),
  expandedUri: Schema.optional(Schema.String),
  device: Schema.optional(Schema.String),
  lastCheckedTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AdPolicyTopicEvidenceDestinationNotWorking" }) as any as Schema.Schema<AdPolicyTopicEvidenceDestinationNotWorking>;

export interface AdPolicyCriterionRestriction {
  /** The country criterion id. */
  countryCriterionId?: string;
  /** Localized name for the country. May be empty. */
  countryLabel?: string;
}

export const AdPolicyCriterionRestriction: Schema.Schema<AdPolicyCriterionRestriction> = Schema.suspend(() => Schema.Struct({
  countryCriterionId: Schema.optional(Schema.String),
  countryLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "AdPolicyCriterionRestriction" }) as any as Schema.Schema<AdPolicyCriterionRestriction>;

export interface AdPolicyTopicEvidenceTrademark {
  /** The trademark content owner. */
  owner?: string;
  /** The trademark term. */
  term?: string;
  /** Countries where the policy violation is relevant. */
  countryRestrictions?: Array<AdPolicyCriterionRestriction>;
}

export const AdPolicyTopicEvidenceTrademark: Schema.Schema<AdPolicyTopicEvidenceTrademark> = Schema.suspend(() => Schema.Struct({
  owner: Schema.optional(Schema.String),
  term: Schema.optional(Schema.String),
  countryRestrictions: Schema.optional(Schema.Array(AdPolicyCriterionRestriction)),
})).annotate({ identifier: "AdPolicyTopicEvidenceTrademark" }) as any as Schema.Schema<AdPolicyTopicEvidenceTrademark>;

export interface AdPolicyTopicEvidenceLegalRemovalDmca {
  /** The entity who made the legal complaint. */
  complainant?: string;
}

export const AdPolicyTopicEvidenceLegalRemovalDmca: Schema.Schema<AdPolicyTopicEvidenceLegalRemovalDmca> = Schema.suspend(() => Schema.Struct({
  complainant: Schema.optional(Schema.String),
})).annotate({ identifier: "AdPolicyTopicEvidenceLegalRemovalDmca" }) as any as Schema.Schema<AdPolicyTopicEvidenceLegalRemovalDmca>;

export interface AdPolicyTopicEvidenceLegalRemovalLocalLegal {
  /** Type of law for the legal notice. */
  lawType?: string;
}

export const AdPolicyTopicEvidenceLegalRemovalLocalLegal: Schema.Schema<AdPolicyTopicEvidenceLegalRemovalLocalLegal> = Schema.suspend(() => Schema.Struct({
  lawType: Schema.optional(Schema.String),
})).annotate({ identifier: "AdPolicyTopicEvidenceLegalRemovalLocalLegal" }) as any as Schema.Schema<AdPolicyTopicEvidenceLegalRemovalLocalLegal>;

export interface AdPolicyTopicEvidenceLegalRemoval {
  /** Details on the DMCA regulation legal removal. */
  dmca?: AdPolicyTopicEvidenceLegalRemovalDmca;
  /** Details on the local legal regulation legal removal. */
  localLegal?: AdPolicyTopicEvidenceLegalRemovalLocalLegal;
  /** The type of complaint causing the legal removal. */
  complaintType?: "AD_POLICY_TOPIC_EVIDENCE_LEGAL_REMOVAL_COMPLAINT_TYPE_UNKNOWN" | "COPYRIGHT" | "COURT_ORDER" | "LOCAL_LEGAL" | (string & {});
  /** The countries restricted due to the legal removal. */
  countryRestrictions?: Array<AdPolicyCriterionRestriction>;
  /** The urls restricted due to the legal removal. */
  restrictedUris?: Array<string>;
}

export const AdPolicyTopicEvidenceLegalRemoval: Schema.Schema<AdPolicyTopicEvidenceLegalRemoval> = Schema.suspend(() => Schema.Struct({
  dmca: Schema.optional(AdPolicyTopicEvidenceLegalRemovalDmca),
  localLegal: Schema.optional(AdPolicyTopicEvidenceLegalRemovalLocalLegal),
  complaintType: Schema.optional(Schema.String),
  countryRestrictions: Schema.optional(Schema.Array(AdPolicyCriterionRestriction)),
  restrictedUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdPolicyTopicEvidenceLegalRemoval" }) as any as Schema.Schema<AdPolicyTopicEvidenceLegalRemoval>;

export interface AdPolicyTopicEvidenceCounterfeit {
  /** The content or product owners that made a complaint. */
  owners?: Array<string>;
}

export const AdPolicyTopicEvidenceCounterfeit: Schema.Schema<AdPolicyTopicEvidenceCounterfeit> = Schema.suspend(() => Schema.Struct({
  owners: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdPolicyTopicEvidenceCounterfeit" }) as any as Schema.Schema<AdPolicyTopicEvidenceCounterfeit>;

export interface AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry {
  /** The legal policy that is being violated. */
  legalPolicy?: string;
  /** The countries restricted due to the legal policy. */
  countryRestrictions?: Array<AdPolicyCriterionRestriction>;
}

export const AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry: Schema.Schema<AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry> = Schema.suspend(() => Schema.Struct({
  legalPolicy: Schema.optional(Schema.String),
  countryRestrictions: Schema.optional(Schema.Array(AdPolicyCriterionRestriction)),
})).annotate({ identifier: "AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry" }) as any as Schema.Schema<AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry>;

export interface AdPolicyTopicEvidenceRegionalRequirements {
  /** List of regional requirements. */
  regionalRequirementsEntries?: Array<AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry>;
}

export const AdPolicyTopicEvidenceRegionalRequirements: Schema.Schema<AdPolicyTopicEvidenceRegionalRequirements> = Schema.suspend(() => Schema.Struct({
  regionalRequirementsEntries: Schema.optional(Schema.Array(AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry)),
})).annotate({ identifier: "AdPolicyTopicEvidenceRegionalRequirements" }) as any as Schema.Schema<AdPolicyTopicEvidenceRegionalRequirements>;

export interface AdPolicyTopicEvidence {
  /** List of evidence found in the text of the ad. */
  textList?: AdPolicyTopicEvidenceTextList;
  /** List of websites linked with the ad. */
  websiteList?: AdPolicyTopicEvidenceWebsiteList;
  /** HTTP code returned when the final URL was crawled. */
  httpCode?: number;
  /** The language the ad was detected to be written in. This field uses IETF language tags, such as "en-US". */
  languageCode?: string;
  /** The text in the destination of the ad that is causing a policy violation. */
  destinationTextList?: AdPolicyTopicEvidenceDestinationTextList;
  /** A mismatch between the ad destination URLs. */
  destinationMismatch?: AdPolicyTopicEvidenceDestinationMismatch;
  /** Information on HTTP or DNS errors related to the ad destination. */
  destinationNotWorking?: AdPolicyTopicEvidenceDestinationNotWorking;
  /** Trademark terms that caused a policy violation. */
  trademark?: AdPolicyTopicEvidenceTrademark;
  /** Legal related regulation enforcement that caused a policy violation. */
  legalRemoval?: AdPolicyTopicEvidenceLegalRemoval;
  /** Counterfeit enforcement that caused a policy violation. */
  counterfeit?: AdPolicyTopicEvidenceCounterfeit;
  /** T&S proactive enforcement that caused a policy violation. */
  regionalRequirements?: AdPolicyTopicEvidenceRegionalRequirements;
}

export const AdPolicyTopicEvidence: Schema.Schema<AdPolicyTopicEvidence> = Schema.suspend(() => Schema.Struct({
  textList: Schema.optional(AdPolicyTopicEvidenceTextList),
  websiteList: Schema.optional(AdPolicyTopicEvidenceWebsiteList),
  httpCode: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  destinationTextList: Schema.optional(AdPolicyTopicEvidenceDestinationTextList),
  destinationMismatch: Schema.optional(AdPolicyTopicEvidenceDestinationMismatch),
  destinationNotWorking: Schema.optional(AdPolicyTopicEvidenceDestinationNotWorking),
  trademark: Schema.optional(AdPolicyTopicEvidenceTrademark),
  legalRemoval: Schema.optional(AdPolicyTopicEvidenceLegalRemoval),
  counterfeit: Schema.optional(AdPolicyTopicEvidenceCounterfeit),
  regionalRequirements: Schema.optional(AdPolicyTopicEvidenceRegionalRequirements),
})).annotate({ identifier: "AdPolicyTopicEvidence" }) as any as Schema.Schema<AdPolicyTopicEvidence>;

export interface AdPolicyTopicConstraintAdPolicyCountryConstraintList {
  /** Countries where the ad cannot serve. */
  countries?: Array<AdPolicyCriterionRestriction>;
}

export const AdPolicyTopicConstraintAdPolicyCountryConstraintList: Schema.Schema<AdPolicyTopicConstraintAdPolicyCountryConstraintList> = Schema.suspend(() => Schema.Struct({
  countries: Schema.optional(Schema.Array(AdPolicyCriterionRestriction)),
})).annotate({ identifier: "AdPolicyTopicConstraintAdPolicyCountryConstraintList" }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyCountryConstraintList>;

export interface AdPolicyTopicConstraintAdPolicyResellerConstraint {
}

export const AdPolicyTopicConstraintAdPolicyResellerConstraint: Schema.Schema<AdPolicyTopicConstraintAdPolicyResellerConstraint> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AdPolicyTopicConstraintAdPolicyResellerConstraint" }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyResellerConstraint>;

export interface AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint {
}

export const AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint: Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint" }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint>;

export interface AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint {
}

export const AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint: Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint" }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint>;

export interface AdPolicyTopicConstraint {
  /** Countries where the ad cannot serve. */
  countryConstraint?: AdPolicyTopicConstraintAdPolicyCountryConstraintList;
  /** Reseller constraint. */
  resellerConstraint?: AdPolicyTopicConstraintAdPolicyResellerConstraint;
  /** Countries where a certificate is required for serving. */
  certificateMissingCountryList?: AdPolicyTopicConstraintAdPolicyCountryConstraintList;
  /** Countries where the resource's domain is not covered by the certificates associated with it. */
  certificateDomainMismatchCountryList?: AdPolicyTopicConstraintAdPolicyCountryConstraintList;
  /** Certificate is required to serve in any country. */
  globalCertificateMissing?: AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint;
  /** Certificate is required to serve in any country and the existing certificate does not cover the ad's domain. */
  globalCertificateDomainMismatch?: AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint;
  /** Link to the form to request a certificate for the constraint. */
  requestCertificateFormLink?: string;
}

export const AdPolicyTopicConstraint: Schema.Schema<AdPolicyTopicConstraint> = Schema.suspend(() => Schema.Struct({
  countryConstraint: Schema.optional(AdPolicyTopicConstraintAdPolicyCountryConstraintList),
  resellerConstraint: Schema.optional(AdPolicyTopicConstraintAdPolicyResellerConstraint),
  certificateMissingCountryList: Schema.optional(AdPolicyTopicConstraintAdPolicyCountryConstraintList),
  certificateDomainMismatchCountryList: Schema.optional(AdPolicyTopicConstraintAdPolicyCountryConstraintList),
  globalCertificateMissing: Schema.optional(AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint),
  globalCertificateDomainMismatch: Schema.optional(AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint),
  requestCertificateFormLink: Schema.optional(Schema.String),
})).annotate({ identifier: "AdPolicyTopicConstraint" }) as any as Schema.Schema<AdPolicyTopicConstraint>;

export interface AdPolicyTopicAppealInfo {
  /** Whether the decision can be appealed through a self-service appeal or an appeal form. */
  appealType?: "AD_POLICY_APPEAL_TYPE_UNKNOWN" | "SELF_SERVICE_APPEAL" | "APPEAL_FORM" | (string & {});
  /** Only available when appeal_type is `APPEAL_FORM`. */
  appealFormLink?: string;
}

export const AdPolicyTopicAppealInfo: Schema.Schema<AdPolicyTopicAppealInfo> = Schema.suspend(() => Schema.Struct({
  appealType: Schema.optional(Schema.String),
  appealFormLink: Schema.optional(Schema.String),
})).annotate({ identifier: "AdPolicyTopicAppealInfo" }) as any as Schema.Schema<AdPolicyTopicAppealInfo>;

export interface AdPolicyTopicEntry {
  /** The policy topic. Examples include "TRADEMARKS", "ALCOHOL", etc. */
  policyTopic?: string;
  /** Localized label text for policy. Examples include "Trademarks in text", "Contains Alcohol", etc. */
  policyLabel?: string;
  /** A short summary description of the policy topic. */
  policyTopicDescription?: string;
  /** How ad serving will be affected due to the relation to the ad policy topic. */
  policyTopicType?: "AD_POLICY_TOPIC_ENTRY_TYPE_UNKNOWN" | "PROHIBITED" | "FULLY_LIMITED" | "LIMITED" | "DESCRIPTIVE" | "BROADENING" | "AREA_OF_INTEREST_ONLY" | (string & {});
  /** The source of the policy decision. */
  policyDecisionType?: "AD_POLICY_DECISION_TYPE_UNKNOWN" | "PURSUANT_TO_NOTICE" | "GOOGLE_INVESTIGATION" | (string & {});
  /** The policy enforcement means used in the policy review. */
  policyEnforcementMeans?: "AD_POLICY_ENFORCEMENT_MEANS_UNKNOWN" | "AUTOMATED" | "HUMAN_REVIEW" | (string & {});
  /** The evidence used in the policy decision. */
  policyTopicEvidences?: Array<AdPolicyTopicEvidence>;
  /** The serving constraints relevant to the policy decision. */
  policyTopicConstraints?: Array<AdPolicyTopicConstraint>;
  /** Ad policy help center link for the policy topic. */
  helpCenterLink?: string;
  /** Information on how to appeal the policy decision. */
  appealInfo?: AdPolicyTopicAppealInfo;
}

export const AdPolicyTopicEntry: Schema.Schema<AdPolicyTopicEntry> = Schema.suspend(() => Schema.Struct({
  policyTopic: Schema.optional(Schema.String),
  policyLabel: Schema.optional(Schema.String),
  policyTopicDescription: Schema.optional(Schema.String),
  policyTopicType: Schema.optional(Schema.String),
  policyDecisionType: Schema.optional(Schema.String),
  policyEnforcementMeans: Schema.optional(Schema.String),
  policyTopicEvidences: Schema.optional(Schema.Array(AdPolicyTopicEvidence)),
  policyTopicConstraints: Schema.optional(Schema.Array(AdPolicyTopicConstraint)),
  helpCenterLink: Schema.optional(Schema.String),
  appealInfo: Schema.optional(AdPolicyTopicAppealInfo),
})).annotate({ identifier: "AdPolicyTopicEntry" }) as any as Schema.Schema<AdPolicyTopicEntry>;

export interface AdPolicy {
  /** The policy approval status of an ad, indicating the approval decision. */
  adPolicyApprovalStatus?: "AD_POLICY_APPROVAL_STATUS_UNKNOWN" | "DISAPPROVED" | "APPROVED_LIMITED" | "APPROVED" | "AREA_OF_INTEREST_ONLY" | (string & {});
  /** The policy review status of an ad, indicating where in the review process the ad is currently. */
  adPolicyReviewStatus?: "AD_POLICY_REVIEW_STATUS_UNKNOWN" | "REVIEW_IN_PROGRESS" | "REVIEWED" | "UNDER_APPEAL" | "ELIGIBLE_MAY_SERVE" | (string & {});
  /** The entries for each policy topic identified as relating to the ad. Each entry includes the topic, restriction level, and guidance on how to fix policy issues. */
  adPolicyTopicEntry?: Array<AdPolicyTopicEntry>;
}

export const AdPolicy: Schema.Schema<AdPolicy> = Schema.suspend(() => Schema.Struct({
  adPolicyApprovalStatus: Schema.optional(Schema.String),
  adPolicyReviewStatus: Schema.optional(Schema.String),
  adPolicyTopicEntry: Schema.optional(Schema.Array(AdPolicyTopicEntry)),
})).annotate({ identifier: "AdPolicy" }) as any as Schema.Schema<AdPolicy>;

export interface DisplayVideoSourceAd {
  /** The ID of the source creative. */
  creativeId?: string;
}

export const DisplayVideoSourceAd: Schema.Schema<DisplayVideoSourceAd> = Schema.suspend(() => Schema.Struct({
  creativeId: Schema.optional(Schema.String),
})).annotate({ identifier: "DisplayVideoSourceAd" }) as any as Schema.Schema<DisplayVideoSourceAd>;

export interface YoutubeVideoDetails {
  /** Output only. The YouTube video ID which can be searched on YouTube webpage. */
  id?: string;
  /** The reason why the video data is not available. */
  unavailableReason?: "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED" | "VIDEO_UNAVAILABLE_REASON_PRIVATE" | "VIDEO_UNAVAILABLE_REASON_DELETED" | (string & {});
  /** Required. The YouTube video asset id. This is ad_asset.ad_asset_id. */
  videoAssetId?: string;
}

export const YoutubeVideoDetails: Schema.Schema<YoutubeVideoDetails> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  unavailableReason: Schema.optional(Schema.String),
  videoAssetId: Schema.optional(Schema.String),
})).annotate({ identifier: "YoutubeVideoDetails" }) as any as Schema.Schema<YoutubeVideoDetails>;

export interface MastheadAd {
  /** The YouTube video used by the ad. */
  video?: YoutubeVideoDetails;
  /** The headline of the ad. */
  headline?: string;
  /** The description of the ad. */
  description?: string;
  /** The aspect ratio of the autoplaying YouTube video on the Masthead. */
  videoAspectRatio?: "VIDEO_ASPECT_RATIO_UNSPECIFIED" | "VIDEO_ASPECT_RATIO_WIDESCREEN" | "VIDEO_ASPECT_RATIO_FIXED_16_9" | (string & {});
  /** The amount of time in milliseconds after which the video will start to play. */
  autoplayVideoStartMillisecond?: string;
  /** The duration of time the video will autoplay. */
  autoplayVideoDuration?: string;
  /** The text on the call-to-action button. */
  callToActionButtonLabel?: string;
  /** The destination URL for the call-to-action button. */
  callToActionFinalUrl?: string;
  /** The tracking URL for the call-to-action button. */
  callToActionTrackingUrl?: string;
  /** Whether to show a background or banner that appears at the top of a YouTube page. */
  showChannelArt?: boolean;
  /** The videos that appear next to the Masthead Ad on desktop. Can be no more than two. */
  companionYoutubeVideos?: Array<YoutubeVideoDetails>;
}

export const MastheadAd: Schema.Schema<MastheadAd> = Schema.suspend(() => Schema.Struct({
  video: Schema.optional(YoutubeVideoDetails),
  headline: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  videoAspectRatio: Schema.optional(Schema.String),
  autoplayVideoStartMillisecond: Schema.optional(Schema.String),
  autoplayVideoDuration: Schema.optional(Schema.String),
  callToActionButtonLabel: Schema.optional(Schema.String),
  callToActionFinalUrl: Schema.optional(Schema.String),
  callToActionTrackingUrl: Schema.optional(Schema.String),
  showChannelArt: Schema.optional(Schema.Boolean),
  companionYoutubeVideos: Schema.optional(Schema.Array(YoutubeVideoDetails)),
})).annotate({ identifier: "MastheadAd" }) as any as Schema.Schema<MastheadAd>;

export interface Dimensions {
  /** The width in pixels. */
  widthPixels?: number;
  /** The height in pixels. */
  heightPixels?: number;
}

export const Dimensions: Schema.Schema<Dimensions> = Schema.suspend(() => Schema.Struct({
  widthPixels: Schema.optional(Schema.Number),
  heightPixels: Schema.optional(Schema.Number),
})).annotate({ identifier: "Dimensions" }) as any as Schema.Schema<Dimensions>;

export interface ImageAsset {
  /** Output only. MIME type of the image asset. */
  mimeType?: string;
  /** Output only. Metadata for this image at its original size. */
  fullSize?: Dimensions;
  /** Output only. File size of the image asset in bytes. */
  fileSize?: string;
}

export const ImageAsset: Schema.Schema<ImageAsset> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  fullSize: Schema.optional(Dimensions),
  fileSize: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageAsset" }) as any as Schema.Schema<ImageAsset>;

export interface CommonInStreamAttribute {
  /** The webpage address that appears with the ad. */
  displayUrl?: string;
  /** The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** The text on the call-to-action button. */
  actionButtonLabel?: string;
  /** The headline of the call-to-action banner. */
  actionHeadline?: string;
  /** The YouTube video of the ad. */
  video?: YoutubeVideoDetails;
  /** The image which shows next to the video ad. */
  companionBanner?: ImageAsset;
}

export const CommonInStreamAttribute: Schema.Schema<CommonInStreamAttribute> = Schema.suspend(() => Schema.Struct({
  displayUrl: Schema.optional(Schema.String),
  finalUrl: Schema.optional(Schema.String),
  trackingUrl: Schema.optional(Schema.String),
  actionButtonLabel: Schema.optional(Schema.String),
  actionHeadline: Schema.optional(Schema.String),
  video: Schema.optional(YoutubeVideoDetails),
  companionBanner: Schema.optional(ImageAsset),
})).annotate({ identifier: "CommonInStreamAttribute" }) as any as Schema.Schema<CommonInStreamAttribute>;

export interface InStreamAd {
  /** Common ad attributes. */
  commonInStreamAttribute?: CommonInStreamAttribute;
  /** The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
}

export const InStreamAd: Schema.Schema<InStreamAd> = Schema.suspend(() => Schema.Struct({
  commonInStreamAttribute: Schema.optional(CommonInStreamAttribute),
  customParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "InStreamAd" }) as any as Schema.Schema<InStreamAd>;

export interface NonSkippableAd {
  /** Common ad attributes. */
  commonInStreamAttribute?: CommonInStreamAttribute;
  /** The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
}

export const NonSkippableAd: Schema.Schema<NonSkippableAd> = Schema.suspend(() => Schema.Struct({
  commonInStreamAttribute: Schema.optional(CommonInStreamAttribute),
  customParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "NonSkippableAd" }) as any as Schema.Schema<NonSkippableAd>;

export interface BumperAd {
  /** Common ad attributes. */
  commonInStreamAttribute?: CommonInStreamAttribute;
}

export const BumperAd: Schema.Schema<BumperAd> = Schema.suspend(() => Schema.Struct({
  commonInStreamAttribute: Schema.optional(CommonInStreamAttribute),
})).annotate({ identifier: "BumperAd" }) as any as Schema.Schema<BumperAd>;

export interface AudioAd {
  /** The webpage address that appears with the ad. */
  displayUrl?: string;
  /** The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** The YouTube video of the ad. */
  video?: YoutubeVideoDetails;
}

export const AudioAd: Schema.Schema<AudioAd> = Schema.suspend(() => Schema.Struct({
  displayUrl: Schema.optional(Schema.String),
  finalUrl: Schema.optional(Schema.String),
  trackingUrl: Schema.optional(Schema.String),
  video: Schema.optional(YoutubeVideoDetails),
})).annotate({ identifier: "AudioAd" }) as any as Schema.Schema<AudioAd>;

export interface VideoDiscoveryAd {
  /** The headline of ad. */
  headline?: string;
  /** First text line for the ad. */
  description1?: string;
  /** Second text line for the ad. */
  description2?: string;
  /** The YouTube video the ad promotes. */
  video?: YoutubeVideoDetails;
  /** Thumbnail image used in the ad. */
  thumbnail?: "THUMBNAIL_UNSPECIFIED" | "THUMBNAIL_DEFAULT" | "THUMBNAIL_1" | "THUMBNAIL_2" | "THUMBNAIL_3" | (string & {});
}

export const VideoDiscoveryAd: Schema.Schema<VideoDiscoveryAd> = Schema.suspend(() => Schema.Struct({
  headline: Schema.optional(Schema.String),
  description1: Schema.optional(Schema.String),
  description2: Schema.optional(Schema.String),
  video: Schema.optional(YoutubeVideoDetails),
  thumbnail: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoDiscoveryAd" }) as any as Schema.Schema<VideoDiscoveryAd>;

export interface VideoPerformanceAd {
  /** The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** The list of text assets shown on the call-to-action button. */
  actionButtonLabels?: Array<string>;
  /** The list of headlines shown on the call-to-action banner. */
  headlines?: Array<string>;
  /** The list of lone headlines shown on the call-to-action banner. */
  longHeadlines?: Array<string>;
  /** The list of descriptions shown on the call-to-action banner. */
  descriptions?: Array<string>;
  /** The first piece after the domain in the display URL. */
  displayUrlBreadcrumb1?: string;
  /** The second piece after the domain in the display URL. */
  displayUrlBreadcrumb2?: string;
  /** The domain of the display URL. */
  domain?: string;
  /** The list of YouTube video assets used by this ad. */
  videos?: Array<YoutubeVideoDetails>;
  /** The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
  /** The list of companion banners used by this ad. */
  companionBanners?: Array<ImageAsset>;
}

export const VideoPerformanceAd: Schema.Schema<VideoPerformanceAd> = Schema.suspend(() => Schema.Struct({
  finalUrl: Schema.optional(Schema.String),
  trackingUrl: Schema.optional(Schema.String),
  actionButtonLabels: Schema.optional(Schema.Array(Schema.String)),
  headlines: Schema.optional(Schema.Array(Schema.String)),
  longHeadlines: Schema.optional(Schema.Array(Schema.String)),
  descriptions: Schema.optional(Schema.Array(Schema.String)),
  displayUrlBreadcrumb1: Schema.optional(Schema.String),
  displayUrlBreadcrumb2: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  videos: Schema.optional(Schema.Array(YoutubeVideoDetails)),
  customParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  companionBanners: Schema.optional(Schema.Array(ImageAsset)),
})).annotate({ identifier: "VideoPerformanceAd" }) as any as Schema.Schema<VideoPerformanceAd>;

export interface AdUrl {
  /** The type of the Ad URL. */
  type?: "AD_URL_TYPE_UNSPECIFIED" | "AD_URL_TYPE_BEACON_IMPRESSION" | "AD_URL_TYPE_BEACON_EXPANDABLE_DCM_IMPRESSION" | "AD_URL_TYPE_BEACON_CLICK" | "AD_URL_TYPE_BEACON_SKIP" | (string & {});
  /** The URL string value. */
  url?: string;
}

export const AdUrl: Schema.Schema<AdUrl> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "AdUrl" }) as any as Schema.Schema<AdUrl>;

export interface AdGroupAd {
  /** Output only. The resource name of the ad. */
  name?: string;
  /** Output only. The unique ID of the advertiser the ad belongs to. */
  advertiserId?: string;
  /** Output only. The unique ID of the ad. Assigned by the system. */
  adGroupAdId?: string;
  /** Required. The unique ID of the ad group that the ad belongs to. */
  adGroupId?: string;
  /** Required. The display name of the ad. Must be UTF-8 encoded with a maximum size of 255 bytes. */
  displayName?: string;
  /** Output only. The policy approval status of the ad. */
  adPolicy?: AdPolicy;
  /** Required. The entity status of the ad. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. Details of an ad sourced from a Display & Video 360 creative. */
  displayVideoSourceAd?: DisplayVideoSourceAd;
  /** Output only. Details of an [ad served on the YouTube Home feed](//support.google.com/google-ads/answer/9709826). */
  mastheadAd?: MastheadAd;
  /** Output only. Details of an [in-stream ad skippable after 5 seconds](//support.google.com/displayvideo/answer/6274216), used for brand awareness or reach marketing objectives. */
  inStreamAd?: InStreamAd;
  /** Output only. Details of a [non-skippable short in-stream video ad](//support.google.com/displayvideo/answer/6274216), between 6 and 15 seconds, used for reach marketing objectives. */
  nonSkippableAd?: NonSkippableAd;
  /** Output only. Details of a [non-skippable short video ad](//support.google.com/displayvideo/answer/6274216), equal to or less than 6 seconds, used for reach. */
  bumperAd?: BumperAd;
  /** Output only. Details of an [audio ad](//support.google.com/displayvideo/answer/6274216) used for reach marketing objectives. */
  audioAd?: AudioAd;
  /** Output only. Details of an [ad promoting a video](//support.google.com/displayvideo/answer/6274216) that shows in places of discovery. */
  videoDiscoverAd?: VideoDiscoveryAd;
  /** Output only. Details of an [ad used in a video action campaign](//support.google.com/google-ads/answer/10147229) to drive actions to the business, service or product. */
  videoPerformanceAd?: VideoPerformanceAd;
  /** Output only. List of URLs used by the ad. */
  adUrls?: Array<AdUrl>;
}

export const AdGroupAd: Schema.Schema<AdGroupAd> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  adGroupAdId: Schema.optional(Schema.String),
  adGroupId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  adPolicy: Schema.optional(AdPolicy),
  entityStatus: Schema.optional(Schema.String),
  displayVideoSourceAd: Schema.optional(DisplayVideoSourceAd),
  mastheadAd: Schema.optional(MastheadAd),
  inStreamAd: Schema.optional(InStreamAd),
  nonSkippableAd: Schema.optional(NonSkippableAd),
  bumperAd: Schema.optional(BumperAd),
  audioAd: Schema.optional(AudioAd),
  videoDiscoverAd: Schema.optional(VideoDiscoveryAd),
  videoPerformanceAd: Schema.optional(VideoPerformanceAd),
  adUrls: Schema.optional(Schema.Array(AdUrl)),
})).annotate({ identifier: "AdGroupAd" }) as any as Schema.Schema<AdGroupAd>;

export interface ListAdGroupAdsResponse {
  /** The list of ads. This list will be absent if empty. */
  adGroupAds?: Array<AdGroupAd>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdGroupAds` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdGroupAdsResponse: Schema.Schema<ListAdGroupAdsResponse> = Schema.suspend(() => Schema.Struct({
  adGroupAds: Schema.optional(Schema.Array(AdGroupAd)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdGroupAdsResponse" }) as any as Schema.Schema<ListAdGroupAdsResponse>;

export interface ChannelAssignedTargetingOptionDetails {
  /** Required. ID of the channel. Should refer to the channel ID field on a [Partner-owned channel](partners.channels#Channel.FIELDS.channel_id) or [advertiser-owned channel](advertisers.channels#Channel.FIELDS.channel_id) resource. */
  channelId?: string;
  /** Indicates if this option is being negatively targeted. For advertiser level assigned targeting option, this field must be true. */
  negative?: boolean;
}

export const ChannelAssignedTargetingOptionDetails: Schema.Schema<ChannelAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  channelId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ChannelAssignedTargetingOptionDetails" }) as any as Schema.Schema<ChannelAssignedTargetingOptionDetails>;

export interface AppCategoryAssignedTargetingOptionDetails {
  /** Output only. The display name of the app category. */
  displayName?: string;
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_APP_CATEGORY`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const AppCategoryAssignedTargetingOptionDetails: Schema.Schema<AppCategoryAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AppCategoryAssignedTargetingOptionDetails" }) as any as Schema.Schema<AppCategoryAssignedTargetingOptionDetails>;

export interface AppAssignedTargetingOptionDetails {
  /** Required. The ID of the app. Android's Play store app uses bundle ID, for example `com.google.android.gm`. Apple's App store app ID uses 9 digit string, for example `422689480`. */
  appId?: string;
  /** Output only. The display name of the app. */
  displayName?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
  /** Indicates the platform of the targeted app. If this field is not specified, the app platform will be assumed to be mobile (i.e., Android or iOS), and we will derive the appropriate mobile platform from the app ID. */
  appPlatform?: "APP_PLATFORM_UNSPECIFIED" | "APP_PLATFORM_IOS" | "APP_PLATFORM_ANDROID" | "APP_PLATFORM_ROKU" | "APP_PLATFORM_AMAZON_FIRETV" | "APP_PLATFORM_PLAYSTATION" | "APP_PLATFORM_APPLE_TV" | "APP_PLATFORM_XBOX" | "APP_PLATFORM_SAMSUNG_TV" | "APP_PLATFORM_ANDROID_TV" | "APP_PLATFORM_GENERIC_CTV" | "APP_PLATFORM_LG_TV" | "APP_PLATFORM_VIZIO_TV" | "APP_PLATFORM_VIDAA" | (string & {});
}

export const AppAssignedTargetingOptionDetails: Schema.Schema<AppAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
  appPlatform: Schema.optional(Schema.String),
})).annotate({ identifier: "AppAssignedTargetingOptionDetails" }) as any as Schema.Schema<AppAssignedTargetingOptionDetails>;

export interface UrlAssignedTargetingOptionDetails {
  /** Required. The URL, for example `example.com`. DV360 supports two levels of subdirectory targeting, for example `www.example.com/one-subdirectory-level/second-level`, and five levels of subdomain targeting, for example `five.four.three.two.one.example.com`. */
  url?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const UrlAssignedTargetingOptionDetails: Schema.Schema<UrlAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UrlAssignedTargetingOptionDetails" }) as any as Schema.Schema<UrlAssignedTargetingOptionDetails>;

export interface DayAndTimeAssignedTargetingOptionDetails {
  /** Required. The day of the week for this day and time targeting setting. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. The start hour for day and time targeting. Must be between 0 (start of day) and 23 (1 hour before end of day). */
  startHour?: number;
  /** Required. The end hour for day and time targeting. Must be between 1 (1 hour after start of day) and 24 (end of day). */
  endHour?: number;
  /** Required. The mechanism used to determine which timezone to use for this day and time targeting setting. */
  timeZoneResolution?: "TIME_ZONE_RESOLUTION_UNSPECIFIED" | "TIME_ZONE_RESOLUTION_END_USER" | "TIME_ZONE_RESOLUTION_ADVERTISER" | (string & {});
}

export const DayAndTimeAssignedTargetingOptionDetails: Schema.Schema<DayAndTimeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  startHour: Schema.optional(Schema.Number),
  endHour: Schema.optional(Schema.Number),
  timeZoneResolution: Schema.optional(Schema.String),
})).annotate({ identifier: "DayAndTimeAssignedTargetingOptionDetails" }) as any as Schema.Schema<DayAndTimeAssignedTargetingOptionDetails>;

export interface AgeRangeAssignedTargetingOptionDetails {
  /** Required. The age range of an audience. We only support targeting a continuous age range of an audience. Thus, the age range represented in this field can be 1) targeted solely, or, 2) part of a larger continuous age range. The reach of a continuous age range targeting can be expanded by also targeting an audience of an unknown age. */
  ageRange?: "AGE_RANGE_UNSPECIFIED" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_PLUS" | "AGE_RANGE_UNKNOWN" | "AGE_RANGE_18_20" | "AGE_RANGE_21_24" | "AGE_RANGE_25_29" | "AGE_RANGE_30_34" | "AGE_RANGE_35_39" | "AGE_RANGE_40_44" | "AGE_RANGE_45_49" | "AGE_RANGE_50_54" | "AGE_RANGE_55_59" | "AGE_RANGE_60_64" | (string & {});
}

export const AgeRangeAssignedTargetingOptionDetails: Schema.Schema<AgeRangeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  ageRange: Schema.optional(Schema.String),
})).annotate({ identifier: "AgeRangeAssignedTargetingOptionDetails" }) as any as Schema.Schema<AgeRangeAssignedTargetingOptionDetails>;

export interface RegionalLocationListAssignedTargetingOptionDetails {
  /** Required. ID of the regional location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_REGIONAL`. */
  regionalLocationListId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const RegionalLocationListAssignedTargetingOptionDetails: Schema.Schema<RegionalLocationListAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  regionalLocationListId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RegionalLocationListAssignedTargetingOptionDetails" }) as any as Schema.Schema<RegionalLocationListAssignedTargetingOptionDetails>;

export interface ProximityLocationListAssignedTargetingOptionDetails {
  /** Required. ID of the proximity location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_PROXIMITY`. */
  proximityLocationListId?: string;
  /** Required. Radius expressed in the distance units set in proximity_radius_unit. This represents the size of the area around a chosen location that will be targeted. Radius should be between 1 and 500 miles or 800 kilometers. */
  proximityRadius?: number;
  /** Required. Radius distance units. */
  proximityRadiusUnit?: "PROXIMITY_RADIUS_UNIT_UNSPECIFIED" | "PROXIMITY_RADIUS_UNIT_MILES" | "PROXIMITY_RADIUS_UNIT_KILOMETERS" | (string & {});
}

export const ProximityLocationListAssignedTargetingOptionDetails: Schema.Schema<ProximityLocationListAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  proximityLocationListId: Schema.optional(Schema.String),
  proximityRadius: Schema.optional(Schema.Number),
  proximityRadiusUnit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProximityLocationListAssignedTargetingOptionDetails" }) as any as Schema.Schema<ProximityLocationListAssignedTargetingOptionDetails>;

export interface GenderAssignedTargetingOptionDetails {
  /** Required. The gender of the audience. */
  gender?: "GENDER_UNSPECIFIED" | "GENDER_MALE" | "GENDER_FEMALE" | "GENDER_UNKNOWN" | (string & {});
}

export const GenderAssignedTargetingOptionDetails: Schema.Schema<GenderAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  gender: Schema.optional(Schema.String),
})).annotate({ identifier: "GenderAssignedTargetingOptionDetails" }) as any as Schema.Schema<GenderAssignedTargetingOptionDetails>;

export interface VideoPlayerSizeAssignedTargetingOptionDetails {
  /** Required. The video player size. */
  videoPlayerSize?: "VIDEO_PLAYER_SIZE_UNSPECIFIED" | "VIDEO_PLAYER_SIZE_SMALL" | "VIDEO_PLAYER_SIZE_LARGE" | "VIDEO_PLAYER_SIZE_HD" | "VIDEO_PLAYER_SIZE_UNKNOWN" | (string & {});
}

export const VideoPlayerSizeAssignedTargetingOptionDetails: Schema.Schema<VideoPlayerSizeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  videoPlayerSize: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoPlayerSizeAssignedTargetingOptionDetails" }) as any as Schema.Schema<VideoPlayerSizeAssignedTargetingOptionDetails>;

export interface UserRewardedContentAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`. */
  targetingOptionId?: string;
  /** Output only. User rewarded content status for video ads. */
  userRewardedContent?: "USER_REWARDED_CONTENT_UNSPECIFIED" | "USER_REWARDED_CONTENT_USER_REWARDED" | "USER_REWARDED_CONTENT_NOT_USER_REWARDED" | (string & {});
}

export const UserRewardedContentAssignedTargetingOptionDetails: Schema.Schema<UserRewardedContentAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  targetingOptionId: Schema.optional(Schema.String),
  userRewardedContent: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRewardedContentAssignedTargetingOptionDetails" }) as any as Schema.Schema<UserRewardedContentAssignedTargetingOptionDetails>;

export interface ParentalStatusAssignedTargetingOptionDetails {
  /** Required. The parental status of the audience. */
  parentalStatus?: "PARENTAL_STATUS_UNSPECIFIED" | "PARENTAL_STATUS_PARENT" | "PARENTAL_STATUS_NOT_A_PARENT" | "PARENTAL_STATUS_UNKNOWN" | (string & {});
}

export const ParentalStatusAssignedTargetingOptionDetails: Schema.Schema<ParentalStatusAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  parentalStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ParentalStatusAssignedTargetingOptionDetails" }) as any as Schema.Schema<ParentalStatusAssignedTargetingOptionDetails>;

export interface ContentInstreamPositionAssignedTargetingOptionDetails {
  /** Required. The content instream position for video or audio ads. */
  contentInstreamPosition?: "CONTENT_INSTREAM_POSITION_UNSPECIFIED" | "CONTENT_INSTREAM_POSITION_PRE_ROLL" | "CONTENT_INSTREAM_POSITION_MID_ROLL" | "CONTENT_INSTREAM_POSITION_POST_ROLL" | "CONTENT_INSTREAM_POSITION_UNKNOWN" | (string & {});
  /** Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. * `AD_TYPE_AUDIO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_AUDIO_DEFAULT`. */
  adType?: "AD_TYPE_UNSPECIFIED" | "AD_TYPE_DISPLAY" | "AD_TYPE_VIDEO" | "AD_TYPE_AUDIO" | (string & {});
}

export const ContentInstreamPositionAssignedTargetingOptionDetails: Schema.Schema<ContentInstreamPositionAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentInstreamPosition: Schema.optional(Schema.String),
  adType: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentInstreamPositionAssignedTargetingOptionDetails" }) as any as Schema.Schema<ContentInstreamPositionAssignedTargetingOptionDetails>;

export interface ContentOutstreamPositionAssignedTargetingOptionDetails {
  /** Required. The content outstream position. */
  contentOutstreamPosition?: "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED" | "CONTENT_OUTSTREAM_POSITION_UNKNOWN" | "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE" | "CONTENT_OUTSTREAM_POSITION_IN_BANNER" | "CONTENT_OUTSTREAM_POSITION_IN_FEED" | "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL" | (string & {});
  /** Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. */
  adType?: "AD_TYPE_UNSPECIFIED" | "AD_TYPE_DISPLAY" | "AD_TYPE_VIDEO" | "AD_TYPE_AUDIO" | (string & {});
}

export const ContentOutstreamPositionAssignedTargetingOptionDetails: Schema.Schema<ContentOutstreamPositionAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentOutstreamPosition: Schema.optional(Schema.String),
  adType: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentOutstreamPositionAssignedTargetingOptionDetails" }) as any as Schema.Schema<ContentOutstreamPositionAssignedTargetingOptionDetails>;

export interface DeviceTypeAssignedTargetingOptionDetails {
  /** Required. The display name of the device type. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "DEVICE_TYPE_COMPUTER" | "DEVICE_TYPE_CONNECTED_TV" | "DEVICE_TYPE_SMART_PHONE" | "DEVICE_TYPE_TABLET" | "DEVICE_TYPE_CONNECTED_DEVICE" | (string & {});
  /** Output only. Bid multiplier allows you to show your ads more or less frequently based on the device type. It will apply a multiplier on the original bid price. When this field is 0, it indicates this field is not applicable instead of multiplying 0 on the original bid price. For example, if the bid price without multiplier is $10.0 and the multiplier is 1.5 for Tablet, the resulting bid price for Tablet will be $15.0. Only applicable to YouTube and Partners line items. */
  youtubeAndPartnersBidMultiplier?: number;
}

export const DeviceTypeAssignedTargetingOptionDetails: Schema.Schema<DeviceTypeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  deviceType: Schema.optional(Schema.String),
  youtubeAndPartnersBidMultiplier: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeviceTypeAssignedTargetingOptionDetails" }) as any as Schema.Schema<DeviceTypeAssignedTargetingOptionDetails>;

export interface GoogleAudienceTargetingSetting {
  /** Required. Google audience id of the Google audience targeting setting. This id is google_audience_id. */
  googleAudienceId?: string;
}

export const GoogleAudienceTargetingSetting: Schema.Schema<GoogleAudienceTargetingSetting> = Schema.suspend(() => Schema.Struct({
  googleAudienceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAudienceTargetingSetting" }) as any as Schema.Schema<GoogleAudienceTargetingSetting>;

export interface GoogleAudienceGroup {
  /** Required. All Google audience targeting settings in Google audience group. Repeated settings with the same id will be ignored. */
  settings?: Array<GoogleAudienceTargetingSetting>;
}

export const GoogleAudienceGroup: Schema.Schema<GoogleAudienceGroup> = Schema.suspend(() => Schema.Struct({
  settings: Schema.optional(Schema.Array(GoogleAudienceTargetingSetting)),
})).annotate({ identifier: "GoogleAudienceGroup" }) as any as Schema.Schema<GoogleAudienceGroup>;

export interface CustomListTargetingSetting {
  /** Required. Custom id of custom list targeting setting. This id is custom_list_id. */
  customListId?: string;
}

export const CustomListTargetingSetting: Schema.Schema<CustomListTargetingSetting> = Schema.suspend(() => Schema.Struct({
  customListId: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomListTargetingSetting" }) as any as Schema.Schema<CustomListTargetingSetting>;

export interface CustomListGroup {
  /** Required. All custom list targeting settings in custom list group. Repeated settings with the same id will be ignored. */
  settings?: Array<CustomListTargetingSetting>;
}

export const CustomListGroup: Schema.Schema<CustomListGroup> = Schema.suspend(() => Schema.Struct({
  settings: Schema.optional(Schema.Array(CustomListTargetingSetting)),
})).annotate({ identifier: "CustomListGroup" }) as any as Schema.Schema<CustomListGroup>;

export interface CombinedAudienceTargetingSetting {
  /** Required. Combined audience id of combined audience targeting setting. This id is combined_audience_id. */
  combinedAudienceId?: string;
}

export const CombinedAudienceTargetingSetting: Schema.Schema<CombinedAudienceTargetingSetting> = Schema.suspend(() => Schema.Struct({
  combinedAudienceId: Schema.optional(Schema.String),
})).annotate({ identifier: "CombinedAudienceTargetingSetting" }) as any as Schema.Schema<CombinedAudienceTargetingSetting>;

export interface CombinedAudienceGroup {
  /** Required. All combined audience targeting settings in combined audience group. Repeated settings with the same id will be ignored. The number of combined audience settings should be no more than five, error will be thrown otherwise. */
  settings?: Array<CombinedAudienceTargetingSetting>;
}

export const CombinedAudienceGroup: Schema.Schema<CombinedAudienceGroup> = Schema.suspend(() => Schema.Struct({
  settings: Schema.optional(Schema.Array(CombinedAudienceTargetingSetting)),
})).annotate({ identifier: "CombinedAudienceGroup" }) as any as Schema.Schema<CombinedAudienceGroup>;

export interface FirstPartyAndPartnerAudienceTargetingSetting {
  /** Required. First party and partner audience id of the first party and partner audience targeting setting. This id is first_party_and_partner_audience_id. */
  firstPartyAndPartnerAudienceId?: string;
  /** Required. The recency of the first party and partner audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used. */
  recency?: "RECENCY_NO_LIMIT" | "RECENCY_1_MINUTE" | "RECENCY_5_MINUTES" | "RECENCY_10_MINUTES" | "RECENCY_15_MINUTES" | "RECENCY_30_MINUTES" | "RECENCY_1_HOUR" | "RECENCY_2_HOURS" | "RECENCY_3_HOURS" | "RECENCY_6_HOURS" | "RECENCY_12_HOURS" | "RECENCY_1_DAY" | "RECENCY_2_DAYS" | "RECENCY_3_DAYS" | "RECENCY_5_DAYS" | "RECENCY_7_DAYS" | "RECENCY_10_DAYS" | "RECENCY_14_DAYS" | "RECENCY_15_DAYS" | "RECENCY_21_DAYS" | "RECENCY_28_DAYS" | "RECENCY_30_DAYS" | "RECENCY_40_DAYS" | "RECENCY_45_DAYS" | "RECENCY_60_DAYS" | "RECENCY_90_DAYS" | "RECENCY_120_DAYS" | "RECENCY_180_DAYS" | "RECENCY_270_DAYS" | "RECENCY_365_DAYS" | (string & {});
}

export const FirstPartyAndPartnerAudienceTargetingSetting: Schema.Schema<FirstPartyAndPartnerAudienceTargetingSetting> = Schema.suspend(() => Schema.Struct({
  firstPartyAndPartnerAudienceId: Schema.optional(Schema.String),
  recency: Schema.optional(Schema.String),
})).annotate({ identifier: "FirstPartyAndPartnerAudienceTargetingSetting" }) as any as Schema.Schema<FirstPartyAndPartnerAudienceTargetingSetting>;

export interface FirstPartyAndPartnerAudienceGroup {
  /** Required. All first party and partner audience targeting settings in first party and partner audience group. Repeated settings with the same id are not allowed. */
  settings?: Array<FirstPartyAndPartnerAudienceTargetingSetting>;
}

export const FirstPartyAndPartnerAudienceGroup: Schema.Schema<FirstPartyAndPartnerAudienceGroup> = Schema.suspend(() => Schema.Struct({
  settings: Schema.optional(Schema.Array(FirstPartyAndPartnerAudienceTargetingSetting)),
})).annotate({ identifier: "FirstPartyAndPartnerAudienceGroup" }) as any as Schema.Schema<FirstPartyAndPartnerAudienceGroup>;

export interface AudienceGroupAssignedTargetingOptionDetails {
  /** Optional. The Google audience ids of the included Google audience group. Contains Google audience ids only. */
  includedGoogleAudienceGroup?: GoogleAudienceGroup;
  /** Optional. The custom list ids of the included custom list group. Contains custom list ids only. */
  includedCustomListGroup?: CustomListGroup;
  /** Optional. The combined audience ids of the included combined audience group. Contains combined audience ids only. */
  includedCombinedAudienceGroup?: CombinedAudienceGroup;
  /** Optional. The Google audience ids of the excluded Google audience group. Used for negative targeting. The COMPLEMENT of the UNION of this group and other excluded audience groups is used as an INTERSECTION to any positive audience targeting. Only contains Affinity, In-market and Installed-apps type Google audiences. All items are logically ‘OR’ of each other. */
  excludedGoogleAudienceGroup?: GoogleAudienceGroup;
  /** Optional. The first party and partner audience ids and recencies of included first party and partner audience groups. Each first party and partner audience group contains first party and partner audience ids only. The relation between each first party and partner audience group is INTERSECTION, and the result is UNION'ed with other audience groups. Repeated groups with the same settings will be ignored. */
  includedFirstPartyAndPartnerAudienceGroups?: Array<FirstPartyAndPartnerAudienceGroup>;
  /** Optional. The first party and partner audience ids and recencies of the excluded first party and partner audience group. Used for negative targeting. The COMPLEMENT of the UNION of this group and other excluded audience groups is used as an INTERSECTION to any positive audience targeting. All items are logically ‘OR’ of each other. */
  excludedFirstPartyAndPartnerAudienceGroup?: FirstPartyAndPartnerAudienceGroup;
}

export const AudienceGroupAssignedTargetingOptionDetails: Schema.Schema<AudienceGroupAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  includedGoogleAudienceGroup: Schema.optional(GoogleAudienceGroup),
  includedCustomListGroup: Schema.optional(CustomListGroup),
  includedCombinedAudienceGroup: Schema.optional(CombinedAudienceGroup),
  excludedGoogleAudienceGroup: Schema.optional(GoogleAudienceGroup),
  includedFirstPartyAndPartnerAudienceGroups: Schema.optional(Schema.Array(FirstPartyAndPartnerAudienceGroup)),
  excludedFirstPartyAndPartnerAudienceGroup: Schema.optional(FirstPartyAndPartnerAudienceGroup),
})).annotate({ identifier: "AudienceGroupAssignedTargetingOptionDetails" }) as any as Schema.Schema<AudienceGroupAssignedTargetingOptionDetails>;

export interface BrowserAssignedTargetingOptionDetails {
  /** Output only. The display name of the browser. */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BROWSER`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. All assigned browser targeting options on the same resource must have the same value for this field. */
  negative?: boolean;
}

export const BrowserAssignedTargetingOptionDetails: Schema.Schema<BrowserAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BrowserAssignedTargetingOptionDetails" }) as any as Schema.Schema<BrowserAssignedTargetingOptionDetails>;

export interface HouseholdIncomeAssignedTargetingOptionDetails {
  /** Required. The household income of the audience. */
  householdIncome?: "HOUSEHOLD_INCOME_UNSPECIFIED" | "HOUSEHOLD_INCOME_UNKNOWN" | "HOUSEHOLD_INCOME_LOWER_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT" | "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT" | "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT" | "HOUSEHOLD_INCOME_TOP_10_PERCENT" | (string & {});
}

export const HouseholdIncomeAssignedTargetingOptionDetails: Schema.Schema<HouseholdIncomeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  householdIncome: Schema.optional(Schema.String),
})).annotate({ identifier: "HouseholdIncomeAssignedTargetingOptionDetails" }) as any as Schema.Schema<HouseholdIncomeAssignedTargetingOptionDetails>;

export interface OnScreenPositionAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`. */
  targetingOptionId?: string;
  /** Output only. The on screen position. */
  onScreenPosition?: "ON_SCREEN_POSITION_UNSPECIFIED" | "ON_SCREEN_POSITION_UNKNOWN" | "ON_SCREEN_POSITION_ABOVE_THE_FOLD" | "ON_SCREEN_POSITION_BELOW_THE_FOLD" | (string & {});
  /** Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. */
  adType?: "AD_TYPE_UNSPECIFIED" | "AD_TYPE_DISPLAY" | "AD_TYPE_VIDEO" | "AD_TYPE_AUDIO" | (string & {});
}

export const OnScreenPositionAssignedTargetingOptionDetails: Schema.Schema<OnScreenPositionAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  targetingOptionId: Schema.optional(Schema.String),
  onScreenPosition: Schema.optional(Schema.String),
  adType: Schema.optional(Schema.String),
})).annotate({ identifier: "OnScreenPositionAssignedTargetingOptionDetails" }) as any as Schema.Schema<OnScreenPositionAssignedTargetingOptionDetails>;

export interface CarrierAndIspAssignedTargetingOptionDetails {
  /** Output only. The display name of the carrier or ISP. */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_CARRIER_AND_ISP`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. All assigned carrier and ISP targeting options on the same resource must have the same value for this field. */
  negative?: boolean;
}

export const CarrierAndIspAssignedTargetingOptionDetails: Schema.Schema<CarrierAndIspAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CarrierAndIspAssignedTargetingOptionDetails" }) as any as Schema.Schema<CarrierAndIspAssignedTargetingOptionDetails>;

export interface KeywordAssignedTargetingOptionDetails {
  /** Required. The keyword, for example `car insurance`. Positive keyword cannot be offensive word. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10. */
  keyword?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const KeywordAssignedTargetingOptionDetails: Schema.Schema<KeywordAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  keyword: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeywordAssignedTargetingOptionDetails" }) as any as Schema.Schema<KeywordAssignedTargetingOptionDetails>;

export interface NegativeKeywordListAssignedTargetingOptionDetails {
  /** Required. ID of the negative keyword list. Should refer to the negative_keyword_list_id field of a NegativeKeywordList resource. */
  negativeKeywordListId?: string;
}

export const NegativeKeywordListAssignedTargetingOptionDetails: Schema.Schema<NegativeKeywordListAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  negativeKeywordListId: Schema.optional(Schema.String),
})).annotate({ identifier: "NegativeKeywordListAssignedTargetingOptionDetails" }) as any as Schema.Schema<NegativeKeywordListAssignedTargetingOptionDetails>;

export interface OperatingSystemAssignedTargetingOptionDetails {
  /** Output only. The display name of the operating system. */
  displayName?: string;
  /** Required. The targeting option ID populated in targeting_option_id field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const OperatingSystemAssignedTargetingOptionDetails: Schema.Schema<OperatingSystemAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OperatingSystemAssignedTargetingOptionDetails" }) as any as Schema.Schema<OperatingSystemAssignedTargetingOptionDetails>;

export interface DeviceMakeModelAssignedTargetingOptionDetails {
  /** Output only. The display name of the device make and model. */
  displayName?: string;
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const DeviceMakeModelAssignedTargetingOptionDetails: Schema.Schema<DeviceMakeModelAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DeviceMakeModelAssignedTargetingOptionDetails" }) as any as Schema.Schema<DeviceMakeModelAssignedTargetingOptionDetails>;

export interface EnvironmentAssignedTargetingOptionDetails {
  /** Required. The serving environment. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "ENVIRONMENT_WEB_OPTIMIZED" | "ENVIRONMENT_WEB_NOT_OPTIMIZED" | "ENVIRONMENT_APP" | (string & {});
}

export const EnvironmentAssignedTargetingOptionDetails: Schema.Schema<EnvironmentAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvironmentAssignedTargetingOptionDetails" }) as any as Schema.Schema<EnvironmentAssignedTargetingOptionDetails>;

export interface InventorySourceAssignedTargetingOptionDetails {
  /** Required. ID of the inventory source. Should refer to the inventory_source_id field of an InventorySource resource. */
  inventorySourceId?: string;
}

export const InventorySourceAssignedTargetingOptionDetails: Schema.Schema<InventorySourceAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  inventorySourceId: Schema.optional(Schema.String),
})).annotate({ identifier: "InventorySourceAssignedTargetingOptionDetails" }) as any as Schema.Schema<InventorySourceAssignedTargetingOptionDetails>;

export interface CategoryAssignedTargetingOptionDetails {
  /** Output only. The display name of the category. */
  displayName?: string;
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CATEGORY`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const CategoryAssignedTargetingOptionDetails: Schema.Schema<CategoryAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CategoryAssignedTargetingOptionDetails" }) as any as Schema.Schema<CategoryAssignedTargetingOptionDetails>;

export interface ViewabilityAssignedTargetingOptionDetails {
  /** Required. The predicted viewability percentage. */
  viewability?: "VIEWABILITY_UNSPECIFIED" | "VIEWABILITY_10_PERCENT_OR_MORE" | "VIEWABILITY_20_PERCENT_OR_MORE" | "VIEWABILITY_30_PERCENT_OR_MORE" | "VIEWABILITY_40_PERCENT_OR_MORE" | "VIEWABILITY_50_PERCENT_OR_MORE" | "VIEWABILITY_60_PERCENT_OR_MORE" | "VIEWABILITY_70_PERCENT_OR_MORE" | "VIEWABILITY_80_PERCENT_OR_MORE" | "VIEWABILITY_90_PERCENT_OR_MORE" | (string & {});
}

export const ViewabilityAssignedTargetingOptionDetails: Schema.Schema<ViewabilityAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  viewability: Schema.optional(Schema.String),
})).annotate({ identifier: "ViewabilityAssignedTargetingOptionDetails" }) as any as Schema.Schema<ViewabilityAssignedTargetingOptionDetails>;

export interface AuthorizedSellerStatusAssignedTargetingOptionDetails {
  /** Output only. The authorized seller status to target. */
  authorizedSellerStatus?: "AUTHORIZED_SELLER_STATUS_UNSPECIFIED" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS" | (string & {});
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. */
  targetingOptionId?: string;
}

export const AuthorizedSellerStatusAssignedTargetingOptionDetails: Schema.Schema<AuthorizedSellerStatusAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  authorizedSellerStatus: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizedSellerStatusAssignedTargetingOptionDetails" }) as any as Schema.Schema<AuthorizedSellerStatusAssignedTargetingOptionDetails>;

export interface LanguageAssignedTargetingOptionDetails {
  /** Output only. The display name of the language (e.g., "French"). */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_LANGUAGE`. */
  targetingOptionId?: string;
  /** Indicates if this option is being negatively targeted. All assigned language targeting options on the same resource must have the same value for this field. */
  negative?: boolean;
}

export const LanguageAssignedTargetingOptionDetails: Schema.Schema<LanguageAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LanguageAssignedTargetingOptionDetails" }) as any as Schema.Schema<LanguageAssignedTargetingOptionDetails>;

export interface GeoRegionAssignedTargetingOptionDetails {
  /** Output only. The display name of the geographic region (e.g., "Ontario, Canada"). */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_GEO_REGION`. */
  targetingOptionId?: string;
  /** Output only. The type of geographic region targeting. */
  geoRegionType?: "GEO_REGION_TYPE_UNKNOWN" | "GEO_REGION_TYPE_OTHER" | "GEO_REGION_TYPE_COUNTRY" | "GEO_REGION_TYPE_REGION" | "GEO_REGION_TYPE_TERRITORY" | "GEO_REGION_TYPE_PROVINCE" | "GEO_REGION_TYPE_STATE" | "GEO_REGION_TYPE_PREFECTURE" | "GEO_REGION_TYPE_GOVERNORATE" | "GEO_REGION_TYPE_CANTON" | "GEO_REGION_TYPE_UNION_TERRITORY" | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY" | "GEO_REGION_TYPE_DMA_REGION" | "GEO_REGION_TYPE_METRO" | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT" | "GEO_REGION_TYPE_COUNTY" | "GEO_REGION_TYPE_MUNICIPALITY" | "GEO_REGION_TYPE_CITY" | "GEO_REGION_TYPE_POSTAL_CODE" | "GEO_REGION_TYPE_DEPARTMENT" | "GEO_REGION_TYPE_AIRPORT" | "GEO_REGION_TYPE_TV_REGION" | "GEO_REGION_TYPE_OKRUG" | "GEO_REGION_TYPE_BOROUGH" | "GEO_REGION_TYPE_CITY_REGION" | "GEO_REGION_TYPE_ARRONDISSEMENT" | "GEO_REGION_TYPE_NEIGHBORHOOD" | "GEO_REGION_TYPE_UNIVERSITY" | "GEO_REGION_TYPE_DISTRICT" | "GEO_REGION_TYPE_NATIONAL_PARK" | "GEO_REGION_TYPE_BARRIO" | "GEO_REGION_TYPE_SUB_WARD" | "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT" | "GEO_REGION_TYPE_SUB_DISTRICT" | "GEO_REGION_TYPE_QUARTER" | "GEO_REGION_TYPE_DIVISION" | "GEO_REGION_TYPE_COMMUNE" | "GEO_REGION_TYPE_COLLOQUIAL_AREA" | (string & {});
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const GeoRegionAssignedTargetingOptionDetails: Schema.Schema<GeoRegionAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  geoRegionType: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GeoRegionAssignedTargetingOptionDetails" }) as any as Schema.Schema<GeoRegionAssignedTargetingOptionDetails>;

export interface InventorySourceGroupAssignedTargetingOptionDetails {
  /** Required. ID of the inventory source group. Should refer to the inventory_source_group_id field of an InventorySourceGroup resource. */
  inventorySourceGroupId?: string;
}

export const InventorySourceGroupAssignedTargetingOptionDetails: Schema.Schema<InventorySourceGroupAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  inventorySourceGroupId: Schema.optional(Schema.String),
})).annotate({ identifier: "InventorySourceGroupAssignedTargetingOptionDetails" }) as any as Schema.Schema<InventorySourceGroupAssignedTargetingOptionDetails>;

export interface DigitalContentLabelAssignedTargetingOptionDetails {
  /** Required. The display name of the digital content label rating tier to be EXCLUDED. */
  excludedContentRatingTier?: "CONTENT_RATING_TIER_UNSPECIFIED" | "CONTENT_RATING_TIER_UNRATED" | "CONTENT_RATING_TIER_GENERAL" | "CONTENT_RATING_TIER_PARENTAL_GUIDANCE" | "CONTENT_RATING_TIER_TEENS" | "CONTENT_RATING_TIER_MATURE" | "CONTENT_RATING_TIER_FAMILIES" | (string & {});
}

export const DigitalContentLabelAssignedTargetingOptionDetails: Schema.Schema<DigitalContentLabelAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  excludedContentRatingTier: Schema.optional(Schema.String),
})).annotate({ identifier: "DigitalContentLabelAssignedTargetingOptionDetails" }) as any as Schema.Schema<DigitalContentLabelAssignedTargetingOptionDetails>;

export interface SensitiveCategoryAssignedTargetingOptionDetails {
  /** Required. An enum for the DV360 Sensitive category content classified to be EXCLUDED. */
  excludedSensitiveCategory?: "SENSITIVE_CATEGORY_UNSPECIFIED" | "SENSITIVE_CATEGORY_ADULT" | "SENSITIVE_CATEGORY_DEROGATORY" | "SENSITIVE_CATEGORY_DOWNLOADS_SHARING" | "SENSITIVE_CATEGORY_WEAPONS" | "SENSITIVE_CATEGORY_GAMBLING" | "SENSITIVE_CATEGORY_VIOLENCE" | "SENSITIVE_CATEGORY_SUGGESTIVE" | "SENSITIVE_CATEGORY_PROFANITY" | "SENSITIVE_CATEGORY_ALCOHOL" | "SENSITIVE_CATEGORY_DRUGS" | "SENSITIVE_CATEGORY_TOBACCO" | "SENSITIVE_CATEGORY_POLITICS" | "SENSITIVE_CATEGORY_RELIGION" | "SENSITIVE_CATEGORY_TRAGEDY" | "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS" | "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES" | "SENSITIVE_CATEGORY_SHOCKING" | "SENSITIVE_CATEGORY_EMBEDDED_VIDEO" | "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO" | (string & {});
}

export const SensitiveCategoryAssignedTargetingOptionDetails: Schema.Schema<SensitiveCategoryAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  excludedSensitiveCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "SensitiveCategoryAssignedTargetingOptionDetails" }) as any as Schema.Schema<SensitiveCategoryAssignedTargetingOptionDetails>;

export interface ContentThemeAssignedTargetingOptionDetails {
  /** Required. ID of the content theme to be EXCLUDED. */
  excludedTargetingOptionId?: string;
  /** Output only. An enum for the DV360 content theme classifier. */
  contentTheme?: "CONTENT_THEME_UNSPECIFIED" | "CONTENT_THEME_FIGHTING_VIDEO_GAMES" | "CONTENT_THEME_MATURE_GAMES" | "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES" | "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES" | "CONTENT_THEME_POLITICS" | "CONTENT_THEME_RECENT_NEWS" | "CONTENT_THEME_RELIGION" | "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT" | "CONTENT_THEME_UNPLEASANT_NEWS" | (string & {});
  /** Required. An enum for the DV360 content theme classified to be EXCLUDED. */
  excludedContentTheme?: "CONTENT_THEME_UNSPECIFIED" | "CONTENT_THEME_FIGHTING_VIDEO_GAMES" | "CONTENT_THEME_MATURE_GAMES" | "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES" | "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES" | "CONTENT_THEME_POLITICS" | "CONTENT_THEME_RECENT_NEWS" | "CONTENT_THEME_RELIGION" | "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT" | "CONTENT_THEME_UNPLEASANT_NEWS" | (string & {});
}

export const ContentThemeAssignedTargetingOptionDetails: Schema.Schema<ContentThemeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  excludedTargetingOptionId: Schema.optional(Schema.String),
  contentTheme: Schema.optional(Schema.String),
  excludedContentTheme: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentThemeAssignedTargetingOptionDetails" }) as any as Schema.Schema<ContentThemeAssignedTargetingOptionDetails>;

export interface ExchangeAssignedTargetingOptionDetails {
  /** Required. The enum value for the exchange. */
  exchange?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
}

export const ExchangeAssignedTargetingOptionDetails: Schema.Schema<ExchangeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  exchange: Schema.optional(Schema.String),
})).annotate({ identifier: "ExchangeAssignedTargetingOptionDetails" }) as any as Schema.Schema<ExchangeAssignedTargetingOptionDetails>;

export interface SubExchangeAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_SUB_EXCHANGE`. */
  targetingOptionId?: string;
}

export const SubExchangeAssignedTargetingOptionDetails: Schema.Schema<SubExchangeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  targetingOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "SubExchangeAssignedTargetingOptionDetails" }) as any as Schema.Schema<SubExchangeAssignedTargetingOptionDetails>;

export interface Adloox {
  /** Scope3 categories to exclude. */
  excludedAdlooxCategories?: Array<"ADLOOX_UNSPECIFIED" | "ADULT_CONTENT_HARD" | "ADULT_CONTENT_SOFT" | "ILLEGAL_CONTENT" | "BORDERLINE_CONTENT" | "DISCRIMINATORY_CONTENT" | "VIOLENT_CONTENT_WEAPONS" | "LOW_VIEWABILITY_DOMAINS" | "FRAUD" | (string & {})>;
  /** Optional. Scope3's fraud IVT MFA categories to exclude. */
  excludedFraudIvtMfaCategories?: Array<"FRAUD_IVT_MFA_CATEGORY_UNSPECIFIED" | "FRAUD_IVT_MFA" | (string & {})>;
  /** Optional. Adult and Explicit Sexual Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  adultExplicitSexualContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Crime and Harmful Acts Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Arms and Ammunition Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  armsAmmunitionContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Death, Injury, or Military Conflict Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  deathInjuryMilitaryConflictContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Debated Sensitive Social Issue Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  debatedSensitiveSocialIssueContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Illegal Drugs/Alcohol Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  illegalDrugsTobaccoEcigarettesVapingAlcoholContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Online Piracy Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  onlinePiracyContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Hate Speech and Acts of Aggression Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  hateSpeechActsAggressionContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Obscenity and Profanity Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  obscenityProfanityContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Spam or Harmful Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  spamHarmfulContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Terrorism Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  terrorismContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. Misinformation Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  misinformationContent?: "GARM_RISK_EXCLUSION_UNSPECIFIED" | "GARM_RISK_EXCLUSION_FLOOR" | "GARM_RISK_EXCLUSION_HIGH" | "GARM_RISK_EXCLUSION_MEDIUM" | "GARM_RISK_EXCLUSION_LOW" | (string & {});
  /** Optional. IAB viewability threshold for display ads. */
  displayIabViewability?: "DISPLAY_IAB_VIEWABILITY_UNSPECIFIED" | "DISPLAY_IAB_VIEWABILITY_10" | "DISPLAY_IAB_VIEWABILITY_20" | "DISPLAY_IAB_VIEWABILITY_35" | "DISPLAY_IAB_VIEWABILITY_50" | "DISPLAY_IAB_VIEWABILITY_75" | (string & {});
  /** Optional. IAB viewability threshold for video ads. */
  videoIabViewability?: "VIDEO_IAB_VIEWABILITY_UNSPECIFIED" | "VIDEO_IAB_VIEWABILITY_10" | "VIDEO_IAB_VIEWABILITY_20" | "VIDEO_IAB_VIEWABILITY_35" | "VIDEO_IAB_VIEWABILITY_50" | "VIDEO_IAB_VIEWABILITY_75" | (string & {});
}

export const Adloox: Schema.Schema<Adloox> = Schema.suspend(() => Schema.Struct({
  excludedAdlooxCategories: Schema.optional(Schema.Array(Schema.String)),
  excludedFraudIvtMfaCategories: Schema.optional(Schema.Array(Schema.String)),
  adultExplicitSexualContent: Schema.optional(Schema.String),
  crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent: Schema.optional(Schema.String),
  armsAmmunitionContent: Schema.optional(Schema.String),
  deathInjuryMilitaryConflictContent: Schema.optional(Schema.String),
  debatedSensitiveSocialIssueContent: Schema.optional(Schema.String),
  illegalDrugsTobaccoEcigarettesVapingAlcoholContent: Schema.optional(Schema.String),
  onlinePiracyContent: Schema.optional(Schema.String),
  hateSpeechActsAggressionContent: Schema.optional(Schema.String),
  obscenityProfanityContent: Schema.optional(Schema.String),
  spamHarmfulContent: Schema.optional(Schema.String),
  terrorismContent: Schema.optional(Schema.String),
  misinformationContent: Schema.optional(Schema.String),
  displayIabViewability: Schema.optional(Schema.String),
  videoIabViewability: Schema.optional(Schema.String),
})).annotate({ identifier: "Adloox" }) as any as Schema.Schema<Adloox>;

export interface DoubleVerifyBrandSafetyCategories {
  /** Unknown or unrateable. */
  avoidUnknownBrandSafetyCategory?: boolean;
  /** Brand safety high severity avoidance categories. */
  avoidedHighSeverityCategories?: Array<"HIGHER_SEVERITY_UNSPECIFIED" | "ADULT_CONTENT_PORNOGRAPHY" | "COPYRIGHT_INFRINGEMENT" | "SUBSTANCE_ABUSE" | "GRAPHIC_VIOLENCE_WEAPONS" | "HATE_PROFANITY" | "CRIMINAL_SKILLS" | "NUISANCE_INCENTIVIZED_MALWARE_CLUTTER" | (string & {})>;
  /** Brand safety medium severity avoidance categories. */
  avoidedMediumSeverityCategories?: Array<"MEDIUM_SEVERITY_UNSPECIFIED" | "AD_SERVERS" | "ADULT_CONTENT_SWIMSUIT" | "ALTERNATIVE_LIFESTYLES" | "CELEBRITY_GOSSIP" | "GAMBLING" | "OCCULT" | "SEX_EDUCATION" | "DISASTER_AVIATION" | "DISASTER_MAN_MADE" | "DISASTER_NATURAL" | "DISASTER_TERRORIST_EVENTS" | "DISASTER_VEHICLE" | "ALCOHOL" | "SMOKING" | "NEGATIVE_NEWS_FINANCIAL" | "NON_ENGLISH" | "PARKING_PAGE" | "UNMODERATED_UGC" | "INFLAMMATORY_POLITICS_AND_NEWS" | "NEGATIVE_NEWS_PHARMACEUTICAL" | (string & {})>;
}

export const DoubleVerifyBrandSafetyCategories: Schema.Schema<DoubleVerifyBrandSafetyCategories> = Schema.suspend(() => Schema.Struct({
  avoidUnknownBrandSafetyCategory: Schema.optional(Schema.Boolean),
  avoidedHighSeverityCategories: Schema.optional(Schema.Array(Schema.String)),
  avoidedMediumSeverityCategories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DoubleVerifyBrandSafetyCategories" }) as any as Schema.Schema<DoubleVerifyBrandSafetyCategories>;

export interface DoubleVerifyAppStarRating {
  /** Avoid bidding on apps with the star ratings. */
  avoidedStarRating?: "APP_STAR_RATE_UNSPECIFIED" | "APP_STAR_RATE_1_POINT_5_LESS" | "APP_STAR_RATE_2_LESS" | "APP_STAR_RATE_2_POINT_5_LESS" | "APP_STAR_RATE_3_LESS" | "APP_STAR_RATE_3_POINT_5_LESS" | "APP_STAR_RATE_4_LESS" | "APP_STAR_RATE_4_POINT_5_LESS" | (string & {});
  /** Avoid bidding on apps with insufficient star ratings. */
  avoidInsufficientStarRating?: boolean;
}

export const DoubleVerifyAppStarRating: Schema.Schema<DoubleVerifyAppStarRating> = Schema.suspend(() => Schema.Struct({
  avoidedStarRating: Schema.optional(Schema.String),
  avoidInsufficientStarRating: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DoubleVerifyAppStarRating" }) as any as Schema.Schema<DoubleVerifyAppStarRating>;

export interface DoubleVerifyDisplayViewability {
  /** Target web and app inventory to maximize IAB viewable rate. */
  iab?: "IAB_VIEWED_RATE_UNSPECIFIED" | "IAB_VIEWED_RATE_80_PERCENT_HIGHER" | "IAB_VIEWED_RATE_75_PERCENT_HIGHER" | "IAB_VIEWED_RATE_70_PERCENT_HIGHER" | "IAB_VIEWED_RATE_65_PERCENT_HIGHER" | "IAB_VIEWED_RATE_60_PERCENT_HIGHER" | "IAB_VIEWED_RATE_55_PERCENT_HIGHER" | "IAB_VIEWED_RATE_50_PERCENT_HIGHER" | "IAB_VIEWED_RATE_40_PERCENT_HIGHER" | "IAB_VIEWED_RATE_30_PERCENT_HIGHER" | (string & {});
  /** Target web and app inventory to maximize 100% viewable duration. */
  viewableDuring?: "AVERAGE_VIEW_DURATION_UNSPECIFIED" | "AVERAGE_VIEW_DURATION_5_SEC" | "AVERAGE_VIEW_DURATION_10_SEC" | "AVERAGE_VIEW_DURATION_15_SEC" | (string & {});
}

export const DoubleVerifyDisplayViewability: Schema.Schema<DoubleVerifyDisplayViewability> = Schema.suspend(() => Schema.Struct({
  iab: Schema.optional(Schema.String),
  viewableDuring: Schema.optional(Schema.String),
})).annotate({ identifier: "DoubleVerifyDisplayViewability" }) as any as Schema.Schema<DoubleVerifyDisplayViewability>;

export interface DoubleVerifyVideoViewability {
  /** Target web inventory to maximize IAB viewable rate. */
  videoIab?: "VIDEO_IAB_UNSPECIFIED" | "IAB_VIEWABILITY_80_PERCENT_HIGHER" | "IAB_VIEWABILITY_75_PERCENT_HIGHER" | "IAB_VIEWABILITY_70_PERCENT_HIGHER" | "IAB_VIEWABILITY_65_PERCENT_HIHGER" | "IAB_VIEWABILITY_60_PERCENT_HIGHER" | "IAB_VIEWABILITY_55_PERCENT_HIHGER" | "IAB_VIEWABILITY_50_PERCENT_HIGHER" | "IAB_VIEWABILITY_40_PERCENT_HIHGER" | "IAB_VIEWABILITY_30_PERCENT_HIHGER" | (string & {});
  /** Target web inventory to maximize fully viewable rate. */
  videoViewableRate?: "VIDEO_VIEWABLE_RATE_UNSPECIFIED" | "VIEWED_PERFORMANCE_40_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_35_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_30_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_25_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_20_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_10_PERCENT_HIGHER" | (string & {});
  /** Target inventory to maximize impressions with 400x300 or greater player size. */
  playerImpressionRate?: "PLAYER_SIZE_400X300_UNSPECIFIED" | "PLAYER_SIZE_400X300_95" | "PLAYER_SIZE_400X300_70" | "PLAYER_SIZE_400X300_25" | "PLAYER_SIZE_400X300_5" | (string & {});
}

export const DoubleVerifyVideoViewability: Schema.Schema<DoubleVerifyVideoViewability> = Schema.suspend(() => Schema.Struct({
  videoIab: Schema.optional(Schema.String),
  videoViewableRate: Schema.optional(Schema.String),
  playerImpressionRate: Schema.optional(Schema.String),
})).annotate({ identifier: "DoubleVerifyVideoViewability" }) as any as Schema.Schema<DoubleVerifyVideoViewability>;

export interface DoubleVerifyFraudInvalidTraffic {
  /** Avoid Sites and Apps with historical Fraud & IVT. */
  avoidedFraudOption?: "FRAUD_UNSPECIFIED" | "AD_IMPRESSION_FRAUD_100" | "AD_IMPRESSION_FRAUD_50" | "AD_IMPRESSION_FRAUD_25" | "AD_IMPRESSION_FRAUD_10" | "AD_IMPRESSION_FRAUD_8" | "AD_IMPRESSION_FRAUD_6" | "AD_IMPRESSION_FRAUD_4" | "AD_IMPRESSION_FRAUD_2" | (string & {});
  /** Insufficient Historical Fraud & IVT Stats. */
  avoidInsufficientOption?: boolean;
}

export const DoubleVerifyFraudInvalidTraffic: Schema.Schema<DoubleVerifyFraudInvalidTraffic> = Schema.suspend(() => Schema.Struct({
  avoidedFraudOption: Schema.optional(Schema.String),
  avoidInsufficientOption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DoubleVerifyFraudInvalidTraffic" }) as any as Schema.Schema<DoubleVerifyFraudInvalidTraffic>;

export interface DoubleVerify {
  /** DV Brand Safety Controls. */
  brandSafetyCategories?: DoubleVerifyBrandSafetyCategories;
  /** Avoid bidding on apps with the age rating. */
  avoidedAgeRatings?: Array<"AGE_RATING_UNSPECIFIED" | "APP_AGE_RATE_UNKNOWN" | "APP_AGE_RATE_4_PLUS" | "APP_AGE_RATE_9_PLUS" | "APP_AGE_RATE_12_PLUS" | "APP_AGE_RATE_17_PLUS" | "APP_AGE_RATE_18_PLUS" | (string & {})>;
  /** Avoid bidding on apps with the star ratings. */
  appStarRating?: DoubleVerifyAppStarRating;
  /** Display viewability settings (applicable to display line items only). */
  displayViewability?: DoubleVerifyDisplayViewability;
  /** Video viewability settings (applicable to video line items only). */
  videoViewability?: DoubleVerifyVideoViewability;
  /** Avoid Sites and Apps with historical Fraud & IVT Rates. */
  fraudInvalidTraffic?: DoubleVerifyFraudInvalidTraffic;
  /** The custom segment ID provided by DoubleVerify. The ID must start with "51" and consist of eight digits. Custom segment ID cannot be specified along with any of the following fields: * brand_safety_categories * avoided_age_ratings * app_star_rating * fraud_invalid_traffic */
  customSegmentId?: string;
}

export const DoubleVerify: Schema.Schema<DoubleVerify> = Schema.suspend(() => Schema.Struct({
  brandSafetyCategories: Schema.optional(DoubleVerifyBrandSafetyCategories),
  avoidedAgeRatings: Schema.optional(Schema.Array(Schema.String)),
  appStarRating: Schema.optional(DoubleVerifyAppStarRating),
  displayViewability: Schema.optional(DoubleVerifyDisplayViewability),
  videoViewability: Schema.optional(DoubleVerifyVideoViewability),
  fraudInvalidTraffic: Schema.optional(DoubleVerifyFraudInvalidTraffic),
  customSegmentId: Schema.optional(Schema.String),
})).annotate({ identifier: "DoubleVerify" }) as any as Schema.Schema<DoubleVerify>;

export interface IntegralAdScience {
  /** True advertising quality (applicable to Display line items only). */
  traqScoreOption?: "TRAQ_UNSPECIFIED" | "TRAQ_250" | "TRAQ_500" | "TRAQ_600" | "TRAQ_700" | "TRAQ_750" | "TRAQ_875" | "TRAQ_1000" | (string & {});
  /** Brand Safety - **Unrateable**. */
  excludeUnrateable?: boolean;
  /** Brand Safety - **Adult content**. */
  excludedAdultRisk?: "ADULT_UNSPECIFIED" | "ADULT_HR" | "ADULT_HMR" | (string & {});
  /** Brand Safety - **Alcohol**. */
  excludedAlcoholRisk?: "ALCOHOL_UNSPECIFIED" | "ALCOHOL_HR" | "ALCOHOL_HMR" | (string & {});
  /** Brand Safety - **Illegal downloads**. */
  excludedIllegalDownloadsRisk?: "ILLEGAL_DOWNLOADS_UNSPECIFIED" | "ILLEGAL_DOWNLOADS_HR" | "ILLEGAL_DOWNLOADS_HMR" | (string & {});
  /** Brand Safety - **Drugs**. */
  excludedDrugsRisk?: "DRUGS_UNSPECIFIED" | "DRUGS_HR" | "DRUGS_HMR" | (string & {});
  /** Brand Safety - **Hate speech**. */
  excludedHateSpeechRisk?: "HATE_SPEECH_UNSPECIFIED" | "HATE_SPEECH_HR" | "HATE_SPEECH_HMR" | (string & {});
  /** Brand Safety - **Offensive language**. */
  excludedOffensiveLanguageRisk?: "OFFENSIVE_LANGUAGE_UNSPECIFIED" | "OFFENSIVE_LANGUAGE_HR" | "OFFENSIVE_LANGUAGE_HMR" | (string & {});
  /** Brand Safety - **Violence**. */
  excludedViolenceRisk?: "VIOLENCE_UNSPECIFIED" | "VIOLENCE_HR" | "VIOLENCE_HMR" | (string & {});
  /** Brand Safety - **Gambling**. */
  excludedGamblingRisk?: "GAMBLING_UNSPECIFIED" | "GAMBLING_HR" | "GAMBLING_HMR" | (string & {});
  /** Ad Fraud settings. */
  excludedAdFraudRisk?: "SUSPICIOUS_ACTIVITY_UNSPECIFIED" | "SUSPICIOUS_ACTIVITY_HR" | "SUSPICIOUS_ACTIVITY_HMR" | "SUSPICIOUS_ACTIVITY_FD" | (string & {});
  /** Display Viewability section (applicable to display line items only). */
  displayViewability?: "PERFORMANCE_VIEWABILITY_UNSPECIFIED" | "PERFORMANCE_VIEWABILITY_40" | "PERFORMANCE_VIEWABILITY_50" | "PERFORMANCE_VIEWABILITY_60" | "PERFORMANCE_VIEWABILITY_70" | (string & {});
  /** Video Viewability Section (applicable to video line items only). */
  videoViewability?: "VIDEO_VIEWABILITY_UNSPECIFIED" | "VIDEO_VIEWABILITY_40" | "VIDEO_VIEWABILITY_50" | "VIDEO_VIEWABILITY_60" | "VIDEO_VIEWABILITY_70" | (string & {});
  /** The custom segment ID provided by Integral Ad Science. The ID must be between `1000001` and `1999999` or `3000001` and `3999999`, inclusive. */
  customSegmentId?: Array<string>;
  /** Optional. The quality sync custom segment ID provided by Integral Ad Science. The ID must be between `3000000` and `4999999`, inclusive. */
  qualitySyncCustomSegmentId?: Array<string>;
}

export const IntegralAdScience: Schema.Schema<IntegralAdScience> = Schema.suspend(() => Schema.Struct({
  traqScoreOption: Schema.optional(Schema.String),
  excludeUnrateable: Schema.optional(Schema.Boolean),
  excludedAdultRisk: Schema.optional(Schema.String),
  excludedAlcoholRisk: Schema.optional(Schema.String),
  excludedIllegalDownloadsRisk: Schema.optional(Schema.String),
  excludedDrugsRisk: Schema.optional(Schema.String),
  excludedHateSpeechRisk: Schema.optional(Schema.String),
  excludedOffensiveLanguageRisk: Schema.optional(Schema.String),
  excludedViolenceRisk: Schema.optional(Schema.String),
  excludedGamblingRisk: Schema.optional(Schema.String),
  excludedAdFraudRisk: Schema.optional(Schema.String),
  displayViewability: Schema.optional(Schema.String),
  videoViewability: Schema.optional(Schema.String),
  customSegmentId: Schema.optional(Schema.Array(Schema.String)),
  qualitySyncCustomSegmentId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IntegralAdScience" }) as any as Schema.Schema<IntegralAdScience>;

export interface ThirdPartyVerifierAssignedTargetingOptionDetails {
  /** Third party brand verifier -- Scope3 (previously known as Adloox). */
  adloox?: Adloox;
  /** Third party brand verifier -- DoubleVerify. */
  doubleVerify?: DoubleVerify;
  /** Third party brand verifier -- Integral Ad Science. */
  integralAdScience?: IntegralAdScience;
}

export const ThirdPartyVerifierAssignedTargetingOptionDetails: Schema.Schema<ThirdPartyVerifierAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  adloox: Schema.optional(Adloox),
  doubleVerify: Schema.optional(DoubleVerify),
  integralAdScience: Schema.optional(IntegralAdScience),
})).annotate({ identifier: "ThirdPartyVerifierAssignedTargetingOptionDetails" }) as any as Schema.Schema<ThirdPartyVerifierAssignedTargetingOptionDetails>;

export interface PoiAssignedTargetingOptionDetails {
  /** Output only. The display name of a POI, e.g. "Times Square", "Space Needle", followed by its full address if available. */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_POI`. Accepted POI targeting option IDs can be retrieved using `targetingTypes.targetingOptions.search`. If targeting a specific latitude/longitude coordinate removed from an address or POI name, you can generate the necessary targeting option ID by rounding the desired coordinate values to the 6th decimal place, removing the decimals, and concatenating the string values separated by a semicolon. For example, you can target the latitude/longitude pair of 40.7414691, -74.003387 using the targeting option ID "40741469;-74003387". **Upon** **creation, this field value will be updated to append a semicolon and** **alphanumerical hash value if only latitude/longitude coordinates are** **provided.** */
  targetingOptionId?: string;
  /** Output only. Latitude of the POI rounding to 6th decimal place. */
  latitude?: number;
  /** Output only. Longitude of the POI rounding to 6th decimal place. */
  longitude?: number;
  /** Required. The radius of the area around the POI that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`. */
  proximityRadiusAmount?: number;
  /** Required. The unit of distance by which the targeting radius is measured. */
  proximityRadiusUnit?: "DISTANCE_UNIT_UNSPECIFIED" | "DISTANCE_UNIT_MILES" | "DISTANCE_UNIT_KILOMETERS" | (string & {});
}

export const PoiAssignedTargetingOptionDetails: Schema.Schema<PoiAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
  proximityRadiusAmount: Schema.optional(Schema.Number),
  proximityRadiusUnit: Schema.optional(Schema.String),
})).annotate({ identifier: "PoiAssignedTargetingOptionDetails" }) as any as Schema.Schema<PoiAssignedTargetingOptionDetails>;

export interface BusinessChainAssignedTargetingOptionDetails {
  /** Output only. The display name of a business chain, e.g. "KFC", "Chase Bank". */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BUSINESS_CHAIN`. Accepted business chain targeting option IDs can be retrieved using SearchTargetingOptions. */
  targetingOptionId?: string;
  /** Required. The radius of the area around the business chain that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`. The minimum increment for both cases is 0.1. Inputs will be rounded to the nearest acceptable value if it is too granular, e.g. 15.57 will become 15.6. */
  proximityRadiusAmount?: number;
  /** Required. The unit of distance by which the targeting radius is measured. */
  proximityRadiusUnit?: "DISTANCE_UNIT_UNSPECIFIED" | "DISTANCE_UNIT_MILES" | "DISTANCE_UNIT_KILOMETERS" | (string & {});
}

export const BusinessChainAssignedTargetingOptionDetails: Schema.Schema<BusinessChainAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  proximityRadiusAmount: Schema.optional(Schema.Number),
  proximityRadiusUnit: Schema.optional(Schema.String),
})).annotate({ identifier: "BusinessChainAssignedTargetingOptionDetails" }) as any as Schema.Schema<BusinessChainAssignedTargetingOptionDetails>;

export interface ContentDurationAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_DURATION`. */
  targetingOptionId?: string;
  /** Output only. The content duration. */
  contentDuration?: "CONTENT_DURATION_UNSPECIFIED" | "CONTENT_DURATION_UNKNOWN" | "CONTENT_DURATION_0_TO_1_MIN" | "CONTENT_DURATION_1_TO_5_MIN" | "CONTENT_DURATION_5_TO_15_MIN" | "CONTENT_DURATION_15_TO_30_MIN" | "CONTENT_DURATION_30_TO_60_MIN" | "CONTENT_DURATION_OVER_60_MIN" | (string & {});
}

export const ContentDurationAssignedTargetingOptionDetails: Schema.Schema<ContentDurationAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  targetingOptionId: Schema.optional(Schema.String),
  contentDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentDurationAssignedTargetingOptionDetails" }) as any as Schema.Schema<ContentDurationAssignedTargetingOptionDetails>;

export interface ContentStreamTypeAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_STREAM_TYPE`. */
  targetingOptionId?: string;
  /** Output only. The content stream type. */
  contentStreamType?: "CONTENT_STREAM_TYPE_UNSPECIFIED" | "CONTENT_LIVE_STREAM" | "CONTENT_ON_DEMAND" | (string & {});
}

export const ContentStreamTypeAssignedTargetingOptionDetails: Schema.Schema<ContentStreamTypeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  targetingOptionId: Schema.optional(Schema.String),
  contentStreamType: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentStreamTypeAssignedTargetingOptionDetails" }) as any as Schema.Schema<ContentStreamTypeAssignedTargetingOptionDetails>;

export interface NativeContentPositionAssignedTargetingOptionDetails {
  /** Required. The content position. */
  contentPosition?: "NATIVE_CONTENT_POSITION_UNSPECIFIED" | "NATIVE_CONTENT_POSITION_UNKNOWN" | "NATIVE_CONTENT_POSITION_IN_ARTICLE" | "NATIVE_CONTENT_POSITION_IN_FEED" | "NATIVE_CONTENT_POSITION_PERIPHERAL" | "NATIVE_CONTENT_POSITION_RECOMMENDATION" | (string & {});
}

export const NativeContentPositionAssignedTargetingOptionDetails: Schema.Schema<NativeContentPositionAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "NativeContentPositionAssignedTargetingOptionDetails" }) as any as Schema.Schema<NativeContentPositionAssignedTargetingOptionDetails>;

export interface OmidAssignedTargetingOptionDetails {
  /** Required. The type of Open Measurement enabled inventory. */
  omid?: "OMID_UNSPECIFIED" | "OMID_FOR_MOBILE_DISPLAY_ADS" | (string & {});
}

export const OmidAssignedTargetingOptionDetails: Schema.Schema<OmidAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  omid: Schema.optional(Schema.String),
})).annotate({ identifier: "OmidAssignedTargetingOptionDetails" }) as any as Schema.Schema<OmidAssignedTargetingOptionDetails>;

export interface AudioContentTypeAssignedTargetingOptionDetails {
  /** Required. The audio content type. */
  audioContentType?: "AUDIO_CONTENT_TYPE_UNSPECIFIED" | "AUDIO_CONTENT_TYPE_UNKNOWN" | "AUDIO_CONTENT_TYPE_MUSIC" | "AUDIO_CONTENT_TYPE_BROADCAST" | "AUDIO_CONTENT_TYPE_PODCAST" | (string & {});
}

export const AudioContentTypeAssignedTargetingOptionDetails: Schema.Schema<AudioContentTypeAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  audioContentType: Schema.optional(Schema.String),
})).annotate({ identifier: "AudioContentTypeAssignedTargetingOptionDetails" }) as any as Schema.Schema<AudioContentTypeAssignedTargetingOptionDetails>;

export interface ContentGenreAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_GENRE`. */
  targetingOptionId?: string;
  /** Output only. The display name of the content genre. */
  displayName?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const ContentGenreAssignedTargetingOptionDetails: Schema.Schema<ContentGenreAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  targetingOptionId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContentGenreAssignedTargetingOptionDetails" }) as any as Schema.Schema<ContentGenreAssignedTargetingOptionDetails>;

export interface YoutubeVideoAssignedTargetingOptionDetails {
  /** YouTube video id as it appears on the YouTube watch page. */
  videoId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const YoutubeVideoAssignedTargetingOptionDetails: Schema.Schema<YoutubeVideoAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  videoId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "YoutubeVideoAssignedTargetingOptionDetails" }) as any as Schema.Schema<YoutubeVideoAssignedTargetingOptionDetails>;

export interface YoutubeChannelAssignedTargetingOptionDetails {
  /** The YouTube uploader channel id or the channel code of a YouTube channel. */
  channelId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const YoutubeChannelAssignedTargetingOptionDetails: Schema.Schema<YoutubeChannelAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  channelId: Schema.optional(Schema.String),
  negative: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "YoutubeChannelAssignedTargetingOptionDetails" }) as any as Schema.Schema<YoutubeChannelAssignedTargetingOptionDetails>;

export interface SessionPositionAssignedTargetingOptionDetails {
  /** The position where the ad will show in a session. */
  sessionPosition?: "SESSION_POSITION_UNSPECIFIED" | "SESSION_POSITION_FIRST_IMPRESSION" | (string & {});
}

export const SessionPositionAssignedTargetingOptionDetails: Schema.Schema<SessionPositionAssignedTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  sessionPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "SessionPositionAssignedTargetingOptionDetails" }) as any as Schema.Schema<SessionPositionAssignedTargetingOptionDetails>;

export interface AssignedTargetingOption {
  /** Output only. The resource name for this assigned targeting option. */
  name?: string;
  /** Output only. The unique ID of the assigned targeting option. The ID is only unique within a given resource and targeting type. It may be reused in other contexts. */
  assignedTargetingOptionId?: string;
  /** Output only. An alias for the assigned_targeting_option_id. This value can be used in place of `assignedTargetingOptionId` when retrieving or deleting existing targeting. This field will only be supported for all assigned targeting options of the following targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` This field is also supported for line item assigned targeting options of the following targeting types: * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` */
  assignedTargetingOptionIdAlias?: string;
  /** Output only. Identifies the type of this assigned targeting option. */
  targetingType?: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Output only. The inheritance status of the assigned targeting option. */
  inheritance?: "INHERITANCE_UNSPECIFIED" | "NOT_INHERITED" | "INHERITED_FROM_PARTNER" | "INHERITED_FROM_ADVERTISER" | (string & {});
  /** Channel details. This field will be populated when the targeting_type is `TARGETING_TYPE_CHANNEL`. */
  channelDetails?: ChannelAssignedTargetingOptionDetails;
  /** App category details. This field will be populated when the targeting_type is `TARGETING_TYPE_APP_CATEGORY`. */
  appCategoryDetails?: AppCategoryAssignedTargetingOptionDetails;
  /** App details. This field will be populated when the targeting_type is `TARGETING_TYPE_APP`. */
  appDetails?: AppAssignedTargetingOptionDetails;
  /** URL details. This field will be populated when the targeting_type is `TARGETING_TYPE_URL`. */
  urlDetails?: UrlAssignedTargetingOptionDetails;
  /** Day and time details. This field will be populated when the targeting_type is `TARGETING_TYPE_DAY_AND_TIME`. */
  dayAndTimeDetails?: DayAndTimeAssignedTargetingOptionDetails;
  /** Age range details. This field will be populated when the targeting_type is `TARGETING_TYPE_AGE_RANGE`. */
  ageRangeDetails?: AgeRangeAssignedTargetingOptionDetails;
  /** Regional location list details. This field will be populated when the targeting_type is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`. */
  regionalLocationListDetails?: RegionalLocationListAssignedTargetingOptionDetails;
  /** Proximity location list details. This field will be populated when the targeting_type is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`. */
  proximityLocationListDetails?: ProximityLocationListAssignedTargetingOptionDetails;
  /** Gender details. This field will be populated when the targeting_type is `TARGETING_TYPE_GENDER`. */
  genderDetails?: GenderAssignedTargetingOptionDetails;
  /** Video player size details. This field will be populated when the targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`. */
  videoPlayerSizeDetails?: VideoPlayerSizeAssignedTargetingOptionDetails;
  /** User rewarded content details. This field will be populated when the targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`. */
  userRewardedContentDetails?: UserRewardedContentAssignedTargetingOptionDetails;
  /** Parental status details. This field will be populated when the targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`. */
  parentalStatusDetails?: ParentalStatusAssignedTargetingOptionDetails;
  /** Content instream position details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`. */
  contentInstreamPositionDetails?: ContentInstreamPositionAssignedTargetingOptionDetails;
  /** Content outstream position details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`. */
  contentOutstreamPositionDetails?: ContentOutstreamPositionAssignedTargetingOptionDetails;
  /** Device Type details. This field will be populated when the targeting_type is `TARGETING_TYPE_DEVICE_TYPE`. */
  deviceTypeDetails?: DeviceTypeAssignedTargetingOptionDetails;
  /** Audience targeting details. This field will be populated when the targeting_type is `TARGETING_TYPE_AUDIENCE_GROUP`. You can only target one audience group option per resource. */
  audienceGroupDetails?: AudienceGroupAssignedTargetingOptionDetails;
  /** Browser details. This field will be populated when the targeting_type is `TARGETING_TYPE_BROWSER`. */
  browserDetails?: BrowserAssignedTargetingOptionDetails;
  /** Household income details. This field will be populated when the targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`. */
  householdIncomeDetails?: HouseholdIncomeAssignedTargetingOptionDetails;
  /** On screen position details. This field will be populated when the targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`. */
  onScreenPositionDetails?: OnScreenPositionAssignedTargetingOptionDetails;
  /** Carrier and ISP details. This field will be populated when the targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`. */
  carrierAndIspDetails?: CarrierAndIspAssignedTargetingOptionDetails;
  /** Keyword details. This field will be populated when the targeting_type is `TARGETING_TYPE_KEYWORD`. A maximum of 5000 direct negative keywords can be assigned to a resource. No limit on number of positive keywords that can be assigned. */
  keywordDetails?: KeywordAssignedTargetingOptionDetails;
  /** Keyword details. This field will be populated when the targeting_type is `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`. A maximum of 4 negative keyword lists can be assigned to a resource. */
  negativeKeywordListDetails?: NegativeKeywordListAssignedTargetingOptionDetails;
  /** Operating system details. This field will be populated when the targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`. */
  operatingSystemDetails?: OperatingSystemAssignedTargetingOptionDetails;
  /** Device make and model details. This field will be populated when the targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`. */
  deviceMakeModelDetails?: DeviceMakeModelAssignedTargetingOptionDetails;
  /** Environment details. This field will be populated when the targeting_type is `TARGETING_TYPE_ENVIRONMENT`. */
  environmentDetails?: EnvironmentAssignedTargetingOptionDetails;
  /** Inventory source details. This field will be populated when the targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE`. */
  inventorySourceDetails?: InventorySourceAssignedTargetingOptionDetails;
  /** Category details. This field will be populated when the targeting_type is `TARGETING_TYPE_CATEGORY`. Targeting a category will also target its subcategories. If a category is excluded from targeting and a subcategory is included, the exclusion will take precedence. */
  categoryDetails?: CategoryAssignedTargetingOptionDetails;
  /** Viewability details. This field will be populated when the targeting_type is `TARGETING_TYPE_VIEWABILITY`. You can only target one viewability option per resource. */
  viewabilityDetails?: ViewabilityAssignedTargetingOptionDetails;
  /** Authorized seller status details. This field will be populated when the targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. You can only target one authorized seller status option per resource. If a resource doesn't have an authorized seller status option, all authorized sellers indicated as DIRECT or RESELLER in the ads.txt file are targeted by default. */
  authorizedSellerStatusDetails?: AuthorizedSellerStatusAssignedTargetingOptionDetails;
  /** Language details. This field will be populated when the targeting_type is `TARGETING_TYPE_LANGUAGE`. */
  languageDetails?: LanguageAssignedTargetingOptionDetails;
  /** Geographic region details. This field will be populated when the targeting_type is `TARGETING_TYPE_GEO_REGION`. */
  geoRegionDetails?: GeoRegionAssignedTargetingOptionDetails;
  /** Inventory source group details. This field will be populated when the targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`. */
  inventorySourceGroupDetails?: InventorySourceGroupAssignedTargetingOptionDetails;
  /** Digital content label details. This field will be populated when the targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`. Digital content labels are targeting exclusions. Advertiser level digital content label exclusions, if set, are always applied in serving (even though they aren't visible in resource settings). Resource settings can exclude content labels in addition to advertiser exclusions, but can't override them. A line item won't serve if all the digital content labels are excluded. */
  digitalContentLabelExclusionDetails?: DigitalContentLabelAssignedTargetingOptionDetails;
  /** Sensitive category details. This field will be populated when the targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`. Sensitive categories are targeting exclusions. Advertiser level sensitive category exclusions, if set, are always applied in serving (even though they aren't visible in resource settings). Resource settings can exclude sensitive categories in addition to advertiser exclusions, but can't override them. */
  sensitiveCategoryExclusionDetails?: SensitiveCategoryAssignedTargetingOptionDetails;
  /** Content theme details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_THEME_EXCLUSION`. Content theme are targeting exclusions. Advertiser level content theme exclusions, if set, are always applied in serving (even though they aren't visible in resource settings). Resource settings can exclude content theme in addition to advertiser exclusions. */
  contentThemeExclusionDetails?: ContentThemeAssignedTargetingOptionDetails;
  /** Exchange details. This field will be populated when the targeting_type is `TARGETING_TYPE_EXCHANGE`. */
  exchangeDetails?: ExchangeAssignedTargetingOptionDetails;
  /** Sub-exchange details. This field will be populated when the targeting_type is `TARGETING_TYPE_SUB_EXCHANGE`. */
  subExchangeDetails?: SubExchangeAssignedTargetingOptionDetails;
  /** Third party verification details. This field will be populated when the targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`. */
  thirdPartyVerifierDetails?: ThirdPartyVerifierAssignedTargetingOptionDetails;
  /** POI details. This field will be populated when the targeting_type is `TARGETING_TYPE_POI`. */
  poiDetails?: PoiAssignedTargetingOptionDetails;
  /** Business chain details. This field will be populated when the targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`. */
  businessChainDetails?: BusinessChainAssignedTargetingOptionDetails;
  /** Content duration details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_DURATION`. */
  contentDurationDetails?: ContentDurationAssignedTargetingOptionDetails;
  /** Content duration details. This field will be populated when the TargetingType is `TARGETING_TYPE_CONTENT_STREAM_TYPE`. */
  contentStreamTypeDetails?: ContentStreamTypeAssignedTargetingOptionDetails;
  /** Native content position details. This field will be populated when the targeting_type is `TARGETING_TYPE_NATIVE_CONTENT_POSITION`. */
  nativeContentPositionDetails?: NativeContentPositionAssignedTargetingOptionDetails;
  /** Open Measurement enabled inventory details. This field will be populated when the targeting_type is `TARGETING_TYPE_OMID`. */
  omidDetails?: OmidAssignedTargetingOptionDetails;
  /** Audio content type details. This field will be populated when the targeting_type is `TARGETING_TYPE_AUDIO_CONTENT_TYPE`. */
  audioContentTypeDetails?: AudioContentTypeAssignedTargetingOptionDetails;
  /** Content genre details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_GENRE`. */
  contentGenreDetails?: ContentGenreAssignedTargetingOptionDetails;
  /** YouTube video details. This field will be populated when the targeting_type is `TARGETING_TYPE_YOUTUBE_VIDEO`. */
  youtubeVideoDetails?: YoutubeVideoAssignedTargetingOptionDetails;
  /** YouTube channel details. This field will be populated when the targeting_type is `TARGETING_TYPE_YOUTUBE_CHANNEL`. */
  youtubeChannelDetails?: YoutubeChannelAssignedTargetingOptionDetails;
  /** Session position details. This field will be populated when the targeting_type is `TARGETING_TYPE_SESSION_POSITION`. */
  sessionPositionDetails?: SessionPositionAssignedTargetingOptionDetails;
}

export const AssignedTargetingOption: Schema.Schema<AssignedTargetingOption> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  assignedTargetingOptionId: Schema.optional(Schema.String),
  assignedTargetingOptionIdAlias: Schema.optional(Schema.String),
  targetingType: Schema.optional(Schema.String),
  inheritance: Schema.optional(Schema.String),
  channelDetails: Schema.optional(ChannelAssignedTargetingOptionDetails),
  appCategoryDetails: Schema.optional(AppCategoryAssignedTargetingOptionDetails),
  appDetails: Schema.optional(AppAssignedTargetingOptionDetails),
  urlDetails: Schema.optional(UrlAssignedTargetingOptionDetails),
  dayAndTimeDetails: Schema.optional(DayAndTimeAssignedTargetingOptionDetails),
  ageRangeDetails: Schema.optional(AgeRangeAssignedTargetingOptionDetails),
  regionalLocationListDetails: Schema.optional(RegionalLocationListAssignedTargetingOptionDetails),
  proximityLocationListDetails: Schema.optional(ProximityLocationListAssignedTargetingOptionDetails),
  genderDetails: Schema.optional(GenderAssignedTargetingOptionDetails),
  videoPlayerSizeDetails: Schema.optional(VideoPlayerSizeAssignedTargetingOptionDetails),
  userRewardedContentDetails: Schema.optional(UserRewardedContentAssignedTargetingOptionDetails),
  parentalStatusDetails: Schema.optional(ParentalStatusAssignedTargetingOptionDetails),
  contentInstreamPositionDetails: Schema.optional(ContentInstreamPositionAssignedTargetingOptionDetails),
  contentOutstreamPositionDetails: Schema.optional(ContentOutstreamPositionAssignedTargetingOptionDetails),
  deviceTypeDetails: Schema.optional(DeviceTypeAssignedTargetingOptionDetails),
  audienceGroupDetails: Schema.optional(AudienceGroupAssignedTargetingOptionDetails),
  browserDetails: Schema.optional(BrowserAssignedTargetingOptionDetails),
  householdIncomeDetails: Schema.optional(HouseholdIncomeAssignedTargetingOptionDetails),
  onScreenPositionDetails: Schema.optional(OnScreenPositionAssignedTargetingOptionDetails),
  carrierAndIspDetails: Schema.optional(CarrierAndIspAssignedTargetingOptionDetails),
  keywordDetails: Schema.optional(KeywordAssignedTargetingOptionDetails),
  negativeKeywordListDetails: Schema.optional(NegativeKeywordListAssignedTargetingOptionDetails),
  operatingSystemDetails: Schema.optional(OperatingSystemAssignedTargetingOptionDetails),
  deviceMakeModelDetails: Schema.optional(DeviceMakeModelAssignedTargetingOptionDetails),
  environmentDetails: Schema.optional(EnvironmentAssignedTargetingOptionDetails),
  inventorySourceDetails: Schema.optional(InventorySourceAssignedTargetingOptionDetails),
  categoryDetails: Schema.optional(CategoryAssignedTargetingOptionDetails),
  viewabilityDetails: Schema.optional(ViewabilityAssignedTargetingOptionDetails),
  authorizedSellerStatusDetails: Schema.optional(AuthorizedSellerStatusAssignedTargetingOptionDetails),
  languageDetails: Schema.optional(LanguageAssignedTargetingOptionDetails),
  geoRegionDetails: Schema.optional(GeoRegionAssignedTargetingOptionDetails),
  inventorySourceGroupDetails: Schema.optional(InventorySourceGroupAssignedTargetingOptionDetails),
  digitalContentLabelExclusionDetails: Schema.optional(DigitalContentLabelAssignedTargetingOptionDetails),
  sensitiveCategoryExclusionDetails: Schema.optional(SensitiveCategoryAssignedTargetingOptionDetails),
  contentThemeExclusionDetails: Schema.optional(ContentThemeAssignedTargetingOptionDetails),
  exchangeDetails: Schema.optional(ExchangeAssignedTargetingOptionDetails),
  subExchangeDetails: Schema.optional(SubExchangeAssignedTargetingOptionDetails),
  thirdPartyVerifierDetails: Schema.optional(ThirdPartyVerifierAssignedTargetingOptionDetails),
  poiDetails: Schema.optional(PoiAssignedTargetingOptionDetails),
  businessChainDetails: Schema.optional(BusinessChainAssignedTargetingOptionDetails),
  contentDurationDetails: Schema.optional(ContentDurationAssignedTargetingOptionDetails),
  contentStreamTypeDetails: Schema.optional(ContentStreamTypeAssignedTargetingOptionDetails),
  nativeContentPositionDetails: Schema.optional(NativeContentPositionAssignedTargetingOptionDetails),
  omidDetails: Schema.optional(OmidAssignedTargetingOptionDetails),
  audioContentTypeDetails: Schema.optional(AudioContentTypeAssignedTargetingOptionDetails),
  contentGenreDetails: Schema.optional(ContentGenreAssignedTargetingOptionDetails),
  youtubeVideoDetails: Schema.optional(YoutubeVideoAssignedTargetingOptionDetails),
  youtubeChannelDetails: Schema.optional(YoutubeChannelAssignedTargetingOptionDetails),
  sessionPositionDetails: Schema.optional(SessionPositionAssignedTargetingOptionDetails),
})).annotate({ identifier: "AssignedTargetingOption" }) as any as Schema.Schema<AssignedTargetingOption>;

export interface ListLineItemAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListLineItemAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const ListLineItemAssignedTargetingOptionsResponse: Schema.Schema<ListLineItemAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  assignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLineItemAssignedTargetingOptionsResponse" }) as any as Schema.Schema<ListLineItemAssignedTargetingOptionsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface LineItemAssignedTargetingOption {
  /** The ID of the line item the assigned targeting option is assigned to. */
  lineItemId?: string;
  /** The assigned targeting option resource. */
  assignedTargetingOption?: AssignedTargetingOption;
}

export const LineItemAssignedTargetingOption: Schema.Schema<LineItemAssignedTargetingOption> = Schema.suspend(() => Schema.Struct({
  lineItemId: Schema.optional(Schema.String),
  assignedTargetingOption: Schema.optional(AssignedTargetingOption),
})).annotate({ identifier: "LineItemAssignedTargetingOption" }) as any as Schema.Schema<LineItemAssignedTargetingOption>;

export interface BulkListAssignedTargetingOptionsResponse {
  /** The list of wrapper objects, each providing an assigned targeting option and the line item it is assigned to. This list will be absent if empty. */
  lineItemAssignedTargetingOptions?: Array<LineItemAssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent call to `BulkListAssignedTargetingOptions` to fetch the next page of results. This token will be absent if there are no more line_item_assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const BulkListAssignedTargetingOptionsResponse: Schema.Schema<BulkListAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  lineItemAssignedTargetingOptions: Schema.optional(Schema.Array(LineItemAssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkListAssignedTargetingOptionsResponse" }) as any as Schema.Schema<BulkListAssignedTargetingOptionsResponse>;

export interface DeleteAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. */
  targetingType?: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The assigned targeting option IDs to delete. */
  assignedTargetingOptionIds?: Array<string>;
}

export const DeleteAssignedTargetingOptionsRequest: Schema.Schema<DeleteAssignedTargetingOptionsRequest> = Schema.suspend(() => Schema.Struct({
  targetingType: Schema.optional(Schema.String),
  assignedTargetingOptionIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeleteAssignedTargetingOptionsRequest" }) as any as Schema.Schema<DeleteAssignedTargetingOptionsRequest>;

export interface CreateAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. */
  targetingType?: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The assigned targeting options to create and add. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const CreateAssignedTargetingOptionsRequest: Schema.Schema<CreateAssignedTargetingOptionsRequest> = Schema.suspend(() => Schema.Struct({
  targetingType: Schema.optional(Schema.String),
  assignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
})).annotate({ identifier: "CreateAssignedTargetingOptionsRequest" }) as any as Schema.Schema<CreateAssignedTargetingOptionsRequest>;

export interface BulkEditAssignedTargetingOptionsRequest {
  /** Required. The ID of the line items whose targeting is being updated. */
  lineItemIds?: Array<string>;
  /** The assigned targeting options to delete in batch, specified as a list of DeleteAssignedTargetingOptionsRequest. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** The assigned targeting options to create in batch, specified as a list of CreateAssignedTargetingOptionsRequest. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
}

export const BulkEditAssignedTargetingOptionsRequest: Schema.Schema<BulkEditAssignedTargetingOptionsRequest> = Schema.suspend(() => Schema.Struct({
  lineItemIds: Schema.optional(Schema.Array(Schema.String)),
  deleteRequests: Schema.optional(Schema.Array(DeleteAssignedTargetingOptionsRequest)),
  createRequests: Schema.optional(Schema.Array(CreateAssignedTargetingOptionsRequest)),
})).annotate({ identifier: "BulkEditAssignedTargetingOptionsRequest" }) as any as Schema.Schema<BulkEditAssignedTargetingOptionsRequest>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface BulkEditAssignedTargetingOptionsResponse {
  /** Output only. The IDs of the line items which successfully updated. */
  updatedLineItemIds?: Array<string>;
  /** Output only. The IDs of the line items which failed. */
  failedLineItemIds?: Array<string>;
  /** The error information for each line item that failed to update. */
  errors?: Array<Status>;
}

export const BulkEditAssignedTargetingOptionsResponse: Schema.Schema<BulkEditAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  updatedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
  failedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
  errors: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "BulkEditAssignedTargetingOptionsResponse" }) as any as Schema.Schema<BulkEditAssignedTargetingOptionsResponse>;

export interface ListAdGroupAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListAdGroupAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more AssignedTargetingOption resources to return. */
  nextPageToken?: string;
}

export const ListAdGroupAssignedTargetingOptionsResponse: Schema.Schema<ListAdGroupAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  assignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdGroupAssignedTargetingOptionsResponse" }) as any as Schema.Schema<ListAdGroupAssignedTargetingOptionsResponse>;

export interface AdGroupAssignedTargetingOption {
  /** The ID of the ad group the assigned targeting option is assigned to. */
  adGroupId?: string;
  /** The assigned targeting option resource. */
  assignedTargetingOption?: AssignedTargetingOption;
}

export const AdGroupAssignedTargetingOption: Schema.Schema<AdGroupAssignedTargetingOption> = Schema.suspend(() => Schema.Struct({
  adGroupId: Schema.optional(Schema.String),
  assignedTargetingOption: Schema.optional(AssignedTargetingOption),
})).annotate({ identifier: "AdGroupAssignedTargetingOption" }) as any as Schema.Schema<AdGroupAssignedTargetingOption>;

export interface BulkListAdGroupAssignedTargetingOptionsResponse {
  /** The list of wrapper objects, each providing an assigned targeting option and the ad group it is assigned to. This list will be absent if empty. */
  adGroupAssignedTargetingOptions?: Array<AdGroupAssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent call to `BulkListAdGroupAssignedTargetingOptions` to fetch the next page of results. This token will be absent if there are no more AdGroupAssignedTargetingOption resources to return. */
  nextPageToken?: string;
}

export const BulkListAdGroupAssignedTargetingOptionsResponse: Schema.Schema<BulkListAdGroupAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  adGroupAssignedTargetingOptions: Schema.optional(Schema.Array(AdGroupAssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkListAdGroupAssignedTargetingOptionsResponse" }) as any as Schema.Schema<BulkListAdGroupAssignedTargetingOptionsResponse>;

export interface FixedBidStrategy {
  /** The fixed bid amount, in micros of the advertiser's currency. For insertion order entity, bid_amount_micros should be set as 0. For line item entity, bid_amount_micros must be greater than or equal to billable unit of the given currency and smaller than or equal to the upper limit 1000000000. For example, 1500000 represents 1.5 standard units of the currency. */
  bidAmountMicros?: string;
}

export const FixedBidStrategy: Schema.Schema<FixedBidStrategy> = Schema.suspend(() => Schema.Struct({
  bidAmountMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "FixedBidStrategy" }) as any as Schema.Schema<FixedBidStrategy>;

export interface MaximizeSpendBidStrategy {
  /** Required. The type of the performance goal that the bidding strategy tries to minimize while spending the full budget. `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` is not supported for this strategy. */
  performanceGoalType?: "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH" | (string & {});
  /** The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. For example, 1500000 represents 1.5 standard units of the currency. */
  maxAverageCpmBidAmountMicros?: string;
  /** Whether the strategy takes deal floor prices into account. */
  raiseBidForDeals?: boolean;
  /** The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error. */
  customBiddingAlgorithmId?: string;
}

export const MaximizeSpendBidStrategy: Schema.Schema<MaximizeSpendBidStrategy> = Schema.suspend(() => Schema.Struct({
  performanceGoalType: Schema.optional(Schema.String),
  maxAverageCpmBidAmountMicros: Schema.optional(Schema.String),
  raiseBidForDeals: Schema.optional(Schema.Boolean),
  customBiddingAlgorithmId: Schema.optional(Schema.String),
})).annotate({ identifier: "MaximizeSpendBidStrategy" }) as any as Schema.Schema<MaximizeSpendBidStrategy>;

export interface PerformanceGoalBidStrategy {
  /** Required. The type of the performance goal that the bidding strategy will try to meet or beat. For line item level usage, the value must be one of: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. */
  performanceGoalType?: "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH" | (string & {});
  /** Required. The performance goal the bidding strategy will attempt to meet or beat, in micros of the advertiser's currency or in micro of the ROAS (Return On Advertising Spend) value which is also based on advertiser's currency. Must be greater than or equal to a billable unit of the given currency and smaller or equal to upper bounds. Each performance_goal_type has its upper bound: * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, upper bound is 10000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`, upper bound is 1000.00 and lower bound is 0.01. Example: If set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, the bid price will be based on the probability that each available impression will be viewable. For example, if viewable CPM target is $2 and an impression is 40% likely to be viewable, the bid price will be $0.80 CPM (40% of $2). For example, 1500000 represents 1.5 standard units of the currency or ROAS value. */
  performanceGoalAmountMicros?: string;
  /** The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. Not applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`. For example, 1500000 represents 1.5 standard units of the currency. */
  maxAverageCpmBidAmountMicros?: string;
  /** The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error. */
  customBiddingAlgorithmId?: string;
}

export const PerformanceGoalBidStrategy: Schema.Schema<PerformanceGoalBidStrategy> = Schema.suspend(() => Schema.Struct({
  performanceGoalType: Schema.optional(Schema.String),
  performanceGoalAmountMicros: Schema.optional(Schema.String),
  maxAverageCpmBidAmountMicros: Schema.optional(Schema.String),
  customBiddingAlgorithmId: Schema.optional(Schema.String),
})).annotate({ identifier: "PerformanceGoalBidStrategy" }) as any as Schema.Schema<PerformanceGoalBidStrategy>;

export interface YoutubeAndPartnersBiddingStrategy {
  /** The type of the bidding strategy. */
  type?: "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_UNSPECIFIED" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_LIFT" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPV" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE" | (string & {});
  /** The value used by the bidding strategy. When the bidding strategy is assigned at the line item level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_SHARE_OF_VOICE` When the bidding strategy is assigned at the ad group level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` If not using an applicable strategy, the value of this field will be 0. */
  value?: string;
  /** Output only. The effective target CPA for ad group, in micros of advertiser's currency. */
  adGroupEffectiveTargetCpaValue?: string;
  /** Output only. Source of the effective target CPA value for ad group. */
  adGroupEffectiveTargetCpaSource?: "BIDDING_SOURCE_UNSPECIFIED" | "BIDDING_SOURCE_LINE_ITEM" | "BIDDING_SOURCE_AD_GROUP" | (string & {});
}

export const YoutubeAndPartnersBiddingStrategy: Schema.Schema<YoutubeAndPartnersBiddingStrategy> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  adGroupEffectiveTargetCpaValue: Schema.optional(Schema.String),
  adGroupEffectiveTargetCpaSource: Schema.optional(Schema.String),
})).annotate({ identifier: "YoutubeAndPartnersBiddingStrategy" }) as any as Schema.Schema<YoutubeAndPartnersBiddingStrategy>;

export interface BiddingStrategy {
  /** A strategy that uses a fixed bid price. */
  fixedBid?: FixedBidStrategy;
  /** A strategy that automatically adjusts the bid to optimize to your performance goal while spending the full budget. At insertion order level, the markup_type of line items cannot be set to `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`. In addition, the performance_goal_type value assigned to an insertion order determines the possible line_item_type values available for line items under that insertion order: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, and `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` only allow for `LINE_ITEM_TYPE_DISPLAY_DEFAULT` or `LINE_ITEM_TYPE_VIDEO_DEFAULT` line items. * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` and `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` only allow for `LINE_ITEM_TYPE_VIDEO_DEFAULT` line items. * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH` only allows for `LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP` line items. */
  maximizeSpendAutoBid?: MaximizeSpendBidStrategy;
  /** A strategy that automatically adjusts the bid to meet or beat a specified performance goal. It is to be used only for a line item entity. */
  performanceGoalAutoBid?: PerformanceGoalBidStrategy;
  /** A bid strategy used by YouTube and Partners resources. It can only be used for a YouTube and Partners line item or ad group entity. */
  youtubeAndPartnersBid?: YoutubeAndPartnersBiddingStrategy;
}

export const BiddingStrategy: Schema.Schema<BiddingStrategy> = Schema.suspend(() => Schema.Struct({
  fixedBid: Schema.optional(FixedBidStrategy),
  maximizeSpendAutoBid: Schema.optional(MaximizeSpendBidStrategy),
  performanceGoalAutoBid: Schema.optional(PerformanceGoalBidStrategy),
  youtubeAndPartnersBid: Schema.optional(YoutubeAndPartnersBiddingStrategy),
})).annotate({ identifier: "BiddingStrategy" }) as any as Schema.Schema<BiddingStrategy>;

export interface TargetingExpansionConfig {
  /** Required. Whether to enable Optimized Targeting for the line item. Optimized targeting is not compatible with all bid strategies. Attempting to set this field to `true` for a line item using the BiddingStrategy field fixed_bid or one of the following combinations of BiddingStrategy fields and BiddingStrategyPerformanceGoalType will result in an error: maximize_auto_spend_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` performance_goal_auto_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` This also applies if the line item inherits one of the above bid strategies from the parent insertion order. Bid strategies set at the insertion order-level will be inherited by their line items if the `InsertionOrder` budget field automationType is set to `INSERTION_ORDER_AUTOMATION_TYPE_BUDGET` or `INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET`. */
  enableOptimizedTargeting?: boolean;
  /** Output only. Whether to exclude seed list for audience expansion. This field only applies to YouTube and Partners line item and ad group resources. */
  audienceExpansionSeedListExcluded?: boolean;
  /** Output only. Magnitude of expansion for eligible first-party user lists under this ad group. This field only applies to YouTube and Partners line item and ad group resources. */
  audienceExpansionLevel?: "UNKNOWN" | "NO_REACH" | "LEAST_REACH" | "MID_REACH" | "MOST_REACH" | (string & {});
}

export const TargetingExpansionConfig: Schema.Schema<TargetingExpansionConfig> = Schema.suspend(() => Schema.Struct({
  enableOptimizedTargeting: Schema.optional(Schema.Boolean),
  audienceExpansionSeedListExcluded: Schema.optional(Schema.Boolean),
  audienceExpansionLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetingExpansionConfig" }) as any as Schema.Schema<TargetingExpansionConfig>;

export interface CustomLabel {
  /** The key of the label. */
  key?: "CUSTOM_LABEL_KEY_UNSPECIFIED" | "CUSTOM_LABEL_KEY_0" | "CUSTOM_LABEL_KEY_1" | "CUSTOM_LABEL_KEY_2" | "CUSTOM_LABEL_KEY_3" | "CUSTOM_LABEL_KEY_4" | (string & {});
  /** The value of the label. */
  value?: string;
}

export const CustomLabel: Schema.Schema<CustomLabel> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomLabel" }) as any as Schema.Schema<CustomLabel>;

export interface ProductMatchDimension {
  /** The ID of the product offer to match with a product with the same offer ID. */
  productOfferId?: string;
  /** The custom label to match all the products with the label. */
  customLabel?: CustomLabel;
}

export const ProductMatchDimension: Schema.Schema<ProductMatchDimension> = Schema.suspend(() => Schema.Struct({
  productOfferId: Schema.optional(Schema.String),
  customLabel: Schema.optional(CustomLabel),
})).annotate({ identifier: "ProductMatchDimension" }) as any as Schema.Schema<ProductMatchDimension>;

export interface ProductFeedData {
  /** How products are selected by the product feed. */
  productMatchType?: "PRODUCT_MATCH_TYPE_UNSPECIFIED" | "PRODUCT_MATCH_TYPE_ALL_PRODUCTS" | "PRODUCT_MATCH_TYPE_SPECIFIC_PRODUCTS" | "PRODUCT_MATCH_TYPE_CUSTOM_LABEL" | (string & {});
  /** A list of dimensions used to match products. */
  productMatchDimensions?: Array<ProductMatchDimension>;
  /** Whether the product feed has opted-out of showing products. */
  isFeedDisabled?: boolean;
}

export const ProductFeedData: Schema.Schema<ProductFeedData> = Schema.suspend(() => Schema.Struct({
  productMatchType: Schema.optional(Schema.String),
  productMatchDimensions: Schema.optional(Schema.Array(ProductMatchDimension)),
  isFeedDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ProductFeedData" }) as any as Schema.Schema<ProductFeedData>;

export interface AdGroup {
  /** Output only. Identifier. The resource name of the ad group. */
  name?: string;
  /** Output only. The unique ID of the advertiser the ad group belongs to. */
  advertiserId?: string;
  /** Output only. The unique ID of the ad group. Assigned by the system. */
  adGroupId?: string;
  /** Required. The unique ID of the line item that the ad group belongs to. */
  lineItemId?: string;
  /** Required. The display name of the ad group. Must be UTF-8 encoded with a maximum size of 255 bytes. */
  displayName?: string;
  /** Required. The format of the ads in the ad group. */
  adGroupFormat?: "AD_GROUP_FORMAT_UNSPECIFIED" | "AD_GROUP_FORMAT_IN_STREAM" | "AD_GROUP_FORMAT_VIDEO_DISCOVERY" | "AD_GROUP_FORMAT_BUMPER" | "AD_GROUP_FORMAT_NON_SKIPPABLE_IN_STREAM" | "AD_GROUP_FORMAT_AUDIO" | "AD_GROUP_FORMAT_RESPONSIVE" | "AD_GROUP_FORMAT_REACH" | "AD_GROUP_FORMAT_MASTHEAD" | (string & {});
  /** Optional. The bidding strategy used by the ad group. Only the youtubeAndPartnersBid and demandGenBid field can be used in the bidding strategy. */
  bidStrategy?: BiddingStrategy;
  /** Required. Controls whether or not the ad group can spend its budget and bid on inventory. If the ad group's parent line item is not active, the ad group can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Optional. The [optimized targeting](//support.google.com/displayvideo/answer/12060859) settings of the ad group. */
  targetingExpansion?: TargetingExpansionConfig;
  /** Optional. The settings of the product feed in this ad group. */
  productFeedData?: ProductFeedData;
}

export const AdGroup: Schema.Schema<AdGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  adGroupId: Schema.optional(Schema.String),
  lineItemId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  adGroupFormat: Schema.optional(Schema.String),
  bidStrategy: Schema.optional(BiddingStrategy),
  entityStatus: Schema.optional(Schema.String),
  targetingExpansion: Schema.optional(TargetingExpansionConfig),
  productFeedData: Schema.optional(ProductFeedData),
})).annotate({ identifier: "AdGroup" }) as any as Schema.Schema<AdGroup>;

export interface ListAdGroupsResponse {
  /** The list of ad groups. This list will be absent if empty. */
  adGroups?: Array<AdGroup>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdGroups` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdGroupsResponse: Schema.Schema<ListAdGroupsResponse> = Schema.suspend(() => Schema.Struct({
  adGroups: Schema.optional(Schema.Array(AdGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdGroupsResponse" }) as any as Schema.Schema<ListAdGroupsResponse>;

export interface ListAdvertiserAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListAdvertiserAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const ListAdvertiserAssignedTargetingOptionsResponse: Schema.Schema<ListAdvertiserAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  assignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdvertiserAssignedTargetingOptionsResponse" }) as any as Schema.Schema<ListAdvertiserAssignedTargetingOptionsResponse>;

export interface BulkListAdvertiserAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent BulkListAdvertiserAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const BulkListAdvertiserAssignedTargetingOptionsResponse: Schema.Schema<BulkListAdvertiserAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  assignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkListAdvertiserAssignedTargetingOptionsResponse" }) as any as Schema.Schema<BulkListAdvertiserAssignedTargetingOptionsResponse>;

export interface BulkEditAdvertiserAssignedTargetingOptionsRequest {
  /** The assigned targeting options to delete in batch, specified as a list of `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** The assigned targeting options to create in batch, specified as a list of `CreateAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
}

export const BulkEditAdvertiserAssignedTargetingOptionsRequest: Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsRequest> = Schema.suspend(() => Schema.Struct({
  deleteRequests: Schema.optional(Schema.Array(DeleteAssignedTargetingOptionsRequest)),
  createRequests: Schema.optional(Schema.Array(CreateAssignedTargetingOptionsRequest)),
})).annotate({ identifier: "BulkEditAdvertiserAssignedTargetingOptionsRequest" }) as any as Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsRequest>;

export interface BulkEditAdvertiserAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options that have been successfully created. This list will be absent if empty. */
  createdAssignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const BulkEditAdvertiserAssignedTargetingOptionsResponse: Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  createdAssignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
})).annotate({ identifier: "BulkEditAdvertiserAssignedTargetingOptionsResponse" }) as any as Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsResponse>;

export interface AdvertiserGeneralConfig {
  /** Required. The domain URL of the advertiser's primary website. The system will send this information to publishers that require website URL to associate a campaign with an advertiser. Provide a URL with no path or query string, beginning with `http:` or `https:`. For example, http://www.example.com */
  domainUrl?: string;
  /** Output only. The standard TZ database name of the advertiser's time zone. For example, `America/New_York`. See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones For CM360 hybrid advertisers, the time zone is the same as that of the associated CM360 account; for third-party only advertisers, the time zone is the same as that of the parent partner. */
  timeZone?: string;
  /** Required. Immutable. Advertiser's currency in ISO 4217 format. Accepted codes and the currencies they represent are: Currency Code : Currency Name * `ARS` : Argentine Peso * `AUD` : Australian Dollar * `BRL` : Brazilian Real * `CAD` : Canadian Dollar * `CHF` : Swiss Franc * `CLP` : Chilean Peso * `CNY` : Chinese Yuan * `COP` : Colombian Peso * `CZK` : Czech Koruna * `DKK` : Danish Krone * `EGP` : Egyption Pound * `EUR` : Euro * `GBP` : British Pound * `HKD` : Hong Kong Dollar * `HUF` : Hungarian Forint * `IDR` : Indonesian Rupiah * `ILS` : Israeli Shekel * `INR` : Indian Rupee * `JPY` : Japanese Yen * `KRW` : South Korean Won * `MXN` : Mexican Pesos * `MYR` : Malaysian Ringgit * `NGN` : Nigerian Naira * `NOK` : Norwegian Krone * `NZD` : New Zealand Dollar * `PEN` : Peruvian Nuevo Sol * `PLN` : Polish Zloty * `RON` : New Romanian Leu * `RUB` : Russian Ruble * `SEK` : Swedish Krona * `TRY` : Turkish Lira * `TWD` : New Taiwan Dollar * `USD` : US Dollar * `ZAR` : South African Rand */
  currencyCode?: string;
}

export const AdvertiserGeneralConfig: Schema.Schema<AdvertiserGeneralConfig> = Schema.suspend(() => Schema.Struct({
  domainUrl: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvertiserGeneralConfig" }) as any as Schema.Schema<AdvertiserGeneralConfig>;

export interface ThirdPartyOnlyConfig {
  /** Whether or not order ID reporting for pixels is enabled. This value cannot be changed once set to `true`. */
  pixelOrderIdReportingEnabled?: boolean;
}

export const ThirdPartyOnlyConfig: Schema.Schema<ThirdPartyOnlyConfig> = Schema.suspend(() => Schema.Struct({
  pixelOrderIdReportingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ThirdPartyOnlyConfig" }) as any as Schema.Schema<ThirdPartyOnlyConfig>;

export interface CmHybridConfig {
  /** Required. Immutable. Account ID of the CM360 Floodlight configuration linked with the DV360 advertiser. */
  cmAccountId?: string;
  /** Required. Immutable. ID of the CM360 Floodlight configuration linked with the DV360 advertiser. */
  cmFloodlightConfigId?: string;
  /** Output only. The set of CM360 Advertiser IDs sharing the CM360 Floodlight configuration. */
  cmAdvertiserIds?: Array<string>;
  /** A list of CM360 sites whose placements will be synced to DV360 as creatives. If absent or empty in CreateAdvertiser method, the system will automatically create a CM360 site. Removing sites from this list may cause DV360 creatives synced from CM360 to be deleted. At least one site must be specified. */
  cmSyncableSiteIds?: Array<string>;
  /** Whether or not to include DV360 data in CM360 data transfer reports. */
  dv360ToCmDataSharingEnabled?: boolean;
  /** Whether or not to report DV360 cost to CM360. */
  dv360ToCmCostReportingEnabled?: boolean;
  /** Required. Immutable. By setting this field to `true`, you, on behalf of your company, authorize the sharing of information from the given Floodlight configuration to this Display & Video 360 advertiser. */
  cmFloodlightLinkingAuthorized?: boolean;
}

export const CmHybridConfig: Schema.Schema<CmHybridConfig> = Schema.suspend(() => Schema.Struct({
  cmAccountId: Schema.optional(Schema.String),
  cmFloodlightConfigId: Schema.optional(Schema.String),
  cmAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
  cmSyncableSiteIds: Schema.optional(Schema.Array(Schema.String)),
  dv360ToCmDataSharingEnabled: Schema.optional(Schema.Boolean),
  dv360ToCmCostReportingEnabled: Schema.optional(Schema.Boolean),
  cmFloodlightLinkingAuthorized: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CmHybridConfig" }) as any as Schema.Schema<CmHybridConfig>;

export interface AdvertiserAdServerConfig {
  /** The configuration for advertisers that use third-party ad servers only. */
  thirdPartyOnlyConfig?: ThirdPartyOnlyConfig;
  /** The configuration for advertisers that use both Campaign Manager 360 (CM360) and third-party ad servers. */
  cmHybridConfig?: CmHybridConfig;
}

export const AdvertiserAdServerConfig: Schema.Schema<AdvertiserAdServerConfig> = Schema.suspend(() => Schema.Struct({
  thirdPartyOnlyConfig: Schema.optional(ThirdPartyOnlyConfig),
  cmHybridConfig: Schema.optional(CmHybridConfig),
})).annotate({ identifier: "AdvertiserAdServerConfig" }) as any as Schema.Schema<AdvertiserAdServerConfig>;

export interface AdvertiserCreativeConfig {
  /** An ID for configuring campaign monitoring provided by Integral Ad Service (IAS). The DV360 system will append an IAS "Campaign Monitor" tag containing this ID to the creative tag. */
  iasClientId?: string;
  /** Whether or not to disable Google's About this Ad feature that adds badging (to identify the content as an ad) and transparency information (on interaction with About this Ad) to your ads for Online Behavioral Advertising (OBA) and regulatory requirements. About this Ad gives users greater control over the ads they see and helps you explain why they're seeing your ad. [Learn more](//support.google.com/displayvideo/answer/14315795). If you choose to set this field to `true`, note that ads served through Display & Video 360 must comply to the following: * Be Online Behavioral Advertising (OBA) compliant, as per your contract with Google Marketing Platform. * In the European Economic Area (EEA), include transparency information and a mechanism for users to report illegal content in ads. If using an alternative ad badging, transparency, and reporting solution, you must ensure it includes the required transparency information and illegal content flagging mechanism and that you notify Google of any illegal content reports using the appropriate [form](//support.google.com/legal/troubleshooter/1114905?sjid=6787484030557261960-EU#ts=2981967%2C2982031%2C12980091). */
  obaComplianceDisabled?: boolean;
  /** Whether or not the advertiser is enabled for dynamic creatives. */
  dynamicCreativeEnabled?: boolean;
  /** By setting this field to `true`, you, on behalf of your company, authorize Google to use video creatives associated with this Display & Video 360 advertiser to provide reporting and features related to the advertiser's television campaigns. Applicable only when the advertiser has a CM360 hybrid ad server configuration. */
  videoCreativeDataSharingAuthorized?: boolean;
}

export const AdvertiserCreativeConfig: Schema.Schema<AdvertiserCreativeConfig> = Schema.suspend(() => Schema.Struct({
  iasClientId: Schema.optional(Schema.String),
  obaComplianceDisabled: Schema.optional(Schema.Boolean),
  dynamicCreativeEnabled: Schema.optional(Schema.Boolean),
  videoCreativeDataSharingAuthorized: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdvertiserCreativeConfig" }) as any as Schema.Schema<AdvertiserCreativeConfig>;

export interface SdfConfig {
  /** Required. The version of SDF being used. */
  version?: "SDF_VERSION_UNSPECIFIED" | "SDF_VERSION_3_1" | "SDF_VERSION_4" | "SDF_VERSION_4_1" | "SDF_VERSION_4_2" | "SDF_VERSION_5" | "SDF_VERSION_5_1" | "SDF_VERSION_5_2" | "SDF_VERSION_5_3" | "SDF_VERSION_5_4" | "SDF_VERSION_5_5" | "SDF_VERSION_6" | "SDF_VERSION_7" | "SDF_VERSION_7_1" | "SDF_VERSION_8" | "SDF_VERSION_8_1" | "SDF_VERSION_9" | "SDF_VERSION_9_1" | "SDF_VERSION_9_2" | (string & {});
  /** An administrator email address to which the SDF processing status reports will be sent. */
  adminEmail?: string;
}

export const SdfConfig: Schema.Schema<SdfConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  adminEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "SdfConfig" }) as any as Schema.Schema<SdfConfig>;

export interface AdvertiserSdfConfig {
  /** Whether or not this advertiser overrides the SDF configuration of its parent partner. By default, an advertiser inherits the SDF configuration from the parent partner. To override the partner configuration, set this field to `true` and provide the new configuration in sdfConfig. */
  overridePartnerSdfConfig?: boolean;
  /** The SDF configuration for the advertiser. * Required when overridePartnerSdfConfig is `true`. * Output only when overridePartnerSdfConfig is `false`. */
  sdfConfig?: SdfConfig;
}

export const AdvertiserSdfConfig: Schema.Schema<AdvertiserSdfConfig> = Schema.suspend(() => Schema.Struct({
  overridePartnerSdfConfig: Schema.optional(Schema.Boolean),
  sdfConfig: Schema.optional(SdfConfig),
})).annotate({ identifier: "AdvertiserSdfConfig" }) as any as Schema.Schema<AdvertiserSdfConfig>;

export interface AdvertiserDataAccessConfig {
  /** Structured Data Files (SDF) settings for the advertiser. If not specified, the SDF settings of the parent partner are used. */
  sdfConfig?: AdvertiserSdfConfig;
}

export const AdvertiserDataAccessConfig: Schema.Schema<AdvertiserDataAccessConfig> = Schema.suspend(() => Schema.Struct({
  sdfConfig: Schema.optional(AdvertiserSdfConfig),
})).annotate({ identifier: "AdvertiserDataAccessConfig" }) as any as Schema.Schema<AdvertiserDataAccessConfig>;

export interface IntegrationDetails {
  /** An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters. */
  integrationCode?: string;
  /** Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters. */
  details?: string;
}

export const IntegrationDetails: Schema.Schema<IntegrationDetails> = Schema.suspend(() => Schema.Struct({
  integrationCode: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "IntegrationDetails" }) as any as Schema.Schema<IntegrationDetails>;

export interface AdvertiserTargetingConfig {
  /** Whether or not connected TV devices are exempt from viewability targeting for all video line items under the advertiser. */
  exemptTvFromViewabilityTargeting?: boolean;
}

export const AdvertiserTargetingConfig: Schema.Schema<AdvertiserTargetingConfig> = Schema.suspend(() => Schema.Struct({
  exemptTvFromViewabilityTargeting: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdvertiserTargetingConfig" }) as any as Schema.Schema<AdvertiserTargetingConfig>;

export interface AdvertiserBillingConfig {
  /** Required. The ID of a billing profile assigned to the advertiser. */
  billingProfileId?: string;
}

export const AdvertiserBillingConfig: Schema.Schema<AdvertiserBillingConfig> = Schema.suspend(() => Schema.Struct({
  billingProfileId: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvertiserBillingConfig" }) as any as Schema.Schema<AdvertiserBillingConfig>;

export interface Advertiser {
  /** Output only. The resource name of the advertiser. */
  name?: string;
  /** Output only. The unique ID of the advertiser. Assigned by the system. */
  advertiserId?: string;
  /** Required. Immutable. The unique ID of the partner that the advertiser belongs to. */
  partnerId?: string;
  /** Required. The display name of the advertiser. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Controls whether or not insertion orders and line items of the advertiser can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_PAUSED` and `ENTITY_STATUS_SCHEDULED_FOR_DELETION`. * If set to `ENTITY_STATUS_SCHEDULED_FOR_DELETION`, the advertiser will be deleted 30 days from when it was first scheduled for deletion. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. The timestamp when the advertiser was last updated. Assigned by the system. */
  updateTime?: string;
  /** Required. General settings of the advertiser. */
  generalConfig?: AdvertiserGeneralConfig;
  /** Required. Immutable. Ad server related settings of the advertiser. */
  adServerConfig?: AdvertiserAdServerConfig;
  /** Required. Creative related settings of the advertiser. */
  creativeConfig?: AdvertiserCreativeConfig;
  /** Settings that control how advertiser data may be accessed. */
  dataAccessConfig?: AdvertiserDataAccessConfig;
  /** Integration details of the advertiser. Only integrationCode is currently applicable to advertiser. Other fields of IntegrationDetails are not supported and will be ignored if provided. */
  integrationDetails?: IntegrationDetails;
  /** Targeting settings related to ad serving of the advertiser. */
  servingConfig?: AdvertiserTargetingConfig;
  /** Whether integration with Mediaocean (Prisma) is enabled. By enabling this, you agree to the following: On behalf of my company, I authorize Mediaocean (Prisma) to send budget segment plans to Google, and I authorize Google to send corresponding reporting and invoices from DV360 to Mediaocean for the purposes of budget planning, billing, and reconciliation for this advertiser. */
  prismaEnabled?: boolean;
  /** Required. Billing related settings of the advertiser. */
  billingConfig?: AdvertiserBillingConfig;
  /** Optional. Whether this advertiser contains line items that serve European Union political ads. If this field is set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`, then the following will happen: * Any new line items created under this advertiser will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. * Any existing line items under this advertiser that do not have a set value be updated to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` within a day. */
  containsEuPoliticalAds?: "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN" | "CONTAINS_EU_POLITICAL_ADVERTISING" | "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING" | (string & {});
}

export const Advertiser: Schema.Schema<Advertiser> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  partnerId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  generalConfig: Schema.optional(AdvertiserGeneralConfig),
  adServerConfig: Schema.optional(AdvertiserAdServerConfig),
  creativeConfig: Schema.optional(AdvertiserCreativeConfig),
  dataAccessConfig: Schema.optional(AdvertiserDataAccessConfig),
  integrationDetails: Schema.optional(IntegrationDetails),
  servingConfig: Schema.optional(AdvertiserTargetingConfig),
  prismaEnabled: Schema.optional(Schema.Boolean),
  billingConfig: Schema.optional(AdvertiserBillingConfig),
  containsEuPoliticalAds: Schema.optional(Schema.String),
})).annotate({ identifier: "Advertiser" }) as any as Schema.Schema<Advertiser>;

export interface ListAdvertisersResponse {
  /** The list of advertisers. This list will be absent if empty. */
  advertisers?: Array<Advertiser>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdvertisers` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdvertisersResponse: Schema.Schema<ListAdvertisersResponse> = Schema.suspend(() => Schema.Struct({
  advertisers: Schema.optional(Schema.Array(Advertiser)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdvertisersResponse" }) as any as Schema.Schema<ListAdvertisersResponse>;

export interface AuditAdvertiserResponse {
  /** The number of ACTIVE, PAUSED, and DRAFT line items under this advertiser. These line items count towards the limit of 9999 line items per advertiser. */
  usedLineItemsCount?: string;
  /** The number of ACTIVE, PAUSED and DRAFT insertion orders under this advertiser. These insertion orders count towards the limit of 9999 insertion orders per advertiser. */
  usedInsertionOrdersCount?: string;
  /** The number of ACTIVE and PAUSED campaigns under this advertiser. These campaigns count towards the limit of 9999 campaigns per advertiser. */
  usedCampaignsCount?: string;
  /** The number of channels created under this advertiser. These channels count towards the limit of 1000 channels per advertiser. */
  channelsCount?: string;
  /** The number of negatively targeted channels created under this advertiser. These negatively targeted channels count towards the limit of 5 negatively targeted channels per advertiser. */
  negativelyTargetedChannelsCount?: string;
  /** The number of negative keyword lists created under this advertiser. These negative keyword lists count towards the limit of 20 negative keyword lists per advertiser. */
  negativeKeywordListsCount?: string;
  /** The number of individual targeting options from the following targeting types that are assigned to a line item under this advertiser. These individual targeting options count towards the limit of 4500000 ad group targeting options per advertiser. Qualifying Targeting types: * Channels, URLs, apps, and collections * Demographic * Google Audiences, including Affinity, Custom Affinity, and In-market audiences * Inventory source * Keyword * Mobile app category * User lists * Video targeting * Viewability */
  adGroupCriteriaCount?: string;
  /** The number of individual targeting options from the following targeting types that are assigned to a line item under this advertiser. These individual targeting options count towards the limit of 900000 campaign targeting options per advertiser. Qualifying Targeting types: * Position * Browser * Connection speed * Day and time * Device and operating system * Digital content label * Sensitive categories * Environment * Geography, including business chains and proximity * ISP * Language * Third-party verification */
  campaignCriteriaCount?: string;
}

export const AuditAdvertiserResponse: Schema.Schema<AuditAdvertiserResponse> = Schema.suspend(() => Schema.Struct({
  usedLineItemsCount: Schema.optional(Schema.String),
  usedInsertionOrdersCount: Schema.optional(Schema.String),
  usedCampaignsCount: Schema.optional(Schema.String),
  channelsCount: Schema.optional(Schema.String),
  negativelyTargetedChannelsCount: Schema.optional(Schema.String),
  negativeKeywordListsCount: Schema.optional(Schema.String),
  adGroupCriteriaCount: Schema.optional(Schema.String),
  campaignCriteriaCount: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditAdvertiserResponse" }) as any as Schema.Schema<AuditAdvertiserResponse>;

export interface CreateAssetRequest {
  /** Required. The filename of the asset, including the file extension. The filename must be UTF-8 encoded with a maximum size of 240 bytes. */
  filename?: string;
}

export const CreateAssetRequest: Schema.Schema<CreateAssetRequest> = Schema.suspend(() => Schema.Struct({
  filename: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateAssetRequest" }) as any as Schema.Schema<CreateAssetRequest>;

export interface Asset {
  /** Media ID of the uploaded asset. This is a unique identifier for the asset. This ID can be passed to other API calls, e.g. CreateCreative to associate the asset with a creative. The Media ID space updated on **April 5, 2023**. Update media IDs cached before **April 5, 2023** by retrieving the new media ID from associated creative resources or re-uploading the asset. */
  mediaId?: string;
  /** The asset content. For uploaded assets, the content is the serving path. */
  content?: string;
}

export const Asset: Schema.Schema<Asset> = Schema.suspend(() => Schema.Struct({
  mediaId: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "Asset" }) as any as Schema.Schema<Asset>;

export interface CreateAssetResponse {
  /** The uploaded asset, if successful. */
  asset?: Asset;
}

export const CreateAssetResponse: Schema.Schema<CreateAssetResponse> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Asset),
})).annotate({ identifier: "CreateAssetResponse" }) as any as Schema.Schema<CreateAssetResponse>;

export interface AssignedInventorySource {
  /** Output only. The resource name of the assigned inventory source. */
  name?: string;
  /** Output only. The unique ID of the assigned inventory source. The ID is only unique within a given inventory source group. It may be reused in other contexts. */
  assignedInventorySourceId?: string;
  /** Required. The ID of the inventory source entity being targeted. */
  inventorySourceId?: string;
}

export const AssignedInventorySource: Schema.Schema<AssignedInventorySource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  assignedInventorySourceId: Schema.optional(Schema.String),
  inventorySourceId: Schema.optional(Schema.String),
})).annotate({ identifier: "AssignedInventorySource" }) as any as Schema.Schema<AssignedInventorySource>;

export interface ListAssignedInventorySourcesResponse {
  /** The list of assigned inventory sources. This list will be absent if empty. */
  assignedInventorySources?: Array<AssignedInventorySource>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAssignedInventorySources` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAssignedInventorySourcesResponse: Schema.Schema<ListAssignedInventorySourcesResponse> = Schema.suspend(() => Schema.Struct({
  assignedInventorySources: Schema.optional(Schema.Array(AssignedInventorySource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAssignedInventorySourcesResponse" }) as any as Schema.Schema<ListAssignedInventorySourcesResponse>;

export interface BulkEditAssignedInventorySourcesRequest {
  /** The ID of the partner that owns the inventory source group. Only this partner has write access to these assigned inventory sources. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent inventory source group. The parent partner does not have access to these assigned inventory sources. */
  advertiserId?: string;
  /** The IDs of the assigned inventory sources to delete in bulk, specified as a list of assigned_inventory_source_ids. */
  deletedAssignedInventorySources?: Array<string>;
  /** The assigned inventory sources to create in bulk, specified as a list of AssignedInventorySources. */
  createdAssignedInventorySources?: Array<AssignedInventorySource>;
}

export const BulkEditAssignedInventorySourcesRequest: Schema.Schema<BulkEditAssignedInventorySourcesRequest> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  deletedAssignedInventorySources: Schema.optional(Schema.Array(Schema.String)),
  createdAssignedInventorySources: Schema.optional(Schema.Array(AssignedInventorySource)),
})).annotate({ identifier: "BulkEditAssignedInventorySourcesRequest" }) as any as Schema.Schema<BulkEditAssignedInventorySourcesRequest>;

export interface BulkEditAssignedInventorySourcesResponse {
  /** The list of assigned inventory sources that have been successfully created. This list will be absent if empty. */
  assignedInventorySources?: Array<AssignedInventorySource>;
}

export const BulkEditAssignedInventorySourcesResponse: Schema.Schema<BulkEditAssignedInventorySourcesResponse> = Schema.suspend(() => Schema.Struct({
  assignedInventorySources: Schema.optional(Schema.Array(AssignedInventorySource)),
})).annotate({ identifier: "BulkEditAssignedInventorySourcesResponse" }) as any as Schema.Schema<BulkEditAssignedInventorySourcesResponse>;

export interface AssignedLocation {
  /** Output only. The resource name of the assigned location. */
  name?: string;
  /** Output only. The unique ID of the assigned location. The ID is only unique within a location list. It may be reused in other contexts. */
  assignedLocationId?: string;
  /** Required. The ID of the targeting option assigned to the location list. */
  targetingOptionId?: string;
}

export const AssignedLocation: Schema.Schema<AssignedLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  assignedLocationId: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "AssignedLocation" }) as any as Schema.Schema<AssignedLocation>;

export interface ListAssignedLocationsResponse {
  /** The list of assigned locations. This list will be absent if empty. */
  assignedLocations?: Array<AssignedLocation>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAssignedLocations` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAssignedLocationsResponse: Schema.Schema<ListAssignedLocationsResponse> = Schema.suspend(() => Schema.Struct({
  assignedLocations: Schema.optional(Schema.Array(AssignedLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAssignedLocationsResponse" }) as any as Schema.Schema<ListAssignedLocationsResponse>;

export interface BulkEditAssignedLocationsRequest {
  /** The IDs of the assigned locations to delete in bulk, specified as a list of assignedLocationId values. */
  deletedAssignedLocations?: Array<string>;
  /** The assigned locations to create in bulk, specified as a list of AssignedLocation resources. */
  createdAssignedLocations?: Array<AssignedLocation>;
}

export const BulkEditAssignedLocationsRequest: Schema.Schema<BulkEditAssignedLocationsRequest> = Schema.suspend(() => Schema.Struct({
  deletedAssignedLocations: Schema.optional(Schema.Array(Schema.String)),
  createdAssignedLocations: Schema.optional(Schema.Array(AssignedLocation)),
})).annotate({ identifier: "BulkEditAssignedLocationsRequest" }) as any as Schema.Schema<BulkEditAssignedLocationsRequest>;

export interface BulkEditAssignedLocationsResponse {
  /** The list of assigned locations that have been successfully created. This list will be absent if empty. */
  assignedLocations?: Array<AssignedLocation>;
}

export const BulkEditAssignedLocationsResponse: Schema.Schema<BulkEditAssignedLocationsResponse> = Schema.suspend(() => Schema.Struct({
  assignedLocations: Schema.optional(Schema.Array(AssignedLocation)),
})).annotate({ identifier: "BulkEditAssignedLocationsResponse" }) as any as Schema.Schema<BulkEditAssignedLocationsResponse>;

export interface PerformanceGoal {
  /** Required. The type of the performance goal. */
  performanceGoalType?: "PERFORMANCE_GOAL_TYPE_UNSPECIFIED" | "PERFORMANCE_GOAL_TYPE_CPM" | "PERFORMANCE_GOAL_TYPE_CPC" | "PERFORMANCE_GOAL_TYPE_CPA" | "PERFORMANCE_GOAL_TYPE_CTR" | "PERFORMANCE_GOAL_TYPE_VIEWABILITY" | "PERFORMANCE_GOAL_TYPE_CPIAVC" | "PERFORMANCE_GOAL_TYPE_CPE" | "PERFORMANCE_GOAL_TYPE_CPV" | "PERFORMANCE_GOAL_TYPE_CLICK_CVR" | "PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR" | "PERFORMANCE_GOAL_TYPE_VCPM" | "PERFORMANCE_GOAL_TYPE_VTR" | "PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE" | "PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE" | "PERFORMANCE_GOAL_TYPE_OTHER" | (string & {});
  /** The goal amount, in micros of the advertiser's currency. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_VCPM` For example 1500000 represents 1.5 standard units of the currency. */
  performanceGoalAmountMicros?: string;
  /** The decimal representation of the goal percentage in micros. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_CLICK_CVR` * `PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR` * `PERFORMANCE_GOAL_TYPE_VTR` * `PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE` * `PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE` For example, 70000 represents 7% (decimal 0.07). */
  performanceGoalPercentageMicros?: string;
  /** A key performance indicator (KPI) string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when performance_goal_type is set to `PERFORMANCE_GOAL_TYPE_OTHER`. */
  performanceGoalString?: string;
}

export const PerformanceGoal: Schema.Schema<PerformanceGoal> = Schema.suspend(() => Schema.Struct({
  performanceGoalType: Schema.optional(Schema.String),
  performanceGoalAmountMicros: Schema.optional(Schema.String),
  performanceGoalPercentageMicros: Schema.optional(Schema.String),
  performanceGoalString: Schema.optional(Schema.String),
})).annotate({ identifier: "PerformanceGoal" }) as any as Schema.Schema<PerformanceGoal>;

export interface CampaignGoal {
  /** Required. The type of the campaign goal. */
  campaignGoalType?: "CAMPAIGN_GOAL_TYPE_UNSPECIFIED" | "CAMPAIGN_GOAL_TYPE_APP_INSTALL" | "CAMPAIGN_GOAL_TYPE_BRAND_AWARENESS" | "CAMPAIGN_GOAL_TYPE_OFFLINE_ACTION" | "CAMPAIGN_GOAL_TYPE_ONLINE_ACTION" | (string & {});
  /** Required. The performance goal of the campaign. Acceptable values for performance_goal_type are: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_OTHER` */
  performanceGoal?: PerformanceGoal;
}

export const CampaignGoal: Schema.Schema<CampaignGoal> = Schema.suspend(() => Schema.Struct({
  campaignGoalType: Schema.optional(Schema.String),
  performanceGoal: Schema.optional(PerformanceGoal),
})).annotate({ identifier: "CampaignGoal" }) as any as Schema.Schema<CampaignGoal>;

export interface Displayvideo_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Displayvideo_Date: Schema.Schema<Displayvideo_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Displayvideo_Date" }) as any as Schema.Schema<Displayvideo_Date>;

export interface DateRange {
  /** The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`. */
  startDate?: Displayvideo_Date;
  /** The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`. */
  endDate?: Displayvideo_Date;
}

export const DateRange: Schema.Schema<DateRange> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Displayvideo_Date),
  endDate: Schema.optional(Displayvideo_Date),
})).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface CampaignFlight {
  /** The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI. The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency. */
  plannedSpendAmountMicros?: string;
  /** Required. The dates that the campaign is expected to run. They are resolved relative to the parent advertiser's time zone. * The dates specified here will not affect serving. They are used to generate alerts and warnings. For example, if the flight date of any child insertion order is outside the range of these dates, the user interface will show a warning. * `start_date` is required and must be the current date or later. * `end_date` is optional. If specified, it must be the `start_date` or later. * Any specified date must be before the year 2037. */
  plannedDates?: DateRange;
}

export const CampaignFlight: Schema.Schema<CampaignFlight> = Schema.suspend(() => Schema.Struct({
  plannedSpendAmountMicros: Schema.optional(Schema.String),
  plannedDates: Schema.optional(DateRange),
})).annotate({ identifier: "CampaignFlight" }) as any as Schema.Schema<CampaignFlight>;

export interface FrequencyCap {
  /** Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable. */
  unlimited?: boolean;
  /** The time unit in which the frequency cap will be applied. Required when unlimited is `false`. */
  timeUnit?: "TIME_UNIT_UNSPECIFIED" | "TIME_UNIT_LIFETIME" | "TIME_UNIT_MONTHS" | "TIME_UNIT_WEEKS" | "TIME_UNIT_DAYS" | "TIME_UNIT_HOURS" | "TIME_UNIT_MINUTES" | (string & {});
  /** The number of time_unit the frequency cap will last. Required when unlimited is `false`. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_MONTHS` - must be 1 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59 */
  timeUnitCount?: number;
  /** The maximum number of times a user may be shown the same ad during this period. Must be greater than 0. Required when unlimited is `false` and max_views is not set. */
  maxImpressions?: number;
  /** Optional. The maximum number of times a user may click-through or fully view an ad during this period until it is no longer served to them. Must be greater than 0. Only applicable to YouTube and Partners resources. Required when unlimited is `false` and max_impressions is not set. */
  maxViews?: number;
}

export const FrequencyCap: Schema.Schema<FrequencyCap> = Schema.suspend(() => Schema.Struct({
  unlimited: Schema.optional(Schema.Boolean),
  timeUnit: Schema.optional(Schema.String),
  timeUnitCount: Schema.optional(Schema.Number),
  maxImpressions: Schema.optional(Schema.Number),
  maxViews: Schema.optional(Schema.Number),
})).annotate({ identifier: "FrequencyCap" }) as any as Schema.Schema<FrequencyCap>;

export interface PrismaCpeCode {
  /** The Prisma client code. */
  prismaClientCode?: string;
  /** The Prisma product code. */
  prismaProductCode?: string;
  /** The Prisma estimate code. */
  prismaEstimateCode?: string;
}

export const PrismaCpeCode: Schema.Schema<PrismaCpeCode> = Schema.suspend(() => Schema.Struct({
  prismaClientCode: Schema.optional(Schema.String),
  prismaProductCode: Schema.optional(Schema.String),
  prismaEstimateCode: Schema.optional(Schema.String),
})).annotate({ identifier: "PrismaCpeCode" }) as any as Schema.Schema<PrismaCpeCode>;

export interface PrismaConfig {
  /** Required. The Prisma type. */
  prismaType?: "PRISMA_TYPE_UNSPECIFIED" | "PRISMA_TYPE_DISPLAY" | "PRISMA_TYPE_SEARCH" | "PRISMA_TYPE_VIDEO" | "PRISMA_TYPE_AUDIO" | "PRISMA_TYPE_SOCIAL" | "PRISMA_TYPE_FEE" | (string & {});
  /** Required. Relevant client, product, and estimate codes from the Mediaocean Prisma tool. */
  prismaCpeCode?: PrismaCpeCode;
  /** Required. The entity allocated this budget (DSP, site, etc.). */
  supplier?: string;
}

export const PrismaConfig: Schema.Schema<PrismaConfig> = Schema.suspend(() => Schema.Struct({
  prismaType: Schema.optional(Schema.String),
  prismaCpeCode: Schema.optional(PrismaCpeCode),
  supplier: Schema.optional(Schema.String),
})).annotate({ identifier: "PrismaConfig" }) as any as Schema.Schema<PrismaConfig>;

export interface CampaignBudget {
  /** The unique ID of the campaign budget. Assigned by the system. Do not set for new budgets. Must be included when updating or adding budgets to campaign_budgets. Otherwise, a new ID will be generated and assigned. */
  budgetId?: string;
  /** Required. The display name of the budget. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Immutable. Specifies whether the budget is measured in currency or impressions. */
  budgetUnit?: "BUDGET_UNIT_UNSPECIFIED" | "BUDGET_UNIT_CURRENCY" | "BUDGET_UNIT_IMPRESSIONS" | (string & {});
  /** Required. The total amount the linked insertion order segments can budget. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency. */
  budgetAmountMicros?: string;
  /** Required. The date range for the campaign budget. Linked budget segments may have a different date range. They are resolved relative to the parent advertiser's time zone. Both `start_date` and `end_date` must be before the year 2037. */
  dateRange?: DateRange;
  /** Required. The external source of the budget. */
  externalBudgetSource?: "EXTERNAL_BUDGET_SOURCE_UNSPECIFIED" | "EXTERNAL_BUDGET_SOURCE_NONE" | "EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN" | (string & {});
  /** Immutable. The ID identifying this budget to the external source. If this field is set and the invoice detail level of the corresponding billing profile is set to "Budget level PO", all impressions served against this budget will include this ID on the invoice. Must be unique under the campaign. */
  externalBudgetId?: string;
  /** Immutable. The ID used to group budgets to be included the same invoice. If this field is set and the invoice level of the corresponding billing profile is set to "Budget invoice grouping ID", all external_budget_id sharing the same invoice_grouping_id will be grouped in the same invoice. */
  invoiceGroupingId?: string;
  /** Additional metadata for use by the Mediaocean Prisma tool. Required for Mediaocean budgets. Only applicable to prisma_enabled advertisers. */
  prismaConfig?: PrismaConfig;
}

export const CampaignBudget: Schema.Schema<CampaignBudget> = Schema.suspend(() => Schema.Struct({
  budgetId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  budgetUnit: Schema.optional(Schema.String),
  budgetAmountMicros: Schema.optional(Schema.String),
  dateRange: Schema.optional(DateRange),
  externalBudgetSource: Schema.optional(Schema.String),
  externalBudgetId: Schema.optional(Schema.String),
  invoiceGroupingId: Schema.optional(Schema.String),
  prismaConfig: Schema.optional(PrismaConfig),
})).annotate({ identifier: "CampaignBudget" }) as any as Schema.Schema<CampaignBudget>;

export interface Campaign {
  /** Output only. The resource name of the campaign. */
  name?: string;
  /** Output only. The unique ID of the advertiser the campaign belongs to. */
  advertiserId?: string;
  /** Output only. The unique ID of the campaign. Assigned by the system. */
  campaignId?: string;
  /** Required. The display name of the campaign. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Controls whether or not the insertion orders under this campaign can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. * For CreateCampaign method, `ENTITY_STATUS_ARCHIVED` is not allowed. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. The timestamp when the campaign was last updated. Assigned by the system. */
  updateTime?: string;
  /** Required. The goal of the campaign. */
  campaignGoal?: CampaignGoal;
  /** Required. The planned spend and duration of the campaign. */
  campaignFlight?: CampaignFlight;
  /** Required. The frequency cap setting of the campaign. *Warning*: On **February 28, 2025**, frequency cap time periods greater than 30 days will no longer be accepted. [Read more about this announced change](/display-video/api/deprecations#features.lifetime_frequency_cap) */
  frequencyCap?: FrequencyCap;
  /** The list of budgets available to this campaign. If this field is not set, the campaign uses an unlimited budget. */
  campaignBudgets?: Array<CampaignBudget>;
}

export const Campaign: Schema.Schema<Campaign> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  campaignGoal: Schema.optional(CampaignGoal),
  campaignFlight: Schema.optional(CampaignFlight),
  frequencyCap: Schema.optional(FrequencyCap),
  campaignBudgets: Schema.optional(Schema.Array(CampaignBudget)),
})).annotate({ identifier: "Campaign" }) as any as Schema.Schema<Campaign>;

export interface ListCampaignsResponse {
  /** The list of campaigns. This list will be absent if empty. */
  campaigns?: Array<Campaign>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCampaigns` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCampaignsResponse: Schema.Schema<ListCampaignsResponse> = Schema.suspend(() => Schema.Struct({
  campaigns: Schema.optional(Schema.Array(Campaign)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCampaignsResponse" }) as any as Schema.Schema<ListCampaignsResponse>;

export interface Channel {
  /** Output only. The resource name of the channel. */
  name?: string;
  /** Output only. The unique ID of the channel. Assigned by the system. */
  channelId?: string;
  /** Required. The display name of the channel. Must be UTF-8 encoded with a maximum length of 240 bytes. */
  displayName?: string;
  /** The ID of the partner that owns the channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the channel. */
  advertiserId?: string;
  /** Output only. Number of line items that are directly targeting this channel positively. */
  positivelyTargetedLineItemCount?: string;
  /** Output only. Number of line items that are directly targeting this channel negatively. */
  negativelyTargetedLineItemCount?: string;
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  channelId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  positivelyTargetedLineItemCount: Schema.optional(Schema.String),
  negativelyTargetedLineItemCount: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface ListChannelsResponse {
  /** The list of channels. This list will be absent if empty. */
  channels?: Array<Channel>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListChannels` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListChannelsResponse: Schema.Schema<ListChannelsResponse> = Schema.suspend(() => Schema.Struct({
  channels: Schema.optional(Schema.Array(Channel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListChannelsResponse" }) as any as Schema.Schema<ListChannelsResponse>;

export interface CombinedAudience {
  /** Output only. The resource name of the combined audience. */
  name?: string;
  /** Output only. The unique ID of the combined audience. Assigned by the system. */
  combinedAudienceId?: string;
  /** Output only. The display name of the combined audience. . */
  displayName?: string;
}

export const CombinedAudience: Schema.Schema<CombinedAudience> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  combinedAudienceId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "CombinedAudience" }) as any as Schema.Schema<CombinedAudience>;

export interface ListCombinedAudiencesResponse {
  /** The list of combined audiences. This list will be absent if empty. */
  combinedAudiences?: Array<CombinedAudience>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCombinedAudiences` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCombinedAudiencesResponse: Schema.Schema<ListCombinedAudiencesResponse> = Schema.suspend(() => Schema.Struct({
  combinedAudiences: Schema.optional(Schema.Array(CombinedAudience)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCombinedAudiencesResponse" }) as any as Schema.Schema<ListCombinedAudiencesResponse>;

export interface ExchangeReviewStatus {
  /** The exchange reviewing the creative. */
  exchange?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
  /** Status of the exchange review. */
  status?: "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING" | (string & {});
}

export const ExchangeReviewStatus: Schema.Schema<ExchangeReviewStatus> = Schema.suspend(() => Schema.Struct({
  exchange: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "ExchangeReviewStatus" }) as any as Schema.Schema<ExchangeReviewStatus>;

export interface ReviewStatusInfo {
  /** Represents the basic approval needed for a creative to begin serving. Summary of creative_and_landing_page_review_status and content_and_policy_review_status. */
  approvalStatus?: "APPROVAL_STATUS_UNSPECIFIED" | "APPROVAL_STATUS_PENDING_NOT_SERVABLE" | "APPROVAL_STATUS_PENDING_SERVABLE" | "APPROVAL_STATUS_APPROVED_SERVABLE" | "APPROVAL_STATUS_REJECTED_NOT_SERVABLE" | (string & {});
  /** Creative and landing page review status for the creative. */
  creativeAndLandingPageReviewStatus?: "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING" | (string & {});
  /** Content and policy review status for the creative. */
  contentAndPolicyReviewStatus?: "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING" | (string & {});
  /** Exchange review statuses for the creative. */
  exchangeReviewStatuses?: Array<ExchangeReviewStatus>;
}

export const ReviewStatusInfo: Schema.Schema<ReviewStatusInfo> = Schema.suspend(() => Schema.Struct({
  approvalStatus: Schema.optional(Schema.String),
  creativeAndLandingPageReviewStatus: Schema.optional(Schema.String),
  contentAndPolicyReviewStatus: Schema.optional(Schema.String),
  exchangeReviewStatuses: Schema.optional(Schema.Array(ExchangeReviewStatus)),
})).annotate({ identifier: "ReviewStatusInfo" }) as any as Schema.Schema<ReviewStatusInfo>;

export interface AssetAssociation {
  /** Optional. The associated asset. */
  asset?: Asset;
  /** Optional. The role of this asset for the creative. */
  role?: "ASSET_ROLE_UNSPECIFIED" | "ASSET_ROLE_MAIN" | "ASSET_ROLE_BACKUP" | "ASSET_ROLE_POLITE_LOAD" | "ASSET_ROLE_HEADLINE" | "ASSET_ROLE_LONG_HEADLINE" | "ASSET_ROLE_BODY" | "ASSET_ROLE_LONG_BODY" | "ASSET_ROLE_CAPTION_URL" | "ASSET_ROLE_CALL_TO_ACTION" | "ASSET_ROLE_ADVERTISER_NAME" | "ASSET_ROLE_PRICE" | "ASSET_ROLE_ANDROID_APP_ID" | "ASSET_ROLE_IOS_APP_ID" | "ASSET_ROLE_RATING" | "ASSET_ROLE_ICON" | "ASSET_ROLE_COVER_IMAGE" | "ASSET_ROLE_BACKGROUND_COLOR" | "ASSET_ROLE_ACCENT_COLOR" | "ASSET_ROLE_REQUIRE_LOGO" | "ASSET_ROLE_REQUIRE_IMAGE" | "ASSET_ROLE_ENABLE_ASSET_ENHANCEMENTS" | (string & {});
}

export const AssetAssociation: Schema.Schema<AssetAssociation> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Asset),
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "AssetAssociation" }) as any as Schema.Schema<AssetAssociation>;

export interface ExitEvent {
  /** Required. The type of the exit event. */
  type?: "EXIT_EVENT_TYPE_UNSPECIFIED" | "EXIT_EVENT_TYPE_DEFAULT" | "EXIT_EVENT_TYPE_BACKUP" | (string & {});
  /** Required. The click through URL of the exit event. This is required when type is: * `EXIT_EVENT_TYPE_DEFAULT` * `EXIT_EVENT_TYPE_BACKUP` */
  url?: string;
  /** Optional. The name of the click tag of the exit event. The name must be unique within one creative. Leave it empty or unset for creatives containing image assets only. */
  name?: string;
  /** Optional. The name used to identify this event in reports. Leave it empty or unset for creatives containing image assets only. */
  reportingName?: string;
}

export const ExitEvent: Schema.Schema<ExitEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  reportingName: Schema.optional(Schema.String),
})).annotate({ identifier: "ExitEvent" }) as any as Schema.Schema<ExitEvent>;

export interface TimerEvent {
  /** Required. The name of the timer event. */
  name?: string;
  /** Required. The name used to identify this timer event in reports. */
  reportingName?: string;
}

export const TimerEvent: Schema.Schema<TimerEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  reportingName: Schema.optional(Schema.String),
})).annotate({ identifier: "TimerEvent" }) as any as Schema.Schema<TimerEvent>;

export interface CounterEvent {
  /** Required. The name of the counter event. */
  name?: string;
  /** Required. The name used to identify this counter event in reports. */
  reportingName?: string;
}

export const CounterEvent: Schema.Schema<CounterEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  reportingName: Schema.optional(Schema.String),
})).annotate({ identifier: "CounterEvent" }) as any as Schema.Schema<CounterEvent>;

export interface AudioVideoOffset {
  /** Optional. The offset in percentage of the audio or video duration. */
  percentage?: string;
  /** Optional. The offset in seconds from the start of the audio or video. */
  seconds?: string;
}

export const AudioVideoOffset: Schema.Schema<AudioVideoOffset> = Schema.suspend(() => Schema.Struct({
  percentage: Schema.optional(Schema.String),
  seconds: Schema.optional(Schema.String),
})).annotate({ identifier: "AudioVideoOffset" }) as any as Schema.Schema<AudioVideoOffset>;

export interface UniversalAdId {
  /** Optional. The unique creative identifier. */
  id?: string;
  /** Optional. The registry provides unique creative identifiers. */
  registry?: "UNIVERSAL_AD_REGISTRY_UNSPECIFIED" | "UNIVERSAL_AD_REGISTRY_OTHER" | "UNIVERSAL_AD_REGISTRY_AD_ID" | "UNIVERSAL_AD_REGISTRY_CLEARCAST" | "UNIVERSAL_AD_REGISTRY_DV360" | "UNIVERSAL_AD_REGISTRY_CM" | (string & {});
}

export const UniversalAdId: Schema.Schema<UniversalAdId> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  registry: Schema.optional(Schema.String),
})).annotate({ identifier: "UniversalAdId" }) as any as Schema.Schema<UniversalAdId>;

export interface ThirdPartyUrl {
  /** Optional. The type of interaction needs to be tracked by the tracking URL */
  type?: "THIRD_PARTY_URL_TYPE_UNSPECIFIED" | "THIRD_PARTY_URL_TYPE_IMPRESSION" | "THIRD_PARTY_URL_TYPE_CLICK_TRACKING" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_START" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FIRST_QUARTILE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MIDPOINT" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_THIRD_QUARTILE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_COMPLETE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MUTE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PAUSE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_REWIND" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FULLSCREEN" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_STOP" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_CUSTOM" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_SKIP" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PROGRESS" | (string & {});
  /** Optional. Tracking URL used to track the interaction. Provide a URL with optional path or query string, beginning with `https:`. For example, `https://www.example.com/path` */
  url?: string;
}

export const ThirdPartyUrl: Schema.Schema<ThirdPartyUrl> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "ThirdPartyUrl" }) as any as Schema.Schema<ThirdPartyUrl>;

export interface Transcode {
  /** Optional. The name of the transcoded file. */
  name?: string;
  /** Optional. The MIME type of the transcoded file. */
  mimeType?: string;
  /** Optional. Indicates if the transcoding was successful. */
  transcoded?: boolean;
  /** Optional. The dimensions of the transcoded video. */
  dimensions?: Dimensions;
  /** Optional. The transcoding bit rate of the transcoded video, in kilobits per second. */
  bitRateKbps?: string;
  /** Optional. The frame rate of the transcoded video, in frames per second. */
  frameRate?: number;
  /** Optional. The bit rate for the audio stream of the transcoded video, or the bit rate for the transcoded audio, in kilobits per second. */
  audioBitRateKbps?: string;
  /** Optional. The sample rate for the audio stream of the transcoded video, or the sample rate for the transcoded audio, in hertz. */
  audioSampleRateHz?: string;
  /** Optional. The size of the transcoded file, in bytes. */
  fileSizeBytes?: string;
}

export const Transcode: Schema.Schema<Transcode> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  transcoded: Schema.optional(Schema.Boolean),
  dimensions: Schema.optional(Dimensions),
  bitRateKbps: Schema.optional(Schema.String),
  frameRate: Schema.optional(Schema.Number),
  audioBitRateKbps: Schema.optional(Schema.String),
  audioSampleRateHz: Schema.optional(Schema.String),
  fileSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "Transcode" }) as any as Schema.Schema<Transcode>;

export interface CmTrackingAd {
  /** Optional. The placement ID of the campaign manager 360 tracking Ad. */
  cmPlacementId?: string;
  /** Optional. The creative ID of the campaign manager 360 tracking Ad. */
  cmCreativeId?: string;
  /** Optional. The ad ID of the campaign manager 360 tracking Ad. */
  cmAdId?: string;
}

export const CmTrackingAd: Schema.Schema<CmTrackingAd> = Schema.suspend(() => Schema.Struct({
  cmPlacementId: Schema.optional(Schema.String),
  cmCreativeId: Schema.optional(Schema.String),
  cmAdId: Schema.optional(Schema.String),
})).annotate({ identifier: "CmTrackingAd" }) as any as Schema.Schema<CmTrackingAd>;

export interface ObaIcon {
  /** Optional. The URL of the OBA icon resource. */
  resourceUrl?: string;
  /** Optional. The MIME type of the OBA icon resource. */
  resourceMimeType?: string;
  /** Optional. The position of the OBA icon on the creative. */
  position?: "OBA_ICON_POSITION_UNSPECIFIED" | "OBA_ICON_POSITION_UPPER_RIGHT" | "OBA_ICON_POSITION_UPPER_LEFT" | "OBA_ICON_POSITION_LOWER_RIGHT" | "OBA_ICON_POSITION_LOWER_LEFT" | (string & {});
  /** Optional. The dimensions of the OBA icon. */
  dimensions?: Dimensions;
  /** Optional. The program of the OBA icon. For example: “AdChoices”. */
  program?: string;
  /** Required. The landing page URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com` */
  landingPageUrl?: string;
  /** Required. The click tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com` */
  clickTrackingUrl?: string;
  /** Required. The view tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com` */
  viewTrackingUrl?: string;
}

export const ObaIcon: Schema.Schema<ObaIcon> = Schema.suspend(() => Schema.Struct({
  resourceUrl: Schema.optional(Schema.String),
  resourceMimeType: Schema.optional(Schema.String),
  position: Schema.optional(Schema.String),
  dimensions: Schema.optional(Dimensions),
  program: Schema.optional(Schema.String),
  landingPageUrl: Schema.optional(Schema.String),
  clickTrackingUrl: Schema.optional(Schema.String),
  viewTrackingUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ObaIcon" }) as any as Schema.Schema<ObaIcon>;

export interface Creative {
  /** Output only. The resource name of the creative. */
  name?: string;
  /** Output only. The unique ID of the advertiser the creative belongs to. */
  advertiserId?: string;
  /** Output only. The unique ID of the creative. Assigned by the system. */
  creativeId?: string;
  /** Output only. The unique ID of the Campaign Manager 360 placement associated with the creative. This field is only applicable for creatives that are synced from Campaign Manager. */
  cmPlacementId?: string;
  /** Required. The display name of the creative. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Controls whether or not the creative can serve. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` * `ENTITY_STATUS_PAUSED` */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. The timestamp when the creative was last updated, either by the user or system (e.g. creative review). Assigned by the system. */
  updateTime?: string;
  /** Output only. The timestamp when the creative was created. Assigned by the system. */
  createTime?: string;
  /** Required. Immutable. The type of the creative. */
  creativeType?: "CREATIVE_TYPE_UNSPECIFIED" | "CREATIVE_TYPE_STANDARD" | "CREATIVE_TYPE_EXPANDABLE" | "CREATIVE_TYPE_VIDEO" | "CREATIVE_TYPE_NATIVE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_SITE_SQUARE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL" | "CREATIVE_TYPE_LIGHTBOX" | "CREATIVE_TYPE_NATIVE_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE" | "CREATIVE_TYPE_AUDIO" | "CREATIVE_TYPE_PUBLISHER_HOSTED" | "CREATIVE_TYPE_NATIVE_VIDEO" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO" | "CREATIVE_TYPE_ASSET_BASED_CREATIVE" | (string & {});
  /** Required. Indicates where the creative is hosted. */
  hostingSource?: "HOSTING_SOURCE_UNSPECIFIED" | "HOSTING_SOURCE_CM" | "HOSTING_SOURCE_THIRD_PARTY" | "HOSTING_SOURCE_HOSTED" | "HOSTING_SOURCE_RICH_MEDIA" | (string & {});
  /** Output only. Indicates whether the creative is dynamic. */
  dynamic?: boolean;
  /** Required. Primary dimensions of the creative. Applicable to all creative types. The value of width_pixels and height_pixels defaults to `0` when creative_type is one of: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  dimensions?: Dimensions;
  /** Optional. Additional dimensions. Applicable when creative_type is one of: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_LIGHTBOX` * `CREATIVE_TYPE_PUBLISHER_HOSTED` If this field is specified, width_pixels and height_pixels are both required and must be greater than or equal to 0. */
  additionalDimensions?: Array<Dimensions>;
  /** Output only. Media duration of the creative. Applicable when creative_type is one of: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_PUBLISHER_HOSTED` */
  mediaDuration?: string;
  /** Output only. A list of attributes of the creative that is generated by the system. */
  creativeAttributes?: Array<"CREATIVE_ATTRIBUTE_UNSPECIFIED" | "CREATIVE_ATTRIBUTE_VAST" | "CREATIVE_ATTRIBUTE_VPAID_LINEAR" | "CREATIVE_ATTRIBUTE_VPAID_NON_LINEAR" | (string & {})>;
  /** Output only. The current status of the creative review process. */
  reviewStatus?: ReviewStatusInfo;
  /** Required. Assets associated to this creative. */
  assets?: Array<AssetAssociation>;
  /** Required. Exit events for this creative. An exit (also known as a click tag) is any area in your creative that someone can click or tap to open an advertiser's landing page. Every creative must include at least one exit. You can add an exit to your creative in any of the following ways: * Use Google Web Designer's tap area. * Define a JavaScript variable called "clickTag". * Use the Enabler (Enabler.exit()) to track exits in rich media formats. */
  exitEvents?: Array<ExitEvent>;
  /** Optional. Timer custom events for a rich media creative. Timers track the time during which a user views and interacts with a specified part of a rich media creative. A creative can have multiple timer events, each timed independently. Leave it empty or unset for creatives containing image assets only. */
  timerEvents?: Array<TimerEvent>;
  /** Optional. Counter events for a rich media creative. Counters track the number of times that a user interacts with any part of a rich media creative in a specified way (mouse-overs, mouse-outs, clicks, taps, data loading, keyboard entries, etc.). Any event that can be captured in the creative can be recorded as a counter. Leave it empty or unset for creatives containing image assets only. */
  counterEvents?: Array<CounterEvent>;
  /** Optional. Third-party HTML tracking tag to be appended to the creative tag. */
  appendedTag?: string;
  /** Optional. ID information used to link this creative to an external system. Must be UTF-8 encoded with a length of no more than 10,000 characters. */
  integrationCode?: string;
  /** Optional. User notes for this creative. Must be UTF-8 encoded with a length of no more than 20,000 characters. */
  notes?: string;
  /** Optional. Indicates whether Integral Ad Science (IAS) campaign monitoring is enabled. To enable this for the creative, make sure the Advertiser.creative_config.ias_client_id has been set to your IAS client ID. */
  iasCampaignMonitoring?: boolean;
  /** Optional. The IDs of companion creatives for a video creative. You can assign existing display creatives (with image or HTML5 assets) to serve surrounding the publisher's video player. Companions display around the video player while the video is playing and remain after the video has completed. Creatives contain additional dimensions can not be companion creatives. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` */
  companionCreativeIds?: Array<string>;
  /** Optional. Whether the user can choose to skip a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  skippable?: boolean;
  /** Optional. Amount of time to play the video before the skip button appears. This field is required when skippable is true. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  skipOffset?: AudioVideoOffset;
  /** Optional. Amount of time to play the video before counting a view. This field is required when skippable is true. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  progressOffset?: AudioVideoOffset;
  /** Optional. An optional creative identifier provided by a registry that is unique across all platforms. Universal Ad ID is part of the VAST 4.0 standard. It can be modified after the creative is created. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  universalAdId?: UniversalAdId;
  /** Optional. Tracking URLs from third parties to track interactions with a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  thirdPartyUrls?: Array<ThirdPartyUrl>;
  /** Output only. Audio/Video transcodes. Display & Video 360 transcodes the main asset into a number of alternative versions that use different file formats or have different properties (resolution, audio bit rate, and video bit rate), each designed for specific video players or bandwidths. These transcodes give a publisher's system more options to choose from for each impression on your video and ensures that the appropriate file serves based on the viewer’s connection and screen size. This field is only supported in the following creative_type: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_AUDIO` */
  transcodes?: Array<Transcode>;
  /** Optional. Tracking URLs for analytics providers or third-party ad technology vendors. The URLs must start with `https:` (except on inventory that doesn't require SSL compliance). If using macros in your URL, use only macros supported by Display & Video 360. Standard URLs only, no IMG or SCRIPT tags. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  trackerUrls?: Array<string>;
  /** Optional. JavaScript measurement URL from supported third-party verification providers (ComScore, DoubleVerify, IAS, Moat). HTML script tags are not supported. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  jsTrackerUrl?: string;
  /** Optional. The Campaign Manager 360 tracking ad associated with the creative. Optional for the following creative_type when created by an advertiser that uses both Campaign Manager 360 and third-party ad serving: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` Output only for other cases. */
  cmTrackingAd?: CmTrackingAd;
  /** Optional. Specifies the OBA icon for a video creative. This field is only supported in the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  obaIcon?: ObaIcon;
  /** Optional. The original third-party tag used for the creative. Required and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` */
  thirdPartyTag?: string;
  /** Optional. Indicates that the creative requires MRAID (Mobile Rich Media Ad Interface Definitions system). Set this if the creative relies on mobile gestures for interactivity, such as swiping or tapping. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` */
  requireMraid?: boolean;
  /** Optional. Indicates that the creative relies on HTML5 to render properly. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` */
  requireHtml5?: boolean;
  /** Optional. Indicates that the creative will wait for a return ping for attribution. Only valid when using a Campaign Manager 360 tracking ad with a third-party ad server parameter and the ${DC_DBM_TOKEN} macro. Optional and only valid for third-party tag creatives or third-party VAST tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` */
  requirePingForAttribution?: boolean;
  /** Optional. Specifies the expanding direction of the creative. Required and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE` */
  expandingDirection?: "EXPANDING_DIRECTION_UNSPECIFIED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_AND_LEFT" | "EXPANDING_DIRECTION_UP_AND_RIGHT" | "EXPANDING_DIRECTION_DOWN_AND_LEFT" | "EXPANDING_DIRECTION_DOWN_AND_RIGHT" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | (string & {});
  /** Optional. Indicates the creative will automatically expand on hover. Optional and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE` */
  expandOnHover?: boolean;
  /** Optional. The URL of the VAST tag for a third-party VAST tag creative. Required and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` */
  vastTagUrl?: string;
  /** Output only. Indicates the third-party VAST tag creative requires VPAID (Digital Video Player-Ad Interface). Output only and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_VIDEO` */
  vpaid?: boolean;
  /** Output only. Indicates the third-party VAST tag creative requires HTML5 Video support. Output only and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_VIDEO` */
  html5Video?: boolean;
  /** Output only. The IDs of the line items this creative is associated with. To associate a creative to a line item, use LineItem.creative_ids instead. */
  lineItemIds?: Array<string>;
  /** Output only. Indicates the third-party audio creative supports MP3. Output only and only valid for third-party audio creatives. Third-party audio creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` */
  mp3Audio?: boolean;
  /** Output only. Indicates the third-party audio creative supports OGG. Output only and only valid for third-party audio creatives. Third-party audio creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` */
  oggAudio?: boolean;
}

export const Creative: Schema.Schema<Creative> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  creativeId: Schema.optional(Schema.String),
  cmPlacementId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  creativeType: Schema.optional(Schema.String),
  hostingSource: Schema.optional(Schema.String),
  dynamic: Schema.optional(Schema.Boolean),
  dimensions: Schema.optional(Dimensions),
  additionalDimensions: Schema.optional(Schema.Array(Dimensions)),
  mediaDuration: Schema.optional(Schema.String),
  creativeAttributes: Schema.optional(Schema.Array(Schema.String)),
  reviewStatus: Schema.optional(ReviewStatusInfo),
  assets: Schema.optional(Schema.Array(AssetAssociation)),
  exitEvents: Schema.optional(Schema.Array(ExitEvent)),
  timerEvents: Schema.optional(Schema.Array(TimerEvent)),
  counterEvents: Schema.optional(Schema.Array(CounterEvent)),
  appendedTag: Schema.optional(Schema.String),
  integrationCode: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  iasCampaignMonitoring: Schema.optional(Schema.Boolean),
  companionCreativeIds: Schema.optional(Schema.Array(Schema.String)),
  skippable: Schema.optional(Schema.Boolean),
  skipOffset: Schema.optional(AudioVideoOffset),
  progressOffset: Schema.optional(AudioVideoOffset),
  universalAdId: Schema.optional(UniversalAdId),
  thirdPartyUrls: Schema.optional(Schema.Array(ThirdPartyUrl)),
  transcodes: Schema.optional(Schema.Array(Transcode)),
  trackerUrls: Schema.optional(Schema.Array(Schema.String)),
  jsTrackerUrl: Schema.optional(Schema.String),
  cmTrackingAd: Schema.optional(CmTrackingAd),
  obaIcon: Schema.optional(ObaIcon),
  thirdPartyTag: Schema.optional(Schema.String),
  requireMraid: Schema.optional(Schema.Boolean),
  requireHtml5: Schema.optional(Schema.Boolean),
  requirePingForAttribution: Schema.optional(Schema.Boolean),
  expandingDirection: Schema.optional(Schema.String),
  expandOnHover: Schema.optional(Schema.Boolean),
  vastTagUrl: Schema.optional(Schema.String),
  vpaid: Schema.optional(Schema.Boolean),
  html5Video: Schema.optional(Schema.Boolean),
  lineItemIds: Schema.optional(Schema.Array(Schema.String)),
  mp3Audio: Schema.optional(Schema.Boolean),
  oggAudio: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Creative" }) as any as Schema.Schema<Creative>;

export interface ListCreativesResponse {
  /** The list of creatives. This list will be absent if empty. */
  creatives?: Array<Creative>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCreativesRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCreativesResponse: Schema.Schema<ListCreativesResponse> = Schema.suspend(() => Schema.Struct({
  creatives: Schema.optional(Schema.Array(Creative)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCreativesResponse" }) as any as Schema.Schema<ListCreativesResponse>;

export interface CustomBiddingAlgorithmRulesError {
  /** The type of error. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "SYNTAX_ERROR" | "CONSTRAINT_VIOLATION_ERROR" | "INTERNAL_ERROR" | (string & {});
}

export const CustomBiddingAlgorithmRulesError: Schema.Schema<CustomBiddingAlgorithmRulesError> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomBiddingAlgorithmRulesError" }) as any as Schema.Schema<CustomBiddingAlgorithmRulesError>;

export interface CustomBiddingAlgorithmRulesRef {
  /** A resource name to be used in media.download to download the rules files. Or media.upload to upload the rules files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/rulesRef/{ref_id}`. */
  resourceName?: string;
}

export const CustomBiddingAlgorithmRulesRef: Schema.Schema<CustomBiddingAlgorithmRulesRef> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomBiddingAlgorithmRulesRef" }) as any as Schema.Schema<CustomBiddingAlgorithmRulesRef>;

export interface CustomBiddingAlgorithmRules {
  /** Output only. The resource name of the rules resource. */
  name?: string;
  /** Output only. The unique ID of the custom bidding algorithm that the rules resource belongs to. */
  customBiddingAlgorithmId?: string;
  /** Output only. The unique ID of the rules resource. */
  customBiddingAlgorithmRulesId?: string;
  /** Output only. The time when the rules resource was created. */
  createTime?: string;
  /** Output only. Whether the rules resource is currently being used for scoring by the parent algorithm. */
  active?: boolean;
  /** Output only. The state of the rules resource. */
  state?: "STATE_UNSPECIFIED" | "ACCEPTED" | "REJECTED" | (string & {});
  /** Output only. Error code of the rejected rules resource. This field will only be populated when the state is `REJECTED`. */
  error?: CustomBiddingAlgorithmRulesError;
  /** Required. Immutable. The reference to the uploaded AlgorithmRules file. */
  rules?: CustomBiddingAlgorithmRulesRef;
}

export const CustomBiddingAlgorithmRules: Schema.Schema<CustomBiddingAlgorithmRules> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customBiddingAlgorithmId: Schema.optional(Schema.String),
  customBiddingAlgorithmRulesId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  error: Schema.optional(CustomBiddingAlgorithmRulesError),
  rules: Schema.optional(CustomBiddingAlgorithmRulesRef),
})).annotate({ identifier: "CustomBiddingAlgorithmRules" }) as any as Schema.Schema<CustomBiddingAlgorithmRules>;

export interface ListCustomBiddingAlgorithmRulesResponse {
  /** The list of CustomBiddingAlgorithmRules resources. This list will be absent if empty. */
  customBiddingRules?: Array<CustomBiddingAlgorithmRules>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomBiddingAlgorithmRulesRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCustomBiddingAlgorithmRulesResponse: Schema.Schema<ListCustomBiddingAlgorithmRulesResponse> = Schema.suspend(() => Schema.Struct({
  customBiddingRules: Schema.optional(Schema.Array(CustomBiddingAlgorithmRules)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCustomBiddingAlgorithmRulesResponse" }) as any as Schema.Schema<ListCustomBiddingAlgorithmRulesResponse>;

export interface CustomBiddingModelDetails {
  /** The unique ID of the relevant advertiser. */
  advertiserId?: string;
  /** The readiness state of custom bidding model. */
  readinessState?: "READINESS_STATE_UNSPECIFIED" | "READINESS_STATE_ACTIVE" | "READINESS_STATE_INSUFFICIENT_DATA" | "READINESS_STATE_TRAINING" | "READINESS_STATE_NO_VALID_SCRIPT" | "READINESS_STATE_EVALUATION_FAILURE" | (string & {});
  /** Output only. The suspension state of custom bidding model. */
  suspensionState?: "SUSPENSION_STATE_UNSPECIFIED" | "SUSPENSION_STATE_ENABLED" | "SUSPENSION_STATE_DORMANT" | "SUSPENSION_STATE_SUSPENDED" | (string & {});
}

export const CustomBiddingModelDetails: Schema.Schema<CustomBiddingModelDetails> = Schema.suspend(() => Schema.Struct({
  advertiserId: Schema.optional(Schema.String),
  readinessState: Schema.optional(Schema.String),
  suspensionState: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomBiddingModelDetails" }) as any as Schema.Schema<CustomBiddingModelDetails>;

export interface CustomBiddingAlgorithm {
  /** Output only. The resource name of the custom bidding algorithm. */
  name?: string;
  /** Immutable. The unique ID of the partner that owns the custom bidding algorithm. */
  partnerId?: string;
  /** Immutable. The unique ID of the advertiser that owns the custom bidding algorithm. */
  advertiserId?: string;
  /** Output only. The unique ID of the custom bidding algorithm. Assigned by the system. */
  customBiddingAlgorithmId?: string;
  /** Required. The display name of the custom bidding algorithm. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Controls whether or not the custom bidding algorithm can be used as a bidding strategy. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Required. Immutable. The type of custom bidding algorithm. */
  customBiddingAlgorithmType?: "CUSTOM_BIDDING_ALGORITHM_TYPE_UNSPECIFIED" | "SCRIPT_BASED" | "RULE_BASED" | (string & {});
  /** The IDs of the advertisers who have access to this algorithm. If advertiser_id is set, this field will only consist of that value. This field will not be set if the algorithm [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner) is a partner and is being retrieved using an advertiser [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor). */
  sharedAdvertiserIds?: Array<string>;
  /** Output only. The details of custom bidding models for each advertiser who has access. This field may only include the details of the queried advertiser if the algorithm [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner) is a partner and is being retrieved using an advertiser [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor). */
  modelDetails?: Array<CustomBiddingModelDetails>;
  /** Optional. Immutable. Designates the third party optimization partner that manages this algorithm. */
  thirdPartyOptimizationPartner?: "UNKNOWN" | "SCIBIDS" | "ADELAIDE" | (string & {});
}

export const CustomBiddingAlgorithm: Schema.Schema<CustomBiddingAlgorithm> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  customBiddingAlgorithmId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  customBiddingAlgorithmType: Schema.optional(Schema.String),
  sharedAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
  modelDetails: Schema.optional(Schema.Array(CustomBiddingModelDetails)),
  thirdPartyOptimizationPartner: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomBiddingAlgorithm" }) as any as Schema.Schema<CustomBiddingAlgorithm>;

export interface ListCustomBiddingAlgorithmsResponse {
  /** The list of custom bidding algorithms. This list will be absent if empty. */
  customBiddingAlgorithms?: Array<CustomBiddingAlgorithm>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomBiddingAlgorithmsRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCustomBiddingAlgorithmsResponse: Schema.Schema<ListCustomBiddingAlgorithmsResponse> = Schema.suspend(() => Schema.Struct({
  customBiddingAlgorithms: Schema.optional(Schema.Array(CustomBiddingAlgorithm)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCustomBiddingAlgorithmsResponse" }) as any as Schema.Schema<ListCustomBiddingAlgorithmsResponse>;

export interface ScriptError {
  /** The type of error. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "SYNTAX_ERROR" | "DEPRECATED_SYNTAX" | "INTERNAL_ERROR" | (string & {});
  /** The line number in the script where the error was thrown. */
  line?: string;
  /** The column number in the script where the error was thrown. */
  column?: string;
  /** The detailed error message. */
  errorMessage?: string;
}

export const ScriptError: Schema.Schema<ScriptError> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(Schema.String),
  line: Schema.optional(Schema.String),
  column: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ScriptError" }) as any as Schema.Schema<ScriptError>;

export interface CustomBiddingScriptRef {
  /** A resource name to be used in media.download to Download the script files. Or media.upload to Upload the script files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/scriptRef/{ref_id}`. */
  resourceName?: string;
}

export const CustomBiddingScriptRef: Schema.Schema<CustomBiddingScriptRef> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomBiddingScriptRef" }) as any as Schema.Schema<CustomBiddingScriptRef>;

export interface CustomBiddingScript {
  /** Output only. The resource name of the custom bidding script. */
  name?: string;
  /** Output only. The unique ID of the custom bidding algorithm the script belongs to. */
  customBiddingAlgorithmId?: string;
  /** Output only. The unique ID of the custom bidding script. */
  customBiddingScriptId?: string;
  /** Output only. The time when the script was created. */
  createTime?: string;
  /** Output only. Whether the script is currently being used for scoring by the parent algorithm. */
  active?: boolean;
  /** Output only. The state of the custom bidding script. */
  state?: "STATE_UNSPECIFIED" | "ACCEPTED" | "REJECTED" | "PENDING" | (string & {});
  /** Output only. Error details of a rejected custom bidding script. This field will only be populated when state is REJECTED. */
  errors?: Array<ScriptError>;
  /** The reference to the uploaded script file. */
  script?: CustomBiddingScriptRef;
}

export const CustomBiddingScript: Schema.Schema<CustomBiddingScript> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customBiddingAlgorithmId: Schema.optional(Schema.String),
  customBiddingScriptId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(ScriptError)),
  script: Schema.optional(CustomBiddingScriptRef),
})).annotate({ identifier: "CustomBiddingScript" }) as any as Schema.Schema<CustomBiddingScript>;

export interface ListCustomBiddingScriptsResponse {
  /** The list of custom bidding scripts. This list will be absent if empty. */
  customBiddingScripts?: Array<CustomBiddingScript>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomBiddingScriptsRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCustomBiddingScriptsResponse: Schema.Schema<ListCustomBiddingScriptsResponse> = Schema.suspend(() => Schema.Struct({
  customBiddingScripts: Schema.optional(Schema.Array(CustomBiddingScript)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCustomBiddingScriptsResponse" }) as any as Schema.Schema<ListCustomBiddingScriptsResponse>;

export interface CustomList {
  /** Output only. The resource name of the custom list. */
  name?: string;
  /** Output only. The unique ID of the custom list. Assigned by the system. */
  customListId?: string;
  /** Output only. The display name of the custom list. . */
  displayName?: string;
}

export const CustomList: Schema.Schema<CustomList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customListId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomList" }) as any as Schema.Schema<CustomList>;

export interface ListCustomListsResponse {
  /** The list of custom lists. This list will be absent if empty. */
  customLists?: Array<CustomList>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomLists` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCustomListsResponse: Schema.Schema<ListCustomListsResponse> = Schema.suspend(() => Schema.Struct({
  customLists: Schema.optional(Schema.Array(CustomList)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCustomListsResponse" }) as any as Schema.Schema<ListCustomListsResponse>;

export interface ContactInfo {
  /** SHA256 hashed first name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_last_name * zip_codes */
  hashedFirstName?: string;
  /** SHA256 hashed last name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_first_name * zip_codes */
  hashedLastName?: string;
  /** Country code of the member. Must also be set with the following fields: * hashed_first_name * hashed_last_name * zip_codes */
  countryCode?: string;
  /** A list of SHA256 hashed email of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. */
  hashedEmails?: Array<string>;
  /** A list of SHA256 hashed phone numbers of the member. Before hashing, all phone numbers must be formatted using the [E.164 format](//en.wikipedia.org/wiki/E.164) and include the country calling code. */
  hashedPhoneNumbers?: Array<string>;
  /** A list of zip codes of the member. Must also be set with the following fields: * country_code * hashed_first_name * hashed_last_name */
  zipCodes?: Array<string>;
}

export const ContactInfo: Schema.Schema<ContactInfo> = Schema.suspend(() => Schema.Struct({
  hashedFirstName: Schema.optional(Schema.String),
  hashedLastName: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  hashedEmails: Schema.optional(Schema.Array(Schema.String)),
  hashedPhoneNumbers: Schema.optional(Schema.Array(Schema.String)),
  zipCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContactInfo" }) as any as Schema.Schema<ContactInfo>;

export interface Consent {
  /** Represents consent for ad user data. */
  adUserData?: "CONSENT_STATUS_UNSPECIFIED" | "CONSENT_STATUS_GRANTED" | "CONSENT_STATUS_DENIED" | (string & {});
  /** Represents consent for ad personalization. */
  adPersonalization?: "CONSENT_STATUS_UNSPECIFIED" | "CONSENT_STATUS_GRANTED" | "CONSENT_STATUS_DENIED" | (string & {});
}

export const Consent: Schema.Schema<Consent> = Schema.suspend(() => Schema.Struct({
  adUserData: Schema.optional(Schema.String),
  adPersonalization: Schema.optional(Schema.String),
})).annotate({ identifier: "Consent" }) as any as Schema.Schema<Consent>;

export interface ContactInfoList {
  /** A list of ContactInfo objects defining Customer Match audience members. The size of members after splitting the contact_infos mustn't be greater than 500,000. */
  contactInfos?: Array<ContactInfo>;
  /** Input only. The consent setting for the users in contact_infos. Leaving this field unset indicates that consent is not specified. If ad_user_data or ad_personalization fields are set to `CONSENT_STATUS_DENIED`, the request will return an error. */
  consent?: Consent;
}

export const ContactInfoList: Schema.Schema<ContactInfoList> = Schema.suspend(() => Schema.Struct({
  contactInfos: Schema.optional(Schema.Array(ContactInfo)),
  consent: Schema.optional(Consent),
})).annotate({ identifier: "ContactInfoList" }) as any as Schema.Schema<ContactInfoList>;

export interface MobileDeviceIdList {
  /** A list of mobile device IDs defining Customer Match audience members. The size of mobile_device_ids mustn't be greater than 500,000. */
  mobileDeviceIds?: Array<string>;
  /** Input only. The consent setting for the users in mobile_device_ids. Leaving this field unset indicates that consent is not specified. If ad_user_data or ad_personalization fields are set to `CONSENT_STATUS_DENIED`, the request will return an error. */
  consent?: Consent;
}

export const MobileDeviceIdList: Schema.Schema<MobileDeviceIdList> = Schema.suspend(() => Schema.Struct({
  mobileDeviceIds: Schema.optional(Schema.Array(Schema.String)),
  consent: Schema.optional(Consent),
})).annotate({ identifier: "MobileDeviceIdList" }) as any as Schema.Schema<MobileDeviceIdList>;

export interface FirstPartyAndPartnerAudience {
  /** Output only. The resource name of the first party and partner audience. */
  name?: string;
  /** Identifier. The unique ID of the first party and partner audience. Assigned by the system. */
  firstPartyAndPartnerAudienceId?: string;
  /** Optional. The display name of the first party and partner audience. */
  displayName?: string;
  /** Optional. The user-provided description of the audience. Only applicable to first party audiences. */
  description?: string;
  /** Output only. Whether the audience is a first party and partner audience. */
  firstPartyAndPartnerAudienceType?: "FIRST_PARTY_AND_PARTNER_AUDIENCE_TYPE_UNSPECIFIED" | "TYPE_FIRST_PARTY" | "TYPE_PARTNER" | (string & {});
  /** Immutable. The type of the audience. */
  audienceType?: "AUDIENCE_TYPE_UNSPECIFIED" | "CUSTOMER_MATCH_CONTACT_INFO" | "CUSTOMER_MATCH_DEVICE_ID" | "CUSTOMER_MATCH_USER_ID" | "ACTIVITY_BASED" | "FREQUENCY_CAP" | "TAG_BASED" | "YOUTUBE_USERS" | "THIRD_PARTY" | "COMMERCE" | "LINEAR" | "AGENCY" | (string & {});
  /** Output only. The source of the audience. */
  audienceSource?: "AUDIENCE_SOURCE_UNSPECIFIED" | "DISPLAY_VIDEO_360" | "CAMPAIGN_MANAGER" | "AD_MANAGER" | "SEARCH_ADS_360" | "YOUTUBE" | "ADS_DATA_HUB" | (string & {});
  /** Optional. The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540. Only applicable to first party audiences. This field is required if one of the following audience_type is used: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
  membershipDurationDays?: string;
  /** Output only. The estimated audience size for the Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only returned in GET request. */
  displayAudienceSize?: string;
  /** Output only. The estimated audience size for the Display network in the past month. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only returned in GET request. */
  activeDisplayAudienceSize?: string;
  /** Output only. The estimated audience size for YouTube network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  youtubeAudienceSize?: string;
  /** Output only. The estimated audience size for Gmail network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  gmailAudienceSize?: string;
  /** Output only. The estimated mobile app audience size in Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  displayMobileAppAudienceSize?: string;
  /** Output only. The estimated mobile web audience size in Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  displayMobileWebAudienceSize?: string;
  /** Output only. The estimated desktop audience size in Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  displayDesktopAudienceSize?: string;
  /** Optional. The app_id matches with the type of the mobile_device_ids being uploaded. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID` */
  appId?: string;
  /** Input only. A list of contact information to define the initial audience members. Only applicable to audience_type `CUSTOMER_MATCH_CONTACT_INFO` */
  contactInfoList?: ContactInfoList;
  /** Input only. A list of mobile device IDs to define the initial audience members. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID` */
  mobileDeviceIdList?: MobileDeviceIdList;
}

export const FirstPartyAndPartnerAudience: Schema.Schema<FirstPartyAndPartnerAudience> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  firstPartyAndPartnerAudienceId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  firstPartyAndPartnerAudienceType: Schema.optional(Schema.String),
  audienceType: Schema.optional(Schema.String),
  audienceSource: Schema.optional(Schema.String),
  membershipDurationDays: Schema.optional(Schema.String),
  displayAudienceSize: Schema.optional(Schema.String),
  activeDisplayAudienceSize: Schema.optional(Schema.String),
  youtubeAudienceSize: Schema.optional(Schema.String),
  gmailAudienceSize: Schema.optional(Schema.String),
  displayMobileAppAudienceSize: Schema.optional(Schema.String),
  displayMobileWebAudienceSize: Schema.optional(Schema.String),
  displayDesktopAudienceSize: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  contactInfoList: Schema.optional(ContactInfoList),
  mobileDeviceIdList: Schema.optional(MobileDeviceIdList),
})).annotate({ identifier: "FirstPartyAndPartnerAudience" }) as any as Schema.Schema<FirstPartyAndPartnerAudience>;

export interface ListFirstPartyAndPartnerAudiencesResponse {
  /** The list of first party and partner audiences. Audience size properties will not be included. This list will be absent if empty. */
  firstPartyAndPartnerAudiences?: Array<FirstPartyAndPartnerAudience>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListFirstPartyAndPartnerAudiences` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFirstPartyAndPartnerAudiencesResponse: Schema.Schema<ListFirstPartyAndPartnerAudiencesResponse> = Schema.suspend(() => Schema.Struct({
  firstPartyAndPartnerAudiences: Schema.optional(Schema.Array(FirstPartyAndPartnerAudience)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFirstPartyAndPartnerAudiencesResponse" }) as any as Schema.Schema<ListFirstPartyAndPartnerAudiencesResponse>;

export interface EditCustomerMatchMembersRequest {
  /** Input only. A list of contact information to define the members to be added. */
  addedContactInfoList?: ContactInfoList;
  /** Input only. A list of mobile device IDs to define the members to be added. */
  addedMobileDeviceIdList?: MobileDeviceIdList;
  /** Input only. A list of contact information to define the members to be removed. */
  removedContactInfoList?: ContactInfoList;
  /** Input only. A list of mobile device IDs to define the members to be removed. */
  removedMobileDeviceIdList?: MobileDeviceIdList;
  /** Required. The ID of the owner advertiser of the updated Customer Match FirstAndThirdPartyAudience. */
  advertiserId?: string;
}

export const EditCustomerMatchMembersRequest: Schema.Schema<EditCustomerMatchMembersRequest> = Schema.suspend(() => Schema.Struct({
  addedContactInfoList: Schema.optional(ContactInfoList),
  addedMobileDeviceIdList: Schema.optional(MobileDeviceIdList),
  removedContactInfoList: Schema.optional(ContactInfoList),
  removedMobileDeviceIdList: Schema.optional(MobileDeviceIdList),
  advertiserId: Schema.optional(Schema.String),
})).annotate({ identifier: "EditCustomerMatchMembersRequest" }) as any as Schema.Schema<EditCustomerMatchMembersRequest>;

export interface EditCustomerMatchMembersResponse {
  /** Required. The ID of the updated Customer Match FirstPartyAndPartnerAudience. */
  firstPartyAndPartnerAudienceId?: string;
}

export const EditCustomerMatchMembersResponse: Schema.Schema<EditCustomerMatchMembersResponse> = Schema.suspend(() => Schema.Struct({
  firstPartyAndPartnerAudienceId: Schema.optional(Schema.String),
})).annotate({ identifier: "EditCustomerMatchMembersResponse" }) as any as Schema.Schema<EditCustomerMatchMembersResponse>;

export interface RemarketingConfig {
  /** Output only. The ID of the advertiser. */
  advertiserId?: string;
  /** Output only. Whether the Floodlight activity remarketing user list is available to the identified advertiser. */
  remarketingEnabled?: boolean;
}

export const RemarketingConfig: Schema.Schema<RemarketingConfig> = Schema.suspend(() => Schema.Struct({
  advertiserId: Schema.optional(Schema.String),
  remarketingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemarketingConfig" }) as any as Schema.Schema<RemarketingConfig>;

export interface FloodlightActivity {
  /** Output only. The resource name of the Floodlight activity. */
  name?: string;
  /** Required. Immutable. The ID of the parent Floodlight group. */
  floodlightGroupId?: string;
  /** Output only. The unique ID of the Floodlight activity. Assigned by the system. */
  floodlightActivityId?: string;
  /** Required. The display name of the Floodlight activity. */
  displayName?: string;
  /** Optional. Whether the Floodlight activity is served. */
  servingStatus?: "FLOODLIGHT_ACTIVITY_SERVING_STATUS_UNSPECIFIED" | "FLOODLIGHT_ACTIVITY_SERVING_STATUS_ENABLED" | "FLOODLIGHT_ACTIVITY_SERVING_STATUS_DISABLED" | (string & {});
  /** Output only. IDs of the advertisers that have access to the parent Floodlight group. Only advertisers under the provided partner ID will be listed in this field. */
  advertiserIds?: Array<string>;
  /** Output only. A list of configuration objects designating whether remarketing for this Floodlight Activity is enabled and available for a specifc advertiser. If enabled, this Floodlight Activity generates a remarketing user list that is able to be used in targeting under the advertiser. */
  remarketingConfigs?: Array<RemarketingConfig>;
  /** Output only. Whether tags are required to be compliant. */
  sslRequired?: boolean;
}

export const FloodlightActivity: Schema.Schema<FloodlightActivity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  floodlightGroupId: Schema.optional(Schema.String),
  floodlightActivityId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  servingStatus: Schema.optional(Schema.String),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)),
  remarketingConfigs: Schema.optional(Schema.Array(RemarketingConfig)),
  sslRequired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FloodlightActivity" }) as any as Schema.Schema<FloodlightActivity>;

export interface ListFloodlightActivitiesResponse {
  /** The list of Floodlight activities. This list will be absent if empty. */
  floodlightActivities?: Array<FloodlightActivity>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListFloodlightActivities` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFloodlightActivitiesResponse: Schema.Schema<ListFloodlightActivitiesResponse> = Schema.suspend(() => Schema.Struct({
  floodlightActivities: Schema.optional(Schema.Array(FloodlightActivity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFloodlightActivitiesResponse" }) as any as Schema.Schema<ListFloodlightActivitiesResponse>;

export interface LookbackWindow {
  /** Lookback window, in days, from the last time a given user clicked on one of your ads. */
  clickDays?: number;
  /** Lookback window, in days, from the last time a given user viewed one of your ads. */
  impressionDays?: number;
}

export const LookbackWindow: Schema.Schema<LookbackWindow> = Schema.suspend(() => Schema.Struct({
  clickDays: Schema.optional(Schema.Number),
  impressionDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "LookbackWindow" }) as any as Schema.Schema<LookbackWindow>;

export interface ActiveViewVideoViewabilityMetricConfig {
  /** Required. The display name of the custom metric. */
  displayName?: string;
  /** Required. The minimum percentage of the video ad's pixels visible on the screen in order for an impression to be recorded. */
  minimumViewability?: "VIEWABILITY_PERCENT_UNSPECIFIED" | "VIEWABILITY_PERCENT_0" | "VIEWABILITY_PERCENT_25" | "VIEWABILITY_PERCENT_50" | "VIEWABILITY_PERCENT_75" | "VIEWABILITY_PERCENT_100" | (string & {});
  /** Required. The minimum percentage of the video ad's volume required in order for an impression to be recorded. */
  minimumVolume?: "VIDEO_VOLUME_PERCENT_UNSPECIFIED" | "VIDEO_VOLUME_PERCENT_0" | "VIDEO_VOLUME_PERCENT_10" | (string & {});
  /** The minimum visible video duration required (in seconds) in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first). */
  minimumDuration?: "VIDEO_DURATION_UNSPECIFIED" | "VIDEO_DURATION_SECONDS_NONE" | "VIDEO_DURATION_SECONDS_0" | "VIDEO_DURATION_SECONDS_1" | "VIDEO_DURATION_SECONDS_2" | "VIDEO_DURATION_SECONDS_3" | "VIDEO_DURATION_SECONDS_4" | "VIDEO_DURATION_SECONDS_5" | "VIDEO_DURATION_SECONDS_6" | "VIDEO_DURATION_SECONDS_7" | "VIDEO_DURATION_SECONDS_8" | "VIDEO_DURATION_SECONDS_9" | "VIDEO_DURATION_SECONDS_10" | "VIDEO_DURATION_SECONDS_11" | "VIDEO_DURATION_SECONDS_12" | "VIDEO_DURATION_SECONDS_13" | "VIDEO_DURATION_SECONDS_14" | "VIDEO_DURATION_SECONDS_15" | "VIDEO_DURATION_SECONDS_30" | "VIDEO_DURATION_SECONDS_45" | "VIDEO_DURATION_SECONDS_60" | (string & {});
  /** The minimum visible video duration required, based on the video quartiles, in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first). */
  minimumQuartile?: "VIDEO_DURATION_QUARTILE_UNSPECIFIED" | "VIDEO_DURATION_QUARTILE_NONE" | "VIDEO_DURATION_QUARTILE_FIRST" | "VIDEO_DURATION_QUARTILE_SECOND" | "VIDEO_DURATION_QUARTILE_THIRD" | "VIDEO_DURATION_QUARTILE_FOURTH" | (string & {});
}

export const ActiveViewVideoViewabilityMetricConfig: Schema.Schema<ActiveViewVideoViewabilityMetricConfig> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  minimumViewability: Schema.optional(Schema.String),
  minimumVolume: Schema.optional(Schema.String),
  minimumDuration: Schema.optional(Schema.String),
  minimumQuartile: Schema.optional(Schema.String),
})).annotate({ identifier: "ActiveViewVideoViewabilityMetricConfig" }) as any as Schema.Schema<ActiveViewVideoViewabilityMetricConfig>;

export interface FloodlightGroup {
  /** Output only. The resource name of the Floodlight group. */
  name?: string;
  /** Output only. The unique ID of the Floodlight group. Assigned by the system. */
  floodlightGroupId?: string;
  /** Required. The display name of the Floodlight group. */
  displayName?: string;
  /** Required. The web tag type enabled for the Floodlight group. */
  webTagType?: "WEB_TAG_TYPE_UNSPECIFIED" | "WEB_TAG_TYPE_NONE" | "WEB_TAG_TYPE_IMAGE" | "WEB_TAG_TYPE_DYNAMIC" | (string & {});
  /** Required. The lookback window for the Floodlight group. Both click_days and impression_days are required. Acceptable values for both are `0` to `90`, inclusive. */
  lookbackWindow?: LookbackWindow;
  /** User-defined custom variables owned by the Floodlight group. Use custom Floodlight variables to create reporting data that is tailored to your unique business needs. Custom Floodlight variables use the keys `U1=`, `U2=`, and so on, and can take any values that you choose to pass to them. You can use them to track virtually any type of data that you collect about your customers, such as the genre of movie that a customer purchases, the country to which the item is shipped, and so on. Custom Floodlight variables may not be used to pass any data that could be used or recognized as personally identifiable information (PII). Example: `custom_variables { fields { "U1": value { number_value: 123.4 }, "U2": value { string_value: "MyVariable2" }, "U3": value { string_value: "MyVariable3" } } }` Acceptable values for keys are "U1" through "U100", inclusive. String values must be less than 64 characters long, and cannot contain the following characters: `"<>`. */
  customVariables?: Record<string, unknown>;
  /** The Active View video viewability metric configuration for the Floodlight group. */
  activeViewConfig?: ActiveViewVideoViewabilityMetricConfig;
}

export const FloodlightGroup: Schema.Schema<FloodlightGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  floodlightGroupId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  webTagType: Schema.optional(Schema.String),
  lookbackWindow: Schema.optional(LookbackWindow),
  customVariables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  activeViewConfig: Schema.optional(ActiveViewVideoViewabilityMetricConfig),
})).annotate({ identifier: "FloodlightGroup" }) as any as Schema.Schema<FloodlightGroup>;

export interface GoogleAudience {
  /** Output only. The resource name of the google audience. */
  name?: string;
  /** Output only. The unique ID of the Google audience. Assigned by the system. */
  googleAudienceId?: string;
  /** Output only. The display name of the Google audience. . */
  displayName?: string;
  /** Output only. The type of Google audience. . */
  googleAudienceType?: "GOOGLE_AUDIENCE_TYPE_UNSPECIFIED" | "GOOGLE_AUDIENCE_TYPE_AFFINITY" | "GOOGLE_AUDIENCE_TYPE_IN_MARKET" | "GOOGLE_AUDIENCE_TYPE_INSTALLED_APPS" | "GOOGLE_AUDIENCE_TYPE_NEW_MOBILE_DEVICES" | "GOOGLE_AUDIENCE_TYPE_LIFE_EVENT" | "GOOGLE_AUDIENCE_TYPE_EXTENDED_DEMOGRAPHIC" | (string & {});
}

export const GoogleAudience: Schema.Schema<GoogleAudience> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  googleAudienceId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  googleAudienceType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAudience" }) as any as Schema.Schema<GoogleAudience>;

export interface ListGoogleAudiencesResponse {
  /** The list of Google audiences. This list will be absent if empty. */
  googleAudiences?: Array<GoogleAudience>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListGoogleAudiences` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListGoogleAudiencesResponse: Schema.Schema<ListGoogleAudiencesResponse> = Schema.suspend(() => Schema.Struct({
  googleAudiences: Schema.optional(Schema.Array(GoogleAudience)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGoogleAudiencesResponse" }) as any as Schema.Schema<ListGoogleAudiencesResponse>;

export interface GuaranteedOrderStatus {
  /** Whether or not the guaranteed order is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** The user-provided reason for pausing this guaranteed order. Must be UTF-8 encoded with a maximum length of 100 bytes. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`. */
  entityPauseReason?: string;
  /** Output only. The configuration status of the guaranteed order. Acceptable values are `PENDING` and `COMPLETED`. A guaranteed order must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve. Currently the configuration action can only be performed via UI. */
  configStatus?: "GUARANTEED_ORDER_CONFIG_STATUS_UNSPECIFIED" | "PENDING" | "COMPLETED" | (string & {});
}

export const GuaranteedOrderStatus: Schema.Schema<GuaranteedOrderStatus> = Schema.suspend(() => Schema.Struct({
  entityStatus: Schema.optional(Schema.String),
  entityPauseReason: Schema.optional(Schema.String),
  configStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GuaranteedOrderStatus" }) as any as Schema.Schema<GuaranteedOrderStatus>;

export interface GuaranteedOrder {
  /** Output only. The resource name of the guaranteed order. */
  name?: string;
  /** Output only. The legacy ID of the guaranteed order. Assigned by the original exchange. The legacy ID is unique within one exchange, but is not guaranteed to be unique across all guaranteed orders. This ID is used in SDF and UI. */
  legacyGuaranteedOrderId?: string;
  /** Required. Immutable. The exchange where the guaranteed order originated. */
  exchange?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
  /** Output only. The unique identifier of the guaranteed order. The guaranteed order IDs have the format `{exchange}-{legacy_guaranteed_order_id}`. */
  guaranteedOrderId?: string;
  /** Required. The display name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** The status settings of the guaranteed order. */
  status?: GuaranteedOrderStatus;
  /** Output only. The timestamp when the guaranteed order was last updated. Assigned by the system. */
  updateTime?: string;
  /** Required. The publisher name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  publisherName?: string;
  /** The partner with read/write access to the guaranteed order. */
  readWritePartnerId?: string;
  /** The advertiser with read/write access to the guaranteed order. This is also the default advertiser of the guaranteed order. */
  readWriteAdvertiserId?: string;
  /** Whether all advertisers of read_write_partner_id have read access to the guaranteed order. Only applicable if read_write_partner_id is set. If True, overrides read_advertiser_ids. */
  readAccessInherited?: boolean;
  /** The IDs of advertisers with read access to the guaranteed order. This field must not include the advertiser assigned to read_write_advertiser_id if it is set. All advertisers in this field must belong to read_write_partner_id or the same partner as read_write_advertiser_id. */
  readAdvertiserIds?: Array<string>;
  /** Output only. The ID of default advertiser of the guaranteed order. The default advertiser is either the read_write_advertiser_id or, if that is not set, the first advertiser listed in read_advertiser_ids. Otherwise, there is no default advertiser. */
  defaultAdvertiserId?: string;
  /** The ID of the default campaign that is assigned to the guaranteed order. The default campaign must belong to the default advertiser. */
  defaultCampaignId?: string;
}

export const GuaranteedOrder: Schema.Schema<GuaranteedOrder> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  legacyGuaranteedOrderId: Schema.optional(Schema.String),
  exchange: Schema.optional(Schema.String),
  guaranteedOrderId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  status: Schema.optional(GuaranteedOrderStatus),
  updateTime: Schema.optional(Schema.String),
  publisherName: Schema.optional(Schema.String),
  readWritePartnerId: Schema.optional(Schema.String),
  readWriteAdvertiserId: Schema.optional(Schema.String),
  readAccessInherited: Schema.optional(Schema.Boolean),
  readAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
  defaultAdvertiserId: Schema.optional(Schema.String),
  defaultCampaignId: Schema.optional(Schema.String),
})).annotate({ identifier: "GuaranteedOrder" }) as any as Schema.Schema<GuaranteedOrder>;

export interface ListGuaranteedOrdersResponse {
  /** The list of guaranteed orders. This list will be absent if empty. */
  guaranteedOrders?: Array<GuaranteedOrder>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListGuaranteedOrders` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListGuaranteedOrdersResponse: Schema.Schema<ListGuaranteedOrdersResponse> = Schema.suspend(() => Schema.Struct({
  guaranteedOrders: Schema.optional(Schema.Array(GuaranteedOrder)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGuaranteedOrdersResponse" }) as any as Schema.Schema<ListGuaranteedOrdersResponse>;

export interface EditGuaranteedOrderReadAccessorsRequest {
  /** Required. The partner context in which the change is being made. */
  partnerId?: string;
  /** Whether to give all advertisers of the read/write accessor partner read access to the guaranteed order. Only applicable if read_write_partner_id is set in the guaranteed order. */
  readAccessInherited?: boolean;
  /** The advertisers to add as read accessors to the guaranteed order. */
  addedAdvertisers?: Array<string>;
  /** The advertisers to remove as read accessors to the guaranteed order. */
  removedAdvertisers?: Array<string>;
}

export const EditGuaranteedOrderReadAccessorsRequest: Schema.Schema<EditGuaranteedOrderReadAccessorsRequest> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
  readAccessInherited: Schema.optional(Schema.Boolean),
  addedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
  removedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EditGuaranteedOrderReadAccessorsRequest" }) as any as Schema.Schema<EditGuaranteedOrderReadAccessorsRequest>;

export interface EditGuaranteedOrderReadAccessorsResponse {
  /** Whether all advertisers of read_write_partner_id have read access to the guaranteed order. */
  readAccessInherited?: boolean;
  /** The IDs of advertisers with read access to the guaranteed order. */
  readAdvertiserIds?: Array<string>;
}

export const EditGuaranteedOrderReadAccessorsResponse: Schema.Schema<EditGuaranteedOrderReadAccessorsResponse> = Schema.suspend(() => Schema.Struct({
  readAccessInherited: Schema.optional(Schema.Boolean),
  readAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EditGuaranteedOrderReadAccessorsResponse" }) as any as Schema.Schema<EditGuaranteedOrderReadAccessorsResponse>;

export interface PartnerCost {
  /** Required. The type of the partner cost. */
  costType?: "PARTNER_COST_TYPE_UNSPECIFIED" | "PARTNER_COST_TYPE_ADLOOX" | "PARTNER_COST_TYPE_ADLOOX_PREBID" | "PARTNER_COST_TYPE_ADSAFE" | "PARTNER_COST_TYPE_ADXPOSE" | "PARTNER_COST_TYPE_AGGREGATE_KNOWLEDGE" | "PARTNER_COST_TYPE_AGENCY_TRADING_DESK" | "PARTNER_COST_TYPE_DV360_FEE" | "PARTNER_COST_TYPE_COMSCORE_VCE" | "PARTNER_COST_TYPE_DATA_MANAGEMENT_PLATFORM" | "PARTNER_COST_TYPE_DEFAULT" | "PARTNER_COST_TYPE_DOUBLE_VERIFY" | "PARTNER_COST_TYPE_DOUBLE_VERIFY_PREBID" | "PARTNER_COST_TYPE_EVIDON" | "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_VIDEO" | "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_PREBID" | "PARTNER_COST_TYPE_MEDIA_COST_DATA" | "PARTNER_COST_TYPE_MOAT_VIDEO" | "PARTNER_COST_TYPE_NIELSEN_DAR" | "PARTNER_COST_TYPE_SHOP_LOCAL" | "PARTNER_COST_TYPE_TERACENT" | "PARTNER_COST_TYPE_THIRD_PARTY_AD_SERVER" | "PARTNER_COST_TYPE_TRUST_METRICS" | "PARTNER_COST_TYPE_VIZU" | "PARTNER_COST_TYPE_CUSTOM_FEE_1" | "PARTNER_COST_TYPE_CUSTOM_FEE_2" | "PARTNER_COST_TYPE_CUSTOM_FEE_3" | "PARTNER_COST_TYPE_CUSTOM_FEE_4" | "PARTNER_COST_TYPE_CUSTOM_FEE_5" | "PARTNER_COST_TYPE_SCIBIDS_FEE" | (string & {});
  /** Required. The fee type for this partner cost. */
  feeType?: "PARTNER_COST_FEE_TYPE_UNSPECIFIED" | "PARTNER_COST_FEE_TYPE_CPM_FEE" | "PARTNER_COST_FEE_TYPE_MEDIA_FEE" | (string & {});
  /** The CPM fee amount in micros of advertiser's currency. Applicable when the fee_type is `PARTNER_FEE_TYPE_CPM_FEE`. Must be greater than or equal to 0. For example, for 1.5 standard unit of the advertiser's currency, set this field to 1500000. */
  feeAmount?: string;
  /** The media fee percentage in millis (1/1000 of a percent). Applicable when the fee_type is `PARTNER_FEE_TYPE_MEDIA_FEE`. Must be greater than or equal to 0. For example: 100 represents 0.1%. */
  feePercentageMillis?: string;
  /** The invoice type for this partner cost. * Required when cost_type is one of: - `PARTNER_COST_TYPE_ADLOOX` - `PARTNER_COST_TYPE_DOUBLE_VERIFY` - `PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE`. * Output only for other types. */
  invoiceType?: "PARTNER_COST_INVOICE_TYPE_UNSPECIFIED" | "PARTNER_COST_INVOICE_TYPE_DV360" | "PARTNER_COST_INVOICE_TYPE_PARTNER" | (string & {});
}

export const PartnerCost: Schema.Schema<PartnerCost> = Schema.suspend(() => Schema.Struct({
  costType: Schema.optional(Schema.String),
  feeType: Schema.optional(Schema.String),
  feeAmount: Schema.optional(Schema.String),
  feePercentageMillis: Schema.optional(Schema.String),
  invoiceType: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerCost" }) as any as Schema.Schema<PartnerCost>;

export interface Pacing {
  /** Required. The time period in which the pacing budget will be spent. When automatic budget allocation is enabled at the insertion order via automationType, this field is output only and defaults to `PACING_PERIOD_FLIGHT`. */
  pacingPeriod?: "PACING_PERIOD_UNSPECIFIED" | "PACING_PERIOD_DAILY" | "PACING_PERIOD_FLIGHT" | (string & {});
  /** Required. The type of pacing that defines how the budget amount will be spent across the pacing_period. `PACING_TYPE_ASAP` is not compatible with pacing_period `PACING_PERIOD_FLIGHT` for insertion orders. */
  pacingType?: "PACING_TYPE_UNSPECIFIED" | "PACING_TYPE_AHEAD" | "PACING_TYPE_ASAP" | "PACING_TYPE_EVEN" | (string & {});
  /** Maximum currency amount to spend every day in micros of advertiser's currency. Applicable when the budget is currency based. Must be greater than 0. For example, for 1.5 standard unit of the currency, set this field to 1500000. The value assigned will be rounded to whole billable units for the relevant currency by the following rules: any positive value less than a single billable unit will be rounded up to one billable unit and any value larger than a single billable unit will be rounded down to the nearest billable value. For example, if the currency's billable unit is 0.01, and this field is set to 10257770, it will round down to 10250000, a value of 10.25. If set to 505, it will round up to 10000, a value of 0.01. */
  dailyMaxMicros?: string;
  /** Maximum number of impressions to serve every day. Applicable when the budget is impression based. Must be greater than 0. */
  dailyMaxImpressions?: string;
}

export const Pacing: Schema.Schema<Pacing> = Schema.suspend(() => Schema.Struct({
  pacingPeriod: Schema.optional(Schema.String),
  pacingType: Schema.optional(Schema.String),
  dailyMaxMicros: Schema.optional(Schema.String),
  dailyMaxImpressions: Schema.optional(Schema.String),
})).annotate({ identifier: "Pacing" }) as any as Schema.Schema<Pacing>;

export interface Kpi {
  /** Required. The type of KPI. */
  kpiType?: "KPI_TYPE_UNSPECIFIED" | "KPI_TYPE_CPM" | "KPI_TYPE_CPC" | "KPI_TYPE_CPA" | "KPI_TYPE_CTR" | "KPI_TYPE_VIEWABILITY" | "KPI_TYPE_CPIAVC" | "KPI_TYPE_CPE" | "KPI_TYPE_CPV" | "KPI_TYPE_CLICK_CVR" | "KPI_TYPE_IMPRESSION_CVR" | "KPI_TYPE_VCPM" | "KPI_TYPE_VTR" | "KPI_TYPE_AUDIO_COMPLETION_RATE" | "KPI_TYPE_VIDEO_COMPLETION_RATE" | "KPI_TYPE_CPCL" | "KPI_TYPE_CPCV" | "KPI_TYPE_TOS10" | "KPI_TYPE_MAXIMIZE_PACING" | "KPI_TYPE_CUSTOM_IMPRESSION_VALUE_OVER_COST" | "KPI_TYPE_OTHER" | (string & {});
  /** The goal amount, in micros of the advertiser's currency. Applicable when kpi_type is one of: * `KPI_TYPE_CPM` * `KPI_TYPE_CPC` * `KPI_TYPE_CPA` * `KPI_TYPE_CPIAVC` * `KPI_TYPE_VCPM` For example: 1500000 represents 1.5 standard units of the currency. */
  kpiAmountMicros?: string;
  /** The decimal representation of the goal percentage in micros. Applicable when kpi_type is one of: * `KPI_TYPE_CTR` * `KPI_TYPE_VIEWABILITY` * `KPI_TYPE_CLICK_CVR` * `KPI_TYPE_IMPRESSION_CVR` * `KPI_TYPE_VTR` * `KPI_TYPE_AUDIO_COMPLETION_RATE` * `KPI_TYPE_VIDEO_COMPLETION_RATE` For example: 70000 represents 7% (decimal 0.07). */
  kpiPercentageMicros?: string;
  /** A KPI string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when kpi_type is `KPI_TYPE_OTHER`. */
  kpiString?: string;
  /** Optional. Custom Bidding Algorithm ID associated with KPI_CUSTOM_IMPRESSION_VALUE_OVER_COST. This field is ignored if the proper KPI is not selected. */
  kpiAlgorithmId?: string;
}

export const Kpi: Schema.Schema<Kpi> = Schema.suspend(() => Schema.Struct({
  kpiType: Schema.optional(Schema.String),
  kpiAmountMicros: Schema.optional(Schema.String),
  kpiPercentageMicros: Schema.optional(Schema.String),
  kpiString: Schema.optional(Schema.String),
  kpiAlgorithmId: Schema.optional(Schema.String),
})).annotate({ identifier: "Kpi" }) as any as Schema.Schema<Kpi>;

export interface InsertionOrderBudgetSegment {
  /** Required. The budget amount the insertion order will spend for the given date_range. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency. */
  budgetAmountMicros?: string;
  /** Optional. The budget segment description. It can be used to enter Purchase Order information for each budget segment and have that information printed on the invoices. Must be UTF-8 encoded. */
  description?: string;
  /** Required. The start and end date settings of the budget segment. They are resolved relative to the parent advertiser's time zone. * When creating a new budget segment, both `start_date` and `end_date` must be in the future. * An existing budget segment with a `start_date` in the past has a mutable `end_date` but an immutable `start_date`. * `end_date` must be the `start_date` or later, both before the year 2037. */
  dateRange?: DateRange;
  /** Optional. The budget_id of the campaign budget that this insertion order budget segment is a part of. */
  campaignBudgetId?: string;
}

export const InsertionOrderBudgetSegment: Schema.Schema<InsertionOrderBudgetSegment> = Schema.suspend(() => Schema.Struct({
  budgetAmountMicros: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dateRange: Schema.optional(DateRange),
  campaignBudgetId: Schema.optional(Schema.String),
})).annotate({ identifier: "InsertionOrderBudgetSegment" }) as any as Schema.Schema<InsertionOrderBudgetSegment>;

export interface InsertionOrderBudget {
  /** Required. Immutable. The budget unit specifies whether the budget is currency based or impression based. */
  budgetUnit?: "BUDGET_UNIT_UNSPECIFIED" | "BUDGET_UNIT_CURRENCY" | "BUDGET_UNIT_IMPRESSIONS" | (string & {});
  /** Optional. The type of automation used to manage bid and budget for the insertion order. If this field is unspecified in creation, the value defaults to `INSERTION_ORDER_AUTOMATION_TYPE_NONE`. */
  automationType?: "INSERTION_ORDER_AUTOMATION_TYPE_UNSPECIFIED" | "INSERTION_ORDER_AUTOMATION_TYPE_BUDGET" | "INSERTION_ORDER_AUTOMATION_TYPE_NONE" | "INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET" | (string & {});
  /** Required. The list of budget segments. Use a budget segment to specify a specific budget for a given period of time an insertion order is running. */
  budgetSegments?: Array<InsertionOrderBudgetSegment>;
}

export const InsertionOrderBudget: Schema.Schema<InsertionOrderBudget> = Schema.suspend(() => Schema.Struct({
  budgetUnit: Schema.optional(Schema.String),
  automationType: Schema.optional(Schema.String),
  budgetSegments: Schema.optional(Schema.Array(InsertionOrderBudgetSegment)),
})).annotate({ identifier: "InsertionOrderBudget" }) as any as Schema.Schema<InsertionOrderBudget>;

export interface InsertionOrder {
  /** Output only. The resource name of the insertion order. */
  name?: string;
  /** Output only. The unique ID of the advertiser the insertion order belongs to. */
  advertiserId?: string;
  /** Required. Immutable. The unique ID of the campaign that the insertion order belongs to. */
  campaignId?: string;
  /** Output only. The unique ID of the insertion order. Assigned by the system. */
  insertionOrderId?: string;
  /** Required. The display name of the insertion order. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Optional. The type of insertion order. If this field is unspecified in creation, the value defaults to `RTB`. */
  insertionOrderType?: "INSERTION_ORDER_TYPE_UNSPECIFIED" | "RTB" | "OVER_THE_TOP" | (string & {});
  /** Required. Controls whether or not the insertion order can spend its budget and bid on inventory. * For CreateInsertionOrder method, only `ENTITY_STATUS_DRAFT` is allowed. To activate an insertion order, use UpdateInsertionOrder method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * An insertion order cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * An insertion order cannot be set to `ENTITY_STATUS_ACTIVE` if its parent campaign is not active. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. The timestamp when the insertion order was last updated. Assigned by the system. */
  updateTime?: string;
  /** Optional. The partner costs associated with the insertion order. If absent or empty in CreateInsertionOrder method, the newly created insertion order will inherit partner costs from the partner settings. */
  partnerCosts?: Array<PartnerCost>;
  /** Required. The budget spending speed setting of the insertion order. pacing_type `PACING_TYPE_ASAP` is not compatible with pacing_period `PACING_PERIOD_FLIGHT`. */
  pacing?: Pacing;
  /** Required. The frequency capping setting of the insertion order. */
  frequencyCap?: FrequencyCap;
  /** Optional. Additional integration details of the insertion order. */
  integrationDetails?: IntegrationDetails;
  /** Required. The key performance indicator (KPI) of the insertion order. This is represented as referred to as the "Goal" in the Display & Video 360 interface. */
  kpi?: Kpi;
  /** Required. The budget allocation settings of the insertion order. */
  budget?: InsertionOrderBudget;
  /** Optional. The bidding strategy of the insertion order. By default, fixed_bid is set. If the budget field automationType is set to `INSERTION_ORDER_AUTOMATION_TYPE_BUDGET` or `INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET`, the insertion order will impose this bidding strategy on its line items. If an imposed bidding strategy is not compatible with a line item's enableOptimizedTargeting setting, the optimized targeting setting will be updated. */
  bidStrategy?: BiddingStrategy;
  /** Output only. The reservation type of the insertion order. */
  reservationType?: "RESERVATION_TYPE_UNSPECIFIED" | "RESERVATION_TYPE_NOT_GUARANTEED" | "RESERVATION_TYPE_PROGRAMMATIC_GUARANTEED" | "RESERVATION_TYPE_TAG_GUARANTEED" | "RESERVATION_TYPE_PETRA_VIRAL" | "RESERVATION_TYPE_INSTANT_RESERVE" | (string & {});
  /** Optional. Required. The optimization objective of the insertion order. */
  optimizationObjective?: "OPTIMIZATION_OBJECTIVE_UNSPECIFIED" | "CONVERSION" | "CLICK" | "BRAND_AWARENESS" | "CUSTOM" | "NO_OBJECTIVE" | (string & {});
}

export const InsertionOrder: Schema.Schema<InsertionOrder> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  insertionOrderId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  insertionOrderType: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  partnerCosts: Schema.optional(Schema.Array(PartnerCost)),
  pacing: Schema.optional(Pacing),
  frequencyCap: Schema.optional(FrequencyCap),
  integrationDetails: Schema.optional(IntegrationDetails),
  kpi: Schema.optional(Kpi),
  budget: Schema.optional(InsertionOrderBudget),
  bidStrategy: Schema.optional(BiddingStrategy),
  reservationType: Schema.optional(Schema.String),
  optimizationObjective: Schema.optional(Schema.String),
})).annotate({ identifier: "InsertionOrder" }) as any as Schema.Schema<InsertionOrder>;

export interface ListInsertionOrdersResponse {
  /** The list of insertion orders. This list will be absent if empty. */
  insertionOrders?: Array<InsertionOrder>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInsertionOrders` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListInsertionOrdersResponse: Schema.Schema<ListInsertionOrdersResponse> = Schema.suspend(() => Schema.Struct({
  insertionOrders: Schema.optional(Schema.Array(InsertionOrder)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInsertionOrdersResponse" }) as any as Schema.Schema<ListInsertionOrdersResponse>;

export interface InventorySourceGroup {
  /** Output only. The resource name of the inventory source group. */
  name?: string;
  /** Output only. The unique ID of the inventory source group. Assigned by the system. */
  inventorySourceGroupId?: string;
  /** Required. The display name of the inventory source group. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
}

export const InventorySourceGroup: Schema.Schema<InventorySourceGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  inventorySourceGroupId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "InventorySourceGroup" }) as any as Schema.Schema<InventorySourceGroup>;

export interface ListInventorySourceGroupsResponse {
  /** The list of inventory source groups. This list will be absent if empty. */
  inventorySourceGroups?: Array<InventorySourceGroup>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInventorySourceGroups` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListInventorySourceGroupsResponse: Schema.Schema<ListInventorySourceGroupsResponse> = Schema.suspend(() => Schema.Struct({
  inventorySourceGroups: Schema.optional(Schema.Array(InventorySourceGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInventorySourceGroupsResponse" }) as any as Schema.Schema<ListInventorySourceGroupsResponse>;

export interface InventorySourceStatus {
  /** Whether or not the inventory source is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** The user-provided reason for pausing this inventory source. Must not exceed 100 characters. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`. */
  entityPauseReason?: string;
  /** Output only. The status set by the seller for the inventory source. Only applicable for inventory sources synced directly from the publishers. Acceptable values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_PAUSED`. */
  sellerStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. The seller-provided reason for pausing this inventory source. Only applicable for inventory sources synced directly from the publishers and when seller_status is set to `ENTITY_STATUS_PAUSED`. */
  sellerPauseReason?: string;
  /** Output only. The configuration status of the inventory source. Only applicable for guaranteed inventory sources. Acceptable values are `INVENTORY_SOURCE_CONFIG_STATUS_PENDING` and `INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED`. An inventory source must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve. */
  configStatus?: "INVENTORY_SOURCE_CONFIG_STATUS_UNSPECIFIED" | "INVENTORY_SOURCE_CONFIG_STATUS_PENDING" | "INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED" | (string & {});
}

export const InventorySourceStatus: Schema.Schema<InventorySourceStatus> = Schema.suspend(() => Schema.Struct({
  entityStatus: Schema.optional(Schema.String),
  entityPauseReason: Schema.optional(Schema.String),
  sellerStatus: Schema.optional(Schema.String),
  sellerPauseReason: Schema.optional(Schema.String),
  configStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "InventorySourceStatus" }) as any as Schema.Schema<InventorySourceStatus>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface RateDetails {
  /** The rate type. Acceptable values are `INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED`, `INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR`, and `INVENTORY_SOURCE_RATE_TYPE_CPD`. */
  inventorySourceRateType?: "INVENTORY_SOURCE_RATE_TYPE_UNSPECIFIED" | "INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED" | "INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR" | "INVENTORY_SOURCE_RATE_TYPE_CPD" | "INVENTORY_SOURCE_RATE_TYPE_CPH" | "INVENTORY_SOURCE_RATE_TYPE_FLAT" | (string & {});
  /** The rate for the inventory source. */
  rate?: Money;
  /** Required for guaranteed inventory sources. The number of impressions guaranteed by the seller. */
  unitsPurchased?: string;
  /** Output only. The amount that the buyer has committed to spending on the inventory source up front. Only applicable for guaranteed inventory sources. */
  minimumSpend?: Money;
}

export const RateDetails: Schema.Schema<RateDetails> = Schema.suspend(() => Schema.Struct({
  inventorySourceRateType: Schema.optional(Schema.String),
  rate: Schema.optional(Money),
  unitsPurchased: Schema.optional(Schema.String),
  minimumSpend: Schema.optional(Money),
})).annotate({ identifier: "RateDetails" }) as any as Schema.Schema<RateDetails>;

export interface TimeRange {
  /** Required. The lower bound of a time range, inclusive. */
  startTime?: string;
  /** Required. The upper bound of a time range, inclusive. */
  endTime?: string;
}

export const TimeRange: Schema.Schema<TimeRange> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeRange" }) as any as Schema.Schema<TimeRange>;

export interface InventorySourceDisplayCreativeConfig {
  /** The size requirements for display creatives that can be assigned to the inventory source. */
  creativeSize?: Dimensions;
}

export const InventorySourceDisplayCreativeConfig: Schema.Schema<InventorySourceDisplayCreativeConfig> = Schema.suspend(() => Schema.Struct({
  creativeSize: Schema.optional(Dimensions),
})).annotate({ identifier: "InventorySourceDisplayCreativeConfig" }) as any as Schema.Schema<InventorySourceDisplayCreativeConfig>;

export interface InventorySourceVideoCreativeConfig {
  /** The duration requirements for the video creatives that can be assigned to the inventory source. */
  duration?: string;
}

export const InventorySourceVideoCreativeConfig: Schema.Schema<InventorySourceVideoCreativeConfig> = Schema.suspend(() => Schema.Struct({
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "InventorySourceVideoCreativeConfig" }) as any as Schema.Schema<InventorySourceVideoCreativeConfig>;

export interface CreativeConfig {
  /** The type of creative that can be assigned to the inventory source. Only the following types are supported: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_VIDEO` */
  creativeType?: "CREATIVE_TYPE_UNSPECIFIED" | "CREATIVE_TYPE_STANDARD" | "CREATIVE_TYPE_EXPANDABLE" | "CREATIVE_TYPE_VIDEO" | "CREATIVE_TYPE_NATIVE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_SITE_SQUARE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL" | "CREATIVE_TYPE_LIGHTBOX" | "CREATIVE_TYPE_NATIVE_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE" | "CREATIVE_TYPE_AUDIO" | "CREATIVE_TYPE_PUBLISHER_HOSTED" | "CREATIVE_TYPE_NATIVE_VIDEO" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO" | "CREATIVE_TYPE_ASSET_BASED_CREATIVE" | (string & {});
  /** The configuration for display creatives. Applicable when creative_type is `CREATIVE_TYPE_STANDARD`. */
  displayCreativeConfig?: InventorySourceDisplayCreativeConfig;
  /** The configuration for video creatives. Applicable when creative_type is `CREATIVE_TYPE_VIDEO`. */
  videoCreativeConfig?: InventorySourceVideoCreativeConfig;
}

export const CreativeConfig: Schema.Schema<CreativeConfig> = Schema.suspend(() => Schema.Struct({
  creativeType: Schema.optional(Schema.String),
  displayCreativeConfig: Schema.optional(InventorySourceDisplayCreativeConfig),
  videoCreativeConfig: Schema.optional(InventorySourceVideoCreativeConfig),
})).annotate({ identifier: "CreativeConfig" }) as any as Schema.Schema<CreativeConfig>;

export interface InventorySourceAccessorsPartnerAccessor {
  /** The ID of the partner. */
  partnerId?: string;
}

export const InventorySourceAccessorsPartnerAccessor: Schema.Schema<InventorySourceAccessorsPartnerAccessor> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
})).annotate({ identifier: "InventorySourceAccessorsPartnerAccessor" }) as any as Schema.Schema<InventorySourceAccessorsPartnerAccessor>;

export interface InventorySourceAccessorsAdvertiserAccessors {
  /** The IDs of the advertisers. */
  advertiserIds?: Array<string>;
}

export const InventorySourceAccessorsAdvertiserAccessors: Schema.Schema<InventorySourceAccessorsAdvertiserAccessors> = Schema.suspend(() => Schema.Struct({
  advertiserIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InventorySourceAccessorsAdvertiserAccessors" }) as any as Schema.Schema<InventorySourceAccessorsAdvertiserAccessors>;

export interface InventorySourceAccessors {
  /** The partner with access to the inventory source. */
  partner?: InventorySourceAccessorsPartnerAccessor;
  /** The advertisers with access to the inventory source. All advertisers must belong to the same partner. */
  advertisers?: InventorySourceAccessorsAdvertiserAccessors;
}

export const InventorySourceAccessors: Schema.Schema<InventorySourceAccessors> = Schema.suspend(() => Schema.Struct({
  partner: Schema.optional(InventorySourceAccessorsPartnerAccessor),
  advertisers: Schema.optional(InventorySourceAccessorsAdvertiserAccessors),
})).annotate({ identifier: "InventorySourceAccessors" }) as any as Schema.Schema<InventorySourceAccessors>;

export interface InventorySource {
  /** Output only. The resource name of the inventory source. */
  name?: string;
  /** Output only. The unique ID of the inventory source. Assigned by the system. */
  inventorySourceId?: string;
  /** The display name of the inventory source. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Denotes the type of the inventory source. */
  inventorySourceType?: "INVENTORY_SOURCE_TYPE_UNSPECIFIED" | "INVENTORY_SOURCE_TYPE_PRIVATE" | "INVENTORY_SOURCE_TYPE_AUCTION_PACKAGE" | (string & {});
  /** Output only. The product type of the inventory source, denoting the way through which it sells inventory. */
  inventorySourceProductType?: "INVENTORY_SOURCE_PRODUCT_TYPE_UNSPECIFIED" | "PREFERRED_DEAL" | "PRIVATE_AUCTION" | "PROGRAMMATIC_GUARANTEED" | "TAG_GUARANTEED" | "YOUTUBE_RESERVE" | "INSTANT_RESERVE" | "GUARANTEED_PACKAGE" | "PROGRAMMATIC_TV" | "AUCTION_PACKAGE" | (string & {});
  /** Whether the inventory source has a guaranteed or non-guaranteed delivery. */
  commitment?: "INVENTORY_SOURCE_COMMITMENT_UNSPECIFIED" | "INVENTORY_SOURCE_COMMITMENT_GUARANTEED" | "INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED" | (string & {});
  /** The delivery method of the inventory source. * For non-guaranteed inventory sources, the only acceptable value is `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. * For guaranteed inventory sources, acceptable values are `INVENTORY_SOURCE_DELIVERY_METHOD_TAG` and `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. */
  deliveryMethod?: "INVENTORY_SOURCE_DELIVERY_METHOD_UNSPECIFIED" | "INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC" | "INVENTORY_SOURCE_DELIVERY_METHOD_TAG" | (string & {});
  /** The ID in the exchange space that uniquely identifies the inventory source. Must be unique across buyers within each exchange but not necessarily unique across exchanges. */
  dealId?: string;
  /** The status settings of the inventory source. */
  status?: InventorySourceStatus;
  /** The exchange to which the inventory source belongs. */
  exchange?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
  /** Output only. The timestamp when the inventory source was last updated. Assigned by the system. */
  updateTime?: string;
  /** Required. The rate details of the inventory source. */
  rateDetails?: RateDetails;
  /** The publisher/seller name of the inventory source. */
  publisherName?: string;
  /** The time range when this inventory source starts and stops serving. */
  timeRange?: TimeRange;
  /** The creative requirements of the inventory source. Not applicable for auction packages. */
  creativeConfigs?: Array<CreativeConfig>;
  /** Immutable. The ID of the guaranteed order that this inventory source belongs to. Only applicable when commitment is `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`. */
  guaranteedOrderId?: string;
  /** The partner or advertisers that have read/write access to the inventory source. Output only when commitment is `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`, in which case the read/write accessors are inherited from the parent guaranteed order. Required when commitment is `INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED`. If commitment is `INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED` and a partner is set in this field, all advertisers under this partner will automatically have read-only access to the inventory source. These advertisers will not be included in read_advertiser_ids. */
  readWriteAccessors?: InventorySourceAccessors;
  /** Output only. The IDs of advertisers with read-only access to the inventory source. */
  readAdvertiserIds?: Array<string>;
  /** Output only. The IDs of partners with read-only access to the inventory source. All advertisers of partners in this field inherit read-only access to the inventory source. */
  readPartnerIds?: Array<string>;
}

export const InventorySource: Schema.Schema<InventorySource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  inventorySourceId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  inventorySourceType: Schema.optional(Schema.String),
  inventorySourceProductType: Schema.optional(Schema.String),
  commitment: Schema.optional(Schema.String),
  deliveryMethod: Schema.optional(Schema.String),
  dealId: Schema.optional(Schema.String),
  status: Schema.optional(InventorySourceStatus),
  exchange: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  rateDetails: Schema.optional(RateDetails),
  publisherName: Schema.optional(Schema.String),
  timeRange: Schema.optional(TimeRange),
  creativeConfigs: Schema.optional(Schema.Array(CreativeConfig)),
  guaranteedOrderId: Schema.optional(Schema.String),
  readWriteAccessors: Schema.optional(InventorySourceAccessors),
  readAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
  readPartnerIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InventorySource" }) as any as Schema.Schema<InventorySource>;

export interface ListInventorySourcesResponse {
  /** The list of inventory sources. This list will be absent if empty. */
  inventorySources?: Array<InventorySource>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInventorySources` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListInventorySourcesResponse: Schema.Schema<ListInventorySourcesResponse> = Schema.suspend(() => Schema.Struct({
  inventorySources: Schema.optional(Schema.Array(InventorySource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInventorySourcesResponse" }) as any as Schema.Schema<ListInventorySourcesResponse>;

export interface EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate {
  /** The advertisers to add. */
  addedAdvertisers?: Array<string>;
  /** The advertisers to remove. */
  removedAdvertisers?: Array<string>;
}

export const EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate: Schema.Schema<EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate> = Schema.suspend(() => Schema.Struct({
  addedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
  removedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate" }) as any as Schema.Schema<EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate>;

export interface EditInventorySourceReadWriteAccessorsRequest {
  /** Required. The partner context by which the accessors change is being made. */
  partnerId?: string;
  /** Set the partner context as read/write accessor of the inventory source. This will remove all other current read/write advertiser accessors. */
  assignPartner?: boolean;
  /** The advertisers to add or remove from the list of advertisers that have read/write access to the inventory source. This change will remove an existing partner read/write accessor. */
  advertisersUpdate?: EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate;
}

export const EditInventorySourceReadWriteAccessorsRequest: Schema.Schema<EditInventorySourceReadWriteAccessorsRequest> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
  assignPartner: Schema.optional(Schema.Boolean),
  advertisersUpdate: Schema.optional(EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate),
})).annotate({ identifier: "EditInventorySourceReadWriteAccessorsRequest" }) as any as Schema.Schema<EditInventorySourceReadWriteAccessorsRequest>;

export interface BudgetSummary {
  /** Corresponds to the external_budget_id of a campaign budget. If the value is not set in the campaign budget, this field will be empty. */
  externalBudgetId?: string;
  /** Relevant client, product, and estimate codes from the Mediaocean Prisma tool. Only applicable for campaign budgets with an external_budget_source of EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN. */
  prismaCpeCode?: PrismaCpeCode;
  /** The sum of charges made under this budget before taxes, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  preTaxAmountMicros?: string;
  /** The amount of tax applied to charges under this budget, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  taxAmountMicros?: string;
  /** The total sum of charges made under this budget, including tax, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  totalAmountMicros?: string;
}

export const BudgetSummary: Schema.Schema<BudgetSummary> = Schema.suspend(() => Schema.Struct({
  externalBudgetId: Schema.optional(Schema.String),
  prismaCpeCode: Schema.optional(PrismaCpeCode),
  preTaxAmountMicros: Schema.optional(Schema.String),
  taxAmountMicros: Schema.optional(Schema.String),
  totalAmountMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "BudgetSummary" }) as any as Schema.Schema<BudgetSummary>;

export interface Invoice {
  /** The resource name of the invoice. */
  name?: string;
  /** The unique ID of the invoice. */
  invoiceId?: string;
  /** The display name of the invoice. */
  displayName?: string;
  /** The ID of the payments profile the invoice belongs to. Appears on the invoice PDF as `Billing ID`. */
  paymentsProfileId?: string;
  /** The ID of the payments account the invoice belongs to. Appears on the invoice PDF as `Billing Account Number`. */
  paymentsAccountId?: string;
  /** The date when the invoice was issued. */
  issueDate?: Displayvideo_Date;
  /** The date when the invoice is due. */
  dueDate?: Displayvideo_Date;
  /** The service start and end dates which are covered by this invoice. */
  serviceDateRange?: DateRange;
  /** The currency used in the invoice in ISO 4217 format. */
  currencyCode?: string;
  /** The pre-tax subtotal amount, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  subtotalAmountMicros?: string;
  /** The sum of all taxes in invoice, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  totalTaxAmountMicros?: string;
  /** The invoice total amount, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  totalAmountMicros?: string;
  /** Purchase order number associated with the invoice. */
  purchaseOrderNumber?: string;
  /** The budget grouping ID for this invoice. This field will only be set if the invoice level of the corresponding billing profile was set to "Budget invoice grouping ID". */
  budgetInvoiceGroupingId?: string;
  /** The type of invoice document. */
  invoiceType?: "INVOICE_TYPE_UNSPECIFIED" | "INVOICE_TYPE_CREDIT" | "INVOICE_TYPE_INVOICE" | (string & {});
  /** The ID of the original invoice being adjusted by this invoice, if applicable. May appear on the invoice PDF as `Reference invoice number`. If replaced_invoice_ids is set, this field will be empty. */
  correctedInvoiceId?: string;
  /** The ID(s) of any originally issued invoice that is being cancelled by this invoice, if applicable. Multiple invoices may be listed if those invoices are being consolidated into a single invoice. May appear on invoice PDF as `Replaced invoice numbers`. If corrected_invoice_id is set, this field will be empty. */
  replacedInvoiceIds?: Array<string>;
  /** The URL to download a PDF copy of the invoice. This URL is user specific and requires a valid OAuth 2.0 access token to access. The access token must be provided in an `Authorization: Bearer` HTTP header and be authorized for one of the following scopes: * `https://www.googleapis.com/auth/display-video-mediaplanning` * `https://www.googleapis.com/auth/display-video` The URL will be valid for 7 days after retrieval of this invoice object or until this invoice is retrieved again. */
  pdfUrl?: string;
  /** The list of summarized information for each budget associated with this invoice. This field will only be set if the invoice detail level of the corresponding billing profile was set to "Budget level PO". */
  budgetSummaries?: Array<BudgetSummary>;
  /** The total amount of costs or adjustments not tied to a particular budget, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  nonBudgetMicros?: string;
}

export const Invoice: Schema.Schema<Invoice> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  invoiceId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  paymentsProfileId: Schema.optional(Schema.String),
  paymentsAccountId: Schema.optional(Schema.String),
  issueDate: Schema.optional(Displayvideo_Date),
  dueDate: Schema.optional(Displayvideo_Date),
  serviceDateRange: Schema.optional(DateRange),
  currencyCode: Schema.optional(Schema.String),
  subtotalAmountMicros: Schema.optional(Schema.String),
  totalTaxAmountMicros: Schema.optional(Schema.String),
  totalAmountMicros: Schema.optional(Schema.String),
  purchaseOrderNumber: Schema.optional(Schema.String),
  budgetInvoiceGroupingId: Schema.optional(Schema.String),
  invoiceType: Schema.optional(Schema.String),
  correctedInvoiceId: Schema.optional(Schema.String),
  replacedInvoiceIds: Schema.optional(Schema.Array(Schema.String)),
  pdfUrl: Schema.optional(Schema.String),
  budgetSummaries: Schema.optional(Schema.Array(BudgetSummary)),
  nonBudgetMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "Invoice" }) as any as Schema.Schema<Invoice>;

export interface ListInvoicesResponse {
  /** The list of invoices. This list will be absent if empty. */
  invoices?: Array<Invoice>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInvoices` method to retrieve the next page of results. This token will be absent if there are no more invoices to return. */
  nextPageToken?: string;
}

export const ListInvoicesResponse: Schema.Schema<ListInvoicesResponse> = Schema.suspend(() => Schema.Struct({
  invoices: Schema.optional(Schema.Array(Invoice)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInvoicesResponse" }) as any as Schema.Schema<ListInvoicesResponse>;

export interface LookupInvoiceCurrencyResponse {
  /** Currency used by the advertiser in ISO 4217 format. */
  currencyCode?: string;
}

export const LookupInvoiceCurrencyResponse: Schema.Schema<LookupInvoiceCurrencyResponse> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupInvoiceCurrencyResponse" }) as any as Schema.Schema<LookupInvoiceCurrencyResponse>;

export interface LineItemFlight {
  /** Required. The type of the line item's flight dates. */
  flightDateType?: "LINE_ITEM_FLIGHT_DATE_TYPE_UNSPECIFIED" | "LINE_ITEM_FLIGHT_DATE_TYPE_INHERITED" | "LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM" | (string & {});
  /** The flight start and end dates of the line item. They are resolved relative to the parent advertiser's time zone. * Required when flight_date_type is `LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM`. Output only otherwise. * When creating a new flight, both `start_date` and `end_date` must be in the future. * An existing flight with a `start_date` in the past has a mutable `end_date` but an immutable `start_date`. * `end_date` must be the `start_date` or later, both before the year 2037. */
  dateRange?: DateRange;
}

export const LineItemFlight: Schema.Schema<LineItemFlight> = Schema.suspend(() => Schema.Struct({
  flightDateType: Schema.optional(Schema.String),
  dateRange: Schema.optional(DateRange),
})).annotate({ identifier: "LineItemFlight" }) as any as Schema.Schema<LineItemFlight>;

export interface LineItemBudget {
  /** Required. The type of the budget allocation. `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC` is only applicable when automatic budget allocation is enabled for the parent insertion order. */
  budgetAllocationType?: "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNSPECIFIED" | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC" | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED" | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED" | (string & {});
  /** Output only. The budget unit specifies whether the budget is currency based or impression based. This value is inherited from the parent insertion order. */
  budgetUnit?: "BUDGET_UNIT_UNSPECIFIED" | "BUDGET_UNIT_CURRENCY" | "BUDGET_UNIT_IMPRESSIONS" | (string & {});
  /** The maximum budget amount the line item will spend. Must be greater than 0. When budget_allocation_type is: * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC`, this field is immutable and is set by the system. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`, if budget_unit is: - `BUDGET_UNIT_CURRENCY`, this field represents maximum budget amount to spend, in micros of the advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. - `BUDGET_UNIT_IMPRESSIONS`, this field represents the maximum number of impressions to serve. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED`, this field is not applicable and will be ignored by the system. */
  maxAmount?: string;
}

export const LineItemBudget: Schema.Schema<LineItemBudget> = Schema.suspend(() => Schema.Struct({
  budgetAllocationType: Schema.optional(Schema.String),
  budgetUnit: Schema.optional(Schema.String),
  maxAmount: Schema.optional(Schema.String),
})).annotate({ identifier: "LineItemBudget" }) as any as Schema.Schema<LineItemBudget>;

export interface PartnerRevenueModel {
  /** Required. The markup type of the partner revenue model. */
  markupType?: "PARTNER_REVENUE_MODEL_MARKUP_TYPE_UNSPECIFIED" | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM" | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP" | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP" | (string & {});
  /** Required. The markup amount of the partner revenue model. Must be greater than or equal to 0. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`, this field represents the CPM markup in micros of advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP`, this field represents the media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`, this field represents the total media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). */
  markupAmount?: string;
}

export const PartnerRevenueModel: Schema.Schema<PartnerRevenueModel> = Schema.suspend(() => Schema.Struct({
  markupType: Schema.optional(Schema.String),
  markupAmount: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerRevenueModel" }) as any as Schema.Schema<PartnerRevenueModel>;

export interface TrackingFloodlightActivityConfig {
  /** Required. The ID of the Floodlight activity. */
  floodlightActivityId?: string;
  /** Required. The number of days after an ad has been clicked in which a conversion may be counted. Must be between 0 and 90 inclusive. */
  postClickLookbackWindowDays?: number;
  /** Required. The number of days after an ad has been viewed in which a conversion may be counted. Must be between 0 and 90 inclusive. */
  postViewLookbackWindowDays?: number;
}

export const TrackingFloodlightActivityConfig: Schema.Schema<TrackingFloodlightActivityConfig> = Schema.suspend(() => Schema.Struct({
  floodlightActivityId: Schema.optional(Schema.String),
  postClickLookbackWindowDays: Schema.optional(Schema.Number),
  postViewLookbackWindowDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "TrackingFloodlightActivityConfig" }) as any as Schema.Schema<TrackingFloodlightActivityConfig>;

export interface ConversionCountingConfig {
  /** The percentage of post-view conversions to count, in millis (1/1000 of a percent). Must be between 0 and 100000 inclusive. For example, to track 50% of the post-click conversions, set a value of 50000. */
  postViewCountPercentageMillis?: string;
  /** The Floodlight activity configs used to track conversions. The number of conversions counted is the sum of all of the conversions counted by all of the Floodlight activity IDs specified in this field. This field can't be updated if a custom bidding algorithm is assigned to the line item. If you set this field and assign a custom bidding algorithm in the same request, the floodlight activities must match the ones used by the custom bidding algorithm. */
  floodlightActivityConfigs?: Array<TrackingFloodlightActivityConfig>;
}

export const ConversionCountingConfig: Schema.Schema<ConversionCountingConfig> = Schema.suspend(() => Schema.Struct({
  postViewCountPercentageMillis: Schema.optional(Schema.String),
  floodlightActivityConfigs: Schema.optional(Schema.Array(TrackingFloodlightActivityConfig)),
})).annotate({ identifier: "ConversionCountingConfig" }) as any as Schema.Schema<ConversionCountingConfig>;

export interface MobileApp {
  /** Required. The ID of the app provided by the platform store. Android apps are identified by the bundle ID used by Android's Play store, such as `com.google.android.gm`. iOS apps are identified by a nine-digit app ID used by Apple's App store, such as `422689480`. */
  appId?: string;
  /** Output only. The app platform. */
  platform?: "PLATFORM_UNSPECIFIED" | "IOS" | "ANDROID" | (string & {});
  /** Output only. The app name. */
  displayName?: string;
  /** Output only. The app publisher. */
  publisher?: string;
}

export const MobileApp: Schema.Schema<MobileApp> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  publisher: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileApp" }) as any as Schema.Schema<MobileApp>;

export interface ThirdPartyVendorConfig {
  /** The third-party measurement vendor. */
  vendor?: "THIRD_PARTY_VENDOR_UNSPECIFIED" | "THIRD_PARTY_VENDOR_MOAT" | "THIRD_PARTY_VENDOR_DOUBLE_VERIFY" | "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE" | "THIRD_PARTY_VENDOR_COMSCORE" | "THIRD_PARTY_VENDOR_TELEMETRY" | "THIRD_PARTY_VENDOR_MEETRICS" | "THIRD_PARTY_VENDOR_ZEFR" | "THIRD_PARTY_VENDOR_NIELSEN" | "THIRD_PARTY_VENDOR_KANTAR" | "THIRD_PARTY_VENDOR_DYNATA" | "THIRD_PARTY_VENDOR_TRANSUNION" | (string & {});
  /** The ID used by the platform of the third-party vendor to identify the line item. */
  placementId?: string;
}

export const ThirdPartyVendorConfig: Schema.Schema<ThirdPartyVendorConfig> = Schema.suspend(() => Schema.Struct({
  vendor: Schema.optional(Schema.String),
  placementId: Schema.optional(Schema.String),
})).annotate({ identifier: "ThirdPartyVendorConfig" }) as any as Schema.Schema<ThirdPartyVendorConfig>;

export interface ThirdPartyMeasurementConfigs {
  /** Optional. The third-party vendors measuring viewability. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS` * `THIRD_PARTY_VENDOR_GOOGLE_INTERNAL` */
  viewabilityVendorConfigs?: Array<ThirdPartyVendorConfig>;
  /** Optional. The third-party vendors measuring brand safety. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_ZERF` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_GOOGLE_INTERNAL` * `THIRD_PARTY_VENDOR_ZEFR` */
  brandSafetyVendorConfigs?: Array<ThirdPartyVendorConfig>;
  /** Optional. The third-party vendors measuring reach. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_GOOGLE_INTERNAL` * `THIRD_PARTY_VENDOR_KANTAR_MILLWARD_BROWN` * `THIRD_PARTY_VENDOR_VIDEO_RESEARCH` * `THIRD_PARTY_VENDOR_MEDIA_SCOPE` * `THIRD_PARTY_VENDOR_AUDIENCE_PROJECT` * `THIRD_PARTY_VENDOR_VIDEO_AMP` * `THIRD_PARTY_VENDOR_ISPOT_TV` */
  reachVendorConfigs?: Array<ThirdPartyVendorConfig>;
  /** Optional. The third-party vendors measuring brand lift. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_KANTAR_MILLWARD_BROWN` * `THIRD_PARTY_VENDOR_GOOGLE_INTERNAL` * `THIRD_PARTY_VENDOR_INTAGE` * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_MACROMILL` */
  brandLiftVendorConfigs?: Array<ThirdPartyVendorConfig>;
}

export const ThirdPartyMeasurementConfigs: Schema.Schema<ThirdPartyMeasurementConfigs> = Schema.suspend(() => Schema.Struct({
  viewabilityVendorConfigs: Schema.optional(Schema.Array(ThirdPartyVendorConfig)),
  brandSafetyVendorConfigs: Schema.optional(Schema.Array(ThirdPartyVendorConfig)),
  reachVendorConfigs: Schema.optional(Schema.Array(ThirdPartyVendorConfig)),
  brandLiftVendorConfigs: Schema.optional(Schema.Array(ThirdPartyVendorConfig)),
})).annotate({ identifier: "ThirdPartyMeasurementConfigs" }) as any as Schema.Schema<ThirdPartyMeasurementConfigs>;

export interface YoutubeAndPartnersInventorySourceConfig {
  /** Optional. Whether to target inventory on YouTube. This includes both search, channels and videos. */
  includeYoutube?: boolean;
  /** Optional. Whether to target inventory in video apps available with Google TV. */
  includeGoogleTv?: boolean;
  /** Whether to target inventory on a collection of partner sites and apps that follow the same brand safety standards as YouTube. */
  includeYoutubeVideoPartners?: boolean;
}

export const YoutubeAndPartnersInventorySourceConfig: Schema.Schema<YoutubeAndPartnersInventorySourceConfig> = Schema.suspend(() => Schema.Struct({
  includeYoutube: Schema.optional(Schema.Boolean),
  includeGoogleTv: Schema.optional(Schema.Boolean),
  includeYoutubeVideoPartners: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "YoutubeAndPartnersInventorySourceConfig" }) as any as Schema.Schema<YoutubeAndPartnersInventorySourceConfig>;

export interface TargetFrequency {
  /** The target number of times, on average, the ads will be shown to the same person in the timespan dictated by time_unit and time_unit_count. */
  targetCount?: string;
  /** The unit of time in which the target frequency will be applied. The following time unit is applicable: * `TIME_UNIT_WEEKS` */
  timeUnit?: "TIME_UNIT_UNSPECIFIED" | "TIME_UNIT_LIFETIME" | "TIME_UNIT_MONTHS" | "TIME_UNIT_WEEKS" | "TIME_UNIT_DAYS" | "TIME_UNIT_HOURS" | "TIME_UNIT_MINUTES" | (string & {});
  /** The number of time_unit the target frequency will last. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_WEEKS` - must be 1 */
  timeUnitCount?: number;
}

export const TargetFrequency: Schema.Schema<TargetFrequency> = Schema.suspend(() => Schema.Struct({
  targetCount: Schema.optional(Schema.String),
  timeUnit: Schema.optional(Schema.String),
  timeUnitCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "TargetFrequency" }) as any as Schema.Schema<TargetFrequency>;

export interface VideoAdSequenceStep {
  /** The ID of the step. */
  stepId?: string;
  /** The ID of the corresponding ad group of the step. */
  adGroupId?: string;
  /** The ID of the previous step. The first step does not have previous step. */
  previousStepId?: string;
  /** The interaction on the previous step that will lead the viewer to this step. The first step does not have interaction_type. */
  interactionType?: "INTERACTION_TYPE_UNSPECIFIED" | "INTERACTION_TYPE_PAID_VIEW" | "INTERACTION_TYPE_SKIP" | "INTERACTION_TYPE_IMPRESSION" | "INTERACTION_TYPE_ENGAGED_IMPRESSION" | (string & {});
}

export const VideoAdSequenceStep: Schema.Schema<VideoAdSequenceStep> = Schema.suspend(() => Schema.Struct({
  stepId: Schema.optional(Schema.String),
  adGroupId: Schema.optional(Schema.String),
  previousStepId: Schema.optional(Schema.String),
  interactionType: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoAdSequenceStep" }) as any as Schema.Schema<VideoAdSequenceStep>;

export interface VideoAdSequenceSettings {
  /** The minimum time interval before the same user sees this sequence again. */
  minimumDuration?: "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_UNSPECIFIED" | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_WEEK" | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_MONTH" | (string & {});
  /** The steps of which the sequence consists. */
  steps?: Array<VideoAdSequenceStep>;
}

export const VideoAdSequenceSettings: Schema.Schema<VideoAdSequenceSettings> = Schema.suspend(() => Schema.Struct({
  minimumDuration: Schema.optional(Schema.String),
  steps: Schema.optional(Schema.Array(VideoAdSequenceStep)),
})).annotate({ identifier: "VideoAdSequenceSettings" }) as any as Schema.Schema<VideoAdSequenceSettings>;

export interface VideoAdInventoryControl {
  /** Optional. Whether ads can serve as in-stream format. */
  allowInStream?: boolean;
  /** Optional. Whether ads can serve as in-feed format. */
  allowInFeed?: boolean;
  /** Optional. Whether ads can serve as shorts format. */
  allowShorts?: boolean;
}

export const VideoAdInventoryControl: Schema.Schema<VideoAdInventoryControl> = Schema.suspend(() => Schema.Struct({
  allowInStream: Schema.optional(Schema.Boolean),
  allowInFeed: Schema.optional(Schema.Boolean),
  allowShorts: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "VideoAdInventoryControl" }) as any as Schema.Schema<VideoAdInventoryControl>;

export interface YoutubeAndPartnersSettings {
  /** The view frequency cap settings of the line item. The max_views field in this settings object must be used if assigning a limited cap. */
  viewFrequencyCap?: FrequencyCap;
  /** Optional. The third-party measurement configs of the line item. */
  thirdPartyMeasurementConfigs?: ThirdPartyMeasurementConfigs;
  /** Settings that control what YouTube and Partners inventories the line item will target. */
  inventorySourceSettings?: YoutubeAndPartnersInventorySourceConfig;
  /** Output only. The kind of content on which the YouTube and Partners ads will be shown. *Warning*: This field will be removed in the near future. Use effective_content_category instead. */
  contentCategory?: "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED" | (string & {});
  /** Output only. The content category which takes effect when serving the line item. When content category is set in both line item and advertiser, the stricter one will take effect when serving the line item. New line items will only inherit the advertiser level setting. */
  effectiveContentCategory?: "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED" | (string & {});
  /** Optional. The average number of times you want ads from this line item to show to the same person over a certain period of time. */
  targetFrequency?: TargetFrequency;
  /** Optional. The ID of the merchant which is linked to the line item for product feed. */
  linkedMerchantId?: string;
  /** Optional. The IDs of the videos appear below the primary video ad when the ad is playing in the YouTube app on mobile devices. */
  relatedVideoIds?: Array<string>;
  /** Optional. The ID of the form to generate leads. */
  leadFormId?: string;
  /** Optional. The settings related to VideoAdSequence. */
  videoAdSequenceSettings?: VideoAdSequenceSettings;
  /** Optional. The settings to control which inventory is allowed for this line item. */
  videoAdInventoryControl?: VideoAdInventoryControl;
}

export const YoutubeAndPartnersSettings: Schema.Schema<YoutubeAndPartnersSettings> = Schema.suspend(() => Schema.Struct({
  viewFrequencyCap: Schema.optional(FrequencyCap),
  thirdPartyMeasurementConfigs: Schema.optional(ThirdPartyMeasurementConfigs),
  inventorySourceSettings: Schema.optional(YoutubeAndPartnersInventorySourceConfig),
  contentCategory: Schema.optional(Schema.String),
  effectiveContentCategory: Schema.optional(Schema.String),
  targetFrequency: Schema.optional(TargetFrequency),
  linkedMerchantId: Schema.optional(Schema.String),
  relatedVideoIds: Schema.optional(Schema.Array(Schema.String)),
  leadFormId: Schema.optional(Schema.String),
  videoAdSequenceSettings: Schema.optional(VideoAdSequenceSettings),
  videoAdInventoryControl: Schema.optional(VideoAdInventoryControl),
})).annotate({ identifier: "YoutubeAndPartnersSettings" }) as any as Schema.Schema<YoutubeAndPartnersSettings>;

export interface LineItem {
  /** Output only. The resource name of the line item. */
  name?: string;
  /** Output only. The unique ID of the advertiser the line item belongs to. */
  advertiserId?: string;
  /** Output only. The unique ID of the campaign that the line item belongs to. */
  campaignId?: string;
  /** Required. Immutable. The unique ID of the insertion order that the line item belongs to. */
  insertionOrderId?: string;
  /** Output only. The unique ID of the line item. Assigned by the system. */
  lineItemId?: string;
  /** Required. The display name of the line item. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Immutable. The type of the line item. */
  lineItemType?: "LINE_ITEM_TYPE_UNSPECIFIED" | "LINE_ITEM_TYPE_DISPLAY_DEFAULT" | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL" | "LINE_ITEM_TYPE_VIDEO_DEFAULT" | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL" | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INVENTORY" | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INVENTORY" | "LINE_ITEM_TYPE_AUDIO_DEFAULT" | "LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_ACTION" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_AUDIO" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_TARGET_FREQUENCY" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIEW" | "LINE_ITEM_TYPE_DISPLAY_OUT_OF_HOME" | "LINE_ITEM_TYPE_VIDEO_OUT_OF_HOME" | (string & {});
  /** Required. Controls whether or not the line item can spend its budget and bid on inventory. * For CreateLineItem method, only `ENTITY_STATUS_DRAFT` is allowed. To activate a line item, use UpdateLineItem method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * A line item cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * If the line item's parent insertion order is not active, the line item can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** Output only. The timestamp when the line item was last updated. Assigned by the system. */
  updateTime?: string;
  /** The partner costs associated with the line item. If absent or empty in CreateLineItem method, the newly created line item will inherit partner costs from its parent insertion order. */
  partnerCosts?: Array<PartnerCost>;
  /** Required. The start and end time of the line item's flight. */
  flight?: LineItemFlight;
  /** Required. The budget allocation setting of the line item. */
  budget?: LineItemBudget;
  /** Required. The budget spending speed setting of the line item. */
  pacing?: Pacing;
  /** Required. The impression frequency cap settings of the line item. The max_impressions field in this settings object must be used if assigning a limited cap. */
  frequencyCap?: FrequencyCap;
  /** Required. The partner revenue model setting of the line item. */
  partnerRevenueModel?: PartnerRevenueModel;
  /** The conversion tracking setting of the line item. */
  conversionCounting?: ConversionCountingConfig;
  /** The IDs of the creatives associated with the line item. */
  creativeIds?: Array<string>;
  /** Required. The bidding strategy of the line item. */
  bidStrategy?: BiddingStrategy;
  /** Integration details of the line item. */
  integrationDetails?: IntegrationDetails;
  /** The [optimized targeting](//support.google.com/displayvideo/answer/12060859) settings of the line item. This config is only applicable for display, video, or audio line items that use automated bidding and positively target eligible audience lists. */
  targetingExpansion?: TargetingExpansionConfig;
  /** Output only. The warning messages generated by the line item. These warnings do not block saving the line item, but some may block the line item from running. */
  warningMessages?: Array<"LINE_ITEM_WARNING_MESSAGE_UNSPECIFIED" | "INVALID_FLIGHT_DATES" | "EXPIRED" | "PENDING_FLIGHT" | "ALL_PARTNER_ENABLED_EXCHANGES_NEGATIVELY_TARGETED" | "INVALID_INVENTORY_SOURCE" | "APP_INVENTORY_INVALID_SITE_TARGETING" | "APP_INVENTORY_INVALID_AUDIENCE_LISTS" | "NO_VALID_CREATIVE" | "PARENT_INSERTION_ORDER_PAUSED" | "PARENT_INSERTION_ORDER_EXPIRED" | (string & {})>;
  /** The mobile app promoted by the line item. This is applicable only when line_item_type is either `LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL` or `LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL`. */
  mobileApp?: MobileApp;
  /** Output only. The reservation type of the line item. */
  reservationType?: "RESERVATION_TYPE_UNSPECIFIED" | "RESERVATION_TYPE_NOT_GUARANTEED" | "RESERVATION_TYPE_PROGRAMMATIC_GUARANTEED" | "RESERVATION_TYPE_TAG_GUARANTEED" | "RESERVATION_TYPE_PETRA_VIRAL" | "RESERVATION_TYPE_INSTANT_RESERVE" | (string & {});
  /** Whether to exclude new exchanges from automatically being targeted by the line item. This field is false by default. */
  excludeNewExchanges?: boolean;
  /** Output only. Settings specific to YouTube and Partners line items. */
  youtubeAndPartnersSettings?: YoutubeAndPartnersSettings;
  /** Whether this line item will serve European Union political ads. If contains_eu_political_ads has been set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` in the parent advertiser, then this field will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. This field can then be updated using the UI, API, or Structured Data Files. This field must be assigned when creating a new line item. Otherwise, **the `advertisers.lineItems.create` request will fail**. */
  containsEuPoliticalAds?: "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN" | "CONTAINS_EU_POLITICAL_ADVERTISING" | "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING" | (string & {});
}

export const LineItem: Schema.Schema<LineItem> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  insertionOrderId: Schema.optional(Schema.String),
  lineItemId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  lineItemType: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  partnerCosts: Schema.optional(Schema.Array(PartnerCost)),
  flight: Schema.optional(LineItemFlight),
  budget: Schema.optional(LineItemBudget),
  pacing: Schema.optional(Pacing),
  frequencyCap: Schema.optional(FrequencyCap),
  partnerRevenueModel: Schema.optional(PartnerRevenueModel),
  conversionCounting: Schema.optional(ConversionCountingConfig),
  creativeIds: Schema.optional(Schema.Array(Schema.String)),
  bidStrategy: Schema.optional(BiddingStrategy),
  integrationDetails: Schema.optional(IntegrationDetails),
  targetingExpansion: Schema.optional(TargetingExpansionConfig),
  warningMessages: Schema.optional(Schema.Array(Schema.String)),
  mobileApp: Schema.optional(MobileApp),
  reservationType: Schema.optional(Schema.String),
  excludeNewExchanges: Schema.optional(Schema.Boolean),
  youtubeAndPartnersSettings: Schema.optional(YoutubeAndPartnersSettings),
  containsEuPoliticalAds: Schema.optional(Schema.String),
})).annotate({ identifier: "LineItem" }) as any as Schema.Schema<LineItem>;

export interface ListLineItemsResponse {
  /** The list of line items. This list will be absent if empty. */
  lineItems?: Array<LineItem>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListLineItems` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListLineItemsResponse: Schema.Schema<ListLineItemsResponse> = Schema.suspend(() => Schema.Struct({
  lineItems: Schema.optional(Schema.Array(LineItem)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLineItemsResponse" }) as any as Schema.Schema<ListLineItemsResponse>;

export interface DuplicateLineItemRequest {
  /** The display name of the new line item. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  targetDisplayName?: string;
  /** Whether this line item will serve European Union political ads. If contains_eu_political_ads has been set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` in the parent advertiser, then this field will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. This field can then be updated using the UI, API, or Structured Data Files. This field must be assigned when creating a new line item. Otherwise, **the `advertisers.lineItems.create` request will fail**. */
  containsEuPoliticalAds?: "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN" | "CONTAINS_EU_POLITICAL_ADVERTISING" | "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING" | (string & {});
}

export const DuplicateLineItemRequest: Schema.Schema<DuplicateLineItemRequest> = Schema.suspend(() => Schema.Struct({
  targetDisplayName: Schema.optional(Schema.String),
  containsEuPoliticalAds: Schema.optional(Schema.String),
})).annotate({ identifier: "DuplicateLineItemRequest" }) as any as Schema.Schema<DuplicateLineItemRequest>;

export interface DuplicateLineItemResponse {
  /** The ID of the created line item. */
  duplicateLineItemId?: string;
}

export const DuplicateLineItemResponse: Schema.Schema<DuplicateLineItemResponse> = Schema.suspend(() => Schema.Struct({
  duplicateLineItemId: Schema.optional(Schema.String),
})).annotate({ identifier: "DuplicateLineItemResponse" }) as any as Schema.Schema<DuplicateLineItemResponse>;

export interface BulkUpdateLineItemsRequest {
  /** Required. IDs of line items to update. */
  lineItemIds?: Array<string>;
  /** Required. A line item object containing the fields to be updated and the new values to assign to all line items specified in line_item_ids." */
  targetLineItem?: LineItem;
  /** Required. A field mask identifying which fields to update. Only the following fields are currently supported: * entityStatus * containsEuPoliticalAds */
  updateMask?: string;
}

export const BulkUpdateLineItemsRequest: Schema.Schema<BulkUpdateLineItemsRequest> = Schema.suspend(() => Schema.Struct({
  lineItemIds: Schema.optional(Schema.Array(Schema.String)),
  targetLineItem: Schema.optional(LineItem),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkUpdateLineItemsRequest" }) as any as Schema.Schema<BulkUpdateLineItemsRequest>;

export interface BulkUpdateLineItemsResponse {
  /** The IDs of successfully updated line items. */
  updatedLineItemIds?: Array<string>;
  /** The IDs of line items that failed to update. */
  failedLineItemIds?: Array<string>;
  /** The IDs of line items that are skipped for updates. For example, unnecessary mutates that will result in effectively no changes to line items will be skipped and corresponding line item IDs can be tracked here. */
  skippedLineItemIds?: Array<string>;
  /** Errors returned by line items that failed to update. */
  errors?: Array<Status>;
}

export const BulkUpdateLineItemsResponse: Schema.Schema<BulkUpdateLineItemsResponse> = Schema.suspend(() => Schema.Struct({
  updatedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
  failedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
  skippedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
  errors: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "BulkUpdateLineItemsResponse" }) as any as Schema.Schema<BulkUpdateLineItemsResponse>;

export interface LocationList {
  /** Output only. The resource name of the location list. */
  name?: string;
  /** Output only. The unique ID of the location list. Assigned by the system. */
  locationListId?: string;
  /** Required. The display name of the location list. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Immutable. The type of location. All locations in the list will share this type. */
  locationType?: "TARGETING_LOCATION_TYPE_UNSPECIFIED" | "TARGETING_LOCATION_TYPE_PROXIMITY" | "TARGETING_LOCATION_TYPE_REGIONAL" | (string & {});
  /** Required. Immutable. The unique ID of the advertiser the location list belongs to. */
  advertiserId?: string;
}

export const LocationList: Schema.Schema<LocationList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationListId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  locationType: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
})).annotate({ identifier: "LocationList" }) as any as Schema.Schema<LocationList>;

export interface ListLocationListsResponse {
  /** The list of location lists. This list will be absent if empty. */
  locationLists?: Array<LocationList>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListLocationLists` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListLocationListsResponse: Schema.Schema<ListLocationListsResponse> = Schema.suspend(() => Schema.Struct({
  locationLists: Schema.optional(Schema.Array(LocationList)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationListsResponse" }) as any as Schema.Schema<ListLocationListsResponse>;

export interface NegativeKeywordList {
  /** Output only. The resource name of the negative keyword list. */
  name?: string;
  /** Output only. The unique ID of the negative keyword list. Assigned by the system. */
  negativeKeywordListId?: string;
  /** Required. The display name of the negative keyword list. Must be UTF-8 encoded with a maximum size of 255 bytes. */
  displayName?: string;
  /** Output only. The unique ID of the advertiser the negative keyword list belongs to. */
  advertiserId?: string;
  /** Output only. Number of line items that are directly targeting this negative keyword list. */
  targetedLineItemCount?: string;
}

export const NegativeKeywordList: Schema.Schema<NegativeKeywordList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  negativeKeywordListId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  targetedLineItemCount: Schema.optional(Schema.String),
})).annotate({ identifier: "NegativeKeywordList" }) as any as Schema.Schema<NegativeKeywordList>;

export interface ListNegativeKeywordListsResponse {
  /** The list of negative keyword lists. This list will be absent if empty. */
  negativeKeywordLists?: Array<NegativeKeywordList>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListNegativeKeywordLists` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListNegativeKeywordListsResponse: Schema.Schema<ListNegativeKeywordListsResponse> = Schema.suspend(() => Schema.Struct({
  negativeKeywordLists: Schema.optional(Schema.Array(NegativeKeywordList)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNegativeKeywordListsResponse" }) as any as Schema.Schema<ListNegativeKeywordListsResponse>;

export interface NegativeKeyword {
  /** Output only. The resource name of the negative keyword. */
  name?: string;
  /** Required. Immutable. The negatively targeted keyword, for example `car insurance`. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10. Valid characters are restricted to ASCII characters only. The only URL-escaping permitted is for representing whitespace between words. Leading or trailing whitespace is ignored. */
  keywordValue?: string;
}

export const NegativeKeyword: Schema.Schema<NegativeKeyword> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  keywordValue: Schema.optional(Schema.String),
})).annotate({ identifier: "NegativeKeyword" }) as any as Schema.Schema<NegativeKeyword>;

export interface ListNegativeKeywordsResponse {
  /** The list of negative keywords. This list will be absent if empty. */
  negativeKeywords?: Array<NegativeKeyword>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListNegativeKeywords` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListNegativeKeywordsResponse: Schema.Schema<ListNegativeKeywordsResponse> = Schema.suspend(() => Schema.Struct({
  negativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNegativeKeywordsResponse" }) as any as Schema.Schema<ListNegativeKeywordsResponse>;

export interface BulkEditNegativeKeywordsRequest {
  /** The negative keywords to delete in batch, specified as a list of keyword_values. */
  deletedNegativeKeywords?: Array<string>;
  /** The negative keywords to create in batch, specified as a list of NegativeKeywords. */
  createdNegativeKeywords?: Array<NegativeKeyword>;
}

export const BulkEditNegativeKeywordsRequest: Schema.Schema<BulkEditNegativeKeywordsRequest> = Schema.suspend(() => Schema.Struct({
  deletedNegativeKeywords: Schema.optional(Schema.Array(Schema.String)),
  createdNegativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
})).annotate({ identifier: "BulkEditNegativeKeywordsRequest" }) as any as Schema.Schema<BulkEditNegativeKeywordsRequest>;

export interface BulkEditNegativeKeywordsResponse {
  /** The list of negative keywords that have been successfully created. This list will be absent if empty. */
  negativeKeywords?: Array<NegativeKeyword>;
}

export const BulkEditNegativeKeywordsResponse: Schema.Schema<BulkEditNegativeKeywordsResponse> = Schema.suspend(() => Schema.Struct({
  negativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
})).annotate({ identifier: "BulkEditNegativeKeywordsResponse" }) as any as Schema.Schema<BulkEditNegativeKeywordsResponse>;

export interface ReplaceNegativeKeywordsRequest {
  /** The negative keywords that will replace the existing keywords in the negative keyword list, specified as a list of NegativeKeywords. */
  newNegativeKeywords?: Array<NegativeKeyword>;
}

export const ReplaceNegativeKeywordsRequest: Schema.Schema<ReplaceNegativeKeywordsRequest> = Schema.suspend(() => Schema.Struct({
  newNegativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
})).annotate({ identifier: "ReplaceNegativeKeywordsRequest" }) as any as Schema.Schema<ReplaceNegativeKeywordsRequest>;

export interface ReplaceNegativeKeywordsResponse {
  /** The full list of negative keywords now present in the negative keyword list. */
  negativeKeywords?: Array<NegativeKeyword>;
}

export const ReplaceNegativeKeywordsResponse: Schema.Schema<ReplaceNegativeKeywordsResponse> = Schema.suspend(() => Schema.Struct({
  negativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
})).annotate({ identifier: "ReplaceNegativeKeywordsResponse" }) as any as Schema.Schema<ReplaceNegativeKeywordsResponse>;

export interface ListPartnerAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListPartnerAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const ListPartnerAssignedTargetingOptionsResponse: Schema.Schema<ListPartnerAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  assignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPartnerAssignedTargetingOptionsResponse" }) as any as Schema.Schema<ListPartnerAssignedTargetingOptionsResponse>;

export interface BulkEditPartnerAssignedTargetingOptionsRequest {
  /** The assigned targeting options to delete in batch, specified as a list of `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** The assigned targeting options to create in batch, specified as a list of `CreateAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
}

export const BulkEditPartnerAssignedTargetingOptionsRequest: Schema.Schema<BulkEditPartnerAssignedTargetingOptionsRequest> = Schema.suspend(() => Schema.Struct({
  deleteRequests: Schema.optional(Schema.Array(DeleteAssignedTargetingOptionsRequest)),
  createRequests: Schema.optional(Schema.Array(CreateAssignedTargetingOptionsRequest)),
})).annotate({ identifier: "BulkEditPartnerAssignedTargetingOptionsRequest" }) as any as Schema.Schema<BulkEditPartnerAssignedTargetingOptionsRequest>;

export interface BulkEditPartnerAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options that have been successfully created. This list will be absent if empty. */
  createdAssignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const BulkEditPartnerAssignedTargetingOptionsResponse: Schema.Schema<BulkEditPartnerAssignedTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  createdAssignedTargetingOptions: Schema.optional(Schema.Array(AssignedTargetingOption)),
})).annotate({ identifier: "BulkEditPartnerAssignedTargetingOptionsResponse" }) as any as Schema.Schema<BulkEditPartnerAssignedTargetingOptionsResponse>;

export interface PartnerGeneralConfig {
  /** Immutable. The standard TZ database name of the partner's time zone. For example, `America/New_York`. See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  timeZone?: string;
  /** Immutable. Partner's currency in ISO 4217 format. */
  currencyCode?: string;
}

export const PartnerGeneralConfig: Schema.Schema<PartnerGeneralConfig> = Schema.suspend(() => Schema.Struct({
  timeZone: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerGeneralConfig" }) as any as Schema.Schema<PartnerGeneralConfig>;

export interface MeasurementConfig {
  /** Whether or not to report DV360 cost to CM360. */
  dv360ToCmCostReportingEnabled?: boolean;
  /** Whether or not to include DV360 data in CM360 data transfer reports. */
  dv360ToCmDataSharingEnabled?: boolean;
}

export const MeasurementConfig: Schema.Schema<MeasurementConfig> = Schema.suspend(() => Schema.Struct({
  dv360ToCmCostReportingEnabled: Schema.optional(Schema.Boolean),
  dv360ToCmDataSharingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MeasurementConfig" }) as any as Schema.Schema<MeasurementConfig>;

export interface PartnerAdServerConfig {
  /** Measurement settings of a partner. */
  measurementConfig?: MeasurementConfig;
}

export const PartnerAdServerConfig: Schema.Schema<PartnerAdServerConfig> = Schema.suspend(() => Schema.Struct({
  measurementConfig: Schema.optional(MeasurementConfig),
})).annotate({ identifier: "PartnerAdServerConfig" }) as any as Schema.Schema<PartnerAdServerConfig>;

export interface PartnerDataAccessConfig {
  /** Structured Data Files (SDF) settings for the partner. The SDF configuration for the partner. */
  sdfConfig?: SdfConfig;
}

export const PartnerDataAccessConfig: Schema.Schema<PartnerDataAccessConfig> = Schema.suspend(() => Schema.Struct({
  sdfConfig: Schema.optional(SdfConfig),
})).annotate({ identifier: "PartnerDataAccessConfig" }) as any as Schema.Schema<PartnerDataAccessConfig>;

export interface ExchangeConfigEnabledExchange {
  /** The enabled exchange. */
  exchange?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
  /** Output only. Agency ID of Google Ad Manager. The field is only relevant when Google Ad Manager is the enabled exchange. */
  googleAdManagerAgencyId?: string;
  /** Output only. Network ID of Google Ad Manager. The field is only relevant when Google Ad Manager is the enabled exchange. */
  googleAdManagerBuyerNetworkId?: string;
  /** Output only. Seat ID of the enabled exchange. */
  seatId?: string;
}

export const ExchangeConfigEnabledExchange: Schema.Schema<ExchangeConfigEnabledExchange> = Schema.suspend(() => Schema.Struct({
  exchange: Schema.optional(Schema.String),
  googleAdManagerAgencyId: Schema.optional(Schema.String),
  googleAdManagerBuyerNetworkId: Schema.optional(Schema.String),
  seatId: Schema.optional(Schema.String),
})).annotate({ identifier: "ExchangeConfigEnabledExchange" }) as any as Schema.Schema<ExchangeConfigEnabledExchange>;

export interface ExchangeConfig {
  /** All enabled exchanges in the partner. Duplicate enabled exchanges will be ignored. */
  enabledExchanges?: Array<ExchangeConfigEnabledExchange>;
}

export const ExchangeConfig: Schema.Schema<ExchangeConfig> = Schema.suspend(() => Schema.Struct({
  enabledExchanges: Schema.optional(Schema.Array(ExchangeConfigEnabledExchange)),
})).annotate({ identifier: "ExchangeConfig" }) as any as Schema.Schema<ExchangeConfig>;

export interface PartnerBillingConfig {
  /** The ID of a partner default billing profile. */
  billingProfileId?: string;
}

export const PartnerBillingConfig: Schema.Schema<PartnerBillingConfig> = Schema.suspend(() => Schema.Struct({
  billingProfileId: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerBillingConfig" }) as any as Schema.Schema<PartnerBillingConfig>;

export interface Partner {
  /** Output only. The resource name of the partner. */
  name?: string;
  /** Output only. The unique ID of the partner. Assigned by the system. */
  partnerId?: string;
  /** Output only. The timestamp when the partner was last updated. Assigned by the system. */
  updateTime?: string;
  /** The display name of the partner. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Output only. The status of the partner. */
  entityStatus?: "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION" | (string & {});
  /** General settings of the partner. */
  generalConfig?: PartnerGeneralConfig;
  /** Ad server related settings of the partner. */
  adServerConfig?: PartnerAdServerConfig;
  /** Settings that control how partner data may be accessed. */
  dataAccessConfig?: PartnerDataAccessConfig;
  /** Settings that control which exchanges are enabled for the partner. */
  exchangeConfig?: ExchangeConfig;
  /** Billing related settings of the partner. */
  billingConfig?: PartnerBillingConfig;
}

export const Partner: Schema.Schema<Partner> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  partnerId: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entityStatus: Schema.optional(Schema.String),
  generalConfig: Schema.optional(PartnerGeneralConfig),
  adServerConfig: Schema.optional(PartnerAdServerConfig),
  dataAccessConfig: Schema.optional(PartnerDataAccessConfig),
  exchangeConfig: Schema.optional(ExchangeConfig),
  billingConfig: Schema.optional(PartnerBillingConfig),
})).annotate({ identifier: "Partner" }) as any as Schema.Schema<Partner>;

export interface ListPartnersResponse {
  /** The list of partners. This list will be absent if empty. */
  partners?: Array<Partner>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListPartners` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListPartnersResponse: Schema.Schema<ListPartnersResponse> = Schema.suspend(() => Schema.Struct({
  partners: Schema.optional(Schema.Array(Partner)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPartnersResponse" }) as any as Schema.Schema<ListPartnersResponse>;

export interface ParentEntityFilter {
  /** Required. File types that will be returned. */
  fileType?: Array<"FILE_TYPE_UNSPECIFIED" | "FILE_TYPE_CAMPAIGN" | "FILE_TYPE_MEDIA_PRODUCT" | "FILE_TYPE_INSERTION_ORDER" | "FILE_TYPE_LINE_ITEM" | "FILE_TYPE_AD_GROUP" | "FILE_TYPE_AD" | "FILE_TYPE_LINE_ITEM_QA" | "FILE_TYPE_AD_GROUP_QA" | (string & {})>;
  /** Required. Filter type used to filter fetched entities. */
  filterType?: "FILTER_TYPE_UNSPECIFIED" | "FILTER_TYPE_NONE" | "FILTER_TYPE_ADVERTISER_ID" | "FILTER_TYPE_CAMPAIGN_ID" | "FILTER_TYPE_MEDIA_PRODUCT_ID" | "FILTER_TYPE_INSERTION_ORDER_ID" | "FILTER_TYPE_LINE_ITEM_ID" | (string & {});
  /** The IDs of the specified filter type. This is used to filter entities to fetch. If filter type is not `FILTER_TYPE_NONE`, at least one ID must be specified. */
  filterIds?: Array<string>;
}

export const ParentEntityFilter: Schema.Schema<ParentEntityFilter> = Schema.suspend(() => Schema.Struct({
  fileType: Schema.optional(Schema.Array(Schema.String)),
  filterType: Schema.optional(Schema.String),
  filterIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ParentEntityFilter" }) as any as Schema.Schema<ParentEntityFilter>;

export interface IdFilter {
  /** Campaigns to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  campaignIds?: Array<string>;
  /** Media Products to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  mediaProductIds?: Array<string>;
  /** Insertion Orders to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  insertionOrderIds?: Array<string>;
  /** Line Items to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  lineItemIds?: Array<string>;
  /** YouTube Ad Groups to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  adGroupIds?: Array<string>;
  /** YouTube Ads to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  adGroupAdIds?: Array<string>;
  /** Optional. Line Items, by ID, to download in QA format. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  lineItemQaIds?: Array<string>;
  /** Optional. YouTube Ad Groups, by ID, to download in QA format. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  adGroupQaIds?: Array<string>;
}

export const IdFilter: Schema.Schema<IdFilter> = Schema.suspend(() => Schema.Struct({
  campaignIds: Schema.optional(Schema.Array(Schema.String)),
  mediaProductIds: Schema.optional(Schema.Array(Schema.String)),
  insertionOrderIds: Schema.optional(Schema.Array(Schema.String)),
  lineItemIds: Schema.optional(Schema.Array(Schema.String)),
  adGroupIds: Schema.optional(Schema.Array(Schema.String)),
  adGroupAdIds: Schema.optional(Schema.Array(Schema.String)),
  lineItemQaIds: Schema.optional(Schema.Array(Schema.String)),
  adGroupQaIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IdFilter" }) as any as Schema.Schema<IdFilter>;

export interface InventorySourceFilter {
  /** Inventory Sources to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. Leave empty to download all Inventory Sources for the selected Advertiser or Partner. */
  inventorySourceIds?: Array<string>;
}

export const InventorySourceFilter: Schema.Schema<InventorySourceFilter> = Schema.suspend(() => Schema.Struct({
  inventorySourceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InventorySourceFilter" }) as any as Schema.Schema<InventorySourceFilter>;

export interface CreateSdfDownloadTaskRequest {
  /** The ID of the partner to download SDF for. */
  partnerId?: string;
  /** The ID of the advertiser to download SDF for. */
  advertiserId?: string;
  /** Filters on selected file types. The entities in each file are filtered by a chosen set of filter entities. The filter entities must be the same type as, or a parent type of, the selected file types. */
  parentEntityFilter?: ParentEntityFilter;
  /** Filters on entities by their entity IDs. */
  idFilter?: IdFilter;
  /** Filters on Inventory Sources by their IDs. */
  inventorySourceFilter?: InventorySourceFilter;
  /** Required. The SDF version of the downloaded file. If set to `SDF_VERSION_UNSPECIFIED`, this will default to the version specified by the advertiser or partner identified by `root_id`. An advertiser inherits its SDF version from its partner unless configured otherwise. */
  version?: "SDF_VERSION_UNSPECIFIED" | "SDF_VERSION_3_1" | "SDF_VERSION_4" | "SDF_VERSION_4_1" | "SDF_VERSION_4_2" | "SDF_VERSION_5" | "SDF_VERSION_5_1" | "SDF_VERSION_5_2" | "SDF_VERSION_5_3" | "SDF_VERSION_5_4" | "SDF_VERSION_5_5" | "SDF_VERSION_6" | "SDF_VERSION_7" | "SDF_VERSION_7_1" | "SDF_VERSION_8" | "SDF_VERSION_8_1" | "SDF_VERSION_9" | "SDF_VERSION_9_1" | "SDF_VERSION_9_2" | (string & {});
}

export const CreateSdfDownloadTaskRequest: Schema.Schema<CreateSdfDownloadTaskRequest> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  parentEntityFilter: Schema.optional(ParentEntityFilter),
  idFilter: Schema.optional(IdFilter),
  inventorySourceFilter: Schema.optional(InventorySourceFilter),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateSdfDownloadTaskRequest" }) as any as Schema.Schema<CreateSdfDownloadTaskRequest>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Site {
  /** Output only. The resource name of the site. */
  name?: string;
  /** Required. The app ID or URL of the site. Must be UTF-8 encoded with a maximum length of 240 bytes. */
  urlOrAppId?: string;
}

export const Site: Schema.Schema<Site> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  urlOrAppId: Schema.optional(Schema.String),
})).annotate({ identifier: "Site" }) as any as Schema.Schema<Site>;

export interface ListSitesResponse {
  /** The list of sites. This list will be absent if empty. */
  sites?: Array<Site>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListSites` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListSitesResponse: Schema.Schema<ListSitesResponse> = Schema.suspend(() => Schema.Struct({
  sites: Schema.optional(Schema.Array(Site)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSitesResponse" }) as any as Schema.Schema<ListSitesResponse>;

export interface BulkEditSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** The sites to delete in batch, specified as a list of site url_or_app_ids. */
  deletedSites?: Array<string>;
  /** The sites to create in batch, specified as a list of Sites. */
  createdSites?: Array<Site>;
}

export const BulkEditSitesRequest: Schema.Schema<BulkEditSitesRequest> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  deletedSites: Schema.optional(Schema.Array(Schema.String)),
  createdSites: Schema.optional(Schema.Array(Site)),
})).annotate({ identifier: "BulkEditSitesRequest" }) as any as Schema.Schema<BulkEditSitesRequest>;

export interface BulkEditSitesResponse {
  /** The list of sites that have been successfully created. This list will be absent if empty. */
  sites?: Array<Site>;
}

export const BulkEditSitesResponse: Schema.Schema<BulkEditSitesResponse> = Schema.suspend(() => Schema.Struct({
  sites: Schema.optional(Schema.Array(Site)),
})).annotate({ identifier: "BulkEditSitesResponse" }) as any as Schema.Schema<BulkEditSitesResponse>;

export interface ReplaceSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** The sites that will replace the existing sites assigned to the channel, specified as a list of Sites. */
  newSites?: Array<Site>;
}

export const ReplaceSitesRequest: Schema.Schema<ReplaceSitesRequest> = Schema.suspend(() => Schema.Struct({
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  newSites: Schema.optional(Schema.Array(Site)),
})).annotate({ identifier: "ReplaceSitesRequest" }) as any as Schema.Schema<ReplaceSitesRequest>;

export interface ReplaceSitesResponse {
  /** The list of sites in the channel after replacing. */
  sites?: Array<Site>;
}

export const ReplaceSitesResponse: Schema.Schema<ReplaceSitesResponse> = Schema.suspend(() => Schema.Struct({
  sites: Schema.optional(Schema.Array(Site)),
})).annotate({ identifier: "ReplaceSitesResponse" }) as any as Schema.Schema<ReplaceSitesResponse>;

export interface DigitalContentLabelTargetingOptionDetails {
  /** Output only. An enum for the content label brand safety tiers. */
  contentRatingTier?: "CONTENT_RATING_TIER_UNSPECIFIED" | "CONTENT_RATING_TIER_UNRATED" | "CONTENT_RATING_TIER_GENERAL" | "CONTENT_RATING_TIER_PARENTAL_GUIDANCE" | "CONTENT_RATING_TIER_TEENS" | "CONTENT_RATING_TIER_MATURE" | "CONTENT_RATING_TIER_FAMILIES" | (string & {});
}

export const DigitalContentLabelTargetingOptionDetails: Schema.Schema<DigitalContentLabelTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentRatingTier: Schema.optional(Schema.String),
})).annotate({ identifier: "DigitalContentLabelTargetingOptionDetails" }) as any as Schema.Schema<DigitalContentLabelTargetingOptionDetails>;

export interface SensitiveCategoryTargetingOptionDetails {
  /** Output only. An enum for the DV360 Sensitive category content classifier. */
  sensitiveCategory?: "SENSITIVE_CATEGORY_UNSPECIFIED" | "SENSITIVE_CATEGORY_ADULT" | "SENSITIVE_CATEGORY_DEROGATORY" | "SENSITIVE_CATEGORY_DOWNLOADS_SHARING" | "SENSITIVE_CATEGORY_WEAPONS" | "SENSITIVE_CATEGORY_GAMBLING" | "SENSITIVE_CATEGORY_VIOLENCE" | "SENSITIVE_CATEGORY_SUGGESTIVE" | "SENSITIVE_CATEGORY_PROFANITY" | "SENSITIVE_CATEGORY_ALCOHOL" | "SENSITIVE_CATEGORY_DRUGS" | "SENSITIVE_CATEGORY_TOBACCO" | "SENSITIVE_CATEGORY_POLITICS" | "SENSITIVE_CATEGORY_RELIGION" | "SENSITIVE_CATEGORY_TRAGEDY" | "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS" | "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES" | "SENSITIVE_CATEGORY_SHOCKING" | "SENSITIVE_CATEGORY_EMBEDDED_VIDEO" | "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO" | (string & {});
}

export const SensitiveCategoryTargetingOptionDetails: Schema.Schema<SensitiveCategoryTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  sensitiveCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "SensitiveCategoryTargetingOptionDetails" }) as any as Schema.Schema<SensitiveCategoryTargetingOptionDetails>;

export interface ContentThemeTargetingOptionDetails {
  /** Output only. An enum for the DV360 content theme content classifier. */
  contentTheme?: "CONTENT_THEME_UNSPECIFIED" | "CONTENT_THEME_FIGHTING_VIDEO_GAMES" | "CONTENT_THEME_MATURE_GAMES" | "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES" | "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES" | "CONTENT_THEME_POLITICS" | "CONTENT_THEME_RECENT_NEWS" | "CONTENT_THEME_RELIGION" | "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT" | "CONTENT_THEME_UNPLEASANT_NEWS" | (string & {});
}

export const ContentThemeTargetingOptionDetails: Schema.Schema<ContentThemeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentTheme: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentThemeTargetingOptionDetails" }) as any as Schema.Schema<ContentThemeTargetingOptionDetails>;

export interface AppCategoryTargetingOptionDetails {
  /** Output only. The name of the app collection. */
  displayName?: string;
}

export const AppCategoryTargetingOptionDetails: Schema.Schema<AppCategoryTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AppCategoryTargetingOptionDetails" }) as any as Schema.Schema<AppCategoryTargetingOptionDetails>;

export interface OnScreenPositionTargetingOptionDetails {
  /** Output only. The on screen position. */
  onScreenPosition?: "ON_SCREEN_POSITION_UNSPECIFIED" | "ON_SCREEN_POSITION_UNKNOWN" | "ON_SCREEN_POSITION_ABOVE_THE_FOLD" | "ON_SCREEN_POSITION_BELOW_THE_FOLD" | (string & {});
}

export const OnScreenPositionTargetingOptionDetails: Schema.Schema<OnScreenPositionTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  onScreenPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "OnScreenPositionTargetingOptionDetails" }) as any as Schema.Schema<OnScreenPositionTargetingOptionDetails>;

export interface ContentOutstreamPositionTargetingOptionDetails {
  /** Output only. The content outstream position. */
  contentOutstreamPosition?: "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED" | "CONTENT_OUTSTREAM_POSITION_UNKNOWN" | "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE" | "CONTENT_OUTSTREAM_POSITION_IN_BANNER" | "CONTENT_OUTSTREAM_POSITION_IN_FEED" | "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL" | (string & {});
}

export const ContentOutstreamPositionTargetingOptionDetails: Schema.Schema<ContentOutstreamPositionTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentOutstreamPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentOutstreamPositionTargetingOptionDetails" }) as any as Schema.Schema<ContentOutstreamPositionTargetingOptionDetails>;

export interface ContentInstreamPositionTargetingOptionDetails {
  /** Output only. The content instream position. */
  contentInstreamPosition?: "CONTENT_INSTREAM_POSITION_UNSPECIFIED" | "CONTENT_INSTREAM_POSITION_PRE_ROLL" | "CONTENT_INSTREAM_POSITION_MID_ROLL" | "CONTENT_INSTREAM_POSITION_POST_ROLL" | "CONTENT_INSTREAM_POSITION_UNKNOWN" | (string & {});
}

export const ContentInstreamPositionTargetingOptionDetails: Schema.Schema<ContentInstreamPositionTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentInstreamPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentInstreamPositionTargetingOptionDetails" }) as any as Schema.Schema<ContentInstreamPositionTargetingOptionDetails>;

export interface VideoPlayerSizeTargetingOptionDetails {
  /** Output only. The video player size. */
  videoPlayerSize?: "VIDEO_PLAYER_SIZE_UNSPECIFIED" | "VIDEO_PLAYER_SIZE_SMALL" | "VIDEO_PLAYER_SIZE_LARGE" | "VIDEO_PLAYER_SIZE_HD" | "VIDEO_PLAYER_SIZE_UNKNOWN" | (string & {});
}

export const VideoPlayerSizeTargetingOptionDetails: Schema.Schema<VideoPlayerSizeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  videoPlayerSize: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoPlayerSizeTargetingOptionDetails" }) as any as Schema.Schema<VideoPlayerSizeTargetingOptionDetails>;

export interface AgeRangeTargetingOptionDetails {
  /** Output only. The age range of an audience. */
  ageRange?: "AGE_RANGE_UNSPECIFIED" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_PLUS" | "AGE_RANGE_UNKNOWN" | "AGE_RANGE_18_20" | "AGE_RANGE_21_24" | "AGE_RANGE_25_29" | "AGE_RANGE_30_34" | "AGE_RANGE_35_39" | "AGE_RANGE_40_44" | "AGE_RANGE_45_49" | "AGE_RANGE_50_54" | "AGE_RANGE_55_59" | "AGE_RANGE_60_64" | (string & {});
}

export const AgeRangeTargetingOptionDetails: Schema.Schema<AgeRangeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  ageRange: Schema.optional(Schema.String),
})).annotate({ identifier: "AgeRangeTargetingOptionDetails" }) as any as Schema.Schema<AgeRangeTargetingOptionDetails>;

export interface ParentalStatusTargetingOptionDetails {
  /** Output only. The parental status of an audience. */
  parentalStatus?: "PARENTAL_STATUS_UNSPECIFIED" | "PARENTAL_STATUS_PARENT" | "PARENTAL_STATUS_NOT_A_PARENT" | "PARENTAL_STATUS_UNKNOWN" | (string & {});
}

export const ParentalStatusTargetingOptionDetails: Schema.Schema<ParentalStatusTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  parentalStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ParentalStatusTargetingOptionDetails" }) as any as Schema.Schema<ParentalStatusTargetingOptionDetails>;

export interface UserRewardedContentTargetingOptionDetails {
  /** Output only. User rewarded content status for video ads. */
  userRewardedContent?: "USER_REWARDED_CONTENT_UNSPECIFIED" | "USER_REWARDED_CONTENT_USER_REWARDED" | "USER_REWARDED_CONTENT_NOT_USER_REWARDED" | (string & {});
}

export const UserRewardedContentTargetingOptionDetails: Schema.Schema<UserRewardedContentTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  userRewardedContent: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRewardedContentTargetingOptionDetails" }) as any as Schema.Schema<UserRewardedContentTargetingOptionDetails>;

export interface HouseholdIncomeTargetingOptionDetails {
  /** Output only. The household income of an audience. */
  householdIncome?: "HOUSEHOLD_INCOME_UNSPECIFIED" | "HOUSEHOLD_INCOME_UNKNOWN" | "HOUSEHOLD_INCOME_LOWER_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT" | "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT" | "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT" | "HOUSEHOLD_INCOME_TOP_10_PERCENT" | (string & {});
}

export const HouseholdIncomeTargetingOptionDetails: Schema.Schema<HouseholdIncomeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  householdIncome: Schema.optional(Schema.String),
})).annotate({ identifier: "HouseholdIncomeTargetingOptionDetails" }) as any as Schema.Schema<HouseholdIncomeTargetingOptionDetails>;

export interface GenderTargetingOptionDetails {
  /** Output only. The gender of an audience. */
  gender?: "GENDER_UNSPECIFIED" | "GENDER_MALE" | "GENDER_FEMALE" | "GENDER_UNKNOWN" | (string & {});
}

export const GenderTargetingOptionDetails: Schema.Schema<GenderTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  gender: Schema.optional(Schema.String),
})).annotate({ identifier: "GenderTargetingOptionDetails" }) as any as Schema.Schema<GenderTargetingOptionDetails>;

export interface DeviceTypeTargetingOptionDetails {
  /** Output only. The device type that is used to be targeted. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "DEVICE_TYPE_COMPUTER" | "DEVICE_TYPE_CONNECTED_TV" | "DEVICE_TYPE_SMART_PHONE" | "DEVICE_TYPE_TABLET" | "DEVICE_TYPE_CONNECTED_DEVICE" | (string & {});
}

export const DeviceTypeTargetingOptionDetails: Schema.Schema<DeviceTypeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  deviceType: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceTypeTargetingOptionDetails" }) as any as Schema.Schema<DeviceTypeTargetingOptionDetails>;

export interface BrowserTargetingOptionDetails {
  /** Output only. The display name of the browser. */
  displayName?: string;
}

export const BrowserTargetingOptionDetails: Schema.Schema<BrowserTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "BrowserTargetingOptionDetails" }) as any as Schema.Schema<BrowserTargetingOptionDetails>;

export interface CarrierAndIspTargetingOptionDetails {
  /** Output only. The display name of the carrier or ISP. */
  displayName?: string;
  /** Output only. The type indicating if it's carrier or ISP. */
  type?: "CARRIER_AND_ISP_TYPE_UNSPECIFIED" | "CARRIER_AND_ISP_TYPE_ISP" | "CARRIER_AND_ISP_TYPE_CARRIER" | (string & {});
}

export const CarrierAndIspTargetingOptionDetails: Schema.Schema<CarrierAndIspTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "CarrierAndIspTargetingOptionDetails" }) as any as Schema.Schema<CarrierAndIspTargetingOptionDetails>;

export interface EnvironmentTargetingOptionDetails {
  /** Output only. The serving environment. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "ENVIRONMENT_WEB_OPTIMIZED" | "ENVIRONMENT_WEB_NOT_OPTIMIZED" | "ENVIRONMENT_APP" | (string & {});
}

export const EnvironmentTargetingOptionDetails: Schema.Schema<EnvironmentTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvironmentTargetingOptionDetails" }) as any as Schema.Schema<EnvironmentTargetingOptionDetails>;

export interface OperatingSystemTargetingOptionDetails {
  /** Output only. The display name of the operating system. */
  displayName?: string;
}

export const OperatingSystemTargetingOptionDetails: Schema.Schema<OperatingSystemTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "OperatingSystemTargetingOptionDetails" }) as any as Schema.Schema<OperatingSystemTargetingOptionDetails>;

export interface DeviceMakeModelTargetingOptionDetails {
  /** Output only. The display name of the device make and model. */
  displayName?: string;
}

export const DeviceMakeModelTargetingOptionDetails: Schema.Schema<DeviceMakeModelTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceMakeModelTargetingOptionDetails" }) as any as Schema.Schema<DeviceMakeModelTargetingOptionDetails>;

export interface ViewabilityTargetingOptionDetails {
  /** Output only. The predicted viewability percentage. */
  viewability?: "VIEWABILITY_UNSPECIFIED" | "VIEWABILITY_10_PERCENT_OR_MORE" | "VIEWABILITY_20_PERCENT_OR_MORE" | "VIEWABILITY_30_PERCENT_OR_MORE" | "VIEWABILITY_40_PERCENT_OR_MORE" | "VIEWABILITY_50_PERCENT_OR_MORE" | "VIEWABILITY_60_PERCENT_OR_MORE" | "VIEWABILITY_70_PERCENT_OR_MORE" | "VIEWABILITY_80_PERCENT_OR_MORE" | "VIEWABILITY_90_PERCENT_OR_MORE" | (string & {});
}

export const ViewabilityTargetingOptionDetails: Schema.Schema<ViewabilityTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  viewability: Schema.optional(Schema.String),
})).annotate({ identifier: "ViewabilityTargetingOptionDetails" }) as any as Schema.Schema<ViewabilityTargetingOptionDetails>;

export interface CategoryTargetingOptionDetails {
  /** Output only. The display name of the category. */
  displayName?: string;
}

export const CategoryTargetingOptionDetails: Schema.Schema<CategoryTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "CategoryTargetingOptionDetails" }) as any as Schema.Schema<CategoryTargetingOptionDetails>;

export interface LanguageTargetingOptionDetails {
  /** Output only. The display name of the language (e.g., "French"). */
  displayName?: string;
}

export const LanguageTargetingOptionDetails: Schema.Schema<LanguageTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "LanguageTargetingOptionDetails" }) as any as Schema.Schema<LanguageTargetingOptionDetails>;

export interface AuthorizedSellerStatusTargetingOptionDetails {
  /** Output only. The authorized seller status. */
  authorizedSellerStatus?: "AUTHORIZED_SELLER_STATUS_UNSPECIFIED" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS" | (string & {});
}

export const AuthorizedSellerStatusTargetingOptionDetails: Schema.Schema<AuthorizedSellerStatusTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  authorizedSellerStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizedSellerStatusTargetingOptionDetails" }) as any as Schema.Schema<AuthorizedSellerStatusTargetingOptionDetails>;

export interface GeoRegionTargetingOptionDetails {
  /** Output only. The display name of the geographic region (e.g., "Ontario, Canada"). */
  displayName?: string;
  /** Output only. The type of geographic region targeting. */
  geoRegionType?: "GEO_REGION_TYPE_UNKNOWN" | "GEO_REGION_TYPE_OTHER" | "GEO_REGION_TYPE_COUNTRY" | "GEO_REGION_TYPE_REGION" | "GEO_REGION_TYPE_TERRITORY" | "GEO_REGION_TYPE_PROVINCE" | "GEO_REGION_TYPE_STATE" | "GEO_REGION_TYPE_PREFECTURE" | "GEO_REGION_TYPE_GOVERNORATE" | "GEO_REGION_TYPE_CANTON" | "GEO_REGION_TYPE_UNION_TERRITORY" | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY" | "GEO_REGION_TYPE_DMA_REGION" | "GEO_REGION_TYPE_METRO" | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT" | "GEO_REGION_TYPE_COUNTY" | "GEO_REGION_TYPE_MUNICIPALITY" | "GEO_REGION_TYPE_CITY" | "GEO_REGION_TYPE_POSTAL_CODE" | "GEO_REGION_TYPE_DEPARTMENT" | "GEO_REGION_TYPE_AIRPORT" | "GEO_REGION_TYPE_TV_REGION" | "GEO_REGION_TYPE_OKRUG" | "GEO_REGION_TYPE_BOROUGH" | "GEO_REGION_TYPE_CITY_REGION" | "GEO_REGION_TYPE_ARRONDISSEMENT" | "GEO_REGION_TYPE_NEIGHBORHOOD" | "GEO_REGION_TYPE_UNIVERSITY" | "GEO_REGION_TYPE_DISTRICT" | "GEO_REGION_TYPE_NATIONAL_PARK" | "GEO_REGION_TYPE_BARRIO" | "GEO_REGION_TYPE_SUB_WARD" | "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT" | "GEO_REGION_TYPE_SUB_DISTRICT" | "GEO_REGION_TYPE_QUARTER" | "GEO_REGION_TYPE_DIVISION" | "GEO_REGION_TYPE_COMMUNE" | "GEO_REGION_TYPE_COLLOQUIAL_AREA" | (string & {});
}

export const GeoRegionTargetingOptionDetails: Schema.Schema<GeoRegionTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  geoRegionType: Schema.optional(Schema.String),
})).annotate({ identifier: "GeoRegionTargetingOptionDetails" }) as any as Schema.Schema<GeoRegionTargetingOptionDetails>;

export interface ExchangeTargetingOptionDetails {
  /** Output only. The type of exchange. */
  exchange?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
}

export const ExchangeTargetingOptionDetails: Schema.Schema<ExchangeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  exchange: Schema.optional(Schema.String),
})).annotate({ identifier: "ExchangeTargetingOptionDetails" }) as any as Schema.Schema<ExchangeTargetingOptionDetails>;

export interface SubExchangeTargetingOptionDetails {
  /** Output only. The display name of the sub-exchange. */
  displayName?: string;
}

export const SubExchangeTargetingOptionDetails: Schema.Schema<SubExchangeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "SubExchangeTargetingOptionDetails" }) as any as Schema.Schema<SubExchangeTargetingOptionDetails>;

export interface PoiTargetingOptionDetails {
  /** Output only. Latitude of the POI rounding to 6th decimal place. */
  latitude?: number;
  /** Output only. Longitude of the POI rounding to 6th decimal place. */
  longitude?: number;
  /** Output only. The display name of a POI(e.g. "Times Square", "Space Needle"), followed by its full address if available. */
  displayName?: string;
}

export const PoiTargetingOptionDetails: Schema.Schema<PoiTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "PoiTargetingOptionDetails" }) as any as Schema.Schema<PoiTargetingOptionDetails>;

export interface BusinessChainTargetingOptionDetails {
  /** Output only. The display name of the business chain, e.g. "KFC", "Chase Bank". */
  businessChain?: string;
  /** Output only. The display name of the geographic region, e.g. "Ontario, Canada". */
  geoRegion?: string;
  /** Output only. The type of the geographic region. */
  geoRegionType?: "GEO_REGION_TYPE_UNKNOWN" | "GEO_REGION_TYPE_OTHER" | "GEO_REGION_TYPE_COUNTRY" | "GEO_REGION_TYPE_REGION" | "GEO_REGION_TYPE_TERRITORY" | "GEO_REGION_TYPE_PROVINCE" | "GEO_REGION_TYPE_STATE" | "GEO_REGION_TYPE_PREFECTURE" | "GEO_REGION_TYPE_GOVERNORATE" | "GEO_REGION_TYPE_CANTON" | "GEO_REGION_TYPE_UNION_TERRITORY" | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY" | "GEO_REGION_TYPE_DMA_REGION" | "GEO_REGION_TYPE_METRO" | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT" | "GEO_REGION_TYPE_COUNTY" | "GEO_REGION_TYPE_MUNICIPALITY" | "GEO_REGION_TYPE_CITY" | "GEO_REGION_TYPE_POSTAL_CODE" | "GEO_REGION_TYPE_DEPARTMENT" | "GEO_REGION_TYPE_AIRPORT" | "GEO_REGION_TYPE_TV_REGION" | "GEO_REGION_TYPE_OKRUG" | "GEO_REGION_TYPE_BOROUGH" | "GEO_REGION_TYPE_CITY_REGION" | "GEO_REGION_TYPE_ARRONDISSEMENT" | "GEO_REGION_TYPE_NEIGHBORHOOD" | "GEO_REGION_TYPE_UNIVERSITY" | "GEO_REGION_TYPE_DISTRICT" | "GEO_REGION_TYPE_NATIONAL_PARK" | "GEO_REGION_TYPE_BARRIO" | "GEO_REGION_TYPE_SUB_WARD" | "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT" | "GEO_REGION_TYPE_SUB_DISTRICT" | "GEO_REGION_TYPE_QUARTER" | "GEO_REGION_TYPE_DIVISION" | "GEO_REGION_TYPE_COMMUNE" | "GEO_REGION_TYPE_COLLOQUIAL_AREA" | (string & {});
}

export const BusinessChainTargetingOptionDetails: Schema.Schema<BusinessChainTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  businessChain: Schema.optional(Schema.String),
  geoRegion: Schema.optional(Schema.String),
  geoRegionType: Schema.optional(Schema.String),
})).annotate({ identifier: "BusinessChainTargetingOptionDetails" }) as any as Schema.Schema<BusinessChainTargetingOptionDetails>;

export interface ContentDurationTargetingOptionDetails {
  /** Output only. The content duration. */
  contentDuration?: "CONTENT_DURATION_UNSPECIFIED" | "CONTENT_DURATION_UNKNOWN" | "CONTENT_DURATION_0_TO_1_MIN" | "CONTENT_DURATION_1_TO_5_MIN" | "CONTENT_DURATION_5_TO_15_MIN" | "CONTENT_DURATION_15_TO_30_MIN" | "CONTENT_DURATION_30_TO_60_MIN" | "CONTENT_DURATION_OVER_60_MIN" | (string & {});
}

export const ContentDurationTargetingOptionDetails: Schema.Schema<ContentDurationTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentDurationTargetingOptionDetails" }) as any as Schema.Schema<ContentDurationTargetingOptionDetails>;

export interface ContentStreamTypeTargetingOptionDetails {
  /** Output only. The content stream type. */
  contentStreamType?: "CONTENT_STREAM_TYPE_UNSPECIFIED" | "CONTENT_LIVE_STREAM" | "CONTENT_ON_DEMAND" | (string & {});
}

export const ContentStreamTypeTargetingOptionDetails: Schema.Schema<ContentStreamTypeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentStreamType: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentStreamTypeTargetingOptionDetails" }) as any as Schema.Schema<ContentStreamTypeTargetingOptionDetails>;

export interface NativeContentPositionTargetingOptionDetails {
  /** Output only. The content position. */
  contentPosition?: "NATIVE_CONTENT_POSITION_UNSPECIFIED" | "NATIVE_CONTENT_POSITION_UNKNOWN" | "NATIVE_CONTENT_POSITION_IN_ARTICLE" | "NATIVE_CONTENT_POSITION_IN_FEED" | "NATIVE_CONTENT_POSITION_PERIPHERAL" | "NATIVE_CONTENT_POSITION_RECOMMENDATION" | (string & {});
}

export const NativeContentPositionTargetingOptionDetails: Schema.Schema<NativeContentPositionTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  contentPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "NativeContentPositionTargetingOptionDetails" }) as any as Schema.Schema<NativeContentPositionTargetingOptionDetails>;

export interface OmidTargetingOptionDetails {
  /** Output only. The type of Open Measurement enabled inventory. */
  omid?: "OMID_UNSPECIFIED" | "OMID_FOR_MOBILE_DISPLAY_ADS" | (string & {});
}

export const OmidTargetingOptionDetails: Schema.Schema<OmidTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  omid: Schema.optional(Schema.String),
})).annotate({ identifier: "OmidTargetingOptionDetails" }) as any as Schema.Schema<OmidTargetingOptionDetails>;

export interface AudioContentTypeTargetingOptionDetails {
  /** Output only. The audio content type. */
  audioContentType?: "AUDIO_CONTENT_TYPE_UNSPECIFIED" | "AUDIO_CONTENT_TYPE_UNKNOWN" | "AUDIO_CONTENT_TYPE_MUSIC" | "AUDIO_CONTENT_TYPE_BROADCAST" | "AUDIO_CONTENT_TYPE_PODCAST" | (string & {});
}

export const AudioContentTypeTargetingOptionDetails: Schema.Schema<AudioContentTypeTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  audioContentType: Schema.optional(Schema.String),
})).annotate({ identifier: "AudioContentTypeTargetingOptionDetails" }) as any as Schema.Schema<AudioContentTypeTargetingOptionDetails>;

export interface ContentGenreTargetingOptionDetails {
  /** Output only. The display name of the content genre */
  displayName?: string;
}

export const ContentGenreTargetingOptionDetails: Schema.Schema<ContentGenreTargetingOptionDetails> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentGenreTargetingOptionDetails" }) as any as Schema.Schema<ContentGenreTargetingOptionDetails>;

export interface TargetingOption {
  /** Output only. The resource name for this targeting option. */
  name?: string;
  /** Output only. A unique identifier for this targeting option. The tuple {`targeting_type`, `targeting_option_id`} will be unique. */
  targetingOptionId?: string;
  /** Output only. The type of this targeting option. */
  targetingType?: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Digital content label details. */
  digitalContentLabelDetails?: DigitalContentLabelTargetingOptionDetails;
  /** Sensitive Category details. */
  sensitiveCategoryDetails?: SensitiveCategoryTargetingOptionDetails;
  /** Content theme details. */
  contentThemeDetails?: ContentThemeTargetingOptionDetails;
  /** App category details. */
  appCategoryDetails?: AppCategoryTargetingOptionDetails;
  /** On screen position details. */
  onScreenPositionDetails?: OnScreenPositionTargetingOptionDetails;
  /** Content outstream position details. */
  contentOutstreamPositionDetails?: ContentOutstreamPositionTargetingOptionDetails;
  /** Content instream position details. */
  contentInstreamPositionDetails?: ContentInstreamPositionTargetingOptionDetails;
  /** Video player size details. */
  videoPlayerSizeDetails?: VideoPlayerSizeTargetingOptionDetails;
  /** Age range details. */
  ageRangeDetails?: AgeRangeTargetingOptionDetails;
  /** Parental status details. */
  parentalStatusDetails?: ParentalStatusTargetingOptionDetails;
  /** User rewarded content details. */
  userRewardedContentDetails?: UserRewardedContentTargetingOptionDetails;
  /** Household income details. */
  householdIncomeDetails?: HouseholdIncomeTargetingOptionDetails;
  /** Gender details. */
  genderDetails?: GenderTargetingOptionDetails;
  /** Device type details. */
  deviceTypeDetails?: DeviceTypeTargetingOptionDetails;
  /** Browser details. */
  browserDetails?: BrowserTargetingOptionDetails;
  /** Carrier and ISP details. */
  carrierAndIspDetails?: CarrierAndIspTargetingOptionDetails;
  /** Environment details. */
  environmentDetails?: EnvironmentTargetingOptionDetails;
  /** Operating system resources details. */
  operatingSystemDetails?: OperatingSystemTargetingOptionDetails;
  /** Device make and model resource details. */
  deviceMakeModelDetails?: DeviceMakeModelTargetingOptionDetails;
  /** Viewability resource details. */
  viewabilityDetails?: ViewabilityTargetingOptionDetails;
  /** Category resource details. */
  categoryDetails?: CategoryTargetingOptionDetails;
  /** Language resource details. */
  languageDetails?: LanguageTargetingOptionDetails;
  /** Authorized seller status resource details. */
  authorizedSellerStatusDetails?: AuthorizedSellerStatusTargetingOptionDetails;
  /** Geographic region resource details. */
  geoRegionDetails?: GeoRegionTargetingOptionDetails;
  /** Exchange details. */
  exchangeDetails?: ExchangeTargetingOptionDetails;
  /** Sub-exchange details. */
  subExchangeDetails?: SubExchangeTargetingOptionDetails;
  /** POI resource details. */
  poiDetails?: PoiTargetingOptionDetails;
  /** Business chain resource details. */
  businessChainDetails?: BusinessChainTargetingOptionDetails;
  /** Content duration resource details. */
  contentDurationDetails?: ContentDurationTargetingOptionDetails;
  /** Content stream type resource details. */
  contentStreamTypeDetails?: ContentStreamTypeTargetingOptionDetails;
  /** Native content position details. */
  nativeContentPositionDetails?: NativeContentPositionTargetingOptionDetails;
  /** Open Measurement enabled inventory details. */
  omidDetails?: OmidTargetingOptionDetails;
  /** Audio content type details. */
  audioContentTypeDetails?: AudioContentTypeTargetingOptionDetails;
  /** Content genre resource details. */
  contentGenreDetails?: ContentGenreTargetingOptionDetails;
}

export const TargetingOption: Schema.Schema<TargetingOption> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  targetingOptionId: Schema.optional(Schema.String),
  targetingType: Schema.optional(Schema.String),
  digitalContentLabelDetails: Schema.optional(DigitalContentLabelTargetingOptionDetails),
  sensitiveCategoryDetails: Schema.optional(SensitiveCategoryTargetingOptionDetails),
  contentThemeDetails: Schema.optional(ContentThemeTargetingOptionDetails),
  appCategoryDetails: Schema.optional(AppCategoryTargetingOptionDetails),
  onScreenPositionDetails: Schema.optional(OnScreenPositionTargetingOptionDetails),
  contentOutstreamPositionDetails: Schema.optional(ContentOutstreamPositionTargetingOptionDetails),
  contentInstreamPositionDetails: Schema.optional(ContentInstreamPositionTargetingOptionDetails),
  videoPlayerSizeDetails: Schema.optional(VideoPlayerSizeTargetingOptionDetails),
  ageRangeDetails: Schema.optional(AgeRangeTargetingOptionDetails),
  parentalStatusDetails: Schema.optional(ParentalStatusTargetingOptionDetails),
  userRewardedContentDetails: Schema.optional(UserRewardedContentTargetingOptionDetails),
  householdIncomeDetails: Schema.optional(HouseholdIncomeTargetingOptionDetails),
  genderDetails: Schema.optional(GenderTargetingOptionDetails),
  deviceTypeDetails: Schema.optional(DeviceTypeTargetingOptionDetails),
  browserDetails: Schema.optional(BrowserTargetingOptionDetails),
  carrierAndIspDetails: Schema.optional(CarrierAndIspTargetingOptionDetails),
  environmentDetails: Schema.optional(EnvironmentTargetingOptionDetails),
  operatingSystemDetails: Schema.optional(OperatingSystemTargetingOptionDetails),
  deviceMakeModelDetails: Schema.optional(DeviceMakeModelTargetingOptionDetails),
  viewabilityDetails: Schema.optional(ViewabilityTargetingOptionDetails),
  categoryDetails: Schema.optional(CategoryTargetingOptionDetails),
  languageDetails: Schema.optional(LanguageTargetingOptionDetails),
  authorizedSellerStatusDetails: Schema.optional(AuthorizedSellerStatusTargetingOptionDetails),
  geoRegionDetails: Schema.optional(GeoRegionTargetingOptionDetails),
  exchangeDetails: Schema.optional(ExchangeTargetingOptionDetails),
  subExchangeDetails: Schema.optional(SubExchangeTargetingOptionDetails),
  poiDetails: Schema.optional(PoiTargetingOptionDetails),
  businessChainDetails: Schema.optional(BusinessChainTargetingOptionDetails),
  contentDurationDetails: Schema.optional(ContentDurationTargetingOptionDetails),
  contentStreamTypeDetails: Schema.optional(ContentStreamTypeTargetingOptionDetails),
  nativeContentPositionDetails: Schema.optional(NativeContentPositionTargetingOptionDetails),
  omidDetails: Schema.optional(OmidTargetingOptionDetails),
  audioContentTypeDetails: Schema.optional(AudioContentTypeTargetingOptionDetails),
  contentGenreDetails: Schema.optional(ContentGenreTargetingOptionDetails),
})).annotate({ identifier: "TargetingOption" }) as any as Schema.Schema<TargetingOption>;

export interface ListTargetingOptionsResponse {
  /** The list of targeting options. This list will be absent if empty. */
  targetingOptions?: Array<TargetingOption>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListTargetingOptions` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListTargetingOptionsResponse: Schema.Schema<ListTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  targetingOptions: Schema.optional(Schema.Array(TargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTargetingOptionsResponse" }) as any as Schema.Schema<ListTargetingOptionsResponse>;

export interface PoiSearchTerms {
  /** The search query for the desired POI name, street address, or coordinate of the desired POI. The query can be a prefix, e.g. "Times squar", "40.7505045,-73.99562", "315 W 44th St", etc. */
  poiQuery?: string;
}

export const PoiSearchTerms: Schema.Schema<PoiSearchTerms> = Schema.suspend(() => Schema.Struct({
  poiQuery: Schema.optional(Schema.String),
})).annotate({ identifier: "PoiSearchTerms" }) as any as Schema.Schema<PoiSearchTerms>;

export interface BusinessChainSearchTerms {
  /** The search query for the desired business chain. The query must be the full name of the business, e.g. "KFC", "mercedes-benz". */
  businessChainQuery?: string;
  /** The search query for the desired geo region, e.g. "Seattle", "United State". */
  regionQuery?: string;
}

export const BusinessChainSearchTerms: Schema.Schema<BusinessChainSearchTerms> = Schema.suspend(() => Schema.Struct({
  businessChainQuery: Schema.optional(Schema.String),
  regionQuery: Schema.optional(Schema.String),
})).annotate({ identifier: "BusinessChainSearchTerms" }) as any as Schema.Schema<BusinessChainSearchTerms>;

export interface GeoRegionSearchTerms {
  /** The search query for the desired geo region. The query can be a prefix, e.g. "New Yor", "Seattle", "USA", etc. */
  geoRegionQuery?: string;
}

export const GeoRegionSearchTerms: Schema.Schema<GeoRegionSearchTerms> = Schema.suspend(() => Schema.Struct({
  geoRegionQuery: Schema.optional(Schema.String),
})).annotate({ identifier: "GeoRegionSearchTerms" }) as any as Schema.Schema<GeoRegionSearchTerms>;

export interface SearchTargetingOptionsRequest {
  /** Required. The Advertiser this request is being made in the context of. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `SearchTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Search terms for POI targeting options. Can only be used when targeting_type is `TARGETING_TYPE_POI`. */
  poiSearchTerms?: PoiSearchTerms;
  /** Search terms for Business Chain targeting options. Can only be used when targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`. */
  businessChainSearchTerms?: BusinessChainSearchTerms;
  /** Search terms for geo region targeting options. Can only be used when targeting_type is `TARGETING_TYPE_GEO_REGION`. */
  geoRegionSearchTerms?: GeoRegionSearchTerms;
}

export const SearchTargetingOptionsRequest: Schema.Schema<SearchTargetingOptionsRequest> = Schema.suspend(() => Schema.Struct({
  advertiserId: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  poiSearchTerms: Schema.optional(PoiSearchTerms),
  businessChainSearchTerms: Schema.optional(BusinessChainSearchTerms),
  geoRegionSearchTerms: Schema.optional(GeoRegionSearchTerms),
})).annotate({ identifier: "SearchTargetingOptionsRequest" }) as any as Schema.Schema<SearchTargetingOptionsRequest>;

export interface SearchTargetingOptionsResponse {
  /** The list of targeting options that match the search criteria. This list will be absent if empty. */
  targetingOptions?: Array<TargetingOption>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `SearchTargetingOptions` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const SearchTargetingOptionsResponse: Schema.Schema<SearchTargetingOptionsResponse> = Schema.suspend(() => Schema.Struct({
  targetingOptions: Schema.optional(Schema.Array(TargetingOption)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchTargetingOptionsResponse" }) as any as Schema.Schema<SearchTargetingOptionsResponse>;

export interface AssignedUserRole {
  /** Output only. The ID of the assigned user role. */
  assignedUserRoleId?: string;
  /** The ID of the partner that the assigned user role applies to. */
  partnerId?: string;
  /** The ID of the advertiser that the assigend user role applies to. */
  advertiserId?: string;
  /** Required. The user role to assign to a user for the entity. */
  userRole?: "USER_ROLE_UNSPECIFIED" | "ADMIN" | "ADMIN_PARTNER_CLIENT" | "STANDARD" | "STANDARD_PLANNER" | "STANDARD_PLANNER_LIMITED" | "STANDARD_PARTNER_CLIENT" | "READ_ONLY" | "REPORTING_ONLY" | "LIMITED_REPORTING_ONLY" | "CREATIVE" | "CREATIVE_ADMIN" | (string & {});
}

export const AssignedUserRole: Schema.Schema<AssignedUserRole> = Schema.suspend(() => Schema.Struct({
  assignedUserRoleId: Schema.optional(Schema.String),
  partnerId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  userRole: Schema.optional(Schema.String),
})).annotate({ identifier: "AssignedUserRole" }) as any as Schema.Schema<AssignedUserRole>;

export interface User {
  /** Output only. The resource name of the user. */
  name?: string;
  /** Output only. The unique ID of the user. Assigned by the system. */
  userId?: string;
  /** Required. Immutable. The email address used to identify the user. */
  email?: string;
  /** Required. The display name of the user. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** The assigned user roles. Required in CreateUser. Output only in UpdateUser. Can only be updated through BulkEditAssignedUserRoles. */
  assignedUserRoles?: Array<AssignedUserRole>;
  /** Output only. The timestamp when the user last logged in DV360 UI. */
  lastLoginTime?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  assignedUserRoles: Schema.optional(Schema.Array(AssignedUserRole)),
  lastLoginTime: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface ListUsersResponse {
  /** The list of users. This list will be absent if empty. */
  users?: Array<User>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListUsers` method to retrieve the next page of results. This token will be absent if there are no more results to return. */
  nextPageToken?: string;
}

export const ListUsersResponse: Schema.Schema<ListUsersResponse> = Schema.suspend(() => Schema.Struct({
  users: Schema.optional(Schema.Array(User)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUsersResponse" }) as any as Schema.Schema<ListUsersResponse>;

export interface BulkEditAssignedUserRolesRequest {
  /** The assigned user roles to delete in batch, specified as a list of assigned_user_role_ids. The format of assigned_user_role_id is `entityType-entityid`, for example `partner-123`. */
  deletedAssignedUserRoles?: Array<string>;
  /** The assigned user roles to create in batch, specified as a list of AssignedUserRoles. */
  createdAssignedUserRoles?: Array<AssignedUserRole>;
}

export const BulkEditAssignedUserRolesRequest: Schema.Schema<BulkEditAssignedUserRolesRequest> = Schema.suspend(() => Schema.Struct({
  deletedAssignedUserRoles: Schema.optional(Schema.Array(Schema.String)),
  createdAssignedUserRoles: Schema.optional(Schema.Array(AssignedUserRole)),
})).annotate({ identifier: "BulkEditAssignedUserRolesRequest" }) as any as Schema.Schema<BulkEditAssignedUserRolesRequest>;

export interface BulkEditAssignedUserRolesResponse {
  /** The list of assigned user roles that have been successfully created. This list will be absent if empty. */
  createdAssignedUserRoles?: Array<AssignedUserRole>;
}

export const BulkEditAssignedUserRolesResponse: Schema.Schema<BulkEditAssignedUserRolesResponse> = Schema.suspend(() => Schema.Struct({
  createdAssignedUserRoles: Schema.optional(Schema.Array(AssignedUserRole)),
})).annotate({ identifier: "BulkEditAssignedUserRolesResponse" }) as any as Schema.Schema<BulkEditAssignedUserRolesResponse>;

export interface YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction {
  /** Optional. The business name to match with. This field is optional and can only be set if location_matching_type is `FILTER`. */
  business?: string;
  /** Optional. The labels to match with. Labels are logically OR'ed together. This field is optional and can only be set if location_matching_type is `FILTER`. */
  labels?: Array<string>;
  /** Optional. The selected location asset IDs. This field is required if location_matching_type is `SELECTED_ASSETS`. */
  locationAssetIds?: Array<string>;
}

export const YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction: Schema.Schema<YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction> = Schema.suspend(() => Schema.Struct({
  business: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(Schema.String)),
  locationAssetIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction" }) as any as Schema.Schema<YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction>;

export interface YoutubeAssetAssociationLocationAssetFilter {
  /** Required. The matching type of this location asset filter. */
  locationMatchingType?: "LOCATION_MATCHING_TYPE_UNSPECIFIED" | "SELECT_ALL" | "FILTER" | "SELECTED_ASSETS" | "DISABLED" | (string & {});
  /** Output only. The ID of the asset set that matches the location assets eligible for serving. */
  assetSetId?: string;
  /** Optional. The matching function that determines how the location asset filter matches location assets. This field is required and can only be set for if location_matching_type is `FILTER` or `SELECTED_ASSETS`. */
  locationMatchingFunction?: YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction;
}

export const YoutubeAssetAssociationLocationAssetFilter: Schema.Schema<YoutubeAssetAssociationLocationAssetFilter> = Schema.suspend(() => Schema.Struct({
  locationMatchingType: Schema.optional(Schema.String),
  assetSetId: Schema.optional(Schema.String),
  locationMatchingFunction: Schema.optional(YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction),
})).annotate({ identifier: "YoutubeAssetAssociationLocationAssetFilter" }) as any as Schema.Schema<YoutubeAssetAssociationLocationAssetFilter>;

export interface YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain {
  /** Required. ID of the affiliate location chain. */
  chainId?: string;
}

export const YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain: Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain> = Schema.suspend(() => Schema.Struct({
  chainId: Schema.optional(Schema.String),
})).annotate({ identifier: "YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain" }) as any as Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain>;

export interface YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction {
  /** Optional. The selected affiliate location chain IDs. This field is required if affiliate_location_matching_type is `SELECTED_CHAINS`. */
  chains?: Array<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain>;
}

export const YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction: Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction> = Schema.suspend(() => Schema.Struct({
  chains: Schema.optional(Schema.Array(YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain)),
})).annotate({ identifier: "YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction" }) as any as Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction>;

export interface YoutubeAssetAssociationAffiliateLocationAssetFilter {
  /** Required. The matching type of this affiliate location asset filter. */
  affiliateLocationMatchingType?: "AFFILIATE_LOCATION_MATCHING_TYPE_UNSPECIFIED" | "SELECT_ALL" | "SELECTED_CHAINS" | "DISABLED" | (string & {});
  /** Output only. The ID of the asset set that matches the affiliate location assets eligible for serving. */
  assetSetId?: string;
  /** Optional. The matching function that determines how the affiliate location asset filter matches affiliate location assets. This field is required and can only be set for if affiliate_location_matching_type is `SELECTED_CHAINS`. */
  affiliateLocationMatchingFunction?: YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction;
}

export const YoutubeAssetAssociationAffiliateLocationAssetFilter: Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilter> = Schema.suspend(() => Schema.Struct({
  affiliateLocationMatchingType: Schema.optional(Schema.String),
  assetSetId: Schema.optional(Schema.String),
  affiliateLocationMatchingFunction: Schema.optional(YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction),
})).annotate({ identifier: "YoutubeAssetAssociationAffiliateLocationAssetFilter" }) as any as Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilter>;

export interface YoutubeAssetAssociationSitelinkAsset {
  /** Required. ID of the sitelink asset. */
  assetId?: string;
}

export const YoutubeAssetAssociationSitelinkAsset: Schema.Schema<YoutubeAssetAssociationSitelinkAsset> = Schema.suspend(() => Schema.Struct({
  assetId: Schema.optional(Schema.String),
})).annotate({ identifier: "YoutubeAssetAssociationSitelinkAsset" }) as any as Schema.Schema<YoutubeAssetAssociationSitelinkAsset>;

export interface YoutubeAssetAssociationLinkedYouTubeAsset {
  /** A location asset filter. This can be set only when youtube_asset_type is `YOUTUBE_ASSET_TYPE_LOCATION`. */
  locationAssetFilter?: YoutubeAssetAssociationLocationAssetFilter;
  /** An affiliate location asset filter. This can be set only when youtube_asset_type is `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION`. */
  affiliateLocationAssetFilter?: YoutubeAssetAssociationAffiliateLocationAssetFilter;
  /** A sitelink asset. This can be set only when youtube_asset_type is `YOUTUBE_ASSET_TYPE_SITELINK`. */
  sitelinkAsset?: YoutubeAssetAssociationSitelinkAsset;
}

export const YoutubeAssetAssociationLinkedYouTubeAsset: Schema.Schema<YoutubeAssetAssociationLinkedYouTubeAsset> = Schema.suspend(() => Schema.Struct({
  locationAssetFilter: Schema.optional(YoutubeAssetAssociationLocationAssetFilter),
  affiliateLocationAssetFilter: Schema.optional(YoutubeAssetAssociationAffiliateLocationAssetFilter),
  sitelinkAsset: Schema.optional(YoutubeAssetAssociationSitelinkAsset),
})).annotate({ identifier: "YoutubeAssetAssociationLinkedYouTubeAsset" }) as any as Schema.Schema<YoutubeAssetAssociationLinkedYouTubeAsset>;

export interface YoutubeAssetAssociation {
  /** Identifier. The resource name of the association. For line item-level associations: The name pattern is `advertisers/{advertiser_id}/lineItems/{line_item_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For ad group-level associations: The name pattern is `advertisers/{advertiser_id}/adGroups/{ad_group_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: `youtube_asset_association_id` is the ID of the asset set linked, or 0 if the location_matching_type or affiliate_location_matching_type is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: `youtube_asset_association_id` is be the ID of the sitelink asset linked. */
  name?: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType?: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** Required. The YouTube asset associated with the resource. */
  linkedYoutubeAsset?: YoutubeAssetAssociationLinkedYouTubeAsset;
}

export const YoutubeAssetAssociation: Schema.Schema<YoutubeAssetAssociation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  youtubeAssetType: Schema.optional(Schema.String),
  linkedYoutubeAsset: Schema.optional(YoutubeAssetAssociationLinkedYouTubeAsset),
})).annotate({ identifier: "YoutubeAssetAssociation" }) as any as Schema.Schema<YoutubeAssetAssociation>;

export interface ListYoutubeAssetAssociationsResponse {
  /** The list of asset associations. This list will be absent if empty. */
  youtubeAssetAssociations?: Array<YoutubeAssetAssociation>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListYoutubeAssetAssociations` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListYoutubeAssetAssociationsResponse: Schema.Schema<ListYoutubeAssetAssociationsResponse> = Schema.suspend(() => Schema.Struct({
  youtubeAssetAssociations: Schema.optional(Schema.Array(YoutubeAssetAssociation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListYoutubeAssetAssociationsResponse" }) as any as Schema.Schema<ListYoutubeAssetAssociationsResponse>;

export interface GoogleBytestreamMedia {
  /** Name of the media resource. */
  resourceName?: string;
}

export const GoogleBytestreamMedia: Schema.Schema<GoogleBytestreamMedia> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBytestreamMedia" }) as any as Schema.Schema<GoogleBytestreamMedia>;

export interface SdfDownloadTaskMetadata {
  /** The time when the operation was created. */
  createTime?: string;
  /** The time when execution was completed. */
  endTime?: string;
  /** The SDF version used to execute this download task. */
  version?: "SDF_VERSION_UNSPECIFIED" | "SDF_VERSION_3_1" | "SDF_VERSION_4" | "SDF_VERSION_4_1" | "SDF_VERSION_4_2" | "SDF_VERSION_5" | "SDF_VERSION_5_1" | "SDF_VERSION_5_2" | "SDF_VERSION_5_3" | "SDF_VERSION_5_4" | "SDF_VERSION_5_5" | "SDF_VERSION_6" | "SDF_VERSION_7" | "SDF_VERSION_7_1" | "SDF_VERSION_8" | "SDF_VERSION_8_1" | "SDF_VERSION_9" | "SDF_VERSION_9_1" | "SDF_VERSION_9_2" | (string & {});
}

export const SdfDownloadTaskMetadata: Schema.Schema<SdfDownloadTaskMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "SdfDownloadTaskMetadata" }) as any as Schema.Schema<SdfDownloadTaskMetadata>;

export interface SdfDownloadTask {
  /** A resource name to be used in media.download to Download the prepared files. Resource names have the format `download/sdfdownloadtasks/media/{media_id}`. `media_id` will be made available by the long running operation service once the task status is done. */
  resourceName?: string;
}

export const SdfDownloadTask: Schema.Schema<SdfDownloadTask> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "SdfDownloadTask" }) as any as Schema.Schema<SdfDownloadTask>;

export interface AlgorithmRulesSignal {
  /** Signal based on impressions. */
  impressionSignal?: "IMPRESSION_SIGNAL_UNSPECIFIED" | "DAY_AND_TIME" | "DEVICE_TYPE" | "AD_POSITION" | "OPERATING_SYSTEM_ID" | "MOBILE_MODEL_ID" | "EXCHANGE" | "ENVIRONMENT" | "COUNTRY_ID" | "CITY_ID" | "BROWSER_ID" | "CREATIVE_DIMENSION" | "VIDEO_CONTENT_DURATION_BUCKET" | "VIDEO_DELIVERY_TYPE" | "VIDEO_GENRE_ID" | (string & {});
  /** Signal based on clicks. This field is only supported for allowlisted partners. */
  clickSignal?: "CLICK_SIGNAL_UNSPECIFIED" | "CLICK" | (string & {});
  /** Signal based on active views. This field is only supported for allowlisted partners. */
  activeViewSignal?: "ACTIVE_VIEW_SIGNAL_UNSPECIFIED" | "ACTIVE_VIEW_VIEWED" | "AUDIBLE" | "VIDEO_COMPLETED" | "TIME_ON_SCREEN" | "VIDEO_PLAYER_SIZE" | "COMPLETED_IN_VIEW_AUDIBLE" | (string & {});
}

export const AlgorithmRulesSignal: Schema.Schema<AlgorithmRulesSignal> = Schema.suspend(() => Schema.Struct({
  impressionSignal: Schema.optional(Schema.String),
  clickSignal: Schema.optional(Schema.String),
  activeViewSignal: Schema.optional(Schema.String),
})).annotate({ identifier: "AlgorithmRulesSignal" }) as any as Schema.Schema<AlgorithmRulesSignal>;

export interface DayAndTime {
  /** Required. Day of the week. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. Hour of the day. */
  hourOfDay?: number;
  /** Required. The mechanism used to determine the relevant timezone. */
  timeZoneResolution?: "TIME_ZONE_RESOLUTION_UNSPECIFIED" | "TIME_ZONE_RESOLUTION_END_USER" | "TIME_ZONE_RESOLUTION_ADVERTISER" | (string & {});
}

export const DayAndTime: Schema.Schema<DayAndTime> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  hourOfDay: Schema.optional(Schema.Number),
  timeZoneResolution: Schema.optional(Schema.String),
})).annotate({ identifier: "DayAndTime" }) as any as Schema.Schema<DayAndTime>;

export interface AlgorithmRulesComparisonValue {
  /** Integer value. */
  int64Value?: string;
  /** Double value. */
  doubleValue?: number;
  /** String value. */
  stringValue?: string;
  /** Boolean value. */
  boolValue?: boolean;
  /** Creative dimension value. */
  creativeDimensionValue?: Dimensions;
  /** Day and time value. Only `TIME_ZONE_RESOLUTION_END_USER` is supported. */
  dayAndTimeValue?: DayAndTime;
  /** Device type value. */
  deviceTypeValue?: "RULE_DEVICE_TYPE_UNSPECIFIED" | "RULE_DEVICE_TYPE_COMPUTER" | "RULE_DEVICE_TYPE_CONNECTED_TV" | "RULE_DEVICE_TYPE_SMART_PHONE" | "RULE_DEVICE_TYPE_TABLET" | "RULE_DEVICE_TYPE_CONNECTED_DEVICE" | "RULE_DEVICE_TYPE_SET_TOP_BOX" | (string & {});
  /** Ad position value. */
  onScreenPositionValue?: "ON_SCREEN_POSITION_UNSPECIFIED" | "ON_SCREEN_POSITION_UNKNOWN" | "ON_SCREEN_POSITION_ABOVE_THE_FOLD" | "ON_SCREEN_POSITION_BELOW_THE_FOLD" | (string & {});
  /** Environment value. */
  environmentValue?: "ENVIRONMENT_UNSPECIFIED" | "ENVIRONMENT_WEB_OPTIMIZED" | "ENVIRONMENT_WEB_NOT_OPTIMIZED" | "ENVIRONMENT_APP" | (string & {});
  /** Exchange value. */
  exchangeValue?: "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX" | "EXCHANGE_RESET_DIGITAL" | "EXCHANGE_HIVESTACK" | "EXCHANGE_DRAX" | "EXCHANGE_APPLOVIN_GBID" | "EXCHANGE_FYBER_GBID" | "EXCHANGE_UNITY_GBID" | "EXCHANGE_CHARTBOOST_GBID" | "EXCHANGE_ADMOST_GBID" | "EXCHANGE_TOPON_GBID" | "EXCHANGE_NETFLIX" | "EXCHANGE_CORE" | "EXCHANGE_COMMERCE_GRID" | "EXCHANGE_SPOTIFY" | "EXCHANGE_TUBI" | "EXCHANGE_SNAP" | "EXCHANGE_CADENT" | (string & {});
  /** Video content duration value. */
  contentDurationValue?: "CONTENT_DURATION_UNSPECIFIED" | "CONTENT_DURATION_UNKNOWN" | "CONTENT_DURATION_0_TO_1_MIN" | "CONTENT_DURATION_1_TO_5_MIN" | "CONTENT_DURATION_5_TO_15_MIN" | "CONTENT_DURATION_15_TO_30_MIN" | "CONTENT_DURATION_30_TO_60_MIN" | "CONTENT_DURATION_OVER_60_MIN" | (string & {});
  /** Video delivery type value. */
  contentStreamTypeValue?: "CONTENT_STREAM_TYPE_UNSPECIFIED" | "CONTENT_LIVE_STREAM" | "CONTENT_ON_DEMAND" | (string & {});
  /** Video genre id value. */
  contentGenreIdValue?: string;
  /** Video player size value. This field is only supported for allowlisted partners. */
  videoPlayerSizeValue?: "VIDEO_PLAYER_SIZE_UNSPECIFIED" | "VIDEO_PLAYER_SIZE_SMALL" | "VIDEO_PLAYER_SIZE_LARGE" | "VIDEO_PLAYER_SIZE_HD" | "VIDEO_PLAYER_SIZE_UNKNOWN" | (string & {});
}

export const AlgorithmRulesComparisonValue: Schema.Schema<AlgorithmRulesComparisonValue> = Schema.suspend(() => Schema.Struct({
  int64Value: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
  creativeDimensionValue: Schema.optional(Dimensions),
  dayAndTimeValue: Schema.optional(DayAndTime),
  deviceTypeValue: Schema.optional(Schema.String),
  onScreenPositionValue: Schema.optional(Schema.String),
  environmentValue: Schema.optional(Schema.String),
  exchangeValue: Schema.optional(Schema.String),
  contentDurationValue: Schema.optional(Schema.String),
  contentStreamTypeValue: Schema.optional(Schema.String),
  contentGenreIdValue: Schema.optional(Schema.String),
  videoPlayerSizeValue: Schema.optional(Schema.String),
})).annotate({ identifier: "AlgorithmRulesComparisonValue" }) as any as Schema.Schema<AlgorithmRulesComparisonValue>;

export interface AlgorithmRulesSignalComparison {
  /** Signal to compare. */
  signal?: AlgorithmRulesSignal;
  /** Operator used to compare the two values. In the resulting experession, the `signal` will be the first value and the `comparisonValue will be the second. */
  comparisonOperator?: "COMPARISON_OPERATOR_UNSPECIFIED" | "EQUAL" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL_TO" | "LESS_THAN_OR_EQUAL_TO" | "LIST_CONTAINS" | (string & {});
  /** Value to compare signal to. */
  comparisonValue?: AlgorithmRulesComparisonValue;
}

export const AlgorithmRulesSignalComparison: Schema.Schema<AlgorithmRulesSignalComparison> = Schema.suspend(() => Schema.Struct({
  signal: Schema.optional(AlgorithmRulesSignal),
  comparisonOperator: Schema.optional(Schema.String),
  comparisonValue: Schema.optional(AlgorithmRulesComparisonValue),
})).annotate({ identifier: "AlgorithmRulesSignalComparison" }) as any as Schema.Schema<AlgorithmRulesSignalComparison>;

export interface AlgorithmRulesFloodlightActivityConversionSignal {
  /** Required. Id of the floodlight activity. */
  floodlightActivityId?: string;
  /** Required. The way to acquire value from the floodlight activity, for example, count of the conversion. */
  countingMethod?: "COUNTING_METHOD_UNSPECIFIED" | "CONVERSIONS_COUNT" | "SALES_QUANTITY" | "SALES_VALUE" | "UNIQUE_COUNT" | (string & {});
  /** Required. The type of conversions to be used in impression value computation, for example, post-click conversions. */
  conversionCounting?: "CONVERSION_COUNTING_UNSPECIFIED" | "ALL_CONVERSIONS" | "POST_CLICK" | "POST_VIEW" | (string & {});
}

export const AlgorithmRulesFloodlightActivityConversionSignal: Schema.Schema<AlgorithmRulesFloodlightActivityConversionSignal> = Schema.suspend(() => Schema.Struct({
  floodlightActivityId: Schema.optional(Schema.String),
  countingMethod: Schema.optional(Schema.String),
  conversionCounting: Schema.optional(Schema.String),
})).annotate({ identifier: "AlgorithmRulesFloodlightActivityConversionSignal" }) as any as Schema.Schema<AlgorithmRulesFloodlightActivityConversionSignal>;

export interface AlgorithmRulesSignalValue {
  /** Signal based on active views. Only `TIME_ON_SCREEN` is supported. This field is only supported for allowlisted partners. */
  activeViewSignal?: "ACTIVE_VIEW_SIGNAL_UNSPECIFIED" | "ACTIVE_VIEW_VIEWED" | "AUDIBLE" | "VIDEO_COMPLETED" | "TIME_ON_SCREEN" | "VIDEO_PLAYER_SIZE" | "COMPLETED_IN_VIEW_AUDIBLE" | (string & {});
  /** Signal based on floodlight conversion events. This field is only supported for allowlisted partners. */
  floodlightActivityConversionSignal?: AlgorithmRulesFloodlightActivityConversionSignal;
  /** Value to use as result. */
  number?: number;
}

export const AlgorithmRulesSignalValue: Schema.Schema<AlgorithmRulesSignalValue> = Schema.suspend(() => Schema.Struct({
  activeViewSignal: Schema.optional(Schema.String),
  floodlightActivityConversionSignal: Schema.optional(AlgorithmRulesFloodlightActivityConversionSignal),
  number: Schema.optional(Schema.Number),
})).annotate({ identifier: "AlgorithmRulesSignalValue" }) as any as Schema.Schema<AlgorithmRulesSignalValue>;

export interface AlgorithmRulesRuleCondition {
  /** List of comparisons that build `if` statement condition. The comparisons are combined into a single condition with `AND` logical operators. */
  signalComparisons?: Array<AlgorithmRulesSignalComparison>;
  /** The value returned if the `signalComparisons` condition evaluates to `TRUE`. */
  returnValue?: AlgorithmRulesSignalValue;
}

export const AlgorithmRulesRuleCondition: Schema.Schema<AlgorithmRulesRuleCondition> = Schema.suspend(() => Schema.Struct({
  signalComparisons: Schema.optional(Schema.Array(AlgorithmRulesSignalComparison)),
  returnValue: Schema.optional(AlgorithmRulesSignalValue),
})).annotate({ identifier: "AlgorithmRulesRuleCondition" }) as any as Schema.Schema<AlgorithmRulesRuleCondition>;

export interface AlgorithmRulesRule {
  /** List of conditions in this rule. The criteria among conditions should be mutually exclusive. */
  conditions?: Array<AlgorithmRulesRuleCondition>;
  /** The default return value applied when none of the conditions are met. */
  defaultReturnValue?: AlgorithmRulesSignalValue;
}

export const AlgorithmRulesRule: Schema.Schema<AlgorithmRulesRule> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Array(AlgorithmRulesRuleCondition)),
  defaultReturnValue: Schema.optional(AlgorithmRulesSignalValue),
})).annotate({ identifier: "AlgorithmRulesRule" }) as any as Schema.Schema<AlgorithmRulesRule>;

export interface AlgorithmRulesRuleset {
  /** List of rules to generate the impression value. */
  rules?: Array<AlgorithmRulesRule>;
  /** How to aggregate values of evaluated rules. */
  aggregationType?: "RULE_AGGREGATION_TYPE_UNSPECIFIED" | "SUM_OF_VALUES" | "PRODUCT_OF_VALUES" | "MAXIMUM_VALUE" | (string & {});
  /** Maximum value the ruleset can evaluate to. */
  maxValue?: number;
}

export const AlgorithmRulesRuleset: Schema.Schema<AlgorithmRulesRuleset> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(AlgorithmRulesRule)),
  aggregationType: Schema.optional(Schema.String),
  maxValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "AlgorithmRulesRuleset" }) as any as Schema.Schema<AlgorithmRulesRuleset>;

export interface AlgorithmRules {
  /** Rules for the impression signals. */
  impressionSignalRuleset?: AlgorithmRulesRuleset;
  /** Rules for the post-impression signals. This field is only supported for allowlisted partners. */
  postImpressionSignalRuleset?: AlgorithmRulesRuleset;
  /** Attribution model for the algorithm. This field is only supported for allowlisted partners. */
  attributionModelId?: string;
}

export const AlgorithmRules: Schema.Schema<AlgorithmRules> = Schema.suspend(() => Schema.Struct({
  impressionSignalRuleset: Schema.optional(AlgorithmRulesRuleset),
  postImpressionSignalRuleset: Schema.optional(AlgorithmRulesRuleset),
  attributionModelId: Schema.optional(Schema.String),
})).annotate({ identifier: "AlgorithmRules" }) as any as Schema.Schema<AlgorithmRules>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists assigned targeting options of an advertiser across targeting types. */
export interface ListAssignedTargetingOptionsAdvertisersRequest {
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is '5000'. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to `BulkListAdvertiserAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `targetingType` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=) operator`. Supported fields: * `targetingType` Examples: * targetingType with value TARGETING_TYPE_CHANNEL `targetingType="TARGETING_TYPE_CHANNEL"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAssignedTargetingOptionsAdvertisersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}:listAssignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<ListAssignedTargetingOptionsAdvertisersRequest>;

export type ListAssignedTargetingOptionsAdvertisersResponse = BulkListAdvertiserAssignedTargetingOptionsResponse;
export const ListAssignedTargetingOptionsAdvertisersResponse = BulkListAdvertiserAssignedTargetingOptionsResponse;

export type ListAssignedTargetingOptionsAdvertisersError = CommonErrors;

export const listAssignedTargetingOptionsAdvertisers = API.makePaginated(() => ({
  input: ListAssignedTargetingOptionsAdvertisersRequest,
  output: ListAssignedTargetingOptionsAdvertisersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Edits targeting options under a single advertiser. The operation will delete the assigned targeting options provided in BulkEditAdvertiserAssignedTargetingOptionsRequest.delete_requests and then create the assigned targeting options provided in BulkEditAdvertiserAssignedTargetingOptionsRequest.create_requests . */
export interface EditAssignedTargetingOptionsAdvertisersRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Request body */
  body?: BulkEditAdvertiserAssignedTargetingOptionsRequest;
}

export const EditAssignedTargetingOptionsAdvertisersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(BulkEditAdvertiserAssignedTargetingOptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}:editAssignedTargetingOptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EditAssignedTargetingOptionsAdvertisersRequest>;

export type EditAssignedTargetingOptionsAdvertisersResponse = BulkEditAdvertiserAssignedTargetingOptionsResponse;
export const EditAssignedTargetingOptionsAdvertisersResponse = BulkEditAdvertiserAssignedTargetingOptionsResponse;

export type EditAssignedTargetingOptionsAdvertisersError = CommonErrors;

export const editAssignedTargetingOptionsAdvertisers: API.OperationMethod<EditAssignedTargetingOptionsAdvertisersRequest, EditAssignedTargetingOptionsAdvertisersResponse, EditAssignedTargetingOptionsAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EditAssignedTargetingOptionsAdvertisersRequest,
  output: EditAssignedTargetingOptionsAdvertisersResponse,
  errors: [],
}));

/** Gets an advertiser. */
export interface GetAdvertisersRequest {
  /** Required. The ID of the advertiser to fetch. */
  advertiserId: string;
}

export const GetAdvertisersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersRequest>;

export type GetAdvertisersResponse = Advertiser;
export const GetAdvertisersResponse = Advertiser;

export type GetAdvertisersError = CommonErrors;

export const getAdvertisers: API.OperationMethod<GetAdvertisersRequest, GetAdvertisersResponse, GetAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersRequest,
  output: GetAdvertisersResponse,
  errors: [],
}));

/** Lists advertisers that are accessible to the current user. The order is defined by the order_by parameter. A single partner_id is required. Cross-partner listing is not supported. */
export interface ListAdvertisersRequest {
  /** Required. The ID of the partner that the fetched advertisers should all belong to. The system only supports listing advertisers for one partner at a time. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdvertisers` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `advertiserId` (default) * `displayName` * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by advertiser fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `advertiserId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All active advertisers under a partner: `entityStatus="ENTITY_STATUS_ACTIVE"` * All advertisers with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All advertisers with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersRequest>;

export type ListAdvertisersResponse_Op = ListAdvertisersResponse;
export const ListAdvertisersResponse_Op = ListAdvertisersResponse;

export type ListAdvertisersError = CommonErrors;

export const listAdvertisers = API.makePaginated(() => ({
  input: ListAdvertisersRequest,
  output: ListAdvertisersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new advertiser. Returns the newly created advertiser if successful. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export interface CreateAdvertisersRequest {
  /** Request body */
  body?: Advertiser;
}

export const CreateAdvertisersRequest = Schema.Struct({
  body: Schema.optional(Advertiser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersRequest>;

export type CreateAdvertisersResponse = Advertiser;
export const CreateAdvertisersResponse = Advertiser;

export type CreateAdvertisersError = CommonErrors;

export const createAdvertisers: API.OperationMethod<CreateAdvertisersRequest, CreateAdvertisersResponse, CreateAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersRequest,
  output: CreateAdvertisersResponse,
  errors: [],
}));

/** Updates an existing advertiser. Returns the updated advertiser if successful. */
export interface PatchAdvertisersRequest {
  /** Output only. The unique ID of the advertiser. Assigned by the system. */
  advertiserId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Advertiser;
}

export const PatchAdvertisersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Advertiser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersRequest>;

export type PatchAdvertisersResponse = Advertiser;
export const PatchAdvertisersResponse = Advertiser;

export type PatchAdvertisersError = CommonErrors;

export const patchAdvertisers: API.OperationMethod<PatchAdvertisersRequest, PatchAdvertisersResponse, PatchAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersRequest,
  output: PatchAdvertisersResponse,
  errors: [],
}));

/** Deletes an advertiser. Deleting an advertiser will delete all of its child resources, for example, campaigns, insertion orders and line items. A deleted advertiser cannot be recovered. */
export interface DeleteAdvertisersRequest {
  /** The ID of the advertiser we need to delete. */
  advertiserId: string;
}

export const DeleteAdvertisersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersRequest>;

export type DeleteAdvertisersResponse = Empty;
export const DeleteAdvertisersResponse = Empty;

export type DeleteAdvertisersError = CommonErrors;

export const deleteAdvertisers: API.OperationMethod<DeleteAdvertisersRequest, DeleteAdvertisersResponse, DeleteAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersRequest,
  output: DeleteAdvertisersResponse,
  errors: [],
}));

/** Audits an advertiser. Returns the counts of used entities per resource type under the advertiser provided. Used entities count towards their respective resource limit. See https://support.google.com/displayvideo/answer/6071450. */
export interface AuditAdvertisersRequest {
  /** Required. The ID of the advertiser to audit. */
  advertiserId: string;
  /** Optional. The specific fields to return. If no mask is specified, all fields in the response proto will be filled. Valid values are: * usedLineItemsCount * usedInsertionOrdersCount * usedCampaignsCount * channelsCount * negativelyTargetedChannelsCount * negativeKeywordListsCount * adGroupCriteriaCount * campaignCriteriaCount */
  readMask?: string;
}

export const AuditAdvertisersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}:audit" }),
  svc,
) as unknown as Schema.Schema<AuditAdvertisersRequest>;

export type AuditAdvertisersResponse = AuditAdvertiserResponse;
export const AuditAdvertisersResponse = AuditAdvertiserResponse;

export type AuditAdvertisersError = CommonErrors;

export const auditAdvertisers: API.OperationMethod<AuditAdvertisersRequest, AuditAdvertisersResponse, AuditAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AuditAdvertisersRequest,
  output: AuditAdvertisersResponse,
  errors: [],
}));

/** Gets an ad asset. Only supports the retrieval of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export interface GetAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser this ad asset belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad asset to fetch. Only supports assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO` */
  adAssetId: string;
}

export const GetAdvertisersAdAssetsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adAssetId: Schema.String.pipe(T.HttpPath("adAssetId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adAssets/{adAssetsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersAdAssetsRequest>;

export type GetAdvertisersAdAssetsResponse = AdAsset;
export const GetAdvertisersAdAssetsResponse = AdAsset;

export type GetAdvertisersAdAssetsError = CommonErrors;

export const getAdvertisersAdAssets: API.OperationMethod<GetAdvertisersAdAssetsRequest, GetAdvertisersAdAssetsResponse, GetAdvertisersAdAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersAdAssetsRequest,
  output: GetAdvertisersAdAssetsResponse,
  errors: [],
}));

/** Lists ad assets under an advertiser ID. Only supports the retrieval of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export interface ListAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser the ad assets belong to. */
  advertiserId: string;
  /** Optional. Requested page size. Must be between `1` and `5000`. If unspecified will default to `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdAssets` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `entityStatus` * `youtubeVideoAsset.youtubeVideoId` * `adAssetId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `adAssetId desc`. */
  orderBy?: string;
  /** Optional. Allows filtering of the results by ad asset fields. Supported syntax: * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `youtubeVideoAsset.youtubeVideoId` * `entityStatus` Examples: * All active YouTube video ad assets under an advertiser: `entityStatus=ENTITY_STATUS_ACTIVE` */
  filter?: string;
}

export const ListAdvertisersAdAssetsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adAssets" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersAdAssetsRequest>;

export type ListAdvertisersAdAssetsResponse = ListAdAssetsResponse;
export const ListAdvertisersAdAssetsResponse = ListAdAssetsResponse;

export type ListAdvertisersAdAssetsError = CommonErrors;

export const listAdvertisersAdAssets = API.makePaginated(() => ({
  input: ListAdvertisersAdAssetsRequest,
  output: ListAdvertisersAdAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Uploads and creates an ad asset. Returns the ID of the newly-created ad asset if successful. Only supports the uploading of assets with the AdAssetType `AD_ASSET_TYPE_IMAGE`. */
export interface UploadAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser this ad asset belongs to. */
  advertiserId: string;
  /** Request body */
  body?: UploadAdAssetRequest;
}

export const UploadAdvertisersAdAssetsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(UploadAdAssetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/adAssets:uploadAdAsset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadAdvertisersAdAssetsRequest>;

export type UploadAdvertisersAdAssetsResponse = UploadAdAssetResponse;
export const UploadAdvertisersAdAssetsResponse = UploadAdAssetResponse;

export type UploadAdvertisersAdAssetsError = CommonErrors;

export const uploadAdvertisersAdAssets: API.OperationMethod<UploadAdvertisersAdAssetsRequest, UploadAdvertisersAdAssetsResponse, UploadAdvertisersAdAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadAdvertisersAdAssetsRequest,
  output: UploadAdvertisersAdAssetsResponse,
  errors: [],
}));

/** Creates an ad asset. Returns the newly-created ad asset if successful. Only supports the creation of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export interface CreateAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser this ad asset belongs to. */
  advertiserId: string;
  /** Request body */
  body?: CreateAdAssetRequest;
}

export const CreateAdvertisersAdAssetsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(CreateAdAssetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/adAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersAdAssetsRequest>;

export type CreateAdvertisersAdAssetsResponse = AdAsset;
export const CreateAdvertisersAdAssetsResponse = AdAsset;

export type CreateAdvertisersAdAssetsError = CommonErrors;

export const createAdvertisersAdAssets: API.OperationMethod<CreateAdvertisersAdAssetsRequest, CreateAdvertisersAdAssetsResponse, CreateAdvertisersAdAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersAdAssetsRequest,
  output: CreateAdvertisersAdAssetsResponse,
  errors: [],
}));

/** Creates multiple ad assets in a single request. Returns the newly-created ad assets if successful. Only supports the creation of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export interface BulkCreateAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser these ad assets belong to. */
  advertiserId: string;
  /** Request body */
  body?: BulkCreateAdAssetsRequest;
}

export const BulkCreateAdvertisersAdAssetsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(BulkCreateAdAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/adAssets:bulkCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkCreateAdvertisersAdAssetsRequest>;

export type BulkCreateAdvertisersAdAssetsResponse = BulkCreateAdAssetsResponse;
export const BulkCreateAdvertisersAdAssetsResponse = BulkCreateAdAssetsResponse;

export type BulkCreateAdvertisersAdAssetsError = CommonErrors;

export const bulkCreateAdvertisersAdAssets: API.OperationMethod<BulkCreateAdvertisersAdAssetsRequest, BulkCreateAdvertisersAdAssetsResponse, BulkCreateAdvertisersAdAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkCreateAdvertisersAdAssetsRequest,
  output: BulkCreateAdvertisersAdAssetsResponse,
  errors: [],
}));

/** Gets an ad group ad. */
export interface GetAdvertisersAdGroupAdsRequest {
  /** Required. The ID of the advertiser this ad group ad belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad to fetch. */
  adGroupAdId: string;
}

export const GetAdvertisersAdGroupAdsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupAdId: Schema.String.pipe(T.HttpPath("adGroupAdId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroupAds/{adGroupAdsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersAdGroupAdsRequest>;

export type GetAdvertisersAdGroupAdsResponse = AdGroupAd;
export const GetAdvertisersAdGroupAdsResponse = AdGroupAd;

export type GetAdvertisersAdGroupAdsError = CommonErrors;

export const getAdvertisersAdGroupAds: API.OperationMethod<GetAdvertisersAdGroupAdsRequest, GetAdvertisersAdGroupAdsResponse, GetAdvertisersAdGroupAdsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersAdGroupAdsRequest,
  output: GetAdvertisersAdGroupAdsResponse,
  errors: [],
}));

/** Lists ad group ads. */
export interface ListAdvertisersAdGroupAdsRequest {
  /** Required. The ID of the advertiser the ads belong to. */
  advertiserId: string;
  /** Optional. Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdGroupAds` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by ad group ad fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` and `OR`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `adGroupId` * `displayName` * `entityStatus` * `adGroupAdId` Examples: * All ad group ads under an ad group: `adGroupId="1234"` * All ad group ads under an ad group with an entityStatus of `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED`: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND adGroupId="12345"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersAdGroupAdsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroupAds" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersAdGroupAdsRequest>;

export type ListAdvertisersAdGroupAdsResponse = ListAdGroupAdsResponse;
export const ListAdvertisersAdGroupAdsResponse = ListAdGroupAdsResponse;

export type ListAdvertisersAdGroupAdsError = CommonErrors;

export const listAdvertisersAdGroupAds = API.makePaginated(() => ({
  input: ListAdvertisersAdGroupAdsRequest,
  output: ListAdvertisersAdGroupAdsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists assigned targeting options for multiple line items across targeting types. */
export interface BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser the line items belongs to. */
  advertiserId: string;
  /** Required. The IDs of the line items to list assigned targeting options for. */
  lineItemIds?: string[];
  /** Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to the `BulkListAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `lineItemId` (default) * `assignedTargetingOption.targetingType` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR` on the same field. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `targetingType` * `inheritance` Examples: * `AssignedTargetingOption` resources of targeting type `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` or `TARGETING_TYPE_CHANNEL`: `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR targetingType="TARGETING_TYPE_CHANNEL"` * `AssignedTargetingOption` resources with inheritance status of `NOT_INHERITED` or `INHERITED_FROM_PARTNER`: `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("lineItemIds")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems:bulkListAssignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest>;

export type BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse = BulkListAssignedTargetingOptionsResponse;
export const BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse = BulkListAssignedTargetingOptionsResponse;

export type BulkListAssignedTargetingOptionsAdvertisersLineItemsError = CommonErrors;

export const bulkListAssignedTargetingOptionsAdvertisersLineItems = API.makePaginated(() => ({
  input: BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest,
  output: BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Bulk edits targeting options under multiple line items. The operation will delete the assigned targeting options provided in BulkEditAssignedTargetingOptionsRequest.delete_requests and then create the assigned targeting options provided in BulkEditAssignedTargetingOptionsRequest.create_requests. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * lineItems.bulkUpdate * lineItems.patch * assignedTargetingOptions.create * assignedTargetingOptions.delete YouTube & Partners line items cannot be created or updated using the API. */
export interface BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser the line items belong to. */
  advertiserId: string;
  /** Request body */
  body?: BulkEditAssignedTargetingOptionsRequest;
}

export const BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(BulkEditAssignedTargetingOptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/lineItems:bulkEditAssignedTargetingOptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest>;

export type BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse = BulkEditAssignedTargetingOptionsResponse;
export const BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse = BulkEditAssignedTargetingOptionsResponse;

export type BulkEditAssignedTargetingOptionsAdvertisersLineItemsError = CommonErrors;

export const bulkEditAssignedTargetingOptionsAdvertisersLineItems: API.OperationMethod<BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest, BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse, BulkEditAssignedTargetingOptionsAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest,
  output: BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse,
  errors: [],
}));

/** Gets a line item. */
export interface GetAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item to fetch. */
  lineItemId: string;
}

export const GetAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersLineItemsRequest>;

export type GetAdvertisersLineItemsResponse = LineItem;
export const GetAdvertisersLineItemsResponse = LineItem;

export type GetAdvertisersLineItemsError = CommonErrors;

export const getAdvertisersLineItems: API.OperationMethod<GetAdvertisersLineItemsRequest, GetAdvertisersLineItemsResponse, GetAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersLineItemsRequest,
  output: GetAdvertisersLineItemsResponse,
  errors: [],
}));

/** Lists line items in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, line items with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export interface ListAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser to list line items for. */
  advertiserId: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItems` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by line item fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `insertionOrderId` * `lineItemId` * `lineItemType` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All line items under an insertion order: `insertionOrderId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` and `LINE_ITEM_TYPE_DISPLAY_DEFAULT` line items under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND lineItemType="LINE_ITEM_TYPE_DISPLAY_DEFAULT"` * All line items with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All line items with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersLineItemsRequest>;

export type ListAdvertisersLineItemsResponse = ListLineItemsResponse;
export const ListAdvertisersLineItemsResponse = ListLineItemsResponse;

export type ListAdvertisersLineItemsError = CommonErrors;

export const listAdvertisersLineItems = API.makePaginated(() => ({
  input: ListAdvertisersLineItemsRequest,
  output: ListAdvertisersLineItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new line item. Returns the newly created line item if successful. YouTube & Partners line items cannot be created or updated using the API. */
export interface CreateAdvertisersLineItemsRequest {
  /** Output only. The unique ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Request body */
  body?: LineItem;
}

export const CreateAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(LineItem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/lineItems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersLineItemsRequest>;

export type CreateAdvertisersLineItemsResponse = LineItem;
export const CreateAdvertisersLineItemsResponse = LineItem;

export type CreateAdvertisersLineItemsError = CommonErrors;

export const createAdvertisersLineItems: API.OperationMethod<CreateAdvertisersLineItemsRequest, CreateAdvertisersLineItemsResponse, CreateAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersLineItemsRequest,
  output: CreateAdvertisersLineItemsResponse,
  errors: [],
}));

/** Updates an existing line item. Returns the updated line item if successful. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * BulkEditAssignedTargetingOptions * BulkUpdateLineItems * assignedTargetingOptions.create * assignedTargetingOptions.delete YouTube & Partners line items cannot be created or updated using the API. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export interface PatchAdvertisersLineItemsRequest {
  /** Output only. The unique ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Output only. The unique ID of the line item. Assigned by the system. */
  lineItemId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: LineItem;
}

export const PatchAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LineItem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersLineItemsRequest>;

export type PatchAdvertisersLineItemsResponse = LineItem;
export const PatchAdvertisersLineItemsResponse = LineItem;

export type PatchAdvertisersLineItemsError = CommonErrors;

export const patchAdvertisersLineItems: API.OperationMethod<PatchAdvertisersLineItemsRequest, PatchAdvertisersLineItemsResponse, PatchAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersLineItemsRequest,
  output: PatchAdvertisersLineItemsResponse,
  errors: [],
}));

/** Deletes a line item. Returns error code `NOT_FOUND` if the line item does not exist. The line item should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it. YouTube & Partners line items cannot be created or updated using the API. */
export interface DeleteAdvertisersLineItemsRequest {
  /** The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** The ID of the line item to delete. */
  lineItemId: string;
}

export const DeleteAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersLineItemsRequest>;

export type DeleteAdvertisersLineItemsResponse = Empty;
export const DeleteAdvertisersLineItemsResponse = Empty;

export type DeleteAdvertisersLineItemsError = CommonErrors;

export const deleteAdvertisersLineItems: API.OperationMethod<DeleteAdvertisersLineItemsRequest, DeleteAdvertisersLineItemsResponse, DeleteAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersLineItemsRequest,
  output: DeleteAdvertisersLineItemsResponse,
  errors: [],
}));

/** Duplicates a line item. Returns the ID of the created line item if successful. YouTube & Partners line items cannot be created or updated using the API. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export interface DuplicateAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item to duplicate. */
  lineItemId: string;
  /** Request body */
  body?: DuplicateLineItemRequest;
}

export const DuplicateAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  body: Schema.optional(DuplicateLineItemRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}:duplicate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DuplicateAdvertisersLineItemsRequest>;

export type DuplicateAdvertisersLineItemsResponse = DuplicateLineItemResponse;
export const DuplicateAdvertisersLineItemsResponse = DuplicateLineItemResponse;

export type DuplicateAdvertisersLineItemsError = CommonErrors;

export const duplicateAdvertisersLineItems: API.OperationMethod<DuplicateAdvertisersLineItemsRequest, DuplicateAdvertisersLineItemsResponse, DuplicateAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DuplicateAdvertisersLineItemsRequest,
  output: DuplicateAdvertisersLineItemsResponse,
  errors: [],
}));

/** Updates multiple line items. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * BulkEditAssignedTargetingOptions * UpdateLineItem * assignedTargetingOptions.create * assignedTargetingOptions.delete YouTube & Partners line items cannot be created or updated using the API. */
export interface BulkUpdateAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** Request body */
  body?: BulkUpdateLineItemsRequest;
}

export const BulkUpdateAdvertisersLineItemsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(BulkUpdateLineItemsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/lineItems:bulkUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkUpdateAdvertisersLineItemsRequest>;

export type BulkUpdateAdvertisersLineItemsResponse = BulkUpdateLineItemsResponse;
export const BulkUpdateAdvertisersLineItemsResponse = BulkUpdateLineItemsResponse;

export type BulkUpdateAdvertisersLineItemsError = CommonErrors;

export const bulkUpdateAdvertisersLineItems: API.OperationMethod<BulkUpdateAdvertisersLineItemsRequest, BulkUpdateAdvertisersLineItemsResponse, BulkUpdateAdvertisersLineItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkUpdateAdvertisersLineItemsRequest,
  output: BulkUpdateAdvertisersLineItemsResponse,
  errors: [],
}));

/** Gets a single targeting option assigned to a line item. */
export interface GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item the assigned targeting option belongs to. */
  lineItemId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_INVENTORY_MODE` * `TARGETING_TYPE_YOUTUBE_CHANNEL` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) * `TARGETING_TYPE_YOUTUBE_VIDEO` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
}

export const GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const getAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.OperationMethod<GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest, GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse, GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output: GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Lists the targeting options assigned to a line item. */
export interface ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item to list assigned targeting options for. */
  lineItemId: string;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_INVENTORY_MODE` * `TARGETING_TYPE_YOUTUBE_CHANNEL` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) * `TARGETING_TYPE_YOUTUBE_VIDEO` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItemAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` * `inheritance` Examples: * `AssignedTargetingOption` resources with ID 1 or 2: `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` * `AssignedTargetingOption` resources with inheritance status of `NOT_INHERITED` or `INHERITED_FROM_PARTNER`: `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = ListLineItemAssignedTargetingOptionsResponse;
export const ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = ListLineItemAssignedTargetingOptionsResponse;

export type ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const listAdvertisersLineItemsTargetingTypesAssignedTargetingOptions = API.makePaginated(() => ({
  input: ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output: ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Assigns a targeting option to a line item. Returns the assigned targeting option if successful. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * lineItems.bulkEditAssignedTargetingOptions * lineItems.bulkUpdate * lineItems.patch * DeleteLineItemAssignedTargetingOption YouTube & Partners line items cannot be created or updated using the API. */
export interface CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item the assigned targeting option will belong to. */
  lineItemId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const createAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.OperationMethod<CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest, CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse, CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output: CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Deletes an assigned targeting option from a line item. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * lineItems.bulkEditAssignedTargetingOptions * lineItems.bulkUpdate * lineItems.patch * CreateLineItemAssignedTargetingOption YouTube & Partners line items cannot be created or updated using the API. */
export interface DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item the assigned targeting option belongs to. */
  lineItemId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
}

export const DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = Empty;
export const DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse = Empty;

export type DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const deleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.OperationMethod<DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest, DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse, DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output: DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Lists the YouTube asset associations linked to the given resource. */
export interface ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of a line item. */
  lineItemId: string;
  /** Required. The type of YouTube asset being associated with the resource. */
  youtubeAssetType: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** The ID of an ad group. */
  "linkedEntity.adGroupId"?: string;
  /** Optional. Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListYoutubeAssetAssociations` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. The only acceptable values are: * `linkedYoutubeAsset.locationAssetFilter.assetSetId`, * `linkedYoutubeAsset.affiliateLocationAssetFilter.assetSetId`, * `linkedYoutubeAsset.sitelinkAsset.assetId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `linkedYoutubeAsset.sitelinkAsset.assetId desc`. */
  orderBy?: string;
}

export const ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
  "linkedEntity.adGroupId": Schema.optional(Schema.String).pipe(T.HttpQuery("linkedEntity.adGroupId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse = ListYoutubeAssetAssociationsResponse;
export const ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse = ListYoutubeAssetAssociationsResponse;

export type ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError = CommonErrors;

export const listAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociations = API.makePaginated(() => ({
  input: ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output: ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new association between the identified resource and a YouTube asset. Returns the newly-created association. *Warning:* This method is only available to an informed subset of users. */
export interface CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of a line item. */
  lineItemId: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** The ID of an ad group. */
  "linkedEntity.adGroupId"?: string;
  /** Request body */
  body?: YoutubeAssetAssociation;
}

export const CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
  "linkedEntity.adGroupId": Schema.optional(Schema.String).pipe(T.HttpQuery("linkedEntity.adGroupId")),
  body: Schema.optional(YoutubeAssetAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse = YoutubeAssetAssociation;
export const CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse = YoutubeAssetAssociation;

export type CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError = CommonErrors;

export const createAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest, CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse, CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output: CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

/** Deletes an existing association between the identified resource and a YouTube asset. *Warning:* This method is only available to an informed subset of users. */
export interface DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of a line item. */
  lineItemId: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** Required. The ID of the YouTube asset in the association. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: This should be the ID of the asset set linked, or 0 if the location_asset_filter or affiliate_location_asset_filter is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: This should be the ID of the sitelink asset linked. */
  youtubeAssetAssociationId: string;
  /** The ID of an ad group. */
  "linkedEntity.adGroupId"?: string;
}

export const DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
  youtubeAssetAssociationId: Schema.String.pipe(T.HttpPath("youtubeAssetAssociationId")),
  "linkedEntity.adGroupId": Schema.optional(Schema.String).pipe(T.HttpQuery("linkedEntity.adGroupId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations/{youtubeAssetAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse = Empty;
export const DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse = Empty;

export type DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError = CommonErrors;

export const deleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest, DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse, DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output: DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

/** Lists assigned targeting options for multiple ad groups across targeting types. Inherited assigned targeting options are not included. */
export interface BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest {
  /** Required. The ID of the advertiser the line items belongs to. */
  advertiserId: string;
  /** Required. The IDs of the ad groups to list assigned targeting options for. */
  adGroupIds?: string[];
  /** Optional. Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to the `BulkListAdGroupAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `adGroupId` (default) * `assignedTargetingOption.targetingType` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `targetingType` Examples: * `AssignedTargetingOption` resources of targeting type `TARGETING_TYPE_YOUTUBE_VIDEO` or `TARGETING_TYPE_YOUTUBE_CHANNEL`: `targetingType="TARGETING_TYPE_YOUTUBE_VIDEO" OR targetingType="TARGETING_TYPE_YOUTUBE_CHANNEL"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("adGroupIds")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups:bulkListAssignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest>;

export type BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse = BulkListAdGroupAssignedTargetingOptionsResponse;
export const BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse = BulkListAdGroupAssignedTargetingOptionsResponse;

export type BulkListAssignedTargetingOptionsAdvertisersAdGroupsError = CommonErrors;

export const bulkListAssignedTargetingOptionsAdvertisersAdGroups = API.makePaginated(() => ({
  input: BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest,
  output: BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an ad group. */
export interface GetAdvertisersAdGroupsRequest {
  /** Required. The ID of the advertiser this ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group to fetch. */
  adGroupId: string;
}

export const GetAdvertisersAdGroupsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersAdGroupsRequest>;

export type GetAdvertisersAdGroupsResponse = AdGroup;
export const GetAdvertisersAdGroupsResponse = AdGroup;

export type GetAdvertisersAdGroupsError = CommonErrors;

export const getAdvertisersAdGroups: API.OperationMethod<GetAdvertisersAdGroupsRequest, GetAdvertisersAdGroupsResponse, GetAdvertisersAdGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersAdGroupsRequest,
  output: GetAdvertisersAdGroupsResponse,
  errors: [],
}));

/** Lists ad groups. */
export interface ListAdvertisersAdGroupsRequest {
  /** Required. The ID of the advertiser the ad groups belongs to. */
  advertiserId: string;
  /** Optional. Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdGroups` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by custom ad group fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` and `OR`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported properties: * `adGroupId` * `displayName` * `entityStatus` * `lineItemId` * `adGroupFormat` Examples: * All ad groups under an line item: `lineItemId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` `AD_GROUP_FORMAT_IN_STREAM` ad groups under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND adGroupFormat="AD_GROUP_FORMAT_IN_STREAM"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersAdGroupsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersAdGroupsRequest>;

export type ListAdvertisersAdGroupsResponse = ListAdGroupsResponse;
export const ListAdvertisersAdGroupsResponse = ListAdGroupsResponse;

export type ListAdvertisersAdGroupsError = CommonErrors;

export const listAdvertisersAdGroups = API.makePaginated(() => ({
  input: ListAdvertisersAdGroupsRequest,
  output: ListAdvertisersAdGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single targeting option assigned to an ad group. Inherited assigned targeting options are not included. */
export interface GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group the assigned targeting option belongs to. */
  adGroupId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
}

export const GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest>;

export type GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const getAdvertisersAdGroupsTargetingTypesAssignedTargetingOptions: API.OperationMethod<GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest, GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse, GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  output: GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Lists the targeting options assigned to an ad group. Inherited assigned targeting options are not included. */
export interface ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group to list assigned targeting options for. */
  adGroupId: string;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Optional. Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdGroupAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` resources with ID 1 or 2: `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest>;

export type ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse = ListAdGroupAssignedTargetingOptionsResponse;
export const ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse = ListAdGroupAssignedTargetingOptionsResponse;

export type ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const listAdvertisersAdGroupsTargetingTypesAssignedTargetingOptions = API.makePaginated(() => ({
  input: ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  output: ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the YouTube asset associations linked to the given resource. */
export interface ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  adGroupId: string;
  /** Required. The type of YouTube asset being associated with the resource. */
  youtubeAssetType: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** The ID of a line item. */
  "linkedEntity.lineItemId"?: string;
  /** Optional. Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListYoutubeAssetAssociations` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. The only acceptable values are: * `linkedYoutubeAsset.locationAssetFilter.assetSetId`, * `linkedYoutubeAsset.affiliateLocationAssetFilter.assetSetId`, * `linkedYoutubeAsset.sitelinkAsset.assetId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `linkedYoutubeAsset.sitelinkAsset.assetId desc`. */
  orderBy?: string;
}

export const ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
  "linkedEntity.lineItemId": Schema.optional(Schema.String).pipe(T.HttpQuery("linkedEntity.lineItemId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse = ListYoutubeAssetAssociationsResponse;
export const ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse = ListYoutubeAssetAssociationsResponse;

export type ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError = CommonErrors;

export const listAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociations = API.makePaginated(() => ({
  input: ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output: ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new association between the identified resource and a YouTube asset. Returns the newly-created association. *Warning:* This method is only available to an informed subset of users. */
export interface CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  adGroupId: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** The ID of a line item. */
  "linkedEntity.lineItemId"?: string;
  /** Request body */
  body?: YoutubeAssetAssociation;
}

export const CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
  "linkedEntity.lineItemId": Schema.optional(Schema.String).pipe(T.HttpQuery("linkedEntity.lineItemId")),
  body: Schema.optional(YoutubeAssetAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse = YoutubeAssetAssociation;
export const CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse = YoutubeAssetAssociation;

export type CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError = CommonErrors;

export const createAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest, CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse, CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output: CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

/** Deletes an existing association between the identified resource and a YouTube asset. *Warning:* This method is only available to an informed subset of users. */
export interface DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  adGroupId: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType: "YOUTUBE_ASSET_TYPE_UNSPECIFIED" | "YOUTUBE_ASSET_TYPE_LOCATION" | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION" | "YOUTUBE_ASSET_TYPE_SITELINK" | (string & {});
  /** Required. The ID of the YouTube asset in the association. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: This should be the ID of the asset set linked, or 0 if the location_asset_filter or affiliate_location_asset_filter is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: This should be the ID of the sitelink asset linked. */
  youtubeAssetAssociationId: string;
  /** The ID of a line item. */
  "linkedEntity.lineItemId"?: string;
}

export const DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
  youtubeAssetAssociationId: Schema.String.pipe(T.HttpPath("youtubeAssetAssociationId")),
  "linkedEntity.lineItemId": Schema.optional(Schema.String).pipe(T.HttpQuery("linkedEntity.lineItemId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations/{youtubeAssetAssociationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse = Empty;
export const DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse = Empty;

export type DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError = CommonErrors;

export const deleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest, DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse, DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output: DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

/** Gets a single targeting option assigned to an advertiser. */
export interface GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_YOUTUBE_VIDEO` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_CONTENT_THEME_EXCLUSION` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. An identifier unique to the targeting type in this advertiser that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
}

export const GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type GetAdvertisersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const getAdvertisersTargetingTypesAssignedTargetingOptions: API.OperationMethod<GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest, GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse, GetAdvertisersTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Lists the targeting options assigned to an advertiser. */
export interface ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_YOUTUBE_VIDEO` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_CONTENT_THEME_EXCLUSION` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdvertiserAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` with ID 123456: `assignedTargetingOptionId="123456"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse = ListAdvertiserAssignedTargetingOptionsResponse;
export const ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse = ListAdvertiserAssignedTargetingOptionsResponse;

export type ListAdvertisersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const listAdvertisersTargetingTypesAssignedTargetingOptions = API.makePaginated(() => ({
  input: ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Assigns a targeting option to an advertiser. Returns the assigned targeting option if successful. */
export interface CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type CreateAdvertisersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const createAdvertisersTargetingTypesAssignedTargetingOptions: API.OperationMethod<CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest, CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse, CreateAdvertisersTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Deletes an assigned targeting option from an advertiser. */
export interface DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
}

export const DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse = Empty;
export const DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse = Empty;

export type DeleteAdvertisersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const deleteAdvertisersTargetingTypesAssignedTargetingOptions: API.OperationMethod<DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest, DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse, DeleteAdvertisersTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Uploads an asset. Returns the ID of the newly uploaded asset if successful. The asset file size should be no more than 10 MB for images, 200 MB for ZIP files, and 1 GB for videos. Must be used within the [multipart media upload process](/display-video/api/guides/how-tos/upload#multipart). Examples using provided client libraries can be found in our [Creating Creatives guide](/display-video/api/guides/creating-creatives/overview#upload_an_asset). */
export interface UploadAdvertisersAssetsRequest {
  /** Required. The ID of the advertiser this asset belongs to. */
  advertiserId: string;
  /** Request body */
  body?: CreateAssetRequest;
}

export const UploadAdvertisersAssetsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(CreateAssetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/assets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadAdvertisersAssetsRequest>;

export type UploadAdvertisersAssetsResponse = CreateAssetResponse;
export const UploadAdvertisersAssetsResponse = CreateAssetResponse;

export type UploadAdvertisersAssetsError = CommonErrors;

export const uploadAdvertisersAssets: API.OperationMethod<UploadAdvertisersAssetsRequest, UploadAdvertisersAssetsResponse, UploadAdvertisersAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadAdvertisersAssetsRequest,
  output: UploadAdvertisersAssetsResponse,
  errors: [],
}));

/** Gets a campaign. */
export interface GetAdvertisersCampaignsRequest {
  /** Required. The ID of the advertiser this campaign belongs to. */
  advertiserId: string;
  /** Required. The ID of the campaign to fetch. */
  campaignId: string;
}

export const GetAdvertisersCampaignsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/campaigns/{campaignsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersCampaignsRequest>;

export type GetAdvertisersCampaignsResponse = Campaign;
export const GetAdvertisersCampaignsResponse = Campaign;

export type GetAdvertisersCampaignsError = CommonErrors;

export const getAdvertisersCampaigns: API.OperationMethod<GetAdvertisersCampaignsRequest, GetAdvertisersCampaignsResponse, GetAdvertisersCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersCampaignsRequest,
  output: GetAdvertisersCampaignsResponse,
  errors: [],
}));

/** Lists campaigns in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, campaigns with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export interface ListAdvertisersCampaignsRequest {
  /** The ID of the advertiser to list campaigns for. */
  advertiserId: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCampaigns` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by campaign fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` campaigns under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")` * All campaigns with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All campaigns with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersCampaignsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/campaigns" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersCampaignsRequest>;

export type ListAdvertisersCampaignsResponse = ListCampaignsResponse;
export const ListAdvertisersCampaignsResponse = ListCampaignsResponse;

export type ListAdvertisersCampaignsError = CommonErrors;

export const listAdvertisersCampaigns = API.makePaginated(() => ({
  input: ListAdvertisersCampaignsRequest,
  output: ListAdvertisersCampaignsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new campaign. Returns the newly created campaign if successful. */
export interface CreateAdvertisersCampaignsRequest {
  /** Output only. The unique ID of the advertiser the campaign belongs to. */
  advertiserId: string;
  /** Request body */
  body?: Campaign;
}

export const CreateAdvertisersCampaignsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(Campaign).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/campaigns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersCampaignsRequest>;

export type CreateAdvertisersCampaignsResponse = Campaign;
export const CreateAdvertisersCampaignsResponse = Campaign;

export type CreateAdvertisersCampaignsError = CommonErrors;

export const createAdvertisersCampaigns: API.OperationMethod<CreateAdvertisersCampaignsRequest, CreateAdvertisersCampaignsResponse, CreateAdvertisersCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersCampaignsRequest,
  output: CreateAdvertisersCampaignsResponse,
  errors: [],
}));

/** Updates an existing campaign. Returns the updated campaign if successful. */
export interface PatchAdvertisersCampaignsRequest {
  /** Output only. The unique ID of the advertiser the campaign belongs to. */
  advertiserId: string;
  /** Output only. The unique ID of the campaign. Assigned by the system. */
  campaignId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Campaign;
}

export const PatchAdvertisersCampaignsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Campaign).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/campaigns/{campaignsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersCampaignsRequest>;

export type PatchAdvertisersCampaignsResponse = Campaign;
export const PatchAdvertisersCampaignsResponse = Campaign;

export type PatchAdvertisersCampaignsError = CommonErrors;

export const patchAdvertisersCampaigns: API.OperationMethod<PatchAdvertisersCampaignsRequest, PatchAdvertisersCampaignsResponse, PatchAdvertisersCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersCampaignsRequest,
  output: PatchAdvertisersCampaignsResponse,
  errors: [],
}));

/** Permanently deletes a campaign. A deleted campaign cannot be recovered. The campaign should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export interface DeleteAdvertisersCampaignsRequest {
  /** The ID of the advertiser this campaign belongs to. */
  advertiserId: string;
  /** The ID of the campaign we need to delete. */
  campaignId: string;
}

export const DeleteAdvertisersCampaignsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/campaigns/{campaignsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersCampaignsRequest>;

export type DeleteAdvertisersCampaignsResponse = Empty;
export const DeleteAdvertisersCampaignsResponse = Empty;

export type DeleteAdvertisersCampaignsError = CommonErrors;

export const deleteAdvertisersCampaigns: API.OperationMethod<DeleteAdvertisersCampaignsRequest, DeleteAdvertisersCampaignsResponse, DeleteAdvertisersCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersCampaignsRequest,
  output: DeleteAdvertisersCampaignsResponse,
  errors: [],
}));

/** Gets a channel for a partner or advertiser. */
export interface GetAdvertisersChannelsRequest {
  /** The ID of the advertiser that owns the fetched channel. */
  advertiserId: string;
  /** Required. The ID of the channel to fetch. */
  channelId: string;
  /** The ID of the partner that owns the fetched channel. */
  partnerId?: string;
}

export const GetAdvertisersChannelsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/channels/{channelsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersChannelsRequest>;

export type GetAdvertisersChannelsResponse = Channel;
export const GetAdvertisersChannelsResponse = Channel;

export type GetAdvertisersChannelsError = CommonErrors;

export const getAdvertisersChannels: API.OperationMethod<GetAdvertisersChannelsRequest, GetAdvertisersChannelsResponse, GetAdvertisersChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersChannelsRequest,
  output: GetAdvertisersChannelsResponse,
  errors: [],
}));

/** Lists channels for a partner or advertiser. */
export interface ListAdvertisersChannelsRequest {
  /** The ID of the advertiser that owns the channels. */
  advertiserId: string;
  /** The ID of the partner that owns the channels. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `channelId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by channel fields. Supported syntax: * Filter expressions for channel can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All channels for which the display name contains "google": `displayName : "google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersChannelsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/channels" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersChannelsRequest>;

export type ListAdvertisersChannelsResponse = ListChannelsResponse;
export const ListAdvertisersChannelsResponse = ListChannelsResponse;

export type ListAdvertisersChannelsError = CommonErrors;

export const listAdvertisersChannels = API.makePaginated(() => ({
  input: ListAdvertisersChannelsRequest,
  output: ListAdvertisersChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new channel. Returns the newly created channel if successful. */
export interface CreateAdvertisersChannelsRequest {
  /** The ID of the advertiser that owns the created channel. */
  advertiserId: string;
  /** The ID of the partner that owns the created channel. */
  partnerId?: string;
  /** Request body */
  body?: Channel;
}

export const CreateAdvertisersChannelsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/channels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersChannelsRequest>;

export type CreateAdvertisersChannelsResponse = Channel;
export const CreateAdvertisersChannelsResponse = Channel;

export type CreateAdvertisersChannelsError = CommonErrors;

export const createAdvertisersChannels: API.OperationMethod<CreateAdvertisersChannelsRequest, CreateAdvertisersChannelsResponse, CreateAdvertisersChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersChannelsRequest,
  output: CreateAdvertisersChannelsResponse,
  errors: [],
}));

/** Updates a channel. Returns the updated channel if successful. */
export interface PatchAdvertisersChannelsRequest {
  /** The ID of the advertiser that owns the created channel. */
  advertiserId: string;
  /** Output only. The unique ID of the channel. Assigned by the system. */
  channelId: string;
  /** The ID of the partner that owns the created channel. */
  partnerId?: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Channel;
}

export const PatchAdvertisersChannelsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/channels/{channelId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersChannelsRequest>;

export type PatchAdvertisersChannelsResponse = Channel;
export const PatchAdvertisersChannelsResponse = Channel;

export type PatchAdvertisersChannelsError = CommonErrors;

export const patchAdvertisersChannels: API.OperationMethod<PatchAdvertisersChannelsRequest, PatchAdvertisersChannelsResponse, PatchAdvertisersChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersChannelsRequest,
  output: PatchAdvertisersChannelsResponse,
  errors: [],
}));

/** Lists sites in a channel. */
export interface ListAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel to which the requested sites belong. */
  channelId: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListSites` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `urlOrAppId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `urlOrAppId desc`. */
  orderBy?: string;
  /** Allows filtering by site fields. Supported syntax: * Filter expressions for site retrieval can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `urlOrAppId` Examples: * All sites for which the URL or app ID contains "google": `urlOrAppId : "google"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersChannelsSitesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/channels/{channelsId}/sites" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersChannelsSitesRequest>;

export type ListAdvertisersChannelsSitesResponse = ListSitesResponse;
export const ListAdvertisersChannelsSitesResponse = ListSitesResponse;

export type ListAdvertisersChannelsSitesError = CommonErrors;

export const listAdvertisersChannelsSites = API.makePaginated(() => ({
  input: ListAdvertisersChannelsSitesRequest,
  output: ListAdvertisersChannelsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a site in a channel. */
export interface CreateAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel in which the site will be created. */
  channelId: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** Request body */
  body?: Site;
}

export const CreateAdvertisersChannelsSitesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  body: Schema.optional(Site).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersChannelsSitesRequest>;

export type CreateAdvertisersChannelsSitesResponse = Site;
export const CreateAdvertisersChannelsSitesResponse = Site;

export type CreateAdvertisersChannelsSitesError = CommonErrors;

export const createAdvertisersChannelsSites: API.OperationMethod<CreateAdvertisersChannelsSitesRequest, CreateAdvertisersChannelsSitesResponse, CreateAdvertisersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersChannelsSitesRequest,
  output: CreateAdvertisersChannelsSitesResponse,
  errors: [],
}));

/** Deletes a site from a channel. */
export interface DeleteAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel to which the site belongs. */
  channelId: string;
  /** Required. The URL or app ID of the site to delete. */
  urlOrAppId: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
}

export const DeleteAdvertisersChannelsSitesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  urlOrAppId: Schema.String.pipe(T.HttpPath("urlOrAppId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites/{sitesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersChannelsSitesRequest>;

export type DeleteAdvertisersChannelsSitesResponse = Empty;
export const DeleteAdvertisersChannelsSitesResponse = Empty;

export type DeleteAdvertisersChannelsSitesError = CommonErrors;

export const deleteAdvertisersChannelsSites: API.OperationMethod<DeleteAdvertisersChannelsSitesRequest, DeleteAdvertisersChannelsSitesResponse, DeleteAdvertisersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersChannelsSitesRequest,
  output: DeleteAdvertisersChannelsSitesResponse,
  errors: [],
}));

/** Bulk edits sites under a single channel. The operation will delete the sites provided in BulkEditSitesRequest.deleted_sites and then create the sites provided in BulkEditSitesRequest.created_sites. */
export interface BulkEditAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel to which the sites belong. */
  channelId: string;
  /** Request body */
  body?: BulkEditSitesRequest;
}

export const BulkEditAdvertisersChannelsSitesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  body: Schema.optional(BulkEditSitesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites:bulkEdit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditAdvertisersChannelsSitesRequest>;

export type BulkEditAdvertisersChannelsSitesResponse = BulkEditSitesResponse;
export const BulkEditAdvertisersChannelsSitesResponse = BulkEditSitesResponse;

export type BulkEditAdvertisersChannelsSitesError = CommonErrors;

export const bulkEditAdvertisersChannelsSites: API.OperationMethod<BulkEditAdvertisersChannelsSitesRequest, BulkEditAdvertisersChannelsSitesResponse, BulkEditAdvertisersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditAdvertisersChannelsSitesRequest,
  output: BulkEditAdvertisersChannelsSitesResponse,
  errors: [],
}));

/** Replaces all of the sites under a single channel. The operation will replace the sites under a channel with the sites provided in ReplaceSitesRequest.new_sites. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export interface ReplaceAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel whose sites will be replaced. */
  channelId: string;
  /** Request body */
  body?: ReplaceSitesRequest;
}

export const ReplaceAdvertisersChannelsSitesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  body: Schema.optional(ReplaceSitesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites:replace", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceAdvertisersChannelsSitesRequest>;

export type ReplaceAdvertisersChannelsSitesResponse = ReplaceSitesResponse;
export const ReplaceAdvertisersChannelsSitesResponse = ReplaceSitesResponse;

export type ReplaceAdvertisersChannelsSitesError = CommonErrors;

export const replaceAdvertisersChannelsSites: API.OperationMethod<ReplaceAdvertisersChannelsSitesRequest, ReplaceAdvertisersChannelsSitesResponse, ReplaceAdvertisersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceAdvertisersChannelsSitesRequest,
  output: ReplaceAdvertisersChannelsSitesResponse,
  errors: [],
}));

/** Gets a creative. */
export interface GetAdvertisersCreativesRequest {
  /** Required. The ID of the advertiser this creative belongs to. */
  advertiserId: string;
  /** Required. The ID of the creative to fetch. */
  creativeId: string;
}

export const GetAdvertisersCreativesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/creatives/{creativesId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersCreativesRequest>;

export type GetAdvertisersCreativesResponse = Creative;
export const GetAdvertisersCreativesResponse = Creative;

export type GetAdvertisersCreativesError = CommonErrors;

export const getAdvertisersCreatives: API.OperationMethod<GetAdvertisersCreativesRequest, GetAdvertisersCreativesResponse, GetAdvertisersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersCreativesRequest,
  output: GetAdvertisersCreativesResponse,
  errors: [],
}));

/** Lists creatives in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, creatives with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export interface ListAdvertisersCreativesRequest {
  /** Required. The ID of the advertiser to list creatives for. */
  advertiserId: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCreatives` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `creativeId` (default) * `createTime` * `mediaDuration` * `dimensions` (sorts by width first, then by height) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `createTime desc`. */
  orderBy?: string;
  /** Allows filtering by creative fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `lineItemIds` field must use the `HAS (:)` operator. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. * For `entityStatus`, `minDuration`, `maxDuration`, `updateTime`, and `dynamic` fields, there may be at most one restriction. Supported Fields: * `approvalStatus` * `creativeId` * `creativeType` * `dimensions` (input in the form of `{width}x{height}`) * `dynamic` * `entityStatus` * `exchangeReviewStatus` (input in the form of `{exchange}-{reviewStatus}`) * `lineItemIds` * `maxDuration` (input in the form of `{duration}s`. Only seconds are supported) * `minDuration` (input in the form of `{duration}s`. Only seconds are supported) * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Notes: * For `updateTime`, a creative resource's field value reflects the last time that a creative has been updated, which includes updates made by the system (e.g. creative review updates). Examples: * All native creatives: `creativeType="CREATIVE_TYPE_NATIVE"` * All active creatives with 300x400 or 50x100 dimensions: `entityStatus="ENTITY_STATUS_ACTIVE" AND (dimensions="300x400" OR dimensions="50x100")` * All dynamic creatives that are approved by AdX or AppNexus, with a minimum duration of 5 seconds and 200ms: `dynamic="true" AND minDuration="5.2s" AND (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED" OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")` * All video creatives that are associated with line item ID 1 or 2: `creativeType="CREATIVE_TYPE_VIDEO" AND (lineItemIds:1 OR lineItemIds:2)` * Find creatives by multiple creative IDs: `creativeId=1 OR creativeId=2` * All creatives with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersCreativesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersCreativesRequest>;

export type ListAdvertisersCreativesResponse = ListCreativesResponse;
export const ListAdvertisersCreativesResponse = ListCreativesResponse;

export type ListAdvertisersCreativesError = CommonErrors;

export const listAdvertisersCreatives = API.makePaginated(() => ({
  input: ListAdvertisersCreativesRequest,
  output: ListAdvertisersCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new creative. Returns the newly created creative if successful. A ["Standard" user role](//support.google.com/displayvideo/answer/2723011) or greater for the parent advertiser or partner is required to make this request. */
export interface CreateAdvertisersCreativesRequest {
  /** Output only. The unique ID of the advertiser the creative belongs to. */
  advertiserId: string;
  /** Request body */
  body?: Creative;
}

export const CreateAdvertisersCreativesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersCreativesRequest>;

export type CreateAdvertisersCreativesResponse = Creative;
export const CreateAdvertisersCreativesResponse = Creative;

export type CreateAdvertisersCreativesError = CommonErrors;

export const createAdvertisersCreatives: API.OperationMethod<CreateAdvertisersCreativesRequest, CreateAdvertisersCreativesResponse, CreateAdvertisersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersCreativesRequest,
  output: CreateAdvertisersCreativesResponse,
  errors: [],
}));

/** Updates an existing creative. Returns the updated creative if successful. A ["Standard" user role](//support.google.com/displayvideo/answer/2723011) or greater for the parent advertiser or partner is required to make this request. */
export interface PatchAdvertisersCreativesRequest {
  /** Output only. The unique ID of the advertiser the creative belongs to. */
  advertiserId: string;
  /** Output only. The unique ID of the creative. Assigned by the system. */
  creativeId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Creative;
}

export const PatchAdvertisersCreativesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/creatives/{creativesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersCreativesRequest>;

export type PatchAdvertisersCreativesResponse = Creative;
export const PatchAdvertisersCreativesResponse = Creative;

export type PatchAdvertisersCreativesError = CommonErrors;

export const patchAdvertisersCreatives: API.OperationMethod<PatchAdvertisersCreativesRequest, PatchAdvertisersCreativesResponse, PatchAdvertisersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersCreativesRequest,
  output: PatchAdvertisersCreativesResponse,
  errors: [],
}));

/** Deletes a creative. Returns error code `NOT_FOUND` if the creative does not exist. The creative should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, before it can be deleted. A ["Standard" user role](//support.google.com/displayvideo/answer/2723011) or greater for the parent advertiser or partner is required to make this request. */
export interface DeleteAdvertisersCreativesRequest {
  /** The ID of the advertiser this creative belongs to. */
  advertiserId: string;
  /** The ID of the creative to be deleted. */
  creativeId: string;
}

export const DeleteAdvertisersCreativesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/creatives/{creativesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersCreativesRequest>;

export type DeleteAdvertisersCreativesResponse = Empty;
export const DeleteAdvertisersCreativesResponse = Empty;

export type DeleteAdvertisersCreativesError = CommonErrors;

export const deleteAdvertisersCreatives: API.OperationMethod<DeleteAdvertisersCreativesRequest, DeleteAdvertisersCreativesResponse, DeleteAdvertisersCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersCreativesRequest,
  output: DeleteAdvertisersCreativesResponse,
  errors: [],
}));

/** Gets an insertion order. Returns error code `NOT_FOUND` if the insertion order does not exist. */
export interface GetAdvertisersInsertionOrdersRequest {
  /** Required. The ID of the advertiser this insertion order belongs to. */
  advertiserId: string;
  /** Required. The ID of the insertion order to fetch. */
  insertionOrderId: string;
}

export const GetAdvertisersInsertionOrdersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  insertionOrderId: Schema.String.pipe(T.HttpPath("insertionOrderId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/insertionOrders/{insertionOrdersId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersInsertionOrdersRequest>;

export type GetAdvertisersInsertionOrdersResponse = InsertionOrder;
export const GetAdvertisersInsertionOrdersResponse = InsertionOrder;

export type GetAdvertisersInsertionOrdersError = CommonErrors;

export const getAdvertisersInsertionOrders: API.OperationMethod<GetAdvertisersInsertionOrdersRequest, GetAdvertisersInsertionOrdersResponse, GetAdvertisersInsertionOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersInsertionOrdersRequest,
  output: GetAdvertisersInsertionOrdersResponse,
  errors: [],
}));

/** Lists insertion orders in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, insertion orders with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export interface ListAdvertisersInsertionOrdersRequest {
  /** Required. The ID of the advertiser to list insertion orders for. */
  advertiserId: string;
  /** Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInsertionOrders` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * "displayName" (default) * "entityStatus" * "updateTime" The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by insertion order fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All insertion orders under a campaign: `campaignId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` insertion orders under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")` * All insertion orders with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All insertion orders with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersInsertionOrdersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/insertionOrders" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersInsertionOrdersRequest>;

export type ListAdvertisersInsertionOrdersResponse = ListInsertionOrdersResponse;
export const ListAdvertisersInsertionOrdersResponse = ListInsertionOrdersResponse;

export type ListAdvertisersInsertionOrdersError = CommonErrors;

export const listAdvertisersInsertionOrders = API.makePaginated(() => ({
  input: ListAdvertisersInsertionOrdersRequest,
  output: ListAdvertisersInsertionOrdersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new insertion order. Returns the newly created insertion order if successful. */
export interface CreateAdvertisersInsertionOrdersRequest {
  /** Output only. The unique ID of the advertiser the insertion order belongs to. */
  advertiserId: string;
  /** Request body */
  body?: InsertionOrder;
}

export const CreateAdvertisersInsertionOrdersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(InsertionOrder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/insertionOrders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersInsertionOrdersRequest>;

export type CreateAdvertisersInsertionOrdersResponse = InsertionOrder;
export const CreateAdvertisersInsertionOrdersResponse = InsertionOrder;

export type CreateAdvertisersInsertionOrdersError = CommonErrors;

export const createAdvertisersInsertionOrders: API.OperationMethod<CreateAdvertisersInsertionOrdersRequest, CreateAdvertisersInsertionOrdersResponse, CreateAdvertisersInsertionOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersInsertionOrdersRequest,
  output: CreateAdvertisersInsertionOrdersResponse,
  errors: [],
}));

/** Updates an existing insertion order. Returns the updated insertion order if successful. */
export interface PatchAdvertisersInsertionOrdersRequest {
  /** Output only. The unique ID of the advertiser the insertion order belongs to. */
  advertiserId: string;
  /** Output only. The unique ID of the insertion order. Assigned by the system. */
  insertionOrderId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: InsertionOrder;
}

export const PatchAdvertisersInsertionOrdersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  insertionOrderId: Schema.String.pipe(T.HttpPath("insertionOrderId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InsertionOrder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/insertionOrders/{insertionOrdersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersInsertionOrdersRequest>;

export type PatchAdvertisersInsertionOrdersResponse = InsertionOrder;
export const PatchAdvertisersInsertionOrdersResponse = InsertionOrder;

export type PatchAdvertisersInsertionOrdersError = CommonErrors;

export const patchAdvertisersInsertionOrders: API.OperationMethod<PatchAdvertisersInsertionOrdersRequest, PatchAdvertisersInsertionOrdersResponse, PatchAdvertisersInsertionOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersInsertionOrdersRequest,
  output: PatchAdvertisersInsertionOrdersResponse,
  errors: [],
}));

/** Deletes an insertion order. Returns error code `NOT_FOUND` if the insertion order does not exist. The insertion order should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it. */
export interface DeleteAdvertisersInsertionOrdersRequest {
  /** The ID of the advertiser this insertion order belongs to. */
  advertiserId: string;
  /** The ID of the insertion order to delete. */
  insertionOrderId: string;
}

export const DeleteAdvertisersInsertionOrdersRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  insertionOrderId: Schema.String.pipe(T.HttpPath("insertionOrderId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/insertionOrders/{insertionOrdersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersInsertionOrdersRequest>;

export type DeleteAdvertisersInsertionOrdersResponse = Empty;
export const DeleteAdvertisersInsertionOrdersResponse = Empty;

export type DeleteAdvertisersInsertionOrdersError = CommonErrors;

export const deleteAdvertisersInsertionOrders: API.OperationMethod<DeleteAdvertisersInsertionOrdersRequest, DeleteAdvertisersInsertionOrdersResponse, DeleteAdvertisersInsertionOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersInsertionOrdersRequest,
  output: DeleteAdvertisersInsertionOrdersResponse,
  errors: [],
}));

/** Lists invoices posted for an advertiser in a given month. Invoices generated by billing profiles with a "Partner" invoice level are not retrievable through this method. */
export interface ListAdvertisersInvoicesRequest {
  /** Required. The ID of the advertiser to list invoices for. */
  advertiserId: string;
  /** The month to list the invoices for. If not set, the request will retrieve invoices for the previous month. Must be in the format YYYYMM. */
  issueMonth?: string;
  /** Select type of invoice to retrieve for Loi Sapin advertisers. Only applicable to Loi Sapin advertisers. Will be ignored otherwise. */
  loiSapinInvoiceType?: "LOI_SAPIN_INVOICE_TYPE_UNSPECIFIED" | "LOI_SAPIN_INVOICE_TYPE_MEDIA" | "LOI_SAPIN_INVOICE_TYPE_PLATFORM" | (string & {});
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInvoices` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersInvoicesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  issueMonth: Schema.optional(Schema.String).pipe(T.HttpQuery("issueMonth")),
  loiSapinInvoiceType: Schema.optional(Schema.String).pipe(T.HttpQuery("loiSapinInvoiceType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/invoices" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersInvoicesRequest>;

export type ListAdvertisersInvoicesResponse = ListInvoicesResponse;
export const ListAdvertisersInvoicesResponse = ListInvoicesResponse;

export type ListAdvertisersInvoicesError = CommonErrors;

export const listAdvertisersInvoices = API.makePaginated(() => ({
  input: ListAdvertisersInvoicesRequest,
  output: ListAdvertisersInvoicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves the invoice currency used by an advertiser in a given month. */
export interface LookupInvoiceCurrencyAdvertisersInvoicesRequest {
  /** Required. The ID of the advertiser to lookup currency for. */
  advertiserId: string;
  /** Month for which the currency is needed. If not set, the request will return existing currency settings for the advertiser. Must be in the format YYYYMM. */
  invoiceMonth?: string;
}

export const LookupInvoiceCurrencyAdvertisersInvoicesRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  invoiceMonth: Schema.optional(Schema.String).pipe(T.HttpQuery("invoiceMonth")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/invoices:lookupInvoiceCurrency" }),
  svc,
) as unknown as Schema.Schema<LookupInvoiceCurrencyAdvertisersInvoicesRequest>;

export type LookupInvoiceCurrencyAdvertisersInvoicesResponse = LookupInvoiceCurrencyResponse;
export const LookupInvoiceCurrencyAdvertisersInvoicesResponse = LookupInvoiceCurrencyResponse;

export type LookupInvoiceCurrencyAdvertisersInvoicesError = CommonErrors;

export const lookupInvoiceCurrencyAdvertisersInvoices: API.OperationMethod<LookupInvoiceCurrencyAdvertisersInvoicesRequest, LookupInvoiceCurrencyAdvertisersInvoicesResponse, LookupInvoiceCurrencyAdvertisersInvoicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupInvoiceCurrencyAdvertisersInvoicesRequest,
  output: LookupInvoiceCurrencyAdvertisersInvoicesResponse,
  errors: [],
}));

/** Gets a location list. */
export interface GetAdvertisersLocationListsRequest {
  /** Required. The ID of the DV360 advertiser to which the fetched location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list to fetch. */
  locationListId: string;
}

export const GetAdvertisersLocationListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/locationLists/{locationListsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersLocationListsRequest>;

export type GetAdvertisersLocationListsResponse = LocationList;
export const GetAdvertisersLocationListsResponse = LocationList;

export type GetAdvertisersLocationListsError = CommonErrors;

export const getAdvertisersLocationLists: API.OperationMethod<GetAdvertisersLocationListsRequest, GetAdvertisersLocationListsResponse, GetAdvertisersLocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersLocationListsRequest,
  output: GetAdvertisersLocationListsResponse,
  errors: [],
}));

/** Lists location lists based on a given advertiser id. */
export interface ListAdvertisersLocationListsRequest {
  /** Required. The ID of the DV360 advertiser to which the fetched location lists belong. */
  advertiserId: string;
  /** Requested page size. Must be between `1` and `200`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLocationLists` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `locationListId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by location list fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `locationType` Examples: * All regional location list: `locationType="TARGETING_LOCATION_TYPE_REGIONAL"` * All proximity location list: `locationType="TARGETING_LOCATION_TYPE_PROXIMITY"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersLocationListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/locationLists" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersLocationListsRequest>;

export type ListAdvertisersLocationListsResponse = ListLocationListsResponse;
export const ListAdvertisersLocationListsResponse = ListLocationListsResponse;

export type ListAdvertisersLocationListsError = CommonErrors;

export const listAdvertisersLocationLists = API.makePaginated(() => ({
  input: ListAdvertisersLocationListsRequest,
  output: ListAdvertisersLocationListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new location list. Returns the newly created location list if successful. */
export interface CreateAdvertisersLocationListsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Request body */
  body?: LocationList;
}

export const CreateAdvertisersLocationListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(LocationList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/locationLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersLocationListsRequest>;

export type CreateAdvertisersLocationListsResponse = LocationList;
export const CreateAdvertisersLocationListsResponse = LocationList;

export type CreateAdvertisersLocationListsError = CommonErrors;

export const createAdvertisersLocationLists: API.OperationMethod<CreateAdvertisersLocationListsRequest, CreateAdvertisersLocationListsResponse, CreateAdvertisersLocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersLocationListsRequest,
  output: CreateAdvertisersLocationListsResponse,
  errors: [],
}));

/** Updates a location list. Returns the updated location list if successful. */
export interface PatchAdvertisersLocationListsRequest {
  /** Required. The ID of the DV360 advertiser to which the location lists belongs. */
  advertiserId: string;
  /** Output only. The unique ID of the location list. Assigned by the system. */
  locationListId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: LocationList;
}

export const PatchAdvertisersLocationListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(LocationList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/locationLists/{locationListId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersLocationListsRequest>;

export type PatchAdvertisersLocationListsResponse = LocationList;
export const PatchAdvertisersLocationListsResponse = LocationList;

export type PatchAdvertisersLocationListsError = CommonErrors;

export const patchAdvertisersLocationLists: API.OperationMethod<PatchAdvertisersLocationListsRequest, PatchAdvertisersLocationListsResponse, PatchAdvertisersLocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersLocationListsRequest,
  output: PatchAdvertisersLocationListsResponse,
  errors: [],
}));

/** Lists locations assigned to a location list. */
export interface ListAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list to which these assignments are assigned. */
  locationListId: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAssignedLocations` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedLocationId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `assignedLocationId desc`. */
  orderBy?: string;
  /** Allows filtering by location list assignment fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedLocationId` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersLocationListsAssignedLocationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersLocationListsAssignedLocationsRequest>;

export type ListAdvertisersLocationListsAssignedLocationsResponse = ListAssignedLocationsResponse;
export const ListAdvertisersLocationListsAssignedLocationsResponse = ListAssignedLocationsResponse;

export type ListAdvertisersLocationListsAssignedLocationsError = CommonErrors;

export const listAdvertisersLocationListsAssignedLocations = API.makePaginated(() => ({
  input: ListAdvertisersLocationListsAssignedLocationsRequest,
  output: ListAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an assignment between a location and a location list. */
export interface CreateAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list for which the assignment will be created. */
  locationListId: string;
  /** Request body */
  body?: AssignedLocation;
}

export const CreateAdvertisersLocationListsAssignedLocationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
  body: Schema.optional(AssignedLocation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersLocationListsAssignedLocationsRequest>;

export type CreateAdvertisersLocationListsAssignedLocationsResponse = AssignedLocation;
export const CreateAdvertisersLocationListsAssignedLocationsResponse = AssignedLocation;

export type CreateAdvertisersLocationListsAssignedLocationsError = CommonErrors;

export const createAdvertisersLocationListsAssignedLocations: API.OperationMethod<CreateAdvertisersLocationListsAssignedLocationsRequest, CreateAdvertisersLocationListsAssignedLocationsResponse, CreateAdvertisersLocationListsAssignedLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersLocationListsAssignedLocationsRequest,
  output: CreateAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
}));

/** Deletes the assignment between a location and a location list. */
export interface DeleteAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list to which this assignment is assigned. */
  locationListId: string;
  /** Required. The ID of the assigned location to delete. */
  assignedLocationId: string;
}

export const DeleteAdvertisersLocationListsAssignedLocationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
  assignedLocationId: Schema.String.pipe(T.HttpPath("assignedLocationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations/{assignedLocationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersLocationListsAssignedLocationsRequest>;

export type DeleteAdvertisersLocationListsAssignedLocationsResponse = Empty;
export const DeleteAdvertisersLocationListsAssignedLocationsResponse = Empty;

export type DeleteAdvertisersLocationListsAssignedLocationsError = CommonErrors;

export const deleteAdvertisersLocationListsAssignedLocations: API.OperationMethod<DeleteAdvertisersLocationListsAssignedLocationsRequest, DeleteAdvertisersLocationListsAssignedLocationsResponse, DeleteAdvertisersLocationListsAssignedLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersLocationListsAssignedLocationsRequest,
  output: DeleteAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
}));

/** Bulk edits multiple assignments between locations and a single location list. The operation will delete the assigned locations provided in deletedAssignedLocations and then create the assigned locations provided in createdAssignedLocations. */
export interface BulkEditAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list to which these assignments are assigned. */
  locationListId: string;
  /** Request body */
  body?: BulkEditAssignedLocationsRequest;
}

export const BulkEditAdvertisersLocationListsAssignedLocationsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
  body: Schema.optional(BulkEditAssignedLocationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/locationLists/{locationListsId}/assignedLocations:bulkEdit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditAdvertisersLocationListsAssignedLocationsRequest>;

export type BulkEditAdvertisersLocationListsAssignedLocationsResponse = BulkEditAssignedLocationsResponse;
export const BulkEditAdvertisersLocationListsAssignedLocationsResponse = BulkEditAssignedLocationsResponse;

export type BulkEditAdvertisersLocationListsAssignedLocationsError = CommonErrors;

export const bulkEditAdvertisersLocationListsAssignedLocations: API.OperationMethod<BulkEditAdvertisersLocationListsAssignedLocationsRequest, BulkEditAdvertisersLocationListsAssignedLocationsResponse, BulkEditAdvertisersLocationListsAssignedLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditAdvertisersLocationListsAssignedLocationsRequest,
  output: BulkEditAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
}));

/** Gets a negative keyword list given an advertiser ID and a negative keyword list ID. */
export interface GetAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the fetched negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the negative keyword list to fetch. */
  negativeKeywordListId: string;
}

export const GetAdvertisersNegativeKeywordListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersNegativeKeywordListsRequest>;

export type GetAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;
export const GetAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;

export type GetAdvertisersNegativeKeywordListsError = CommonErrors;

export const getAdvertisersNegativeKeywordLists: API.OperationMethod<GetAdvertisersNegativeKeywordListsRequest, GetAdvertisersNegativeKeywordListsResponse, GetAdvertisersNegativeKeywordListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersNegativeKeywordListsRequest,
  output: GetAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

/** Lists negative keyword lists based on a given advertiser id. */
export interface ListAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the fetched negative keyword lists belong. */
  advertiserId: string;
  /** Requested page size. Must be between `1` and `200`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListNegativeKeywordLists` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersNegativeKeywordListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/negativeKeywordLists" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersNegativeKeywordListsRequest>;

export type ListAdvertisersNegativeKeywordListsResponse = ListNegativeKeywordListsResponse;
export const ListAdvertisersNegativeKeywordListsResponse = ListNegativeKeywordListsResponse;

export type ListAdvertisersNegativeKeywordListsError = CommonErrors;

export const listAdvertisersNegativeKeywordLists = API.makePaginated(() => ({
  input: ListAdvertisersNegativeKeywordListsRequest,
  output: ListAdvertisersNegativeKeywordListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new negative keyword list. Returns the newly created negative keyword list if successful. */
export interface CreateAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the negative keyword list will belong. */
  advertiserId: string;
  /** Request body */
  body?: NegativeKeywordList;
}

export const CreateAdvertisersNegativeKeywordListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(NegativeKeywordList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertisersId}/negativeKeywordLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersNegativeKeywordListsRequest>;

export type CreateAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;
export const CreateAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;

export type CreateAdvertisersNegativeKeywordListsError = CommonErrors;

export const createAdvertisersNegativeKeywordLists: API.OperationMethod<CreateAdvertisersNegativeKeywordListsRequest, CreateAdvertisersNegativeKeywordListsResponse, CreateAdvertisersNegativeKeywordListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersNegativeKeywordListsRequest,
  output: CreateAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

/** Updates a negative keyword list. Returns the updated negative keyword list if successful. */
export interface PatchAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the negative keyword list belongs. */
  advertiserId: string;
  /** Output only. The unique ID of the negative keyword list. Assigned by the system. */
  negativeKeywordListId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: NegativeKeywordList;
}

export const PatchAdvertisersNegativeKeywordListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NegativeKeywordList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersNegativeKeywordListsRequest>;

export type PatchAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;
export const PatchAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;

export type PatchAdvertisersNegativeKeywordListsError = CommonErrors;

export const patchAdvertisersNegativeKeywordLists: API.OperationMethod<PatchAdvertisersNegativeKeywordListsRequest, PatchAdvertisersNegativeKeywordListsResponse, PatchAdvertisersNegativeKeywordListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersNegativeKeywordListsRequest,
  output: PatchAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

/** Deletes a negative keyword list given an advertiser ID and a negative keyword list ID. */
export interface DeleteAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the negative keyword list to delete. */
  negativeKeywordListId: string;
}

export const DeleteAdvertisersNegativeKeywordListsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersNegativeKeywordListsRequest>;

export type DeleteAdvertisersNegativeKeywordListsResponse = Empty;
export const DeleteAdvertisersNegativeKeywordListsResponse = Empty;

export type DeleteAdvertisersNegativeKeywordListsError = CommonErrors;

export const deleteAdvertisersNegativeKeywordLists: API.OperationMethod<DeleteAdvertisersNegativeKeywordListsRequest, DeleteAdvertisersNegativeKeywordListsResponse, DeleteAdvertisersNegativeKeywordListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersNegativeKeywordListsRequest,
  output: DeleteAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

/** Lists negative keywords in a negative keyword list. */
export interface ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the requested negative keywords belong. */
  negativeKeywordListId: string;
  /** Requested page size. Must be between `1` and `1000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListNegativeKeywords` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `keywordValue` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `keywordValue desc`. */
  orderBy?: string;
  /** Allows filtering by negative keyword fields. Supported syntax: * Filter expressions for negative keywords can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `keywordValue` Examples: * All negative keywords for which the keyword value contains "google": `keywordValue : "google"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse = ListNegativeKeywordsResponse;
export const ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse = ListNegativeKeywordsResponse;

export type ListAdvertisersNegativeKeywordListsNegativeKeywordsError = CommonErrors;

export const listAdvertisersNegativeKeywordListsNegativeKeywords = API.makePaginated(() => ({
  input: ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a negative keyword in a negative keyword list. */
export interface CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list in which the negative keyword will be created. */
  negativeKeywordListId: string;
  /** Request body */
  body?: NegativeKeyword;
}

export const CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
  body: Schema.optional(NegativeKeyword).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse = NegativeKeyword;
export const CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse = NegativeKeyword;

export type CreateAdvertisersNegativeKeywordListsNegativeKeywordsError = CommonErrors;

export const createAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest, CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse, CreateAdvertisersNegativeKeywordListsNegativeKeywordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

/** Deletes a negative keyword from a negative keyword list. */
export interface DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the negative keyword belongs. */
  negativeKeywordListId: string;
  /** Required. The keyword value of the negative keyword to delete. */
  keywordValue: string;
}

export const DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
  keywordValue: Schema.String.pipe(T.HttpPath("keywordValue")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords/{negativeKeywordsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse = Empty;
export const DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse = Empty;

export type DeleteAdvertisersNegativeKeywordListsNegativeKeywordsError = CommonErrors;

export const deleteAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest, DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse, DeleteAdvertisersNegativeKeywordListsNegativeKeywordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

/** Bulk edits negative keywords in a single negative keyword list. The operation will delete the negative keywords provided in BulkEditNegativeKeywordsRequest.deleted_negative_keywords and then create the negative keywords provided in BulkEditNegativeKeywordsRequest.created_negative_keywords. This operation is guaranteed to be atomic and will never result in a partial success or partial failure. */
export interface BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the negative keywords belong. */
  negativeKeywordListId: string;
  /** Request body */
  body?: BulkEditNegativeKeywordsRequest;
}

export const BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
  body: Schema.optional(BulkEditNegativeKeywordsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords:bulkEdit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse = BulkEditNegativeKeywordsResponse;
export const BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse = BulkEditNegativeKeywordsResponse;

export type BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsError = CommonErrors;

export const bulkEditAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest, BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse, BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

/** Replaces all negative keywords in a single negative keyword list. The operation will replace the keywords in a negative keyword list with keywords provided in ReplaceNegativeKeywordsRequest.new_negative_keywords. */
export interface ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the negative keywords belong. */
  negativeKeywordListId: string;
  /** Request body */
  body?: ReplaceNegativeKeywordsRequest;
}

export const ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  negativeKeywordListId: Schema.String.pipe(T.HttpPath("negativeKeywordListId")),
  body: Schema.optional(ReplaceNegativeKeywordsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords:replace", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse = ReplaceNegativeKeywordsResponse;
export const ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse = ReplaceNegativeKeywordsResponse;

export type ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsError = CommonErrors;

export const replaceAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest, ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse, ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

/** Gets a combined audience. */
export interface GetCombinedAudiencesRequest {
  /** Required. The ID of the combined audience to fetch. */
  combinedAudienceId: string;
  /** The ID of the partner that has access to the fetched combined audience. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched combined audience. */
  advertiserId?: string;
}

export const GetCombinedAudiencesRequest = Schema.Struct({
  combinedAudienceId: Schema.String.pipe(T.HttpPath("combinedAudienceId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/combinedAudiences/{combinedAudiencesId}" }),
  svc,
) as unknown as Schema.Schema<GetCombinedAudiencesRequest>;

export type GetCombinedAudiencesResponse = CombinedAudience;
export const GetCombinedAudiencesResponse = CombinedAudience;

export type GetCombinedAudiencesError = CommonErrors;

export const getCombinedAudiences: API.OperationMethod<GetCombinedAudiencesRequest, GetCombinedAudiencesResponse, GetCombinedAudiencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCombinedAudiencesRequest,
  output: GetCombinedAudiencesResponse,
  errors: [],
}));

/** Lists combined audiences. The order is defined by the order_by parameter. */
export interface ListCombinedAudiencesRequest {
  /** The ID of the partner that has access to the fetched combined audiences. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched combined audiences. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCombinedAudiences` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `combinedAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by combined audience fields. Supported syntax: * Filter expressions for combined audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All combined audiences for which the display name contains "Google": `displayName : "Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListCombinedAudiencesRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/combinedAudiences" }),
  svc,
) as unknown as Schema.Schema<ListCombinedAudiencesRequest>;

export type ListCombinedAudiencesResponse_Op = ListCombinedAudiencesResponse;
export const ListCombinedAudiencesResponse_Op = ListCombinedAudiencesResponse;

export type ListCombinedAudiencesError = CommonErrors;

export const listCombinedAudiences = API.makePaginated(() => ({
  input: ListCombinedAudiencesRequest,
  output: ListCombinedAudiencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a rules reference object for an AlgorithmRules file. The resulting reference object provides a resource path where the AlgorithmRules file should be uploaded. This reference object should be included when creating a new CustomBiddingAlgorithmRules resource. */
export interface UploadRulesCustomBiddingAlgorithmsRequest {
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
}

export const UploadRulesCustomBiddingAlgorithmsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}:uploadRules" }),
  svc,
) as unknown as Schema.Schema<UploadRulesCustomBiddingAlgorithmsRequest>;

export type UploadRulesCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithmRulesRef;
export const UploadRulesCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithmRulesRef;

export type UploadRulesCustomBiddingAlgorithmsError = CommonErrors;

export const uploadRulesCustomBiddingAlgorithms: API.OperationMethod<UploadRulesCustomBiddingAlgorithmsRequest, UploadRulesCustomBiddingAlgorithmsResponse, UploadRulesCustomBiddingAlgorithmsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadRulesCustomBiddingAlgorithmsRequest,
  output: UploadRulesCustomBiddingAlgorithmsResponse,
  errors: [],
}));

/** Gets a custom bidding algorithm. */
export interface GetCustomBiddingAlgorithmsRequest {
  /** Required. The ID of the custom bidding algorithm to fetch. */
  customBiddingAlgorithmId: string;
  /** The ID of the DV360 partner that has access to the custom bidding algorithm. */
  partnerId?: string;
  /** The ID of the DV360 partner that has access to the custom bidding algorithm. */
  advertiserId?: string;
}

export const GetCustomBiddingAlgorithmsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomBiddingAlgorithmsRequest>;

export type GetCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;
export const GetCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;

export type GetCustomBiddingAlgorithmsError = CommonErrors;

export const getCustomBiddingAlgorithms: API.OperationMethod<GetCustomBiddingAlgorithmsRequest, GetCustomBiddingAlgorithmsResponse, GetCustomBiddingAlgorithmsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomBiddingAlgorithmsRequest,
  output: GetCustomBiddingAlgorithmsResponse,
  errors: [],
}));

/** Lists custom bidding algorithms that are accessible to the current user and can be used in bidding stratgies. The order is defined by the order_by parameter. */
export interface ListCustomBiddingAlgorithmsRequest {
  /** The ID of the DV360 partner that has access to the custom bidding algorithm. */
  partnerId?: string;
  /** The ID of the DV360 advertiser that has access to the custom bidding algorithm. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomBiddingAlgorithms` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by custom bidding algorithm fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `customBiddingAlgorithmType` field must use the `EQUALS (=)` operator. * The `displayName` field must use the `HAS (:)` operator. Supported fields: * `customBiddingAlgorithmType` * `displayName` Examples: * All custom bidding algorithms for which the display name contains "politics": `displayName:"politics"`. * All custom bidding algorithms for which the type is "SCRIPT_BASED": `customBiddingAlgorithmType=SCRIPT_BASED` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListCustomBiddingAlgorithmsRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms" }),
  svc,
) as unknown as Schema.Schema<ListCustomBiddingAlgorithmsRequest>;

export type ListCustomBiddingAlgorithmsResponse_Op = ListCustomBiddingAlgorithmsResponse;
export const ListCustomBiddingAlgorithmsResponse_Op = ListCustomBiddingAlgorithmsResponse;

export type ListCustomBiddingAlgorithmsError = CommonErrors;

export const listCustomBiddingAlgorithms = API.makePaginated(() => ({
  input: ListCustomBiddingAlgorithmsRequest,
  output: ListCustomBiddingAlgorithmsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new custom bidding algorithm. Returns the newly created custom bidding algorithm if successful. */
export interface CreateCustomBiddingAlgorithmsRequest {
  /** Request body */
  body?: CustomBiddingAlgorithm;
}

export const CreateCustomBiddingAlgorithmsRequest = Schema.Struct({
  body: Schema.optional(CustomBiddingAlgorithm).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/customBiddingAlgorithms", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomBiddingAlgorithmsRequest>;

export type CreateCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;
export const CreateCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;

export type CreateCustomBiddingAlgorithmsError = CommonErrors;

export const createCustomBiddingAlgorithms: API.OperationMethod<CreateCustomBiddingAlgorithmsRequest, CreateCustomBiddingAlgorithmsResponse, CreateCustomBiddingAlgorithmsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomBiddingAlgorithmsRequest,
  output: CreateCustomBiddingAlgorithmsResponse,
  errors: [],
}));

/** Updates an existing custom bidding algorithm. Returns the updated custom bidding algorithm if successful. Requests updating a custom bidding algorithm assigned to a line item will return an error. */
export interface PatchCustomBiddingAlgorithmsRequest {
  /** Output only. The unique ID of the custom bidding algorithm. Assigned by the system. */
  customBiddingAlgorithmId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: CustomBiddingAlgorithm;
}

export const PatchCustomBiddingAlgorithmsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CustomBiddingAlgorithm).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomBiddingAlgorithmsRequest>;

export type PatchCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;
export const PatchCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;

export type PatchCustomBiddingAlgorithmsError = CommonErrors;

export const patchCustomBiddingAlgorithms: API.OperationMethod<PatchCustomBiddingAlgorithmsRequest, PatchCustomBiddingAlgorithmsResponse, PatchCustomBiddingAlgorithmsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomBiddingAlgorithmsRequest,
  output: PatchCustomBiddingAlgorithmsResponse,
  errors: [],
}));

/** Creates a custom bidding script reference object for a script file. The resulting reference object provides a resource path to which the script file should be uploaded. This reference object should be included in when creating a new custom bidding script object. */
export interface UploadScriptCustomBiddingAlgorithmsRequest {
  /** Required. The ID of the custom bidding algorithm owns the script. */
  customBiddingAlgorithmId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
}

export const UploadScriptCustomBiddingAlgorithmsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}:uploadScript" }),
  svc,
) as unknown as Schema.Schema<UploadScriptCustomBiddingAlgorithmsRequest>;

export type UploadScriptCustomBiddingAlgorithmsResponse = CustomBiddingScriptRef;
export const UploadScriptCustomBiddingAlgorithmsResponse = CustomBiddingScriptRef;

export type UploadScriptCustomBiddingAlgorithmsError = CommonErrors;

export const uploadScriptCustomBiddingAlgorithms: API.OperationMethod<UploadScriptCustomBiddingAlgorithmsRequest, UploadScriptCustomBiddingAlgorithmsResponse, UploadScriptCustomBiddingAlgorithmsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadScriptCustomBiddingAlgorithmsRequest,
  output: UploadScriptCustomBiddingAlgorithmsResponse,
  errors: [],
}));

/** Creates a new rules resource. Returns the newly created rules resource if successful. Requests creating a custom bidding rules resource under an algorithm assigned to a line item will return an error. */
export interface CreateCustomBiddingAlgorithmsRulesRequest {
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this rules resource. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Request body */
  body?: CustomBiddingAlgorithmRules;
}

export const CreateCustomBiddingAlgorithmsRulesRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(CustomBiddingAlgorithmRules).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/rules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomBiddingAlgorithmsRulesRequest>;

export type CreateCustomBiddingAlgorithmsRulesResponse = CustomBiddingAlgorithmRules;
export const CreateCustomBiddingAlgorithmsRulesResponse = CustomBiddingAlgorithmRules;

export type CreateCustomBiddingAlgorithmsRulesError = CommonErrors;

export const createCustomBiddingAlgorithmsRules: API.OperationMethod<CreateCustomBiddingAlgorithmsRulesRequest, CreateCustomBiddingAlgorithmsRulesResponse, CreateCustomBiddingAlgorithmsRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomBiddingAlgorithmsRulesRequest,
  output: CreateCustomBiddingAlgorithmsRulesResponse,
  errors: [],
}));

/** Retrieves a rules resource. */
export interface GetCustomBiddingAlgorithmsRulesRequest {
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
  /** Required. The ID of the rules resource to fetch. */
  customBiddingAlgorithmRulesId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
}

export const GetCustomBiddingAlgorithmsRulesRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  customBiddingAlgorithmRulesId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmRulesId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/rules/{rulesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomBiddingAlgorithmsRulesRequest>;

export type GetCustomBiddingAlgorithmsRulesResponse = CustomBiddingAlgorithmRules;
export const GetCustomBiddingAlgorithmsRulesResponse = CustomBiddingAlgorithmRules;

export type GetCustomBiddingAlgorithmsRulesError = CommonErrors;

export const getCustomBiddingAlgorithmsRules: API.OperationMethod<GetCustomBiddingAlgorithmsRulesRequest, GetCustomBiddingAlgorithmsRulesResponse, GetCustomBiddingAlgorithmsRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomBiddingAlgorithmsRulesRequest,
  output: GetCustomBiddingAlgorithmsRulesResponse,
  errors: [],
}));

/** Lists rules resources that belong to the given algorithm. The order is defined by the order_by parameter. */
export interface ListCustomBiddingAlgorithmsRulesRequest {
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomBiddingAlgorithmRules` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `createTime desc` (default) The default sorting order is descending. To specify ascending order for a field, the suffix "desc" should be removed. Example: `createTime`. */
  orderBy?: string;
}

export const ListCustomBiddingAlgorithmsRulesRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/rules" }),
  svc,
) as unknown as Schema.Schema<ListCustomBiddingAlgorithmsRulesRequest>;

export type ListCustomBiddingAlgorithmsRulesResponse = ListCustomBiddingAlgorithmRulesResponse;
export const ListCustomBiddingAlgorithmsRulesResponse = ListCustomBiddingAlgorithmRulesResponse;

export type ListCustomBiddingAlgorithmsRulesError = CommonErrors;

export const listCustomBiddingAlgorithmsRules = API.makePaginated(() => ({
  input: ListCustomBiddingAlgorithmsRulesRequest,
  output: ListCustomBiddingAlgorithmsRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new custom bidding script. Returns the newly created script if successful. Requests creating a custom bidding script under an algorithm assigned to a line item will return an error. */
export interface CreateCustomBiddingAlgorithmsScriptsRequest {
  /** Required. The ID of the custom bidding algorithm that owns the script. */
  customBiddingAlgorithmId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Request body */
  body?: CustomBiddingScript;
}

export const CreateCustomBiddingAlgorithmsScriptsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(CustomBiddingScript).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/scripts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomBiddingAlgorithmsScriptsRequest>;

export type CreateCustomBiddingAlgorithmsScriptsResponse = CustomBiddingScript;
export const CreateCustomBiddingAlgorithmsScriptsResponse = CustomBiddingScript;

export type CreateCustomBiddingAlgorithmsScriptsError = CommonErrors;

export const createCustomBiddingAlgorithmsScripts: API.OperationMethod<CreateCustomBiddingAlgorithmsScriptsRequest, CreateCustomBiddingAlgorithmsScriptsResponse, CreateCustomBiddingAlgorithmsScriptsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomBiddingAlgorithmsScriptsRequest,
  output: CreateCustomBiddingAlgorithmsScriptsResponse,
  errors: [],
}));

/** Gets a custom bidding script. */
export interface GetCustomBiddingAlgorithmsScriptsRequest {
  /** Required. The ID of the custom bidding algorithm owns the script. */
  customBiddingAlgorithmId: string;
  /** Required. The ID of the custom bidding script to fetch. */
  customBiddingScriptId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
}

export const GetCustomBiddingAlgorithmsScriptsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  customBiddingScriptId: Schema.String.pipe(T.HttpPath("customBiddingScriptId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/scripts/{scriptsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomBiddingAlgorithmsScriptsRequest>;

export type GetCustomBiddingAlgorithmsScriptsResponse = CustomBiddingScript;
export const GetCustomBiddingAlgorithmsScriptsResponse = CustomBiddingScript;

export type GetCustomBiddingAlgorithmsScriptsError = CommonErrors;

export const getCustomBiddingAlgorithmsScripts: API.OperationMethod<GetCustomBiddingAlgorithmsScriptsRequest, GetCustomBiddingAlgorithmsScriptsResponse, GetCustomBiddingAlgorithmsScriptsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomBiddingAlgorithmsScriptsRequest,
  output: GetCustomBiddingAlgorithmsScriptsResponse,
  errors: [],
}));

/** Lists custom bidding scripts that belong to the given algorithm. The order is defined by the order_by parameter. */
export interface ListCustomBiddingAlgorithmsScriptsRequest {
  /** Required. The ID of the custom bidding algorithm owns the script. */
  customBiddingAlgorithmId: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomBiddingScripts` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `createTime desc` (default) The default sorting order is descending. To specify ascending order for a field, the suffix "desc" should be removed. Example: `createTime`. */
  orderBy?: string;
}

export const ListCustomBiddingAlgorithmsScriptsRequest = Schema.Struct({
  customBiddingAlgorithmId: Schema.String.pipe(T.HttpPath("customBiddingAlgorithmId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/scripts" }),
  svc,
) as unknown as Schema.Schema<ListCustomBiddingAlgorithmsScriptsRequest>;

export type ListCustomBiddingAlgorithmsScriptsResponse = ListCustomBiddingScriptsResponse;
export const ListCustomBiddingAlgorithmsScriptsResponse = ListCustomBiddingScriptsResponse;

export type ListCustomBiddingAlgorithmsScriptsError = CommonErrors;

export const listCustomBiddingAlgorithmsScripts = API.makePaginated(() => ({
  input: ListCustomBiddingAlgorithmsScriptsRequest,
  output: ListCustomBiddingAlgorithmsScriptsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a custom list. */
export interface GetCustomListsRequest {
  /** Required. The ID of the custom list to fetch. */
  customListId: string;
  /** The ID of the DV360 advertiser that has access to the fetched custom lists. */
  advertiserId?: string;
}

export const GetCustomListsRequest = Schema.Struct({
  customListId: Schema.String.pipe(T.HttpPath("customListId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customLists/{customListsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomListsRequest>;

export type GetCustomListsResponse = CustomList;
export const GetCustomListsResponse = CustomList;

export type GetCustomListsError = CommonErrors;

export const getCustomLists: API.OperationMethod<GetCustomListsRequest, GetCustomListsResponse, GetCustomListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomListsRequest,
  output: GetCustomListsResponse,
  errors: [],
}));

/** Lists custom lists. The order is defined by the order_by parameter. */
export interface ListCustomListsRequest {
  /** The ID of the DV360 advertiser that has access to the fetched custom lists. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomLists` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `customListId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by custom list fields. Supported syntax: * Filter expressions for custom lists can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All custom lists for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListCustomListsRequest = Schema.Struct({
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/customLists" }),
  svc,
) as unknown as Schema.Schema<ListCustomListsRequest>;

export type ListCustomListsResponse_Op = ListCustomListsResponse;
export const ListCustomListsResponse_Op = ListCustomListsResponse;

export type ListCustomListsError = CommonErrors;

export const listCustomLists = API.makePaginated(() => ({
  input: ListCustomListsRequest,
  output: ListCustomListsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a first party or partner audience. */
export interface GetFirstPartyAndPartnerAudiencesRequest {
  /** Required. The ID of the first party and partner audience to fetch. */
  firstPartyAndPartnerAudienceId: string;
  /** The ID of the partner that has access to the fetched first party and partner audience. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched first party and partner audience. */
  advertiserId?: string;
}

export const GetFirstPartyAndPartnerAudiencesRequest = Schema.Struct({
  firstPartyAndPartnerAudienceId: Schema.String.pipe(T.HttpPath("firstPartyAndPartnerAudienceId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/firstPartyAndPartnerAudiences/{firstPartyAndPartnerAudiencesId}" }),
  svc,
) as unknown as Schema.Schema<GetFirstPartyAndPartnerAudiencesRequest>;

export type GetFirstPartyAndPartnerAudiencesResponse = FirstPartyAndPartnerAudience;
export const GetFirstPartyAndPartnerAudiencesResponse = FirstPartyAndPartnerAudience;

export type GetFirstPartyAndPartnerAudiencesError = CommonErrors;

export const getFirstPartyAndPartnerAudiences: API.OperationMethod<GetFirstPartyAndPartnerAudiencesRequest, GetFirstPartyAndPartnerAudiencesResponse, GetFirstPartyAndPartnerAudiencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFirstPartyAndPartnerAudiencesRequest,
  output: GetFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

/** Lists first party and partner audiences. The order is defined by the order_by parameter. */
export interface ListFirstPartyAndPartnerAudiencesRequest {
  /** The ID of the partner that has access to the fetched first party and partner audiences. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched first party and partner audiences. */
  advertiserId?: string;
  /** Optional. Requested page size. Must be between `1` and `5000`. If unspecified, this value defaults to `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListFirstPartyAndPartnerAudiences` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `FirstPartyAndPartnerAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by first party and partner audience fields. Supported syntax: * Filter expressions for first party and partner audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All first party and partner audiences for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListFirstPartyAndPartnerAudiencesRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/firstPartyAndPartnerAudiences" }),
  svc,
) as unknown as Schema.Schema<ListFirstPartyAndPartnerAudiencesRequest>;

export type ListFirstPartyAndPartnerAudiencesResponse_Op = ListFirstPartyAndPartnerAudiencesResponse;
export const ListFirstPartyAndPartnerAudiencesResponse_Op = ListFirstPartyAndPartnerAudiencesResponse;

export type ListFirstPartyAndPartnerAudiencesError = CommonErrors;

export const listFirstPartyAndPartnerAudiences = API.makePaginated(() => ({
  input: ListFirstPartyAndPartnerAudiencesRequest,
  output: ListFirstPartyAndPartnerAudiencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a FirstPartyAndPartnerAudience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
export interface CreateFirstPartyAndPartnerAudiencesRequest {
  /** Required. The ID of the advertiser under whom the FirstPartyAndPartnerAudience will be created. */
  advertiserId?: string;
  /** Request body */
  body?: FirstPartyAndPartnerAudience;
}

export const CreateFirstPartyAndPartnerAudiencesRequest = Schema.Struct({
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(FirstPartyAndPartnerAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/firstPartyAndPartnerAudiences", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFirstPartyAndPartnerAudiencesRequest>;

export type CreateFirstPartyAndPartnerAudiencesResponse = FirstPartyAndPartnerAudience;
export const CreateFirstPartyAndPartnerAudiencesResponse = FirstPartyAndPartnerAudience;

export type CreateFirstPartyAndPartnerAudiencesError = CommonErrors;

export const createFirstPartyAndPartnerAudiences: API.OperationMethod<CreateFirstPartyAndPartnerAudiencesRequest, CreateFirstPartyAndPartnerAudiencesResponse, CreateFirstPartyAndPartnerAudiencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFirstPartyAndPartnerAudiencesRequest,
  output: CreateFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

/** Updates an existing FirstPartyAndPartnerAudience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
export interface PatchFirstPartyAndPartnerAudiencesRequest {
  /** Identifier. The unique ID of the first party and partner audience. Assigned by the system. */
  firstPartyAndPartnerAudienceId: string;
  /** Required. The mask to control which fields to update. Updates are only supported for the following fields: * `displayName` * `description` * `membershipDurationDays` */
  updateMask?: string;
  /** Required. The ID of the owner advertiser of the updated FirstPartyAndPartnerAudience. */
  advertiserId?: string;
  /** Request body */
  body?: FirstPartyAndPartnerAudience;
}

export const PatchFirstPartyAndPartnerAudiencesRequest = Schema.Struct({
  firstPartyAndPartnerAudienceId: Schema.String.pipe(T.HttpPath("firstPartyAndPartnerAudienceId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(FirstPartyAndPartnerAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/firstPartyAndPartnerAudiences/{firstPartyAndPartnerAudiencesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFirstPartyAndPartnerAudiencesRequest>;

export type PatchFirstPartyAndPartnerAudiencesResponse = FirstPartyAndPartnerAudience;
export const PatchFirstPartyAndPartnerAudiencesResponse = FirstPartyAndPartnerAudience;

export type PatchFirstPartyAndPartnerAudiencesError = CommonErrors;

export const patchFirstPartyAndPartnerAudiences: API.OperationMethod<PatchFirstPartyAndPartnerAudiencesRequest, PatchFirstPartyAndPartnerAudiencesResponse, PatchFirstPartyAndPartnerAudiencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFirstPartyAndPartnerAudiencesRequest,
  output: PatchFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

/** Updates the member list of a Customer Match audience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
export interface EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest {
  /** Required. The ID of the Customer Match FirstPartyAndPartnerAudience whose members will be edited. */
  firstPartyAndPartnerAudienceId: string;
  /** Request body */
  body?: EditCustomerMatchMembersRequest;
}

export const EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest = Schema.Struct({
  firstPartyAndPartnerAudienceId: Schema.String.pipe(T.HttpPath("firstPartyAndPartnerAudienceId")),
  body: Schema.optional(EditCustomerMatchMembersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/firstPartyAndPartnerAudiences/{firstPartyAndPartnerAudiencesId}:editCustomerMatchMembers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest>;

export type EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse = EditCustomerMatchMembersResponse;
export const EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse = EditCustomerMatchMembersResponse;

export type EditCustomerMatchMembersFirstPartyAndPartnerAudiencesError = CommonErrors;

export const editCustomerMatchMembersFirstPartyAndPartnerAudiences: API.OperationMethod<EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest, EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse, EditCustomerMatchMembersFirstPartyAndPartnerAudiencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest,
  output: EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

/** Gets a Floodlight group. */
export interface GetFloodlightGroupsRequest {
  /** Required. The ID of the Floodlight group to fetch. */
  floodlightGroupId: string;
  /** Required. The partner context by which the Floodlight group is being accessed. */
  partnerId?: string;
}

export const GetFloodlightGroupsRequest = Schema.Struct({
  floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/floodlightGroups/{floodlightGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetFloodlightGroupsRequest>;

export type GetFloodlightGroupsResponse = FloodlightGroup;
export const GetFloodlightGroupsResponse = FloodlightGroup;

export type GetFloodlightGroupsError = CommonErrors;

export const getFloodlightGroups: API.OperationMethod<GetFloodlightGroupsRequest, GetFloodlightGroupsResponse, GetFloodlightGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFloodlightGroupsRequest,
  output: GetFloodlightGroupsResponse,
  errors: [],
}));

/** Updates an existing Floodlight group. Returns the updated Floodlight group if successful. */
export interface PatchFloodlightGroupsRequest {
  /** Output only. The unique ID of the Floodlight group. Assigned by the system. */
  floodlightGroupId: string;
  /** Required. The partner context by which the Floodlight group is being accessed. */
  partnerId?: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: FloodlightGroup;
}

export const PatchFloodlightGroupsRequest = Schema.Struct({
  floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(FloodlightGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/floodlightGroups/{floodlightGroupId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFloodlightGroupsRequest>;

export type PatchFloodlightGroupsResponse = FloodlightGroup;
export const PatchFloodlightGroupsResponse = FloodlightGroup;

export type PatchFloodlightGroupsError = CommonErrors;

export const patchFloodlightGroups: API.OperationMethod<PatchFloodlightGroupsRequest, PatchFloodlightGroupsResponse, PatchFloodlightGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFloodlightGroupsRequest,
  output: PatchFloodlightGroupsResponse,
  errors: [],
}));

/** Gets a Floodlight activity. */
export interface GetFloodlightGroupsFloodlightActivitiesRequest {
  /** Required. The ID of the parent Floodlight group to which the requested Floodlight activity belongs. */
  floodlightGroupId: string;
  /** Required. The ID of the Floodlight activity to fetch. */
  floodlightActivityId: string;
  /** Required. The ID of the partner through which the Floodlight activity is being accessed. */
  partnerId?: string;
}

export const GetFloodlightGroupsFloodlightActivitiesRequest = Schema.Struct({
  floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
  floodlightActivityId: Schema.String.pipe(T.HttpPath("floodlightActivityId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/floodlightGroups/{floodlightGroupsId}/floodlightActivities/{floodlightActivitiesId}" }),
  svc,
) as unknown as Schema.Schema<GetFloodlightGroupsFloodlightActivitiesRequest>;

export type GetFloodlightGroupsFloodlightActivitiesResponse = FloodlightActivity;
export const GetFloodlightGroupsFloodlightActivitiesResponse = FloodlightActivity;

export type GetFloodlightGroupsFloodlightActivitiesError = CommonErrors;

export const getFloodlightGroupsFloodlightActivities: API.OperationMethod<GetFloodlightGroupsFloodlightActivitiesRequest, GetFloodlightGroupsFloodlightActivitiesResponse, GetFloodlightGroupsFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFloodlightGroupsFloodlightActivitiesRequest,
  output: GetFloodlightGroupsFloodlightActivitiesResponse,
  errors: [],
}));

/** Lists Floodlight activities in a Floodlight group. */
export interface ListFloodlightGroupsFloodlightActivitiesRequest {
  /** Required. The ID of the parent Floodlight group to which the requested Floodlight activities belong. */
  floodlightGroupId: string;
  /** Required. The ID of the partner through which the Floodlight activities are being accessed. */
  partnerId?: string;
  /** Optional. Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListFloodlightActivities` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `displayName` (default) * `floodlightActivityId` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
}

export const ListFloodlightGroupsFloodlightActivitiesRequest = Schema.Struct({
  floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v4/floodlightGroups/{floodlightGroupsId}/floodlightActivities" }),
  svc,
) as unknown as Schema.Schema<ListFloodlightGroupsFloodlightActivitiesRequest>;

export type ListFloodlightGroupsFloodlightActivitiesResponse = ListFloodlightActivitiesResponse;
export const ListFloodlightGroupsFloodlightActivitiesResponse = ListFloodlightActivitiesResponse;

export type ListFloodlightGroupsFloodlightActivitiesError = CommonErrors;

export const listFloodlightGroupsFloodlightActivities = API.makePaginated(() => ({
  input: ListFloodlightGroupsFloodlightActivitiesRequest,
  output: ListFloodlightGroupsFloodlightActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a Google audience. */
export interface GetGoogleAudiencesRequest {
  /** Required. The ID of the Google audience to fetch. */
  googleAudienceId: string;
  /** The ID of the partner that has access to the fetched Google audience. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched Google audience. */
  advertiserId?: string;
}

export const GetGoogleAudiencesRequest = Schema.Struct({
  googleAudienceId: Schema.String.pipe(T.HttpPath("googleAudienceId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/googleAudiences/{googleAudiencesId}" }),
  svc,
) as unknown as Schema.Schema<GetGoogleAudiencesRequest>;

export type GetGoogleAudiencesResponse = GoogleAudience;
export const GetGoogleAudiencesResponse = GoogleAudience;

export type GetGoogleAudiencesError = CommonErrors;

export const getGoogleAudiences: API.OperationMethod<GetGoogleAudiencesRequest, GetGoogleAudiencesResponse, GetGoogleAudiencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGoogleAudiencesRequest,
  output: GetGoogleAudiencesResponse,
  errors: [],
}));

/** Lists Google audiences. The order is defined by the order_by parameter. */
export interface ListGoogleAudiencesRequest {
  /** The ID of the partner that has access to the fetched Google audiences. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched Google audiences. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListGoogleAudiences` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `googleAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by Google audience fields. Supported syntax: * Filter expressions for Google audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All Google audiences for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListGoogleAudiencesRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/googleAudiences" }),
  svc,
) as unknown as Schema.Schema<ListGoogleAudiencesRequest>;

export type ListGoogleAudiencesResponse_Op = ListGoogleAudiencesResponse;
export const ListGoogleAudiencesResponse_Op = ListGoogleAudiencesResponse;

export type ListGoogleAudiencesError = CommonErrors;

export const listGoogleAudiences = API.makePaginated(() => ({
  input: ListGoogleAudiencesRequest,
  output: ListGoogleAudiencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new guaranteed order. Returns the newly created guaranteed order if successful. */
export interface CreateGuaranteedOrdersRequest {
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** Request body */
  body?: GuaranteedOrder;
}

export const CreateGuaranteedOrdersRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(GuaranteedOrder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/guaranteedOrders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGuaranteedOrdersRequest>;

export type CreateGuaranteedOrdersResponse = GuaranteedOrder;
export const CreateGuaranteedOrdersResponse = GuaranteedOrder;

export type CreateGuaranteedOrdersError = CommonErrors;

export const createGuaranteedOrders: API.OperationMethod<CreateGuaranteedOrdersRequest, CreateGuaranteedOrdersResponse, CreateGuaranteedOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGuaranteedOrdersRequest,
  output: CreateGuaranteedOrdersResponse,
  errors: [],
}));

/** Gets a guaranteed order. */
export interface GetGuaranteedOrdersRequest {
  /** Required. The ID of the guaranteed order to fetch. The ID is of the format `{exchange}-{legacy_guaranteed_order_id}` */
  guaranteedOrderId: string;
  /** The ID of the partner that has access to the guaranteed order. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the guaranteed order. */
  advertiserId?: string;
}

export const GetGuaranteedOrdersRequest = Schema.Struct({
  guaranteedOrderId: Schema.String.pipe(T.HttpPath("guaranteedOrderId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/guaranteedOrders/{guaranteedOrdersId}" }),
  svc,
) as unknown as Schema.Schema<GetGuaranteedOrdersRequest>;

export type GetGuaranteedOrdersResponse = GuaranteedOrder;
export const GetGuaranteedOrdersResponse = GuaranteedOrder;

export type GetGuaranteedOrdersError = CommonErrors;

export const getGuaranteedOrders: API.OperationMethod<GetGuaranteedOrdersRequest, GetGuaranteedOrdersResponse, GetGuaranteedOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGuaranteedOrdersRequest,
  output: GetGuaranteedOrdersResponse,
  errors: [],
}));

/** Lists guaranteed orders that are accessible to the current user. The order is defined by the order_by parameter. If a filter by entity_status is not specified, guaranteed orders with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export interface ListGuaranteedOrdersRequest {
  /** The ID of the partner that has access to the guaranteed order. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the guaranteed order. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListGuaranteedOrders` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by guaranteed order fields. * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `guaranteed_order_id` * `exchange` * `display_name` * `status.entityStatus` Examples: * All active guaranteed orders: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Guaranteed orders belonging to Google Ad Manager or Rubicon exchanges: `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListGuaranteedOrdersRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/guaranteedOrders" }),
  svc,
) as unknown as Schema.Schema<ListGuaranteedOrdersRequest>;

export type ListGuaranteedOrdersResponse_Op = ListGuaranteedOrdersResponse;
export const ListGuaranteedOrdersResponse_Op = ListGuaranteedOrdersResponse;

export type ListGuaranteedOrdersError = CommonErrors;

export const listGuaranteedOrders = API.makePaginated(() => ({
  input: ListGuaranteedOrdersRequest,
  output: ListGuaranteedOrdersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing guaranteed order. Returns the updated guaranteed order if successful. */
export interface PatchGuaranteedOrdersRequest {
  /** Output only. The unique identifier of the guaranteed order. The guaranteed order IDs have the format `{exchange}-{legacy_guaranteed_order_id}`. */
  guaranteedOrderId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** Request body */
  body?: GuaranteedOrder;
}

export const PatchGuaranteedOrdersRequest = Schema.Struct({
  guaranteedOrderId: Schema.String.pipe(T.HttpPath("guaranteedOrderId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(GuaranteedOrder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/guaranteedOrders/{guaranteedOrdersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchGuaranteedOrdersRequest>;

export type PatchGuaranteedOrdersResponse = GuaranteedOrder;
export const PatchGuaranteedOrdersResponse = GuaranteedOrder;

export type PatchGuaranteedOrdersError = CommonErrors;

export const patchGuaranteedOrders: API.OperationMethod<PatchGuaranteedOrdersRequest, PatchGuaranteedOrdersResponse, PatchGuaranteedOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchGuaranteedOrdersRequest,
  output: PatchGuaranteedOrdersResponse,
  errors: [],
}));

/** Edits read advertisers of a guaranteed order. */
export interface EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest {
  /** Required. The ID of the guaranteed order to edit. The ID is of the format `{exchange}-{legacy_guaranteed_order_id}` */
  guaranteedOrderId: string;
  /** Request body */
  body?: EditGuaranteedOrderReadAccessorsRequest;
}

export const EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest = Schema.Struct({
  guaranteedOrderId: Schema.String.pipe(T.HttpPath("guaranteedOrderId")),
  body: Schema.optional(EditGuaranteedOrderReadAccessorsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/guaranteedOrders/{guaranteedOrdersId}:editGuaranteedOrderReadAccessors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest>;

export type EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse = EditGuaranteedOrderReadAccessorsResponse;
export const EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse = EditGuaranteedOrderReadAccessorsResponse;

export type EditGuaranteedOrderReadAccessorsGuaranteedOrdersError = CommonErrors;

export const editGuaranteedOrderReadAccessorsGuaranteedOrders: API.OperationMethod<EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest, EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse, EditGuaranteedOrderReadAccessorsGuaranteedOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest,
  output: EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse,
  errors: [],
}));

/** Gets an inventory source group. */
export interface GetInventorySourceGroupsRequest {
  /** Required. The ID of the inventory source group to fetch. */
  inventorySourceGroupId: string;
  /** The ID of the partner that has access to the inventory source group. A partner cannot access an advertiser-owned inventory source group. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the inventory source group. If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group. */
  advertiserId?: string;
}

export const GetInventorySourceGroupsRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/inventorySourceGroups/{inventorySourceGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetInventorySourceGroupsRequest>;

export type GetInventorySourceGroupsResponse = InventorySourceGroup;
export const GetInventorySourceGroupsResponse = InventorySourceGroup;

export type GetInventorySourceGroupsError = CommonErrors;

export const getInventorySourceGroups: API.OperationMethod<GetInventorySourceGroupsRequest, GetInventorySourceGroupsResponse, GetInventorySourceGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInventorySourceGroupsRequest,
  output: GetInventorySourceGroupsResponse,
  errors: [],
}));

/** Lists inventory source groups that are accessible to the current user. The order is defined by the order_by parameter. */
export interface ListInventorySourceGroupsRequest {
  /** The ID of the partner that has access to the inventory source group. A partner cannot access advertiser-owned inventory source groups. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the inventory source group. If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `inventorySourceGroupId` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by inventory source group fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `inventorySourceGroupId` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListInventorySourceGroupsRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/inventorySourceGroups" }),
  svc,
) as unknown as Schema.Schema<ListInventorySourceGroupsRequest>;

export type ListInventorySourceGroupsResponse_Op = ListInventorySourceGroupsResponse;
export const ListInventorySourceGroupsResponse_Op = ListInventorySourceGroupsResponse;

export type ListInventorySourceGroupsError = CommonErrors;

export const listInventorySourceGroups = API.makePaginated(() => ({
  input: ListInventorySourceGroupsRequest,
  output: ListInventorySourceGroupsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new inventory source group. Returns the newly created inventory source group if successful. */
export interface CreateInventorySourceGroupsRequest {
  /** The ID of the partner that owns the inventory source group. Only this partner will have write access to this group. Only advertisers to which this group is explicitly shared will have read access to this group. */
  partnerId?: string;
  /** The ID of the advertiser that owns the inventory source group. The parent partner will not have access to this group. */
  advertiserId?: string;
  /** Request body */
  body?: InventorySourceGroup;
}

export const CreateInventorySourceGroupsRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(InventorySourceGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/inventorySourceGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInventorySourceGroupsRequest>;

export type CreateInventorySourceGroupsResponse = InventorySourceGroup;
export const CreateInventorySourceGroupsResponse = InventorySourceGroup;

export type CreateInventorySourceGroupsError = CommonErrors;

export const createInventorySourceGroups: API.OperationMethod<CreateInventorySourceGroupsRequest, CreateInventorySourceGroupsResponse, CreateInventorySourceGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInventorySourceGroupsRequest,
  output: CreateInventorySourceGroupsResponse,
  errors: [],
}));

/** Updates an inventory source group. Returns the updated inventory source group if successful. */
export interface PatchInventorySourceGroupsRequest {
  /** Output only. The unique ID of the inventory source group. Assigned by the system. */
  inventorySourceGroupId: string;
  /** The ID of the partner that owns the inventory source group. Only this partner has write access to this group. */
  partnerId?: string;
  /** The ID of the advertiser that owns the inventory source group. The parent partner does not have access to this group. */
  advertiserId?: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: InventorySourceGroup;
}

export const PatchInventorySourceGroupsRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InventorySourceGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/inventorySourceGroups/{inventorySourceGroupId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInventorySourceGroupsRequest>;

export type PatchInventorySourceGroupsResponse = InventorySourceGroup;
export const PatchInventorySourceGroupsResponse = InventorySourceGroup;

export type PatchInventorySourceGroupsError = CommonErrors;

export const patchInventorySourceGroups: API.OperationMethod<PatchInventorySourceGroupsRequest, PatchInventorySourceGroupsResponse, PatchInventorySourceGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInventorySourceGroupsRequest,
  output: PatchInventorySourceGroupsResponse,
  errors: [],
}));

/** Deletes an inventory source group. */
export interface DeleteInventorySourceGroupsRequest {
  /** Required. The ID of the inventory source group to delete. */
  inventorySourceGroupId: string;
  /** The ID of the partner that owns the inventory source group. Only this partner has write access to this group. */
  partnerId?: string;
  /** The ID of the advertiser that owns the inventory source group. The parent partner does not have access to this group. */
  advertiserId?: string;
}

export const DeleteInventorySourceGroupsRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/inventorySourceGroups/{inventorySourceGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInventorySourceGroupsRequest>;

export type DeleteInventorySourceGroupsResponse = Empty;
export const DeleteInventorySourceGroupsResponse = Empty;

export type DeleteInventorySourceGroupsError = CommonErrors;

export const deleteInventorySourceGroups: API.OperationMethod<DeleteInventorySourceGroupsRequest, DeleteInventorySourceGroupsResponse, DeleteInventorySourceGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInventorySourceGroupsRequest,
  output: DeleteInventorySourceGroupsResponse,
  errors: [],
}));

/** Lists inventory sources assigned to an inventory source group. */
export interface ListInventorySourceGroupsAssignedInventorySourcesRequest {
  /** Required. The ID of the inventory source group to which these assignments are assigned. */
  inventorySourceGroupId: string;
  /** The ID of the partner that has access to the assignment. If the parent inventory source group is advertiser-owned, the assignment cannot be accessed via a partner. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the assignment. If the parent inventory source group is partner-owned, only advertisers to which the parent group is explicitly shared can access the assigned inventory source. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAssignedInventorySources` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedInventorySourceId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `assignedInventorySourceId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned inventory source fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedInventorySourceId` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListInventorySourceGroupsAssignedInventorySourcesRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources" }),
  svc,
) as unknown as Schema.Schema<ListInventorySourceGroupsAssignedInventorySourcesRequest>;

export type ListInventorySourceGroupsAssignedInventorySourcesResponse = ListAssignedInventorySourcesResponse;
export const ListInventorySourceGroupsAssignedInventorySourcesResponse = ListAssignedInventorySourcesResponse;

export type ListInventorySourceGroupsAssignedInventorySourcesError = CommonErrors;

export const listInventorySourceGroupsAssignedInventorySources = API.makePaginated(() => ({
  input: ListInventorySourceGroupsAssignedInventorySourcesRequest,
  output: ListInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an assignment between an inventory source and an inventory source group. */
export interface CreateInventorySourceGroupsAssignedInventorySourcesRequest {
  /** Required. The ID of the inventory source group to which the assignment will be assigned. */
  inventorySourceGroupId: string;
  /** The ID of the partner that owns the parent inventory source group. Only this partner will have write access to this assigned inventory source. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent inventory source group. The parent partner will not have access to this assigned inventory source. */
  advertiserId?: string;
  /** Request body */
  body?: AssignedInventorySource;
}

export const CreateInventorySourceGroupsAssignedInventorySourcesRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(AssignedInventorySource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInventorySourceGroupsAssignedInventorySourcesRequest>;

export type CreateInventorySourceGroupsAssignedInventorySourcesResponse = AssignedInventorySource;
export const CreateInventorySourceGroupsAssignedInventorySourcesResponse = AssignedInventorySource;

export type CreateInventorySourceGroupsAssignedInventorySourcesError = CommonErrors;

export const createInventorySourceGroupsAssignedInventorySources: API.OperationMethod<CreateInventorySourceGroupsAssignedInventorySourcesRequest, CreateInventorySourceGroupsAssignedInventorySourcesResponse, CreateInventorySourceGroupsAssignedInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInventorySourceGroupsAssignedInventorySourcesRequest,
  output: CreateInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
}));

/** Deletes the assignment between an inventory source and an inventory source group. */
export interface DeleteInventorySourceGroupsAssignedInventorySourcesRequest {
  /** Required. The ID of the inventory source group to which this assignment is assigned. */
  inventorySourceGroupId: string;
  /** Required. The ID of the assigned inventory source to delete. */
  assignedInventorySourceId: string;
  /** The ID of the partner that owns the parent inventory source group. Only this partner has write access to this assigned inventory source. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent inventory source group. The parent partner does not have access to this assigned inventory source. */
  advertiserId?: string;
}

export const DeleteInventorySourceGroupsAssignedInventorySourcesRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  assignedInventorySourceId: Schema.String.pipe(T.HttpPath("assignedInventorySourceId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources/{assignedInventorySourcesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInventorySourceGroupsAssignedInventorySourcesRequest>;

export type DeleteInventorySourceGroupsAssignedInventorySourcesResponse = Empty;
export const DeleteInventorySourceGroupsAssignedInventorySourcesResponse = Empty;

export type DeleteInventorySourceGroupsAssignedInventorySourcesError = CommonErrors;

export const deleteInventorySourceGroupsAssignedInventorySources: API.OperationMethod<DeleteInventorySourceGroupsAssignedInventorySourcesRequest, DeleteInventorySourceGroupsAssignedInventorySourcesResponse, DeleteInventorySourceGroupsAssignedInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInventorySourceGroupsAssignedInventorySourcesRequest,
  output: DeleteInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
}));

/** Bulk edits multiple assignments between inventory sources and a single inventory source group. The operation will delete the assigned inventory sources provided in BulkEditAssignedInventorySourcesRequest.deleted_assigned_inventory_sources and then create the assigned inventory sources provided in BulkEditAssignedInventorySourcesRequest.created_assigned_inventory_sources. */
export interface BulkEditInventorySourceGroupsAssignedInventorySourcesRequest {
  /** Required. The ID of the inventory source group to which the assignments are assigned. */
  inventorySourceGroupId: string;
  /** Request body */
  body?: BulkEditAssignedInventorySourcesRequest;
}

export const BulkEditInventorySourceGroupsAssignedInventorySourcesRequest = Schema.Struct({
  inventorySourceGroupId: Schema.String.pipe(T.HttpPath("inventorySourceGroupId")),
  body: Schema.optional(BulkEditAssignedInventorySourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources:bulkEdit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditInventorySourceGroupsAssignedInventorySourcesRequest>;

export type BulkEditInventorySourceGroupsAssignedInventorySourcesResponse = BulkEditAssignedInventorySourcesResponse;
export const BulkEditInventorySourceGroupsAssignedInventorySourcesResponse = BulkEditAssignedInventorySourcesResponse;

export type BulkEditInventorySourceGroupsAssignedInventorySourcesError = CommonErrors;

export const bulkEditInventorySourceGroupsAssignedInventorySources: API.OperationMethod<BulkEditInventorySourceGroupsAssignedInventorySourcesRequest, BulkEditInventorySourceGroupsAssignedInventorySourcesResponse, BulkEditInventorySourceGroupsAssignedInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditInventorySourceGroupsAssignedInventorySourcesRequest,
  output: BulkEditInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
}));

/** Gets an inventory source. */
export interface GetInventorySourcesRequest {
  /** Required. The ID of the inventory source to fetch. */
  inventorySourceId: string;
  /** Required. The ID of the DV360 partner to which the fetched inventory source is permissioned. */
  partnerId?: string;
  /** Optional. The ID of the DV360 advertiser to which the fetched inventory source is permissioned. If the user only has access to the advertiser and not the parent partner, use this field to specify the relevant advertiser. */
  advertiserId?: string;
}

export const GetInventorySourcesRequest = Schema.Struct({
  inventorySourceId: Schema.String.pipe(T.HttpPath("inventorySourceId")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/inventorySources/{inventorySourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetInventorySourcesRequest>;

export type GetInventorySourcesResponse = InventorySource;
export const GetInventorySourcesResponse = InventorySource;

export type GetInventorySourcesError = CommonErrors;

export const getInventorySources: API.OperationMethod<GetInventorySourcesRequest, GetInventorySourcesResponse, GetInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInventorySourcesRequest,
  output: GetInventorySourcesResponse,
  errors: [],
}));

/** Lists inventory sources that are accessible to the current user. The order is defined by the order_by parameter. If a filter by entity_status is not specified, inventory sources with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export interface ListInventorySourcesRequest {
  /** The ID of the partner that has access to the inventory source. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the inventory source. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by inventory source fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `status.entityStatus` * `commitment` * `deliveryMethod` * `rateDetails.rateType` * `exchange` Examples: * All active inventory sources: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Inventory sources belonging to Google Ad Manager or Rubicon exchanges: `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListInventorySourcesRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/inventorySources" }),
  svc,
) as unknown as Schema.Schema<ListInventorySourcesRequest>;

export type ListInventorySourcesResponse_Op = ListInventorySourcesResponse;
export const ListInventorySourcesResponse_Op = ListInventorySourcesResponse;

export type ListInventorySourcesError = CommonErrors;

export const listInventorySources = API.makePaginated(() => ({
  input: ListInventorySourcesRequest,
  output: ListInventorySourcesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new inventory source. Returns the newly created inventory source if successful. */
export interface CreateInventorySourcesRequest {
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** Request body */
  body?: InventorySource;
}

export const CreateInventorySourcesRequest = Schema.Struct({
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(InventorySource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/inventorySources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInventorySourcesRequest>;

export type CreateInventorySourcesResponse = InventorySource;
export const CreateInventorySourcesResponse = InventorySource;

export type CreateInventorySourcesError = CommonErrors;

export const createInventorySources: API.OperationMethod<CreateInventorySourcesRequest, CreateInventorySourcesResponse, CreateInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInventorySourcesRequest,
  output: CreateInventorySourcesResponse,
  errors: [],
}));

/** Updates an existing inventory source. Returns the updated inventory source if successful. */
export interface PatchInventorySourcesRequest {
  /** Output only. The unique ID of the inventory source. Assigned by the system. */
  inventorySourceId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** Request body */
  body?: InventorySource;
}

export const PatchInventorySourcesRequest = Schema.Struct({
  inventorySourceId: Schema.String.pipe(T.HttpPath("inventorySourceId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(InventorySource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/inventorySources/{inventorySourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInventorySourcesRequest>;

export type PatchInventorySourcesResponse = InventorySource;
export const PatchInventorySourcesResponse = InventorySource;

export type PatchInventorySourcesError = CommonErrors;

export const patchInventorySources: API.OperationMethod<PatchInventorySourcesRequest, PatchInventorySourcesResponse, PatchInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInventorySourcesRequest,
  output: PatchInventorySourcesResponse,
  errors: [],
}));

/** Edits read/write accessors of an inventory source. Returns the updated read_write_accessors for the inventory source. */
export interface EditInventorySourceReadWriteAccessorsInventorySourcesRequest {
  /** Required. The ID of inventory source to update. */
  inventorySourceId: string;
  /** Request body */
  body?: EditInventorySourceReadWriteAccessorsRequest;
}

export const EditInventorySourceReadWriteAccessorsInventorySourcesRequest = Schema.Struct({
  inventorySourceId: Schema.String.pipe(T.HttpPath("inventorySourceId")),
  body: Schema.optional(EditInventorySourceReadWriteAccessorsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/inventorySources/{inventorySourcesId}:editInventorySourceReadWriteAccessors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EditInventorySourceReadWriteAccessorsInventorySourcesRequest>;

export type EditInventorySourceReadWriteAccessorsInventorySourcesResponse = InventorySourceAccessors;
export const EditInventorySourceReadWriteAccessorsInventorySourcesResponse = InventorySourceAccessors;

export type EditInventorySourceReadWriteAccessorsInventorySourcesError = CommonErrors;

export const editInventorySourceReadWriteAccessorsInventorySources: API.OperationMethod<EditInventorySourceReadWriteAccessorsInventorySourcesRequest, EditInventorySourceReadWriteAccessorsInventorySourcesResponse, EditInventorySourceReadWriteAccessorsInventorySourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EditInventorySourceReadWriteAccessorsInventorySourcesRequest,
  output: EditInventorySourceReadWriteAccessorsInventorySourcesResponse,
  errors: [],
}));

/** Edits targeting options under a single partner. The operation will delete the assigned targeting options provided in BulkEditPartnerAssignedTargetingOptionsRequest.deleteRequests and then create the assigned targeting options provided in BulkEditPartnerAssignedTargetingOptionsRequest.createRequests . */
export interface EditAssignedTargetingOptionsPartnersRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Request body */
  body?: BulkEditPartnerAssignedTargetingOptionsRequest;
}

export const EditAssignedTargetingOptionsPartnersRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(BulkEditPartnerAssignedTargetingOptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/partners/{partnersId}:editAssignedTargetingOptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EditAssignedTargetingOptionsPartnersRequest>;

export type EditAssignedTargetingOptionsPartnersResponse = BulkEditPartnerAssignedTargetingOptionsResponse;
export const EditAssignedTargetingOptionsPartnersResponse = BulkEditPartnerAssignedTargetingOptionsResponse;

export type EditAssignedTargetingOptionsPartnersError = CommonErrors;

export const editAssignedTargetingOptionsPartners: API.OperationMethod<EditAssignedTargetingOptionsPartnersRequest, EditAssignedTargetingOptionsPartnersResponse, EditAssignedTargetingOptionsPartnersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EditAssignedTargetingOptionsPartnersRequest,
  output: EditAssignedTargetingOptionsPartnersResponse,
  errors: [],
}));

/** Gets a partner. */
export interface GetPartnersRequest {
  /** Required. The ID of the partner to fetch. */
  partnerId: string;
}

export const GetPartnersRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}" }),
  svc,
) as unknown as Schema.Schema<GetPartnersRequest>;

export type GetPartnersResponse = Partner;
export const GetPartnersResponse = Partner;

export type GetPartnersError = CommonErrors;

export const getPartners: API.OperationMethod<GetPartnersRequest, GetPartnersResponse, GetPartnersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartnersRequest,
  output: GetPartnersResponse,
  errors: [],
}));

/** Lists partners that are accessible to the current user. The order is defined by the order_by parameter. */
export interface ListPartnersRequest {
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListPartners` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by partner fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `entityStatus` Examples: * All active partners: `entityStatus="ENTITY_STATUS_ACTIVE"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListPartnersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners" }),
  svc,
) as unknown as Schema.Schema<ListPartnersRequest>;

export type ListPartnersResponse_Op = ListPartnersResponse;
export const ListPartnersResponse_Op = ListPartnersResponse;

export type ListPartnersError = CommonErrors;

export const listPartners = API.makePaginated(() => ({
  input: ListPartnersRequest,
  output: ListPartnersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a channel for a partner or advertiser. */
export interface GetPartnersChannelsRequest {
  /** The ID of the partner that owns the fetched channel. */
  partnerId: string;
  /** Required. The ID of the channel to fetch. */
  channelId: string;
  /** The ID of the advertiser that owns the fetched channel. */
  advertiserId?: string;
}

export const GetPartnersChannelsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}/channels/{channelsId}" }),
  svc,
) as unknown as Schema.Schema<GetPartnersChannelsRequest>;

export type GetPartnersChannelsResponse = Channel;
export const GetPartnersChannelsResponse = Channel;

export type GetPartnersChannelsError = CommonErrors;

export const getPartnersChannels: API.OperationMethod<GetPartnersChannelsRequest, GetPartnersChannelsResponse, GetPartnersChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartnersChannelsRequest,
  output: GetPartnersChannelsResponse,
  errors: [],
}));

/** Lists channels for a partner or advertiser. */
export interface ListPartnersChannelsRequest {
  /** The ID of the partner that owns the channels. */
  partnerId: string;
  /** The ID of the advertiser that owns the channels. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `channelId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by channel fields. Supported syntax: * Filter expressions for channel can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All channels for which the display name contains "google": `displayName : "google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListPartnersChannelsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}/channels" }),
  svc,
) as unknown as Schema.Schema<ListPartnersChannelsRequest>;

export type ListPartnersChannelsResponse = ListChannelsResponse;
export const ListPartnersChannelsResponse = ListChannelsResponse;

export type ListPartnersChannelsError = CommonErrors;

export const listPartnersChannels = API.makePaginated(() => ({
  input: ListPartnersChannelsRequest,
  output: ListPartnersChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new channel. Returns the newly created channel if successful. */
export interface CreatePartnersChannelsRequest {
  /** The ID of the partner that owns the created channel. */
  partnerId: string;
  /** The ID of the advertiser that owns the created channel. */
  advertiserId?: string;
  /** Request body */
  body?: Channel;
}

export const CreatePartnersChannelsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/partners/{partnersId}/channels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePartnersChannelsRequest>;

export type CreatePartnersChannelsResponse = Channel;
export const CreatePartnersChannelsResponse = Channel;

export type CreatePartnersChannelsError = CommonErrors;

export const createPartnersChannels: API.OperationMethod<CreatePartnersChannelsRequest, CreatePartnersChannelsResponse, CreatePartnersChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePartnersChannelsRequest,
  output: CreatePartnersChannelsResponse,
  errors: [],
}));

/** Updates a channel. Returns the updated channel if successful. */
export interface PatchPartnersChannelsRequest {
  /** The ID of the partner that owns the created channel. */
  partnerId: string;
  /** Output only. The unique ID of the channel. Assigned by the system. */
  channelId: string;
  /** The ID of the advertiser that owns the created channel. */
  advertiserId?: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Channel;
}

export const PatchPartnersChannelsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/partners/{partnersId}/channels/{channelId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPartnersChannelsRequest>;

export type PatchPartnersChannelsResponse = Channel;
export const PatchPartnersChannelsResponse = Channel;

export type PatchPartnersChannelsError = CommonErrors;

export const patchPartnersChannels: API.OperationMethod<PatchPartnersChannelsRequest, PatchPartnersChannelsResponse, PatchPartnersChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPartnersChannelsRequest,
  output: PatchPartnersChannelsResponse,
  errors: [],
}));

/** Lists sites in a channel. */
export interface ListPartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Required. The ID of the parent channel to which the requested sites belong. */
  channelId: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListSites` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `urlOrAppId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `urlOrAppId desc`. */
  orderBy?: string;
  /** Allows filtering by site fields. Supported syntax: * Filter expressions for site retrieval can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `urlOrAppId` Examples: * All sites for which the URL or app ID contains "google": `urlOrAppId : "google"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListPartnersChannelsSitesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}/channels/{channelsId}/sites" }),
  svc,
) as unknown as Schema.Schema<ListPartnersChannelsSitesRequest>;

export type ListPartnersChannelsSitesResponse = ListSitesResponse;
export const ListPartnersChannelsSitesResponse = ListSitesResponse;

export type ListPartnersChannelsSitesError = CommonErrors;

export const listPartnersChannelsSites = API.makePaginated(() => ({
  input: ListPartnersChannelsSitesRequest,
  output: ListPartnersChannelsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a site in a channel. */
export interface CreatePartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Required. The ID of the parent channel in which the site will be created. */
  channelId: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** Request body */
  body?: Site;
}

export const CreatePartnersChannelsSitesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  body: Schema.optional(Site).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/partners/{partnerId}/channels/{channelsId}/sites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePartnersChannelsSitesRequest>;

export type CreatePartnersChannelsSitesResponse = Site;
export const CreatePartnersChannelsSitesResponse = Site;

export type CreatePartnersChannelsSitesError = CommonErrors;

export const createPartnersChannelsSites: API.OperationMethod<CreatePartnersChannelsSitesRequest, CreatePartnersChannelsSitesResponse, CreatePartnersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePartnersChannelsSitesRequest,
  output: CreatePartnersChannelsSitesResponse,
  errors: [],
}));

/** Deletes a site from a channel. */
export interface DeletePartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Required. The ID of the parent channel to which the site belongs. */
  channelId: string;
  /** Required. The URL or app ID of the site to delete. */
  urlOrAppId: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
}

export const DeletePartnersChannelsSitesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  urlOrAppId: Schema.String.pipe(T.HttpPath("urlOrAppId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/partners/{partnerId}/channels/{channelsId}/sites/{sitesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePartnersChannelsSitesRequest>;

export type DeletePartnersChannelsSitesResponse = Empty;
export const DeletePartnersChannelsSitesResponse = Empty;

export type DeletePartnersChannelsSitesError = CommonErrors;

export const deletePartnersChannelsSites: API.OperationMethod<DeletePartnersChannelsSitesRequest, DeletePartnersChannelsSitesResponse, DeletePartnersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePartnersChannelsSitesRequest,
  output: DeletePartnersChannelsSitesResponse,
  errors: [],
}));

/** Bulk edits sites under a single channel. The operation will delete the sites provided in BulkEditSitesRequest.deleted_sites and then create the sites provided in BulkEditSitesRequest.created_sites. */
export interface BulkEditPartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Required. The ID of the parent channel to which the sites belong. */
  channelId: string;
  /** Request body */
  body?: BulkEditSitesRequest;
}

export const BulkEditPartnersChannelsSitesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  body: Schema.optional(BulkEditSitesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/partners/{partnerId}/channels/{channelsId}/sites:bulkEdit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditPartnersChannelsSitesRequest>;

export type BulkEditPartnersChannelsSitesResponse = BulkEditSitesResponse;
export const BulkEditPartnersChannelsSitesResponse = BulkEditSitesResponse;

export type BulkEditPartnersChannelsSitesError = CommonErrors;

export const bulkEditPartnersChannelsSites: API.OperationMethod<BulkEditPartnersChannelsSitesRequest, BulkEditPartnersChannelsSitesResponse, BulkEditPartnersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditPartnersChannelsSitesRequest,
  output: BulkEditPartnersChannelsSitesResponse,
  errors: [],
}));

/** Replaces all of the sites under a single channel. The operation will replace the sites under a channel with the sites provided in ReplaceSitesRequest.new_sites. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export interface ReplacePartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Required. The ID of the parent channel whose sites will be replaced. */
  channelId: string;
  /** Request body */
  body?: ReplaceSitesRequest;
}

export const ReplacePartnersChannelsSitesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  channelId: Schema.String.pipe(T.HttpPath("channelId")),
  body: Schema.optional(ReplaceSitesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/partners/{partnerId}/channels/{channelsId}/sites:replace", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplacePartnersChannelsSitesRequest>;

export type ReplacePartnersChannelsSitesResponse = ReplaceSitesResponse;
export const ReplacePartnersChannelsSitesResponse = ReplaceSitesResponse;

export type ReplacePartnersChannelsSitesError = CommonErrors;

export const replacePartnersChannelsSites: API.OperationMethod<ReplacePartnersChannelsSitesRequest, ReplacePartnersChannelsSitesResponse, ReplacePartnersChannelsSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplacePartnersChannelsSitesRequest,
  output: ReplacePartnersChannelsSitesResponse,
  errors: [],
}));

/** Gets a single targeting option assigned to a partner. */
export interface GetPartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. An identifier unique to the targeting type in this partner that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
}

export const GetPartnersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetPartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type GetPartnersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const GetPartnersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type GetPartnersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const getPartnersTargetingTypesAssignedTargetingOptions: API.OperationMethod<GetPartnersTargetingTypesAssignedTargetingOptionsRequest, GetPartnersTargetingTypesAssignedTargetingOptionsResponse, GetPartnersTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: GetPartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Lists the targeting options assigned to a partner. */
export interface ListPartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListPartnerAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` resource with ID 123456: `assignedTargetingOptionId="123456"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListPartnersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions" }),
  svc,
) as unknown as Schema.Schema<ListPartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type ListPartnersTargetingTypesAssignedTargetingOptionsResponse = ListPartnerAssignedTargetingOptionsResponse;
export const ListPartnersTargetingTypesAssignedTargetingOptionsResponse = ListPartnerAssignedTargetingOptionsResponse;

export type ListPartnersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const listPartnersTargetingTypesAssignedTargetingOptions = API.makePaginated(() => ({
  input: ListPartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: ListPartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Assigns a targeting option to a partner. Returns the assigned targeting option if successful. */
export interface CreatePartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreatePartnersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type CreatePartnersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;
export const CreatePartnersTargetingTypesAssignedTargetingOptionsResponse = AssignedTargetingOption;

export type CreatePartnersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const createPartnersTargetingTypesAssignedTargetingOptions: API.OperationMethod<CreatePartnersTargetingTypesAssignedTargetingOptionsRequest, CreatePartnersTargetingTypesAssignedTargetingOptionsResponse, CreatePartnersTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: CreatePartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Deletes an assigned targeting option from a partner. */
export interface DeletePartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
}

export const DeletePartnersTargetingTypesAssignedTargetingOptionsRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  assignedTargetingOptionId: Schema.String.pipe(T.HttpPath("assignedTargetingOptionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeletePartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type DeletePartnersTargetingTypesAssignedTargetingOptionsResponse = Empty;
export const DeletePartnersTargetingTypesAssignedTargetingOptionsResponse = Empty;

export type DeletePartnersTargetingTypesAssignedTargetingOptionsError = CommonErrors;

export const deletePartnersTargetingTypesAssignedTargetingOptions: API.OperationMethod<DeletePartnersTargetingTypesAssignedTargetingOptionsRequest, DeletePartnersTargetingTypesAssignedTargetingOptionsResponse, DeletePartnersTargetingTypesAssignedTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: DeletePartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

/** Creates an SDF Download Task. Returns an Operation. An SDF Download Task is a long-running, asynchronous operation. The metadata type of this operation is SdfDownloadTaskMetadata. If the request is successful, the response type of the operation is SdfDownloadTask. The response will not include the download files, which must be retrieved with media.download. The state of operation can be retrieved with `sdfdownloadtasks.operations.get`. Any errors can be found in the error.message. Note that error.details is expected to be empty. */
export interface CreateSdfdownloadtasksRequest {
  /** Request body */
  body?: CreateSdfDownloadTaskRequest;
}

export const CreateSdfdownloadtasksRequest = Schema.Struct({
  body: Schema.optional(CreateSdfDownloadTaskRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/sdfdownloadtasks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSdfdownloadtasksRequest>;

export type CreateSdfdownloadtasksResponse = Operation;
export const CreateSdfdownloadtasksResponse = Operation;

export type CreateSdfdownloadtasksError = CommonErrors;

export const createSdfdownloadtasks: API.OperationMethod<CreateSdfdownloadtasksRequest, CreateSdfdownloadtasksResponse, CreateSdfdownloadtasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSdfdownloadtasksRequest,
  output: CreateSdfdownloadtasksResponse,
  errors: [],
}));

/** Gets the latest state of an asynchronous SDF download task operation. Clients should poll this method at intervals of 30 seconds. */
export interface GetSdfdownloadtasksOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetSdfdownloadtasksOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v4/sdfdownloadtasks/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetSdfdownloadtasksOperationsRequest>;

export type GetSdfdownloadtasksOperationsResponse = Operation;
export const GetSdfdownloadtasksOperationsResponse = Operation;

export type GetSdfdownloadtasksOperationsError = CommonErrors;

export const getSdfdownloadtasksOperations: API.OperationMethod<GetSdfdownloadtasksOperationsRequest, GetSdfdownloadtasksOperationsResponse, GetSdfdownloadtasksOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSdfdownloadtasksOperationsRequest,
  output: GetSdfdownloadtasksOperationsResponse,
  errors: [],
}));

/** Gets a single targeting option. */
export interface GetTargetingTypesTargetingOptionsRequest {
  /** Required. The type of targeting option to retrieve. Accepted values are: * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The ID of the of targeting option to retrieve. */
  targetingOptionId: string;
  /** Required. The Advertiser this request is being made in the context of. */
  advertiserId?: string;
}

export const GetTargetingTypesTargetingOptionsRequest = Schema.Struct({
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  targetingOptionId: Schema.String.pipe(T.HttpPath("targetingOptionId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/targetingTypes/{targetingTypesId}/targetingOptions/{targetingOptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetTargetingTypesTargetingOptionsRequest>;

export type GetTargetingTypesTargetingOptionsResponse = TargetingOption;
export const GetTargetingTypesTargetingOptionsResponse = TargetingOption;

export type GetTargetingTypesTargetingOptionsError = CommonErrors;

export const getTargetingTypesTargetingOptions: API.OperationMethod<GetTargetingTypesTargetingOptionsRequest, GetTargetingTypesTargetingOptionsResponse, GetTargetingTypesTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTargetingTypesTargetingOptionsRequest,
  output: GetTargetingTypesTargetingOptionsResponse,
  errors: [],
}));

/** Lists targeting options of a given type. */
export interface ListTargetingTypesTargetingOptionsRequest {
  /** Required. The type of targeting option to be listed. Accepted values are: * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Required. The Advertiser this request is being made in the context of. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `targetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `OR` logical operators. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `carrierAndIspDetails.type` * `geoRegionDetails.geoRegionType` * `targetingOptionId` Examples: * All `GEO REGION` targeting options that belong to sub type `GEO_REGION_TYPE_COUNTRY` or `GEO_REGION_TYPE_STATE`: `geoRegionDetails.geoRegionType="GEO_REGION_TYPE_COUNTRY" OR geoRegionDetails.geoRegionType="GEO_REGION_TYPE_STATE"` * All `CARRIER AND ISP` targeting options that belong to sub type `CARRIER_AND_ISP_TYPE_CARRIER`: `carrierAndIspDetails.type="CARRIER_AND_ISP_TYPE_CARRIER"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListTargetingTypesTargetingOptionsRequest = Schema.Struct({
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/targetingTypes/{targetingTypesId}/targetingOptions" }),
  svc,
) as unknown as Schema.Schema<ListTargetingTypesTargetingOptionsRequest>;

export type ListTargetingTypesTargetingOptionsResponse = ListTargetingOptionsResponse;
export const ListTargetingTypesTargetingOptionsResponse = ListTargetingOptionsResponse;

export type ListTargetingTypesTargetingOptionsError = CommonErrors;

export const listTargetingTypesTargetingOptions = API.makePaginated(() => ({
  input: ListTargetingTypesTargetingOptionsRequest,
  output: ListTargetingTypesTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Searches for targeting options of a given type based on the given search terms. */
export interface SearchTargetingTypesTargetingOptionsRequest {
  /** Required. The type of targeting options to retrieve. Accepted values are: * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_BUSINESS_CHAIN` */
  targetingType: "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION" | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION" | (string & {});
  /** Request body */
  body?: SearchTargetingOptionsRequest;
}

export const SearchTargetingTypesTargetingOptionsRequest = Schema.Struct({
  targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  body: Schema.optional(SearchTargetingOptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/targetingTypes/{targetingTypesId}/targetingOptions:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchTargetingTypesTargetingOptionsRequest>;

export type SearchTargetingTypesTargetingOptionsResponse = SearchTargetingOptionsResponse;
export const SearchTargetingTypesTargetingOptionsResponse = SearchTargetingOptionsResponse;

export type SearchTargetingTypesTargetingOptionsError = CommonErrors;

export const searchTargetingTypesTargetingOptions: API.OperationMethod<SearchTargetingTypesTargetingOptionsRequest, SearchTargetingTypesTargetingOptionsResponse, SearchTargetingTypesTargetingOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchTargetingTypesTargetingOptionsRequest,
  output: SearchTargetingTypesTargetingOptionsResponse,
  errors: [],
}));

/** Gets a user. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export interface GetUsersRequest {
  /** Required. The ID of the user to fetch. */
  userId: string;
}

export const GetUsersRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersRequest>;

export type GetUsersResponse = User;
export const GetUsersResponse = User;

export type GetUsersError = CommonErrors;

export const getUsers: API.OperationMethod<GetUsersRequest, GetUsersResponse, GetUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

/** Lists users that are accessible to the current user. If two users have user roles on the same partner or advertiser, they can access each other. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export interface ListUsersRequest {
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListUsers` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by user fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `displayName` and `email` fields must use the `HAS (:)` operator. * The `lastLoginTime` field must use either the `LESS THAN OR EQUAL TO (<=)` or `GREATER THAN OR EQUAL TO (>=)` operator. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `assignedUserRole.advertiserId` * `assignedUserRole.entityType`: This is synthetic field of `AssignedUserRole` used for filtering. Identifies the type of entity to which the user role is assigned. Valid values are `Partner` and `Advertiser`. * `assignedUserRole.parentPartnerId`: This is a synthetic field of `AssignedUserRole` used for filtering. Identifies the parent partner of the entity to which the user role is assigned. * `assignedUserRole.partnerId` * `assignedUserRole.userRole` * `displayName` * `email` * `lastLoginTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * The user with `displayName` containing "foo": `displayName:"foo"` * The user with `email` containing "bar": `email:"bar"` * All users with standard user roles: `assignedUserRole.userRole="STANDARD"` * All users with user roles for partner 123: `assignedUserRole.partnerId="123"` * All users with user roles for advertiser 123: `assignedUserRole.advertiserId="123"` * All users with partner level user roles: `entityType="PARTNER"` * All users with user roles for partner 123 and advertisers under partner 123: `parentPartnerId="123"` * All users that last logged in on or after 2023-01-01T00:00:00Z (format of ISO 8601): `lastLoginTime>="2023-01-01T00:00:00Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListUsersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/users" }),
  svc,
) as unknown as Schema.Schema<ListUsersRequest>;

export type ListUsersResponse_Op = ListUsersResponse;
export const ListUsersResponse_Op = ListUsersResponse;

export type ListUsersError = CommonErrors;

export const listUsers = API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new user. Returns the newly created user if successful. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export interface CreateUsersRequest {
  /** Request body */
  body?: User;
}

export const CreateUsersRequest = Schema.Struct({
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/users", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUsersRequest>;

export type CreateUsersResponse = User;
export const CreateUsersResponse = User;

export type CreateUsersError = CommonErrors;

export const createUsers: API.OperationMethod<CreateUsersRequest, CreateUsersResponse, CreateUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateUsersRequest,
  output: CreateUsersResponse,
  errors: [],
}));

/** Updates an existing user. Returns the updated user if successful. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export interface PatchUsersRequest {
  /** Output only. The unique ID of the user. Assigned by the system. */
  userId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: User;
}

export const PatchUsersRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/users/{usersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersRequest>;

export type PatchUsersResponse = User;
export const PatchUsersResponse = User;

export type PatchUsersError = CommonErrors;

export const patchUsers: API.OperationMethod<PatchUsersRequest, PatchUsersResponse, PatchUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersRequest,
  output: PatchUsersResponse,
  errors: [],
}));

/** Deletes a user. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export interface DeleteUsersRequest {
  /** Required. The ID of the user to delete. */
  userId: string;
}

export const DeleteUsersRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersRequest>;

export type DeleteUsersResponse = Empty;
export const DeleteUsersResponse = Empty;

export type DeleteUsersError = CommonErrors;

export const deleteUsers: API.OperationMethod<DeleteUsersRequest, DeleteUsersResponse, DeleteUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersRequest,
  output: DeleteUsersResponse,
  errors: [],
}));

/** Bulk edits user roles for a user. The operation will delete the assigned user roles provided in BulkEditAssignedUserRolesRequest.deletedAssignedUserRoles and then assign the user roles provided in BulkEditAssignedUserRolesRequest.createdAssignedUserRoles. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export interface BulkEditAssignedUserRolesUsersRequest {
  /** Required. The ID of the user to which the assigned user roles belong. */
  userId: string;
  /** Request body */
  body?: BulkEditAssignedUserRolesRequest;
}

export const BulkEditAssignedUserRolesUsersRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(BulkEditAssignedUserRolesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/users/{usersId}:bulkEditAssignedUserRoles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkEditAssignedUserRolesUsersRequest>;

export type BulkEditAssignedUserRolesUsersResponse = BulkEditAssignedUserRolesResponse;
export const BulkEditAssignedUserRolesUsersResponse = BulkEditAssignedUserRolesResponse;

export type BulkEditAssignedUserRolesUsersError = CommonErrors;

export const bulkEditAssignedUserRolesUsers: API.OperationMethod<BulkEditAssignedUserRolesUsersRequest, BulkEditAssignedUserRolesUsersResponse, BulkEditAssignedUserRolesUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkEditAssignedUserRolesUsersRequest,
  output: BulkEditAssignedUserRolesUsersResponse,
  errors: [],
}));

/** Uploads media. Upload is supported on the URI `/upload/media/{resource_name=**}?upload_type=media.` **Note**: Upload requests will not be successful without including `upload_type=media` query string. */
export interface UploadMediaRequest {
  /** Name of the media that is being downloaded. See ReadRequest.resource_name. */
  resourceName: string;
  /** Request body */
  body?: GoogleBytestreamMedia;
}

export const UploadMediaRequest = Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
  body: Schema.optional(GoogleBytestreamMedia).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "media/{mediaId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = GoogleBytestreamMedia;
export const UploadMediaResponse = GoogleBytestreamMedia;

export type UploadMediaError = CommonErrors;

export const uploadMedia: API.OperationMethod<UploadMediaRequest, UploadMediaResponse, UploadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

/** Downloads media. Download is supported on the URI `/download/{resource_name=**}?alt=media.` **Note**: Download requests will not be successful without including `alt=media` query string. */
export interface DownloadMediaRequest {
  /** Name of the media that is being downloaded. See ReadRequest.resource_name. */
  resourceName: string;
}

export const DownloadMediaRequest = Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "download/{downloadId}" }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = GoogleBytestreamMedia;
export const DownloadMediaResponse = GoogleBytestreamMedia;

export type DownloadMediaError = CommonErrors;

export const downloadMedia: API.OperationMethod<DownloadMediaRequest, DownloadMediaResponse, DownloadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

/** Gets the latest state of an asynchronous SDF download task operation. Clients should poll this method at intervals of 30 seconds. */
export interface GetSdfuploadtasksOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetSdfuploadtasksOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v4/sdfuploadtasks/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetSdfuploadtasksOperationsRequest>;

export type GetSdfuploadtasksOperationsResponse = Operation;
export const GetSdfuploadtasksOperationsResponse = Operation;

export type GetSdfuploadtasksOperationsError = CommonErrors;

export const getSdfuploadtasksOperations: API.OperationMethod<GetSdfuploadtasksOperationsRequest, GetSdfuploadtasksOperationsResponse, GetSdfuploadtasksOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSdfuploadtasksOperationsRequest,
  output: GetSdfuploadtasksOperationsResponse,
  errors: [],
}));

