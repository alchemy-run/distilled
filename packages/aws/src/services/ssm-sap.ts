import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Ssm Sap", serviceShapeName: "SsmSap" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ssm-sap" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://ssm-sap-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://ssm-sap-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-sap.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ssm-sap.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ssm-sap.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SsmSap",
  service: "SsmSap",
  propagate: TxXray.propagate,
} as const;

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type PermissionActionType = "RESTORE" | (string & {});
export type Arn = string;
export interface DeleteResourcePermissionInput {
  ActionType?: PermissionActionType | undefined;
  SourceResourceArn?: string | undefined;
  ResourceArn: string;
}
export interface DeleteResourcePermissionOutput {
  Policy?: string | undefined;
}
export type ApplicationId = string;
export interface DeregisterApplicationInput {
  ApplicationId: string;
}
export interface DeregisterApplicationOutput {}
export type SsmSapArn = string;
export type AppRegistryArn = string;
export interface GetApplicationInput {
  ApplicationId?: string | undefined;
  ApplicationArn?: string | undefined;
  AppRegistryArn?: string | undefined;
}
export type ApplicationType = "HANA" | "SAP_ABAP" | (string & {});
export type ApplicationStatus =
  | "ACTIVATED"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "FAILED"
  | "REGISTERING"
  | "DELETING"
  | "UNKNOWN"
  | (string & {});
export type ApplicationDiscoveryStatus =
  | "SUCCESS"
  | "REGISTRATION_FAILED"
  | "REFRESH_FAILED"
  | "REGISTERING"
  | "DELETING"
  | (string & {});
