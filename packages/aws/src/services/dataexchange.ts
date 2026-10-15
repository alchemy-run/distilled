import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "DataExchange",
  serviceShapeName: "DataExchange",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "dataexchange" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-07-25");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://dataexchange-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://dataexchange-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://dataexchange.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://dataexchange.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://dataexchange.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      LimitName: /*@__PURE__*/ S.optional(S.String),
      LimitValue: /*@__PURE__*/ S.optional(S.Number),
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ExceptionCause: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DataGrantArn = string;
export interface AcceptDataGrantRequest {
  DataGrantArn: string;
}
export type DataGrantName = string;
export type SenderPrincipal = string;
export type ReceiverPrincipal = string;
export type DataGrantDescription = string;
export type DataGrantAcceptanceState = string;
export type GrantDistributionScope = string;
export type Id = string;
export type Arn = string;
export interface AcceptDataGrantResponse {
  Name: string;
  SenderPrincipal?: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export interface CancelJobRequest {
  JobId: string;
}
export interface CancelJobResponse {}
export type Description = string;
export type MapOf__string = { [key: string]: string | undefined };
export interface CreateDataGrantRequest {
  Name: string;
  GrantDistributionScope: string;
  ReceiverPrincipal: string;
  SourceDataSetId: string;
  EndsAt?: Date;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDataGrantResponse {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  SourceDataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export type AssetType = string;
export type Name = string;
export interface CreateDataSetRequest {
  AssetType: string;
  Description: string;
  Name: string;
  Tags?: { [key: string]: string | undefined };
}
export type Origin = string;
export interface OriginDetails {
  ProductId?: string;
  DataGrantId?: string;
}
export interface CreateDataSetResponse {
  Arn?: string;
  AssetType?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  Name?: string;
  Origin?: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export type ServerSideEncryptionTypes = string;
export interface ExportServerSideEncryption {
  KmsKeyArn?: string;
  Type: string;
}
export interface AutoExportRevisionDestinationEntry {
  Bucket: string;
  KeyPattern?: string;
}
export interface AutoExportRevisionToS3RequestDetails {
  Encryption?: ExportServerSideEncryption;
  RevisionDestination: AutoExportRevisionDestinationEntry;
}
export interface Action {
  ExportRevisionToS3?: AutoExportRevisionToS3RequestDetails;
}
export interface RevisionPublished {
  DataSetId: string;
}
export interface Event {
  RevisionPublished?: RevisionPublished;
}
export interface CreateEventActionRequest {
  Action: Action;
  Event: Event;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateEventActionResponse {
  Action?: Action;
  Arn?: string;
  CreatedAt?: Date;
  Event?: Event;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export interface Tag {
  Key: string;
  Value: string;
}
export type ListOfTag = Tag[];
export interface AssetConfiguration {
  Tags?: Tag[];
}
export interface ExportAssetToSignedUrlRequestDetails {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
}
export interface AssetDestinationEntry {
  AssetId: string;
  Bucket: string;
  Key?: string;
}
export type ListOfAssetDestinationEntry = AssetDestinationEntry[];
export interface ExportAssetsToS3RequestDetails {
  AssetDestinations: AssetDestinationEntry[];
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionId: string;
}
export interface RevisionDestinationEntry {
  Bucket: string;
  KeyPattern?: string;
  RevisionId: string;
}
export type ListOfRevisionDestinationEntry = RevisionDestinationEntry[];
export interface ExportRevisionsToS3RequestDetails {
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionDestinations: RevisionDestinationEntry[];
}
export type AssetName = string;
export type __stringMin24Max24PatternAZaZ094AZaZ092AZaZ093 = string;
export interface ImportAssetFromSignedUrlRequestDetails {
  AssetName: string;
  DataSetId: string;
  Md5Hash: string;
  RevisionId: string;
}
export interface AssetSourceEntry {
  Bucket: string;
  Key: string;
}
export type ListOfAssetSourceEntry = AssetSourceEntry[];
export interface ImportAssetsFromS3RequestDetails {
  AssetSources: AssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export interface RedshiftDataShareAssetSourceEntry {
  DataShareArn: string;
}
export type ListOfRedshiftDataShareAssetSourceEntry = RedshiftDataShareAssetSourceEntry[];
export interface ImportAssetsFromRedshiftDataSharesRequestDetails {
  AssetSources: RedshiftDataShareAssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export type ApiDescription = string;
export type ProtocolType = string;
export interface ImportAssetFromApiGatewayApiRequestDetails {
  ApiDescription?: string;
  ApiId: string;
  ApiKey?: string | redacted.Redacted<string>;
  ApiName: string;
  ApiSpecificationMd5Hash: string;
  DataSetId: string;
  ProtocolType: string;
  RevisionId: string;
  Stage: string;
}
export type ListOf__string = string[];
export type KmsKeyArn = string;
export interface KmsKeyToGrant {
  KmsKeyArn: string;
}
export type ListOfKmsKeysToGrant = KmsKeyToGrant[];
export interface S3DataAccessAssetSourceEntry {
  Bucket: string;
  KeyPrefixes?: string[];
  Keys?: string[];
  KmsKeysToGrant?: KmsKeyToGrant[];
}
export interface CreateS3DataAccessFromS3BucketRequestDetails {
  AssetSource: S3DataAccessAssetSourceEntry;
  DataSetId: string;
  RevisionId: string;
}
export type AwsAccountId = string;
export type ListOfLFTagValues = string[];
export interface LFTag {
  TagKey: string;
  TagValues: string[];
}
export type ListOfLFTags = LFTag[];
export type DatabaseLFTagPolicyPermission = string;
export type ListOfDatabaseLFTagPolicyPermissions = string[];
export interface DatabaseLFTagPolicyAndPermissions {
  Expression: LFTag[];
  Permissions: string[];
}
export type TableTagPolicyLFPermission = string;
export type ListOfTableTagPolicyLFPermissions = string[];
export interface TableLFTagPolicyAndPermissions {
  Expression: LFTag[];
  Permissions: string[];
}
export type RoleArn = string;
export interface ImportAssetsFromLakeFormationTagPolicyRequestDetails {
  CatalogId: string;
  Database?: DatabaseLFTagPolicyAndPermissions;
  Table?: TableLFTagPolicyAndPermissions;
  RoleArn: string;
  DataSetId: string;
  RevisionId: string;
}
export interface RequestDetails {
  ExportAssetToSignedUrl?: ExportAssetToSignedUrlRequestDetails;
  ExportAssetsToS3?: ExportAssetsToS3RequestDetails;
  ExportRevisionsToS3?: ExportRevisionsToS3RequestDetails;
  ImportAssetFromSignedUrl?: ImportAssetFromSignedUrlRequestDetails;
  ImportAssetsFromS3?: ImportAssetsFromS3RequestDetails;
  ImportAssetsFromRedshiftDataShares?: ImportAssetsFromRedshiftDataSharesRequestDetails;
  ImportAssetFromApiGatewayApi?: ImportAssetFromApiGatewayApiRequestDetails;
  CreateS3DataAccessFromS3Bucket?: CreateS3DataAccessFromS3BucketRequestDetails;
  ImportAssetsFromLakeFormationTagPolicy?: ImportAssetsFromLakeFormationTagPolicyRequestDetails;
}
export type Type = string;
export interface CreateJobRequest {
  AssetConfiguration?: AssetConfiguration;
  Details: RequestDetails;
  Type: string;
}
export interface ExportAssetToSignedUrlResponseDetails {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
  SignedUrl?: string;
  SignedUrlExpiresAt?: Date;
}
export interface ExportAssetsToS3ResponseDetails {
  AssetDestinations: AssetDestinationEntry[];
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionId: string;
}
export interface ExportRevisionsToS3ResponseDetails {
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionDestinations: RevisionDestinationEntry[];
  EventActionArn?: string;
}
export interface ImportAssetFromSignedUrlResponseDetails {
  AssetName: string;
  DataSetId: string;
  Md5Hash?: string;
  RevisionId: string;
  SignedUrl?: string;
  SignedUrlExpiresAt?: Date;
}
export interface ImportAssetsFromS3ResponseDetails {
  AssetSources: AssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export interface ImportAssetsFromRedshiftDataSharesResponseDetails {
  AssetSources: RedshiftDataShareAssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export interface ImportAssetFromApiGatewayApiResponseDetails {
  ApiDescription?: string;
  ApiId: string;
  ApiKey?: string | redacted.Redacted<string>;
  ApiName: string;
  ApiSpecificationMd5Hash: string;
  ApiSpecificationUploadUrl: string;
  ApiSpecificationUploadUrlExpiresAt: Date;
  DataSetId: string;
  ProtocolType: string;
  RevisionId: string;
  Stage: string;
}
export interface CreateS3DataAccessFromS3BucketResponseDetails {
  AssetSource: S3DataAccessAssetSourceEntry;
  DataSetId: string;
  RevisionId: string;
}
export interface ImportAssetsFromLakeFormationTagPolicyResponseDetails {
  CatalogId: string;
  Database?: DatabaseLFTagPolicyAndPermissions;
  Table?: TableLFTagPolicyAndPermissions;
  RoleArn: string;
  DataSetId: string;
  RevisionId: string;
}
export interface ResponseDetails {
  ExportAssetToSignedUrl?: ExportAssetToSignedUrlResponseDetails;
  ExportAssetsToS3?: ExportAssetsToS3ResponseDetails;
  ExportRevisionsToS3?: ExportRevisionsToS3ResponseDetails;
  ImportAssetFromSignedUrl?: ImportAssetFromSignedUrlResponseDetails;
  ImportAssetsFromS3?: ImportAssetsFromS3ResponseDetails;
  ImportAssetsFromRedshiftDataShares?: ImportAssetsFromRedshiftDataSharesResponseDetails;
  ImportAssetFromApiGatewayApi?: ImportAssetFromApiGatewayApiResponseDetails;
  CreateS3DataAccessFromS3Bucket?: CreateS3DataAccessFromS3BucketResponseDetails;
  ImportAssetsFromLakeFormationTagPolicy?: ImportAssetsFromLakeFormationTagPolicyResponseDetails;
}
export type Code = string;
export interface ImportAssetFromSignedUrlJobErrorDetails {
  AssetName: string;
}
export interface Details {
  ImportAssetFromSignedUrlJobErrorDetails?: ImportAssetFromSignedUrlJobErrorDetails;
  ImportAssetsFromS3JobErrorDetails?: AssetSourceEntry[];
}
export type JobErrorLimitName = string;
export type JobErrorResourceTypes = string;
export interface JobError {
  Code: string;
  Details?: Details;
  LimitName?: string;
  LimitValue?: number;
  Message: string;
  ResourceId?: string;
  ResourceType?: string;
}
export type ListOfJobError = JobError[];
export type State = string;
export interface CreateJobResponse {
  Arn?: string;
  AssetConfiguration?: AssetConfiguration;
  CreatedAt?: Date;
  Details?: ResponseDetails;
  Errors?: JobError[];
  Id?: string;
  State?: string;
  Type?: string;
  UpdatedAt?: Date;
}
export type __stringMin0Max16384 = string;
export interface CreateRevisionRequest {
  Comment?: string;
  DataSetId: string;
  Tags?: { [key: string]: string | undefined };
}
export type __stringMin10Max512 = string;
export interface CreateRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export interface DeleteAssetRequest {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
}
export interface DeleteAssetResponse {}
export type DataGrantId = string;
export interface DeleteDataGrantRequest {
  DataGrantId: string;
}
export interface DeleteDataGrantResponse {}
export interface DeleteDataSetRequest {
  DataSetId: string;
}
export interface DeleteDataSetResponse {}
export interface DeleteEventActionRequest {
  EventActionId: string;
}
export interface DeleteEventActionResponse {}
export interface DeleteRevisionRequest {
  DataSetId: string;
  RevisionId: string;
}
export interface DeleteRevisionResponse {}
export interface GetAssetRequest {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
}
export type __doubleMin0 = number;
export interface S3SnapshotAsset {
  Size: number;
}
export interface RedshiftDataShareAsset {
  Arn: string;
}
export interface ApiGatewayApiAsset {
  ApiDescription?: string;
  ApiEndpoint?: string;
  ApiId?: string;
  ApiKey?: string | redacted.Redacted<string>;
  ApiName?: string;
  ApiSpecificationDownloadUrl?: string;
  ApiSpecificationDownloadUrlExpiresAt?: Date;
  ProtocolType?: string;
  Stage?: string;
}
export interface S3DataAccessAsset {
  Bucket: string;
  KeyPrefixes?: string[];
  Keys?: string[];
  S3AccessPointAlias?: string;
  S3AccessPointArn?: string;
  KmsKeysToGrant?: KmsKeyToGrant[];
}
export type LFResourceType = string;
export interface DatabaseLFTagPolicy {
  Expression: LFTag[];
}
export interface TableLFTagPolicy {
  Expression: LFTag[];
}
export interface LFResourceDetails {
  Database?: DatabaseLFTagPolicy;
  Table?: TableLFTagPolicy;
}
export interface LFTagPolicyDetails {
  CatalogId: string;
  ResourceType: string;
  ResourceDetails: LFResourceDetails;
}
export interface LakeFormationDataPermissionDetails {
  LFTagPolicy?: LFTagPolicyDetails;
}
export type LakeFormationDataPermissionType = string;
export type LFPermission = string;
export type ListOfLFPermissions = string[];
export interface LakeFormationDataPermissionAsset {
  LakeFormationDataPermissionDetails: LakeFormationDataPermissionDetails;
  LakeFormationDataPermissionType: string;
  Permissions: string[];
  RoleArn?: string;
}
export interface AssetDetails {
  S3SnapshotAsset?: S3SnapshotAsset;
  RedshiftDataShareAsset?: RedshiftDataShareAsset;
  ApiGatewayApiAsset?: ApiGatewayApiAsset;
  S3DataAccessAsset?: S3DataAccessAsset;
  LakeFormationDataPermissionAsset?: LakeFormationDataPermissionAsset;
}
export interface GetAssetResponse {
  Arn?: string;
  AssetDetails?: AssetDetails;
  AssetType?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Id?: string;
  Name?: string;
  RevisionId?: string;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export interface GetDataGrantRequest {
  DataGrantId: string;
}
export interface GetDataGrantResponse {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  SourceDataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetDataSetRequest {
  DataSetId: string;
}
export interface GetDataSetResponse {
  Arn?: string;
  AssetType?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  Name?: string;
  Origin?: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export interface GetEventActionRequest {
  EventActionId: string;
}
export interface GetEventActionResponse {
  Action?: Action;
  Arn?: string;
  CreatedAt?: Date;
  Event?: Event;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export interface GetJobRequest {
  JobId: string;
}
export interface GetJobResponse {
  Arn?: string;
  AssetConfiguration?: AssetConfiguration;
  CreatedAt?: Date;
  Details?: ResponseDetails;
  Errors?: JobError[];
  Id?: string;
  State?: string;
  Type?: string;
  UpdatedAt?: Date;
}
export interface GetReceivedDataGrantRequest {
  DataGrantArn: string;
}
export interface GetReceivedDataGrantResponse {
  Name: string;
  SenderPrincipal?: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export interface GetRevisionRequest {
  DataSetId: string;
  RevisionId: string;
}
export interface GetRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export type MaxResults = number;
export interface ListDataGrantsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface DataGrantSummaryEntry {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  DataSetId: string;
  SourceDataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export type ListOfDataGrantSummaryEntry = DataGrantSummaryEntry[];
export type NextToken = string;
export interface ListDataGrantsResponse {
  DataGrantSummaries?: DataGrantSummaryEntry[];
  NextToken?: string;
}
export interface ListDataSetRevisionsRequest {
  DataSetId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RevisionEntry {
  Arn: string;
  Comment?: string;
  CreatedAt: Date;
  DataSetId: string;
  Finalized?: boolean;
  Id: string;
  SourceId?: string;
  UpdatedAt: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export type ListOfRevisionEntry = RevisionEntry[];
export interface ListDataSetRevisionsResponse {
  NextToken?: string;
  Revisions?: RevisionEntry[];
}
export interface ListDataSetsRequest {
  MaxResults?: number;
  NextToken?: string;
  Origin?: string;
}
export interface DataSetEntry {
  Arn: string;
  AssetType: string;
  CreatedAt: Date;
  Description: string;
  Id: string;
  Name: string;
  Origin: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  UpdatedAt: Date;
}
export type ListOfDataSetEntry = DataSetEntry[];
export interface ListDataSetsResponse {
  DataSets?: DataSetEntry[];
  NextToken?: string;
}
export interface ListEventActionsRequest {
  EventSourceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface EventActionEntry {
  Action: Action;
  Arn: string;
  CreatedAt: Date;
  Event: Event;
  Id: string;
  UpdatedAt: Date;
}
export type ListOfEventActionEntry = EventActionEntry[];
export interface ListEventActionsResponse {
  EventActions?: EventActionEntry[];
  NextToken?: string;
}
export interface ListJobsRequest {
  DataSetId?: string;
  MaxResults?: number;
  NextToken?: string;
  RevisionId?: string;
}
export interface JobEntry {
  Arn: string;
  AssetConfiguration?: AssetConfiguration;
  CreatedAt: Date;
  Details: ResponseDetails;
  Errors?: JobError[];
  Id: string;
  State: string;
  Type: string;
  UpdatedAt: Date;
}
export type ListOfJobEntry = JobEntry[];
export interface ListJobsResponse {
  Jobs?: JobEntry[];
  NextToken?: string;
}
export type AcceptanceStateFilterValue = string;
export type AcceptanceStateFilterValues = string[];
export interface ListReceivedDataGrantsRequest {
  MaxResults?: number;
  NextToken?: string;
  AcceptanceState?: string[];
}
export interface ReceivedDataGrantSummariesEntry {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  DataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export type ListOfReceivedDataGrantSummariesEntry = ReceivedDataGrantSummariesEntry[];
export interface ListReceivedDataGrantsResponse {
  DataGrantSummaries?: ReceivedDataGrantSummariesEntry[];
  NextToken?: string;
}
export interface ListRevisionAssetsRequest {
  DataSetId: string;
  MaxResults?: number;
  NextToken?: string;
  RevisionId: string;
}
export interface AssetEntry {
  Arn: string;
  AssetDetails: AssetDetails;
  AssetType: string;
  CreatedAt: Date;
  DataSetId: string;
  Id: string;
  Name: string;
  RevisionId: string;
  SourceId?: string;
  UpdatedAt: Date;
}
export type ListOfAssetEntry = AssetEntry[];
export interface ListRevisionAssetsResponse {
  Assets?: AssetEntry[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface RevokeRevisionRequest {
  DataSetId: string;
  RevisionId: string;
  RevocationComment: string;
}
export interface RevokeRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export interface SendApiAssetRequest {
  Body?: string;
  QueryStringParameters?: { [key: string]: string | undefined };
  AssetId: string;
  DataSetId: string;
  RequestHeaders?: { [key: string]: string | undefined };
  Method?: string;
  Path?: string;
  RevisionId: string;
}
export interface SendApiAssetResponse {
  Body?: string;
  ResponseHeaders?: { [key: string]: string | undefined };
}
export interface LakeFormationTagPolicyDetails {
  Database?: string;
  Table?: string;
}
export type ListOfLakeFormationTagPolicies = LakeFormationTagPolicyDetails[];
export interface RedshiftDataShareDetails {
  Arn: string;
  Database: string;
  Function?: string;
  Table?: string;
  Schema?: string;
  View?: string;
}
export type ListOfRedshiftDataShares = RedshiftDataShareDetails[];
export interface S3DataAccessDetails {
  KeyPrefixes?: string[];
  Keys?: string[];
}
export type ListOfS3DataAccesses = S3DataAccessDetails[];
export interface ScopeDetails {
  LakeFormationTagPolicies?: LakeFormationTagPolicyDetails[];
  RedshiftDataShares?: RedshiftDataShareDetails[];
  S3DataAccesses?: S3DataAccessDetails[];
}
export type ClientToken = string;
export type __stringMin0Max4096 = string;
export interface DataUpdateRequestDetails {
  DataUpdatedAt?: Date;
}
export interface DeprecationRequestDetails {
  DeprecationAt: Date;
}
export type SchemaChangeType = string;
export interface SchemaChangeDetails {
  Name: string;
  Type: string;
  Description?: string;
}
export type ListOfSchemaChangeDetails = SchemaChangeDetails[];
export interface SchemaChangeRequestDetails {
  Changes?: SchemaChangeDetails[];
  SchemaChangeAt: Date;
}
export interface NotificationDetails {
  DataUpdate?: DataUpdateRequestDetails;
  Deprecation?: DeprecationRequestDetails;
  SchemaChange?: SchemaChangeRequestDetails;
}
export type NotificationType = string;
export interface SendDataSetNotificationRequest {
  Scope?: ScopeDetails;
  ClientToken?: string;
  Comment?: string;
  DataSetId: string;
  Details?: NotificationDetails;
  Type: string;
}
export interface SendDataSetNotificationResponse {}
export interface StartJobRequest {
  JobId: string;
}
export interface StartJobResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAssetRequest {
  AssetId: string;
  DataSetId: string;
  Name: string;
  RevisionId: string;
}
export interface UpdateAssetResponse {
  Arn?: string;
  AssetDetails?: AssetDetails;
  AssetType?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Id?: string;
  Name?: string;
  RevisionId?: string;
  SourceId?: string;
  UpdatedAt?: Date;
}
export interface UpdateDataSetRequest {
  DataSetId: string;
  Description?: string;
  Name?: string;
}
export interface UpdateDataSetResponse {
  Arn?: string;
  AssetType?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  Name?: string;
  Origin?: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  UpdatedAt?: Date;
}
export interface UpdateEventActionRequest {
  Action?: Action;
  EventActionId: string;
}
export interface UpdateEventActionResponse {
  Action?: Action;
  Arn?: string;
  CreatedAt?: Date;
  Event?: Event;
  Id?: string;
  UpdatedAt?: Date;
}
export interface UpdateRevisionRequest {
  Comment?: string;
  DataSetId: string;
  Finalized?: boolean;
  RevisionId: string;
}
export interface UpdateRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export type ResourceType = string;
export type ExceptionCause = string;
export type LimitName = string;
export type AcceptDataGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation accepts a data grant.
 */
export const acceptDataGrant: API.OperationMethod<
  AcceptDataGrantRequest,
  AcceptDataGrantResponse,
  AcceptDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<AcceptDataGrantRequest>,
  output: __S(1504, __c47, 0) as any as S.Schema<AcceptDataGrantResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDataGrant",
}));

export type CancelJobError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation cancels a job. Jobs can be cancelled only when they are in the WAITING state.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<CancelJobRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<CancelJobResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CreateDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a data grant.
 */
export const createDataGrant: API.OperationMethod<
  CreateDataGrantRequest,
  CreateDataGrantResponse,
  CreateDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<CreateDataGrantRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<CreateDataGrantResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataGrant",
}));

export type CreateDataSetError =
  | AccessDeniedException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a data set.
 */
export const createDataSet: API.OperationMethod<
  CreateDataSetRequest,
  CreateDataSetResponse,
  CreateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDataSetRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateDataSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSet",
}));

export type CreateEventActionError =
  | AccessDeniedException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates an event action.
 */
export const createEventAction: API.OperationMethod<
  CreateEventActionRequest,
  CreateEventActionResponse,
  CreateEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CreateEventActionRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<CreateEventActionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventAction",
}));

export type CreateJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a job.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(229, __c7, 5) as any as S.Schema<CreateJobRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<CreateJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateRevisionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a revision for a data set.
 */
export const createRevision: API.OperationMethod<
  CreateRevisionRequest,
  CreateRevisionResponse,
  CreateRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<CreateRevisionRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<CreateRevisionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRevision",
}));

export type DeleteAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes an asset.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<DeleteAssetRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteAssetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
}));

export type DeleteDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes a data grant.
 */
export const deleteDataGrant: API.OperationMethod<
  DeleteDataGrantRequest,
  DeleteDataGrantResponse,
  DeleteDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<DeleteDataGrantRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteDataGrantResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataGrant",
}));

export type DeleteDataSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes a data set.
 */
export const deleteDataSet: API.OperationMethod<
  DeleteDataSetRequest,
  DeleteDataSetResponse,
  DeleteDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<DeleteDataSetRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteDataSetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSet",
}));

