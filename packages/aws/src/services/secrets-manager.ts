import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Secrets Manager",
  target: "secretsmanager",
  version: "2017-10-17",
  sigv4: "secretsmanager",
  protocol: awsJson1_1Protocol,
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
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://secretsmanager-fips.${Region}.amazonaws.com`);
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://secretsmanager-fips.${Region}.amazonaws.com`);
              }
              return e(
                `https://secretsmanager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://secretsmanager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://secretsmanager.${Region}.amazonaws.com`);
              }
              if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
                return e(`https://secretsmanager.${Region}.amazonaws.com.cn`);
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://secretsmanager.${Region}.amazonaws.com`);
              }
              return e(
                `https://secretsmanager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://secretsmanager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DecryptionFailure
  extends /*@__PURE__*/ TE.TaggedError("DecryptionFailure", ["ServerError"])<{
    readonly message?: string;
  }> {}
export class EncryptionFailure
  extends /*@__PURE__*/ TE.TaggedError("EncryptionFailure", ["ServerError"])<{
    readonly message?: string;
  }> {}
export class InternalServiceError
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceError", [
    "ServerError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ TE.TaggedError("MalformedPolicyDocumentException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class PreconditionNotMetException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionNotMetException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class PublicPolicyException
  extends /*@__PURE__*/ TE.TaggedError("PublicPolicyException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ResourceExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceExistsException", [
    "ConflictError",
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export type SecretIdType = string;
export type SecretIdListType = string[];
export type FilterNameStringType =
  | "description"
  | "name"
  | "tag-key"
  | "tag-value"
  | "primary-region"
  | "owning-service"
  | "all"
  | (string & {});
export type FilterValueStringType = string;
export type FilterValuesStringList = string[];
export interface Filter {
  Key?: FilterNameStringType;
  Values?: string[];
}
export type FiltersListType = Filter[];
export type MaxResultsBatchType = number;
export type NextTokenType = string;
export interface BatchGetSecretValueRequest {
  SecretIdList?: string[];
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type SecretARNType = string;
export type SecretNameType = string;
export type SecretVersionIdType = string;
export type SecretBinaryType = Uint8Array | redacted.Redacted<Uint8Array>;
export type SecretStringType = string | redacted.Redacted<string>;
export type SecretVersionStageType = string;
export type SecretVersionStagesType = string[];
export type CreatedDateType = Date;
export interface SecretValueEntry {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  VersionStages?: string[];
  CreatedDate?: Date;
}
export type SecretValuesType = SecretValueEntry[];
export type ErrorCode = string;
export type ErrorMessage = string;
export interface APIErrorType {
  SecretId?: string;
  ErrorCode?: string;
  Message?: string;
}
export type APIErrorListType = APIErrorType[];
export interface BatchGetSecretValueResponse {
  SecretValues?: SecretValueEntry[];
  NextToken?: string;
  Errors?: APIErrorType[];
}
export interface CancelRotateSecretRequest {
  SecretId: string;
}
export interface CancelRotateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
}
export type NameType = string;
export type ClientRequestTokenType = string;
export type DescriptionType = string;
export type KmsKeyIdType = string;
export type TagKeyType = string;
export type TagValueType = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagListType = Tag[];
export type RegionType = string;
export interface ReplicaRegionType {
  Region?: string;
  KmsKeyId?: string;
}
export type AddReplicaRegionListType = ReplicaRegionType[];
export type MedeaTypeType = string;
export interface CreateSecretRequest {
  Name: string;
  ClientRequestToken?: string;
  Description?: string;
  KmsKeyId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  Tags?: Tag[];
  AddReplicaRegions?: ReplicaRegionType[];
  ForceOverwriteReplicaSecret?: boolean;
  Type?: string;
}
export type StatusType = "InSync" | "Failed" | "InProgress" | (string & {});
export type StatusMessageType = string;
export type LastAccessedDateType = Date;
export interface ReplicationStatusType {
  Region?: string;
  KmsKeyId?: string;
  Status?: StatusType;
  StatusMessage?: string;
  LastAccessedDate?: Date;
}
export type ReplicationStatusListType = ReplicationStatusType[];
export interface CreateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export interface DeleteResourcePolicyRequest {
  SecretId: string;
}
export interface DeleteResourcePolicyResponse {
  ARN?: string;
  Name?: string;
}
export type RecoveryWindowInDaysType = number;
export interface DeleteSecretRequest {
  SecretId: string;
  RecoveryWindowInDays?: number;
  ForceDeleteWithoutRecovery?: boolean;
}
export type DeletionDateType = Date;
export interface DeleteSecretResponse {
  ARN?: string;
  Name?: string;
  DeletionDate?: Date;
}
export interface DescribeSecretRequest {
  SecretId: string;
}
export type RotationEnabledType = boolean;
export type RotationLambdaARNType = string;
export type AutomaticallyRotateAfterDaysType = number;
export type DurationType = string;
export type ScheduleExpressionType = string;
export interface RotationRulesType {
  AutomaticallyAfterDays?: number;
  Duration?: string;
  ScheduleExpression?: string;
}
export type ExternalSecretRotationMetadataItemKeyType = string;
export type ExternalSecretRotationMetadataItemValueType = string;
export interface ExternalSecretRotationMetadataItem {
  Key?: string;
  Value?: string;
}
export type ExternalSecretRotationMetadataType =
  ExternalSecretRotationMetadataItem[];
export type RoleARNType = string;
export type LastRotatedDateType = Date;
export type LastChangedDateType = Date;
export type DeletedDateType = Date;
export type NextRotationDateType = Date;
export type SecretVersionsToStagesMapType = {
  [key: string]: string[] | undefined;
};
export type OwningServiceType = string;
export interface DescribeSecretResponse {
  ARN?: string;
  Name?: string;
  Type?: string;
  Description?: string;
  KmsKeyId?: string;
  RotationEnabled?: boolean;
  RotationLambdaARN?: string;
  RotationRules?: RotationRulesType;
  ExternalSecretRotationMetadata?: ExternalSecretRotationMetadataItem[];
  ExternalSecretRotationRoleArn?: string;
  LastRotatedDate?: Date;
  LastChangedDate?: Date;
  LastAccessedDate?: Date;
  DeletedDate?: Date;
  NextRotationDate?: Date;
  Tags?: Tag[];
  VersionIdsToStages?: { [key: string]: string[] | undefined };
  OwningService?: string;
  CreatedDate?: Date;
  PrimaryRegion?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export type PasswordLengthType = number;
export type ExcludeCharactersType = string;
export type ExcludeNumbersType = boolean;
export type ExcludePunctuationType = boolean;
export type ExcludeUppercaseType = boolean;
export type ExcludeLowercaseType = boolean;
export type IncludeSpaceType = boolean;
export type RequireEachIncludedTypeType = boolean;
export interface GetRandomPasswordRequest {
  PasswordLength?: number;
  ExcludeCharacters?: string;
  ExcludeNumbers?: boolean;
  ExcludePunctuation?: boolean;
  ExcludeUppercase?: boolean;
  ExcludeLowercase?: boolean;
  IncludeSpace?: boolean;
  RequireEachIncludedType?: boolean;
}
export type RandomPasswordType = string | redacted.Redacted<string>;
export interface GetRandomPasswordResponse {
  RandomPassword?: string | redacted.Redacted<string>;
}
export interface GetResourcePolicyRequest {
  SecretId: string;
}
export type NonEmptyResourcePolicyType = string;
export interface GetResourcePolicyResponse {
  ARN?: string;
  Name?: string;
  ResourcePolicy?: string;
}
export interface GetSecretValueRequest {
  SecretId: string;
  VersionId?: string;
  VersionStage?: string;
}
export interface GetSecretValueResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  VersionStages?: string[];
  CreatedDate?: Date;
}
export type MaxResultsType = number;
export type SortOrderType = "asc" | "desc" | (string & {});
export type SortByType =
  | "created-date"
  | "last-accessed-date"
  | "last-changed-date"
  | "name"
  | (string & {});
export interface ListSecretsRequest {
  IncludePlannedDeletion?: boolean;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
  SortOrder?: SortOrderType;
  SortBy?: SortByType;
}
export interface SecretListEntry {
  ARN?: string;
  Name?: string;
  Type?: string;
  Description?: string;
  KmsKeyId?: string;
  RotationEnabled?: boolean;
  RotationLambdaARN?: string;
  RotationRules?: RotationRulesType;
  ExternalSecretRotationMetadata?: ExternalSecretRotationMetadataItem[];
  ExternalSecretRotationRoleArn?: string;
  LastRotatedDate?: Date;
  LastChangedDate?: Date;
  LastAccessedDate?: Date;
  DeletedDate?: Date;
  NextRotationDate?: Date;
  Tags?: Tag[];
  SecretVersionsToStages?: { [key: string]: string[] | undefined };
  OwningService?: string;
  CreatedDate?: Date;
  PrimaryRegion?: string;
}
export type SecretListType = SecretListEntry[];
export interface ListSecretsResponse {
  SecretList?: SecretListEntry[];
  NextToken?: string;
}
export interface ListSecretVersionIdsRequest {
  SecretId: string;
  MaxResults?: number;
  NextToken?: string;
  IncludeDeprecated?: boolean;
}
export type KmsKeyIdListType = string[];
export interface SecretVersionsListEntry {
  VersionId?: string;
  VersionStages?: string[];
  LastAccessedDate?: Date;
  CreatedDate?: Date;
  KmsKeyIds?: string[];
}
export type SecretVersionsListType = SecretVersionsListEntry[];
export interface ListSecretVersionIdsResponse {
  Versions?: SecretVersionsListEntry[];
  NextToken?: string;
  ARN?: string;
  Name?: string;
}
export interface PutResourcePolicyRequest {
  SecretId: string;
  ResourcePolicy: string;
  BlockPublicPolicy?: boolean;
}
export interface PutResourcePolicyResponse {
  ARN?: string;
  Name?: string;
}
export type RotationTokenType = string | redacted.Redacted<string>;
export interface PutSecretValueRequest {
  SecretId: string;
  ClientRequestToken?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  VersionStages?: string[];
  RotationToken?: string | redacted.Redacted<string>;
}
export interface PutSecretValueResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  VersionStages?: string[];
}
export type RemoveReplicaRegionListType = string[];
export interface RemoveRegionsFromReplicationRequest {
  SecretId: string;
  RemoveReplicaRegions: string[];
}
export interface RemoveRegionsFromReplicationResponse {
  ARN?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export interface ReplicateSecretToRegionsRequest {
  SecretId: string;
  AddReplicaRegions: ReplicaRegionType[];
  ForceOverwriteReplicaSecret?: boolean;
}
export interface ReplicateSecretToRegionsResponse {
  ARN?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export interface RestoreSecretRequest {
  SecretId: string;
}
export interface RestoreSecretResponse {
  ARN?: string;
  Name?: string;
}
export interface RotateSecretRequest {
  SecretId: string;
  ClientRequestToken?: string;
  RotationLambdaARN?: string;
  RotationRules?: RotationRulesType;
  ExternalSecretRotationMetadata?: ExternalSecretRotationMetadataItem[];
  ExternalSecretRotationRoleArn?: string;
  RotateImmediately?: boolean;
}
export interface RotateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
}
export interface StopReplicationToReplicaRequest {
  SecretId: string;
}
export interface StopReplicationToReplicaResponse {
  ARN?: string;
}
export interface TagResourceRequest {
  SecretId: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyListType = string[];
export interface UntagResourceRequest {
  SecretId: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateSecretRequest {
  SecretId: string;
  ClientRequestToken?: string;
  Description?: string;
  KmsKeyId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  Type?: string;
}
export interface UpdateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
}
export interface UpdateSecretVersionStageRequest {
  SecretId: string;
  VersionStage: string;
  RemoveFromVersionId?: string;
  MoveToVersionId?: string;
}
export interface UpdateSecretVersionStageResponse {
  ARN?: string;
  Name?: string;
}
export interface ValidateResourcePolicyRequest {
  SecretId?: string;
  ResourcePolicy: string;
}
export interface ValidationErrorsEntry {
  CheckName?: string;
  ErrorMessage?: string;
}
export type ValidationErrorsType = ValidationErrorsEntry[];
export interface ValidateResourcePolicyResponse {
  PolicyValidationPassed?: boolean;
  ValidationErrors?: ValidationErrorsEntry[];
}
export type BatchGetSecretValueError =
  | DecryptionFailure
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the contents of the encrypted fields `SecretString` or
 * `SecretBinary` for up to 20 secrets. To retrieve a single secret, call
 * GetSecretValue.
 *
 * To choose which secrets to retrieve, you can specify a list of secrets by name or ARN,
 * or you can use filters. If Secrets Manager encounters errors such as
 * `AccessDeniedException` while attempting to retrieve any of the secrets,
 * you can see the errors in `Errors` in the response.
 *
 * Secrets Manager generates CloudTrail
 * `GetSecretValue` log entries for each secret you request when you call this
 * action. Do not include sensitive information in request parameters because it might be
 * logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * **Required permissions: **
 * `secretsmanager:BatchGetSecretValue`, and you must have
 * `secretsmanager:GetSecretValue` for each secret. If you use filters, you
 * must also have `secretsmanager:ListSecrets`. If the secrets are encrypted
 * using customer-managed keys instead of the Amazon Web Services managed key
 * `aws/secretsmanager`, then you also need `kms:Decrypt`
 * permissions for the keys. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const batchGetSecretValue: API.PaginatedOperationMethod<
  BatchGetSecretValueRequest,
  BatchGetSecretValueResponse,
  BatchGetSecretValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretIdList: 0,
      Filters: D.list(i_Filter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      SecretValues: D.list({
        SecretBinary: D.secretBlob,
        SecretString: D.secret,
        CreatedDate: D.ts,
      }),
    },
  },
  errors: [
    DecryptionFailure,
    InternalServiceError,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecretValue",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type CancelRotateSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Turns off automatic rotation, and if a rotation is currently in progress, cancels the
 * rotation.
 *
 * If you cancel a rotation in progress, it can leave the `VersionStage`
 * labels in an unexpected state. You might need to remove the staging label
 * `AWSPENDING` from the partially created version. You also need to
 * determine whether to roll back to the previous version of the secret by moving the
 * staging label `AWSCURRENT` to the version that has `AWSPENDING`.
 * To determine which version has a specific staging label, call ListSecretVersionIds. Then use UpdateSecretVersionStage to change staging labels. For more information, see How rotation
 * works.
 *
 * To turn on automatic rotation again, call RotateSecret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:CancelRotateSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const cancelRotateSecret: API.OperationMethod<
  CancelRotateSecretRequest,
  CancelRotateSecretResponse,
  CancelRotateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRotateSecret",
})) as any;

export type CreateSecretError =
  | DecryptionFailure
  | EncryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new secret. A *secret* can be a password, a set of
 * credentials such as a user name and password, an OAuth token, or other secret
 * information that you store in an encrypted form in Secrets Manager. The secret also includes the
 * connection information to access a database or other service, which Secrets Manager doesn't
 * encrypt. A secret in Secrets Manager consists of both the protected secret data and the important
 * information needed to manage the secret.
 *
 * For secrets that use *managed rotation*, you need to create the
 * secret through the managing service. For more information, see Secrets Manager secrets
 * managed by other Amazon Web Services services.
 *
 * For information about creating a secret in the console, see Create a
 * secret.
 *
 * To create a secret, you can provide the secret value to be encrypted in either the
 * `SecretString` parameter or the `SecretBinary` parameter, but
 * not both. If you include `SecretString` or `SecretBinary` then
 * Secrets Manager creates an initial secret version and automatically attaches the staging label
 * `AWSCURRENT` to it.
 *
 * For database credentials you want to rotate, for Secrets Manager to be able to rotate the
 * secret, you must make sure the JSON you store in the `SecretString` matches
 * the JSON
 * structure of a database secret.
 *
 * If you don't specify an KMS encryption key, Secrets Manager uses the Amazon Web Services managed key
 * `aws/secretsmanager`. If this key doesn't already exist in your account,
 * then Secrets Manager creates it for you automatically. All users and roles in the Amazon Web Services account
 * automatically have access to use `aws/secretsmanager`. Creating
 * `aws/secretsmanager` can result in a one-time significant delay in
 * returning the result.
 *
 * If the secret is in a different Amazon Web Services account from the credentials calling the API,
 * then you can't use `aws/secretsmanager` to encrypt the secret, and you must
 * create and use a customer managed KMS key.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action.
 * Do not include sensitive information in request parameters except
 * `SecretBinary` or `SecretString` because it might be logged.
 * For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:CreateSecret`. If you include tags in the
 * secret, you also need `secretsmanager:TagResource`. To add replica Regions,
 * you must also have `secretsmanager:ReplicateSecretToRegions`.
 * For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 *
 * To encrypt the secret with a KMS key other than `aws/secretsmanager`, you
 * need `kms:GenerateDataKey` and `kms:Decrypt` permission to the
 * key.
 *
 * When you enter commands in a command shell, there is a risk of the command history being accessed or utilities having access to your command parameters. This is a concern if the command includes the value of a secret. Learn how to Mitigate the risks of using command-line tools to store Secrets Manager secrets.
 */
export const createSecret: API.OperationMethod<
  CreateSecretRequest,
  CreateSecretResponse,
  CreateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Description: 0,
      KmsKeyId: 0,
      SecretBinary: 0,
      SecretString: 0,
      Tags: D.list(i_Tag),
      AddReplicaRegions: D.list(i_ReplicaRegionType),
      ForceOverwriteReplicaSecret: 0,
      Type: 0,
    },
    output: { ReplicationStatus: D.list(o_ReplicationStatusType) },
  },
  errors: [
    DecryptionFailure,
    EncryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecret",
})) as any;

