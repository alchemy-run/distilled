import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Redshift Serverless",
  target: "RedshiftServerless",
  version: "2021-04-21",
  sigv4: "redshift-serverless",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://redshift-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://redshift-serverless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly code?: string; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class DryRunException
  extends /*@__PURE__*/ TE.TaggedError("DryRunException", ["BadRequestError"], {
    status: 400,
  })<{ readonly message: string }> {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientCapacityException",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidPaginationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPaginationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class Ipv6CidrBlockNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "Ipv6CidrBlockNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string; readonly resourceName?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly code?: string; readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export type TargetAction = {
  createSnapshot: CreateSnapshotScheduleActionParameters;
};
export type Schedule =
  | { at: Date; cron?: never }
  | { at?: never; cron: string };
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
  descriptor: {
    service: svc,
    input: {
      recoveryPointId: 0,
      snapshotName: 0,
      retentionPeriod: 0,
      tags: D.list(i_Tag),
    },
    output: { snapshot: o_Snapshot },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      workgroupName: 0,
      customDomainName: 0,
      customDomainCertificateArn: 0,
    },
    output: { customDomainCertificateExpiryTime: D.ts },
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
  operationName: "CreateCustomDomainAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      endpointName: 0,
      subnetIds: 0,
      workgroupName: 0,
      vpcSecurityGroupIds: 0,
      ownerAccount: 0,
    },
    output: { endpoint: o_EndpointAccess },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      adminUsername: 0,
      adminUserPassword: 0,
      dbName: 0,
      kmsKeyId: 0,
      defaultIamRoleArn: 0,
      iamRoles: 0,
      logExports: 0,
      tags: D.list(i_Tag),
      manageAdminPassword: 0,
      adminPasswordSecretKmsKeyId: 0,
      redshiftIdcApplicationArn: 0,
    },
    output: { namespace: o_Namespace },
  },
  errors: [
    ConflictException,
    InternalServerException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      capacity: 0,
      offeringId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { reservation: o_Reservation },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      scheduledActionName: 0,
      targetAction: i_TargetAction,
      schedule: i_Schedule,
      roleArn: 0,
      namespaceName: 0,
      enabled: 0,
      scheduledActionDescription: 0,
      startTime: 0,
      endTime: 0,
    },
    output: { scheduledAction: o_ScheduledActionResponse },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAction",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      snapshotName: 0,
      retentionPeriod: 0,
      tags: D.list(i_Tag),
    },
    output: { snapshot: o_Snapshot },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      destinationRegion: 0,
      snapshotRetentionPeriod: 0,
      destinationKmsKeyId: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      resourceArn: 0,
      usageType: 0,
      amount: 0,
      period: 0,
      breachAction: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      workgroupName: 0,
      namespaceName: 0,
      baseCapacity: 0,
      enhancedVpcRouting: 0,
      configParameters: D.list(i_ConfigParameter),
      securityGroupIds: 0,
      subnetIds: 0,
      publiclyAccessible: 0,
      tags: D.list(i_Tag),
      port: 0,
      maxCapacity: 0,
      pricePerformanceTarget: i_PerformanceTarget,
      ipAddressType: 0,
      trackName: 0,
      extraComputeForAutomaticOptimization: 0,
    },
    output: { workgroup: o_Workgroup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { workgroupName: 0, customDomainName: 0 },
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
  operationName: "DeleteCustomDomainAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { endpointName: 0 },
    output: { endpoint: o_EndpointAccess },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointAccess",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      finalSnapshotName: 0,
      finalSnapshotRetentionPeriod: 0,
    },
    output: { namespace: o_Namespace },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { scheduledActionName: 0 },
    output: { scheduledAction: o_ScheduledActionResponse },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
})) as any;

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
  descriptor: {
    service: svc,
    input: { snapshotName: 0 },
    output: { snapshot: o_Snapshot },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
})) as any;

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
  descriptor: { service: svc, input: { snapshotCopyConfigurationId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { usageLimitId: 0 } },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageLimit",
})) as any;

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
  descriptor: {
    service: svc,
    input: { workgroupName: 0 },
    output: { workgroup: o_Workgroup },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkgroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      dbName: 0,
      durationSeconds: 0,
      workgroupName: 0,
      customDomainName: 0,
    },
    output: {
      dbUser: D.secret,
      dbPassword: D.secret,
      expiration: D.ts,
      nextRefreshTime: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentials",
})) as any;

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
  descriptor: {
    service: svc,
    input: { customDomainName: 0, workgroupName: 0 },
    output: { customDomainCertificateExpiryTime: D.ts },
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
  operationName: "GetCustomDomainAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { endpointName: 0 },
    output: { endpoint: o_EndpointAccess },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpointAccess",
})) as any;

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
  descriptor: {
    service: svc,
    input: { workgroupNames: 0 },
    output: { token: D.secret, expirationTime: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { namespaceName: 0 },
    output: { namespace: o_Namespace },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    input: { recoveryPointId: 0 },
    output: { recoveryPoint: o_RecoveryPoint },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: { reservationId: 0 },
    output: { reservation: o_Reservation },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservation",
})) as any;

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
  descriptor: { service: svc, input: { offeringId: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationOffering",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { scheduledActionName: 0 },
    output: { scheduledAction: o_ScheduledActionResponse },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduledAction",
})) as any;

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
  descriptor: {
    service: svc,
    input: { snapshotName: 0, ownerAccount: 0, snapshotArn: 0 },
    output: { snapshot: o_Snapshot },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshot",
})) as any;

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
  descriptor: {
    service: svc,
    input: { tableRestoreRequestId: 0 },
    output: { tableRestoreStatus: o_TableRestoreStatus },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableRestoreStatus",
})) as any;

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
  descriptor: { service: svc, input: { trackName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { usageLimitId: 0 } },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageLimit",
})) as any;

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
  descriptor: {
    service: svc,
    input: { workgroupName: 0 },
    output: { workgroup: o_Workgroup },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkgroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      customDomainName: 0,
      customDomainCertificateArn: 0,
    },
    output: {
      associations: D.list({ customDomainCertificateExpiryTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      workgroupName: 0,
      vpcId: 0,
      ownerAccount: 0,
    },
    output: { endpoints: D.list(o_EndpointAccess) },
  },
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
  descriptor: {
    service: svc,
    input: { sourceArn: 0, nextToken: 0, maxResults: 0 },
    output: { managedWorkgroups: D.list({ creationDate: D.ts }) },
  },
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

export type ListNamespacesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { namespaces: D.list(o_Namespace) },
  },
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

