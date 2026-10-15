import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SSM QuickSetup",
  serviceShapeName: "QuickSetup",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ssm-quicksetup" });
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-quicksetup.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ssm-quicksetup.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ssm-quicksetup.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ConfigurationDefinitionSummariesList = ConfigurationDefinitionSummary[];
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
  input: __S(98, __c12, 2) as any as S.Schema<CreateConfigurationManagerInput>,
  output: __S(99, __c12, 3) as any as S.Schema<CreateConfigurationManagerOutput>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<DeleteConfigurationManagerInput>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteConfigurationManagerResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<GetConfigurationInput>,
  output: __S(129, __c16, 1) as any as S.Schema<GetConfigurationOutput>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<GetConfigurationManagerInput>,
  output: __S(147, __c18, 3) as any as S.Schema<GetConfigurationManagerOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetServiceSettingsRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<GetServiceSettingsOutput>,
  errors: [AccessDeniedException, ConflictException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<ListConfigurationManagersInput>,
  output: __S(13, __c1, 5) as any as S.Schema<ListConfigurationManagersOutput>,
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
  input: __S(32, __c4, 0) as any as S.Schema<ListConfigurationsInput>,
  output: __S(35, __c4, 3) as any as S.Schema<ListConfigurationsOutput>,
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
  input: __S(40, __c5, 0) as any as S.Schema<ListQuickSetupTypesRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<ListQuickSetupTypesOutput>,
  errors: [AccessDeniedException, ConflictException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickSetupTypes",
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<TagResourceInput>,
  output: __S(120, __c15, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(120, __c15, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<UpdateConfigurationDefinitionInput>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateConfigurationDefinitionResponse>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<UpdateConfigurationManagerInput>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateConfigurationManagerResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<UpdateServiceSettingsInput>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateServiceSettingsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/serviceSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ExplorerEnablingRoleArn: S.optional(S.String) })).annotate({
        identifier: "ServiceSettings",
      });
    case 2:
      return S.suspend(() => S.Struct({ ServiceSettings: S.optional(__S(1, __c0, 1)) })).annotate({
        identifier: "GetServiceSettingsOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartingToken: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          Filters: S.optional(__S(17, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listConfigurationManagers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationManagersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          TypeVersion: S.optional(S.String),
          FirstClassParameters: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "ConfigurationDefinitionSummary" });
    case 2:
      return S.Array(__S(9, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ManagerArn: S.String,
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          StatusSummaries: S.optional(__S(137, __c17, 1)),
          ConfigurationDefinitionSummaries: S.optional(__S(10, __c1, 2)),
        }),
      ).annotate({ identifier: "ConfigurationManagerSummary" });
    case 4:
      return S.Array(__S(11, __c1, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConfigurationManagersList: S.optional(__S(12, __c1, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationManagersOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Values: __S(24, __c3, 0) })).annotate({
        identifier: "Filter",
      });
    case 1:
      return S.Array(__S(16, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartingToken: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          Filters: S.optional(__S(17, __c2, 1)),
          ManagerArn: S.optional(S.String),
          ConfigurationDefinitionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listConfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ManagerArn: S.optional(S.String),
          ConfigurationDefinitionId: S.optional(S.String),
          Type: S.optional(S.String),
          TypeVersion: S.optional(S.String),
          Region: S.optional(S.String),
          Account: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FirstClassParameters: S.optional(__S(104, __c13, 0)),
          StatusSummaries: S.optional(__S(137, __c17, 1)),
        }),
      ).annotate({ identifier: "ConfigurationSummary" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationsList: S.optional(__S(34, __c4, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationsOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/listQuickSetupTypes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQuickSetupTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), LatestVersion: S.optional(S.String) }),
      ).annotate({ identifier: "QuickSetupTypeOutput" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ QuickSetupTypeList: S.optional(__S(42, __c5, 2)) }),
      ).annotate({ identifier: "ListQuickSetupTypesOutput" });
  }
}
function __c6(j: number): any {
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
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "TagEntry" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(50, __c6, 2)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(104, __c13, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(24, __c3, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")),
          Id: S.String.pipe(T.HttpLabel("Id")),
          TypeVersion: S.optional(S.String),
          Parameters: S.optional(__S(104, __c13, 0)),
          LocalDeploymentExecutionRoleName: S.optional(S.String),
          LocalDeploymentAdministrationRoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/configurationDefinition/{ManagerArn}/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationDefinitionInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/configurationManager/{ManagerArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationManagerInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExplorerEnablingRoleArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/serviceSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateServiceSettingsInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Parameters: __S(104, __c13, 0),
          TypeVersion: S.optional(S.String),
          LocalDeploymentExecutionRoleName: S.optional(S.String),
          LocalDeploymentAdministrationRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationDefinitionInput" });
    case 1:
      return S.Array(__S(96, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ConfigurationDefinitions: __S(97, __c12, 1),
          Tags: S.optional(__S(104, __c13, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationManager" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationManagerInput" });
    case 3:
      return S.suspend(() => S.Struct({ ManagerArn: S.String })).annotate({
        identifier: "CreateConfigurationManagerOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/configurationManager/{ManagerArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationManagerInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteConfigurationManagerResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/getConfiguration/{ConfigurationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ManagerArn: S.optional(S.String),
          ConfigurationDefinitionId: S.optional(S.String),
          Type: S.optional(S.String),
          TypeVersion: S.optional(S.String),
          Account: S.optional(S.String),
          Region: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StatusSummaries: S.optional(__S(137, __c17, 1)),
          Parameters: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "GetConfigurationOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatusType: S.String,
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          LastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          StatusDetails: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "StatusSummary" });
    case 1:
      return S.Array(__S(136, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/configurationManager/{ManagerArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationManagerInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Parameters: __S(104, __c13, 0),
          TypeVersion: S.optional(S.String),
          LocalDeploymentExecutionRoleName: S.optional(S.String),
          LocalDeploymentAdministrationRoleArn: S.optional(S.String),
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationDefinition" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ManagerArn: S.String,
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StatusSummaries: S.optional(__S(137, __c17, 1)),
          ConfigurationDefinitions: S.optional(__S(146, __c18, 2)),
          Tags: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "GetConfigurationManagerOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