export type DeleteEventActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes the event action.
 */
export const deleteEventAction: API.OperationMethod<
  DeleteEventActionRequest,
  DeleteEventActionResponse,
  DeleteEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<DeleteEventActionRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteEventActionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventAction",
}));

export type DeleteRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes a revision.
 */
export const deleteRevision: API.OperationMethod<
  DeleteRevisionRequest,
  DeleteRevisionResponse,
  DeleteRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<DeleteRevisionRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteRevisionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRevision",
}));

export type GetAssetError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about an asset.
 */
export const getAsset: API.OperationMethod<
  GetAssetRequest,
  GetAssetResponse,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<GetAssetRequest>,
  output: __S(609, __c19, 1) as any as S.Schema<GetAssetResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
}));

export type GetDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a data grant.
 */
export const getDataGrant: API.OperationMethod<
  GetDataGrantRequest,
  GetDataGrantResponse,
  GetDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<GetDataGrantRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<GetDataGrantResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataGrant",
}));

export type GetDataSetError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a data set.
 */
export const getDataSet: API.OperationMethod<
  GetDataSetRequest,
  GetDataSetResponse,
  GetDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetDataSetRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<GetDataSetResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSet",
}));

export type GetEventActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation retrieves information about an event action.
 */
export const getEventAction: API.OperationMethod<
  GetEventActionRequest,
  GetEventActionResponse,
  GetEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<GetEventActionRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<GetEventActionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventAction",
}));