export type DeleteResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the resource-based permission policy attached to the secret. To attach a
 * policy to a secret, use PutResourcePolicy.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:DeleteResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a secret and all of its versions. You can specify a recovery window during
 * which you can restore the secret. The minimum recovery window is 7 days. The default
 * recovery window is 30 days. Secrets Manager attaches a `DeletionDate` stamp to the
 * secret that specifies the end of the recovery window. At the end of the recovery window,
 * Secrets Manager deletes the secret permanently.
 *
 * You can't delete a primary secret that is replicated to other Regions. You must first
 * delete the replicas using RemoveRegionsFromReplication, and then
 * delete the primary secret. When you delete a replica, it is deleted immediately.
 *
 * You can't directly delete a version of a secret. Instead, you remove all staging
 * labels from the version using UpdateSecretVersionStage. This marks the
 * version as deprecated, and then Secrets Manager can automatically delete the version in the
 * background.
 *
 * To determine whether an application still uses a secret, you can create an Amazon CloudWatch alarm
 * to alert you to any attempts to access a secret during the recovery window. For more
 * information, see
 * Monitor secrets scheduled for deletion.
 *
 * Secrets Manager performs the permanent secret deletion at the end of the waiting period as a
 * background task with low priority. There is no guarantee of a specific time after the
 * recovery window for the permanent delete to occur.
 *
 * At any time before recovery window ends, you can use RestoreSecret
 * to remove the `DeletionDate` and cancel the deletion of the secret.
 *
 * When a secret is scheduled for deletion, you cannot retrieve the secret value. You
 * must first cancel the deletion with RestoreSecret and then you can
 * retrieve the secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:DeleteSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const deleteSecret: API.OperationMethod<
  DeleteSecretRequest,
  DeleteSecretResponse,
  DeleteSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretId: 0,
      RecoveryWindowInDays: 0,
      ForceDeleteWithoutRecovery: 0,
    },
    output: { DeletionDate: D.ts },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecret",
})) as any;

