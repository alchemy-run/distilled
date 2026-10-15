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
  ).pipe(C.withServerError) {}
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
  ActionType?: PermissionActionType;
  SourceResourceArn?: string;
  ResourceArn: string;
}
export interface DeleteResourcePermissionOutput {
  Policy?: string;
}
export type ApplicationId = string;
export interface DeregisterApplicationInput {
  ApplicationId: string;
}
export interface DeregisterApplicationOutput {}
export type SsmSapArn = string;
export type AppRegistryArn = string;
export interface GetApplicationInput {
  ApplicationId?: string;
  ApplicationArn?: string;
  AppRegistryArn?: string;
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
  Id?: string;
  Type?: ApplicationType;
  Arn?: string;
  AppRegistryArn?: string;
  Status?: ApplicationStatus;
  DiscoveryStatus?: ApplicationDiscoveryStatus;
  Components?: string[];
  LastUpdated?: Date;
  StatusMessage?: string;
  AssociatedApplicationArns?: string[];
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface GetApplicationOutput {
  Application?: Application;
  Tags?: { [key: string]: string | undefined };
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
  HsrTier?: string;
  HsrReplicationMode?: ReplicationMode;
  HsrOperationMode?: OperationMode;
  ClusterStatus?: ClusterStatus;
  EnqueueReplication?: boolean;
}
export type AllocationType = "VPC_SUBNET" | "ELASTIC_IP" | "OVERLAY" | "UNKNOWN" | (string & {});
export interface IpAddressMember {
  IpAddress?: string;
  Primary?: boolean;
  AllocationType?: AllocationType;
}
export type IpAddressList = IpAddressMember[];
export interface AssociatedHost {
  Hostname?: string;
  Ec2InstanceId?: string;
  IpAddresses?: IpAddressMember[];
  OsVersion?: string;
}
export type DatabaseId = string;
export type DatabaseIdList = string[];
export type HostRole = "LEADER" | "WORKER" | "STANDBY" | "UNKNOWN" | (string & {});
export interface Host {
  HostName?: string;
  HostIp?: string;
  EC2InstanceId?: string;
  InstanceId?: string;
  HostRole?: HostRole;
  OsVersion?: string;
}
export type HostList = Host[];
export type DatabaseConnectionMethod = "DIRECT" | "OVERLAY" | (string & {});
export interface DatabaseConnection {
  DatabaseConnectionMethod?: DatabaseConnectionMethod;
  DatabaseArn?: string;
  ConnectionIp?: string;
}
export interface Component {
  ComponentId?: string;
  Sid?: string;
  SystemNumber?: string;
  ParentComponent?: string;
  ChildComponents?: string[];
  ApplicationId?: string;
  ComponentType?: ComponentType;
  Status?: ComponentStatus;
  SapHostname?: string;
  SapFeature?: string;
  SapKernelVersion?: string;
  HdbVersion?: string;
  Resilience?: Resilience;
  AssociatedHost?: AssociatedHost;
  Databases?: string[];
  Hosts?: Host[];
  PrimaryHost?: string;
  DatabaseConnection?: DatabaseConnection;
  LastUpdated?: Date;
  Arn?: string;
}
export interface GetComponentOutput {
  Component?: Component;
  Tags?: { [key: string]: string | undefined };
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
  Failed?: number;
  Warning?: number;
  Info?: number;
  Passed?: number;
  Unknown?: number;
}
export interface ConfigurationCheckOperation {
  Id?: string;
  ApplicationId?: string;
  Status?: OperationStatus;
  StatusMessage?: string;
  ConfigurationCheckId?: ConfigurationCheckType;
  ConfigurationCheckName?: string;
  ConfigurationCheckDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  RuleStatusCounts?: RuleStatusCounts;
}
export interface GetConfigurationCheckOperationOutput {
  ConfigurationCheckOperation?: ConfigurationCheckOperation;
}
export interface GetDatabaseInput {
  ApplicationId?: string;
  ComponentId?: string;
  DatabaseId?: string;
  DatabaseArn?: string;
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
  ApplicationId?: string;
  ComponentId?: string;
  Credentials?: ApplicationCredential[];
  DatabaseId?: string;
  DatabaseName?: string;
  DatabaseType?: DatabaseType;
  Arn?: string;
  Status?: DatabaseStatus;
  PrimaryHost?: string;
  SQLPort?: number;
  LastUpdated?: Date;
  ConnectedComponentArns?: string[];
}
export interface GetDatabaseOutput {
  Database?: Database;
  Tags?: { [key: string]: string | undefined };
}
export interface GetOperationInput {
  OperationId: string;
}
export type OperationType = string;
export type OperationProperties = { [key: string]: string | undefined };
export type ResourceType = string;
export type ResourceId = string;
export interface Operation {
  Id?: string;
  Type?: string;
  Status?: OperationStatus;
  StatusMessage?: string;
  Properties?: { [key: string]: string | undefined };
  ResourceType?: string;
  ResourceId?: string;
  ResourceArn?: string;
  StartTime?: Date;
  EndTime?: Date;
  LastUpdatedTime?: Date;
}
export interface GetOperationOutput {
  Operation?: Operation;
}
export interface GetResourcePermissionInput {
  ActionType?: PermissionActionType;
  ResourceArn: string;
}
export interface GetResourcePermissionOutput {
  Policy?: string;
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
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface ApplicationSummary {
  Id?: string;
  DiscoveryStatus?: ApplicationDiscoveryStatus;
  Type?: ApplicationType;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ApplicationSummaryList = ApplicationSummary[];
export interface ListApplicationsOutput {
  Applications?: ApplicationSummary[];
  NextToken?: string;
}
export interface ListComponentsInput {
  ApplicationId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ComponentSummary {
  ApplicationId?: string;
  ComponentId?: string;
  ComponentType?: ComponentType;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export type ComponentSummaryList = ComponentSummary[];
export interface ListComponentsOutput {
  Components?: ComponentSummary[];
  NextToken?: string;
}
export interface ListConfigurationCheckDefinitionsInput {
  MaxResults?: number;
  NextToken?: string;
}
export type ApplicationTypeList = ApplicationType[];
export interface ConfigurationCheckDefinition {
  Id?: ConfigurationCheckType;
  Name?: string;
  Description?: string;
  ApplicableApplicationTypes?: ApplicationType[];
}
export type ConfigurationCheckDefinitionList = ConfigurationCheckDefinition[];
export interface ListConfigurationCheckDefinitionsOutput {
  ConfigurationChecks?: ConfigurationCheckDefinition[];
  NextToken?: string;
}
export type ConfigurationCheckOperationListingMode =
  | "ALL_OPERATIONS"
  | "LATEST_PER_CHECK"
  | (string & {});
export interface ListConfigurationCheckOperationsInput {
  ApplicationId: string;
  ListMode?: ConfigurationCheckOperationListingMode;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type ConfigurationCheckOperationList = ConfigurationCheckOperation[];
export interface ListConfigurationCheckOperationsOutput {
  ConfigurationCheckOperations?: ConfigurationCheckOperation[];
  NextToken?: string;
}
export interface ListDatabasesInput {
  ApplicationId?: string;
  ComponentId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DatabaseSummary {
  ApplicationId?: string;
  ComponentId?: string;
  DatabaseId?: string;
  DatabaseType?: DatabaseType;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export type DatabaseSummaryList = DatabaseSummary[];
export interface ListDatabasesOutput {
  Databases?: DatabaseSummary[];
  NextToken?: string;
}
export interface ListOperationEventsInput {
  OperationId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type OperationEventResourceType = string;
export interface Resource {
  ResourceArn?: string;
  ResourceType?: string;
}
export type OperationEventStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export interface OperationEvent {
  Description?: string;
  Resource?: Resource;
  Status?: OperationEventStatus;
  StatusMessage?: string;
  Timestamp?: Date;
}
export type OperationEventList = OperationEvent[];
export interface ListOperationEventsOutput {
  OperationEvents?: OperationEvent[];
  NextToken?: string;
}
export interface ListOperationsInput {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type OperationList = Operation[];
export interface ListOperationsOutput {
  Operations?: Operation[];
  NextToken?: string;
}
export interface ListSubCheckResultsInput {
  OperationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SubCheckResultId = string;
export type SubCheckReferencesList = string[];
export interface SubCheckResult {
  Id?: string;
  Name?: string;
  Description?: string;
  References?: string[];
}
export type SubCheckResultList = SubCheckResult[];
export interface ListSubCheckResultsOutput {
  SubCheckResults?: SubCheckResult[];
  NextToken?: string;
}
export interface ListSubCheckRuleResultsInput {
  SubCheckResultId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type RuleResultId = string;
export type RuleResultStatus = "PASSED" | "FAILED" | "WARNING" | "INFO" | "UNKNOWN" | (string & {});
export type RuleResultMetadataKey = string;
export type RuleResultMetadataValue = string;
export type RuleResultMetadata = { [key: string]: string | undefined };
export interface RuleResult {
  Id?: string;
  Description?: string;
  Status?: RuleResultStatus;
  Message?: string;
  Metadata?: { [key: string]: string | undefined };
}
export type RuleResultList = RuleResult[];
export interface ListSubCheckRuleResultsOutput {
  RuleResults?: RuleResult[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutResourcePermissionInput {
  ActionType: PermissionActionType;
  SourceResourceArn: string;
  ResourceArn: string;
}
export interface PutResourcePermissionOutput {
  Policy?: string;
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
  SapInstanceNumber?: string;
  Sid?: string;
  Tags?: { [key: string]: string | undefined };
  Credentials?: ApplicationCredential[];
  DatabaseArn?: string;
  ComponentsInfo?: ComponentInfo[];
}
export interface RegisterApplicationOutput {
  Application?: Application;
  OperationId?: string;
}
export interface StartApplicationInput {
  ApplicationId: string;
}
export interface StartApplicationOutput {
  OperationId?: string;
}
export interface StartApplicationRefreshInput {
  ApplicationId: string;
}
export interface StartApplicationRefreshOutput {
  OperationId?: string;
}
export type ConfigurationCheckTypeList = ConfigurationCheckType[];
export interface StartConfigurationChecksInput {
  ApplicationId: string;
  ConfigurationCheckIds?: ConfigurationCheckType[];
}
export interface StartConfigurationChecksOutput {
  ConfigurationCheckOperations?: ConfigurationCheckOperation[];
}
export type ConnectedEntityType = "DBMS" | (string & {});
export interface StopApplicationInput {
  ApplicationId: string;
  StopConnectedEntity?: ConnectedEntityType;
  IncludeEc2InstanceShutdown?: boolean;
}
export interface StopApplicationOutput {
  OperationId?: string;
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
  CredentialsToAddOrUpdate?: ApplicationCredential[];
  CredentialsToRemove?: ApplicationCredential[];
  Backint?: BackintConfig;
  DatabaseArn?: string;
}
export type OperationIdList = string[];
export interface UpdateApplicationSettingsOutput {
  Message?: string;
  OperationIds?: string[];
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
  DeleteResourcePermissionInput,
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
  DeregisterApplicationInput,
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
}));

export type GetApplicationError = InternalServerException | ValidationException | CommonErrors;
/**
 * Gets an application registered with AWS Systems Manager for SAP. It also returns the components of the application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput,
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
  GetComponentInput,
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
}));

export type GetConfigurationCheckOperationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a configuration check operation by specifying the operation ID.
 */
export const getConfigurationCheckOperation: API.OperationMethod<
  GetConfigurationCheckOperationInput,
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
}));

export type GetDatabaseError = InternalServerException | ValidationException | CommonErrors;
/**
 * Gets the SAP HANA database of an application registered with AWS Systems Manager for SAP.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseInput,
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
}));

export type GetOperationError = InternalServerException | ValidationException | CommonErrors;
/**
 * Gets the details of an operation by specifying the operation ID.
 */
export const getOperation: API.OperationMethod<
  GetOperationInput,
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
  GetResourcePermissionInput,
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
  ListApplicationsInput,
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
  ListComponentsInput,
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
})) as any;

export type ListConfigurationCheckDefinitionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all configuration check types supported by AWS Systems Manager for SAP.
 */
export const listConfigurationCheckDefinitions: API.PaginatedOperationMethod<
  ListConfigurationCheckDefinitionsInput,
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
  ListConfigurationCheckOperationsInput,
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
  ListDatabasesInput,
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
})) as any;

export type ListOperationEventsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Returns a list of operations events.
 *
 * Available parameters include `OperationID`, as well as optional parameters `MaxResults`, `NextToken`, and `Filters`.
 */
export const listOperationEvents: API.PaginatedOperationMethod<
  ListOperationEventsInput,
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
})) as any;

export type ListOperationsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the operations performed by AWS Systems Manager for SAP.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsInput,
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
})) as any;

export type ListSubCheckResultsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the sub-check results of a specified configuration check operation.
 */
export const listSubCheckResults: API.PaginatedOperationMethod<
  ListSubCheckResultsInput,
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
})) as any;

export type ListSubCheckRuleResultsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules of a specified sub-check belonging to a configuration check operation.
 */
export const listSubCheckRuleResults: API.PaginatedOperationMethod<
  ListSubCheckRuleResultsInput,
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
  ListTagsForResourceRequest,
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
  PutResourcePermissionInput,
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
  RegisterApplicationInput,
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
  StartApplicationInput,
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
  StartApplicationRefreshInput,
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
  StartConfigurationChecksInput,
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
  StopApplicationInput,
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
  TagResourceRequest,
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
  UntagResourceRequest,
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
  UpdateApplicationSettingsInput,
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
