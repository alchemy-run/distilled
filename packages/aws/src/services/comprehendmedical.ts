import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ComprehendMedical",
  serviceShapeName: "ComprehendMedical_20181030",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "comprehendmedical" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-10-30");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://comprehendmedical-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://comprehendmedical-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://comprehendmedical.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://comprehendmedical.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://comprehendmedical.{R}.{D}","properties":{},"headers":{}}');

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidEncodingException
  extends /*@__PURE__*/ S.TaggedError<InvalidEncodingException>()(
    "InvalidEncodingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TextSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TextSizeLimitExceededException>()(
    "TextSizeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type JobId = string;
export interface DescribeEntitiesDetectionV2JobRequest {
  JobId: string;
}
export type JobName = string;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PARTIAL_SUCCESS"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export type AnyLengthString = string;
export type S3Bucket = string;
export type S3Key = string;
export interface InputDataConfig {
  S3Bucket: string;
  S3Key?: string;
}
export interface OutputDataConfig {
  S3Bucket: string;
  S3Key?: string;
}
export type LanguageCode = "en" | (string & {});
export type IamRoleArn = string;
export type ManifestFilePath = string;
export type KMSKey = string;
export type ModelVersion = string;
export interface ComprehendMedicalAsyncJobProperties {
  JobId?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  ExpirationTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  ManifestFilePath?: string;
  KMSKey?: string;
  ModelVersion?: string;
}
export interface DescribeEntitiesDetectionV2JobResponse {
  ComprehendMedicalAsyncJobProperties?: ComprehendMedicalAsyncJobProperties;
}
export interface DescribeICD10CMInferenceJobRequest {
  JobId: string;
}
export interface DescribeICD10CMInferenceJobResponse {
  ComprehendMedicalAsyncJobProperties?: ComprehendMedicalAsyncJobProperties;
}
export interface DescribePHIDetectionJobRequest {
  JobId: string;
}
export interface DescribePHIDetectionJobResponse {
  ComprehendMedicalAsyncJobProperties?: ComprehendMedicalAsyncJobProperties;
}
export interface DescribeRxNormInferenceJobRequest {
  JobId: string;
}
export interface DescribeRxNormInferenceJobResponse {
  ComprehendMedicalAsyncJobProperties?: ComprehendMedicalAsyncJobProperties;
}
export interface DescribeSNOMEDCTInferenceJobRequest {
  JobId: string;
}
export interface DescribeSNOMEDCTInferenceJobResponse {
  ComprehendMedicalAsyncJobProperties?: ComprehendMedicalAsyncJobProperties;
}
export type BoundedLengthString = string;
export interface DetectEntitiesRequest {
  Text: string;
}
export type EntityType =
  | "MEDICATION"
  | "MEDICAL_CONDITION"
  | "PROTECTED_HEALTH_INFORMATION"
  | "TEST_TREATMENT_PROCEDURE"
  | "ANATOMY"
  | "TIME_EXPRESSION"
  | "BEHAVIORAL_ENVIRONMENTAL_SOCIAL"
  | (string & {});
export type EntitySubType =
  | "NAME"
  | "DX_NAME"
  | "DOSAGE"
  | "ROUTE_OR_MODE"
  | "FORM"
  | "FREQUENCY"
  | "DURATION"
  | "GENERIC_NAME"
  | "BRAND_NAME"
  | "STRENGTH"
  | "RATE"
  | "ACUITY"
  | "TEST_NAME"
  | "TEST_VALUE"
  | "TEST_UNITS"
  | "TEST_UNIT"
  | "PROCEDURE_NAME"
  | "TREATMENT_NAME"
  | "DATE"
  | "AGE"
  | "CONTACT_POINT"
  | "PHONE_OR_FAX"
  | "EMAIL"
  | "IDENTIFIER"
  | "ID"
  | "URL"
  | "ADDRESS"
  | "PROFESSION"
  | "SYSTEM_ORGAN_SITE"
  | "DIRECTION"
  | "QUALITY"
  | "QUANTITY"
  | "TIME_EXPRESSION"
  | "TIME_TO_MEDICATION_NAME"
  | "TIME_TO_DX_NAME"
  | "TIME_TO_TEST_NAME"
  | "TIME_TO_PROCEDURE_NAME"
  | "TIME_TO_TREATMENT_NAME"
  | "AMOUNT"
  | "GENDER"
  | "RACE_ETHNICITY"
  | "ALLERGIES"
  | "TOBACCO_USE"
  | "ALCOHOL_CONSUMPTION"
  | "REC_DRUG_USE"
  | (string & {});
export type AttributeName =
  | "SIGN"
  | "SYMPTOM"
  | "DIAGNOSIS"
  | "NEGATION"
  | "PERTAINS_TO_FAMILY"
  | "HYPOTHETICAL"
  | "LOW_CONFIDENCE"
  | "PAST_HISTORY"
  | "FUTURE"
  | (string & {});
export interface Trait {
  Name?: AttributeName;
  Score?: number;
}
export type TraitList = Trait[];
export type RelationshipType =
  | "EVERY"
  | "WITH_DOSAGE"
  | "ADMINISTERED_VIA"
  | "FOR"
  | "NEGATIVE"
  | "OVERLAP"
  | "DOSAGE"
  | "ROUTE_OR_MODE"
  | "FORM"
  | "FREQUENCY"
  | "DURATION"
  | "STRENGTH"
  | "RATE"
  | "ACUITY"
  | "TEST_VALUE"
  | "TEST_UNITS"
  | "TEST_UNIT"
  | "DIRECTION"
  | "SYSTEM_ORGAN_SITE"
  | "AMOUNT"
  | "USAGE"
  | "QUALITY"
  | (string & {});
export interface Attribute {
  Type?: EntitySubType;
  Score?: number;
  RelationshipScore?: number;
  RelationshipType?: RelationshipType;
  Id?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Text?: string;
  Category?: EntityType;
  Traits?: Trait[];
}
export type AttributeList = Attribute[];
export interface Entity {
  Id?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Score?: number;
  Text?: string;
  Category?: EntityType;
  Type?: EntitySubType;
  Traits?: Trait[];
  Attributes?: Attribute[];
}
export type EntityList = Entity[];
export interface UnmappedAttribute {
  Type?: EntityType;
  Attribute?: Attribute;
}
export type UnmappedAttributeList = UnmappedAttribute[];
export interface DetectEntitiesResponse {
  Entities: Entity[];
  UnmappedAttributes?: UnmappedAttribute[];
  PaginationToken?: string;
  ModelVersion: string;
}
export interface DetectEntitiesV2Request {
  Text: string;
}
export interface DetectEntitiesV2Response {
  Entities: Entity[];
  UnmappedAttributes?: UnmappedAttribute[];
  PaginationToken?: string;
  ModelVersion: string;
}
export interface DetectPHIRequest {
  Text: string;
}
export interface DetectPHIResponse {
  Entities: Entity[];
  PaginationToken?: string;
  ModelVersion: string;
}
export type OntologyLinkingBoundedLengthString = string;
export interface InferICD10CMRequest {
  Text: string;
}
export type ICD10CMEntityCategory = "MEDICAL_CONDITION" | (string & {});
export type ICD10CMEntityType = "DX_NAME" | "TIME_EXPRESSION" | (string & {});
export type ICD10CMAttributeType =
  | "ACUITY"
  | "DIRECTION"
  | "SYSTEM_ORGAN_SITE"
  | "QUALITY"
  | "QUANTITY"
  | "TIME_TO_DX_NAME"
  | "TIME_EXPRESSION"
  | (string & {});
export type ICD10CMTraitName =
  | "NEGATION"
  | "DIAGNOSIS"
  | "SIGN"
  | "SYMPTOM"
  | "PERTAINS_TO_FAMILY"
  | "HYPOTHETICAL"
  | "LOW_CONFIDENCE"
  | (string & {});
export interface ICD10CMTrait {
  Name?: ICD10CMTraitName;
  Score?: number;
}
export type ICD10CMTraitList = ICD10CMTrait[];
export type ICD10CMRelationshipType = "OVERLAP" | "SYSTEM_ORGAN_SITE" | "QUALITY" | (string & {});
export interface ICD10CMAttribute {
  Type?: ICD10CMAttributeType;
  Score?: number;
  RelationshipScore?: number;
  Id?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Text?: string;
  Traits?: ICD10CMTrait[];
  Category?: ICD10CMEntityType;
  RelationshipType?: ICD10CMRelationshipType;
}
export type ICD10CMAttributeList = ICD10CMAttribute[];
export interface ICD10CMConcept {
  Description?: string;
  Code?: string;
  Score?: number;
}
export type ICD10CMConceptList = ICD10CMConcept[];
export interface ICD10CMEntity {
  Id?: number;
  Text?: string;
  Category?: ICD10CMEntityCategory;
  Type?: ICD10CMEntityType;
  Score?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Attributes?: ICD10CMAttribute[];
  Traits?: ICD10CMTrait[];
  ICD10CMConcepts?: ICD10CMConcept[];
}
export type ICD10CMEntityList = ICD10CMEntity[];
export interface InferICD10CMResponse {
  Entities: ICD10CMEntity[];
  PaginationToken?: string;
  ModelVersion?: string;
}
export interface InferRxNormRequest {
  Text: string;
}
export type RxNormEntityCategory = "MEDICATION" | (string & {});
export type RxNormEntityType = "BRAND_NAME" | "GENERIC_NAME" | (string & {});
export type RxNormAttributeType =
  | "DOSAGE"
  | "DURATION"
  | "FORM"
  | "FREQUENCY"
  | "RATE"
  | "ROUTE_OR_MODE"
  | "STRENGTH"
  | (string & {});
export type RxNormTraitName = "NEGATION" | "PAST_HISTORY" | (string & {});
export interface RxNormTrait {
  Name?: RxNormTraitName;
  Score?: number;
}
export type RxNormTraitList = RxNormTrait[];
export interface RxNormAttribute {
  Type?: RxNormAttributeType;
  Score?: number;
  RelationshipScore?: number;
  Id?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Text?: string;
  Traits?: RxNormTrait[];
}
export type RxNormAttributeList = RxNormAttribute[];
export interface RxNormConcept {
  Description?: string;
  Code?: string;
  Score?: number;
}
export type RxNormConceptList = RxNormConcept[];
export interface RxNormEntity {
  Id?: number;
  Text?: string;
  Category?: RxNormEntityCategory;
  Type?: RxNormEntityType;
  Score?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Attributes?: RxNormAttribute[];
  Traits?: RxNormTrait[];
  RxNormConcepts?: RxNormConcept[];
}
export type RxNormEntityList = RxNormEntity[];
export interface InferRxNormResponse {
  Entities: RxNormEntity[];
  PaginationToken?: string;
  ModelVersion?: string;
}
export interface InferSNOMEDCTRequest {
  Text: string;
}
export type SNOMEDCTEntityCategory =
  | "MEDICAL_CONDITION"
  | "ANATOMY"
  | "TEST_TREATMENT_PROCEDURE"
  | (string & {});
export type SNOMEDCTEntityType =
  | "DX_NAME"
  | "TEST_NAME"
  | "PROCEDURE_NAME"
  | "TREATMENT_NAME"
  | (string & {});
export type SNOMEDCTAttributeType =
  | "ACUITY"
  | "QUALITY"
  | "DIRECTION"
  | "SYSTEM_ORGAN_SITE"
  | "TEST_VALUE"
  | "TEST_UNIT"
  | (string & {});
export type SNOMEDCTRelationshipType =
  | "ACUITY"
  | "QUALITY"
  | "TEST_VALUE"
  | "TEST_UNITS"
  | "DIRECTION"
  | "SYSTEM_ORGAN_SITE"
  | "TEST_UNIT"
  | (string & {});
export type SNOMEDCTTraitName =
  | "NEGATION"
  | "DIAGNOSIS"
  | "SIGN"
  | "SYMPTOM"
  | "PERTAINS_TO_FAMILY"
  | "HYPOTHETICAL"
  | "LOW_CONFIDENCE"
  | "PAST_HISTORY"
  | "FUTURE"
  | (string & {});
export interface SNOMEDCTTrait {
  Name?: SNOMEDCTTraitName;
  Score?: number;
}
export type SNOMEDCTTraitList = SNOMEDCTTrait[];
export interface SNOMEDCTConcept {
  Description?: string;
  Code?: string;
  Score?: number;
}
export type SNOMEDCTConceptList = SNOMEDCTConcept[];
export interface SNOMEDCTAttribute {
  Category?: SNOMEDCTEntityCategory;
  Type?: SNOMEDCTAttributeType;
  Score?: number;
  RelationshipScore?: number;
  RelationshipType?: SNOMEDCTRelationshipType;
  Id?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Text?: string;
  Traits?: SNOMEDCTTrait[];
  SNOMEDCTConcepts?: SNOMEDCTConcept[];
}
export type SNOMEDCTAttributeList = SNOMEDCTAttribute[];
export interface SNOMEDCTEntity {
  Id?: number;
  Text?: string;
  Category?: SNOMEDCTEntityCategory;
  Type?: SNOMEDCTEntityType;
  Score?: number;
  BeginOffset?: number;
  EndOffset?: number;
  Attributes?: SNOMEDCTAttribute[];
  Traits?: SNOMEDCTTrait[];
  SNOMEDCTConcepts?: SNOMEDCTConcept[];
}
export type SNOMEDCTEntityList = SNOMEDCTEntity[];
export interface SNOMEDCTDetails {
  Edition?: string;
  Language?: string;
  VersionDate?: string;
}
export interface Characters {
  OriginalTextCharacters?: number;
}
export interface InferSNOMEDCTResponse {
  Entities: SNOMEDCTEntity[];
  PaginationToken?: string;
  ModelVersion?: string;
  SNOMEDCTDetails?: SNOMEDCTDetails;
  Characters?: Characters;
}
export interface ComprehendMedicalAsyncJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export type MaxResultsInteger = number;
export interface ListEntitiesDetectionV2JobsRequest {
  Filter?: ComprehendMedicalAsyncJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type ComprehendMedicalAsyncJobPropertiesList = ComprehendMedicalAsyncJobProperties[];
export interface ListEntitiesDetectionV2JobsResponse {
  ComprehendMedicalAsyncJobPropertiesList?: ComprehendMedicalAsyncJobProperties[];
  NextToken?: string;
}
export interface ListICD10CMInferenceJobsRequest {
  Filter?: ComprehendMedicalAsyncJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListICD10CMInferenceJobsResponse {
  ComprehendMedicalAsyncJobPropertiesList?: ComprehendMedicalAsyncJobProperties[];
  NextToken?: string;
}
export interface ListPHIDetectionJobsRequest {
  Filter?: ComprehendMedicalAsyncJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListPHIDetectionJobsResponse {
  ComprehendMedicalAsyncJobPropertiesList?: ComprehendMedicalAsyncJobProperties[];
  NextToken?: string;
}
export interface ListRxNormInferenceJobsRequest {
  Filter?: ComprehendMedicalAsyncJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListRxNormInferenceJobsResponse {
  ComprehendMedicalAsyncJobPropertiesList?: ComprehendMedicalAsyncJobProperties[];
  NextToken?: string;
}
export interface ListSNOMEDCTInferenceJobsRequest {
  Filter?: ComprehendMedicalAsyncJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListSNOMEDCTInferenceJobsResponse {
  ComprehendMedicalAsyncJobPropertiesList?: ComprehendMedicalAsyncJobProperties[];
  NextToken?: string;
}
export type ClientRequestTokenString = string;
export interface StartEntitiesDetectionV2JobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  KMSKey?: string;
  LanguageCode: LanguageCode;
}
export interface StartEntitiesDetectionV2JobResponse {
  JobId?: string;
}
export interface StartICD10CMInferenceJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  KMSKey?: string;
  LanguageCode: LanguageCode;
}
export interface StartICD10CMInferenceJobResponse {
  JobId?: string;
}
export interface StartPHIDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  KMSKey?: string;
  LanguageCode: LanguageCode;
}
export interface StartPHIDetectionJobResponse {
  JobId?: string;
}
export interface StartRxNormInferenceJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  KMSKey?: string;
  LanguageCode: LanguageCode;
}
export interface StartRxNormInferenceJobResponse {
  JobId?: string;
}
export interface StartSNOMEDCTInferenceJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  KMSKey?: string;
  LanguageCode: LanguageCode;
}
export interface StartSNOMEDCTInferenceJobResponse {
  JobId?: string;
}
export interface StopEntitiesDetectionV2JobRequest {
  JobId: string;
}
export interface StopEntitiesDetectionV2JobResponse {
  JobId?: string;
}
export interface StopICD10CMInferenceJobRequest {
  JobId: string;
}
export interface StopICD10CMInferenceJobResponse {
  JobId?: string;
}
export interface StopPHIDetectionJobRequest {
  JobId: string;
}
export interface StopPHIDetectionJobResponse {
  JobId?: string;
}
export interface StopRxNormInferenceJobRequest {
  JobId: string;
}
export interface StopRxNormInferenceJobResponse {
  JobId?: string;
}
export interface StopSNOMEDCTInferenceJobRequest {
  JobId: string;
}
export interface StopSNOMEDCTInferenceJobResponse {
  JobId?: string;
}
export type DescribeEntitiesDetectionV2JobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a medical entities detection job. Use this operation
 * to get the status of a detection job.
 */
export const describeEntitiesDetectionV2Job: API.OperationMethod<
  DescribeEntitiesDetectionV2JobRequest,
  DescribeEntitiesDetectionV2JobResponse,
  DescribeEntitiesDetectionV2JobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<DescribeEntitiesDetectionV2JobRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DescribeEntitiesDetectionV2JobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntitiesDetectionV2Job",
}));

