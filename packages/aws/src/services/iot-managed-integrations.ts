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
  sdkId: "IoT Managed Integrations",
  target: "IotManagedIntegrations",
  version: "2025-03-03",
  sigv4: "iotmanagedintegrations",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
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
export type RetryCriteriaFailureType =
  | "FAILED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
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
export type AbortCriteriaFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
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
export type ConfigurationState =
  | "ENABLED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
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
export type HubNetworkMode =
  | "STANDARD"
  | "NETWORK_WIDE_EXCLUSION"
  | (string & {});
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
export type DiscoveryModification =
  | "DISCOVERED"
  | "UPDATED"
  | "NO_CHANGE"
  | (string & {});
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
export type EventLogConfigurationListDefinition =
  EventLogConfigurationSummary[];
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
export type ManagedThingAssociationStatus =
  | "PRE_ASSOCIATED"
  | "ASSOCIATED"
  | (string & {});
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
export type NotificationConfigurationListDefinition =
  NotificationConfigurationSummary[];
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
export type OtaTaskExecutionSummariesListDefinition =
  OtaTaskExecutionSummaries[];
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
export type MatterCapabilityReportAttributes =
  MatterCapabilityReportAttribute[];
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
  descriptor: {
    service: svc,
    http: "POST /account-associations",
    input: {
      ClientToken: D.m({ idempotency: true }),
      ConnectorDestinationId: 0,
      Name: 0,
      Description: 0,
      Tags: 0,
      GeneralAuthorization: { AuthMaterialName: 0 },
    },
    output: { OAuthAuthorizationUrl: D.secret },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /cloud-connectors",
    input: {
      Name: 0,
      EndpointConfig: { lambda: { arn: 0 } },
      Description: 0,
      EndpointType: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateCloudConnector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /connector-destinations",
    input: {
      Name: 0,
      Description: 0,
      CloudConnectorId: 0,
      AuthType: 0,
      AuthConfig: {
        oAuth: {
          authUrl: 0,
          tokenUrl: 0,
          scope: 0,
          tokenEndpointAuthenticationScheme: 0,
          oAuthCompleteRedirectUrl: 0,
          proactiveRefreshTokenRenewal: i_ProactiveRefreshTokenRenewal,
        },
        GeneralAuthorization: D.list(i_AuthMaterial),
      },
      SecretsManager: i_SecretsManager,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /credential-lockers",
    input: { Name: 0, ClientToken: D.m({ idempotency: true }), Tags: 0 },
    output: { CreatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /destinations",
    input: {
      DeliveryDestinationArn: 0,
      DeliveryDestinationType: 0,
      Name: 0,
      RoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
      Description: 0,
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
  operationName: "CreateDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /event-log-configurations",
    input: {
      ResourceType: 0,
      ResourceId: 0,
      EventLogLevel: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /managed-things",
    input: {
      Role: 0,
      Owner: 0,
      CredentialLockerId: 0,
      AuthenticationMaterial: 0,
      AuthenticationMaterialType: 0,
      WiFiSimpleSetupConfiguration: i_WiFiSimpleSetupConfiguration,
      SerialNumber: 0,
      Brand: 0,
      Model: 0,
      Name: 0,
      CapabilityReport: i_CapabilityReport,
      CapabilitySchemas: D.list(i_CapabilitySchemaItem),
      Capabilities: 0,
      ClientToken: D.m({ idempotency: true }),
      Classification: 0,
      Tags: 0,
      MetaData: 0,
    },
    output: { CreatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /notification-configurations",
    input: {
      EventType: 0,
      DestinationName: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateNotificationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /ota-tasks",
    input: {
      Description: 0,
      S3Url: 0,
      Protocol: 0,
      Target: 0,
      TaskConfigurationId: 0,
      OtaMechanism: 0,
      OtaType: 0,
      OtaTargetQueryString: 0,
      ClientToken: D.m({ idempotency: true }),
      OtaSchedulingConfig: {
        EndBehavior: 0,
        EndTime: 0,
        MaintenanceWindows: D.list({ DurationInMinutes: 0, StartTime: 0 }),
        StartTime: 0,
      },
      OtaTaskExecutionRetryConfig: {
        RetryConfigCriteria: D.list({ FailureType: 0, MinNumberOfRetries: 0 }),
      },
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /ota-task-configurations",
    input: {
      Description: 0,
      Name: 0,
      PushConfig: {
        AbortConfig: {
          AbortConfigCriteriaList: D.list({
            Action: 0,
            FailureType: 0,
            MinNumberOfExecutedThings: 0,
            ThresholdPercentage: 0,
          }),
        },
        RolloutConfig: {
          ExponentialRolloutRate: {
            BaseRatePerMinute: 0,
            IncrementFactor: 0,
            RateIncreaseCriteria: {
              numberOfNotifiedThings: 0,
              numberOfSucceededThings: 0,
            },
          },
          MaximumPerMinute: 0,
        },
        TimeoutConfig: { InProgressTimeoutInMinutes: 0 },
      },
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateOtaTaskConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /provisioning-profiles",
    input: {
      ProvisioningType: 0,
      CaCertificate: 0,
      ClaimCertificate: 0,
      Name: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    output: {
      ClaimCertificate: D.secret,
      ClaimCertificatePrivateKey: D.secret,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /account-associations/{AccountAssociationId}",
    input: { AccountAssociationId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /cloud-connectors/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /connector-destinations/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "DeleteConnectorDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /credential-lockers/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /destinations/{Name}",
    input: { Name: 0 },
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
  operationName: "DeleteDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /event-log-configurations/{Id}",
    input: { Id: 0 },
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
  operationName: "DeleteEventLogConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /managed-things/{Identifier}",
    input: { Identifier: 0, Force: D.m({ query: "Force" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /notification-configurations/{EventType}",
    input: { EventType: 0 },
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
  operationName: "DeleteNotificationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /ota-tasks/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /ota-task-configurations/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "DeleteOtaTaskConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /provisioning-profiles/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /managed-thing-associations/deregister",
    input: { ManagedThingId: 0, AccountAssociationId: 0 },
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
  operationName: "DeregisterAccountAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /account-associations/{AccountAssociationId}",
    input: { AccountAssociationId: 0 },
    output: { OAuthAuthorizationUrl: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /cloud-connectors/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "GetCloudConnector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /connector-destinations/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "GetConnectorDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /credential-lockers/{Identifier}",
    input: { Identifier: 0 },
    output: { Name: D.secret, CreatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: { service: svc, http: "GET /custom-endpoint", input: {} },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /configuration/account/encryption",
    input: {},
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /destinations/{Name}",
    input: { Name: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "GetDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /device-discoveries/{Identifier}",
    input: { Identifier: 0 },
    output: { StartedAt: D.ts, FinishedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /event-log-configurations/{Id}",
    input: { Id: 0 },
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
  operationName: "GetEventLogConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /hub-configuration",
    input: {},
    output: { UpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /managed-things/{Identifier}",
    input: { Identifier: 0 },
    output: {
      Owner: D.secret,
      Model: D.secret,
      Brand: D.secret,
      SerialNumber: D.secret,
      UniversalProductCode: D.secret,
      InternationalArticleNumber: D.secret,
      ConnectorDeviceId: D.secret,
      DeviceSpecificKey: D.secret,
      MacAddress: D.secret,
      Classification: D.secret,
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      ActivatedAt: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /managed-things-capabilities/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /managed-things-certificate/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /managed-things-connectivity-data/{Identifier}",
    input: { Identifier: 0 },
    output: { Timestamp: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /managed-things-metadata/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /managed-thing-states/{ManagedThingId}",
    input: { ManagedThingId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /notification-configurations/{EventType}",
    input: { EventType: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "GetNotificationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /ota-tasks/{Identifier}",
    input: { Identifier: 0 },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
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
  operationName: "GetOtaTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /ota-task-configurations/{Identifier}",
    input: { Identifier: 0 },
    output: { Name: D.secret, CreatedAt: D.ts },
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
  operationName: "GetOtaTaskConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /provisioning-profiles/{Identifier}",
    input: { Identifier: 0 },
    output: { ClaimCertificate: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /runtime-log-configurations/{ManagedThingId}",
    input: { ManagedThingId: 0 },
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
  operationName: "GetRuntimeLogConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /schema-versions/{Type}/{SchemaVersionedId}",
    input: { Type: 0, SchemaVersionedId: 0, Format: D.m({ query: "Format" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /account-associations",
    input: {
      ConnectorDestinationId: D.m({ query: "ConnectorDestinationId" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /cloud-connectors",
    input: {
      Type: D.m({ query: "Type" }),
      LambdaArn: D.m({ query: "LambdaArn" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /connector-destinations",
    input: {
      CloudConnectorId: D.m({ query: "CloudConnectorId" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /credential-lockers",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Items: D.list({ Name: D.secret, CreatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /destinations",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /device-discoveries",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      TypeFilter: D.m({ query: "TypeFilter" }),
      StatusFilter: D.m({ query: "StatusFilter" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /device-discoveries/{Identifier}/devices",
    input: {
      Identifier: 0,
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Items: D.list({
        ConnectorDeviceId: D.secret,
        DiscoveredAt: D.ts,
        Brand: D.secret,
        Model: D.secret,
        AuthenticationMaterial: D.secret,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /event-log-configurations",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /managed-thing-associations",
    input: {
      ManagedThingId: D.m({ query: "ManagedThingId" }),
      AccountAssociationId: D.m({ query: "AccountAssociationId" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /managed-things",
    input: {
      OwnerFilter: D.m({ query: "OwnerFilter" }),
      CredentialLockerFilter: D.m({ query: "CredentialLockerFilter" }),
      RoleFilter: D.m({ query: "RoleFilter" }),
      ParentControllerIdentifierFilter: D.m({
        query: "ParentControllerIdentifierFilter",
      }),
      ConnectorPolicyIdFilter: D.m({ query: "ConnectorPolicyIdFilter" }),
      ConnectorDestinationIdFilter: D.m({
        query: "ConnectorDestinationIdFilter",
      }),
      ConnectorDeviceIdFilter: D.m({ query: "ConnectorDeviceIdFilter" }),
      SerialNumberFilter: D.m({ query: "SerialNumberFilter" }),
      ProvisioningStatusFilter: D.m({ query: "ProvisioningStatusFilter" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Items: D.list({
        Brand: D.secret,
        Classification: D.secret,
        ConnectorDeviceId: D.secret,
        Model: D.secret,
        Owner: D.secret,
        SerialNumber: D.secret,
        CreatedAt: D.ts,
        UpdatedAt: D.ts,
        ActivatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /managed-thing-schemas/{Identifier}",
    input: {
      Identifier: 0,
      EndpointIdFilter: D.m({ query: "EndpointIdFilter" }),
      CapabilityIdFilter: D.m({ query: "CapabilityIdFilter" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /notification-configurations",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /ota-task-configurations",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Items: D.list({ Name: D.secret, CreatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /ota-tasks/{Identifier}/devices",
    input: {
      Identifier: 0,
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      ExecutionSummaries: D.list({
        TaskExecutionSummary: {
          LastUpdatedAt: D.ts,
          QueuedAt: D.ts,
          StartedAt: D.ts,
        },
      }),
    },
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
  descriptor: {
    service: svc,
    http: "GET /ota-tasks",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Tasks: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /provisioning-profiles",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /schema-versions/{Type}",
    input: {
      Type: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      SchemaId: D.m({ query: "SchemaIdFilter" }),
      Namespace: D.m({ query: "NamespaceFilter" }),
      Visibility: D.m({ query: "VisibilityFilter" }),
      SemanticVersion: D.m({ query: "SemanticVersionFilter" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /configuration/account/encryption",
    input: { encryptionType: 0, kmsKeyArn: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /hub-configuration",
    input: { HubTokenTimerExpirySettingInSeconds: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /runtime-log-configurations/{ManagedThingId}",
    input: {
      ManagedThingId: 0,
      RuntimeLogConfigurations: {
        LogLevel: 0,
        LogFlushLevel: 0,
        LocalStoreLocation: 0,
        LocalStoreFileRotationMaxFiles: 0,
        LocalStoreFileRotationMaxBytes: 0,
        UploadLog: 0,
        UploadPeriodMinutes: 0,
        DeleteLocalStoreAfterUpload: 0,
      },
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
  operationName: "PutRuntimeLogConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /managed-thing-associations/register",
    input: { ManagedThingId: 0, AccountAssociationId: 0, DeviceDiscoveryId: 0 },
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
  operationName: "RegisterAccountAssociation",
})) as any;

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
  descriptor: { service: svc, http: "POST /custom-endpoint", input: {} },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /runtime-log-configurations/{ManagedThingId}",
    input: { ManagedThingId: 0 },
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
  operationName: "ResetRuntimeLogConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /connector-event/{ConnectorId}",
    input: {
      ConnectorId: 0,
      UserId: 0,
      Operation: 0,
      OperationVersion: 0,
      StatusCode: 0,
      Message: 0,
      DeviceDiscoveryId: 0,
      ConnectorDeviceId: 0,
      TraceId: 0,
      Devices: D.list({
        ConnectorDeviceId: 0,
        ConnectorDeviceName: 0,
        CapabilityReport: {
          version: 0,
          nodeId: 0,
          endpoints: D.list({
            id: 0,
            deviceTypes: 0,
            clusters: D.list({
              id: 0,
              revision: 0,
              publicId: 0,
              name: 0,
              specVersion: 0,
              attributes: D.list({ id: 0, name: 0, value: 0 }),
              commands: 0,
              events: 0,
              featureMap: 0,
              generatedCommands: 0,
              fabricIndex: 0,
            }),
            parts: 0,
            semanticTags: 0,
            clientClusters: 0,
          }),
        },
        CapabilitySchemas: D.list(i_CapabilitySchemaItem),
        DeviceMetadata: 0,
      }),
      MatterEndpoint: {
        id: 0,
        clusters: D.list({ id: 0, attributes: 0, commands: 0, events: 0 }),
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /managed-things-command/{ManagedThingId}",
    input: {
      ManagedThingId: 0,
      Endpoints: D.list({
        endpointId: 0,
        capabilities: D.list({
          id: 0,
          name: 0,
          version: 0,
          actions: D.list({ name: 0, ref: 0, actionTraceId: 0, parameters: 0 }),
        }),
      }),
      ConnectorAssociationId: 0,
      AccountAssociationId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /account-associations/{AccountAssociationId}/refresh",
    input: { AccountAssociationId: 0 },
    output: { OAuthAuthorizationUrl: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /device-discoveries",
    input: {
      DiscoveryType: 0,
      CustomProtocolDetail: 0,
      ControllerIdentifier: 0,
      ConnectorAssociationIdentifier: 0,
      AccountAssociationId: 0,
      AuthenticationMaterial: 0,
      AuthenticationMaterialType: 0,
      ClientToken: 0,
      Tags: 0,
      ConnectorDeviceIdList: 0,
      Protocol: 0,
      EndDeviceIdentifier: 0,
    },
    output: { StartedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /account-associations/{AccountAssociationId}",
    input: { AccountAssociationId: 0, Name: 0, Description: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /cloud-connectors/{Identifier}",
    input: { Identifier: 0, Name: 0, Description: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /connector-destinations/{Identifier}",
    input: {
      Identifier: 0,
      Description: 0,
      Name: 0,
      AuthType: 0,
      AuthConfig: {
        oAuthUpdate: {
          oAuthCompleteRedirectUrl: 0,
          proactiveRefreshTokenRenewal: i_ProactiveRefreshTokenRenewal,
        },
        GeneralAuthorizationUpdate: {
          AuthMaterialsToAdd: D.list(i_AuthMaterial),
          AuthMaterialsToUpdate: D.list(i_AuthMaterial),
        },
      },
      SecretsManager: i_SecretsManager,
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
  operationName: "UpdateConnectorDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /destinations/{Name}",
    input: {
      Name: 0,
      DeliveryDestinationArn: 0,
      DeliveryDestinationType: 0,
      RoleArn: 0,
      Description: 0,
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
  operationName: "UpdateDestination",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /event-log-configurations/{Id}",
    input: { Id: 0, EventLogLevel: 0 },
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
  operationName: "UpdateEventLogConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /managed-things/{Identifier}",
    input: {
      Identifier: 0,
      Owner: 0,
      CredentialLockerId: 0,
      SerialNumber: 0,
      WiFiSimpleSetupConfiguration: i_WiFiSimpleSetupConfiguration,
      Brand: 0,
      Model: 0,
      Name: 0,
      CapabilityReport: i_CapabilityReport,
      CapabilitySchemas: D.list(i_CapabilitySchemaItem),
      Capabilities: 0,
      Classification: 0,
      HubNetworkMode: 0,
      MetaData: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /notification-configurations/{EventType}",
    input: { EventType: 0, DestinationName: 0 },
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
  operationName: "UpdateNotificationConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /ota-tasks/{Identifier}",
    input: { Identifier: 0, Description: 0, TaskConfigurationId: 0 },
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
  operationName: "UpdateOtaTask",
})) as any;

const i_AuthMaterial: D.LazyStruct = () => ({
  SecretsManager: i_SecretsManager,
  AuthMaterialName: 0,
});
const i_CapabilityReport: D.LazyStruct = () => ({
  version: 0,
  nodeId: 0,
  endpoints: D.list({
    id: 0,
    deviceTypes: 0,
    capabilities: D.list({
      id: 0,
      name: 0,
      version: 0,
      properties: 0,
      actions: 0,
      events: 0,
    }),
  }),
});
const i_CapabilitySchemaItem: D.LazyStruct = () => ({
  Format: 0,
  CapabilityId: 0,
  ExtrinsicId: 0,
  ExtrinsicVersion: 0,
  Schema: 0,
});
const i_ProactiveRefreshTokenRenewal: D.LazyStruct = () => ({
  enabled: 0,
  DaysBeforeRenewal: 0,
});
const i_SecretsManager: D.LazyStruct = () => ({ arn: 0, versionId: 0 });
const i_WiFiSimpleSetupConfiguration: D.LazyStruct = () => ({
  EnableAsProvisioner: 0,
  EnableAsProvisionee: 0,
  TimeoutInMinutes: 0,
});
