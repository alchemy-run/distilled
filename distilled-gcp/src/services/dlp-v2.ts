// ==========================================================================
// Sensitive Data Protection (DLP) (dlp v2)
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
  name: "dlp",
  version: "v2",
  rootUrl: "https://dlp.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GooglePrivacyDlpV2SensitivityScore {
  /** The sensitivity score applied to the resource. */
  score?: "SENSITIVITY_SCORE_UNSPECIFIED" | "SENSITIVITY_LOW" | "SENSITIVITY_UNKNOWN" | "SENSITIVITY_MODERATE" | "SENSITIVITY_HIGH" | (string & {});
}

export const GooglePrivacyDlpV2SensitivityScore: Schema.Schema<GooglePrivacyDlpV2SensitivityScore> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2SensitivityScore" }) as any as Schema.Schema<GooglePrivacyDlpV2SensitivityScore>;

export interface GooglePrivacyDlpV2InfoType {
  /** Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`. */
  name?: string;
  /** Optional version name for this InfoType. */
  version?: string;
  /** Optional custom sensitivity for this InfoType. This only applies to data profiling. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
}

export const GooglePrivacyDlpV2InfoType: Schema.Schema<GooglePrivacyDlpV2InfoType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoType" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoType>;

export interface GooglePrivacyDlpV2InfoTypeLikelihood {
  /** Type of information the likelihood threshold applies to. Only one likelihood per info_type should be provided. If InfoTypeLikelihood does not have an info_type, the configuration fails. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Only returns findings equal to or above this threshold. This field is required or else the configuration fails. */
  minLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GooglePrivacyDlpV2InfoTypeLikelihood: Schema.Schema<GooglePrivacyDlpV2InfoTypeLikelihood> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  minLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeLikelihood" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeLikelihood>;

export interface GooglePrivacyDlpV2InfoTypeLimit {
  /** Type of information the findings limit applies to. Only one limit per info_type should be provided. If InfoTypeLimit does not have an info_type, the DLP API applies the limit against all info_types that are found but not specified in another InfoTypeLimit. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Max findings limit for the given infoType. */
  maxFindings?: number;
}

export const GooglePrivacyDlpV2InfoTypeLimit: Schema.Schema<GooglePrivacyDlpV2InfoTypeLimit> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  maxFindings: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeLimit" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeLimit>;

export interface GooglePrivacyDlpV2FindingLimits {
  /** Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value. */
  maxFindingsPerItem?: number;
  /** Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value. */
  maxFindingsPerRequest?: number;
  /** Configuration of findings limit given for specified infoTypes. */
  maxFindingsPerInfoType?: Array<GooglePrivacyDlpV2InfoTypeLimit>;
}

export const GooglePrivacyDlpV2FindingLimits: Schema.Schema<GooglePrivacyDlpV2FindingLimits> = Schema.suspend(() => Schema.Struct({
  maxFindingsPerItem: Schema.optional(Schema.Number),
  maxFindingsPerRequest: Schema.optional(Schema.Number),
  maxFindingsPerInfoType: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeLimit)),
})).annotate({ identifier: "GooglePrivacyDlpV2FindingLimits" }) as any as Schema.Schema<GooglePrivacyDlpV2FindingLimits>;

export interface GooglePrivacyDlpV2WordList {
  /** Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required] */
  words?: Array<string>;
}

export const GooglePrivacyDlpV2WordList: Schema.Schema<GooglePrivacyDlpV2WordList> = Schema.suspend(() => Schema.Struct({
  words: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2WordList" }) as any as Schema.Schema<GooglePrivacyDlpV2WordList>;

export interface GooglePrivacyDlpV2CloudStoragePath {
  /** A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt` */
  path?: string;
}

export const GooglePrivacyDlpV2CloudStoragePath: Schema.Schema<GooglePrivacyDlpV2CloudStoragePath> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStoragePath" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStoragePath>;

export interface GooglePrivacyDlpV2Dictionary {
  /** List of words or phrases to search for. */
  wordList?: GooglePrivacyDlpV2WordList;
  /** Newline-delimited file of words in Cloud Storage. Only a single file is accepted. */
  cloudStoragePath?: GooglePrivacyDlpV2CloudStoragePath;
}

export const GooglePrivacyDlpV2Dictionary: Schema.Schema<GooglePrivacyDlpV2Dictionary> = Schema.suspend(() => Schema.Struct({
  wordList: Schema.optional(GooglePrivacyDlpV2WordList),
  cloudStoragePath: Schema.optional(GooglePrivacyDlpV2CloudStoragePath),
})).annotate({ identifier: "GooglePrivacyDlpV2Dictionary" }) as any as Schema.Schema<GooglePrivacyDlpV2Dictionary>;

export interface GooglePrivacyDlpV2Regex {
  /** Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub. */
  pattern?: string;
  /** The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included. */
  groupIndexes?: Array<number>;
}

export const GooglePrivacyDlpV2Regex: Schema.Schema<GooglePrivacyDlpV2Regex> = Schema.suspend(() => Schema.Struct({
  pattern: Schema.optional(Schema.String),
  groupIndexes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GooglePrivacyDlpV2Regex" }) as any as Schema.Schema<GooglePrivacyDlpV2Regex>;

export interface GooglePrivacyDlpV2SurrogateType {
}

export const GooglePrivacyDlpV2SurrogateType: Schema.Schema<GooglePrivacyDlpV2SurrogateType> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2SurrogateType" }) as any as Schema.Schema<GooglePrivacyDlpV2SurrogateType>;

export interface GooglePrivacyDlpV2StoredType {
  /** Resource name of the requested `StoredInfoType`, for example `organizations/433245324/storedInfoTypes/432452342` or `projects/project-id/storedInfoTypes/432452342`. */
  name?: string;
  /** Timestamp indicating when the version of the `StoredInfoType` used for inspection was created. Output-only field, populated by the system. */
  createTime?: string;
}

export const GooglePrivacyDlpV2StoredType: Schema.Schema<GooglePrivacyDlpV2StoredType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2StoredType" }) as any as Schema.Schema<GooglePrivacyDlpV2StoredType>;

export interface GooglePrivacyDlpV2Proximity {
  /** Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values). */
  windowBefore?: number;
  /** Number of characters after the finding to consider. */
  windowAfter?: number;
}

export const GooglePrivacyDlpV2Proximity: Schema.Schema<GooglePrivacyDlpV2Proximity> = Schema.suspend(() => Schema.Struct({
  windowBefore: Schema.optional(Schema.Number),
  windowAfter: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2Proximity" }) as any as Schema.Schema<GooglePrivacyDlpV2Proximity>;

export interface GooglePrivacyDlpV2LikelihoodAdjustment {
  /** Set the likelihood of a finding to a fixed value. */
  fixedLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`. */
  relativeLikelihood?: number;
}

export const GooglePrivacyDlpV2LikelihoodAdjustment: Schema.Schema<GooglePrivacyDlpV2LikelihoodAdjustment> = Schema.suspend(() => Schema.Struct({
  fixedLikelihood: Schema.optional(Schema.String),
  relativeLikelihood: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2LikelihoodAdjustment" }) as any as Schema.Schema<GooglePrivacyDlpV2LikelihoodAdjustment>;

export interface GooglePrivacyDlpV2HotwordRule {
  /** Regular expression pattern defining what qualifies as a hotword. */
  hotwordRegex?: GooglePrivacyDlpV2Regex;
  /** Range of characters within which the entire hotword must reside. The total length of the window cannot exceed 1000 characters. The finding itself will be included in the window, so that hotwords can be used to match substrings of the finding itself. Suppose you want Cloud DLP to promote the likelihood of the phone number regex "\(\d{3}\) \d{3}-\d{4}" if the area code is known to be the area code of a company's office. In this case, use the hotword regex "\(xxx\)", where "xxx" is the area code in question. For tabular data, if you want to modify the likelihood of an entire column of findngs, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values). */
  proximity?: GooglePrivacyDlpV2Proximity;
  /** Likelihood adjustment to apply to all matching findings. */
  likelihoodAdjustment?: GooglePrivacyDlpV2LikelihoodAdjustment;
}

export const GooglePrivacyDlpV2HotwordRule: Schema.Schema<GooglePrivacyDlpV2HotwordRule> = Schema.suspend(() => Schema.Struct({
  hotwordRegex: Schema.optional(GooglePrivacyDlpV2Regex),
  proximity: Schema.optional(GooglePrivacyDlpV2Proximity),
  likelihoodAdjustment: Schema.optional(GooglePrivacyDlpV2LikelihoodAdjustment),
})).annotate({ identifier: "GooglePrivacyDlpV2HotwordRule" }) as any as Schema.Schema<GooglePrivacyDlpV2HotwordRule>;

export interface GooglePrivacyDlpV2DetectionRule {
  /** Hotword-based detection rule. */
  hotwordRule?: GooglePrivacyDlpV2HotwordRule;
}

export const GooglePrivacyDlpV2DetectionRule: Schema.Schema<GooglePrivacyDlpV2DetectionRule> = Schema.suspend(() => Schema.Struct({
  hotwordRule: Schema.optional(GooglePrivacyDlpV2HotwordRule),
})).annotate({ identifier: "GooglePrivacyDlpV2DetectionRule" }) as any as Schema.Schema<GooglePrivacyDlpV2DetectionRule>;

export interface GooglePrivacyDlpV2CustomInfoType {
  /** CustomInfoType can either be a new infoType, or an extension of built-in infoType, when the name matches one of existing infoTypes and that infoType is specified in `InspectContent.info_types` field. Specifying the latter adds findings to the one detected by the system. If built-in info type is not specified in `InspectContent.info_types` list then the name is treated as a custom info type. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified. */
  likelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** A list of phrases to detect as a CustomInfoType. */
  dictionary?: GooglePrivacyDlpV2Dictionary;
  /** Regular expression based CustomInfoType. */
  regex?: GooglePrivacyDlpV2Regex;
  /** Message for detecting output from deidentification transformations that support reversing. */
  surrogateType?: GooglePrivacyDlpV2SurrogateType;
  /** Loads an existing `StoredInfoType` resource. */
  storedType?: GooglePrivacyDlpV2StoredType;
  /** Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in order that they are specified. Not supported for the `surrogate_type`, `metadata_key_value_expression`, and `prompt` CustomInfoType. */
  detectionRules?: Array<GooglePrivacyDlpV2DetectionRule>;
  /** If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Not supported for the `metadata_key_value_expression` and `prompt` CustomInfoType. */
  exclusionType?: "EXCLUSION_TYPE_UNSPECIFIED" | "EXCLUSION_TYPE_EXCLUDE" | (string & {});
  /** Sensitivity for this CustomInfoType. If this CustomInfoType extends an existing InfoType, the sensitivity here will take precedence over that of the original InfoType. If unset for a CustomInfoType, it will default to HIGH. This only applies to data profiling. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
}

export const GooglePrivacyDlpV2CustomInfoType: Schema.Schema<GooglePrivacyDlpV2CustomInfoType> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  likelihood: Schema.optional(Schema.String),
  dictionary: Schema.optional(GooglePrivacyDlpV2Dictionary),
  regex: Schema.optional(GooglePrivacyDlpV2Regex),
  surrogateType: Schema.optional(GooglePrivacyDlpV2SurrogateType),
  storedType: Schema.optional(GooglePrivacyDlpV2StoredType),
  detectionRules: Schema.optional(Schema.Array(GooglePrivacyDlpV2DetectionRule)),
  exclusionType: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
})).annotate({ identifier: "GooglePrivacyDlpV2CustomInfoType" }) as any as Schema.Schema<GooglePrivacyDlpV2CustomInfoType>;

export interface GooglePrivacyDlpV2ExcludeInfoTypes {
  /** InfoType list in ExclusionRule rule drops a finding when it overlaps or contained within with a finding of an infoType from this list. For example, for `InspectionRuleSet.info_types` containing "PHONE_NUMBER"` and `exclusion_rule` containing `exclude_info_types.info_types` with "EMAIL_ADDRESS" the phone number findings are dropped if they overlap with EMAIL_ADDRESS finding. That leads to "555-222-2222@example.org" to generate only a single finding, namely email address. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
}

export const GooglePrivacyDlpV2ExcludeInfoTypes: Schema.Schema<GooglePrivacyDlpV2ExcludeInfoTypes> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
})).annotate({ identifier: "GooglePrivacyDlpV2ExcludeInfoTypes" }) as any as Schema.Schema<GooglePrivacyDlpV2ExcludeInfoTypes>;

export interface GooglePrivacyDlpV2ExcludeByHotword {
  /** Regular expression pattern defining what qualifies as a hotword. */
  hotwordRegex?: GooglePrivacyDlpV2Regex;
  /** Range of characters within which the entire hotword must reside. The total length of the window cannot exceed 1000 characters. The windowBefore property in proximity should be set to 1 if the hotword needs to be included in a column header. */
  proximity?: GooglePrivacyDlpV2Proximity;
}

export const GooglePrivacyDlpV2ExcludeByHotword: Schema.Schema<GooglePrivacyDlpV2ExcludeByHotword> = Schema.suspend(() => Schema.Struct({
  hotwordRegex: Schema.optional(GooglePrivacyDlpV2Regex),
  proximity: Schema.optional(GooglePrivacyDlpV2Proximity),
})).annotate({ identifier: "GooglePrivacyDlpV2ExcludeByHotword" }) as any as Schema.Schema<GooglePrivacyDlpV2ExcludeByHotword>;

export interface GooglePrivacyDlpV2Encloses {
}

export const GooglePrivacyDlpV2Encloses: Schema.Schema<GooglePrivacyDlpV2Encloses> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2Encloses" }) as any as Schema.Schema<GooglePrivacyDlpV2Encloses>;

export interface GooglePrivacyDlpV2FullyInside {
}

export const GooglePrivacyDlpV2FullyInside: Schema.Schema<GooglePrivacyDlpV2FullyInside> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2FullyInside" }) as any as Schema.Schema<GooglePrivacyDlpV2FullyInside>;

export interface GooglePrivacyDlpV2Overlap {
}

export const GooglePrivacyDlpV2Overlap: Schema.Schema<GooglePrivacyDlpV2Overlap> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2Overlap" }) as any as Schema.Schema<GooglePrivacyDlpV2Overlap>;

export interface GooglePrivacyDlpV2ImageContainmentType {
  /** The context finding's bounding box must fully contain the target finding's bounding box. */
  encloses?: GooglePrivacyDlpV2Encloses;
  /** The context finding's bounding box must be fully inside the target finding's bounding box. */
  fullyInside?: GooglePrivacyDlpV2FullyInside;
  /** The context finding's bounding box and the target finding's bounding box must have a non-zero intersection. */
  overlaps?: GooglePrivacyDlpV2Overlap;
}

export const GooglePrivacyDlpV2ImageContainmentType: Schema.Schema<GooglePrivacyDlpV2ImageContainmentType> = Schema.suspend(() => Schema.Struct({
  encloses: Schema.optional(GooglePrivacyDlpV2Encloses),
  fullyInside: Schema.optional(GooglePrivacyDlpV2FullyInside),
  overlaps: Schema.optional(GooglePrivacyDlpV2Overlap),
})).annotate({ identifier: "GooglePrivacyDlpV2ImageContainmentType" }) as any as Schema.Schema<GooglePrivacyDlpV2ImageContainmentType>;

export interface GooglePrivacyDlpV2ExcludeByImageFindings {
  /** A list of image-supported infoTypes—excluding [document infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#documents)—to be used as context for the exclusion rule. A finding is excluded if its bounding box has the specified spatial relationship (defined by `image_containment_type`) with a finding of an infoType in this list. For example, if `InspectionRuleSet.info_types` includes `OBJECT_TYPE/PERSON` and this `exclusion_rule` specifies `info_types` as `OBJECT_TYPE/PERSON/PASSPORT` with `image_containment_type` set to `encloses`, then `OBJECT_TYPE/PERSON` findings will be excluded if they are fully contained within the bounding box of an `OBJECT_TYPE/PERSON/PASSPORT` finding. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
  /** Specifies the required spatial relationship between the bounding boxes of the target finding and the context infoType findings. */
  imageContainmentType?: GooglePrivacyDlpV2ImageContainmentType;
}

export const GooglePrivacyDlpV2ExcludeByImageFindings: Schema.Schema<GooglePrivacyDlpV2ExcludeByImageFindings> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
  imageContainmentType: Schema.optional(GooglePrivacyDlpV2ImageContainmentType),
})).annotate({ identifier: "GooglePrivacyDlpV2ExcludeByImageFindings" }) as any as Schema.Schema<GooglePrivacyDlpV2ExcludeByImageFindings>;

export interface GooglePrivacyDlpV2ExclusionRule {
  /** Dictionary which defines the rule. */
  dictionary?: GooglePrivacyDlpV2Dictionary;
  /** Regular expression which defines the rule. */
  regex?: GooglePrivacyDlpV2Regex;
  /** Set of infoTypes for which findings would affect this rule. */
  excludeInfoTypes?: GooglePrivacyDlpV2ExcludeInfoTypes;
  /** Drop if the hotword rule is contained in the proximate context. For tabular data, the context includes the column name. */
  excludeByHotword?: GooglePrivacyDlpV2ExcludeByHotword;
  /** Exclude findings based on image containment rules. For example, exclude an image finding if it overlaps with another image finding. */
  excludeByImageFindings?: GooglePrivacyDlpV2ExcludeByImageFindings;
  /** How the rule is applied, see MatchingType documentation for details. */
  matchingType?: "MATCHING_TYPE_UNSPECIFIED" | "MATCHING_TYPE_FULL_MATCH" | "MATCHING_TYPE_PARTIAL_MATCH" | "MATCHING_TYPE_INVERSE_MATCH" | "MATCHING_TYPE_RULE_SPECIFIC" | (string & {});
}

export const GooglePrivacyDlpV2ExclusionRule: Schema.Schema<GooglePrivacyDlpV2ExclusionRule> = Schema.suspend(() => Schema.Struct({
  dictionary: Schema.optional(GooglePrivacyDlpV2Dictionary),
  regex: Schema.optional(GooglePrivacyDlpV2Regex),
  excludeInfoTypes: Schema.optional(GooglePrivacyDlpV2ExcludeInfoTypes),
  excludeByHotword: Schema.optional(GooglePrivacyDlpV2ExcludeByHotword),
  excludeByImageFindings: Schema.optional(GooglePrivacyDlpV2ExcludeByImageFindings),
  matchingType: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ExclusionRule" }) as any as Schema.Schema<GooglePrivacyDlpV2ExclusionRule>;

export interface GooglePrivacyDlpV2AdjustByMatchingInfoTypes {
  /** Sensitive Data Protection adjusts the likelihood of a finding if that finding also matches one of these infoTypes. For example, you can create a rule to adjust the likelihood of a `PHONE_NUMBER` finding if the string is found within a document that is classified as `DOCUMENT_TYPE/HR/RESUME`. To configure this, set `PHONE_NUMBER` in `InspectionRuleSet.info_types`. Add an `adjustment_rule` with an `adjust_by_matching_info_types.info_types` that contains `DOCUMENT_TYPE/HR/RESUME`. In this case, the likelihood of the `PHONE_NUMBER` finding is adjusted, but the likelihood of the `DOCUMENT_TYPE/HR/RESUME` finding is not. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
  /** Required. Minimum likelihood of the `adjust_by_matching_info_types.info_types` finding. If the likelihood is lower than this value, Sensitive Data Protection doesn't adjust the likelihood of the `InspectionRuleSet.info_types` finding. */
  minLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** How the adjustment rule is applied. Only MATCHING_TYPE_PARTIAL_MATCH is supported: - Partial match: adjusts the findings of infoTypes specified in the inspection rule when they have a nonempty intersection with a finding of an infoType specified in this adjustment rule. */
  matchingType?: "MATCHING_TYPE_UNSPECIFIED" | "MATCHING_TYPE_FULL_MATCH" | "MATCHING_TYPE_PARTIAL_MATCH" | "MATCHING_TYPE_INVERSE_MATCH" | "MATCHING_TYPE_RULE_SPECIFIC" | (string & {});
}

export const GooglePrivacyDlpV2AdjustByMatchingInfoTypes: Schema.Schema<GooglePrivacyDlpV2AdjustByMatchingInfoTypes> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
  minLikelihood: Schema.optional(Schema.String),
  matchingType: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2AdjustByMatchingInfoTypes" }) as any as Schema.Schema<GooglePrivacyDlpV2AdjustByMatchingInfoTypes>;

export interface GooglePrivacyDlpV2AdjustByImageFindings {
  /** A list of image-supported infoTypes—excluding [document infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#documents)—to be used as context for the adjustment rule. Sensitive Data Protection adjusts the likelihood of an image finding if its bounding box has the specified spatial relationship (defined by `image_containment_type`) with a finding of an infoType in this list. For example, you can create a rule to adjust the likelihood of a `US_PASSPORT` finding if it is enclosed by a finding of `OBJECT_TYPE/PERSON/PASSPORT`. To configure this, set `US_PASSPORT` in `InspectionRuleSet.info_types`. Add an `adjustment_rule` with an `adjust_by_image_findings.info_types` that contains `OBJECT_TYPE/PERSON/PASSPORT` and `image_containment_type` set to `encloses`. In this case, the likelihood of the `US_PASSPORT` finding is adjusted, but the likelihood of the `OBJECT_TYPE/PERSON/PASSPORT` finding is not. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
  /** Required. Minimum likelihood of the `adjust_by_image_findings.info_types` finding. If the likelihood is lower than this value, Sensitive Data Protection doesn't adjust the likelihood of the `InspectionRuleSet.info_types` finding. */
  minLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Specifies the required spatial relationship between the bounding boxes of the target finding and the context infoType findings. */
  imageContainmentType?: GooglePrivacyDlpV2ImageContainmentType;
}

export const GooglePrivacyDlpV2AdjustByImageFindings: Schema.Schema<GooglePrivacyDlpV2AdjustByImageFindings> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
  minLikelihood: Schema.optional(Schema.String),
  imageContainmentType: Schema.optional(GooglePrivacyDlpV2ImageContainmentType),
})).annotate({ identifier: "GooglePrivacyDlpV2AdjustByImageFindings" }) as any as Schema.Schema<GooglePrivacyDlpV2AdjustByImageFindings>;

export interface GooglePrivacyDlpV2AdjustmentRule {
  /** Set of infoTypes for which findings would affect this rule. */
  adjustByMatchingInfoTypes?: GooglePrivacyDlpV2AdjustByMatchingInfoTypes;
  /** AdjustmentRule condition for image findings. */
  adjustByImageFindings?: GooglePrivacyDlpV2AdjustByImageFindings;
  /** Likelihood adjustment to apply to the infoType. */
  likelihoodAdjustment?: GooglePrivacyDlpV2LikelihoodAdjustment;
}

export const GooglePrivacyDlpV2AdjustmentRule: Schema.Schema<GooglePrivacyDlpV2AdjustmentRule> = Schema.suspend(() => Schema.Struct({
  adjustByMatchingInfoTypes: Schema.optional(GooglePrivacyDlpV2AdjustByMatchingInfoTypes),
  adjustByImageFindings: Schema.optional(GooglePrivacyDlpV2AdjustByImageFindings),
  likelihoodAdjustment: Schema.optional(GooglePrivacyDlpV2LikelihoodAdjustment),
})).annotate({ identifier: "GooglePrivacyDlpV2AdjustmentRule" }) as any as Schema.Schema<GooglePrivacyDlpV2AdjustmentRule>;

export interface GooglePrivacyDlpV2InspectionRule {
  /** Hotword-based detection rule. */
  hotwordRule?: GooglePrivacyDlpV2HotwordRule;
  /** Exclusion rule. */
  exclusionRule?: GooglePrivacyDlpV2ExclusionRule;
  /** Adjustment rule. */
  adjustmentRule?: GooglePrivacyDlpV2AdjustmentRule;
}

export const GooglePrivacyDlpV2InspectionRule: Schema.Schema<GooglePrivacyDlpV2InspectionRule> = Schema.suspend(() => Schema.Struct({
  hotwordRule: Schema.optional(GooglePrivacyDlpV2HotwordRule),
  exclusionRule: Schema.optional(GooglePrivacyDlpV2ExclusionRule),
  adjustmentRule: Schema.optional(GooglePrivacyDlpV2AdjustmentRule),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectionRule" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectionRule>;

export interface GooglePrivacyDlpV2InspectionRuleSet {
  /** List of infoTypes this rule set is applied to. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
  /** Set of rules to be applied to infoTypes. The rules are applied in order. */
  rules?: Array<GooglePrivacyDlpV2InspectionRule>;
}

export const GooglePrivacyDlpV2InspectionRuleSet: Schema.Schema<GooglePrivacyDlpV2InspectionRuleSet> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
  rules: Schema.optional(Schema.Array(GooglePrivacyDlpV2InspectionRule)),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectionRuleSet" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectionRuleSet>;

export interface GooglePrivacyDlpV2InspectConfig {
  /** Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
  /** Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood). */
  minLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood. */
  minLikelihoodPerInfoType?: Array<GooglePrivacyDlpV2InfoTypeLikelihood>;
  /** Configuration to control the number of findings returned. This is not used for data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error. When set within an InspectJobConfig, the specified maximum values aren't hard limits. If an inspection job reaches these limits, the job ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than these maximum values. */
  limits?: GooglePrivacyDlpV2FindingLimits;
  /** When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling. */
  includeQuote?: boolean;
  /** When true, excludes type information of the findings. This is not used for data profiling. */
  excludeInfoTypes?: boolean;
  /** CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more. */
  customInfoTypes?: Array<GooglePrivacyDlpV2CustomInfoType>;
  /** Deprecated and unused. */
  contentOptions?: Array<"CONTENT_UNSPECIFIED" | "CONTENT_TEXT" | "CONTENT_IMAGE" | (string & {})>;
  /** Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. */
  ruleSet?: Array<GooglePrivacyDlpV2InspectionRuleSet>;
}

export const GooglePrivacyDlpV2InspectConfig: Schema.Schema<GooglePrivacyDlpV2InspectConfig> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
  minLikelihood: Schema.optional(Schema.String),
  minLikelihoodPerInfoType: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeLikelihood)),
  limits: Schema.optional(GooglePrivacyDlpV2FindingLimits),
  includeQuote: Schema.optional(Schema.Boolean),
  excludeInfoTypes: Schema.optional(Schema.Boolean),
  customInfoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2CustomInfoType)),
  contentOptions: Schema.optional(Schema.Array(Schema.String)),
  ruleSet: Schema.optional(Schema.Array(GooglePrivacyDlpV2InspectionRuleSet)),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectConfig>;

export interface GooglePrivacyDlpV2FieldId {
  /** Name describing the field. */
  name?: string;
}

export const GooglePrivacyDlpV2FieldId: Schema.Schema<GooglePrivacyDlpV2FieldId> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2FieldId" }) as any as Schema.Schema<GooglePrivacyDlpV2FieldId>;

export interface GoogleTypeTimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const GoogleTypeTimeOfDay: Schema.Schema<GoogleTypeTimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeTimeOfDay" }) as any as Schema.Schema<GoogleTypeTimeOfDay>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GooglePrivacyDlpV2Value {
  /** integer */
  integerValue?: string;
  /** float */
  floatValue?: number;
  /** string */
  stringValue?: string;
  /** boolean */
  booleanValue?: boolean;
  /** timestamp */
  timestampValue?: string;
  /** time of day */
  timeValue?: GoogleTypeTimeOfDay;
  /** date */
  dateValue?: GoogleTypeDate;
  /** day of week */
  dayOfWeekValue?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const GooglePrivacyDlpV2Value: Schema.Schema<GooglePrivacyDlpV2Value> = Schema.suspend(() => Schema.Struct({
  integerValue: Schema.optional(Schema.String),
  floatValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
  booleanValue: Schema.optional(Schema.Boolean),
  timestampValue: Schema.optional(Schema.String),
  timeValue: Schema.optional(GoogleTypeTimeOfDay),
  dateValue: Schema.optional(GoogleTypeDate),
  dayOfWeekValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Value" }) as any as Schema.Schema<GooglePrivacyDlpV2Value>;

export interface GooglePrivacyDlpV2Row {
  /** Individual cells. */
  values?: Array<GooglePrivacyDlpV2Value>;
}

export const GooglePrivacyDlpV2Row: Schema.Schema<GooglePrivacyDlpV2Row> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(GooglePrivacyDlpV2Value)),
})).annotate({ identifier: "GooglePrivacyDlpV2Row" }) as any as Schema.Schema<GooglePrivacyDlpV2Row>;

export interface GooglePrivacyDlpV2Table {
  /** Headers of the table. */
  headers?: Array<GooglePrivacyDlpV2FieldId>;
  /** Rows of the table. */
  rows?: Array<GooglePrivacyDlpV2Row>;
}

export const GooglePrivacyDlpV2Table: Schema.Schema<GooglePrivacyDlpV2Table> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
  rows: Schema.optional(Schema.Array(GooglePrivacyDlpV2Row)),
})).annotate({ identifier: "GooglePrivacyDlpV2Table" }) as any as Schema.Schema<GooglePrivacyDlpV2Table>;

export interface GooglePrivacyDlpV2ByteContentItem {
  /** The type of data stored in the bytes string. Default will be TEXT_UTF8. */
  type?: "BYTES_TYPE_UNSPECIFIED" | "IMAGE" | "IMAGE_JPEG" | "IMAGE_BMP" | "IMAGE_PNG" | "IMAGE_SVG" | "TEXT_UTF8" | "WORD_DOCUMENT" | "PDF" | "POWERPOINT_DOCUMENT" | "EXCEL_DOCUMENT" | "AVRO" | "CSV" | "TSV" | "AUDIO" | "VIDEO" | "EXECUTABLE" | "AI_MODEL" | (string & {});
  /** Content data to inspect or redact. */
  data?: string;
}

export const GooglePrivacyDlpV2ByteContentItem: Schema.Schema<GooglePrivacyDlpV2ByteContentItem> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ByteContentItem" }) as any as Schema.Schema<GooglePrivacyDlpV2ByteContentItem>;

export interface GooglePrivacyDlpV2ContentItem {
  /** String data to inspect or redact. */
  value?: string;
  /** Structured content for inspection. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-text#inspecting_a_table to learn more. */
  table?: GooglePrivacyDlpV2Table;
  /** Content data to inspect or redact. Replaces `type` and `data`. */
  byteItem?: GooglePrivacyDlpV2ByteContentItem;
}

export const GooglePrivacyDlpV2ContentItem: Schema.Schema<GooglePrivacyDlpV2ContentItem> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  table: Schema.optional(GooglePrivacyDlpV2Table),
  byteItem: Schema.optional(GooglePrivacyDlpV2ByteContentItem),
})).annotate({ identifier: "GooglePrivacyDlpV2ContentItem" }) as any as Schema.Schema<GooglePrivacyDlpV2ContentItem>;

export interface GooglePrivacyDlpV2InspectContentRequest {
  /** Configuration for the inspector. What specified here will override the template referenced by the inspect_template_name argument. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /** The item to inspect. */
  item?: GooglePrivacyDlpV2ContentItem;
  /** Template to use. Any configuration directly specified in inspect_config will override those set in the template. Singular fields that are set in this request will replace their corresponding fields in the template. Repeated fields are appended. Singular sub-messages and groups are recursively merged. */
  inspectTemplateName?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2InspectContentRequest: Schema.Schema<GooglePrivacyDlpV2InspectContentRequest> = Schema.suspend(() => Schema.Struct({
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
  item: Schema.optional(GooglePrivacyDlpV2ContentItem),
  inspectTemplateName: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectContentRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectContentRequest>;

export interface GooglePrivacyDlpV2Range {
  /** Index of the first character of the range (inclusive). */
  start?: string;
  /** Index of the last character of the range (exclusive). */
  end?: string;
}

export const GooglePrivacyDlpV2Range: Schema.Schema<GooglePrivacyDlpV2Range> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.String),
  end: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Range" }) as any as Schema.Schema<GooglePrivacyDlpV2Range>;

export interface GooglePrivacyDlpV2PartitionId {
  /** The ID of the project to which the entities belong. */
  projectId?: string;
  /** If not empty, the ID of the namespace to which the entities belong. */
  namespaceId?: string;
}

export const GooglePrivacyDlpV2PartitionId: Schema.Schema<GooglePrivacyDlpV2PartitionId> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  namespaceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2PartitionId" }) as any as Schema.Schema<GooglePrivacyDlpV2PartitionId>;

export interface GooglePrivacyDlpV2PathElement {
  /** The kind of the entity. A kind matching regex `__.*__` is reserved/read-only. A kind must not contain more than 1500 bytes when UTF-8 encoded. Cannot be `""`. */
  kind?: string;
  /** The auto-allocated ID of the entity. Never equal to zero. Values less than zero are discouraged and may not be supported in the future. */
  id?: string;
  /** The name of the entity. A name matching regex `__.*__` is reserved/read-only. A name must not be more than 1500 bytes when UTF-8 encoded. Cannot be `""`. */
  name?: string;
}

export const GooglePrivacyDlpV2PathElement: Schema.Schema<GooglePrivacyDlpV2PathElement> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2PathElement" }) as any as Schema.Schema<GooglePrivacyDlpV2PathElement>;

export interface GooglePrivacyDlpV2Key {
  /** Entities are partitioned into subsets, currently identified by a project ID and namespace ID. Queries are scoped to a single partition. */
  partitionId?: GooglePrivacyDlpV2PartitionId;
  /** The entity path. An entity path consists of one or more elements composed of a kind and a string or numerical identifier, which identify entities. The first element identifies a _root entity_, the second element identifies a _child_ of the root entity, the third element identifies a child of the second entity, and so forth. The entities identified by all prefixes of the path are called the element's _ancestors_. A path can never be empty, and a path can have at most 100 elements. */
  path?: Array<GooglePrivacyDlpV2PathElement>;
}

export const GooglePrivacyDlpV2Key: Schema.Schema<GooglePrivacyDlpV2Key> = Schema.suspend(() => Schema.Struct({
  partitionId: Schema.optional(GooglePrivacyDlpV2PartitionId),
  path: Schema.optional(Schema.Array(GooglePrivacyDlpV2PathElement)),
})).annotate({ identifier: "GooglePrivacyDlpV2Key" }) as any as Schema.Schema<GooglePrivacyDlpV2Key>;

export interface GooglePrivacyDlpV2DatastoreKey {
  /** Datastore entity key. */
  entityKey?: GooglePrivacyDlpV2Key;
}

export const GooglePrivacyDlpV2DatastoreKey: Schema.Schema<GooglePrivacyDlpV2DatastoreKey> = Schema.suspend(() => Schema.Struct({
  entityKey: Schema.optional(GooglePrivacyDlpV2Key),
})).annotate({ identifier: "GooglePrivacyDlpV2DatastoreKey" }) as any as Schema.Schema<GooglePrivacyDlpV2DatastoreKey>;

export interface GooglePrivacyDlpV2BigQueryTable {
  /** The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call. */
  projectId?: string;
  /** Dataset ID of the table. */
  datasetId?: string;
  /** Name of the table. */
  tableId?: string;
}

export const GooglePrivacyDlpV2BigQueryTable: Schema.Schema<GooglePrivacyDlpV2BigQueryTable> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryTable" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryTable>;

export interface GooglePrivacyDlpV2BigQueryKey {
  /** Complete BigQuery table reference. */
  tableReference?: GooglePrivacyDlpV2BigQueryTable;
  /** Row number inferred at the time the table was scanned. This value is nondeterministic, cannot be queried, and may be null for inspection jobs. To locate findings within a table, specify `inspect_job.storage_config.big_query_options.identifying_fields` in `CreateDlpJobRequest`. */
  rowNumber?: string;
}

export const GooglePrivacyDlpV2BigQueryKey: Schema.Schema<GooglePrivacyDlpV2BigQueryKey> = Schema.suspend(() => Schema.Struct({
  tableReference: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  rowNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryKey" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryKey>;

export interface GooglePrivacyDlpV2RecordKey {
  /** BigQuery key */
  datastoreKey?: GooglePrivacyDlpV2DatastoreKey;
  /** Datastore key */
  bigQueryKey?: GooglePrivacyDlpV2BigQueryKey;
  /** Values of identifying columns in the given row. Order of values matches the order of `identifying_fields` specified in the scanning request. */
  idValues?: Array<string>;
}

export const GooglePrivacyDlpV2RecordKey: Schema.Schema<GooglePrivacyDlpV2RecordKey> = Schema.suspend(() => Schema.Struct({
  datastoreKey: Schema.optional(GooglePrivacyDlpV2DatastoreKey),
  bigQueryKey: Schema.optional(GooglePrivacyDlpV2BigQueryKey),
  idValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2RecordKey" }) as any as Schema.Schema<GooglePrivacyDlpV2RecordKey>;

export interface GooglePrivacyDlpV2TableLocation {
  /** The zero-based index of the row where the finding is located. Only populated for resources that have a natural ordering, not BigQuery. In BigQuery, to identify the row a finding came from, populate BigQueryOptions.identifying_fields with your primary key column names and when you store the findings the value of those columns will be stored inside of Finding. */
  rowIndex?: string;
}

export const GooglePrivacyDlpV2TableLocation: Schema.Schema<GooglePrivacyDlpV2TableLocation> = Schema.suspend(() => Schema.Struct({
  rowIndex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TableLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2TableLocation>;

export interface GooglePrivacyDlpV2RecordLocation {
  /** Key of the finding. */
  recordKey?: GooglePrivacyDlpV2RecordKey;
  /** Field id of the field containing the finding. */
  fieldId?: GooglePrivacyDlpV2FieldId;
  /** Location within a `ContentItem.Table`. */
  tableLocation?: GooglePrivacyDlpV2TableLocation;
}

export const GooglePrivacyDlpV2RecordLocation: Schema.Schema<GooglePrivacyDlpV2RecordLocation> = Schema.suspend(() => Schema.Struct({
  recordKey: Schema.optional(GooglePrivacyDlpV2RecordKey),
  fieldId: Schema.optional(GooglePrivacyDlpV2FieldId),
  tableLocation: Schema.optional(GooglePrivacyDlpV2TableLocation),
})).annotate({ identifier: "GooglePrivacyDlpV2RecordLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2RecordLocation>;

export interface GooglePrivacyDlpV2BoundingBox {
  /** Top coordinate of the bounding box. (0,0) is upper left. */
  top?: number;
  /** Left coordinate of the bounding box. (0,0) is upper left. */
  left?: number;
  /** Width of the bounding box in pixels. */
  width?: number;
  /** Height of the bounding box in pixels. */
  height?: number;
}

export const GooglePrivacyDlpV2BoundingBox: Schema.Schema<GooglePrivacyDlpV2BoundingBox> = Schema.suspend(() => Schema.Struct({
  top: Schema.optional(Schema.Number),
  left: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2BoundingBox" }) as any as Schema.Schema<GooglePrivacyDlpV2BoundingBox>;

export interface GooglePrivacyDlpV2ImageLocation {
  /** Bounding boxes locating the pixels within the image containing the finding. */
  boundingBoxes?: Array<GooglePrivacyDlpV2BoundingBox>;
}

export const GooglePrivacyDlpV2ImageLocation: Schema.Schema<GooglePrivacyDlpV2ImageLocation> = Schema.suspend(() => Schema.Struct({
  boundingBoxes: Schema.optional(Schema.Array(GooglePrivacyDlpV2BoundingBox)),
})).annotate({ identifier: "GooglePrivacyDlpV2ImageLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2ImageLocation>;

export interface GooglePrivacyDlpV2DocumentLocation {
  /** Offset of the line, from the beginning of the file, where the finding is located. */
  fileOffset?: string;
}

export const GooglePrivacyDlpV2DocumentLocation: Schema.Schema<GooglePrivacyDlpV2DocumentLocation> = Schema.suspend(() => Schema.Struct({
  fileOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DocumentLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2DocumentLocation>;

export interface GooglePrivacyDlpV2StorageMetadataLabel {
  /** Label name. */
  key?: string;
}

export const GooglePrivacyDlpV2StorageMetadataLabel: Schema.Schema<GooglePrivacyDlpV2StorageMetadataLabel> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2StorageMetadataLabel" }) as any as Schema.Schema<GooglePrivacyDlpV2StorageMetadataLabel>;

export interface GooglePrivacyDlpV2MetadataLocation {
  /** Type of metadata containing the finding. */
  type?: "METADATATYPE_UNSPECIFIED" | "STORAGE_METADATA" | (string & {});
  /** Storage metadata. */
  storageLabel?: GooglePrivacyDlpV2StorageMetadataLabel;
}

export const GooglePrivacyDlpV2MetadataLocation: Schema.Schema<GooglePrivacyDlpV2MetadataLocation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  storageLabel: Schema.optional(GooglePrivacyDlpV2StorageMetadataLabel),
})).annotate({ identifier: "GooglePrivacyDlpV2MetadataLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2MetadataLocation>;

export interface GooglePrivacyDlpV2ContentLocation {
  /** Name of the container where the finding is located. The top level name is the source file name or table name. Names of some common storage containers are formatted as follows: * BigQuery tables: `{project_id}:{dataset_id}.{table_id}` * Cloud Storage files: `gs://{bucket}/{path}` * Datastore namespace: {namespace} Nested names could be absent if the embedded object has no string identifier (for example, an image contained within a document). */
  containerName?: string;
  /** Location within a row or record of a database table. */
  recordLocation?: GooglePrivacyDlpV2RecordLocation;
  /** Location within an image's pixels. */
  imageLocation?: GooglePrivacyDlpV2ImageLocation;
  /** Location data for document files. */
  documentLocation?: GooglePrivacyDlpV2DocumentLocation;
  /** Location within the metadata for inspected content. */
  metadataLocation?: GooglePrivacyDlpV2MetadataLocation;
  /** Finding container modification timestamp, if applicable. For Cloud Storage, this field contains the last file modification timestamp. For a BigQuery table, this field contains the last_modified_time property. For Datastore, this field isn't populated. */
  containerTimestamp?: string;
  /** Finding container version, if available ("generation" for Cloud Storage). */
  containerVersion?: string;
}

export const GooglePrivacyDlpV2ContentLocation: Schema.Schema<GooglePrivacyDlpV2ContentLocation> = Schema.suspend(() => Schema.Struct({
  containerName: Schema.optional(Schema.String),
  recordLocation: Schema.optional(GooglePrivacyDlpV2RecordLocation),
  imageLocation: Schema.optional(GooglePrivacyDlpV2ImageLocation),
  documentLocation: Schema.optional(GooglePrivacyDlpV2DocumentLocation),
  metadataLocation: Schema.optional(GooglePrivacyDlpV2MetadataLocation),
  containerTimestamp: Schema.optional(Schema.String),
  containerVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ContentLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2ContentLocation>;

export interface GooglePrivacyDlpV2Container {
  /** Container type, for example BigQuery or Cloud Storage. */
  type?: string;
  /** Project where the finding was found. Can be different from the project that owns the finding. */
  projectId?: string;
  /** A string representation of the full container name. Examples: - BigQuery: 'Project:DataSetId.TableId' - Cloud Storage: 'gs://Bucket/folders/filename.txt' */
  fullPath?: string;
  /** The root of the container. Examples: - For BigQuery table `project_id:dataset_id.table_id`, the root is `dataset_id` - For Cloud Storage file `gs://bucket/folder/filename.txt`, the root is `gs://bucket` */
  rootPath?: string;
  /** The rest of the path after the root. Examples: - For BigQuery table `project_id:dataset_id.table_id`, the relative path is `table_id` - For Cloud Storage file `gs://bucket/folder/filename.txt`, the relative path is `folder/filename.txt` */
  relativePath?: string;
  /** Findings container modification timestamp, if applicable. For Cloud Storage, this field contains the last file modification timestamp. For a BigQuery table, this field contains the last_modified_time property. For Datastore, this field isn't populated. */
  updateTime?: string;
  /** Findings container version, if available ("generation" for Cloud Storage). */
  version?: string;
}

export const GooglePrivacyDlpV2Container: Schema.Schema<GooglePrivacyDlpV2Container> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  fullPath: Schema.optional(Schema.String),
  rootPath: Schema.optional(Schema.String),
  relativePath: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Container" }) as any as Schema.Schema<GooglePrivacyDlpV2Container>;

export interface GooglePrivacyDlpV2Location {
  /** Zero-based byte offsets delimiting the finding. These are relative to the finding's containing element. Note that when the content is not textual, this references the UTF-8 encoded textual representation of the content. Omitted if content is an image. */
  byteRange?: GooglePrivacyDlpV2Range;
  /** Unicode character offsets delimiting the finding. These are relative to the finding's containing element. Provided when the content is text. */
  codepointRange?: GooglePrivacyDlpV2Range;
  /** List of nested objects pointing to the precise location of the finding within the file or record. */
  contentLocations?: Array<GooglePrivacyDlpV2ContentLocation>;
  /** Information about the container where this finding occurred, if available. */
  container?: GooglePrivacyDlpV2Container;
}

export const GooglePrivacyDlpV2Location: Schema.Schema<GooglePrivacyDlpV2Location> = Schema.suspend(() => Schema.Struct({
  byteRange: Schema.optional(GooglePrivacyDlpV2Range),
  codepointRange: Schema.optional(GooglePrivacyDlpV2Range),
  contentLocations: Schema.optional(Schema.Array(GooglePrivacyDlpV2ContentLocation)),
  container: Schema.optional(GooglePrivacyDlpV2Container),
})).annotate({ identifier: "GooglePrivacyDlpV2Location" }) as any as Schema.Schema<GooglePrivacyDlpV2Location>;

export interface GooglePrivacyDlpV2TimeZone {
  /** Set only if the offset can be determined. Positive for time ahead of UTC. E.g. For "UTC-9", this value is -540. */
  offsetMinutes?: number;
}

export const GooglePrivacyDlpV2TimeZone: Schema.Schema<GooglePrivacyDlpV2TimeZone> = Schema.suspend(() => Schema.Struct({
  offsetMinutes: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2TimeZone" }) as any as Schema.Schema<GooglePrivacyDlpV2TimeZone>;

export interface GooglePrivacyDlpV2DateTime {
  /** One or more of the following must be set. Must be a valid date or time value. */
  date?: GoogleTypeDate;
  /** Day of week */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Time of day */
  time?: GoogleTypeTimeOfDay;
  /** Time zone */
  timeZone?: GooglePrivacyDlpV2TimeZone;
}

export const GooglePrivacyDlpV2DateTime: Schema.Schema<GooglePrivacyDlpV2DateTime> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(GoogleTypeDate),
  dayOfWeek: Schema.optional(Schema.String),
  time: Schema.optional(GoogleTypeTimeOfDay),
  timeZone: Schema.optional(GooglePrivacyDlpV2TimeZone),
})).annotate({ identifier: "GooglePrivacyDlpV2DateTime" }) as any as Schema.Schema<GooglePrivacyDlpV2DateTime>;

export interface GooglePrivacyDlpV2QuoteInfo {
  /** The date time indicated by the quote. */
  dateTime?: GooglePrivacyDlpV2DateTime;
}

export const GooglePrivacyDlpV2QuoteInfo: Schema.Schema<GooglePrivacyDlpV2QuoteInfo> = Schema.suspend(() => Schema.Struct({
  dateTime: Schema.optional(GooglePrivacyDlpV2DateTime),
})).annotate({ identifier: "GooglePrivacyDlpV2QuoteInfo" }) as any as Schema.Schema<GooglePrivacyDlpV2QuoteInfo>;

export interface GooglePrivacyDlpV2Finding {
  /** Resource name in format projects/{project}/locations/{location}/findings/{finding} Populated only when viewing persisted findings. */
  name?: string;
  /** The content that was found. Even if the content is not textual, it may be converted to a textual representation here. Provided if `include_quote` is true and the finding is less than or equal to 4096 bytes long. If the finding exceeds 4096 bytes in length, the quote may be omitted. */
  quote?: string;
  /** The type of content that might have been found. Provided if `excluded_types` is false. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Confidence of how likely it is that the `info_type` is correct. */
  likelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Where the content was found. */
  location?: GooglePrivacyDlpV2Location;
  /** Timestamp when finding was detected. */
  createTime?: string;
  /** Contains data parsed from quotes. Only populated if include_quote was set to true and a supported infoType was requested. Currently supported infoTypes: DATE, DATE_OF_BIRTH and TIME. */
  quoteInfo?: GooglePrivacyDlpV2QuoteInfo;
  /** The job that stored the finding. */
  resourceName?: string;
  /** Job trigger name, if applicable, for this finding. */
  triggerName?: string;
  /** The labels associated with this `Finding`. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment" : "production"` * `"pipeline" : "etl"` */
  labels?: Record<string, string>;
  /** Time the job started that produced this finding. */
  jobCreateTime?: string;
  /** The job that stored the finding. */
  jobName?: string;
  /** The unique finding id. */
  findingId?: string;
}

export const GooglePrivacyDlpV2Finding: Schema.Schema<GooglePrivacyDlpV2Finding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  quote: Schema.optional(Schema.String),
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  likelihood: Schema.optional(Schema.String),
  location: Schema.optional(GooglePrivacyDlpV2Location),
  createTime: Schema.optional(Schema.String),
  quoteInfo: Schema.optional(GooglePrivacyDlpV2QuoteInfo),
  resourceName: Schema.optional(Schema.String),
  triggerName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  jobCreateTime: Schema.optional(Schema.String),
  jobName: Schema.optional(Schema.String),
  findingId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Finding" }) as any as Schema.Schema<GooglePrivacyDlpV2Finding>;

export interface GooglePrivacyDlpV2InspectResult {
  /** List of findings for an item. */
  findings?: Array<GooglePrivacyDlpV2Finding>;
  /** If true, then this item might have more findings than were returned, and the findings returned are an arbitrary subset of all findings. The findings list might be truncated because the input items were too large, or because the server reached the maximum amount of resources allowed for a single API call. For best results, divide the input into smaller batches. */
  findingsTruncated?: boolean;
}

export const GooglePrivacyDlpV2InspectResult: Schema.Schema<GooglePrivacyDlpV2InspectResult> = Schema.suspend(() => Schema.Struct({
  findings: Schema.optional(Schema.Array(GooglePrivacyDlpV2Finding)),
  findingsTruncated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectResult" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectResult>;

export interface GooglePrivacyDlpV2InspectContentResponse {
  /** The findings. */
  result?: GooglePrivacyDlpV2InspectResult;
}

export const GooglePrivacyDlpV2InspectContentResponse: Schema.Schema<GooglePrivacyDlpV2InspectContentResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(GooglePrivacyDlpV2InspectResult),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectContentResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectContentResponse>;

export interface GooglePrivacyDlpV2Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
}

export const GooglePrivacyDlpV2Color: Schema.Schema<GooglePrivacyDlpV2Color> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2Color" }) as any as Schema.Schema<GooglePrivacyDlpV2Color>;

export interface GooglePrivacyDlpV2ImageRedactionConfig {
  /** Only one per info_type should be provided per request. If not specified, and redact_all_text is false, the DLP API will redact all text that it matches against all info_types that are found, but not specified in another ImageRedactionConfig. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** If true, all text found in the image, regardless whether it matches an info_type, is redacted. Only one should be provided. */
  redactAllText?: boolean;
  /** The color to use when redacting content from an image. If not specified, the default is black. */
  redactionColor?: GooglePrivacyDlpV2Color;
}

export const GooglePrivacyDlpV2ImageRedactionConfig: Schema.Schema<GooglePrivacyDlpV2ImageRedactionConfig> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  redactAllText: Schema.optional(Schema.Boolean),
  redactionColor: Schema.optional(GooglePrivacyDlpV2Color),
})).annotate({ identifier: "GooglePrivacyDlpV2ImageRedactionConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2ImageRedactionConfig>;

export interface GooglePrivacyDlpV2RedactImageRequest {
  /** Deprecated. This field has no effect. */
  locationId?: string;
  /** Configuration for the inspector. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /** The configuration for specifying what content to redact from images. */
  imageRedactionConfigs?: Array<GooglePrivacyDlpV2ImageRedactionConfig>;
  /** Whether the response should include findings along with the redacted image. */
  includeFindings?: boolean;
  /** The content must be PNG, JPEG, SVG or BMP. */
  byteItem?: GooglePrivacyDlpV2ByteContentItem;
  /** The full resource name of the inspection template to use. Settings in the main `inspect_config` field override the corresponding settings in this inspection template. The merge behavior is as follows: - Singular field: The main field's value replaces the value of the corresponding field in the template. - Repeated fields: The field values are appended to the list defined in the template. - Sub-messages and groups: The fields are recursively merged. */
  inspectTemplate?: string;
  /** The full resource name of the de-identification template to use. Settings in the main `image_redaction_configs` field override the corresponding settings in this de-identification template. The request fails if the type of the template's deidentify_config is not image_transformations. */
  deidentifyTemplate?: string;
}

export const GooglePrivacyDlpV2RedactImageRequest: Schema.Schema<GooglePrivacyDlpV2RedactImageRequest> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
  imageRedactionConfigs: Schema.optional(Schema.Array(GooglePrivacyDlpV2ImageRedactionConfig)),
  includeFindings: Schema.optional(Schema.Boolean),
  byteItem: Schema.optional(GooglePrivacyDlpV2ByteContentItem),
  inspectTemplate: Schema.optional(Schema.String),
  deidentifyTemplate: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2RedactImageRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2RedactImageRequest>;

export interface GooglePrivacyDlpV2RedactImageResponse {
  /** The redacted image. The type will be the same as the original image. */
  redactedImage?: string;
  /** If an image was being inspected and the InspectConfig's include_quote was set to true, then this field will include all text, if any, that was found in the image. */
  extractedText?: string;
  /** The findings. Populated when include_findings in the request is true. */
  inspectResult?: GooglePrivacyDlpV2InspectResult;
}

export const GooglePrivacyDlpV2RedactImageResponse: Schema.Schema<GooglePrivacyDlpV2RedactImageResponse> = Schema.suspend(() => Schema.Struct({
  redactedImage: Schema.optional(Schema.String),
  extractedText: Schema.optional(Schema.String),
  inspectResult: Schema.optional(GooglePrivacyDlpV2InspectResult),
})).annotate({ identifier: "GooglePrivacyDlpV2RedactImageResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2RedactImageResponse>;

export interface GooglePrivacyDlpV2ReplaceValueConfig {
  /** Value to replace it with. */
  newValue?: GooglePrivacyDlpV2Value;
}

export const GooglePrivacyDlpV2ReplaceValueConfig: Schema.Schema<GooglePrivacyDlpV2ReplaceValueConfig> = Schema.suspend(() => Schema.Struct({
  newValue: Schema.optional(GooglePrivacyDlpV2Value),
})).annotate({ identifier: "GooglePrivacyDlpV2ReplaceValueConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2ReplaceValueConfig>;

export interface GooglePrivacyDlpV2RedactConfig {
}

export const GooglePrivacyDlpV2RedactConfig: Schema.Schema<GooglePrivacyDlpV2RedactConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2RedactConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2RedactConfig>;

export interface GooglePrivacyDlpV2CharsToIgnore {
  /** Characters to not transform when masking. */
  charactersToSkip?: string;
  /** Common characters to not transform when masking. Useful to avoid removing punctuation. */
  commonCharactersToIgnore?: "COMMON_CHARS_TO_IGNORE_UNSPECIFIED" | "NUMERIC" | "ALPHA_UPPER_CASE" | "ALPHA_LOWER_CASE" | "PUNCTUATION" | "WHITESPACE" | (string & {});
}

export const GooglePrivacyDlpV2CharsToIgnore: Schema.Schema<GooglePrivacyDlpV2CharsToIgnore> = Schema.suspend(() => Schema.Struct({
  charactersToSkip: Schema.optional(Schema.String),
  commonCharactersToIgnore: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CharsToIgnore" }) as any as Schema.Schema<GooglePrivacyDlpV2CharsToIgnore>;

export interface GooglePrivacyDlpV2CharacterMaskConfig {
  /** Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits. */
  maskingCharacter?: string;
  /** Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`. */
  numberToMask?: number;
  /** Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`. */
  reverseOrder?: boolean;
  /** When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`. */
  charactersToIgnore?: Array<GooglePrivacyDlpV2CharsToIgnore>;
}

export const GooglePrivacyDlpV2CharacterMaskConfig: Schema.Schema<GooglePrivacyDlpV2CharacterMaskConfig> = Schema.suspend(() => Schema.Struct({
  maskingCharacter: Schema.optional(Schema.String),
  numberToMask: Schema.optional(Schema.Number),
  reverseOrder: Schema.optional(Schema.Boolean),
  charactersToIgnore: Schema.optional(Schema.Array(GooglePrivacyDlpV2CharsToIgnore)),
})).annotate({ identifier: "GooglePrivacyDlpV2CharacterMaskConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2CharacterMaskConfig>;

export interface GooglePrivacyDlpV2TransientCryptoKey {
  /** Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated). */
  name?: string;
}

export const GooglePrivacyDlpV2TransientCryptoKey: Schema.Schema<GooglePrivacyDlpV2TransientCryptoKey> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TransientCryptoKey" }) as any as Schema.Schema<GooglePrivacyDlpV2TransientCryptoKey>;

export interface GooglePrivacyDlpV2UnwrappedCryptoKey {
  /** Required. A 128/192/256 bit key. */
  key?: string;
}

export const GooglePrivacyDlpV2UnwrappedCryptoKey: Schema.Schema<GooglePrivacyDlpV2UnwrappedCryptoKey> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UnwrappedCryptoKey" }) as any as Schema.Schema<GooglePrivacyDlpV2UnwrappedCryptoKey>;

export interface GooglePrivacyDlpV2KmsWrappedCryptoKey {
  /** Required. The wrapped data crypto key. */
  wrappedKey?: string;
  /** Required. The resource name of the KMS CryptoKey to use for unwrapping. */
  cryptoKeyName?: string;
}

export const GooglePrivacyDlpV2KmsWrappedCryptoKey: Schema.Schema<GooglePrivacyDlpV2KmsWrappedCryptoKey> = Schema.suspend(() => Schema.Struct({
  wrappedKey: Schema.optional(Schema.String),
  cryptoKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2KmsWrappedCryptoKey" }) as any as Schema.Schema<GooglePrivacyDlpV2KmsWrappedCryptoKey>;

export interface GooglePrivacyDlpV2CryptoKey {
  /** Transient crypto key */
  transient?: GooglePrivacyDlpV2TransientCryptoKey;
  /** Unwrapped crypto key */
  unwrapped?: GooglePrivacyDlpV2UnwrappedCryptoKey;
  /** Key wrapped using Cloud KMS */
  kmsWrapped?: GooglePrivacyDlpV2KmsWrappedCryptoKey;
}

export const GooglePrivacyDlpV2CryptoKey: Schema.Schema<GooglePrivacyDlpV2CryptoKey> = Schema.suspend(() => Schema.Struct({
  transient: Schema.optional(GooglePrivacyDlpV2TransientCryptoKey),
  unwrapped: Schema.optional(GooglePrivacyDlpV2UnwrappedCryptoKey),
  kmsWrapped: Schema.optional(GooglePrivacyDlpV2KmsWrappedCryptoKey),
})).annotate({ identifier: "GooglePrivacyDlpV2CryptoKey" }) as any as Schema.Schema<GooglePrivacyDlpV2CryptoKey>;

export interface GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig {
  /** Required. The key used by the encryption algorithm. */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
  /** The 'tweak', a context may be used for higher security since the same identifier in two different contexts won't be given the same surrogate. If the context is not set, a default tweak will be used. If the context is set but: 1. there is no record present when transforming a given value or 1. the field is not present when transforming a given value, a default tweak will be used. Note that case (1) is expected when an `InfoTypeTransformation` is applied to both structured and unstructured `ContentItem`s. Currently, the referenced field may be of value type integer or string. The tweak is constructed as a sequence of bytes in big endian byte order such that: - a 64 bit integer is encoded followed by a single byte of value 1 - a string is encoded in UTF-8 format followed by a single byte of value 2 */
  context?: GooglePrivacyDlpV2FieldId;
  /** Common alphabets. */
  commonAlphabet?: "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED" | "NUMERIC" | "HEXADECIMAL" | "UPPER_CASE_ALPHA_NUMERIC" | "ALPHA_NUMERIC" | (string & {});
  /** This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/`` */
  customAlphabet?: string;
  /** The native way to select the alphabet. Must be in the range [2, 95]. */
  radix?: number;
  /** The custom infoType to annotate the surrogate with. This annotation will be applied to the surrogate by prefixing it with the name of the custom infoType followed by the number of characters comprising the surrogate. The following scheme defines the format: info_type_name(surrogate_character_count):surrogate For example, if the name of custom infoType is 'MY_TOKEN_INFO_TYPE' and the surrogate is 'abc', the full replacement value will be: 'MY_TOKEN_INFO_TYPE(3):abc' This annotation identifies the surrogate when inspecting content using the custom infoType [`SurrogateType`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/InspectConfig#surrogatetype). This facilitates reversal of the surrogate when it occurs in free text. In order for inspection to work properly, the name of this infoType must not occur naturally anywhere in your data; otherwise, inspection may find a surrogate that does not correspond to an actual identifier. Therefore, choose your custom infoType name carefully after considering what your data looks like. One way to select a name that has a high chance of yielding reliable detection is to include one or more unicode characters that are highly improbable to exist in your data. For example, assuming your data is entered from a regular ASCII keyboard, the symbol with the hex code point 29DD might be used like so: ⧝MY_TOKEN_TYPE */
  surrogateInfoType?: GooglePrivacyDlpV2InfoType;
}

export const GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig: Schema.Schema<GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig> = Schema.suspend(() => Schema.Struct({
  cryptoKey: Schema.optional(GooglePrivacyDlpV2CryptoKey),
  context: Schema.optional(GooglePrivacyDlpV2FieldId),
  commonAlphabet: Schema.optional(Schema.String),
  customAlphabet: Schema.optional(Schema.String),
  radix: Schema.optional(Schema.Number),
  surrogateInfoType: Schema.optional(GooglePrivacyDlpV2InfoType),
})).annotate({ identifier: "GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig>;

export interface GooglePrivacyDlpV2FixedSizeBucketingConfig {
  /** Required. Lower bound value of buckets. All values less than `lower_bound` are grouped together into a single bucket; for example if `lower_bound` = 10, then all values less than 10 are replaced with the value "-10". */
  lowerBound?: GooglePrivacyDlpV2Value;
  /** Required. Upper bound value of buckets. All values greater than upper_bound are grouped together into a single bucket; for example if `upper_bound` = 89, then all values greater than 89 are replaced with the value "89+". */
  upperBound?: GooglePrivacyDlpV2Value;
  /** Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works. */
  bucketSize?: number;
}

export const GooglePrivacyDlpV2FixedSizeBucketingConfig: Schema.Schema<GooglePrivacyDlpV2FixedSizeBucketingConfig> = Schema.suspend(() => Schema.Struct({
  lowerBound: Schema.optional(GooglePrivacyDlpV2Value),
  upperBound: Schema.optional(GooglePrivacyDlpV2Value),
  bucketSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2FixedSizeBucketingConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2FixedSizeBucketingConfig>;

export interface GooglePrivacyDlpV2Bucket {
  /** Lower bound of the range, inclusive. Type should be the same as max if used. */
  min?: GooglePrivacyDlpV2Value;
  /** Upper bound of the range, exclusive; type must match min. */
  max?: GooglePrivacyDlpV2Value;
  /** Required. Replacement value for this bucket. */
  replacementValue?: GooglePrivacyDlpV2Value;
}

export const GooglePrivacyDlpV2Bucket: Schema.Schema<GooglePrivacyDlpV2Bucket> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(GooglePrivacyDlpV2Value),
  max: Schema.optional(GooglePrivacyDlpV2Value),
  replacementValue: Schema.optional(GooglePrivacyDlpV2Value),
})).annotate({ identifier: "GooglePrivacyDlpV2Bucket" }) as any as Schema.Schema<GooglePrivacyDlpV2Bucket>;

export interface GooglePrivacyDlpV2BucketingConfig {
  /** Set of buckets. Ranges must be non-overlapping. */
  buckets?: Array<GooglePrivacyDlpV2Bucket>;
}

export const GooglePrivacyDlpV2BucketingConfig: Schema.Schema<GooglePrivacyDlpV2BucketingConfig> = Schema.suspend(() => Schema.Struct({
  buckets: Schema.optional(Schema.Array(GooglePrivacyDlpV2Bucket)),
})).annotate({ identifier: "GooglePrivacyDlpV2BucketingConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2BucketingConfig>;

export interface GooglePrivacyDlpV2ReplaceWithInfoTypeConfig {
}

export const GooglePrivacyDlpV2ReplaceWithInfoTypeConfig: Schema.Schema<GooglePrivacyDlpV2ReplaceWithInfoTypeConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2ReplaceWithInfoTypeConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2ReplaceWithInfoTypeConfig>;

export interface GooglePrivacyDlpV2TimePartConfig {
  /** The part of the time to keep. */
  partToExtract?: "TIME_PART_UNSPECIFIED" | "YEAR" | "MONTH" | "DAY_OF_MONTH" | "DAY_OF_WEEK" | "WEEK_OF_YEAR" | "HOUR_OF_DAY" | (string & {});
}

export const GooglePrivacyDlpV2TimePartConfig: Schema.Schema<GooglePrivacyDlpV2TimePartConfig> = Schema.suspend(() => Schema.Struct({
  partToExtract: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TimePartConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2TimePartConfig>;

export interface GooglePrivacyDlpV2CryptoHashConfig {
  /** The key used by the hash function. */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
}

export const GooglePrivacyDlpV2CryptoHashConfig: Schema.Schema<GooglePrivacyDlpV2CryptoHashConfig> = Schema.suspend(() => Schema.Struct({
  cryptoKey: Schema.optional(GooglePrivacyDlpV2CryptoKey),
})).annotate({ identifier: "GooglePrivacyDlpV2CryptoHashConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2CryptoHashConfig>;

export interface GooglePrivacyDlpV2DateShiftConfig {
  /** Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future. */
  upperBoundDays?: number;
  /** Required. For example, -5 means shift date to at most 5 days back in the past. */
  lowerBoundDays?: number;
  /** Points to the field that contains the context, for example, an entity id. If set, must also set cryptoKey. If set, shift will be consistent for the given context. */
  context?: GooglePrivacyDlpV2FieldId;
  /** Causes the shift to be computed based on this key and the context. This results in the same shift for the same context and crypto_key. If set, must also set context. Can only be applied to table items. */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
}

export const GooglePrivacyDlpV2DateShiftConfig: Schema.Schema<GooglePrivacyDlpV2DateShiftConfig> = Schema.suspend(() => Schema.Struct({
  upperBoundDays: Schema.optional(Schema.Number),
  lowerBoundDays: Schema.optional(Schema.Number),
  context: Schema.optional(GooglePrivacyDlpV2FieldId),
  cryptoKey: Schema.optional(GooglePrivacyDlpV2CryptoKey),
})).annotate({ identifier: "GooglePrivacyDlpV2DateShiftConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2DateShiftConfig>;

export interface GooglePrivacyDlpV2CryptoDeterministicConfig {
  /** The key used by the encryption function. For deterministic encryption using AES-SIV, the provided key is internally expanded to 64 bytes prior to use. */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
  /** The custom info type to annotate the surrogate with. This annotation will be applied to the surrogate by prefixing it with the name of the custom info type followed by the number of characters comprising the surrogate. The following scheme defines the format: {info type name}({surrogate character count}):{surrogate} For example, if the name of custom info type is 'MY_TOKEN_INFO_TYPE' and the surrogate is 'abc', the full replacement value will be: 'MY_TOKEN_INFO_TYPE(3):abc' This annotation identifies the surrogate when inspecting content using the custom info type 'Surrogate'. This facilitates reversal of the surrogate when it occurs in free text. Note: For record transformations where the entire cell in a table is being transformed, surrogates are not mandatory. Surrogates are used to denote the location of the token and are necessary for re-identification in free form text. In order for inspection to work properly, the name of this info type must not occur naturally anywhere in your data; otherwise, inspection may either - reverse a surrogate that does not correspond to an actual identifier - be unable to parse the surrogate and result in an error Therefore, choose your custom info type name carefully after considering what your data looks like. One way to select a name that has a high chance of yielding reliable detection is to include one or more unicode characters that are highly improbable to exist in your data. For example, assuming your data is entered from a regular ASCII keyboard, the symbol with the hex code point 29DD might be used like so: ⧝MY_TOKEN_TYPE. */
  surrogateInfoType?: GooglePrivacyDlpV2InfoType;
  /** A context may be used for higher security and maintaining referential integrity such that the same identifier in two different contexts will be given a distinct surrogate. The context is appended to plaintext value being encrypted. On decryption the provided context is validated against the value used during encryption. If a context was provided during encryption, same context must be provided during decryption as well. If the context is not set, plaintext would be used as is for encryption. If the context is set but: 1. there is no record present when transforming a given value or 2. the field is not present when transforming a given value, plaintext would be used as is for encryption. Note that case (1) is expected when an `InfoTypeTransformation` is applied to both structured and unstructured `ContentItem`s. */
  context?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2CryptoDeterministicConfig: Schema.Schema<GooglePrivacyDlpV2CryptoDeterministicConfig> = Schema.suspend(() => Schema.Struct({
  cryptoKey: Schema.optional(GooglePrivacyDlpV2CryptoKey),
  surrogateInfoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  context: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2CryptoDeterministicConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2CryptoDeterministicConfig>;

export interface GooglePrivacyDlpV2ReplaceDictionaryConfig {
  /** A list of words to select from for random replacement. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. */
  wordList?: GooglePrivacyDlpV2WordList;
}

export const GooglePrivacyDlpV2ReplaceDictionaryConfig: Schema.Schema<GooglePrivacyDlpV2ReplaceDictionaryConfig> = Schema.suspend(() => Schema.Struct({
  wordList: Schema.optional(GooglePrivacyDlpV2WordList),
})).annotate({ identifier: "GooglePrivacyDlpV2ReplaceDictionaryConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2ReplaceDictionaryConfig>;

export interface GooglePrivacyDlpV2PrimitiveTransformation {
  /** Replace with a specified value. */
  replaceConfig?: GooglePrivacyDlpV2ReplaceValueConfig;
  /** Redact */
  redactConfig?: GooglePrivacyDlpV2RedactConfig;
  /** Mask */
  characterMaskConfig?: GooglePrivacyDlpV2CharacterMaskConfig;
  /** Ffx-Fpe. Strongly discouraged, consider using CryptoDeterministicConfig instead. Fpe is computationally expensive incurring latency costs. */
  cryptoReplaceFfxFpeConfig?: GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig;
  /** Fixed size bucketing */
  fixedSizeBucketingConfig?: GooglePrivacyDlpV2FixedSizeBucketingConfig;
  /** Bucketing */
  bucketingConfig?: GooglePrivacyDlpV2BucketingConfig;
  /** Replace with infotype */
  replaceWithInfoTypeConfig?: GooglePrivacyDlpV2ReplaceWithInfoTypeConfig;
  /** Time extraction */
  timePartConfig?: GooglePrivacyDlpV2TimePartConfig;
  /** Crypto */
  cryptoHashConfig?: GooglePrivacyDlpV2CryptoHashConfig;
  /** Date Shift */
  dateShiftConfig?: GooglePrivacyDlpV2DateShiftConfig;
  /** Deterministic Crypto */
  cryptoDeterministicConfig?: GooglePrivacyDlpV2CryptoDeterministicConfig;
  /** Replace with a value randomly drawn (with replacement) from a dictionary. */
  replaceDictionaryConfig?: GooglePrivacyDlpV2ReplaceDictionaryConfig;
}

export const GooglePrivacyDlpV2PrimitiveTransformation: Schema.Schema<GooglePrivacyDlpV2PrimitiveTransformation> = Schema.suspend(() => Schema.Struct({
  replaceConfig: Schema.optional(GooglePrivacyDlpV2ReplaceValueConfig),
  redactConfig: Schema.optional(GooglePrivacyDlpV2RedactConfig),
  characterMaskConfig: Schema.optional(GooglePrivacyDlpV2CharacterMaskConfig),
  cryptoReplaceFfxFpeConfig: Schema.optional(GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig),
  fixedSizeBucketingConfig: Schema.optional(GooglePrivacyDlpV2FixedSizeBucketingConfig),
  bucketingConfig: Schema.optional(GooglePrivacyDlpV2BucketingConfig),
  replaceWithInfoTypeConfig: Schema.optional(GooglePrivacyDlpV2ReplaceWithInfoTypeConfig),
  timePartConfig: Schema.optional(GooglePrivacyDlpV2TimePartConfig),
  cryptoHashConfig: Schema.optional(GooglePrivacyDlpV2CryptoHashConfig),
  dateShiftConfig: Schema.optional(GooglePrivacyDlpV2DateShiftConfig),
  cryptoDeterministicConfig: Schema.optional(GooglePrivacyDlpV2CryptoDeterministicConfig),
  replaceDictionaryConfig: Schema.optional(GooglePrivacyDlpV2ReplaceDictionaryConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2PrimitiveTransformation" }) as any as Schema.Schema<GooglePrivacyDlpV2PrimitiveTransformation>;

export interface GooglePrivacyDlpV2InfoTypeTransformation {
  /** InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
  /** Required. Primitive transformation to apply to the infoType. */
  primitiveTransformation?: GooglePrivacyDlpV2PrimitiveTransformation;
}

export const GooglePrivacyDlpV2InfoTypeTransformation: Schema.Schema<GooglePrivacyDlpV2InfoTypeTransformation> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
  primitiveTransformation: Schema.optional(GooglePrivacyDlpV2PrimitiveTransformation),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeTransformation" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeTransformation>;

export interface GooglePrivacyDlpV2InfoTypeTransformations {
  /** Required. Transformation for each infoType. Cannot specify more than one for a given infoType. */
  transformations?: Array<GooglePrivacyDlpV2InfoTypeTransformation>;
}

export const GooglePrivacyDlpV2InfoTypeTransformations: Schema.Schema<GooglePrivacyDlpV2InfoTypeTransformations> = Schema.suspend(() => Schema.Struct({
  transformations: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeTransformation)),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeTransformations" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeTransformations>;

export interface GooglePrivacyDlpV2Condition {
  /** Required. Field within the record this condition is evaluated against. */
  field?: GooglePrivacyDlpV2FieldId;
  /** Required. Operator used to compare the field or infoType to the value. */
  operator?: "RELATIONAL_OPERATOR_UNSPECIFIED" | "EQUAL_TO" | "NOT_EQUAL_TO" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUALS" | "LESS_THAN_OR_EQUALS" | "EXISTS" | (string & {});
  /** Value to compare against. [Mandatory, except for `EXISTS` tests.] */
  value?: GooglePrivacyDlpV2Value;
}

export const GooglePrivacyDlpV2Condition: Schema.Schema<GooglePrivacyDlpV2Condition> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
  operator: Schema.optional(Schema.String),
  value: Schema.optional(GooglePrivacyDlpV2Value),
})).annotate({ identifier: "GooglePrivacyDlpV2Condition" }) as any as Schema.Schema<GooglePrivacyDlpV2Condition>;

export interface GooglePrivacyDlpV2Conditions {
  /** A collection of conditions. */
  conditions?: Array<GooglePrivacyDlpV2Condition>;
}

export const GooglePrivacyDlpV2Conditions: Schema.Schema<GooglePrivacyDlpV2Conditions> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Array(GooglePrivacyDlpV2Condition)),
})).annotate({ identifier: "GooglePrivacyDlpV2Conditions" }) as any as Schema.Schema<GooglePrivacyDlpV2Conditions>;

export interface GooglePrivacyDlpV2Expressions {
  /** The operator to apply to the result of conditions. Default and currently only supported value is `AND`. */
  logicalOperator?: "LOGICAL_OPERATOR_UNSPECIFIED" | "AND" | (string & {});
  /** Conditions to apply to the expression. */
  conditions?: GooglePrivacyDlpV2Conditions;
}

export const GooglePrivacyDlpV2Expressions: Schema.Schema<GooglePrivacyDlpV2Expressions> = Schema.suspend(() => Schema.Struct({
  logicalOperator: Schema.optional(Schema.String),
  conditions: Schema.optional(GooglePrivacyDlpV2Conditions),
})).annotate({ identifier: "GooglePrivacyDlpV2Expressions" }) as any as Schema.Schema<GooglePrivacyDlpV2Expressions>;

export interface GooglePrivacyDlpV2RecordCondition {
  /** An expression. */
  expressions?: GooglePrivacyDlpV2Expressions;
}

export const GooglePrivacyDlpV2RecordCondition: Schema.Schema<GooglePrivacyDlpV2RecordCondition> = Schema.suspend(() => Schema.Struct({
  expressions: Schema.optional(GooglePrivacyDlpV2Expressions),
})).annotate({ identifier: "GooglePrivacyDlpV2RecordCondition" }) as any as Schema.Schema<GooglePrivacyDlpV2RecordCondition>;

export interface GooglePrivacyDlpV2FieldTransformation {
  /** Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type". */
  fields?: Array<GooglePrivacyDlpV2FieldId>;
  /** Only apply the transformation if the condition evaluates to true for the given `RecordCondition`. The conditions are allowed to reference fields that are not used in the actual transformation. Example Use Cases: - Apply a different bucket transformation to an age column if the zip code column for the same record is within a specific range. - Redact a field if the date of birth field is greater than 85. */
  condition?: GooglePrivacyDlpV2RecordCondition;
  /** Apply the transformation to the entire field. */
  primitiveTransformation?: GooglePrivacyDlpV2PrimitiveTransformation;
  /** Treat the contents of the field as free text, and selectively transform content that matches an `InfoType`. */
  infoTypeTransformations?: GooglePrivacyDlpV2InfoTypeTransformations;
}

export const GooglePrivacyDlpV2FieldTransformation: Schema.Schema<GooglePrivacyDlpV2FieldTransformation> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
  condition: Schema.optional(GooglePrivacyDlpV2RecordCondition),
  primitiveTransformation: Schema.optional(GooglePrivacyDlpV2PrimitiveTransformation),
  infoTypeTransformations: Schema.optional(GooglePrivacyDlpV2InfoTypeTransformations),
})).annotate({ identifier: "GooglePrivacyDlpV2FieldTransformation" }) as any as Schema.Schema<GooglePrivacyDlpV2FieldTransformation>;

export interface GooglePrivacyDlpV2RecordSuppression {
  /** A condition that when it evaluates to true will result in the record being evaluated to be suppressed from the transformed content. */
  condition?: GooglePrivacyDlpV2RecordCondition;
}

export const GooglePrivacyDlpV2RecordSuppression: Schema.Schema<GooglePrivacyDlpV2RecordSuppression> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(GooglePrivacyDlpV2RecordCondition),
})).annotate({ identifier: "GooglePrivacyDlpV2RecordSuppression" }) as any as Schema.Schema<GooglePrivacyDlpV2RecordSuppression>;

export interface GooglePrivacyDlpV2RecordTransformations {
  /** Transform the record by applying various field transformations. */
  fieldTransformations?: Array<GooglePrivacyDlpV2FieldTransformation>;
  /** Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output. */
  recordSuppressions?: Array<GooglePrivacyDlpV2RecordSuppression>;
}

export const GooglePrivacyDlpV2RecordTransformations: Schema.Schema<GooglePrivacyDlpV2RecordTransformations> = Schema.suspend(() => Schema.Struct({
  fieldTransformations: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldTransformation)),
  recordSuppressions: Schema.optional(Schema.Array(GooglePrivacyDlpV2RecordSuppression)),
})).annotate({ identifier: "GooglePrivacyDlpV2RecordTransformations" }) as any as Schema.Schema<GooglePrivacyDlpV2RecordTransformations>;

export interface GooglePrivacyDlpV2SelectedInfoTypes {
  /** Required. InfoTypes to apply the transformation to. Required. Provided InfoType must be unique within the ImageTransformations message. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoType>;
}

export const GooglePrivacyDlpV2SelectedInfoTypes: Schema.Schema<GooglePrivacyDlpV2SelectedInfoTypes> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoType)),
})).annotate({ identifier: "GooglePrivacyDlpV2SelectedInfoTypes" }) as any as Schema.Schema<GooglePrivacyDlpV2SelectedInfoTypes>;

export interface GooglePrivacyDlpV2AllInfoTypes {
}

export const GooglePrivacyDlpV2AllInfoTypes: Schema.Schema<GooglePrivacyDlpV2AllInfoTypes> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2AllInfoTypes" }) as any as Schema.Schema<GooglePrivacyDlpV2AllInfoTypes>;

export interface GooglePrivacyDlpV2AllText {
}

export const GooglePrivacyDlpV2AllText: Schema.Schema<GooglePrivacyDlpV2AllText> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2AllText" }) as any as Schema.Schema<GooglePrivacyDlpV2AllText>;

export interface GooglePrivacyDlpV2ImageTransformation {
  /** Apply transformation to the selected info_types. */
  selectedInfoTypes?: GooglePrivacyDlpV2SelectedInfoTypes;
  /** Apply transformation to all findings not specified in other ImageTransformation's selected_info_types. Only one instance is allowed within the ImageTransformations message. */
  allInfoTypes?: GooglePrivacyDlpV2AllInfoTypes;
  /** Apply transformation to all text that doesn't match an infoType. Only one instance is allowed within the ImageTransformations message. */
  allText?: GooglePrivacyDlpV2AllText;
  /** The color to use when redacting content from an image. If not specified, the default is black. */
  redactionColor?: GooglePrivacyDlpV2Color;
}

export const GooglePrivacyDlpV2ImageTransformation: Schema.Schema<GooglePrivacyDlpV2ImageTransformation> = Schema.suspend(() => Schema.Struct({
  selectedInfoTypes: Schema.optional(GooglePrivacyDlpV2SelectedInfoTypes),
  allInfoTypes: Schema.optional(GooglePrivacyDlpV2AllInfoTypes),
  allText: Schema.optional(GooglePrivacyDlpV2AllText),
  redactionColor: Schema.optional(GooglePrivacyDlpV2Color),
})).annotate({ identifier: "GooglePrivacyDlpV2ImageTransformation" }) as any as Schema.Schema<GooglePrivacyDlpV2ImageTransformation>;

export interface GooglePrivacyDlpV2ImageTransformations {
  /** List of transforms to make. */
  transforms?: Array<GooglePrivacyDlpV2ImageTransformation>;
}

export const GooglePrivacyDlpV2ImageTransformations: Schema.Schema<GooglePrivacyDlpV2ImageTransformations> = Schema.suspend(() => Schema.Struct({
  transforms: Schema.optional(Schema.Array(GooglePrivacyDlpV2ImageTransformation)),
})).annotate({ identifier: "GooglePrivacyDlpV2ImageTransformations" }) as any as Schema.Schema<GooglePrivacyDlpV2ImageTransformations>;

export interface GooglePrivacyDlpV2ThrowError {
}

export const GooglePrivacyDlpV2ThrowError: Schema.Schema<GooglePrivacyDlpV2ThrowError> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2ThrowError" }) as any as Schema.Schema<GooglePrivacyDlpV2ThrowError>;

export interface GooglePrivacyDlpV2LeaveUntransformed {
}

export const GooglePrivacyDlpV2LeaveUntransformed: Schema.Schema<GooglePrivacyDlpV2LeaveUntransformed> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2LeaveUntransformed" }) as any as Schema.Schema<GooglePrivacyDlpV2LeaveUntransformed>;

export interface GooglePrivacyDlpV2TransformationErrorHandling {
  /** Throw an error */
  throwError?: GooglePrivacyDlpV2ThrowError;
  /** Ignore errors */
  leaveUntransformed?: GooglePrivacyDlpV2LeaveUntransformed;
}

export const GooglePrivacyDlpV2TransformationErrorHandling: Schema.Schema<GooglePrivacyDlpV2TransformationErrorHandling> = Schema.suspend(() => Schema.Struct({
  throwError: Schema.optional(GooglePrivacyDlpV2ThrowError),
  leaveUntransformed: Schema.optional(GooglePrivacyDlpV2LeaveUntransformed),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationErrorHandling" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationErrorHandling>;

export interface GooglePrivacyDlpV2DeidentifyConfig {
  /** Treat the dataset as free-form text and apply the same free text transformation everywhere. */
  infoTypeTransformations?: GooglePrivacyDlpV2InfoTypeTransformations;
  /** Treat the dataset as structured. Transformations can be applied to specific locations within structured datasets, such as transforming a column within a table. */
  recordTransformations?: GooglePrivacyDlpV2RecordTransformations;
  /** Treat the dataset as an image and redact. */
  imageTransformations?: GooglePrivacyDlpV2ImageTransformations;
  /** Mode for handling transformation errors. If left unspecified, the default mode is `TransformationErrorHandling.ThrowError`. */
  transformationErrorHandling?: GooglePrivacyDlpV2TransformationErrorHandling;
}

export const GooglePrivacyDlpV2DeidentifyConfig: Schema.Schema<GooglePrivacyDlpV2DeidentifyConfig> = Schema.suspend(() => Schema.Struct({
  infoTypeTransformations: Schema.optional(GooglePrivacyDlpV2InfoTypeTransformations),
  recordTransformations: Schema.optional(GooglePrivacyDlpV2RecordTransformations),
  imageTransformations: Schema.optional(GooglePrivacyDlpV2ImageTransformations),
  transformationErrorHandling: Schema.optional(GooglePrivacyDlpV2TransformationErrorHandling),
})).annotate({ identifier: "GooglePrivacyDlpV2DeidentifyConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2DeidentifyConfig>;

export interface GooglePrivacyDlpV2DeidentifyContentRequest {
  /** Configuration for the de-identification of the content item. Items specified here will override the template referenced by the deidentify_template_name argument. */
  deidentifyConfig?: GooglePrivacyDlpV2DeidentifyConfig;
  /** Configuration for the inspector. Items specified here will override the template referenced by the inspect_template_name argument. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /** The item to de-identify. Will be treated as text. This value must be of type Table if your deidentify_config is a RecordTransformations object. */
  item?: GooglePrivacyDlpV2ContentItem;
  /** Template to use. Any configuration directly specified in inspect_config will override those set in the template. Singular fields that are set in this request will replace their corresponding fields in the template. Repeated fields are appended. Singular sub-messages and groups are recursively merged. */
  inspectTemplateName?: string;
  /** Template to use. Any configuration directly specified in deidentify_config will override those set in the template. Singular fields that are set in this request will replace their corresponding fields in the template. Repeated fields are appended. Singular sub-messages and groups are recursively merged. */
  deidentifyTemplateName?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2DeidentifyContentRequest: Schema.Schema<GooglePrivacyDlpV2DeidentifyContentRequest> = Schema.suspend(() => Schema.Struct({
  deidentifyConfig: Schema.optional(GooglePrivacyDlpV2DeidentifyConfig),
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
  item: Schema.optional(GooglePrivacyDlpV2ContentItem),
  inspectTemplateName: Schema.optional(Schema.String),
  deidentifyTemplateName: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DeidentifyContentRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2DeidentifyContentRequest>;

export interface GooglePrivacyDlpV2SummaryResult {
  /** Number of transformations counted by this result. */
  count?: string;
  /** Outcome of the transformation. */
  code?: "TRANSFORMATION_RESULT_CODE_UNSPECIFIED" | "SUCCESS" | "ERROR" | (string & {});
  /** A place for warnings or errors to show up if a transformation didn't work as expected. */
  details?: string;
}

export const GooglePrivacyDlpV2SummaryResult: Schema.Schema<GooglePrivacyDlpV2SummaryResult> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2SummaryResult" }) as any as Schema.Schema<GooglePrivacyDlpV2SummaryResult>;

export interface GooglePrivacyDlpV2TransformationSummary {
  /** Set if the transformation was limited to a specific InfoType. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Set if the transformation was limited to a specific FieldId. */
  field?: GooglePrivacyDlpV2FieldId;
  /** The specific transformation these stats apply to. */
  transformation?: GooglePrivacyDlpV2PrimitiveTransformation;
  /** The field transformation that was applied. If multiple field transformations are requested for a single field, this list will contain all of them; otherwise, only one is supplied. */
  fieldTransformations?: Array<GooglePrivacyDlpV2FieldTransformation>;
  /** The specific suppression option these stats apply to. */
  recordSuppress?: GooglePrivacyDlpV2RecordSuppression;
  /** Collection of all transformations that took place or had an error. */
  results?: Array<GooglePrivacyDlpV2SummaryResult>;
  /** Total size in bytes that were transformed in some way. */
  transformedBytes?: string;
}

export const GooglePrivacyDlpV2TransformationSummary: Schema.Schema<GooglePrivacyDlpV2TransformationSummary> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
  transformation: Schema.optional(GooglePrivacyDlpV2PrimitiveTransformation),
  fieldTransformations: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldTransformation)),
  recordSuppress: Schema.optional(GooglePrivacyDlpV2RecordSuppression),
  results: Schema.optional(Schema.Array(GooglePrivacyDlpV2SummaryResult)),
  transformedBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationSummary" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationSummary>;

export interface GooglePrivacyDlpV2TransformationOverview {
  /** Total size in bytes that were transformed in some way. */
  transformedBytes?: string;
  /** Transformations applied to the dataset. */
  transformationSummaries?: Array<GooglePrivacyDlpV2TransformationSummary>;
}

export const GooglePrivacyDlpV2TransformationOverview: Schema.Schema<GooglePrivacyDlpV2TransformationOverview> = Schema.suspend(() => Schema.Struct({
  transformedBytes: Schema.optional(Schema.String),
  transformationSummaries: Schema.optional(Schema.Array(GooglePrivacyDlpV2TransformationSummary)),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationOverview" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationOverview>;

export interface GooglePrivacyDlpV2DeidentifyContentResponse {
  /** The de-identified item. */
  item?: GooglePrivacyDlpV2ContentItem;
  /** An overview of the changes that were made on the `item`. */
  overview?: GooglePrivacyDlpV2TransformationOverview;
}

export const GooglePrivacyDlpV2DeidentifyContentResponse: Schema.Schema<GooglePrivacyDlpV2DeidentifyContentResponse> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(GooglePrivacyDlpV2ContentItem),
  overview: Schema.optional(GooglePrivacyDlpV2TransformationOverview),
})).annotate({ identifier: "GooglePrivacyDlpV2DeidentifyContentResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2DeidentifyContentResponse>;

export interface GooglePrivacyDlpV2ReidentifyContentRequest {
  /** Configuration for the re-identification of the content item. This field shares the same proto message type that is used for de-identification, however its usage here is for the reversal of the previous de-identification. Re-identification is performed by examining the transformations used to de-identify the items and executing the reverse. This requires that only reversible transformations be provided here. The reversible transformations are: - `CryptoDeterministicConfig` - `CryptoReplaceFfxFpeConfig` */
  reidentifyConfig?: GooglePrivacyDlpV2DeidentifyConfig;
  /** Configuration for the inspector. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /** The item to re-identify. Will be treated as text. */
  item?: GooglePrivacyDlpV2ContentItem;
  /** Template to use. Any configuration directly specified in `inspect_config` will override those set in the template. Singular fields that are set in this request will replace their corresponding fields in the template. Repeated fields are appended. Singular sub-messages and groups are recursively merged. */
  inspectTemplateName?: string;
  /** Template to use. References an instance of `DeidentifyTemplate`. Any configuration directly specified in `reidentify_config` or `inspect_config` will override those set in the template. The `DeidentifyTemplate` used must include only reversible transformations. Singular fields that are set in this request will replace their corresponding fields in the template. Repeated fields are appended. Singular sub-messages and groups are recursively merged. */
  reidentifyTemplateName?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2ReidentifyContentRequest: Schema.Schema<GooglePrivacyDlpV2ReidentifyContentRequest> = Schema.suspend(() => Schema.Struct({
  reidentifyConfig: Schema.optional(GooglePrivacyDlpV2DeidentifyConfig),
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
  item: Schema.optional(GooglePrivacyDlpV2ContentItem),
  inspectTemplateName: Schema.optional(Schema.String),
  reidentifyTemplateName: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ReidentifyContentRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2ReidentifyContentRequest>;

export interface GooglePrivacyDlpV2ReidentifyContentResponse {
  /** The re-identified item. */
  item?: GooglePrivacyDlpV2ContentItem;
  /** An overview of the changes that were made to the `item`. */
  overview?: GooglePrivacyDlpV2TransformationOverview;
}

export const GooglePrivacyDlpV2ReidentifyContentResponse: Schema.Schema<GooglePrivacyDlpV2ReidentifyContentResponse> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(GooglePrivacyDlpV2ContentItem),
  overview: Schema.optional(GooglePrivacyDlpV2TransformationOverview),
})).annotate({ identifier: "GooglePrivacyDlpV2ReidentifyContentResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ReidentifyContentResponse>;

export interface GooglePrivacyDlpV2LocationSupport {
  /** The current scope for location on this feature. This may expand over time. */
  regionalizationScope?: "REGIONALIZATION_SCOPE_UNSPECIFIED" | "REGIONAL" | "ANY_LOCATION" | (string & {});
  /** Specific locations where the feature may be used. Examples: us-central1, us, asia, global If scope is ANY_LOCATION, no regions will be listed. */
  locations?: Array<string>;
}

export const GooglePrivacyDlpV2LocationSupport: Schema.Schema<GooglePrivacyDlpV2LocationSupport> = Schema.suspend(() => Schema.Struct({
  regionalizationScope: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2LocationSupport" }) as any as Schema.Schema<GooglePrivacyDlpV2LocationSupport>;

export interface GooglePrivacyDlpV2VersionDescription {
  /** Name of the version */
  version?: string;
  /** Description of the version. */
  description?: string;
}

export const GooglePrivacyDlpV2VersionDescription: Schema.Schema<GooglePrivacyDlpV2VersionDescription> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2VersionDescription" }) as any as Schema.Schema<GooglePrivacyDlpV2VersionDescription>;

export interface GooglePrivacyDlpV2InfoTypeCategory {
  /** The region or country that issued the ID or document represented by the infoType. */
  locationCategory?: "LOCATION_UNSPECIFIED" | "GLOBAL" | "ARGENTINA" | "ARMENIA" | "AUSTRALIA" | "AUSTRIA" | "AZERBAIJAN" | "BELARUS" | "BELGIUM" | "BRAZIL" | "CANADA" | "CHILE" | "CHINA" | "COLOMBIA" | "CROATIA" | "CZECHIA" | "DENMARK" | "FRANCE" | "FINLAND" | "GERMANY" | "HONG_KONG" | "INDIA" | "INDONESIA" | "IRELAND" | "ISRAEL" | "ITALY" | "JAPAN" | "KAZAKHSTAN" | "KOREA" | "MEXICO" | "THE_NETHERLANDS" | "NEW_ZEALAND" | "NORWAY" | "PARAGUAY" | "PERU" | "POLAND" | "PORTUGAL" | "RUSSIA" | "SINGAPORE" | "SOUTH_AFRICA" | "SPAIN" | "SWEDEN" | "SWITZERLAND" | "TAIWAN" | "THAILAND" | "TURKEY" | "UKRAINE" | "UNITED_KINGDOM" | "UNITED_STATES" | "URUGUAY" | "UZBEKISTAN" | "VENEZUELA" | "INTERNAL" | (string & {});
  /** The group of relevant businesses where this infoType is commonly used */
  industryCategory?: "INDUSTRY_UNSPECIFIED" | "FINANCE" | "HEALTH" | "TELECOMMUNICATIONS" | (string & {});
  /** The class of identifiers where this infoType belongs */
  typeCategory?: "TYPE_UNSPECIFIED" | "PII" | "SPII" | "DEMOGRAPHIC" | "CREDENTIAL" | "GOVERNMENT_ID" | "DOCUMENT" | "CONTEXTUAL_INFORMATION" | "CUSTOM" | (string & {});
}

export const GooglePrivacyDlpV2InfoTypeCategory: Schema.Schema<GooglePrivacyDlpV2InfoTypeCategory> = Schema.suspend(() => Schema.Struct({
  locationCategory: Schema.optional(Schema.String),
  industryCategory: Schema.optional(Schema.String),
  typeCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeCategory" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeCategory>;

export interface GooglePrivacyDlpV2InfoTypeDescription {
  /** Internal name of the infoType. */
  name?: string;
  /** Human readable form of the infoType name. */
  displayName?: string;
  /** Which parts of the API supports this InfoType. */
  supportedBy?: Array<"ENUM_TYPE_UNSPECIFIED" | "INSPECT" | "RISK_ANALYSIS" | (string & {})>;
  /** Description of the infotype. Translated when language is provided in the request. */
  description?: string;
  /** Locations at which this feature can be used. May change over time. */
  locationSupport?: GooglePrivacyDlpV2LocationSupport;
  /** A sample that is a true positive for this infoType. */
  example?: string;
  /** A list of available versions for the infotype. */
  versions?: Array<GooglePrivacyDlpV2VersionDescription>;
  /** The category of the infoType. */
  categories?: Array<GooglePrivacyDlpV2InfoTypeCategory>;
  /** The default sensitivity of the infoType. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /** If this field is set, this infoType is a general infoType and these specific infoTypes are contained within it. General infoTypes are infoTypes that encompass multiple specific infoTypes. For example, the "GEOGRAPHIC_DATA" general infoType would have set for this field "LOCATION", "LOCATION_COORDINATES", and "STREET_ADDRESS". */
  specificInfoTypes?: Array<string>;
  /** The launch status of the infoType. */
  launchStatus?: "INFO_TYPE_LAUNCH_STATUS_UNSPECIFIED" | "GENERAL_AVAILABILITY" | "PUBLIC_PREVIEW" | "PRIVATE_PREVIEW" | (string & {});
}

export const GooglePrivacyDlpV2InfoTypeDescription: Schema.Schema<GooglePrivacyDlpV2InfoTypeDescription> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  supportedBy: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  locationSupport: Schema.optional(GooglePrivacyDlpV2LocationSupport),
  example: Schema.optional(Schema.String),
  versions: Schema.optional(Schema.Array(GooglePrivacyDlpV2VersionDescription)),
  categories: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeCategory)),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
  specificInfoTypes: Schema.optional(Schema.Array(Schema.String)),
  launchStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeDescription" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeDescription>;

export interface GooglePrivacyDlpV2ListInfoTypesResponse {
  /** Set of sensitive infoTypes. */
  infoTypes?: Array<GooglePrivacyDlpV2InfoTypeDescription>;
}

export const GooglePrivacyDlpV2ListInfoTypesResponse: Schema.Schema<GooglePrivacyDlpV2ListInfoTypesResponse> = Schema.suspend(() => Schema.Struct({
  infoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeDescription)),
})).annotate({ identifier: "GooglePrivacyDlpV2ListInfoTypesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListInfoTypesResponse>;

export interface GooglePrivacyDlpV2InspectTemplate {
  /** Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/inspectTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/inspectTemplates/TEMPLATE_ID`; */
  name?: string;
  /** Display name (max 256 chars). */
  displayName?: string;
  /** Short description (max 256 chars). */
  description?: string;
  /** Output only. The creation timestamp of an inspectTemplate. */
  createTime?: string;
  /** Output only. The last update timestamp of an inspectTemplate. */
  updateTime?: string;
  /** The core content of the template. Configuration of the scanning process. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
}

export const GooglePrivacyDlpV2InspectTemplate: Schema.Schema<GooglePrivacyDlpV2InspectTemplate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectTemplate" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectTemplate>;

export interface GooglePrivacyDlpV2CreateInspectTemplateRequest {
  /** Required. The InspectTemplate to create. */
  inspectTemplate?: GooglePrivacyDlpV2InspectTemplate;
  /** The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one. */
  templateId?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2CreateInspectTemplateRequest: Schema.Schema<GooglePrivacyDlpV2CreateInspectTemplateRequest> = Schema.suspend(() => Schema.Struct({
  inspectTemplate: Schema.optional(GooglePrivacyDlpV2InspectTemplate),
  templateId: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateInspectTemplateRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateInspectTemplateRequest>;

export interface GooglePrivacyDlpV2UpdateInspectTemplateRequest {
  /** New InspectTemplate value. */
  inspectTemplate?: GooglePrivacyDlpV2InspectTemplate;
  /** Mask to control which fields get updated. */
  updateMask?: string;
}

export const GooglePrivacyDlpV2UpdateInspectTemplateRequest: Schema.Schema<GooglePrivacyDlpV2UpdateInspectTemplateRequest> = Schema.suspend(() => Schema.Struct({
  inspectTemplate: Schema.optional(GooglePrivacyDlpV2InspectTemplate),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UpdateInspectTemplateRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2UpdateInspectTemplateRequest>;

export interface GooglePrivacyDlpV2ListInspectTemplatesResponse {
  /** List of inspectTemplates, up to page_size in ListInspectTemplatesRequest. */
  inspectTemplates?: Array<GooglePrivacyDlpV2InspectTemplate>;
  /** If the next page is available then the next page token to be used in the following ListInspectTemplates request. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListInspectTemplatesResponse: Schema.Schema<GooglePrivacyDlpV2ListInspectTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  inspectTemplates: Schema.optional(Schema.Array(GooglePrivacyDlpV2InspectTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListInspectTemplatesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListInspectTemplatesResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GooglePrivacyDlpV2DeidentifyTemplate {
  /** Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/deidentifyTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/deidentifyTemplates/TEMPLATE_ID` */
  name?: string;
  /** Display name (max 256 chars). */
  displayName?: string;
  /** Short description (max 256 chars). */
  description?: string;
  /** Output only. The creation timestamp of an inspectTemplate. */
  createTime?: string;
  /** Output only. The last update timestamp of an inspectTemplate. */
  updateTime?: string;
  /** The core content of the template. */
  deidentifyConfig?: GooglePrivacyDlpV2DeidentifyConfig;
}

export const GooglePrivacyDlpV2DeidentifyTemplate: Schema.Schema<GooglePrivacyDlpV2DeidentifyTemplate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deidentifyConfig: Schema.optional(GooglePrivacyDlpV2DeidentifyConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2DeidentifyTemplate" }) as any as Schema.Schema<GooglePrivacyDlpV2DeidentifyTemplate>;

export interface GooglePrivacyDlpV2CreateDeidentifyTemplateRequest {
  /** Required. The DeidentifyTemplate to create. */
  deidentifyTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
  /** The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one. */
  templateId?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2CreateDeidentifyTemplateRequest: Schema.Schema<GooglePrivacyDlpV2CreateDeidentifyTemplateRequest> = Schema.suspend(() => Schema.Struct({
  deidentifyTemplate: Schema.optional(GooglePrivacyDlpV2DeidentifyTemplate),
  templateId: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateDeidentifyTemplateRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateDeidentifyTemplateRequest>;

export interface GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest {
  /** New DeidentifyTemplate value. */
  deidentifyTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
  /** Mask to control which fields get updated. */
  updateMask?: string;
}

export const GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest: Schema.Schema<GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest> = Schema.suspend(() => Schema.Struct({
  deidentifyTemplate: Schema.optional(GooglePrivacyDlpV2DeidentifyTemplate),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest>;

export interface GooglePrivacyDlpV2ListDeidentifyTemplatesResponse {
  /** List of deidentify templates, up to page_size in ListDeidentifyTemplatesRequest. */
  deidentifyTemplates?: Array<GooglePrivacyDlpV2DeidentifyTemplate>;
  /** If the next page is available then the next page token to be used in the following ListDeidentifyTemplates request. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListDeidentifyTemplatesResponse: Schema.Schema<GooglePrivacyDlpV2ListDeidentifyTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  deidentifyTemplates: Schema.optional(Schema.Array(GooglePrivacyDlpV2DeidentifyTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListDeidentifyTemplatesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListDeidentifyTemplatesResponse>;

export interface GooglePrivacyDlpV2KindExpression {
  /** The name of the kind. */
  name?: string;
}

export const GooglePrivacyDlpV2KindExpression: Schema.Schema<GooglePrivacyDlpV2KindExpression> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2KindExpression" }) as any as Schema.Schema<GooglePrivacyDlpV2KindExpression>;

export interface GooglePrivacyDlpV2DatastoreOptions {
  /** A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty. */
  partitionId?: GooglePrivacyDlpV2PartitionId;
  /** The kind to process. */
  kind?: GooglePrivacyDlpV2KindExpression;
}

export const GooglePrivacyDlpV2DatastoreOptions: Schema.Schema<GooglePrivacyDlpV2DatastoreOptions> = Schema.suspend(() => Schema.Struct({
  partitionId: Schema.optional(GooglePrivacyDlpV2PartitionId),
  kind: Schema.optional(GooglePrivacyDlpV2KindExpression),
})).annotate({ identifier: "GooglePrivacyDlpV2DatastoreOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2DatastoreOptions>;

export interface GooglePrivacyDlpV2CloudStorageRegexFileSet {
  /** The name of a Cloud Storage bucket. Required. */
  bucketName?: string;
  /** A list of regular expressions matching file paths to include. All files in the bucket that match at least one of these regular expressions will be included in the set of files, except for those that also match an item in `exclude_regex`. Leaving this field empty will match all files by default (this is equivalent to including `.*` in the list). Regular expressions use RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found under the google/re2 repository on GitHub. */
  includeRegex?: Array<string>;
  /** A list of regular expressions matching file paths to exclude. All files in the bucket that match at least one of these regular expressions will be excluded from the scan. Regular expressions use RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found under the google/re2 repository on GitHub. */
  excludeRegex?: Array<string>;
}

export const GooglePrivacyDlpV2CloudStorageRegexFileSet: Schema.Schema<GooglePrivacyDlpV2CloudStorageRegexFileSet> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  includeRegex: Schema.optional(Schema.Array(Schema.String)),
  excludeRegex: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStorageRegexFileSet" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStorageRegexFileSet>;

export interface GooglePrivacyDlpV2FileSet {
  /** The Cloud Storage url of the file(s) to scan, in the format `gs:///`. Trailing wildcard in the path is allowed. If the url ends in a trailing slash, the bucket or directory represented by the url will be scanned non-recursively (content in sub-directories will not be scanned). This means that `gs://mybucket/` is equivalent to `gs://mybucket/*`, and `gs://mybucket/directory/` is equivalent to `gs://mybucket/directory/*`. Exactly one of `url` or `regex_file_set` must be set. */
  url?: string;
  /** The regex-filtered set of files to scan. Exactly one of `url` or `regex_file_set` must be set. */
  regexFileSet?: GooglePrivacyDlpV2CloudStorageRegexFileSet;
}

export const GooglePrivacyDlpV2FileSet: Schema.Schema<GooglePrivacyDlpV2FileSet> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  regexFileSet: Schema.optional(GooglePrivacyDlpV2CloudStorageRegexFileSet),
})).annotate({ identifier: "GooglePrivacyDlpV2FileSet" }) as any as Schema.Schema<GooglePrivacyDlpV2FileSet>;

export interface GooglePrivacyDlpV2CloudStorageOptions {
  /** The set of one or more files to scan. */
  fileSet?: GooglePrivacyDlpV2FileSet;
  /** Max number of bytes to scan from a file. If a scanned file's size is bigger than this value then the rest of the bytes are omitted. Only one of `bytes_limit_per_file` and `bytes_limit_per_file_percent` can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file). */
  bytesLimitPerFile?: string;
  /** Max percentage of bytes to scan from a file. The rest are omitted. The number of bytes scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of bytes_limit_per_file and bytes_limit_per_file_percent can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file). */
  bytesLimitPerFilePercent?: number;
  /** List of file type groups to include in the scan. If empty, all files are scanned and available data format processors are applied. In addition, the binary content of the selected files is always scanned as well. Images are scanned only as binary if the specified region does not support image inspection and no file_types were specified. Image inspection is restricted to 'global', 'us', 'asia', and 'europe'. */
  fileTypes?: Array<"FILE_TYPE_UNSPECIFIED" | "BINARY_FILE" | "TEXT_FILE" | "IMAGE" | "WORD" | "PDF" | "AVRO" | "CSV" | "TSV" | "POWERPOINT" | "EXCEL" | (string & {})>;
  /** How to sample the data. */
  sampleMethod?: "SAMPLE_METHOD_UNSPECIFIED" | "TOP" | "RANDOM_START" | (string & {});
  /** Limits the number of files to scan to this percentage of the input FileSet. Number of files scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. */
  filesLimitPercent?: number;
}

export const GooglePrivacyDlpV2CloudStorageOptions: Schema.Schema<GooglePrivacyDlpV2CloudStorageOptions> = Schema.suspend(() => Schema.Struct({
  fileSet: Schema.optional(GooglePrivacyDlpV2FileSet),
  bytesLimitPerFile: Schema.optional(Schema.String),
  bytesLimitPerFilePercent: Schema.optional(Schema.Number),
  fileTypes: Schema.optional(Schema.Array(Schema.String)),
  sampleMethod: Schema.optional(Schema.String),
  filesLimitPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStorageOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStorageOptions>;

export interface GooglePrivacyDlpV2BigQueryOptions {
  /** Complete BigQuery table reference. */
  tableReference?: GooglePrivacyDlpV2BigQueryTable;
  /** Table fields that may uniquely identify a row within the table. When `actions.saveFindings.outputConfig.table` is specified, the values of columns specified here are available in the output table under `location.content_locations.record_location.record_key.id_values`. Nested fields such as `person.birthdate.year` are allowed. */
  identifyingFields?: Array<GooglePrivacyDlpV2FieldId>;
  /** Max number of rows to scan. If the table has more rows than this value, the rest of the rows are omitted. If not set, or if set to 0, all rows will be scanned. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig. */
  rowsLimit?: string;
  /** Max percentage of rows to scan. The rest are omitted. The number of rows scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig. Caution: A [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#bq-sampling) is causing the `rowsLimitPercent` field to behave unexpectedly. We recommend using `rowsLimit` instead. */
  rowsLimitPercent?: number;
  /** How to sample the data. */
  sampleMethod?: "SAMPLE_METHOD_UNSPECIFIED" | "TOP" | "RANDOM_START" | (string & {});
  /** References to fields excluded from scanning. This allows you to skip inspection of entire columns which you know have no findings. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used. */
  excludedFields?: Array<GooglePrivacyDlpV2FieldId>;
  /** Limit scanning only to these fields. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used. */
  includedFields?: Array<GooglePrivacyDlpV2FieldId>;
}

export const GooglePrivacyDlpV2BigQueryOptions: Schema.Schema<GooglePrivacyDlpV2BigQueryOptions> = Schema.suspend(() => Schema.Struct({
  tableReference: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  identifyingFields: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
  rowsLimit: Schema.optional(Schema.String),
  rowsLimitPercent: Schema.optional(Schema.Number),
  sampleMethod: Schema.optional(Schema.String),
  excludedFields: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
  includedFields: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryOptions>;

export interface GooglePrivacyDlpV2TableOptions {
  /** The columns that are the primary keys for table objects included in ContentItem. A copy of this cell's value will stored alongside alongside each finding so that the finding can be traced to the specific row it came from. No more than 3 may be provided. */
  identifyingFields?: Array<GooglePrivacyDlpV2FieldId>;
}

export const GooglePrivacyDlpV2TableOptions: Schema.Schema<GooglePrivacyDlpV2TableOptions> = Schema.suspend(() => Schema.Struct({
  identifyingFields: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
})).annotate({ identifier: "GooglePrivacyDlpV2TableOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2TableOptions>;

export interface GooglePrivacyDlpV2HybridOptions {
  /** A short description of where the data is coming from. Will be stored once in the job. 256 max length. */
  description?: string;
  /** These are labels that each inspection request must include within their 'finding_labels' map. Request may contain others, but any missing one of these will be rejected. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. No more than 10 keys can be required. */
  requiredFindingLabelKeys?: Array<string>;
  /** To organize findings, these labels will be added to each finding. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment" : "production"` * `"pipeline" : "etl"` */
  labels?: Record<string, string>;
  /** If the container is a table, additional information to make findings meaningful such as the columns that are primary keys. */
  tableOptions?: GooglePrivacyDlpV2TableOptions;
}

export const GooglePrivacyDlpV2HybridOptions: Schema.Schema<GooglePrivacyDlpV2HybridOptions> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  requiredFindingLabelKeys: Schema.optional(Schema.Array(Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tableOptions: Schema.optional(GooglePrivacyDlpV2TableOptions),
})).annotate({ identifier: "GooglePrivacyDlpV2HybridOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridOptions>;

export interface GooglePrivacyDlpV2TimespanConfig {
  /** Exclude files, tables, or rows older than this value. If not set, no lower time limit is applied. */
  startTime?: string;
  /** Exclude files, tables, or rows newer than this value. If not set, no upper time limit is applied. */
  endTime?: string;
  /** Specification of the field containing the timestamp of scanned items. Used for data sources like Datastore and BigQuery. **For BigQuery** If this value is not specified and the table was modified between the given start and end times, the entire table will be scanned. If this value is specified, then rows are filtered based on the given start and end times. Rows with a `NULL` value in the provided BigQuery column are skipped. Valid data types of the provided BigQuery column are: `INTEGER`, `DATE`, `TIMESTAMP`, and `DATETIME`. If your BigQuery table is [partitioned at ingestion time](https://cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time), you can use any of the following pseudo-columns as your timestamp field. When used with Cloud DLP, these pseudo-column names are case sensitive. - `_PARTITIONTIME` - `_PARTITIONDATE` - `_PARTITION_LOAD_TIME` **For Datastore** If this value is specified, then entities are filtered based on the given start and end times. If an entity does not contain the provided timestamp property or contains empty or invalid values, then it is included. Valid data types of the provided timestamp property are: `TIMESTAMP`. See the [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#bq-timespan) related to this operation. */
  timestampField?: GooglePrivacyDlpV2FieldId;
  /** When the job is started by a JobTrigger we will automatically figure out a valid start_time to avoid scanning files that have not been modified since the last time the JobTrigger executed. This will be based on the time of the execution of the last run of the JobTrigger or the timespan end_time used in the last run of the JobTrigger. **For BigQuery** Inspect jobs triggered by automatic population will scan data that is at least three hours old when the job starts. This is because streaming buffer rows are not read during inspection and reading up to the current timestamp will result in skipped rows. See the [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#recently-streamed-data) related to this operation. */
  enableAutoPopulationOfTimespanConfig?: boolean;
}

export const GooglePrivacyDlpV2TimespanConfig: Schema.Schema<GooglePrivacyDlpV2TimespanConfig> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  timestampField: Schema.optional(GooglePrivacyDlpV2FieldId),
  enableAutoPopulationOfTimespanConfig: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2TimespanConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2TimespanConfig>;

export interface GooglePrivacyDlpV2StorageConfig {
  /** Google Cloud Datastore options. */
  datastoreOptions?: GooglePrivacyDlpV2DatastoreOptions;
  /** Cloud Storage options. */
  cloudStorageOptions?: GooglePrivacyDlpV2CloudStorageOptions;
  /** BigQuery options. */
  bigQueryOptions?: GooglePrivacyDlpV2BigQueryOptions;
  /** Hybrid inspection options. */
  hybridOptions?: GooglePrivacyDlpV2HybridOptions;
  /** Configuration of the timespan of the items to include in scanning. */
  timespanConfig?: GooglePrivacyDlpV2TimespanConfig;
}

export const GooglePrivacyDlpV2StorageConfig: Schema.Schema<GooglePrivacyDlpV2StorageConfig> = Schema.suspend(() => Schema.Struct({
  datastoreOptions: Schema.optional(GooglePrivacyDlpV2DatastoreOptions),
  cloudStorageOptions: Schema.optional(GooglePrivacyDlpV2CloudStorageOptions),
  bigQueryOptions: Schema.optional(GooglePrivacyDlpV2BigQueryOptions),
  hybridOptions: Schema.optional(GooglePrivacyDlpV2HybridOptions),
  timespanConfig: Schema.optional(GooglePrivacyDlpV2TimespanConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2StorageConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2StorageConfig>;

export interface GooglePrivacyDlpV2OutputStorageConfig {
  /** Store findings in an existing table or a new table in an existing dataset. If table_id is not set a new one will be generated for you with the following format: dlp_googleapis_yyyy_mm_dd_[dlp_job_id]. Pacific time zone will be used for generating the date details. For Inspect, each column in an existing output table must have the same name, type, and mode of a field in the `Finding` object. For Risk, an existing output table should be the output of a previous Risk analysis job run on the same source table, with the same privacy metric and quasi-identifiers. Risk jobs that analyze the same table but compute a different privacy metric, or use different sets of quasi-identifiers, cannot store their results in the same table. */
  table?: GooglePrivacyDlpV2BigQueryTable;
  /** Store findings in an existing Cloud Storage bucket. Files will be generated with the job ID and file part number as the filename and will contain findings in textproto format as SaveToGcsFindingsOutput. The filename will follow the naming convention `-`. Example: `my-job-id-2`. Supported for Inspect jobs. The bucket must not be the same as the bucket being inspected. If storing findings to Cloud Storage, the output schema field should not be set. If set, it will be ignored. */
  storagePath?: GooglePrivacyDlpV2CloudStoragePath;
  /** Schema used for writing the findings for Inspect jobs. This field is only used for Inspect and must be unspecified for Risk jobs. Columns are derived from the `Finding` object. If appending to an existing table, any columns from the predefined schema that are missing will be added. No columns in the existing table will be deleted. If unspecified, then all available columns will be used for a new table or an (existing) table with no schema, and no changes will be made to an existing table that has a schema. Only for use with external storage. */
  outputSchema?: "OUTPUT_SCHEMA_UNSPECIFIED" | "BASIC_COLUMNS" | "GCS_COLUMNS" | "DATASTORE_COLUMNS" | "BIG_QUERY_COLUMNS" | "ALL_COLUMNS" | (string & {});
}

export const GooglePrivacyDlpV2OutputStorageConfig: Schema.Schema<GooglePrivacyDlpV2OutputStorageConfig> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  storagePath: Schema.optional(GooglePrivacyDlpV2CloudStoragePath),
  outputSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2OutputStorageConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2OutputStorageConfig>;

export interface GooglePrivacyDlpV2SaveFindings {
  /** Location to store findings outside of DLP. */
  outputConfig?: GooglePrivacyDlpV2OutputStorageConfig;
}

export const GooglePrivacyDlpV2SaveFindings: Schema.Schema<GooglePrivacyDlpV2SaveFindings> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GooglePrivacyDlpV2OutputStorageConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2SaveFindings" }) as any as Schema.Schema<GooglePrivacyDlpV2SaveFindings>;

export interface GooglePrivacyDlpV2PublishToPubSub {
  /** Cloud Pub/Sub topic to send notifications to. The topic must have given publishing access rights to the DLP API service account executing the long running DlpJob sending the notifications. Format is projects/{project}/topics/{topic}. */
  topic?: string;
}

export const GooglePrivacyDlpV2PublishToPubSub: Schema.Schema<GooglePrivacyDlpV2PublishToPubSub> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2PublishToPubSub" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishToPubSub>;

export interface GooglePrivacyDlpV2PublishSummaryToCscc {
}

export const GooglePrivacyDlpV2PublishSummaryToCscc: Schema.Schema<GooglePrivacyDlpV2PublishSummaryToCscc> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2PublishSummaryToCscc" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishSummaryToCscc>;

export interface GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog {
}

export const GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog: Schema.Schema<GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog>;

export interface GooglePrivacyDlpV2PublishFindingsToDataplexCatalog {
}

export const GooglePrivacyDlpV2PublishFindingsToDataplexCatalog: Schema.Schema<GooglePrivacyDlpV2PublishFindingsToDataplexCatalog> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2PublishFindingsToDataplexCatalog" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishFindingsToDataplexCatalog>;

export interface GooglePrivacyDlpV2TransformationConfig {
  /** De-identify template. If this template is specified, it will serve as the default de-identify template. This template cannot contain `record_transformations` since it can be used for unstructured content such as free-form text files. If this template is not set, a default `ReplaceWithInfoTypeConfig` will be used to de-identify unstructured content. */
  deidentifyTemplate?: string;
  /** Structured de-identify template. If this template is specified, it will serve as the de-identify template for structured content such as delimited files and tables. If this template is not set but the `deidentify_template` is set, then `deidentify_template` will also apply to the structured content. If neither template is set, a default `ReplaceWithInfoTypeConfig` will be used to de-identify structured content. */
  structuredDeidentifyTemplate?: string;
  /** Image redact template. If this template is specified, it will serve as the de-identify template for images. If this template is not set, all findings in the image will be redacted with a black box. */
  imageRedactTemplate?: string;
}

export const GooglePrivacyDlpV2TransformationConfig: Schema.Schema<GooglePrivacyDlpV2TransformationConfig> = Schema.suspend(() => Schema.Struct({
  deidentifyTemplate: Schema.optional(Schema.String),
  structuredDeidentifyTemplate: Schema.optional(Schema.String),
  imageRedactTemplate: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationConfig>;

export interface GooglePrivacyDlpV2TransformationDetailsStorageConfig {
  /** The BigQuery table in which to store the output. This may be an existing table or in a new table in an existing dataset. If table_id is not set a new one will be generated for you with the following format: dlp_googleapis_transformation_details_yyyy_mm_dd_[dlp_job_id]. Pacific time zone will be used for generating the date details. */
  table?: GooglePrivacyDlpV2BigQueryTable;
}

export const GooglePrivacyDlpV2TransformationDetailsStorageConfig: Schema.Schema<GooglePrivacyDlpV2TransformationDetailsStorageConfig> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationDetailsStorageConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationDetailsStorageConfig>;

export interface GooglePrivacyDlpV2Deidentify {
  /** User specified deidentify templates and configs for structured, unstructured, and image files. */
  transformationConfig?: GooglePrivacyDlpV2TransformationConfig;
  /** Config for storing transformation details. This field specifies the configuration for storing detailed metadata about each transformation performed during a de-identification process. The metadata is stored separately from the de-identified content itself and provides a granular record of both successful transformations and any failures that occurred. Enabling this configuration is essential for users who need to access comprehensive information about the status, outcome, and specifics of each transformation. The details are captured in the TransformationDetails message for each operation. Key use cases: * **Auditing and compliance** * Provides a verifiable audit trail of de-identification activities, which is crucial for meeting regulatory requirements and internal data governance policies. * Logs what data was transformed, what transformations were applied, when they occurred, and their success status. This helps demonstrate accountability and due diligence in protecting sensitive data. * **Troubleshooting and debugging** * Offers detailed error messages and context if a transformation fails. This information is useful for diagnosing and resolving issues in the de-identification pipeline. * Helps pinpoint the exact location and nature of failures, speeding up the debugging process. * **Process verification and quality assurance** * Allows users to confirm that de-identification rules and transformations were applied correctly and consistently across the dataset as intended. * Helps in verifying the effectiveness of the chosen de-identification strategies. * **Data lineage and impact analysis** * Creates a record of how data elements were modified, contributing to data lineage. This is useful for understanding the provenance of de-identified data. * Aids in assessing the potential impact of de-identification choices on downstream analytical processes or data usability. * **Reporting and operational insights** * You can analyze the metadata stored in a queryable BigQuery table to generate reports on transformation success rates, common error types, processing volumes (e.g., transformedBytes), and the types of transformations applied. * These insights can inform optimization of de-identification configurations and resource planning. To take advantage of these benefits, set this configuration. The stored details include a description of the transformation, success or error codes, error messages, the number of bytes transformed, the location of the transformed content, and identifiers for the job and source data. */
  transformationDetailsStorageConfig?: GooglePrivacyDlpV2TransformationDetailsStorageConfig;
  /** Required. User settable Cloud Storage bucket and folders to store de-identified files. This field must be set for Cloud Storage deidentification. The output Cloud Storage bucket must be different from the input bucket. De-identified files will overwrite files in the output path. Form of: gs://bucket/folder/ or gs://bucket */
  cloudStorageOutput?: string;
  /** List of user-specified file type groups to transform. If specified, only the files with these file types are transformed. If empty, all supported files are transformed. Supported types may be automatically added over time. Any unsupported file types that are set in this field are excluded from de-identification. An error is recorded for each unsupported file in the TransformationDetails output table. Currently the only file types supported are: IMAGES, TEXT_FILES, CSV, TSV. */
  fileTypesToTransform?: Array<"FILE_TYPE_UNSPECIFIED" | "BINARY_FILE" | "TEXT_FILE" | "IMAGE" | "WORD" | "PDF" | "AVRO" | "CSV" | "TSV" | "POWERPOINT" | "EXCEL" | (string & {})>;
}

export const GooglePrivacyDlpV2Deidentify: Schema.Schema<GooglePrivacyDlpV2Deidentify> = Schema.suspend(() => Schema.Struct({
  transformationConfig: Schema.optional(GooglePrivacyDlpV2TransformationConfig),
  transformationDetailsStorageConfig: Schema.optional(GooglePrivacyDlpV2TransformationDetailsStorageConfig),
  cloudStorageOutput: Schema.optional(Schema.String),
  fileTypesToTransform: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2Deidentify" }) as any as Schema.Schema<GooglePrivacyDlpV2Deidentify>;

export interface GooglePrivacyDlpV2JobNotificationEmails {
}

export const GooglePrivacyDlpV2JobNotificationEmails: Schema.Schema<GooglePrivacyDlpV2JobNotificationEmails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2JobNotificationEmails" }) as any as Schema.Schema<GooglePrivacyDlpV2JobNotificationEmails>;

export interface GooglePrivacyDlpV2PublishToStackdriver {
}

export const GooglePrivacyDlpV2PublishToStackdriver: Schema.Schema<GooglePrivacyDlpV2PublishToStackdriver> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2PublishToStackdriver" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishToStackdriver>;

export interface GooglePrivacyDlpV2Action {
  /** Save resulting findings in a provided location. */
  saveFindings?: GooglePrivacyDlpV2SaveFindings;
  /** Publish a notification to a Pub/Sub topic. */
  pubSub?: GooglePrivacyDlpV2PublishToPubSub;
  /** Publish summary to Cloud Security Command Center (Alpha). */
  publishSummaryToCscc?: GooglePrivacyDlpV2PublishSummaryToCscc;
  /** Deprecated because Data Catalog is being turned down. Use publish_findings_to_dataplex_catalog to publish findings to Dataplex Universal Catalog. */
  publishFindingsToCloudDataCatalog?: GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog;
  /** Publish findings as an aspect to Dataplex Universal Catalog. */
  publishFindingsToDataplexCatalog?: GooglePrivacyDlpV2PublishFindingsToDataplexCatalog;
  /** Create a de-identified copy of the input data. */
  deidentify?: GooglePrivacyDlpV2Deidentify;
  /** Sends an email when the job completes. The email goes to IAM project owners and technical [Essential Contacts](https://cloud.google.com/resource-manager/docs/managing-notification-contacts). */
  jobNotificationEmails?: GooglePrivacyDlpV2JobNotificationEmails;
  /** Enable Stackdriver metric dlp.googleapis.com/finding_count. */
  publishToStackdriver?: GooglePrivacyDlpV2PublishToStackdriver;
}

export const GooglePrivacyDlpV2Action: Schema.Schema<GooglePrivacyDlpV2Action> = Schema.suspend(() => Schema.Struct({
  saveFindings: Schema.optional(GooglePrivacyDlpV2SaveFindings),
  pubSub: Schema.optional(GooglePrivacyDlpV2PublishToPubSub),
  publishSummaryToCscc: Schema.optional(GooglePrivacyDlpV2PublishSummaryToCscc),
  publishFindingsToCloudDataCatalog: Schema.optional(GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog),
  publishFindingsToDataplexCatalog: Schema.optional(GooglePrivacyDlpV2PublishFindingsToDataplexCatalog),
  deidentify: Schema.optional(GooglePrivacyDlpV2Deidentify),
  jobNotificationEmails: Schema.optional(GooglePrivacyDlpV2JobNotificationEmails),
  publishToStackdriver: Schema.optional(GooglePrivacyDlpV2PublishToStackdriver),
})).annotate({ identifier: "GooglePrivacyDlpV2Action" }) as any as Schema.Schema<GooglePrivacyDlpV2Action>;

export interface GooglePrivacyDlpV2InspectJobConfig {
  /** The data to scan. */
  storageConfig?: GooglePrivacyDlpV2StorageConfig;
  /** How and what to scan for. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /** If provided, will be used as the default for all values in InspectConfig. `inspect_config` will be merged into the values persisted as part of the template. */
  inspectTemplateName?: string;
  /** Actions to execute at the completion of the job. */
  actions?: Array<GooglePrivacyDlpV2Action>;
}

export const GooglePrivacyDlpV2InspectJobConfig: Schema.Schema<GooglePrivacyDlpV2InspectJobConfig> = Schema.suspend(() => Schema.Struct({
  storageConfig: Schema.optional(GooglePrivacyDlpV2StorageConfig),
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
  inspectTemplateName: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GooglePrivacyDlpV2Action)),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectJobConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectJobConfig>;

export interface GooglePrivacyDlpV2Schedule {
  /** With this option a job is started on a regular periodic basis. For example: every day (86400 seconds). A scheduled start time will be skipped if the previous execution has not ended when its scheduled time occurs. This value must be set to a time duration greater than or equal to 1 day and can be no longer than 60 days. */
  recurrencePeriodDuration?: string;
}

export const GooglePrivacyDlpV2Schedule: Schema.Schema<GooglePrivacyDlpV2Schedule> = Schema.suspend(() => Schema.Struct({
  recurrencePeriodDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Schedule" }) as any as Schema.Schema<GooglePrivacyDlpV2Schedule>;

export interface GooglePrivacyDlpV2Manual {
}

export const GooglePrivacyDlpV2Manual: Schema.Schema<GooglePrivacyDlpV2Manual> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2Manual" }) as any as Schema.Schema<GooglePrivacyDlpV2Manual>;

export interface GooglePrivacyDlpV2Trigger {
  /** Create a job on a repeating basis based on the elapse of time. */
  schedule?: GooglePrivacyDlpV2Schedule;
  /** For use with hybrid jobs. Jobs must be manually created and finished. */
  manual?: GooglePrivacyDlpV2Manual;
}

export const GooglePrivacyDlpV2Trigger: Schema.Schema<GooglePrivacyDlpV2Trigger> = Schema.suspend(() => Schema.Struct({
  schedule: Schema.optional(GooglePrivacyDlpV2Schedule),
  manual: Schema.optional(GooglePrivacyDlpV2Manual),
})).annotate({ identifier: "GooglePrivacyDlpV2Trigger" }) as any as Schema.Schema<GooglePrivacyDlpV2Trigger>;

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GooglePrivacyDlpV2Error {
  /** Detailed error codes and messages. */
  details?: GoogleRpcStatus;
  /** The times the error occurred. List includes the oldest timestamp and the last 9 timestamps. */
  timestamps?: Array<string>;
  /** Additional information about the error. */
  extraInfo?: "ERROR_INFO_UNSPECIFIED" | "IMAGE_SCAN_UNAVAILABLE_IN_REGION" | "FILE_STORE_CLUSTER_UNSUPPORTED" | (string & {});
}

export const GooglePrivacyDlpV2Error: Schema.Schema<GooglePrivacyDlpV2Error> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(GoogleRpcStatus),
  timestamps: Schema.optional(Schema.Array(Schema.String)),
  extraInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Error" }) as any as Schema.Schema<GooglePrivacyDlpV2Error>;

export interface GooglePrivacyDlpV2JobTrigger {
  /** Unique resource name for the triggeredJob, assigned by the service when the triggeredJob is created, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name?: string;
  /** Display name (max 100 chars) */
  displayName?: string;
  /** User provided description (max 256 chars) */
  description?: string;
  /** For inspect jobs, a snapshot of the configuration. */
  inspectJob?: GooglePrivacyDlpV2InspectJobConfig;
  /** A list of triggers which will be OR'ed together. Only one in the list needs to trigger for a job to be started. The list may contain only a single Schedule trigger and must have at least one object. */
  triggers?: Array<GooglePrivacyDlpV2Trigger>;
  /** Output only. A stream of errors encountered when the trigger was activated. Repeated errors may result in the JobTrigger automatically being paused. Will return the last 100 errors. Whenever the JobTrigger is modified this list will be cleared. */
  errors?: Array<GooglePrivacyDlpV2Error>;
  /** Output only. The creation timestamp of a triggeredJob. */
  createTime?: string;
  /** Output only. The last update timestamp of a triggeredJob. */
  updateTime?: string;
  /** Output only. The timestamp of the last time this trigger executed. */
  lastRunTime?: string;
  /** Required. A status for this trigger. */
  status?: "STATUS_UNSPECIFIED" | "HEALTHY" | "PAUSED" | "CANCELLED" | (string & {});
}

export const GooglePrivacyDlpV2JobTrigger: Schema.Schema<GooglePrivacyDlpV2JobTrigger> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  inspectJob: Schema.optional(GooglePrivacyDlpV2InspectJobConfig),
  triggers: Schema.optional(Schema.Array(GooglePrivacyDlpV2Trigger)),
  errors: Schema.optional(Schema.Array(GooglePrivacyDlpV2Error)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastRunTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2JobTrigger" }) as any as Schema.Schema<GooglePrivacyDlpV2JobTrigger>;

export interface GooglePrivacyDlpV2CreateJobTriggerRequest {
  /** Required. The JobTrigger to create. */
  jobTrigger?: GooglePrivacyDlpV2JobTrigger;
  /** The trigger id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one. */
  triggerId?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2CreateJobTriggerRequest: Schema.Schema<GooglePrivacyDlpV2CreateJobTriggerRequest> = Schema.suspend(() => Schema.Struct({
  jobTrigger: Schema.optional(GooglePrivacyDlpV2JobTrigger),
  triggerId: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateJobTriggerRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateJobTriggerRequest>;

export interface GooglePrivacyDlpV2UpdateJobTriggerRequest {
  /** New JobTrigger value. */
  jobTrigger?: GooglePrivacyDlpV2JobTrigger;
  /** Mask to control which fields get updated. */
  updateMask?: string;
}

export const GooglePrivacyDlpV2UpdateJobTriggerRequest: Schema.Schema<GooglePrivacyDlpV2UpdateJobTriggerRequest> = Schema.suspend(() => Schema.Struct({
  jobTrigger: Schema.optional(GooglePrivacyDlpV2JobTrigger),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UpdateJobTriggerRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2UpdateJobTriggerRequest>;

export interface GooglePrivacyDlpV2HybridFindingDetails {
  /** Details about the container where the content being inspected is from. */
  containerDetails?: GooglePrivacyDlpV2Container;
  /** Offset in bytes of the line, from the beginning of the file, where the finding is located. Populate if the item being scanned is only part of a bigger item, such as a shard of a file and you want to track the absolute position of the finding. */
  fileOffset?: string;
  /** Offset of the row for tables. Populate if the row(s) being scanned are part of a bigger dataset and you want to keep track of their absolute position. */
  rowOffset?: string;
  /** If the container is a table, additional information to make findings meaningful such as the columns that are primary keys. If not known ahead of time, can also be set within each inspect hybrid call and the two will be merged. Note that identifying_fields will only be stored to BigQuery, and only if the BigQuery action has been included. */
  tableOptions?: GooglePrivacyDlpV2TableOptions;
  /** Labels to represent user provided metadata about the data being inspected. If configured by the job, some key values may be required. The labels associated with `Finding`'s produced by hybrid inspection. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment" : "production"` * `"pipeline" : "etl"` */
  labels?: Record<string, string>;
}

export const GooglePrivacyDlpV2HybridFindingDetails: Schema.Schema<GooglePrivacyDlpV2HybridFindingDetails> = Schema.suspend(() => Schema.Struct({
  containerDetails: Schema.optional(GooglePrivacyDlpV2Container),
  fileOffset: Schema.optional(Schema.String),
  rowOffset: Schema.optional(Schema.String),
  tableOptions: Schema.optional(GooglePrivacyDlpV2TableOptions),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2HybridFindingDetails" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridFindingDetails>;

export interface GooglePrivacyDlpV2HybridContentItem {
  /** The item to inspect. */
  item?: GooglePrivacyDlpV2ContentItem;
  /** Supplementary information that will be added to each finding. */
  findingDetails?: GooglePrivacyDlpV2HybridFindingDetails;
}

export const GooglePrivacyDlpV2HybridContentItem: Schema.Schema<GooglePrivacyDlpV2HybridContentItem> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(GooglePrivacyDlpV2ContentItem),
  findingDetails: Schema.optional(GooglePrivacyDlpV2HybridFindingDetails),
})).annotate({ identifier: "GooglePrivacyDlpV2HybridContentItem" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridContentItem>;

export interface GooglePrivacyDlpV2HybridInspectJobTriggerRequest {
  /** The item to inspect. */
  hybridItem?: GooglePrivacyDlpV2HybridContentItem;
}

export const GooglePrivacyDlpV2HybridInspectJobTriggerRequest: Schema.Schema<GooglePrivacyDlpV2HybridInspectJobTriggerRequest> = Schema.suspend(() => Schema.Struct({
  hybridItem: Schema.optional(GooglePrivacyDlpV2HybridContentItem),
})).annotate({ identifier: "GooglePrivacyDlpV2HybridInspectJobTriggerRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridInspectJobTriggerRequest>;

export interface GooglePrivacyDlpV2HybridInspectResponse {
}

export const GooglePrivacyDlpV2HybridInspectResponse: Schema.Schema<GooglePrivacyDlpV2HybridInspectResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2HybridInspectResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridInspectResponse>;

export interface GooglePrivacyDlpV2ListJobTriggersResponse {
  /** List of triggeredJobs, up to page_size in ListJobTriggersRequest. */
  jobTriggers?: Array<GooglePrivacyDlpV2JobTrigger>;
  /** If the next page is available then this value is the next page token to be used in the following ListJobTriggers request. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListJobTriggersResponse: Schema.Schema<GooglePrivacyDlpV2ListJobTriggersResponse> = Schema.suspend(() => Schema.Struct({
  jobTriggers: Schema.optional(Schema.Array(GooglePrivacyDlpV2JobTrigger)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListJobTriggersResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListJobTriggersResponse>;

export interface GooglePrivacyDlpV2ActivateJobTriggerRequest {
}

export const GooglePrivacyDlpV2ActivateJobTriggerRequest: Schema.Schema<GooglePrivacyDlpV2ActivateJobTriggerRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2ActivateJobTriggerRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2ActivateJobTriggerRequest>;

export interface GooglePrivacyDlpV2NumericalStatsConfig {
  /** Field to compute numerical stats on. Supported types are integer, float, date, datetime, timestamp, time. */
  field?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2NumericalStatsConfig: Schema.Schema<GooglePrivacyDlpV2NumericalStatsConfig> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2NumericalStatsConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2NumericalStatsConfig>;

export interface GooglePrivacyDlpV2CategoricalStatsConfig {
  /** Field to compute categorical stats on. All column types are supported except for arrays and structs. However, it may be more informative to use NumericalStats when the field type is supported, depending on the data. */
  field?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2CategoricalStatsConfig: Schema.Schema<GooglePrivacyDlpV2CategoricalStatsConfig> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2CategoricalStatsConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2CategoricalStatsConfig>;

export interface GooglePrivacyDlpV2EntityId {
  /** Composite key indicating which field contains the entity identifier. */
  field?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2EntityId: Schema.Schema<GooglePrivacyDlpV2EntityId> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2EntityId" }) as any as Schema.Schema<GooglePrivacyDlpV2EntityId>;

export interface GooglePrivacyDlpV2KAnonymityConfig {
  /** Set of fields to compute k-anonymity over. When multiple fields are specified, they are considered a single composite key. Structs and repeated data types are not supported; however, nested fields are supported so long as they are not structs themselves or nested within a repeated field. */
  quasiIds?: Array<GooglePrivacyDlpV2FieldId>;
  /** Message indicating that multiple rows might be associated to a single individual. If the same entity_id is associated to multiple quasi-identifier tuples over distinct rows, we consider the entire collection of tuples as the composite quasi-identifier. This collection is a multiset: the order in which the different tuples appear in the dataset is ignored, but their frequency is taken into account. Important note: a maximum of 1000 rows can be associated to a single entity ID. If more rows are associated with the same entity ID, some might be ignored. */
  entityId?: GooglePrivacyDlpV2EntityId;
}

export const GooglePrivacyDlpV2KAnonymityConfig: Schema.Schema<GooglePrivacyDlpV2KAnonymityConfig> = Schema.suspend(() => Schema.Struct({
  quasiIds: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
  entityId: Schema.optional(GooglePrivacyDlpV2EntityId),
})).annotate({ identifier: "GooglePrivacyDlpV2KAnonymityConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2KAnonymityConfig>;

export interface GooglePrivacyDlpV2LDiversityConfig {
  /** Set of quasi-identifiers indicating how equivalence classes are defined for the l-diversity computation. When multiple fields are specified, they are considered a single composite key. */
  quasiIds?: Array<GooglePrivacyDlpV2FieldId>;
  /** Sensitive field for computing the l-value. */
  sensitiveAttribute?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2LDiversityConfig: Schema.Schema<GooglePrivacyDlpV2LDiversityConfig> = Schema.suspend(() => Schema.Struct({
  quasiIds: Schema.optional(Schema.Array(GooglePrivacyDlpV2FieldId)),
  sensitiveAttribute: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2LDiversityConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2LDiversityConfig>;

export interface GooglePrivacyDlpV2TaggedField {
  /** Required. Identifies the column. */
  field?: GooglePrivacyDlpV2FieldId;
  /** A column can be tagged with a InfoType to use the relevant public dataset as a statistical model of population, if available. We currently support US ZIP codes, region codes, ages and genders. To programmatically obtain the list of supported InfoTypes, use ListInfoTypes with the supported_by=RISK_ANALYSIS filter. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** A column can be tagged with a custom tag. In this case, the user must indicate an auxiliary table that contains statistical information on the possible values of this column. */
  customTag?: string;
  /** If no semantic tag is indicated, we infer the statistical model from the distribution of values in the input data */
  inferred?: GoogleProtobufEmpty;
}

export const GooglePrivacyDlpV2TaggedField: Schema.Schema<GooglePrivacyDlpV2TaggedField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  customTag: Schema.optional(Schema.String),
  inferred: Schema.optional(GoogleProtobufEmpty),
})).annotate({ identifier: "GooglePrivacyDlpV2TaggedField" }) as any as Schema.Schema<GooglePrivacyDlpV2TaggedField>;

export interface GooglePrivacyDlpV2QuasiIdField {
  /** Identifies the column. */
  field?: GooglePrivacyDlpV2FieldId;
  /** A auxiliary field. */
  customTag?: string;
}

export const GooglePrivacyDlpV2QuasiIdField: Schema.Schema<GooglePrivacyDlpV2QuasiIdField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
  customTag: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2QuasiIdField" }) as any as Schema.Schema<GooglePrivacyDlpV2QuasiIdField>;

export interface GooglePrivacyDlpV2AuxiliaryTable {
  /** Required. Auxiliary table location. */
  table?: GooglePrivacyDlpV2BigQueryTable;
  /** Required. Quasi-identifier columns. */
  quasiIds?: Array<GooglePrivacyDlpV2QuasiIdField>;
  /** Required. The relative frequency column must contain a floating-point number between 0 and 1 (inclusive). Null values are assumed to be zero. */
  relativeFrequency?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2AuxiliaryTable: Schema.Schema<GooglePrivacyDlpV2AuxiliaryTable> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  quasiIds: Schema.optional(Schema.Array(GooglePrivacyDlpV2QuasiIdField)),
  relativeFrequency: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2AuxiliaryTable" }) as any as Schema.Schema<GooglePrivacyDlpV2AuxiliaryTable>;

export interface GooglePrivacyDlpV2KMapEstimationConfig {
  /** Required. Fields considered to be quasi-identifiers. No two columns can have the same tag. */
  quasiIds?: Array<GooglePrivacyDlpV2TaggedField>;
  /** ISO 3166-1 alpha-2 region code to use in the statistical modeling. Set if no column is tagged with a region-specific InfoType (like US_ZIP_5) or a region code. */
  regionCode?: string;
  /** Several auxiliary tables can be used in the analysis. Each custom_tag used to tag a quasi-identifiers column must appear in exactly one column of one auxiliary table. */
  auxiliaryTables?: Array<GooglePrivacyDlpV2AuxiliaryTable>;
}

export const GooglePrivacyDlpV2KMapEstimationConfig: Schema.Schema<GooglePrivacyDlpV2KMapEstimationConfig> = Schema.suspend(() => Schema.Struct({
  quasiIds: Schema.optional(Schema.Array(GooglePrivacyDlpV2TaggedField)),
  regionCode: Schema.optional(Schema.String),
  auxiliaryTables: Schema.optional(Schema.Array(GooglePrivacyDlpV2AuxiliaryTable)),
})).annotate({ identifier: "GooglePrivacyDlpV2KMapEstimationConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2KMapEstimationConfig>;

export interface GooglePrivacyDlpV2QuasiId {
  /** Required. Identifies the column. */
  field?: GooglePrivacyDlpV2FieldId;
  /** A column can be tagged with a InfoType to use the relevant public dataset as a statistical model of population, if available. We currently support US ZIP codes, region codes, ages and genders. To programmatically obtain the list of supported InfoTypes, use ListInfoTypes with the supported_by=RISK_ANALYSIS filter. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** A column can be tagged with a custom tag. In this case, the user must indicate an auxiliary table that contains statistical information on the possible values of this column. */
  customTag?: string;
  /** If no semantic tag is indicated, we infer the statistical model from the distribution of values in the input data */
  inferred?: GoogleProtobufEmpty;
}

export const GooglePrivacyDlpV2QuasiId: Schema.Schema<GooglePrivacyDlpV2QuasiId> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  customTag: Schema.optional(Schema.String),
  inferred: Schema.optional(GoogleProtobufEmpty),
})).annotate({ identifier: "GooglePrivacyDlpV2QuasiId" }) as any as Schema.Schema<GooglePrivacyDlpV2QuasiId>;

export interface GooglePrivacyDlpV2QuasiIdentifierField {
  /** Identifies the column. */
  field?: GooglePrivacyDlpV2FieldId;
  /** A column can be tagged with a custom tag. In this case, the user must indicate an auxiliary table that contains statistical information on the possible values of this column. */
  customTag?: string;
}

export const GooglePrivacyDlpV2QuasiIdentifierField: Schema.Schema<GooglePrivacyDlpV2QuasiIdentifierField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
  customTag: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2QuasiIdentifierField" }) as any as Schema.Schema<GooglePrivacyDlpV2QuasiIdentifierField>;

export interface GooglePrivacyDlpV2StatisticalTable {
  /** Required. Auxiliary table location. */
  table?: GooglePrivacyDlpV2BigQueryTable;
  /** Required. Quasi-identifier columns. */
  quasiIds?: Array<GooglePrivacyDlpV2QuasiIdentifierField>;
  /** Required. The relative frequency column must contain a floating-point number between 0 and 1 (inclusive). Null values are assumed to be zero. */
  relativeFrequency?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2StatisticalTable: Schema.Schema<GooglePrivacyDlpV2StatisticalTable> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  quasiIds: Schema.optional(Schema.Array(GooglePrivacyDlpV2QuasiIdentifierField)),
  relativeFrequency: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2StatisticalTable" }) as any as Schema.Schema<GooglePrivacyDlpV2StatisticalTable>;

export interface GooglePrivacyDlpV2DeltaPresenceEstimationConfig {
  /** Required. Fields considered to be quasi-identifiers. No two fields can have the same tag. */
  quasiIds?: Array<GooglePrivacyDlpV2QuasiId>;
  /** ISO 3166-1 alpha-2 region code to use in the statistical modeling. Set if no column is tagged with a region-specific InfoType (like US_ZIP_5) or a region code. */
  regionCode?: string;
  /** Several auxiliary tables can be used in the analysis. Each custom_tag used to tag a quasi-identifiers field must appear in exactly one field of one auxiliary table. */
  auxiliaryTables?: Array<GooglePrivacyDlpV2StatisticalTable>;
}

export const GooglePrivacyDlpV2DeltaPresenceEstimationConfig: Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationConfig> = Schema.suspend(() => Schema.Struct({
  quasiIds: Schema.optional(Schema.Array(GooglePrivacyDlpV2QuasiId)),
  regionCode: Schema.optional(Schema.String),
  auxiliaryTables: Schema.optional(Schema.Array(GooglePrivacyDlpV2StatisticalTable)),
})).annotate({ identifier: "GooglePrivacyDlpV2DeltaPresenceEstimationConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationConfig>;

export interface GooglePrivacyDlpV2PrivacyMetric {
  /** Numerical stats */
  numericalStatsConfig?: GooglePrivacyDlpV2NumericalStatsConfig;
  /** Categorical stats */
  categoricalStatsConfig?: GooglePrivacyDlpV2CategoricalStatsConfig;
  /** K-anonymity */
  kAnonymityConfig?: GooglePrivacyDlpV2KAnonymityConfig;
  /** l-diversity */
  lDiversityConfig?: GooglePrivacyDlpV2LDiversityConfig;
  /** k-map */
  kMapEstimationConfig?: GooglePrivacyDlpV2KMapEstimationConfig;
  /** delta-presence */
  deltaPresenceEstimationConfig?: GooglePrivacyDlpV2DeltaPresenceEstimationConfig;
}

export const GooglePrivacyDlpV2PrivacyMetric: Schema.Schema<GooglePrivacyDlpV2PrivacyMetric> = Schema.suspend(() => Schema.Struct({
  numericalStatsConfig: Schema.optional(GooglePrivacyDlpV2NumericalStatsConfig),
  categoricalStatsConfig: Schema.optional(GooglePrivacyDlpV2CategoricalStatsConfig),
  kAnonymityConfig: Schema.optional(GooglePrivacyDlpV2KAnonymityConfig),
  lDiversityConfig: Schema.optional(GooglePrivacyDlpV2LDiversityConfig),
  kMapEstimationConfig: Schema.optional(GooglePrivacyDlpV2KMapEstimationConfig),
  deltaPresenceEstimationConfig: Schema.optional(GooglePrivacyDlpV2DeltaPresenceEstimationConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2PrivacyMetric" }) as any as Schema.Schema<GooglePrivacyDlpV2PrivacyMetric>;

export interface GooglePrivacyDlpV2NumericalStatsResult {
  /** Minimum value appearing in the column. */
  minValue?: GooglePrivacyDlpV2Value;
  /** Maximum value appearing in the column. */
  maxValue?: GooglePrivacyDlpV2Value;
  /** List of 99 values that partition the set of field values into 100 equal sized buckets. */
  quantileValues?: Array<GooglePrivacyDlpV2Value>;
}

export const GooglePrivacyDlpV2NumericalStatsResult: Schema.Schema<GooglePrivacyDlpV2NumericalStatsResult> = Schema.suspend(() => Schema.Struct({
  minValue: Schema.optional(GooglePrivacyDlpV2Value),
  maxValue: Schema.optional(GooglePrivacyDlpV2Value),
  quantileValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2Value)),
})).annotate({ identifier: "GooglePrivacyDlpV2NumericalStatsResult" }) as any as Schema.Schema<GooglePrivacyDlpV2NumericalStatsResult>;

export interface GooglePrivacyDlpV2ValueFrequency {
  /** A value contained in the field in question. */
  value?: GooglePrivacyDlpV2Value;
  /** How many times the value is contained in the field. */
  count?: string;
}

export const GooglePrivacyDlpV2ValueFrequency: Schema.Schema<GooglePrivacyDlpV2ValueFrequency> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(GooglePrivacyDlpV2Value),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ValueFrequency" }) as any as Schema.Schema<GooglePrivacyDlpV2ValueFrequency>;

export interface GooglePrivacyDlpV2CategoricalStatsHistogramBucket {
  /** Lower bound on the value frequency of the values in this bucket. */
  valueFrequencyLowerBound?: string;
  /** Upper bound on the value frequency of the values in this bucket. */
  valueFrequencyUpperBound?: string;
  /** Total number of values in this bucket. */
  bucketSize?: string;
  /** Sample of value frequencies in this bucket. The total number of values returned per bucket is capped at 20. */
  bucketValues?: Array<GooglePrivacyDlpV2ValueFrequency>;
  /** Total number of distinct values in this bucket. */
  bucketValueCount?: string;
}

export const GooglePrivacyDlpV2CategoricalStatsHistogramBucket: Schema.Schema<GooglePrivacyDlpV2CategoricalStatsHistogramBucket> = Schema.suspend(() => Schema.Struct({
  valueFrequencyLowerBound: Schema.optional(Schema.String),
  valueFrequencyUpperBound: Schema.optional(Schema.String),
  bucketSize: Schema.optional(Schema.String),
  bucketValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2ValueFrequency)),
  bucketValueCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CategoricalStatsHistogramBucket" }) as any as Schema.Schema<GooglePrivacyDlpV2CategoricalStatsHistogramBucket>;

export interface GooglePrivacyDlpV2CategoricalStatsResult {
  /** Histogram of value frequencies in the column. */
  valueFrequencyHistogramBuckets?: Array<GooglePrivacyDlpV2CategoricalStatsHistogramBucket>;
}

export const GooglePrivacyDlpV2CategoricalStatsResult: Schema.Schema<GooglePrivacyDlpV2CategoricalStatsResult> = Schema.suspend(() => Schema.Struct({
  valueFrequencyHistogramBuckets: Schema.optional(Schema.Array(GooglePrivacyDlpV2CategoricalStatsHistogramBucket)),
})).annotate({ identifier: "GooglePrivacyDlpV2CategoricalStatsResult" }) as any as Schema.Schema<GooglePrivacyDlpV2CategoricalStatsResult>;

export interface GooglePrivacyDlpV2KAnonymityEquivalenceClass {
  /** Set of values defining the equivalence class. One value per quasi-identifier column in the original KAnonymity metric message. The order is always the same as the original request. */
  quasiIdsValues?: Array<GooglePrivacyDlpV2Value>;
  /** Size of the equivalence class, for example number of rows with the above set of values. */
  equivalenceClassSize?: string;
}

export const GooglePrivacyDlpV2KAnonymityEquivalenceClass: Schema.Schema<GooglePrivacyDlpV2KAnonymityEquivalenceClass> = Schema.suspend(() => Schema.Struct({
  quasiIdsValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2Value)),
  equivalenceClassSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2KAnonymityEquivalenceClass" }) as any as Schema.Schema<GooglePrivacyDlpV2KAnonymityEquivalenceClass>;

export interface GooglePrivacyDlpV2KAnonymityHistogramBucket {
  /** Lower bound on the size of the equivalence classes in this bucket. */
  equivalenceClassSizeLowerBound?: string;
  /** Upper bound on the size of the equivalence classes in this bucket. */
  equivalenceClassSizeUpperBound?: string;
  /** Total number of equivalence classes in this bucket. */
  bucketSize?: string;
  /** Sample of equivalence classes in this bucket. The total number of classes returned per bucket is capped at 20. */
  bucketValues?: Array<GooglePrivacyDlpV2KAnonymityEquivalenceClass>;
  /** Total number of distinct equivalence classes in this bucket. */
  bucketValueCount?: string;
}

export const GooglePrivacyDlpV2KAnonymityHistogramBucket: Schema.Schema<GooglePrivacyDlpV2KAnonymityHistogramBucket> = Schema.suspend(() => Schema.Struct({
  equivalenceClassSizeLowerBound: Schema.optional(Schema.String),
  equivalenceClassSizeUpperBound: Schema.optional(Schema.String),
  bucketSize: Schema.optional(Schema.String),
  bucketValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2KAnonymityEquivalenceClass)),
  bucketValueCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2KAnonymityHistogramBucket" }) as any as Schema.Schema<GooglePrivacyDlpV2KAnonymityHistogramBucket>;

export interface GooglePrivacyDlpV2KAnonymityResult {
  /** Histogram of k-anonymity equivalence classes. */
  equivalenceClassHistogramBuckets?: Array<GooglePrivacyDlpV2KAnonymityHistogramBucket>;
}

export const GooglePrivacyDlpV2KAnonymityResult: Schema.Schema<GooglePrivacyDlpV2KAnonymityResult> = Schema.suspend(() => Schema.Struct({
  equivalenceClassHistogramBuckets: Schema.optional(Schema.Array(GooglePrivacyDlpV2KAnonymityHistogramBucket)),
})).annotate({ identifier: "GooglePrivacyDlpV2KAnonymityResult" }) as any as Schema.Schema<GooglePrivacyDlpV2KAnonymityResult>;

export interface GooglePrivacyDlpV2LDiversityEquivalenceClass {
  /** Quasi-identifier values defining the k-anonymity equivalence class. The order is always the same as the original request. */
  quasiIdsValues?: Array<GooglePrivacyDlpV2Value>;
  /** Size of the k-anonymity equivalence class. */
  equivalenceClassSize?: string;
  /** Number of distinct sensitive values in this equivalence class. */
  numDistinctSensitiveValues?: string;
  /** Estimated frequencies of top sensitive values. */
  topSensitiveValues?: Array<GooglePrivacyDlpV2ValueFrequency>;
}

export const GooglePrivacyDlpV2LDiversityEquivalenceClass: Schema.Schema<GooglePrivacyDlpV2LDiversityEquivalenceClass> = Schema.suspend(() => Schema.Struct({
  quasiIdsValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2Value)),
  equivalenceClassSize: Schema.optional(Schema.String),
  numDistinctSensitiveValues: Schema.optional(Schema.String),
  topSensitiveValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2ValueFrequency)),
})).annotate({ identifier: "GooglePrivacyDlpV2LDiversityEquivalenceClass" }) as any as Schema.Schema<GooglePrivacyDlpV2LDiversityEquivalenceClass>;

export interface GooglePrivacyDlpV2LDiversityHistogramBucket {
  /** Lower bound on the sensitive value frequencies of the equivalence classes in this bucket. */
  sensitiveValueFrequencyLowerBound?: string;
  /** Upper bound on the sensitive value frequencies of the equivalence classes in this bucket. */
  sensitiveValueFrequencyUpperBound?: string;
  /** Total number of equivalence classes in this bucket. */
  bucketSize?: string;
  /** Sample of equivalence classes in this bucket. The total number of classes returned per bucket is capped at 20. */
  bucketValues?: Array<GooglePrivacyDlpV2LDiversityEquivalenceClass>;
  /** Total number of distinct equivalence classes in this bucket. */
  bucketValueCount?: string;
}

export const GooglePrivacyDlpV2LDiversityHistogramBucket: Schema.Schema<GooglePrivacyDlpV2LDiversityHistogramBucket> = Schema.suspend(() => Schema.Struct({
  sensitiveValueFrequencyLowerBound: Schema.optional(Schema.String),
  sensitiveValueFrequencyUpperBound: Schema.optional(Schema.String),
  bucketSize: Schema.optional(Schema.String),
  bucketValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2LDiversityEquivalenceClass)),
  bucketValueCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2LDiversityHistogramBucket" }) as any as Schema.Schema<GooglePrivacyDlpV2LDiversityHistogramBucket>;

export interface GooglePrivacyDlpV2LDiversityResult {
  /** Histogram of l-diversity equivalence class sensitive value frequencies. */
  sensitiveValueFrequencyHistogramBuckets?: Array<GooglePrivacyDlpV2LDiversityHistogramBucket>;
}

export const GooglePrivacyDlpV2LDiversityResult: Schema.Schema<GooglePrivacyDlpV2LDiversityResult> = Schema.suspend(() => Schema.Struct({
  sensitiveValueFrequencyHistogramBuckets: Schema.optional(Schema.Array(GooglePrivacyDlpV2LDiversityHistogramBucket)),
})).annotate({ identifier: "GooglePrivacyDlpV2LDiversityResult" }) as any as Schema.Schema<GooglePrivacyDlpV2LDiversityResult>;

export interface GooglePrivacyDlpV2KMapEstimationQuasiIdValues {
  /** The quasi-identifier values. */
  quasiIdsValues?: Array<GooglePrivacyDlpV2Value>;
  /** The estimated anonymity for these quasi-identifier values. */
  estimatedAnonymity?: string;
}

export const GooglePrivacyDlpV2KMapEstimationQuasiIdValues: Schema.Schema<GooglePrivacyDlpV2KMapEstimationQuasiIdValues> = Schema.suspend(() => Schema.Struct({
  quasiIdsValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2Value)),
  estimatedAnonymity: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2KMapEstimationQuasiIdValues" }) as any as Schema.Schema<GooglePrivacyDlpV2KMapEstimationQuasiIdValues>;

export interface GooglePrivacyDlpV2KMapEstimationHistogramBucket {
  /** Always positive. */
  minAnonymity?: string;
  /** Always greater than or equal to min_anonymity. */
  maxAnonymity?: string;
  /** Number of records within these anonymity bounds. */
  bucketSize?: string;
  /** Sample of quasi-identifier tuple values in this bucket. The total number of classes returned per bucket is capped at 20. */
  bucketValues?: Array<GooglePrivacyDlpV2KMapEstimationQuasiIdValues>;
  /** Total number of distinct quasi-identifier tuple values in this bucket. */
  bucketValueCount?: string;
}

export const GooglePrivacyDlpV2KMapEstimationHistogramBucket: Schema.Schema<GooglePrivacyDlpV2KMapEstimationHistogramBucket> = Schema.suspend(() => Schema.Struct({
  minAnonymity: Schema.optional(Schema.String),
  maxAnonymity: Schema.optional(Schema.String),
  bucketSize: Schema.optional(Schema.String),
  bucketValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2KMapEstimationQuasiIdValues)),
  bucketValueCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2KMapEstimationHistogramBucket" }) as any as Schema.Schema<GooglePrivacyDlpV2KMapEstimationHistogramBucket>;

export interface GooglePrivacyDlpV2KMapEstimationResult {
  /** The intervals [min_anonymity, max_anonymity] do not overlap. If a value doesn't correspond to any such interval, the associated frequency is zero. For example, the following records: {min_anonymity: 1, max_anonymity: 1, frequency: 17} {min_anonymity: 2, max_anonymity: 3, frequency: 42} {min_anonymity: 5, max_anonymity: 10, frequency: 99} mean that there are no record with an estimated anonymity of 4, 5, or larger than 10. */
  kMapEstimationHistogram?: Array<GooglePrivacyDlpV2KMapEstimationHistogramBucket>;
}

export const GooglePrivacyDlpV2KMapEstimationResult: Schema.Schema<GooglePrivacyDlpV2KMapEstimationResult> = Schema.suspend(() => Schema.Struct({
  kMapEstimationHistogram: Schema.optional(Schema.Array(GooglePrivacyDlpV2KMapEstimationHistogramBucket)),
})).annotate({ identifier: "GooglePrivacyDlpV2KMapEstimationResult" }) as any as Schema.Schema<GooglePrivacyDlpV2KMapEstimationResult>;

export interface GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues {
  /** The quasi-identifier values. */
  quasiIdsValues?: Array<GooglePrivacyDlpV2Value>;
  /** The estimated probability that a given individual sharing these quasi-identifier values is in the dataset. This value, typically called δ, is the ratio between the number of records in the dataset with these quasi-identifier values, and the total number of individuals (inside *and* outside the dataset) with these quasi-identifier values. For example, if there are 15 individuals in the dataset who share the same quasi-identifier values, and an estimated 100 people in the entire population with these values, then δ is 0.15. */
  estimatedProbability?: number;
}

export const GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues: Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues> = Schema.suspend(() => Schema.Struct({
  quasiIdsValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2Value)),
  estimatedProbability: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues" }) as any as Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues>;

export interface GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket {
  /** Between 0 and 1. */
  minProbability?: number;
  /** Always greater than or equal to min_probability. */
  maxProbability?: number;
  /** Number of records within these probability bounds. */
  bucketSize?: string;
  /** Sample of quasi-identifier tuple values in this bucket. The total number of classes returned per bucket is capped at 20. */
  bucketValues?: Array<GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues>;
  /** Total number of distinct quasi-identifier tuple values in this bucket. */
  bucketValueCount?: string;
}

export const GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket: Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket> = Schema.suspend(() => Schema.Struct({
  minProbability: Schema.optional(Schema.Number),
  maxProbability: Schema.optional(Schema.Number),
  bucketSize: Schema.optional(Schema.String),
  bucketValues: Schema.optional(Schema.Array(GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues)),
  bucketValueCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket" }) as any as Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket>;

export interface GooglePrivacyDlpV2DeltaPresenceEstimationResult {
  /** The intervals [min_probability, max_probability) do not overlap. If a value doesn't correspond to any such interval, the associated frequency is zero. For example, the following records: {min_probability: 0, max_probability: 0.1, frequency: 17} {min_probability: 0.2, max_probability: 0.3, frequency: 42} {min_probability: 0.3, max_probability: 0.4, frequency: 99} mean that there are no record with an estimated probability in [0.1, 0.2) nor larger or equal to 0.4. */
  deltaPresenceEstimationHistogram?: Array<GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket>;
}

export const GooglePrivacyDlpV2DeltaPresenceEstimationResult: Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationResult> = Schema.suspend(() => Schema.Struct({
  deltaPresenceEstimationHistogram: Schema.optional(Schema.Array(GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket)),
})).annotate({ identifier: "GooglePrivacyDlpV2DeltaPresenceEstimationResult" }) as any as Schema.Schema<GooglePrivacyDlpV2DeltaPresenceEstimationResult>;

export interface GooglePrivacyDlpV2RiskAnalysisJobConfig {
  /** Privacy metric to compute. */
  privacyMetric?: GooglePrivacyDlpV2PrivacyMetric;
  /** Input dataset to compute metrics over. */
  sourceTable?: GooglePrivacyDlpV2BigQueryTable;
  /** Actions to execute at the completion of the job. Are executed in the order provided. */
  actions?: Array<GooglePrivacyDlpV2Action>;
}

export const GooglePrivacyDlpV2RiskAnalysisJobConfig: Schema.Schema<GooglePrivacyDlpV2RiskAnalysisJobConfig> = Schema.suspend(() => Schema.Struct({
  privacyMetric: Schema.optional(GooglePrivacyDlpV2PrivacyMetric),
  sourceTable: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  actions: Schema.optional(Schema.Array(GooglePrivacyDlpV2Action)),
})).annotate({ identifier: "GooglePrivacyDlpV2RiskAnalysisJobConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2RiskAnalysisJobConfig>;

export interface GooglePrivacyDlpV2RequestedRiskAnalysisOptions {
  /** The job config for the risk job. */
  jobConfig?: GooglePrivacyDlpV2RiskAnalysisJobConfig;
}

export const GooglePrivacyDlpV2RequestedRiskAnalysisOptions: Schema.Schema<GooglePrivacyDlpV2RequestedRiskAnalysisOptions> = Schema.suspend(() => Schema.Struct({
  jobConfig: Schema.optional(GooglePrivacyDlpV2RiskAnalysisJobConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2RequestedRiskAnalysisOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2RequestedRiskAnalysisOptions>;

export interface GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails {
  /** Privacy metric to compute. */
  requestedPrivacyMetric?: GooglePrivacyDlpV2PrivacyMetric;
  /** Input dataset to compute metrics over. */
  requestedSourceTable?: GooglePrivacyDlpV2BigQueryTable;
  /** Numerical stats result */
  numericalStatsResult?: GooglePrivacyDlpV2NumericalStatsResult;
  /** Categorical stats result */
  categoricalStatsResult?: GooglePrivacyDlpV2CategoricalStatsResult;
  /** K-anonymity result */
  kAnonymityResult?: GooglePrivacyDlpV2KAnonymityResult;
  /** L-divesity result */
  lDiversityResult?: GooglePrivacyDlpV2LDiversityResult;
  /** K-map result */
  kMapEstimationResult?: GooglePrivacyDlpV2KMapEstimationResult;
  /** Delta-presence result */
  deltaPresenceEstimationResult?: GooglePrivacyDlpV2DeltaPresenceEstimationResult;
  /** The configuration used for this job. */
  requestedOptions?: GooglePrivacyDlpV2RequestedRiskAnalysisOptions;
}

export const GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails: Schema.Schema<GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails> = Schema.suspend(() => Schema.Struct({
  requestedPrivacyMetric: Schema.optional(GooglePrivacyDlpV2PrivacyMetric),
  requestedSourceTable: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  numericalStatsResult: Schema.optional(GooglePrivacyDlpV2NumericalStatsResult),
  categoricalStatsResult: Schema.optional(GooglePrivacyDlpV2CategoricalStatsResult),
  kAnonymityResult: Schema.optional(GooglePrivacyDlpV2KAnonymityResult),
  lDiversityResult: Schema.optional(GooglePrivacyDlpV2LDiversityResult),
  kMapEstimationResult: Schema.optional(GooglePrivacyDlpV2KMapEstimationResult),
  deltaPresenceEstimationResult: Schema.optional(GooglePrivacyDlpV2DeltaPresenceEstimationResult),
  requestedOptions: Schema.optional(GooglePrivacyDlpV2RequestedRiskAnalysisOptions),
})).annotate({ identifier: "GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails" }) as any as Schema.Schema<GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails>;

export interface GooglePrivacyDlpV2RequestedOptions {
  /** If run with an InspectTemplate, a snapshot of its state at the time of this run. */
  snapshotInspectTemplate?: GooglePrivacyDlpV2InspectTemplate;
  /** Inspect config. */
  jobConfig?: GooglePrivacyDlpV2InspectJobConfig;
}

export const GooglePrivacyDlpV2RequestedOptions: Schema.Schema<GooglePrivacyDlpV2RequestedOptions> = Schema.suspend(() => Schema.Struct({
  snapshotInspectTemplate: Schema.optional(GooglePrivacyDlpV2InspectTemplate),
  jobConfig: Schema.optional(GooglePrivacyDlpV2InspectJobConfig),
})).annotate({ identifier: "GooglePrivacyDlpV2RequestedOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2RequestedOptions>;

export interface GooglePrivacyDlpV2InfoTypeStats {
  /** The type of finding this stat is for. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Number of findings for this infoType. */
  count?: string;
}

export const GooglePrivacyDlpV2InfoTypeStats: Schema.Schema<GooglePrivacyDlpV2InfoTypeStats> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeStats" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeStats>;

export interface GooglePrivacyDlpV2HybridInspectStatistics {
  /** The number of hybrid inspection requests processed within this job. */
  processedCount?: string;
  /** The number of hybrid inspection requests aborted because the job ran out of quota or was ended before they could be processed. */
  abortedCount?: string;
  /** The number of hybrid requests currently being processed. Only populated when called via method `getDlpJob`. A burst of traffic may cause hybrid inspect requests to be enqueued. Processing will take place as quickly as possible, but resource limitations may impact how long a request is enqueued for. */
  pendingCount?: string;
}

export const GooglePrivacyDlpV2HybridInspectStatistics: Schema.Schema<GooglePrivacyDlpV2HybridInspectStatistics> = Schema.suspend(() => Schema.Struct({
  processedCount: Schema.optional(Schema.String),
  abortedCount: Schema.optional(Schema.String),
  pendingCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2HybridInspectStatistics" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridInspectStatistics>;

export interface GooglePrivacyDlpV2Result {
  /** Total size in bytes that were processed. */
  processedBytes?: string;
  /** Estimate of the number of bytes to process. */
  totalEstimatedBytes?: string;
  /** Statistics of how many instances of each info type were found during inspect job. */
  infoTypeStats?: Array<GooglePrivacyDlpV2InfoTypeStats>;
  /** Number of rows scanned after sampling and time filtering (applicable for row based stores such as BigQuery). */
  numRowsProcessed?: string;
  /** Statistics related to the processing of hybrid inspect. */
  hybridStats?: GooglePrivacyDlpV2HybridInspectStatistics;
}

export const GooglePrivacyDlpV2Result: Schema.Schema<GooglePrivacyDlpV2Result> = Schema.suspend(() => Schema.Struct({
  processedBytes: Schema.optional(Schema.String),
  totalEstimatedBytes: Schema.optional(Schema.String),
  infoTypeStats: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeStats)),
  numRowsProcessed: Schema.optional(Schema.String),
  hybridStats: Schema.optional(GooglePrivacyDlpV2HybridInspectStatistics),
})).annotate({ identifier: "GooglePrivacyDlpV2Result" }) as any as Schema.Schema<GooglePrivacyDlpV2Result>;

export interface GooglePrivacyDlpV2InspectDataSourceDetails {
  /** The configuration used for this job. */
  requestedOptions?: GooglePrivacyDlpV2RequestedOptions;
  /** A summary of the outcome of this inspection job. */
  result?: GooglePrivacyDlpV2Result;
}

export const GooglePrivacyDlpV2InspectDataSourceDetails: Schema.Schema<GooglePrivacyDlpV2InspectDataSourceDetails> = Schema.suspend(() => Schema.Struct({
  requestedOptions: Schema.optional(GooglePrivacyDlpV2RequestedOptions),
  result: Schema.optional(GooglePrivacyDlpV2Result),
})).annotate({ identifier: "GooglePrivacyDlpV2InspectDataSourceDetails" }) as any as Schema.Schema<GooglePrivacyDlpV2InspectDataSourceDetails>;

export interface GooglePrivacyDlpV2RequestedDeidentifyOptions {
  /** Snapshot of the state of the `DeidentifyTemplate` from the Deidentify action at the time this job was run. */
  snapshotDeidentifyTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
  /** Snapshot of the state of the structured `DeidentifyTemplate` from the `Deidentify` action at the time this job was run. */
  snapshotStructuredDeidentifyTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
  /** Snapshot of the state of the image transformation `DeidentifyTemplate` from the `Deidentify` action at the time this job was run. */
  snapshotImageRedactTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
}

export const GooglePrivacyDlpV2RequestedDeidentifyOptions: Schema.Schema<GooglePrivacyDlpV2RequestedDeidentifyOptions> = Schema.suspend(() => Schema.Struct({
  snapshotDeidentifyTemplate: Schema.optional(GooglePrivacyDlpV2DeidentifyTemplate),
  snapshotStructuredDeidentifyTemplate: Schema.optional(GooglePrivacyDlpV2DeidentifyTemplate),
  snapshotImageRedactTemplate: Schema.optional(GooglePrivacyDlpV2DeidentifyTemplate),
})).annotate({ identifier: "GooglePrivacyDlpV2RequestedDeidentifyOptions" }) as any as Schema.Schema<GooglePrivacyDlpV2RequestedDeidentifyOptions>;

export interface GooglePrivacyDlpV2DeidentifyDataSourceStats {
  /** Total size in bytes that were transformed in some way. */
  transformedBytes?: string;
  /** Number of successfully applied transformations. */
  transformationCount?: string;
  /** Number of errors encountered while trying to apply transformations. */
  transformationErrorCount?: string;
}

export const GooglePrivacyDlpV2DeidentifyDataSourceStats: Schema.Schema<GooglePrivacyDlpV2DeidentifyDataSourceStats> = Schema.suspend(() => Schema.Struct({
  transformedBytes: Schema.optional(Schema.String),
  transformationCount: Schema.optional(Schema.String),
  transformationErrorCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DeidentifyDataSourceStats" }) as any as Schema.Schema<GooglePrivacyDlpV2DeidentifyDataSourceStats>;

export interface GooglePrivacyDlpV2DeidentifyDataSourceDetails {
  /** De-identification config used for the request. */
  requestedOptions?: GooglePrivacyDlpV2RequestedDeidentifyOptions;
  /** Stats about the de-identification operation. */
  deidentifyStats?: GooglePrivacyDlpV2DeidentifyDataSourceStats;
}

export const GooglePrivacyDlpV2DeidentifyDataSourceDetails: Schema.Schema<GooglePrivacyDlpV2DeidentifyDataSourceDetails> = Schema.suspend(() => Schema.Struct({
  requestedOptions: Schema.optional(GooglePrivacyDlpV2RequestedDeidentifyOptions),
  deidentifyStats: Schema.optional(GooglePrivacyDlpV2DeidentifyDataSourceStats),
})).annotate({ identifier: "GooglePrivacyDlpV2DeidentifyDataSourceDetails" }) as any as Schema.Schema<GooglePrivacyDlpV2DeidentifyDataSourceDetails>;

export interface GooglePrivacyDlpV2ActionDetails {
  /** Outcome of a de-identification action. */
  deidentifyDetails?: GooglePrivacyDlpV2DeidentifyDataSourceDetails;
}

export const GooglePrivacyDlpV2ActionDetails: Schema.Schema<GooglePrivacyDlpV2ActionDetails> = Schema.suspend(() => Schema.Struct({
  deidentifyDetails: Schema.optional(GooglePrivacyDlpV2DeidentifyDataSourceDetails),
})).annotate({ identifier: "GooglePrivacyDlpV2ActionDetails" }) as any as Schema.Schema<GooglePrivacyDlpV2ActionDetails>;

export interface GooglePrivacyDlpV2DlpJob {
  /** The server-assigned name. */
  name?: string;
  /** The type of job. */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** State of a job. */
  state?: "JOB_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | "CANCELED" | "FAILED" | "ACTIVE" | (string & {});
  /** Results from analyzing risk of a data source. */
  riskDetails?: GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails;
  /** Results from inspecting a data source. */
  inspectDetails?: GooglePrivacyDlpV2InspectDataSourceDetails;
  /** Time when the job was created. */
  createTime?: string;
  /** Time when the job started. */
  startTime?: string;
  /** Time when the job finished. */
  endTime?: string;
  /** Time when the job was last modified by the system. */
  lastModified?: string;
  /** If created by a job trigger, the resource name of the trigger that instantiated the job. */
  jobTriggerName?: string;
  /** A stream of errors encountered running the job. */
  errors?: Array<GooglePrivacyDlpV2Error>;
  /** Events that should occur after the job has completed. */
  actionDetails?: Array<GooglePrivacyDlpV2ActionDetails>;
}

export const GooglePrivacyDlpV2DlpJob: Schema.Schema<GooglePrivacyDlpV2DlpJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  riskDetails: Schema.optional(GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails),
  inspectDetails: Schema.optional(GooglePrivacyDlpV2InspectDataSourceDetails),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  lastModified: Schema.optional(Schema.String),
  jobTriggerName: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(GooglePrivacyDlpV2Error)),
  actionDetails: Schema.optional(Schema.Array(GooglePrivacyDlpV2ActionDetails)),
})).annotate({ identifier: "GooglePrivacyDlpV2DlpJob" }) as any as Schema.Schema<GooglePrivacyDlpV2DlpJob>;

export interface GooglePrivacyDlpV2DiscoveryStartingLocation {
  /** The ID of an organization to scan. */
  organizationId?: string;
  /** The ID of the folder within an organization to be scanned. */
  folderId?: string;
}

export const GooglePrivacyDlpV2DiscoveryStartingLocation: Schema.Schema<GooglePrivacyDlpV2DiscoveryStartingLocation> = Schema.suspend(() => Schema.Struct({
  organizationId: Schema.optional(Schema.String),
  folderId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryStartingLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryStartingLocation>;

export interface GooglePrivacyDlpV2OrgConfig {
  /** The data to scan: folder, org, or project */
  location?: GooglePrivacyDlpV2DiscoveryStartingLocation;
  /** The project that will run the scan. The DLP service account that exists within this project must have access to all resources that are profiled, and the DLP API must be enabled. */
  projectId?: string;
}

export const GooglePrivacyDlpV2OrgConfig: Schema.Schema<GooglePrivacyDlpV2OrgConfig> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(GooglePrivacyDlpV2DiscoveryStartingLocation),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2OrgConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2OrgConfig>;

export interface GooglePrivacyDlpV2AwsDiscoveryStartingLocation {
  /** The AWS account ID that this discovery config applies to. Within an AWS organization, you can find the AWS account ID inside an AWS account ARN. Example: arn:{partition}:organizations::{management_account_id}:account/{org_id}/{account_id} */
  accountId?: string;
  /** All AWS assets stored in Asset Inventory that didn't match other AWS discovery configs. */
  allAssetInventoryAssets?: boolean;
}

export const GooglePrivacyDlpV2AwsDiscoveryStartingLocation: Schema.Schema<GooglePrivacyDlpV2AwsDiscoveryStartingLocation> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  allAssetInventoryAssets: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2AwsDiscoveryStartingLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2AwsDiscoveryStartingLocation>;

export interface GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation {
  /** The AWS starting location for discovery. */
  awsLocation?: GooglePrivacyDlpV2AwsDiscoveryStartingLocation;
}

export const GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation: Schema.Schema<GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation> = Schema.suspend(() => Schema.Struct({
  awsLocation: Schema.optional(GooglePrivacyDlpV2AwsDiscoveryStartingLocation),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation>;

export interface GooglePrivacyDlpV2Export {
  /** Store all profiles to BigQuery. * The system will create a new dataset and table for you if none are are provided. The dataset will be named `sensitive_data_protection_discovery` and table will be named `discovery_profiles`. This table will be placed in the same project as the container project running the scan. After the first profile is generated and the dataset and table are created, the discovery scan configuration will be updated with the dataset and table names. * See [Analyze data profiles stored in BigQuery](https://cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles). * See [Sample queries for your BigQuery table](https://cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles#sample_sql_queries). * Data is inserted using [streaming insert](https://cloud.google.com/blog/products/bigquery/life-of-a-bigquery-streaming-insert) and so data may be in the buffer for a period of time after the profile has finished. * The Pub/Sub notification is sent before the streaming buffer is guaranteed to be written, so data may not be instantly visible to queries by the time your topic receives the Pub/Sub notification. * The best practice is to use the same table for an entire organization so that you can take advantage of the [provided Looker reports](https://cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles#use_a_premade_report). If you use VPC Service Controls to define security perimeters, then you must use a separate table for each boundary. */
  profileTable?: GooglePrivacyDlpV2BigQueryTable;
  /** Store sample data profile findings in an existing table or a new table in an existing dataset. Each regeneration will result in new rows in BigQuery. Data is inserted using [streaming insert](https://cloud.google.com/blog/products/bigquery/life-of-a-bigquery-streaming-insert) and so data may be in the buffer for a period of time after the profile has finished. */
  sampleFindingsTable?: GooglePrivacyDlpV2BigQueryTable;
}

export const GooglePrivacyDlpV2Export: Schema.Schema<GooglePrivacyDlpV2Export> = Schema.suspend(() => Schema.Struct({
  profileTable: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  sampleFindingsTable: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
})).annotate({ identifier: "GooglePrivacyDlpV2Export" }) as any as Schema.Schema<GooglePrivacyDlpV2Export>;

export interface GooglePrivacyDlpV2PubSubCondition {
  /** The minimum data risk score that triggers the condition. */
  minimumRiskScore?: "PROFILE_SCORE_BUCKET_UNSPECIFIED" | "HIGH" | "MEDIUM_OR_HIGH" | (string & {});
  /** The minimum sensitivity level that triggers the condition. */
  minimumSensitivityScore?: "PROFILE_SCORE_BUCKET_UNSPECIFIED" | "HIGH" | "MEDIUM_OR_HIGH" | (string & {});
}

export const GooglePrivacyDlpV2PubSubCondition: Schema.Schema<GooglePrivacyDlpV2PubSubCondition> = Schema.suspend(() => Schema.Struct({
  minimumRiskScore: Schema.optional(Schema.String),
  minimumSensitivityScore: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2PubSubCondition" }) as any as Schema.Schema<GooglePrivacyDlpV2PubSubCondition>;

export interface GooglePrivacyDlpV2PubSubExpressions {
  /** The operator to apply to the collection of conditions. */
  logicalOperator?: "LOGICAL_OPERATOR_UNSPECIFIED" | "OR" | "AND" | (string & {});
  /** Conditions to apply to the expression. */
  conditions?: Array<GooglePrivacyDlpV2PubSubCondition>;
}

export const GooglePrivacyDlpV2PubSubExpressions: Schema.Schema<GooglePrivacyDlpV2PubSubExpressions> = Schema.suspend(() => Schema.Struct({
  logicalOperator: Schema.optional(Schema.String),
  conditions: Schema.optional(Schema.Array(GooglePrivacyDlpV2PubSubCondition)),
})).annotate({ identifier: "GooglePrivacyDlpV2PubSubExpressions" }) as any as Schema.Schema<GooglePrivacyDlpV2PubSubExpressions>;

export interface GooglePrivacyDlpV2DataProfilePubSubCondition {
  /** An expression. */
  expressions?: GooglePrivacyDlpV2PubSubExpressions;
}

export const GooglePrivacyDlpV2DataProfilePubSubCondition: Schema.Schema<GooglePrivacyDlpV2DataProfilePubSubCondition> = Schema.suspend(() => Schema.Struct({
  expressions: Schema.optional(GooglePrivacyDlpV2PubSubExpressions),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfilePubSubCondition" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfilePubSubCondition>;

export interface GooglePrivacyDlpV2PubSubNotification {
  /** Cloud Pub/Sub topic to send notifications to. Format is projects/{project}/topics/{topic}. */
  topic?: string;
  /** The type of event that triggers a Pub/Sub. At most one `PubSubNotification` per EventType is permitted. */
  event?: "EVENT_TYPE_UNSPECIFIED" | "NEW_PROFILE" | "CHANGED_PROFILE" | "SCORE_INCREASED" | "ERROR_CHANGED" | (string & {});
  /** Conditions (e.g., data risk or sensitivity level) for triggering a Pub/Sub. */
  pubsubCondition?: GooglePrivacyDlpV2DataProfilePubSubCondition;
  /** How much data to include in the Pub/Sub message. If the user wishes to limit the size of the message, they can use resource_name and fetch the profile fields they wish to. Per table profile (not per column). */
  detailOfMessage?: "DETAIL_LEVEL_UNSPECIFIED" | "TABLE_PROFILE" | "RESOURCE_NAME" | "FILE_STORE_PROFILE" | (string & {});
}

export const GooglePrivacyDlpV2PubSubNotification: Schema.Schema<GooglePrivacyDlpV2PubSubNotification> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  event: Schema.optional(Schema.String),
  pubsubCondition: Schema.optional(GooglePrivacyDlpV2DataProfilePubSubCondition),
  detailOfMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2PubSubNotification" }) as any as Schema.Schema<GooglePrivacyDlpV2PubSubNotification>;

export interface GooglePrivacyDlpV2PublishToChronicle {
}

export const GooglePrivacyDlpV2PublishToChronicle: Schema.Schema<GooglePrivacyDlpV2PublishToChronicle> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2PublishToChronicle" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishToChronicle>;

export interface GooglePrivacyDlpV2PublishToSecurityCommandCenter {
}

export const GooglePrivacyDlpV2PublishToSecurityCommandCenter: Schema.Schema<GooglePrivacyDlpV2PublishToSecurityCommandCenter> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2PublishToSecurityCommandCenter" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishToSecurityCommandCenter>;

export interface GooglePrivacyDlpV2TagValue {
  /** The namespaced name for the tag value to attach to resources. Must be in the format `{parent_id}/{tag_key_short_name}/{short_name}`, for example, "123456/environment/prod" for an organization parent, or "my-project/environment/prod" for a project parent. */
  namespacedValue?: string;
}

export const GooglePrivacyDlpV2TagValue: Schema.Schema<GooglePrivacyDlpV2TagValue> = Schema.suspend(() => Schema.Struct({
  namespacedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TagValue" }) as any as Schema.Schema<GooglePrivacyDlpV2TagValue>;

export interface GooglePrivacyDlpV2TagCondition {
  /** The tag value to attach to resources. */
  tag?: GooglePrivacyDlpV2TagValue;
  /** Conditions attaching the tag to a resource on its profile having this sensitivity score. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
}

export const GooglePrivacyDlpV2TagCondition: Schema.Schema<GooglePrivacyDlpV2TagCondition> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(GooglePrivacyDlpV2TagValue),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
})).annotate({ identifier: "GooglePrivacyDlpV2TagCondition" }) as any as Schema.Schema<GooglePrivacyDlpV2TagCondition>;

export interface GooglePrivacyDlpV2TagResources {
  /** The tags to associate with different conditions. */
  tagConditions?: Array<GooglePrivacyDlpV2TagCondition>;
  /** The profile generations for which the tag should be attached to resources. If you attach a tag to only new profiles, then if the sensitivity score of a profile subsequently changes, its tag doesn't change. By default, this field includes only new profiles. To include both new and updated profiles for tagging, this field should explicitly include both `PROFILE_GENERATION_NEW` and `PROFILE_GENERATION_UPDATE`. */
  profileGenerationsToTag?: Array<"PROFILE_GENERATION_UNSPECIFIED" | "PROFILE_GENERATION_NEW" | "PROFILE_GENERATION_UPDATE" | (string & {})>;
  /** Whether applying a tag to a resource should lower the risk of the profile for that resource. For example, in conjunction with an [IAM deny policy](https://cloud.google.com/iam/docs/deny-overview), you can deny all principals a permission if a tag value is present, mitigating the risk of the resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles. */
  lowerDataRiskToLow?: boolean;
}

export const GooglePrivacyDlpV2TagResources: Schema.Schema<GooglePrivacyDlpV2TagResources> = Schema.suspend(() => Schema.Struct({
  tagConditions: Schema.optional(Schema.Array(GooglePrivacyDlpV2TagCondition)),
  profileGenerationsToTag: Schema.optional(Schema.Array(Schema.String)),
  lowerDataRiskToLow: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2TagResources" }) as any as Schema.Schema<GooglePrivacyDlpV2TagResources>;

export interface GooglePrivacyDlpV2PublishToDataplexCatalog {
  /** Whether creating a Dataplex Universal Catalog aspect for a profiled resource should lower the risk of the profile for that resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles. */
  lowerDataRiskToLow?: boolean;
}

export const GooglePrivacyDlpV2PublishToDataplexCatalog: Schema.Schema<GooglePrivacyDlpV2PublishToDataplexCatalog> = Schema.suspend(() => Schema.Struct({
  lowerDataRiskToLow: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2PublishToDataplexCatalog" }) as any as Schema.Schema<GooglePrivacyDlpV2PublishToDataplexCatalog>;

export interface GooglePrivacyDlpV2DataProfileAction {
  /** Export data profiles into a provided location. */
  exportData?: GooglePrivacyDlpV2Export;
  /** Publish a message into the Pub/Sub topic. */
  pubSubNotification?: GooglePrivacyDlpV2PubSubNotification;
  /** Publishes generated data profiles to Google Security Operations. For more information, see [Use Sensitive Data Protection data in context-aware analytics](https://cloud.google.com/chronicle/docs/detection/usecase-dlp-high-risk-user-download). */
  publishToChronicle?: GooglePrivacyDlpV2PublishToChronicle;
  /** Publishes findings to Security Command Center for each data profile. */
  publishToScc?: GooglePrivacyDlpV2PublishToSecurityCommandCenter;
  /** Tags the profiled resources with the specified tag values. */
  tagResources?: GooglePrivacyDlpV2TagResources;
  /** Publishes a portion of each profile to Dataplex Universal Catalog with the aspect type Sensitive Data Protection Profile. */
  publishToDataplexCatalog?: GooglePrivacyDlpV2PublishToDataplexCatalog;
}

export const GooglePrivacyDlpV2DataProfileAction: Schema.Schema<GooglePrivacyDlpV2DataProfileAction> = Schema.suspend(() => Schema.Struct({
  exportData: Schema.optional(GooglePrivacyDlpV2Export),
  pubSubNotification: Schema.optional(GooglePrivacyDlpV2PubSubNotification),
  publishToChronicle: Schema.optional(GooglePrivacyDlpV2PublishToChronicle),
  publishToScc: Schema.optional(GooglePrivacyDlpV2PublishToSecurityCommandCenter),
  tagResources: Schema.optional(GooglePrivacyDlpV2TagResources),
  publishToDataplexCatalog: Schema.optional(GooglePrivacyDlpV2PublishToDataplexCatalog),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileAction" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileAction>;

export interface GooglePrivacyDlpV2BigQueryRegex {
  /** For organizations, if unset, will match all projects. Has no effect for data profile configurations created within a project. */
  projectIdRegex?: string;
  /** If unset, this property matches all datasets. */
  datasetIdRegex?: string;
  /** If unset, this property matches all tables. */
  tableIdRegex?: string;
}

export const GooglePrivacyDlpV2BigQueryRegex: Schema.Schema<GooglePrivacyDlpV2BigQueryRegex> = Schema.suspend(() => Schema.Struct({
  projectIdRegex: Schema.optional(Schema.String),
  datasetIdRegex: Schema.optional(Schema.String),
  tableIdRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryRegex>;

export interface GooglePrivacyDlpV2BigQueryRegexes {
  /** A single BigQuery regular expression pattern to match against one or more tables, datasets, or projects that contain BigQuery tables. */
  patterns?: Array<GooglePrivacyDlpV2BigQueryRegex>;
}

export const GooglePrivacyDlpV2BigQueryRegexes: Schema.Schema<GooglePrivacyDlpV2BigQueryRegexes> = Schema.suspend(() => Schema.Struct({
  patterns: Schema.optional(Schema.Array(GooglePrivacyDlpV2BigQueryRegex)),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryRegexes" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryRegexes>;

export interface GooglePrivacyDlpV2BigQueryTableCollection {
  /** A collection of regular expressions to match a BigQuery table against. */
  includeRegexes?: GooglePrivacyDlpV2BigQueryRegexes;
}

export const GooglePrivacyDlpV2BigQueryTableCollection: Schema.Schema<GooglePrivacyDlpV2BigQueryTableCollection> = Schema.suspend(() => Schema.Struct({
  includeRegexes: Schema.optional(GooglePrivacyDlpV2BigQueryRegexes),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryTableCollection" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryTableCollection>;

export interface GooglePrivacyDlpV2AllOtherBigQueryTables {
}

export const GooglePrivacyDlpV2AllOtherBigQueryTables: Schema.Schema<GooglePrivacyDlpV2AllOtherBigQueryTables> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2AllOtherBigQueryTables" }) as any as Schema.Schema<GooglePrivacyDlpV2AllOtherBigQueryTables>;

export interface GooglePrivacyDlpV2TableReference {
  /** Dataset ID of the table. */
  datasetId?: string;
  /** Name of the table. */
  tableId?: string;
  /** The Google Cloud project ID of the project containing the table. If omitted, the project ID is inferred from the parent project. This field is required if the parent resource is an organization. */
  projectId?: string;
}

export const GooglePrivacyDlpV2TableReference: Schema.Schema<GooglePrivacyDlpV2TableReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TableReference" }) as any as Schema.Schema<GooglePrivacyDlpV2TableReference>;

export interface GooglePrivacyDlpV2DiscoveryBigQueryFilter {
  /** A specific set of tables for this filter to apply to. A table collection must be specified in only one filter per config. If a table id or dataset is empty, Cloud DLP assumes all tables in that collection must be profiled. Must specify a project ID. */
  tables?: GooglePrivacyDlpV2BigQueryTableCollection;
  /** Catch-all. This should always be the last filter in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically. */
  otherTables?: GooglePrivacyDlpV2AllOtherBigQueryTables;
  /** The table to scan. Discovery configurations including this can only include one DiscoveryTarget (the DiscoveryTarget with this TableReference). */
  tableReference?: GooglePrivacyDlpV2TableReference;
}

export const GooglePrivacyDlpV2DiscoveryBigQueryFilter: Schema.Schema<GooglePrivacyDlpV2DiscoveryBigQueryFilter> = Schema.suspend(() => Schema.Struct({
  tables: Schema.optional(GooglePrivacyDlpV2BigQueryTableCollection),
  otherTables: Schema.optional(GooglePrivacyDlpV2AllOtherBigQueryTables),
  tableReference: Schema.optional(GooglePrivacyDlpV2TableReference),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryBigQueryFilter" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryBigQueryFilter>;

export interface GooglePrivacyDlpV2BigQueryTableTypes {
  /** A set of BigQuery table types. */
  types?: Array<"BIG_QUERY_TABLE_TYPE_UNSPECIFIED" | "BIG_QUERY_TABLE_TYPE_TABLE" | "BIG_QUERY_TABLE_TYPE_EXTERNAL_BIG_LAKE" | "BIG_QUERY_TABLE_TYPE_SNAPSHOT" | (string & {})>;
}

export const GooglePrivacyDlpV2BigQueryTableTypes: Schema.Schema<GooglePrivacyDlpV2BigQueryTableTypes> = Schema.suspend(() => Schema.Struct({
  types: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryTableTypes" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryTableTypes>;

export interface GooglePrivacyDlpV2OrConditions {
  /** Minimum number of rows that should be present before Cloud DLP profiles a table */
  minRowCount?: number;
  /** Minimum age a table must have before Cloud DLP can profile it. Value must be 1 hour or greater. */
  minAge?: string;
}

export const GooglePrivacyDlpV2OrConditions: Schema.Schema<GooglePrivacyDlpV2OrConditions> = Schema.suspend(() => Schema.Struct({
  minRowCount: Schema.optional(Schema.Number),
  minAge: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2OrConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2OrConditions>;

export interface GooglePrivacyDlpV2DiscoveryBigQueryConditions {
  /** BigQuery table must have been created after this date. Used to avoid backfilling. */
  createdAfter?: string;
  /** Restrict discovery to specific table types. */
  types?: GooglePrivacyDlpV2BigQueryTableTypes;
  /** Restrict discovery to categories of table types. */
  typeCollection?: "BIG_QUERY_COLLECTION_UNSPECIFIED" | "BIG_QUERY_COLLECTION_ALL_TYPES" | "BIG_QUERY_COLLECTION_ONLY_SUPPORTED_TYPES" | (string & {});
  /** At least one of the conditions must be true for a table to be scanned. */
  orConditions?: GooglePrivacyDlpV2OrConditions;
}

export const GooglePrivacyDlpV2DiscoveryBigQueryConditions: Schema.Schema<GooglePrivacyDlpV2DiscoveryBigQueryConditions> = Schema.suspend(() => Schema.Struct({
  createdAfter: Schema.optional(Schema.String),
  types: Schema.optional(GooglePrivacyDlpV2BigQueryTableTypes),
  typeCollection: Schema.optional(Schema.String),
  orConditions: Schema.optional(GooglePrivacyDlpV2OrConditions),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryBigQueryConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryBigQueryConditions>;

export interface GooglePrivacyDlpV2DiscoverySchemaModifiedCadence {
  /** The type of events to consider when deciding if the table's schema has been modified and should have the profile updated. Defaults to NEW_COLUMNS. */
  types?: Array<"SCHEMA_MODIFICATION_UNSPECIFIED" | "SCHEMA_NEW_COLUMNS" | "SCHEMA_REMOVED_COLUMNS" | (string & {})>;
  /** How frequently profiles may be updated when schemas are modified. Defaults to monthly. */
  frequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
}

export const GooglePrivacyDlpV2DiscoverySchemaModifiedCadence: Schema.Schema<GooglePrivacyDlpV2DiscoverySchemaModifiedCadence> = Schema.suspend(() => Schema.Struct({
  types: Schema.optional(Schema.Array(Schema.String)),
  frequency: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoverySchemaModifiedCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoverySchemaModifiedCadence>;

export interface GooglePrivacyDlpV2DiscoveryTableModifiedCadence {
  /** The type of events to consider when deciding if the table has been modified and should have the profile updated. Defaults to MODIFIED_TIMESTAMP. */
  types?: Array<"TABLE_MODIFICATION_UNSPECIFIED" | "TABLE_MODIFIED_TIMESTAMP" | (string & {})>;
  /** How frequently data profiles can be updated when tables are modified. Defaults to never. */
  frequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
}

export const GooglePrivacyDlpV2DiscoveryTableModifiedCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryTableModifiedCadence> = Schema.suspend(() => Schema.Struct({
  types: Schema.optional(Schema.Array(Schema.String)),
  frequency: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryTableModifiedCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryTableModifiedCadence>;

export interface GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence {
  /** How frequently data profiles can be updated when the template is modified. Defaults to never. */
  frequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
}

export const GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence> = Schema.suspend(() => Schema.Struct({
  frequency: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence>;

export interface GooglePrivacyDlpV2DiscoveryGenerationCadence {
  /** Governs when to update data profiles when a schema is modified. */
  schemaModifiedCadence?: GooglePrivacyDlpV2DiscoverySchemaModifiedCadence;
  /** Governs when to update data profiles when a table is modified. */
  tableModifiedCadence?: GooglePrivacyDlpV2DiscoveryTableModifiedCadence;
  /** Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update. */
  inspectTemplateModifiedCadence?: GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence;
  /** Frequency at which profiles should be updated, regardless of whether the underlying resource has changed. Defaults to never. */
  refreshFrequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
}

export const GooglePrivacyDlpV2DiscoveryGenerationCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryGenerationCadence> = Schema.suspend(() => Schema.Struct({
  schemaModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoverySchemaModifiedCadence),
  tableModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryTableModifiedCadence),
  inspectTemplateModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence),
  refreshFrequency: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryGenerationCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryGenerationCadence>;

export interface GooglePrivacyDlpV2Disabled {
}

export const GooglePrivacyDlpV2Disabled: Schema.Schema<GooglePrivacyDlpV2Disabled> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2Disabled" }) as any as Schema.Schema<GooglePrivacyDlpV2Disabled>;

export interface GooglePrivacyDlpV2BigQueryDiscoveryTarget {
  /** Required. The tables the discovery cadence applies to. The first target with a matching filter will be the one to apply to a table. */
  filter?: GooglePrivacyDlpV2DiscoveryBigQueryFilter;
  /** In addition to matching the filter, these conditions must be true before a profile is generated. */
  conditions?: GooglePrivacyDlpV2DiscoveryBigQueryConditions;
  /** How often and when to update profiles. New tables that match both the filter and conditions are scanned as quickly as possible depending on system capacity. */
  cadence?: GooglePrivacyDlpV2DiscoveryGenerationCadence;
  /** Tables that match this filter will not have profiles created. */
  disabled?: GooglePrivacyDlpV2Disabled;
}

export const GooglePrivacyDlpV2BigQueryDiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2BigQueryDiscoveryTarget> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(GooglePrivacyDlpV2DiscoveryBigQueryFilter),
  conditions: Schema.optional(GooglePrivacyDlpV2DiscoveryBigQueryConditions),
  cadence: Schema.optional(GooglePrivacyDlpV2DiscoveryGenerationCadence),
  disabled: Schema.optional(GooglePrivacyDlpV2Disabled),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryDiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryDiscoveryTarget>;

export interface GooglePrivacyDlpV2DatabaseResourceRegex {
  /** For organizations, if unset, will match all projects. Has no effect for configurations created within a project. */
  projectIdRegex?: string;
  /** Regex to test the instance name against. If empty, all instances match. */
  instanceRegex?: string;
  /** Regex to test the database name against. If empty, all databases match. */
  databaseRegex?: string;
  /** Regex to test the database resource's name against. An example of a database resource name is a table's name. Other database resource names like view names could be included in the future. If empty, all database resources match. */
  databaseResourceNameRegex?: string;
}

export const GooglePrivacyDlpV2DatabaseResourceRegex: Schema.Schema<GooglePrivacyDlpV2DatabaseResourceRegex> = Schema.suspend(() => Schema.Struct({
  projectIdRegex: Schema.optional(Schema.String),
  instanceRegex: Schema.optional(Schema.String),
  databaseRegex: Schema.optional(Schema.String),
  databaseResourceNameRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DatabaseResourceRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2DatabaseResourceRegex>;

export interface GooglePrivacyDlpV2DatabaseResourceRegexes {
  /** A group of regular expression patterns to match against one or more database resources. Maximum of 100 entries. The sum of all regular expression's length can't exceed 10 KiB. */
  patterns?: Array<GooglePrivacyDlpV2DatabaseResourceRegex>;
}

export const GooglePrivacyDlpV2DatabaseResourceRegexes: Schema.Schema<GooglePrivacyDlpV2DatabaseResourceRegexes> = Schema.suspend(() => Schema.Struct({
  patterns: Schema.optional(Schema.Array(GooglePrivacyDlpV2DatabaseResourceRegex)),
})).annotate({ identifier: "GooglePrivacyDlpV2DatabaseResourceRegexes" }) as any as Schema.Schema<GooglePrivacyDlpV2DatabaseResourceRegexes>;

export interface GooglePrivacyDlpV2DatabaseResourceCollection {
  /** A collection of regular expressions to match a database resource against. */
  includeRegexes?: GooglePrivacyDlpV2DatabaseResourceRegexes;
}

export const GooglePrivacyDlpV2DatabaseResourceCollection: Schema.Schema<GooglePrivacyDlpV2DatabaseResourceCollection> = Schema.suspend(() => Schema.Struct({
  includeRegexes: Schema.optional(GooglePrivacyDlpV2DatabaseResourceRegexes),
})).annotate({ identifier: "GooglePrivacyDlpV2DatabaseResourceCollection" }) as any as Schema.Schema<GooglePrivacyDlpV2DatabaseResourceCollection>;

export interface GooglePrivacyDlpV2AllOtherDatabaseResources {
}

export const GooglePrivacyDlpV2AllOtherDatabaseResources: Schema.Schema<GooglePrivacyDlpV2AllOtherDatabaseResources> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2AllOtherDatabaseResources" }) as any as Schema.Schema<GooglePrivacyDlpV2AllOtherDatabaseResources>;

export interface GooglePrivacyDlpV2DatabaseResourceReference {
  /** Required. If within a project-level config, then this must match the config's project ID. */
  projectId?: string;
  /** Required. The instance where this resource is located. For example: Cloud SQL instance ID. */
  instance?: string;
  /** Required. Name of a database within the instance. */
  database?: string;
  /** Required. Name of a database resource, for example, a table within the database. */
  databaseResource?: string;
}

export const GooglePrivacyDlpV2DatabaseResourceReference: Schema.Schema<GooglePrivacyDlpV2DatabaseResourceReference> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
  databaseResource: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DatabaseResourceReference" }) as any as Schema.Schema<GooglePrivacyDlpV2DatabaseResourceReference>;

export interface GooglePrivacyDlpV2DiscoveryCloudSqlFilter {
  /** A specific set of database resources for this filter to apply to. */
  collection?: GooglePrivacyDlpV2DatabaseResourceCollection;
  /** Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically. */
  others?: GooglePrivacyDlpV2AllOtherDatabaseResources;
  /** The database resource to scan. Targets including this can only include one target (the target with this database resource reference). */
  databaseResourceReference?: GooglePrivacyDlpV2DatabaseResourceReference;
}

export const GooglePrivacyDlpV2DiscoveryCloudSqlFilter: Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudSqlFilter> = Schema.suspend(() => Schema.Struct({
  collection: Schema.optional(GooglePrivacyDlpV2DatabaseResourceCollection),
  others: Schema.optional(GooglePrivacyDlpV2AllOtherDatabaseResources),
  databaseResourceReference: Schema.optional(GooglePrivacyDlpV2DatabaseResourceReference),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryCloudSqlFilter" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudSqlFilter>;

export interface GooglePrivacyDlpV2DiscoveryCloudSqlConditions {
  /** Optional. Database engines that should be profiled. Optional. Defaults to ALL_SUPPORTED_DATABASE_ENGINES if unspecified. */
  databaseEngines?: Array<"DATABASE_ENGINE_UNSPECIFIED" | "ALL_SUPPORTED_DATABASE_ENGINES" | "MYSQL" | "POSTGRES" | (string & {})>;
  /** Data profiles will only be generated for the database resource types specified in this field. If not specified, defaults to [DATABASE_RESOURCE_TYPE_ALL_SUPPORTED_TYPES]. */
  types?: Array<"DATABASE_RESOURCE_TYPE_UNSPECIFIED" | "DATABASE_RESOURCE_TYPE_ALL_SUPPORTED_TYPES" | "DATABASE_RESOURCE_TYPE_TABLE" | (string & {})>;
}

export const GooglePrivacyDlpV2DiscoveryCloudSqlConditions: Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudSqlConditions> = Schema.suspend(() => Schema.Struct({
  databaseEngines: Schema.optional(Schema.Array(Schema.String)),
  types: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryCloudSqlConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudSqlConditions>;

export interface GooglePrivacyDlpV2SchemaModifiedCadence {
  /** The types of schema modifications to consider. Defaults to NEW_COLUMNS. */
  types?: Array<"SQL_SCHEMA_MODIFICATION_UNSPECIFIED" | "NEW_COLUMNS" | "REMOVED_COLUMNS" | (string & {})>;
  /** Frequency to regenerate data profiles when the schema is modified. Defaults to monthly. */
  frequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
}

export const GooglePrivacyDlpV2SchemaModifiedCadence: Schema.Schema<GooglePrivacyDlpV2SchemaModifiedCadence> = Schema.suspend(() => Schema.Struct({
  types: Schema.optional(Schema.Array(Schema.String)),
  frequency: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2SchemaModifiedCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2SchemaModifiedCadence>;

export interface GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence {
  /** When to reprofile if the schema has changed. */
  schemaModifiedCadence?: GooglePrivacyDlpV2SchemaModifiedCadence;
  /** Data changes (non-schema changes) in Cloud SQL tables can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying tables have changed. Defaults to never. */
  refreshFrequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
  /** Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update. */
  inspectTemplateModifiedCadence?: GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence;
}

export const GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence> = Schema.suspend(() => Schema.Struct({
  schemaModifiedCadence: Schema.optional(GooglePrivacyDlpV2SchemaModifiedCadence),
  refreshFrequency: Schema.optional(Schema.String),
  inspectTemplateModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence>;

export interface GooglePrivacyDlpV2CloudSqlDiscoveryTarget {
  /** Required. The tables the discovery cadence applies to. The first target with a matching filter will be the one to apply to a table. */
  filter?: GooglePrivacyDlpV2DiscoveryCloudSqlFilter;
  /** In addition to matching the filter, these conditions must be true before a profile is generated. */
  conditions?: GooglePrivacyDlpV2DiscoveryCloudSqlConditions;
  /** How often and when to update profiles. New tables that match both the filter and conditions are scanned as quickly as possible depending on system capacity. */
  generationCadence?: GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence;
  /** Disable profiling for database resources that match this filter. */
  disabled?: GooglePrivacyDlpV2Disabled;
}

export const GooglePrivacyDlpV2CloudSqlDiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2CloudSqlDiscoveryTarget> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(GooglePrivacyDlpV2DiscoveryCloudSqlFilter),
  conditions: Schema.optional(GooglePrivacyDlpV2DiscoveryCloudSqlConditions),
  generationCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryCloudSqlGenerationCadence),
  disabled: Schema.optional(GooglePrivacyDlpV2Disabled),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudSqlDiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudSqlDiscoveryTarget>;

export interface GooglePrivacyDlpV2SecretsDiscoveryTarget {
}

export const GooglePrivacyDlpV2SecretsDiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2SecretsDiscoveryTarget> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2SecretsDiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2SecretsDiscoveryTarget>;

export interface GooglePrivacyDlpV2CloudStorageRegex {
  /** Optional. For organizations, if unset, will match all projects. */
  projectIdRegex?: string;
  /** Optional. Regex to test the bucket name against. If empty, all buckets match. Example: "marketing2021" or "(marketing)\d{4}" will both match the bucket gs://marketing2021 */
  bucketNameRegex?: string;
}

export const GooglePrivacyDlpV2CloudStorageRegex: Schema.Schema<GooglePrivacyDlpV2CloudStorageRegex> = Schema.suspend(() => Schema.Struct({
  projectIdRegex: Schema.optional(Schema.String),
  bucketNameRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStorageRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStorageRegex>;

export interface GooglePrivacyDlpV2FileStoreRegex {
  /** Optional. Regex for Cloud Storage. */
  cloudStorageRegex?: GooglePrivacyDlpV2CloudStorageRegex;
}

export const GooglePrivacyDlpV2FileStoreRegex: Schema.Schema<GooglePrivacyDlpV2FileStoreRegex> = Schema.suspend(() => Schema.Struct({
  cloudStorageRegex: Schema.optional(GooglePrivacyDlpV2CloudStorageRegex),
})).annotate({ identifier: "GooglePrivacyDlpV2FileStoreRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2FileStoreRegex>;

export interface GooglePrivacyDlpV2FileStoreRegexes {
  /** Required. The group of regular expression patterns to match against one or more file stores. Maximum of 100 entries. The sum of all regular expression's length can't exceed 10 KiB. */
  patterns?: Array<GooglePrivacyDlpV2FileStoreRegex>;
}

export const GooglePrivacyDlpV2FileStoreRegexes: Schema.Schema<GooglePrivacyDlpV2FileStoreRegexes> = Schema.suspend(() => Schema.Struct({
  patterns: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileStoreRegex)),
})).annotate({ identifier: "GooglePrivacyDlpV2FileStoreRegexes" }) as any as Schema.Schema<GooglePrivacyDlpV2FileStoreRegexes>;

export interface GooglePrivacyDlpV2TagFilter {
  /** The namespaced name for the tag value. Must be in the format `{parent_id}/{tag_key_short_name}/{short_name}`, for example, "123456/environment/prod" for an organization parent, or "my-project/environment/prod" for a project parent. */
  namespacedTagValue?: string;
  /** The namespaced name for the tag key. Must be in the format `{parent_id}/{tag_key_short_name}`, for example, "123456/sensitive" for an organization parent, or "my-project/sensitive" for a project parent. */
  namespacedTagKey?: string;
}

export const GooglePrivacyDlpV2TagFilter: Schema.Schema<GooglePrivacyDlpV2TagFilter> = Schema.suspend(() => Schema.Struct({
  namespacedTagValue: Schema.optional(Schema.String),
  namespacedTagKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TagFilter" }) as any as Schema.Schema<GooglePrivacyDlpV2TagFilter>;

export interface GooglePrivacyDlpV2TagFilters {
  /** Required. A resource must match ALL of the specified tag filters to be included in the collection. */
  tagFilters?: Array<GooglePrivacyDlpV2TagFilter>;
}

export const GooglePrivacyDlpV2TagFilters: Schema.Schema<GooglePrivacyDlpV2TagFilters> = Schema.suspend(() => Schema.Struct({
  tagFilters: Schema.optional(Schema.Array(GooglePrivacyDlpV2TagFilter)),
})).annotate({ identifier: "GooglePrivacyDlpV2TagFilters" }) as any as Schema.Schema<GooglePrivacyDlpV2TagFilters>;

export interface GooglePrivacyDlpV2FileStoreCollection {
  /** Optional. A collection of regular expressions to match a file store against. */
  includeRegexes?: GooglePrivacyDlpV2FileStoreRegexes;
  /** Optional. To be included in the collection, a resource must meet all of the following requirements: - If tag filters are provided, match all provided tag filters. - If one or more patterns are specified, match at least one pattern. For a resource to match the tag filters, the resource must have all of the provided tags attached. Tags refer to Resource Manager tags bound to the resource or its ancestors. For more information, see [Manage schedules](https://cloud.google.com/sensitive-data-protection/docs/profile-project-cloud-storage#manage-schedules). */
  includeTags?: GooglePrivacyDlpV2TagFilters;
}

export const GooglePrivacyDlpV2FileStoreCollection: Schema.Schema<GooglePrivacyDlpV2FileStoreCollection> = Schema.suspend(() => Schema.Struct({
  includeRegexes: Schema.optional(GooglePrivacyDlpV2FileStoreRegexes),
  includeTags: Schema.optional(GooglePrivacyDlpV2TagFilters),
})).annotate({ identifier: "GooglePrivacyDlpV2FileStoreCollection" }) as any as Schema.Schema<GooglePrivacyDlpV2FileStoreCollection>;

export interface GooglePrivacyDlpV2CloudStorageResourceReference {
  /** Required. The bucket to scan. */
  bucketName?: string;
  /** Required. If within a project-level config, then this must match the config's project id. */
  projectId?: string;
}

export const GooglePrivacyDlpV2CloudStorageResourceReference: Schema.Schema<GooglePrivacyDlpV2CloudStorageResourceReference> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStorageResourceReference" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStorageResourceReference>;

export interface GooglePrivacyDlpV2AllOtherResources {
}

export const GooglePrivacyDlpV2AllOtherResources: Schema.Schema<GooglePrivacyDlpV2AllOtherResources> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2AllOtherResources" }) as any as Schema.Schema<GooglePrivacyDlpV2AllOtherResources>;

export interface GooglePrivacyDlpV2DiscoveryCloudStorageFilter {
  /** Optional. A specific set of buckets for this filter to apply to. */
  collection?: GooglePrivacyDlpV2FileStoreCollection;
  /** Optional. The bucket to scan. Targets including this can only include one target (the target with this bucket). This enables profiling the contents of a single bucket, while the other options allow for easy profiling of many bucets within a project or an organization. */
  cloudStorageResourceReference?: GooglePrivacyDlpV2CloudStorageResourceReference;
  /** Optional. Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically. */
  others?: GooglePrivacyDlpV2AllOtherResources;
}

export const GooglePrivacyDlpV2DiscoveryCloudStorageFilter: Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudStorageFilter> = Schema.suspend(() => Schema.Struct({
  collection: Schema.optional(GooglePrivacyDlpV2FileStoreCollection),
  cloudStorageResourceReference: Schema.optional(GooglePrivacyDlpV2CloudStorageResourceReference),
  others: Schema.optional(GooglePrivacyDlpV2AllOtherResources),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryCloudStorageFilter" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudStorageFilter>;

export interface GooglePrivacyDlpV2DiscoveryCloudStorageConditions {
  /** Required. Only objects with the specified attributes will be scanned. If an object has one of the specified attributes but is inside an excluded bucket, it will not be scanned. Defaults to [ALL_SUPPORTED_OBJECTS]. A profile will be created even if no objects match the included_object_attributes. */
  includedObjectAttributes?: Array<"CLOUD_STORAGE_OBJECT_ATTRIBUTE_UNSPECIFIED" | "ALL_SUPPORTED_OBJECTS" | "STANDARD" | "NEARLINE" | "COLDLINE" | "ARCHIVE" | "REGIONAL" | "MULTI_REGIONAL" | "DURABLE_REDUCED_AVAILABILITY" | (string & {})>;
  /** Required. Only objects with the specified attributes will be scanned. Defaults to [ALL_SUPPORTED_BUCKETS] if unset. */
  includedBucketAttributes?: Array<"CLOUD_STORAGE_BUCKET_ATTRIBUTE_UNSPECIFIED" | "ALL_SUPPORTED_BUCKETS" | "AUTOCLASS_DISABLED" | "AUTOCLASS_ENABLED" | (string & {})>;
}

export const GooglePrivacyDlpV2DiscoveryCloudStorageConditions: Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudStorageConditions> = Schema.suspend(() => Schema.Struct({
  includedObjectAttributes: Schema.optional(Schema.Array(Schema.String)),
  includedBucketAttributes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryCloudStorageConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudStorageConditions>;

export interface GooglePrivacyDlpV2DiscoveryFileStoreConditions {
  /** Optional. File store must have been created after this date. Used to avoid backfilling. */
  createdAfter?: string;
  /** Optional. Minimum age a file store must have. If set, the value must be 1 hour or greater. */
  minAge?: string;
  /** Optional. Cloud Storage conditions. */
  cloudStorageConditions?: GooglePrivacyDlpV2DiscoveryCloudStorageConditions;
}

export const GooglePrivacyDlpV2DiscoveryFileStoreConditions: Schema.Schema<GooglePrivacyDlpV2DiscoveryFileStoreConditions> = Schema.suspend(() => Schema.Struct({
  createdAfter: Schema.optional(Schema.String),
  minAge: Schema.optional(Schema.String),
  cloudStorageConditions: Schema.optional(GooglePrivacyDlpV2DiscoveryCloudStorageConditions),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryFileStoreConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryFileStoreConditions>;

export interface GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence {
  /** Optional. Data changes in Cloud Storage can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying buckets have changed. Defaults to never. */
  refreshFrequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
  /** Optional. Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update. */
  inspectTemplateModifiedCadence?: GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence;
}

export const GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence> = Schema.suspend(() => Schema.Struct({
  refreshFrequency: Schema.optional(Schema.String),
  inspectTemplateModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence>;

export interface GooglePrivacyDlpV2CloudStorageDiscoveryTarget {
  /** Required. The buckets the generation_cadence applies to. The first target with a matching filter will be the one to apply to a bucket. */
  filter?: GooglePrivacyDlpV2DiscoveryCloudStorageFilter;
  /** Optional. In addition to matching the filter, these conditions must be true before a profile is generated. */
  conditions?: GooglePrivacyDlpV2DiscoveryFileStoreConditions;
  /** Optional. How often and when to update profiles. New buckets that match both the filter and conditions are scanned as quickly as possible depending on system capacity. */
  generationCadence?: GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence;
  /** Optional. Disable profiling for buckets that match this filter. */
  disabled?: GooglePrivacyDlpV2Disabled;
}

export const GooglePrivacyDlpV2CloudStorageDiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2CloudStorageDiscoveryTarget> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(GooglePrivacyDlpV2DiscoveryCloudStorageFilter),
  conditions: Schema.optional(GooglePrivacyDlpV2DiscoveryFileStoreConditions),
  generationCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryCloudStorageGenerationCadence),
  disabled: Schema.optional(GooglePrivacyDlpV2Disabled),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStorageDiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStorageDiscoveryTarget>;

export interface GooglePrivacyDlpV2DataSourceType {
  /** A string that identifies the type of resource being profiled. Current values: * google/bigquery/table * google/project * google/sql/table * google/gcs/bucket */
  dataSource?: string;
}

export const GooglePrivacyDlpV2DataSourceType: Schema.Schema<GooglePrivacyDlpV2DataSourceType> = Schema.suspend(() => Schema.Struct({
  dataSource: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DataSourceType" }) as any as Schema.Schema<GooglePrivacyDlpV2DataSourceType>;

export interface GooglePrivacyDlpV2AwsAccountRegex {
  /** Optional. Regex to test the AWS account ID against. If empty, all accounts match. */
  accountIdRegex?: string;
}

export const GooglePrivacyDlpV2AwsAccountRegex: Schema.Schema<GooglePrivacyDlpV2AwsAccountRegex> = Schema.suspend(() => Schema.Struct({
  accountIdRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2AwsAccountRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2AwsAccountRegex>;

export interface GooglePrivacyDlpV2AmazonS3BucketRegex {
  /** The AWS account regex. */
  awsAccountRegex?: GooglePrivacyDlpV2AwsAccountRegex;
  /** Optional. Regex to test the bucket name against. If empty, all buckets match. */
  bucketNameRegex?: string;
}

export const GooglePrivacyDlpV2AmazonS3BucketRegex: Schema.Schema<GooglePrivacyDlpV2AmazonS3BucketRegex> = Schema.suspend(() => Schema.Struct({
  awsAccountRegex: Schema.optional(GooglePrivacyDlpV2AwsAccountRegex),
  bucketNameRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2AmazonS3BucketRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2AmazonS3BucketRegex>;

export interface GooglePrivacyDlpV2OtherCloudResourceRegex {
  /** Regex for Amazon S3 buckets. */
  amazonS3BucketRegex?: GooglePrivacyDlpV2AmazonS3BucketRegex;
}

export const GooglePrivacyDlpV2OtherCloudResourceRegex: Schema.Schema<GooglePrivacyDlpV2OtherCloudResourceRegex> = Schema.suspend(() => Schema.Struct({
  amazonS3BucketRegex: Schema.optional(GooglePrivacyDlpV2AmazonS3BucketRegex),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherCloudResourceRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherCloudResourceRegex>;

export interface GooglePrivacyDlpV2OtherCloudResourceRegexes {
  /** A group of regular expression patterns to match against one or more resources. Maximum of 100 entries. The sum of all regular expression's length can't exceed 10 KiB. */
  patterns?: Array<GooglePrivacyDlpV2OtherCloudResourceRegex>;
}

export const GooglePrivacyDlpV2OtherCloudResourceRegexes: Schema.Schema<GooglePrivacyDlpV2OtherCloudResourceRegexes> = Schema.suspend(() => Schema.Struct({
  patterns: Schema.optional(Schema.Array(GooglePrivacyDlpV2OtherCloudResourceRegex)),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherCloudResourceRegexes" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherCloudResourceRegexes>;

export interface GooglePrivacyDlpV2OtherCloudResourceCollection {
  /** A collection of regular expressions to match a resource against. */
  includeRegexes?: GooglePrivacyDlpV2OtherCloudResourceRegexes;
}

export const GooglePrivacyDlpV2OtherCloudResourceCollection: Schema.Schema<GooglePrivacyDlpV2OtherCloudResourceCollection> = Schema.suspend(() => Schema.Struct({
  includeRegexes: Schema.optional(GooglePrivacyDlpV2OtherCloudResourceRegexes),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherCloudResourceCollection" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherCloudResourceCollection>;

export interface GooglePrivacyDlpV2AwsAccount {
  /** Required. AWS account ID. */
  accountId?: string;
}

export const GooglePrivacyDlpV2AwsAccount: Schema.Schema<GooglePrivacyDlpV2AwsAccount> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2AwsAccount" }) as any as Schema.Schema<GooglePrivacyDlpV2AwsAccount>;

export interface GooglePrivacyDlpV2AmazonS3Bucket {
  /** The AWS account. */
  awsAccount?: GooglePrivacyDlpV2AwsAccount;
  /** Required. The bucket name. */
  bucketName?: string;
}

export const GooglePrivacyDlpV2AmazonS3Bucket: Schema.Schema<GooglePrivacyDlpV2AmazonS3Bucket> = Schema.suspend(() => Schema.Struct({
  awsAccount: Schema.optional(GooglePrivacyDlpV2AwsAccount),
  bucketName: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2AmazonS3Bucket" }) as any as Schema.Schema<GooglePrivacyDlpV2AmazonS3Bucket>;

export interface GooglePrivacyDlpV2OtherCloudSingleResourceReference {
  /** Amazon S3 bucket. */
  amazonS3Bucket?: GooglePrivacyDlpV2AmazonS3Bucket;
}

export const GooglePrivacyDlpV2OtherCloudSingleResourceReference: Schema.Schema<GooglePrivacyDlpV2OtherCloudSingleResourceReference> = Schema.suspend(() => Schema.Struct({
  amazonS3Bucket: Schema.optional(GooglePrivacyDlpV2AmazonS3Bucket),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherCloudSingleResourceReference" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherCloudSingleResourceReference>;

export interface GooglePrivacyDlpV2DiscoveryOtherCloudFilter {
  /** A collection of resources for this filter to apply to. */
  collection?: GooglePrivacyDlpV2OtherCloudResourceCollection;
  /** The resource to scan. Configs using this filter can only have one target (the target with this single resource reference). */
  singleResource?: GooglePrivacyDlpV2OtherCloudSingleResourceReference;
  /** Optional. Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically. */
  others?: GooglePrivacyDlpV2AllOtherResources;
}

export const GooglePrivacyDlpV2DiscoveryOtherCloudFilter: Schema.Schema<GooglePrivacyDlpV2DiscoveryOtherCloudFilter> = Schema.suspend(() => Schema.Struct({
  collection: Schema.optional(GooglePrivacyDlpV2OtherCloudResourceCollection),
  singleResource: Schema.optional(GooglePrivacyDlpV2OtherCloudSingleResourceReference),
  others: Schema.optional(GooglePrivacyDlpV2AllOtherResources),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryOtherCloudFilter" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryOtherCloudFilter>;

export interface GooglePrivacyDlpV2AmazonS3BucketConditions {
  /** Optional. Bucket types that should be profiled. Optional. Defaults to TYPE_ALL_SUPPORTED if unspecified. */
  bucketTypes?: Array<"TYPE_UNSPECIFIED" | "TYPE_ALL_SUPPORTED" | "TYPE_GENERAL_PURPOSE" | (string & {})>;
  /** Optional. Object classes that should be profiled. Optional. Defaults to ALL_SUPPORTED_CLASSES if unspecified. */
  objectStorageClasses?: Array<"UNSPECIFIED" | "ALL_SUPPORTED_CLASSES" | "STANDARD" | "STANDARD_INFREQUENT_ACCESS" | "GLACIER_INSTANT_RETRIEVAL" | "INTELLIGENT_TIERING" | (string & {})>;
}

export const GooglePrivacyDlpV2AmazonS3BucketConditions: Schema.Schema<GooglePrivacyDlpV2AmazonS3BucketConditions> = Schema.suspend(() => Schema.Struct({
  bucketTypes: Schema.optional(Schema.Array(Schema.String)),
  objectStorageClasses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2AmazonS3BucketConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2AmazonS3BucketConditions>;

export interface GooglePrivacyDlpV2DiscoveryOtherCloudConditions {
  /** Minimum age a resource must be before Cloud DLP can profile it. Value must be 1 hour or greater. */
  minAge?: string;
  /** Amazon S3 bucket conditions. */
  amazonS3BucketConditions?: GooglePrivacyDlpV2AmazonS3BucketConditions;
}

export const GooglePrivacyDlpV2DiscoveryOtherCloudConditions: Schema.Schema<GooglePrivacyDlpV2DiscoveryOtherCloudConditions> = Schema.suspend(() => Schema.Struct({
  minAge: Schema.optional(Schema.String),
  amazonS3BucketConditions: Schema.optional(GooglePrivacyDlpV2AmazonS3BucketConditions),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryOtherCloudConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryOtherCloudConditions>;

export interface GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence {
  /** Optional. Frequency to update profiles regardless of whether the underlying resource has changes. Defaults to never. */
  refreshFrequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
  /** Optional. Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update. */
  inspectTemplateModifiedCadence?: GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence;
}

export const GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence> = Schema.suspend(() => Schema.Struct({
  refreshFrequency: Schema.optional(Schema.String),
  inspectTemplateModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence>;

export interface GooglePrivacyDlpV2OtherCloudDiscoveryTarget {
  /** Required. The type of data profiles generated by this discovery target. Supported values are: * aws/s3/bucket */
  dataSourceType?: GooglePrivacyDlpV2DataSourceType;
  /** Required. The resources that the discovery cadence applies to. The first target with a matching filter will be the one to apply to a resource. */
  filter?: GooglePrivacyDlpV2DiscoveryOtherCloudFilter;
  /** Optional. In addition to matching the filter, these conditions must be true before a profile is generated. */
  conditions?: GooglePrivacyDlpV2DiscoveryOtherCloudConditions;
  /** How often and when to update data profiles. New resources that match both the filter and conditions are scanned as quickly as possible depending on system capacity. */
  generationCadence?: GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence;
  /** Disable profiling for resources that match this filter. */
  disabled?: GooglePrivacyDlpV2Disabled;
}

export const GooglePrivacyDlpV2OtherCloudDiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2OtherCloudDiscoveryTarget> = Schema.suspend(() => Schema.Struct({
  dataSourceType: Schema.optional(GooglePrivacyDlpV2DataSourceType),
  filter: Schema.optional(GooglePrivacyDlpV2DiscoveryOtherCloudFilter),
  conditions: Schema.optional(GooglePrivacyDlpV2DiscoveryOtherCloudConditions),
  generationCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryOtherCloudGenerationCadence),
  disabled: Schema.optional(GooglePrivacyDlpV2Disabled),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherCloudDiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherCloudDiscoveryTarget>;

export interface GooglePrivacyDlpV2VertexDatasetRegex {
  /** For organizations, if unset, will match all projects. Has no effect for configurations created within a project. */
  projectIdRegex?: string;
}

export const GooglePrivacyDlpV2VertexDatasetRegex: Schema.Schema<GooglePrivacyDlpV2VertexDatasetRegex> = Schema.suspend(() => Schema.Struct({
  projectIdRegex: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2VertexDatasetRegex" }) as any as Schema.Schema<GooglePrivacyDlpV2VertexDatasetRegex>;

export interface GooglePrivacyDlpV2VertexDatasetRegexes {
  /** Required. The group of regular expression patterns to match against one or more datasets. Maximum of 100 entries. The sum of the lengths of all regular expressions can't exceed 10 KiB. */
  patterns?: Array<GooglePrivacyDlpV2VertexDatasetRegex>;
}

export const GooglePrivacyDlpV2VertexDatasetRegexes: Schema.Schema<GooglePrivacyDlpV2VertexDatasetRegexes> = Schema.suspend(() => Schema.Struct({
  patterns: Schema.optional(Schema.Array(GooglePrivacyDlpV2VertexDatasetRegex)),
})).annotate({ identifier: "GooglePrivacyDlpV2VertexDatasetRegexes" }) as any as Schema.Schema<GooglePrivacyDlpV2VertexDatasetRegexes>;

export interface GooglePrivacyDlpV2VertexDatasetCollection {
  /** The regex used to filter dataset resources. */
  vertexDatasetRegexes?: GooglePrivacyDlpV2VertexDatasetRegexes;
}

export const GooglePrivacyDlpV2VertexDatasetCollection: Schema.Schema<GooglePrivacyDlpV2VertexDatasetCollection> = Schema.suspend(() => Schema.Struct({
  vertexDatasetRegexes: Schema.optional(GooglePrivacyDlpV2VertexDatasetRegexes),
})).annotate({ identifier: "GooglePrivacyDlpV2VertexDatasetCollection" }) as any as Schema.Schema<GooglePrivacyDlpV2VertexDatasetCollection>;

export interface GooglePrivacyDlpV2VertexDatasetResourceReference {
  /** Required. The name of the Vertex AI resource. If set within a project-level configuration, the specified resource must be within the project. Examples: * `projects/{project}/locations/{location}/datasets/{dataset}` */
  datasetResourceName?: string;
}

export const GooglePrivacyDlpV2VertexDatasetResourceReference: Schema.Schema<GooglePrivacyDlpV2VertexDatasetResourceReference> = Schema.suspend(() => Schema.Struct({
  datasetResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2VertexDatasetResourceReference" }) as any as Schema.Schema<GooglePrivacyDlpV2VertexDatasetResourceReference>;

export interface GooglePrivacyDlpV2DiscoveryVertexDatasetFilter {
  /** A specific set of Vertex AI datasets for this filter to apply to. */
  collection?: GooglePrivacyDlpV2VertexDatasetCollection;
  /** The dataset resource to scan. Targets including this can only include one target (the target with this dataset resource reference). */
  vertexDatasetResourceReference?: GooglePrivacyDlpV2VertexDatasetResourceReference;
  /** Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically. */
  others?: GooglePrivacyDlpV2AllOtherResources;
}

export const GooglePrivacyDlpV2DiscoveryVertexDatasetFilter: Schema.Schema<GooglePrivacyDlpV2DiscoveryVertexDatasetFilter> = Schema.suspend(() => Schema.Struct({
  collection: Schema.optional(GooglePrivacyDlpV2VertexDatasetCollection),
  vertexDatasetResourceReference: Schema.optional(GooglePrivacyDlpV2VertexDatasetResourceReference),
  others: Schema.optional(GooglePrivacyDlpV2AllOtherResources),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryVertexDatasetFilter" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryVertexDatasetFilter>;

export interface GooglePrivacyDlpV2DiscoveryVertexDatasetConditions {
  /** Vertex AI dataset must have been created after this date. Used to avoid backfilling. */
  createdAfter?: string;
  /** Minimum age a Vertex AI dataset must have. If set, the value must be 1 hour or greater. */
  minAge?: string;
}

export const GooglePrivacyDlpV2DiscoveryVertexDatasetConditions: Schema.Schema<GooglePrivacyDlpV2DiscoveryVertexDatasetConditions> = Schema.suspend(() => Schema.Struct({
  createdAfter: Schema.optional(Schema.String),
  minAge: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryVertexDatasetConditions" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryVertexDatasetConditions>;

export interface GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence {
  /** If you set this field, profiles are refreshed at this frequency regardless of whether the underlying datasets have changed. Defaults to never. */
  refreshFrequency?: "UPDATE_FREQUENCY_UNSPECIFIED" | "UPDATE_FREQUENCY_NEVER" | "UPDATE_FREQUENCY_DAILY" | "UPDATE_FREQUENCY_MONTHLY" | (string & {});
  /** Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to be updated. */
  inspectTemplateModifiedCadence?: GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence;
}

export const GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence: Schema.Schema<GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence> = Schema.suspend(() => Schema.Struct({
  refreshFrequency: Schema.optional(Schema.String),
  inspectTemplateModifiedCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryInspectTemplateModifiedCadence),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence>;

export interface GooglePrivacyDlpV2VertexDatasetDiscoveryTarget {
  /** Required. The datasets the discovery cadence applies to. The first target with a matching filter will be the one to apply to a dataset. */
  filter?: GooglePrivacyDlpV2DiscoveryVertexDatasetFilter;
  /** In addition to matching the filter, these conditions must be true before a profile is generated. */
  conditions?: GooglePrivacyDlpV2DiscoveryVertexDatasetConditions;
  /** How often and when to update profiles. New datasets that match both the filter and conditions are scanned as quickly as possible depending on system capacity. */
  generationCadence?: GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence;
  /** Disable profiling for datasets that match this filter. */
  disabled?: GooglePrivacyDlpV2Disabled;
}

export const GooglePrivacyDlpV2VertexDatasetDiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2VertexDatasetDiscoveryTarget> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(GooglePrivacyDlpV2DiscoveryVertexDatasetFilter),
  conditions: Schema.optional(GooglePrivacyDlpV2DiscoveryVertexDatasetConditions),
  generationCadence: Schema.optional(GooglePrivacyDlpV2DiscoveryVertexDatasetGenerationCadence),
  disabled: Schema.optional(GooglePrivacyDlpV2Disabled),
})).annotate({ identifier: "GooglePrivacyDlpV2VertexDatasetDiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2VertexDatasetDiscoveryTarget>;

export interface GooglePrivacyDlpV2DiscoveryTarget {
  /** BigQuery target for Discovery. The first target to match a table will be the one applied. */
  bigQueryTarget?: GooglePrivacyDlpV2BigQueryDiscoveryTarget;
  /** Cloud SQL target for Discovery. The first target to match a table will be the one applied. */
  cloudSqlTarget?: GooglePrivacyDlpV2CloudSqlDiscoveryTarget;
  /** Discovery target that looks for credentials and secrets stored in cloud resource metadata and reports them as vulnerabilities to Security Command Center. Only one target of this type is allowed. */
  secretsTarget?: GooglePrivacyDlpV2SecretsDiscoveryTarget;
  /** Cloud Storage target for Discovery. The first target to match a table will be the one applied. */
  cloudStorageTarget?: GooglePrivacyDlpV2CloudStorageDiscoveryTarget;
  /** Other clouds target for discovery. The first target to match a resource will be the one applied. */
  otherCloudTarget?: GooglePrivacyDlpV2OtherCloudDiscoveryTarget;
  /** Vertex AI dataset target for Discovery. The first target to match a dataset will be the one applied. Note that discovery for Vertex AI can incur Cloud Storage Class B operation charges for storage.objects.get operations and retrieval fees. For more information, see [Cloud Storage pricing](https://cloud.google.com/storage/pricing#price-tables). Note that discovery for Vertex AI dataset will not be able to scan images unless DiscoveryConfig.processing_location.image_fallback_location has multi_region_processing or global_processing configured. */
  vertexDatasetTarget?: GooglePrivacyDlpV2VertexDatasetDiscoveryTarget;
}

export const GooglePrivacyDlpV2DiscoveryTarget: Schema.Schema<GooglePrivacyDlpV2DiscoveryTarget> = Schema.suspend(() => Schema.Struct({
  bigQueryTarget: Schema.optional(GooglePrivacyDlpV2BigQueryDiscoveryTarget),
  cloudSqlTarget: Schema.optional(GooglePrivacyDlpV2CloudSqlDiscoveryTarget),
  secretsTarget: Schema.optional(GooglePrivacyDlpV2SecretsDiscoveryTarget),
  cloudStorageTarget: Schema.optional(GooglePrivacyDlpV2CloudStorageDiscoveryTarget),
  otherCloudTarget: Schema.optional(GooglePrivacyDlpV2OtherCloudDiscoveryTarget),
  vertexDatasetTarget: Schema.optional(GooglePrivacyDlpV2VertexDatasetDiscoveryTarget),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryTarget" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryTarget>;

export interface GooglePrivacyDlpV2MultiRegionProcessing {
}

export const GooglePrivacyDlpV2MultiRegionProcessing: Schema.Schema<GooglePrivacyDlpV2MultiRegionProcessing> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2MultiRegionProcessing" }) as any as Schema.Schema<GooglePrivacyDlpV2MultiRegionProcessing>;

export interface GooglePrivacyDlpV2GlobalProcessing {
}

export const GooglePrivacyDlpV2GlobalProcessing: Schema.Schema<GooglePrivacyDlpV2GlobalProcessing> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2GlobalProcessing" }) as any as Schema.Schema<GooglePrivacyDlpV2GlobalProcessing>;

export interface GooglePrivacyDlpV2ImageFallbackLocation {
  /** Processing occurs in a multi-region that contains the current region if available. */
  multiRegionProcessing?: GooglePrivacyDlpV2MultiRegionProcessing;
  /** Processing occurs in the global region. */
  globalProcessing?: GooglePrivacyDlpV2GlobalProcessing;
}

export const GooglePrivacyDlpV2ImageFallbackLocation: Schema.Schema<GooglePrivacyDlpV2ImageFallbackLocation> = Schema.suspend(() => Schema.Struct({
  multiRegionProcessing: Schema.optional(GooglePrivacyDlpV2MultiRegionProcessing),
  globalProcessing: Schema.optional(GooglePrivacyDlpV2GlobalProcessing),
})).annotate({ identifier: "GooglePrivacyDlpV2ImageFallbackLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2ImageFallbackLocation>;

export interface GooglePrivacyDlpV2DocumentFallbackLocation {
  /** Processing occurs in a multi-region that contains the current region if available. */
  multiRegionProcessing?: GooglePrivacyDlpV2MultiRegionProcessing;
  /** Processing occurs in the global region. */
  globalProcessing?: GooglePrivacyDlpV2GlobalProcessing;
}

export const GooglePrivacyDlpV2DocumentFallbackLocation: Schema.Schema<GooglePrivacyDlpV2DocumentFallbackLocation> = Schema.suspend(() => Schema.Struct({
  multiRegionProcessing: Schema.optional(GooglePrivacyDlpV2MultiRegionProcessing),
  globalProcessing: Schema.optional(GooglePrivacyDlpV2GlobalProcessing),
})).annotate({ identifier: "GooglePrivacyDlpV2DocumentFallbackLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2DocumentFallbackLocation>;

export interface GooglePrivacyDlpV2ProcessingLocation {
  /** Image processing falls back using this configuration. */
  imageFallbackLocation?: GooglePrivacyDlpV2ImageFallbackLocation;
  /** Document processing falls back using this configuration. */
  documentFallbackLocation?: GooglePrivacyDlpV2DocumentFallbackLocation;
}

export const GooglePrivacyDlpV2ProcessingLocation: Schema.Schema<GooglePrivacyDlpV2ProcessingLocation> = Schema.suspend(() => Schema.Struct({
  imageFallbackLocation: Schema.optional(GooglePrivacyDlpV2ImageFallbackLocation),
  documentFallbackLocation: Schema.optional(GooglePrivacyDlpV2DocumentFallbackLocation),
})).annotate({ identifier: "GooglePrivacyDlpV2ProcessingLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2ProcessingLocation>;

export interface GooglePrivacyDlpV2DiscoveryConfig {
  /** Unique resource name for the DiscoveryConfig, assigned by the service when the DiscoveryConfig is created, for example `projects/dlp-test-project/locations/global/discoveryConfigs/53234423`. */
  name?: string;
  /** Display name (max 100 chars) */
  displayName?: string;
  /** Only set when the parent is an org. */
  orgConfig?: GooglePrivacyDlpV2OrgConfig;
  /** Must be set only when scanning other clouds. */
  otherCloudStartingLocation?: GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation;
  /** Detection logic for profile generation. Not all template features are used by Discovery. FindingLimits, include_quote and exclude_info_types have no impact on Discovery. Multiple templates may be provided if there is data in multiple regions. At most one template must be specified per-region (including "global"). Each region is scanned using the applicable template. If no region-specific template is specified, but a "global" template is specified, it will be copied to that region and used instead. If no global or region-specific template is provided for a region with data, that region's data will not be scanned. For more information, see https://cloud.google.com/sensitive-data-protection/docs/data-profiles#data-residency. */
  inspectTemplates?: Array<string>;
  /** Actions to execute at the completion of scanning. */
  actions?: Array<GooglePrivacyDlpV2DataProfileAction>;
  /** Target to match against for determining what to scan and how frequently. */
  targets?: Array<GooglePrivacyDlpV2DiscoveryTarget>;
  /** Output only. A stream of errors encountered when the config was activated. Repeated errors may result in the config automatically being paused. Output only field. Will return the last 100 errors. Whenever the config is modified this list will be cleared. */
  errors?: Array<GooglePrivacyDlpV2Error>;
  /** Output only. The creation timestamp of a DiscoveryConfig. */
  createTime?: string;
  /** Output only. The last update timestamp of a DiscoveryConfig. */
  updateTime?: string;
  /** Output only. The timestamp of the last time this config was executed. */
  lastRunTime?: string;
  /** Required. A status for this configuration. */
  status?: "STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | (string & {});
  /** Optional. Processing location configuration. Vertex AI dataset scanning will set processing_location.image_fallback_type to MultiRegionProcessing by default. */
  processingLocation?: GooglePrivacyDlpV2ProcessingLocation;
}

export const GooglePrivacyDlpV2DiscoveryConfig: Schema.Schema<GooglePrivacyDlpV2DiscoveryConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  orgConfig: Schema.optional(GooglePrivacyDlpV2OrgConfig),
  otherCloudStartingLocation: Schema.optional(GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation),
  inspectTemplates: Schema.optional(Schema.Array(Schema.String)),
  actions: Schema.optional(Schema.Array(GooglePrivacyDlpV2DataProfileAction)),
  targets: Schema.optional(Schema.Array(GooglePrivacyDlpV2DiscoveryTarget)),
  errors: Schema.optional(Schema.Array(GooglePrivacyDlpV2Error)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastRunTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  processingLocation: Schema.optional(GooglePrivacyDlpV2ProcessingLocation),
})).annotate({ identifier: "GooglePrivacyDlpV2DiscoveryConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2DiscoveryConfig>;

export interface GooglePrivacyDlpV2CreateDiscoveryConfigRequest {
  /** Required. The DiscoveryConfig to create. */
  discoveryConfig?: GooglePrivacyDlpV2DiscoveryConfig;
  /** The config ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one. */
  configId?: string;
}

export const GooglePrivacyDlpV2CreateDiscoveryConfigRequest: Schema.Schema<GooglePrivacyDlpV2CreateDiscoveryConfigRequest> = Schema.suspend(() => Schema.Struct({
  discoveryConfig: Schema.optional(GooglePrivacyDlpV2DiscoveryConfig),
  configId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateDiscoveryConfigRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateDiscoveryConfigRequest>;

export interface GooglePrivacyDlpV2UpdateDiscoveryConfigRequest {
  /** Required. New DiscoveryConfig value. */
  discoveryConfig?: GooglePrivacyDlpV2DiscoveryConfig;
  /** Mask to control which fields get updated. */
  updateMask?: string;
}

export const GooglePrivacyDlpV2UpdateDiscoveryConfigRequest: Schema.Schema<GooglePrivacyDlpV2UpdateDiscoveryConfigRequest> = Schema.suspend(() => Schema.Struct({
  discoveryConfig: Schema.optional(GooglePrivacyDlpV2DiscoveryConfig),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UpdateDiscoveryConfigRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2UpdateDiscoveryConfigRequest>;

export interface GooglePrivacyDlpV2ListDiscoveryConfigsResponse {
  /** List of configs, up to page_size in ListDiscoveryConfigsRequest. */
  discoveryConfigs?: Array<GooglePrivacyDlpV2DiscoveryConfig>;
  /** If the next page is available then this value is the next page token to be used in the following ListDiscoveryConfigs request. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListDiscoveryConfigsResponse: Schema.Schema<GooglePrivacyDlpV2ListDiscoveryConfigsResponse> = Schema.suspend(() => Schema.Struct({
  discoveryConfigs: Schema.optional(Schema.Array(GooglePrivacyDlpV2DiscoveryConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListDiscoveryConfigsResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListDiscoveryConfigsResponse>;

export interface GooglePrivacyDlpV2CreateDlpJobRequest {
  /** An inspection job scans a storage repository for InfoTypes. */
  inspectJob?: GooglePrivacyDlpV2InspectJobConfig;
  /** A risk analysis job calculates re-identification risk metrics for a BigQuery table. */
  riskJob?: GooglePrivacyDlpV2RiskAnalysisJobConfig;
  /** The job id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one. */
  jobId?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2CreateDlpJobRequest: Schema.Schema<GooglePrivacyDlpV2CreateDlpJobRequest> = Schema.suspend(() => Schema.Struct({
  inspectJob: Schema.optional(GooglePrivacyDlpV2InspectJobConfig),
  riskJob: Schema.optional(GooglePrivacyDlpV2RiskAnalysisJobConfig),
  jobId: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateDlpJobRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateDlpJobRequest>;

export interface GooglePrivacyDlpV2ListDlpJobsResponse {
  /** A list of DlpJobs that matches the specified filter in the request. */
  jobs?: Array<GooglePrivacyDlpV2DlpJob>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListDlpJobsResponse: Schema.Schema<GooglePrivacyDlpV2ListDlpJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(GooglePrivacyDlpV2DlpJob)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListDlpJobsResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListDlpJobsResponse>;

export interface GooglePrivacyDlpV2CancelDlpJobRequest {
}

export const GooglePrivacyDlpV2CancelDlpJobRequest: Schema.Schema<GooglePrivacyDlpV2CancelDlpJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2CancelDlpJobRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CancelDlpJobRequest>;

export interface GooglePrivacyDlpV2CloudStorageFileSet {
  /** The url, in the format `gs:///`. Trailing wildcard in the path is allowed. */
  url?: string;
}

export const GooglePrivacyDlpV2CloudStorageFileSet: Schema.Schema<GooglePrivacyDlpV2CloudStorageFileSet> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudStorageFileSet" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudStorageFileSet>;

export interface GooglePrivacyDlpV2BigQueryField {
  /** Source table of the field. */
  table?: GooglePrivacyDlpV2BigQueryTable;
  /** Designated field in the BigQuery table. */
  field?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2BigQueryField: Schema.Schema<GooglePrivacyDlpV2BigQueryField> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2BigQueryField" }) as any as Schema.Schema<GooglePrivacyDlpV2BigQueryField>;

export interface GooglePrivacyDlpV2LargeCustomDictionaryConfig {
  /** Location to store dictionary artifacts in Cloud Storage. These files will only be accessible by project owners and the DLP API. If any of these artifacts are modified, the dictionary is considered invalid and can no longer be used. */
  outputPath?: GooglePrivacyDlpV2CloudStoragePath;
  /** Set of files containing newline-delimited lists of dictionary phrases. */
  cloudStorageFileSet?: GooglePrivacyDlpV2CloudStorageFileSet;
  /** Field in a BigQuery table where each cell represents a dictionary phrase. */
  bigQueryField?: GooglePrivacyDlpV2BigQueryField;
}

export const GooglePrivacyDlpV2LargeCustomDictionaryConfig: Schema.Schema<GooglePrivacyDlpV2LargeCustomDictionaryConfig> = Schema.suspend(() => Schema.Struct({
  outputPath: Schema.optional(GooglePrivacyDlpV2CloudStoragePath),
  cloudStorageFileSet: Schema.optional(GooglePrivacyDlpV2CloudStorageFileSet),
  bigQueryField: Schema.optional(GooglePrivacyDlpV2BigQueryField),
})).annotate({ identifier: "GooglePrivacyDlpV2LargeCustomDictionaryConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2LargeCustomDictionaryConfig>;

export interface GooglePrivacyDlpV2StoredInfoTypeConfig {
  /** Display name of the StoredInfoType (max 256 characters). */
  displayName?: string;
  /** Description of the StoredInfoType (max 256 characters). */
  description?: string;
  /** StoredInfoType where findings are defined by a dictionary of phrases. */
  largeCustomDictionary?: GooglePrivacyDlpV2LargeCustomDictionaryConfig;
  /** Store dictionary-based CustomInfoType. */
  dictionary?: GooglePrivacyDlpV2Dictionary;
  /** Store regular expression-based StoredInfoType. */
  regex?: GooglePrivacyDlpV2Regex;
}

export const GooglePrivacyDlpV2StoredInfoTypeConfig: Schema.Schema<GooglePrivacyDlpV2StoredInfoTypeConfig> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  largeCustomDictionary: Schema.optional(GooglePrivacyDlpV2LargeCustomDictionaryConfig),
  dictionary: Schema.optional(GooglePrivacyDlpV2Dictionary),
  regex: Schema.optional(GooglePrivacyDlpV2Regex),
})).annotate({ identifier: "GooglePrivacyDlpV2StoredInfoTypeConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2StoredInfoTypeConfig>;

export interface GooglePrivacyDlpV2CreateStoredInfoTypeRequest {
  /** Required. Configuration of the storedInfoType to create. */
  config?: GooglePrivacyDlpV2StoredInfoTypeConfig;
  /** The storedInfoType ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one. */
  storedInfoTypeId?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const GooglePrivacyDlpV2CreateStoredInfoTypeRequest: Schema.Schema<GooglePrivacyDlpV2CreateStoredInfoTypeRequest> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GooglePrivacyDlpV2StoredInfoTypeConfig),
  storedInfoTypeId: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateStoredInfoTypeRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateStoredInfoTypeRequest>;

export interface GooglePrivacyDlpV2LargeCustomDictionaryStats {
  /** Approximate number of distinct phrases in the dictionary. */
  approxNumPhrases?: string;
}

export const GooglePrivacyDlpV2LargeCustomDictionaryStats: Schema.Schema<GooglePrivacyDlpV2LargeCustomDictionaryStats> = Schema.suspend(() => Schema.Struct({
  approxNumPhrases: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2LargeCustomDictionaryStats" }) as any as Schema.Schema<GooglePrivacyDlpV2LargeCustomDictionaryStats>;

export interface GooglePrivacyDlpV2StoredInfoTypeStats {
  /** StoredInfoType where findings are defined by a dictionary of phrases. */
  largeCustomDictionary?: GooglePrivacyDlpV2LargeCustomDictionaryStats;
}

export const GooglePrivacyDlpV2StoredInfoTypeStats: Schema.Schema<GooglePrivacyDlpV2StoredInfoTypeStats> = Schema.suspend(() => Schema.Struct({
  largeCustomDictionary: Schema.optional(GooglePrivacyDlpV2LargeCustomDictionaryStats),
})).annotate({ identifier: "GooglePrivacyDlpV2StoredInfoTypeStats" }) as any as Schema.Schema<GooglePrivacyDlpV2StoredInfoTypeStats>;

export interface GooglePrivacyDlpV2StoredInfoTypeVersion {
  /** StoredInfoType configuration. */
  config?: GooglePrivacyDlpV2StoredInfoTypeConfig;
  /** Create timestamp of the version. Read-only, determined by the system when the version is created. */
  createTime?: string;
  /** Stored info type version state. Read-only, updated by the system during dictionary creation. */
  state?: "STORED_INFO_TYPE_STATE_UNSPECIFIED" | "PENDING" | "READY" | "FAILED" | "INVALID" | (string & {});
  /** Errors that occurred when creating this storedInfoType version, or anomalies detected in the storedInfoType data that render it unusable. Only the five most recent errors will be displayed, with the most recent error appearing first. For example, some of the data for stored custom dictionaries is put in the user's Cloud Storage bucket, and if this data is modified or deleted by the user or another system, the dictionary becomes invalid. If any errors occur, fix the problem indicated by the error message and use the UpdateStoredInfoType API method to create another version of the storedInfoType to continue using it, reusing the same `config` if it was not the source of the error. */
  errors?: Array<GooglePrivacyDlpV2Error>;
  /** Statistics about this storedInfoType version. */
  stats?: GooglePrivacyDlpV2StoredInfoTypeStats;
}

export const GooglePrivacyDlpV2StoredInfoTypeVersion: Schema.Schema<GooglePrivacyDlpV2StoredInfoTypeVersion> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GooglePrivacyDlpV2StoredInfoTypeConfig),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(GooglePrivacyDlpV2Error)),
  stats: Schema.optional(GooglePrivacyDlpV2StoredInfoTypeStats),
})).annotate({ identifier: "GooglePrivacyDlpV2StoredInfoTypeVersion" }) as any as Schema.Schema<GooglePrivacyDlpV2StoredInfoTypeVersion>;

export interface GooglePrivacyDlpV2StoredInfoType {
  /** Resource name. */
  name?: string;
  /** Current version of the stored info type. */
  currentVersion?: GooglePrivacyDlpV2StoredInfoTypeVersion;
  /** Pending versions of the stored info type. Empty if no versions are pending. */
  pendingVersions?: Array<GooglePrivacyDlpV2StoredInfoTypeVersion>;
}

export const GooglePrivacyDlpV2StoredInfoType: Schema.Schema<GooglePrivacyDlpV2StoredInfoType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  currentVersion: Schema.optional(GooglePrivacyDlpV2StoredInfoTypeVersion),
  pendingVersions: Schema.optional(Schema.Array(GooglePrivacyDlpV2StoredInfoTypeVersion)),
})).annotate({ identifier: "GooglePrivacyDlpV2StoredInfoType" }) as any as Schema.Schema<GooglePrivacyDlpV2StoredInfoType>;

export interface GooglePrivacyDlpV2UpdateStoredInfoTypeRequest {
  /** Updated configuration for the storedInfoType. If not provided, a new version of the storedInfoType will be created with the existing configuration. */
  config?: GooglePrivacyDlpV2StoredInfoTypeConfig;
  /** Mask to control which fields get updated. */
  updateMask?: string;
}

export const GooglePrivacyDlpV2UpdateStoredInfoTypeRequest: Schema.Schema<GooglePrivacyDlpV2UpdateStoredInfoTypeRequest> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GooglePrivacyDlpV2StoredInfoTypeConfig),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UpdateStoredInfoTypeRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2UpdateStoredInfoTypeRequest>;

export interface GooglePrivacyDlpV2ListStoredInfoTypesResponse {
  /** List of storedInfoTypes, up to page_size in ListStoredInfoTypesRequest. */
  storedInfoTypes?: Array<GooglePrivacyDlpV2StoredInfoType>;
  /** If the next page is available then the next page token to be used in the following ListStoredInfoTypes request. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListStoredInfoTypesResponse: Schema.Schema<GooglePrivacyDlpV2ListStoredInfoTypesResponse> = Schema.suspend(() => Schema.Struct({
  storedInfoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2StoredInfoType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListStoredInfoTypesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListStoredInfoTypesResponse>;

export interface GooglePrivacyDlpV2DataRiskLevel {
  /** The score applied to the resource. */
  score?: "RISK_SCORE_UNSPECIFIED" | "RISK_LOW" | "RISK_UNKNOWN" | "RISK_MODERATE" | "RISK_HIGH" | (string & {});
}

export const GooglePrivacyDlpV2DataRiskLevel: Schema.Schema<GooglePrivacyDlpV2DataRiskLevel> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DataRiskLevel" }) as any as Schema.Schema<GooglePrivacyDlpV2DataRiskLevel>;

export interface GooglePrivacyDlpV2ProfileStatus {
  /** Profiling status code and optional message. The `status.code` value is 0 (default value) for OK. */
  status?: GoogleRpcStatus;
  /** Time when the profile generation status was updated */
  timestamp?: string;
}

export const GooglePrivacyDlpV2ProfileStatus: Schema.Schema<GooglePrivacyDlpV2ProfileStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(GoogleRpcStatus),
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ProfileStatus" }) as any as Schema.Schema<GooglePrivacyDlpV2ProfileStatus>;

export interface GooglePrivacyDlpV2ProjectDataProfile {
  /** The resource name of the profile. */
  name?: string;
  /** Project ID or account that was profiled. */
  projectId?: string;
  /** The last time the profile was generated. */
  profileLastGenerated?: string;
  /** The sensitivity score of this project. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /** The data risk level of this project. */
  dataRiskLevel?: GooglePrivacyDlpV2DataRiskLevel;
  /** Success or error status of the last attempt to profile the project. */
  profileStatus?: GooglePrivacyDlpV2ProfileStatus;
  /** The number of table data profiles generated for this project. */
  tableDataProfileCount?: string;
  /** The number of file store data profiles generated for this project. */
  fileStoreDataProfileCount?: string;
}

export const GooglePrivacyDlpV2ProjectDataProfile: Schema.Schema<GooglePrivacyDlpV2ProjectDataProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  profileLastGenerated: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
  dataRiskLevel: Schema.optional(GooglePrivacyDlpV2DataRiskLevel),
  profileStatus: Schema.optional(GooglePrivacyDlpV2ProfileStatus),
  tableDataProfileCount: Schema.optional(Schema.String),
  fileStoreDataProfileCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ProjectDataProfile" }) as any as Schema.Schema<GooglePrivacyDlpV2ProjectDataProfile>;

export interface GooglePrivacyDlpV2ListProjectDataProfilesResponse {
  /** List of data profiles. */
  projectDataProfiles?: Array<GooglePrivacyDlpV2ProjectDataProfile>;
  /** The next page token. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListProjectDataProfilesResponse: Schema.Schema<GooglePrivacyDlpV2ListProjectDataProfilesResponse> = Schema.suspend(() => Schema.Struct({
  projectDataProfiles: Schema.optional(Schema.Array(GooglePrivacyDlpV2ProjectDataProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListProjectDataProfilesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListProjectDataProfilesResponse>;

export interface GooglePrivacyDlpV2InfoTypeSummary {
  /** The infoType. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Not populated for predicted infotypes. */
  estimatedPrevalence?: number;
}

export const GooglePrivacyDlpV2InfoTypeSummary: Schema.Schema<GooglePrivacyDlpV2InfoTypeSummary> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  estimatedPrevalence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GooglePrivacyDlpV2InfoTypeSummary" }) as any as Schema.Schema<GooglePrivacyDlpV2InfoTypeSummary>;

export interface GooglePrivacyDlpV2OtherInfoTypeSummary {
  /** The other infoType. */
  infoType?: GooglePrivacyDlpV2InfoType;
  /** Approximate percentage of non-null rows that contained data detected by this infotype. */
  estimatedPrevalence?: number;
  /** Whether this infoType was excluded from sensitivity and risk analysis due to factors such as low prevalence (subject to change). */
  excludedFromAnalysis?: boolean;
}

export const GooglePrivacyDlpV2OtherInfoTypeSummary: Schema.Schema<GooglePrivacyDlpV2OtherInfoTypeSummary> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
  estimatedPrevalence: Schema.optional(Schema.Number),
  excludedFromAnalysis: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2OtherInfoTypeSummary" }) as any as Schema.Schema<GooglePrivacyDlpV2OtherInfoTypeSummary>;

export interface GooglePrivacyDlpV2DataProfileLocation {
  /** The ID of an organization to scan. */
  organizationId?: string;
  /** The ID of the folder within an organization to scan. */
  folderId?: string;
}

export const GooglePrivacyDlpV2DataProfileLocation: Schema.Schema<GooglePrivacyDlpV2DataProfileLocation> = Schema.suspend(() => Schema.Struct({
  organizationId: Schema.optional(Schema.String),
  folderId: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileLocation>;

export interface GooglePrivacyDlpV2DataProfileJobConfig {
  /** The data to scan. */
  location?: GooglePrivacyDlpV2DataProfileLocation;
  /** The project that will run the scan. The DLP service account that exists within this project must have access to all resources that are profiled, and the DLP API must be enabled. */
  projectId?: string;
  /** Must be set only when scanning other clouds. */
  otherCloudStartingLocation?: GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation;
  /** Detection logic for profile generation. Not all template features are used by profiles. FindingLimits, include_quote and exclude_info_types have no impact on data profiling. Multiple templates may be provided if there is data in multiple regions. At most one template must be specified per-region (including "global"). Each region is scanned using the applicable template. If no region-specific template is specified, but a "global" template is specified, it will be copied to that region and used instead. If no global or region-specific template is provided for a region with data, that region's data will not be scanned. For more information, see https://cloud.google.com/sensitive-data-protection/docs/data-profiles#data-residency. */
  inspectTemplates?: Array<string>;
  /** Actions to execute at the completion of the job. */
  dataProfileActions?: Array<GooglePrivacyDlpV2DataProfileAction>;
}

export const GooglePrivacyDlpV2DataProfileJobConfig: Schema.Schema<GooglePrivacyDlpV2DataProfileJobConfig> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(GooglePrivacyDlpV2DataProfileLocation),
  projectId: Schema.optional(Schema.String),
  otherCloudStartingLocation: Schema.optional(GooglePrivacyDlpV2OtherCloudDiscoveryStartingLocation),
  inspectTemplates: Schema.optional(Schema.Array(Schema.String)),
  dataProfileActions: Schema.optional(Schema.Array(GooglePrivacyDlpV2DataProfileAction)),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileJobConfig" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileJobConfig>;

export interface GooglePrivacyDlpV2DataProfileConfigSnapshot {
  /** A copy of the inspection config used to generate this profile. This is a copy of the inspect_template specified in `DataProfileJobConfig`. */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /** A copy of the configuration used to generate this profile. This is deprecated, and the DiscoveryConfig field is preferred moving forward. DataProfileJobConfig will still be written here for Discovery in BigQuery for backwards compatibility, but will not be updated with new fields, while DiscoveryConfig will. */
  dataProfileJob?: GooglePrivacyDlpV2DataProfileJobConfig;
  /** A copy of the configuration used to generate this profile. */
  discoveryConfig?: GooglePrivacyDlpV2DiscoveryConfig;
  /** Name of the inspection template used to generate this profile */
  inspectTemplateName?: string;
  /** Timestamp when the template was modified */
  inspectTemplateModifiedTime?: string;
}

export const GooglePrivacyDlpV2DataProfileConfigSnapshot: Schema.Schema<GooglePrivacyDlpV2DataProfileConfigSnapshot> = Schema.suspend(() => Schema.Struct({
  inspectConfig: Schema.optional(GooglePrivacyDlpV2InspectConfig),
  dataProfileJob: Schema.optional(GooglePrivacyDlpV2DataProfileJobConfig),
  discoveryConfig: Schema.optional(GooglePrivacyDlpV2DiscoveryConfig),
  inspectTemplateName: Schema.optional(Schema.String),
  inspectTemplateModifiedTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileConfigSnapshot" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileConfigSnapshot>;

export interface GooglePrivacyDlpV2Tag {
  /** The namespaced name for the tag value to attach to Google Cloud resources. Must be in the format `{parent_id}/{tag_key_short_name}/{short_name}`, for example, "123456/environment/prod" for an organization parent, or "my-project/environment/prod" for a project parent. This is only set for Google Cloud resources. */
  namespacedTagValue?: string;
  /** The key of a tag key-value pair. For Google Cloud resources, this is the resource name of the key, for example, "tagKeys/123456". */
  key?: string;
  /** The value of a tag key-value pair. For Google Cloud resources, this is the resource name of the value, for example, "tagValues/123456". */
  value?: string;
}

export const GooglePrivacyDlpV2Tag: Schema.Schema<GooglePrivacyDlpV2Tag> = Schema.suspend(() => Schema.Struct({
  namespacedTagValue: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2Tag" }) as any as Schema.Schema<GooglePrivacyDlpV2Tag>;

export interface GooglePrivacyDlpV2RelatedResource {
  /** The full resource name of the related resource. */
  fullResource?: string;
}

export const GooglePrivacyDlpV2RelatedResource: Schema.Schema<GooglePrivacyDlpV2RelatedResource> = Schema.suspend(() => Schema.Struct({
  fullResource: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2RelatedResource" }) as any as Schema.Schema<GooglePrivacyDlpV2RelatedResource>;

export interface GooglePrivacyDlpV2Domain {
  /** A domain category that this profile is related to. */
  category?: "CATEGORY_UNSPECIFIED" | "AI" | "CODE" | (string & {});
  /** The collection of signals that influenced selection of the category. */
  signals?: Array<"SIGNAL_UNSPECIFIED" | "MODEL" | "TEXT_EMBEDDING" | "VERTEX_PLUGIN" | "VECTOR_PLUGIN" | "SOURCE_CODE" | "SERVICE" | (string & {})>;
}

export const GooglePrivacyDlpV2Domain: Schema.Schema<GooglePrivacyDlpV2Domain> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  signals: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePrivacyDlpV2Domain" }) as any as Schema.Schema<GooglePrivacyDlpV2Domain>;

export interface GooglePrivacyDlpV2TableDataProfile {
  /** The name of the profile. */
  name?: string;
  /** The resource type that was profiled. */
  dataSourceType?: GooglePrivacyDlpV2DataSourceType;
  /** The resource name of the project data profile for this table. */
  projectDataProfile?: string;
  /** The Google Cloud project ID that owns the resource. */
  datasetProjectId?: string;
  /** If supported, the location where the dataset's data is stored. See https://cloud.google.com/bigquery/docs/locations for supported locations. */
  datasetLocation?: string;
  /** If the resource is BigQuery, the dataset ID. */
  datasetId?: string;
  /** The table ID. */
  tableId?: string;
  /** The Cloud Asset Inventory resource that was profiled in order to generate this TableDataProfile. https://cloud.google.com/apis/design/resource_names#full_resource_name */
  fullResource?: string;
  /** Success or error status from the most recent profile generation attempt. May be empty if the profile is still being generated. */
  profileStatus?: GooglePrivacyDlpV2ProfileStatus;
  /** State of a profile. This will always be set to DONE when the table data profile is written to another service like BigQuery or Pub/Sub. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "DONE" | (string & {});
  /** The sensitivity score of this table. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /** The data risk level of this table. */
  dataRiskLevel?: GooglePrivacyDlpV2DataRiskLevel;
  /** The infoTypes predicted from this table's data. */
  predictedInfoTypes?: Array<GooglePrivacyDlpV2InfoTypeSummary>;
  /** Other infoTypes found in this table's data. */
  otherInfoTypes?: Array<GooglePrivacyDlpV2OtherInfoTypeSummary>;
  /** The snapshot of the configurations used to generate the profile. */
  configSnapshot?: GooglePrivacyDlpV2DataProfileConfigSnapshot;
  /** The time when this table was last modified */
  lastModifiedTime?: string;
  /** Optional. The time when this table expires. */
  expirationTime?: string;
  /** The number of columns profiled in the table. */
  scannedColumnCount?: string;
  /** The number of columns skipped in the table because of an error. */
  failedColumnCount?: string;
  /** The size of the table when the profile was generated. */
  tableSizeBytes?: string;
  /** Number of rows in the table when the profile was generated. This will not be populated for BigLake tables. */
  rowCount?: string;
  /** How the table is encrypted. */
  encryptionStatus?: "ENCRYPTION_STATUS_UNSPECIFIED" | "ENCRYPTION_GOOGLE_MANAGED" | "ENCRYPTION_CUSTOMER_MANAGED" | (string & {});
  /** How broadly a resource has been shared. */
  resourceVisibility?: "RESOURCE_VISIBILITY_UNSPECIFIED" | "RESOURCE_VISIBILITY_PUBLIC" | "RESOURCE_VISIBILITY_INCONCLUSIVE" | "RESOURCE_VISIBILITY_RESTRICTED" | (string & {});
  /** The last time the profile was generated. */
  profileLastGenerated?: string;
  /** The labels applied to the resource at the time the profile was generated. */
  resourceLabels?: Record<string, string>;
  /** The time at which the table was created. */
  createTime?: string;
  /** The BigQuery table to which the sample findings are written. */
  sampleFindingsTable?: GooglePrivacyDlpV2BigQueryTable;
  /** The tags attached to the table, including any tags attached during profiling. Because tags are attached to Cloud SQL instances rather than Cloud SQL tables, this field is empty for Cloud SQL table profiles. */
  tags?: Array<GooglePrivacyDlpV2Tag>;
  /** Resources related to this profile. */
  relatedResources?: Array<GooglePrivacyDlpV2RelatedResource>;
  /** Domains associated with the profile. */
  domains?: Array<GooglePrivacyDlpV2Domain>;
}

export const GooglePrivacyDlpV2TableDataProfile: Schema.Schema<GooglePrivacyDlpV2TableDataProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dataSourceType: Schema.optional(GooglePrivacyDlpV2DataSourceType),
  projectDataProfile: Schema.optional(Schema.String),
  datasetProjectId: Schema.optional(Schema.String),
  datasetLocation: Schema.optional(Schema.String),
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  fullResource: Schema.optional(Schema.String),
  profileStatus: Schema.optional(GooglePrivacyDlpV2ProfileStatus),
  state: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
  dataRiskLevel: Schema.optional(GooglePrivacyDlpV2DataRiskLevel),
  predictedInfoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2InfoTypeSummary)),
  otherInfoTypes: Schema.optional(Schema.Array(GooglePrivacyDlpV2OtherInfoTypeSummary)),
  configSnapshot: Schema.optional(GooglePrivacyDlpV2DataProfileConfigSnapshot),
  lastModifiedTime: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  scannedColumnCount: Schema.optional(Schema.String),
  failedColumnCount: Schema.optional(Schema.String),
  tableSizeBytes: Schema.optional(Schema.String),
  rowCount: Schema.optional(Schema.String),
  encryptionStatus: Schema.optional(Schema.String),
  resourceVisibility: Schema.optional(Schema.String),
  profileLastGenerated: Schema.optional(Schema.String),
  resourceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  sampleFindingsTable: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  tags: Schema.optional(Schema.Array(GooglePrivacyDlpV2Tag)),
  relatedResources: Schema.optional(Schema.Array(GooglePrivacyDlpV2RelatedResource)),
  domains: Schema.optional(Schema.Array(GooglePrivacyDlpV2Domain)),
})).annotate({ identifier: "GooglePrivacyDlpV2TableDataProfile" }) as any as Schema.Schema<GooglePrivacyDlpV2TableDataProfile>;

export interface GooglePrivacyDlpV2ListTableDataProfilesResponse {
  /** List of data profiles. */
  tableDataProfiles?: Array<GooglePrivacyDlpV2TableDataProfile>;
  /** The next page token. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListTableDataProfilesResponse: Schema.Schema<GooglePrivacyDlpV2ListTableDataProfilesResponse> = Schema.suspend(() => Schema.Struct({
  tableDataProfiles: Schema.optional(Schema.Array(GooglePrivacyDlpV2TableDataProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListTableDataProfilesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListTableDataProfilesResponse>;

export interface GooglePrivacyDlpV2ColumnDataProfile {
  /** The name of the profile. */
  name?: string;
  /** Success or error status from the most recent profile generation attempt. May be empty if the profile is still being generated. */
  profileStatus?: GooglePrivacyDlpV2ProfileStatus;
  /** State of a profile. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "DONE" | (string & {});
  /** The last time the profile was generated. */
  profileLastGenerated?: string;
  /** The resource name of the table data profile. */
  tableDataProfile?: string;
  /** The resource name of the resource this column is within. */
  tableFullResource?: string;
  /** The Google Cloud project ID that owns the profiled resource. */
  datasetProjectId?: string;
  /** If supported, the location where the dataset's data is stored. See https://cloud.google.com/bigquery/docs/locations for supported BigQuery locations. */
  datasetLocation?: string;
  /** The BigQuery dataset ID, if the resource profiled is a BigQuery table. */
  datasetId?: string;
  /** The table ID. */
  tableId?: string;
  /** The name of the column. */
  column?: string;
  /** The sensitivity of this column. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /** The data risk level for this column. */
  dataRiskLevel?: GooglePrivacyDlpV2DataRiskLevel;
  /** If it's been determined this column can be identified as a single type, this will be set. Otherwise the column either has unidentifiable content or mixed types. */
  columnInfoType?: GooglePrivacyDlpV2InfoTypeSummary;
  /** Other types found within this column. List will be unordered. */
  otherMatches?: Array<GooglePrivacyDlpV2OtherInfoTypeSummary>;
  /** Approximate percentage of entries being null in the column. */
  estimatedNullPercentage?: "NULL_PERCENTAGE_LEVEL_UNSPECIFIED" | "NULL_PERCENTAGE_VERY_LOW" | "NULL_PERCENTAGE_LOW" | "NULL_PERCENTAGE_MEDIUM" | "NULL_PERCENTAGE_HIGH" | (string & {});
  /** Approximate uniqueness of the column. */
  estimatedUniquenessScore?: "UNIQUENESS_SCORE_LEVEL_UNSPECIFIED" | "UNIQUENESS_SCORE_LOW" | "UNIQUENESS_SCORE_MEDIUM" | "UNIQUENESS_SCORE_HIGH" | (string & {});
  /** The likelihood that this column contains free-form text. A value close to 1 may indicate the column is likely to contain free-form or natural language text. Range in 0-1. */
  freeTextScore?: number;
  /** The data type of a given column. */
  columnType?: "COLUMN_DATA_TYPE_UNSPECIFIED" | "TYPE_INT64" | "TYPE_BOOL" | "TYPE_FLOAT64" | "TYPE_STRING" | "TYPE_BYTES" | "TYPE_TIMESTAMP" | "TYPE_DATE" | "TYPE_TIME" | "TYPE_DATETIME" | "TYPE_GEOGRAPHY" | "TYPE_NUMERIC" | "TYPE_RECORD" | "TYPE_BIGNUMERIC" | "TYPE_JSON" | "TYPE_INTERVAL" | "TYPE_RANGE_DATE" | "TYPE_RANGE_DATETIME" | "TYPE_RANGE_TIMESTAMP" | (string & {});
  /** Indicates if a policy tag has been applied to the column. */
  policyState?: "COLUMN_POLICY_STATE_UNSPECIFIED" | "COLUMN_POLICY_TAGGED" | (string & {});
}

export const GooglePrivacyDlpV2ColumnDataProfile: Schema.Schema<GooglePrivacyDlpV2ColumnDataProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  profileStatus: Schema.optional(GooglePrivacyDlpV2ProfileStatus),
  state: Schema.optional(Schema.String),
  profileLastGenerated: Schema.optional(Schema.String),
  tableDataProfile: Schema.optional(Schema.String),
  tableFullResource: Schema.optional(Schema.String),
  datasetProjectId: Schema.optional(Schema.String),
  datasetLocation: Schema.optional(Schema.String),
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  column: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
  dataRiskLevel: Schema.optional(GooglePrivacyDlpV2DataRiskLevel),
  columnInfoType: Schema.optional(GooglePrivacyDlpV2InfoTypeSummary),
  otherMatches: Schema.optional(Schema.Array(GooglePrivacyDlpV2OtherInfoTypeSummary)),
  estimatedNullPercentage: Schema.optional(Schema.String),
  estimatedUniquenessScore: Schema.optional(Schema.String),
  freeTextScore: Schema.optional(Schema.Number),
  columnType: Schema.optional(Schema.String),
  policyState: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ColumnDataProfile" }) as any as Schema.Schema<GooglePrivacyDlpV2ColumnDataProfile>;

export interface GooglePrivacyDlpV2ListColumnDataProfilesResponse {
  /** List of data profiles. */
  columnDataProfiles?: Array<GooglePrivacyDlpV2ColumnDataProfile>;
  /** The next page token. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListColumnDataProfilesResponse: Schema.Schema<GooglePrivacyDlpV2ListColumnDataProfilesResponse> = Schema.suspend(() => Schema.Struct({
  columnDataProfiles: Schema.optional(Schema.Array(GooglePrivacyDlpV2ColumnDataProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListColumnDataProfilesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListColumnDataProfilesResponse>;

export interface GooglePrivacyDlpV2FileClusterType {
  /** Cluster type. */
  cluster?: "CLUSTER_UNSPECIFIED" | "CLUSTER_UNKNOWN" | "CLUSTER_TEXT" | "CLUSTER_STRUCTURED_DATA" | "CLUSTER_SOURCE_CODE" | "CLUSTER_RICH_DOCUMENT" | "CLUSTER_IMAGE" | "CLUSTER_ARCHIVE" | "CLUSTER_MULTIMEDIA" | "CLUSTER_EXECUTABLE" | "CLUSTER_AI_MODEL" | (string & {});
}

export const GooglePrivacyDlpV2FileClusterType: Schema.Schema<GooglePrivacyDlpV2FileClusterType> = Schema.suspend(() => Schema.Struct({
  cluster: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2FileClusterType" }) as any as Schema.Schema<GooglePrivacyDlpV2FileClusterType>;

export interface GooglePrivacyDlpV2FileStoreInfoTypeSummary {
  /** The InfoType seen. */
  infoType?: GooglePrivacyDlpV2InfoType;
}

export const GooglePrivacyDlpV2FileStoreInfoTypeSummary: Schema.Schema<GooglePrivacyDlpV2FileStoreInfoTypeSummary> = Schema.suspend(() => Schema.Struct({
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
})).annotate({ identifier: "GooglePrivacyDlpV2FileStoreInfoTypeSummary" }) as any as Schema.Schema<GooglePrivacyDlpV2FileStoreInfoTypeSummary>;

export interface GooglePrivacyDlpV2FileExtensionInfo {
  /** The file extension if set. (aka .pdf, .jpg, .txt) */
  fileExtension?: string;
}

export const GooglePrivacyDlpV2FileExtensionInfo: Schema.Schema<GooglePrivacyDlpV2FileExtensionInfo> = Schema.suspend(() => Schema.Struct({
  fileExtension: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2FileExtensionInfo" }) as any as Schema.Schema<GooglePrivacyDlpV2FileExtensionInfo>;

export interface GooglePrivacyDlpV2FileClusterSummary {
  /** The file cluster type. */
  fileClusterType?: GooglePrivacyDlpV2FileClusterType;
  /** InfoTypes detected in this cluster. */
  fileStoreInfoTypeSummaries?: Array<GooglePrivacyDlpV2FileStoreInfoTypeSummary>;
  /** The sensitivity score of this cluster. The score will be SENSITIVITY_LOW if nothing has been scanned. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /** The data risk level of this cluster. RISK_LOW if nothing has been scanned. */
  dataRiskLevel?: GooglePrivacyDlpV2DataRiskLevel;
  /** A list of errors detected while scanning this cluster. The list is truncated to 10 per cluster. */
  errors?: Array<GooglePrivacyDlpV2Error>;
  /** A sample of file types scanned in this cluster. Empty if no files were scanned. File extensions can be derived from the file name or the file content. */
  fileExtensionsScanned?: Array<GooglePrivacyDlpV2FileExtensionInfo>;
  /** A sample of file types seen in this cluster. Empty if no files were seen. File extensions can be derived from the file name or the file content. */
  fileExtensionsSeen?: Array<GooglePrivacyDlpV2FileExtensionInfo>;
  /** True if no files exist in this cluster. If the file store had more files than could be listed, this will be false even if no files for this cluster were seen and file_extensions_seen is empty. */
  noFilesExist?: boolean;
}

export const GooglePrivacyDlpV2FileClusterSummary: Schema.Schema<GooglePrivacyDlpV2FileClusterSummary> = Schema.suspend(() => Schema.Struct({
  fileClusterType: Schema.optional(GooglePrivacyDlpV2FileClusterType),
  fileStoreInfoTypeSummaries: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileStoreInfoTypeSummary)),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
  dataRiskLevel: Schema.optional(GooglePrivacyDlpV2DataRiskLevel),
  errors: Schema.optional(Schema.Array(GooglePrivacyDlpV2Error)),
  fileExtensionsScanned: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileExtensionInfo)),
  fileExtensionsSeen: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileExtensionInfo)),
  noFilesExist: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GooglePrivacyDlpV2FileClusterSummary" }) as any as Schema.Schema<GooglePrivacyDlpV2FileClusterSummary>;

export interface GooglePrivacyDlpV2FileStoreDataProfile {
  /** The name of the profile. */
  name?: string;
  /** The resource type that was profiled. */
  dataSourceType?: GooglePrivacyDlpV2DataSourceType;
  /** The resource name of the project data profile for this file store. */
  projectDataProfile?: string;
  /** The Google Cloud project ID that owns the resource. For Amazon S3 buckets, this is the AWS Account Id. */
  projectId?: string;
  /** The location of the file store. * Cloud Storage: https://cloud.google.com/storage/docs/locations#available-locations * Amazon S3: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints */
  fileStoreLocation?: string;
  /** For resources that have multiple storage locations, these are those regions. For Cloud Storage this is the list of regions chosen for dual-region storage. `file_store_location` will normally be the corresponding multi-region for the list of individual locations. The first region is always picked as the processing and storage location for the data profile. */
  dataStorageLocations?: Array<string>;
  /** The location type of the file store (region, dual-region, multi-region, etc). If dual-region, expect data_storage_locations to be populated. */
  locationType?: string;
  /** The file store path. * Cloud Storage: `gs://{bucket}` * Amazon S3: `s3://{bucket}` * Vertex AI dataset: `projects/{project_number}/locations/{location}/datasets/{dataset_id}` */
  fileStorePath?: string;
  /** The resource name of the resource profiled. https://cloud.google.com/apis/design/resource_names#full_resource_name Example format of an S3 bucket full resource name: `//cloudasset.googleapis.com/organizations/{org_id}/otherCloudConnections/aws/arn:aws:s3:::{bucket_name}` */
  fullResource?: string;
  /** The snapshot of the configurations used to generate the profile. */
  configSnapshot?: GooglePrivacyDlpV2DataProfileConfigSnapshot;
  /** Success or error status from the most recent profile generation attempt. May be empty if the profile is still being generated. */
  profileStatus?: GooglePrivacyDlpV2ProfileStatus;
  /** State of a profile. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "DONE" | (string & {});
  /** The last time the profile was generated. */
  profileLastGenerated?: string;
  /** How broadly a resource has been shared. */
  resourceVisibility?: "RESOURCE_VISIBILITY_UNSPECIFIED" | "RESOURCE_VISIBILITY_PUBLIC" | "RESOURCE_VISIBILITY_INCONCLUSIVE" | "RESOURCE_VISIBILITY_RESTRICTED" | (string & {});
  /** The sensitivity score of this resource. */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /** The data risk level of this resource. */
  dataRiskLevel?: GooglePrivacyDlpV2DataRiskLevel;
  /** The time the file store was first created. */
  createTime?: string;
  /** The time the file store was last modified. */
  lastModifiedTime?: string;
  /** FileClusterSummary per each cluster. */
  fileClusterSummaries?: Array<GooglePrivacyDlpV2FileClusterSummary>;
  /** Attributes of the resource being profiled. Currently used attributes: * customer_managed_encryption: boolean - true: the resource is encrypted with a customer-managed key. - false: the resource is encrypted with a provider-managed key. */
  resourceAttributes?: Record<string, GooglePrivacyDlpV2Value>;
  /** The labels applied to the resource at the time the profile was generated. */
  resourceLabels?: Record<string, string>;
  /** InfoTypes detected in this file store. */
  fileStoreInfoTypeSummaries?: Array<GooglePrivacyDlpV2FileStoreInfoTypeSummary>;
  /** The BigQuery table to which the sample findings are written. */
  sampleFindingsTable?: GooglePrivacyDlpV2BigQueryTable;
  /** The file store does not have any files. If the profiling operation failed, this is false. */
  fileStoreIsEmpty?: boolean;
  /** The tags attached to the resource, including any tags attached during profiling. */
  tags?: Array<GooglePrivacyDlpV2Tag>;
  /** Resources related to this profile. */
  relatedResources?: Array<GooglePrivacyDlpV2RelatedResource>;
  /** Domains associated with the profile. */
  domains?: Array<GooglePrivacyDlpV2Domain>;
}

export const GooglePrivacyDlpV2FileStoreDataProfile: Schema.Schema<GooglePrivacyDlpV2FileStoreDataProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dataSourceType: Schema.optional(GooglePrivacyDlpV2DataSourceType),
  projectDataProfile: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  fileStoreLocation: Schema.optional(Schema.String),
  dataStorageLocations: Schema.optional(Schema.Array(Schema.String)),
  locationType: Schema.optional(Schema.String),
  fileStorePath: Schema.optional(Schema.String),
  fullResource: Schema.optional(Schema.String),
  configSnapshot: Schema.optional(GooglePrivacyDlpV2DataProfileConfigSnapshot),
  profileStatus: Schema.optional(GooglePrivacyDlpV2ProfileStatus),
  state: Schema.optional(Schema.String),
  profileLastGenerated: Schema.optional(Schema.String),
  resourceVisibility: Schema.optional(Schema.String),
  sensitivityScore: Schema.optional(GooglePrivacyDlpV2SensitivityScore),
  dataRiskLevel: Schema.optional(GooglePrivacyDlpV2DataRiskLevel),
  createTime: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  fileClusterSummaries: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileClusterSummary)),
  resourceAttributes: Schema.optional(Schema.Record(Schema.String, GooglePrivacyDlpV2Value)),
  resourceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  fileStoreInfoTypeSummaries: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileStoreInfoTypeSummary)),
  sampleFindingsTable: Schema.optional(GooglePrivacyDlpV2BigQueryTable),
  fileStoreIsEmpty: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Array(GooglePrivacyDlpV2Tag)),
  relatedResources: Schema.optional(Schema.Array(GooglePrivacyDlpV2RelatedResource)),
  domains: Schema.optional(Schema.Array(GooglePrivacyDlpV2Domain)),
})).annotate({ identifier: "GooglePrivacyDlpV2FileStoreDataProfile" }) as any as Schema.Schema<GooglePrivacyDlpV2FileStoreDataProfile>;

export interface GooglePrivacyDlpV2ListFileStoreDataProfilesResponse {
  /** List of data profiles. */
  fileStoreDataProfiles?: Array<GooglePrivacyDlpV2FileStoreDataProfile>;
  /** The next page token. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListFileStoreDataProfilesResponse: Schema.Schema<GooglePrivacyDlpV2ListFileStoreDataProfilesResponse> = Schema.suspend(() => Schema.Struct({
  fileStoreDataProfiles: Schema.optional(Schema.Array(GooglePrivacyDlpV2FileStoreDataProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListFileStoreDataProfilesResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListFileStoreDataProfilesResponse>;

export interface GooglePrivacyDlpV2HybridInspectDlpJobRequest {
  /** The item to inspect. */
  hybridItem?: GooglePrivacyDlpV2HybridContentItem;
}

export const GooglePrivacyDlpV2HybridInspectDlpJobRequest: Schema.Schema<GooglePrivacyDlpV2HybridInspectDlpJobRequest> = Schema.suspend(() => Schema.Struct({
  hybridItem: Schema.optional(GooglePrivacyDlpV2HybridContentItem),
})).annotate({ identifier: "GooglePrivacyDlpV2HybridInspectDlpJobRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2HybridInspectDlpJobRequest>;

export interface GooglePrivacyDlpV2FinishDlpJobRequest {
}

export const GooglePrivacyDlpV2FinishDlpJobRequest: Schema.Schema<GooglePrivacyDlpV2FinishDlpJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2FinishDlpJobRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2FinishDlpJobRequest>;

export interface GooglePrivacyDlpV2SecretManagerCredential {
  /** Required. The username. */
  username?: string;
  /** Required. The name of the Secret Manager resource that stores the password, in the form `projects/project-id/secrets/secret-name/versions/version`. */
  passwordSecretVersionName?: string;
}

export const GooglePrivacyDlpV2SecretManagerCredential: Schema.Schema<GooglePrivacyDlpV2SecretManagerCredential> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  passwordSecretVersionName: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2SecretManagerCredential" }) as any as Schema.Schema<GooglePrivacyDlpV2SecretManagerCredential>;

export interface GooglePrivacyDlpV2CloudSqlIamCredential {
}

export const GooglePrivacyDlpV2CloudSqlIamCredential: Schema.Schema<GooglePrivacyDlpV2CloudSqlIamCredential> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GooglePrivacyDlpV2CloudSqlIamCredential" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudSqlIamCredential>;

export interface GooglePrivacyDlpV2CloudSqlProperties {
  /** Optional. Immutable. The Cloud SQL instance for which the connection is defined. Only one connection per instance is allowed. This can only be set at creation time, and cannot be updated. It is an error to use a connection_name from different project or region than the one that holds the connection. For example, a Connection resource for Cloud SQL connection_name `project-id:us-central1:sql-instance` must be created under the parent `projects/project-id/locations/us-central1` */
  connectionName?: string;
  /** A username and password stored in Secret Manager. */
  usernamePassword?: GooglePrivacyDlpV2SecretManagerCredential;
  /** Built-in IAM authentication (must be configured in Cloud SQL). */
  cloudSqlIam?: GooglePrivacyDlpV2CloudSqlIamCredential;
  /** Required. The DLP API will limit its connections to max_connections. Must be 2 or greater. */
  maxConnections?: number;
  /** Required. The database engine used by the Cloud SQL instance that this connection configures. */
  databaseEngine?: "DATABASE_ENGINE_UNKNOWN" | "DATABASE_ENGINE_MYSQL" | "DATABASE_ENGINE_POSTGRES" | (string & {});
}

export const GooglePrivacyDlpV2CloudSqlProperties: Schema.Schema<GooglePrivacyDlpV2CloudSqlProperties> = Schema.suspend(() => Schema.Struct({
  connectionName: Schema.optional(Schema.String),
  usernamePassword: Schema.optional(GooglePrivacyDlpV2SecretManagerCredential),
  cloudSqlIam: Schema.optional(GooglePrivacyDlpV2CloudSqlIamCredential),
  maxConnections: Schema.optional(Schema.Number),
  databaseEngine: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2CloudSqlProperties" }) as any as Schema.Schema<GooglePrivacyDlpV2CloudSqlProperties>;

export interface GooglePrivacyDlpV2Connection {
  /** Output only. Name of the connection: `projects/{project}/locations/{location}/connections/{name}`. */
  name?: string;
  /** Required. The connection's state in its lifecycle. */
  state?: "CONNECTION_STATE_UNSPECIFIED" | "MISSING_CREDENTIALS" | "AVAILABLE" | "ERROR" | (string & {});
  /** Output only. Set if status == ERROR, to provide additional details. Will store the last 10 errors sorted with the most recent first. */
  errors?: Array<GooglePrivacyDlpV2Error>;
  /** Connect to a Cloud SQL instance. */
  cloudSql?: GooglePrivacyDlpV2CloudSqlProperties;
}

export const GooglePrivacyDlpV2Connection: Schema.Schema<GooglePrivacyDlpV2Connection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(GooglePrivacyDlpV2Error)),
  cloudSql: Schema.optional(GooglePrivacyDlpV2CloudSqlProperties),
})).annotate({ identifier: "GooglePrivacyDlpV2Connection" }) as any as Schema.Schema<GooglePrivacyDlpV2Connection>;

export interface GooglePrivacyDlpV2CreateConnectionRequest {
  /** Required. The connection resource. */
  connection?: GooglePrivacyDlpV2Connection;
}

export const GooglePrivacyDlpV2CreateConnectionRequest: Schema.Schema<GooglePrivacyDlpV2CreateConnectionRequest> = Schema.suspend(() => Schema.Struct({
  connection: Schema.optional(GooglePrivacyDlpV2Connection),
})).annotate({ identifier: "GooglePrivacyDlpV2CreateConnectionRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2CreateConnectionRequest>;

export interface GooglePrivacyDlpV2ListConnectionsResponse {
  /** List of connections. */
  connections?: Array<GooglePrivacyDlpV2Connection>;
  /** Token to retrieve the next page of results. An empty value means there are no more results. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2ListConnectionsResponse: Schema.Schema<GooglePrivacyDlpV2ListConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  connections: Schema.optional(Schema.Array(GooglePrivacyDlpV2Connection)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2ListConnectionsResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2ListConnectionsResponse>;

export interface GooglePrivacyDlpV2SearchConnectionsResponse {
  /** List of connections that match the search query. Note that only a subset of the fields will be populated, and only "name" is guaranteed to be set. For full details of a Connection, call GetConnection with the name. */
  connections?: Array<GooglePrivacyDlpV2Connection>;
  /** Token to retrieve the next page of results. An empty value means there are no more results. */
  nextPageToken?: string;
}

export const GooglePrivacyDlpV2SearchConnectionsResponse: Schema.Schema<GooglePrivacyDlpV2SearchConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  connections: Schema.optional(Schema.Array(GooglePrivacyDlpV2Connection)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2SearchConnectionsResponse" }) as any as Schema.Schema<GooglePrivacyDlpV2SearchConnectionsResponse>;

export interface GooglePrivacyDlpV2UpdateConnectionRequest {
  /** Required. The connection with new values for the relevant fields. */
  connection?: GooglePrivacyDlpV2Connection;
  /** Optional. Mask to control which fields get updated. */
  updateMask?: string;
}

export const GooglePrivacyDlpV2UpdateConnectionRequest: Schema.Schema<GooglePrivacyDlpV2UpdateConnectionRequest> = Schema.suspend(() => Schema.Struct({
  connection: Schema.optional(GooglePrivacyDlpV2Connection),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2UpdateConnectionRequest" }) as any as Schema.Schema<GooglePrivacyDlpV2UpdateConnectionRequest>;

export interface GooglePrivacyDlpV2DataProfileFindingRecordLocation {
  /** Field ID of the column containing the finding. */
  field?: GooglePrivacyDlpV2FieldId;
}

export const GooglePrivacyDlpV2DataProfileFindingRecordLocation: Schema.Schema<GooglePrivacyDlpV2DataProfileFindingRecordLocation> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(GooglePrivacyDlpV2FieldId),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileFindingRecordLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileFindingRecordLocation>;

export interface GooglePrivacyDlpV2DataProfileFindingLocation {
  /** Name of the container where the finding is located. The top-level name is the source file name or table name. Names of some common storage containers are formatted as follows: * BigQuery tables: `{project_id}:{dataset_id}.{table_id}` * Cloud Storage files: `gs://{bucket}/{path}` */
  containerName?: string;
  /** Location of a finding within a resource that produces a table data profile. */
  dataProfileFindingRecordLocation?: GooglePrivacyDlpV2DataProfileFindingRecordLocation;
}

export const GooglePrivacyDlpV2DataProfileFindingLocation: Schema.Schema<GooglePrivacyDlpV2DataProfileFindingLocation> = Schema.suspend(() => Schema.Struct({
  containerName: Schema.optional(Schema.String),
  dataProfileFindingRecordLocation: Schema.optional(GooglePrivacyDlpV2DataProfileFindingRecordLocation),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileFindingLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileFindingLocation>;

export interface GooglePrivacyDlpV2DataProfileFinding {
  /** The content that was found. Even if the content is not textual, it may be converted to a textual representation here. If the finding exceeds 4096 bytes in length, the quote may be omitted. */
  quote?: string;
  /** The [type of content](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference) that might have been found. */
  infotype?: GooglePrivacyDlpV2InfoType;
  /** Contains data parsed from quotes. Currently supported infoTypes: DATE, DATE_OF_BIRTH, and TIME. */
  quoteInfo?: GooglePrivacyDlpV2QuoteInfo;
  /** Resource name of the data profile associated with the finding. */
  dataProfileResourceName?: string;
  /** A unique identifier for the finding. */
  findingId?: string;
  /** Timestamp when the finding was detected. */
  timestamp?: string;
  /** Where the content was found. */
  location?: GooglePrivacyDlpV2DataProfileFindingLocation;
  /** How broadly a resource has been shared. */
  resourceVisibility?: "RESOURCE_VISIBILITY_UNSPECIFIED" | "RESOURCE_VISIBILITY_PUBLIC" | "RESOURCE_VISIBILITY_INCONCLUSIVE" | "RESOURCE_VISIBILITY_RESTRICTED" | (string & {});
  /** The [full resource name](https://cloud.google.com/apis/design/resource_names#full_resource_name) of the resource profiled for this finding. */
  fullResourceName?: string;
  /** The type of the resource that was profiled. */
  dataSourceType?: GooglePrivacyDlpV2DataSourceType;
}

export const GooglePrivacyDlpV2DataProfileFinding: Schema.Schema<GooglePrivacyDlpV2DataProfileFinding> = Schema.suspend(() => Schema.Struct({
  quote: Schema.optional(Schema.String),
  infotype: Schema.optional(GooglePrivacyDlpV2InfoType),
  quoteInfo: Schema.optional(GooglePrivacyDlpV2QuoteInfo),
  dataProfileResourceName: Schema.optional(Schema.String),
  findingId: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  location: Schema.optional(GooglePrivacyDlpV2DataProfileFindingLocation),
  resourceVisibility: Schema.optional(Schema.String),
  fullResourceName: Schema.optional(Schema.String),
  dataSourceType: Schema.optional(GooglePrivacyDlpV2DataSourceType),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileFinding" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileFinding>;

export interface GooglePrivacyDlpV2DataProfilePubSubMessage {
  /** If `DetailLevel` is `TABLE_PROFILE` this will be fully populated. Otherwise, if `DetailLevel` is `RESOURCE_NAME`, then only `name` and `full_resource` will be populated. */
  profile?: GooglePrivacyDlpV2TableDataProfile;
  /** If `DetailLevel` is `FILE_STORE_PROFILE` this will be fully populated. Otherwise, if `DetailLevel` is `RESOURCE_NAME`, then only `name` and `file_store_path` will be populated. */
  fileStoreProfile?: GooglePrivacyDlpV2FileStoreDataProfile;
  /** The event that caused the Pub/Sub message to be sent. */
  event?: "EVENT_TYPE_UNSPECIFIED" | "NEW_PROFILE" | "CHANGED_PROFILE" | "SCORE_INCREASED" | "ERROR_CHANGED" | (string & {});
}

export const GooglePrivacyDlpV2DataProfilePubSubMessage: Schema.Schema<GooglePrivacyDlpV2DataProfilePubSubMessage> = Schema.suspend(() => Schema.Struct({
  profile: Schema.optional(GooglePrivacyDlpV2TableDataProfile),
  fileStoreProfile: Schema.optional(GooglePrivacyDlpV2FileStoreDataProfile),
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfilePubSubMessage" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfilePubSubMessage>;

export interface GooglePrivacyDlpV2DataProfileBigQueryRowSchema {
  /** Table data profile column */
  tableProfile?: GooglePrivacyDlpV2TableDataProfile;
  /** Column data profile column */
  columnProfile?: GooglePrivacyDlpV2ColumnDataProfile;
  /** File store data profile column. */
  fileStoreProfile?: GooglePrivacyDlpV2FileStoreDataProfile;
}

export const GooglePrivacyDlpV2DataProfileBigQueryRowSchema: Schema.Schema<GooglePrivacyDlpV2DataProfileBigQueryRowSchema> = Schema.suspend(() => Schema.Struct({
  tableProfile: Schema.optional(GooglePrivacyDlpV2TableDataProfile),
  columnProfile: Schema.optional(GooglePrivacyDlpV2ColumnDataProfile),
  fileStoreProfile: Schema.optional(GooglePrivacyDlpV2FileStoreDataProfile),
})).annotate({ identifier: "GooglePrivacyDlpV2DataProfileBigQueryRowSchema" }) as any as Schema.Schema<GooglePrivacyDlpV2DataProfileBigQueryRowSchema>;

export interface GooglePrivacyDlpV2TransformationDescription {
  /** The transformation type. */
  type?: "TRANSFORMATION_TYPE_UNSPECIFIED" | "RECORD_SUPPRESSION" | "REPLACE_VALUE" | "REPLACE_DICTIONARY" | "REDACT" | "CHARACTER_MASK" | "CRYPTO_REPLACE_FFX_FPE" | "FIXED_SIZE_BUCKETING" | "BUCKETING" | "REPLACE_WITH_INFO_TYPE" | "TIME_PART" | "CRYPTO_HASH" | "DATE_SHIFT" | "CRYPTO_DETERMINISTIC_CONFIG" | "REDACT_IMAGE" | (string & {});
  /** A description of the transformation. This is empty for a RECORD_SUPPRESSION, or is the output of calling toString() on the `PrimitiveTransformation` protocol buffer message for any other type of transformation. */
  description?: string;
  /** A human-readable string representation of the `RecordCondition` corresponding to this transformation. Set if a `RecordCondition` was used to determine whether or not to apply this transformation. Examples: * (age_field > 85) * (age_field <= 18) * (zip_field exists) * (zip_field == 01234) && (city_field != "Springville") * (zip_field == 01234) && (age_field <= 18) && (city_field exists) */
  condition?: string;
  /** Set if the transformation was limited to a specific `InfoType`. */
  infoType?: GooglePrivacyDlpV2InfoType;
}

export const GooglePrivacyDlpV2TransformationDescription: Schema.Schema<GooglePrivacyDlpV2TransformationDescription> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  infoType: Schema.optional(GooglePrivacyDlpV2InfoType),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationDescription" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationDescription>;

export interface GooglePrivacyDlpV2TransformationResultStatus {
  /** Transformation result status type, this will be either SUCCESS, or it will be the reason for why the transformation was not completely successful. */
  resultStatusType?: "STATE_TYPE_UNSPECIFIED" | "INVALID_TRANSFORM" | "BIGQUERY_MAX_ROW_SIZE_EXCEEDED" | "METADATA_UNRETRIEVABLE" | "SUCCESS" | (string & {});
  /** Detailed error codes and messages */
  details?: GoogleRpcStatus;
}

export const GooglePrivacyDlpV2TransformationResultStatus: Schema.Schema<GooglePrivacyDlpV2TransformationResultStatus> = Schema.suspend(() => Schema.Struct({
  resultStatusType: Schema.optional(Schema.String),
  details: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationResultStatus" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationResultStatus>;

export interface GooglePrivacyDlpV2RecordTransformation {
  /** For record transformations, provide a field. */
  fieldId?: GooglePrivacyDlpV2FieldId;
  /** Findings container modification timestamp, if applicable. */
  containerTimestamp?: string;
  /** Container version, if available ("generation" for Cloud Storage). */
  containerVersion?: string;
}

export const GooglePrivacyDlpV2RecordTransformation: Schema.Schema<GooglePrivacyDlpV2RecordTransformation> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(GooglePrivacyDlpV2FieldId),
  containerTimestamp: Schema.optional(Schema.String),
  containerVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2RecordTransformation" }) as any as Schema.Schema<GooglePrivacyDlpV2RecordTransformation>;

export interface GooglePrivacyDlpV2TransformationLocation {
  /** For infotype transformations, link to the corresponding findings ID so that location information does not need to be duplicated. Each findings ID correlates to an entry in the findings output table, this table only gets created when users specify to save findings (add the save findings action to the request). */
  findingId?: string;
  /** For record transformations, provide a field and container information. */
  recordTransformation?: GooglePrivacyDlpV2RecordTransformation;
  /** Information about the functionality of the container where this finding occurred, if available. */
  containerType?: "TRANSFORM_UNKNOWN_CONTAINER" | "TRANSFORM_BODY" | "TRANSFORM_METADATA" | "TRANSFORM_TABLE" | (string & {});
}

export const GooglePrivacyDlpV2TransformationLocation: Schema.Schema<GooglePrivacyDlpV2TransformationLocation> = Schema.suspend(() => Schema.Struct({
  findingId: Schema.optional(Schema.String),
  recordTransformation: Schema.optional(GooglePrivacyDlpV2RecordTransformation),
  containerType: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationLocation" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationLocation>;

export interface GooglePrivacyDlpV2TransformationDetails {
  /** The name of the job that completed the transformation. */
  resourceName?: string;
  /** The top level name of the container where the transformation is located (this will be the source file name or table name). */
  containerName?: string;
  /** Description of transformation. This would only contain more than one element if there were multiple matching transformations and which one to apply was ambiguous. Not set for states that contain no transformation, currently only state that contains no transformation is TransformationResultStateType.METADATA_UNRETRIEVABLE. */
  transformation?: Array<GooglePrivacyDlpV2TransformationDescription>;
  /** Status of the transformation, if transformation was not successful, this will specify what caused it to fail, otherwise it will show that the transformation was successful. */
  statusDetails?: GooglePrivacyDlpV2TransformationResultStatus;
  /** The number of bytes that were transformed. If transformation was unsuccessful or did not take place because there was no content to transform, this will be zero. */
  transformedBytes?: string;
  /** The precise location of the transformed content in the original container. */
  transformationLocation?: GooglePrivacyDlpV2TransformationLocation;
}

export const GooglePrivacyDlpV2TransformationDetails: Schema.Schema<GooglePrivacyDlpV2TransformationDetails> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  containerName: Schema.optional(Schema.String),
  transformation: Schema.optional(Schema.Array(GooglePrivacyDlpV2TransformationDescription)),
  statusDetails: Schema.optional(GooglePrivacyDlpV2TransformationResultStatus),
  transformedBytes: Schema.optional(Schema.String),
  transformationLocation: Schema.optional(GooglePrivacyDlpV2TransformationLocation),
})).annotate({ identifier: "GooglePrivacyDlpV2TransformationDetails" }) as any as Schema.Schema<GooglePrivacyDlpV2TransformationDetails>;

export interface GooglePrivacyDlpV2SaveToGcsFindingsOutput {
  /** List of findings. */
  findings?: Array<GooglePrivacyDlpV2Finding>;
}

export const GooglePrivacyDlpV2SaveToGcsFindingsOutput: Schema.Schema<GooglePrivacyDlpV2SaveToGcsFindingsOutput> = Schema.suspend(() => Schema.Struct({
  findings: Schema.optional(Schema.Array(GooglePrivacyDlpV2Finding)),
})).annotate({ identifier: "GooglePrivacyDlpV2SaveToGcsFindingsOutput" }) as any as Schema.Schema<GooglePrivacyDlpV2SaveToGcsFindingsOutput>;

export interface Proto2BridgeMessageSet {
}

export const Proto2BridgeMessageSet: Schema.Schema<Proto2BridgeMessageSet> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Proto2BridgeMessageSet" }) as any as Schema.Schema<Proto2BridgeMessageSet>;

export interface UtilStatusProto {
  /** Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; */
  code?: number;
  /** copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs */
  space?: string;
  /** Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; */
  message?: string;
  /** copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; */
  canonicalCode?: number;
  /** message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; */
  messageSet?: Proto2BridgeMessageSet;
}

export const UtilStatusProto: Schema.Schema<UtilStatusProto> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  space: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  canonicalCode: Schema.optional(Schema.Number),
  messageSet: Schema.optional(Proto2BridgeMessageSet),
})).annotate({ identifier: "UtilStatusProto" }) as any as Schema.Schema<UtilStatusProto>;

// ==========================================================================
// Operations
// ==========================================================================

/** Finds potentially sensitive info in content. This method has limits on input size, processing time, and output size. When no InfoTypes or CustomInfoTypes are specified in this request, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. For how to guides, see https://cloud.google.com/sensitive-data-protection/docs/inspecting-images and https://cloud.google.com/sensitive-data-protection/docs/inspecting-text, */
export interface InspectProjectsContentRequest {
  /** Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2InspectContentRequest;
}

export const InspectProjectsContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2InspectContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/content:inspect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InspectProjectsContentRequest>;

export type InspectProjectsContentResponse = GooglePrivacyDlpV2InspectContentResponse;
export const InspectProjectsContentResponse = GooglePrivacyDlpV2InspectContentResponse;

export type InspectProjectsContentError = CommonErrors;

export const inspectProjectsContent: API.OperationMethod<InspectProjectsContentRequest, InspectProjectsContentResponse, InspectProjectsContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InspectProjectsContentRequest,
  output: InspectProjectsContentResponse,
  errors: [],
}));

/** De-identifies potentially sensitive info from a ContentItem. This method has limits on input size and output size. See https://cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data to learn more. When no InfoTypes or CustomInfoTypes are specified in this request, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. */
export interface DeidentifyProjectsContentRequest {
  /** Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2DeidentifyContentRequest;
}

export const DeidentifyProjectsContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2DeidentifyContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/content:deidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeidentifyProjectsContentRequest>;

export type DeidentifyProjectsContentResponse = GooglePrivacyDlpV2DeidentifyContentResponse;
export const DeidentifyProjectsContentResponse = GooglePrivacyDlpV2DeidentifyContentResponse;

export type DeidentifyProjectsContentError = CommonErrors;

export const deidentifyProjectsContent: API.OperationMethod<DeidentifyProjectsContentRequest, DeidentifyProjectsContentResponse, DeidentifyProjectsContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeidentifyProjectsContentRequest,
  output: DeidentifyProjectsContentResponse,
  errors: [],
}));

/** Re-identifies content that has been de-identified. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization#re-identification_in_free_text_code_example to learn more. */
export interface ReidentifyProjectsContentRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2ReidentifyContentRequest;
}

export const ReidentifyProjectsContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2ReidentifyContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/content:reidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReidentifyProjectsContentRequest>;

export type ReidentifyProjectsContentResponse = GooglePrivacyDlpV2ReidentifyContentResponse;
export const ReidentifyProjectsContentResponse = GooglePrivacyDlpV2ReidentifyContentResponse;

export type ReidentifyProjectsContentError = CommonErrors;

export const reidentifyProjectsContent: API.OperationMethod<ReidentifyProjectsContentRequest, ReidentifyProjectsContentResponse, ReidentifyProjectsContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReidentifyProjectsContentRequest,
  output: ReidentifyProjectsContentResponse,
  errors: [],
}));

/** Finds potentially sensitive info in content. This method has limits on input size, processing time, and output size. When no InfoTypes or CustomInfoTypes are specified in this request, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. For how to guides, see https://cloud.google.com/sensitive-data-protection/docs/inspecting-images and https://cloud.google.com/sensitive-data-protection/docs/inspecting-text, */
export interface InspectProjectsLocationsContentRequest {
  /** Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2InspectContentRequest;
}

export const InspectProjectsLocationsContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2InspectContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/content:inspect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InspectProjectsLocationsContentRequest>;

export type InspectProjectsLocationsContentResponse = GooglePrivacyDlpV2InspectContentResponse;
export const InspectProjectsLocationsContentResponse = GooglePrivacyDlpV2InspectContentResponse;

export type InspectProjectsLocationsContentError = CommonErrors;

export const inspectProjectsLocationsContent: API.OperationMethod<InspectProjectsLocationsContentRequest, InspectProjectsLocationsContentResponse, InspectProjectsLocationsContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InspectProjectsLocationsContentRequest,
  output: InspectProjectsLocationsContentResponse,
  errors: [],
}));

/** De-identifies potentially sensitive info from a ContentItem. This method has limits on input size and output size. See https://cloud.google.com/sensitive-data-protection/docs/deidentify-sensitive-data to learn more. When no InfoTypes or CustomInfoTypes are specified in this request, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. */
export interface DeidentifyProjectsLocationsContentRequest {
  /** Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2DeidentifyContentRequest;
}

export const DeidentifyProjectsLocationsContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2DeidentifyContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/content:deidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeidentifyProjectsLocationsContentRequest>;

export type DeidentifyProjectsLocationsContentResponse = GooglePrivacyDlpV2DeidentifyContentResponse;
export const DeidentifyProjectsLocationsContentResponse = GooglePrivacyDlpV2DeidentifyContentResponse;

export type DeidentifyProjectsLocationsContentError = CommonErrors;

export const deidentifyProjectsLocationsContent: API.OperationMethod<DeidentifyProjectsLocationsContentRequest, DeidentifyProjectsLocationsContentResponse, DeidentifyProjectsLocationsContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeidentifyProjectsLocationsContentRequest,
  output: DeidentifyProjectsLocationsContentResponse,
  errors: [],
}));

/** Re-identifies content that has been de-identified. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization#re-identification_in_free_text_code_example to learn more. */
export interface ReidentifyProjectsLocationsContentRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2ReidentifyContentRequest;
}

export const ReidentifyProjectsLocationsContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2ReidentifyContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/content:reidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReidentifyProjectsLocationsContentRequest>;

export type ReidentifyProjectsLocationsContentResponse = GooglePrivacyDlpV2ReidentifyContentResponse;
export const ReidentifyProjectsLocationsContentResponse = GooglePrivacyDlpV2ReidentifyContentResponse;

export type ReidentifyProjectsLocationsContentError = CommonErrors;

export const reidentifyProjectsLocationsContent: API.OperationMethod<ReidentifyProjectsLocationsContentRequest, ReidentifyProjectsLocationsContentResponse, ReidentifyProjectsLocationsContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReidentifyProjectsLocationsContentRequest,
  output: ReidentifyProjectsLocationsContentResponse,
  errors: [],
}));

/** Redacts potentially sensitive info from an image. This method has limits on input size, processing time, and output size. See https://cloud.google.com/sensitive-data-protection/docs/redacting-sensitive-data-images to learn more. When no InfoTypes or CustomInfoTypes are specified in this request, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. Only the first frame of each multiframe image is redacted. Metadata and other frames are omitted in the response. */
export interface RedactProjectsLocationsImageRequest {
  /** Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2RedactImageRequest;
}

export const RedactProjectsLocationsImageRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2RedactImageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/image:redact", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RedactProjectsLocationsImageRequest>;

export type RedactProjectsLocationsImageResponse = GooglePrivacyDlpV2RedactImageResponse;
export const RedactProjectsLocationsImageResponse = GooglePrivacyDlpV2RedactImageResponse;

export type RedactProjectsLocationsImageError = CommonErrors;

export const redactProjectsLocationsImage: API.OperationMethod<RedactProjectsLocationsImageRequest, RedactProjectsLocationsImageResponse, RedactProjectsLocationsImageError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RedactProjectsLocationsImageRequest,
  output: RedactProjectsLocationsImageResponse,
  errors: [],
}));

/** Returns a list of the sensitive information types that the DLP API supports. See https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference to learn more. */
export interface ListProjectsLocationsInfoTypesRequest {
  /** The parent resource name. The format of this value is as follows: `locations/{location_id}` */
  parent: string;
  /** BCP-47 language code for localized infoType friendly names. If omitted, or if localized strings are not available, en-US strings will be returned. */
  languageCode?: string;
  /** filter to only return infoTypes supported by certain parts of the API. Defaults to supported_by=INSPECT. */
  filter?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsLocationsInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/infoTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInfoTypesRequest>;

export type ListProjectsLocationsInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;
export const ListProjectsLocationsInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;

export type ListProjectsLocationsInfoTypesError = CommonErrors;

export const listProjectsLocationsInfoTypes: API.OperationMethod<ListProjectsLocationsInfoTypesRequest, ListProjectsLocationsInfoTypesResponse, ListProjectsLocationsInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsInfoTypesRequest,
  output: ListProjectsLocationsInfoTypesResponse,
  errors: [],
}));

/** Creates an InspectTemplate for reusing frequently used configuration for inspecting content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface CreateProjectsLocationsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateInspectTemplateRequest;
}

export const CreateProjectsLocationsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/inspectTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInspectTemplatesRequest>;

export type CreateProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const CreateProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type CreateProjectsLocationsInspectTemplatesError = CommonErrors;

export const createProjectsLocationsInspectTemplates: API.OperationMethod<CreateProjectsLocationsInspectTemplatesRequest, CreateProjectsLocationsInspectTemplatesResponse, CreateProjectsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInspectTemplatesRequest,
  output: CreateProjectsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Updates the InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface PatchProjectsLocationsInspectTemplatesRequest {
  /** Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateInspectTemplateRequest;
}

export const PatchProjectsLocationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/inspectTemplates/{inspectTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInspectTemplatesRequest>;

export type PatchProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const PatchProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type PatchProjectsLocationsInspectTemplatesError = CommonErrors;

export const patchProjectsLocationsInspectTemplates: API.OperationMethod<PatchProjectsLocationsInspectTemplatesRequest, PatchProjectsLocationsInspectTemplatesResponse, PatchProjectsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInspectTemplatesRequest,
  output: PatchProjectsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Gets an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface GetProjectsLocationsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const GetProjectsLocationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInspectTemplatesRequest>;

export type GetProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const GetProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type GetProjectsLocationsInspectTemplatesError = CommonErrors;

export const getProjectsLocationsInspectTemplates: API.OperationMethod<GetProjectsLocationsInspectTemplatesRequest, GetProjectsLocationsInspectTemplatesResponse, GetProjectsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInspectTemplatesRequest,
  output: GetProjectsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Lists InspectTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface ListProjectsLocationsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListInspectTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsLocationsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/inspectTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInspectTemplatesRequest>;

export type ListProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;
export const ListProjectsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;

export type ListProjectsLocationsInspectTemplatesError = CommonErrors;

export const listProjectsLocationsInspectTemplates = API.makePaginated(() => ({
  input: ListProjectsLocationsInspectTemplatesRequest,
  output: ListProjectsLocationsInspectTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface DeleteProjectsLocationsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const DeleteProjectsLocationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInspectTemplatesRequest>;

export type DeleteProjectsLocationsInspectTemplatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsInspectTemplatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsInspectTemplatesError = CommonErrors;

export const deleteProjectsLocationsInspectTemplates: API.OperationMethod<DeleteProjectsLocationsInspectTemplatesRequest, DeleteProjectsLocationsInspectTemplatesResponse, DeleteProjectsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInspectTemplatesRequest,
  output: DeleteProjectsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Creates a DeidentifyTemplate for reusing frequently used configuration for de-identifying content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface CreateProjectsLocationsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest;
}

export const CreateProjectsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/deidentifyTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeidentifyTemplatesRequest>;

export type CreateProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const CreateProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type CreateProjectsLocationsDeidentifyTemplatesError = CommonErrors;

export const createProjectsLocationsDeidentifyTemplates: API.OperationMethod<CreateProjectsLocationsDeidentifyTemplatesRequest, CreateProjectsLocationsDeidentifyTemplatesResponse, CreateProjectsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeidentifyTemplatesRequest,
  output: CreateProjectsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Updates the DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface PatchProjectsLocationsDeidentifyTemplatesRequest {
  /** Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest;
}

export const PatchProjectsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/deidentifyTemplates/{deidentifyTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDeidentifyTemplatesRequest>;

export type PatchProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const PatchProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type PatchProjectsLocationsDeidentifyTemplatesError = CommonErrors;

export const patchProjectsLocationsDeidentifyTemplates: API.OperationMethod<PatchProjectsLocationsDeidentifyTemplatesRequest, PatchProjectsLocationsDeidentifyTemplatesResponse, PatchProjectsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDeidentifyTemplatesRequest,
  output: PatchProjectsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Gets a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface GetProjectsLocationsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const GetProjectsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeidentifyTemplatesRequest>;

export type GetProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const GetProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type GetProjectsLocationsDeidentifyTemplatesError = CommonErrors;

export const getProjectsLocationsDeidentifyTemplates: API.OperationMethod<GetProjectsLocationsDeidentifyTemplatesRequest, GetProjectsLocationsDeidentifyTemplatesResponse, GetProjectsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeidentifyTemplatesRequest,
  output: GetProjectsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Lists DeidentifyTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface ListProjectsLocationsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListDeidentifyTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/deidentifyTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeidentifyTemplatesRequest>;

export type ListProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;
export const ListProjectsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;

export type ListProjectsLocationsDeidentifyTemplatesError = CommonErrors;

export const listProjectsLocationsDeidentifyTemplates = API.makePaginated(() => ({
  input: ListProjectsLocationsDeidentifyTemplatesRequest,
  output: ListProjectsLocationsDeidentifyTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface DeleteProjectsLocationsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const DeleteProjectsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeidentifyTemplatesRequest>;

export type DeleteProjectsLocationsDeidentifyTemplatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDeidentifyTemplatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDeidentifyTemplatesError = CommonErrors;

export const deleteProjectsLocationsDeidentifyTemplates: API.OperationMethod<DeleteProjectsLocationsDeidentifyTemplatesRequest, DeleteProjectsLocationsDeidentifyTemplatesResponse, DeleteProjectsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeidentifyTemplatesRequest,
  output: DeleteProjectsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Creates a job trigger to run DLP actions such as scanning storage for sensitive information on a set schedule. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface CreateProjectsLocationsJobTriggersRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateJobTriggerRequest;
}

export const CreateProjectsLocationsJobTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsJobTriggersRequest>;

export type CreateProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const CreateProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type CreateProjectsLocationsJobTriggersError = CommonErrors;

export const createProjectsLocationsJobTriggers: API.OperationMethod<CreateProjectsLocationsJobTriggersRequest, CreateProjectsLocationsJobTriggersResponse, CreateProjectsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsJobTriggersRequest,
  output: CreateProjectsLocationsJobTriggersResponse,
  errors: [],
}));

/** Updates a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface PatchProjectsLocationsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateJobTriggerRequest;
}

export const PatchProjectsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsJobTriggersRequest>;

export type PatchProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const PatchProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type PatchProjectsLocationsJobTriggersError = CommonErrors;

export const patchProjectsLocationsJobTriggers: API.OperationMethod<PatchProjectsLocationsJobTriggersRequest, PatchProjectsLocationsJobTriggersResponse, PatchProjectsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsJobTriggersRequest,
  output: PatchProjectsLocationsJobTriggersResponse,
  errors: [],
}));

/** Inspect hybrid content and store findings to a trigger. The inspection will be processed asynchronously. To review the findings monitor the jobs within the trigger. */
export interface HybridInspectProjectsLocationsJobTriggersRequest {
  /** Required. Resource name of the trigger to execute a hybrid inspect on, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2HybridInspectJobTriggerRequest;
}

export const HybridInspectProjectsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2HybridInspectJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}:hybridInspect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<HybridInspectProjectsLocationsJobTriggersRequest>;

export type HybridInspectProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2HybridInspectResponse;
export const HybridInspectProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2HybridInspectResponse;

export type HybridInspectProjectsLocationsJobTriggersError = CommonErrors;

export const hybridInspectProjectsLocationsJobTriggers: API.OperationMethod<HybridInspectProjectsLocationsJobTriggersRequest, HybridInspectProjectsLocationsJobTriggersResponse, HybridInspectProjectsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: HybridInspectProjectsLocationsJobTriggersRequest,
  output: HybridInspectProjectsLocationsJobTriggersResponse,
  errors: [],
}));

/** Gets a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface GetProjectsLocationsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
}

export const GetProjectsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsJobTriggersRequest>;

export type GetProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const GetProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type GetProjectsLocationsJobTriggersError = CommonErrors;

export const getProjectsLocationsJobTriggers: API.OperationMethod<GetProjectsLocationsJobTriggersRequest, GetProjectsLocationsJobTriggersResponse, GetProjectsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsJobTriggersRequest,
  output: GetProjectsLocationsJobTriggersResponse,
  errors: [],
}));

/** Lists job triggers. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface ListProjectsLocationsJobTriggersRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to ListJobTriggers. `order_by` field must not change for subsequent calls. */
  pageToken?: string;
  /** Size of the page. This value can be limited by a server. */
  pageSize?: number;
  /** Comma-separated list of triggeredJob fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the JobTrigger was created. - `update_time`: corresponds to the time the JobTrigger was last updated. - `last_run_time`: corresponds to the last time the JobTrigger ran. - `name`: corresponds to the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's display name. - `status`: corresponds to JobTrigger's status. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` - RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds are ignored. - 'error_count' - Number of errors that have occurred while running. * The operator must be `=` or `!=` for status and inspected_storage. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND status = HEALTHY * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state = HEALTHY) * last_run_time > \"2017-12-12T00:00:00+00:00\" The length of this field should be no more than 500 characters. */
  filter?: string;
  /** The type of jobs. Will use `DlpJobType.INSPECT` if not set. */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsLocationsJobTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobTriggersRequest>;

export type ListProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2ListJobTriggersResponse;
export const ListProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2ListJobTriggersResponse;

export type ListProjectsLocationsJobTriggersError = CommonErrors;

export const listProjectsLocationsJobTriggers = API.makePaginated(() => ({
  input: ListProjectsLocationsJobTriggersRequest,
  output: ListProjectsLocationsJobTriggersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface DeleteProjectsLocationsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
}

export const DeleteProjectsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsJobTriggersRequest>;

export type DeleteProjectsLocationsJobTriggersResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsJobTriggersResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsJobTriggersError = CommonErrors;

export const deleteProjectsLocationsJobTriggers: API.OperationMethod<DeleteProjectsLocationsJobTriggersRequest, DeleteProjectsLocationsJobTriggersResponse, DeleteProjectsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsJobTriggersRequest,
  output: DeleteProjectsLocationsJobTriggersResponse,
  errors: [],
}));

/** Activate a job trigger. Causes the immediate execute of a trigger instead of waiting on the trigger event to occur. */
export interface ActivateProjectsLocationsJobTriggersRequest {
  /** Required. Resource name of the trigger to activate, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2ActivateJobTriggerRequest;
}

export const ActivateProjectsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2ActivateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateProjectsLocationsJobTriggersRequest>;

export type ActivateProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2DlpJob;
export const ActivateProjectsLocationsJobTriggersResponse = GooglePrivacyDlpV2DlpJob;

export type ActivateProjectsLocationsJobTriggersError = CommonErrors;

export const activateProjectsLocationsJobTriggers: API.OperationMethod<ActivateProjectsLocationsJobTriggersRequest, ActivateProjectsLocationsJobTriggersResponse, ActivateProjectsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateProjectsLocationsJobTriggersRequest,
  output: ActivateProjectsLocationsJobTriggersResponse,
  errors: [],
}));

/** Creates a config for discovery to scan and profile storage. */
export interface CreateProjectsLocationsDiscoveryConfigsRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization): + Projects scope: `projects/{project_id}/locations/{location_id}` + Organizations scope: `organizations/{org_id}/locations/{location_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDiscoveryConfigRequest;
}

export const CreateProjectsLocationsDiscoveryConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDiscoveryConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/discoveryConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDiscoveryConfigsRequest>;

export type CreateProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;
export const CreateProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;

export type CreateProjectsLocationsDiscoveryConfigsError = CommonErrors;

export const createProjectsLocationsDiscoveryConfigs: API.OperationMethod<CreateProjectsLocationsDiscoveryConfigsRequest, CreateProjectsLocationsDiscoveryConfigsResponse, CreateProjectsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDiscoveryConfigsRequest,
  output: CreateProjectsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Updates a discovery configuration. */
export interface PatchProjectsLocationsDiscoveryConfigsRequest {
  /** Required. Resource name of the project and the configuration, for example `projects/dlp-test-project/discoveryConfigs/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateDiscoveryConfigRequest;
}

export const PatchProjectsLocationsDiscoveryConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateDiscoveryConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/discoveryConfigs/{discoveryConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDiscoveryConfigsRequest>;

export type PatchProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;
export const PatchProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;

export type PatchProjectsLocationsDiscoveryConfigsError = CommonErrors;

export const patchProjectsLocationsDiscoveryConfigs: API.OperationMethod<PatchProjectsLocationsDiscoveryConfigsRequest, PatchProjectsLocationsDiscoveryConfigsResponse, PatchProjectsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDiscoveryConfigsRequest,
  output: PatchProjectsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Gets a discovery configuration. */
export interface GetProjectsLocationsDiscoveryConfigsRequest {
  /** Required. Resource name of the project and the configuration, for example `projects/dlp-test-project/discoveryConfigs/53234423`. */
  name: string;
}

export const GetProjectsLocationsDiscoveryConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/discoveryConfigs/{discoveryConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDiscoveryConfigsRequest>;

export type GetProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;
export const GetProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;

export type GetProjectsLocationsDiscoveryConfigsError = CommonErrors;

export const getProjectsLocationsDiscoveryConfigs: API.OperationMethod<GetProjectsLocationsDiscoveryConfigsRequest, GetProjectsLocationsDiscoveryConfigsResponse, GetProjectsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDiscoveryConfigsRequest,
  output: GetProjectsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Lists discovery configurations. */
export interface ListProjectsLocationsDiscoveryConfigsRequest {
  /** Required. Parent resource name. The format of this value is as follows: `projects/{project_id}/locations/{location_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to ListDiscoveryConfigs. `order_by` field must not change for subsequent calls. */
  pageToken?: string;
  /** Size of the page. This value can be limited by a server. */
  pageSize?: number;
  /** Comma-separated list of config fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `last_run_time`: corresponds to the last time the DiscoveryConfig ran. - `name`: corresponds to the DiscoveryConfig's name. - `status`: corresponds to DiscoveryConfig's status. */
  orderBy?: string;
}

export const ListProjectsLocationsDiscoveryConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/discoveryConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDiscoveryConfigsRequest>;

export type ListProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2ListDiscoveryConfigsResponse;
export const ListProjectsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2ListDiscoveryConfigsResponse;

export type ListProjectsLocationsDiscoveryConfigsError = CommonErrors;

export const listProjectsLocationsDiscoveryConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsDiscoveryConfigsRequest,
  output: ListProjectsLocationsDiscoveryConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a discovery configuration. */
export interface DeleteProjectsLocationsDiscoveryConfigsRequest {
  /** Required. Resource name of the project and the config, for example `projects/dlp-test-project/discoveryConfigs/53234423`. */
  name: string;
}

export const DeleteProjectsLocationsDiscoveryConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/discoveryConfigs/{discoveryConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDiscoveryConfigsRequest>;

export type DeleteProjectsLocationsDiscoveryConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDiscoveryConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDiscoveryConfigsError = CommonErrors;

export const deleteProjectsLocationsDiscoveryConfigs: API.OperationMethod<DeleteProjectsLocationsDiscoveryConfigsRequest, DeleteProjectsLocationsDiscoveryConfigsResponse, DeleteProjectsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDiscoveryConfigsRequest,
  output: DeleteProjectsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Creates a new job to inspect storage or calculate risk metrics. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. When no InfoTypes or CustomInfoTypes are specified in inspect jobs, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. */
export interface CreateProjectsLocationsDlpJobsRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDlpJobRequest;
}

export const CreateProjectsLocationsDlpJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDlpJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDlpJobsRequest>;

export type CreateProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;
export const CreateProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;

export type CreateProjectsLocationsDlpJobsError = CommonErrors;

export const createProjectsLocationsDlpJobs: API.OperationMethod<CreateProjectsLocationsDlpJobsRequest, CreateProjectsLocationsDlpJobsResponse, CreateProjectsLocationsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDlpJobsRequest,
  output: CreateProjectsLocationsDlpJobsResponse,
  errors: [],
}));

/** Lists DlpJobs that match the specified filter in the request. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface ListProjectsLocationsDlpJobsRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect jobs: - `state` - PENDING|RUNNING|CANCELED|FINISHED|FAILED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - `trigger_name` - The name of the trigger that created the job. - 'end_time` - Corresponds to the time the job finished. - 'start_time` - Corresponds to the time the job finished. * Supported fields for risk analysis jobs: - `state` - RUNNING|CANCELED|FINISHED|FAILED - 'end_time` - Corresponds to the time the job finished. - 'start_time` - Corresponds to the time the job finished. * The operator must be `=` or `!=`. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND state = done * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = done OR state = canceled) * end_time > \"2017-12-12T00:00:00+00:00\" The length of this field should be no more than 500 characters. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** The type of job. Defaults to `DlpJobType.INSPECT` */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, end_time asc, create_time desc` Supported fields are: - `create_time`: corresponds to the time the job was created. - `end_time`: corresponds to the time the job ended. - `name`: corresponds to the job's name. - `state`: corresponds to `state` */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsLocationsDlpJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDlpJobsRequest>;

export type ListProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2ListDlpJobsResponse;
export const ListProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2ListDlpJobsResponse;

export type ListProjectsLocationsDlpJobsError = CommonErrors;

export const listProjectsLocationsDlpJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsDlpJobsRequest,
  output: ListProjectsLocationsDlpJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running DlpJob. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface GetProjectsLocationsDlpJobsRequest {
  /** Required. The name of the DlpJob resource. */
  name: string;
}

export const GetProjectsLocationsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs/{dlpJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDlpJobsRequest>;

export type GetProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;
export const GetProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;

export type GetProjectsLocationsDlpJobsError = CommonErrors;

export const getProjectsLocationsDlpJobs: API.OperationMethod<GetProjectsLocationsDlpJobsRequest, GetProjectsLocationsDlpJobsResponse, GetProjectsLocationsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDlpJobsRequest,
  output: GetProjectsLocationsDlpJobsResponse,
  errors: [],
}));

/** Deletes a long-running DlpJob. This method indicates that the client is no longer interested in the DlpJob result. The job will be canceled if possible. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface DeleteProjectsLocationsDlpJobsRequest {
  /** Required. The name of the DlpJob resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs/{dlpJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDlpJobsRequest>;

export type DeleteProjectsLocationsDlpJobsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDlpJobsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDlpJobsError = CommonErrors;

export const deleteProjectsLocationsDlpJobs: API.OperationMethod<DeleteProjectsLocationsDlpJobsRequest, DeleteProjectsLocationsDlpJobsResponse, DeleteProjectsLocationsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDlpJobsRequest,
  output: DeleteProjectsLocationsDlpJobsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running DlpJob. The server makes a best effort to cancel the DlpJob, but success is not guaranteed. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface CancelProjectsLocationsDlpJobsRequest {
  /** Required. The name of the DlpJob resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CancelDlpJobRequest;
}

export const CancelProjectsLocationsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2CancelDlpJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs/{dlpJobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsDlpJobsRequest>;

export type CancelProjectsLocationsDlpJobsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsDlpJobsResponse = GoogleProtobufEmpty;

export type CancelProjectsLocationsDlpJobsError = CommonErrors;

export const cancelProjectsLocationsDlpJobs: API.OperationMethod<CancelProjectsLocationsDlpJobsRequest, CancelProjectsLocationsDlpJobsResponse, CancelProjectsLocationsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsDlpJobsRequest,
  output: CancelProjectsLocationsDlpJobsResponse,
  errors: [],
}));

/** Inspect hybrid content and store findings to a job. To review the findings, inspect the job. Inspection will occur asynchronously. */
export interface HybridInspectProjectsLocationsDlpJobsRequest {
  /** Required. Resource name of the job to execute a hybrid inspect on, for example `projects/dlp-test-project/dlpJob/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2HybridInspectDlpJobRequest;
}

export const HybridInspectProjectsLocationsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2HybridInspectDlpJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs/{dlpJobsId}:hybridInspect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<HybridInspectProjectsLocationsDlpJobsRequest>;

export type HybridInspectProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2HybridInspectResponse;
export const HybridInspectProjectsLocationsDlpJobsResponse = GooglePrivacyDlpV2HybridInspectResponse;

export type HybridInspectProjectsLocationsDlpJobsError = CommonErrors;

export const hybridInspectProjectsLocationsDlpJobs: API.OperationMethod<HybridInspectProjectsLocationsDlpJobsRequest, HybridInspectProjectsLocationsDlpJobsResponse, HybridInspectProjectsLocationsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: HybridInspectProjectsLocationsDlpJobsRequest,
  output: HybridInspectProjectsLocationsDlpJobsResponse,
  errors: [],
}));

/** Finish a running hybrid DlpJob. Triggers the finalization steps and running of any enabled actions that have not yet run. */
export interface FinishProjectsLocationsDlpJobsRequest {
  /** Required. The name of the DlpJob resource to be finished. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2FinishDlpJobRequest;
}

export const FinishProjectsLocationsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2FinishDlpJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/dlpJobs/{dlpJobsId}:finish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FinishProjectsLocationsDlpJobsRequest>;

export type FinishProjectsLocationsDlpJobsResponse = GoogleProtobufEmpty;
export const FinishProjectsLocationsDlpJobsResponse = GoogleProtobufEmpty;

export type FinishProjectsLocationsDlpJobsError = CommonErrors;

export const finishProjectsLocationsDlpJobs: API.OperationMethod<FinishProjectsLocationsDlpJobsRequest, FinishProjectsLocationsDlpJobsResponse, FinishProjectsLocationsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FinishProjectsLocationsDlpJobsRequest,
  output: FinishProjectsLocationsDlpJobsResponse,
  errors: [],
}));

/** Creates a pre-built stored infoType to be used for inspection. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface CreateProjectsLocationsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateStoredInfoTypeRequest;
}

export const CreateProjectsLocationsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/storedInfoTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsStoredInfoTypesRequest>;

export type CreateProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const CreateProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type CreateProjectsLocationsStoredInfoTypesError = CommonErrors;

export const createProjectsLocationsStoredInfoTypes: API.OperationMethod<CreateProjectsLocationsStoredInfoTypesRequest, CreateProjectsLocationsStoredInfoTypesResponse, CreateProjectsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsStoredInfoTypesRequest,
  output: CreateProjectsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Updates the stored infoType by creating a new version. The existing version will continue to be used until the new version is ready. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface PatchProjectsLocationsStoredInfoTypesRequest {
  /** Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest;
}

export const PatchProjectsLocationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/storedInfoTypes/{storedInfoTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsStoredInfoTypesRequest>;

export type PatchProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const PatchProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type PatchProjectsLocationsStoredInfoTypesError = CommonErrors;

export const patchProjectsLocationsStoredInfoTypes: API.OperationMethod<PatchProjectsLocationsStoredInfoTypesRequest, PatchProjectsLocationsStoredInfoTypesResponse, PatchProjectsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsStoredInfoTypesRequest,
  output: PatchProjectsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Gets a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface GetProjectsLocationsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const GetProjectsLocationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsStoredInfoTypesRequest>;

export type GetProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const GetProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type GetProjectsLocationsStoredInfoTypesError = CommonErrors;

export const getProjectsLocationsStoredInfoTypes: API.OperationMethod<GetProjectsLocationsStoredInfoTypesRequest, GetProjectsLocationsStoredInfoTypesResponse, GetProjectsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsStoredInfoTypesRequest,
  output: GetProjectsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Lists stored infoTypes. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface ListProjectsLocationsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListStoredInfoTypes`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, display_name, create_time desc` Supported fields are: - `create_time`: corresponds to the time the most recent version of the resource was created. - `state`: corresponds to the state of the resource. - `name`: corresponds to resource name. - `display_name`: corresponds to info type's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsLocationsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/storedInfoTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsStoredInfoTypesRequest>;

export type ListProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;
export const ListProjectsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;

export type ListProjectsLocationsStoredInfoTypesError = CommonErrors;

export const listProjectsLocationsStoredInfoTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsStoredInfoTypesRequest,
  output: ListProjectsLocationsStoredInfoTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface DeleteProjectsLocationsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const DeleteProjectsLocationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsStoredInfoTypesRequest>;

export type DeleteProjectsLocationsStoredInfoTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsStoredInfoTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsStoredInfoTypesError = CommonErrors;

export const deleteProjectsLocationsStoredInfoTypes: API.OperationMethod<DeleteProjectsLocationsStoredInfoTypesRequest, DeleteProjectsLocationsStoredInfoTypesResponse, DeleteProjectsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsStoredInfoTypesRequest,
  output: DeleteProjectsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Lists project data profiles for an organization. */
export interface ListProjectsLocationsProjectDataProfilesRequest {
  /** Required. organizations/{org_id}/locations/{loc_id} */
  parent: string;
  /** Page token to continue retrieval. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id` * `sensitivity_level desc` Supported fields: - `project_id`: Google Cloud project ID - `sensitivity_level`: How sensitive the data in a project is, at most - `data_risk_level`: How much risk is associated with this data - `profile_last_generated`: Date and time (in epoch seconds) the profile was last generated */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: the Google Cloud project ID - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListProjectsLocationsProjectDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/projectDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProjectDataProfilesRequest>;

export type ListProjectsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ListProjectDataProfilesResponse;
export const ListProjectsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ListProjectDataProfilesResponse;

export type ListProjectsLocationsProjectDataProfilesError = CommonErrors;

export const listProjectsLocationsProjectDataProfiles = API.makePaginated(() => ({
  input: ListProjectsLocationsProjectDataProfilesRequest,
  output: ListProjectsLocationsProjectDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a project data profile. */
export interface GetProjectsLocationsProjectDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/projectDataProfiles/53234423`. */
  name: string;
}

export const GetProjectsLocationsProjectDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/projectDataProfiles/{projectDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProjectDataProfilesRequest>;

export type GetProjectsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ProjectDataProfile;
export const GetProjectsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ProjectDataProfile;

export type GetProjectsLocationsProjectDataProfilesError = CommonErrors;

export const getProjectsLocationsProjectDataProfiles: API.OperationMethod<GetProjectsLocationsProjectDataProfilesRequest, GetProjectsLocationsProjectDataProfilesResponse, GetProjectsLocationsProjectDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProjectDataProfilesRequest,
  output: GetProjectsLocationsProjectDataProfilesResponse,
  errors: [],
}));

/** Lists table data profiles for an organization. */
export interface ListProjectsLocationsTableDataProfilesRequest {
  /** Required. Resource name of the organization or project, for example `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Page token to continue retrieval. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `table_id` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `dataset_id`: The ID of a BigQuery dataset. - `table_id`: The ID of a BigQuery table. - `sensitivity_level`: How sensitive the data in a table is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. - `last_modified`: The last time the resource was modified. - `resource_visibility`: Visibility restriction for this resource. - `row_count`: Number of rows in this resource. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: The Google Cloud project ID - `dataset_id`: The BigQuery dataset ID - `table_id`: The ID of the BigQuery table - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `resource_visibility`: PUBLIC|RESTRICTED - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `project_id = 12345 AND resource_visibility = PUBLIC` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListProjectsLocationsTableDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/tableDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTableDataProfilesRequest>;

export type ListProjectsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2ListTableDataProfilesResponse;
export const ListProjectsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2ListTableDataProfilesResponse;

export type ListProjectsLocationsTableDataProfilesError = CommonErrors;

export const listProjectsLocationsTableDataProfiles = API.makePaginated(() => ({
  input: ListProjectsLocationsTableDataProfilesRequest,
  output: ListProjectsLocationsTableDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a table data profile. */
export interface GetProjectsLocationsTableDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/tableDataProfiles/53234423`. */
  name: string;
}

export const GetProjectsLocationsTableDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/tableDataProfiles/{tableDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTableDataProfilesRequest>;

export type GetProjectsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2TableDataProfile;
export const GetProjectsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2TableDataProfile;

export type GetProjectsLocationsTableDataProfilesError = CommonErrors;

export const getProjectsLocationsTableDataProfiles: API.OperationMethod<GetProjectsLocationsTableDataProfilesRequest, GetProjectsLocationsTableDataProfilesResponse, GetProjectsLocationsTableDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTableDataProfilesRequest,
  output: GetProjectsLocationsTableDataProfilesResponse,
  errors: [],
}));

/** Delete a TableDataProfile. Will not prevent the profile from being regenerated if the table is still included in a discovery configuration. */
export interface DeleteProjectsLocationsTableDataProfilesRequest {
  /** Required. Resource name of the table data profile. */
  name: string;
}

export const DeleteProjectsLocationsTableDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/tableDataProfiles/{tableDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTableDataProfilesRequest>;

export type DeleteProjectsLocationsTableDataProfilesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsTableDataProfilesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsTableDataProfilesError = CommonErrors;

export const deleteProjectsLocationsTableDataProfiles: API.OperationMethod<DeleteProjectsLocationsTableDataProfilesRequest, DeleteProjectsLocationsTableDataProfilesResponse, DeleteProjectsLocationsTableDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTableDataProfilesRequest,
  output: DeleteProjectsLocationsTableDataProfilesResponse,
  errors: [],
}));

/** Lists column data profiles for an organization. */
export interface ListProjectsLocationsColumnDataProfilesRequest {
  /** Required. Resource name of the organization or project, for example `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Page token to continue retrieval. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `table_id` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `dataset_id`: The ID of a BigQuery dataset. - `table_id`: The ID of a BigQuery table. - `sensitivity_level`: How sensitive the data in a column is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `table_data_profile_name`: The name of the related table data profile - `project_id`: The Google Cloud project ID (REQUIRED) - `dataset_id`: The BigQuery dataset ID (REQUIRED) - `table_id`: The BigQuery table ID (REQUIRED) - `field_id`: The ID of the BigQuery field - `info_type`: The infotype detected in the resource - `sensitivity_level`: HIGH|MEDIUM|LOW - `data_risk_level`: How much risk is associated with this data - `status_code`: An RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` for project_id, dataset_id, and table_id. Other filters also support `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * project_id = 12345 AND status_code = 1 * project_id = 12345 AND sensitivity_level = HIGH * project_id = 12345 AND info_type = STREET_ADDRESS * profile_last_generated < "2025-01-01T00:00:00.000Z" The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListProjectsLocationsColumnDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/columnDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsColumnDataProfilesRequest>;

export type ListProjectsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ListColumnDataProfilesResponse;
export const ListProjectsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ListColumnDataProfilesResponse;

export type ListProjectsLocationsColumnDataProfilesError = CommonErrors;

export const listProjectsLocationsColumnDataProfiles = API.makePaginated(() => ({
  input: ListProjectsLocationsColumnDataProfilesRequest,
  output: ListProjectsLocationsColumnDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a column data profile. */
export interface GetProjectsLocationsColumnDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/columnDataProfiles/53234423`. */
  name: string;
}

export const GetProjectsLocationsColumnDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/columnDataProfiles/{columnDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsColumnDataProfilesRequest>;

export type GetProjectsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ColumnDataProfile;
export const GetProjectsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ColumnDataProfile;

export type GetProjectsLocationsColumnDataProfilesError = CommonErrors;

export const getProjectsLocationsColumnDataProfiles: API.OperationMethod<GetProjectsLocationsColumnDataProfilesRequest, GetProjectsLocationsColumnDataProfilesResponse, GetProjectsLocationsColumnDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsColumnDataProfilesRequest,
  output: GetProjectsLocationsColumnDataProfilesResponse,
  errors: [],
}));

/** Lists file store data profiles for an organization. */
export interface ListProjectsLocationsFileStoreDataProfilesRequest {
  /** Required. Resource name of the organization or project, for example `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Optional. Page token to continue retrieval. */
  pageToken?: string;
  /** Optional. Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Optional. Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `name` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `sensitivity_level`: How sensitive the data in a table is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. - `last_modified`: The last time the resource was modified. - `resource_visibility`: Visibility restriction for this resource. - `name`: The name of the profile. - `create_time`: The time the file store was first created. */
  orderBy?: string;
  /** Optional. Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: The Google Cloud project ID - `account_id`: The AWS account ID - `file_store_path`: The path like "gs://bucket" - `data_source_type`: The profile's data source type, like "google/storage/bucket" - `data_storage_location`: The location where the file store's data is stored, like "us-central1" - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `resource_visibility`: PUBLIC|RESTRICTED - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `project_id = 12345 AND resource_visibility = PUBLIC` * `file_store_path = "gs://mybucket"` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListProjectsLocationsFileStoreDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/fileStoreDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsFileStoreDataProfilesRequest>;

export type ListProjectsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2ListFileStoreDataProfilesResponse;
export const ListProjectsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2ListFileStoreDataProfilesResponse;

export type ListProjectsLocationsFileStoreDataProfilesError = CommonErrors;

export const listProjectsLocationsFileStoreDataProfiles = API.makePaginated(() => ({
  input: ListProjectsLocationsFileStoreDataProfilesRequest,
  output: ListProjectsLocationsFileStoreDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a file store data profile. */
export interface GetProjectsLocationsFileStoreDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/fileStoreDataProfiles/53234423`. */
  name: string;
}

export const GetProjectsLocationsFileStoreDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/fileStoreDataProfiles/{fileStoreDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsFileStoreDataProfilesRequest>;

export type GetProjectsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2FileStoreDataProfile;
export const GetProjectsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2FileStoreDataProfile;

export type GetProjectsLocationsFileStoreDataProfilesError = CommonErrors;

export const getProjectsLocationsFileStoreDataProfiles: API.OperationMethod<GetProjectsLocationsFileStoreDataProfilesRequest, GetProjectsLocationsFileStoreDataProfilesResponse, GetProjectsLocationsFileStoreDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsFileStoreDataProfilesRequest,
  output: GetProjectsLocationsFileStoreDataProfilesResponse,
  errors: [],
}));

/** Delete a FileStoreDataProfile. Will not prevent the profile from being regenerated if the resource is still included in a discovery configuration. */
export interface DeleteProjectsLocationsFileStoreDataProfilesRequest {
  /** Required. Resource name of the file store data profile. */
  name: string;
}

export const DeleteProjectsLocationsFileStoreDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/fileStoreDataProfiles/{fileStoreDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsFileStoreDataProfilesRequest>;

export type DeleteProjectsLocationsFileStoreDataProfilesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsFileStoreDataProfilesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsFileStoreDataProfilesError = CommonErrors;

export const deleteProjectsLocationsFileStoreDataProfiles: API.OperationMethod<DeleteProjectsLocationsFileStoreDataProfilesRequest, DeleteProjectsLocationsFileStoreDataProfilesResponse, DeleteProjectsLocationsFileStoreDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsFileStoreDataProfilesRequest,
  output: DeleteProjectsLocationsFileStoreDataProfilesResponse,
  errors: [],
}));

/** Create a Connection to an external data source. */
export interface CreateProjectsLocationsConnectionsRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization): + Projects scope: `projects/{project_id}/locations/{location_id}` + Organizations scope: `organizations/{org_id}/locations/{location_id}` */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateConnectionRequest;
}

export const CreateProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateConnectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionsRequest>;

export type CreateProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;
export const CreateProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;

export type CreateProjectsLocationsConnectionsError = CommonErrors;

export const createProjectsLocationsConnections: API.OperationMethod<CreateProjectsLocationsConnectionsRequest, CreateProjectsLocationsConnectionsResponse, CreateProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionsRequest,
  output: CreateProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Get a Connection by name. */
export interface GetProjectsLocationsConnectionsRequest {
  /** Required. Resource name in the format: `projects/{project}/locations/{location}/connections/{connection}`. */
  name: string;
}

export const GetProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsRequest>;

export type GetProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;
export const GetProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;

export type GetProjectsLocationsConnectionsError = CommonErrors;

export const getProjectsLocationsConnections: API.OperationMethod<GetProjectsLocationsConnectionsRequest, GetProjectsLocationsConnectionsResponse, GetProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsRequest,
  output: GetProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Lists Connections in a parent. Use SearchConnections to see all connections within an organization. */
export interface ListProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the organization or project, for example, `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Optional. Number of results per page, max 1000. */
  pageSize?: number;
  /** Optional. Page token from a previous page to return the next set of results. If set, all other request fields must match the original request. */
  pageToken?: string;
  /** Optional. Supported field/value: `state` - MISSING|AVAILABLE|ERROR The syntax is based on https://google.aip.dev/160. */
  filter?: string;
}

export const ListProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsRequest>;

export type ListProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2ListConnectionsResponse;
export const ListProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2ListConnectionsResponse;

export type ListProjectsLocationsConnectionsError = CommonErrors;

export const listProjectsLocationsConnections = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsRequest,
  output: ListProjectsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Searches for Connections in a parent. */
export interface SearchProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the organization or project with a wildcard location, for example, `organizations/433245324/locations/-` or `projects/project-id/locations/-`. */
  parent: string;
  /** Optional. Number of results per page, max 1000. */
  pageSize?: number;
  /** Optional. Page token from a previous page to return the next set of results. If set, all other request fields must match the original request. */
  pageToken?: string;
  /** Optional. Supported field/value: - `state` - MISSING|AVAILABLE|ERROR The syntax is based on https://google.aip.dev/160. */
  filter?: string;
}

export const SearchProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsConnectionsRequest>;

export type SearchProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2SearchConnectionsResponse;
export const SearchProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2SearchConnectionsResponse;

export type SearchProjectsLocationsConnectionsError = CommonErrors;

export const searchProjectsLocationsConnections = API.makePaginated(() => ({
  input: SearchProjectsLocationsConnectionsRequest,
  output: SearchProjectsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Delete a Connection. */
export interface DeleteProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the Connection to be deleted, in the format: `projects/{project}/locations/{location}/connections/{connection}`. */
  name: string;
}

export const DeleteProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionsRequest>;

export type DeleteProjectsLocationsConnectionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsConnectionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsConnectionsError = CommonErrors;

export const deleteProjectsLocationsConnections: API.OperationMethod<DeleteProjectsLocationsConnectionsRequest, DeleteProjectsLocationsConnectionsResponse, DeleteProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionsRequest,
  output: DeleteProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Update a Connection. */
export interface PatchProjectsLocationsConnectionsRequest {
  /** Required. Resource name in the format: `projects/{project}/locations/{location}/connections/{connection}`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateConnectionRequest;
}

export const PatchProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateConnectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectionsRequest>;

export type PatchProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;
export const PatchProjectsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;

export type PatchProjectsLocationsConnectionsError = CommonErrors;

export const patchProjectsLocationsConnections: API.OperationMethod<PatchProjectsLocationsConnectionsRequest, PatchProjectsLocationsConnectionsResponse, PatchProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectionsRequest,
  output: PatchProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Redacts potentially sensitive info from an image. This method has limits on input size, processing time, and output size. See https://cloud.google.com/sensitive-data-protection/docs/redacting-sensitive-data-images to learn more. When no InfoTypes or CustomInfoTypes are specified in this request, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. Only the first frame of each multiframe image is redacted. Metadata and other frames are omitted in the response. */
export interface RedactProjectsImageRequest {
  /** Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2RedactImageRequest;
}

export const RedactProjectsImageRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2RedactImageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/image:redact", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RedactProjectsImageRequest>;

export type RedactProjectsImageResponse = GooglePrivacyDlpV2RedactImageResponse;
export const RedactProjectsImageResponse = GooglePrivacyDlpV2RedactImageResponse;

export type RedactProjectsImageError = CommonErrors;

export const redactProjectsImage: API.OperationMethod<RedactProjectsImageRequest, RedactProjectsImageResponse, RedactProjectsImageError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RedactProjectsImageRequest,
  output: RedactProjectsImageResponse,
  errors: [],
}));

/** Creates an InspectTemplate for reusing frequently used configuration for inspecting content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface CreateProjectsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateInspectTemplateRequest;
}

export const CreateProjectsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/inspectTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInspectTemplatesRequest>;

export type CreateProjectsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const CreateProjectsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type CreateProjectsInspectTemplatesError = CommonErrors;

export const createProjectsInspectTemplates: API.OperationMethod<CreateProjectsInspectTemplatesRequest, CreateProjectsInspectTemplatesResponse, CreateProjectsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInspectTemplatesRequest,
  output: CreateProjectsInspectTemplatesResponse,
  errors: [],
}));

/** Updates the InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface PatchProjectsInspectTemplatesRequest {
  /** Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateInspectTemplateRequest;
}

export const PatchProjectsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/inspectTemplates/{inspectTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInspectTemplatesRequest>;

export type PatchProjectsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const PatchProjectsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type PatchProjectsInspectTemplatesError = CommonErrors;

export const patchProjectsInspectTemplates: API.OperationMethod<PatchProjectsInspectTemplatesRequest, PatchProjectsInspectTemplatesResponse, PatchProjectsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInspectTemplatesRequest,
  output: PatchProjectsInspectTemplatesResponse,
  errors: [],
}));

/** Gets an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface GetProjectsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const GetProjectsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInspectTemplatesRequest>;

export type GetProjectsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const GetProjectsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type GetProjectsInspectTemplatesError = CommonErrors;

export const getProjectsInspectTemplates: API.OperationMethod<GetProjectsInspectTemplatesRequest, GetProjectsInspectTemplatesResponse, GetProjectsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInspectTemplatesRequest,
  output: GetProjectsInspectTemplatesResponse,
  errors: [],
}));

/** Lists InspectTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface ListProjectsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListInspectTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/inspectTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInspectTemplatesRequest>;

export type ListProjectsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;
export const ListProjectsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;

export type ListProjectsInspectTemplatesError = CommonErrors;

export const listProjectsInspectTemplates = API.makePaginated(() => ({
  input: ListProjectsInspectTemplatesRequest,
  output: ListProjectsInspectTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface DeleteProjectsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const DeleteProjectsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInspectTemplatesRequest>;

export type DeleteProjectsInspectTemplatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsInspectTemplatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsInspectTemplatesError = CommonErrors;

export const deleteProjectsInspectTemplates: API.OperationMethod<DeleteProjectsInspectTemplatesRequest, DeleteProjectsInspectTemplatesResponse, DeleteProjectsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInspectTemplatesRequest,
  output: DeleteProjectsInspectTemplatesResponse,
  errors: [],
}));

/** Creates a DeidentifyTemplate for reusing frequently used configuration for de-identifying content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface CreateProjectsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest;
}

export const CreateProjectsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/deidentifyTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDeidentifyTemplatesRequest>;

export type CreateProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const CreateProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type CreateProjectsDeidentifyTemplatesError = CommonErrors;

export const createProjectsDeidentifyTemplates: API.OperationMethod<CreateProjectsDeidentifyTemplatesRequest, CreateProjectsDeidentifyTemplatesResponse, CreateProjectsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDeidentifyTemplatesRequest,
  output: CreateProjectsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Updates the DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface PatchProjectsDeidentifyTemplatesRequest {
  /** Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest;
}

export const PatchProjectsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/deidentifyTemplates/{deidentifyTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDeidentifyTemplatesRequest>;

export type PatchProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const PatchProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type PatchProjectsDeidentifyTemplatesError = CommonErrors;

export const patchProjectsDeidentifyTemplates: API.OperationMethod<PatchProjectsDeidentifyTemplatesRequest, PatchProjectsDeidentifyTemplatesResponse, PatchProjectsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsDeidentifyTemplatesRequest,
  output: PatchProjectsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Gets a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface GetProjectsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const GetProjectsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDeidentifyTemplatesRequest>;

export type GetProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const GetProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type GetProjectsDeidentifyTemplatesError = CommonErrors;

export const getProjectsDeidentifyTemplates: API.OperationMethod<GetProjectsDeidentifyTemplatesRequest, GetProjectsDeidentifyTemplatesResponse, GetProjectsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDeidentifyTemplatesRequest,
  output: GetProjectsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Lists DeidentifyTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface ListProjectsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListDeidentifyTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/deidentifyTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDeidentifyTemplatesRequest>;

export type ListProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;
export const ListProjectsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;

export type ListProjectsDeidentifyTemplatesError = CommonErrors;

export const listProjectsDeidentifyTemplates = API.makePaginated(() => ({
  input: ListProjectsDeidentifyTemplatesRequest,
  output: ListProjectsDeidentifyTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface DeleteProjectsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const DeleteProjectsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDeidentifyTemplatesRequest>;

export type DeleteProjectsDeidentifyTemplatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsDeidentifyTemplatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsDeidentifyTemplatesError = CommonErrors;

export const deleteProjectsDeidentifyTemplates: API.OperationMethod<DeleteProjectsDeidentifyTemplatesRequest, DeleteProjectsDeidentifyTemplatesResponse, DeleteProjectsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDeidentifyTemplatesRequest,
  output: DeleteProjectsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Creates a job trigger to run DLP actions such as scanning storage for sensitive information on a set schedule. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface CreateProjectsJobTriggersRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateJobTriggerRequest;
}

export const CreateProjectsJobTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/jobTriggers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsJobTriggersRequest>;

export type CreateProjectsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const CreateProjectsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type CreateProjectsJobTriggersError = CommonErrors;

export const createProjectsJobTriggers: API.OperationMethod<CreateProjectsJobTriggersRequest, CreateProjectsJobTriggersResponse, CreateProjectsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsJobTriggersRequest,
  output: CreateProjectsJobTriggersResponse,
  errors: [],
}));

/** Updates a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface PatchProjectsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateJobTriggerRequest;
}

export const PatchProjectsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/jobTriggers/{jobTriggersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsJobTriggersRequest>;

export type PatchProjectsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const PatchProjectsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type PatchProjectsJobTriggersError = CommonErrors;

export const patchProjectsJobTriggers: API.OperationMethod<PatchProjectsJobTriggersRequest, PatchProjectsJobTriggersResponse, PatchProjectsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsJobTriggersRequest,
  output: PatchProjectsJobTriggersResponse,
  errors: [],
}));

/** Gets a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface GetProjectsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
}

export const GetProjectsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/jobTriggers/{jobTriggersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsJobTriggersRequest>;

export type GetProjectsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const GetProjectsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type GetProjectsJobTriggersError = CommonErrors;

export const getProjectsJobTriggers: API.OperationMethod<GetProjectsJobTriggersRequest, GetProjectsJobTriggersResponse, GetProjectsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsJobTriggersRequest,
  output: GetProjectsJobTriggersResponse,
  errors: [],
}));

/** Lists job triggers. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface ListProjectsJobTriggersRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to ListJobTriggers. `order_by` field must not change for subsequent calls. */
  pageToken?: string;
  /** Size of the page. This value can be limited by a server. */
  pageSize?: number;
  /** Comma-separated list of triggeredJob fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the JobTrigger was created. - `update_time`: corresponds to the time the JobTrigger was last updated. - `last_run_time`: corresponds to the last time the JobTrigger ran. - `name`: corresponds to the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's display name. - `status`: corresponds to JobTrigger's status. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` - RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds are ignored. - 'error_count' - Number of errors that have occurred while running. * The operator must be `=` or `!=` for status and inspected_storage. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND status = HEALTHY * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state = HEALTHY) * last_run_time > \"2017-12-12T00:00:00+00:00\" The length of this field should be no more than 500 characters. */
  filter?: string;
  /** The type of jobs. Will use `DlpJobType.INSPECT` if not set. */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsJobTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/jobTriggers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsJobTriggersRequest>;

export type ListProjectsJobTriggersResponse = GooglePrivacyDlpV2ListJobTriggersResponse;
export const ListProjectsJobTriggersResponse = GooglePrivacyDlpV2ListJobTriggersResponse;

export type ListProjectsJobTriggersError = CommonErrors;

export const listProjectsJobTriggers = API.makePaginated(() => ({
  input: ListProjectsJobTriggersRequest,
  output: ListProjectsJobTriggersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface DeleteProjectsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
}

export const DeleteProjectsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/jobTriggers/{jobTriggersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsJobTriggersRequest>;

export type DeleteProjectsJobTriggersResponse = GoogleProtobufEmpty;
export const DeleteProjectsJobTriggersResponse = GoogleProtobufEmpty;

export type DeleteProjectsJobTriggersError = CommonErrors;

export const deleteProjectsJobTriggers: API.OperationMethod<DeleteProjectsJobTriggersRequest, DeleteProjectsJobTriggersResponse, DeleteProjectsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsJobTriggersRequest,
  output: DeleteProjectsJobTriggersResponse,
  errors: [],
}));

/** Activate a job trigger. Causes the immediate execute of a trigger instead of waiting on the trigger event to occur. */
export interface ActivateProjectsJobTriggersRequest {
  /** Required. Resource name of the trigger to activate, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2ActivateJobTriggerRequest;
}

export const ActivateProjectsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2ActivateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/jobTriggers/{jobTriggersId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateProjectsJobTriggersRequest>;

export type ActivateProjectsJobTriggersResponse = GooglePrivacyDlpV2DlpJob;
export const ActivateProjectsJobTriggersResponse = GooglePrivacyDlpV2DlpJob;

export type ActivateProjectsJobTriggersError = CommonErrors;

export const activateProjectsJobTriggers: API.OperationMethod<ActivateProjectsJobTriggersRequest, ActivateProjectsJobTriggersResponse, ActivateProjectsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateProjectsJobTriggersRequest,
  output: ActivateProjectsJobTriggersResponse,
  errors: [],
}));

/** Creates a new job to inspect storage or calculate risk metrics. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. When no InfoTypes or CustomInfoTypes are specified in inspect jobs, the system will automatically choose what detectors to run. By default this may be all types, but may change over time as detectors are updated. */
export interface CreateProjectsDlpJobsRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDlpJobRequest;
}

export const CreateProjectsDlpJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDlpJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/dlpJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDlpJobsRequest>;

export type CreateProjectsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;
export const CreateProjectsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;

export type CreateProjectsDlpJobsError = CommonErrors;

export const createProjectsDlpJobs: API.OperationMethod<CreateProjectsDlpJobsRequest, CreateProjectsDlpJobsResponse, CreateProjectsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDlpJobsRequest,
  output: CreateProjectsDlpJobsResponse,
  errors: [],
}));

/** Lists DlpJobs that match the specified filter in the request. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface ListProjectsDlpJobsRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect jobs: - `state` - PENDING|RUNNING|CANCELED|FINISHED|FAILED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - `trigger_name` - The name of the trigger that created the job. - 'end_time` - Corresponds to the time the job finished. - 'start_time` - Corresponds to the time the job finished. * Supported fields for risk analysis jobs: - `state` - RUNNING|CANCELED|FINISHED|FAILED - 'end_time` - Corresponds to the time the job finished. - 'start_time` - Corresponds to the time the job finished. * The operator must be `=` or `!=`. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND state = done * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = done OR state = canceled) * end_time > \"2017-12-12T00:00:00+00:00\" The length of this field should be no more than 500 characters. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** The type of job. Defaults to `DlpJobType.INSPECT` */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, end_time asc, create_time desc` Supported fields are: - `create_time`: corresponds to the time the job was created. - `end_time`: corresponds to the time the job ended. - `name`: corresponds to the job's name. - `state`: corresponds to `state` */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsDlpJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/dlpJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDlpJobsRequest>;

export type ListProjectsDlpJobsResponse = GooglePrivacyDlpV2ListDlpJobsResponse;
export const ListProjectsDlpJobsResponse = GooglePrivacyDlpV2ListDlpJobsResponse;

export type ListProjectsDlpJobsError = CommonErrors;

export const listProjectsDlpJobs = API.makePaginated(() => ({
  input: ListProjectsDlpJobsRequest,
  output: ListProjectsDlpJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running DlpJob. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface GetProjectsDlpJobsRequest {
  /** Required. The name of the DlpJob resource. */
  name: string;
}

export const GetProjectsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/dlpJobs/{dlpJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDlpJobsRequest>;

export type GetProjectsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;
export const GetProjectsDlpJobsResponse = GooglePrivacyDlpV2DlpJob;

export type GetProjectsDlpJobsError = CommonErrors;

export const getProjectsDlpJobs: API.OperationMethod<GetProjectsDlpJobsRequest, GetProjectsDlpJobsResponse, GetProjectsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDlpJobsRequest,
  output: GetProjectsDlpJobsResponse,
  errors: [],
}));

/** Deletes a long-running DlpJob. This method indicates that the client is no longer interested in the DlpJob result. The job will be canceled if possible. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface DeleteProjectsDlpJobsRequest {
  /** Required. The name of the DlpJob resource to be deleted. */
  name: string;
}

export const DeleteProjectsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/dlpJobs/{dlpJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDlpJobsRequest>;

export type DeleteProjectsDlpJobsResponse = GoogleProtobufEmpty;
export const DeleteProjectsDlpJobsResponse = GoogleProtobufEmpty;

export type DeleteProjectsDlpJobsError = CommonErrors;

export const deleteProjectsDlpJobs: API.OperationMethod<DeleteProjectsDlpJobsRequest, DeleteProjectsDlpJobsResponse, DeleteProjectsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDlpJobsRequest,
  output: DeleteProjectsDlpJobsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running DlpJob. The server makes a best effort to cancel the DlpJob, but success is not guaranteed. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface CancelProjectsDlpJobsRequest {
  /** Required. The name of the DlpJob resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CancelDlpJobRequest;
}

export const CancelProjectsDlpJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2CancelDlpJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/dlpJobs/{dlpJobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsDlpJobsRequest>;

export type CancelProjectsDlpJobsResponse = GoogleProtobufEmpty;
export const CancelProjectsDlpJobsResponse = GoogleProtobufEmpty;

export type CancelProjectsDlpJobsError = CommonErrors;

export const cancelProjectsDlpJobs: API.OperationMethod<CancelProjectsDlpJobsRequest, CancelProjectsDlpJobsResponse, CancelProjectsDlpJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsDlpJobsRequest,
  output: CancelProjectsDlpJobsResponse,
  errors: [],
}));

/** Creates a pre-built stored infoType to be used for inspection. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface CreateProjectsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateStoredInfoTypeRequest;
}

export const CreateProjectsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/storedInfoTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsStoredInfoTypesRequest>;

export type CreateProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const CreateProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type CreateProjectsStoredInfoTypesError = CommonErrors;

export const createProjectsStoredInfoTypes: API.OperationMethod<CreateProjectsStoredInfoTypesRequest, CreateProjectsStoredInfoTypesResponse, CreateProjectsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsStoredInfoTypesRequest,
  output: CreateProjectsStoredInfoTypesResponse,
  errors: [],
}));

/** Updates the stored infoType by creating a new version. The existing version will continue to be used until the new version is ready. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface PatchProjectsStoredInfoTypesRequest {
  /** Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest;
}

export const PatchProjectsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/storedInfoTypes/{storedInfoTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsStoredInfoTypesRequest>;

export type PatchProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const PatchProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type PatchProjectsStoredInfoTypesError = CommonErrors;

export const patchProjectsStoredInfoTypes: API.OperationMethod<PatchProjectsStoredInfoTypesRequest, PatchProjectsStoredInfoTypesResponse, PatchProjectsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsStoredInfoTypesRequest,
  output: PatchProjectsStoredInfoTypesResponse,
  errors: [],
}));

/** Gets a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface GetProjectsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const GetProjectsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsStoredInfoTypesRequest>;

export type GetProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const GetProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type GetProjectsStoredInfoTypesError = CommonErrors;

export const getProjectsStoredInfoTypes: API.OperationMethod<GetProjectsStoredInfoTypesRequest, GetProjectsStoredInfoTypesResponse, GetProjectsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsStoredInfoTypesRequest,
  output: GetProjectsStoredInfoTypesResponse,
  errors: [],
}));

/** Lists stored infoTypes. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface ListProjectsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListStoredInfoTypes`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, display_name, create_time desc` Supported fields are: - `create_time`: corresponds to the time the most recent version of the resource was created. - `state`: corresponds to the state of the resource. - `name`: corresponds to resource name. - `display_name`: corresponds to info type's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListProjectsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/storedInfoTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsStoredInfoTypesRequest>;

export type ListProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;
export const ListProjectsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;

export type ListProjectsStoredInfoTypesError = CommonErrors;

export const listProjectsStoredInfoTypes = API.makePaginated(() => ({
  input: ListProjectsStoredInfoTypesRequest,
  output: ListProjectsStoredInfoTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface DeleteProjectsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const DeleteProjectsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsStoredInfoTypesRequest>;

export type DeleteProjectsStoredInfoTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsStoredInfoTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsStoredInfoTypesError = CommonErrors;

export const deleteProjectsStoredInfoTypes: API.OperationMethod<DeleteProjectsStoredInfoTypesRequest, DeleteProjectsStoredInfoTypesResponse, DeleteProjectsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsStoredInfoTypesRequest,
  output: DeleteProjectsStoredInfoTypesResponse,
  errors: [],
}));

/** Returns a list of the sensitive information types that the DLP API supports. See https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference to learn more. */
export interface ListInfoTypesRequest {
  /** The parent resource name. The format of this value is as follows: `locations/{location_id}` */
  parent?: string;
  /** BCP-47 language code for localized infoType friendly names. If omitted, or if localized strings are not available, en-US strings will be returned. */
  languageCode?: string;
  /** filter to only return infoTypes supported by certain parts of the API. Defaults to supported_by=INSPECT. */
  filter?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListInfoTypesRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/infoTypes" }),
  svc,
) as unknown as Schema.Schema<ListInfoTypesRequest>;

export type ListInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;
export const ListInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;

export type ListInfoTypesError = CommonErrors;

export const listInfoTypes: API.OperationMethod<ListInfoTypesRequest, ListInfoTypesResponse, ListInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListInfoTypesRequest,
  output: ListInfoTypesResponse,
  errors: [],
}));

/** Returns a list of the sensitive information types that the DLP API supports. See https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference to learn more. */
export interface ListLocationsInfoTypesRequest {
  /** The parent resource name. The format of this value is as follows: `locations/{location_id}` */
  parent: string;
  /** BCP-47 language code for localized infoType friendly names. If omitted, or if localized strings are not available, en-US strings will be returned. */
  languageCode?: string;
  /** filter to only return infoTypes supported by certain parts of the API. Defaults to supported_by=INSPECT. */
  filter?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListLocationsInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/locations/{locationsId}/infoTypes" }),
  svc,
) as unknown as Schema.Schema<ListLocationsInfoTypesRequest>;

export type ListLocationsInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;
export const ListLocationsInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;

export type ListLocationsInfoTypesError = CommonErrors;

export const listLocationsInfoTypes: API.OperationMethod<ListLocationsInfoTypesRequest, ListLocationsInfoTypesResponse, ListLocationsInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListLocationsInfoTypesRequest,
  output: ListLocationsInfoTypesResponse,
  errors: [],
}));

/** Returns a list of the sensitive information types that the DLP API supports. See https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference to learn more. */
export interface ListOrganizationsLocationsInfoTypesRequest {
  /** The parent resource name. The format of this value is as follows: `locations/{location_id}` */
  parent: string;
  /** BCP-47 language code for localized infoType friendly names. If omitted, or if localized strings are not available, en-US strings will be returned. */
  languageCode?: string;
  /** filter to only return infoTypes supported by certain parts of the API. Defaults to supported_by=INSPECT. */
  filter?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsLocationsInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/infoTypes" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsInfoTypesRequest>;

export type ListOrganizationsLocationsInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;
export const ListOrganizationsLocationsInfoTypesResponse = GooglePrivacyDlpV2ListInfoTypesResponse;

export type ListOrganizationsLocationsInfoTypesError = CommonErrors;

export const listOrganizationsLocationsInfoTypes: API.OperationMethod<ListOrganizationsLocationsInfoTypesRequest, ListOrganizationsLocationsInfoTypesResponse, ListOrganizationsLocationsInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOrganizationsLocationsInfoTypesRequest,
  output: ListOrganizationsLocationsInfoTypesResponse,
  errors: [],
}));

/** Creates an InspectTemplate for reusing frequently used configuration for inspecting content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface CreateOrganizationsLocationsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateInspectTemplateRequest;
}

export const CreateOrganizationsLocationsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/inspectTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsInspectTemplatesRequest>;

export type CreateOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const CreateOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type CreateOrganizationsLocationsInspectTemplatesError = CommonErrors;

export const createOrganizationsLocationsInspectTemplates: API.OperationMethod<CreateOrganizationsLocationsInspectTemplatesRequest, CreateOrganizationsLocationsInspectTemplatesResponse, CreateOrganizationsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsInspectTemplatesRequest,
  output: CreateOrganizationsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Updates the InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface PatchOrganizationsLocationsInspectTemplatesRequest {
  /** Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateInspectTemplateRequest;
}

export const PatchOrganizationsLocationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/inspectTemplates/{inspectTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsInspectTemplatesRequest>;

export type PatchOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const PatchOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type PatchOrganizationsLocationsInspectTemplatesError = CommonErrors;

export const patchOrganizationsLocationsInspectTemplates: API.OperationMethod<PatchOrganizationsLocationsInspectTemplatesRequest, PatchOrganizationsLocationsInspectTemplatesResponse, PatchOrganizationsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsInspectTemplatesRequest,
  output: PatchOrganizationsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Gets an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface GetOrganizationsLocationsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const GetOrganizationsLocationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsInspectTemplatesRequest>;

export type GetOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const GetOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type GetOrganizationsLocationsInspectTemplatesError = CommonErrors;

export const getOrganizationsLocationsInspectTemplates: API.OperationMethod<GetOrganizationsLocationsInspectTemplatesRequest, GetOrganizationsLocationsInspectTemplatesResponse, GetOrganizationsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsInspectTemplatesRequest,
  output: GetOrganizationsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Lists InspectTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface ListOrganizationsLocationsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListInspectTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsLocationsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/inspectTemplates" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsInspectTemplatesRequest>;

export type ListOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;
export const ListOrganizationsLocationsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;

export type ListOrganizationsLocationsInspectTemplatesError = CommonErrors;

export const listOrganizationsLocationsInspectTemplates = API.makePaginated(() => ({
  input: ListOrganizationsLocationsInspectTemplatesRequest,
  output: ListOrganizationsLocationsInspectTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface DeleteOrganizationsLocationsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const DeleteOrganizationsLocationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsInspectTemplatesRequest>;

export type DeleteOrganizationsLocationsInspectTemplatesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsInspectTemplatesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsInspectTemplatesError = CommonErrors;

export const deleteOrganizationsLocationsInspectTemplates: API.OperationMethod<DeleteOrganizationsLocationsInspectTemplatesRequest, DeleteOrganizationsLocationsInspectTemplatesResponse, DeleteOrganizationsLocationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsInspectTemplatesRequest,
  output: DeleteOrganizationsLocationsInspectTemplatesResponse,
  errors: [],
}));

/** Creates a DeidentifyTemplate for reusing frequently used configuration for de-identifying content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface CreateOrganizationsLocationsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest;
}

export const CreateOrganizationsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/deidentifyTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsDeidentifyTemplatesRequest>;

export type CreateOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const CreateOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type CreateOrganizationsLocationsDeidentifyTemplatesError = CommonErrors;

export const createOrganizationsLocationsDeidentifyTemplates: API.OperationMethod<CreateOrganizationsLocationsDeidentifyTemplatesRequest, CreateOrganizationsLocationsDeidentifyTemplatesResponse, CreateOrganizationsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsDeidentifyTemplatesRequest,
  output: CreateOrganizationsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Updates the DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface PatchOrganizationsLocationsDeidentifyTemplatesRequest {
  /** Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest;
}

export const PatchOrganizationsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/deidentifyTemplates/{deidentifyTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsDeidentifyTemplatesRequest>;

export type PatchOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const PatchOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type PatchOrganizationsLocationsDeidentifyTemplatesError = CommonErrors;

export const patchOrganizationsLocationsDeidentifyTemplates: API.OperationMethod<PatchOrganizationsLocationsDeidentifyTemplatesRequest, PatchOrganizationsLocationsDeidentifyTemplatesResponse, PatchOrganizationsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsDeidentifyTemplatesRequest,
  output: PatchOrganizationsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Gets a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface GetOrganizationsLocationsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const GetOrganizationsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsDeidentifyTemplatesRequest>;

export type GetOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const GetOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type GetOrganizationsLocationsDeidentifyTemplatesError = CommonErrors;

export const getOrganizationsLocationsDeidentifyTemplates: API.OperationMethod<GetOrganizationsLocationsDeidentifyTemplatesRequest, GetOrganizationsLocationsDeidentifyTemplatesResponse, GetOrganizationsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsDeidentifyTemplatesRequest,
  output: GetOrganizationsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Lists DeidentifyTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface ListOrganizationsLocationsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListDeidentifyTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/deidentifyTemplates" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsDeidentifyTemplatesRequest>;

export type ListOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;
export const ListOrganizationsLocationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;

export type ListOrganizationsLocationsDeidentifyTemplatesError = CommonErrors;

export const listOrganizationsLocationsDeidentifyTemplates = API.makePaginated(() => ({
  input: ListOrganizationsLocationsDeidentifyTemplatesRequest,
  output: ListOrganizationsLocationsDeidentifyTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface DeleteOrganizationsLocationsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const DeleteOrganizationsLocationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsDeidentifyTemplatesRequest>;

export type DeleteOrganizationsLocationsDeidentifyTemplatesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsDeidentifyTemplatesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsDeidentifyTemplatesError = CommonErrors;

export const deleteOrganizationsLocationsDeidentifyTemplates: API.OperationMethod<DeleteOrganizationsLocationsDeidentifyTemplatesRequest, DeleteOrganizationsLocationsDeidentifyTemplatesResponse, DeleteOrganizationsLocationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsDeidentifyTemplatesRequest,
  output: DeleteOrganizationsLocationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Creates a job trigger to run DLP actions such as scanning storage for sensitive information on a set schedule. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface CreateOrganizationsLocationsJobTriggersRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateJobTriggerRequest;
}

export const CreateOrganizationsLocationsJobTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/jobTriggers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsJobTriggersRequest>;

export type CreateOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const CreateOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type CreateOrganizationsLocationsJobTriggersError = CommonErrors;

export const createOrganizationsLocationsJobTriggers: API.OperationMethod<CreateOrganizationsLocationsJobTriggersRequest, CreateOrganizationsLocationsJobTriggersResponse, CreateOrganizationsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsJobTriggersRequest,
  output: CreateOrganizationsLocationsJobTriggersResponse,
  errors: [],
}));

/** Updates a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface PatchOrganizationsLocationsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateJobTriggerRequest;
}

export const PatchOrganizationsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateJobTriggerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsJobTriggersRequest>;

export type PatchOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const PatchOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type PatchOrganizationsLocationsJobTriggersError = CommonErrors;

export const patchOrganizationsLocationsJobTriggers: API.OperationMethod<PatchOrganizationsLocationsJobTriggersRequest, PatchOrganizationsLocationsJobTriggersResponse, PatchOrganizationsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsJobTriggersRequest,
  output: PatchOrganizationsLocationsJobTriggersResponse,
  errors: [],
}));

/** Gets a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface GetOrganizationsLocationsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
}

export const GetOrganizationsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsJobTriggersRequest>;

export type GetOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;
export const GetOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2JobTrigger;

export type GetOrganizationsLocationsJobTriggersError = CommonErrors;

export const getOrganizationsLocationsJobTriggers: API.OperationMethod<GetOrganizationsLocationsJobTriggersRequest, GetOrganizationsLocationsJobTriggersResponse, GetOrganizationsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsJobTriggersRequest,
  output: GetOrganizationsLocationsJobTriggersResponse,
  errors: [],
}));

/** Lists job triggers. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface ListOrganizationsLocationsJobTriggersRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to ListJobTriggers. `order_by` field must not change for subsequent calls. */
  pageToken?: string;
  /** Size of the page. This value can be limited by a server. */
  pageSize?: number;
  /** Comma-separated list of triggeredJob fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the JobTrigger was created. - `update_time`: corresponds to the time the JobTrigger was last updated. - `last_run_time`: corresponds to the last time the JobTrigger ran. - `name`: corresponds to the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's display name. - `status`: corresponds to JobTrigger's status. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` - RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds are ignored. - 'error_count' - Number of errors that have occurred while running. * The operator must be `=` or `!=` for status and inspected_storage. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND status = HEALTHY * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state = HEALTHY) * last_run_time > \"2017-12-12T00:00:00+00:00\" The length of this field should be no more than 500 characters. */
  filter?: string;
  /** The type of jobs. Will use `DlpJobType.INSPECT` if not set. */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsLocationsJobTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/jobTriggers" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsJobTriggersRequest>;

export type ListOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2ListJobTriggersResponse;
export const ListOrganizationsLocationsJobTriggersResponse = GooglePrivacyDlpV2ListJobTriggersResponse;

export type ListOrganizationsLocationsJobTriggersError = CommonErrors;

export const listOrganizationsLocationsJobTriggers = API.makePaginated(() => ({
  input: ListOrganizationsLocationsJobTriggersRequest,
  output: ListOrganizationsLocationsJobTriggersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a job trigger. See https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers to learn more. */
export interface DeleteOrganizationsLocationsJobTriggersRequest {
  /** Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`. */
  name: string;
}

export const DeleteOrganizationsLocationsJobTriggersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/jobTriggers/{jobTriggersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsJobTriggersRequest>;

export type DeleteOrganizationsLocationsJobTriggersResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsJobTriggersResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsJobTriggersError = CommonErrors;

export const deleteOrganizationsLocationsJobTriggers: API.OperationMethod<DeleteOrganizationsLocationsJobTriggersRequest, DeleteOrganizationsLocationsJobTriggersResponse, DeleteOrganizationsLocationsJobTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsJobTriggersRequest,
  output: DeleteOrganizationsLocationsJobTriggersResponse,
  errors: [],
}));

/** Creates a config for discovery to scan and profile storage. */
export interface CreateOrganizationsLocationsDiscoveryConfigsRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization): + Projects scope: `projects/{project_id}/locations/{location_id}` + Organizations scope: `organizations/{org_id}/locations/{location_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDiscoveryConfigRequest;
}

export const CreateOrganizationsLocationsDiscoveryConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDiscoveryConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/discoveryConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsDiscoveryConfigsRequest>;

export type CreateOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;
export const CreateOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;

export type CreateOrganizationsLocationsDiscoveryConfigsError = CommonErrors;

export const createOrganizationsLocationsDiscoveryConfigs: API.OperationMethod<CreateOrganizationsLocationsDiscoveryConfigsRequest, CreateOrganizationsLocationsDiscoveryConfigsResponse, CreateOrganizationsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsDiscoveryConfigsRequest,
  output: CreateOrganizationsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Updates a discovery configuration. */
export interface PatchOrganizationsLocationsDiscoveryConfigsRequest {
  /** Required. Resource name of the project and the configuration, for example `projects/dlp-test-project/discoveryConfigs/53234423`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateDiscoveryConfigRequest;
}

export const PatchOrganizationsLocationsDiscoveryConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateDiscoveryConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/discoveryConfigs/{discoveryConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsDiscoveryConfigsRequest>;

export type PatchOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;
export const PatchOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;

export type PatchOrganizationsLocationsDiscoveryConfigsError = CommonErrors;

export const patchOrganizationsLocationsDiscoveryConfigs: API.OperationMethod<PatchOrganizationsLocationsDiscoveryConfigsRequest, PatchOrganizationsLocationsDiscoveryConfigsResponse, PatchOrganizationsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsDiscoveryConfigsRequest,
  output: PatchOrganizationsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Gets a discovery configuration. */
export interface GetOrganizationsLocationsDiscoveryConfigsRequest {
  /** Required. Resource name of the project and the configuration, for example `projects/dlp-test-project/discoveryConfigs/53234423`. */
  name: string;
}

export const GetOrganizationsLocationsDiscoveryConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/discoveryConfigs/{discoveryConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsDiscoveryConfigsRequest>;

export type GetOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;
export const GetOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2DiscoveryConfig;

export type GetOrganizationsLocationsDiscoveryConfigsError = CommonErrors;

export const getOrganizationsLocationsDiscoveryConfigs: API.OperationMethod<GetOrganizationsLocationsDiscoveryConfigsRequest, GetOrganizationsLocationsDiscoveryConfigsResponse, GetOrganizationsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsDiscoveryConfigsRequest,
  output: GetOrganizationsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Lists discovery configurations. */
export interface ListOrganizationsLocationsDiscoveryConfigsRequest {
  /** Required. Parent resource name. The format of this value is as follows: `projects/{project_id}/locations/{location_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to ListDiscoveryConfigs. `order_by` field must not change for subsequent calls. */
  pageToken?: string;
  /** Size of the page. This value can be limited by a server. */
  pageSize?: number;
  /** Comma-separated list of config fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `last_run_time`: corresponds to the last time the DiscoveryConfig ran. - `name`: corresponds to the DiscoveryConfig's name. - `status`: corresponds to DiscoveryConfig's status. */
  orderBy?: string;
}

export const ListOrganizationsLocationsDiscoveryConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/discoveryConfigs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsDiscoveryConfigsRequest>;

export type ListOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2ListDiscoveryConfigsResponse;
export const ListOrganizationsLocationsDiscoveryConfigsResponse = GooglePrivacyDlpV2ListDiscoveryConfigsResponse;

export type ListOrganizationsLocationsDiscoveryConfigsError = CommonErrors;

export const listOrganizationsLocationsDiscoveryConfigs = API.makePaginated(() => ({
  input: ListOrganizationsLocationsDiscoveryConfigsRequest,
  output: ListOrganizationsLocationsDiscoveryConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a discovery configuration. */
export interface DeleteOrganizationsLocationsDiscoveryConfigsRequest {
  /** Required. Resource name of the project and the config, for example `projects/dlp-test-project/discoveryConfigs/53234423`. */
  name: string;
}

export const DeleteOrganizationsLocationsDiscoveryConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/discoveryConfigs/{discoveryConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsDiscoveryConfigsRequest>;

export type DeleteOrganizationsLocationsDiscoveryConfigsResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsDiscoveryConfigsResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsDiscoveryConfigsError = CommonErrors;

export const deleteOrganizationsLocationsDiscoveryConfigs: API.OperationMethod<DeleteOrganizationsLocationsDiscoveryConfigsRequest, DeleteOrganizationsLocationsDiscoveryConfigsResponse, DeleteOrganizationsLocationsDiscoveryConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsDiscoveryConfigsRequest,
  output: DeleteOrganizationsLocationsDiscoveryConfigsResponse,
  errors: [],
}));

/** Lists DlpJobs that match the specified filter in the request. See https://cloud.google.com/sensitive-data-protection/docs/inspecting-storage and https://cloud.google.com/sensitive-data-protection/docs/compute-risk-analysis to learn more. */
export interface ListOrganizationsLocationsDlpJobsRequest {
  /** Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect jobs: - `state` - PENDING|RUNNING|CANCELED|FINISHED|FAILED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - `trigger_name` - The name of the trigger that created the job. - 'end_time` - Corresponds to the time the job finished. - 'start_time` - Corresponds to the time the job finished. * Supported fields for risk analysis jobs: - `state` - RUNNING|CANCELED|FINISHED|FAILED - 'end_time` - Corresponds to the time the job finished. - 'start_time` - Corresponds to the time the job finished. * The operator must be `=` or `!=`. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND state = done * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = done OR state = canceled) * end_time > \"2017-12-12T00:00:00+00:00\" The length of this field should be no more than 500 characters. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** The type of job. Defaults to `DlpJobType.INSPECT` */
  type?: "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB" | (string & {});
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, end_time asc, create_time desc` Supported fields are: - `create_time`: corresponds to the time the job was created. - `end_time`: corresponds to the time the job ended. - `name`: corresponds to the job's name. - `state`: corresponds to `state` */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsLocationsDlpJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/dlpJobs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsDlpJobsRequest>;

export type ListOrganizationsLocationsDlpJobsResponse = GooglePrivacyDlpV2ListDlpJobsResponse;
export const ListOrganizationsLocationsDlpJobsResponse = GooglePrivacyDlpV2ListDlpJobsResponse;

export type ListOrganizationsLocationsDlpJobsError = CommonErrors;

export const listOrganizationsLocationsDlpJobs = API.makePaginated(() => ({
  input: ListOrganizationsLocationsDlpJobsRequest,
  output: ListOrganizationsLocationsDlpJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a pre-built stored infoType to be used for inspection. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface CreateOrganizationsLocationsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateStoredInfoTypeRequest;
}

export const CreateOrganizationsLocationsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/storedInfoTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsStoredInfoTypesRequest>;

export type CreateOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const CreateOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type CreateOrganizationsLocationsStoredInfoTypesError = CommonErrors;

export const createOrganizationsLocationsStoredInfoTypes: API.OperationMethod<CreateOrganizationsLocationsStoredInfoTypesRequest, CreateOrganizationsLocationsStoredInfoTypesResponse, CreateOrganizationsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsStoredInfoTypesRequest,
  output: CreateOrganizationsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Updates the stored infoType by creating a new version. The existing version will continue to be used until the new version is ready. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface PatchOrganizationsLocationsStoredInfoTypesRequest {
  /** Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest;
}

export const PatchOrganizationsLocationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/storedInfoTypes/{storedInfoTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsStoredInfoTypesRequest>;

export type PatchOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const PatchOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type PatchOrganizationsLocationsStoredInfoTypesError = CommonErrors;

export const patchOrganizationsLocationsStoredInfoTypes: API.OperationMethod<PatchOrganizationsLocationsStoredInfoTypesRequest, PatchOrganizationsLocationsStoredInfoTypesResponse, PatchOrganizationsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsStoredInfoTypesRequest,
  output: PatchOrganizationsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Gets a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface GetOrganizationsLocationsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const GetOrganizationsLocationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsStoredInfoTypesRequest>;

export type GetOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const GetOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type GetOrganizationsLocationsStoredInfoTypesError = CommonErrors;

export const getOrganizationsLocationsStoredInfoTypes: API.OperationMethod<GetOrganizationsLocationsStoredInfoTypesRequest, GetOrganizationsLocationsStoredInfoTypesResponse, GetOrganizationsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsStoredInfoTypesRequest,
  output: GetOrganizationsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Lists stored infoTypes. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface ListOrganizationsLocationsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListStoredInfoTypes`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, display_name, create_time desc` Supported fields are: - `create_time`: corresponds to the time the most recent version of the resource was created. - `state`: corresponds to the state of the resource. - `name`: corresponds to resource name. - `display_name`: corresponds to info type's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsLocationsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/storedInfoTypes" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsStoredInfoTypesRequest>;

export type ListOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;
export const ListOrganizationsLocationsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;

export type ListOrganizationsLocationsStoredInfoTypesError = CommonErrors;

export const listOrganizationsLocationsStoredInfoTypes = API.makePaginated(() => ({
  input: ListOrganizationsLocationsStoredInfoTypesRequest,
  output: ListOrganizationsLocationsStoredInfoTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface DeleteOrganizationsLocationsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const DeleteOrganizationsLocationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsStoredInfoTypesRequest>;

export type DeleteOrganizationsLocationsStoredInfoTypesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsStoredInfoTypesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsStoredInfoTypesError = CommonErrors;

export const deleteOrganizationsLocationsStoredInfoTypes: API.OperationMethod<DeleteOrganizationsLocationsStoredInfoTypesRequest, DeleteOrganizationsLocationsStoredInfoTypesResponse, DeleteOrganizationsLocationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsStoredInfoTypesRequest,
  output: DeleteOrganizationsLocationsStoredInfoTypesResponse,
  errors: [],
}));

/** Lists project data profiles for an organization. */
export interface ListOrganizationsLocationsProjectDataProfilesRequest {
  /** Required. organizations/{org_id}/locations/{loc_id} */
  parent: string;
  /** Page token to continue retrieval. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id` * `sensitivity_level desc` Supported fields: - `project_id`: Google Cloud project ID - `sensitivity_level`: How sensitive the data in a project is, at most - `data_risk_level`: How much risk is associated with this data - `profile_last_generated`: Date and time (in epoch seconds) the profile was last generated */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: the Google Cloud project ID - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListOrganizationsLocationsProjectDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/projectDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsProjectDataProfilesRequest>;

export type ListOrganizationsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ListProjectDataProfilesResponse;
export const ListOrganizationsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ListProjectDataProfilesResponse;

export type ListOrganizationsLocationsProjectDataProfilesError = CommonErrors;

export const listOrganizationsLocationsProjectDataProfiles = API.makePaginated(() => ({
  input: ListOrganizationsLocationsProjectDataProfilesRequest,
  output: ListOrganizationsLocationsProjectDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a project data profile. */
export interface GetOrganizationsLocationsProjectDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/projectDataProfiles/53234423`. */
  name: string;
}

export const GetOrganizationsLocationsProjectDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/projectDataProfiles/{projectDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsProjectDataProfilesRequest>;

export type GetOrganizationsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ProjectDataProfile;
export const GetOrganizationsLocationsProjectDataProfilesResponse = GooglePrivacyDlpV2ProjectDataProfile;

export type GetOrganizationsLocationsProjectDataProfilesError = CommonErrors;

export const getOrganizationsLocationsProjectDataProfiles: API.OperationMethod<GetOrganizationsLocationsProjectDataProfilesRequest, GetOrganizationsLocationsProjectDataProfilesResponse, GetOrganizationsLocationsProjectDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsProjectDataProfilesRequest,
  output: GetOrganizationsLocationsProjectDataProfilesResponse,
  errors: [],
}));

/** Lists table data profiles for an organization. */
export interface ListOrganizationsLocationsTableDataProfilesRequest {
  /** Required. Resource name of the organization or project, for example `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Page token to continue retrieval. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `table_id` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `dataset_id`: The ID of a BigQuery dataset. - `table_id`: The ID of a BigQuery table. - `sensitivity_level`: How sensitive the data in a table is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. - `last_modified`: The last time the resource was modified. - `resource_visibility`: Visibility restriction for this resource. - `row_count`: Number of rows in this resource. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: The Google Cloud project ID - `dataset_id`: The BigQuery dataset ID - `table_id`: The ID of the BigQuery table - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `resource_visibility`: PUBLIC|RESTRICTED - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `project_id = 12345 AND resource_visibility = PUBLIC` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListOrganizationsLocationsTableDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/tableDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsTableDataProfilesRequest>;

export type ListOrganizationsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2ListTableDataProfilesResponse;
export const ListOrganizationsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2ListTableDataProfilesResponse;

export type ListOrganizationsLocationsTableDataProfilesError = CommonErrors;

export const listOrganizationsLocationsTableDataProfiles = API.makePaginated(() => ({
  input: ListOrganizationsLocationsTableDataProfilesRequest,
  output: ListOrganizationsLocationsTableDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a table data profile. */
export interface GetOrganizationsLocationsTableDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/tableDataProfiles/53234423`. */
  name: string;
}

export const GetOrganizationsLocationsTableDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/tableDataProfiles/{tableDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsTableDataProfilesRequest>;

export type GetOrganizationsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2TableDataProfile;
export const GetOrganizationsLocationsTableDataProfilesResponse = GooglePrivacyDlpV2TableDataProfile;

export type GetOrganizationsLocationsTableDataProfilesError = CommonErrors;

export const getOrganizationsLocationsTableDataProfiles: API.OperationMethod<GetOrganizationsLocationsTableDataProfilesRequest, GetOrganizationsLocationsTableDataProfilesResponse, GetOrganizationsLocationsTableDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsTableDataProfilesRequest,
  output: GetOrganizationsLocationsTableDataProfilesResponse,
  errors: [],
}));

/** Delete a TableDataProfile. Will not prevent the profile from being regenerated if the table is still included in a discovery configuration. */
export interface DeleteOrganizationsLocationsTableDataProfilesRequest {
  /** Required. Resource name of the table data profile. */
  name: string;
}

export const DeleteOrganizationsLocationsTableDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/tableDataProfiles/{tableDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsTableDataProfilesRequest>;

export type DeleteOrganizationsLocationsTableDataProfilesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsTableDataProfilesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsTableDataProfilesError = CommonErrors;

export const deleteOrganizationsLocationsTableDataProfiles: API.OperationMethod<DeleteOrganizationsLocationsTableDataProfilesRequest, DeleteOrganizationsLocationsTableDataProfilesResponse, DeleteOrganizationsLocationsTableDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsTableDataProfilesRequest,
  output: DeleteOrganizationsLocationsTableDataProfilesResponse,
  errors: [],
}));

/** Lists column data profiles for an organization. */
export interface ListOrganizationsLocationsColumnDataProfilesRequest {
  /** Required. Resource name of the organization or project, for example `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Page token to continue retrieval. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `table_id` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `dataset_id`: The ID of a BigQuery dataset. - `table_id`: The ID of a BigQuery table. - `sensitivity_level`: How sensitive the data in a column is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. */
  orderBy?: string;
  /** Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `table_data_profile_name`: The name of the related table data profile - `project_id`: The Google Cloud project ID (REQUIRED) - `dataset_id`: The BigQuery dataset ID (REQUIRED) - `table_id`: The BigQuery table ID (REQUIRED) - `field_id`: The ID of the BigQuery field - `info_type`: The infotype detected in the resource - `sensitivity_level`: HIGH|MEDIUM|LOW - `data_risk_level`: How much risk is associated with this data - `status_code`: An RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` for project_id, dataset_id, and table_id. Other filters also support `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * project_id = 12345 AND status_code = 1 * project_id = 12345 AND sensitivity_level = HIGH * project_id = 12345 AND info_type = STREET_ADDRESS * profile_last_generated < "2025-01-01T00:00:00.000Z" The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListOrganizationsLocationsColumnDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/columnDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsColumnDataProfilesRequest>;

export type ListOrganizationsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ListColumnDataProfilesResponse;
export const ListOrganizationsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ListColumnDataProfilesResponse;

export type ListOrganizationsLocationsColumnDataProfilesError = CommonErrors;

export const listOrganizationsLocationsColumnDataProfiles = API.makePaginated(() => ({
  input: ListOrganizationsLocationsColumnDataProfilesRequest,
  output: ListOrganizationsLocationsColumnDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a column data profile. */
export interface GetOrganizationsLocationsColumnDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/columnDataProfiles/53234423`. */
  name: string;
}

export const GetOrganizationsLocationsColumnDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/columnDataProfiles/{columnDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsColumnDataProfilesRequest>;

export type GetOrganizationsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ColumnDataProfile;
export const GetOrganizationsLocationsColumnDataProfilesResponse = GooglePrivacyDlpV2ColumnDataProfile;

export type GetOrganizationsLocationsColumnDataProfilesError = CommonErrors;

export const getOrganizationsLocationsColumnDataProfiles: API.OperationMethod<GetOrganizationsLocationsColumnDataProfilesRequest, GetOrganizationsLocationsColumnDataProfilesResponse, GetOrganizationsLocationsColumnDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsColumnDataProfilesRequest,
  output: GetOrganizationsLocationsColumnDataProfilesResponse,
  errors: [],
}));

/** Lists file store data profiles for an organization. */
export interface ListOrganizationsLocationsFileStoreDataProfilesRequest {
  /** Required. Resource name of the organization or project, for example `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Optional. Page token to continue retrieval. */
  pageToken?: string;
  /** Optional. Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100. */
  pageSize?: number;
  /** Optional. Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `name` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `sensitivity_level`: How sensitive the data in a table is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. - `last_modified`: The last time the resource was modified. - `resource_visibility`: Visibility restriction for this resource. - `name`: The name of the profile. - `create_time`: The time the file store was first created. */
  orderBy?: string;
  /** Optional. Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: The Google Cloud project ID - `account_id`: The AWS account ID - `file_store_path`: The path like "gs://bucket" - `data_source_type`: The profile's data source type, like "google/storage/bucket" - `data_storage_location`: The location where the file store's data is stored, like "us-central1" - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `resource_visibility`: PUBLIC|RESTRICTED - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `project_id = 12345 AND resource_visibility = PUBLIC` * `file_store_path = "gs://mybucket"` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters. */
  filter?: string;
}

export const ListOrganizationsLocationsFileStoreDataProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/fileStoreDataProfiles" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsFileStoreDataProfilesRequest>;

export type ListOrganizationsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2ListFileStoreDataProfilesResponse;
export const ListOrganizationsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2ListFileStoreDataProfilesResponse;

export type ListOrganizationsLocationsFileStoreDataProfilesError = CommonErrors;

export const listOrganizationsLocationsFileStoreDataProfiles = API.makePaginated(() => ({
  input: ListOrganizationsLocationsFileStoreDataProfilesRequest,
  output: ListOrganizationsLocationsFileStoreDataProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a file store data profile. */
export interface GetOrganizationsLocationsFileStoreDataProfilesRequest {
  /** Required. Resource name, for example `organizations/12345/locations/us/fileStoreDataProfiles/53234423`. */
  name: string;
}

export const GetOrganizationsLocationsFileStoreDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/fileStoreDataProfiles/{fileStoreDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsFileStoreDataProfilesRequest>;

export type GetOrganizationsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2FileStoreDataProfile;
export const GetOrganizationsLocationsFileStoreDataProfilesResponse = GooglePrivacyDlpV2FileStoreDataProfile;

export type GetOrganizationsLocationsFileStoreDataProfilesError = CommonErrors;

export const getOrganizationsLocationsFileStoreDataProfiles: API.OperationMethod<GetOrganizationsLocationsFileStoreDataProfilesRequest, GetOrganizationsLocationsFileStoreDataProfilesResponse, GetOrganizationsLocationsFileStoreDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsFileStoreDataProfilesRequest,
  output: GetOrganizationsLocationsFileStoreDataProfilesResponse,
  errors: [],
}));

/** Delete a FileStoreDataProfile. Will not prevent the profile from being regenerated if the resource is still included in a discovery configuration. */
export interface DeleteOrganizationsLocationsFileStoreDataProfilesRequest {
  /** Required. Resource name of the file store data profile. */
  name: string;
}

export const DeleteOrganizationsLocationsFileStoreDataProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/fileStoreDataProfiles/{fileStoreDataProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsFileStoreDataProfilesRequest>;

export type DeleteOrganizationsLocationsFileStoreDataProfilesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsFileStoreDataProfilesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsFileStoreDataProfilesError = CommonErrors;

export const deleteOrganizationsLocationsFileStoreDataProfiles: API.OperationMethod<DeleteOrganizationsLocationsFileStoreDataProfilesRequest, DeleteOrganizationsLocationsFileStoreDataProfilesResponse, DeleteOrganizationsLocationsFileStoreDataProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsFileStoreDataProfilesRequest,
  output: DeleteOrganizationsLocationsFileStoreDataProfilesResponse,
  errors: [],
}));

/** Create a Connection to an external data source. */
export interface CreateOrganizationsLocationsConnectionsRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization): + Projects scope: `projects/{project_id}/locations/{location_id}` + Organizations scope: `organizations/{org_id}/locations/{location_id}` */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateConnectionRequest;
}

export const CreateOrganizationsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateConnectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/connections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsConnectionsRequest>;

export type CreateOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;
export const CreateOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;

export type CreateOrganizationsLocationsConnectionsError = CommonErrors;

export const createOrganizationsLocationsConnections: API.OperationMethod<CreateOrganizationsLocationsConnectionsRequest, CreateOrganizationsLocationsConnectionsResponse, CreateOrganizationsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsConnectionsRequest,
  output: CreateOrganizationsLocationsConnectionsResponse,
  errors: [],
}));

/** Get a Connection by name. */
export interface GetOrganizationsLocationsConnectionsRequest {
  /** Required. Resource name in the format: `projects/{project}/locations/{location}/connections/{connection}`. */
  name: string;
}

export const GetOrganizationsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsConnectionsRequest>;

export type GetOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;
export const GetOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;

export type GetOrganizationsLocationsConnectionsError = CommonErrors;

export const getOrganizationsLocationsConnections: API.OperationMethod<GetOrganizationsLocationsConnectionsRequest, GetOrganizationsLocationsConnectionsResponse, GetOrganizationsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsConnectionsRequest,
  output: GetOrganizationsLocationsConnectionsResponse,
  errors: [],
}));

/** Lists Connections in a parent. Use SearchConnections to see all connections within an organization. */
export interface ListOrganizationsLocationsConnectionsRequest {
  /** Required. Resource name of the organization or project, for example, `organizations/433245324/locations/europe` or `projects/project-id/locations/asia`. */
  parent: string;
  /** Optional. Number of results per page, max 1000. */
  pageSize?: number;
  /** Optional. Page token from a previous page to return the next set of results. If set, all other request fields must match the original request. */
  pageToken?: string;
  /** Optional. Supported field/value: `state` - MISSING|AVAILABLE|ERROR The syntax is based on https://google.aip.dev/160. */
  filter?: string;
}

export const ListOrganizationsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/connections" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsConnectionsRequest>;

export type ListOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2ListConnectionsResponse;
export const ListOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2ListConnectionsResponse;

export type ListOrganizationsLocationsConnectionsError = CommonErrors;

export const listOrganizationsLocationsConnections = API.makePaginated(() => ({
  input: ListOrganizationsLocationsConnectionsRequest,
  output: ListOrganizationsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Searches for Connections in a parent. */
export interface SearchOrganizationsLocationsConnectionsRequest {
  /** Required. Resource name of the organization or project with a wildcard location, for example, `organizations/433245324/locations/-` or `projects/project-id/locations/-`. */
  parent: string;
  /** Optional. Number of results per page, max 1000. */
  pageSize?: number;
  /** Optional. Page token from a previous page to return the next set of results. If set, all other request fields must match the original request. */
  pageToken?: string;
  /** Optional. Supported field/value: - `state` - MISSING|AVAILABLE|ERROR The syntax is based on https://google.aip.dev/160. */
  filter?: string;
}

export const SearchOrganizationsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/connections:search" }),
  svc,
) as unknown as Schema.Schema<SearchOrganizationsLocationsConnectionsRequest>;

export type SearchOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2SearchConnectionsResponse;
export const SearchOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2SearchConnectionsResponse;

export type SearchOrganizationsLocationsConnectionsError = CommonErrors;

export const searchOrganizationsLocationsConnections = API.makePaginated(() => ({
  input: SearchOrganizationsLocationsConnectionsRequest,
  output: SearchOrganizationsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Delete a Connection. */
export interface DeleteOrganizationsLocationsConnectionsRequest {
  /** Required. Resource name of the Connection to be deleted, in the format: `projects/{project}/locations/{location}/connections/{connection}`. */
  name: string;
}

export const DeleteOrganizationsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsConnectionsRequest>;

export type DeleteOrganizationsLocationsConnectionsResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsLocationsConnectionsResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsLocationsConnectionsError = CommonErrors;

export const deleteOrganizationsLocationsConnections: API.OperationMethod<DeleteOrganizationsLocationsConnectionsRequest, DeleteOrganizationsLocationsConnectionsResponse, DeleteOrganizationsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsConnectionsRequest,
  output: DeleteOrganizationsLocationsConnectionsResponse,
  errors: [],
}));

/** Update a Connection. */
export interface PatchOrganizationsLocationsConnectionsRequest {
  /** Required. Resource name in the format: `projects/{project}/locations/{location}/connections/{connection}`. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateConnectionRequest;
}

export const PatchOrganizationsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateConnectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/{locationsId}/connections/{connectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsConnectionsRequest>;

export type PatchOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;
export const PatchOrganizationsLocationsConnectionsResponse = GooglePrivacyDlpV2Connection;

export type PatchOrganizationsLocationsConnectionsError = CommonErrors;

export const patchOrganizationsLocationsConnections: API.OperationMethod<PatchOrganizationsLocationsConnectionsRequest, PatchOrganizationsLocationsConnectionsResponse, PatchOrganizationsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsConnectionsRequest,
  output: PatchOrganizationsLocationsConnectionsResponse,
  errors: [],
}));

/** Creates an InspectTemplate for reusing frequently used configuration for inspecting content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface CreateOrganizationsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateInspectTemplateRequest;
}

export const CreateOrganizationsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/inspectTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsInspectTemplatesRequest>;

export type CreateOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const CreateOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type CreateOrganizationsInspectTemplatesError = CommonErrors;

export const createOrganizationsInspectTemplates: API.OperationMethod<CreateOrganizationsInspectTemplatesRequest, CreateOrganizationsInspectTemplatesResponse, CreateOrganizationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsInspectTemplatesRequest,
  output: CreateOrganizationsInspectTemplatesResponse,
  errors: [],
}));

/** Updates the InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface PatchOrganizationsInspectTemplatesRequest {
  /** Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateInspectTemplateRequest;
}

export const PatchOrganizationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateInspectTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/inspectTemplates/{inspectTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsInspectTemplatesRequest>;

export type PatchOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const PatchOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type PatchOrganizationsInspectTemplatesError = CommonErrors;

export const patchOrganizationsInspectTemplates: API.OperationMethod<PatchOrganizationsInspectTemplatesRequest, PatchOrganizationsInspectTemplatesResponse, PatchOrganizationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsInspectTemplatesRequest,
  output: PatchOrganizationsInspectTemplatesResponse,
  errors: [],
}));

/** Gets an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface GetOrganizationsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const GetOrganizationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsInspectTemplatesRequest>;

export type GetOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;
export const GetOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2InspectTemplate;

export type GetOrganizationsInspectTemplatesError = CommonErrors;

export const getOrganizationsInspectTemplates: API.OperationMethod<GetOrganizationsInspectTemplatesRequest, GetOrganizationsInspectTemplatesResponse, GetOrganizationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsInspectTemplatesRequest,
  output: GetOrganizationsInspectTemplatesResponse,
  errors: [],
}));

/** Lists InspectTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface ListOrganizationsInspectTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListInspectTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsInspectTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/inspectTemplates" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsInspectTemplatesRequest>;

export type ListOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;
export const ListOrganizationsInspectTemplatesResponse = GooglePrivacyDlpV2ListInspectTemplatesResponse;

export type ListOrganizationsInspectTemplatesError = CommonErrors;

export const listOrganizationsInspectTemplates = API.makePaginated(() => ({
  input: ListOrganizationsInspectTemplatesRequest,
  output: ListOrganizationsInspectTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an InspectTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates to learn more. */
export interface DeleteOrganizationsInspectTemplatesRequest {
  /** Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342. */
  name: string;
}

export const DeleteOrganizationsInspectTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/inspectTemplates/{inspectTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsInspectTemplatesRequest>;

export type DeleteOrganizationsInspectTemplatesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsInspectTemplatesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsInspectTemplatesError = CommonErrors;

export const deleteOrganizationsInspectTemplates: API.OperationMethod<DeleteOrganizationsInspectTemplatesRequest, DeleteOrganizationsInspectTemplatesResponse, DeleteOrganizationsInspectTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsInspectTemplatesRequest,
  output: DeleteOrganizationsInspectTemplatesResponse,
  errors: [],
}));

/** Creates a DeidentifyTemplate for reusing frequently used configuration for de-identifying content, images, and storage. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface CreateOrganizationsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest;
}

export const CreateOrganizationsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/deidentifyTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsDeidentifyTemplatesRequest>;

export type CreateOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const CreateOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type CreateOrganizationsDeidentifyTemplatesError = CommonErrors;

export const createOrganizationsDeidentifyTemplates: API.OperationMethod<CreateOrganizationsDeidentifyTemplatesRequest, CreateOrganizationsDeidentifyTemplatesResponse, CreateOrganizationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsDeidentifyTemplatesRequest,
  output: CreateOrganizationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Updates the DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface PatchOrganizationsDeidentifyTemplatesRequest {
  /** Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest;
}

export const PatchOrganizationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/deidentifyTemplates/{deidentifyTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsDeidentifyTemplatesRequest>;

export type PatchOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const PatchOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type PatchOrganizationsDeidentifyTemplatesError = CommonErrors;

export const patchOrganizationsDeidentifyTemplates: API.OperationMethod<PatchOrganizationsDeidentifyTemplatesRequest, PatchOrganizationsDeidentifyTemplatesResponse, PatchOrganizationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsDeidentifyTemplatesRequest,
  output: PatchOrganizationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Gets a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface GetOrganizationsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const GetOrganizationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsDeidentifyTemplatesRequest>;

export type GetOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;
export const GetOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2DeidentifyTemplate;

export type GetOrganizationsDeidentifyTemplatesError = CommonErrors;

export const getOrganizationsDeidentifyTemplates: API.OperationMethod<GetOrganizationsDeidentifyTemplatesRequest, GetOrganizationsDeidentifyTemplatesResponse, GetOrganizationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsDeidentifyTemplatesRequest,
  output: GetOrganizationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Lists DeidentifyTemplates. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface ListOrganizationsDeidentifyTemplatesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListDeidentifyTemplates`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the template was created. - `update_time`: corresponds to the time the template was last updated. - `name`: corresponds to the template's name. - `display_name`: corresponds to the template's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsDeidentifyTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/deidentifyTemplates" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsDeidentifyTemplatesRequest>;

export type ListOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;
export const ListOrganizationsDeidentifyTemplatesResponse = GooglePrivacyDlpV2ListDeidentifyTemplatesResponse;

export type ListOrganizationsDeidentifyTemplatesError = CommonErrors;

export const listOrganizationsDeidentifyTemplates = API.makePaginated(() => ({
  input: ListOrganizationsDeidentifyTemplatesRequest,
  output: ListOrganizationsDeidentifyTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a DeidentifyTemplate. See https://cloud.google.com/sensitive-data-protection/docs/creating-templates-deid to learn more. */
export interface DeleteOrganizationsDeidentifyTemplatesRequest {
  /** Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342. */
  name: string;
}

export const DeleteOrganizationsDeidentifyTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/deidentifyTemplates/{deidentifyTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsDeidentifyTemplatesRequest>;

export type DeleteOrganizationsDeidentifyTemplatesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsDeidentifyTemplatesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsDeidentifyTemplatesError = CommonErrors;

export const deleteOrganizationsDeidentifyTemplates: API.OperationMethod<DeleteOrganizationsDeidentifyTemplatesRequest, DeleteOrganizationsDeidentifyTemplatesResponse, DeleteOrganizationsDeidentifyTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsDeidentifyTemplatesRequest,
  output: DeleteOrganizationsDeidentifyTemplatesResponse,
  errors: [],
}));

/** Creates a pre-built stored infoType to be used for inspection. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface CreateOrganizationsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` + Organizations scope, location specified: `organizations/{org_id}/locations/{location_id}` + Organizations scope, no location specified (defaults to global): `organizations/{org_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Request body */
  body?: GooglePrivacyDlpV2CreateStoredInfoTypeRequest;
}

export const CreateOrganizationsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GooglePrivacyDlpV2CreateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/storedInfoTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsStoredInfoTypesRequest>;

export type CreateOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const CreateOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type CreateOrganizationsStoredInfoTypesError = CommonErrors;

export const createOrganizationsStoredInfoTypes: API.OperationMethod<CreateOrganizationsStoredInfoTypesRequest, CreateOrganizationsStoredInfoTypesResponse, CreateOrganizationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsStoredInfoTypesRequest,
  output: CreateOrganizationsStoredInfoTypesResponse,
  errors: [],
}));

/** Updates the stored infoType by creating a new version. The existing version will continue to be used until the new version is ready. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface PatchOrganizationsStoredInfoTypesRequest {
  /** Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
  /** Request body */
  body?: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest;
}

export const PatchOrganizationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePrivacyDlpV2UpdateStoredInfoTypeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/storedInfoTypes/{storedInfoTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsStoredInfoTypesRequest>;

export type PatchOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const PatchOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type PatchOrganizationsStoredInfoTypesError = CommonErrors;

export const patchOrganizationsStoredInfoTypes: API.OperationMethod<PatchOrganizationsStoredInfoTypesRequest, PatchOrganizationsStoredInfoTypesResponse, PatchOrganizationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsStoredInfoTypesRequest,
  output: PatchOrganizationsStoredInfoTypesResponse,
  errors: [],
}));

/** Gets a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface GetOrganizationsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const GetOrganizationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsStoredInfoTypesRequest>;

export type GetOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;
export const GetOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2StoredInfoType;

export type GetOrganizationsStoredInfoTypesError = CommonErrors;

export const getOrganizationsStoredInfoTypes: API.OperationMethod<GetOrganizationsStoredInfoTypesRequest, GetOrganizationsStoredInfoTypesResponse, GetOrganizationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsStoredInfoTypesRequest,
  output: GetOrganizationsStoredInfoTypesResponse,
  errors: [],
}));

/** Lists stored infoTypes. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface ListOrganizationsStoredInfoTypesRequest {
  /** Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/sensitive-data-protection/docs/specifying-location): + Projects scope, location specified: `projects/{project_id}/locations/{location_id}` + Projects scope, no location specified (defaults to global): `projects/{project_id}` The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3 */
  parent: string;
  /** Page token to continue retrieval. Comes from the previous call to `ListStoredInfoTypes`. */
  pageToken?: string;
  /** Size of the page. This value can be limited by the server. If zero server returns a page of max size 100. */
  pageSize?: number;
  /** Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc, display_name, create_time desc` Supported fields are: - `create_time`: corresponds to the time the most recent version of the resource was created. - `state`: corresponds to the state of the resource. - `name`: corresponds to resource name. - `display_name`: corresponds to info type's display name. */
  orderBy?: string;
  /** Deprecated. This field has no effect. */
  locationId?: string;
}

export const ListOrganizationsStoredInfoTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  locationId: Schema.optional(Schema.String).pipe(T.HttpQuery("locationId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/storedInfoTypes" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsStoredInfoTypesRequest>;

export type ListOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;
export const ListOrganizationsStoredInfoTypesResponse = GooglePrivacyDlpV2ListStoredInfoTypesResponse;

export type ListOrganizationsStoredInfoTypesError = CommonErrors;

export const listOrganizationsStoredInfoTypes = API.makePaginated(() => ({
  input: ListOrganizationsStoredInfoTypesRequest,
  output: ListOrganizationsStoredInfoTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a stored infoType. See https://cloud.google.com/sensitive-data-protection/docs/creating-stored-infotypes to learn more. */
export interface DeleteOrganizationsStoredInfoTypesRequest {
  /** Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342. */
  name: string;
}

export const DeleteOrganizationsStoredInfoTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/storedInfoTypes/{storedInfoTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsStoredInfoTypesRequest>;

export type DeleteOrganizationsStoredInfoTypesResponse = GoogleProtobufEmpty;
export const DeleteOrganizationsStoredInfoTypesResponse = GoogleProtobufEmpty;

export type DeleteOrganizationsStoredInfoTypesError = CommonErrors;

export const deleteOrganizationsStoredInfoTypes: API.OperationMethod<DeleteOrganizationsStoredInfoTypesRequest, DeleteOrganizationsStoredInfoTypesResponse, DeleteOrganizationsStoredInfoTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsStoredInfoTypesRequest,
  output: DeleteOrganizationsStoredInfoTypesResponse,
  errors: [],
}));