export type ComponentId = string;
export type ComponentIdList = string[];
export type ApplicationArnList = string[];
export interface Application {
  Id?: string | undefined;
  Type?: ApplicationType | undefined;
  Arn?: string | undefined;
  AppRegistryArn?: string | undefined;
  Status?: ApplicationStatus | undefined;
  DiscoveryStatus?: ApplicationDiscoveryStatus | undefined;
  Components?: string[] | undefined;
  LastUpdated?: Date | undefined;
  StatusMessage?: string | undefined;
  AssociatedApplicationArns?: string[] | undefined;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface GetApplicationOutput {
  Application?: Application | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetComponentInput {
  ApplicationId: string;
  ComponentId: string;
}
export type SID = string;
export type SAPInstanceNumber = string;
export type ComponentType =
  | "HANA"
  | "HANA_NODE"
  | "ABAP"
  | "ASCS"
  | "DIALOG"
  | "WEBDISP"
  | "WD"
  | "ERS"
  | (string & {});
export type ComponentStatus =
  | "ACTIVATED"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "RUNNING"
  | "RUNNING_WITH_ERROR"
  | "UNDEFINED"
  | (string & {});
export type ReplicationMode = "PRIMARY" | "NONE" | "SYNC" | "SYNCMEM" | "ASYNC" | (string & {});
export type OperationMode =
  | "PRIMARY"
  | "LOGREPLAY"
  | "DELTA_DATASHIPPING"
  | "LOGREPLAY_READACCESS"
  | "NONE"
  | (string & {});
export type ClusterStatus =
  | "ONLINE"
  | "STANDBY"
  | "MAINTENANCE"
  | "OFFLINE"
  | "NONE"
  | (string & {});
export interface Resilience {
  HsrTier?: string | undefined;
  HsrReplicationMode?: ReplicationMode | undefined;
  HsrOperationMode?: OperationMode | undefined;
  ClusterStatus?: ClusterStatus | undefined;
  EnqueueReplication?: boolean | undefined;
}
export type AllocationType = "VPC_SUBNET" | "ELASTIC_IP" | "OVERLAY" | "UNKNOWN" | (string & {});
export interface IpAddressMember {
  IpAddress?: string | undefined;
  Primary?: boolean | undefined;
  AllocationType?: AllocationType | undefined;
}
export type IpAddressList = IpAddressMember[];
export interface AssociatedHost {
  Hostname?: string | undefined;
  Ec2InstanceId?: string | undefined;
  IpAddresses?: IpAddressMember[] | undefined;
  OsVersion?: string | undefined;
}
export type DatabaseId = string;
export type DatabaseIdList = string[];
export type HostRole = "LEADER" | "WORKER" | "STANDBY" | "UNKNOWN" | (string & {});
export interface Host {
  HostName?: string | undefined;
  HostIp?: string | undefined;
  EC2InstanceId?: string | undefined;
  InstanceId?: string | undefined;
  HostRole?: HostRole | undefined;
  OsVersion?: string | undefined;
}
export type HostList = Host[];
export type DatabaseConnectionMethod = "DIRECT" | "OVERLAY" | (string & {});
export interface DatabaseConnection {
  DatabaseConnectionMethod?: DatabaseConnectionMethod | undefined;
  DatabaseArn?: string | undefined;
  ConnectionIp?: string | undefined;
}
export interface Component {
  ComponentId?: string | undefined;
  Sid?: string | undefined;
  SystemNumber?: string | undefined;
  ParentComponent?: string | undefined;
  ChildComponents?: string[] | undefined;
  ApplicationId?: string | undefined;
  ComponentType?: ComponentType | undefined;
  Status?: ComponentStatus | undefined;
  SapHostname?: string | undefined;
  SapFeature?: string | undefined;
  SapKernelVersion?: string | undefined;
  HdbVersion?: string | undefined;
  Resilience?: Resilience | undefined;
  AssociatedHost?: AssociatedHost | undefined;
  Databases?: string[] | undefined;
  Hosts?: Host[] | undefined;
  PrimaryHost?: string | undefined;
  DatabaseConnection?: DatabaseConnection | undefined;
  LastUpdated?: Date | undefined;
  Arn?: string | undefined;
}
export interface GetComponentOutput {
  Component?: Component | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type OperationId = string;
export interface GetConfigurationCheckOperationInput {
  OperationId: string;
}
export type OperationStatus = "INPROGRESS" | "SUCCESS" | "ERROR" | (string & {});
export type ConfigurationCheckType =
  | "SAP_CHECK_01"
  | "SAP_CHECK_02"
  | "SAP_CHECK_03"
  | (string & {});
export interface RuleStatusCounts {
  Failed?: number | undefined;
  Warning?: number | undefined;
  Info?: number | undefined;
  Passed?: number | undefined;
  Unknown?: number | undefined;
}
export interface ConfigurationCheckOperation {
  Id?: string | undefined;
  ApplicationId?: string | undefined;
  Status?: OperationStatus | undefined;
  StatusMessage?: string | undefined;
  ConfigurationCheckId?: ConfigurationCheckType | undefined;
  ConfigurationCheckName?: string | undefined;
  ConfigurationCheckDescription?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  RuleStatusCounts?: RuleStatusCounts | undefined;
}
export interface GetConfigurationCheckOperationOutput {
  ConfigurationCheckOperation?: ConfigurationCheckOperation | undefined;
}
export interface GetDatabaseInput {
  ApplicationId?: string | undefined;
  ComponentId?: string | undefined;
  DatabaseId?: string | undefined;
  DatabaseArn?: string | undefined;
}
export type DatabaseName = string;
export type CredentialType = "ADMIN" | (string & {});
export type SecretId = string | redacted.Redacted<string>;
export interface ApplicationCredential {
  DatabaseName: string;
  CredentialType: CredentialType;
  SecretId: string | redacted.Redacted<string>;
}
export type ApplicationCredentialList = ApplicationCredential[];
export type DatabaseType = "SYSTEM" | "TENANT" | (string & {});
export type DatabaseStatus =
  | "RUNNING"
  | "STARTING"
  | "STOPPED"
  | "WARNING"
  | "UNKNOWN"
  | "ERROR"
  | "STOPPING"
  | (string & {});
export type ComponentArnList = string[];
export interface Database {
  ApplicationId?: string | undefined;
  ComponentId?: string | undefined;
  Credentials?: ApplicationCredential[] | undefined;
  DatabaseId?: string | undefined;
  DatabaseName?: string | undefined;
  DatabaseType?: DatabaseType | undefined;
  Arn?: string | undefined;
  Status?: DatabaseStatus | undefined;
  PrimaryHost?: string | undefined;
  SQLPort?: number | undefined;
  LastUpdated?: Date | undefined;
  ConnectedComponentArns?: string[] | undefined;
}
export interface GetDatabaseOutput {
  Database?: Database | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetOperationInput {
  OperationId: string;
}
export type OperationType = string;
export type OperationProperties = { [key: string]: string | undefined };
export type ResourceType = string;
export type ResourceId = string;
export interface Operation {
  Id?: string | undefined;
  Type?: string | undefined;
  Status?: OperationStatus | undefined;
  StatusMessage?: string | undefined;
  Properties?: { [key: string]: string | undefined } | undefined;
  ResourceType?: string | undefined;
  ResourceId?: string | undefined;
  ResourceArn?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  LastUpdatedTime?: Date | undefined;
}
export interface GetOperationOutput {
  Operation?: Operation | undefined;
}
export interface GetResourcePermissionInput {
  ActionType?: PermissionActionType | undefined;
  ResourceArn: string;
}
export interface GetResourcePermissionOutput {
  Policy?: string | undefined;
}
export type NextToken = string;
export type MaxResults = number;
export type FilterName = string;
export type FilterValue = string;
export type FilterOperator = "Equals" | "GreaterThanOrEquals" | "LessThanOrEquals" | (string & {});
export interface Filter {
  Name: string;
  Value: string;
  Operator: FilterOperator;
}
export type FilterList = Filter[];
export interface ListApplicationsInput {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
}
export interface ApplicationSummary {
  Id?: string | undefined;
  DiscoveryStatus?: ApplicationDiscoveryStatus | undefined;
  Type?: ApplicationType | undefined;
  Arn?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type ApplicationSummaryList = ApplicationSummary[];
export interface ListApplicationsOutput {
  Applications?: ApplicationSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListComponentsInput {
  ApplicationId?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ComponentSummary {
  ApplicationId?: string | undefined;
  ComponentId?: string | undefined;
  ComponentType?: ComponentType | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  Arn?: string | undefined;
}
export type ComponentSummaryList = ComponentSummary[];
export interface ListComponentsOutput {
  Components?: ComponentSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListConfigurationCheckDefinitionsInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ApplicationTypeList = ApplicationType[];
export interface ConfigurationCheckDefinition {
  Id?: ConfigurationCheckType | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  ApplicableApplicationTypes?: ApplicationType[] | undefined;
}
export type ConfigurationCheckDefinitionList = ConfigurationCheckDefinition[];
export interface ListConfigurationCheckDefinitionsOutput {
  ConfigurationChecks?: ConfigurationCheckDefinition[] | undefined;
  NextToken?: string | undefined;
}
export type ConfigurationCheckOperationListingMode =
  | "ALL_OPERATIONS"
  | "LATEST_PER_CHECK"
  | (string & {});
export interface ListConfigurationCheckOperationsInput {
  ApplicationId: string;
  ListMode?: ConfigurationCheckOperationListingMode | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
}
export type ConfigurationCheckOperationList = ConfigurationCheckOperation[];
export interface ListConfigurationCheckOperationsOutput {
  ConfigurationCheckOperations?: ConfigurationCheckOperation[] | undefined;
  NextToken?: string | undefined;
}
export interface ListDatabasesInput {
  ApplicationId?: string | undefined;
  ComponentId?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DatabaseSummary {
  ApplicationId?: string | undefined;
  ComponentId?: string | undefined;
  DatabaseId?: string | undefined;
  DatabaseType?: DatabaseType | undefined;
  Arn?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type DatabaseSummaryList = DatabaseSummary[];
export interface ListDatabasesOutput {
  Databases?: DatabaseSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListOperationEventsInput {
  OperationId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
}
export type OperationEventResourceType = string;
export interface Resource {
  ResourceArn?: string | undefined;
  ResourceType?: string | undefined;
}
export type OperationEventStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export interface OperationEvent {
  Description?: string | undefined;
  Resource?: Resource | undefined;
  Status?: OperationEventStatus | undefined;
  StatusMessage?: string | undefined;
  Timestamp?: Date | undefined;
}
export type OperationEventList = OperationEvent[];
export interface ListOperationEventsOutput {
  OperationEvents?: OperationEvent[] | undefined;
  NextToken?: string | undefined;
}
export interface ListOperationsInput {
  ApplicationId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
}
export type OperationList = Operation[];
export interface ListOperationsOutput {
  Operations?: Operation[] | undefined;
  NextToken?: string | undefined;
}
export interface ListSubCheckResultsInput {
  OperationId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type SubCheckResultId = string;
export type SubCheckReferencesList = string[];
export interface SubCheckResult {
  Id?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  References?: string[] | undefined;
}
export type SubCheckResultList = SubCheckResult[];
export interface ListSubCheckResultsOutput {
  SubCheckResults?: SubCheckResult[] | undefined;
  NextToken?: string | undefined;
}
export interface ListSubCheckRuleResultsInput {
  SubCheckResultId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type RuleResultId = string;
export type RuleResultStatus = "PASSED" | "FAILED" | "WARNING" | "INFO" | "UNKNOWN" | (string & {});
export type RuleResultMetadataKey = string;
export type RuleResultMetadataValue = string;
export type RuleResultMetadata = { [key: string]: string | undefined };
export interface RuleResult {
  Id?: string | undefined;
  Description?: string | undefined;
  Status?: RuleResultStatus | undefined;
  Message?: string | undefined;
  Metadata?: { [key: string]: string | undefined } | undefined;
}
export type RuleResultList = RuleResult[];
export interface ListSubCheckRuleResultsOutput {
  RuleResults?: RuleResult[] | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutResourcePermissionInput {
  ActionType: PermissionActionType;
  SourceResourceArn: string;
  ResourceArn: string;
}
export interface PutResourcePermissionOutput {
  Policy?: string | undefined;
}
export type InstanceId = string;
export type InstanceList = string[];
export interface ComponentInfo {
  ComponentType: ComponentType;
  Sid: string;
  Ec2InstanceId: string;
}
export type ComponentInfoList = ComponentInfo[];
export interface RegisterApplicationInput {
  ApplicationId: string;
  ApplicationType: ApplicationType;
  Instances: string[];
  SapInstanceNumber?: string | undefined;
  Sid?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  Credentials?: ApplicationCredential[] | undefined;
  DatabaseArn?: string | undefined;
  ComponentsInfo?: ComponentInfo[] | undefined;
}
export interface RegisterApplicationOutput {
  Application?: Application | undefined;
  OperationId?: string | undefined;
}
export interface StartApplicationInput {
  ApplicationId: string;
}
export interface StartApplicationOutput {
  OperationId?: string | undefined;
}
export interface StartApplicationRefreshInput {
  ApplicationId: string;
}
export interface StartApplicationRefreshOutput {
  OperationId?: string | undefined;
}
export type ConfigurationCheckTypeList = ConfigurationCheckType[];
export interface StartConfigurationChecksInput {
  ApplicationId: string;
  ConfigurationCheckIds?: ConfigurationCheckType[] | undefined;
}
export interface StartConfigurationChecksOutput {
  ConfigurationCheckOperations?: ConfigurationCheckOperation[] | undefined;
}
export type ConnectedEntityType = "DBMS" | (string & {});
export interface StopApplicationInput {
  ApplicationId: string;
  StopConnectedEntity?: ConnectedEntityType | undefined;
  IncludeEc2InstanceShutdown?: boolean | undefined;
}
export interface StopApplicationOutput {
  OperationId?: string | undefined;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type BackintMode = "AWSBackup" | (string & {});
export interface BackintConfig {
  BackintMode: BackintMode;
  EnsureNoBackupInProcess: boolean;
}
export interface UpdateApplicationSettingsInput {
  ApplicationId: string;
  CredentialsToAddOrUpdate?: ApplicationCredential[] | undefined;
  CredentialsToRemove?: ApplicationCredential[] | undefined;
  Backint?: BackintConfig | undefined;
  DatabaseArn?: string | undefined;
}
export type OperationIdList = string[];
export interface UpdateApplicationSettingsOutput {
  Message?: string | undefined;
  OperationIds?: string[] | undefined;
}
export type DeleteResourcePermissionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes permissions associated with the target database.
 */
export const deleteResourcePermission: API.OperationMethod<
  DeleteResourcePermissionInput & RegionInput,
  DeleteResourcePermissionOutput,
  DeleteResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteResourcePermissionInput>,
  output: __S(464, __c29, 0) as any as S.Schema<DeleteResourcePermissionOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePermission",
  telemetry: TELEMETRY,
  span: "DeleteResourcePermission",
}));

export type DeregisterApplicationError =
  | InternalServerException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deregister an SAP application with AWS Systems Manager for SAP. This action does not aU+FB00ect the existing setup of your SAP workloads on Amazon EC2.
 */
export const deregisterApplication: API.OperationMethod<
  DeregisterApplicationInput & RegionInput,
  DeregisterApplicationOutput,
  DeregisterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeregisterApplicationInput>,
  output: __S(496, __c31, 0) as any as S.Schema<DeregisterApplicationOutput>,
  errors: [InternalServerException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterApplication",
  telemetry: TELEMETRY,
  span: "DeregisterApplication",
}));

export type GetApplicationError = InternalServerException | ValidationException | CommonErrors;
/**
 * Gets an application registered with AWS Systems Manager for SAP. It also returns the components of the application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput & RegionInput,
  GetApplicationOutput,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<GetApplicationInput>,
  output: __S(513, __c32, 1) as any as S.Schema<GetApplicationOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
  telemetry: TELEMETRY,
  span: "GetApplication",
}));

export type GetComponentError =
  | InternalServerException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Gets the component of an application registered with AWS Systems Manager for SAP.
 */
export const getComponent: API.OperationMethod<
  GetComponentInput & RegionInput,
  GetComponentOutput,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<GetComponentInput>,
  output: __S(585, __c36, 9) as any as S.Schema<GetComponentOutput>,
  errors: [InternalServerException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
  telemetry: TELEMETRY,
  span: "GetComponent",
}));

export type GetConfigurationCheckOperationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a configuration check operation by specifying the operation ID.
 */
export const getConfigurationCheckOperation: API.OperationMethod<
  GetConfigurationCheckOperationInput & RegionInput,
  GetConfigurationCheckOperationOutput,
  GetConfigurationCheckOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<GetConfigurationCheckOperationInput>,
  output: __S(593, __c37, 1) as any as S.Schema<GetConfigurationCheckOperationOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationCheckOperation",
  telemetry: TELEMETRY,
  span: "GetConfigurationCheckOperation",
}));

export type GetDatabaseError = InternalServerException | ValidationException | CommonErrors;
/**
 * Gets the SAP HANA database of an application registered with AWS Systems Manager for SAP.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseInput & RegionInput,
  GetDatabaseOutput,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetDatabaseInput>,
  output: __S(2, __c0, 2) as any as S.Schema<GetDatabaseOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
  telemetry: TELEMETRY,
  span: "GetDatabase",
}));

export type GetOperationError = InternalServerException | ValidationException | CommonErrors;
/**
 * Gets the details of an operation by specifying the operation ID.
 */
export const getOperation: API.OperationMethod<
  GetOperationInput & RegionInput,
  GetOperationOutput,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<GetOperationInput>,
  output: __S(33, __c2, 1) as any as S.Schema<GetOperationOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
  telemetry: TELEMETRY,
  span: "GetOperation",
}));

export type GetResourcePermissionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets permissions associated with the target database.
 */
export const getResourcePermission: API.OperationMethod<
  GetResourcePermissionInput & RegionInput,
  GetResourcePermissionOutput,
  GetResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<GetResourcePermissionInput>,
  output: __S(464, __c29, 0) as any as S.Schema<GetResourcePermissionOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePermission",
  telemetry: TELEMETRY,
  span: "GetResourcePermission",
}));