export type DescribeICD10CMInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an InferICD10CM job. Use this operation to get the
 * status of an inference job.
 */
export const describeICD10CMInferenceJob: API.OperationMethod<
  DescribeICD10CMInferenceJobRequest,
  DescribeICD10CMInferenceJobResponse,
  DescribeICD10CMInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DescribeICD10CMInferenceJobRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DescribeICD10CMInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeICD10CMInferenceJob",
}));

export type DescribePHIDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a protected health information (PHI) detection job.
 * Use this operation to get the status of a detection job.
 */
export const describePHIDetectionJob: API.OperationMethod<
  DescribePHIDetectionJobRequest,
  DescribePHIDetectionJobResponse,
  DescribePHIDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribePHIDetectionJobRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DescribePHIDetectionJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePHIDetectionJob",
}));

export type DescribeRxNormInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an InferRxNorm job. Use this operation to get the
 * status of an inference job.
 */
export const describeRxNormInferenceJob: API.OperationMethod<
  DescribeRxNormInferenceJobRequest,
  DescribeRxNormInferenceJobResponse,
  DescribeRxNormInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<DescribeRxNormInferenceJobRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DescribeRxNormInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRxNormInferenceJob",
}));

export type DescribeSNOMEDCTInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an InferSNOMEDCT job. Use this operation to get the status of an inference job.
 */
