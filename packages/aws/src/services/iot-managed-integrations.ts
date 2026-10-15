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
  sdkId: "IoT Managed Integrations",
  serviceShapeName: "IotManagedIntegrations",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iotmanagedintegrations" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-03-03");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://api.iotmanagedintegrations-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://api.iotmanagedintegrations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://api.iotmanagedintegrations.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

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
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type ClientToken = string;
export type ConnectorDestinationId = string;
export type AccountAssociationName = string;
export type AccountAssociationDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type AuthMaterialName = string;
export interface GeneralAuthorizationName {
  AuthMaterialName?: string;
}
export interface CreateAccountAssociationRequest {
  ClientToken?: string;
  ConnectorDestinationId: string;
  Name?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  GeneralAuthorization?: GeneralAuthorizationName;
}
export type OAuthAuthorizationUrlOutput = string | redacted.Redacted<string>;
export type AccountAssociationId = string;
export type AssociationState =
  | "ASSOCIATION_IN_PROGRESS"
  | "ASSOCIATION_FAILED"
  | "ASSOCIATION_SUCCEEDED"
  | "ASSOCIATION_DELETING"
  | "REFRESH_TOKEN_EXPIRED"
  | (string & {});
export type AccountAssociationArn = string;
export interface CreateAccountAssociationResponse {
  OAuthAuthorizationUrl: string | redacted.Redacted<string>;
  AccountAssociationId: string;
  AssociationState: AssociationState;
  Arn?: string;
}
export type DisplayName = string;
export type LambdaArn = string;
export interface LambdaConfig {
  arn: string;
}
export interface EndpointConfig {
  lambda?: LambdaConfig;
}
export type CloudConnectorDescription = string;
export type EndpointType = "LAMBDA" | (string & {});
export interface CreateCloudConnectorRequest {
  Name: string;
  EndpointConfig: EndpointConfig;
  Description?: string;
  EndpointType?: EndpointType;
  ClientToken?: string;
}
export type CloudConnectorId = string;
export interface CreateCloudConnectorResponse {
  Id?: string;
}
export type ConnectorDestinationName = string;
export type ConnectorDestinationDescription = string;
export type AuthType = "OAUTH" | (string & {});
export type AuthUrl = string;
export type TokenUrl = string;
export type TokenEndpointAuthenticationScheme =
  | "HTTP_BASIC"
  | "REQUEST_BODY_CREDENTIALS"
  | (string & {});