export type ListApplicationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the applications registered with AWS Systems Manager for SAP.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsInput & RegionInput,
  ListApplicationsOutput,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<ListApplicationsInput>,
  output: __S(83, __c5, 3) as any as S.Schema<ListApplicationsOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListApplications",
})) as any;

export type ListComponentsError =
  | InternalServerException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the components registered with AWS Systems Manager for SAP.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsInput & RegionInput,
  ListComponentsOutput,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  ComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ListComponentsInput>,
  output: __S(115, __c7, 3) as any as S.Schema<ListComponentsOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Components",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListComponents",
})) as any;

export type ListConfigurationCheckDefinitionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all configuration check types supported by AWS Systems Manager for SAP.
 */
export const listConfigurationCheckDefinitions: API.PaginatedOperationMethod<
  ListConfigurationCheckDefinitionsInput & RegionInput,
  ListConfigurationCheckDefinitionsOutput,
  ListConfigurationCheckDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationCheckDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<ListConfigurationCheckDefinitionsInput>,
  output: __S(131, __c8, 3) as any as S.Schema<ListConfigurationCheckDefinitionsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationCheckDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationChecks",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConfigurationCheckDefinitions",
})) as any;

export type ListConfigurationCheckOperationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the configuration check operations performed by AWS Systems Manager for SAP.
 */
