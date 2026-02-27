import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "mgn",
  serviceShapeName: "ApplicationMigrationService",
});
const auth = T.AwsAuthSigv4({ name: "mgn" });
const ver = T.ServiceVersion("2020-02-26");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
              `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mgn.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mgn.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type LargeBoundedString = string;
export type ValidationExceptionReason = string;
export type MaxResultsType = number;
export type PaginationToken = string;
export type AccountID = string;
export type ARN = string;
export type TagKey = string;
export type TagValue = string;
export type PositiveInteger = number;
export type ApplicationName = string;
export type ApplicationDescription = string;
export type ApplicationID = string;
export type ISO8601DatetimeString = string;
export type ApplicationHealthStatus = string;
export type ApplicationProgressStatus = string;
export type WaveID = string;
export type BoundedString = string;
export type StrictlyPositiveInteger = number;
export type SourceServerID = string;
export type ConnectorName = string;
export type SsmInstanceID = string;
export type S3BucketName = string;
export type CloudWatchLogGroupName = string;
export type ConnectorID = string;
export type S3Key = string;
export type ExportID = string;
export type ExportStatus = string;
export type ClientIdempotencyToken = string;
export type ImportID = string;
export type ImportStatus = string;
export type ImportErrorType = string;
export type JobID = string;
export type JobType = string;
export type InitiatedBy = string;
export type JobStatus = string;
export type LaunchStatus = string;
export type EC2InstanceID = string;
export type SsmDocumentName = string;
export type SsmDocumentParameterName = string;
export type SsmParameterStoreParameterType = string;
export type SsmParameterStoreParameterName = string;
export type JmesPathString = string;
export type SsmDocumentType = string;
export type PostLaunchActionExecutionStatus = string;
export type JobLogEvent = string;
export type PostLaunchActionsDeploymentType = string;
export type S3LogBucketName = string;
export type LaunchDisposition = string;
export type TargetInstanceTypeRightSizingMethod = string;
export type BootMode = string;
export type VolumeType = string;
export type Iops = number;
export type Throughput = number;
export type KmsKeyArn = string;
export type LaunchConfigurationTemplateID = string;
export type EC2LaunchConfigurationTemplateID = string;
export type ActionID = string;
export type OrderType = number;
export type DocumentVersion = string;
export type OperatingSystemString = string;
export type ActionDescription = string;
export type ActionCategory = string;
export type SubnetID = string;
export type SecurityGroupID = string;
export type EC2InstanceType = string;
export type ReplicationConfigurationDefaultLargeStagingDiskType = string;
export type ReplicationConfigurationEbsEncryption = string;
export type BandwidthThrottling = number;
export type ReplicationConfigurationDataPlaneRouting = string;
export type InternetProtocol = string;
export type ReplicationConfigurationTemplateID = string;
export type SecretArn = string;
export type ConnectorArn = string;
export type FirstBoot = string;
export type ISO8601DurationString = string;
export type DataReplicationState = string;
export type DataReplicationInitiationStepName = string;
export type DataReplicationInitiationStepStatus = string;
export type DataReplicationErrorString = string;
export type ReplicatorID = string;
export type LifeCycleState = string;
export type ReplicationType = string;
export type VcenterClientID = string;
export type UserProvidedId = string;
export type ChangeServerLifeCycleStateSourceServerLifecycleState = string;
export type SmallBoundedString = string;
export type ReplicationConfigurationReplicatedDiskStagingDiskType = string;
export type ActionName = string;
export type WaveName = string;
export type WaveDescription = string;
export type WaveHealthStatus = string;
export type WaveProgressStatus = string;

//# Schemas
export interface InitializeServiceRequest {}
export const InitializeServiceRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/InitializeService" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InitializeServiceRequest",
}) as any as S.Schema<InitializeServiceRequest>;
export interface InitializeServiceResponse {}
export const InitializeServiceResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "InitializeServiceResponse" },
) as any as S.Schema<InitializeServiceResponse>;
export interface ValidationExceptionField {
  name?: string;
  message?: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), message: S.optional(S.String) }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export interface ListManagedAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListManagedAccountsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListManagedAccounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedAccountsRequest",
}) as any as S.Schema<ListManagedAccountsRequest>;
export interface ManagedAccount {
  accountId?: string;
}
export const ManagedAccount = S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }),
).annotate({ identifier: "ManagedAccount" }) as any as S.Schema<ManagedAccount>;
export type ManagedAccounts = ManagedAccount[];
export const ManagedAccounts = S.Array(ManagedAccount);
export interface ListManagedAccountsResponse {
  items: ManagedAccount[];
  nextToken?: string;
}
export const ListManagedAccountsResponse = S.suspend(() =>
  S.Struct({ items: ManagedAccounts, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListManagedAccountsResponse",
}) as any as S.Schema<ListManagedAccountsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const CreateApplicationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export interface ApplicationAggregatedStatus {
  lastUpdateDateTime?: string;
  healthStatus?: string;
  progressStatus?: string;
  totalSourceServers?: number;
}
export const ApplicationAggregatedStatus = S.suspend(() =>
  S.Struct({
    lastUpdateDateTime: S.optional(S.String),
    healthStatus: S.optional(S.String),
    progressStatus: S.optional(S.String),
    totalSourceServers: S.optional(S.Number),
  }),
).annotate({
  identifier: "ApplicationAggregatedStatus",
}) as any as S.Schema<ApplicationAggregatedStatus>;
export interface Application {
  applicationID?: string;
  arn?: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
  applicationAggregatedStatus?: ApplicationAggregatedStatus;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
  tags?: { [key: string]: string | undefined };
  waveID?: string;
}
export const Application = S.suspend(() =>
  S.Struct({
    applicationID: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    isArchived: S.optional(S.Boolean),
    applicationAggregatedStatus: S.optional(ApplicationAggregatedStatus),
    creationDateTime: S.optional(S.String),
    lastModifiedDateTime: S.optional(S.String),
    tags: S.optional(TagsMap),
    waveID: S.optional(S.String),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export interface ErrorDetails {
  message?: string;
  code?: string;
  resourceId?: string;
  resourceType?: string;
}
export const ErrorDetails = S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    code: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceType: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export type ConflictExceptionErrors = ErrorDetails[];
export const ConflictExceptionErrors = S.Array(ErrorDetails);
export interface DeleteApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export const DeleteApplicationRequest = S.suspend(() =>
  S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteApplicationResponse" },
) as any as S.Schema<DeleteApplicationResponse>;
export type ApplicationIDsFilter = string[];
export const ApplicationIDsFilter = S.Array(S.String);
export type WaveIDsFilter = string[];
export const WaveIDsFilter = S.Array(S.String);
export interface ListApplicationsRequestFilters {
  applicationIDs?: string[];
  isArchived?: boolean;
  waveIDs?: string[];
}
export const ListApplicationsRequestFilters = S.suspend(() =>
  S.Struct({
    applicationIDs: S.optional(ApplicationIDsFilter),
    isArchived: S.optional(S.Boolean),
    waveIDs: S.optional(WaveIDsFilter),
  }),
).annotate({
  identifier: "ListApplicationsRequestFilters",
}) as any as S.Schema<ListApplicationsRequestFilters>;
export interface ListApplicationsRequest {
  filters?: ListApplicationsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const ListApplicationsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ListApplicationsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListApplications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export type ApplicationsList = Application[];
export const ApplicationsList = S.Array(Application);
export interface ListApplicationsResponse {
  items?: Application[];
  nextToken?: string;
}
export const ListApplicationsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ApplicationsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ArchiveApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export const ArchiveApplicationRequest = S.suspend(() =>
  S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ArchiveApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ArchiveApplicationRequest",
}) as any as S.Schema<ArchiveApplicationRequest>;
export type AssociateSourceServersRequestSourceServerIDs = string[];
export const AssociateSourceServersRequestSourceServerIDs = S.Array(S.String);
export interface AssociateSourceServersRequest {
  applicationID: string;
  sourceServerIDs: string[];
  accountID?: string;
}
export const AssociateSourceServersRequest = S.suspend(() =>
  S.Struct({
    applicationID: S.String,
    sourceServerIDs: AssociateSourceServersRequestSourceServerIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateSourceServersRequest",
}) as any as S.Schema<AssociateSourceServersRequest>;
export interface AssociateSourceServersResponse {}
export const AssociateSourceServersResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateSourceServersResponse",
}) as any as S.Schema<AssociateSourceServersResponse>;
export type DisassociateSourceServersRequestSourceServerIDs = string[];
export const DisassociateSourceServersRequestSourceServerIDs = S.Array(
  S.String,
);
export interface DisassociateSourceServersRequest {
  applicationID: string;
  sourceServerIDs: string[];
  accountID?: string;
}
export const DisassociateSourceServersRequest = S.suspend(() =>
  S.Struct({
    applicationID: S.String,
    sourceServerIDs: DisassociateSourceServersRequestSourceServerIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisassociateSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateSourceServersRequest",
}) as any as S.Schema<DisassociateSourceServersRequest>;
export interface DisassociateSourceServersResponse {}
export const DisassociateSourceServersResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateSourceServersResponse",
}) as any as S.Schema<DisassociateSourceServersResponse>;
export interface UnarchiveApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export const UnarchiveApplicationRequest = S.suspend(() =>
  S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UnarchiveApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UnarchiveApplicationRequest",
}) as any as S.Schema<UnarchiveApplicationRequest>;
export interface UpdateApplicationRequest {
  applicationID: string;
  name?: string;
  description?: string;
  accountID?: string;
}
export const UpdateApplicationRequest = S.suspend(() =>
  S.Struct({
    applicationID: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface ConnectorSsmCommandConfig {
  s3OutputEnabled: boolean;
  outputS3BucketName?: string;
  cloudWatchOutputEnabled: boolean;
  cloudWatchLogGroupName?: string;
}
export const ConnectorSsmCommandConfig = S.suspend(() =>
  S.Struct({
    s3OutputEnabled: S.Boolean,
    outputS3BucketName: S.optional(S.String),
    cloudWatchOutputEnabled: S.Boolean,
    cloudWatchLogGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectorSsmCommandConfig",
}) as any as S.Schema<ConnectorSsmCommandConfig>;
export interface CreateConnectorRequest {
  name: string;
  ssmInstanceID: string;
  tags?: { [key: string]: string | undefined };
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export const CreateConnectorRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    ssmInstanceID: S.String,
    tags: S.optional(TagsMap),
    ssmCommandConfig: S.optional(ConnectorSsmCommandConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateConnector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorRequest",
}) as any as S.Schema<CreateConnectorRequest>;
export interface Connector {
  connectorID?: string;
  name?: string;
  ssmInstanceID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export const Connector = S.suspend(() =>
  S.Struct({
    connectorID: S.optional(S.String),
    name: S.optional(S.String),
    ssmInstanceID: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    ssmCommandConfig: S.optional(ConnectorSsmCommandConfig),
  }),
).annotate({ identifier: "Connector" }) as any as S.Schema<Connector>;
export interface UpdateConnectorRequest {
  connectorID: string;
  name?: string;
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export const UpdateConnectorRequest = S.suspend(() =>
  S.Struct({
    connectorID: S.String,
    name: S.optional(S.String),
    ssmCommandConfig: S.optional(ConnectorSsmCommandConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateConnector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectorRequest",
}) as any as S.Schema<UpdateConnectorRequest>;
export interface DeleteConnectorRequest {
  connectorID: string;
}
export const DeleteConnectorRequest = S.suspend(() =>
  S.Struct({ connectorID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteConnector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorRequest",
}) as any as S.Schema<DeleteConnectorRequest>;
export interface DeleteConnectorResponse {}
export const DeleteConnectorResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteConnectorResponse",
}) as any as S.Schema<DeleteConnectorResponse>;
export type ConnectorIDsFilter = string[];
export const ConnectorIDsFilter = S.Array(S.String);
export interface ListConnectorsRequestFilters {
  connectorIDs?: string[];
}
export const ListConnectorsRequestFilters = S.suspend(() =>
  S.Struct({ connectorIDs: S.optional(ConnectorIDsFilter) }),
).annotate({
  identifier: "ListConnectorsRequestFilters",
}) as any as S.Schema<ListConnectorsRequestFilters>;
export interface ListConnectorsRequest {
  filters?: ListConnectorsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListConnectorsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ListConnectorsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListConnectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorsRequest",
}) as any as S.Schema<ListConnectorsRequest>;
export type ConnectorsList = Connector[];
export const ConnectorsList = S.Array(Connector);
export interface ListConnectorsResponse {
  items?: Connector[];
  nextToken?: string;
}
export const ListConnectorsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ConnectorsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorsResponse",
}) as any as S.Schema<ListConnectorsResponse>;
export interface StartExportRequest {
  s3Bucket: string;
  s3Key: string;
  s3BucketOwner?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartExportRequest = S.suspend(() =>
  S.Struct({
    s3Bucket: S.String,
    s3Key: S.String,
    s3BucketOwner: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartExport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartExportRequest",
}) as any as S.Schema<StartExportRequest>;
export interface ExportTaskSummary {
  serversCount?: number;
  applicationsCount?: number;
  wavesCount?: number;
}
export const ExportTaskSummary = S.suspend(() =>
  S.Struct({
    serversCount: S.optional(S.Number),
    applicationsCount: S.optional(S.Number),
    wavesCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExportTaskSummary",
}) as any as S.Schema<ExportTaskSummary>;
export interface ExportTask {
  exportID?: string;
  arn?: string;
  s3Bucket?: string;
  s3Key?: string;
  s3BucketOwner?: string;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  progressPercentage?: number;
  summary?: ExportTaskSummary;
  tags?: { [key: string]: string | undefined };
}
export const ExportTask = S.suspend(() =>
  S.Struct({
    exportID: S.optional(S.String),
    arn: S.optional(S.String),
    s3Bucket: S.optional(S.String),
    s3Key: S.optional(S.String),
    s3BucketOwner: S.optional(S.String),
    creationDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
    status: S.optional(S.String),
    progressPercentage: S.optional(S.Number),
    summary: S.optional(ExportTaskSummary),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "ExportTask" }) as any as S.Schema<ExportTask>;
export interface StartExportResponse {
  exportTask?: ExportTask;
}
export const StartExportResponse = S.suspend(() =>
  S.Struct({ exportTask: S.optional(ExportTask) }),
).annotate({
  identifier: "StartExportResponse",
}) as any as S.Schema<StartExportResponse>;
export type ListExportsRequestFiltersExportIDs = string[];
export const ListExportsRequestFiltersExportIDs = S.Array(S.String);
export interface ListExportsRequestFilters {
  exportIDs?: string[];
}
export const ListExportsRequestFilters = S.suspend(() =>
  S.Struct({ exportIDs: S.optional(ListExportsRequestFiltersExportIDs) }),
).annotate({
  identifier: "ListExportsRequestFilters",
}) as any as S.Schema<ListExportsRequestFilters>;
export interface ListExportsRequest {
  filters?: ListExportsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListExportsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ListExportsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListExports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportsRequest",
}) as any as S.Schema<ListExportsRequest>;
export type ExportsList = ExportTask[];
export const ExportsList = S.Array(ExportTask);
export interface ListExportsResponse {
  items?: ExportTask[];
  nextToken?: string;
}
export const ListExportsResponse = S.suspend(() =>
  S.Struct({ items: S.optional(ExportsList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListExportsResponse",
}) as any as S.Schema<ListExportsResponse>;
export interface ListExportErrorsRequest {
  exportID: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExportErrorsRequest = S.suspend(() =>
  S.Struct({
    exportID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListExportErrors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportErrorsRequest",
}) as any as S.Schema<ListExportErrorsRequest>;
export interface ExportErrorData {
  rawError?: string;
}
export const ExportErrorData = S.suspend(() =>
  S.Struct({ rawError: S.optional(S.String) }),
).annotate({
  identifier: "ExportErrorData",
}) as any as S.Schema<ExportErrorData>;
export interface ExportTaskError {
  errorDateTime?: string;
  errorData?: ExportErrorData;
}
export const ExportTaskError = S.suspend(() =>
  S.Struct({
    errorDateTime: S.optional(S.String),
    errorData: S.optional(ExportErrorData),
  }),
).annotate({
  identifier: "ExportTaskError",
}) as any as S.Schema<ExportTaskError>;
export type ExportErrors = ExportTaskError[];
export const ExportErrors = S.Array(ExportTaskError);
export interface ListExportErrorsResponse {
  items?: ExportTaskError[];
  nextToken?: string;
}
export const ListExportErrorsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ExportErrors),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportErrorsResponse",
}) as any as S.Schema<ListExportErrorsResponse>;
export interface S3BucketSource {
  s3Bucket: string;
  s3Key: string;
  s3BucketOwner?: string;
}
export const S3BucketSource = S.suspend(() =>
  S.Struct({
    s3Bucket: S.String,
    s3Key: S.String,
    s3BucketOwner: S.optional(S.String),
  }),
).annotate({ identifier: "S3BucketSource" }) as any as S.Schema<S3BucketSource>;
export interface StartImportRequest {
  clientToken?: string;
  s3BucketSource: S3BucketSource;
  tags?: { [key: string]: string | undefined };
}
export const StartImportRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    s3BucketSource: S3BucketSource,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartImport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartImportRequest",
}) as any as S.Schema<StartImportRequest>;
export interface ImportTaskSummaryWaves {
  createdCount?: number;
  modifiedCount?: number;
}
export const ImportTaskSummaryWaves = S.suspend(() =>
  S.Struct({
    createdCount: S.optional(S.Number),
    modifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportTaskSummaryWaves",
}) as any as S.Schema<ImportTaskSummaryWaves>;
export interface ImportTaskSummaryApplications {
  createdCount?: number;
  modifiedCount?: number;
}
export const ImportTaskSummaryApplications = S.suspend(() =>
  S.Struct({
    createdCount: S.optional(S.Number),
    modifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportTaskSummaryApplications",
}) as any as S.Schema<ImportTaskSummaryApplications>;
export interface ImportTaskSummaryServers {
  createdCount?: number;
  modifiedCount?: number;
}
export const ImportTaskSummaryServers = S.suspend(() =>
  S.Struct({
    createdCount: S.optional(S.Number),
    modifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportTaskSummaryServers",
}) as any as S.Schema<ImportTaskSummaryServers>;
export interface ImportTaskSummary {
  waves?: ImportTaskSummaryWaves;
  applications?: ImportTaskSummaryApplications;
  servers?: ImportTaskSummaryServers;
}
export const ImportTaskSummary = S.suspend(() =>
  S.Struct({
    waves: S.optional(ImportTaskSummaryWaves),
    applications: S.optional(ImportTaskSummaryApplications),
    servers: S.optional(ImportTaskSummaryServers),
  }),
).annotate({
  identifier: "ImportTaskSummary",
}) as any as S.Schema<ImportTaskSummary>;
export interface ImportTask {
  importID?: string;
  arn?: string;
  s3BucketSource?: S3BucketSource;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  progressPercentage?: number;
  summary?: ImportTaskSummary;
  tags?: { [key: string]: string | undefined };
}
export const ImportTask = S.suspend(() =>
  S.Struct({
    importID: S.optional(S.String),
    arn: S.optional(S.String),
    s3BucketSource: S.optional(S3BucketSource),
    creationDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
    status: S.optional(S.String),
    progressPercentage: S.optional(S.Number),
    summary: S.optional(ImportTaskSummary),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "ImportTask" }) as any as S.Schema<ImportTask>;
export interface StartImportResponse {
  importTask?: ImportTask;
}
export const StartImportResponse = S.suspend(() =>
  S.Struct({ importTask: S.optional(ImportTask) }),
).annotate({
  identifier: "StartImportResponse",
}) as any as S.Schema<StartImportResponse>;
export type ImportIDsFilter = string[];
export const ImportIDsFilter = S.Array(S.String);
export interface ListImportsRequestFilters {
  importIDs?: string[];
}
export const ListImportsRequestFilters = S.suspend(() =>
  S.Struct({ importIDs: S.optional(ImportIDsFilter) }),
).annotate({
  identifier: "ListImportsRequestFilters",
}) as any as S.Schema<ListImportsRequestFilters>;
export interface ListImportsRequest {
  filters?: ListImportsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListImportsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ListImportsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportsRequest",
}) as any as S.Schema<ListImportsRequest>;
export type ImportList = ImportTask[];
export const ImportList = S.Array(ImportTask);
export interface ListImportsResponse {
  items?: ImportTask[];
  nextToken?: string;
}
export const ListImportsResponse = S.suspend(() =>
  S.Struct({ items: S.optional(ImportList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListImportsResponse",
}) as any as S.Schema<ListImportsResponse>;
export interface ListImportErrorsRequest {
  importID: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListImportErrorsRequest = S.suspend(() =>
  S.Struct({
    importID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImportErrors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportErrorsRequest",
}) as any as S.Schema<ListImportErrorsRequest>;
export interface ImportErrorData {
  sourceServerID?: string;
  applicationID?: string;
  waveID?: string;
  ec2LaunchTemplateID?: string;
  rowNumber?: number;
  rawError?: string;
  accountID?: string;
}
export const ImportErrorData = S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    applicationID: S.optional(S.String),
    waveID: S.optional(S.String),
    ec2LaunchTemplateID: S.optional(S.String),
    rowNumber: S.optional(S.Number),
    rawError: S.optional(S.String),
    accountID: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportErrorData",
}) as any as S.Schema<ImportErrorData>;
export interface ImportTaskError {
  errorDateTime?: string;
  errorType?: string;
  errorData?: ImportErrorData;
}
export const ImportTaskError = S.suspend(() =>
  S.Struct({
    errorDateTime: S.optional(S.String),
    errorType: S.optional(S.String),
    errorData: S.optional(ImportErrorData),
  }),
).annotate({
  identifier: "ImportTaskError",
}) as any as S.Schema<ImportTaskError>;
export type ImportErrors = ImportTaskError[];
export const ImportErrors = S.Array(ImportTaskError);
export interface ListImportErrorsResponse {
  items?: ImportTaskError[];
  nextToken?: string;
}
export const ListImportErrorsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ImportErrors),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportErrorsResponse",
}) as any as S.Schema<ListImportErrorsResponse>;
export interface DeleteJobRequest {
  jobID: string;
  accountID?: string;
}
export const DeleteJobRequest = S.suspend(() =>
  S.Struct({ jobID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobRequest",
}) as any as S.Schema<DeleteJobRequest>;
export interface DeleteJobResponse {}
export const DeleteJobResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteJobResponse",
}) as any as S.Schema<DeleteJobResponse>;
export type DescribeJobsRequestFiltersJobIDs = string[];
export const DescribeJobsRequestFiltersJobIDs = S.Array(S.String);
export interface DescribeJobsRequestFilters {
  jobIDs?: string[];
  fromDate?: string;
  toDate?: string;
}
export const DescribeJobsRequestFilters = S.suspend(() =>
  S.Struct({
    jobIDs: S.optional(DescribeJobsRequestFiltersJobIDs),
    fromDate: S.optional(S.String),
    toDate: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeJobsRequestFilters",
}) as any as S.Schema<DescribeJobsRequestFilters>;
export interface DescribeJobsRequest {
  filters?: DescribeJobsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const DescribeJobsRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeJobsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobsRequest",
}) as any as S.Schema<DescribeJobsRequest>;
export interface SsmParameterStoreParameter {
  parameterType: string;
  parameterName: string;
}
export const SsmParameterStoreParameter = S.suspend(() =>
  S.Struct({ parameterType: S.String, parameterName: S.String }),
).annotate({
  identifier: "SsmParameterStoreParameter",
}) as any as S.Schema<SsmParameterStoreParameter>;
export type SsmParameterStoreParameters = SsmParameterStoreParameter[];
export const SsmParameterStoreParameters = S.Array(SsmParameterStoreParameter);
export type SsmDocumentParameters = {
  [key: string]: SsmParameterStoreParameter[] | undefined;
};
export const SsmDocumentParameters = S.Record(
  S.String,
  SsmParameterStoreParameters.pipe(S.optional),
);
export type SsmExternalParameter = { dynamicPath: string };
export const SsmExternalParameter = S.Union([
  S.Struct({ dynamicPath: S.String }),
]);
export type SsmDocumentExternalParameters = {
  [key: string]: SsmExternalParameter | undefined;
};
export const SsmDocumentExternalParameters = S.Record(
  S.String,
  SsmExternalParameter.pipe(S.optional),
);
export interface SsmDocument {
  actionName: string;
  ssmDocumentName: string;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
}
export const SsmDocument = S.suspend(() =>
  S.Struct({
    actionName: S.String,
    ssmDocumentName: S.String,
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    externalParameters: S.optional(SsmDocumentExternalParameters),
  }),
).annotate({ identifier: "SsmDocument" }) as any as S.Schema<SsmDocument>;
export interface JobPostLaunchActionsLaunchStatus {
  ssmDocument?: SsmDocument;
  ssmDocumentType?: string;
  executionID?: string;
  executionStatus?: string;
  failureReason?: string;
}
export const JobPostLaunchActionsLaunchStatus = S.suspend(() =>
  S.Struct({
    ssmDocument: S.optional(SsmDocument),
    ssmDocumentType: S.optional(S.String),
    executionID: S.optional(S.String),
    executionStatus: S.optional(S.String),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "JobPostLaunchActionsLaunchStatus",
}) as any as S.Schema<JobPostLaunchActionsLaunchStatus>;
export type PostLaunchActionsLaunchStatusList =
  JobPostLaunchActionsLaunchStatus[];
export const PostLaunchActionsLaunchStatusList = S.Array(
  JobPostLaunchActionsLaunchStatus,
);
export interface PostLaunchActionsStatus {
  ssmAgentDiscoveryDatetime?: string;
  postLaunchActionsLaunchStatusList?: JobPostLaunchActionsLaunchStatus[];
}
export const PostLaunchActionsStatus = S.suspend(() =>
  S.Struct({
    ssmAgentDiscoveryDatetime: S.optional(S.String),
    postLaunchActionsLaunchStatusList: S.optional(
      PostLaunchActionsLaunchStatusList,
    ),
  }),
).annotate({
  identifier: "PostLaunchActionsStatus",
}) as any as S.Schema<PostLaunchActionsStatus>;
export interface ParticipatingServer {
  sourceServerID: string;
  launchStatus?: string;
  launchedEc2InstanceID?: string;
  postLaunchActionsStatus?: PostLaunchActionsStatus;
}
export const ParticipatingServer = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    launchStatus: S.optional(S.String),
    launchedEc2InstanceID: S.optional(S.String),
    postLaunchActionsStatus: S.optional(PostLaunchActionsStatus),
  }),
).annotate({
  identifier: "ParticipatingServer",
}) as any as S.Schema<ParticipatingServer>;
export type ParticipatingServers = ParticipatingServer[];
export const ParticipatingServers = S.Array(ParticipatingServer);
export interface Job {
  jobID: string;
  arn?: string;
  type?: string;
  initiatedBy?: string;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  participatingServers?: ParticipatingServer[];
  tags?: { [key: string]: string | undefined };
}
export const Job = S.suspend(() =>
  S.Struct({
    jobID: S.String,
    arn: S.optional(S.String),
    type: S.optional(S.String),
    initiatedBy: S.optional(S.String),
    creationDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
    status: S.optional(S.String),
    participatingServers: S.optional(ParticipatingServers),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export type JobsList = Job[];
export const JobsList = S.Array(Job);
export interface DescribeJobsResponse {
  items?: Job[];
  nextToken?: string;
}
export const DescribeJobsResponse = S.suspend(() =>
  S.Struct({ items: S.optional(JobsList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeJobsResponse",
}) as any as S.Schema<DescribeJobsResponse>;
export interface DescribeJobLogItemsRequest {
  jobID: string;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const DescribeJobLogItemsRequest = S.suspend(() =>
  S.Struct({
    jobID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeJobLogItems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobLogItemsRequest",
}) as any as S.Schema<DescribeJobLogItemsRequest>;
export interface JobLogEventData {
  sourceServerID?: string;
  conversionServerID?: string;
  targetInstanceID?: string;
  rawError?: string;
  attemptCount?: number;
  maxAttemptsCount?: number;
}
export const JobLogEventData = S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    conversionServerID: S.optional(S.String),
    targetInstanceID: S.optional(S.String),
    rawError: S.optional(S.String),
    attemptCount: S.optional(S.Number),
    maxAttemptsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobLogEventData",
}) as any as S.Schema<JobLogEventData>;
export interface JobLog {
  logDateTime?: string;
  event?: string;
  eventData?: JobLogEventData;
}
export const JobLog = S.suspend(() =>
  S.Struct({
    logDateTime: S.optional(S.String),
    event: S.optional(S.String),
    eventData: S.optional(JobLogEventData),
  }),
).annotate({ identifier: "JobLog" }) as any as S.Schema<JobLog>;
export type JobLogs = JobLog[];
export const JobLogs = S.Array(JobLog);
export interface DescribeJobLogItemsResponse {
  items?: JobLog[];
  nextToken?: string;
}
export const DescribeJobLogItemsResponse = S.suspend(() =>
  S.Struct({ items: S.optional(JobLogs), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeJobLogItemsResponse",
}) as any as S.Schema<DescribeJobLogItemsResponse>;
export type SsmDocuments = SsmDocument[];
export const SsmDocuments = S.Array(SsmDocument);
export interface PostLaunchActions {
  deployment?: string;
  s3LogBucket?: string;
  s3OutputKeyPrefix?: string;
  cloudWatchLogGroupName?: string;
  ssmDocuments?: SsmDocument[];
}
export const PostLaunchActions = S.suspend(() =>
  S.Struct({
    deployment: S.optional(S.String),
    s3LogBucket: S.optional(S.String),
    s3OutputKeyPrefix: S.optional(S.String),
    cloudWatchLogGroupName: S.optional(S.String),
    ssmDocuments: S.optional(SsmDocuments),
  }),
).annotate({
  identifier: "PostLaunchActions",
}) as any as S.Schema<PostLaunchActions>;
export interface Licensing {
  osByol?: boolean;
}
export const Licensing = S.suspend(() =>
  S.Struct({ osByol: S.optional(S.Boolean) }),
).annotate({ identifier: "Licensing" }) as any as S.Schema<Licensing>;
export interface LaunchTemplateDiskConf {
  volumeType?: string;
  iops?: number;
  throughput?: number;
}
export const LaunchTemplateDiskConf = S.suspend(() =>
  S.Struct({
    volumeType: S.optional(S.String),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "LaunchTemplateDiskConf",
}) as any as S.Schema<LaunchTemplateDiskConf>;
export interface CreateLaunchConfigurationTemplateRequest {
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export const CreateLaunchConfigurationTemplateRequest = S.suspend(() =>
  S.Struct({
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
    tags: S.optional(TagsMap),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    associatePublicIpAddress: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    bootMode: S.optional(S.String),
    smallVolumeMaxSize: S.optional(S.Number),
    smallVolumeConf: S.optional(LaunchTemplateDiskConf),
    largeVolumeConf: S.optional(LaunchTemplateDiskConf),
    enableParametersEncryption: S.optional(S.Boolean),
    parametersEncryptionKey: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateLaunchConfigurationTemplate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLaunchConfigurationTemplateRequest",
}) as any as S.Schema<CreateLaunchConfigurationTemplateRequest>;
export interface LaunchConfigurationTemplate {
  launchConfigurationTemplateID: string;
  arn?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  tags?: { [key: string]: string | undefined };
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export const LaunchConfigurationTemplate = S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    arn: S.optional(S.String),
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
    tags: S.optional(TagsMap),
    ec2LaunchTemplateID: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    associatePublicIpAddress: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    bootMode: S.optional(S.String),
    smallVolumeMaxSize: S.optional(S.Number),
    smallVolumeConf: S.optional(LaunchTemplateDiskConf),
    largeVolumeConf: S.optional(LaunchTemplateDiskConf),
    enableParametersEncryption: S.optional(S.Boolean),
    parametersEncryptionKey: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchConfigurationTemplate",
}) as any as S.Schema<LaunchConfigurationTemplate>;
export interface UpdateLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export const UpdateLaunchConfigurationTemplateRequest = S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    associatePublicIpAddress: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    bootMode: S.optional(S.String),
    smallVolumeMaxSize: S.optional(S.Number),
    smallVolumeConf: S.optional(LaunchTemplateDiskConf),
    largeVolumeConf: S.optional(LaunchTemplateDiskConf),
    enableParametersEncryption: S.optional(S.Boolean),
    parametersEncryptionKey: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateLaunchConfigurationTemplate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLaunchConfigurationTemplateRequest",
}) as any as S.Schema<UpdateLaunchConfigurationTemplateRequest>;
export interface DeleteLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
}
export const DeleteLaunchConfigurationTemplateRequest = S.suspend(() =>
  S.Struct({ launchConfigurationTemplateID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteLaunchConfigurationTemplate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLaunchConfigurationTemplateRequest",
}) as any as S.Schema<DeleteLaunchConfigurationTemplateRequest>;
export interface DeleteLaunchConfigurationTemplateResponse {}
export const DeleteLaunchConfigurationTemplateResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLaunchConfigurationTemplateResponse",
}) as any as S.Schema<DeleteLaunchConfigurationTemplateResponse>;
export type LaunchConfigurationTemplateIDs = string[];
export const LaunchConfigurationTemplateIDs = S.Array(S.String);
export interface DescribeLaunchConfigurationTemplatesRequest {
  launchConfigurationTemplateIDs?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeLaunchConfigurationTemplatesRequest = S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateIDs: S.optional(LaunchConfigurationTemplateIDs),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeLaunchConfigurationTemplates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLaunchConfigurationTemplatesRequest",
}) as any as S.Schema<DescribeLaunchConfigurationTemplatesRequest>;
export type LaunchConfigurationTemplates = LaunchConfigurationTemplate[];
export const LaunchConfigurationTemplates = S.Array(
  LaunchConfigurationTemplate,
);
export interface DescribeLaunchConfigurationTemplatesResponse {
  items?: LaunchConfigurationTemplate[];
  nextToken?: string;
}
export const DescribeLaunchConfigurationTemplatesResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(LaunchConfigurationTemplates),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeLaunchConfigurationTemplatesResponse",
}) as any as S.Schema<DescribeLaunchConfigurationTemplatesResponse>;
export type ActionIDs = string[];
export const ActionIDs = S.Array(S.String);
export interface TemplateActionsRequestFilters {
  actionIDs?: string[];
}
export const TemplateActionsRequestFilters = S.suspend(() =>
  S.Struct({ actionIDs: S.optional(ActionIDs) }),
).annotate({
  identifier: "TemplateActionsRequestFilters",
}) as any as S.Schema<TemplateActionsRequestFilters>;
export interface ListTemplateActionsRequest {
  launchConfigurationTemplateID: string;
  filters?: TemplateActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListTemplateActionsRequest = S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    filters: S.optional(TemplateActionsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTemplateActions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTemplateActionsRequest",
}) as any as S.Schema<ListTemplateActionsRequest>;
export interface TemplateActionDocument {
  actionID?: string;
  actionName?: string;
  documentIdentifier?: string;
  order?: number;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  operatingSystem?: string;
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export const TemplateActionDocument = S.suspend(() =>
  S.Struct({
    actionID: S.optional(S.String),
    actionName: S.optional(S.String),
    documentIdentifier: S.optional(S.String),
    order: S.optional(S.Number),
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    operatingSystem: S.optional(S.String),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateActionDocument",
}) as any as S.Schema<TemplateActionDocument>;
export type TemplateActionDocuments = TemplateActionDocument[];
export const TemplateActionDocuments = S.Array(TemplateActionDocument);
export interface ListTemplateActionsResponse {
  items?: TemplateActionDocument[];
  nextToken?: string;
}
export const ListTemplateActionsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(TemplateActionDocuments),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTemplateActionsResponse",
}) as any as S.Schema<ListTemplateActionsResponse>;
export interface PutTemplateActionRequest {
  launchConfigurationTemplateID: string;
  actionName: string;
  documentIdentifier: string;
  order: number;
  actionID: string;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  operatingSystem?: string;
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export const PutTemplateActionRequest = S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    actionName: S.String,
    documentIdentifier: S.String,
    order: S.Number,
    actionID: S.String,
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    operatingSystem: S.optional(S.String),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutTemplateAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTemplateActionRequest",
}) as any as S.Schema<PutTemplateActionRequest>;
export interface RemoveTemplateActionRequest {
  launchConfigurationTemplateID: string;
  actionID: string;
}
export const RemoveTemplateActionRequest = S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    actionID: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RemoveTemplateAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveTemplateActionRequest",
}) as any as S.Schema<RemoveTemplateActionRequest>;
export interface RemoveTemplateActionResponse {}
export const RemoveTemplateActionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveTemplateActionResponse",
}) as any as S.Schema<RemoveTemplateActionResponse>;
export type ReplicationServersSecurityGroupsIDs = string[];
export const ReplicationServersSecurityGroupsIDs = S.Array(S.String);
export interface CreateReplicationConfigurationTemplateRequest {
  stagingAreaSubnetId: string;
  associateDefaultSecurityGroup: boolean;
  replicationServersSecurityGroupsIDs: string[];
  replicationServerInstanceType: string;
  useDedicatedReplicationServer: boolean;
  defaultLargeStagingDiskType: string;
  ebsEncryption: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling: number;
  dataPlaneRouting: string;
  createPublicIP: boolean;
  stagingAreaTags: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  tags?: { [key: string]: string | undefined };
  internetProtocol?: string;
}
export const CreateReplicationConfigurationTemplateRequest = S.suspend(() =>
  S.Struct({
    stagingAreaSubnetId: S.String,
    associateDefaultSecurityGroup: S.Boolean,
    replicationServersSecurityGroupsIDs: ReplicationServersSecurityGroupsIDs,
    replicationServerInstanceType: S.String,
    useDedicatedReplicationServer: S.Boolean,
    defaultLargeStagingDiskType: S.String,
    ebsEncryption: S.String,
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.Number,
    dataPlaneRouting: S.String,
    createPublicIP: S.Boolean,
    stagingAreaTags: TagsMap,
    useFipsEndpoint: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
    internetProtocol: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/CreateReplicationConfigurationTemplate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationConfigurationTemplateRequest",
}) as any as S.Schema<CreateReplicationConfigurationTemplateRequest>;
export interface ReplicationConfigurationTemplate {
  replicationConfigurationTemplateID: string;
  arn?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  tags?: { [key: string]: string | undefined };
  internetProtocol?: string;
}
export const ReplicationConfigurationTemplate = S.suspend(() =>
  S.Struct({
    replicationConfigurationTemplateID: S.String,
    arn: S.optional(S.String),
    stagingAreaSubnetId: S.optional(S.String),
    associateDefaultSecurityGroup: S.optional(S.Boolean),
    replicationServersSecurityGroupsIDs: S.optional(
      ReplicationServersSecurityGroupsIDs,
    ),
    replicationServerInstanceType: S.optional(S.String),
    useDedicatedReplicationServer: S.optional(S.Boolean),
    defaultLargeStagingDiskType: S.optional(S.String),
    ebsEncryption: S.optional(S.String),
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.optional(S.Number),
    dataPlaneRouting: S.optional(S.String),
    createPublicIP: S.optional(S.Boolean),
    stagingAreaTags: S.optional(TagsMap),
    useFipsEndpoint: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
    internetProtocol: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationConfigurationTemplate",
}) as any as S.Schema<ReplicationConfigurationTemplate>;
export interface UpdateReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
  arn?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  internetProtocol?: string;
}
export const UpdateReplicationConfigurationTemplateRequest = S.suspend(() =>
  S.Struct({
    replicationConfigurationTemplateID: S.String,
    arn: S.optional(S.String),
    stagingAreaSubnetId: S.optional(S.String),
    associateDefaultSecurityGroup: S.optional(S.Boolean),
    replicationServersSecurityGroupsIDs: S.optional(
      ReplicationServersSecurityGroupsIDs,
    ),
    replicationServerInstanceType: S.optional(S.String),
    useDedicatedReplicationServer: S.optional(S.Boolean),
    defaultLargeStagingDiskType: S.optional(S.String),
    ebsEncryption: S.optional(S.String),
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.optional(S.Number),
    dataPlaneRouting: S.optional(S.String),
    createPublicIP: S.optional(S.Boolean),
    stagingAreaTags: S.optional(TagsMap),
    useFipsEndpoint: S.optional(S.Boolean),
    internetProtocol: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/UpdateReplicationConfigurationTemplate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReplicationConfigurationTemplateRequest",
}) as any as S.Schema<UpdateReplicationConfigurationTemplateRequest>;
export interface DeleteReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
}
export const DeleteReplicationConfigurationTemplateRequest = S.suspend(() =>
  S.Struct({ replicationConfigurationTemplateID: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/DeleteReplicationConfigurationTemplate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationConfigurationTemplateRequest",
}) as any as S.Schema<DeleteReplicationConfigurationTemplateRequest>;
export interface DeleteReplicationConfigurationTemplateResponse {}
export const DeleteReplicationConfigurationTemplateResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReplicationConfigurationTemplateResponse",
}) as any as S.Schema<DeleteReplicationConfigurationTemplateResponse>;
export type ReplicationConfigurationTemplateIDs = string[];
export const ReplicationConfigurationTemplateIDs = S.Array(S.String);
export interface DescribeReplicationConfigurationTemplatesRequest {
  replicationConfigurationTemplateIDs?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeReplicationConfigurationTemplatesRequest = S.suspend(() =>
  S.Struct({
    replicationConfigurationTemplateIDs: S.optional(
      ReplicationConfigurationTemplateIDs,
    ),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/DescribeReplicationConfigurationTemplates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReplicationConfigurationTemplatesRequest",
}) as any as S.Schema<DescribeReplicationConfigurationTemplatesRequest>;
export type ReplicationConfigurationTemplates =
  ReplicationConfigurationTemplate[];
export const ReplicationConfigurationTemplates = S.Array(
  ReplicationConfigurationTemplate,
);
export interface DescribeReplicationConfigurationTemplatesResponse {
  items?: ReplicationConfigurationTemplate[];
  nextToken?: string;
}
export const DescribeReplicationConfigurationTemplatesResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(ReplicationConfigurationTemplates),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeReplicationConfigurationTemplatesResponse",
}) as any as S.Schema<DescribeReplicationConfigurationTemplatesResponse>;
export interface SourceServerConnectorAction {
  credentialsSecretArn?: string;
  connectorArn?: string;
}
export const SourceServerConnectorAction = S.suspend(() =>
  S.Struct({
    credentialsSecretArn: S.optional(S.String),
    connectorArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceServerConnectorAction",
}) as any as S.Schema<SourceServerConnectorAction>;
export interface UpdateSourceServerRequest {
  accountID?: string;
  sourceServerID: string;
  connectorAction?: SourceServerConnectorAction;
}
export const UpdateSourceServerRequest = S.suspend(() =>
  S.Struct({
    accountID: S.optional(S.String),
    sourceServerID: S.String,
    connectorAction: S.optional(SourceServerConnectorAction),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateSourceServer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSourceServerRequest",
}) as any as S.Schema<UpdateSourceServerRequest>;
export interface LaunchedInstance {
  ec2InstanceID?: string;
  jobID?: string;
  firstBoot?: string;
}
export const LaunchedInstance = S.suspend(() =>
  S.Struct({
    ec2InstanceID: S.optional(S.String),
    jobID: S.optional(S.String),
    firstBoot: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchedInstance",
}) as any as S.Schema<LaunchedInstance>;
export interface DataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
}
export const DataReplicationInfoReplicatedDisk = S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    totalStorageBytes: S.optional(S.Number),
    replicatedStorageBytes: S.optional(S.Number),
    rescannedStorageBytes: S.optional(S.Number),
    backloggedStorageBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataReplicationInfoReplicatedDisk",
}) as any as S.Schema<DataReplicationInfoReplicatedDisk>;
export type DataReplicationInfoReplicatedDisks =
  DataReplicationInfoReplicatedDisk[];
export const DataReplicationInfoReplicatedDisks = S.Array(
  DataReplicationInfoReplicatedDisk,
);
export interface DataReplicationInitiationStep {
  name?: string;
  status?: string;
}
export const DataReplicationInitiationStep = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), status: S.optional(S.String) }),
).annotate({
  identifier: "DataReplicationInitiationStep",
}) as any as S.Schema<DataReplicationInitiationStep>;
export type DataReplicationInitiationSteps = DataReplicationInitiationStep[];
export const DataReplicationInitiationSteps = S.Array(
  DataReplicationInitiationStep,
);
export interface DataReplicationInitiation {
  startDateTime?: string;
  nextAttemptDateTime?: string;
  steps?: DataReplicationInitiationStep[];
}
export const DataReplicationInitiation = S.suspend(() =>
  S.Struct({
    startDateTime: S.optional(S.String),
    nextAttemptDateTime: S.optional(S.String),
    steps: S.optional(DataReplicationInitiationSteps),
  }),
).annotate({
  identifier: "DataReplicationInitiation",
}) as any as S.Schema<DataReplicationInitiation>;
export interface DataReplicationError {
  error?: string;
  rawError?: string;
}
export const DataReplicationError = S.suspend(() =>
  S.Struct({ error: S.optional(S.String), rawError: S.optional(S.String) }),
).annotate({
  identifier: "DataReplicationError",
}) as any as S.Schema<DataReplicationError>;
export interface DataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: DataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: DataReplicationInitiation;
  dataReplicationError?: DataReplicationError;
  lastSnapshotDateTime?: string;
  replicatorId?: string;
}
export const DataReplicationInfo = S.suspend(() =>
  S.Struct({
    lagDuration: S.optional(S.String),
    etaDateTime: S.optional(S.String),
    replicatedDisks: S.optional(DataReplicationInfoReplicatedDisks),
    dataReplicationState: S.optional(S.String),
    dataReplicationInitiation: S.optional(DataReplicationInitiation),
    dataReplicationError: S.optional(DataReplicationError),
    lastSnapshotDateTime: S.optional(S.String),
    replicatorId: S.optional(S.String),
  }),
).annotate({
  identifier: "DataReplicationInfo",
}) as any as S.Schema<DataReplicationInfo>;
export interface LifeCycleLastTestInitiated {
  apiCallDateTime?: string;
  jobID?: string;
}
export const LifeCycleLastTestInitiated = S.suspend(() =>
  S.Struct({
    apiCallDateTime: S.optional(S.String),
    jobID: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleLastTestInitiated",
}) as any as S.Schema<LifeCycleLastTestInitiated>;
export interface LifeCycleLastTestReverted {
  apiCallDateTime?: string;
}
export const LifeCycleLastTestReverted = S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastTestReverted",
}) as any as S.Schema<LifeCycleLastTestReverted>;
export interface LifeCycleLastTestFinalized {
  apiCallDateTime?: string;
}
export const LifeCycleLastTestFinalized = S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastTestFinalized",
}) as any as S.Schema<LifeCycleLastTestFinalized>;
export interface LifeCycleLastTest {
  initiated?: LifeCycleLastTestInitiated;
  reverted?: LifeCycleLastTestReverted;
  finalized?: LifeCycleLastTestFinalized;
}
export const LifeCycleLastTest = S.suspend(() =>
  S.Struct({
    initiated: S.optional(LifeCycleLastTestInitiated),
    reverted: S.optional(LifeCycleLastTestReverted),
    finalized: S.optional(LifeCycleLastTestFinalized),
  }),
).annotate({
  identifier: "LifeCycleLastTest",
}) as any as S.Schema<LifeCycleLastTest>;
export interface LifeCycleLastCutoverInitiated {
  apiCallDateTime?: string;
  jobID?: string;
}
export const LifeCycleLastCutoverInitiated = S.suspend(() =>
  S.Struct({
    apiCallDateTime: S.optional(S.String),
    jobID: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleLastCutoverInitiated",
}) as any as S.Schema<LifeCycleLastCutoverInitiated>;
export interface LifeCycleLastCutoverReverted {
  apiCallDateTime?: string;
}
export const LifeCycleLastCutoverReverted = S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastCutoverReverted",
}) as any as S.Schema<LifeCycleLastCutoverReverted>;
export interface LifeCycleLastCutoverFinalized {
  apiCallDateTime?: string;
}
export const LifeCycleLastCutoverFinalized = S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastCutoverFinalized",
}) as any as S.Schema<LifeCycleLastCutoverFinalized>;
export interface LifeCycleLastCutover {
  initiated?: LifeCycleLastCutoverInitiated;
  reverted?: LifeCycleLastCutoverReverted;
  finalized?: LifeCycleLastCutoverFinalized;
}
export const LifeCycleLastCutover = S.suspend(() =>
  S.Struct({
    initiated: S.optional(LifeCycleLastCutoverInitiated),
    reverted: S.optional(LifeCycleLastCutoverReverted),
    finalized: S.optional(LifeCycleLastCutoverFinalized),
  }),
).annotate({
  identifier: "LifeCycleLastCutover",
}) as any as S.Schema<LifeCycleLastCutover>;
export interface LifeCycle {
  addedToServiceDateTime?: string;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  lastSeenByServiceDateTime?: string;
  lastTest?: LifeCycleLastTest;
  lastCutover?: LifeCycleLastCutover;
  state?: string;
}
export const LifeCycle = S.suspend(() =>
  S.Struct({
    addedToServiceDateTime: S.optional(S.String),
    firstByteDateTime: S.optional(S.String),
    elapsedReplicationDuration: S.optional(S.String),
    lastSeenByServiceDateTime: S.optional(S.String),
    lastTest: S.optional(LifeCycleLastTest),
    lastCutover: S.optional(LifeCycleLastCutover),
    state: S.optional(S.String),
  }),
).annotate({ identifier: "LifeCycle" }) as any as S.Schema<LifeCycle>;
export interface IdentificationHints {
  fqdn?: string;
  hostname?: string;
  vmWareUuid?: string;
  awsInstanceID?: string;
  vmPath?: string;
}
export const IdentificationHints = S.suspend(() =>
  S.Struct({
    fqdn: S.optional(S.String),
    hostname: S.optional(S.String),
    vmWareUuid: S.optional(S.String),
    awsInstanceID: S.optional(S.String),
    vmPath: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentificationHints",
}) as any as S.Schema<IdentificationHints>;
export type IPsList = string[];
export const IPsList = S.Array(S.String);
export interface NetworkInterface {
  macAddress?: string;
  ips?: string[];
  isPrimary?: boolean;
}
export const NetworkInterface = S.suspend(() =>
  S.Struct({
    macAddress: S.optional(S.String),
    ips: S.optional(IPsList),
    isPrimary: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = S.Array(NetworkInterface);
export interface Disk {
  deviceName?: string;
  bytes?: number;
}
export const Disk = S.suspend(() =>
  S.Struct({ deviceName: S.optional(S.String), bytes: S.optional(S.Number) }),
).annotate({ identifier: "Disk" }) as any as S.Schema<Disk>;
export type Disks = Disk[];
export const Disks = S.Array(Disk);
export interface CPU {
  cores?: number;
  modelName?: string;
}
export const CPU = S.suspend(() =>
  S.Struct({ cores: S.optional(S.Number), modelName: S.optional(S.String) }),
).annotate({ identifier: "CPU" }) as any as S.Schema<CPU>;
export type Cpus = CPU[];
export const Cpus = S.Array(CPU);
export interface OS {
  fullString?: string;
}
export const OS = S.suspend(() =>
  S.Struct({ fullString: S.optional(S.String) }),
).annotate({ identifier: "OS" }) as any as S.Schema<OS>;
export interface SourceProperties {
  lastUpdatedDateTime?: string;
  recommendedInstanceType?: string;
  identificationHints?: IdentificationHints;
  networkInterfaces?: NetworkInterface[];
  disks?: Disk[];
  cpus?: CPU[];
  ramBytes?: number;
  os?: OS;
}
export const SourceProperties = S.suspend(() =>
  S.Struct({
    lastUpdatedDateTime: S.optional(S.String),
    recommendedInstanceType: S.optional(S.String),
    identificationHints: S.optional(IdentificationHints),
    networkInterfaces: S.optional(NetworkInterfaces),
    disks: S.optional(Disks),
    cpus: S.optional(Cpus),
    ramBytes: S.optional(S.Number),
    os: S.optional(OS),
  }),
).annotate({
  identifier: "SourceProperties",
}) as any as S.Schema<SourceProperties>;
export interface SourceServer {
  sourceServerID?: string;
  arn?: string;
  isArchived?: boolean;
  tags?: { [key: string]: string | undefined };
  launchedInstance?: LaunchedInstance;
  dataReplicationInfo?: DataReplicationInfo;
  lifeCycle?: LifeCycle;
  sourceProperties?: SourceProperties;
  replicationType?: string;
  vcenterClientID?: string;
  applicationID?: string;
  userProvidedID?: string;
  fqdnForActionFramework?: string;
  connectorAction?: SourceServerConnectorAction;
}
export const SourceServer = S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    arn: S.optional(S.String),
    isArchived: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
    launchedInstance: S.optional(LaunchedInstance),
    dataReplicationInfo: S.optional(DataReplicationInfo),
    lifeCycle: S.optional(LifeCycle),
    sourceProperties: S.optional(SourceProperties),
    replicationType: S.optional(S.String),
    vcenterClientID: S.optional(S.String),
    applicationID: S.optional(S.String),
    userProvidedID: S.optional(S.String),
    fqdnForActionFramework: S.optional(S.String),
    connectorAction: S.optional(SourceServerConnectorAction),
  }),
).annotate({ identifier: "SourceServer" }) as any as S.Schema<SourceServer>;
export interface DeleteSourceServerRequest {
  sourceServerID: string;
  accountID?: string;
}
export const DeleteSourceServerRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteSourceServer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSourceServerRequest",
}) as any as S.Schema<DeleteSourceServerRequest>;
export interface DeleteSourceServerResponse {}
export const DeleteSourceServerResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSourceServerResponse",
}) as any as S.Schema<DeleteSourceServerResponse>;
export type DescribeSourceServersRequestFiltersIDs = string[];
export const DescribeSourceServersRequestFiltersIDs = S.Array(S.String);
export type ReplicationTypes = string[];
export const ReplicationTypes = S.Array(S.String);
export type LifeCycleStates = string[];
export const LifeCycleStates = S.Array(S.String);
export type DescribeSourceServersRequestApplicationIDs = string[];
export const DescribeSourceServersRequestApplicationIDs = S.Array(S.String);
export interface DescribeSourceServersRequestFilters {
  sourceServerIDs?: string[];
  isArchived?: boolean;
  replicationTypes?: string[];
  lifeCycleStates?: string[];
  applicationIDs?: string[];
}
export const DescribeSourceServersRequestFilters = S.suspend(() =>
  S.Struct({
    sourceServerIDs: S.optional(DescribeSourceServersRequestFiltersIDs),
    isArchived: S.optional(S.Boolean),
    replicationTypes: S.optional(ReplicationTypes),
    lifeCycleStates: S.optional(LifeCycleStates),
    applicationIDs: S.optional(DescribeSourceServersRequestApplicationIDs),
  }),
).annotate({
  identifier: "DescribeSourceServersRequestFilters",
}) as any as S.Schema<DescribeSourceServersRequestFilters>;
export interface DescribeSourceServersRequest {
  filters?: DescribeSourceServersRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const DescribeSourceServersRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeSourceServersRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSourceServersRequest",
}) as any as S.Schema<DescribeSourceServersRequest>;
export type SourceServersList = SourceServer[];
export const SourceServersList = S.Array(SourceServer);
export interface DescribeSourceServersResponse {
  items?: SourceServer[];
  nextToken?: string;
}
export const DescribeSourceServersResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(SourceServersList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSourceServersResponse",
}) as any as S.Schema<DescribeSourceServersResponse>;
export interface ChangeServerLifeCycleStateSourceServerLifecycle {
  state: string;
}
export const ChangeServerLifeCycleStateSourceServerLifecycle = S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "ChangeServerLifeCycleStateSourceServerLifecycle",
}) as any as S.Schema<ChangeServerLifeCycleStateSourceServerLifecycle>;
export interface ChangeServerLifeCycleStateRequest {
  sourceServerID: string;
  lifeCycle: ChangeServerLifeCycleStateSourceServerLifecycle;
  accountID?: string;
}
export const ChangeServerLifeCycleStateRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    lifeCycle: ChangeServerLifeCycleStateSourceServerLifecycle,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ChangeServerLifeCycleState" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ChangeServerLifeCycleStateRequest",
}) as any as S.Schema<ChangeServerLifeCycleStateRequest>;
export interface DisconnectFromServiceRequest {
  sourceServerID: string;
  accountID?: string;
}
export const DisconnectFromServiceRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisconnectFromService" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisconnectFromServiceRequest",
}) as any as S.Schema<DisconnectFromServiceRequest>;
export interface FinalizeCutoverRequest {
  sourceServerID: string;
  accountID?: string;
}
export const FinalizeCutoverRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/FinalizeCutover" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "FinalizeCutoverRequest",
}) as any as S.Schema<FinalizeCutoverRequest>;
export interface GetLaunchConfigurationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const GetLaunchConfigurationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetLaunchConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLaunchConfigurationRequest",
}) as any as S.Schema<GetLaunchConfigurationRequest>;
export interface LaunchConfiguration {
  sourceServerID?: string;
  name?: string;
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
}
export const LaunchConfiguration = S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    name: S.optional(S.String),
    ec2LaunchTemplateID: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    bootMode: S.optional(S.String),
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchConfiguration",
}) as any as S.Schema<LaunchConfiguration>;
export interface GetReplicationConfigurationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const GetReplicationConfigurationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetReplicationConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReplicationConfigurationRequest",
}) as any as S.Schema<GetReplicationConfigurationRequest>;
export interface ReplicationConfigurationReplicatedDisk {
  deviceName?: string;
  isBootDisk?: boolean;
  stagingDiskType?: string;
  iops?: number;
  throughput?: number;
}
export const ReplicationConfigurationReplicatedDisk = S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    isBootDisk: S.optional(S.Boolean),
    stagingDiskType: S.optional(S.String),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReplicationConfigurationReplicatedDisk",
}) as any as S.Schema<ReplicationConfigurationReplicatedDisk>;
export type ReplicationConfigurationReplicatedDisks =
  ReplicationConfigurationReplicatedDisk[];
export const ReplicationConfigurationReplicatedDisks = S.Array(
  ReplicationConfigurationReplicatedDisk,
);
export interface ReplicationConfiguration {
  sourceServerID?: string;
  name?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  replicatedDisks?: ReplicationConfigurationReplicatedDisk[];
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  internetProtocol?: string;
}
export const ReplicationConfiguration = S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    name: S.optional(S.String),
    stagingAreaSubnetId: S.optional(S.String),
    associateDefaultSecurityGroup: S.optional(S.Boolean),
    replicationServersSecurityGroupsIDs: S.optional(
      ReplicationServersSecurityGroupsIDs,
    ),
    replicationServerInstanceType: S.optional(S.String),
    useDedicatedReplicationServer: S.optional(S.Boolean),
    defaultLargeStagingDiskType: S.optional(S.String),
    replicatedDisks: S.optional(ReplicationConfigurationReplicatedDisks),
    ebsEncryption: S.optional(S.String),
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.optional(S.Number),
    dataPlaneRouting: S.optional(S.String),
    createPublicIP: S.optional(S.Boolean),
    stagingAreaTags: S.optional(TagsMap),
    useFipsEndpoint: S.optional(S.Boolean),
    internetProtocol: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationConfiguration",
}) as any as S.Schema<ReplicationConfiguration>;
export interface SourceServerActionsRequestFilters {
  actionIDs?: string[];
}
export const SourceServerActionsRequestFilters = S.suspend(() =>
  S.Struct({ actionIDs: S.optional(ActionIDs) }),
).annotate({
  identifier: "SourceServerActionsRequestFilters",
}) as any as S.Schema<SourceServerActionsRequestFilters>;
export interface ListSourceServerActionsRequest {
  sourceServerID: string;
  filters?: SourceServerActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const ListSourceServerActionsRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    filters: S.optional(SourceServerActionsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListSourceServerActions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceServerActionsRequest",
}) as any as S.Schema<ListSourceServerActionsRequest>;
export interface SourceServerActionDocument {
  actionID?: string;
  actionName?: string;
  documentIdentifier?: string;
  order?: number;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export const SourceServerActionDocument = S.suspend(() =>
  S.Struct({
    actionID: S.optional(S.String),
    actionName: S.optional(S.String),
    documentIdentifier: S.optional(S.String),
    order: S.optional(S.Number),
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceServerActionDocument",
}) as any as S.Schema<SourceServerActionDocument>;
export type SourceServerActionDocuments = SourceServerActionDocument[];
export const SourceServerActionDocuments = S.Array(SourceServerActionDocument);
export interface ListSourceServerActionsResponse {
  items?: SourceServerActionDocument[];
  nextToken?: string;
}
export const ListSourceServerActionsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(SourceServerActionDocuments),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSourceServerActionsResponse",
}) as any as S.Schema<ListSourceServerActionsResponse>;
export interface MarkAsArchivedRequest {
  sourceServerID: string;
  accountID?: string;
}
export const MarkAsArchivedRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/MarkAsArchived" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "MarkAsArchivedRequest",
}) as any as S.Schema<MarkAsArchivedRequest>;
export interface PauseReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const PauseReplicationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PauseReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PauseReplicationRequest",
}) as any as S.Schema<PauseReplicationRequest>;
export interface PutSourceServerActionRequest {
  sourceServerID: string;
  actionName: string;
  documentIdentifier: string;
  order: number;
  actionID: string;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
  accountID?: string;
}
export const PutSourceServerActionRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    actionName: S.String,
    documentIdentifier: S.String,
    order: S.Number,
    actionID: S.String,
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutSourceServerAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSourceServerActionRequest",
}) as any as S.Schema<PutSourceServerActionRequest>;
export interface RemoveSourceServerActionRequest {
  sourceServerID: string;
  actionID: string;
  accountID?: string;
}
export const RemoveSourceServerActionRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    actionID: S.String,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RemoveSourceServerAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveSourceServerActionRequest",
}) as any as S.Schema<RemoveSourceServerActionRequest>;
export interface RemoveSourceServerActionResponse {}
export const RemoveSourceServerActionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveSourceServerActionResponse",
}) as any as S.Schema<RemoveSourceServerActionResponse>;
export interface ResumeReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const ResumeReplicationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ResumeReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResumeReplicationRequest",
}) as any as S.Schema<ResumeReplicationRequest>;
export interface RetryDataReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const RetryDataReplicationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RetryDataReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetryDataReplicationRequest",
}) as any as S.Schema<RetryDataReplicationRequest>;
export interface StartReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const StartReplicationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReplicationRequest",
}) as any as S.Schema<StartReplicationRequest>;
export interface StopReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const StopReplicationRequest = S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopReplicationRequest",
}) as any as S.Schema<StopReplicationRequest>;
export interface UpdateLaunchConfigurationRequest {
  sourceServerID: string;
  name?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  accountID?: string;
}
export const UpdateLaunchConfigurationRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    name: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    bootMode: S.optional(S.String),
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateLaunchConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLaunchConfigurationRequest",
}) as any as S.Schema<UpdateLaunchConfigurationRequest>;
export interface UpdateReplicationConfigurationRequest {
  sourceServerID: string;
  name?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  replicatedDisks?: ReplicationConfigurationReplicatedDisk[];
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  accountID?: string;
  internetProtocol?: string;
}
export const UpdateReplicationConfigurationRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    name: S.optional(S.String),
    stagingAreaSubnetId: S.optional(S.String),
    associateDefaultSecurityGroup: S.optional(S.Boolean),
    replicationServersSecurityGroupsIDs: S.optional(
      ReplicationServersSecurityGroupsIDs,
    ),
    replicationServerInstanceType: S.optional(S.String),
    useDedicatedReplicationServer: S.optional(S.Boolean),
    defaultLargeStagingDiskType: S.optional(S.String),
    replicatedDisks: S.optional(ReplicationConfigurationReplicatedDisks),
    ebsEncryption: S.optional(S.String),
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.optional(S.Number),
    dataPlaneRouting: S.optional(S.String),
    createPublicIP: S.optional(S.Boolean),
    stagingAreaTags: S.optional(TagsMap),
    useFipsEndpoint: S.optional(S.Boolean),
    accountID: S.optional(S.String),
    internetProtocol: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateReplicationConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReplicationConfigurationRequest",
}) as any as S.Schema<UpdateReplicationConfigurationRequest>;
export interface UpdateSourceServerReplicationTypeRequest {
  sourceServerID: string;
  replicationType: string;
  accountID?: string;
}
export const UpdateSourceServerReplicationTypeRequest = S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    replicationType: S.String,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateSourceServerReplicationType" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSourceServerReplicationTypeRequest",
}) as any as S.Schema<UpdateSourceServerReplicationTypeRequest>;
export type StartCutoverRequestSourceServerIDs = string[];
export const StartCutoverRequestSourceServerIDs = S.Array(S.String);
export interface StartCutoverRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const StartCutoverRequest = S.suspend(() =>
  S.Struct({
    sourceServerIDs: StartCutoverRequestSourceServerIDs,
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartCutover" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCutoverRequest",
}) as any as S.Schema<StartCutoverRequest>;
export interface StartCutoverResponse {
  job?: Job;
}
export const StartCutoverResponse = S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartCutoverResponse",
}) as any as S.Schema<StartCutoverResponse>;
export type StartTestRequestSourceServerIDs = string[];
export const StartTestRequestSourceServerIDs = S.Array(S.String);
export interface StartTestRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const StartTestRequest = S.suspend(() =>
  S.Struct({
    sourceServerIDs: StartTestRequestSourceServerIDs,
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartTest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTestRequest",
}) as any as S.Schema<StartTestRequest>;
export interface StartTestResponse {
  job?: Job;
}
export const StartTestResponse = S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartTestResponse",
}) as any as S.Schema<StartTestResponse>;
export type TerminateTargetInstancesRequestSourceServerIDs = string[];
export const TerminateTargetInstancesRequestSourceServerIDs = S.Array(S.String);
export interface TerminateTargetInstancesRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const TerminateTargetInstancesRequest = S.suspend(() =>
  S.Struct({
    sourceServerIDs: TerminateTargetInstancesRequestSourceServerIDs,
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TerminateTargetInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateTargetInstancesRequest",
}) as any as S.Schema<TerminateTargetInstancesRequest>;
export interface TerminateTargetInstancesResponse {
  job?: Job;
}
export const TerminateTargetInstancesResponse = S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "TerminateTargetInstancesResponse",
}) as any as S.Schema<TerminateTargetInstancesResponse>;
export interface DeleteVcenterClientRequest {
  vcenterClientID: string;
}
export const DeleteVcenterClientRequest = S.suspend(() =>
  S.Struct({ vcenterClientID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteVcenterClient" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVcenterClientRequest",
}) as any as S.Schema<DeleteVcenterClientRequest>;
export interface DeleteVcenterClientResponse {}
export const DeleteVcenterClientResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVcenterClientResponse",
}) as any as S.Schema<DeleteVcenterClientResponse>;
export interface DescribeVcenterClientsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const DescribeVcenterClientsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/DescribeVcenterClients" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVcenterClientsRequest",
}) as any as S.Schema<DescribeVcenterClientsRequest>;
export interface VcenterClient {
  vcenterClientID?: string;
  arn?: string;
  hostname?: string;
  vcenterUUID?: string;
  datacenterName?: string;
  lastSeenDatetime?: string;
  sourceServerTags?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export const VcenterClient = S.suspend(() =>
  S.Struct({
    vcenterClientID: S.optional(S.String),
    arn: S.optional(S.String),
    hostname: S.optional(S.String),
    vcenterUUID: S.optional(S.String),
    datacenterName: S.optional(S.String),
    lastSeenDatetime: S.optional(S.String),
    sourceServerTags: S.optional(TagsMap),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "VcenterClient" }) as any as S.Schema<VcenterClient>;
export type VcenterClientList = VcenterClient[];
export const VcenterClientList = S.Array(VcenterClient);
export interface DescribeVcenterClientsResponse {
  items?: VcenterClient[];
  nextToken?: string;
}
export const DescribeVcenterClientsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(VcenterClientList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeVcenterClientsResponse",
}) as any as S.Schema<DescribeVcenterClientsResponse>;
export interface CreateWaveRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const CreateWaveRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWaveRequest",
}) as any as S.Schema<CreateWaveRequest>;
export interface WaveAggregatedStatus {
  lastUpdateDateTime?: string;
  replicationStartedDateTime?: string;
  healthStatus?: string;
  progressStatus?: string;
  totalApplications?: number;
}
export const WaveAggregatedStatus = S.suspend(() =>
  S.Struct({
    lastUpdateDateTime: S.optional(S.String),
    replicationStartedDateTime: S.optional(S.String),
    healthStatus: S.optional(S.String),
    progressStatus: S.optional(S.String),
    totalApplications: S.optional(S.Number),
  }),
).annotate({
  identifier: "WaveAggregatedStatus",
}) as any as S.Schema<WaveAggregatedStatus>;
export interface Wave {
  waveID?: string;
  arn?: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
  waveAggregatedStatus?: WaveAggregatedStatus;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
  tags?: { [key: string]: string | undefined };
}
export const Wave = S.suspend(() =>
  S.Struct({
    waveID: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    isArchived: S.optional(S.Boolean),
    waveAggregatedStatus: S.optional(WaveAggregatedStatus),
    creationDateTime: S.optional(S.String),
    lastModifiedDateTime: S.optional(S.String),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "Wave" }) as any as S.Schema<Wave>;
export interface DeleteWaveRequest {
  waveID: string;
  accountID?: string;
}
export const DeleteWaveRequest = S.suspend(() =>
  S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWaveRequest",
}) as any as S.Schema<DeleteWaveRequest>;
export interface DeleteWaveResponse {}
export const DeleteWaveResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteWaveResponse",
}) as any as S.Schema<DeleteWaveResponse>;
export interface ListWavesRequestFilters {
  waveIDs?: string[];
  isArchived?: boolean;
}
export const ListWavesRequestFilters = S.suspend(() =>
  S.Struct({
    waveIDs: S.optional(WaveIDsFilter),
    isArchived: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ListWavesRequestFilters",
}) as any as S.Schema<ListWavesRequestFilters>;
export interface ListWavesRequest {
  filters?: ListWavesRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const ListWavesRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ListWavesRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListWaves" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWavesRequest",
}) as any as S.Schema<ListWavesRequest>;
export type WavesList = Wave[];
export const WavesList = S.Array(Wave);
export interface ListWavesResponse {
  items?: Wave[];
  nextToken?: string;
}
export const ListWavesResponse = S.suspend(() =>
  S.Struct({ items: S.optional(WavesList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWavesResponse",
}) as any as S.Schema<ListWavesResponse>;
export interface ArchiveWaveRequest {
  waveID: string;
  accountID?: string;
}
export const ArchiveWaveRequest = S.suspend(() =>
  S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ArchiveWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ArchiveWaveRequest",
}) as any as S.Schema<ArchiveWaveRequest>;
export type ApplicationIDs = string[];
export const ApplicationIDs = S.Array(S.String);
export interface AssociateApplicationsRequest {
  waveID: string;
  applicationIDs: string[];
  accountID?: string;
}
export const AssociateApplicationsRequest = S.suspend(() =>
  S.Struct({
    waveID: S.String,
    applicationIDs: ApplicationIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateApplications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateApplicationsRequest",
}) as any as S.Schema<AssociateApplicationsRequest>;
export interface AssociateApplicationsResponse {}
export const AssociateApplicationsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateApplicationsResponse",
}) as any as S.Schema<AssociateApplicationsResponse>;
export interface DisassociateApplicationsRequest {
  waveID: string;
  applicationIDs: string[];
  accountID?: string;
}
export const DisassociateApplicationsRequest = S.suspend(() =>
  S.Struct({
    waveID: S.String,
    applicationIDs: ApplicationIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisassociateApplications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateApplicationsRequest",
}) as any as S.Schema<DisassociateApplicationsRequest>;
export interface DisassociateApplicationsResponse {}
export const DisassociateApplicationsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateApplicationsResponse",
}) as any as S.Schema<DisassociateApplicationsResponse>;
export interface UnarchiveWaveRequest {
  waveID: string;
  accountID?: string;
}
export const UnarchiveWaveRequest = S.suspend(() =>
  S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UnarchiveWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UnarchiveWaveRequest",
}) as any as S.Schema<UnarchiveWaveRequest>;
export interface UpdateWaveRequest {
  waveID: string;
  name?: string;
  description?: string;
  accountID?: string;
}
export const UpdateWaveRequest = S.suspend(() =>
  S.Struct({
    waveID: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWaveRequest",
}) as any as S.Schema<UpdateWaveRequest>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String), code: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    message: S.optional(S.String),
    code: S.optional(S.String),
    reason: S.optional(S.String),
    fieldList: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}
export class UninitializedAccountException extends S.TaggedErrorClass<UninitializedAccountException>()(
  "UninitializedAccountException",
  { message: S.optional(S.String), code: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  {
    message: S.optional(S.String),
    code: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceType: S.optional(S.String),
  },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
  },
).pipe(C.withThrottlingError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  {
    message: S.optional(S.String),
    code: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceType: S.optional(S.String),
    errors: S.optional(ConflictExceptionErrors),
  },
).pipe(C.withConflictError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    message: S.optional(S.String),
    code: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceType: S.optional(S.String),
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    quotaValue: S.optional(S.Number),
  },
).pipe(C.withQuotaError) {}

//# Operations
/**
 * Initialize Application Migration Service.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceRequest,
  InitializeServiceResponse,
  AccessDeniedException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InitializeServiceRequest,
  output: InitializeServiceResponse,
  errors: [AccessDeniedException, ValidationException],
}));
/**
 * List Managed Accounts.
 */
export const listManagedAccounts: API.OperationMethod<
  ListManagedAccountsRequest,
  ListManagedAccountsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListManagedAccountsRequest,
  ) => stream.Stream<
    ListManagedAccountsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedAccountsRequest,
  ) => stream.Stream<
    ManagedAccount,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedAccountsRequest,
  output: ListManagedAccountsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * List all tags for your Application Migration Service resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Adds or overwrites only the specified tags for the specified Application Migration Service resource or resources. When you specify an existing tag key, the value is overwritten with the new value. Each resource can have a maximum of 50 tags. Each tag consists of a key and optional value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the specified set of tags from the specified set of Application Migration Service resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Create application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  Application,
  | ConflictException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: Application,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Delete application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Retrieves all applications or multiple applications by ID.
 */
export const listApplications: API.OperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    ListApplicationsResponse,
    UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    Application,
    UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [UninitializedAccountException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Archive application.
 */
export const archiveApplication: API.OperationMethod<
  ArchiveApplicationRequest,
  Application,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ArchiveApplicationRequest,
  output: Application,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Associate source servers to application.
 */
export const associateSourceServers: API.OperationMethod<
  AssociateSourceServersRequest,
  AssociateSourceServersResponse,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateSourceServersRequest,
  output: AssociateSourceServersResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Disassociate source servers from application.
 */
export const disassociateSourceServers: API.OperationMethod<
  DisassociateSourceServersRequest,
  DisassociateSourceServersResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateSourceServersRequest,
  output: DisassociateSourceServersResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Unarchive application.
 */
export const unarchiveApplication: API.OperationMethod<
  UnarchiveApplicationRequest,
  Application,
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnarchiveApplicationRequest,
  output: Application,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Update application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  Application,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: Application,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Create Connector.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  Connector,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConnectorRequest,
  output: Connector,
  errors: [UninitializedAccountException, ValidationException],
}));
/**
 * Update Connector.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  Connector,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConnectorRequest,
  output: Connector,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Delete Connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConnectorRequest,
  output: DeleteConnectorResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * List Connectors.
 */
export const listConnectors: API.OperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListConnectorsRequest,
  ) => stream.Stream<
    ListConnectorsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListConnectorsRequest,
  ) => stream.Stream<
    Connector,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorsRequest,
  output: ListConnectorsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Start export.
 */
export const startExport: API.OperationMethod<
  StartExportRequest,
  StartExportResponse,
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartExportRequest,
  output: StartExportResponse,
  errors: [
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * List exports.
 */
export const listExports: API.OperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListExportsRequest,
  ) => stream.Stream<
    ListExportsResponse,
    UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListExportsRequest,
  ) => stream.Stream<
    ExportTask,
    UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListExportsRequest,
  output: ListExportsResponse,
  errors: [UninitializedAccountException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * List export errors.
 */
export const listExportErrors: API.OperationMethod<
  ListExportErrorsRequest,
  ListExportErrorsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListExportErrorsRequest,
  ) => stream.Stream<
    ListExportErrorsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListExportErrorsRequest,
  ) => stream.Stream<
    ExportTaskError,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListExportErrorsRequest,
  output: ListExportErrorsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Start import.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartImportRequest,
  output: StartImportResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * List imports.
 */
export const listImports: API.OperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImportsRequest,
  ) => stream.Stream<
    ListImportsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImportsRequest,
  ) => stream.Stream<
    ImportTask,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImportsRequest,
  output: ListImportsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * List import errors.
 */
export const listImportErrors: API.OperationMethod<
  ListImportErrorsRequest,
  ListImportErrorsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListImportErrorsRequest,
  ) => stream.Stream<
    ListImportErrorsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListImportErrorsRequest,
  ) => stream.Stream<
    ImportTaskError,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListImportErrorsRequest,
  output: ListImportErrorsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Deletes a single Job by ID.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteJobRequest,
  output: DeleteJobResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Returns a list of Jobs. Use the JobsID and fromDate and toData filters to limit which jobs are returned. The response is sorted by creationDataTime - latest date first. Jobs are normally created by the StartTest, StartCutover, and TerminateTargetInstances APIs. Jobs are also created by DiagnosticLaunch and TerminateDiagnosticInstances, which are APIs available only to *Support* and only used in response to relevant support tickets.
 */
export const describeJobs: API.OperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeJobsRequest,
  ) => stream.Stream<
    DescribeJobsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeJobsRequest,
  ) => stream.Stream<
    Job,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeJobsRequest,
  output: DescribeJobsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves detailed job log items with paging.
 */
export const describeJobLogItems: API.OperationMethod<
  DescribeJobLogItemsRequest,
  DescribeJobLogItemsResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeJobLogItemsRequest,
  ) => stream.Stream<
    DescribeJobLogItemsResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeJobLogItemsRequest,
  ) => stream.Stream<
    JobLog,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeJobLogItemsRequest,
  output: DescribeJobLogItemsResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a new Launch Configuration Template.
 */
export const createLaunchConfigurationTemplate: API.OperationMethod<
  CreateLaunchConfigurationTemplateRequest,
  LaunchConfigurationTemplate,
  | AccessDeniedException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLaunchConfigurationTemplateRequest,
  output: LaunchConfigurationTemplate,
  errors: [
    AccessDeniedException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Updates an existing Launch Configuration Template by ID.
 */
export const updateLaunchConfigurationTemplate: API.OperationMethod<
  UpdateLaunchConfigurationTemplateRequest,
  LaunchConfigurationTemplate,
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLaunchConfigurationTemplateRequest,
  output: LaunchConfigurationTemplate,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Deletes a single Launch Configuration Template by ID.
 */
export const deleteLaunchConfigurationTemplate: API.OperationMethod<
  DeleteLaunchConfigurationTemplateRequest,
  DeleteLaunchConfigurationTemplateResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLaunchConfigurationTemplateRequest,
  output: DeleteLaunchConfigurationTemplateResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Lists all Launch Configuration Templates, filtered by Launch Configuration Template IDs
 */
export const describeLaunchConfigurationTemplates: API.OperationMethod<
  DescribeLaunchConfigurationTemplatesRequest,
  DescribeLaunchConfigurationTemplatesResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeLaunchConfigurationTemplatesRequest,
  ) => stream.Stream<
    DescribeLaunchConfigurationTemplatesResponse,
    | ResourceNotFoundException
    | UninitializedAccountException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeLaunchConfigurationTemplatesRequest,
  ) => stream.Stream<
    LaunchConfigurationTemplate,
    | ResourceNotFoundException
    | UninitializedAccountException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeLaunchConfigurationTemplatesRequest,
  output: DescribeLaunchConfigurationTemplatesResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * List template post migration custom actions.
 */
export const listTemplateActions: API.OperationMethod<
  ListTemplateActionsRequest,
  ListTemplateActionsResponse,
  ResourceNotFoundException | UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTemplateActionsRequest,
  ) => stream.Stream<
    ListTemplateActionsResponse,
    ResourceNotFoundException | UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTemplateActionsRequest,
  ) => stream.Stream<
    TemplateActionDocument,
    ResourceNotFoundException | UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTemplateActionsRequest,
  output: ListTemplateActionsResponse,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Put template post migration custom action.
 */
export const putTemplateAction: API.OperationMethod<
  PutTemplateActionRequest,
  TemplateActionDocument,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutTemplateActionRequest,
  output: TemplateActionDocument,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Remove template post migration custom action.
 */
export const removeTemplateAction: API.OperationMethod<
  RemoveTemplateActionRequest,
  RemoveTemplateActionResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveTemplateActionRequest,
  output: RemoveTemplateActionResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Creates a new ReplicationConfigurationTemplate.
 */
export const createReplicationConfigurationTemplate: API.OperationMethod<
  CreateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  | AccessDeniedException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateReplicationConfigurationTemplateRequest,
  output: ReplicationConfigurationTemplate,
  errors: [
    AccessDeniedException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Updates multiple ReplicationConfigurationTemplates by ID.
 */
export const updateReplicationConfigurationTemplate: API.OperationMethod<
  UpdateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateReplicationConfigurationTemplateRequest,
  output: ReplicationConfigurationTemplate,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Deletes a single Replication Configuration Template by ID
 */
export const deleteReplicationConfigurationTemplate: API.OperationMethod<
  DeleteReplicationConfigurationTemplateRequest,
  DeleteReplicationConfigurationTemplateResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReplicationConfigurationTemplateRequest,
  output: DeleteReplicationConfigurationTemplateResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Lists all ReplicationConfigurationTemplates, filtered by Source Server IDs.
 */
export const describeReplicationConfigurationTemplates: API.OperationMethod<
  DescribeReplicationConfigurationTemplatesRequest,
  DescribeReplicationConfigurationTemplatesResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeReplicationConfigurationTemplatesRequest,
  ) => stream.Stream<
    DescribeReplicationConfigurationTemplatesResponse,
    | ResourceNotFoundException
    | UninitializedAccountException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeReplicationConfigurationTemplatesRequest,
  ) => stream.Stream<
    ReplicationConfigurationTemplate,
    | ResourceNotFoundException
    | UninitializedAccountException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationConfigurationTemplatesRequest,
  output: DescribeReplicationConfigurationTemplatesResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Update Source Server.
 */
export const updateSourceServer: API.OperationMethod<
  UpdateSourceServerRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSourceServerRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Deletes a single source server by ID.
 */
export const deleteSourceServer: API.OperationMethod<
  DeleteSourceServerRequest,
  DeleteSourceServerResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSourceServerRequest,
  output: DeleteSourceServerResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Retrieves all SourceServers or multiple SourceServers by ID.
 */
export const describeSourceServers: API.OperationMethod<
  DescribeSourceServersRequest,
  DescribeSourceServersResponse,
  UninitializedAccountException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeSourceServersRequest,
  ) => stream.Stream<
    DescribeSourceServersResponse,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeSourceServersRequest,
  ) => stream.Stream<
    SourceServer,
    UninitializedAccountException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeSourceServersRequest,
  output: DescribeSourceServersResponse,
  errors: [UninitializedAccountException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Allows the user to set the SourceServer.LifeCycle.state property for specific Source Server IDs to one of the following: READY_FOR_TEST or READY_FOR_CUTOVER. This command only works if the Source Server is already launchable (dataReplicationInfo.lagDuration is not null.)
 */
export const changeServerLifeCycleState: API.OperationMethod<
  ChangeServerLifeCycleStateRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ChangeServerLifeCycleStateRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Disconnects specific Source Servers from Application Migration Service. Data replication is stopped immediately. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. If the agent on the source server has not been prevented from communicating with the Application Migration Service service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectFromService: API.OperationMethod<
  DisconnectFromServiceRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisconnectFromServiceRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Finalizes the cutover immediately for specific Source Servers. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. The AWS Replication Agent will receive a command to uninstall itself (within 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be changed to DISCONNECTED; The SourceServer.lifeCycle.state will be changed to CUTOVER; The totalStorageBytes property fo each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const finalizeCutover: API.OperationMethod<
  FinalizeCutoverRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FinalizeCutoverRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Lists all LaunchConfigurations available, filtered by Source Server IDs.
 */
export const getLaunchConfiguration: API.OperationMethod<
  GetLaunchConfigurationRequest,
  LaunchConfiguration,
  ResourceNotFoundException | UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLaunchConfigurationRequest,
  output: LaunchConfiguration,
  errors: [ResourceNotFoundException, UninitializedAccountException],
}));
/**
 * Lists all ReplicationConfigurations, filtered by Source Server ID.
 */
export const getReplicationConfiguration: API.OperationMethod<
  GetReplicationConfigurationRequest,
  ReplicationConfiguration,
  ResourceNotFoundException | UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReplicationConfigurationRequest,
  output: ReplicationConfiguration,
  errors: [ResourceNotFoundException, UninitializedAccountException],
}));
/**
 * List source server post migration custom actions.
 */
export const listSourceServerActions: API.OperationMethod<
  ListSourceServerActionsRequest,
  ListSourceServerActionsResponse,
  ResourceNotFoundException | UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSourceServerActionsRequest,
  ) => stream.Stream<
    ListSourceServerActionsResponse,
    ResourceNotFoundException | UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSourceServerActionsRequest,
  ) => stream.Stream<
    SourceServerActionDocument,
    ResourceNotFoundException | UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSourceServerActionsRequest,
  output: ListSourceServerActionsResponse,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Archives specific Source Servers by setting the SourceServer.isArchived property to true for specified SourceServers by ID. This command only works for SourceServers with a lifecycle. state which equals DISCONNECTED or CUTOVER.
 */
export const markAsArchived: API.OperationMethod<
  MarkAsArchivedRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MarkAsArchivedRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Pause Replication.
 */
export const pauseReplication: API.OperationMethod<
  PauseReplicationRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PauseReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Put source server post migration custom action.
 */
export const putSourceServerAction: API.OperationMethod<
  PutSourceServerActionRequest,
  SourceServerActionDocument,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSourceServerActionRequest,
  output: SourceServerActionDocument,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Remove source server post migration custom action.
 */
export const removeSourceServerAction: API.OperationMethod<
  RemoveSourceServerActionRequest,
  RemoveSourceServerActionResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveSourceServerActionRequest,
  output: RemoveSourceServerActionResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Resume Replication.
 */
export const resumeReplication: API.OperationMethod<
  ResumeReplicationRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResumeReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Causes the data replication initiation sequence to begin immediately upon next Handshake for specified SourceServer IDs, regardless of when the previous initiation started. This command will not work if the SourceServer is not stalled or is in a DISCONNECTED or STOPPED state.
 */
export const retryDataReplication: API.OperationMethod<
  RetryDataReplicationRequest,
  SourceServer,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetryDataReplicationRequest,
  output: SourceServer,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Start replication for source server irrespective of its replication type.
 */
export const startReplication: API.OperationMethod<
  StartReplicationRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Stop Replication.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Updates multiple LaunchConfigurations by Source Server ID.
 *
 * bootMode valid values are `LEGACY_BIOS | UEFI`
 */
export const updateLaunchConfiguration: API.OperationMethod<
  UpdateLaunchConfigurationRequest,
  LaunchConfiguration,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLaunchConfigurationRequest,
  output: LaunchConfiguration,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Allows you to update multiple ReplicationConfigurations by Source Server ID.
 */
export const updateReplicationConfiguration: API.OperationMethod<
  UpdateReplicationConfigurationRequest,
  ReplicationConfiguration,
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateReplicationConfigurationRequest,
  output: ReplicationConfiguration,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Allows you to change between the AGENT_BASED replication type and the SNAPSHOT_SHIPPING replication type.
 *
 * SNAPSHOT_SHIPPING should be used for agentless replication.
 */
export const updateSourceServerReplicationType: API.OperationMethod<
  UpdateSourceServerReplicationTypeRequest,
  SourceServer,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSourceServerReplicationTypeRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Launches a Cutover Instance for specific Source Servers. This command starts a LAUNCH job whose initiatedBy property is StartCutover and changes the SourceServer.lifeCycle.state property to CUTTING_OVER.
 */
export const startCutover: API.OperationMethod<
  StartCutoverRequest,
  StartCutoverResponse,
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartCutoverRequest,
  output: StartCutoverResponse,
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Launches a Test Instance for specific Source Servers. This command starts a LAUNCH job whose initiatedBy property is StartTest and changes the SourceServer.lifeCycle.state property to TESTING.
 */
export const startTest: API.OperationMethod<
  StartTestRequest,
  StartTestResponse,
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartTestRequest,
  output: StartTestResponse,
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Starts a job that terminates specific launched EC2 Test and Cutover instances. This command will not work for any Source Server with a lifecycle.state of TESTING, CUTTING_OVER, or CUTOVER.
 */
export const terminateTargetInstances: API.OperationMethod<
  TerminateTargetInstancesRequest,
  TerminateTargetInstancesResponse,
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TerminateTargetInstancesRequest,
  output: TerminateTargetInstancesResponse,
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Deletes a given vCenter client by ID.
 */
export const deleteVcenterClient: API.OperationMethod<
  DeleteVcenterClientRequest,
  DeleteVcenterClientResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVcenterClientRequest,
  output: DeleteVcenterClientResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
}));
/**
 * Returns a list of the installed vCenter clients.
 */
export const describeVcenterClients: API.OperationMethod<
  DescribeVcenterClientsRequest,
  DescribeVcenterClientsResponse,
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeVcenterClientsRequest,
  ) => stream.Stream<
    DescribeVcenterClientsResponse,
    | ResourceNotFoundException
    | UninitializedAccountException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeVcenterClientsRequest,
  ) => stream.Stream<
    VcenterClient,
    | ResourceNotFoundException
    | UninitializedAccountException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeVcenterClientsRequest,
  output: DescribeVcenterClientsResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Create wave.
 */
export const createWave: API.OperationMethod<
  CreateWaveRequest,
  Wave,
  | ConflictException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWaveRequest,
  output: Wave,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Delete wave.
 */
export const deleteWave: API.OperationMethod<
  DeleteWaveRequest,
  DeleteWaveResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWaveRequest,
  output: DeleteWaveResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Retrieves all waves or multiple waves by ID.
 */
export const listWaves: API.OperationMethod<
  ListWavesRequest,
  ListWavesResponse,
  UninitializedAccountException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWavesRequest,
  ) => stream.Stream<
    ListWavesResponse,
    UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWavesRequest,
  ) => stream.Stream<
    Wave,
    UninitializedAccountException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWavesRequest,
  output: ListWavesResponse,
  errors: [UninitializedAccountException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Archive wave.
 */
export const archiveWave: API.OperationMethod<
  ArchiveWaveRequest,
  Wave,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ArchiveWaveRequest,
  output: Wave,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Associate applications to wave.
 */
export const associateApplications: API.OperationMethod<
  AssociateApplicationsRequest,
  AssociateApplicationsResponse,
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateApplicationsRequest,
  output: AssociateApplicationsResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Disassociate applications from wave.
 */
export const disassociateApplications: API.OperationMethod<
  DisassociateApplicationsRequest,
  DisassociateApplicationsResponse,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateApplicationsRequest,
  output: DisassociateApplicationsResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
/**
 * Unarchive wave.
 */
export const unarchiveWave: API.OperationMethod<
  UnarchiveWaveRequest,
  Wave,
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnarchiveWaveRequest,
  output: Wave,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
}));
/**
 * Update wave.
 */
export const updateWave: API.OperationMethod<
  UpdateWaveRequest,
  Wave,
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWaveRequest,
  output: Wave,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
}));