export interface ProactiveRefreshTokenRenewal {
  enabled?: boolean;
  DaysBeforeRenewal?: number;
}
export interface OAuthConfig {
  authUrl: string;
  tokenUrl: string;
  scope?: string;
  tokenEndpointAuthenticationScheme: TokenEndpointAuthenticationScheme;
  oAuthCompleteRedirectUrl?: string;
  proactiveRefreshTokenRenewal?: ProactiveRefreshTokenRenewal;
}
export type SecretsManagerArn = string;
export type SecretsManagerVersionId = string;
export interface SecretsManager {
  arn: string;
  versionId: string;
}
export interface AuthMaterial {
  SecretsManager: SecretsManager;
  AuthMaterialName: string;
}
export type AuthMaterials = AuthMaterial[];
export interface AuthConfig {
  oAuth?: OAuthConfig;
  GeneralAuthorization?: AuthMaterial[];
}
export interface CreateConnectorDestinationRequest {
  Name?: string;
  Description?: string;
  CloudConnectorId: string;
  AuthType?: AuthType;
  AuthConfig: AuthConfig;
  SecretsManager?: SecretsManager;
  ClientToken?: string;
}
export interface CreateConnectorDestinationResponse {
  Id?: string;
}
export type CredentialLockerName = string | redacted.Redacted<string>;
export interface CreateCredentialLockerRequest {
  Name?: string | redacted.Redacted<string>;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type CredentialLockerId = string;
export type CredentialLockerArn = string;
export type CredentialLockerCreatedAt = Date;
export interface CreateCredentialLockerResponse {
  Id?: string;
  Arn?: string;
  CreatedAt?: Date;
}
export type DeliveryDestinationArn = string;
export type DeliveryDestinationType = "KINESIS" | (string & {});
export type DestinationName = string;
export type DeliveryDestinationRoleArn = string;
export type DestinationDescription = string;
export interface CreateDestinationRequest {
  DeliveryDestinationArn: string;
  DeliveryDestinationType: DeliveryDestinationType;
  Name: string;
  RoleArn: string;
  ClientToken?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDestinationResponse {
  Name?: string;
}
export type SmartHomeResourceType = string;
export type SmartHomeResourceId = string;
export type LogLevel = "DEBUG" | "ERROR" | "INFO" | "WARN" | (string & {});
export interface CreateEventLogConfigurationRequest {
  ResourceType: string;
  ResourceId?: string;
  EventLogLevel: LogLevel;
  ClientToken?: string;
}
export type LogConfigurationId = string;
export interface CreateEventLogConfigurationResponse {
  Id?: string;
}
export type Role = "CONTROLLER" | "DEVICE" | (string & {});
export type Owner = string | redacted.Redacted<string>;
export type AuthMaterialString = string | redacted.Redacted<string>;
export type AuthMaterialType =
  | "CUSTOM_PROTOCOL_QR_BAR_CODE"
  | "WIFI_SETUP_QR_BAR_CODE"
  | "ZWAVE_QR_BAR_CODE"
  | "ZIGBEE_QR_BAR_CODE"
  | "DISCOVERED_DEVICE"
  | "PRE_ONBOARDED_CLOUD"
  | (string & {});
export type EnableAsProvisioner = boolean;
export type EnableAsProvisionee = boolean;
export type TimeoutInMinutes = number;
export interface WiFiSimpleSetupConfiguration {
  EnableAsProvisioner?: boolean;
  EnableAsProvisionee?: boolean;
  TimeoutInMinutes?: number;
}
export type SerialNumber = string | redacted.Redacted<string>;
export type Brand = string | redacted.Redacted<string>;
export type Model = string | redacted.Redacted<string>;
export type Name = string;
export type CapabilityReportVersion = string;
export type NodeId = string;
export type EndpointId = string;
export type DeviceType = string;
export type DeviceTypes = string[];
export type SchemaVersionedId = string;
export type CapabilityName = string;
export type CapabilityVersion = string;
export type PropertyName = string;
export type CapabilityReportProperties = string[];
export type ActionName = string;
export type CapabilityReportActions = string[];
export type EventName = string;
export type CapabilityReportEvents = string[];
export interface CapabilityReportCapability {
  id: string;
  name: string;
  version: string;
  properties: string[];
  actions: string[];
  events: string[];
}
export type CapabilityReportCapabilities = CapabilityReportCapability[];
export interface CapabilityReportEndpoint {
  id: string;
  deviceTypes: string[];
  capabilities: CapabilityReportCapability[];
}
export type CapabilityReportEndpoints = CapabilityReportEndpoint[];
export interface CapabilityReport {
  version: string;
  nodeId?: string;
  endpoints: CapabilityReportEndpoint[];
}
export type SchemaVersionFormat = "AWS" | "ZCL" | "CONNECTOR" | (string & {});
export type ExtrinsicSchemaId = string;
export type MatterCapabilityReportClusterRevisionId = number;
export type ValidationSchema = unknown;
export interface CapabilitySchemaItem {
  Format: SchemaVersionFormat;
  CapabilityId: string;
  ExtrinsicId: string;
  ExtrinsicVersion: number;
  Schema: any;
}
export type CapabilitySchemas = CapabilitySchemaItem[];
export type Capabilities = string;
export type Classification = string | redacted.Redacted<string>;
export type AttributeName = string;
export type AttributeValue = string;
export type MetaData = { [key: string]: string | undefined };
export interface CreateManagedThingRequest {
  Role: Role;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  AuthenticationMaterial: string | redacted.Redacted<string>;
  AuthenticationMaterialType: AuthMaterialType;
  WiFiSimpleSetupConfiguration?: WiFiSimpleSetupConfiguration;
  SerialNumber?: string | redacted.Redacted<string>;
  Brand?: string | redacted.Redacted<string>;
  Model?: string | redacted.Redacted<string>;
  Name?: string;
  CapabilityReport?: CapabilityReport;
  CapabilitySchemas?: CapabilitySchemaItem[];
  Capabilities?: string;
  ClientToken?: string;
  Classification?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
  MetaData?: { [key: string]: string | undefined };
}
export type ManagedThingId = string;
export type ManagedThingArn = string;
export type CreatedAt = Date;
export interface CreateManagedThingResponse {
  Id?: string;
  Arn?: string;
  CreatedAt?: Date;
}
export type EventType =
  | "DEVICE_COMMAND"
  | "DEVICE_COMMAND_REQUEST"
  | "DEVICE_DISCOVERY_STATUS"
  | "DEVICE_EVENT"
  | "DEVICE_LIFE_CYCLE"
  | "DEVICE_STATE"
  | "DEVICE_OTA"
  | "DEVICE_WSS"
  | "CONNECTOR_ASSOCIATION"
  | "ACCOUNT_ASSOCIATION"
  | "CONNECTOR_ERROR_REPORT"
  | (string & {});
export interface CreateNotificationConfigurationRequest {
  EventType: EventType;
  DestinationName: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateNotificationConfigurationResponse {
  EventType?: EventType;
}
export type OtaDescription = string;
export type S3Url = string;
export type OtaProtocol = "HTTP" | (string & {});
export type Target = string[];
export type OtaTaskConfigurationId = string;
export type OtaMechanism = "PUSH" | (string & {});
export type OtaType = "ONE_TIME" | "CONTINUOUS" | (string & {});
export type OtaTargetQueryString = string;
export type SchedulingConfigEndBehavior =
  | "STOP_ROLLOUT"
  | "CANCEL"
  | "FORCE_CANCEL"
  | (string & {});
export type EndTime = string;
export type DurationInMinutes = number;
export type StartTime = string;
export interface ScheduleMaintenanceWindow {
  DurationInMinutes?: number;
  StartTime?: string;
}
export type ScheduleMaintenanceWindowList = ScheduleMaintenanceWindow[];
export type ScheduleStartTime = string;
export interface OtaTaskSchedulingConfig {
  EndBehavior?: SchedulingConfigEndBehavior;
  EndTime?: string;
  MaintenanceWindows?: ScheduleMaintenanceWindow[];
  StartTime?: string;
}
export type RetryCriteriaFailureType = "FAILED" | "TIMED_OUT" | "ALL" | (string & {});
export type MinNumberOfRetries = number;
export interface RetryConfigCriteria {
  FailureType?: RetryCriteriaFailureType;
  MinNumberOfRetries?: number;
}
export type RetryConfigCriteriaList = RetryConfigCriteria[];
export interface OtaTaskExecutionRetryConfig {
  RetryConfigCriteria?: RetryConfigCriteria[];
}
export interface CreateOtaTaskRequest {
  Description?: string;
  S3Url: string;
  Protocol?: OtaProtocol;
  Target?: string[];
  TaskConfigurationId?: string;
  OtaMechanism?: OtaMechanism;
  OtaType: OtaType;
  OtaTargetQueryString?: string;
  ClientToken?: string;
  OtaSchedulingConfig?: OtaTaskSchedulingConfig;
  OtaTaskExecutionRetryConfig?: OtaTaskExecutionRetryConfig;
  Tags?: { [key: string]: string | undefined };
}
export type OtaTaskId = string;
export type OtaTaskArn = string;
export interface CreateOtaTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  Description?: string;
}
export type OtaTaskConfigurationName = string | redacted.Redacted<string>;
export type AbortCriteriaAction = "CANCEL" | (string & {});
export type AbortCriteriaFailureType = "FAILED" | "REJECTED" | "TIMED_OUT" | "ALL" | (string & {});
export type MinNumberOfExecutedThings = number;
export type ThresholdPercentage = number;
export interface AbortConfigCriteria {
  Action?: AbortCriteriaAction;
  FailureType?: AbortCriteriaFailureType;
  MinNumberOfExecutedThings?: number;
  ThresholdPercentage?: number;
}
export type AbortConfigCriteriaList = AbortConfigCriteria[];
export interface OtaTaskAbortConfig {
  AbortConfigCriteriaList?: AbortConfigCriteria[];
}
export type BaseRatePerMinute = number;
export type IncrementFactor = number;
export type NumberOfNotifiedThings = number;
export type NumberOfSucceededThings = number;
export interface RolloutRateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export interface ExponentialRolloutRate {
  BaseRatePerMinute?: number;
  IncrementFactor?: number;
  RateIncreaseCriteria?: RolloutRateIncreaseCriteria;
}
export type MaximumPerMinute = number;
export interface OtaTaskExecutionRolloutConfig {
  ExponentialRolloutRate?: ExponentialRolloutRate;
  MaximumPerMinute?: number;
}
export type InProgressTimeoutInMinutes = number;
export interface OtaTaskTimeoutConfig {
  InProgressTimeoutInMinutes?: number;
}
export interface PushConfig {
  AbortConfig?: OtaTaskAbortConfig;
  RolloutConfig?: OtaTaskExecutionRolloutConfig;
  TimeoutConfig?: OtaTaskTimeoutConfig;
}
export interface CreateOtaTaskConfigurationRequest {
  Description?: string;
  Name?: string | redacted.Redacted<string>;
  PushConfig?: PushConfig;
  ClientToken?: string;
}
export interface CreateOtaTaskConfigurationResponse {
  TaskConfigurationId?: string;
}
export type ProvisioningType = "FLEET_PROVISIONING" | "JITR" | (string & {});
export type CaCertificate = string | redacted.Redacted<string>;
export type ClaimCertificate = string | redacted.Redacted<string>;
export type ProvisioningProfileName = string;
export interface CreateProvisioningProfileRequest {
  ProvisioningType: ProvisioningType;
  CaCertificate?: string | redacted.Redacted<string>;
  ClaimCertificate?: string | redacted.Redacted<string>;
  Name?: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ProvisioningProfileArn = string;
export type ProvisioningProfileId = string;
export type ProvisioningProfileStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export type ClaimCertificatePrivateKey = string | redacted.Redacted<string>;
export interface CreateProvisioningProfileResponse {
  Arn?: string;
  Name?: string;
  ProvisioningType?: ProvisioningType;
  Id?: string;
  Status?: ProvisioningProfileStatus;
  ClaimCertificate?: string | redacted.Redacted<string>;
  ClaimCertificatePrivateKey?: string | redacted.Redacted<string>;
}
export interface DeleteAccountAssociationRequest {
  AccountAssociationId: string;
}
export interface DeleteAccountAssociationResponse {}
export interface DeleteCloudConnectorRequest {
  Identifier: string;
}
export interface DeleteCloudConnectorResponse {}
export interface DeleteConnectorDestinationRequest {
  Identifier: string;
}
export interface DeleteConnectorDestinationResponse {}
export interface DeleteCredentialLockerRequest {
  Identifier: string;
}
export interface DeleteCredentialLockerResponse {}
export interface DeleteDestinationRequest {
  Name: string;
}
export interface DeleteDestinationResponse {}
export interface DeleteEventLogConfigurationRequest {
  Id: string;
}
export interface DeleteEventLogConfigurationResponse {}
export interface DeleteManagedThingRequest {
  Identifier: string;
  Force?: boolean;
}
export interface DeleteManagedThingResponse {}
export interface DeleteNotificationConfigurationRequest {
  EventType: EventType;
}
export interface DeleteNotificationConfigurationResponse {}
export interface DeleteOtaTaskRequest {
  Identifier: string;
}
export interface DeleteOtaTaskResponse {}
export interface DeleteOtaTaskConfigurationRequest {
  Identifier: string;
}
export interface DeleteOtaTaskConfigurationResponse {}
export interface DeleteProvisioningProfileRequest {
  Identifier: string;
}
export interface DeleteProvisioningProfileResponse {}
export interface DeregisterAccountAssociationRequest {
  ManagedThingId: string;
  AccountAssociationId: string;
}
export interface DeregisterAccountAssociationResponse {}
export interface GetAccountAssociationRequest {
  AccountAssociationId: string;
}
export type AccountAssociationErrorMessage = string;
export interface GetAccountAssociationResponse {
  AccountAssociationId: string;
  AssociationState: AssociationState;
  ErrorMessage?: string;
  ConnectorDestinationId?: string;
  Name?: string;
  Description?: string;
  Arn?: string;
  OAuthAuthorizationUrl: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
  GeneralAuthorization?: GeneralAuthorizationName;
}
export interface GetCloudConnectorRequest {
  Identifier: string;
}
export type CloudConnectorType = "LISTED" | "UNLISTED" | (string & {});
export interface GetCloudConnectorResponse {
  Name: string;
  EndpointConfig: EndpointConfig;
  Description?: string;
  EndpointType?: EndpointType;
  Id?: string;
  Type?: CloudConnectorType;
}
export interface GetConnectorDestinationRequest {
  Identifier: string;
}
export type OAuthCompleteRedirectUrl = string;
export interface GetConnectorDestinationResponse {
  Name?: string;
  Description?: string;
  CloudConnectorId?: string;
  Id?: string;
  AuthType?: AuthType;
  AuthConfig?: AuthConfig;
  SecretsManager?: SecretsManager;
  OAuthCompleteRedirectUrl?: string;
}
export interface GetCredentialLockerRequest {
  Identifier: string;
}
export interface GetCredentialLockerResponse {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetCustomEndpointRequest {}
export type EndpointAddress = string;
export interface GetCustomEndpointResponse {
  EndpointAddress: string;
}
export interface GetDefaultEncryptionConfigurationRequest {}
export type ConfigurationErrorCode = string;
export type ConfigurationErrorMessage = string;
export interface ConfigurationError {
  code?: string;
  message?: string;
}
export type ConfigurationState = "ENABLED" | "UPDATE_IN_PROGRESS" | "UPDATE_FAILED" | (string & {});
export interface ConfigurationStatus {
  error?: ConfigurationError;
  state: ConfigurationState;
}
export type EncryptionType =
  | "MANAGED_INTEGRATIONS_DEFAULT_ENCRYPTION"
  | "CUSTOMER_KEY_ENCRYPTION"
  | (string & {});
export type KmsKeyArn = string;
export interface GetDefaultEncryptionConfigurationResponse {
  configurationStatus: ConfigurationStatus;
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export interface GetDestinationRequest {
  Name: string;
}
export type DestinationCreatedAt = Date;
export type DestinationUpdatedAt = Date;
export interface GetDestinationResponse {
  Description?: string;
  DeliveryDestinationArn?: string;
  DeliveryDestinationType?: DeliveryDestinationType;
  Name?: string;
  RoleArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type DeviceDiscoveryId = string;
export interface GetDeviceDiscoveryRequest {
  Identifier: string;
}
export type DeviceDiscoveryArn = string;
export type DiscoveryType =
  | "ZWAVE"
  | "ZIGBEE"
  | "CLOUD"
  | "CUSTOM"
  | "CONTROLLER_CAPABILITY_REDISCOVERY"
  | (string & {});
export type DeviceDiscoveryStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export type DiscoveryStartedAt = Date;
export type ConnectorAssociationId = string;
export type DiscoveryFinishedAt = Date;
export interface GetDeviceDiscoveryResponse {
  Id: string;
  Arn: string;
  DiscoveryType: DiscoveryType;
  Status: DeviceDiscoveryStatus;
  StartedAt: Date;
  ControllerId?: string;
  ConnectorAssociationId?: string;
  AccountAssociationId?: string;
  FinishedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetEventLogConfigurationRequest {
  Id: string;
}
export interface GetEventLogConfigurationResponse {
  Id?: string;
  ResourceType?: string;
  ResourceId?: string;
  EventLogLevel?: LogLevel;
}
export interface GetHubConfigurationRequest {}
export type HubTokenTimerExpirySettingInSeconds = number;
export type HubConfigurationUpdatedAt = Date;
export interface GetHubConfigurationResponse {
  HubTokenTimerExpirySettingInSeconds?: number;
  UpdatedAt?: Date;
}
export interface GetManagedThingRequest {
  Identifier: string;
}
export type AdvertisedProductId = string;
export type ProvisioningStatus =
  | "UNASSOCIATED"
  | "PRE_ASSOCIATED"
  | "DISCOVERED"
  | "ACTIVATED"
  | "DELETION_FAILED"
  | "DELETE_IN_PROGRESS"
  | "ISOLATED"
  | "DELETED"
  | (string & {});
export type UniversalProductCode = string | redacted.Redacted<string>;
export type InternationalArticleNumber = string | redacted.Redacted<string>;
export type ConnectorPolicyId = string;
export type ConnectorDeviceId = string | redacted.Redacted<string>;
export type DeviceSpecificKey = string | redacted.Redacted<string>;
export type MacAddress = string | redacted.Redacted<string>;
export type ParentControllerId = string;
export type UpdatedAt = Date;
export type SetupAt = Date;
export type HubNetworkMode = "STANDARD" | "NETWORK_WIDE_EXCLUSION" | (string & {});
export interface GetManagedThingResponse {
  Id?: string;
  Arn?: string;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  AdvertisedProductId?: string;
  Role?: Role;
  ProvisioningStatus?: ProvisioningStatus;
  Name?: string;
  Model?: string | redacted.Redacted<string>;
  Brand?: string | redacted.Redacted<string>;
  SerialNumber?: string | redacted.Redacted<string>;
  UniversalProductCode?: string | redacted.Redacted<string>;
  InternationalArticleNumber?: string | redacted.Redacted<string>;
  ConnectorPolicyId?: string;
  ConnectorDestinationId?: string;
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  DeviceSpecificKey?: string | redacted.Redacted<string>;
  MacAddress?: string | redacted.Redacted<string>;
  ParentControllerId?: string;
  Classification?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ActivatedAt?: Date;
  HubNetworkMode?: HubNetworkMode;
  MetaData?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
  WiFiSimpleSetupConfiguration?: WiFiSimpleSetupConfiguration;
}
export interface GetManagedThingCapabilitiesRequest {
  Identifier: string;
}
export interface GetManagedThingCapabilitiesResponse {
  ManagedThingId?: string;
  Capabilities?: string;
  CapabilityReport?: CapabilityReport;
}
export interface GetManagedThingCertificateRequest {
  Identifier: string;
}
export type CertificatePem = string;
export interface GetManagedThingCertificateResponse {
  ManagedThingId?: string;
  CertificatePem?: string;
}
export interface GetManagedThingConnectivityDataRequest {
  Identifier: string;
}
export type ConnectivityStatus = boolean;
export type ConnectivityTimestamp = Date;
export type DisconnectReasonValue =
  | "AUTH_ERROR"
  | "CLIENT_INITIATED_DISCONNECT"
  | "CLIENT_ERROR"
  | "CONNECTION_LOST"
  | "DUPLICATE_CLIENTID"
  | "FORBIDDEN_ACCESS"
  | "MQTT_KEEP_ALIVE_TIMEOUT"
  | "SERVER_ERROR"
  | "SERVER_INITIATED_DISCONNECT"
  | "THROTTLED"
  | "WEBSOCKET_TTL_EXPIRATION"
  | "CUSTOMAUTH_TTL_EXPIRATION"
  | "UNKNOWN"
  | "NONE"
  | (string & {});
export interface GetManagedThingConnectivityDataResponse {
  ManagedThingId?: string;
  Connected?: boolean;
  Timestamp?: Date;
  DisconnectReason?: DisconnectReasonValue;
}
export interface GetManagedThingMetaDataRequest {
  Identifier: string;
}
export interface GetManagedThingMetaDataResponse {
  ManagedThingId?: string;
  MetaData?: { [key: string]: string | undefined };
}
export interface GetManagedThingStateRequest {
  ManagedThingId: string;
}
export type CapabilityProperties = unknown;
export interface StateCapability {
  id: string;
  name: string;
  version: string;
  properties?: any;
}
export type StateCapabilities = StateCapability[];
export interface StateEndpoint {
  endpointId: string;
  capabilities: StateCapability[];
}
export type StateEndpoints = StateEndpoint[];
export interface GetManagedThingStateResponse {
  Endpoints: StateEndpoint[];
}
export interface GetNotificationConfigurationRequest {
  EventType: EventType;
}
export type NotificationConfigurationCreatedAt = Date;
export type NotificationConfigurationUpdatedAt = Date;
export interface GetNotificationConfigurationResponse {
  EventType?: EventType;
  DestinationName?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetOtaTaskRequest {
  Identifier: string;
}
export type LastUpdatedAt = Date;
export interface TaskProcessingDetails {
  NumberOfCanceledThings?: number;
  NumberOfFailedThings?: number;
  NumberOfInProgressThings?: number;
  numberOfQueuedThings?: number;
  numberOfRejectedThings?: number;
  numberOfRemovedThings?: number;
  numberOfSucceededThings?: number;
  numberOfTimedOutThings?: number;
  processingTargets?: string[];
}
export type OtaStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "COMPLETED"
  | "DELETION_IN_PROGRESS"
  | "SCHEDULED"
  | (string & {});
export interface GetOtaTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  Description?: string;
  S3Url?: string;
  Protocol?: OtaProtocol;
  OtaType?: OtaType;
  OtaTargetQueryString?: string;
  OtaMechanism?: OtaMechanism;
  Target?: string[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  TaskConfigurationId?: string;
  TaskProcessingDetails?: TaskProcessingDetails;
  OtaSchedulingConfig?: OtaTaskSchedulingConfig;
  OtaTaskExecutionRetryConfig?: OtaTaskExecutionRetryConfig;
  Status?: OtaStatus;
  Tags?: { [key: string]: string | undefined };
}
export interface GetOtaTaskConfigurationRequest {
  Identifier: string;
}
export interface GetOtaTaskConfigurationResponse {
  TaskConfigurationId?: string;
  Name?: string | redacted.Redacted<string>;
  PushConfig?: PushConfig;
  Description?: string;
  CreatedAt?: Date;
}
export interface GetProvisioningProfileRequest {
  Identifier: string;
}
export interface GetProvisioningProfileResponse {
  Arn?: string;
  Name?: string;
  ProvisioningType?: ProvisioningType;
  Id?: string;
  Status?: ProvisioningProfileStatus;
  ClaimCertificate?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export interface GetRuntimeLogConfigurationRequest {
  ManagedThingId: string;
}
export type LocalStoreLocation = string;
export type LocalStoreFileRotationMaxFiles = number;
export type LocalStoreFileRotationMaxBytes = number;
export type UploadLog = boolean;
export type UploadPeriodMinutes = number;
export type DeleteLocalStoreAfterUpload = boolean;
export interface RuntimeLogConfigurations {
  LogLevel?: LogLevel;
  LogFlushLevel?: LogLevel;
  LocalStoreLocation?: string;
  LocalStoreFileRotationMaxFiles?: number;
  LocalStoreFileRotationMaxBytes?: number;
  UploadLog?: boolean;
  UploadPeriodMinutes?: number;
  DeleteLocalStoreAfterUpload?: boolean;
}
export interface GetRuntimeLogConfigurationResponse {
  ManagedThingId?: string;
  RuntimeLogConfigurations?: RuntimeLogConfigurations;
}
export type SchemaVersionType = "capability" | "definition" | (string & {});
export interface GetSchemaVersionRequest {
  Type: SchemaVersionType;
  SchemaVersionedId: string;
  Format?: SchemaVersionFormat;
}
export type SchemaId = string;
export type SchemaVersionDescription = string;
export type SchemaVersionNamespaceName = string;
export type SchemaVersionVersion = string;
export type SchemaVersionVisibility = "PUBLIC" | "PRIVATE" | (string & {});
export type SchemaVersionSchema = unknown;
export interface GetSchemaVersionResponse {
  SchemaId?: string;
  Type?: SchemaVersionType;
  Description?: string;
  Namespace?: string;
  SemanticVersion?: string;
  Visibility?: SchemaVersionVisibility;
  Schema?: any;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAccountAssociationsRequest {
  ConnectorDestinationId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AccountAssociationItem {
  AccountAssociationId: string;
  AssociationState: AssociationState;
  ErrorMessage?: string;
  ConnectorDestinationId?: string;
  Name?: string;
  Description?: string;
  Arn?: string;
}
export type AccountAssociationListDefinition = AccountAssociationItem[];
export interface ListAccountAssociationsResponse {
  Items?: AccountAssociationItem[];
  NextToken?: string;
}
export interface ListCloudConnectorsRequest {
  Type?: CloudConnectorType;
  LambdaArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ConnectorItem {
  Name: string;
  EndpointConfig: EndpointConfig;
  Description?: string;
  EndpointType?: EndpointType;
  Id?: string;
  Type?: CloudConnectorType;
}
export type ConnectorList = ConnectorItem[];
export interface ListCloudConnectorsResponse {
  Items?: ConnectorItem[];
  NextToken?: string;
}
export interface ListConnectorDestinationsRequest {
  CloudConnectorId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ConnectorDestinationSummary {
  Name?: string;
  Description?: string;
  CloudConnectorId?: string;
  Id?: string;
}
export type ConnectorDestinationListDefinition = ConnectorDestinationSummary[];
export interface ListConnectorDestinationsResponse {
  ConnectorDestinationList?: ConnectorDestinationSummary[];
  NextToken?: string;
}
export interface ListCredentialLockersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface CredentialLockerSummary {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
}
export type CredentialLockerListDefinition = CredentialLockerSummary[];
export interface ListCredentialLockersResponse {
  Items?: CredentialLockerSummary[];
  NextToken?: string;
}
export interface ListDestinationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface DestinationSummary {
  Description?: string;
  DeliveryDestinationArn?: string;
  DeliveryDestinationType?: DeliveryDestinationType;
  Name?: string;
  RoleArn?: string;
}
export type DestinationListDefinition = DestinationSummary[];
export interface ListDestinationsResponse {
  DestinationList?: DestinationSummary[];
  NextToken?: string;
}
export interface ListDeviceDiscoveriesRequest {
  NextToken?: string;
  MaxResults?: number;
  TypeFilter?: DiscoveryType;
  StatusFilter?: DeviceDiscoveryStatus;
}
export interface DeviceDiscoverySummary {
  Id?: string;
  DiscoveryType?: DiscoveryType;
  Status?: DeviceDiscoveryStatus;
}
export type DeviceDiscoveryListDefinition = DeviceDiscoverySummary[];
export interface ListDeviceDiscoveriesResponse {
  Items?: DeviceDiscoverySummary[];
  NextToken?: string;
}
export interface ListDiscoveredDevicesRequest {
  Identifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ConnectorDeviceName = string;
export type DeviceTypeList = string[];
export type DiscoveryModification = "DISCOVERED" | "UPDATED" | "NO_CHANGE" | (string & {});
export type DiscoveredAt = Date;
export interface DiscoveredDeviceSummary {
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  ConnectorDeviceName?: string;
  DeviceTypes?: string[];
  ManagedThingId?: string;
  Modification?: DiscoveryModification;
  DiscoveredAt?: Date;
  Brand?: string | redacted.Redacted<string>;
  Model?: string | redacted.Redacted<string>;
  AuthenticationMaterial?: string | redacted.Redacted<string>;
}
export type DiscoveredDeviceListDefinition = DiscoveredDeviceSummary[];
export interface ListDiscoveredDevicesResponse {
  Items?: DiscoveredDeviceSummary[];
  NextToken?: string;
}
export interface ListEventLogConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface EventLogConfigurationSummary {
  Id?: string;
  ResourceType?: string;
  ResourceId?: string;
  EventLogLevel?: LogLevel;
}
export type EventLogConfigurationListDefinition = EventLogConfigurationSummary[];
export interface ListEventLogConfigurationsResponse {
  EventLogConfigurationList?: EventLogConfigurationSummary[];
  NextToken?: string;
}
export interface ListManagedThingAccountAssociationsRequest {
  ManagedThingId?: string;
  AccountAssociationId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ManagedThingAssociationStatus = "PRE_ASSOCIATED" | "ASSOCIATED" | (string & {});
export interface ManagedThingAssociation {
  ManagedThingId?: string;
  AccountAssociationId?: string;
  ManagedThingAssociationStatus?: ManagedThingAssociationStatus;
}
export type ManagedThingAssociationList = ManagedThingAssociation[];
export interface ListManagedThingAccountAssociationsResponse {
  Items?: ManagedThingAssociation[];
  NextToken?: string;
}
export interface ListManagedThingsRequest {
  OwnerFilter?: string | redacted.Redacted<string>;
  CredentialLockerFilter?: string;
  RoleFilter?: Role;
  ParentControllerIdentifierFilter?: string;
  ConnectorPolicyIdFilter?: string;
  ConnectorDestinationIdFilter?: string;
  ConnectorDeviceIdFilter?: string | redacted.Redacted<string>;
  SerialNumberFilter?: string | redacted.Redacted<string>;
  ProvisioningStatusFilter?: ProvisioningStatus;
  NextToken?: string;
  MaxResults?: number;
}
export interface ManagedThingSummary {
  Id?: string;
  Arn?: string;
  AdvertisedProductId?: string;
  Brand?: string | redacted.Redacted<string>;
  Classification?: string | redacted.Redacted<string>;
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  ConnectorPolicyId?: string;
  ConnectorDestinationId?: string;
  Model?: string | redacted.Redacted<string>;
  Name?: string;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  ParentControllerId?: string;
  ProvisioningStatus?: ProvisioningStatus;
  Role?: Role;
  SerialNumber?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ActivatedAt?: Date;
}
export type ManagedThingListDefinition = ManagedThingSummary[];
export interface ListManagedThingsResponse {
  Items?: ManagedThingSummary[];
  NextToken?: string;
}
export type CapabilityId = string;
export interface ListManagedThingSchemasRequest {
  Identifier: string;
  EndpointIdFilter?: string;
  CapabilityIdFilter?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ManagedThingSchemaListItem {
  EndpointId?: string;
  CapabilityId?: string;
  Schema?: any;
}
export type ManagedThingSchemaListDefinition = ManagedThingSchemaListItem[];
export interface ListManagedThingSchemasResponse {
  Items?: ManagedThingSchemaListItem[];
  NextToken?: string;
}
export interface ListNotificationConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface NotificationConfigurationSummary {
  EventType?: EventType;
  DestinationName?: string;
}
export type NotificationConfigurationListDefinition = NotificationConfigurationSummary[];
export interface ListNotificationConfigurationsResponse {
  NotificationConfigurationList?: NotificationConfigurationSummary[];
  NextToken?: string;
}
export interface ListOtaTaskConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface OtaTaskConfigurationSummary {
  TaskConfigurationId?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
}
export type OtaTaskConfigurationListDefinition = OtaTaskConfigurationSummary[];
export interface ListOtaTaskConfigurationsResponse {
  Items?: OtaTaskConfigurationSummary[];
  NextToken?: string;
}
export type OtaNextToken = string;
export interface ListOtaTaskExecutionsRequest {
  Identifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ExecutionNumber = number;
export type QueuedAt = Date;
export type RetryAttempt = number;
export type StartedAt = Date;
export type OtaTaskExecutionStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REMOVED"
  | "CANCELED"
  | (string & {});
export interface OtaTaskExecutionSummary {
  ExecutionNumber?: number;
  LastUpdatedAt?: Date;
  QueuedAt?: Date;
  RetryAttempt?: number;
  StartedAt?: Date;
  Status?: OtaTaskExecutionStatus;
}
export interface OtaTaskExecutionSummaries {
  TaskExecutionSummary?: OtaTaskExecutionSummary;
  ManagedThingId?: string;
}
export type OtaTaskExecutionSummariesListDefinition = OtaTaskExecutionSummaries[];
export interface ListOtaTaskExecutionsResponse {
  ExecutionSummaries?: OtaTaskExecutionSummaries[];
  NextToken?: string;
}
export interface ListOtaTasksRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface OtaTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  TaskConfigurationId?: string;
  Status?: OtaStatus;
}
export type OtaTaskListDefinition = OtaTaskSummary[];
export interface ListOtaTasksResponse {
  Tasks?: OtaTaskSummary[];
  NextToken?: string;
}
export interface ListProvisioningProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProvisioningProfileSummary {
  Name?: string;
  Id?: string;
  Arn?: string;
  ProvisioningType?: ProvisioningType;
  Status?: ProvisioningProfileStatus;
}
export type ProvisioningProfileListDefinition = ProvisioningProfileSummary[];
export interface ListProvisioningProfilesResponse {
  Items?: ProvisioningProfileSummary[];
  NextToken?: string;
}
export interface ListSchemaVersionsRequest {
  Type: SchemaVersionType;
  MaxResults?: number;
  NextToken?: string;
  SchemaId?: string;
  Namespace?: string;
  Visibility?: SchemaVersionVisibility;
  SemanticVersion?: string;
}
export interface SchemaVersionListItem {
  SchemaId?: string;
  Type?: SchemaVersionType;
  Description?: string;
  Namespace?: string;
  SemanticVersion?: string;
  Visibility?: SchemaVersionVisibility;
}
export type SchemaVersionList = SchemaVersionListItem[];
export interface ListSchemaVersionsResponse {
  Items?: SchemaVersionListItem[];
  NextToken?: string;
}
export type IoTManagedIntegrationsResourceARN = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutDefaultEncryptionConfigurationRequest {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export interface PutDefaultEncryptionConfigurationResponse {
  configurationStatus: ConfigurationStatus;
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export interface PutHubConfigurationRequest {
  HubTokenTimerExpirySettingInSeconds: number;
}
export interface PutHubConfigurationResponse {
  HubTokenTimerExpirySettingInSeconds?: number;
}
export interface PutRuntimeLogConfigurationRequest {
  ManagedThingId: string;
  RuntimeLogConfigurations: RuntimeLogConfigurations;
}
export interface PutRuntimeLogConfigurationResponse {}
export interface RegisterAccountAssociationRequest {
  ManagedThingId: string;
  AccountAssociationId: string;
  DeviceDiscoveryId: string;
}
export interface RegisterAccountAssociationResponse {
  AccountAssociationId?: string;
  DeviceDiscoveryId?: string;
  ManagedThingId?: string;
}
export interface RegisterCustomEndpointRequest {}
export interface RegisterCustomEndpointResponse {
  EndpointAddress: string;
}
export interface ResetRuntimeLogConfigurationRequest {
  ManagedThingId: string;
}
export interface ResetRuntimeLogConfigurationResponse {}
export type ConnectorId = string;
export type ThirdPartyUserId = string | redacted.Redacted<string>;
export type ConnectorEventOperation =
  | "DEVICE_COMMAND_RESPONSE"
  | "DEVICE_DISCOVERY"
  | "DEVICE_EVENT"
  | "DEVICE_COMMAND_REQUEST"
  | (string & {});
export type ConnectorEventOperationVersion = string;
export type ConnectorEventStatusCode = number;
export type ConnectorEventMessage = string | redacted.Redacted<string>;
export type TraceId = string;
export type ClusterId = string;
export type SpecVersion = string;
export type MatterAttributeId = string;
export type MatterCapabilityReportAttributeValue = unknown;
export interface MatterCapabilityReportAttribute {
  id?: string;
  name?: string;
  value?: any;
}
export type MatterCapabilityReportAttributes = MatterCapabilityReportAttribute[];
export type MatterCommandId = string;
export type MatterCapabilityReportCommands = string[];
export type MatterEventId = string;
export type MatterCapabilityReportEvents = string[];
export type MatterCapabilityReportFeatureMap = number;
export type MatterCapabilityReportGeneratedCommands = string[];
export type MatterCapabilityReportFabricIndex = number;
export interface MatterCapabilityReportCluster {
  id: string;
  revision: number;
  publicId?: string;
  name?: string;
  specVersion?: string;
  attributes?: MatterCapabilityReportAttribute[];
  commands?: string[];
  events?: string[];
  featureMap?: number;
  generatedCommands?: string[];
  fabricIndex?: number;
}
export type MatterCapabilityReportClusters = MatterCapabilityReportCluster[];
export type MatterCapabilityReportEndpointParts = string[];
export type EndpointSemanticTag = string;
export type MatterCapabilityReportEndpointSemanticTags = string[];
export type MatterCapabilityReportEndpointClientClusters = string[];
export interface MatterCapabilityReportEndpoint {
  id: string;
  deviceTypes: string[];
  clusters: MatterCapabilityReportCluster[];
  parts?: string[];
  semanticTags?: string[];
  clientClusters?: string[];
}
export type MatterCapabilityReportEndpoints = MatterCapabilityReportEndpoint[];
export interface MatterCapabilityReport {
  version: string;
  nodeId?: string;
  endpoints: MatterCapabilityReportEndpoint[];
}
export type DeviceMetadata = unknown;
export interface Device {
  ConnectorDeviceId: string | redacted.Redacted<string>;
  ConnectorDeviceName?: string;
  CapabilityReport: MatterCapabilityReport;
  CapabilitySchemas?: CapabilitySchemaItem[];
  DeviceMetadata?: any;
}
export type Devices = Device[];
export type MatterAttributes = unknown;
export type MatterFields = unknown;
export type MatterCommands = { [key: string]: any | undefined };
export type MatterEvents = { [key: string]: any | undefined };
export interface MatterCluster {
  id?: string;
  attributes?: any;
  commands?: { [key: string]: any | undefined };
  events?: { [key: string]: any | undefined };
}
export type MatterClusters = MatterCluster[];
export interface MatterEndpoint {
  id?: string;
  clusters?: MatterCluster[];
}
export interface SendConnectorEventRequest {
  ConnectorId: string;
  UserId?: string | redacted.Redacted<string>;
  Operation: ConnectorEventOperation;
  OperationVersion?: string;
  StatusCode?: number;
  Message?: string | redacted.Redacted<string>;
  DeviceDiscoveryId?: string;
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  TraceId?: string;
  Devices?: Device[];
  MatterEndpoint?: MatterEndpoint;
}
export interface SendConnectorEventResponse {
  ConnectorId: string;
}
export type CapabilityActionName = string;
export type ActionReference = string;
export type ActionTraceId = string;
export interface CapabilityAction {
  name: string;
  ref?: string;
  actionTraceId?: string;
  parameters?: any;
}
export type CapabilityActions = CapabilityAction[];
export interface CommandCapability {
  id: string;
  name: string;
  version: string;
  actions: CapabilityAction[];
}
export type CommandCapabilities = CommandCapability[];
export interface CommandEndpoint {
  endpointId: string;
  capabilities: CommandCapability[];
}
export type CommandEndpoints = CommandEndpoint[];
export interface SendManagedThingCommandRequest {
  ManagedThingId: string;
  Endpoints: CommandEndpoint[];
  ConnectorAssociationId?: string;
  AccountAssociationId?: string;
}
export interface SendManagedThingCommandResponse {
  TraceId?: string;
}
export interface StartAccountAssociationRefreshRequest {
  AccountAssociationId: string;
}
export interface StartAccountAssociationRefreshResponse {
  OAuthAuthorizationUrl: string | redacted.Redacted<string>;
}
export type CustomProtocolDetailKey = string;
export type CustomProtocolDetailValue = string;
export type CustomProtocolDetail = { [key: string]: string | undefined };
export type DiscoveryAuthMaterialString = string | redacted.Redacted<string>;
export type DiscoveryAuthMaterialType = "ZWAVE_INSTALL_CODE" | (string & {});
export type ConnectorDeviceIdList = (string | redacted.Redacted<string>)[];
export type ProtocolType = "ZWAVE" | "ZIGBEE" | "CUSTOM" | (string & {});
export interface StartDeviceDiscoveryRequest {
  DiscoveryType: DiscoveryType;
  CustomProtocolDetail?: { [key: string]: string | undefined };
  ControllerIdentifier?: string;
  ConnectorAssociationIdentifier?: string;
  AccountAssociationId?: string;
  AuthenticationMaterial?: string | redacted.Redacted<string>;
  AuthenticationMaterialType?: DiscoveryAuthMaterialType;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  ConnectorDeviceIdList?: (string | redacted.Redacted<string>)[];
  Protocol?: ProtocolType;
  EndDeviceIdentifier?: string;
}
export interface StartDeviceDiscoveryResponse {
  Id?: string;
  StartedAt?: Date;
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
export interface UpdateAccountAssociationRequest {
  AccountAssociationId: string;
  Name?: string;
  Description?: string;
}
export interface UpdateAccountAssociationResponse {}
export interface UpdateCloudConnectorRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
}
export interface UpdateCloudConnectorResponse {}
export interface OAuthUpdate {
  oAuthCompleteRedirectUrl?: string;
  proactiveRefreshTokenRenewal?: ProactiveRefreshTokenRenewal;
}
export interface GeneralAuthorizationUpdate {
  AuthMaterialsToAdd?: AuthMaterial[];
  AuthMaterialsToUpdate?: AuthMaterial[];
}
export interface AuthConfigUpdate {
  oAuthUpdate?: OAuthUpdate;
  GeneralAuthorizationUpdate?: GeneralAuthorizationUpdate;
}
export interface UpdateConnectorDestinationRequest {
  Identifier: string;
  Description?: string;
  Name?: string;
  AuthType?: AuthType;
  AuthConfig?: AuthConfigUpdate;
  SecretsManager?: SecretsManager;
}
export interface UpdateConnectorDestinationResponse {}
export interface UpdateDestinationRequest {
  Name: string;
  DeliveryDestinationArn?: string;
  DeliveryDestinationType?: DeliveryDestinationType;
  RoleArn?: string;
  Description?: string;
}
export interface UpdateDestinationResponse {}
export interface UpdateEventLogConfigurationRequest {
  Id: string;
  EventLogLevel: LogLevel;
}
export interface UpdateEventLogConfigurationResponse {}
export interface UpdateManagedThingRequest {
  Identifier: string;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  SerialNumber?: string | redacted.Redacted<string>;
  WiFiSimpleSetupConfiguration?: WiFiSimpleSetupConfiguration;
  Brand?: string | redacted.Redacted<string>;
  Model?: string | redacted.Redacted<string>;
  Name?: string;
  CapabilityReport?: CapabilityReport;
  CapabilitySchemas?: CapabilitySchemaItem[];
  Capabilities?: string;
  Classification?: string | redacted.Redacted<string>;
  HubNetworkMode?: HubNetworkMode;
  MetaData?: { [key: string]: string | undefined };
}
export interface UpdateManagedThingResponse {}
export interface UpdateNotificationConfigurationRequest {
  EventType: EventType;
  DestinationName: string;
}
export interface UpdateNotificationConfigurationResponse {}
export interface UpdateOtaTaskRequest {
  Identifier: string;
  Description?: string;
  TaskConfigurationId?: string;
}
export interface UpdateOtaTaskResponse {}
export type ErrorMessage = string;
export type ErrorResourceId = string;
export type ErrorResourceType = string;
export type CreateAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new account association via the destination id.
 */
export const createAccountAssociation: API.OperationMethod<
  CreateAccountAssociationRequest,
  CreateAccountAssociationResponse,
  CreateAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAccountAssociationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateAccountAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountAssociation",
}));

export type CreateCloudConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a C2C (cloud-to-cloud) connector.
 */
export const createCloudConnector: API.OperationMethod<
  CreateCloudConnectorRequest,
  CreateCloudConnectorResponse,
  CreateCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateCloudConnectorRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<CreateCloudConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudConnector",
}));

export type CreateConnectorDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Create a connector destination for connecting a cloud-to-cloud (C2C) connector to the customer's Amazon Web Services account.
 */
export const createConnectorDestination: API.OperationMethod<
  CreateConnectorDestinationRequest,
  CreateConnectorDestinationResponse,
  CreateConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateConnectorDestinationRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<CreateConnectorDestinationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDestination",
}));

export type CreateCredentialLockerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a credential locker.
 *
 * This operation will not trigger the creation of all the manufacturing resources.
 */
export const createCredentialLocker: API.OperationMethod<
  CreateCredentialLockerRequest,
  CreateCredentialLockerResponse,
  CreateCredentialLockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateCredentialLockerRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<CreateCredentialLockerResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCredentialLocker",
}));

export type CreateDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a notification destination such as Kinesis Data Streams that receive events and notifications from Managed integrations. Managed integrations uses the destination to determine where to deliver notifications.
 */
export const createDestination: API.OperationMethod<
  CreateDestinationRequest,
  CreateDestinationResponse,
  CreateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateDestinationRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<CreateDestinationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDestination",
}));

export type CreateEventLogConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the event log configuration for the account, resource type, or specific resource.
 */
export const createEventLogConfiguration: API.OperationMethod<
  CreateEventLogConfigurationRequest,
  CreateEventLogConfigurationResponse,
  CreateEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateEventLogConfigurationRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<CreateEventLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventLogConfiguration",
}));