export const listConfigurationCheckOperations: API.PaginatedOperationMethod<
  ListConfigurationCheckOperationsInput & RegionInput,
  ListConfigurationCheckOperationsOutput,
  ListConfigurationCheckOperationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationCheckOperation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<ListConfigurationCheckOperationsInput>,
  output: __S(161, __c10, 1) as any as S.Schema<ListConfigurationCheckOperationsOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationCheckOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationCheckOperations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConfigurationCheckOperations",
})) as any;

export type ListDatabasesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the SAP HANA databases of an application registered with AWS Systems Manager for SAP.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesInput & RegionInput,
  ListDatabasesOutput,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  DatabaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<ListDatabasesInput>,
  output: __S(195, __c12, 3) as any as S.Schema<ListDatabasesOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Databases",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDatabases",
})) as any;

export type ListOperationEventsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Returns a list of operations events.
 *
 * Available parameters include `OperationID`, as well as optional parameters `MaxResults`, `NextToken`, and `Filters`.
 */
export const listOperationEvents: API.PaginatedOperationMethod<
  ListOperationEventsInput & RegionInput,
  ListOperationEventsOutput,
  ListOperationEventsError,
  Credentials | HttpClient.HttpClient,
  OperationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<ListOperationEventsInput>,
  output: __S(212, __c13, 4) as any as S.Schema<ListOperationEventsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperationEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OperationEvents",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOperationEvents",
})) as any;