export const describeSNOMEDCTInferenceJob: API.OperationMethod<
  DescribeSNOMEDCTInferenceJobRequest,
  DescribeSNOMEDCTInferenceJobResponse,
  DescribeSNOMEDCTInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DescribeSNOMEDCTInferenceJobRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DescribeSNOMEDCTInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSNOMEDCTInferenceJob",
}));

export type DetectEntitiesError =
  | InternalServerException
  | InvalidEncodingException
  | InvalidRequestException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The `DetectEntities` operation is deprecated. You should use the DetectEntitiesV2 operation instead.
 *
 * Inspects the clinical text for a variety of medical entities and returns specific
 * information about them such as entity category, location, and confidence score on that
 * information.
 */
export const detectEntities: API.OperationMethod<
  DetectEntitiesRequest,
  DetectEntitiesResponse,
  DetectEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DetectEntitiesRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<DetectEntitiesResponse>,
  errors: [
    InternalServerException,
    InvalidEncodingException,
    InvalidRequestException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectEntities",
}));

export type DetectEntitiesV2Error =
  | InternalServerException
  | InvalidEncodingException
  | InvalidRequestException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Inspects the clinical text for a variety of medical entities and returns specific
 * information about them such as entity category, location, and confidence score on that
 * information. Amazon Comprehend Medical only detects medical entities in English language
 * texts.
 *
 * The `DetectEntitiesV2` operation replaces the DetectEntities
 * operation. This new action uses a different model for determining the entities in your medical
 * text and changes the way that some entities are returned in the output. You should use the
 * `DetectEntitiesV2` operation in all new applications.
 *
 * The `DetectEntitiesV2` operation returns the `Acuity` and
 * `Direction` entities as attributes instead of types.
 */