export type CreateManagedThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a managed thing. A managed thing contains the device identifier, protocol supported, and capabilities of the device in a data model format defined by Managed integrations.
 */
export const createManagedThing: API.OperationMethod<
  CreateManagedThingRequest,
  CreateManagedThingResponse,
  CreateManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<CreateManagedThingRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<CreateManagedThingResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedThing",
}));

export type CreateNotificationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a notification configuration. A configuration is a connection between an event type and a destination that you have already created.
 */
export const createNotificationConfiguration: API.OperationMethod<
  CreateNotificationConfigurationRequest,
  CreateNotificationConfigurationResponse,
  CreateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreateNotificationConfigurationRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<CreateNotificationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationConfiguration",
}));

export type CreateOtaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Create an over-the-air (OTA) task to target a device.
 */
export const createOtaTask: API.OperationMethod<
  CreateOtaTaskRequest,
  CreateOtaTaskResponse,
  CreateOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<CreateOtaTaskRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<CreateOtaTaskResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOtaTask",
}));

export type CreateOtaTaskConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a configuraiton for the over-the-air (OTA) task.
 */
export const createOtaTaskConfiguration: API.OperationMethod<
  CreateOtaTaskConfigurationRequest,
  CreateOtaTaskConfigurationResponse,
  CreateOtaTaskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateOtaTaskConfigurationRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateOtaTaskConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOtaTaskConfiguration",
}));

