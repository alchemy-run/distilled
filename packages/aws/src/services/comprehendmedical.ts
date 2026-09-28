import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "ComprehendMedical",
  target: "ComprehendMedical_20181030",
  version: "2018-10-30",
  sigv4: "comprehendmedical",
  protocol: awsJson1_1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://comprehendmedical.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://comprehendmedical.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidEncodingException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEncodingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class TextSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TextSizeLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ICD10CMRelationshipType =
  | "OVERLAP"
  | "SYSTEM_ORGAN_SITE"
  | "QUALITY"
  | (string & {});
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
export type ComprehendMedicalAsyncJobPropertiesList =
  ComprehendMedicalAsyncJobProperties[];
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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      ComprehendMedicalAsyncJobProperties:
        o_ComprehendMedicalAsyncJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntitiesDetectionV2Job",
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      ComprehendMedicalAsyncJobProperties:
        o_ComprehendMedicalAsyncJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeICD10CMInferenceJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      ComprehendMedicalAsyncJobProperties:
        o_ComprehendMedicalAsyncJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePHIDetectionJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      ComprehendMedicalAsyncJobProperties:
        o_ComprehendMedicalAsyncJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRxNormInferenceJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      ComprehendMedicalAsyncJobProperties:
        o_ComprehendMedicalAsyncJobProperties,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSNOMEDCTInferenceJob",
})) as any;

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
  descriptor: { service: svc, input: { Text: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Text: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Text: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Text: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Text: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Text: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Filter: i_ComprehendMedicalAsyncJobFilter,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComprehendMedicalAsyncJobPropertiesList: D.list(
        o_ComprehendMedicalAsyncJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitiesDetectionV2Jobs",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Filter: i_ComprehendMedicalAsyncJobFilter,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComprehendMedicalAsyncJobPropertiesList: D.list(
        o_ComprehendMedicalAsyncJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListICD10CMInferenceJobs",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Filter: i_ComprehendMedicalAsyncJobFilter,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComprehendMedicalAsyncJobPropertiesList: D.list(
        o_ComprehendMedicalAsyncJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPHIDetectionJobs",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Filter: i_ComprehendMedicalAsyncJobFilter,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComprehendMedicalAsyncJobPropertiesList: D.list(
        o_ComprehendMedicalAsyncJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRxNormInferenceJobs",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Filter: i_ComprehendMedicalAsyncJobFilter,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComprehendMedicalAsyncJobPropertiesList: D.list(
        o_ComprehendMedicalAsyncJobProperties,
      ),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSNOMEDCTInferenceJobs",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      KMSKey: 0,
      LanguageCode: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEntitiesDetectionV2Job",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      KMSKey: 0,
      LanguageCode: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartICD10CMInferenceJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      KMSKey: 0,
      LanguageCode: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPHIDetectionJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      KMSKey: 0,
      LanguageCode: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRxNormInferenceJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InputDataConfig: i_InputDataConfig,
      OutputDataConfig: i_OutputDataConfig,
      DataAccessRoleArn: 0,
      JobName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      KMSKey: 0,
      LanguageCode: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSNOMEDCTInferenceJob",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEntitiesDetectionV2Job",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopICD10CMInferenceJob",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPHIDetectionJob",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRxNormInferenceJob",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSNOMEDCTInferenceJob",
})) as any;

const i_ComprehendMedicalAsyncJobFilter: D.LazyStruct = () => ({
  JobName: 0,
  JobStatus: 0,
  SubmitTimeBefore: 0,
  SubmitTimeAfter: 0,
});
const i_InputDataConfig: D.LazyStruct = () => ({ S3Bucket: 0, S3Key: 0 });
const i_OutputDataConfig: D.LazyStruct = () => ({ S3Bucket: 0, S3Key: 0 });
const o_ComprehendMedicalAsyncJobProperties: D.LazyStruct = () => ({
  SubmitTime: D.ts,
  EndTime: D.ts,
  ExpirationTime: D.ts,
});