export const detectEntitiesV2: API.OperationMethod<
  DetectEntitiesV2Request,
  DetectEntitiesV2Response,
  DetectEntitiesV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DetectEntitiesV2Request>,
  output: __S(34, __c4, 2) as any as S.Schema<DetectEntitiesV2Response>,
  errors: [
    InternalServerException,
    InvalidEncodingException,
    InvalidRequestException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectEntitiesV2",
}));

export type DetectPHIError =
  | InternalServerException
  | InvalidEncodingException
  | InvalidRequestException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Inspects the clinical text for protected health information (PHI) entities and returns
 * the entity category, location, and confidence score for each entity. Amazon Comprehend Medical
 * only detects entities in English language texts.
 */
export const detectPHI: API.OperationMethod<
  DetectPHIRequest,
  DetectPHIResponse,
  DetectPHIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DetectPHIRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<DetectPHIResponse>,
  errors: [
    InternalServerException,
    InvalidEncodingException,
    InvalidRequestException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectPHI",
}));

export type InferICD10CMError =
  | InternalServerException
  | InvalidEncodingException
  | InvalidRequestException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * InferICD10CM detects medical conditions as entities listed in a patient record and links
 * those entities to normalized concept identifiers in the ICD-10-CM knowledge base from the
 * Centers for Disease Control. Amazon Comprehend Medical only detects medical entities in
 * English language texts.
 */