export type CreateProvisioningProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Create a provisioning profile for executing device provisioning flows. The provisioning profile is a document that defines the set of resources and policies applied to a device during the provisioning process.
 */
export const createProvisioningProfile: API.OperationMethod<
  CreateProvisioningProfileRequest,
  CreateProvisioningProfileResponse,
  CreateProvisioningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<CreateProvisioningProfileRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<CreateProvisioningProfileResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningProfile",
}));

export type DeleteAccountAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a third-party account association for an end user.
 *
 * You must first call the `DeregisterAccountAssociation` to remove the connection between the managed thing and the third-party account before calling the `DeleteAccountAssociation` API.
 */
export const deleteAccountAssociation: API.OperationMethod<
  DeleteAccountAssociationRequest,
  DeleteAccountAssociationResponse,
  DeleteAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DeleteAccountAssociationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteAccountAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAssociation",
}));

export type DeleteCloudConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a cloud connector.
 */
export const deleteCloudConnector: API.OperationMethod<
  DeleteCloudConnectorRequest,
  DeleteCloudConnectorResponse,
  DeleteCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteCloudConnectorRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteCloudConnectorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudConnector",
}));

export type DeleteConnectorDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a connector destination linked to a cloud-to-cloud (C2C) connector.
 *
 * Deletion can't be done if the account association has used this connector destination.
 */
export const deleteConnectorDestination: API.OperationMethod<
  DeleteConnectorDestinationRequest,
  DeleteConnectorDestinationResponse,
  DeleteConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteConnectorDestinationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteConnectorDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectorDestination",
}));

export type DeleteCredentialLockerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a credential locker.
 *
 * This operation can't be undone and any existing device won't be able to use IoT managed integrations.
 */
export const deleteCredentialLocker: API.OperationMethod<
  DeleteCredentialLockerRequest,
  DeleteCredentialLockerResponse,
  DeleteCredentialLockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteCredentialLockerRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteCredentialLockerResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCredentialLocker",
}));

export type DeleteDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notification destination specified by name.
 */
export const deleteDestination: API.OperationMethod<
  DeleteDestinationRequest,
  DeleteDestinationResponse,
  DeleteDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteDestinationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDestination",
}));

export type DeleteEventLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an event log configuration.
 */
export const deleteEventLogConfiguration: API.OperationMethod<
  DeleteEventLogConfigurationRequest,
  DeleteEventLogConfigurationResponse,
  DeleteEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteEventLogConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteEventLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventLogConfiguration",
}));

export type DeleteManagedThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a managed thing. For direct-connected and hub-connected devices connecting with Managed integrations via a controller, all of the devices connected to it will have their status changed to `PENDING`. It is not possible to remove a cloud-to-cloud device.
 */
export const deleteManagedThing: API.OperationMethod<
  DeleteManagedThingRequest,
  DeleteManagedThingResponse,
  DeleteManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteManagedThingRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteManagedThingResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedThing",
}));

export type DeleteNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notification configuration.
 */
export const deleteNotificationConfiguration: API.OperationMethod<
  DeleteNotificationConfigurationRequest,
  DeleteNotificationConfigurationResponse,
  DeleteNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteNotificationConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteNotificationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationConfiguration",
}));

export type DeleteOtaTaskError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the over-the-air (OTA) task.
 */
export const deleteOtaTask: API.OperationMethod<
  DeleteOtaTaskRequest,
  DeleteOtaTaskResponse,
  DeleteOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DeleteOtaTaskRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteOtaTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOtaTask",
}));

