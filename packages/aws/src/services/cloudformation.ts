import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudFormation",
  target: "CloudFormation",
  version: "2010-05-15",
  sigv4: "cloudformation",
  protocol: awsQueryProtocol,
  xmlns: "http://cloudformation.amazonaws.com/doc/2010-05-15/",
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
                `https://cloudformation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://cloudformation.${Region}.amazonaws.com`);
              }
              return e(
                `https://cloudformation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudformation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudformation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CFNRegistryException
  extends /*@__PURE__*/ TE.TaggedError(
    "CFNRegistryException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ChangeSetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ChangeSetNotFoundException",
    ["BadRequestError"],
    { code: "ChangeSetNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ConcurrentResourcesLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentResourcesLimitExceededException",
    ["ThrottlingError"],
    { code: "ConcurrentResourcesLimitExceeded", status: 429 },
  )<{ readonly message?: string }> {}
export class CreatedButModifiedException
  extends /*@__PURE__*/ TE.TaggedError(
    "CreatedButModifiedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class GeneratedTemplateNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "GeneratedTemplateNotFoundException",
    ["BadRequestError"],
    { code: "GeneratedTemplateNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class HookResultNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "HookResultNotFoundException",
    ["BadRequestError"],
    { code: "HookResultNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class InsufficientCapabilitiesException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientCapabilitiesException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidChangeSetStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidChangeSetStatusException",
    ["BadRequestError"],
    { code: "InvalidChangeSetStatus", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateTransitionException",
    ["BadRequestError"],
    { code: "InvalidStateTransition", status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NameAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "NameAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class NoUpdateToPerform
  extends /*@__PURE__*/ TE.TaggedError("NoUpdateToPerform", [], {
    synthetic: {
      from: "ValidationError",
      message: { includes: "No updates are to be performed" },
    },
  })<{ readonly message?: string }> {}
export class OperationIdAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationIdAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class OperationInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationInProgressException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class OperationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class OperationStatusCheckFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationStatusCheckFailedException",
    ["BadRequestError"],
    { code: "ConditionalCheckFailed", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceScanInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceScanInProgressException",
    ["BadRequestError"],
    { code: "ResourceScanInProgress", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceScanLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceScanLimitExceededException",
    ["BadRequestError"],
    { code: "ResourceScanLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceScanNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceScanNotFoundException",
    ["BadRequestError"],
    { code: "ResourceScanNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class StackInstanceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "StackInstanceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class StackNotFound
  extends /*@__PURE__*/ TE.TaggedError("StackNotFound", ["NotFoundError"], {
    synthetic: {
      from: "ValidationError",
      message: { includes: "does not exist" },
    },
  })<{ readonly message?: string }> {}
export class StackNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "StackNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class StackRefactorNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "StackRefactorNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class StackSetNotEmptyException
  extends /*@__PURE__*/ TE.TaggedError(
    "StackSetNotEmptyException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class StackSetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "StackSetNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class StaleRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "StaleRequestException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class TokenAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TokenAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TypeConfigurationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TypeConfigurationNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TypeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TypeNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export interface ActivateOrganizationsAccessInput {}
export interface ActivateOrganizationsAccessOutput {}
export type ThirdPartyType = "RESOURCE" | "MODULE" | "HOOK" | (string & {});
export type ThirdPartyTypeArn = string;
export type PublisherId = string;
export type TypeName = string;
export type AutoUpdate = boolean;
export type RoleARN2 = string;
export type LogGroupName = string;
export interface LoggingConfig {
  LogRoleArn?: string;
  LogGroupName?: string;
}
export type VersionBump = "MAJOR" | "MINOR" | (string & {});
export type MajorVersion = number;
export interface ActivateTypeInput {
  Type?: ThirdPartyType;
  PublicTypeArn?: string;
  PublisherId?: string;
  TypeName?: string;
  TypeNameAlias?: string;
  AutoUpdate?: boolean;
  LoggingConfig?: LoggingConfig;
  ExecutionRoleArn?: string;
  VersionBump?: VersionBump;
  MajorVersion?: number;
}
export type PrivateTypeArn = string;
export interface ActivateTypeOutput {
  Arn?: string;
}
export type TypeArn = string;
export type TypeConfigurationAlias = string;
export type TypeConfigurationArn = string;
export interface TypeConfigurationIdentifier {
  TypeArn?: string;
  TypeConfigurationAlias?: string;
  TypeConfigurationArn?: string;
  Type?: ThirdPartyType;
  TypeName?: string;
}
export type TypeConfigurationIdentifiers = TypeConfigurationIdentifier[];
export interface BatchDescribeTypeConfigurationsInput {
  TypeConfigurationIdentifiers?: TypeConfigurationIdentifier[];
}
export type ErrorCode = string;
export type ErrorMessage = string;
export interface BatchDescribeTypeConfigurationsError_ {
  ErrorCode?: string;
  ErrorMessage?: string;
  TypeConfigurationIdentifier?: TypeConfigurationIdentifier;
}
export type BatchDescribeTypeConfigurationsErrors =
  BatchDescribeTypeConfigurationsError_[];
export type UnprocessedTypeConfigurations = TypeConfigurationIdentifier[];
export type TypeConfiguration = string;
export type IsDefaultConfiguration = boolean;
export interface TypeConfigurationDetails {
  Arn?: string;
  Alias?: string;
  Configuration?: string;
  LastUpdated?: Date;
  TypeArn?: string;
  TypeName?: string;
  IsDefaultConfiguration?: boolean;
}
export type TypeConfigurationDetailsList = TypeConfigurationDetails[];
export interface BatchDescribeTypeConfigurationsOutput {
  Errors?: BatchDescribeTypeConfigurationsError_[];
  UnprocessedTypeConfigurations?: TypeConfigurationIdentifier[];
  TypeConfigurations?: TypeConfigurationDetails[];
}
export type StackName = string;
export type ClientRequestToken = string;
export interface CancelUpdateStackInput {
  StackName?: string;
  ClientRequestToken?: string;
}
export interface CancelUpdateStackResponse {}
export type StackNameOrId = string;
export type RoleARN = string;
export type ResourceToSkip = string;
export type ResourcesToSkip = string[];
export interface ContinueUpdateRollbackInput {
  StackName?: string;
  RoleARN?: string;
  ResourcesToSkip?: string[];
  ClientRequestToken?: string;
}
export interface ContinueUpdateRollbackOutput {}
export type TemplateBody = string;
export type TemplateURL = string;
export type UsePreviousTemplate = boolean;
export type ParameterKey = string;
export type ParameterValue = string;
export type UsePreviousValue = boolean;
export interface Parameter {
  ParameterKey?: string;
  ParameterValue?: string;
  UsePreviousValue?: boolean;
  ResolvedValue?: string;
}
export type Parameters = Parameter[];
export type Capability =
  | "CAPABILITY_IAM"
  | "CAPABILITY_NAMED_IAM"
  | "CAPABILITY_AUTO_EXPAND"
  | (string & {});
export type Capabilities = Capability[];
export type ResourceType = string;
export type ResourceTypes = string[];
export type Arn = string;
export type Type = string;
export interface RollbackTrigger {
  Arn?: string;
  Type?: string;
}
export type RollbackTriggers = RollbackTrigger[];
export type MonitoringTimeInMinutes = number;
export interface RollbackConfiguration {
  RollbackTriggers?: RollbackTrigger[];
  MonitoringTimeInMinutes?: number;
}
export type NotificationARN = string;
export type NotificationARNs = string[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type Tags = Tag[];
export type ChangeSetName = string;
export type ClientToken = string;
export type Description = string;
export type ChangeSetType = "CREATE" | "UPDATE" | "IMPORT" | (string & {});
export type LogicalResourceId = string;
export type ResourceIdentifierPropertyKey = string;
export type ResourceIdentifierPropertyValue = string;
export type ResourceIdentifierProperties = {
  [key: string]: string | undefined;
};
export interface ResourceToImport {
  ResourceType?: string;
  LogicalResourceId?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
}
export type ResourcesToImport = ResourceToImport[];
export type IncludeNestedStacks = boolean;
export type OnStackFailure =
  | "DO_NOTHING"
  | "ROLLBACK"
  | "DELETE"
  | (string & {});
export type ImportExistingResources = boolean;
export type DeploymentMode = "REVERT_DRIFT" | (string & {});
export type DeploymentConfigMode = "STANDARD" | "EXPRESS" | (string & {});
export type DisableRollback = boolean;
export interface DeploymentConfig {
  Mode?: DeploymentConfigMode;
  DisableRollback?: boolean;
}
export type DisableValidation = boolean;
export interface CreateChangeSetInput {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  UsePreviousTemplate?: boolean;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  ResourceTypes?: string[];
  RoleARN?: string;
  RollbackConfiguration?: RollbackConfiguration;
  NotificationARNs?: string[];
  Tags?: Tag[];
  ChangeSetName?: string;
  ClientToken?: string;
  Description?: string;
  ChangeSetType?: ChangeSetType;
  ResourcesToImport?: ResourceToImport[];
  IncludeNestedStacks?: boolean;
  OnStackFailure?: OnStackFailure;
  ImportExistingResources?: boolean;
  DeploymentMode?: DeploymentMode;
  DeploymentConfig?: DeploymentConfig;
  DisableValidation?: boolean;
}
export type ChangeSetId = string;
export type StackId = string;
export interface CreateChangeSetOutput {
  Id?: string;
  StackId?: string;
}
export interface ResourceDefinition {
  ResourceType?: string;
  LogicalResourceId?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
}
export type ResourceDefinitions = ResourceDefinition[];
export type GeneratedTemplateName = string;
export type GeneratedTemplateDeletionPolicy =
  | "DELETE"
  | "RETAIN"
  | (string & {});
export type GeneratedTemplateUpdateReplacePolicy =
  | "DELETE"
  | "RETAIN"
  | (string & {});
export interface TemplateConfiguration {
  DeletionPolicy?: GeneratedTemplateDeletionPolicy;
  UpdateReplacePolicy?: GeneratedTemplateUpdateReplacePolicy;
}
export interface CreateGeneratedTemplateInput {
  Resources?: ResourceDefinition[];
  GeneratedTemplateName?: string;
  StackName?: string;
  TemplateConfiguration?: TemplateConfiguration;
}
export type GeneratedTemplateId = string;
export interface CreateGeneratedTemplateOutput {
  GeneratedTemplateId?: string;
}
export type TimeoutMinutes = number;
export type OnFailure = "DO_NOTHING" | "ROLLBACK" | "DELETE" | (string & {});
export type StackPolicyBody = string;
export type StackPolicyURL = string;
export type EnableTerminationProtection = boolean;
export type RetainExceptOnCreate = boolean;
export interface CreateStackInput {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  Parameters?: Parameter[];
  DisableRollback?: boolean;
  RollbackConfiguration?: RollbackConfiguration;
  TimeoutInMinutes?: number;
  NotificationARNs?: string[];
  Capabilities?: Capability[];
  ResourceTypes?: string[];
  RoleARN?: string;
  OnFailure?: OnFailure;
  StackPolicyBody?: string;
  StackPolicyURL?: string;
  Tags?: Tag[];
  ClientRequestToken?: string;
  EnableTerminationProtection?: boolean;
  RetainExceptOnCreate?: boolean;
  DeploymentConfig?: DeploymentConfig;
  DisableValidation?: boolean;
}
export type OperationId = string;
export interface CreateStackOutput {
  StackId?: string;
  OperationId?: string;
}
export type StackSetName = string;
export type Account = string;
export type AccountList = string[];
export type AccountsUrl = string;
export type OrganizationalUnitId = string;
export type OrganizationalUnitIdList = string[];
export type AccountFilterType =
  | "NONE"
  | "INTERSECTION"
  | "DIFFERENCE"
  | "UNION"
  | (string & {});
export interface DeploymentTargets {
  Accounts?: string[];
  AccountsUrl?: string;
  OrganizationalUnitIds?: string[];
  AccountFilterType?: AccountFilterType;
}
export type Region = string;
export type RegionList = string[];
export type RegionConcurrencyType = "SEQUENTIAL" | "PARALLEL" | (string & {});
export type FailureToleranceCount = number;
export type FailureTolerancePercentage = number;
export type MaxConcurrentCount = number;
export type MaxConcurrentPercentage = number;
export type ConcurrencyMode =
  | "STRICT_FAILURE_TOLERANCE"
  | "SOFT_FAILURE_TOLERANCE"
  | (string & {});
export interface StackSetOperationPreferences {
  RegionConcurrencyType?: RegionConcurrencyType;
  RegionOrder?: string[];
  FailureToleranceCount?: number;
  FailureTolerancePercentage?: number;
  MaxConcurrentCount?: number;
  MaxConcurrentPercentage?: number;
  ConcurrencyMode?: ConcurrencyMode;
}
export type CallAs = "SELF" | "DELEGATED_ADMIN" | (string & {});
export interface CreateStackInstancesInput {
  StackSetName?: string;
  Accounts?: string[];
  DeploymentTargets?: DeploymentTargets;
  Regions?: string[];
  ParameterOverrides?: Parameter[];
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface CreateStackInstancesOutput {
  OperationId?: string;
}
export type EnableStackCreation = boolean;
export interface ResourceLocation {
  StackName?: string;
  LogicalResourceId?: string;
}
export interface ResourceMapping {
  Source?: ResourceLocation;
  Destination?: ResourceLocation;
}
export type ResourceMappings = ResourceMapping[];
export interface StackDefinition {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
}
export type StackDefinitions = StackDefinition[];
export interface CreateStackRefactorInput {
  Description?: string;
  EnableStackCreation?: boolean;
  ResourceMappings?: ResourceMapping[];
  StackDefinitions?: StackDefinition[];
}
export type StackRefactorId = string;
export interface CreateStackRefactorOutput {
  StackRefactorId: string;
}
export type ExecutionRoleName = string;
export type PermissionModels =
  | "SERVICE_MANAGED"
  | "SELF_MANAGED"
  | (string & {});
export type AutoDeploymentNullable = boolean;
export type RetainStacksOnAccountRemovalNullable = boolean;
export type StackSetARN = string;
export type StackSetARNList = string[];
export interface AutoDeployment {
  Enabled?: boolean;
  RetainStacksOnAccountRemoval?: boolean;
  DependsOn?: string[];
}
export type ManagedExecutionNullable = boolean;
export interface ManagedExecution {
  Active?: boolean;
}
export interface CreateStackSetInput {
  StackSetName?: string;
  Description?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  StackId?: string;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  Tags?: Tag[];
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  PermissionModel?: PermissionModels;
  AutoDeployment?: AutoDeployment;
  CallAs?: CallAs;
  ClientRequestToken?: string;
  ManagedExecution?: ManagedExecution;
}
export type StackSetId = string;
export interface CreateStackSetOutput {
  StackSetId?: string;
}
export interface DeactivateOrganizationsAccessInput {}
export interface DeactivateOrganizationsAccessOutput {}
export interface DeactivateTypeInput {
  TypeName?: string;
  Type?: ThirdPartyType;
  Arn?: string;
}
export interface DeactivateTypeOutput {}
export type ChangeSetNameOrId = string;
export interface DeleteChangeSetInput {
  ChangeSetName?: string;
  StackName?: string;
}
export interface DeleteChangeSetOutput {}
export interface DeleteGeneratedTemplateInput {
  GeneratedTemplateName?: string;
}
export interface DeleteGeneratedTemplateResponse {}
export type RetainResources = string[];
export type DeletionMode = "STANDARD" | "FORCE_DELETE_STACK" | (string & {});
export interface DeleteStackInput {
  StackName?: string;
  RetainResources?: string[];
  RoleARN?: string;
  ClientRequestToken?: string;
  DeletionMode?: DeletionMode;
  DeploymentConfig?: DeploymentConfig;
}
export interface DeleteStackResponse {}
export type RetainStacks = boolean;
export interface DeleteStackInstancesInput {
  StackSetName?: string;
  Accounts?: string[];
  DeploymentTargets?: DeploymentTargets;
  Regions?: string[];
  OperationPreferences?: StackSetOperationPreferences;
  RetainStacks?: boolean;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface DeleteStackInstancesOutput {
  OperationId?: string;
}
export interface DeleteStackSetInput {
  StackSetName?: string;
  CallAs?: CallAs;
}
export interface DeleteStackSetOutput {}
export type RegistryType = "RESOURCE" | "MODULE" | "HOOK" | (string & {});
export type TypeVersionId = string;
export interface DeregisterTypeInput {
  Arn?: string;
  Type?: RegistryType;
  TypeName?: string;
  VersionId?: string;
}
export interface DeregisterTypeOutput {}
export type NextToken = string;
export interface DescribeAccountLimitsInput {
  NextToken?: string;
}
export type LimitName = string;
export type LimitValue = number;
export interface AccountLimit {
  Name?: string;
  Value?: number;
}
export type AccountLimitList = AccountLimit[];
export interface DescribeAccountLimitsOutput {
  AccountLimits?: AccountLimit[];
  NextToken?: string;
}
export type IncludePropertyValues = boolean;
export interface DescribeChangeSetInput {
  ChangeSetName?: string;
  StackName?: string;
  NextToken?: string;
  IncludePropertyValues?: boolean;
}
export type CreationTime = Date;
export type ExecutionStatus =
  | "UNAVAILABLE"
  | "AVAILABLE"
  | "EXECUTE_IN_PROGRESS"
  | "EXECUTE_COMPLETE"
  | "EXECUTE_FAILED"
  | "OBSOLETE"
  | (string & {});
export type ChangeSetStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "FAILED"
  | (string & {});
export type ChangeSetStatusReason = string;
export type StackDriftStatus =
  | "DRIFTED"
  | "IN_SYNC"
  | "UNKNOWN"
  | "NOT_CHECKED"
  | (string & {});
export type ChangeType = "Resource" | (string & {});
export type HookInvocationCount = number;
export type PolicyAction =
  | "Delete"
  | "Retain"
  | "Snapshot"
  | "ReplaceAndDelete"
  | "ReplaceAndRetain"
  | "ReplaceAndSnapshot"
  | (string & {});
export type ChangeAction =
  | "Add"
  | "Modify"
  | "Remove"
  | "Import"
  | "Dynamic"
  | "SyncWithActual"
  | (string & {});
export type PhysicalResourceId = string;
export type Replacement = "True" | "False" | "Conditional" | (string & {});
export type ResourceAttribute =
  | "Properties"
  | "Metadata"
  | "CreationPolicy"
  | "UpdatePolicy"
  | "DeletionPolicy"
  | "UpdateReplacePolicy"
  | "Tags"
  | (string & {});
export type Scope = ResourceAttribute[];
export type StackResourceDriftStatus =
  | "IN_SYNC"
  | "MODIFIED"
  | "DELETED"
  | "NOT_CHECKED"
  | "UNKNOWN"
  | "UNSUPPORTED"
  | (string & {});
export type ResourcePropertyPath = string;
export type DriftIgnoredReason =
  | "MANAGED_BY_AWS"
  | "WRITE_ONLY_PROPERTY"
  | "SENSITIVE_PROPERTY"
  | (string & {});
export interface ResourceDriftIgnoredAttribute {
  Path?: string;
  Reason?: DriftIgnoredReason;
}
export type ResourceDriftIgnoredAttributes = ResourceDriftIgnoredAttribute[];
export type PropertyName = string;
export type RequiresRecreation =
  | "Never"
  | "Conditionally"
  | "Always"
  | (string & {});
export type BeforeValue = string;
export type AfterValue = string;
export type BeforeValueFrom =
  | "PREVIOUS_DEPLOYMENT_STATE"
  | "ACTUAL_STATE"
  | (string & {});
export type AfterValueFrom = "TEMPLATE" | (string & {});
export type ResourceDriftPreviousValue = string;
export type ResourceDriftActualValue = string;
export interface LiveResourceDrift {
  PreviousValue?: string;
  ActualValue?: string;
  DriftDetectionTimestamp?: Date;
}
export type AttributeChangeType =
  | "Add"
  | "Remove"
  | "Modify"
  | "SyncWithActual"
  | (string & {});
export interface ResourceTargetDefinition {
  Attribute?: ResourceAttribute;
  Name?: string;
  RequiresRecreation?: RequiresRecreation;
  Path?: string;
  BeforeValue?: string;
  AfterValue?: string;
  BeforeValueFrom?: BeforeValueFrom;
  AfterValueFrom?: AfterValueFrom;
  Drift?: LiveResourceDrift;
  AttributeChangeType?: AttributeChangeType;
}
export type EvaluationType = "Static" | "Dynamic" | (string & {});
export type ChangeSource =
  | "ResourceReference"
  | "ParameterReference"
  | "ResourceAttribute"
  | "DirectModification"
  | "Automatic"
  | "NoModification"
  | (string & {});
export type CausingEntity = string;
export interface ResourceChangeDetail {
  Target?: ResourceTargetDefinition;
  Evaluation?: EvaluationType;
  ChangeSource?: ChangeSource;
  CausingEntity?: string;
}
export type ResourceChangeDetails = ResourceChangeDetail[];
export type TypeHierarchy = string;
export type LogicalIdHierarchy = string;
export interface ModuleInfo {
  TypeHierarchy?: string;
  LogicalIdHierarchy?: string;
}
export type BeforeContext = string;
export type AfterContext = string;
export type PreviousDeploymentContext = string;
export interface ResourceChange {
  PolicyAction?: PolicyAction;
  Action?: ChangeAction;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Replacement?: Replacement;
  Scope?: ResourceAttribute[];
  ResourceDriftStatus?: StackResourceDriftStatus;
  ResourceDriftIgnoredAttributes?: ResourceDriftIgnoredAttribute[];
  Details?: ResourceChangeDetail[];
  ChangeSetId?: string;
  ModuleInfo?: ModuleInfo;
  BeforeContext?: string;
  AfterContext?: string;
  PreviousDeploymentContext?: string;
}
export interface Change {
  Type?: ChangeType;
  HookInvocationCount?: number;
  ResourceChange?: ResourceChange;
}
export type Changes = Change[];
export interface DescribeChangeSetOutput {
  ChangeSetName?: string;
  ChangeSetId?: string;
  StackId?: string;
  StackName?: string;
  Description?: string;
  Parameters?: Parameter[];
  CreationTime?: Date;
  ExecutionStatus?: ExecutionStatus;
  Status?: ChangeSetStatus;
  StatusReason?: string;
  StackDriftStatus?: StackDriftStatus;
  NotificationARNs?: string[];
  RollbackConfiguration?: RollbackConfiguration & {
    RollbackTriggers: (RollbackTrigger & { Arn: Arn; Type: Type })[];
  };
  Capabilities?: Capability[];
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  Changes?: Change[];
  NextToken?: string;
  IncludeNestedStacks?: boolean;
  ParentChangeSetId?: string;
  RootChangeSetId?: string;
  OnStackFailure?: OnStackFailure;
  ImportExistingResources?: boolean;
  DeploymentMode?: DeploymentMode;
  DeploymentConfig?: DeploymentConfig;
}
export interface DescribeChangeSetHooksInput {
  ChangeSetName?: string;
  StackName?: string;
  NextToken?: string;
  LogicalResourceId?: string;
}
export type HookInvocationPoint = "PRE_PROVISION" | (string & {});
export type HookFailureMode = "FAIL" | "WARN" | (string & {});
export type HookTypeName = string;
export type HookTypeVersionId = string;
export type HookTypeConfigurationVersionId = string;
export type HookTargetType = "RESOURCE" | (string & {});
export type HookTargetTypeName = string;
export interface ChangeSetHookResourceTargetDetails {
  LogicalResourceId?: string;
  ResourceType?: string;
  ResourceAction?: ChangeAction;
}
export interface ChangeSetHookTargetDetails {
  TargetType?: HookTargetType;
  ResourceTargetDetails?: ChangeSetHookResourceTargetDetails;
}
export interface ChangeSetHook {
  InvocationPoint?: HookInvocationPoint;
  FailureMode?: HookFailureMode;
  TypeName?: string;
  TypeVersionId?: string;
  TypeConfigurationVersionId?: string;
  TargetDetails?: ChangeSetHookTargetDetails;
}
export type ChangeSetHooks = ChangeSetHook[];
export type ChangeSetHooksStatus =
  | "PLANNING"
  | "PLANNED"
  | "UNAVAILABLE"
  | (string & {});
export interface DescribeChangeSetHooksOutput {
  ChangeSetId?: string;
  ChangeSetName?: string;
  Hooks?: ChangeSetHook[];
  Status?: ChangeSetHooksStatus;
  NextToken?: string;
  StackId?: string;
  StackName?: string;
}
export type FailedEventsFilter = boolean;
export interface EventFilter {
  FailedEvents?: boolean;
}
export interface DescribeEventsInput {
  StackName?: string;
  ChangeSetName?: string;
  OperationId?: string;
  Filters?: EventFilter;
  NextToken?: string;
}
export type EventId = string;
export type OperationType =
  | "CREATE_STACK"
  | "UPDATE_STACK"
  | "DELETE_STACK"
  | "CONTINUE_ROLLBACK"
  | "ROLLBACK"
  | "CREATE_CHANGESET"
  | (string & {});
export type BeaconStackOperationStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type EventType =
  | "STACK_EVENT"
  | "PROGRESS_EVENT"
  | "VALIDATION_ERROR"
  | "PROVISIONING_ERROR"
  | "HOOK_INVOCATION_ERROR"
  | (string & {});
export type ResourceStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATE_COMPLETE"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "DELETE_COMPLETE"
  | "DELETE_SKIPPED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "UPDATE_COMPLETE"
  | "IMPORT_FAILED"
  | "IMPORT_COMPLETE"
  | "IMPORT_IN_PROGRESS"
  | "IMPORT_ROLLBACK_IN_PROGRESS"
  | "IMPORT_ROLLBACK_FAILED"
  | "IMPORT_ROLLBACK_COMPLETE"
  | "EXPORT_FAILED"
  | "EXPORT_COMPLETE"
  | "EXPORT_IN_PROGRESS"
  | "EXPORT_ROLLBACK_IN_PROGRESS"
  | "EXPORT_ROLLBACK_FAILED"
  | "EXPORT_ROLLBACK_COMPLETE"
  | "UPDATE_ROLLBACK_IN_PROGRESS"
  | "UPDATE_ROLLBACK_COMPLETE"
  | "UPDATE_ROLLBACK_FAILED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETE"
  | "ROLLBACK_FAILED"
  | (string & {});
export type ResourceStatusReason = string;
export type ResourceProperties = string;
export type HookType = string;
export type HookStatus =
  | "HOOK_IN_PROGRESS"
  | "HOOK_COMPLETE_SUCCEEDED"
  | "HOOK_COMPLETE_FAILED"
  | "HOOK_FAILED"
  | (string & {});
export type HookStatusReason = string;
export type DetailedStatus =
  | "CONFIGURATION_COMPLETE"
  | "VALIDATION_FAILED"
  | (string & {});
export type ValidationName = string;
export type ValidationStatus = "FAILED" | "SKIPPED" | (string & {});
export type ValidationStatusReason = string;
export type ValidationPath = string;
export interface OperationEvent {
  EventId?: string;
  StackId?: string;
  OperationId?: string;
  OperationType?: OperationType;
  OperationStatus?: BeaconStackOperationStatus;
  EventType?: EventType;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Timestamp?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  ResourceProperties?: string;
  ClientRequestToken?: string;
  HookType?: string;
  HookStatus?: HookStatus;
  HookStatusReason?: string;
  HookInvocationPoint?: HookInvocationPoint;
  HookFailureMode?: HookFailureMode;
  DetailedStatus?: DetailedStatus;
  ValidationFailureMode?: HookFailureMode;
  ValidationName?: string;
  ValidationStatus?: ValidationStatus;
  ValidationStatusReason?: string;
  ValidationPath?: string;
}
export type OperationEvents = OperationEvent[];
export interface DescribeEventsOutput {
  OperationEvents?: OperationEvent[];
  NextToken?: string;
}
export interface DescribeGeneratedTemplateInput {
  GeneratedTemplateName?: string;
}
export type GeneratedTemplateResourceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETE"
  | (string & {});
export type WarningType =
  | "MUTUALLY_EXCLUSIVE_PROPERTIES"
  | "UNSUPPORTED_PROPERTIES"
  | "MUTUALLY_EXCLUSIVE_TYPES"
  | "EXCLUDED_PROPERTIES"
  | "EXCLUDED_RESOURCES"
  | (string & {});
export type PropertyPath = string;
export type RequiredProperty = boolean;
export type PropertyDescription = string;
export interface WarningProperty {
  PropertyPath?: string;
  Required?: boolean;
  Description?: string;
}
export type WarningProperties = WarningProperty[];
export interface WarningDetail {
  Type?: WarningType;
  Properties?: WarningProperty[];
}
export type WarningDetails = WarningDetail[];
export interface ResourceDetail {
  ResourceType?: string;
  LogicalResourceId?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
  ResourceStatus?: GeneratedTemplateResourceStatus;
  ResourceStatusReason?: string;
  Warnings?: WarningDetail[];
}
export type ResourceDetails = ResourceDetail[];
export type GeneratedTemplateStatus =
  | "CREATE_PENDING"
  | "UPDATE_PENDING"
  | "DELETE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "UPDATE_IN_PROGRESS"
  | "DELETE_IN_PROGRESS"
  | "FAILED"
  | "COMPLETE"
  | (string & {});
export type TemplateStatusReason = string;
export type LastUpdatedTime = Date;
export type ResourcesSucceeded = number;
export type ResourcesFailed = number;
export type ResourcesProcessing = number;
export type ResourcesPending = number;
export interface TemplateProgress {
  ResourcesSucceeded?: number;
  ResourcesFailed?: number;
  ResourcesProcessing?: number;
  ResourcesPending?: number;
}
export type TotalWarnings = number;
export interface DescribeGeneratedTemplateOutput {
  GeneratedTemplateId?: string;
  GeneratedTemplateName?: string;
  Resources?: ResourceDetail[];
  Status?: GeneratedTemplateStatus;
  StatusReason?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  Progress?: TemplateProgress;
  StackId?: string;
  TemplateConfiguration?: TemplateConfiguration;
  TotalWarnings?: number;
}
export interface DescribeOrganizationsAccessInput {
  CallAs?: CallAs;
}
export type OrganizationStatus =
  | "ENABLED"
  | "DISABLED"
  | "DISABLED_PERMANENTLY"
  | (string & {});
export interface DescribeOrganizationsAccessOutput {
  Status?: OrganizationStatus;
}
export interface DescribePublisherInput {
  PublisherId?: string;
}
export type PublisherStatus = "VERIFIED" | "UNVERIFIED" | (string & {});
export type IdentityProvider =
  | "AWS_Marketplace"
  | "GitHub"
  | "Bitbucket"
  | (string & {});
export type PublisherProfile = string;
export interface DescribePublisherOutput {
  PublisherId?: string;
  PublisherStatus?: PublisherStatus;
  IdentityProvider?: IdentityProvider;
  PublisherProfile?: string;
}
export type ResourceScanId = string;
export interface DescribeResourceScanInput {
  ResourceScanId?: string;
}
export type ResourceScanStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETE"
  | "EXPIRED"
  | (string & {});
export type ResourceScanStatusReason = string;
export type PercentageCompleted = number;
export type ResourcesScanned = number;
export type ResourcesRead = number;
export type ResourceTypeFilter = string;
export type ResourceTypeFilters = string[];
export interface ScanFilter {
  Types?: string[];
}
export type ScanFilters = ScanFilter[];
export interface DescribeResourceScanOutput {
  ResourceScanId?: string;
  Status?: ResourceScanStatus;
  StatusReason?: string;
  StartTime?: Date;
  EndTime?: Date;
  PercentageCompleted?: number;
  ResourceTypes?: string[];
  ResourcesScanned?: number;
  ResourcesRead?: number;
  ScanFilters?: ScanFilter[];
}
export type StackDriftDetectionId = string;
export interface DescribeStackDriftDetectionStatusInput {
  StackDriftDetectionId?: string;
}
export type StackDriftDetectionStatus =
  | "DETECTION_IN_PROGRESS"
  | "DETECTION_FAILED"
  | "DETECTION_COMPLETE"
  | (string & {});
export type StackDriftDetectionStatusReason = string;
export type BoxedInteger = number;
export interface DescribeStackDriftDetectionStatusOutput {
  StackId: string;
  StackDriftDetectionId: string;
  StackDriftStatus?: StackDriftStatus;
  DetectionStatus: StackDriftDetectionStatus;
  DetectionStatusReason?: string;
  DriftedStackResourceCount?: number;
  Timestamp: Date;
}
export interface DescribeStackEventsInput {
  StackName?: string;
  NextToken?: string;
}
export type HookInvocationId = string;
export interface StackEvent {
  StackId?: string;
  EventId?: string;
  StackName?: string;
  OperationId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Timestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  ResourceProperties?: string;
  ClientRequestToken?: string;
  HookType?: string;
  HookStatus?: HookStatus;
  HookStatusReason?: string;
  HookInvocationPoint?: HookInvocationPoint;
  HookInvocationId?: string;
  HookFailureMode?: HookFailureMode;
  DetailedStatus?: DetailedStatus;
}
export type StackEvents = StackEvent[];
export interface DescribeStackEventsOutput {
  StackEvents?: (StackEvent & {
    StackId: StackId;
    EventId: EventId;
    StackName: StackName;
    Timestamp: Date;
  })[];
  NextToken?: string;
}
export interface DescribeStackInstanceInput {
  StackSetName?: string;
  StackInstanceAccount?: string;
  StackInstanceRegion?: string;
  CallAs?: CallAs;
}
export type StackInstanceStatus =
  | "CURRENT"
  | "OUTDATED"
  | "INOPERABLE"
  | (string & {});
export type StackInstanceDetailedStatus =
  | "PENDING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "INOPERABLE"
  | "SKIPPED_SUSPENDED_ACCOUNT"
  | "FAILED_IMPORT"
  | (string & {});
export interface StackInstanceComprehensiveStatus {
  DetailedStatus?: StackInstanceDetailedStatus;
}
export type Reason = string;
export interface StackInstance {
  StackSetId?: string;
  Region?: string;
  Account?: string;
  StackId?: string;
  ParameterOverrides?: Parameter[];
  Status?: StackInstanceStatus;
  StackInstanceStatus?: StackInstanceComprehensiveStatus;
  StatusReason?: string;
  OrganizationalUnitId?: string;
  DriftStatus?: StackDriftStatus;
  LastDriftCheckTimestamp?: Date;
  LastOperationId?: string;
}
export interface DescribeStackInstanceOutput {
  StackInstance?: StackInstance;
}
export interface DescribeStackRefactorInput {
  StackRefactorId?: string;
}
export type StackIds = string[];
export type StackRefactorExecutionStatus =
  | "UNAVAILABLE"
  | "AVAILABLE"
  | "OBSOLETE"
  | "EXECUTE_IN_PROGRESS"
  | "EXECUTE_COMPLETE"
  | "EXECUTE_FAILED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETE"
  | "ROLLBACK_FAILED"
  | (string & {});
export type ExecutionStatusReason = string;
export type StackRefactorStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | (string & {});
export type StackRefactorStatusReason = string;
export interface DescribeStackRefactorOutput {
  Description?: string;
  StackRefactorId?: string;
  StackIds?: string[];
  ExecutionStatus?: StackRefactorExecutionStatus;
  ExecutionStatusReason?: string;
  Status?: StackRefactorStatus;
  StatusReason?: string;
}
export interface DescribeStackResourceInput {
  StackName?: string;
  LogicalResourceId?: string;
}
export type Metadata = string;
export interface StackResourceDriftInformation {
  StackResourceDriftStatus?: StackResourceDriftStatus;
  LastCheckTimestamp?: Date;
}
export interface StackResourceDetail {
  StackName?: string;
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  LastUpdatedTimestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  Description?: string;
  Metadata?: string;
  DriftInformation?: StackResourceDriftInformation;
  ModuleInfo?: ModuleInfo;
}
export interface DescribeStackResourceOutput {
  StackResourceDetail?: StackResourceDetail & {
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    LastUpdatedTimestamp: Date;
    ResourceStatus: ResourceStatus;
    DriftInformation: StackResourceDriftInformation & {
      StackResourceDriftStatus: StackResourceDriftStatus;
    };
  };
}
export type StackResourceDriftStatusFilters = StackResourceDriftStatus[];
export type BoxedMaxResults = number;
export interface DescribeStackResourceDriftsInput {
  StackName?: string;
  StackResourceDriftStatusFilters?: StackResourceDriftStatus[];
  NextToken?: string;
  MaxResults?: number;
}
export type Key = string;
export type Value = string;
export interface PhysicalResourceIdContextKeyValuePair {
  Key?: string;
  Value?: string;
}
export type PhysicalResourceIdContext = PhysicalResourceIdContextKeyValuePair[];
export type Properties = string;
export type PropertyValue = string;
export type DifferenceType = "ADD" | "REMOVE" | "NOT_EQUAL" | (string & {});
export interface PropertyDifference {
  PropertyPath?: string;
  ExpectedValue?: string;
  ActualValue?: string;
  DifferenceType?: DifferenceType;
}
export type PropertyDifferences = PropertyDifference[];
export type StackResourceDriftStatusReason = string;
export interface StackResourceDrift {
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  PhysicalResourceIdContext?: PhysicalResourceIdContextKeyValuePair[];
  ResourceType?: string;
  ExpectedProperties?: string;
  ActualProperties?: string;
  PropertyDifferences?: PropertyDifference[];
  StackResourceDriftStatus?: StackResourceDriftStatus;
  Timestamp?: Date;
  ModuleInfo?: ModuleInfo;
  DriftStatusReason?: string;
}
export type StackResourceDrifts = StackResourceDrift[];
export interface DescribeStackResourceDriftsOutput {
  StackResourceDrifts: (StackResourceDrift & {
    StackId: StackId;
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    StackResourceDriftStatus: StackResourceDriftStatus;
    Timestamp: Date;
    PhysicalResourceIdContext: (PhysicalResourceIdContextKeyValuePair & {
      Key: Key;
      Value: Value;
    })[];
    PropertyDifferences: (PropertyDifference & {
      PropertyPath: PropertyPath;
      ExpectedValue: PropertyValue;
      ActualValue: PropertyValue;
      DifferenceType: DifferenceType;
    })[];
  })[];
  NextToken?: string;
}
export interface DescribeStackResourcesInput {
  StackName?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
}
export interface StackResource {
  StackName?: string;
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Timestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  Description?: string;
  DriftInformation?: StackResourceDriftInformation;
  ModuleInfo?: ModuleInfo;
}
export type StackResources = StackResource[];
export interface DescribeStackResourcesOutput {
  StackResources?: (StackResource & {
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    Timestamp: Date;
    ResourceStatus: ResourceStatus;
    DriftInformation: StackResourceDriftInformation & {
      StackResourceDriftStatus: StackResourceDriftStatus;
    };
  })[];
}
export interface DescribeStacksInput {
  StackName?: string;
  NextToken?: string;
}
export type DeletionTime = Date;
export type StackStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATE_COMPLETE"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_FAILED"
  | "ROLLBACK_COMPLETE"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "DELETE_COMPLETE"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | "UPDATE_ROLLBACK_IN_PROGRESS"
  | "UPDATE_ROLLBACK_FAILED"
  | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS"
  | "UPDATE_ROLLBACK_COMPLETE"
  | "REVIEW_IN_PROGRESS"
  | "IMPORT_IN_PROGRESS"
  | "IMPORT_COMPLETE"
  | "IMPORT_ROLLBACK_IN_PROGRESS"
  | "IMPORT_ROLLBACK_FAILED"
  | "IMPORT_ROLLBACK_COMPLETE"
  | (string & {});
export type StackStatusReason = string;
export type OutputKey = string;
export type OutputValue = string;
export type ExportName = string;
export interface Output {
  OutputKey?: string;
  OutputValue?: string;
  Description?: string;
  ExportName?: string;
}
export type Outputs = Output[];
export interface StackDriftInformation {
  StackDriftStatus?: StackDriftStatus;
  LastCheckTimestamp?: Date;
}
export interface OperationEntry {
  OperationType?: OperationType;
  OperationId?: string;
}
export type LastOperations = OperationEntry[];
export interface Stack {
  StackId?: string;
  StackName?: string;
  ChangeSetId?: string;
  Description?: string;
  Parameters?: Parameter[];
  CreationTime?: Date;
  DeletionTime?: Date;
  LastUpdatedTime?: Date;
  RollbackConfiguration?: RollbackConfiguration;
  StackStatus?: StackStatus;
  StackStatusReason?: string;
  DisableRollback?: boolean;
  DeploymentConfig?: DeploymentConfig;
  NotificationARNs?: string[];
  TimeoutInMinutes?: number;
  Capabilities?: Capability[];
  Outputs?: Output[];
  RoleARN?: string;
  Tags?: Tag[];
  EnableTerminationProtection?: boolean;
  ParentId?: string;
  RootId?: string;
  DriftInformation?: StackDriftInformation;
  RetainExceptOnCreate?: boolean;
  DeletionMode?: DeletionMode;
  DetailedStatus?: DetailedStatus;
  LastOperations?: OperationEntry[];
}
export type Stacks = Stack[];
export interface DescribeStacksOutput {
  Stacks?: (Stack & {
    StackName: StackName;
    CreationTime: CreationTime;
    StackStatus: StackStatus;
    RollbackConfiguration: RollbackConfiguration & {
      RollbackTriggers: (RollbackTrigger & { Arn: Arn; Type: Type })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    DriftInformation: StackDriftInformation & {
      StackDriftStatus: StackDriftStatus;
    };
  })[];
  NextToken?: string;
}
export interface DescribeStackSetInput {
  StackSetName?: string;
  CallAs?: CallAs;
}
export type StackSetStatus = "ACTIVE" | "DELETED" | (string & {});
export type StackSetDriftStatus =
  | "DRIFTED"
  | "IN_SYNC"
  | "NOT_CHECKED"
  | (string & {});
export type StackSetDriftDetectionStatus =
  | "COMPLETED"
  | "FAILED"
  | "PARTIAL_SUCCESS"
  | "IN_PROGRESS"
  | "STOPPED"
  | (string & {});
export type TotalStackInstancesCount = number;
export type DriftedStackInstancesCount = number;
export type InSyncStackInstancesCount = number;
export type InProgressStackInstancesCount = number;
export type FailedStackInstancesCount = number;
export interface StackSetDriftDetectionDetails {
  DriftStatus?: StackSetDriftStatus;
  DriftDetectionStatus?: StackSetDriftDetectionStatus;
  LastDriftCheckTimestamp?: Date;
  TotalStackInstancesCount?: number;
  DriftedStackInstancesCount?: number;
  InSyncStackInstancesCount?: number;
  InProgressStackInstancesCount?: number;
  FailedStackInstancesCount?: number;
}
export interface StackSet {
  StackSetName?: string;
  StackSetId?: string;
  Description?: string;
  Status?: StackSetStatus;
  TemplateBody?: string;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  Tags?: Tag[];
  StackSetARN?: string;
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  StackSetDriftDetectionDetails?: StackSetDriftDetectionDetails;
  AutoDeployment?: AutoDeployment;
  PermissionModel?: PermissionModels;
  OrganizationalUnitIds?: string[];
  ManagedExecution?: ManagedExecution;
  Regions?: string[];
}
export interface DescribeStackSetOutput {
  StackSet?: StackSet & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
}
export interface DescribeStackSetOperationInput {
  StackSetName?: string;
  OperationId?: string;
  CallAs?: CallAs;
}
export type StackSetOperationAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "DETECT_DRIFT"
  | (string & {});
export type StackSetOperationStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "QUEUED"
  | (string & {});
export type RetainStacksNullable = boolean;
export type StackSetOperationStatusReason = string;
export interface StackSetOperationStatusDetails {
  FailedStackInstancesCount?: number;
}
export interface StackSetOperation {
  OperationId?: string;
  StackSetId?: string;
  Action?: StackSetOperationAction;
  Status?: StackSetOperationStatus;
  OperationPreferences?: StackSetOperationPreferences;
  RetainStacks?: boolean;
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  CreationTimestamp?: Date;
  EndTimestamp?: Date;
  DeploymentTargets?: DeploymentTargets;
  StackSetDriftDetectionDetails?: StackSetDriftDetectionDetails;
  StatusReason?: string;
  StatusDetails?: StackSetOperationStatusDetails;
}
export interface DescribeStackSetOperationOutput {
  StackSetOperation?: StackSetOperation;
}
export type PublicVersionNumber = string;
export interface DescribeTypeInput {
  Type?: RegistryType;
  TypeName?: string;
  Arn?: string;
  VersionId?: string;
  PublisherId?: string;
  PublicVersionNumber?: string;
}
export type IsDefaultVersion = boolean;
export type TypeTestsStatus =
  | "PASSED"
  | "FAILED"
  | "IN_PROGRESS"
  | "NOT_TESTED"
  | (string & {});
export type TypeTestsStatusDescription = string;
export type TypeSchema = string;
export type ProvisioningType =
  | "NON_PROVISIONABLE"
  | "IMMUTABLE"
  | "FULLY_MUTABLE"
  | (string & {});
export type DeprecatedStatus = "LIVE" | "DEPRECATED" | (string & {});
export type SupportedMajorVersion = number;
export type SupportedMajorVersions = number[];
export interface RequiredActivatedType {
  TypeNameAlias?: string;
  OriginalTypeName?: string;
  PublisherId?: string;
  SupportedMajorVersions?: number[];
}
export type RequiredActivatedTypes = RequiredActivatedType[];
export type Visibility = "PUBLIC" | "PRIVATE" | (string & {});
export type OptionalSecureUrl = string;
export type ConfigurationSchema = string;
export type IsActivated = boolean;
export interface DescribeTypeOutput {
  Arn?: string;
  Type?: RegistryType;
  TypeName?: string;
  DefaultVersionId?: string;
  IsDefaultVersion?: boolean;
  TypeTestsStatus?: TypeTestsStatus;
  TypeTestsStatusDescription?: string;
  Description?: string;
  Schema?: string;
  ProvisioningType?: ProvisioningType;
  DeprecatedStatus?: DeprecatedStatus;
  LoggingConfig?: LoggingConfig & {
    LogRoleArn: RoleARN2;
    LogGroupName: LogGroupName;
  };
  RequiredActivatedTypes?: RequiredActivatedType[];
  ExecutionRoleArn?: string;
  Visibility?: Visibility;
  SourceUrl?: string;
  DocumentationUrl?: string;
  LastUpdated?: Date;
  TimeCreated?: Date;
  ConfigurationSchema?: string;
  PublisherId?: string;
  OriginalTypeName?: string;
  OriginalTypeArn?: string;
  PublicVersionNumber?: string;
  LatestPublicVersion?: string;
  IsActivated?: boolean;
  AutoUpdate?: boolean;
}
export type RegistrationToken = string;
export interface DescribeTypeRegistrationInput {
  RegistrationToken?: string;
}
export type RegistrationStatus =
  | "COMPLETE"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export interface DescribeTypeRegistrationOutput {
  ProgressStatus?: RegistrationStatus;
  Description?: string;
  TypeArn?: string;
  TypeVersionArn?: string;
}
export type LogicalResourceIds = string[];
export interface DetectStackDriftInput {
  StackName?: string;
  LogicalResourceIds?: string[];
}
export interface DetectStackDriftOutput {
  StackDriftDetectionId: string;
}
export interface DetectStackResourceDriftInput {
  StackName?: string;
  LogicalResourceId?: string;
}
export interface DetectStackResourceDriftOutput {
  StackResourceDrift: StackResourceDrift & {
    StackId: StackId;
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    StackResourceDriftStatus: StackResourceDriftStatus;
    Timestamp: Date;
    PhysicalResourceIdContext: (PhysicalResourceIdContextKeyValuePair & {
      Key: Key;
      Value: Value;
    })[];
    PropertyDifferences: (PropertyDifference & {
      PropertyPath: PropertyPath;
      ExpectedValue: PropertyValue;
      ActualValue: PropertyValue;
      DifferenceType: DifferenceType;
    })[];
  };
}
export type StackSetNameOrId = string;
export interface DetectStackSetDriftInput {
  StackSetName?: string;
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface DetectStackSetDriftOutput {
  OperationId?: string;
}
export interface EstimateTemplateCostInput {
  TemplateBody?: string;
  TemplateURL?: string;
  Parameters?: Parameter[];
}
export type Url = string;
export interface EstimateTemplateCostOutput {
  Url?: string;
}
export interface ExecuteChangeSetInput {
  ChangeSetName?: string;
  StackName?: string;
  ClientRequestToken?: string;
  DisableRollback?: boolean;
  RetainExceptOnCreate?: boolean;
}
export interface ExecuteChangeSetOutput {}
export interface ExecuteStackRefactorInput {
  StackRefactorId?: string;
}
export interface ExecuteStackRefactorResponse {}
export type TemplateFormat = "JSON" | "YAML" | (string & {});
export interface GetGeneratedTemplateInput {
  Format?: TemplateFormat;
  GeneratedTemplateName?: string;
}
export interface GetGeneratedTemplateOutput {
  Status?: GeneratedTemplateStatus;
  TemplateBody?: string;
}
export interface GetHookResultInput {
  HookResultId?: string;
}
export type HookTypeArn = string;
export type HookTargetId = string;
export type HookTargetAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "IMPORT"
  | (string & {});
export interface HookTarget {
  TargetType?: HookTargetType;
  TargetTypeName?: string;
  TargetId?: string;
  Action?: HookTargetAction;
}
export type AnnotationName = string;
export type AnnotationStatus = "PASSED" | "FAILED" | "SKIPPED" | (string & {});
export type RemediationMessageStatusMessage = string;
export type RemediationMessageRemediationMessage = string;
export type AnnotationRemediationLink = string;
export type AnnotationSeverityLevel =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export interface Annotation {
  AnnotationName?: string;
  Status?: AnnotationStatus;
  StatusMessage?: string;
  RemediationMessage?: string;
  RemediationLink?: string;
  SeverityLevel?: AnnotationSeverityLevel;
}
export type AnnotationList = Annotation[];
export interface GetHookResultOutput {
  HookResultId?: string;
  InvocationPoint?: HookInvocationPoint;
  FailureMode?: HookFailureMode;
  TypeName?: string;
  OriginalTypeName?: string;
  TypeVersionId?: string;
  TypeConfigurationVersionId?: string;
  TypeArn?: string;
  Status?: HookStatus;
  HookStatusReason?: string;
  InvokedAt?: Date;
  Target?: HookTarget & {
    TargetType: HookTargetType;
    TargetTypeName: HookTargetTypeName;
    TargetId: HookTargetId;
    Action: HookTargetAction;
  };
  Annotations?: Annotation[];
}
export interface GetStackPolicyInput {
  StackName?: string;
}
export interface GetStackPolicyOutput {
  StackPolicyBody?: string;
}
export type TemplateStage = "Original" | "Processed" | (string & {});
export interface GetTemplateInput {
  StackName?: string;
  ChangeSetName?: string;
  TemplateStage?: TemplateStage;
}
export type StageList = TemplateStage[];
export interface GetTemplateOutput {
  TemplateBody?: string;
  StagesAvailable?: TemplateStage[];
}
export type TreatUnrecognizedResourceTypesAsWarnings = boolean;
export interface TemplateSummaryConfig {
  TreatUnrecognizedResourceTypesAsWarnings?: boolean;
}
export interface GetTemplateSummaryInput {
  TemplateBody?: string;
  TemplateURL?: string;
  StackName?: string;
  StackSetName?: string;
  CallAs?: CallAs;
  TemplateSummaryConfig?: TemplateSummaryConfig;
}
export type ParameterType = string;
export type NoEcho = boolean;
export type AllowedValue = string;
export type AllowedValues = string[];
export interface ParameterConstraints {
  AllowedValues?: string[];
}
export interface ParameterDeclaration {
  ParameterKey?: string;
  DefaultValue?: string;
  ParameterType?: string;
  NoEcho?: boolean;
  Description?: string;
  ParameterConstraints?: ParameterConstraints;
}
export type ParameterDeclarations = ParameterDeclaration[];
export type CapabilitiesReason = string;
export type Version = string;
export type TransformName = string;
export type TransformsList = string[];
export type ResourceIdentifiers = string[];
export interface ResourceIdentifierSummary {
  ResourceType?: string;
  LogicalResourceIds?: string[];
  ResourceIdentifiers?: string[];
}
export type ResourceIdentifierSummaries = ResourceIdentifierSummary[];
export interface Warnings {
  UnrecognizedResourceTypes?: string[];
}
export interface GetTemplateSummaryOutput {
  Parameters?: ParameterDeclaration[];
  Description?: string;
  Capabilities?: Capability[];
  CapabilitiesReason?: string;
  ResourceTypes?: string[];
  Version?: string;
  Metadata?: string;
  DeclaredTransforms?: string[];
  ResourceIdentifierSummaries?: ResourceIdentifierSummary[];
  Warnings?: Warnings;
}
export type StackIdList = string[];
export type StackIdsUrl = string;
export interface ImportStacksToStackSetInput {
  StackSetName?: string;
  StackIds?: string[];
  StackIdsUrl?: string;
  OrganizationalUnitIds?: string[];
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface ImportStacksToStackSetOutput {
  OperationId?: string;
}
export interface ListChangeSetsInput {
  StackName?: string;
  NextToken?: string;
}
export interface ChangeSetSummary {
  StackId?: string;
  StackName?: string;
  ChangeSetId?: string;
  ChangeSetName?: string;
  ExecutionStatus?: ExecutionStatus;
  Status?: ChangeSetStatus;
  StatusReason?: string;
  CreationTime?: Date;
  Description?: string;
  IncludeNestedStacks?: boolean;
  ParentChangeSetId?: string;
  RootChangeSetId?: string;
  ImportExistingResources?: boolean;
}
export type ChangeSetSummaries = ChangeSetSummary[];
export interface ListChangeSetsOutput {
  Summaries?: ChangeSetSummary[];
  NextToken?: string;
}
export interface ListExportsInput {
  NextToken?: string;
}
export type ExportValue = string;
export interface Export {
  ExportingStackId?: string;
  Name?: string;
  Value?: string;
}
export type Exports = Export[];
export interface ListExportsOutput {
  Exports?: Export[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListGeneratedTemplatesInput {
  NextToken?: string;
  MaxResults?: number;
}
export type NumberOfResources = number;
export interface TemplateSummary {
  GeneratedTemplateId?: string;
  GeneratedTemplateName?: string;
  Status?: GeneratedTemplateStatus;
  StatusReason?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  NumberOfResources?: number;
}
export type TemplateSummaries = TemplateSummary[];
export interface ListGeneratedTemplatesOutput {
  Summaries?: TemplateSummary[];
  NextToken?: string;
}
export type ListHookResultsTargetType =
  | "CHANGE_SET"
  | "STACK"
  | "RESOURCE"
  | "CLOUD_CONTROL"
  | (string & {});
export type HookResultId = string;
export interface ListHookResultsInput {
  TargetType?: ListHookResultsTargetType;
  TargetId?: string;
  TypeArn?: string;
  Status?: HookStatus;
  NextToken?: string;
}
export interface HookResultSummary {
  HookResultId?: string;
  InvocationPoint?: HookInvocationPoint;
  FailureMode?: HookFailureMode;
  TypeName?: string;
  TypeVersionId?: string;
  TypeConfigurationVersionId?: string;
  Status?: HookStatus;
  HookStatusReason?: string;
  InvokedAt?: Date;
  TargetType?: ListHookResultsTargetType;
  TargetId?: string;
  TypeArn?: string;
  HookExecutionTarget?: string;
}
export type HookResultSummaries = HookResultSummary[];
export interface ListHookResultsOutput {
  TargetType?: ListHookResultsTargetType;
  TargetId?: string;
  HookResults?: HookResultSummary[];
  NextToken?: string;
}
export interface ListImportsInput {
  ExportName?: string;
  NextToken?: string;
}
export type Imports = string[];
export interface ListImportsOutput {
  Imports?: string[];
  NextToken?: string;
}
export type JazzResourceIdentifierPropertyKey = string;
export type JazzResourceIdentifierPropertyValue = string;
export type JazzResourceIdentifierProperties = {
  [key: string]: string | undefined;
};
export interface ScannedResourceIdentifier {
  ResourceType?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
}
export type ScannedResourceIdentifiers = ScannedResourceIdentifier[];
export interface ListResourceScanRelatedResourcesInput {
  ResourceScanId?: string;
  Resources?: ScannedResourceIdentifier[];
  NextToken?: string;
  MaxResults?: number;
}
export type ManagedByStack = boolean;
export interface ScannedResource {
  ResourceType?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
  ManagedByStack?: boolean;
}
export type RelatedResources = ScannedResource[];
export interface ListResourceScanRelatedResourcesOutput {
  RelatedResources?: ScannedResource[];
  NextToken?: string;
}
export type ResourceIdentifier = string;
export type ResourceTypePrefix = string;
export type ResourceScannerMaxResults = number;
export interface ListResourceScanResourcesInput {
  ResourceScanId?: string;
  ResourceIdentifier?: string;
  ResourceTypePrefix?: string;
  TagKey?: string;
  TagValue?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ScannedResources = ScannedResource[];
export interface ListResourceScanResourcesOutput {
  Resources?: ScannedResource[];
  NextToken?: string;
}
export type ScanType = "FULL" | "PARTIAL" | (string & {});
export interface ListResourceScansInput {
  NextToken?: string;
  MaxResults?: number;
  ScanTypeFilter?: ScanType;
}
export interface ResourceScanSummary {
  ResourceScanId?: string;
  Status?: ResourceScanStatus;
  StatusReason?: string;
  StartTime?: Date;
  EndTime?: Date;
  PercentageCompleted?: number;
  ScanType?: ScanType;
}
export type ResourceScanSummaries = ResourceScanSummary[];
export interface ListResourceScansOutput {
  ResourceScanSummaries?: ResourceScanSummary[];
  NextToken?: string;
}
export interface ListStackInstanceResourceDriftsInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  StackInstanceResourceDriftStatuses?: StackResourceDriftStatus[];
  StackInstanceAccount?: string;
  StackInstanceRegion?: string;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface StackInstanceResourceDriftsSummary {
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  PhysicalResourceIdContext?: PhysicalResourceIdContextKeyValuePair[];
  ResourceType?: string;
  PropertyDifferences?: PropertyDifference[];
  StackResourceDriftStatus?: StackResourceDriftStatus;
  Timestamp?: Date;
}
export type StackInstanceResourceDriftsSummaries =
  StackInstanceResourceDriftsSummary[];
export interface ListStackInstanceResourceDriftsOutput {
  Summaries?: (StackInstanceResourceDriftsSummary & {
    StackId: StackId;
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    StackResourceDriftStatus: StackResourceDriftStatus;
    Timestamp: Date;
    PhysicalResourceIdContext: (PhysicalResourceIdContextKeyValuePair & {
      Key: Key;
      Value: Value;
    })[];
    PropertyDifferences: (PropertyDifference & {
      PropertyPath: PropertyPath;
      ExpectedValue: PropertyValue;
      ActualValue: PropertyValue;
      DifferenceType: DifferenceType;
    })[];
  })[];
  NextToken?: string;
}
export type StackInstanceFilterName =
  | "DETAILED_STATUS"
  | "LAST_OPERATION_ID"
  | "DRIFT_STATUS"
  | (string & {});
export type StackInstanceFilterValues = string;
export interface StackInstanceFilter {
  Name?: StackInstanceFilterName;
  Values?: string;
}
export type StackInstanceFilters = StackInstanceFilter[];
export interface ListStackInstancesInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: StackInstanceFilter[];
  StackInstanceAccount?: string;
  StackInstanceRegion?: string;
  CallAs?: CallAs;
}
export interface StackInstanceSummary {
  StackSetId?: string;
  Region?: string;
  Account?: string;
  StackId?: string;
  Status?: StackInstanceStatus;
  StatusReason?: string;
  StackInstanceStatus?: StackInstanceComprehensiveStatus;
  OrganizationalUnitId?: string;
  DriftStatus?: StackDriftStatus;
  LastDriftCheckTimestamp?: Date;
  LastOperationId?: string;
}
export type StackInstanceSummaries = StackInstanceSummary[];
export interface ListStackInstancesOutput {
  Summaries?: StackInstanceSummary[];
  NextToken?: string;
}
export interface ListStackRefactorActionsInput {
  StackRefactorId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type StackRefactorActionType = "MOVE" | "CREATE" | (string & {});
export type StackRefactorActionEntity = "RESOURCE" | "STACK" | (string & {});
export type StackRefactorResourceIdentifier = string;
export type StackRefactorDetection = "AUTO" | "MANUAL" | (string & {});
export type DetectionReason = string;
export type StackRefactorTagResources = Tag[];
export type StackRefactorUntagResources = string[];
export interface StackRefactorAction {
  Action?: StackRefactorActionType;
  Entity?: StackRefactorActionEntity;
  PhysicalResourceId?: string;
  ResourceIdentifier?: string;
  Description?: string;
  Detection?: StackRefactorDetection;
  DetectionReason?: string;
  TagResources?: Tag[];
  UntagResources?: string[];
  ResourceMapping?: ResourceMapping;
}
export type StackRefactorActions = StackRefactorAction[];
export interface ListStackRefactorActionsOutput {
  StackRefactorActions: (StackRefactorAction & {
    TagResources: (Tag & { Key: TagKey; Value: TagValue })[];
    ResourceMapping: ResourceMapping & {
      Source: ResourceLocation & {
        StackName: StackName;
        LogicalResourceId: LogicalResourceId;
      };
      Destination: ResourceLocation & {
        StackName: StackName;
        LogicalResourceId: LogicalResourceId;
      };
    };
  })[];
  NextToken?: string;
}
export type StackRefactorExecutionStatusFilter = StackRefactorExecutionStatus[];
export interface ListStackRefactorsInput {
  ExecutionStatusFilter?: StackRefactorExecutionStatus[];
  NextToken?: string;
  MaxResults?: number;
}
export interface StackRefactorSummary {
  StackRefactorId?: string;
  Description?: string;
  ExecutionStatus?: StackRefactorExecutionStatus;
  ExecutionStatusReason?: string;
  Status?: StackRefactorStatus;
  StatusReason?: string;
}
export type StackRefactorSummaries = StackRefactorSummary[];
export interface ListStackRefactorsOutput {
  StackRefactorSummaries: StackRefactorSummary[];
  NextToken?: string;
}
export interface ListStackResourcesInput {
  StackName?: string;
  NextToken?: string;
}
export interface StackResourceDriftInformationSummary {
  StackResourceDriftStatus?: StackResourceDriftStatus;
  LastCheckTimestamp?: Date;
}
export interface StackResourceSummary {
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  LastUpdatedTimestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  DriftInformation?: StackResourceDriftInformationSummary;
  ModuleInfo?: ModuleInfo;
}
export type StackResourceSummaries = StackResourceSummary[];
export interface ListStackResourcesOutput {
  StackResourceSummaries?: (StackResourceSummary & {
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    LastUpdatedTimestamp: Date;
    ResourceStatus: ResourceStatus;
    DriftInformation: StackResourceDriftInformationSummary & {
      StackResourceDriftStatus: StackResourceDriftStatus;
    };
  })[];
  NextToken?: string;
}
export type StackStatusFilter = StackStatus[];
export interface ListStacksInput {
  NextToken?: string;
  StackStatusFilter?: StackStatus[];
}
export type TemplateDescription = string;
export interface StackDriftInformationSummary {
  StackDriftStatus?: StackDriftStatus;
  LastCheckTimestamp?: Date;
}
export interface StackSummary {
  StackId?: string;
  StackName?: string;
  TemplateDescription?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  DeletionTime?: Date;
  StackStatus?: StackStatus;
  StackStatusReason?: string;
  ParentId?: string;
  RootId?: string;
  DriftInformation?: StackDriftInformationSummary;
  LastOperations?: OperationEntry[];
}
export type StackSummaries = StackSummary[];
export interface ListStacksOutput {
  StackSummaries?: (StackSummary & {
    StackName: StackName;
    CreationTime: CreationTime;
    StackStatus: StackStatus;
    DriftInformation: StackDriftInformationSummary & {
      StackDriftStatus: StackDriftStatus;
    };
  })[];
  NextToken?: string;
}
export interface ListStackSetAutoDeploymentTargetsInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  CallAs?: CallAs;
}
export interface StackSetAutoDeploymentTargetSummary {
  OrganizationalUnitId?: string;
  Regions?: string[];
}
export type StackSetAutoDeploymentTargetSummaries =
  StackSetAutoDeploymentTargetSummary[];
export interface ListStackSetAutoDeploymentTargetsOutput {
  Summaries?: StackSetAutoDeploymentTargetSummary[];
  NextToken?: string;
}
export type OperationResultFilterName =
  | "OPERATION_RESULT_STATUS"
  | (string & {});
export type OperationResultFilterValues = string;
export interface OperationResultFilter {
  Name?: OperationResultFilterName;
  Values?: string;
}
export type OperationResultFilters = OperationResultFilter[];
export interface ListStackSetOperationResultsInput {
  StackSetName?: string;
  OperationId?: string;
  NextToken?: string;
  MaxResults?: number;
  CallAs?: CallAs;
  Filters?: OperationResultFilter[];
}
export type StackSetOperationResultStatus =
  | "PENDING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export type AccountGateStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export type AccountGateStatusReason = string;
export interface AccountGateResult {
  Status?: AccountGateStatus;
  StatusReason?: string;
}
export interface StackSetOperationResultSummary {
  Account?: string;
  Region?: string;
  Status?: StackSetOperationResultStatus;
  StatusReason?: string;
  AccountGateResult?: AccountGateResult;
  OrganizationalUnitId?: string;
}
export type StackSetOperationResultSummaries = StackSetOperationResultSummary[];
export interface ListStackSetOperationResultsOutput {
  Summaries?: StackSetOperationResultSummary[];
  NextToken?: string;
}
export interface ListStackSetOperationsInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  CallAs?: CallAs;
}
export interface StackSetOperationSummary {
  OperationId?: string;
  Action?: StackSetOperationAction;
  Status?: StackSetOperationStatus;
  CreationTimestamp?: Date;
  EndTimestamp?: Date;
  StatusReason?: string;
  StatusDetails?: StackSetOperationStatusDetails;
  OperationPreferences?: StackSetOperationPreferences;
}
export type StackSetOperationSummaries = StackSetOperationSummary[];
export interface ListStackSetOperationsOutput {
  Summaries?: StackSetOperationSummary[];
  NextToken?: string;
}
export interface ListStackSetsInput {
  NextToken?: string;
  MaxResults?: number;
  Status?: StackSetStatus;
  CallAs?: CallAs;
}
export interface StackSetSummary {
  StackSetName?: string;
  StackSetId?: string;
  Description?: string;
  Status?: StackSetStatus;
  AutoDeployment?: AutoDeployment;
  PermissionModel?: PermissionModels;
  DriftStatus?: StackDriftStatus;
  LastDriftCheckTimestamp?: Date;
  ManagedExecution?: ManagedExecution;
}
export type StackSetSummaries = StackSetSummary[];
export interface ListStackSetsOutput {
  Summaries?: StackSetSummary[];
  NextToken?: string;
}
export interface ListTypeRegistrationsInput {
  Type?: RegistryType;
  TypeName?: string;
  TypeArn?: string;
  RegistrationStatusFilter?: RegistrationStatus;
  MaxResults?: number;
  NextToken?: string;
}
export type RegistrationTokenList = string[];
export interface ListTypeRegistrationsOutput {
  RegistrationTokenList?: string[];
  NextToken?: string;
}
export type Category =
  | "REGISTERED"
  | "ACTIVATED"
  | "THIRD_PARTY"
  | "AWS_TYPES"
  | (string & {});
export type TypeNamePrefix = string;
export interface TypeFilters {
  Category?: Category;
  PublisherId?: string;
  TypeNamePrefix?: string;
}
export interface ListTypesInput {
  Visibility?: Visibility;
  ProvisioningType?: ProvisioningType;
  DeprecatedStatus?: DeprecatedStatus;
  Type?: RegistryType;
  Filters?: TypeFilters;
  MaxResults?: number;
  NextToken?: string;
}
export type PublisherName = string;
export interface TypeSummary {
  Type?: RegistryType;
  TypeName?: string;
  DefaultVersionId?: string;
  TypeArn?: string;
  LastUpdated?: Date;
  Description?: string;
  PublisherId?: string;
  OriginalTypeName?: string;
  PublicVersionNumber?: string;
  LatestPublicVersion?: string;
  PublisherIdentity?: IdentityProvider;
  PublisherName?: string;
  IsActivated?: boolean;
}
export type TypeSummaries = TypeSummary[];
export interface ListTypesOutput {
  TypeSummaries?: TypeSummary[];
  NextToken?: string;
}
export interface ListTypeVersionsInput {
  Type?: RegistryType;
  TypeName?: string;
  Arn?: string;
  MaxResults?: number;
  NextToken?: string;
  DeprecatedStatus?: DeprecatedStatus;
  PublisherId?: string;
}
export interface TypeVersionSummary {
  Type?: RegistryType;
  TypeName?: string;
  VersionId?: string;
  IsDefaultVersion?: boolean;
  Arn?: string;
  TimeCreated?: Date;
  Description?: string;
  PublicVersionNumber?: string;
}
export type TypeVersionSummaries = TypeVersionSummary[];
export interface ListTypeVersionsOutput {
  TypeVersionSummaries?: TypeVersionSummary[];
  NextToken?: string;
}
export interface PublishTypeInput {
  Type?: ThirdPartyType;
  Arn?: string;
  TypeName?: string;
  PublicVersionNumber?: string;
}
export interface PublishTypeOutput {
  PublicTypeArn?: string;
}
export type OperationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export type StatusMessage = string;
export type HandlerErrorCode =
  | "NotUpdatable"
  | "InvalidRequest"
  | "AccessDenied"
  | "InvalidCredentials"
  | "AlreadyExists"
  | "NotFound"
  | "ResourceConflict"
  | "Throttling"
  | "ServiceLimitExceeded"
  | "NotStabilized"
  | "GeneralServiceException"
  | "ServiceInternalError"
  | "NetworkFailure"
  | "InternalFailure"
  | "InvalidTypeConfiguration"
  | "HandlerInternalFailure"
  | "NonCompliant"
  | "Unknown"
  | "UnsupportedTarget"
  | (string & {});
export type ResourceModel = string;
export interface RecordHandlerProgressInput {
  BearerToken?: string;
  OperationStatus?: OperationStatus;
  CurrentOperationStatus?: OperationStatus;
  StatusMessage?: string;
  ErrorCode?: HandlerErrorCode;
  ResourceModel?: string;
  ClientRequestToken?: string;
}
export interface RecordHandlerProgressOutput {}
export type AcceptTermsAndConditions = boolean;
export type ConnectionArn = string;
export interface RegisterPublisherInput {
  AcceptTermsAndConditions?: boolean;
  ConnectionArn?: string;
}
export interface RegisterPublisherOutput {
  PublisherId?: string;
}
export type S3Url = string;
export type RequestToken = string;
export interface RegisterTypeInput {
  Type?: RegistryType;
  TypeName?: string;
  SchemaHandlerPackage?: string;
  LoggingConfig?: LoggingConfig;
  ExecutionRoleArn?: string;
  ClientRequestToken?: string;
}
export interface RegisterTypeOutput {
  RegistrationToken?: string;
}
export interface RollbackStackInput {
  StackName?: string;
  RoleARN?: string;
  ClientRequestToken?: string;
  RetainExceptOnCreate?: boolean;
  DeploymentConfig?: DeploymentConfig;
}
export interface RollbackStackOutput {
  StackId?: string;
  OperationId?: string;
}
export interface SetStackPolicyInput {
  StackName?: string;
  StackPolicyBody?: string;
  StackPolicyURL?: string;
}
export interface SetStackPolicyResponse {}
export interface SetTypeConfigurationInput {
  TypeArn?: string;
  Configuration?: string;
  ConfigurationAlias?: string;
  TypeName?: string;
  Type?: ThirdPartyType;
}
export interface SetTypeConfigurationOutput {
  ConfigurationArn?: string;
}
export interface SetTypeDefaultVersionInput {
  Arn?: string;
  Type?: RegistryType;
  TypeName?: string;
  VersionId?: string;
}
export interface SetTypeDefaultVersionOutput {}
export type ResourceSignalUniqueId = string;
export type ResourceSignalStatus = "SUCCESS" | "FAILURE" | (string & {});
export interface SignalResourceInput {
  StackName?: string;
  LogicalResourceId?: string;
  UniqueId?: string;
  Status?: ResourceSignalStatus;
}
export interface SignalResourceResponse {}
export interface StartResourceScanInput {
  ClientRequestToken?: string;
  ScanFilters?: ScanFilter[];
}
export interface StartResourceScanOutput {
  ResourceScanId?: string;
}
export interface StopStackSetOperationInput {
  StackSetName?: string;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface StopStackSetOperationOutput {}
export type S3Bucket = string;
export interface TestTypeInput {
  Arn?: string;
  Type?: ThirdPartyType;
  TypeName?: string;
  VersionId?: string;
  LogDeliveryBucket?: string;
}
export interface TestTypeOutput {
  TypeVersionArn?: string;
}
export type JazzLogicalResourceIds = string[];
export type RefreshAllResources = boolean;
export interface UpdateGeneratedTemplateInput {
  GeneratedTemplateName?: string;
  NewGeneratedTemplateName?: string;
  AddResources?: ResourceDefinition[];
  RemoveResources?: string[];
  RefreshAllResources?: boolean;
  TemplateConfiguration?: TemplateConfiguration;
}
export interface UpdateGeneratedTemplateOutput {
  GeneratedTemplateId?: string;
}
export type StackPolicyDuringUpdateBody = string;
export type StackPolicyDuringUpdateURL = string;
export interface UpdateStackInput {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  UsePreviousTemplate?: boolean;
  StackPolicyDuringUpdateBody?: string;
  StackPolicyDuringUpdateURL?: string;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  ResourceTypes?: string[];
  RoleARN?: string;
  RollbackConfiguration?: RollbackConfiguration;
  StackPolicyBody?: string;
  StackPolicyURL?: string;
  NotificationARNs?: string[];
  Tags?: Tag[];
  DisableRollback?: boolean;
  ClientRequestToken?: string;
  RetainExceptOnCreate?: boolean;
  DeploymentConfig?: DeploymentConfig;
  DisableValidation?: boolean;
}
export interface UpdateStackOutput {
  StackId?: string;
  OperationId?: string;
}
export interface UpdateStackInstancesInput {
  StackSetName?: string;
  Accounts?: string[];
  DeploymentTargets?: DeploymentTargets;
  Regions?: string[];
  ParameterOverrides?: Parameter[];
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export interface UpdateStackInstancesOutput {
  OperationId?: string;
}
export interface UpdateStackSetInput {
  StackSetName?: string;
  Description?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  UsePreviousTemplate?: boolean;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  Tags?: Tag[];
  OperationPreferences?: StackSetOperationPreferences;
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  DeploymentTargets?: DeploymentTargets;
  PermissionModel?: PermissionModels;
  AutoDeployment?: AutoDeployment;
  OperationId?: string;
  Accounts?: string[];
  Regions?: string[];
  CallAs?: CallAs;
  ManagedExecution?: ManagedExecution;
}
export interface UpdateStackSetOutput {
  OperationId?: string;
}
export interface UpdateTerminationProtectionInput {
  EnableTerminationProtection?: boolean;
  StackName?: string;
}
export interface UpdateTerminationProtectionOutput {
  StackId?: string;
}
export interface ValidateTemplateInput {
  TemplateBody?: string;
  TemplateURL?: string;
}
export interface TemplateParameter {
  ParameterKey?: string;
  DefaultValue?: string;
  NoEcho?: boolean;
  Description?: string;
}
export type TemplateParameters = TemplateParameter[];
export interface ValidateTemplateOutput {
  Parameters?: TemplateParameter[];
  Description?: string;
  Capabilities?: Capability[];
  CapabilitiesReason?: string;
  DeclaredTransforms?: string[];
}
export type ActivateOrganizationsAccessError =
  | InvalidOperationException
  | OperationNotFoundException
  | CommonErrors;
/**
 * Activate trusted access with Organizations. With trusted access between StackSets
 * and Organizations activated, the management account has permissions to create
 * and manage StackSets for your organization.
 */
export const activateOrganizationsAccess: API.OperationMethod<
  ActivateOrganizationsAccessInput,
  ActivateOrganizationsAccessOutput,
  ActivateOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InvalidOperationException, OperationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateOrganizationsAccess",
})) as any;

export type ActivateTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Activates a public third-party extension, such as a resource or module, to make it
 * available for use in stack templates in your current account and Region. It can also create
 * CloudFormation Hooks, which allow you to evaluate resource configurations before CloudFormation
 * provisions them. Hooks integrate with both CloudFormation and Cloud Control API operations.
 *
 * After you activate an extension, you can use SetTypeConfiguration to set specific properties for the extension.
 *
 * To see which extensions have been activated, use ListTypes. To see
 * configuration details for an extension, use DescribeType.
 *
 * For more information, see Activate a
 * third-party public extension in your account in the
 * *CloudFormation User Guide*. For information about creating Hooks, see the
 * CloudFormation Hooks User Guide.
 */
export const activateType: API.OperationMethod<
  ActivateTypeInput,
  ActivateTypeOutput,
  ActivateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Type: 0,
      PublicTypeArn: 0,
      PublisherId: 0,
      TypeName: 0,
      TypeNameAlias: 0,
      AutoUpdate: 0,
      LoggingConfig: i_LoggingConfig,
      ExecutionRoleArn: 0,
      VersionBump: 0,
      MajorVersion: 0,
    },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateType",
})) as any;

export type BatchDescribeTypeConfigurationsError =
  | CFNRegistryException
  | TypeConfigurationNotFoundException
  | CommonErrors;
/**
 * Returns configuration data for the specified CloudFormation extensions, from the CloudFormation
 * registry in your current account and Region.
 *
 * For more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 */
export const batchDescribeTypeConfigurations: API.OperationMethod<
  BatchDescribeTypeConfigurationsInput,
  BatchDescribeTypeConfigurationsOutput,
  BatchDescribeTypeConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeConfigurationIdentifiers: D.list({
        TypeArn: 0,
        TypeConfigurationAlias: 0,
        TypeConfigurationArn: 0,
        Type: 0,
        TypeName: 0,
      }),
    },
    output: {
      Errors: D.list({ TypeConfigurationIdentifier: {} }),
      UnprocessedTypeConfigurations: D.list({}),
      TypeConfigurations: D.list({
        LastUpdated: D.ts,
        IsDefaultConfiguration: D.bool,
      }),
    },
  },
  errors: [CFNRegistryException, TypeConfigurationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeTypeConfigurations",
})) as any;

export type CancelUpdateStackError = TokenAlreadyExistsException | CommonErrors;
/**
 * Cancels an update on the specified stack. If the call completes successfully, the stack
 * rolls back the update and reverts to the previous stack configuration.
 *
 * You can cancel only stacks that are in the `UPDATE_IN_PROGRESS` state.
 */
export const cancelUpdateStack: API.OperationMethod<
  CancelUpdateStackInput,
  CancelUpdateStackResponse,
  CancelUpdateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackName: 0, ClientRequestToken: 0 } },
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelUpdateStack",
})) as any;

export type ContinueUpdateRollbackError =
  | TokenAlreadyExistsException
  | CommonErrors;
/**
 * Continues rolling back a stack from `UPDATE_ROLLBACK_FAILED` to
 * `UPDATE_ROLLBACK_COMPLETE` state. Depending on the cause of the failure, you can
 * manually fix the error and continue the rollback. By continuing the rollback, you can return
 * your stack to a working state (the `UPDATE_ROLLBACK_COMPLETE` state) and then try
 * to update the stack again.
 *
 * A stack enters the `UPDATE_ROLLBACK_FAILED` state when CloudFormation can't roll
 * back all changes after a failed stack update. For example, this might occur when a stack
 * attempts to roll back to an old database that was deleted outside of CloudFormation. Because
 * CloudFormation doesn't know the instance was deleted, it assumes the instance still exists and
 * attempts to roll back to it, causing the update rollback to fail.
 *
 * For more information, see Continue rolling back an update in the *CloudFormation User Guide*. For
 * information for troubleshooting a failed update rollback, see Update rollback failed.
 */
export const continueUpdateRollback: API.OperationMethod<
  ContinueUpdateRollbackInput,
  ContinueUpdateRollbackOutput,
  ContinueUpdateRollbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      RoleARN: 0,
      ResourcesToSkip: 0,
      ClientRequestToken: 0,
    },
  },
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContinueUpdateRollback",
})) as any;

export type CreateChangeSetError =
  | AlreadyExistsException
  | InsufficientCapabilitiesException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a list of changes that will be applied to a stack so that you can review the
 * changes before executing them. You can create a change set for a stack that doesn't exist or
 * an existing stack. If you create a change set for a stack that doesn't exist, the change set
 * shows all of the resources that CloudFormation will create. If you create a change set for an
 * existing stack, CloudFormation compares the stack's information with the information that you
 * submit in the change set and lists the differences. Use change sets to understand which
 * resources CloudFormation will create or change, and how it will change resources in an existing
 * stack, before you create or update a stack.
 *
 * To create a change set for a stack that doesn't exist, for the `ChangeSetType`
 * parameter, specify `CREATE`. To create a change set for an existing stack, specify
 * `UPDATE` for the `ChangeSetType` parameter. To create a change set for
 * an import operation, specify `IMPORT` for the `ChangeSetType` parameter.
 * After the `CreateChangeSet` call successfully completes, CloudFormation starts creating
 * the change set. To check the status of the change set or to review it, use the DescribeChangeSet action.
 *
 * When you are satisfied with the changes the change set will make, execute the change set
 * by using the ExecuteChangeSet action. CloudFormation doesn't make changes until
 * you execute the change set.
 *
 * To create a change set for the entire stack hierarchy, set
 * `IncludeNestedStacks` to `True`.
 */
export const createChangeSet: API.OperationMethod<
  CreateChangeSetInput,
  CreateChangeSetOutput,
  CreateChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      TemplateBody: 0,
      TemplateURL: 0,
      UsePreviousTemplate: 0,
      Parameters: D.list(i_Parameter),
      Capabilities: 0,
      ResourceTypes: 0,
      RoleARN: 0,
      RollbackConfiguration: i_RollbackConfiguration,
      NotificationARNs: 0,
      Tags: D.list(i_Tag),
      ChangeSetName: 0,
      ClientToken: 0,
      Description: 0,
      ChangeSetType: 0,
      ResourcesToImport: D.list({
        ResourceType: 0,
        LogicalResourceId: 0,
        ResourceIdentifier: D.map(),
      }),
      IncludeNestedStacks: 0,
      OnStackFailure: 0,
      ImportExistingResources: 0,
      DeploymentMode: 0,
      DeploymentConfig: i_DeploymentConfig,
      DisableValidation: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    InsufficientCapabilitiesException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChangeSet",
})) as any;

export type CreateGeneratedTemplateError =
  | AlreadyExistsException
  | ConcurrentResourcesLimitExceededException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a template from existing resources that are not already managed with CloudFormation.
 * You can check the status of the template generation using the
 * `DescribeGeneratedTemplate` API action.
 */
export const createGeneratedTemplate: API.OperationMethod<
  CreateGeneratedTemplateInput,
  CreateGeneratedTemplateOutput,
  CreateGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Resources: D.list(i_ResourceDefinition),
      GeneratedTemplateName: 0,
      StackName: 0,
      TemplateConfiguration: i_TemplateConfiguration,
    },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentResourcesLimitExceededException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGeneratedTemplate",
})) as any;

export type CreateStackError =
  | AlreadyExistsException
  | InsufficientCapabilitiesException
  | LimitExceededException
  | TokenAlreadyExistsException
  | CommonErrors;
/**
 * Creates a stack as specified in the template. After the call completes successfully, the
 * stack creation starts. You can check the status of the stack through the DescribeStacks operation.
 *
 * For more information about creating a stack and monitoring stack progress, see Managing Amazon Web Services
 * resources as a single unit with CloudFormation stacks in the
 * *CloudFormation User Guide*.
 */
export const createStack: API.OperationMethod<
  CreateStackInput,
  CreateStackOutput,
  CreateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      TemplateBody: 0,
      TemplateURL: 0,
      Parameters: D.list(i_Parameter),
      DisableRollback: 0,
      RollbackConfiguration: i_RollbackConfiguration,
      TimeoutInMinutes: 0,
      NotificationARNs: 0,
      Capabilities: 0,
      ResourceTypes: 0,
      RoleARN: 0,
      OnFailure: 0,
      StackPolicyBody: 0,
      StackPolicyURL: 0,
      Tags: D.list(i_Tag),
      ClientRequestToken: 0,
      EnableTerminationProtection: 0,
      RetainExceptOnCreate: 0,
      DeploymentConfig: i_DeploymentConfig,
      DisableValidation: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    InsufficientCapabilitiesException,
    LimitExceededException,
    TokenAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStack",
})) as any;

export type CreateStackInstancesError =
  | InvalidOperationException
  | LimitExceededException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Creates stack instances for the specified accounts, within the specified Amazon Web Services Regions. A
 * stack instance refers to a stack in a specific account and Region. You must specify at least
 * one value for either `Accounts` or `DeploymentTargets`, and you must
 * specify at least one value for `Regions`.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `CreateStackInstances` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const createStackInstances: API.OperationMethod<
  CreateStackInstancesInput,
  CreateStackInstancesOutput,
  CreateStackInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      Accounts: 0,
      DeploymentTargets: i_DeploymentTargets,
      Regions: 0,
      ParameterOverrides: D.list(i_Parameter),
      OperationPreferences: i_StackSetOperationPreferences,
      OperationId: D.m({ idempotency: true }),
      CallAs: 0,
    },
  },
  errors: [
    InvalidOperationException,
    LimitExceededException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStackInstances",
})) as any;

export type CreateStackRefactorError = CommonErrors;
/**
 * Creates a refactor across multiple stacks, with the list of stacks and resources that are
 * affected.
 */
export const createStackRefactor: API.OperationMethod<
  CreateStackRefactorInput,
  CreateStackRefactorOutput,
  CreateStackRefactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      EnableStackCreation: 0,
      ResourceMappings: D.list({
        Source: i_ResourceLocation,
        Destination: i_ResourceLocation,
      }),
      StackDefinitions: D.list({
        StackName: 0,
        TemplateBody: 0,
        TemplateURL: 0,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStackRefactor",
})) as any;

export type CreateStackSetError =
  | CreatedButModifiedException
  | LimitExceededException
  | NameAlreadyExistsException
  | CommonErrors;
/**
 * Creates a StackSet.
 */
export const createStackSet: API.OperationMethod<
  CreateStackSetInput,
  CreateStackSetOutput,
  CreateStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      Description: 0,
      TemplateBody: 0,
      TemplateURL: 0,
      StackId: 0,
      Parameters: D.list(i_Parameter),
      Capabilities: 0,
      Tags: D.list(i_Tag),
      AdministrationRoleARN: 0,
      ExecutionRoleName: 0,
      PermissionModel: 0,
      AutoDeployment: i_AutoDeployment,
      CallAs: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ManagedExecution: i_ManagedExecution,
    },
  },
  errors: [
    CreatedButModifiedException,
    LimitExceededException,
    NameAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStackSet",
})) as any;

export type DeactivateOrganizationsAccessError =
  | InvalidOperationException
  | OperationNotFoundException
  | CommonErrors;
/**
 * Deactivates trusted access with Organizations. If trusted access is deactivated,
 * the management account does not have permissions to create and manage
 * service-managed StackSets for your organization.
 */
export const deactivateOrganizationsAccess: API.OperationMethod<
  DeactivateOrganizationsAccessInput,
  DeactivateOrganizationsAccessOutput,
  DeactivateOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InvalidOperationException, OperationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateOrganizationsAccess",
})) as any;

export type DeactivateTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Deactivates a public third-party extension, such as a resource or module, or a CloudFormation
 * Hook when you no longer use it.
 *
 * Deactivating an extension deletes the configuration details that are associated with it.
 * To temporarily disable a CloudFormation Hook instead, you can use SetTypeConfiguration.
 *
 * Once deactivated, an extension can't be used in any CloudFormation operation. This includes
 * stack update operations where the stack template includes the extension, even if no updates
 * are being made to the extension. In addition, deactivated extensions aren't automatically
 * updated if a new version of the extension is released.
 *
 * To see which extensions are currently activated, use ListTypes.
 */
export const deactivateType: API.OperationMethod<
  DeactivateTypeInput,
  DeactivateTypeOutput,
  DeactivateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TypeName: 0, Type: 0, Arn: 0 } },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateType",
})) as any;

export type DeleteChangeSetError =
  | InvalidChangeSetStatusException
  | CommonErrors;
/**
 * Deletes the specified change set. Deleting change sets ensures that no one executes the
 * wrong change set.
 *
 * If the call successfully completes, CloudFormation successfully deleted the change set.
 *
 * If `IncludeNestedStacks` specifies `True` during the creation of the
 * nested change set, then `DeleteChangeSet` will delete all change sets that belong
 * to the stacks hierarchy and will also delete all change sets for nested stacks with the status
 * of `REVIEW_IN_PROGRESS`.
 */
export const deleteChangeSet: API.OperationMethod<
  DeleteChangeSetInput,
  DeleteChangeSetOutput,
  DeleteChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ChangeSetName: 0, StackName: 0 } },
  errors: [InvalidChangeSetStatusException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChangeSet",
})) as any;

export type DeleteGeneratedTemplateError =
  | ConcurrentResourcesLimitExceededException
  | GeneratedTemplateNotFoundException
  | CommonErrors;
/**
 * Deleted a generated template.
 */
export const deleteGeneratedTemplate: API.OperationMethod<
  DeleteGeneratedTemplateInput,
  DeleteGeneratedTemplateResponse,
  DeleteGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GeneratedTemplateName: 0 } },
  errors: [
    ConcurrentResourcesLimitExceededException,
    GeneratedTemplateNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGeneratedTemplate",
})) as any;

export type DeleteStackError = TokenAlreadyExistsException | CommonErrors;
/**
 * Deletes a specified stack. Once the call completes successfully, stack deletion starts.
 * Deleted stacks don't show up in the DescribeStacks operation if the deletion
 * has been completed successfully.
 *
 * For more information about deleting a stack, see Delete a stack from
 * the CloudFormation console in the *CloudFormation User Guide*.
 */
export const deleteStack: API.OperationMethod<
  DeleteStackInput,
  DeleteStackResponse,
  DeleteStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      RetainResources: 0,
      RoleARN: 0,
      ClientRequestToken: 0,
      DeletionMode: 0,
      DeploymentConfig: i_DeploymentConfig,
    },
  },
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStack",
})) as any;

export type DeleteStackInstancesError =
  | InvalidOperationException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Deletes stack instances for the specified accounts, in the specified Amazon Web Services Regions.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `DeleteStackInstances` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const deleteStackInstances: API.OperationMethod<
  DeleteStackInstancesInput,
  DeleteStackInstancesOutput,
  DeleteStackInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      Accounts: 0,
      DeploymentTargets: i_DeploymentTargets,
      Regions: 0,
      OperationPreferences: i_StackSetOperationPreferences,
      RetainStacks: 0,
      OperationId: D.m({ idempotency: true }),
      CallAs: 0,
    },
  },
  errors: [
    InvalidOperationException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStackInstances",
})) as any;

export type DeleteStackSetError =
  | OperationInProgressException
  | StackSetNotEmptyException
  | CommonErrors;
/**
 * Deletes a StackSet. Before you can delete a StackSet, all its member stack instances must
 * be deleted. For more information about how to complete this, see DeleteStackInstances.
 */
export const deleteStackSet: API.OperationMethod<
  DeleteStackSetInput,
  DeleteStackSetOutput,
  DeleteStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackSetName: 0, CallAs: 0 } },
  errors: [OperationInProgressException, StackSetNotEmptyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStackSet",
})) as any;

export type DeregisterTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Marks an extension or extension version as `DEPRECATED` in the CloudFormation
 * registry, removing it from active use. Deprecated extensions or extension versions cannot be
 * used in CloudFormation operations.
 *
 * To deregister an entire extension, you must individually deregister all active versions of
 * that extension. If an extension has only a single active version, deregistering that version
 * results in the extension itself being deregistered and marked as deprecated in the
 * registry.
 *
 * You can't deregister the default version of an extension if there are other active version
 * of that extension. If you do deregister the default version of an extension, the extension
 * type itself is deregistered as well and marked as deprecated.
 *
 * To view the deprecation status of an extension or extension version, use DescribeType.
 *
 * For more information, see Remove
 * third-party private extensions from your account in the
 * *CloudFormation User Guide*.
 */
export const deregisterType: API.OperationMethod<
  DeregisterTypeInput,
  DeregisterTypeOutput,
  DeregisterTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0, Type: 0, TypeName: 0, VersionId: 0 },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterType",
})) as any;

export type DescribeAccountLimitsError = CommonErrors;
/**
 * Retrieves your account's CloudFormation limits, such as the maximum number of stacks that you
 * can create in your account. For more information about account limits, see Understand CloudFormation quotas in the *CloudFormation User Guide*.
 */
export const describeAccountLimits: API.PaginatedOperationMethod<
  DescribeAccountLimitsInput,
  DescribeAccountLimitsOutput,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient,
  AccountLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { AccountLimits: D.list({ Value: D.num }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLimits",
  } as const,
})) as any;

export type DescribeChangeSetError = ChangeSetNotFoundException | CommonErrors;
/**
 * Returns the inputs for the change set and a list of changes that CloudFormation will make if
 * you execute the change set. For more information, see Update
 * CloudFormation stacks using change sets in the
 * *CloudFormation User Guide*.
 */
export const describeChangeSet: API.PaginatedOperationMethod<
  DescribeChangeSetInput,
  DescribeChangeSetOutput,
  DescribeChangeSetError,
  Credentials | HttpClient.HttpClient,
  Change
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ChangeSetName: 0,
      StackName: 0,
      NextToken: 0,
      IncludePropertyValues: 0,
    },
    output: {
      Parameters: D.list(o_Parameter),
      CreationTime: D.ts,
      NotificationARNs: D.list(),
      RollbackConfiguration: o_RollbackConfiguration,
      Capabilities: D.list(),
      Tags: D.list({}),
      Changes: D.list({
        HookInvocationCount: D.num,
        ResourceChange: {
          Scope: D.list(),
          ResourceDriftIgnoredAttributes: D.list({}),
          Details: D.list({
            Target: { Drift: { DriftDetectionTimestamp: D.ts } },
          }),
          ModuleInfo: {},
        },
      }),
      IncludeNestedStacks: D.bool,
      ImportExistingResources: D.bool,
      DeploymentConfig: o_DeploymentConfig,
    },
  },
  errors: [ChangeSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChangeSet",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Changes",
  } as const,
})) as any;

export type DescribeChangeSetHooksError =
  | ChangeSetNotFoundException
  | CommonErrors;
/**
 * Returns Hook-related information for the change set and a list of changes that
 * CloudFormation makes when you run the change set.
 */
export const describeChangeSetHooks: API.OperationMethod<
  DescribeChangeSetHooksInput,
  DescribeChangeSetHooksOutput,
  DescribeChangeSetHooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ChangeSetName: 0,
      StackName: 0,
      NextToken: 0,
      LogicalResourceId: 0,
    },
    output: { Hooks: D.list({ TargetDetails: { ResourceTargetDetails: {} } }) },
  },
  errors: [ChangeSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChangeSetHooks",
})) as any;

export type DescribeEventsError = CommonErrors;
/**
 * Returns CloudFormation events based on flexible query criteria. Groups events by operation ID,
 * enabling you to focus on individual stack operations during deployment.
 *
 * An operation is any action performed on a stack, including stack lifecycle actions
 * (Create, Update, Delete, Rollback), change set creation, nested stack creation, and automatic
 * rollbacks triggered by failures. Each operation has a unique identifier (Operation ID) and
 * represents a discrete change attempt on the stack.
 *
 * Returns different types of events including:
 *
 * - **Progress events** - Status updates during stack operation
 * execution.
 *
 * - **Validation errors** - Failures from CloudFormation Early
 * Validations.
 *
 * - **Provisioning errors** - Resource creation and update
 * failures.
 *
 * - **Hook invocation errors** - Failures from CloudFormation
 * Hook during stack operations.
 *
 * One of `ChangeSetName`, `OperationId` or `StackName`
 * must be specified as input.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsInput,
  DescribeEventsOutput,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  OperationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      ChangeSetName: 0,
      OperationId: 0,
      Filters: { FailedEvents: 0 },
      NextToken: 0,
    },
    output: {
      OperationEvents: D.list({
        Timestamp: D.ts,
        StartTime: D.ts,
        EndTime: D.ts,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OperationEvents",
  } as const,
})) as any;

export type DescribeGeneratedTemplateError =
  | GeneratedTemplateNotFoundException
  | CommonErrors;
/**
 * Describes a generated template. The output includes details about the progress of the
 * creation of a generated template started by a `CreateGeneratedTemplate` API action
 * or the update of a generated template started with an `UpdateGeneratedTemplate` API
 * action.
 */
export const describeGeneratedTemplate: API.OperationMethod<
  DescribeGeneratedTemplateInput,
  DescribeGeneratedTemplateOutput,
  DescribeGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GeneratedTemplateName: 0 },
    output: {
      Resources: D.list({
        ResourceIdentifier: D.map(),
        Warnings: D.list({ Properties: D.list({ Required: D.bool }) }),
      }),
      CreationTime: D.ts,
      LastUpdatedTime: D.ts,
      Progress: {
        ResourcesSucceeded: D.num,
        ResourcesFailed: D.num,
        ResourcesProcessing: D.num,
        ResourcesPending: D.num,
      },
      TemplateConfiguration: {},
      TotalWarnings: D.num,
    },
  },
  errors: [GeneratedTemplateNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGeneratedTemplate",
})) as any;

export type DescribeOrganizationsAccessError =
  | InvalidOperationException
  | OperationNotFoundException
  | CommonErrors;
/**
 * Retrieves information about the account's `OrganizationAccess` status. This API
 * can be called either by the management account or the delegated administrator by using the
 * `CallAs` parameter. This API can also be called without the `CallAs`
 * parameter by the management account.
 */
export const describeOrganizationsAccess: API.OperationMethod<
  DescribeOrganizationsAccessInput,
  DescribeOrganizationsAccessOutput,
  DescribeOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CallAs: 0 } },
  errors: [InvalidOperationException, OperationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationsAccess",
})) as any;

export type DescribePublisherError = CFNRegistryException | CommonErrors;
/**
 * Returns information about a CloudFormation extension publisher.
 *
 * If you don't supply a `PublisherId`, and you have registered as an extension
 * publisher, `DescribePublisher` returns information about your own publisher
 * account.
 *
 * For more information about registering as a publisher, see:
 *
 * - RegisterPublisher
 *
 * - Publishing extensions
 * to make them available for public use in the
 * *CloudFormation Command Line Interface (CLI) User Guide*
 */
export const describePublisher: API.OperationMethod<
  DescribePublisherInput,
  DescribePublisherOutput,
  DescribePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PublisherId: 0 } },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePublisher",
})) as any;

export type DescribeResourceScanError =
  | ResourceScanNotFoundException
  | CommonErrors;
/**
 * Describes details of a resource scan.
 */
export const describeResourceScan: API.OperationMethod<
  DescribeResourceScanInput,
  DescribeResourceScanOutput,
  DescribeResourceScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceScanId: 0 },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      PercentageCompleted: D.num,
      ResourceTypes: D.list(),
      ResourcesScanned: D.num,
      ResourcesRead: D.num,
      ScanFilters: D.list({ Types: D.list() }),
    },
  },
  errors: [ResourceScanNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceScan",
})) as any;

export type DescribeStackDriftDetectionStatusError = CommonErrors;
/**
 * Returns information about a stack drift detection operation. A stack drift detection
 * operation detects whether a stack's actual configuration differs, or has
 * *drifted*, from its expected configuration, as defined in the stack
 * template and any values specified as template parameters. A stack is considered to have
 * drifted if one or more of its resources have drifted. For more information about stack and
 * resource drift, see Detect unmanaged
 * configuration changes to stacks and resources with drift detection.
 *
 * Use DetectStackDrift to initiate a stack drift detection operation.
 * `DetectStackDrift` returns a `StackDriftDetectionId` you can use to
 * monitor the progress of the operation using `DescribeStackDriftDetectionStatus`.
 * Once the drift detection operation has completed, use DescribeStackResourceDrifts to return drift information about the stack and its
 * resources.
 */
export const describeStackDriftDetectionStatus: API.OperationMethod<
  DescribeStackDriftDetectionStatusInput,
  DescribeStackDriftDetectionStatusOutput,
  DescribeStackDriftDetectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackDriftDetectionId: 0 },
    output: { DriftedStackResourceCount: D.num, Timestamp: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackDriftDetectionStatus",
})) as any;

export type DescribeStackEventsError = CommonErrors;
/**
 * Returns all stack related events for a specified stack in reverse chronological order. For
 * more information about a stack's event history, see Understand CloudFormation stack creation events in the
 * *CloudFormation User Guide*.
 *
 * You can list events for stacks that have failed to create or have been deleted by
 * specifying the unique stack identifier (stack ID).
 */
export const describeStackEvents: API.PaginatedOperationMethod<
  DescribeStackEventsInput,
  DescribeStackEventsOutput,
  DescribeStackEventsError,
  Credentials | HttpClient.HttpClient,
  StackEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, NextToken: 0 },
    output: { StackEvents: D.list({ Timestamp: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackEvents",
  } as const,
})) as any;

export type DescribeStackInstanceError =
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns the stack instance that's associated with the specified StackSet, Amazon Web Services account,
 * and Amazon Web Services Region.
 *
 * For a list of stack instances that are associated with a specific StackSet, use ListStackInstances.
 */
export const describeStackInstance: API.OperationMethod<
  DescribeStackInstanceInput,
  DescribeStackInstanceOutput,
  DescribeStackInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      StackInstanceAccount: 0,
      StackInstanceRegion: 0,
      CallAs: 0,
    },
    output: {
      StackInstance: {
        ParameterOverrides: D.list(o_Parameter),
        StackInstanceStatus: {},
        LastDriftCheckTimestamp: D.ts,
      },
    },
  },
  errors: [StackInstanceNotFoundException, StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackInstance",
})) as any;

export type DescribeStackRefactorError =
  | StackRefactorNotFoundException
  | CommonErrors;
/**
 * Describes the stack refactor status.
 */
export const describeStackRefactor: API.OperationMethod<
  DescribeStackRefactorInput,
  DescribeStackRefactorOutput,
  DescribeStackRefactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackRefactorId: 0 },
    output: { StackIds: D.list() },
  },
  errors: [StackRefactorNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackRefactor",
})) as any;

export type DescribeStackResourceError = CommonErrors;
/**
 * Returns a description of the specified resource in the specified stack.
 *
 * For deleted stacks, DescribeStackResource returns resource information for up to 90 days
 * after the stack has been deleted.
 */
export const describeStackResource: API.OperationMethod<
  DescribeStackResourceInput,
  DescribeStackResourceOutput,
  DescribeStackResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, LogicalResourceId: 0 },
    output: {
      StackResourceDetail: {
        LastUpdatedTimestamp: D.ts,
        DriftInformation: o_StackResourceDriftInformation,
        ModuleInfo: {},
      },
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackResource",
})) as any;

export type DescribeStackResourceDriftsError = CommonErrors;
/**
 * Returns drift information for the resources that have been checked for drift in the
 * specified stack. This includes actual and expected configuration values for resources where
 * CloudFormation detects configuration drift.
 *
 * For a given stack, there will be one `StackResourceDrift` for each stack
 * resource that has been checked for drift. Resources that haven't yet been checked for drift
 * aren't included. Resources that don't currently support drift detection aren't checked, and so
 * not included. For a list of resources that support drift detection, see Resource
 * type support for imports and drift detection.
 *
 * Use DetectStackResourceDrift to detect drift on individual resources, or
 * DetectStackDrift to detect drift on all supported resources for a given
 * stack.
 */
export const describeStackResourceDrifts: API.PaginatedOperationMethod<
  DescribeStackResourceDriftsInput,
  DescribeStackResourceDriftsOutput,
  DescribeStackResourceDriftsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      StackResourceDriftStatusFilters: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { StackResourceDrifts: D.list(o_StackResourceDrift) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackResourceDrifts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStackResourcesError = CommonErrors;
/**
 * Returns Amazon Web Services resource descriptions for running and deleted stacks. If
 * `StackName` is specified, all the associated resources that are part of the stack
 * are returned. If `PhysicalResourceId` is specified, the associated resources of the
 * stack that the resource belongs to are returned.
 *
 * Only the first 100 resources will be returned. If your stack has more resources than
 * this, you should use `ListStackResources` instead.
 *
 * For deleted stacks, `DescribeStackResources` returns resource information for
 * up to 90 days after the stack has been deleted.
 *
 * You must specify either `StackName` or `PhysicalResourceId`, but not
 * both. In addition, you can specify `LogicalResourceId` to filter the returned
 * result. For more information about resources, the `LogicalResourceId` and
 * `PhysicalResourceId`, see the CloudFormation User Guide.
 *
 * A `ValidationError` is returned if you specify both `StackName`
 * and `PhysicalResourceId` in the same request.
 */
export const describeStackResources: API.OperationMethod<
  DescribeStackResourcesInput,
  DescribeStackResourcesOutput,
  DescribeStackResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, LogicalResourceId: 0, PhysicalResourceId: 0 },
    output: {
      StackResources: D.list({
        Timestamp: D.ts,
        DriftInformation: o_StackResourceDriftInformation,
        ModuleInfo: {},
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackResources",
})) as any;

export type DescribeStacksError = StackNotFound | CommonErrors;
/**
 * Returns the description for the specified stack; if no stack name was specified, then it
 * returns the description for all the stacks created. For more information about a stack's event
 * history, see Understand CloudFormation stack creation events in the
 * *CloudFormation User Guide*.
 *
 * If the stack doesn't exist, a `ValidationError` is returned.
 */
export const describeStacks: API.PaginatedOperationMethod<
  DescribeStacksInput,
  DescribeStacksOutput,
  DescribeStacksError,
  Credentials | HttpClient.HttpClient,
  Stack
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, NextToken: 0 },
    output: {
      Stacks: D.list({
        Parameters: D.list(o_Parameter),
        CreationTime: D.ts,
        DeletionTime: D.ts,
        LastUpdatedTime: D.ts,
        RollbackConfiguration: o_RollbackConfiguration,
        DisableRollback: D.bool,
        DeploymentConfig: o_DeploymentConfig,
        NotificationARNs: D.list(),
        TimeoutInMinutes: D.num,
        Capabilities: D.list(),
        Outputs: D.list({}),
        Tags: D.list({}),
        EnableTerminationProtection: D.bool,
        DriftInformation: { LastCheckTimestamp: D.ts },
        RetainExceptOnCreate: D.bool,
        LastOperations: D.list({}),
      }),
    },
  },
  errors: [StackNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Stacks",
  } as const,
})) as any;

export type DescribeStackSetError = StackSetNotFoundException | CommonErrors;
/**
 * Returns the description of the specified StackSet.
 *
 * This API provides *strongly consistent* reads meaning it will always
 * return the most up-to-date data.
 */
export const describeStackSet: API.OperationMethod<
  DescribeStackSetInput,
  DescribeStackSetOutput,
  DescribeStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackSetName: 0, CallAs: 0 },
    output: {
      StackSet: {
        Parameters: D.list(o_Parameter),
        Capabilities: D.list(),
        Tags: D.list({}),
        StackSetDriftDetectionDetails: o_StackSetDriftDetectionDetails,
        AutoDeployment: o_AutoDeployment,
        OrganizationalUnitIds: D.list(),
        ManagedExecution: o_ManagedExecution,
        Regions: D.list(),
      },
    },
  },
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackSet",
})) as any;

export type DescribeStackSetOperationError =
  | OperationNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns the description of the specified StackSet operation.
 *
 * This API provides *strongly consistent* reads meaning it will always
 * return the most up-to-date data.
 */
export const describeStackSetOperation: API.OperationMethod<
  DescribeStackSetOperationInput,
  DescribeStackSetOperationOutput,
  DescribeStackSetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackSetName: 0, OperationId: 0, CallAs: 0 },
    output: {
      StackSetOperation: {
        OperationPreferences: o_StackSetOperationPreferences,
        RetainStacks: D.bool,
        CreationTimestamp: D.ts,
        EndTimestamp: D.ts,
        DeploymentTargets: {
          Accounts: D.list(),
          OrganizationalUnitIds: D.list(),
        },
        StackSetDriftDetectionDetails: o_StackSetDriftDetectionDetails,
        StatusDetails: o_StackSetOperationStatusDetails,
      },
    },
  },
  errors: [OperationNotFoundException, StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackSetOperation",
})) as any;

export type DescribeTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Returns detailed information about an extension from the CloudFormation registry in your
 * current account and Region.
 *
 * If you specify a `VersionId`, `DescribeType` returns information
 * about that specific extension version. Otherwise, it returns information about the default
 * extension version.
 *
 * For more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 */
export const describeType: API.OperationMethod<
  DescribeTypeInput,
  DescribeTypeOutput,
  DescribeTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Type: 0,
      TypeName: 0,
      Arn: 0,
      VersionId: 0,
      PublisherId: 0,
      PublicVersionNumber: 0,
    },
    output: {
      IsDefaultVersion: D.bool,
      LoggingConfig: {},
      RequiredActivatedTypes: D.list({ SupportedMajorVersions: D.list(D.num) }),
      LastUpdated: D.ts,
      TimeCreated: D.ts,
      IsActivated: D.bool,
      AutoUpdate: D.bool,
    },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeType",
})) as any;

export type DescribeTypeRegistrationError = CFNRegistryException | CommonErrors;
/**
 * Returns information about an extension's registration, including its current status and
 * type and version identifiers.
 *
 * When you initiate a registration request using RegisterType, you can
 * then use DescribeTypeRegistration to monitor the progress of that
 * registration request.
 *
 * Once the registration request has completed, use DescribeType to return
 * detailed information about an extension.
 */
export const describeTypeRegistration: API.OperationMethod<
  DescribeTypeRegistrationInput,
  DescribeTypeRegistrationOutput,
  DescribeTypeRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegistrationToken: 0 } },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTypeRegistration",
})) as any;

export type DetectStackDriftError = CommonErrors;
/**
 * Detects whether a stack's actual configuration differs, or has
 * *drifted*, from its expected configuration, as defined in the stack
 * template and any values specified as template parameters. For each resource in the stack that
 * supports drift detection, CloudFormation compares the actual configuration of the resource with
 * its expected template configuration. Only resource properties explicitly defined in the stack
 * template are checked for drift. A stack is considered to have drifted if one or more of its
 * resources differ from their expected template configurations. For more information, see Detect unmanaged configuration changes to stacks and resources with drift
 * detection.
 *
 * Use `DetectStackDrift` to detect drift on all supported resources for a given
 * stack, or DetectStackResourceDrift to detect drift on individual
 * resources.
 *
 * For a list of stack resources that currently support drift detection, see Resource
 * type support for imports and drift detection.
 *
 * `DetectStackDrift` can take up to several minutes, depending on the number of
 * resources contained within the stack. Use DescribeStackDriftDetectionStatus
 * to monitor the progress of a detect stack drift operation. Once the drift detection operation
 * has completed, use DescribeStackResourceDrifts to return drift information
 * about the stack and its resources.
 *
 * When detecting drift on a stack, CloudFormation doesn't detect drift on any nested stacks
 * belonging to that stack. Perform `DetectStackDrift` directly on the nested stack
 * itself.
 */
export const detectStackDrift: API.OperationMethod<
  DetectStackDriftInput,
  DetectStackDriftOutput,
  DetectStackDriftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackName: 0, LogicalResourceIds: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectStackDrift",
})) as any;

export type DetectStackResourceDriftError = CommonErrors;
/**
 * Returns information about whether a resource's actual configuration differs, or has
 * *drifted*, from its expected configuration, as defined in the stack
 * template and any values specified as template parameters. This information includes actual and
 * expected property values for resources in which CloudFormation detects drift. Only resource
 * properties explicitly defined in the stack template are checked for drift. For more
 * information about stack and resource drift, see Detect unmanaged
 * configuration changes to stacks and resources with drift detection.
 *
 * Use `DetectStackResourceDrift` to detect drift on individual resources, or
 * DetectStackDrift to detect drift on all resources in a given stack that
 * support drift detection.
 *
 * Resources that don't currently support drift detection can't be checked. For a list of
 * resources that support drift detection, see Resource
 * type support for imports and drift detection.
 */
export const detectStackResourceDrift: API.OperationMethod<
  DetectStackResourceDriftInput,
  DetectStackResourceDriftOutput,
  DetectStackResourceDriftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, LogicalResourceId: 0 },
    output: { StackResourceDrift: o_StackResourceDrift },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectStackResourceDrift",
})) as any;

export type DetectStackSetDriftError =
  | InvalidOperationException
  | OperationInProgressException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Detect drift on a StackSet. When CloudFormation performs drift detection on a StackSet, it
 * performs drift detection on the stack associated with each stack instance in the StackSet. For
 * more information, see Performing drift detection on
 * CloudFormation StackSets.
 *
 * `DetectStackSetDrift` returns the `OperationId` of the StackSet
 * drift detection operation. Use this operation id with DescribeStackSetOperation to monitor the progress of the drift detection
 * operation. The drift detection operation may take some time, depending on the number of stack
 * instances included in the StackSet, in addition to the number of resources included in each
 * stack.
 *
 * Once the operation has completed, use the following actions to return drift
 * information:
 *
 * - Use DescribeStackSet to return detailed information about the stack
 * set, including detailed information about the last *completed* drift
 * operation performed on the StackSet. (Information about drift operations that are in
 * progress isn't included.)
 *
 * - Use ListStackInstances to return a list of stack instances belonging
 * to the StackSet, including the drift status and last drift time checked of each
 * instance.
 *
 * - Use DescribeStackInstance to return detailed information about a
 * specific stack instance, including its drift status and last drift time checked.
 *
 * You can only run a single drift detection operation on a given StackSet at one
 * time.
 *
 * To stop a drift detection StackSet operation, use StopStackSetOperation.
 */
export const detectStackSetDrift: API.OperationMethod<
  DetectStackSetDriftInput,
  DetectStackSetDriftOutput,
  DetectStackSetDriftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      OperationPreferences: i_StackSetOperationPreferences,
      OperationId: D.m({ idempotency: true }),
      CallAs: 0,
    },
  },
  errors: [
    InvalidOperationException,
    OperationInProgressException,
    StackSetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectStackSetDrift",
})) as any;

export type EstimateTemplateCostError = CommonErrors;
/**
 * Returns the estimated monthly cost of a template. The return value is an Amazon Web Services Simple
 * Monthly Calculator URL with a query string that describes the resources required to run the
 * template.
 */
export const estimateTemplateCost: API.OperationMethod<
  EstimateTemplateCostInput,
  EstimateTemplateCostOutput,
  EstimateTemplateCostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TemplateBody: 0, TemplateURL: 0, Parameters: D.list(i_Parameter) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EstimateTemplateCost",
})) as any;

export type ExecuteChangeSetError =
  | ChangeSetNotFoundException
  | InsufficientCapabilitiesException
  | InvalidChangeSetStatusException
  | TokenAlreadyExistsException
  | CommonErrors;
/**
 * Updates a stack using the input information that was provided when the specified change
 * set was created. After the call successfully completes, CloudFormation starts updating the stack.
 * Use the DescribeStacks action to view the status of the update.
 *
 * When you execute a change set, CloudFormation deletes all other change sets associated with
 * the stack because they aren't valid for the updated stack.
 *
 * If a stack policy is associated with the stack, CloudFormation enforces the policy during the
 * update. You can't specify a temporary stack policy that overrides the current policy.
 *
 * To create a change set for the entire stack hierarchy, `IncludeNestedStacks`
 * must have been set to `True`.
 */
export const executeChangeSet: API.OperationMethod<
  ExecuteChangeSetInput,
  ExecuteChangeSetOutput,
  ExecuteChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ChangeSetName: 0,
      StackName: 0,
      ClientRequestToken: 0,
      DisableRollback: 0,
      RetainExceptOnCreate: 0,
    },
  },
  errors: [
    ChangeSetNotFoundException,
    InsufficientCapabilitiesException,
    InvalidChangeSetStatusException,
    TokenAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteChangeSet",
})) as any;

export type ExecuteStackRefactorError = CommonErrors;
/**
 * Executes the stack refactor operation.
 */
export const executeStackRefactor: API.OperationMethod<
  ExecuteStackRefactorInput,
  ExecuteStackRefactorResponse,
  ExecuteStackRefactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackRefactorId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStackRefactor",
})) as any;

export type GetGeneratedTemplateError =
  | GeneratedTemplateNotFoundException
  | CommonErrors;
/**
 * Retrieves a generated template. If the template is in an `InProgress` or
 * `Pending` status then the template returned will be the template when the
 * template was last in a `Complete` status. If the template has not yet been in a
 * `Complete` status then an empty template will be returned.
 */
export const getGeneratedTemplate: API.OperationMethod<
  GetGeneratedTemplateInput,
  GetGeneratedTemplateOutput,
  GetGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Format: 0, GeneratedTemplateName: 0 } },
  errors: [GeneratedTemplateNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeneratedTemplate",
})) as any;

export type GetHookResultError = HookResultNotFoundException | CommonErrors;
/**
 * Retrieves detailed information and remediation guidance for a Hook invocation
 * result.
 *
 * If the Hook uses a KMS key to encrypt annotations, callers of the
 * `GetHookResult` operation must have `kms:Decrypt` permissions. For
 * more information, see KMS key policy
 * and permissions for encrypting CloudFormation Hooks results at rest in the
 * *CloudFormation Hooks User Guide*.
 */
export const getHookResult: API.OperationMethod<
  GetHookResultInput,
  GetHookResultOutput,
  GetHookResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HookResultId: 0 },
    output: { InvokedAt: D.ts, Target: {}, Annotations: D.list({}) },
  },
  errors: [HookResultNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHookResult",
})) as any;

export type GetStackPolicyError = CommonErrors;
/**
 * Returns the stack policy for a specified stack. If a stack doesn't have a policy, a null
 * value is returned.
 */
export const getStackPolicy: API.OperationMethod<
  GetStackPolicyInput,
  GetStackPolicyOutput,
  GetStackPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStackPolicy",
})) as any;

export type GetTemplateError = ChangeSetNotFoundException | CommonErrors;
/**
 * Returns the template body for a specified stack. You can get the template for running or
 * deleted stacks.
 *
 * For deleted stacks, `GetTemplate` returns the template for up to 90 days after
 * the stack has been deleted.
 *
 * If the template doesn't exist, a `ValidationError` is returned.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateInput,
  GetTemplateOutput,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, ChangeSetName: 0, TemplateStage: 0 },
    output: { StagesAvailable: D.list() },
  },
  errors: [ChangeSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
})) as any;

export type GetTemplateSummaryError = StackSetNotFoundException | CommonErrors;
/**
 * Returns information about a new or existing template. The `GetTemplateSummary`
 * action is useful for viewing parameter information, such as default parameter values and
 * parameter types, before you create or update a stack or StackSet.
 *
 * You can use the `GetTemplateSummary` action when you submit a template, or you
 * can get template information for a StackSet, or a running or deleted stack.
 *
 * For deleted stacks, `GetTemplateSummary` returns the template information for
 * up to 90 days after the stack has been deleted. If the template doesn't exist, a
 * `ValidationError` is returned.
 */
export const getTemplateSummary: API.OperationMethod<
  GetTemplateSummaryInput,
  GetTemplateSummaryOutput,
  GetTemplateSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TemplateBody: 0,
      TemplateURL: 0,
      StackName: 0,
      StackSetName: 0,
      CallAs: 0,
      TemplateSummaryConfig: { TreatUnrecognizedResourceTypesAsWarnings: 0 },
    },
    output: {
      Parameters: D.list({
        NoEcho: D.bool,
        ParameterConstraints: { AllowedValues: D.list() },
      }),
      Capabilities: D.list(),
      ResourceTypes: D.list(),
      DeclaredTransforms: D.list(),
      ResourceIdentifierSummaries: D.list({
        LogicalResourceIds: D.list(),
        ResourceIdentifiers: D.list(),
      }),
      Warnings: { UnrecognizedResourceTypes: D.list() },
    },
  },
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateSummary",
})) as any;

export type ImportStacksToStackSetError =
  | InvalidOperationException
  | LimitExceededException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackNotFoundException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Import existing stacks into a new StackSets. Use the stack import operation to import up
 * to 10 stacks into a new StackSet in the same account as the source stack or in a different
 * administrator account and Region, by specifying the stack ID of the stack you intend to
 * import.
 */
export const importStacksToStackSet: API.OperationMethod<
  ImportStacksToStackSetInput,
  ImportStacksToStackSetOutput,
  ImportStacksToStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      StackIds: 0,
      StackIdsUrl: 0,
      OrganizationalUnitIds: 0,
      OperationPreferences: i_StackSetOperationPreferences,
      OperationId: D.m({ idempotency: true }),
      CallAs: 0,
    },
  },
  errors: [
    InvalidOperationException,
    LimitExceededException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackNotFoundException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportStacksToStackSet",
})) as any;

export type ListChangeSetsError = CommonErrors;
/**
 * Returns the ID and status of each active change set for a stack. For example, CloudFormation
 * lists change sets that are in the `CREATE_IN_PROGRESS` or
 * `CREATE_PENDING` state.
 */
export const listChangeSets: API.PaginatedOperationMethod<
  ListChangeSetsInput,
  ListChangeSetsOutput,
  ListChangeSetsError,
  Credentials | HttpClient.HttpClient,
  ChangeSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, NextToken: 0 },
    output: {
      Summaries: D.list({
        CreationTime: D.ts,
        IncludeNestedStacks: D.bool,
        ImportExistingResources: D.bool,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChangeSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
  } as const,
})) as any;

export type ListExportsError = CommonErrors;
/**
 * Lists all exported output values in the account and Region in which you call this action.
 * Use this action to see the exported output values that you can import into other stacks. To
 * import values, use the Fn::ImportValue function.
 *
 * For more information, see Get exported outputs
 * from a deployed CloudFormation stack.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsInput,
  ListExportsOutput,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  Export
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { Exports: D.list({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Exports",
  } as const,
})) as any;

export type ListGeneratedTemplatesError = CommonErrors;
/**
 * Lists your generated templates in this Region.
 */
export const listGeneratedTemplates: API.PaginatedOperationMethod<
  ListGeneratedTemplatesInput,
  ListGeneratedTemplatesOutput,
  ListGeneratedTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      Summaries: D.list({
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
        NumberOfResources: D.num,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeneratedTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHookResultsError = HookResultNotFoundException | CommonErrors;
/**
 * Returns summaries of invoked Hooks. For more information, see View invocation
 * summaries for CloudFormation Hooks in the *CloudFormation Hooks User Guide*.
 *
 * This operation supports the following parameter combinations:
 *
 * - No parameters: Returns all Hook invocation summaries.
 *
 * - `TypeArn` only: Returns summaries for a specific Hook.
 *
 * - `TypeArn` and `Status`: Returns summaries for a specific Hook
 * filtered by status.
 *
 * - `TargetId` and `TargetType`: Returns summaries for a specific
 * Hook invocation target.
 */
export const listHookResults: API.OperationMethod<
  ListHookResultsInput,
  ListHookResultsOutput,
  ListHookResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetType: 0, TargetId: 0, TypeArn: 0, Status: 0, NextToken: 0 },
    output: { HookResults: D.list({ InvokedAt: D.ts }) },
  },
  errors: [HookResultNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHookResults",
})) as any;

export type ListImportsError = CommonErrors;
/**
 * Lists all stacks that are importing an exported output value. To modify or remove an
 * exported output value, first use this action to see which stacks are using it. To see the
 * exported output values in your account, see ListExports.
 *
 * For more information about importing an exported output value, see the Fn::ImportValue function.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsInput,
  ListImportsOutput,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  StackName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ExportName: 0, NextToken: 0 },
    output: { Imports: D.list() },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Imports",
  } as const,
})) as any;

export type ListResourceScanRelatedResourcesError =
  | ResourceScanInProgressException
  | ResourceScanNotFoundException
  | CommonErrors;
/**
 * Lists the related resources for a list of resources from a resource scan. The response
 * indicates whether each returned resource is already managed by CloudFormation.
 */
export const listResourceScanRelatedResources: API.PaginatedOperationMethod<
  ListResourceScanRelatedResourcesInput,
  ListResourceScanRelatedResourcesOutput,
  ListResourceScanRelatedResourcesError,
  Credentials | HttpClient.HttpClient,
  ScannedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceScanId: 0,
      Resources: D.list({ ResourceType: 0, ResourceIdentifier: D.map() }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { RelatedResources: D.list(o_ScannedResource) },
  },
  errors: [ResourceScanInProgressException, ResourceScanNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceScanRelatedResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RelatedResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceScanResourcesError =
  | ResourceScanInProgressException
  | ResourceScanNotFoundException
  | CommonErrors;
/**
 * Lists the resources from a resource scan. The results can be filtered by resource
 * identifier, resource type prefix, tag key, and tag value. Only resources that match all
 * specified filters are returned. The response indicates whether each returned resource is
 * already managed by CloudFormation.
 */
export const listResourceScanResources: API.PaginatedOperationMethod<
  ListResourceScanResourcesInput,
  ListResourceScanResourcesOutput,
  ListResourceScanResourcesError,
  Credentials | HttpClient.HttpClient,
  ScannedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceScanId: 0,
      ResourceIdentifier: 0,
      ResourceTypePrefix: 0,
      TagKey: 0,
      TagValue: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Resources: D.list(o_ScannedResource) },
  },
  errors: [ResourceScanInProgressException, ResourceScanNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceScanResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceScansError = CommonErrors;
/**
 * List the resource scans from newest to oldest. By default it will return up to 10 resource
 * scans.
 */
export const listResourceScans: API.PaginatedOperationMethod<
  ListResourceScansInput,
  ListResourceScansOutput,
  ListResourceScansError,
  Credentials | HttpClient.HttpClient,
  ResourceScanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, ScanTypeFilter: 0 },
    output: {
      ResourceScanSummaries: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        PercentageCompleted: D.num,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceScans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceScanSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackInstanceResourceDriftsError =
  | OperationNotFoundException
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns drift information for resources in a stack instance.
 *
 * `ListStackInstanceResourceDrifts` returns drift information for the most
 * recent drift detection operation. If an operation is in progress, it may only return partial
 * results.
 */
export const listStackInstanceResourceDrifts: API.OperationMethod<
  ListStackInstanceResourceDriftsInput,
  ListStackInstanceResourceDriftsOutput,
  ListStackInstanceResourceDriftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      NextToken: 0,
      MaxResults: 0,
      StackInstanceResourceDriftStatuses: 0,
      StackInstanceAccount: 0,
      StackInstanceRegion: 0,
      OperationId: 0,
      CallAs: 0,
    },
    output: {
      Summaries: D.list({
        PhysicalResourceIdContext: D.list({}),
        PropertyDifferences: D.list({}),
        Timestamp: D.ts,
      }),
    },
  },
  errors: [
    OperationNotFoundException,
    StackInstanceNotFoundException,
    StackSetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstanceResourceDrifts",
})) as any;

export type ListStackInstancesError = StackSetNotFoundException | CommonErrors;
/**
 * Returns summary information about stack instances that are associated with the specified
 * StackSet. You can filter for stack instances that are associated with a specific Amazon Web Services account
 * name or Region, or that have a specific status.
 */
export const listStackInstances: API.PaginatedOperationMethod<
  ListStackInstancesInput,
  ListStackInstancesOutput,
  ListStackInstancesError,
  Credentials | HttpClient.HttpClient,
  StackInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      NextToken: 0,
      MaxResults: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      StackInstanceAccount: 0,
      StackInstanceRegion: 0,
      CallAs: 0,
    },
    output: {
      Summaries: D.list({
        StackInstanceStatus: {},
        LastDriftCheckTimestamp: D.ts,
      }),
    },
  },
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackRefactorActionsError = CommonErrors;
/**
 * Lists the stack refactor actions that will be taken after calling the ExecuteStackRefactor action.
 */
export const listStackRefactorActions: API.PaginatedOperationMethod<
  ListStackRefactorActionsInput,
  ListStackRefactorActionsOutput,
  ListStackRefactorActionsError,
  Credentials | HttpClient.HttpClient,
  StackRefactorAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StackRefactorId: 0, NextToken: 0, MaxResults: 0 },
    output: {
      StackRefactorActions: D.list({
        TagResources: D.list({}),
        UntagResources: D.list(),
        ResourceMapping: { Source: {}, Destination: {} },
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackRefactorActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackRefactorActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackRefactorsError = CommonErrors;
/**
 * Lists all account stack refactor operations and their statuses.
 */
export const listStackRefactors: API.PaginatedOperationMethod<
  ListStackRefactorsInput,
  ListStackRefactorsOutput,
  ListStackRefactorsError,
  Credentials | HttpClient.HttpClient,
  StackRefactorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ExecutionStatusFilter: 0, NextToken: 0, MaxResults: 0 },
    output: { StackRefactorSummaries: D.list({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackRefactors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackRefactorSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackResourcesError = CommonErrors;
/**
 * Returns descriptions of all resources of the specified stack.
 *
 * For deleted stacks, ListStackResources returns resource information for up to 90 days
 * after the stack has been deleted.
 */
export const listStackResources: API.PaginatedOperationMethod<
  ListStackResourcesInput,
  ListStackResourcesOutput,
  ListStackResourcesError,
  Credentials | HttpClient.HttpClient,
  StackResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, NextToken: 0 },
    output: {
      StackResourceSummaries: D.list({
        LastUpdatedTimestamp: D.ts,
        DriftInformation: { LastCheckTimestamp: D.ts },
        ModuleInfo: {},
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackResourceSummaries",
  } as const,
})) as any;

export type ListStacksError = CommonErrors;
/**
 * Returns the summary information for stacks whose status matches the specified
 * `StackStatusFilter`. Summary information for stacks that have been deleted is
 * kept for 90 days after the stack is deleted. If no `StackStatusFilter` is
 * specified, summary information for all stacks is returned (including existing stacks and
 * stacks that have been deleted).
 */
export const listStacks: API.PaginatedOperationMethod<
  ListStacksInput,
  ListStacksOutput,
  ListStacksError,
  Credentials | HttpClient.HttpClient,
  StackSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, StackStatusFilter: 0 },
    output: {
      StackSummaries: D.list({
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
        DeletionTime: D.ts,
        DriftInformation: { LastCheckTimestamp: D.ts },
        LastOperations: D.list({}),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackSummaries",
  } as const,
})) as any;

export type ListStackSetAutoDeploymentTargetsError =
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns summary information about deployment targets for a StackSet.
 */
export const listStackSetAutoDeploymentTargets: API.OperationMethod<
  ListStackSetAutoDeploymentTargetsInput,
  ListStackSetAutoDeploymentTargetsOutput,
  ListStackSetAutoDeploymentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackSetName: 0, NextToken: 0, MaxResults: 0, CallAs: 0 },
    output: { Summaries: D.list({ Regions: D.list() }) },
  },
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSetAutoDeploymentTargets",
})) as any;

export type ListStackSetOperationResultsError =
  | OperationNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns summary information about the results of a StackSet operation.
 *
 * This API provides *eventually consistent* reads meaning it may take
 * some time but will eventually return the most up-to-date data.
 */
export const listStackSetOperationResults: API.PaginatedOperationMethod<
  ListStackSetOperationResultsInput,
  ListStackSetOperationResultsOutput,
  ListStackSetOperationResultsError,
  Credentials | HttpClient.HttpClient,
  StackSetOperationResultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      OperationId: 0,
      NextToken: 0,
      MaxResults: 0,
      CallAs: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
    },
    output: { Summaries: D.list({ AccountGateResult: {} }) },
  },
  errors: [OperationNotFoundException, StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSetOperationResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackSetOperationsError =
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns summary information about operations performed on a StackSet.
 *
 * This API provides *eventually consistent* reads meaning it may take
 * some time but will eventually return the most up-to-date data.
 */
export const listStackSetOperations: API.PaginatedOperationMethod<
  ListStackSetOperationsInput,
  ListStackSetOperationsOutput,
  ListStackSetOperationsError,
  Credentials | HttpClient.HttpClient,
  StackSetOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StackSetName: 0, NextToken: 0, MaxResults: 0, CallAs: 0 },
    output: {
      Summaries: D.list({
        CreationTimestamp: D.ts,
        EndTimestamp: D.ts,
        StatusDetails: o_StackSetOperationStatusDetails,
        OperationPreferences: o_StackSetOperationPreferences,
      }),
    },
  },
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSetOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackSetsError = CommonErrors;
/**
 * Returns summary information about StackSets that are associated with the user.
 *
 * This API provides *strongly consistent* reads meaning it will always
 * return the most up-to-date data.
 *
 * - [Self-managed permissions] If you set the `CallAs` parameter to
 * `SELF` while signed in to your Amazon Web Services account, `ListStackSets`
 * returns all self-managed StackSets in your Amazon Web Services account.
 *
 * - [Service-managed permissions] If you set the `CallAs` parameter to
 * `SELF` while signed in to the organization's management account,
 * `ListStackSets` returns all StackSets in the management account.
 *
 * - [Service-managed permissions] If you set the `CallAs` parameter to
 * `DELEGATED_ADMIN` while signed in to your member account,
 * `ListStackSets` returns all StackSets with service-managed permissions in the
 * management account.
 */
export const listStackSets: API.PaginatedOperationMethod<
  ListStackSetsInput,
  ListStackSetsOutput,
  ListStackSetsError,
  Credentials | HttpClient.HttpClient,
  StackSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Status: 0, CallAs: 0 },
    output: {
      Summaries: D.list({
        AutoDeployment: o_AutoDeployment,
        LastDriftCheckTimestamp: D.ts,
        ManagedExecution: o_ManagedExecution,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypeRegistrationsError = CFNRegistryException | CommonErrors;
/**
 * Returns a list of registration tokens for the specified extension(s).
 */
export const listTypeRegistrations: API.PaginatedOperationMethod<
  ListTypeRegistrationsInput,
  ListTypeRegistrationsOutput,
  ListTypeRegistrationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Type: 0,
      TypeName: 0,
      TypeArn: 0,
      RegistrationStatusFilter: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { RegistrationTokenList: D.list() },
  },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypeRegistrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypesError = CFNRegistryException | CommonErrors;
/**
 * Returns summary information about all extensions, including your private resource types,
 * modules, and Hooks as well as all public extensions from Amazon Web Services and third-party
 * publishers.
 */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesInput,
  ListTypesOutput,
  ListTypesError,
  Credentials | HttpClient.HttpClient,
  TypeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Visibility: 0,
      ProvisioningType: 0,
      DeprecatedStatus: 0,
      Type: 0,
      Filters: { Category: 0, PublisherId: 0, TypeNamePrefix: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      TypeSummaries: D.list({ LastUpdated: D.ts, IsActivated: D.bool }),
    },
  },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TypeSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypeVersionsError = CFNRegistryException | CommonErrors;
/**
 * Returns summary information about the versions of an extension.
 */
export const listTypeVersions: API.PaginatedOperationMethod<
  ListTypeVersionsInput,
  ListTypeVersionsOutput,
  ListTypeVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Type: 0,
      TypeName: 0,
      Arn: 0,
      MaxResults: 0,
      NextToken: 0,
      DeprecatedStatus: 0,
      PublisherId: 0,
    },
    output: {
      TypeVersionSummaries: D.list({
        IsDefaultVersion: D.bool,
        TimeCreated: D.ts,
      }),
    },
  },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PublishTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Publishes the specified extension to the CloudFormation registry as a public extension in this
 * Region. Public extensions are available for use by all CloudFormation users. For more information
 * about publishing extensions, see Publishing extensions to
 * make them available for public use in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 *
 * To publish an extension, you must be registered as a publisher with CloudFormation. For more
 * information, see RegisterPublisher.
 */
export const publishType: API.OperationMethod<
  PublishTypeInput,
  PublishTypeOutput,
  PublishTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Type: 0, Arn: 0, TypeName: 0, PublicVersionNumber: 0 },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishType",
})) as any;

export type RecordHandlerProgressError =
  | InvalidStateTransitionException
  | OperationStatusCheckFailedException
  | CommonErrors;
/**
 * Reports progress of a resource handler to CloudFormation.
 *
 * Reserved for use by the CloudFormation
 * CLI. Don't use this API in your code.
 */
export const recordHandlerProgress: API.OperationMethod<
  RecordHandlerProgressInput,
  RecordHandlerProgressOutput,
  RecordHandlerProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BearerToken: 0,
      OperationStatus: 0,
      CurrentOperationStatus: 0,
      StatusMessage: 0,
      ErrorCode: 0,
      ResourceModel: 0,
      ClientRequestToken: 0,
    },
  },
  errors: [
    InvalidStateTransitionException,
    OperationStatusCheckFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecordHandlerProgress",
})) as any;

export type RegisterPublisherError = CFNRegistryException | CommonErrors;
/**
 * Registers your account as a publisher of public extensions in the CloudFormation registry.
 * Public extensions are available for use by all CloudFormation users. This publisher ID applies to
 * your account in all Amazon Web Services Regions.
 *
 * For information about requirements for registering as a public extension publisher, see
 * Prerequisite: Registering your account to publish CloudFormation extensions in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 */
export const registerPublisher: API.OperationMethod<
  RegisterPublisherInput,
  RegisterPublisherOutput,
  RegisterPublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcceptTermsAndConditions: 0, ConnectionArn: 0 },
  },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterPublisher",
})) as any;

export type RegisterTypeError = CFNRegistryException | CommonErrors;
/**
 * Registers an extension with the CloudFormation service. Registering an extension makes it
 * available for use in CloudFormation templates in your Amazon Web Services account, and includes:
 *
 * - Validating the extension schema.
 *
 * - Determining which handlers, if any, have been specified for the extension.
 *
 * - Making the extension available for use in your account.
 *
 * For more information about how to develop extensions and ready them for registration, see
 * Creating resource types using the CloudFormation CLI in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 *
 * You can have a maximum of 50 resource extension versions registered at a time. This
 * maximum is per account and per Region. Use DeregisterType
 * to deregister specific extension versions if necessary.
 *
 * Once you have initiated a registration request using RegisterType, you
 * can use DescribeTypeRegistration to monitor the progress of the registration
 * request.
 *
 * Once you have registered a private extension in your account and Region, use SetTypeConfiguration to specify configuration properties for the extension. For
 * more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 */
export const registerType: API.OperationMethod<
  RegisterTypeInput,
  RegisterTypeOutput,
  RegisterTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Type: 0,
      TypeName: 0,
      SchemaHandlerPackage: 0,
      LoggingConfig: i_LoggingConfig,
      ExecutionRoleArn: 0,
      ClientRequestToken: 0,
    },
  },
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterType",
})) as any;

export type RollbackStackError = TokenAlreadyExistsException | CommonErrors;
/**
 * When specifying `RollbackStack`, you preserve the state of previously
 * provisioned resources when an operation fails. You can check the status of the stack through
 * the DescribeStacks operation.
 *
 * Rolls back the specified stack to the last known stable state from
 * `CREATE_FAILED` or `UPDATE_FAILED` stack statuses.
 *
 * This operation will delete a stack if it doesn't contain a last known stable state. A last
 * known stable state includes any status in a `*_COMPLETE`. This includes the
 * following stack statuses.
 *
 * - `CREATE_COMPLETE`
 *
 * - `UPDATE_COMPLETE`
 *
 * - `UPDATE_ROLLBACK_COMPLETE`
 *
 * - `IMPORT_COMPLETE`
 *
 * - `IMPORT_ROLLBACK_COMPLETE`
 */
export const rollbackStack: API.OperationMethod<
  RollbackStackInput,
  RollbackStackOutput,
  RollbackStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      RoleARN: 0,
      ClientRequestToken: 0,
      RetainExceptOnCreate: 0,
      DeploymentConfig: i_DeploymentConfig,
    },
  },
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackStack",
})) as any;

export type SetStackPolicyError = CommonErrors;
/**
 * Sets a stack policy for a specified stack.
 */
export const setStackPolicy: API.OperationMethod<
  SetStackPolicyInput,
  SetStackPolicyResponse,
  SetStackPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, StackPolicyBody: 0, StackPolicyURL: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetStackPolicy",
})) as any;

export type SetTypeConfigurationError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Specifies the configuration data for a CloudFormation extension, such as a resource or Hook,
 * in the given account and Region.
 *
 * For more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 *
 * To view the current configuration data for an extension, refer to the
 * `ConfigurationSchema` element of DescribeType.
 *
 * It's strongly recommended that you use dynamic references to restrict sensitive
 * configuration definitions, such as third-party credentials. For more information, see Specify values stored in other services using dynamic references in the
 * *CloudFormation User Guide*.
 *
 * For more information about setting the configuration data for resource types, see Defining the account-level configuration of an extension in the
 * *CloudFormation Command Line Interface (CLI) User Guide*. For more information about setting the configuration
 * data for Hooks, see the CloudFormation Hooks User Guide.
 */
export const setTypeConfiguration: API.OperationMethod<
  SetTypeConfigurationInput,
  SetTypeConfigurationOutput,
  SetTypeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeArn: 0,
      Configuration: 0,
      ConfigurationAlias: 0,
      TypeName: 0,
      Type: 0,
    },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTypeConfiguration",
})) as any;

export type SetTypeDefaultVersionError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Specify the default version of an extension. The default version of an extension will be
 * used in CloudFormation operations.
 */
export const setTypeDefaultVersion: API.OperationMethod<
  SetTypeDefaultVersionInput,
  SetTypeDefaultVersionOutput,
  SetTypeDefaultVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0, Type: 0, TypeName: 0, VersionId: 0 },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTypeDefaultVersion",
})) as any;

export type SignalResourceError = CommonErrors;
/**
 * Sends a signal to the specified resource with a success or failure status. You can use the
 * `SignalResource` operation in conjunction with a creation policy or update
 * policy. CloudFormation doesn't proceed with a stack creation or update until resources receive the
 * required number of signals or the timeout period is exceeded. The `SignalResource`
 * operation is useful in cases where you want to send signals from anywhere other than an Amazon EC2
 * instance.
 */
export const signalResource: API.OperationMethod<
  SignalResourceInput,
  SignalResourceResponse,
  SignalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, LogicalResourceId: 0, UniqueId: 0, Status: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignalResource",
})) as any;

export type StartResourceScanError =
  | ResourceScanInProgressException
  | ResourceScanLimitExceededException
  | CommonErrors;
/**
 * Starts a scan of the resources in this account in this Region. You can the status of a
 * scan using the `ListResourceScans` API action.
 */
export const startResourceScan: API.OperationMethod<
  StartResourceScanInput,
  StartResourceScanOutput,
  StartResourceScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientRequestToken: 0, ScanFilters: D.list({ Types: 0 }) },
  },
  errors: [ResourceScanInProgressException, ResourceScanLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartResourceScan",
})) as any;

export type StopStackSetOperationError =
  | InvalidOperationException
  | OperationNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Stops an in-progress operation on a StackSet and its associated stack instances. StackSets
 * will cancel all the unstarted stack instance deployments and wait for those are in-progress to
 * complete.
 */
export const stopStackSetOperation: API.OperationMethod<
  StopStackSetOperationInput,
  StopStackSetOperationOutput,
  StopStackSetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackSetName: 0, OperationId: 0, CallAs: 0 },
  },
  errors: [
    InvalidOperationException,
    OperationNotFoundException,
    StackSetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopStackSetOperation",
})) as any;

export type TestTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Tests a registered extension to make sure it meets all necessary requirements for being
 * published in the CloudFormation registry.
 *
 * - For resource types, this includes passing all contracts tests defined for the
 * type.
 *
 * - For modules, this includes determining if the module's model meets all necessary
 * requirements.
 *
 * For more information, see Testing your public extension before publishing in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 *
 * If you don't specify a version, CloudFormation uses the default version of the extension in
 * your account and Region for testing.
 *
 * To perform testing, CloudFormation assumes the execution role specified when the type was
 * registered. For more information, see RegisterType.
 *
 * Once you've initiated testing on an extension using `TestType`, you can pass
 * the returned `TypeVersionArn` into DescribeType to
 * monitor the current test status and test status description for the extension.
 *
 * An extension must have a test status of `PASSED` before it can be published.
 * For more information, see Publishing extensions
 * to make them available for public use in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 */
export const testType: API.OperationMethod<
  TestTypeInput,
  TestTypeOutput,
  TestTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0, Type: 0, TypeName: 0, VersionId: 0, LogDeliveryBucket: 0 },
  },
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestType",
})) as any;

export type UpdateGeneratedTemplateError =
  | AlreadyExistsException
  | GeneratedTemplateNotFoundException
  | LimitExceededException
  | CommonErrors;
/**
 * Updates a generated template. This can be used to change the name, add and remove
 * resources, refresh resources, and change the `DeletionPolicy` and
 * `UpdateReplacePolicy` settings. You can check the status of the update to the
 * generated template using the `DescribeGeneratedTemplate` API action.
 */
export const updateGeneratedTemplate: API.OperationMethod<
  UpdateGeneratedTemplateInput,
  UpdateGeneratedTemplateOutput,
  UpdateGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GeneratedTemplateName: 0,
      NewGeneratedTemplateName: 0,
      AddResources: D.list(i_ResourceDefinition),
      RemoveResources: 0,
      RefreshAllResources: 0,
      TemplateConfiguration: i_TemplateConfiguration,
    },
  },
  errors: [
    AlreadyExistsException,
    GeneratedTemplateNotFoundException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGeneratedTemplate",
})) as any;

export type UpdateStackError =
  | InsufficientCapabilitiesException
  | TokenAlreadyExistsException
  | NoUpdateToPerform
  | CommonErrors;
/**
 * Updates a stack as specified in the template. After the call completes successfully, the
 * stack update starts. You can check the status of the stack through the DescribeStacks action.
 *
 * To get a copy of the template for an existing stack, you can use the GetTemplate action.
 *
 * For more information about updating a stack and monitoring the progress of the update, see
 * Managing
 * Amazon Web Services resources as a single unit with CloudFormation stacks in the
 * *CloudFormation User Guide*.
 */
export const updateStack: API.OperationMethod<
  UpdateStackInput,
  UpdateStackOutput,
  UpdateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      TemplateBody: 0,
      TemplateURL: 0,
      UsePreviousTemplate: 0,
      StackPolicyDuringUpdateBody: 0,
      StackPolicyDuringUpdateURL: 0,
      Parameters: D.list(i_Parameter),
      Capabilities: 0,
      ResourceTypes: 0,
      RoleARN: 0,
      RollbackConfiguration: i_RollbackConfiguration,
      StackPolicyBody: 0,
      StackPolicyURL: 0,
      NotificationARNs: 0,
      Tags: D.list(i_Tag),
      DisableRollback: 0,
      ClientRequestToken: 0,
      RetainExceptOnCreate: 0,
      DeploymentConfig: i_DeploymentConfig,
      DisableValidation: 0,
    },
  },
  errors: [
    InsufficientCapabilitiesException,
    TokenAlreadyExistsException,
    NoUpdateToPerform,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStack",
})) as any;

export type UpdateStackInstancesError =
  | InvalidOperationException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Updates the parameter values for stack instances for the specified accounts, within the
 * specified Amazon Web Services Regions. A stack instance refers to a stack in a specific account and
 * Region.
 *
 * You can only update stack instances in Amazon Web Services Regions and accounts where they already
 * exist; to create additional stack instances, use CreateStackInstances.
 *
 * During StackSet updates, any parameters overridden for a stack instance aren't updated,
 * but retain their overridden value.
 *
 * You can only update the parameter *values* that are specified in the
 * StackSet. To add or delete a parameter itself, use UpdateStackSet
 * to update the StackSet template. If you add a parameter to a template, before you can override
 * the parameter value specified in the StackSet you must first use UpdateStackSet
 * to update all stack instances with the updated template and parameter value specified in the
 * StackSet. Once a stack instance has been updated with the new parameter, you can then override
 * the parameter value using `UpdateStackInstances`.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `UpdateStackInstances` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const updateStackInstances: API.OperationMethod<
  UpdateStackInstancesInput,
  UpdateStackInstancesOutput,
  UpdateStackInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      Accounts: 0,
      DeploymentTargets: i_DeploymentTargets,
      Regions: 0,
      ParameterOverrides: D.list(i_Parameter),
      OperationPreferences: i_StackSetOperationPreferences,
      OperationId: D.m({ idempotency: true }),
      CallAs: 0,
    },
  },
  errors: [
    InvalidOperationException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackInstanceNotFoundException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStackInstances",
})) as any;

export type UpdateStackSetError =
  | InvalidOperationException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Updates the StackSet and associated stack instances in the specified accounts and
 * Amazon Web Services Regions.
 *
 * Even if the StackSet operation created by updating the StackSet fails (completely or
 * partially, below or above a specified failure tolerance), the StackSet is updated with your
 * changes. Subsequent CreateStackInstances calls on the specified StackSet use
 * the updated StackSet.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `UpdateStackSet` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const updateStackSet: API.OperationMethod<
  UpdateStackSetInput,
  UpdateStackSetOutput,
  UpdateStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackSetName: 0,
      Description: 0,
      TemplateBody: 0,
      TemplateURL: 0,
      UsePreviousTemplate: 0,
      Parameters: D.list(i_Parameter),
      Capabilities: 0,
      Tags: D.list(i_Tag),
      OperationPreferences: i_StackSetOperationPreferences,
      AdministrationRoleARN: 0,
      ExecutionRoleName: 0,
      DeploymentTargets: i_DeploymentTargets,
      PermissionModel: 0,
      AutoDeployment: i_AutoDeployment,
      OperationId: D.m({ idempotency: true }),
      Accounts: 0,
      Regions: 0,
      CallAs: 0,
      ManagedExecution: i_ManagedExecution,
    },
  },
  errors: [
    InvalidOperationException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackInstanceNotFoundException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStackSet",
})) as any;

export type UpdateTerminationProtectionError = CommonErrors;
/**
 * Updates termination protection for the specified stack. If a user attempts to delete a
 * stack with termination protection enabled, the operation fails and the stack remains
 * unchanged. For more information, see Protect a CloudFormation
 * stack from being deleted in the *CloudFormation User Guide*.
 *
 * For nested stacks,
 * termination protection is set on the root stack and can't be changed directly on the nested
 * stack.
 */
export const updateTerminationProtection: API.OperationMethod<
  UpdateTerminationProtectionInput,
  UpdateTerminationProtectionOutput,
  UpdateTerminationProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnableTerminationProtection: 0, StackName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTerminationProtection",
})) as any;

export type ValidateTemplateError = CommonErrors;
/**
 * Validates a specified template. CloudFormation first checks if the template is valid JSON. If
 * it isn't, CloudFormation checks if the template is valid YAML. If both these checks fail,
 * CloudFormation returns a template validation error.
 */
export const validateTemplate: API.OperationMethod<
  ValidateTemplateInput,
  ValidateTemplateOutput,
  ValidateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TemplateBody: 0, TemplateURL: 0 },
    output: {
      Parameters: D.list({ NoEcho: D.bool }),
      Capabilities: D.list(),
      DeclaredTransforms: D.list(),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateTemplate",
})) as any;

const i_AutoDeployment: D.LazyStruct = () => ({
  Enabled: 0,
  RetainStacksOnAccountRemoval: 0,
  DependsOn: 0,
});
const i_DeploymentConfig: D.LazyStruct = () => ({
  Mode: 0,
  DisableRollback: 0,
});
const i_DeploymentTargets: D.LazyStruct = () => ({
  Accounts: 0,
  AccountsUrl: 0,
  OrganizationalUnitIds: 0,
  AccountFilterType: 0,
});
const i_LoggingConfig: D.LazyStruct = () => ({
  LogRoleArn: 0,
  LogGroupName: 0,
});
const i_ManagedExecution: D.LazyStruct = () => ({ Active: 0 });
const i_Parameter: D.LazyStruct = () => ({
  ParameterKey: 0,
  ParameterValue: 0,
  UsePreviousValue: 0,
  ResolvedValue: 0,
});
const i_ResourceDefinition: D.LazyStruct = () => ({
  ResourceType: 0,
  LogicalResourceId: 0,
  ResourceIdentifier: D.map(),
});
const i_ResourceLocation: D.LazyStruct = () => ({
  StackName: 0,
  LogicalResourceId: 0,
});
const i_RollbackConfiguration: D.LazyStruct = () => ({
  RollbackTriggers: D.list({ Arn: 0, Type: 0 }),
  MonitoringTimeInMinutes: 0,
});
const i_StackSetOperationPreferences: D.LazyStruct = () => ({
  RegionConcurrencyType: 0,
  RegionOrder: 0,
  FailureToleranceCount: 0,
  FailureTolerancePercentage: 0,
  MaxConcurrentCount: 0,
  MaxConcurrentPercentage: 0,
  ConcurrencyMode: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TemplateConfiguration: D.LazyStruct = () => ({
  DeletionPolicy: 0,
  UpdateReplacePolicy: 0,
});
const o_AutoDeployment: D.LazyStruct = () => ({
  Enabled: D.bool,
  RetainStacksOnAccountRemoval: D.bool,
  DependsOn: D.list(),
});
const o_DeploymentConfig: D.LazyStruct = () => ({ DisableRollback: D.bool });
const o_ManagedExecution: D.LazyStruct = () => ({ Active: D.bool });
const o_Parameter: D.LazyStruct = () => ({ UsePreviousValue: D.bool });
const o_RollbackConfiguration: D.LazyStruct = () => ({
  RollbackTriggers: D.list({}),
  MonitoringTimeInMinutes: D.num,
});
const o_ScannedResource: D.LazyStruct = () => ({
  ResourceIdentifier: D.map(),
  ManagedByStack: D.bool,
});
const o_StackResourceDrift: D.LazyStruct = () => ({
  PhysicalResourceIdContext: D.list({}),
  PropertyDifferences: D.list({}),
  Timestamp: D.ts,
  ModuleInfo: {},
});
const o_StackResourceDriftInformation: D.LazyStruct = () => ({
  LastCheckTimestamp: D.ts,
});
const o_StackSetDriftDetectionDetails: D.LazyStruct = () => ({
  LastDriftCheckTimestamp: D.ts,
  TotalStackInstancesCount: D.num,
  DriftedStackInstancesCount: D.num,
  InSyncStackInstancesCount: D.num,
  InProgressStackInstancesCount: D.num,
  FailedStackInstancesCount: D.num,
});
const o_StackSetOperationPreferences: D.LazyStruct = () => ({
  RegionOrder: D.list(),
  FailureToleranceCount: D.num,
  FailureTolerancePercentage: D.num,
  MaxConcurrentCount: D.num,
  MaxConcurrentPercentage: D.num,
});
const o_StackSetOperationStatusDetails: D.LazyStruct = () => ({
  FailedStackInstancesCount: D.num,
});