export const inferICD10CM: API.OperationMethod<
  InferICD10CMRequest,
  InferICD10CMResponse,
  InferICD10CMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<InferICD10CMRequest>,
  output: __S(77, __c9, 5) as any as S.Schema<InferICD10CMResponse>,
  errors: [
    InternalServerException,
    InvalidEncodingException,
    InvalidRequestException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InferICD10CM",
}));

export type InferRxNormError =
  | InternalServerException
  | InvalidEncodingException
  | InvalidRequestException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * InferRxNorm detects medications as entities listed in a patient record and links to the
 * normalized concept identifiers in the RxNorm database from the National Library of Medicine.
 * Amazon Comprehend Medical only detects medical entities in English language texts.
 */
export const inferRxNorm: API.OperationMethod<
  InferRxNormRequest,
  InferRxNormResponse,
  InferRxNormError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<InferRxNormRequest>,
  output: __S(93, __c11, 5) as any as S.Schema<InferRxNormResponse>,
  errors: [
    InternalServerException,
    InvalidEncodingException,
    InvalidRequestException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InferRxNorm",
}));

export type InferSNOMEDCTError =
  | InternalServerException
  | InvalidEncodingException
  | InvalidRequestException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * InferSNOMEDCT detects possible medical concepts as entities and links them to codes from the Systematized Nomenclature of Medicine, Clinical Terms (SNOMED-CT) ontology
 */