export type GetJobError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<GetJobRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<GetJobResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetReceivedDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a received data grant.
 */
export const getReceivedDataGrant: API.OperationMethod<
  GetReceivedDataGrantRequest,
  GetReceivedDataGrantResponse,
  GetReceivedDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<GetReceivedDataGrantRequest>,
  output: __S(1504, __c47, 0) as any as S.Schema<GetReceivedDataGrantResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReceivedDataGrant",
}));

export type GetRevisionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a revision.
 */
export const getRevision: API.OperationMethod<
  GetRevisionRequest,
  GetRevisionResponse,
  GetRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetRevisionRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<GetRevisionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevision",
}));

export type ListDataGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about all data grants.
 */
export const listDataGrants: API.PaginatedOperationMethod<
  ListDataGrantsRequest,
  ListDataGrantsResponse,
  ListDataGrantsError,
  Credentials | HttpClient.HttpClient,
  DataGrantSummaryEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<ListDataGrantsRequest>,
  output: __S(867, __c27, 3) as any as S.Schema<ListDataGrantsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataGrants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataGrantSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSetRevisionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists a data set's revisions sorted by CreatedAt in descending order.
 */
export const listDataSetRevisions: API.PaginatedOperationMethod<
  ListDataSetRevisionsRequest,
  ListDataSetRevisionsResponse,
  ListDataSetRevisionsError,
  Credentials | HttpClient.HttpClient,
  RevisionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<ListDataSetRevisionsRequest>,
  output: __S(899, __c28, 3) as any as S.Schema<ListDataSetRevisionsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSetRevisions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Revisions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists your data sets. When listing by origin OWNED, results are sorted by CreatedAt in descending order. When listing by origin ENTITLED, there is no order.
 */
