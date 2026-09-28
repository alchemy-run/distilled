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
  sdkId: "Ssm Sap",
  target: "SsmSap",
  version: "2018-05-10",
  sigv4: "ssm-sap",
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
                `https://ssm-sap-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ssm-sap-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ssm-sap.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ssm-sap.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ReplicationMode =
  | "PRIMARY"
  | "NONE"
  | "SYNC"
  | "SYNCMEM"
  | "ASYNC"
  | (string & {});
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
export type AllocationType =
  | "VPC_SUBNET"
  | "ELASTIC_IP"
  | "OVERLAY"
  | "UNKNOWN"
  | (string & {});
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
export type HostRole =
  | "LEADER"
  | "WORKER"
  | "STANDBY"
  | "UNKNOWN"
  | (string & {});
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
export type OperationStatus =
  | "INPROGRESS"
  | "SUCCESS"
  | "ERROR"
  | (string & {});
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
export type FilterOperator =
  | "Equals"
  | "GreaterThanOrEquals"
  | "LessThanOrEquals"
  | (string & {});
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
export type OperationEventStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type RuleResultStatus =
  | "PASSED"
  | "FAILED"
  | "WARNING"
  | "INFO"
  | "UNKNOWN"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /delete-resource-permission",
    input: { ActionType: 0, SourceResourceArn: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePermission",
})) as any;

export type DeregisterApplicationError =
  | InternalServerException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deregister an SAP application with AWS Systems Manager for SAP. This action does not aﬀect the existing setup of your SAP workloads on Amazon EC2.
 */
export const deregisterApplication: API.OperationMethod<
  DeregisterApplicationInput,
  DeregisterApplicationOutput,
  DeregisterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /deregister-application",
    input: { ApplicationId: 0 },
    body: true,
  },
  errors: [InternalServerException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterApplication",
})) as any;

export type GetApplicationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets an application registered with AWS Systems Manager for SAP. It also returns the components of the application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput,
  GetApplicationOutput,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-application",
    input: { ApplicationId: 0, ApplicationArn: 0, AppRegistryArn: 0 },
    output: { Application: o_Application },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-component",
    input: { ApplicationId: 0, ComponentId: 0 },
    output: { Component: { LastUpdated: D.ts } },
    body: true,
  },
  errors: [InternalServerException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-configuration-check-operation",
    input: { OperationId: 0 },
    output: { ConfigurationCheckOperation: o_ConfigurationCheckOperation },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationCheckOperation",
})) as any;

export type GetDatabaseError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the SAP HANA database of an application registered with AWS Systems Manager for SAP.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseInput,
  GetDatabaseOutput,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-database",
    input: { ApplicationId: 0, ComponentId: 0, DatabaseId: 0, DatabaseArn: 0 },
    output: {
      Database: {
        Credentials: D.list({ SecretId: D.secret }),
        LastUpdated: D.ts,
      },
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
})) as any;

export type GetOperationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of an operation by specifying the operation ID.
 */
export const getOperation: API.OperationMethod<
  GetOperationInput,
  GetOperationOutput,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-operation",
    input: { OperationId: 0 },
    output: { Operation: o_Operation },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-resource-permission",
    input: { ActionType: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePermission",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /list-applications",
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /list-components",
    input: { ApplicationId: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-configuration-check-definitions",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-configuration-check-operations",
    input: {
      ApplicationId: 0,
      ListMode: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: {
      ConfigurationCheckOperations: D.list(o_ConfigurationCheckOperation),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /list-databases",
    input: { ApplicationId: 0, ComponentId: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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

export type ListOperationEventsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /list-operation-events",
    input: {
      OperationId: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: { OperationEvents: D.list({ Timestamp: D.ts }) },
    body: true,
  },
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

export type ListOperationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /list-operations",
    input: {
      ApplicationId: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: { Operations: D.list(o_Operation) },
    body: true,
  },
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

export type ListSubCheckResultsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /list-sub-check-results",
    input: { OperationId: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-sub-check-rule-results",
    input: { SubCheckResultId: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /put-resource-permission",
    input: { ActionType: 0, SourceResourceArn: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePermission",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /register-application",
    input: {
      ApplicationId: 0,
      ApplicationType: 0,
      Instances: 0,
      SapInstanceNumber: 0,
      Sid: 0,
      Tags: 0,
      Credentials: D.list(i_ApplicationCredential),
      DatabaseArn: 0,
      ComponentsInfo: D.list({ ComponentType: 0, Sid: 0, Ec2InstanceId: 0 }),
    },
    output: { Application: o_Application },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-application",
    input: { ApplicationId: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-application-refresh",
    input: { ApplicationId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-configuration-checks",
    input: { ApplicationId: 0, ConfigurationCheckIds: 0 },
    output: {
      ConfigurationCheckOperations: D.list(o_ConfigurationCheckOperation),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationChecks",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /stop-application",
    input: {
      ApplicationId: 0,
      StopConnectedEntity: 0,
      IncludeEc2InstanceShutdown: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-application-settings",
    input: {
      ApplicationId: 0,
      CredentialsToAddOrUpdate: D.list(i_ApplicationCredential),
      CredentialsToRemove: D.list(i_ApplicationCredential),
      Backint: { BackintMode: 0, EnsureNoBackupInProcess: 0 },
      DatabaseArn: 0,
    },
    body: true,
  },
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
})) as any;

const i_ApplicationCredential: D.LazyStruct = () => ({
  DatabaseName: 0,
  CredentialType: 0,
  SecretId: 0,
});
const i_Filter: D.LazyStruct = () => ({ Name: 0, Value: 0, Operator: 0 });
const o_Application: D.LazyStruct = () => ({ LastUpdated: D.ts });
const o_ConfigurationCheckOperation: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_Operation: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  LastUpdatedTime: D.ts,
});