export const inferSNOMEDCT: API.OperationMethod<
  InferSNOMEDCTRequest,
  InferSNOMEDCTResponse,
  InferSNOMEDCTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<InferSNOMEDCTRequest>,
  output: __S(103, __c12, 7) as any as S.Schema<InferSNOMEDCTResponse>,
  errors: [
    InternalServerException,
    InvalidEncodingException,
    InvalidRequestException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InferSNOMEDCT",
}));

export type ListEntitiesDetectionV2JobsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of medical entity detection jobs that you have submitted.
 */
export const listEntitiesDetectionV2Jobs: API.OperationMethod<
  ListEntitiesDetectionV2JobsRequest,
  ListEntitiesDetectionV2JobsResponse,
  ListEntitiesDetectionV2JobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<ListEntitiesDetectionV2JobsRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<ListEntitiesDetectionV2JobsResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitiesDetectionV2Jobs",
}));

export type ListICD10CMInferenceJobsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of InferICD10CM jobs that you have submitted.
 */
export const listICD10CMInferenceJobs: API.OperationMethod<
  ListICD10CMInferenceJobsRequest,
  ListICD10CMInferenceJobsResponse,
  ListICD10CMInferenceJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListICD10CMInferenceJobsRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<ListICD10CMInferenceJobsResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListICD10CMInferenceJobs",
}));

export type ListPHIDetectionJobsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of protected health information (PHI) detection jobs you have
 * submitted.
 */
export const listPHIDetectionJobs: API.OperationMethod<
  ListPHIDetectionJobsRequest,
  ListPHIDetectionJobsResponse,
  ListPHIDetectionJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<ListPHIDetectionJobsRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<ListPHIDetectionJobsResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPHIDetectionJobs",
}));

export type ListRxNormInferenceJobsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of InferRxNorm jobs that you have submitted.
 */
export const listRxNormInferenceJobs: API.OperationMethod<
  ListRxNormInferenceJobsRequest,
  ListRxNormInferenceJobsResponse,
  ListRxNormInferenceJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<ListRxNormInferenceJobsRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<ListRxNormInferenceJobsResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRxNormInferenceJobs",
}));

export type ListSNOMEDCTInferenceJobsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of InferSNOMEDCT jobs a user has submitted.
 */
export const listSNOMEDCTInferenceJobs: API.OperationMethod<
  ListSNOMEDCTInferenceJobsRequest,
  ListSNOMEDCTInferenceJobsResponse,
  ListSNOMEDCTInferenceJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListSNOMEDCTInferenceJobsRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<ListSNOMEDCTInferenceJobsResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSNOMEDCTInferenceJobs",
}));

export type StartEntitiesDetectionV2JobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an asynchronous medical entity detection job for a collection of documents. Use the
 * `DescribeEntitiesDetectionV2Job` operation to track the status of a job.
 */
export const startEntitiesDetectionV2Job: API.OperationMethod<
  StartEntitiesDetectionV2JobRequest,
  StartEntitiesDetectionV2JobResponse,
  StartEntitiesDetectionV2JobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<StartEntitiesDetectionV2JobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StartEntitiesDetectionV2JobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEntitiesDetectionV2Job",
}));

export type StartICD10CMInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an asynchronous job to detect medical conditions and link them to the ICD-10-CM
 * ontology. Use the `DescribeICD10CMInferenceJob` operation to track the status of a
 * job.
 */
export const startICD10CMInferenceJob: API.OperationMethod<
  StartICD10CMInferenceJobRequest,
  StartICD10CMInferenceJobResponse,
  StartICD10CMInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<StartICD10CMInferenceJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StartICD10CMInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartICD10CMInferenceJob",
}));

export type StartPHIDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an asynchronous job to detect protected health information (PHI). Use the
 * `DescribePHIDetectionJob` operation to track the status of a job.
 */
export const startPHIDetectionJob: API.OperationMethod<
  StartPHIDetectionJobRequest,
  StartPHIDetectionJobResponse,
  StartPHIDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<StartPHIDetectionJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StartPHIDetectionJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPHIDetectionJob",
}));

export type StartRxNormInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an asynchronous job to detect medication entities and link them to the RxNorm
 * ontology. Use the `DescribeRxNormInferenceJob` operation to track the status of a
 * job.
 */
export const startRxNormInferenceJob: API.OperationMethod<
  StartRxNormInferenceJobRequest,
  StartRxNormInferenceJobResponse,
  StartRxNormInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<StartRxNormInferenceJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StartRxNormInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRxNormInferenceJob",
}));

export type StartSNOMEDCTInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an asynchronous job to detect medical concepts and link them to the SNOMED-CT ontology. Use the DescribeSNOMEDCTInferenceJob operation to track the status of a job.
 */
export const startSNOMEDCTInferenceJob: API.OperationMethod<
  StartSNOMEDCTInferenceJobRequest,
  StartSNOMEDCTInferenceJobResponse,
  StartSNOMEDCTInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<StartSNOMEDCTInferenceJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StartSNOMEDCTInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSNOMEDCTInferenceJob",
}));

