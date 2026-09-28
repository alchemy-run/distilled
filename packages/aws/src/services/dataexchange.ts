import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "DataExchange",
  target: "DataExchange",
  version: "2017-07-25",
  sigv4: "dataexchange",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://dataexchange.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://dataexchange.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLimitExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly LimitName?: string;
    readonly LimitValue?: number;
    readonly message: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string; readonly ExceptionCause?: string }> {}
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
export type ListOfRedshiftDataShareAssetSourceEntry =
  RedshiftDataShareAssetSourceEntry[];
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
export type ListOfReceivedDataGrantSummariesEntry =
  ReceivedDataGrantSummariesEntry[];
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
  descriptor: {
    service: svc,
    http: "POST /v1/data-grants/{DataGrantArn}/accept",
    input: { DataGrantArn: 0 },
    output: {
      AcceptedAt: D.ts,
      EndsAt: D.ts,
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/jobs/{JobId}",
    input: { JobId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/data-grants",
    input: {
      Name: 0,
      GrantDistributionScope: 0,
      ReceiverPrincipal: 0,
      SourceDataSetId: 0,
      EndsAt: D.tsAs("date-time"),
      Description: 0,
      Tags: 0,
    },
    output: {
      AcceptedAt: D.ts,
      EndsAt: D.ts,
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/data-sets",
    input: { AssetType: 0, Description: 0, Name: 0, Tags: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/event-actions",
    input: {
      Action: i_Action,
      Event: { RevisionPublished: { DataSetId: 0 } },
      Tags: 0,
    },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/jobs",
    input: {
      AssetConfiguration: { Tags: D.list({ Key: 0, Value: 0 }) },
      Details: {
        ExportAssetToSignedUrl: { AssetId: 0, DataSetId: 0, RevisionId: 0 },
        ExportAssetsToS3: {
          AssetDestinations: D.list({ AssetId: 0, Bucket: 0, Key: 0 }),
          DataSetId: 0,
          Encryption: i_ExportServerSideEncryption,
          RevisionId: 0,
        },
        ExportRevisionsToS3: {
          DataSetId: 0,
          Encryption: i_ExportServerSideEncryption,
          RevisionDestinations: D.list({
            Bucket: 0,
            KeyPattern: 0,
            RevisionId: 0,
          }),
        },
        ImportAssetFromSignedUrl: {
          AssetName: 0,
          DataSetId: 0,
          Md5Hash: 0,
          RevisionId: 0,
        },
        ImportAssetsFromS3: {
          AssetSources: D.list({ Bucket: 0, Key: 0 }),
          DataSetId: 0,
          RevisionId: 0,
        },
        ImportAssetsFromRedshiftDataShares: {
          AssetSources: D.list({ DataShareArn: 0 }),
          DataSetId: 0,
          RevisionId: 0,
        },
        ImportAssetFromApiGatewayApi: {
          ApiDescription: 0,
          ApiId: 0,
          ApiKey: 0,
          ApiName: 0,
          ApiSpecificationMd5Hash: 0,
          DataSetId: 0,
          ProtocolType: 0,
          RevisionId: 0,
          Stage: 0,
        },
        CreateS3DataAccessFromS3Bucket: {
          AssetSource: {
            Bucket: 0,
            KeyPrefixes: 0,
            Keys: 0,
            KmsKeysToGrant: D.list({ KmsKeyArn: 0 }),
          },
          DataSetId: 0,
          RevisionId: 0,
        },
        ImportAssetsFromLakeFormationTagPolicy: {
          CatalogId: 0,
          Database: { Expression: D.list(i_LFTag), Permissions: 0 },
          Table: { Expression: D.list(i_LFTag), Permissions: 0 },
          RoleArn: 0,
          DataSetId: 0,
          RevisionId: 0,
        },
      },
      Type: 0,
    },
    output: { CreatedAt: D.ts, Details: o_ResponseDetails, UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/data-sets/{DataSetId}/revisions",
    input: { Comment: 0, DataSetId: 0, Tags: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts, RevokedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
    input: { AssetId: 0, DataSetId: 0, RevisionId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/data-grants/{DataGrantId}",
    input: { DataGrantId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/data-sets/{DataSetId}",
    input: { DataSetId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/event-actions/{EventActionId}",
    input: { EventActionId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventAction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/data-sets/{DataSetId}/revisions/{RevisionId}",
    input: { DataSetId: 0, RevisionId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
    input: { AssetId: 0, DataSetId: 0, RevisionId: 0 },
    output: { AssetDetails: o_AssetDetails, CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/data-grants/{DataGrantId}",
    input: { DataGrantId: 0 },
    output: {
      AcceptedAt: D.ts,
      EndsAt: D.ts,
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/data-sets/{DataSetId}",
    input: { DataSetId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/event-actions/{EventActionId}",
    input: { EventActionId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventAction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/jobs/{JobId}",
    input: { JobId: 0 },
    output: { CreatedAt: D.ts, Details: o_ResponseDetails, UpdatedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/received-data-grants/{DataGrantArn}",
    input: { DataGrantArn: 0 },
    output: {
      AcceptedAt: D.ts,
      EndsAt: D.ts,
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/data-sets/{DataSetId}/revisions/{RevisionId}",
    input: { DataSetId: 0, RevisionId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts, RevokedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevision",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/data-grants",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      DataGrantSummaries: D.list({
        AcceptedAt: D.ts,
        EndsAt: D.ts,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/data-sets/{DataSetId}/revisions",
    input: {
      DataSetId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Revisions: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts, RevokedAt: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/data-sets",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Origin: D.m({ query: "origin" }),
    },
    output: { DataSets: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/event-actions",
    input: {
      EventSourceId: D.m({ query: "eventSourceId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { EventActions: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/jobs",
    input: {
      DataSetId: D.m({ query: "dataSetId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RevisionId: D.m({ query: "revisionId" }),
    },
    output: {
      Jobs: D.list({
        CreatedAt: D.ts,
        Details: o_ResponseDetails,
        UpdatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/received-data-grants",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      AcceptanceState: D.m({ query: "acceptanceState" }),
    },
    output: {
      DataGrantSummaries: D.list({
        AcceptedAt: D.ts,
        EndsAt: D.ts,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets",
    input: {
      DataSetId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RevisionId: 0,
    },
    output: {
      Assets: D.list({
        AssetDetails: o_AssetDetails,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/data-sets/{DataSetId}/revisions/{RevisionId}/revoke",
    input: { DataSetId: 0, RevisionId: 0, RevocationComment: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts, RevokedAt: D.ts },
    body: true,
  },
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
})) as any;

export type SendApiAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation invokes an API Gateway API asset. The request is proxied to the provider’s API Gateway API.
 */
export const sendApiAsset: API.OperationMethod<
  SendApiAssetRequest,
  SendApiAssetResponse,
  SendApiAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1",
    input: {
      Body: D.m({ payload: true, shape: D.text }),
      QueryStringParameters: D.m({ queryParams: true }),
      AssetId: D.m({ header: "x-amzn-dataexchange-asset-id" }),
      DataSetId: D.m({ header: "x-amzn-dataexchange-data-set-id" }),
      RequestHeaders: D.m({ prefix: "x-amzn-dataexchange-header-" }),
      Method: D.m({ header: "x-amzn-dataexchange-http-method" }),
      Path: D.m({ header: "x-amzn-dataexchange-path" }),
      RevisionId: D.m({ header: "x-amzn-dataexchange-revision-id" }),
    },
    output: {
      Body: D.m({ payload: true, shape: D.text }),
      ResponseHeaders: D.m({ prefix: "" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/data-sets/{DataSetId}/notification",
    input: {
      Scope: {
        LakeFormationTagPolicies: D.list({ Database: 0, Table: 0 }),
        RedshiftDataShares: D.list({
          Arn: 0,
          Database: 0,
          Function: 0,
          Table: 0,
          Schema: 0,
          View: 0,
        }),
        S3DataAccesses: D.list({ KeyPrefixes: 0, Keys: 0 }),
      },
      ClientToken: D.m({ idempotency: true }),
      Comment: 0,
      DataSetId: 0,
      Details: {
        DataUpdate: { DataUpdatedAt: D.tsAs("date-time") },
        Deprecation: { DeprecationAt: D.tsAs("date-time") },
        SchemaChange: {
          Changes: D.list({ Name: 0, Type: 0, Description: 0 }),
          SchemaChangeAt: D.tsAs("date-time"),
        },
      },
      Type: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/jobs/{JobId}",
    input: { JobId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
    input: { AssetId: 0, DataSetId: 0, Name: 0, RevisionId: 0 },
    output: { AssetDetails: o_AssetDetails, CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/data-sets/{DataSetId}",
    input: { DataSetId: 0, Description: 0, Name: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/event-actions/{EventActionId}",
    input: { Action: i_Action, EventActionId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/data-sets/{DataSetId}/revisions/{RevisionId}",
    input: { Comment: 0, DataSetId: 0, Finalized: 0, RevisionId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts, RevokedAt: D.ts },
    body: true,
  },
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
})) as any;

const i_Action: D.LazyStruct = () => ({
  ExportRevisionToS3: {
    Encryption: i_ExportServerSideEncryption,
    RevisionDestination: { Bucket: 0, KeyPattern: 0 },
  },
});
const i_ExportServerSideEncryption: D.LazyStruct = () => ({
  KmsKeyArn: 0,
  Type: 0,
});
const i_LFTag: D.LazyStruct = () => ({ TagKey: 0, TagValues: 0 });
const o_AssetDetails: D.LazyStruct = () => ({
  ApiGatewayApiAsset: {
    ApiKey: D.secret,
    ApiSpecificationDownloadUrlExpiresAt: D.ts,
  },
});
const o_ResponseDetails: D.LazyStruct = () => ({
  ExportAssetToSignedUrl: { SignedUrlExpiresAt: D.ts },
  ImportAssetFromSignedUrl: { SignedUrlExpiresAt: D.ts },
  ImportAssetFromApiGatewayApi: {
    ApiKey: D.secret,
    ApiSpecificationUploadUrlExpiresAt: D.ts,
  },
});