export const listDataSets: API.PaginatedOperationMethod<
  ListDataSetsRequest,
  ListDataSetsResponse,
  ListDataSetsError,
  Credentials | HttpClient.HttpClient,
  DataSetEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<ListDataSetsRequest>,
  output: __S(931, __c29, 3) as any as S.Schema<ListDataSetsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventActionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists your event actions.
 */
export const listEventActions: API.PaginatedOperationMethod<
  ListEventActionsRequest,
  ListEventActionsResponse,
  ListEventActionsError,
  Credentials | HttpClient.HttpClient,
  EventActionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<ListEventActionsRequest>,
  output: __S(963, __c30, 3) as any as S.Schema<ListEventActionsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists your jobs sorted by CreatedAt in descending order.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(995, __c31, 3) as any as S.Schema<ListJobsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReceivedDataGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about all received data grants.
 */
export const listReceivedDataGrants: API.PaginatedOperationMethod<
  ListReceivedDataGrantsRequest,
  ListReceivedDataGrantsResponse,
  ListReceivedDataGrantsError,
  Credentials | HttpClient.HttpClient,
  ReceivedDataGrantSummariesEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<ListReceivedDataGrantsRequest>,
  output: __S(1027, __c32, 3) as any as S.Schema<ListReceivedDataGrantsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedDataGrants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataGrantSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRevisionAssetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists a revision's assets sorted alphabetically in descending order.
 */