export type DeleteOtaTaskConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the over-the-air (OTA) task configuration.
 */
export const deleteOtaTaskConfiguration: API.OperationMethod<
  DeleteOtaTaskConfigurationRequest,
  DeleteOtaTaskConfigurationResponse,
  DeleteOtaTaskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<DeleteOtaTaskConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteOtaTaskConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOtaTaskConfiguration",
}));

export type DeleteProvisioningProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a provisioning profile.
 */
export const deleteProvisioningProfile: API.OperationMethod<
  DeleteProvisioningProfileRequest,
  DeleteProvisioningProfileResponse,
  DeleteProvisioningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DeleteProvisioningProfileRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteProvisioningProfileResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningProfile",
}));

export type DeregisterAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregister an account association from a managed thing.
 */
export const deregisterAccountAssociation: API.OperationMethod<
  DeregisterAccountAssociationRequest,
  DeregisterAccountAssociationResponse,
  DeregisterAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<DeregisterAccountAssociationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeregisterAccountAssociationResponse>,
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
  operationName: "DeregisterAccountAssociation",
}));

export type GetAccountAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an account association for an Amazon Web Services account linked to a customer-managed destination.
 */
export const getAccountAssociation: API.OperationMethod<
  GetAccountAssociationRequest,
  GetAccountAssociationResponse,
  GetAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<GetAccountAssociationRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<GetAccountAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountAssociation",
}));

export type GetCloudConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get configuration details for a cloud connector.
 */
export const getCloudConnector: API.OperationMethod<
  GetCloudConnectorRequest,
  GetCloudConnectorResponse,
  GetCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<GetCloudConnectorRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<GetCloudConnectorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudConnector",
}));

export type GetConnectorDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get connector destination details linked to a cloud-to-cloud (C2C) connector.
 */
export const getConnectorDestination: API.OperationMethod<
  GetConnectorDestinationRequest,
  GetConnectorDestinationResponse,
  GetConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<GetConnectorDestinationRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<GetConnectorDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDestination",
}));

export type GetCredentialLockerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information on an existing credential locker
 */
export const getCredentialLocker: API.OperationMethod<
  GetCredentialLockerRequest,
  GetCredentialLockerResponse,
  GetCredentialLockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<GetCredentialLockerRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<GetCredentialLockerResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentialLocker",
}));

export type GetCustomEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the IoT managed integrations custom endpoint.
 */
export const getCustomEndpoint: API.OperationMethod<
  GetCustomEndpointRequest,
  GetCustomEndpointResponse,
  GetCustomEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<GetCustomEndpointRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<GetCustomEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomEndpoint",
}));

export type GetDefaultEncryptionConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the default encryption configuration for the Amazon Web Services account in the default or specified region. For more information, see Key management in the *AWS IoT SiteWise User Guide*.
 */
export const getDefaultEncryptionConfiguration: API.OperationMethod<
  GetDefaultEncryptionConfigurationRequest,
  GetDefaultEncryptionConfigurationResponse,
  GetDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetDefaultEncryptionConfigurationRequest>,
  output: __S(722, __c45, 2) as any as S.Schema<GetDefaultEncryptionConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultEncryptionConfiguration",
}));

export type GetDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a destination by name.
 */
export const getDestination: API.OperationMethod<
  GetDestinationRequest,
  GetDestinationResponse,
  GetDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<GetDestinationRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<GetDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDestination",
}));

export type GetDeviceDiscoveryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the current state of a device discovery.
 */
export const getDeviceDiscovery: API.OperationMethod<
  GetDeviceDiscoveryRequest,
  GetDeviceDiscoveryResponse,
  GetDeviceDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<GetDeviceDiscoveryRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<GetDeviceDiscoveryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDiscovery",
}));

export type GetEventLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an event log configuration.
 */
export const getEventLogConfiguration: API.OperationMethod<
  GetEventLogConfigurationRequest,
  GetEventLogConfigurationResponse,
  GetEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<GetEventLogConfigurationRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<GetEventLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventLogConfiguration",
}));

export type GetHubConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a hub configuration.
 */
export const getHubConfiguration: API.OperationMethod<
  GetHubConfigurationRequest,
  GetHubConfigurationResponse,
  GetHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<GetHubConfigurationRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<GetHubConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHubConfiguration",
}));

export type GetManagedThingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get details of a managed thing including its attributes and capabilities.
 */
export const getManagedThing: API.OperationMethod<
  GetManagedThingRequest,
  GetManagedThingResponse,
  GetManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<GetManagedThingRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<GetManagedThingResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThing",
}));

export type GetManagedThingCapabilitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the capabilities for a managed thing using the device ID.
 */
export const getManagedThingCapabilities: API.OperationMethod<
  GetManagedThingCapabilitiesRequest,
  GetManagedThingCapabilitiesResponse,
  GetManagedThingCapabilitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<GetManagedThingCapabilitiesRequest>,
  output: __S(833, __c52, 1) as any as S.Schema<GetManagedThingCapabilitiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingCapabilities",
}));

export type GetManagedThingCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the certificate PEM for a managed IoT thing.
 */
export const getManagedThingCertificate: API.OperationMethod<
  GetManagedThingCertificateRequest,
  GetManagedThingCertificateResponse,
  GetManagedThingCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<GetManagedThingCertificateRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<GetManagedThingCertificateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingCertificate",
}));

export type GetManagedThingConnectivityDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the connectivity status of a managed thing.
 */
export const getManagedThingConnectivityData: API.OperationMethod<
  GetManagedThingConnectivityDataRequest,
  GetManagedThingConnectivityDataResponse,
  GetManagedThingConnectivityDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<GetManagedThingConnectivityDataRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<GetManagedThingConnectivityDataResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingConnectivityData",
}));

export type GetManagedThingMetaDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the metadata information for a managed thing.
 *
 * The `managedThing` `metadata` parameter is used for associating attributes with a `managedThing` that can be used for grouping over-the-air (OTA) tasks. Name value pairs in `metadata` can be used in the `OtaTargetQueryString` parameter for the `CreateOtaTask` API operation.
 */
export const getManagedThingMetaData: API.OperationMethod<
  GetManagedThingMetaDataRequest,
  GetManagedThingMetaDataResponse,
  GetManagedThingMetaDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<GetManagedThingMetaDataRequest>,
  output: __S(881, __c55, 1) as any as S.Schema<GetManagedThingMetaDataResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingMetaData",
}));

export type GetManagedThingStateError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the managed thing state for the given device Id.
 */
export const getManagedThingState: API.OperationMethod<
  GetManagedThingStateRequest,
  GetManagedThingStateResponse,
  GetManagedThingStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<GetManagedThingStateRequest>,
  output: __S(901, __c56, 5) as any as S.Schema<GetManagedThingStateResponse>,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingState",
}));

export type GetNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a notification configuration for a specified event type.
 */
export const getNotificationConfiguration: API.OperationMethod<
  GetNotificationConfigurationRequest,
  GetNotificationConfigurationResponse,
  GetNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<GetNotificationConfigurationRequest>,
  output: __S(913, __c57, 1) as any as S.Schema<GetNotificationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationConfiguration",
}));

export type GetOtaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details of the over-the-air (OTA) task by its task id.
 */
export const getOtaTask: API.OperationMethod<
  GetOtaTaskRequest,
  GetOtaTaskResponse,
  GetOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<GetOtaTaskRequest>,
  output: __S(930, __c58, 2) as any as S.Schema<GetOtaTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOtaTask",
}));

export type GetOtaTaskConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a configuraiton for the over-the-air (OTA) task.
 */
export const getOtaTaskConfiguration: API.OperationMethod<
  GetOtaTaskConfigurationRequest,
  GetOtaTaskConfigurationResponse,
  GetOtaTaskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<GetOtaTaskConfigurationRequest>,
  output: __S(945, __c59, 1) as any as S.Schema<GetOtaTaskConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOtaTaskConfiguration",
}));

export type GetProvisioningProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get details of a provisioning profile.
 */
export const getProvisioningProfile: API.OperationMethod<
  GetProvisioningProfileRequest,
  GetProvisioningProfileResponse,
  GetProvisioningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<GetProvisioningProfileRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<GetProvisioningProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisioningProfile",
}));

export type GetRuntimeLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the runtime log configuration for a specific managed thing.
 */
export const getRuntimeLogConfiguration: API.OperationMethod<
  GetRuntimeLogConfigurationRequest,
  GetRuntimeLogConfigurationResponse,
  GetRuntimeLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<GetRuntimeLogConfigurationRequest>,
  output: __S(977, __c61, 1) as any as S.Schema<GetRuntimeLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeLogConfiguration",
}));

export type GetSchemaVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a schema version with the provided information.
 */
export const getSchemaVersion: API.OperationMethod<
  GetSchemaVersionRequest,
  GetSchemaVersionResponse,
  GetSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<GetSchemaVersionRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<GetSchemaVersionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersion",
}));

export type ListAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all account associations, with optional filtering by connector destination ID.
 */
export const listAccountAssociations: API.PaginatedOperationMethod<
  ListAccountAssociationsRequest,
  ListAccountAssociationsResponse,
  ListAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  AccountAssociationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<ListAccountAssociationsRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListAccountAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of connectors filtered by its Lambda Amazon Resource Name (ARN) and `type`.
 */
export const listCloudConnectors: API.PaginatedOperationMethod<
  ListCloudConnectorsRequest,
  ListCloudConnectorsResponse,
  ListCloudConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<ListCloudConnectorsRequest>,
  output: __S(1042, __c65, 2) as any as S.Schema<ListCloudConnectorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectorDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all connector destinations, with optional filtering by cloud connector ID.
 */
export const listConnectorDestinations: API.PaginatedOperationMethod<
  ListConnectorDestinationsRequest,
  ListConnectorDestinationsResponse,
  ListConnectorDestinationsError,
  Credentials | HttpClient.HttpClient,
  ConnectorDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<ListConnectorDestinationsRequest>,
  output: __S(1059, __c66, 3) as any as S.Schema<ListConnectorDestinationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectorDestinationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCredentialLockersError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List information on an existing credential locker.
 */
export const listCredentialLockers: API.PaginatedOperationMethod<
  ListCredentialLockersRequest,
  ListCredentialLockersResponse,
  ListCredentialLockersError,
  Credentials | HttpClient.HttpClient,
  CredentialLockerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<ListCredentialLockersRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListCredentialLockersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCredentialLockers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all notification destinations.
 */
export const listDestinations: API.PaginatedOperationMethod<
  ListDestinationsRequest,
  ListDestinationsResponse,
  ListDestinationsError,
  Credentials | HttpClient.HttpClient,
  DestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<ListDestinationsRequest>,
  output: __S(1091, __c68, 3) as any as S.Schema<ListDestinationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DestinationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeviceDiscoveriesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all device discovery tasks, with optional filtering by type and status.
 */
export const listDeviceDiscoveries: API.PaginatedOperationMethod<
  ListDeviceDiscoveriesRequest,
  ListDeviceDiscoveriesResponse,
  ListDeviceDiscoveriesError,
  Credentials | HttpClient.HttpClient,
  DeviceDiscoverySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<ListDeviceDiscoveriesRequest>,
  output: __S(1107, __c69, 3) as any as S.Schema<ListDeviceDiscoveriesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDiscoveries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all devices discovered during a specific device discovery task.
 */
export const listDiscoveredDevices: API.PaginatedOperationMethod<
  ListDiscoveredDevicesRequest,
  ListDiscoveredDevicesResponse,
  ListDiscoveredDevicesError,
  Credentials | HttpClient.HttpClient,
  DiscoveredDeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<ListDiscoveredDevicesRequest>,
  output: __S(1123, __c70, 3) as any as S.Schema<ListDiscoveredDevicesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventLogConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all event log configurations for an account.
 */
export const listEventLogConfigurations: API.PaginatedOperationMethod<
  ListEventLogConfigurationsRequest,
  ListEventLogConfigurationsResponse,
  ListEventLogConfigurationsError,
  Credentials | HttpClient.HttpClient,
  EventLogConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<ListEventLogConfigurationsRequest>,
  output: __S(1138, __c71, 2) as any as S.Schema<ListEventLogConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventLogConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventLogConfigurationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedThingAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all account associations for a specific managed thing.
 */
export const listManagedThingAccountAssociations: API.PaginatedOperationMethod<
  ListManagedThingAccountAssociationsRequest,
  ListManagedThingAccountAssociationsResponse,
  ListManagedThingAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  ManagedThingAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<ListManagedThingAccountAssociationsRequest>,
  output: __S(1155, __c72, 3) as any as S.Schema<ListManagedThingAccountAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedThingAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedThingsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Listing all managed things with provision for filters.
 */
export const listManagedThings: API.PaginatedOperationMethod<
  ListManagedThingsRequest,
  ListManagedThingsResponse,
  ListManagedThingsError,
  Credentials | HttpClient.HttpClient,
  ManagedThingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<ListManagedThingsRequest>,
  output: __S(1171, __c73, 3) as any as S.Schema<ListManagedThingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedThings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedThingSchemasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * List schemas associated with a managed thing.
 */
export const listManagedThingSchemas: API.PaginatedOperationMethod<
  ListManagedThingSchemasRequest,
  ListManagedThingSchemasResponse,
  ListManagedThingSchemasError,
  Credentials | HttpClient.HttpClient,
  ManagedThingSchemaListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<ListManagedThingSchemasRequest>,
  output: __S(1187, __c74, 3) as any as S.Schema<ListManagedThingSchemasResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedThingSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all notification configurations.
 */