export type ListOperationsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the operations performed by AWS Systems Manager for SAP.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsInput & RegionInput,
  ListOperationsOutput,
  ListOperationsError,
  Credentials | HttpClient.HttpClient,
  Operation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<ListOperationsInput>,
  output: __S(226, __c14, 2) as any as S.Schema<ListOperationsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Operations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOperations",
})) as any;

export type ListSubCheckResultsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the sub-check results of a specified configuration check operation.
 */
export const listSubCheckResults: API.PaginatedOperationMethod<
  ListSubCheckResultsInput & RegionInput,
  ListSubCheckResultsOutput,
  ListSubCheckResultsError,
  Credentials | HttpClient.HttpClient,
  SubCheckResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListSubCheckResultsInput>,
  output: __S(243, __c15, 3) as any as S.Schema<ListSubCheckResultsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubCheckResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SubCheckResults",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSubCheckResults",
})) as any;

export type ListSubCheckRuleResultsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules of a specified sub-check belonging to a configuration check operation.
 */
export const listSubCheckRuleResults: API.PaginatedOperationMethod<
  ListSubCheckRuleResultsInput & RegionInput,
  ListSubCheckRuleResultsOutput,
  ListSubCheckRuleResultsError,
  Credentials | HttpClient.HttpClient,
  RuleResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListSubCheckRuleResultsInput>,
  output: __S(259, __c16, 3) as any as S.Schema<ListSubCheckRuleResultsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubCheckRuleResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleResults",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSubCheckRuleResults",
})) as any;