export type StopEntitiesDetectionV2JobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a medical entities detection job in progress.
 */
export const stopEntitiesDetectionV2Job: API.OperationMethod<
  StopEntitiesDetectionV2JobRequest,
  StopEntitiesDetectionV2JobResponse,
  StopEntitiesDetectionV2JobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<StopEntitiesDetectionV2JobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StopEntitiesDetectionV2JobResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEntitiesDetectionV2Job",
}));

export type StopICD10CMInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops an InferICD10CM inference job in progress.
 */
export const stopICD10CMInferenceJob: API.OperationMethod<
  StopICD10CMInferenceJobRequest,
  StopICD10CMInferenceJobResponse,
  StopICD10CMInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<StopICD10CMInferenceJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StopICD10CMInferenceJobResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopICD10CMInferenceJob",
}));

export type StopPHIDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a protected health information (PHI) detection job in progress.
 */
export const stopPHIDetectionJob: API.OperationMethod<
  StopPHIDetectionJobRequest,
  StopPHIDetectionJobResponse,
  StopPHIDetectionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<StopPHIDetectionJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StopPHIDetectionJobResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPHIDetectionJob",
}));

export type StopRxNormInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops an InferRxNorm inference job in progress.
 */
export const stopRxNormInferenceJob: API.OperationMethod<
  StopRxNormInferenceJobRequest,
  StopRxNormInferenceJobResponse,
  StopRxNormInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<StopRxNormInferenceJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StopRxNormInferenceJobResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRxNormInferenceJob",
}));

export type StopSNOMEDCTInferenceJobError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops an InferSNOMEDCT inference job in progress.
 */
