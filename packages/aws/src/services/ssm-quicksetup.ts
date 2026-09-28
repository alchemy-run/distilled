import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "SSM QuickSetup",
  target: "QuickSetup",
  version: "2018-05-10",
  sigv4: "ssm-quicksetup",
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
                `https://ssm-quicksetup-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ssm-quicksetup-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ssm-quicksetup.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ssm-quicksetup.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ConfigurationParametersMap = { [key: string]: string | undefined };
export type IAMRoleArn = string;
export interface ConfigurationDefinitionInput {
  Type: string;
  Parameters: { [key: string]: string | undefined };
  TypeVersion?: string;
  LocalDeploymentExecutionRoleName?: string;
  LocalDeploymentAdministrationRoleArn?: string;
}
export type ConfigurationDefinitionsInputList = ConfigurationDefinitionInput[];
export type TagsMap = { [key: string]: string | undefined };
export interface CreateConfigurationManagerInput {
  Name?: string;
  Description?: string;
  ConfigurationDefinitions: ConfigurationDefinitionInput[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateConfigurationManagerOutput {
  ManagerArn: string;
}
export interface DeleteConfigurationManagerInput {
  ManagerArn: string;
}
export interface DeleteConfigurationManagerResponse {}
export interface GetConfigurationInput {
  ConfigurationId: string;
}
export type StatusType = "Deployment" | "AsyncExecutions" | (string & {});
export type Status =
  | "INITIALIZING"
  | "DEPLOYING"
  | "SUCCEEDED"
  | "DELETING"
  | "STOPPING"
  | "FAILED"
  | "STOPPED"
  | "DELETE_FAILED"
  | "STOP_FAILED"
  | "NONE"
  | (string & {});
export type StatusDetails = { [key: string]: string | undefined };
export interface StatusSummary {
  StatusType: StatusType;
  Status?: Status;
  StatusMessage?: string;
  LastUpdatedAt: Date;
  StatusDetails?: { [key: string]: string | undefined };
}
export type StatusSummariesList = StatusSummary[];
export interface GetConfigurationOutput {
  Id?: string;
  ManagerArn?: string;
  ConfigurationDefinitionId?: string;
  Type?: string;
  TypeVersion?: string;
  Account?: string;
  Region?: string;
  CreatedAt?: Date;
  LastModifiedAt?: Date;
  StatusSummaries?: StatusSummary[];
  Parameters?: { [key: string]: string | undefined };
}
export interface GetConfigurationManagerInput {
  ManagerArn: string;
}
export interface ConfigurationDefinition {
  Type: string;
  Parameters: { [key: string]: string | undefined };
  TypeVersion?: string;
  LocalDeploymentExecutionRoleName?: string;
  LocalDeploymentAdministrationRoleArn?: string;
  Id?: string;
}
export type ConfigurationDefinitionsList = ConfigurationDefinition[];
export interface GetConfigurationManagerOutput {
  ManagerArn: string;
  Description?: string;
  Name?: string;
  CreatedAt?: Date;
  LastModifiedAt?: Date;
  StatusSummaries?: StatusSummary[];
  ConfigurationDefinitions?: ConfigurationDefinition[];
  Tags?: { [key: string]: string | undefined };
}
export interface GetServiceSettingsRequest {}
export interface ServiceSettings {
  ExplorerEnablingRoleArn?: string;
}
export interface GetServiceSettingsOutput {
  ServiceSettings?: ServiceSettings;
}
export type FilterValues = string[];
export interface Filter {
  Key: string;
  Values: string[];
}
export type FiltersList = Filter[];
export interface ListConfigurationManagersInput {
  StartingToken?: string;
  MaxItems?: number;
  Filters?: Filter[];
}
export interface ConfigurationDefinitionSummary {
  Id?: string;
  Type?: string;
  TypeVersion?: string;
  FirstClassParameters?: { [key: string]: string | undefined };
}
export type ConfigurationDefinitionSummariesList =
  ConfigurationDefinitionSummary[];
export interface ConfigurationManagerSummary {
  ManagerArn: string;
  Description?: string;
  Name?: string;
  StatusSummaries?: StatusSummary[];
  ConfigurationDefinitionSummaries?: ConfigurationDefinitionSummary[];
}
export type ConfigurationManagerList = ConfigurationManagerSummary[];
export interface ListConfigurationManagersOutput {
  ConfigurationManagersList?: ConfigurationManagerSummary[];
  NextToken?: string;
}
export interface ListConfigurationsInput {
  StartingToken?: string;
  MaxItems?: number;
  Filters?: Filter[];
  ManagerArn?: string;
  ConfigurationDefinitionId?: string;
}
export interface ConfigurationSummary {
  Id?: string;
  ManagerArn?: string;
  ConfigurationDefinitionId?: string;
  Type?: string;
  TypeVersion?: string;
  Region?: string;
  Account?: string;
  CreatedAt?: Date;
  FirstClassParameters?: { [key: string]: string | undefined };
  StatusSummaries?: StatusSummary[];
}
export type ConfigurationsList = ConfigurationSummary[];
export interface ListConfigurationsOutput {
  ConfigurationsList?: ConfigurationSummary[];
  NextToken?: string;
}
export interface ListQuickSetupTypesRequest {}
export interface QuickSetupTypeOutput {
  Type?: string;
  LatestVersion?: string;
}
export type QuickSetupTypeList = QuickSetupTypeOutput[];
export interface ListQuickSetupTypesOutput {
  QuickSetupTypeList?: QuickSetupTypeOutput[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface TagEntry {
  Key?: string;
  Value?: string;
}
export type Tags = TagEntry[];
export interface ListTagsForResourceResponse {
  Tags?: TagEntry[];
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConfigurationDefinitionInput {
  ManagerArn: string;
  Id: string;
  TypeVersion?: string;
  Parameters?: { [key: string]: string | undefined };
  LocalDeploymentExecutionRoleName?: string;
  LocalDeploymentAdministrationRoleArn?: string;
}
export interface UpdateConfigurationDefinitionResponse {}
export interface UpdateConfigurationManagerInput {
  ManagerArn: string;
  Name?: string;
  Description?: string;
}
export interface UpdateConfigurationManagerResponse {}
export interface UpdateServiceSettingsInput {
  ExplorerEnablingRoleArn?: string;
}
export interface UpdateServiceSettingsResponse {}
export type CreateConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Quick Setup configuration manager resource. This object is a collection
 * of desired state configurations for multiple configuration definitions and
 * summaries describing the deployments of those definitions.
 */
export const createConfigurationManager: API.OperationMethod<
  CreateConfigurationManagerInput,
  CreateConfigurationManagerOutput,
  CreateConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationManager",
    input: {
      Name: 0,
      Description: 0,
      ConfigurationDefinitions: D.list({
        Type: 0,
        Parameters: 0,
        TypeVersion: 0,
        LocalDeploymentExecutionRoleName: 0,
        LocalDeploymentAdministrationRoleArn: 0,
      }),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationManager",
})) as any;

export type DeleteConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configuration manager.
 */
export const deleteConfigurationManager: API.OperationMethod<
  DeleteConfigurationManagerInput,
  DeleteConfigurationManagerResponse,
  DeleteConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /configurationManager/{ManagerArn}",
    input: { ManagerArn: 0 },
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
  operationName: "DeleteConfigurationManager",
})) as any;

export type GetConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about the specified configuration.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationInput,
  GetConfigurationOutput,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /getConfiguration/{ConfigurationId}",
    input: { ConfigurationId: 0 },
    output: {
      CreatedAt: D.ts,
      LastModifiedAt: D.ts,
      StatusSummaries: D.list(o_StatusSummary),
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
  operationName: "GetConfiguration",
})) as any;

export type GetConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a configuration manager.
 */
export const getConfigurationManager: API.OperationMethod<
  GetConfigurationManagerInput,
  GetConfigurationManagerOutput,
  GetConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configurationManager/{ManagerArn}",
    input: { ManagerArn: 0 },
    output: {
      CreatedAt: D.ts,
      LastModifiedAt: D.ts,
      StatusSummaries: D.list(o_StatusSummary),
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
  operationName: "GetConfigurationManager",
})) as any;

export type GetServiceSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns settings configured for Quick Setup in the requesting Amazon Web Services account and Amazon Web Services Region.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsOutput,
  GetServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /serviceSettings" },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
})) as any;

export type ListConfigurationManagersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Quick Setup configuration managers.
 */
export const listConfigurationManagers: API.PaginatedOperationMethod<
  ListConfigurationManagersInput,
  ListConfigurationManagersOutput,
  ListConfigurationManagersError,
  Credentials | HttpClient.HttpClient,
  ConfigurationManagerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listConfigurationManagers",
    input: { StartingToken: 0, MaxItems: 0, Filters: D.list(i_Filter) },
    output: {
      ConfigurationManagersList: D.list({
        StatusSummaries: D.list(o_StatusSummary),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationManagers",
  pagination: {
    inputToken: "StartingToken",
    outputToken: "NextToken",
    items: "ConfigurationManagersList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns configurations deployed by Quick Setup in the requesting Amazon Web Services account and Amazon Web Services Region.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsInput,
  ListConfigurationsOutput,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listConfigurations",
    input: {
      StartingToken: 0,
      MaxItems: 0,
      Filters: D.list(i_Filter),
      ManagerArn: 0,
      ConfigurationDefinitionId: 0,
    },
    output: {
      ConfigurationsList: D.list({
        CreatedAt: D.ts,
        StatusSummaries: D.list(o_StatusSummary),
      }),
    },
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
  operationName: "ListConfigurations",
  pagination: {
    inputToken: "StartingToken",
    outputToken: "NextToken",
    items: "ConfigurationsList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListQuickSetupTypesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the available Quick Setup types.
 */
export const listQuickSetupTypes: API.OperationMethod<
  ListQuickSetupTypesRequest,
  ListQuickSetupTypesOutput,
  ListQuickSetupTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /listQuickSetupTypes" },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickSetupTypes",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns tags assigned to the resource.
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
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns key-value pairs of metadata to Amazon Web Services resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
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
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

export type UpdateConfigurationDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Quick Setup configuration definition.
 */
export const updateConfigurationDefinition: API.OperationMethod<
  UpdateConfigurationDefinitionInput,
  UpdateConfigurationDefinitionResponse,
  UpdateConfigurationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /configurationDefinition/{ManagerArn}/{Id}",
    input: {
      ManagerArn: 0,
      Id: 0,
      TypeVersion: 0,
      Parameters: 0,
      LocalDeploymentExecutionRoleName: 0,
      LocalDeploymentAdministrationRoleArn: 0,
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
  operationName: "UpdateConfigurationDefinition",
})) as any;

export type UpdateConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Quick Setup configuration manager.
 */
export const updateConfigurationManager: API.OperationMethod<
  UpdateConfigurationManagerInput,
  UpdateConfigurationManagerResponse,
  UpdateConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /configurationManager/{ManagerArn}",
    input: { ManagerArn: 0, Name: 0, Description: 0 },
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
  operationName: "UpdateConfigurationManager",
})) as any;

export type UpdateServiceSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates settings configured for Quick Setup.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsInput,
  UpdateServiceSettingsResponse,
  UpdateServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /serviceSettings",
    input: { ExplorerEnablingRoleArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
})) as any;

const i_Filter: D.LazyStruct = () => ({ Key: 0, Values: 0 });
const o_StatusSummary: D.LazyStruct = () => ({ LastUpdatedAt: D.ts });