export type DescribeSecretError =
  | InternalServiceError
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the details of a secret. It does not include the encrypted secret value.
 * Secrets Manager only returns fields that have a value in the response.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:DescribeSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const describeSecret: API.OperationMethod<
  DescribeSecretRequest,
  DescribeSecretResponse,
  DescribeSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SecretId: 0 },
    output: {
      LastRotatedDate: D.ts,
      LastChangedDate: D.ts,
      LastAccessedDate: D.ts,
      DeletedDate: D.ts,
      NextRotationDate: D.ts,
      CreatedDate: D.ts,
      ReplicationStatus: D.list(o_ReplicationStatusType),
    },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecret",
})) as any;

export type GetRandomPasswordError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Generates a random password. We recommend that you specify the maximum length and
 * include every character type that the system you are generating a password for can
 * support. By default, Secrets Manager uses uppercase and lowercase letters, numbers, and the
 * following characters in passwords:
 * `!\"#$%&'()*+,-./:;?@[\\]^_`{|}~`
 *
 * Secrets Manager generates a CloudTrail log entry when you call this
 * action.
 *
 * Required permissions:
 *
 * `secretsmanager:GetRandomPassword`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const getRandomPassword: API.OperationMethod<
  GetRandomPasswordRequest,
  GetRandomPasswordResponse,
  GetRandomPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PasswordLength: 0,
      ExcludeCharacters: 0,
      ExcludeNumbers: 0,
      ExcludePunctuation: 0,
      ExcludeUppercase: 0,
      ExcludeLowercase: 0,
      IncludeSpace: 0,
      RequireEachIncludedType: 0,
    },
    output: { RandomPassword: D.secret },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRandomPassword",
})) as any;

export type GetResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the JSON text of the resource-based policy document attached to the secret.
 * For more information about permissions policies attached to a secret, see Permissions policies attached to a secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:GetResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetSecretValueError =
  | DecryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the contents of the encrypted fields `SecretString` or
 * `SecretBinary` from the specified version of a secret, whichever contains
 * content.
 *
 * To retrieve the values for a group of secrets, call BatchGetSecretValue.
 *
 * We recommend that you cache your secret values by using client-side caching. Caching
 * secrets improves speed and reduces your costs. For more information, see Cache secrets for your applications.
 *
 * To retrieve the previous version of a secret, use `VersionStage` and
 * specify AWSPREVIOUS. To revert to the previous version of a secret, call UpdateSecretVersionStage.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:GetSecretValue`. If the secret is encrypted
 * using a customer-managed key instead of the Amazon Web Services managed key
 * `aws/secretsmanager`, then you also need `kms:Decrypt`
 * permissions for that key. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const getSecretValue: API.OperationMethod<
  GetSecretValueRequest,
  GetSecretValueResponse,
  GetSecretValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SecretId: 0, VersionId: 0, VersionStage: 0 },
    output: {
      SecretBinary: D.secretBlob,
      SecretString: D.secret,
      CreatedDate: D.ts,
    },
  },
  errors: [
    DecryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecretValue",
})) as any;