export const stopSNOMEDCTInferenceJob: API.OperationMethod<
  StopSNOMEDCTInferenceJobRequest,
  StopSNOMEDCTInferenceJobResponse,
  StopSNOMEDCTInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<StopSNOMEDCTInferenceJobRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<StopSNOMEDCTInferenceJobResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSNOMEDCTInferenceJob",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePHIDetectionJobRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRxNormInferenceJobRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSNOMEDCTInferenceJobRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetectEntitiesRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Attribute: S.optional(__S(40, __c5, 0)) }),
      ).annotate({ identifier: "UnmappedAttribute" });
    case 1:
      return S.Array(__S(32, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Entities: __S(43, __c5, 3),
          UnmappedAttributes: S.optional(__S(33, __c4, 1)),
          PaginationToken: S.optional(S.String),
          ModelVersion: S.String,
        }),
      ).annotate({ identifier: "DetectEntitiesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          RelationshipScore: S.optional(S.Number),
          RelationshipType: S.optional(S.String),
          Id: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Text: S.optional(S.String),
          Category: S.optional(S.String),
          Traits: S.optional(__S(49, __c6, 1)),
        }),
      ).annotate({ identifier: "Attribute" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Score: S.optional(S.Number),
          Text: S.optional(S.String),
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Traits: S.optional(__S(49, __c6, 1)),
          Attributes: S.optional(__S(41, __c5, 1)),
        }),
      ).annotate({ identifier: "Entity" });
    case 3:
      return S.Array(__S(42, __c5, 2));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Score: S.optional(S.Number) }),
      ).annotate({ identifier: "Trait" });
    case 1:
      return S.Array(__S(48, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetectEntitiesV2Request" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetectPHIRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Entities: __S(43, __c5, 3),
          PaginationToken: S.optional(S.String),
          ModelVersion: S.String,
        }),
      ).annotate({ identifier: "DetectPHIResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InferICD10CMRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          RelationshipScore: S.optional(S.Number),
          Id: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Text: S.optional(S.String),
          Traits: S.optional(__S(49, __c6, 1)),
          Category: S.optional(S.String),
          RelationshipType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ICD10CMAttribute" });
    case 2:
      return S.Array(__S(73, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.Number),
          Text: S.optional(S.String),
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Attributes: S.optional(__S(74, __c9, 2)),
          Traits: S.optional(__S(49, __c6, 1)),
          ICD10CMConcepts: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "ICD10CMEntity" });
    case 4:
      return S.Array(__S(75, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Entities: __S(76, __c9, 4),
          PaginationToken: S.optional(S.String),
          ModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "InferICD10CMResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Code: S.optional(S.String),
          Score: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ICD10CMConcept" });
    case 1:
      return S.Array(__S(80, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InferRxNormRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          RelationshipScore: S.optional(S.Number),
          Id: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Text: S.optional(S.String),
          Traits: S.optional(__S(49, __c6, 1)),
        }),
      ).annotate({ identifier: "RxNormAttribute" });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.Number),
          Text: S.optional(S.String),
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Attributes: S.optional(__S(90, __c11, 2)),
          Traits: S.optional(__S(49, __c6, 1)),
          RxNormConcepts: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "RxNormEntity" });
    case 4:
      return S.Array(__S(91, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Entities: __S(92, __c11, 4),
          PaginationToken: S.optional(S.String),
          ModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "InferRxNormResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InferSNOMEDCTRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          RelationshipScore: S.optional(S.Number),
          RelationshipType: S.optional(S.String),
          Id: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Text: S.optional(S.String),
          Traits: S.optional(__S(49, __c6, 1)),
          SNOMEDCTConcepts: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "SNOMEDCTAttribute" });
    case 2:
      return S.Array(__S(97, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.Number),
          Text: S.optional(S.String),
          Category: S.optional(S.String),
          Type: S.optional(S.String),
          Score: S.optional(S.Number),
          BeginOffset: S.optional(S.Number),
          EndOffset: S.optional(S.Number),
          Attributes: S.optional(__S(98, __c12, 2)),
          Traits: S.optional(__S(49, __c6, 1)),
          SNOMEDCTConcepts: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "SNOMEDCTEntity" });
    case 4:
      return S.Array(__S(99, __c12, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Edition: S.optional(S.String),
          Language: S.optional(S.String),
          VersionDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "SNOMEDCTDetails" });
    case 6:
      return S.suspend(() => S.Struct({ OriginalTextCharacters: S.optional(S.Number) })).annotate({
        identifier: "Characters",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Entities: __S(100, __c12, 4),
          PaginationToken: S.optional(S.String),
          ModelVersion: S.optional(S.String),
          SNOMEDCTDetails: S.optional(__S(101, __c12, 5)),
          Characters: S.optional(__S(102, __c12, 6)),
        }),
      ).annotate({ identifier: "InferSNOMEDCTResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(112, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEntitiesDetectionV2JobsRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          JobStatus: S.optional(S.String),
          SubmitTimeBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubmitTimeAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ComprehendMedicalAsyncJobFilter" });
    case 1:
      return S.Array(__S(256, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComprehendMedicalAsyncJobPropertiesList: S.optional(__S(113, __c14, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEntitiesDetectionV2JobsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(112, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListICD10CMInferenceJobsRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(112, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPHIDetectionJobsRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(112, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRxNormInferenceJobsRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(112, __c14, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSNOMEDCTInferenceJobsRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDataConfig: __S(264, __c33, 0),
          OutputDataConfig: __S(264, __c33, 0),
          DataAccessRoleArn: S.String,
          JobName: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          KMSKey: S.optional(S.String),
          LanguageCode: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartEntitiesDetectionV2JobRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ JobId: S.optional(S.String) })).annotate({
        identifier: "StartEntitiesDetectionV2JobResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDataConfig: __S(264, __c33, 0),
          OutputDataConfig: __S(264, __c33, 0),
          DataAccessRoleArn: S.String,
          JobName: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          KMSKey: S.optional(S.String),
          LanguageCode: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartICD10CMInferenceJobRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDataConfig: __S(264, __c33, 0),
          OutputDataConfig: __S(264, __c33, 0),
          DataAccessRoleArn: S.String,
          JobName: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          KMSKey: S.optional(S.String),
          LanguageCode: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartPHIDetectionJobRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDataConfig: __S(264, __c33, 0),
          OutputDataConfig: __S(264, __c33, 0),
          DataAccessRoleArn: S.String,
          JobName: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          KMSKey: S.optional(S.String),
          LanguageCode: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartRxNormInferenceJobRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InputDataConfig: __S(264, __c33, 0),
          OutputDataConfig: __S(264, __c33, 0),
          DataAccessRoleArn: S.String,
          JobName: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          KMSKey: S.optional(S.String),
          LanguageCode: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSNOMEDCTInferenceJobRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopEntitiesDetectionV2JobRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopICD10CMInferenceJobRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopPHIDetectionJobRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopRxNormInferenceJobRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopSNOMEDCTInferenceJobRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEntitiesDetectionV2JobRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ComprehendMedicalAsyncJobProperties: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "DescribeEntitiesDetectionV2JobResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          JobName: S.optional(S.String),
          JobStatus: S.optional(S.String),
          Message: S.optional(S.String),
          SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InputDataConfig: S.optional(__S(264, __c33, 0)),
          OutputDataConfig: S.optional(__S(264, __c33, 0)),
          LanguageCode: S.optional(S.String),
          DataAccessRoleArn: S.optional(S.String),
          ManifestFilePath: S.optional(S.String),
          KMSKey: S.optional(S.String),
          ModelVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComprehendMedicalAsyncJobProperties" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.String, S3Key: S.optional(S.String) }),
      ).annotate({ identifier: "InputDataConfig" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeICD10CMInferenceJobRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
