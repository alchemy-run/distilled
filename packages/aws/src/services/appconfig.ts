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
  sdkId: "AppConfig",
  serviceShapeName: "AmazonAppConfig",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "appconfig" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-10-09");
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
            return e(`https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://appconfig.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://appconfig.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "BadRequestReason" }),
      ),
      Details: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2, __c0, 2)).annotate({
          identifier: "BadRequestDetails",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export class PayloadTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PayloadTooLargeException>()(
    "PayloadTooLargeException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Measure: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "BytesMeasure" }),
      ),
      Limit: /*@__PURE__*/ S.optional(S.Number),
      Size: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
export type StringWithLengthBetween0And32768 = string | redacted.Redacted<string>;
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
export type ExperimentDefinitionStatus = "ACTIVE" | "IDLE" | "ARCHIVED" | (string & {});
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
export type DeletionProtectionCheck = "ACCOUNT_DEFAULT" | "APPLY" | "BYPASS" | (string & {});
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
export type TreatmentOverrides = { Inline: { [key: string]: string | undefined } };
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
export type HostedConfigurationVersionSummaryList = HostedConfigurationVersionSummary[];
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
export type BadRequestDetails = { InvalidConfiguration: InvalidConfigurationDetail[] };
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
  input: __S(512, __c64, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(520, __c65, 0) as any as S.Schema<Application>,
  errors: [BadRequestException, InternalServerException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<CreateConfigurationProfileRequest>,
  output: __S(562, __c70, 2) as any as S.Schema<ConfigurationProfile>,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationProfile",
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<CreateDeploymentStrategyRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeploymentStrategy>,
  errors: [BadRequestException, InternalServerException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentStrategy",
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<CreateEnvironmentRequest>,
  output: __S(594, __c74, 2) as any as S.Schema<Environment>,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<CreateExperimentDefinitionRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<ExperimentDefinition>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<CreateExtensionRequest>,
  output: __S(61, __c7, 5) as any as S.Schema<Extension>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtension",
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<CreateExtensionAssociationRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<ExtensionAssociation>,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtensionAssociation",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<CreateHostedConfigurationVersionRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<HostedConfigurationVersion>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<DeleteConfigurationProfileRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteConfigurationProfileResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationProfile",
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<DeleteDeploymentStrategyRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteDeploymentStrategyResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentStrategy",
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DeleteEnvironmentRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteEnvironmentResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<DeleteExperimentDefinitionRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteExperimentDefinitionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExperimentDefinition",
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<DeleteExtensionRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteExtensionResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtension",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<DeleteExtensionAssociationRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteExtensionAssociationResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtensionAssociation",
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DeleteHostedConfigurationVersionRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DeleteHostedConfigurationVersionResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHostedConfigurationVersion",
}));

export type GetAccountSettingsError = BadRequestException | InternalServerException | CommonErrors;
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
  input: __S(168, __c21, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<AccountSettings>,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(520, __c65, 0) as any as S.Schema<Application>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<GetConfigurationRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<Configuration>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<GetConfigurationProfileRequest>,
  output: __S(562, __c70, 2) as any as S.Schema<ConfigurationProfile>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationProfile",
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<GetDeploymentRequest>,
  output: __S(222, __c27, 6) as any as S.Schema<Deployment>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<GetDeploymentStrategyRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeploymentStrategy>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentStrategy",
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<GetEnvironmentRequest>,
  output: __S(594, __c74, 2) as any as S.Schema<Environment>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<GetExperimentDefinitionRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<ExperimentDefinition>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentDefinition",
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<GetExperimentRunRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<ExperimentRun>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentRun",
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<GetExtensionRequest>,
  output: __S(61, __c7, 5) as any as S.Schema<Extension>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExtension",
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<GetExtensionAssociationRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<ExtensionAssociation>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExtensionAssociation",
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<GetHostedConfigurationVersionRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<HostedConfigurationVersion>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedConfigurationVersion",
}));

export type ListApplicationsError = BadRequestException | InternalServerException | CommonErrors;
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
  input: __S(296, __c37, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(298, __c37, 2) as any as S.Schema<Applications>,
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
  input: __S(304, __c38, 0) as any as S.Schema<ListConfigurationProfilesRequest>,
  output: __S(308, __c38, 4) as any as S.Schema<ConfigurationProfiles>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(312, __c39, 0) as any as S.Schema<ListDeploymentsRequest>,
  output: __S(315, __c39, 3) as any as S.Schema<Deployments>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(320, __c40, 0) as any as S.Schema<ListDeploymentStrategiesRequest>,
  output: __S(322, __c40, 2) as any as S.Schema<DeploymentStrategies>,
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
  input: __S(328, __c41, 0) as any as S.Schema<ListEnvironmentsRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<Environments>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(336, __c42, 0) as any as S.Schema<ListExperimentDefinitionsRequest>,
  output: __S(339, __c42, 3) as any as S.Schema<ExperimentDefinitions>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(344, __c43, 0) as any as S.Schema<ListExperimentRunEventsRequest>,
  output: __S(347, __c43, 3) as any as S.Schema<ExperimentRunEvents>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(352, __c44, 0) as any as S.Schema<ListExperimentRunsRequest>,
  output: __S(355, __c44, 3) as any as S.Schema<ExperimentRuns>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(360, __c45, 0) as any as S.Schema<ListExtensionAssociationsRequest>,
  output: __S(363, __c45, 3) as any as S.Schema<ExtensionAssociations>,
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

export type ListExtensionsError = BadRequestException | InternalServerException | CommonErrors;
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
  input: __S(368, __c46, 0) as any as S.Schema<ListExtensionsRequest>,
  output: __S(371, __c46, 3) as any as S.Schema<Extensions>,
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
  input: __S(376, __c47, 0) as any as S.Schema<ListHostedConfigurationVersionsRequest>,
  output: __S(379, __c47, 3) as any as S.Schema<HostedConfigurationVersions>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
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
  input: __S(384, __c48, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<ResourceTags>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<StartDeploymentRequest>,
  output: __S(222, __c27, 6) as any as S.Schema<Deployment>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<StartExperimentRunRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<ExperimentRun>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExperimentRun",
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<StopDeploymentRequest>,
  output: __S(222, __c27, 6) as any as S.Schema<Deployment>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeployment",
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<StopExperimentRunRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<ExperimentRun>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopExperimentRun",
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<UpdateAccountSettingsRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<AccountSettings>,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(520, __c65, 0) as any as S.Schema<Application>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<UpdateConfigurationProfileRequest>,
  output: __S(562, __c70, 2) as any as S.Schema<ConfigurationProfile>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationProfile",
}));

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
  input: __S(472, __c59, 0) as any as S.Schema<UpdateDeploymentStrategyRequest>,
  output: __S(576, __c72, 0) as any as S.Schema<DeploymentStrategy>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeploymentStrategy",
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<UpdateEnvironmentRequest>,
  output: __S(594, __c74, 2) as any as S.Schema<Environment>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
}));

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
  input: __S(488, __c61, 0) as any as S.Schema<UpdateExperimentDefinitionRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<ExperimentDefinition>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentDefinition",
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<UpdateExperimentRunRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<ExperimentRun>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentRun",
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<UpdateExtensionRequest>,
  output: __S(61, __c7, 5) as any as S.Schema<Extension>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtension",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<UpdateExtensionAssociationRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<ExtensionAssociation>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtensionAssociation",
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<ValidateConfigurationRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<ValidateConfigurationResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Constraint: S.optional(S.String),
          Location: S.optional(S.String),
          Reason: S.optional(S.String),
          Type: S.optional(S.String),
          Value: S.optional(S.String),
        }),
      ).annotate({ identifier: "InvalidConfigurationDetail" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ InvalidConfiguration: __S(1, __c0, 1) })]);
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          Name: S.String,
          ConfigurationProfileIdentifier: S.String,
          EnvironmentIdentifier: S.String,
          FlagKey: S.String,
          Treatments: __S(41, __c5, 1),
          Control: __S(40, __c5, 0),
          AudienceRule: S.String,
          Hypothesis: S.optional(S.String),
          AudienceDescription: S.optional(S.String),
          LaunchCriteria: S.optional(S.String),
          Tags: S.optional(__S(528, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateExperimentDefinitionRequest" });
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
      return S.Array(S.Number);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StringValue: S.String }),
        /*@__PURE__*/ S.Struct({ NumberValue: S.Number }),
        /*@__PURE__*/ S.Struct({ BooleanValue: S.Boolean }),
        /*@__PURE__*/ S.Struct({ StringArray: __S(16, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ NumberArray: __S(24, __c3, 0) }),
      ]);
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(25, __c3, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, AttributeValues: S.optional(__S(26, __c3, 2)) }),
      ).annotate({ identifier: "FlagValue" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Weight: S.Number,
          Description: S.optional(S.String),
          FlagValue: __S(27, __c3, 3),
        }),
      ).annotate({ identifier: "Treatment" });
    case 5:
      return S.Array(__S(28, __c3, 4));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Hypothesis: S.optional(S.String),
          Status: S.optional(S.String),
          ConfigurationProfileId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          FlagKey: S.optional(S.String),
          AudienceRule: S.optional(S.String),
          AudienceDescription: S.optional(S.String),
          LaunchCriteria: S.optional(S.String),
          Treatments: S.optional(__S(29, __c3, 5)),
          Control: S.optional(__S(28, __c3, 4)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          KmsKeyIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExperimentDefinition" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Weight: S.Number,
          Description: S.optional(S.String),
          FlagValue: __S(27, __c3, 3),
        }),
      ).annotate({ identifier: "TreatmentInput" });
    case 1:
      return S.Array(__S(40, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Actions: __S(58, __c7, 2),
          Parameters: S.optional(__S(60, __c7, 4)),
          Tags: S.optional(__S(528, __c66, 0)),
          LatestVersionNumber: S.optional(S.Number).pipe(T.HttpHeader("Latest-Version-Number")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/extensions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateExtensionRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Uri: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Action" });
    case 1:
      return S.Array(__S(56, __c7, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(57, __c7, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Required: S.optional(S.Boolean),
          Dynamic: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Parameter" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(59, __c7, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
          Actions: S.optional(__S(58, __c7, 2)),
          Parameters: S.optional(__S(60, __c7, 4)),
        }),
      ).annotate({ identifier: "Extension" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionIdentifier: S.String,
          ExtensionVersionNumber: S.optional(S.Number),
          ResourceIdentifier: S.String,
          Parameters: S.optional(__S(528, __c66, 0)),
          Tags: S.optional(__S(528, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/extensionassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateExtensionAssociationRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ExtensionArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Arn: S.optional(S.String),
          Parameters: S.optional(__S(528, __c66, 0)),
          ExtensionVersionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExtensionAssociation" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          Description: S.optional(S.String).pipe(T.HttpHeader("Description")),
          Content: T.StreamingInput.pipe(T.HttpPayload()),
          ContentType: S.String.pipe(T.HttpHeader("Content-Type")),
          LatestVersionNumber: S.optional(S.Number).pipe(T.HttpHeader("Latest-Version-Number")),
          VersionLabel: S.optional(S.String).pipe(T.HttpHeader("VersionLabel")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateHostedConfigurationVersionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String).pipe(T.HttpHeader("Application-Id")),
          ConfigurationProfileId: S.optional(S.String).pipe(
            T.HttpHeader("Configuration-Profile-Id"),
          ),
          VersionNumber: S.optional(S.Number).pipe(T.HttpHeader("Version-Number")),
          Description: S.optional(S.String).pipe(T.HttpHeader("Description")),
          Content: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          VersionLabel: S.optional(S.String).pipe(T.HttpHeader("VersionLabel")),
          KmsKeyArn: S.optional(S.String).pipe(T.HttpHeader("KmsKeyArn")),
        }),
      ).annotate({ identifier: "HostedConfigurationVersion" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{ApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteApplicationResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          DeletionProtectionCheck: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-deletion-protection-check"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationProfileRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/deployementstrategies/{DeploymentStrategyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeploymentStrategyRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          DeletionProtectionCheck: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-deletion-protection-check"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          DeleteType: S.optional(S.String).pipe(T.HttpQuery("delete_type")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteExperimentDefinitionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
          VersionNumber: S.optional(S.Number).pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/extensions/{ExtensionIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteExtensionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionAssociationId: S.String.pipe(T.HttpLabel("ExtensionAssociationId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/extensionassociations/{ExtensionAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteExtensionAssociationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteHostedConfigurationVersionRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/settings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          ProtectionPeriodInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeletionProtectionSettings" });
    case 1:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "VendedMetricsSettings",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeletionProtection: S.optional(__S(176, __c22, 0)),
          VendedMetrics: S.optional(__S(177, __c22, 1)),
        }),
      ).annotate({ identifier: "AccountSettings" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Application: S.String.pipe(T.HttpLabel("Application")),
          Environment: S.String.pipe(T.HttpLabel("Environment")),
          Configuration: S.String.pipe(T.HttpLabel("Configuration")),
          ClientId: S.String.pipe(T.HttpQuery("client_id")),
          ClientConfigurationVersion: S.optional(S.String).pipe(
            T.HttpQuery("client_configuration_version"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{Application}/environments/{Environment}/configurations/{Configuration}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Content: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ConfigurationVersion: S.optional(S.String).pipe(T.HttpHeader("Configuration-Version")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
        }),
      ).annotate({ identifier: "Configuration" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationProfileRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
          DeploymentNumber: S.Number.pipe(T.HttpLabel("DeploymentNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionIdentifier: S.optional(S.String),
          ActionName: S.optional(S.String),
          Uri: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          InvocationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionInvocation" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EventType: S.optional(S.String),
          TriggeredBy: S.optional(S.String),
          Description: S.optional(S.String),
          ActionInvocations: S.optional(__S(217, __c27, 1)),
          OccurredAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DeploymentEvent" });
    case 3:
      return S.Array(__S(218, __c27, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ExtensionId: S.optional(S.String),
          ExtensionAssociationId: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Parameters: S.optional(__S(528, __c66, 0)),
        }),
      ).annotate({ identifier: "AppliedExtension" });
    case 5:
      return S.Array(__S(220, __c27, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          DeploymentStrategyId: S.optional(S.String),
          ConfigurationProfileId: S.optional(S.String),
          DeploymentNumber: S.optional(S.Number),
          ConfigurationName: S.optional(S.String),
          ConfigurationLocationUri: S.optional(S.String),
          ConfigurationVersion: S.optional(S.String),
          Description: S.optional(S.String),
          DeploymentDurationInMinutes: S.optional(S.Number),
          GrowthType: S.optional(S.String),
          GrowthFactor: S.optional(S.Number),
          FinalBakeTimeInMinutes: S.optional(S.Number),
          State: S.optional(S.String),
          EventLog: S.optional(__S(219, __c27, 3)),
          PercentageComplete: S.optional(S.Number),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CompletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          AppliedExtensions: S.optional(__S(221, __c27, 5)),
          KmsKeyArn: S.optional(S.String),
          KmsKeyIdentifier: S.optional(S.String),
          VersionLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "Deployment" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/deploymentstrategies/{DeploymentStrategyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentStrategyRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExperimentDefinitionRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          Run: S.Number.pipe(T.HttpLabel("Run")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExperimentRunRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ Inline: __S(528, __c66, 0) })]);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExecutiveSummary: S.optional(S.String),
          ReasonsToLaunch: S.optional(S.String),
          ReasonsNotToLaunch: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExperimentRunResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Hypothesis: S.optional(S.String),
          ConfigurationProfileId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          FlagKey: S.optional(S.String),
          AudienceRule: S.optional(S.String),
          AudienceDescription: S.optional(S.String),
          LaunchCriteria: S.optional(S.String),
          Treatments: S.optional(__S(29, __c3, 5)),
          Control: S.optional(__S(28, __c3, 4)),
        }),
      ).annotate({ identifier: "ExperimentDefinitionSnapshot" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ExperimentDefinitionId: S.optional(S.String),
          Run: S.optional(S.Number),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          ExposurePercentage: S.optional(S.Number),
          TreatmentOverrides: S.optional(__S(256, __c32, 0)),
          Result: S.optional(__S(264, __c33, 0)),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExperimentDefinitionSnapshot: S.optional(__S(265, __c33, 1)),
        }),
      ).annotate({ identifier: "ExperimentRun" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
          VersionNumber: S.optional(S.Number).pipe(T.HttpQuery("version_number")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/extensions/{ExtensionIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExtensionRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionAssociationId: S.String.pipe(T.HttpLabel("ExtensionAssociationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/extensionassociations/{ExtensionAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExtensionAssociationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHostedConfigurationVersionRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.Array(__S(520, __c65, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(297, __c37, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "Applications" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          Type: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/configurationprofiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationProfilesRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          LocationUri: S.optional(S.String),
          ValidatorTypes: S.optional(__S(305, __c38, 1)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationProfileSummary" });
    case 3:
      return S.Array(__S(306, __c38, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(307, __c38, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ConfigurationProfiles" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeploymentNumber: S.optional(S.Number),
          ConfigurationProfileId: S.optional(S.String),
          ConfigurationName: S.optional(S.String),
          ConfigurationVersion: S.optional(S.String),
          DeploymentDurationInMinutes: S.optional(S.Number),
          GrowthType: S.optional(S.String),
          GrowthFactor: S.optional(S.Number),
          FinalBakeTimeInMinutes: S.optional(S.Number),
          State: S.optional(S.String),
          PercentageComplete: S.optional(S.Number),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CompletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          VersionLabel: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentSummary" });
    case 2:
      return S.Array(__S(313, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(314, __c39, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "Deployments" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/deploymentstrategies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentStrategiesRequest" });
    case 1:
      return S.Array(__S(576, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(321, __c40, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DeploymentStrategies" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/environments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentsRequest" });
    case 1:
      return S.Array(__S(594, __c74, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(329, __c41, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "Environments" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.optional(S.String).pipe(T.HttpQuery("application_identifier")),
          ConfigurationProfileIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("configuration_profile_identifier"),
          ),
          EnvironmentIdentifier: S.optional(S.String).pipe(T.HttpQuery("environment_identifier")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/experimentdefinitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExperimentDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Hypothesis: S.optional(S.String),
          Status: S.optional(S.String),
          ConfigurationProfileId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          FlagKey: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExperimentDefinitionSummary" });
    case 2:
      return S.Array(__S(337, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(338, __c42, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ExperimentDefinitions" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          Run: S.Number.pipe(T.HttpLabel("Run")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/events",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExperimentRunEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          AssociatedDeployment: S.optional(S.String),
          EventType: S.optional(S.String),
          OccurredAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TriggeredBy: S.optional(S.String),
          ExposurePercentage: S.optional(S.Number),
          TreatmentOverrides: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "ExperimentRunEvent" });
    case 2:
      return S.Array(__S(345, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(346, __c43, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ExperimentRunEvents" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          Status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExperimentRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExperimentDefinitionId: S.optional(S.String),
          Run: S.optional(S.Number),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExperimentRunSummary" });
    case 2:
      return S.Array(__S(353, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(354, __c44, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ExperimentRuns" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String).pipe(T.HttpQuery("resource_identifier")),
          ExtensionIdentifier: S.optional(S.String).pipe(T.HttpQuery("extension_identifier")),
          ExtensionVersionNumber: S.optional(S.Number).pipe(
            T.HttpQuery("extension_version_number"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/extensionassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExtensionAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ExtensionArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtensionAssociationSummary" });
    case 2:
      return S.Array(__S(361, __c45, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(362, __c45, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ExtensionAssociations" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          Name: S.optional(S.String).pipe(T.HttpQuery("name")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/extensions" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExtensionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtensionSummary" });
    case 2:
      return S.Array(__S(369, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(370, __c46, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "Extensions" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          VersionLabel: S.optional(S.String).pipe(T.HttpQuery("version_label")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHostedConfigurationVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ConfigurationProfileId: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Description: S.optional(S.String),
          ContentType: S.optional(S.String),
          VersionLabel: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "HostedConfigurationVersionSummary" });
    case 2:
      return S.Array(__S(377, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(378, __c47, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "HostedConfigurationVersions" });
  }
}
function __c48(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(528, __c66, 0)) })).annotate({
        identifier: "ResourceTags",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
          DeploymentStrategyId: S.String,
          ConfigurationProfileId: S.String,
          ConfigurationVersion: S.String,
          Description: S.optional(S.String),
          Tags: S.optional(__S(528, __c66, 0)),
          KmsKeyIdentifier: S.optional(S.String),
          DynamicExtensionParameters: S.optional(__S(528, __c66, 0)),
          LatestDeploymentNumber: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDeploymentRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          Description: S.optional(S.String),
          ExposurePercentage: S.optional(S.Number),
          TreatmentOverrides: S.optional(__S(256, __c32, 0)),
          Tags: S.optional(__S(528, __c66, 0)),
          DeploymentParameters: S.optional(__S(408, __c51, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartExperimentRunRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DynamicExtensionParameters: S.optional(__S(528, __c66, 0)),
          Tags: S.optional(__S(528, __c66, 0)),
        }),
      ).annotate({ identifier: "DeploymentParameters" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
          DeploymentNumber: S.Number.pipe(T.HttpLabel("DeploymentNumber")),
          AllowRevert: S.optional(S.Boolean).pipe(T.HttpHeader("Allow-Revert")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopDeploymentRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          Run: S.Number.pipe(T.HttpLabel("Run")),
          Result: S.optional(__S(264, __c33, 0)),
          DeploymentParameters: S.optional(__S(408, __c51, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopExperimentRunRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(528, __c66, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(16, __c2, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeletionProtection: S.optional(__S(176, __c22, 0)),
          VendedMetrics: S.optional(__S(177, __c22, 1)),
        }).pipe(T.all(T.Http({ method: "PATCH", uri: "/settings" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAccountSettingsRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/applications/{ApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          RetrievalRoleArn: S.optional(S.String),
          Validators: S.optional(__S(561, __c70, 1)),
          KmsKeyIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationProfileRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
          Description: S.optional(S.String),
          DeploymentDurationInMinutes: S.optional(S.Number),
          FinalBakeTimeInMinutes: S.optional(S.Number),
          GrowthFactor: S.optional(S.Number),
          GrowthType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/deploymentstrategies/{DeploymentStrategyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDeploymentStrategyRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Monitors: S.optional(__S(593, __c74, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          Treatments: S.optional(__S(41, __c5, 1)),
          Control: S.optional(__S(40, __c5, 0)),
          Hypothesis: S.optional(S.String),
          AudienceRule: S.optional(S.String),
          AudienceDescription: S.optional(S.String),
          LaunchCriteria: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateExperimentDefinitionRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ExperimentDefinitionIdentifier: S.String.pipe(
            T.HttpLabel("ExperimentDefinitionIdentifier"),
          ),
          Run: S.Number.pipe(T.HttpLabel("Run")),
          Description: S.optional(S.String),
          ExposurePercentage: S.optional(S.Number),
          TreatmentOverrides: S.optional(__S(256, __c32, 0)),
          DeploymentParameters: S.optional(__S(408, __c51, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/update",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateExperimentRunRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
          Description: S.optional(S.String),
          Actions: S.optional(__S(58, __c7, 2)),
          Parameters: S.optional(__S(60, __c7, 4)),
          VersionNumber: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/extensions/{ExtensionIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateExtensionRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Tags: S.optional(__S(528, __c66, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "Application" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtensionAssociationId: S.String.pipe(T.HttpLabel("ExtensionAssociationId")),
          Parameters: S.optional(__S(528, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/extensionassociations/{ExtensionAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateExtensionAssociationRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          ConfigurationProfileId: S.String.pipe(T.HttpLabel("ConfigurationProfileId")),
          ConfigurationVersion: S.String.pipe(T.HttpQuery("configuration_version")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/validators",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateConfigurationRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          Name: S.String,
          Description: S.optional(S.String),
          LocationUri: S.String,
          RetrievalRoleArn: S.optional(S.String),
          Validators: S.optional(__S(561, __c70, 1)),
          Tags: S.optional(__S(528, __c66, 0)),
          Type: S.optional(S.String),
          KmsKeyIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{ApplicationId}/configurationprofiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationProfileRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Content: SensitiveString })).annotate({
        identifier: "Validator",
      });
    case 1:
      return S.Array(__S(560, __c70, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LocationUri: S.optional(S.String),
          RetrievalRoleArn: S.optional(S.String),
          Validators: S.optional(__S(561, __c70, 1)),
          Type: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          KmsKeyIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationProfile" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          DeploymentDurationInMinutes: S.Number,
          FinalBakeTimeInMinutes: S.optional(S.Number),
          GrowthFactor: S.Number,
          GrowthType: S.optional(S.String),
          ReplicateTo: S.optional(S.String),
          Tags: S.optional(__S(528, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deploymentstrategies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentStrategyRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DeploymentDurationInMinutes: S.optional(S.Number),
          GrowthType: S.optional(S.String),
          GrowthFactor: S.optional(S.Number),
          FinalBakeTimeInMinutes: S.optional(S.Number),
          ReplicateTo: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentStrategy" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          Name: S.String,
          Description: S.optional(S.String),
          Monitors: S.optional(__S(593, __c74, 1)),
          Tags: S.optional(__S(528, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{ApplicationId}/environments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEnvironmentRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmArn: S.String, AlarmRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "Monitor" });
    case 1:
      return S.Array(__S(592, __c74, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          Monitors: S.optional(__S(593, __c74, 1)),
        }),
      ).annotate({ identifier: "Environment" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