export const listNotificationConfigurations: API.PaginatedOperationMethod<
  ListNotificationConfigurationsRequest,
  ListNotificationConfigurationsResponse,
  ListNotificationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotificationConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<ListNotificationConfigurationsRequest>,
  output: __S(1203, __c75, 3) as any as S.Schema<ListNotificationConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotificationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotificationConfigurationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOtaTaskConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all of the over-the-air (OTA) task configurations.
 */
export const listOtaTaskConfigurations: API.PaginatedOperationMethod<
  ListOtaTaskConfigurationsRequest,
  ListOtaTaskConfigurationsResponse,
  ListOtaTaskConfigurationsError,
  Credentials | HttpClient.HttpClient,
  OtaTaskConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<ListOtaTaskConfigurationsRequest>,
  output: __S(1219, __c76, 3) as any as S.Schema<ListOtaTaskConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOtaTaskConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOtaTaskExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all of the over-the-air (OTA) task executions.
 */
export const listOtaTaskExecutions: API.PaginatedOperationMethod<
  ListOtaTaskExecutionsRequest,
  ListOtaTaskExecutionsResponse,
  ListOtaTaskExecutionsError,
  Credentials | HttpClient.HttpClient,
  OtaTaskExecutionSummaries
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<ListOtaTaskExecutionsRequest>,
  output: __S(1236, __c77, 4) as any as S.Schema<ListOtaTaskExecutionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOtaTaskExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExecutionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOtaTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all of the over-the-air (OTA) tasks.
 */
export const listOtaTasks: API.PaginatedOperationMethod<
  ListOtaTasksRequest,
  ListOtaTasksResponse,
  ListOtaTasksError,
  Credentials | HttpClient.HttpClient,
  OtaTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<ListOtaTasksRequest>,
  output: __S(1251, __c78, 3) as any as S.Schema<ListOtaTasksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOtaTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProvisioningProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * List the provisioning profiles within the Amazon Web Services account.
 */
export const listProvisioningProfiles: API.PaginatedOperationMethod<
  ListProvisioningProfilesRequest,
  ListProvisioningProfilesResponse,
  ListProvisioningProfilesError,
  Credentials | HttpClient.HttpClient,
  ProvisioningProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<ListProvisioningProfilesRequest>,
  output: __S(1267, __c79, 3) as any as S.Schema<ListProvisioningProfilesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemaVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists schema versions with the provided information.
 */
export const listSchemaVersions: API.PaginatedOperationMethod<
  ListSchemaVersionsRequest,
  ListSchemaVersionsResponse,
  ListSchemaVersionsError,
  Credentials | HttpClient.HttpClient,
  SchemaVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<ListSchemaVersionsRequest>,
  output: __S(1283, __c80, 3) as any as S.Schema<ListSchemaVersionsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the tags for a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1297, __c81, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutDefaultEncryptionConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Sets the default encryption configuration for the Amazon Web Services account. For more information, see Key management in the AWS IoT SiteWise User Guide.
 */
export const putDefaultEncryptionConfiguration: API.OperationMethod<
  PutDefaultEncryptionConfigurationRequest,
  PutDefaultEncryptionConfigurationResponse,
  PutDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<PutDefaultEncryptionConfigurationRequest>,
  output: __S(722, __c45, 2) as any as S.Schema<PutDefaultEncryptionConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDefaultEncryptionConfiguration",
}));

export type PutHubConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a hub configuration.
 */
export const putHubConfiguration: API.OperationMethod<
  PutHubConfigurationRequest,
  PutHubConfigurationResponse,
  PutHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<PutHubConfigurationRequest>,
  output: __S(1329, __c83, 1) as any as S.Schema<PutHubConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutHubConfiguration",
}));

export type PutRuntimeLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the runtime log configuration for a specific managed thing.
 */
export const putRuntimeLogConfiguration: API.OperationMethod<
  PutRuntimeLogConfigurationRequest,
  PutRuntimeLogConfigurationResponse,
  PutRuntimeLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<PutRuntimeLogConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<PutRuntimeLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRuntimeLogConfiguration",
}));

export type RegisterAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers an account association with a managed thing, establishing a connection between a device and a third-party account.
 */
export const registerAccountAssociation: API.OperationMethod<
  RegisterAccountAssociationRequest,
  RegisterAccountAssociationResponse,
  RegisterAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<RegisterAccountAssociationRequest>,
  output: __S(1361, __c85, 1) as any as S.Schema<RegisterAccountAssociationResponse>,
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
  operationName: "RegisterAccountAssociation",
}));

export type RegisterCustomEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Customers can request IoT managed integrations to manage the server trust for them or bring their own external server trusts for the custom domain. Returns an IoT managed integrations endpoint.
 */
export const registerCustomEndpoint: API.OperationMethod<
  RegisterCustomEndpointRequest,
  RegisterCustomEndpointResponse,
  RegisterCustomEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<RegisterCustomEndpointRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<RegisterCustomEndpointResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCustomEndpoint",
}));

export type ResetRuntimeLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reset a runtime log configuration for a specific managed thing.
 */
export const resetRuntimeLogConfiguration: API.OperationMethod<
  ResetRuntimeLogConfigurationRequest,
  ResetRuntimeLogConfigurationResponse,
  ResetRuntimeLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<ResetRuntimeLogConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<ResetRuntimeLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetRuntimeLogConfiguration",
}));

export type SendConnectorEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Relays third-party device events for a connector such as a new device or a device state change event.
 */
export const sendConnectorEvent: API.OperationMethod<
  SendConnectorEventRequest,
  SendConnectorEventResponse,
  SendConnectorEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1421, __c88, 13) as any as S.Schema<SendConnectorEventRequest>,
  output: __S(1422, __c88, 14) as any as S.Schema<SendConnectorEventResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendConnectorEvent",
}));

export type SendManagedThingCommandError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Send the command to the device represented by the managed thing.
 */
export const sendManagedThingCommand: API.OperationMethod<
  SendManagedThingCommandRequest,
  SendManagedThingCommandResponse,
  SendManagedThingCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1430, __c89, 6) as any as S.Schema<SendManagedThingCommandRequest>,
  output: __S(1431, __c89, 7) as any as S.Schema<SendManagedThingCommandResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendManagedThingCommand",
}));

export type StartAccountAssociationRefreshError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a refresh of an existing account association to update its authorization and connection status.
 */
export const startAccountAssociationRefresh: API.OperationMethod<
  StartAccountAssociationRefreshRequest,
  StartAccountAssociationRefreshResponse,
  StartAccountAssociationRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<StartAccountAssociationRefreshRequest>,
  output: __S(1441, __c90, 1) as any as S.Schema<StartAccountAssociationRefreshResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccountAssociationRefresh",
}));

export type StartDeviceDiscoveryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to start device discovery for hub-connected and third-party-connected devices. The authentication material (install code) is delivered as a message to the controller instructing it to start the discovery.
 */
export const startDeviceDiscovery: API.OperationMethod<
  StartDeviceDiscoveryRequest,
  StartDeviceDiscoveryResponse,
  StartDeviceDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1457, __c91, 1) as any as S.Schema<StartDeviceDiscoveryRequest>,
  output: __S(1458, __c91, 2) as any as S.Schema<StartDeviceDiscoveryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeviceDiscovery",
}));

export type TagResourceError =
  | ConflictException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds tags to a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ConflictException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes tags from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    ConflictException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an existing account association.
 */
export const updateAccountAssociation: API.OperationMethod<
  UpdateAccountAssociationRequest,
  UpdateAccountAssociationResponse,
  UpdateAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<UpdateAccountAssociationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateAccountAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountAssociation",
}));

export type UpdateCloudConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing cloud connector.
 */
export const updateCloudConnector: API.OperationMethod<
  UpdateCloudConnectorRequest,
  UpdateCloudConnectorResponse,
  UpdateCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<UpdateCloudConnectorRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateCloudConnectorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudConnector",
}));

export type UpdateConnectorDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an existing connector destination.
 */
export const updateConnectorDestination: API.OperationMethod<
  UpdateConnectorDestinationRequest,
  UpdateConnectorDestinationResponse,
  UpdateConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1539, __c96, 3) as any as S.Schema<UpdateConnectorDestinationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateConnectorDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorDestination",
}));

export type UpdateDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a destination specified by name.
 */
export const updateDestination: API.OperationMethod<
  UpdateDestinationRequest,
  UpdateDestinationResponse,
  UpdateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<UpdateDestinationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateDestinationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDestination",
}));

export type UpdateEventLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an event log configuration by log configuration ID.
 */
export const updateEventLogConfiguration: API.OperationMethod<
  UpdateEventLogConfigurationRequest,
  UpdateEventLogConfigurationResponse,
  UpdateEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<UpdateEventLogConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateEventLogConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventLogConfiguration",
}));

export type UpdateManagedThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Update the attributes and capabilities associated with a managed thing.
 */
export const updateManagedThing: API.OperationMethod<
  UpdateManagedThingRequest,
  UpdateManagedThingResponse,
  UpdateManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<UpdateManagedThingRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateManagedThingResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedThing",
}));

export type UpdateNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a notification configuration.
 */
export const updateNotificationConfiguration: API.OperationMethod<
  UpdateNotificationConfigurationRequest,
  UpdateNotificationConfigurationResponse,
  UpdateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<UpdateNotificationConfigurationRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateNotificationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationConfiguration",
}));

export type UpdateOtaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an over-the-air (OTA) task.
 */