export type ListTagsForResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on an SAP HANA application and/or database registered with AWS Systems Manager for SAP.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type PutResourcePermissionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds permissions to the target database.
 */
export const putResourcePermission: API.OperationMethod<
  PutResourcePermissionInput & RegionInput,
  PutResourcePermissionOutput,
  PutResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<PutResourcePermissionInput>,
  output: __S(464, __c29, 0) as any as S.Schema<PutResourcePermissionOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePermission",
  telemetry: TELEMETRY,
  span: "PutResourcePermission",
}));

export type RegisterApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Register an SAP application with AWS Systems Manager for SAP. You must meet the following requirements before registering.
 *
 * The SAP application you want to register with AWS Systems Manager for SAP is running on Amazon EC2.
 *
 * AWS Systems Manager Agent must be setup on an Amazon EC2 instance along with the required IAM permissions.
 *
 * Amazon EC2 instance(s) must have access to the secrets created in AWS Secrets Manager to manage SAP applications and components.
 */
export const registerApplication: API.OperationMethod<
  RegisterApplicationInput & RegionInput,
  RegisterApplicationOutput,
  RegisterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(306, __c19, 2) as any as S.Schema<RegisterApplicationInput>,
  output: __S(307, __c19, 3) as any as S.Schema<RegisterApplicationOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterApplication",
  telemetry: TELEMETRY,
  span: "RegisterApplication",
}));

export type StartApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Request is an operation which starts an application.
 *
 * Parameter `ApplicationId` is required.
 */
export const startApplication: API.OperationMethod<
  StartApplicationInput & RegionInput,
  StartApplicationOutput,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<StartApplicationInput>,
  output: __S(336, __c21, 0) as any as S.Schema<StartApplicationOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
  telemetry: TELEMETRY,
  span: "StartApplication",
}));

export type StartApplicationRefreshError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Refreshes a registered application.
 */
export const startApplicationRefresh: API.OperationMethod<
  StartApplicationRefreshInput & RegionInput,
  StartApplicationRefreshOutput,
  StartApplicationRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<StartApplicationRefreshInput>,
  output: __S(336, __c21, 0) as any as S.Schema<StartApplicationRefreshOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplicationRefresh",
  telemetry: TELEMETRY,
  span: "StartApplicationRefresh",
}));

export type StartConfigurationChecksError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Initiates configuration check operations against a specified application.
 */
export const startConfigurationChecks: API.OperationMethod<
  StartConfigurationChecksInput & RegionInput,
  StartConfigurationChecksOutput,
  StartConfigurationChecksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<StartConfigurationChecksInput>,
  output: __S(369, __c23, 1) as any as S.Schema<StartConfigurationChecksOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationChecks",
  telemetry: TELEMETRY,
  span: "StartConfigurationChecks",
}));

export type StopApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Request is an operation to stop an application.
 *
 * Parameter `ApplicationId` is required. Parameters `StopConnectedEntity` and `IncludeEc2InstanceShutdown` are optional.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationInput & RegionInput,
  StopApplicationOutput,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<StopApplicationInput>,
  output: __S(336, __c21, 0) as any as S.Schema<StopApplicationOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
  telemetry: TELEMETRY,
  span: "StopApplication",
}));

export type TagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates tag for a resource by specifying the ARN.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the tags for a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateApplicationSettingsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings of an application registered with AWS Systems Manager for SAP.
 */