export const listRevisionAssets: API.PaginatedOperationMethod<
  ListRevisionAssetsRequest,
  ListRevisionAssetsResponse,
  ListRevisionAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<ListRevisionAssetsRequest>,
  output: __S(1059, __c33, 3) as any as S.Schema<ListRevisionAssetsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRevisionAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * This operation lists the tags on the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RevokeRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation revokes subscribers' access to a revision.
 */
export const revokeRevision: API.OperationMethod<
  RevokeRevisionRequest,
  RevokeRevisionResponse,
  RevokeRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<RevokeRevisionRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<RevokeRevisionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeRevision",
}));

export type SendApiAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation invokes an API Gateway API asset. The request is proxied to the provider's API Gateway API.
 */
export const sendApiAsset: API.OperationMethod<
  SendApiAssetRequest,
  SendApiAssetResponse,
  SendApiAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<SendApiAssetRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<SendApiAssetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendApiAsset",
  endpointHostPrefix: "api-fulfill.",
}));

export type SendDataSetNotificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The type of event associated with the data set.
 */
export const sendDataSetNotification: API.OperationMethod<
  SendDataSetNotificationRequest,
  SendDataSetNotificationResponse,
  SendDataSetNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1229, __c38, 13) as any as S.Schema<SendDataSetNotificationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<SendDataSetNotificationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDataSetNotification",
}));

export type StartJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation starts a job.
 */
export const startJob: API.OperationMethod<
  StartJobRequest,
  StartJobResponse,
  StartJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<StartJobRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<StartJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJob",
}));

export type TagResourceError = CommonErrors;
/**
 * This operation tags a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<TagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * This operation removes one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates an asset.
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<UpdateAssetRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<UpdateAssetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
}));

export type UpdateDataSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates a data set.
 */
export const updateDataSet: API.OperationMethod<
  UpdateDataSetRequest,
  UpdateDataSetResponse,
  UpdateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<UpdateDataSetRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<UpdateDataSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSet",
}));

export type UpdateEventActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates the event action.
 */
export const updateEventAction: API.OperationMethod<
  UpdateEventActionRequest,
  UpdateEventActionResponse,
  UpdateEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<UpdateEventActionRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<UpdateEventActionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventAction",
}));

export type UpdateRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates a revision.
 */
