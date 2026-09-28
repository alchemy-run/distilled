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
  sdkId: "IoT",
  target: "AWSIotService",
  version: "2015-05-28",
  sigv4: "iot",
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
                `https://iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://iot.${Region}.amazonaws.com`);
          }
          if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
            return e(`https://iot.${Region}.amazonaws.com.cn`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://iot.${Region}.amazonaws.com`);
          }
          return e(
            `https://iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CertificateConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CertificateStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateStateException",
    ["BadRequestError"],
    { status: 406 },
  )<{ readonly message?: string }> {}
export class CertificateValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly resourceId?: string }> {}
export class ConflictingResourceUpdateException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictingResourceUpdateException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class DeleteConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class IndexNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "IndexNotReadyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException", ["ServerError"], {
    status: 500,
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
export class InvalidAggregationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAggregationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidQueryException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidQueryException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidResponseException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResponseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateTransitionException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class MalformedPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotConfiguredException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotConfiguredException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RegistrationCodeValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "RegistrationCodeValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceArn?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceRegistrationFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceRegistrationFailureException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export class SqlParseException
  extends /*@__PURE__*/ TE.TaggedError(
    "SqlParseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TaskAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TaskAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TopicRuleNotFound
  extends /*@__PURE__*/ TE.TaggedError("TopicRuleNotFound", ["NotFoundError"], {
    synthetic: {
      from: "UnauthorizedException",
      message: { includes: "Access to topic rule" },
    },
  })<{ readonly message?: string }> {}
export class TransferAlreadyCompletedException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransferAlreadyCompletedException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class TransferConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransferConflictException",
    ["ConflictError"],
    { status: 409 },
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
export class VersionConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "VersionConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class VersionsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "VersionsLimitExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export type CertificateId = string;
export type SetAsActive = boolean;
export interface AcceptCertificateTransferRequest {
  certificateId: string;
  setAsActive?: boolean;
}
export interface AcceptCertificateTransferResponse {}
export type BillingGroupName = string;
export type BillingGroupArn = string;
export type ThingName = string;
export type ThingArn = string;
export interface AddThingToBillingGroupRequest {
  billingGroupName?: string;
  billingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
}
export interface AddThingToBillingGroupResponse {}
export type ThingGroupName = string;
export type ThingGroupArn = string;
export type OverrideDynamicGroups = boolean;
export interface AddThingToThingGroupRequest {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
  overrideDynamicGroups?: boolean;
}
export interface AddThingToThingGroupResponse {}
export type PackageName = string;
export type VersionName = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3Version = string;
export interface S3Location {
  bucket?: string;
  key?: string;
  version?: string;
}
export interface Sbom {
  s3Location?: S3Location;
}
export type ClientToken = string;
export interface AssociateSbomWithPackageVersionRequest {
  packageName: string;
  versionName: string;
  sbom: Sbom;
  clientToken?: string;
}
export type SbomValidationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export interface AssociateSbomWithPackageVersionResponse {
  packageName?: string;
  versionName?: string;
  sbom?: Sbom;
  sbomValidationStatus?: SbomValidationStatus;
}
export type TargetArn = string;
export type JobTargets = string[];
export type JobId = string;
export type Comment = string;
export type NamespaceId = string;
export interface AssociateTargetsWithJobRequest {
  targets: string[];
  jobId: string;
  comment?: string;
  namespaceId?: string;
}
export type JobArn = string;
export type JobDescription = string;
export interface AssociateTargetsWithJobResponse {
  jobArn?: string;
  jobId?: string;
  description?: string;
}
export type PolicyName = string;
export type PolicyTarget = string;
export interface AttachPolicyRequest {
  policyName: string;
  target: string;
}
export interface AttachPolicyResponse {}
export type Principal = string;
export interface AttachPrincipalPolicyRequest {
  policyName: string;
  principal: string;
}
export interface AttachPrincipalPolicyResponse {}
export type SecurityProfileName = string;
export type SecurityProfileTargetArn = string;
export interface AttachSecurityProfileRequest {
  securityProfileName: string;
  securityProfileTargetArn: string;
}
export interface AttachSecurityProfileResponse {}
export type ThingPrincipalType =
  | "EXCLUSIVE_THING"
  | "NON_EXCLUSIVE_THING"
  | (string & {});
export interface AttachThingPrincipalRequest {
  thingName: string;
  principal: string;
  thingPrincipalType?: ThingPrincipalType;
}
export interface AttachThingPrincipalResponse {}
export type MitigationActionsTaskId = string;
export interface CancelAuditMitigationActionsTaskRequest {
  taskId: string;
}
export interface CancelAuditMitigationActionsTaskResponse {}
export type AuditTaskId = string;
export interface CancelAuditTaskRequest {
  taskId: string;
}
export interface CancelAuditTaskResponse {}
export interface CancelCertificateTransferRequest {
  certificateId: string;
}
export interface CancelCertificateTransferResponse {}
export interface CancelDetectMitigationActionsTaskRequest {
  taskId: string;
}
export interface CancelDetectMitigationActionsTaskResponse {}
export type ReasonCode = string;
export type ForceFlag = boolean;
export interface CancelJobRequest {
  jobId: string;
  reasonCode?: string;
  comment?: string;
  force?: boolean;
}
export interface CancelJobResponse {
  jobArn?: string;
  jobId?: string;
  description?: string;
}
export type ExpectedVersion = number;
export type DetailsKey = string;
export type DetailsValue = string;
export type DetailsMap = { [key: string]: string | undefined };
export interface CancelJobExecutionRequest {
  jobId: string;
  thingName: string;
  force?: boolean;
  expectedVersion?: number;
  statusDetails?: { [key: string]: string | undefined };
}
export interface CancelJobExecutionResponse {}
export interface ClearDefaultAuthorizerRequest {}
export interface ClearDefaultAuthorizerResponse {}
export type ConfirmationToken = string;
export interface ConfirmTopicRuleDestinationRequest {
  confirmationToken: string;
}
export interface ConfirmTopicRuleDestinationResponse {}
export type AuditCheckName = string;
export type CognitoIdentityPoolId = string;
export type ClientId = string;
export type PolicyVersionId = string;
export interface PolicyVersionIdentifier {
  policyName?: string;
  policyVersionId?: string;
}
export type AwsAccountId = string;
export type RoleArn = string;
export type RoleAliasArn = string;
export type IssuerCertificateSubject = string;
export type IssuerId = string;
export type IssuerCertificateSerialNumber = string;
export interface IssuerCertificateIdentifier {
  issuerCertificateSubject?: string;
  issuerId?: string;
  issuerCertificateSerialNumber?: string;
}
export type CertificateArn = string;
export interface ResourceIdentifier {
  deviceCertificateId?: string;
  caCertificateId?: string;
  cognitoIdentityPoolId?: string;
  clientId?: string;
  policyVersionIdentifier?: PolicyVersionIdentifier;
  account?: string;
  iamRoleArn?: string;
  roleAliasArn?: string;
  issuerCertificateIdentifier?: IssuerCertificateIdentifier;
  deviceCertificateArn?: string;
}
export type SuppressIndefinitely = boolean;
export type AuditDescription = string;
export type ClientRequestToken = string;
export interface CreateAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
  clientRequestToken: string;
}
export interface CreateAuditSuppressionResponse {}
export type AuthorizerName = string;
export type AuthorizerFunctionArn = string;
export type TokenKeyName = string;
export type KeyName = string;
export type KeyValue = string;
export type PublicKeyMap = { [key: string]: string | undefined };
export type AuthorizerStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export type BooleanKey = boolean;
export type EnableCachingForHttp = boolean;
export interface CreateAuthorizerRequest {
  authorizerName: string;
  authorizerFunctionArn: string;
  tokenKeyName?: string;
  tokenSigningPublicKeys?: { [key: string]: string | undefined };
  status?: AuthorizerStatus;
  tags?: Tag[];
  signingDisabled?: boolean;
  enableCachingForHttp?: boolean;
}
export type AuthorizerArn = string;
export interface CreateAuthorizerResponse {
  authorizerName?: string;
  authorizerArn?: string;
}
export type BillingGroupDescription = string;
export interface BillingGroupProperties {
  billingGroupDescription?: string;
}
export interface CreateBillingGroupRequest {
  billingGroupName: string;
  billingGroupProperties?: BillingGroupProperties;
  tags?: Tag[];
}
export type BillingGroupId = string;
export interface CreateBillingGroupResponse {
  billingGroupName?: string;
  billingGroupArn?: string;
  billingGroupId?: string;
}
export type CertificateSigningRequest = string;
export interface CreateCertificateFromCsrRequest {
  certificateSigningRequest: string;
  setAsActive?: boolean;
}
export type CertificatePem = string;
export interface CreateCertificateFromCsrResponse {
  certificateArn?: string;
  certificateId?: string;
  certificatePem?: string;
}
export type CertificateProviderName = string;
export type CertificateProviderFunctionArn = string;
export type CertificateProviderOperation =
  | "CreateCertificateFromCsr"
  | (string & {});
export type CertificateProviderAccountDefaultForOperations =
  CertificateProviderOperation[];
export interface CreateCertificateProviderRequest {
  certificateProviderName: string;
  lambdaFunctionArn: string;
  accountDefaultForOperations: CertificateProviderOperation[];
  clientToken?: string;
  tags?: Tag[];
}
export type CertificateProviderArn = string;
export interface CreateCertificateProviderResponse {
  certificateProviderName?: string;
  certificateProviderArn?: string;
}
export type CommandId = string;
export type CommandNamespace = "AWS-IoT" | "AWS-IoT-FleetWise" | (string & {});
export type DisplayName = string;
export type CommandDescription = string;
export type CommandPayloadBlob = Uint8Array;
export type MimeType = string;
export interface CommandPayload {
  content?: Uint8Array;
  contentType?: string;
}
export type CommandPayloadTemplateString = string;
export type OutputFormat = "JSON" | "CBOR" | (string & {});
export interface AwsJsonSubstitutionCommandPreprocessorConfig {
  outputFormat: OutputFormat;
}
export interface CommandPreprocessor {
  awsJsonSubstitution?: AwsJsonSubstitutionCommandPreprocessorConfig;
}
export type CommandParameterName = string;
export type CommandParameterType =
  | "STRING"
  | "INTEGER"
  | "DOUBLE"
  | "LONG"
  | "UNSIGNEDLONG"
  | "BOOLEAN"
  | "BINARY"
  | (string & {});
export type StringParameterValue = string;
export type BooleanParameterValue = boolean;
export type IntegerParameterValue = number;
export type LongParameterValue = number;
export type DoubleParameterValue = number;
export type BinaryParameterValue = Uint8Array;
export type UnsignedLongParameterValue = string;
export interface CommandParameterValue {
  S?: string;
  B?: boolean;
  I?: number;
  L?: number;
  D?: number;
  BIN?: Uint8Array;
  UL?: string;
}
export type CommandParameterValueComparisonOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_EQUALS"
  | "GREATER_THAN"
  | "GREATER_THAN_EQUALS"
  | "IN_SET"
  | "NOT_IN_SET"
  | "IN_RANGE"
  | "NOT_IN_RANGE"
  | (string & {});
export type CommandParameterValueStringList = string[];
export interface CommandParameterValueNumberRange {
  min: string;
  max: string;
}
export interface CommandParameterValueComparisonOperand {
  number?: string;
  numbers?: string[];
  string?: string;
  strings?: string[];
  numberRange?: CommandParameterValueNumberRange;
}
export interface CommandParameterValueCondition {
  comparisonOperator: CommandParameterValueComparisonOperator;
  operand: CommandParameterValueComparisonOperand;
}
export type CommandParameterValueConditionList =
  CommandParameterValueCondition[];
export type CommandParameterDescription = string;
export interface CommandParameter {
  name: string;
  type?: CommandParameterType;
  value?: CommandParameterValue;
  defaultValue?: CommandParameterValue;
  valueConditions?: CommandParameterValueCondition[];
  description?: string;
}
export type CommandParameterList = CommandParameter[];
export interface CreateCommandRequest {
  commandId: string;
  namespace?: CommandNamespace;
  displayName?: string;
  description?: string;
  payload?: CommandPayload;
  payloadTemplate?: string;
  preprocessor?: CommandPreprocessor;
  mandatoryParameters?: CommandParameter[];
  roleArn?: string;
  tags?: Tag[];
}
export type CommandArn = string;
export interface CreateCommandResponse {
  commandId?: string;
  commandArn?: string;
}
export type MetricName = string;
export type CustomMetricDisplayName = string;
export type CustomMetricType =
  | "string-list"
  | "ip-address-list"
  | "number-list"
  | "number"
  | (string & {});
export interface CreateCustomMetricRequest {
  metricName: string;
  displayName?: string;
  metricType: CustomMetricType;
  tags?: Tag[];
  clientRequestToken: string;
}
export type CustomMetricArn = string;
export interface CreateCustomMetricResponse {
  metricName?: string;
  metricArn?: string;
}
export type DimensionName = string;
export type DimensionType = "TOPIC_FILTER" | (string & {});
export type DimensionStringValue = string;
export type DimensionStringValues = string[];
export interface CreateDimensionRequest {
  name: string;
  type: DimensionType;
  stringValues: string[];
  tags?: Tag[];
  clientRequestToken: string;
}
export type DimensionArn = string;
export interface CreateDimensionResponse {
  name?: string;
  arn?: string;
}
export type DomainConfigurationName = string;
export type DomainName = string;
export type AcmCertificateArn = string;
export type ServerCertificateArns = string[];
export type AllowAuthorizerOverride = boolean;
export interface AuthorizerConfig {
  defaultAuthorizerName?: string;
  allowAuthorizerOverride?: boolean;
}
export type ServiceType =
  | "DATA"
  | "CREDENTIAL_PROVIDER"
  | "JOBS"
  | (string & {});
export type SecurityPolicy = string;
export interface TlsConfig {
  securityPolicy?: string;
}
export type EnableOCSPCheck = boolean;
export type OCSPLambdaArn = string;
export interface ServerCertificateConfig {
  enableOCSPCheck?: boolean;
  ocspLambdaArn?: string;
  ocspAuthorizedResponderArn?: string;
}
export type AuthenticationType =
  | "CUSTOM_AUTH_X509"
  | "CUSTOM_AUTH"
  | "AWS_X509"
  | "AWS_SIGV4"
  | "DEFAULT"
  | (string & {});
export type ApplicationProtocol =
  | "SECURE_MQTT"
  | "MQTT_WSS"
  | "HTTPS"
  | "DEFAULT"
  | (string & {});
export type ClientCertificateCallbackArn = string;
export interface ClientCertificateConfig {
  clientCertificateCallbackArn?: string;
}
export interface CreateDomainConfigurationRequest {
  domainConfigurationName: string;
  domainName?: string;
  serverCertificateArns?: string[];
  validationCertificateArn?: string;
  authorizerConfig?: AuthorizerConfig;
  serviceType?: ServiceType;
  tags?: Tag[];
  tlsConfig?: TlsConfig;
  serverCertificateConfig?: ServerCertificateConfig;
  authenticationType?: AuthenticationType;
  applicationProtocol?: ApplicationProtocol;
  clientCertificateConfig?: ClientCertificateConfig;
}
export type DomainConfigurationArn = string;
export interface CreateDomainConfigurationResponse {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
}
export type ThingGroupDescription = string;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export type Flag = boolean;
export interface AttributePayload {
  attributes?: { [key: string]: string | undefined };
  merge?: boolean;
}
export interface ThingGroupProperties {
  thingGroupDescription?: string;
  attributePayload?: AttributePayload;
}
export type IndexName = string;
export type QueryString = string;
export type QueryVersion = string;
export interface CreateDynamicThingGroupRequest {
  thingGroupName: string;
  thingGroupProperties?: ThingGroupProperties;
  indexName?: string;
  queryString: string;
  queryVersion?: string;
  tags?: Tag[];
}
export type ThingGroupId = string;
export interface CreateDynamicThingGroupResponse {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingGroupId?: string;
  indexName?: string;
  queryString?: string;
  queryVersion?: string;
}
export type FleetMetricName = string;
export type AggregationTypeName =
  | "Statistics"
  | "Percentiles"
  | "Cardinality"
  | (string & {});
export type AggregationTypeValue = string;
export type AggregationTypeValues = string[];
export interface AggregationType {
  name: AggregationTypeName;
  values?: string[];
}
export type FleetMetricPeriod = number;
export type AggregationField = string;
export type FleetMetricDescription = string;
export type FleetMetricUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export interface CreateFleetMetricRequest {
  metricName: string;
  queryString: string;
  aggregationType: AggregationType;
  period: number;
  aggregationField: string;
  description?: string;
  queryVersion?: string;
  indexName?: string;
  unit?: FleetMetricUnit;
  tags?: Tag[];
}
export type FleetMetricArn = string;
export interface CreateFleetMetricResponse {
  metricName?: string;
  metricArn?: string;
}
export type JobDocumentSource = string;
export type JobDocument = string;
export type ExpiresInSec = number;
export interface PresignedUrlConfig {
  roleArn?: string;
  expiresInSec?: number;
}
export type TargetSelection = "CONTINUOUS" | "SNAPSHOT" | (string & {});
export type MaxJobExecutionsPerMin = number;
export type RolloutRatePerMinute = number;
export type IncrementFactor = number;
export type NumberOfThings = number;
export interface RateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export interface ExponentialRolloutRate {
  baseRatePerMinute: number;
  incrementFactor: number;
  rateIncreaseCriteria: RateIncreaseCriteria;
}
export interface JobExecutionsRolloutConfig {
  maximumPerMinute?: number;
  exponentialRate?: ExponentialRolloutRate;
}
export type JobExecutionFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export type AbortAction = "CANCEL" | (string & {});
export type AbortThresholdPercentage = number;
export type MinimumNumberOfExecutedThings = number;
export interface AbortCriteria {
  failureType: JobExecutionFailureType;
  action: AbortAction;
  thresholdPercentage: number;
  minNumberOfExecutedThings: number;
}
export type AbortCriteriaList = AbortCriteria[];
export interface AbortConfig {
  criteriaList: AbortCriteria[];
}
export type InProgressTimeoutInMinutes = number;
export interface TimeoutConfig {
  inProgressTimeoutInMinutes?: number;
}
export type JobTemplateArn = string;
export type RetryableFailureType =
  | "FAILED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export type NumberOfRetries = number;
export interface RetryCriteria {
  failureType: RetryableFailureType;
  numberOfRetries: number;
}
export type RetryCriteriaList = RetryCriteria[];
export interface JobExecutionsRetryConfig {
  criteriaList: RetryCriteria[];
}
export type ParameterKey = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export type StringDateTime = string;
export type JobEndBehavior =
  | "STOP_ROLLOUT"
  | "CANCEL"
  | "FORCE_CANCEL"
  | (string & {});
export type CronExpression = string;
export type DurationInMinutes = number;
export interface MaintenanceWindow {
  startTime: string;
  durationInMinutes: number;
}
export type MaintenanceWindows = MaintenanceWindow[];
export interface SchedulingConfig {
  startTime?: string;
  endTime?: string;
  endBehavior?: JobEndBehavior;
  maintenanceWindows?: MaintenanceWindow[];
}
export type PackageVersionArn = string;
export type DestinationPackageVersions = string[];
export interface CreateJobRequest {
  jobId: string;
  targets: string[];
  documentSource?: string;
  document?: string;
  description?: string;
  presignedUrlConfig?: PresignedUrlConfig;
  targetSelection?: TargetSelection;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  tags?: Tag[];
  namespaceId?: string;
  jobTemplateArn?: string;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  documentParameters?: { [key: string]: string | undefined };
  schedulingConfig?: SchedulingConfig;
  destinationPackageVersions?: string[];
}
export interface CreateJobResponse {
  jobArn?: string;
  jobId?: string;
  description?: string;
}
export type JobTemplateId = string;
export interface CreateJobTemplateRequest {
  jobTemplateId: string;
  jobArn?: string;
  documentSource?: string;
  document?: string;
  description: string;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  tags?: Tag[];
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  maintenanceWindows?: MaintenanceWindow[];
  destinationPackageVersions?: string[];
}
export interface CreateJobTemplateResponse {
  jobTemplateArn?: string;
  jobTemplateId?: string;
}
export interface CreateKeysAndCertificateRequest {
  setAsActive?: boolean;
}
export type PublicKey = string;
export type PrivateKey = string | redacted.Redacted<string>;
export interface KeyPair {
  PublicKey?: string;
  PrivateKey?: string | redacted.Redacted<string>;
}
export interface CreateKeysAndCertificateResponse {
  certificateArn?: string;
  certificateId?: string;
  certificatePem?: string;
  keyPair?: KeyPair;
}
export type MitigationActionName = string;
export type DeviceCertificateUpdateAction = "DEACTIVATE" | (string & {});
export interface UpdateDeviceCertificateParams {
  action: DeviceCertificateUpdateAction;
}
export type CACertificateUpdateAction = "DEACTIVATE" | (string & {});
export interface UpdateCACertificateParams {
  action: CACertificateUpdateAction;
}
export type ThingGroupNames = string[];
export interface AddThingsToThingGroupParams {
  thingGroupNames: string[];
  overrideDynamicGroups?: boolean;
}
export type PolicyTemplateName = "BLANK_POLICY" | (string & {});
export interface ReplaceDefaultPolicyVersionParams {
  templateName: PolicyTemplateName;
}
export type LogLevel =
  | "DEBUG"
  | "INFO"
  | "ERROR"
  | "WARN"
  | "DISABLED"
  | (string & {});
export interface EnableIoTLoggingParams {
  roleArnForLogging: string;
  logLevel: LogLevel;
}
export type SnsTopicArn = string;
export interface PublishFindingToSnsParams {
  topicArn: string;
}
export interface MitigationActionParams {
  updateDeviceCertificateParams?: UpdateDeviceCertificateParams;
  updateCACertificateParams?: UpdateCACertificateParams;
  addThingsToThingGroupParams?: AddThingsToThingGroupParams;
  replaceDefaultPolicyVersionParams?: ReplaceDefaultPolicyVersionParams;
  enableIoTLoggingParams?: EnableIoTLoggingParams;
  publishFindingToSnsParams?: PublishFindingToSnsParams;
}
export interface CreateMitigationActionRequest {
  actionName: string;
  roleArn: string;
  actionParams: MitigationActionParams;
  tags?: Tag[];
}
export type MitigationActionArn = string;
export type MitigationActionId = string;
export interface CreateMitigationActionResponse {
  actionArn?: string;
  actionId?: string;
}
export type OTAUpdateId = string;
export type OTAUpdateDescription = string;
export type Target = string;
export type Targets = string[];
export type Protocol = "MQTT" | "HTTP" | (string & {});
export type Protocols = Protocol[];
export type MaximumPerMinute = number;
export type AwsJobRolloutRatePerMinute = number;
export type AwsJobRolloutIncrementFactor = number;
export type AwsJobRateIncreaseCriteriaNumberOfThings = number;
export interface AwsJobRateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export interface AwsJobExponentialRolloutRate {
  baseRatePerMinute: number;
  incrementFactor: number;
  rateIncreaseCriteria: AwsJobRateIncreaseCriteria;
}
export interface AwsJobExecutionsRolloutConfig {
  maximumPerMinute?: number;
  exponentialRate?: AwsJobExponentialRolloutRate;
}
export type ExpiresInSeconds = number;
export interface AwsJobPresignedUrlConfig {
  expiresInSec?: number;
}
export type AwsJobAbortCriteriaFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export type AwsJobAbortCriteriaAbortAction = "CANCEL" | (string & {});
export type AwsJobAbortCriteriaAbortThresholdPercentage = number;
export type AwsJobAbortCriteriaMinimumNumberOfExecutedThings = number;
export interface AwsJobAbortCriteria {
  failureType: AwsJobAbortCriteriaFailureType;
  action: AwsJobAbortCriteriaAbortAction;
  thresholdPercentage: number;
  minNumberOfExecutedThings: number;
}
export type AwsJobAbortCriteriaList = AwsJobAbortCriteria[];
export interface AwsJobAbortConfig {
  abortCriteriaList: AwsJobAbortCriteria[];
}
export type AwsJobTimeoutInProgressTimeoutInMinutes = number;
export interface AwsJobTimeoutConfig {
  inProgressTimeoutInMinutes?: number;
}
export type FileName = string;
export type FileType = number;
export type OTAUpdateFileVersion = string;
export type StreamId = string;
export type FileId = number;
export interface Stream {
  streamId?: string;
  fileId?: number;
}
export interface FileLocation {
  stream?: Stream;
  s3Location?: S3Location;
}
export type SigningJobId = string;
export type Platform = string;
export type CertificatePathOnDevice = string;
export interface SigningProfileParameter {
  certificateArn?: string;
  platform?: string;
  certificatePathOnDevice?: string;
}
export type SigningProfileName = string;
export type Prefix = string;
export interface S3Destination {
  bucket?: string;
  prefix?: string;
}
export interface Destination {
  s3Destination?: S3Destination;
}
export interface StartSigningJobParameter {
  signingProfileParameter?: SigningProfileParameter;
  signingProfileName?: string;
  destination?: Destination;
}
export type Signature = Uint8Array;
export interface CodeSigningSignature {
  inlineDocument?: Uint8Array;
}
export type CertificateName = string;
export type InlineDocument = string;
export interface CodeSigningCertificateChain {
  certificateName?: string;
  inlineDocument?: string;
}
export type HashAlgorithm = string;
export type SignatureAlgorithm = string;
export interface CustomCodeSigning {
  signature?: CodeSigningSignature;
  certificateChain?: CodeSigningCertificateChain;
  hashAlgorithm?: string;
  signatureAlgorithm?: string;
}
export interface CodeSigning {
  awsSignerJobId?: string;
  startSigningJobParameter?: StartSigningJobParameter;
  customCodeSigning?: CustomCodeSigning;
}
export type AttributeKey = string;
export type Value = string;
export type AttributesMap = { [key: string]: string | undefined };
export interface OTAUpdateFile {
  fileName?: string;
  fileType?: number;
  fileVersion?: string;
  fileLocation?: FileLocation;
  codeSigning?: CodeSigning;
  attributes?: { [key: string]: string | undefined };
}
export type OTAUpdateFiles = OTAUpdateFile[];
export type AdditionalParameterMap = { [key: string]: string | undefined };
export interface CreateOTAUpdateRequest {
  otaUpdateId: string;
  description?: string;
  targets: string[];
  protocols?: Protocol[];
  targetSelection?: TargetSelection;
  awsJobExecutionsRolloutConfig?: AwsJobExecutionsRolloutConfig;
  awsJobPresignedUrlConfig?: AwsJobPresignedUrlConfig;
  awsJobAbortConfig?: AwsJobAbortConfig;
  awsJobTimeoutConfig?: AwsJobTimeoutConfig;
  files: OTAUpdateFile[];
  roleArn: string;
  additionalParameters?: { [key: string]: string | undefined };
  tags?: Tag[];
}
export type AwsIotJobId = string;
export type OTAUpdateArn = string;
export type AwsIotJobArn = string;
export type OTAUpdateStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateOTAUpdateResponse {
  otaUpdateId?: string;
  awsIotJobId?: string;
  otaUpdateArn?: string;
  awsIotJobArn?: string;
  otaUpdateStatus?: OTAUpdateStatus;
}
export type ResourceDescription = string | redacted.Redacted<string>;
export type TagMap = { [key: string]: string | undefined };
export interface CreatePackageRequest {
  packageName: string;
  description?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type PackageArn = string;
export interface CreatePackageResponse {
  packageName?: string;
  packageArn?: string;
  description?: string | redacted.Redacted<string>;
}
export type ResourceAttributeKey = string;
export type ResourceAttributeValue = string;
export type ResourceAttributes = { [key: string]: string | undefined };
export interface PackageVersionArtifact {
  s3Location?: S3Location;
}
export type PackageVersionRecipe = string | redacted.Redacted<string>;
export interface CreatePackageVersionRequest {
  packageName: string;
  versionName: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  artifact?: PackageVersionArtifact;
  recipe?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type PackageVersionStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "DEPRECATED"
  | (string & {});
export type PackageVersionErrorReason = string;
export interface CreatePackageVersionResponse {
  packageVersionArn?: string;
  packageName?: string;
  versionName?: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  status?: PackageVersionStatus;
  errorReason?: string;
}
export type PolicyDocument = string;
export interface CreatePolicyRequest {
  policyName: string;
  policyDocument: string;
  tags?: Tag[];
}
export type PolicyArn = string;
export interface CreatePolicyResponse {
  policyName?: string;
  policyArn?: string;
  policyDocument?: string;
  policyVersionId?: string;
}
export type SetAsDefault = boolean;
export interface CreatePolicyVersionRequest {
  policyName: string;
  policyDocument: string;
  setAsDefault?: boolean;
}
export type IsDefaultVersion = boolean;
export interface CreatePolicyVersionResponse {
  policyArn?: string;
  policyDocument?: string;
  policyVersionId?: string;
  isDefaultVersion?: boolean;
}
export type TemplateName = string;
export interface CreateProvisioningClaimRequest {
  templateName: string;
}
export interface CreateProvisioningClaimResponse {
  certificateId?: string;
  certificatePem?: string;
  keyPair?: KeyPair;
  expiration?: Date;
}
export type TemplateDescription = string;
export type TemplateBody = string;
export type Enabled2 = boolean;
export type PayloadVersion = string;
export interface ProvisioningHook {
  payloadVersion?: string;
  targetArn: string;
}
export type TemplateType = "FLEET_PROVISIONING" | "JITP" | (string & {});
export interface CreateProvisioningTemplateRequest {
  templateName: string;
  description?: string;
  templateBody: string;
  enabled?: boolean;
  provisioningRoleArn: string;
  preProvisioningHook?: ProvisioningHook;
  tags?: Tag[];
  type?: TemplateType;
}
export type TemplateArn = string;
export type TemplateVersionId = number;
export interface CreateProvisioningTemplateResponse {
  templateArn?: string;
  templateName?: string;
  defaultVersionId?: number;
}
export interface CreateProvisioningTemplateVersionRequest {
  templateName: string;
  templateBody: string;
  setAsDefault?: boolean;
}
export interface CreateProvisioningTemplateVersionResponse {
  templateArn?: string;
  templateName?: string;
  versionId?: number;
  isDefaultVersion?: boolean;
}
export type RoleAlias = string;
export type CredentialDurationSeconds = number;
export interface CreateRoleAliasRequest {
  roleAlias: string;
  roleArn: string;
  credentialDurationSeconds?: number;
  tags?: Tag[];
}
export interface CreateRoleAliasResponse {
  roleAlias?: string;
  roleAliasArn?: string;
}
export type AuditFrequency =
  | "DAILY"
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | (string & {});
export type DayOfMonth = string;
export type DayOfWeek =
  | "SUN"
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | (string & {});
export type TargetAuditCheckNames = string[];
export type ScheduledAuditName = string;
export interface CreateScheduledAuditRequest {
  frequency: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
  targetCheckNames: string[];
  scheduledAuditName: string;
  tags?: Tag[];
}
export type ScheduledAuditArn = string;
export interface CreateScheduledAuditResponse {
  scheduledAuditArn?: string;
}
export type SecurityProfileDescription = string;
export type BehaviorName = string;
export type BehaviorMetric = string;
export type DimensionValueOperator = "IN" | "NOT_IN" | (string & {});
export interface MetricDimension {
  dimensionName: string;
  operator?: DimensionValueOperator;
}
export type ComparisonOperator =
  | "less-than"
  | "less-than-equals"
  | "greater-than"
  | "greater-than-equals"
  | "in-cidr-set"
  | "not-in-cidr-set"
  | "in-port-set"
  | "not-in-port-set"
  | "in-set"
  | "not-in-set"
  | (string & {});
export type UnsignedLong = number;
export type Cidr = string;
export type Cidrs = string[];
export type Port = number;
export type Ports = number[];
export type NumberList = number[];
export type StringValue = string;
export type StringList = string[];
export interface MetricValue {
  count?: number;
  cidrs?: string[];
  ports?: number[];
  number?: number;
  numbers?: number[];
  strings?: string[];
}
export type DurationSeconds = number;
export type ConsecutiveDatapointsToAlarm = number;
export type ConsecutiveDatapointsToClear = number;
export type EvaluationStatistic = string;
export interface StatisticalThreshold {
  statistic?: string;
}
export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export interface MachineLearningDetectionConfig {
  confidenceLevel: ConfidenceLevel;
}
export interface BehaviorCriteria {
  comparisonOperator?: ComparisonOperator;
  value?: MetricValue;
  durationSeconds?: number;
  consecutiveDatapointsToAlarm?: number;
  consecutiveDatapointsToClear?: number;
  statisticalThreshold?: StatisticalThreshold;
  mlDetectionConfig?: MachineLearningDetectionConfig;
}
export type SuppressAlerts = boolean;
export type ExportMetric = boolean;
export interface Behavior {
  name: string;
  metric?: string;
  metricDimension?: MetricDimension;
  criteria?: BehaviorCriteria;
  suppressAlerts?: boolean;
  exportMetric?: boolean;
}
export type Behaviors = Behavior[];
export type AlertTargetType = "SNS" | (string & {});
export type AlertTargetArn = string;
export interface AlertTarget {
  alertTargetArn: string;
  roleArn: string;
}
export type AlertTargets = { [key in AlertTargetType]?: AlertTarget };
export type AdditionalMetricsToRetainList = string[];
export interface MetricToRetain {
  metric: string;
  metricDimension?: MetricDimension;
  exportMetric?: boolean;
}
export type AdditionalMetricsToRetainV2List = MetricToRetain[];
export type MqttTopic = string;
export interface MetricsExportConfig {
  mqttTopic: string;
  roleArn: string;
}
export interface CreateSecurityProfileRequest {
  securityProfileName: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  tags?: Tag[];
  metricsExportConfig?: MetricsExportConfig;
}
export type SecurityProfileArn = string;
export interface CreateSecurityProfileResponse {
  securityProfileName?: string;
  securityProfileArn?: string;
}
export type StreamDescription = string;
export interface StreamFile {
  fileId?: number;
  s3Location?: S3Location;
}
export type StreamFiles = StreamFile[];
export interface CreateStreamRequest {
  streamId: string;
  description?: string;
  files: StreamFile[];
  roleArn: string;
  tags?: Tag[];
}
export type StreamArn = string;
export type StreamVersion = number;
export interface CreateStreamResponse {
  streamId?: string;
  streamArn?: string;
  description?: string;
  streamVersion?: number;
}
export type ThingTypeName = string;
export interface CreateThingRequest {
  thingName: string;
  thingTypeName?: string;
  attributePayload?: AttributePayload;
  billingGroupName?: string;
}
export type ThingId = string;
export interface CreateThingResponse {
  thingName?: string;
  thingArn?: string;
  thingId?: string;
}
export interface CreateThingGroupRequest {
  thingGroupName: string;
  parentGroupName?: string;
  thingGroupProperties?: ThingGroupProperties;
  tags?: Tag[];
}
export interface CreateThingGroupResponse {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingGroupId?: string;
}
export type ThingTypeDescription = string;
export type SearchableAttributes = string[];
export type UserPropertyKeyName = string;
export type ConnectionAttributeName = string;
export interface PropagatingAttribute {
  userPropertyKey?: string;
  thingAttribute?: string;
  connectionAttribute?: string;
}
export type PropagatingAttributeList = PropagatingAttribute[];
export interface Mqtt5Configuration {
  propagatingAttributes?: PropagatingAttribute[];
}
export interface ThingTypeProperties {
  thingTypeDescription?: string;
  searchableAttributes?: string[];
  mqtt5Configuration?: Mqtt5Configuration;
}
export interface CreateThingTypeRequest {
  thingTypeName: string;
  thingTypeProperties?: ThingTypeProperties;
  tags?: Tag[];
}
export type ThingTypeArn = string;
export type ThingTypeId = string;
export interface CreateThingTypeResponse {
  thingTypeName?: string;
  thingTypeArn?: string;
  thingTypeId?: string;
}
export type RuleName = string;
export type SQL = string;
export type Description = string;
export type TableName = string;
export type AwsArn = string;
export type DynamoOperation = string;
export type HashKeyField = string;
export type HashKeyValue = string;
export type DynamoKeyType = "STRING" | "NUMBER" | (string & {});
export type RangeKeyField = string;
export type RangeKeyValue = string;
export type PayloadField = string;
export interface DynamoDBAction {
  tableName: string;
  roleArn: string;
  operation?: string;
  hashKeyField: string;
  hashKeyValue: string;
  hashKeyType?: DynamoKeyType;
  rangeKeyField?: string;
  rangeKeyValue?: string;
  rangeKeyType?: DynamoKeyType;
  payloadField?: string;
}
export interface PutItemInput {
  tableName: string;
}
export interface DynamoDBv2Action {
  roleArn: string;
  putItem: PutItemInput;
}
export type FunctionArn = string;
export interface LambdaAction {
  functionArn: string;
}
export type MessageFormat = "RAW" | "JSON" | (string & {});
export interface SnsAction {
  targetArn: string;
  roleArn: string;
  messageFormat?: MessageFormat;
}
export type QueueUrl = string;
export type UseBase64 = boolean;
export interface SqsAction {
  roleArn: string;
  queueUrl: string;
  useBase64?: boolean;
}
export type StreamName = string;
export type PartitionKey = string;
export interface KinesisAction {
  roleArn: string;
  streamName: string;
  partitionKey?: string;
}
export type TopicPattern = string;
export type Qos = number;
export type PayloadFormatIndicator = string;
export type ContentType = string;
export type ResponseTopic = string;
export type CorrelationData = string;
export type MessageExpiry = string;
export type UserPropertyKey = string;
export type UserPropertyValue = string;
export interface UserProperty {
  key: string;
  value: string;
}
export type UserProperties = UserProperty[];
export interface MqttHeaders {
  payloadFormatIndicator?: string;
  contentType?: string;
  responseTopic?: string;
  correlationData?: string;
  messageExpiry?: string;
  userProperties?: UserProperty[];
}
export interface RepublishAction {
  roleArn: string;
  topic: string;
  qos?: number;
  headers?: MqttHeaders;
}
export type BucketName = string;
export type Key = string;
export type CannedAccessControlList =
  | "private"
  | "public-read"
  | "public-read-write"
  | "aws-exec-read"
  | "authenticated-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | "log-delivery-write"
  | (string & {});
export interface S3Action {
  roleArn: string;
  bucketName: string;
  key: string;
  cannedAcl?: CannedAccessControlList;
}
export type DeliveryStreamName = string;
export type FirehoseSeparator = string;
export type BatchMode = boolean;
export interface FirehoseAction {
  roleArn: string;
  deliveryStreamName: string;
  separator?: string;
  batchMode?: boolean;
}
export interface CloudwatchMetricAction {
  roleArn: string;
  metricNamespace: string;
  metricName: string;
  metricValue: string;
  metricUnit: string;
  metricTimestamp?: string;
}
export type AlarmName = string;
export type StateReason = string;
export type StateValue = string;
export interface CloudwatchAlarmAction {
  roleArn: string;
  alarmName: string;
  stateReason: string;
  stateValue: string;
}
export type LogGroupName = string;
export interface CloudwatchLogsAction {
  roleArn: string;
  logGroupName: string;
  batchMode?: boolean;
}
export type ElasticsearchEndpoint = string;
export type ElasticsearchIndex = string;
export type ElasticsearchType = string;
export type ElasticsearchId = string;
export interface ElasticsearchAction {
  roleArn: string;
  endpoint: string;
  index: string;
  type: string;
  id: string;
}
export type SalesforceToken = string;
export type SalesforceEndpoint = string;
export interface SalesforceAction {
  token: string;
  url: string;
}
export type ChannelName = string;
export interface IotAnalyticsAction {
  channelArn?: string;
  channelName?: string;
  batchMode?: boolean;
  roleArn?: string;
}
export type InputName = string;
export type MessageId = string;
export interface IotEventsAction {
  inputName: string;
  messageId?: string;
  batchMode?: boolean;
  roleArn: string;
}
export type AssetPropertyEntryId = string;
export type AssetId = string;
export type AssetPropertyId = string;
export type AssetPropertyAlias = string;
export type AssetPropertyStringValue = string;
export type AssetPropertyIntegerValue = string;
export type AssetPropertyDoubleValue = string;
export type AssetPropertyBooleanValue = string;
export type AssetPropertyVariant =
  | {
      stringValue: string;
      integerValue?: never;
      doubleValue?: never;
      booleanValue?: never;
    }
  | {
      stringValue?: never;
      integerValue: string;
      doubleValue?: never;
      booleanValue?: never;
    }
  | {
      stringValue?: never;
      integerValue?: never;
      doubleValue: string;
      booleanValue?: never;
    }
  | {
      stringValue?: never;
      integerValue?: never;
      doubleValue?: never;
      booleanValue: string;
    };
export type AssetPropertyTimeInSeconds = string;
export type AssetPropertyOffsetInNanos = string;
export interface AssetPropertyTimestamp {
  timeInSeconds: string;
  offsetInNanos?: string;
}
export type AssetPropertyQuality = string;
export interface AssetPropertyValue {
  value: AssetPropertyVariant;
  timestamp: AssetPropertyTimestamp;
  quality?: string;
}
export type AssetPropertyValueList = AssetPropertyValue[];
export interface PutAssetPropertyValueEntry {
  entryId?: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  propertyValues: AssetPropertyValue[];
}
export type PutAssetPropertyValueEntryList = PutAssetPropertyValueEntry[];
export interface IotSiteWiseAction {
  putAssetPropertyValueEntries: PutAssetPropertyValueEntry[];
  roleArn: string;
}
export type ExecutionNamePrefix = string;
export type StateMachineName = string;
export interface StepFunctionsAction {
  executionNamePrefix?: string;
  stateMachineName: string;
  roleArn: string;
}
export type TimestreamDatabaseName = string;
export type TimestreamTableName = string;
export type TimestreamDimensionName = string;
export type TimestreamDimensionValue = string;
export interface TimestreamDimension {
  name: string;
  value: string;
}
export type TimestreamDimensionList = TimestreamDimension[];
export type TimestreamTimestampValue = string;
export type TimestreamTimestampUnit = string;
export interface TimestreamTimestamp {
  value: string;
  unit: string;
}
export interface TimestreamAction {
  roleArn: string;
  databaseName: string;
  tableName: string;
  dimensions: TimestreamDimension[];
  timestamp?: TimestreamTimestamp;
}
export type Url = string;
export type HeaderKey = string;
export type HeaderValue = string;
export interface HttpActionHeader {
  key: string;
  value: string;
}
export type HeaderList = HttpActionHeader[];
export type SigningRegion = string;
export type ServiceName = string;
export interface SigV4Authorization {
  signingRegion: string;
  serviceName: string;
  roleArn: string;
}
export interface HttpAuthorization {
  sigv4?: SigV4Authorization;
}
export type EnableBatching = boolean;
export type MaxBatchOpenMs = number;
export type MaxBatchSize = number;
export type MaxBatchSizeBytes = number;
export type BatchAcrossTopics = boolean;
export interface BatchConfig {
  maxBatchOpenMs?: number;
  maxBatchSize?: number;
  maxBatchSizeBytes?: number;
  batchAcrossTopics?: boolean;
}
export interface HttpAction {
  url: string;
  confirmationUrl?: string;
  headers?: HttpActionHeader[];
  auth?: HttpAuthorization;
  enableBatching?: boolean;
  batchConfig?: BatchConfig;
}
export type ClientProperties = { [key: string]: string | undefined };
export type KafkaHeaderKey = string;
export type KafkaHeaderValue = string;
export interface KafkaActionHeader {
  key: string;
  value: string;
}
export type KafkaHeaders = KafkaActionHeader[];
export interface KafkaAction {
  destinationArn: string;
  topic: string;
  key?: string;
  partition?: string;
  clientProperties: { [key: string]: string | undefined };
  headers?: KafkaActionHeader[];
}
export interface OpenSearchAction {
  roleArn: string;
  endpoint: string;
  index: string;
  type: string;
  id: string;
}
export interface LocationTimestamp {
  value: string;
  unit?: string;
}
export interface LocationAction {
  roleArn: string;
  trackerName: string;
  deviceId: string;
  timestamp?: LocationTimestamp;
  latitude: string;
  longitude: string;
}
export type InfluxDBDatabaseName = string;
export type InfluxDBTableName = string;
export type InfluxDBOrganization = string;
export type InfluxDBTagName = string;
export type InfluxDBTagValue = string;
export type InfluxDBTagMap = { [key: string]: string | undefined };
export type InfluxDBTimestampUnit = "s" | "ms" | "us" | "ns" | (string & {});
export type InfluxDBMaxBatchSize = number;
export type InfluxDBMaxBatchOpenMs = number;
export type InfluxDBMaxBatchSizeBytes = number;
export type InfluxDBBatchAcrossTopics = boolean;
export interface InfluxDBBatchConfig {
  maxBatchSize?: number;
  maxBatchOpenMs?: number;
  maxBatchSizeBytes?: number;
  batchAcrossTopics?: boolean;
}
export interface InfluxDBAction {
  destinationArn: string;
  roleArn: string;
  databaseName: string;
  tableName: string;
  organization?: string;
  tags?: { [key: string]: string | undefined };
  timestampUnit?: InfluxDBTimestampUnit;
  batchConfig?: InfluxDBBatchConfig;
}
export interface Action {
  dynamoDB?: DynamoDBAction;
  dynamoDBv2?: DynamoDBv2Action;
  lambda?: LambdaAction;
  sns?: SnsAction;
  sqs?: SqsAction;
  kinesis?: KinesisAction;
  republish?: RepublishAction;
  s3?: S3Action;
  firehose?: FirehoseAction;
  cloudwatchMetric?: CloudwatchMetricAction;
  cloudwatchAlarm?: CloudwatchAlarmAction;
  cloudwatchLogs?: CloudwatchLogsAction;
  elasticsearch?: ElasticsearchAction;
  salesforce?: SalesforceAction;
  iotAnalytics?: IotAnalyticsAction;
  iotEvents?: IotEventsAction;
  iotSiteWise?: IotSiteWiseAction;
  stepFunctions?: StepFunctionsAction;
  timestream?: TimestreamAction;
  http?: HttpAction;
  kafka?: KafkaAction;
  openSearch?: OpenSearchAction;
  location?: LocationAction;
  influxDB?: InfluxDBAction;
}
export type ActionList = Action[];
export type IsDisabled = boolean;
export type AwsIotSqlVersion = string;
export interface TopicRulePayload {
  sql: string;
  description?: string;
  actions: Action[];
  ruleDisabled?: boolean;
  awsIotSqlVersion?: string;
  errorAction?: Action;
}
export interface CreateTopicRuleRequest {
  ruleName: string;
  topicRulePayload: TopicRulePayload;
  tags?: string;
}
export interface CreateTopicRuleResponse {}
export interface HttpUrlDestinationConfiguration {
  confirmationUrl: string;
}
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupList = string[];
export type VpcId = string;
export interface VpcDestinationConfiguration {
  subnetIds: string[];
  securityGroups?: string[];
  vpcId: string;
  roleArn: string;
}
export type InfluxDBVersion = "V2" | "V3" | (string & {});
export type InfluxDBSecretId = string;
export type InfluxDBSecretType =
  | "SecretString"
  | "SecretBinary"
  | (string & {});
export type InfluxDBSecretKey = string;
export interface InfluxDBDestinationConfiguration {
  endpoint: string;
  influxDBVersion: InfluxDBVersion;
  secretId: string;
  secretType?: InfluxDBSecretType;
  secretKey?: string;
}
export interface TopicRuleDestinationConfiguration {
  httpUrlConfiguration?: HttpUrlDestinationConfiguration;
  vpcConfiguration?: VpcDestinationConfiguration;
  influxDBConfiguration?: InfluxDBDestinationConfiguration;
}
export interface CreateTopicRuleDestinationRequest {
  destinationConfiguration: TopicRuleDestinationConfiguration;
}
export type TopicRuleDestinationStatus =
  | "ENABLED"
  | "IN_PROGRESS"
  | "DISABLED"
  | "ERROR"
  | "DELETING"
  | (string & {});
export type CreatedAtDate = Date;
export type LastUpdatedAtDate = Date;
export interface HttpUrlDestinationProperties {
  confirmationUrl?: string;
}
export interface VpcDestinationProperties {
  subnetIds?: string[];
  securityGroups?: string[];
  vpcId?: string;
  roleArn?: string;
}
export interface InfluxDBDestinationProperties {
  endpoint?: string;
  influxDBVersion?: InfluxDBVersion;
  secretId?: string;
  secretType?: InfluxDBSecretType;
  secretKey?: string;
}
export interface TopicRuleDestination {
  arn?: string;
  status?: TopicRuleDestinationStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  statusReason?: string;
  httpUrlProperties?: HttpUrlDestinationProperties;
  vpcProperties?: VpcDestinationProperties;
  influxDBProperties?: InfluxDBDestinationProperties;
}
export interface CreateTopicRuleDestinationResponse {
  topicRuleDestination?: TopicRuleDestination;
}
export type DeleteScheduledAudits = boolean;
export interface DeleteAccountAuditConfigurationRequest {
  deleteScheduledAudits?: boolean;
}
export interface DeleteAccountAuditConfigurationResponse {}
export interface DeleteAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
}
export interface DeleteAuditSuppressionResponse {}
export interface DeleteAuthorizerRequest {
  authorizerName: string;
}
export interface DeleteAuthorizerResponse {}
export type OptionalVersion = number;
export interface DeleteBillingGroupRequest {
  billingGroupName: string;
  expectedVersion?: number;
}
export interface DeleteBillingGroupResponse {}
export interface DeleteCACertificateRequest {
  certificateId: string;
}
export interface DeleteCACertificateResponse {}
export type ForceDelete = boolean;
export interface DeleteCertificateRequest {
  certificateId: string;
  forceDelete?: boolean;
}
export interface DeleteCertificateResponse {}
export interface DeleteCertificateProviderRequest {
  certificateProviderName: string;
}
export interface DeleteCertificateProviderResponse {}
export interface DeleteCommandRequest {
  commandId: string;
}
export type StatusCode = number;
export interface DeleteCommandResponse {
  statusCode?: number;
}
export type CommandExecutionId = string;
export interface DeleteCommandExecutionRequest {
  executionId: string;
  targetArn: string;
}
export interface DeleteCommandExecutionResponse {}
export interface DeleteCustomMetricRequest {
  metricName: string;
}
export interface DeleteCustomMetricResponse {}
export interface DeleteDimensionRequest {
  name: string;
}
export interface DeleteDimensionResponse {}
export interface DeleteDomainConfigurationRequest {
  domainConfigurationName: string;
}
export interface DeleteDomainConfigurationResponse {}
export interface DeleteDynamicThingGroupRequest {
  thingGroupName: string;
  expectedVersion?: number;
}
export interface DeleteDynamicThingGroupResponse {}
export interface DeleteFleetMetricRequest {
  metricName: string;
  expectedVersion?: number;
}
export interface DeleteFleetMetricResponse {}
export interface DeleteJobRequest {
  jobId: string;
  force?: boolean;
  namespaceId?: string;
}
export interface DeleteJobResponse {}
export type ExecutionNumber = number;
export interface DeleteJobExecutionRequest {
  jobId: string;
  thingName: string;
  executionNumber: number;
  force?: boolean;
  namespaceId?: string;
}
export interface DeleteJobExecutionResponse {}
export interface DeleteJobTemplateRequest {
  jobTemplateId: string;
}
export interface DeleteJobTemplateResponse {}
export interface DeleteMitigationActionRequest {
  actionName: string;
}
export interface DeleteMitigationActionResponse {}
export type DeleteStream_ = boolean;
export type ForceDeleteAWSJob = boolean;
export interface DeleteOTAUpdateRequest {
  otaUpdateId: string;
  deleteStream?: boolean;
  forceDeleteAWSJob?: boolean;
}
export interface DeleteOTAUpdateResponse {}
export interface DeletePackageRequest {
  packageName: string;
  clientToken?: string;
}
export interface DeletePackageResponse {}
export interface DeletePackageVersionRequest {
  packageName: string;
  versionName: string;
  clientToken?: string;
}
export interface DeletePackageVersionResponse {}
export interface DeletePolicyRequest {
  policyName: string;
}
export interface DeletePolicyResponse {}
export interface DeletePolicyVersionRequest {
  policyName: string;
  policyVersionId: string;
}
export interface DeletePolicyVersionResponse {}
export interface DeleteProvisioningTemplateRequest {
  templateName: string;
}
export interface DeleteProvisioningTemplateResponse {}
export interface DeleteProvisioningTemplateVersionRequest {
  templateName: string;
  versionId: number;
}
export interface DeleteProvisioningTemplateVersionResponse {}
export interface DeleteRegistrationCodeRequest {}
export interface DeleteRegistrationCodeResponse {}
export interface DeleteRoleAliasRequest {
  roleAlias: string;
}
export interface DeleteRoleAliasResponse {}
export interface DeleteScheduledAuditRequest {
  scheduledAuditName: string;
}
export interface DeleteScheduledAuditResponse {}
export interface DeleteSecurityProfileRequest {
  securityProfileName: string;
  expectedVersion?: number;
}
export interface DeleteSecurityProfileResponse {}
export interface DeleteStreamRequest {
  streamId: string;
}
export interface DeleteStreamResponse {}
export interface DeleteThingRequest {
  thingName: string;
  expectedVersion?: number;
}
export interface DeleteThingResponse {}
export interface DeleteThingGroupRequest {
  thingGroupName: string;
  expectedVersion?: number;
}
export interface DeleteThingGroupResponse {}
export interface DeleteThingTypeRequest {
  thingTypeName: string;
}
export interface DeleteThingTypeResponse {}
export interface DeleteTopicRuleRequest {
  ruleName: string;
}
export interface DeleteTopicRuleResponse {}
export interface DeleteTopicRuleDestinationRequest {
  arn: string;
}
export interface DeleteTopicRuleDestinationResponse {}
export type LogTargetType =
  | "DEFAULT"
  | "THING_GROUP"
  | "CLIENT_ID"
  | "SOURCE_IP"
  | "PRINCIPAL_ID"
  | (string & {});
export type LogTargetName = string;
export interface DeleteV2LoggingLevelRequest {
  targetType: LogTargetType;
  targetName: string;
}
export interface DeleteV2LoggingLevelResponse {}
export type UndoDeprecate = boolean;
export interface DeprecateThingTypeRequest {
  thingTypeName: string;
  undoDeprecate?: boolean;
}
export interface DeprecateThingTypeResponse {}
export interface DescribeAccountAuditConfigurationRequest {}
export type AuditNotificationType = "SNS" | (string & {});
export type Enabled = boolean;
export interface AuditNotificationTarget {
  targetArn?: string;
  roleArn?: string;
  enabled?: boolean;
}
export type AuditNotificationTargetConfigurations = {
  [key in AuditNotificationType]?: AuditNotificationTarget;
};
export type ConfigName =
  | "CERT_AGE_THRESHOLD_IN_DAYS"
  | "CERT_EXPIRATION_THRESHOLD_IN_DAYS"
  | (string & {});
export type ConfigValue = string;
export type CheckCustomConfiguration = { [key in ConfigName]?: string };
export interface AuditCheckConfiguration {
  enabled?: boolean;
  configuration?: { [key: string]: string | undefined };
}
export type AuditCheckConfigurations = {
  [key: string]: AuditCheckConfiguration | undefined;
};
export interface DescribeAccountAuditConfigurationResponse {
  roleArn?: string;
  auditNotificationTargetConfigurations?: {
    [key: string]: AuditNotificationTarget | undefined;
  };
  auditCheckConfigurations?: {
    [key: string]: AuditCheckConfiguration | undefined;
  };
}
export type FindingId = string;
export interface DescribeAuditFindingRequest {
  findingId: string;
}
export type AuditFindingSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | (string & {});
export type ResourceType =
  | "DEVICE_CERTIFICATE"
  | "CA_CERTIFICATE"
  | "IOT_POLICY"
  | "COGNITO_IDENTITY_POOL"
  | "CLIENT_ID"
  | "ACCOUNT_SETTINGS"
  | "ROLE_ALIAS"
  | "IAM_ROLE"
  | "ISSUER_CERTIFICATE"
  | (string & {});
export type StringMap = { [key: string]: string | undefined };
export interface NonCompliantResource {
  resourceType?: ResourceType;
  resourceIdentifier?: ResourceIdentifier;
  additionalInfo?: { [key: string]: string | undefined };
}
export interface RelatedResource {
  resourceType?: ResourceType;
  resourceIdentifier?: ResourceIdentifier;
  additionalInfo?: { [key: string]: string | undefined };
}
export type RelatedResources = RelatedResource[];
export type ReasonForNonCompliance = string;
export type ReasonForNonComplianceCode = string;
export type IsSuppressed = boolean;
export interface AuditFinding {
  findingId?: string;
  taskId?: string;
  checkName?: string;
  taskStartTime?: Date;
  findingTime?: Date;
  severity?: AuditFindingSeverity;
  nonCompliantResource?: NonCompliantResource;
  relatedResources?: RelatedResource[];
  reasonForNonCompliance?: string;
  reasonForNonComplianceCode?: string;
  isSuppressed?: boolean;
}
export interface DescribeAuditFindingResponse {
  finding?: AuditFinding;
}
export interface DescribeAuditMitigationActionsTaskRequest {
  taskId: string;
}
export type AuditMitigationActionsTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export type TotalFindingsCount = number;
export type FailedFindingsCount = number;
export type SucceededFindingsCount = number;
export type SkippedFindingsCount = number;
export type CanceledFindingsCount = number;
export interface TaskStatisticsForAuditCheck {
  totalFindingsCount?: number;
  failedFindingsCount?: number;
  succeededFindingsCount?: number;
  skippedFindingsCount?: number;
  canceledFindingsCount?: number;
}
export type AuditMitigationActionsTaskStatistics = {
  [key: string]: TaskStatisticsForAuditCheck | undefined;
};
export type FindingIds = string[];
export type ReasonForNonComplianceCodes = string[];
export type AuditCheckToReasonCodeFilter = {
  [key: string]: string[] | undefined;
};
export interface AuditMitigationActionsTaskTarget {
  auditTaskId?: string;
  findingIds?: string[];
  auditCheckToReasonCodeFilter?: { [key: string]: string[] | undefined };
}
export type MitigationActionNameList = string[];
export type AuditCheckToActionsMapping = {
  [key: string]: string[] | undefined;
};
export interface MitigationAction {
  name?: string;
  id?: string;
  roleArn?: string;
  actionParams?: MitigationActionParams;
}
export type MitigationActionList = MitigationAction[];
export interface DescribeAuditMitigationActionsTaskResponse {
  taskStatus?: AuditMitigationActionsTaskStatus;
  startTime?: Date;
  endTime?: Date;
  taskStatistics?: { [key: string]: TaskStatisticsForAuditCheck | undefined };
  target?: AuditMitigationActionsTaskTarget;
  auditCheckToActionsMapping?: { [key: string]: string[] | undefined };
  actionsDefinition?: MitigationAction[];
}
export interface DescribeAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
}
export interface DescribeAuditSuppressionResponse {
  checkName?: string;
  resourceIdentifier?: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
}
export interface DescribeAuditTaskRequest {
  taskId: string;
}
export type AuditTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export type AuditTaskType =
  | "ON_DEMAND_AUDIT_TASK"
  | "SCHEDULED_AUDIT_TASK"
  | (string & {});
export type TotalChecksCount = number;
export type InProgressChecksCount = number;
export type WaitingForDataCollectionChecksCount = number;
export type CompliantChecksCount = number;
export type NonCompliantChecksCount = number;
export type FailedChecksCount = number;
export type CanceledChecksCount = number;
export interface TaskStatistics {
  totalChecks?: number;
  inProgressChecks?: number;
  waitingForDataCollectionChecks?: number;
  compliantChecks?: number;
  nonCompliantChecks?: number;
  failedChecks?: number;
  canceledChecks?: number;
}
export type AuditCheckRunStatus =
  | "IN_PROGRESS"
  | "WAITING_FOR_DATA_COLLECTION"
  | "CANCELED"
  | "COMPLETED_COMPLIANT"
  | "COMPLETED_NON_COMPLIANT"
  | "FAILED"
  | (string & {});
export type CheckCompliant = boolean;
export type TotalResourcesCount = number;
export type NonCompliantResourcesCount = number;
export type SuppressedNonCompliantResourcesCount = number;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface AuditCheckDetails {
  checkRunStatus?: AuditCheckRunStatus;
  checkCompliant?: boolean;
  totalResourcesCount?: number;
  nonCompliantResourcesCount?: number;
  suppressedNonCompliantResourcesCount?: number;
  errorCode?: string;
  message?: string;
}
export type AuditDetails = { [key: string]: AuditCheckDetails | undefined };
export interface DescribeAuditTaskResponse {
  taskStatus?: AuditTaskStatus;
  taskType?: AuditTaskType;
  taskStartTime?: Date;
  taskStatistics?: TaskStatistics;
  scheduledAuditName?: string;
  auditDetails?: { [key: string]: AuditCheckDetails | undefined };
}
export interface DescribeAuthorizerRequest {
  authorizerName: string;
}
export interface AuthorizerDescription {
  authorizerName?: string;
  authorizerArn?: string;
  authorizerFunctionArn?: string;
  tokenKeyName?: string;
  tokenSigningPublicKeys?: { [key: string]: string | undefined };
  status?: AuthorizerStatus;
  creationDate?: Date;
  lastModifiedDate?: Date;
  signingDisabled?: boolean;
  enableCachingForHttp?: boolean;
}
export interface DescribeAuthorizerResponse {
  authorizerDescription?: AuthorizerDescription;
}
export interface DescribeBillingGroupRequest {
  billingGroupName: string;
}
export type Version = number;
export type CreationDate = Date;
export interface BillingGroupMetadata {
  creationDate?: Date;
}
export interface DescribeBillingGroupResponse {
  billingGroupName?: string;
  billingGroupId?: string;
  billingGroupArn?: string;
  version?: number;
  billingGroupProperties?: BillingGroupProperties;
  billingGroupMetadata?: BillingGroupMetadata;
}
export interface DescribeCACertificateRequest {
  certificateId: string;
}
export type CACertificateStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type AutoRegistrationStatus = "ENABLE" | "DISABLE" | (string & {});
export type CustomerVersion = number;
export type GenerationId = string;
export interface CertificateValidity {
  notBefore?: Date;
  notAfter?: Date;
}
export type CertificateMode = "DEFAULT" | "SNI_ONLY" | (string & {});
export interface CACertificateDescription {
  certificateArn?: string;
  certificateId?: string;
  status?: CACertificateStatus;
  certificatePem?: string;
  ownedBy?: string;
  creationDate?: Date;
  autoRegistrationStatus?: AutoRegistrationStatus;
  lastModifiedDate?: Date;
  customerVersion?: number;
  generationId?: string;
  validity?: CertificateValidity;
  certificateMode?: CertificateMode;
}
export interface RegistrationConfig {
  templateBody?: string;
  roleArn?: string;
  templateName?: string;
}
export interface DescribeCACertificateResponse {
  certificateDescription?: CACertificateDescription;
  registrationConfig?: RegistrationConfig;
}
export interface DescribeCertificateRequest {
  certificateId: string;
}
export type CertificateStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "REVOKED"
  | "PENDING_TRANSFER"
  | "REGISTER_INACTIVE"
  | "PENDING_ACTIVATION"
  | (string & {});
export type Message = string;
export interface TransferData {
  transferMessage?: string;
  rejectReason?: string;
  transferDate?: Date;
  acceptDate?: Date;
  rejectDate?: Date;
}
export interface CertificateDescription {
  certificateArn?: string;
  certificateId?: string;
  caCertificateId?: string;
  status?: CertificateStatus;
  certificatePem?: string;
  ownedBy?: string;
  previousOwnedBy?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  customerVersion?: number;
  transferData?: TransferData;
  generationId?: string;
  validity?: CertificateValidity;
  certificateMode?: CertificateMode;
}
export interface DescribeCertificateResponse {
  certificateDescription?: CertificateDescription;
}
export interface DescribeCertificateProviderRequest {
  certificateProviderName: string;
}
export interface DescribeCertificateProviderResponse {
  certificateProviderName?: string;
  certificateProviderArn?: string;
  lambdaFunctionArn?: string;
  accountDefaultForOperations?: CertificateProviderOperation[];
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface DescribeCustomMetricRequest {
  metricName: string;
}
export interface DescribeCustomMetricResponse {
  metricName?: string;
  metricArn?: string;
  metricType?: CustomMetricType;
  displayName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface DescribeDefaultAuthorizerRequest {}
export interface DescribeDefaultAuthorizerResponse {
  authorizerDescription?: AuthorizerDescription;
}
export interface DescribeDetectMitigationActionsTaskRequest {
  taskId: string;
}
export type DetectMitigationActionsTaskStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export type ViolationId = string;
export type TargetViolationIdsForDetectMitigationActions = string[];
export interface DetectMitigationActionsTaskTarget {
  violationIds?: string[];
  securityProfileName?: string;
  behaviorName?: string;
}
export interface ViolationEventOccurrenceRange {
  startTime: Date;
  endTime: Date;
}
export type PrimitiveBoolean = boolean;
export type GenericLongValue = number;
export interface DetectMitigationActionsTaskStatistics {
  actionsExecuted?: number;
  actionsSkipped?: number;
  actionsFailed?: number;
}
export interface DetectMitigationActionsTaskSummary {
  taskId?: string;
  taskStatus?: DetectMitigationActionsTaskStatus;
  taskStartTime?: Date;
  taskEndTime?: Date;
  target?: DetectMitigationActionsTaskTarget;
  violationEventOccurrenceRange?: ViolationEventOccurrenceRange;
  onlyActiveViolationsIncluded?: boolean;
  suppressedAlertsIncluded?: boolean;
  actionsDefinition?: MitigationAction[];
  taskStatistics?: DetectMitigationActionsTaskStatistics;
}
export interface DescribeDetectMitigationActionsTaskResponse {
  taskSummary?: DetectMitigationActionsTaskSummary;
}
export interface DescribeDimensionRequest {
  name: string;
}
export interface DescribeDimensionResponse {
  name?: string;
  arn?: string;
  type?: DimensionType;
  stringValues?: string[];
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export type ReservedDomainConfigurationName = string;
export interface DescribeDomainConfigurationRequest {
  domainConfigurationName: string;
}
export type ServerCertificateStatus = "INVALID" | "VALID" | (string & {});
export type ServerCertificateStatusDetail = string;
export interface ServerCertificateSummary {
  serverCertificateArn?: string;
  serverCertificateStatus?: ServerCertificateStatus;
  serverCertificateStatusDetail?: string;
}
export type ServerCertificates = ServerCertificateSummary[];
export type DomainConfigurationStatus = "ENABLED" | "DISABLED" | (string & {});
export type DomainType =
  | "ENDPOINT"
  | "AWS_MANAGED"
  | "CUSTOMER_MANAGED"
  | (string & {});
export interface DescribeDomainConfigurationResponse {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
  domainName?: string;
  serverCertificates?: ServerCertificateSummary[];
  authorizerConfig?: AuthorizerConfig;
  domainConfigurationStatus?: DomainConfigurationStatus;
  serviceType?: ServiceType;
  domainType?: DomainType;
  lastStatusChangeDate?: Date;
  tlsConfig?: TlsConfig;
  serverCertificateConfig?: ServerCertificateConfig;
  authenticationType?: AuthenticationType;
  applicationProtocol?: ApplicationProtocol;
  clientCertificateConfig?: ClientCertificateConfig;
}
export interface DescribeEncryptionConfigurationRequest {}
export type EncryptionType =
  | "CUSTOMER_MANAGED_KMS_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export type KmsKeyArn = string;
export type KmsAccessRoleArn = string;
export type ConfigurationStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export interface ConfigurationDetails {
  configurationStatus?: ConfigurationStatus;
  errorCode?: string;
  errorMessage?: string;
}
export interface DescribeEncryptionConfigurationResponse {
  encryptionType?: EncryptionType;
  kmsKeyArn?: string;
  kmsAccessRoleArn?: string;
  configurationDetails?: ConfigurationDetails;
  lastModifiedDate?: Date;
}
export type EndpointType = string;
export interface DescribeEndpointRequest {
  endpointType?: string;
}
export type EndpointAddress = string;
export interface DescribeEndpointResponse {
  endpointAddress?: string;
}
export interface DescribeEventConfigurationsRequest {}
export type EventType =
  | "THING"
  | "THING_GROUP"
  | "THING_TYPE"
  | "THING_GROUP_MEMBERSHIP"
  | "THING_GROUP_HIERARCHY"
  | "THING_TYPE_ASSOCIATION"
  | "JOB"
  | "JOB_EXECUTION"
  | "POLICY"
  | "CERTIFICATE"
  | "CA_CERTIFICATE"
  | (string & {});
export interface Configuration {
  Enabled?: boolean;
}
export type EventConfigurations = { [key in EventType]?: Configuration };
export type LastModifiedDate = Date;
export interface DescribeEventConfigurationsResponse {
  eventConfigurations?: { [key: string]: Configuration | undefined };
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface DescribeFleetMetricRequest {
  metricName: string;
}
export interface DescribeFleetMetricResponse {
  metricName?: string;
  queryString?: string;
  aggregationType?: AggregationType;
  period?: number;
  aggregationField?: string;
  description?: string;
  queryVersion?: string;
  indexName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  unit?: FleetMetricUnit;
  version?: number;
  metricArn?: string;
}
export interface DescribeIndexRequest {
  indexName: string;
}
export type IndexStatus = "ACTIVE" | "BUILDING" | "REBUILDING" | (string & {});
export type IndexSchema = string;
export interface DescribeIndexResponse {
  indexName?: string;
  indexStatus?: IndexStatus;
  schema?: string;
}
export type BeforeSubstitutionFlag = boolean;
export interface DescribeJobRequest {
  jobId: string;
  beforeSubstitution?: boolean;
}
export type JobStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "COMPLETED"
  | "DELETION_IN_PROGRESS"
  | "SCHEDULED"
  | (string & {});
export type Forced = boolean;
export type ProcessingTargetName = string;
export type ProcessingTargetNameList = string[];
export type CanceledThings = number;
export type SucceededThings = number;
export type FailedThings = number;
export type RejectedThings = number;
export type QueuedThings = number;
export type InProgressThings = number;
export type RemovedThings = number;
export type TimedOutThings = number;
export interface JobProcessDetails {
  processingTargets?: string[];
  numberOfCanceledThings?: number;
  numberOfSucceededThings?: number;
  numberOfFailedThings?: number;
  numberOfRejectedThings?: number;
  numberOfQueuedThings?: number;
  numberOfInProgressThings?: number;
  numberOfRemovedThings?: number;
  numberOfTimedOutThings?: number;
}
export type BooleanWrapperObject = boolean;
export interface ScheduledJobRollout {
  startTime?: string;
}
export type ScheduledJobRolloutList = ScheduledJobRollout[];
export interface Job {
  jobArn?: string;
  jobId?: string;
  targetSelection?: TargetSelection;
  status?: JobStatus;
  forceCanceled?: boolean;
  reasonCode?: string;
  comment?: string;
  targets?: string[];
  description?: string;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  completedAt?: Date;
  jobProcessDetails?: JobProcessDetails;
  timeoutConfig?: TimeoutConfig;
  namespaceId?: string;
  jobTemplateArn?: string;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  documentParameters?: { [key: string]: string | undefined };
  isConcurrent?: boolean;
  schedulingConfig?: SchedulingConfig;
  scheduledJobRollouts?: ScheduledJobRollout[];
  destinationPackageVersions?: string[];
}
export interface DescribeJobResponse {
  documentSource?: string;
  job?: Job;
}
export interface DescribeJobExecutionRequest {
  jobId: string;
  thingName: string;
  executionNumber?: number;
}
export type JobExecutionStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REMOVED"
  | "CANCELED"
  | (string & {});
export interface JobExecutionStatusDetails {
  detailsMap?: { [key: string]: string | undefined };
}
export type VersionNumber = number;
export type ApproximateSecondsBeforeTimedOut = number;
export interface JobExecution {
  jobId?: string;
  status?: JobExecutionStatus;
  forceCanceled?: boolean;
  statusDetails?: JobExecutionStatusDetails;
  thingArn?: string;
  queuedAt?: Date;
  startedAt?: Date;
  lastUpdatedAt?: Date;
  executionNumber?: number;
  versionNumber?: number;
  approximateSecondsBeforeTimedOut?: number;
}
export interface DescribeJobExecutionResponse {
  execution?: JobExecution;
}
export interface DescribeJobTemplateRequest {
  jobTemplateId: string;
}
export interface DescribeJobTemplateResponse {
  jobTemplateArn?: string;
  jobTemplateId?: string;
  description?: string;
  documentSource?: string;
  document?: string;
  createdAt?: Date;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  maintenanceWindows?: MaintenanceWindow[];
  destinationPackageVersions?: string[];
}
export type ManagedJobTemplateName = string;
export type ManagedTemplateVersion = string;
export interface DescribeManagedJobTemplateRequest {
  templateName: string;
  templateVersion?: string;
}
export type Environment = string;
export type Environments = string[];
export type Regex = string;
export type Example = string;
export type Optional = boolean;
export interface DocumentParameter {
  key?: string;
  description?: string;
  regex?: string;
  example?: string;
  optional?: boolean;
}
export type DocumentParameters = DocumentParameter[];
export interface DescribeManagedJobTemplateResponse {
  templateName?: string;
  templateArn?: string;
  description?: string;
  templateVersion?: string;
  environments?: string[];
  documentParameters?: DocumentParameter[];
  document?: string;
}
export interface DescribeMitigationActionRequest {
  actionName: string;
}
export type MitigationActionType =
  | "UPDATE_DEVICE_CERTIFICATE"
  | "UPDATE_CA_CERTIFICATE"
  | "ADD_THINGS_TO_THING_GROUP"
  | "REPLACE_DEFAULT_POLICY_VERSION"
  | "ENABLE_IOT_LOGGING"
  | "PUBLISH_FINDING_TO_SNS"
  | (string & {});
export interface DescribeMitigationActionResponse {
  actionName?: string;
  actionType?: MitigationActionType;
  actionArn?: string;
  actionId?: string;
  roleArn?: string;
  actionParams?: MitigationActionParams;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface DescribeProvisioningTemplateRequest {
  templateName: string;
}
export interface DescribeProvisioningTemplateResponse {
  templateArn?: string;
  templateName?: string;
  description?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  defaultVersionId?: number;
  templateBody?: string;
  enabled?: boolean;
  provisioningRoleArn?: string;
  preProvisioningHook?: ProvisioningHook;
  type?: TemplateType;
}
export interface DescribeProvisioningTemplateVersionRequest {
  templateName: string;
  versionId: number;
}
export interface DescribeProvisioningTemplateVersionResponse {
  versionId?: number;
  creationDate?: Date;
  templateBody?: string;
  isDefaultVersion?: boolean;
}
export interface DescribeRoleAliasRequest {
  roleAlias: string;
}
export interface RoleAliasDescription {
  roleAlias?: string;
  roleAliasArn?: string;
  roleArn?: string;
  owner?: string;
  credentialDurationSeconds?: number;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface DescribeRoleAliasResponse {
  roleAliasDescription?: RoleAliasDescription;
}
export interface DescribeScheduledAuditRequest {
  scheduledAuditName: string;
}
export interface DescribeScheduledAuditResponse {
  frequency?: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
  targetCheckNames?: string[];
  scheduledAuditName?: string;
  scheduledAuditArn?: string;
}
export interface DescribeSecurityProfileRequest {
  securityProfileName: string;
}
export interface DescribeSecurityProfileResponse {
  securityProfileName?: string;
  securityProfileArn?: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  version?: number;
  creationDate?: Date;
  lastModifiedDate?: Date;
  metricsExportConfig?: MetricsExportConfig;
}
export interface DescribeStreamRequest {
  streamId: string;
}
export interface StreamInfo {
  streamId?: string;
  streamArn?: string;
  streamVersion?: number;
  description?: string;
  files?: StreamFile[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  roleArn?: string;
}
export interface DescribeStreamResponse {
  streamInfo?: StreamInfo;
}
export interface DescribeThingRequest {
  thingName: string;
}
export interface DescribeThingResponse {
  defaultClientId?: string;
  thingName?: string;
  thingId?: string;
  thingArn?: string;
  thingTypeName?: string;
  attributes?: { [key: string]: string | undefined };
  version?: number;
  billingGroupName?: string;
}
export interface DescribeThingGroupRequest {
  thingGroupName: string;
}
export interface GroupNameAndArn {
  groupName?: string;
  groupArn?: string;
}
export type ThingGroupNameAndArnList = GroupNameAndArn[];
export interface ThingGroupMetadata {
  parentGroupName?: string;
  rootToParentThingGroups?: GroupNameAndArn[];
  creationDate?: Date;
}
export type DynamicGroupStatus =
  | "ACTIVE"
  | "BUILDING"
  | "REBUILDING"
  | (string & {});
export interface DescribeThingGroupResponse {
  thingGroupName?: string;
  thingGroupId?: string;
  thingGroupArn?: string;
  version?: number;
  thingGroupProperties?: ThingGroupProperties;
  thingGroupMetadata?: ThingGroupMetadata;
  indexName?: string;
  queryString?: string;
  queryVersion?: string;
  status?: DynamicGroupStatus;
}
export type TaskId = string;
export interface DescribeThingRegistrationTaskRequest {
  taskId: string;
}
export type RegistryS3BucketName = string;
export type RegistryS3KeyName = string;
export type Status =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Cancelled"
  | "Cancelling"
  | (string & {});
export type Count = number;
export type Percentage = number;
export interface DescribeThingRegistrationTaskResponse {
  taskId?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  templateBody?: string;
  inputFileBucket?: string;
  inputFileKey?: string;
  roleArn?: string;
  status?: Status;
  message?: string;
  successCount?: number;
  failureCount?: number;
  percentageProgress?: number;
}
export interface DescribeThingTypeRequest {
  thingTypeName: string;
}
export type DeprecationDate = Date;
export interface ThingTypeMetadata {
  deprecated?: boolean;
  deprecationDate?: Date;
  creationDate?: Date;
}
export interface DescribeThingTypeResponse {
  thingTypeName?: string;
  thingTypeId?: string;
  thingTypeArn?: string;
  thingTypeProperties?: ThingTypeProperties;
  thingTypeMetadata?: ThingTypeMetadata;
}
export interface DetachPolicyRequest {
  policyName: string;
  target: string;
}
export interface DetachPolicyResponse {}
export interface DetachPrincipalPolicyRequest {
  policyName: string;
  principal: string;
}
export interface DetachPrincipalPolicyResponse {}
export interface DetachSecurityProfileRequest {
  securityProfileName: string;
  securityProfileTargetArn: string;
}
export interface DetachSecurityProfileResponse {}
export interface DetachThingPrincipalRequest {
  thingName: string;
  principal: string;
}
export interface DetachThingPrincipalResponse {}
export interface DisableTopicRuleRequest {
  ruleName: string;
}
export interface DisableTopicRuleResponse {}
export interface DisassociateSbomFromPackageVersionRequest {
  packageName: string;
  versionName: string;
  clientToken?: string;
}
export interface DisassociateSbomFromPackageVersionResponse {}
export interface EnableTopicRuleRequest {
  ruleName: string;
}
export interface EnableTopicRuleResponse {}
export type TinyMaxResults = number;
export type NextToken = string;
export interface GetBehaviorModelTrainingSummariesRequest {
  securityProfileName?: string;
  maxResults?: number;
  nextToken?: string;
}
export type ModelStatus =
  | "PENDING_BUILD"
  | "ACTIVE"
  | "EXPIRED"
  | (string & {});
export type DataCollectionPercentage = number;
export interface BehaviorModelTrainingSummary {
  securityProfileName?: string;
  behaviorName?: string;
  trainingDataCollectionStartDate?: Date;
  modelStatus?: ModelStatus;
  datapointsCollectionPercentage?: number;
  lastModelRefreshDate?: Date;
}
export type BehaviorModelTrainingSummaries = BehaviorModelTrainingSummary[];
export interface GetBehaviorModelTrainingSummariesResponse {
  summaries?: BehaviorModelTrainingSummary[];
  nextToken?: string;
}
export type MaxBuckets = number;
export interface TermsAggregation {
  maxBuckets?: number;
}
export interface BucketsAggregationType {
  termsAggregation?: TermsAggregation;
}
export interface GetBucketsAggregationRequest {
  indexName?: string;
  queryString: string;
  aggregationField: string;
  queryVersion?: string;
  bucketsAggregationType: BucketsAggregationType;
}
export type BucketKeyValue = string;
export interface Bucket {
  keyValue?: string;
  count?: number;
}
export type Buckets = Bucket[];
export interface GetBucketsAggregationResponse {
  totalCount?: number;
  buckets?: Bucket[];
}
export interface GetCardinalityRequest {
  indexName?: string;
  queryString: string;
  aggregationField?: string;
  queryVersion?: string;
}
export interface GetCardinalityResponse {
  cardinality?: number;
}
export interface GetCommandRequest {
  commandId: string;
}
export type DeprecationFlag = boolean;
export interface GetCommandResponse {
  commandId?: string;
  commandArn?: string;
  namespace?: CommandNamespace;
  displayName?: string;
  description?: string;
  mandatoryParameters?: CommandParameter[];
  payload?: CommandPayload;
  payloadTemplate?: string;
  preprocessor?: CommandPreprocessor;
  roleArn?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  deprecated?: boolean;
  pendingDeletion?: boolean;
}
export interface GetCommandExecutionRequest {
  executionId: string;
  targetArn: string;
  includeResult?: boolean;
}
export type CommandExecutionStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | (string & {});
export type StatusReasonCode = string;
export type StatusReasonDescription = string;
export interface StatusReason {
  reasonCode: string;
  reasonDescription?: string;
}
export type CommandExecutionResultName = string;
export type StringCommandExecutionResult = string;
export type BooleanCommandExecutionResult = boolean;
export type BinaryCommandExecutionResult = Uint8Array;
export interface CommandExecutionResult {
  S?: string;
  B?: boolean;
  BIN?: Uint8Array;
}
export type CommandExecutionResultMap = {
  [key: string]: CommandExecutionResult | undefined;
};
export type CommandExecutionParameterMap = {
  [key: string]: CommandParameterValue | undefined;
};
export type CommandExecutionTimeoutInSeconds = number;
export interface GetCommandExecutionResponse {
  executionId?: string;
  commandArn?: string;
  targetArn?: string;
  status?: CommandExecutionStatus;
  statusReason?: StatusReason;
  result?: { [key: string]: CommandExecutionResult | undefined };
  parameters?: { [key: string]: CommandParameterValue | undefined };
  executionTimeoutSeconds?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  timeToLive?: Date;
}
export interface GetEffectivePoliciesRequest {
  principal?: string;
  cognitoIdentityPoolId?: string;
  thingName?: string;
}
export interface EffectivePolicy {
  policyName?: string;
  policyArn?: string;
  policyDocument?: string;
}
export type EffectivePolicies = EffectivePolicy[];
export interface GetEffectivePoliciesResponse {
  effectivePolicies?: EffectivePolicy[];
}
export interface GetIndexingConfigurationRequest {}
export type ThingIndexingMode =
  | "OFF"
  | "REGISTRY"
  | "REGISTRY_AND_SHADOW"
  | (string & {});
export type ThingConnectivityIndexingMode = "OFF" | "STATUS" | (string & {});
export type DeviceDefenderIndexingMode = "OFF" | "VIOLATIONS" | (string & {});
export type NamedShadowIndexingMode = "OFF" | "ON" | (string & {});
export type FieldName = string;
export type FieldType = "Number" | "String" | "Boolean" | (string & {});
export interface Field {
  name?: string;
  type?: FieldType;
}
export type Fields = Field[];
export type ShadowName = string;
export type NamedShadowNamesFilter = string[];
export type TargetFieldName = string;
export type TargetFieldOrder = "LatLon" | "LonLat" | (string & {});
export interface GeoLocationTarget {
  name?: string;
  order?: TargetFieldOrder;
}
export type GeoLocationsFilter = GeoLocationTarget[];
export type FleetIndexingApi = "GET_THING_CONNECTIVITY_DATA" | (string & {});
export type FleetIndexingApiList = FleetIndexingApi[];
export interface ConnectivityFilter {
  includeSocketInformation?: FleetIndexingApi[];
}
export interface IndexingFilter {
  namedShadowNames?: string[];
  geoLocations?: GeoLocationTarget[];
  connectivity?: ConnectivityFilter;
}
export interface ThingIndexingConfiguration {
  thingIndexingMode: ThingIndexingMode;
  thingConnectivityIndexingMode?: ThingConnectivityIndexingMode;
  deviceDefenderIndexingMode?: DeviceDefenderIndexingMode;
  namedShadowIndexingMode?: NamedShadowIndexingMode;
  managedFields?: Field[];
  customFields?: Field[];
  filter?: IndexingFilter;
}
export type ThingGroupIndexingMode = "OFF" | "ON" | (string & {});
export interface ThingGroupIndexingConfiguration {
  thingGroupIndexingMode: ThingGroupIndexingMode;
  managedFields?: Field[];
  customFields?: Field[];
}
export interface GetIndexingConfigurationResponse {
  thingIndexingConfiguration?: ThingIndexingConfiguration;
  thingGroupIndexingConfiguration?: ThingGroupIndexingConfiguration;
}
export interface GetJobDocumentRequest {
  jobId: string;
  beforeSubstitution?: boolean;
}
export interface GetJobDocumentResponse {
  document?: string;
}
export interface GetLoggingOptionsRequest {}
export interface GetLoggingOptionsResponse {
  roleArn?: string;
  logLevel?: LogLevel;
}
export interface GetOTAUpdateRequest {
  otaUpdateId: string;
}
export type Code = string;
export type OTAUpdateErrorMessage = string;
export interface ErrorInfo {
  code?: string;
  message?: string;
}
export interface OTAUpdateInfo {
  otaUpdateId?: string;
  otaUpdateArn?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  description?: string;
  targets?: string[];
  protocols?: Protocol[];
  awsJobExecutionsRolloutConfig?: AwsJobExecutionsRolloutConfig;
  awsJobPresignedUrlConfig?: AwsJobPresignedUrlConfig;
  targetSelection?: TargetSelection;
  otaUpdateFiles?: OTAUpdateFile[];
  otaUpdateStatus?: OTAUpdateStatus;
  awsIotJobId?: string;
  awsIotJobArn?: string;
  errorInfo?: ErrorInfo;
  additionalParameters?: { [key: string]: string | undefined };
}
export interface GetOTAUpdateResponse {
  otaUpdateInfo?: OTAUpdateInfo;
}
export interface GetPackageRequest {
  packageName: string;
}
export interface GetPackageResponse {
  packageName?: string;
  packageArn?: string;
  description?: string | redacted.Redacted<string>;
  defaultVersionName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface GetPackageConfigurationRequest {}
export type EnabledBoolean = boolean;
export interface VersionUpdateByJobsConfig {
  enabled?: boolean;
  roleArn?: string;
}
export interface GetPackageConfigurationResponse {
  versionUpdateByJobsConfig?: VersionUpdateByJobsConfig;
}
export interface GetPackageVersionRequest {
  packageName: string;
  versionName: string;
}
export interface GetPackageVersionResponse {
  packageVersionArn?: string;
  packageName?: string;
  versionName?: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  artifact?: PackageVersionArtifact;
  status?: PackageVersionStatus;
  errorReason?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  sbom?: Sbom;
  sbomValidationStatus?: SbomValidationStatus;
  recipe?: string | redacted.Redacted<string>;
}
export type Percent = number;
export type PercentList = number[];
export interface GetPercentilesRequest {
  indexName?: string;
  queryString: string;
  aggregationField?: string;
  queryVersion?: string;
  percents?: number[];
}
export type PercentValue = number;
export interface PercentPair {
  percent?: number;
  value?: number;
}
export type Percentiles = PercentPair[];
export interface GetPercentilesResponse {
  percentiles?: PercentPair[];
}
export interface GetPolicyRequest {
  policyName: string;
}
export interface GetPolicyResponse {
  policyName?: string;
  policyArn?: string;
  policyDocument?: string;
  defaultVersionId?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  generationId?: string;
}
export interface GetPolicyVersionRequest {
  policyName: string;
  policyVersionId: string;
}
export interface GetPolicyVersionResponse {
  policyArn?: string;
  policyName?: string;
  policyDocument?: string;
  policyVersionId?: string;
  isDefaultVersion?: boolean;
  creationDate?: Date;
  lastModifiedDate?: Date;
  generationId?: string;
}
export interface GetRegistrationCodeRequest {}
export type RegistrationCode = string;
export interface GetRegistrationCodeResponse {
  registrationCode?: string;
}
export interface GetStatisticsRequest {
  indexName?: string;
  queryString: string;
  aggregationField?: string;
  queryVersion?: string;
}
export type Average = number;
export type Sum = number;
export type Minimum = number;
export type Maximum = number;
export type SumOfSquares = number;
export type Variance = number;
export type StdDeviation = number;
export interface Statistics {
  count?: number;
  average?: number;
  sum?: number;
  minimum?: number;
  maximum?: number;
  sumOfSquares?: number;
  variance?: number;
  stdDeviation?: number;
}
export interface GetStatisticsResponse {
  statistics?: Statistics;
}
export type ConnectivityApiThingName = string | redacted.Redacted<string>;
export interface GetThingConnectivityDataRequest {
  thingName: string | redacted.Redacted<string>;
  includeSocketInformation?: boolean;
}
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
  | "API_INITIATED_DISCONNECT"
  | "THROTTLED"
  | "WEBSOCKET_TTL_EXPIRATION"
  | "CUSTOMAUTH_TTL_EXPIRATION"
  | "UNKNOWN"
  | "NONE"
  | (string & {});
export type SourceIp = string | redacted.Redacted<string>;
export type SourcePort = number;
export type TargetIp = string | redacted.Redacted<string>;
export type TargetPort = number;
export type VpcEndpointId = string | redacted.Redacted<string>;
export type KeepAliveDuration = number;
export type SessionExpiry = number;
export interface GetThingConnectivityDataResponse {
  thingName?: string | redacted.Redacted<string>;
  connected?: boolean;
  timestamp?: Date;
  disconnectReason?: DisconnectReasonValue;
  sourceIp?: string | redacted.Redacted<string>;
  sourcePort?: number;
  targetIp?: string | redacted.Redacted<string>;
  targetPort?: number;
  vpcEndpointId?: string | redacted.Redacted<string>;
  keepAliveDuration?: number;
  cleanSession?: boolean;
  sessionExpiry?: number;
  clientId?: string;
}
export interface GetTopicRuleRequest {
  ruleName: string;
}
export type RuleArn = string;
export interface TopicRule {
  ruleName?: string;
  sql?: string;
  description?: string;
  createdAt?: Date;
  actions?: Action[];
  ruleDisabled?: boolean;
  awsIotSqlVersion?: string;
  errorAction?: Action;
}
export interface GetTopicRuleResponse {
  ruleArn?: string;
  rule?: TopicRule;
}
export interface GetTopicRuleDestinationRequest {
  arn: string;
}
export interface GetTopicRuleDestinationResponse {
  topicRuleDestination?: TopicRuleDestination;
}
export type VerboseFlag = boolean;
export interface GetV2LoggingOptionsRequest {
  verbose?: boolean;
}
export type DisableAllLogs = boolean;
export type LogEventType = string;
export type LogDestination = string;
export interface LogEventConfiguration {
  eventType: string;
  logLevel?: LogLevel;
  logDestination?: string;
}
export type LogEventConfigurations = LogEventConfiguration[];
export interface GetV2LoggingOptionsResponse {
  roleArn?: string;
  defaultLogLevel?: LogLevel;
  disableAllLogs?: boolean;
  eventConfigurations?: LogEventConfiguration[];
}
export type DeviceDefenderThingName = string;
export type BehaviorCriteriaType =
  | "STATIC"
  | "STATISTICAL"
  | "MACHINE_LEARNING"
  | (string & {});
export type ListSuppressedAlerts = boolean;
export type VerificationState =
  | "FALSE_POSITIVE"
  | "BENIGN_POSITIVE"
  | "TRUE_POSITIVE"
  | "UNKNOWN"
  | (string & {});
export type MaxResults = number;
export interface ListActiveViolationsRequest {
  thingName?: string;
  securityProfileName?: string;
  behaviorCriteriaType?: BehaviorCriteriaType;
  listSuppressedAlerts?: boolean;
  verificationState?: VerificationState;
  nextToken?: string;
  maxResults?: number;
}
export interface ViolationEventAdditionalInfo {
  confidenceLevel?: ConfidenceLevel;
}
export type VerificationStateDescription = string;
export interface ActiveViolation {
  violationId?: string;
  thingName?: string;
  securityProfileName?: string;
  behavior?: Behavior;
  lastViolationValue?: MetricValue;
  violationEventAdditionalInfo?: ViolationEventAdditionalInfo;
  verificationState?: VerificationState;
  verificationStateDescription?: string;
  lastViolationTime?: Date;
  violationStartTime?: Date;
}
export type ActiveViolations = ActiveViolation[];
export interface ListActiveViolationsResponse {
  activeViolations?: ActiveViolation[];
  nextToken?: string;
}
export type Recursive = boolean;
export type Marker = string;
export type PageSize = number;
export interface ListAttachedPoliciesRequest {
  target: string;
  recursive?: boolean;
  marker?: string;
  pageSize?: number;
}
export interface Policy {
  policyName?: string;
  policyArn?: string;
}
export type Policies = Policy[];
export interface ListAttachedPoliciesResponse {
  policies?: Policy[];
  nextMarker?: string;
}
export type ListSuppressedFindings = boolean;
export interface ListAuditFindingsRequest {
  taskId?: string;
  checkName?: string;
  resourceIdentifier?: ResourceIdentifier;
  maxResults?: number;
  nextToken?: string;
  startTime?: Date;
  endTime?: Date;
  listSuppressedFindings?: boolean;
}
export type AuditFindings = AuditFinding[];
export interface ListAuditFindingsResponse {
  findings?: AuditFinding[];
  nextToken?: string;
}
export type AuditMitigationActionsExecutionStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | "SKIPPED"
  | "PENDING"
  | (string & {});
export interface ListAuditMitigationActionsExecutionsRequest {
  taskId: string;
  actionStatus?: AuditMitigationActionsExecutionStatus;
  findingId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AuditMitigationActionExecutionMetadata {
  taskId?: string;
  findingId?: string;
  actionName?: string;
  actionId?: string;
  status?: AuditMitigationActionsExecutionStatus;
  startTime?: Date;
  endTime?: Date;
  errorCode?: string;
  message?: string;
}
export type AuditMitigationActionExecutionMetadataList =
  AuditMitigationActionExecutionMetadata[];
export interface ListAuditMitigationActionsExecutionsResponse {
  actionsExecutions?: AuditMitigationActionExecutionMetadata[];
  nextToken?: string;
}
export interface ListAuditMitigationActionsTasksRequest {
  auditTaskId?: string;
  findingId?: string;
  taskStatus?: AuditMitigationActionsTaskStatus;
  maxResults?: number;
  nextToken?: string;
  startTime: Date;
  endTime: Date;
}
export interface AuditMitigationActionsTaskMetadata {
  taskId?: string;
  startTime?: Date;
  taskStatus?: AuditMitigationActionsTaskStatus;
}
export type AuditMitigationActionsTaskMetadataList =
  AuditMitigationActionsTaskMetadata[];
export interface ListAuditMitigationActionsTasksResponse {
  tasks?: AuditMitigationActionsTaskMetadata[];
  nextToken?: string;
}
export type AscendingOrder = boolean;
export interface ListAuditSuppressionsRequest {
  checkName?: string;
  resourceIdentifier?: ResourceIdentifier;
  ascendingOrder?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export interface AuditSuppression {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
}
export type AuditSuppressionList = AuditSuppression[];
export interface ListAuditSuppressionsResponse {
  suppressions?: AuditSuppression[];
  nextToken?: string;
}
export interface ListAuditTasksRequest {
  startTime: Date;
  endTime: Date;
  taskType?: AuditTaskType;
  taskStatus?: AuditTaskStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface AuditTaskMetadata {
  taskId?: string;
  taskStatus?: AuditTaskStatus;
  taskType?: AuditTaskType;
}
export type AuditTaskMetadataList = AuditTaskMetadata[];
export interface ListAuditTasksResponse {
  tasks?: AuditTaskMetadata[];
  nextToken?: string;
}
export interface ListAuthorizersRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
  status?: AuthorizerStatus;
}
export interface AuthorizerSummary {
  authorizerName?: string;
  authorizerArn?: string;
}
export type Authorizers = AuthorizerSummary[];
export interface ListAuthorizersResponse {
  authorizers?: AuthorizerSummary[];
  nextMarker?: string;
}
export type RegistryMaxResults = number;
export interface ListBillingGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  namePrefixFilter?: string;
}
export type BillingGroupNameAndArnList = GroupNameAndArn[];
export interface ListBillingGroupsResponse {
  billingGroups?: GroupNameAndArn[];
  nextToken?: string;
}
export interface ListCACertificatesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
  templateName?: string;
}
export interface CACertificate {
  certificateArn?: string;
  certificateId?: string;
  status?: CACertificateStatus;
  creationDate?: Date;
}
export type CACertificates = CACertificate[];
export interface ListCACertificatesResponse {
  certificates?: CACertificate[];
  nextMarker?: string;
}
export interface ListCertificateProvidersRequest {
  nextToken?: string;
  ascendingOrder?: boolean;
}
export interface CertificateProviderSummary {
  certificateProviderName?: string;
  certificateProviderArn?: string;
}
export type CertificateProviders = CertificateProviderSummary[];
export interface ListCertificateProvidersResponse {
  certificateProviders?: CertificateProviderSummary[];
  nextToken?: string;
}
export interface ListCertificatesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export interface Certificate {
  certificateArn?: string;
  certificateId?: string;
  status?: CertificateStatus;
  certificateMode?: CertificateMode;
  creationDate?: Date;
}
export type Certificates = Certificate[];
export interface ListCertificatesResponse {
  certificates?: Certificate[];
  nextMarker?: string;
}
export interface ListCertificatesByCARequest {
  caCertificateId: string;
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export interface ListCertificatesByCAResponse {
  certificates?: Certificate[];
  nextMarker?: string;
}
export type CommandMaxResults = number;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface TimeFilter {
  after?: string;
  before?: string;
}
export interface ListCommandExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  namespace?: CommandNamespace;
  status?: CommandExecutionStatus;
  sortOrder?: SortOrder;
  startedTimeFilter?: TimeFilter;
  completedTimeFilter?: TimeFilter;
  targetArn?: string;
  commandArn?: string;
}
export interface CommandExecutionSummary {
  commandArn?: string;
  executionId?: string;
  targetArn?: string;
  status?: CommandExecutionStatus;
  createdAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
}
export type CommandExecutionSummaryList = CommandExecutionSummary[];
export interface ListCommandExecutionsResponse {
  commandExecutions?: CommandExecutionSummary[];
  nextToken?: string;
}
export interface ListCommandsRequest {
  maxResults?: number;
  nextToken?: string;
  namespace?: CommandNamespace;
  commandParameterName?: string;
  sortOrder?: SortOrder;
}
export interface CommandSummary {
  commandArn?: string;
  commandId?: string;
  displayName?: string;
  deprecated?: boolean;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  pendingDeletion?: boolean;
}
export type CommandSummaryList = CommandSummary[];
export interface ListCommandsResponse {
  commands?: CommandSummary[];
  nextToken?: string;
}
export interface ListCustomMetricsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type MetricNames = string[];
export interface ListCustomMetricsResponse {
  metricNames?: string[];
  nextToken?: string;
}
export interface ListDetectMitigationActionsExecutionsRequest {
  taskId?: string;
  violationId?: string;
  thingName?: string;
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export type DetectMitigationActionExecutionStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export type DetectMitigationActionExecutionErrorCode = string;
export interface DetectMitigationActionExecution {
  taskId?: string;
  violationId?: string;
  actionName?: string;
  thingName?: string;
  executionStartDate?: Date;
  executionEndDate?: Date;
  status?: DetectMitigationActionExecutionStatus;
  errorCode?: string;
  message?: string;
}
export type DetectMitigationActionExecutionList =
  DetectMitigationActionExecution[];
export interface ListDetectMitigationActionsExecutionsResponse {
  actionsExecutions?: DetectMitigationActionExecution[];
  nextToken?: string;
}
export interface ListDetectMitigationActionsTasksRequest {
  maxResults?: number;
  nextToken?: string;
  startTime: Date;
  endTime: Date;
}
export type DetectMitigationActionsTaskSummaryList =
  DetectMitigationActionsTaskSummary[];
export interface ListDetectMitigationActionsTasksResponse {
  tasks?: DetectMitigationActionsTaskSummary[];
  nextToken?: string;
}
export interface ListDimensionsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type DimensionNames = string[];
export interface ListDimensionsResponse {
  dimensionNames?: string[];
  nextToken?: string;
}
export interface ListDomainConfigurationsRequest {
  marker?: string;
  pageSize?: number;
  serviceType?: ServiceType;
}
export interface DomainConfigurationSummary {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
  serviceType?: ServiceType;
}
export type DomainConfigurations = DomainConfigurationSummary[];
export interface ListDomainConfigurationsResponse {
  domainConfigurations?: DomainConfigurationSummary[];
  nextMarker?: string;
}
export interface ListFleetMetricsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface FleetMetricNameAndArn {
  metricName?: string;
  metricArn?: string;
}
export type FleetMetricNameAndArnList = FleetMetricNameAndArn[];
export interface ListFleetMetricsResponse {
  fleetMetrics?: FleetMetricNameAndArn[];
  nextToken?: string;
}
export type QueryMaxResults = number;
export interface ListIndicesRequest {
  nextToken?: string;
  maxResults?: number;
}
export type IndexNamesList = string[];
export interface ListIndicesResponse {
  indexNames?: string[];
  nextToken?: string;
}
export type LaserMaxResults = number;
export interface ListJobExecutionsForJobRequest {
  jobId: string;
  status?: JobExecutionStatus;
  maxResults?: number;
  nextToken?: string;
}
export type RetryAttempt = number;
export interface JobExecutionSummary {
  status?: JobExecutionStatus;
  queuedAt?: Date;
  startedAt?: Date;
  lastUpdatedAt?: Date;
  executionNumber?: number;
  retryAttempt?: number;
}
export interface JobExecutionSummaryForJob {
  thingArn?: string;
  jobExecutionSummary?: JobExecutionSummary;
}
export type JobExecutionSummaryForJobList = JobExecutionSummaryForJob[];
export interface ListJobExecutionsForJobResponse {
  executionSummaries?: JobExecutionSummaryForJob[];
  nextToken?: string;
}
export interface ListJobExecutionsForThingRequest {
  thingName: string;
  status?: JobExecutionStatus;
  namespaceId?: string;
  maxResults?: number;
  nextToken?: string;
  jobId?: string;
}
export interface JobExecutionSummaryForThing {
  jobId?: string;
  jobExecutionSummary?: JobExecutionSummary;
}
export type JobExecutionSummaryForThingList = JobExecutionSummaryForThing[];
export interface ListJobExecutionsForThingResponse {
  executionSummaries?: JobExecutionSummaryForThing[];
  nextToken?: string;
}
export interface ListJobsRequest {
  status?: JobStatus;
  targetSelection?: TargetSelection;
  maxResults?: number;
  nextToken?: string;
  thingGroupName?: string;
  thingGroupId?: string;
  namespaceId?: string;
}
export interface JobSummary {
  jobArn?: string;
  jobId?: string;
  thingGroupId?: string;
  targetSelection?: TargetSelection;
  status?: JobStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  completedAt?: Date;
  isConcurrent?: boolean;
}
export type JobSummaryList = JobSummary[];
export interface ListJobsResponse {
  jobs?: JobSummary[];
  nextToken?: string;
}
export interface ListJobTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface JobTemplateSummary {
  jobTemplateArn?: string;
  jobTemplateId?: string;
  description?: string;
  createdAt?: Date;
}
export type JobTemplateSummaryList = JobTemplateSummary[];
export interface ListJobTemplatesResponse {
  jobTemplates?: JobTemplateSummary[];
  nextToken?: string;
}
export interface ListManagedJobTemplatesRequest {
  templateName?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ManagedJobTemplateSummary {
  templateArn?: string;
  templateName?: string;
  description?: string;
  environments?: string[];
  templateVersion?: string;
}
export type ManagedJobTemplatesSummaryList = ManagedJobTemplateSummary[];
export interface ListManagedJobTemplatesResponse {
  managedJobTemplates?: ManagedJobTemplateSummary[];
  nextToken?: string;
}
export interface ListMetricValuesRequest {
  thingName: string;
  metricName: string;
  dimensionName?: string;
  dimensionValueOperator?: DimensionValueOperator;
  startTime: Date;
  endTime: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface MetricDatum {
  timestamp?: Date;
  value?: MetricValue;
}
export type MetricDatumList = MetricDatum[];
export interface ListMetricValuesResponse {
  metricDatumList?: MetricDatum[];
  nextToken?: string;
}
export interface ListMitigationActionsRequest {
  actionType?: MitigationActionType;
  maxResults?: number;
  nextToken?: string;
}
export interface MitigationActionIdentifier {
  actionName?: string;
  actionArn?: string;
  creationDate?: Date;
}
export type MitigationActionIdentifierList = MitigationActionIdentifier[];
export interface ListMitigationActionsResponse {
  actionIdentifiers?: MitigationActionIdentifier[];
  nextToken?: string;
}
export interface ListOTAUpdatesRequest {
  maxResults?: number;
  nextToken?: string;
  otaUpdateStatus?: OTAUpdateStatus;
}
export interface OTAUpdateSummary {
  otaUpdateId?: string;
  otaUpdateArn?: string;
  creationDate?: Date;
}
export type OTAUpdatesSummary = OTAUpdateSummary[];
export interface ListOTAUpdatesResponse {
  otaUpdates?: OTAUpdateSummary[];
  nextToken?: string;
}
export interface ListOutgoingCertificatesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export interface OutgoingCertificate {
  certificateArn?: string;
  certificateId?: string;
  transferredTo?: string;
  transferDate?: Date;
  transferMessage?: string;
  creationDate?: Date;
}
export type OutgoingCertificates = OutgoingCertificate[];
export interface ListOutgoingCertificatesResponse {
  outgoingCertificates?: OutgoingCertificate[];
  nextMarker?: string;
}
export type PackageCatalogMaxResults = number;
export interface ListPackagesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface PackageSummary {
  packageName?: string;
  defaultVersionName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export type PackageSummaryList = PackageSummary[];
export interface ListPackagesResponse {
  packageSummaries?: PackageSummary[];
  nextToken?: string;
}
export interface ListPackageVersionsRequest {
  packageName: string;
  status?: PackageVersionStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface PackageVersionSummary {
  packageName?: string;
  versionName?: string;
  status?: PackageVersionStatus;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export type PackageVersionSummaryList = PackageVersionSummary[];
export interface ListPackageVersionsResponse {
  packageVersionSummaries?: PackageVersionSummary[];
  nextToken?: string;
}
export interface ListPoliciesRequest {
  marker?: string;
  pageSize?: number;
  ascendingOrder?: boolean;
}
export interface ListPoliciesResponse {
  policies?: Policy[];
  nextMarker?: string;
}
export interface ListPolicyPrincipalsRequest {
  policyName: string;
  marker?: string;
  pageSize?: number;
  ascendingOrder?: boolean;
}
export type PrincipalArn = string;
export type Principals = string[];
export interface ListPolicyPrincipalsResponse {
  principals?: string[];
  nextMarker?: string;
}
export interface ListPolicyVersionsRequest {
  policyName: string;
}
export interface PolicyVersion {
  versionId?: string;
  isDefaultVersion?: boolean;
  createDate?: Date;
}
export type PolicyVersions = PolicyVersion[];
export interface ListPolicyVersionsResponse {
  policyVersions?: PolicyVersion[];
}
export interface ListPrincipalPoliciesRequest {
  principal: string;
  marker?: string;
  pageSize?: number;
  ascendingOrder?: boolean;
}
export interface ListPrincipalPoliciesResponse {
  policies?: Policy[];
  nextMarker?: string;
}
export interface ListPrincipalThingsRequest {
  nextToken?: string;
  maxResults?: number;
  principal: string;
}
export type ThingNameList = string[];
export interface ListPrincipalThingsResponse {
  things?: string[];
  nextToken?: string;
}
export interface ListPrincipalThingsV2Request {
  nextToken?: string;
  maxResults?: number;
  principal: string;
  thingPrincipalType?: ThingPrincipalType;
}
export interface PrincipalThingObject {
  thingName: string;
  thingPrincipalType?: ThingPrincipalType;
}
export type PrincipalThingObjects = PrincipalThingObject[];
export interface ListPrincipalThingsV2Response {
  principalThingObjects?: PrincipalThingObject[];
  nextToken?: string;
}
export interface ListProvisioningTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ProvisioningTemplateSummary {
  templateArn?: string;
  templateName?: string;
  description?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  enabled?: boolean;
  type?: TemplateType;
}
export type ProvisioningTemplateListing = ProvisioningTemplateSummary[];
export interface ListProvisioningTemplatesResponse {
  templates?: ProvisioningTemplateSummary[];
  nextToken?: string;
}
export interface ListProvisioningTemplateVersionsRequest {
  templateName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ProvisioningTemplateVersionSummary {
  versionId?: number;
  creationDate?: Date;
  isDefaultVersion?: boolean;
}
export type ProvisioningTemplateVersionListing =
  ProvisioningTemplateVersionSummary[];
export interface ListProvisioningTemplateVersionsResponse {
  versions?: ProvisioningTemplateVersionSummary[];
  nextToken?: string;
}
export interface ListRelatedResourcesForAuditFindingRequest {
  findingId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListRelatedResourcesForAuditFindingResponse {
  relatedResources?: RelatedResource[];
  nextToken?: string;
}
export interface ListRoleAliasesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export type RoleAliases = string[];
export interface ListRoleAliasesResponse {
  roleAliases?: string[];
  nextMarker?: string;
}
export type SbomValidationResult = "FAILED" | "SUCCEEDED" | (string & {});
export interface ListSbomValidationResultsRequest {
  packageName: string;
  versionName: string;
  validationResult?: SbomValidationResult;
  maxResults?: number;
  nextToken?: string;
}
export type SbomValidationErrorCode =
  | "INCOMPATIBLE_FORMAT"
  | "FILE_SIZE_LIMIT_EXCEEDED"
  | (string & {});
export type SbomValidationErrorMessage = string;
export interface SbomValidationResultSummary {
  fileName?: string;
  validationResult?: SbomValidationResult;
  errorCode?: SbomValidationErrorCode;
  errorMessage?: string;
}
export type SbomValidationResultSummaryList = SbomValidationResultSummary[];
export interface ListSbomValidationResultsResponse {
  validationResultSummaries?: SbomValidationResultSummary[];
  nextToken?: string;
}
export interface ListScheduledAuditsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ScheduledAuditMetadata {
  scheduledAuditName?: string;
  scheduledAuditArn?: string;
  frequency?: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
}
export type ScheduledAuditMetadataList = ScheduledAuditMetadata[];
export interface ListScheduledAuditsResponse {
  scheduledAudits?: ScheduledAuditMetadata[];
  nextToken?: string;
}
export interface ListSecurityProfilesRequest {
  nextToken?: string;
  maxResults?: number;
  dimensionName?: string;
  metricName?: string;
}
export interface SecurityProfileIdentifier {
  name: string;
  arn: string;
}
export type SecurityProfileIdentifiers = SecurityProfileIdentifier[];
export interface ListSecurityProfilesResponse {
  securityProfileIdentifiers?: SecurityProfileIdentifier[];
  nextToken?: string;
}
export interface ListSecurityProfilesForTargetRequest {
  nextToken?: string;
  maxResults?: number;
  recursive?: boolean;
  securityProfileTargetArn: string;
}
export interface SecurityProfileTarget {
  arn: string;
}
export interface SecurityProfileTargetMapping {
  securityProfileIdentifier?: SecurityProfileIdentifier;
  target?: SecurityProfileTarget;
}
export type SecurityProfileTargetMappings = SecurityProfileTargetMapping[];
export interface ListSecurityProfilesForTargetResponse {
  securityProfileTargetMappings?: SecurityProfileTargetMapping[];
  nextToken?: string;
}
export interface ListStreamsRequest {
  maxResults?: number;
  nextToken?: string;
  ascendingOrder?: boolean;
}
export interface StreamSummary {
  streamId?: string;
  streamArn?: string;
  streamVersion?: number;
  description?: string;
}
export type StreamsSummary = StreamSummary[];
export interface ListStreamsResponse {
  streams?: StreamSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
  nextToken?: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
  nextToken?: string;
}
export interface ListTargetsForPolicyRequest {
  policyName: string;
  marker?: string;
  pageSize?: number;
}
export type PolicyTargets = string[];
export interface ListTargetsForPolicyResponse {
  targets?: string[];
  nextMarker?: string;
}
export interface ListTargetsForSecurityProfileRequest {
  securityProfileName: string;
  nextToken?: string;
  maxResults?: number;
}
export type SecurityProfileTargets = SecurityProfileTarget[];
export interface ListTargetsForSecurityProfileResponse {
  securityProfileTargets?: SecurityProfileTarget[];
  nextToken?: string;
}
export type RecursiveWithoutDefault = boolean;
export interface ListThingGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  parentGroup?: string;
  namePrefixFilter?: string;
  recursive?: boolean;
}
export interface ListThingGroupsResponse {
  thingGroups?: GroupNameAndArn[];
  nextToken?: string;
}
export interface ListThingGroupsForThingRequest {
  thingName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListThingGroupsForThingResponse {
  thingGroups?: GroupNameAndArn[];
  nextToken?: string;
}
export interface ListThingPrincipalsRequest {
  nextToken?: string;
  maxResults?: number;
  thingName: string;
}
export interface ListThingPrincipalsResponse {
  principals?: string[];
  nextToken?: string;
}
export interface ListThingPrincipalsV2Request {
  nextToken?: string;
  maxResults?: number;
  thingName: string;
  thingPrincipalType?: ThingPrincipalType;
}
export interface ThingPrincipalObject {
  principal: string;
  thingPrincipalType?: ThingPrincipalType;
}
export type ThingPrincipalObjects = ThingPrincipalObject[];
export interface ListThingPrincipalsV2Response {
  thingPrincipalObjects?: ThingPrincipalObject[];
  nextToken?: string;
}
export type ReportType = "ERRORS" | "RESULTS" | (string & {});
export interface ListThingRegistrationTaskReportsRequest {
  taskId: string;
  reportType: ReportType;
  nextToken?: string;
  maxResults?: number;
}
export type S3FileUrl = string;
export type S3FileUrlList = string[];
export interface ListThingRegistrationTaskReportsResponse {
  resourceLinks?: string[];
  reportType?: ReportType;
  nextToken?: string;
}
export interface ListThingRegistrationTasksRequest {
  nextToken?: string;
  maxResults?: number;
  status?: Status;
}
export type TaskIdList = string[];
export interface ListThingRegistrationTasksResponse {
  taskIds?: string[];
  nextToken?: string;
}
export type UsePrefixAttributeValue = boolean;
export interface ListThingsRequest {
  nextToken?: string;
  maxResults?: number;
  attributeName?: string;
  attributeValue?: string;
  thingTypeName?: string;
  usePrefixAttributeValue?: boolean;
}
export interface ThingAttribute {
  thingName?: string;
  thingTypeName?: string;
  thingArn?: string;
  attributes?: { [key: string]: string | undefined };
  version?: number;
}
export type ThingAttributeList = ThingAttribute[];
export interface ListThingsResponse {
  things?: ThingAttribute[];
  nextToken?: string;
}
export interface ListThingsInBillingGroupRequest {
  billingGroupName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListThingsInBillingGroupResponse {
  things?: string[];
  nextToken?: string;
}
export interface ListThingsInThingGroupRequest {
  thingGroupName: string;
  recursive?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export interface ListThingsInThingGroupResponse {
  things?: string[];
  nextToken?: string;
}
export interface ListThingTypesRequest {
  nextToken?: string;
  maxResults?: number;
  thingTypeName?: string;
}
export interface ThingTypeDefinition {
  thingTypeName?: string;
  thingTypeArn?: string;
  thingTypeProperties?: ThingTypeProperties;
  thingTypeMetadata?: ThingTypeMetadata;
}
export type ThingTypeList = ThingTypeDefinition[];
export interface ListThingTypesResponse {
  thingTypes?: ThingTypeDefinition[];
  nextToken?: string;
}
export type TopicRuleDestinationMaxResults = number;
export interface ListTopicRuleDestinationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface HttpUrlDestinationSummary {
  confirmationUrl?: string;
}
export interface VpcDestinationSummary {
  subnetIds?: string[];
  securityGroups?: string[];
  vpcId?: string;
  roleArn?: string;
}
export interface InfluxDBDestinationSummary {
  endpoint?: string;
  influxDBVersion?: InfluxDBVersion;
  secretId?: string;
  secretType?: InfluxDBSecretType;
  secretKey?: string;
}
export interface TopicRuleDestinationSummary {
  arn?: string;
  status?: TopicRuleDestinationStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  statusReason?: string;
  httpUrlSummary?: HttpUrlDestinationSummary;
  vpcDestinationSummary?: VpcDestinationSummary;
  influxDBSummary?: InfluxDBDestinationSummary;
}
export type TopicRuleDestinationSummaries = TopicRuleDestinationSummary[];
export interface ListTopicRuleDestinationsResponse {
  destinationSummaries?: TopicRuleDestinationSummary[];
  nextToken?: string;
}
export type Topic = string;
export type TopicRuleMaxResults = number;
export interface ListTopicRulesRequest {
  topic?: string;
  maxResults?: number;
  nextToken?: string;
  ruleDisabled?: boolean;
}
export interface TopicRuleListItem {
  ruleArn?: string;
  ruleName?: string;
  topicPattern?: string;
  createdAt?: Date;
  ruleDisabled?: boolean;
}
export type TopicRuleList = TopicRuleListItem[];
export interface ListTopicRulesResponse {
  rules?: TopicRuleListItem[];
  nextToken?: string;
}
export type SkyfallMaxResults = number;
export interface ListV2LoggingLevelsRequest {
  targetType?: LogTargetType;
  nextToken?: string;
  maxResults?: number;
}
export interface LogTarget {
  targetType: LogTargetType;
  targetName?: string;
}
export interface LogTargetConfiguration {
  logTarget?: LogTarget;
  logLevel?: LogLevel;
}
export type LogTargetConfigurations = LogTargetConfiguration[];
export interface ListV2LoggingLevelsResponse {
  logTargetConfigurations?: LogTargetConfiguration[];
  nextToken?: string;
}
export interface ListViolationEventsRequest {
  startTime: Date;
  endTime: Date;
  thingName?: string;
  securityProfileName?: string;
  behaviorCriteriaType?: BehaviorCriteriaType;
  listSuppressedAlerts?: boolean;
  verificationState?: VerificationState;
  nextToken?: string;
  maxResults?: number;
}
export type ViolationEventType =
  | "in-alarm"
  | "alarm-cleared"
  | "alarm-invalidated"
  | (string & {});
export interface ViolationEvent {
  violationId?: string;
  thingName?: string;
  securityProfileName?: string;
  behavior?: Behavior;
  metricValue?: MetricValue;
  violationEventAdditionalInfo?: ViolationEventAdditionalInfo;
  violationEventType?: ViolationEventType;
  verificationState?: VerificationState;
  verificationStateDescription?: string;
  violationEventTime?: Date;
}
export type ViolationEvents = ViolationEvent[];
export interface ListViolationEventsResponse {
  violationEvents?: ViolationEvent[];
  nextToken?: string;
}
export interface PutVerificationStateOnViolationRequest {
  violationId: string;
  verificationState: VerificationState;
  verificationStateDescription?: string;
}
export interface PutVerificationStateOnViolationResponse {}
export type AllowAutoRegistration = boolean;
export interface RegisterCACertificateRequest {
  caCertificate: string;
  verificationCertificate?: string;
  setAsActive?: boolean;
  allowAutoRegistration?: boolean;
  registrationConfig?: RegistrationConfig;
  tags?: Tag[];
  certificateMode?: CertificateMode;
}
export interface RegisterCACertificateResponse {
  certificateArn?: string;
  certificateId?: string;
}
export type SetAsActiveFlag = boolean;
export interface RegisterCertificateRequest {
  certificatePem: string;
  caCertificatePem?: string;
  setAsActive?: boolean;
  status?: CertificateStatus;
}
export interface RegisterCertificateResponse {
  certificateArn?: string;
  certificateId?: string;
}
export interface RegisterCertificateWithoutCARequest {
  certificatePem: string;
  status?: CertificateStatus;
}
export interface RegisterCertificateWithoutCAResponse {
  certificateArn?: string;
  certificateId?: string;
}
export type Parameter = string;
export type Parameters = { [key: string]: string | undefined };
export interface RegisterThingRequest {
  templateBody: string;
  parameters?: { [key: string]: string | undefined };
}
export type ResourceLogicalId = string;
export type ResourceArns = { [key: string]: string | undefined };
export interface RegisterThingResponse {
  certificatePem?: string;
  resourceArns?: { [key: string]: string | undefined };
}
export interface RejectCertificateTransferRequest {
  certificateId: string;
  rejectReason?: string;
}
export interface RejectCertificateTransferResponse {}
export interface RemoveThingFromBillingGroupRequest {
  billingGroupName?: string;
  billingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
}
export interface RemoveThingFromBillingGroupResponse {}
export interface RemoveThingFromThingGroupRequest {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
}
export interface RemoveThingFromThingGroupResponse {}
export interface ReplaceTopicRuleRequest {
  ruleName: string;
  topicRulePayload: TopicRulePayload;
}
export interface ReplaceTopicRuleResponse {}
export type SearchQueryMaxResults = number;
export interface SearchIndexRequest {
  indexName?: string;
  queryString: string;
  nextToken?: string;
  maxResults?: number;
  queryVersion?: string;
}
export type ThingGroupNameList = string[];
export type JsonDocument = string;
export type ConnectivityTimestamp = number;
export type DisconnectReason = string;
export interface ThingConnectivity {
  connected?: boolean;
  timestamp?: number;
  disconnectReason?: string;
  keepAliveDuration?: number;
  cleanSession?: boolean;
  sessionExpiry?: number;
  clientId?: string;
}
export interface ThingDocument {
  thingName?: string;
  thingId?: string;
  thingTypeName?: string;
  thingGroupNames?: string[];
  attributes?: { [key: string]: string | undefined };
  shadow?: string;
  deviceDefender?: string;
  connectivity?: ThingConnectivity;
}
export type ThingDocumentList = ThingDocument[];
export interface ThingGroupDocument {
  thingGroupName?: string;
  thingGroupId?: string;
  thingGroupDescription?: string;
  attributes?: { [key: string]: string | undefined };
  parentGroupNames?: string[];
}
export type ThingGroupDocumentList = ThingGroupDocument[];
export interface SearchIndexResponse {
  nextToken?: string;
  things?: ThingDocument[];
  thingGroups?: ThingGroupDocument[];
}
export interface SetDefaultAuthorizerRequest {
  authorizerName: string;
}
export interface SetDefaultAuthorizerResponse {
  authorizerName?: string;
  authorizerArn?: string;
}
export interface SetDefaultPolicyVersionRequest {
  policyName: string;
  policyVersionId: string;
}
export interface SetDefaultPolicyVersionResponse {}
export interface LoggingOptionsPayload {
  roleArn: string;
  logLevel?: LogLevel;
}
export interface SetLoggingOptionsRequest {
  loggingOptionsPayload: LoggingOptionsPayload;
}
export interface SetLoggingOptionsResponse {}
export interface SetV2LoggingLevelRequest {
  logTarget: LogTarget;
  logLevel: LogLevel;
}
export interface SetV2LoggingLevelResponse {}
export interface SetV2LoggingOptionsRequest {
  roleArn?: string;
  defaultLogLevel?: LogLevel;
  disableAllLogs?: boolean;
  eventConfigurations?: LogEventConfiguration[];
}
export interface SetV2LoggingOptionsResponse {}
export interface StartAuditMitigationActionsTaskRequest {
  taskId: string;
  target: AuditMitigationActionsTaskTarget;
  auditCheckToActionsMapping: { [key: string]: string[] | undefined };
  clientRequestToken: string;
}
export interface StartAuditMitigationActionsTaskResponse {
  taskId?: string;
}
export type DetectMitigationActionsToExecuteList = string[];
export interface StartDetectMitigationActionsTaskRequest {
  taskId: string;
  target: DetectMitigationActionsTaskTarget;
  actions: string[];
  violationEventOccurrenceRange?: ViolationEventOccurrenceRange;
  includeOnlyActiveViolations?: boolean;
  includeSuppressedAlerts?: boolean;
  clientRequestToken: string;
}
export interface StartDetectMitigationActionsTaskResponse {
  taskId?: string;
}
export interface StartOnDemandAuditTaskRequest {
  targetCheckNames: string[];
}
export interface StartOnDemandAuditTaskResponse {
  taskId?: string;
}
export interface StartThingRegistrationTaskRequest {
  templateBody: string;
  inputFileBucket: string;
  inputFileKey: string;
  roleArn: string;
}
export interface StartThingRegistrationTaskResponse {
  taskId?: string;
}
export interface StopThingRegistrationTaskRequest {
  taskId: string;
}
export interface StopThingRegistrationTaskResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type ActionType =
  | "PUBLISH"
  | "SUBSCRIBE"
  | "RECEIVE"
  | "CONNECT"
  | (string & {});
export type Resource = string;
export type Resources = string[];
export interface AuthInfo {
  actionType?: ActionType;
  resources: string[];
}
export type AuthInfos = AuthInfo[];
export type PolicyNames = string[];
export interface TestAuthorizationRequest {
  principal?: string;
  cognitoIdentityPoolId?: string;
  authInfos: AuthInfo[];
  clientId?: string;
  policyNamesToAdd?: string[];
  policyNamesToSkip?: string[];
}
export interface Allowed {
  policies?: Policy[];
}
export interface ImplicitDeny {
  policies?: Policy[];
}
export interface ExplicitDeny {
  policies?: Policy[];
}
export interface Denied {
  implicitDeny?: ImplicitDeny;
  explicitDeny?: ExplicitDeny;
}
export type AuthDecision =
  | "ALLOWED"
  | "EXPLICIT_DENY"
  | "IMPLICIT_DENY"
  | (string & {});
export type MissingContextValue = string;
export type MissingContextValues = string[];
export interface AuthResult {
  authInfo?: AuthInfo;
  allowed?: Allowed;
  denied?: Denied;
  authDecision?: AuthDecision;
  missingContextValues?: string[];
}
export type AuthResults = AuthResult[];
export interface TestAuthorizationResponse {
  authResults?: AuthResult[];
}
export type Token = string;
export type TokenSignature = string;
export type HttpHeaderName = string;
export type HttpHeaderValue = string;
export type HttpHeaders = { [key: string]: string | undefined };
export type HttpQueryString = string;
export interface HttpContext {
  headers?: { [key: string]: string | undefined };
  queryString?: string;
}
export type MqttUsername = string;
export type MqttPassword = Uint8Array;
export type MqttClientId = string;
export interface MqttContext {
  username?: string;
  password?: Uint8Array;
  clientId?: string;
}
export type ServerName = string;
export interface TlsContext {
  serverName?: string;
}
export interface TestInvokeAuthorizerRequest {
  authorizerName: string;
  token?: string;
  tokenSignature?: string;
  httpContext?: HttpContext;
  mqttContext?: MqttContext;
  tlsContext?: TlsContext;
}
export type IsAuthenticated = boolean;
export type PrincipalId = string;
export type PolicyDocuments = string[];
export type Seconds = number;
export interface TestInvokeAuthorizerResponse {
  isAuthenticated?: boolean;
  principalId?: string;
  policyDocuments?: string[];
  refreshAfterInSeconds?: number;
  disconnectAfterInSeconds?: number;
}
export interface TransferCertificateRequest {
  certificateId: string;
  targetAwsAccount: string;
  transferMessage?: string;
}
export interface TransferCertificateResponse {
  transferredCertificateArn?: string;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccountAuditConfigurationRequest {
  roleArn?: string;
  auditNotificationTargetConfigurations?: {
    [key: string]: AuditNotificationTarget | undefined;
  };
  auditCheckConfigurations?: {
    [key: string]: AuditCheckConfiguration | undefined;
  };
}
export interface UpdateAccountAuditConfigurationResponse {}
export interface UpdateAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
}
export interface UpdateAuditSuppressionResponse {}
export interface UpdateAuthorizerRequest {
  authorizerName: string;
  authorizerFunctionArn?: string;
  tokenKeyName?: string;
  tokenSigningPublicKeys?: { [key: string]: string | undefined };
  status?: AuthorizerStatus;
  enableCachingForHttp?: boolean;
}
export interface UpdateAuthorizerResponse {
  authorizerName?: string;
  authorizerArn?: string;
}
export interface UpdateBillingGroupRequest {
  billingGroupName: string;
  billingGroupProperties: BillingGroupProperties;
  expectedVersion?: number;
}
export interface UpdateBillingGroupResponse {
  version?: number;
}
export type RemoveAutoRegistration = boolean;
export interface UpdateCACertificateRequest {
  certificateId: string;
  newStatus?: CACertificateStatus;
  newAutoRegistrationStatus?: AutoRegistrationStatus;
  registrationConfig?: RegistrationConfig;
  removeAutoRegistration?: boolean;
}
export interface UpdateCACertificateResponse {}
export interface UpdateCertificateRequest {
  certificateId: string;
  newStatus: CertificateStatus;
}
export interface UpdateCertificateResponse {}
export interface UpdateCertificateProviderRequest {
  certificateProviderName: string;
  lambdaFunctionArn?: string;
  accountDefaultForOperations?: CertificateProviderOperation[];
}
export interface UpdateCertificateProviderResponse {
  certificateProviderName?: string;
  certificateProviderArn?: string;
}
export interface UpdateCommandRequest {
  commandId: string;
  displayName?: string;
  description?: string;
  deprecated?: boolean;
}
export interface UpdateCommandResponse {
  commandId?: string;
  displayName?: string;
  description?: string;
  deprecated?: boolean;
  lastUpdatedAt?: Date;
}
export interface UpdateCustomMetricRequest {
  metricName: string;
  displayName: string;
}
export interface UpdateCustomMetricResponse {
  metricName?: string;
  metricArn?: string;
  metricType?: CustomMetricType;
  displayName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface UpdateDimensionRequest {
  name: string;
  stringValues: string[];
}
export interface UpdateDimensionResponse {
  name?: string;
  arn?: string;
  type?: DimensionType;
  stringValues?: string[];
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export type RemoveAuthorizerConfig = boolean;
export interface UpdateDomainConfigurationRequest {
  domainConfigurationName: string;
  authorizerConfig?: AuthorizerConfig;
  domainConfigurationStatus?: DomainConfigurationStatus;
  removeAuthorizerConfig?: boolean;
  tlsConfig?: TlsConfig;
  serverCertificateConfig?: ServerCertificateConfig;
  authenticationType?: AuthenticationType;
  applicationProtocol?: ApplicationProtocol;
  clientCertificateConfig?: ClientCertificateConfig;
}
export interface UpdateDomainConfigurationResponse {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
}
export interface UpdateDynamicThingGroupRequest {
  thingGroupName: string;
  thingGroupProperties: ThingGroupProperties;
  expectedVersion?: number;
  indexName?: string;
  queryString?: string;
  queryVersion?: string;
}
export interface UpdateDynamicThingGroupResponse {
  version?: number;
}
export interface UpdateEncryptionConfigurationRequest {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  kmsAccessRoleArn?: string;
}
export interface UpdateEncryptionConfigurationResponse {}
export interface UpdateEventConfigurationsRequest {
  eventConfigurations?: { [key: string]: Configuration | undefined };
}
export interface UpdateEventConfigurationsResponse {}
export interface UpdateFleetMetricRequest {
  metricName: string;
  queryString?: string;
  aggregationType?: AggregationType;
  period?: number;
  aggregationField?: string;
  description?: string;
  queryVersion?: string;
  indexName: string;
  unit?: FleetMetricUnit;
  expectedVersion?: number;
}
export interface UpdateFleetMetricResponse {}
export interface UpdateIndexingConfigurationRequest {
  thingIndexingConfiguration?: ThingIndexingConfiguration;
  thingGroupIndexingConfiguration?: ThingGroupIndexingConfiguration;
}
export interface UpdateIndexingConfigurationResponse {}
export interface UpdateJobRequest {
  jobId: string;
  description?: string;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  namespaceId?: string;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
}
export interface UpdateJobResponse {}
export interface UpdateMitigationActionRequest {
  actionName: string;
  roleArn?: string;
  actionParams?: MitigationActionParams;
}
export interface UpdateMitigationActionResponse {
  actionArn?: string;
  actionId?: string;
}
export type UnsetDefaultVersion = boolean;
export interface UpdatePackageRequest {
  packageName: string;
  description?: string | redacted.Redacted<string>;
  defaultVersionName?: string;
  unsetDefaultVersion?: boolean;
  clientToken?: string;
}
export interface UpdatePackageResponse {}
export interface UpdatePackageConfigurationRequest {
  versionUpdateByJobsConfig?: VersionUpdateByJobsConfig;
  clientToken?: string;
}
export interface UpdatePackageConfigurationResponse {}
export type PackageVersionAction = "PUBLISH" | "DEPRECATE" | (string & {});
export interface UpdatePackageVersionRequest {
  packageName: string;
  versionName: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  artifact?: PackageVersionArtifact;
  action?: PackageVersionAction;
  recipe?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface UpdatePackageVersionResponse {}
export type RemoveHook = boolean;
export interface UpdateProvisioningTemplateRequest {
  templateName: string;
  description?: string;
  enabled?: boolean;
  defaultVersionId?: number;
  provisioningRoleArn?: string;
  preProvisioningHook?: ProvisioningHook;
  removePreProvisioningHook?: boolean;
}
export interface UpdateProvisioningTemplateResponse {}
export interface UpdateRoleAliasRequest {
  roleAlias: string;
  roleArn?: string;
  credentialDurationSeconds?: number;
}
export interface UpdateRoleAliasResponse {
  roleAlias?: string;
  roleAliasArn?: string;
}
export interface UpdateScheduledAuditRequest {
  frequency?: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
  targetCheckNames?: string[];
  scheduledAuditName: string;
}
export interface UpdateScheduledAuditResponse {
  scheduledAuditArn?: string;
}
export type DeleteBehaviors = boolean;
export type DeleteAlertTargets = boolean;
export type DeleteAdditionalMetricsToRetain = boolean;
export type DeleteMetricsExportConfig = boolean;
export interface UpdateSecurityProfileRequest {
  securityProfileName: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  deleteBehaviors?: boolean;
  deleteAlertTargets?: boolean;
  deleteAdditionalMetricsToRetain?: boolean;
  expectedVersion?: number;
  metricsExportConfig?: MetricsExportConfig;
  deleteMetricsExportConfig?: boolean;
}
export interface UpdateSecurityProfileResponse {
  securityProfileName?: string;
  securityProfileArn?: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  version?: number;
  creationDate?: Date;
  lastModifiedDate?: Date;
  metricsExportConfig?: MetricsExportConfig;
}
export interface UpdateStreamRequest {
  streamId: string;
  description?: string;
  files?: StreamFile[];
  roleArn?: string;
}
export interface UpdateStreamResponse {
  streamId?: string;
  streamArn?: string;
  description?: string;
  streamVersion?: number;
}
export type RemoveThingType = boolean;
export interface UpdateThingRequest {
  thingName: string;
  thingTypeName?: string;
  attributePayload?: AttributePayload;
  expectedVersion?: number;
  removeThingType?: boolean;
}
export interface UpdateThingResponse {}
export interface UpdateThingGroupRequest {
  thingGroupName: string;
  thingGroupProperties: ThingGroupProperties;
  expectedVersion?: number;
}
export interface UpdateThingGroupResponse {
  version?: number;
}
export type ThingGroupList = string[];
export interface UpdateThingGroupsForThingRequest {
  thingName?: string;
  thingGroupsToAdd?: string[];
  thingGroupsToRemove?: string[];
  overrideDynamicGroups?: boolean;
}
export interface UpdateThingGroupsForThingResponse {}
export interface UpdateThingTypeRequest {
  thingTypeName: string;
  thingTypeProperties?: ThingTypeProperties;
}
export interface UpdateThingTypeResponse {}
export interface UpdateTopicRuleDestinationRequest {
  arn: string;
  status: TopicRuleDestinationStatus;
}
export interface UpdateTopicRuleDestinationResponse {}
export interface ValidateSecurityProfileBehaviorsRequest {
  behaviors: Behavior[];
}
export type Valid = boolean;
export interface ValidationError {
  errorMessage?: string;
}
export type ValidationErrors = ValidationError[];
export interface ValidateSecurityProfileBehaviorsResponse {
  valid?: boolean;
  validationErrors?: ValidationError[];
}
export type ErrorMessage2 = string;
export type ResourceId = string;
export type AcceptCertificateTransferError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferAlreadyCompletedException
  | UnauthorizedException
  | CommonErrors;
/**
 * Accepts a pending certificate transfer. The default state of the certificate is
 * INACTIVE.
 *
 * To check for pending certificate transfers, call ListCertificates
 * to enumerate your certificates.
 *
 * Requires permission to access the AcceptCertificateTransfer action.
 */
export const acceptCertificateTransfer: API.OperationMethod<
  AcceptCertificateTransferRequest,
  AcceptCertificateTransferResponse,
  AcceptCertificateTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /accept-certificate-transfer/{certificateId}",
    input: { certificateId: 0, setAsActive: D.m({ query: "setAsActive" }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferAlreadyCompletedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptCertificateTransfer",
})) as any;

export type AddThingToBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a thing to a billing group.
 *
 * Requires permission to access the AddThingToBillingGroup action.
 */
export const addThingToBillingGroup: API.OperationMethod<
  AddThingToBillingGroupRequest,
  AddThingToBillingGroupResponse,
  AddThingToBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /billing-groups/addThingToBillingGroup",
    input: {
      billingGroupName: 0,
      billingGroupArn: 0,
      thingName: 0,
      thingArn: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddThingToBillingGroup",
})) as any;

export type AddThingToThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a thing to a thing group.
 *
 * Requires permission to access the AddThingToThingGroup action.
 */
export const addThingToThingGroup: API.OperationMethod<
  AddThingToThingGroupRequest,
  AddThingToThingGroupResponse,
  AddThingToThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /thing-groups/addThingToThingGroup",
    input: {
      thingGroupName: 0,
      thingGroupArn: 0,
      thingName: 0,
      thingArn: 0,
      overrideDynamicGroups: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddThingToThingGroup",
})) as any;

export type AssociateSbomWithPackageVersionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the selected software bill of materials (SBOM) with a specific software package version.
 *
 * Requires permission to access the AssociateSbomWithPackageVersion action.
 */
export const associateSbomWithPackageVersion: API.OperationMethod<
  AssociateSbomWithPackageVersionRequest,
  AssociateSbomWithPackageVersionResponse,
  AssociateSbomWithPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /packages/{packageName}/versions/{versionName}/sbom",
    input: {
      packageName: 0,
      versionName: 0,
      sbom: { s3Location: i_S3Location },
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSbomWithPackageVersion",
})) as any;

export type AssociateTargetsWithJobError =
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a group with a continuous job. The following criteria must be met:
 *
 * - The job must have been created with the `targetSelection` field
 * set to "CONTINUOUS".
 *
 * - The job status must currently be "IN_PROGRESS".
 *
 * - The total number of targets associated with a job must not exceed
 * 100.
 *
 * Requires permission to access the AssociateTargetsWithJob action.
 */
export const associateTargetsWithJob: API.OperationMethod<
  AssociateTargetsWithJobRequest,
  AssociateTargetsWithJobResponse,
  AssociateTargetsWithJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs/{jobId}/targets",
    input: {
      targets: 0,
      jobId: 0,
      comment: 0,
      namespaceId: D.m({ query: "namespaceId" }),
    },
    body: true,
  },
  errors: [
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTargetsWithJob",
})) as any;

export type AttachPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches the specified policy to the specified principal (certificate or other
 * credential).
 *
 * Requires permission to access the AttachPolicy action.
 */
export const attachPolicy: API.OperationMethod<
  AttachPolicyRequest,
  AttachPolicyResponse,
  AttachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /target-policies/{policyName}",
    input: { policyName: 0, target: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPolicy",
})) as any;

export type AttachPrincipalPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches the specified policy to the specified principal (certificate or other
 * credential).
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use AttachPolicy instead.
 *
 * Requires permission to access the AttachPrincipalPolicy action.
 */
export const attachPrincipalPolicy: API.OperationMethod<
  AttachPrincipalPolicyRequest,
  AttachPrincipalPolicyResponse,
  AttachPrincipalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /principal-policies/{policyName}",
    input: {
      policyName: 0,
      principal: D.m({ header: "x-amzn-iot-principal" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPrincipalPolicy",
})) as any;

export type AttachSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Associates a Device Defender security profile with a thing group or this account. Each
 * thing group or account can have up to five security profiles associated with it.
 *
 * Requires permission to access the AttachSecurityProfile action.
 */
export const attachSecurityProfile: API.OperationMethod<
  AttachSecurityProfileRequest,
  AttachSecurityProfileResponse,
  AttachSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /security-profiles/{securityProfileName}/targets",
    input: {
      securityProfileName: 0,
      securityProfileTargetArn: D.m({ query: "securityProfileTargetArn" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachSecurityProfile",
})) as any;

export type AttachThingPrincipalError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches the specified principal to the specified thing. A principal can be X.509
 * certificates, Amazon Cognito identities or federated identities.
 *
 * Requires permission to access the AttachThingPrincipal action.
 */
export const attachThingPrincipal: API.OperationMethod<
  AttachThingPrincipalRequest,
  AttachThingPrincipalResponse,
  AttachThingPrincipalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /things/{thingName}/principals",
    input: {
      thingName: 0,
      principal: D.m({ header: "x-amzn-principal" }),
      thingPrincipalType: D.m({ query: "thingPrincipalType" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachThingPrincipal",
})) as any;

export type CancelAuditMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a mitigation action task that is in progress. If the task
 * is not
 * in progress, an InvalidRequestException occurs.
 *
 * Requires permission to access the CancelAuditMitigationActionsTask action.
 */
export const cancelAuditMitigationActionsTask: API.OperationMethod<
  CancelAuditMitigationActionsTaskRequest,
  CancelAuditMitigationActionsTaskResponse,
  CancelAuditMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /audit/mitigationactions/tasks/{taskId}/cancel",
    input: { taskId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAuditMitigationActionsTask",
})) as any;

export type CancelAuditTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels an audit that is in progress. The audit can be either scheduled or on demand. If the audit isn't in progress, an "InvalidRequestException" occurs.
 *
 * Requires permission to access the CancelAuditTask action.
 */
export const cancelAuditTask: API.OperationMethod<
  CancelAuditTaskRequest,
  CancelAuditTaskResponse,
  CancelAuditTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /audit/tasks/{taskId}/cancel",
    input: { taskId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAuditTask",
})) as any;

export type CancelCertificateTransferError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferAlreadyCompletedException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels a pending transfer for the specified certificate.
 *
 * **Note** Only the transfer source account can use this
 * operation to cancel a transfer. (Transfer destinations can use RejectCertificateTransfer instead.) After transfer, IoT returns the
 * certificate to the source account in the INACTIVE state. After the destination account has
 * accepted the transfer, the transfer cannot be cancelled.
 *
 * After a certificate transfer is cancelled, the status of the certificate changes from
 * PENDING_TRANSFER to INACTIVE.
 *
 * Requires permission to access the CancelCertificateTransfer action.
 */
export const cancelCertificateTransfer: API.OperationMethod<
  CancelCertificateTransferRequest,
  CancelCertificateTransferResponse,
  CancelCertificateTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /cancel-certificate-transfer/{certificateId}",
    input: { certificateId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferAlreadyCompletedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCertificateTransfer",
})) as any;

export type CancelDetectMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Cancels a Device Defender ML Detect mitigation action.
 *
 * Requires permission to access the CancelDetectMitigationActionsTask action.
 */
export const cancelDetectMitigationActionsTask: API.OperationMethod<
  CancelDetectMitigationActionsTaskRequest,
  CancelDetectMitigationActionsTaskResponse,
  CancelDetectMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /detect/mitigationactions/tasks/{taskId}/cancel",
    input: { taskId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDetectMitigationActionsTask",
})) as any;

export type CancelJobError =
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a job.
 *
 * Requires permission to access the CancelJob action.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /jobs/{jobId}/cancel",
    input: {
      jobId: 0,
      reasonCode: 0,
      comment: 0,
      force: D.m({ query: "force" }),
    },
    body: true,
  },
  errors: [
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
})) as any;

export type CancelJobExecutionError =
  | InvalidRequestException
  | InvalidStateTransitionException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Cancels the execution of a job for a given thing.
 *
 * Requires permission to access the CancelJobExecution action.
 */
export const cancelJobExecution: API.OperationMethod<
  CancelJobExecutionRequest,
  CancelJobExecutionResponse,
  CancelJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /things/{thingName}/jobs/{jobId}/cancel",
    input: {
      jobId: 0,
      thingName: 0,
      force: D.m({ query: "force" }),
      expectedVersion: 0,
      statusDetails: 0,
    },
    body: true,
  },
  errors: [
    InvalidRequestException,
    InvalidStateTransitionException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobExecution",
})) as any;

export type ClearDefaultAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Clears the default authorizer.
 *
 * Requires permission to access the ClearDefaultAuthorizer action.
 */
export const clearDefaultAuthorizer: API.OperationMethod<
  ClearDefaultAuthorizerRequest,
  ClearDefaultAuthorizerResponse,
  ClearDefaultAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /default-authorizer", input: {} },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClearDefaultAuthorizer",
})) as any;

export type ConfirmTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Confirms a topic rule destination. When you create a rule requiring a destination, IoT
 * sends a confirmation message to the endpoint or base address you specify. The message
 * includes a token which you pass back when calling `ConfirmTopicRuleDestination`
 * to confirm that you own or have access to the endpoint.
 *
 * Requires permission to access the ConfirmTopicRuleDestination action.
 */
export const confirmTopicRuleDestination: API.OperationMethod<
  ConfirmTopicRuleDestinationRequest,
  ConfirmTopicRuleDestinationResponse,
  ConfirmTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /confirmdestination/{confirmationToken+}",
    input: { confirmationToken: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmTopicRuleDestination",
})) as any;

export type CreateAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Device Defender audit suppression.
 *
 * Requires permission to access the CreateAuditSuppression action.
 */
export const createAuditSuppression: API.OperationMethod<
  CreateAuditSuppressionRequest,
  CreateAuditSuppressionResponse,
  CreateAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/suppressions/create",
    input: {
      checkName: 0,
      resourceIdentifier: i_ResourceIdentifier,
      expirationDate: 0,
      suppressIndefinitely: 0,
      description: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuditSuppression",
})) as any;

export type CreateAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an authorizer.
 *
 * Requires permission to access the CreateAuthorizer action.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  CreateAuthorizerResponse,
  CreateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /authorizer/{authorizerName}",
    input: {
      authorizerName: 0,
      authorizerFunctionArn: 0,
      tokenKeyName: 0,
      tokenSigningPublicKeys: 0,
      status: 0,
      tags: D.list(i_Tag),
      signingDisabled: 0,
      enableCachingForHttp: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
})) as any;

export type CreateBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a billing group. If this call is made multiple times using
 * the same billing group name and configuration, the call will succeed. If this call is made with
 * the same billing group name but different configuration a `ResourceAlreadyExistsException` is thrown.
 *
 * Requires permission to access the CreateBillingGroup action.
 */
export const createBillingGroup: API.OperationMethod<
  CreateBillingGroupRequest,
  CreateBillingGroupResponse,
  CreateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /billing-groups/{billingGroupName}",
    input: {
      billingGroupName: 0,
      billingGroupProperties: i_BillingGroupProperties,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingGroup",
})) as any;

export type CreateCertificateFromCsrError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an X.509 certificate using the specified certificate signing
 * request.
 *
 * Requires permission to access the CreateCertificateFromCsr action.
 *
 * The CSR must include a public key that is either an RSA key with a length of at least
 * 2048 bits or an ECC key from NIST P-256, NIST P-384, or NIST P-521 curves. For supported
 * certificates, consult Certificate signing algorithms supported by IoT.
 *
 * Reusing the same certificate signing request (CSR)
 * results in a distinct certificate.
 *
 * You can create multiple certificates in a batch by creating a directory, copying
 * multiple `.csr` files into that directory, and then specifying that directory on the command
 * line. The following commands show how to create a batch of certificates given a batch of
 * CSRs. In the following commands, we assume that a set of CSRs are located inside of the
 * directory my-csr-directory:
 *
 * On Linux and OS X, the command is:
 *
 * $ ls my-csr-directory/ | xargs -I {} aws iot create-certificate-from-csr
 * --certificate-signing-request file://my-csr-directory/{}
 *
 * This command lists all of the CSRs in my-csr-directory and pipes each CSR file name
 * to the `aws iot create-certificate-from-csr` Amazon Web Services CLI command to create a certificate for
 * the corresponding CSR.
 *
 * You can also run the `aws iot create-certificate-from-csr` part of the
 * command in parallel to speed up the certificate creation process:
 *
 * $ ls my-csr-directory/ | xargs -P 10 -I {} aws iot create-certificate-from-csr
 * --certificate-signing-request file://my-csr-directory/{}
 *
 * On Windows PowerShell, the command to create certificates for all CSRs in
 * my-csr-directory is:
 *
 * > ls -Name my-csr-directory | %{aws iot create-certificate-from-csr
 * --certificate-signing-request file://my-csr-directory/$_}
 *
 * On a Windows command prompt, the command to create certificates for all CSRs in
 * my-csr-directory is:
 *
 * > forfiles /p my-csr-directory /c "cmd /c aws iot create-certificate-from-csr
 * --certificate-signing-request file://@path"
 */
export const createCertificateFromCsr: API.OperationMethod<
  CreateCertificateFromCsrRequest,
  CreateCertificateFromCsrResponse,
  CreateCertificateFromCsrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /certificates",
    input: {
      certificateSigningRequest: 0,
      setAsActive: D.m({ query: "setAsActive" }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateFromCsr",
})) as any;

export type CreateCertificateProviderError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an Amazon Web Services IoT Core certificate provider. You can use Amazon Web Services IoT Core certificate provider to
 * customize how to sign a certificate signing request (CSR) in IoT fleet provisioning. For
 * more information, see Customizing certificate
 * signing using Amazon Web Services IoT Core certificate provider from Amazon Web Services IoT Core Developer
 * Guide.
 *
 * Requires permission to access the CreateCertificateProvider action.
 *
 * After you create a certificate provider, the behavior of
 * `CreateCertificateFromCsr` API for fleet provisioning will
 * change and all API calls to `CreateCertificateFromCsr` will invoke the
 * certificate provider to create the certificates. It can take up to a few minutes for
 * this behavior to change after a certificate provider is created.
 */
export const createCertificateProvider: API.OperationMethod<
  CreateCertificateProviderRequest,
  CreateCertificateProviderResponse,
  CreateCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /certificate-providers/{certificateProviderName}",
    input: {
      certificateProviderName: 0,
      lambdaFunctionArn: 0,
      accountDefaultForOperations: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateProvider",
})) as any;

export type CreateCommandError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a command. A command contains reusable configurations that can be applied
 * before they are sent to the devices.
 */
export const createCommand: API.OperationMethod<
  CreateCommandRequest,
  CreateCommandResponse,
  CreateCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /commands/{commandId}",
    input: {
      commandId: 0,
      namespace: 0,
      displayName: 0,
      description: 0,
      payload: { content: 0, contentType: 0 },
      payloadTemplate: 0,
      preprocessor: { awsJsonSubstitution: { outputFormat: 0 } },
      mandatoryParameters: D.list({
        name: 0,
        type: 0,
        value: i_CommandParameterValue,
        defaultValue: i_CommandParameterValue,
        valueConditions: D.list({
          comparisonOperator: 0,
          operand: {
            number: 0,
            numbers: 0,
            string: 0,
            strings: 0,
            numberRange: { min: 0, max: 0 },
          },
        }),
        description: 0,
      }),
      roleArn: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCommand",
})) as any;

export type CreateCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Use this API to define a
 * Custom
 * Metric
 * published by your devices to Device Defender.
 *
 * Requires permission to access the CreateCustomMetric action.
 */
export const createCustomMetric: API.OperationMethod<
  CreateCustomMetricRequest,
  CreateCustomMetricResponse,
  CreateCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /custom-metric/{metricName}",
    input: {
      metricName: 0,
      displayName: 0,
      metricType: 0,
      tags: D.list(i_Tag),
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomMetric",
})) as any;

export type CreateDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Create a dimension that you can use to limit the scope of a metric used in a security profile for IoT Device Defender.
 * For example, using a `TOPIC_FILTER` dimension, you can narrow down the scope of the metric only to MQTT topics whose name match the pattern specified in the dimension.
 *
 * Requires permission to access the CreateDimension action.
 */
export const createDimension: API.OperationMethod<
  CreateDimensionRequest,
  CreateDimensionResponse,
  CreateDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /dimensions/{name}",
    input: {
      name: 0,
      type: 0,
      stringValues: 0,
      tags: D.list(i_Tag),
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDimension",
})) as any;

export type CreateDomainConfigurationError =
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a domain configuration.
 *
 * Requires permission to access the CreateDomainConfiguration action.
 */
export const createDomainConfiguration: API.OperationMethod<
  CreateDomainConfigurationRequest,
  CreateDomainConfigurationResponse,
  CreateDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domainConfigurations/{domainConfigurationName}",
    input: {
      domainConfigurationName: 0,
      domainName: 0,
      serverCertificateArns: 0,
      validationCertificateArn: 0,
      authorizerConfig: i_AuthorizerConfig,
      serviceType: 0,
      tags: D.list(i_Tag),
      tlsConfig: i_TlsConfig,
      serverCertificateConfig: i_ServerCertificateConfig,
      authenticationType: 0,
      applicationProtocol: 0,
      clientCertificateConfig: i_ClientCertificateConfig,
    },
    body: true,
  },
  errors: [
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainConfiguration",
})) as any;

export type CreateDynamicThingGroupError =
  | InternalFailureException
  | InvalidQueryException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a dynamic thing group.
 *
 * Requires permission to access the CreateDynamicThingGroup action.
 */
export const createDynamicThingGroup: API.OperationMethod<
  CreateDynamicThingGroupRequest,
  CreateDynamicThingGroupResponse,
  CreateDynamicThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /dynamic-thing-groups/{thingGroupName}",
    input: {
      thingGroupName: 0,
      thingGroupProperties: i_ThingGroupProperties,
      indexName: 0,
      queryString: 0,
      queryVersion: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidQueryException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDynamicThingGroup",
})) as any;

export type CreateFleetMetricError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a fleet metric.
 *
 * Requires permission to access the CreateFleetMetric action.
 */
export const createFleetMetric: API.OperationMethod<
  CreateFleetMetricRequest,
  CreateFleetMetricResponse,
  CreateFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /fleet-metric/{metricName}",
    input: {
      metricName: 0,
      queryString: 0,
      aggregationType: i_AggregationType,
      period: 0,
      aggregationField: 0,
      description: 0,
      queryVersion: 0,
      indexName: 0,
      unit: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleetMetric",
})) as any;

export type CreateJobError =
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a job.
 *
 * Requires permission to access the CreateJob action.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /jobs/{jobId}",
    input: {
      jobId: 0,
      targets: 0,
      documentSource: 0,
      document: 0,
      description: 0,
      presignedUrlConfig: i_PresignedUrlConfig,
      targetSelection: 0,
      jobExecutionsRolloutConfig: i_JobExecutionsRolloutConfig,
      abortConfig: i_AbortConfig,
      timeoutConfig: i_TimeoutConfig,
      tags: D.list(i_Tag),
      namespaceId: 0,
      jobTemplateArn: 0,
      jobExecutionsRetryConfig: i_JobExecutionsRetryConfig,
      documentParameters: 0,
      schedulingConfig: {
        startTime: 0,
        endTime: 0,
        endBehavior: 0,
        maintenanceWindows: D.list(i_MaintenanceWindow),
      },
      destinationPackageVersions: 0,
    },
    body: true,
  },
  errors: [
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
})) as any;

export type CreateJobTemplateError =
  | ConflictException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a job template.
 *
 * Requires permission to access the CreateJobTemplate action.
 */
export const createJobTemplate: API.OperationMethod<
  CreateJobTemplateRequest,
  CreateJobTemplateResponse,
  CreateJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /job-templates/{jobTemplateId}",
    input: {
      jobTemplateId: 0,
      jobArn: 0,
      documentSource: 0,
      document: 0,
      description: 0,
      presignedUrlConfig: i_PresignedUrlConfig,
      jobExecutionsRolloutConfig: i_JobExecutionsRolloutConfig,
      abortConfig: i_AbortConfig,
      timeoutConfig: i_TimeoutConfig,
      tags: D.list(i_Tag),
      jobExecutionsRetryConfig: i_JobExecutionsRetryConfig,
      maintenanceWindows: D.list(i_MaintenanceWindow),
      destinationPackageVersions: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobTemplate",
})) as any;

export type CreateKeysAndCertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a 2048-bit RSA key pair and issues an X.509 certificate using the issued
 * public key. You can also call `CreateKeysAndCertificate` over MQTT from a
 * device, for more information, see Provisioning MQTT API.
 *
 * **Note** This is the only time IoT issues the private key
 * for this certificate, so it is important to keep it in a secure location.
 *
 * Requires permission to access the CreateKeysAndCertificate action.
 */
export const createKeysAndCertificate: API.OperationMethod<
  CreateKeysAndCertificateRequest,
  CreateKeysAndCertificateResponse,
  CreateKeysAndCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /keys-and-certificate",
    input: { setAsActive: D.m({ query: "setAsActive" }) },
    output: { keyPair: o_KeyPair },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeysAndCertificate",
})) as any;

export type CreateMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Defines an action that can be applied to audit findings by using StartAuditMitigationActionsTask. Only certain types of mitigation actions can be applied to specific check names.
 * For more information, see Mitigation actions. Each mitigation action can apply only one type of change.
 *
 * Requires permission to access the CreateMitigationAction action.
 */
export const createMitigationAction: API.OperationMethod<
  CreateMitigationActionRequest,
  CreateMitigationActionResponse,
  CreateMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /mitigationactions/actions/{actionName}",
    input: {
      actionName: 0,
      roleArn: 0,
      actionParams: i_MitigationActionParams,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMitigationAction",
})) as any;

export type CreateOTAUpdateError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an IoT OTA update on a target group of things or groups.
 *
 * Requires permission to access the CreateOTAUpdate action.
 */
export const createOTAUpdate: API.OperationMethod<
  CreateOTAUpdateRequest,
  CreateOTAUpdateResponse,
  CreateOTAUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /otaUpdates/{otaUpdateId}",
    input: {
      otaUpdateId: 0,
      description: 0,
      targets: 0,
      protocols: 0,
      targetSelection: 0,
      awsJobExecutionsRolloutConfig: {
        maximumPerMinute: 0,
        exponentialRate: {
          baseRatePerMinute: 0,
          incrementFactor: 0,
          rateIncreaseCriteria: {
            numberOfNotifiedThings: 0,
            numberOfSucceededThings: 0,
          },
        },
      },
      awsJobPresignedUrlConfig: { expiresInSec: 0 },
      awsJobAbortConfig: {
        abortCriteriaList: D.list({
          failureType: 0,
          action: 0,
          thresholdPercentage: 0,
          minNumberOfExecutedThings: 0,
        }),
      },
      awsJobTimeoutConfig: { inProgressTimeoutInMinutes: 0 },
      files: D.list({
        fileName: 0,
        fileType: 0,
        fileVersion: 0,
        fileLocation: {
          stream: { streamId: 0, fileId: 0 },
          s3Location: i_S3Location,
        },
        codeSigning: {
          awsSignerJobId: 0,
          startSigningJobParameter: {
            signingProfileParameter: {
              certificateArn: 0,
              platform: 0,
              certificatePathOnDevice: 0,
            },
            signingProfileName: 0,
            destination: { s3Destination: { bucket: 0, prefix: 0 } },
          },
          customCodeSigning: {
            signature: { inlineDocument: 0 },
            certificateChain: { certificateName: 0, inlineDocument: 0 },
            hashAlgorithm: 0,
            signatureAlgorithm: 0,
          },
        },
        attributes: 0,
      }),
      roleArn: 0,
      additionalParameters: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOTAUpdate",
})) as any;

export type CreatePackageError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an IoT software package that can be deployed to your fleet.
 *
 * Requires permission to access the CreatePackage and GetIndexingConfiguration actions.
 */
export const createPackage: API.OperationMethod<
  CreatePackageRequest,
  CreatePackageResponse,
  CreatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /packages/{packageName}",
    input: {
      packageName: 0,
      description: 0,
      tags: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { description: D.secret },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackage",
})) as any;

export type CreatePackageVersionError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version for an existing IoT software package.
 *
 * Requires permission to access the CreatePackageVersion and GetIndexingConfiguration actions.
 */
export const createPackageVersion: API.OperationMethod<
  CreatePackageVersionRequest,
  CreatePackageVersionResponse,
  CreatePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /packages/{packageName}/versions/{versionName}",
    input: {
      packageName: 0,
      versionName: 0,
      description: 0,
      attributes: 0,
      artifact: i_PackageVersionArtifact,
      recipe: 0,
      tags: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { description: D.secret },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackageVersion",
})) as any;

export type CreatePolicyError =
  | InternalFailureException
  | InvalidRequestException
  | MalformedPolicyException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an IoT policy.
 *
 * The created policy is the default version for the policy. This operation creates a
 * policy version with a version identifier of **1** and sets
 * **1** as the policy's default version.
 *
 * Requires permission to access the CreatePolicy action.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policies/{policyName}",
    input: { policyName: 0, policyDocument: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MalformedPolicyException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
})) as any;

export type CreatePolicyVersionError =
  | InternalFailureException
  | InvalidRequestException
  | MalformedPolicyException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionsLimitExceededException
  | CommonErrors;
/**
 * Creates a new version of the specified IoT policy. To update a policy, create a
 * new policy version. A managed policy can have up to five versions. If the policy has five
 * versions, you must use DeletePolicyVersion to delete an existing version
 * before you create a new one.
 *
 * Optionally, you can set the new version as the policy's default version. The default
 * version is the operative version (that is, the version that is in effect for the
 * certificates to which the policy is attached).
 *
 * Requires permission to access the CreatePolicyVersion action.
 */
export const createPolicyVersion: API.OperationMethod<
  CreatePolicyVersionRequest,
  CreatePolicyVersionResponse,
  CreatePolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policies/{policyName}/version",
    input: {
      policyName: 0,
      policyDocument: 0,
      setAsDefault: D.m({ query: "setAsDefault" }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MalformedPolicyException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyVersion",
})) as any;

export type CreateProvisioningClaimError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a provisioning claim.
 *
 * Requires permission to access the CreateProvisioningClaim action.
 */
export const createProvisioningClaim: API.OperationMethod<
  CreateProvisioningClaimRequest,
  CreateProvisioningClaimResponse,
  CreateProvisioningClaimError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /provisioning-templates/{templateName}/provisioning-claim",
    input: { templateName: 0 },
    output: { keyPair: o_KeyPair, expiration: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningClaim",
})) as any;

export type CreateProvisioningTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a provisioning template.
 *
 * Requires permission to access the CreateProvisioningTemplate action.
 */
export const createProvisioningTemplate: API.OperationMethod<
  CreateProvisioningTemplateRequest,
  CreateProvisioningTemplateResponse,
  CreateProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /provisioning-templates",
    input: {
      templateName: 0,
      description: 0,
      templateBody: 0,
      enabled: 0,
      provisioningRoleArn: 0,
      preProvisioningHook: i_ProvisioningHook,
      tags: D.list(i_Tag),
      type: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningTemplate",
})) as any;

export type CreateProvisioningTemplateVersionError =
  | ConflictingResourceUpdateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | VersionsLimitExceededException
  | CommonErrors;
/**
 * Creates a new version of a provisioning template.
 *
 * Requires permission to access the CreateProvisioningTemplateVersion action.
 */
export const createProvisioningTemplateVersion: API.OperationMethod<
  CreateProvisioningTemplateVersionRequest,
  CreateProvisioningTemplateVersionResponse,
  CreateProvisioningTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /provisioning-templates/{templateName}/versions",
    input: {
      templateName: 0,
      templateBody: 0,
      setAsDefault: D.m({ query: "setAsDefault" }),
    },
    body: true,
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    VersionsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningTemplateVersion",
})) as any;

export type CreateRoleAliasError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a role alias.
 *
 * Requires permission to access the CreateRoleAlias action.
 *
 * The value of
 * `credentialDurationSeconds`
 * must be less than or equal to the maximum session
 * duration of the IAM role that the role alias references. For more information, see
 *
 * Modifying a role maximum session duration (Amazon Web Services API) from the Amazon Web Services Identity and Access Management User Guide.
 */
export const createRoleAlias: API.OperationMethod<
  CreateRoleAliasRequest,
  CreateRoleAliasResponse,
  CreateRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /role-aliases/{roleAlias}",
    input: {
      roleAlias: 0,
      roleArn: 0,
      credentialDurationSeconds: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoleAlias",
})) as any;

export type CreateScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a scheduled audit that is run at a specified
 * time interval.
 *
 * Requires permission to access the CreateScheduledAudit action.
 */
export const createScheduledAudit: API.OperationMethod<
  CreateScheduledAuditRequest,
  CreateScheduledAuditResponse,
  CreateScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/scheduledaudits/{scheduledAuditName}",
    input: {
      frequency: 0,
      dayOfMonth: 0,
      dayOfWeek: 0,
      targetCheckNames: 0,
      scheduledAuditName: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAudit",
})) as any;

export type CreateSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Creates a Device Defender security profile.
 *
 * Requires permission to access the CreateSecurityProfile action.
 */
export const createSecurityProfile: API.OperationMethod<
  CreateSecurityProfileRequest,
  CreateSecurityProfileResponse,
  CreateSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /security-profiles/{securityProfileName}",
    input: {
      securityProfileName: 0,
      securityProfileDescription: 0,
      behaviors: D.list(i_Behavior),
      alertTargets: D.map(i_AlertTarget),
      additionalMetricsToRetain: 0,
      additionalMetricsToRetainV2: D.list(i_MetricToRetain),
      tags: D.list(i_Tag),
      metricsExportConfig: i_MetricsExportConfig,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityProfile",
})) as any;

export type CreateStreamError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a stream for delivering one or more large files in chunks over MQTT. A stream transports data
 * bytes in chunks or blocks packaged as MQTT messages from a source like S3. You can have one or more files
 * associated with a stream.
 *
 * Requires permission to access the CreateStream action.
 */
export const createStream: API.OperationMethod<
  CreateStreamRequest,
  CreateStreamResponse,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streams/{streamId}",
    input: {
      streamId: 0,
      description: 0,
      files: D.list(i_StreamFile),
      roleArn: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
})) as any;

export type CreateThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a thing record in the registry. If this call is made multiple times using
 * the same thing name and configuration, the call will succeed. If this call is made with
 * the same thing name but different configuration a
 * `ResourceAlreadyExistsException` is thrown.
 *
 * This is a control plane operation. See Authorization for
 * information about authorizing control plane actions.
 *
 * Requires permission to access the CreateThing action.
 */
export const createThing: API.OperationMethod<
  CreateThingRequest,
  CreateThingResponse,
  CreateThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /things/{thingName}",
    input: {
      thingName: 0,
      thingTypeName: 0,
      attributePayload: i_AttributePayload,
      billingGroupName: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThing",
})) as any;

export type CreateThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Create a thing group.
 *
 * This is a control plane operation. See Authorization for
 * information about authorizing control plane actions.
 *
 * If the `ThingGroup` that you create has the exact same attributes as an existing
 * `ThingGroup`, you will get a 200 success response.
 *
 * Requires permission to access the CreateThingGroup action.
 */
export const createThingGroup: API.OperationMethod<
  CreateThingGroupRequest,
  CreateThingGroupResponse,
  CreateThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /thing-groups/{thingGroupName}",
    input: {
      thingGroupName: 0,
      parentGroupName: 0,
      thingGroupProperties: i_ThingGroupProperties,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThingGroup",
})) as any;

export type CreateThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new thing type. If this call is made multiple times using
 * the same thing type name and configuration, the call will succeed. If this call is made with
 * the same thing type name but different configuration a `ResourceAlreadyExistsException` is thrown.
 *
 * Requires permission to access the CreateThingType action.
 */
export const createThingType: API.OperationMethod<
  CreateThingTypeRequest,
  CreateThingTypeResponse,
  CreateThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /thing-types/{thingTypeName}",
    input: {
      thingTypeName: 0,
      thingTypeProperties: i_ThingTypeProperties,
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThingType",
})) as any;

export type CreateTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | SqlParseException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a rule. Creating rules is an administrator-level action. Any user who has
 * permission to create rules will be able to access data processed by the rule.
 *
 * Requires permission to access the CreateTopicRule action.
 */
export const createTopicRule: API.OperationMethod<
  CreateTopicRuleRequest,
  CreateTopicRuleResponse,
  CreateTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /rules/{ruleName}",
    input: {
      ruleName: 0,
      topicRulePayload: D.m({ payload: true, shape: i_TopicRulePayload }),
      tags: D.m({ header: "x-amz-tagging" }),
    },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    SqlParseException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopicRule",
})) as any;

export type CreateTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a topic rule destination. The destination must be confirmed prior to use.
 *
 * Requires permission to access the CreateTopicRuleDestination action.
 */
export const createTopicRuleDestination: API.OperationMethod<
  CreateTopicRuleDestinationRequest,
  CreateTopicRuleDestinationResponse,
  CreateTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /destinations",
    input: {
      destinationConfiguration: {
        httpUrlConfiguration: { confirmationUrl: 0 },
        vpcConfiguration: {
          subnetIds: 0,
          securityGroups: 0,
          vpcId: 0,
          roleArn: 0,
        },
        influxDBConfiguration: {
          endpoint: 0,
          influxDBVersion: 0,
          secretId: 0,
          secretType: 0,
          secretKey: 0,
        },
      },
    },
    output: { topicRuleDestination: o_TopicRuleDestination },
    body: true,
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopicRuleDestination",
})) as any;

export type DeleteAccountAuditConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Restores the default settings for Device Defender audits for this account. Any
 * configuration data you entered is deleted and all audit checks are reset to
 * disabled.
 *
 * Requires permission to access the DeleteAccountAuditConfiguration action.
 */
export const deleteAccountAuditConfiguration: API.OperationMethod<
  DeleteAccountAuditConfigurationRequest,
  DeleteAccountAuditConfigurationResponse,
  DeleteAccountAuditConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /audit/configuration",
    input: { deleteScheduledAudits: D.m({ query: "deleteScheduledAudits" }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAuditConfiguration",
})) as any;

export type DeleteAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Device Defender audit suppression.
 *
 * Requires permission to access the DeleteAuditSuppression action.
 */
export const deleteAuditSuppression: API.OperationMethod<
  DeleteAuditSuppressionRequest,
  DeleteAuditSuppressionResponse,
  DeleteAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/suppressions/delete",
    input: { checkName: 0, resourceIdentifier: i_ResourceIdentifier },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuditSuppression",
})) as any;

export type DeleteAuthorizerError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an authorizer.
 *
 * Requires permission to access the DeleteAuthorizer action.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /authorizer/{authorizerName}",
    input: { authorizerName: 0 },
  },
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
})) as any;

export type DeleteBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes the billing group.
 *
 * Requires permission to access the DeleteBillingGroup action.
 */
export const deleteBillingGroup: API.OperationMethod<
  DeleteBillingGroupRequest,
  DeleteBillingGroupResponse,
  DeleteBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /billing-groups/{billingGroupName}",
    input: {
      billingGroupName: 0,
      expectedVersion: D.m({ query: "expectedVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingGroup",
})) as any;

export type DeleteCACertificateError =
  | CertificateStateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a registered CA certificate.
 *
 * Requires permission to access the DeleteCACertificate action.
 */
export const deleteCACertificate: API.OperationMethod<
  DeleteCACertificateRequest,
  DeleteCACertificateResponse,
  DeleteCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /cacertificate/{certificateId}",
    input: { certificateId: 0 },
  },
  errors: [
    CertificateStateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCACertificate",
})) as any;

export type DeleteCertificateError =
  | CertificateStateException
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified certificate.
 *
 * A certificate cannot be deleted if it has a policy or IoT thing attached to it or if
 * its status is set to ACTIVE. To delete a certificate, first use the DetachPolicy action to detach all policies. Next, use the UpdateCertificate action to set the certificate to the INACTIVE
 * status.
 *
 * Requires permission to access the DeleteCertificate action.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /certificates/{certificateId}",
    input: { certificateId: 0, forceDelete: D.m({ query: "forceDelete" }) },
  },
  errors: [
    CertificateStateException,
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
})) as any;

export type DeleteCertificateProviderError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a certificate provider.
 *
 * Requires permission to access the DeleteCertificateProvider action.
 *
 * If you delete the certificate provider resource, the behavior of
 * `CreateCertificateFromCsr` will resume, and IoT will create
 * certificates signed by IoT from a certificate signing request (CSR).
 */
export const deleteCertificateProvider: API.OperationMethod<
  DeleteCertificateProviderRequest,
  DeleteCertificateProviderResponse,
  DeleteCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /certificate-providers/{certificateProviderName}",
    input: { certificateProviderName: 0 },
  },
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificateProvider",
})) as any;

export type DeleteCommandError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a command resource.
 */
export const deleteCommand: API.OperationMethod<
  DeleteCommandRequest,
  DeleteCommandResponse,
  DeleteCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /commands/{commandId}",
    input: { commandId: 0 },
    output: { statusCode: D.m({ status: true }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommand",
})) as any;

export type DeleteCommandExecutionError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a command execution.
 *
 * Only command executions that enter a terminal state can be deleted from
 * your account.
 */
export const deleteCommandExecution: API.OperationMethod<
  DeleteCommandExecutionRequest,
  DeleteCommandExecutionResponse,
  DeleteCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /command-executions/{executionId}",
    input: { executionId: 0, targetArn: D.m({ query: "targetArn" }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommandExecution",
})) as any;

export type DeleteCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Deletes a Device Defender detect custom metric.
 *
 * Requires permission to access the DeleteCustomMetric action.
 *
 * Before you can delete a custom metric, you must first remove the custom metric from all
 * security profiles it's a part of.
 * The
 * security
 * profile associated with the custom metric can be found using the ListSecurityProfiles
 * API with `metricName` set to your custom metric name.
 */
export const deleteCustomMetric: API.OperationMethod<
  DeleteCustomMetricRequest,
  DeleteCustomMetricResponse,
  DeleteCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /custom-metric/{metricName}",
    input: { metricName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomMetric",
})) as any;

export type DeleteDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Removes the specified dimension from your Amazon Web Services accounts.
 *
 * Requires permission to access the DeleteDimension action.
 */
export const deleteDimension: API.OperationMethod<
  DeleteDimensionRequest,
  DeleteDimensionResponse,
  DeleteDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /dimensions/{name}",
    input: { name: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDimension",
})) as any;

export type DeleteDomainConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified domain configuration.
 *
 * Requires permission to access the DeleteDomainConfiguration action.
 */
export const deleteDomainConfiguration: API.OperationMethod<
  DeleteDomainConfigurationRequest,
  DeleteDomainConfigurationResponse,
  DeleteDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domainConfigurations/{domainConfigurationName}",
    input: { domainConfigurationName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainConfiguration",
})) as any;

export type DeleteDynamicThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes a dynamic thing group.
 *
 * Requires permission to access the DeleteDynamicThingGroup action.
 */
export const deleteDynamicThingGroup: API.OperationMethod<
  DeleteDynamicThingGroupRequest,
  DeleteDynamicThingGroupResponse,
  DeleteDynamicThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /dynamic-thing-groups/{thingGroupName}",
    input: {
      thingGroupName: 0,
      expectedVersion: D.m({ query: "expectedVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDynamicThingGroup",
})) as any;

export type DeleteFleetMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes the specified fleet metric.
 * Returns successfully with no error if the deletion is successful or you specify a fleet metric that doesn't exist.
 *
 * Requires permission to access the DeleteFleetMetric action.
 */
export const deleteFleetMetric: API.OperationMethod<
  DeleteFleetMetricRequest,
  DeleteFleetMetricResponse,
  DeleteFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /fleet-metric/{metricName}",
    input: {
      metricName: 0,
      expectedVersion: D.m({ query: "expectedVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetMetric",
})) as any;

export type DeleteJobError =
  | InvalidRequestException
  | InvalidStateTransitionException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a job and its related job executions.
 *
 * Deleting a job may take time, depending on the number of job executions created for
 * the job and various other factors. While the job is being deleted, the status of the job
 * will be shown as "DELETION_IN_PROGRESS". Attempting to delete or cancel a job whose
 * status is already "DELETION_IN_PROGRESS" will result in an error.
 *
 * Only 10 jobs may have status "DELETION_IN_PROGRESS" at the same time, or a
 * LimitExceededException will occur.
 *
 * Requires permission to access the DeleteJob action.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /jobs/{jobId}",
    input: {
      jobId: 0,
      force: D.m({ query: "force" }),
      namespaceId: D.m({ query: "namespaceId" }),
    },
  },
  errors: [
    InvalidRequestException,
    InvalidStateTransitionException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
})) as any;

export type DeleteJobExecutionError =
  | InvalidRequestException
  | InvalidStateTransitionException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a job execution.
 *
 * Requires permission to access the DeleteJobExecution action.
 */
export const deleteJobExecution: API.OperationMethod<
  DeleteJobExecutionRequest,
  DeleteJobExecutionResponse,
  DeleteJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /things/{thingName}/jobs/{jobId}/executionNumber/{executionNumber}",
    input: {
      jobId: 0,
      thingName: 0,
      executionNumber: 0,
      force: D.m({ query: "force" }),
      namespaceId: D.m({ query: "namespaceId" }),
    },
  },
  errors: [
    InvalidRequestException,
    InvalidStateTransitionException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobExecution",
})) as any;

export type DeleteJobTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified job template.
 */
export const deleteJobTemplate: API.OperationMethod<
  DeleteJobTemplateRequest,
  DeleteJobTemplateResponse,
  DeleteJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /job-templates/{jobTemplateId}",
    input: { jobTemplateId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
})) as any;

export type DeleteMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a defined mitigation action from your Amazon Web Services accounts.
 *
 * Requires permission to access the DeleteMitigationAction action.
 */
export const deleteMitigationAction: API.OperationMethod<
  DeleteMitigationActionRequest,
  DeleteMitigationActionResponse,
  DeleteMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /mitigationactions/actions/{actionName}",
    input: { actionName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMitigationAction",
})) as any;

export type DeleteOTAUpdateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Delete an OTA update.
 *
 * Requires permission to access the DeleteOTAUpdate action.
 */
export const deleteOTAUpdate: API.OperationMethod<
  DeleteOTAUpdateRequest,
  DeleteOTAUpdateResponse,
  DeleteOTAUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /otaUpdates/{otaUpdateId}",
    input: {
      otaUpdateId: 0,
      deleteStream: D.m({ query: "deleteStream" }),
      forceDeleteAWSJob: D.m({ query: "forceDeleteAWSJob" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOTAUpdate",
})) as any;

export type DeletePackageError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version from a software package.
 *
 * **Note:** All package versions must be deleted before deleting the software package.
 *
 * Requires permission to access the DeletePackageVersion action.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResponse,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /packages/{packageName}",
    input: {
      packageName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackage",
})) as any;

export type DeletePackageVersionError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version from a software package.
 *
 * **Note:** If a package version is designated as default, you must remove the designation from the software package using the UpdatePackage action.
 */
export const deletePackageVersion: API.OperationMethod<
  DeletePackageVersionRequest,
  DeletePackageVersionResponse,
  DeletePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /packages/{packageName}/versions/{versionName}",
    input: {
      packageName: 0,
      versionName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackageVersion",
})) as any;

export type DeletePolicyError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified policy.
 *
 * A policy cannot be deleted if it has non-default versions or it is attached to any
 * certificate.
 *
 * To delete a policy, use the DeletePolicyVersion action to delete all non-default
 * versions of the policy; use the DetachPolicy action to detach the policy from any
 * certificate; and then use the DeletePolicy action to delete the policy.
 *
 * When a policy is deleted using DeletePolicy, its default version is deleted with
 * it.
 *
 * Because of the distributed nature of Amazon Web Services, it can take up to five minutes after
 * a policy is detached before it's ready to be deleted.
 *
 * Requires permission to access the DeletePolicy action.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policies/{policyName}",
    input: { policyName: 0 },
  },
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

export type DeletePolicyVersionError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified version of the specified policy. You cannot delete the default
 * version of a policy using this action. To delete the default version of a policy, use DeletePolicy. To find out which version of a policy is marked as the default
 * version, use ListPolicyVersions.
 *
 * Requires permission to access the DeletePolicyVersion action.
 */
export const deletePolicyVersion: API.OperationMethod<
  DeletePolicyVersionRequest,
  DeletePolicyVersionResponse,
  DeletePolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policies/{policyName}/version/{policyVersionId}",
    input: { policyName: 0, policyVersionId: 0 },
  },
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyVersion",
})) as any;

export type DeleteProvisioningTemplateError =
  | ConflictingResourceUpdateException
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a provisioning template.
 *
 * Requires permission to access the DeleteProvisioningTemplate action.
 */
export const deleteProvisioningTemplate: API.OperationMethod<
  DeleteProvisioningTemplateRequest,
  DeleteProvisioningTemplateResponse,
  DeleteProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /provisioning-templates/{templateName}",
    input: { templateName: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningTemplate",
})) as any;

export type DeleteProvisioningTemplateVersionError =
  | ConflictingResourceUpdateException
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a provisioning template version.
 *
 * Requires permission to access the DeleteProvisioningTemplateVersion action.
 */
export const deleteProvisioningTemplateVersion: API.OperationMethod<
  DeleteProvisioningTemplateVersionRequest,
  DeleteProvisioningTemplateVersionResponse,
  DeleteProvisioningTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /provisioning-templates/{templateName}/versions/{versionId}",
    input: { templateName: 0, versionId: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningTemplateVersion",
})) as any;

export type DeleteRegistrationCodeError =
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a CA certificate registration code.
 *
 * Requires permission to access the DeleteRegistrationCode action.
 */
export const deleteRegistrationCode: API.OperationMethod<
  DeleteRegistrationCodeRequest,
  DeleteRegistrationCodeResponse,
  DeleteRegistrationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /registrationcode", input: {} },
  errors: [
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistrationCode",
})) as any;

export type DeleteRoleAliasError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a role alias
 *
 * Requires permission to access the DeleteRoleAlias action.
 */
export const deleteRoleAlias: API.OperationMethod<
  DeleteRoleAliasRequest,
  DeleteRoleAliasResponse,
  DeleteRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /role-aliases/{roleAlias}",
    input: { roleAlias: 0 },
  },
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoleAlias",
})) as any;

export type DeleteScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a scheduled audit.
 *
 * Requires permission to access the DeleteScheduledAudit action.
 */
export const deleteScheduledAudit: API.OperationMethod<
  DeleteScheduledAuditRequest,
  DeleteScheduledAuditResponse,
  DeleteScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /audit/scheduledaudits/{scheduledAuditName}",
    input: { scheduledAuditName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAudit",
})) as any;

export type DeleteSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Deletes a Device Defender security profile.
 *
 * Requires permission to access the DeleteSecurityProfile action.
 */
export const deleteSecurityProfile: API.OperationMethod<
  DeleteSecurityProfileRequest,
  DeleteSecurityProfileResponse,
  DeleteSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /security-profiles/{securityProfileName}",
    input: {
      securityProfileName: 0,
      expectedVersion: D.m({ query: "expectedVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityProfile",
})) as any;

export type DeleteStreamError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a stream.
 *
 * Requires permission to access the DeleteStream action.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamRequest,
  DeleteStreamResponse,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /streams/{streamId}",
    input: { streamId: 0 },
  },
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
})) as any;

export type DeleteThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes the specified thing. Returns successfully with no error if the deletion is
 * successful or you specify a thing that doesn't exist.
 *
 * Requires permission to access the DeleteThing action.
 */
export const deleteThing: API.OperationMethod<
  DeleteThingRequest,
  DeleteThingResponse,
  DeleteThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /things/{thingName}",
    input: { thingName: 0, expectedVersion: D.m({ query: "expectedVersion" }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThing",
})) as any;

export type DeleteThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes a thing group.
 *
 * Requires permission to access the DeleteThingGroup action.
 */
export const deleteThingGroup: API.OperationMethod<
  DeleteThingGroupRequest,
  DeleteThingGroupResponse,
  DeleteThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /thing-groups/{thingGroupName}",
    input: {
      thingGroupName: 0,
      expectedVersion: D.m({ query: "expectedVersion" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingGroup",
})) as any;

export type DeleteThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified thing type. You cannot delete a thing type if it has things
 * associated with it. To delete a thing type, first mark it as deprecated by calling DeprecateThingType, then remove any associated things by calling UpdateThing to change the thing type on any associated thing, and
 * finally use DeleteThingType to delete the thing type.
 *
 * Requires permission to access the DeleteThingType action.
 */
export const deleteThingType: API.OperationMethod<
  DeleteThingTypeRequest,
  DeleteThingTypeResponse,
  DeleteThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /thing-types/{thingTypeName}",
    input: { thingTypeName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingType",
})) as any;

export type DeleteTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | TopicRuleNotFound
  | CommonErrors;
/**
 * Deletes the rule.
 *
 * Requires permission to access the DeleteTopicRule action.
 */
export const deleteTopicRule: API.OperationMethod<
  DeleteTopicRuleRequest,
  DeleteTopicRuleResponse,
  DeleteTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /rules/{ruleName}",
    input: { ruleName: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
    TopicRuleNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopicRule",
})) as any;

export type DeleteTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a topic rule destination.
 *
 * Requires permission to access the DeleteTopicRuleDestination action.
 */
export const deleteTopicRuleDestination: API.OperationMethod<
  DeleteTopicRuleDestinationRequest,
  DeleteTopicRuleDestinationResponse,
  DeleteTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /destinations/{arn+}",
    input: { arn: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopicRuleDestination",
})) as any;

export type DeleteV2LoggingLevelError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a logging level.
 *
 * Requires permission to access the DeleteV2LoggingLevel action.
 */
export const deleteV2LoggingLevel: API.OperationMethod<
  DeleteV2LoggingLevelRequest,
  DeleteV2LoggingLevelResponse,
  DeleteV2LoggingLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2LoggingLevel",
    input: {
      targetType: D.m({ query: "targetType" }),
      targetName: D.m({ query: "targetName" }),
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteV2LoggingLevel",
})) as any;

export type DeprecateThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deprecates a thing type. You can not associate new things with deprecated thing
 * type.
 *
 * Requires permission to access the DeprecateThingType action.
 */
export const deprecateThingType: API.OperationMethod<
  DeprecateThingTypeRequest,
  DeprecateThingTypeResponse,
  DeprecateThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /thing-types/{thingTypeName}/deprecate",
    input: { thingTypeName: 0, undoDeprecate: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateThingType",
})) as any;

export type DescribeAccountAuditConfigurationError =
  | InternalFailureException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about the Device Defender audit settings for this account.
 * Settings include how audit notifications are sent and which audit checks are
 * enabled or disabled.
 *
 * Requires permission to access the DescribeAccountAuditConfiguration action.
 */
export const describeAccountAuditConfiguration: API.OperationMethod<
  DescribeAccountAuditConfigurationRequest,
  DescribeAccountAuditConfigurationResponse,
  DescribeAccountAuditConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /audit/configuration", input: {} },
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAuditConfiguration",
})) as any;

export type DescribeAuditFindingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a single audit finding. Properties include the reason for
 * noncompliance, the severity of the issue,
 * and the start time
 * when the audit that returned the
 * finding.
 *
 * Requires permission to access the DescribeAuditFinding action.
 */
export const describeAuditFinding: API.OperationMethod<
  DescribeAuditFindingRequest,
  DescribeAuditFindingResponse,
  DescribeAuditFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/findings/{findingId}",
    input: { findingId: 0 },
    output: { finding: o_AuditFinding },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditFinding",
})) as any;

export type DescribeAuditMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about an audit mitigation task that is used to apply mitigation actions to a set of audit findings. Properties include the actions being applied, the audit checks to which they're being applied, the task status, and aggregated task statistics.
 */
export const describeAuditMitigationActionsTask: API.OperationMethod<
  DescribeAuditMitigationActionsTaskRequest,
  DescribeAuditMitigationActionsTaskResponse,
  DescribeAuditMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/mitigationactions/tasks/{taskId}",
    input: { taskId: 0 },
    output: { startTime: D.ts, endTime: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditMitigationActionsTask",
})) as any;

export type DescribeAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a Device Defender audit suppression.
 */
export const describeAuditSuppression: API.OperationMethod<
  DescribeAuditSuppressionRequest,
  DescribeAuditSuppressionResponse,
  DescribeAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/suppressions/describe",
    input: { checkName: 0, resourceIdentifier: i_ResourceIdentifier },
    output: { expirationDate: D.ts },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditSuppression",
})) as any;

export type DescribeAuditTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a Device Defender audit.
 *
 * Requires permission to access the DescribeAuditTask action.
 */
export const describeAuditTask: API.OperationMethod<
  DescribeAuditTaskRequest,
  DescribeAuditTaskResponse,
  DescribeAuditTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/tasks/{taskId}",
    input: { taskId: 0 },
    output: { taskStartTime: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditTask",
})) as any;

export type DescribeAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes an authorizer.
 *
 * Requires permission to access the DescribeAuthorizer action.
 */
export const describeAuthorizer: API.OperationMethod<
  DescribeAuthorizerRequest,
  DescribeAuthorizerResponse,
  DescribeAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /authorizer/{authorizerName}",
    input: { authorizerName: 0 },
    output: { authorizerDescription: o_AuthorizerDescription },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuthorizer",
})) as any;

export type DescribeBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about a billing group.
 *
 * Requires permission to access the DescribeBillingGroup action.
 */
export const describeBillingGroup: API.OperationMethod<
  DescribeBillingGroupRequest,
  DescribeBillingGroupResponse,
  DescribeBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /billing-groups/{billingGroupName}",
    input: { billingGroupName: 0 },
    output: { billingGroupMetadata: { creationDate: D.ts } },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBillingGroup",
})) as any;

export type DescribeCACertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a registered CA certificate.
 *
 * Requires permission to access the DescribeCACertificate action.
 */
export const describeCACertificate: API.OperationMethod<
  DescribeCACertificateRequest,
  DescribeCACertificateResponse,
  DescribeCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /cacertificate/{certificateId}",
    input: { certificateId: 0 },
    output: {
      certificateDescription: {
        creationDate: D.ts,
        lastModifiedDate: D.ts,
        validity: o_CertificateValidity,
      },
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCACertificate",
})) as any;

export type DescribeCertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified certificate.
 *
 * Requires permission to access the DescribeCertificate action.
 */
export const describeCertificate: API.OperationMethod<
  DescribeCertificateRequest,
  DescribeCertificateResponse,
  DescribeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /certificates/{certificateId}",
    input: { certificateId: 0 },
    output: {
      certificateDescription: {
        creationDate: D.ts,
        lastModifiedDate: D.ts,
        transferData: {
          transferDate: D.ts,
          acceptDate: D.ts,
          rejectDate: D.ts,
        },
        validity: o_CertificateValidity,
      },
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
})) as any;

export type DescribeCertificateProviderError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a certificate provider.
 *
 * Requires permission to access the DescribeCertificateProvider action.
 */
export const describeCertificateProvider: API.OperationMethod<
  DescribeCertificateProviderRequest,
  DescribeCertificateProviderResponse,
  DescribeCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /certificate-providers/{certificateProviderName}",
    input: { certificateProviderName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificateProvider",
})) as any;

export type DescribeCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Gets information about a Device Defender detect custom metric.
 *
 * Requires permission to access the DescribeCustomMetric action.
 */
export const describeCustomMetric: API.OperationMethod<
  DescribeCustomMetricRequest,
  DescribeCustomMetricResponse,
  DescribeCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /custom-metric/{metricName}",
    input: { metricName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomMetric",
})) as any;

export type DescribeDefaultAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes the default authorizer.
 *
 * Requires permission to access the DescribeDefaultAuthorizer action.
 */
export const describeDefaultAuthorizer: API.OperationMethod<
  DescribeDefaultAuthorizerRequest,
  DescribeDefaultAuthorizerResponse,
  DescribeDefaultAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /default-authorizer",
    input: {},
    output: { authorizerDescription: o_AuthorizerDescription },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultAuthorizer",
})) as any;

export type DescribeDetectMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Gets information about a Device Defender ML Detect mitigation action.
 *
 * Requires permission to access the DescribeDetectMitigationActionsTask action.
 */
export const describeDetectMitigationActionsTask: API.OperationMethod<
  DescribeDetectMitigationActionsTaskRequest,
  DescribeDetectMitigationActionsTaskResponse,
  DescribeDetectMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /detect/mitigationactions/tasks/{taskId}",
    input: { taskId: 0 },
    output: { taskSummary: o_DetectMitigationActionsTaskSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetectMitigationActionsTask",
})) as any;

export type DescribeDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Provides details about a dimension that is defined in your Amazon Web Services accounts.
 *
 * Requires permission to access the DescribeDimension action.
 */
export const describeDimension: API.OperationMethod<
  DescribeDimensionRequest,
  DescribeDimensionResponse,
  DescribeDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /dimensions/{name}",
    input: { name: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDimension",
})) as any;

export type DescribeDomainConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets summary information about a domain configuration.
 *
 * Requires permission to access the DescribeDomainConfiguration action.
 */
export const describeDomainConfiguration: API.OperationMethod<
  DescribeDomainConfigurationRequest,
  DescribeDomainConfigurationResponse,
  DescribeDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domainConfigurations/{domainConfigurationName}",
    input: { domainConfigurationName: 0 },
    output: { lastStatusChangeDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainConfiguration",
})) as any;

export type DescribeEncryptionConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the encryption configuration for resources and data of your Amazon Web Services account in
 * Amazon Web Services IoT Core. For more information, see Data encryption at rest in
 * the *Amazon Web Services IoT Core Developer Guide*.
 */
export const describeEncryptionConfiguration: API.OperationMethod<
  DescribeEncryptionConfigurationRequest,
  DescribeEncryptionConfigurationResponse,
  DescribeEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /encryption-configuration",
    input: {},
    output: { lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEncryptionConfiguration",
})) as any;

export type DescribeEndpointError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns or creates a unique endpoint specific to the Amazon Web Services account making the
 * call.
 *
 * The first time `DescribeEndpoint` is called, an endpoint is created. All subsequent calls to `DescribeEndpoint` return the same endpoint.
 *
 * Requires permission to access the DescribeEndpoint action.
 */
export const describeEndpoint: API.OperationMethod<
  DescribeEndpointRequest,
  DescribeEndpointResponse,
  DescribeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /endpoint",
    input: { endpointType: D.m({ query: "endpointType" }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoint",
})) as any;

export type DescribeEventConfigurationsError =
  | InternalFailureException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes event configurations.
 *
 * Requires permission to access the DescribeEventConfigurations action.
 */
export const describeEventConfigurations: API.OperationMethod<
  DescribeEventConfigurationsRequest,
  DescribeEventConfigurationsResponse,
  DescribeEventConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /event-configurations",
    input: {},
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventConfigurations",
})) as any;

export type DescribeFleetMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified fleet metric.
 *
 * Requires permission to access the DescribeFleetMetric action.
 */
export const describeFleetMetric: API.OperationMethod<
  DescribeFleetMetricRequest,
  DescribeFleetMetricResponse,
  DescribeFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /fleet-metric/{metricName}",
    input: { metricName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetMetric",
})) as any;

export type DescribeIndexError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a search index.
 *
 * Requires permission to access the DescribeIndex action.
 */
export const describeIndex: API.OperationMethod<
  DescribeIndexRequest,
  DescribeIndexResponse,
  DescribeIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /indices/{indexName}",
    input: { indexName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIndex",
})) as any;

export type DescribeJobError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a job.
 *
 * Requires permission to access the DescribeJob action.
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResponse,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{jobId}",
    input: {
      jobId: 0,
      beforeSubstitution: D.m({ query: "beforeSubstitution" }),
    },
    output: {
      job: { createdAt: D.ts, lastUpdatedAt: D.ts, completedAt: D.ts },
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
})) as any;

export type DescribeJobExecutionError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a job execution.
 *
 * Requires permission to access the DescribeJobExecution action.
 */
export const describeJobExecution: API.OperationMethod<
  DescribeJobExecutionRequest,
  DescribeJobExecutionResponse,
  DescribeJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/jobs/{jobId}",
    input: {
      jobId: 0,
      thingName: 0,
      executionNumber: D.m({ query: "executionNumber" }),
    },
    output: {
      execution: { queuedAt: D.ts, startedAt: D.ts, lastUpdatedAt: D.ts },
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobExecution",
})) as any;

export type DescribeJobTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about a job template.
 */
export const describeJobTemplate: API.OperationMethod<
  DescribeJobTemplateRequest,
  DescribeJobTemplateResponse,
  DescribeJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /job-templates/{jobTemplateId}",
    input: { jobTemplateId: 0 },
    output: { createdAt: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobTemplate",
})) as any;

export type DescribeManagedJobTemplateError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * View details of a managed job template.
 */
export const describeManagedJobTemplate: API.OperationMethod<
  DescribeManagedJobTemplateRequest,
  DescribeManagedJobTemplateResponse,
  DescribeManagedJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-job-templates/{templateName}",
    input: {
      templateName: 0,
      templateVersion: D.m({ query: "templateVersion" }),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedJobTemplate",
})) as any;

export type DescribeMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a mitigation action.
 *
 * Requires permission to access the DescribeMitigationAction action.
 */
export const describeMitigationAction: API.OperationMethod<
  DescribeMitigationActionRequest,
  DescribeMitigationActionResponse,
  DescribeMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /mitigationactions/actions/{actionName}",
    input: { actionName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMitigationAction",
})) as any;

export type DescribeProvisioningTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a provisioning template.
 *
 * Requires permission to access the DescribeProvisioningTemplate action.
 */
export const describeProvisioningTemplate: API.OperationMethod<
  DescribeProvisioningTemplateRequest,
  DescribeProvisioningTemplateResponse,
  DescribeProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /provisioning-templates/{templateName}",
    input: { templateName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningTemplate",
})) as any;

export type DescribeProvisioningTemplateVersionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a provisioning template version.
 *
 * Requires permission to access the DescribeProvisioningTemplateVersion action.
 */
export const describeProvisioningTemplateVersion: API.OperationMethod<
  DescribeProvisioningTemplateVersionRequest,
  DescribeProvisioningTemplateVersionResponse,
  DescribeProvisioningTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /provisioning-templates/{templateName}/versions/{versionId}",
    input: { templateName: 0, versionId: 0 },
    output: { creationDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningTemplateVersion",
})) as any;

export type DescribeRoleAliasError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a role alias.
 *
 * Requires permission to access the DescribeRoleAlias action.
 */
export const describeRoleAlias: API.OperationMethod<
  DescribeRoleAliasRequest,
  DescribeRoleAliasResponse,
  DescribeRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /role-aliases/{roleAlias}",
    input: { roleAlias: 0 },
    output: {
      roleAliasDescription: { creationDate: D.ts, lastModifiedDate: D.ts },
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRoleAlias",
})) as any;

export type DescribeScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a scheduled audit.
 *
 * Requires permission to access the DescribeScheduledAudit action.
 */
export const describeScheduledAudit: API.OperationMethod<
  DescribeScheduledAuditRequest,
  DescribeScheduledAuditResponse,
  DescribeScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/scheduledaudits/{scheduledAuditName}",
    input: { scheduledAuditName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledAudit",
})) as any;

export type DescribeSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Gets information about a Device Defender security profile.
 *
 * Requires permission to access the DescribeSecurityProfile action.
 */
export const describeSecurityProfile: API.OperationMethod<
  DescribeSecurityProfileRequest,
  DescribeSecurityProfileResponse,
  DescribeSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles/{securityProfileName}",
    input: { securityProfileName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityProfile",
})) as any;

export type DescribeStreamError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a stream.
 *
 * Requires permission to access the DescribeStream action.
 */
export const describeStream: API.OperationMethod<
  DescribeStreamRequest,
  DescribeStreamResponse,
  DescribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /streams/{streamId}",
    input: { streamId: 0 },
    output: { streamInfo: { createdAt: D.ts, lastUpdatedAt: D.ts } },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
})) as any;

export type DescribeThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified thing.
 *
 * Requires permission to access the DescribeThing action.
 */
export const describeThing: API.OperationMethod<
  DescribeThingRequest,
  DescribeThingResponse,
  DescribeThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}",
    input: { thingName: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThing",
})) as any;

export type DescribeThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describe a thing group.
 *
 * Requires permission to access the DescribeThingGroup action.
 */
export const describeThingGroup: API.OperationMethod<
  DescribeThingGroupRequest,
  DescribeThingGroupResponse,
  DescribeThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-groups/{thingGroupName}",
    input: { thingGroupName: 0 },
    output: { thingGroupMetadata: { creationDate: D.ts } },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingGroup",
})) as any;

export type DescribeThingRegistrationTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a bulk thing provisioning task.
 *
 * Requires permission to access the DescribeThingRegistrationTask action.
 */
export const describeThingRegistrationTask: API.OperationMethod<
  DescribeThingRegistrationTaskRequest,
  DescribeThingRegistrationTaskResponse,
  DescribeThingRegistrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-registration-tasks/{taskId}",
    input: { taskId: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingRegistrationTask",
})) as any;

export type DescribeThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified thing type.
 *
 * Requires permission to access the DescribeThingType action.
 */
export const describeThingType: API.OperationMethod<
  DescribeThingTypeRequest,
  DescribeThingTypeResponse,
  DescribeThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-types/{thingTypeName}",
    input: { thingTypeName: 0 },
    output: { thingTypeMetadata: o_ThingTypeMetadata },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingType",
})) as any;

export type DetachPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Detaches a policy from the specified target.
 *
 * Because of the distributed nature of Amazon Web Services, it can take up to five minutes after
 * a policy is detached before it's ready to be deleted.
 *
 * Requires permission to access the DetachPolicy action.
 */
export const detachPolicy: API.OperationMethod<
  DetachPolicyRequest,
  DetachPolicyResponse,
  DetachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /target-policies/{policyName}",
    input: { policyName: 0, target: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPolicy",
})) as any;

export type DetachPrincipalPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes the specified policy from the specified certificate.
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use DetachPolicy instead.
 *
 * Requires permission to access the DetachPrincipalPolicy action.
 */
export const detachPrincipalPolicy: API.OperationMethod<
  DetachPrincipalPolicyRequest,
  DetachPrincipalPolicyResponse,
  DetachPrincipalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /principal-policies/{policyName}",
    input: {
      policyName: 0,
      principal: D.m({ header: "x-amzn-iot-principal" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPrincipalPolicy",
})) as any;

export type DetachSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Disassociates a Device Defender security profile from a thing group or from this account.
 *
 * Requires permission to access the DetachSecurityProfile action.
 */
export const detachSecurityProfile: API.OperationMethod<
  DetachSecurityProfileRequest,
  DetachSecurityProfileResponse,
  DetachSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /security-profiles/{securityProfileName}/targets",
    input: {
      securityProfileName: 0,
      securityProfileTargetArn: D.m({ query: "securityProfileTargetArn" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachSecurityProfile",
})) as any;

export type DetachThingPrincipalError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Detaches the specified principal from the specified thing. A principal can be X.509
 * certificates, IAM users, groups, and roles, Amazon Cognito identities or federated
 * identities.
 *
 * This call is asynchronous. It might take several seconds for the detachment to
 * propagate.
 *
 * Requires permission to access the DetachThingPrincipal action.
 */
export const detachThingPrincipal: API.OperationMethod<
  DetachThingPrincipalRequest,
  DetachThingPrincipalResponse,
  DetachThingPrincipalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /things/{thingName}/principals",
    input: { thingName: 0, principal: D.m({ header: "x-amzn-principal" }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachThingPrincipal",
})) as any;

export type DisableTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disables the rule.
 *
 * Requires permission to access the DisableTopicRule action.
 */
export const disableTopicRule: API.OperationMethod<
  DisableTopicRuleRequest,
  DisableTopicRuleResponse,
  DisableTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /rules/{ruleName}/disable",
    input: { ruleName: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableTopicRule",
})) as any;

export type DisassociateSbomFromPackageVersionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the selected software bill of materials (SBOM) from a specific software package version.
 *
 * Requires permission to access the DisassociateSbomWithPackageVersion action.
 */
export const disassociateSbomFromPackageVersion: API.OperationMethod<
  DisassociateSbomFromPackageVersionRequest,
  DisassociateSbomFromPackageVersionResponse,
  DisassociateSbomFromPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /packages/{packageName}/versions/{versionName}/sbom",
    input: {
      packageName: 0,
      versionName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSbomFromPackageVersion",
})) as any;

export type EnableTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Enables the rule.
 *
 * Requires permission to access the EnableTopicRule action.
 */
export const enableTopicRule: API.OperationMethod<
  EnableTopicRuleRequest,
  EnableTopicRuleResponse,
  EnableTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /rules/{ruleName}/enable",
    input: { ruleName: 0 },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableTopicRule",
})) as any;

export type GetBehaviorModelTrainingSummariesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Returns a Device Defender's ML Detect Security Profile training model's status.
 *
 * Requires permission to access the GetBehaviorModelTrainingSummaries action.
 */
export const getBehaviorModelTrainingSummaries: API.PaginatedOperationMethod<
  GetBehaviorModelTrainingSummariesRequest,
  GetBehaviorModelTrainingSummariesResponse,
  GetBehaviorModelTrainingSummariesError,
  Credentials | HttpClient.HttpClient,
  BehaviorModelTrainingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /behavior-model-training/summaries",
    input: {
      securityProfileName: D.m({ query: "securityProfileName" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      summaries: D.list({
        trainingDataCollectionStartDate: D.ts,
        lastModelRefreshDate: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBehaviorModelTrainingSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBucketsAggregationError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Aggregates on indexed data with search queries pertaining to particular fields.
 *
 * Requires permission to access the GetBucketsAggregation action.
 */
export const getBucketsAggregation: API.OperationMethod<
  GetBucketsAggregationRequest,
  GetBucketsAggregationResponse,
  GetBucketsAggregationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /indices/buckets",
    input: {
      indexName: 0,
      queryString: 0,
      aggregationField: 0,
      queryVersion: 0,
      bucketsAggregationType: { termsAggregation: { maxBuckets: 0 } },
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketsAggregation",
})) as any;

export type GetCardinalityError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the approximate count of unique values that match the query.
 *
 * Requires permission to access the GetCardinality action.
 */
export const getCardinality: API.OperationMethod<
  GetCardinalityRequest,
  GetCardinalityResponse,
  GetCardinalityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /indices/cardinality",
    input: {
      indexName: 0,
      queryString: 0,
      aggregationField: 0,
      queryVersion: 0,
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCardinality",
})) as any;

export type GetCommandError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified command.
 */
export const getCommand: API.OperationMethod<
  GetCommandRequest,
  GetCommandResponse,
  GetCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /commands/{commandId}",
    input: { commandId: 0 },
    output: {
      mandatoryParameters: D.list({
        value: o_CommandParameterValue,
        defaultValue: o_CommandParameterValue,
      }),
      payload: { content: D.blob },
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommand",
})) as any;

export type GetCommandExecutionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specific command execution on a single device.
 */
export const getCommandExecution: API.OperationMethod<
  GetCommandExecutionRequest,
  GetCommandExecutionResponse,
  GetCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /command-executions/{executionId}",
    input: {
      executionId: 0,
      targetArn: D.m({ query: "targetArn" }),
      includeResult: D.m({ query: "includeResult" }),
    },
    output: {
      result: D.map({ BIN: D.blob }),
      parameters: D.map(o_CommandParameterValue),
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
      startedAt: D.ts,
      completedAt: D.ts,
      timeToLive: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommandExecution",
})) as any;

export type GetEffectivePoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a list of the policies that have an effect on the authorization behavior of the
 * specified device when it connects to the IoT device gateway.
 *
 * Requires permission to access the GetEffectivePolicies action.
 */
export const getEffectivePolicies: API.OperationMethod<
  GetEffectivePoliciesRequest,
  GetEffectivePoliciesResponse,
  GetEffectivePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /effective-policies",
    input: {
      principal: 0,
      cognitoIdentityPoolId: 0,
      thingName: D.m({ query: "thingName" }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectivePolicies",
})) as any;

export type GetIndexingConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the indexing configuration.
 *
 * Requires permission to access the GetIndexingConfiguration action.
 */
export const getIndexingConfiguration: API.OperationMethod<
  GetIndexingConfigurationRequest,
  GetIndexingConfigurationResponse,
  GetIndexingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /indexing/config", input: {} },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndexingConfiguration",
})) as any;

export type GetJobDocumentError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a job document.
 *
 * Requires permission to access the GetJobDocument action.
 */
export const getJobDocument: API.OperationMethod<
  GetJobDocumentRequest,
  GetJobDocumentResponse,
  GetJobDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{jobId}/job-document",
    input: {
      jobId: 0,
      beforeSubstitution: D.m({ query: "beforeSubstitution" }),
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobDocument",
})) as any;

export type GetLoggingOptionsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets the logging options.
 *
 * NOTE: use of this command is not recommended. Use `GetV2LoggingOptions`
 * instead.
 *
 * Requires permission to access the GetLoggingOptions action.
 */
export const getLoggingOptions: API.OperationMethod<
  GetLoggingOptionsRequest,
  GetLoggingOptionsResponse,
  GetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /loggingOptions", input: {} },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingOptions",
})) as any;

export type GetOTAUpdateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an OTA update.
 *
 * Requires permission to access the GetOTAUpdate action.
 */
export const getOTAUpdate: API.OperationMethod<
  GetOTAUpdateRequest,
  GetOTAUpdateResponse,
  GetOTAUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /otaUpdates/{otaUpdateId}",
    input: { otaUpdateId: 0 },
    output: {
      otaUpdateInfo: {
        creationDate: D.ts,
        lastModifiedDate: D.ts,
        otaUpdateFiles: D.list({
          codeSigning: {
            customCodeSigning: { signature: { inlineDocument: D.blob } },
          },
        }),
      },
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOTAUpdate",
})) as any;

export type GetPackageError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified software package.
 *
 * Requires permission to access the GetPackage action.
 */
export const getPackage: API.OperationMethod<
  GetPackageRequest,
  GetPackageResponse,
  GetPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /packages/{packageName}",
    input: { packageName: 0 },
    output: {
      description: D.secret,
      creationDate: D.ts,
      lastModifiedDate: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackage",
})) as any;

export type GetPackageConfigurationError =
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about the specified software package's configuration.
 *
 * Requires permission to access the GetPackageConfiguration action.
 */
export const getPackageConfiguration: API.OperationMethod<
  GetPackageConfigurationRequest,
  GetPackageConfigurationResponse,
  GetPackageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /package-configuration", input: {} },
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageConfiguration",
})) as any;

export type GetPackageVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified package version.
 *
 * Requires permission to access the GetPackageVersion action.
 */
export const getPackageVersion: API.OperationMethod<
  GetPackageVersionRequest,
  GetPackageVersionResponse,
  GetPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /packages/{packageName}/versions/{versionName}",
    input: { packageName: 0, versionName: 0 },
    output: {
      description: D.secret,
      creationDate: D.ts,
      lastModifiedDate: D.ts,
      recipe: D.secret,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageVersion",
})) as any;

export type GetPercentilesError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Groups the aggregated values that match the query into percentile groupings. The default
 * percentile groupings are: 1,5,25,50,75,95,99, although you can specify your own
 * when you call `GetPercentiles`. This function returns a value for each
 * percentile group specified (or the default percentile groupings). The percentile group
 * "1" contains the aggregated field value that occurs in approximately one percent of the
 * values that match the query. The percentile group "5" contains the aggregated field value
 * that occurs in approximately five percent of the values that match the query, and so on.
 * The result is an approximation, the more values that match the query, the more accurate
 * the percentile values.
 *
 * Requires permission to access the GetPercentiles action.
 */
export const getPercentiles: API.OperationMethod<
  GetPercentilesRequest,
  GetPercentilesResponse,
  GetPercentilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /indices/percentiles",
    input: {
      indexName: 0,
      queryString: 0,
      aggregationField: 0,
      queryVersion: 0,
      percents: 0,
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPercentiles",
})) as any;

export type GetPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified policy with the policy document of the default
 * version.
 *
 * Requires permission to access the GetPolicy action.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policies/{policyName}",
    input: { policyName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetPolicyVersionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified policy version.
 *
 * Requires permission to access the GetPolicyVersion action.
 */
export const getPolicyVersion: API.OperationMethod<
  GetPolicyVersionRequest,
  GetPolicyVersionResponse,
  GetPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policies/{policyName}/version/{policyVersionId}",
    input: { policyName: 0, policyVersionId: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyVersion",
})) as any;

export type GetRegistrationCodeError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a registration code used to register a CA certificate with IoT.
 *
 * IoT will create a registration code as part of this API call if the registration
 * code doesn't exist or has been deleted. If you already have a registration code, this API
 * call will return the same registration code.
 *
 * Requires permission to access the GetRegistrationCode action.
 */
export const getRegistrationCode: API.OperationMethod<
  GetRegistrationCodeRequest,
  GetRegistrationCodeResponse,
  GetRegistrationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /registrationcode", input: {} },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistrationCode",
})) as any;

export type GetStatisticsError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the count, average, sum, minimum, maximum, sum of squares, variance,
 * and standard deviation for the specified aggregated field. If the aggregation field is of type
 * `String`, only the count statistic is returned.
 *
 * Requires permission to access the GetStatistics action.
 */
export const getStatistics: API.OperationMethod<
  GetStatisticsRequest,
  GetStatisticsResponse,
  GetStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /indices/statistics",
    input: {
      indexName: 0,
      queryString: 0,
      aggregationField: 0,
      queryVersion: 0,
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatistics",
})) as any;

export type GetThingConnectivityDataError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the live connectivity status per device. If a device has never connected to IoT Core or was disconnected for more than 1 hour before fleet indexing's `thingConnectivityIndexingMode` was enabled, the response will have the `connected` field set to `false` with no additional session details.
 */
export const getThingConnectivityData: API.OperationMethod<
  GetThingConnectivityDataRequest,
  GetThingConnectivityDataResponse,
  GetThingConnectivityDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /things/{thingName}/connectivity-data",
    input: { thingName: 0, includeSocketInformation: 0 },
    output: {
      thingName: D.secret,
      timestamp: D.ts,
      sourceIp: D.secret,
      targetIp: D.secret,
      vpcEndpointId: D.secret,
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingConnectivityData",
})) as any;

export type GetTopicRuleError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | TopicRuleNotFound
  | CommonErrors;
/**
 * Gets information about the rule.
 *
 * Requires permission to access the GetTopicRule action.
 */
export const getTopicRule: API.OperationMethod<
  GetTopicRuleRequest,
  GetTopicRuleResponse,
  GetTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /rules/{ruleName}",
    input: { ruleName: 0 },
    output: { rule: { createdAt: D.ts } },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
    TopicRuleNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopicRule",
})) as any;

export type GetTopicRuleDestinationError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a topic rule destination.
 *
 * Requires permission to access the GetTopicRuleDestination action.
 */
export const getTopicRuleDestination: API.OperationMethod<
  GetTopicRuleDestinationRequest,
  GetTopicRuleDestinationResponse,
  GetTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /destinations/{arn+}",
    input: { arn: 0 },
    output: { topicRuleDestination: o_TopicRuleDestination },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopicRuleDestination",
})) as any;

export type GetV2LoggingOptionsError =
  | InternalException
  | NotConfiguredException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets the fine grained logging options.
 *
 * Requires permission to access the GetV2LoggingOptions action.
 */
export const getV2LoggingOptions: API.OperationMethod<
  GetV2LoggingOptionsRequest,
  GetV2LoggingOptionsResponse,
  GetV2LoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2LoggingOptions",
    input: { verbose: D.m({ query: "verbose" }) },
  },
  errors: [
    InternalException,
    NotConfiguredException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetV2LoggingOptions",
})) as any;

export type ListActiveViolationsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the active violations for a given Device Defender security profile.
 *
 * Requires permission to access the ListActiveViolations action.
 */
export const listActiveViolations: API.PaginatedOperationMethod<
  ListActiveViolationsRequest,
  ListActiveViolationsResponse,
  ListActiveViolationsError,
  Credentials | HttpClient.HttpClient,
  ActiveViolation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /active-violations",
    input: {
      thingName: D.m({ query: "thingName" }),
      securityProfileName: D.m({ query: "securityProfileName" }),
      behaviorCriteriaType: D.m({ query: "behaviorCriteriaType" }),
      listSuppressedAlerts: D.m({ query: "listSuppressedAlerts" }),
      verificationState: D.m({ query: "verificationState" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      activeViolations: D.list({
        lastViolationTime: D.ts,
        violationStartTime: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActiveViolations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activeViolations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttachedPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the policies attached to the specified thing group.
 *
 * Requires permission to access the ListAttachedPolicies action.
 */
export const listAttachedPolicies: API.PaginatedOperationMethod<
  ListAttachedPoliciesRequest,
  ListAttachedPoliciesResponse,
  ListAttachedPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /attached-policies/{target}",
    input: {
      target: 0,
      recursive: D.m({ query: "recursive" }),
      marker: D.m({ query: "marker" }),
      pageSize: D.m({ query: "pageSize" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedPolicies",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "policies",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListAuditFindingsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the findings (results) of a Device Defender audit or of the audits
 * performed during a specified time period. (Findings are retained for 90 days.)
 *
 * Requires permission to access the ListAuditFindings action.
 */
export const listAuditFindings: API.PaginatedOperationMethod<
  ListAuditFindingsRequest,
  ListAuditFindingsResponse,
  ListAuditFindingsError,
  Credentials | HttpClient.HttpClient,
  AuditFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/findings",
    input: {
      taskId: 0,
      checkName: 0,
      resourceIdentifier: i_ResourceIdentifier,
      maxResults: 0,
      nextToken: 0,
      startTime: 0,
      endTime: 0,
      listSuppressedFindings: 0,
    },
    output: { findings: D.list(o_AuditFinding) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditMitigationActionsExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the status of audit mitigation action tasks that were
 * executed.
 *
 * Requires permission to access the ListAuditMitigationActionsExecutions action.
 */
export const listAuditMitigationActionsExecutions: API.PaginatedOperationMethod<
  ListAuditMitigationActionsExecutionsRequest,
  ListAuditMitigationActionsExecutionsResponse,
  ListAuditMitigationActionsExecutionsError,
  Credentials | HttpClient.HttpClient,
  AuditMitigationActionExecutionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/mitigationactions/executions",
    input: {
      taskId: D.m({ query: "taskId" }),
      actionStatus: D.m({ query: "actionStatus" }),
      findingId: D.m({ query: "findingId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { actionsExecutions: D.list({ startTime: D.ts, endTime: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditMitigationActionsExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionsExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditMitigationActionsTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of audit mitigation action tasks that match the specified filters.
 *
 * Requires permission to access the ListAuditMitigationActionsTasks action.
 */
export const listAuditMitigationActionsTasks: API.PaginatedOperationMethod<
  ListAuditMitigationActionsTasksRequest,
  ListAuditMitigationActionsTasksResponse,
  ListAuditMitigationActionsTasksError,
  Credentials | HttpClient.HttpClient,
  AuditMitigationActionsTaskMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/mitigationactions/tasks",
    input: {
      auditTaskId: D.m({ query: "auditTaskId" }),
      findingId: D.m({ query: "findingId" }),
      taskStatus: D.m({ query: "taskStatus" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
    },
    output: { tasks: D.list({ startTime: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditMitigationActionsTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditSuppressionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists your Device Defender audit listings.
 *
 * Requires permission to access the ListAuditSuppressions action.
 */
export const listAuditSuppressions: API.PaginatedOperationMethod<
  ListAuditSuppressionsRequest,
  ListAuditSuppressionsResponse,
  ListAuditSuppressionsError,
  Credentials | HttpClient.HttpClient,
  AuditSuppression
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/suppressions/list",
    input: {
      checkName: 0,
      resourceIdentifier: i_ResourceIdentifier,
      ascendingOrder: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { suppressions: D.list({ expirationDate: D.ts }) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditSuppressions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "suppressions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the Device Defender audits that have been performed during a given
 * time period.
 *
 * Requires permission to access the ListAuditTasks action.
 */
export const listAuditTasks: API.PaginatedOperationMethod<
  ListAuditTasksRequest,
  ListAuditTasksResponse,
  ListAuditTasksError,
  Credentials | HttpClient.HttpClient,
  AuditTaskMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/tasks",
    input: {
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      taskType: D.m({ query: "taskType" }),
      taskStatus: D.m({ query: "taskStatus" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuthorizersError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the authorizers registered in your account.
 *
 * Requires permission to access the ListAuthorizers action.
 */
export const listAuthorizers: API.PaginatedOperationMethod<
  ListAuthorizersRequest,
  ListAuthorizersResponse,
  ListAuthorizersError,
  Credentials | HttpClient.HttpClient,
  AuthorizerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /authorizers",
    input: {
      pageSize: D.m({ query: "pageSize" }),
      marker: D.m({ query: "marker" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
      status: D.m({ query: "status" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuthorizers",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "authorizers",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListBillingGroupsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the billing groups you have created.
 *
 * Requires permission to access the ListBillingGroups action.
 */
export const listBillingGroups: API.PaginatedOperationMethod<
  ListBillingGroupsRequest,
  ListBillingGroupsResponse,
  ListBillingGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /billing-groups",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      namePrefixFilter: D.m({ query: "namePrefixFilter" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "billingGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCACertificatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the CA certificates registered for your Amazon Web Services account.
 *
 * The results are paginated with a default page size of 25. You can use the returned
 * marker to retrieve additional results.
 *
 * Requires permission to access the ListCACertificates action.
 */
export const listCACertificates: API.PaginatedOperationMethod<
  ListCACertificatesRequest,
  ListCACertificatesResponse,
  ListCACertificatesError,
  Credentials | HttpClient.HttpClient,
  CACertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /cacertificates",
    input: {
      pageSize: D.m({ query: "pageSize" }),
      marker: D.m({ query: "marker" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
      templateName: D.m({ query: "templateName" }),
    },
    output: { certificates: D.list({ creationDate: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCACertificates",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "certificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListCertificateProvidersError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all your certificate providers in your Amazon Web Services account.
 *
 * Requires permission to access the ListCertificateProviders action.
 */
export const listCertificateProviders: API.OperationMethod<
  ListCertificateProvidersRequest,
  ListCertificateProvidersResponse,
  ListCertificateProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /certificate-providers",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateProviders",
})) as any;

export type ListCertificatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the certificates registered in your Amazon Web Services account.
 *
 * The results are paginated with a default page size of 25. You can use the returned
 * marker to retrieve additional results.
 *
 * Requires permission to access the ListCertificates action.
 */
export const listCertificates: API.PaginatedOperationMethod<
  ListCertificatesRequest,
  ListCertificatesResponse,
  ListCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /certificates",
    input: {
      pageSize: D.m({ query: "pageSize" }),
      marker: D.m({ query: "marker" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
    output: { certificates: D.list(o_Certificate) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificates",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "certificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListCertificatesByCAError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the device certificates signed by the specified CA certificate.
 *
 * Requires permission to access the ListCertificatesByCA action.
 */
export const listCertificatesByCA: API.PaginatedOperationMethod<
  ListCertificatesByCARequest,
  ListCertificatesByCAResponse,
  ListCertificatesByCAError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /certificates-by-ca/{caCertificateId}",
    input: {
      caCertificateId: 0,
      pageSize: D.m({ query: "pageSize" }),
      marker: D.m({ query: "marker" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
    output: { certificates: D.list(o_Certificate) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificatesByCA",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "certificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListCommandExecutionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all command executions.
 *
 * - You must provide only the `startedTimeFilter` or
 * the `completedTimeFilter` information. If you provide
 * both time filters, the API will generate an error. You can use
 * this information to retrieve a list of command executions
 * within a specific timeframe.
 *
 * - You must provide only the `commandArn` or
 * the `thingArn` information depending on whether you want
 * to list executions for a specific command or an IoT thing. If you provide
 * both fields, the API will generate an error.
 *
 * For more information about considerations for using this API, see
 * List
 * command executions in your account (CLI).
 */
export const listCommandExecutions: API.PaginatedOperationMethod<
  ListCommandExecutionsRequest,
  ListCommandExecutionsResponse,
  ListCommandExecutionsError,
  Credentials | HttpClient.HttpClient,
  CommandExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /command-executions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      namespace: 0,
      status: 0,
      sortOrder: 0,
      startedTimeFilter: i_TimeFilter,
      completedTimeFilter: i_TimeFilter,
      targetArn: 0,
      commandArn: 0,
    },
    output: {
      commandExecutions: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        completedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommandExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "commandExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCommandsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all commands in your account.
 */
export const listCommands: API.PaginatedOperationMethod<
  ListCommandsRequest,
  ListCommandsResponse,
  ListCommandsError,
  Credentials | HttpClient.HttpClient,
  CommandSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /commands",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      namespace: D.m({ query: "namespace" }),
      commandParameterName: D.m({ query: "commandParameterName" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: { commands: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommands",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "commands",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomMetricsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists your Device Defender detect custom metrics.
 *
 * Requires permission to access the ListCustomMetrics action.
 */
export const listCustomMetrics: API.PaginatedOperationMethod<
  ListCustomMetricsRequest,
  ListCustomMetricsResponse,
  ListCustomMetricsError,
  Credentials | HttpClient.HttpClient,
  MetricName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /custom-metrics",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDetectMitigationActionsExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists mitigation actions executions for a Device Defender ML Detect Security Profile.
 *
 * Requires permission to access the ListDetectMitigationActionsExecutions action.
 */
export const listDetectMitigationActionsExecutions: API.PaginatedOperationMethod<
  ListDetectMitigationActionsExecutionsRequest,
  ListDetectMitigationActionsExecutionsResponse,
  ListDetectMitigationActionsExecutionsError,
  Credentials | HttpClient.HttpClient,
  DetectMitigationActionExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /detect/mitigationactions/executions",
    input: {
      taskId: D.m({ query: "taskId" }),
      violationId: D.m({ query: "violationId" }),
      thingName: D.m({ query: "thingName" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      actionsExecutions: D.list({
        executionStartDate: D.ts,
        executionEndDate: D.ts,
      }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectMitigationActionsExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionsExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDetectMitigationActionsTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * List of Device Defender ML Detect mitigation actions tasks.
 *
 * Requires permission to access the ListDetectMitigationActionsTasks action.
 */
export const listDetectMitigationActionsTasks: API.PaginatedOperationMethod<
  ListDetectMitigationActionsTasksRequest,
  ListDetectMitigationActionsTasksResponse,
  ListDetectMitigationActionsTasksError,
  Credentials | HttpClient.HttpClient,
  DetectMitigationActionsTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /detect/mitigationactions/tasks",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
    },
    output: { tasks: D.list(o_DetectMitigationActionsTaskSummary) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectMitigationActionsTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDimensionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * List the set of dimensions that are defined for your Amazon Web Services accounts.
 *
 * Requires permission to access the ListDimensions action.
 */
export const listDimensions: API.PaginatedOperationMethod<
  ListDimensionsRequest,
  ListDimensionsResponse,
  ListDimensionsError,
  Credentials | HttpClient.HttpClient,
  DimensionName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /dimensions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDimensions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dimensionNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainConfigurationsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a list of domain configurations for the user. This list is sorted
 * alphabetically by domain configuration name.
 *
 * Requires permission to access the ListDomainConfigurations action.
 */
export const listDomainConfigurations: API.PaginatedOperationMethod<
  ListDomainConfigurationsRequest,
  ListDomainConfigurationsResponse,
  ListDomainConfigurationsError,
  Credentials | HttpClient.HttpClient,
  DomainConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domainConfigurations",
    input: {
      marker: D.m({ query: "marker" }),
      pageSize: D.m({ query: "pageSize" }),
      serviceType: D.m({ query: "serviceType" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainConfigurations",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "domainConfigurations",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListFleetMetricsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all your fleet metrics.
 *
 * Requires permission to access the ListFleetMetrics action.
 */
export const listFleetMetrics: API.PaginatedOperationMethod<
  ListFleetMetricsRequest,
  ListFleetMetricsResponse,
  ListFleetMetricsError,
  Credentials | HttpClient.HttpClient,
  FleetMetricNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /fleet-metrics",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleetMetrics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIndicesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the search indices.
 *
 * Requires permission to access the ListIndices action.
 */
export const listIndices: API.PaginatedOperationMethod<
  ListIndicesRequest,
  ListIndicesResponse,
  ListIndicesError,
  Credentials | HttpClient.HttpClient,
  IndexName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /indices",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "indexNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobExecutionsForJobError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the job executions for a job.
 *
 * Requires permission to access the ListJobExecutionsForJob action.
 */
export const listJobExecutionsForJob: API.PaginatedOperationMethod<
  ListJobExecutionsForJobRequest,
  ListJobExecutionsForJobResponse,
  ListJobExecutionsForJobError,
  Credentials | HttpClient.HttpClient,
  JobExecutionSummaryForJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{jobId}/things",
    input: {
      jobId: 0,
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      executionSummaries: D.list({
        jobExecutionSummary: o_JobExecutionSummary,
      }),
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobExecutionsForJob",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobExecutionsForThingError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the job executions for the specified thing.
 *
 * Requires permission to access the ListJobExecutionsForThing action.
 */
export const listJobExecutionsForThing: API.PaginatedOperationMethod<
  ListJobExecutionsForThingRequest,
  ListJobExecutionsForThingResponse,
  ListJobExecutionsForThingError,
  Credentials | HttpClient.HttpClient,
  JobExecutionSummaryForThing
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/jobs",
    input: {
      thingName: 0,
      status: D.m({ query: "status" }),
      namespaceId: D.m({ query: "namespaceId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      jobId: D.m({ query: "jobId" }),
    },
    output: {
      executionSummaries: D.list({
        jobExecutionSummary: o_JobExecutionSummary,
      }),
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobExecutionsForThing",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists jobs.
 *
 * Requires permission to access the ListJobs action.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs",
    input: {
      status: D.m({ query: "status" }),
      targetSelection: D.m({ query: "targetSelection" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      thingGroupName: D.m({ query: "thingGroupName" }),
      thingGroupId: D.m({ query: "thingGroupId" }),
      namespaceId: D.m({ query: "namespaceId" }),
    },
    output: {
      jobs: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts, completedAt: D.ts }),
    },
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobTemplatesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of job templates.
 *
 * Requires permission to access the ListJobTemplates action.
 */
export const listJobTemplates: API.PaginatedOperationMethod<
  ListJobTemplatesRequest,
  ListJobTemplatesResponse,
  ListJobTemplatesError,
  Credentials | HttpClient.HttpClient,
  JobTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /job-templates",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { jobTemplates: D.list({ createdAt: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedJobTemplatesError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of managed job templates.
 */
export const listManagedJobTemplates: API.PaginatedOperationMethod<
  ListManagedJobTemplatesRequest,
  ListManagedJobTemplatesResponse,
  ListManagedJobTemplatesError,
  Credentials | HttpClient.HttpClient,
  ManagedJobTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-job-templates",
    input: {
      templateName: D.m({ query: "templateName" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedJobTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedJobTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricValuesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the values reported for an IoT Device Defender metric (device-side metric, cloud-side metric, or custom metric)
 * by the given thing during the specified time period.
 */
export const listMetricValues: API.PaginatedOperationMethod<
  ListMetricValuesRequest,
  ListMetricValuesResponse,
  ListMetricValuesError,
  Credentials | HttpClient.HttpClient,
  MetricDatum
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /metric-values",
    input: {
      thingName: D.m({ query: "thingName" }),
      metricName: D.m({ query: "metricName" }),
      dimensionName: D.m({ query: "dimensionName" }),
      dimensionValueOperator: D.m({ query: "dimensionValueOperator" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { metricDatumList: D.list({ timestamp: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricValues",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricDatumList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMitigationActionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of all mitigation actions that match the specified filter criteria.
 *
 * Requires permission to access the ListMitigationActions action.
 */
export const listMitigationActions: API.PaginatedOperationMethod<
  ListMitigationActionsRequest,
  ListMitigationActionsResponse,
  ListMitigationActionsError,
  Credentials | HttpClient.HttpClient,
  MitigationActionIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /mitigationactions/actions",
    input: {
      actionType: D.m({ query: "actionType" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { actionIdentifiers: D.list({ creationDate: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMitigationActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionIdentifiers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOTAUpdatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists OTA updates.
 *
 * Requires permission to access the ListOTAUpdates action.
 */
export const listOTAUpdates: API.PaginatedOperationMethod<
  ListOTAUpdatesRequest,
  ListOTAUpdatesResponse,
  ListOTAUpdatesError,
  Credentials | HttpClient.HttpClient,
  OTAUpdateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /otaUpdates",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      otaUpdateStatus: D.m({ query: "otaUpdateStatus" }),
    },
    output: { otaUpdates: D.list({ creationDate: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOTAUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "otaUpdates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOutgoingCertificatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists certificates that are being transferred but not yet accepted.
 *
 * Requires permission to access the ListOutgoingCertificates action.
 */
export const listOutgoingCertificates: API.PaginatedOperationMethod<
  ListOutgoingCertificatesRequest,
  ListOutgoingCertificatesResponse,
  ListOutgoingCertificatesError,
  Credentials | HttpClient.HttpClient,
  OutgoingCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /certificates-out-going",
    input: {
      pageSize: D.m({ query: "pageSize" }),
      marker: D.m({ query: "marker" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
    output: {
      outgoingCertificates: D.list({ transferDate: D.ts, creationDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutgoingCertificates",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "outgoingCertificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPackagesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the software packages associated to the account.
 *
 * Requires permission to access the ListPackages action.
 */
export const listPackages: API.PaginatedOperationMethod<
  ListPackagesRequest,
  ListPackagesResponse,
  ListPackagesError,
  Credentials | HttpClient.HttpClient,
  PackageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /packages",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      packageSummaries: D.list({ creationDate: D.ts, lastModifiedDate: D.ts }),
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageVersionsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the software package versions associated to the account.
 *
 * Requires permission to access the ListPackageVersions action.
 */
export const listPackageVersions: API.PaginatedOperationMethod<
  ListPackageVersionsRequest,
  ListPackageVersionsResponse,
  ListPackageVersionsError,
  Credentials | HttpClient.HttpClient,
  PackageVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /packages/{packageName}/versions",
    input: {
      packageName: 0,
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      packageVersionSummaries: D.list({
        creationDate: D.ts,
        lastModifiedDate: D.ts,
      }),
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists your policies.
 *
 * Requires permission to access the ListPolicies action.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policies",
    input: {
      marker: D.m({ query: "marker" }),
      pageSize: D.m({ query: "pageSize" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "policies",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPolicyPrincipalsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the principals associated with the specified policy.
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use ListTargetsForPolicy instead.
 *
 * Requires permission to access the ListPolicyPrincipals action.
 */
export const listPolicyPrincipals: API.PaginatedOperationMethod<
  ListPolicyPrincipalsRequest,
  ListPolicyPrincipalsResponse,
  ListPolicyPrincipalsError,
  Credentials | HttpClient.HttpClient,
  PrincipalArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-principals",
    input: {
      policyName: D.m({ header: "x-amzn-iot-policy" }),
      marker: D.m({ query: "marker" }),
      pageSize: D.m({ query: "pageSize" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyPrincipals",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "principals",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPolicyVersionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the versions of the specified policy and identifies the default
 * version.
 *
 * Requires permission to access the ListPolicyVersions action.
 */
export const listPolicyVersions: API.OperationMethod<
  ListPolicyVersionsRequest,
  ListPolicyVersionsResponse,
  ListPolicyVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policies/{policyName}/version",
    input: { policyName: 0 },
    output: { policyVersions: D.list({ createDate: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyVersions",
})) as any;

export type ListPrincipalPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the policies attached to the specified principal. If you use an Cognito
 * identity, the ID must be in AmazonCognito Identity format.
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use ListAttachedPolicies instead.
 *
 * Requires permission to access the ListPrincipalPolicies action.
 */
export const listPrincipalPolicies: API.PaginatedOperationMethod<
  ListPrincipalPoliciesRequest,
  ListPrincipalPoliciesResponse,
  ListPrincipalPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /principal-policies",
    input: {
      principal: D.m({ header: "x-amzn-iot-principal" }),
      marker: D.m({ query: "marker" }),
      pageSize: D.m({ query: "pageSize" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalPolicies",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "policies",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPrincipalThingsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the things associated with the specified principal. A principal can be X.509
 * certificates, IAM users, groups, and roles, Amazon Cognito identities or federated
 * identities.
 *
 * Requires permission to access the ListPrincipalThings action.
 */
export const listPrincipalThings: API.PaginatedOperationMethod<
  ListPrincipalThingsRequest,
  ListPrincipalThingsResponse,
  ListPrincipalThingsError,
  Credentials | HttpClient.HttpClient,
  ThingName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /principals/things",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      principal: D.m({ header: "x-amzn-principal" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalThings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrincipalThingsV2Error =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the things associated with the specified principal. A principal can be an X.509
 * certificate or an Amazon Cognito ID.
 *
 * Requires permission to access the ListPrincipalThings action.
 */
export const listPrincipalThingsV2: API.PaginatedOperationMethod<
  ListPrincipalThingsV2Request,
  ListPrincipalThingsV2Response,
  ListPrincipalThingsV2Error,
  Credentials | HttpClient.HttpClient,
  PrincipalThingObject
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /principals/things-v2",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      principal: D.m({ header: "x-amzn-principal" }),
      thingPrincipalType: D.m({ query: "thingPrincipalType" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalThingsV2",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "principalThingObjects",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProvisioningTemplatesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the provisioning templates in your Amazon Web Services account.
 *
 * Requires permission to access the ListProvisioningTemplates action.
 */
export const listProvisioningTemplates: API.PaginatedOperationMethod<
  ListProvisioningTemplatesRequest,
  ListProvisioningTemplatesResponse,
  ListProvisioningTemplatesError,
  Credentials | HttpClient.HttpClient,
  ProvisioningTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /provisioning-templates",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      templates: D.list({ creationDate: D.ts, lastModifiedDate: D.ts }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProvisioningTemplateVersionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * A list of provisioning template versions.
 *
 * Requires permission to access the ListProvisioningTemplateVersions action.
 */
export const listProvisioningTemplateVersions: API.PaginatedOperationMethod<
  ListProvisioningTemplateVersionsRequest,
  ListProvisioningTemplateVersionsResponse,
  ListProvisioningTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  ProvisioningTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /provisioning-templates/{templateName}/versions",
    input: {
      templateName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { versions: D.list({ creationDate: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRelatedResourcesForAuditFindingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The related resources of an Audit finding.
 * The following resources can be returned from calling this API:
 *
 * - DEVICE_CERTIFICATE
 *
 * - CA_CERTIFICATE
 *
 * - IOT_POLICY
 *
 * - COGNITO_IDENTITY_POOL
 *
 * - CLIENT_ID
 *
 * - ACCOUNT_SETTINGS
 *
 * - ROLE_ALIAS
 *
 * - IAM_ROLE
 *
 * - ISSUER_CERTIFICATE
 *
 * This API is similar to DescribeAuditFinding's RelatedResources
 * but provides pagination and is not limited to 10 resources.
 * When calling DescribeAuditFinding for the intermediate CA revoked for
 * active device certificates check, RelatedResources will not be populated. You must use this API, ListRelatedResourcesForAuditFinding, to list the certificates.
 */
export const listRelatedResourcesForAuditFinding: API.PaginatedOperationMethod<
  ListRelatedResourcesForAuditFindingRequest,
  ListRelatedResourcesForAuditFindingResponse,
  ListRelatedResourcesForAuditFindingError,
  Credentials | HttpClient.HttpClient,
  RelatedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/relatedResources",
    input: {
      findingId: D.m({ query: "findingId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelatedResourcesForAuditFinding",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relatedResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoleAliasesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the role aliases registered in your account.
 *
 * Requires permission to access the ListRoleAliases action.
 */
export const listRoleAliases: API.PaginatedOperationMethod<
  ListRoleAliasesRequest,
  ListRoleAliasesResponse,
  ListRoleAliasesError,
  Credentials | HttpClient.HttpClient,
  RoleAlias
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /role-aliases",
    input: {
      pageSize: D.m({ query: "pageSize" }),
      marker: D.m({ query: "marker" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoleAliases",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "roleAliases",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListSbomValidationResultsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The validation results for all software bill of materials (SBOM) attached to a specific software package version.
 *
 * Requires permission to access the ListSbomValidationResults action.
 */
export const listSbomValidationResults: API.PaginatedOperationMethod<
  ListSbomValidationResultsRequest,
  ListSbomValidationResultsResponse,
  ListSbomValidationResultsError,
  Credentials | HttpClient.HttpClient,
  SbomValidationResultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /packages/{packageName}/versions/{versionName}/sbom-validation-results",
    input: {
      packageName: 0,
      versionName: 0,
      validationResult: D.m({ query: "validationResult" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSbomValidationResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "validationResultSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScheduledAuditsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of your scheduled audits.
 *
 * Requires permission to access the ListScheduledAudits action.
 */
export const listScheduledAudits: API.PaginatedOperationMethod<
  ListScheduledAuditsRequest,
  ListScheduledAuditsResponse,
  ListScheduledAuditsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAuditMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /audit/scheduledaudits",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledAudits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduledAudits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityProfilesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the Device Defender security profiles
 * you've
 * created. You can filter security profiles by dimension or custom metric.
 *
 * Requires permission to access the ListSecurityProfiles action.
 *
 * `dimensionName` and `metricName` cannot be used in the same request.
 */
export const listSecurityProfiles: API.PaginatedOperationMethod<
  ListSecurityProfilesRequest,
  ListSecurityProfilesResponse,
  ListSecurityProfilesError,
  Credentials | HttpClient.HttpClient,
  SecurityProfileIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      dimensionName: D.m({ query: "dimensionName" }),
      metricName: D.m({ query: "metricName" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityProfileIdentifiers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityProfilesForTargetError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the Device Defender security profiles attached to a target (thing group).
 *
 * Requires permission to access the ListSecurityProfilesForTarget action.
 */
export const listSecurityProfilesForTarget: API.PaginatedOperationMethod<
  ListSecurityProfilesForTargetRequest,
  ListSecurityProfilesForTargetResponse,
  ListSecurityProfilesForTargetError,
  Credentials | HttpClient.HttpClient,
  SecurityProfileTargetMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles-for-target",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      recursive: D.m({ query: "recursive" }),
      securityProfileTargetArn: D.m({ query: "securityProfileTargetArn" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfilesForTarget",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityProfileTargetMappings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all of the streams in your Amazon Web Services account.
 *
 * Requires permission to access the ListStreams action.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  StreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /streams",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      ascendingOrder: D.m({ query: "isAscendingOrder" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "streams",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags (metadata) you have assigned to the resource.
 *
 * Requires permission to access the ListTagsForResource action.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
  } as const,
})) as any;

export type ListTargetsForPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * List targets for the specified policy.
 *
 * Requires permission to access the ListTargetsForPolicy action.
 */
export const listTargetsForPolicy: API.PaginatedOperationMethod<
  ListTargetsForPolicyRequest,
  ListTargetsForPolicyResponse,
  ListTargetsForPolicyError,
  Credentials | HttpClient.HttpClient,
  PolicyTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy-targets/{policyName}",
    input: {
      policyName: 0,
      marker: D.m({ query: "marker" }),
      pageSize: D.m({ query: "pageSize" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsForPolicy",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "targets",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListTargetsForSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the targets (thing groups) associated with a given Device Defender security profile.
 *
 * Requires permission to access the ListTargetsForSecurityProfile action.
 */
export const listTargetsForSecurityProfile: API.PaginatedOperationMethod<
  ListTargetsForSecurityProfileRequest,
  ListTargetsForSecurityProfileResponse,
  ListTargetsForSecurityProfileError,
  Credentials | HttpClient.HttpClient,
  SecurityProfileTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /security-profiles/{securityProfileName}/targets",
    input: {
      securityProfileName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsForSecurityProfile",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityProfileTargets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingGroupsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the thing groups in your account.
 *
 * Requires permission to access the ListThingGroups action.
 */
export const listThingGroups: API.PaginatedOperationMethod<
  ListThingGroupsRequest,
  ListThingGroupsResponse,
  ListThingGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-groups",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      parentGroup: D.m({ query: "parentGroup" }),
      namePrefixFilter: D.m({ query: "namePrefixFilter" }),
      recursive: D.m({ query: "recursive" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingGroupsForThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the thing groups to which the specified thing belongs.
 *
 * Requires permission to access the ListThingGroupsForThing action.
 */
export const listThingGroupsForThing: API.PaginatedOperationMethod<
  ListThingGroupsForThingRequest,
  ListThingGroupsForThingResponse,
  ListThingGroupsForThingError,
  Credentials | HttpClient.HttpClient,
  GroupNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/thing-groups",
    input: {
      thingName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingGroupsForThing",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingPrincipalsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the principals associated with the specified thing. A principal can be X.509
 * certificates, IAM users, groups, and roles, Amazon Cognito identities or federated
 * identities.
 *
 * Requires permission to access the ListThingPrincipals action.
 */
export const listThingPrincipals: API.PaginatedOperationMethod<
  ListThingPrincipalsRequest,
  ListThingPrincipalsResponse,
  ListThingPrincipalsError,
  Credentials | HttpClient.HttpClient,
  PrincipalArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/principals",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      thingName: 0,
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingPrincipals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "principals",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingPrincipalsV2Error =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the principals associated with the specified thing. A principal can be an X.509
 * certificate or an Amazon Cognito ID.
 *
 * Requires permission to access the ListThingPrincipals action.
 */
export const listThingPrincipalsV2: API.PaginatedOperationMethod<
  ListThingPrincipalsV2Request,
  ListThingPrincipalsV2Response,
  ListThingPrincipalsV2Error,
  Credentials | HttpClient.HttpClient,
  ThingPrincipalObject
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/principals-v2",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      thingName: 0,
      thingPrincipalType: D.m({ query: "thingPrincipalType" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingPrincipalsV2",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingPrincipalObjects",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingRegistrationTaskReportsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Information about the thing registration tasks.
 */
export const listThingRegistrationTaskReports: API.PaginatedOperationMethod<
  ListThingRegistrationTaskReportsRequest,
  ListThingRegistrationTaskReportsResponse,
  ListThingRegistrationTaskReportsError,
  Credentials | HttpClient.HttpClient,
  S3FileUrl
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-registration-tasks/{taskId}/reports",
    input: {
      taskId: 0,
      reportType: D.m({ query: "reportType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingRegistrationTaskReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceLinks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingRegistrationTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * List bulk thing provisioning tasks.
 *
 * Requires permission to access the ListThingRegistrationTasks action.
 */
export const listThingRegistrationTasks: API.PaginatedOperationMethod<
  ListThingRegistrationTasksRequest,
  ListThingRegistrationTasksResponse,
  ListThingRegistrationTasksError,
  Credentials | HttpClient.HttpClient,
  TaskId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-registration-tasks",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingRegistrationTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists your things. Use the **attributeName** and **attributeValue** parameters to filter your things. For example,
 * calling `ListThings` with attributeName=Color and attributeValue=Red
 * retrieves all things in the registry that contain an attribute **Color** with the value **Red**. For more
 * information, see List Things from the Amazon Web Services IoT Core Developer
 * Guide.
 *
 * Requires permission to access the ListThings action.
 *
 * You will not be charged for calling this API if an `Access denied` error is returned. You will also not be charged if no attributes or pagination token was provided in request and no pagination token and no results were returned.
 */
export const listThings: API.PaginatedOperationMethod<
  ListThingsRequest,
  ListThingsResponse,
  ListThingsError,
  Credentials | HttpClient.HttpClient,
  ThingAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /things",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      attributeName: D.m({ query: "attributeName" }),
      attributeValue: D.m({ query: "attributeValue" }),
      thingTypeName: D.m({ query: "thingTypeName" }),
      usePrefixAttributeValue: D.m({ query: "usePrefixAttributeValue" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingsInBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the things you have added to the given billing group.
 *
 * Requires permission to access the ListThingsInBillingGroup action.
 */
export const listThingsInBillingGroup: API.PaginatedOperationMethod<
  ListThingsInBillingGroupRequest,
  ListThingsInBillingGroupResponse,
  ListThingsInBillingGroupError,
  Credentials | HttpClient.HttpClient,
  ThingName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /billing-groups/{billingGroupName}/things",
    input: {
      billingGroupName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingsInBillingGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingsInThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the things in the specified group.
 *
 * Requires permission to access the ListThingsInThingGroup action.
 */
export const listThingsInThingGroup: API.PaginatedOperationMethod<
  ListThingsInThingGroupRequest,
  ListThingsInThingGroupResponse,
  ListThingsInThingGroupError,
  Credentials | HttpClient.HttpClient,
  ThingName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-groups/{thingGroupName}/things",
    input: {
      thingGroupName: 0,
      recursive: D.m({ query: "recursive" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingsInThingGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingTypesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the existing thing types.
 *
 * Requires permission to access the ListThingTypes action.
 */
export const listThingTypes: API.PaginatedOperationMethod<
  ListThingTypesRequest,
  ListThingTypesResponse,
  ListThingTypesError,
  Credentials | HttpClient.HttpClient,
  ThingTypeDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /thing-types",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      thingTypeName: D.m({ query: "thingTypeName" }),
    },
    output: { thingTypes: D.list({ thingTypeMetadata: o_ThingTypeMetadata }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingTypes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTopicRuleDestinationsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all the topic rule destinations in your Amazon Web Services account.
 *
 * Requires permission to access the ListTopicRuleDestinations action.
 */
export const listTopicRuleDestinations: API.PaginatedOperationMethod<
  ListTopicRuleDestinationsRequest,
  ListTopicRuleDestinationsResponse,
  ListTopicRuleDestinationsError,
  Credentials | HttpClient.HttpClient,
  TopicRuleDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /destinations",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      destinationSummaries: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicRuleDestinations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "destinationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTopicRulesError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the rules for the specific topic.
 *
 * Requires permission to access the ListTopicRules action.
 */
export const listTopicRules: API.PaginatedOperationMethod<
  ListTopicRulesRequest,
  ListTopicRulesResponse,
  ListTopicRulesError,
  Credentials | HttpClient.HttpClient,
  TopicRuleListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /rules",
    input: {
      topic: D.m({ query: "topic" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      ruleDisabled: D.m({ query: "ruleDisabled" }),
    },
    output: { rules: D.list({ createdAt: D.ts }) },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListV2LoggingLevelsError =
  | InternalException
  | InvalidRequestException
  | NotConfiguredException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists logging levels.
 *
 * Requires permission to access the ListV2LoggingLevels action.
 */
export const listV2LoggingLevels: API.PaginatedOperationMethod<
  ListV2LoggingLevelsRequest,
  ListV2LoggingLevelsResponse,
  ListV2LoggingLevelsError,
  Credentials | HttpClient.HttpClient,
  LogTargetConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2LoggingLevel",
    input: {
      targetType: D.m({ query: "targetType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    NotConfiguredException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListV2LoggingLevels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "logTargetConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListViolationEventsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the Device Defender security profile violations discovered during the given time period.
 * You can use filters to limit the results to those alerts issued for a particular security profile,
 * behavior, or thing (device).
 *
 * Requires permission to access the ListViolationEvents action.
 */
export const listViolationEvents: API.PaginatedOperationMethod<
  ListViolationEventsRequest,
  ListViolationEventsResponse,
  ListViolationEventsError,
  Credentials | HttpClient.HttpClient,
  ViolationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /violation-events",
    input: {
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      thingName: D.m({ query: "thingName" }),
      securityProfileName: D.m({ query: "securityProfileName" }),
      behaviorCriteriaType: D.m({ query: "behaviorCriteriaType" }),
      listSuppressedAlerts: D.m({ query: "listSuppressedAlerts" }),
      verificationState: D.m({ query: "verificationState" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { violationEvents: D.list({ violationEventTime: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListViolationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "violationEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutVerificationStateOnViolationError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Set a verification state and provide a description of that verification state on a violation (detect alarm).
 */
export const putVerificationStateOnViolation: API.OperationMethod<
  PutVerificationStateOnViolationRequest,
  PutVerificationStateOnViolationResponse,
  PutVerificationStateOnViolationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /violations/verification-state/{violationId}",
    input: {
      violationId: 0,
      verificationState: 0,
      verificationStateDescription: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVerificationStateOnViolation",
})) as any;

export type RegisterCACertificateError =
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | RegistrationCodeValidationException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Registers a CA certificate with Amazon Web Services IoT Core. There is no limit to the number of CA
 * certificates you can register in your Amazon Web Services account. You can register up to 10 CA
 * certificates with the same `CA subject field` per Amazon Web Services account.
 *
 * Requires permission to access the RegisterCACertificate action.
 */
export const registerCACertificate: API.OperationMethod<
  RegisterCACertificateRequest,
  RegisterCACertificateResponse,
  RegisterCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cacertificate",
    input: {
      caCertificate: 0,
      verificationCertificate: 0,
      setAsActive: D.m({ query: "setAsActive" }),
      allowAutoRegistration: D.m({ query: "allowAutoRegistration" }),
      registrationConfig: i_RegistrationConfig,
      tags: D.list(i_Tag),
      certificateMode: 0,
    },
    body: true,
  },
  errors: [
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    RegistrationCodeValidationException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCACertificate",
})) as any;

export type RegisterCertificateError =
  | CertificateConflictException
  | CertificateStateException
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Registers a device certificate with IoT in the same certificate mode as the signing CA. If you have more than one CA certificate that has the same subject field, you must
 * specify the CA certificate that was used to sign the device certificate being
 * registered.
 *
 * Requires permission to access the RegisterCertificate action.
 */
export const registerCertificate: API.OperationMethod<
  RegisterCertificateRequest,
  RegisterCertificateResponse,
  RegisterCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /certificate/register",
    input: {
      certificatePem: 0,
      caCertificatePem: 0,
      setAsActive: D.m({ query: "setAsActive" }),
      status: 0,
    },
    body: true,
  },
  errors: [
    CertificateConflictException,
    CertificateStateException,
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCertificate",
})) as any;

export type RegisterCertificateWithoutCAError =
  | CertificateStateException
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Register a certificate that does not have a certificate authority (CA).
 * For supported certificates, consult
 * Certificate signing algorithms supported by IoT.
 */
export const registerCertificateWithoutCA: API.OperationMethod<
  RegisterCertificateWithoutCARequest,
  RegisterCertificateWithoutCAResponse,
  RegisterCertificateWithoutCAError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /certificate/register-no-ca",
    input: { certificatePem: 0, status: 0 },
    body: true,
  },
  errors: [
    CertificateStateException,
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCertificateWithoutCA",
})) as any;

export type RegisterThingError =
  | ConflictingResourceUpdateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceRegistrationFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Provisions a thing in the device registry. RegisterThing calls other IoT control
 * plane APIs. These calls might exceed your account level
 * IoT Throttling Limits and cause throttle errors. Please contact Amazon Web Services Customer Support to raise
 * your throttling limits if necessary.
 *
 * Requires permission to access the RegisterThing action.
 */
export const registerThing: API.OperationMethod<
  RegisterThingRequest,
  RegisterThingResponse,
  RegisterThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /things",
    input: { templateBody: 0, parameters: 0 },
    body: true,
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceRegistrationFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterThing",
})) as any;

export type RejectCertificateTransferError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferAlreadyCompletedException
  | UnauthorizedException
  | CommonErrors;
/**
 * Rejects a pending certificate transfer. After IoT rejects a certificate transfer,
 * the certificate status changes from **PENDING_TRANSFER** to
 * **INACTIVE**.
 *
 * To check for pending certificate transfers, call ListCertificates
 * to enumerate your certificates.
 *
 * This operation can only be called by the transfer destination. After it is called,
 * the certificate will be returned to the source's account in the INACTIVE state.
 *
 * Requires permission to access the RejectCertificateTransfer action.
 */
export const rejectCertificateTransfer: API.OperationMethod<
  RejectCertificateTransferRequest,
  RejectCertificateTransferResponse,
  RejectCertificateTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /reject-certificate-transfer/{certificateId}",
    input: { certificateId: 0, rejectReason: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferAlreadyCompletedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectCertificateTransfer",
})) as any;

export type RemoveThingFromBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the given thing from the billing group.
 *
 * Requires permission to access the RemoveThingFromBillingGroup action.
 *
 * This call is asynchronous. It might take several seconds for the detachment to propagate.
 */
export const removeThingFromBillingGroup: API.OperationMethod<
  RemoveThingFromBillingGroupRequest,
  RemoveThingFromBillingGroupResponse,
  RemoveThingFromBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /billing-groups/removeThingFromBillingGroup",
    input: {
      billingGroupName: 0,
      billingGroupArn: 0,
      thingName: 0,
      thingArn: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveThingFromBillingGroup",
})) as any;

export type RemoveThingFromThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Remove the specified thing from the specified group.
 *
 * You must specify either a `thingGroupArn` or a
 * `thingGroupName` to identify the thing group and
 * either a `thingArn` or a `thingName` to
 * identify the thing to remove from the thing group.
 *
 * Requires permission to access the RemoveThingFromThingGroup action.
 */
export const removeThingFromThingGroup: API.OperationMethod<
  RemoveThingFromThingGroupRequest,
  RemoveThingFromThingGroupResponse,
  RemoveThingFromThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /thing-groups/removeThingFromThingGroup",
    input: { thingGroupName: 0, thingGroupArn: 0, thingName: 0, thingArn: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveThingFromThingGroup",
})) as any;

export type ReplaceTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | SqlParseException
  | UnauthorizedException
  | CommonErrors;
/**
 * Replaces the rule. You must specify all parameters for the new rule. Creating rules
 * is an administrator-level action. Any user who has permission to create rules will be able
 * to access data processed by the rule.
 *
 * Requires permission to access the ReplaceTopicRule action.
 */
export const replaceTopicRule: API.OperationMethod<
  ReplaceTopicRuleRequest,
  ReplaceTopicRuleResponse,
  ReplaceTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /rules/{ruleName}",
    input: {
      ruleName: 0,
      topicRulePayload: D.m({ payload: true, shape: i_TopicRulePayload }),
    },
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    SqlParseException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplaceTopicRule",
})) as any;

export type SearchIndexError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Searches the specified index.
 *
 * If a device has never connected to IoT Core or was disconnected for more than 1 hour before fleet indexing's `thingConnectivityIndexingMode` was enabled, the `connectivity` object for this device in the response will have the `connected` field set to `false` with no additional session details.
 *
 * Requires permission to access the SearchIndex action.
 */
export const searchIndex: API.OperationMethod<
  SearchIndexRequest,
  SearchIndexResponse,
  SearchIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /indices/search",
    input: {
      indexName: 0,
      queryString: 0,
      nextToken: 0,
      maxResults: 0,
      queryVersion: 0,
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchIndex",
})) as any;

export type SetDefaultAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sets the default authorizer. This will be used if a websocket connection is made
 * without specifying an authorizer.
 *
 * Requires permission to access the SetDefaultAuthorizer action.
 */
export const setDefaultAuthorizer: API.OperationMethod<
  SetDefaultAuthorizerRequest,
  SetDefaultAuthorizerResponse,
  SetDefaultAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /default-authorizer",
    input: { authorizerName: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultAuthorizer",
})) as any;

export type SetDefaultPolicyVersionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sets the specified version of the specified policy as the policy's default
 * (operative) version. This action affects all certificates to which the policy is attached.
 * To list the principals the policy is attached to, use the ListPrincipalPolicies
 * action.
 *
 * Requires permission to access the SetDefaultPolicyVersion action.
 */
export const setDefaultPolicyVersion: API.OperationMethod<
  SetDefaultPolicyVersionRequest,
  SetDefaultPolicyVersionResponse,
  SetDefaultPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /policies/{policyName}/version/{policyVersionId}",
    input: { policyName: 0, policyVersionId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultPolicyVersion",
})) as any;

export type SetLoggingOptionsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the logging options.
 *
 * NOTE: use of this command is not recommended. Use `SetV2LoggingOptions`
 * instead.
 *
 * Requires permission to access the SetLoggingOptions action.
 */
export const setLoggingOptions: API.OperationMethod<
  SetLoggingOptionsRequest,
  SetLoggingOptionsResponse,
  SetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /loggingOptions",
    input: {
      loggingOptionsPayload: D.m({
        payload: true,
        shape: { roleArn: 0, logLevel: 0 },
      }),
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoggingOptions",
})) as any;

export type SetV2LoggingLevelError =
  | InternalException
  | InvalidRequestException
  | LimitExceededException
  | NotConfiguredException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the logging level.
 *
 * Requires permission to access the SetV2LoggingLevel action.
 */
export const setV2LoggingLevel: API.OperationMethod<
  SetV2LoggingLevelRequest,
  SetV2LoggingLevelResponse,
  SetV2LoggingLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2LoggingLevel",
    input: { logTarget: { targetType: 0, targetName: 0 }, logLevel: 0 },
    body: true,
  },
  errors: [
    InternalException,
    InvalidRequestException,
    LimitExceededException,
    NotConfiguredException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetV2LoggingLevel",
})) as any;

export type SetV2LoggingOptionsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the logging options for the V2 logging service.
 *
 * Requires permission to access the SetV2LoggingOptions action.
 */
export const setV2LoggingOptions: API.OperationMethod<
  SetV2LoggingOptionsRequest,
  SetV2LoggingOptionsResponse,
  SetV2LoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2LoggingOptions",
    input: {
      roleArn: 0,
      defaultLogLevel: 0,
      disableAllLogs: 0,
      eventConfigurations: D.list({
        eventType: 0,
        logLevel: 0,
        logDestination: 0,
      }),
    },
    body: true,
  },
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetV2LoggingOptions",
})) as any;

export type StartAuditMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | TaskAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a task that applies a set of mitigation actions to the specified target.
 *
 * Requires permission to access the StartAuditMitigationActionsTask action.
 */
export const startAuditMitigationActionsTask: API.OperationMethod<
  StartAuditMitigationActionsTaskRequest,
  StartAuditMitigationActionsTaskResponse,
  StartAuditMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/mitigationactions/tasks/{taskId}",
    input: {
      taskId: 0,
      target: {
        auditTaskId: 0,
        findingIds: 0,
        auditCheckToReasonCodeFilter: 0,
      },
      auditCheckToActionsMapping: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    TaskAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAuditMitigationActionsTask",
})) as any;

export type StartDetectMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | TaskAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Starts a Device Defender ML Detect mitigation actions task.
 *
 * Requires permission to access the StartDetectMitigationActionsTask action.
 */
export const startDetectMitigationActionsTask: API.OperationMethod<
  StartDetectMitigationActionsTaskRequest,
  StartDetectMitigationActionsTaskResponse,
  StartDetectMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /detect/mitigationactions/tasks/{taskId}",
    input: {
      taskId: 0,
      target: { violationIds: 0, securityProfileName: 0, behaviorName: 0 },
      actions: 0,
      violationEventOccurrenceRange: { startTime: 0, endTime: 0 },
      includeOnlyActiveViolations: 0,
      includeSuppressedAlerts: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    TaskAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDetectMitigationActionsTask",
})) as any;

export type StartOnDemandAuditTaskError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an on-demand Device Defender audit.
 *
 * Requires permission to access the StartOnDemandAuditTask action.
 */
export const startOnDemandAuditTask: API.OperationMethod<
  StartOnDemandAuditTaskRequest,
  StartOnDemandAuditTaskResponse,
  StartOnDemandAuditTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /audit/tasks",
    input: { targetCheckNames: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOnDemandAuditTask",
})) as any;

export type StartThingRegistrationTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a bulk thing provisioning task.
 *
 * Requires permission to access the StartThingRegistrationTask action.
 */
export const startThingRegistrationTask: API.OperationMethod<
  StartThingRegistrationTaskRequest,
  StartThingRegistrationTaskResponse,
  StartThingRegistrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /thing-registration-tasks",
    input: { templateBody: 0, inputFileBucket: 0, inputFileKey: 0, roleArn: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThingRegistrationTask",
})) as any;

export type StopThingRegistrationTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels a bulk thing provisioning task.
 *
 * Requires permission to access the StopThingRegistrationTask action.
 */
export const stopThingRegistrationTask: API.OperationMethod<
  StopThingRegistrationTaskRequest,
  StopThingRegistrationTaskResponse,
  StopThingRegistrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /thing-registration-tasks/{taskId}/cancel",
    input: { taskId: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopThingRegistrationTask",
})) as any;

export type TagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata which can be
 * used to manage a resource.
 *
 * Requires permission to access the TagResource action.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags",
    input: { resourceArn: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestAuthorizationError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tests if a specified principal is authorized to perform an IoT action on a
 * specified resource. Use this to test and debug the authorization behavior of devices that
 * connect to the IoT device gateway.
 *
 * Requires permission to access the TestAuthorization action.
 */
export const testAuthorization: API.OperationMethod<
  TestAuthorizationRequest,
  TestAuthorizationResponse,
  TestAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /test-authorization",
    input: {
      principal: 0,
      cognitoIdentityPoolId: 0,
      authInfos: D.list({ actionType: 0, resources: 0 }),
      clientId: D.m({ query: "clientId" }),
      policyNamesToAdd: 0,
      policyNamesToSkip: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAuthorization",
})) as any;

export type TestInvokeAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | InvalidResponseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tests a custom authorization behavior by invoking a specified custom authorizer. Use
 * this to test and debug the custom authorization behavior of devices that connect to the IoT
 * device gateway.
 *
 * Requires permission to access the TestInvokeAuthorizer action.
 */
export const testInvokeAuthorizer: API.OperationMethod<
  TestInvokeAuthorizerRequest,
  TestInvokeAuthorizerResponse,
  TestInvokeAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /authorizer/{authorizerName}/test",
    input: {
      authorizerName: 0,
      token: 0,
      tokenSignature: 0,
      httpContext: { headers: 0, queryString: 0 },
      mqttContext: { username: 0, password: 0, clientId: 0 },
      tlsContext: { serverName: 0 },
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    InvalidResponseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeAuthorizer",
})) as any;

export type TransferCertificateError =
  | CertificateStateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferConflictException
  | UnauthorizedException
  | CommonErrors;
/**
 * Transfers the specified certificate to the specified Amazon Web Services account.
 *
 * Requires permission to access the TransferCertificate action.
 *
 * You can cancel the transfer until it is accepted by the recipient.
 *
 * No notification is sent to the transfer destination's account. The caller is responsible for notifying the transfer target.
 *
 * The certificate being transferred must not be in the `ACTIVE` state. You can use the
 * UpdateCertificate action to deactivate it.
 *
 * The certificate must not have any policies attached to it. You can use the
 * DetachPolicy action to detach them.
 *
 * **Customer managed key behavior:** When you use a customer managed key to encrypt your data and then transfer
 * the certificate to a customer in a different account using the `TransferCertificate` operation, the certificates will no longer be encrypted by their
 * customer managed key configuration. During the transfer process, certificates are encrypted using Amazon Web Services IoT Core owned keys.
 *
 * While a certificate is in the **PENDING_TRANSFER** state, it's always protected by Amazon Web Services IoT Core owned keys, regardless of the customer managed key configuration of either the source or destination account.
 *
 * Once the transfer is completed through AcceptCertificateTransfer, RejectCertificateTransfer, or
 * CancelCertificateTransfer, the certificate will be protected by the customer managed key configuration of the account that owns
 * the certificate after the transfer operation:
 *
 * - If the transfer is accepted: The certificate is encrypted by the target account's customer managed key configuration.
 *
 * - If the transfer is rejected or cancelled: The certificate is protected by the source account's customer managed key configuration.
 */
export const transferCertificate: API.OperationMethod<
  TransferCertificateRequest,
  TransferCertificateResponse,
  TransferCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /transfer-certificate/{certificateId}",
    input: {
      certificateId: 0,
      targetAwsAccount: D.m({ query: "targetAwsAccount" }),
      transferMessage: 0,
    },
    body: true,
  },
  errors: [
    CertificateStateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferConflictException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferCertificate",
})) as any;

export type UntagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the given tags (metadata) from the resource.
 *
 * Requires permission to access the UntagResource action.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /untag",
    input: { resourceArn: 0, tagKeys: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountAuditConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Configures or reconfigures the Device Defender audit settings for this account.
 * Settings include how audit notifications are sent and which audit checks are
 * enabled or disabled.
 *
 * Requires permission to access the UpdateAccountAuditConfiguration action.
 */
export const updateAccountAuditConfiguration: API.OperationMethod<
  UpdateAccountAuditConfigurationRequest,
  UpdateAccountAuditConfigurationResponse,
  UpdateAccountAuditConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /audit/configuration",
    input: {
      roleArn: 0,
      auditNotificationTargetConfigurations: D.map({
        targetArn: 0,
        roleArn: 0,
        enabled: 0,
      }),
      auditCheckConfigurations: D.map({ enabled: 0, configuration: 0 }),
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountAuditConfiguration",
})) as any;

export type UpdateAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a Device Defender audit suppression.
 */
export const updateAuditSuppression: API.OperationMethod<
  UpdateAuditSuppressionRequest,
  UpdateAuditSuppressionResponse,
  UpdateAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /audit/suppressions/update",
    input: {
      checkName: 0,
      resourceIdentifier: i_ResourceIdentifier,
      expirationDate: 0,
      suppressIndefinitely: 0,
      description: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuditSuppression",
})) as any;

export type UpdateAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an authorizer.
 *
 * Requires permission to access the UpdateAuthorizer action.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  UpdateAuthorizerResponse,
  UpdateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /authorizer/{authorizerName}",
    input: {
      authorizerName: 0,
      authorizerFunctionArn: 0,
      tokenKeyName: 0,
      tokenSigningPublicKeys: 0,
      status: 0,
      enableCachingForHttp: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
})) as any;

export type UpdateBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates information about the billing group.
 *
 * Requires permission to access the UpdateBillingGroup action.
 */
export const updateBillingGroup: API.OperationMethod<
  UpdateBillingGroupRequest,
  UpdateBillingGroupResponse,
  UpdateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /billing-groups/{billingGroupName}",
    input: {
      billingGroupName: 0,
      billingGroupProperties: i_BillingGroupProperties,
      expectedVersion: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingGroup",
})) as any;

export type UpdateCACertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a registered CA certificate.
 *
 * Requires permission to access the UpdateCACertificate action.
 */
export const updateCACertificate: API.OperationMethod<
  UpdateCACertificateRequest,
  UpdateCACertificateResponse,
  UpdateCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cacertificate/{certificateId}",
    input: {
      certificateId: 0,
      newStatus: D.m({ query: "newStatus" }),
      newAutoRegistrationStatus: D.m({ query: "newAutoRegistrationStatus" }),
      registrationConfig: i_RegistrationConfig,
      removeAutoRegistration: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCACertificate",
})) as any;

export type UpdateCertificateError =
  | CertificateStateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the status of the specified certificate. This operation is
 * idempotent.
 *
 * Requires permission to access the UpdateCertificate action.
 *
 * Certificates must be in the ACTIVE state to authenticate devices that use
 * a certificate to connect to IoT.
 *
 * Within a few minutes of updating a certificate from the ACTIVE state to any other
 * state, IoT disconnects all devices that used that certificate to connect. Devices cannot
 * use a certificate that is not in the ACTIVE state to reconnect.
 */
export const updateCertificate: API.OperationMethod<
  UpdateCertificateRequest,
  UpdateCertificateResponse,
  UpdateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /certificates/{certificateId}",
    input: { certificateId: 0, newStatus: D.m({ query: "newStatus" }) },
  },
  errors: [
    CertificateStateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificate",
})) as any;

export type UpdateCertificateProviderError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a certificate provider.
 *
 * Requires permission to access the UpdateCertificateProvider action.
 */
export const updateCertificateProvider: API.OperationMethod<
  UpdateCertificateProviderRequest,
  UpdateCertificateProviderResponse,
  UpdateCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /certificate-providers/{certificateProviderName}",
    input: {
      certificateProviderName: 0,
      lambdaFunctionArn: 0,
      accountDefaultForOperations: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificateProvider",
})) as any;

export type UpdateCommandError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update information about a command or mark a command for deprecation.
 */
export const updateCommand: API.OperationMethod<
  UpdateCommandRequest,
  UpdateCommandResponse,
  UpdateCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /commands/{commandId}",
    input: { commandId: 0, displayName: 0, description: 0, deprecated: 0 },
    output: { lastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCommand",
})) as any;

export type UpdateCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Updates a
 * Device Defender detect custom metric.
 *
 * Requires permission to access the UpdateCustomMetric action.
 */
export const updateCustomMetric: API.OperationMethod<
  UpdateCustomMetricRequest,
  UpdateCustomMetricResponse,
  UpdateCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /custom-metric/{metricName}",
    input: { metricName: 0, displayName: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomMetric",
})) as any;

export type UpdateDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Updates the definition for a dimension. You
 * cannot
 * change the type of a dimension after
 * it is created (you can delete it and
 * recreate
 * it).
 *
 * Requires permission to access the UpdateDimension action.
 */
export const updateDimension: API.OperationMethod<
  UpdateDimensionRequest,
  UpdateDimensionResponse,
  UpdateDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /dimensions/{name}",
    input: { name: 0, stringValues: 0 },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDimension",
})) as any;

export type UpdateDomainConfigurationError =
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates values stored in the domain configuration. Domain configurations for default
 * endpoints can't be updated.
 *
 * Requires permission to access the UpdateDomainConfiguration action.
 */
export const updateDomainConfiguration: API.OperationMethod<
  UpdateDomainConfigurationRequest,
  UpdateDomainConfigurationResponse,
  UpdateDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domainConfigurations/{domainConfigurationName}",
    input: {
      domainConfigurationName: 0,
      authorizerConfig: i_AuthorizerConfig,
      domainConfigurationStatus: 0,
      removeAuthorizerConfig: 0,
      tlsConfig: i_TlsConfig,
      serverCertificateConfig: i_ServerCertificateConfig,
      authenticationType: 0,
      applicationProtocol: 0,
      clientCertificateConfig: i_ClientCertificateConfig,
    },
    body: true,
  },
  errors: [
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainConfiguration",
})) as any;

export type UpdateDynamicThingGroupError =
  | InternalFailureException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates a dynamic thing group.
 *
 * Requires permission to access the UpdateDynamicThingGroup action.
 */
export const updateDynamicThingGroup: API.OperationMethod<
  UpdateDynamicThingGroupRequest,
  UpdateDynamicThingGroupResponse,
  UpdateDynamicThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /dynamic-thing-groups/{thingGroupName}",
    input: {
      thingGroupName: 0,
      thingGroupProperties: i_ThingGroupProperties,
      expectedVersion: 0,
      indexName: 0,
      queryString: 0,
      queryVersion: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDynamicThingGroup",
})) as any;

export type UpdateEncryptionConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the encryption configuration. By default, Amazon Web Services IoT Core encrypts your data at rest using Amazon Web Services owned keys. Amazon Web Services IoT Core also supports symmetric customer managed keys
 * from Key Management Service (KMS). With customer managed keys, you create, own, and
 * manage the KMS keys in your Amazon Web Services account.
 *
 * Before using this API, you must set up permissions for Amazon Web Services IoT Core to access KMS. For more information, see Data encryption at rest in the *Amazon Web Services IoT Core Developer Guide*.
 */
export const updateEncryptionConfiguration: API.OperationMethod<
  UpdateEncryptionConfigurationRequest,
  UpdateEncryptionConfigurationResponse,
  UpdateEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /encryption-configuration",
    input: { encryptionType: 0, kmsKeyArn: 0, kmsAccessRoleArn: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEncryptionConfiguration",
})) as any;

export type UpdateEventConfigurationsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the event configurations.
 *
 * Requires permission to access the UpdateEventConfigurations action.
 */
export const updateEventConfigurations: API.OperationMethod<
  UpdateEventConfigurationsRequest,
  UpdateEventConfigurationsResponse,
  UpdateEventConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /event-configurations",
    input: { eventConfigurations: D.map({ Enabled: 0 }) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventConfigurations",
})) as any;

export type UpdateFleetMetricError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates the data for a fleet metric.
 *
 * Requires permission to access the UpdateFleetMetric action.
 */
export const updateFleetMetric: API.OperationMethod<
  UpdateFleetMetricRequest,
  UpdateFleetMetricResponse,
  UpdateFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /fleet-metric/{metricName}",
    input: {
      metricName: 0,
      queryString: 0,
      aggregationType: i_AggregationType,
      period: 0,
      aggregationField: 0,
      description: 0,
      queryVersion: 0,
      indexName: 0,
      unit: 0,
      expectedVersion: 0,
    },
    body: true,
  },
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetMetric",
})) as any;

export type UpdateIndexingConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the search configuration.
 *
 * Requires permission to access the UpdateIndexingConfiguration action.
 */
export const updateIndexingConfiguration: API.OperationMethod<
  UpdateIndexingConfigurationRequest,
  UpdateIndexingConfigurationResponse,
  UpdateIndexingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /indexing/config",
    input: {
      thingIndexingConfiguration: {
        thingIndexingMode: 0,
        thingConnectivityIndexingMode: 0,
        deviceDefenderIndexingMode: 0,
        namedShadowIndexingMode: 0,
        managedFields: D.list(i_Field),
        customFields: D.list(i_Field),
        filter: {
          namedShadowNames: 0,
          geoLocations: D.list({ name: 0, order: 0 }),
          connectivity: { includeSocketInformation: 0 },
        },
      },
      thingGroupIndexingConfiguration: {
        thingGroupIndexingMode: 0,
        managedFields: D.list(i_Field),
        customFields: D.list(i_Field),
      },
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndexingConfiguration",
})) as any;

export type UpdateJobError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates supported fields of the specified job.
 *
 * Requires permission to access the UpdateJob action.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResponse,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /jobs/{jobId}",
    input: {
      jobId: 0,
      description: 0,
      presignedUrlConfig: i_PresignedUrlConfig,
      jobExecutionsRolloutConfig: i_JobExecutionsRolloutConfig,
      abortConfig: i_AbortConfig,
      timeoutConfig: i_TimeoutConfig,
      namespaceId: D.m({ query: "namespaceId" }),
      jobExecutionsRetryConfig: i_JobExecutionsRetryConfig,
    },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
})) as any;

export type UpdateMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the definition for the specified mitigation action.
 *
 * Requires permission to access the UpdateMitigationAction action.
 */
export const updateMitigationAction: API.OperationMethod<
  UpdateMitigationActionRequest,
  UpdateMitigationActionResponse,
  UpdateMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /mitigationactions/actions/{actionName}",
    input: {
      actionName: 0,
      roleArn: 0,
      actionParams: i_MitigationActionParams,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMitigationAction",
})) as any;

export type UpdatePackageError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the supported fields for a specific software package.
 *
 * Requires permission to access the UpdatePackage and GetIndexingConfiguration actions.
 */
export const updatePackage: API.OperationMethod<
  UpdatePackageRequest,
  UpdatePackageResponse,
  UpdatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /packages/{packageName}",
    input: {
      packageName: 0,
      description: 0,
      defaultVersionName: 0,
      unsetDefaultVersion: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackage",
})) as any;

export type UpdatePackageConfigurationError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the software package configuration.
 *
 * Requires permission to access the UpdatePackageConfiguration and iam:PassRole actions.
 */
export const updatePackageConfiguration: API.OperationMethod<
  UpdatePackageConfigurationRequest,
  UpdatePackageConfigurationResponse,
  UpdatePackageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /package-configuration",
    input: {
      versionUpdateByJobsConfig: { enabled: 0, roleArn: 0 },
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackageConfiguration",
})) as any;

export type UpdatePackageVersionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the supported fields for a specific package version.
 *
 * Requires permission to access the UpdatePackageVersion and GetIndexingConfiguration actions.
 */
export const updatePackageVersion: API.OperationMethod<
  UpdatePackageVersionRequest,
  UpdatePackageVersionResponse,
  UpdatePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /packages/{packageName}/versions/{versionName}",
    input: {
      packageName: 0,
      versionName: 0,
      description: 0,
      attributes: 0,
      artifact: i_PackageVersionArtifact,
      action: 0,
      recipe: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackageVersion",
})) as any;

export type UpdateProvisioningTemplateError =
  | ConflictingResourceUpdateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a provisioning template.
 *
 * Requires permission to access the UpdateProvisioningTemplate action.
 */
export const updateProvisioningTemplate: API.OperationMethod<
  UpdateProvisioningTemplateRequest,
  UpdateProvisioningTemplateResponse,
  UpdateProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /provisioning-templates/{templateName}",
    input: {
      templateName: 0,
      description: 0,
      enabled: 0,
      defaultVersionId: 0,
      provisioningRoleArn: 0,
      preProvisioningHook: i_ProvisioningHook,
      removePreProvisioningHook: 0,
    },
    body: true,
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisioningTemplate",
})) as any;

export type UpdateRoleAliasError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a role alias.
 *
 * Requires permission to access the UpdateRoleAlias action.
 *
 * The value of
 * `credentialDurationSeconds`
 * must be less than or equal to the
 * maximum session duration of the IAM role that the role alias references. For more
 * information, see Modifying a role maximum session duration (Amazon Web Services API) from the Amazon Web Services
 * Identity and Access Management User Guide.
 */
export const updateRoleAlias: API.OperationMethod<
  UpdateRoleAliasRequest,
  UpdateRoleAliasResponse,
  UpdateRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /role-aliases/{roleAlias}",
    input: { roleAlias: 0, roleArn: 0, credentialDurationSeconds: 0 },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoleAlias",
})) as any;

export type UpdateScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a scheduled audit, including which checks are performed and
 * how often the audit takes place.
 *
 * Requires permission to access the UpdateScheduledAudit action.
 */
export const updateScheduledAudit: API.OperationMethod<
  UpdateScheduledAuditRequest,
  UpdateScheduledAuditResponse,
  UpdateScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /audit/scheduledaudits/{scheduledAuditName}",
    input: {
      frequency: 0,
      dayOfMonth: 0,
      dayOfWeek: 0,
      targetCheckNames: 0,
      scheduledAuditName: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAudit",
})) as any;

export type UpdateSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Updates a Device Defender security profile.
 *
 * Requires permission to access the UpdateSecurityProfile action.
 */
export const updateSecurityProfile: API.OperationMethod<
  UpdateSecurityProfileRequest,
  UpdateSecurityProfileResponse,
  UpdateSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /security-profiles/{securityProfileName}",
    input: {
      securityProfileName: 0,
      securityProfileDescription: 0,
      behaviors: D.list(i_Behavior),
      alertTargets: D.map(i_AlertTarget),
      additionalMetricsToRetain: 0,
      additionalMetricsToRetainV2: D.list(i_MetricToRetain),
      deleteBehaviors: 0,
      deleteAlertTargets: 0,
      deleteAdditionalMetricsToRetain: 0,
      expectedVersion: D.m({ query: "expectedVersion" }),
      metricsExportConfig: i_MetricsExportConfig,
      deleteMetricsExportConfig: 0,
    },
    output: { creationDate: D.ts, lastModifiedDate: D.ts },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityProfile",
})) as any;

export type UpdateStreamError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing stream. The stream version will be incremented by one.
 *
 * Requires permission to access the UpdateStream action.
 */
export const updateStream: API.OperationMethod<
  UpdateStreamRequest,
  UpdateStreamResponse,
  UpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /streams/{streamId}",
    input: {
      streamId: 0,
      description: 0,
      files: D.list(i_StreamFile),
      roleArn: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStream",
})) as any;

export type UpdateThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates the data for a thing.
 *
 * Requires permission to access the UpdateThing action.
 */
export const updateThing: API.OperationMethod<
  UpdateThingRequest,
  UpdateThingResponse,
  UpdateThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /things/{thingName}",
    input: {
      thingName: 0,
      thingTypeName: 0,
      attributePayload: i_AttributePayload,
      expectedVersion: 0,
      removeThingType: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThing",
})) as any;

export type UpdateThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Update a thing group.
 *
 * Requires permission to access the UpdateThingGroup action.
 */
export const updateThingGroup: API.OperationMethod<
  UpdateThingGroupRequest,
  UpdateThingGroupResponse,
  UpdateThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /thing-groups/{thingGroupName}",
    input: {
      thingGroupName: 0,
      thingGroupProperties: i_ThingGroupProperties,
      expectedVersion: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingGroup",
})) as any;

export type UpdateThingGroupsForThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the groups to which the thing belongs.
 *
 * Requires permission to access the UpdateThingGroupsForThing action.
 */
export const updateThingGroupsForThing: API.OperationMethod<
  UpdateThingGroupsForThingRequest,
  UpdateThingGroupsForThingResponse,
  UpdateThingGroupsForThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /thing-groups/updateThingGroupsForThing",
    input: {
      thingName: 0,
      thingGroupsToAdd: 0,
      thingGroupsToRemove: 0,
      overrideDynamicGroups: 0,
    },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingGroupsForThing",
})) as any;

export type UpdateThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a thing type.
 */
export const updateThingType: API.OperationMethod<
  UpdateThingTypeRequest,
  UpdateThingTypeResponse,
  UpdateThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /thing-types/{thingTypeName}",
    input: { thingTypeName: 0, thingTypeProperties: i_ThingTypeProperties },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingType",
})) as any;

export type UpdateTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a topic rule destination. You use this to change the status, endpoint URL, or
 * confirmation URL of the destination.
 *
 * Requires permission to access the UpdateTopicRuleDestination action.
 */
export const updateTopicRuleDestination: API.OperationMethod<
  UpdateTopicRuleDestinationRequest,
  UpdateTopicRuleDestinationResponse,
  UpdateTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /destinations",
    input: { arn: 0, status: 0 },
    body: true,
  },
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopicRuleDestination",
})) as any;

export type ValidateSecurityProfileBehaviorsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Validates a Device Defender security profile behaviors specification.
 *
 * Requires permission to access the ValidateSecurityProfileBehaviors action.
 */
export const validateSecurityProfileBehaviors: API.OperationMethod<
  ValidateSecurityProfileBehaviorsRequest,
  ValidateSecurityProfileBehaviorsResponse,
  ValidateSecurityProfileBehaviorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /security-profile-behaviors/validate",
    input: { behaviors: D.list(i_Behavior) },
    body: true,
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSecurityProfileBehaviors",
})) as any;

const i_AbortConfig: D.LazyStruct = () => ({
  criteriaList: D.list({
    failureType: 0,
    action: 0,
    thresholdPercentage: 0,
    minNumberOfExecutedThings: 0,
  }),
});
const i_AggregationType: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_AlertTarget: D.LazyStruct = () => ({ alertTargetArn: 0, roleArn: 0 });
const i_AttributePayload: D.LazyStruct = () => ({ attributes: 0, merge: 0 });
const i_AuthorizerConfig: D.LazyStruct = () => ({
  defaultAuthorizerName: 0,
  allowAuthorizerOverride: 0,
});
const i_Behavior: D.LazyStruct = () => ({
  name: 0,
  metric: 0,
  metricDimension: i_MetricDimension,
  criteria: {
    comparisonOperator: 0,
    value: { count: 0, cidrs: 0, ports: 0, number: 0, numbers: 0, strings: 0 },
    durationSeconds: 0,
    consecutiveDatapointsToAlarm: 0,
    consecutiveDatapointsToClear: 0,
    statisticalThreshold: { statistic: 0 },
    mlDetectionConfig: { confidenceLevel: 0 },
  },
  suppressAlerts: 0,
  exportMetric: 0,
});
const i_BillingGroupProperties: D.LazyStruct = () => ({
  billingGroupDescription: 0,
});
const i_ClientCertificateConfig: D.LazyStruct = () => ({
  clientCertificateCallbackArn: 0,
});
const i_CommandParameterValue: D.LazyStruct = () => ({
  S: 0,
  B: 0,
  I: 0,
  L: 0,
  D: 0,
  BIN: 0,
  UL: 0,
});
const i_Field: D.LazyStruct = () => ({ name: 0, type: 0 });
const i_JobExecutionsRetryConfig: D.LazyStruct = () => ({
  criteriaList: D.list({ failureType: 0, numberOfRetries: 0 }),
});
const i_JobExecutionsRolloutConfig: D.LazyStruct = () => ({
  maximumPerMinute: 0,
  exponentialRate: {
    baseRatePerMinute: 0,
    incrementFactor: 0,
    rateIncreaseCriteria: {
      numberOfNotifiedThings: 0,
      numberOfSucceededThings: 0,
    },
  },
});
const i_MaintenanceWindow: D.LazyStruct = () => ({
  startTime: 0,
  durationInMinutes: 0,
});
const i_MetricToRetain: D.LazyStruct = () => ({
  metric: 0,
  metricDimension: i_MetricDimension,
  exportMetric: 0,
});
const i_MetricsExportConfig: D.LazyStruct = () => ({
  mqttTopic: 0,
  roleArn: 0,
});
const i_MitigationActionParams: D.LazyStruct = () => ({
  updateDeviceCertificateParams: { action: 0 },
  updateCACertificateParams: { action: 0 },
  addThingsToThingGroupParams: { thingGroupNames: 0, overrideDynamicGroups: 0 },
  replaceDefaultPolicyVersionParams: { templateName: 0 },
  enableIoTLoggingParams: { roleArnForLogging: 0, logLevel: 0 },
  publishFindingToSnsParams: { topicArn: 0 },
});
const i_PackageVersionArtifact: D.LazyStruct = () => ({
  s3Location: i_S3Location,
});
const i_PresignedUrlConfig: D.LazyStruct = () => ({
  roleArn: 0,
  expiresInSec: 0,
});
const i_ProvisioningHook: D.LazyStruct = () => ({
  payloadVersion: 0,
  targetArn: 0,
});
const i_RegistrationConfig: D.LazyStruct = () => ({
  templateBody: 0,
  roleArn: 0,
  templateName: 0,
});
const i_ResourceIdentifier: D.LazyStruct = () => ({
  deviceCertificateId: 0,
  caCertificateId: 0,
  cognitoIdentityPoolId: 0,
  clientId: 0,
  policyVersionIdentifier: { policyName: 0, policyVersionId: 0 },
  account: 0,
  iamRoleArn: 0,
  roleAliasArn: 0,
  issuerCertificateIdentifier: {
    issuerCertificateSubject: 0,
    issuerId: 0,
    issuerCertificateSerialNumber: 0,
  },
  deviceCertificateArn: 0,
});
const i_S3Location: D.LazyStruct = () => ({ bucket: 0, key: 0, version: 0 });
const i_ServerCertificateConfig: D.LazyStruct = () => ({
  enableOCSPCheck: 0,
  ocspLambdaArn: 0,
  ocspAuthorizedResponderArn: 0,
});
const i_StreamFile: D.LazyStruct = () => ({
  fileId: 0,
  s3Location: i_S3Location,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_ThingGroupProperties: D.LazyStruct = () => ({
  thingGroupDescription: 0,
  attributePayload: i_AttributePayload,
});
const i_ThingTypeProperties: D.LazyStruct = () => ({
  thingTypeDescription: 0,
  searchableAttributes: 0,
  mqtt5Configuration: {
    propagatingAttributes: D.list({
      userPropertyKey: 0,
      thingAttribute: 0,
      connectionAttribute: 0,
    }),
  },
});
const i_TimeFilter: D.LazyStruct = () => ({ after: 0, before: 0 });
const i_TimeoutConfig: D.LazyStruct = () => ({ inProgressTimeoutInMinutes: 0 });
const i_TlsConfig: D.LazyStruct = () => ({ securityPolicy: 0 });
const i_TopicRulePayload: D.LazyStruct = () => ({
  sql: 0,
  description: 0,
  actions: D.list(i_Action),
  ruleDisabled: 0,
  awsIotSqlVersion: 0,
  errorAction: i_Action,
});
const o_AuditFinding: D.LazyStruct = () => ({
  taskStartTime: D.ts,
  findingTime: D.ts,
});
const o_AuthorizerDescription: D.LazyStruct = () => ({
  creationDate: D.ts,
  lastModifiedDate: D.ts,
});
const o_Certificate: D.LazyStruct = () => ({ creationDate: D.ts });
const o_CertificateValidity: D.LazyStruct = () => ({
  notBefore: D.ts,
  notAfter: D.ts,
});
const o_CommandParameterValue: D.LazyStruct = () => ({ BIN: D.blob });
const o_DetectMitigationActionsTaskSummary: D.LazyStruct = () => ({
  taskStartTime: D.ts,
  taskEndTime: D.ts,
  violationEventOccurrenceRange: { startTime: D.ts, endTime: D.ts },
});
const o_JobExecutionSummary: D.LazyStruct = () => ({
  queuedAt: D.ts,
  startedAt: D.ts,
  lastUpdatedAt: D.ts,
});
const o_KeyPair: D.LazyStruct = () => ({ PrivateKey: D.secret });
const o_ThingTypeMetadata: D.LazyStruct = () => ({
  deprecationDate: D.ts,
  creationDate: D.ts,
});
const o_TopicRuleDestination: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastUpdatedAt: D.ts,
});
const i_Action: D.LazyStruct = () => ({
  dynamoDB: {
    tableName: 0,
    roleArn: 0,
    operation: 0,
    hashKeyField: 0,
    hashKeyValue: 0,
    hashKeyType: 0,
    rangeKeyField: 0,
    rangeKeyValue: 0,
    rangeKeyType: 0,
    payloadField: 0,
  },
  dynamoDBv2: { roleArn: 0, putItem: { tableName: 0 } },
  lambda: { functionArn: 0 },
  sns: { targetArn: 0, roleArn: 0, messageFormat: 0 },
  sqs: { roleArn: 0, queueUrl: 0, useBase64: 0 },
  kinesis: { roleArn: 0, streamName: 0, partitionKey: 0 },
  republish: {
    roleArn: 0,
    topic: 0,
    qos: 0,
    headers: {
      payloadFormatIndicator: 0,
      contentType: 0,
      responseTopic: 0,
      correlationData: 0,
      messageExpiry: 0,
      userProperties: D.list({ key: 0, value: 0 }),
    },
  },
  s3: { roleArn: 0, bucketName: 0, key: 0, cannedAcl: 0 },
  firehose: { roleArn: 0, deliveryStreamName: 0, separator: 0, batchMode: 0 },
  cloudwatchMetric: {
    roleArn: 0,
    metricNamespace: 0,
    metricName: 0,
    metricValue: 0,
    metricUnit: 0,
    metricTimestamp: 0,
  },
  cloudwatchAlarm: { roleArn: 0, alarmName: 0, stateReason: 0, stateValue: 0 },
  cloudwatchLogs: { roleArn: 0, logGroupName: 0, batchMode: 0 },
  elasticsearch: { roleArn: 0, endpoint: 0, index: 0, type: 0, id: 0 },
  salesforce: { token: 0, url: 0 },
  iotAnalytics: { channelArn: 0, channelName: 0, batchMode: 0, roleArn: 0 },
  iotEvents: { inputName: 0, messageId: 0, batchMode: 0, roleArn: 0 },
  iotSiteWise: {
    putAssetPropertyValueEntries: D.list({
      entryId: 0,
      assetId: 0,
      propertyId: 0,
      propertyAlias: 0,
      propertyValues: D.list({
        value: {
          stringValue: 0,
          integerValue: 0,
          doubleValue: 0,
          booleanValue: 0,
        },
        timestamp: { timeInSeconds: 0, offsetInNanos: 0 },
        quality: 0,
      }),
    }),
    roleArn: 0,
  },
  stepFunctions: { executionNamePrefix: 0, stateMachineName: 0, roleArn: 0 },
  timestream: {
    roleArn: 0,
    databaseName: 0,
    tableName: 0,
    dimensions: D.list({ name: 0, value: 0 }),
    timestamp: { value: 0, unit: 0 },
  },
  http: {
    url: 0,
    confirmationUrl: 0,
    headers: D.list({ key: 0, value: 0 }),
    auth: { sigv4: { signingRegion: 0, serviceName: 0, roleArn: 0 } },
    enableBatching: 0,
    batchConfig: {
      maxBatchOpenMs: 0,
      maxBatchSize: 0,
      maxBatchSizeBytes: 0,
      batchAcrossTopics: 0,
    },
  },
  kafka: {
    destinationArn: 0,
    topic: 0,
    key: 0,
    partition: 0,
    clientProperties: 0,
    headers: D.list({ key: 0, value: 0 }),
  },
  openSearch: { roleArn: 0, endpoint: 0, index: 0, type: 0, id: 0 },
  location: {
    roleArn: 0,
    trackerName: 0,
    deviceId: 0,
    timestamp: { value: 0, unit: 0 },
    latitude: 0,
    longitude: 0,
  },
  influxDB: {
    destinationArn: 0,
    roleArn: 0,
    databaseName: 0,
    tableName: 0,
    organization: 0,
    tags: 0,
    timestampUnit: 0,
    batchConfig: {
      maxBatchSize: 0,
      maxBatchOpenMs: 0,
      maxBatchSizeBytes: 0,
      batchAcrossTopics: 0,
    },
  },
});
const i_MetricDimension: D.LazyStruct = () => ({
  dimensionName: 0,
  operator: 0,
});
