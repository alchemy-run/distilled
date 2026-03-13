// ==========================================================================
// Display & Video 360 API (displayvideo v4)
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
  name: "displayvideo",
  version: "v4",
  rootUrl: "https://displayvideo.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GuaranteedOrderStatus {
  /** Whether or not the guaranteed order is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Output only. The configuration status of the guaranteed order. Acceptable values are `PENDING` and `COMPLETED`. A guaranteed order must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve. Currently the configuration action can only be performed via UI. */
  configStatus?:
    | "GUARANTEED_ORDER_CONFIG_STATUS_UNSPECIFIED"
    | "PENDING"
    | "COMPLETED"
    | (string & {});
  /** The user-provided reason for pausing this guaranteed order. Must be UTF-8 encoded with a maximum length of 100 bytes. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`. */
  entityPauseReason?: string;
}

export const GuaranteedOrderStatus: Schema.Schema<GuaranteedOrderStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityStatus: Schema.optional(Schema.String),
      configStatus: Schema.optional(Schema.String),
      entityPauseReason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuaranteedOrderStatus",
  }) as any as Schema.Schema<GuaranteedOrderStatus>;

export interface AlgorithmRulesFloodlightActivityConversionSignal {
  /** Required. The way to acquire value from the floodlight activity, for example, count of the conversion. */
  countingMethod?:
    | "COUNTING_METHOD_UNSPECIFIED"
    | "CONVERSIONS_COUNT"
    | "SALES_QUANTITY"
    | "SALES_VALUE"
    | "UNIQUE_COUNT"
    | (string & {});
  /** Required. Id of the floodlight activity. */
  floodlightActivityId?: string;
  /** Required. The type of conversions to be used in impression value computation, for example, post-click conversions. */
  conversionCounting?:
    | "CONVERSION_COUNTING_UNSPECIFIED"
    | "ALL_CONVERSIONS"
    | "POST_CLICK"
    | "POST_VIEW"
    | (string & {});
}

export const AlgorithmRulesFloodlightActivityConversionSignal: Schema.Schema<AlgorithmRulesFloodlightActivityConversionSignal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      countingMethod: Schema.optional(Schema.String),
      floodlightActivityId: Schema.optional(Schema.String),
      conversionCounting: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AlgorithmRulesFloodlightActivityConversionSignal",
  }) as any as Schema.Schema<AlgorithmRulesFloodlightActivityConversionSignal>;

export interface AlgorithmRulesSignalValue {
  /** Signal based on floodlight conversion events. This field is only supported for allowlisted partners. */
  floodlightActivityConversionSignal?: AlgorithmRulesFloodlightActivityConversionSignal;
  /** Signal based on active views. Only `TIME_ON_SCREEN` is supported. This field is only supported for allowlisted partners. */
  activeViewSignal?:
    | "ACTIVE_VIEW_SIGNAL_UNSPECIFIED"
    | "ACTIVE_VIEW_VIEWED"
    | "AUDIBLE"
    | "VIDEO_COMPLETED"
    | "TIME_ON_SCREEN"
    | "VIDEO_PLAYER_SIZE"
    | "COMPLETED_IN_VIEW_AUDIBLE"
    | (string & {});
  /** Value to use as result. */
  number?: number;
}

export const AlgorithmRulesSignalValue: Schema.Schema<AlgorithmRulesSignalValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      floodlightActivityConversionSignal: Schema.optional(
        AlgorithmRulesFloodlightActivityConversionSignal,
      ),
      activeViewSignal: Schema.optional(Schema.String),
      number: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AlgorithmRulesSignalValue",
  }) as any as Schema.Schema<AlgorithmRulesSignalValue>;

export interface YoutubeVideoDetails {
  /** Required. The YouTube video asset id. This is ad_asset.ad_asset_id. */
  videoAssetId?: string;
  /** The reason why the video data is not available. */
  unavailableReason?:
    | "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED"
    | "VIDEO_UNAVAILABLE_REASON_PRIVATE"
    | "VIDEO_UNAVAILABLE_REASON_DELETED"
    | (string & {});
  /** Output only. The YouTube video ID which can be searched on YouTube webpage. */
  id?: string;
}

export const YoutubeVideoDetails: Schema.Schema<YoutubeVideoDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoAssetId: Schema.optional(Schema.String),
      unavailableReason: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YoutubeVideoDetails",
  }) as any as Schema.Schema<YoutubeVideoDetails>;

export interface VideoDiscoveryAd {
  /** The YouTube video the ad promotes. */
  video?: YoutubeVideoDetails;
  /** First text line for the ad. */
  description1?: string;
  /** The headline of ad. */
  headline?: string;
  /** Second text line for the ad. */
  description2?: string;
  /** Thumbnail image used in the ad. */
  thumbnail?:
    | "THUMBNAIL_UNSPECIFIED"
    | "THUMBNAIL_DEFAULT"
    | "THUMBNAIL_1"
    | "THUMBNAIL_2"
    | "THUMBNAIL_3"
    | (string & {});
}

export const VideoDiscoveryAd: Schema.Schema<VideoDiscoveryAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      video: Schema.optional(YoutubeVideoDetails),
      description1: Schema.optional(Schema.String),
      headline: Schema.optional(Schema.String),
      description2: Schema.optional(Schema.String),
      thumbnail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoDiscoveryAd",
  }) as any as Schema.Schema<VideoDiscoveryAd>;

export interface HouseholdIncomeTargetingOptionDetails {
  /** Output only. The household income of an audience. */
  householdIncome?:
    | "HOUSEHOLD_INCOME_UNSPECIFIED"
    | "HOUSEHOLD_INCOME_UNKNOWN"
    | "HOUSEHOLD_INCOME_LOWER_50_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_10_PERCENT"
    | (string & {});
}

export const HouseholdIncomeTargetingOptionDetails: Schema.Schema<HouseholdIncomeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      householdIncome: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HouseholdIncomeTargetingOptionDetails",
  }) as any as Schema.Schema<HouseholdIncomeTargetingOptionDetails>;

export interface AdPolicyCriterionRestriction {
  /** The country criterion id. */
  countryCriterionId?: string;
  /** Localized name for the country. May be empty. */
  countryLabel?: string;
}

export const AdPolicyCriterionRestriction: Schema.Schema<AdPolicyCriterionRestriction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      countryCriterionId: Schema.optional(Schema.String),
      countryLabel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyCriterionRestriction",
  }) as any as Schema.Schema<AdPolicyCriterionRestriction>;

export interface AdPolicyTopicEvidenceTrademark {
  /** The trademark content owner. */
  owner?: string;
  /** Countries where the policy violation is relevant. */
  countryRestrictions?: Array<AdPolicyCriterionRestriction>;
  /** The trademark term. */
  term?: string;
}

export const AdPolicyTopicEvidenceTrademark: Schema.Schema<AdPolicyTopicEvidenceTrademark> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      owner: Schema.optional(Schema.String),
      countryRestrictions: Schema.optional(
        Schema.Array(AdPolicyCriterionRestriction),
      ),
      term: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceTrademark",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceTrademark>;

export interface AdPolicyTopicEvidenceTextList {
  /** The fragments of text from the resource that caused the policy finding. */
  texts?: Array<string>;
}

export const AdPolicyTopicEvidenceTextList: Schema.Schema<AdPolicyTopicEvidenceTextList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      texts: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceTextList",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceTextList>;

export interface AdPolicyTopicEvidenceDestinationMismatch {
  /** The set of URLs that do not match. The list can include single or multiple uri types. Example 1: [`DISPLAY_URL`, `FINAL_URL`] means ad display URL does not match with the ad final URL. Example 2: [`FINAL_URL`] means ad final URL did not match the crawled url, which is also considered as destination mismatch. */
  uriTypes?: Array<
    | "AD_POLICY_TOPIC_EVIDENCE_DESTINATION_MISMATCH_URL_TYPE_UNKNOWN"
    | "DISPLAY_URL"
    | "FINAL_URL"
    | "FINAL_MOBILE_URL"
    | "TRACKING_URL"
    | "MOBILE_TRACKING_URL"
    | (string & {})
  >;
}

export const AdPolicyTopicEvidenceDestinationMismatch: Schema.Schema<AdPolicyTopicEvidenceDestinationMismatch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uriTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceDestinationMismatch",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceDestinationMismatch>;

export interface AdPolicyTopicEvidenceCounterfeit {
  /** The content or product owners that made a complaint. */
  owners?: Array<string>;
}

export const AdPolicyTopicEvidenceCounterfeit: Schema.Schema<AdPolicyTopicEvidenceCounterfeit> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      owners: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceCounterfeit",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceCounterfeit>;

export interface AdPolicyTopicEvidenceDestinationNotWorking {
  /** The device where visiting the URL resulted in the error. */
  device?:
    | "AD_POLICY_TOPIC_EVIDENCE_DESTINATION_NOT_WORKING_DEVICE_TYPE_UNKNOWN"
    | "DESKTOP"
    | "ANDROID"
    | "IOS"
    | (string & {});
  /** The type of DNS error. */
  dnsErrorType?:
    | "AD_POLICY_TOPIC_EVIDENCE_DESTINATION_NOT_WORKING_DNS_ERROR_TYPE_UNKNOWN"
    | "HOSTNAME_NOT_FOUND"
    | "GOOGLE_CRAWLER_DNS_ISSUE"
    | (string & {});
  /** The full URL that didn't work. */
  expandedUri?: string;
  /** The last time the error was seen when navigating to URL. */
  lastCheckedTime?: string;
  /** The HTTP error code. */
  httpErrorCode?: string;
}

export const AdPolicyTopicEvidenceDestinationNotWorking: Schema.Schema<AdPolicyTopicEvidenceDestinationNotWorking> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      device: Schema.optional(Schema.String),
      dnsErrorType: Schema.optional(Schema.String),
      expandedUri: Schema.optional(Schema.String),
      lastCheckedTime: Schema.optional(Schema.String),
      httpErrorCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceDestinationNotWorking",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceDestinationNotWorking>;

export interface AdPolicyTopicEvidenceDestinationTextList {
  /** Destination text that caused the policy finding. */
  destinationTexts?: Array<string>;
}

export const AdPolicyTopicEvidenceDestinationTextList: Schema.Schema<AdPolicyTopicEvidenceDestinationTextList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destinationTexts: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceDestinationTextList",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceDestinationTextList>;

export interface AdPolicyTopicEvidenceLegalRemovalLocalLegal {
  /** Type of law for the legal notice. */
  lawType?: string;
}

export const AdPolicyTopicEvidenceLegalRemovalLocalLegal: Schema.Schema<AdPolicyTopicEvidenceLegalRemovalLocalLegal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lawType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceLegalRemovalLocalLegal",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceLegalRemovalLocalLegal>;

export interface AdPolicyTopicEvidenceLegalRemovalDmca {
  /** The entity who made the legal complaint. */
  complainant?: string;
}

export const AdPolicyTopicEvidenceLegalRemovalDmca: Schema.Schema<AdPolicyTopicEvidenceLegalRemovalDmca> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      complainant: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceLegalRemovalDmca",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceLegalRemovalDmca>;

export interface AdPolicyTopicEvidenceLegalRemoval {
  /** The type of complaint causing the legal removal. */
  complaintType?:
    | "AD_POLICY_TOPIC_EVIDENCE_LEGAL_REMOVAL_COMPLAINT_TYPE_UNKNOWN"
    | "COPYRIGHT"
    | "COURT_ORDER"
    | "LOCAL_LEGAL"
    | (string & {});
  /** The countries restricted due to the legal removal. */
  countryRestrictions?: Array<AdPolicyCriterionRestriction>;
  /** The urls restricted due to the legal removal. */
  restrictedUris?: Array<string>;
  /** Details on the local legal regulation legal removal. */
  localLegal?: AdPolicyTopicEvidenceLegalRemovalLocalLegal;
  /** Details on the DMCA regulation legal removal. */
  dmca?: AdPolicyTopicEvidenceLegalRemovalDmca;
}

export const AdPolicyTopicEvidenceLegalRemoval: Schema.Schema<AdPolicyTopicEvidenceLegalRemoval> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      complaintType: Schema.optional(Schema.String),
      countryRestrictions: Schema.optional(
        Schema.Array(AdPolicyCriterionRestriction),
      ),
      restrictedUris: Schema.optional(Schema.Array(Schema.String)),
      localLegal: Schema.optional(AdPolicyTopicEvidenceLegalRemovalLocalLegal),
      dmca: Schema.optional(AdPolicyTopicEvidenceLegalRemovalDmca),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceLegalRemoval",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceLegalRemoval>;

export interface AdPolicyTopicEvidenceWebsiteList {
  /** Websites that caused the policy finding. */
  websites?: Array<string>;
}

export const AdPolicyTopicEvidenceWebsiteList: Schema.Schema<AdPolicyTopicEvidenceWebsiteList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      websites: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceWebsiteList",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceWebsiteList>;

export interface AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry {
  /** The legal policy that is being violated. */
  legalPolicy?: string;
  /** The countries restricted due to the legal policy. */
  countryRestrictions?: Array<AdPolicyCriterionRestriction>;
}

export const AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry: Schema.Schema<AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      legalPolicy: Schema.optional(Schema.String),
      countryRestrictions: Schema.optional(
        Schema.Array(AdPolicyCriterionRestriction),
      ),
    }),
  ).annotate({
    identifier:
      "AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry>;

export interface AdPolicyTopicEvidenceRegionalRequirements {
  /** List of regional requirements. */
  regionalRequirementsEntries?: Array<AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry>;
}

export const AdPolicyTopicEvidenceRegionalRequirements: Schema.Schema<AdPolicyTopicEvidenceRegionalRequirements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionalRequirementsEntries: Schema.optional(
        Schema.Array(
          AdPolicyTopicEvidenceRegionalRequirementsRegionalRequirementsEntry,
        ),
      ),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidenceRegionalRequirements",
  }) as any as Schema.Schema<AdPolicyTopicEvidenceRegionalRequirements>;

export interface AdPolicyTopicEvidence {
  /** Trademark terms that caused a policy violation. */
  trademark?: AdPolicyTopicEvidenceTrademark;
  /** List of evidence found in the text of the ad. */
  textList?: AdPolicyTopicEvidenceTextList;
  /** A mismatch between the ad destination URLs. */
  destinationMismatch?: AdPolicyTopicEvidenceDestinationMismatch;
  /** Counterfeit enforcement that caused a policy violation. */
  counterfeit?: AdPolicyTopicEvidenceCounterfeit;
  /** The language the ad was detected to be written in. This field uses IETF language tags, such as "en-US". */
  languageCode?: string;
  /** Information on HTTP or DNS errors related to the ad destination. */
  destinationNotWorking?: AdPolicyTopicEvidenceDestinationNotWorking;
  /** The text in the destination of the ad that is causing a policy violation. */
  destinationTextList?: AdPolicyTopicEvidenceDestinationTextList;
  /** Legal related regulation enforcement that caused a policy violation. */
  legalRemoval?: AdPolicyTopicEvidenceLegalRemoval;
  /** List of websites linked with the ad. */
  websiteList?: AdPolicyTopicEvidenceWebsiteList;
  /** HTTP code returned when the final URL was crawled. */
  httpCode?: number;
  /** T&S proactive enforcement that caused a policy violation. */
  regionalRequirements?: AdPolicyTopicEvidenceRegionalRequirements;
}

export const AdPolicyTopicEvidence: Schema.Schema<AdPolicyTopicEvidence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trademark: Schema.optional(AdPolicyTopicEvidenceTrademark),
      textList: Schema.optional(AdPolicyTopicEvidenceTextList),
      destinationMismatch: Schema.optional(
        AdPolicyTopicEvidenceDestinationMismatch,
      ),
      counterfeit: Schema.optional(AdPolicyTopicEvidenceCounterfeit),
      languageCode: Schema.optional(Schema.String),
      destinationNotWorking: Schema.optional(
        AdPolicyTopicEvidenceDestinationNotWorking,
      ),
      destinationTextList: Schema.optional(
        AdPolicyTopicEvidenceDestinationTextList,
      ),
      legalRemoval: Schema.optional(AdPolicyTopicEvidenceLegalRemoval),
      websiteList: Schema.optional(AdPolicyTopicEvidenceWebsiteList),
      httpCode: Schema.optional(Schema.Number),
      regionalRequirements: Schema.optional(
        AdPolicyTopicEvidenceRegionalRequirements,
      ),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEvidence",
  }) as any as Schema.Schema<AdPolicyTopicEvidence>;

export interface AdPolicyTopicAppealInfo {
  /** Whether the decision can be appealed through a self-service appeal or an appeal form. */
  appealType?:
    | "AD_POLICY_APPEAL_TYPE_UNKNOWN"
    | "SELF_SERVICE_APPEAL"
    | "APPEAL_FORM"
    | (string & {});
  /** Only available when appeal_type is `APPEAL_FORM`. */
  appealFormLink?: string;
}

export const AdPolicyTopicAppealInfo: Schema.Schema<AdPolicyTopicAppealInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appealType: Schema.optional(Schema.String),
      appealFormLink: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyTopicAppealInfo",
  }) as any as Schema.Schema<AdPolicyTopicAppealInfo>;

export interface AdPolicyTopicConstraintAdPolicyCountryConstraintList {
  /** Countries where the ad cannot serve. */
  countries?: Array<AdPolicyCriterionRestriction>;
}

export const AdPolicyTopicConstraintAdPolicyCountryConstraintList: Schema.Schema<AdPolicyTopicConstraintAdPolicyCountryConstraintList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      countries: Schema.optional(Schema.Array(AdPolicyCriterionRestriction)),
    }),
  ).annotate({
    identifier: "AdPolicyTopicConstraintAdPolicyCountryConstraintList",
  }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyCountryConstraintList>;

export interface AdPolicyTopicConstraintAdPolicyResellerConstraint {}

export const AdPolicyTopicConstraintAdPolicyResellerConstraint: Schema.Schema<AdPolicyTopicConstraintAdPolicyResellerConstraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AdPolicyTopicConstraintAdPolicyResellerConstraint",
  }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyResellerConstraint>;

export interface AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint {}

export const AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint: Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint",
  }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint>;

export interface AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint {}

export const AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint: Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint",
  }) as any as Schema.Schema<AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint>;

export interface AdPolicyTopicConstraint {
  /** Countries where the ad cannot serve. */
  countryConstraint?: AdPolicyTopicConstraintAdPolicyCountryConstraintList;
  /** Link to the form to request a certificate for the constraint. */
  requestCertificateFormLink?: string;
  /** Countries where the resource's domain is not covered by the certificates associated with it. */
  certificateDomainMismatchCountryList?: AdPolicyTopicConstraintAdPolicyCountryConstraintList;
  /** Reseller constraint. */
  resellerConstraint?: AdPolicyTopicConstraintAdPolicyResellerConstraint;
  /** Countries where a certificate is required for serving. */
  certificateMissingCountryList?: AdPolicyTopicConstraintAdPolicyCountryConstraintList;
  /** Certificate is required to serve in any country. */
  globalCertificateMissing?: AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint;
  /** Certificate is required to serve in any country and the existing certificate does not cover the ad's domain. */
  globalCertificateDomainMismatch?: AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint;
}

export const AdPolicyTopicConstraint: Schema.Schema<AdPolicyTopicConstraint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      countryConstraint: Schema.optional(
        AdPolicyTopicConstraintAdPolicyCountryConstraintList,
      ),
      requestCertificateFormLink: Schema.optional(Schema.String),
      certificateDomainMismatchCountryList: Schema.optional(
        AdPolicyTopicConstraintAdPolicyCountryConstraintList,
      ),
      resellerConstraint: Schema.optional(
        AdPolicyTopicConstraintAdPolicyResellerConstraint,
      ),
      certificateMissingCountryList: Schema.optional(
        AdPolicyTopicConstraintAdPolicyCountryConstraintList,
      ),
      globalCertificateMissing: Schema.optional(
        AdPolicyTopicConstraintAdPolicyGlobalCertificateMissingConstraint,
      ),
      globalCertificateDomainMismatch: Schema.optional(
        AdPolicyTopicConstraintAdPolicyGlobalCertificateDomainMismatchConstraint,
      ),
    }),
  ).annotate({
    identifier: "AdPolicyTopicConstraint",
  }) as any as Schema.Schema<AdPolicyTopicConstraint>;

export interface AdPolicyTopicEntry {
  /** A short summary description of the policy topic. */
  policyTopicDescription?: string;
  /** The policy topic. Examples include "TRADEMARKS", "ALCOHOL", etc. */
  policyTopic?: string;
  /** The evidence used in the policy decision. */
  policyTopicEvidences?: Array<AdPolicyTopicEvidence>;
  /** How ad serving will be affected due to the relation to the ad policy topic. */
  policyTopicType?:
    | "AD_POLICY_TOPIC_ENTRY_TYPE_UNKNOWN"
    | "PROHIBITED"
    | "FULLY_LIMITED"
    | "LIMITED"
    | "DESCRIPTIVE"
    | "BROADENING"
    | "AREA_OF_INTEREST_ONLY"
    | (string & {});
  /** The source of the policy decision. */
  policyDecisionType?:
    | "AD_POLICY_DECISION_TYPE_UNKNOWN"
    | "PURSUANT_TO_NOTICE"
    | "GOOGLE_INVESTIGATION"
    | (string & {});
  /** Information on how to appeal the policy decision. */
  appealInfo?: AdPolicyTopicAppealInfo;
  /** Ad policy help center link for the policy topic. */
  helpCenterLink?: string;
  /** The policy enforcement means used in the policy review. */
  policyEnforcementMeans?:
    | "AD_POLICY_ENFORCEMENT_MEANS_UNKNOWN"
    | "AUTOMATED"
    | "HUMAN_REVIEW"
    | (string & {});
  /** The serving constraints relevant to the policy decision. */
  policyTopicConstraints?: Array<AdPolicyTopicConstraint>;
  /** Localized label text for policy. Examples include "Trademarks in text", "Contains Alcohol", etc. */
  policyLabel?: string;
}

export const AdPolicyTopicEntry: Schema.Schema<AdPolicyTopicEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policyTopicDescription: Schema.optional(Schema.String),
      policyTopic: Schema.optional(Schema.String),
      policyTopicEvidences: Schema.optional(
        Schema.Array(AdPolicyTopicEvidence),
      ),
      policyTopicType: Schema.optional(Schema.String),
      policyDecisionType: Schema.optional(Schema.String),
      appealInfo: Schema.optional(AdPolicyTopicAppealInfo),
      helpCenterLink: Schema.optional(Schema.String),
      policyEnforcementMeans: Schema.optional(Schema.String),
      policyTopicConstraints: Schema.optional(
        Schema.Array(AdPolicyTopicConstraint),
      ),
      policyLabel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdPolicyTopicEntry",
  }) as any as Schema.Schema<AdPolicyTopicEntry>;

export interface AdPolicy {
  /** The policy approval status of an ad, indicating the approval decision. */
  adPolicyApprovalStatus?:
    | "AD_POLICY_APPROVAL_STATUS_UNKNOWN"
    | "DISAPPROVED"
    | "APPROVED_LIMITED"
    | "APPROVED"
    | "AREA_OF_INTEREST_ONLY"
    | (string & {});
  /** The policy review status of an ad, indicating where in the review process the ad is currently. */
  adPolicyReviewStatus?:
    | "AD_POLICY_REVIEW_STATUS_UNKNOWN"
    | "REVIEW_IN_PROGRESS"
    | "REVIEWED"
    | "UNDER_APPEAL"
    | "ELIGIBLE_MAY_SERVE"
    | (string & {});
  /** The entries for each policy topic identified as relating to the ad. Each entry includes the topic, restriction level, and guidance on how to fix policy issues. */
  adPolicyTopicEntry?: Array<AdPolicyTopicEntry>;
}

export const AdPolicy: Schema.Schema<AdPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adPolicyApprovalStatus: Schema.optional(Schema.String),
      adPolicyReviewStatus: Schema.optional(Schema.String),
      adPolicyTopicEntry: Schema.optional(Schema.Array(AdPolicyTopicEntry)),
    }),
  ).annotate({ identifier: "AdPolicy" }) as any as Schema.Schema<AdPolicy>;

export interface PrismaCpeCode {
  /** The Prisma estimate code. */
  prismaEstimateCode?: string;
  /** The Prisma client code. */
  prismaClientCode?: string;
  /** The Prisma product code. */
  prismaProductCode?: string;
}

export const PrismaCpeCode: Schema.Schema<PrismaCpeCode> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prismaEstimateCode: Schema.optional(Schema.String),
      prismaClientCode: Schema.optional(Schema.String),
      prismaProductCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PrismaCpeCode",
  }) as any as Schema.Schema<PrismaCpeCode>;

export interface BudgetSummary {
  /** Relevant client, product, and estimate codes from the Mediaocean Prisma tool. Only applicable for campaign budgets with an external_budget_source of EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN. */
  prismaCpeCode?: PrismaCpeCode;
  /** The sum of charges made under this budget before taxes, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  preTaxAmountMicros?: string;
  /** Corresponds to the external_budget_id of a campaign budget. If the value is not set in the campaign budget, this field will be empty. */
  externalBudgetId?: string;
  /** The amount of tax applied to charges under this budget, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  taxAmountMicros?: string;
  /** The total sum of charges made under this budget, including tax, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  totalAmountMicros?: string;
}

export const BudgetSummary: Schema.Schema<BudgetSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prismaCpeCode: Schema.optional(PrismaCpeCode),
      preTaxAmountMicros: Schema.optional(Schema.String),
      externalBudgetId: Schema.optional(Schema.String),
      taxAmountMicros: Schema.optional(Schema.String),
      totalAmountMicros: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BudgetSummary",
  }) as any as Schema.Schema<BudgetSummary>;

export interface AuthorizedSellerStatusTargetingOptionDetails {
  /** Output only. The authorized seller status. */
  authorizedSellerStatus?:
    | "AUTHORIZED_SELLER_STATUS_UNSPECIFIED"
    | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY"
    | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS"
    | (string & {});
}

export const AuthorizedSellerStatusTargetingOptionDetails: Schema.Schema<AuthorizedSellerStatusTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authorizedSellerStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthorizedSellerStatusTargetingOptionDetails",
  }) as any as Schema.Schema<AuthorizedSellerStatusTargetingOptionDetails>;

export interface GenderTargetingOptionDetails {
  /** Output only. The gender of an audience. */
  gender?:
    | "GENDER_UNSPECIFIED"
    | "GENDER_MALE"
    | "GENDER_FEMALE"
    | "GENDER_UNKNOWN"
    | (string & {});
}

export const GenderTargetingOptionDetails: Schema.Schema<GenderTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gender: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenderTargetingOptionDetails",
  }) as any as Schema.Schema<GenderTargetingOptionDetails>;

export interface ContentOutstreamPositionTargetingOptionDetails {
  /** Output only. The content outstream position. */
  contentOutstreamPosition?:
    | "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED"
    | "CONTENT_OUTSTREAM_POSITION_UNKNOWN"
    | "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE"
    | "CONTENT_OUTSTREAM_POSITION_IN_BANNER"
    | "CONTENT_OUTSTREAM_POSITION_IN_FEED"
    | "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL"
    | (string & {});
}

export const ContentOutstreamPositionTargetingOptionDetails: Schema.Schema<ContentOutstreamPositionTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentOutstreamPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentOutstreamPositionTargetingOptionDetails",
  }) as any as Schema.Schema<ContentOutstreamPositionTargetingOptionDetails>;

export interface ContentGenreTargetingOptionDetails {
  /** Output only. The display name of the content genre */
  displayName?: string;
}

export const ContentGenreTargetingOptionDetails: Schema.Schema<ContentGenreTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentGenreTargetingOptionDetails",
  }) as any as Schema.Schema<ContentGenreTargetingOptionDetails>;

export interface ContentInstreamPositionTargetingOptionDetails {
  /** Output only. The content instream position. */
  contentInstreamPosition?:
    | "CONTENT_INSTREAM_POSITION_UNSPECIFIED"
    | "CONTENT_INSTREAM_POSITION_PRE_ROLL"
    | "CONTENT_INSTREAM_POSITION_MID_ROLL"
    | "CONTENT_INSTREAM_POSITION_POST_ROLL"
    | "CONTENT_INSTREAM_POSITION_UNKNOWN"
    | (string & {});
}

export const ContentInstreamPositionTargetingOptionDetails: Schema.Schema<ContentInstreamPositionTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentInstreamPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentInstreamPositionTargetingOptionDetails",
  }) as any as Schema.Schema<ContentInstreamPositionTargetingOptionDetails>;

export interface LanguageTargetingOptionDetails {
  /** Output only. The display name of the language (e.g., "French"). */
  displayName?: string;
}

export const LanguageTargetingOptionDetails: Schema.Schema<LanguageTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LanguageTargetingOptionDetails",
  }) as any as Schema.Schema<LanguageTargetingOptionDetails>;

export interface SensitiveCategoryTargetingOptionDetails {
  /** Output only. An enum for the DV360 Sensitive category content classifier. */
  sensitiveCategory?:
    | "SENSITIVE_CATEGORY_UNSPECIFIED"
    | "SENSITIVE_CATEGORY_ADULT"
    | "SENSITIVE_CATEGORY_DEROGATORY"
    | "SENSITIVE_CATEGORY_DOWNLOADS_SHARING"
    | "SENSITIVE_CATEGORY_WEAPONS"
    | "SENSITIVE_CATEGORY_GAMBLING"
    | "SENSITIVE_CATEGORY_VIOLENCE"
    | "SENSITIVE_CATEGORY_SUGGESTIVE"
    | "SENSITIVE_CATEGORY_PROFANITY"
    | "SENSITIVE_CATEGORY_ALCOHOL"
    | "SENSITIVE_CATEGORY_DRUGS"
    | "SENSITIVE_CATEGORY_TOBACCO"
    | "SENSITIVE_CATEGORY_POLITICS"
    | "SENSITIVE_CATEGORY_RELIGION"
    | "SENSITIVE_CATEGORY_TRAGEDY"
    | "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS"
    | "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES"
    | "SENSITIVE_CATEGORY_SHOCKING"
    | "SENSITIVE_CATEGORY_EMBEDDED_VIDEO"
    | "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO"
    | (string & {});
}

export const SensitiveCategoryTargetingOptionDetails: Schema.Schema<SensitiveCategoryTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sensitiveCategory: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SensitiveCategoryTargetingOptionDetails",
  }) as any as Schema.Schema<SensitiveCategoryTargetingOptionDetails>;

export interface PoiTargetingOptionDetails {
  /** Output only. Latitude of the POI rounding to 6th decimal place. */
  latitude?: number;
  /** Output only. Longitude of the POI rounding to 6th decimal place. */
  longitude?: number;
  /** Output only. The display name of a POI(e.g. "Times Square", "Space Needle"), followed by its full address if available. */
  displayName?: string;
}

export const PoiTargetingOptionDetails: Schema.Schema<PoiTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      latitude: Schema.optional(Schema.Number),
      longitude: Schema.optional(Schema.Number),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PoiTargetingOptionDetails",
  }) as any as Schema.Schema<PoiTargetingOptionDetails>;

export interface OperatingSystemTargetingOptionDetails {
  /** Output only. The display name of the operating system. */
  displayName?: string;
}

export const OperatingSystemTargetingOptionDetails: Schema.Schema<OperatingSystemTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperatingSystemTargetingOptionDetails",
  }) as any as Schema.Schema<OperatingSystemTargetingOptionDetails>;

export interface BusinessChainTargetingOptionDetails {
  /** Output only. The display name of the geographic region, e.g. "Ontario, Canada". */
  geoRegion?: string;
  /** Output only. The type of the geographic region. */
  geoRegionType?:
    | "GEO_REGION_TYPE_UNKNOWN"
    | "GEO_REGION_TYPE_OTHER"
    | "GEO_REGION_TYPE_COUNTRY"
    | "GEO_REGION_TYPE_REGION"
    | "GEO_REGION_TYPE_TERRITORY"
    | "GEO_REGION_TYPE_PROVINCE"
    | "GEO_REGION_TYPE_STATE"
    | "GEO_REGION_TYPE_PREFECTURE"
    | "GEO_REGION_TYPE_GOVERNORATE"
    | "GEO_REGION_TYPE_CANTON"
    | "GEO_REGION_TYPE_UNION_TERRITORY"
    | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY"
    | "GEO_REGION_TYPE_DMA_REGION"
    | "GEO_REGION_TYPE_METRO"
    | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT"
    | "GEO_REGION_TYPE_COUNTY"
    | "GEO_REGION_TYPE_MUNICIPALITY"
    | "GEO_REGION_TYPE_CITY"
    | "GEO_REGION_TYPE_POSTAL_CODE"
    | "GEO_REGION_TYPE_DEPARTMENT"
    | "GEO_REGION_TYPE_AIRPORT"
    | "GEO_REGION_TYPE_TV_REGION"
    | "GEO_REGION_TYPE_OKRUG"
    | "GEO_REGION_TYPE_BOROUGH"
    | "GEO_REGION_TYPE_CITY_REGION"
    | "GEO_REGION_TYPE_ARRONDISSEMENT"
    | "GEO_REGION_TYPE_NEIGHBORHOOD"
    | "GEO_REGION_TYPE_UNIVERSITY"
    | "GEO_REGION_TYPE_DISTRICT"
    | "GEO_REGION_TYPE_NATIONAL_PARK"
    | "GEO_REGION_TYPE_BARRIO"
    | "GEO_REGION_TYPE_SUB_WARD"
    | "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT"
    | "GEO_REGION_TYPE_SUB_DISTRICT"
    | "GEO_REGION_TYPE_QUARTER"
    | "GEO_REGION_TYPE_DIVISION"
    | "GEO_REGION_TYPE_COMMUNE"
    | "GEO_REGION_TYPE_COLLOQUIAL_AREA"
    | (string & {});
  /** Output only. The display name of the business chain, e.g. "KFC", "Chase Bank". */
  businessChain?: string;
}

export const BusinessChainTargetingOptionDetails: Schema.Schema<BusinessChainTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      geoRegion: Schema.optional(Schema.String),
      geoRegionType: Schema.optional(Schema.String),
      businessChain: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BusinessChainTargetingOptionDetails",
  }) as any as Schema.Schema<BusinessChainTargetingOptionDetails>;

export interface DeviceTypeTargetingOptionDetails {
  /** Output only. The device type that is used to be targeted. */
  deviceType?:
    | "DEVICE_TYPE_UNSPECIFIED"
    | "DEVICE_TYPE_COMPUTER"
    | "DEVICE_TYPE_CONNECTED_TV"
    | "DEVICE_TYPE_SMART_PHONE"
    | "DEVICE_TYPE_TABLET"
    | "DEVICE_TYPE_CONNECTED_DEVICE"
    | (string & {});
}

export const DeviceTypeTargetingOptionDetails: Schema.Schema<DeviceTypeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deviceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeviceTypeTargetingOptionDetails",
  }) as any as Schema.Schema<DeviceTypeTargetingOptionDetails>;

export interface GeoRegionTargetingOptionDetails {
  /** Output only. The display name of the geographic region (e.g., "Ontario, Canada"). */
  displayName?: string;
  /** Output only. The type of geographic region targeting. */
  geoRegionType?:
    | "GEO_REGION_TYPE_UNKNOWN"
    | "GEO_REGION_TYPE_OTHER"
    | "GEO_REGION_TYPE_COUNTRY"
    | "GEO_REGION_TYPE_REGION"
    | "GEO_REGION_TYPE_TERRITORY"
    | "GEO_REGION_TYPE_PROVINCE"
    | "GEO_REGION_TYPE_STATE"
    | "GEO_REGION_TYPE_PREFECTURE"
    | "GEO_REGION_TYPE_GOVERNORATE"
    | "GEO_REGION_TYPE_CANTON"
    | "GEO_REGION_TYPE_UNION_TERRITORY"
    | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY"
    | "GEO_REGION_TYPE_DMA_REGION"
    | "GEO_REGION_TYPE_METRO"
    | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT"
    | "GEO_REGION_TYPE_COUNTY"
    | "GEO_REGION_TYPE_MUNICIPALITY"
    | "GEO_REGION_TYPE_CITY"
    | "GEO_REGION_TYPE_POSTAL_CODE"
    | "GEO_REGION_TYPE_DEPARTMENT"
    | "GEO_REGION_TYPE_AIRPORT"
    | "GEO_REGION_TYPE_TV_REGION"
    | "GEO_REGION_TYPE_OKRUG"
    | "GEO_REGION_TYPE_BOROUGH"
    | "GEO_REGION_TYPE_CITY_REGION"
    | "GEO_REGION_TYPE_ARRONDISSEMENT"
    | "GEO_REGION_TYPE_NEIGHBORHOOD"
    | "GEO_REGION_TYPE_UNIVERSITY"
    | "GEO_REGION_TYPE_DISTRICT"
    | "GEO_REGION_TYPE_NATIONAL_PARK"
    | "GEO_REGION_TYPE_BARRIO"
    | "GEO_REGION_TYPE_SUB_WARD"
    | "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT"
    | "GEO_REGION_TYPE_SUB_DISTRICT"
    | "GEO_REGION_TYPE_QUARTER"
    | "GEO_REGION_TYPE_DIVISION"
    | "GEO_REGION_TYPE_COMMUNE"
    | "GEO_REGION_TYPE_COLLOQUIAL_AREA"
    | (string & {});
}

export const GeoRegionTargetingOptionDetails: Schema.Schema<GeoRegionTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      geoRegionType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GeoRegionTargetingOptionDetails",
  }) as any as Schema.Schema<GeoRegionTargetingOptionDetails>;

export interface NativeContentPositionTargetingOptionDetails {
  /** Output only. The content position. */
  contentPosition?:
    | "NATIVE_CONTENT_POSITION_UNSPECIFIED"
    | "NATIVE_CONTENT_POSITION_UNKNOWN"
    | "NATIVE_CONTENT_POSITION_IN_ARTICLE"
    | "NATIVE_CONTENT_POSITION_IN_FEED"
    | "NATIVE_CONTENT_POSITION_PERIPHERAL"
    | "NATIVE_CONTENT_POSITION_RECOMMENDATION"
    | (string & {});
}

export const NativeContentPositionTargetingOptionDetails: Schema.Schema<NativeContentPositionTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NativeContentPositionTargetingOptionDetails",
  }) as any as Schema.Schema<NativeContentPositionTargetingOptionDetails>;

export interface EnvironmentTargetingOptionDetails {
  /** Output only. The serving environment. */
  environment?:
    | "ENVIRONMENT_UNSPECIFIED"
    | "ENVIRONMENT_WEB_OPTIMIZED"
    | "ENVIRONMENT_WEB_NOT_OPTIMIZED"
    | "ENVIRONMENT_APP"
    | (string & {});
}

export const EnvironmentTargetingOptionDetails: Schema.Schema<EnvironmentTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnvironmentTargetingOptionDetails",
  }) as any as Schema.Schema<EnvironmentTargetingOptionDetails>;

export interface UserRewardedContentTargetingOptionDetails {
  /** Output only. User rewarded content status for video ads. */
  userRewardedContent?:
    | "USER_REWARDED_CONTENT_UNSPECIFIED"
    | "USER_REWARDED_CONTENT_USER_REWARDED"
    | "USER_REWARDED_CONTENT_NOT_USER_REWARDED"
    | (string & {});
}

export const UserRewardedContentTargetingOptionDetails: Schema.Schema<UserRewardedContentTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userRewardedContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UserRewardedContentTargetingOptionDetails",
  }) as any as Schema.Schema<UserRewardedContentTargetingOptionDetails>;

export interface OmidTargetingOptionDetails {
  /** Output only. The type of Open Measurement enabled inventory. */
  omid?: "OMID_UNSPECIFIED" | "OMID_FOR_MOBILE_DISPLAY_ADS" | (string & {});
}

export const OmidTargetingOptionDetails: Schema.Schema<OmidTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      omid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmidTargetingOptionDetails",
  }) as any as Schema.Schema<OmidTargetingOptionDetails>;

export interface OnScreenPositionTargetingOptionDetails {
  /** Output only. The on screen position. */
  onScreenPosition?:
    | "ON_SCREEN_POSITION_UNSPECIFIED"
    | "ON_SCREEN_POSITION_UNKNOWN"
    | "ON_SCREEN_POSITION_ABOVE_THE_FOLD"
    | "ON_SCREEN_POSITION_BELOW_THE_FOLD"
    | (string & {});
}

export const OnScreenPositionTargetingOptionDetails: Schema.Schema<OnScreenPositionTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      onScreenPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OnScreenPositionTargetingOptionDetails",
  }) as any as Schema.Schema<OnScreenPositionTargetingOptionDetails>;

export interface ExchangeTargetingOptionDetails {
  /** Output only. The type of exchange. */
  exchange?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
}

export const ExchangeTargetingOptionDetails: Schema.Schema<ExchangeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exchange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExchangeTargetingOptionDetails",
  }) as any as Schema.Schema<ExchangeTargetingOptionDetails>;

export interface BrowserTargetingOptionDetails {
  /** Output only. The display name of the browser. */
  displayName?: string;
}

export const BrowserTargetingOptionDetails: Schema.Schema<BrowserTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BrowserTargetingOptionDetails",
  }) as any as Schema.Schema<BrowserTargetingOptionDetails>;

export interface SubExchangeTargetingOptionDetails {
  /** Output only. The display name of the sub-exchange. */
  displayName?: string;
}

export const SubExchangeTargetingOptionDetails: Schema.Schema<SubExchangeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SubExchangeTargetingOptionDetails",
  }) as any as Schema.Schema<SubExchangeTargetingOptionDetails>;

export interface ViewabilityTargetingOptionDetails {
  /** Output only. The predicted viewability percentage. */
  viewability?:
    | "VIEWABILITY_UNSPECIFIED"
    | "VIEWABILITY_10_PERCENT_OR_MORE"
    | "VIEWABILITY_20_PERCENT_OR_MORE"
    | "VIEWABILITY_30_PERCENT_OR_MORE"
    | "VIEWABILITY_40_PERCENT_OR_MORE"
    | "VIEWABILITY_50_PERCENT_OR_MORE"
    | "VIEWABILITY_60_PERCENT_OR_MORE"
    | "VIEWABILITY_70_PERCENT_OR_MORE"
    | "VIEWABILITY_80_PERCENT_OR_MORE"
    | "VIEWABILITY_90_PERCENT_OR_MORE"
    | (string & {});
}

export const ViewabilityTargetingOptionDetails: Schema.Schema<ViewabilityTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      viewability: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ViewabilityTargetingOptionDetails",
  }) as any as Schema.Schema<ViewabilityTargetingOptionDetails>;

export interface ContentDurationTargetingOptionDetails {
  /** Output only. The content duration. */
  contentDuration?:
    | "CONTENT_DURATION_UNSPECIFIED"
    | "CONTENT_DURATION_UNKNOWN"
    | "CONTENT_DURATION_0_TO_1_MIN"
    | "CONTENT_DURATION_1_TO_5_MIN"
    | "CONTENT_DURATION_5_TO_15_MIN"
    | "CONTENT_DURATION_15_TO_30_MIN"
    | "CONTENT_DURATION_30_TO_60_MIN"
    | "CONTENT_DURATION_OVER_60_MIN"
    | (string & {});
}

export const ContentDurationTargetingOptionDetails: Schema.Schema<ContentDurationTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentDurationTargetingOptionDetails",
  }) as any as Schema.Schema<ContentDurationTargetingOptionDetails>;

export interface CategoryTargetingOptionDetails {
  /** Output only. The display name of the category. */
  displayName?: string;
}

export const CategoryTargetingOptionDetails: Schema.Schema<CategoryTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CategoryTargetingOptionDetails",
  }) as any as Schema.Schema<CategoryTargetingOptionDetails>;

export interface DigitalContentLabelTargetingOptionDetails {
  /** Output only. An enum for the content label brand safety tiers. */
  contentRatingTier?:
    | "CONTENT_RATING_TIER_UNSPECIFIED"
    | "CONTENT_RATING_TIER_UNRATED"
    | "CONTENT_RATING_TIER_GENERAL"
    | "CONTENT_RATING_TIER_PARENTAL_GUIDANCE"
    | "CONTENT_RATING_TIER_TEENS"
    | "CONTENT_RATING_TIER_MATURE"
    | "CONTENT_RATING_TIER_FAMILIES"
    | (string & {});
}

export const DigitalContentLabelTargetingOptionDetails: Schema.Schema<DigitalContentLabelTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentRatingTier: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DigitalContentLabelTargetingOptionDetails",
  }) as any as Schema.Schema<DigitalContentLabelTargetingOptionDetails>;

export interface AudioContentTypeTargetingOptionDetails {
  /** Output only. The audio content type. */
  audioContentType?:
    | "AUDIO_CONTENT_TYPE_UNSPECIFIED"
    | "AUDIO_CONTENT_TYPE_UNKNOWN"
    | "AUDIO_CONTENT_TYPE_MUSIC"
    | "AUDIO_CONTENT_TYPE_BROADCAST"
    | "AUDIO_CONTENT_TYPE_PODCAST"
    | (string & {});
}

export const AudioContentTypeTargetingOptionDetails: Schema.Schema<AudioContentTypeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioContentType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AudioContentTypeTargetingOptionDetails",
  }) as any as Schema.Schema<AudioContentTypeTargetingOptionDetails>;

export interface ContentThemeTargetingOptionDetails {
  /** Output only. An enum for the DV360 content theme content classifier. */
  contentTheme?:
    | "CONTENT_THEME_UNSPECIFIED"
    | "CONTENT_THEME_FIGHTING_VIDEO_GAMES"
    | "CONTENT_THEME_MATURE_GAMES"
    | "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES"
    | "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES"
    | "CONTENT_THEME_POLITICS"
    | "CONTENT_THEME_RECENT_NEWS"
    | "CONTENT_THEME_RELIGION"
    | "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT"
    | "CONTENT_THEME_UNPLEASANT_NEWS"
    | (string & {});
}

export const ContentThemeTargetingOptionDetails: Schema.Schema<ContentThemeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentTheme: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentThemeTargetingOptionDetails",
  }) as any as Schema.Schema<ContentThemeTargetingOptionDetails>;

export interface CarrierAndIspTargetingOptionDetails {
  /** Output only. The type indicating if it's carrier or ISP. */
  type?:
    | "CARRIER_AND_ISP_TYPE_UNSPECIFIED"
    | "CARRIER_AND_ISP_TYPE_ISP"
    | "CARRIER_AND_ISP_TYPE_CARRIER"
    | (string & {});
  /** Output only. The display name of the carrier or ISP. */
  displayName?: string;
}

export const CarrierAndIspTargetingOptionDetails: Schema.Schema<CarrierAndIspTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CarrierAndIspTargetingOptionDetails",
  }) as any as Schema.Schema<CarrierAndIspTargetingOptionDetails>;

export interface AgeRangeTargetingOptionDetails {
  /** Output only. The age range of an audience. */
  ageRange?:
    | "AGE_RANGE_UNSPECIFIED"
    | "AGE_RANGE_18_24"
    | "AGE_RANGE_25_34"
    | "AGE_RANGE_35_44"
    | "AGE_RANGE_45_54"
    | "AGE_RANGE_55_64"
    | "AGE_RANGE_65_PLUS"
    | "AGE_RANGE_UNKNOWN"
    | "AGE_RANGE_18_20"
    | "AGE_RANGE_21_24"
    | "AGE_RANGE_25_29"
    | "AGE_RANGE_30_34"
    | "AGE_RANGE_35_39"
    | "AGE_RANGE_40_44"
    | "AGE_RANGE_45_49"
    | "AGE_RANGE_50_54"
    | "AGE_RANGE_55_59"
    | "AGE_RANGE_60_64"
    | (string & {});
}

export const AgeRangeTargetingOptionDetails: Schema.Schema<AgeRangeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ageRange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AgeRangeTargetingOptionDetails",
  }) as any as Schema.Schema<AgeRangeTargetingOptionDetails>;

export interface ContentStreamTypeTargetingOptionDetails {
  /** Output only. The content stream type. */
  contentStreamType?:
    | "CONTENT_STREAM_TYPE_UNSPECIFIED"
    | "CONTENT_LIVE_STREAM"
    | "CONTENT_ON_DEMAND"
    | (string & {});
}

export const ContentStreamTypeTargetingOptionDetails: Schema.Schema<ContentStreamTypeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentStreamType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentStreamTypeTargetingOptionDetails",
  }) as any as Schema.Schema<ContentStreamTypeTargetingOptionDetails>;

export interface ParentalStatusTargetingOptionDetails {
  /** Output only. The parental status of an audience. */
  parentalStatus?:
    | "PARENTAL_STATUS_UNSPECIFIED"
    | "PARENTAL_STATUS_PARENT"
    | "PARENTAL_STATUS_NOT_A_PARENT"
    | "PARENTAL_STATUS_UNKNOWN"
    | (string & {});
}

export const ParentalStatusTargetingOptionDetails: Schema.Schema<ParentalStatusTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parentalStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ParentalStatusTargetingOptionDetails",
  }) as any as Schema.Schema<ParentalStatusTargetingOptionDetails>;

export interface VideoPlayerSizeTargetingOptionDetails {
  /** Output only. The video player size. */
  videoPlayerSize?:
    | "VIDEO_PLAYER_SIZE_UNSPECIFIED"
    | "VIDEO_PLAYER_SIZE_SMALL"
    | "VIDEO_PLAYER_SIZE_LARGE"
    | "VIDEO_PLAYER_SIZE_HD"
    | "VIDEO_PLAYER_SIZE_UNKNOWN"
    | (string & {});
}

export const VideoPlayerSizeTargetingOptionDetails: Schema.Schema<VideoPlayerSizeTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoPlayerSize: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoPlayerSizeTargetingOptionDetails",
  }) as any as Schema.Schema<VideoPlayerSizeTargetingOptionDetails>;

export interface DeviceMakeModelTargetingOptionDetails {
  /** Output only. The display name of the device make and model. */
  displayName?: string;
}

export const DeviceMakeModelTargetingOptionDetails: Schema.Schema<DeviceMakeModelTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeviceMakeModelTargetingOptionDetails",
  }) as any as Schema.Schema<DeviceMakeModelTargetingOptionDetails>;

export interface AppCategoryTargetingOptionDetails {
  /** Output only. The name of the app collection. */
  displayName?: string;
}

export const AppCategoryTargetingOptionDetails: Schema.Schema<AppCategoryTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AppCategoryTargetingOptionDetails",
  }) as any as Schema.Schema<AppCategoryTargetingOptionDetails>;

export interface TargetingOption {
  /** Authorized seller status resource details. */
  authorizedSellerStatusDetails?: AuthorizedSellerStatusTargetingOptionDetails;
  /** Gender details. */
  genderDetails?: GenderTargetingOptionDetails;
  /** Content outstream position details. */
  contentOutstreamPositionDetails?: ContentOutstreamPositionTargetingOptionDetails;
  /** Content genre resource details. */
  contentGenreDetails?: ContentGenreTargetingOptionDetails;
  /** Content instream position details. */
  contentInstreamPositionDetails?: ContentInstreamPositionTargetingOptionDetails;
  /** Language resource details. */
  languageDetails?: LanguageTargetingOptionDetails;
  /** Sensitive Category details. */
  sensitiveCategoryDetails?: SensitiveCategoryTargetingOptionDetails;
  /** POI resource details. */
  poiDetails?: PoiTargetingOptionDetails;
  /** Operating system resources details. */
  operatingSystemDetails?: OperatingSystemTargetingOptionDetails;
  /** Business chain resource details. */
  businessChainDetails?: BusinessChainTargetingOptionDetails;
  /** Device type details. */
  deviceTypeDetails?: DeviceTypeTargetingOptionDetails;
  /** Geographic region resource details. */
  geoRegionDetails?: GeoRegionTargetingOptionDetails;
  /** Native content position details. */
  nativeContentPositionDetails?: NativeContentPositionTargetingOptionDetails;
  /** Environment details. */
  environmentDetails?: EnvironmentTargetingOptionDetails;
  /** User rewarded content details. */
  userRewardedContentDetails?: UserRewardedContentTargetingOptionDetails;
  /** Open Measurement enabled inventory details. */
  omidDetails?: OmidTargetingOptionDetails;
  /** On screen position details. */
  onScreenPositionDetails?: OnScreenPositionTargetingOptionDetails;
  /** Exchange details. */
  exchangeDetails?: ExchangeTargetingOptionDetails;
  /** Browser details. */
  browserDetails?: BrowserTargetingOptionDetails;
  /** Sub-exchange details. */
  subExchangeDetails?: SubExchangeTargetingOptionDetails;
  /** Viewability resource details. */
  viewabilityDetails?: ViewabilityTargetingOptionDetails;
  /** Content duration resource details. */
  contentDurationDetails?: ContentDurationTargetingOptionDetails;
  /** Category resource details. */
  categoryDetails?: CategoryTargetingOptionDetails;
  /** Digital content label details. */
  digitalContentLabelDetails?: DigitalContentLabelTargetingOptionDetails;
  /** Audio content type details. */
  audioContentTypeDetails?: AudioContentTypeTargetingOptionDetails;
  /** Content theme details. */
  contentThemeDetails?: ContentThemeTargetingOptionDetails;
  /** Carrier and ISP details. */
  carrierAndIspDetails?: CarrierAndIspTargetingOptionDetails;
  /** Output only. The type of this targeting option. */
  targetingType?:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Age range details. */
  ageRangeDetails?: AgeRangeTargetingOptionDetails;
  /** Household income details. */
  householdIncomeDetails?: HouseholdIncomeTargetingOptionDetails;
  /** Output only. A unique identifier for this targeting option. The tuple {`targeting_type`, `targeting_option_id`} will be unique. */
  targetingOptionId?: string;
  /** Content stream type resource details. */
  contentStreamTypeDetails?: ContentStreamTypeTargetingOptionDetails;
  /** Parental status details. */
  parentalStatusDetails?: ParentalStatusTargetingOptionDetails;
  /** Output only. The resource name for this targeting option. */
  name?: string;
  /** Video player size details. */
  videoPlayerSizeDetails?: VideoPlayerSizeTargetingOptionDetails;
  /** Device make and model resource details. */
  deviceMakeModelDetails?: DeviceMakeModelTargetingOptionDetails;
  /** App category details. */
  appCategoryDetails?: AppCategoryTargetingOptionDetails;
}

export const TargetingOption: Schema.Schema<TargetingOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authorizedSellerStatusDetails: Schema.optional(
        AuthorizedSellerStatusTargetingOptionDetails,
      ),
      genderDetails: Schema.optional(GenderTargetingOptionDetails),
      contentOutstreamPositionDetails: Schema.optional(
        ContentOutstreamPositionTargetingOptionDetails,
      ),
      contentGenreDetails: Schema.optional(ContentGenreTargetingOptionDetails),
      contentInstreamPositionDetails: Schema.optional(
        ContentInstreamPositionTargetingOptionDetails,
      ),
      languageDetails: Schema.optional(LanguageTargetingOptionDetails),
      sensitiveCategoryDetails: Schema.optional(
        SensitiveCategoryTargetingOptionDetails,
      ),
      poiDetails: Schema.optional(PoiTargetingOptionDetails),
      operatingSystemDetails: Schema.optional(
        OperatingSystemTargetingOptionDetails,
      ),
      businessChainDetails: Schema.optional(
        BusinessChainTargetingOptionDetails,
      ),
      deviceTypeDetails: Schema.optional(DeviceTypeTargetingOptionDetails),
      geoRegionDetails: Schema.optional(GeoRegionTargetingOptionDetails),
      nativeContentPositionDetails: Schema.optional(
        NativeContentPositionTargetingOptionDetails,
      ),
      environmentDetails: Schema.optional(EnvironmentTargetingOptionDetails),
      userRewardedContentDetails: Schema.optional(
        UserRewardedContentTargetingOptionDetails,
      ),
      omidDetails: Schema.optional(OmidTargetingOptionDetails),
      onScreenPositionDetails: Schema.optional(
        OnScreenPositionTargetingOptionDetails,
      ),
      exchangeDetails: Schema.optional(ExchangeTargetingOptionDetails),
      browserDetails: Schema.optional(BrowserTargetingOptionDetails),
      subExchangeDetails: Schema.optional(SubExchangeTargetingOptionDetails),
      viewabilityDetails: Schema.optional(ViewabilityTargetingOptionDetails),
      contentDurationDetails: Schema.optional(
        ContentDurationTargetingOptionDetails,
      ),
      categoryDetails: Schema.optional(CategoryTargetingOptionDetails),
      digitalContentLabelDetails: Schema.optional(
        DigitalContentLabelTargetingOptionDetails,
      ),
      audioContentTypeDetails: Schema.optional(
        AudioContentTypeTargetingOptionDetails,
      ),
      contentThemeDetails: Schema.optional(ContentThemeTargetingOptionDetails),
      carrierAndIspDetails: Schema.optional(
        CarrierAndIspTargetingOptionDetails,
      ),
      targetingType: Schema.optional(Schema.String),
      ageRangeDetails: Schema.optional(AgeRangeTargetingOptionDetails),
      householdIncomeDetails: Schema.optional(
        HouseholdIncomeTargetingOptionDetails,
      ),
      targetingOptionId: Schema.optional(Schema.String),
      contentStreamTypeDetails: Schema.optional(
        ContentStreamTypeTargetingOptionDetails,
      ),
      parentalStatusDetails: Schema.optional(
        ParentalStatusTargetingOptionDetails,
      ),
      name: Schema.optional(Schema.String),
      videoPlayerSizeDetails: Schema.optional(
        VideoPlayerSizeTargetingOptionDetails,
      ),
      deviceMakeModelDetails: Schema.optional(
        DeviceMakeModelTargetingOptionDetails,
      ),
      appCategoryDetails: Schema.optional(AppCategoryTargetingOptionDetails),
    }),
  ).annotate({
    identifier: "TargetingOption",
  }) as any as Schema.Schema<TargetingOption>;

export interface ListTargetingOptionsResponse {
  /** The list of targeting options. This list will be absent if empty. */
  targetingOptions?: Array<TargetingOption>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListTargetingOptions` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListTargetingOptionsResponse: Schema.Schema<ListTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptions: Schema.optional(Schema.Array(TargetingOption)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTargetingOptionsResponse",
  }) as any as Schema.Schema<ListTargetingOptionsResponse>;

export interface UrlAssignedTargetingOptionDetails {
  /** Required. The URL, for example `example.com`. DV360 supports two levels of subdirectory targeting, for example `www.example.com/one-subdirectory-level/second-level`, and five levels of subdomain targeting, for example `five.four.three.two.one.example.com`. */
  url?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const UrlAssignedTargetingOptionDetails: Schema.Schema<UrlAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "UrlAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<UrlAssignedTargetingOptionDetails>;

export interface AgeRangeAssignedTargetingOptionDetails {
  /** Required. The age range of an audience. We only support targeting a continuous age range of an audience. Thus, the age range represented in this field can be 1) targeted solely, or, 2) part of a larger continuous age range. The reach of a continuous age range targeting can be expanded by also targeting an audience of an unknown age. */
  ageRange?:
    | "AGE_RANGE_UNSPECIFIED"
    | "AGE_RANGE_18_24"
    | "AGE_RANGE_25_34"
    | "AGE_RANGE_35_44"
    | "AGE_RANGE_45_54"
    | "AGE_RANGE_55_64"
    | "AGE_RANGE_65_PLUS"
    | "AGE_RANGE_UNKNOWN"
    | "AGE_RANGE_18_20"
    | "AGE_RANGE_21_24"
    | "AGE_RANGE_25_29"
    | "AGE_RANGE_30_34"
    | "AGE_RANGE_35_39"
    | "AGE_RANGE_40_44"
    | "AGE_RANGE_45_49"
    | "AGE_RANGE_50_54"
    | "AGE_RANGE_55_59"
    | "AGE_RANGE_60_64"
    | (string & {});
}

export const AgeRangeAssignedTargetingOptionDetails: Schema.Schema<AgeRangeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ageRange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AgeRangeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<AgeRangeAssignedTargetingOptionDetails>;

export interface YoutubeVideoAsset {
  /** Required. The YouTube video id of the asset. This is the 11 char string value used in the YouTube video URL. */
  youtubeVideoId?: string;
}

export const YoutubeVideoAsset: Schema.Schema<YoutubeVideoAsset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      youtubeVideoId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YoutubeVideoAsset",
  }) as any as Schema.Schema<YoutubeVideoAsset>;

export interface AdAsset {
  /** Output only. The ID of the ad asset. Referred to as the asset ID when assigned to an ad. */
  adAssetId?: string;
  /** Identifier. The resource name of the ad asset. */
  name?: string;
  /** Required. The type of the ad asset. */
  adAssetType?:
    | "AD_ASSET_TYPE_UNSPECIFIED"
    | "AD_ASSET_TYPE_IMAGE"
    | "AD_ASSET_TYPE_YOUTUBE_VIDEO"
    | (string & {});
  /** Output only. The entity status of the ad asset. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Youtube video asset data. */
  youtubeVideoAsset?: YoutubeVideoAsset;
}

export const AdAsset: Schema.Schema<AdAsset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAssetId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      adAssetType: Schema.optional(Schema.String),
      entityStatus: Schema.optional(Schema.String),
      youtubeVideoAsset: Schema.optional(YoutubeVideoAsset),
    }),
  ).annotate({ identifier: "AdAsset" }) as any as Schema.Schema<AdAsset>;

export interface ListAdAssetsResponse {
  /** The list of ad assets. The list will only contain assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. This list will be absent if empty. */
  adAssets?: Array<AdAsset>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdAssets` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdAssetsResponse: Schema.Schema<ListAdAssetsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAssets: Schema.optional(Schema.Array(AdAsset)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdAssetsResponse",
  }) as any as Schema.Schema<ListAdAssetsResponse>;

export interface CreateAdAssetRequest {
  /** Required. The ad asset to create. Only supports assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
  adAsset?: AdAsset;
}

export const CreateAdAssetRequest: Schema.Schema<CreateAdAssetRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAsset: Schema.optional(AdAsset),
    }),
  ).annotate({
    identifier: "CreateAdAssetRequest",
  }) as any as Schema.Schema<CreateAdAssetRequest>;

export interface Displayvideo_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Displayvideo_Date: Schema.Schema<Displayvideo_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Displayvideo_Date",
  }) as any as Schema.Schema<Displayvideo_Date>;

export interface DateRange {
  /** The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`. */
  startDate?: Displayvideo_Date;
  /** The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`. */
  endDate?: Displayvideo_Date;
}

export const DateRange: Schema.Schema<DateRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startDate: Schema.optional(Displayvideo_Date),
      endDate: Schema.optional(Displayvideo_Date),
    }),
  ).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface TimeRange {
  /** Required. The lower bound of a time range, inclusive. */
  startTime?: string;
  /** Required. The upper bound of a time range, inclusive. */
  endTime?: string;
}

export const TimeRange: Schema.Schema<TimeRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimeRange" }) as any as Schema.Schema<TimeRange>;

export interface GuaranteedOrder {
  /** Required. The publisher name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  publisherName?: string;
  /** Output only. The timestamp when the guaranteed order was last updated. Assigned by the system. */
  updateTime?: string;
  /** Whether all advertisers of read_write_partner_id have read access to the guaranteed order. Only applicable if read_write_partner_id is set. If True, overrides read_advertiser_ids. */
  readAccessInherited?: boolean;
  /** Output only. The unique identifier of the guaranteed order. The guaranteed order IDs have the format `{exchange}-{legacy_guaranteed_order_id}`. */
  guaranteedOrderId?: string;
  /** The advertiser with read/write access to the guaranteed order. This is also the default advertiser of the guaranteed order. */
  readWriteAdvertiserId?: string;
  /** Required. The display name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** The status settings of the guaranteed order. */
  status?: GuaranteedOrderStatus;
  /** Required. Immutable. The exchange where the guaranteed order originated. */
  exchange?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
  /** The partner with read/write access to the guaranteed order. */
  readWritePartnerId?: string;
  /** Output only. The legacy ID of the guaranteed order. Assigned by the original exchange. The legacy ID is unique within one exchange, but is not guaranteed to be unique across all guaranteed orders. This ID is used in SDF and UI. */
  legacyGuaranteedOrderId?: string;
  /** Output only. The resource name of the guaranteed order. */
  name?: string;
  /** The IDs of advertisers with read access to the guaranteed order. This field must not include the advertiser assigned to read_write_advertiser_id if it is set. All advertisers in this field must belong to read_write_partner_id or the same partner as read_write_advertiser_id. */
  readAdvertiserIds?: Array<string>;
  /** Output only. The ID of default advertiser of the guaranteed order. The default advertiser is either the read_write_advertiser_id or, if that is not set, the first advertiser listed in read_advertiser_ids. Otherwise, there is no default advertiser. */
  defaultAdvertiserId?: string;
  /** The ID of the default campaign that is assigned to the guaranteed order. The default campaign must belong to the default advertiser. */
  defaultCampaignId?: string;
}

export const GuaranteedOrder: Schema.Schema<GuaranteedOrder> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      publisherName: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      readAccessInherited: Schema.optional(Schema.Boolean),
      guaranteedOrderId: Schema.optional(Schema.String),
      readWriteAdvertiserId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      status: Schema.optional(GuaranteedOrderStatus),
      exchange: Schema.optional(Schema.String),
      readWritePartnerId: Schema.optional(Schema.String),
      legacyGuaranteedOrderId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      readAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
      defaultAdvertiserId: Schema.optional(Schema.String),
      defaultCampaignId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuaranteedOrder",
  }) as any as Schema.Schema<GuaranteedOrder>;

export interface ListGuaranteedOrdersResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListGuaranteedOrders` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of guaranteed orders. This list will be absent if empty. */
  guaranteedOrders?: Array<GuaranteedOrder>;
}

export const ListGuaranteedOrdersResponse: Schema.Schema<ListGuaranteedOrdersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      guaranteedOrders: Schema.optional(Schema.Array(GuaranteedOrder)),
    }),
  ).annotate({
    identifier: "ListGuaranteedOrdersResponse",
  }) as any as Schema.Schema<ListGuaranteedOrdersResponse>;

export interface PerformanceGoalBidStrategy {
  /** Required. The type of the performance goal that the bidding strategy will try to meet or beat. For line item level usage, the value must be one of: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. */
  performanceGoalType?:
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH"
    | (string & {});
  /** The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. Not applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`. For example, 1500000 represents 1.5 standard units of the currency. */
  maxAverageCpmBidAmountMicros?: string;
  /** Required. The performance goal the bidding strategy will attempt to meet or beat, in micros of the advertiser's currency or in micro of the ROAS (Return On Advertising Spend) value which is also based on advertiser's currency. Must be greater than or equal to a billable unit of the given currency and smaller or equal to upper bounds. Each performance_goal_type has its upper bound: * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, upper bound is 10000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`, upper bound is 1000.00 and lower bound is 0.01. Example: If set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, the bid price will be based on the probability that each available impression will be viewable. For example, if viewable CPM target is $2 and an impression is 40% likely to be viewable, the bid price will be $0.80 CPM (40% of $2). For example, 1500000 represents 1.5 standard units of the currency or ROAS value. */
  performanceGoalAmountMicros?: string;
  /** The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error. */
  customBiddingAlgorithmId?: string;
}

export const PerformanceGoalBidStrategy: Schema.Schema<PerformanceGoalBidStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      performanceGoalType: Schema.optional(Schema.String),
      maxAverageCpmBidAmountMicros: Schema.optional(Schema.String),
      performanceGoalAmountMicros: Schema.optional(Schema.String),
      customBiddingAlgorithmId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PerformanceGoalBidStrategy",
  }) as any as Schema.Schema<PerformanceGoalBidStrategy>;

export interface CmHybridConfig {
  /** A list of CM360 sites whose placements will be synced to DV360 as creatives. If absent or empty in CreateAdvertiser method, the system will automatically create a CM360 site. Removing sites from this list may cause DV360 creatives synced from CM360 to be deleted. At least one site must be specified. */
  cmSyncableSiteIds?: Array<string>;
  /** Whether or not to include DV360 data in CM360 data transfer reports. */
  dv360ToCmDataSharingEnabled?: boolean;
  /** Required. Immutable. Account ID of the CM360 Floodlight configuration linked with the DV360 advertiser. */
  cmAccountId?: string;
  /** Required. Immutable. By setting this field to `true`, you, on behalf of your company, authorize the sharing of information from the given Floodlight configuration to this Display & Video 360 advertiser. */
  cmFloodlightLinkingAuthorized?: boolean;
  /** Required. Immutable. ID of the CM360 Floodlight configuration linked with the DV360 advertiser. */
  cmFloodlightConfigId?: string;
  /** Output only. The set of CM360 Advertiser IDs sharing the CM360 Floodlight configuration. */
  cmAdvertiserIds?: Array<string>;
  /** Whether or not to report DV360 cost to CM360. */
  dv360ToCmCostReportingEnabled?: boolean;
}

export const CmHybridConfig: Schema.Schema<CmHybridConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cmSyncableSiteIds: Schema.optional(Schema.Array(Schema.String)),
      dv360ToCmDataSharingEnabled: Schema.optional(Schema.Boolean),
      cmAccountId: Schema.optional(Schema.String),
      cmFloodlightLinkingAuthorized: Schema.optional(Schema.Boolean),
      cmFloodlightConfigId: Schema.optional(Schema.String),
      cmAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
      dv360ToCmCostReportingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CmHybridConfig",
  }) as any as Schema.Schema<CmHybridConfig>;

export interface ThirdPartyOnlyConfig {
  /** Whether or not order ID reporting for pixels is enabled. This value cannot be changed once set to `true`. */
  pixelOrderIdReportingEnabled?: boolean;
}

export const ThirdPartyOnlyConfig: Schema.Schema<ThirdPartyOnlyConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pixelOrderIdReportingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ThirdPartyOnlyConfig",
  }) as any as Schema.Schema<ThirdPartyOnlyConfig>;

export interface AdvertiserAdServerConfig {
  /** The configuration for advertisers that use both Campaign Manager 360 (CM360) and third-party ad servers. */
  cmHybridConfig?: CmHybridConfig;
  /** The configuration for advertisers that use third-party ad servers only. */
  thirdPartyOnlyConfig?: ThirdPartyOnlyConfig;
}

export const AdvertiserAdServerConfig: Schema.Schema<AdvertiserAdServerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cmHybridConfig: Schema.optional(CmHybridConfig),
      thirdPartyOnlyConfig: Schema.optional(ThirdPartyOnlyConfig),
    }),
  ).annotate({
    identifier: "AdvertiserAdServerConfig",
  }) as any as Schema.Schema<AdvertiserAdServerConfig>;

export interface CustomBiddingModelDetails {
  /** The readiness state of custom bidding model. */
  readinessState?:
    | "READINESS_STATE_UNSPECIFIED"
    | "READINESS_STATE_ACTIVE"
    | "READINESS_STATE_INSUFFICIENT_DATA"
    | "READINESS_STATE_TRAINING"
    | "READINESS_STATE_NO_VALID_SCRIPT"
    | "READINESS_STATE_EVALUATION_FAILURE"
    | (string & {});
  /** Output only. The suspension state of custom bidding model. */
  suspensionState?:
    | "SUSPENSION_STATE_UNSPECIFIED"
    | "SUSPENSION_STATE_ENABLED"
    | "SUSPENSION_STATE_DORMANT"
    | "SUSPENSION_STATE_SUSPENDED"
    | (string & {});
  /** The unique ID of the relevant advertiser. */
  advertiserId?: string;
}

export const CustomBiddingModelDetails: Schema.Schema<CustomBiddingModelDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      readinessState: Schema.optional(Schema.String),
      suspensionState: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingModelDetails",
  }) as any as Schema.Schema<CustomBiddingModelDetails>;

export interface DuplicateLineItemRequest {
  /** The display name of the new line item. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  targetDisplayName?: string;
  /** Whether this line item will serve European Union political ads. If contains_eu_political_ads has been set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` in the parent advertiser, then this field will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. This field can then be updated using the UI, API, or Structured Data Files. This field must be assigned when creating a new line item. Otherwise, **the `advertisers.lineItems.create` request will fail**. */
  containsEuPoliticalAds?:
    | "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN"
    | "CONTAINS_EU_POLITICAL_ADVERTISING"
    | "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING"
    | (string & {});
}

export const DuplicateLineItemRequest: Schema.Schema<DuplicateLineItemRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetDisplayName: Schema.optional(Schema.String),
      containsEuPoliticalAds: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DuplicateLineItemRequest",
  }) as any as Schema.Schema<DuplicateLineItemRequest>;

export interface AlgorithmRulesSignal {
  /** Signal based on impressions. */
  impressionSignal?:
    | "IMPRESSION_SIGNAL_UNSPECIFIED"
    | "DAY_AND_TIME"
    | "DEVICE_TYPE"
    | "AD_POSITION"
    | "OPERATING_SYSTEM_ID"
    | "MOBILE_MODEL_ID"
    | "EXCHANGE"
    | "ENVIRONMENT"
    | "COUNTRY_ID"
    | "CITY_ID"
    | "BROWSER_ID"
    | "CREATIVE_DIMENSION"
    | "VIDEO_CONTENT_DURATION_BUCKET"
    | "VIDEO_DELIVERY_TYPE"
    | "VIDEO_GENRE_ID"
    | (string & {});
  /** Signal based on clicks. This field is only supported for allowlisted partners. */
  clickSignal?: "CLICK_SIGNAL_UNSPECIFIED" | "CLICK" | (string & {});
  /** Signal based on active views. This field is only supported for allowlisted partners. */
  activeViewSignal?:
    | "ACTIVE_VIEW_SIGNAL_UNSPECIFIED"
    | "ACTIVE_VIEW_VIEWED"
    | "AUDIBLE"
    | "VIDEO_COMPLETED"
    | "TIME_ON_SCREEN"
    | "VIDEO_PLAYER_SIZE"
    | "COMPLETED_IN_VIEW_AUDIBLE"
    | (string & {});
}

export const AlgorithmRulesSignal: Schema.Schema<AlgorithmRulesSignal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      impressionSignal: Schema.optional(Schema.String),
      clickSignal: Schema.optional(Schema.String),
      activeViewSignal: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AlgorithmRulesSignal",
  }) as any as Schema.Schema<AlgorithmRulesSignal>;

export interface Invoice {
  /** The display name of the invoice. */
  displayName?: string;
  /** The total amount of costs or adjustments not tied to a particular budget, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  nonBudgetMicros?: string;
  /** The ID of the payments profile the invoice belongs to. Appears on the invoice PDF as `Billing ID`. */
  paymentsProfileId?: string;
  /** The date when the invoice is due. */
  dueDate?: Displayvideo_Date;
  /** The budget grouping ID for this invoice. This field will only be set if the invoice level of the corresponding billing profile was set to "Budget invoice grouping ID". */
  budgetInvoiceGroupingId?: string;
  /** The service start and end dates which are covered by this invoice. */
  serviceDateRange?: DateRange;
  /** The date when the invoice was issued. */
  issueDate?: Displayvideo_Date;
  /** The list of summarized information for each budget associated with this invoice. This field will only be set if the invoice detail level of the corresponding billing profile was set to "Budget level PO". */
  budgetSummaries?: Array<BudgetSummary>;
  /** The pre-tax subtotal amount, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  subtotalAmountMicros?: string;
  /** The invoice total amount, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  totalAmountMicros?: string;
  /** The ID(s) of any originally issued invoice that is being cancelled by this invoice, if applicable. Multiple invoices may be listed if those invoices are being consolidated into a single invoice. May appear on invoice PDF as `Replaced invoice numbers`. If corrected_invoice_id is set, this field will be empty. */
  replacedInvoiceIds?: Array<string>;
  /** The unique ID of the invoice. */
  invoiceId?: string;
  /** The type of invoice document. */
  invoiceType?:
    | "INVOICE_TYPE_UNSPECIFIED"
    | "INVOICE_TYPE_CREDIT"
    | "INVOICE_TYPE_INVOICE"
    | (string & {});
  /** The URL to download a PDF copy of the invoice. This URL is user specific and requires a valid OAuth 2.0 access token to access. The access token must be provided in an `Authorization: Bearer` HTTP header and be authorized for one of the following scopes: * `https://www.googleapis.com/auth/display-video-mediaplanning` * `https://www.googleapis.com/auth/display-video` The URL will be valid for 7 days after retrieval of this invoice object or until this invoice is retrieved again. */
  pdfUrl?: string;
  /** The ID of the original invoice being adjusted by this invoice, if applicable. May appear on the invoice PDF as `Reference invoice number`. If replaced_invoice_ids is set, this field will be empty. */
  correctedInvoiceId?: string;
  /** The ID of the payments account the invoice belongs to. Appears on the invoice PDF as `Billing Account Number`. */
  paymentsAccountId?: string;
  /** The resource name of the invoice. */
  name?: string;
  /** The currency used in the invoice in ISO 4217 format. */
  currencyCode?: string;
  /** Purchase order number associated with the invoice. */
  purchaseOrderNumber?: string;
  /** The sum of all taxes in invoice, in micros of the invoice's currency. For example, if currency_code is `USD`, then 1000000 represents one US dollar. */
  totalTaxAmountMicros?: string;
}

export const Invoice: Schema.Schema<Invoice> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      nonBudgetMicros: Schema.optional(Schema.String),
      paymentsProfileId: Schema.optional(Schema.String),
      dueDate: Schema.optional(Displayvideo_Date),
      budgetInvoiceGroupingId: Schema.optional(Schema.String),
      serviceDateRange: Schema.optional(DateRange),
      issueDate: Schema.optional(Displayvideo_Date),
      budgetSummaries: Schema.optional(Schema.Array(BudgetSummary)),
      subtotalAmountMicros: Schema.optional(Schema.String),
      totalAmountMicros: Schema.optional(Schema.String),
      replacedInvoiceIds: Schema.optional(Schema.Array(Schema.String)),
      invoiceId: Schema.optional(Schema.String),
      invoiceType: Schema.optional(Schema.String),
      pdfUrl: Schema.optional(Schema.String),
      correctedInvoiceId: Schema.optional(Schema.String),
      paymentsAccountId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      purchaseOrderNumber: Schema.optional(Schema.String),
      totalTaxAmountMicros: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Invoice" }) as any as Schema.Schema<Invoice>;

export interface Pacing {
  /** Required. The type of pacing that defines how the budget amount will be spent across the pacing_period. `PACING_TYPE_ASAP` is not compatible with pacing_period `PACING_PERIOD_FLIGHT` for insertion orders. */
  pacingType?:
    | "PACING_TYPE_UNSPECIFIED"
    | "PACING_TYPE_AHEAD"
    | "PACING_TYPE_ASAP"
    | "PACING_TYPE_EVEN"
    | (string & {});
  /** Maximum currency amount to spend every day in micros of advertiser's currency. Applicable when the budget is currency based. Must be greater than 0. For example, for 1.5 standard unit of the currency, set this field to 1500000. The value assigned will be rounded to whole billable units for the relevant currency by the following rules: any positive value less than a single billable unit will be rounded up to one billable unit and any value larger than a single billable unit will be rounded down to the nearest billable value. For example, if the currency's billable unit is 0.01, and this field is set to 10257770, it will round down to 10250000, a value of 10.25. If set to 505, it will round up to 10000, a value of 0.01. */
  dailyMaxMicros?: string;
  /** Maximum number of impressions to serve every day. Applicable when the budget is impression based. Must be greater than 0. */
  dailyMaxImpressions?: string;
  /** Required. The time period in which the pacing budget will be spent. When automatic budget allocation is enabled at the insertion order via automationType, this field is output only and defaults to `PACING_PERIOD_FLIGHT`. */
  pacingPeriod?:
    | "PACING_PERIOD_UNSPECIFIED"
    | "PACING_PERIOD_DAILY"
    | "PACING_PERIOD_FLIGHT"
    | (string & {});
}

export const Pacing: Schema.Schema<Pacing> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pacingType: Schema.optional(Schema.String),
      dailyMaxMicros: Schema.optional(Schema.String),
      dailyMaxImpressions: Schema.optional(Schema.String),
      pacingPeriod: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Pacing" }) as any as Schema.Schema<Pacing>;

export interface AssignedUserRole {
  /** Output only. The ID of the assigned user role. */
  assignedUserRoleId?: string;
  /** The ID of the advertiser that the assigend user role applies to. */
  advertiserId?: string;
  /** The ID of the partner that the assigned user role applies to. */
  partnerId?: string;
  /** Required. The user role to assign to a user for the entity. */
  userRole?:
    | "USER_ROLE_UNSPECIFIED"
    | "ADMIN"
    | "ADMIN_PARTNER_CLIENT"
    | "STANDARD"
    | "STANDARD_PLANNER"
    | "STANDARD_PLANNER_LIMITED"
    | "STANDARD_PARTNER_CLIENT"
    | "READ_ONLY"
    | "REPORTING_ONLY"
    | "LIMITED_REPORTING_ONLY"
    | "CREATIVE"
    | "CREATIVE_ADMIN"
    | (string & {});
}

export const AssignedUserRole: Schema.Schema<AssignedUserRole> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedUserRoleId: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      userRole: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AssignedUserRole",
  }) as any as Schema.Schema<AssignedUserRole>;

export interface Money {
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      units: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      nanos: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface RateDetails {
  /** The rate type. Acceptable values are `INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED`, `INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR`, and `INVENTORY_SOURCE_RATE_TYPE_CPD`. */
  inventorySourceRateType?:
    | "INVENTORY_SOURCE_RATE_TYPE_UNSPECIFIED"
    | "INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED"
    | "INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR"
    | "INVENTORY_SOURCE_RATE_TYPE_CPD"
    | "INVENTORY_SOURCE_RATE_TYPE_CPH"
    | "INVENTORY_SOURCE_RATE_TYPE_FLAT"
    | (string & {});
  /** Required for guaranteed inventory sources. The number of impressions guaranteed by the seller. */
  unitsPurchased?: string;
  /** Output only. The amount that the buyer has committed to spending on the inventory source up front. Only applicable for guaranteed inventory sources. */
  minimumSpend?: Money;
  /** The rate for the inventory source. */
  rate?: Money;
}

export const RateDetails: Schema.Schema<RateDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySourceRateType: Schema.optional(Schema.String),
      unitsPurchased: Schema.optional(Schema.String),
      minimumSpend: Schema.optional(Money),
      rate: Schema.optional(Money),
    }),
  ).annotate({
    identifier: "RateDetails",
  }) as any as Schema.Schema<RateDetails>;

export interface YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction {
  /** Optional. The labels to match with. Labels are logically OR'ed together. This field is optional and can only be set if location_matching_type is `FILTER`. */
  labels?: Array<string>;
  /** Optional. The selected location asset IDs. This field is required if location_matching_type is `SELECTED_ASSETS`. */
  locationAssetIds?: Array<string>;
  /** Optional. The business name to match with. This field is optional and can only be set if location_matching_type is `FILTER`. */
  business?: string;
}

export const YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction: Schema.Schema<YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Array(Schema.String)),
      locationAssetIds: Schema.optional(Schema.Array(Schema.String)),
      business: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction",
  }) as any as Schema.Schema<YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction>;

export interface YoutubeAssetAssociationLocationAssetFilter {
  /** Required. The matching type of this location asset filter. */
  locationMatchingType?:
    | "LOCATION_MATCHING_TYPE_UNSPECIFIED"
    | "SELECT_ALL"
    | "FILTER"
    | "SELECTED_ASSETS"
    | "DISABLED"
    | (string & {});
  /** Output only. The ID of the asset set that matches the location assets eligible for serving. */
  assetSetId?: string;
  /** Optional. The matching function that determines how the location asset filter matches location assets. This field is required and can only be set for if location_matching_type is `FILTER` or `SELECTED_ASSETS`. */
  locationMatchingFunction?: YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction;
}

export const YoutubeAssetAssociationLocationAssetFilter: Schema.Schema<YoutubeAssetAssociationLocationAssetFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationMatchingType: Schema.optional(Schema.String),
      assetSetId: Schema.optional(Schema.String),
      locationMatchingFunction: Schema.optional(
        YoutubeAssetAssociationLocationAssetFilterLocationMatchingFunction,
      ),
    }),
  ).annotate({
    identifier: "YoutubeAssetAssociationLocationAssetFilter",
  }) as any as Schema.Schema<YoutubeAssetAssociationLocationAssetFilter>;

export interface YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain {
  /** Required. ID of the affiliate location chain. */
  chainId?: string;
}

export const YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain: Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      chainId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain",
  }) as any as Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain>;

export interface YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction {
  /** Optional. The selected affiliate location chain IDs. This field is required if affiliate_location_matching_type is `SELECTED_CHAINS`. */
  chains?: Array<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain>;
}

export const YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction: Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      chains: Schema.optional(
        Schema.Array(
          YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationChain,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction",
  }) as any as Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction>;

export interface YoutubeAssetAssociationAffiliateLocationAssetFilter {
  /** Optional. The matching function that determines how the affiliate location asset filter matches affiliate location assets. This field is required and can only be set for if affiliate_location_matching_type is `SELECTED_CHAINS`. */
  affiliateLocationMatchingFunction?: YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction;
  /** Required. The matching type of this affiliate location asset filter. */
  affiliateLocationMatchingType?:
    | "AFFILIATE_LOCATION_MATCHING_TYPE_UNSPECIFIED"
    | "SELECT_ALL"
    | "SELECTED_CHAINS"
    | "DISABLED"
    | (string & {});
  /** Output only. The ID of the asset set that matches the affiliate location assets eligible for serving. */
  assetSetId?: string;
}

export const YoutubeAssetAssociationAffiliateLocationAssetFilter: Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      affiliateLocationMatchingFunction: Schema.optional(
        YoutubeAssetAssociationAffiliateLocationAssetFilterAffiliateLocationMatchingFunction,
      ),
      affiliateLocationMatchingType: Schema.optional(Schema.String),
      assetSetId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YoutubeAssetAssociationAffiliateLocationAssetFilter",
  }) as any as Schema.Schema<YoutubeAssetAssociationAffiliateLocationAssetFilter>;

export interface YoutubeAssetAssociationSitelinkAsset {
  /** Required. ID of the sitelink asset. */
  assetId?: string;
}

export const YoutubeAssetAssociationSitelinkAsset: Schema.Schema<YoutubeAssetAssociationSitelinkAsset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assetId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YoutubeAssetAssociationSitelinkAsset",
  }) as any as Schema.Schema<YoutubeAssetAssociationSitelinkAsset>;

export interface YoutubeAssetAssociationLinkedYouTubeAsset {
  /** A location asset filter. This can be set only when youtube_asset_type is `YOUTUBE_ASSET_TYPE_LOCATION`. */
  locationAssetFilter?: YoutubeAssetAssociationLocationAssetFilter;
  /** An affiliate location asset filter. This can be set only when youtube_asset_type is `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION`. */
  affiliateLocationAssetFilter?: YoutubeAssetAssociationAffiliateLocationAssetFilter;
  /** A sitelink asset. This can be set only when youtube_asset_type is `YOUTUBE_ASSET_TYPE_SITELINK`. */
  sitelinkAsset?: YoutubeAssetAssociationSitelinkAsset;
}

export const YoutubeAssetAssociationLinkedYouTubeAsset: Schema.Schema<YoutubeAssetAssociationLinkedYouTubeAsset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationAssetFilter: Schema.optional(
        YoutubeAssetAssociationLocationAssetFilter,
      ),
      affiliateLocationAssetFilter: Schema.optional(
        YoutubeAssetAssociationAffiliateLocationAssetFilter,
      ),
      sitelinkAsset: Schema.optional(YoutubeAssetAssociationSitelinkAsset),
    }),
  ).annotate({
    identifier: "YoutubeAssetAssociationLinkedYouTubeAsset",
  }) as any as Schema.Schema<YoutubeAssetAssociationLinkedYouTubeAsset>;

export interface YoutubeAssetAssociation {
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType?:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** Identifier. The resource name of the association. For line item-level associations: The name pattern is `advertisers/{advertiser_id}/lineItems/{line_item_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For ad group-level associations: The name pattern is `advertisers/{advertiser_id}/adGroups/{ad_group_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: `youtube_asset_association_id` is the ID of the asset set linked, or 0 if the location_matching_type or affiliate_location_matching_type is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: `youtube_asset_association_id` is be the ID of the sitelink asset linked. */
  name?: string;
  /** Required. The YouTube asset associated with the resource. */
  linkedYoutubeAsset?: YoutubeAssetAssociationLinkedYouTubeAsset;
}

export const YoutubeAssetAssociation: Schema.Schema<YoutubeAssetAssociation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      youtubeAssetType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      linkedYoutubeAsset: Schema.optional(
        YoutubeAssetAssociationLinkedYouTubeAsset,
      ),
    }),
  ).annotate({
    identifier: "YoutubeAssetAssociation",
  }) as any as Schema.Schema<YoutubeAssetAssociation>;

export interface ExitEvent {
  /** Required. The click through URL of the exit event. This is required when type is: * `EXIT_EVENT_TYPE_DEFAULT` * `EXIT_EVENT_TYPE_BACKUP` */
  url?: string;
  /** Required. The type of the exit event. */
  type?:
    | "EXIT_EVENT_TYPE_UNSPECIFIED"
    | "EXIT_EVENT_TYPE_DEFAULT"
    | "EXIT_EVENT_TYPE_BACKUP"
    | (string & {});
  /** Optional. The name of the click tag of the exit event. The name must be unique within one creative. Leave it empty or unset for creatives containing image assets only. */
  name?: string;
  /** Optional. The name used to identify this event in reports. Leave it empty or unset for creatives containing image assets only. */
  reportingName?: string;
}

export const ExitEvent: Schema.Schema<ExitEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      reportingName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ExitEvent" }) as any as Schema.Schema<ExitEvent>;

export interface VideoAdInventoryControl {
  /** Optional. Whether ads can serve as in-stream format. */
  allowInStream?: boolean;
  /** Optional. Whether ads can serve as shorts format. */
  allowShorts?: boolean;
  /** Optional. Whether ads can serve as in-feed format. */
  allowInFeed?: boolean;
}

export const VideoAdInventoryControl: Schema.Schema<VideoAdInventoryControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowInStream: Schema.optional(Schema.Boolean),
      allowShorts: Schema.optional(Schema.Boolean),
      allowInFeed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VideoAdInventoryControl",
  }) as any as Schema.Schema<VideoAdInventoryControl>;

export interface InventorySourceAccessorsPartnerAccessor {
  /** The ID of the partner. */
  partnerId?: string;
}

export const InventorySourceAccessorsPartnerAccessor: Schema.Schema<InventorySourceAccessorsPartnerAccessor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partnerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventorySourceAccessorsPartnerAccessor",
  }) as any as Schema.Schema<InventorySourceAccessorsPartnerAccessor>;

export interface ProximityLocationListAssignedTargetingOptionDetails {
  /** Required. ID of the proximity location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_PROXIMITY`. */
  proximityLocationListId?: string;
  /** Required. Radius expressed in the distance units set in proximity_radius_unit. This represents the size of the area around a chosen location that will be targeted. Radius should be between 1 and 500 miles or 800 kilometers. */
  proximityRadius?: number;
  /** Required. Radius distance units. */
  proximityRadiusUnit?:
    | "PROXIMITY_RADIUS_UNIT_UNSPECIFIED"
    | "PROXIMITY_RADIUS_UNIT_MILES"
    | "PROXIMITY_RADIUS_UNIT_KILOMETERS"
    | (string & {});
}

export const ProximityLocationListAssignedTargetingOptionDetails: Schema.Schema<ProximityLocationListAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      proximityLocationListId: Schema.optional(Schema.String),
      proximityRadius: Schema.optional(Schema.Number),
      proximityRadiusUnit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProximityLocationListAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ProximityLocationListAssignedTargetingOptionDetails>;

export interface Asset {
  /** Media ID of the uploaded asset. This is a unique identifier for the asset. This ID can be passed to other API calls, e.g. CreateCreative to associate the asset with a creative. The Media ID space updated on **April 5, 2023**. Update media IDs cached before **April 5, 2023** by retrieving the new media ID from associated creative resources or re-uploading the asset. */
  mediaId?: string;
  /** The asset content. For uploaded assets, the content is the serving path. */
  content?: string;
}

export const Asset: Schema.Schema<Asset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mediaId: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Asset" }) as any as Schema.Schema<Asset>;

export interface InventorySourceVideoCreativeConfig {
  /** The duration requirements for the video creatives that can be assigned to the inventory source. */
  duration?: string;
}

export const InventorySourceVideoCreativeConfig: Schema.Schema<InventorySourceVideoCreativeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventorySourceVideoCreativeConfig",
  }) as any as Schema.Schema<InventorySourceVideoCreativeConfig>;

export interface Dimensions {
  /** The height in pixels. */
  heightPixels?: number;
  /** The width in pixels. */
  widthPixels?: number;
}

export const Dimensions: Schema.Schema<Dimensions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      heightPixels: Schema.optional(Schema.Number),
      widthPixels: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Dimensions" }) as any as Schema.Schema<Dimensions>;

export interface InventorySourceDisplayCreativeConfig {
  /** The size requirements for display creatives that can be assigned to the inventory source. */
  creativeSize?: Dimensions;
}

export const InventorySourceDisplayCreativeConfig: Schema.Schema<InventorySourceDisplayCreativeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creativeSize: Schema.optional(Dimensions),
    }),
  ).annotate({
    identifier: "InventorySourceDisplayCreativeConfig",
  }) as any as Schema.Schema<InventorySourceDisplayCreativeConfig>;

export interface CreativeConfig {
  /** The configuration for video creatives. Applicable when creative_type is `CREATIVE_TYPE_VIDEO`. */
  videoCreativeConfig?: InventorySourceVideoCreativeConfig;
  /** The type of creative that can be assigned to the inventory source. Only the following types are supported: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_VIDEO` */
  creativeType?:
    | "CREATIVE_TYPE_UNSPECIFIED"
    | "CREATIVE_TYPE_STANDARD"
    | "CREATIVE_TYPE_EXPANDABLE"
    | "CREATIVE_TYPE_VIDEO"
    | "CREATIVE_TYPE_NATIVE"
    | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL"
    | "CREATIVE_TYPE_NATIVE_SITE_SQUARE"
    | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL"
    | "CREATIVE_TYPE_LIGHTBOX"
    | "CREATIVE_TYPE_NATIVE_APP_INSTALL"
    | "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE"
    | "CREATIVE_TYPE_AUDIO"
    | "CREATIVE_TYPE_PUBLISHER_HOSTED"
    | "CREATIVE_TYPE_NATIVE_VIDEO"
    | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO"
    | "CREATIVE_TYPE_ASSET_BASED_CREATIVE"
    | (string & {});
  /** The configuration for display creatives. Applicable when creative_type is `CREATIVE_TYPE_STANDARD`. */
  displayCreativeConfig?: InventorySourceDisplayCreativeConfig;
}

export const CreativeConfig: Schema.Schema<CreativeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoCreativeConfig: Schema.optional(InventorySourceVideoCreativeConfig),
      creativeType: Schema.optional(Schema.String),
      displayCreativeConfig: Schema.optional(
        InventorySourceDisplayCreativeConfig,
      ),
    }),
  ).annotate({
    identifier: "CreativeConfig",
  }) as any as Schema.Schema<CreativeConfig>;

export interface DeleteAssignedTargetingOptionsRequest {
  /** Required. The assigned targeting option IDs to delete. */
  assignedTargetingOptionIds?: Array<string>;
  /** Required. Identifies the type of this assigned targeting option. */
  targetingType?:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
}

export const DeleteAssignedTargetingOptionsRequest: Schema.Schema<DeleteAssignedTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedTargetingOptionIds: Schema.optional(Schema.Array(Schema.String)),
      targetingType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeleteAssignedTargetingOptionsRequest",
  }) as any as Schema.Schema<DeleteAssignedTargetingOptionsRequest>;

export interface InventorySourceGroupAssignedTargetingOptionDetails {
  /** Required. ID of the inventory source group. Should refer to the inventory_source_group_id field of an InventorySourceGroup resource. */
  inventorySourceGroupId?: string;
}

export const InventorySourceGroupAssignedTargetingOptionDetails: Schema.Schema<InventorySourceGroupAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySourceGroupId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventorySourceGroupAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<InventorySourceGroupAssignedTargetingOptionDetails>;

export interface AppCategoryAssignedTargetingOptionDetails {
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
  /** Output only. The display name of the app category. */
  displayName?: string;
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_APP_CATEGORY`. */
  targetingOptionId?: string;
}

export const AppCategoryAssignedTargetingOptionDetails: Schema.Schema<AppCategoryAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negative: Schema.optional(Schema.Boolean),
      displayName: Schema.optional(Schema.String),
      targetingOptionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AppCategoryAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<AppCategoryAssignedTargetingOptionDetails>;

export interface AppAssignedTargetingOptionDetails {
  /** Output only. The display name of the app. */
  displayName?: string;
  /** Required. The ID of the app. Android's Play store app uses bundle ID, for example `com.google.android.gm`. Apple's App store app ID uses 9 digit string, for example `422689480`. */
  appId?: string;
  /** Indicates the platform of the targeted app. If this field is not specified, the app platform will be assumed to be mobile (i.e., Android or iOS), and we will derive the appropriate mobile platform from the app ID. */
  appPlatform?:
    | "APP_PLATFORM_UNSPECIFIED"
    | "APP_PLATFORM_IOS"
    | "APP_PLATFORM_ANDROID"
    | "APP_PLATFORM_ROKU"
    | "APP_PLATFORM_AMAZON_FIRETV"
    | "APP_PLATFORM_PLAYSTATION"
    | "APP_PLATFORM_APPLE_TV"
    | "APP_PLATFORM_XBOX"
    | "APP_PLATFORM_SAMSUNG_TV"
    | "APP_PLATFORM_ANDROID_TV"
    | "APP_PLATFORM_GENERIC_CTV"
    | "APP_PLATFORM_LG_TV"
    | "APP_PLATFORM_VIZIO_TV"
    | "APP_PLATFORM_VIDAA"
    | (string & {});
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const AppAssignedTargetingOptionDetails: Schema.Schema<AppAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      appId: Schema.optional(Schema.String),
      appPlatform: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AppAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<AppAssignedTargetingOptionDetails>;

export interface VideoPlayerSizeAssignedTargetingOptionDetails {
  /** Required. The video player size. */
  videoPlayerSize?:
    | "VIDEO_PLAYER_SIZE_UNSPECIFIED"
    | "VIDEO_PLAYER_SIZE_SMALL"
    | "VIDEO_PLAYER_SIZE_LARGE"
    | "VIDEO_PLAYER_SIZE_HD"
    | "VIDEO_PLAYER_SIZE_UNKNOWN"
    | (string & {});
}

export const VideoPlayerSizeAssignedTargetingOptionDetails: Schema.Schema<VideoPlayerSizeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoPlayerSize: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoPlayerSizeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<VideoPlayerSizeAssignedTargetingOptionDetails>;

export interface SensitiveCategoryAssignedTargetingOptionDetails {
  /** Required. An enum for the DV360 Sensitive category content classified to be EXCLUDED. */
  excludedSensitiveCategory?:
    | "SENSITIVE_CATEGORY_UNSPECIFIED"
    | "SENSITIVE_CATEGORY_ADULT"
    | "SENSITIVE_CATEGORY_DEROGATORY"
    | "SENSITIVE_CATEGORY_DOWNLOADS_SHARING"
    | "SENSITIVE_CATEGORY_WEAPONS"
    | "SENSITIVE_CATEGORY_GAMBLING"
    | "SENSITIVE_CATEGORY_VIOLENCE"
    | "SENSITIVE_CATEGORY_SUGGESTIVE"
    | "SENSITIVE_CATEGORY_PROFANITY"
    | "SENSITIVE_CATEGORY_ALCOHOL"
    | "SENSITIVE_CATEGORY_DRUGS"
    | "SENSITIVE_CATEGORY_TOBACCO"
    | "SENSITIVE_CATEGORY_POLITICS"
    | "SENSITIVE_CATEGORY_RELIGION"
    | "SENSITIVE_CATEGORY_TRAGEDY"
    | "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS"
    | "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES"
    | "SENSITIVE_CATEGORY_SHOCKING"
    | "SENSITIVE_CATEGORY_EMBEDDED_VIDEO"
    | "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO"
    | (string & {});
}

export const SensitiveCategoryAssignedTargetingOptionDetails: Schema.Schema<SensitiveCategoryAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      excludedSensitiveCategory: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SensitiveCategoryAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<SensitiveCategoryAssignedTargetingOptionDetails>;

export interface ContentThemeAssignedTargetingOptionDetails {
  /** Required. ID of the content theme to be EXCLUDED. */
  excludedTargetingOptionId?: string;
  /** Output only. An enum for the DV360 content theme classifier. */
  contentTheme?:
    | "CONTENT_THEME_UNSPECIFIED"
    | "CONTENT_THEME_FIGHTING_VIDEO_GAMES"
    | "CONTENT_THEME_MATURE_GAMES"
    | "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES"
    | "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES"
    | "CONTENT_THEME_POLITICS"
    | "CONTENT_THEME_RECENT_NEWS"
    | "CONTENT_THEME_RELIGION"
    | "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT"
    | "CONTENT_THEME_UNPLEASANT_NEWS"
    | (string & {});
  /** Required. An enum for the DV360 content theme classified to be EXCLUDED. */
  excludedContentTheme?:
    | "CONTENT_THEME_UNSPECIFIED"
    | "CONTENT_THEME_FIGHTING_VIDEO_GAMES"
    | "CONTENT_THEME_MATURE_GAMES"
    | "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES"
    | "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES"
    | "CONTENT_THEME_POLITICS"
    | "CONTENT_THEME_RECENT_NEWS"
    | "CONTENT_THEME_RELIGION"
    | "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT"
    | "CONTENT_THEME_UNPLEASANT_NEWS"
    | (string & {});
}

export const ContentThemeAssignedTargetingOptionDetails: Schema.Schema<ContentThemeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      excludedTargetingOptionId: Schema.optional(Schema.String),
      contentTheme: Schema.optional(Schema.String),
      excludedContentTheme: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentThemeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ContentThemeAssignedTargetingOptionDetails>;

export interface CombinedAudienceTargetingSetting {
  /** Required. Combined audience id of combined audience targeting setting. This id is combined_audience_id. */
  combinedAudienceId?: string;
}

export const CombinedAudienceTargetingSetting: Schema.Schema<CombinedAudienceTargetingSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      combinedAudienceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CombinedAudienceTargetingSetting",
  }) as any as Schema.Schema<CombinedAudienceTargetingSetting>;

export interface CombinedAudienceGroup {
  /** Required. All combined audience targeting settings in combined audience group. Repeated settings with the same id will be ignored. The number of combined audience settings should be no more than five, error will be thrown otherwise. */
  settings?: Array<CombinedAudienceTargetingSetting>;
}

export const CombinedAudienceGroup: Schema.Schema<CombinedAudienceGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      settings: Schema.optional(Schema.Array(CombinedAudienceTargetingSetting)),
    }),
  ).annotate({
    identifier: "CombinedAudienceGroup",
  }) as any as Schema.Schema<CombinedAudienceGroup>;

export interface FirstPartyAndPartnerAudienceTargetingSetting {
  /** Required. First party and partner audience id of the first party and partner audience targeting setting. This id is first_party_and_partner_audience_id. */
  firstPartyAndPartnerAudienceId?: string;
  /** Required. The recency of the first party and partner audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used. */
  recency?:
    | "RECENCY_NO_LIMIT"
    | "RECENCY_1_MINUTE"
    | "RECENCY_5_MINUTES"
    | "RECENCY_10_MINUTES"
    | "RECENCY_15_MINUTES"
    | "RECENCY_30_MINUTES"
    | "RECENCY_1_HOUR"
    | "RECENCY_2_HOURS"
    | "RECENCY_3_HOURS"
    | "RECENCY_6_HOURS"
    | "RECENCY_12_HOURS"
    | "RECENCY_1_DAY"
    | "RECENCY_2_DAYS"
    | "RECENCY_3_DAYS"
    | "RECENCY_5_DAYS"
    | "RECENCY_7_DAYS"
    | "RECENCY_10_DAYS"
    | "RECENCY_14_DAYS"
    | "RECENCY_15_DAYS"
    | "RECENCY_21_DAYS"
    | "RECENCY_28_DAYS"
    | "RECENCY_30_DAYS"
    | "RECENCY_40_DAYS"
    | "RECENCY_45_DAYS"
    | "RECENCY_60_DAYS"
    | "RECENCY_90_DAYS"
    | "RECENCY_120_DAYS"
    | "RECENCY_180_DAYS"
    | "RECENCY_270_DAYS"
    | "RECENCY_365_DAYS"
    | (string & {});
}

export const FirstPartyAndPartnerAudienceTargetingSetting: Schema.Schema<FirstPartyAndPartnerAudienceTargetingSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      firstPartyAndPartnerAudienceId: Schema.optional(Schema.String),
      recency: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FirstPartyAndPartnerAudienceTargetingSetting",
  }) as any as Schema.Schema<FirstPartyAndPartnerAudienceTargetingSetting>;

export interface FirstPartyAndPartnerAudienceGroup {
  /** Required. All first party and partner audience targeting settings in first party and partner audience group. Repeated settings with the same id are not allowed. */
  settings?: Array<FirstPartyAndPartnerAudienceTargetingSetting>;
}

export const FirstPartyAndPartnerAudienceGroup: Schema.Schema<FirstPartyAndPartnerAudienceGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      settings: Schema.optional(
        Schema.Array(FirstPartyAndPartnerAudienceTargetingSetting),
      ),
    }),
  ).annotate({
    identifier: "FirstPartyAndPartnerAudienceGroup",
  }) as any as Schema.Schema<FirstPartyAndPartnerAudienceGroup>;

export interface GoogleAudienceTargetingSetting {
  /** Required. Google audience id of the Google audience targeting setting. This id is google_audience_id. */
  googleAudienceId?: string;
}

export const GoogleAudienceTargetingSetting: Schema.Schema<GoogleAudienceTargetingSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      googleAudienceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAudienceTargetingSetting",
  }) as any as Schema.Schema<GoogleAudienceTargetingSetting>;

export interface GoogleAudienceGroup {
  /** Required. All Google audience targeting settings in Google audience group. Repeated settings with the same id will be ignored. */
  settings?: Array<GoogleAudienceTargetingSetting>;
}

export const GoogleAudienceGroup: Schema.Schema<GoogleAudienceGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      settings: Schema.optional(Schema.Array(GoogleAudienceTargetingSetting)),
    }),
  ).annotate({
    identifier: "GoogleAudienceGroup",
  }) as any as Schema.Schema<GoogleAudienceGroup>;

export interface CustomListTargetingSetting {
  /** Required. Custom id of custom list targeting setting. This id is custom_list_id. */
  customListId?: string;
}

export const CustomListTargetingSetting: Schema.Schema<CustomListTargetingSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customListId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomListTargetingSetting",
  }) as any as Schema.Schema<CustomListTargetingSetting>;

export interface CustomListGroup {
  /** Required. All custom list targeting settings in custom list group. Repeated settings with the same id will be ignored. */
  settings?: Array<CustomListTargetingSetting>;
}

export const CustomListGroup: Schema.Schema<CustomListGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      settings: Schema.optional(Schema.Array(CustomListTargetingSetting)),
    }),
  ).annotate({
    identifier: "CustomListGroup",
  }) as any as Schema.Schema<CustomListGroup>;

export interface AudienceGroupAssignedTargetingOptionDetails {
  /** Optional. The combined audience ids of the included combined audience group. Contains combined audience ids only. */
  includedCombinedAudienceGroup?: CombinedAudienceGroup;
  /** Optional. The first party and partner audience ids and recencies of the excluded first party and partner audience group. Used for negative targeting. The COMPLEMENT of the UNION of this group and other excluded audience groups is used as an INTERSECTION to any positive audience targeting. All items are logically ‘OR’ of each other. */
  excludedFirstPartyAndPartnerAudienceGroup?: FirstPartyAndPartnerAudienceGroup;
  /** Optional. The first party and partner audience ids and recencies of included first party and partner audience groups. Each first party and partner audience group contains first party and partner audience ids only. The relation between each first party and partner audience group is INTERSECTION, and the result is UNION'ed with other audience groups. Repeated groups with the same settings will be ignored. */
  includedFirstPartyAndPartnerAudienceGroups?: Array<FirstPartyAndPartnerAudienceGroup>;
  /** Optional. The Google audience ids of the included Google audience group. Contains Google audience ids only. */
  includedGoogleAudienceGroup?: GoogleAudienceGroup;
  /** Optional. The custom list ids of the included custom list group. Contains custom list ids only. */
  includedCustomListGroup?: CustomListGroup;
  /** Optional. The Google audience ids of the excluded Google audience group. Used for negative targeting. The COMPLEMENT of the UNION of this group and other excluded audience groups is used as an INTERSECTION to any positive audience targeting. Only contains Affinity, In-market and Installed-apps type Google audiences. All items are logically ‘OR’ of each other. */
  excludedGoogleAudienceGroup?: GoogleAudienceGroup;
}

export const AudienceGroupAssignedTargetingOptionDetails: Schema.Schema<AudienceGroupAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      includedCombinedAudienceGroup: Schema.optional(CombinedAudienceGroup),
      excludedFirstPartyAndPartnerAudienceGroup: Schema.optional(
        FirstPartyAndPartnerAudienceGroup,
      ),
      includedFirstPartyAndPartnerAudienceGroups: Schema.optional(
        Schema.Array(FirstPartyAndPartnerAudienceGroup),
      ),
      includedGoogleAudienceGroup: Schema.optional(GoogleAudienceGroup),
      includedCustomListGroup: Schema.optional(CustomListGroup),
      excludedGoogleAudienceGroup: Schema.optional(GoogleAudienceGroup),
    }),
  ).annotate({
    identifier: "AudienceGroupAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<AudienceGroupAssignedTargetingOptionDetails>;

export interface ContentStreamTypeAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_STREAM_TYPE`. */
  targetingOptionId?: string;
  /** Output only. The content stream type. */
  contentStreamType?:
    | "CONTENT_STREAM_TYPE_UNSPECIFIED"
    | "CONTENT_LIVE_STREAM"
    | "CONTENT_ON_DEMAND"
    | (string & {});
}

export const ContentStreamTypeAssignedTargetingOptionDetails: Schema.Schema<ContentStreamTypeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      contentStreamType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentStreamTypeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ContentStreamTypeAssignedTargetingOptionDetails>;

export interface YoutubeVideoAssignedTargetingOptionDetails {
  /** YouTube video id as it appears on the YouTube watch page. */
  videoId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const YoutubeVideoAssignedTargetingOptionDetails: Schema.Schema<YoutubeVideoAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoId: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "YoutubeVideoAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<YoutubeVideoAssignedTargetingOptionDetails>;

export interface GeoRegionAssignedTargetingOptionDetails {
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_GEO_REGION`. */
  targetingOptionId?: string;
  /** Output only. The type of geographic region targeting. */
  geoRegionType?:
    | "GEO_REGION_TYPE_UNKNOWN"
    | "GEO_REGION_TYPE_OTHER"
    | "GEO_REGION_TYPE_COUNTRY"
    | "GEO_REGION_TYPE_REGION"
    | "GEO_REGION_TYPE_TERRITORY"
    | "GEO_REGION_TYPE_PROVINCE"
    | "GEO_REGION_TYPE_STATE"
    | "GEO_REGION_TYPE_PREFECTURE"
    | "GEO_REGION_TYPE_GOVERNORATE"
    | "GEO_REGION_TYPE_CANTON"
    | "GEO_REGION_TYPE_UNION_TERRITORY"
    | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY"
    | "GEO_REGION_TYPE_DMA_REGION"
    | "GEO_REGION_TYPE_METRO"
    | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT"
    | "GEO_REGION_TYPE_COUNTY"
    | "GEO_REGION_TYPE_MUNICIPALITY"
    | "GEO_REGION_TYPE_CITY"
    | "GEO_REGION_TYPE_POSTAL_CODE"
    | "GEO_REGION_TYPE_DEPARTMENT"
    | "GEO_REGION_TYPE_AIRPORT"
    | "GEO_REGION_TYPE_TV_REGION"
    | "GEO_REGION_TYPE_OKRUG"
    | "GEO_REGION_TYPE_BOROUGH"
    | "GEO_REGION_TYPE_CITY_REGION"
    | "GEO_REGION_TYPE_ARRONDISSEMENT"
    | "GEO_REGION_TYPE_NEIGHBORHOOD"
    | "GEO_REGION_TYPE_UNIVERSITY"
    | "GEO_REGION_TYPE_DISTRICT"
    | "GEO_REGION_TYPE_NATIONAL_PARK"
    | "GEO_REGION_TYPE_BARRIO"
    | "GEO_REGION_TYPE_SUB_WARD"
    | "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT"
    | "GEO_REGION_TYPE_SUB_DISTRICT"
    | "GEO_REGION_TYPE_QUARTER"
    | "GEO_REGION_TYPE_DIVISION"
    | "GEO_REGION_TYPE_COMMUNE"
    | "GEO_REGION_TYPE_COLLOQUIAL_AREA"
    | (string & {});
  /** Output only. The display name of the geographic region (e.g., "Ontario, Canada"). */
  displayName?: string;
}

export const GeoRegionAssignedTargetingOptionDetails: Schema.Schema<GeoRegionAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negative: Schema.optional(Schema.Boolean),
      targetingOptionId: Schema.optional(Schema.String),
      geoRegionType: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GeoRegionAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<GeoRegionAssignedTargetingOptionDetails>;

export interface NativeContentPositionAssignedTargetingOptionDetails {
  /** Required. The content position. */
  contentPosition?:
    | "NATIVE_CONTENT_POSITION_UNSPECIFIED"
    | "NATIVE_CONTENT_POSITION_UNKNOWN"
    | "NATIVE_CONTENT_POSITION_IN_ARTICLE"
    | "NATIVE_CONTENT_POSITION_IN_FEED"
    | "NATIVE_CONTENT_POSITION_PERIPHERAL"
    | "NATIVE_CONTENT_POSITION_RECOMMENDATION"
    | (string & {});
}

export const NativeContentPositionAssignedTargetingOptionDetails: Schema.Schema<NativeContentPositionAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NativeContentPositionAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<NativeContentPositionAssignedTargetingOptionDetails>;

export interface DeviceTypeAssignedTargetingOptionDetails {
  /** Output only. Bid multiplier allows you to show your ads more or less frequently based on the device type. It will apply a multiplier on the original bid price. When this field is 0, it indicates this field is not applicable instead of multiplying 0 on the original bid price. For example, if the bid price without multiplier is $10.0 and the multiplier is 1.5 for Tablet, the resulting bid price for Tablet will be $15.0. Only applicable to YouTube and Partners line items. */
  youtubeAndPartnersBidMultiplier?: number;
  /** Required. The display name of the device type. */
  deviceType?:
    | "DEVICE_TYPE_UNSPECIFIED"
    | "DEVICE_TYPE_COMPUTER"
    | "DEVICE_TYPE_CONNECTED_TV"
    | "DEVICE_TYPE_SMART_PHONE"
    | "DEVICE_TYPE_TABLET"
    | "DEVICE_TYPE_CONNECTED_DEVICE"
    | (string & {});
}

export const DeviceTypeAssignedTargetingOptionDetails: Schema.Schema<DeviceTypeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      youtubeAndPartnersBidMultiplier: Schema.optional(Schema.Number),
      deviceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeviceTypeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<DeviceTypeAssignedTargetingOptionDetails>;

export interface UserRewardedContentAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`. */
  targetingOptionId?: string;
  /** Output only. User rewarded content status for video ads. */
  userRewardedContent?:
    | "USER_REWARDED_CONTENT_UNSPECIFIED"
    | "USER_REWARDED_CONTENT_USER_REWARDED"
    | "USER_REWARDED_CONTENT_NOT_USER_REWARDED"
    | (string & {});
}

export const UserRewardedContentAssignedTargetingOptionDetails: Schema.Schema<UserRewardedContentAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      userRewardedContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UserRewardedContentAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<UserRewardedContentAssignedTargetingOptionDetails>;

export interface ChannelAssignedTargetingOptionDetails {
  /** Required. ID of the channel. Should refer to the channel ID field on a [Partner-owned channel](partners.channels#Channel.FIELDS.channel_id) or [advertiser-owned channel](advertisers.channels#Channel.FIELDS.channel_id) resource. */
  channelId?: string;
  /** Indicates if this option is being negatively targeted. For advertiser level assigned targeting option, this field must be true. */
  negative?: boolean;
}

export const ChannelAssignedTargetingOptionDetails: Schema.Schema<ChannelAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelId: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ChannelAssignedTargetingOptionDetails>;

export interface OmidAssignedTargetingOptionDetails {
  /** Required. The type of Open Measurement enabled inventory. */
  omid?: "OMID_UNSPECIFIED" | "OMID_FOR_MOBILE_DISPLAY_ADS" | (string & {});
}

export const OmidAssignedTargetingOptionDetails: Schema.Schema<OmidAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      omid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmidAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<OmidAssignedTargetingOptionDetails>;

export interface Adloox {
  /** Optional. IAB viewability threshold for video ads. */
  videoIabViewability?:
    | "VIDEO_IAB_VIEWABILITY_UNSPECIFIED"
    | "VIDEO_IAB_VIEWABILITY_10"
    | "VIDEO_IAB_VIEWABILITY_20"
    | "VIDEO_IAB_VIEWABILITY_35"
    | "VIDEO_IAB_VIEWABILITY_50"
    | "VIDEO_IAB_VIEWABILITY_75"
    | (string & {});
  /** Optional. Misinformation Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  misinformationContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Terrorism Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  terrorismContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Spam or Harmful Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  spamHarmfulContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Debated Sensitive Social Issue Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  debatedSensitiveSocialIssueContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Illegal Drugs/Alcohol Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  illegalDrugsTobaccoEcigarettesVapingAlcoholContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Scope3 categories to exclude. */
  excludedAdlooxCategories?: Array<
    | "ADLOOX_UNSPECIFIED"
    | "ADULT_CONTENT_HARD"
    | "ADULT_CONTENT_SOFT"
    | "ILLEGAL_CONTENT"
    | "BORDERLINE_CONTENT"
    | "DISCRIMINATORY_CONTENT"
    | "VIOLENT_CONTENT_WEAPONS"
    | "LOW_VIEWABILITY_DOMAINS"
    | "FRAUD"
    | (string & {})
  >;
  /** Optional. Arms and Ammunition Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  armsAmmunitionContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Crime and Harmful Acts Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Death, Injury, or Military Conflict Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  deathInjuryMilitaryConflictContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Adult and Explicit Sexual Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  adultExplicitSexualContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Obscenity and Profanity Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  obscenityProfanityContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Hate Speech and Acts of Aggression Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  hateSpeechActsAggressionContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. Scope3's fraud IVT MFA categories to exclude. */
  excludedFraudIvtMfaCategories?: Array<
    "FRAUD_IVT_MFA_CATEGORY_UNSPECIFIED" | "FRAUD_IVT_MFA" | (string & {})
  >;
  /** Optional. Online Piracy Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude. */
  onlinePiracyContent?:
    | "GARM_RISK_EXCLUSION_UNSPECIFIED"
    | "GARM_RISK_EXCLUSION_FLOOR"
    | "GARM_RISK_EXCLUSION_HIGH"
    | "GARM_RISK_EXCLUSION_MEDIUM"
    | "GARM_RISK_EXCLUSION_LOW"
    | (string & {});
  /** Optional. IAB viewability threshold for display ads. */
  displayIabViewability?:
    | "DISPLAY_IAB_VIEWABILITY_UNSPECIFIED"
    | "DISPLAY_IAB_VIEWABILITY_10"
    | "DISPLAY_IAB_VIEWABILITY_20"
    | "DISPLAY_IAB_VIEWABILITY_35"
    | "DISPLAY_IAB_VIEWABILITY_50"
    | "DISPLAY_IAB_VIEWABILITY_75"
    | (string & {});
}

export const Adloox: Schema.Schema<Adloox> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoIabViewability: Schema.optional(Schema.String),
      misinformationContent: Schema.optional(Schema.String),
      terrorismContent: Schema.optional(Schema.String),
      spamHarmfulContent: Schema.optional(Schema.String),
      debatedSensitiveSocialIssueContent: Schema.optional(Schema.String),
      illegalDrugsTobaccoEcigarettesVapingAlcoholContent: Schema.optional(
        Schema.String,
      ),
      excludedAdlooxCategories: Schema.optional(Schema.Array(Schema.String)),
      armsAmmunitionContent: Schema.optional(Schema.String),
      crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent:
        Schema.optional(Schema.String),
      deathInjuryMilitaryConflictContent: Schema.optional(Schema.String),
      adultExplicitSexualContent: Schema.optional(Schema.String),
      obscenityProfanityContent: Schema.optional(Schema.String),
      hateSpeechActsAggressionContent: Schema.optional(Schema.String),
      excludedFraudIvtMfaCategories: Schema.optional(
        Schema.Array(Schema.String),
      ),
      onlinePiracyContent: Schema.optional(Schema.String),
      displayIabViewability: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Adloox" }) as any as Schema.Schema<Adloox>;

export interface DoubleVerifyBrandSafetyCategories {
  /** Unknown or unrateable. */
  avoidUnknownBrandSafetyCategory?: boolean;
  /** Brand safety high severity avoidance categories. */
  avoidedHighSeverityCategories?: Array<
    | "HIGHER_SEVERITY_UNSPECIFIED"
    | "ADULT_CONTENT_PORNOGRAPHY"
    | "COPYRIGHT_INFRINGEMENT"
    | "SUBSTANCE_ABUSE"
    | "GRAPHIC_VIOLENCE_WEAPONS"
    | "HATE_PROFANITY"
    | "CRIMINAL_SKILLS"
    | "NUISANCE_INCENTIVIZED_MALWARE_CLUTTER"
    | (string & {})
  >;
  /** Brand safety medium severity avoidance categories. */
  avoidedMediumSeverityCategories?: Array<
    | "MEDIUM_SEVERITY_UNSPECIFIED"
    | "AD_SERVERS"
    | "ADULT_CONTENT_SWIMSUIT"
    | "ALTERNATIVE_LIFESTYLES"
    | "CELEBRITY_GOSSIP"
    | "GAMBLING"
    | "OCCULT"
    | "SEX_EDUCATION"
    | "DISASTER_AVIATION"
    | "DISASTER_MAN_MADE"
    | "DISASTER_NATURAL"
    | "DISASTER_TERRORIST_EVENTS"
    | "DISASTER_VEHICLE"
    | "ALCOHOL"
    | "SMOKING"
    | "NEGATIVE_NEWS_FINANCIAL"
    | "NON_ENGLISH"
    | "PARKING_PAGE"
    | "UNMODERATED_UGC"
    | "INFLAMMATORY_POLITICS_AND_NEWS"
    | "NEGATIVE_NEWS_PHARMACEUTICAL"
    | (string & {})
  >;
}

export const DoubleVerifyBrandSafetyCategories: Schema.Schema<DoubleVerifyBrandSafetyCategories> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      avoidUnknownBrandSafetyCategory: Schema.optional(Schema.Boolean),
      avoidedHighSeverityCategories: Schema.optional(
        Schema.Array(Schema.String),
      ),
      avoidedMediumSeverityCategories: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "DoubleVerifyBrandSafetyCategories",
  }) as any as Schema.Schema<DoubleVerifyBrandSafetyCategories>;

export interface DoubleVerifyDisplayViewability {
  /** Target web and app inventory to maximize IAB viewable rate. */
  iab?:
    | "IAB_VIEWED_RATE_UNSPECIFIED"
    | "IAB_VIEWED_RATE_80_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_75_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_70_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_65_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_60_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_55_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_50_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_40_PERCENT_HIGHER"
    | "IAB_VIEWED_RATE_30_PERCENT_HIGHER"
    | (string & {});
  /** Target web and app inventory to maximize 100% viewable duration. */
  viewableDuring?:
    | "AVERAGE_VIEW_DURATION_UNSPECIFIED"
    | "AVERAGE_VIEW_DURATION_5_SEC"
    | "AVERAGE_VIEW_DURATION_10_SEC"
    | "AVERAGE_VIEW_DURATION_15_SEC"
    | (string & {});
}

export const DoubleVerifyDisplayViewability: Schema.Schema<DoubleVerifyDisplayViewability> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      iab: Schema.optional(Schema.String),
      viewableDuring: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DoubleVerifyDisplayViewability",
  }) as any as Schema.Schema<DoubleVerifyDisplayViewability>;

export interface DoubleVerifyVideoViewability {
  /** Target web inventory to maximize fully viewable rate. */
  videoViewableRate?:
    | "VIDEO_VIEWABLE_RATE_UNSPECIFIED"
    | "VIEWED_PERFORMANCE_40_PERCENT_HIGHER"
    | "VIEWED_PERFORMANCE_35_PERCENT_HIGHER"
    | "VIEWED_PERFORMANCE_30_PERCENT_HIGHER"
    | "VIEWED_PERFORMANCE_25_PERCENT_HIGHER"
    | "VIEWED_PERFORMANCE_20_PERCENT_HIGHER"
    | "VIEWED_PERFORMANCE_10_PERCENT_HIGHER"
    | (string & {});
  /** Target inventory to maximize impressions with 400x300 or greater player size. */
  playerImpressionRate?:
    | "PLAYER_SIZE_400X300_UNSPECIFIED"
    | "PLAYER_SIZE_400X300_95"
    | "PLAYER_SIZE_400X300_70"
    | "PLAYER_SIZE_400X300_25"
    | "PLAYER_SIZE_400X300_5"
    | (string & {});
  /** Target web inventory to maximize IAB viewable rate. */
  videoIab?:
    | "VIDEO_IAB_UNSPECIFIED"
    | "IAB_VIEWABILITY_80_PERCENT_HIGHER"
    | "IAB_VIEWABILITY_75_PERCENT_HIGHER"
    | "IAB_VIEWABILITY_70_PERCENT_HIGHER"
    | "IAB_VIEWABILITY_65_PERCENT_HIHGER"
    | "IAB_VIEWABILITY_60_PERCENT_HIGHER"
    | "IAB_VIEWABILITY_55_PERCENT_HIHGER"
    | "IAB_VIEWABILITY_50_PERCENT_HIGHER"
    | "IAB_VIEWABILITY_40_PERCENT_HIHGER"
    | "IAB_VIEWABILITY_30_PERCENT_HIHGER"
    | (string & {});
}

export const DoubleVerifyVideoViewability: Schema.Schema<DoubleVerifyVideoViewability> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoViewableRate: Schema.optional(Schema.String),
      playerImpressionRate: Schema.optional(Schema.String),
      videoIab: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DoubleVerifyVideoViewability",
  }) as any as Schema.Schema<DoubleVerifyVideoViewability>;

export interface DoubleVerifyAppStarRating {
  /** Avoid bidding on apps with the star ratings. */
  avoidedStarRating?:
    | "APP_STAR_RATE_UNSPECIFIED"
    | "APP_STAR_RATE_1_POINT_5_LESS"
    | "APP_STAR_RATE_2_LESS"
    | "APP_STAR_RATE_2_POINT_5_LESS"
    | "APP_STAR_RATE_3_LESS"
    | "APP_STAR_RATE_3_POINT_5_LESS"
    | "APP_STAR_RATE_4_LESS"
    | "APP_STAR_RATE_4_POINT_5_LESS"
    | (string & {});
  /** Avoid bidding on apps with insufficient star ratings. */
  avoidInsufficientStarRating?: boolean;
}

export const DoubleVerifyAppStarRating: Schema.Schema<DoubleVerifyAppStarRating> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      avoidedStarRating: Schema.optional(Schema.String),
      avoidInsufficientStarRating: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DoubleVerifyAppStarRating",
  }) as any as Schema.Schema<DoubleVerifyAppStarRating>;

export interface DoubleVerifyFraudInvalidTraffic {
  /** Avoid Sites and Apps with historical Fraud & IVT. */
  avoidedFraudOption?:
    | "FRAUD_UNSPECIFIED"
    | "AD_IMPRESSION_FRAUD_100"
    | "AD_IMPRESSION_FRAUD_50"
    | "AD_IMPRESSION_FRAUD_25"
    | "AD_IMPRESSION_FRAUD_10"
    | "AD_IMPRESSION_FRAUD_8"
    | "AD_IMPRESSION_FRAUD_6"
    | "AD_IMPRESSION_FRAUD_4"
    | "AD_IMPRESSION_FRAUD_2"
    | (string & {});
  /** Insufficient Historical Fraud & IVT Stats. */
  avoidInsufficientOption?: boolean;
}

export const DoubleVerifyFraudInvalidTraffic: Schema.Schema<DoubleVerifyFraudInvalidTraffic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      avoidedFraudOption: Schema.optional(Schema.String),
      avoidInsufficientOption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DoubleVerifyFraudInvalidTraffic",
  }) as any as Schema.Schema<DoubleVerifyFraudInvalidTraffic>;

export interface DoubleVerify {
  /** The custom segment ID provided by DoubleVerify. The ID must start with "51" and consist of eight digits. Custom segment ID cannot be specified along with any of the following fields: * brand_safety_categories * avoided_age_ratings * app_star_rating * fraud_invalid_traffic */
  customSegmentId?: string;
  /** DV Brand Safety Controls. */
  brandSafetyCategories?: DoubleVerifyBrandSafetyCategories;
  /** Display viewability settings (applicable to display line items only). */
  displayViewability?: DoubleVerifyDisplayViewability;
  /** Video viewability settings (applicable to video line items only). */
  videoViewability?: DoubleVerifyVideoViewability;
  /** Avoid bidding on apps with the age rating. */
  avoidedAgeRatings?: Array<
    | "AGE_RATING_UNSPECIFIED"
    | "APP_AGE_RATE_UNKNOWN"
    | "APP_AGE_RATE_4_PLUS"
    | "APP_AGE_RATE_9_PLUS"
    | "APP_AGE_RATE_12_PLUS"
    | "APP_AGE_RATE_17_PLUS"
    | "APP_AGE_RATE_18_PLUS"
    | (string & {})
  >;
  /** Avoid bidding on apps with the star ratings. */
  appStarRating?: DoubleVerifyAppStarRating;
  /** Avoid Sites and Apps with historical Fraud & IVT Rates. */
  fraudInvalidTraffic?: DoubleVerifyFraudInvalidTraffic;
}

export const DoubleVerify: Schema.Schema<DoubleVerify> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customSegmentId: Schema.optional(Schema.String),
      brandSafetyCategories: Schema.optional(DoubleVerifyBrandSafetyCategories),
      displayViewability: Schema.optional(DoubleVerifyDisplayViewability),
      videoViewability: Schema.optional(DoubleVerifyVideoViewability),
      avoidedAgeRatings: Schema.optional(Schema.Array(Schema.String)),
      appStarRating: Schema.optional(DoubleVerifyAppStarRating),
      fraudInvalidTraffic: Schema.optional(DoubleVerifyFraudInvalidTraffic),
    }),
  ).annotate({
    identifier: "DoubleVerify",
  }) as any as Schema.Schema<DoubleVerify>;

export interface IntegralAdScience {
  /** Brand Safety - **Unrateable**. */
  excludeUnrateable?: boolean;
  /** Brand Safety - **Gambling**. */
  excludedGamblingRisk?:
    | "GAMBLING_UNSPECIFIED"
    | "GAMBLING_HR"
    | "GAMBLING_HMR"
    | (string & {});
  /** Brand Safety - **Illegal downloads**. */
  excludedIllegalDownloadsRisk?:
    | "ILLEGAL_DOWNLOADS_UNSPECIFIED"
    | "ILLEGAL_DOWNLOADS_HR"
    | "ILLEGAL_DOWNLOADS_HMR"
    | (string & {});
  /** Brand Safety - **Drugs**. */
  excludedDrugsRisk?:
    | "DRUGS_UNSPECIFIED"
    | "DRUGS_HR"
    | "DRUGS_HMR"
    | (string & {});
  /** Optional. The quality sync custom segment ID provided by Integral Ad Science. The ID must be between `3000000` and `4999999`, inclusive. */
  qualitySyncCustomSegmentId?: Array<string>;
  /** Brand Safety - **Hate speech**. */
  excludedHateSpeechRisk?:
    | "HATE_SPEECH_UNSPECIFIED"
    | "HATE_SPEECH_HR"
    | "HATE_SPEECH_HMR"
    | (string & {});
  /** Brand Safety - **Alcohol**. */
  excludedAlcoholRisk?:
    | "ALCOHOL_UNSPECIFIED"
    | "ALCOHOL_HR"
    | "ALCOHOL_HMR"
    | (string & {});
  /** Ad Fraud settings. */
  excludedAdFraudRisk?:
    | "SUSPICIOUS_ACTIVITY_UNSPECIFIED"
    | "SUSPICIOUS_ACTIVITY_HR"
    | "SUSPICIOUS_ACTIVITY_HMR"
    | "SUSPICIOUS_ACTIVITY_FD"
    | (string & {});
  /** Brand Safety - **Adult content**. */
  excludedAdultRisk?:
    | "ADULT_UNSPECIFIED"
    | "ADULT_HR"
    | "ADULT_HMR"
    | (string & {});
  /** The custom segment ID provided by Integral Ad Science. The ID must be between `1000001` and `1999999` or `3000001` and `3999999`, inclusive. */
  customSegmentId?: Array<string>;
  /** Brand Safety - **Offensive language**. */
  excludedOffensiveLanguageRisk?:
    | "OFFENSIVE_LANGUAGE_UNSPECIFIED"
    | "OFFENSIVE_LANGUAGE_HR"
    | "OFFENSIVE_LANGUAGE_HMR"
    | (string & {});
  /** Brand Safety - **Violence**. */
  excludedViolenceRisk?:
    | "VIOLENCE_UNSPECIFIED"
    | "VIOLENCE_HR"
    | "VIOLENCE_HMR"
    | (string & {});
  /** True advertising quality (applicable to Display line items only). */
  traqScoreOption?:
    | "TRAQ_UNSPECIFIED"
    | "TRAQ_250"
    | "TRAQ_500"
    | "TRAQ_600"
    | "TRAQ_700"
    | "TRAQ_750"
    | "TRAQ_875"
    | "TRAQ_1000"
    | (string & {});
  /** Display Viewability section (applicable to display line items only). */
  displayViewability?:
    | "PERFORMANCE_VIEWABILITY_UNSPECIFIED"
    | "PERFORMANCE_VIEWABILITY_40"
    | "PERFORMANCE_VIEWABILITY_50"
    | "PERFORMANCE_VIEWABILITY_60"
    | "PERFORMANCE_VIEWABILITY_70"
    | (string & {});
  /** Video Viewability Section (applicable to video line items only). */
  videoViewability?:
    | "VIDEO_VIEWABILITY_UNSPECIFIED"
    | "VIDEO_VIEWABILITY_40"
    | "VIDEO_VIEWABILITY_50"
    | "VIDEO_VIEWABILITY_60"
    | "VIDEO_VIEWABILITY_70"
    | (string & {});
}

export const IntegralAdScience: Schema.Schema<IntegralAdScience> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      excludeUnrateable: Schema.optional(Schema.Boolean),
      excludedGamblingRisk: Schema.optional(Schema.String),
      excludedIllegalDownloadsRisk: Schema.optional(Schema.String),
      excludedDrugsRisk: Schema.optional(Schema.String),
      qualitySyncCustomSegmentId: Schema.optional(Schema.Array(Schema.String)),
      excludedHateSpeechRisk: Schema.optional(Schema.String),
      excludedAlcoholRisk: Schema.optional(Schema.String),
      excludedAdFraudRisk: Schema.optional(Schema.String),
      excludedAdultRisk: Schema.optional(Schema.String),
      customSegmentId: Schema.optional(Schema.Array(Schema.String)),
      excludedOffensiveLanguageRisk: Schema.optional(Schema.String),
      excludedViolenceRisk: Schema.optional(Schema.String),
      traqScoreOption: Schema.optional(Schema.String),
      displayViewability: Schema.optional(Schema.String),
      videoViewability: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IntegralAdScience",
  }) as any as Schema.Schema<IntegralAdScience>;

export interface ThirdPartyVerifierAssignedTargetingOptionDetails {
  /** Third party brand verifier -- Scope3 (previously known as Adloox). */
  adloox?: Adloox;
  /** Third party brand verifier -- DoubleVerify. */
  doubleVerify?: DoubleVerify;
  /** Third party brand verifier -- Integral Ad Science. */
  integralAdScience?: IntegralAdScience;
}

export const ThirdPartyVerifierAssignedTargetingOptionDetails: Schema.Schema<ThirdPartyVerifierAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adloox: Schema.optional(Adloox),
      doubleVerify: Schema.optional(DoubleVerify),
      integralAdScience: Schema.optional(IntegralAdScience),
    }),
  ).annotate({
    identifier: "ThirdPartyVerifierAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ThirdPartyVerifierAssignedTargetingOptionDetails>;

export interface ContentDurationAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_DURATION`. */
  targetingOptionId?: string;
  /** Output only. The content duration. */
  contentDuration?:
    | "CONTENT_DURATION_UNSPECIFIED"
    | "CONTENT_DURATION_UNKNOWN"
    | "CONTENT_DURATION_0_TO_1_MIN"
    | "CONTENT_DURATION_1_TO_5_MIN"
    | "CONTENT_DURATION_5_TO_15_MIN"
    | "CONTENT_DURATION_15_TO_30_MIN"
    | "CONTENT_DURATION_30_TO_60_MIN"
    | "CONTENT_DURATION_OVER_60_MIN"
    | (string & {});
}

export const ContentDurationAssignedTargetingOptionDetails: Schema.Schema<ContentDurationAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      contentDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentDurationAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ContentDurationAssignedTargetingOptionDetails>;

export interface AuthorizedSellerStatusAssignedTargetingOptionDetails {
  /** Output only. The authorized seller status to target. */
  authorizedSellerStatus?:
    | "AUTHORIZED_SELLER_STATUS_UNSPECIFIED"
    | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY"
    | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS"
    | (string & {});
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. */
  targetingOptionId?: string;
}

export const AuthorizedSellerStatusAssignedTargetingOptionDetails: Schema.Schema<AuthorizedSellerStatusAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authorizedSellerStatus: Schema.optional(Schema.String),
      targetingOptionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthorizedSellerStatusAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<AuthorizedSellerStatusAssignedTargetingOptionDetails>;

export interface KeywordAssignedTargetingOptionDetails {
  /** Required. The keyword, for example `car insurance`. Positive keyword cannot be offensive word. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10. */
  keyword?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
  /** Optional. The policy names to exempt the keyword from. This field is only applicable for Demand Gen keywords, which are positively targeted. */
  exemptedPolicyNames?: Array<string>;
}

export const KeywordAssignedTargetingOptionDetails: Schema.Schema<KeywordAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      keyword: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
      exemptedPolicyNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "KeywordAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<KeywordAssignedTargetingOptionDetails>;

export interface ContentGenreAssignedTargetingOptionDetails {
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
  /** Output only. The display name of the content genre. */
  displayName?: string;
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_GENRE`. */
  targetingOptionId?: string;
}

export const ContentGenreAssignedTargetingOptionDetails: Schema.Schema<ContentGenreAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negative: Schema.optional(Schema.Boolean),
      displayName: Schema.optional(Schema.String),
      targetingOptionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentGenreAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ContentGenreAssignedTargetingOptionDetails>;

export interface PoiAssignedTargetingOptionDetails {
  /** Output only. The display name of a POI, e.g. "Times Square", "Space Needle", followed by its full address if available. */
  displayName?: string;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_POI`. Accepted POI targeting option IDs can be retrieved using `targetingTypes.targetingOptions.search`. If targeting a specific latitude/longitude coordinate removed from an address or POI name, you can generate the necessary targeting option ID by rounding the desired coordinate values to the 6th decimal place, removing the decimals, and concatenating the string values separated by a semicolon. For example, you can target the latitude/longitude pair of 40.7414691, -74.003387 using the targeting option ID "40741469;-74003387". **Upon** **creation, this field value will be updated to append a semicolon and** **alphanumerical hash value if only latitude/longitude coordinates are** **provided.** */
  targetingOptionId?: string;
  /** Output only. Latitude of the POI rounding to 6th decimal place. */
  latitude?: number;
  /** Required. The unit of distance by which the targeting radius is measured. */
  proximityRadiusUnit?:
    | "DISTANCE_UNIT_UNSPECIFIED"
    | "DISTANCE_UNIT_MILES"
    | "DISTANCE_UNIT_KILOMETERS"
    | (string & {});
  /** Output only. Longitude of the POI rounding to 6th decimal place. */
  longitude?: number;
  /** Required. The radius of the area around the POI that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`. */
  proximityRadiusAmount?: number;
}

export const PoiAssignedTargetingOptionDetails: Schema.Schema<PoiAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      targetingOptionId: Schema.optional(Schema.String),
      latitude: Schema.optional(Schema.Number),
      proximityRadiusUnit: Schema.optional(Schema.String),
      longitude: Schema.optional(Schema.Number),
      proximityRadiusAmount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "PoiAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<PoiAssignedTargetingOptionDetails>;

export interface BusinessChainAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BUSINESS_CHAIN`. Accepted business chain targeting option IDs can be retrieved using SearchTargetingOptions. */
  targetingOptionId?: string;
  /** Required. The radius of the area around the business chain that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`. The minimum increment for both cases is 0.1. Inputs will be rounded to the nearest acceptable value if it is too granular, e.g. 15.57 will become 15.6. */
  proximityRadiusAmount?: number;
  /** Required. The unit of distance by which the targeting radius is measured. */
  proximityRadiusUnit?:
    | "DISTANCE_UNIT_UNSPECIFIED"
    | "DISTANCE_UNIT_MILES"
    | "DISTANCE_UNIT_KILOMETERS"
    | (string & {});
  /** Output only. The display name of a business chain, e.g. "KFC", "Chase Bank". */
  displayName?: string;
}

export const BusinessChainAssignedTargetingOptionDetails: Schema.Schema<BusinessChainAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      proximityRadiusAmount: Schema.optional(Schema.Number),
      proximityRadiusUnit: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BusinessChainAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<BusinessChainAssignedTargetingOptionDetails>;

export interface NegativeKeywordListAssignedTargetingOptionDetails {
  /** Required. ID of the negative keyword list. Should refer to the negative_keyword_list_id field of a NegativeKeywordList resource. */
  negativeKeywordListId?: string;
}

export const NegativeKeywordListAssignedTargetingOptionDetails: Schema.Schema<NegativeKeywordListAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negativeKeywordListId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NegativeKeywordListAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<NegativeKeywordListAssignedTargetingOptionDetails>;

export interface RegionalLocationListAssignedTargetingOptionDetails {
  /** Required. ID of the regional location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_REGIONAL`. */
  regionalLocationListId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const RegionalLocationListAssignedTargetingOptionDetails: Schema.Schema<RegionalLocationListAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionalLocationListId: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RegionalLocationListAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<RegionalLocationListAssignedTargetingOptionDetails>;

export interface DeviceMakeModelAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`. */
  targetingOptionId?: string;
  /** Output only. The display name of the device make and model. */
  displayName?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const DeviceMakeModelAssignedTargetingOptionDetails: Schema.Schema<DeviceMakeModelAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DeviceMakeModelAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<DeviceMakeModelAssignedTargetingOptionDetails>;

export interface CarrierAndIspAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_CARRIER_AND_ISP`. */
  targetingOptionId?: string;
  /** Output only. The display name of the carrier or ISP. */
  displayName?: string;
  /** Indicates if this option is being negatively targeted. All assigned carrier and ISP targeting options on the same resource must have the same value for this field. */
  negative?: boolean;
}

export const CarrierAndIspAssignedTargetingOptionDetails: Schema.Schema<CarrierAndIspAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CarrierAndIspAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<CarrierAndIspAssignedTargetingOptionDetails>;

export interface ParentalStatusAssignedTargetingOptionDetails {
  /** Required. The parental status of the audience. */
  parentalStatus?:
    | "PARENTAL_STATUS_UNSPECIFIED"
    | "PARENTAL_STATUS_PARENT"
    | "PARENTAL_STATUS_NOT_A_PARENT"
    | "PARENTAL_STATUS_UNKNOWN"
    | (string & {});
}

export const ParentalStatusAssignedTargetingOptionDetails: Schema.Schema<ParentalStatusAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parentalStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ParentalStatusAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ParentalStatusAssignedTargetingOptionDetails>;

export interface HouseholdIncomeAssignedTargetingOptionDetails {
  /** Required. The household income of the audience. */
  householdIncome?:
    | "HOUSEHOLD_INCOME_UNSPECIFIED"
    | "HOUSEHOLD_INCOME_UNKNOWN"
    | "HOUSEHOLD_INCOME_LOWER_50_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT"
    | "HOUSEHOLD_INCOME_TOP_10_PERCENT"
    | (string & {});
}

export const HouseholdIncomeAssignedTargetingOptionDetails: Schema.Schema<HouseholdIncomeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      householdIncome: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HouseholdIncomeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<HouseholdIncomeAssignedTargetingOptionDetails>;

export interface EnvironmentAssignedTargetingOptionDetails {
  /** Required. The serving environment. */
  environment?:
    | "ENVIRONMENT_UNSPECIFIED"
    | "ENVIRONMENT_WEB_OPTIMIZED"
    | "ENVIRONMENT_WEB_NOT_OPTIMIZED"
    | "ENVIRONMENT_APP"
    | (string & {});
}

export const EnvironmentAssignedTargetingOptionDetails: Schema.Schema<EnvironmentAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnvironmentAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<EnvironmentAssignedTargetingOptionDetails>;

export interface OnScreenPositionAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`. */
  targetingOptionId?: string;
  /** Output only. The on screen position. */
  onScreenPosition?:
    | "ON_SCREEN_POSITION_UNSPECIFIED"
    | "ON_SCREEN_POSITION_UNKNOWN"
    | "ON_SCREEN_POSITION_ABOVE_THE_FOLD"
    | "ON_SCREEN_POSITION_BELOW_THE_FOLD"
    | (string & {});
  /** Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. */
  adType?:
    | "AD_TYPE_UNSPECIFIED"
    | "AD_TYPE_DISPLAY"
    | "AD_TYPE_VIDEO"
    | "AD_TYPE_AUDIO"
    | (string & {});
}

export const OnScreenPositionAssignedTargetingOptionDetails: Schema.Schema<OnScreenPositionAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      onScreenPosition: Schema.optional(Schema.String),
      adType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OnScreenPositionAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<OnScreenPositionAssignedTargetingOptionDetails>;

export interface ExchangeAssignedTargetingOptionDetails {
  /** Required. The enum value for the exchange. */
  exchange?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
}

export const ExchangeAssignedTargetingOptionDetails: Schema.Schema<ExchangeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exchange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExchangeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ExchangeAssignedTargetingOptionDetails>;

export interface AudioContentTypeAssignedTargetingOptionDetails {
  /** Required. The audio content type. */
  audioContentType?:
    | "AUDIO_CONTENT_TYPE_UNSPECIFIED"
    | "AUDIO_CONTENT_TYPE_UNKNOWN"
    | "AUDIO_CONTENT_TYPE_MUSIC"
    | "AUDIO_CONTENT_TYPE_BROADCAST"
    | "AUDIO_CONTENT_TYPE_PODCAST"
    | (string & {});
}

export const AudioContentTypeAssignedTargetingOptionDetails: Schema.Schema<AudioContentTypeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioContentType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AudioContentTypeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<AudioContentTypeAssignedTargetingOptionDetails>;

export interface CategoryAssignedTargetingOptionDetails {
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
  /** Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CATEGORY`. */
  targetingOptionId?: string;
  /** Output only. The display name of the category. */
  displayName?: string;
}

export const CategoryAssignedTargetingOptionDetails: Schema.Schema<CategoryAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negative: Schema.optional(Schema.Boolean),
      targetingOptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CategoryAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<CategoryAssignedTargetingOptionDetails>;

export interface ViewabilityAssignedTargetingOptionDetails {
  /** Required. The predicted viewability percentage. */
  viewability?:
    | "VIEWABILITY_UNSPECIFIED"
    | "VIEWABILITY_10_PERCENT_OR_MORE"
    | "VIEWABILITY_20_PERCENT_OR_MORE"
    | "VIEWABILITY_30_PERCENT_OR_MORE"
    | "VIEWABILITY_40_PERCENT_OR_MORE"
    | "VIEWABILITY_50_PERCENT_OR_MORE"
    | "VIEWABILITY_60_PERCENT_OR_MORE"
    | "VIEWABILITY_70_PERCENT_OR_MORE"
    | "VIEWABILITY_80_PERCENT_OR_MORE"
    | "VIEWABILITY_90_PERCENT_OR_MORE"
    | (string & {});
}

export const ViewabilityAssignedTargetingOptionDetails: Schema.Schema<ViewabilityAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      viewability: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ViewabilityAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ViewabilityAssignedTargetingOptionDetails>;

export interface BrowserAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BROWSER`. */
  targetingOptionId?: string;
  /** Output only. The display name of the browser. */
  displayName?: string;
  /** Indicates if this option is being negatively targeted. All assigned browser targeting options on the same resource must have the same value for this field. */
  negative?: boolean;
}

export const BrowserAssignedTargetingOptionDetails: Schema.Schema<BrowserAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BrowserAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<BrowserAssignedTargetingOptionDetails>;

export interface InventorySourceAssignedTargetingOptionDetails {
  /** Required. ID of the inventory source. Should refer to the inventory_source_id field of an InventorySource resource. */
  inventorySourceId?: string;
}

export const InventorySourceAssignedTargetingOptionDetails: Schema.Schema<InventorySourceAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySourceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventorySourceAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<InventorySourceAssignedTargetingOptionDetails>;

export interface SubExchangeAssignedTargetingOptionDetails {
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_SUB_EXCHANGE`. */
  targetingOptionId?: string;
}

export const SubExchangeAssignedTargetingOptionDetails: Schema.Schema<SubExchangeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SubExchangeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<SubExchangeAssignedTargetingOptionDetails>;

export interface YoutubeChannelAssignedTargetingOptionDetails {
  /** The YouTube uploader channel id or the channel code of a YouTube channel. */
  channelId?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const YoutubeChannelAssignedTargetingOptionDetails: Schema.Schema<YoutubeChannelAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelId: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "YoutubeChannelAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<YoutubeChannelAssignedTargetingOptionDetails>;

export interface GenderAssignedTargetingOptionDetails {
  /** Required. The gender of the audience. */
  gender?:
    | "GENDER_UNSPECIFIED"
    | "GENDER_MALE"
    | "GENDER_FEMALE"
    | "GENDER_UNKNOWN"
    | (string & {});
}

export const GenderAssignedTargetingOptionDetails: Schema.Schema<GenderAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gender: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenderAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<GenderAssignedTargetingOptionDetails>;

export interface DigitalContentLabelAssignedTargetingOptionDetails {
  /** Required. The display name of the digital content label rating tier to be EXCLUDED. */
  excludedContentRatingTier?:
    | "CONTENT_RATING_TIER_UNSPECIFIED"
    | "CONTENT_RATING_TIER_UNRATED"
    | "CONTENT_RATING_TIER_GENERAL"
    | "CONTENT_RATING_TIER_PARENTAL_GUIDANCE"
    | "CONTENT_RATING_TIER_TEENS"
    | "CONTENT_RATING_TIER_MATURE"
    | "CONTENT_RATING_TIER_FAMILIES"
    | (string & {});
}

export const DigitalContentLabelAssignedTargetingOptionDetails: Schema.Schema<DigitalContentLabelAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      excludedContentRatingTier: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DigitalContentLabelAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<DigitalContentLabelAssignedTargetingOptionDetails>;

export interface SessionPositionAssignedTargetingOptionDetails {
  /** The position where the ad will show in a session. */
  sessionPosition?:
    | "SESSION_POSITION_UNSPECIFIED"
    | "SESSION_POSITION_FIRST_IMPRESSION"
    | (string & {});
}

export const SessionPositionAssignedTargetingOptionDetails: Schema.Schema<SessionPositionAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SessionPositionAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<SessionPositionAssignedTargetingOptionDetails>;

export interface ContentOutstreamPositionAssignedTargetingOptionDetails {
  /** Required. The content outstream position. */
  contentOutstreamPosition?:
    | "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED"
    | "CONTENT_OUTSTREAM_POSITION_UNKNOWN"
    | "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE"
    | "CONTENT_OUTSTREAM_POSITION_IN_BANNER"
    | "CONTENT_OUTSTREAM_POSITION_IN_FEED"
    | "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL"
    | (string & {});
  /** Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. */
  adType?:
    | "AD_TYPE_UNSPECIFIED"
    | "AD_TYPE_DISPLAY"
    | "AD_TYPE_VIDEO"
    | "AD_TYPE_AUDIO"
    | (string & {});
}

export const ContentOutstreamPositionAssignedTargetingOptionDetails: Schema.Schema<ContentOutstreamPositionAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentOutstreamPosition: Schema.optional(Schema.String),
      adType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentOutstreamPositionAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ContentOutstreamPositionAssignedTargetingOptionDetails>;

export interface ContentInstreamPositionAssignedTargetingOptionDetails {
  /** Required. The content instream position for video or audio ads. */
  contentInstreamPosition?:
    | "CONTENT_INSTREAM_POSITION_UNSPECIFIED"
    | "CONTENT_INSTREAM_POSITION_PRE_ROLL"
    | "CONTENT_INSTREAM_POSITION_MID_ROLL"
    | "CONTENT_INSTREAM_POSITION_POST_ROLL"
    | "CONTENT_INSTREAM_POSITION_UNKNOWN"
    | (string & {});
  /** Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. * `AD_TYPE_AUDIO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_AUDIO_DEFAULT`. */
  adType?:
    | "AD_TYPE_UNSPECIFIED"
    | "AD_TYPE_DISPLAY"
    | "AD_TYPE_VIDEO"
    | "AD_TYPE_AUDIO"
    | (string & {});
}

export const ContentInstreamPositionAssignedTargetingOptionDetails: Schema.Schema<ContentInstreamPositionAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentInstreamPosition: Schema.optional(Schema.String),
      adType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentInstreamPositionAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<ContentInstreamPositionAssignedTargetingOptionDetails>;

export interface LanguageAssignedTargetingOptionDetails {
  /** Indicates if this option is being negatively targeted. All assigned language targeting options on the same resource must have the same value for this field. */
  negative?: boolean;
  /** Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_LANGUAGE`. */
  targetingOptionId?: string;
  /** Output only. The display name of the language (e.g., "French"). */
  displayName?: string;
}

export const LanguageAssignedTargetingOptionDetails: Schema.Schema<LanguageAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negative: Schema.optional(Schema.Boolean),
      targetingOptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LanguageAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<LanguageAssignedTargetingOptionDetails>;

export interface DayAndTimeAssignedTargetingOptionDetails {
  /** Required. The end hour for day and time targeting. Must be between 1 (1 hour after start of day) and 24 (end of day). */
  endHour?: number;
  /** Required. The mechanism used to determine which timezone to use for this day and time targeting setting. For demand gen line items, this field is always TIME_ZONE_RESOLUTION_ADVERTISER. */
  timeZoneResolution?:
    | "TIME_ZONE_RESOLUTION_UNSPECIFIED"
    | "TIME_ZONE_RESOLUTION_END_USER"
    | "TIME_ZONE_RESOLUTION_ADVERTISER"
    | (string & {});
  /** Required. The day of the week for this day and time targeting setting. */
  dayOfWeek?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Required. The start hour for day and time targeting. Must be between 0 (start of day) and 23 (1 hour before end of day). */
  startHour?: number;
}

export const DayAndTimeAssignedTargetingOptionDetails: Schema.Schema<DayAndTimeAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endHour: Schema.optional(Schema.Number),
      timeZoneResolution: Schema.optional(Schema.String),
      dayOfWeek: Schema.optional(Schema.String),
      startHour: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DayAndTimeAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<DayAndTimeAssignedTargetingOptionDetails>;

export interface OperatingSystemAssignedTargetingOptionDetails {
  /** Required. The targeting option ID populated in targeting_option_id field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`. */
  targetingOptionId?: string;
  /** Output only. The display name of the operating system. */
  displayName?: string;
  /** Indicates if this option is being negatively targeted. */
  negative?: boolean;
}

export const OperatingSystemAssignedTargetingOptionDetails: Schema.Schema<OperatingSystemAssignedTargetingOptionDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      negative: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OperatingSystemAssignedTargetingOptionDetails",
  }) as any as Schema.Schema<OperatingSystemAssignedTargetingOptionDetails>;

export interface AssignedTargetingOption {
  /** URL details. This field will be populated when the targeting_type is `TARGETING_TYPE_URL`. */
  urlDetails?: UrlAssignedTargetingOptionDetails;
  /** Inventory source group details. This field will be populated when the targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`. */
  inventorySourceGroupDetails?: InventorySourceGroupAssignedTargetingOptionDetails;
  /** Output only. The inheritance status of the assigned targeting option. */
  inheritance?:
    | "INHERITANCE_UNSPECIFIED"
    | "NOT_INHERITED"
    | "INHERITED_FROM_PARTNER"
    | "INHERITED_FROM_ADVERTISER"
    | (string & {});
  /** App category details. This field will be populated when the targeting_type is `TARGETING_TYPE_APP_CATEGORY`. */
  appCategoryDetails?: AppCategoryAssignedTargetingOptionDetails;
  /** App details. This field will be populated when the targeting_type is `TARGETING_TYPE_APP`. */
  appDetails?: AppAssignedTargetingOptionDetails;
  /** Video player size details. This field will be populated when the targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`. */
  videoPlayerSizeDetails?: VideoPlayerSizeAssignedTargetingOptionDetails;
  /** Sensitive category details. This field will be populated when the targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`. Sensitive categories are targeting exclusions. Advertiser level sensitive category exclusions, if set, are always applied in serving (even though they aren't visible in resource settings). Resource settings can exclude sensitive categories in addition to advertiser exclusions, but can't override them. */
  sensitiveCategoryExclusionDetails?: SensitiveCategoryAssignedTargetingOptionDetails;
  /** Content theme details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_THEME_EXCLUSION`. Content theme are targeting exclusions. Advertiser level content theme exclusions, if set, are always applied in serving (even though they aren't visible in resource settings). Resource settings can exclude content theme in addition to advertiser exclusions. */
  contentThemeExclusionDetails?: ContentThemeAssignedTargetingOptionDetails;
  /** Audience targeting details. This field will be populated when the targeting_type is `TARGETING_TYPE_AUDIENCE_GROUP`. You can only target one audience group option per resource. */
  audienceGroupDetails?: AudienceGroupAssignedTargetingOptionDetails;
  /** Output only. Identifies the type of this assigned targeting option. */
  targetingType?:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Content duration details. This field will be populated when the TargetingType is `TARGETING_TYPE_CONTENT_STREAM_TYPE`. */
  contentStreamTypeDetails?: ContentStreamTypeAssignedTargetingOptionDetails;
  /** Age range details. This field will be populated when the targeting_type is `TARGETING_TYPE_AGE_RANGE`. */
  ageRangeDetails?: AgeRangeAssignedTargetingOptionDetails;
  /** YouTube video details. This field will be populated when the targeting_type is `TARGETING_TYPE_YOUTUBE_VIDEO`. */
  youtubeVideoDetails?: YoutubeVideoAssignedTargetingOptionDetails;
  /** Geographic region details. This field will be populated when the targeting_type is `TARGETING_TYPE_GEO_REGION`. */
  geoRegionDetails?: GeoRegionAssignedTargetingOptionDetails;
  /** Native content position details. This field will be populated when the targeting_type is `TARGETING_TYPE_NATIVE_CONTENT_POSITION`. */
  nativeContentPositionDetails?: NativeContentPositionAssignedTargetingOptionDetails;
  /** Device Type details. This field will be populated when the targeting_type is `TARGETING_TYPE_DEVICE_TYPE`. */
  deviceTypeDetails?: DeviceTypeAssignedTargetingOptionDetails;
  /** User rewarded content details. This field will be populated when the targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`. */
  userRewardedContentDetails?: UserRewardedContentAssignedTargetingOptionDetails;
  /** Channel details. This field will be populated when the targeting_type is `TARGETING_TYPE_CHANNEL`. */
  channelDetails?: ChannelAssignedTargetingOptionDetails;
  /** Open Measurement enabled inventory details. This field will be populated when the targeting_type is `TARGETING_TYPE_OMID`. */
  omidDetails?: OmidAssignedTargetingOptionDetails;
  /** Third party verification details. This field will be populated when the targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`. */
  thirdPartyVerifierDetails?: ThirdPartyVerifierAssignedTargetingOptionDetails;
  /** Content duration details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_DURATION`. */
  contentDurationDetails?: ContentDurationAssignedTargetingOptionDetails;
  /** Authorized seller status details. This field will be populated when the targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. You can only target one authorized seller status option per resource. If a resource doesn't have an authorized seller status option, all authorized sellers indicated as DIRECT or RESELLER in the ads.txt file are targeted by default. */
  authorizedSellerStatusDetails?: AuthorizedSellerStatusAssignedTargetingOptionDetails;
  /** Keyword details. This field will be populated when the targeting_type is `TARGETING_TYPE_KEYWORD`. A maximum of 5000 direct negative keywords can be assigned to a resource. No limit on number of positive keywords that can be assigned. */
  keywordDetails?: KeywordAssignedTargetingOptionDetails;
  /** Content genre details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_GENRE`. */
  contentGenreDetails?: ContentGenreAssignedTargetingOptionDetails;
  /** POI details. This field will be populated when the targeting_type is `TARGETING_TYPE_POI`. */
  poiDetails?: PoiAssignedTargetingOptionDetails;
  /** Output only. An alias for the assigned_targeting_option_id. This value can be used in place of `assignedTargetingOptionId` when retrieving or deleting existing targeting. This field will only be supported for all assigned targeting options of the following targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` This field is also supported for line item assigned targeting options of the following targeting types: * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` */
  assignedTargetingOptionIdAlias?: string;
  /** Business chain details. This field will be populated when the targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`. */
  businessChainDetails?: BusinessChainAssignedTargetingOptionDetails;
  /** Output only. The resource name for this assigned targeting option. */
  name?: string;
  /** Keyword details. This field will be populated when the targeting_type is `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`. A maximum of 4 negative keyword lists can be assigned to a resource. */
  negativeKeywordListDetails?: NegativeKeywordListAssignedTargetingOptionDetails;
  /** Regional location list details. This field will be populated when the targeting_type is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`. */
  regionalLocationListDetails?: RegionalLocationListAssignedTargetingOptionDetails;
  /** Device make and model details. This field will be populated when the targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`. */
  deviceMakeModelDetails?: DeviceMakeModelAssignedTargetingOptionDetails;
  /** Output only. The unique ID of the assigned targeting option. The ID is only unique within a given resource and targeting type. It may be reused in other contexts. */
  assignedTargetingOptionId?: string;
  /** Carrier and ISP details. This field will be populated when the targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`. */
  carrierAndIspDetails?: CarrierAndIspAssignedTargetingOptionDetails;
  /** Proximity location list details. This field will be populated when the targeting_type is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`. */
  proximityLocationListDetails?: ProximityLocationListAssignedTargetingOptionDetails;
  /** Parental status details. This field will be populated when the targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`. */
  parentalStatusDetails?: ParentalStatusAssignedTargetingOptionDetails;
  /** Household income details. This field will be populated when the targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`. */
  householdIncomeDetails?: HouseholdIncomeAssignedTargetingOptionDetails;
  /** Environment details. This field will be populated when the targeting_type is `TARGETING_TYPE_ENVIRONMENT`. */
  environmentDetails?: EnvironmentAssignedTargetingOptionDetails;
  /** On screen position details. This field will be populated when the targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`. */
  onScreenPositionDetails?: OnScreenPositionAssignedTargetingOptionDetails;
  /** Exchange details. This field will be populated when the targeting_type is `TARGETING_TYPE_EXCHANGE`. */
  exchangeDetails?: ExchangeAssignedTargetingOptionDetails;
  /** Audio content type details. This field will be populated when the targeting_type is `TARGETING_TYPE_AUDIO_CONTENT_TYPE`. */
  audioContentTypeDetails?: AudioContentTypeAssignedTargetingOptionDetails;
  /** Category details. This field will be populated when the targeting_type is `TARGETING_TYPE_CATEGORY`. Targeting a category will also target its subcategories. If a category is excluded from targeting and a subcategory is included, the exclusion will take precedence. */
  categoryDetails?: CategoryAssignedTargetingOptionDetails;
  /** Viewability details. This field will be populated when the targeting_type is `TARGETING_TYPE_VIEWABILITY`. You can only target one viewability option per resource. */
  viewabilityDetails?: ViewabilityAssignedTargetingOptionDetails;
  /** Browser details. This field will be populated when the targeting_type is `TARGETING_TYPE_BROWSER`. */
  browserDetails?: BrowserAssignedTargetingOptionDetails;
  /** Inventory source details. This field will be populated when the targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE`. */
  inventorySourceDetails?: InventorySourceAssignedTargetingOptionDetails;
  /** Sub-exchange details. This field will be populated when the targeting_type is `TARGETING_TYPE_SUB_EXCHANGE`. */
  subExchangeDetails?: SubExchangeAssignedTargetingOptionDetails;
  /** YouTube channel details. This field will be populated when the targeting_type is `TARGETING_TYPE_YOUTUBE_CHANNEL`. */
  youtubeChannelDetails?: YoutubeChannelAssignedTargetingOptionDetails;
  /** Gender details. This field will be populated when the targeting_type is `TARGETING_TYPE_GENDER`. */
  genderDetails?: GenderAssignedTargetingOptionDetails;
  /** Digital content label details. This field will be populated when the targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`. Digital content labels are targeting exclusions. Advertiser level digital content label exclusions, if set, are always applied in serving (even though they aren't visible in resource settings). Resource settings can exclude content labels in addition to advertiser exclusions, but can't override them. A line item won't serve if all the digital content labels are excluded. */
  digitalContentLabelExclusionDetails?: DigitalContentLabelAssignedTargetingOptionDetails;
  /** Session position details. This field will be populated when the targeting_type is `TARGETING_TYPE_SESSION_POSITION`. */
  sessionPositionDetails?: SessionPositionAssignedTargetingOptionDetails;
  /** Content outstream position details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`. */
  contentOutstreamPositionDetails?: ContentOutstreamPositionAssignedTargetingOptionDetails;
  /** Content instream position details. This field will be populated when the targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`. */
  contentInstreamPositionDetails?: ContentInstreamPositionAssignedTargetingOptionDetails;
  /** Language details. This field will be populated when the targeting_type is `TARGETING_TYPE_LANGUAGE`. */
  languageDetails?: LanguageAssignedTargetingOptionDetails;
  /** Day and time details. This field will be populated when the targeting_type is `TARGETING_TYPE_DAY_AND_TIME`. */
  dayAndTimeDetails?: DayAndTimeAssignedTargetingOptionDetails;
  /** Operating system details. This field will be populated when the targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`. */
  operatingSystemDetails?: OperatingSystemAssignedTargetingOptionDetails;
}

export const AssignedTargetingOption: Schema.Schema<AssignedTargetingOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      urlDetails: Schema.optional(UrlAssignedTargetingOptionDetails),
      inventorySourceGroupDetails: Schema.optional(
        InventorySourceGroupAssignedTargetingOptionDetails,
      ),
      inheritance: Schema.optional(Schema.String),
      appCategoryDetails: Schema.optional(
        AppCategoryAssignedTargetingOptionDetails,
      ),
      appDetails: Schema.optional(AppAssignedTargetingOptionDetails),
      videoPlayerSizeDetails: Schema.optional(
        VideoPlayerSizeAssignedTargetingOptionDetails,
      ),
      sensitiveCategoryExclusionDetails: Schema.optional(
        SensitiveCategoryAssignedTargetingOptionDetails,
      ),
      contentThemeExclusionDetails: Schema.optional(
        ContentThemeAssignedTargetingOptionDetails,
      ),
      audienceGroupDetails: Schema.optional(
        AudienceGroupAssignedTargetingOptionDetails,
      ),
      targetingType: Schema.optional(Schema.String),
      contentStreamTypeDetails: Schema.optional(
        ContentStreamTypeAssignedTargetingOptionDetails,
      ),
      ageRangeDetails: Schema.optional(AgeRangeAssignedTargetingOptionDetails),
      youtubeVideoDetails: Schema.optional(
        YoutubeVideoAssignedTargetingOptionDetails,
      ),
      geoRegionDetails: Schema.optional(
        GeoRegionAssignedTargetingOptionDetails,
      ),
      nativeContentPositionDetails: Schema.optional(
        NativeContentPositionAssignedTargetingOptionDetails,
      ),
      deviceTypeDetails: Schema.optional(
        DeviceTypeAssignedTargetingOptionDetails,
      ),
      userRewardedContentDetails: Schema.optional(
        UserRewardedContentAssignedTargetingOptionDetails,
      ),
      channelDetails: Schema.optional(ChannelAssignedTargetingOptionDetails),
      omidDetails: Schema.optional(OmidAssignedTargetingOptionDetails),
      thirdPartyVerifierDetails: Schema.optional(
        ThirdPartyVerifierAssignedTargetingOptionDetails,
      ),
      contentDurationDetails: Schema.optional(
        ContentDurationAssignedTargetingOptionDetails,
      ),
      authorizedSellerStatusDetails: Schema.optional(
        AuthorizedSellerStatusAssignedTargetingOptionDetails,
      ),
      keywordDetails: Schema.optional(KeywordAssignedTargetingOptionDetails),
      contentGenreDetails: Schema.optional(
        ContentGenreAssignedTargetingOptionDetails,
      ),
      poiDetails: Schema.optional(PoiAssignedTargetingOptionDetails),
      assignedTargetingOptionIdAlias: Schema.optional(Schema.String),
      businessChainDetails: Schema.optional(
        BusinessChainAssignedTargetingOptionDetails,
      ),
      name: Schema.optional(Schema.String),
      negativeKeywordListDetails: Schema.optional(
        NegativeKeywordListAssignedTargetingOptionDetails,
      ),
      regionalLocationListDetails: Schema.optional(
        RegionalLocationListAssignedTargetingOptionDetails,
      ),
      deviceMakeModelDetails: Schema.optional(
        DeviceMakeModelAssignedTargetingOptionDetails,
      ),
      assignedTargetingOptionId: Schema.optional(Schema.String),
      carrierAndIspDetails: Schema.optional(
        CarrierAndIspAssignedTargetingOptionDetails,
      ),
      proximityLocationListDetails: Schema.optional(
        ProximityLocationListAssignedTargetingOptionDetails,
      ),
      parentalStatusDetails: Schema.optional(
        ParentalStatusAssignedTargetingOptionDetails,
      ),
      householdIncomeDetails: Schema.optional(
        HouseholdIncomeAssignedTargetingOptionDetails,
      ),
      environmentDetails: Schema.optional(
        EnvironmentAssignedTargetingOptionDetails,
      ),
      onScreenPositionDetails: Schema.optional(
        OnScreenPositionAssignedTargetingOptionDetails,
      ),
      exchangeDetails: Schema.optional(ExchangeAssignedTargetingOptionDetails),
      audioContentTypeDetails: Schema.optional(
        AudioContentTypeAssignedTargetingOptionDetails,
      ),
      categoryDetails: Schema.optional(CategoryAssignedTargetingOptionDetails),
      viewabilityDetails: Schema.optional(
        ViewabilityAssignedTargetingOptionDetails,
      ),
      browserDetails: Schema.optional(BrowserAssignedTargetingOptionDetails),
      inventorySourceDetails: Schema.optional(
        InventorySourceAssignedTargetingOptionDetails,
      ),
      subExchangeDetails: Schema.optional(
        SubExchangeAssignedTargetingOptionDetails,
      ),
      youtubeChannelDetails: Schema.optional(
        YoutubeChannelAssignedTargetingOptionDetails,
      ),
      genderDetails: Schema.optional(GenderAssignedTargetingOptionDetails),
      digitalContentLabelExclusionDetails: Schema.optional(
        DigitalContentLabelAssignedTargetingOptionDetails,
      ),
      sessionPositionDetails: Schema.optional(
        SessionPositionAssignedTargetingOptionDetails,
      ),
      contentOutstreamPositionDetails: Schema.optional(
        ContentOutstreamPositionAssignedTargetingOptionDetails,
      ),
      contentInstreamPositionDetails: Schema.optional(
        ContentInstreamPositionAssignedTargetingOptionDetails,
      ),
      languageDetails: Schema.optional(LanguageAssignedTargetingOptionDetails),
      dayAndTimeDetails: Schema.optional(
        DayAndTimeAssignedTargetingOptionDetails,
      ),
      operatingSystemDetails: Schema.optional(
        OperatingSystemAssignedTargetingOptionDetails,
      ),
    }),
  ).annotate({
    identifier: "AssignedTargetingOption",
  }) as any as Schema.Schema<AssignedTargetingOption>;

export interface CreateAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. */
  targetingType?:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The assigned targeting options to create and add. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const CreateAssignedTargetingOptionsRequest: Schema.Schema<CreateAssignedTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingType: Schema.optional(Schema.String),
      assignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
    }),
  ).annotate({
    identifier: "CreateAssignedTargetingOptionsRequest",
  }) as any as Schema.Schema<CreateAssignedTargetingOptionsRequest>;

export interface BulkEditAssignedTargetingOptionsRequest {
  /** The assigned targeting options to delete in batch, specified as a list of DeleteAssignedTargetingOptionsRequest. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** The assigned targeting options to create in batch, specified as a list of CreateAssignedTargetingOptionsRequest. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
  /** Required. The ID of the line items whose targeting is being updated. */
  lineItemIds?: Array<string>;
}

export const BulkEditAssignedTargetingOptionsRequest: Schema.Schema<BulkEditAssignedTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deleteRequests: Schema.optional(
        Schema.Array(DeleteAssignedTargetingOptionsRequest),
      ),
      createRequests: Schema.optional(
        Schema.Array(CreateAssignedTargetingOptionsRequest),
      ),
      lineItemIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BulkEditAssignedTargetingOptionsRequest",
  }) as any as Schema.Schema<BulkEditAssignedTargetingOptionsRequest>;

export interface LookbackWindow {
  /** Lookback window, in days, from the last time a given user clicked on one of your ads. */
  clickDays?: number;
  /** Lookback window, in days, from the last time a given user viewed one of your ads. */
  impressionDays?: number;
}

export const LookbackWindow: Schema.Schema<LookbackWindow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clickDays: Schema.optional(Schema.Number),
      impressionDays: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "LookbackWindow",
  }) as any as Schema.Schema<LookbackWindow>;

export interface FixedBidStrategy {
  /** The fixed bid amount, in micros of the advertiser's currency. For insertion order entity, bid_amount_micros should be set as 0. For line item entity, bid_amount_micros must be greater than or equal to billable unit of the given currency and smaller than or equal to the upper limit 1000000000. For example, 1500000 represents 1.5 standard units of the currency. */
  bidAmountMicros?: string;
}

export const FixedBidStrategy: Schema.Schema<FixedBidStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bidAmountMicros: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FixedBidStrategy",
  }) as any as Schema.Schema<FixedBidStrategy>;

export interface InventorySourceStatus {
  /** Output only. The status set by the seller for the inventory source. Only applicable for inventory sources synced directly from the publishers. Acceptable values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_PAUSED`. */
  sellerStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** The user-provided reason for pausing this inventory source. Must not exceed 100 characters. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`. */
  entityPauseReason?: string;
  /** Output only. The seller-provided reason for pausing this inventory source. Only applicable for inventory sources synced directly from the publishers and when seller_status is set to `ENTITY_STATUS_PAUSED`. */
  sellerPauseReason?: string;
  /** Whether or not the inventory source is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Output only. The configuration status of the inventory source. Only applicable for guaranteed inventory sources. Acceptable values are `INVENTORY_SOURCE_CONFIG_STATUS_PENDING` and `INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED`. An inventory source must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve. */
  configStatus?:
    | "INVENTORY_SOURCE_CONFIG_STATUS_UNSPECIFIED"
    | "INVENTORY_SOURCE_CONFIG_STATUS_PENDING"
    | "INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED"
    | (string & {});
}

export const InventorySourceStatus: Schema.Schema<InventorySourceStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sellerStatus: Schema.optional(Schema.String),
      entityPauseReason: Schema.optional(Schema.String),
      sellerPauseReason: Schema.optional(Schema.String),
      entityStatus: Schema.optional(Schema.String),
      configStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventorySourceStatus",
  }) as any as Schema.Schema<InventorySourceStatus>;

export interface Site {
  /** Required. The app ID or URL of the site. Must be UTF-8 encoded with a maximum length of 240 bytes. */
  urlOrAppId?: string;
  /** Output only. The resource name of the site. */
  name?: string;
}

export const Site: Schema.Schema<Site> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      urlOrAppId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Site" }) as any as Schema.Schema<Site>;

export interface BulkEditSitesResponse {
  /** The list of sites that have been successfully created. This list will be absent if empty. */
  sites?: Array<Site>;
}

export const BulkEditSitesResponse: Schema.Schema<BulkEditSitesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sites: Schema.optional(Schema.Array(Site)),
    }),
  ).annotate({
    identifier: "BulkEditSitesResponse",
  }) as any as Schema.Schema<BulkEditSitesResponse>;

export interface BulkEditAdvertiserAssignedTargetingOptionsRequest {
  /** The assigned targeting options to delete in batch, specified as a list of `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** The assigned targeting options to create in batch, specified as a list of `CreateAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
}

export const BulkEditAdvertiserAssignedTargetingOptionsRequest: Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deleteRequests: Schema.optional(
        Schema.Array(DeleteAssignedTargetingOptionsRequest),
      ),
      createRequests: Schema.optional(
        Schema.Array(CreateAssignedTargetingOptionsRequest),
      ),
    }),
  ).annotate({
    identifier: "BulkEditAdvertiserAssignedTargetingOptionsRequest",
  }) as any as Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsRequest>;

export interface BulkEditPartnerAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options that have been successfully created. This list will be absent if empty. */
  createdAssignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const BulkEditPartnerAssignedTargetingOptionsResponse: Schema.Schema<BulkEditPartnerAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createdAssignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
    }),
  ).annotate({
    identifier: "BulkEditPartnerAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkEditPartnerAssignedTargetingOptionsResponse>;

export interface User {
  /** Output only. The resource name of the user. */
  name?: string;
  /** Output only. The timestamp when the user last logged in DV360 UI. */
  lastLoginTime?: string;
  /** Output only. The unique ID of the user. Assigned by the system. */
  userId?: string;
  /** The assigned user roles. Required in CreateUser. Output only in UpdateUser. Can only be updated through BulkEditAssignedUserRoles. */
  assignedUserRoles?: Array<AssignedUserRole>;
  /** Required. Immutable. The email address used to identify the user. */
  email?: string;
  /** Required. The display name of the user. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
}

export const User: Schema.Schema<User> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      lastLoginTime: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      assignedUserRoles: Schema.optional(Schema.Array(AssignedUserRole)),
      email: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface ListUsersResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListUsers` method to retrieve the next page of results. This token will be absent if there are no more results to return. */
  nextPageToken?: string;
  /** The list of users. This list will be absent if empty. */
  users?: Array<User>;
}

export const ListUsersResponse: Schema.Schema<ListUsersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      users: Schema.optional(Schema.Array(User)),
    }),
  ).annotate({
    identifier: "ListUsersResponse",
  }) as any as Schema.Schema<ListUsersResponse>;

export interface ActiveViewVideoViewabilityMetricConfig {
  /** Required. The minimum percentage of the video ad's pixels visible on the screen in order for an impression to be recorded. */
  minimumViewability?:
    | "VIEWABILITY_PERCENT_UNSPECIFIED"
    | "VIEWABILITY_PERCENT_0"
    | "VIEWABILITY_PERCENT_25"
    | "VIEWABILITY_PERCENT_50"
    | "VIEWABILITY_PERCENT_75"
    | "VIEWABILITY_PERCENT_100"
    | (string & {});
  /** Required. The display name of the custom metric. */
  displayName?: string;
  /** The minimum visible video duration required (in seconds) in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first). */
  minimumDuration?:
    | "VIDEO_DURATION_UNSPECIFIED"
    | "VIDEO_DURATION_SECONDS_NONE"
    | "VIDEO_DURATION_SECONDS_0"
    | "VIDEO_DURATION_SECONDS_1"
    | "VIDEO_DURATION_SECONDS_2"
    | "VIDEO_DURATION_SECONDS_3"
    | "VIDEO_DURATION_SECONDS_4"
    | "VIDEO_DURATION_SECONDS_5"
    | "VIDEO_DURATION_SECONDS_6"
    | "VIDEO_DURATION_SECONDS_7"
    | "VIDEO_DURATION_SECONDS_8"
    | "VIDEO_DURATION_SECONDS_9"
    | "VIDEO_DURATION_SECONDS_10"
    | "VIDEO_DURATION_SECONDS_11"
    | "VIDEO_DURATION_SECONDS_12"
    | "VIDEO_DURATION_SECONDS_13"
    | "VIDEO_DURATION_SECONDS_14"
    | "VIDEO_DURATION_SECONDS_15"
    | "VIDEO_DURATION_SECONDS_30"
    | "VIDEO_DURATION_SECONDS_45"
    | "VIDEO_DURATION_SECONDS_60"
    | (string & {});
  /** Required. The minimum percentage of the video ad's volume required in order for an impression to be recorded. */
  minimumVolume?:
    | "VIDEO_VOLUME_PERCENT_UNSPECIFIED"
    | "VIDEO_VOLUME_PERCENT_0"
    | "VIDEO_VOLUME_PERCENT_10"
    | (string & {});
  /** The minimum visible video duration required, based on the video quartiles, in order for an impression to be recorded. You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first). */
  minimumQuartile?:
    | "VIDEO_DURATION_QUARTILE_UNSPECIFIED"
    | "VIDEO_DURATION_QUARTILE_NONE"
    | "VIDEO_DURATION_QUARTILE_FIRST"
    | "VIDEO_DURATION_QUARTILE_SECOND"
    | "VIDEO_DURATION_QUARTILE_THIRD"
    | "VIDEO_DURATION_QUARTILE_FOURTH"
    | (string & {});
}

export const ActiveViewVideoViewabilityMetricConfig: Schema.Schema<ActiveViewVideoViewabilityMetricConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minimumViewability: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      minimumDuration: Schema.optional(Schema.String),
      minimumVolume: Schema.optional(Schema.String),
      minimumQuartile: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActiveViewVideoViewabilityMetricConfig",
  }) as any as Schema.Schema<ActiveViewVideoViewabilityMetricConfig>;

export interface FloodlightGroup {
  /** Required. The web tag type enabled for the Floodlight group. */
  webTagType?:
    | "WEB_TAG_TYPE_UNSPECIFIED"
    | "WEB_TAG_TYPE_NONE"
    | "WEB_TAG_TYPE_IMAGE"
    | "WEB_TAG_TYPE_DYNAMIC"
    | (string & {});
  /** The Active View video viewability metric configuration for the Floodlight group. */
  activeViewConfig?: ActiveViewVideoViewabilityMetricConfig;
  /** Required. The display name of the Floodlight group. */
  displayName?: string;
  /** Required. The lookback window for the Floodlight group. Both click_days and impression_days are required. Acceptable values for both are `0` to `90`, inclusive. */
  lookbackWindow?: LookbackWindow;
  /** User-defined custom variables owned by the Floodlight group. Use custom Floodlight variables to create reporting data that is tailored to your unique business needs. Custom Floodlight variables use the keys `U1=`, `U2=`, and so on, and can take any values that you choose to pass to them. You can use them to track virtually any type of data that you collect about your customers, such as the genre of movie that a customer purchases, the country to which the item is shipped, and so on. Custom Floodlight variables may not be used to pass any data that could be used or recognized as personally identifiable information (PII). Example: `custom_variables { fields { "U1": value { number_value: 123.4 }, "U2": value { string_value: "MyVariable2" }, "U3": value { string_value: "MyVariable3" } } }` Acceptable values for keys are "U1" through "U100", inclusive. String values must be less than 64 characters long, and cannot contain the following characters: `"<>`. */
  customVariables?: Record<string, unknown>;
  /** Output only. The resource name of the Floodlight group. */
  name?: string;
  /** Output only. The unique ID of the Floodlight group. Assigned by the system. */
  floodlightGroupId?: string;
}

export const FloodlightGroup: Schema.Schema<FloodlightGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webTagType: Schema.optional(Schema.String),
      activeViewConfig: Schema.optional(ActiveViewVideoViewabilityMetricConfig),
      displayName: Schema.optional(Schema.String),
      lookbackWindow: Schema.optional(LookbackWindow),
      customVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      name: Schema.optional(Schema.String),
      floodlightGroupId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FloodlightGroup",
  }) as any as Schema.Schema<FloodlightGroup>;

export interface FrequencyCap {
  /** The number of time_unit the frequency cap will last. Required when unlimited is `false`. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_MONTHS` - must be 1 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59 */
  timeUnitCount?: number;
  /** The maximum number of times a user may be shown the same ad during this period. Must be greater than 0. Required when unlimited is `false` and max_views is not set. */
  maxImpressions?: number;
  /** Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable. */
  unlimited?: boolean;
  /** The time unit in which the frequency cap will be applied. Required when unlimited is `false`. */
  timeUnit?:
    | "TIME_UNIT_UNSPECIFIED"
    | "TIME_UNIT_LIFETIME"
    | "TIME_UNIT_MONTHS"
    | "TIME_UNIT_WEEKS"
    | "TIME_UNIT_DAYS"
    | "TIME_UNIT_HOURS"
    | "TIME_UNIT_MINUTES"
    | (string & {});
  /** Optional. The maximum number of times a user may click-through or fully view an ad during this period until it is no longer served to them. Must be greater than 0. Only applicable to YouTube and Partners resources. Required when unlimited is `false` and max_impressions is not set. */
  maxViews?: number;
}

export const FrequencyCap: Schema.Schema<FrequencyCap> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeUnitCount: Schema.optional(Schema.Number),
      maxImpressions: Schema.optional(Schema.Number),
      unlimited: Schema.optional(Schema.Boolean),
      timeUnit: Schema.optional(Schema.String),
      maxViews: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "FrequencyCap",
  }) as any as Schema.Schema<FrequencyCap>;

export interface ThirdPartyVendorConfig {
  /** The third-party measurement vendor. */
  vendor?:
    | "THIRD_PARTY_VENDOR_UNSPECIFIED"
    | "THIRD_PARTY_VENDOR_MOAT"
    | "THIRD_PARTY_VENDOR_DOUBLE_VERIFY"
    | "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE"
    | "THIRD_PARTY_VENDOR_COMSCORE"
    | "THIRD_PARTY_VENDOR_TELEMETRY"
    | "THIRD_PARTY_VENDOR_MEETRICS"
    | "THIRD_PARTY_VENDOR_ZEFR"
    | "THIRD_PARTY_VENDOR_NIELSEN"
    | "THIRD_PARTY_VENDOR_KANTAR"
    | "THIRD_PARTY_VENDOR_DYNATA"
    | "THIRD_PARTY_VENDOR_TRANSUNION"
    | "THIRD_PARTY_VENDOR_ORIGIN"
    | "THIRD_PARTY_VENDOR_GEMIUS"
    | "THIRD_PARTY_VENDOR_MEDIA_SCOPE"
    | "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT"
    | "THIRD_PARTY_VENDOR_VIDEO_AMP"
    | "THIRD_PARTY_VENDOR_ISPOT_TV"
    | "THIRD_PARTY_VENDOR_INTAGE"
    | "THIRD_PARTY_VENDOR_MACROMILL"
    | "THIRD_PARTY_VENDOR_VIDEO_RESEARCH"
    | (string & {});
  /** The ID used by the platform of the third-party vendor to identify the line item. */
  placementId?: string;
}

export const ThirdPartyVendorConfig: Schema.Schema<ThirdPartyVendorConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vendor: Schema.optional(Schema.String),
      placementId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThirdPartyVendorConfig",
  }) as any as Schema.Schema<ThirdPartyVendorConfig>;

export interface ThirdPartyMeasurementConfigs {
  /** Optional. The third-party vendors measuring viewability. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS` */
  viewabilityVendorConfigs?: Array<ThirdPartyVendorConfig>;
  /** Optional. The third-party vendors measuring brand safety. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_ZEFR` */
  brandSafetyVendorConfigs?: Array<ThirdPartyVendorConfig>;
  /** Optional. The third-party vendors measuring reach. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_VIDEO_RESEARCH` * `THIRD_PARTY_VENDOR_MEDIA_SCOPE` * `THIRD_PARTY_VENDOR_AUDIENCE_PROJECT` * `THIRD_PARTY_VENDOR_VIDEO_AMP` * `THIRD_PARTY_VENDOR_ISPOT_TV` * `THIRD_PARTY_VENDOR_GEMIUS` */
  reachVendorConfigs?: Array<ThirdPartyVendorConfig>;
  /** Optional. The third-party vendors measuring brand lift. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_INTAGE` * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_MACROMILL` */
  brandLiftVendorConfigs?: Array<ThirdPartyVendorConfig>;
}

export const ThirdPartyMeasurementConfigs: Schema.Schema<ThirdPartyMeasurementConfigs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      viewabilityVendorConfigs: Schema.optional(
        Schema.Array(ThirdPartyVendorConfig),
      ),
      brandSafetyVendorConfigs: Schema.optional(
        Schema.Array(ThirdPartyVendorConfig),
      ),
      reachVendorConfigs: Schema.optional(Schema.Array(ThirdPartyVendorConfig)),
      brandLiftVendorConfigs: Schema.optional(
        Schema.Array(ThirdPartyVendorConfig),
      ),
    }),
  ).annotate({
    identifier: "ThirdPartyMeasurementConfigs",
  }) as any as Schema.Schema<ThirdPartyMeasurementConfigs>;

export interface TargetFrequency {
  /** The target number of times, on average, the ads will be shown to the same person in the timespan dictated by time_unit and time_unit_count. */
  targetCount?: string;
  /** The unit of time in which the target frequency will be applied. The following time unit is applicable: * `TIME_UNIT_WEEKS` */
  timeUnit?:
    | "TIME_UNIT_UNSPECIFIED"
    | "TIME_UNIT_LIFETIME"
    | "TIME_UNIT_MONTHS"
    | "TIME_UNIT_WEEKS"
    | "TIME_UNIT_DAYS"
    | "TIME_UNIT_HOURS"
    | "TIME_UNIT_MINUTES"
    | (string & {});
  /** The number of time_unit the target frequency will last. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_WEEKS` - must be 1 */
  timeUnitCount?: number;
}

export const TargetFrequency: Schema.Schema<TargetFrequency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetCount: Schema.optional(Schema.String),
      timeUnit: Schema.optional(Schema.String),
      timeUnitCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "TargetFrequency",
  }) as any as Schema.Schema<TargetFrequency>;

export interface YoutubeAndPartnersInventorySourceConfig {
  /** Optional. Whether to target inventory in video apps available with Google TV. */
  includeGoogleTv?: boolean;
  /** Optional. Whether to target inventory on YouTube. This includes both search, channels and videos. */
  includeYoutube?: boolean;
  /** Whether to target inventory on a collection of partner sites and apps that follow the same brand safety standards as YouTube. */
  includeYoutubeVideoPartners?: boolean;
}

export const YoutubeAndPartnersInventorySourceConfig: Schema.Schema<YoutubeAndPartnersInventorySourceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      includeGoogleTv: Schema.optional(Schema.Boolean),
      includeYoutube: Schema.optional(Schema.Boolean),
      includeYoutubeVideoPartners: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "YoutubeAndPartnersInventorySourceConfig",
  }) as any as Schema.Schema<YoutubeAndPartnersInventorySourceConfig>;

export interface VideoAdSequenceStep {
  /** The ID of the previous step. The first step does not have previous step. */
  previousStepId?: string;
  /** The ID of the corresponding ad group of the step. */
  adGroupId?: string;
  /** The interaction on the previous step that will lead the viewer to this step. The first step does not have interaction_type. */
  interactionType?:
    | "INTERACTION_TYPE_UNSPECIFIED"
    | "INTERACTION_TYPE_PAID_VIEW"
    | "INTERACTION_TYPE_SKIP"
    | "INTERACTION_TYPE_IMPRESSION"
    | "INTERACTION_TYPE_ENGAGED_IMPRESSION"
    | (string & {});
  /** The ID of the step. */
  stepId?: string;
}

export const VideoAdSequenceStep: Schema.Schema<VideoAdSequenceStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      previousStepId: Schema.optional(Schema.String),
      adGroupId: Schema.optional(Schema.String),
      interactionType: Schema.optional(Schema.String),
      stepId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoAdSequenceStep",
  }) as any as Schema.Schema<VideoAdSequenceStep>;

export interface VideoAdSequenceSettings {
  /** The minimum time interval before the same user sees this sequence again. */
  minimumDuration?:
    | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_UNSPECIFIED"
    | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_WEEK"
    | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_MONTH"
    | (string & {});
  /** The steps of which the sequence consists. */
  steps?: Array<VideoAdSequenceStep>;
}

export const VideoAdSequenceSettings: Schema.Schema<VideoAdSequenceSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minimumDuration: Schema.optional(Schema.String),
      steps: Schema.optional(Schema.Array(VideoAdSequenceStep)),
    }),
  ).annotate({
    identifier: "VideoAdSequenceSettings",
  }) as any as Schema.Schema<VideoAdSequenceSettings>;

export interface YoutubeAndPartnersSettings {
  /** Optional. The ID of the form to generate leads. */
  leadFormId?: string;
  /** Output only. The kind of content on which the YouTube and Partners ads will be shown. *Warning*: This field will be removed in the near future. Use effective_content_category instead. */
  contentCategory?:
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED"
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD"
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED"
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED"
    | (string & {});
  /** Optional. The ID of the merchant which is linked to the line item for product feed. */
  linkedMerchantId?: string;
  /** The view frequency cap settings of the line item. The max_views field in this settings object must be used if assigning a limited cap. */
  viewFrequencyCap?: FrequencyCap;
  /** Optional. The third-party measurement configs of the line item. */
  thirdPartyMeasurementConfigs?: ThirdPartyMeasurementConfigs;
  /** Output only. The content category which takes effect when serving the line item. When content category is set in both line item and advertiser, the stricter one will take effect when serving the line item. New line items will only inherit the advertiser level setting. */
  effectiveContentCategory?:
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED"
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD"
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED"
    | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED"
    | (string & {});
  /** Optional. The average number of times you want ads from this line item to show to the same person over a certain period of time. */
  targetFrequency?: TargetFrequency;
  /** Optional. The IDs of the videos appear below the primary video ad when the ad is playing in the YouTube app on mobile devices. */
  relatedVideoIds?: Array<string>;
  /** Settings that control what YouTube and Partners inventories the line item will target. */
  inventorySourceSettings?: YoutubeAndPartnersInventorySourceConfig;
  /** Optional. The settings related to VideoAdSequence. */
  videoAdSequenceSettings?: VideoAdSequenceSettings;
  /** Optional. The settings to control which inventory is allowed for this line item. */
  videoAdInventoryControl?: VideoAdInventoryControl;
}

export const YoutubeAndPartnersSettings: Schema.Schema<YoutubeAndPartnersSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      leadFormId: Schema.optional(Schema.String),
      contentCategory: Schema.optional(Schema.String),
      linkedMerchantId: Schema.optional(Schema.String),
      viewFrequencyCap: Schema.optional(FrequencyCap),
      thirdPartyMeasurementConfigs: Schema.optional(
        ThirdPartyMeasurementConfigs,
      ),
      effectiveContentCategory: Schema.optional(Schema.String),
      targetFrequency: Schema.optional(TargetFrequency),
      relatedVideoIds: Schema.optional(Schema.Array(Schema.String)),
      inventorySourceSettings: Schema.optional(
        YoutubeAndPartnersInventorySourceConfig,
      ),
      videoAdSequenceSettings: Schema.optional(VideoAdSequenceSettings),
      videoAdInventoryControl: Schema.optional(VideoAdInventoryControl),
    }),
  ).annotate({
    identifier: "YoutubeAndPartnersSettings",
  }) as any as Schema.Schema<YoutubeAndPartnersSettings>;

export interface TargetingExpansionConfig {
  /** Required. Whether to enable Optimized Targeting for the line item. Optimized targeting is not compatible with all bid strategies. Attempting to set this field to `true` for a line item using the BiddingStrategy field fixed_bid or one of the following combinations of BiddingStrategy fields and BiddingStrategyPerformanceGoalType will result in an error: maximize_auto_spend_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` performance_goal_auto_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` This also applies if the line item inherits one of the above bid strategies from the parent insertion order. Bid strategies set at the insertion order-level will be inherited by their line items if the `InsertionOrder` budget field automationType is set to `INSERTION_ORDER_AUTOMATION_TYPE_BUDGET` or `INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET`. */
  enableOptimizedTargeting?: boolean;
  /** Output only. Whether to exclude seed list for audience expansion. This field only applies to YouTube and Partners line item and ad group resources. */
  audienceExpansionSeedListExcluded?: boolean;
  /** Output only. Magnitude of expansion for eligible first-party user lists under this ad group. This field only applies to YouTube and Partners line item and ad group resources. */
  audienceExpansionLevel?:
    | "UNKNOWN"
    | "NO_REACH"
    | "LEAST_REACH"
    | "MID_REACH"
    | "MOST_REACH"
    | (string & {});
}

export const TargetingExpansionConfig: Schema.Schema<TargetingExpansionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableOptimizedTargeting: Schema.optional(Schema.Boolean),
      audienceExpansionSeedListExcluded: Schema.optional(Schema.Boolean),
      audienceExpansionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TargetingExpansionConfig",
  }) as any as Schema.Schema<TargetingExpansionConfig>;

export interface LineItemBudget {
  /** Required. The type of the budget allocation. `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC` is only applicable when automatic budget allocation is enabled for the parent insertion order. For demand gen line items, budget allocation type must be `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`. Demand Gen line items do not support other budget allocation types. */
  budgetAllocationType?:
    | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNSPECIFIED"
    | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC"
    | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED"
    | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED"
    | (string & {});
  /** The maximum budget amount the line item will spend. Must be greater than 0. When budget_allocation_type is: * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC`, this field is immutable and is set by the system. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`, if budget_unit is: - `BUDGET_UNIT_CURRENCY`, this field represents maximum budget amount to spend, in micros of the advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. - `BUDGET_UNIT_IMPRESSIONS`, this field represents the maximum number of impressions to serve. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED`, this field is not applicable and will be ignored by the system. */
  maxAmount?: string;
  /** Output only. The budget unit specifies whether the budget is currency based or impression based. This value is inherited from the parent insertion order. */
  budgetUnit?:
    | "BUDGET_UNIT_UNSPECIFIED"
    | "BUDGET_UNIT_CURRENCY"
    | "BUDGET_UNIT_IMPRESSIONS"
    | (string & {});
}

export const LineItemBudget: Schema.Schema<LineItemBudget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      budgetAllocationType: Schema.optional(Schema.String),
      maxAmount: Schema.optional(Schema.String),
      budgetUnit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LineItemBudget",
  }) as any as Schema.Schema<LineItemBudget>;

export interface MaximizeSpendBidStrategy {
  /** Required. The type of the performance goal that the bidding strategy tries to minimize while spending the full budget. `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` is not supported for this strategy. */
  performanceGoalType?:
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED"
    | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH"
    | (string & {});
  /** The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. For example, 1500000 represents 1.5 standard units of the currency. */
  maxAverageCpmBidAmountMicros?: string;
  /** The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error. */
  customBiddingAlgorithmId?: string;
  /** Whether the strategy takes deal floor prices into account. */
  raiseBidForDeals?: boolean;
}

export const MaximizeSpendBidStrategy: Schema.Schema<MaximizeSpendBidStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      performanceGoalType: Schema.optional(Schema.String),
      maxAverageCpmBidAmountMicros: Schema.optional(Schema.String),
      customBiddingAlgorithmId: Schema.optional(Schema.String),
      raiseBidForDeals: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MaximizeSpendBidStrategy",
  }) as any as Schema.Schema<MaximizeSpendBidStrategy>;

export interface YoutubeAndPartnersBiddingStrategy {
  /** The type of the bidding strategy. */
  type?:
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_UNSPECIFIED"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_LIFT"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPV"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS"
    | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE"
    | (string & {});
  /** The value used by the bidding strategy. When the bidding strategy is assigned at the line item level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_SHARE_OF_VOICE` When the bidding strategy is assigned at the ad group level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` If not using an applicable strategy, the value of this field will be 0. */
  value?: string;
  /** Output only. The effective target CPA for ad group, in micros of advertiser's currency. */
  adGroupEffectiveTargetCpaValue?: string;
  /** Output only. Source of the effective target CPA value for ad group. */
  adGroupEffectiveTargetCpaSource?:
    | "BIDDING_SOURCE_UNSPECIFIED"
    | "BIDDING_SOURCE_LINE_ITEM"
    | "BIDDING_SOURCE_AD_GROUP"
    | (string & {});
}

export const YoutubeAndPartnersBiddingStrategy: Schema.Schema<YoutubeAndPartnersBiddingStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      adGroupEffectiveTargetCpaValue: Schema.optional(Schema.String),
      adGroupEffectiveTargetCpaSource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YoutubeAndPartnersBiddingStrategy",
  }) as any as Schema.Schema<YoutubeAndPartnersBiddingStrategy>;

export interface DemandGenBiddingStrategy {
  /** Output only. Source of the effective bidding value. */
  effectiveBiddingValueSource?:
    | "BIDDING_SOURCE_UNSPECIFIED"
    | "BIDDING_SOURCE_LINE_ITEM"
    | "BIDDING_SOURCE_AD_GROUP"
    | (string & {});
  /** Optional. The type of the bidding strategy. This can only be set at the line item level. */
  type?:
    | "DEMAND_GEN_BIDDING_STRATEGY_TYPE_UNSPECIFIED"
    | "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA"
    | "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS"
    | "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS"
    | "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE"
    | "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CLICKS"
    | (string & {});
  /** Optional. The value used by the bidding strategy. This can be set at the line item and ad group level. This field is only applicable for the following strategy types: * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS` Value of this field is in micros of the advertiser's currency or ROAS value. For example, 1000000 represents 1.0 standard units of the currency or 100% ROAS value. If not using an applicable strategy, the value of this field will be 0. */
  value?: string;
  /** Output only. If AG doesn't set value for tCPA or tROAS, line item bidding value will be the effective_bidding_value, if the bidding strategy type is not tCPA or tROAS, effective_bidding_value is always 0. For line item, it will be the same as the value field. */
  effectiveBiddingValue?: string;
}

export const DemandGenBiddingStrategy: Schema.Schema<DemandGenBiddingStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      effectiveBiddingValueSource: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      effectiveBiddingValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DemandGenBiddingStrategy",
  }) as any as Schema.Schema<DemandGenBiddingStrategy>;

export interface BiddingStrategy {
  /** A strategy that uses a fixed bid price. */
  fixedBid?: FixedBidStrategy;
  /** A strategy that automatically adjusts the bid to optimize to your performance goal while spending the full budget. At insertion order level, the markup_type of line items cannot be set to `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`. In addition, the performance_goal_type value assigned to an insertion order determines the possible line_item_type values available for line items under that insertion order: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, and `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` only allow for `LINE_ITEM_TYPE_DISPLAY_DEFAULT` or `LINE_ITEM_TYPE_VIDEO_DEFAULT` line items. * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` and `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` only allow for `LINE_ITEM_TYPE_VIDEO_DEFAULT` line items. * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH` only allows for `LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP` line items. */
  maximizeSpendAutoBid?: MaximizeSpendBidStrategy;
  /** A strategy that automatically adjusts the bid to meet or beat a specified performance goal. It is to be used only for a line item entity. */
  performanceGoalAutoBid?: PerformanceGoalBidStrategy;
  /** A bid strategy used by YouTube and Partners resources. It can only be used for a YouTube and Partners line item or ad group entity. */
  youtubeAndPartnersBid?: YoutubeAndPartnersBiddingStrategy;
  /** A bid strategy used by Demand Gen resources. It can only be used for a Demand Gen line item or ad group entity. */
  demandGenBid?: DemandGenBiddingStrategy;
}

export const BiddingStrategy: Schema.Schema<BiddingStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fixedBid: Schema.optional(FixedBidStrategy),
      maximizeSpendAutoBid: Schema.optional(MaximizeSpendBidStrategy),
      performanceGoalAutoBid: Schema.optional(PerformanceGoalBidStrategy),
      youtubeAndPartnersBid: Schema.optional(YoutubeAndPartnersBiddingStrategy),
      demandGenBid: Schema.optional(DemandGenBiddingStrategy),
    }),
  ).annotate({
    identifier: "BiddingStrategy",
  }) as any as Schema.Schema<BiddingStrategy>;

export interface PartnerRevenueModel {
  /** Required. The markup type of the partner revenue model. Demand Gen line items only support `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`. */
  markupType?:
    | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_UNSPECIFIED"
    | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM"
    | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP"
    | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP"
    | (string & {});
  /** Required. The markup amount of the partner revenue model. Must be greater than or equal to 0. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`, this field represents the CPM markup in micros of advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP`, this field represents the media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`, this field represents the total media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). */
  markupAmount?: string;
}

export const PartnerRevenueModel: Schema.Schema<PartnerRevenueModel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      markupType: Schema.optional(Schema.String),
      markupAmount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PartnerRevenueModel",
  }) as any as Schema.Schema<PartnerRevenueModel>;

export interface IntegrationDetails {
  /** Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters. */
  details?: string;
  /** An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters. */
  integrationCode?: string;
}

export const IntegrationDetails: Schema.Schema<IntegrationDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.String),
      integrationCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IntegrationDetails",
  }) as any as Schema.Schema<IntegrationDetails>;

export interface LineItemFlight {
  /** Required. The type of the line item's flight dates. */
  flightDateType?:
    | "LINE_ITEM_FLIGHT_DATE_TYPE_UNSPECIFIED"
    | "LINE_ITEM_FLIGHT_DATE_TYPE_INHERITED"
    | "LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM"
    | (string & {});
  /** The flight start and end dates of the line item. They are resolved relative to the parent advertiser's time zone. * Required when flight_date_type is `LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM`. Output only otherwise. * When creating a new flight, both `start_date` and `end_date` must be in the future. * An existing flight with a `start_date` in the past has a mutable `end_date` but an immutable `start_date`. * `end_date` must be the `start_date` or later, both before the year 2037. */
  dateRange?: DateRange;
}

export const LineItemFlight: Schema.Schema<LineItemFlight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flightDateType: Schema.optional(Schema.String),
      dateRange: Schema.optional(DateRange),
    }),
  ).annotate({
    identifier: "LineItemFlight",
  }) as any as Schema.Schema<LineItemFlight>;

export interface TrackingFloodlightActivityConfig {
  /** Required. The number of days after an ad has been clicked in which a conversion may be counted. Must be between 0 and 90 inclusive. */
  postClickLookbackWindowDays?: number;
  /** Required. The ID of the Floodlight activity. */
  floodlightActivityId?: string;
  /** Required. The number of days after an ad has been viewed in which a conversion may be counted. Must be between 0 and 90 inclusive. */
  postViewLookbackWindowDays?: number;
}

export const TrackingFloodlightActivityConfig: Schema.Schema<TrackingFloodlightActivityConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postClickLookbackWindowDays: Schema.optional(Schema.Number),
      floodlightActivityId: Schema.optional(Schema.String),
      postViewLookbackWindowDays: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "TrackingFloodlightActivityConfig",
  }) as any as Schema.Schema<TrackingFloodlightActivityConfig>;

export interface ConversionCountingConfig {
  /** Optional. The attribution model to use for conversion measurement. This attribution model will determine how conversions are counted. The Primary model can be set by you for a floodlight config or group. More details [here](https://support.google.com/displayvideo/answer/7409983). Only applicable to Demand Gen line items. */
  primaryAttributionModelId?: string;
  /** The percentage of post-view conversions to count, in millis (1/1000 of a percent). Must be between 0 and 100000 inclusive. For example, to track 50% of the post-click conversions, set a value of 50000. */
  postViewCountPercentageMillis?: string;
  /** The Floodlight activity configs used to track conversions. The number of conversions counted is the sum of all of the conversions counted by all of the Floodlight activity IDs specified in this field. This field can't be updated if a custom bidding algorithm is assigned to the line item. If you set this field and assign a custom bidding algorithm in the same request, the floodlight activities must match the ones used by the custom bidding algorithm. */
  floodlightActivityConfigs?: Array<TrackingFloodlightActivityConfig>;
}

export const ConversionCountingConfig: Schema.Schema<ConversionCountingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      primaryAttributionModelId: Schema.optional(Schema.String),
      postViewCountPercentageMillis: Schema.optional(Schema.String),
      floodlightActivityConfigs: Schema.optional(
        Schema.Array(TrackingFloodlightActivityConfig),
      ),
    }),
  ).annotate({
    identifier: "ConversionCountingConfig",
  }) as any as Schema.Schema<ConversionCountingConfig>;

export interface MobileApp {
  /** Required. The ID of the app provided by the platform store. Android apps are identified by the bundle ID used by Android's Play store, such as `com.google.android.gm`. iOS apps are identified by a nine-digit app ID used by Apple's App store, such as `422689480`. */
  appId?: string;
  /** Output only. The app name. */
  displayName?: string;
  /** Output only. The app platform. */
  platform?: "PLATFORM_UNSPECIFIED" | "IOS" | "ANDROID" | (string & {});
  /** Output only. The app publisher. */
  publisher?: string;
}

export const MobileApp: Schema.Schema<MobileApp> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      platform: Schema.optional(Schema.String),
      publisher: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "MobileApp" }) as any as Schema.Schema<MobileApp>;

export interface DemandGenSettings {
  /** Optional. The ID of the merchant which is linked to the line item for product feed. */
  linkedMerchantId?: string;
  /** Optional. Immutable. Whether location and language targeting can be set at the line item level. Otherwise, relevant targeting types must be assigned directly to the ad groups. */
  geoLanguageTargetingEnabled?: boolean;
  /** Optional. The third party measurement settings for the Demand Gen line item. */
  thirdPartyMeasurementConfigs?: ThirdPartyMeasurementConfigs;
}

export const DemandGenSettings: Schema.Schema<DemandGenSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      linkedMerchantId: Schema.optional(Schema.String),
      geoLanguageTargetingEnabled: Schema.optional(Schema.Boolean),
      thirdPartyMeasurementConfigs: Schema.optional(
        ThirdPartyMeasurementConfigs,
      ),
    }),
  ).annotate({
    identifier: "DemandGenSettings",
  }) as any as Schema.Schema<DemandGenSettings>;

export interface PartnerCost {
  /** The CPM fee amount in micros of advertiser's currency. Applicable when the fee_type is `PARTNER_FEE_TYPE_CPM_FEE`. Must be greater than or equal to 0. For example, for 1.5 standard unit of the advertiser's currency, set this field to 1500000. */
  feeAmount?: string;
  /** The media fee percentage in millis (1/1000 of a percent). Applicable when the fee_type is `PARTNER_FEE_TYPE_MEDIA_FEE`. Must be greater than or equal to 0. For example: 100 represents 0.1%. */
  feePercentageMillis?: string;
  /** Required. The type of the partner cost. */
  costType?:
    | "PARTNER_COST_TYPE_UNSPECIFIED"
    | "PARTNER_COST_TYPE_ADLOOX"
    | "PARTNER_COST_TYPE_ADLOOX_PREBID"
    | "PARTNER_COST_TYPE_ADSAFE"
    | "PARTNER_COST_TYPE_ADXPOSE"
    | "PARTNER_COST_TYPE_AGGREGATE_KNOWLEDGE"
    | "PARTNER_COST_TYPE_AGENCY_TRADING_DESK"
    | "PARTNER_COST_TYPE_DV360_FEE"
    | "PARTNER_COST_TYPE_COMSCORE_VCE"
    | "PARTNER_COST_TYPE_DATA_MANAGEMENT_PLATFORM"
    | "PARTNER_COST_TYPE_DEFAULT"
    | "PARTNER_COST_TYPE_DOUBLE_VERIFY"
    | "PARTNER_COST_TYPE_DOUBLE_VERIFY_PREBID"
    | "PARTNER_COST_TYPE_EVIDON"
    | "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_VIDEO"
    | "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_PREBID"
    | "PARTNER_COST_TYPE_MEDIA_COST_DATA"
    | "PARTNER_COST_TYPE_MOAT_VIDEO"
    | "PARTNER_COST_TYPE_NIELSEN_DAR"
    | "PARTNER_COST_TYPE_SHOP_LOCAL"
    | "PARTNER_COST_TYPE_TERACENT"
    | "PARTNER_COST_TYPE_THIRD_PARTY_AD_SERVER"
    | "PARTNER_COST_TYPE_TRUST_METRICS"
    | "PARTNER_COST_TYPE_VIZU"
    | "PARTNER_COST_TYPE_CUSTOM_FEE_1"
    | "PARTNER_COST_TYPE_CUSTOM_FEE_2"
    | "PARTNER_COST_TYPE_CUSTOM_FEE_3"
    | "PARTNER_COST_TYPE_CUSTOM_FEE_4"
    | "PARTNER_COST_TYPE_CUSTOM_FEE_5"
    | "PARTNER_COST_TYPE_SCIBIDS_FEE"
    | (string & {});
  /** Required. The fee type for this partner cost. */
  feeType?:
    | "PARTNER_COST_FEE_TYPE_UNSPECIFIED"
    | "PARTNER_COST_FEE_TYPE_CPM_FEE"
    | "PARTNER_COST_FEE_TYPE_MEDIA_FEE"
    | (string & {});
  /** The invoice type for this partner cost. * Required when cost_type is one of: - `PARTNER_COST_TYPE_ADLOOX` - `PARTNER_COST_TYPE_DOUBLE_VERIFY` - `PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE`. * Output only for other types. */
  invoiceType?:
    | "PARTNER_COST_INVOICE_TYPE_UNSPECIFIED"
    | "PARTNER_COST_INVOICE_TYPE_DV360"
    | "PARTNER_COST_INVOICE_TYPE_PARTNER"
    | (string & {});
}

export const PartnerCost: Schema.Schema<PartnerCost> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feeAmount: Schema.optional(Schema.String),
      feePercentageMillis: Schema.optional(Schema.String),
      costType: Schema.optional(Schema.String),
      feeType: Schema.optional(Schema.String),
      invoiceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PartnerCost",
  }) as any as Schema.Schema<PartnerCost>;

export interface LineItem {
  /** Output only. Settings specific to YouTube and Partners line items. */
  youtubeAndPartnersSettings?: YoutubeAndPartnersSettings;
  /** Optional. The impression frequency cap settings of the line item. The max_impressions field in this settings object must be used if assigning a limited cap. This field is REQUIRED for all line item types excluding LINE_ITEM_TYPE_DEMAND_GEN. */
  frequencyCap?: FrequencyCap;
  /** Required. Immutable. The type of the line item. */
  lineItemType?:
    | "LINE_ITEM_TYPE_UNSPECIFIED"
    | "LINE_ITEM_TYPE_DISPLAY_DEFAULT"
    | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL"
    | "LINE_ITEM_TYPE_VIDEO_DEFAULT"
    | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL"
    | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INVENTORY"
    | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INVENTORY"
    | "LINE_ITEM_TYPE_AUDIO_DEFAULT"
    | "LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_ACTION"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_AUDIO"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE_OVER_THE_TOP"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH_OVER_THE_TOP"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE_OVER_THE_TOP"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_TARGET_FREQUENCY"
    | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIEW"
    | "LINE_ITEM_TYPE_DISPLAY_OUT_OF_HOME"
    | "LINE_ITEM_TYPE_VIDEO_OUT_OF_HOME"
    | "LINE_ITEM_TYPE_DEMAND_GEN"
    | (string & {});
  /** The [optimized targeting](//support.google.com/displayvideo/answer/12060859) settings of the line item. This config is only applicable for display, video, or audio line items that use automated bidding and positively target eligible audience lists. */
  targetingExpansion?: TargetingExpansionConfig;
  /** Required. The budget spending speed setting of the line item. */
  pacing?: Pacing;
  /** Output only. The unique ID of the line item. Assigned by the system. */
  lineItemId?: string;
  /** Required. The budget allocation setting of the line item. */
  budget?: LineItemBudget;
  /** Output only. The timestamp when the line item was last updated. Assigned by the system. */
  updateTime?: string;
  /** Output only. The unique ID of the campaign that the line item belongs to. */
  campaignId?: string;
  /** Required. The bidding strategy of the line item. */
  bidStrategy?: BiddingStrategy;
  /** Required. Controls whether or not the line item can spend its budget and bid on inventory. * For CreateLineItem method, only `ENTITY_STATUS_DRAFT` is allowed. To activate a line item, use UpdateLineItem method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * A line item cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * If the line item's parent insertion order is not active, the line item can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Required. The partner revenue model setting of the line item. */
  partnerRevenueModel?: PartnerRevenueModel;
  /** Whether this line item will serve European Union political ads. If contains_eu_political_ads has been set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` in the parent advertiser, then this field will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. This field can then be updated using the UI, API, or Structured Data Files. This field must be assigned when creating a new line item. Otherwise, **the `advertisers.lineItems.create` request will fail**. */
  containsEuPoliticalAds?:
    | "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN"
    | "CONTAINS_EU_POLITICAL_ADVERTISING"
    | "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING"
    | (string & {});
  /** Output only. The resource name of the line item. */
  name?: string;
  /** Integration details of the line item. */
  integrationDetails?: IntegrationDetails;
  /** Required. The display name of the line item. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Output only. The warning messages generated by the line item. These warnings do not block saving the line item, but some may block the line item from running. */
  warningMessages?: Array<
    | "LINE_ITEM_WARNING_MESSAGE_UNSPECIFIED"
    | "INVALID_FLIGHT_DATES"
    | "EXPIRED"
    | "PENDING_FLIGHT"
    | "ALL_PARTNER_ENABLED_EXCHANGES_NEGATIVELY_TARGETED"
    | "INVALID_INVENTORY_SOURCE"
    | "APP_INVENTORY_INVALID_SITE_TARGETING"
    | "APP_INVENTORY_INVALID_AUDIENCE_LISTS"
    | "NO_VALID_CREATIVE"
    | "PARENT_INSERTION_ORDER_PAUSED"
    | "PARENT_INSERTION_ORDER_EXPIRED"
    | (string & {})
  >;
  /** The IDs of the creatives associated with the line item. */
  creativeIds?: Array<string>;
  /** Whether to exclude new exchanges from automatically being targeted by the line item. This field is false by default. */
  excludeNewExchanges?: boolean;
  /** Output only. The unique ID of the advertiser the line item belongs to. */
  advertiserId?: string;
  /** Required. The start and end time of the line item's flight. */
  flight?: LineItemFlight;
  /** The conversion tracking setting of the line item. */
  conversionCounting?: ConversionCountingConfig;
  /** The mobile app promoted by the line item. This is applicable only when line_item_type is either `LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL` or `LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL`. */
  mobileApp?: MobileApp;
  /** Optional. Settings specific to Demand Gen line items. */
  demandGenSettings?: DemandGenSettings;
  /** The partner costs associated with the line item. If absent or empty in CreateLineItem method, the newly created line item will inherit partner costs from its parent insertion order. */
  partnerCosts?: Array<PartnerCost>;
  /** Required. Immutable. The unique ID of the insertion order that the line item belongs to. */
  insertionOrderId?: string;
  /** Output only. The reservation type of the line item. */
  reservationType?:
    | "RESERVATION_TYPE_UNSPECIFIED"
    | "RESERVATION_TYPE_NOT_GUARANTEED"
    | "RESERVATION_TYPE_PROGRAMMATIC_GUARANTEED"
    | "RESERVATION_TYPE_TAG_GUARANTEED"
    | "RESERVATION_TYPE_PETRA_VIRAL"
    | "RESERVATION_TYPE_INSTANT_RESERVE"
    | (string & {});
}

export const LineItem: Schema.Schema<LineItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      youtubeAndPartnersSettings: Schema.optional(YoutubeAndPartnersSettings),
      frequencyCap: Schema.optional(FrequencyCap),
      lineItemType: Schema.optional(Schema.String),
      targetingExpansion: Schema.optional(TargetingExpansionConfig),
      pacing: Schema.optional(Pacing),
      lineItemId: Schema.optional(Schema.String),
      budget: Schema.optional(LineItemBudget),
      updateTime: Schema.optional(Schema.String),
      campaignId: Schema.optional(Schema.String),
      bidStrategy: Schema.optional(BiddingStrategy),
      entityStatus: Schema.optional(Schema.String),
      partnerRevenueModel: Schema.optional(PartnerRevenueModel),
      containsEuPoliticalAds: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      integrationDetails: Schema.optional(IntegrationDetails),
      displayName: Schema.optional(Schema.String),
      warningMessages: Schema.optional(Schema.Array(Schema.String)),
      creativeIds: Schema.optional(Schema.Array(Schema.String)),
      excludeNewExchanges: Schema.optional(Schema.Boolean),
      advertiserId: Schema.optional(Schema.String),
      flight: Schema.optional(LineItemFlight),
      conversionCounting: Schema.optional(ConversionCountingConfig),
      mobileApp: Schema.optional(MobileApp),
      demandGenSettings: Schema.optional(DemandGenSettings),
      partnerCosts: Schema.optional(Schema.Array(PartnerCost)),
      insertionOrderId: Schema.optional(Schema.String),
      reservationType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "LineItem" }) as any as Schema.Schema<LineItem>;

export interface ListLineItemsResponse {
  /** The list of line items. This list will be absent if empty. */
  lineItems?: Array<LineItem>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListLineItems` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListLineItemsResponse: Schema.Schema<ListLineItemsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineItems: Schema.optional(Schema.Array(LineItem)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLineItemsResponse",
  }) as any as Schema.Schema<ListLineItemsResponse>;

export interface CreateAssetRequest {
  /** Required. The filename of the asset, including the file extension. The filename must be UTF-8 encoded with a maximum size of 240 bytes. */
  filename?: string;
}

export const CreateAssetRequest: Schema.Schema<CreateAssetRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      filename: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateAssetRequest",
  }) as any as Schema.Schema<CreateAssetRequest>;

export interface BulkCreateAdAssetsRequest {
  /** Required. Ad assets to create. Only supports assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
  adAssets?: Array<AdAsset>;
}

export const BulkCreateAdAssetsRequest: Schema.Schema<BulkCreateAdAssetsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAssets: Schema.optional(Schema.Array(AdAsset)),
    }),
  ).annotate({
    identifier: "BulkCreateAdAssetsRequest",
  }) as any as Schema.Schema<BulkCreateAdAssetsRequest>;

export interface ParentEntityFilter {
  /** Required. File types that will be returned. */
  fileType?: Array<
    | "FILE_TYPE_UNSPECIFIED"
    | "FILE_TYPE_CAMPAIGN"
    | "FILE_TYPE_MEDIA_PRODUCT"
    | "FILE_TYPE_INSERTION_ORDER"
    | "FILE_TYPE_LINE_ITEM"
    | "FILE_TYPE_AD_GROUP"
    | "FILE_TYPE_AD"
    | "FILE_TYPE_LINE_ITEM_QA"
    | "FILE_TYPE_AD_GROUP_QA"
    | (string & {})
  >;
  /** Required. Filter type used to filter fetched entities. */
  filterType?:
    | "FILTER_TYPE_UNSPECIFIED"
    | "FILTER_TYPE_NONE"
    | "FILTER_TYPE_ADVERTISER_ID"
    | "FILTER_TYPE_CAMPAIGN_ID"
    | "FILTER_TYPE_MEDIA_PRODUCT_ID"
    | "FILTER_TYPE_INSERTION_ORDER_ID"
    | "FILTER_TYPE_LINE_ITEM_ID"
    | (string & {});
  /** The IDs of the specified filter type. This is used to filter entities to fetch. If filter type is not `FILTER_TYPE_NONE`, at least one ID must be specified. */
  filterIds?: Array<string>;
}

export const ParentEntityFilter: Schema.Schema<ParentEntityFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileType: Schema.optional(Schema.Array(Schema.String)),
      filterType: Schema.optional(Schema.String),
      filterIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ParentEntityFilter",
  }) as any as Schema.Schema<ParentEntityFilter>;

export interface InventorySourceFilter {
  /** Inventory Sources to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. Leave empty to download all Inventory Sources for the selected Advertiser or Partner. */
  inventorySourceIds?: Array<string>;
}

export const InventorySourceFilter: Schema.Schema<InventorySourceFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySourceIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "InventorySourceFilter",
  }) as any as Schema.Schema<InventorySourceFilter>;

export interface IdFilter {
  /** Insertion Orders to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  insertionOrderIds?: Array<string>;
  /** Campaigns to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  campaignIds?: Array<string>;
  /** YouTube Ads to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  adGroupAdIds?: Array<string>;
  /** Optional. Line Items, by ID, to download in QA format. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  lineItemQaIds?: Array<string>;
  /** Line Items to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  lineItemIds?: Array<string>;
  /** YouTube Ad Groups to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  adGroupIds?: Array<string>;
  /** Optional. YouTube Ad Groups, by ID, to download in QA format. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  adGroupQaIds?: Array<string>;
  /** Media Products to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. */
  mediaProductIds?: Array<string>;
}

export const IdFilter: Schema.Schema<IdFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      insertionOrderIds: Schema.optional(Schema.Array(Schema.String)),
      campaignIds: Schema.optional(Schema.Array(Schema.String)),
      adGroupAdIds: Schema.optional(Schema.Array(Schema.String)),
      lineItemQaIds: Schema.optional(Schema.Array(Schema.String)),
      lineItemIds: Schema.optional(Schema.Array(Schema.String)),
      adGroupIds: Schema.optional(Schema.Array(Schema.String)),
      adGroupQaIds: Schema.optional(Schema.Array(Schema.String)),
      mediaProductIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "IdFilter" }) as any as Schema.Schema<IdFilter>;

export interface CreateSdfDownloadTaskRequest {
  /** The ID of the advertiser to download SDF for. */
  advertiserId?: string;
  /** The ID of the partner to download SDF for. */
  partnerId?: string;
  /** Filters on selected file types. The entities in each file are filtered by a chosen set of filter entities. The filter entities must be the same type as, or a parent type of, the selected file types. */
  parentEntityFilter?: ParentEntityFilter;
  /** Filters on Inventory Sources by their IDs. */
  inventorySourceFilter?: InventorySourceFilter;
  /** Required. The SDF version of the downloaded file. If set to `SDF_VERSION_UNSPECIFIED`, this will default to the version specified by the advertiser or partner identified by `root_id`. An advertiser inherits its SDF version from its partner unless configured otherwise. */
  version?:
    | "SDF_VERSION_UNSPECIFIED"
    | "SDF_VERSION_3_1"
    | "SDF_VERSION_4"
    | "SDF_VERSION_4_1"
    | "SDF_VERSION_4_2"
    | "SDF_VERSION_5"
    | "SDF_VERSION_5_1"
    | "SDF_VERSION_5_2"
    | "SDF_VERSION_5_3"
    | "SDF_VERSION_5_4"
    | "SDF_VERSION_5_5"
    | "SDF_VERSION_6"
    | "SDF_VERSION_7"
    | "SDF_VERSION_7_1"
    | "SDF_VERSION_8"
    | "SDF_VERSION_8_1"
    | "SDF_VERSION_9"
    | "SDF_VERSION_9_1"
    | "SDF_VERSION_9_2"
    | (string & {});
  /** Filters on entities by their entity IDs. */
  idFilter?: IdFilter;
}

export const CreateSdfDownloadTaskRequest: Schema.Schema<CreateSdfDownloadTaskRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertiserId: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      parentEntityFilter: Schema.optional(ParentEntityFilter),
      inventorySourceFilter: Schema.optional(InventorySourceFilter),
      version: Schema.optional(Schema.String),
      idFilter: Schema.optional(IdFilter),
    }),
  ).annotate({
    identifier: "CreateSdfDownloadTaskRequest",
  }) as any as Schema.Schema<CreateSdfDownloadTaskRequest>;

export interface ContactInfo {
  /** SHA256 hashed last name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_first_name * zip_codes */
  hashedLastName?: string;
  /** A list of SHA256 hashed phone numbers of the member. Before hashing, all phone numbers must be formatted using the [E.164 format](//en.wikipedia.org/wiki/E.164) and include the country calling code. */
  hashedPhoneNumbers?: Array<string>;
  /** A list of zip codes of the member. Must also be set with the following fields: * country_code * hashed_first_name * hashed_last_name */
  zipCodes?: Array<string>;
  /** Country code of the member. Must also be set with the following fields: * hashed_first_name * hashed_last_name * zip_codes */
  countryCode?: string;
  /** SHA256 hashed first name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_last_name * zip_codes */
  hashedFirstName?: string;
  /** A list of SHA256 hashed email of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. */
  hashedEmails?: Array<string>;
}

export const ContactInfo: Schema.Schema<ContactInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hashedLastName: Schema.optional(Schema.String),
      hashedPhoneNumbers: Schema.optional(Schema.Array(Schema.String)),
      zipCodes: Schema.optional(Schema.Array(Schema.String)),
      countryCode: Schema.optional(Schema.String),
      hashedFirstName: Schema.optional(Schema.String),
      hashedEmails: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ContactInfo",
  }) as any as Schema.Schema<ContactInfo>;

export interface CustomBiddingAlgorithmRulesRef {
  /** A resource name to be used in media.download to download the rules files. Or media.upload to upload the rules files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/rulesRef/{ref_id}`. */
  resourceName?: string;
}

export const CustomBiddingAlgorithmRulesRef: Schema.Schema<CustomBiddingAlgorithmRulesRef> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingAlgorithmRulesRef",
  }) as any as Schema.Schema<CustomBiddingAlgorithmRulesRef>;

export interface Kpi {
  /** A KPI string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when kpi_type is `KPI_TYPE_OTHER`. */
  kpiString?: string;
  /** Optional. Custom Bidding Algorithm ID associated with KPI_CUSTOM_IMPRESSION_VALUE_OVER_COST. This field is ignored if the proper KPI is not selected. */
  kpiAlgorithmId?: string;
  /** The goal amount, in micros of the advertiser's currency. Applicable when kpi_type is one of: * `KPI_TYPE_CPM` * `KPI_TYPE_CPC` * `KPI_TYPE_CPA` * `KPI_TYPE_CPIAVC` * `KPI_TYPE_VCPM` For example: 1500000 represents 1.5 standard units of the currency. */
  kpiAmountMicros?: string;
  /** Required. The type of KPI. */
  kpiType?:
    | "KPI_TYPE_UNSPECIFIED"
    | "KPI_TYPE_CPM"
    | "KPI_TYPE_CPC"
    | "KPI_TYPE_CPA"
    | "KPI_TYPE_CTR"
    | "KPI_TYPE_VIEWABILITY"
    | "KPI_TYPE_CPIAVC"
    | "KPI_TYPE_CPE"
    | "KPI_TYPE_CPV"
    | "KPI_TYPE_CLICK_CVR"
    | "KPI_TYPE_IMPRESSION_CVR"
    | "KPI_TYPE_VCPM"
    | "KPI_TYPE_VTR"
    | "KPI_TYPE_AUDIO_COMPLETION_RATE"
    | "KPI_TYPE_VIDEO_COMPLETION_RATE"
    | "KPI_TYPE_CPCL"
    | "KPI_TYPE_CPCV"
    | "KPI_TYPE_TOS10"
    | "KPI_TYPE_MAXIMIZE_PACING"
    | "KPI_TYPE_CUSTOM_IMPRESSION_VALUE_OVER_COST"
    | "KPI_TYPE_OTHER"
    | (string & {});
  /** The decimal representation of the goal percentage in micros. Applicable when kpi_type is one of: * `KPI_TYPE_CTR` * `KPI_TYPE_VIEWABILITY` * `KPI_TYPE_CLICK_CVR` * `KPI_TYPE_IMPRESSION_CVR` * `KPI_TYPE_VTR` * `KPI_TYPE_AUDIO_COMPLETION_RATE` * `KPI_TYPE_VIDEO_COMPLETION_RATE` For example: 70000 represents 7% (decimal 0.07). */
  kpiPercentageMicros?: string;
}

export const Kpi: Schema.Schema<Kpi> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kpiString: Schema.optional(Schema.String),
      kpiAlgorithmId: Schema.optional(Schema.String),
      kpiAmountMicros: Schema.optional(Schema.String),
      kpiType: Schema.optional(Schema.String),
      kpiPercentageMicros: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Kpi" }) as any as Schema.Schema<Kpi>;

export interface InsertionOrderBudgetSegment {
  /** Required. The budget amount the insertion order will spend for the given date_range. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency. */
  budgetAmountMicros?: string;
  /** Required. The start and end date settings of the budget segment. They are resolved relative to the parent advertiser's time zone. * When creating a new budget segment, both `start_date` and `end_date` must be in the future. * An existing budget segment with a `start_date` in the past has a mutable `end_date` but an immutable `start_date`. * `end_date` must be the `start_date` or later, both before the year 2037. */
  dateRange?: DateRange;
  /** Optional. The budget segment description. It can be used to enter Purchase Order information for each budget segment and have that information printed on the invoices. Must be UTF-8 encoded. */
  description?: string;
  /** Optional. The budget_id of the campaign budget that this insertion order budget segment is a part of. */
  campaignBudgetId?: string;
}

export const InsertionOrderBudgetSegment: Schema.Schema<InsertionOrderBudgetSegment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      budgetAmountMicros: Schema.optional(Schema.String),
      dateRange: Schema.optional(DateRange),
      description: Schema.optional(Schema.String),
      campaignBudgetId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InsertionOrderBudgetSegment",
  }) as any as Schema.Schema<InsertionOrderBudgetSegment>;

export interface InsertionOrderBudget {
  /** Optional. The type of automation used to manage bid and budget for the insertion order. If this field is unspecified in creation, the value defaults to `INSERTION_ORDER_AUTOMATION_TYPE_NONE`. */
  automationType?:
    | "INSERTION_ORDER_AUTOMATION_TYPE_UNSPECIFIED"
    | "INSERTION_ORDER_AUTOMATION_TYPE_BUDGET"
    | "INSERTION_ORDER_AUTOMATION_TYPE_NONE"
    | "INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET"
    | (string & {});
  /** Required. The list of budget segments. Use a budget segment to specify a specific budget for a given period of time an insertion order is running. */
  budgetSegments?: Array<InsertionOrderBudgetSegment>;
  /** Required. Immutable. The budget unit specifies whether the budget is currency based or impression based. */
  budgetUnit?:
    | "BUDGET_UNIT_UNSPECIFIED"
    | "BUDGET_UNIT_CURRENCY"
    | "BUDGET_UNIT_IMPRESSIONS"
    | (string & {});
}

export const InsertionOrderBudget: Schema.Schema<InsertionOrderBudget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      automationType: Schema.optional(Schema.String),
      budgetSegments: Schema.optional(
        Schema.Array(InsertionOrderBudgetSegment),
      ),
      budgetUnit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InsertionOrderBudget",
  }) as any as Schema.Schema<InsertionOrderBudget>;

export interface InsertionOrder {
  /** Required. Controls whether or not the insertion order can spend its budget and bid on inventory. * For CreateInsertionOrder method, only `ENTITY_STATUS_DRAFT` is allowed. To activate an insertion order, use UpdateInsertionOrder method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * An insertion order cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * An insertion order cannot be set to `ENTITY_STATUS_ACTIVE` if its parent campaign is not active. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Required. Immutable. The unique ID of the campaign that the insertion order belongs to. */
  campaignId?: string;
  /** Optional. The bidding strategy of the insertion order. By default, fixed_bid is set. If the budget field automationType is set to `INSERTION_ORDER_AUTOMATION_TYPE_BUDGET` or `INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET`, the insertion order will impose this bidding strategy on its line items. If an imposed bidding strategy is not compatible with a line item's enableOptimizedTargeting setting, the optimized targeting setting will be updated. */
  bidStrategy?: BiddingStrategy;
  /** Output only. The unique ID of the insertion order. Assigned by the system. */
  insertionOrderId?: string;
  /** Output only. The reservation type of the insertion order. */
  reservationType?:
    | "RESERVATION_TYPE_UNSPECIFIED"
    | "RESERVATION_TYPE_NOT_GUARANTEED"
    | "RESERVATION_TYPE_PROGRAMMATIC_GUARANTEED"
    | "RESERVATION_TYPE_TAG_GUARANTEED"
    | "RESERVATION_TYPE_PETRA_VIRAL"
    | "RESERVATION_TYPE_INSTANT_RESERVE"
    | (string & {});
  /** Optional. The partner costs associated with the insertion order. If absent or empty in CreateInsertionOrder method, the newly created insertion order will inherit partner costs from the partner settings. */
  partnerCosts?: Array<PartnerCost>;
  /** Required. The key performance indicator (KPI) of the insertion order. This is represented as referred to as the "Goal" in the Display & Video 360 interface. */
  kpi?: Kpi;
  /** Output only. The resource name of the insertion order. */
  name?: string;
  /** Required. The display name of the insertion order. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Optional. The type of insertion order. If this field is unspecified in creation, the value defaults to `RTB`. */
  insertionOrderType?:
    | "INSERTION_ORDER_TYPE_UNSPECIFIED"
    | "RTB"
    | "OVER_THE_TOP"
    | (string & {});
  /** Required. The budget spending speed setting of the insertion order. pacing_type `PACING_TYPE_ASAP` is not compatible with pacing_period `PACING_PERIOD_FLIGHT`. */
  pacing?: Pacing;
  /** Required. The frequency capping setting of the insertion order. */
  frequencyCap?: FrequencyCap;
  /** Optional. Additional integration details of the insertion order. */
  integrationDetails?: IntegrationDetails;
  /** Optional. Required. The optimization objective of the insertion order. */
  optimizationObjective?:
    | "OPTIMIZATION_OBJECTIVE_UNSPECIFIED"
    | "CONVERSION"
    | "CLICK"
    | "BRAND_AWARENESS"
    | "CUSTOM"
    | "NO_OBJECTIVE"
    | (string & {});
  /** Output only. The unique ID of the advertiser the insertion order belongs to. */
  advertiserId?: string;
  /** Required. The budget allocation settings of the insertion order. */
  budget?: InsertionOrderBudget;
  /** Output only. The timestamp when the insertion order was last updated. Assigned by the system. */
  updateTime?: string;
}

export const InsertionOrder: Schema.Schema<InsertionOrder> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityStatus: Schema.optional(Schema.String),
      campaignId: Schema.optional(Schema.String),
      bidStrategy: Schema.optional(BiddingStrategy),
      insertionOrderId: Schema.optional(Schema.String),
      reservationType: Schema.optional(Schema.String),
      partnerCosts: Schema.optional(Schema.Array(PartnerCost)),
      kpi: Schema.optional(Kpi),
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      insertionOrderType: Schema.optional(Schema.String),
      pacing: Schema.optional(Pacing),
      frequencyCap: Schema.optional(FrequencyCap),
      integrationDetails: Schema.optional(IntegrationDetails),
      optimizationObjective: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      budget: Schema.optional(InsertionOrderBudget),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InsertionOrder",
  }) as any as Schema.Schema<InsertionOrder>;

export interface ListInsertionOrdersResponse {
  /** The list of insertion orders. This list will be absent if empty. */
  insertionOrders?: Array<InsertionOrder>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInsertionOrders` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListInsertionOrdersResponse: Schema.Schema<ListInsertionOrdersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      insertionOrders: Schema.optional(Schema.Array(InsertionOrder)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListInsertionOrdersResponse",
  }) as any as Schema.Schema<ListInsertionOrdersResponse>;

export interface AdvertiserTargetingConfig {
  /** Whether or not connected TV devices are exempt from viewability targeting for all video line items under the advertiser. */
  exemptTvFromViewabilityTargeting?: boolean;
}

export const AdvertiserTargetingConfig: Schema.Schema<AdvertiserTargetingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exemptTvFromViewabilityTargeting: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AdvertiserTargetingConfig",
  }) as any as Schema.Schema<AdvertiserTargetingConfig>;

export interface AdvertiserCreativeConfig {
  /** Whether or not to disable Google's About this Ad feature that adds badging (to identify the content as an ad) and transparency information (on interaction with About this Ad) to your ads for Online Behavioral Advertising (OBA) and regulatory requirements. About this Ad gives users greater control over the ads they see and helps you explain why they're seeing your ad. [Learn more](//support.google.com/displayvideo/answer/14315795). If you choose to set this field to `true`, note that ads served through Display & Video 360 must comply to the following: * Be Online Behavioral Advertising (OBA) compliant, as per your contract with Google Marketing Platform. * In the European Economic Area (EEA), include transparency information and a mechanism for users to report illegal content in ads. If using an alternative ad badging, transparency, and reporting solution, you must ensure it includes the required transparency information and illegal content flagging mechanism and that you notify Google of any illegal content reports using the appropriate [form](//support.google.com/legal/troubleshooter/1114905?sjid=6787484030557261960-EU#ts=2981967%2C2982031%2C12980091). */
  obaComplianceDisabled?: boolean;
  /** By setting this field to `true`, you, on behalf of your company, authorize Google to use video creatives associated with this Display & Video 360 advertiser to provide reporting and features related to the advertiser's television campaigns. Applicable only when the advertiser has a CM360 hybrid ad server configuration. */
  videoCreativeDataSharingAuthorized?: boolean;
  /** An ID for configuring campaign monitoring provided by Integral Ad Service (IAS). The DV360 system will append an IAS "Campaign Monitor" tag containing this ID to the creative tag. */
  iasClientId?: string;
  /** Whether or not the advertiser is enabled for dynamic creatives. */
  dynamicCreativeEnabled?: boolean;
}

export const AdvertiserCreativeConfig: Schema.Schema<AdvertiserCreativeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      obaComplianceDisabled: Schema.optional(Schema.Boolean),
      videoCreativeDataSharingAuthorized: Schema.optional(Schema.Boolean),
      iasClientId: Schema.optional(Schema.String),
      dynamicCreativeEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AdvertiserCreativeConfig",
  }) as any as Schema.Schema<AdvertiserCreativeConfig>;

export interface AdvertiserGeneralConfig {
  /** Output only. The standard TZ database name of the advertiser's time zone. For example, `America/New_York`. See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones For CM360 hybrid advertisers, the time zone is the same as that of the associated CM360 account; for third-party only advertisers, the time zone is the same as that of the parent partner. */
  timeZone?: string;
  /** Required. Immutable. Advertiser's currency in ISO 4217 format. Accepted codes and the currencies they represent are: Currency Code : Currency Name * `ARS` : Argentine Peso * `AUD` : Australian Dollar * `BRL` : Brazilian Real * `CAD` : Canadian Dollar * `CHF` : Swiss Franc * `CLP` : Chilean Peso * `CNY` : Chinese Yuan * `COP` : Colombian Peso * `CZK` : Czech Koruna * `DKK` : Danish Krone * `EGP` : Egyption Pound * `EUR` : Euro * `GBP` : British Pound * `HKD` : Hong Kong Dollar * `HUF` : Hungarian Forint * `IDR` : Indonesian Rupiah * `ILS` : Israeli Shekel * `INR` : Indian Rupee * `JPY` : Japanese Yen * `KRW` : South Korean Won * `MXN` : Mexican Pesos * `MYR` : Malaysian Ringgit * `NGN` : Nigerian Naira * `NOK` : Norwegian Krone * `NZD` : New Zealand Dollar * `PEN` : Peruvian Nuevo Sol * `PLN` : Polish Zloty * `RON` : New Romanian Leu * `RUB` : Russian Ruble * `SEK` : Swedish Krona * `TRY` : Turkish Lira * `TWD` : New Taiwan Dollar * `USD` : US Dollar * `ZAR` : South African Rand */
  currencyCode?: string;
  /** Required. The domain URL of the advertiser's primary website. The system will send this information to publishers that require website URL to associate a campaign with an advertiser. Provide a URL with no path or query string, beginning with `http:` or `https:`. For example, http://www.example.com */
  domainUrl?: string;
}

export const AdvertiserGeneralConfig: Schema.Schema<AdvertiserGeneralConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeZone: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      domainUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdvertiserGeneralConfig",
  }) as any as Schema.Schema<AdvertiserGeneralConfig>;

export interface AdvertiserBillingConfig {
  /** Required. The ID of a billing profile assigned to the advertiser. */
  billingProfileId?: string;
}

export const AdvertiserBillingConfig: Schema.Schema<AdvertiserBillingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      billingProfileId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdvertiserBillingConfig",
  }) as any as Schema.Schema<AdvertiserBillingConfig>;

export interface SdfConfig {
  /** Required. The version of SDF being used. */
  version?:
    | "SDF_VERSION_UNSPECIFIED"
    | "SDF_VERSION_3_1"
    | "SDF_VERSION_4"
    | "SDF_VERSION_4_1"
    | "SDF_VERSION_4_2"
    | "SDF_VERSION_5"
    | "SDF_VERSION_5_1"
    | "SDF_VERSION_5_2"
    | "SDF_VERSION_5_3"
    | "SDF_VERSION_5_4"
    | "SDF_VERSION_5_5"
    | "SDF_VERSION_6"
    | "SDF_VERSION_7"
    | "SDF_VERSION_7_1"
    | "SDF_VERSION_8"
    | "SDF_VERSION_8_1"
    | "SDF_VERSION_9"
    | "SDF_VERSION_9_1"
    | "SDF_VERSION_9_2"
    | (string & {});
  /** An administrator email address to which the SDF processing status reports will be sent. */
  adminEmail?: string;
}

export const SdfConfig: Schema.Schema<SdfConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      adminEmail: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SdfConfig" }) as any as Schema.Schema<SdfConfig>;

export interface AdvertiserSdfConfig {
  /** Whether or not this advertiser overrides the SDF configuration of its parent partner. By default, an advertiser inherits the SDF configuration from the parent partner. To override the partner configuration, set this field to `true` and provide the new configuration in sdfConfig. */
  overridePartnerSdfConfig?: boolean;
  /** The SDF configuration for the advertiser. * Required when overridePartnerSdfConfig is `true`. * Output only when overridePartnerSdfConfig is `false`. */
  sdfConfig?: SdfConfig;
}

export const AdvertiserSdfConfig: Schema.Schema<AdvertiserSdfConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      overridePartnerSdfConfig: Schema.optional(Schema.Boolean),
      sdfConfig: Schema.optional(SdfConfig),
    }),
  ).annotate({
    identifier: "AdvertiserSdfConfig",
  }) as any as Schema.Schema<AdvertiserSdfConfig>;

export interface AdvertiserDataAccessConfig {
  /** Structured Data Files (SDF) settings for the advertiser. If not specified, the SDF settings of the parent partner are used. */
  sdfConfig?: AdvertiserSdfConfig;
}

export const AdvertiserDataAccessConfig: Schema.Schema<AdvertiserDataAccessConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sdfConfig: Schema.optional(AdvertiserSdfConfig),
    }),
  ).annotate({
    identifier: "AdvertiserDataAccessConfig",
  }) as any as Schema.Schema<AdvertiserDataAccessConfig>;

export interface Advertiser {
  /** Targeting settings related to ad serving of the advertiser. */
  servingConfig?: AdvertiserTargetingConfig;
  /** Required. The display name of the advertiser. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Integration details of the advertiser. Only integrationCode is currently applicable to advertiser. Other fields of IntegrationDetails are not supported and will be ignored if provided. */
  integrationDetails?: IntegrationDetails;
  /** Output only. The timestamp when the advertiser was last updated. Assigned by the system. */
  updateTime?: string;
  /** Required. Immutable. The unique ID of the partner that the advertiser belongs to. */
  partnerId?: string;
  /** Output only. The unique ID of the advertiser. Assigned by the system. */
  advertiserId?: string;
  /** Required. Creative related settings of the advertiser. */
  creativeConfig?: AdvertiserCreativeConfig;
  /** Required. Controls whether or not insertion orders and line items of the advertiser can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_PAUSED` and `ENTITY_STATUS_SCHEDULED_FOR_DELETION`. * If set to `ENTITY_STATUS_SCHEDULED_FOR_DELETION`, the advertiser will be deleted 30 days from when it was first scheduled for deletion. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Required. General settings of the advertiser. */
  generalConfig?: AdvertiserGeneralConfig;
  /** Optional. Whether this advertiser contains line items that serve European Union political ads. If this field is set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`, then the following will happen: * Any new line items created under this advertiser will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. * Any existing line items under this advertiser that do not have a set value be updated to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` within a day. */
  containsEuPoliticalAds?:
    | "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN"
    | "CONTAINS_EU_POLITICAL_ADVERTISING"
    | "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING"
    | (string & {});
  /** Required. Immutable. Ad server related settings of the advertiser. */
  adServerConfig?: AdvertiserAdServerConfig;
  /** Required. Billing related settings of the advertiser. */
  billingConfig?: AdvertiserBillingConfig;
  /** Whether integration with Mediaocean (Prisma) is enabled. By enabling this, you agree to the following: On behalf of my company, I authorize Mediaocean (Prisma) to send budget segment plans to Google, and I authorize Google to send corresponding reporting and invoices from DV360 to Mediaocean for the purposes of budget planning, billing, and reconciliation for this advertiser. */
  prismaEnabled?: boolean;
  /** Output only. The resource name of the advertiser. */
  name?: string;
  /** Settings that control how advertiser data may be accessed. */
  dataAccessConfig?: AdvertiserDataAccessConfig;
}

export const Advertiser: Schema.Schema<Advertiser> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      servingConfig: Schema.optional(AdvertiserTargetingConfig),
      displayName: Schema.optional(Schema.String),
      integrationDetails: Schema.optional(IntegrationDetails),
      updateTime: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      creativeConfig: Schema.optional(AdvertiserCreativeConfig),
      entityStatus: Schema.optional(Schema.String),
      generalConfig: Schema.optional(AdvertiserGeneralConfig),
      containsEuPoliticalAds: Schema.optional(Schema.String),
      adServerConfig: Schema.optional(AdvertiserAdServerConfig),
      billingConfig: Schema.optional(AdvertiserBillingConfig),
      prismaEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      dataAccessConfig: Schema.optional(AdvertiserDataAccessConfig),
    }),
  ).annotate({ identifier: "Advertiser" }) as any as Schema.Schema<Advertiser>;

export interface AssignedLocation {
  /** Output only. The resource name of the assigned location. */
  name?: string;
  /** Output only. The unique ID of the assigned location. The ID is only unique within a location list. It may be reused in other contexts. */
  assignedLocationId?: string;
  /** Required. The ID of the targeting option assigned to the location list. */
  targetingOptionId?: string;
}

export const AssignedLocation: Schema.Schema<AssignedLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      assignedLocationId: Schema.optional(Schema.String),
      targetingOptionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AssignedLocation",
  }) as any as Schema.Schema<AssignedLocation>;

export interface BulkEditAssignedLocationsResponse {
  /** The list of assigned locations that have been successfully created. This list will be absent if empty. */
  assignedLocations?: Array<AssignedLocation>;
}

export const BulkEditAssignedLocationsResponse: Schema.Schema<BulkEditAssignedLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedLocations: Schema.optional(Schema.Array(AssignedLocation)),
    }),
  ).annotate({
    identifier: "BulkEditAssignedLocationsResponse",
  }) as any as Schema.Schema<BulkEditAssignedLocationsResponse>;

export interface Transcode {
  /** Optional. The bit rate for the audio stream of the transcoded video, or the bit rate for the transcoded audio, in kilobits per second. */
  audioBitRateKbps?: string;
  /** Optional. The sample rate for the audio stream of the transcoded video, or the sample rate for the transcoded audio, in hertz. */
  audioSampleRateHz?: string;
  /** Optional. The MIME type of the transcoded file. */
  mimeType?: string;
  /** Optional. The name of the transcoded file. */
  name?: string;
  /** Optional. The dimensions of the transcoded video. */
  dimensions?: Dimensions;
  /** Optional. The frame rate of the transcoded video, in frames per second. */
  frameRate?: number;
  /** Optional. The transcoding bit rate of the transcoded video, in kilobits per second. */
  bitRateKbps?: string;
  /** Optional. The size of the transcoded file, in bytes. */
  fileSizeBytes?: string;
  /** Optional. Indicates if the transcoding was successful. */
  transcoded?: boolean;
}

export const Transcode: Schema.Schema<Transcode> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioBitRateKbps: Schema.optional(Schema.String),
      audioSampleRateHz: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      dimensions: Schema.optional(Dimensions),
      frameRate: Schema.optional(Schema.Number),
      bitRateKbps: Schema.optional(Schema.String),
      fileSizeBytes: Schema.optional(Schema.String),
      transcoded: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Transcode" }) as any as Schema.Schema<Transcode>;

export interface PrismaConfig {
  /** Required. Relevant client, product, and estimate codes from the Mediaocean Prisma tool. */
  prismaCpeCode?: PrismaCpeCode;
  /** Required. The Prisma type. */
  prismaType?:
    | "PRISMA_TYPE_UNSPECIFIED"
    | "PRISMA_TYPE_DISPLAY"
    | "PRISMA_TYPE_SEARCH"
    | "PRISMA_TYPE_VIDEO"
    | "PRISMA_TYPE_AUDIO"
    | "PRISMA_TYPE_SOCIAL"
    | "PRISMA_TYPE_FEE"
    | (string & {});
  /** Required. The entity allocated this budget (DSP, site, etc.). */
  supplier?: string;
}

export const PrismaConfig: Schema.Schema<PrismaConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prismaCpeCode: Schema.optional(PrismaCpeCode),
      prismaType: Schema.optional(Schema.String),
      supplier: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PrismaConfig",
  }) as any as Schema.Schema<PrismaConfig>;

export interface CampaignBudget {
  /** Required. The external source of the budget. */
  externalBudgetSource?:
    | "EXTERNAL_BUDGET_SOURCE_UNSPECIFIED"
    | "EXTERNAL_BUDGET_SOURCE_NONE"
    | "EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN"
    | (string & {});
  /** The unique ID of the campaign budget. Assigned by the system. Do not set for new budgets. Must be included when updating or adding budgets to campaign_budgets. Otherwise, a new ID will be generated and assigned. */
  budgetId?: string;
  /** Required. The date range for the campaign budget. Linked budget segments may have a different date range. They are resolved relative to the parent advertiser's time zone. Both `start_date` and `end_date` must be before the year 2037. */
  dateRange?: DateRange;
  /** Required. Immutable. Specifies whether the budget is measured in currency or impressions. */
  budgetUnit?:
    | "BUDGET_UNIT_UNSPECIFIED"
    | "BUDGET_UNIT_CURRENCY"
    | "BUDGET_UNIT_IMPRESSIONS"
    | (string & {});
  /** Required. The total amount the linked insertion order segments can budget. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency. */
  budgetAmountMicros?: string;
  /** Immutable. The ID used to group budgets to be included the same invoice. If this field is set and the invoice level of the corresponding billing profile is set to "Budget invoice grouping ID", all external_budget_id sharing the same invoice_grouping_id will be grouped in the same invoice. */
  invoiceGroupingId?: string;
  /** Additional metadata for use by the Mediaocean Prisma tool. Required for Mediaocean budgets. Only applicable to prisma_enabled advertisers. */
  prismaConfig?: PrismaConfig;
  /** Required. The display name of the budget. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Immutable. The ID identifying this budget to the external source. If this field is set and the invoice detail level of the corresponding billing profile is set to "Budget level PO", all impressions served against this budget will include this ID on the invoice. Must be unique under the campaign. */
  externalBudgetId?: string;
}

export const CampaignBudget: Schema.Schema<CampaignBudget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      externalBudgetSource: Schema.optional(Schema.String),
      budgetId: Schema.optional(Schema.String),
      dateRange: Schema.optional(DateRange),
      budgetUnit: Schema.optional(Schema.String),
      budgetAmountMicros: Schema.optional(Schema.String),
      invoiceGroupingId: Schema.optional(Schema.String),
      prismaConfig: Schema.optional(PrismaConfig),
      displayName: Schema.optional(Schema.String),
      externalBudgetId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CampaignBudget",
  }) as any as Schema.Schema<CampaignBudget>;

export interface AdGroupAssignedTargetingOption {
  /** The ID of the ad group the assigned targeting option is assigned to. */
  adGroupId?: string;
  /** The assigned targeting option resource. */
  assignedTargetingOption?: AssignedTargetingOption;
}

export const AdGroupAssignedTargetingOption: Schema.Schema<AdGroupAssignedTargetingOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adGroupId: Schema.optional(Schema.String),
      assignedTargetingOption: Schema.optional(AssignedTargetingOption),
    }),
  ).annotate({
    identifier: "AdGroupAssignedTargetingOption",
  }) as any as Schema.Schema<AdGroupAssignedTargetingOption>;

export interface BulkListAdGroupAssignedTargetingOptionsResponse {
  /** The list of wrapper objects, each providing an assigned targeting option and the ad group it is assigned to. This list will be absent if empty. */
  adGroupAssignedTargetingOptions?: Array<AdGroupAssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent call to `BulkListAdGroupAssignedTargetingOptions` to fetch the next page of results. This token will be absent if there are no more AdGroupAssignedTargetingOption resources to return. */
  nextPageToken?: string;
}

export const BulkListAdGroupAssignedTargetingOptionsResponse: Schema.Schema<BulkListAdGroupAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adGroupAssignedTargetingOptions: Schema.optional(
        Schema.Array(AdGroupAssignedTargetingOption),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BulkListAdGroupAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkListAdGroupAssignedTargetingOptionsResponse>;

export interface InventorySourceAccessorsAdvertiserAccessors {
  /** The IDs of the advertisers. */
  advertiserIds?: Array<string>;
}

export const InventorySourceAccessorsAdvertiserAccessors: Schema.Schema<InventorySourceAccessorsAdvertiserAccessors> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertiserIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "InventorySourceAccessorsAdvertiserAccessors",
  }) as any as Schema.Schema<InventorySourceAccessorsAdvertiserAccessors>;

export interface RemarketingConfig {
  /** Output only. The ID of the advertiser. */
  advertiserId?: string;
  /** Output only. Whether the Floodlight activity remarketing user list is available to the identified advertiser. */
  remarketingEnabled?: boolean;
}

export const RemarketingConfig: Schema.Schema<RemarketingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertiserId: Schema.optional(Schema.String),
      remarketingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RemarketingConfig",
  }) as any as Schema.Schema<RemarketingConfig>;

export interface FloodlightActivity {
  /** Output only. The resource name of the Floodlight activity. */
  name?: string;
  /** Required. Immutable. The ID of the parent Floodlight group. */
  floodlightGroupId?: string;
  /** Output only. Whether tags are required to be compliant. */
  sslRequired?: boolean;
  /** Output only. A list of configuration objects designating whether remarketing for this Floodlight Activity is enabled and available for a specifc advertiser. If enabled, this Floodlight Activity generates a remarketing user list that is able to be used in targeting under the advertiser. */
  remarketingConfigs?: Array<RemarketingConfig>;
  /** Output only. The unique ID of the Floodlight activity. Assigned by the system. */
  floodlightActivityId?: string;
  /** Output only. IDs of the advertisers that have access to the parent Floodlight group. Only advertisers under the provided partner ID will be listed in this field. */
  advertiserIds?: Array<string>;
  /** Required. The display name of the Floodlight activity. */
  displayName?: string;
  /** Optional. Whether the Floodlight activity is served. */
  servingStatus?:
    | "FLOODLIGHT_ACTIVITY_SERVING_STATUS_UNSPECIFIED"
    | "FLOODLIGHT_ACTIVITY_SERVING_STATUS_ENABLED"
    | "FLOODLIGHT_ACTIVITY_SERVING_STATUS_DISABLED"
    | (string & {});
}

export const FloodlightActivity: Schema.Schema<FloodlightActivity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      floodlightGroupId: Schema.optional(Schema.String),
      sslRequired: Schema.optional(Schema.Boolean),
      remarketingConfigs: Schema.optional(Schema.Array(RemarketingConfig)),
      floodlightActivityId: Schema.optional(Schema.String),
      advertiserIds: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      servingStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FloodlightActivity",
  }) as any as Schema.Schema<FloodlightActivity>;

export interface UploadAdAssetResponse {
  /** The created ad asset. */
  adAsset?: AdAsset;
}

export const UploadAdAssetResponse: Schema.Schema<UploadAdAssetResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAsset: Schema.optional(AdAsset),
    }),
  ).annotate({
    identifier: "UploadAdAssetResponse",
  }) as any as Schema.Schema<UploadAdAssetResponse>;

export interface CreateAssetResponse {
  /** The uploaded asset, if successful. */
  asset?: Asset;
}

export const CreateAssetResponse: Schema.Schema<CreateAssetResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      asset: Schema.optional(Asset),
    }),
  ).annotate({
    identifier: "CreateAssetResponse",
  }) as any as Schema.Schema<CreateAssetResponse>;

export interface NegativeKeyword {
  /** Output only. The resource name of the negative keyword. */
  name?: string;
  /** Required. Immutable. The negatively targeted keyword, for example `car insurance`. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10. Valid characters are restricted to ASCII characters only. The only URL-escaping permitted is for representing whitespace between words. Leading or trailing whitespace is ignored. */
  keywordValue?: string;
}

export const NegativeKeyword: Schema.Schema<NegativeKeyword> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      keywordValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NegativeKeyword",
  }) as any as Schema.Schema<NegativeKeyword>;

export interface ListNegativeKeywordsResponse {
  /** The list of negative keywords. This list will be absent if empty. */
  negativeKeywords?: Array<NegativeKeyword>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListNegativeKeywords` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListNegativeKeywordsResponse: Schema.Schema<ListNegativeKeywordsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListNegativeKeywordsResponse",
  }) as any as Schema.Schema<ListNegativeKeywordsResponse>;

export interface MastheadAd {
  /** The tracking URL for the call-to-action button. */
  callToActionTrackingUrl?: string;
  /** The YouTube video used by the ad. */
  video?: YoutubeVideoDetails;
  /** Whether to show a background or banner that appears at the top of a YouTube page. */
  showChannelArt?: boolean;
  /** The description of the ad. */
  description?: string;
  /** The amount of time in milliseconds after which the video will start to play. */
  autoplayVideoStartMillisecond?: string;
  /** The headline of the ad. */
  headline?: string;
  /** The aspect ratio of the autoplaying YouTube video on the Masthead. */
  videoAspectRatio?:
    | "VIDEO_ASPECT_RATIO_UNSPECIFIED"
    | "VIDEO_ASPECT_RATIO_WIDESCREEN"
    | "VIDEO_ASPECT_RATIO_FIXED_16_9"
    | (string & {});
  /** The text on the call-to-action button. */
  callToActionButtonLabel?: string;
  /** The destination URL for the call-to-action button. */
  callToActionFinalUrl?: string;
  /** The videos that appear next to the Masthead Ad on desktop. Can be no more than two. */
  companionYoutubeVideos?: Array<YoutubeVideoDetails>;
  /** The duration of time the video will autoplay. */
  autoplayVideoDuration?: string;
}

export const MastheadAd: Schema.Schema<MastheadAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      callToActionTrackingUrl: Schema.optional(Schema.String),
      video: Schema.optional(YoutubeVideoDetails),
      showChannelArt: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
      autoplayVideoStartMillisecond: Schema.optional(Schema.String),
      headline: Schema.optional(Schema.String),
      videoAspectRatio: Schema.optional(Schema.String),
      callToActionButtonLabel: Schema.optional(Schema.String),
      callToActionFinalUrl: Schema.optional(Schema.String),
      companionYoutubeVideos: Schema.optional(
        Schema.Array(YoutubeVideoDetails),
      ),
      autoplayVideoDuration: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "MastheadAd" }) as any as Schema.Schema<MastheadAd>;

export interface LocationList {
  /** Output only. The unique ID of the location list. Assigned by the system. */
  locationListId?: string;
  /** Output only. The resource name of the location list. */
  name?: string;
  /** Required. Immutable. The type of location. All locations in the list will share this type. */
  locationType?:
    | "TARGETING_LOCATION_TYPE_UNSPECIFIED"
    | "TARGETING_LOCATION_TYPE_PROXIMITY"
    | "TARGETING_LOCATION_TYPE_REGIONAL"
    | (string & {});
  /** Required. The display name of the location list. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Immutable. The unique ID of the advertiser the location list belongs to. */
  advertiserId?: string;
}

export const LocationList: Schema.Schema<LocationList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationListId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      locationType: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocationList",
  }) as any as Schema.Schema<LocationList>;

export interface ListLocationListsResponse {
  /** The list of location lists. This list will be absent if empty. */
  locationLists?: Array<LocationList>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListLocationLists` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListLocationListsResponse: Schema.Schema<ListLocationListsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationLists: Schema.optional(Schema.Array(LocationList)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationListsResponse",
  }) as any as Schema.Schema<ListLocationListsResponse>;

export interface CustomBiddingAlgorithm {
  /** Output only. The details of custom bidding models for each advertiser who has access. This field may only include the details of the queried advertiser if the algorithm [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner) is a partner and is being retrieved using an advertiser [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor). */
  modelDetails?: Array<CustomBiddingModelDetails>;
  /** Output only. The resource name of the custom bidding algorithm. */
  name?: string;
  /** Output only. The unique ID of the custom bidding algorithm. Assigned by the system. */
  customBiddingAlgorithmId?: string;
  /** Immutable. The unique ID of the advertiser that owns the custom bidding algorithm. */
  advertiserId?: string;
  /** Immutable. The unique ID of the partner that owns the custom bidding algorithm. */
  partnerId?: string;
  /** The IDs of the advertisers who have access to this algorithm. If advertiser_id is set, this field will only consist of that value. This field will not be set if the algorithm [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner) is a partner and is being retrieved using an advertiser [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor). */
  sharedAdvertiserIds?: Array<string>;
  /** Optional. Immutable. Designates the third party optimization partner that manages this algorithm. */
  thirdPartyOptimizationPartner?:
    | "UNKNOWN"
    | "SCIBIDS"
    | "ADELAIDE"
    | (string & {});
  /** Required. The display name of the custom bidding algorithm. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Immutable. The type of custom bidding algorithm. */
  customBiddingAlgorithmType?:
    | "CUSTOM_BIDDING_ALGORITHM_TYPE_UNSPECIFIED"
    | "SCRIPT_BASED"
    | "RULE_BASED"
    | (string & {});
  /** Controls whether or not the custom bidding algorithm can be used as a bidding strategy. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
}

export const CustomBiddingAlgorithm: Schema.Schema<CustomBiddingAlgorithm> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      modelDetails: Schema.optional(Schema.Array(CustomBiddingModelDetails)),
      name: Schema.optional(Schema.String),
      customBiddingAlgorithmId: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      sharedAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
      thirdPartyOptimizationPartner: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      customBiddingAlgorithmType: Schema.optional(Schema.String),
      entityStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingAlgorithm",
  }) as any as Schema.Schema<CustomBiddingAlgorithm>;

export interface InventorySourceAccessors {
  /** The partner with access to the inventory source. */
  partner?: InventorySourceAccessorsPartnerAccessor;
  /** The advertisers with access to the inventory source. All advertisers must belong to the same partner. */
  advertisers?: InventorySourceAccessorsAdvertiserAccessors;
}

export const InventorySourceAccessors: Schema.Schema<InventorySourceAccessors> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partner: Schema.optional(InventorySourceAccessorsPartnerAccessor),
      advertisers: Schema.optional(InventorySourceAccessorsAdvertiserAccessors),
    }),
  ).annotate({
    identifier: "InventorySourceAccessors",
  }) as any as Schema.Schema<InventorySourceAccessors>;

export interface InventorySource {
  /** The creative requirements of the inventory source. Not applicable for auction packages. */
  creativeConfigs?: Array<CreativeConfig>;
  /** The exchange to which the inventory source belongs. */
  exchange?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
  /** Required. The rate details of the inventory source. */
  rateDetails?: RateDetails;
  /** Output only. The resource name of the inventory source. */
  name?: string;
  /** The time range when this inventory source starts and stops serving. */
  timeRange?: TimeRange;
  /** Output only. The IDs of advertisers with read-only access to the inventory source. */
  readAdvertiserIds?: Array<string>;
  /** Output only. The unique ID of the inventory source. Assigned by the system. */
  inventorySourceId?: string;
  /** Output only. The timestamp when the inventory source was last updated. Assigned by the system. */
  updateTime?: string;
  /** The publisher/seller name of the inventory source. */
  publisherName?: string;
  /** Output only. The IDs of partners with read-only access to the inventory source. All advertisers of partners in this field inherit read-only access to the inventory source. */
  readPartnerIds?: Array<string>;
  /** Denotes the type of the inventory source. */
  inventorySourceType?:
    | "INVENTORY_SOURCE_TYPE_UNSPECIFIED"
    | "INVENTORY_SOURCE_TYPE_PRIVATE"
    | "INVENTORY_SOURCE_TYPE_AUCTION_PACKAGE"
    | (string & {});
  /** The delivery method of the inventory source. * For non-guaranteed inventory sources, the only acceptable value is `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. * For guaranteed inventory sources, acceptable values are `INVENTORY_SOURCE_DELIVERY_METHOD_TAG` and `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. */
  deliveryMethod?:
    | "INVENTORY_SOURCE_DELIVERY_METHOD_UNSPECIFIED"
    | "INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC"
    | "INVENTORY_SOURCE_DELIVERY_METHOD_TAG"
    | (string & {});
  /** Immutable. The ID of the guaranteed order that this inventory source belongs to. Only applicable when commitment is `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`. */
  guaranteedOrderId?: string;
  /** The display name of the inventory source. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Whether the inventory source has a guaranteed or non-guaranteed delivery. */
  commitment?:
    | "INVENTORY_SOURCE_COMMITMENT_UNSPECIFIED"
    | "INVENTORY_SOURCE_COMMITMENT_GUARANTEED"
    | "INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED"
    | (string & {});
  /** The ID in the exchange space that uniquely identifies the inventory source. Must be unique across buyers within each exchange but not necessarily unique across exchanges. */
  dealId?: string;
  /** The status settings of the inventory source. */
  status?: InventorySourceStatus;
  /** Output only. The product type of the inventory source, denoting the way through which it sells inventory. */
  inventorySourceProductType?:
    | "INVENTORY_SOURCE_PRODUCT_TYPE_UNSPECIFIED"
    | "PREFERRED_DEAL"
    | "PRIVATE_AUCTION"
    | "PROGRAMMATIC_GUARANTEED"
    | "TAG_GUARANTEED"
    | "YOUTUBE_RESERVE"
    | "INSTANT_RESERVE"
    | "GUARANTEED_PACKAGE"
    | "PROGRAMMATIC_TV"
    | "AUCTION_PACKAGE"
    | (string & {});
  /** The partner or advertisers that have read/write access to the inventory source. Output only when commitment is `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`, in which case the read/write accessors are inherited from the parent guaranteed order. Required when commitment is `INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED`. If commitment is `INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED` and a partner is set in this field, all advertisers under this partner will automatically have read-only access to the inventory source. These advertisers will not be included in read_advertiser_ids. */
  readWriteAccessors?: InventorySourceAccessors;
}

export const InventorySource: Schema.Schema<InventorySource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creativeConfigs: Schema.optional(Schema.Array(CreativeConfig)),
      exchange: Schema.optional(Schema.String),
      rateDetails: Schema.optional(RateDetails),
      name: Schema.optional(Schema.String),
      timeRange: Schema.optional(TimeRange),
      readAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
      inventorySourceId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      publisherName: Schema.optional(Schema.String),
      readPartnerIds: Schema.optional(Schema.Array(Schema.String)),
      inventorySourceType: Schema.optional(Schema.String),
      deliveryMethod: Schema.optional(Schema.String),
      guaranteedOrderId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      commitment: Schema.optional(Schema.String),
      dealId: Schema.optional(Schema.String),
      status: Schema.optional(InventorySourceStatus),
      inventorySourceProductType: Schema.optional(Schema.String),
      readWriteAccessors: Schema.optional(InventorySourceAccessors),
    }),
  ).annotate({
    identifier: "InventorySource",
  }) as any as Schema.Schema<InventorySource>;

export interface ListInventorySourcesResponse {
  /** The list of inventory sources. This list will be absent if empty. */
  inventorySources?: Array<InventorySource>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInventorySources` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListInventorySourcesResponse: Schema.Schema<ListInventorySourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySources: Schema.optional(Schema.Array(InventorySource)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListInventorySourcesResponse",
  }) as any as Schema.Schema<ListInventorySourcesResponse>;

export interface Channel {
  /** Output only. The resource name of the channel. */
  name?: string;
  /** Required. The display name of the channel. Must be UTF-8 encoded with a maximum length of 240 bytes. */
  displayName?: string;
  /** The ID of the advertiser that owns the channel. */
  advertiserId?: string;
  /** The ID of the partner that owns the channel. */
  partnerId?: string;
  /** Output only. Number of line items that are directly targeting this channel positively. */
  positivelyTargetedLineItemCount?: string;
  /** Output only. The unique ID of the channel. Assigned by the system. */
  channelId?: string;
  /** Output only. Number of line items that are directly targeting this channel negatively. */
  negativelyTargetedLineItemCount?: string;
}

export const Channel: Schema.Schema<Channel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      positivelyTargetedLineItemCount: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      negativelyTargetedLineItemCount: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface NegativeKeywordList {
  /** Output only. The resource name of the negative keyword list. */
  name?: string;
  /** Output only. The unique ID of the negative keyword list. Assigned by the system. */
  negativeKeywordListId?: string;
  /** Output only. Number of line items that are directly targeting this negative keyword list. */
  targetedLineItemCount?: string;
  /** Required. The display name of the negative keyword list. Must be UTF-8 encoded with a maximum size of 255 bytes. */
  displayName?: string;
  /** Output only. The unique ID of the advertiser the negative keyword list belongs to. */
  advertiserId?: string;
}

export const NegativeKeywordList: Schema.Schema<NegativeKeywordList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      negativeKeywordListId: Schema.optional(Schema.String),
      targetedLineItemCount: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NegativeKeywordList",
  }) as any as Schema.Schema<NegativeKeywordList>;

export interface ListNegativeKeywordListsResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListNegativeKeywordLists` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of negative keyword lists. This list will be absent if empty. */
  negativeKeywordLists?: Array<NegativeKeywordList>;
}

export const ListNegativeKeywordListsResponse: Schema.Schema<ListNegativeKeywordListsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      negativeKeywordLists: Schema.optional(Schema.Array(NegativeKeywordList)),
    }),
  ).annotate({
    identifier: "ListNegativeKeywordListsResponse",
  }) as any as Schema.Schema<ListNegativeKeywordListsResponse>;

export interface SearchTargetingOptionsResponse {
  /** The list of targeting options that match the search criteria. This list will be absent if empty. */
  targetingOptions?: Array<TargetingOption>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `SearchTargetingOptions` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const SearchTargetingOptionsResponse: Schema.Schema<SearchTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetingOptions: Schema.optional(Schema.Array(TargetingOption)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchTargetingOptionsResponse",
  }) as any as Schema.Schema<SearchTargetingOptionsResponse>;

export interface ImageAsset {
  /** Output only. Metadata for this image at its original size. */
  fullSize?: Dimensions;
  /** Output only. File size of the image asset in bytes. */
  fileSize?: string;
  /** Output only. MIME type of the image asset. */
  mimeType?: string;
  /** Required. The unique ID of the asset. */
  assetId?: string;
}

export const ImageAsset: Schema.Schema<ImageAsset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fullSize: Schema.optional(Dimensions),
      fileSize: Schema.optional(Schema.String),
      mimeType: Schema.optional(Schema.String),
      assetId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ImageAsset" }) as any as Schema.Schema<ImageAsset>;

export interface VideoPerformanceAd {
  /** The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** The first piece after the domain in the display URL. */
  displayUrlBreadcrumb1?: string;
  /** The list of headlines shown on the call-to-action banner. */
  headlines?: Array<string>;
  /** The domain of the display URL. */
  domain?: string;
  /** The list of YouTube video assets used by this ad. */
  videos?: Array<YoutubeVideoDetails>;
  /** The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
  /** The list of descriptions shown on the call-to-action banner. */
  descriptions?: Array<string>;
  /** The list of companion banners used by this ad. */
  companionBanners?: Array<ImageAsset>;
  /** The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** The second piece after the domain in the display URL. */
  displayUrlBreadcrumb2?: string;
  /** The list of lone headlines shown on the call-to-action banner. */
  longHeadlines?: Array<string>;
  /** The list of text assets shown on the call-to-action button. */
  actionButtonLabels?: Array<string>;
}

export const VideoPerformanceAd: Schema.Schema<VideoPerformanceAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trackingUrl: Schema.optional(Schema.String),
      displayUrlBreadcrumb1: Schema.optional(Schema.String),
      headlines: Schema.optional(Schema.Array(Schema.String)),
      domain: Schema.optional(Schema.String),
      videos: Schema.optional(Schema.Array(YoutubeVideoDetails)),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      descriptions: Schema.optional(Schema.Array(Schema.String)),
      companionBanners: Schema.optional(Schema.Array(ImageAsset)),
      finalUrl: Schema.optional(Schema.String),
      displayUrlBreadcrumb2: Schema.optional(Schema.String),
      longHeadlines: Schema.optional(Schema.Array(Schema.String)),
      actionButtonLabels: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VideoPerformanceAd",
  }) as any as Schema.Schema<VideoPerformanceAd>;

export interface CustomBiddingAlgorithmRulesError {
  /** The type of error. */
  errorCode?:
    | "ERROR_CODE_UNSPECIFIED"
    | "SYNTAX_ERROR"
    | "CONSTRAINT_VIOLATION_ERROR"
    | "INTERNAL_ERROR"
    | (string & {});
}

export const CustomBiddingAlgorithmRulesError: Schema.Schema<CustomBiddingAlgorithmRulesError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errorCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingAlgorithmRulesError",
  }) as any as Schema.Schema<CustomBiddingAlgorithmRulesError>;

export interface BusinessChainSearchTerms {
  /** The search query for the desired business chain. The query must be the full name of the business, e.g. "KFC", "mercedes-benz". */
  businessChainQuery?: string;
  /** The search query for the desired geo region, e.g. "Seattle", "United State". */
  regionQuery?: string;
}

export const BusinessChainSearchTerms: Schema.Schema<BusinessChainSearchTerms> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      businessChainQuery: Schema.optional(Schema.String),
      regionQuery: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BusinessChainSearchTerms",
  }) as any as Schema.Schema<BusinessChainSearchTerms>;

export interface CustomLabel {
  /** The key of the label. */
  key?:
    | "CUSTOM_LABEL_KEY_UNSPECIFIED"
    | "CUSTOM_LABEL_KEY_0"
    | "CUSTOM_LABEL_KEY_1"
    | "CUSTOM_LABEL_KEY_2"
    | "CUSTOM_LABEL_KEY_3"
    | "CUSTOM_LABEL_KEY_4"
    | (string & {});
  /** The value of the label. */
  value?: string;
}

export const CustomLabel: Schema.Schema<CustomLabel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomLabel",
  }) as any as Schema.Schema<CustomLabel>;

export interface ProductMatchDimension {
  /** The ID of the product offer to match with a product with the same offer ID. */
  productOfferId?: string;
  /** The custom label to match all the products with the label. */
  customLabel?: CustomLabel;
}

export const ProductMatchDimension: Schema.Schema<ProductMatchDimension> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      productOfferId: Schema.optional(Schema.String),
      customLabel: Schema.optional(CustomLabel),
    }),
  ).annotate({
    identifier: "ProductMatchDimension",
  }) as any as Schema.Schema<ProductMatchDimension>;

export interface CarouselCard {
  /** Required. The call-to-action button shown on the card. Must use 10 characters or less. */
  callToAction?: string;
  /** Required. The URL address of the webpage that people reach after they click the card. */
  finalUrl?: string;
  /** Optional. The square marketing image shown on the card. */
  squareMarketingImage?: ImageAsset;
  /** Optional. The portrait marketing image shown on the card. */
  portraitMarketingImage?: ImageAsset;
  /** Optional. The URL address of the webpage that people reach after they click the card on a mobile device. */
  finalMobileUrl?: string;
  /** Required. The headline of the card. */
  headline?: string;
  /** Optional. The marketing image shown on the card. */
  marketingImage?: ImageAsset;
}

export const CarouselCard: Schema.Schema<CarouselCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      callToAction: Schema.optional(Schema.String),
      finalUrl: Schema.optional(Schema.String),
      squareMarketingImage: Schema.optional(ImageAsset),
      portraitMarketingImage: Schema.optional(ImageAsset),
      finalMobileUrl: Schema.optional(Schema.String),
      headline: Schema.optional(Schema.String),
      marketingImage: Schema.optional(ImageAsset),
    }),
  ).annotate({
    identifier: "CarouselCard",
  }) as any as Schema.Schema<CarouselCard>;

export interface DemandGenCarouselAd {
  /** Required. The list of cards shown on the ad. */
  cards?: Array<CarouselCard>;
  /** Required. The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** Optional. The suffix to append to landing page URLs. */
  finalUrlSuffix?: string;
  /** Required. The business name shown on the ad. */
  businessName?: string;
  /** Required. The logo image used by this ad. */
  logo?: ImageAsset;
  /** Optional. The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
  /** Required. The headline of the ad. */
  headline?: string;
  /** Output only. The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** Optional. The tracking URL specified by the user manually. */
  userSpecifiedTrackingUrl?: string;
  /** Required. The description of the ad. */
  description?: string;
}

export const DemandGenCarouselAd: Schema.Schema<DemandGenCarouselAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cards: Schema.optional(Schema.Array(CarouselCard)),
      finalUrl: Schema.optional(Schema.String),
      finalUrlSuffix: Schema.optional(Schema.String),
      businessName: Schema.optional(Schema.String),
      logo: Schema.optional(ImageAsset),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      headline: Schema.optional(Schema.String),
      trackingUrl: Schema.optional(Schema.String),
      userSpecifiedTrackingUrl: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DemandGenCarouselAd",
  }) as any as Schema.Schema<DemandGenCarouselAd>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface BulkEditAssignedTargetingOptionsResponse {
  /** Output only. The IDs of the line items which successfully updated. */
  updatedLineItemIds?: Array<string>;
  /** Output only. The IDs of the line items which failed. */
  failedLineItemIds?: Array<string>;
  /** The error information for each line item that failed to update. */
  errors?: Array<Status>;
}

export const BulkEditAssignedTargetingOptionsResponse: Schema.Schema<BulkEditAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updatedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
      failedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
      errors: Schema.optional(Schema.Array(Status)),
    }),
  ).annotate({
    identifier: "BulkEditAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkEditAssignedTargetingOptionsResponse>;

export interface PartnerDataAccessConfig {
  /** Structured Data Files (SDF) settings for the partner. The SDF configuration for the partner. */
  sdfConfig?: SdfConfig;
}

export const PartnerDataAccessConfig: Schema.Schema<PartnerDataAccessConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sdfConfig: Schema.optional(SdfConfig),
    }),
  ).annotate({
    identifier: "PartnerDataAccessConfig",
  }) as any as Schema.Schema<PartnerDataAccessConfig>;

export interface ExchangeConfigEnabledExchange {
  /** Output only. Agency ID of Google Ad Manager. The field is only relevant when Google Ad Manager is the enabled exchange. */
  googleAdManagerAgencyId?: string;
  /** Output only. Network ID of Google Ad Manager. The field is only relevant when Google Ad Manager is the enabled exchange. */
  googleAdManagerBuyerNetworkId?: string;
  /** Output only. Seat ID of the enabled exchange. */
  seatId?: string;
  /** The enabled exchange. */
  exchange?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
}

export const ExchangeConfigEnabledExchange: Schema.Schema<ExchangeConfigEnabledExchange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      googleAdManagerAgencyId: Schema.optional(Schema.String),
      googleAdManagerBuyerNetworkId: Schema.optional(Schema.String),
      seatId: Schema.optional(Schema.String),
      exchange: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExchangeConfigEnabledExchange",
  }) as any as Schema.Schema<ExchangeConfigEnabledExchange>;

export interface ExchangeConfig {
  /** All enabled exchanges in the partner. Duplicate enabled exchanges will be ignored. */
  enabledExchanges?: Array<ExchangeConfigEnabledExchange>;
}

export const ExchangeConfig: Schema.Schema<ExchangeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabledExchanges: Schema.optional(
        Schema.Array(ExchangeConfigEnabledExchange),
      ),
    }),
  ).annotate({
    identifier: "ExchangeConfig",
  }) as any as Schema.Schema<ExchangeConfig>;

export interface MeasurementConfig {
  /** Whether or not to report DV360 cost to CM360. */
  dv360ToCmCostReportingEnabled?: boolean;
  /** Whether or not to include DV360 data in CM360 data transfer reports. */
  dv360ToCmDataSharingEnabled?: boolean;
}

export const MeasurementConfig: Schema.Schema<MeasurementConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dv360ToCmCostReportingEnabled: Schema.optional(Schema.Boolean),
      dv360ToCmDataSharingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MeasurementConfig",
  }) as any as Schema.Schema<MeasurementConfig>;

export interface PartnerAdServerConfig {
  /** Measurement settings of a partner. */
  measurementConfig?: MeasurementConfig;
}

export const PartnerAdServerConfig: Schema.Schema<PartnerAdServerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      measurementConfig: Schema.optional(MeasurementConfig),
    }),
  ).annotate({
    identifier: "PartnerAdServerConfig",
  }) as any as Schema.Schema<PartnerAdServerConfig>;

export interface PartnerBillingConfig {
  /** The ID of a partner default billing profile. */
  billingProfileId?: string;
}

export const PartnerBillingConfig: Schema.Schema<PartnerBillingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      billingProfileId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PartnerBillingConfig",
  }) as any as Schema.Schema<PartnerBillingConfig>;

export interface PartnerGeneralConfig {
  /** Immutable. The standard TZ database name of the partner's time zone. For example, `America/New_York`. See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  timeZone?: string;
  /** Immutable. Partner's currency in ISO 4217 format. */
  currencyCode?: string;
}

export const PartnerGeneralConfig: Schema.Schema<PartnerGeneralConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeZone: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PartnerGeneralConfig",
  }) as any as Schema.Schema<PartnerGeneralConfig>;

export interface Partner {
  /** Settings that control how partner data may be accessed. */
  dataAccessConfig?: PartnerDataAccessConfig;
  /** Output only. The resource name of the partner. */
  name?: string;
  /** Output only. The unique ID of the partner. Assigned by the system. */
  partnerId?: string;
  /** Output only. The timestamp when the partner was last updated. Assigned by the system. */
  updateTime?: string;
  /** Settings that control which exchanges are enabled for the partner. */
  exchangeConfig?: ExchangeConfig;
  /** Ad server related settings of the partner. */
  adServerConfig?: PartnerAdServerConfig;
  /** Billing related settings of the partner. */
  billingConfig?: PartnerBillingConfig;
  /** General settings of the partner. */
  generalConfig?: PartnerGeneralConfig;
  /** The display name of the partner. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Output only. The status of the partner. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
}

export const Partner: Schema.Schema<Partner> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataAccessConfig: Schema.optional(PartnerDataAccessConfig),
      name: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      exchangeConfig: Schema.optional(ExchangeConfig),
      adServerConfig: Schema.optional(PartnerAdServerConfig),
      billingConfig: Schema.optional(PartnerBillingConfig),
      generalConfig: Schema.optional(PartnerGeneralConfig),
      displayName: Schema.optional(Schema.String),
      entityStatus: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Partner" }) as any as Schema.Schema<Partner>;

export interface AssignedInventorySource {
  /** Required. The ID of the inventory source entity being targeted. */
  inventorySourceId?: string;
  /** Output only. The resource name of the assigned inventory source. */
  name?: string;
  /** Output only. The unique ID of the assigned inventory source. The ID is only unique within a given inventory source group. It may be reused in other contexts. */
  assignedInventorySourceId?: string;
}

export const AssignedInventorySource: Schema.Schema<AssignedInventorySource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySourceId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      assignedInventorySourceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AssignedInventorySource",
  }) as any as Schema.Schema<AssignedInventorySource>;

export interface BulkEditAssignedInventorySourcesRequest {
  /** The ID of the advertiser that owns the parent inventory source group. The parent partner does not have access to these assigned inventory sources. */
  advertiserId?: string;
  /** The assigned inventory sources to create in bulk, specified as a list of AssignedInventorySources. */
  createdAssignedInventorySources?: Array<AssignedInventorySource>;
  /** The ID of the partner that owns the inventory source group. Only this partner has write access to these assigned inventory sources. */
  partnerId?: string;
  /** The IDs of the assigned inventory sources to delete in bulk, specified as a list of assigned_inventory_source_ids. */
  deletedAssignedInventorySources?: Array<string>;
}

export const BulkEditAssignedInventorySourcesRequest: Schema.Schema<BulkEditAssignedInventorySourcesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertiserId: Schema.optional(Schema.String),
      createdAssignedInventorySources: Schema.optional(
        Schema.Array(AssignedInventorySource),
      ),
      partnerId: Schema.optional(Schema.String),
      deletedAssignedInventorySources: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "BulkEditAssignedInventorySourcesRequest",
  }) as any as Schema.Schema<BulkEditAssignedInventorySourcesRequest>;

export interface Consent {
  /** Represents consent for ad user data. */
  adUserData?:
    | "CONSENT_STATUS_UNSPECIFIED"
    | "CONSENT_STATUS_GRANTED"
    | "CONSENT_STATUS_DENIED"
    | (string & {});
  /** Represents consent for ad personalization. */
  adPersonalization?:
    | "CONSENT_STATUS_UNSPECIFIED"
    | "CONSENT_STATUS_GRANTED"
    | "CONSENT_STATUS_DENIED"
    | (string & {});
}

export const Consent: Schema.Schema<Consent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adUserData: Schema.optional(Schema.String),
      adPersonalization: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Consent" }) as any as Schema.Schema<Consent>;

export interface ContactInfoList {
  /** A list of ContactInfo objects defining Customer Match audience members. The size of members after splitting the contact_infos mustn't be greater than 500,000. */
  contactInfos?: Array<ContactInfo>;
  /** Input only. The consent setting for the users in contact_infos. Leaving this field unset indicates that consent is not specified. If ad_user_data or ad_personalization fields are set to `CONSENT_STATUS_DENIED`, the request will return an error. */
  consent?: Consent;
}

export const ContactInfoList: Schema.Schema<ContactInfoList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contactInfos: Schema.optional(Schema.Array(ContactInfo)),
      consent: Schema.optional(Consent),
    }),
  ).annotate({
    identifier: "ContactInfoList",
  }) as any as Schema.Schema<ContactInfoList>;

export interface MobileDeviceIdList {
  /** Input only. The consent setting for the users in mobile_device_ids. Leaving this field unset indicates that consent is not specified. If ad_user_data or ad_personalization fields are set to `CONSENT_STATUS_DENIED`, the request will return an error. */
  consent?: Consent;
  /** A list of mobile device IDs defining Customer Match audience members. The size of mobile_device_ids mustn't be greater than 500,000. */
  mobileDeviceIds?: Array<string>;
}

export const MobileDeviceIdList: Schema.Schema<MobileDeviceIdList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      consent: Schema.optional(Consent),
      mobileDeviceIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "MobileDeviceIdList",
  }) as any as Schema.Schema<MobileDeviceIdList>;

export interface FirstPartyAndPartnerAudience {
  /** Output only. The estimated mobile web audience size in Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  displayMobileWebAudienceSize?: string;
  /** Input only. A list of contact information to define the initial audience members. Only applicable to audience_type `CUSTOMER_MATCH_CONTACT_INFO` */
  contactInfoList?: ContactInfoList;
  /** Output only. The estimated audience size for YouTube network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  youtubeAudienceSize?: string;
  /** Optional. The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540. Only applicable to first party audiences. This field is required if one of the following audience_type is used: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
  membershipDurationDays?: string;
  /** Output only. The estimated audience size for Gmail network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  gmailAudienceSize?: string;
  /** Output only. The resource name of the first party and partner audience. */
  name?: string;
  /** Output only. The estimated desktop audience size in Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  displayDesktopAudienceSize?: string;
  /** Identifier. The unique ID of the first party and partner audience. Assigned by the system. */
  firstPartyAndPartnerAudienceId?: string;
  /** Optional. The display name of the first party and partner audience. */
  displayName?: string;
  /** Output only. The estimated audience size for the Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only returned in GET request. */
  displayAudienceSize?: string;
  /** Input only. A list of mobile device IDs to define the initial audience members. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID` */
  mobileDeviceIdList?: MobileDeviceIdList;
  /** Output only. Whether the audience is a first party and partner audience. */
  firstPartyAndPartnerAudienceType?:
    | "FIRST_PARTY_AND_PARTNER_AUDIENCE_TYPE_UNSPECIFIED"
    | "TYPE_FIRST_PARTY"
    | "TYPE_PARTNER"
    | (string & {});
  /** Output only. The estimated audience size for the Display network in the past month. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only returned in GET request. */
  activeDisplayAudienceSize?: string;
  /** Immutable. The type of the audience. */
  audienceType?:
    | "AUDIENCE_TYPE_UNSPECIFIED"
    | "CUSTOMER_MATCH_CONTACT_INFO"
    | "CUSTOMER_MATCH_DEVICE_ID"
    | "CUSTOMER_MATCH_USER_ID"
    | "ACTIVITY_BASED"
    | "FREQUENCY_CAP"
    | "TAG_BASED"
    | "YOUTUBE_USERS"
    | "THIRD_PARTY"
    | "COMMERCE"
    | "LINEAR"
    | "AGENCY"
    | (string & {});
  /** Output only. The source of the audience. */
  audienceSource?:
    | "AUDIENCE_SOURCE_UNSPECIFIED"
    | "DISPLAY_VIDEO_360"
    | "CAMPAIGN_MANAGER"
    | "AD_MANAGER"
    | "SEARCH_ADS_360"
    | "YOUTUBE"
    | "ADS_DATA_HUB"
    | (string & {});
  /** Optional. The app_id matches with the type of the mobile_device_ids being uploaded. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID` */
  appId?: string;
  /** Optional. The user-provided description of the audience. Only applicable to first party audiences. */
  description?: string;
  /** Output only. The estimated mobile app audience size in Display network. If the size is less than 1000, the number will be hidden and 0 will be returned due to privacy reasons. Otherwise, the number will be rounded off to two significant digits. Only applicable to first party audiences. Only returned in GET request. */
  displayMobileAppAudienceSize?: string;
}

export const FirstPartyAndPartnerAudience: Schema.Schema<FirstPartyAndPartnerAudience> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayMobileWebAudienceSize: Schema.optional(Schema.String),
      contactInfoList: Schema.optional(ContactInfoList),
      youtubeAudienceSize: Schema.optional(Schema.String),
      membershipDurationDays: Schema.optional(Schema.String),
      gmailAudienceSize: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      displayDesktopAudienceSize: Schema.optional(Schema.String),
      firstPartyAndPartnerAudienceId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      displayAudienceSize: Schema.optional(Schema.String),
      mobileDeviceIdList: Schema.optional(MobileDeviceIdList),
      firstPartyAndPartnerAudienceType: Schema.optional(Schema.String),
      activeDisplayAudienceSize: Schema.optional(Schema.String),
      audienceType: Schema.optional(Schema.String),
      audienceSource: Schema.optional(Schema.String),
      appId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      displayMobileAppAudienceSize: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FirstPartyAndPartnerAudience",
  }) as any as Schema.Schema<FirstPartyAndPartnerAudience>;

export interface DayAndTime {
  /** Required. Day of the week. */
  dayOfWeek?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Required. Hour of the day. */
  hourOfDay?: number;
  /** Required. The mechanism used to determine the relevant timezone. */
  timeZoneResolution?:
    | "TIME_ZONE_RESOLUTION_UNSPECIFIED"
    | "TIME_ZONE_RESOLUTION_END_USER"
    | "TIME_ZONE_RESOLUTION_ADVERTISER"
    | (string & {});
}

export const DayAndTime: Schema.Schema<DayAndTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dayOfWeek: Schema.optional(Schema.String),
      hourOfDay: Schema.optional(Schema.Number),
      timeZoneResolution: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DayAndTime" }) as any as Schema.Schema<DayAndTime>;

export interface CustomBiddingAlgorithmRules {
  /** Output only. Error code of the rejected rules resource. This field will only be populated when the state is `REJECTED`. */
  error?: CustomBiddingAlgorithmRulesError;
  /** Output only. Whether the rules resource is currently being used for scoring by the parent algorithm. */
  active?: boolean;
  /** Output only. The time when the rules resource was created. */
  createTime?: string;
  /** Output only. The unique ID of the rules resource. */
  customBiddingAlgorithmRulesId?: string;
  /** Output only. The state of the rules resource. */
  state?: "STATE_UNSPECIFIED" | "ACCEPTED" | "REJECTED" | (string & {});
  /** Required. Immutable. The reference to the uploaded AlgorithmRules file. */
  rules?: CustomBiddingAlgorithmRulesRef;
  /** Output only. The resource name of the rules resource. */
  name?: string;
  /** Output only. The unique ID of the custom bidding algorithm that the rules resource belongs to. */
  customBiddingAlgorithmId?: string;
}

export const CustomBiddingAlgorithmRules: Schema.Schema<CustomBiddingAlgorithmRules> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(CustomBiddingAlgorithmRulesError),
      active: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      customBiddingAlgorithmRulesId: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      rules: Schema.optional(CustomBiddingAlgorithmRulesRef),
      name: Schema.optional(Schema.String),
      customBiddingAlgorithmId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingAlgorithmRules",
  }) as any as Schema.Schema<CustomBiddingAlgorithmRules>;

export interface ListCustomBiddingAlgorithmRulesResponse {
  /** The list of CustomBiddingAlgorithmRules resources. This list will be absent if empty. */
  customBiddingRules?: Array<CustomBiddingAlgorithmRules>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomBiddingAlgorithmRulesRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCustomBiddingAlgorithmRulesResponse: Schema.Schema<ListCustomBiddingAlgorithmRulesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customBiddingRules: Schema.optional(
        Schema.Array(CustomBiddingAlgorithmRules),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomBiddingAlgorithmRulesResponse",
  }) as any as Schema.Schema<ListCustomBiddingAlgorithmRulesResponse>;

export interface ListCustomBiddingAlgorithmsResponse {
  /** The list of custom bidding algorithms. This list will be absent if empty. */
  customBiddingAlgorithms?: Array<CustomBiddingAlgorithm>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomBiddingAlgorithmsRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCustomBiddingAlgorithmsResponse: Schema.Schema<ListCustomBiddingAlgorithmsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customBiddingAlgorithms: Schema.optional(
        Schema.Array(CustomBiddingAlgorithm),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomBiddingAlgorithmsResponse",
  }) as any as Schema.Schema<ListCustomBiddingAlgorithmsResponse>;

export interface ListAdvertisersResponse {
  /** The list of advertisers. This list will be absent if empty. */
  advertisers?: Array<Advertiser>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdvertisers` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdvertisersResponse: Schema.Schema<ListAdvertisersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertisers: Schema.optional(Schema.Array(Advertiser)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdvertisersResponse",
  }) as any as Schema.Schema<ListAdvertisersResponse>;

export interface GoogleBytestreamMedia {
  /** Name of the media resource. */
  resourceName?: string;
}

export const GoogleBytestreamMedia: Schema.Schema<GoogleBytestreamMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleBytestreamMedia",
  }) as any as Schema.Schema<GoogleBytestreamMedia>;

export interface UploadAdAssetRequest {
  /** Required. The type of the ad asset. Only `AD_ASSET_TYPE_IMAGE` is supported. */
  adAssetType?:
    | "AD_ASSET_TYPE_UNSPECIFIED"
    | "AD_ASSET_TYPE_IMAGE"
    | "AD_ASSET_TYPE_YOUTUBE_VIDEO"
    | (string & {});
  /** Required. The filename of the ad asset, including the file extension. The filename must be UTF-8 encoded with a maximum size of 240 bytes. */
  filename?: string;
}

export const UploadAdAssetRequest: Schema.Schema<UploadAdAssetRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAssetType: Schema.optional(Schema.String),
      filename: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadAdAssetRequest",
  }) as any as Schema.Schema<UploadAdAssetRequest>;

export interface ObaIcon {
  /** Optional. The program of the OBA icon. For example: “AdChoices”. */
  program?: string;
  /** Required. The landing page URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com` */
  landingPageUrl?: string;
  /** Optional. The position of the OBA icon on the creative. */
  position?:
    | "OBA_ICON_POSITION_UNSPECIFIED"
    | "OBA_ICON_POSITION_UPPER_RIGHT"
    | "OBA_ICON_POSITION_UPPER_LEFT"
    | "OBA_ICON_POSITION_LOWER_RIGHT"
    | "OBA_ICON_POSITION_LOWER_LEFT"
    | (string & {});
  /** Optional. The dimensions of the OBA icon. */
  dimensions?: Dimensions;
  /** Required. The click tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com` */
  clickTrackingUrl?: string;
  /** Required. The view tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com` */
  viewTrackingUrl?: string;
  /** Optional. The URL of the OBA icon resource. */
  resourceUrl?: string;
  /** Optional. The MIME type of the OBA icon resource. */
  resourceMimeType?: string;
}

export const ObaIcon: Schema.Schema<ObaIcon> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      program: Schema.optional(Schema.String),
      landingPageUrl: Schema.optional(Schema.String),
      position: Schema.optional(Schema.String),
      dimensions: Schema.optional(Dimensions),
      clickTrackingUrl: Schema.optional(Schema.String),
      viewTrackingUrl: Schema.optional(Schema.String),
      resourceUrl: Schema.optional(Schema.String),
      resourceMimeType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ObaIcon" }) as any as Schema.Schema<ObaIcon>;

export interface BulkEditAdGroupAssignedTargetingOptionsResponse {
  /** Output only. The error information for each ad group that failed to update. */
  errors?: Array<Status>;
  /** Output only. The IDs of the ad groups which failed to update. */
  failedAdGroupIds?: Array<string>;
  /** Output only. The IDs of the ad groups which were successfully updated. */
  updatedAdGroupIds?: Array<string>;
}

export const BulkEditAdGroupAssignedTargetingOptionsResponse: Schema.Schema<BulkEditAdGroupAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Schema.Array(Status)),
      failedAdGroupIds: Schema.optional(Schema.Array(Schema.String)),
      updatedAdGroupIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BulkEditAdGroupAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkEditAdGroupAssignedTargetingOptionsResponse>;

export interface ListPartnerAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListPartnerAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const ListPartnerAssignedTargetingOptionsResponse: Schema.Schema<ListPartnerAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPartnerAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<ListPartnerAssignedTargetingOptionsResponse>;

export interface BulkEditNegativeKeywordsResponse {
  /** The list of negative keywords that have been successfully created. This list will be absent if empty. */
  negativeKeywords?: Array<NegativeKeyword>;
}

export const BulkEditNegativeKeywordsResponse: Schema.Schema<BulkEditNegativeKeywordsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
    }),
  ).annotate({
    identifier: "BulkEditNegativeKeywordsResponse",
  }) as any as Schema.Schema<BulkEditNegativeKeywordsResponse>;

export interface InventorySourceGroup {
  /** Output only. The resource name of the inventory source group. */
  name?: string;
  /** Output only. The unique ID of the inventory source group. Assigned by the system. */
  inventorySourceGroupId?: string;
  /** Required. The display name of the inventory source group. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
}

export const InventorySourceGroup: Schema.Schema<InventorySourceGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      inventorySourceGroupId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventorySourceGroup",
  }) as any as Schema.Schema<InventorySourceGroup>;

export interface BulkEditAssignedLocationsRequest {
  /** The assigned locations to create in bulk, specified as a list of AssignedLocation resources. */
  createdAssignedLocations?: Array<AssignedLocation>;
  /** The IDs of the assigned locations to delete in bulk, specified as a list of assignedLocationId values. */
  deletedAssignedLocations?: Array<string>;
}

export const BulkEditAssignedLocationsRequest: Schema.Schema<BulkEditAssignedLocationsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createdAssignedLocations: Schema.optional(Schema.Array(AssignedLocation)),
      deletedAssignedLocations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BulkEditAssignedLocationsRequest",
  }) as any as Schema.Schema<BulkEditAssignedLocationsRequest>;

export interface BulkEditAssignedInventorySourcesResponse {
  /** The list of assigned inventory sources that have been successfully created. This list will be absent if empty. */
  assignedInventorySources?: Array<AssignedInventorySource>;
}

export const BulkEditAssignedInventorySourcesResponse: Schema.Schema<BulkEditAssignedInventorySourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedInventorySources: Schema.optional(
        Schema.Array(AssignedInventorySource),
      ),
    }),
  ).annotate({
    identifier: "BulkEditAssignedInventorySourcesResponse",
  }) as any as Schema.Schema<BulkEditAssignedInventorySourcesResponse>;

export interface AssetAssociation {
  /** Optional. The associated asset. */
  asset?: Asset;
  /** Optional. The role of this asset for the creative. */
  role?:
    | "ASSET_ROLE_UNSPECIFIED"
    | "ASSET_ROLE_MAIN"
    | "ASSET_ROLE_BACKUP"
    | "ASSET_ROLE_POLITE_LOAD"
    | "ASSET_ROLE_HEADLINE"
    | "ASSET_ROLE_LONG_HEADLINE"
    | "ASSET_ROLE_BODY"
    | "ASSET_ROLE_LONG_BODY"
    | "ASSET_ROLE_CAPTION_URL"
    | "ASSET_ROLE_CALL_TO_ACTION"
    | "ASSET_ROLE_ADVERTISER_NAME"
    | "ASSET_ROLE_PRICE"
    | "ASSET_ROLE_ANDROID_APP_ID"
    | "ASSET_ROLE_IOS_APP_ID"
    | "ASSET_ROLE_RATING"
    | "ASSET_ROLE_ICON"
    | "ASSET_ROLE_COVER_IMAGE"
    | "ASSET_ROLE_BACKGROUND_COLOR"
    | "ASSET_ROLE_ACCENT_COLOR"
    | "ASSET_ROLE_REQUIRE_LOGO"
    | "ASSET_ROLE_REQUIRE_IMAGE"
    | "ASSET_ROLE_ENABLE_ASSET_ENHANCEMENTS"
    | (string & {});
}

export const AssetAssociation: Schema.Schema<AssetAssociation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      asset: Schema.optional(Asset),
      role: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AssetAssociation",
  }) as any as Schema.Schema<AssetAssociation>;

export interface CounterEvent {
  /** Required. The name of the counter event. */
  name?: string;
  /** Required. The name used to identify this counter event in reports. */
  reportingName?: string;
}

export const CounterEvent: Schema.Schema<CounterEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      reportingName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CounterEvent",
  }) as any as Schema.Schema<CounterEvent>;

export interface ThirdPartyUrl {
  /** Optional. Tracking URL used to track the interaction. Provide a URL with optional path or query string, beginning with `https:`. For example, `https://www.example.com/path` */
  url?: string;
  /** Optional. The type of interaction needs to be tracked by the tracking URL */
  type?:
    | "THIRD_PARTY_URL_TYPE_UNSPECIFIED"
    | "THIRD_PARTY_URL_TYPE_IMPRESSION"
    | "THIRD_PARTY_URL_TYPE_CLICK_TRACKING"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_START"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FIRST_QUARTILE"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MIDPOINT"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_THIRD_QUARTILE"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_COMPLETE"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MUTE"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PAUSE"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_REWIND"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FULLSCREEN"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_STOP"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_CUSTOM"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_SKIP"
    | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PROGRESS"
    | (string & {});
}

export const ThirdPartyUrl: Schema.Schema<ThirdPartyUrl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThirdPartyUrl",
  }) as any as Schema.Schema<ThirdPartyUrl>;

export interface CmTrackingAd {
  /** Optional. The placement ID of the campaign manager 360 tracking Ad. */
  cmPlacementId?: string;
  /** Optional. The ad ID of the campaign manager 360 tracking Ad. */
  cmAdId?: string;
  /** Optional. The creative ID of the campaign manager 360 tracking Ad. */
  cmCreativeId?: string;
}

export const CmTrackingAd: Schema.Schema<CmTrackingAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cmPlacementId: Schema.optional(Schema.String),
      cmAdId: Schema.optional(Schema.String),
      cmCreativeId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CmTrackingAd",
  }) as any as Schema.Schema<CmTrackingAd>;

export interface AudioVideoOffset {
  /** Optional. The offset in seconds from the start of the audio or video. */
  seconds?: string;
  /** Optional. The offset in percentage of the audio or video duration. */
  percentage?: string;
}

export const AudioVideoOffset: Schema.Schema<AudioVideoOffset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      seconds: Schema.optional(Schema.String),
      percentage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AudioVideoOffset",
  }) as any as Schema.Schema<AudioVideoOffset>;

export interface TimerEvent {
  /** Required. The name of the timer event. */
  name?: string;
  /** Required. The name used to identify this timer event in reports. */
  reportingName?: string;
}

export const TimerEvent: Schema.Schema<TimerEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      reportingName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimerEvent" }) as any as Schema.Schema<TimerEvent>;

export interface UniversalAdId {
  /** Optional. The unique creative identifier. */
  id?: string;
  /** Optional. The registry provides unique creative identifiers. */
  registry?:
    | "UNIVERSAL_AD_REGISTRY_UNSPECIFIED"
    | "UNIVERSAL_AD_REGISTRY_OTHER"
    | "UNIVERSAL_AD_REGISTRY_AD_ID"
    | "UNIVERSAL_AD_REGISTRY_CLEARCAST"
    | "UNIVERSAL_AD_REGISTRY_DV360"
    | "UNIVERSAL_AD_REGISTRY_CM"
    | (string & {});
}

export const UniversalAdId: Schema.Schema<UniversalAdId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      registry: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UniversalAdId",
  }) as any as Schema.Schema<UniversalAdId>;

export interface ExchangeReviewStatus {
  /** The exchange reviewing the creative. */
  exchange?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
  /** Status of the exchange review. */
  status?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "REVIEW_STATUS_APPROVED"
    | "REVIEW_STATUS_REJECTED"
    | "REVIEW_STATUS_PENDING"
    | (string & {});
}

export const ExchangeReviewStatus: Schema.Schema<ExchangeReviewStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exchange: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExchangeReviewStatus",
  }) as any as Schema.Schema<ExchangeReviewStatus>;

export interface ReviewStatusInfo {
  /** Represents the basic approval needed for a creative to begin serving. Summary of creative_and_landing_page_review_status and content_and_policy_review_status. */
  approvalStatus?:
    | "APPROVAL_STATUS_UNSPECIFIED"
    | "APPROVAL_STATUS_PENDING_NOT_SERVABLE"
    | "APPROVAL_STATUS_PENDING_SERVABLE"
    | "APPROVAL_STATUS_APPROVED_SERVABLE"
    | "APPROVAL_STATUS_REJECTED_NOT_SERVABLE"
    | (string & {});
  /** Content and policy review status for the creative. */
  contentAndPolicyReviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "REVIEW_STATUS_APPROVED"
    | "REVIEW_STATUS_REJECTED"
    | "REVIEW_STATUS_PENDING"
    | (string & {});
  /** Creative and landing page review status for the creative. */
  creativeAndLandingPageReviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "REVIEW_STATUS_APPROVED"
    | "REVIEW_STATUS_REJECTED"
    | "REVIEW_STATUS_PENDING"
    | (string & {});
  /** Exchange review statuses for the creative. */
  exchangeReviewStatuses?: Array<ExchangeReviewStatus>;
}

export const ReviewStatusInfo: Schema.Schema<ReviewStatusInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      approvalStatus: Schema.optional(Schema.String),
      contentAndPolicyReviewStatus: Schema.optional(Schema.String),
      creativeAndLandingPageReviewStatus: Schema.optional(Schema.String),
      exchangeReviewStatuses: Schema.optional(
        Schema.Array(ExchangeReviewStatus),
      ),
    }),
  ).annotate({
    identifier: "ReviewStatusInfo",
  }) as any as Schema.Schema<ReviewStatusInfo>;

export interface Creative {
  /** Output only. Indicates the third-party VAST tag creative requires HTML5 Video support. Output only and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_VIDEO` */
  html5Video?: boolean;
  /** Output only. Media duration of the creative. Applicable when creative_type is one of: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_PUBLISHER_HOSTED` */
  mediaDuration?: string;
  /** Optional. Specifies the expanding direction of the creative. Required and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE` */
  expandingDirection?:
    | "EXPANDING_DIRECTION_UNSPECIFIED"
    | "EXPANDING_DIRECTION_NONE"
    | "EXPANDING_DIRECTION_UP"
    | "EXPANDING_DIRECTION_DOWN"
    | "EXPANDING_DIRECTION_LEFT"
    | "EXPANDING_DIRECTION_RIGHT"
    | "EXPANDING_DIRECTION_UP_AND_LEFT"
    | "EXPANDING_DIRECTION_UP_AND_RIGHT"
    | "EXPANDING_DIRECTION_DOWN_AND_LEFT"
    | "EXPANDING_DIRECTION_DOWN_AND_RIGHT"
    | "EXPANDING_DIRECTION_UP_OR_DOWN"
    | "EXPANDING_DIRECTION_LEFT_OR_RIGHT"
    | "EXPANDING_DIRECTION_ANY_DIAGONAL"
    | (string & {});
  /** Output only. Indicates the third-party VAST tag creative requires VPAID (Digital Video Player-Ad Interface). Output only and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_VIDEO` */
  vpaid?: boolean;
  /** Optional. Indicates that the creative will wait for a return ping for attribution. Only valid when using a Campaign Manager 360 tracking ad with a third-party ad server parameter and the ${DC_DBM_TOKEN} macro. Optional and only valid for third-party tag creatives or third-party VAST tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` */
  requirePingForAttribution?: boolean;
  /** Output only. The timestamp when the creative was last updated, either by the user or system (e.g. creative review). Assigned by the system. */
  updateTime?: string;
  /** Optional. Indicates whether Integral Ad Science (IAS) campaign monitoring is enabled. To enable this for the creative, make sure the Advertiser.creative_config.ias_client_id has been set to your IAS client ID. */
  iasCampaignMonitoring?: boolean;
  /** Output only. The unique ID of the Campaign Manager 360 placement associated with the creative. This field is only applicable for creatives that are synced from Campaign Manager. */
  cmPlacementId?: string;
  /** Optional. Specifies the OBA icon for a video creative. This field is only supported in the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  obaIcon?: ObaIcon;
  /** Optional. The original third-party tag used for the creative. Required and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` */
  thirdPartyTag?: string;
  /** Optional. ID information used to link this creative to an external system. Must be UTF-8 encoded with a length of no more than 10,000 characters. */
  integrationCode?: string;
  /** Optional. Additional dimensions. Applicable when creative_type is one of: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_LIGHTBOX` * `CREATIVE_TYPE_PUBLISHER_HOSTED` If this field is specified, width_pixels and height_pixels are both required and must be greater than or equal to 0. */
  additionalDimensions?: Array<Dimensions>;
  /** Required. Assets associated to this creative. */
  assets?: Array<AssetAssociation>;
  /** Output only. The timestamp when the creative was created. Assigned by the system. */
  createTime?: string;
  /** Optional. Third-party HTML tracking tag to be appended to the creative tag. */
  appendedTag?: string;
  /** Optional. The URL of the VAST tag for a third-party VAST tag creative. Required and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` */
  vastTagUrl?: string;
  /** Output only. Indicates the third-party audio creative supports MP3. Output only and only valid for third-party audio creatives. Third-party audio creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` */
  mp3Audio?: boolean;
  /** Optional. User notes for this creative. Must be UTF-8 encoded with a length of no more than 20,000 characters. */
  notes?: string;
  /** Output only. The resource name of the creative. */
  name?: string;
  /** Optional. Counter events for a rich media creative. Counters track the number of times that a user interacts with any part of a rich media creative in a specified way (mouse-overs, mouse-outs, clicks, taps, data loading, keyboard entries, etc.). Any event that can be captured in the creative can be recorded as a counter. Leave it empty or unset for creatives containing image assets only. */
  counterEvents?: Array<CounterEvent>;
  /** Optional. Indicates that the creative requires MRAID (Mobile Rich Media Ad Interface Definitions system). Set this if the creative relies on mobile gestures for interactivity, such as swiping or tapping. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` */
  requireMraid?: boolean;
  /** Optional. Tracking URLs from third parties to track interactions with a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  thirdPartyUrls?: Array<ThirdPartyUrl>;
  /** Output only. The unique ID of the creative. Assigned by the system. */
  creativeId?: string;
  /** Optional. Whether the user can choose to skip a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  skippable?: boolean;
  /** Optional. JavaScript measurement URL from supported third-party verification providers (ComScore, DoubleVerify, IAS, Moat). HTML script tags are not supported. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  jsTrackerUrl?: string;
  /** Optional. The Campaign Manager 360 tracking ad associated with the creative. Optional for the following creative_type when created by an advertiser that uses both Campaign Manager 360 and third-party ad serving: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` Output only for other cases. */
  cmTrackingAd?: CmTrackingAd;
  /** Output only. A list of attributes of the creative that is generated by the system. */
  creativeAttributes?: Array<
    | "CREATIVE_ATTRIBUTE_UNSPECIFIED"
    | "CREATIVE_ATTRIBUTE_VAST"
    | "CREATIVE_ATTRIBUTE_VPAID_LINEAR"
    | "CREATIVE_ATTRIBUTE_VPAID_NON_LINEAR"
    | (string & {})
  >;
  /** Required. Primary dimensions of the creative. Applicable to all creative types. The value of width_pixels and height_pixels defaults to `0` when creative_type is one of: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  dimensions?: Dimensions;
  /** Required. Controls whether or not the creative can serve. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` * `ENTITY_STATUS_PAUSED` */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Output only. Audio/Video transcodes. Display & Video 360 transcodes the main asset into a number of alternative versions that use different file formats or have different properties (resolution, audio bit rate, and video bit rate), each designed for specific video players or bandwidths. These transcodes give a publisher's system more options to choose from for each impression on your video and ensures that the appropriate file serves based on the viewer’s connection and screen size. This field is only supported in the following creative_type: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_AUDIO` */
  transcodes?: Array<Transcode>;
  /** Optional. Indicates the creative will automatically expand on hover. Optional and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE` */
  expandOnHover?: boolean;
  /** Output only. Indicates the third-party audio creative supports OGG. Output only and only valid for third-party audio creatives. Third-party audio creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` */
  oggAudio?: boolean;
  /** Optional. Amount of time to play the video before the skip button appears. This field is required when skippable is true. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  skipOffset?: AudioVideoOffset;
  /** Optional. Tracking URLs for analytics providers or third-party ad technology vendors. The URLs must start with `https:` (except on inventory that doesn't require SSL compliance). If using macros in your URL, use only macros supported by Display & Video 360. Standard URLs only, no IMG or SCRIPT tags. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO` */
  trackerUrls?: Array<string>;
  /** Output only. The unique ID of the advertiser the creative belongs to. */
  advertiserId?: string;
  /** Required. Indicates where the creative is hosted. */
  hostingSource?:
    | "HOSTING_SOURCE_UNSPECIFIED"
    | "HOSTING_SOURCE_CM"
    | "HOSTING_SOURCE_THIRD_PARTY"
    | "HOSTING_SOURCE_HOSTED"
    | "HOSTING_SOURCE_RICH_MEDIA"
    | (string & {});
  /** Optional. Timer custom events for a rich media creative. Timers track the time during which a user views and interacts with a specified part of a rich media creative. A creative can have multiple timer events, each timed independently. Leave it empty or unset for creatives containing image assets only. */
  timerEvents?: Array<TimerEvent>;
  /** Required. Immutable. The type of the creative. */
  creativeType?:
    | "CREATIVE_TYPE_UNSPECIFIED"
    | "CREATIVE_TYPE_STANDARD"
    | "CREATIVE_TYPE_EXPANDABLE"
    | "CREATIVE_TYPE_VIDEO"
    | "CREATIVE_TYPE_NATIVE"
    | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL"
    | "CREATIVE_TYPE_NATIVE_SITE_SQUARE"
    | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL"
    | "CREATIVE_TYPE_LIGHTBOX"
    | "CREATIVE_TYPE_NATIVE_APP_INSTALL"
    | "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE"
    | "CREATIVE_TYPE_AUDIO"
    | "CREATIVE_TYPE_PUBLISHER_HOSTED"
    | "CREATIVE_TYPE_NATIVE_VIDEO"
    | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO"
    | "CREATIVE_TYPE_ASSET_BASED_CREATIVE"
    | (string & {});
  /** Optional. An optional creative identifier provided by a registry that is unique across all platforms. Universal Ad ID is part of the VAST 4.0 standard. It can be modified after the creative is created. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  universalAdId?: UniversalAdId;
  /** Required. The display name of the creative. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Exit events for this creative. An exit (also known as a click tag) is any area in your creative that someone can click or tap to open an advertiser's landing page. Every creative must include at least one exit. You can add an exit to your creative in any of the following ways: * Use Google Web Designer's tap area. * Define a JavaScript variable called "clickTag". * Use the Enabler (Enabler.exit()) to track exits in rich media formats. */
  exitEvents?: Array<ExitEvent>;
  /** Output only. The current status of the creative review process. */
  reviewStatus?: ReviewStatusInfo;
  /** Optional. Amount of time to play the video before counting a view. This field is required when skippable is true. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO` */
  progressOffset?: AudioVideoOffset;
  /** Output only. The IDs of the line items this creative is associated with. To associate a creative to a line item, use LineItem.creative_ids instead. */
  lineItemIds?: Array<string>;
  /** Optional. The IDs of companion creatives for a video creative. You can assign existing display creatives (with image or HTML5 assets) to serve surrounding the publisher's video player. Companions display around the video player while the video is playing and remain after the video has completed. Creatives contain additional dimensions can not be companion creatives. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` */
  companionCreativeIds?: Array<string>;
  /** Optional. Indicates that the creative relies on HTML5 to render properly. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` */
  requireHtml5?: boolean;
  /** Output only. Indicates whether the creative is dynamic. */
  dynamic?: boolean;
}

export const Creative: Schema.Schema<Creative> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      html5Video: Schema.optional(Schema.Boolean),
      mediaDuration: Schema.optional(Schema.String),
      expandingDirection: Schema.optional(Schema.String),
      vpaid: Schema.optional(Schema.Boolean),
      requirePingForAttribution: Schema.optional(Schema.Boolean),
      updateTime: Schema.optional(Schema.String),
      iasCampaignMonitoring: Schema.optional(Schema.Boolean),
      cmPlacementId: Schema.optional(Schema.String),
      obaIcon: Schema.optional(ObaIcon),
      thirdPartyTag: Schema.optional(Schema.String),
      integrationCode: Schema.optional(Schema.String),
      additionalDimensions: Schema.optional(Schema.Array(Dimensions)),
      assets: Schema.optional(Schema.Array(AssetAssociation)),
      createTime: Schema.optional(Schema.String),
      appendedTag: Schema.optional(Schema.String),
      vastTagUrl: Schema.optional(Schema.String),
      mp3Audio: Schema.optional(Schema.Boolean),
      notes: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      counterEvents: Schema.optional(Schema.Array(CounterEvent)),
      requireMraid: Schema.optional(Schema.Boolean),
      thirdPartyUrls: Schema.optional(Schema.Array(ThirdPartyUrl)),
      creativeId: Schema.optional(Schema.String),
      skippable: Schema.optional(Schema.Boolean),
      jsTrackerUrl: Schema.optional(Schema.String),
      cmTrackingAd: Schema.optional(CmTrackingAd),
      creativeAttributes: Schema.optional(Schema.Array(Schema.String)),
      dimensions: Schema.optional(Dimensions),
      entityStatus: Schema.optional(Schema.String),
      transcodes: Schema.optional(Schema.Array(Transcode)),
      expandOnHover: Schema.optional(Schema.Boolean),
      oggAudio: Schema.optional(Schema.Boolean),
      skipOffset: Schema.optional(AudioVideoOffset),
      trackerUrls: Schema.optional(Schema.Array(Schema.String)),
      advertiserId: Schema.optional(Schema.String),
      hostingSource: Schema.optional(Schema.String),
      timerEvents: Schema.optional(Schema.Array(TimerEvent)),
      creativeType: Schema.optional(Schema.String),
      universalAdId: Schema.optional(UniversalAdId),
      displayName: Schema.optional(Schema.String),
      exitEvents: Schema.optional(Schema.Array(ExitEvent)),
      reviewStatus: Schema.optional(ReviewStatusInfo),
      progressOffset: Schema.optional(AudioVideoOffset),
      lineItemIds: Schema.optional(Schema.Array(Schema.String)),
      companionCreativeIds: Schema.optional(Schema.Array(Schema.String)),
      requireHtml5: Schema.optional(Schema.Boolean),
      dynamic: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Creative" }) as any as Schema.Schema<Creative>;

export interface ListCreativesResponse {
  /** The list of creatives. This list will be absent if empty. */
  creatives?: Array<Creative>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCreativesRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCreativesResponse: Schema.Schema<ListCreativesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creatives: Schema.optional(Schema.Array(Creative)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCreativesResponse",
  }) as any as Schema.Schema<ListCreativesResponse>;

export interface BulkEditPartnerAssignedTargetingOptionsRequest {
  /** The assigned targeting options to delete in batch, specified as a list of `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** The assigned targeting options to create in batch, specified as a list of `CreateAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
}

export const BulkEditPartnerAssignedTargetingOptionsRequest: Schema.Schema<BulkEditPartnerAssignedTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deleteRequests: Schema.optional(
        Schema.Array(DeleteAssignedTargetingOptionsRequest),
      ),
      createRequests: Schema.optional(
        Schema.Array(CreateAssignedTargetingOptionsRequest),
      ),
    }),
  ).annotate({
    identifier: "BulkEditPartnerAssignedTargetingOptionsRequest",
  }) as any as Schema.Schema<BulkEditPartnerAssignedTargetingOptionsRequest>;

export interface AlgorithmRulesComparisonValue {
  /** String value. */
  stringValue?: string;
  /** Boolean value. */
  boolValue?: boolean;
  /** Double value. */
  doubleValue?: number;
  /** Creative dimension value. */
  creativeDimensionValue?: Dimensions;
  /** Ad position value. */
  onScreenPositionValue?:
    | "ON_SCREEN_POSITION_UNSPECIFIED"
    | "ON_SCREEN_POSITION_UNKNOWN"
    | "ON_SCREEN_POSITION_ABOVE_THE_FOLD"
    | "ON_SCREEN_POSITION_BELOW_THE_FOLD"
    | (string & {});
  /** Environment value. */
  environmentValue?:
    | "ENVIRONMENT_UNSPECIFIED"
    | "ENVIRONMENT_WEB_OPTIMIZED"
    | "ENVIRONMENT_WEB_NOT_OPTIMIZED"
    | "ENVIRONMENT_APP"
    | (string & {});
  /** Exchange value. */
  exchangeValue?:
    | "EXCHANGE_UNSPECIFIED"
    | "EXCHANGE_GOOGLE_AD_MANAGER"
    | "EXCHANGE_APPNEXUS"
    | "EXCHANGE_BRIGHTROLL"
    | "EXCHANGE_ADFORM"
    | "EXCHANGE_ADMETA"
    | "EXCHANGE_ADMIXER"
    | "EXCHANGE_ADSMOGO"
    | "EXCHANGE_ADSWIZZ"
    | "EXCHANGE_BIDSWITCH"
    | "EXCHANGE_BRIGHTROLL_DISPLAY"
    | "EXCHANGE_CADREON"
    | "EXCHANGE_DAILYMOTION"
    | "EXCHANGE_FIVE"
    | "EXCHANGE_FLUCT"
    | "EXCHANGE_FREEWHEEL"
    | "EXCHANGE_GENIEE"
    | "EXCHANGE_GUMGUM"
    | "EXCHANGE_IMOBILE"
    | "EXCHANGE_IBILLBOARD"
    | "EXCHANGE_IMPROVE_DIGITAL"
    | "EXCHANGE_INDEX"
    | "EXCHANGE_KARGO"
    | "EXCHANGE_MICROAD"
    | "EXCHANGE_MOPUB"
    | "EXCHANGE_NEND"
    | "EXCHANGE_ONE_BY_AOL_DISPLAY"
    | "EXCHANGE_ONE_BY_AOL_MOBILE"
    | "EXCHANGE_ONE_BY_AOL_VIDEO"
    | "EXCHANGE_OOYALA"
    | "EXCHANGE_OPENX"
    | "EXCHANGE_PERMODO"
    | "EXCHANGE_PLATFORMONE"
    | "EXCHANGE_PLATFORMID"
    | "EXCHANGE_PUBMATIC"
    | "EXCHANGE_PULSEPOINT"
    | "EXCHANGE_REVENUEMAX"
    | "EXCHANGE_RUBICON"
    | "EXCHANGE_SMARTCLIP"
    | "EXCHANGE_SMARTRTB"
    | "EXCHANGE_SMARTSTREAMTV"
    | "EXCHANGE_SOVRN"
    | "EXCHANGE_SPOTXCHANGE"
    | "EXCHANGE_STROER"
    | "EXCHANGE_TEADSTV"
    | "EXCHANGE_TELARIA"
    | "EXCHANGE_TVN"
    | "EXCHANGE_UNITED"
    | "EXCHANGE_YIELDLAB"
    | "EXCHANGE_YIELDMO"
    | "EXCHANGE_UNRULYX"
    | "EXCHANGE_OPEN8"
    | "EXCHANGE_TRITON"
    | "EXCHANGE_TRIPLELIFT"
    | "EXCHANGE_TABOOLA"
    | "EXCHANGE_INMOBI"
    | "EXCHANGE_SMAATO"
    | "EXCHANGE_AJA"
    | "EXCHANGE_SUPERSHIP"
    | "EXCHANGE_NEXSTAR_DIGITAL"
    | "EXCHANGE_WAZE"
    | "EXCHANGE_SOUNDCAST"
    | "EXCHANGE_SHARETHROUGH"
    | "EXCHANGE_FYBER"
    | "EXCHANGE_RED_FOR_PUBLISHERS"
    | "EXCHANGE_MEDIANET"
    | "EXCHANGE_TAPJOY"
    | "EXCHANGE_VISTAR"
    | "EXCHANGE_DAX"
    | "EXCHANGE_JCD"
    | "EXCHANGE_PLACE_EXCHANGE"
    | "EXCHANGE_APPLOVIN"
    | "EXCHANGE_CONNATIX"
    | "EXCHANGE_RESET_DIGITAL"
    | "EXCHANGE_HIVESTACK"
    | "EXCHANGE_DRAX"
    | "EXCHANGE_APPLOVIN_GBID"
    | "EXCHANGE_FYBER_GBID"
    | "EXCHANGE_UNITY_GBID"
    | "EXCHANGE_CHARTBOOST_GBID"
    | "EXCHANGE_ADMOST_GBID"
    | "EXCHANGE_TOPON_GBID"
    | "EXCHANGE_NETFLIX"
    | "EXCHANGE_CORE"
    | "EXCHANGE_COMMERCE_GRID"
    | "EXCHANGE_SPOTIFY"
    | "EXCHANGE_TUBI"
    | "EXCHANGE_SNAP"
    | "EXCHANGE_CADENT"
    | (string & {});
  /** Device type value. */
  deviceTypeValue?:
    | "RULE_DEVICE_TYPE_UNSPECIFIED"
    | "RULE_DEVICE_TYPE_COMPUTER"
    | "RULE_DEVICE_TYPE_CONNECTED_TV"
    | "RULE_DEVICE_TYPE_SMART_PHONE"
    | "RULE_DEVICE_TYPE_TABLET"
    | "RULE_DEVICE_TYPE_CONNECTED_DEVICE"
    | "RULE_DEVICE_TYPE_SET_TOP_BOX"
    | (string & {});
  /** Video genre id value. */
  contentGenreIdValue?: string;
  /** Integer value. */
  int64Value?: string;
  /** Video content duration value. */
  contentDurationValue?:
    | "CONTENT_DURATION_UNSPECIFIED"
    | "CONTENT_DURATION_UNKNOWN"
    | "CONTENT_DURATION_0_TO_1_MIN"
    | "CONTENT_DURATION_1_TO_5_MIN"
    | "CONTENT_DURATION_5_TO_15_MIN"
    | "CONTENT_DURATION_15_TO_30_MIN"
    | "CONTENT_DURATION_30_TO_60_MIN"
    | "CONTENT_DURATION_OVER_60_MIN"
    | (string & {});
  /** Video player size value. This field is only supported for allowlisted partners. */
  videoPlayerSizeValue?:
    | "VIDEO_PLAYER_SIZE_UNSPECIFIED"
    | "VIDEO_PLAYER_SIZE_SMALL"
    | "VIDEO_PLAYER_SIZE_LARGE"
    | "VIDEO_PLAYER_SIZE_HD"
    | "VIDEO_PLAYER_SIZE_UNKNOWN"
    | (string & {});
  /** Day and time value. Only `TIME_ZONE_RESOLUTION_END_USER` is supported. */
  dayAndTimeValue?: DayAndTime;
  /** Video delivery type value. */
  contentStreamTypeValue?:
    | "CONTENT_STREAM_TYPE_UNSPECIFIED"
    | "CONTENT_LIVE_STREAM"
    | "CONTENT_ON_DEMAND"
    | (string & {});
}

export const AlgorithmRulesComparisonValue: Schema.Schema<AlgorithmRulesComparisonValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stringValue: Schema.optional(Schema.String),
      boolValue: Schema.optional(Schema.Boolean),
      doubleValue: Schema.optional(Schema.Number),
      creativeDimensionValue: Schema.optional(Dimensions),
      onScreenPositionValue: Schema.optional(Schema.String),
      environmentValue: Schema.optional(Schema.String),
      exchangeValue: Schema.optional(Schema.String),
      deviceTypeValue: Schema.optional(Schema.String),
      contentGenreIdValue: Schema.optional(Schema.String),
      int64Value: Schema.optional(Schema.String),
      contentDurationValue: Schema.optional(Schema.String),
      videoPlayerSizeValue: Schema.optional(Schema.String),
      dayAndTimeValue: Schema.optional(DayAndTime),
      contentStreamTypeValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AlgorithmRulesComparisonValue",
  }) as any as Schema.Schema<AlgorithmRulesComparisonValue>;

export interface AlgorithmRulesSignalComparison {
  /** Operator used to compare the two values. In the resulting experession, the `signal` will be the first value and the `comparisonValue will be the second. */
  comparisonOperator?:
    | "COMPARISON_OPERATOR_UNSPECIFIED"
    | "EQUAL"
    | "GREATER_THAN"
    | "LESS_THAN"
    | "GREATER_THAN_OR_EQUAL_TO"
    | "LESS_THAN_OR_EQUAL_TO"
    | "LIST_CONTAINS"
    | (string & {});
  /** Signal to compare. */
  signal?: AlgorithmRulesSignal;
  /** Value to compare signal to. */
  comparisonValue?: AlgorithmRulesComparisonValue;
}

export const AlgorithmRulesSignalComparison: Schema.Schema<AlgorithmRulesSignalComparison> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      comparisonOperator: Schema.optional(Schema.String),
      signal: Schema.optional(AlgorithmRulesSignal),
      comparisonValue: Schema.optional(AlgorithmRulesComparisonValue),
    }),
  ).annotate({
    identifier: "AlgorithmRulesSignalComparison",
  }) as any as Schema.Schema<AlgorithmRulesSignalComparison>;

export interface AlgorithmRulesRuleCondition {
  /** List of comparisons that build `if` statement condition. The comparisons are combined into a single condition with `AND` logical operators. */
  signalComparisons?: Array<AlgorithmRulesSignalComparison>;
  /** The value returned if the `signalComparisons` condition evaluates to `TRUE`. */
  returnValue?: AlgorithmRulesSignalValue;
}

export const AlgorithmRulesRuleCondition: Schema.Schema<AlgorithmRulesRuleCondition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signalComparisons: Schema.optional(
        Schema.Array(AlgorithmRulesSignalComparison),
      ),
      returnValue: Schema.optional(AlgorithmRulesSignalValue),
    }),
  ).annotate({
    identifier: "AlgorithmRulesRuleCondition",
  }) as any as Schema.Schema<AlgorithmRulesRuleCondition>;

export interface AlgorithmRulesRule {
  /** List of conditions in this rule. The criteria among conditions should be mutually exclusive. */
  conditions?: Array<AlgorithmRulesRuleCondition>;
  /** The default return value applied when none of the conditions are met. */
  defaultReturnValue?: AlgorithmRulesSignalValue;
}

export const AlgorithmRulesRule: Schema.Schema<AlgorithmRulesRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conditions: Schema.optional(Schema.Array(AlgorithmRulesRuleCondition)),
      defaultReturnValue: Schema.optional(AlgorithmRulesSignalValue),
    }),
  ).annotate({
    identifier: "AlgorithmRulesRule",
  }) as any as Schema.Schema<AlgorithmRulesRule>;

export interface AlgorithmRulesRuleset {
  /** Maximum value the ruleset can evaluate to. */
  maxValue?: number;
  /** List of rules to generate the impression value. */
  rules?: Array<AlgorithmRulesRule>;
  /** How to aggregate values of evaluated rules. */
  aggregationType?:
    | "RULE_AGGREGATION_TYPE_UNSPECIFIED"
    | "SUM_OF_VALUES"
    | "PRODUCT_OF_VALUES"
    | "MAXIMUM_VALUE"
    | (string & {});
}

export const AlgorithmRulesRuleset: Schema.Schema<AlgorithmRulesRuleset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxValue: Schema.optional(Schema.Number),
      rules: Schema.optional(Schema.Array(AlgorithmRulesRule)),
      aggregationType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AlgorithmRulesRuleset",
  }) as any as Schema.Schema<AlgorithmRulesRuleset>;

export interface BulkCreateAdAssetsResponse {
  /** The created ad assets. */
  adAssets?: Array<AdAsset>;
}

export const BulkCreateAdAssetsResponse: Schema.Schema<BulkCreateAdAssetsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adAssets: Schema.optional(Schema.Array(AdAsset)),
    }),
  ).annotate({
    identifier: "BulkCreateAdAssetsResponse",
  }) as any as Schema.Schema<BulkCreateAdAssetsResponse>;

export interface ScriptError {
  /** The type of error. */
  errorCode?:
    | "ERROR_CODE_UNSPECIFIED"
    | "SYNTAX_ERROR"
    | "DEPRECATED_SYNTAX"
    | "INTERNAL_ERROR"
    | (string & {});
  /** The column number in the script where the error was thrown. */
  column?: string;
  /** The detailed error message. */
  errorMessage?: string;
  /** The line number in the script where the error was thrown. */
  line?: string;
}

export const ScriptError: Schema.Schema<ScriptError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errorCode: Schema.optional(Schema.String),
      column: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      line: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ScriptError",
  }) as any as Schema.Schema<ScriptError>;

export interface SelectedInventories {
  /** Whether the ad group is opted-in to YouTube shorts inventory. */
  allowYoutubeShorts?: boolean;
  /** Whether the ad group is opted-in to YouTube in-feed inventory. */
  allowYoutubeFeed?: boolean;
  /** Whether the ad group is opted-in to Gmail inventory. */
  allowGmail?: boolean;
  /** Whether the ad group is opted-in to Discover inventory. */
  allowDiscover?: boolean;
  /** Whether the ad group is opted-in to Google Display Network inventory. */
  allowGoogleDisplayNetwork?: boolean;
  /** Whether the ad group is opted-in to YouTube in-stream. */
  allowYoutubeStream?: boolean;
}

export const SelectedInventories: Schema.Schema<SelectedInventories> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowYoutubeShorts: Schema.optional(Schema.Boolean),
      allowYoutubeFeed: Schema.optional(Schema.Boolean),
      allowGmail: Schema.optional(Schema.Boolean),
      allowDiscover: Schema.optional(Schema.Boolean),
      allowGoogleDisplayNetwork: Schema.optional(Schema.Boolean),
      allowYoutubeStream: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SelectedInventories",
  }) as any as Schema.Schema<SelectedInventories>;

export interface ListLineItemAssignedTargetingOptionsResponse {
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListLineItemAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const ListLineItemAssignedTargetingOptionsResponse: Schema.Schema<ListLineItemAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      assignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
    }),
  ).annotate({
    identifier: "ListLineItemAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<ListLineItemAssignedTargetingOptionsResponse>;

export interface CampaignFlight {
  /** Required. The dates that the campaign is expected to run. They are resolved relative to the parent advertiser's time zone. * The dates specified here will not affect serving. They are used to generate alerts and warnings. For example, if the flight date of any child insertion order is outside the range of these dates, the user interface will show a warning. * `start_date` is required and must be the current date or later. * `end_date` is optional. If specified, it must be the `start_date` or later. * Any specified date must be before the year 2037. */
  plannedDates?: DateRange;
  /** The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI. The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency. */
  plannedSpendAmountMicros?: string;
}

export const CampaignFlight: Schema.Schema<CampaignFlight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      plannedDates: Schema.optional(DateRange),
      plannedSpendAmountMicros: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CampaignFlight",
  }) as any as Schema.Schema<CampaignFlight>;

export interface BulkEditAdvertiserAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options that have been successfully created. This list will be absent if empty. */
  createdAssignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const BulkEditAdvertiserAssignedTargetingOptionsResponse: Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createdAssignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
    }),
  ).annotate({
    identifier: "BulkEditAdvertiserAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkEditAdvertiserAssignedTargetingOptionsResponse>;

export interface EditGuaranteedOrderReadAccessorsRequest {
  /** Whether to give all advertisers of the read/write accessor partner read access to the guaranteed order. Only applicable if read_write_partner_id is set in the guaranteed order. */
  readAccessInherited?: boolean;
  /** The advertisers to add as read accessors to the guaranteed order. */
  addedAdvertisers?: Array<string>;
  /** Required. The partner context in which the change is being made. */
  partnerId?: string;
  /** The advertisers to remove as read accessors to the guaranteed order. */
  removedAdvertisers?: Array<string>;
}

export const EditGuaranteedOrderReadAccessorsRequest: Schema.Schema<EditGuaranteedOrderReadAccessorsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      readAccessInherited: Schema.optional(Schema.Boolean),
      addedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
      partnerId: Schema.optional(Schema.String),
      removedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "EditGuaranteedOrderReadAccessorsRequest",
  }) as any as Schema.Schema<EditGuaranteedOrderReadAccessorsRequest>;

export interface DemandGenImageAd {
  /** Optional. The suffix to append to landing page URLs. */
  finalUrlSuffix?: string;
  /** Optional. The URL address of the webpage that people reach after they click the ad on a mobile device. */
  finalMobileUrl?: string;
  /** The list of square marketing images shown on the ad. */
  squareMarketingImages?: Array<ImageAsset>;
  /** The list of portrait marketing images shown on the ad. */
  portraitMarketingImages?: Array<ImageAsset>;
  /** Required. The call-to-action button shown on the ad. */
  callToAction?: string;
  /** Required. The list of headlines shown on the ad. */
  headlines?: Array<string>;
  /** The list of logo images shown on the ad. */
  logoImages?: Array<ImageAsset>;
  /** Optional. The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
  /** Optional. The tracking URL specified by the user manually. */
  userSpecifiedTrackingUrl?: string;
  /** The list of marketing images shown on the ad. */
  marketingImages?: Array<ImageAsset>;
  /** Required. The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** Required. The business name shown on the ad. */
  businessName?: string;
  /** Required. The list of descriptions shown on the ad. */
  descriptions?: Array<string>;
  /** Output only. The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
}

export const DemandGenImageAd: Schema.Schema<DemandGenImageAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      finalUrlSuffix: Schema.optional(Schema.String),
      finalMobileUrl: Schema.optional(Schema.String),
      squareMarketingImages: Schema.optional(Schema.Array(ImageAsset)),
      portraitMarketingImages: Schema.optional(Schema.Array(ImageAsset)),
      callToAction: Schema.optional(Schema.String),
      headlines: Schema.optional(Schema.Array(Schema.String)),
      logoImages: Schema.optional(Schema.Array(ImageAsset)),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      userSpecifiedTrackingUrl: Schema.optional(Schema.String),
      marketingImages: Schema.optional(Schema.Array(ImageAsset)),
      finalUrl: Schema.optional(Schema.String),
      businessName: Schema.optional(Schema.String),
      descriptions: Schema.optional(Schema.Array(Schema.String)),
      trackingUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DemandGenImageAd",
  }) as any as Schema.Schema<DemandGenImageAd>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface AuditAdvertiserResponse {
  /** The number of individual targeting options from the following targeting types that are assigned to a line item under this advertiser. These individual targeting options count towards the limit of 900000 campaign targeting options per advertiser. Qualifying Targeting types: * Position * Browser * Connection speed * Day and time * Device and operating system * Digital content label * Sensitive categories * Environment * Geography, including business chains and proximity * ISP * Language * Third-party verification */
  campaignCriteriaCount?: string;
  /** The number of ACTIVE, PAUSED, and DRAFT line items under this advertiser. These line items count towards the limit of 9999 line items per advertiser. */
  usedLineItemsCount?: string;
  /** The number of ACTIVE, PAUSED and DRAFT insertion orders under this advertiser. These insertion orders count towards the limit of 9999 insertion orders per advertiser. */
  usedInsertionOrdersCount?: string;
  /** The number of individual targeting options from the following targeting types that are assigned to a line item under this advertiser. These individual targeting options count towards the limit of 4500000 ad group targeting options per advertiser. Qualifying Targeting types: * Channels, URLs, apps, and collections * Demographic * Google Audiences, including Affinity, Custom Affinity, and In-market audiences * Inventory source * Keyword * Mobile app category * User lists * Video targeting * Viewability */
  adGroupCriteriaCount?: string;
  /** The number of negatively targeted channels created under this advertiser. These negatively targeted channels count towards the limit of 5 negatively targeted channels per advertiser. */
  negativelyTargetedChannelsCount?: string;
  /** The number of negative keyword lists created under this advertiser. These negative keyword lists count towards the limit of 20 negative keyword lists per advertiser. */
  negativeKeywordListsCount?: string;
  /** The number of ACTIVE and PAUSED campaigns under this advertiser. These campaigns count towards the limit of 9999 campaigns per advertiser. */
  usedCampaignsCount?: string;
  /** The number of channels created under this advertiser. These channels count towards the limit of 1000 channels per advertiser. */
  channelsCount?: string;
}

export const AuditAdvertiserResponse: Schema.Schema<AuditAdvertiserResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      campaignCriteriaCount: Schema.optional(Schema.String),
      usedLineItemsCount: Schema.optional(Schema.String),
      usedInsertionOrdersCount: Schema.optional(Schema.String),
      adGroupCriteriaCount: Schema.optional(Schema.String),
      negativelyTargetedChannelsCount: Schema.optional(Schema.String),
      negativeKeywordListsCount: Schema.optional(Schema.String),
      usedCampaignsCount: Schema.optional(Schema.String),
      channelsCount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuditAdvertiserResponse",
  }) as any as Schema.Schema<AuditAdvertiserResponse>;

export interface PoiSearchTerms {
  /** The search query for the desired POI name, street address, or coordinate of the desired POI. The query can be a prefix, e.g. "Times squar", "40.7505045,-73.99562", "315 W 44th St", etc. */
  poiQuery?: string;
}

export const PoiSearchTerms: Schema.Schema<PoiSearchTerms> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      poiQuery: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PoiSearchTerms",
  }) as any as Schema.Schema<PoiSearchTerms>;

export interface GeoRegionSearchTerms {
  /** The search query for the desired geo region. The query can be a prefix, e.g. "New Yor", "Seattle", "USA", etc. */
  geoRegionQuery?: string;
}

export const GeoRegionSearchTerms: Schema.Schema<GeoRegionSearchTerms> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      geoRegionQuery: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GeoRegionSearchTerms",
  }) as any as Schema.Schema<GeoRegionSearchTerms>;

export interface SearchTargetingOptionsRequest {
  /** Required. The Advertiser this request is being made in the context of. */
  advertiserId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Search terms for POI targeting options. Can only be used when targeting_type is `TARGETING_TYPE_POI`. */
  poiSearchTerms?: PoiSearchTerms;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `SearchTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Search terms for Business Chain targeting options. Can only be used when targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`. */
  businessChainSearchTerms?: BusinessChainSearchTerms;
  /** Search terms for geo region targeting options. Can only be used when targeting_type is `TARGETING_TYPE_GEO_REGION`. */
  geoRegionSearchTerms?: GeoRegionSearchTerms;
}

export const SearchTargetingOptionsRequest: Schema.Schema<SearchTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertiserId: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
      poiSearchTerms: Schema.optional(PoiSearchTerms),
      pageToken: Schema.optional(Schema.String),
      businessChainSearchTerms: Schema.optional(BusinessChainSearchTerms),
      geoRegionSearchTerms: Schema.optional(GeoRegionSearchTerms),
    }),
  ).annotate({
    identifier: "SearchTargetingOptionsRequest",
  }) as any as Schema.Schema<SearchTargetingOptionsRequest>;

export interface BulkUpdateLineItemsRequest {
  /** Required. IDs of line items to update. */
  lineItemIds?: Array<string>;
  /** Required. A line item object containing the fields to be updated and the new values to assign to all line items specified in line_item_ids." */
  targetLineItem?: LineItem;
  /** Required. A field mask identifying which fields to update. Only the following fields are currently supported: * entityStatus * containsEuPoliticalAds */
  updateMask?: string;
}

export const BulkUpdateLineItemsRequest: Schema.Schema<BulkUpdateLineItemsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineItemIds: Schema.optional(Schema.Array(Schema.String)),
      targetLineItem: Schema.optional(LineItem),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BulkUpdateLineItemsRequest",
  }) as any as Schema.Schema<BulkUpdateLineItemsRequest>;

export interface CommonInStreamAttribute {
  /** The text on the call-to-action button. */
  actionButtonLabel?: string;
  /** The image which shows next to the video ad. */
  companionBanner?: ImageAsset;
  /** The webpage address that appears with the ad. */
  displayUrl?: string;
  /** The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** The YouTube video of the ad. */
  video?: YoutubeVideoDetails;
  /** The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** The headline of the call-to-action banner. */
  actionHeadline?: string;
}

export const CommonInStreamAttribute: Schema.Schema<CommonInStreamAttribute> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionButtonLabel: Schema.optional(Schema.String),
      companionBanner: Schema.optional(ImageAsset),
      displayUrl: Schema.optional(Schema.String),
      finalUrl: Schema.optional(Schema.String),
      video: Schema.optional(YoutubeVideoDetails),
      trackingUrl: Schema.optional(Schema.String),
      actionHeadline: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CommonInStreamAttribute",
  }) as any as Schema.Schema<CommonInStreamAttribute>;

export interface InStreamAd {
  /** Common ad attributes. */
  commonInStreamAttribute?: CommonInStreamAttribute;
  /** The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
}

export const InStreamAd: Schema.Schema<InStreamAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      commonInStreamAttribute: Schema.optional(CommonInStreamAttribute),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({ identifier: "InStreamAd" }) as any as Schema.Schema<InStreamAd>;

export interface ListAdvertiserAssignedTargetingOptionsResponse {
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListAdvertiserAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const ListAdvertiserAssignedTargetingOptionsResponse: Schema.Schema<ListAdvertiserAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdvertiserAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<ListAdvertiserAssignedTargetingOptionsResponse>;

export interface ListChannelsResponse {
  /** The list of channels. This list will be absent if empty. */
  channels?: Array<Channel>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListChannels` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListChannelsResponse: Schema.Schema<ListChannelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channels: Schema.optional(Schema.Array(Channel)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListChannelsResponse",
  }) as any as Schema.Schema<ListChannelsResponse>;

export interface DisplayVideoSourceAd {
  /** The ID of the source creative. */
  creativeId?: string;
}

export const DisplayVideoSourceAd: Schema.Schema<DisplayVideoSourceAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creativeId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DisplayVideoSourceAd",
  }) as any as Schema.Schema<DisplayVideoSourceAd>;

export interface AdUrl {
  /** The type of the Ad URL. */
  type?:
    | "AD_URL_TYPE_UNSPECIFIED"
    | "AD_URL_TYPE_BEACON_IMPRESSION"
    | "AD_URL_TYPE_BEACON_EXPANDABLE_DCM_IMPRESSION"
    | "AD_URL_TYPE_BEACON_CLICK"
    | "AD_URL_TYPE_BEACON_SKIP"
    | (string & {});
  /** The URL string value. */
  url?: string;
}

export const AdUrl: Schema.Schema<AdUrl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "AdUrl" }) as any as Schema.Schema<AdUrl>;

export interface LineItemAssignedTargetingOption {
  /** The ID of the line item the assigned targeting option is assigned to. */
  lineItemId?: string;
  /** The assigned targeting option resource. */
  assignedTargetingOption?: AssignedTargetingOption;
}

export const LineItemAssignedTargetingOption: Schema.Schema<LineItemAssignedTargetingOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineItemId: Schema.optional(Schema.String),
      assignedTargetingOption: Schema.optional(AssignedTargetingOption),
    }),
  ).annotate({
    identifier: "LineItemAssignedTargetingOption",
  }) as any as Schema.Schema<LineItemAssignedTargetingOption>;

export interface ReplaceNegativeKeywordsResponse {
  /** The full list of negative keywords now present in the negative keyword list. */
  negativeKeywords?: Array<NegativeKeyword>;
}

export const ReplaceNegativeKeywordsResponse: Schema.Schema<ReplaceNegativeKeywordsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      negativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
    }),
  ).annotate({
    identifier: "ReplaceNegativeKeywordsResponse",
  }) as any as Schema.Schema<ReplaceNegativeKeywordsResponse>;

export interface CustomList {
  /** Output only. The unique ID of the custom list. Assigned by the system. */
  customListId?: string;
  /** Output only. The resource name of the custom list. */
  name?: string;
  /** Output only. The display name of the custom list. . */
  displayName?: string;
}

export const CustomList: Schema.Schema<CustomList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customListId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CustomList" }) as any as Schema.Schema<CustomList>;

export interface BulkEditNegativeKeywordsRequest {
  /** The negative keywords to create in batch, specified as a list of NegativeKeywords. */
  createdNegativeKeywords?: Array<NegativeKeyword>;
  /** The negative keywords to delete in batch, specified as a list of keyword_values. */
  deletedNegativeKeywords?: Array<string>;
}

export const BulkEditNegativeKeywordsRequest: Schema.Schema<BulkEditNegativeKeywordsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createdNegativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
      deletedNegativeKeywords: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BulkEditNegativeKeywordsRequest",
  }) as any as Schema.Schema<BulkEditNegativeKeywordsRequest>;

export interface ListCustomListsResponse {
  /** The list of custom lists. This list will be absent if empty. */
  customLists?: Array<CustomList>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomLists` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCustomListsResponse: Schema.Schema<ListCustomListsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customLists: Schema.optional(Schema.Array(CustomList)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomListsResponse",
  }) as any as Schema.Schema<ListCustomListsResponse>;

export interface DemandGenVideoAd {
  /** Required. The call-to-action button shown on the ad. The supported values are: * `AUTOMATED` * `LEARN_MORE` * `GET_QUOTE` * `APPLY_NOW` * `SIGN_UP` * `CONTACT_US` * `SUBSCRIBE` * `DOWNLOAD` * `BOOK_NOW` * `SHOP_NOW` * `BUY_NOW` * `DONATE_NOW` * `ORDER_NOW` * `PLAY_NOW` * `SEE_MORE` * `START_NOW` * `VISIT_SITE` * `WATCH_NOW` */
  callToAction?:
    | "CALL_TO_ACTION_UNSPECIFIED"
    | "AUTOMATED"
    | "LEARN_MORE"
    | "GET_QUOTE"
    | "APPLY_NOW"
    | "SIGN_UP"
    | "CONTACT_US"
    | "SUBSCRIBE"
    | "DOWNLOAD"
    | "BOOK_NOW"
    | "SHOP_NOW"
    | "BUY_NOW"
    | "DONATE_NOW"
    | "ORDER_NOW"
    | "PLAY_NOW"
    | "SEE_MORE"
    | "START_NOW"
    | "VISIT_SITE"
    | "WATCH_NOW"
    | (string & {});
  /** Required. The list of headlines shown on the ad. */
  headlines?: Array<string>;
  /** Required. The list of YouTube video assets used by this ad. */
  videos?: Array<YoutubeVideoDetails>;
  /** Optional. The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
  /** Optional. The companion banner used by this ad. */
  companionBanner?: ImageAsset;
  /** Optional. The tracking URL specified by the user manually. */
  userSpecifiedTrackingUrl?: string;
  /** Optional. The suffix to append to landing page URLs. */
  finalUrlSuffix?: string;
  /** Optional. The URL address of the webpage that people reach after they click the ad on a mobile device. */
  finalMobileUrl?: string;
  /** Required. The logo image used by this ad. */
  logo?: ImageAsset;
  /** Required. The list of descriptions shown on the ad. */
  descriptions?: Array<string>;
  /** Output only. The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** Optional. The first piece after the domain in the display URL. */
  displayUrlBreadcrumb1?: string;
  /** Required. The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** Optional. The second piece after the domain in the display URL. */
  displayUrlBreadcrumb2?: string;
  /** Required. The list of lone headlines shown on the ad. */
  longHeadlines?: Array<string>;
  /** Required. The business name shown on the ad. */
  businessName?: string;
}

export const DemandGenVideoAd: Schema.Schema<DemandGenVideoAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      callToAction: Schema.optional(Schema.String),
      headlines: Schema.optional(Schema.Array(Schema.String)),
      videos: Schema.optional(Schema.Array(YoutubeVideoDetails)),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      companionBanner: Schema.optional(ImageAsset),
      userSpecifiedTrackingUrl: Schema.optional(Schema.String),
      finalUrlSuffix: Schema.optional(Schema.String),
      finalMobileUrl: Schema.optional(Schema.String),
      logo: Schema.optional(ImageAsset),
      descriptions: Schema.optional(Schema.Array(Schema.String)),
      trackingUrl: Schema.optional(Schema.String),
      displayUrlBreadcrumb1: Schema.optional(Schema.String),
      finalUrl: Schema.optional(Schema.String),
      displayUrlBreadcrumb2: Schema.optional(Schema.String),
      longHeadlines: Schema.optional(Schema.Array(Schema.String)),
      businessName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DemandGenVideoAd",
  }) as any as Schema.Schema<DemandGenVideoAd>;

export interface GoogleAudience {
  /** Output only. The resource name of the google audience. */
  name?: string;
  /** Output only. The unique ID of the Google audience. Assigned by the system. */
  googleAudienceId?: string;
  /** Output only. The display name of the Google audience. . */
  displayName?: string;
  /** Output only. The type of Google audience. . */
  googleAudienceType?:
    | "GOOGLE_AUDIENCE_TYPE_UNSPECIFIED"
    | "GOOGLE_AUDIENCE_TYPE_AFFINITY"
    | "GOOGLE_AUDIENCE_TYPE_IN_MARKET"
    | "GOOGLE_AUDIENCE_TYPE_INSTALLED_APPS"
    | "GOOGLE_AUDIENCE_TYPE_NEW_MOBILE_DEVICES"
    | "GOOGLE_AUDIENCE_TYPE_LIFE_EVENT"
    | "GOOGLE_AUDIENCE_TYPE_EXTENDED_DEMOGRAPHIC"
    | (string & {});
}

export const GoogleAudience: Schema.Schema<GoogleAudience> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      googleAudienceId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      googleAudienceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAudience",
  }) as any as Schema.Schema<GoogleAudience>;

export interface ListGoogleAudiencesResponse {
  /** The list of Google audiences. This list will be absent if empty. */
  googleAudiences?: Array<GoogleAudience>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListGoogleAudiences` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListGoogleAudiencesResponse: Schema.Schema<ListGoogleAudiencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      googleAudiences: Schema.optional(Schema.Array(GoogleAudience)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListGoogleAudiencesResponse",
  }) as any as Schema.Schema<ListGoogleAudiencesResponse>;

export interface ListInvoicesResponse {
  /** The list of invoices. This list will be absent if empty. */
  invoices?: Array<Invoice>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInvoices` method to retrieve the next page of results. This token will be absent if there are no more invoices to return. */
  nextPageToken?: string;
}

export const ListInvoicesResponse: Schema.Schema<ListInvoicesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      invoices: Schema.optional(Schema.Array(Invoice)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListInvoicesResponse",
  }) as any as Schema.Schema<ListInvoicesResponse>;

export interface SdfDownloadTask {
  /** A resource name to be used in media.download to Download the prepared files. Resource names have the format `download/sdfdownloadtasks/media/{media_id}`. `media_id` will be made available by the long running operation service once the task status is done. */
  resourceName?: string;
}

export const SdfDownloadTask: Schema.Schema<SdfDownloadTask> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SdfDownloadTask",
  }) as any as Schema.Schema<SdfDownloadTask>;

export interface CombinedAudience {
  /** Output only. The unique ID of the combined audience. Assigned by the system. */
  combinedAudienceId?: string;
  /** Output only. The resource name of the combined audience. */
  name?: string;
  /** Output only. The display name of the combined audience. . */
  displayName?: string;
}

export const CombinedAudience: Schema.Schema<CombinedAudience> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      combinedAudienceId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CombinedAudience",
  }) as any as Schema.Schema<CombinedAudience>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

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

export const AudioAd: Schema.Schema<AudioAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayUrl: Schema.optional(Schema.String),
      finalUrl: Schema.optional(Schema.String),
      trackingUrl: Schema.optional(Schema.String),
      video: Schema.optional(YoutubeVideoDetails),
    }),
  ).annotate({ identifier: "AudioAd" }) as any as Schema.Schema<AudioAd>;

export interface DemandGenProductAd {
  /** Optional. The suffix to append to landing page URLs. */
  finalUrlSuffix?: string;
  /** Required. The URL address of the webpage that people reach after they click the ad. */
  finalUrl?: string;
  /** Optional. The second piece after the domain in the display URL. */
  displayUrlBreadcrumb2?: string;
  /** Required. The business name shown on the ad. */
  businessName?: string;
  /** Required. The logo image used by this ad. */
  logo?: ImageAsset;
  /** Optional. The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
  /** Required. The call-to-action button shown on the ad. The supported values are: * `AUTOMATED` * `APPLY_NOW` * `BOOK_NOW` * `CONTACT_US` * `DOWNLOAD` * `GET_QUOTE` * `LEARN_MORE` * `SHOP_NOW` * `SIGN_UP` * `SUBSCRIBE` */
  callToAction?:
    | "CALL_TO_ACTION_UNSPECIFIED"
    | "AUTOMATED"
    | "LEARN_MORE"
    | "GET_QUOTE"
    | "APPLY_NOW"
    | "SIGN_UP"
    | "CONTACT_US"
    | "SUBSCRIBE"
    | "DOWNLOAD"
    | "BOOK_NOW"
    | "SHOP_NOW"
    | "BUY_NOW"
    | "DONATE_NOW"
    | "ORDER_NOW"
    | "PLAY_NOW"
    | "SEE_MORE"
    | "START_NOW"
    | "VISIT_SITE"
    | "WATCH_NOW"
    | (string & {});
  /** Required. The description of the ad. */
  description?: string;
  /** Optional. The tracking URL specified by the user manually. */
  userSpecifiedTrackingUrl?: string;
  /** Required. The headline of the ad. */
  headline?: string;
  /** Output only. The URL address loaded in the background for tracking purposes. */
  trackingUrl?: string;
  /** Optional. The first piece after the domain in the display URL. */
  displayUrlBreadcrumb1?: string;
}

export const DemandGenProductAd: Schema.Schema<DemandGenProductAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      finalUrlSuffix: Schema.optional(Schema.String),
      finalUrl: Schema.optional(Schema.String),
      displayUrlBreadcrumb2: Schema.optional(Schema.String),
      businessName: Schema.optional(Schema.String),
      logo: Schema.optional(ImageAsset),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      callToAction: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      userSpecifiedTrackingUrl: Schema.optional(Schema.String),
      headline: Schema.optional(Schema.String),
      trackingUrl: Schema.optional(Schema.String),
      displayUrlBreadcrumb1: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DemandGenProductAd",
  }) as any as Schema.Schema<DemandGenProductAd>;

export interface BumperAd {
  /** Common ad attributes. */
  commonInStreamAttribute?: CommonInStreamAttribute;
}

export const BumperAd: Schema.Schema<BumperAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      commonInStreamAttribute: Schema.optional(CommonInStreamAttribute),
    }),
  ).annotate({ identifier: "BumperAd" }) as any as Schema.Schema<BumperAd>;

export interface NonSkippableAd {
  /** Common ad attributes. */
  commonInStreamAttribute?: CommonInStreamAttribute;
  /** The custom parameters to pass custom values to tracking URL template. */
  customParameters?: Record<string, string>;
}

export const NonSkippableAd: Schema.Schema<NonSkippableAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      commonInStreamAttribute: Schema.optional(CommonInStreamAttribute),
      customParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "NonSkippableAd",
  }) as any as Schema.Schema<NonSkippableAd>;

export interface AdGroupAd {
  /** Output only. Details of an [ad promoting a video](//support.google.com/displayvideo/answer/6274216) that shows in places of discovery. */
  videoDiscoverAd?: VideoDiscoveryAd;
  /** Output only. Details of an [in-stream ad skippable after 5 seconds](//support.google.com/displayvideo/answer/6274216), used for brand awareness or reach marketing objectives. */
  inStreamAd?: InStreamAd;
  /** Details of a [Demand Gen carousel ad](//support.google.com/displayvideo/answer/15598924?&sjid=11207068802760924844-NC#CarouselAd). */
  demandGenCarouselAd?: DemandGenCarouselAd;
  /** Required. The display name of the ad. Must be UTF-8 encoded with a maximum size of 255 bytes. */
  displayName?: string;
  /** Output only. The policy approval status of the ad. */
  adPolicy?: AdPolicy;
  /** Output only. The unique ID of the ad. Assigned by the system. */
  adGroupAdId?: string;
  /** Output only. Details of an [ad used in a video action campaign](//support.google.com/google-ads/answer/10147229) to drive actions to the business, service or product. */
  videoPerformanceAd?: VideoPerformanceAd;
  /** Output only. Details of an [ad served on the YouTube Home feed](//support.google.com/google-ads/answer/9709826). */
  mastheadAd?: MastheadAd;
  /** Output only. The unique ID of the advertiser the ad belongs to. */
  advertiserId?: string;
  /** Output only. Details of an [audio ad](//support.google.com/displayvideo/answer/6274216) used for reach marketing objectives. */
  audioAd?: AudioAd;
  /** Details of a [Demand Gen video ad](//support.google.com/displayvideo/answer/15598924?&sjid=11207068802760924844-NC#VideoAd). */
  demandGenVideoAd?: DemandGenVideoAd;
  /** Details of a [Demand Gen image ad](//support.google.com/displayvideo/answer/15598924?&sjid=11207068802760924844-NC#ImageAd). */
  demandGenImageAd?: DemandGenImageAd;
  /** Required. The entity status of the ad. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Output only. The resource name of the ad. */
  name?: string;
  /** Details of a [Demand Gen product ad](//support.google.com/displayvideo/answer/15598924?&sjid=11207068802760924844-NC#Product-onlyAd). */
  demandGenProductAd?: DemandGenProductAd;
  /** Output only. Details of a [non-skippable short video ad](//support.google.com/displayvideo/answer/6274216), equal to or less than 6 seconds, used for reach. */
  bumperAd?: BumperAd;
  /** Required. Immutable. The unique ID of the ad group that the ad belongs to. */
  adGroupId?: string;
  /** Output only. Details of an ad sourced from a Display & Video 360 creative. */
  displayVideoSourceAd?: DisplayVideoSourceAd;
  /** Output only. Details of a [non-skippable short in-stream video ad](//support.google.com/displayvideo/answer/6274216), between 6 and 15 seconds, used for reach marketing objectives. */
  nonSkippableAd?: NonSkippableAd;
  /** Output only. List of URLs used by the ad. */
  adUrls?: Array<AdUrl>;
}

export const AdGroupAd: Schema.Schema<AdGroupAd> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoDiscoverAd: Schema.optional(VideoDiscoveryAd),
      inStreamAd: Schema.optional(InStreamAd),
      demandGenCarouselAd: Schema.optional(DemandGenCarouselAd),
      displayName: Schema.optional(Schema.String),
      adPolicy: Schema.optional(AdPolicy),
      adGroupAdId: Schema.optional(Schema.String),
      videoPerformanceAd: Schema.optional(VideoPerformanceAd),
      mastheadAd: Schema.optional(MastheadAd),
      advertiserId: Schema.optional(Schema.String),
      audioAd: Schema.optional(AudioAd),
      demandGenVideoAd: Schema.optional(DemandGenVideoAd),
      demandGenImageAd: Schema.optional(DemandGenImageAd),
      entityStatus: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      demandGenProductAd: Schema.optional(DemandGenProductAd),
      bumperAd: Schema.optional(BumperAd),
      adGroupId: Schema.optional(Schema.String),
      displayVideoSourceAd: Schema.optional(DisplayVideoSourceAd),
      nonSkippableAd: Schema.optional(NonSkippableAd),
      adUrls: Schema.optional(Schema.Array(AdUrl)),
    }),
  ).annotate({ identifier: "AdGroupAd" }) as any as Schema.Schema<AdGroupAd>;

export interface ListAdGroupAdsResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdGroupAds` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of ads. This list will be absent if empty. */
  adGroupAds?: Array<AdGroupAd>;
}

export const ListAdGroupAdsResponse: Schema.Schema<ListAdGroupAdsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      adGroupAds: Schema.optional(Schema.Array(AdGroupAd)),
    }),
  ).annotate({
    identifier: "ListAdGroupAdsResponse",
  }) as any as Schema.Schema<ListAdGroupAdsResponse>;

export interface LookupInvoiceCurrencyResponse {
  /** Currency used by the advertiser in ISO 4217 format. */
  currencyCode?: string;
}

export const LookupInvoiceCurrencyResponse: Schema.Schema<LookupInvoiceCurrencyResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currencyCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupInvoiceCurrencyResponse",
  }) as any as Schema.Schema<LookupInvoiceCurrencyResponse>;

export interface EditCustomerMatchMembersRequest {
  /** Input only. A list of mobile device IDs to define the members to be removed. */
  removedMobileDeviceIdList?: MobileDeviceIdList;
  /** Input only. A list of contact information to define the members to be added. */
  addedContactInfoList?: ContactInfoList;
  /** Input only. A list of mobile device IDs to define the members to be added. */
  addedMobileDeviceIdList?: MobileDeviceIdList;
  /** Input only. A list of contact information to define the members to be removed. */
  removedContactInfoList?: ContactInfoList;
  /** Required. The ID of the owner advertiser of the updated Customer Match FirstAndThirdPartyAudience. */
  advertiserId?: string;
}

export const EditCustomerMatchMembersRequest: Schema.Schema<EditCustomerMatchMembersRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      removedMobileDeviceIdList: Schema.optional(MobileDeviceIdList),
      addedContactInfoList: Schema.optional(ContactInfoList),
      addedMobileDeviceIdList: Schema.optional(MobileDeviceIdList),
      removedContactInfoList: Schema.optional(ContactInfoList),
      advertiserId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EditCustomerMatchMembersRequest",
  }) as any as Schema.Schema<EditCustomerMatchMembersRequest>;

export interface BulkListAdvertiserAssignedTargetingOptionsResponse {
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent BulkListAdvertiserAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return. */
  nextPageToken?: string;
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const BulkListAdvertiserAssignedTargetingOptionsResponse: Schema.Schema<BulkListAdvertiserAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      assignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
    }),
  ).annotate({
    identifier: "BulkListAdvertiserAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkListAdvertiserAssignedTargetingOptionsResponse>;

export interface BulkEditAssignedUserRolesRequest {
  /** The assigned user roles to delete in batch, specified as a list of assigned_user_role_ids. The format of assigned_user_role_id is `entityType-entityid`, for example `partner-123`. */
  deletedAssignedUserRoles?: Array<string>;
  /** The assigned user roles to create in batch, specified as a list of AssignedUserRoles. */
  createdAssignedUserRoles?: Array<AssignedUserRole>;
}

export const BulkEditAssignedUserRolesRequest: Schema.Schema<BulkEditAssignedUserRolesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deletedAssignedUserRoles: Schema.optional(Schema.Array(Schema.String)),
      createdAssignedUserRoles: Schema.optional(Schema.Array(AssignedUserRole)),
    }),
  ).annotate({
    identifier: "BulkEditAssignedUserRolesRequest",
  }) as any as Schema.Schema<BulkEditAssignedUserRolesRequest>;

export interface ReplaceNegativeKeywordsRequest {
  /** The negative keywords that will replace the existing keywords in the negative keyword list, specified as a list of NegativeKeywords. */
  newNegativeKeywords?: Array<NegativeKeyword>;
}

export const ReplaceNegativeKeywordsRequest: Schema.Schema<ReplaceNegativeKeywordsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      newNegativeKeywords: Schema.optional(Schema.Array(NegativeKeyword)),
    }),
  ).annotate({
    identifier: "ReplaceNegativeKeywordsRequest",
  }) as any as Schema.Schema<ReplaceNegativeKeywordsRequest>;

export interface PerformanceGoal {
  /** The goal amount, in micros of the advertiser's currency. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_VCPM` For example 1500000 represents 1.5 standard units of the currency. */
  performanceGoalAmountMicros?: string;
  /** Required. The type of the performance goal. */
  performanceGoalType?:
    | "PERFORMANCE_GOAL_TYPE_UNSPECIFIED"
    | "PERFORMANCE_GOAL_TYPE_CPM"
    | "PERFORMANCE_GOAL_TYPE_CPC"
    | "PERFORMANCE_GOAL_TYPE_CPA"
    | "PERFORMANCE_GOAL_TYPE_CTR"
    | "PERFORMANCE_GOAL_TYPE_VIEWABILITY"
    | "PERFORMANCE_GOAL_TYPE_CPIAVC"
    | "PERFORMANCE_GOAL_TYPE_CPE"
    | "PERFORMANCE_GOAL_TYPE_CPV"
    | "PERFORMANCE_GOAL_TYPE_CLICK_CVR"
    | "PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR"
    | "PERFORMANCE_GOAL_TYPE_VCPM"
    | "PERFORMANCE_GOAL_TYPE_VTR"
    | "PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE"
    | "PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE"
    | "PERFORMANCE_GOAL_TYPE_OTHER"
    | (string & {});
  /** The decimal representation of the goal percentage in micros. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_CLICK_CVR` * `PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR` * `PERFORMANCE_GOAL_TYPE_VTR` * `PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE` * `PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE` For example, 70000 represents 7% (decimal 0.07). */
  performanceGoalPercentageMicros?: string;
  /** A key performance indicator (KPI) string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when performance_goal_type is set to `PERFORMANCE_GOAL_TYPE_OTHER`. */
  performanceGoalString?: string;
}

export const PerformanceGoal: Schema.Schema<PerformanceGoal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      performanceGoalAmountMicros: Schema.optional(Schema.String),
      performanceGoalType: Schema.optional(Schema.String),
      performanceGoalPercentageMicros: Schema.optional(Schema.String),
      performanceGoalString: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PerformanceGoal",
  }) as any as Schema.Schema<PerformanceGoal>;

export interface CampaignGoal {
  /** Required. The type of the campaign goal. */
  campaignGoalType?:
    | "CAMPAIGN_GOAL_TYPE_UNSPECIFIED"
    | "CAMPAIGN_GOAL_TYPE_APP_INSTALL"
    | "CAMPAIGN_GOAL_TYPE_BRAND_AWARENESS"
    | "CAMPAIGN_GOAL_TYPE_OFFLINE_ACTION"
    | "CAMPAIGN_GOAL_TYPE_ONLINE_ACTION"
    | (string & {});
  /** Required. The performance goal of the campaign. Acceptable values for performance_goal_type are: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_OTHER` */
  performanceGoal?: PerformanceGoal;
}

export const CampaignGoal: Schema.Schema<CampaignGoal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      campaignGoalType: Schema.optional(Schema.String),
      performanceGoal: Schema.optional(PerformanceGoal),
    }),
  ).annotate({
    identifier: "CampaignGoal",
  }) as any as Schema.Schema<CampaignGoal>;

export interface ReplaceSitesResponse {
  /** The list of sites in the channel after replacing. */
  sites?: Array<Site>;
}

export const ReplaceSitesResponse: Schema.Schema<ReplaceSitesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sites: Schema.optional(Schema.Array(Site)),
    }),
  ).annotate({
    identifier: "ReplaceSitesResponse",
  }) as any as Schema.Schema<ReplaceSitesResponse>;

export interface EditCustomerMatchMembersResponse {
  /** Required. The ID of the updated Customer Match FirstPartyAndPartnerAudience. */
  firstPartyAndPartnerAudienceId?: string;
}

export const EditCustomerMatchMembersResponse: Schema.Schema<EditCustomerMatchMembersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      firstPartyAndPartnerAudienceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EditCustomerMatchMembersResponse",
  }) as any as Schema.Schema<EditCustomerMatchMembersResponse>;

export interface CustomBiddingScriptRef {
  /** A resource name to be used in media.download to Download the script files. Or media.upload to Upload the script files. Resource names have the format `customBiddingAlgorithms/{custom_bidding_algorithm_id}/scriptRef/{ref_id}`. */
  resourceName?: string;
}

export const CustomBiddingScriptRef: Schema.Schema<CustomBiddingScriptRef> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingScriptRef",
  }) as any as Schema.Schema<CustomBiddingScriptRef>;

export interface CustomBiddingScript {
  /** Output only. The unique ID of the custom bidding script. */
  customBiddingScriptId?: string;
  /** Output only. The state of the custom bidding script. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACCEPTED"
    | "REJECTED"
    | "PENDING"
    | (string & {});
  /** Output only. The resource name of the custom bidding script. */
  name?: string;
  /** Output only. The unique ID of the custom bidding algorithm the script belongs to. */
  customBiddingAlgorithmId?: string;
  /** The reference to the uploaded script file. */
  script?: CustomBiddingScriptRef;
  /** Output only. Error details of a rejected custom bidding script. This field will only be populated when state is REJECTED. */
  errors?: Array<ScriptError>;
  /** Output only. Whether the script is currently being used for scoring by the parent algorithm. */
  active?: boolean;
  /** Output only. The time when the script was created. */
  createTime?: string;
}

export const CustomBiddingScript: Schema.Schema<CustomBiddingScript> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customBiddingScriptId: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      customBiddingAlgorithmId: Schema.optional(Schema.String),
      script: Schema.optional(CustomBiddingScriptRef),
      errors: Schema.optional(Schema.Array(ScriptError)),
      active: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomBiddingScript",
  }) as any as Schema.Schema<CustomBiddingScript>;

export interface ListCustomBiddingScriptsResponse {
  /** The list of custom bidding scripts. This list will be absent if empty. */
  customBiddingScripts?: Array<CustomBiddingScript>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomBiddingScriptsRequest` method to retrieve the next page of results. If this field is null, it means this is the last page. */
  nextPageToken?: string;
}

export const ListCustomBiddingScriptsResponse: Schema.Schema<ListCustomBiddingScriptsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customBiddingScripts: Schema.optional(Schema.Array(CustomBiddingScript)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomBiddingScriptsResponse",
  }) as any as Schema.Schema<ListCustomBiddingScriptsResponse>;

export interface ListYoutubeAssetAssociationsResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListYoutubeAssetAssociations` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of asset associations. This list will be absent if empty. */
  youtubeAssetAssociations?: Array<YoutubeAssetAssociation>;
}

export const ListYoutubeAssetAssociationsResponse: Schema.Schema<ListYoutubeAssetAssociationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      youtubeAssetAssociations: Schema.optional(
        Schema.Array(YoutubeAssetAssociation),
      ),
    }),
  ).annotate({
    identifier: "ListYoutubeAssetAssociationsResponse",
  }) as any as Schema.Schema<ListYoutubeAssetAssociationsResponse>;

export interface ListAdGroupAssignedTargetingOptionsResponse {
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListAdGroupAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more AssignedTargetingOption resources to return. */
  nextPageToken?: string;
  /** The list of assigned targeting options. This list will be absent if empty. */
  assignedTargetingOptions?: Array<AssignedTargetingOption>;
}

export const ListAdGroupAssignedTargetingOptionsResponse: Schema.Schema<ListAdGroupAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      assignedTargetingOptions: Schema.optional(
        Schema.Array(AssignedTargetingOption),
      ),
    }),
  ).annotate({
    identifier: "ListAdGroupAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<ListAdGroupAssignedTargetingOptionsResponse>;

export interface Campaign {
  /** Required. The display name of the campaign. Must be UTF-8 encoded with a maximum size of 240 bytes. */
  displayName?: string;
  /** Required. Controls whether or not the insertion orders under this campaign can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. * For CreateCampaign method, `ENTITY_STATUS_ARCHIVED` is not allowed. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Output only. The unique ID of the campaign. Assigned by the system. */
  campaignId?: string;
  /** Required. The frequency cap setting of the campaign. *Warning*: On **February 28, 2025**, frequency cap time periods greater than 30 days will no longer be accepted. [Read more about this announced change](/display-video/api/deprecations#features.lifetime_frequency_cap) */
  frequencyCap?: FrequencyCap;
  /** Required. The goal of the campaign. */
  campaignGoal?: CampaignGoal;
  /** Output only. The unique ID of the advertiser the campaign belongs to. */
  advertiserId?: string;
  /** Output only. The timestamp when the campaign was last updated. Assigned by the system. */
  updateTime?: string;
  /** Output only. The resource name of the campaign. */
  name?: string;
  /** The list of budgets available to this campaign. If this field is not set, the campaign uses an unlimited budget. */
  campaignBudgets?: Array<CampaignBudget>;
  /** Required. The planned spend and duration of the campaign. */
  campaignFlight?: CampaignFlight;
}

export const Campaign: Schema.Schema<Campaign> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      entityStatus: Schema.optional(Schema.String),
      campaignId: Schema.optional(Schema.String),
      frequencyCap: Schema.optional(FrequencyCap),
      campaignGoal: Schema.optional(CampaignGoal),
      advertiserId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      campaignBudgets: Schema.optional(Schema.Array(CampaignBudget)),
      campaignFlight: Schema.optional(CampaignFlight),
    }),
  ).annotate({ identifier: "Campaign" }) as any as Schema.Schema<Campaign>;

export interface BulkEditSitesRequest {
  /** The sites to create in batch, specified as a list of Sites. */
  createdSites?: Array<Site>;
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** The sites to delete in batch, specified as a list of site url_or_app_ids. */
  deletedSites?: Array<string>;
}

export const BulkEditSitesRequest: Schema.Schema<BulkEditSitesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createdSites: Schema.optional(Schema.Array(Site)),
      partnerId: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      deletedSites: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BulkEditSitesRequest",
  }) as any as Schema.Schema<BulkEditSitesRequest>;

export interface DuplicateLineItemResponse {
  /** The ID of the created line item. */
  duplicateLineItemId?: string;
}

export const DuplicateLineItemResponse: Schema.Schema<DuplicateLineItemResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duplicateLineItemId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DuplicateLineItemResponse",
  }) as any as Schema.Schema<DuplicateLineItemResponse>;

export interface BulkListAssignedTargetingOptionsResponse {
  /** The list of wrapper objects, each providing an assigned targeting option and the line item it is assigned to. This list will be absent if empty. */
  lineItemAssignedTargetingOptions?: Array<LineItemAssignedTargetingOption>;
  /** A token identifying the next page of results. This value should be specified as the pageToken in a subsequent call to `BulkListAssignedTargetingOptions` to fetch the next page of results. This token will be absent if there are no more line_item_assigned_targeting_options to return. */
  nextPageToken?: string;
}

export const BulkListAssignedTargetingOptionsResponse: Schema.Schema<BulkListAssignedTargetingOptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineItemAssignedTargetingOptions: Schema.optional(
        Schema.Array(LineItemAssignedTargetingOption),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BulkListAssignedTargetingOptionsResponse",
  }) as any as Schema.Schema<BulkListAssignedTargetingOptionsResponse>;

export interface ListCampaignsResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCampaigns` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of campaigns. This list will be absent if empty. */
  campaigns?: Array<Campaign>;
}

export const ListCampaignsResponse: Schema.Schema<ListCampaignsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      campaigns: Schema.optional(Schema.Array(Campaign)),
    }),
  ).annotate({
    identifier: "ListCampaignsResponse",
  }) as any as Schema.Schema<ListCampaignsResponse>;

export interface ProductFeedData {
  /** A list of dimensions used to match products. */
  productMatchDimensions?: Array<ProductMatchDimension>;
  /** Whether the product feed has opted-out of showing products. */
  isFeedDisabled?: boolean;
  /** How products are selected by the product feed. */
  productMatchType?:
    | "PRODUCT_MATCH_TYPE_UNSPECIFIED"
    | "PRODUCT_MATCH_TYPE_ALL_PRODUCTS"
    | "PRODUCT_MATCH_TYPE_SPECIFIC_PRODUCTS"
    | "PRODUCT_MATCH_TYPE_CUSTOM_LABEL"
    | (string & {});
}

export const ProductFeedData: Schema.Schema<ProductFeedData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      productMatchDimensions: Schema.optional(
        Schema.Array(ProductMatchDimension),
      ),
      isFeedDisabled: Schema.optional(Schema.Boolean),
      productMatchType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductFeedData",
  }) as any as Schema.Schema<ProductFeedData>;

export interface AdGroupInventoryControl {
  /** The inventory strategy. */
  adGroupInventoryStrategy?:
    | "AD_GROUP_INVENTORY_STRATEGY_UNSPECIFIED"
    | "AD_GROUP_INVENTORY_STRATEGY_ALL_GOOGLE_AND_DISPLAY_NETWORK_INVENTORY"
    | "AD_GROUP_INVENTORY_STRATEGY_ALL_GOOGLE_INVENTORY"
    | (string & {});
  /** The selected inventories. */
  selectedInventories?: SelectedInventories;
}

export const AdGroupInventoryControl: Schema.Schema<AdGroupInventoryControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adGroupInventoryStrategy: Schema.optional(Schema.String),
      selectedInventories: Schema.optional(SelectedInventories),
    }),
  ).annotate({
    identifier: "AdGroupInventoryControl",
  }) as any as Schema.Schema<AdGroupInventoryControl>;

export interface ListAssignedLocationsResponse {
  /** The list of assigned locations. This list will be absent if empty. */
  assignedLocations?: Array<AssignedLocation>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAssignedLocations` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAssignedLocationsResponse: Schema.Schema<ListAssignedLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedLocations: Schema.optional(Schema.Array(AssignedLocation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAssignedLocationsResponse",
  }) as any as Schema.Schema<ListAssignedLocationsResponse>;

export interface ListInventorySourceGroupsResponse {
  /** The list of inventory source groups. This list will be absent if empty. */
  inventorySourceGroups?: Array<InventorySourceGroup>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInventorySourceGroups` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListInventorySourceGroupsResponse: Schema.Schema<ListInventorySourceGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySourceGroups: Schema.optional(
        Schema.Array(InventorySourceGroup),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListInventorySourceGroupsResponse",
  }) as any as Schema.Schema<ListInventorySourceGroupsResponse>;

export interface EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate {
  /** The advertisers to add. */
  addedAdvertisers?: Array<string>;
  /** The advertisers to remove. */
  removedAdvertisers?: Array<string>;
}

export const EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate: Schema.Schema<EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      addedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
      removedAdvertisers: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate",
  }) as any as Schema.Schema<EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate>;

export interface AdGroup {
  /** Output only. Identifier. The resource name of the ad group. */
  name?: string;
  /** Output only. The unique ID of the advertiser the ad group belongs to. */
  advertiserId?: string;
  /** Output only. The unique ID of the ad group. Assigned by the system. */
  adGroupId?: string;
  /** Required. Immutable. The format of the ads in the ad group. */
  adGroupFormat?:
    | "AD_GROUP_FORMAT_UNSPECIFIED"
    | "AD_GROUP_FORMAT_IN_STREAM"
    | "AD_GROUP_FORMAT_VIDEO_DISCOVERY"
    | "AD_GROUP_FORMAT_BUMPER"
    | "AD_GROUP_FORMAT_NON_SKIPPABLE_IN_STREAM"
    | "AD_GROUP_FORMAT_AUDIO"
    | "AD_GROUP_FORMAT_RESPONSIVE"
    | "AD_GROUP_FORMAT_REACH"
    | "AD_GROUP_FORMAT_MASTHEAD"
    | "AD_GROUP_FORMAT_DEMAND_GEN"
    | (string & {});
  /** Optional. The bidding strategy used by the ad group. Only the youtubeAndPartnersBid and demandGenBid field can be used in the bidding strategy. */
  bidStrategy?: BiddingStrategy;
  /** Optional. The settings of the product feed in this ad group. */
  productFeedData?: ProductFeedData;
  /** Required. Controls whether or not the ad group can spend its budget and bid on inventory. If the ad group's parent line item is not active, the ad group can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`. */
  entityStatus?:
    | "ENTITY_STATUS_UNSPECIFIED"
    | "ENTITY_STATUS_ACTIVE"
    | "ENTITY_STATUS_ARCHIVED"
    | "ENTITY_STATUS_DRAFT"
    | "ENTITY_STATUS_PAUSED"
    | "ENTITY_STATUS_SCHEDULED_FOR_DELETION"
    | (string & {});
  /** Optional. The [optimized targeting](//support.google.com/displayvideo/answer/12060859) settings of the ad group. */
  targetingExpansion?: TargetingExpansionConfig;
  /** Required. Immutable. The unique ID of the line item that the ad group belongs to. */
  lineItemId?: string;
  /** Optional. Specifies the inventory control of the ad group. This field is required for Demand Gen ad groups. */
  adGroupInventoryControl?: AdGroupInventoryControl;
  /** Required. The display name of the ad group. Must be UTF-8 encoded with a maximum size of 255 bytes. */
  displayName?: string;
}

export const AdGroup: Schema.Schema<AdGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      adGroupId: Schema.optional(Schema.String),
      adGroupFormat: Schema.optional(Schema.String),
      bidStrategy: Schema.optional(BiddingStrategy),
      productFeedData: Schema.optional(ProductFeedData),
      entityStatus: Schema.optional(Schema.String),
      targetingExpansion: Schema.optional(TargetingExpansionConfig),
      lineItemId: Schema.optional(Schema.String),
      adGroupInventoryControl: Schema.optional(AdGroupInventoryControl),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "AdGroup" }) as any as Schema.Schema<AdGroup>;

export interface BulkEditAssignedUserRolesResponse {
  /** The list of assigned user roles that have been successfully created. This list will be absent if empty. */
  createdAssignedUserRoles?: Array<AssignedUserRole>;
}

export const BulkEditAssignedUserRolesResponse: Schema.Schema<BulkEditAssignedUserRolesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createdAssignedUserRoles: Schema.optional(Schema.Array(AssignedUserRole)),
    }),
  ).annotate({
    identifier: "BulkEditAssignedUserRolesResponse",
  }) as any as Schema.Schema<BulkEditAssignedUserRolesResponse>;

export interface ListFloodlightActivitiesResponse {
  /** The list of Floodlight activities. This list will be absent if empty. */
  floodlightActivities?: Array<FloodlightActivity>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListFloodlightActivities` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFloodlightActivitiesResponse: Schema.Schema<ListFloodlightActivitiesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      floodlightActivities: Schema.optional(Schema.Array(FloodlightActivity)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListFloodlightActivitiesResponse",
  }) as any as Schema.Schema<ListFloodlightActivitiesResponse>;

export interface BulkUpdateLineItemsResponse {
  /** The IDs of line items that are skipped for updates. For example, unnecessary mutates that will result in effectively no changes to line items will be skipped and corresponding line item IDs can be tracked here. */
  skippedLineItemIds?: Array<string>;
  /** The IDs of successfully updated line items. */
  updatedLineItemIds?: Array<string>;
  /** The IDs of line items that failed to update. */
  failedLineItemIds?: Array<string>;
  /** Errors returned by line items that failed to update. */
  errors?: Array<Status>;
}

export const BulkUpdateLineItemsResponse: Schema.Schema<BulkUpdateLineItemsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      skippedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
      updatedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
      failedLineItemIds: Schema.optional(Schema.Array(Schema.String)),
      errors: Schema.optional(Schema.Array(Status)),
    }),
  ).annotate({
    identifier: "BulkUpdateLineItemsResponse",
  }) as any as Schema.Schema<BulkUpdateLineItemsResponse>;

export interface SdfDownloadTaskMetadata {
  /** The time when execution was completed. */
  endTime?: string;
  /** The SDF version used to execute this download task. */
  version?:
    | "SDF_VERSION_UNSPECIFIED"
    | "SDF_VERSION_3_1"
    | "SDF_VERSION_4"
    | "SDF_VERSION_4_1"
    | "SDF_VERSION_4_2"
    | "SDF_VERSION_5"
    | "SDF_VERSION_5_1"
    | "SDF_VERSION_5_2"
    | "SDF_VERSION_5_3"
    | "SDF_VERSION_5_4"
    | "SDF_VERSION_5_5"
    | "SDF_VERSION_6"
    | "SDF_VERSION_7"
    | "SDF_VERSION_7_1"
    | "SDF_VERSION_8"
    | "SDF_VERSION_8_1"
    | "SDF_VERSION_9"
    | "SDF_VERSION_9_1"
    | "SDF_VERSION_9_2"
    | (string & {});
  /** The time when the operation was created. */
  createTime?: string;
}

export const SdfDownloadTaskMetadata: Schema.Schema<SdfDownloadTaskMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SdfDownloadTaskMetadata",
  }) as any as Schema.Schema<SdfDownloadTaskMetadata>;

export interface ListFirstPartyAndPartnerAudiencesResponse {
  /** The list of first party and partner audiences. Audience size properties will not be included. This list will be absent if empty. */
  firstPartyAndPartnerAudiences?: Array<FirstPartyAndPartnerAudience>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListFirstPartyAndPartnerAudiences` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListFirstPartyAndPartnerAudiencesResponse: Schema.Schema<ListFirstPartyAndPartnerAudiencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      firstPartyAndPartnerAudiences: Schema.optional(
        Schema.Array(FirstPartyAndPartnerAudience),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListFirstPartyAndPartnerAudiencesResponse",
  }) as any as Schema.Schema<ListFirstPartyAndPartnerAudiencesResponse>;

export interface BulkEditAdGroupAssignedTargetingOptionsRequest {
  /** Optional. The assigned targeting options to delete in batch, specified as a list of `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  deleteRequests?: Array<DeleteAssignedTargetingOptionsRequest>;
  /** Optional. The assigned targeting options to create in batch, specified as a list of `CreateAssignedTargetingOptionRequest`. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  createRequests?: Array<CreateAssignedTargetingOptionsRequest>;
  /** Required. The IDs of the ad groups the assigned targeting options will belong to. A maximum of 25 ad group IDs can be specified. */
  adGroupIds?: Array<string>;
}

export const BulkEditAdGroupAssignedTargetingOptionsRequest: Schema.Schema<BulkEditAdGroupAssignedTargetingOptionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deleteRequests: Schema.optional(
        Schema.Array(DeleteAssignedTargetingOptionsRequest),
      ),
      createRequests: Schema.optional(
        Schema.Array(CreateAssignedTargetingOptionsRequest),
      ),
      adGroupIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BulkEditAdGroupAssignedTargetingOptionsRequest",
  }) as any as Schema.Schema<BulkEditAdGroupAssignedTargetingOptionsRequest>;

export interface EditGuaranteedOrderReadAccessorsResponse {
  /** Whether all advertisers of read_write_partner_id have read access to the guaranteed order. */
  readAccessInherited?: boolean;
  /** The IDs of advertisers with read access to the guaranteed order. */
  readAdvertiserIds?: Array<string>;
}

export const EditGuaranteedOrderReadAccessorsResponse: Schema.Schema<EditGuaranteedOrderReadAccessorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      readAccessInherited: Schema.optional(Schema.Boolean),
      readAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "EditGuaranteedOrderReadAccessorsResponse",
  }) as any as Schema.Schema<EditGuaranteedOrderReadAccessorsResponse>;

export interface EditInventorySourceReadWriteAccessorsRequest {
  /** The advertisers to add or remove from the list of advertisers that have read/write access to the inventory source. This change will remove an existing partner read/write accessor. */
  advertisersUpdate?: EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate;
  /** Required. The partner context by which the accessors change is being made. */
  partnerId?: string;
  /** Set the partner context as read/write accessor of the inventory source. This will remove all other current read/write advertiser accessors. */
  assignPartner?: boolean;
}

export const EditInventorySourceReadWriteAccessorsRequest: Schema.Schema<EditInventorySourceReadWriteAccessorsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertisersUpdate: Schema.optional(
        EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate,
      ),
      partnerId: Schema.optional(Schema.String),
      assignPartner: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "EditInventorySourceReadWriteAccessorsRequest",
  }) as any as Schema.Schema<EditInventorySourceReadWriteAccessorsRequest>;

export interface ReplaceSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** The sites that will replace the existing sites assigned to the channel, specified as a list of Sites. */
  newSites?: Array<Site>;
}

export const ReplaceSitesRequest: Schema.Schema<ReplaceSitesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      advertiserId: Schema.optional(Schema.String),
      partnerId: Schema.optional(Schema.String),
      newSites: Schema.optional(Schema.Array(Site)),
    }),
  ).annotate({
    identifier: "ReplaceSitesRequest",
  }) as any as Schema.Schema<ReplaceSitesRequest>;

export interface ListPartnersResponse {
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListPartners` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of partners. This list will be absent if empty. */
  partners?: Array<Partner>;
}

export const ListPartnersResponse: Schema.Schema<ListPartnersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      partners: Schema.optional(Schema.Array(Partner)),
    }),
  ).annotate({
    identifier: "ListPartnersResponse",
  }) as any as Schema.Schema<ListPartnersResponse>;

export interface ListSitesResponse {
  /** The list of sites. This list will be absent if empty. */
  sites?: Array<Site>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListSites` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListSitesResponse: Schema.Schema<ListSitesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sites: Schema.optional(Schema.Array(Site)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSitesResponse",
  }) as any as Schema.Schema<ListSitesResponse>;

export interface ListCombinedAudiencesResponse {
  /** The list of combined audiences. This list will be absent if empty. */
  combinedAudiences?: Array<CombinedAudience>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCombinedAudiences` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListCombinedAudiencesResponse: Schema.Schema<ListCombinedAudiencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      combinedAudiences: Schema.optional(Schema.Array(CombinedAudience)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCombinedAudiencesResponse",
  }) as any as Schema.Schema<ListCombinedAudiencesResponse>;

export interface ListAdGroupsResponse {
  /** The list of ad groups. This list will be absent if empty. */
  adGroups?: Array<AdGroup>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdGroups` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAdGroupsResponse: Schema.Schema<ListAdGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adGroups: Schema.optional(Schema.Array(AdGroup)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdGroupsResponse",
  }) as any as Schema.Schema<ListAdGroupsResponse>;

export interface AlgorithmRules {
  /** Rules for the post-impression signals. This field is only supported for allowlisted partners. */
  postImpressionSignalRuleset?: AlgorithmRulesRuleset;
  /** Attribution model for the algorithm. This field is only supported for allowlisted partners. */
  attributionModelId?: string;
  /** Rules for the impression signals. */
  impressionSignalRuleset?: AlgorithmRulesRuleset;
}

export const AlgorithmRules: Schema.Schema<AlgorithmRules> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postImpressionSignalRuleset: Schema.optional(AlgorithmRulesRuleset),
      attributionModelId: Schema.optional(Schema.String),
      impressionSignalRuleset: Schema.optional(AlgorithmRulesRuleset),
    }),
  ).annotate({
    identifier: "AlgorithmRules",
  }) as any as Schema.Schema<AlgorithmRules>;

export interface ListAssignedInventorySourcesResponse {
  /** The list of assigned inventory sources. This list will be absent if empty. */
  assignedInventorySources?: Array<AssignedInventorySource>;
  /** A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAssignedInventorySources` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAssignedInventorySourcesResponse: Schema.Schema<ListAssignedInventorySourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedInventorySources: Schema.optional(
        Schema.Array(AssignedInventorySource),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAssignedInventorySourcesResponse",
  }) as any as Schema.Schema<ListAssignedInventorySourcesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchTargetingTypesTargetingOptionsRequest {
  /** Required. The type of targeting options to retrieve. Accepted values are: * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_BUSINESS_CHAIN` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Request body */
  body?: SearchTargetingOptionsRequest;
}

export const SearchTargetingTypesTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    body: Schema.optional(SearchTargetingOptionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/targetingTypes/{targetingTypesId}/targetingOptions:search",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SearchTargetingTypesTargetingOptionsRequest>;

export type SearchTargetingTypesTargetingOptionsResponse =
  SearchTargetingOptionsResponse;
export const SearchTargetingTypesTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchTargetingOptionsResponse;

export type SearchTargetingTypesTargetingOptionsError = DefaultErrors;

/** Searches for targeting options of a given type based on the given search terms. */
export const searchTargetingTypesTargetingOptions: API.OperationMethod<
  SearchTargetingTypesTargetingOptionsRequest,
  SearchTargetingTypesTargetingOptionsResponse,
  SearchTargetingTypesTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchTargetingTypesTargetingOptionsRequest,
  output: SearchTargetingTypesTargetingOptionsResponse,
  errors: [],
}));

export interface GetTargetingTypesTargetingOptionsRequest {
  /** Required. The type of targeting option to retrieve. Accepted values are: * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the of targeting option to retrieve. */
  targetingOptionId: string;
  /** Required. The Advertiser this request is being made in the context of. */
  advertiserId?: string;
}

export const GetTargetingTypesTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    targetingOptionId: Schema.String.pipe(T.HttpPath("targetingOptionId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/targetingTypes/{targetingTypesId}/targetingOptions/{targetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetTargetingTypesTargetingOptionsRequest>;

export type GetTargetingTypesTargetingOptionsResponse = TargetingOption;
export const GetTargetingTypesTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TargetingOption;

export type GetTargetingTypesTargetingOptionsError = DefaultErrors;

/** Gets a single targeting option. */
export const getTargetingTypesTargetingOptions: API.OperationMethod<
  GetTargetingTypesTargetingOptionsRequest,
  GetTargetingTypesTargetingOptionsResponse,
  GetTargetingTypesTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTargetingTypesTargetingOptionsRequest,
  output: GetTargetingTypesTargetingOptionsResponse,
  errors: [],
}));

export interface ListTargetingTypesTargetingOptionsRequest {
  /** Required. The Advertiser this request is being made in the context of. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `targetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `OR` logical operators. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `carrierAndIspDetails.type` * `geoRegionDetails.geoRegionType` * `targetingOptionId` Examples: * All `GEO REGION` targeting options that belong to sub type `GEO_REGION_TYPE_COUNTRY` or `GEO_REGION_TYPE_STATE`: `geoRegionDetails.geoRegionType="GEO_REGION_TYPE_COUNTRY" OR geoRegionDetails.geoRegionType="GEO_REGION_TYPE_STATE"` * All `CARRIER AND ISP` targeting options that belong to sub type `CARRIER_AND_ISP_TYPE_CARRIER`: `carrierAndIspDetails.type="CARRIER_AND_ISP_TYPE_CARRIER"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The type of targeting option to be listed. Accepted values are: * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListTargetingTypesTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/targetingTypes/{targetingTypesId}/targetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListTargetingTypesTargetingOptionsRequest>;

export type ListTargetingTypesTargetingOptionsResponse =
  ListTargetingOptionsResponse;
export const ListTargetingTypesTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTargetingOptionsResponse;

export type ListTargetingTypesTargetingOptionsError = DefaultErrors;

/** Lists targeting options of a given type. */
export const listTargetingTypesTargetingOptions: API.PaginatedOperationMethod<
  ListTargetingTypesTargetingOptionsRequest,
  ListTargetingTypesTargetingOptionsResponse,
  ListTargetingTypesTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTargetingTypesTargetingOptionsRequest,
  output: ListTargetingTypesTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSdfuploadtasksOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetSdfuploadtasksOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/sdfuploadtasks/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSdfuploadtasksOperationsRequest>;

export type GetSdfuploadtasksOperationsResponse = Operation;
export const GetSdfuploadtasksOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetSdfuploadtasksOperationsError = DefaultErrors;

/** Gets the latest state of an asynchronous SDF download task operation. Clients should poll this method at intervals of 30 seconds. */
export const getSdfuploadtasksOperations: API.OperationMethod<
  GetSdfuploadtasksOperationsRequest,
  GetSdfuploadtasksOperationsResponse,
  GetSdfuploadtasksOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSdfuploadtasksOperationsRequest,
  output: GetSdfuploadtasksOperationsResponse,
  errors: [],
}));

export interface GetCustomListsRequest {
  /** Required. The ID of the custom list to fetch. */
  customListId: string;
  /** The ID of the DV360 advertiser that has access to the fetched custom lists. */
  advertiserId?: string;
}

export const GetCustomListsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  customListId: Schema.String.pipe(T.HttpPath("customListId")),
  advertiserId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("advertiserId"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v4/customLists/{customListsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomListsRequest>;

export type GetCustomListsResponse = CustomList;
export const GetCustomListsResponse = /*@__PURE__*/ /*#__PURE__*/ CustomList;

export type GetCustomListsError = DefaultErrors;

/** Gets a custom list. */
export const getCustomLists: API.OperationMethod<
  GetCustomListsRequest,
  GetCustomListsResponse,
  GetCustomListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomListsRequest,
  output: GetCustomListsResponse,
  errors: [],
}));

export interface ListCustomListsRequest {
  /** The ID of the DV360 advertiser that has access to the fetched custom lists. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `customListId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by custom list fields. Supported syntax: * Filter expressions for custom lists can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All custom lists for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomLists` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListCustomListsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "v4/customLists" }),
  svc,
) as unknown as Schema.Schema<ListCustomListsRequest>;

export type ListCustomListsResponse_Op = ListCustomListsResponse;
export const ListCustomListsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomListsResponse;

export type ListCustomListsError = DefaultErrors;

/** Lists custom lists. The order is defined by the order_by parameter. */
export const listCustomLists: API.PaginatedOperationMethod<
  ListCustomListsRequest,
  ListCustomListsResponse_Op,
  ListCustomListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomListsRequest,
  output: ListCustomListsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetFloodlightGroupsRequest {
  /** Required. The ID of the Floodlight group to fetch. */
  floodlightGroupId: string;
  /** Required. The partner context by which the Floodlight group is being accessed. */
  partnerId?: string;
}

export const GetFloodlightGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/floodlightGroups/{floodlightGroupsId}" }),
    svc,
  ) as unknown as Schema.Schema<GetFloodlightGroupsRequest>;

export type GetFloodlightGroupsResponse = FloodlightGroup;
export const GetFloodlightGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ FloodlightGroup;

export type GetFloodlightGroupsError = DefaultErrors;

/** Gets a Floodlight group. */
export const getFloodlightGroups: API.OperationMethod<
  GetFloodlightGroupsRequest,
  GetFloodlightGroupsResponse,
  GetFloodlightGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFloodlightGroupsRequest,
  output: GetFloodlightGroupsResponse,
  errors: [],
}));

export interface PatchFloodlightGroupsRequest {
  /** Required. The partner context by which the Floodlight group is being accessed. */
  partnerId?: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Output only. The unique ID of the Floodlight group. Assigned by the system. */
  floodlightGroupId: string;
  /** Request body */
  body?: FloodlightGroup;
}

export const PatchFloodlightGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
    body: Schema.optional(FloodlightGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/floodlightGroups/{floodlightGroupId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchFloodlightGroupsRequest>;

export type PatchFloodlightGroupsResponse = FloodlightGroup;
export const PatchFloodlightGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ FloodlightGroup;

export type PatchFloodlightGroupsError = DefaultErrors;

/** Updates an existing Floodlight group. Returns the updated Floodlight group if successful. */
export const patchFloodlightGroups: API.OperationMethod<
  PatchFloodlightGroupsRequest,
  PatchFloodlightGroupsResponse,
  PatchFloodlightGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchFloodlightGroupsRequest,
  output: PatchFloodlightGroupsResponse,
  errors: [],
}));

export interface GetFloodlightGroupsFloodlightActivitiesRequest {
  /** Required. The ID of the partner through which the Floodlight activity is being accessed. */
  partnerId?: string;
  /** Required. The ID of the Floodlight activity to fetch. */
  floodlightActivityId: string;
  /** Required. The ID of the parent Floodlight group to which the requested Floodlight activity belongs. */
  floodlightGroupId: string;
}

export const GetFloodlightGroupsFloodlightActivitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    floodlightActivityId: Schema.String.pipe(
      T.HttpPath("floodlightActivityId"),
    ),
    floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/floodlightGroups/{floodlightGroupsId}/floodlightActivities/{floodlightActivitiesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetFloodlightGroupsFloodlightActivitiesRequest>;

export type GetFloodlightGroupsFloodlightActivitiesResponse =
  FloodlightActivity;
export const GetFloodlightGroupsFloodlightActivitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ FloodlightActivity;

export type GetFloodlightGroupsFloodlightActivitiesError = DefaultErrors;

/** Gets a Floodlight activity. */
export const getFloodlightGroupsFloodlightActivities: API.OperationMethod<
  GetFloodlightGroupsFloodlightActivitiesRequest,
  GetFloodlightGroupsFloodlightActivitiesResponse,
  GetFloodlightGroupsFloodlightActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFloodlightGroupsFloodlightActivitiesRequest,
  output: GetFloodlightGroupsFloodlightActivitiesResponse,
  errors: [],
}));

export interface ListFloodlightGroupsFloodlightActivitiesRequest {
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListFloodlightActivities` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The ID of the parent Floodlight group to which the requested Floodlight activities belong. */
  floodlightGroupId: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `displayName` (default) * `floodlightActivityId` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Required. The ID of the partner through which the Floodlight activities are being accessed. */
  partnerId?: string;
  /** Optional. Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListFloodlightGroupsFloodlightActivitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    floodlightGroupId: Schema.String.pipe(T.HttpPath("floodlightGroupId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/floodlightGroups/{floodlightGroupsId}/floodlightActivities",
    }),
    svc,
  ) as unknown as Schema.Schema<ListFloodlightGroupsFloodlightActivitiesRequest>;

export type ListFloodlightGroupsFloodlightActivitiesResponse =
  ListFloodlightActivitiesResponse;
export const ListFloodlightGroupsFloodlightActivitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFloodlightActivitiesResponse;

export type ListFloodlightGroupsFloodlightActivitiesError = DefaultErrors;

/** Lists Floodlight activities in a Floodlight group. */
export const listFloodlightGroupsFloodlightActivities: API.PaginatedOperationMethod<
  ListFloodlightGroupsFloodlightActivitiesRequest,
  ListFloodlightGroupsFloodlightActivitiesResponse,
  ListFloodlightGroupsFloodlightActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFloodlightGroupsFloodlightActivitiesRequest,
  output: ListFloodlightGroupsFloodlightActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAssignedTargetingOptionsAdvertisersRequest {
  /** Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is '5000'. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `targetingType` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=) operator`. Supported fields: * `targetingType` Examples: * targetingType with value TARGETING_TYPE_CHANNEL `targetingType="TARGETING_TYPE_CHANNEL"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to `BulkListAdvertiserAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAssignedTargetingOptionsAdvertisersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}:listAssignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAssignedTargetingOptionsAdvertisersRequest>;

export type ListAssignedTargetingOptionsAdvertisersResponse =
  BulkListAdvertiserAssignedTargetingOptionsResponse;
export const ListAssignedTargetingOptionsAdvertisersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkListAdvertiserAssignedTargetingOptionsResponse;

export type ListAssignedTargetingOptionsAdvertisersError = DefaultErrors;

/** Lists assigned targeting options of an advertiser across targeting types. */
export const listAssignedTargetingOptionsAdvertisers: API.PaginatedOperationMethod<
  ListAssignedTargetingOptionsAdvertisersRequest,
  ListAssignedTargetingOptionsAdvertisersResponse,
  ListAssignedTargetingOptionsAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssignedTargetingOptionsAdvertisersRequest,
  output: ListAssignedTargetingOptionsAdvertisersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersRequest {
  /** Request body */
  body?: Advertiser;
}

export const CreateAdvertisersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(Advertiser).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v4/advertisers", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersRequest>;

export type CreateAdvertisersResponse = Advertiser;
export const CreateAdvertisersResponse = /*@__PURE__*/ /*#__PURE__*/ Advertiser;

export type CreateAdvertisersError = DefaultErrors;

/** Creates a new advertiser. Returns the newly created advertiser if successful. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export const createAdvertisers: API.OperationMethod<
  CreateAdvertisersRequest,
  CreateAdvertisersResponse,
  CreateAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersRequest,
  output: CreateAdvertisersResponse,
  errors: [],
}));

export interface AuditAdvertisersRequest {
  /** Required. The ID of the advertiser to audit. */
  advertiserId: string;
  /** Optional. The specific fields to return. If no mask is specified, all fields in the response proto will be filled. Valid values are: * usedLineItemsCount * usedInsertionOrdersCount * usedCampaignsCount * channelsCount * negativelyTargetedChannelsCount * negativeKeywordListsCount * adGroupCriteriaCount * campaignCriteriaCount */
  readMask?: string;
}

export const AuditAdvertisersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}:audit" }),
    svc,
  ) as unknown as Schema.Schema<AuditAdvertisersRequest>;

export type AuditAdvertisersResponse = AuditAdvertiserResponse;
export const AuditAdvertisersResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuditAdvertiserResponse;

export type AuditAdvertisersError = DefaultErrors;

/** Audits an advertiser. Returns the counts of used entities per resource type under the advertiser provided. Used entities count towards their respective resource limit. See https://support.google.com/displayvideo/answer/6071450. */
export const auditAdvertisers: API.OperationMethod<
  AuditAdvertisersRequest,
  AuditAdvertisersResponse,
  AuditAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AuditAdvertisersRequest,
  output: AuditAdvertisersResponse,
  errors: [],
}));

export interface DeleteAdvertisersRequest {
  /** The ID of the advertiser we need to delete. */
  advertiserId: string;
}

export const DeleteAdvertisersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v4/advertisers/{advertisersId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersRequest>;

export type DeleteAdvertisersResponse = Empty;
export const DeleteAdvertisersResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersError = DefaultErrors;

/** Deletes an advertiser. Deleting an advertiser will delete all of its child resources, for example, campaigns, insertion orders and line items. A deleted advertiser cannot be recovered. */
export const deleteAdvertisers: API.OperationMethod<
  DeleteAdvertisersRequest,
  DeleteAdvertisersResponse,
  DeleteAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersRequest,
  output: DeleteAdvertisersResponse,
  errors: [],
}));

export interface EditAssignedTargetingOptionsAdvertisersRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Request body */
  body?: BulkEditAdvertiserAssignedTargetingOptionsRequest;
}

export const EditAssignedTargetingOptionsAdvertisersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(
      BulkEditAdvertiserAssignedTargetingOptionsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}:editAssignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EditAssignedTargetingOptionsAdvertisersRequest>;

export type EditAssignedTargetingOptionsAdvertisersResponse =
  BulkEditAdvertiserAssignedTargetingOptionsResponse;
export const EditAssignedTargetingOptionsAdvertisersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditAdvertiserAssignedTargetingOptionsResponse;

export type EditAssignedTargetingOptionsAdvertisersError = DefaultErrors;

/** Edits targeting options under a single advertiser. The operation will delete the assigned targeting options provided in BulkEditAdvertiserAssignedTargetingOptionsRequest.delete_requests and then create the assigned targeting options provided in BulkEditAdvertiserAssignedTargetingOptionsRequest.create_requests . */
export const editAssignedTargetingOptionsAdvertisers: API.OperationMethod<
  EditAssignedTargetingOptionsAdvertisersRequest,
  EditAssignedTargetingOptionsAdvertisersResponse,
  EditAssignedTargetingOptionsAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EditAssignedTargetingOptionsAdvertisersRequest,
  output: EditAssignedTargetingOptionsAdvertisersResponse,
  errors: [],
}));

export interface GetAdvertisersRequest {
  /** Required. The ID of the advertiser to fetch. */
  advertiserId: string;
}

export const GetAdvertisersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersRequest>;

export type GetAdvertisersResponse = Advertiser;
export const GetAdvertisersResponse = /*@__PURE__*/ /*#__PURE__*/ Advertiser;

export type GetAdvertisersError = DefaultErrors;

/** Gets an advertiser. */
export const getAdvertisers: API.OperationMethod<
  GetAdvertisersRequest,
  GetAdvertisersResponse,
  GetAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersRequest,
  output: GetAdvertisersResponse,
  errors: [],
}));

export interface ListAdvertisersRequest {
  /** Required. The ID of the partner that the fetched advertisers should all belong to. The system only supports listing advertisers for one partner at a time. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** Field by which to sort the list. Acceptable values are: * `advertiserId` (default) * `displayName` * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by advertiser fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `advertiserId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All active advertisers under a partner: `entityStatus="ENTITY_STATUS_ACTIVE"` * All advertisers with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All advertisers with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdvertisers` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "v4/advertisers" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersRequest>;

export type ListAdvertisersResponse_Op = ListAdvertisersResponse;
export const ListAdvertisersResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListAdvertisersResponse;

export type ListAdvertisersError = DefaultErrors;

/** Lists advertisers that are accessible to the current user. The order is defined by the order_by parameter. A single partner_id is required. Cross-partner listing is not supported. */
export const listAdvertisers: API.PaginatedOperationMethod<
  ListAdvertisersRequest,
  ListAdvertisersResponse_Op,
  ListAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersRequest,
  output: ListAdvertisersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersRequest {
  /** Output only. The unique ID of the advertiser. Assigned by the system. */
  advertiserId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Advertiser;
}

export const PatchAdvertisersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Advertiser).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersRequest>;

export type PatchAdvertisersResponse = Advertiser;
export const PatchAdvertisersResponse = /*@__PURE__*/ /*#__PURE__*/ Advertiser;

export type PatchAdvertisersError = DefaultErrors;

/** Updates an existing advertiser. Returns the updated advertiser if successful. */
export const patchAdvertisers: API.OperationMethod<
  PatchAdvertisersRequest,
  PatchAdvertisersResponse,
  PatchAdvertisersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersRequest,
  output: PatchAdvertisersResponse,
  errors: [],
}));

export interface BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest {
  /** Optional. A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to the `BulkListAdGroupAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The IDs of the ad groups to list assigned targeting options for. */
  adGroupIds?: string[];
  /** Optional. Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the advertiser the line items belongs to. */
  advertiserId: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `adGroupId` (default) * `assignedTargetingOption.targetingType` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `targetingType` Examples: * `AssignedTargetingOption` resources of targeting type `TARGETING_TYPE_YOUTUBE_VIDEO` or `TARGETING_TYPE_YOUTUBE_CHANNEL`: `targetingType="TARGETING_TYPE_YOUTUBE_VIDEO" OR targetingType="TARGETING_TYPE_YOUTUBE_CHANNEL"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    adGroupIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("adGroupIds"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroups:bulkListAssignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest>;

export type BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse =
  BulkListAdGroupAssignedTargetingOptionsResponse;
export const BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkListAdGroupAssignedTargetingOptionsResponse;

export type BulkListAssignedTargetingOptionsAdvertisersAdGroupsError =
  DefaultErrors;

/** Lists assigned targeting options for multiple ad groups across targeting types. Inherited assigned targeting options are not included. */
export const bulkListAssignedTargetingOptionsAdvertisersAdGroups: API.PaginatedOperationMethod<
  BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest,
  BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse,
  BulkListAssignedTargetingOptionsAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: BulkListAssignedTargetingOptionsAdvertisersAdGroupsRequest,
  output: BulkListAssignedTargetingOptionsAdvertisersAdGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersAdGroupsRequest {
  /** Output only. The unique ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Request body */
  body?: AdGroup;
}

export const CreateAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(AdGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adGroups",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersAdGroupsRequest>;

export type CreateAdvertisersAdGroupsResponse = AdGroup;
export const CreateAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdGroup;

export type CreateAdvertisersAdGroupsError = DefaultErrors;

/** Creates a new ad group. Returns the newly created ad group if successful. */
export const createAdvertisersAdGroups: API.OperationMethod<
  CreateAdvertisersAdGroupsRequest,
  CreateAdvertisersAdGroupsResponse,
  CreateAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersAdGroupsRequest,
  output: CreateAdvertisersAdGroupsResponse,
  errors: [],
}));

export interface BulkEditAssignedTargetingOptionsAdvertisersAdGroupsRequest {
  /** Required. The ID of the advertiser the ad groups belong to. */
  advertiserId: string;
  /** Request body */
  body?: BulkEditAdGroupAssignedTargetingOptionsRequest;
}

export const BulkEditAssignedTargetingOptionsAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(BulkEditAdGroupAssignedTargetingOptionsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adGroups:bulkEditAssignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditAssignedTargetingOptionsAdvertisersAdGroupsRequest>;

export type BulkEditAssignedTargetingOptionsAdvertisersAdGroupsResponse =
  BulkEditAdGroupAssignedTargetingOptionsResponse;
export const BulkEditAssignedTargetingOptionsAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditAdGroupAssignedTargetingOptionsResponse;

export type BulkEditAssignedTargetingOptionsAdvertisersAdGroupsError =
  DefaultErrors;

/** Bulk edits targeting options for multiple ad groups. The same set of delete and create requests will be applied to all specified ad groups. Specifically, the operation will delete the assigned targeting options provided in BulkEditAdGroupAssignedTargetingOptionsRequest.delete_requests from each ad group, and then create the assigned targeting options provided in BulkEditAdGroupAssignedTargetingOptionsRequest.create_requests. Only ad groups under a line item of line_item_type `LINE_ITEM_TYPE_DEMAND_GEN` are supported for this method. */
export const bulkEditAssignedTargetingOptionsAdvertisersAdGroups: API.OperationMethod<
  BulkEditAssignedTargetingOptionsAdvertisersAdGroupsRequest,
  BulkEditAssignedTargetingOptionsAdvertisersAdGroupsResponse,
  BulkEditAssignedTargetingOptionsAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditAssignedTargetingOptionsAdvertisersAdGroupsRequest,
  output: BulkEditAssignedTargetingOptionsAdvertisersAdGroupsResponse,
  errors: [],
}));

export interface GetAdvertisersAdGroupsRequest {
  /** Required. The ID of the advertiser this ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group to fetch. */
  adGroupId: string;
}

export const GetAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersAdGroupsRequest>;

export type GetAdvertisersAdGroupsResponse = AdGroup;
export const GetAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdGroup;

export type GetAdvertisersAdGroupsError = DefaultErrors;

/** Gets an ad group. */
export const getAdvertisersAdGroups: API.OperationMethod<
  GetAdvertisersAdGroupsRequest,
  GetAdvertisersAdGroupsResponse,
  GetAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersAdGroupsRequest,
  output: GetAdvertisersAdGroupsResponse,
  errors: [],
}));

export interface ListAdvertisersAdGroupsRequest {
  /** Optional. Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the advertiser the ad groups belongs to. */
  advertiserId: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by custom ad group fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` and `OR`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported properties: * `adGroupId` * `displayName` * `entityStatus` * `lineItemId` * `adGroupFormat` Examples: * All ad groups under an line item: `lineItemId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` `AD_GROUP_FORMAT_IN_STREAM` ad groups under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND adGroupFormat="AD_GROUP_FORMAT_IN_STREAM"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdGroups` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adGroups" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersAdGroupsRequest>;

export type ListAdvertisersAdGroupsResponse = ListAdGroupsResponse;
export const ListAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAdGroupsResponse;

export type ListAdvertisersAdGroupsError = DefaultErrors;

/** Lists ad groups. */
export const listAdvertisersAdGroups: API.PaginatedOperationMethod<
  ListAdvertisersAdGroupsRequest,
  ListAdvertisersAdGroupsResponse,
  ListAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersAdGroupsRequest,
  output: ListAdvertisersAdGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersAdGroupsRequest {
  /** Output only. The unique ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Output only. The unique ID of the ad group. Assigned by the system. */
  adGroupId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: AdGroup;
}

export const PatchAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(AdGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersAdGroupsRequest>;

export type PatchAdvertisersAdGroupsResponse = AdGroup;
export const PatchAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdGroup;

export type PatchAdvertisersAdGroupsError = DefaultErrors;

/** Updates an existing ad group. Returns the updated ad group if successful. */
export const patchAdvertisersAdGroups: API.OperationMethod<
  PatchAdvertisersAdGroupsRequest,
  PatchAdvertisersAdGroupsResponse,
  PatchAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersAdGroupsRequest,
  output: PatchAdvertisersAdGroupsResponse,
  errors: [],
}));

export interface DeleteAdvertisersAdGroupsRequest {
  /** Required. The ID of the advertiser this ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group to delete. */
  adGroupId: string;
}

export const DeleteAdvertisersAdGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersAdGroupsRequest>;

export type DeleteAdvertisersAdGroupsResponse = Empty;
export const DeleteAdvertisersAdGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersAdGroupsError = DefaultErrors;

/** Deletes a AdGroup. Returns error code `NOT_FOUND` if the ad group does not exist. */
export const deleteAdvertisersAdGroups: API.OperationMethod<
  DeleteAdvertisersAdGroupsRequest,
  DeleteAdvertisersAdGroupsResponse,
  DeleteAdvertisersAdGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersAdGroupsRequest,
  output: DeleteAdvertisersAdGroupsResponse,
  errors: [],
}));

export interface DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group the assigned targeting option belongs to. */
  adGroupId: string;
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
}

export const DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest>;

export type DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  Empty;
export const DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Deletes an assigned targeting option from an ad group. Only ad groups under a line item of line_item_type `LINE_ITEM_TYPE_DEMAND_GEN` are supported for this method. */
export const deleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  output:
    DeleteAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group the assigned targeting option belongs to. */
  adGroupId: string;
  /** Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
}

export const GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest>;

export type GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Gets a single targeting option assigned to an ad group. Inherited assigned targeting options are not included. */
export const getAdvertisersAdGroupsTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  output: GetAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdGroupAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Optional. Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group to list assigned targeting options for. */
  adGroupId: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` resources with ID 1 or 2: `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest>;

export type ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  ListAdGroupAssignedTargetingOptionsResponse;
export const ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAdGroupAssignedTargetingOptionsResponse;

export type ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Lists the targeting options assigned to an ad group. Inherited assigned targeting options are not included. */
export const listAdvertisersAdGroupsTargetingTypesAssignedTargetingOptions: API.PaginatedOperationMethod<
  ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  output: ListAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the advertiser the ad group belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad group the assigned targeting option will belong to. */
  adGroupId: string;
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest>;

export type CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Assigns a targeting option to an ad group. Returns the assigned targeting option if successful. Only ad groups under a line item of line_item_type `LINE_ITEM_TYPE_DEMAND_GEN` are supported for this method. */
export const createAdvertisersAdGroupsTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsRequest,
  output:
    CreateAdvertisersAdGroupsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** The ID of a line item. */
  "linkedEntity.lineItemId"?: string;
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  adGroupId: string;
  /** Required. The ID of the YouTube asset in the association. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: This should be the ID of the asset set linked, or 0 if the location_asset_filter or affiliate_location_asset_filter is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: This should be the ID of the sitelink asset linked. */
  youtubeAssetAssociationId: string;
}

export const DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
    "linkedEntity.lineItemId": Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkedEntity.lineItemId"),
    ),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    youtubeAssetAssociationId: Schema.String.pipe(
      T.HttpPath("youtubeAssetAssociationId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations/{youtubeAssetAssociationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  Empty;
export const DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError =
  DefaultErrors;

/** Deletes an existing association between the identified resource and a YouTube asset. *Warning:* This method is only available to an informed subset of users. */
export const deleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<
  DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output:
    DeleteAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

export interface CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  adGroupId: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** The ID of a line item. */
  "linkedEntity.lineItemId"?: string;
  /** Request body */
  body?: YoutubeAssetAssociation;
}

export const CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
    "linkedEntity.lineItemId": Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkedEntity.lineItemId"),
    ),
    body: Schema.optional(YoutubeAssetAssociation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  YoutubeAssetAssociation;
export const CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ YoutubeAssetAssociation;

export type CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError =
  DefaultErrors;

/** Creates a new association between the identified resource and a YouTube asset. Returns the newly-created association. *Warning:* This method is only available to an informed subset of users. */
export const createAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<
  CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output:
    CreateAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

export interface ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The type of YouTube asset being associated with the resource. */
  youtubeAssetType:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** The ID of a line item. */
  "linkedEntity.lineItemId"?: string;
  /** Optional. Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  adGroupId: string;
  /** Optional. Field by which to sort the list. The only acceptable values are: * `linkedYoutubeAsset.locationAssetFilter.assetSetId`, * `linkedYoutubeAsset.affiliateLocationAssetFilter.assetSetId`, * `linkedYoutubeAsset.sitelinkAsset.assetId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `linkedYoutubeAsset.sitelinkAsset.assetId desc`. */
  orderBy?: string;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListYoutubeAssetAssociations` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
    "linkedEntity.lineItemId": Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkedEntity.lineItemId"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupId: Schema.String.pipe(T.HttpPath("adGroupId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroups/{adGroupsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  ListYoutubeAssetAssociationsResponse;
export const ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListYoutubeAssetAssociationsResponse;

export type ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError =
  DefaultErrors;

/** Lists the YouTube asset associations linked to the given resource. */
export const listAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociations: API.PaginatedOperationMethod<
  ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output:
    ListAdvertisersAdGroupsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersChannelsRequest {
  /** The ID of the partner that owns the created channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the created channel. */
  advertiserId: string;
  /** Request body */
  body?: Channel;
}

export const CreateAdvertisersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/channels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersChannelsRequest>;

export type CreateAdvertisersChannelsResponse = Channel;
export const CreateAdvertisersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type CreateAdvertisersChannelsError = DefaultErrors;

/** Creates a new channel. Returns the newly created channel if successful. */
export const createAdvertisersChannels: API.OperationMethod<
  CreateAdvertisersChannelsRequest,
  CreateAdvertisersChannelsResponse,
  CreateAdvertisersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersChannelsRequest,
  output: CreateAdvertisersChannelsResponse,
  errors: [],
}));

export interface GetAdvertisersChannelsRequest {
  /** The ID of the partner that owns the fetched channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the fetched channel. */
  advertiserId: string;
  /** Required. The ID of the channel to fetch. */
  channelId: string;
}

export const GetAdvertisersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/channels/{channelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersChannelsRequest>;

export type GetAdvertisersChannelsResponse = Channel;
export const GetAdvertisersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type GetAdvertisersChannelsError = DefaultErrors;

/** Gets a channel for a partner or advertiser. */
export const getAdvertisersChannels: API.OperationMethod<
  GetAdvertisersChannelsRequest,
  GetAdvertisersChannelsResponse,
  GetAdvertisersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersChannelsRequest,
  output: GetAdvertisersChannelsResponse,
  errors: [],
}));

export interface ListAdvertisersChannelsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the advertiser that owns the channels. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `channelId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by channel fields. Supported syntax: * Filter expressions for channel can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All channels for which the display name contains "google": `displayName : "google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** The ID of the partner that owns the channels. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListAdvertisersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/channels" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersChannelsRequest>;

export type ListAdvertisersChannelsResponse = ListChannelsResponse;
export const ListAdvertisersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListChannelsResponse;

export type ListAdvertisersChannelsError = DefaultErrors;

/** Lists channels for a partner or advertiser. */
export const listAdvertisersChannels: API.PaginatedOperationMethod<
  ListAdvertisersChannelsRequest,
  ListAdvertisersChannelsResponse,
  ListAdvertisersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersChannelsRequest,
  output: ListAdvertisersChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersChannelsRequest {
  /** The ID of the advertiser that owns the created channel. */
  advertiserId: string;
  /** The ID of the partner that owns the created channel. */
  partnerId?: string;
  /** Output only. The unique ID of the channel. Assigned by the system. */
  channelId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Channel;
}

export const PatchAdvertisersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/channels/{channelId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersChannelsRequest>;

export type PatchAdvertisersChannelsResponse = Channel;
export const PatchAdvertisersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type PatchAdvertisersChannelsError = DefaultErrors;

/** Updates a channel. Returns the updated channel if successful. */
export const patchAdvertisersChannels: API.OperationMethod<
  PatchAdvertisersChannelsRequest,
  PatchAdvertisersChannelsResponse,
  PatchAdvertisersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersChannelsRequest,
  output: PatchAdvertisersChannelsResponse,
  errors: [],
}));

export interface ReplaceAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel whose sites will be replaced. */
  channelId: string;
  /** Request body */
  body?: ReplaceSitesRequest;
}

export const ReplaceAdvertisersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    body: Schema.optional(ReplaceSitesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites:replace",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReplaceAdvertisersChannelsSitesRequest>;

export type ReplaceAdvertisersChannelsSitesResponse = ReplaceSitesResponse;
export const ReplaceAdvertisersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReplaceSitesResponse;

export type ReplaceAdvertisersChannelsSitesError = DefaultErrors;

/** Replaces all of the sites under a single channel. The operation will replace the sites under a channel with the sites provided in ReplaceSitesRequest.new_sites. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export const replaceAdvertisersChannelsSites: API.OperationMethod<
  ReplaceAdvertisersChannelsSitesRequest,
  ReplaceAdvertisersChannelsSitesResponse,
  ReplaceAdvertisersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReplaceAdvertisersChannelsSitesRequest,
  output: ReplaceAdvertisersChannelsSitesResponse,
  errors: [],
}));

export interface BulkEditAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel to which the sites belong. */
  channelId: string;
  /** Request body */
  body?: BulkEditSitesRequest;
}

export const BulkEditAdvertisersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    body: Schema.optional(BulkEditSitesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites:bulkEdit",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditAdvertisersChannelsSitesRequest>;

export type BulkEditAdvertisersChannelsSitesResponse = BulkEditSitesResponse;
export const BulkEditAdvertisersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditSitesResponse;

export type BulkEditAdvertisersChannelsSitesError = DefaultErrors;

/** Bulk edits sites under a single channel. The operation will delete the sites provided in BulkEditSitesRequest.deleted_sites and then create the sites provided in BulkEditSitesRequest.created_sites. */
export const bulkEditAdvertisersChannelsSites: API.OperationMethod<
  BulkEditAdvertisersChannelsSitesRequest,
  BulkEditAdvertisersChannelsSitesResponse,
  BulkEditAdvertisersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditAdvertisersChannelsSitesRequest,
  output: BulkEditAdvertisersChannelsSitesResponse,
  errors: [],
}));

export interface CreateAdvertisersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Required. The ID of the parent channel in which the site will be created. */
  channelId: string;
  /** Request body */
  body?: Site;
}

export const CreateAdvertisersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    body: Schema.optional(Site).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersChannelsSitesRequest>;

export type CreateAdvertisersChannelsSitesResponse = Site;
export const CreateAdvertisersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Site;

export type CreateAdvertisersChannelsSitesError = DefaultErrors;

/** Creates a site in a channel. */
export const createAdvertisersChannelsSites: API.OperationMethod<
  CreateAdvertisersChannelsSitesRequest,
  CreateAdvertisersChannelsSitesResponse,
  CreateAdvertisersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersChannelsSitesRequest,
  output: CreateAdvertisersChannelsSitesResponse,
  errors: [],
}));

export interface DeleteAdvertisersChannelsSitesRequest {
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** Required. The ID of the parent channel to which the site belongs. */
  channelId: string;
  /** Required. The URL or app ID of the site to delete. */
  urlOrAppId: string;
}

export const DeleteAdvertisersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    urlOrAppId: Schema.String.pipe(T.HttpPath("urlOrAppId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertiserId}/channels/{channelsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersChannelsSitesRequest>;

export type DeleteAdvertisersChannelsSitesResponse = Empty;
export const DeleteAdvertisersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersChannelsSitesError = DefaultErrors;

/** Deletes a site from a channel. */
export const deleteAdvertisersChannelsSites: API.OperationMethod<
  DeleteAdvertisersChannelsSitesRequest,
  DeleteAdvertisersChannelsSitesResponse,
  DeleteAdvertisersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersChannelsSitesRequest,
  output: DeleteAdvertisersChannelsSitesResponse,
  errors: [],
}));

export interface ListAdvertisersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `urlOrAppId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `urlOrAppId desc`. */
  orderBy?: string;
  /** Allows filtering by site fields. Supported syntax: * Filter expressions for site retrieval can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `urlOrAppId` Examples: * All sites for which the URL or app ID contains "google": `urlOrAppId : "google"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Required. The ID of the parent channel to which the requested sites belong. */
  channelId: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListSites` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/channels/{channelsId}/sites",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersChannelsSitesRequest>;

export type ListAdvertisersChannelsSitesResponse = ListSitesResponse;
export const ListAdvertisersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSitesResponse;

export type ListAdvertisersChannelsSitesError = DefaultErrors;

/** Lists sites in a channel. */
export const listAdvertisersChannelsSites: API.PaginatedOperationMethod<
  ListAdvertisersChannelsSitesRequest,
  ListAdvertisersChannelsSitesResponse,
  ListAdvertisersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersChannelsSitesRequest,
  output: ListAdvertisersChannelsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAdvertisersAdGroupAdsRequest {
  /** Required. The ID of the ad to fetch. */
  adGroupAdId: string;
  /** Required. The ID of the advertiser this ad group ad belongs to. */
  advertiserId: string;
}

export const GetAdvertisersAdGroupAdsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    adGroupAdId: Schema.String.pipe(T.HttpPath("adGroupAdId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroupAds/{adGroupAdsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersAdGroupAdsRequest>;

export type GetAdvertisersAdGroupAdsResponse = AdGroupAd;
export const GetAdvertisersAdGroupAdsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdGroupAd;

export type GetAdvertisersAdGroupAdsError = DefaultErrors;

/** Gets an ad group ad. */
export const getAdvertisersAdGroupAds: API.OperationMethod<
  GetAdvertisersAdGroupAdsRequest,
  GetAdvertisersAdGroupAdsResponse,
  GetAdvertisersAdGroupAdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersAdGroupAdsRequest,
  output: GetAdvertisersAdGroupAdsResponse,
  errors: [],
}));

export interface ListAdvertisersAdGroupAdsRequest {
  /** Required. The ID of the advertiser the ads belong to. */
  advertiserId: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by ad group ad fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` and `OR`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `adGroupId` * `displayName` * `entityStatus` * `adGroupAdId` Examples: * All ad group ads under an ad group: `adGroupId="1234"` * All ad group ads under an ad group with an entityStatus of `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED`: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND adGroupId="12345"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Optional. Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdGroupAds` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersAdGroupAdsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adGroupAds",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersAdGroupAdsRequest>;

export type ListAdvertisersAdGroupAdsResponse = ListAdGroupAdsResponse;
export const ListAdvertisersAdGroupAdsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAdGroupAdsResponse;

export type ListAdvertisersAdGroupAdsError = DefaultErrors;

/** Lists ad group ads. */
export const listAdvertisersAdGroupAds: API.PaginatedOperationMethod<
  ListAdvertisersAdGroupAdsRequest,
  ListAdvertisersAdGroupAdsResponse,
  ListAdvertisersAdGroupAdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersAdGroupAdsRequest,
  output: ListAdvertisersAdGroupAdsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersAdGroupAdsRequest {
  /** Output only. The unique ID of the ad. Assigned by the system. */
  adGroupAdId: string;
  /** Output only. The unique ID of the advertiser the ad belongs to. */
  advertiserId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: AdGroupAd;
}

export const PatchAdvertisersAdGroupAdsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    adGroupAdId: Schema.String.pipe(T.HttpPath("adGroupAdId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(AdGroupAd).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/adGroupAds/{adGroupAdsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersAdGroupAdsRequest>;

export type PatchAdvertisersAdGroupAdsResponse = AdGroupAd;
export const PatchAdvertisersAdGroupAdsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdGroupAd;

export type PatchAdvertisersAdGroupAdsError = DefaultErrors;

/** Updates an ad group ad. */
export const patchAdvertisersAdGroupAds: API.OperationMethod<
  PatchAdvertisersAdGroupAdsRequest,
  PatchAdvertisersAdGroupAdsResponse,
  PatchAdvertisersAdGroupAdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersAdGroupAdsRequest,
  output: PatchAdvertisersAdGroupAdsResponse,
  errors: [],
}));

export interface DeleteAdvertisersAdGroupAdsRequest {
  /** Required. The ID of the advertiser the ad belongs to. */
  advertiserId: string;
  /** Required. The ID of the ad to delete. */
  adGroupAdId: string;
}

export const DeleteAdvertisersAdGroupAdsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    adGroupAdId: Schema.String.pipe(T.HttpPath("adGroupAdId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/adGroupAds/{adGroupAdsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersAdGroupAdsRequest>;

export type DeleteAdvertisersAdGroupAdsResponse = Empty;
export const DeleteAdvertisersAdGroupAdsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersAdGroupAdsError = DefaultErrors;

/** Deletes an ad group ad. */
export const deleteAdvertisersAdGroupAds: API.OperationMethod<
  DeleteAdvertisersAdGroupAdsRequest,
  DeleteAdvertisersAdGroupAdsResponse,
  DeleteAdvertisersAdGroupAdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersAdGroupAdsRequest,
  output: DeleteAdvertisersAdGroupAdsResponse,
  errors: [],
}));

export interface CreateAdvertisersAdGroupAdsRequest {
  /** Output only. The unique ID of the advertiser the ad belongs to. */
  advertiserId: string;
  /** Request body */
  body?: AdGroupAd;
}

export const CreateAdvertisersAdGroupAdsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(AdGroupAd).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adGroupAds",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersAdGroupAdsRequest>;

export type CreateAdvertisersAdGroupAdsResponse = AdGroupAd;
export const CreateAdvertisersAdGroupAdsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdGroupAd;

export type CreateAdvertisersAdGroupAdsError = DefaultErrors;

/** Creates an ad group ad. */
export const createAdvertisersAdGroupAds: API.OperationMethod<
  CreateAdvertisersAdGroupAdsRequest,
  CreateAdvertisersAdGroupAdsResponse,
  CreateAdvertisersAdGroupAdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersAdGroupAdsRequest,
  output: CreateAdvertisersAdGroupAdsResponse,
  errors: [],
}));

export interface UploadAdvertisersAssetsRequest {
  /** Required. The ID of the advertiser this asset belongs to. */
  advertiserId: string;
  /** Request body */
  body?: CreateAssetRequest;
}

export const UploadAdvertisersAssetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(CreateAssetRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/assets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UploadAdvertisersAssetsRequest>;

export type UploadAdvertisersAssetsResponse = CreateAssetResponse;
export const UploadAdvertisersAssetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CreateAssetResponse;

export type UploadAdvertisersAssetsError = DefaultErrors;

/** Uploads an asset. Returns the ID of the newly uploaded asset if successful. The asset file size should be no more than 10 MB for images, 200 MB for ZIP files, and 1 GB for videos. Must be used within the [multipart media upload process](/display-video/api/guides/how-tos/upload#multipart). Examples using provided client libraries can be found in our [Creating Creatives guide](/display-video/api/guides/creating-creatives/overview#upload_an_asset). */
export const uploadAdvertisersAssets: API.OperationMethod<
  UploadAdvertisersAssetsRequest,
  UploadAdvertisersAssetsResponse,
  UploadAdvertisersAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadAdvertisersAssetsRequest,
  output: UploadAdvertisersAssetsResponse,
  errors: [],
}));

export interface CreateAdvertisersCreativesRequest {
  /** Output only. The unique ID of the advertiser the creative belongs to. */
  advertiserId: string;
  /** Request body */
  body?: Creative;
}

export const CreateAdvertisersCreativesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(Creative).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/creatives",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersCreativesRequest>;

export type CreateAdvertisersCreativesResponse = Creative;
export const CreateAdvertisersCreativesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Creative;

export type CreateAdvertisersCreativesError = DefaultErrors;

/** Creates a new creative. Returns the newly created creative if successful. A ["Standard" user role](//support.google.com/displayvideo/answer/2723011) or greater for the parent advertiser or partner is required to make this request. */
export const createAdvertisersCreatives: API.OperationMethod<
  CreateAdvertisersCreativesRequest,
  CreateAdvertisersCreativesResponse,
  CreateAdvertisersCreativesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersCreativesRequest,
  output: CreateAdvertisersCreativesResponse,
  errors: [],
}));

export interface DeleteAdvertisersCreativesRequest {
  /** The ID of the advertiser this creative belongs to. */
  advertiserId: string;
  /** The ID of the creative to be deleted. */
  creativeId: string;
}

export const DeleteAdvertisersCreativesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/creatives/{creativesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersCreativesRequest>;

export type DeleteAdvertisersCreativesResponse = Empty;
export const DeleteAdvertisersCreativesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersCreativesError = DefaultErrors;

/** Deletes a creative. Returns error code `NOT_FOUND` if the creative does not exist. The creative should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, before it can be deleted. A ["Standard" user role](//support.google.com/displayvideo/answer/2723011) or greater for the parent advertiser or partner is required to make this request. */
export const deleteAdvertisersCreatives: API.OperationMethod<
  DeleteAdvertisersCreativesRequest,
  DeleteAdvertisersCreativesResponse,
  DeleteAdvertisersCreativesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersCreativesRequest,
  output: DeleteAdvertisersCreativesResponse,
  errors: [],
}));

export interface GetAdvertisersCreativesRequest {
  /** Required. The ID of the advertiser this creative belongs to. */
  advertiserId: string;
  /** Required. The ID of the creative to fetch. */
  creativeId: string;
}

export const GetAdvertisersCreativesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/creatives/{creativesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersCreativesRequest>;

export type GetAdvertisersCreativesResponse = Creative;
export const GetAdvertisersCreativesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Creative;

export type GetAdvertisersCreativesError = DefaultErrors;

/** Gets a creative. */
export const getAdvertisersCreatives: API.OperationMethod<
  GetAdvertisersCreativesRequest,
  GetAdvertisersCreativesResponse,
  GetAdvertisersCreativesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersCreativesRequest,
  output: GetAdvertisersCreativesResponse,
  errors: [],
}));

export interface ListAdvertisersCreativesRequest {
  /** Required. The ID of the advertiser to list creatives for. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `creativeId` (default) * `createTime` * `mediaDuration` * `dimensions` (sorts by width first, then by height) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `createTime desc`. */
  orderBy?: string;
  /** Allows filtering by creative fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `lineItemIds` field must use the `HAS (:)` operator. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. * For `entityStatus`, `minDuration`, `maxDuration`, `updateTime`, and `dynamic` fields, there may be at most one restriction. Supported Fields: * `approvalStatus` * `creativeId` * `creativeType` * `dimensions` (input in the form of `{width}x{height}`) * `dynamic` * `entityStatus` * `exchangeReviewStatus` (input in the form of `{exchange}-{reviewStatus}`) * `lineItemIds` * `maxDuration` (input in the form of `{duration}s`. Only seconds are supported) * `minDuration` (input in the form of `{duration}s`. Only seconds are supported) * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Notes: * For `updateTime`, a creative resource's field value reflects the last time that a creative has been updated, which includes updates made by the system (e.g. creative review updates). Examples: * All native creatives: `creativeType="CREATIVE_TYPE_NATIVE"` * All active creatives with 300x400 or 50x100 dimensions: `entityStatus="ENTITY_STATUS_ACTIVE" AND (dimensions="300x400" OR dimensions="50x100")` * All dynamic creatives that are approved by AdX or AppNexus, with a minimum duration of 5 seconds and 200ms: `dynamic="true" AND minDuration="5.2s" AND (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED" OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")` * All video creatives that are associated with line item ID 1 or 2: `creativeType="CREATIVE_TYPE_VIDEO" AND (lineItemIds:1 OR lineItemIds:2)` * Find creatives by multiple creative IDs: `creativeId=1 OR creativeId=2` * All creatives with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCreatives` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersCreativesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/creatives" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersCreativesRequest>;

export type ListAdvertisersCreativesResponse = ListCreativesResponse;
export const ListAdvertisersCreativesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCreativesResponse;

export type ListAdvertisersCreativesError = DefaultErrors;

/** Lists creatives in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, creatives with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export const listAdvertisersCreatives: API.PaginatedOperationMethod<
  ListAdvertisersCreativesRequest,
  ListAdvertisersCreativesResponse,
  ListAdvertisersCreativesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersCreativesRequest,
  output: ListAdvertisersCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersCreativesRequest {
  /** Output only. The unique ID of the creative. Assigned by the system. */
  creativeId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Output only. The unique ID of the advertiser the creative belongs to. */
  advertiserId: string;
  /** Request body */
  body?: Creative;
}

export const PatchAdvertisersCreativesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    creativeId: Schema.String.pipe(T.HttpPath("creativeId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(Creative).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/creatives/{creativesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersCreativesRequest>;

export type PatchAdvertisersCreativesResponse = Creative;
export const PatchAdvertisersCreativesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Creative;

export type PatchAdvertisersCreativesError = DefaultErrors;

/** Updates an existing creative. Returns the updated creative if successful. A ["Standard" user role](//support.google.com/displayvideo/answer/2723011) or greater for the parent advertiser or partner is required to make this request. */
export const patchAdvertisersCreatives: API.OperationMethod<
  PatchAdvertisersCreativesRequest,
  PatchAdvertisersCreativesResponse,
  PatchAdvertisersCreativesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersCreativesRequest,
  output: PatchAdvertisersCreativesResponse,
  errors: [],
}));

export interface DeleteAdvertisersCampaignsRequest {
  /** The ID of the campaign we need to delete. */
  campaignId: string;
  /** The ID of the advertiser this campaign belongs to. */
  advertiserId: string;
}

export const DeleteAdvertisersCampaignsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/campaigns/{campaignsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersCampaignsRequest>;

export type DeleteAdvertisersCampaignsResponse = Empty;
export const DeleteAdvertisersCampaignsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersCampaignsError = DefaultErrors;

/** Permanently deletes a campaign. A deleted campaign cannot be recovered. The campaign should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export const deleteAdvertisersCampaigns: API.OperationMethod<
  DeleteAdvertisersCampaignsRequest,
  DeleteAdvertisersCampaignsResponse,
  DeleteAdvertisersCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersCampaignsRequest,
  output: DeleteAdvertisersCampaignsResponse,
  errors: [],
}));

export interface GetAdvertisersCampaignsRequest {
  /** Required. The ID of the campaign to fetch. */
  campaignId: string;
  /** Required. The ID of the advertiser this campaign belongs to. */
  advertiserId: string;
}

export const GetAdvertisersCampaignsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/campaigns/{campaignsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersCampaignsRequest>;

export type GetAdvertisersCampaignsResponse = Campaign;
export const GetAdvertisersCampaignsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Campaign;

export type GetAdvertisersCampaignsError = DefaultErrors;

/** Gets a campaign. */
export const getAdvertisersCampaigns: API.OperationMethod<
  GetAdvertisersCampaignsRequest,
  GetAdvertisersCampaignsResponse,
  GetAdvertisersCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersCampaignsRequest,
  output: GetAdvertisersCampaignsResponse,
  errors: [],
}));

export interface ListAdvertisersCampaignsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCampaigns` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** The ID of the advertiser to list campaigns for. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by campaign fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` campaigns under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")` * All campaigns with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All campaigns with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersCampaignsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/campaigns" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersCampaignsRequest>;

export type ListAdvertisersCampaignsResponse = ListCampaignsResponse;
export const ListAdvertisersCampaignsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCampaignsResponse;

export type ListAdvertisersCampaignsError = DefaultErrors;

/** Lists campaigns in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, campaigns with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export const listAdvertisersCampaigns: API.PaginatedOperationMethod<
  ListAdvertisersCampaignsRequest,
  ListAdvertisersCampaignsResponse,
  ListAdvertisersCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersCampaignsRequest,
  output: ListAdvertisersCampaignsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersCampaignsRequest {
  /** Output only. The unique ID of the campaign. Assigned by the system. */
  campaignId: string;
  /** Output only. The unique ID of the advertiser the campaign belongs to. */
  advertiserId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Campaign;
}

export const PatchAdvertisersCampaignsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Campaign).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/campaigns/{campaignsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersCampaignsRequest>;

export type PatchAdvertisersCampaignsResponse = Campaign;
export const PatchAdvertisersCampaignsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Campaign;

export type PatchAdvertisersCampaignsError = DefaultErrors;

/** Updates an existing campaign. Returns the updated campaign if successful. */
export const patchAdvertisersCampaigns: API.OperationMethod<
  PatchAdvertisersCampaignsRequest,
  PatchAdvertisersCampaignsResponse,
  PatchAdvertisersCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersCampaignsRequest,
  output: PatchAdvertisersCampaignsResponse,
  errors: [],
}));

export interface CreateAdvertisersCampaignsRequest {
  /** Output only. The unique ID of the advertiser the campaign belongs to. */
  advertiserId: string;
  /** Request body */
  body?: Campaign;
}

export const CreateAdvertisersCampaignsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(Campaign).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/campaigns",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersCampaignsRequest>;

export type CreateAdvertisersCampaignsResponse = Campaign;
export const CreateAdvertisersCampaignsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Campaign;

export type CreateAdvertisersCampaignsError = DefaultErrors;

/** Creates a new campaign. Returns the newly created campaign if successful. */
export const createAdvertisersCampaigns: API.OperationMethod<
  CreateAdvertisersCampaignsRequest,
  CreateAdvertisersCampaignsResponse,
  CreateAdvertisersCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersCampaignsRequest,
  output: CreateAdvertisersCampaignsResponse,
  errors: [],
}));

export interface GetAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the fetched negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the negative keyword list to fetch. */
  negativeKeywordListId: string;
}

export const GetAdvertisersNegativeKeywordListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersNegativeKeywordListsRequest>;

export type GetAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;
export const GetAdvertisersNegativeKeywordListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NegativeKeywordList;

export type GetAdvertisersNegativeKeywordListsError = DefaultErrors;

/** Gets a negative keyword list given an advertiser ID and a negative keyword list ID. */
export const getAdvertisersNegativeKeywordLists: API.OperationMethod<
  GetAdvertisersNegativeKeywordListsRequest,
  GetAdvertisersNegativeKeywordListsResponse,
  GetAdvertisersNegativeKeywordListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersNegativeKeywordListsRequest,
  output: GetAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

export interface ListAdvertisersNegativeKeywordListsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListNegativeKeywordLists` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Requested page size. Must be between `1` and `200`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the DV360 advertiser to which the fetched negative keyword lists belong. */
  advertiserId: string;
}

export const ListAdvertisersNegativeKeywordListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/negativeKeywordLists",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersNegativeKeywordListsRequest>;

export type ListAdvertisersNegativeKeywordListsResponse =
  ListNegativeKeywordListsResponse;
export const ListAdvertisersNegativeKeywordListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListNegativeKeywordListsResponse;

export type ListAdvertisersNegativeKeywordListsError = DefaultErrors;

/** Lists negative keyword lists based on a given advertiser id. */
export const listAdvertisersNegativeKeywordLists: API.PaginatedOperationMethod<
  ListAdvertisersNegativeKeywordListsRequest,
  ListAdvertisersNegativeKeywordListsResponse,
  ListAdvertisersNegativeKeywordListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersNegativeKeywordListsRequest,
  output: ListAdvertisersNegativeKeywordListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

export const PatchAdvertisersNegativeKeywordListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(NegativeKeywordList).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersNegativeKeywordListsRequest>;

export type PatchAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;
export const PatchAdvertisersNegativeKeywordListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NegativeKeywordList;

export type PatchAdvertisersNegativeKeywordListsError = DefaultErrors;

/** Updates a negative keyword list. Returns the updated negative keyword list if successful. */
export const patchAdvertisersNegativeKeywordLists: API.OperationMethod<
  PatchAdvertisersNegativeKeywordListsRequest,
  PatchAdvertisersNegativeKeywordListsResponse,
  PatchAdvertisersNegativeKeywordListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersNegativeKeywordListsRequest,
  output: PatchAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

export interface DeleteAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the negative keyword list to delete. */
  negativeKeywordListId: string;
}

export const DeleteAdvertisersNegativeKeywordListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersNegativeKeywordListsRequest>;

export type DeleteAdvertisersNegativeKeywordListsResponse = Empty;
export const DeleteAdvertisersNegativeKeywordListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersNegativeKeywordListsError = DefaultErrors;

/** Deletes a negative keyword list given an advertiser ID and a negative keyword list ID. */
export const deleteAdvertisersNegativeKeywordLists: API.OperationMethod<
  DeleteAdvertisersNegativeKeywordListsRequest,
  DeleteAdvertisersNegativeKeywordListsResponse,
  DeleteAdvertisersNegativeKeywordListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersNegativeKeywordListsRequest,
  output: DeleteAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

export interface CreateAdvertisersNegativeKeywordListsRequest {
  /** Required. The ID of the DV360 advertiser to which the negative keyword list will belong. */
  advertiserId: string;
  /** Request body */
  body?: NegativeKeywordList;
}

export const CreateAdvertisersNegativeKeywordListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(NegativeKeywordList).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/negativeKeywordLists",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersNegativeKeywordListsRequest>;

export type CreateAdvertisersNegativeKeywordListsResponse = NegativeKeywordList;
export const CreateAdvertisersNegativeKeywordListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NegativeKeywordList;

export type CreateAdvertisersNegativeKeywordListsError = DefaultErrors;

/** Creates a new negative keyword list. Returns the newly created negative keyword list if successful. */
export const createAdvertisersNegativeKeywordLists: API.OperationMethod<
  CreateAdvertisersNegativeKeywordListsRequest,
  CreateAdvertisersNegativeKeywordListsResponse,
  CreateAdvertisersNegativeKeywordListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersNegativeKeywordListsRequest,
  output: CreateAdvertisersNegativeKeywordListsResponse,
  errors: [],
}));

export interface CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list in which the negative keyword will be created. */
  negativeKeywordListId: string;
  /** Request body */
  body?: NegativeKeyword;
}

export const CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
    body: Schema.optional(NegativeKeyword).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  NegativeKeyword;
export const CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NegativeKeyword;

export type CreateAdvertisersNegativeKeywordListsNegativeKeywordsError =
  DefaultErrors;

/** Creates a negative keyword in a negative keyword list. */
export const createAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<
  CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  CreateAdvertisersNegativeKeywordListsNegativeKeywordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: CreateAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

export interface BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the negative keywords belong. */
  negativeKeywordListId: string;
  /** Request body */
  body?: BulkEditNegativeKeywordsRequest;
}

export const BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
    body: Schema.optional(BulkEditNegativeKeywordsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords:bulkEdit",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  BulkEditNegativeKeywordsResponse;
export const BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditNegativeKeywordsResponse;

export type BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsError =
  DefaultErrors;

/** Bulk edits negative keywords in a single negative keyword list. The operation will delete the negative keywords provided in BulkEditNegativeKeywordsRequest.deleted_negative_keywords and then create the negative keywords provided in BulkEditNegativeKeywordsRequest.created_negative_keywords. This operation is guaranteed to be atomic and will never result in a partial success or partial failure. */
export const bulkEditAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<
  BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: BulkEditAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

export interface ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the negative keywords belong. */
  negativeKeywordListId: string;
  /** Request body */
  body?: ReplaceNegativeKeywordsRequest;
}

export const ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
    body: Schema.optional(ReplaceNegativeKeywordsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords:replace",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  ReplaceNegativeKeywordsResponse;
export const ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReplaceNegativeKeywordsResponse;

export type ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsError =
  DefaultErrors;

/** Replaces all negative keywords in a single negative keyword list. The operation will replace the keywords in a negative keyword list with keywords provided in ReplaceNegativeKeywordsRequest.new_negative_keywords. */
export const replaceAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<
  ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: ReplaceAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

export interface ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the parent negative keyword list to which the requested negative keywords belong. */
  negativeKeywordListId: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListNegativeKeywords` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `keywordValue` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `keywordValue desc`. */
  orderBy?: string;
  /** Allows filtering by negative keyword fields. Supported syntax: * Filter expressions for negative keywords can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `keywordValue` Examples: * All negative keywords for which the keyword value contains "google": `keywordValue : "google"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `1000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  ListNegativeKeywordsResponse;
export const ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListNegativeKeywordsResponse;

export type ListAdvertisersNegativeKeywordListsNegativeKeywordsError =
  DefaultErrors;

/** Lists negative keywords in a negative keyword list. */
export const listAdvertisersNegativeKeywordListsNegativeKeywords: API.PaginatedOperationMethod<
  ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  ListAdvertisersNegativeKeywordListsNegativeKeywordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: ListAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest {
  /** Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs. */
  advertiserId: string;
  /** Required. The ID of the parent negative keyword list to which the negative keyword belongs. */
  negativeKeywordListId: string;
  /** Required. The keyword value of the negative keyword to delete. */
  keywordValue: string;
}

export const DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    negativeKeywordListId: Schema.String.pipe(
      T.HttpPath("negativeKeywordListId"),
    ),
    keywordValue: Schema.String.pipe(T.HttpPath("keywordValue")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertiserId}/negativeKeywordLists/{negativeKeywordListsId}/negativeKeywords/{negativeKeywordsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest>;

export type DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  Empty;
export const DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersNegativeKeywordListsNegativeKeywordsError =
  DefaultErrors;

/** Deletes a negative keyword from a negative keyword list. */
export const deleteAdvertisersNegativeKeywordListsNegativeKeywords: API.OperationMethod<
  DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  DeleteAdvertisersNegativeKeywordListsNegativeKeywordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersNegativeKeywordListsNegativeKeywordsRequest,
  output: DeleteAdvertisersNegativeKeywordListsNegativeKeywordsResponse,
  errors: [],
}));

export interface BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser the line items belong to. */
  advertiserId: string;
  /** Request body */
  body?: BulkEditAssignedTargetingOptionsRequest;
}

export const BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(BulkEditAssignedTargetingOptionsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/lineItems:bulkEditAssignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest>;

export type BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse =
  BulkEditAssignedTargetingOptionsResponse;
export const BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditAssignedTargetingOptionsResponse;

export type BulkEditAssignedTargetingOptionsAdvertisersLineItemsError =
  DefaultErrors;

/** Bulk edits targeting options under multiple line items. The operation will delete the assigned targeting options provided in BulkEditAssignedTargetingOptionsRequest.delete_requests and then create the assigned targeting options provided in BulkEditAssignedTargetingOptionsRequest.create_requests. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * lineItems.bulkUpdate * lineItems.patch * assignedTargetingOptions.create * assignedTargetingOptions.delete YouTube & Partners line items cannot be created or updated using the API. */
export const bulkEditAssignedTargetingOptionsAdvertisersLineItems: API.OperationMethod<
  BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest,
  BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse,
  BulkEditAssignedTargetingOptionsAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditAssignedTargetingOptionsAdvertisersLineItemsRequest,
  output: BulkEditAssignedTargetingOptionsAdvertisersLineItemsResponse,
  errors: [],
}));

export interface BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser the line items belongs to. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `lineItemId` (default) * `assignedTargetingOption.targetingType` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR` on the same field. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `targetingType` * `inheritance` Examples: * `AssignedTargetingOption` resources of targeting type `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` or `TARGETING_TYPE_CHANNEL`: `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR targetingType="TARGETING_TYPE_CHANNEL"` * `AssignedTargetingOption` resources with inheritance status of `NOT_INHERITED` or `INHERITED_FROM_PARTNER`: `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Required. The IDs of the line items to list assigned targeting options for. */
  lineItemIds?: string[];
  /** Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to the `BulkListAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    lineItemIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("lineItemIds"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/lineItems:bulkListAssignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest>;

export type BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse =
  BulkListAssignedTargetingOptionsResponse;
export const BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkListAssignedTargetingOptionsResponse;

export type BulkListAssignedTargetingOptionsAdvertisersLineItemsError =
  DefaultErrors;

/** Lists assigned targeting options for multiple line items across targeting types. */
export const bulkListAssignedTargetingOptionsAdvertisersLineItems: API.PaginatedOperationMethod<
  BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest,
  BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse,
  BulkListAssignedTargetingOptionsAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: BulkListAssignedTargetingOptionsAdvertisersLineItemsRequest,
  output: BulkListAssignedTargetingOptionsAdvertisersLineItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersLineItemsRequest {
  /** Output only. The unique ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Request body */
  body?: LineItem;
}

export const CreateAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(LineItem).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/lineItems",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersLineItemsRequest>;

export type CreateAdvertisersLineItemsResponse = LineItem;
export const CreateAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LineItem;

export type CreateAdvertisersLineItemsError = DefaultErrors;

/** Creates a new line item. Returns the newly created line item if successful. YouTube & Partners line items cannot be created or updated using the API. */
export const createAdvertisersLineItems: API.OperationMethod<
  CreateAdvertisersLineItemsRequest,
  CreateAdvertisersLineItemsResponse,
  CreateAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersLineItemsRequest,
  output: CreateAdvertisersLineItemsResponse,
  errors: [],
}));

export interface ListAdvertisersLineItemsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItems` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The ID of the advertiser to list line items for. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by line item fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `insertionOrderId` * `lineItemId` * `lineItemType` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All line items under an insertion order: `insertionOrderId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` and `LINE_ITEM_TYPE_DISPLAY_DEFAULT` line items under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND lineItemType="LINE_ITEM_TYPE_DISPLAY_DEFAULT"` * All line items with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All line items with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/lineItems" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersLineItemsRequest>;

export type ListAdvertisersLineItemsResponse = ListLineItemsResponse;
export const ListAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLineItemsResponse;

export type ListAdvertisersLineItemsError = DefaultErrors;

/** Lists line items in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, line items with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export const listAdvertisersLineItems: API.PaginatedOperationMethod<
  ListAdvertisersLineItemsRequest,
  ListAdvertisersLineItemsResponse,
  ListAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersLineItemsRequest,
  output: ListAdvertisersLineItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

export const PatchAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(LineItem).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersLineItemsRequest>;

export type PatchAdvertisersLineItemsResponse = LineItem;
export const PatchAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LineItem;

export type PatchAdvertisersLineItemsError = DefaultErrors;

/** Updates an existing line item. Returns the updated line item if successful. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * BulkEditAssignedTargetingOptions * BulkUpdateLineItems * assignedTargetingOptions.create * assignedTargetingOptions.delete YouTube & Partners line items cannot be created or updated using the API. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export const patchAdvertisersLineItems: API.OperationMethod<
  PatchAdvertisersLineItemsRequest,
  PatchAdvertisersLineItemsResponse,
  PatchAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersLineItemsRequest,
  output: PatchAdvertisersLineItemsResponse,
  errors: [],
}));

export interface BulkUpdateAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** Request body */
  body?: BulkUpdateLineItemsRequest;
}

export const BulkUpdateAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(BulkUpdateLineItemsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/lineItems:bulkUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkUpdateAdvertisersLineItemsRequest>;

export type BulkUpdateAdvertisersLineItemsResponse =
  BulkUpdateLineItemsResponse;
export const BulkUpdateAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkUpdateLineItemsResponse;

export type BulkUpdateAdvertisersLineItemsError = DefaultErrors;

/** Updates multiple line items. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * BulkEditAssignedTargetingOptions * UpdateLineItem * assignedTargetingOptions.create * assignedTargetingOptions.delete YouTube & Partners line items cannot be created or updated using the API. */
export const bulkUpdateAdvertisersLineItems: API.OperationMethod<
  BulkUpdateAdvertisersLineItemsRequest,
  BulkUpdateAdvertisersLineItemsResponse,
  BulkUpdateAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkUpdateAdvertisersLineItemsRequest,
  output: BulkUpdateAdvertisersLineItemsResponse,
  errors: [],
}));

export interface DuplicateAdvertisersLineItemsRequest {
  /** Required. The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item to duplicate. */
  lineItemId: string;
  /** Request body */
  body?: DuplicateLineItemRequest;
}

export const DuplicateAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    body: Schema.optional(DuplicateLineItemRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}:duplicate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DuplicateAdvertisersLineItemsRequest>;

export type DuplicateAdvertisersLineItemsResponse = DuplicateLineItemResponse;
export const DuplicateAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DuplicateLineItemResponse;

export type DuplicateAdvertisersLineItemsError = DefaultErrors;

/** Duplicates a line item. Returns the ID of the created line item if successful. YouTube & Partners line items cannot be created or updated using the API. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export const duplicateAdvertisersLineItems: API.OperationMethod<
  DuplicateAdvertisersLineItemsRequest,
  DuplicateAdvertisersLineItemsResponse,
  DuplicateAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DuplicateAdvertisersLineItemsRequest,
  output: DuplicateAdvertisersLineItemsResponse,
  errors: [],
}));

export interface DeleteAdvertisersLineItemsRequest {
  /** The ID of the advertiser this line item belongs to. */
  advertiserId: string;
  /** The ID of the line item to delete. */
  lineItemId: string;
}

export const DeleteAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersLineItemsRequest>;

export type DeleteAdvertisersLineItemsResponse = Empty;
export const DeleteAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersLineItemsError = DefaultErrors;

/** Deletes a line item. Returns error code `NOT_FOUND` if the line item does not exist. The line item should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it. YouTube & Partners line items cannot be created or updated using the API. */
export const deleteAdvertisersLineItems: API.OperationMethod<
  DeleteAdvertisersLineItemsRequest,
  DeleteAdvertisersLineItemsResponse,
  DeleteAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersLineItemsRequest,
  output: DeleteAdvertisersLineItemsResponse,
  errors: [],
}));

export interface GetAdvertisersLineItemsRequest {
  /** Required. The ID of the line item to fetch. */
  lineItemId: string;
  /** Required. The ID of the advertiser this line item belongs to. */
  advertiserId: string;
}

export const GetAdvertisersLineItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersLineItemsRequest>;

export type GetAdvertisersLineItemsResponse = LineItem;
export const GetAdvertisersLineItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LineItem;

export type GetAdvertisersLineItemsError = DefaultErrors;

/** Gets a line item. */
export const getAdvertisersLineItems: API.OperationMethod<
  GetAdvertisersLineItemsRequest,
  GetAdvertisersLineItemsResponse,
  GetAdvertisersLineItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersLineItemsRequest,
  output: GetAdvertisersLineItemsResponse,
  errors: [],
}));

export interface DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item the assigned targeting option belongs to. */
  lineItemId: string;
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
}

export const DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  Empty;
export const DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Deletes an assigned targeting option from a line item. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * lineItems.bulkEditAssignedTargetingOptions * lineItems.bulkUpdate * lineItems.patch * CreateLineItemAssignedTargetingOption YouTube & Partners line items cannot be created or updated using the API. */
export const deleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output:
    DeleteAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the line item the assigned targeting option belongs to. */
  lineItemId: string;
  /** Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_INVENTORY_MODE` * `TARGETING_TYPE_YOUTUBE_CHANNEL` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) * `TARGETING_TYPE_YOUTUBE_VIDEO` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
}

export const GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Gets a single targeting option assigned to a line item. */
export const getAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output: GetAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the line item to list assigned targeting options for. */
  lineItemId: string;
  /** Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` * `inheritance` Examples: * `AssignedTargetingOption` resources with ID 1 or 2: `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` * `AssignedTargetingOption` resources with inheritance status of `NOT_INHERITED` or `INHERITED_FROM_PARTNER`: `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_INVENTORY_MODE` * `TARGETING_TYPE_YOUTUBE_CHANNEL` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) * `TARGETING_TYPE_YOUTUBE_VIDEO` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItemAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  ListLineItemAssignedTargetingOptionsResponse;
export const ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLineItemAssignedTargetingOptionsResponse;

export type ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Lists the targeting options assigned to a line item. */
export const listAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.PaginatedOperationMethod<
  ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output:
    ListAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the advertiser the line item belongs to. */
  advertiserId: string;
  /** Required. The ID of the line item the assigned targeting option will belong to. */
  lineItemId: string;
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest>;

export type CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Assigns a targeting option to a line item. Returns the assigned targeting option if successful. Requests to this endpoint cannot be made concurrently with the following requests updating the same line item: * lineItems.bulkEditAssignedTargetingOptions * lineItems.bulkUpdate * lineItems.patch * DeleteLineItemAssignedTargetingOption YouTube & Partners line items cannot be created or updated using the API. */
export const createAdvertisersLineItemsTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsRequest,
  output:
    CreateAdvertisersLineItemsTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  "linkedEntity.adGroupId"?: string;
  /** The ID of a line item. */
  lineItemId: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** Required. The ID of the YouTube asset in the association. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: This should be the ID of the asset set linked, or 0 if the location_asset_filter or affiliate_location_asset_filter is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: This should be the ID of the sitelink asset linked. */
  youtubeAssetAssociationId: string;
}

export const DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    "linkedEntity.adGroupId": Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkedEntity.adGroupId"),
    ),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
    youtubeAssetAssociationId: Schema.String.pipe(
      T.HttpPath("youtubeAssetAssociationId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations/{youtubeAssetAssociationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  Empty;
export const DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError =
  DefaultErrors;

/** Deletes an existing association between the identified resource and a YouTube asset. *Warning:* This method is only available to an informed subset of users. */
export const deleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<
  DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output:
    DeleteAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

export interface CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** The ID of a line item. */
  lineItemId: string;
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  "linkedEntity.adGroupId"?: string;
  /** Required. The type of YouTube asset associated with the resource. */
  youtubeAssetType:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** Request body */
  body?: YoutubeAssetAssociation;
}

export const CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    "linkedEntity.adGroupId": Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkedEntity.adGroupId"),
    ),
    youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
    body: Schema.optional(YoutubeAssetAssociation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  YoutubeAssetAssociation;
export const CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ YoutubeAssetAssociation;

export type CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError =
  DefaultErrors;

/** Creates a new association between the identified resource and a YouTube asset. Returns the newly-created association. *Warning:* This method is only available to an informed subset of users. */
export const createAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociations: API.OperationMethod<
  CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output:
    CreateAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
}));

export interface ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest {
  /** Required. The type of YouTube asset being associated with the resource. */
  youtubeAssetType:
    | "YOUTUBE_ASSET_TYPE_UNSPECIFIED"
    | "YOUTUBE_ASSET_TYPE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION"
    | "YOUTUBE_ASSET_TYPE_SITELINK"
    | (string & {});
  /** Required. The ID of the advertiser that the linked entity belongs to. */
  advertiserId: string;
  /** The ID of an ad group. */
  "linkedEntity.adGroupId"?: string;
  /** Optional. Field by which to sort the list. The only acceptable values are: * `linkedYoutubeAsset.locationAssetFilter.assetSetId`, * `linkedYoutubeAsset.affiliateLocationAssetFilter.assetSetId`, * `linkedYoutubeAsset.sitelinkAsset.assetId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `linkedYoutubeAsset.sitelinkAsset.assetId desc`. */
  orderBy?: string;
  /** The ID of a line item. */
  lineItemId: string;
  /** Optional. Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListYoutubeAssetAssociations` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    youtubeAssetType: Schema.String.pipe(T.HttpPath("youtubeAssetType")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    "linkedEntity.adGroupId": Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkedEntity.adGroupId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    lineItemId: Schema.String.pipe(T.HttpPath("lineItemId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/lineItems/{lineItemsId}/youtubeAssetTypes/{youtubeAssetTypesId}/youtubeAssetAssociations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest>;

export type ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  ListYoutubeAssetAssociationsResponse;
export const ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListYoutubeAssetAssociationsResponse;

export type ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError =
  DefaultErrors;

/** Lists the YouTube asset associations linked to the given resource. */
export const listAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociations: API.PaginatedOperationMethod<
  ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsRequest,
  output:
    ListAdvertisersLineItemsYoutubeAssetTypesYoutubeAssetAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersLocationListsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Request body */
  body?: LocationList;
}

export const CreateAdvertisersLocationListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(LocationList).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/locationLists",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersLocationListsRequest>;

export type CreateAdvertisersLocationListsResponse = LocationList;
export const CreateAdvertisersLocationListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LocationList;

export type CreateAdvertisersLocationListsError = DefaultErrors;

/** Creates a new location list. Returns the newly created location list if successful. */
export const createAdvertisersLocationLists: API.OperationMethod<
  CreateAdvertisersLocationListsRequest,
  CreateAdvertisersLocationListsResponse,
  CreateAdvertisersLocationListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersLocationListsRequest,
  output: CreateAdvertisersLocationListsResponse,
  errors: [],
}));

export interface GetAdvertisersLocationListsRequest {
  /** Required. The ID of the location list to fetch. */
  locationListId: string;
  /** Required. The ID of the DV360 advertiser to which the fetched location list belongs. */
  advertiserId: string;
}

export const GetAdvertisersLocationListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/locationLists/{locationListsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersLocationListsRequest>;

export type GetAdvertisersLocationListsResponse = LocationList;
export const GetAdvertisersLocationListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LocationList;

export type GetAdvertisersLocationListsError = DefaultErrors;

/** Gets a location list. */
export const getAdvertisersLocationLists: API.OperationMethod<
  GetAdvertisersLocationListsRequest,
  GetAdvertisersLocationListsResponse,
  GetAdvertisersLocationListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersLocationListsRequest,
  output: GetAdvertisersLocationListsResponse,
  errors: [],
}));

export interface ListAdvertisersLocationListsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLocationLists` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Requested page size. Must be between `1` and `200`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. The ID of the DV360 advertiser to which the fetched location lists belong. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `locationListId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by location list fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `locationType` Examples: * All regional location list: `locationType="TARGETING_LOCATION_TYPE_REGIONAL"` * All proximity location list: `locationType="TARGETING_LOCATION_TYPE_PROXIMITY"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListAdvertisersLocationListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/locationLists",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersLocationListsRequest>;

export type ListAdvertisersLocationListsResponse = ListLocationListsResponse;
export const ListAdvertisersLocationListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationListsResponse;

export type ListAdvertisersLocationListsError = DefaultErrors;

/** Lists location lists based on a given advertiser id. */
export const listAdvertisersLocationLists: API.PaginatedOperationMethod<
  ListAdvertisersLocationListsRequest,
  ListAdvertisersLocationListsResponse,
  ListAdvertisersLocationListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersLocationListsRequest,
  output: ListAdvertisersLocationListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

export const PatchAdvertisersLocationListsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(LocationList).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/locationLists/{locationListId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersLocationListsRequest>;

export type PatchAdvertisersLocationListsResponse = LocationList;
export const PatchAdvertisersLocationListsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LocationList;

export type PatchAdvertisersLocationListsError = DefaultErrors;

/** Updates a location list. Returns the updated location list if successful. */
export const patchAdvertisersLocationLists: API.OperationMethod<
  PatchAdvertisersLocationListsRequest,
  PatchAdvertisersLocationListsResponse,
  PatchAdvertisersLocationListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersLocationListsRequest,
  output: PatchAdvertisersLocationListsResponse,
  errors: [],
}));

export interface ListAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedLocationId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `assignedLocationId desc`. */
  orderBy?: string;
  /** Allows filtering by location list assignment fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedLocationId` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAssignedLocations` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The ID of the location list to which these assignments are assigned. */
  locationListId: string;
}

export const ListAdvertisersLocationListsAssignedLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersLocationListsAssignedLocationsRequest>;

export type ListAdvertisersLocationListsAssignedLocationsResponse =
  ListAssignedLocationsResponse;
export const ListAdvertisersLocationListsAssignedLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAssignedLocationsResponse;

export type ListAdvertisersLocationListsAssignedLocationsError = DefaultErrors;

/** Lists locations assigned to a location list. */
export const listAdvertisersLocationListsAssignedLocations: API.PaginatedOperationMethod<
  ListAdvertisersLocationListsAssignedLocationsRequest,
  ListAdvertisersLocationListsAssignedLocationsResponse,
  ListAdvertisersLocationListsAssignedLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersLocationListsAssignedLocationsRequest,
  output: ListAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BulkEditAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list to which these assignments are assigned. */
  locationListId: string;
  /** Request body */
  body?: BulkEditAssignedLocationsRequest;
}

export const BulkEditAdvertisersLocationListsAssignedLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
    body: Schema.optional(BulkEditAssignedLocationsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/locationLists/{locationListsId}/assignedLocations:bulkEdit",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditAdvertisersLocationListsAssignedLocationsRequest>;

export type BulkEditAdvertisersLocationListsAssignedLocationsResponse =
  BulkEditAssignedLocationsResponse;
export const BulkEditAdvertisersLocationListsAssignedLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditAssignedLocationsResponse;

export type BulkEditAdvertisersLocationListsAssignedLocationsError =
  DefaultErrors;

/** Bulk edits multiple assignments between locations and a single location list. The operation will delete the assigned locations provided in deletedAssignedLocations and then create the assigned locations provided in createdAssignedLocations. */
export const bulkEditAdvertisersLocationListsAssignedLocations: API.OperationMethod<
  BulkEditAdvertisersLocationListsAssignedLocationsRequest,
  BulkEditAdvertisersLocationListsAssignedLocationsResponse,
  BulkEditAdvertisersLocationListsAssignedLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditAdvertisersLocationListsAssignedLocationsRequest,
  output: BulkEditAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
}));

export interface CreateAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the location list for which the assignment will be created. */
  locationListId: string;
  /** Request body */
  body?: AssignedLocation;
}

export const CreateAdvertisersLocationListsAssignedLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
    body: Schema.optional(AssignedLocation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersLocationListsAssignedLocationsRequest>;

export type CreateAdvertisersLocationListsAssignedLocationsResponse =
  AssignedLocation;
export const CreateAdvertisersLocationListsAssignedLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedLocation;

export type CreateAdvertisersLocationListsAssignedLocationsError =
  DefaultErrors;

/** Creates an assignment between a location and a location list. */
export const createAdvertisersLocationListsAssignedLocations: API.OperationMethod<
  CreateAdvertisersLocationListsAssignedLocationsRequest,
  CreateAdvertisersLocationListsAssignedLocationsResponse,
  CreateAdvertisersLocationListsAssignedLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersLocationListsAssignedLocationsRequest,
  output: CreateAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
}));

export interface DeleteAdvertisersLocationListsAssignedLocationsRequest {
  /** Required. The ID of the location list to which this assignment is assigned. */
  locationListId: string;
  /** Required. The ID of the DV360 advertiser to which the location list belongs. */
  advertiserId: string;
  /** Required. The ID of the assigned location to delete. */
  assignedLocationId: string;
}

export const DeleteAdvertisersLocationListsAssignedLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationListId: Schema.String.pipe(T.HttpPath("locationListId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    assignedLocationId: Schema.String.pipe(T.HttpPath("assignedLocationId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations/{assignedLocationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersLocationListsAssignedLocationsRequest>;

export type DeleteAdvertisersLocationListsAssignedLocationsResponse = Empty;
export const DeleteAdvertisersLocationListsAssignedLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersLocationListsAssignedLocationsError =
  DefaultErrors;

/** Deletes the assignment between a location and a location list. */
export const deleteAdvertisersLocationListsAssignedLocations: API.OperationMethod<
  DeleteAdvertisersLocationListsAssignedLocationsRequest,
  DeleteAdvertisersLocationListsAssignedLocationsResponse,
  DeleteAdvertisersLocationListsAssignedLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersLocationListsAssignedLocationsRequest,
  output: DeleteAdvertisersLocationListsAssignedLocationsResponse,
  errors: [],
}));

export interface CreateAdvertisersInsertionOrdersRequest {
  /** Output only. The unique ID of the advertiser the insertion order belongs to. */
  advertiserId: string;
  /** Request body */
  body?: InsertionOrder;
}

export const CreateAdvertisersInsertionOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(InsertionOrder).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/insertionOrders",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersInsertionOrdersRequest>;

export type CreateAdvertisersInsertionOrdersResponse = InsertionOrder;
export const CreateAdvertisersInsertionOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ InsertionOrder;

export type CreateAdvertisersInsertionOrdersError = DefaultErrors;

/** Creates a new insertion order. Returns the newly created insertion order if successful. */
export const createAdvertisersInsertionOrders: API.OperationMethod<
  CreateAdvertisersInsertionOrdersRequest,
  CreateAdvertisersInsertionOrdersResponse,
  CreateAdvertisersInsertionOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersInsertionOrdersRequest,
  output: CreateAdvertisersInsertionOrdersResponse,
  errors: [],
}));

export interface GetAdvertisersInsertionOrdersRequest {
  /** Required. The ID of the advertiser this insertion order belongs to. */
  advertiserId: string;
  /** Required. The ID of the insertion order to fetch. */
  insertionOrderId: string;
}

export const GetAdvertisersInsertionOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    insertionOrderId: Schema.String.pipe(T.HttpPath("insertionOrderId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/insertionOrders/{insertionOrdersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersInsertionOrdersRequest>;

export type GetAdvertisersInsertionOrdersResponse = InsertionOrder;
export const GetAdvertisersInsertionOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ InsertionOrder;

export type GetAdvertisersInsertionOrdersError = DefaultErrors;

/** Gets an insertion order. Returns error code `NOT_FOUND` if the insertion order does not exist. */
export const getAdvertisersInsertionOrders: API.OperationMethod<
  GetAdvertisersInsertionOrdersRequest,
  GetAdvertisersInsertionOrdersResponse,
  GetAdvertisersInsertionOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersInsertionOrdersRequest,
  output: GetAdvertisersInsertionOrdersResponse,
  errors: [],
}));

export interface ListAdvertisersInsertionOrdersRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInsertionOrders` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The ID of the advertiser to list insertion orders for. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * "displayName" (default) * "entityStatus" * "updateTime" The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by insertion order fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All insertion orders under a campaign: `campaignId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` insertion orders under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")` * All insertion orders with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All insertion orders with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListAdvertisersInsertionOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/insertionOrders",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersInsertionOrdersRequest>;

export type ListAdvertisersInsertionOrdersResponse =
  ListInsertionOrdersResponse;
export const ListAdvertisersInsertionOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListInsertionOrdersResponse;

export type ListAdvertisersInsertionOrdersError = DefaultErrors;

/** Lists insertion orders in an advertiser. The order is defined by the order_by parameter. If a filter by entity_status is not specified, insertion orders with `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export const listAdvertisersInsertionOrders: API.PaginatedOperationMethod<
  ListAdvertisersInsertionOrdersRequest,
  ListAdvertisersInsertionOrdersResponse,
  ListAdvertisersInsertionOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersInsertionOrdersRequest,
  output: ListAdvertisersInsertionOrdersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAdvertisersInsertionOrdersRequest {
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Output only. The unique ID of the advertiser the insertion order belongs to. */
  advertiserId: string;
  /** Output only. The unique ID of the insertion order. Assigned by the system. */
  insertionOrderId: string;
  /** Request body */
  body?: InsertionOrder;
}

export const PatchAdvertisersInsertionOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    insertionOrderId: Schema.String.pipe(T.HttpPath("insertionOrderId")),
    body: Schema.optional(InsertionOrder).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/advertisers/{advertisersId}/insertionOrders/{insertionOrdersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAdvertisersInsertionOrdersRequest>;

export type PatchAdvertisersInsertionOrdersResponse = InsertionOrder;
export const PatchAdvertisersInsertionOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ InsertionOrder;

export type PatchAdvertisersInsertionOrdersError = DefaultErrors;

/** Updates an existing insertion order. Returns the updated insertion order if successful. */
export const patchAdvertisersInsertionOrders: API.OperationMethod<
  PatchAdvertisersInsertionOrdersRequest,
  PatchAdvertisersInsertionOrdersResponse,
  PatchAdvertisersInsertionOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAdvertisersInsertionOrdersRequest,
  output: PatchAdvertisersInsertionOrdersResponse,
  errors: [],
}));

export interface DeleteAdvertisersInsertionOrdersRequest {
  /** The ID of the advertiser this insertion order belongs to. */
  advertiserId: string;
  /** The ID of the insertion order to delete. */
  insertionOrderId: string;
}

export const DeleteAdvertisersInsertionOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    insertionOrderId: Schema.String.pipe(T.HttpPath("insertionOrderId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/insertionOrders/{insertionOrdersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersInsertionOrdersRequest>;

export type DeleteAdvertisersInsertionOrdersResponse = Empty;
export const DeleteAdvertisersInsertionOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersInsertionOrdersError = DefaultErrors;

/** Deletes an insertion order. Returns error code `NOT_FOUND` if the insertion order does not exist. The insertion order should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it. */
export const deleteAdvertisersInsertionOrders: API.OperationMethod<
  DeleteAdvertisersInsertionOrdersRequest,
  DeleteAdvertisersInsertionOrdersResponse,
  DeleteAdvertisersInsertionOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersInsertionOrdersRequest,
  output: DeleteAdvertisersInsertionOrdersResponse,
  errors: [],
}));

export interface GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. An identifier unique to the targeting type in this advertiser that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_YOUTUBE_VIDEO` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_CONTENT_THEME_EXCLUSION` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
}

export const GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type GetAdvertisersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Gets a single targeting option assigned to an advertiser. */
export const getAdvertisersTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  GetAdvertisersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: GetAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` with ID 123456: `assignedTargetingOptionId="123456"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_YOUTUBE_VIDEO` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_CONTENT_THEME_EXCLUSION` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdvertiserAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  ListAdvertiserAssignedTargetingOptionsResponse;
export const ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAdvertiserAssignedTargetingOptionsResponse;

export type ListAdvertisersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Lists the targeting options assigned to an advertiser. */
export const listAdvertisersTargetingTypesAssignedTargetingOptions: API.PaginatedOperationMethod<
  ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  ListAdvertisersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: ListAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type CreateAdvertisersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Assigns a targeting option to an advertiser. Returns the assigned targeting option if successful. */
export const createAdvertisersTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  CreateAdvertisersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: CreateAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
  /** Required. The ID of the advertiser. */
  advertiserId: string;
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_INVENTORY_MODE` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
}

export const DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/advertisers/{advertisersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest>;

export type DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  Empty;
export const DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAdvertisersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Deletes an assigned targeting option from an advertiser. */
export const deleteAdvertisersTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  DeleteAdvertisersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAdvertisersTargetingTypesAssignedTargetingOptionsRequest,
  output: DeleteAdvertisersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface CreateAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser this ad asset belongs to. */
  advertiserId: string;
  /** Request body */
  body?: CreateAdAssetRequest;
}

export const CreateAdvertisersAdAssetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(CreateAdAssetRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adAssets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAdvertisersAdAssetsRequest>;

export type CreateAdvertisersAdAssetsResponse = AdAsset;
export const CreateAdvertisersAdAssetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdAsset;

export type CreateAdvertisersAdAssetsError = DefaultErrors;

/** Creates an ad asset. Returns the newly-created ad asset if successful. Only supports the creation of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export const createAdvertisersAdAssets: API.OperationMethod<
  CreateAdvertisersAdAssetsRequest,
  CreateAdvertisersAdAssetsResponse,
  CreateAdvertisersAdAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAdvertisersAdAssetsRequest,
  output: CreateAdvertisersAdAssetsResponse,
  errors: [],
}));

export interface GetAdvertisersAdAssetsRequest {
  /** Required. The ID of the ad asset to fetch. Only supports assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO` */
  adAssetId: string;
  /** Required. The ID of the advertiser this ad asset belongs to. */
  advertiserId: string;
}

export const GetAdvertisersAdAssetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    adAssetId: Schema.String.pipe(T.HttpPath("adAssetId")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/adAssets/{adAssetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAdvertisersAdAssetsRequest>;

export type GetAdvertisersAdAssetsResponse = AdAsset;
export const GetAdvertisersAdAssetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AdAsset;

export type GetAdvertisersAdAssetsError = DefaultErrors;

/** Gets an ad asset. Only supports the retrieval of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export const getAdvertisersAdAssets: API.OperationMethod<
  GetAdvertisersAdAssetsRequest,
  GetAdvertisersAdAssetsResponse,
  GetAdvertisersAdAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdvertisersAdAssetsRequest,
  output: GetAdvertisersAdAssetsResponse,
  errors: [],
}));

export interface ListAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser the ad assets belong to. */
  advertiserId: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `entityStatus` * `youtubeVideoAsset.youtubeVideoId` * `adAssetId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `adAssetId desc`. */
  orderBy?: string;
  /** Optional. Allows filtering of the results by ad asset fields. Supported syntax: * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `youtubeVideoAsset.youtubeVideoId` * `entityStatus` Examples: * All active YouTube video ad assets under an advertiser: `entityStatus=ENTITY_STATUS_ACTIVE` */
  filter?: string;
  /** Optional. Requested page size. Must be between `1` and `5000`. If unspecified will default to `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdAssets` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListAdvertisersAdAssetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/adAssets" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersAdAssetsRequest>;

export type ListAdvertisersAdAssetsResponse = ListAdAssetsResponse;
export const ListAdvertisersAdAssetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAdAssetsResponse;

export type ListAdvertisersAdAssetsError = DefaultErrors;

/** Lists ad assets under an advertiser ID. Only supports the retrieval of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export const listAdvertisersAdAssets: API.PaginatedOperationMethod<
  ListAdvertisersAdAssetsRequest,
  ListAdvertisersAdAssetsResponse,
  ListAdvertisersAdAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersAdAssetsRequest,
  output: ListAdvertisersAdAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UploadAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser this ad asset belongs to. */
  advertiserId: string;
  /** Request body */
  body?: UploadAdAssetRequest;
}

export const UploadAdvertisersAdAssetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(UploadAdAssetRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adAssets:uploadAdAsset",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UploadAdvertisersAdAssetsRequest>;

export type UploadAdvertisersAdAssetsResponse = UploadAdAssetResponse;
export const UploadAdvertisersAdAssetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UploadAdAssetResponse;

export type UploadAdvertisersAdAssetsError = DefaultErrors;

/** Uploads and creates an ad asset. Returns the ID of the newly-created ad asset if successful. Only supports the uploading of assets with the AdAssetType `AD_ASSET_TYPE_IMAGE`. */
export const uploadAdvertisersAdAssets: API.OperationMethod<
  UploadAdvertisersAdAssetsRequest,
  UploadAdvertisersAdAssetsResponse,
  UploadAdvertisersAdAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadAdvertisersAdAssetsRequest,
  output: UploadAdvertisersAdAssetsResponse,
  errors: [],
}));

export interface BulkCreateAdvertisersAdAssetsRequest {
  /** Required. The ID of the advertiser these ad assets belong to. */
  advertiserId: string;
  /** Request body */
  body?: BulkCreateAdAssetsRequest;
}

export const BulkCreateAdvertisersAdAssetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    body: Schema.optional(BulkCreateAdAssetsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/advertisers/{advertisersId}/adAssets:bulkCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkCreateAdvertisersAdAssetsRequest>;

export type BulkCreateAdvertisersAdAssetsResponse = BulkCreateAdAssetsResponse;
export const BulkCreateAdvertisersAdAssetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkCreateAdAssetsResponse;

export type BulkCreateAdvertisersAdAssetsError = DefaultErrors;

/** Creates multiple ad assets in a single request. Returns the newly-created ad assets if successful. Only supports the creation of assets of AdAssetType `AD_ASSET_TYPE_YOUTUBE_VIDEO`. */
export const bulkCreateAdvertisersAdAssets: API.OperationMethod<
  BulkCreateAdvertisersAdAssetsRequest,
  BulkCreateAdvertisersAdAssetsResponse,
  BulkCreateAdvertisersAdAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkCreateAdvertisersAdAssetsRequest,
  output: BulkCreateAdvertisersAdAssetsResponse,
  errors: [],
}));

export interface ListAdvertisersInvoicesRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInvoices` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The month to list the invoices for. If not set, the request will retrieve invoices for the previous month. Must be in the format YYYYMM. */
  issueMonth?: string;
  /** Required. The ID of the advertiser to list invoices for. */
  advertiserId: string;
  /** Select type of invoice to retrieve for Loi Sapin advertisers. Only applicable to Loi Sapin advertisers. Will be ignored otherwise. */
  loiSapinInvoiceType?:
    | "LOI_SAPIN_INVOICE_TYPE_UNSPECIFIED"
    | "LOI_SAPIN_INVOICE_TYPE_MEDIA"
    | "LOI_SAPIN_INVOICE_TYPE_PLATFORM"
    | (string & {});
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListAdvertisersInvoicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    issueMonth: Schema.optional(Schema.String).pipe(T.HttpQuery("issueMonth")),
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    loiSapinInvoiceType: Schema.optional(Schema.String).pipe(
      T.HttpQuery("loiSapinInvoiceType"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/advertisers/{advertisersId}/invoices" }),
    svc,
  ) as unknown as Schema.Schema<ListAdvertisersInvoicesRequest>;

export type ListAdvertisersInvoicesResponse = ListInvoicesResponse;
export const ListAdvertisersInvoicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListInvoicesResponse;

export type ListAdvertisersInvoicesError = DefaultErrors;

/** Lists invoices posted for an advertiser in a given month. Invoices generated by billing profiles with a "Partner" invoice level are not retrievable through this method. */
export const listAdvertisersInvoices: API.PaginatedOperationMethod<
  ListAdvertisersInvoicesRequest,
  ListAdvertisersInvoicesResponse,
  ListAdvertisersInvoicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAdvertisersInvoicesRequest,
  output: ListAdvertisersInvoicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LookupInvoiceCurrencyAdvertisersInvoicesRequest {
  /** Required. The ID of the advertiser to lookup currency for. */
  advertiserId: string;
  /** Month for which the currency is needed. If not set, the request will return existing currency settings for the advertiser. Must be in the format YYYYMM. */
  invoiceMonth?: string;
}

export const LookupInvoiceCurrencyAdvertisersInvoicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
    invoiceMonth: Schema.optional(Schema.String).pipe(
      T.HttpQuery("invoiceMonth"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/advertisers/{advertisersId}/invoices:lookupInvoiceCurrency",
    }),
    svc,
  ) as unknown as Schema.Schema<LookupInvoiceCurrencyAdvertisersInvoicesRequest>;

export type LookupInvoiceCurrencyAdvertisersInvoicesResponse =
  LookupInvoiceCurrencyResponse;
export const LookupInvoiceCurrencyAdvertisersInvoicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ LookupInvoiceCurrencyResponse;

export type LookupInvoiceCurrencyAdvertisersInvoicesError = DefaultErrors;

/** Retrieves the invoice currency used by an advertiser in a given month. */
export const lookupInvoiceCurrencyAdvertisersInvoices: API.OperationMethod<
  LookupInvoiceCurrencyAdvertisersInvoicesRequest,
  LookupInvoiceCurrencyAdvertisersInvoicesResponse,
  LookupInvoiceCurrencyAdvertisersInvoicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LookupInvoiceCurrencyAdvertisersInvoicesRequest,
  output: LookupInvoiceCurrencyAdvertisersInvoicesResponse,
  errors: [],
}));

export interface GetCombinedAudiencesRequest {
  /** Required. The ID of the combined audience to fetch. */
  combinedAudienceId: string;
  /** The ID of the partner that has access to the fetched combined audience. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the fetched combined audience. */
  advertiserId?: string;
}

export const GetCombinedAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    combinedAudienceId: Schema.String.pipe(T.HttpPath("combinedAudienceId")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/combinedAudiences/{combinedAudiencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCombinedAudiencesRequest>;

export type GetCombinedAudiencesResponse = CombinedAudience;
export const GetCombinedAudiencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CombinedAudience;

export type GetCombinedAudiencesError = DefaultErrors;

/** Gets a combined audience. */
export const getCombinedAudiences: API.OperationMethod<
  GetCombinedAudiencesRequest,
  GetCombinedAudiencesResponse,
  GetCombinedAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCombinedAudiencesRequest,
  output: GetCombinedAudiencesResponse,
  errors: [],
}));

export interface ListCombinedAudiencesRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCombinedAudiences` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the partner that has access to the fetched combined audiences. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the advertiser that has access to the fetched combined audiences. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `combinedAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by combined audience fields. Supported syntax: * Filter expressions for combined audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All combined audiences for which the display name contains "Google": `displayName : "Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListCombinedAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/combinedAudiences" }),
    svc,
  ) as unknown as Schema.Schema<ListCombinedAudiencesRequest>;

export type ListCombinedAudiencesResponse_Op = ListCombinedAudiencesResponse;
export const ListCombinedAudiencesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCombinedAudiencesResponse;

export type ListCombinedAudiencesError = DefaultErrors;

/** Lists combined audiences. The order is defined by the order_by parameter. */
export const listCombinedAudiences: API.PaginatedOperationMethod<
  ListCombinedAudiencesRequest,
  ListCombinedAudiencesResponse_Op,
  ListCombinedAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCombinedAudiencesRequest,
  output: ListCombinedAudiencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateGuaranteedOrdersRequest {
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** Request body */
  body?: GuaranteedOrder;
}

export const CreateGuaranteedOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(GuaranteedOrder).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v4/guaranteedOrders", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateGuaranteedOrdersRequest>;

export type CreateGuaranteedOrdersResponse = GuaranteedOrder;
export const CreateGuaranteedOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ GuaranteedOrder;

export type CreateGuaranteedOrdersError = DefaultErrors;

/** Creates a new guaranteed order. Returns the newly created guaranteed order if successful. */
export const createGuaranteedOrders: API.OperationMethod<
  CreateGuaranteedOrdersRequest,
  CreateGuaranteedOrdersResponse,
  CreateGuaranteedOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGuaranteedOrdersRequest,
  output: CreateGuaranteedOrdersResponse,
  errors: [],
}));

export interface EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest {
  /** Required. The ID of the guaranteed order to edit. The ID is of the format `{exchange}-{legacy_guaranteed_order_id}` */
  guaranteedOrderId: string;
  /** Request body */
  body?: EditGuaranteedOrderReadAccessorsRequest;
}

export const EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    guaranteedOrderId: Schema.String.pipe(T.HttpPath("guaranteedOrderId")),
    body: Schema.optional(EditGuaranteedOrderReadAccessorsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/guaranteedOrders/{guaranteedOrdersId}:editGuaranteedOrderReadAccessors",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest>;

export type EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse =
  EditGuaranteedOrderReadAccessorsResponse;
export const EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ EditGuaranteedOrderReadAccessorsResponse;

export type EditGuaranteedOrderReadAccessorsGuaranteedOrdersError =
  DefaultErrors;

/** Edits read advertisers of a guaranteed order. */
export const editGuaranteedOrderReadAccessorsGuaranteedOrders: API.OperationMethod<
  EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest,
  EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse,
  EditGuaranteedOrderReadAccessorsGuaranteedOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EditGuaranteedOrderReadAccessorsGuaranteedOrdersRequest,
  output: EditGuaranteedOrderReadAccessorsGuaranteedOrdersResponse,
  errors: [],
}));

export interface GetGuaranteedOrdersRequest {
  /** The ID of the partner that has access to the guaranteed order. */
  partnerId?: string;
  /** The ID of the advertiser that has access to the guaranteed order. */
  advertiserId?: string;
  /** Required. The ID of the guaranteed order to fetch. The ID is of the format `{exchange}-{legacy_guaranteed_order_id}` */
  guaranteedOrderId: string;
}

export const GetGuaranteedOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    guaranteedOrderId: Schema.String.pipe(T.HttpPath("guaranteedOrderId")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/guaranteedOrders/{guaranteedOrdersId}" }),
    svc,
  ) as unknown as Schema.Schema<GetGuaranteedOrdersRequest>;

export type GetGuaranteedOrdersResponse = GuaranteedOrder;
export const GetGuaranteedOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ GuaranteedOrder;

export type GetGuaranteedOrdersError = DefaultErrors;

/** Gets a guaranteed order. */
export const getGuaranteedOrders: API.OperationMethod<
  GetGuaranteedOrdersRequest,
  GetGuaranteedOrdersResponse,
  GetGuaranteedOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGuaranteedOrdersRequest,
  output: GetGuaranteedOrdersResponse,
  errors: [],
}));

export interface ListGuaranteedOrdersRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListGuaranteedOrders` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the advertiser that has access to the guaranteed order. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by guaranteed order fields. * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `guaranteed_order_id` * `exchange` * `display_name` * `status.entityStatus` Examples: * All active guaranteed orders: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Guaranteed orders belonging to Google Ad Manager or Rubicon exchanges: `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** The ID of the partner that has access to the guaranteed order. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
}

export const ListGuaranteedOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/guaranteedOrders" }),
    svc,
  ) as unknown as Schema.Schema<ListGuaranteedOrdersRequest>;

export type ListGuaranteedOrdersResponse_Op = ListGuaranteedOrdersResponse;
export const ListGuaranteedOrdersResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListGuaranteedOrdersResponse;

export type ListGuaranteedOrdersError = DefaultErrors;

/** Lists guaranteed orders that are accessible to the current user. The order is defined by the order_by parameter. If a filter by entity_status is not specified, guaranteed orders with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export const listGuaranteedOrders: API.PaginatedOperationMethod<
  ListGuaranteedOrdersRequest,
  ListGuaranteedOrdersResponse_Op,
  ListGuaranteedOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGuaranteedOrdersRequest,
  output: ListGuaranteedOrdersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchGuaranteedOrdersRequest {
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** Output only. The unique identifier of the guaranteed order. The guaranteed order IDs have the format `{exchange}-{legacy_guaranteed_order_id}`. */
  guaranteedOrderId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GuaranteedOrder;
}

export const PatchGuaranteedOrdersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    guaranteedOrderId: Schema.String.pipe(T.HttpPath("guaranteedOrderId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GuaranteedOrder).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/guaranteedOrders/{guaranteedOrdersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchGuaranteedOrdersRequest>;

export type PatchGuaranteedOrdersResponse = GuaranteedOrder;
export const PatchGuaranteedOrdersResponse =
  /*@__PURE__*/ /*#__PURE__*/ GuaranteedOrder;

export type PatchGuaranteedOrdersError = DefaultErrors;

/** Updates an existing guaranteed order. Returns the updated guaranteed order if successful. */
export const patchGuaranteedOrders: API.OperationMethod<
  PatchGuaranteedOrdersRequest,
  PatchGuaranteedOrdersResponse,
  PatchGuaranteedOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchGuaranteedOrdersRequest,
  output: PatchGuaranteedOrdersResponse,
  errors: [],
}));

export interface DeleteInventorySourceGroupsRequest {
  /** The ID of the advertiser that owns the inventory source group. The parent partner does not have access to this group. */
  advertiserId?: string;
  /** Required. The ID of the inventory source group to delete. */
  inventorySourceGroupId: string;
  /** The ID of the partner that owns the inventory source group. Only this partner has write access to this group. */
  partnerId?: string;
}

export const DeleteInventorySourceGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/inventorySourceGroups/{inventorySourceGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteInventorySourceGroupsRequest>;

export type DeleteInventorySourceGroupsResponse = Empty;
export const DeleteInventorySourceGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteInventorySourceGroupsError = DefaultErrors;

/** Deletes an inventory source group. */
export const deleteInventorySourceGroups: API.OperationMethod<
  DeleteInventorySourceGroupsRequest,
  DeleteInventorySourceGroupsResponse,
  DeleteInventorySourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInventorySourceGroupsRequest,
  output: DeleteInventorySourceGroupsResponse,
  errors: [],
}));

export interface GetInventorySourceGroupsRequest {
  /** The ID of the advertiser that has access to the inventory source group. If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group. */
  advertiserId?: string;
  /** Required. The ID of the inventory source group to fetch. */
  inventorySourceGroupId: string;
  /** The ID of the partner that has access to the inventory source group. A partner cannot access an advertiser-owned inventory source group. */
  partnerId?: string;
}

export const GetInventorySourceGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/inventorySourceGroups/{inventorySourceGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetInventorySourceGroupsRequest>;

export type GetInventorySourceGroupsResponse = InventorySourceGroup;
export const GetInventorySourceGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySourceGroup;

export type GetInventorySourceGroupsError = DefaultErrors;

/** Gets an inventory source group. */
export const getInventorySourceGroups: API.OperationMethod<
  GetInventorySourceGroupsRequest,
  GetInventorySourceGroupsResponse,
  GetInventorySourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInventorySourceGroupsRequest,
  output: GetInventorySourceGroupsResponse,
  errors: [],
}));

export interface ListInventorySourceGroupsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the partner that has access to the inventory source group. A partner cannot access advertiser-owned inventory source groups. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** The ID of the advertiser that has access to the inventory source group. If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `inventorySourceGroupId` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by inventory source group fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `inventorySourceGroupId` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListInventorySourceGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/inventorySourceGroups" }),
    svc,
  ) as unknown as Schema.Schema<ListInventorySourceGroupsRequest>;

export type ListInventorySourceGroupsResponse_Op =
  ListInventorySourceGroupsResponse;
export const ListInventorySourceGroupsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListInventorySourceGroupsResponse;

export type ListInventorySourceGroupsError = DefaultErrors;

/** Lists inventory source groups that are accessible to the current user. The order is defined by the order_by parameter. */
export const listInventorySourceGroups: API.PaginatedOperationMethod<
  ListInventorySourceGroupsRequest,
  ListInventorySourceGroupsResponse_Op,
  ListInventorySourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInventorySourceGroupsRequest,
  output: ListInventorySourceGroupsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchInventorySourceGroupsRequest {
  /** The ID of the advertiser that owns the inventory source group. The parent partner does not have access to this group. */
  advertiserId?: string;
  /** Output only. The unique ID of the inventory source group. Assigned by the system. */
  inventorySourceGroupId: string;
  /** The ID of the partner that owns the inventory source group. Only this partner has write access to this group. */
  partnerId?: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Request body */
  body?: InventorySourceGroup;
}

export const PatchInventorySourceGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(InventorySourceGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/inventorySourceGroups/{inventorySourceGroupId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchInventorySourceGroupsRequest>;

export type PatchInventorySourceGroupsResponse = InventorySourceGroup;
export const PatchInventorySourceGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySourceGroup;

export type PatchInventorySourceGroupsError = DefaultErrors;

/** Updates an inventory source group. Returns the updated inventory source group if successful. */
export const patchInventorySourceGroups: API.OperationMethod<
  PatchInventorySourceGroupsRequest,
  PatchInventorySourceGroupsResponse,
  PatchInventorySourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchInventorySourceGroupsRequest,
  output: PatchInventorySourceGroupsResponse,
  errors: [],
}));

export interface CreateInventorySourceGroupsRequest {
  /** The ID of the partner that owns the inventory source group. Only this partner will have write access to this group. Only advertisers to which this group is explicitly shared will have read access to this group. */
  partnerId?: string;
  /** The ID of the advertiser that owns the inventory source group. The parent partner will not have access to this group. */
  advertiserId?: string;
  /** Request body */
  body?: InventorySourceGroup;
}

export const CreateInventorySourceGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(InventorySourceGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v4/inventorySourceGroups", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateInventorySourceGroupsRequest>;

export type CreateInventorySourceGroupsResponse = InventorySourceGroup;
export const CreateInventorySourceGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySourceGroup;

export type CreateInventorySourceGroupsError = DefaultErrors;

/** Creates a new inventory source group. Returns the newly created inventory source group if successful. */
export const createInventorySourceGroups: API.OperationMethod<
  CreateInventorySourceGroupsRequest,
  CreateInventorySourceGroupsResponse,
  CreateInventorySourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInventorySourceGroupsRequest,
  output: CreateInventorySourceGroupsResponse,
  errors: [],
}));

export interface DeleteInventorySourceGroupsAssignedInventorySourcesRequest {
  /** Required. The ID of the assigned inventory source to delete. */
  assignedInventorySourceId: string;
  /** Required. The ID of the inventory source group to which this assignment is assigned. */
  inventorySourceGroupId: string;
  /** The ID of the partner that owns the parent inventory source group. Only this partner has write access to this assigned inventory source. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent inventory source group. The parent partner does not have access to this assigned inventory source. */
  advertiserId?: string;
}

export const DeleteInventorySourceGroupsAssignedInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assignedInventorySourceId: Schema.String.pipe(
      T.HttpPath("assignedInventorySourceId"),
    ),
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources/{assignedInventorySourcesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteInventorySourceGroupsAssignedInventorySourcesRequest>;

export type DeleteInventorySourceGroupsAssignedInventorySourcesResponse = Empty;
export const DeleteInventorySourceGroupsAssignedInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteInventorySourceGroupsAssignedInventorySourcesError =
  DefaultErrors;

/** Deletes the assignment between an inventory source and an inventory source group. */
export const deleteInventorySourceGroupsAssignedInventorySources: API.OperationMethod<
  DeleteInventorySourceGroupsAssignedInventorySourcesRequest,
  DeleteInventorySourceGroupsAssignedInventorySourcesResponse,
  DeleteInventorySourceGroupsAssignedInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInventorySourceGroupsAssignedInventorySourcesRequest,
  output: DeleteInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
}));

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

export const CreateInventorySourceGroupsAssignedInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(AssignedInventorySource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateInventorySourceGroupsAssignedInventorySourcesRequest>;

export type CreateInventorySourceGroupsAssignedInventorySourcesResponse =
  AssignedInventorySource;
export const CreateInventorySourceGroupsAssignedInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedInventorySource;

export type CreateInventorySourceGroupsAssignedInventorySourcesError =
  DefaultErrors;

/** Creates an assignment between an inventory source and an inventory source group. */
export const createInventorySourceGroupsAssignedInventorySources: API.OperationMethod<
  CreateInventorySourceGroupsAssignedInventorySourcesRequest,
  CreateInventorySourceGroupsAssignedInventorySourcesResponse,
  CreateInventorySourceGroupsAssignedInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInventorySourceGroupsAssignedInventorySourcesRequest,
  output: CreateInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
}));

export interface ListInventorySourceGroupsAssignedInventorySourcesRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAssignedInventorySources` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Required. The ID of the inventory source group to which these assignments are assigned. */
  inventorySourceGroupId: string;
  /** The ID of the advertiser that has access to the assignment. If the parent inventory source group is partner-owned, only advertisers to which the parent group is explicitly shared can access the assigned inventory source. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `assignedInventorySourceId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `assignedInventorySourceId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned inventory source fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the `OR` logical operator. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedInventorySourceId` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** The ID of the partner that has access to the assignment. If the parent inventory source group is advertiser-owned, the assignment cannot be accessed via a partner. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
}

export const ListInventorySourceGroupsAssignedInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources",
    }),
    svc,
  ) as unknown as Schema.Schema<ListInventorySourceGroupsAssignedInventorySourcesRequest>;

export type ListInventorySourceGroupsAssignedInventorySourcesResponse =
  ListAssignedInventorySourcesResponse;
export const ListInventorySourceGroupsAssignedInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAssignedInventorySourcesResponse;

export type ListInventorySourceGroupsAssignedInventorySourcesError =
  DefaultErrors;

/** Lists inventory sources assigned to an inventory source group. */
export const listInventorySourceGroupsAssignedInventorySources: API.PaginatedOperationMethod<
  ListInventorySourceGroupsAssignedInventorySourcesRequest,
  ListInventorySourceGroupsAssignedInventorySourcesResponse,
  ListInventorySourceGroupsAssignedInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInventorySourceGroupsAssignedInventorySourcesRequest,
  output: ListInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BulkEditInventorySourceGroupsAssignedInventorySourcesRequest {
  /** Required. The ID of the inventory source group to which the assignments are assigned. */
  inventorySourceGroupId: string;
  /** Request body */
  body?: BulkEditAssignedInventorySourcesRequest;
}

export const BulkEditInventorySourceGroupsAssignedInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inventorySourceGroupId: Schema.String.pipe(
      T.HttpPath("inventorySourceGroupId"),
    ),
    body: Schema.optional(BulkEditAssignedInventorySourcesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/inventorySourceGroups/{inventorySourceGroupsId}/assignedInventorySources:bulkEdit",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditInventorySourceGroupsAssignedInventorySourcesRequest>;

export type BulkEditInventorySourceGroupsAssignedInventorySourcesResponse =
  BulkEditAssignedInventorySourcesResponse;
export const BulkEditInventorySourceGroupsAssignedInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditAssignedInventorySourcesResponse;

export type BulkEditInventorySourceGroupsAssignedInventorySourcesError =
  DefaultErrors;

/** Bulk edits multiple assignments between inventory sources and a single inventory source group. The operation will delete the assigned inventory sources provided in BulkEditAssignedInventorySourcesRequest.deleted_assigned_inventory_sources and then create the assigned inventory sources provided in BulkEditAssignedInventorySourcesRequest.created_assigned_inventory_sources. */
export const bulkEditInventorySourceGroupsAssignedInventorySources: API.OperationMethod<
  BulkEditInventorySourceGroupsAssignedInventorySourcesRequest,
  BulkEditInventorySourceGroupsAssignedInventorySourcesResponse,
  BulkEditInventorySourceGroupsAssignedInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditInventorySourceGroupsAssignedInventorySourcesRequest,
  output: BulkEditInventorySourceGroupsAssignedInventorySourcesResponse,
  errors: [],
}));

export interface GetGoogleAudiencesRequest {
  /** Required. The ID of the Google audience to fetch. */
  googleAudienceId: string;
  /** The ID of the advertiser that has access to the fetched Google audience. */
  advertiserId?: string;
  /** The ID of the partner that has access to the fetched Google audience. */
  partnerId?: string;
}

export const GetGoogleAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    googleAudienceId: Schema.String.pipe(T.HttpPath("googleAudienceId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/googleAudiences/{googleAudiencesId}" }),
    svc,
  ) as unknown as Schema.Schema<GetGoogleAudiencesRequest>;

export type GetGoogleAudiencesResponse = GoogleAudience;
export const GetGoogleAudiencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAudience;

export type GetGoogleAudiencesError = DefaultErrors;

/** Gets a Google audience. */
export const getGoogleAudiences: API.OperationMethod<
  GetGoogleAudiencesRequest,
  GetGoogleAudiencesResponse,
  GetGoogleAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGoogleAudiencesRequest,
  output: GetGoogleAudiencesResponse,
  errors: [],
}));

export interface ListGoogleAudiencesRequest {
  /** The ID of the advertiser that has access to the fetched Google audiences. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `googleAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by Google audience fields. Supported syntax: * Filter expressions for Google audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All Google audiences for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** The ID of the partner that has access to the fetched Google audiences. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListGoogleAudiences` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListGoogleAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/googleAudiences" }),
    svc,
  ) as unknown as Schema.Schema<ListGoogleAudiencesRequest>;

export type ListGoogleAudiencesResponse_Op = ListGoogleAudiencesResponse;
export const ListGoogleAudiencesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListGoogleAudiencesResponse;

export type ListGoogleAudiencesError = DefaultErrors;

/** Lists Google audiences. The order is defined by the order_by parameter. */
export const listGoogleAudiences: API.PaginatedOperationMethod<
  ListGoogleAudiencesRequest,
  ListGoogleAudiencesResponse_Op,
  ListGoogleAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGoogleAudiencesRequest,
  output: ListGoogleAudiencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetUsersRequest {
  /** Required. The ID of the user to fetch. */
  userId: string;
}

export const GetUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersRequest>;

export type GetUsersResponse = User;
export const GetUsersResponse = /*@__PURE__*/ /*#__PURE__*/ User;

export type GetUsersError = DefaultErrors;

/** Gets a user. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export const getUsers: API.OperationMethod<
  GetUsersRequest,
  GetUsersResponse,
  GetUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

export interface ListUsersRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListUsers` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by user fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `displayName` and `email` fields must use the `HAS (:)` operator. * The `lastLoginTime` field must use either the `LESS THAN OR EQUAL TO (<=)` or `GREATER THAN OR EQUAL TO (>=)` operator. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `assignedUserRole.advertiserId` * `assignedUserRole.entityType`: This is synthetic field of `AssignedUserRole` used for filtering. Identifies the type of entity to which the user role is assigned. Valid values are `Partner` and `Advertiser`. * `assignedUserRole.parentPartnerId`: This is a synthetic field of `AssignedUserRole` used for filtering. Identifies the parent partner of the entity to which the user role is assigned. * `assignedUserRole.partnerId` * `assignedUserRole.userRole` * `displayName` * `email` * `lastLoginTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * The user with `displayName` containing "foo": `displayName:"foo"` * The user with `email` containing "bar": `email:"bar"` * All users with standard user roles: `assignedUserRole.userRole="STANDARD"` * All users with user roles for partner 123: `assignedUserRole.partnerId="123"` * All users with user roles for advertiser 123: `assignedUserRole.advertiserId="123"` * All users with partner level user roles: `entityType="PARTNER"` * All users with user roles for partner 123 and advertisers under partner 123: `parentPartnerId="123"` * All users that last logged in on or after 2023-01-01T00:00:00Z (format of ISO 8601): `lastLoginTime>="2023-01-01T00:00:00Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/users" }),
  svc,
) as unknown as Schema.Schema<ListUsersRequest>;

export type ListUsersResponse_Op = ListUsersResponse;
export const ListUsersResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListUsersResponse;

export type ListUsersError = DefaultErrors;

/** Lists users that are accessible to the current user. If two users have user roles on the same partner or advertiser, they can access each other. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse_Op,
  ListUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchUsersRequest {
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Output only. The unique ID of the user. Assigned by the system. */
  userId: string;
  /** Request body */
  body?: User;
}

export const PatchUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/users/{usersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersRequest>;

export type PatchUsersResponse = User;
export const PatchUsersResponse = /*@__PURE__*/ /*#__PURE__*/ User;

export type PatchUsersError = DefaultErrors;

/** Updates an existing user. Returns the updated user if successful. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export const patchUsers: API.OperationMethod<
  PatchUsersRequest,
  PatchUsersResponse,
  PatchUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUsersRequest,
  output: PatchUsersResponse,
  errors: [],
}));

export interface DeleteUsersRequest {
  /** Required. The ID of the user to delete. */
  userId: string;
}

export const DeleteUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersRequest>;

export type DeleteUsersResponse = Empty;
export const DeleteUsersResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteUsersError = DefaultErrors;

/** Deletes a user. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export const deleteUsers: API.OperationMethod<
  DeleteUsersRequest,
  DeleteUsersResponse,
  DeleteUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersRequest,
  output: DeleteUsersResponse,
  errors: [],
}));

export interface BulkEditAssignedUserRolesUsersRequest {
  /** Required. The ID of the user to which the assigned user roles belong. */
  userId: string;
  /** Request body */
  body?: BulkEditAssignedUserRolesRequest;
}

export const BulkEditAssignedUserRolesUsersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(BulkEditAssignedUserRolesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/users/{usersId}:bulkEditAssignedUserRoles",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditAssignedUserRolesUsersRequest>;

export type BulkEditAssignedUserRolesUsersResponse =
  BulkEditAssignedUserRolesResponse;
export const BulkEditAssignedUserRolesUsersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditAssignedUserRolesResponse;

export type BulkEditAssignedUserRolesUsersError = DefaultErrors;

/** Bulk edits user roles for a user. The operation will delete the assigned user roles provided in BulkEditAssignedUserRolesRequest.deletedAssignedUserRoles and then assign the user roles provided in BulkEditAssignedUserRolesRequest.createdAssignedUserRoles. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export const bulkEditAssignedUserRolesUsers: API.OperationMethod<
  BulkEditAssignedUserRolesUsersRequest,
  BulkEditAssignedUserRolesUsersResponse,
  BulkEditAssignedUserRolesUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditAssignedUserRolesUsersRequest,
  output: BulkEditAssignedUserRolesUsersResponse,
  errors: [],
}));

export interface CreateUsersRequest {
  /** Request body */
  body?: User;
}

export const CreateUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/users", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUsersRequest>;

export type CreateUsersResponse = User;
export const CreateUsersResponse = /*@__PURE__*/ /*#__PURE__*/ User;

export type CreateUsersError = DefaultErrors;

/** Creates a new user. Returns the newly created user if successful. This method has unique authentication requirements. Read the prerequisites in our [Managing Users guide](/display-video/api/guides/users/overview#prerequisites) before using this method. The "Try this method" feature does not work for this method. */
export const createUsers: API.OperationMethod<
  CreateUsersRequest,
  CreateUsersResponse,
  CreateUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersRequest,
  output: CreateUsersResponse,
  errors: [],
}));

export interface CreateSdfdownloadtasksRequest {
  /** Request body */
  body?: CreateSdfDownloadTaskRequest;
}

export const CreateSdfdownloadtasksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(CreateSdfDownloadTaskRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v4/sdfdownloadtasks", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateSdfdownloadtasksRequest>;

export type CreateSdfdownloadtasksResponse = Operation;
export const CreateSdfdownloadtasksResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateSdfdownloadtasksError = DefaultErrors;

/** Creates an SDF Download Task. Returns an Operation. An SDF Download Task is a long-running, asynchronous operation. The metadata type of this operation is SdfDownloadTaskMetadata. If the request is successful, the response type of the operation is SdfDownloadTask. The response will not include the download files, which must be retrieved with media.download. The state of operation can be retrieved with `sdfdownloadtasks.operations.get`. Any errors can be found in the error.message. Note that error.details is expected to be empty. */
export const createSdfdownloadtasks: API.OperationMethod<
  CreateSdfdownloadtasksRequest,
  CreateSdfdownloadtasksResponse,
  CreateSdfdownloadtasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSdfdownloadtasksRequest,
  output: CreateSdfdownloadtasksResponse,
  errors: [],
}));

export interface GetSdfdownloadtasksOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetSdfdownloadtasksOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/sdfdownloadtasks/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSdfdownloadtasksOperationsRequest>;

export type GetSdfdownloadtasksOperationsResponse = Operation;
export const GetSdfdownloadtasksOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetSdfdownloadtasksOperationsError = DefaultErrors;

/** Gets the latest state of an asynchronous SDF download task operation. Clients should poll this method at intervals of 30 seconds. */
export const getSdfdownloadtasksOperations: API.OperationMethod<
  GetSdfdownloadtasksOperationsRequest,
  GetSdfdownloadtasksOperationsResponse,
  GetSdfdownloadtasksOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSdfdownloadtasksOperationsRequest,
  output: GetSdfdownloadtasksOperationsResponse,
  errors: [],
}));

export interface EditAssignedTargetingOptionsPartnersRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Request body */
  body?: BulkEditPartnerAssignedTargetingOptionsRequest;
}

export const EditAssignedTargetingOptionsPartnersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    body: Schema.optional(BulkEditPartnerAssignedTargetingOptionsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/partners/{partnersId}:editAssignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EditAssignedTargetingOptionsPartnersRequest>;

export type EditAssignedTargetingOptionsPartnersResponse =
  BulkEditPartnerAssignedTargetingOptionsResponse;
export const EditAssignedTargetingOptionsPartnersResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditPartnerAssignedTargetingOptionsResponse;

export type EditAssignedTargetingOptionsPartnersError = DefaultErrors;

/** Edits targeting options under a single partner. The operation will delete the assigned targeting options provided in BulkEditPartnerAssignedTargetingOptionsRequest.deleteRequests and then create the assigned targeting options provided in BulkEditPartnerAssignedTargetingOptionsRequest.createRequests . */
export const editAssignedTargetingOptionsPartners: API.OperationMethod<
  EditAssignedTargetingOptionsPartnersRequest,
  EditAssignedTargetingOptionsPartnersResponse,
  EditAssignedTargetingOptionsPartnersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EditAssignedTargetingOptionsPartnersRequest,
  output: EditAssignedTargetingOptionsPartnersResponse,
  errors: [],
}));

export interface GetPartnersRequest {
  /** Required. The ID of the partner to fetch. */
  partnerId: string;
}

export const GetPartnersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners/{partnersId}" }),
  svc,
) as unknown as Schema.Schema<GetPartnersRequest>;

export type GetPartnersResponse = Partner;
export const GetPartnersResponse = /*@__PURE__*/ /*#__PURE__*/ Partner;

export type GetPartnersError = DefaultErrors;

/** Gets a partner. */
export const getPartners: API.OperationMethod<
  GetPartnersRequest,
  GetPartnersResponse,
  GetPartnersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPartnersRequest,
  output: GetPartnersResponse,
  errors: [],
}));

export interface ListPartnersRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListPartners` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** Field by which to sort the list. Acceptable values are: * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by partner fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `entityStatus` Examples: * All active partners: `entityStatus="ENTITY_STATUS_ACTIVE"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListPartnersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v4/partners" }),
  svc,
) as unknown as Schema.Schema<ListPartnersRequest>;

export type ListPartnersResponse_Op = ListPartnersResponse;
export const ListPartnersResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListPartnersResponse;

export type ListPartnersError = DefaultErrors;

/** Lists partners that are accessible to the current user. The order is defined by the order_by parameter. */
export const listPartners: API.PaginatedOperationMethod<
  ListPartnersRequest,
  ListPartnersResponse_Op,
  ListPartnersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPartnersRequest,
  output: ListPartnersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePartnersChannelsRequest {
  /** The ID of the partner that owns the created channel. */
  partnerId: string;
  /** The ID of the advertiser that owns the created channel. */
  advertiserId?: string;
  /** Request body */
  body?: Channel;
}

export const CreatePartnersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/partners/{partnersId}/channels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePartnersChannelsRequest>;

export type CreatePartnersChannelsResponse = Channel;
export const CreatePartnersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type CreatePartnersChannelsError = DefaultErrors;

/** Creates a new channel. Returns the newly created channel if successful. */
export const createPartnersChannels: API.OperationMethod<
  CreatePartnersChannelsRequest,
  CreatePartnersChannelsResponse,
  CreatePartnersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePartnersChannelsRequest,
  output: CreatePartnersChannelsResponse,
  errors: [],
}));

export interface GetPartnersChannelsRequest {
  /** The ID of the advertiser that owns the fetched channel. */
  advertiserId?: string;
  /** The ID of the partner that owns the fetched channel. */
  partnerId: string;
  /** Required. The ID of the channel to fetch. */
  channelId: string;
}

export const GetPartnersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/partners/{partnersId}/channels/{channelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPartnersChannelsRequest>;

export type GetPartnersChannelsResponse = Channel;
export const GetPartnersChannelsResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type GetPartnersChannelsError = DefaultErrors;

/** Gets a channel for a partner or advertiser. */
export const getPartnersChannels: API.OperationMethod<
  GetPartnersChannelsRequest,
  GetPartnersChannelsResponse,
  GetPartnersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPartnersChannelsRequest,
  output: GetPartnersChannelsResponse,
  errors: [],
}));

export interface ListPartnersChannelsRequest {
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the partner that owns the channels. */
  partnerId: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the advertiser that owns the channels. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) * `channelId` The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by channel fields. Supported syntax: * Filter expressions for channel can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All channels for which the display name contains "google": `displayName : "google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
}

export const ListPartnersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/partners/{partnersId}/channels" }),
    svc,
  ) as unknown as Schema.Schema<ListPartnersChannelsRequest>;

export type ListPartnersChannelsResponse = ListChannelsResponse;
export const ListPartnersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListChannelsResponse;

export type ListPartnersChannelsError = DefaultErrors;

/** Lists channels for a partner or advertiser. */
export const listPartnersChannels: API.PaginatedOperationMethod<
  ListPartnersChannelsRequest,
  ListPartnersChannelsResponse,
  ListPartnersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPartnersChannelsRequest,
  output: ListPartnersChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchPartnersChannelsRequest {
  /** Output only. The unique ID of the channel. Assigned by the system. */
  channelId: string;
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** The ID of the partner that owns the created channel. */
  partnerId: string;
  /** The ID of the advertiser that owns the created channel. */
  advertiserId?: string;
  /** Request body */
  body?: Channel;
}

export const PatchPartnersChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/partners/{partnersId}/channels/{channelId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchPartnersChannelsRequest>;

export type PatchPartnersChannelsResponse = Channel;
export const PatchPartnersChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type PatchPartnersChannelsError = DefaultErrors;

/** Updates a channel. Returns the updated channel if successful. */
export const patchPartnersChannels: API.OperationMethod<
  PatchPartnersChannelsRequest,
  PatchPartnersChannelsResponse,
  PatchPartnersChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchPartnersChannelsRequest,
  output: PatchPartnersChannelsResponse,
  errors: [],
}));

export interface ReplacePartnersChannelsSitesRequest {
  /** Required. The ID of the parent channel whose sites will be replaced. */
  channelId: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Request body */
  body?: ReplaceSitesRequest;
}

export const ReplacePartnersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    body: Schema.optional(ReplaceSitesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/partners/{partnerId}/channels/{channelsId}/sites:replace",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReplacePartnersChannelsSitesRequest>;

export type ReplacePartnersChannelsSitesResponse = ReplaceSitesResponse;
export const ReplacePartnersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReplaceSitesResponse;

export type ReplacePartnersChannelsSitesError = DefaultErrors;

/** Replaces all of the sites under a single channel. The operation will replace the sites under a channel with the sites provided in ReplaceSitesRequest.new_sites. **This method regularly experiences high latency.** We recommend [increasing your default timeout](/display-video/api/guides/best-practices/timeouts#client_library_timeout) to avoid errors. */
export const replacePartnersChannelsSites: API.OperationMethod<
  ReplacePartnersChannelsSitesRequest,
  ReplacePartnersChannelsSitesResponse,
  ReplacePartnersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReplacePartnersChannelsSitesRequest,
  output: ReplacePartnersChannelsSitesResponse,
  errors: [],
}));

export interface BulkEditPartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Required. The ID of the parent channel to which the sites belong. */
  channelId: string;
  /** Request body */
  body?: BulkEditSitesRequest;
}

export const BulkEditPartnersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    body: Schema.optional(BulkEditSitesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/partners/{partnerId}/channels/{channelsId}/sites:bulkEdit",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BulkEditPartnersChannelsSitesRequest>;

export type BulkEditPartnersChannelsSitesResponse = BulkEditSitesResponse;
export const BulkEditPartnersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BulkEditSitesResponse;

export type BulkEditPartnersChannelsSitesError = DefaultErrors;

/** Bulk edits sites under a single channel. The operation will delete the sites provided in BulkEditSitesRequest.deleted_sites and then create the sites provided in BulkEditSitesRequest.created_sites. */
export const bulkEditPartnersChannelsSites: API.OperationMethod<
  BulkEditPartnersChannelsSitesRequest,
  BulkEditPartnersChannelsSitesResponse,
  BulkEditPartnersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkEditPartnersChannelsSitesRequest,
  output: BulkEditPartnersChannelsSitesResponse,
  errors: [],
}));

export interface CreatePartnersChannelsSitesRequest {
  /** Required. The ID of the parent channel in which the site will be created. */
  channelId: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** Request body */
  body?: Site;
}

export const CreatePartnersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(Site).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/partners/{partnerId}/channels/{channelsId}/sites",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePartnersChannelsSitesRequest>;

export type CreatePartnersChannelsSitesResponse = Site;
export const CreatePartnersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Site;

export type CreatePartnersChannelsSitesError = DefaultErrors;

/** Creates a site in a channel. */
export const createPartnersChannelsSites: API.OperationMethod<
  CreatePartnersChannelsSitesRequest,
  CreatePartnersChannelsSitesResponse,
  CreatePartnersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePartnersChannelsSitesRequest,
  output: CreatePartnersChannelsSitesResponse,
  errors: [],
}));

export interface DeletePartnersChannelsSitesRequest {
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** Required. The ID of the parent channel to which the site belongs. */
  channelId: string;
  /** Required. The URL or app ID of the site to delete. */
  urlOrAppId: string;
}

export const DeletePartnersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    urlOrAppId: Schema.String.pipe(T.HttpPath("urlOrAppId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/partners/{partnerId}/channels/{channelsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePartnersChannelsSitesRequest>;

export type DeletePartnersChannelsSitesResponse = Empty;
export const DeletePartnersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeletePartnersChannelsSitesError = DefaultErrors;

/** Deletes a site from a channel. */
export const deletePartnersChannelsSites: API.OperationMethod<
  DeletePartnersChannelsSitesRequest,
  DeletePartnersChannelsSitesResponse,
  DeletePartnersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePartnersChannelsSitesRequest,
  output: DeletePartnersChannelsSitesResponse,
  errors: [],
}));

export interface ListPartnersChannelsSitesRequest {
  /** Required. The ID of the parent channel to which the requested sites belong. */
  channelId: string;
  /** The ID of the advertiser that owns the parent channel. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `urlOrAppId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `urlOrAppId desc`. */
  orderBy?: string;
  /** Allows filtering by site fields. Supported syntax: * Filter expressions for site retrieval can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `urlOrAppId` Examples: * All sites for which the URL or app ID contains "google": `urlOrAppId : "google"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** The ID of the partner that owns the parent channel. */
  partnerId: string;
  /** Requested page size. Must be between `1` and `10000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListSites` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListPartnersChannelsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    channelId: Schema.String.pipe(T.HttpPath("channelId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/partners/{partnersId}/channels/{channelsId}/sites",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPartnersChannelsSitesRequest>;

export type ListPartnersChannelsSitesResponse = ListSitesResponse;
export const ListPartnersChannelsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSitesResponse;

export type ListPartnersChannelsSitesError = DefaultErrors;

/** Lists sites in a channel. */
export const listPartnersChannelsSites: API.PaginatedOperationMethod<
  ListPartnersChannelsSitesRequest,
  ListPartnersChannelsSitesResponse,
  ListPartnersChannelsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPartnersChannelsSitesRequest,
  output: ListPartnersChannelsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeletePartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Required. The ID of the assigned targeting option to delete. */
  assignedTargetingOptionId: string;
}

export const DeletePartnersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type DeletePartnersTargetingTypesAssignedTargetingOptionsResponse =
  Empty;
export const DeletePartnersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeletePartnersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Deletes an assigned targeting option from a partner. */
export const deletePartnersTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  DeletePartnersTargetingTypesAssignedTargetingOptionsRequest,
  DeletePartnersTargetingTypesAssignedTargetingOptionsResponse,
  DeletePartnersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: DeletePartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface GetPartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Required. An identifier unique to the targeting type in this partner that identifies the assigned targeting option being requested. */
  assignedTargetingOptionId: string;
}

export const GetPartnersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    assignedTargetingOptionId: Schema.String.pipe(
      T.HttpPath("assignedTargetingOptionId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions/{assignedTargetingOptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type GetPartnersTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const GetPartnersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type GetPartnersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Gets a single targeting option assigned to a partner. */
export const getPartnersTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  GetPartnersTargetingTypesAssignedTargetingOptionsRequest,
  GetPartnersTargetingTypesAssignedTargetingOptionsResponse,
  GetPartnersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: GetPartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface ListPartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`. */
  orderBy?: string;
  /** Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` resource with ID 123456: `assignedTargetingOptionId="123456"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListPartnerAssignedTargetingOptions` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListPartnersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type ListPartnersTargetingTypesAssignedTargetingOptionsResponse =
  ListPartnerAssignedTargetingOptionsResponse;
export const ListPartnersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPartnerAssignedTargetingOptionsResponse;

export type ListPartnersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Lists the targeting options assigned to a partner. */
export const listPartnersTargetingTypesAssignedTargetingOptions: API.PaginatedOperationMethod<
  ListPartnersTargetingTypesAssignedTargetingOptionsRequest,
  ListPartnersTargetingTypesAssignedTargetingOptionsResponse,
  ListPartnersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: ListPartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePartnersTargetingTypesAssignedTargetingOptionsRequest {
  /** Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` */
  targetingType:
    | "TARGETING_TYPE_UNSPECIFIED"
    | "TARGETING_TYPE_CHANNEL"
    | "TARGETING_TYPE_APP_CATEGORY"
    | "TARGETING_TYPE_APP"
    | "TARGETING_TYPE_URL"
    | "TARGETING_TYPE_DAY_AND_TIME"
    | "TARGETING_TYPE_AGE_RANGE"
    | "TARGETING_TYPE_REGIONAL_LOCATION_LIST"
    | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST"
    | "TARGETING_TYPE_GENDER"
    | "TARGETING_TYPE_VIDEO_PLAYER_SIZE"
    | "TARGETING_TYPE_USER_REWARDED_CONTENT"
    | "TARGETING_TYPE_PARENTAL_STATUS"
    | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION"
    | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION"
    | "TARGETING_TYPE_DEVICE_TYPE"
    | "TARGETING_TYPE_AUDIENCE_GROUP"
    | "TARGETING_TYPE_BROWSER"
    | "TARGETING_TYPE_HOUSEHOLD_INCOME"
    | "TARGETING_TYPE_ON_SCREEN_POSITION"
    | "TARGETING_TYPE_THIRD_PARTY_VERIFIER"
    | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION"
    | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION"
    | "TARGETING_TYPE_ENVIRONMENT"
    | "TARGETING_TYPE_CARRIER_AND_ISP"
    | "TARGETING_TYPE_OPERATING_SYSTEM"
    | "TARGETING_TYPE_DEVICE_MAKE_MODEL"
    | "TARGETING_TYPE_KEYWORD"
    | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST"
    | "TARGETING_TYPE_VIEWABILITY"
    | "TARGETING_TYPE_CATEGORY"
    | "TARGETING_TYPE_INVENTORY_SOURCE"
    | "TARGETING_TYPE_LANGUAGE"
    | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS"
    | "TARGETING_TYPE_GEO_REGION"
    | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP"
    | "TARGETING_TYPE_EXCHANGE"
    | "TARGETING_TYPE_SUB_EXCHANGE"
    | "TARGETING_TYPE_POI"
    | "TARGETING_TYPE_BUSINESS_CHAIN"
    | "TARGETING_TYPE_CONTENT_DURATION"
    | "TARGETING_TYPE_CONTENT_STREAM_TYPE"
    | "TARGETING_TYPE_NATIVE_CONTENT_POSITION"
    | "TARGETING_TYPE_OMID"
    | "TARGETING_TYPE_AUDIO_CONTENT_TYPE"
    | "TARGETING_TYPE_CONTENT_GENRE"
    | "TARGETING_TYPE_YOUTUBE_VIDEO"
    | "TARGETING_TYPE_YOUTUBE_CHANNEL"
    | "TARGETING_TYPE_SESSION_POSITION"
    | "TARGETING_TYPE_CONTENT_THEME_EXCLUSION"
    | (string & {});
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Request body */
  body?: AssignedTargetingOption;
}

export const CreatePartnersTargetingTypesAssignedTargetingOptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetingType: Schema.String.pipe(T.HttpPath("targetingType")),
    partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
    body: Schema.optional(AssignedTargetingOption).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/partners/{partnersId}/targetingTypes/{targetingTypesId}/assignedTargetingOptions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePartnersTargetingTypesAssignedTargetingOptionsRequest>;

export type CreatePartnersTargetingTypesAssignedTargetingOptionsResponse =
  AssignedTargetingOption;
export const CreatePartnersTargetingTypesAssignedTargetingOptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AssignedTargetingOption;

export type CreatePartnersTargetingTypesAssignedTargetingOptionsError =
  DefaultErrors;

/** Assigns a targeting option to a partner. Returns the assigned targeting option if successful. */
export const createPartnersTargetingTypesAssignedTargetingOptions: API.OperationMethod<
  CreatePartnersTargetingTypesAssignedTargetingOptionsRequest,
  CreatePartnersTargetingTypesAssignedTargetingOptionsResponse,
  CreatePartnersTargetingTypesAssignedTargetingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePartnersTargetingTypesAssignedTargetingOptionsRequest,
  output: CreatePartnersTargetingTypesAssignedTargetingOptionsResponse,
  errors: [],
}));

export interface EditInventorySourceReadWriteAccessorsInventorySourcesRequest {
  /** Required. The ID of inventory source to update. */
  inventorySourceId: string;
  /** Request body */
  body?: EditInventorySourceReadWriteAccessorsRequest;
}

export const EditInventorySourceReadWriteAccessorsInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inventorySourceId: Schema.String.pipe(T.HttpPath("inventorySourceId")),
    body: Schema.optional(EditInventorySourceReadWriteAccessorsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/inventorySources/{inventorySourcesId}:editInventorySourceReadWriteAccessors",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EditInventorySourceReadWriteAccessorsInventorySourcesRequest>;

export type EditInventorySourceReadWriteAccessorsInventorySourcesResponse =
  InventorySourceAccessors;
export const EditInventorySourceReadWriteAccessorsInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySourceAccessors;

export type EditInventorySourceReadWriteAccessorsInventorySourcesError =
  DefaultErrors;

/** Edits read/write accessors of an inventory source. Returns the updated read_write_accessors for the inventory source. */
export const editInventorySourceReadWriteAccessorsInventorySources: API.OperationMethod<
  EditInventorySourceReadWriteAccessorsInventorySourcesRequest,
  EditInventorySourceReadWriteAccessorsInventorySourcesResponse,
  EditInventorySourceReadWriteAccessorsInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EditInventorySourceReadWriteAccessorsInventorySourcesRequest,
  output: EditInventorySourceReadWriteAccessorsInventorySourcesResponse,
  errors: [],
}));

export interface GetInventorySourcesRequest {
  /** Required. The ID of the inventory source to fetch. */
  inventorySourceId: string;
  /** Required. The ID of the DV360 partner to which the fetched inventory source is permissioned. */
  partnerId?: string;
  /** Optional. The ID of the DV360 advertiser to which the fetched inventory source is permissioned. If the user only has access to the advertiser and not the parent partner, use this field to specify the relevant advertiser. */
  advertiserId?: string;
}

export const GetInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inventorySourceId: Schema.String.pipe(T.HttpPath("inventorySourceId")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v4/inventorySources/{inventorySourcesId}" }),
    svc,
  ) as unknown as Schema.Schema<GetInventorySourcesRequest>;

export type GetInventorySourcesResponse = InventorySource;
export const GetInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySource;

export type GetInventorySourcesError = DefaultErrors;

/** Gets an inventory source. */
export const getInventorySources: API.OperationMethod<
  GetInventorySourcesRequest,
  GetInventorySourcesResponse,
  GetInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInventorySourcesRequest,
  output: GetInventorySourcesResponse,
  errors: [],
}));

export interface ListInventorySourcesRequest {
  /** The ID of the partner that has access to the inventory source. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. */
  pageSize?: number;
  /** The ID of the advertiser that has access to the inventory source. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by inventory source fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `status.entityStatus` * `commitment` * `deliveryMethod` * `rateDetails.rateType` * `exchange` Examples: * All active inventory sources: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Inventory sources belonging to Google Ad Manager or Rubicon exchanges: `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/inventorySources" }),
    svc,
  ) as unknown as Schema.Schema<ListInventorySourcesRequest>;

export type ListInventorySourcesResponse_Op = ListInventorySourcesResponse;
export const ListInventorySourcesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListInventorySourcesResponse;

export type ListInventorySourcesError = DefaultErrors;

/** Lists inventory sources that are accessible to the current user. The order is defined by the order_by parameter. If a filter by entity_status is not specified, inventory sources with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results. */
export const listInventorySources: API.PaginatedOperationMethod<
  ListInventorySourcesRequest,
  ListInventorySourcesResponse_Op,
  ListInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInventorySourcesRequest,
  output: ListInventorySourcesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

export const PatchInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inventorySourceId: Schema.String.pipe(T.HttpPath("inventorySourceId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(InventorySource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/inventorySources/{inventorySourcesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchInventorySourcesRequest>;

export type PatchInventorySourcesResponse = InventorySource;
export const PatchInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySource;

export type PatchInventorySourcesError = DefaultErrors;

/** Updates an existing inventory source. Returns the updated inventory source if successful. */
export const patchInventorySources: API.OperationMethod<
  PatchInventorySourcesRequest,
  PatchInventorySourcesResponse,
  PatchInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchInventorySourcesRequest,
  output: PatchInventorySourcesResponse,
  errors: [],
}));

export interface CreateInventorySourcesRequest {
  /** The ID of the advertiser that the request is being made within. */
  advertiserId?: string;
  /** The ID of the partner that the request is being made within. */
  partnerId?: string;
  /** Request body */
  body?: InventorySource;
}

export const CreateInventorySourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    body: Schema.optional(InventorySource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v4/inventorySources", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateInventorySourcesRequest>;

export type CreateInventorySourcesResponse = InventorySource;
export const CreateInventorySourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ InventorySource;

export type CreateInventorySourcesError = DefaultErrors;

/** Creates a new inventory source. Returns the newly created inventory source if successful. */
export const createInventorySources: API.OperationMethod<
  CreateInventorySourcesRequest,
  CreateInventorySourcesResponse,
  CreateInventorySourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInventorySourcesRequest,
  output: CreateInventorySourcesResponse,
  errors: [],
}));

export interface UploadScriptCustomBiddingAlgorithmsRequest {
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Required. The ID of the custom bidding algorithm owns the script. */
  customBiddingAlgorithmId: string;
}

export const UploadScriptCustomBiddingAlgorithmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}:uploadScript",
    }),
    svc,
  ) as unknown as Schema.Schema<UploadScriptCustomBiddingAlgorithmsRequest>;

export type UploadScriptCustomBiddingAlgorithmsResponse =
  CustomBiddingScriptRef;
export const UploadScriptCustomBiddingAlgorithmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingScriptRef;

export type UploadScriptCustomBiddingAlgorithmsError = DefaultErrors;

/** Creates a custom bidding script reference object for a script file. The resulting reference object provides a resource path to which the script file should be uploaded. This reference object should be included in when creating a new custom bidding script object. */
export const uploadScriptCustomBiddingAlgorithms: API.OperationMethod<
  UploadScriptCustomBiddingAlgorithmsRequest,
  UploadScriptCustomBiddingAlgorithmsResponse,
  UploadScriptCustomBiddingAlgorithmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadScriptCustomBiddingAlgorithmsRequest,
  output: UploadScriptCustomBiddingAlgorithmsResponse,
  errors: [],
}));

export interface GetCustomBiddingAlgorithmsRequest {
  /** The ID of the DV360 partner that has access to the custom bidding algorithm. */
  advertiserId?: string;
  /** The ID of the DV360 partner that has access to the custom bidding algorithm. */
  partnerId?: string;
  /** Required. The ID of the custom bidding algorithm to fetch. */
  customBiddingAlgorithmId: string;
}

export const GetCustomBiddingAlgorithmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCustomBiddingAlgorithmsRequest>;

export type GetCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;
export const GetCustomBiddingAlgorithmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingAlgorithm;

export type GetCustomBiddingAlgorithmsError = DefaultErrors;

/** Gets a custom bidding algorithm. */
export const getCustomBiddingAlgorithms: API.OperationMethod<
  GetCustomBiddingAlgorithmsRequest,
  GetCustomBiddingAlgorithmsResponse,
  GetCustomBiddingAlgorithmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomBiddingAlgorithmsRequest,
  output: GetCustomBiddingAlgorithmsResponse,
  errors: [],
}));

export interface ListCustomBiddingAlgorithmsRequest {
  /** The ID of the DV360 partner that has access to the custom bidding algorithm. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the DV360 advertiser that has access to the custom bidding algorithm. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `displayName` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Allows filtering by custom bidding algorithm fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `customBiddingAlgorithmType` field must use the `EQUALS (=)` operator. * The `displayName` field must use the `HAS (:)` operator. Supported fields: * `customBiddingAlgorithmType` * `displayName` Examples: * All custom bidding algorithms for which the display name contains "politics": `displayName:"politics"`. * All custom bidding algorithms for which the type is "SCRIPT_BASED": `customBiddingAlgorithmType=SCRIPT_BASED` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomBiddingAlgorithms` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListCustomBiddingAlgorithmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/customBiddingAlgorithms" }),
    svc,
  ) as unknown as Schema.Schema<ListCustomBiddingAlgorithmsRequest>;

export type ListCustomBiddingAlgorithmsResponse_Op =
  ListCustomBiddingAlgorithmsResponse;
export const ListCustomBiddingAlgorithmsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomBiddingAlgorithmsResponse;

export type ListCustomBiddingAlgorithmsError = DefaultErrors;

/** Lists custom bidding algorithms that are accessible to the current user and can be used in bidding stratgies. The order is defined by the order_by parameter. */
export const listCustomBiddingAlgorithms: API.PaginatedOperationMethod<
  ListCustomBiddingAlgorithmsRequest,
  ListCustomBiddingAlgorithmsResponse_Op,
  ListCustomBiddingAlgorithmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomBiddingAlgorithmsRequest,
  output: ListCustomBiddingAlgorithmsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchCustomBiddingAlgorithmsRequest {
  /** Required. The mask to control which fields to update. */
  updateMask?: string;
  /** Output only. The unique ID of the custom bidding algorithm. Assigned by the system. */
  customBiddingAlgorithmId: string;
  /** Request body */
  body?: CustomBiddingAlgorithm;
}

export const PatchCustomBiddingAlgorithmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
    body: Schema.optional(CustomBiddingAlgorithm).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCustomBiddingAlgorithmsRequest>;

export type PatchCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;
export const PatchCustomBiddingAlgorithmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingAlgorithm;

export type PatchCustomBiddingAlgorithmsError = DefaultErrors;

/** Updates an existing custom bidding algorithm. Returns the updated custom bidding algorithm if successful. Requests updating a custom bidding algorithm assigned to a line item will return an error. */
export const patchCustomBiddingAlgorithms: API.OperationMethod<
  PatchCustomBiddingAlgorithmsRequest,
  PatchCustomBiddingAlgorithmsResponse,
  PatchCustomBiddingAlgorithmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCustomBiddingAlgorithmsRequest,
  output: PatchCustomBiddingAlgorithmsResponse,
  errors: [],
}));

export interface UploadRulesCustomBiddingAlgorithmsRequest {
  /** The ID of the partner that owns the parent custom bidding algorithm. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
}

export const UploadRulesCustomBiddingAlgorithmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}:uploadRules",
    }),
    svc,
  ) as unknown as Schema.Schema<UploadRulesCustomBiddingAlgorithmsRequest>;

export type UploadRulesCustomBiddingAlgorithmsResponse =
  CustomBiddingAlgorithmRulesRef;
export const UploadRulesCustomBiddingAlgorithmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingAlgorithmRulesRef;

export type UploadRulesCustomBiddingAlgorithmsError = DefaultErrors;

/** Creates a rules reference object for an AlgorithmRules file. The resulting reference object provides a resource path where the AlgorithmRules file should be uploaded. This reference object should be included when creating a new CustomBiddingAlgorithmRules resource. */
export const uploadRulesCustomBiddingAlgorithms: API.OperationMethod<
  UploadRulesCustomBiddingAlgorithmsRequest,
  UploadRulesCustomBiddingAlgorithmsResponse,
  UploadRulesCustomBiddingAlgorithmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadRulesCustomBiddingAlgorithmsRequest,
  output: UploadRulesCustomBiddingAlgorithmsResponse,
  errors: [],
}));

export interface CreateCustomBiddingAlgorithmsRequest {
  /** Request body */
  body?: CustomBiddingAlgorithm;
}

export const CreateCustomBiddingAlgorithmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(CustomBiddingAlgorithm).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/customBiddingAlgorithms",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCustomBiddingAlgorithmsRequest>;

export type CreateCustomBiddingAlgorithmsResponse = CustomBiddingAlgorithm;
export const CreateCustomBiddingAlgorithmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingAlgorithm;

export type CreateCustomBiddingAlgorithmsError = DefaultErrors;

/** Creates a new custom bidding algorithm. Returns the newly created custom bidding algorithm if successful. */
export const createCustomBiddingAlgorithms: API.OperationMethod<
  CreateCustomBiddingAlgorithmsRequest,
  CreateCustomBiddingAlgorithmsResponse,
  CreateCustomBiddingAlgorithmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomBiddingAlgorithmsRequest,
  output: CreateCustomBiddingAlgorithmsResponse,
  errors: [],
}));

export interface CreateCustomBiddingAlgorithmsScriptsRequest {
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Required. The ID of the custom bidding algorithm that owns the script. */
  customBiddingAlgorithmId: string;
  /** Request body */
  body?: CustomBiddingScript;
}

export const CreateCustomBiddingAlgorithmsScriptsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
    body: Schema.optional(CustomBiddingScript).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/scripts",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCustomBiddingAlgorithmsScriptsRequest>;

export type CreateCustomBiddingAlgorithmsScriptsResponse = CustomBiddingScript;
export const CreateCustomBiddingAlgorithmsScriptsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingScript;

export type CreateCustomBiddingAlgorithmsScriptsError = DefaultErrors;

/** Creates a new custom bidding script. Returns the newly created script if successful. Requests creating a custom bidding script under an algorithm assigned to a line item will return an error. */
export const createCustomBiddingAlgorithmsScripts: API.OperationMethod<
  CreateCustomBiddingAlgorithmsScriptsRequest,
  CreateCustomBiddingAlgorithmsScriptsResponse,
  CreateCustomBiddingAlgorithmsScriptsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomBiddingAlgorithmsScriptsRequest,
  output: CreateCustomBiddingAlgorithmsScriptsResponse,
  errors: [],
}));

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

export const GetCustomBiddingAlgorithmsScriptsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
    customBiddingScriptId: Schema.String.pipe(
      T.HttpPath("customBiddingScriptId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/scripts/{scriptsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCustomBiddingAlgorithmsScriptsRequest>;

export type GetCustomBiddingAlgorithmsScriptsResponse = CustomBiddingScript;
export const GetCustomBiddingAlgorithmsScriptsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingScript;

export type GetCustomBiddingAlgorithmsScriptsError = DefaultErrors;

/** Gets a custom bidding script. */
export const getCustomBiddingAlgorithmsScripts: API.OperationMethod<
  GetCustomBiddingAlgorithmsScriptsRequest,
  GetCustomBiddingAlgorithmsScriptsResponse,
  GetCustomBiddingAlgorithmsScriptsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomBiddingAlgorithmsScriptsRequest,
  output: GetCustomBiddingAlgorithmsScriptsResponse,
  errors: [],
}));

export interface ListCustomBiddingAlgorithmsScriptsRequest {
  /** Required. The ID of the custom bidding algorithm owns the script. */
  customBiddingAlgorithmId: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomBiddingScripts` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this custom bidding script. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `createTime desc` (default) The default sorting order is descending. To specify ascending order for a field, the suffix "desc" should be removed. Example: `createTime`. */
  orderBy?: string;
}

export const ListCustomBiddingAlgorithmsScriptsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/scripts",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCustomBiddingAlgorithmsScriptsRequest>;

export type ListCustomBiddingAlgorithmsScriptsResponse =
  ListCustomBiddingScriptsResponse;
export const ListCustomBiddingAlgorithmsScriptsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomBiddingScriptsResponse;

export type ListCustomBiddingAlgorithmsScriptsError = DefaultErrors;

/** Lists custom bidding scripts that belong to the given algorithm. The order is defined by the order_by parameter. */
export const listCustomBiddingAlgorithmsScripts: API.PaginatedOperationMethod<
  ListCustomBiddingAlgorithmsScriptsRequest,
  ListCustomBiddingAlgorithmsScriptsResponse,
  ListCustomBiddingAlgorithmsScriptsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomBiddingAlgorithmsScriptsRequest,
  output: ListCustomBiddingAlgorithmsScriptsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCustomBiddingAlgorithmsRulesRequest {
  /** Required. The ID of the rules resource to fetch. */
  customBiddingAlgorithmRulesId: string;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. */
  partnerId?: string;
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
}

export const GetCustomBiddingAlgorithmsRulesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customBiddingAlgorithmRulesId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmRulesId"),
    ),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/rules/{rulesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCustomBiddingAlgorithmsRulesRequest>;

export type GetCustomBiddingAlgorithmsRulesResponse =
  CustomBiddingAlgorithmRules;
export const GetCustomBiddingAlgorithmsRulesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingAlgorithmRules;

export type GetCustomBiddingAlgorithmsRulesError = DefaultErrors;

/** Retrieves a rules resource. */
export const getCustomBiddingAlgorithmsRules: API.OperationMethod<
  GetCustomBiddingAlgorithmsRulesRequest,
  GetCustomBiddingAlgorithmsRulesResponse,
  GetCustomBiddingAlgorithmsRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomBiddingAlgorithmsRulesRequest,
  output: GetCustomBiddingAlgorithmsRulesResponse,
  errors: [],
}));

export interface ListCustomBiddingAlgorithmsRulesRequest {
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
  /** A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomBiddingAlgorithmRules` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. */
  partnerId?: string;
  /** Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** Field by which to sort the list. Acceptable values are: * `createTime desc` (default) The default sorting order is descending. To specify ascending order for a field, the suffix "desc" should be removed. Example: `createTime`. */
  orderBy?: string;
}

export const ListCustomBiddingAlgorithmsRulesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/rules",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCustomBiddingAlgorithmsRulesRequest>;

export type ListCustomBiddingAlgorithmsRulesResponse =
  ListCustomBiddingAlgorithmRulesResponse;
export const ListCustomBiddingAlgorithmsRulesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomBiddingAlgorithmRulesResponse;

export type ListCustomBiddingAlgorithmsRulesError = DefaultErrors;

/** Lists rules resources that belong to the given algorithm. The order is defined by the order_by parameter. */
export const listCustomBiddingAlgorithmsRules: API.PaginatedOperationMethod<
  ListCustomBiddingAlgorithmsRulesRequest,
  ListCustomBiddingAlgorithmsRulesResponse,
  ListCustomBiddingAlgorithmsRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomBiddingAlgorithmsRulesRequest,
  output: ListCustomBiddingAlgorithmsRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCustomBiddingAlgorithmsRulesRequest {
  /** The ID of the advertiser that owns the parent custom bidding algorithm. */
  advertiserId?: string;
  /** The ID of the partner that owns the parent custom bidding algorithm. Only this partner will have write access to this rules resource. */
  partnerId?: string;
  /** Required. The ID of the custom bidding algorithm that owns the rules resource. */
  customBiddingAlgorithmId: string;
  /** Request body */
  body?: CustomBiddingAlgorithmRules;
}

export const CreateCustomBiddingAlgorithmsRulesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    customBiddingAlgorithmId: Schema.String.pipe(
      T.HttpPath("customBiddingAlgorithmId"),
    ),
    body: Schema.optional(CustomBiddingAlgorithmRules).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/customBiddingAlgorithms/{customBiddingAlgorithmsId}/rules",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCustomBiddingAlgorithmsRulesRequest>;

export type CreateCustomBiddingAlgorithmsRulesResponse =
  CustomBiddingAlgorithmRules;
export const CreateCustomBiddingAlgorithmsRulesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomBiddingAlgorithmRules;

export type CreateCustomBiddingAlgorithmsRulesError = DefaultErrors;

/** Creates a new rules resource. Returns the newly created rules resource if successful. Requests creating a custom bidding rules resource under an algorithm assigned to a line item will return an error. */
export const createCustomBiddingAlgorithmsRules: API.OperationMethod<
  CreateCustomBiddingAlgorithmsRulesRequest,
  CreateCustomBiddingAlgorithmsRulesResponse,
  CreateCustomBiddingAlgorithmsRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomBiddingAlgorithmsRulesRequest,
  output: CreateCustomBiddingAlgorithmsRulesResponse,
  errors: [],
}));

export interface EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest {
  /** Required. The ID of the Customer Match FirstPartyAndPartnerAudience whose members will be edited. */
  firstPartyAndPartnerAudienceId: string;
  /** Request body */
  body?: EditCustomerMatchMembersRequest;
}

export const EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firstPartyAndPartnerAudienceId: Schema.String.pipe(
      T.HttpPath("firstPartyAndPartnerAudienceId"),
    ),
    body: Schema.optional(EditCustomerMatchMembersRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/firstPartyAndPartnerAudiences/{firstPartyAndPartnerAudiencesId}:editCustomerMatchMembers",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest>;

export type EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse =
  EditCustomerMatchMembersResponse;
export const EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ EditCustomerMatchMembersResponse;

export type EditCustomerMatchMembersFirstPartyAndPartnerAudiencesError =
  DefaultErrors;

/** Updates the member list of a Customer Match audience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
export const editCustomerMatchMembersFirstPartyAndPartnerAudiences: API.OperationMethod<
  EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest,
  EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse,
  EditCustomerMatchMembersFirstPartyAndPartnerAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EditCustomerMatchMembersFirstPartyAndPartnerAudiencesRequest,
  output: EditCustomerMatchMembersFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

export interface GetFirstPartyAndPartnerAudiencesRequest {
  /** Required. The ID of the first party and partner audience to fetch. */
  firstPartyAndPartnerAudienceId: string;
  /** The ID of the advertiser that has access to the fetched first party and partner audience. */
  advertiserId?: string;
  /** The ID of the partner that has access to the fetched first party and partner audience. */
  partnerId?: string;
}

export const GetFirstPartyAndPartnerAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firstPartyAndPartnerAudienceId: Schema.String.pipe(
      T.HttpPath("firstPartyAndPartnerAudienceId"),
    ),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v4/firstPartyAndPartnerAudiences/{firstPartyAndPartnerAudiencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetFirstPartyAndPartnerAudiencesRequest>;

export type GetFirstPartyAndPartnerAudiencesResponse =
  FirstPartyAndPartnerAudience;
export const GetFirstPartyAndPartnerAudiencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ FirstPartyAndPartnerAudience;

export type GetFirstPartyAndPartnerAudiencesError = DefaultErrors;

/** Gets a first party or partner audience. */
export const getFirstPartyAndPartnerAudiences: API.OperationMethod<
  GetFirstPartyAndPartnerAudiencesRequest,
  GetFirstPartyAndPartnerAudiencesResponse,
  GetFirstPartyAndPartnerAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFirstPartyAndPartnerAudiencesRequest,
  output: GetFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

export interface ListFirstPartyAndPartnerAudiencesRequest {
  /** The ID of the partner that has access to the fetched first party and partner audiences. */
  partnerId?: string;
  /** Optional. Requested page size. Must be between `1` and `5000`. If unspecified, this value defaults to `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified. */
  pageSize?: number;
  /** The ID of the advertiser that has access to the fetched first party and partner audiences. */
  advertiserId?: string;
  /** Optional. Field by which to sort the list. Acceptable values are: * `FirstPartyAndPartnerAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`. */
  orderBy?: string;
  /** Optional. Allows filtering by first party and partner audience fields. Supported syntax: * Filter expressions for first party and partner audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All first party and partner audiences for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information. */
  filter?: string;
  /** Optional. A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListFirstPartyAndPartnerAudiences` method. If not specified, the first page of results will be returned. */
  pageToken?: string;
}

export const ListFirstPartyAndPartnerAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partnerId: Schema.optional(Schema.String).pipe(T.HttpQuery("partnerId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v4/firstPartyAndPartnerAudiences" }),
    svc,
  ) as unknown as Schema.Schema<ListFirstPartyAndPartnerAudiencesRequest>;

export type ListFirstPartyAndPartnerAudiencesResponse_Op =
  ListFirstPartyAndPartnerAudiencesResponse;
export const ListFirstPartyAndPartnerAudiencesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListFirstPartyAndPartnerAudiencesResponse;

export type ListFirstPartyAndPartnerAudiencesError = DefaultErrors;

/** Lists first party and partner audiences. The order is defined by the order_by parameter. */
export const listFirstPartyAndPartnerAudiences: API.PaginatedOperationMethod<
  ListFirstPartyAndPartnerAudiencesRequest,
  ListFirstPartyAndPartnerAudiencesResponse_Op,
  ListFirstPartyAndPartnerAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirstPartyAndPartnerAudiencesRequest,
  output: ListFirstPartyAndPartnerAudiencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchFirstPartyAndPartnerAudiencesRequest {
  /** Required. The mask to control which fields to update. Updates are only supported for the following fields: * `displayName` * `description` * `membershipDurationDays` */
  updateMask?: string;
  /** Identifier. The unique ID of the first party and partner audience. Assigned by the system. */
  firstPartyAndPartnerAudienceId: string;
  /** Required. The ID of the owner advertiser of the updated FirstPartyAndPartnerAudience. */
  advertiserId?: string;
  /** Request body */
  body?: FirstPartyAndPartnerAudience;
}

export const PatchFirstPartyAndPartnerAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    firstPartyAndPartnerAudienceId: Schema.String.pipe(
      T.HttpPath("firstPartyAndPartnerAudienceId"),
    ),
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(FirstPartyAndPartnerAudience).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v4/firstPartyAndPartnerAudiences/{firstPartyAndPartnerAudiencesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchFirstPartyAndPartnerAudiencesRequest>;

export type PatchFirstPartyAndPartnerAudiencesResponse =
  FirstPartyAndPartnerAudience;
export const PatchFirstPartyAndPartnerAudiencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ FirstPartyAndPartnerAudience;

export type PatchFirstPartyAndPartnerAudiencesError = DefaultErrors;

/** Updates an existing FirstPartyAndPartnerAudience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
export const patchFirstPartyAndPartnerAudiences: API.OperationMethod<
  PatchFirstPartyAndPartnerAudiencesRequest,
  PatchFirstPartyAndPartnerAudiencesResponse,
  PatchFirstPartyAndPartnerAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchFirstPartyAndPartnerAudiencesRequest,
  output: PatchFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

export interface CreateFirstPartyAndPartnerAudiencesRequest {
  /** Required. The ID of the advertiser under whom the FirstPartyAndPartnerAudience will be created. */
  advertiserId?: string;
  /** Request body */
  body?: FirstPartyAndPartnerAudience;
}

export const CreateFirstPartyAndPartnerAudiencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    advertiserId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("advertiserId"),
    ),
    body: Schema.optional(FirstPartyAndPartnerAudience).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v4/firstPartyAndPartnerAudiences",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateFirstPartyAndPartnerAudiencesRequest>;

export type CreateFirstPartyAndPartnerAudiencesResponse =
  FirstPartyAndPartnerAudience;
export const CreateFirstPartyAndPartnerAudiencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ FirstPartyAndPartnerAudience;

export type CreateFirstPartyAndPartnerAudiencesError = DefaultErrors;

/** Creates a FirstPartyAndPartnerAudience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID` */
export const createFirstPartyAndPartnerAudiences: API.OperationMethod<
  CreateFirstPartyAndPartnerAudiencesRequest,
  CreateFirstPartyAndPartnerAudiencesResponse,
  CreateFirstPartyAndPartnerAudiencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFirstPartyAndPartnerAudiencesRequest,
  output: CreateFirstPartyAndPartnerAudiencesResponse,
  errors: [],
}));

export interface UploadMediaRequest {
  /** Name of the media that is being downloaded. See ReadRequest.resource_name. */
  resourceName: string;
  /** Request body */
  body?: GoogleBytestreamMedia;
}

export const UploadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
  body: Schema.optional(GoogleBytestreamMedia).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "media/{mediaId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = GoogleBytestreamMedia;
export const UploadMediaResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleBytestreamMedia;

export type UploadMediaError = DefaultErrors;

/** Uploads media. Upload is supported on the URI `/upload/media/{resource_name=**}?upload_type=media.` **Note**: Upload requests will not be successful without including `upload_type=media` query string. */
export const uploadMedia: API.OperationMethod<
  UploadMediaRequest,
  UploadMediaResponse,
  UploadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

export interface DownloadMediaRequest {
  /** Name of the media that is being downloaded. See ReadRequest.resource_name. */
  resourceName: string;
}

export const DownloadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "download/{downloadId}" }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = GoogleBytestreamMedia;
export const DownloadMediaResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleBytestreamMedia;

export type DownloadMediaError = DefaultErrors;

/** Downloads media. Download is supported on the URI `/download/{resource_name=**}?alt=media.` **Note**: Download requests will not be successful without including `alt=media` query string. */
export const downloadMedia: API.OperationMethod<
  DownloadMediaRequest,
  DownloadMediaResponse,
  DownloadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));
