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
  sdkId: "Redshift Serverless",
  serviceShapeName: "RedshiftServerless",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "redshift-serverless" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-04-21");
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
              `https://redshift-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://redshift-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://redshift-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://redshift-serverless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://redshift-serverless.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DryRunException
  extends /*@__PURE__*/ S.TaggedError<DryRunException>()(
    "DryRunException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapacityException>()(
    "InsufficientCapacityException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidPaginationException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationException>()(
    "InvalidPaginationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class Ipv6CidrBlockNotFoundException
  extends /*@__PURE__*/ S.TaggedError<Ipv6CidrBlockNotFoundException>()(
    "Ipv6CidrBlockNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface ConvertRecoveryPointToSnapshotRequest {
  recoveryPointId: string;
  snapshotName: string;
  retentionPeriod?: number;
  tags?: Tag[];
}
export type SnapshotStatus = string;
export type KmsKeyId = string;
export type AccountIdList = string[];
export interface Snapshot {
  namespaceName?: string;
  namespaceArn?: string;
  snapshotName?: string;
  snapshotCreateTime?: Date;
  adminUsername?: string;
  status?: string;
  kmsKeyId?: string;
  ownerAccount?: string;
  totalBackupSizeInMegaBytes?: number;
  actualIncrementalBackupSizeInMegaBytes?: number;
  backupProgressInMegaBytes?: number;
  currentBackupRateInMegaBytesPerSecond?: number;
  estimatedSecondsToCompletion?: number;
  elapsedTimeInSeconds?: number;
  snapshotRetentionPeriod?: number;
  snapshotRemainingDays?: number;
  snapshotRetentionStartTime?: Date;
  snapshotArn?: string;
  accountsWithRestoreAccess?: string[];
  accountsWithProvisionedRestoreAccess?: string[];
  adminPasswordSecretArn?: string;
  adminPasswordSecretKmsKeyId?: string;
}
export interface ConvertRecoveryPointToSnapshotResponse {
  snapshot?: Snapshot;
}
export type WorkgroupName = string;
export type CustomDomainName = string;
export type CustomDomainCertificateArnString = string;
export interface CreateCustomDomainAssociationRequest {
  workgroupName: string;
  customDomainName: string;
  customDomainCertificateArn: string;
}
export interface CreateCustomDomainAssociationResponse {
  customDomainName?: string;
  workgroupName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
}
export type SubnetId = string;
export type SubnetIdList = string[];
export type VpcSecurityGroupId = string;
export type VpcSecurityGroupIdList = string[];
export type OwnerAccount = string;
export interface CreateEndpointAccessRequest {
  endpointName: string;
  subnetIds: string[];
  workgroupName: string;
  vpcSecurityGroupIds?: string[];
  ownerAccount?: string;
}
export interface VpcSecurityGroupMembership {
  vpcSecurityGroupId?: string;
  status?: string;
}
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export interface NetworkInterface {
  networkInterfaceId?: string;
  subnetId?: string;
  privateIpAddress?: string;
  availabilityZone?: string;
  ipv6Address?: string;
}
export type NetworkInterfaceList = NetworkInterface[];
export interface VpcEndpoint {
  vpcEndpointId?: string;
  vpcId?: string;
  networkInterfaces?: NetworkInterface[];
}
export interface EndpointAccess {
  endpointName?: string;
  endpointStatus?: string;
  workgroupName?: string;
  endpointCreateTime?: Date;
  port?: number;
  address?: string;
  subnetIds?: string[];
  vpcSecurityGroups?: VpcSecurityGroupMembership[];
  vpcEndpoint?: VpcEndpoint;
  endpointArn?: string;
}
export interface CreateEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export type NamespaceName = string;
export type DbUser = string | redacted.Redacted<string>;
export type DbPassword = string | redacted.Redacted<string>;
export type IamRoleArn = string;
export type IamRoleArnList = string[];
export type LogExport = string;
export type LogExportList = string[];
export type RedshiftIdcApplicationArn = string;
export interface CreateNamespaceRequest {
  namespaceName: string;
  adminUsername?: string | redacted.Redacted<string>;
  adminUserPassword?: string | redacted.Redacted<string>;
  dbName?: string;
  kmsKeyId?: string;
  defaultIamRoleArn?: string;
  iamRoles?: string[];
  logExports?: string[];
  tags?: Tag[];
  manageAdminPassword?: boolean;
  adminPasswordSecretKmsKeyId?: string;
  redshiftIdcApplicationArn?: string;
}
export type NamespaceStatus = string;
export type S3TableName = string;
export type S3TableNameList = string[];
export type S3TableGranularity = string;
export type S3TableLastIngestionTimeMap = { [key: string]: string | undefined };
export interface S3TablePublishStatus {
  s3Tables?: string[];
  s3TableNamespace?: string;
  s3TableGranularity?: string;
  enabledAll?: boolean;
  lastIngestionTimes?: { [key: string]: string | undefined };
}
export interface Namespace {
  namespaceArn?: string;
  namespaceId?: string;
  namespaceName?: string;
  adminUsername?: string | redacted.Redacted<string>;
  dbName?: string;
  kmsKeyId?: string;
  defaultIamRoleArn?: string;
  iamRoles?: string[];
  logExports?: string[];
  status?: string;
  creationDate?: Date;
  adminPasswordSecretArn?: string;
  adminPasswordSecretKmsKeyId?: string;
  lakehouseRegistrationStatus?: string;
  catalogArn?: string;
  s3TablePublishStatus?: S3TablePublishStatus;
}
export interface CreateNamespaceResponse {
  namespace?: Namespace;
}
export type Capacity = number;
export type OfferingId = string;
export interface CreateReservationRequest {
  capacity: number;
  offeringId: string;
  clientToken?: string;
}
export type ReservationId = string;
export type ReservationArn = string;
export type Duration = number;
export type Charge = number;
export type CurrencyCode = string;
export type OfferingType = string;
export interface ReservationOffering {
  offeringId?: string;
  duration?: number;
  upfrontCharge?: number;
  hourlyCharge?: number;
  currencyCode?: string;
  offeringType?: string;
}
export type Status = string;
export interface Reservation {
  reservationId?: string;
  reservationArn?: string;
  startDate?: Date;
  endDate?: Date;
  capacity?: number;
  offering?: ReservationOffering;
  status?: string;
}
export interface CreateReservationResponse {
  reservation?: Reservation;
}
export type ScheduledActionName = string;
export type SnapshotNamePrefix = string;
export interface CreateSnapshotScheduleActionParameters {
  namespaceName: string;
  snapshotNamePrefix: string;
  retentionPeriod?: number;
  tags?: Tag[];
}
export type TargetAction = { createSnapshot: CreateSnapshotScheduleActionParameters };
export type Schedule = { at: Date; cron?: never } | { at?: never; cron: string };
export interface CreateScheduledActionRequest {
  scheduledActionName: string;
  targetAction: TargetAction;
  schedule: Schedule;
  roleArn: string;
  namespaceName: string;
  enabled?: boolean;
  scheduledActionDescription?: string;
  startTime?: Date;
  endTime?: Date;
}
export type NextInvocationsList = Date[];
export type State = string;
export interface ScheduledActionResponse {
  scheduledActionName?: string;
  schedule?: Schedule;
  scheduledActionDescription?: string;
  nextInvocations?: Date[];
  roleArn?: string;
  state?: string;
  startTime?: Date;
  endTime?: Date;
  targetAction?: TargetAction;
  namespaceName?: string;
  scheduledActionUuid?: string;
}
export interface CreateScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export interface CreateSnapshotRequest {
  namespaceName: string;
  snapshotName: string;
  retentionPeriod?: number;
  tags?: Tag[];
}
export interface CreateSnapshotResponse {
  snapshot?: Snapshot;
}
export interface CreateSnapshotCopyConfigurationRequest {
  namespaceName: string;
  destinationRegion: string;
  snapshotRetentionPeriod?: number;
  destinationKmsKeyId?: string;
}
export interface SnapshotCopyConfiguration {
  snapshotCopyConfigurationId?: string;
  snapshotCopyConfigurationArn?: string;
  namespaceName?: string;
  destinationRegion?: string;
  snapshotRetentionPeriod?: number;
  destinationKmsKeyId?: string;
}
export interface CreateSnapshotCopyConfigurationResponse {
  snapshotCopyConfiguration: SnapshotCopyConfiguration;
}
export type UsageLimitUsageType = string;
export type UsageLimitPeriod = string;
export type UsageLimitBreachAction = string;
export interface CreateUsageLimitRequest {
  resourceArn: string;
  usageType: string;
  amount: number;
  period?: string;
  breachAction?: string;
}
export interface UsageLimit {
  usageLimitId?: string;
  usageLimitArn?: string;
  resourceArn?: string;
  usageType?: string;
  amount?: number;
  period?: string;
  breachAction?: string;
}
export interface CreateUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export type ParameterKey = string;
export type ParameterValue = string;
export interface ConfigParameter {
  parameterKey?: string;
  parameterValue?: string;
}
export type ConfigParameterList = ConfigParameter[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export type PerformanceTargetStatus = string;
export interface PerformanceTarget {
  status?: string;
  level?: number;
}
export type IpAddressType = string;
export type TrackName = string;
export interface CreateWorkgroupRequest {
  workgroupName: string;
  namespaceName: string;
  baseCapacity?: number;
  enhancedVpcRouting?: boolean;
  configParameters?: ConfigParameter[];
  securityGroupIds?: string[];
  subnetIds?: string[];
  publiclyAccessible?: boolean;
  tags?: Tag[];
  port?: number;
  maxCapacity?: number;
  pricePerformanceTarget?: PerformanceTarget;
  ipAddressType?: string;
  trackName?: string;
  extraComputeForAutomaticOptimization?: boolean;
}
export type WorkgroupStatus = string;
export type VpcEndpointList = VpcEndpoint[];
export interface Endpoint {
  address?: string;
  port?: number;
  vpcEndpoints?: VpcEndpoint[];
}
const Endpoint = /*@__PURE__*/ __L.at(__c1, 4) as any as S.Schema<Endpoint>;
export type VpcIds = string[];
export interface Workgroup {
  workgroupId?: string;
  workgroupArn?: string;
  workgroupName?: string;
  namespaceName?: string;
  baseCapacity?: number;
  enhancedVpcRouting?: boolean;
  configParameters?: ConfigParameter[];
  securityGroupIds?: string[];
  subnetIds?: string[];
  status?: string;
  endpoint?: Endpoint;
  publiclyAccessible?: boolean;
  creationDate?: Date;
  port?: number;
  customDomainName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
  workgroupVersion?: string;
  patchVersion?: string;
  maxCapacity?: number;
  crossAccountVpcs?: string[];
  ipAddressType?: string;
  pricePerformanceTarget?: PerformanceTarget;
  trackName?: string;
  pendingTrackName?: string;
  extraComputeForAutomaticOptimization?: boolean;
}
export interface CreateWorkgroupResponse {
  workgroup?: Workgroup;
}
export interface DeleteCustomDomainAssociationRequest {
  workgroupName: string;
  customDomainName: string;
}
export interface DeleteCustomDomainAssociationResponse {}
export interface DeleteEndpointAccessRequest {
  endpointName: string;
}
export interface DeleteEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export interface DeleteNamespaceRequest {
  namespaceName: string;
  finalSnapshotName?: string;
  finalSnapshotRetentionPeriod?: number;
}
export interface DeleteNamespaceResponse {
  namespace: Namespace;
}
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteScheduledActionRequest {
  scheduledActionName: string;
}
export interface DeleteScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export interface DeleteSnapshotRequest {
  snapshotName: string;
}
export interface DeleteSnapshotResponse {
  snapshot?: Snapshot;
}
export interface DeleteSnapshotCopyConfigurationRequest {
  snapshotCopyConfigurationId: string;
}
export interface DeleteSnapshotCopyConfigurationResponse {
  snapshotCopyConfiguration: SnapshotCopyConfiguration;
}
export interface DeleteUsageLimitRequest {
  usageLimitId: string;
}
export interface DeleteUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export interface DeleteWorkgroupRequest {
  workgroupName: string;
}
export interface DeleteWorkgroupResponse {
  workgroup: Workgroup;
}
export type DbName = string;
export interface GetCredentialsRequest {
  dbName?: string;
  durationSeconds?: number;
  workgroupName?: string;
  customDomainName?: string;
}
export interface GetCredentialsResponse {
  dbUser?: string | redacted.Redacted<string>;
  dbPassword?: string | redacted.Redacted<string>;
  expiration?: Date;
  nextRefreshTime?: Date;
}
export interface GetCustomDomainAssociationRequest {
  customDomainName: string;
  workgroupName: string;
}
export interface GetCustomDomainAssociationResponse {
  customDomainName?: string;
  workgroupName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
}
export interface GetEndpointAccessRequest {
  endpointName: string;
}
export interface GetEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export type WorkgroupNameList = string[];
export interface GetIdentityCenterAuthTokenRequest {
  workgroupNames: string[];
}
export interface GetIdentityCenterAuthTokenResponse {
  token?: string | redacted.Redacted<string>;
  expirationTime?: Date;
}
export interface GetNamespaceRequest {
  namespaceName: string;
}
export interface GetNamespaceResponse {
  namespace: Namespace;
}
export interface GetRecoveryPointRequest {
  recoveryPointId: string;
}
export interface RecoveryPoint {
  recoveryPointId?: string;
  recoveryPointCreateTime?: Date;
  totalSizeInMegaBytes?: number;
  namespaceName?: string;
  workgroupName?: string;
  namespaceArn?: string;
}
export interface GetRecoveryPointResponse {
  recoveryPoint?: RecoveryPoint;
}
export interface GetReservationRequest {
  reservationId: string;
}
export interface GetReservationResponse {
  reservation: Reservation;
}
export interface GetReservationOfferingRequest {
  offeringId: string;
}
export interface GetReservationOfferingResponse {
  reservationOffering: ReservationOffering;
}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export interface ResourcePolicy {
  resourceArn?: string;
  policy?: string;
}
export interface GetResourcePolicyResponse {
  resourcePolicy?: ResourcePolicy;
}
export interface GetScheduledActionRequest {
  scheduledActionName: string;
}
export interface GetScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export interface GetSnapshotRequest {
  snapshotName?: string;
  ownerAccount?: string;
  snapshotArn?: string;
}
export interface GetSnapshotResponse {
  snapshot?: Snapshot;
}
export interface GetTableRestoreStatusRequest {
  tableRestoreRequestId: string;
}
export interface TableRestoreStatus {
  tableRestoreRequestId?: string;
  status?: string;
  message?: string;
  requestTime?: Date;
  namespaceName?: string;
  workgroupName?: string;
  snapshotName?: string;
  progressInMegaBytes?: number;
  totalDataInMegaBytes?: number;
  sourceDatabaseName?: string;
  sourceSchemaName?: string;
  sourceTableName?: string;
  targetDatabaseName?: string;
  targetSchemaName?: string;
  newTableName?: string;
  recoveryPointId?: string;
}
export interface GetTableRestoreStatusResponse {
  tableRestoreStatus?: TableRestoreStatus;
}
export interface GetTrackRequest {
  trackName: string;
}
export interface UpdateTarget {
  trackName?: string;
  workgroupVersion?: string;
}
export type UpdateTargetsList = UpdateTarget[];
export interface ServerlessTrack {
  trackName?: string;
  workgroupVersion?: string;
  updateTargets?: UpdateTarget[];
}
export interface GetTrackResponse {
  track?: ServerlessTrack;
}
export interface GetUsageLimitRequest {
  usageLimitId: string;
}
export interface GetUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export interface GetWorkgroupRequest {
  workgroupName: string;
}
export interface GetWorkgroupResponse {
  workgroup: Workgroup;
}
export type PaginationToken = string;
export interface ListCustomDomainAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  customDomainName?: string;
  customDomainCertificateArn?: string;
}
export interface Association {
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
  customDomainName?: string;
  workgroupName?: string;
}
export type AssociationList = Association[];
export interface ListCustomDomainAssociationsResponse {
  nextToken?: string;
  associations?: Association[];
}
export interface ListEndpointAccessRequest {
  nextToken?: string;
  maxResults?: number;
  workgroupName?: string;
  vpcId?: string;
  ownerAccount?: string;
}
export type EndpointAccessList = EndpointAccess[];
export interface ListEndpointAccessResponse {
  nextToken?: string;
  endpoints: EndpointAccess[];
}
export type SourceArn = string;
export interface ListManagedWorkgroupsRequest {
  sourceArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ManagedWorkgroupName = string;
export type ManagedWorkgroupStatus =
  | "CREATING"
  | "DELETING"
  | "MODIFYING"
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | (string & {});
export interface ManagedWorkgroupListItem {
  managedWorkgroupName?: string;
  managedWorkgroupId?: string;
  sourceArn?: string;
  status?: ManagedWorkgroupStatus;
  creationDate?: Date;
}
export type ManagedWorkgroups = ManagedWorkgroupListItem[];
export interface ListManagedWorkgroupsResponse {
  nextToken?: string;
  managedWorkgroups?: ManagedWorkgroupListItem[];
}
export interface ListNamespacesRequest {
  nextToken?: string;
  maxResults?: number;
}
export type NamespaceList = Namespace[];
export interface ListNamespacesResponse {
  nextToken?: string;
  namespaces: Namespace[];
}
export interface ListRecoveryPointsRequest {
  nextToken?: string;
  maxResults?: number;
  startTime?: Date;
  endTime?: Date;
  namespaceName?: string;
  namespaceArn?: string;
}
export type RecoveryPointList = RecoveryPoint[];
export interface ListRecoveryPointsResponse {
  recoveryPoints?: RecoveryPoint[];
  nextToken?: string;
}
export interface ListReservationOfferingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type ReservationOfferingsList = ReservationOffering[];
export interface ListReservationOfferingsResponse {
  reservationOfferingsList: ReservationOffering[];
  nextToken?: string;
}
export interface ListReservationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type ReservationsList = Reservation[];
export interface ListReservationsResponse {
  reservationsList: Reservation[];
  nextToken?: string;
}
export interface ListScheduledActionsRequest {
  nextToken?: string;
  maxResults?: number;
  namespaceName?: string;
}
export interface ScheduledActionAssociation {
  namespaceName?: string;
  scheduledActionName?: string;
}
export type ScheduledActionsList = ScheduledActionAssociation[];
export interface ListScheduledActionsResponse {
  nextToken?: string;
  scheduledActions?: ScheduledActionAssociation[];
}
export interface ListSnapshotCopyConfigurationsRequest {
  namespaceName?: string;
  nextToken?: string;
  maxResults?: number;
}
export type SnapshotCopyConfigurations = SnapshotCopyConfiguration[];
export interface ListSnapshotCopyConfigurationsResponse {
  nextToken?: string;
  snapshotCopyConfigurations: SnapshotCopyConfiguration[];
}
export interface ListSnapshotsRequest {
  nextToken?: string;
  maxResults?: number;
  namespaceName?: string;
  namespaceArn?: string;
  ownerAccount?: string;
  startTime?: Date;
  endTime?: Date;
}
export type SnapshotList = Snapshot[];
export interface ListSnapshotsResponse {
  nextToken?: string;
  snapshots?: Snapshot[];
}
export interface ListTableRestoreStatusRequest {
  nextToken?: string;
  maxResults?: number;
  namespaceName?: string;
  workgroupName?: string;
}
export type TableRestoreStatusList = TableRestoreStatus[];
export interface ListTableRestoreStatusResponse {
  nextToken?: string;
  tableRestoreStatuses?: TableRestoreStatus[];
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface ListTracksRequest {
  nextToken?: string;
  maxResults?: number;
}
export type TrackList = ServerlessTrack[];
export interface ListTracksResponse {
  tracks?: ServerlessTrack[];
  nextToken?: string;
}
export interface ListUsageLimitsRequest {
  resourceArn?: string;
  usageType?: string;
  nextToken?: string;
  maxResults?: number;
}
export type UsageLimits = UsageLimit[];
export interface ListUsageLimitsResponse {
  usageLimits?: UsageLimit[];
  nextToken?: string;
}
export interface ListWorkgroupsRequest {
  nextToken?: string;
  maxResults?: number;
  ownerAccount?: string;
}
export type WorkgroupList = Workgroup[];
export interface ListWorkgroupsResponse {
  nextToken?: string;
  workgroups: Workgroup[];
}
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export interface PutResourcePolicyResponse {
  resourcePolicy?: ResourcePolicy;
}
export interface RestoreFromRecoveryPointRequest {
  recoveryPointId: string;
  namespaceName: string;
  workgroupName: string;
  maintainIntegration?: boolean;
}
export interface RestoreFromRecoveryPointResponse {
  recoveryPointId?: string;
  namespace?: Namespace;
}
export interface RestoreFromSnapshotRequest {
  namespaceName: string;
  workgroupName: string;
  snapshotName?: string;
  snapshotArn?: string;
  ownerAccount?: string;
  manageAdminPassword?: boolean;
  adminPasswordSecretKmsKeyId?: string;
  maintainIntegration?: boolean;
}
export interface RestoreFromSnapshotResponse {
  snapshotName?: string;
  ownerAccount?: string;
  namespace?: Namespace;
}
export interface RestoreTableFromRecoveryPointRequest {
  namespaceName: string;
  workgroupName: string;
  recoveryPointId: string;
  sourceDatabaseName: string;
  sourceSchemaName?: string;
  sourceTableName: string;
  targetDatabaseName?: string;
  targetSchemaName?: string;
  newTableName: string;
  activateCaseSensitiveIdentifier?: boolean;
}
export interface RestoreTableFromRecoveryPointResponse {
  tableRestoreStatus?: TableRestoreStatus;
}
export interface RestoreTableFromSnapshotRequest {
  namespaceName: string;
  workgroupName: string;
  snapshotName: string;
  sourceDatabaseName: string;
  sourceSchemaName?: string;
  sourceTableName: string;
  targetDatabaseName?: string;
  targetSchemaName?: string;
  newTableName: string;
  activateCaseSensitiveIdentifier?: boolean;
}
export interface RestoreTableFromSnapshotResponse {
  tableRestoreStatus?: TableRestoreStatus;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCustomDomainAssociationRequest {
  workgroupName: string;
  customDomainName: string;
  customDomainCertificateArn: string;
}
export interface UpdateCustomDomainAssociationResponse {
  customDomainName?: string;
  workgroupName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
}
export interface UpdateEndpointAccessRequest {
  endpointName: string;
  vpcSecurityGroupIds?: string[];
}
export interface UpdateEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export type LakehouseRegistration = string;
export type CatalogNameString = string;
export type LakehouseIdcRegistration = string;
export interface UpdateLakehouseConfigurationRequest {
  namespaceName: string;
  lakehouseRegistration?: string;
  catalogName?: string;
  lakehouseIdcRegistration?: string;
  lakehouseIdcApplicationArn?: string;
  dryRun?: boolean;
}
export interface UpdateLakehouseConfigurationResponse {
  namespaceName?: string;
  lakehouseIdcApplicationArn?: string;
  lakehouseRegistrationStatus?: string;
  catalogArn?: string;
}
export type LogDestinationType = string;
export type S3TableAction = string;
export interface UpdateNamespaceRequest {
  namespaceName: string;
  adminUserPassword?: string | redacted.Redacted<string>;
  adminUsername?: string | redacted.Redacted<string>;
  kmsKeyId?: string;
  defaultIamRoleArn?: string;
  iamRoles?: string[];
  logExports?: string[];
  manageAdminPassword?: boolean;
  adminPasswordSecretKmsKeyId?: string;
  logDestinationType?: string;
  s3TableAction?: string;
  s3TableNames?: string[];
  s3TableKmsKeyId?: string;
  s3TableGranularity?: string;
}
export interface UpdateNamespaceResponse {
  namespace: Namespace;
}
export interface UpdateScheduledActionRequest {
  scheduledActionName: string;
  targetAction?: TargetAction;
  schedule?: Schedule;
  roleArn?: string;
  enabled?: boolean;
  scheduledActionDescription?: string;
  startTime?: Date;
  endTime?: Date;
}
export interface UpdateScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export interface UpdateSnapshotRequest {
  snapshotName: string;
  retentionPeriod?: number;
}
export interface UpdateSnapshotResponse {
  snapshot?: Snapshot;
}
export interface UpdateSnapshotCopyConfigurationRequest {
  snapshotCopyConfigurationId: string;
  snapshotRetentionPeriod?: number;
}
export interface UpdateSnapshotCopyConfigurationResponse {
  snapshotCopyConfiguration: SnapshotCopyConfiguration;
}
export interface UpdateUsageLimitRequest {
  usageLimitId: string;
  amount?: number;
  breachAction?: string;
}
export interface UpdateUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export interface UpdateWorkgroupRequest {
  workgroupName: string;
  baseCapacity?: number;
  enhancedVpcRouting?: boolean;
  configParameters?: ConfigParameter[];
  publiclyAccessible?: boolean;
  subnetIds?: string[];
  securityGroupIds?: string[];
  port?: number;
  maxCapacity?: number;
  ipAddressType?: string;
  pricePerformanceTarget?: PerformanceTarget;
  trackName?: string;
  extraComputeForAutomaticOptimization?: boolean;
}
export interface UpdateWorkgroupResponse {
  workgroup: Workgroup;
}
export type ConvertRecoveryPointToSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Converts a recovery point to a snapshot. For more information about recovery points and snapshots, see Working with snapshots and recovery points.
 */
export const convertRecoveryPointToSnapshot: API.OperationMethod<
  ConvertRecoveryPointToSnapshotRequest,
  ConvertRecoveryPointToSnapshotResponse,
  ConvertRecoveryPointToSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ConvertRecoveryPointToSnapshotRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<ConvertRecoveryPointToSnapshotResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConvertRecoveryPointToSnapshot",
}));

export type CreateCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom domain association for Amazon Redshift Serverless.
 */
export const createCustomDomainAssociation: API.OperationMethod<
  CreateCustomDomainAssociationRequest,
  CreateCustomDomainAssociationResponse,
  CreateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CreateCustomDomainAssociationRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<CreateCustomDomainAssociationResponse>,
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
  operationName: "CreateCustomDomainAssociation",
}));

export type CreateEndpointAccessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Redshift Serverless managed VPC endpoint.
 */
export const createEndpointAccess: API.OperationMethod<
  CreateEndpointAccessRequest,
  CreateEndpointAccessResponse,
  CreateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<CreateEndpointAccessRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<CreateEndpointAccessResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointAccess",
}));

export type CreateNamespaceError =
  | ConflictException
  | InternalServerException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a namespace in Amazon Redshift Serverless.
 */
export const createNamespace: API.OperationMethod<
  CreateNamespaceRequest,
  CreateNamespaceResponse,
  CreateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<CreateNamespaceRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<CreateNamespaceResponse>,
  errors: [ConflictException, InternalServerException, TooManyTagsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamespace",
}));

export type CreateReservationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Redshift Serverless reservation, which gives you the option to commit to a specified number of Redshift Processing Units (RPUs) for a year at a discount from Serverless on-demand (OD) rates.
 */
export const createReservation: API.OperationMethod<
  CreateReservationRequest,
  CreateReservationResponse,
  CreateReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateReservationRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<CreateReservationResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReservation",
}));

export type CreateScheduledActionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scheduled action. A scheduled action contains a schedule and an Amazon Redshift API action. For example, you can create a schedule of when to run the `CreateSnapshot` API operation.
 */
export const createScheduledAction: API.OperationMethod<
  CreateScheduledActionRequest,
  CreateScheduledActionResponse,
  CreateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<CreateScheduledActionRequest>,
  output: __S(141, __c17, 5) as any as S.Schema<CreateScheduledActionResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAction",
}));

export type CreateSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of all databases in a namespace. For more information about snapshots, see Working with snapshots and recovery points.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<CreateSnapshotRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateSnapshotResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type CreateSnapshotCopyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot copy configuration that lets you copy snapshots to another Amazon Web Services Region.
 */
export const createSnapshotCopyConfiguration: API.OperationMethod<
  CreateSnapshotCopyConfigurationRequest,
  CreateSnapshotCopyConfigurationResponse,
  CreateSnapshotCopyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<CreateSnapshotCopyConfigurationRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<CreateSnapshotCopyConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotCopyConfiguration",
}));

export type CreateUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a usage limit for a specified Amazon Redshift Serverless usage type. The usage limit is identified by the returned usage limit identifier.
 */
export const createUsageLimit: API.OperationMethod<
  CreateUsageLimitRequest,
  CreateUsageLimitResponse,
  CreateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<CreateUsageLimitRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<CreateUsageLimitResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageLimit",
}));

export type CreateWorkgroupError =
  | ConflictException
  | InsufficientCapacityException
  | InternalServerException
  | Ipv6CidrBlockNotFoundException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an workgroup in Amazon Redshift Serverless.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that you own in a Region from reaching or being reached from the internet through internet gateways and egress-only internet gateways. If a workgroup is in an account with VPC BPA turned on, the following capabilities are blocked:
 *
 * - Creating a public access workgroup
 *
 * - Modifying a private workgroup to public
 *
 * - Adding a subnet with VPC BPA turned on to the workgroup when the workgroup is public
 *
 * For more information about VPC BPA, see Block public access to VPCs and subnets in the *Amazon VPC User Guide*.
 */
export const createWorkgroup: API.OperationMethod<
  CreateWorkgroupRequest,
  CreateWorkgroupResponse,
  CreateWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<CreateWorkgroupRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateWorkgroupResponse>,
  errors: [
    ConflictException,
    InsufficientCapacityException,
    InternalServerException,
    Ipv6CidrBlockNotFoundException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkgroup",
}));

export type DeleteCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom domain association for Amazon Redshift Serverless.
 */
export const deleteCustomDomainAssociation: API.OperationMethod<
  DeleteCustomDomainAssociationRequest,
  DeleteCustomDomainAssociationResponse,
  DeleteCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<DeleteCustomDomainAssociationRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<DeleteCustomDomainAssociationResponse>,
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
  operationName: "DeleteCustomDomainAssociation",
}));

export type DeleteEndpointAccessError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Redshift Serverless managed VPC endpoint.
 */
export const deleteEndpointAccess: API.OperationMethod<
  DeleteEndpointAccessRequest,
  DeleteEndpointAccessResponse,
  DeleteEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DeleteEndpointAccessRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<DeleteEndpointAccessResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointAccess",
}));

export type DeleteNamespaceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a namespace from Amazon Redshift Serverless. Before you delete the namespace, you can create a final snapshot that has all of the data within the namespace.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<DeleteNamespaceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteNamespaceResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
}));

export type DeleteResourcePolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified resource policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteScheduledActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a scheduled action.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionRequest,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<DeleteScheduledActionRequest>,
  output: __S(141, __c17, 5) as any as S.Schema<DeleteScheduledActionResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

export type DeleteSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a snapshot from Amazon Redshift Serverless.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DeleteSnapshotRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteSnapshotResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

export type DeleteSnapshotCopyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a snapshot copy configuration
 */
export const deleteSnapshotCopyConfiguration: API.OperationMethod<
  DeleteSnapshotCopyConfigurationRequest,
  DeleteSnapshotCopyConfigurationResponse,
  DeleteSnapshotCopyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<DeleteSnapshotCopyConfigurationRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteSnapshotCopyConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotCopyConfiguration",
}));

export type DeleteUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a usage limit from Amazon Redshift Serverless.
 */
export const deleteUsageLimit: API.OperationMethod<
  DeleteUsageLimitRequest,
  DeleteUsageLimitResponse,
  DeleteUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<DeleteUsageLimitRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<DeleteUsageLimitResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageLimit",
}));

export type DeleteWorkgroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workgroup.
 */
export const deleteWorkgroup: API.OperationMethod<
  DeleteWorkgroupRequest,
  DeleteWorkgroupResponse,
  DeleteWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<DeleteWorkgroupRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<DeleteWorkgroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkgroup",
}));

export type GetCredentialsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to log in to Amazon Redshift Serverless.
 *
 * By default, the temporary credentials expire in 900 seconds. You can optionally specify a duration between 900 seconds (15 minutes) and 3600 seconds (60 minutes).
 *
 * The Identity and Access Management (IAM) user or role that runs GetCredentials must have an IAM policy attached that allows access to all necessary actions and resources.
 *
 * If the `DbName` parameter is specified, the IAM policy must allow access to the resource dbname for the specified database name.
 */
export const getCredentials: API.OperationMethod<
  GetCredentialsRequest,
  GetCredentialsResponse,
  GetCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<GetCredentialsRequest>,
  output: __S(313, __c39, 1) as any as S.Schema<GetCredentialsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentials",
}));

export type GetCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific custom domain association.
 */
export const getCustomDomainAssociation: API.OperationMethod<
  GetCustomDomainAssociationRequest,
  GetCustomDomainAssociationResponse,
  GetCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<GetCustomDomainAssociationRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<GetCustomDomainAssociationResponse>,
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
  operationName: "GetCustomDomainAssociation",
}));

export type GetEndpointAccessError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information, such as the name, about a VPC endpoint.
 */
export const getEndpointAccess: API.OperationMethod<
  GetEndpointAccessRequest,
  GetEndpointAccessResponse,
  GetEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<GetEndpointAccessRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<GetEndpointAccessResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpointAccess",
}));

export type GetIdentityCenterAuthTokenError =
  | AccessDeniedException
  | ConflictException
  | DryRunException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an Identity Center authentication token for accessing Amazon Redshift Serverless workgroups.
 *
 * The token provides secure access to data within the specified workgroups using Identity Center identity propagation. The token expires after a specified duration and must be refreshed for continued access.
 *
 * The Identity and Access Management (IAM) user or role that runs GetIdentityCenterAuthToken must have appropriate permissions to access the specified workgroups and Identity Center integration must be configured for the workgroups.
 */
export const getIdentityCenterAuthToken: API.OperationMethod<
  GetIdentityCenterAuthTokenRequest,
  GetIdentityCenterAuthTokenResponse,
  GetIdentityCenterAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<GetIdentityCenterAuthTokenRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<GetIdentityCenterAuthTokenResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    DryRunException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityCenterAuthToken",
}));

export type GetNamespaceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a namespace in Amazon Redshift Serverless.
 */
export const getNamespace: API.OperationMethod<
  GetNamespaceRequest,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<GetNamespaceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<GetNamespaceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
}));

export type GetRecoveryPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a recovery point.
 */
export const getRecoveryPoint: API.OperationMethod<
  GetRecoveryPointRequest,
  GetRecoveryPointResponse,
  GetRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<GetRecoveryPointRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<GetRecoveryPointResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPoint",
}));

export type GetReservationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Redshift Serverless reservation. A reservation gives you the option to commit to a specified number of Redshift Processing Units (RPUs) for a year at a discount from Serverless on-demand (OD) rates.
 */
export const getReservation: API.OperationMethod<
  GetReservationRequest,
  GetReservationResponse,
  GetReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<GetReservationRequest>,
  output: __S(369, __c46, 1) as any as S.Schema<GetReservationResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservation",
}));

export type GetReservationOfferingError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the reservation offering. The offering determines the payment schedule for the reservation.
 */
export const getReservationOffering: API.OperationMethod<
  GetReservationOfferingRequest,
  GetReservationOfferingResponse,
  GetReservationOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<GetReservationOfferingRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<GetReservationOfferingResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationOffering",
}));

export type GetResourcePolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a resource policy.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetScheduledActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a scheduled action.
 */
export const getScheduledAction: API.OperationMethod<
  GetScheduledActionRequest,
  GetScheduledActionResponse,
  GetScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<GetScheduledActionRequest>,
  output: __S(141, __c17, 5) as any as S.Schema<GetScheduledActionResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduledAction",
}));

export type GetSnapshotError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific snapshot.
 */
export const getSnapshot: API.OperationMethod<
  GetSnapshotRequest,
  GetSnapshotResponse,
  GetSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<GetSnapshotRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<GetSnapshotResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshot",
}));

export type GetTableRestoreStatusError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a `TableRestoreStatus` object.
 */
export const getTableRestoreStatus: API.OperationMethod<
  GetTableRestoreStatusRequest,
  GetTableRestoreStatusResponse,
  GetTableRestoreStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<GetTableRestoreStatusRequest>,
  output: __S(432, __c54, 0) as any as S.Schema<GetTableRestoreStatusResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableRestoreStatus",
}));

export type GetTrackError =
  | AccessDeniedException
  | ConflictException
  | DryRunException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the Redshift Serverless version for a specified track.
 */
export const getTrack: API.OperationMethod<
  GetTrackRequest,
  GetTrackResponse,
  GetTrackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<GetTrackRequest>,
  output: __S(441, __c55, 1) as any as S.Schema<GetTrackResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    DryRunException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrack",
}));

export type GetUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a usage limit.
 */
export const getUsageLimit: API.OperationMethod<
  GetUsageLimitRequest,
  GetUsageLimitResponse,
  GetUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<GetUsageLimitRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<GetUsageLimitResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageLimit",
}));

export type GetWorkgroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific workgroup.
 */
export const getWorkgroup: API.OperationMethod<
  GetWorkgroupRequest,
  GetWorkgroupResponse,
  GetWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<GetWorkgroupRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<GetWorkgroupResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkgroup",
}));

export type ListCustomDomainAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidPaginationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists custom domain associations for Amazon Redshift Serverless.
 */
export const listCustomDomainAssociations: API.PaginatedOperationMethod<
  ListCustomDomainAssociationsRequest,
  ListCustomDomainAssociationsResponse,
  ListCustomDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<ListCustomDomainAssociationsRequest>,
  output: __S(475, __c59, 3) as any as S.Schema<ListCustomDomainAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidPaginationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomDomainAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEndpointAccessError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array of `EndpointAccess` objects and relevant information.
 */
export const listEndpointAccess: API.PaginatedOperationMethod<
  ListEndpointAccessRequest,
  ListEndpointAccessResponse,
  ListEndpointAccessError,
  Credentials | HttpClient.HttpClient,
  EndpointAccess
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<ListEndpointAccessRequest>,
  output: __S(482, __c60, 2) as any as S.Schema<ListEndpointAccessResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpointAccess",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "endpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedWorkgroupsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Returns information about a list of specified managed workgroups in your account.
 */
export const listManagedWorkgroups: API.PaginatedOperationMethod<
  ListManagedWorkgroupsRequest,
  ListManagedWorkgroupsResponse,
  ListManagedWorkgroupsError,
  Credentials | HttpClient.HttpClient,
  ManagedWorkgroupListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<ListManagedWorkgroupsRequest>,
  output: __S(491, __c61, 3) as any as S.Schema<ListManagedWorkgroupsResponse>,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedWorkgroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedWorkgroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNamespacesError = InternalServerException | ValidationException | CommonErrors;
/**
 * Returns information about a list of specified namespaces.
 */
export const listNamespaces: API.PaginatedOperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  Namespace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c62, 0) as any as S.Schema<ListNamespacesRequest>,
  output: __S(498, __c62, 2) as any as S.Schema<ListNamespacesResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "namespaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecoveryPointsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Returns an array of recovery points.
 */
export const listRecoveryPoints: API.PaginatedOperationMethod<
  ListRecoveryPointsRequest,
  ListRecoveryPointsResponse,
  ListRecoveryPointsError,
  Credentials | HttpClient.HttpClient,
  RecoveryPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<ListRecoveryPointsRequest>,
  output: __S(506, __c63, 2) as any as S.Schema<ListRecoveryPointsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recoveryPoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReservationOfferingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current reservation offerings in your account.
 */
export const listReservationOfferings: API.PaginatedOperationMethod<
  ListReservationOfferingsRequest,
  ListReservationOfferingsResponse,
  ListReservationOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservationOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c64, 0) as any as S.Schema<ListReservationOfferingsRequest>,
  output: __S(514, __c64, 2) as any as S.Schema<ListReservationOfferingsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservationOfferings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reservationOfferingsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReservationsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Reservation objects.
 */
export const listReservations: API.PaginatedOperationMethod<
  ListReservationsRequest,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | HttpClient.HttpClient,
  Reservation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<ListReservationsRequest>,
  output: __S(522, __c65, 2) as any as S.Schema<ListReservationsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reservationsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScheduledActionsError =
  | InternalServerException
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of scheduled actions. You can use the flags to filter the list of returned scheduled actions.
 */
export const listScheduledActions: API.PaginatedOperationMethod<
  ListScheduledActionsRequest,
  ListScheduledActionsResponse,
  ListScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledActionAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c66, 0) as any as S.Schema<ListScheduledActionsRequest>,
  output: __S(531, __c66, 3) as any as S.Schema<ListScheduledActionsResponse>,
  errors: [
    InternalServerException,
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduledActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSnapshotCopyConfigurationsError =
  | ConflictException
  | InternalServerException
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of snapshot copy configurations.
 */
export const listSnapshotCopyConfigurations: API.PaginatedOperationMethod<
  ListSnapshotCopyConfigurationsRequest,
  ListSnapshotCopyConfigurationsResponse,
  ListSnapshotCopyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  SnapshotCopyConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<ListSnapshotCopyConfigurationsRequest>,
  output: __S(538, __c67, 2) as any as S.Schema<ListSnapshotCopyConfigurationsResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshotCopyConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshotCopyConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSnapshotsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of snapshots.
 */
export const listSnapshots: API.PaginatedOperationMethod<
  ListSnapshotsRequest,
  ListSnapshotsResponse,
  ListSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<ListSnapshotsRequest>,
  output: __S(546, __c68, 2) as any as S.Schema<ListSnapshotsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTableRestoreStatusError =
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an array of `TableRestoreStatus` objects.
 */
export const listTableRestoreStatus: API.PaginatedOperationMethod<
  ListTableRestoreStatusRequest,
  ListTableRestoreStatusResponse,
  ListTableRestoreStatusError,
  Credentials | HttpClient.HttpClient,
  TableRestoreStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<ListTableRestoreStatusRequest>,
  output: __S(554, __c69, 2) as any as S.Schema<ListTableRestoreStatusResponse>,
  errors: [InvalidPaginationException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableRestoreStatus",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tableRestoreStatuses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(561, __c70, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTracksError =
  | AccessDeniedException
  | InternalServerException
  | InvalidPaginationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the Amazon Redshift Serverless versions.
 */
export const listTracks: API.PaginatedOperationMethod<
  ListTracksRequest,
  ListTracksResponse,
  ListTracksError,
  Credentials | HttpClient.HttpClient,
  ServerlessTrack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<ListTracksRequest>,
  output: __S(570, __c71, 2) as any as S.Schema<ListTracksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidPaginationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTracks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tracks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUsageLimitsError =
  | ConflictException
  | InternalServerException
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all usage limits within Amazon Redshift Serverless.
 */
export const listUsageLimits: API.PaginatedOperationMethod<
  ListUsageLimitsRequest,
  ListUsageLimitsResponse,
  ListUsageLimitsError,
  Credentials | HttpClient.HttpClient,
  UsageLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<ListUsageLimitsRequest>,
  output: __S(578, __c72, 2) as any as S.Schema<ListUsageLimitsResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsageLimits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "usageLimits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkgroupsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Returns information about a list of specified workgroups.
 */
export const listWorkgroups: API.PaginatedOperationMethod<
  ListWorkgroupsRequest,
  ListWorkgroupsResponse,
  ListWorkgroupsError,
  Credentials | HttpClient.HttpClient,
  Workgroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(584, __c73, 0) as any as S.Schema<ListWorkgroupsRequest>,
  output: __S(586, __c73, 2) as any as S.Schema<ListWorkgroupsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkgroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workgroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource policy. Currently, you can use policies to share snapshots across Amazon Web Services accounts.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RestoreFromRecoveryPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Restore the data from a recovery point.
 */
export const restoreFromRecoveryPoint: API.OperationMethod<
  RestoreFromRecoveryPointRequest,
  RestoreFromRecoveryPointResponse,
  RestoreFromRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<RestoreFromRecoveryPointRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<RestoreFromRecoveryPointResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromRecoveryPoint",
}));

export type RestoreFromSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Restores a namespace from a snapshot.
 */
export const restoreFromSnapshot: API.OperationMethod<
  RestoreFromSnapshotRequest,
  RestoreFromSnapshotResponse,
  RestoreFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<RestoreFromSnapshotRequest>,
  output: __S(609, __c76, 1) as any as S.Schema<RestoreFromSnapshotResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromSnapshot",
}));

export type RestoreTableFromRecoveryPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Restores a table from a recovery point to your Amazon Redshift Serverless instance. You can't use this operation to restore tables with interleaved sort keys.
 */
export const restoreTableFromRecoveryPoint: API.OperationMethod<
  RestoreTableFromRecoveryPointRequest,
  RestoreTableFromRecoveryPointResponse,
  RestoreTableFromRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(616, __c77, 0) as any as S.Schema<RestoreTableFromRecoveryPointRequest>,
  output: __S(432, __c54, 0) as any as S.Schema<RestoreTableFromRecoveryPointResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromRecoveryPoint",
}));

export type RestoreTableFromSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Restores a table from a snapshot to your Amazon Redshift Serverless instance. You can't use this operation to restore tables with interleaved sort keys.
 */
export const restoreTableFromSnapshot: API.OperationMethod<
  RestoreTableFromSnapshotRequest,
  RestoreTableFromSnapshotResponse,
  RestoreTableFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c78, 0) as any as S.Schema<RestoreTableFromSnapshotRequest>,
  output: __S(432, __c54, 0) as any as S.Schema<RestoreTableFromSnapshotResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromSnapshot",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or set of tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c80, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Redshift Serverless certificate associated with a custom domain.
 */
export const updateCustomDomainAssociation: API.OperationMethod<
  UpdateCustomDomainAssociationRequest,
  UpdateCustomDomainAssociationResponse,
  UpdateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(648, __c81, 0) as any as S.Schema<UpdateCustomDomainAssociationRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateCustomDomainAssociationResponse>,
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
  operationName: "UpdateCustomDomainAssociation",
}));

export type UpdateEndpointAccessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Redshift Serverless managed endpoint.
 */
export const updateEndpointAccess: API.OperationMethod<
  UpdateEndpointAccessRequest,
  UpdateEndpointAccessResponse,
  UpdateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c82, 0) as any as S.Schema<UpdateEndpointAccessRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<UpdateEndpointAccessResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointAccess",
}));

export type UpdateLakehouseConfigurationError =
  | ConflictException
  | DryRunException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the lakehouse configuration for a namespace. This operation allows you to manage Amazon Redshift federated permissions and Amazon Web Services IAM Identity Center trusted identity propagation.
 */
export const updateLakehouseConfiguration: API.OperationMethod<
  UpdateLakehouseConfigurationRequest,
  UpdateLakehouseConfigurationResponse,
  UpdateLakehouseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(664, __c83, 0) as any as S.Schema<UpdateLakehouseConfigurationRequest>,
  output: __S(665, __c83, 1) as any as S.Schema<UpdateLakehouseConfigurationResponse>,
  errors: [
    ConflictException,
    DryRunException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLakehouseConfiguration",
}));

export type UpdateNamespaceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a namespace with the specified settings. Unless required, you can't update multiple parameters in one request. For example, you must specify both `adminUsername` and `adminUserPassword` to update either field, but you can't update both `kmsKeyId` and `logExports` in a single request.
 *
 * Similarly, an S3 Tables log-publishing update (a request where `logDestinationType` is `s3table`) cannot be combined with any other namespace configuration change and must be submitted as its own request.
 */
export const updateNamespace: API.OperationMethod<
  UpdateNamespaceRequest,
  UpdateNamespaceResponse,
  UpdateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<UpdateNamespaceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<UpdateNamespaceResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNamespace",
}));

export type UpdateScheduledActionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a scheduled action.
 */
export const updateScheduledAction: API.OperationMethod<
  UpdateScheduledActionRequest,
  UpdateScheduledActionResponse,
  UpdateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(680, __c85, 0) as any as S.Schema<UpdateScheduledActionRequest>,
  output: __S(141, __c17, 5) as any as S.Schema<UpdateScheduledActionResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAction",
}));

export type UpdateSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a snapshot.
 */
export const updateSnapshot: API.OperationMethod<
  UpdateSnapshotRequest,
  UpdateSnapshotResponse,
  UpdateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c86, 0) as any as S.Schema<UpdateSnapshotRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UpdateSnapshotResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
}));

export type UpdateSnapshotCopyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a snapshot copy configuration.
 */
export const updateSnapshotCopyConfiguration: API.OperationMethod<
  UpdateSnapshotCopyConfigurationRequest,
  UpdateSnapshotCopyConfigurationResponse,
  UpdateSnapshotCopyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(696, __c87, 0) as any as S.Schema<UpdateSnapshotCopyConfigurationRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateSnapshotCopyConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshotCopyConfiguration",
}));

export type UpdateUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update a usage limit in Amazon Redshift Serverless. You can't update the usage type or period of a usage limit.
 */
export const updateUsageLimit: API.OperationMethod<
  UpdateUsageLimitRequest,
  UpdateUsageLimitResponse,
  UpdateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c88, 0) as any as S.Schema<UpdateUsageLimitRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<UpdateUsageLimitResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsageLimit",
}));

export type UpdateWorkgroupError =
  | ConflictException
  | InsufficientCapacityException
  | InternalServerException
  | Ipv6CidrBlockNotFoundException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a workgroup with the specified configuration settings. You can't update multiple parameters in one request. For example, you can update `baseCapacity` or `port` in a single request, but you can't update both in the same request.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that you own in a Region from reaching or being reached from the internet through internet gateways and egress-only internet gateways. If a workgroup is in an account with VPC BPA turned on, the following capabilities are blocked:
 *
 * - Creating a public access workgroup
 *
 * - Modifying a private workgroup to public
 *
 * - Adding a subnet with VPC BPA turned on to the workgroup when the workgroup is public
 *
 * For more information about VPC BPA, see Block public access to VPCs and subnets in the *Amazon VPC User Guide*.
 */
export const updateWorkgroup: API.OperationMethod<
  UpdateWorkgroupRequest,
  UpdateWorkgroupResponse,
  UpdateWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(712, __c89, 0) as any as S.Schema<UpdateWorkgroupRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<UpdateWorkgroupResponse>,
  errors: [
    ConflictException,
    InsufficientCapacityException,
    InternalServerException,
    Ipv6CidrBlockNotFoundException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkgroup",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recoveryPointId: S.String,
          snapshotName: S.String,
          retentionPeriod: S.optional(S.Number),
          tags: S.optional(__S(25, __c3, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ConvertRecoveryPointToSnapshotRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkInterfaceId: S.optional(S.String),
          subnetId: S.optional(S.String),
          privateIpAddress: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          ipv6Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          vpcEndpointId: S.optional(S.String),
          vpcId: S.optional(S.String),
          networkInterfaces: S.optional(__S(9, __c1, 1)),
        }),
      ).annotate({ identifier: "VpcEndpoint" });
    case 3:
      return S.Array(__S(10, __c1, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          address: S.optional(S.String),
          port: S.optional(S.Number),
          vpcEndpoints: S.optional(__S(11, __c1, 3)),
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(24, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.optional(S.String),
          namespaceArn: S.optional(S.String),
          snapshotName: S.optional(S.String),
          snapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          adminUsername: S.optional(S.String),
          status: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          totalBackupSizeInMegaBytes: S.optional(S.Number),
          actualIncrementalBackupSizeInMegaBytes: S.optional(S.Number),
          backupProgressInMegaBytes: S.optional(S.Number),
          currentBackupRateInMegaBytesPerSecond: S.optional(S.Number),
          estimatedSecondsToCompletion: S.optional(S.Number),
          elapsedTimeInSeconds: S.optional(S.Number),
          snapshotRetentionPeriod: S.optional(S.Number),
          snapshotRemainingDays: S.optional(S.Number),
          snapshotRetentionStartTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          snapshotArn: S.optional(S.String),
          accountsWithRestoreAccess: S.optional(__S(16, __c2, 0)),
          accountsWithProvisionedRestoreAccess: S.optional(__S(16, __c2, 0)),
          adminPasswordSecretArn: S.optional(S.String),
          adminPasswordSecretKmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Snapshot" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ snapshot: S.optional(__S(32, __c4, 0)) })).annotate({
        identifier: "ConvertRecoveryPointToSnapshotResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workgroupName: S.String,
          customDomainName: S.String,
          customDomainCertificateArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCustomDomainAssociationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          customDomainName: S.optional(S.String),
          workgroupName: S.optional(S.String),
          customDomainCertificateArn: S.optional(S.String),
          customDomainCertificateExpiryTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "CreateCustomDomainAssociationResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpointName: S.String,
          subnetIds: __S(16, __c2, 0),
          workgroupName: S.String,
          vpcSecurityGroupIds: S.optional(__S(16, __c2, 0)),
          ownerAccount: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEndpointAccessRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vpcSecurityGroupId: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "VpcSecurityGroupMembership" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          endpointName: S.optional(S.String),
          endpointStatus: S.optional(S.String),
          workgroupName: S.optional(S.String),
          endpointCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          port: S.optional(S.Number),
          address: S.optional(S.String),
          subnetIds: S.optional(__S(16, __c2, 0)),
          vpcSecurityGroups: S.optional(__S(73, __c9, 1)),
          vpcEndpoint: S.optional(__S(10, __c1, 2)),
          endpointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EndpointAccess" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ endpoint: S.optional(__S(74, __c9, 2)) })).annotate({
        identifier: "CreateEndpointAccessResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          adminUsername: S.optional(SensitiveString),
          adminUserPassword: S.optional(SensitiveString),
          dbName: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          defaultIamRoleArn: S.optional(S.String),
          iamRoles: S.optional(__S(16, __c2, 0)),
          logExports: S.optional(__S(16, __c2, 0)),
          tags: S.optional(__S(25, __c3, 1)),
          manageAdminPassword: S.optional(S.Boolean),
          adminPasswordSecretKmsKeyId: S.optional(S.String),
          redshiftIdcApplicationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNamespaceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ namespace: S.optional(__S(98, __c12, 2)) })).annotate({
        identifier: "CreateNamespaceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          s3Tables: S.optional(__S(16, __c2, 0)),
          s3TableNamespace: S.optional(S.String),
          s3TableGranularity: S.optional(S.String),
          enabledAll: S.optional(S.Boolean),
          lastIngestionTimes: S.optional(__S(96, __c12, 0)),
        }),
      ).annotate({ identifier: "S3TablePublishStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          namespaceArn: S.optional(S.String),
          namespaceId: S.optional(S.String),
          namespaceName: S.optional(S.String),
          adminUsername: S.optional(SensitiveString),
          dbName: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          defaultIamRoleArn: S.optional(S.String),
          iamRoles: S.optional(__S(16, __c2, 0)),
          logExports: S.optional(__S(16, __c2, 0)),
          status: S.optional(S.String),
          creationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          adminPasswordSecretArn: S.optional(S.String),
          adminPasswordSecretKmsKeyId: S.optional(S.String),
          lakehouseRegistrationStatus: S.optional(S.String),
          catalogArn: S.optional(S.String),
          s3TablePublishStatus: S.optional(__S(97, __c12, 1)),
        }),
      ).annotate({ identifier: "Namespace" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capacity: S.Number,
          offeringId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateReservationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ reservation: S.optional(__S(120, __c15, 0)) })).annotate({
        identifier: "CreateReservationResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          offeringId: S.optional(S.String),
          duration: S.optional(S.Number),
          upfrontCharge: S.optional(S.Number),
          hourlyCharge: S.optional(S.Number),
          currencyCode: S.optional(S.String),
          offeringType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservationOffering" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reservationId: S.optional(S.String),
          reservationArn: S.optional(S.String),
          startDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          capacity: S.optional(S.Number),
          offering: S.optional(__S(112, __c14, 0)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "Reservation" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scheduledActionName: S.String,
          targetAction: __S(137, __c17, 1),
          schedule: __S(138, __c17, 2),
          roleArn: S.String,
          namespaceName: S.String,
          enabled: S.optional(S.Boolean),
          scheduledActionDescription: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScheduledActionRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          snapshotNamePrefix: S.String,
          retentionPeriod: S.optional(S.Number),
          tags: S.optional(__S(25, __c3, 1)),
        }),
      ).annotate({ identifier: "CreateSnapshotScheduleActionParameters" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ createSnapshot: __S(136, __c17, 0) })]);
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          at: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
        /*@__PURE__*/ S.Struct({ cron: S.String }),
      ]);
    case 3:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 4:
      return S.suspend(() =>
        S.Struct({
          scheduledActionName: S.optional(S.String),
          schedule: S.optional(__S(138, __c17, 2)),
          scheduledActionDescription: S.optional(S.String),
          nextInvocations: S.optional(__S(139, __c17, 3)),
          roleArn: S.optional(S.String),
          state: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          targetAction: S.optional(__S(137, __c17, 1)),
          namespaceName: S.optional(S.String),
          scheduledActionUuid: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledActionResponse" });
    case 5:
      return S.suspend(() =>
        S.Struct({ scheduledAction: S.optional(__S(140, __c17, 4)) }),
      ).annotate({ identifier: "CreateScheduledActionResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          snapshotName: S.String,
          retentionPeriod: S.optional(S.Number),
          tags: S.optional(__S(25, __c3, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          destinationRegion: S.String,
          snapshotRetentionPeriod: S.optional(S.Number),
          destinationKmsKeyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotCopyConfigurationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          snapshotCopyConfigurationId: S.optional(S.String),
          snapshotCopyConfigurationArn: S.optional(S.String),
          namespaceName: S.optional(S.String),
          destinationRegion: S.optional(S.String),
          snapshotRetentionPeriod: S.optional(S.Number),
          destinationKmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnapshotCopyConfiguration" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ snapshotCopyConfiguration: __S(160, __c20, 0) })).annotate({
        identifier: "CreateSnapshotCopyConfigurationResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          usageType: S.String,
          amount: S.Number,
          period: S.optional(S.String),
          breachAction: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUsageLimitRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usageLimitId: S.optional(S.String),
          usageLimitArn: S.optional(S.String),
          resourceArn: S.optional(S.String),
          usageType: S.optional(S.String),
          amount: S.optional(S.Number),
          period: S.optional(S.String),
          breachAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "UsageLimit" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ usageLimit: S.optional(__S(184, __c23, 0)) })).annotate({
        identifier: "CreateUsageLimitResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workgroupName: S.String,
          namespaceName: S.String,
          baseCapacity: S.optional(S.Number),
          enhancedVpcRouting: S.optional(S.Boolean),
          configParameters: S.optional(__S(209, __c26, 1)),
          securityGroupIds: S.optional(__S(16, __c2, 0)),
          subnetIds: S.optional(__S(16, __c2, 0)),
          publiclyAccessible: S.optional(S.Boolean),
          tags: S.optional(__S(25, __c3, 1)),
          port: S.optional(S.Number),
          maxCapacity: S.optional(S.Number),
          pricePerformanceTarget: S.optional(__S(210, __c26, 2)),
          ipAddressType: S.optional(S.String),
          trackName: S.optional(S.String),
          extraComputeForAutomaticOptimization: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWorkgroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ workgroup: S.optional(__S(211, __c26, 3)) })).annotate({
        identifier: "CreateWorkgroupResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ parameterKey: S.optional(S.String), parameterValue: S.optional(S.String) }),
      ).annotate({ identifier: "ConfigParameter" });
    case 1:
      return S.Array(__S(208, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), level: S.optional(S.Number) }),
      ).annotate({ identifier: "PerformanceTarget" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          workgroupId: S.optional(S.String),
          workgroupArn: S.optional(S.String),
          workgroupName: S.optional(S.String),
          namespaceName: S.optional(S.String),
          baseCapacity: S.optional(S.Number),
          enhancedVpcRouting: S.optional(S.Boolean),
          configParameters: S.optional(__S(209, __c26, 1)),
          securityGroupIds: S.optional(__S(16, __c2, 0)),
          subnetIds: S.optional(__S(16, __c2, 0)),
          status: S.optional(S.String),
          endpoint: S.optional(Endpoint),
          publiclyAccessible: S.optional(S.Boolean),
          creationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          port: S.optional(S.Number),
          customDomainName: S.optional(S.String),
          customDomainCertificateArn: S.optional(S.String),
          customDomainCertificateExpiryTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          workgroupVersion: S.optional(S.String),
          patchVersion: S.optional(S.String),
          maxCapacity: S.optional(S.Number),
          crossAccountVpcs: S.optional(__S(16, __c2, 0)),
          ipAddressType: S.optional(S.String),
          pricePerformanceTarget: S.optional(__S(210, __c26, 2)),
          trackName: S.optional(S.String),
          pendingTrackName: S.optional(S.String),
          extraComputeForAutomaticOptimization: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Workgroup" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workgroupName: S.String, customDomainName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCustomDomainAssociationRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteCustomDomainAssociationResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ endpointName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEndpointAccessRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          finalSnapshotName: S.optional(S.String),
          finalSnapshotRetentionPeriod: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteNamespaceRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ namespace: __S(98, __c12, 2) })).annotate({
        identifier: "DeleteNamespaceResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scheduledActionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScheduledActionRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotCopyConfigurationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotCopyConfigurationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ usageLimitId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUsageLimitRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workgroupName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWorkgroupRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ workgroup: __S(211, __c26, 3) })).annotate({
        identifier: "DeleteWorkgroupResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbName: S.optional(S.String),
          durationSeconds: S.optional(S.Number),
          workgroupName: S.optional(S.String),
          customDomainName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCredentialsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dbUser: S.optional(SensitiveString),
          dbPassword: S.optional(SensitiveString),
          expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          nextRefreshTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetCredentialsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ customDomainName: S.String, workgroupName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCustomDomainAssociationRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ endpointName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEndpointAccessRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workgroupNames: __S(16, __c2, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityCenterAuthTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          token: S.optional(SensitiveString),
          expirationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(S.encodeKeys({ token: "Token", expirationTime: "ExpirationTime" })),
      ).annotate({ identifier: "GetIdentityCenterAuthTokenResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ namespaceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetNamespaceRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recoveryPointId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRecoveryPointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ recoveryPoint: S.optional(__S(360, __c45, 0)) })).annotate({
        identifier: "GetRecoveryPointResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recoveryPointId: S.optional(S.String),
          recoveryPointCreateTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          totalSizeInMegaBytes: S.optional(S.Number),
          namespaceName: S.optional(S.String),
          workgroupName: S.optional(S.String),
          namespaceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecoveryPoint" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reservationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetReservationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ reservation: __S(120, __c15, 0) })).annotate({
        identifier: "GetReservationResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ offeringId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetReservationOfferingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ reservationOffering: __S(112, __c14, 0) })).annotate({
        identifier: "GetReservationOfferingResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.optional(S.String), policy: S.optional(S.String) }),
      ).annotate({ identifier: "ResourcePolicy" });
    case 1:
      return S.suspend(() => S.Struct({ resourcePolicy: S.optional(__S(392, __c49, 0)) })).annotate(
        { identifier: "GetResourcePolicyResponse" },
      );
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scheduledActionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetScheduledActionRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          snapshotName: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          snapshotArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSnapshotRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableRestoreRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTableRestoreStatusRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableRestoreRequestId: S.optional(S.String),
          status: S.optional(S.String),
          message: S.optional(S.String),
          requestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          namespaceName: S.optional(S.String),
          workgroupName: S.optional(S.String),
          snapshotName: S.optional(S.String),
          progressInMegaBytes: S.optional(S.Number),
          totalDataInMegaBytes: S.optional(S.Number),
          sourceDatabaseName: S.optional(S.String),
          sourceSchemaName: S.optional(S.String),
          sourceTableName: S.optional(S.String),
          targetDatabaseName: S.optional(S.String),
          targetSchemaName: S.optional(S.String),
          newTableName: S.optional(S.String),
          recoveryPointId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableRestoreStatus" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tableRestoreStatus: S.optional(__S(424, __c53, 0)) }),
      ).annotate({ identifier: "GetTableRestoreStatusResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trackName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTrackRequest" });
    case 1:
      return S.suspend(() => S.Struct({ track: S.optional(__S(450, __c56, 2)) })).annotate({
        identifier: "GetTrackResponse",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trackName: S.optional(S.String), workgroupVersion: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateTarget" });
    case 1:
      return S.Array(__S(448, __c56, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          trackName: S.optional(S.String),
          workgroupVersion: S.optional(S.String),
          updateTargets: S.optional(__S(449, __c56, 1)),
        }),
      ).annotate({ identifier: "ServerlessTrack" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ usageLimitId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUsageLimitRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workgroupName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkgroupRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          customDomainName: S.optional(S.String),
          customDomainCertificateArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCustomDomainAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          customDomainCertificateArn: S.optional(S.String),
          customDomainCertificateExpiryTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          customDomainName: S.optional(S.String),
          workgroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Association" });
    case 2:
      return S.Array(__S(473, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), associations: S.optional(__S(474, __c59, 2)) }),
      ).annotate({ identifier: "ListCustomDomainAssociationsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          workgroupName: S.optional(S.String),
          vpcId: S.optional(S.String),
          ownerAccount: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEndpointAccessRequest" });
    case 1:
      return S.Array(__S(74, __c9, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), endpoints: __S(481, __c60, 1) }),
      ).annotate({ identifier: "ListEndpointAccessResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceArn: S.optional(S.String),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListManagedWorkgroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          managedWorkgroupName: S.optional(S.String),
          managedWorkgroupId: S.optional(S.String),
          sourceArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ManagedWorkgroupListItem" });
    case 2:
      return S.Array(__S(489, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          managedWorkgroups: S.optional(__S(490, __c61, 2)),
        }),
      ).annotate({ identifier: "ListManagedWorkgroupsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNamespacesRequest" });
    case 1:
      return S.Array(__S(98, __c12, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), namespaces: __S(497, __c62, 1) }),
      ).annotate({ identifier: "ListNamespacesResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          namespaceName: S.optional(S.String),
          namespaceArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecoveryPointsRequest" });
    case 1:
      return S.Array(__S(360, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          recoveryPoints: S.optional(__S(505, __c63, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecoveryPointsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReservationOfferingsRequest" });
    case 1:
      return S.Array(__S(112, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ reservationOfferingsList: __S(513, __c64, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReservationOfferingsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReservationsRequest" });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ reservationsList: __S(521, __c65, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReservationsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          namespaceName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScheduledActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.optional(S.String),
          scheduledActionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledActionAssociation" });
    case 2:
      return S.Array(__S(529, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          scheduledActions: S.optional(__S(530, __c66, 2)),
        }),
      ).annotate({ identifier: "ListScheduledActionsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.optional(S.String),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSnapshotCopyConfigurationsRequest" });
    case 1:
      return S.Array(__S(160, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          snapshotCopyConfigurations: __S(537, __c67, 1),
        }),
      ).annotate({ identifier: "ListSnapshotCopyConfigurationsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          namespaceName: S.optional(S.String),
          namespaceArn: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSnapshotsRequest" });
    case 1:
      return S.Array(__S(32, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), snapshots: S.optional(__S(545, __c68, 1)) }),
      ).annotate({ identifier: "ListSnapshotsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          namespaceName: S.optional(S.String),
          workgroupName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTableRestoreStatusRequest" });
    case 1:
      return S.Array(__S(424, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          tableRestoreStatuses: S.optional(__S(553, __c69, 1)),
        }),
      ).annotate({ identifier: "ListTableRestoreStatusResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(25, __c3, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTracksRequest" });
    case 1:
      return S.Array(__S(450, __c56, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ tracks: S.optional(__S(569, __c71, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTracksResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          usageType: S.optional(S.String),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsageLimitsRequest" });
    case 1:
      return S.Array(__S(184, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ usageLimits: S.optional(__S(577, __c72, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsageLimitsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          ownerAccount: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWorkgroupsRequest" });
    case 1:
      return S.Array(__S(211, __c26, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), workgroups: __S(585, __c73, 1) }),
      ).annotate({ identifier: "ListWorkgroupsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, policy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recoveryPointId: S.String,
          namespaceName: S.String,
          workgroupName: S.String,
          maintainIntegration: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreFromRecoveryPointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recoveryPointId: S.optional(S.String),
          namespace: S.optional(__S(98, __c12, 2)),
        }),
      ).annotate({ identifier: "RestoreFromRecoveryPointResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          workgroupName: S.String,
          snapshotName: S.optional(S.String),
          snapshotArn: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          manageAdminPassword: S.optional(S.Boolean),
          adminPasswordSecretKmsKeyId: S.optional(S.String),
          maintainIntegration: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreFromSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          snapshotName: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          namespace: S.optional(__S(98, __c12, 2)),
        }),
      ).annotate({ identifier: "RestoreFromSnapshotResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          workgroupName: S.String,
          recoveryPointId: S.String,
          sourceDatabaseName: S.String,
          sourceSchemaName: S.optional(S.String),
          sourceTableName: S.String,
          targetDatabaseName: S.optional(S.String),
          targetSchemaName: S.optional(S.String),
          newTableName: S.String,
          activateCaseSensitiveIdentifier: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreTableFromRecoveryPointRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          workgroupName: S.String,
          snapshotName: S.String,
          sourceDatabaseName: S.String,
          sourceSchemaName: S.optional(S.String),
          sourceTableName: S.String,
          targetDatabaseName: S.optional(S.String),
          targetSchemaName: S.optional(S.String),
          newTableName: S.String,
          activateCaseSensitiveIdentifier: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreTableFromSnapshotRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(25, __c3, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(16, __c2, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workgroupName: S.String,
          customDomainName: S.String,
          customDomainCertificateArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCustomDomainAssociationRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpointName: S.String,
          vpcSecurityGroupIds: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEndpointAccessRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          lakehouseRegistration: S.optional(S.String),
          catalogName: S.optional(S.String),
          lakehouseIdcRegistration: S.optional(S.String),
          lakehouseIdcApplicationArn: S.optional(S.String),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLakehouseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.optional(S.String),
          lakehouseIdcApplicationArn: S.optional(S.String),
          lakehouseRegistrationStatus: S.optional(S.String),
          catalogArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateLakehouseConfigurationResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          adminUserPassword: S.optional(SensitiveString),
          adminUsername: S.optional(SensitiveString),
          kmsKeyId: S.optional(S.String),
          defaultIamRoleArn: S.optional(S.String),
          iamRoles: S.optional(__S(16, __c2, 0)),
          logExports: S.optional(__S(16, __c2, 0)),
          manageAdminPassword: S.optional(S.Boolean),
          adminPasswordSecretKmsKeyId: S.optional(S.String),
          logDestinationType: S.optional(S.String),
          s3TableAction: S.optional(S.String),
          s3TableNames: S.optional(__S(16, __c2, 0)),
          s3TableKmsKeyId: S.optional(S.String),
          s3TableGranularity: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNamespaceRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scheduledActionName: S.String,
          targetAction: S.optional(__S(137, __c17, 1)),
          schedule: S.optional(__S(138, __c17, 2)),
          roleArn: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          scheduledActionDescription: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateScheduledActionRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotName: S.String, retentionPeriod: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSnapshotRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          snapshotCopyConfigurationId: S.String,
          snapshotRetentionPeriod: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapshotCopyConfigurationRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usageLimitId: S.String,
          amount: S.optional(S.Number),
          breachAction: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUsageLimitRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workgroupName: S.String,
          baseCapacity: S.optional(S.Number),
          enhancedVpcRouting: S.optional(S.Boolean),
          configParameters: S.optional(__S(209, __c26, 1)),
          publiclyAccessible: S.optional(S.Boolean),
          subnetIds: S.optional(__S(16, __c2, 0)),
          securityGroupIds: S.optional(__S(16, __c2, 0)),
          port: S.optional(S.Number),
          maxCapacity: S.optional(S.Number),
          ipAddressType: S.optional(S.String),
          pricePerformanceTarget: S.optional(__S(210, __c26, 2)),
          trackName: S.optional(S.String),
          extraComputeForAutomaticOptimization: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateWorkgroupRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