export type ListSecretsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the secrets that are stored by Secrets Manager in the Amazon Web Services account, not including secrets
 * that are marked for deletion. To see secrets marked for deletion, use the Secrets Manager
 * console.
 *
 * All Secrets Manager operations are eventually consistent. ListSecrets might not
 * reflect changes from the last five minutes. You can get more recent information for a
 * specific secret by calling DescribeSecret.
 *
 * To list the versions of a secret, use ListSecretVersionIds.
 *
 * To retrieve the values for the secrets, call BatchGetSecretValue or
 * GetSecretValue.
 *
 * For information about finding secrets in the console, see Find secrets in
 * Secrets Manager.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ListSecrets`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const listSecrets: API.PaginatedOperationMethod<
  ListSecretsRequest,
  ListSecretsResponse,
  ListSecretsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      IncludePlannedDeletion: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
      SortOrder: 0,
      SortBy: 0,
    },
    output: {
      SecretList: D.list({
        LastRotatedDate: D.ts,
        LastChangedDate: D.ts,
        LastAccessedDate: D.ts,
        DeletedDate: D.ts,
        NextRotationDate: D.ts,
        CreatedDate: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecrets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecretVersionIdsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the versions of a secret. Secrets Manager uses staging labels to indicate the different
 * versions of a secret. For more information, see Secrets Manager
 * concepts: Versions.
 *
 * To list the secrets in the account, use ListSecrets.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ListSecretVersionIds`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const listSecretVersionIds: API.PaginatedOperationMethod<
  ListSecretVersionIdsRequest,
  ListSecretVersionIdsResponse,
  ListSecretVersionIdsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SecretId: 0, MaxResults: 0, NextToken: 0, IncludeDeprecated: 0 },
    output: { Versions: D.list({ LastAccessedDate: D.ts, CreatedDate: D.ts }) },
  },
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecretVersionIds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | MalformedPolicyDocumentException
  | PublicPolicyException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based permission policy to a secret. A resource-based policy is
 * optional. For more information, see Authentication and access control for Secrets Manager
 *
 * For information about attaching a policy in the console, see Attach a permissions policy to a secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:PutResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SecretId: 0, ResourcePolicy: 0, BlockPublicPolicy: 0 },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    MalformedPolicyDocumentException,
    PublicPolicyException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type PutSecretValueError =
  | DecryptionFailure
  | EncryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new version of your secret by creating a new encrypted value and attaching
 * it to the secret. version can contain a new `SecretString` value or a new
 * `SecretBinary` value.
 *
 * Do not call `PutSecretValue` at a sustained rate of more than once every 10
 * minutes. When you update the secret value, Secrets Manager creates a new version of the secret.
 * Secrets Manager keeps 100 of the most recent versions, but it keeps *all*
 * secret versions created in the last 24 hours. If you call `PutSecretValue`
 * more than once every 10 minutes, you will create more versions than Secrets Manager removes, and
 * you will reach the quota for secret versions.
 *
 * You can specify the staging labels to attach to the new version in
 * `VersionStages`. If you don't include `VersionStages`, then
 * Secrets Manager automatically moves the staging label `AWSCURRENT` to this version. If
 * this operation creates the first version for the secret, then Secrets Manager automatically
 * attaches the staging label `AWSCURRENT` to it. If this operation moves the
 * staging label `AWSCURRENT` from another version to this version, then Secrets Manager
 * also automatically moves the staging label `AWSPREVIOUS` to the version that
 * `AWSCURRENT` was removed from.
 *
 * This operation is idempotent. If you call this operation with a
 * `ClientRequestToken` that matches an existing version's VersionId, and
 * you specify the same secret data, the operation succeeds but does nothing. However, if
 * the secret data is different, then the operation fails because you can't modify an
 * existing version; you can only create new ones.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action.
 * Do not include sensitive information in request parameters except
 * `SecretBinary`, `SecretString`, or `RotationToken`
 * because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:PutSecretValue`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 *
 * When you enter commands in a command shell, there is a risk of the command history being accessed or utilities having access to your command parameters. This is a concern if the command includes the value of a secret. Learn how to Mitigate the risks of using command-line tools to store Secrets Manager secrets.
 */
export const putSecretValue: API.OperationMethod<
  PutSecretValueRequest,
  PutSecretValueResponse,
  PutSecretValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      SecretBinary: 0,
      SecretString: 0,
      VersionStages: 0,
      RotationToken: 0,
    },
  },
  errors: [
    DecryptionFailure,
    EncryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSecretValue",
})) as any;

export type RemoveRegionsFromReplicationError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For a secret that is replicated to other Regions, deletes the secret replicas from the
 * Regions you specify.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:RemoveRegionsFromReplication`.
 * For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const removeRegionsFromReplication: API.OperationMethod<
  RemoveRegionsFromReplicationRequest,
  RemoveRegionsFromReplicationResponse,
  RemoveRegionsFromReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SecretId: 0, RemoveReplicaRegions: 0 },
    output: { ReplicationStatus: D.list(o_ReplicationStatusType) },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRegionsFromReplication",
})) as any;