export const updateOtaTask: API.OperationMethod<
  UpdateOtaTaskRequest,
  UpdateOtaTaskResponse,
  UpdateOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<UpdateOtaTaskRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateOtaTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOtaTask",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ConnectorDestinationId: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(16, __c1, 0)),
          GeneralAuthorization: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/account-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAccountAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OAuthAuthorizationUrl: SensitiveString,
          AccountAssociationId: S.String,
          AssociationState: S.String,
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAccountAssociationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AuthMaterialName: S.optional(S.String) })).annotate({
        identifier: "GeneralAuthorizationName",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EndpointConfig: __S(81, __c5, 1),
          Description: S.optional(S.String),
          EndpointType: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/cloud-connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCloudConnectorRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "CreateCloudConnectorResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({ identifier: "LambdaConfig" });
    case 1:
      return S.suspend(() => S.Struct({ lambda: S.optional(__S(80, __c5, 0)) })).annotate({
        identifier: "EndpointConfig",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CloudConnectorId: S.String,
          AuthType: S.optional(S.String),
          AuthConfig: __S(113, __c7, 1),
          SecretsManager: S.optional(__S(129, __c8, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/connector-destinations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectorDestinationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authUrl: S.String,
          tokenUrl: S.String,
          scope: S.optional(S.String),
          tokenEndpointAuthenticationScheme: S.String,
          oAuthCompleteRedirectUrl: S.optional(S.String),
          proactiveRefreshTokenRenewal: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "OAuthConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          oAuth: S.optional(__S(112, __c7, 0)),
          GeneralAuthorization: S.optional(__S(131, __c8, 3)),
        }),
      ).annotate({ identifier: "AuthConfig" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), DaysBeforeRenewal: S.optional(S.Number) }),
      ).annotate({ identifier: "ProactiveRefreshTokenRenewal" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String, versionId: S.String })).annotate({
        identifier: "SecretsManager",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ SecretsManager: __S(129, __c8, 1), AuthMaterialName: S.String }),
      ).annotate({ identifier: "AuthMaterial" });
    case 3:
      return S.Array(__S(130, __c8, 2));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/credential-lockers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCredentialLockerRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateCredentialLockerResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeliveryDestinationArn: S.String,
          DeliveryDestinationType: S.String,
          Name: S.String,
          RoleArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          Tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDestinationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "CreateDestinationResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String,
          ResourceId: S.optional(S.String),
          EventLogLevel: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/event-log-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEventLogConfigurationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Role: S.String,
          Owner: S.optional(SensitiveString),
          CredentialLockerId: S.optional(S.String),
          AuthenticationMaterial: SensitiveString,
          AuthenticationMaterialType: S.String,
          WiFiSimpleSetupConfiguration: S.optional(__S(240, __c15, 0)),
          SerialNumber: S.optional(SensitiveString),
          Brand: S.optional(SensitiveString),
          Model: S.optional(SensitiveString),
          Name: S.optional(S.String),
          CapabilityReport: S.optional(__S(260, __c16, 4)),
          CapabilitySchemas: S.optional(__S(273, __c17, 1)),
          Capabilities: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Classification: S.optional(SensitiveString),
          Tags: S.optional(__S(16, __c1, 0)),
          MetaData: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/managed-things" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateManagedThingRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableAsProvisioner: S.optional(S.Boolean),
          EnableAsProvisionee: S.optional(S.Boolean),
          TimeoutInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WiFiSimpleSetupConfiguration" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          version: S.String,
          properties: __S(224, __c14, 0),
          actions: __S(224, __c14, 0),
          events: __S(224, __c14, 0),
        }),
      ).annotate({ identifier: "CapabilityReportCapability" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          deviceTypes: __S(224, __c14, 0),
          capabilities: __S(257, __c16, 1),
        }),
      ).annotate({ identifier: "CapabilityReportEndpoint" });
    case 3:
      return S.Array(__S(258, __c16, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          nodeId: S.optional(S.String),
          endpoints: __S(259, __c16, 3),
        }),
      ).annotate({ identifier: "CapabilityReport" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Format: S.String,
          CapabilityId: S.String,
          ExtrinsicId: S.String,
          ExtrinsicVersion: S.Number,
          Schema: S.Any,
        }),
      ).annotate({ identifier: "CapabilitySchemaItem" });
    case 1:
      return S.Array(__S(272, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventType: S.String,
          DestinationName: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/notification-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ EventType: S.optional(S.String) })).annotate({
        identifier: "CreateNotificationConfigurationResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          S3Url: S.String,
          Protocol: S.optional(S.String),
          Target: S.optional(__S(224, __c14, 0)),
          TaskConfigurationId: S.optional(S.String),
          OtaMechanism: S.optional(S.String),
          OtaType: S.String,
          OtaTargetQueryString: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          OtaSchedulingConfig: S.optional(__S(322, __c20, 2)),
          OtaTaskExecutionRetryConfig: S.optional(__S(325, __c20, 5)),
          Tags: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/ota-tasks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOtaTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateOtaTaskResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DurationInMinutes: S.optional(S.Number), StartTime: S.optional(S.String) }),
      ).annotate({ identifier: "ScheduleMaintenanceWindow" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EndBehavior: S.optional(S.String),
          EndTime: S.optional(S.String),
          MaintenanceWindows: S.optional(__S(321, __c20, 1)),
          StartTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "OtaTaskSchedulingConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({ FailureType: S.optional(S.String), MinNumberOfRetries: S.optional(S.Number) }),
      ).annotate({ identifier: "RetryConfigCriteria" });
    case 4:
      return S.Array(__S(323, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ RetryConfigCriteria: S.optional(__S(324, __c20, 4)) }),
      ).annotate({ identifier: "OtaTaskExecutionRetryConfig" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Name: S.optional(SensitiveString),
          PushConfig: S.optional(__S(359, __c22, 7)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ota-task-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOtaTaskConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TaskConfigurationId: S.optional(S.String) })).annotate({
        identifier: "CreateOtaTaskConfigurationResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          FailureType: S.optional(S.String),
          MinNumberOfExecutedThings: S.optional(S.Number),
          ThresholdPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AbortConfigCriteria" });
    case 1:
      return S.Array(__S(352, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AbortConfigCriteriaList: S.optional(__S(353, __c22, 1)) }),
      ).annotate({ identifier: "OtaTaskAbortConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          numberOfNotifiedThings: S.optional(S.Number),
          numberOfSucceededThings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RolloutRateIncreaseCriteria" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BaseRatePerMinute: S.optional(S.Number),
          IncrementFactor: S.optional(S.Number),
          RateIncreaseCriteria: S.optional(__S(355, __c22, 3)),
        }),
      ).annotate({ identifier: "ExponentialRolloutRate" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ExponentialRolloutRate: S.optional(__S(356, __c22, 4)),
          MaximumPerMinute: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OtaTaskExecutionRolloutConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({ InProgressTimeoutInMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "OtaTaskTimeoutConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AbortConfig: S.optional(__S(354, __c22, 2)),
          RolloutConfig: S.optional(__S(357, __c22, 5)),
          TimeoutConfig: S.optional(__S(358, __c22, 6)),
        }),
      ).annotate({ identifier: "PushConfig" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProvisioningType: S.String,
          CaCertificate: S.optional(SensitiveString),
          ClaimCertificate: S.optional(SensitiveString),
          Name: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/provisioning-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProvisioningProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          ProvisioningType: S.optional(S.String),
          Id: S.optional(S.String),
          Status: S.optional(S.String),
          ClaimCertificate: S.optional(SensitiveString),
          ClaimCertificatePrivateKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreateProvisioningProfileResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/account-associations/{AccountAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccountAssociationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteAccountAssociationResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cloud-connectors/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCloudConnectorRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connector-destinations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorDestinationRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/credential-lockers/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCredentialLockerRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/destinations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDestinationRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/event-log-configurations/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventLogConfigurationRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Force: S.optional(S.Boolean).pipe(T.HttpQuery("Force")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/managed-things/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteManagedThingRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventType: S.String.pipe(T.HttpLabel("EventType")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/notification-configurations/{EventType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNotificationConfigurationRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ota-tasks/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOtaTaskRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ota-task-configurations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOtaTaskConfigurationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/provisioning-profiles/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProvisioningProfileRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagedThingId: S.String, AccountAssociationId: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/managed-thing-associations/deregister" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterAccountAssociationRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/account-associations/{AccountAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountAssociationId: S.String,
          AssociationState: S.String,
          ErrorMessage: S.optional(S.String),
          ConnectorDestinationId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Arn: S.optional(S.String),
          OAuthAuthorizationUrl: SensitiveString,
          Tags: S.optional(__S(16, __c1, 0)),
          GeneralAuthorization: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "GetAccountAssociationResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cloud-connectors/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudConnectorRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EndpointConfig: __S(81, __c5, 1),
          Description: S.optional(S.String),
          EndpointType: S.optional(S.String),
          Id: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCloudConnectorResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connector-destinations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CloudConnectorId: S.optional(S.String),
          Id: S.optional(S.String),
          AuthType: S.optional(S.String),
          AuthConfig: S.optional(__S(113, __c7, 1)),
          SecretsManager: S.optional(__S(129, __c8, 1)),
          OAuthCompleteRedirectUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectorDestinationResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/credential-lockers/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCredentialLockerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetCredentialLockerResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/custom-endpoint" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCustomEndpointRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EndpointAddress: S.String })).annotate({
        identifier: "GetCustomEndpointResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/configuration/account/encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDefaultEncryptionConfigurationRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ConfigurationError" });
    case 1:
      return S.suspend(() =>
        S.Struct({ error: S.optional(__S(720, __c45, 0)), state: S.String }),
      ).annotate({ identifier: "ConfigurationStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configurationStatus: __S(721, __c45, 1),
          encryptionType: S.String,
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDefaultEncryptionConfigurationResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/destinations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DeliveryDestinationArn: S.optional(S.String),
          DeliveryDestinationType: S.optional(S.String),
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetDestinationResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/device-discoveries/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeviceDiscoveryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          DiscoveryType: S.String,
          Status: S.String,
          StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ControllerId: S.optional(S.String),
          ConnectorAssociationId: S.optional(S.String),
          AccountAssociationId: S.optional(S.String),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetDeviceDiscoveryResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/event-log-configurations/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventLogConfigurationRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          EventLogLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetEventLogConfigurationResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/hub-configuration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetHubConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HubTokenTimerExpirySettingInSeconds: S.optional(S.Number),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetHubConfigurationResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-things/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedThingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Owner: S.optional(SensitiveString),
          CredentialLockerId: S.optional(S.String),
          AdvertisedProductId: S.optional(S.String),
          Role: S.optional(S.String),
          ProvisioningStatus: S.optional(S.String),
          Name: S.optional(S.String),
          Model: S.optional(SensitiveString),
          Brand: S.optional(SensitiveString),
          SerialNumber: S.optional(SensitiveString),
          UniversalProductCode: S.optional(SensitiveString),
          InternationalArticleNumber: S.optional(SensitiveString),
          ConnectorPolicyId: S.optional(S.String),
          ConnectorDestinationId: S.optional(S.String),
          ConnectorDeviceId: S.optional(SensitiveString),
          DeviceSpecificKey: S.optional(SensitiveString),
          MacAddress: S.optional(SensitiveString),
          ParentControllerId: S.optional(S.String),
          Classification: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HubNetworkMode: S.optional(S.String),
          MetaData: S.optional(__S(16, __c1, 0)),
          Tags: S.optional(__S(16, __c1, 0)),
          WiFiSimpleSetupConfiguration: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "GetManagedThingResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-things-capabilities/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedThingCapabilitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.optional(S.String),
          Capabilities: S.optional(S.String),
          CapabilityReport: S.optional(__S(260, __c16, 4)),
        }),
      ).annotate({ identifier: "GetManagedThingCapabilitiesResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-things-certificate/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedThingCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ManagedThingId: S.optional(S.String), CertificatePem: S.optional(S.String) }),
      ).annotate({ identifier: "GetManagedThingCertificateResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/managed-things-connectivity-data/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedThingConnectivityDataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.optional(S.String),
          Connected: S.optional(S.Boolean),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisconnectReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetManagedThingConnectivityDataResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-things-metadata/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedThingMetaDataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ManagedThingId: S.optional(S.String), MetaData: S.optional(__S(16, __c1, 0)) }),
      ).annotate({ identifier: "GetManagedThingMetaDataResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-thing-states/{ManagedThingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedThingStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          version: S.String,
          properties: S.optional(S.Any),
        }),
      ).annotate({ identifier: "StateCapability" });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ endpointId: S.String, capabilities: __S(898, __c56, 2) }),
      ).annotate({ identifier: "StateEndpoint" });
    case 4:
      return S.Array(__S(899, __c56, 3));
    case 5:
      return S.suspend(() => S.Struct({ Endpoints: __S(900, __c56, 4) })).annotate({
        identifier: "GetManagedThingStateResponse",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventType: S.String.pipe(T.HttpLabel("EventType")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/notification-configurations/{EventType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventType: S.optional(S.String),
          DestinationName: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetNotificationConfigurationResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ota-tasks/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOtaTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NumberOfCanceledThings: S.optional(S.Number),
          NumberOfFailedThings: S.optional(S.Number),
          NumberOfInProgressThings: S.optional(S.Number),
          numberOfQueuedThings: S.optional(S.Number),
          numberOfRejectedThings: S.optional(S.Number),
          numberOfRemovedThings: S.optional(S.Number),
          numberOfSucceededThings: S.optional(S.Number),
          numberOfTimedOutThings: S.optional(S.Number),
          processingTargets: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "TaskProcessingDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          Description: S.optional(S.String),
          S3Url: S.optional(S.String),
          Protocol: S.optional(S.String),
          OtaType: S.optional(S.String),
          OtaTargetQueryString: S.optional(S.String),
          OtaMechanism: S.optional(S.String),
          Target: S.optional(__S(224, __c14, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TaskConfigurationId: S.optional(S.String),
          TaskProcessingDetails: S.optional(__S(929, __c58, 1)),
          OtaSchedulingConfig: S.optional(__S(322, __c20, 2)),
          OtaTaskExecutionRetryConfig: S.optional(__S(325, __c20, 5)),
          Status: S.optional(S.String),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetOtaTaskResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ota-task-configurations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOtaTaskConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskConfigurationId: S.optional(S.String),
          Name: S.optional(SensitiveString),
          PushConfig: S.optional(__S(359, __c22, 7)),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetOtaTaskConfigurationResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioning-profiles/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProvisioningProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          ProvisioningType: S.optional(S.String),
          Id: S.optional(S.String),
          Status: S.optional(S.String),
          ClaimCertificate: S.optional(SensitiveString),
          Tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetProvisioningProfileResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/runtime-log-configurations/{ManagedThingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuntimeLogConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.optional(S.String),
          RuntimeLogConfigurations: S.optional(__S(992, __c62, 0)),
        }),
      ).annotate({ identifier: "GetRuntimeLogConfigurationResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogLevel: S.optional(S.String),
          LogFlushLevel: S.optional(S.String),
          LocalStoreLocation: S.optional(S.String),
          LocalStoreFileRotationMaxFiles: S.optional(S.Number),
          LocalStoreFileRotationMaxBytes: S.optional(S.Number),
          UploadLog: S.optional(S.Boolean),
          UploadPeriodMinutes: S.optional(S.Number),
          DeleteLocalStoreAfterUpload: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RuntimeLogConfigurations" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String.pipe(T.HttpLabel("Type")),
          SchemaVersionedId: S.String.pipe(T.HttpLabel("SchemaVersionedId")),
          Format: S.optional(S.String).pipe(T.HttpQuery("Format")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/schema-versions/{Type}/{SchemaVersionedId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSchemaVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Namespace: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
          Visibility: S.optional(S.String),
          Schema: S.optional(S.Any),
        }),
      ).annotate({ identifier: "GetSchemaVersionResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDestinationId: S.optional(S.String).pipe(T.HttpQuery("ConnectorDestinationId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/account-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccountAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountAssociationId: S.String,
          AssociationState: S.String,
          ErrorMessage: S.optional(S.String),
          ConnectorDestinationId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountAssociationItem" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1026, __c64, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountAssociationsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String).pipe(T.HttpQuery("Type")),
          LambdaArn: S.optional(S.String).pipe(T.HttpQuery("LambdaArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/cloud-connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCloudConnectorsRequest" });
    case 1:
      return S.Array(__S(624, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1041, __c65, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCloudConnectorsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudConnectorId: S.optional(S.String).pipe(T.HttpQuery("CloudConnectorId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connector-destinations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectorDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CloudConnectorId: S.optional(S.String),
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorDestinationSummary" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectorDestinationList: S.optional(__S(1058, __c66, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectorDestinationsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/credential-lockers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCredentialLockersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CredentialLockerSummary" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1074, __c67, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCredentialLockersResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DeliveryDestinationArn: S.optional(S.String),
          DeliveryDestinationType: S.optional(S.String),
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DestinationSummary" });
    case 2:
      return S.Array(__S(1089, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DestinationList: S.optional(__S(1090, __c68, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDestinationsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          TypeFilter: S.optional(S.String).pipe(T.HttpQuery("TypeFilter")),
          StatusFilter: S.optional(S.String).pipe(T.HttpQuery("StatusFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/device-discoveries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeviceDiscoveriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          DiscoveryType: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeviceDiscoverySummary" });
    case 2:
      return S.Array(__S(1105, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1106, __c69, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDeviceDiscoveriesResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/device-discoveries/{Identifier}/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDiscoveredDevicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectorDeviceId: S.optional(SensitiveString),
          ConnectorDeviceName: S.optional(S.String),
          DeviceTypes: S.optional(__S(224, __c14, 0)),
          ManagedThingId: S.optional(S.String),
          Modification: S.optional(S.String),
          DiscoveredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Brand: S.optional(SensitiveString),
          Model: S.optional(SensitiveString),
          AuthenticationMaterial: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DiscoveredDeviceSummary" });
    case 2:
      return S.Array(__S(1121, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1122, __c70, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDiscoveredDevicesResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/event-log-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventLogConfigurationsRequest" });
    case 1:
      return S.Array(__S(784, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EventLogConfigurationList: S.optional(__S(1137, __c71, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEventLogConfigurationsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.optional(S.String).pipe(T.HttpQuery("ManagedThingId")),
          AccountAssociationId: S.optional(S.String).pipe(T.HttpQuery("AccountAssociationId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-thing-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedThingAccountAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.optional(S.String),
          AccountAssociationId: S.optional(S.String),
          ManagedThingAssociationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedThingAssociation" });
    case 2:
      return S.Array(__S(1153, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1154, __c72, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedThingAccountAssociationsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OwnerFilter: S.optional(SensitiveString).pipe(T.HttpQuery("OwnerFilter")),
          CredentialLockerFilter: S.optional(S.String).pipe(T.HttpQuery("CredentialLockerFilter")),
          RoleFilter: S.optional(S.String).pipe(T.HttpQuery("RoleFilter")),
          ParentControllerIdentifierFilter: S.optional(S.String).pipe(
            T.HttpQuery("ParentControllerIdentifierFilter"),
          ),
          ConnectorPolicyIdFilter: S.optional(S.String).pipe(
            T.HttpQuery("ConnectorPolicyIdFilter"),
          ),
          ConnectorDestinationIdFilter: S.optional(S.String).pipe(
            T.HttpQuery("ConnectorDestinationIdFilter"),
          ),
          ConnectorDeviceIdFilter: S.optional(SensitiveString).pipe(
            T.HttpQuery("ConnectorDeviceIdFilter"),
          ),
          SerialNumberFilter: S.optional(SensitiveString).pipe(T.HttpQuery("SerialNumberFilter")),
          ProvisioningStatusFilter: S.optional(S.String).pipe(
            T.HttpQuery("ProvisioningStatusFilter"),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/managed-things" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListManagedThingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          AdvertisedProductId: S.optional(S.String),
          Brand: S.optional(SensitiveString),
          Classification: S.optional(SensitiveString),
          ConnectorDeviceId: S.optional(SensitiveString),
          ConnectorPolicyId: S.optional(S.String),
          ConnectorDestinationId: S.optional(S.String),
          Model: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Owner: S.optional(SensitiveString),
          CredentialLockerId: S.optional(S.String),
          ParentControllerId: S.optional(S.String),
          ProvisioningStatus: S.optional(S.String),
          Role: S.optional(S.String),
          SerialNumber: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ManagedThingSummary" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1170, __c73, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedThingsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          EndpointIdFilter: S.optional(S.String).pipe(T.HttpQuery("EndpointIdFilter")),
          CapabilityIdFilter: S.optional(S.String).pipe(T.HttpQuery("CapabilityIdFilter")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-thing-schemas/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedThingSchemasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointId: S.optional(S.String),
          CapabilityId: S.optional(S.String),
          Schema: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ManagedThingSchemaListItem" });
    case 2:
      return S.Array(__S(1185, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1186, __c74, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedThingSchemasResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/notification-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotificationConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventType: S.optional(S.String), DestinationName: S.optional(S.String) }),
      ).annotate({ identifier: "NotificationConfigurationSummary" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NotificationConfigurationList: S.optional(__S(1202, __c75, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListNotificationConfigurationsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ota-task-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOtaTaskConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskConfigurationId: S.optional(S.String),
          Name: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OtaTaskConfigurationSummary" });
    case 2:
      return S.Array(__S(1217, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1218, __c76, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOtaTaskConfigurationsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ota-tasks/{Identifier}/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOtaTaskExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionNumber: S.optional(S.Number),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          QueuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetryAttempt: S.optional(S.Number),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "OtaTaskExecutionSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskExecutionSummary: S.optional(__S(1233, __c77, 1)),
          ManagedThingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "OtaTaskExecutionSummaries" });
    case 3:
      return S.Array(__S(1234, __c77, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ExecutionSummaries: S.optional(__S(1235, __c77, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOtaTaskExecutionsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/ota-tasks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOtaTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TaskConfigurationId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "OtaTaskSummary" });
    case 2:
      return S.Array(__S(1249, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tasks: S.optional(__S(1250, __c78, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOtaTasksResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioning-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProvisioningProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          ProvisioningType: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisioningProfileSummary" });
    case 2:
      return S.Array(__S(1265, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1266, __c79, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProvisioningProfilesResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String.pipe(T.HttpLabel("Type")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          SchemaId: S.optional(S.String).pipe(T.HttpQuery("SchemaIdFilter")),
          Namespace: S.optional(S.String).pipe(T.HttpQuery("NamespaceFilter")),
          Visibility: S.optional(S.String).pipe(T.HttpQuery("VisibilityFilter")),
          SemanticVersion: S.optional(S.String).pipe(T.HttpQuery("SemanticVersionFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/schema-versions/{Type}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSchemaVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Namespace: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
          Visibility: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaVersionListItem" });
    case 2:
      return S.Array(__S(1281, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1282, __c80, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchemaVersionsResponse" });
  }
}
function __c81(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ encryptionType: S.String, kmsKeyArn: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configuration/account/encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDefaultEncryptionConfigurationRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HubTokenTimerExpirySettingInSeconds: S.Number }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/hub-configuration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutHubConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HubTokenTimerExpirySettingInSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "PutHubConfigurationResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
          RuntimeLogConfigurations: __S(992, __c62, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/runtime-log-configurations/{ManagedThingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRuntimeLogConfigurationRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.String,
          AccountAssociationId: S.String,
          DeviceDiscoveryId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/managed-thing-associations/register" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterAccountAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountAssociationId: S.optional(S.String),
          DeviceDiscoveryId: S.optional(S.String),
          ManagedThingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisterAccountAssociationResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/custom-endpoint" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterCustomEndpointRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/runtime-log-configurations/{ManagedThingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetRuntimeLogConfigurationRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          value: S.optional(S.Any),
        }),
      ).annotate({ identifier: "MatterCapabilityReportAttribute" });
    case 1:
      return S.Array(__S(1408, __c88, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          revision: S.Number,
          publicId: S.optional(S.String),
          name: S.optional(S.String),
          specVersion: S.optional(S.String),
          attributes: S.optional(__S(1409, __c88, 1)),
          commands: S.optional(__S(224, __c14, 0)),
          events: S.optional(__S(224, __c14, 0)),
          featureMap: S.optional(S.Number),
          generatedCommands: S.optional(__S(224, __c14, 0)),
          fabricIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MatterCapabilityReportCluster" });
    case 3:
      return S.Array(__S(1410, __c88, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          deviceTypes: __S(224, __c14, 0),
          clusters: __S(1411, __c88, 3),
          parts: S.optional(__S(224, __c14, 0)),
          semanticTags: S.optional(__S(224, __c14, 0)),
          clientClusters: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "MatterCapabilityReportEndpoint" });
    case 5:
      return S.Array(__S(1412, __c88, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          nodeId: S.optional(S.String),
          endpoints: __S(1413, __c88, 5),
        }),
      ).annotate({ identifier: "MatterCapabilityReport" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ConnectorDeviceId: SensitiveString,
          ConnectorDeviceName: S.optional(S.String),
          CapabilityReport: __S(1414, __c88, 6),
          CapabilitySchemas: S.optional(__S(273, __c17, 1)),
          DeviceMetadata: S.optional(S.Any),
        }),
      ).annotate({ identifier: "Device" });
    case 8:
      return S.Array(__S(1415, __c88, 7));
    case 9:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          attributes: S.optional(S.Any),
          commands: S.optional(__S(1417, __c88, 9)),
          events: S.optional(__S(1417, __c88, 9)),
        }),
      ).annotate({ identifier: "MatterCluster" });
    case 11:
      return S.Array(__S(1418, __c88, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), clusters: S.optional(__S(1419, __c88, 11)) }),
      ).annotate({ identifier: "MatterEndpoint" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")),
          UserId: S.optional(SensitiveString),
          Operation: S.String,
          OperationVersion: S.optional(S.String),
          StatusCode: S.optional(S.Number),
          Message: S.optional(SensitiveString),
          DeviceDiscoveryId: S.optional(S.String),
          ConnectorDeviceId: S.optional(SensitiveString),
          TraceId: S.optional(S.String),
          Devices: S.optional(__S(1416, __c88, 8)),
          MatterEndpoint: S.optional(__S(1420, __c88, 12)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/connector-event/{ConnectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendConnectorEventRequest" });
    case 14:
      return S.suspend(() => S.Struct({ ConnectorId: S.String })).annotate({
        identifier: "SendConnectorEventResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          ref: S.optional(S.String),
          actionTraceId: S.optional(S.String),
          parameters: S.optional(S.Any),
        }),
      ).annotate({ identifier: "CapabilityAction" });
    case 1:
      return S.Array(__S(1424, __c89, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ id: S.String, name: S.String, version: S.String, actions: __S(1425, __c89, 1) }),
      ).annotate({ identifier: "CommandCapability" });
    case 3:
      return S.Array(__S(1426, __c89, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ endpointId: S.String, capabilities: __S(1427, __c89, 3) }),
      ).annotate({ identifier: "CommandEndpoint" });
    case 5:
      return S.Array(__S(1428, __c89, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
          Endpoints: __S(1429, __c89, 5),
          ConnectorAssociationId: S.optional(S.String),
          AccountAssociationId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/managed-things-command/{ManagedThingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendManagedThingCommandRequest" });
    case 7:
      return S.suspend(() => S.Struct({ TraceId: S.optional(S.String) })).annotate({
        identifier: "SendManagedThingCommandResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/account-associations/{AccountAssociationId}/refresh" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAccountAssociationRefreshRequest" });
    case 1:
      return S.suspend(() => S.Struct({ OAuthAuthorizationUrl: SensitiveString })).annotate({
        identifier: "StartAccountAssociationRefreshResponse",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          DiscoveryType: S.String,
          CustomProtocolDetail: S.optional(__S(16, __c1, 0)),
          ControllerIdentifier: S.optional(S.String),
          ConnectorAssociationIdentifier: S.optional(S.String),
          AccountAssociationId: S.optional(S.String),
          AuthenticationMaterial: S.optional(SensitiveString),
          AuthenticationMaterialType: S.optional(S.String),
          ClientToken: S.optional(S.String),
          Tags: S.optional(__S(16, __c1, 0)),
          ConnectorDeviceIdList: S.optional(__S(1456, __c91, 0)),
          Protocol: S.optional(S.String),
          EndDeviceIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/device-discoveries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDeviceDiscoveryRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StartDeviceDiscoveryResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(16, __c1, 0),
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
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(224, __c14, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/account-associations/{AccountAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountAssociationRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/cloud-connectors/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCloudConnectorRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          oAuthCompleteRedirectUrl: S.optional(S.String),
          proactiveRefreshTokenRenewal: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "OAuthUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthMaterialsToAdd: S.optional(__S(131, __c8, 3)),
          AuthMaterialsToUpdate: S.optional(__S(131, __c8, 3)),
        }),
      ).annotate({ identifier: "GeneralAuthorizationUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          oAuthUpdate: S.optional(__S(1536, __c96, 0)),
          GeneralAuthorizationUpdate: S.optional(__S(1537, __c96, 1)),
        }),
      ).annotate({ identifier: "AuthConfigUpdate" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          AuthType: S.optional(S.String),
          AuthConfig: S.optional(__S(1538, __c96, 2)),
          SecretsManager: S.optional(__S(129, __c8, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/connector-destinations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectorDestinationRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          DeliveryDestinationArn: S.optional(S.String),
          DeliveryDestinationType: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/destinations/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDestinationRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), EventLogLevel: S.String }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/event-log-configurations/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventLogConfigurationRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Owner: S.optional(SensitiveString),
          CredentialLockerId: S.optional(S.String),
          SerialNumber: S.optional(SensitiveString),
          WiFiSimpleSetupConfiguration: S.optional(__S(240, __c15, 0)),
          Brand: S.optional(SensitiveString),
          Model: S.optional(SensitiveString),
          Name: S.optional(S.String),
          CapabilityReport: S.optional(__S(260, __c16, 4)),
          CapabilitySchemas: S.optional(__S(273, __c17, 1)),
          Capabilities: S.optional(S.String),
          Classification: S.optional(SensitiveString),
          HubNetworkMode: S.optional(S.String),
          MetaData: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/managed-things/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateManagedThingRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventType: S.String.pipe(T.HttpLabel("EventType")),
          DestinationName: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/notification-configurations/{EventType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNotificationConfigurationRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Description: S.optional(S.String),
          TaskConfigurationId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/ota-tasks/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOtaTaskRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
