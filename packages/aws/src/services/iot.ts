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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "IoT", serviceShapeName: "AWSIotService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iot" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-05-28");
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
              `https://iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
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
        return e(`https://iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://iot.{R}.{D}","properties":{},"headers":{}}');

export class CertificateConflictException
  extends /*@__PURE__*/ S.TaggedError<CertificateConflictException>()(
    "CertificateConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CertificateStateException
  extends /*@__PURE__*/ S.TaggedError<CertificateStateException>()(
    "CertificateStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(406),
  ).pipe(C.withBadRequestError) {}
export class CertificateValidationException
  extends /*@__PURE__*/ S.TaggedError<CertificateValidationException>()(
    "CertificateValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictingResourceUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConflictingResourceUpdateException>()(
    "ConflictingResourceUpdateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DeleteConflictException
  extends /*@__PURE__*/ S.TaggedError<DeleteConflictException>()(
    "DeleteConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IndexNotReadyException
  extends /*@__PURE__*/ S.TaggedError<IndexNotReadyException>()(
    "IndexNotReadyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
export class InvalidAggregationException
  extends /*@__PURE__*/ S.TaggedError<InvalidAggregationException>()(
    "InvalidAggregationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryException
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryException>()(
    "InvalidQueryException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResponseException
  extends /*@__PURE__*/ S.TaggedError<InvalidResponseException>()(
    "InvalidResponseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyException>()(
    "MalformedPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotConfiguredException
  extends /*@__PURE__*/ S.TaggedError<NotConfiguredException>()(
    "NotConfiguredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RegistrationCodeValidationException
  extends /*@__PURE__*/ S.TaggedError<RegistrationCodeValidationException>()(
    "RegistrationCodeValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceArn: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceRegistrationFailureException
  extends /*@__PURE__*/ S.TaggedError<ResourceRegistrationFailureException>()(
    "ResourceRegistrationFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
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
export class SqlParseException
  extends /*@__PURE__*/ S.TaggedError<SqlParseException>()(
    "SqlParseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TaskAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TaskAlreadyExistsException>()(
    "TaskAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TopicRuleNotFound
  extends /*@__PURE__*/ S.TaggedError<TopicRuleNotFound>()(
    "TopicRuleNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "UnauthorizedException",
      message: { includes: "Access to topic rule" },
    }),
  ).pipe(C.withNotFoundError) {}
export class TransferAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<TransferAlreadyCompletedException>()(
    "TransferAlreadyCompletedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class TransferConflictException
  extends /*@__PURE__*/ S.TaggedError<TransferConflictException>()(
    "TransferConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class VersionConflictException
  extends /*@__PURE__*/ S.TaggedError<VersionConflictException>()(
    "VersionConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class VersionsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<VersionsLimitExceededException>()(
    "VersionsLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export type SbomValidationStatus = "IN_PROGRESS" | "FAILED" | "SUCCEEDED" | (string & {});
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
export type ThingPrincipalType = "EXCLUSIVE_THING" | "NON_EXCLUSIVE_THING" | (string & {});
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
export type CertificateProviderOperation = "CreateCertificateFromCsr" | (string & {});
export type CertificateProviderAccountDefaultForOperations = CertificateProviderOperation[];
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
export type CommandParameterValueConditionList = CommandParameterValueCondition[];
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
export type ServiceType = "DATA" | "CREDENTIAL_PROVIDER" | "JOBS" | (string & {});
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
export type ApplicationProtocol = "SECURE_MQTT" | "MQTT_WSS" | "HTTPS" | "DEFAULT" | (string & {});
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
export type AggregationTypeName = "Statistics" | "Percentiles" | "Cardinality" | (string & {});
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
export type JobExecutionFailureType = "FAILED" | "REJECTED" | "TIMED_OUT" | "ALL" | (string & {});
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
export type RetryableFailureType = "FAILED" | "TIMED_OUT" | "ALL" | (string & {});
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
export type JobEndBehavior = "STOP_ROLLOUT" | "CANCEL" | "FORCE_CANCEL" | (string & {});
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
export type LogLevel = "DEBUG" | "INFO" | "ERROR" | "WARN" | "DISABLED" | (string & {});
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
export type PackageVersionStatus = "DRAFT" | "PUBLISHED" | "DEPRECATED" | (string & {});
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
export type AuditFrequency = "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY" | (string & {});
export type DayOfMonth = string;
export type DayOfWeek = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | (string & {});
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
  | { stringValue: string; integerValue?: never; doubleValue?: never; booleanValue?: never }
  | { stringValue?: never; integerValue: string; doubleValue?: never; booleanValue?: never }
  | { stringValue?: never; integerValue?: never; doubleValue: string; booleanValue?: never }
  | { stringValue?: never; integerValue?: never; doubleValue?: never; booleanValue: string };
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
export type InfluxDBSecretType = "SecretString" | "SecretBinary" | (string & {});
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
export type AuditCheckConfigurations = { [key: string]: AuditCheckConfiguration | undefined };
export interface DescribeAccountAuditConfigurationResponse {
  roleArn?: string;
  auditNotificationTargetConfigurations?: { [key: string]: AuditNotificationTarget | undefined };
  auditCheckConfigurations?: { [key: string]: AuditCheckConfiguration | undefined };
}
export type FindingId = string;
export interface DescribeAuditFindingRequest {
  findingId: string;
}
export type AuditFindingSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
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
export type AuditCheckToReasonCodeFilter = { [key: string]: string[] | undefined };
export interface AuditMitigationActionsTaskTarget {
  auditTaskId?: string;
  findingIds?: string[];
  auditCheckToReasonCodeFilter?: { [key: string]: string[] | undefined };
}
export type MitigationActionNameList = string[];
export type AuditCheckToActionsMapping = { [key: string]: string[] | undefined };
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
export type AuditTaskStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELED" | (string & {});
export type AuditTaskType = "ON_DEMAND_AUDIT_TASK" | "SCHEDULED_AUDIT_TASK" | (string & {});
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
export type DomainType = "ENDPOINT" | "AWS_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
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
export type EncryptionType = "CUSTOMER_MANAGED_KMS_KEY" | "AWS_OWNED_KMS_KEY" | (string & {});
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
export type DynamicGroupStatus = "ACTIVE" | "BUILDING" | "REBUILDING" | (string & {});
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
export type ModelStatus = "PENDING_BUILD" | "ACTIVE" | "EXPIRED" | (string & {});
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
export type CommandExecutionResultMap = { [key: string]: CommandExecutionResult | undefined };
export type CommandExecutionParameterMap = { [key: string]: CommandParameterValue | undefined };
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
export type ThingIndexingMode = "OFF" | "REGISTRY" | "REGISTRY_AND_SHADOW" | (string & {});
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
export type BehaviorCriteriaType = "STATIC" | "STATISTICAL" | "MACHINE_LEARNING" | (string & {});
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
export type AuditMitigationActionExecutionMetadataList = AuditMitigationActionExecutionMetadata[];
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
export type AuditMitigationActionsTaskMetadataList = AuditMitigationActionsTaskMetadata[];
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
export type DetectMitigationActionExecutionList = DetectMitigationActionExecution[];
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
export type DetectMitigationActionsTaskSummaryList = DetectMitigationActionsTaskSummary[];
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
export type ProvisioningTemplateVersionListing = ProvisioningTemplateVersionSummary[];
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
export type ViolationEventType = "in-alarm" | "alarm-cleared" | "alarm-invalidated" | (string & {});
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
export type ActionType = "PUBLISH" | "SUBSCRIBE" | "RECEIVE" | "CONNECT" | (string & {});
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
export type AuthDecision = "ALLOWED" | "EXPLICIT_DENY" | "IMPLICIT_DENY" | (string & {});
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
  auditNotificationTargetConfigurations?: { [key: string]: AuditNotificationTarget | undefined };
  auditCheckConfigurations?: { [key: string]: AuditCheckConfiguration | undefined };
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
  input: __S(7616, __c238, 0) as any as S.Schema<AcceptCertificateTransferRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AcceptCertificateTransferResponse>,
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
}));

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
  input: __S(7680, __c240, 0) as any as S.Schema<AddThingToBillingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AddThingToBillingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddThingToBillingGroup",
}));

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
  input: __S(7712, __c241, 0) as any as S.Schema<AddThingToThingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AddThingToThingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddThingToThingGroup",
}));

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
  input: __S(7744, __c242, 0) as any as S.Schema<AssociateSbomWithPackageVersionRequest>,
  output: __S(7745, __c242, 1) as any as S.Schema<AssociateSbomWithPackageVersionResponse>,
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
}));

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
  input: __S(7840, __c245, 0) as any as S.Schema<AssociateTargetsWithJobRequest>,
  output: __S(7872, __c246, 0) as any as S.Schema<AssociateTargetsWithJobResponse>,
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
}));

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
  input: __S(7936, __c248, 0) as any as S.Schema<AttachPolicyRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AttachPolicyResponse>,
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
}));

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
  input: __S(7968, __c249, 0) as any as S.Schema<AttachPrincipalPolicyRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AttachPrincipalPolicyResponse>,
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
}));

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
  input: __S(8000, __c250, 0) as any as S.Schema<AttachSecurityProfileRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AttachSecurityProfileResponse>,
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
}));

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
  input: __S(8032, __c251, 0) as any as S.Schema<AttachThingPrincipalRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<AttachThingPrincipalResponse>,
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
}));

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
  input: __S(8064, __c252, 0) as any as S.Schema<CancelAuditMitigationActionsTaskRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CancelAuditMitigationActionsTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAuditMitigationActionsTask",
}));

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
  input: __S(8096, __c253, 0) as any as S.Schema<CancelAuditTaskRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CancelAuditTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAuditTask",
}));

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
  input: __S(8128, __c254, 0) as any as S.Schema<CancelCertificateTransferRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CancelCertificateTransferResponse>,
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
}));

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
  input: __S(8160, __c255, 0) as any as S.Schema<CancelDetectMitigationActionsTaskRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CancelDetectMitigationActionsTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDetectMitigationActionsTask",
}));

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
  input: __S(8192, __c256, 0) as any as S.Schema<CancelJobRequest>,
  output: __S(7872, __c246, 0) as any as S.Schema<CancelJobResponse>,
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
}));

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
  input: __S(8224, __c257, 0) as any as S.Schema<CancelJobExecutionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CancelJobExecutionResponse>,
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
}));

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
  input: __S(8288, __c259, 0) as any as S.Schema<ClearDefaultAuthorizerRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<ClearDefaultAuthorizerResponse>,
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
}));

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
  input: __S(8320, __c260, 0) as any as S.Schema<ConfirmTopicRuleDestinationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<ConfirmTopicRuleDestinationResponse>,
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
}));

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
  input: __S(8352, __c261, 0) as any as S.Schema<CreateAuditSuppressionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CreateAuditSuppressionResponse>,
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
}));

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
  input: __S(8416, __c263, 0) as any as S.Schema<CreateAuthorizerRequest>,
  output: __S(8448, __c264, 0) as any as S.Schema<CreateAuthorizerResponse>,
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
}));

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
  input: __S(8512, __c266, 0) as any as S.Schema<CreateBillingGroupRequest>,
  output: __S(8513, __c266, 1) as any as S.Schema<CreateBillingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingGroup",
}));

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
  input: __S(8576, __c268, 0) as any as S.Schema<CreateCertificateFromCsrRequest>,
  output: __S(8577, __c268, 1) as any as S.Schema<CreateCertificateFromCsrResponse>,
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
}));

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
  input: __S(8608, __c269, 0) as any as S.Schema<CreateCertificateProviderRequest>,
  output: __S(8640, __c270, 0) as any as S.Schema<CreateCertificateProviderResponse>,
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
}));

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
  input: __S(8704, __c272, 0) as any as S.Schema<CreateCommandRequest>,
  output: __S(8705, __c272, 1) as any as S.Schema<CreateCommandResponse>,
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
}));

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
  input: __S(8800, __c275, 0) as any as S.Schema<CreateCustomMetricRequest>,
  output: __S(8832, __c276, 0) as any as S.Schema<CreateCustomMetricResponse>,
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
}));

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
  input: __S(8864, __c277, 0) as any as S.Schema<CreateDimensionRequest>,
  output: __S(8865, __c277, 1) as any as S.Schema<CreateDimensionResponse>,
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
}));

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
  input: __S(8896, __c278, 0) as any as S.Schema<CreateDomainConfigurationRequest>,
  output: __S(8960, __c280, 0) as any as S.Schema<CreateDomainConfigurationResponse>,
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
}));

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
  input: __S(8992, __c281, 0) as any as S.Schema<CreateDynamicThingGroupRequest>,
  output: __S(8993, __c281, 1) as any as S.Schema<CreateDynamicThingGroupResponse>,
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
}));

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
  input: __S(9088, __c284, 0) as any as S.Schema<CreateFleetMetricRequest>,
  output: __S(8832, __c276, 0) as any as S.Schema<CreateFleetMetricResponse>,
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
}));

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
  input: __S(9152, __c286, 0) as any as S.Schema<CreateJobRequest>,
  output: __S(7872, __c246, 0) as any as S.Schema<CreateJobResponse>,
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
}));

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
  input: __S(9344, __c292, 0) as any as S.Schema<CreateJobTemplateRequest>,
  output: __S(9345, __c292, 1) as any as S.Schema<CreateJobTemplateResponse>,
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
}));

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
  input: __S(9376, __c293, 0) as any as S.Schema<CreateKeysAndCertificateRequest>,
  output: __S(9377, __c293, 1) as any as S.Schema<CreateKeysAndCertificateResponse>,
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
}));

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
  input: __S(9440, __c295, 0) as any as S.Schema<CreateMitigationActionRequest>,
  output: __S(9504, __c297, 0) as any as S.Schema<CreateMitigationActionResponse>,
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
}));

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
  input: __S(9537, __c298, 1) as any as S.Schema<CreateOTAUpdateRequest>,
  output: __S(9538, __c298, 2) as any as S.Schema<CreateOTAUpdateResponse>,
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
}));

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
  input: __S(9600, __c300, 0) as any as S.Schema<CreatePackageRequest>,
  output: __S(9601, __c300, 1) as any as S.Schema<CreatePackageResponse>,
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
}));

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
  input: __S(9632, __c301, 0) as any as S.Schema<CreatePackageVersionRequest>,
  output: __S(9633, __c301, 1) as any as S.Schema<CreatePackageVersionResponse>,
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
}));

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
  input: __S(9664, __c302, 0) as any as S.Schema<CreatePolicyRequest>,
  output: __S(9665, __c302, 1) as any as S.Schema<CreatePolicyResponse>,
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
}));

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
  input: __S(9696, __c303, 0) as any as S.Schema<CreatePolicyVersionRequest>,
  output: __S(9697, __c303, 1) as any as S.Schema<CreatePolicyVersionResponse>,
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
}));

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
  input: __S(9728, __c304, 0) as any as S.Schema<CreateProvisioningClaimRequest>,
  output: __S(9729, __c304, 1) as any as S.Schema<CreateProvisioningClaimResponse>,
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
}));

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
  input: __S(9760, __c305, 0) as any as S.Schema<CreateProvisioningTemplateRequest>,
  output: __S(9761, __c305, 1) as any as S.Schema<CreateProvisioningTemplateResponse>,
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
}));

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
  input: __S(9824, __c307, 0) as any as S.Schema<CreateProvisioningTemplateVersionRequest>,
  output: __S(9825, __c307, 1) as any as S.Schema<CreateProvisioningTemplateVersionResponse>,
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
}));

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
  input: __S(9856, __c308, 0) as any as S.Schema<CreateRoleAliasRequest>,
  output: __S(9888, __c309, 0) as any as S.Schema<CreateRoleAliasResponse>,
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
}));

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
  input: __S(9920, __c310, 0) as any as S.Schema<CreateScheduledAuditRequest>,
  output: __S(9952, __c311, 0) as any as S.Schema<CreateScheduledAuditResponse>,
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
}));

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
  input: __S(9984, __c312, 0) as any as S.Schema<CreateSecurityProfileRequest>,
  output: __S(9985, __c312, 1) as any as S.Schema<CreateSecurityProfileResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityProfile",
}));

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
  input: __S(10176, __c318, 0) as any as S.Schema<CreateStreamRequest>,
  output: __S(10240, __c320, 0) as any as S.Schema<CreateStreamResponse>,
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
}));

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
  input: __S(10272, __c321, 0) as any as S.Schema<CreateThingRequest>,
  output: __S(10273, __c321, 1) as any as S.Schema<CreateThingResponse>,
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
}));

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
  input: __S(10304, __c322, 0) as any as S.Schema<CreateThingGroupRequest>,
  output: __S(10305, __c322, 1) as any as S.Schema<CreateThingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThingGroup",
}));

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
  input: __S(10336, __c323, 0) as any as S.Schema<CreateThingTypeRequest>,
  output: __S(10337, __c323, 1) as any as S.Schema<CreateThingTypeResponse>,
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
}));

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
  input: __S(10400, __c325, 0) as any as S.Schema<CreateTopicRuleRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<CreateTopicRuleResponse>,
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
}));

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
  input: __S(10532, __c329, 4) as any as S.Schema<CreateTopicRuleDestinationRequest>,
  output: __S(10561, __c330, 1) as any as S.Schema<CreateTopicRuleDestinationResponse>,
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
}));

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
  input: __S(10624, __c332, 0) as any as S.Schema<DeleteAccountAuditConfigurationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteAccountAuditConfigurationResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAuditConfiguration",
}));

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
  input: __S(10656, __c333, 0) as any as S.Schema<DeleteAuditSuppressionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteAuditSuppressionResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuditSuppression",
}));

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
  input: __S(10688, __c334, 0) as any as S.Schema<DeleteAuthorizerRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteAuthorizerResponse>,
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
}));

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
  input: __S(10720, __c335, 0) as any as S.Schema<DeleteBillingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteBillingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingGroup",
}));

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
  input: __S(10752, __c336, 0) as any as S.Schema<DeleteCACertificateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteCACertificateResponse>,
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
}));

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
  input: __S(10784, __c337, 0) as any as S.Schema<DeleteCertificateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteCertificateResponse>,
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
}));

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
  input: __S(10816, __c338, 0) as any as S.Schema<DeleteCertificateProviderRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteCertificateProviderResponse>,
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
}));

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
  input: __S(10848, __c339, 0) as any as S.Schema<DeleteCommandRequest>,
  output: __S(10849, __c339, 1) as any as S.Schema<DeleteCommandResponse>,
  errors: [ConflictException, InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommand",
}));

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
  input: __S(10880, __c340, 0) as any as S.Schema<DeleteCommandExecutionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteCommandExecutionResponse>,
  errors: [ConflictException, InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommandExecution",
}));

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
  input: __S(10912, __c341, 0) as any as S.Schema<DeleteCustomMetricRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteCustomMetricResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomMetric",
}));

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
  input: __S(10944, __c342, 0) as any as S.Schema<DeleteDimensionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteDimensionResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDimension",
}));

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
  input: __S(10976, __c343, 0) as any as S.Schema<DeleteDomainConfigurationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteDomainConfigurationResponse>,
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
}));

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
  input: __S(11008, __c344, 0) as any as S.Schema<DeleteDynamicThingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteDynamicThingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDynamicThingGroup",
}));

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
  input: __S(11040, __c345, 0) as any as S.Schema<DeleteFleetMetricRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteFleetMetricResponse>,
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
}));

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
  input: __S(11072, __c346, 0) as any as S.Schema<DeleteJobRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteJobResponse>,
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
}));

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
  input: __S(11104, __c347, 0) as any as S.Schema<DeleteJobExecutionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteJobExecutionResponse>,
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
}));

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
  input: __S(11136, __c348, 0) as any as S.Schema<DeleteJobTemplateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteJobTemplateResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteMitigationActionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteMitigationActionResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMitigationAction",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<DeleteOTAUpdateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteOTAUpdateResponse>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<DeletePackageRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeletePackageResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackage",
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<DeletePackageVersionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeletePackageVersionResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackageVersion",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<DeletePolicyRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeletePolicyResponse>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<DeletePolicyVersionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeletePolicyVersionResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<DeleteProvisioningTemplateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteProvisioningTemplateResponse>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<DeleteProvisioningTemplateVersionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteProvisioningTemplateVersionResponse>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<DeleteRegistrationCodeRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteRegistrationCodeResponse>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<DeleteRoleAliasRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteRoleAliasResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<DeleteScheduledAuditRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteScheduledAuditResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAudit",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<DeleteSecurityProfileRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteSecurityProfileResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityProfile",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<DeleteStreamRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteStreamResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeleteThingRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteThingResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<DeleteThingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteThingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingGroup",
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DeleteThingTypeRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteThingTypeResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteTopicRuleRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteTopicRuleResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DeleteTopicRuleDestinationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteTopicRuleDestinationResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DeleteV2LoggingLevelRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeleteV2LoggingLevelResponse>,
  errors: [InternalException, InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteV2LoggingLevel",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeprecateThingTypeRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DeprecateThingTypeResponse>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DescribeAccountAuditConfigurationRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<DescribeAccountAuditConfigurationResponse>,
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAuditConfiguration",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DescribeAuditFindingRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<DescribeAuditFindingResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditFinding",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DescribeAuditMitigationActionsTaskRequest>,
  output: __S(803, __c25, 3) as any as S.Schema<DescribeAuditMitigationActionsTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditMitigationActionsTask",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DescribeAuditSuppressionRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<DescribeAuditSuppressionResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditSuppression",
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DescribeAuditTaskRequest>,
  output: __S(932, __c29, 4) as any as S.Schema<DescribeAuditTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditTask",
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DescribeAuthorizerRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<DescribeAuthorizerResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DescribeBillingGroupRequest>,
  output: __S(1026, __c32, 2) as any as S.Schema<DescribeBillingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBillingGroup",
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DescribeCACertificateRequest>,
  output: __S(1058, __c33, 2) as any as S.Schema<DescribeCACertificateResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<DescribeCertificateRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<DescribeCertificateResponse>,
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
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<DescribeCertificateProviderRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<DescribeCertificateProviderResponse>,
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
}));

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
  input: __S(1216, __c38, 0) as any as S.Schema<DescribeCustomMetricRequest>,
  output: __S(1248, __c39, 0) as any as S.Schema<DescribeCustomMetricResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomMetric",
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<DescribeDefaultAuthorizerRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<DescribeDefaultAuthorizerResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<DescribeDetectMitigationActionsTaskRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DescribeDetectMitigationActionsTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetectMitigationActionsTask",
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<DescribeDimensionRequest>,
  output: __S(1440, __c45, 0) as any as S.Schema<DescribeDimensionResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDimension",
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<DescribeDomainConfigurationRequest>,
  output: __S(1475, __c46, 3) as any as S.Schema<DescribeDomainConfigurationResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<DescribeEncryptionConfigurationRequest>,
  output: __S(1506, __c47, 2) as any as S.Schema<DescribeEncryptionConfigurationResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<DescribeEndpointRequest>,
  output: __S(1537, __c48, 1) as any as S.Schema<DescribeEndpointResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoint",
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<DescribeEventConfigurationsRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<DescribeEventConfigurationsResponse>,
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventConfigurations",
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DescribeFleetMetricRequest>,
  output: __S(1633, __c51, 1) as any as S.Schema<DescribeFleetMetricResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<DescribeIndexRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<DescribeIndexResponse>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<DescribeJobRequest>,
  output: __S(1701, __c53, 5) as any as S.Schema<DescribeJobResponse>,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<DescribeJobExecutionRequest>,
  output: __S(1731, __c54, 3) as any as S.Schema<DescribeJobExecutionResponse>,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobExecution",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<DescribeJobTemplateRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<DescribeJobTemplateResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobTemplate",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<DescribeManagedJobTemplateRequest>,
  output: __S(1795, __c56, 3) as any as S.Schema<DescribeManagedJobTemplateResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedJobTemplate",
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<DescribeMitigationActionRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<DescribeMitigationActionResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMitigationAction",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DescribeProvisioningTemplateRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<DescribeProvisioningTemplateResponse>,
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
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<DescribeProvisioningTemplateVersionRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<DescribeProvisioningTemplateVersionResponse>,
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
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<DescribeRoleAliasRequest>,
  output: __S(1922, __c60, 2) as any as S.Schema<DescribeRoleAliasResponse>,
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
}));

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
  input: __S(1952, __c61, 0) as any as S.Schema<DescribeScheduledAuditRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<DescribeScheduledAuditResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledAudit",
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<DescribeSecurityProfileRequest>,
  output: __S(2016, __c63, 0) as any as S.Schema<DescribeSecurityProfileResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityProfile",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<DescribeStreamRequest>,
  output: __S(2050, __c64, 2) as any as S.Schema<DescribeStreamResponse>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<DescribeThingRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<DescribeThingResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<DescribeThingGroupRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<DescribeThingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingGroup",
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<DescribeThingRegistrationTaskRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<DescribeThingRegistrationTaskResponse>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<DescribeThingTypeRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<DescribeThingTypeResponse>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<DetachPolicyRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DetachPolicyResponse>,
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
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<DetachPrincipalPolicyRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DetachPrincipalPolicyResponse>,
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
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<DetachSecurityProfileRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DetachSecurityProfileResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachSecurityProfile",
}));

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
  input: __S(2368, __c74, 0) as any as S.Schema<DetachThingPrincipalRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DetachThingPrincipalResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<DisableTopicRuleRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DisableTopicRuleResponse>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<DisassociateSbomFromPackageVersionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<DisassociateSbomFromPackageVersionResponse>,
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
}));

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
  input: __S(2464, __c77, 0) as any as S.Schema<EnableTopicRuleRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<EnableTopicRuleResponse>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<GetBehaviorModelTrainingSummariesRequest>,
  output: __S(2499, __c78, 3) as any as S.Schema<GetBehaviorModelTrainingSummariesResponse>,
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
  input: __S(2530, __c79, 2) as any as S.Schema<GetBucketsAggregationRequest>,
  output: __S(2533, __c79, 5) as any as S.Schema<GetBucketsAggregationResponse>,
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
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<GetCardinalityRequest>,
  output: __S(2561, __c80, 1) as any as S.Schema<GetCardinalityResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<GetCommandRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<GetCommandResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommand",
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<GetCommandExecutionRequest>,
  output: __S(2629, __c82, 5) as any as S.Schema<GetCommandExecutionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommandExecution",
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<GetEffectivePoliciesRequest>,
  output: __S(2659, __c83, 3) as any as S.Schema<GetEffectivePoliciesResponse>,
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
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<GetIndexingConfigurationRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<GetIndexingConfigurationResponse>,
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
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<GetJobDocumentRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<GetJobDocumentResponse>,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobDocument",
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<GetLoggingOptionsRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<GetLoggingOptionsResponse>,
  errors: [InternalException, InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingOptions",
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<GetOTAUpdateRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<GetOTAUpdateResponse>,
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
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<GetPackageRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<GetPackageResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackage",
}));

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
  input: __S(2880, __c90, 0) as any as S.Schema<GetPackageConfigurationRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<GetPackageConfigurationResponse>,
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageConfiguration",
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<GetPackageVersionRequest>,
  output: __S(2945, __c92, 1) as any as S.Schema<GetPackageVersionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageVersion",
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<GetPercentilesRequest>,
  output: __S(2979, __c93, 3) as any as S.Schema<GetPercentilesResponse>,
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
}));

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
  input: __S(3008, __c94, 0) as any as S.Schema<GetPolicyRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<GetPolicyResponse>,
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
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<GetPolicyVersionRequest>,
  output: __S(3041, __c95, 1) as any as S.Schema<GetPolicyVersionResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<GetRegistrationCodeRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<GetRegistrationCodeResponse>,
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
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<GetStatisticsRequest>,
  output: __S(3106, __c97, 2) as any as S.Schema<GetStatisticsResponse>,
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
}));

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
  input: __S(3136, __c98, 0) as any as S.Schema<GetThingConnectivityDataRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<GetThingConnectivityDataResponse>,
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
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<GetTopicRuleRequest>,
  output: __S(3170, __c99, 2) as any as S.Schema<GetTopicRuleResponse>,
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
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<GetTopicRuleDestinationRequest>,
  output: __S(10561, __c330, 1) as any as S.Schema<GetTopicRuleDestinationResponse>,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopicRuleDestination",
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<GetV2LoggingOptionsRequest>,
  output: __S(3233, __c101, 1) as any as S.Schema<GetV2LoggingOptionsResponse>,
  errors: [InternalException, NotConfiguredException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetV2LoggingOptions",
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<ListActiveViolationsRequest>,
  output: __S(3299, __c103, 3) as any as S.Schema<ListActiveViolationsResponse>,
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
  input: __S(3360, __c105, 0) as any as S.Schema<ListAttachedPoliciesRequest>,
  output: __S(3392, __c106, 0) as any as S.Schema<ListAttachedPoliciesResponse>,
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
  input: __S(3456, __c108, 0) as any as S.Schema<ListAuditFindingsRequest>,
  output: __S(3458, __c108, 2) as any as S.Schema<ListAuditFindingsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3488, __c109, 0) as any as S.Schema<ListAuditMitigationActionsExecutionsRequest>,
  output: __S(3491, __c109, 3) as any as S.Schema<ListAuditMitigationActionsExecutionsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3520, __c110, 0) as any as S.Schema<ListAuditMitigationActionsTasksRequest>,
  output: __S(3523, __c110, 3) as any as S.Schema<ListAuditMitigationActionsTasksResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3552, __c111, 0) as any as S.Schema<ListAuditSuppressionsRequest>,
  output: __S(3555, __c111, 3) as any as S.Schema<ListAuditSuppressionsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3584, __c112, 0) as any as S.Schema<ListAuditTasksRequest>,
  output: __S(3587, __c112, 3) as any as S.Schema<ListAuditTasksResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3616, __c113, 0) as any as S.Schema<ListAuthorizersRequest>,
  output: __S(3618, __c113, 2) as any as S.Schema<ListAuthorizersResponse>,
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
  input: __S(3648, __c114, 0) as any as S.Schema<ListBillingGroupsRequest>,
  output: __S(3649, __c114, 1) as any as S.Schema<ListBillingGroupsResponse>,
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
  input: __S(3680, __c115, 0) as any as S.Schema<ListCACertificatesRequest>,
  output: __S(3683, __c115, 3) as any as S.Schema<ListCACertificatesResponse>,
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
  input: __S(3712, __c116, 0) as any as S.Schema<ListCertificateProvidersRequest>,
  output: __S(3714, __c116, 2) as any as S.Schema<ListCertificateProvidersResponse>,
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
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<ListCertificatesRequest>,
  output: __S(3778, __c118, 2) as any as S.Schema<ListCertificatesResponse>,
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
  input: __S(3808, __c119, 0) as any as S.Schema<ListCertificatesByCARequest>,
  output: __S(3778, __c118, 2) as any as S.Schema<ListCertificatesByCAResponse>,
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
  input: __S(3841, __c120, 1) as any as S.Schema<ListCommandExecutionsRequest>,
  output: __S(3844, __c120, 4) as any as S.Schema<ListCommandExecutionsResponse>,
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
  input: __S(3872, __c121, 0) as any as S.Schema<ListCommandsRequest>,
  output: __S(3875, __c121, 3) as any as S.Schema<ListCommandsResponse>,
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
  input: __S(3904, __c122, 0) as any as S.Schema<ListCustomMetricsRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<ListCustomMetricsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3936, __c123, 0) as any as S.Schema<ListDetectMitigationActionsExecutionsRequest>,
  output: __S(3939, __c123, 3) as any as S.Schema<ListDetectMitigationActionsExecutionsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(3968, __c124, 0) as any as S.Schema<ListDetectMitigationActionsTasksRequest>,
  output: __S(3970, __c124, 2) as any as S.Schema<ListDetectMitigationActionsTasksResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(4000, __c125, 0) as any as S.Schema<ListDimensionsRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<ListDimensionsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(4032, __c126, 0) as any as S.Schema<ListDomainConfigurationsRequest>,
  output: __S(4035, __c126, 3) as any as S.Schema<ListDomainConfigurationsResponse>,
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
  input: __S(4064, __c127, 0) as any as S.Schema<ListFleetMetricsRequest>,
  output: __S(4066, __c127, 2) as any as S.Schema<ListFleetMetricsResponse>,
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
  input: __S(4096, __c128, 0) as any as S.Schema<ListIndicesRequest>,
  output: __S(4097, __c128, 1) as any as S.Schema<ListIndicesResponse>,
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
  input: __S(4128, __c129, 0) as any as S.Schema<ListJobExecutionsForJobRequest>,
  output: __S(4131, __c129, 3) as any as S.Schema<ListJobExecutionsForJobResponse>,
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
  input: __S(4192, __c131, 0) as any as S.Schema<ListJobExecutionsForThingRequest>,
  output: __S(4195, __c131, 3) as any as S.Schema<ListJobExecutionsForThingResponse>,
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
  input: __S(4224, __c132, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(4227, __c132, 3) as any as S.Schema<ListJobsResponse>,
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
  input: __S(4256, __c133, 0) as any as S.Schema<ListJobTemplatesRequest>,
  output: __S(4259, __c133, 3) as any as S.Schema<ListJobTemplatesResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(4288, __c134, 0) as any as S.Schema<ListManagedJobTemplatesRequest>,
  output: __S(4291, __c134, 3) as any as S.Schema<ListManagedJobTemplatesResponse>,
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
  input: __S(4320, __c135, 0) as any as S.Schema<ListMetricValuesRequest>,
  output: __S(4323, __c135, 3) as any as S.Schema<ListMetricValuesResponse>,
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
  input: __S(4352, __c136, 0) as any as S.Schema<ListMitigationActionsRequest>,
  output: __S(4355, __c136, 3) as any as S.Schema<ListMitigationActionsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(4384, __c137, 0) as any as S.Schema<ListOTAUpdatesRequest>,
  output: __S(4387, __c137, 3) as any as S.Schema<ListOTAUpdatesResponse>,
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
  input: __S(4416, __c138, 0) as any as S.Schema<ListOutgoingCertificatesRequest>,
  output: __S(4419, __c138, 3) as any as S.Schema<ListOutgoingCertificatesResponse>,
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
  input: __S(4448, __c139, 0) as any as S.Schema<ListPackagesRequest>,
  output: __S(4451, __c139, 3) as any as S.Schema<ListPackagesResponse>,
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
  input: __S(4480, __c140, 0) as any as S.Schema<ListPackageVersionsRequest>,
  output: __S(4483, __c140, 3) as any as S.Schema<ListPackageVersionsResponse>,
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
  input: __S(4512, __c141, 0) as any as S.Schema<ListPoliciesRequest>,
  output: __S(3392, __c106, 0) as any as S.Schema<ListPoliciesResponse>,
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
  input: __S(4544, __c142, 0) as any as S.Schema<ListPolicyPrincipalsRequest>,
  output: __S(4545, __c142, 1) as any as S.Schema<ListPolicyPrincipalsResponse>,
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
  input: __S(4576, __c143, 0) as any as S.Schema<ListPolicyVersionsRequest>,
  output: __S(4579, __c143, 3) as any as S.Schema<ListPolicyVersionsResponse>,
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
}));

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
  input: __S(4608, __c144, 0) as any as S.Schema<ListPrincipalPoliciesRequest>,
  output: __S(3392, __c106, 0) as any as S.Schema<ListPrincipalPoliciesResponse>,
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
  input: __S(4640, __c145, 0) as any as S.Schema<ListPrincipalThingsRequest>,
  output: __S(4672, __c146, 0) as any as S.Schema<ListPrincipalThingsResponse>,
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
  input: __S(4704, __c147, 0) as any as S.Schema<ListPrincipalThingsV2Request>,
  output: __S(4707, __c147, 3) as any as S.Schema<ListPrincipalThingsV2Response>,
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
  input: __S(4736, __c148, 0) as any as S.Schema<ListProvisioningTemplatesRequest>,
  output: __S(4739, __c148, 3) as any as S.Schema<ListProvisioningTemplatesResponse>,
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
  input: __S(4768, __c149, 0) as any as S.Schema<ListProvisioningTemplateVersionsRequest>,
  output: __S(4771, __c149, 3) as any as S.Schema<ListProvisioningTemplateVersionsResponse>,
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
  input: __S(4800, __c150, 0) as any as S.Schema<ListRelatedResourcesForAuditFindingRequest>,
  output: __S(4801, __c150, 1) as any as S.Schema<ListRelatedResourcesForAuditFindingResponse>,
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
  input: __S(4832, __c151, 0) as any as S.Schema<ListRoleAliasesRequest>,
  output: __S(4833, __c151, 1) as any as S.Schema<ListRoleAliasesResponse>,
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
  input: __S(4864, __c152, 0) as any as S.Schema<ListSbomValidationResultsRequest>,
  output: __S(4867, __c152, 3) as any as S.Schema<ListSbomValidationResultsResponse>,
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
  input: __S(4896, __c153, 0) as any as S.Schema<ListScheduledAuditsRequest>,
  output: __S(4899, __c153, 3) as any as S.Schema<ListScheduledAuditsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(4928, __c154, 0) as any as S.Schema<ListSecurityProfilesRequest>,
  output: __S(4930, __c154, 2) as any as S.Schema<ListSecurityProfilesResponse>,
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
  input: __S(4992, __c156, 0) as any as S.Schema<ListSecurityProfilesForTargetRequest>,
  output: __S(4995, __c156, 3) as any as S.Schema<ListSecurityProfilesForTargetResponse>,
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
  input: __S(5056, __c158, 0) as any as S.Schema<ListStreamsRequest>,
  output: __S(5059, __c158, 3) as any as S.Schema<ListStreamsResponse>,
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
  input: __S(5088, __c159, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(5089, __c159, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "tags" } as const,
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
  input: __S(5120, __c160, 0) as any as S.Schema<ListTargetsForPolicyRequest>,
  output: __S(5121, __c160, 1) as any as S.Schema<ListTargetsForPolicyResponse>,
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
  input: __S(5152, __c161, 0) as any as S.Schema<ListTargetsForSecurityProfileRequest>,
  output: __S(5154, __c161, 2) as any as S.Schema<ListTargetsForSecurityProfileResponse>,
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
  input: __S(5184, __c162, 0) as any as S.Schema<ListThingGroupsRequest>,
  output: __S(5216, __c163, 0) as any as S.Schema<ListThingGroupsResponse>,
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
  input: __S(5248, __c164, 0) as any as S.Schema<ListThingGroupsForThingRequest>,
  output: __S(5216, __c163, 0) as any as S.Schema<ListThingGroupsForThingResponse>,
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
  input: __S(5280, __c165, 0) as any as S.Schema<ListThingPrincipalsRequest>,
  output: __S(5281, __c165, 1) as any as S.Schema<ListThingPrincipalsResponse>,
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
  input: __S(5312, __c166, 0) as any as S.Schema<ListThingPrincipalsV2Request>,
  output: __S(5315, __c166, 3) as any as S.Schema<ListThingPrincipalsV2Response>,
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
  input: __S(5344, __c167, 0) as any as S.Schema<ListThingRegistrationTaskReportsRequest>,
  output: __S(5345, __c167, 1) as any as S.Schema<ListThingRegistrationTaskReportsResponse>,
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
  input: __S(5376, __c168, 0) as any as S.Schema<ListThingRegistrationTasksRequest>,
  output: __S(5377, __c168, 1) as any as S.Schema<ListThingRegistrationTasksResponse>,
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
  input: __S(5408, __c169, 0) as any as S.Schema<ListThingsRequest>,
  output: __S(5411, __c169, 3) as any as S.Schema<ListThingsResponse>,
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
  input: __S(5440, __c170, 0) as any as S.Schema<ListThingsInBillingGroupRequest>,
  output: __S(4672, __c146, 0) as any as S.Schema<ListThingsInBillingGroupResponse>,
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
  input: __S(5472, __c171, 0) as any as S.Schema<ListThingsInThingGroupRequest>,
  output: __S(4672, __c146, 0) as any as S.Schema<ListThingsInThingGroupResponse>,
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
  input: __S(5504, __c172, 0) as any as S.Schema<ListThingTypesRequest>,
  output: __S(5507, __c172, 3) as any as S.Schema<ListThingTypesResponse>,
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
  input: __S(5536, __c173, 0) as any as S.Schema<ListTopicRuleDestinationsRequest>,
  output: __S(5539, __c173, 3) as any as S.Schema<ListTopicRuleDestinationsResponse>,
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
  input: __S(5568, __c174, 0) as any as S.Schema<ListTopicRulesRequest>,
  output: __S(5571, __c174, 3) as any as S.Schema<ListTopicRulesResponse>,
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
  input: __S(5600, __c175, 0) as any as S.Schema<ListV2LoggingLevelsRequest>,
  output: __S(5603, __c175, 3) as any as S.Schema<ListV2LoggingLevelsResponse>,
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
  input: __S(5664, __c177, 0) as any as S.Schema<ListViolationEventsRequest>,
  output: __S(5667, __c177, 3) as any as S.Schema<ListViolationEventsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
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
  input: __S(5696, __c178, 0) as any as S.Schema<PutVerificationStateOnViolationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<PutVerificationStateOnViolationResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVerificationStateOnViolation",
}));

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
  input: __S(5728, __c179, 0) as any as S.Schema<RegisterCACertificateRequest>,
  output: __S(5760, __c180, 0) as any as S.Schema<RegisterCACertificateResponse>,
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
}));

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
  input: __S(5792, __c181, 0) as any as S.Schema<RegisterCertificateRequest>,
  output: __S(5760, __c180, 0) as any as S.Schema<RegisterCertificateResponse>,
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
}));

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
  input: __S(5824, __c182, 0) as any as S.Schema<RegisterCertificateWithoutCARequest>,
  output: __S(5760, __c180, 0) as any as S.Schema<RegisterCertificateWithoutCAResponse>,
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
}));

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
  input: __S(5856, __c183, 0) as any as S.Schema<RegisterThingRequest>,
  output: __S(5857, __c183, 1) as any as S.Schema<RegisterThingResponse>,
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
}));

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
  input: __S(5888, __c184, 0) as any as S.Schema<RejectCertificateTransferRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<RejectCertificateTransferResponse>,
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
}));

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
  input: __S(5920, __c185, 0) as any as S.Schema<RemoveThingFromBillingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<RemoveThingFromBillingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveThingFromBillingGroup",
}));

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
  input: __S(5952, __c186, 0) as any as S.Schema<RemoveThingFromThingGroupRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<RemoveThingFromThingGroupResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveThingFromThingGroup",
}));

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
  input: __S(5984, __c187, 0) as any as S.Schema<ReplaceTopicRuleRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<ReplaceTopicRuleResponse>,
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
}));

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
  input: __S(6016, __c188, 0) as any as S.Schema<SearchIndexRequest>,
  output: __S(6022, __c188, 6) as any as S.Schema<SearchIndexResponse>,
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
}));

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
  input: __S(6048, __c189, 0) as any as S.Schema<SetDefaultAuthorizerRequest>,
  output: __S(8448, __c264, 0) as any as S.Schema<SetDefaultAuthorizerResponse>,
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
}));

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
  input: __S(6080, __c190, 0) as any as S.Schema<SetDefaultPolicyVersionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<SetDefaultPolicyVersionResponse>,
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
}));

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
  input: __S(6113, __c191, 1) as any as S.Schema<SetLoggingOptionsRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<SetLoggingOptionsResponse>,
  errors: [InternalException, InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoggingOptions",
}));

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
  input: __S(6144, __c192, 0) as any as S.Schema<SetV2LoggingLevelRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<SetV2LoggingLevelResponse>,
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
}));

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
  input: __S(6176, __c193, 0) as any as S.Schema<SetV2LoggingOptionsRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<SetV2LoggingOptionsResponse>,
  errors: [InternalException, InvalidRequestException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetV2LoggingOptions",
}));

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
  input: __S(6208, __c194, 0) as any as S.Schema<StartAuditMitigationActionsTaskRequest>,
  output: __S(6240, __c195, 0) as any as S.Schema<StartAuditMitigationActionsTaskResponse>,
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
}));

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
  input: __S(6272, __c196, 0) as any as S.Schema<StartDetectMitigationActionsTaskRequest>,
  output: __S(6240, __c195, 0) as any as S.Schema<StartDetectMitigationActionsTaskResponse>,
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
}));

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
  input: __S(6304, __c197, 0) as any as S.Schema<StartOnDemandAuditTaskRequest>,
  output: __S(6240, __c195, 0) as any as S.Schema<StartOnDemandAuditTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOnDemandAuditTask",
}));

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
  input: __S(6336, __c198, 0) as any as S.Schema<StartThingRegistrationTaskRequest>,
  output: __S(6240, __c195, 0) as any as S.Schema<StartThingRegistrationTaskResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThingRegistrationTask",
}));

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
  input: __S(6368, __c199, 0) as any as S.Schema<StopThingRegistrationTaskRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<StopThingRegistrationTaskResponse>,
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
}));

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
  input: __S(6400, __c200, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(6434, __c201, 2) as any as S.Schema<TestAuthorizationRequest>,
  output: __S(6439, __c201, 7) as any as S.Schema<TestAuthorizationResponse>,
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
}));

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
  input: __S(6467, __c202, 3) as any as S.Schema<TestInvokeAuthorizerRequest>,
  output: __S(6468, __c202, 4) as any as S.Schema<TestInvokeAuthorizerResponse>,
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
}));

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
  input: __S(6496, __c203, 0) as any as S.Schema<TransferCertificateRequest>,
  output: __S(6497, __c203, 1) as any as S.Schema<TransferCertificateResponse>,
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
}));

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
  input: __S(6528, __c204, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(6560, __c205, 0) as any as S.Schema<UpdateAccountAuditConfigurationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateAccountAuditConfigurationResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountAuditConfiguration",
}));

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
  input: __S(6592, __c206, 0) as any as S.Schema<UpdateAuditSuppressionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateAuditSuppressionResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuditSuppression",
}));

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
  input: __S(6624, __c207, 0) as any as S.Schema<UpdateAuthorizerRequest>,
  output: __S(8448, __c264, 0) as any as S.Schema<UpdateAuthorizerResponse>,
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
}));

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
  input: __S(6656, __c208, 0) as any as S.Schema<UpdateBillingGroupRequest>,
  output: __S(6688, __c209, 0) as any as S.Schema<UpdateBillingGroupResponse>,
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
}));

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
  input: __S(6720, __c210, 0) as any as S.Schema<UpdateCACertificateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateCACertificateResponse>,
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
}));

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
  input: __S(6752, __c211, 0) as any as S.Schema<UpdateCertificateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateCertificateResponse>,
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
}));

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
  input: __S(6784, __c212, 0) as any as S.Schema<UpdateCertificateProviderRequest>,
  output: __S(8640, __c270, 0) as any as S.Schema<UpdateCertificateProviderResponse>,
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
}));

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
  input: __S(6816, __c213, 0) as any as S.Schema<UpdateCommandRequest>,
  output: __S(6817, __c213, 1) as any as S.Schema<UpdateCommandResponse>,
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
}));

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
  input: __S(6848, __c214, 0) as any as S.Schema<UpdateCustomMetricRequest>,
  output: __S(1248, __c39, 0) as any as S.Schema<UpdateCustomMetricResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomMetric",
}));

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
  input: __S(6880, __c215, 0) as any as S.Schema<UpdateDimensionRequest>,
  output: __S(1440, __c45, 0) as any as S.Schema<UpdateDimensionResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDimension",
}));

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
  input: __S(6912, __c216, 0) as any as S.Schema<UpdateDomainConfigurationRequest>,
  output: __S(8960, __c280, 0) as any as S.Schema<UpdateDomainConfigurationResponse>,
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
}));

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
  input: __S(6944, __c217, 0) as any as S.Schema<UpdateDynamicThingGroupRequest>,
  output: __S(6688, __c209, 0) as any as S.Schema<UpdateDynamicThingGroupResponse>,
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
}));

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
  input: __S(6976, __c218, 0) as any as S.Schema<UpdateEncryptionConfigurationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateEncryptionConfigurationResponse>,
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
}));

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
  input: __S(7008, __c219, 0) as any as S.Schema<UpdateEventConfigurationsRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateEventConfigurationsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventConfigurations",
}));

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
  input: __S(7040, __c220, 0) as any as S.Schema<UpdateFleetMetricRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateFleetMetricResponse>,
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
}));

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
  input: __S(7072, __c221, 0) as any as S.Schema<UpdateIndexingConfigurationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateIndexingConfigurationResponse>,
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
}));

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
  input: __S(7104, __c222, 0) as any as S.Schema<UpdateJobRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateJobResponse>,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
}));

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
  input: __S(7136, __c223, 0) as any as S.Schema<UpdateMitigationActionRequest>,
  output: __S(9504, __c297, 0) as any as S.Schema<UpdateMitigationActionResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMitigationAction",
}));

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
  input: __S(7168, __c224, 0) as any as S.Schema<UpdatePackageRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdatePackageResponse>,
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
}));

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
  input: __S(7200, __c225, 0) as any as S.Schema<UpdatePackageConfigurationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdatePackageConfigurationResponse>,
  errors: [ConflictException, InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackageConfiguration",
}));

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
  input: __S(7232, __c226, 0) as any as S.Schema<UpdatePackageVersionRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdatePackageVersionResponse>,
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
}));

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
  input: __S(7264, __c227, 0) as any as S.Schema<UpdateProvisioningTemplateRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateProvisioningTemplateResponse>,
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
}));

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
  input: __S(7296, __c228, 0) as any as S.Schema<UpdateRoleAliasRequest>,
  output: __S(9888, __c309, 0) as any as S.Schema<UpdateRoleAliasResponse>,
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
}));

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
  input: __S(7328, __c229, 0) as any as S.Schema<UpdateScheduledAuditRequest>,
  output: __S(9952, __c311, 0) as any as S.Schema<UpdateScheduledAuditResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAudit",
}));

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
  input: __S(7360, __c230, 0) as any as S.Schema<UpdateSecurityProfileRequest>,
  output: __S(2016, __c63, 0) as any as S.Schema<UpdateSecurityProfileResponse>,
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
}));

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
  input: __S(7392, __c231, 0) as any as S.Schema<UpdateStreamRequest>,
  output: __S(10240, __c320, 0) as any as S.Schema<UpdateStreamResponse>,
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
}));

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
  input: __S(7424, __c232, 0) as any as S.Schema<UpdateThingRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateThingResponse>,
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
}));

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
  input: __S(7456, __c233, 0) as any as S.Schema<UpdateThingGroupRequest>,
  output: __S(6688, __c209, 0) as any as S.Schema<UpdateThingGroupResponse>,
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
}));

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
  input: __S(7488, __c234, 0) as any as S.Schema<UpdateThingGroupsForThingRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateThingGroupsForThingResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingGroupsForThing",
}));

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
  input: __S(7520, __c235, 0) as any as S.Schema<UpdateThingTypeRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateThingTypeResponse>,
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
}));

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
  input: __S(7552, __c236, 0) as any as S.Schema<UpdateTopicRuleDestinationRequest>,
  output: __S(7648, __c239, 0) as any as S.Schema<UpdateTopicRuleDestinationResponse>,
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
}));

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
  input: __S(7584, __c237, 0) as any as S.Schema<ValidateSecurityProfileBehaviorsRequest>,
  output: __S(7587, __c237, 3) as any as S.Schema<ValidateSecurityProfileBehaviorsResponse>,
  errors: [InternalFailureException, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSecurityProfileBehaviors",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionName: S.String.pipe(T.HttpLabel("actionName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/mitigationactions/actions/{actionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMitigationActionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          otaUpdateId: S.String.pipe(T.HttpLabel("otaUpdateId")),
          deleteStream: S.optional(S.Boolean).pipe(T.HttpQuery("deleteStream")),
          forceDeleteAWSJob: S.optional(S.Boolean).pipe(T.HttpQuery("forceDeleteAWSJob")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/otaUpdates/{otaUpdateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOTAUpdateRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/packages/{packageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackageRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/packages/{packageName}/versions/{versionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackageVersionRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePolicyRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          policyVersionId: S.String.pipe(T.HttpLabel("policyVersionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/policies/{policyName}/version/{policyVersionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePolicyVersionRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String.pipe(T.HttpLabel("templateName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/provisioning-templates/{templateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProvisioningTemplateRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String.pipe(T.HttpLabel("templateName")),
          versionId: S.Number.pipe(T.HttpLabel("versionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/provisioning-templates/{templateName}/versions/{versionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProvisioningTemplateVersionRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/registrationcode" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRegistrationCodeRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleAlias: S.String.pipe(T.HttpLabel("roleAlias")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/role-aliases/{roleAlias}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRoleAliasRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/audit/scheduledaudits/{scheduledAuditName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScheduledAuditRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/security-profiles/{securityProfileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSecurityProfileRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ streamId: S.String.pipe(T.HttpLabel("streamId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/streams/{streamId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteStreamRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/things/{thingName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteThingRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteThingGroupRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/thing-types/{thingTypeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteThingTypeRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rules/{ruleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTopicRuleRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/destinations/{arn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTopicRuleDestinationRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetType: S.String.pipe(T.HttpQuery("targetType")),
          targetName: S.String.pipe(T.HttpQuery("targetName")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v2LoggingLevel" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteV2LoggingLevelRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")),
          undoDeprecate: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/thing-types/{thingTypeName}/deprecate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeprecateThingTypeRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAccountAuditConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.optional(S.String),
          auditNotificationTargetConfigurations: S.optional(__S(673, __c21, 1)),
          auditCheckConfigurations: S.optional(__S(676, __c21, 4)),
        }),
      ).annotate({ identifier: "DescribeAccountAuditConfigurationResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AuditNotificationTarget" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(672, __c21, 0).pipe(S.optional));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), configuration: S.optional(__S(674, __c21, 2)) }),
      ).annotate({ identifier: "AuditCheckConfiguration" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(675, __c21, 3).pipe(S.optional));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingId: S.String.pipe(T.HttpLabel("findingId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/findings/{findingId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAuditFindingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ finding: S.optional(__S(736, __c23, 0)) })).annotate({
        identifier: "DescribeAuditFindingResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingId: S.optional(S.String),
          taskId: S.optional(S.String),
          checkName: S.optional(S.String),
          taskStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          findingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          severity: S.optional(S.String),
          nonCompliantResource: S.optional(__S(768, __c24, 0)),
          relatedResources: S.optional(__S(769, __c24, 1)),
          reasonForNonCompliance: S.optional(S.String),
          reasonForNonComplianceCode: S.optional(S.String),
          isSuppressed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AuditFinding" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          resourceIdentifier: S.optional(__S(8386, __c262, 2)),
          additionalInfo: S.optional(__S(8256, __c258, 0)),
        }),
      ).annotate({ identifier: "NonCompliantResource" });
    case 1:
      return S.Array(__S(768, __c24, 0));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/mitigationactions/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAuditMitigationActionsTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          totalFindingsCount: S.optional(S.Number),
          failedFindingsCount: S.optional(S.Number),
          succeededFindingsCount: S.optional(S.Number),
          skippedFindingsCount: S.optional(S.Number),
          canceledFindingsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TaskStatisticsForAuditCheck" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(801, __c25, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          taskStatus: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          taskStatistics: S.optional(__S(802, __c25, 2)),
          target: S.optional(__S(865, __c27, 1)),
          auditCheckToActionsMapping: S.optional(__S(864, __c27, 0)),
          actionsDefinition: S.optional(__S(833, __c26, 1)),
        }),
      ).annotate({ identifier: "DescribeAuditMitigationActionsTaskResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          roleArn: S.optional(S.String),
          actionParams: S.optional(__S(9477, __c296, 5)),
        }),
      ).annotate({ identifier: "MitigationAction" });
    case 1:
      return S.Array(__S(832, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(7904, __c247, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          auditTaskId: S.optional(S.String),
          findingIds: S.optional(__S(7904, __c247, 0)),
          auditCheckToReasonCodeFilter: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "AuditMitigationActionsTaskTarget" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkName: S.String, resourceIdentifier: __S(8386, __c262, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/suppressions/describe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAuditSuppressionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          checkName: S.optional(S.String),
          resourceIdentifier: S.optional(__S(8386, __c262, 2)),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          suppressIndefinitely: S.optional(S.Boolean),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAuditSuppressionResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAuditTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          totalChecks: S.optional(S.Number),
          inProgressChecks: S.optional(S.Number),
          waitingForDataCollectionChecks: S.optional(S.Number),
          compliantChecks: S.optional(S.Number),
          nonCompliantChecks: S.optional(S.Number),
          failedChecks: S.optional(S.Number),
          canceledChecks: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TaskStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          checkRunStatus: S.optional(S.String),
          checkCompliant: S.optional(S.Boolean),
          totalResourcesCount: S.optional(S.Number),
          nonCompliantResourcesCount: S.optional(S.Number),
          suppressedNonCompliantResourcesCount: S.optional(S.Number),
          errorCode: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuditCheckDetails" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(930, __c29, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          taskStatus: S.optional(S.String),
          taskType: S.optional(S.String),
          taskStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          taskStatistics: S.optional(__S(929, __c29, 1)),
          scheduledAuditName: S.optional(S.String),
          auditDetails: S.optional(__S(931, __c29, 3)),
        }),
      ).annotate({ identifier: "DescribeAuditTaskResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ authorizerName: S.String.pipe(T.HttpLabel("authorizerName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/authorizer/{authorizerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAuthorizerRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizerName: S.optional(S.String),
          authorizerArn: S.optional(S.String),
          authorizerFunctionArn: S.optional(S.String),
          tokenKeyName: S.optional(S.String),
          tokenSigningPublicKeys: S.optional(__S(8256, __c258, 0)),
          status: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          signingDisabled: S.optional(S.Boolean),
          enableCachingForHttp: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AuthorizerDescription" });
    case 1:
      return S.suspend(() =>
        S.Struct({ authorizerDescription: S.optional(__S(992, __c31, 0)) }),
      ).annotate({ identifier: "DescribeAuthorizerResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/billing-groups/{billingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBillingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))) }),
      ).annotate({ identifier: "BillingGroupMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.optional(S.String),
          billingGroupId: S.optional(S.String),
          billingGroupArn: S.optional(S.String),
          version: S.optional(S.Number),
          billingGroupProperties: S.optional(__S(8544, __c267, 0)),
          billingGroupMetadata: S.optional(__S(1025, __c32, 1)),
        }),
      ).annotate({ identifier: "DescribeBillingGroupResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cacertificate/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCACertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          status: S.optional(S.String),
          certificatePem: S.optional(S.String),
          ownedBy: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          autoRegistrationStatus: S.optional(S.String),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          customerVersion: S.optional(S.Number),
          generationId: S.optional(S.String),
          validity: S.optional(__S(1088, __c34, 0)),
          certificateMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CACertificateDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificateDescription: S.optional(__S(1057, __c33, 1)),
          registrationConfig: S.optional(__S(1120, __c35, 0)),
        }),
      ).annotate({ identifier: "DescribeCACertificateResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CertificateValidity" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateBody: S.optional(S.String),
          roleArn: S.optional(S.String),
          templateName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistrationConfig" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/certificates/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transferMessage: S.optional(S.String),
          rejectReason: S.optional(S.String),
          transferDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          acceptDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          rejectDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TransferData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          caCertificateId: S.optional(S.String),
          status: S.optional(S.String),
          certificatePem: S.optional(S.String),
          ownedBy: S.optional(S.String),
          previousOwnedBy: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          customerVersion: S.optional(S.Number),
          transferData: S.optional(__S(1153, __c36, 1)),
          generationId: S.optional(S.String),
          validity: S.optional(__S(1088, __c34, 0)),
          certificateMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateDescription" });
    case 3:
      return S.suspend(() =>
        S.Struct({ certificateDescription: S.optional(__S(1154, __c36, 2)) }),
      ).annotate({ identifier: "DescribeCertificateResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateProviderName: S.String.pipe(T.HttpLabel("certificateProviderName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/certificate-providers/{certificateProviderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCertificateProviderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateProviderName: S.optional(S.String),
          certificateProviderArn: S.optional(S.String),
          lambdaFunctionArn: S.optional(S.String),
          accountDefaultForOperations: S.optional(__S(8672, __c271, 0)),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeCertificateProviderResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricName: S.String.pipe(T.HttpLabel("metricName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/custom-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCustomMetricRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.optional(S.String),
          metricArn: S.optional(S.String),
          metricType: S.optional(S.String),
          displayName: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeCustomMetricResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/default-authorizer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDefaultAuthorizerRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detect/mitigationactions/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDetectMitigationActionsTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ taskSummary: S.optional(__S(1345, __c42, 1)) })).annotate({
        identifier: "DescribeDetectMitigationActionsTaskResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionsExecuted: S.optional(S.Number),
          actionsSkipped: S.optional(S.Number),
          actionsFailed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DetectMitigationActionsTaskStatistics" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          taskStatus: S.optional(S.String),
          taskStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          taskEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          target: S.optional(__S(1376, __c43, 0)),
          violationEventOccurrenceRange: S.optional(__S(1377, __c43, 1)),
          onlyActiveViolationsIncluded: S.optional(S.Boolean),
          suppressedAlertsIncluded: S.optional(S.Boolean),
          actionsDefinition: S.optional(__S(833, __c26, 1)),
          taskStatistics: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "DetectMitigationActionsTaskSummary" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          violationIds: S.optional(__S(7904, __c247, 0)),
          securityProfileName: S.optional(S.String),
          behaviorName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DetectMitigationActionsTaskTarget" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ViolationEventOccurrenceRange" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/dimensions/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDimensionRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          type: S.optional(S.String),
          stringValues: S.optional(__S(7904, __c247, 0)),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeDimensionResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.String.pipe(T.HttpLabel("domainConfigurationName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainConfigurations/{domainConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDomainConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serverCertificateArn: S.optional(S.String),
          serverCertificateStatus: S.optional(S.String),
          serverCertificateStatusDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerCertificateSummary" });
    case 2:
      return S.Array(__S(1473, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.optional(S.String),
          domainConfigurationArn: S.optional(S.String),
          domainName: S.optional(S.String),
          serverCertificates: S.optional(__S(1474, __c46, 2)),
          authorizerConfig: S.optional(__S(8928, __c279, 0)),
          domainConfigurationStatus: S.optional(S.String),
          serviceType: S.optional(S.String),
          domainType: S.optional(S.String),
          lastStatusChangeDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tlsConfig: S.optional(__S(8929, __c279, 1)),
          serverCertificateConfig: S.optional(__S(8930, __c279, 2)),
          authenticationType: S.optional(S.String),
          applicationProtocol: S.optional(S.String),
          clientCertificateConfig: S.optional(__S(8931, __c279, 3)),
        }),
      ).annotate({ identifier: "DescribeDomainConfigurationResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/encryption-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeEncryptionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configurationStatus: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          encryptionType: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          kmsAccessRoleArn: S.optional(S.String),
          configurationDetails: S.optional(__S(1505, __c47, 1)),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeEncryptionConfigurationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ endpointType: S.optional(S.String).pipe(T.HttpQuery("endpointType")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/endpoint" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ endpointAddress: S.optional(S.String) })).annotate({
        identifier: "DescribeEndpointResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/event-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeEventConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventConfigurations: S.optional(__S(1601, __c50, 1)),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeEventConfigurationsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "Configuration",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(1600, __c50, 0).pipe(S.optional));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricName: S.String.pipe(T.HttpLabel("metricName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/fleet-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFleetMetricRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metricName: S.optional(S.String),
          queryString: S.optional(S.String),
          aggregationType: S.optional(__S(9120, __c285, 0)),
          period: S.optional(S.Number),
          aggregationField: S.optional(S.String),
          description: S.optional(S.String),
          queryVersion: S.optional(S.String),
          indexName: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          unit: S.optional(S.String),
          version: S.optional(S.Number),
          metricArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeFleetMetricResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ indexName: S.String.pipe(T.HttpLabel("indexName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/indices/{indexName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          indexName: S.optional(S.String),
          indexStatus: S.optional(S.String),
          schema: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeIndexResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          beforeSubstitution: S.optional(S.Boolean).pipe(T.HttpQuery("beforeSubstitution")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/jobs/{jobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          processingTargets: S.optional(__S(7904, __c247, 0)),
          numberOfCanceledThings: S.optional(S.Number),
          numberOfSucceededThings: S.optional(S.Number),
          numberOfFailedThings: S.optional(S.Number),
          numberOfRejectedThings: S.optional(S.Number),
          numberOfQueuedThings: S.optional(S.Number),
          numberOfInProgressThings: S.optional(S.Number),
          numberOfRemovedThings: S.optional(S.Number),
          numberOfTimedOutThings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobProcessDetails" });
    case 2:
      return S.suspend(() => S.Struct({ startTime: S.optional(S.String) })).annotate({
        identifier: "ScheduledJobRollout",
      });
    case 3:
      return S.Array(__S(1698, __c53, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobId: S.optional(S.String),
          targetSelection: S.optional(S.String),
          status: S.optional(S.String),
          forceCanceled: S.optional(S.Boolean),
          reasonCode: S.optional(S.String),
          comment: S.optional(S.String),
          targets: S.optional(__S(7904, __c247, 0)),
          description: S.optional(S.String),
          presignedUrlConfig: S.optional(__S(9248, __c289, 0)),
          jobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          abortConfig: S.optional(__S(9249, __c289, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          jobProcessDetails: S.optional(__S(1697, __c53, 1)),
          timeoutConfig: S.optional(__S(9314, __c291, 2)),
          namespaceId: S.optional(S.String),
          jobTemplateArn: S.optional(S.String),
          jobExecutionsRetryConfig: S.optional(__S(9252, __c289, 4)),
          documentParameters: S.optional(__S(8256, __c258, 0)),
          isConcurrent: S.optional(S.Boolean),
          schedulingConfig: S.optional(__S(9184, __c287, 0)),
          scheduledJobRollouts: S.optional(__S(1699, __c53, 3)),
          destinationPackageVersions: S.optional(__S(7904, __c247, 0)),
        }),
      ).annotate({ identifier: "Job" });
    case 5:
      return S.suspend(() =>
        S.Struct({ documentSource: S.optional(S.String), job: S.optional(__S(1700, __c53, 4)) }),
      ).annotate({ identifier: "DescribeJobResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          executionNumber: S.optional(S.Number).pipe(T.HttpQuery("executionNumber")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobExecutionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ detailsMap: S.optional(__S(8256, __c258, 0)) })).annotate({
        identifier: "JobExecutionStatusDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          status: S.optional(S.String),
          forceCanceled: S.optional(S.Boolean),
          statusDetails: S.optional(__S(1729, __c54, 1)),
          thingArn: S.optional(S.String),
          queuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          executionNumber: S.optional(S.Number),
          versionNumber: S.optional(S.Number),
          approximateSecondsBeforeTimedOut: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobExecution" });
    case 3:
      return S.suspend(() => S.Struct({ execution: S.optional(__S(1730, __c54, 2)) })).annotate({
        identifier: "DescribeJobExecutionResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobTemplateId: S.String.pipe(T.HttpLabel("jobTemplateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/job-templates/{jobTemplateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobTemplateArn: S.optional(S.String),
          jobTemplateId: S.optional(S.String),
          description: S.optional(S.String),
          documentSource: S.optional(S.String),
          document: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          presignedUrlConfig: S.optional(__S(9248, __c289, 0)),
          jobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          abortConfig: S.optional(__S(9249, __c289, 1)),
          timeoutConfig: S.optional(__S(9314, __c291, 2)),
          jobExecutionsRetryConfig: S.optional(__S(9252, __c289, 4)),
          maintenanceWindows: S.optional(__S(9217, __c288, 1)),
          destinationPackageVersions: S.optional(__S(7904, __c247, 0)),
        }),
      ).annotate({ identifier: "DescribeJobTemplateResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String.pipe(T.HttpLabel("templateName")),
          templateVersion: S.optional(S.String).pipe(T.HttpQuery("templateVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-job-templates/{templateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeManagedJobTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          key: S.optional(S.String),
          description: S.optional(S.String),
          regex: S.optional(S.String),
          example: S.optional(S.String),
          optional: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DocumentParameter" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          templateName: S.optional(S.String),
          templateArn: S.optional(S.String),
          description: S.optional(S.String),
          templateVersion: S.optional(S.String),
          environments: S.optional(__S(7904, __c247, 0)),
          documentParameters: S.optional(__S(1794, __c56, 2)),
          document: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeManagedJobTemplateResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionName: S.String.pipe(T.HttpLabel("actionName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/mitigationactions/actions/{actionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMitigationActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          actionName: S.optional(S.String),
          actionType: S.optional(S.String),
          actionArn: S.optional(S.String),
          actionId: S.optional(S.String),
          roleArn: S.optional(S.String),
          actionParams: S.optional(__S(9477, __c296, 5)),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeMitigationActionResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String.pipe(T.HttpLabel("templateName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioning-templates/{templateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeProvisioningTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateArn: S.optional(S.String),
          templateName: S.optional(S.String),
          description: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          defaultVersionId: S.optional(S.Number),
          templateBody: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          provisioningRoleArn: S.optional(S.String),
          preProvisioningHook: S.optional(__S(9792, __c306, 0)),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeProvisioningTemplateResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String.pipe(T.HttpLabel("templateName")),
          versionId: S.Number.pipe(T.HttpLabel("versionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/provisioning-templates/{templateName}/versions/{versionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeProvisioningTemplateVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          versionId: S.optional(S.Number),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          templateBody: S.optional(S.String),
          isDefaultVersion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeProvisioningTemplateVersionResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleAlias: S.String.pipe(T.HttpLabel("roleAlias")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/role-aliases/{roleAlias}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRoleAliasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          roleAlias: S.optional(S.String),
          roleAliasArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          owner: S.optional(S.String),
          credentialDurationSeconds: S.optional(S.Number),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RoleAliasDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({ roleAliasDescription: S.optional(__S(1921, __c60, 1)) }),
      ).annotate({ identifier: "DescribeRoleAliasResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/scheduledaudits/{scheduledAuditName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeScheduledAuditRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          frequency: S.optional(S.String),
          dayOfMonth: S.optional(S.String),
          dayOfWeek: S.optional(S.String),
          targetCheckNames: S.optional(__S(7904, __c247, 0)),
          scheduledAuditName: S.optional(S.String),
          scheduledAuditArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScheduledAuditResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/security-profiles/{securityProfileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSecurityProfileRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.optional(S.String),
          securityProfileArn: S.optional(S.String),
          securityProfileDescription: S.optional(S.String),
          behaviors: S.optional(__S(10144, __c317, 0)),
          alertTargets: S.optional(__S(10113, __c316, 1)),
          additionalMetricsToRetain: S.optional(__S(7904, __c247, 0)),
          additionalMetricsToRetainV2: S.optional(__S(10115, __c316, 3)),
          version: S.optional(S.Number),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metricsExportConfig: S.optional(__S(10116, __c316, 4)),
        }),
      ).annotate({ identifier: "DescribeSecurityProfileResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ streamId: S.String.pipe(T.HttpLabel("streamId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/streams/{streamId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          streamId: S.optional(S.String),
          streamArn: S.optional(S.String),
          streamVersion: S.optional(S.Number),
          description: S.optional(S.String),
          files: S.optional(__S(10209, __c319, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreamInfo" });
    case 2:
      return S.suspend(() => S.Struct({ streamInfo: S.optional(__S(2049, __c64, 1)) })).annotate({
        identifier: "DescribeStreamResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingName: S.String.pipe(T.HttpLabel("thingName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeThingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          defaultClientId: S.optional(S.String),
          thingName: S.optional(S.String),
          thingId: S.optional(S.String),
          thingArn: S.optional(S.String),
          thingTypeName: S.optional(S.String),
          attributes: S.optional(__S(8256, __c258, 0)),
          version: S.optional(S.Number),
          billingGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeThingResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeThingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          parentGroupName: S.optional(S.String),
          rootToParentThingGroups: S.optional(__S(2145, __c67, 1)),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ThingGroupMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.optional(S.String),
          thingGroupId: S.optional(S.String),
          thingGroupArn: S.optional(S.String),
          version: S.optional(S.Number),
          thingGroupProperties: S.optional(__S(9056, __c283, 0)),
          thingGroupMetadata: S.optional(__S(2113, __c66, 1)),
          indexName: S.optional(S.String),
          queryString: S.optional(S.String),
          queryVersion: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeThingGroupResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ groupName: S.optional(S.String), groupArn: S.optional(S.String) }),
      ).annotate({ identifier: "GroupNameAndArn" });
    case 1:
      return S.Array(__S(2144, __c67, 0));
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/thing-registration-tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeThingRegistrationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          templateBody: S.optional(S.String),
          inputFileBucket: S.optional(S.String),
          inputFileKey: S.optional(S.String),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          message: S.optional(S.String),
          successCount: S.optional(S.Number),
          failureCount: S.optional(S.Number),
          percentageProgress: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DescribeThingRegistrationTaskResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/thing-types/{thingTypeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeThingTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingTypeName: S.optional(S.String),
          thingTypeId: S.optional(S.String),
          thingTypeArn: S.optional(S.String),
          thingTypeProperties: S.optional(__S(10371, __c324, 3)),
          thingTypeMetadata: S.optional(__S(2240, __c70, 0)),
        }),
      ).annotate({ identifier: "DescribeThingTypeResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deprecated: S.optional(S.Boolean),
          deprecationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ThingTypeMetadata" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")), target: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/target-policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachPolicyRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          principal: S.String.pipe(T.HttpHeader("x-amzn-iot-principal")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/principal-policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachPrincipalPolicyRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
          securityProfileTargetArn: S.String.pipe(T.HttpQuery("securityProfileTargetArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/security-profiles/{securityProfileName}/targets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachSecurityProfileRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/things/{thingName}/principals" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetachThingPrincipalRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rules/{ruleName}/disable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableTopicRuleRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/packages/{packageName}/versions/{versionName}/sbom",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateSbomFromPackageVersionRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rules/{ruleName}/enable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableTopicRuleRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.optional(S.String).pipe(T.HttpQuery("securityProfileName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/behavior-model-training/summaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBehaviorModelTrainingSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.optional(S.String),
          behaviorName: S.optional(S.String),
          trainingDataCollectionStartDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          modelStatus: S.optional(S.String),
          datapointsCollectionPercentage: S.optional(S.Number),
          lastModelRefreshDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BehaviorModelTrainingSummary" });
    case 2:
      return S.Array(__S(2497, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ summaries: S.optional(__S(2498, __c78, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBehaviorModelTrainingSummariesResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ maxBuckets: S.optional(S.Number) })).annotate({
        identifier: "TermsAggregation",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ termsAggregation: S.optional(__S(2528, __c79, 0)) }),
      ).annotate({ identifier: "BucketsAggregationType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          indexName: S.optional(S.String),
          queryString: S.String,
          aggregationField: S.String,
          queryVersion: S.optional(S.String),
          bucketsAggregationType: __S(2529, __c79, 1),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/indices/buckets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBucketsAggregationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ keyValue: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "Bucket" });
    case 4:
      return S.Array(__S(2531, __c79, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ totalCount: S.optional(S.Number), buckets: S.optional(__S(2532, __c79, 4)) }),
      ).annotate({ identifier: "GetBucketsAggregationResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          indexName: S.optional(S.String),
          queryString: S.String,
          aggregationField: S.optional(S.String),
          queryVersion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/indices/cardinality" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCardinalityRequest" });
    case 1:
      return S.suspend(() => S.Struct({ cardinality: S.optional(S.Number) })).annotate({
        identifier: "GetCardinalityResponse",
      });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commandId: S.String.pipe(T.HttpLabel("commandId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/commands/{commandId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCommandRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commandId: S.optional(S.String),
          commandArn: S.optional(S.String),
          namespace: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          mandatoryParameters: S.optional(__S(8744, __c273, 8)),
          payload: S.optional(__S(8736, __c273, 0)),
          payloadTemplate: S.optional(S.String),
          preprocessor: S.optional(__S(8738, __c273, 2)),
          roleArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deprecated: S.optional(S.Boolean),
          pendingDeletion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetCommandResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          executionId: S.String.pipe(T.HttpLabel("executionId")),
          targetArn: S.String.pipe(T.HttpQuery("targetArn")),
          includeResult: S.optional(S.Boolean).pipe(T.HttpQuery("includeResult")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/command-executions/{executionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCommandExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ reasonCode: S.String, reasonDescription: S.optional(S.String) }),
      ).annotate({ identifier: "StatusReason" });
    case 2:
      return S.suspend(() =>
        S.Struct({ S: S.optional(S.String), B: S.optional(S.Boolean), BIN: S.optional(T.Blob) }),
      ).annotate({ identifier: "CommandExecutionResult" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(2626, __c82, 2).pipe(S.optional));
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(8768, __c274, 0).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          executionId: S.optional(S.String),
          commandArn: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(__S(2625, __c82, 1)),
          result: S.optional(__S(2627, __c82, 3)),
          parameters: S.optional(__S(2628, __c82, 4)),
          executionTimeoutSeconds: S.optional(S.Number),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          timeToLive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetCommandExecutionResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          principal: S.optional(S.String),
          cognitoIdentityPoolId: S.optional(S.String),
          thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/effective-policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEffectivePoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyArn: S.optional(S.String),
          policyDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "EffectivePolicy" });
    case 2:
      return S.Array(__S(2657, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ effectivePolicies: S.optional(__S(2658, __c83, 2)) }),
      ).annotate({ identifier: "GetEffectivePoliciesResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/indexing/config" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIndexingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingIndexingConfiguration: S.optional(__S(2726, __c85, 6)),
          thingGroupIndexingConfiguration: S.optional(__S(2727, __c85, 7)),
        }),
      ).annotate({ identifier: "GetIndexingConfigurationResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "Field" });
    case 1:
      return S.Array(__S(2720, __c85, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), order: S.optional(S.String) }),
      ).annotate({ identifier: "GeoLocationTarget" });
    case 3:
      return S.Array(__S(2722, __c85, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ includeSocketInformation: S.optional(__S(8672, __c271, 0)) }),
      ).annotate({ identifier: "ConnectivityFilter" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          namedShadowNames: S.optional(__S(7904, __c247, 0)),
          geoLocations: S.optional(__S(2723, __c85, 3)),
          connectivity: S.optional(__S(2724, __c85, 4)),
        }),
      ).annotate({ identifier: "IndexingFilter" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          thingIndexingMode: S.String,
          thingConnectivityIndexingMode: S.optional(S.String),
          deviceDefenderIndexingMode: S.optional(S.String),
          namedShadowIndexingMode: S.optional(S.String),
          managedFields: S.optional(__S(2721, __c85, 1)),
          customFields: S.optional(__S(2721, __c85, 1)),
          filter: S.optional(__S(2725, __c85, 5)),
        }),
      ).annotate({ identifier: "ThingIndexingConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          thingGroupIndexingMode: S.String,
          managedFields: S.optional(__S(2721, __c85, 1)),
          customFields: S.optional(__S(2721, __c85, 1)),
        }),
      ).annotate({ identifier: "ThingGroupIndexingConfiguration" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          beforeSubstitution: S.optional(S.Boolean).pipe(T.HttpQuery("beforeSubstitution")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/jobs/{jobId}/job-document" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobDocumentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ document: S.optional(S.String) })).annotate({
        identifier: "GetJobDocumentResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/loggingOptions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLoggingOptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ roleArn: S.optional(S.String), logLevel: S.optional(S.String) }),
      ).annotate({ identifier: "GetLoggingOptionsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ otaUpdateId: S.String.pipe(T.HttpLabel("otaUpdateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/otaUpdates/{otaUpdateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOTAUpdateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          otaUpdateId: S.optional(S.String),
          otaUpdateArn: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          targets: S.optional(__S(7904, __c247, 0)),
          protocols: S.optional(__S(8672, __c271, 0)),
          awsJobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          awsJobPresignedUrlConfig: S.optional(__S(9568, __c299, 0)),
          targetSelection: S.optional(S.String),
          otaUpdateFiles: S.optional(__S(9580, __c299, 12)),
          otaUpdateStatus: S.optional(S.String),
          awsIotJobId: S.optional(S.String),
          awsIotJobArn: S.optional(S.String),
          errorInfo: S.optional(__S(2817, __c88, 1)),
          additionalParameters: S.optional(__S(8256, __c258, 0)),
        }),
      ).annotate({ identifier: "OTAUpdateInfo" });
    case 3:
      return S.suspend(() => S.Struct({ otaUpdateInfo: S.optional(__S(2818, __c88, 2)) })).annotate(
        { identifier: "GetOTAUpdateResponse" },
      );
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ packageName: S.String.pipe(T.HttpLabel("packageName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/packages/{packageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPackageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageName: S.optional(S.String),
          packageArn: S.optional(S.String),
          description: S.optional(SensitiveString),
          defaultVersionName: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetPackageResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/package-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPackageConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ versionUpdateByJobsConfig: S.optional(__S(2912, __c91, 0)) }),
      ).annotate({ identifier: "GetPackageConfigurationResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "VersionUpdateByJobsConfig" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/packages/{packageName}/versions/{versionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPackageVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageVersionArn: S.optional(S.String),
          packageName: S.optional(S.String),
          versionName: S.optional(S.String),
          description: S.optional(SensitiveString),
          attributes: S.optional(__S(8256, __c258, 0)),
          artifact: S.optional(__S(7808, __c244, 0)),
          status: S.optional(S.String),
          errorReason: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sbom: S.optional(__S(7808, __c244, 0)),
          sbomValidationStatus: S.optional(S.String),
          recipe: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GetPackageVersionResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          indexName: S.optional(S.String),
          queryString: S.String,
          aggregationField: S.optional(S.String),
          queryVersion: S.optional(S.String),
          percents: S.optional(__S(10016, __c313, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/indices/percentiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPercentilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ percent: S.optional(S.Number), value: S.optional(S.Number) }),
      ).annotate({ identifier: "PercentPair" });
    case 2:
      return S.Array(__S(2977, __c93, 1));
    case 3:
      return S.suspend(() => S.Struct({ percentiles: S.optional(__S(2978, __c93, 2)) })).annotate({
        identifier: "GetPercentilesResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyArn: S.optional(S.String),
          policyDocument: S.optional(S.String),
          defaultVersionId: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          generationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPolicyResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          policyVersionId: S.String.pipe(T.HttpLabel("policyVersionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policies/{policyName}/version/{policyVersionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPolicyVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.optional(S.String),
          policyName: S.optional(S.String),
          policyDocument: S.optional(S.String),
          policyVersionId: S.optional(S.String),
          isDefaultVersion: S.optional(S.Boolean),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          generationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPolicyVersionResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/registrationcode" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRegistrationCodeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ registrationCode: S.optional(S.String) })).annotate({
        identifier: "GetRegistrationCodeResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          indexName: S.optional(S.String),
          queryString: S.String,
          aggregationField: S.optional(S.String),
          queryVersion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/indices/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          count: S.optional(S.Number),
          average: S.optional(S.Number),
          sum: S.optional(S.Number),
          minimum: S.optional(S.Number),
          maximum: S.optional(S.Number),
          sumOfSquares: S.optional(S.Number),
          variance: S.optional(S.Number),
          stdDeviation: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Statistics" });
    case 2:
      return S.suspend(() => S.Struct({ statistics: S.optional(__S(3105, __c97, 1)) })).annotate({
        identifier: "GetStatisticsResponse",
      });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: SensitiveString.pipe(T.HttpLabel("thingName")),
          includeSocketInformation: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/things/{thingName}/connectivity-data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetThingConnectivityDataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(SensitiveString),
          connected: S.optional(S.Boolean),
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          disconnectReason: S.optional(S.String),
          sourceIp: S.optional(SensitiveString),
          sourcePort: S.optional(S.Number),
          targetIp: S.optional(SensitiveString),
          targetPort: S.optional(S.Number),
          vpcEndpointId: S.optional(SensitiveString),
          keepAliveDuration: S.optional(S.Number),
          cleanSession: S.optional(S.Boolean),
          sessionExpiry: S.optional(S.Number),
          clientId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetThingConnectivityDataResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/rules/{ruleName}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTopicRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleName: S.optional(S.String),
          sql: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          actions: S.optional(__S(10474, __c327, 10)),
          ruleDisabled: S.optional(S.Boolean),
          awsIotSqlVersion: S.optional(S.String),
          errorAction: S.optional(__S(10473, __c327, 9)),
        }),
      ).annotate({ identifier: "TopicRule" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ruleArn: S.optional(S.String), rule: S.optional(__S(3169, __c99, 1)) }),
      ).annotate({ identifier: "GetTopicRuleResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/destinations/{arn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTopicRuleDestinationRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ verbose: S.optional(S.Boolean).pipe(T.HttpQuery("verbose")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2LoggingOptions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetV2LoggingOptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.optional(S.String),
          defaultLogLevel: S.optional(S.String),
          disableAllLogs: S.optional(S.Boolean),
          eventConfigurations: S.optional(__S(3265, __c102, 1)),
        }),
      ).annotate({ identifier: "GetV2LoggingOptionsResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventType: S.String,
          logLevel: S.optional(S.String),
          logDestination: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogEventConfiguration" });
    case 1:
      return S.Array(__S(3264, __c102, 0));
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
          securityProfileName: S.optional(S.String).pipe(T.HttpQuery("securityProfileName")),
          behaviorCriteriaType: S.optional(S.String).pipe(T.HttpQuery("behaviorCriteriaType")),
          listSuppressedAlerts: S.optional(S.Boolean).pipe(T.HttpQuery("listSuppressedAlerts")),
          verificationState: S.optional(S.String).pipe(T.HttpQuery("verificationState")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/active-violations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListActiveViolationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          violationId: S.optional(S.String),
          thingName: S.optional(S.String),
          securityProfileName: S.optional(S.String),
          behavior: S.optional(__S(10084, __c315, 4)),
          lastViolationValue: S.optional(__S(10048, __c314, 0)),
          violationEventAdditionalInfo: S.optional(__S(3328, __c104, 0)),
          verificationState: S.optional(S.String),
          verificationStateDescription: S.optional(S.String),
          lastViolationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          violationStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ActiveViolation" });
    case 2:
      return S.Array(__S(3297, __c103, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          activeViolations: S.optional(__S(3298, __c103, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListActiveViolationsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ confidenceLevel: S.optional(S.String) })).annotate({
        identifier: "ViolationEventAdditionalInfo",
      });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          target: S.String.pipe(T.HttpLabel("target")),
          recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/attached-policies/{target}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAttachedPoliciesRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policies: S.optional(__S(3425, __c107, 1)), nextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListAttachedPoliciesResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.optional(S.String), policyArn: S.optional(S.String) }),
      ).annotate({ identifier: "Policy" });
    case 1:
      return S.Array(__S(3424, __c107, 0));
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          checkName: S.optional(S.String),
          resourceIdentifier: S.optional(__S(8386, __c262, 2)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          listSuppressedFindings: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/audit/findings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAuditFindingsRequest" });
    case 1:
      return S.Array(__S(736, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ findings: S.optional(__S(3457, __c108, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAuditFindingsResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String.pipe(T.HttpQuery("taskId")),
          actionStatus: S.optional(S.String).pipe(T.HttpQuery("actionStatus")),
          findingId: S.String.pipe(T.HttpQuery("findingId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/mitigationactions/executions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAuditMitigationActionsExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          findingId: S.optional(S.String),
          actionName: S.optional(S.String),
          actionId: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorCode: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuditMitigationActionExecutionMetadata" });
    case 2:
      return S.Array(__S(3489, __c109, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          actionsExecutions: S.optional(__S(3490, __c109, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAuditMitigationActionsExecutionsResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          auditTaskId: S.optional(S.String).pipe(T.HttpQuery("auditTaskId")),
          findingId: S.optional(S.String).pipe(T.HttpQuery("findingId")),
          taskStatus: S.optional(S.String).pipe(T.HttpQuery("taskStatus")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/mitigationactions/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAuditMitigationActionsTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          taskStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuditMitigationActionsTaskMetadata" });
    case 2:
      return S.Array(__S(3521, __c110, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ tasks: S.optional(__S(3522, __c110, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAuditMitigationActionsTasksResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          checkName: S.optional(S.String),
          resourceIdentifier: S.optional(__S(8386, __c262, 2)),
          ascendingOrder: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/suppressions/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAuditSuppressionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          checkName: S.String,
          resourceIdentifier: __S(8386, __c262, 2),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          suppressIndefinitely: S.optional(S.Boolean),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuditSuppression" });
    case 2:
      return S.Array(__S(3553, __c111, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          suppressions: S.optional(__S(3554, __c111, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAuditSuppressionsResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
          taskType: S.optional(S.String).pipe(T.HttpQuery("taskType")),
          taskStatus: S.optional(S.String).pipe(T.HttpQuery("taskStatus")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/audit/tasks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAuditTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          taskStatus: S.optional(S.String),
          taskType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuditTaskMetadata" });
    case 2:
      return S.Array(__S(3585, __c112, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ tasks: S.optional(__S(3586, __c112, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAuditTasksResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/authorizers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAuthorizersRequest" });
    case 1:
      return S.Array(__S(8448, __c264, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          authorizers: S.optional(__S(3617, __c113, 1)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAuthorizersResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          namePrefixFilter: S.optional(S.String).pipe(T.HttpQuery("namePrefixFilter")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/billing-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBillingGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billingGroups: S.optional(__S(2145, __c67, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBillingGroupsResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
          templateName: S.optional(S.String).pipe(T.HttpQuery("templateName")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/cacertificates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCACertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          status: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CACertificate" });
    case 2:
      return S.Array(__S(3681, __c115, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          certificates: S.optional(__S(3682, __c115, 2)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCACertificatesResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/certificate-providers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCertificateProvidersRequest" });
    case 1:
      return S.Array(__S(8640, __c270, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificateProviders: S.optional(__S(3713, __c116, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCertificateProvidersResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/certificates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCertificatesRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          status: S.optional(S.String),
          certificateMode: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Certificate" });
    case 1:
      return S.Array(__S(3776, __c118, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          certificates: S.optional(__S(3777, __c118, 1)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCertificatesResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caCertificateId: S.String.pipe(T.HttpLabel("caCertificateId")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/certificates-by-ca/{caCertificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCertificatesByCARequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ after: S.optional(S.String), before: S.optional(S.String) }),
      ).annotate({ identifier: "TimeFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          namespace: S.optional(S.String),
          status: S.optional(S.String),
          sortOrder: S.optional(S.String),
          startedTimeFilter: S.optional(__S(3840, __c120, 0)),
          completedTimeFilter: S.optional(__S(3840, __c120, 0)),
          targetArn: S.optional(S.String),
          commandArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/command-executions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCommandExecutionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          commandArn: S.optional(S.String),
          executionId: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CommandExecutionSummary" });
    case 3:
      return S.Array(__S(3842, __c120, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          commandExecutions: S.optional(__S(3843, __c120, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCommandExecutionsResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
          commandParameterName: S.optional(S.String).pipe(T.HttpQuery("commandParameterName")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/commands" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCommandsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commandArn: S.optional(S.String),
          commandId: S.optional(S.String),
          displayName: S.optional(S.String),
          deprecated: S.optional(S.Boolean),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pendingDeletion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CommandSummary" });
    case 2:
      return S.Array(__S(3873, __c121, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ commands: S.optional(__S(3874, __c121, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCommandsResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/custom-metrics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCustomMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metricNames: S.optional(__S(7904, __c247, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomMetricsResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String).pipe(T.HttpQuery("taskId")),
          violationId: S.optional(S.String).pipe(T.HttpQuery("violationId")),
          thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detect/mitigationactions/executions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDetectMitigationActionsExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          violationId: S.optional(S.String),
          actionName: S.optional(S.String),
          thingName: S.optional(S.String),
          executionStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          executionEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          errorCode: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DetectMitigationActionExecution" });
    case 2:
      return S.Array(__S(3937, __c123, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          actionsExecutions: S.optional(__S(3938, __c123, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDetectMitigationActionsExecutionsResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detect/mitigationactions/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDetectMitigationActionsTasksRequest" });
    case 1:
      return S.Array(__S(1345, __c42, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ tasks: S.optional(__S(3969, __c124, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDetectMitigationActionsTasksResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/dimensions" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDimensionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dimensionNames: S.optional(__S(7904, __c247, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDimensionsResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          serviceType: S.optional(S.String).pipe(T.HttpQuery("serviceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainConfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.optional(S.String),
          domainConfigurationArn: S.optional(S.String),
          serviceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainConfigurationSummary" });
    case 2:
      return S.Array(__S(4033, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainConfigurations: S.optional(__S(4034, __c126, 2)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDomainConfigurationsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/fleet-metrics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFleetMetricsRequest" });
    case 1:
      return S.Array(__S(8832, __c276, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          fleetMetrics: S.optional(__S(4065, __c127, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFleetMetricsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/indices" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIndicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ indexNames: S.optional(__S(7904, __c247, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIndicesResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/jobs/{jobId}/things" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobExecutionsForJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingArn: S.optional(S.String),
          jobExecutionSummary: S.optional(__S(4160, __c130, 0)),
        }),
      ).annotate({ identifier: "JobExecutionSummaryForJob" });
    case 2:
      return S.Array(__S(4129, __c129, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          executionSummaries: S.optional(__S(4130, __c129, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListJobExecutionsForJobResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          queuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          executionNumber: S.optional(S.Number),
          retryAttempt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobExecutionSummary" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          jobId: S.optional(S.String).pipe(T.HttpQuery("jobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobExecutionsForThingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          jobExecutionSummary: S.optional(__S(4160, __c130, 0)),
        }),
      ).annotate({ identifier: "JobExecutionSummaryForThing" });
    case 2:
      return S.Array(__S(4193, __c131, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          executionSummaries: S.optional(__S(4194, __c131, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListJobExecutionsForThingResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          targetSelection: S.optional(S.String).pipe(T.HttpQuery("targetSelection")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          thingGroupName: S.optional(S.String).pipe(T.HttpQuery("thingGroupName")),
          thingGroupId: S.optional(S.String).pipe(T.HttpQuery("thingGroupId")),
          namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobId: S.optional(S.String),
          thingGroupId: S.optional(S.String),
          targetSelection: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          isConcurrent: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "JobSummary" });
    case 2:
      return S.Array(__S(4225, __c132, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(4226, __c132, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/job-templates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListJobTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobTemplateArn: S.optional(S.String),
          jobTemplateId: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "JobTemplateSummary" });
    case 2:
      return S.Array(__S(4257, __c133, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobTemplates: S.optional(__S(4258, __c133, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListJobTemplatesResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.optional(S.String).pipe(T.HttpQuery("templateName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-job-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedJobTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateArn: S.optional(S.String),
          templateName: S.optional(S.String),
          description: S.optional(S.String),
          environments: S.optional(__S(7904, __c247, 0)),
          templateVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedJobTemplateSummary" });
    case 2:
      return S.Array(__S(4289, __c134, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          managedJobTemplates: S.optional(__S(4290, __c134, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListManagedJobTemplatesResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpQuery("thingName")),
          metricName: S.String.pipe(T.HttpQuery("metricName")),
          dimensionName: S.optional(S.String).pipe(T.HttpQuery("dimensionName")),
          dimensionValueOperator: S.optional(S.String).pipe(T.HttpQuery("dimensionValueOperator")),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/metric-values" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMetricValuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          value: S.optional(__S(10048, __c314, 0)),
        }),
      ).annotate({ identifier: "MetricDatum" });
    case 2:
      return S.Array(__S(4321, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          metricDatumList: S.optional(__S(4322, __c135, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMetricValuesResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionType: S.optional(S.String).pipe(T.HttpQuery("actionType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/mitigationactions/actions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMitigationActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          actionName: S.optional(S.String),
          actionArn: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MitigationActionIdentifier" });
    case 2:
      return S.Array(__S(4353, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          actionIdentifiers: S.optional(__S(4354, __c136, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMitigationActionsResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          otaUpdateStatus: S.optional(S.String).pipe(T.HttpQuery("otaUpdateStatus")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/otaUpdates" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOTAUpdatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          otaUpdateId: S.optional(S.String),
          otaUpdateArn: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OTAUpdateSummary" });
    case 2:
      return S.Array(__S(4385, __c137, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ otaUpdates: S.optional(__S(4386, __c137, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOTAUpdatesResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/certificates-out-going" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOutgoingCertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          transferredTo: S.optional(S.String),
          transferDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          transferMessage: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OutgoingCertificate" });
    case 2:
      return S.Array(__S(4417, __c138, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          outgoingCertificates: S.optional(__S(4418, __c138, 2)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOutgoingCertificatesResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/packages" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPackagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageName: S.optional(S.String),
          defaultVersionName: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PackageSummary" });
    case 2:
      return S.Array(__S(4449, __c139, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          packageSummaries: S.optional(__S(4450, __c139, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPackagesResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/packages/{packageName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackageVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageName: S.optional(S.String),
          versionName: S.optional(S.String),
          status: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PackageVersionSummary" });
    case 2:
      return S.Array(__S(4481, __c140, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          packageVersionSummaries: S.optional(__S(4482, __c140, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPackageVersionsResponse" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/policies" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPoliciesRequest" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpHeader("x-amzn-iot-policy")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/policy-principals" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPolicyPrincipalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          principals: S.optional(__S(7904, __c247, 0)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPolicyPrincipalsResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policies/{policyName}/version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPolicyVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          versionId: S.optional(S.String),
          isDefaultVersion: S.optional(S.Boolean),
          createDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PolicyVersion" });
    case 2:
      return S.Array(__S(4577, __c143, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ policyVersions: S.optional(__S(4578, __c143, 2)) }),
      ).annotate({ identifier: "ListPolicyVersionsResponse" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          principal: S.String.pipe(T.HttpHeader("x-amzn-iot-principal")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/principal-policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPrincipalPoliciesRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/principals/things" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPrincipalThingsRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ things: S.optional(__S(7904, __c247, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPrincipalThingsResponse" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
          thingPrincipalType: S.optional(S.String).pipe(T.HttpQuery("thingPrincipalType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/principals/things-v2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPrincipalThingsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ thingName: S.String, thingPrincipalType: S.optional(S.String) }),
      ).annotate({ identifier: "PrincipalThingObject" });
    case 2:
      return S.Array(__S(4705, __c147, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          principalThingObjects: S.optional(__S(4706, __c147, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPrincipalThingsV2Response" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioning-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProvisioningTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateArn: S.optional(S.String),
          templateName: S.optional(S.String),
          description: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          enabled: S.optional(S.Boolean),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisioningTemplateSummary" });
    case 2:
      return S.Array(__S(4737, __c148, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ templates: S.optional(__S(4738, __c148, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProvisioningTemplatesResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String.pipe(T.HttpLabel("templateName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioning-templates/{templateName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProvisioningTemplateVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          versionId: S.optional(S.Number),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          isDefaultVersion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ProvisioningTemplateVersionSummary" });
    case 2:
      return S.Array(__S(4769, __c149, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ versions: S.optional(__S(4770, __c149, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProvisioningTemplateVersionsResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String.pipe(T.HttpQuery("findingId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/relatedResources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRelatedResourcesForAuditFindingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          relatedResources: S.optional(__S(769, __c24, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRelatedResourcesForAuditFindingResponse" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/role-aliases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRoleAliasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          roleAliases: S.optional(__S(7904, __c247, 0)),
          nextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRoleAliasesResponse" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
          validationResult: S.optional(S.String).pipe(T.HttpQuery("validationResult")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/packages/{packageName}/versions/{versionName}/sbom-validation-results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSbomValidationResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fileName: S.optional(S.String),
          validationResult: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SbomValidationResultSummary" });
    case 2:
      return S.Array(__S(4865, __c152, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          validationResultSummaries: S.optional(__S(4866, __c152, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSbomValidationResultsResponse" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audit/scheduledaudits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListScheduledAuditsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scheduledAuditName: S.optional(S.String),
          scheduledAuditArn: S.optional(S.String),
          frequency: S.optional(S.String),
          dayOfMonth: S.optional(S.String),
          dayOfWeek: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledAuditMetadata" });
    case 2:
      return S.Array(__S(4897, __c153, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          scheduledAudits: S.optional(__S(4898, __c153, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListScheduledAuditsResponse" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          dimensionName: S.optional(S.String).pipe(T.HttpQuery("dimensionName")),
          metricName: S.optional(S.String).pipe(T.HttpQuery("metricName")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/security-profiles" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSecurityProfilesRequest" });
    case 1:
      return S.Array(__S(4960, __c155, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          securityProfileIdentifiers: S.optional(__S(4929, __c154, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityProfilesResponse" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, arn: S.String })).annotate({
        identifier: "SecurityProfileIdentifier",
      });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
          securityProfileTargetArn: S.String.pipe(T.HttpQuery("securityProfileTargetArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/security-profiles-for-target" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityProfilesForTargetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          securityProfileIdentifier: S.optional(__S(4960, __c155, 0)),
          target: S.optional(__S(5024, __c157, 0)),
        }),
      ).annotate({ identifier: "SecurityProfileTargetMapping" });
    case 2:
      return S.Array(__S(4993, __c156, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          securityProfileTargetMappings: S.optional(__S(4994, __c156, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityProfilesForTargetResponse" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "SecurityProfileTarget",
      });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/streams" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStreamsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          streamId: S.optional(S.String),
          streamArn: S.optional(S.String),
          streamVersion: S.optional(S.Number),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreamSummary" });
    case 2:
      return S.Array(__S(5057, __c158, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ streams: S.optional(__S(5058, __c158, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStreamsResponse" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(8481, __c265, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policy-targets/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTargetsForPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ targets: S.optional(__S(7904, __c247, 0)), nextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListTargetsForPolicyResponse" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/security-profiles/{securityProfileName}/targets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTargetsForSecurityProfileRequest" });
    case 1:
      return S.Array(__S(5024, __c157, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          securityProfileTargets: S.optional(__S(5153, __c161, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTargetsForSecurityProfileResponse" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          parentGroup: S.optional(S.String).pipe(T.HttpQuery("parentGroup")),
          namePrefixFilter: S.optional(S.String).pipe(T.HttpQuery("namePrefixFilter")),
          recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/thing-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListThingGroupsRequest" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingGroups: S.optional(__S(2145, __c67, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListThingGroupsResponse" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/thing-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingGroupsForThingRequest" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/principals" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingPrincipalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ principals: S.optional(__S(7904, __c247, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListThingPrincipalsResponse" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          thingPrincipalType: S.optional(S.String).pipe(T.HttpQuery("thingPrincipalType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/things/{thingName}/principals-v2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingPrincipalsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ principal: S.String, thingPrincipalType: S.optional(S.String) }),
      ).annotate({ identifier: "ThingPrincipalObject" });
    case 2:
      return S.Array(__S(5313, __c166, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          thingPrincipalObjects: S.optional(__S(5314, __c166, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListThingPrincipalsV2Response" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String.pipe(T.HttpLabel("taskId")),
          reportType: S.String.pipe(T.HttpQuery("reportType")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/thing-registration-tasks/{taskId}/reports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingRegistrationTaskReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceLinks: S.optional(__S(7904, __c247, 0)),
          reportType: S.optional(S.String),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListThingRegistrationTaskReportsResponse" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/thing-registration-tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingRegistrationTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ taskIds: S.optional(__S(7904, __c247, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListThingRegistrationTasksResponse" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          attributeName: S.optional(S.String).pipe(T.HttpQuery("attributeName")),
          attributeValue: S.optional(S.String).pipe(T.HttpQuery("attributeValue")),
          thingTypeName: S.optional(S.String).pipe(T.HttpQuery("thingTypeName")),
          usePrefixAttributeValue: S.optional(S.Boolean).pipe(
            T.HttpQuery("usePrefixAttributeValue"),
          ),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/things" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListThingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String),
          thingTypeName: S.optional(S.String),
          thingArn: S.optional(S.String),
          attributes: S.optional(__S(8256, __c258, 0)),
          version: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ThingAttribute" });
    case 2:
      return S.Array(__S(5409, __c169, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ things: S.optional(__S(5410, __c169, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListThingsResponse" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/billing-groups/{billingGroupName}/things" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingsInBillingGroupRequest" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/thing-groups/{thingGroupName}/things" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThingsInThingGroupRequest" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          thingTypeName: S.optional(S.String).pipe(T.HttpQuery("thingTypeName")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/thing-types" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListThingTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingTypeName: S.optional(S.String),
          thingTypeArn: S.optional(S.String),
          thingTypeProperties: S.optional(__S(10371, __c324, 3)),
          thingTypeMetadata: S.optional(__S(2240, __c70, 0)),
        }),
      ).annotate({ identifier: "ThingTypeDefinition" });
    case 2:
      return S.Array(__S(5505, __c172, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ thingTypes: S.optional(__S(5506, __c172, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListThingTypesResponse" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTopicRuleDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusReason: S.optional(S.String),
          httpUrlSummary: S.optional(__S(10592, __c331, 0)),
          vpcDestinationSummary: S.optional(__S(10593, __c331, 1)),
          influxDBSummary: S.optional(__S(10594, __c331, 2)),
        }),
      ).annotate({ identifier: "TopicRuleDestinationSummary" });
    case 2:
      return S.Array(__S(5537, __c173, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          destinationSummaries: S.optional(__S(5538, __c173, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTopicRuleDestinationsResponse" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          topic: S.optional(S.String).pipe(T.HttpQuery("topic")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ruleDisabled: S.optional(S.Boolean).pipe(T.HttpQuery("ruleDisabled")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTopicRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.optional(S.String),
          ruleName: S.optional(S.String),
          topicPattern: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ruleDisabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TopicRuleListItem" });
    case 2:
      return S.Array(__S(5569, __c174, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ rules: S.optional(__S(5570, __c174, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTopicRulesResponse" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetType: S.optional(S.String).pipe(T.HttpQuery("targetType")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2LoggingLevel" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListV2LoggingLevelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ logTarget: S.optional(__S(5632, __c176, 0)), logLevel: S.optional(S.String) }),
      ).annotate({ identifier: "LogTargetConfiguration" });
    case 2:
      return S.Array(__S(5601, __c175, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          logTargetConfigurations: S.optional(__S(5602, __c175, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListV2LoggingLevelsResponse" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetType: S.String, targetName: S.optional(S.String) }),
      ).annotate({ identifier: "LogTarget" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("startTime")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(T.HttpQuery("endTime")),
          thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
          securityProfileName: S.optional(S.String).pipe(T.HttpQuery("securityProfileName")),
          behaviorCriteriaType: S.optional(S.String).pipe(T.HttpQuery("behaviorCriteriaType")),
          listSuppressedAlerts: S.optional(S.Boolean).pipe(T.HttpQuery("listSuppressedAlerts")),
          verificationState: S.optional(S.String).pipe(T.HttpQuery("verificationState")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/violation-events" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListViolationEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          violationId: S.optional(S.String),
          thingName: S.optional(S.String),
          securityProfileName: S.optional(S.String),
          behavior: S.optional(__S(10084, __c315, 4)),
          metricValue: S.optional(__S(10048, __c314, 0)),
          violationEventAdditionalInfo: S.optional(__S(3328, __c104, 0)),
          violationEventType: S.optional(S.String),
          verificationState: S.optional(S.String),
          verificationStateDescription: S.optional(S.String),
          violationEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ViolationEvent" });
    case 2:
      return S.Array(__S(5665, __c177, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          violationEvents: S.optional(__S(5666, __c177, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListViolationEventsResponse" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          violationId: S.String.pipe(T.HttpLabel("violationId")),
          verificationState: S.String,
          verificationStateDescription: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/violations/verification-state/{violationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVerificationStateOnViolationRequest" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caCertificate: S.String,
          verificationCertificate: S.optional(S.String),
          setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
          allowAutoRegistration: S.optional(S.Boolean).pipe(T.HttpQuery("allowAutoRegistration")),
          registrationConfig: S.optional(__S(1120, __c35, 0)),
          tags: S.optional(__S(8481, __c265, 1)),
          certificateMode: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/cacertificate" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterCACertificateRequest" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificateArn: S.optional(S.String), certificateId: S.optional(S.String) }),
      ).annotate({ identifier: "RegisterCACertificateResponse" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificatePem: S.String,
          caCertificatePem: S.optional(S.String),
          setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/certificate/register" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterCertificateRequest" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificatePem: S.String, status: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/certificate/register-no-ca" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterCertificateWithoutCARequest" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateBody: S.String, parameters: S.optional(__S(8256, __c258, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/things" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterThingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificatePem: S.optional(S.String),
          resourceArns: S.optional(__S(8256, __c258, 0)),
        }),
      ).annotate({ identifier: "RegisterThingResponse" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.String.pipe(T.HttpLabel("certificateId")),
          rejectReason: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/reject-certificate-transfer/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectCertificateTransferRequest" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.optional(S.String),
          billingGroupArn: S.optional(S.String),
          thingName: S.optional(S.String),
          thingArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/billing-groups/removeThingFromBillingGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveThingFromBillingGroupRequest" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.optional(S.String),
          thingGroupArn: S.optional(S.String),
          thingName: S.optional(S.String),
          thingArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/thing-groups/removeThingFromThingGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveThingFromThingGroupRequest" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleName: S.String.pipe(T.HttpLabel("ruleName")),
          topicRulePayload: __S(10496, __c328, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "TopicRulePayload" }),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/rules/{ruleName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ReplaceTopicRuleRequest" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          indexName: S.optional(S.String),
          queryString: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          queryVersion: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/indices/search" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connected: S.optional(S.Boolean),
          timestamp: S.optional(S.Number),
          disconnectReason: S.optional(S.String),
          keepAliveDuration: S.optional(S.Number),
          cleanSession: S.optional(S.Boolean),
          sessionExpiry: S.optional(S.Number),
          clientId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ThingConnectivity" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String),
          thingId: S.optional(S.String),
          thingTypeName: S.optional(S.String),
          thingGroupNames: S.optional(__S(7904, __c247, 0)),
          attributes: S.optional(__S(8256, __c258, 0)),
          shadow: S.optional(S.String),
          deviceDefender: S.optional(S.String),
          connectivity: S.optional(__S(6017, __c188, 1)),
        }),
      ).annotate({ identifier: "ThingDocument" });
    case 3:
      return S.Array(__S(6018, __c188, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.optional(S.String),
          thingGroupId: S.optional(S.String),
          thingGroupDescription: S.optional(S.String),
          attributes: S.optional(__S(8256, __c258, 0)),
          parentGroupNames: S.optional(__S(7904, __c247, 0)),
        }),
      ).annotate({ identifier: "ThingGroupDocument" });
    case 5:
      return S.Array(__S(6020, __c188, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          things: S.optional(__S(6019, __c188, 3)),
          thingGroups: S.optional(__S(6021, __c188, 5)),
        }),
      ).annotate({ identifier: "SearchIndexResponse" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ authorizerName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/default-authorizer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetDefaultAuthorizerRequest" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          policyVersionId: S.String.pipe(T.HttpLabel("policyVersionId")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/policies/{policyName}/version/{policyVersionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetDefaultPolicyVersionRequest" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, logLevel: S.optional(S.String) }),
      ).annotate({ identifier: "LoggingOptionsPayload" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          loggingOptionsPayload: __S(6112, __c191, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "LoggingOptionsPayload" }),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/loggingOptions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetLoggingOptionsRequest" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logTarget: __S(5632, __c176, 0), logLevel: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2LoggingLevel" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetV2LoggingLevelRequest" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.optional(S.String),
          defaultLogLevel: S.optional(S.String),
          disableAllLogs: S.optional(S.Boolean),
          eventConfigurations: S.optional(__S(3265, __c102, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2LoggingOptions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetV2LoggingOptionsRequest" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String.pipe(T.HttpLabel("taskId")),
          target: __S(865, __c27, 1),
          auditCheckToActionsMapping: __S(864, __c27, 0),
          clientRequestToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/mitigationactions/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAuditMitigationActionsTaskRequest" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ taskId: S.optional(S.String) })).annotate({
        identifier: "StartAuditMitigationActionsTaskResponse",
      });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String.pipe(T.HttpLabel("taskId")),
          target: __S(1376, __c43, 0),
          actions: __S(7904, __c247, 0),
          violationEventOccurrenceRange: S.optional(__S(1377, __c43, 1)),
          includeOnlyActiveViolations: S.optional(S.Boolean),
          includeSuppressedAlerts: S.optional(S.Boolean),
          clientRequestToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/detect/mitigationactions/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDetectMitigationActionsTaskRequest" });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetCheckNames: __S(7904, __c247, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/audit/tasks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartOnDemandAuditTaskRequest" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateBody: S.String,
          inputFileBucket: S.String,
          inputFileKey: S.String,
          roleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/thing-registration-tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartThingRegistrationTaskRequest" });
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/thing-registration-tasks/{taskId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopThingRegistrationTaskRequest" });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(8481, __c265, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionType: S.optional(S.String), resources: __S(7904, __c247, 0) }),
      ).annotate({ identifier: "AuthInfo" });
    case 1:
      return S.Array(__S(6432, __c201, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          principal: S.optional(S.String),
          cognitoIdentityPoolId: S.optional(S.String),
          authInfos: __S(6433, __c201, 1),
          clientId: S.optional(S.String).pipe(T.HttpQuery("clientId")),
          policyNamesToAdd: S.optional(__S(7904, __c247, 0)),
          policyNamesToSkip: S.optional(__S(7904, __c247, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/test-authorization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestAuthorizationRequest" });
    case 3:
      return S.suspend(() => S.Struct({ policies: S.optional(__S(3425, __c107, 1)) })).annotate({
        identifier: "Allowed",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          implicitDeny: S.optional(__S(6435, __c201, 3)),
          explicitDeny: S.optional(__S(6435, __c201, 3)),
        }),
      ).annotate({ identifier: "Denied" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          authInfo: S.optional(__S(6432, __c201, 0)),
          allowed: S.optional(__S(6435, __c201, 3)),
          denied: S.optional(__S(6436, __c201, 4)),
          authDecision: S.optional(S.String),
          missingContextValues: S.optional(__S(7904, __c247, 0)),
        }),
      ).annotate({ identifier: "AuthResult" });
    case 6:
      return S.Array(__S(6437, __c201, 5));
    case 7:
      return S.suspend(() => S.Struct({ authResults: S.optional(__S(6438, __c201, 6)) })).annotate({
        identifier: "TestAuthorizationResponse",
      });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ headers: S.optional(__S(8256, __c258, 0)), queryString: S.optional(S.String) }),
      ).annotate({ identifier: "HttpContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          username: S.optional(S.String),
          password: S.optional(T.Blob),
          clientId: S.optional(S.String),
        }),
      ).annotate({ identifier: "MqttContext" });
    case 2:
      return S.suspend(() => S.Struct({ serverName: S.optional(S.String) })).annotate({
        identifier: "TlsContext",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
          token: S.optional(S.String),
          tokenSignature: S.optional(S.String),
          httpContext: S.optional(__S(6464, __c202, 0)),
          mqttContext: S.optional(__S(6465, __c202, 1)),
          tlsContext: S.optional(__S(6466, __c202, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/authorizer/{authorizerName}/test" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestInvokeAuthorizerRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          isAuthenticated: S.optional(S.Boolean),
          principalId: S.optional(S.String),
          policyDocuments: S.optional(__S(7904, __c247, 0)),
          refreshAfterInSeconds: S.optional(S.Number),
          disconnectAfterInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TestInvokeAuthorizerResponse" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.String.pipe(T.HttpLabel("certificateId")),
          targetAwsAccount: S.String.pipe(T.HttpQuery("targetAwsAccount")),
          transferMessage: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/transfer-certificate/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TransferCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ transferredCertificateArn: S.optional(S.String) }),
      ).annotate({ identifier: "TransferCertificateResponse" });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(7904, __c247, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/untag" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.optional(S.String),
          auditNotificationTargetConfigurations: S.optional(__S(673, __c21, 1)),
          auditCheckConfigurations: S.optional(__S(676, __c21, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/audit/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountAuditConfigurationRequest" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          checkName: S.String,
          resourceIdentifier: __S(8386, __c262, 2),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          suppressIndefinitely: S.optional(S.Boolean),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/audit/suppressions/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAuditSuppressionRequest" });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
          authorizerFunctionArn: S.optional(S.String),
          tokenKeyName: S.optional(S.String),
          tokenSigningPublicKeys: S.optional(__S(8256, __c258, 0)),
          status: S.optional(S.String),
          enableCachingForHttp: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/authorizer/{authorizerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAuthorizerRequest" });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
          billingGroupProperties: __S(8544, __c267, 0),
          expectedVersion: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/billing-groups/{billingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBillingGroupRequest" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ version: S.optional(S.Number) })).annotate({
        identifier: "UpdateBillingGroupResponse",
      });
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.String.pipe(T.HttpLabel("certificateId")),
          newStatus: S.optional(S.String).pipe(T.HttpQuery("newStatus")),
          newAutoRegistrationStatus: S.optional(S.String).pipe(
            T.HttpQuery("newAutoRegistrationStatus"),
          ),
          registrationConfig: S.optional(__S(1120, __c35, 0)),
          removeAutoRegistration: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/cacertificate/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCACertificateRequest" });
  }
}
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.String.pipe(T.HttpLabel("certificateId")),
          newStatus: S.String.pipe(T.HttpQuery("newStatus")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/certificates/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCertificateRequest" });
  }
}
function __c212(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateProviderName: S.String.pipe(T.HttpLabel("certificateProviderName")),
          lambdaFunctionArn: S.optional(S.String),
          accountDefaultForOperations: S.optional(__S(8672, __c271, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/certificate-providers/{certificateProviderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCertificateProviderRequest" });
  }
}
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          commandId: S.String.pipe(T.HttpLabel("commandId")),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          deprecated: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/commands/{commandId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCommandRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commandId: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          deprecated: S.optional(S.Boolean),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateCommandResponse" });
  }
}
function __c214(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.String.pipe(T.HttpLabel("metricName")),
          displayName: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/custom-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCustomMetricRequest" });
  }
}
function __c215(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          stringValues: __S(7904, __c247, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/dimensions/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDimensionRequest" });
  }
}
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.String.pipe(T.HttpLabel("domainConfigurationName")),
          authorizerConfig: S.optional(__S(8928, __c279, 0)),
          domainConfigurationStatus: S.optional(S.String),
          removeAuthorizerConfig: S.optional(S.Boolean),
          tlsConfig: S.optional(__S(8929, __c279, 1)),
          serverCertificateConfig: S.optional(__S(8930, __c279, 2)),
          authenticationType: S.optional(S.String),
          applicationProtocol: S.optional(S.String),
          clientCertificateConfig: S.optional(__S(8931, __c279, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domainConfigurations/{domainConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainConfigurationRequest" });
  }
}
function __c217(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          thingGroupProperties: __S(9056, __c283, 0),
          expectedVersion: S.optional(S.Number),
          indexName: S.optional(S.String),
          queryString: S.optional(S.String),
          queryVersion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/dynamic-thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDynamicThingGroupRequest" });
  }
}
function __c218(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          encryptionType: S.String,
          kmsKeyArn: S.optional(S.String),
          kmsAccessRoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/encryption-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEncryptionConfigurationRequest" });
  }
}
function __c219(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventConfigurations: S.optional(__S(1601, __c50, 1)) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/event-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventConfigurationsRequest" });
  }
}
function __c220(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.String.pipe(T.HttpLabel("metricName")),
          queryString: S.optional(S.String),
          aggregationType: S.optional(__S(9120, __c285, 0)),
          period: S.optional(S.Number),
          aggregationField: S.optional(S.String),
          description: S.optional(S.String),
          queryVersion: S.optional(S.String),
          indexName: S.String,
          unit: S.optional(S.String),
          expectedVersion: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/fleet-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFleetMetricRequest" });
  }
}
function __c221(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingIndexingConfiguration: S.optional(__S(2726, __c85, 6)),
          thingGroupIndexingConfiguration: S.optional(__S(2727, __c85, 7)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/indexing/config" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateIndexingConfigurationRequest" });
  }
}
function __c222(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          description: S.optional(S.String),
          presignedUrlConfig: S.optional(__S(9248, __c289, 0)),
          jobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          abortConfig: S.optional(__S(9249, __c289, 1)),
          timeoutConfig: S.optional(__S(9314, __c291, 2)),
          namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
          jobExecutionsRetryConfig: S.optional(__S(9252, __c289, 4)),
        }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/jobs/{jobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateJobRequest" });
  }
}
function __c223(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionName: S.String.pipe(T.HttpLabel("actionName")),
          roleArn: S.optional(S.String),
          actionParams: S.optional(__S(9477, __c296, 5)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/mitigationactions/actions/{actionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMitigationActionRequest" });
  }
}
function __c224(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          description: S.optional(SensitiveString),
          defaultVersionName: S.optional(S.String),
          unsetDefaultVersion: S.optional(S.Boolean),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/packages/{packageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePackageRequest" });
  }
}
function __c225(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          versionUpdateByJobsConfig: S.optional(__S(2912, __c91, 0)),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/package-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePackageConfigurationRequest" });
  }
}
function __c226(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
          description: S.optional(SensitiveString),
          attributes: S.optional(__S(8256, __c258, 0)),
          artifact: S.optional(__S(7808, __c244, 0)),
          action: S.optional(S.String),
          recipe: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/packages/{packageName}/versions/{versionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePackageVersionRequest" });
  }
}
function __c227(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String.pipe(T.HttpLabel("templateName")),
          description: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          defaultVersionId: S.optional(S.Number),
          provisioningRoleArn: S.optional(S.String),
          preProvisioningHook: S.optional(__S(9792, __c306, 0)),
          removePreProvisioningHook: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/provisioning-templates/{templateName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProvisioningTemplateRequest" });
  }
}
function __c228(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          roleAlias: S.String.pipe(T.HttpLabel("roleAlias")),
          roleArn: S.optional(S.String),
          credentialDurationSeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/role-aliases/{roleAlias}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRoleAliasRequest" });
  }
}
function __c229(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          frequency: S.optional(S.String),
          dayOfMonth: S.optional(S.String),
          dayOfWeek: S.optional(S.String),
          targetCheckNames: S.optional(__S(7904, __c247, 0)),
          scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/audit/scheduledaudits/{scheduledAuditName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateScheduledAuditRequest" });
  }
}
function __c230(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
          securityProfileDescription: S.optional(S.String),
          behaviors: S.optional(__S(10144, __c317, 0)),
          alertTargets: S.optional(__S(10113, __c316, 1)),
          additionalMetricsToRetain: S.optional(__S(7904, __c247, 0)),
          additionalMetricsToRetainV2: S.optional(__S(10115, __c316, 3)),
          deleteBehaviors: S.optional(S.Boolean),
          deleteAlertTargets: S.optional(S.Boolean),
          deleteAdditionalMetricsToRetain: S.optional(S.Boolean),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
          metricsExportConfig: S.optional(__S(10116, __c316, 4)),
          deleteMetricsExportConfig: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/security-profiles/{securityProfileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSecurityProfileRequest" });
  }
}
function __c231(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          streamId: S.String.pipe(T.HttpLabel("streamId")),
          description: S.optional(S.String),
          files: S.optional(__S(10209, __c319, 1)),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/streams/{streamId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStreamRequest" });
  }
}
function __c232(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          thingTypeName: S.optional(S.String),
          attributePayload: S.optional(__S(9024, __c282, 0)),
          expectedVersion: S.optional(S.Number),
          removeThingType: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/things/{thingName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateThingRequest" });
  }
}
function __c233(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          thingGroupProperties: __S(9056, __c283, 0),
          expectedVersion: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateThingGroupRequest" });
  }
}
function __c234(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String),
          thingGroupsToAdd: S.optional(__S(7904, __c247, 0)),
          thingGroupsToRemove: S.optional(__S(7904, __c247, 0)),
          overrideDynamicGroups: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/thing-groups/updateThingGroupsForThing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateThingGroupsForThingRequest" });
  }
}
function __c235(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")),
          thingTypeProperties: S.optional(__S(10371, __c324, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/thing-types/{thingTypeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateThingTypeRequest" });
  }
}
function __c236(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, status: S.String }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTopicRuleDestinationRequest" });
  }
}
function __c237(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ behaviors: __S(10144, __c317, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/security-profile-behaviors/validate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateSecurityProfileBehaviorsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ errorMessage: S.optional(S.String) })).annotate({
        identifier: "ValidationError",
      });
    case 2:
      return S.Array(__S(7585, __c237, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          valid: S.optional(S.Boolean),
          validationErrors: S.optional(__S(7586, __c237, 2)),
        }),
      ).annotate({ identifier: "ValidateSecurityProfileBehaviorsResponse" });
  }
}
function __c238(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.String.pipe(T.HttpLabel("certificateId")),
          setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/accept-certificate-transfer/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptCertificateTransferRequest" });
  }
}
function __c239(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptCertificateTransferResponse",
      });
  }
}
function __c240(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.optional(S.String),
          billingGroupArn: S.optional(S.String),
          thingName: S.optional(S.String),
          thingArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/billing-groups/addThingToBillingGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddThingToBillingGroupRequest" });
  }
}
function __c241(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.optional(S.String),
          thingGroupArn: S.optional(S.String),
          thingName: S.optional(S.String),
          thingArn: S.optional(S.String),
          overrideDynamicGroups: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/thing-groups/addThingToThingGroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddThingToThingGroupRequest" });
  }
}
function __c242(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
          sbom: __S(7808, __c244, 0),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/packages/{packageName}/versions/{versionName}/sbom" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateSbomWithPackageVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageName: S.optional(S.String),
          versionName: S.optional(S.String),
          sbom: S.optional(__S(7808, __c244, 0)),
          sbomValidationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateSbomWithPackageVersionResponse" });
  }
}
function __c243(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          key: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Location" });
  }
}
function __c244(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3Location: S.optional(__S(7776, __c243, 0)) })).annotate({
        identifier: "Sbom",
      });
  }
}
function __c245(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targets: __S(7904, __c247, 0),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          comment: S.optional(S.String),
          namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/jobs/{jobId}/targets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateTargetsWithJobRequest" });
  }
}
function __c246(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobId: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateTargetsWithJobResponse" });
  }
}
function __c247(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c248(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")), target: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/target-policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachPolicyRequest" });
  }
}
function __c249(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          principal: S.String.pipe(T.HttpHeader("x-amzn-iot-principal")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/principal-policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachPrincipalPolicyRequest" });
  }
}
function __c250(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
          securityProfileTargetArn: S.String.pipe(T.HttpQuery("securityProfileTargetArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/security-profiles/{securityProfileName}/targets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachSecurityProfileRequest" });
  }
}
function __c251(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
          thingPrincipalType: S.optional(S.String).pipe(T.HttpQuery("thingPrincipalType")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/things/{thingName}/principals" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AttachThingPrincipalRequest" });
  }
}
function __c252(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/audit/mitigationactions/tasks/{taskId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelAuditMitigationActionsTaskRequest" });
  }
}
function __c253(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/audit/tasks/{taskId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelAuditTaskRequest" });
  }
}
function __c254(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/cancel-certificate-transfer/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelCertificateTransferRequest" });
  }
}
function __c255(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/detect/mitigationactions/tasks/{taskId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelDetectMitigationActionsTaskRequest" });
  }
}
function __c256(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          reasonCode: S.optional(S.String),
          comment: S.optional(S.String),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/jobs/{jobId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobRequest" });
  }
}
function __c257(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
          expectedVersion: S.optional(S.Number),
          statusDetails: S.optional(__S(8256, __c258, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/things/{thingName}/jobs/{jobId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobExecutionRequest" });
  }
}
function __c258(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c259(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/default-authorizer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ClearDefaultAuthorizerRequest" });
  }
}
function __c260(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ confirmationToken: S.String.pipe(T.HttpLabel("confirmationToken")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/confirmdestination/{confirmationToken+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConfirmTopicRuleDestinationRequest" });
  }
}
function __c261(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          checkName: S.String,
          resourceIdentifier: __S(8386, __c262, 2),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          suppressIndefinitely: S.optional(S.Boolean),
          description: S.optional(S.String),
          clientRequestToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/suppressions/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAuditSuppressionRequest" });
  }
}
function __c262(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyName: S.optional(S.String), policyVersionId: S.optional(S.String) }),
      ).annotate({ identifier: "PolicyVersionIdentifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          issuerCertificateSubject: S.optional(S.String),
          issuerId: S.optional(S.String),
          issuerCertificateSerialNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "IssuerCertificateIdentifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          deviceCertificateId: S.optional(S.String),
          caCertificateId: S.optional(S.String),
          cognitoIdentityPoolId: S.optional(S.String),
          clientId: S.optional(S.String),
          policyVersionIdentifier: S.optional(__S(8384, __c262, 0)),
          account: S.optional(S.String),
          iamRoleArn: S.optional(S.String),
          roleAliasArn: S.optional(S.String),
          issuerCertificateIdentifier: S.optional(__S(8385, __c262, 1)),
          deviceCertificateArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceIdentifier" });
  }
}
function __c263(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
          authorizerFunctionArn: S.String,
          tokenKeyName: S.optional(S.String),
          tokenSigningPublicKeys: S.optional(__S(8256, __c258, 0)),
          status: S.optional(S.String),
          tags: S.optional(__S(8481, __c265, 1)),
          signingDisabled: S.optional(S.Boolean),
          enableCachingForHttp: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/authorizer/{authorizerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAuthorizerRequest" });
  }
}
function __c264(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ authorizerName: S.optional(S.String), authorizerArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateAuthorizerResponse" });
  }
}
function __c265(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(8480, __c265, 0));
  }
}
function __c266(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
          billingGroupProperties: S.optional(__S(8544, __c267, 0)),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/billing-groups/{billingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBillingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.optional(S.String),
          billingGroupArn: S.optional(S.String),
          billingGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateBillingGroupResponse" });
  }
}
function __c267(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ billingGroupDescription: S.optional(S.String) })).annotate({
        identifier: "BillingGroupProperties",
      });
  }
}
function __c268(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateSigningRequest: S.String,
          setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/certificates" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCertificateFromCsrRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          certificatePem: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateCertificateFromCsrResponse" });
  }
}
function __c269(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateProviderName: S.String.pipe(T.HttpLabel("certificateProviderName")),
          lambdaFunctionArn: S.String,
          accountDefaultForOperations: __S(8672, __c271, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/certificate-providers/{certificateProviderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCertificateProviderRequest" });
  }
}
function __c270(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateProviderName: S.optional(S.String),
          certificateProviderArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateCertificateProviderResponse" });
  }
}
function __c271(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c272(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          commandId: S.String.pipe(T.HttpLabel("commandId")),
          namespace: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          payload: S.optional(__S(8736, __c273, 0)),
          payloadTemplate: S.optional(S.String),
          preprocessor: S.optional(__S(8738, __c273, 2)),
          mandatoryParameters: S.optional(__S(8744, __c273, 8)),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/commands/{commandId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCommandRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ commandId: S.optional(S.String), commandArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateCommandResponse" });
  }
}
function __c273(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ content: S.optional(T.Blob), contentType: S.optional(S.String) }),
      ).annotate({ identifier: "CommandPayload" });
    case 1:
      return S.suspend(() => S.Struct({ outputFormat: S.String })).annotate({
        identifier: "AwsJsonSubstitutionCommandPreprocessorConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ awsJsonSubstitution: S.optional(__S(8737, __c273, 1)) }),
      ).annotate({ identifier: "CommandPreprocessor" });
    case 3:
      return S.suspend(() => S.Struct({ min: S.String, max: S.String })).annotate({
        identifier: "CommandParameterValueNumberRange",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          number: S.optional(S.String),
          numbers: S.optional(__S(7904, __c247, 0)),
          string: S.optional(S.String),
          strings: S.optional(__S(7904, __c247, 0)),
          numberRange: S.optional(__S(8739, __c273, 3)),
        }),
      ).annotate({ identifier: "CommandParameterValueComparisonOperand" });
    case 5:
      return S.suspend(() =>
        S.Struct({ comparisonOperator: S.String, operand: __S(8740, __c273, 4) }),
      ).annotate({ identifier: "CommandParameterValueCondition" });
    case 6:
      return S.Array(__S(8741, __c273, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.optional(S.String),
          value: S.optional(__S(8768, __c274, 0)),
          defaultValue: S.optional(__S(8768, __c274, 0)),
          valueConditions: S.optional(__S(8742, __c273, 6)),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommandParameter" });
    case 8:
      return S.Array(__S(8743, __c273, 7));
  }
}
function __c274(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S: S.optional(S.String),
          B: S.optional(S.Boolean),
          I: S.optional(S.Number),
          L: S.optional(S.Number),
          D: S.optional(S.Number),
          BIN: S.optional(T.Blob),
          UL: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommandParameterValue" });
  }
}
function __c275(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.String.pipe(T.HttpLabel("metricName")),
          displayName: S.optional(S.String),
          metricType: S.String,
          tags: S.optional(__S(8481, __c265, 1)),
          clientRequestToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/custom-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomMetricRequest" });
  }
}
function __c276(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricName: S.optional(S.String), metricArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateCustomMetricResponse" });
  }
}
function __c277(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          type: S.String,
          stringValues: __S(7904, __c247, 0),
          tags: S.optional(__S(8481, __c265, 1)),
          clientRequestToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/dimensions/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDimensionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDimensionResponse" });
  }
}
function __c278(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.String.pipe(T.HttpLabel("domainConfigurationName")),
          domainName: S.optional(S.String),
          serverCertificateArns: S.optional(__S(7904, __c247, 0)),
          validationCertificateArn: S.optional(S.String),
          authorizerConfig: S.optional(__S(8928, __c279, 0)),
          serviceType: S.optional(S.String),
          tags: S.optional(__S(8481, __c265, 1)),
          tlsConfig: S.optional(__S(8929, __c279, 1)),
          serverCertificateConfig: S.optional(__S(8930, __c279, 2)),
          authenticationType: S.optional(S.String),
          applicationProtocol: S.optional(S.String),
          clientCertificateConfig: S.optional(__S(8931, __c279, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domainConfigurations/{domainConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainConfigurationRequest" });
  }
}
function __c279(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          defaultAuthorizerName: S.optional(S.String),
          allowAuthorizerOverride: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AuthorizerConfig" });
    case 1:
      return S.suspend(() => S.Struct({ securityPolicy: S.optional(S.String) })).annotate({
        identifier: "TlsConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          enableOCSPCheck: S.optional(S.Boolean),
          ocspLambdaArn: S.optional(S.String),
          ocspAuthorizedResponderArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerCertificateConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({ clientCertificateCallbackArn: S.optional(S.String) }),
      ).annotate({ identifier: "ClientCertificateConfig" });
  }
}
function __c280(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.optional(S.String),
          domainConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDomainConfigurationResponse" });
  }
}
function __c281(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          thingGroupProperties: S.optional(__S(9056, __c283, 0)),
          indexName: S.optional(S.String),
          queryString: S.String,
          queryVersion: S.optional(S.String),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/dynamic-thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDynamicThingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.optional(S.String),
          thingGroupArn: S.optional(S.String),
          thingGroupId: S.optional(S.String),
          indexName: S.optional(S.String),
          queryString: S.optional(S.String),
          queryVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDynamicThingGroupResponse" });
  }
}
function __c282(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributes: S.optional(__S(8256, __c258, 0)), merge: S.optional(S.Boolean) }),
      ).annotate({ identifier: "AttributePayload" });
  }
}
function __c283(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupDescription: S.optional(S.String),
          attributePayload: S.optional(__S(9024, __c282, 0)),
        }),
      ).annotate({ identifier: "ThingGroupProperties" });
  }
}
function __c284(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.String.pipe(T.HttpLabel("metricName")),
          queryString: S.String,
          aggregationType: __S(9120, __c285, 0),
          period: S.Number,
          aggregationField: S.String,
          description: S.optional(S.String),
          queryVersion: S.optional(S.String),
          indexName: S.optional(S.String),
          unit: S.optional(S.String),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/fleet-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFleetMetricRequest" });
  }
}
function __c285(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, values: S.optional(__S(7904, __c247, 0)) }),
      ).annotate({ identifier: "AggregationType" });
  }
}
function __c286(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          targets: __S(7904, __c247, 0),
          documentSource: S.optional(S.String),
          document: S.optional(S.String),
          description: S.optional(S.String),
          presignedUrlConfig: S.optional(__S(9248, __c289, 0)),
          targetSelection: S.optional(S.String),
          jobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          abortConfig: S.optional(__S(9249, __c289, 1)),
          timeoutConfig: S.optional(__S(9314, __c291, 2)),
          tags: S.optional(__S(8481, __c265, 1)),
          namespaceId: S.optional(S.String),
          jobTemplateArn: S.optional(S.String),
          jobExecutionsRetryConfig: S.optional(__S(9252, __c289, 4)),
          documentParameters: S.optional(__S(8256, __c258, 0)),
          schedulingConfig: S.optional(__S(9184, __c287, 0)),
          destinationPackageVersions: S.optional(__S(7904, __c247, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/jobs/{jobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateJobRequest" });
  }
}
function __c287(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(S.String),
          endTime: S.optional(S.String),
          endBehavior: S.optional(S.String),
          maintenanceWindows: S.optional(__S(9217, __c288, 1)),
        }),
      ).annotate({ identifier: "SchedulingConfig" });
  }
}
function __c288(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ startTime: S.String, durationInMinutes: S.Number }),
      ).annotate({ identifier: "MaintenanceWindow" });
    case 1:
      return S.Array(__S(9216, __c288, 0));
  }
}
function __c289(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.optional(S.String), expiresInSec: S.optional(S.Number) }),
      ).annotate({ identifier: "PresignedUrlConfig" });
    case 1:
      return S.suspend(() => S.Struct({ criteriaList: __S(9313, __c291, 1) })).annotate({
        identifier: "AbortConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ failureType: S.String, numberOfRetries: S.Number }),
      ).annotate({ identifier: "RetryCriteria" });
    case 3:
      return S.Array(__S(9250, __c289, 2));
    case 4:
      return S.suspend(() => S.Struct({ criteriaList: __S(9251, __c289, 3) })).annotate({
        identifier: "JobExecutionsRetryConfig",
      });
  }
}
function __c290(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          numberOfNotifiedThings: S.optional(S.Number),
          numberOfSucceededThings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RateIncreaseCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          baseRatePerMinute: S.Number,
          incrementFactor: S.Number,
          rateIncreaseCriteria: __S(9280, __c290, 0),
        }),
      ).annotate({ identifier: "ExponentialRolloutRate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          maximumPerMinute: S.optional(S.Number),
          exponentialRate: S.optional(__S(9281, __c290, 1)),
        }),
      ).annotate({ identifier: "JobExecutionsRolloutConfig" });
  }
}
function __c291(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          failureType: S.String,
          action: S.String,
          thresholdPercentage: S.Number,
          minNumberOfExecutedThings: S.Number,
        }),
      ).annotate({ identifier: "AbortCriteria" });
    case 1:
      return S.Array(__S(9312, __c291, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ inProgressTimeoutInMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "TimeoutConfig" });
  }
}
function __c292(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobTemplateId: S.String.pipe(T.HttpLabel("jobTemplateId")),
          jobArn: S.optional(S.String),
          documentSource: S.optional(S.String),
          document: S.optional(S.String),
          description: S.String,
          presignedUrlConfig: S.optional(__S(9248, __c289, 0)),
          jobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          abortConfig: S.optional(__S(9249, __c289, 1)),
          timeoutConfig: S.optional(__S(9314, __c291, 2)),
          tags: S.optional(__S(8481, __c265, 1)),
          jobExecutionsRetryConfig: S.optional(__S(9252, __c289, 4)),
          maintenanceWindows: S.optional(__S(9217, __c288, 1)),
          destinationPackageVersions: S.optional(__S(7904, __c247, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/job-templates/{jobTemplateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateJobTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ jobTemplateArn: S.optional(S.String), jobTemplateId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateJobTemplateResponse" });
  }
}
function __c293(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/keys-and-certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKeysAndCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          certificateId: S.optional(S.String),
          certificatePem: S.optional(S.String),
          keyPair: S.optional(__S(9408, __c294, 0)),
        }),
      ).annotate({ identifier: "CreateKeysAndCertificateResponse" });
  }
}
function __c294(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PublicKey: S.optional(S.String), PrivateKey: S.optional(SensitiveString) }),
      ).annotate({ identifier: "KeyPair" });
  }
}
function __c295(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionName: S.String.pipe(T.HttpLabel("actionName")),
          roleArn: S.String,
          actionParams: __S(9477, __c296, 5),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/mitigationactions/actions/{actionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMitigationActionRequest" });
  }
}
function __c296(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ action: S.String })).annotate({
        identifier: "UpdateDeviceCertificateParams",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingGroupNames: __S(7904, __c247, 0),
          overrideDynamicGroups: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AddThingsToThingGroupParams" });
    case 2:
      return S.suspend(() => S.Struct({ templateName: S.String })).annotate({
        identifier: "ReplaceDefaultPolicyVersionParams",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ roleArnForLogging: S.String, logLevel: S.String }),
      ).annotate({ identifier: "EnableIoTLoggingParams" });
    case 4:
      return S.suspend(() => S.Struct({ topicArn: S.String })).annotate({
        identifier: "PublishFindingToSnsParams",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          updateDeviceCertificateParams: S.optional(__S(9472, __c296, 0)),
          updateCACertificateParams: S.optional(__S(9472, __c296, 0)),
          addThingsToThingGroupParams: S.optional(__S(9473, __c296, 1)),
          replaceDefaultPolicyVersionParams: S.optional(__S(9474, __c296, 2)),
          enableIoTLoggingParams: S.optional(__S(9475, __c296, 3)),
          publishFindingToSnsParams: S.optional(__S(9476, __c296, 4)),
        }),
      ).annotate({ identifier: "MitigationActionParams" });
  }
}
function __c297(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionArn: S.optional(S.String), actionId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateMitigationActionResponse" });
  }
}
function __c298(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ abortCriteriaList: __S(9313, __c291, 1) })).annotate({
        identifier: "AwsJobAbortConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          otaUpdateId: S.String.pipe(T.HttpLabel("otaUpdateId")),
          description: S.optional(S.String),
          targets: __S(7904, __c247, 0),
          protocols: S.optional(__S(8672, __c271, 0)),
          targetSelection: S.optional(S.String),
          awsJobExecutionsRolloutConfig: S.optional(__S(9282, __c290, 2)),
          awsJobPresignedUrlConfig: S.optional(__S(9568, __c299, 0)),
          awsJobAbortConfig: S.optional(__S(9536, __c298, 0)),
          awsJobTimeoutConfig: S.optional(__S(9314, __c291, 2)),
          files: __S(9580, __c299, 12),
          roleArn: S.String,
          additionalParameters: S.optional(__S(8256, __c258, 0)),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/otaUpdates/{otaUpdateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOTAUpdateRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          otaUpdateId: S.optional(S.String),
          awsIotJobId: S.optional(S.String),
          otaUpdateArn: S.optional(S.String),
          awsIotJobArn: S.optional(S.String),
          otaUpdateStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateOTAUpdateResponse" });
  }
}
function __c299(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ expiresInSec: S.optional(S.Number) })).annotate({
        identifier: "AwsJobPresignedUrlConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ streamId: S.optional(S.String), fileId: S.optional(S.Number) }),
      ).annotate({ identifier: "Stream" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          stream: S.optional(__S(9569, __c299, 1)),
          s3Location: S.optional(__S(7776, __c243, 0)),
        }),
      ).annotate({ identifier: "FileLocation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          certificateArn: S.optional(S.String),
          platform: S.optional(S.String),
          certificatePathOnDevice: S.optional(S.String),
        }),
      ).annotate({ identifier: "SigningProfileParameter" });
    case 4:
      return S.suspend(() =>
        S.Struct({ bucket: S.optional(S.String), prefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Destination" });
    case 5:
      return S.suspend(() =>
        S.Struct({ s3Destination: S.optional(__S(9572, __c299, 4)) }),
      ).annotate({ identifier: "Destination" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          signingProfileParameter: S.optional(__S(9571, __c299, 3)),
          signingProfileName: S.optional(S.String),
          destination: S.optional(__S(9573, __c299, 5)),
        }),
      ).annotate({ identifier: "StartSigningJobParameter" });
    case 7:
      return S.suspend(() => S.Struct({ inlineDocument: S.optional(T.Blob) })).annotate({
        identifier: "CodeSigningSignature",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ certificateName: S.optional(S.String), inlineDocument: S.optional(S.String) }),
      ).annotate({ identifier: "CodeSigningCertificateChain" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          signature: S.optional(__S(9575, __c299, 7)),
          certificateChain: S.optional(__S(9576, __c299, 8)),
          hashAlgorithm: S.optional(S.String),
          signatureAlgorithm: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomCodeSigning" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          awsSignerJobId: S.optional(S.String),
          startSigningJobParameter: S.optional(__S(9574, __c299, 6)),
          customCodeSigning: S.optional(__S(9577, __c299, 9)),
        }),
      ).annotate({ identifier: "CodeSigning" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          fileName: S.optional(S.String),
          fileType: S.optional(S.Number),
          fileVersion: S.optional(S.String),
          fileLocation: S.optional(__S(9570, __c299, 2)),
          codeSigning: S.optional(__S(9578, __c299, 10)),
          attributes: S.optional(__S(8256, __c258, 0)),
        }),
      ).annotate({ identifier: "OTAUpdateFile" });
    case 12:
      return S.Array(__S(9579, __c299, 11));
  }
}
function __c300(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          description: S.optional(SensitiveString),
          tags: S.optional(__S(8256, __c258, 0)),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/packages/{packageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePackageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageName: S.optional(S.String),
          packageArn: S.optional(S.String),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreatePackageResponse" });
  }
}
function __c301(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String.pipe(T.HttpLabel("packageName")),
          versionName: S.String.pipe(T.HttpLabel("versionName")),
          description: S.optional(SensitiveString),
          attributes: S.optional(__S(8256, __c258, 0)),
          artifact: S.optional(__S(7808, __c244, 0)),
          recipe: S.optional(SensitiveString),
          tags: S.optional(__S(8256, __c258, 0)),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/packages/{packageName}/versions/{versionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePackageVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packageVersionArn: S.optional(S.String),
          packageName: S.optional(S.String),
          versionName: S.optional(S.String),
          description: S.optional(SensitiveString),
          attributes: S.optional(__S(8256, __c258, 0)),
          status: S.optional(S.String),
          errorReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreatePackageVersionResponse" });
  }
}
function __c302(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          policyDocument: S.String,
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policies/{policyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyArn: S.optional(S.String),
          policyDocument: S.optional(S.String),
          policyVersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreatePolicyResponse" });
  }
}
function __c303(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String.pipe(T.HttpLabel("policyName")),
          policyDocument: S.String,
          setAsDefault: S.optional(S.Boolean).pipe(T.HttpQuery("setAsDefault")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policies/{policyName}/version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePolicyVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.optional(S.String),
          policyDocument: S.optional(S.String),
          policyVersionId: S.optional(S.String),
          isDefaultVersion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CreatePolicyVersionResponse" });
  }
}
function __c304(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String.pipe(T.HttpLabel("templateName")) }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/provisioning-templates/{templateName}/provisioning-claim",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProvisioningClaimRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.optional(S.String),
          certificatePem: S.optional(S.String),
          keyPair: S.optional(__S(9408, __c294, 0)),
          expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateProvisioningClaimResponse" });
  }
}
function __c305(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          description: S.optional(S.String),
          templateBody: S.String,
          enabled: S.optional(S.Boolean),
          provisioningRoleArn: S.String,
          preProvisioningHook: S.optional(__S(9792, __c306, 0)),
          tags: S.optional(__S(8481, __c265, 1)),
          type: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/provisioning-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProvisioningTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateArn: S.optional(S.String),
          templateName: S.optional(S.String),
          defaultVersionId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateProvisioningTemplateResponse" });
  }
}
function __c306(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ payloadVersion: S.optional(S.String), targetArn: S.String }),
      ).annotate({ identifier: "ProvisioningHook" });
  }
}
function __c307(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String.pipe(T.HttpLabel("templateName")),
          templateBody: S.String,
          setAsDefault: S.optional(S.Boolean).pipe(T.HttpQuery("setAsDefault")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/provisioning-templates/{templateName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProvisioningTemplateVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateArn: S.optional(S.String),
          templateName: S.optional(S.String),
          versionId: S.optional(S.Number),
          isDefaultVersion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CreateProvisioningTemplateVersionResponse" });
  }
}
function __c308(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          roleAlias: S.String.pipe(T.HttpLabel("roleAlias")),
          roleArn: S.String,
          credentialDurationSeconds: S.optional(S.Number),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/role-aliases/{roleAlias}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRoleAliasRequest" });
  }
}
function __c309(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleAlias: S.optional(S.String), roleAliasArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateRoleAliasResponse" });
  }
}
function __c310(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          frequency: S.String,
          dayOfMonth: S.optional(S.String),
          dayOfWeek: S.optional(S.String),
          targetCheckNames: __S(7904, __c247, 0),
          scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/scheduledaudits/{scheduledAuditName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateScheduledAuditRequest" });
  }
}
function __c311(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ scheduledAuditArn: S.optional(S.String) })).annotate({
        identifier: "CreateScheduledAuditResponse",
      });
  }
}
function __c312(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
          securityProfileDescription: S.optional(S.String),
          behaviors: S.optional(__S(10144, __c317, 0)),
          alertTargets: S.optional(__S(10113, __c316, 1)),
          additionalMetricsToRetain: S.optional(__S(7904, __c247, 0)),
          additionalMetricsToRetainV2: S.optional(__S(10115, __c316, 3)),
          tags: S.optional(__S(8481, __c265, 1)),
          metricsExportConfig: S.optional(__S(10116, __c316, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/security-profiles/{securityProfileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSecurityProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          securityProfileName: S.optional(S.String),
          securityProfileArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSecurityProfileResponse" });
  }
}
function __c313(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c314(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          count: S.optional(S.Number),
          cidrs: S.optional(__S(7904, __c247, 0)),
          ports: S.optional(__S(10016, __c313, 0)),
          number: S.optional(S.Number),
          numbers: S.optional(__S(10016, __c313, 0)),
          strings: S.optional(__S(7904, __c247, 0)),
        }),
      ).annotate({ identifier: "MetricValue" });
  }
}
function __c315(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dimensionName: S.String, operator: S.optional(S.String) }),
      ).annotate({ identifier: "MetricDimension" });
    case 1:
      return S.suspend(() => S.Struct({ statistic: S.optional(S.String) })).annotate({
        identifier: "StatisticalThreshold",
      });
    case 2:
      return S.suspend(() => S.Struct({ confidenceLevel: S.String })).annotate({
        identifier: "MachineLearningDetectionConfig",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          comparisonOperator: S.optional(S.String),
          value: S.optional(__S(10048, __c314, 0)),
          durationSeconds: S.optional(S.Number),
          consecutiveDatapointsToAlarm: S.optional(S.Number),
          consecutiveDatapointsToClear: S.optional(S.Number),
          statisticalThreshold: S.optional(__S(10081, __c315, 1)),
          mlDetectionConfig: S.optional(__S(10082, __c315, 2)),
        }),
      ).annotate({ identifier: "BehaviorCriteria" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          metric: S.optional(S.String),
          metricDimension: S.optional(__S(10080, __c315, 0)),
          criteria: S.optional(__S(10083, __c315, 3)),
          suppressAlerts: S.optional(S.Boolean),
          exportMetric: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Behavior" });
  }
}
function __c316(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ alertTargetArn: S.String, roleArn: S.String })).annotate({
        identifier: "AlertTarget",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(10112, __c316, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          metric: S.String,
          metricDimension: S.optional(__S(10080, __c315, 0)),
          exportMetric: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MetricToRetain" });
    case 3:
      return S.Array(__S(10114, __c316, 2));
    case 4:
      return S.suspend(() => S.Struct({ mqttTopic: S.String, roleArn: S.String })).annotate({
        identifier: "MetricsExportConfig",
      });
  }
}
function __c317(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(10084, __c315, 4));
  }
}
function __c318(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          streamId: S.String.pipe(T.HttpLabel("streamId")),
          description: S.optional(S.String),
          files: __S(10209, __c319, 1),
          roleArn: S.String,
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/streams/{streamId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStreamRequest" });
  }
}
function __c319(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileId: S.optional(S.Number), s3Location: S.optional(__S(7776, __c243, 0)) }),
      ).annotate({ identifier: "StreamFile" });
    case 1:
      return S.Array(__S(10208, __c319, 0));
  }
}
function __c320(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          streamId: S.optional(S.String),
          streamArn: S.optional(S.String),
          description: S.optional(S.String),
          streamVersion: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateStreamResponse" });
  }
}
function __c321(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          thingTypeName: S.optional(S.String),
          attributePayload: S.optional(__S(9024, __c282, 0)),
          billingGroupName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/things/{thingName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateThingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String),
          thingArn: S.optional(S.String),
          thingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateThingResponse" });
  }
}
function __c322(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          parentGroupName: S.optional(S.String),
          thingGroupProperties: S.optional(__S(9056, __c283, 0)),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateThingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.optional(S.String),
          thingGroupArn: S.optional(S.String),
          thingGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateThingGroupResponse" });
  }
}
function __c323(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")),
          thingTypeProperties: S.optional(__S(10371, __c324, 3)),
          tags: S.optional(__S(8481, __c265, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/thing-types/{thingTypeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateThingTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thingTypeName: S.optional(S.String),
          thingTypeArn: S.optional(S.String),
          thingTypeId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateThingTypeResponse" });
  }
}
function __c324(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userPropertyKey: S.optional(S.String),
          thingAttribute: S.optional(S.String),
          connectionAttribute: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropagatingAttribute" });
    case 1:
      return S.Array(__S(10368, __c324, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ propagatingAttributes: S.optional(__S(10369, __c324, 1)) }),
      ).annotate({ identifier: "Mqtt5Configuration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          thingTypeDescription: S.optional(S.String),
          searchableAttributes: S.optional(__S(7904, __c247, 0)),
          mqtt5Configuration: S.optional(__S(10370, __c324, 2)),
        }),
      ).annotate({ identifier: "ThingTypeProperties" });
  }
}
function __c325(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleName: S.String.pipe(T.HttpLabel("ruleName")),
          topicRulePayload: __S(10496, __c328, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "TopicRulePayload" }),
          tags: S.optional(S.String).pipe(T.HttpHeader("x-amz-tagging")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/rules/{ruleName}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTopicRuleRequest" });
  }
}
function __c326(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tableName: S.String,
          roleArn: S.String,
          operation: S.optional(S.String),
          hashKeyField: S.String,
          hashKeyValue: S.String,
          hashKeyType: S.optional(S.String),
          rangeKeyField: S.optional(S.String),
          rangeKeyValue: S.optional(S.String),
          rangeKeyType: S.optional(S.String),
          payloadField: S.optional(S.String),
        }),
      ).annotate({ identifier: "DynamoDBAction" });
    case 1:
      return S.suspend(() => S.Struct({ tableName: S.String })).annotate({
        identifier: "PutItemInput",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, putItem: __S(10433, __c326, 1) }),
      ).annotate({ identifier: "DynamoDBv2Action" });
    case 3:
      return S.suspend(() => S.Struct({ functionArn: S.String })).annotate({
        identifier: "LambdaAction",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ targetArn: S.String, roleArn: S.String, messageFormat: S.optional(S.String) }),
      ).annotate({ identifier: "SnsAction" });
    case 5:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, queueUrl: S.String, useBase64: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SqsAction" });
    case 6:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, streamName: S.String, partitionKey: S.optional(S.String) }),
      ).annotate({ identifier: "KinesisAction" });
    case 7:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "UserProperty",
      });
    case 8:
      return S.Array(__S(10439, __c326, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          payloadFormatIndicator: S.optional(S.String),
          contentType: S.optional(S.String),
          responseTopic: S.optional(S.String),
          correlationData: S.optional(S.String),
          messageExpiry: S.optional(S.String),
          userProperties: S.optional(__S(10440, __c326, 8)),
        }),
      ).annotate({ identifier: "MqttHeaders" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          topic: S.String,
          qos: S.optional(S.Number),
          headers: S.optional(__S(10441, __c326, 9)),
        }),
      ).annotate({ identifier: "RepublishAction" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          bucketName: S.String,
          key: S.String,
          cannedAcl: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Action" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          deliveryStreamName: S.String,
          separator: S.optional(S.String),
          batchMode: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FirehoseAction" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          metricNamespace: S.String,
          metricName: S.String,
          metricValue: S.String,
          metricUnit: S.String,
          metricTimestamp: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudwatchMetricAction" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          alarmName: S.String,
          stateReason: S.String,
          stateValue: S.String,
        }),
      ).annotate({ identifier: "CloudwatchAlarmAction" });
    case 15:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, logGroupName: S.String, batchMode: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CloudwatchLogsAction" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          endpoint: S.String,
          index: S.String,
          type: S.String,
          id: S.String,
        }),
      ).annotate({ identifier: "ElasticsearchAction" });
    case 17:
      return S.suspend(() => S.Struct({ token: S.String, url: S.String })).annotate({
        identifier: "SalesforceAction",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          channelArn: S.optional(S.String),
          channelName: S.optional(S.String),
          batchMode: S.optional(S.Boolean),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "IotAnalyticsAction" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          inputName: S.String,
          messageId: S.optional(S.String),
          batchMode: S.optional(S.Boolean),
          roleArn: S.String,
        }),
      ).annotate({ identifier: "IotEventsAction" });
    case 20:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ integerValue: S.String }),
        /*@__PURE__*/ S.Struct({ doubleValue: S.String }),
        /*@__PURE__*/ S.Struct({ booleanValue: S.String }),
      ]);
    case 21:
      return S.suspend(() =>
        S.Struct({ timeInSeconds: S.String, offsetInNanos: S.optional(S.String) }),
      ).annotate({ identifier: "AssetPropertyTimestamp" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          value: __S(10452, __c326, 20),
          timestamp: __S(10453, __c326, 21),
          quality: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetPropertyValue" });
    case 23:
      return S.Array(__S(10454, __c326, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          entryId: S.optional(S.String),
          assetId: S.optional(S.String),
          propertyId: S.optional(S.String),
          propertyAlias: S.optional(S.String),
          propertyValues: __S(10455, __c326, 23),
        }),
      ).annotate({ identifier: "PutAssetPropertyValueEntry" });
    case 25:
      return S.Array(__S(10456, __c326, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({ putAssetPropertyValueEntries: __S(10457, __c326, 25), roleArn: S.String }),
      ).annotate({ identifier: "IotSiteWiseAction" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          executionNamePrefix: S.optional(S.String),
          stateMachineName: S.String,
          roleArn: S.String,
        }),
      ).annotate({ identifier: "StepFunctionsAction" });
    case 28:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "TimestreamDimension",
      });
    case 29:
      return S.Array(__S(10460, __c326, 28));
    case 30:
      return S.suspend(() => S.Struct({ value: S.String, unit: S.String })).annotate({
        identifier: "TimestreamTimestamp",
      });
    case 31:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          databaseName: S.String,
          tableName: S.String,
          dimensions: __S(10461, __c326, 29),
          timestamp: S.optional(__S(10462, __c326, 30)),
        }),
      ).annotate({ identifier: "TimestreamAction" });
  }
}
function __c327(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ signingRegion: S.String, serviceName: S.String, roleArn: S.String }),
      ).annotate({ identifier: "SigV4Authorization" });
    case 1:
      return S.suspend(() => S.Struct({ sigv4: S.optional(__S(10464, __c327, 0)) })).annotate({
        identifier: "HttpAuthorization",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          maxBatchOpenMs: S.optional(S.Number),
          maxBatchSize: S.optional(S.Number),
          maxBatchSizeBytes: S.optional(S.Number),
          batchAcrossTopics: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BatchConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          url: S.String,
          confirmationUrl: S.optional(S.String),
          headers: S.optional(__S(10440, __c326, 8)),
          auth: S.optional(__S(10465, __c327, 1)),
          enableBatching: S.optional(S.Boolean),
          batchConfig: S.optional(__S(10466, __c327, 2)),
        }),
      ).annotate({ identifier: "HttpAction" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          destinationArn: S.String,
          topic: S.String,
          key: S.optional(S.String),
          partition: S.optional(S.String),
          clientProperties: __S(8256, __c258, 0),
          headers: S.optional(__S(10440, __c326, 8)),
        }),
      ).annotate({ identifier: "KafkaAction" });
    case 5:
      return S.suspend(() => S.Struct({ value: S.String, unit: S.optional(S.String) })).annotate({
        identifier: "LocationTimestamp",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          trackerName: S.String,
          deviceId: S.String,
          timestamp: S.optional(__S(10469, __c327, 5)),
          latitude: S.String,
          longitude: S.String,
        }),
      ).annotate({ identifier: "LocationAction" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          maxBatchSize: S.optional(S.Number),
          maxBatchOpenMs: S.optional(S.Number),
          maxBatchSizeBytes: S.optional(S.Number),
          batchAcrossTopics: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InfluxDBBatchConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          destinationArn: S.String,
          roleArn: S.String,
          databaseName: S.String,
          tableName: S.String,
          organization: S.optional(S.String),
          tags: S.optional(__S(8256, __c258, 0)),
          timestampUnit: S.optional(S.String),
          batchConfig: S.optional(__S(10471, __c327, 7)),
        }),
      ).annotate({ identifier: "InfluxDBAction" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          dynamoDB: S.optional(__S(10432, __c326, 0)),
          dynamoDBv2: S.optional(__S(10434, __c326, 2)),
          lambda: S.optional(__S(10435, __c326, 3)),
          sns: S.optional(__S(10436, __c326, 4)),
          sqs: S.optional(__S(10437, __c326, 5)),
          kinesis: S.optional(__S(10438, __c326, 6)),
          republish: S.optional(__S(10442, __c326, 10)),
          s3: S.optional(__S(10443, __c326, 11)),
          firehose: S.optional(__S(10444, __c326, 12)),
          cloudwatchMetric: S.optional(__S(10445, __c326, 13)),
          cloudwatchAlarm: S.optional(__S(10446, __c326, 14)),
          cloudwatchLogs: S.optional(__S(10447, __c326, 15)),
          elasticsearch: S.optional(__S(10448, __c326, 16)),
          salesforce: S.optional(__S(10449, __c326, 17)),
          iotAnalytics: S.optional(__S(10450, __c326, 18)),
          iotEvents: S.optional(__S(10451, __c326, 19)),
          iotSiteWise: S.optional(__S(10458, __c326, 26)),
          stepFunctions: S.optional(__S(10459, __c326, 27)),
          timestream: S.optional(__S(10463, __c326, 31)),
          http: S.optional(__S(10467, __c327, 3)),
          kafka: S.optional(__S(10468, __c327, 4)),
          openSearch: S.optional(__S(10448, __c326, 16)),
          location: S.optional(__S(10470, __c327, 6)),
          influxDB: S.optional(__S(10472, __c327, 8)),
        }),
      ).annotate({ identifier: "Action" });
    case 10:
      return S.Array(__S(10473, __c327, 9));
  }
}
function __c328(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sql: S.String,
          description: S.optional(S.String),
          actions: __S(10474, __c327, 10),
          ruleDisabled: S.optional(S.Boolean),
          awsIotSqlVersion: S.optional(S.String),
          errorAction: S.optional(__S(10473, __c327, 9)),
        }),
      ).annotate({ identifier: "TopicRulePayload" });
  }
}
function __c329(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ confirmationUrl: S.String })).annotate({
        identifier: "HttpUrlDestinationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subnetIds: __S(7904, __c247, 0),
          securityGroups: S.optional(__S(7904, __c247, 0)),
          vpcId: S.String,
          roleArn: S.String,
        }),
      ).annotate({ identifier: "VpcDestinationConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.String,
          influxDBVersion: S.String,
          secretId: S.String,
          secretType: S.optional(S.String),
          secretKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "InfluxDBDestinationConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          httpUrlConfiguration: S.optional(__S(10528, __c329, 0)),
          vpcConfiguration: S.optional(__S(10529, __c329, 1)),
          influxDBConfiguration: S.optional(__S(10530, __c329, 2)),
        }),
      ).annotate({ identifier: "TopicRuleDestinationConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ destinationConfiguration: __S(10531, __c329, 3) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/destinations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTopicRuleDestinationRequest" });
  }
}
function __c330(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusReason: S.optional(S.String),
          httpUrlProperties: S.optional(__S(10592, __c331, 0)),
          vpcProperties: S.optional(__S(10593, __c331, 1)),
          influxDBProperties: S.optional(__S(10594, __c331, 2)),
        }),
      ).annotate({ identifier: "TopicRuleDestination" });
    case 1:
      return S.suspend(() =>
        S.Struct({ topicRuleDestination: S.optional(__S(10560, __c330, 0)) }),
      ).annotate({ identifier: "CreateTopicRuleDestinationResponse" });
  }
}
function __c331(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ confirmationUrl: S.optional(S.String) })).annotate({
        identifier: "HttpUrlDestinationProperties",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subnetIds: S.optional(__S(7904, __c247, 0)),
          securityGroups: S.optional(__S(7904, __c247, 0)),
          vpcId: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcDestinationProperties" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.optional(S.String),
          influxDBVersion: S.optional(S.String),
          secretId: S.optional(S.String),
          secretType: S.optional(S.String),
          secretKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "InfluxDBDestinationProperties" });
  }
}
function __c332(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deleteScheduledAudits: S.optional(S.Boolean).pipe(T.HttpQuery("deleteScheduledAudits")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/audit/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccountAuditConfigurationRequest" });
  }
}
function __c333(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkName: S.String, resourceIdentifier: __S(8386, __c262, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audit/suppressions/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAuditSuppressionRequest" });
  }
}
function __c334(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ authorizerName: S.String.pipe(T.HttpLabel("authorizerName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/authorizer/{authorizerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAuthorizerRequest" });
  }
}
function __c335(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/billing-groups/{billingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBillingGroupRequest" });
  }
}
function __c336(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cacertificate/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCACertificateRequest" });
  }
}
function __c337(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateId: S.String.pipe(T.HttpLabel("certificateId")),
          forceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("forceDelete")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/certificates/{certificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCertificateRequest" });
  }
}
function __c338(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateProviderName: S.String.pipe(T.HttpLabel("certificateProviderName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/certificate-providers/{certificateProviderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCertificateProviderRequest" });
  }
}
function __c339(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commandId: S.String.pipe(T.HttpLabel("commandId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/commands/{commandId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCommandRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
      ).annotate({ identifier: "DeleteCommandResponse" });
  }
}
function __c340(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          executionId: S.String.pipe(T.HttpLabel("executionId")),
          targetArn: S.String.pipe(T.HttpQuery("targetArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/command-executions/{executionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCommandExecutionRequest" });
  }
}
function __c341(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricName: S.String.pipe(T.HttpLabel("metricName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/custom-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomMetricRequest" });
  }
}
function __c342(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/dimensions/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDimensionRequest" });
  }
}
function __c343(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainConfigurationName: S.String.pipe(T.HttpLabel("domainConfigurationName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domainConfigurations/{domainConfigurationName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainConfigurationRequest" });
  }
}
function __c344(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/dynamic-thing-groups/{thingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDynamicThingGroupRequest" });
  }
}
function __c345(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.String.pipe(T.HttpLabel("metricName")),
          expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/fleet-metric/{metricName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFleetMetricRequest" });
  }
}
function __c346(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
          namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/jobs/{jobId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteJobRequest" });
  }
}
function __c347(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          thingName: S.String.pipe(T.HttpLabel("thingName")),
          executionNumber: S.Number.pipe(T.HttpLabel("executionNumber")),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
          namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/things/{thingName}/jobs/{jobId}/executionNumber/{executionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteJobExecutionRequest" });
  }
}
function __c348(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobTemplateId: S.String.pipe(T.HttpLabel("jobTemplateId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/job-templates/{jobTemplateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteJobTemplateRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