export type ReplicateSecretToRegionsError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Replicates the secret to a new Regions. See Multi-Region secrets.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ReplicateSecretToRegions`. If the primary
 * secret is encrypted with a KMS key other than `aws/secretsmanager`, you also
 * need `kms:Decrypt` permission to the key. To encrypt the replicated secret
 * with a KMS key other than `aws/secretsmanager`, you need
 * `kms:GenerateDataKey` and `kms:Encrypt` to the key.
 * For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const replicateSecretToRegions: API.OperationMethod<
  ReplicateSecretToRegionsRequest,
  ReplicateSecretToRegionsResponse,
  ReplicateSecretToRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretId: 0,
      AddReplicaRegions: D.list(i_ReplicaRegionType),
      ForceOverwriteReplicaSecret: 0,
    },
    output: { ReplicationStatus: D.list(o_ReplicationStatusType) },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplicateSecretToRegions",
})) as any;

export type RestoreSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels the scheduled deletion of a secret by removing the `DeletedDate`
 * time stamp. You can access a secret again after it has been restored.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:RestoreSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const restoreSecret: API.OperationMethod<
  RestoreSecretRequest,
  RestoreSecretResponse,
  RestoreSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreSecret",
})) as any;

export type RotateSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Configures and starts the asynchronous process of rotating the secret. For information
 * about rotation, see Rotate secrets
 * in the *Secrets Manager User Guide*. If you include the configuration
 * parameters, the operation sets the values for the secret and then immediately starts a
 * rotation. If you don't include the configuration parameters, the operation starts a
 * rotation with the values already stored in the secret.
 *
 * When rotation is successful, the `AWSPENDING` staging label might be
 * attached to the same version as the `AWSCURRENT` version, or it might not be
 * attached to any version. If the `AWSPENDING` staging label is present but not
 * attached to the same version as `AWSCURRENT`, then any later invocation of
 * `RotateSecret` assumes that a previous rotation request is still in
 * progress and returns an error. When rotation is unsuccessful, the
 * `AWSPENDING` staging label might be attached to an empty secret version.
 * For more information, see Troubleshoot
 * rotation in the *Secrets Manager User Guide*.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:RotateSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager. You also
 * need `lambda:InvokeFunction` permissions on the rotation function. For more
 * information, see Permissions for rotation.
 */
export const rotateSecret: API.OperationMethod<
  RotateSecretRequest,
  RotateSecretResponse,
  RotateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      RotationLambdaARN: 0,
      RotationRules: {
        AutomaticallyAfterDays: 0,
        Duration: 0,
        ScheduleExpression: 0,
      },
      ExternalSecretRotationMetadata: D.list({ Key: 0, Value: 0 }),
      ExternalSecretRotationRoleArn: 0,
      RotateImmediately: 0,
    },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateSecret",
})) as any;

export type StopReplicationToReplicaError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the link between the replica secret and the primary secret and promotes the
 * replica to a primary secret in the replica Region.
 *
 * You must call this operation from the Region in which you want to promote the replica
 * to a primary secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:StopReplicationToReplica`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const stopReplicationToReplica: API.OperationMethod<
  StopReplicationToReplicaRequest,
  StopReplicationToReplicaResponse,
  StopReplicationToReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplicationToReplica",
})) as any;