export const updateRevision: API.OperationMethod<
  UpdateRevisionRequest,
  UpdateRevisionResponse,
  UpdateRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<UpdateRevisionRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<UpdateRevisionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRevision",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetType: S.String,
          Description: S.String,
          Name: S.String,
          Tags: S.optional(__S(1632, __c51, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/data-sets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDataSetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssetType: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Origin: S.optional(S.String),
          OriginDetails: S.optional(__S(64, __c2, 0)),
          SourceId: S.optional(S.String),
          Tags: S.optional(__S(1632, __c51, 0)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateDataSetResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProductId: S.optional(S.String), DataGrantId: S.optional(S.String) }),
      ).annotate({ identifier: "OriginDetails" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Action: __S(194, __c6, 2),
          Event: __S(196, __c6, 4),
          Tags: S.optional(__S(1632, __c51, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/event-actions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEventActionRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KmsKeyArn: S.optional(S.String), Type: S.String }),
      ).annotate({ identifier: "ExportServerSideEncryption" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(194, __c6, 2)),
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Event: S.optional(__S(196, __c6, 4)),
          Id: S.optional(S.String),
          Tags: S.optional(__S(1632, __c51, 0)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateEventActionResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Bucket: S.String, KeyPattern: S.optional(S.String) }),
      ).annotate({ identifier: "AutoExportRevisionDestinationEntry" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(128, __c4, 0)),
          RevisionDestination: __S(192, __c6, 0),
        }),
      ).annotate({ identifier: "AutoExportRevisionToS3RequestDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ExportRevisionToS3: S.optional(__S(193, __c6, 1)) }),
      ).annotate({ identifier: "Action" });
    case 3:
      return S.suspend(() => S.Struct({ DataSetId: S.String })).annotate({
        identifier: "RevisionPublished",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ RevisionPublished: S.optional(__S(195, __c6, 3)) }),
      ).annotate({ identifier: "Event" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssetId: S.String, DataSetId: S.String, RevisionId: S.String }),
      ).annotate({ identifier: "ExportAssetToSignedUrlRequestDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String,
          Encryption: S.optional(__S(128, __c4, 0)),
          RevisionDestinations: __S(359, __c11, 7),
        }),
      ).annotate({ identifier: "ExportRevisionsToS3RequestDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AssetName: S.String,
          DataSetId: S.String,
          Md5Hash: S.String,
          RevisionId: S.String,
        }),
      ).annotate({ identifier: "ImportAssetFromSignedUrlRequestDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApiDescription: S.optional(S.String),
          ApiId: S.String,
          ApiKey: S.optional(SensitiveString),
          ApiName: S.String,
          ApiSpecificationMd5Hash: S.String,
          DataSetId: S.String,
          ProtocolType: S.String,
          RevisionId: S.String,
          Stage: S.String,
        }),
      ).annotate({ identifier: "ImportAssetFromApiGatewayApiRequestDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ExportAssetToSignedUrl: S.optional(__S(224, __c7, 0)),
          ExportAssetsToS3: S.optional(__S(357, __c11, 5)),
          ExportRevisionsToS3: S.optional(__S(225, __c7, 1)),
          ImportAssetFromSignedUrl: S.optional(__S(226, __c7, 2)),
          ImportAssetsFromS3: S.optional(__S(362, __c11, 10)),
          ImportAssetsFromRedshiftDataShares: S.optional(__S(365, __c11, 13)),
          ImportAssetFromApiGatewayApi: S.optional(__S(227, __c7, 3)),
          CreateS3DataAccessFromS3Bucket: S.optional(__S(367, __c11, 15)),
          ImportAssetsFromLakeFormationTagPolicy: S.optional(__S(369, __c11, 17)),
        }),
      ).annotate({ identifier: "RequestDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AssetConfiguration: S.optional(__S(354, __c11, 2)),
          Details: __S(228, __c7, 4),
          Type: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1/jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateJobRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KmsKeyArn: S.String })).annotate({
        identifier: "KmsKeyToGrant",
      });
    case 1:
      return S.Array(__S(288, __c9, 0));
    case 2:
      return S.suspend(() => S.Struct({ TagKey: S.String, TagValues: __S(256, __c8, 0) })).annotate(
        { identifier: "LFTag" },
      );
    case 3:
      return S.Array(__S(290, __c9, 2));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssetConfiguration: S.optional(__S(354, __c11, 2)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Details: S.optional(__S(374, __c11, 22)),
          Errors: S.optional(__S(378, __c11, 26)),
          Id: S.optional(S.String),
          State: S.optional(S.String),
          Type: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateJobResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(352, __c11, 0));
    case 2:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(353, __c11, 1)) })).annotate({
        identifier: "AssetConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ AssetId: S.String, Bucket: S.String, Key: S.optional(S.String) }),
      ).annotate({ identifier: "AssetDestinationEntry" });
    case 4:
      return S.Array(__S(355, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AssetDestinations: __S(356, __c11, 4),
          DataSetId: S.String,
          Encryption: S.optional(__S(128, __c4, 0)),
          RevisionId: S.String,
        }),
      ).annotate({ identifier: "ExportAssetsToS3RequestDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Bucket: S.String, KeyPattern: S.optional(S.String), RevisionId: S.String }),
      ).annotate({ identifier: "RevisionDestinationEntry" });
    case 7:
      return S.Array(__S(358, __c11, 6));
    case 8:
      return S.suspend(() => S.Struct({ Bucket: S.String, Key: S.String })).annotate({
        identifier: "AssetSourceEntry",
      });
    case 9:
      return S.Array(__S(360, __c11, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ AssetSources: __S(361, __c11, 9), DataSetId: S.String, RevisionId: S.String }),
      ).annotate({ identifier: "ImportAssetsFromS3RequestDetails" });
    case 11:
      return S.suspend(() => S.Struct({ DataShareArn: S.String })).annotate({
        identifier: "RedshiftDataShareAssetSourceEntry",
      });
    case 12:
      return S.Array(__S(363, __c11, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ AssetSources: __S(364, __c11, 12), DataSetId: S.String, RevisionId: S.String }),
      ).annotate({ identifier: "ImportAssetsFromRedshiftDataSharesRequestDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          KeyPrefixes: S.optional(__S(256, __c8, 0)),
          Keys: S.optional(__S(256, __c8, 0)),
          KmsKeysToGrant: S.optional(__S(289, __c9, 1)),
        }),
      ).annotate({ identifier: "S3DataAccessAssetSourceEntry" });
    case 15:
      return S.suspend(() =>
        S.Struct({ AssetSource: __S(366, __c11, 14), DataSetId: S.String, RevisionId: S.String }),
      ).annotate({ identifier: "CreateS3DataAccessFromS3BucketRequestDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Expression: __S(291, __c9, 3), Permissions: __S(256, __c8, 0) }),
      ).annotate({ identifier: "DatabaseLFTagPolicyAndPermissions" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          Database: S.optional(__S(368, __c11, 16)),
          Table: S.optional(__S(368, __c11, 16)),
          RoleArn: S.String,
          DataSetId: S.String,
          RevisionId: S.String,
        }),
      ).annotate({ identifier: "ImportAssetsFromLakeFormationTagPolicyRequestDetails" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          AssetId: S.String,
          DataSetId: S.String,
          RevisionId: S.String,
          SignedUrl: S.optional(S.String),
          SignedUrlExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExportAssetToSignedUrlResponseDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String,
          Encryption: S.optional(__S(128, __c4, 0)),
          RevisionDestinations: __S(359, __c11, 7),
          EventActionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExportRevisionsToS3ResponseDetails" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AssetName: S.String,
          DataSetId: S.String,
          Md5Hash: S.optional(S.String),
          RevisionId: S.String,
          SignedUrl: S.optional(S.String),
          SignedUrlExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ImportAssetFromSignedUrlResponseDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          ApiDescription: S.optional(S.String),
          ApiId: S.String,
          ApiKey: S.optional(SensitiveString),
          ApiName: S.String,
          ApiSpecificationMd5Hash: S.String,
          ApiSpecificationUploadUrl: S.String,
          ApiSpecificationUploadUrlExpiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          DataSetId: S.String,
          ProtocolType: S.String,
          RevisionId: S.String,
          Stage: S.String,
        }),
      ).annotate({ identifier: "ImportAssetFromApiGatewayApiResponseDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          ExportAssetToSignedUrl: S.optional(__S(370, __c11, 18)),
          ExportAssetsToS3: S.optional(__S(357, __c11, 5)),
          ExportRevisionsToS3: S.optional(__S(371, __c11, 19)),
          ImportAssetFromSignedUrl: S.optional(__S(372, __c11, 20)),
          ImportAssetsFromS3: S.optional(__S(362, __c11, 10)),
          ImportAssetsFromRedshiftDataShares: S.optional(__S(365, __c11, 13)),
          ImportAssetFromApiGatewayApi: S.optional(__S(373, __c11, 21)),
          CreateS3DataAccessFromS3Bucket: S.optional(__S(367, __c11, 15)),
          ImportAssetsFromLakeFormationTagPolicy: S.optional(__S(369, __c11, 17)),
        }),
      ).annotate({ identifier: "ResponseDetails" });
    case 23:
      return S.suspend(() => S.Struct({ AssetName: S.String })).annotate({
        identifier: "ImportAssetFromSignedUrlJobErrorDetails",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          ImportAssetFromSignedUrlJobErrorDetails: S.optional(__S(375, __c11, 23)),
          ImportAssetsFromS3JobErrorDetails: S.optional(__S(361, __c11, 9)),
        }),
      ).annotate({ identifier: "Details" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          Code: S.String,
          Details: S.optional(__S(376, __c11, 24)),
          LimitName: S.optional(S.String),
          LimitValue: S.optional(S.Number),
          Message: S.String,
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobError" });
    case 26:
      return S.Array(__S(377, __c11, 25));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          Tags: S.optional(__S(1632, __c51, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/data-sets/{DataSetId}/revisions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRevisionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Comment: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DataSetId: S.optional(S.String),
          Finalized: S.optional(S.Boolean),
          Id: S.optional(S.String),
          SourceId: S.optional(S.String),
          Tags: S.optional(__S(1632, __c51, 0)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          RevocationComment: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          RevokedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateRevisionResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetId: S.String.pipe(T.HttpLabel("AssetId")),
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataGrantId: S.String.pipe(T.HttpLabel("DataGrantId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/data-grants/{DataGrantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataGrantRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataSetId: S.String.pipe(T.HttpLabel("DataSetId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/data-sets/{DataSetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataSetRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventActionId: S.String.pipe(T.HttpLabel("EventActionId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/event-actions/{EventActionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventActionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRevisionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetId: S.String.pipe(T.HttpLabel("AssetId")),
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssetDetails: S.optional(__S(649, __c20, 9)),
          AssetType: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DataSetId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          RevisionId: S.optional(S.String),
          SourceId: S.optional(S.String),
          Tags: S.optional(__S(1632, __c51, 0)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetAssetResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Size: S.Number })).annotate({
        identifier: "S3SnapshotAsset",
      });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({
        identifier: "RedshiftDataShareAsset",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApiDescription: S.optional(S.String),
          ApiEndpoint: S.optional(S.String),
          ApiId: S.optional(S.String),
          ApiKey: S.optional(SensitiveString),
          ApiName: S.optional(S.String),
          ApiSpecificationDownloadUrl: S.optional(S.String),
          ApiSpecificationDownloadUrlExpiresAt: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ProtocolType: S.optional(S.String),
          Stage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApiGatewayApiAsset" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          KeyPrefixes: S.optional(__S(256, __c8, 0)),
          Keys: S.optional(__S(256, __c8, 0)),
          S3AccessPointAlias: S.optional(S.String),
          S3AccessPointArn: S.optional(S.String),
          KmsKeysToGrant: S.optional(__S(289, __c9, 1)),
        }),
      ).annotate({ identifier: "S3DataAccessAsset" });
    case 4:
      return S.suspend(() => S.Struct({ Expression: __S(291, __c9, 3) })).annotate({
        identifier: "DatabaseLFTagPolicy",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Database: S.optional(__S(644, __c20, 4)),
          Table: S.optional(__S(644, __c20, 4)),
        }),
      ).annotate({ identifier: "LFResourceDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          ResourceType: S.String,
          ResourceDetails: __S(645, __c20, 5),
        }),
      ).annotate({ identifier: "LFTagPolicyDetails" });
    case 7:
      return S.suspend(() => S.Struct({ LFTagPolicy: S.optional(__S(646, __c20, 6)) })).annotate({
        identifier: "LakeFormationDataPermissionDetails",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          LakeFormationDataPermissionDetails: __S(647, __c20, 7),
          LakeFormationDataPermissionType: S.String,
          Permissions: __S(256, __c8, 0),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "LakeFormationDataPermissionAsset" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          S3SnapshotAsset: S.optional(__S(640, __c20, 0)),
          RedshiftDataShareAsset: S.optional(__S(641, __c20, 1)),
          ApiGatewayApiAsset: S.optional(__S(642, __c20, 2)),
          S3DataAccessAsset: S.optional(__S(643, __c20, 3)),
          LakeFormationDataPermissionAsset: S.optional(__S(648, __c20, 8)),
        }),
      ).annotate({ identifier: "AssetDetails" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataGrantId: S.String.pipe(T.HttpLabel("DataGrantId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/data-grants/{DataGrantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataGrantRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataSetId: S.String.pipe(T.HttpLabel("DataSetId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/data-sets/{DataSetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSetRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventActionId: S.String.pipe(T.HttpLabel("EventActionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/event-actions/{EventActionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventActionRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/jobs/{JobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataGrantArn: S.String.pipe(T.HttpLabel("DataGrantArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/received-data-grants/{DataGrantArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReceivedDataGrantRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRevisionRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/data-grants" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDataGrantsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          SenderPrincipal: S.String,
          ReceiverPrincipal: S.String,
          AcceptanceState: S.String,
          AcceptedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DataSetId: S.String,
          SourceDataSetId: S.String,
          Id: S.String,
          Arn: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataGrantSummaryEntry" });
    case 2:
      return S.Array(__S(865, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DataGrantSummaries: S.optional(__S(866, __c27, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataGrantsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/data-sets/{DataSetId}/revisions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSetRevisionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Comment: S.optional(S.String),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          DataSetId: S.String,
          Finalized: S.optional(S.Boolean),
          Id: S.String,
          SourceId: S.optional(S.String),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          RevocationComment: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          RevokedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RevisionEntry" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Revisions: S.optional(__S(898, __c28, 2)) }),
      ).annotate({ identifier: "ListDataSetRevisionsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Origin: S.optional(S.String).pipe(T.HttpQuery("origin")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/data-sets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDataSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          AssetType: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Description: S.String,
          Id: S.String,
          Name: S.String,
          Origin: S.String,
          OriginDetails: S.optional(__S(64, __c2, 0)),
          SourceId: S.optional(S.String),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataSetEntry" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ DataSets: S.optional(__S(930, __c29, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSetsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventSourceId: S.optional(S.String).pipe(T.HttpQuery("eventSourceId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/event-actions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEventActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Action: __S(194, __c6, 2),
          Arn: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Event: __S(196, __c6, 4),
          Id: S.String,
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "EventActionEntry" });
    case 2:
      return S.Array(__S(961, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EventActions: S.optional(__S(962, __c30, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventActionsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.optional(S.String).pipe(T.HttpQuery("dataSetId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RevisionId: S.optional(S.String).pipe(T.HttpQuery("revisionId")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          AssetConfiguration: S.optional(__S(354, __c11, 2)),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Details: __S(374, __c11, 22),
          Errors: S.optional(__S(378, __c11, 26)),
          Id: S.String,
          State: S.String,
          Type: S.String,
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "JobEntry" });
    case 2:
      return S.Array(__S(993, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Jobs: S.optional(__S(994, __c31, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          AcceptanceState: S.optional(__S(256, __c8, 0)).pipe(T.HttpQuery("acceptanceState")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/received-data-grants" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReceivedDataGrantsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          SenderPrincipal: S.String,
          ReceiverPrincipal: S.String,
          AcceptanceState: S.String,
          AcceptedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DataSetId: S.String,
          Id: S.String,
          Arn: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ReceivedDataGrantSummariesEntry" });
    case 2:
      return S.Array(__S(1025, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DataGrantSummaries: S.optional(__S(1026, __c32, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListReceivedDataGrantsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRevisionAssetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          AssetDetails: __S(649, __c20, 9),
          AssetType: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          DataSetId: S.String,
          Id: S.String,
          Name: S.String,
          RevisionId: S.String,
          SourceId: S.optional(S.String),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AssetEntry" });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Assets: S.optional(__S(1058, __c33, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRevisionAssetsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(1632, __c51, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
          RevocationComment: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/revoke",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeRevisionRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Comment: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DataSetId: S.optional(S.String),
          Finalized: S.optional(S.Boolean),
          Id: S.optional(S.String),
          SourceId: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          RevocationComment: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          RevokedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RevokeRevisionResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(S.String).pipe(T.HttpPayload()),
          QueryStringParameters: S.optional(__S(1632, __c51, 0)).pipe(T.HttpQueryParams()),
          AssetId: S.String.pipe(T.HttpHeader("x-amzn-dataexchange-asset-id")),
          DataSetId: S.String.pipe(T.HttpHeader("x-amzn-dataexchange-data-set-id")),
          RequestHeaders: S.optional(__S(1632, __c51, 0)).pipe(
            T.HttpPrefixHeaders("x-amzn-dataexchange-header-"),
          ),
          Method: S.optional(S.String).pipe(T.HttpHeader("x-amzn-dataexchange-http-method")),
          Path: S.optional(S.String).pipe(T.HttpHeader("x-amzn-dataexchange-path")),
          RevisionId: S.String.pipe(T.HttpHeader("x-amzn-dataexchange-revision-id")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendApiAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(S.String).pipe(T.HttpPayload()),
          ResponseHeaders: S.optional(__S(1632, __c51, 0)).pipe(T.HttpPrefixHeaders("")),
        }),
      ).annotate({ identifier: "SendApiAssetResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Database: S.optional(S.String), Table: S.optional(S.String) }),
      ).annotate({ identifier: "LakeFormationTagPolicyDetails" });
    case 1:
      return S.Array(__S(1216, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Database: S.String,
          Function: S.optional(S.String),
          Table: S.optional(S.String),
          Schema: S.optional(S.String),
          View: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftDataShareDetails" });
    case 3:
      return S.Array(__S(1218, __c38, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          KeyPrefixes: S.optional(__S(256, __c8, 0)),
          Keys: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "S3DataAccessDetails" });
    case 5:
      return S.Array(__S(1220, __c38, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          LakeFormationTagPolicies: S.optional(__S(1217, __c38, 1)),
          RedshiftDataShares: S.optional(__S(1219, __c38, 3)),
          S3DataAccesses: S.optional(__S(1221, __c38, 5)),
        }),
      ).annotate({ identifier: "ScopeDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DataUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DataUpdateRequestDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({ DeprecationAt: T.DateFromString.pipe(T.TimestampFormat("date-time")) }),
      ).annotate({ identifier: "DeprecationRequestDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Type: S.String, Description: S.optional(S.String) }),
      ).annotate({ identifier: "SchemaChangeDetails" });
    case 10:
      return S.Array(__S(1225, __c38, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Changes: S.optional(__S(1226, __c38, 10)),
          SchemaChangeAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "SchemaChangeRequestDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          DataUpdate: S.optional(__S(1223, __c38, 7)),
          Deprecation: S.optional(__S(1224, __c38, 8)),
          SchemaChange: S.optional(__S(1227, __c38, 11)),
        }),
      ).annotate({ identifier: "NotificationDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Scope: S.optional(__S(1222, __c38, 6)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Comment: S.optional(S.String),
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          Details: S.optional(__S(1228, __c38, 12)),
          Type: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/data-sets/{DataSetId}/notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDataSetNotificationRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/v1/jobs/{JobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartJobRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(1632, __c51, 0),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(256, __c8, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetId: S.String.pipe(T.HttpLabel("AssetId")),
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          Name: S.String,
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssetDetails: S.optional(__S(649, __c20, 9)),
          AssetType: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DataSetId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          RevisionId: S.optional(S.String),
          SourceId: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UpdateAssetResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/data-sets/{DataSetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssetType: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Origin: S.optional(S.String),
          OriginDetails: S.optional(__S(64, __c2, 0)),
          SourceId: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UpdateDataSetResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(194, __c6, 2)),
          EventActionId: S.String.pipe(T.HttpLabel("EventActionId")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/event-actions/{EventActionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(194, __c6, 2)),
          Arn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Event: S.optional(__S(196, __c6, 4)),
          Id: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UpdateEventActionResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
          Finalized: S.optional(S.Boolean),
          RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRevisionRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataGrantArn: S.String.pipe(T.HttpLabel("DataGrantArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/data-grants/{DataGrantArn}/accept" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptDataGrantRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          SenderPrincipal: S.optional(S.String),
          ReceiverPrincipal: S.String,
          Description: S.optional(S.String),
          AcceptanceState: S.String,
          AcceptedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          GrantDistributionScope: S.String,
          DataSetId: S.String,
          Id: S.String,
          Arn: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AcceptDataGrantResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelJobResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          GrantDistributionScope: S.String,
          ReceiverPrincipal: S.String,
          SourceDataSetId: S.String,
          EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Tags: S.optional(__S(1632, __c51, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/data-grants" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDataGrantRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          SenderPrincipal: S.String,
          ReceiverPrincipal: S.String,
          Description: S.optional(S.String),
          AcceptanceState: S.String,
          AcceptedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          GrantDistributionScope: S.String,
          DataSetId: S.String,
          SourceDataSetId: S.String,
          Id: S.String,
          Arn: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Tags: S.optional(__S(1632, __c51, 0)),
        }),
      ).annotate({ identifier: "CreateDataGrantResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
