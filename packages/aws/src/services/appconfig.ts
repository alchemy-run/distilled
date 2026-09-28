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
  sdkId: "AppConfig",
  target: "AmazonAppConfig",
  version: "2019-10-09",
  sigv4: "appconfig",
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
                `https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://appconfig.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://appconfig.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: BadRequestReason;
    readonly Details?: BadRequestDetails;
  }> {}
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
export class PayloadTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "PayloadTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{
    readonly message?: string;
    readonly Measure?: BytesMeasure;
    readonly Limit?: number;
    readonly Size?: number;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export type Name = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateApplicationRequest {
  Name: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export type Id = string;
export interface Application {
  Id?: string;
  Name?: string;
  Description?: string;
}
export type LongName = string;
export type Uri = string;
export type RoleArn = string;
export type ValidatorType = "JSON_SCHEMA" | "LAMBDA" | (string & {});
export type StringWithLengthBetween0And32768 =
  | string
  | redacted.Redacted<string>;
export interface Validator {
  Type: ValidatorType;
  Content: string | redacted.Redacted<string>;
}
export type ValidatorList = Validator[];
export type ConfigurationProfileType = string;
export type KmsKeyIdentifier = string;
export interface CreateConfigurationProfileRequest {
  ApplicationId: string;
  Name: string;
  Description?: string;
  LocationUri: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  KmsKeyIdentifier?: string;
}
export type Arn = string;
export interface ConfigurationProfile {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  LocationUri?: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  Type?: string;
  KmsKeyArn?: string;
  KmsKeyIdentifier?: string;
}
export type MinutesBetween0And24Hours = number;
export type GrowthFactor = number;
export type GrowthType = "LINEAR" | "EXPONENTIAL" | (string & {});
export type ReplicateTo = "NONE" | "SSM_DOCUMENT" | (string & {});
export interface CreateDeploymentStrategyRequest {
  Name: string;
  Description?: string;
  DeploymentDurationInMinutes: number;
  FinalBakeTimeInMinutes?: number;
  GrowthFactor: number;
  GrowthType?: GrowthType;
  ReplicateTo?: ReplicateTo;
  Tags?: { [key: string]: string | undefined };
}
export type Percentage = number;
export interface DeploymentStrategy {
  Id?: string;
  Name?: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  ReplicateTo?: ReplicateTo;
}
export type StringWithLengthBetween1And2048 = string;
export interface Monitor {
  AlarmArn: string;
  AlarmRoleArn?: string;
}
export type MonitorList = Monitor[];
export interface CreateEnvironmentRequest {
  ApplicationId: string;
  Name: string;
  Description?: string;
  Monitors?: Monitor[];
  Tags?: { [key: string]: string | undefined };
}
export type EnvironmentState =
  | "READY_FOR_DEPLOYMENT"
  | "DEPLOYING"
  | "ROLLING_BACK"
  | "ROLLED_BACK"
  | "REVERTED"
  | (string & {});
export interface Environment {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  State?: EnvironmentState;
  Monitors?: Monitor[];
}
export type Identifier = string;
export type NameWithReservedAwsPrefix = string;
export type FlagKey = string;
export type Weight = number;
export type AttributeKey = string;
export type AttributeString = string;
export type StringList = string[];
export type NumberList = number[];
export type AttributeValue =
  | {
      StringValue: string;
      NumberValue?: never;
      BooleanValue?: never;
      StringArray?: never;
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue: number;
      BooleanValue?: never;
      StringArray?: never;
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue?: never;
      BooleanValue: boolean;
      StringArray?: never;
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue?: never;
      BooleanValue?: never;
      StringArray: string[];
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue?: never;
      BooleanValue?: never;
      StringArray?: never;
      NumberArray: number[];
    };
export type AttributeValueMap = { [key: string]: AttributeValue | undefined };
export interface FlagValue {
  Enabled: boolean;
  AttributeValues?: { [key: string]: AttributeValue | undefined };
}
export interface TreatmentInput {
  Weight: number;
  Description?: string;
  FlagValue: FlagValue;
}
export type TreatmentInputList = TreatmentInput[];
export type Rule = string;
export interface CreateExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  Name: string;
  ConfigurationProfileIdentifier: string;
  EnvironmentIdentifier: string;
  FlagKey: string;
  Treatments: TreatmentInput[];
  Control: TreatmentInput;
  AudienceRule: string;
  Hypothesis?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ExperimentDefinitionStatus =
  | "ACTIVE"
  | "IDLE"
  | "ARCHIVED"
  | (string & {});
export type TreatmentKey = string;
export interface Treatment {
  Key?: string;
  Weight: number;
  Description?: string;
  FlagValue: FlagValue;
}
export type TreatmentList = Treatment[];
export type Iso8601DateTime = Date;
export interface ExperimentDefinition {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Hypothesis?: string;
  Status?: ExperimentDefinitionStatus;
  ConfigurationProfileId?: string;
  EnvironmentId?: string;
  FlagKey?: string;
  AudienceRule?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
  Treatments?: Treatment[];
  Control?: Treatment;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  KmsKeyIdentifier?: string;
}
export type ExtensionOrParameterName = string;
export type ActionPoint =
  | "PRE_CREATE_HOSTED_CONFIGURATION_VERSION"
  | "PRE_START_DEPLOYMENT"
  | "AT_DEPLOYMENT_TICK"
  | "ON_DEPLOYMENT_START"
  | "ON_DEPLOYMENT_STEP"
  | "ON_DEPLOYMENT_BAKING"
  | "ON_DEPLOYMENT_COMPLETE"
  | "ON_DEPLOYMENT_ROLLED_BACK"
  | (string & {});
export interface Action {
  Name?: string;
  Description?: string;
  Uri?: string;
  RoleArn?: string;
}
export type ActionList = Action[];
export type ActionsMap = { [key in ActionPoint]?: Action[] };
export interface Parameter {
  Description?: string;
  Required?: boolean;
  Dynamic?: boolean;
}
export type ParameterMap = { [key: string]: Parameter | undefined };
export interface CreateExtensionRequest {
  Name: string;
  Description?: string;
  Actions: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
  Tags?: { [key: string]: string | undefined };
  LatestVersionNumber?: number;
}
export interface Extension {
  Id?: string;
  Name?: string;
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
  Actions?: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
}
export type ParameterValueMap = { [key: string]: string | undefined };
export interface CreateExtensionAssociationRequest {
  ExtensionIdentifier: string;
  ExtensionVersionNumber?: number;
  ResourceIdentifier: string;
  Parameters?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface ExtensionAssociation {
  Id?: string;
  ExtensionArn?: string;
  ResourceArn?: string;
  Arn?: string;
  Parameters?: { [key: string]: string | undefined };
  ExtensionVersionNumber?: number;
}
export type StringWithLengthBetween1And255 = string;
export type VersionLabel = string;
export interface CreateHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  Description?: string;
  Content: T.StreamingInputBody;
  ContentType: string;
  LatestVersionNumber?: number;
  VersionLabel?: string;
}
export interface HostedConfigurationVersion {
  ApplicationId?: string;
  ConfigurationProfileId?: string;
  VersionNumber?: number;
  Description?: string;
  Content?: T.StreamingOutputBody;
  ContentType?: string;
  VersionLabel?: string;
  KmsKeyArn?: string;
}
export interface DeleteApplicationRequest {
  ApplicationId: string;
}
export interface DeleteApplicationResponse {}
export type DeletionProtectionCheck =
  | "ACCOUNT_DEFAULT"
  | "APPLY"
  | "BYPASS"
  | (string & {});
export interface DeleteConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  DeletionProtectionCheck?: DeletionProtectionCheck;
}
export interface DeleteConfigurationProfileResponse {}
export type DeploymentStrategyId = string;
export interface DeleteDeploymentStrategyRequest {
  DeploymentStrategyId: string;
}
export interface DeleteDeploymentStrategyResponse {}
export interface DeleteEnvironmentRequest {
  EnvironmentId: string;
  ApplicationId: string;
  DeletionProtectionCheck?: DeletionProtectionCheck;
}
export interface DeleteEnvironmentResponse {}
export type DeleteType = "ARCHIVE" | "DESTROY" | (string & {});
export interface DeleteExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  DeleteType?: DeleteType;
}
export interface DeleteExperimentDefinitionResponse {}
export interface DeleteExtensionRequest {
  ExtensionIdentifier: string;
  VersionNumber?: number;
}
export interface DeleteExtensionResponse {}
export interface DeleteExtensionAssociationRequest {
  ExtensionAssociationId: string;
}
export interface DeleteExtensionAssociationResponse {}
export interface DeleteHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  VersionNumber: number;
}
export interface DeleteHostedConfigurationVersionResponse {}
export interface GetAccountSettingsRequest {}
export type DeletionProtectionDuration = number;
export interface DeletionProtectionSettings {
  Enabled?: boolean;
  ProtectionPeriodInMinutes?: number;
}
export interface VendedMetricsSettings {
  Enabled?: boolean;
}
export interface AccountSettings {
  DeletionProtection?: DeletionProtectionSettings;
  VendedMetrics?: VendedMetricsSettings;
}
export interface GetApplicationRequest {
  ApplicationId: string;
}
export type StringWithLengthBetween1And64 = string;
export type Version = string;
export interface GetConfigurationRequest {
  Application: string;
  Environment: string;
  Configuration: string;
  ClientId: string;
  ClientConfigurationVersion?: string;
}
export interface Configuration {
  Content?: T.StreamingOutputBody;
  ConfigurationVersion?: string;
  ContentType?: string;
}
export interface GetConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
}
export interface GetDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentNumber: number;
}
export type DeploymentState =
  | "BAKING"
  | "VALIDATING"
  | "DEPLOYING"
  | "COMPLETE"
  | "ROLLING_BACK"
  | "ROLLED_BACK"
  | "REVERTED"
  | (string & {});
export type DeploymentEventType =
  | "PERCENTAGE_UPDATED"
  | "ROLLBACK_STARTED"
  | "ROLLBACK_COMPLETED"
  | "BAKE_TIME_STARTED"
  | "DEPLOYMENT_STARTED"
  | "DEPLOYMENT_COMPLETED"
  | "REVERT_COMPLETED"
  | (string & {});
export type TriggeredBy =
  | "USER"
  | "APPCONFIG"
  | "CLOUDWATCH_ALARM"
  | "INTERNAL_ERROR"
  | (string & {});
export interface ActionInvocation {
  ExtensionIdentifier?: string;
  ActionName?: string;
  Uri?: string;
  RoleArn?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
  InvocationId?: string;
}
export type ActionInvocations = ActionInvocation[];
export interface DeploymentEvent {
  EventType?: DeploymentEventType;
  TriggeredBy?: TriggeredBy;
  Description?: string;
  ActionInvocations?: ActionInvocation[];
  OccurredAt?: Date;
}
export type DeploymentEvents = DeploymentEvent[];
export interface AppliedExtension {
  ExtensionId?: string;
  ExtensionAssociationId?: string;
  VersionNumber?: number;
  Parameters?: { [key: string]: string | undefined };
}
export type AppliedExtensions = AppliedExtension[];
export interface Deployment {
  ApplicationId?: string;
  EnvironmentId?: string;
  DeploymentStrategyId?: string;
  ConfigurationProfileId?: string;
  DeploymentNumber?: number;
  ConfigurationName?: string;
  ConfigurationLocationUri?: string;
  ConfigurationVersion?: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  State?: DeploymentState;
  EventLog?: DeploymentEvent[];
  PercentageComplete?: number;
  StartedAt?: Date;
  CompletedAt?: Date;
  AppliedExtensions?: AppliedExtension[];
  KmsKeyArn?: string;
  KmsKeyIdentifier?: string;
  VersionLabel?: string;
}
export interface GetDeploymentStrategyRequest {
  DeploymentStrategyId: string;
}
export interface GetEnvironmentRequest {
  ApplicationId: string;
  EnvironmentId: string;
}
export interface GetExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
}
export type PositiveInteger = number;
export interface GetExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
}
export type ExperimentRunStatus = "RUNNING" | "DONE" | (string & {});
export type NullablePercentage = number;
export type EntityId = string;
export type TreatmentOverrideMap = { [key: string]: string | undefined };
export type TreatmentOverrides = {
  Inline: { [key: string]: string | undefined };
};
export interface ExperimentRunResult {
  ExecutiveSummary?: string;
  ReasonsToLaunch?: string;
  ReasonsNotToLaunch?: string;
}
export interface ExperimentDefinitionSnapshot {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Hypothesis?: string;
  ConfigurationProfileId?: string;
  EnvironmentId?: string;
  FlagKey?: string;
  AudienceRule?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
  Treatments?: Treatment[];
  Control?: Treatment;
}
export interface ExperimentRun {
  ApplicationId?: string;
  ExperimentDefinitionId?: string;
  Run?: number;
  Description?: string;
  Status?: ExperimentRunStatus;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
  Result?: ExperimentRunResult;
  StartedAt?: Date;
  UpdatedAt?: Date;
  EndedAt?: Date;
  ExperimentDefinitionSnapshot?: ExperimentDefinitionSnapshot;
}
export interface GetExtensionRequest {
  ExtensionIdentifier: string;
  VersionNumber?: number;
}
export interface GetExtensionAssociationRequest {
  ExtensionAssociationId: string;
}
export interface GetHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  VersionNumber: number;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type ApplicationList = Application[];
export interface Applications {
  Items?: Application[];
  NextToken?: string;
}
export interface ListConfigurationProfilesRequest {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
  Type?: string;
}
export type ValidatorTypeList = ValidatorType[];
export interface ConfigurationProfileSummary {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  LocationUri?: string;
  ValidatorTypes?: ValidatorType[];
  Type?: string;
}
export type ConfigurationProfileSummaryList = ConfigurationProfileSummary[];
export interface ConfigurationProfiles {
  Items?: ConfigurationProfileSummary[];
  NextToken?: string;
}
export interface ListDeploymentsRequest {
  ApplicationId: string;
  EnvironmentId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type DeploymentType = "USER" | "MANAGED" | (string & {});
export interface DeploymentSummary {
  DeploymentNumber?: number;
  ConfigurationProfileId?: string;
  ConfigurationName?: string;
  ConfigurationVersion?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  State?: DeploymentState;
  PercentageComplete?: number;
  StartedAt?: Date;
  CompletedAt?: Date;
  VersionLabel?: string;
  Type?: DeploymentType;
}
export type DeploymentList = DeploymentSummary[];
export interface Deployments {
  Items?: DeploymentSummary[];
  NextToken?: string;
}
export interface ListDeploymentStrategiesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type DeploymentStrategyList = DeploymentStrategy[];
export interface DeploymentStrategies {
  Items?: DeploymentStrategy[];
  NextToken?: string;
}
export interface ListEnvironmentsRequest {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type EnvironmentList = Environment[];
export interface Environments {
  Items?: Environment[];
  NextToken?: string;
}
export interface ListExperimentDefinitionsRequest {
  ApplicationIdentifier?: string;
  ConfigurationProfileIdentifier?: string;
  EnvironmentIdentifier?: string;
  Status?: ExperimentDefinitionStatus;
  MaxResults?: number;
  NextToken?: string;
}
export interface ExperimentDefinitionSummary {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Hypothesis?: string;
  Status?: ExperimentDefinitionStatus;
  ConfigurationProfileId?: string;
  EnvironmentId?: string;
  FlagKey?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ExperimentDefinitionList = ExperimentDefinitionSummary[];
export interface ExperimentDefinitions {
  Items?: ExperimentDefinitionSummary[];
  NextToken?: string;
}
export interface ListExperimentRunEventsRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
  MaxResults?: number;
  NextToken?: string;
}
export type ExperimentRunEventType =
  | "RUN_STARTED"
  | "EXPOSURE_UPDATED"
  | "OVERRIDES_UPDATED"
  | "RUN_STOPPED"
  | (string & {});
export interface ExperimentRunEvent {
  Description?: string;
  AssociatedDeployment?: string;
  EventType?: ExperimentRunEventType;
  OccurredAt?: Date;
  TriggeredBy?: TriggeredBy;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
}
export type ExperimentRunEventList = ExperimentRunEvent[];
export interface ExperimentRunEvents {
  Items?: ExperimentRunEvent[];
  NextToken?: string;
}
export interface ListExperimentRunsRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  MaxResults?: number;
  NextToken?: string;
  Status?: ExperimentRunStatus;
}
export interface ExperimentRunSummary {
  ExperimentDefinitionId?: string;
  Run?: number;
  Description?: string;
  Status?: ExperimentRunStatus;
  StartedAt?: Date;
  UpdatedAt?: Date;
  EndedAt?: Date;
}
export type ExperimentRunSummaryList = ExperimentRunSummary[];
export interface ExperimentRuns {
  Items?: ExperimentRunSummary[];
  NextToken?: string;
}
export interface ListExtensionAssociationsRequest {
  ResourceIdentifier?: string;
  ExtensionIdentifier?: string;
  ExtensionVersionNumber?: number;
  MaxResults?: number;
  NextToken?: string;
}
export interface ExtensionAssociationSummary {
  Id?: string;
  ExtensionArn?: string;
  ResourceArn?: string;
}
export type ExtensionAssociationSummaries = ExtensionAssociationSummary[];
export interface ExtensionAssociations {
  Items?: ExtensionAssociationSummary[];
  NextToken?: string;
}
export type QueryName = string;
export interface ListExtensionsRequest {
  MaxResults?: number;
  NextToken?: string;
  Name?: string;
}
export interface ExtensionSummary {
  Id?: string;
  Name?: string;
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
}
export type ExtensionSummaries = ExtensionSummary[];
export interface Extensions {
  Items?: ExtensionSummary[];
  NextToken?: string;
}
export interface ListHostedConfigurationVersionsRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  MaxResults?: number;
  NextToken?: string;
  VersionLabel?: string;
}
export interface HostedConfigurationVersionSummary {
  ApplicationId?: string;
  ConfigurationProfileId?: string;
  VersionNumber?: number;
  Description?: string;
  ContentType?: string;
  VersionLabel?: string;
  KmsKeyArn?: string;
}
export type HostedConfigurationVersionSummaryList =
  HostedConfigurationVersionSummary[];
export interface HostedConfigurationVersions {
  Items?: HostedConfigurationVersionSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ResourceTags {
  Tags?: { [key: string]: string | undefined };
}
export type DynamicParameterKey = string;
export type DynamicParameterMap = { [key: string]: string | undefined };
export interface StartDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentStrategyId: string;
  ConfigurationProfileId: string;
  ConfigurationVersion: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  KmsKeyIdentifier?: string;
  DynamicExtensionParameters?: { [key: string]: string | undefined };
  LatestDeploymentNumber?: number;
}
export interface DeploymentParameters {
  DynamicExtensionParameters?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface StartExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Description?: string;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
  Tags?: { [key: string]: string | undefined };
  DeploymentParameters?: DeploymentParameters;
}
export interface StopDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentNumber: number;
  AllowRevert?: boolean;
}
export interface StopExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
  Result?: ExperimentRunResult;
  DeploymentParameters?: DeploymentParameters;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccountSettingsRequest {
  DeletionProtection?: DeletionProtectionSettings;
  VendedMetrics?: VendedMetricsSettings;
}
export interface UpdateApplicationRequest {
  ApplicationId: string;
  Name?: string;
  Description?: string;
}
export type KmsKeyIdentifierOrEmpty = string;
export interface UpdateConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  Name?: string;
  Description?: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  KmsKeyIdentifier?: string;
}
export interface UpdateDeploymentStrategyRequest {
  DeploymentStrategyId: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  FinalBakeTimeInMinutes?: number;
  GrowthFactor?: number;
  GrowthType?: GrowthType;
}
export interface UpdateEnvironmentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  Name?: string;
  Description?: string;
  Monitors?: Monitor[];
}
export interface UpdateExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Treatments?: TreatmentInput[];
  Control?: TreatmentInput;
  Hypothesis?: string;
  AudienceRule?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
}
export interface UpdateExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
  Description?: string;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
  DeploymentParameters?: DeploymentParameters;
}
export interface UpdateExtensionRequest {
  ExtensionIdentifier: string;
  Description?: string;
  Actions?: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
  VersionNumber?: number;
}
export interface UpdateExtensionAssociationRequest {
  ExtensionAssociationId: string;
  Parameters?: { [key: string]: string | undefined };
}
export interface ValidateConfigurationRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  ConfigurationVersion: string;
}
export interface ValidateConfigurationResponse {}
export type BadRequestReason = "InvalidConfiguration" | (string & {});
export interface InvalidConfigurationDetail {
  Constraint?: string;
  Location?: string;
  Reason?: string;
  Type?: string;
  Value?: string;
}
export type InvalidConfigurationDetailList = InvalidConfigurationDetail[];
export type BadRequestDetails = {
  InvalidConfiguration: InvalidConfigurationDetail[];
};
export type BytesMeasure = "KILOBYTES" | (string & {});
export type CreateApplicationError =
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an application. In AppConfig, an application is simply an
 * organizational construct like a folder. This organizational construct has a relationship
 * with some unit of executable code. For example, you could create an application called
 * MyMobileApp to organize and manage configuration data for a mobile application installed by
 * your users.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  Application,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: { Name: 0, Description: 0, Tags: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateConfigurationProfileError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a configuration profile, which is information that enables AppConfig
 * to access the configuration source. Valid configuration sources include the
 * following:
 *
 * - Configuration data in YAML, JSON, and other formats stored in the AppConfig hosted configuration store
 *
 * - Configuration data stored as objects in an Amazon Simple Storage Service (Amazon S3)
 * bucket
 *
 * - Pipelines stored in CodePipeline
 *
 * - Secrets stored in Secrets Manager
 *
 * - Standard and secure string parameters stored in Amazon Web Services Systems Manager Parameter Store
 *
 * - Configuration data in SSM documents stored in the Systems Manager document store
 *
 * A configuration profile includes the following information:
 *
 * - The URI location of the configuration data.
 *
 * - The Identity and Access Management (IAM) role that provides access to the configuration data.
 *
 * - A validator for the configuration data. Available validators include either a JSON
 * Schema or an Amazon Web Services Lambda function.
 *
 * For more information, see Create a
 * Configuration and a Configuration Profile in the AppConfig
 * User Guide.
 */
export const createConfigurationProfile: API.OperationMethod<
  CreateConfigurationProfileRequest,
  ConfigurationProfile,
  CreateConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/configurationprofiles",
    input: {
      ApplicationId: 0,
      Name: 0,
      Description: 0,
      LocationUri: 0,
      RetrievalRoleArn: 0,
      Validators: D.list(i_Validator),
      Tags: 0,
      Type: 0,
      KmsKeyIdentifier: 0,
    },
    output: { Validators: D.list(o_Validator) },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationProfile",
})) as any;

export type CreateDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a deployment strategy that defines important criteria for rolling out your
 * configuration to the designated targets. A deployment strategy includes the overall
 * duration required, a percentage of targets to receive the deployment during each interval,
 * an algorithm that defines how percentage grows, and bake time.
 */
export const createDeploymentStrategy: API.OperationMethod<
  CreateDeploymentStrategyRequest,
  DeploymentStrategy,
  CreateDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /deploymentstrategies",
    input: {
      Name: 0,
      Description: 0,
      DeploymentDurationInMinutes: 0,
      FinalBakeTimeInMinutes: 0,
      GrowthFactor: 0,
      GrowthType: 0,
      ReplicateTo: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentStrategy",
})) as any;

export type CreateEnvironmentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an environment. For each application, you define one or more environments. An
 * environment is a deployment group of AppConfig targets, such as applications in a
 * `Beta` or `Production` environment. You can also define
 * environments for application subcomponents such as the `Web`,
 * `Mobile` and `Back-end` components for your application. You can
 * configure Amazon CloudWatch alarms for each environment. The system monitors alarms during a
 * configuration deployment. If an alarm is triggered, the system rolls back the
 * configuration.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  Environment,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/environments",
    input: {
      ApplicationId: 0,
      Name: 0,
      Description: 0,
      Monitors: D.list(i_Monitor),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
})) as any;

export type CreateExperimentDefinitionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an experiment definition in AppConfig. An experiment definition describes the purpose, scope, and operational configuration of an experiment, including the target audience, feature flag, and treatment configurations.
 */
export const createExperimentDefinition: API.OperationMethod<
  CreateExperimentDefinitionRequest,
  ExperimentDefinition,
  CreateExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationIdentifier}/experimentdefinitions",
    input: {
      ApplicationIdentifier: 0,
      Name: 0,
      ConfigurationProfileIdentifier: 0,
      EnvironmentIdentifier: 0,
      FlagKey: 0,
      Treatments: D.list(i_TreatmentInput),
      Control: i_TreatmentInput,
      AudienceRule: 0,
      Hypothesis: 0,
      AudienceDescription: 0,
      LaunchCriteria: 0,
      Tags: 0,
    },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExperimentDefinition",
})) as any;

export type CreateExtensionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an AppConfig extension. An extension augments your ability to inject
 * logic or behavior at different points during the AppConfig workflow of creating
 * or deploying a configuration.
 *
 * You can create your own extensions or use the Amazon Web Services authored extensions provided by
 * AppConfig. For an AppConfig extension that uses Lambda, you must create a Lambda function to perform any computation and processing
 * defined in the extension. If you plan to create custom versions of the Amazon Web Services
 * authored notification extensions, you only need to specify an Amazon Resource Name (ARN) in
 * the `Uri` field for the new extension version.
 *
 * - For a custom EventBridge notification extension, enter the ARN of the EventBridge
 * default events in the `Uri` field.
 *
 * - For a custom Amazon SNS notification extension, enter the ARN of an Amazon SNS
 * topic in the `Uri` field.
 *
 * - For a custom Amazon SQS notification extension, enter the ARN of an Amazon SQS
 * message queue in the `Uri` field.
 *
 * For more information about extensions, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const createExtension: API.OperationMethod<
  CreateExtensionRequest,
  Extension,
  CreateExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /extensions",
    input: {
      Name: 0,
      Description: 0,
      Actions: D.map(D.list(i_Action)),
      Parameters: D.map(i_Parameter),
      Tags: 0,
      LatestVersionNumber: D.m({ header: "Latest-Version-Number" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtension",
})) as any;

export type CreateExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * When you create an extension or configure an Amazon Web Services authored extension, you
 * associate the extension with an AppConfig application, environment, or
 * configuration profile. For example, you can choose to run the AppConfig
 * deployment events to Amazon SNS
 * Amazon Web Services authored extension and receive notifications on an Amazon SNS
 * topic anytime a configuration deployment is started for a specific application. Defining
 * which extension to associate with an AppConfig resource is called an
 * *extension association*. An extension association is a specified
 * relationship between an extension and an AppConfig resource, such as an
 * application or a configuration profile. For more information about extensions and
 * associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const createExtensionAssociation: API.OperationMethod<
  CreateExtensionAssociationRequest,
  ExtensionAssociation,
  CreateExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /extensionassociations",
    input: {
      ExtensionIdentifier: 0,
      ExtensionVersionNumber: 0,
      ResourceIdentifier: 0,
      Parameters: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtensionAssociation",
})) as any;

export type CreateHostedConfigurationVersionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | PayloadTooLargeException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new configuration in the AppConfig hosted configuration store. If
 * you're creating a feature flag, we recommend you familiarize yourself with the JSON schema
 * for feature flag data. For more information, see Type reference for AWS.AppConfig.FeatureFlags in the
 * *AppConfig User Guide*.
 */
export const createHostedConfigurationVersion: API.OperationMethod<
  CreateHostedConfigurationVersionRequest,
  HostedConfigurationVersion,
  CreateHostedConfigurationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
    input: {
      ApplicationId: 0,
      ConfigurationProfileId: 0,
      Description: D.m({ header: "Description" }),
      Content: D.m({ payload: true, shape: D.stream }),
      ContentType: D.m({ header: "Content-Type" }),
      LatestVersionNumber: D.m({ header: "Latest-Version-Number" }),
      VersionLabel: D.m({ header: "VersionLabel" }),
    },
    output: {
      ApplicationId: D.m({ header: "Application-Id" }),
      ConfigurationProfileId: D.m({ header: "Configuration-Profile-Id" }),
      VersionNumber: D.m({ header: "Version-Number", shape: D.num }),
      Description: D.m({ header: "Description" }),
      Content: D.m({ payload: true, shape: D.stream }),
      ContentType: D.m({ header: "Content-Type" }),
      VersionLabel: D.m({ header: "VersionLabel" }),
      KmsKeyArn: D.m({ header: "KmsKeyArn" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    PayloadTooLargeException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHostedConfigurationVersion",
})) as any;

export type DeleteApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationId}",
    input: { ApplicationId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteConfigurationProfileError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a configuration profile.
 *
 * To prevent users from unintentionally deleting actively-used configuration profiles,
 * enable deletion
 * protection.
 */
export const deleteConfigurationProfile: API.OperationMethod<
  DeleteConfigurationProfileRequest,
  DeleteConfigurationProfileResponse,
  DeleteConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
    input: {
      ApplicationId: 0,
      ConfigurationProfileId: 0,
      DeletionProtectionCheck: D.m({
        header: "x-amzn-deletion-protection-check",
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationProfile",
})) as any;

export type DeleteDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a deployment strategy.
 */
export const deleteDeploymentStrategy: API.OperationMethod<
  DeleteDeploymentStrategyRequest,
  DeleteDeploymentStrategyResponse,
  DeleteDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /deployementstrategies/{DeploymentStrategyId}",
    input: { DeploymentStrategyId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentStrategy",
})) as any;

export type DeleteEnvironmentError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an environment.
 *
 * To prevent users from unintentionally deleting actively-used environments, enable deletion
 * protection.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationId}/environments/{EnvironmentId}",
    input: {
      EnvironmentId: 0,
      ApplicationId: 0,
      DeletionProtectionCheck: D.m({
        header: "x-amzn-deletion-protection-check",
      }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
})) as any;

export type DeleteExperimentDefinitionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an experiment definition. You can archive the definition to hide it from the active list while preserving it for future reference, or permanently delete it along with all associated run history.
 */
export const deleteExperimentDefinition: API.OperationMethod<
  DeleteExperimentDefinitionRequest,
  DeleteExperimentDefinitionResponse,
  DeleteExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      DeleteType: D.m({ query: "delete_type" }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExperimentDefinition",
})) as any;

export type DeleteExtensionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an AppConfig extension. You must delete all associations to an
 * extension before you delete the extension.
 */
export const deleteExtension: API.OperationMethod<
  DeleteExtensionRequest,
  DeleteExtensionResponse,
  DeleteExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /extensions/{ExtensionIdentifier}",
    input: { ExtensionIdentifier: 0, VersionNumber: D.m({ query: "version" }) },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtension",
})) as any;

export type DeleteExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an extension association. This action doesn't delete extensions defined in the
 * association.
 */
export const deleteExtensionAssociation: API.OperationMethod<
  DeleteExtensionAssociationRequest,
  DeleteExtensionAssociationResponse,
  DeleteExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /extensionassociations/{ExtensionAssociationId}",
    input: { ExtensionAssociationId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtensionAssociation",
})) as any;

export type DeleteHostedConfigurationVersionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a version of a configuration from the AppConfig hosted configuration
 * store.
 */
export const deleteHostedConfigurationVersion: API.OperationMethod<
  DeleteHostedConfigurationVersionRequest,
  DeleteHostedConfigurationVersionResponse,
  DeleteHostedConfigurationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
    input: { ApplicationId: 0, ConfigurationProfileId: 0, VersionNumber: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHostedConfigurationVersion",
})) as any;

export type GetAccountSettingsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Returns information about the status of the `DeletionProtection`
 * parameter.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  AccountSettings,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /settings" },
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
})) as any;

export type GetApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  Application,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}",
    input: { ApplicationId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

export type GetConfigurationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * (Deprecated) Retrieves the latest deployed configuration.
 *
 * Note the following important information.
 *
 * - This API action is deprecated. Calls to receive configuration data should use
 * the StartConfigurationSession and GetLatestConfiguration APIs instead.
 *
 * - GetConfiguration is a priced call. For more information, see
 * Pricing.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  Configuration,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{Application}/environments/{Environment}/configurations/{Configuration}",
    input: {
      Application: 0,
      Environment: 0,
      Configuration: 0,
      ClientId: D.m({ query: "client_id" }),
      ClientConfigurationVersion: D.m({
        query: "client_configuration_version",
      }),
    },
    output: {
      Content: D.m({ payload: true, shape: D.stream }),
      ConfigurationVersion: D.m({ header: "Configuration-Version" }),
      ContentType: D.m({ header: "Content-Type" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
})) as any;

export type GetConfigurationProfileError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a configuration profile.
 */
export const getConfigurationProfile: API.OperationMethod<
  GetConfigurationProfileRequest,
  ConfigurationProfile,
  GetConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
    input: { ApplicationId: 0, ConfigurationProfileId: 0 },
    output: { Validators: D.list(o_Validator) },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationProfile",
})) as any;

export type GetDeploymentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a configuration deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  Deployment,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
    input: { ApplicationId: 0, EnvironmentId: 0, DeploymentNumber: 0 },
    output: {
      EventLog: D.list(o_DeploymentEvent),
      StartedAt: D.ts,
      CompletedAt: D.ts,
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
})) as any;

export type GetDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a deployment strategy. A deployment strategy defines
 * important criteria for rolling out your configuration to the designated targets. A
 * deployment strategy includes the overall duration required, a percentage of targets to
 * receive the deployment during each interval, an algorithm that defines how percentage
 * grows, and bake time.
 */
export const getDeploymentStrategy: API.OperationMethod<
  GetDeploymentStrategyRequest,
  DeploymentStrategy,
  GetDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /deploymentstrategies/{DeploymentStrategyId}",
    input: { DeploymentStrategyId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentStrategy",
})) as any;

export type GetEnvironmentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an environment. An environment is a deployment group of
 * AppConfig applications, such as applications in a `Production`
 * environment or in an `EU_Region` environment. Each configuration deployment
 * targets an environment. You can enable one or more Amazon CloudWatch alarms for an environment. If
 * an alarm is triggered during a deployment, AppConfig roles back the
 * configuration.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  Environment,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/environments/{EnvironmentId}",
    input: { ApplicationId: 0, EnvironmentId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
})) as any;

export type GetExperimentDefinitionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an experiment definition.
 */
export const getExperimentDefinition: API.OperationMethod<
  GetExperimentDefinitionRequest,
  ExperimentDefinition,
  GetExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
    input: { ApplicationIdentifier: 0, ExperimentDefinitionIdentifier: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentDefinition",
})) as any;

export type GetExperimentRunError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an experiment run, including its status, start time, and exposure settings.
 */
export const getExperimentRun: API.OperationMethod<
  GetExperimentRunRequest,
  ExperimentRun,
  GetExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      Run: 0,
    },
    output: { StartedAt: D.ts, UpdatedAt: D.ts, EndedAt: D.ts },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentRun",
})) as any;

export type GetExtensionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about an AppConfig extension.
 */
export const getExtension: API.OperationMethod<
  GetExtensionRequest,
  Extension,
  GetExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /extensions/{ExtensionIdentifier}",
    input: {
      ExtensionIdentifier: 0,
      VersionNumber: D.m({ query: "version_number" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExtension",
})) as any;

export type GetExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about an AppConfig extension association. For more
 * information about extensions and associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const getExtensionAssociation: API.OperationMethod<
  GetExtensionAssociationRequest,
  ExtensionAssociation,
  GetExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /extensionassociations/{ExtensionAssociationId}",
    input: { ExtensionAssociationId: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExtensionAssociation",
})) as any;

export type GetHostedConfigurationVersionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a specific configuration version.
 */
export const getHostedConfigurationVersion: API.OperationMethod<
  GetHostedConfigurationVersionRequest,
  HostedConfigurationVersion,
  GetHostedConfigurationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
    input: { ApplicationId: 0, ConfigurationProfileId: 0, VersionNumber: 0 },
    output: {
      ApplicationId: D.m({ header: "Application-Id" }),
      ConfigurationProfileId: D.m({ header: "Configuration-Profile-Id" }),
      VersionNumber: D.m({ header: "Version-Number", shape: D.num }),
      Description: D.m({ header: "Description" }),
      Content: D.m({ payload: true, shape: D.stream }),
      ContentType: D.m({ header: "Content-Type" }),
      VersionLabel: D.m({ header: "VersionLabel" }),
      KmsKeyArn: D.m({ header: "KmsKeyArn" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedConfigurationVersion",
})) as any;

export type ListApplicationsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists all applications in your Amazon Web Services account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  Applications,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
  },
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationProfilesError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the configuration profiles for an application.
 */
export const listConfigurationProfiles: API.PaginatedOperationMethod<
  ListConfigurationProfilesRequest,
  ConfigurationProfiles,
  ListConfigurationProfilesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/configurationprofiles",
    input: {
      ApplicationId: 0,
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
      Type: D.m({ query: "type" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the deployments for an environment in descending deployment number order.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  Deployments,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
    input: {
      ApplicationId: 0,
      EnvironmentId: 0,
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
    output: { Items: D.list({ StartedAt: D.ts, CompletedAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeploymentStrategiesError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists deployment strategies.
 */
export const listDeploymentStrategies: API.PaginatedOperationMethod<
  ListDeploymentStrategiesRequest,
  DeploymentStrategies,
  ListDeploymentStrategiesError,
  Credentials | HttpClient.HttpClient,
  DeploymentStrategy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /deploymentstrategies",
    input: {
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
  },
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentStrategies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the environments for an application.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  Environments,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  Environment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/environments",
    input: {
      ApplicationId: 0,
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentDefinitionsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the experiment definitions for an account. You can filter results by application, configuration profile, environment, or status.
 */
export const listExperimentDefinitions: API.PaginatedOperationMethod<
  ListExperimentDefinitionsRequest,
  ExperimentDefinitions,
  ListExperimentDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ExperimentDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /experimentdefinitions",
    input: {
      ApplicationIdentifier: D.m({ query: "application_identifier" }),
      ConfigurationProfileIdentifier: D.m({
        query: "configuration_profile_identifier",
      }),
      EnvironmentIdentifier: D.m({ query: "environment_identifier" }),
      Status: D.m({ query: "status" }),
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentRunEventsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the events for a specified experiment run. Events provide a timeline of actions and state changes that occurred during the run.
 */
export const listExperimentRunEvents: API.PaginatedOperationMethod<
  ListExperimentRunEventsRequest,
  ExperimentRunEvents,
  ListExperimentRunEventsError,
  Credentials | HttpClient.HttpClient,
  ExperimentRunEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/events",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      Run: 0,
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
    output: { Items: D.list({ OccurredAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentRunEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentRunsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the experiment runs for a specified experiment definition. You can filter by status.
 */
export const listExperimentRuns: API.PaginatedOperationMethod<
  ListExperimentRunsRequest,
  ExperimentRuns,
  ListExperimentRunsError,
  Credentials | HttpClient.HttpClient,
  ExperimentRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
      Status: D.m({ query: "status" }),
    },
    output: {
      Items: D.list({ StartedAt: D.ts, UpdatedAt: D.ts, EndedAt: D.ts }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExtensionAssociationsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists all AppConfig extension associations in the account. For more
 * information about extensions and associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const listExtensionAssociations: API.PaginatedOperationMethod<
  ListExtensionAssociationsRequest,
  ExtensionAssociations,
  ListExtensionAssociationsError,
  Credentials | HttpClient.HttpClient,
  ExtensionAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /extensionassociations",
    input: {
      ResourceIdentifier: D.m({ query: "resource_identifier" }),
      ExtensionIdentifier: D.m({ query: "extension_identifier" }),
      ExtensionVersionNumber: D.m({ query: "extension_version_number" }),
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
    },
  },
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtensionAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExtensionsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists all custom and Amazon Web Services authored AppConfig extensions in the
 * account. For more information about extensions, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const listExtensions: API.PaginatedOperationMethod<
  ListExtensionsRequest,
  Extensions,
  ListExtensionsError,
  Credentials | HttpClient.HttpClient,
  ExtensionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /extensions",
    input: {
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
      Name: D.m({ query: "name" }),
    },
  },
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtensions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHostedConfigurationVersionsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists configurations stored in the AppConfig hosted configuration store by
 * version.
 */
export const listHostedConfigurationVersions: API.PaginatedOperationMethod<
  ListHostedConfigurationVersionsRequest,
  HostedConfigurationVersions,
  ListHostedConfigurationVersionsError,
  Credentials | HttpClient.HttpClient,
  HostedConfigurationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
    input: {
      ApplicationId: 0,
      ConfigurationProfileId: 0,
      MaxResults: D.m({ query: "max_results" }),
      NextToken: D.m({ query: "next_token" }),
      VersionLabel: D.m({ query: "version_label" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedConfigurationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of key-value tags assigned to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ResourceTags,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartDeploymentError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a deployment.
 *
 * AppConfig Agent supports deploying feature flag or free-form configuration data to specific segments or individual users during a gradual rollout. Entity-based gradual deployments ensure that once a user or segment receives a configuration version, they continue to receive that same version throughout the deployment period, regardless of which compute resource serves their requests. For more information, see Using AppConfig Agent for user-based or entity-based gradual deployments
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  Deployment,
  StartDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
    input: {
      ApplicationId: 0,
      EnvironmentId: 0,
      DeploymentStrategyId: 0,
      ConfigurationProfileId: 0,
      ConfigurationVersion: 0,
      Description: 0,
      Tags: 0,
      KmsKeyIdentifier: 0,
      DynamicExtensionParameters: 0,
      LatestDeploymentNumber: 0,
    },
    output: {
      EventLog: D.list(o_DeploymentEvent),
      StartedAt: D.ts,
      CompletedAt: D.ts,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
})) as any;

export type StartExperimentRunError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts an experiment run for the specified experiment definition. An experiment run delivers treatments to the target audience and collects metrics. You can start multiple experiment runs from the same experiment definition.
 *
 * Billing for this experiment begins when you call this operation and continues until the experiment is stopped. For pricing details, see AppConfig pricing.
 */
export const startExperimentRun: API.OperationMethod<
  StartExperimentRunRequest,
  ExperimentRun,
  StartExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      Description: 0,
      ExposurePercentage: 0,
      TreatmentOverrides: i_TreatmentOverrides,
      Tags: 0,
      DeploymentParameters: i_DeploymentParameters,
    },
    output: { StartedAt: D.ts, UpdatedAt: D.ts, EndedAt: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExperimentRun",
})) as any;

export type StopDeploymentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a deployment. This API action works only on deployments that have a status of
 * `DEPLOYING`, unless an `AllowRevert` parameter is supplied. If the
 * `AllowRevert` parameter is supplied, the status of an in-progress deployment
 * will be `ROLLED_BACK`. The status of a completed deployment will be
 * `REVERTED`. AppConfig only allows a revert within 72 hours of
 * deployment completion.
 */
export const stopDeployment: API.OperationMethod<
  StopDeploymentRequest,
  Deployment,
  StopDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
    input: {
      ApplicationId: 0,
      EnvironmentId: 0,
      DeploymentNumber: 0,
      AllowRevert: D.m({ header: "Allow-Revert" }),
    },
    output: {
      EventLog: D.list(o_DeploymentEvent),
      StartedAt: D.ts,
      CompletedAt: D.ts,
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeployment",
})) as any;

export type StopExperimentRunError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a running experiment. Stopping an experiment run ends audience exposure and returns users to the currently deployed feature flag configuration.
 */
export const stopExperimentRun: API.OperationMethod<
  StopExperimentRunRequest,
  ExperimentRun,
  StopExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/stop",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      Run: 0,
      Result: {
        ExecutiveSummary: 0,
        ReasonsToLaunch: 0,
        ReasonsNotToLaunch: 0,
      },
      DeploymentParameters: i_DeploymentParameters,
    },
    output: { StartedAt: D.ts, UpdatedAt: D.ts, EndedAt: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopExperimentRun",
})) as any;

export type TagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns metadata to an AppConfig resource. Tags help organize and categorize
 * your AppConfig resources. Each tag consists of a key and an optional value, both
 * of which you define. You can specify a maximum of 50 tags for a resource.
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
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a tag key and value from an AppConfig resource.
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
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountSettingsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Updates the value of the `DeletionProtection` parameter.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  AccountSettings,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /settings",
    input: {
      DeletionProtection: { Enabled: 0, ProtectionPeriodInMinutes: 0 },
      VendedMetrics: { Enabled: 0 },
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
})) as any;

export type UpdateApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  Application,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationId}",
    input: { ApplicationId: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateConfigurationProfileError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a configuration profile.
 */
export const updateConfigurationProfile: API.OperationMethod<
  UpdateConfigurationProfileRequest,
  ConfigurationProfile,
  UpdateConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
    input: {
      ApplicationId: 0,
      ConfigurationProfileId: 0,
      Name: 0,
      Description: 0,
      RetrievalRoleArn: 0,
      Validators: D.list(i_Validator),
      KmsKeyIdentifier: 0,
    },
    output: { Validators: D.list(o_Validator) },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationProfile",
})) as any;

export type UpdateDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a deployment strategy.
 */
export const updateDeploymentStrategy: API.OperationMethod<
  UpdateDeploymentStrategyRequest,
  DeploymentStrategy,
  UpdateDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /deploymentstrategies/{DeploymentStrategyId}",
    input: {
      DeploymentStrategyId: 0,
      Description: 0,
      DeploymentDurationInMinutes: 0,
      FinalBakeTimeInMinutes: 0,
      GrowthFactor: 0,
      GrowthType: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeploymentStrategy",
})) as any;

export type UpdateEnvironmentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  Environment,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationId}/environments/{EnvironmentId}",
    input: {
      ApplicationId: 0,
      EnvironmentId: 0,
      Name: 0,
      Description: 0,
      Monitors: D.list(i_Monitor),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
})) as any;

export type UpdateExperimentDefinitionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an experiment definition. You can update treatments, the control, audience rules, and other properties. You cannot update an experiment definition while an experiment run is active.
 */
export const updateExperimentDefinition: API.OperationMethod<
  UpdateExperimentDefinitionRequest,
  ExperimentDefinition,
  UpdateExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      Treatments: D.list(i_TreatmentInput),
      Control: i_TreatmentInput,
      Hypothesis: 0,
      AudienceRule: 0,
      AudienceDescription: 0,
      LaunchCriteria: 0,
    },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentDefinition",
})) as any;

export type UpdateExperimentRunError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a running experiment. Use this operation to increase audience exposure, modify treatment assignment overrides, or update the description of an active experiment run. Audience exposure can only be increased, not decreased.
 */
export const updateExperimentRun: API.OperationMethod<
  UpdateExperimentRunRequest,
  ExperimentRun,
  UpdateExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/update",
    input: {
      ApplicationIdentifier: 0,
      ExperimentDefinitionIdentifier: 0,
      Run: 0,
      Description: 0,
      ExposurePercentage: 0,
      TreatmentOverrides: i_TreatmentOverrides,
      DeploymentParameters: i_DeploymentParameters,
    },
    output: { StartedAt: D.ts, UpdatedAt: D.ts, EndedAt: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentRun",
})) as any;

export type UpdateExtensionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an AppConfig extension. For more information about extensions, see
 * Extending
 * workflows in the *AppConfig User Guide*.
 */
export const updateExtension: API.OperationMethod<
  UpdateExtensionRequest,
  Extension,
  UpdateExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /extensions/{ExtensionIdentifier}",
    input: {
      ExtensionIdentifier: 0,
      Description: 0,
      Actions: D.map(D.list(i_Action)),
      Parameters: D.map(i_Parameter),
      VersionNumber: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtension",
})) as any;

export type UpdateExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an association. For more information about extensions and associations, see
 * Extending
 * workflows in the *AppConfig User Guide*.
 */
export const updateExtensionAssociation: API.OperationMethod<
  UpdateExtensionAssociationRequest,
  ExtensionAssociation,
  UpdateExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /extensionassociations/{ExtensionAssociationId}",
    input: { ExtensionAssociationId: 0, Parameters: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtensionAssociation",
})) as any;

export type ValidateConfigurationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Uses the validators in a configuration profile to validate a configuration.
 */
export const validateConfiguration: API.OperationMethod<
  ValidateConfigurationRequest,
  ValidateConfigurationResponse,
  ValidateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/validators",
    input: {
      ApplicationId: 0,
      ConfigurationProfileId: 0,
      ConfigurationVersion: D.m({ query: "configuration_version" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateConfiguration",
})) as any;

const i_Action: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  Uri: 0,
  RoleArn: 0,
});
const i_DeploymentParameters: D.LazyStruct = () => ({
  DynamicExtensionParameters: 0,
  Tags: 0,
});
const i_Monitor: D.LazyStruct = () => ({ AlarmArn: 0, AlarmRoleArn: 0 });
const i_Parameter: D.LazyStruct = () => ({
  Description: 0,
  Required: 0,
  Dynamic: 0,
});
const i_TreatmentInput: D.LazyStruct = () => ({
  Weight: 0,
  Description: 0,
  FlagValue: {
    Enabled: 0,
    AttributeValues: D.map({
      StringValue: 0,
      NumberValue: 0,
      BooleanValue: 0,
      StringArray: 0,
      NumberArray: 0,
    }),
  },
});
const i_TreatmentOverrides: D.LazyStruct = () => ({ Inline: 0 });
const i_Validator: D.LazyStruct = () => ({ Type: 0, Content: 0 });
const o_DeploymentEvent: D.LazyStruct = () => ({ OccurredAt: D.ts });
const o_Validator: D.LazyStruct = () => ({ Content: D.secret });