export type TagResourceError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches tags to a secret. Tags consist of a key name and a value. Tags are part of
 * the secret's metadata. They are not associated with specific versions of the secret.
 * This operation appends tags to the existing list of tags.
 *
 * For tag quotas and naming restrictions, see Service quotas for
 * Tagging in the *Amazon Web Services General Reference guide*.
 *
 * If you use tags as part of your security strategy, then adding or removing a tag
 * can change permissions. If successfully completing this operation would result in
 * you losing your permissions for this secret, then the operation is blocked and
 * returns an Access Denied error.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:TagResource`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes specific tags from a secret.
 *
 * This operation is idempotent. If a requested tag is not attached to the secret, no
 * error is returned and the secret metadata is unchanged.
 *
 * If you use tags as part of your security strategy, then removing a tag can change
 * permissions. If successfully completing this operation would result in you losing
 * your permissions for this secret, then the operation is blocked and returns an
 * Access Denied error.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:UntagResource`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0, TagKeys: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateSecretError =
  | DecryptionFailure
  | EncryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the details of a secret, including metadata and the secret value. To change
 * the secret value, you can also use PutSecretValue.
 *
 * To change the rotation configuration of a secret, use RotateSecret
 * instead.
 *
 * To change a secret so that it is managed by another service, you need to recreate the
 * secret in that service. See Secrets Manager secrets
 * managed by other Amazon Web Services services.
 *
 * We recommend you avoid calling `UpdateSecret` at a sustained rate of more
 * than once every 10 minutes. When you call `UpdateSecret` to update the secret
 * value, Secrets Manager creates a new version of the secret. Secrets Manager removes outdated versions when
 * there are more than 100, but it does not remove versions created less than 24 hours ago.
 * If you update the secret value more than once every 10 minutes, you create more versions
 * than Secrets Manager removes, and you will reach the quota for secret versions.
 *
 * If you include `SecretString` or `SecretBinary` to create a new
 * secret version, Secrets Manager automatically moves the staging label `AWSCURRENT` to
 * the new version. Then it attaches the label `AWSPREVIOUS` to the version that
 * `AWSCURRENT` was removed from.
 *
 * If you call this operation with a `ClientRequestToken` that matches an
 * existing version's `VersionId`, the operation results in an error. You can't
 * modify an existing version, you can only create a new version. To remove a version,
 * remove all staging labels from it. See UpdateSecretVersionStage.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action.
 * Do not include sensitive information in request parameters except
 * `SecretBinary` or `SecretString` because it might be logged.
 * For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:UpdateSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager. If you use a
 * customer managed key, you must also have `kms:GenerateDataKey`,
 * `kms:Encrypt`, and `kms:Decrypt` permissions on the key. If
 * you change the KMS key and you don't have `kms:Encrypt` permission to the new
 * key, Secrets Manager does not re-encrypt existing secret versions with the new key. For more
 * information, see Secret encryption
 * and decryption.
 *
 * When you enter commands in a command shell, there is a risk of the command history being accessed or utilities having access to your command parameters. This is a concern if the command includes the value of a secret. Learn how to Mitigate the risks of using command-line tools to store Secrets Manager secrets.
 */