export const updateApplicationSettings: API.OperationMethod<
  UpdateApplicationSettingsInput & RegionInput,
  UpdateApplicationSettingsOutput,
  UpdateApplicationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(433, __c27, 1) as any as S.Schema<UpdateApplicationSettingsInput>,
  output: __S(434, __c27, 2) as any as S.Schema<UpdateApplicationSettingsOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationSettings",
  telemetry: TELEMETRY,
  span: "UpdateApplicationSettings",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ComponentId: S.optional(S.String),
          DatabaseId: S.optional(S.String),
          DatabaseArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-database" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDatabaseInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ComponentId: S.optional(S.String),
          Credentials: S.optional(__S(17, __c1, 1)),
          DatabaseId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          DatabaseType: S.optional(S.String),
          Arn: S.optional(S.String),
          Status: S.optional(S.String),
          PrimaryHost: S.optional(S.String),
          SQLPort: S.optional(S.Number),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ConnectedComponentArns: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "Database" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Database: S.optional(__S(1, __c0, 1)), Tags: S.optional(__S(544, __c34, 0)) }),
      ).annotate({ identifier: "GetDatabaseOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String, CredentialType: S.String, SecretId: SensitiveString }),
      ).annotate({ identifier: "ApplicationCredential" });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OperationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-operation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOperationInput" });
    case 1:
      return S.suspend(() => S.Struct({ Operation: S.optional(__S(49, __c3, 1)) })).annotate({
        identifier: "GetOperationOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional)).pipe(
        /*@__PURE__*/ T.Sparse(),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Properties: S.optional(__S(48, __c3, 0)),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Operation" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActionType: S.optional(S.String), ResourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-resource-permission" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePermissionInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-applications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          DiscoveryStatus: S.optional(S.String),
          Type: S.optional(S.String),
          Arn: S.optional(S.String),
          Tags: S.optional(__S(544, __c34, 0)),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(81, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Applications: S.optional(__S(82, __c5, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.String, Operator: S.String }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-components" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListComponentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ComponentId: S.optional(S.String),
          ComponentType: S.optional(S.String),
          Tags: S.optional(__S(544, __c34, 0)),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentSummary" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Components: S.optional(__S(114, __c7, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListComponentsOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-configuration-check-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationCheckDefinitionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ApplicableApplicationTypes: S.optional(__S(144, __c9, 0)),
        }),
      ).annotate({ identifier: "ConfigurationCheckDefinition" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationChecks: S.optional(__S(130, __c8, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationCheckDefinitionsOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          ListMode: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-configuration-check-operations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationCheckOperationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationCheckOperations: S.optional(__S(176, __c11, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationCheckOperationsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(609, __c38, 1));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ComponentId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-databases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDatabasesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ComponentId: S.optional(S.String),
          DatabaseId: S.optional(S.String),
          DatabaseType: S.optional(S.String),
          Arn: S.optional(S.String),
          Tags: S.optional(__S(544, __c34, 0)),
        }),
      ).annotate({ identifier: "DatabaseSummary" });
    case 2:
      return S.Array(__S(193, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Databases: S.optional(__S(194, __c12, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDatabasesOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OperationId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-operation-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOperationEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), ResourceType: S.optional(S.String) }),
      ).annotate({ identifier: "Resource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Resource: S.optional(__S(209, __c13, 1)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OperationEvent" });
    case 3:
      return S.Array(__S(210, __c13, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          OperationEvents: S.optional(__S(211, __c13, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOperationEventsOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-operations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOperationsInput" });
    case 1:
      return S.Array(__S(49, __c3, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Operations: S.optional(__S(225, __c14, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOperationsOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OperationId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-sub-check-results" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubCheckResultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          References: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "SubCheckResult" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SubCheckResults: S.optional(__S(242, __c15, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSubCheckResultsOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubCheckResultId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-sub-check-rule-results" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubCheckRuleResultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          Metadata: S.optional(__S(544, __c34, 0)),
        }),
      ).annotate({ identifier: "RuleResult" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ RuleResults: S.optional(__S(258, __c16, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubCheckRuleResultsOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(544, __c34, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActionType: S.String, SourceResourceArn: S.String, ResourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-resource-permission" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePermissionInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ComponentType: S.String, Sid: S.String, Ec2InstanceId: S.String }),
      ).annotate({ identifier: "ComponentInfo" });
    case 1:
      return S.Array(__S(304, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          ApplicationType: S.String,
          Instances: __S(560, __c35, 0),
          SapInstanceNumber: S.optional(S.String),
          Sid: S.optional(S.String),
          Tags: S.optional(__S(544, __c34, 0)),
          Credentials: S.optional(__S(17, __c1, 1)),
          DatabaseArn: S.optional(S.String),
          ComponentsInfo: S.optional(__S(305, __c19, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/register-application" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterApplicationInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Application: S.optional(__S(528, __c33, 0)),
          OperationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisterApplicationOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-application" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartApplicationInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OperationId: S.optional(S.String) })).annotate({
        identifier: "StartApplicationOutput",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-application-refresh" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartApplicationRefreshInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          ConfigurationCheckIds: S.optional(__S(144, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-configuration-checks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartConfigurationChecksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConfigurationCheckOperations: S.optional(__S(176, __c11, 0)) }),
      ).annotate({ identifier: "StartConfigurationChecksOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          StopConnectedEntity: S.optional(S.String),
          IncludeEc2InstanceShutdown: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/stop-application" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopApplicationInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(544, __c34, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(560, __c35, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackintMode: S.String, EnsureNoBackupInProcess: S.Boolean }),
      ).annotate({ identifier: "BackintConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          CredentialsToAddOrUpdate: S.optional(__S(17, __c1, 1)),
          CredentialsToRemove: S.optional(__S(17, __c1, 1)),
          Backint: S.optional(__S(432, __c27, 0)),
          DatabaseArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-application-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationSettingsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), OperationIds: S.optional(__S(560, __c35, 0)) }),
      ).annotate({ identifier: "UpdateApplicationSettingsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActionType: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          ResourceArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-resource-permission" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePermissionInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "DeleteResourcePermissionOutput",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deregister-application" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterApplicationInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeregisterApplicationOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
          AppRegistryArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-application" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Application: S.optional(__S(528, __c33, 0)),
          Tags: S.optional(__S(544, __c34, 0)),
        }),
      ).annotate({ identifier: "GetApplicationOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Arn: S.optional(S.String),
          AppRegistryArn: S.optional(S.String),
          Status: S.optional(S.String),
          DiscoveryStatus: S.optional(S.String),
          Components: S.optional(__S(560, __c35, 0)),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusMessage: S.optional(S.String),
          AssociatedApplicationArns: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "Application" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String, ComponentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-component" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComponentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HsrTier: S.optional(S.String),
          HsrReplicationMode: S.optional(S.String),
          HsrOperationMode: S.optional(S.String),
          ClusterStatus: S.optional(S.String),
          EnqueueReplication: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Resilience" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IpAddress: S.optional(S.String),
          Primary: S.optional(S.Boolean),
          AllocationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpAddressMember" });
    case 3:
      return S.Array(__S(578, __c36, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Hostname: S.optional(S.String),
          Ec2InstanceId: S.optional(S.String),
          IpAddresses: S.optional(__S(579, __c36, 3)),
          OsVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedHost" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          HostName: S.optional(S.String),
          HostIp: S.optional(S.String),
          EC2InstanceId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          HostRole: S.optional(S.String),
          OsVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Host" });
    case 6:
      return S.Array(__S(581, __c36, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DatabaseConnectionMethod: S.optional(S.String),
          DatabaseArn: S.optional(S.String),
          ConnectionIp: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatabaseConnection" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ComponentId: S.optional(S.String),
          Sid: S.optional(S.String),
          SystemNumber: S.optional(S.String),
          ParentComponent: S.optional(S.String),
          ChildComponents: S.optional(__S(560, __c35, 0)),
          ApplicationId: S.optional(S.String),
          ComponentType: S.optional(S.String),
          Status: S.optional(S.String),
          SapHostname: S.optional(S.String),
          SapFeature: S.optional(S.String),
          SapKernelVersion: S.optional(S.String),
          HdbVersion: S.optional(S.String),
          Resilience: S.optional(__S(577, __c36, 1)),
          AssociatedHost: S.optional(__S(580, __c36, 4)),
          Databases: S.optional(__S(560, __c35, 0)),
          Hosts: S.optional(__S(582, __c36, 6)),
          PrimaryHost: S.optional(S.String),
          DatabaseConnection: S.optional(__S(583, __c36, 7)),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Component" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Component: S.optional(__S(584, __c36, 8)),
          Tags: S.optional(__S(544, __c34, 0)),
        }),
      ).annotate({ identifier: "GetComponentOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OperationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-configuration-check-operation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationCheckOperationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConfigurationCheckOperation: S.optional(__S(609, __c38, 1)) }),
      ).annotate({ identifier: "GetConfigurationCheckOperationOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Failed: S.optional(S.Number),
          Warning: S.optional(S.Number),
          Info: S.optional(S.Number),
          Passed: S.optional(S.Number),
          Unknown: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RuleStatusCounts" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ConfigurationCheckId: S.optional(S.String),
          ConfigurationCheckName: S.optional(S.String),
          ConfigurationCheckDescription: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RuleStatusCounts: S.optional(__S(608, __c38, 0)),
        }),
      ).annotate({ identifier: "ConfigurationCheckOperation" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