export type ListRecoveryPointsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      startTime: 0,
      endTime: 0,
      namespaceName: 0,
      namespaceArn: 0,
    },
    output: { recoveryPoints: D.list(o_RecoveryPoint) },
  },
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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { reservationsList: D.list(o_Reservation) },
  },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, namespaceName: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { namespaceName: 0, nextToken: 0, maxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      namespaceName: 0,
      namespaceArn: 0,
      ownerAccount: 0,
      startTime: 0,
      endTime: 0,
    },
    output: { snapshots: D.list(o_Snapshot) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, namespaceName: 0, workgroupName: 0 },
    output: { tableRestoreStatuses: D.list(o_TableRestoreStatus) },
  },
  errors: [
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
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
  descriptor: {
    service: svc,
    input: { resourceArn: 0, usageType: 0, nextToken: 0, maxResults: 0 },
  },
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

export type ListWorkgroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, ownerAccount: 0 },
    output: { workgroups: D.list(o_Workgroup) },
  },
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
  descriptor: { service: svc, input: { resourceArn: 0, policy: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      recoveryPointId: 0,
      namespaceName: 0,
      workgroupName: 0,
      maintainIntegration: 0,
    },
    output: { namespace: o_Namespace },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromRecoveryPoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      workgroupName: 0,
      snapshotName: 0,
      snapshotArn: 0,
      ownerAccount: 0,
      manageAdminPassword: 0,
      adminPasswordSecretKmsKeyId: 0,
      maintainIntegration: 0,
    },
    output: { namespace: o_Namespace },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      workgroupName: 0,
      recoveryPointId: 0,
      sourceDatabaseName: 0,
      sourceSchemaName: 0,
      sourceTableName: 0,
      targetDatabaseName: 0,
      targetSchemaName: 0,
      newTableName: 0,
      activateCaseSensitiveIdentifier: 0,
    },
    output: { tableRestoreStatus: o_TableRestoreStatus },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromRecoveryPoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      workgroupName: 0,
      snapshotName: 0,
      sourceDatabaseName: 0,
      sourceSchemaName: 0,
      sourceTableName: 0,
      targetDatabaseName: 0,
      targetSchemaName: 0,
      newTableName: 0,
      activateCaseSensitiveIdentifier: 0,
    },
    output: { tableRestoreStatus: o_TableRestoreStatus },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromSnapshot",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      workgroupName: 0,
      customDomainName: 0,
      customDomainCertificateArn: 0,
    },
    output: { customDomainCertificateExpiryTime: D.ts },
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
  operationName: "UpdateCustomDomainAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { endpointName: 0, vpcSecurityGroupIds: 0 },
    output: { endpoint: o_EndpointAccess },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      lakehouseRegistration: 0,
      catalogName: 0,
      lakehouseIdcRegistration: 0,
      lakehouseIdcApplicationArn: 0,
      dryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      namespaceName: 0,
      adminUserPassword: 0,
      adminUsername: 0,
      kmsKeyId: 0,
      defaultIamRoleArn: 0,
      iamRoles: 0,
      logExports: 0,
      manageAdminPassword: 0,
      adminPasswordSecretKmsKeyId: 0,
      logDestinationType: 0,
      s3TableAction: 0,
      s3TableNames: 0,
      s3TableKmsKeyId: 0,
      s3TableGranularity: 0,
    },
    output: { namespace: o_Namespace },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      scheduledActionName: 0,
      targetAction: i_TargetAction,
      schedule: i_Schedule,
      roleArn: 0,
      enabled: 0,
      scheduledActionDescription: 0,
      startTime: 0,
      endTime: 0,
    },
    output: { scheduledAction: o_ScheduledActionResponse },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAction",
})) as any;

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
  descriptor: {
    service: svc,
    input: { snapshotName: 0, retentionPeriod: 0 },
    output: { snapshot: o_Snapshot },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
})) as any;

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
  descriptor: {
    service: svc,
    input: { snapshotCopyConfigurationId: 0, snapshotRetentionPeriod: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { usageLimitId: 0, amount: 0, breachAction: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsageLimit",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      workgroupName: 0,
      baseCapacity: 0,
      enhancedVpcRouting: 0,
      configParameters: D.list(i_ConfigParameter),
      publiclyAccessible: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      port: 0,
      maxCapacity: 0,
      ipAddressType: 0,
      pricePerformanceTarget: i_PerformanceTarget,
      trackName: 0,
      extraComputeForAutomaticOptimization: 0,
    },
    output: { workgroup: o_Workgroup },
  },
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
})) as any;