export const updateSecret: API.OperationMethod<
  UpdateSecretRequest,
  UpdateSecretResponse,
  UpdateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Description: 0,
      KmsKeyId: 0,
      SecretBinary: 0,
      SecretString: 0,
      Type: 0,
    },
  },
  errors: [
    DecryptionFailure,
    EncryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecret",
})) as any;

export type UpdateSecretVersionStageError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the staging labels attached to a version of a secret. Secrets Manager uses staging
 * labels to track a version as it progresses through the secret rotation process. Each
 * staging label can be attached to only one version at a time. To add a staging label to a
 * version when it is already attached to another version, Secrets Manager first removes it from the
 * other version first and then attaches it to this one. For more information about
 * versions and staging labels, see Concepts:
 * Version.
 *
 * The staging labels that you specify in the `VersionStage` parameter are
 * added to the existing list of staging labels for the version.
 *
 * You can move the `AWSCURRENT` staging label to this version by including it
 * in this call.
 *
 * Whenever you move `AWSCURRENT`, Secrets Manager automatically moves the label
 * `AWSPREVIOUS` to the version that `AWSCURRENT` was removed
 * from.
 *
 * If this action results in the last label being removed from a version, then the
 * version is considered to be 'deprecated' and can be deleted by Secrets Manager.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:UpdateSecretVersionStage`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const updateSecretVersionStage: API.OperationMethod<
  UpdateSecretVersionStageRequest,
  UpdateSecretVersionStageResponse,
  UpdateSecretVersionStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SecretId: 0,
      VersionStage: 0,
      RemoveFromVersionId: 0,
      MoveToVersionId: 0,
    },
  },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecretVersionStage",
})) as any;

export type ValidateResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | MalformedPolicyDocumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Validates that a resource policy does not grant a wide range of principals access to
 * your secret. A resource-based policy is optional for secrets.
 *
 * The API performs three checks when validating the policy:
 *
 * - Sends a call to Zelkova, an automated reasoning engine, to ensure your resource
 * policy does not allow broad access to your secret, for example policies that use
 * a wildcard for the principal.
 *
 * - Checks for correct syntax in a policy.
 *
 * - Verifies the policy does not lock out a caller.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ValidateResourcePolicy` and
 * `secretsmanager:PutResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const validateResourcePolicy: API.OperationMethod<
  ValidateResourcePolicyRequest,
  ValidateResourcePolicyResponse,
  ValidateResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SecretId: 0, ResourcePolicy: 0 } },
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    MalformedPolicyDocumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateResourcePolicy",
})) as any;

const i_Filter: D.LazyStruct = () => ({ Key: 0, Values: 0 });
const i_ReplicaRegionType: D.LazyStruct = () => ({ Region: 0, KmsKeyId: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ReplicationStatusType: D.LazyStruct = () => ({
  LastAccessedDate: D.ts,
});