const i_ConfigParameter: D.LazyStruct = () => ({
  parameterKey: 0,
  parameterValue: 0,
});
const i_PerformanceTarget: D.LazyStruct = () => ({ status: 0, level: 0 });
const i_Schedule: D.LazyStruct = () => ({ at: 0, cron: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TargetAction: D.LazyStruct = () => ({
  createSnapshot: {
    namespaceName: 0,
    snapshotNamePrefix: 0,
    retentionPeriod: 0,
    tags: D.list(i_Tag),
  },
});
const o_EndpointAccess: D.LazyStruct = () => ({ endpointCreateTime: D.ts });
const o_Namespace: D.LazyStruct = () => ({
  adminUsername: D.secret,
  creationDate: D.ts,
});
const o_RecoveryPoint: D.LazyStruct = () => ({ recoveryPointCreateTime: D.ts });
const o_Reservation: D.LazyStruct = () => ({ startDate: D.ts, endDate: D.ts });
const o_ScheduledActionResponse: D.LazyStruct = () => ({
  schedule: { at: D.ts },
  nextInvocations: D.list(D.ts),
  startTime: D.ts,
  endTime: D.ts,
});
const o_Snapshot: D.LazyStruct = () => ({
  snapshotCreateTime: D.ts,
  snapshotRetentionStartTime: D.ts,
});
const o_TableRestoreStatus: D.LazyStruct = () => ({ requestTime: D.ts });
const o_Workgroup: D.LazyStruct = () => ({
  creationDate: D.ts,
  customDomainCertificateExpiryTime: D.ts,
});
