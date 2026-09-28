import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "IAM",
  target: "AWSIdentityManagementV20100508",
  version: "2010-05-08",
  sigv4: "iam",
  protocol: awsQueryProtocol,
  xmlns: "https://iam.amazonaws.com/doc/2010-05-08/",
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }],
    });
    const _p1 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "cn-north-1" }],
    });
    const _p2 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-gov-west-1" }],
    });
    const _p3 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-iso-east-1" }],
    });
    const _p4 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }],
    });
    const _p5 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }],
    });
    const _p6 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-isof-south-1" }],
    });
    const _p7 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }],
    });
    const _p8 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam-fips.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.global.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam-fips.global.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              "https://iam.global.api.amazonwebservices.com.cn",
              _p1(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              "https://iam-fips.api.amazonwebservices.com.cn",
              _p1(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.cn-north-1.amazonaws.com.cn", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam-fips.amazonaws.com.cn", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.us-gov.api.aws", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam.us-gov.api.aws", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.us-gov.amazonaws.com", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam.us-gov.amazonaws.com", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.us-iso-east-1.c2s.ic.gov", _p3(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam-fips.us-iso-east-1.c2s.ic.gov", _p3(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.api.aws.ic.gov", _p3(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam-fips.api.aws.ic.gov", _p3(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.us-isob-east-1.sc2s.sgov.gov", _p4(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              "https://iam-fips.us-isob-east-1.sc2s.sgov.gov",
              _p4(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.api.aws.scloud", _p4(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam-fips.api.aws.scloud", _p4(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.eu-isoe-west-1.cloud.adc-e.uk", _p5(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam-fips.cloud.adc-e.uk", _p5(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.api.cloud-aws.adc-e.uk", _p5(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam-fips.api.cloud-aws.adc-e.uk", _p5(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.us-isof-south-1.csp.hci.ic.gov", _p6(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam-fips.csp.hci.ic.gov", _p6(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.api.aws.hci.ic.gov", _p6(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam-fips.api.aws.hci.ic.gov", _p6(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://iam.eusc-de-east-1.amazonaws.eu", _p7(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://iam-fips.amazonaws.eu", _p7(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://iam.global.api.amazonwebservices.eu", _p7(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://iam-fips.api.amazonwebservices.eu", _p7(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://iam-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p8(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://iam-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p8(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iam.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p8(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://iam.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p8(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccountNotManagementOrDelegatedAdministratorException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountNotManagementOrDelegatedAdministratorException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CallerIsNotManagementAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "CallerIsNotManagementAccountException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ConflictError", "RetryableError"],
    { code: "ConcurrentModification", status: 409 },
  )<{ readonly message?: string }> {}
export class CredentialReportExpiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "CredentialReportExpiredException",
    ["BadRequestError"],
    { code: "ReportExpired", status: 410 },
  )<{ readonly message?: string }> {}
export class CredentialReportNotPresentException
  extends /*@__PURE__*/ TE.TaggedError(
    "CredentialReportNotPresentException",
    ["BadRequestError"],
    { code: "ReportNotPresent", status: 410 },
  )<{ readonly message?: string }> {}
export class CredentialReportNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "CredentialReportNotReadyException",
    ["BadRequestError"],
    { code: "ReportInProgress", status: 404 },
  )<{ readonly message?: string }> {}
export class DeleteConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteConflictException",
    ["ConflictError"],
    { code: "DeleteConflict", status: 409 },
  )<{ readonly message?: string }> {}
export class DuplicateCertificateException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateCertificateException",
    ["ConflictError"],
    { code: "DuplicateCertificate", status: 409 },
  )<{ readonly message?: string }> {}
export class DuplicateSSHPublicKeyException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateSSHPublicKeyException",
    ["BadRequestError"],
    { code: "DuplicateSSHPublicKey", status: 400 },
  )<{ readonly message?: string }> {}
export class EntityAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntityAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { code: "EntityAlreadyExists", status: 409 },
  )<{ readonly message?: string }> {}
export class EntityTemporarilyUnmodifiableException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntityTemporarilyUnmodifiableException",
    ["ConflictError", "RetryableError"],
    { code: "EntityTemporarilyUnmodifiable", status: 409 },
  )<{ readonly message?: string }> {}
export class FeatureDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "FeatureDisabledException",
    ["BadRequestError"],
    { code: "FeatureDisabled", status: 404 },
  )<{ readonly message?: string }> {}
export class FeatureEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "FeatureEnabledException",
    ["ConflictError"],
    { code: "FeatureEnabled", status: 409 },
  )<{ readonly message?: string }> {}
export class InvalidAuthenticationCodeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAuthenticationCodeException",
    ["AuthError"],
    { code: "InvalidAuthenticationCode", status: 403 },
  )<{ readonly message?: string }> {}
export class InvalidCertificateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCertificateException",
    ["BadRequestError"],
    { code: "InvalidCertificate", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidInput
  extends /*@__PURE__*/ TE.TaggedError("InvalidInput")<{
    readonly message?: string;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { code: "InvalidInput", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidPublicKeyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPublicKeyException",
    ["BadRequestError"],
    { code: "InvalidPublicKey", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidUserTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidUserTypeException",
    ["BadRequestError"],
    { code: "InvalidUserType", status: 400 },
  )<{ readonly message?: string }> {}
export class KeyPairMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "KeyPairMismatchException",
    ["BadRequestError"],
    { code: "KeyPairMismatch", status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError", "QuotaError"],
    { code: "LimitExceeded", status: 409 },
  )<{ readonly message?: string }> {}
export class MalformedCertificateException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedCertificateException",
    ["BadRequestError"],
    { code: "MalformedCertificate", status: 400 },
  )<{ readonly message?: string }> {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedPolicyDocumentException",
    ["BadRequestError"],
    { code: "MalformedPolicyDocument", status: 400 },
  )<{ readonly message?: string }> {}
export class NameConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "NameConflictException",
    ["ConflictError"],
    { code: "NameConflict", status: 409 },
  )<{ readonly message?: string }> {}
export class NoSuchEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchEntityException",
    ["BadRequestError", "NotFoundError"],
    { code: "NoSuchEntity", status: 404 },
  )<{ readonly message?: string }> {}
export class OpenIdIdpCommunicationErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "OpenIdIdpCommunicationErrorException",
    ["BadRequestError"],
    { code: "OpenIdIdpCommunicationError", status: 400 },
  )<{ readonly message?: string }> {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationNotInAllFeaturesModeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PasswordPolicyViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "PasswordPolicyViolationException",
    ["BadRequestError"],
    { code: "PasswordPolicyViolation", status: 400 },
  )<{ readonly message?: string }> {}
export class PolicyEvaluationException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyEvaluationException",
    ["ServerError"],
    { code: "PolicyEvaluation", status: 500 },
  )<{ readonly message?: string }> {}
export class PolicyNotAttachableException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyNotAttachableException",
    ["BadRequestError"],
    { code: "PolicyNotAttachable", status: 400 },
  )<{ readonly message?: string }> {}
export class ReportGenerationLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ReportGenerationLimitExceededException",
    ["ConflictError"],
    { code: "ReportGenerationLimitExceeded", status: 409 },
  )<{ readonly message?: string }> {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("RequestLimitExceeded", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class RoleModifiedException
  extends /*@__PURE__*/ TE.TaggedError(
    "RoleModifiedException",
    ["ConflictError"],
    { code: "RoleModified", status: 409 },
  )<{ readonly message?: string }> {}
export class RoleTemplateDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "RoleTemplateDisabledException",
    ["BadRequestError"],
    { code: "RoleTemplateDisabled", status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceAccessNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceAccessNotEnabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError", "RetryableError"],
    { code: "ServiceFailure", status: 500 },
  )<{ readonly message?: string }> {}
export class ServiceNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceNotSupportedException",
    ["BadRequestError"],
    { code: "NotSupportedService", status: 404 },
  )<{ readonly message?: string }> {}
export class UnmodifiableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnmodifiableEntityException",
    ["BadRequestError"],
    { code: "UnmodifiableEntity", status: 400 },
  )<{ readonly message?: string }> {}
export class UnrecognizedPublicKeyEncodingException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnrecognizedPublicKeyEncodingException",
    ["BadRequestError"],
    { code: "UnrecognizedPublicKeyEncoding", status: 400 },
  )<{ readonly message?: string }> {}
export type DelegationRequestIdType = string;
export interface AcceptDelegationRequestRequest {
  DelegationRequestId: string;
}
export interface AcceptDelegationRequestResponse {}
export type ArnType = string;
export type IntegerType = number;
export type StringType = string;
export type ReplacementValueListType = string[];
export interface ReplacementValueEntry {
  Values: string[];
}
export type MapStringReplacementValueEntry = {
  [key: string]: ReplacementValueEntry | undefined;
};
export interface AcquireRoleRequest {
  TemplateArn: string;
  TemplateMinorVersion?: number;
  ReplacementValues?: { [key: string]: ReplacementValueEntry | undefined };
}
export type PathType = string;
export type RoleNameType = string;
export type IdType = string;
export type PolicyDocumentType = string;
export type RoleDescriptionType = string;
export type RoleMaxSessionDurationType = number;
export type PermissionsBoundaryAttachmentType =
  | "PermissionsBoundaryPolicy"
  | (string & {});
export interface AttachedPermissionsBoundary {
  PermissionsBoundaryType?: PermissionsBoundaryAttachmentType;
  PermissionsBoundaryArn?: string;
}
export type TagKeyType = string;
export type TagValueType = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagListType = Tag[];
export interface RoleLastUsed {
  LastUsedDate?: Date;
  Region?: string;
}
export interface SourceRoleTemplate {
  TemplateArn: string;
  TemplateMinorVersion: number;
}
export interface Role {
  Path: string;
  RoleName: string;
  RoleId: string;
  Arn: string;
  CreateDate: Date;
  AssumeRolePolicyDocument?: string;
  Description?: string;
  MaxSessionDuration?: number;
  PermissionsBoundary?: AttachedPermissionsBoundary;
  Tags?: Tag[];
  RoleLastUsed?: RoleLastUsed;
  SourceRoleTemplate?: SourceRoleTemplate;
}
export interface AcquireRoleResponse {
  Role: Role;
}
export type ClientIDType = string;
export interface AddClientIDToOpenIDConnectProviderRequest {
  OpenIDConnectProviderArn: string;
  ClientID: string;
}
export interface AddClientIDToOpenIDConnectProviderResponse {}
export type InstanceProfileNameType = string;
export interface AddRoleToInstanceProfileRequest {
  InstanceProfileName: string;
  RoleName: string;
}
export interface AddRoleToInstanceProfileResponse {}
export type GroupNameType = string;
export type ExistingUserNameType = string;
export interface AddUserToGroupRequest {
  GroupName: string;
  UserName: string;
}
export interface AddUserToGroupResponse {}
export interface AssociateDelegationRequestRequest {
  DelegationRequestId: string;
}
export interface AssociateDelegationRequestResponse {}
export interface AttachGroupPolicyRequest {
  GroupName: string;
  PolicyArn: string;
}
export interface AttachGroupPolicyResponse {}
export interface AttachRolePolicyRequest {
  RoleName: string;
  PolicyArn: string;
}
export interface AttachRolePolicyResponse {}
export type UserNameType = string;
export interface AttachUserPolicyRequest {
  UserName: string;
  PolicyArn: string;
}
export interface AttachUserPolicyResponse {}
export type PasswordType = string | redacted.Redacted<string>;
export interface ChangePasswordRequest {
  OldPassword: string | redacted.Redacted<string>;
  NewPassword: string | redacted.Redacted<string>;
}
export interface ChangePasswordResponse {}
export interface CreateAccessKeyRequest {
  UserName?: string;
}
export type AccessKeyIdType = string;
export type StatusType = "Active" | "Inactive" | "Expired" | (string & {});
export type AccessKeySecretType = string | redacted.Redacted<string>;
export interface AccessKey {
  UserName: string;
  AccessKeyId: string;
  Status: StatusType;
  SecretAccessKey: string | redacted.Redacted<string>;
  CreateDate?: Date;
}
export interface CreateAccessKeyResponse {
  AccessKey: AccessKey;
}
export type AccountAliasType = string;
export interface CreateAccountAliasRequest {
  AccountAlias: string;
}
export interface CreateAccountAliasResponse {}
export type AccountIdType = string;
export type DelegationRequestDescriptionType = string;
export type PolicyParameterNameType = string;
export type PolicyParameterValueType = string;
export type PolicyParameterValuesListType = string[];
export type PolicyParameterTypeEnum = "string" | "stringList" | (string & {});
export interface PolicyParameter {
  Name?: string;
  Values?: string[];
  Type?: PolicyParameterTypeEnum;
}
export type PolicyParameterListType = PolicyParameter[];
export interface DelegationPermission {
  PolicyTemplateArn?: string;
  Parameters?: PolicyParameter[];
}
export type RequestMessageType = string;
export type RequestorWorkflowIdType = string;
export type RedirectUrlType = string;
export type NotificationChannelType = string;
export type SessionDurationType = number;
export interface CreateDelegationRequestRequest {
  OwnerAccountId?: string;
  Description: string;
  Permissions: DelegationPermission;
  RequestMessage?: string;
  RequestorWorkflowId: string;
  RedirectUrl?: string;
  NotificationChannel: string;
  SessionDuration: number;
  OnlySendByOwner?: boolean;
}
export type ConsoleDeepLinkType = string;
export interface CreateDelegationRequestResponse {
  ConsoleDeepLink?: string;
  DelegationRequestId?: string;
}
export interface CreateGroupRequest {
  Path?: string;
  GroupName: string;
}
export interface Group {
  Path: string;
  GroupName: string;
  GroupId: string;
  Arn: string;
  CreateDate: Date;
}
export interface CreateGroupResponse {
  Group: Group;
}
export interface CreateInstanceProfileRequest {
  InstanceProfileName: string;
  Path?: string;
  Tags?: Tag[];
}
export type RoleListType = Role[];
export interface InstanceProfile {
  Path: string;
  InstanceProfileName: string;
  InstanceProfileId: string;
  Arn: string;
  CreateDate: Date;
  Roles: Role[];
  Tags?: Tag[];
}
export interface CreateInstanceProfileResponse {
  InstanceProfile: InstanceProfile;
}
export interface CreateLoginProfileRequest {
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
  PasswordResetRequired?: boolean;
}
export interface LoginProfile {
  UserName: string;
  CreateDate: Date;
  PasswordResetRequired?: boolean;
}
export interface CreateLoginProfileResponse {
  LoginProfile: LoginProfile;
}
export type OpenIDConnectProviderUrlType = string;
export type ClientIDListType = string[];
export type ThumbprintType = string;
export type ThumbprintListType = string[];
export interface CreateOpenIDConnectProviderRequest {
  Url: string;
  ClientIDList?: string[];
  ThumbprintList?: string[];
  Tags?: Tag[];
}
export interface CreateOpenIDConnectProviderResponse {
  OpenIDConnectProviderArn?: string;
  Tags?: Tag[];
}
export type PolicyNameType = string;
export type PolicyPathType = string;
export type PolicyDescriptionType = string;
export interface CreatePolicyRequest {
  PolicyName: string;
  Path?: string;
  PolicyDocument: string;
  Description?: string;
  Tags?: Tag[];
}
export type PolicyVersionIdType = string;
export type AttachmentCountType = number;
export interface Policy {
  PolicyName?: string;
  PolicyId?: string;
  Arn?: string;
  Path?: string;
  DefaultVersionId?: string;
  AttachmentCount?: number;
  PermissionsBoundaryUsageCount?: number;
  IsAttachable?: boolean;
  Description?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
  Tags?: Tag[];
}
export interface CreatePolicyResponse {
  Policy?: Policy;
}
export interface CreatePolicyVersionRequest {
  PolicyArn: string;
  PolicyDocument: string;
  SetAsDefault?: boolean;
}
export interface PolicyVersion {
  Document?: string;
  VersionId?: string;
  IsDefaultVersion?: boolean;
  CreateDate?: Date;
}
export interface CreatePolicyVersionResponse {
  PolicyVersion?: PolicyVersion;
}
export interface CreateRoleRequest {
  Path?: string;
  RoleName: string;
  AssumeRolePolicyDocument: string;
  Description?: string;
  MaxSessionDuration?: number;
  PermissionsBoundary?: string;
  Tags?: Tag[];
}
export interface CreateRoleResponse {
  Role: Role;
}
export type SAMLMetadataDocumentType = string;
export type SAMLProviderNameType = string;
export type AssertionEncryptionModeType =
  | "Required"
  | "Allowed"
  | (string & {});
export type PrivateKeyType = string | redacted.Redacted<string>;
export interface CreateSAMLProviderRequest {
  SAMLMetadataDocument: string;
  Name: string;
  Tags?: Tag[];
  AssertionEncryptionMode?: AssertionEncryptionModeType;
  AddPrivateKey?: string | redacted.Redacted<string>;
}
export interface CreateSAMLProviderResponse {
  SAMLProviderArn?: string;
  Tags?: Tag[];
}
export type CustomSuffixType = string;
export interface CreateServiceLinkedRoleRequest {
  AWSServiceName: string;
  Description?: string;
  CustomSuffix?: string;
}
export interface CreateServiceLinkedRoleResponse {
  Role?: Role;
}
export type ServiceName = string;
export type CredentialAgeDays = number;
export interface CreateServiceSpecificCredentialRequest {
  UserName: string;
  ServiceName: string;
  CredentialAgeDays?: number;
}
export type ServiceUserName = string;
export type ServicePassword = string | redacted.Redacted<string>;
export type ServiceCredentialAlias = string;
export type ServiceCredentialSecret = string | redacted.Redacted<string>;
export type ServiceSpecificCredentialId = string;
export interface ServiceSpecificCredential {
  CreateDate: Date;
  ExpirationDate?: Date;
  ServiceName: string;
  ServiceUserName?: string;
  ServicePassword?: string | redacted.Redacted<string>;
  ServiceCredentialAlias?: string;
  ServiceCredentialSecret?: string | redacted.Redacted<string>;
  ServiceSpecificCredentialId: string;
  UserName: string;
  Status: StatusType;
}
export interface CreateServiceSpecificCredentialResponse {
  ServiceSpecificCredential?: ServiceSpecificCredential;
}
export interface CreateUserRequest {
  Path?: string;
  UserName: string;
  PermissionsBoundary?: string;
  Tags?: Tag[];
}
export interface User {
  Path: string;
  UserName: string;
  UserId: string;
  Arn: string;
  CreateDate: Date;
  PasswordLastUsed?: Date;
  PermissionsBoundary?: AttachedPermissionsBoundary;
  Tags?: Tag[];
}
export interface CreateUserResponse {
  User?: User;
}
export type VirtualMFADeviceName = string;
export interface CreateVirtualMFADeviceRequest {
  Path?: string;
  VirtualMFADeviceName: string;
  Tags?: Tag[];
}
export type SerialNumberType = string;
export type BootstrapDatum = Uint8Array | redacted.Redacted<Uint8Array>;
export interface VirtualMFADevice {
  SerialNumber: string;
  Base32StringSeed?: Uint8Array | redacted.Redacted<Uint8Array>;
  QRCodePNG?: Uint8Array | redacted.Redacted<Uint8Array>;
  User?: User;
  EnableDate?: Date;
  Tags?: Tag[];
}
export interface CreateVirtualMFADeviceResponse {
  VirtualMFADevice: VirtualMFADevice;
}
export interface DeactivateMFADeviceRequest {
  UserName?: string;
  SerialNumber: string;
}
export interface DeactivateMFADeviceResponse {}
export interface DeleteAccessKeyRequest {
  UserName?: string;
  AccessKeyId: string;
}
export interface DeleteAccessKeyResponse {}
export interface DeleteAccountAliasRequest {
  AccountAlias: string;
}
export interface DeleteAccountAliasResponse {}
export interface DeleteAccountPasswordPolicyRequest {}
export interface DeleteAccountPasswordPolicyResponse {}
export interface DeleteGroupRequest {
  GroupName: string;
}
export interface DeleteGroupResponse {}
export interface DeleteGroupPolicyRequest {
  GroupName: string;
  PolicyName: string;
}
export interface DeleteGroupPolicyResponse {}
export interface DeleteInstanceProfileRequest {
  InstanceProfileName: string;
}
export interface DeleteInstanceProfileResponse {}
export interface DeleteLoginProfileRequest {
  UserName?: string;
}
export interface DeleteLoginProfileResponse {}
export interface DeleteOpenIDConnectProviderRequest {
  OpenIDConnectProviderArn: string;
}
export interface DeleteOpenIDConnectProviderResponse {}
export interface DeletePolicyRequest {
  PolicyArn: string;
}
export interface DeletePolicyResponse {}
export interface DeletePolicyVersionRequest {
  PolicyArn: string;
  VersionId: string;
}
export interface DeletePolicyVersionResponse {}
export interface DeleteRoleRequest {
  RoleName: string;
}
export interface DeleteRoleResponse {}
export interface DeleteRolePermissionsBoundaryRequest {
  RoleName: string;
}
export interface DeleteRolePermissionsBoundaryResponse {}
export interface DeleteRolePolicyRequest {
  RoleName: string;
  PolicyName: string;
}
export interface DeleteRolePolicyResponse {}
export interface DeleteSAMLProviderRequest {
  SAMLProviderArn: string;
}
export interface DeleteSAMLProviderResponse {}
export type ServerCertificateNameType = string;
export interface DeleteServerCertificateRequest {
  ServerCertificateName: string;
}
export interface DeleteServerCertificateResponse {}
export interface DeleteServiceLinkedRoleRequest {
  RoleName: string;
}
export type DeletionTaskIdType = string;
export interface DeleteServiceLinkedRoleResponse {
  DeletionTaskId: string;
}
export interface DeleteServiceSpecificCredentialRequest {
  UserName?: string;
  ServiceSpecificCredentialId: string;
}
export interface DeleteServiceSpecificCredentialResponse {}
export type CertificateIdType = string;
export interface DeleteSigningCertificateRequest {
  UserName?: string;
  CertificateId: string;
}
export interface DeleteSigningCertificateResponse {}
export type PublicKeyIdType = string;
export interface DeleteSSHPublicKeyRequest {
  UserName: string;
  SSHPublicKeyId: string;
}
export interface DeleteSSHPublicKeyResponse {}
export interface DeleteUserRequest {
  UserName: string;
}
export interface DeleteUserResponse {}
export interface DeleteUserPermissionsBoundaryRequest {
  UserName: string;
}
export interface DeleteUserPermissionsBoundaryResponse {}
export interface DeleteUserPolicyRequest {
  UserName: string;
  PolicyName: string;
}
export interface DeleteUserPolicyResponse {}
export interface DeleteVirtualMFADeviceRequest {
  SerialNumber: string;
}
export interface DeleteVirtualMFADeviceResponse {}
export interface DetachGroupPolicyRequest {
  GroupName: string;
  PolicyArn: string;
}
export interface DetachGroupPolicyResponse {}
export interface DetachRolePolicyRequest {
  RoleName: string;
  PolicyArn: string;
}
export interface DetachRolePolicyResponse {}
export interface DetachUserPolicyRequest {
  UserName: string;
  PolicyArn: string;
}
export interface DetachUserPolicyResponse {}
export interface DisableOrganizationsRootCredentialsManagementRequest {}
export type OrganizationIdType = string;
export type FeatureType =
  | "RootCredentialsManagement"
  | "RootSessions"
  | (string & {});
export type FeaturesListType = FeatureType[];
export interface DisableOrganizationsRootCredentialsManagementResponse {
  OrganizationId?: string;
  EnabledFeatures?: FeatureType[];
}
export interface DisableOrganizationsRootSessionsRequest {}
export interface DisableOrganizationsRootSessionsResponse {
  OrganizationId?: string;
  EnabledFeatures?: FeatureType[];
}
export interface DisableOutboundWebIdentityFederationRequest {}
export interface DisableOutboundWebIdentityFederationResponse {}
export type AuthenticationCodeType = string;
export interface EnableMFADeviceRequest {
  UserName: string;
  SerialNumber: string;
  AuthenticationCode1: string;
  AuthenticationCode2: string;
}
export interface EnableMFADeviceResponse {}
export interface EnableOrganizationsRootCredentialsManagementRequest {}
export interface EnableOrganizationsRootCredentialsManagementResponse {
  OrganizationId?: string;
  EnabledFeatures?: FeatureType[];
}
export interface EnableOrganizationsRootSessionsRequest {}
export interface EnableOrganizationsRootSessionsResponse {
  OrganizationId?: string;
  EnabledFeatures?: FeatureType[];
}
export interface EnableOutboundWebIdentityFederationRequest {}
export interface EnableOutboundWebIdentityFederationResponse {
  IssuerIdentifier?: string;
}
export interface GenerateCredentialReportRequest {}
export type ReportStateType =
  | "STARTED"
  | "INPROGRESS"
  | "COMPLETE"
  | (string & {});
export type ReportStateDescriptionType = string;
export interface GenerateCredentialReportResponse {
  State?: ReportStateType;
  Description?: string;
}
export type OrganizationsEntityPathType = string;
export type OrganizationsPolicyIdType = string;
export interface GenerateOrganizationsAccessReportRequest {
  EntityPath: string;
  OrganizationsPolicyId?: string;
}
export type JobIDType = string;
export interface GenerateOrganizationsAccessReportResponse {
  JobId?: string;
}
export type AccessAdvisorUsageGranularityType =
  | "SERVICE_LEVEL"
  | "ACTION_LEVEL"
  | (string & {});
export interface GenerateServiceLastAccessedDetailsRequest {
  Arn: string;
  Granularity?: AccessAdvisorUsageGranularityType;
}
export interface GenerateServiceLastAccessedDetailsResponse {
  JobId?: string;
}
export interface GetAccessKeyLastUsedRequest {
  AccessKeyId: string;
}
export interface AccessKeyLastUsed {
  LastUsedDate?: Date;
  ServiceName: string;
  Region: string;
}
export interface GetAccessKeyLastUsedResponse {
  UserName?: string;
  AccessKeyLastUsed?: AccessKeyLastUsed;
}
export type EntityType =
  | "User"
  | "Role"
  | "Group"
  | "LocalManagedPolicy"
  | "AWSManagedPolicy"
  | (string & {});
export type EntityListType = EntityType[];
export type MaxItemsType = number;
export type MarkerType = string;
export interface GetAccountAuthorizationDetailsRequest {
  Filter?: EntityType[];
  MaxItems?: number;
  Marker?: string;
}
export interface PolicyDetail {
  PolicyName?: string;
  PolicyDocument?: string;
}
export type PolicyDetailListType = PolicyDetail[];
export type GroupNameListType = string[];
export interface AttachedPolicy {
  PolicyName?: string;
  PolicyArn?: string;
}
export type AttachedPoliciesListType = AttachedPolicy[];
export interface UserDetail {
  Path?: string;
  UserName?: string;
  UserId?: string;
  Arn?: string;
  CreateDate?: Date;
  UserPolicyList?: PolicyDetail[];
  GroupList?: string[];
  AttachedManagedPolicies?: AttachedPolicy[];
  PermissionsBoundary?: AttachedPermissionsBoundary;
  Tags?: Tag[];
}
export type UserDetailListType = UserDetail[];
export interface GroupDetail {
  Path?: string;
  GroupName?: string;
  GroupId?: string;
  Arn?: string;
  CreateDate?: Date;
  GroupPolicyList?: PolicyDetail[];
  AttachedManagedPolicies?: AttachedPolicy[];
}
export type GroupDetailListType = GroupDetail[];
export type InstanceProfileListType = InstanceProfile[];
export interface RoleDetail {
  Path?: string;
  RoleName?: string;
  RoleId?: string;
  Arn?: string;
  CreateDate?: Date;
  AssumeRolePolicyDocument?: string;
  InstanceProfileList?: InstanceProfile[];
  RolePolicyList?: PolicyDetail[];
  AttachedManagedPolicies?: AttachedPolicy[];
  PermissionsBoundary?: AttachedPermissionsBoundary;
  Tags?: Tag[];
  RoleLastUsed?: RoleLastUsed;
}
export type RoleDetailListType = RoleDetail[];
export type PolicyDocumentVersionListType = PolicyVersion[];
export interface ManagedPolicyDetail {
  PolicyName?: string;
  PolicyId?: string;
  Arn?: string;
  Path?: string;
  DefaultVersionId?: string;
  AttachmentCount?: number;
  PermissionsBoundaryUsageCount?: number;
  IsAttachable?: boolean;
  Description?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
  PolicyVersionList?: PolicyVersion[];
}
export type ManagedPolicyDetailListType = ManagedPolicyDetail[];
export type ResponseMarkerType = string;
export interface GetAccountAuthorizationDetailsResponse {
  UserDetailList?: UserDetail[];
  GroupDetailList?: GroupDetail[];
  RoleDetailList?: RoleDetail[];
  Policies?: ManagedPolicyDetail[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface GetAccountPasswordPolicyRequest {}
export type MinimumPasswordLengthType = number;
export type MaxPasswordAgeType = number;
export type PasswordReusePreventionType = number;
export type BooleanObjectType = boolean;
export interface PasswordPolicy {
  MinimumPasswordLength?: number;
  RequireSymbols?: boolean;
  RequireNumbers?: boolean;
  RequireUppercaseCharacters?: boolean;
  RequireLowercaseCharacters?: boolean;
  AllowUsersToChangePassword?: boolean;
  ExpirePasswords?: boolean;
  MaxPasswordAge?: number;
  PasswordReusePrevention?: number;
  HardExpiry?: boolean;
}
export interface GetAccountPasswordPolicyResponse {
  PasswordPolicy: PasswordPolicy;
}
export interface GetAccountPropertiesRequest {}
export type AccountPropertyKeyType = string;
export type AccountPropertyValueType = string;
export type AccountPropertiesMapType = { [key: string]: string | undefined };
export interface GetAccountPropertiesResponse {
  Properties?: { [key: string]: string | undefined };
}
export interface GetAccountSummaryRequest {}
export type SummaryKeyType =
  | "Users"
  | "UsersQuota"
  | "Groups"
  | "GroupsQuota"
  | "ServerCertificates"
  | "ServerCertificatesQuota"
  | "UserPolicySizeQuota"
  | "GroupPolicySizeQuota"
  | "GroupsPerUserQuota"
  | "SigningCertificatesPerUserQuota"
  | "AccessKeysPerUserQuota"
  | "MFADevices"
  | "MFADevicesInUse"
  | "AccountMFAEnabled"
  | "AccountAccessKeysPresent"
  | "AccountPasswordPresent"
  | "AccountSigningCertificatesPresent"
  | "AttachedPoliciesPerGroupQuota"
  | "AttachedPoliciesPerRoleQuota"
  | "AttachedPoliciesPerUserQuota"
  | "Policies"
  | "PoliciesQuota"
  | "PolicySizeQuota"
  | "PolicyVersionsInUse"
  | "PolicyVersionsInUseQuota"
  | "VersionsPerPolicyQuota"
  | "GlobalEndpointTokenVersion"
  | "AssumeRolePolicySizeQuota"
  | "InstanceProfiles"
  | "InstanceProfilesQuota"
  | "Providers"
  | "RolePolicySizeQuota"
  | "Roles"
  | "RolesQuota"
  | (string & {});
export type SummaryValueType = number;
export type SummaryMapType = { [key in SummaryKeyType]?: number };
export interface GetAccountSummaryResponse {
  SummaryMap?: { [key: string]: number | undefined };
}
export type SimulationPolicyListType = string[];
export interface GetContextKeysForCustomPolicyRequest {
  PolicyInputList: string[];
}
export type ContextKeyNameType = string;
export type ContextKeyNamesResultListType = string[];
export interface GetContextKeysForPolicyResponse {
  ContextKeyNames?: string[];
}
export interface GetContextKeysForPrincipalPolicyRequest {
  PolicySourceArn: string;
  PolicyInputList?: string[];
}
export interface GetCredentialReportRequest {}
export type ReportContentType = Uint8Array;
export type ReportFormatType = "text/csv" | (string & {});
export interface GetCredentialReportResponse {
  Content?: Uint8Array;
  ReportFormat?: ReportFormatType;
  GeneratedTime?: Date;
}
export interface GetDelegationRequestRequest {
  DelegationRequestId: string;
  DelegationPermissionCheck?: boolean;
}
export type PermissionType = string;
export type RolePermissionRestrictionArnListType = string[];
export type OwnerIdType = string;
export type StateType =
  | "UNASSIGNED"
  | "ASSIGNED"
  | "PENDING_APPROVAL"
  | "FINALIZED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export type RequestorNameType = string;
export type NotesType = string;
export interface DelegationRequest {
  DelegationRequestId?: string;
  OwnerAccountId?: string;
  Description?: string;
  RequestMessage?: string;
  Permissions?: DelegationPermission;
  PermissionPolicy?: string;
  RolePermissionRestrictionArns?: string[];
  OwnerId?: string;
  ApproverId?: string;
  State?: StateType;
  ExpirationTime?: Date;
  RequestorId?: string;
  RequestorName?: string;
  CreateDate?: Date;
  SessionDuration?: number;
  RedirectUrl?: string;
  Notes?: string;
  RejectionReason?: string;
  OnlySendByOwner?: boolean;
  UpdatedTime?: Date;
}
export type PermissionCheckStatusType =
  | "COMPLETE"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export type PermissionCheckResultType =
  | "ALLOWED"
  | "DENIED"
  | "UNSURE"
  | (string & {});
export interface GetDelegationRequestResponse {
  DelegationRequest?: DelegationRequest;
  PermissionCheckStatus?: PermissionCheckStatusType;
  PermissionCheckResult?: PermissionCheckResultType;
}
export interface GetGroupRequest {
  GroupName: string;
  Marker?: string;
  MaxItems?: number;
}
export type UserListType = User[];
export interface GetGroupResponse {
  Group: Group;
  Users: User[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface GetGroupPolicyRequest {
  GroupName: string;
  PolicyName: string;
}
export interface GetGroupPolicyResponse {
  GroupName: string;
  PolicyName: string;
  PolicyDocument: string;
}
export type LocaleType = string;
export interface GetHumanReadableSummaryRequest {
  EntityArn: string;
  Locale?: string;
}
export type SummaryContentType = string;
export type SummaryStateType =
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | "NOT_SUPPORTED"
  | "FAILED"
  | (string & {});
export interface GetHumanReadableSummaryResponse {
  SummaryContent?: string;
  Locale?: string;
  SummaryState?: SummaryStateType;
}
export interface GetInstanceProfileRequest {
  InstanceProfileName: string;
}
export interface GetInstanceProfileResponse {
  InstanceProfile: InstanceProfile;
}
export interface GetLoginProfileRequest {
  UserName?: string;
}
export interface GetLoginProfileResponse {
  LoginProfile: LoginProfile;
}
export interface GetMFADeviceRequest {
  SerialNumber: string;
  UserName?: string;
}
export type CertificationKeyType = string;
export type CertificationValueType = string;
export type CertificationMapType = { [key: string]: string | undefined };
export interface GetMFADeviceResponse {
  UserName?: string;
  SerialNumber: string;
  EnableDate?: Date;
  Certifications?: { [key: string]: string | undefined };
}
export interface GetOpenIDConnectProviderRequest {
  OpenIDConnectProviderArn: string;
}
export interface GetOpenIDConnectProviderResponse {
  Url?: string;
  ClientIDList?: string[];
  ThumbprintList?: string[];
  CreateDate?: Date;
  Tags?: Tag[];
}
export type SortKeyType =
  | "SERVICE_NAMESPACE_ASCENDING"
  | "SERVICE_NAMESPACE_DESCENDING"
  | "LAST_AUTHENTICATED_TIME_ASCENDING"
  | "LAST_AUTHENTICATED_TIME_DESCENDING"
  | (string & {});
export interface GetOrganizationsAccessReportRequest {
  JobId: string;
  MaxItems?: number;
  Marker?: string;
  SortKey?: SortKeyType;
}
export type JobStatusType =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type ServiceNameType = string;
export type ServiceNamespaceType = string;
export interface AccessDetail {
  ServiceName: string;
  ServiceNamespace: string;
  Region?: string;
  EntityPath?: string;
  LastAuthenticatedTime?: Date;
  TotalAuthenticatedEntities?: number;
}
export type AccessDetails = AccessDetail[];
export interface ErrorDetails {
  Message: string;
  Code: string;
}
export interface GetOrganizationsAccessReportResponse {
  JobStatus: JobStatusType;
  JobCreationDate: Date;
  JobCompletionDate?: Date;
  NumberOfServicesAccessible?: number;
  NumberOfServicesNotAccessed?: number;
  AccessDetails?: AccessDetail[];
  IsTruncated?: boolean;
  Marker?: string;
  ErrorDetails?: ErrorDetails;
}
export interface GetOutboundWebIdentityFederationInfoRequest {}
export interface GetOutboundWebIdentityFederationInfoResponse {
  IssuerIdentifier?: string;
  JwtVendingEnabled?: boolean;
}
export interface GetPolicyRequest {
  PolicyArn: string;
}
export interface GetPolicyResponse {
  Policy?: Policy;
}
export interface GetPolicyVersionRequest {
  PolicyArn: string;
  VersionId: string;
}
export interface GetPolicyVersionResponse {
  PolicyVersion?: PolicyVersion;
}
export interface GetRoleRequest {
  RoleName: string;
}
export interface GetRoleResponse {
  Role: Role;
}
export interface GetRolePolicyRequest {
  RoleName: string;
  PolicyName: string;
}
export interface GetRolePolicyResponse {
  RoleName: string;
  PolicyName: string;
  PolicyDocument: string;
}
export type MinorVersionType = number;
export interface GetRoleTemplateVersionRequest {
  TemplateArn: string;
  MinorVersion?: number;
}
export type RoleTemplateNameType = string;
export type RoleTemplateDescriptionType = string;
export type ManagedByTypeType = "Service" | (string & {});
export type ManagedByValueType = string;
export type RoleNamePatternType = string;
export type RolePathPatternType = string;
export type RoleDescriptionPatternType = string;
export interface InlinePolicy {
  PolicyName: string;
  PolicyDocument: string;
}
export type InlinePolicyTemplateListType = InlinePolicy[];
export type ManagedPolicyArnListType = string[];
export type ParameterNameType = string;
export type ParameterTypeType =
  | "String"
  | "StringList"
  | "Number"
  | "NumberList"
  | "Arn"
  | "ArnList"
  | (string & {});
export type ParameterSubTypeType = string;
export type ParameterDescriptionType = string;
export type ParameterDefaultValueType = string;
export interface ParameterDefinition {
  Name: string;
  Type: ParameterTypeType;
  SubType?: string;
  Description?: string;
  IsRequired?: boolean;
  DefaultValue?: string;
  Immutable?: boolean;
}
export type ParametersDefinitionListType = ParameterDefinition[];
export type TagTemplateKeyType = string;
export type TagTemplateValueType = string;
export interface TagTemplate {
  Key: string;
  Value: string;
}
export type TagTemplateListType = TagTemplate[];
export interface RoleTemplateVersion {
  TemplateArn?: string;
  TemplateName?: string;
  TemplateVersionId?: string;
  Description?: string;
  MajorVersion?: number;
  DefaultMinorVersion?: number;
  ManagedByType?: ManagedByTypeType;
  ManagedByValue?: string;
  Enabled?: boolean;
  MinorVersion?: number;
  RoleNamePattern?: string;
  RolePathPattern?: string;
  RoleDescriptionPattern?: string;
  AssumeRolePolicyDocumentTemplate?: string;
  InlinePolicyTemplates?: InlinePolicy[];
  ManagedPolicyArns?: string[];
  PermissionBoundaryArn?: string;
  ParametersDefinition?: ParameterDefinition[];
  RoleTagsTemplate?: TagTemplate[];
  MaxSessionDuration?: number;
  VersionEnabled?: boolean;
  CreateTimestamp?: Date;
  UpdateTimestamp?: Date;
}
export interface GetRoleTemplateVersionResponse {
  RoleTemplateVersion: RoleTemplateVersion;
}
export interface GetSAMLProviderRequest {
  SAMLProviderArn: string;
}
export type PrivateKeyIdType = string;
export interface SAMLPrivateKey {
  KeyId?: string;
  Timestamp?: Date;
}
export type PrivateKeyList = SAMLPrivateKey[];
export interface GetSAMLProviderResponse {
  SAMLProviderUUID?: string;
  SAMLMetadataDocument?: string;
  CreateDate?: Date;
  ValidUntil?: Date;
  Tags?: Tag[];
  AssertionEncryptionMode?: AssertionEncryptionModeType;
  PrivateKeyList?: SAMLPrivateKey[];
}
export interface GetServerCertificateRequest {
  ServerCertificateName: string;
}
export interface ServerCertificateMetadata {
  Path: string;
  ServerCertificateName: string;
  ServerCertificateId: string;
  Arn: string;
  UploadDate?: Date;
  Expiration?: Date;
}
export type CertificateBodyType = string;
export type CertificateChainType = string;
export interface ServerCertificate {
  ServerCertificateMetadata: ServerCertificateMetadata;
  CertificateBody: string;
  CertificateChain?: string;
  Tags?: Tag[];
}
export interface GetServerCertificateResponse {
  ServerCertificate: ServerCertificate;
}
export interface GetServiceLastAccessedDetailsRequest {
  JobId: string;
  MaxItems?: number;
  Marker?: string;
}
export interface TrackedActionLastAccessed {
  ActionName?: string;
  LastAccessedEntity?: string;
  LastAccessedTime?: Date;
  LastAccessedRegion?: string;
}
export type TrackedActionsLastAccessed = TrackedActionLastAccessed[];
export interface ServiceLastAccessed {
  ServiceName: string;
  LastAuthenticated?: Date;
  ServiceNamespace: string;
  LastAuthenticatedEntity?: string;
  LastAuthenticatedRegion?: string;
  TotalAuthenticatedEntities?: number;
  TrackedActionsLastAccessed?: TrackedActionLastAccessed[];
}
export type ServicesLastAccessed = ServiceLastAccessed[];
export interface GetServiceLastAccessedDetailsResponse {
  JobStatus: JobStatusType;
  JobType?: AccessAdvisorUsageGranularityType;
  JobCreationDate: Date;
  ServicesLastAccessed: ServiceLastAccessed[];
  JobCompletionDate: Date;
  IsTruncated?: boolean;
  Marker?: string;
  Error?: ErrorDetails;
}
export interface GetServiceLastAccessedDetailsWithEntitiesRequest {
  JobId: string;
  ServiceNamespace: string;
  MaxItems?: number;
  Marker?: string;
}
export type PolicyOwnerEntityType = "USER" | "ROLE" | "GROUP" | (string & {});
export interface EntityInfo {
  Arn: string;
  Name: string;
  Type: PolicyOwnerEntityType;
  Id: string;
  Path?: string;
}
export interface EntityDetails {
  EntityInfo: EntityInfo;
  LastAuthenticated?: Date;
}
export type EntityDetailsListType = EntityDetails[];
export interface GetServiceLastAccessedDetailsWithEntitiesResponse {
  JobStatus: JobStatusType;
  JobCreationDate: Date;
  JobCompletionDate: Date;
  EntityDetailsList: EntityDetails[];
  IsTruncated?: boolean;
  Marker?: string;
  Error?: ErrorDetails;
}
export interface GetServiceLinkedRoleDeletionStatusRequest {
  DeletionTaskId: string;
}
export type DeletionTaskStatusType =
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | "FAILED"
  | "NOT_STARTED"
  | (string & {});
export type ReasonType = string;
export type RegionNameType = string;
export type ArnListType = string[];
export interface RoleUsageType {
  Region?: string;
  Resources?: string[];
}
export type RoleUsageListType = RoleUsageType[];
export interface DeletionTaskFailureReasonType {
  Reason?: string;
  RoleUsageList?: RoleUsageType[];
}
export interface GetServiceLinkedRoleDeletionStatusResponse {
  Status: DeletionTaskStatusType;
  Reason?: DeletionTaskFailureReasonType;
}
export type EncodingType = "SSH" | "PEM" | (string & {});
export interface GetSSHPublicKeyRequest {
  UserName: string;
  SSHPublicKeyId: string;
  Encoding: EncodingType;
}
export type PublicKeyFingerprintType = string;
export type PublicKeyMaterialType = string;
export interface SSHPublicKey {
  UserName: string;
  SSHPublicKeyId: string;
  Fingerprint: string;
  SSHPublicKeyBody: string;
  Status: StatusType;
  UploadDate?: Date;
}
export interface GetSSHPublicKeyResponse {
  SSHPublicKey?: SSHPublicKey;
}
export interface GetUserRequest {
  UserName?: string;
}
export interface GetUserResponse {
  User: User;
}
export interface GetUserPolicyRequest {
  UserName: string;
  PolicyName: string;
}
export interface GetUserPolicyResponse {
  UserName: string;
  PolicyName: string;
  PolicyDocument: string;
}
export interface ListAccessKeysRequest {
  UserName?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface AccessKeyMetadata {
  UserName?: string;
  AccessKeyId?: string;
  Status?: StatusType;
  CreateDate?: Date;
}
export type AccessKeyMetadataListType = AccessKeyMetadata[];
export interface ListAccessKeysResponse {
  AccessKeyMetadata: AccessKeyMetadata[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListAccountAliasesRequest {
  Marker?: string;
  MaxItems?: number;
}
export type AccountAliasListType = string[];
export interface ListAccountAliasesResponse {
  AccountAliases: string[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListAttachedGroupPoliciesRequest {
  GroupName: string;
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListAttachedGroupPoliciesResponse {
  AttachedPolicies?: AttachedPolicy[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListAttachedRolePoliciesRequest {
  RoleName: string;
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListAttachedRolePoliciesResponse {
  AttachedPolicies?: AttachedPolicy[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListAttachedUserPoliciesRequest {
  UserName: string;
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListAttachedUserPoliciesResponse {
  AttachedPolicies?: AttachedPolicy[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListDelegationRequestsRequest {
  OwnerId?: string;
  Marker?: string;
  MaxItems?: number;
}
export type DelegationRequestsListType = DelegationRequest[];
export interface ListDelegationRequestsResponse {
  DelegationRequests?: DelegationRequest[];
  Marker?: string;
  isTruncated?: boolean;
}
export type PolicyUsageType =
  | "PermissionsPolicy"
  | "PermissionsBoundary"
  | (string & {});
export interface ListEntitiesForPolicyRequest {
  PolicyArn: string;
  EntityFilter?: EntityType;
  PathPrefix?: string;
  PolicyUsageFilter?: PolicyUsageType;
  Marker?: string;
  MaxItems?: number;
}
export interface PolicyGroup {
  GroupName?: string;
  GroupId?: string;
}
export type PolicyGroupListType = PolicyGroup[];
export interface PolicyUser {
  UserName?: string;
  UserId?: string;
}
export type PolicyUserListType = PolicyUser[];
export interface PolicyRole {
  RoleName?: string;
  RoleId?: string;
}
export type PolicyRoleListType = PolicyRole[];
export interface ListEntitiesForPolicyResponse {
  PolicyGroups?: PolicyGroup[];
  PolicyUsers?: PolicyUser[];
  PolicyRoles?: PolicyRole[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListGroupPoliciesRequest {
  GroupName: string;
  Marker?: string;
  MaxItems?: number;
}
export type PolicyNameListType = string[];
export interface ListGroupPoliciesResponse {
  PolicyNames: string[];
  IsTruncated?: boolean;
  Marker?: string;
}
export type PathPrefixType = string;
export interface ListGroupsRequest {
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export type GroupListType = Group[];
export interface ListGroupsResponse {
  Groups: Group[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListGroupsForUserRequest {
  UserName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListGroupsForUserResponse {
  Groups: Group[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListInstanceProfilesRequest {
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListInstanceProfilesResponse {
  InstanceProfiles: InstanceProfile[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListInstanceProfilesForRoleRequest {
  RoleName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListInstanceProfilesForRoleResponse {
  InstanceProfiles: InstanceProfile[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListInstanceProfileTagsRequest {
  InstanceProfileName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListInstanceProfileTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListMFADevicesRequest {
  UserName?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface MFADevice {
  UserName: string;
  SerialNumber: string;
  EnableDate: Date;
}
export type MfaDeviceListType = MFADevice[];
export interface ListMFADevicesResponse {
  MFADevices: MFADevice[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListMFADeviceTagsRequest {
  SerialNumber: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListMFADeviceTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListOpenIDConnectProvidersRequest {}
export interface OpenIDConnectProviderListEntry {
  Arn?: string;
}
export type OpenIDConnectProviderListType = OpenIDConnectProviderListEntry[];
export interface ListOpenIDConnectProvidersResponse {
  OpenIDConnectProviderList?: OpenIDConnectProviderListEntry[];
}
export interface ListOpenIDConnectProviderTagsRequest {
  OpenIDConnectProviderArn: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListOpenIDConnectProviderTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListOrganizationsFeaturesRequest {}
export interface ListOrganizationsFeaturesResponse {
  OrganizationId?: string;
  EnabledFeatures?: FeatureType[];
}
export type PolicyScopeType = "All" | "AWS" | "Local" | (string & {});
export interface ListPoliciesRequest {
  Scope?: PolicyScopeType;
  OnlyAttached?: boolean;
  PathPrefix?: string;
  PolicyUsageFilter?: PolicyUsageType;
  Marker?: string;
  MaxItems?: number;
}
export type PolicyListType = Policy[];
export interface ListPoliciesResponse {
  Policies?: Policy[];
  IsTruncated?: boolean;
  Marker?: string;
}
export type ServiceNamespaceListType = string[];
export interface ListPoliciesGrantingServiceAccessRequest {
  Marker?: string;
  Arn: string;
  ServiceNamespaces: string[];
}
export type PolicyType = "INLINE" | "MANAGED" | (string & {});
export type EntityNameType = string;
export interface PolicyGrantingServiceAccess {
  PolicyName: string;
  PolicyType: PolicyType;
  PolicyArn?: string;
  EntityType?: PolicyOwnerEntityType;
  EntityName?: string;
}
export type PolicyGrantingServiceAccessListType = PolicyGrantingServiceAccess[];
export interface ListPoliciesGrantingServiceAccessEntry {
  ServiceNamespace?: string;
  Policies?: PolicyGrantingServiceAccess[];
}
export type ListPolicyGrantingServiceAccessResponseListType =
  ListPoliciesGrantingServiceAccessEntry[];
export interface ListPoliciesGrantingServiceAccessResponse {
  PoliciesGrantingServiceAccess: ListPoliciesGrantingServiceAccessEntry[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListPolicyTagsRequest {
  PolicyArn: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListPolicyTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListPolicyVersionsRequest {
  PolicyArn: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListPolicyVersionsResponse {
  Versions?: PolicyVersion[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListRolePoliciesRequest {
  RoleName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListRolePoliciesResponse {
  PolicyNames: string[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListRolesRequest {
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListRolesResponse {
  Roles: Role[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListRoleTagsRequest {
  RoleName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListRoleTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListSAMLProvidersRequest {}
export interface SAMLProviderListEntry {
  Arn?: string;
  ValidUntil?: Date;
  CreateDate?: Date;
}
export type SAMLProviderListType = SAMLProviderListEntry[];
export interface ListSAMLProvidersResponse {
  SAMLProviderList?: SAMLProviderListEntry[];
}
export interface ListSAMLProviderTagsRequest {
  SAMLProviderArn: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListSAMLProviderTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListServerCertificatesRequest {
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export type ServerCertificateMetadataListType = ServerCertificateMetadata[];
export interface ListServerCertificatesResponse {
  ServerCertificateMetadataList: ServerCertificateMetadata[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListServerCertificateTagsRequest {
  ServerCertificateName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListServerCertificateTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export type AllUsers = boolean;
export interface ListServiceSpecificCredentialsRequest {
  UserName?: string;
  ServiceName?: string;
  AllUsers?: boolean;
  Marker?: string;
  MaxItems?: number;
}
export interface ServiceSpecificCredentialMetadata {
  UserName: string;
  Status: StatusType;
  ServiceUserName?: string;
  ServiceCredentialAlias?: string;
  CreateDate: Date;
  ExpirationDate?: Date;
  ServiceSpecificCredentialId: string;
  ServiceName: string;
}
export type ServiceSpecificCredentialsListType =
  ServiceSpecificCredentialMetadata[];
export interface ListServiceSpecificCredentialsResponse {
  ServiceSpecificCredentials?: ServiceSpecificCredentialMetadata[];
  Marker?: string;
  IsTruncated?: boolean;
}
export interface ListSigningCertificatesRequest {
  UserName?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface SigningCertificate {
  UserName: string;
  CertificateId: string;
  CertificateBody: string;
  Status: StatusType;
  UploadDate?: Date;
}
export type CertificateListType = SigningCertificate[];
export interface ListSigningCertificatesResponse {
  Certificates: SigningCertificate[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListSSHPublicKeysRequest {
  UserName?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface SSHPublicKeyMetadata {
  UserName: string;
  SSHPublicKeyId: string;
  Status: StatusType;
  UploadDate: Date;
}
export type SSHPublicKeyListType = SSHPublicKeyMetadata[];
export interface ListSSHPublicKeysResponse {
  SSHPublicKeys?: SSHPublicKeyMetadata[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListUserPoliciesRequest {
  UserName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListUserPoliciesResponse {
  PolicyNames: string[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListUsersRequest {
  PathPrefix?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListUsersResponse {
  Users: User[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface ListUserTagsRequest {
  UserName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListUserTagsResponse {
  Tags: Tag[];
  IsTruncated?: boolean;
  Marker?: string;
}
export type AssignmentStatusType =
  | "Assigned"
  | "Unassigned"
  | "Any"
  | (string & {});
export interface ListVirtualMFADevicesRequest {
  AssignmentStatus?: AssignmentStatusType;
  Marker?: string;
  MaxItems?: number;
}
export type VirtualMFADeviceListType = VirtualMFADevice[];
export interface ListVirtualMFADevicesResponse {
  VirtualMFADevices: VirtualMFADevice[];
  IsTruncated?: boolean;
  Marker?: string;
}
export interface PutAccountPropertiesRequest {
  Properties: { [key: string]: string | undefined };
}
export interface PutAccountPropertiesResponse {}
export interface PutGroupPolicyRequest {
  GroupName: string;
  PolicyName: string;
  PolicyDocument: string;
}
export interface PutGroupPolicyResponse {}
export interface PutRolePermissionsBoundaryRequest {
  RoleName: string;
  PermissionsBoundary: string;
}
export interface PutRolePermissionsBoundaryResponse {}
export interface PutRolePolicyRequest {
  RoleName: string;
  PolicyName: string;
  PolicyDocument: string;
}
export interface PutRolePolicyResponse {}
export interface PutUserPermissionsBoundaryRequest {
  UserName: string;
  PermissionsBoundary: string;
}
export interface PutUserPermissionsBoundaryResponse {}
export interface PutUserPolicyRequest {
  UserName: string;
  PolicyName: string;
  PolicyDocument: string;
}
export interface PutUserPolicyResponse {}
export interface RejectDelegationRequestRequest {
  DelegationRequestId: string;
  Notes?: string;
}
export interface RejectDelegationRequestResponse {}
export interface RemoveClientIDFromOpenIDConnectProviderRequest {
  OpenIDConnectProviderArn: string;
  ClientID: string;
}
export interface RemoveClientIDFromOpenIDConnectProviderResponse {}
export interface RemoveRoleFromInstanceProfileRequest {
  InstanceProfileName: string;
  RoleName: string;
}
export interface RemoveRoleFromInstanceProfileResponse {}
export interface RemoveUserFromGroupRequest {
  GroupName: string;
  UserName: string;
}
export interface RemoveUserFromGroupResponse {}
export interface ResetServiceSpecificCredentialRequest {
  UserName?: string;
  ServiceSpecificCredentialId: string;
}
export interface ResetServiceSpecificCredentialResponse {
  ServiceSpecificCredential?: ServiceSpecificCredential;
}
export interface ResyncMFADeviceRequest {
  UserName: string;
  SerialNumber: string;
  AuthenticationCode1: string;
  AuthenticationCode2: string;
}
export interface ResyncMFADeviceResponse {}
export interface SendDelegationTokenRequest {
  DelegationRequestId: string;
}
export interface SendDelegationTokenResponse {}
export interface SetDefaultPolicyVersionRequest {
  PolicyArn: string;
  VersionId: string;
}
export interface SetDefaultPolicyVersionResponse {}
export type GlobalEndpointTokenVersion = "v1Token" | "v2Token" | (string & {});
export interface SetSecurityTokenServicePreferencesRequest {
  GlobalEndpointTokenVersion: GlobalEndpointTokenVersion;
}
export interface SetSecurityTokenServicePreferencesResponse {}
export interface OrderedOrganizationPolicyType {
  ServiceControlPolicyInputList?: string[];
}
export type OrganizationPolicyListType = OrderedOrganizationPolicyType[];
export type ActionNameType = string;
export type ActionNameListType = string[];
export type ResourceNameType = string;
export type ResourceNameListType = string[];
export type ContextKeyValueType = string;
export type ContextKeyValueListType = string[];
export type ContextKeyTypeEnum =
  | "string"
  | "stringList"
  | "numeric"
  | "numericList"
  | "boolean"
  | "booleanList"
  | "ip"
  | "ipList"
  | "binary"
  | "binaryList"
  | "date"
  | "dateList"
  | (string & {});
export interface ContextEntry {
  ContextKeyName?: string;
  ContextKeyValues?: string[];
  ContextKeyType?: ContextKeyTypeEnum;
}
export type ContextEntryListType = ContextEntry[];
export type ResourceHandlingOptionType = string;
export interface SimulateCustomPolicyRequest {
  PolicyInputList: string[];
  PermissionsBoundaryPolicyInputList?: string[];
  OrderedOrganizationPolicyInputList?: OrderedOrganizationPolicyType[];
  ActionNames: string[];
  ResourceArns?: string[];
  ResourcePolicy?: string;
  ResourceOwner?: string;
  CallerArn?: string;
  ContextEntries?: ContextEntry[];
  ResourceHandlingOption?: string;
  MaxItems?: number;
  Marker?: string;
}
export type PolicyEvaluationDecisionType =
  | "allowed"
  | "explicitDeny"
  | "implicitDeny"
  | (string & {});
export type PolicyIdentifierType = string;
export type PolicySourceType =
  | "user"
  | "group"
  | "role"
  | "aws-managed"
  | "user-managed"
  | "resource"
  | "none"
  | (string & {});
export type LineNumber = number;
export type ColumnNumber = number;
export interface Position {
  Line?: number;
  Column?: number;
}
export interface Statement {
  SourcePolicyId?: string;
  SourcePolicyType?: PolicySourceType;
  StartPosition?: Position;
  EndPosition?: Position;
}
export type StatementListType = Statement[];
export interface OrganizationsDecisionDetail {
  AllowedByOrganizations?: boolean;
}
export interface PermissionsBoundaryDecisionDetail {
  AllowedByPermissionsBoundary?: boolean;
}
export type EvalDecisionSourceType = string;
export type EvalDecisionDetailsType = {
  [key: string]: PolicyEvaluationDecisionType | undefined;
};
export interface ResourceSpecificResult {
  EvalResourceName: string;
  EvalResourceDecision: PolicyEvaluationDecisionType;
  MatchedStatements?: Statement[];
  MissingContextValues?: string[];
  EvalDecisionDetails?: {
    [key: string]: PolicyEvaluationDecisionType | undefined;
  };
  PermissionsBoundaryDecisionDetail?: PermissionsBoundaryDecisionDetail;
}
export type ResourceSpecificResultListType = ResourceSpecificResult[];
export interface EvaluationResult {
  EvalActionName: string;
  EvalResourceName?: string;
  EvalDecision: PolicyEvaluationDecisionType;
  MatchedStatements?: Statement[];
  MissingContextValues?: string[];
  OrganizationsDecisionDetail?: OrganizationsDecisionDetail;
  PermissionsBoundaryDecisionDetail?: PermissionsBoundaryDecisionDetail;
  EvalDecisionDetails?: {
    [key: string]: PolicyEvaluationDecisionType | undefined;
  };
  ResourceSpecificResults?: ResourceSpecificResult[];
}
export type EvaluationResultsListType = EvaluationResult[];
export interface SimulatePolicyResponse {
  EvaluationResults?: EvaluationResult[];
  IsTruncated?: boolean;
  Marker?: string;
}
export type PolicyIdentifierPolicyType =
  | "inline"
  | "aws-managed"
  | "user-managed"
  | "permission-boundary"
  | "scp"
  | "rcp"
  | (string & {});
export type AttachmentType = "user" | "group" | "role" | (string & {});
export type AttachmentName = string;
export interface InlinePolicyIdentifierType {
  PolicyName: string;
  AttachmentType: AttachmentType;
  AttachmentName: string;
}
export type PolicyIdentifier =
  | {
      PolicyType: PolicyIdentifierPolicyType;
      PolicyArn?: never;
      InlinePolicyIdentifier?: never;
    }
  | { PolicyType?: never; PolicyArn: string; InlinePolicyIdentifier?: never }
  | {
      PolicyType?: never;
      PolicyArn?: never;
      InlinePolicyIdentifier: InlinePolicyIdentifierType;
    };
export type PolicyExclusionsListType = PolicyIdentifier[];
export interface SimulatePrincipalPolicyRequest {
  PolicySourceArn: string;
  PolicyInputList?: string[];
  PermissionsBoundaryPolicyInputList?: string[];
  PolicyExclusionList?: PolicyIdentifier[];
  ActionNames: string[];
  ResourceArns?: string[];
  ResourcePolicy?: string;
  ResourceOwner?: string;
  CallerArn?: string;
  ContextEntries?: ContextEntry[];
  ResourceHandlingOption?: string;
  MaxItems?: number;
  Marker?: string;
}
export interface TagInstanceProfileRequest {
  InstanceProfileName: string;
  Tags: Tag[];
}
export interface TagInstanceProfileResponse {}
export interface TagMFADeviceRequest {
  SerialNumber: string;
  Tags: Tag[];
}
export interface TagMFADeviceResponse {}
export interface TagOpenIDConnectProviderRequest {
  OpenIDConnectProviderArn: string;
  Tags: Tag[];
}
export interface TagOpenIDConnectProviderResponse {}
export interface TagPolicyRequest {
  PolicyArn: string;
  Tags: Tag[];
}
export interface TagPolicyResponse {}
export interface TagRoleRequest {
  RoleName: string;
  Tags: Tag[];
}
export interface TagRoleResponse {}
export interface TagSAMLProviderRequest {
  SAMLProviderArn: string;
  Tags: Tag[];
}
export interface TagSAMLProviderResponse {}
export interface TagServerCertificateRequest {
  ServerCertificateName: string;
  Tags: Tag[];
}
export interface TagServerCertificateResponse {}
export interface TagUserRequest {
  UserName: string;
  Tags: Tag[];
}
export interface TagUserResponse {}
export type TagKeyListType = string[];
export interface UntagInstanceProfileRequest {
  InstanceProfileName: string;
  TagKeys: string[];
}
export interface UntagInstanceProfileResponse {}
export interface UntagMFADeviceRequest {
  SerialNumber: string;
  TagKeys: string[];
}
export interface UntagMFADeviceResponse {}
export interface UntagOpenIDConnectProviderRequest {
  OpenIDConnectProviderArn: string;
  TagKeys: string[];
}
export interface UntagOpenIDConnectProviderResponse {}
export interface UntagPolicyRequest {
  PolicyArn: string;
  TagKeys: string[];
}
export interface UntagPolicyResponse {}
export interface UntagRoleRequest {
  RoleName: string;
  TagKeys: string[];
}
export interface UntagRoleResponse {}
export interface UntagSAMLProviderRequest {
  SAMLProviderArn: string;
  TagKeys: string[];
}
export interface UntagSAMLProviderResponse {}
export interface UntagServerCertificateRequest {
  ServerCertificateName: string;
  TagKeys: string[];
}
export interface UntagServerCertificateResponse {}
export interface UntagUserRequest {
  UserName: string;
  TagKeys: string[];
}
export interface UntagUserResponse {}
export interface UpdateAccessKeyRequest {
  UserName?: string;
  AccessKeyId: string;
  Status: StatusType;
}
export interface UpdateAccessKeyResponse {}
export interface UpdateAccountPasswordPolicyRequest {
  MinimumPasswordLength?: number;
  RequireSymbols?: boolean;
  RequireNumbers?: boolean;
  RequireUppercaseCharacters?: boolean;
  RequireLowercaseCharacters?: boolean;
  AllowUsersToChangePassword?: boolean;
  MaxPasswordAge?: number;
  PasswordReusePrevention?: number;
  HardExpiry?: boolean;
}
export interface UpdateAccountPasswordPolicyResponse {}
export interface UpdateAssumeRolePolicyRequest {
  RoleName: string;
  PolicyDocument: string;
}
export interface UpdateAssumeRolePolicyResponse {}
export interface UpdateDelegationRequestRequest {
  DelegationRequestId: string;
  Notes?: string;
}
export interface UpdateDelegationRequestResponse {}
export interface UpdateGroupRequest {
  GroupName: string;
  NewPath?: string;
  NewGroupName?: string;
}
export interface UpdateGroupResponse {}
export interface UpdateLoginProfileRequest {
  UserName: string;
  Password?: string | redacted.Redacted<string>;
  PasswordResetRequired?: boolean;
}
export interface UpdateLoginProfileResponse {}
export interface UpdateOpenIDConnectProviderThumbprintRequest {
  OpenIDConnectProviderArn: string;
  ThumbprintList: string[];
}
export interface UpdateOpenIDConnectProviderThumbprintResponse {}
export interface UpdateRoleRequest {
  RoleName: string;
  Description?: string;
  MaxSessionDuration?: number;
}
export interface UpdateRoleResponse {}
export interface UpdateRoleDescriptionRequest {
  RoleName: string;
  Description: string;
}
export interface UpdateRoleDescriptionResponse {
  Role?: Role;
}
export interface UpdateSAMLProviderRequest {
  SAMLMetadataDocument?: string;
  SAMLProviderArn: string;
  AssertionEncryptionMode?: AssertionEncryptionModeType;
  AddPrivateKey?: string | redacted.Redacted<string>;
  RemovePrivateKey?: string;
}
export interface UpdateSAMLProviderResponse {
  SAMLProviderArn?: string;
}
export interface UpdateServerCertificateRequest {
  ServerCertificateName: string;
  NewPath?: string;
  NewServerCertificateName?: string;
}
export interface UpdateServerCertificateResponse {}
export interface UpdateServiceSpecificCredentialRequest {
  UserName?: string;
  ServiceSpecificCredentialId: string;
  Status: StatusType;
}
export interface UpdateServiceSpecificCredentialResponse {}
export interface UpdateSigningCertificateRequest {
  UserName?: string;
  CertificateId: string;
  Status: StatusType;
}
export interface UpdateSigningCertificateResponse {}
export interface UpdateSSHPublicKeyRequest {
  UserName: string;
  SSHPublicKeyId: string;
  Status: StatusType;
}
export interface UpdateSSHPublicKeyResponse {}
export interface UpdateUserRequest {
  UserName: string;
  NewPath?: string;
  NewUserName?: string;
}
export interface UpdateUserResponse {}
export interface UploadServerCertificateRequest {
  Path?: string;
  ServerCertificateName: string;
  CertificateBody: string;
  PrivateKey: string | redacted.Redacted<string>;
  CertificateChain?: string;
  Tags?: Tag[];
}
export interface UploadServerCertificateResponse {
  ServerCertificateMetadata?: ServerCertificateMetadata;
  Tags?: Tag[];
}
export interface UploadSigningCertificateRequest {
  UserName?: string;
  CertificateBody: string;
}
export interface UploadSigningCertificateResponse {
  Certificate: SigningCertificate;
}
export interface UploadSSHPublicKeyRequest {
  UserName: string;
  SSHPublicKeyBody: string;
}
export interface UploadSSHPublicKeyResponse {
  SSHPublicKey?: SSHPublicKey;
}
export type ConcurrentModificationMessage = string;
export type NoSuchEntityMessage = string;
export type ServiceFailureExceptionMessage = string;
export type EntityAlreadyExistsMessage = string;
export type InvalidInputMessage = string;
export type LimitExceededMessage = string;
export type MalformedPolicyDocumentMessage = string;
export type NameConflictMessage = string;
export type RoleModifiedMessage = string;
export type RoleTemplateDisabledMessage = string;
export type UnmodifiableEntityMessage = string;
export type PolicyNotAttachableMessage = string;
export type EntityTemporarilyUnmodifiableMessage = string;
export type InvalidUserTypeMessage = string;
export type PasswordPolicyViolationMessage = string;
export type OpenIdIdpCommunicationErrorExceptionMessage = string;
export type ServiceNotSupportedMessage = string;
export type DeleteConflictMessage = string;
export type ExceptionMessage = string;
export type FeatureDisabledMessage = string;
export type InvalidAuthenticationCodeMessage = string;
export type FeatureEnabledMessage = string;
export type ReportGenerationLimitExceededMessage = string;
export type CredentialReportExpiredExceptionMessage = string;
export type CredentialReportNotPresentExceptionMessage = string;
export type CredentialReportNotReadyExceptionMessage = string;
export type UnrecognizedPublicKeyEncodingMessage = string;
export type PolicyEvaluationErrorMessage = string;
export type KeyPairMismatchMessage = string;
export type MalformedCertificateMessage = string;
export type DuplicateCertificateMessage = string;
export type InvalidCertificateMessage = string;
export type DuplicateSSHPublicKeyMessage = string;
export type InvalidPublicKeyMessage = string;
export type AcceptDelegationRequestError =
  | ConcurrentModificationException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Accepts a delegation request, granting the requested temporary access.
 *
 * Once the delegation request is accepted, it is eligible to send the exchange token to the partner.
 * The SendDelegationToken
 * API has to be explicitly called to send the delegation token.
 *
 * At the time of acceptance, IAM records the details and the state of the identity that called this API.
 * This is the identity that gets mapped to the delegated credential.
 *
 * An accepted request may be rejected before the exchange token is sent to the partner.
 */
export const acceptDelegationRequest: API.OperationMethod<
  AcceptDelegationRequestRequest,
  AcceptDelegationRequestResponse,
  AcceptDelegationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DelegationRequestId: 0 } },
  errors: [
    ConcurrentModificationException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDelegationRequest",
})) as any;

export type AcquireRoleError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NameConflictException
  | NoSuchEntityException
  | RoleModifiedException
  | RoleTemplateDisabledException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates an IAM role from the specified role template. The new role takes its
 * configuration—including its name, path, trust policy, inline and managed policies,
 * permissions boundary, tags, and maximum session duration—from the role
 * template version that you specify. For more information about roles, see IAM roles in the
 * *IAM User Guide*.
 *
 * If the template version defines parameters, use the `ReplacementValues`
 * parameter to supply the values that the service substitutes into the role during
 * creation.
 */
export const acquireRole: API.OperationMethod<
  AcquireRoleRequest,
  AcquireRoleResponse,
  AcquireRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TemplateArn: 0,
      TemplateMinorVersion: 0,
      ReplacementValues: D.map({ Values: 0 }),
    },
    output: { Role: o_Role },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    NameConflictException,
    NoSuchEntityException,
    RoleModifiedException,
    RoleTemplateDisabledException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcquireRole",
})) as any;

export type AddClientIDToOpenIDConnectProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds a new client ID (also known as audience) to the list of client IDs already
 * registered for the specified IAM OpenID Connect (OIDC) provider resource.
 *
 * This operation is idempotent; it does not fail or return an error if you add an
 * existing client ID to the provider.
 */
export const addClientIDToOpenIDConnectProvider: API.OperationMethod<
  AddClientIDToOpenIDConnectProviderRequest,
  AddClientIDToOpenIDConnectProviderResponse,
  AddClientIDToOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0, ClientID: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddClientIDToOpenIDConnectProvider",
})) as any;

export type AddRoleToInstanceProfileError =
  | EntityAlreadyExistsException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Adds the specified IAM role to the specified instance profile. An instance profile
 * can contain only one role, and this quota cannot be increased. You can remove the
 * existing role and then add a different role to an instance profile. You must then wait
 * for the change to appear across all of Amazon Web Services because of eventual
 * consistency. To force the change, you must disassociate the instance profile and then associate the
 * instance profile, or you can stop your instance and then restart it.
 *
 * The caller of this operation must be granted the `PassRole` permission
 * on the IAM role by a permissions policy.
 *
 * When using the iam:AssociatedResourceArn condition in a policy to restrict the PassRole IAM action, special considerations apply if the policy is
 * intended to define access for the `AddRoleToInstanceProfile` action. In
 * this case, you cannot specify a Region or instance ID in the EC2 instance ARN. The
 * ARN value must be `arn:aws:ec2:*:CallerAccountId:instance/*`. Using any
 * other ARN value may lead to unexpected evaluation results.
 *
 * For more information about roles, see IAM roles in the
 * *IAM User Guide*. For more information about instance profiles,
 * see Using
 * instance profiles in the *IAM User Guide*.
 */
export const addRoleToInstanceProfile: API.OperationMethod<
  AddRoleToInstanceProfileRequest,
  AddRoleToInstanceProfileResponse,
  AddRoleToInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceProfileName: 0, RoleName: 0 } },
  errors: [
    EntityAlreadyExistsException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRoleToInstanceProfile",
})) as any;

export type AddUserToGroupError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds the specified user to the specified group.
 */
export const addUserToGroup: API.OperationMethod<
  AddUserToGroupRequest,
  AddUserToGroupResponse,
  AddUserToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, UserName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddUserToGroup",
})) as any;

export type AssociateDelegationRequestError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Associates a delegation request with the current identity.
 *
 * If the partner that created the delegation request has specified the owner account during creation,
 * only an identity from that owner account can call the `AssociateDelegationRequest` API for
 * the specified delegation request. Once the `AssociateDelegationRequest` API call is successful,
 * the ARN of the current calling identity will be stored as the
 * `ownerId`
 * of the request.
 *
 * If the partner that created the delegation request has not specified the owner account during creation,
 * any caller from any account can call the `AssociateDelegationRequest` API for
 * the delegation request. Once this API call is successful, the ARN of the current calling identity will be stored as the
 * `ownerId`
 * and the Amazon Web Services account ID of the current calling identity will be stored as the
 * `ownerAccount`
 * of the request.
 *
 * For more details, see
 *
 * Managing Permissions for Delegation Requests.
 */
export const associateDelegationRequest: API.OperationMethod<
  AssociateDelegationRequestRequest,
  AssociateDelegationRequestResponse,
  AssociateDelegationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DelegationRequestId: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDelegationRequest",
})) as any;

export type AttachGroupPolicyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | PolicyNotAttachableException
  | ServiceFailureException
  | CommonErrors;
/**
 * Attaches the specified managed policy to the specified IAM group.
 *
 * You use this operation to attach a managed policy to a group. To embed an inline
 * policy in a group, use
 * `PutGroupPolicy`
 * .
 *
 * As a best practice, you can validate your IAM policies.
 * To learn more, see Validating IAM policies
 * in the *IAM User Guide*.
 *
 * For more information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const attachGroupPolicy: API.OperationMethod<
  AttachGroupPolicyRequest,
  AttachGroupPolicyResponse,
  AttachGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, PolicyArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    PolicyNotAttachableException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachGroupPolicy",
})) as any;

export type AttachRolePolicyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | PolicyNotAttachableException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Attaches the specified managed policy to the specified IAM role. When you attach a
 * managed policy to a role, the managed policy becomes part of the role's permission
 * (access) policy.
 *
 * You cannot use a managed policy as the role's trust policy. The role's trust
 * policy is created at the same time as the role, using
 * `CreateRole`
 * . You can update a role's trust policy using
 *
 * `UpdateAssumerolePolicy`
 * .
 *
 * Use this operation to attach a *managed* policy to a role. To embed
 * an inline policy in a role, use
 * `PutRolePolicy`
 * . For more information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * As a best practice, you can validate your IAM policies.
 * To learn more, see Validating IAM policies
 * in the *IAM User Guide*.
 */
export const attachRolePolicy: API.OperationMethod<
  AttachRolePolicyRequest,
  AttachRolePolicyResponse,
  AttachRolePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, PolicyArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    PolicyNotAttachableException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachRolePolicy",
})) as any;

export type AttachUserPolicyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | PolicyNotAttachableException
  | ServiceFailureException
  | CommonErrors;
/**
 * Attaches the specified managed policy to the specified user.
 *
 * You use this operation to attach a *managed* policy to a user. To
 * embed an inline policy in a user, use
 * `PutUserPolicy`
 * .
 *
 * As a best practice, you can validate your IAM policies.
 * To learn more, see Validating IAM policies
 * in the *IAM User Guide*.
 *
 * For more information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const attachUserPolicy: API.OperationMethod<
  AttachUserPolicyRequest,
  AttachUserPolicyResponse,
  AttachUserPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, PolicyArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    PolicyNotAttachableException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachUserPolicy",
})) as any;

export type ChangePasswordError =
  | EntityTemporarilyUnmodifiableException
  | InvalidUserTypeException
  | LimitExceededException
  | NoSuchEntityException
  | PasswordPolicyViolationException
  | ServiceFailureException
  | CommonErrors;
/**
 * Changes the password of the IAM user who is calling this operation. This operation
 * can be performed using the CLI, the Amazon Web Services API, or the My
 * Security Credentials page in the Amazon Web Services Management Console. The Amazon Web Services account root user password is
 * not affected by this operation.
 *
 * Use UpdateLoginProfile
 * to use the CLI, the Amazon Web Services API, or the **Users** page in
 * the IAM console to change the password for any IAM user. For more information about
 * modifying passwords, see Managing passwords in the
 * *IAM User Guide*.
 */
export const changePassword: API.OperationMethod<
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangePasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OldPassword: 0, NewPassword: 0 } },
  errors: [
    EntityTemporarilyUnmodifiableException,
    InvalidUserTypeException,
    LimitExceededException,
    NoSuchEntityException,
    PasswordPolicyViolationException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangePassword",
})) as any;

export type CreateAccessKeyError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new Amazon Web Services secret access key and corresponding Amazon Web Services access key ID for the
 * specified user. The default status for new keys is `Active`.
 *
 * If you do not specify a user name, IAM determines the user name implicitly based on
 * the Amazon Web Services access key ID signing the request. This operation works for access keys under
 * the Amazon Web Services account. Consequently, you can use this operation to manage Amazon Web Services account root
 * user credentials. This is true even if the Amazon Web Services account has no associated users.
 *
 * For information about quotas on the number of keys you can create, see IAM and STS
 * quotas in the *IAM User Guide*.
 *
 * To ensure the security of your Amazon Web Services account, the secret access key is accessible
 * only during key and user creation. You must save the key (for example, in a text
 * file) if you want to be able to access it again. If a secret key is lost, you can
 * delete the access keys for the associated user and then create new keys.
 */
export const createAccessKey: API.OperationMethod<
  CreateAccessKeyRequest,
  CreateAccessKeyResponse,
  CreateAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0 },
    output: { AccessKey: { SecretAccessKey: D.secret, CreateDate: D.ts } },
  },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessKey",
})) as any;

export type CreateAccountAliasError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | LimitExceededException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates an alias for your Amazon Web Services account. For information about using an Amazon Web Services account
 * alias, see Creating, deleting, and
 * listing an Amazon Web Services account alias in the Amazon Web Services Sign-In User
 * Guide.
 */
export const createAccountAlias: API.OperationMethod<
  CreateAccountAliasRequest,
  CreateAccountAliasResponse,
  CreateAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccountAlias: 0 } },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    LimitExceededException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountAlias",
})) as any;

export type CreateDelegationRequestError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates an IAM delegation request for temporary access delegation.
 *
 * This API is not available for general use. In order to use this API, a caller first need to
 * go through an onboarding process described in the
 * partner onboarding documentation.
 */
export const createDelegationRequest: API.OperationMethod<
  CreateDelegationRequestRequest,
  CreateDelegationRequestResponse,
  CreateDelegationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OwnerAccountId: 0,
      Description: 0,
      Permissions: {
        PolicyTemplateArn: 0,
        Parameters: D.list({ Name: 0, Values: 0, Type: 0 }),
      },
      RequestMessage: 0,
      RequestorWorkflowId: 0,
      RedirectUrl: 0,
      NotificationChannel: 0,
      SessionDuration: 0,
      OnlySendByOwner: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDelegationRequest",
})) as any;

export type CreateGroupError =
  | EntityAlreadyExistsException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new group.
 *
 * For information about the number of groups you can create, see IAM and STS
 * quotas in the *IAM User Guide*.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Path: 0, GroupName: 0 },
    output: { Group: o_Group },
  },
  errors: [
    EntityAlreadyExistsException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateInstanceProfileError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new instance profile. For information about instance profiles, see Using
 * roles for applications on Amazon EC2 in the
 * *IAM User Guide*, and Instance profiles in the *Amazon EC2 User Guide*.
 *
 * For information about the number of instance profiles you can create, see IAM object
 * quotas in the *IAM User Guide*.
 */
export const createInstanceProfile: API.OperationMethod<
  CreateInstanceProfileRequest,
  CreateInstanceProfileResponse,
  CreateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceProfileName: 0, Path: 0, Tags: D.list(i_Tag) },
    output: { InstanceProfile: o_InstanceProfile },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceProfile",
})) as any;

export type CreateLoginProfileError =
  | EntityAlreadyExistsException
  | LimitExceededException
  | NoSuchEntityException
  | PasswordPolicyViolationException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a password for the specified IAM user. A password allows an IAM user to
 * access Amazon Web Services services through the Amazon Web Services Management Console.
 *
 * You can use the CLI, the Amazon Web Services API, or the **Users**
 * page in the IAM console to create a password for any IAM user. Use ChangePassword to update your own existing password in the **My Security Credentials** page in the Amazon Web Services Management Console.
 *
 * For more information about managing passwords, see Managing passwords in the
 * *IAM User Guide*.
 */
export const createLoginProfile: API.OperationMethod<
  CreateLoginProfileRequest,
  CreateLoginProfileResponse,
  CreateLoginProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Password: 0, PasswordResetRequired: 0 },
    output: { LoginProfile: o_LoginProfile },
  },
  errors: [
    EntityAlreadyExistsException,
    LimitExceededException,
    NoSuchEntityException,
    PasswordPolicyViolationException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoginProfile",
})) as any;

export type CreateOpenIDConnectProviderError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | OpenIdIdpCommunicationErrorException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates an IAM entity to describe an identity provider (IdP) that supports OpenID Connect (OIDC).
 *
 * The OIDC provider that you create with this operation can be used as a principal in a
 * role's trust policy. Such a policy establishes a trust relationship between Amazon Web Services and
 * the OIDC provider.
 *
 * If you are using an OIDC identity provider from Google, Facebook, or Amazon Cognito, you don't
 * need to create a separate IAM identity provider. These OIDC identity providers are
 * already built-in to Amazon Web Services and are available for your use. Instead, you can move directly
 * to creating new roles using your identity provider. To learn more, see Creating
 * a role for web identity or OpenID connect federation in the IAM
 * User Guide.
 *
 * When you create the IAM OIDC provider, you specify the following:
 *
 * - The URL of the OIDC identity provider (IdP) to trust
 *
 * - A list of client IDs (also known as audiences) that identify the application
 * or applications allowed to authenticate using the OIDC provider
 *
 * - A list of tags that are attached to the specified IAM OIDC provider
 *
 * - A list of thumbprints of one or more server certificates that the IdP
 * uses
 *
 * You get all of this information from the OIDC IdP you want to use to access
 * Amazon Web Services.
 *
 * Amazon Web Services secures communication with OIDC identity providers (IdPs) using our library of
 * trusted root certificate authorities (CAs) to verify the JSON Web Key Set (JWKS)
 * endpoint's TLS certificate. If your OIDC IdP relies on a certificate that is not signed
 * by one of these trusted CAs, only then we secure communication using the thumbprints set
 * in the IdP's configuration.
 *
 * The trust for the OIDC provider is derived from the IAM provider that this
 * operation creates. Therefore, it is best to limit access to the CreateOpenIDConnectProvider operation to highly privileged
 * users.
 */
export const createOpenIDConnectProvider: API.OperationMethod<
  CreateOpenIDConnectProviderRequest,
  CreateOpenIDConnectProviderResponse,
  CreateOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Url: 0, ClientIDList: 0, ThumbprintList: 0, Tags: D.list(i_Tag) },
    output: { Tags: D.list({}) },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    OpenIdIdpCommunicationErrorException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOpenIDConnectProvider",
})) as any;

export type CreatePolicyError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new managed policy for your Amazon Web Services account.
 *
 * This operation creates a policy version with a version identifier of `v1`
 * and sets v1 as the policy's default version. For more information about policy versions,
 * see Versioning for managed policies in the
 * *IAM User Guide*.
 *
 * As a best practice, you can validate your IAM policies.
 * To learn more, see Validating IAM policies
 * in the *IAM User Guide*.
 *
 * For more information about managed policies in general, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyName: 0,
      Path: 0,
      PolicyDocument: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
    output: { Policy: o_Policy },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
})) as any;

export type CreatePolicyVersionError =
  | InvalidInputException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new version of the specified managed policy. To update a managed policy, you
 * create a new policy version. A managed policy can have up to five versions. If the
 * policy has five versions, you must delete an existing version using DeletePolicyVersion before you create a new version.
 *
 * Optionally, you can set the new version as the policy's default version. The default
 * version is the version that is in effect for the IAM users, groups, and roles to which
 * the policy is attached.
 *
 * For more information about managed policy versions, see Versioning for managed
 * policies in the *IAM User Guide*.
 */
export const createPolicyVersion: API.OperationMethod<
  CreatePolicyVersionRequest,
  CreatePolicyVersionResponse,
  CreatePolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyArn: 0, PolicyDocument: 0, SetAsDefault: 0 },
    output: { PolicyVersion: o_PolicyVersion },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyVersion",
})) as any;

export type CreateRoleError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new role for your Amazon Web Services account.
 *
 * For more information about roles, see IAM roles in the
 * *IAM User Guide*. For information about quotas for role names
 * and the number of roles you can create, see IAM and STS quotas in the
 * *IAM User Guide*.
 */
export const createRole: API.OperationMethod<
  CreateRoleRequest,
  CreateRoleResponse,
  CreateRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Path: 0,
      RoleName: 0,
      AssumeRolePolicyDocument: 0,
      Description: 0,
      MaxSessionDuration: 0,
      PermissionsBoundary: 0,
      Tags: D.list(i_Tag),
    },
    output: { Role: o_Role },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRole",
})) as any;

export type CreateSAMLProviderError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates an IAM resource that describes an identity provider (IdP) that supports SAML
 * 2.0.
 *
 * The SAML provider resource that you create with this operation can be used as a
 * principal in an IAM role's trust policy. Such a policy can enable federated users who
 * sign in using the SAML IdP to assume the role. You can create an IAM role that
 * supports Web-based single sign-on (SSO) to the Amazon Web Services Management Console or one that supports API access
 * to Amazon Web Services.
 *
 * When you create the SAML provider resource, you upload a SAML metadata document that
 * you get from your IdP. That document includes the issuer's name, expiration information,
 * and keys that can be used to validate the SAML authentication response (assertions) that
 * the IdP sends. You must generate the metadata document using the identity management
 * software that is used as your organization's IdP.
 *
 * This operation requires Signature Version 4.
 *
 * For more information, see Enabling SAML 2.0
 * federated users to access the Amazon Web Services Management Console and About SAML 2.0-based
 * federation in the *IAM User Guide*.
 */
export const createSAMLProvider: API.OperationMethod<
  CreateSAMLProviderRequest,
  CreateSAMLProviderResponse,
  CreateSAMLProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SAMLMetadataDocument: 0,
      Name: 0,
      Tags: D.list(i_Tag),
      AssertionEncryptionMode: 0,
      AddPrivateKey: 0,
    },
    output: { Tags: D.list({}) },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSAMLProvider",
})) as any;

export type CreateServiceLinkedRoleError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates an IAM role that is linked to a specific Amazon Web Services service. The service controls
 * the attached policies and when the role can be deleted. This helps ensure that the
 * service is not broken by an unexpectedly changed or deleted role, which could put your
 * Amazon Web Services resources into an unknown state. Allowing the service to control the role helps
 * improve service stability and proper cleanup when a service and its role are no longer
 * needed. For more information, see Using service-linked
 * roles in the *IAM User Guide*.
 *
 * To attach a policy to this service-linked role, you must make the request using the
 * Amazon Web Services service that depends on this role.
 */
export const createServiceLinkedRole: API.OperationMethod<
  CreateServiceLinkedRoleRequest,
  CreateServiceLinkedRoleResponse,
  CreateServiceLinkedRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AWSServiceName: 0, Description: 0, CustomSuffix: 0 },
    output: { Role: o_Role },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceLinkedRole",
})) as any;

export type CreateServiceSpecificCredentialError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceNotSupportedException
  | CommonErrors;
/**
 * Generates a set of credentials consisting of a user name and password that can be used
 * to access the service specified in the request. These credentials are generated by
 * IAM, and can be used only for the specified service.
 *
 * You can have a maximum of two sets of service-specific credentials for each supported
 * service per user.
 *
 * You can reset the password to a new service-generated value by calling ResetServiceSpecificCredential.
 *
 * For more information about using service-specific credentials to authenticate to an
 * Amazon Web Services service, refer to the following docs:
 *
 * - For service-specific credentials with CodeCommit, refer to IAM credentials for CodeCommit: Git credentials, SSH keys, and Amazon Web Services access
 * keys in the *IAM User Guide*.
 *
 * - For service-specific credentials with Amazon Keyspaces (for Apache Cassandra), refer to Use IAM with
 * Amazon Keyspaces (for Apache Cassandra) in the
 * *IAM User Guide*.
 *
 * - For services that support long-term API keys, refer to API
 * keys for Amazon Web Services services in the
 * *IAM User Guide*.
 */
export const createServiceSpecificCredential: API.OperationMethod<
  CreateServiceSpecificCredentialRequest,
  CreateServiceSpecificCredentialResponse,
  CreateServiceSpecificCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, ServiceName: 0, CredentialAgeDays: 0 },
    output: { ServiceSpecificCredential: o_ServiceSpecificCredential },
  },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceSpecificCredential",
})) as any;

export type CreateUserError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new IAM user for your Amazon Web Services account.
 *
 * For information about quotas for the number of IAM users you can create, see IAM and STS
 * quotas in the *IAM User Guide*.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Path: 0,
      UserName: 0,
      PermissionsBoundary: 0,
      Tags: D.list(i_Tag),
    },
    output: { User: o_User },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type CreateVirtualMFADeviceError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | LimitExceededException
  | ServiceFailureException
  | CommonErrors;
/**
 * Creates a new virtual MFA device for the Amazon Web Services account. After creating the virtual
 * MFA, use EnableMFADevice to
 * attach the MFA device to an IAM user. For more information about creating and working
 * with virtual MFA devices, see Using a virtual MFA device in the
 * *IAM User Guide*.
 *
 * For information about the maximum number of MFA devices you can create, see IAM and STS
 * quotas in the *IAM User Guide*.
 *
 * The seed information contained in the QR code and the Base32 string should be
 * treated like any other secret access information. In other words, protect the seed
 * information as you would your Amazon Web Services access keys or your passwords. After you
 * provision your virtual device, you should ensure that the information is destroyed
 * following secure procedures.
 */
export const createVirtualMFADevice: API.OperationMethod<
  CreateVirtualMFADeviceRequest,
  CreateVirtualMFADeviceResponse,
  CreateVirtualMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Path: 0, VirtualMFADeviceName: 0, Tags: D.list(i_Tag) },
    output: { VirtualMFADevice: o_VirtualMFADevice },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    LimitExceededException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualMFADevice",
})) as any;

export type DeactivateMFADeviceError =
  | ConcurrentModificationException
  | EntityTemporarilyUnmodifiableException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deactivates the specified MFA device and removes it from association with the user
 * name for which it was originally enabled.
 *
 * For more information about creating and working with virtual MFA devices, see Enabling a virtual
 * multi-factor authentication (MFA) device in the
 * *IAM User Guide*.
 */
export const deactivateMFADevice: API.OperationMethod<
  DeactivateMFADeviceRequest,
  DeactivateMFADeviceResponse,
  DeactivateMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, SerialNumber: 0 } },
  errors: [
    ConcurrentModificationException,
    EntityTemporarilyUnmodifiableException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateMFADevice",
})) as any;

export type DeleteAccessKeyError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the access key pair associated with the specified IAM user.
 *
 * If you do not specify a user name, IAM determines the user name implicitly based on
 * the Amazon Web Services access key ID signing the request. This operation works for access keys under
 * the Amazon Web Services account. Consequently, you can use this operation to manage Amazon Web Services account root
 * user credentials even if the Amazon Web Services account has no associated users.
 */
export const deleteAccessKey: API.OperationMethod<
  DeleteAccessKeyRequest,
  DeleteAccessKeyResponse,
  DeleteAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, AccessKeyId: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessKey",
})) as any;

export type DeleteAccountAliasError =
  | ConcurrentModificationException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified Amazon Web Services account alias. For information about using an Amazon Web Services
 * account alias, see Creating, deleting, and
 * listing an Amazon Web Services account alias in the Amazon Web Services Sign-In User
 * Guide.
 */
export const deleteAccountAlias: API.OperationMethod<
  DeleteAccountAliasRequest,
  DeleteAccountAliasResponse,
  DeleteAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccountAlias: 0 } },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAlias",
})) as any;

export type DeleteAccountPasswordPolicyError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the password policy for the Amazon Web Services account. There are no parameters.
 */
export const deleteAccountPasswordPolicy: API.OperationMethod<
  DeleteAccountPasswordPolicyRequest,
  DeleteAccountPasswordPolicyResponse,
  DeleteAccountPasswordPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountPasswordPolicy",
})) as any;

export type DeleteGroupError =
  | DeleteConflictException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified IAM group. The group must not contain any users or have any
 * attached policies.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0 } },
  errors: [
    DeleteConflictException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteGroupPolicyError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified inline policy that is embedded in the specified IAM
 * group.
 *
 * A group can also have managed policies attached to it. To detach a managed policy from
 * a group, use DetachGroupPolicy.
 * For more information about policies, refer to Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const deleteGroupPolicy: API.OperationMethod<
  DeleteGroupPolicyRequest,
  DeleteGroupPolicyResponse,
  DeleteGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, PolicyName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupPolicy",
})) as any;

export type DeleteInstanceProfileError =
  | DeleteConflictException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified instance profile. The instance profile must not have an
 * associated role.
 *
 * Make sure that you do not have any Amazon EC2 instances running with the instance
 * profile you are about to delete. Deleting a role or instance profile that is
 * associated with a running instance will break any applications running on the
 * instance.
 *
 * For more information about instance profiles, see Using
 * instance profiles in the *IAM User Guide*.
 */
export const deleteInstanceProfile: API.OperationMethod<
  DeleteInstanceProfileRequest,
  DeleteInstanceProfileResponse,
  DeleteInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceProfileName: 0 } },
  errors: [
    DeleteConflictException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceProfile",
})) as any;

export type DeleteLoginProfileError =
  | EntityTemporarilyUnmodifiableException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the password for the specified IAM user or root user, For more information, see
 * Managing
 * passwords for IAM users.
 *
 * You can use the CLI, the Amazon Web Services API, or the **Users**
 * page in the IAM console to delete a password for any IAM user. You can use ChangePassword to update, but not delete, your own password in the
 * **My Security Credentials** page in the
 * Amazon Web Services Management Console.
 *
 * Deleting a user's password does not prevent a user from accessing Amazon Web Services through
 * the command line interface or the API. To prevent all user access, you must also
 * either make any access keys inactive or delete them. For more information about
 * making keys inactive or deleting them, see UpdateAccessKey
 * and DeleteAccessKey.
 */
export const deleteLoginProfile: API.OperationMethod<
  DeleteLoginProfileRequest,
  DeleteLoginProfileResponse,
  DeleteLoginProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0 } },
  errors: [
    EntityTemporarilyUnmodifiableException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoginProfile",
})) as any;

export type DeleteOpenIDConnectProviderError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes an OpenID Connect identity provider (IdP) resource object in IAM.
 *
 * Deleting an IAM OIDC provider resource does not update any roles that reference the
 * provider as a principal in their trust policies. Any attempt to assume a role that
 * references a deleted provider fails.
 *
 * This operation is idempotent; it does not fail or return an error if you call the
 * operation for a provider that does not exist.
 */
export const deleteOpenIDConnectProvider: API.OperationMethod<
  DeleteOpenIDConnectProviderRequest,
  DeleteOpenIDConnectProviderResponse,
  DeleteOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OpenIDConnectProviderArn: 0 } },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpenIDConnectProvider",
})) as any;

export type DeletePolicyError =
  | DeleteConflictException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified managed policy.
 *
 * Before you can delete a managed policy, you must first detach the policy from all
 * users, groups, and roles that it is attached to. In addition, you must delete all the
 * policy's versions. The following steps describe the process for deleting a managed
 * policy:
 *
 * - Detach the policy from all users, groups, and roles that the policy is
 * attached to, using DetachUserPolicy, DetachGroupPolicy, or DetachRolePolicy. To list all the users, groups, and roles that a
 * policy is attached to, use ListEntitiesForPolicy.
 *
 * - Delete all versions of the policy using DeletePolicyVersion. To list the policy's versions, use ListPolicyVersions. You cannot use DeletePolicyVersion to delete the version that is marked as the
 * default version. You delete the policy's default version in the next step of the
 * process.
 *
 * - Delete the policy (this automatically deletes the policy's default version)
 * using this operation.
 *
 * For information about managed policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PolicyArn: 0 } },
  errors: [
    DeleteConflictException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

export type DeletePolicyVersionError =
  | DeleteConflictException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified version from the specified managed policy.
 *
 * You cannot delete the default version from a policy using this operation. To delete
 * the default version from a policy, use DeletePolicy. To find
 * out which version of a policy is marked as the default version, use ListPolicyVersions.
 *
 * For information about versions for managed policies, see Versioning for managed
 * policies in the *IAM User Guide*.
 */
export const deletePolicyVersion: API.OperationMethod<
  DeletePolicyVersionRequest,
  DeletePolicyVersionResponse,
  DeletePolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PolicyArn: 0, VersionId: 0 } },
  errors: [
    DeleteConflictException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyVersion",
})) as any;

export type DeleteRoleError =
  | ConcurrentModificationException
  | DeleteConflictException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Deletes the specified role. Unlike the Amazon Web Services Management Console, when you delete a role
 * programmatically, you must delete the items attached to the role manually, or the
 * deletion fails. For more information, see Deleting an IAM role. Before attempting to delete a role, remove the
 * following attached items:
 *
 * - Inline policies (DeleteRolePolicy)
 *
 * - Attached managed policies (DetachRolePolicy)
 *
 * - Instance profile (RemoveRoleFromInstanceProfile)
 *
 * - Optional – Delete instance profile after detaching from role for
 * resource clean up (DeleteInstanceProfile)
 *
 * Make sure that you do not have any Amazon EC2 instances running with the role you are
 * about to delete. Deleting a role or instance profile that is associated with a
 * running instance will break any applications running on the instance.
 */
export const deleteRole: API.OperationMethod<
  DeleteRoleRequest,
  DeleteRoleResponse,
  DeleteRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0 } },
  errors: [
    ConcurrentModificationException,
    DeleteConflictException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRole",
})) as any;

export type DeleteRolePermissionsBoundaryError =
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Deletes the permissions boundary for the specified IAM role.
 *
 * You cannot set the boundary for a service-linked role.
 *
 * Deleting the permissions boundary for a role might increase its permissions. For
 * example, it might allow anyone who assumes the role to perform all the actions
 * granted in its permissions policies.
 */
export const deleteRolePermissionsBoundary: API.OperationMethod<
  DeleteRolePermissionsBoundaryRequest,
  DeleteRolePermissionsBoundaryResponse,
  DeleteRolePermissionsBoundaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0 } },
  errors: [
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRolePermissionsBoundary",
})) as any;

export type DeleteRolePolicyError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Deletes the specified inline policy that is embedded in the specified IAM
 * role.
 *
 * A role can also have managed policies attached to it. To detach a managed policy from
 * a role, use DetachRolePolicy.
 * For more information about policies, refer to Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const deleteRolePolicy: API.OperationMethod<
  DeleteRolePolicyRequest,
  DeleteRolePolicyResponse,
  DeleteRolePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, PolicyName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRolePolicy",
})) as any;

export type DeleteSAMLProviderError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes a SAML provider resource in IAM.
 *
 * Deleting the provider resource from IAM does not update any roles that reference the
 * SAML provider resource's ARN as a principal in their trust policies. Any attempt to
 * assume a role that references a non-existent provider resource ARN fails.
 *
 * This operation requires Signature Version 4.
 */
export const deleteSAMLProvider: API.OperationMethod<
  DeleteSAMLProviderRequest,
  DeleteSAMLProviderResponse,
  DeleteSAMLProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SAMLProviderArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSAMLProvider",
})) as any;

export type DeleteServerCertificateError =
  | DeleteConflictException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified server certificate.
 *
 * For more information about working with server certificates, see Working
 * with server certificates in the *IAM User Guide*. This
 * topic also includes a list of Amazon Web Services services that can use the server certificates that
 * you manage with IAM.
 *
 * If you are using a server certificate with Elastic Load Balancing, deleting the
 * certificate could have implications for your application. If Elastic Load Balancing
 * doesn't detect the deletion of bound certificates, it may continue to use the
 * certificates. This could cause Elastic Load Balancing to stop accepting traffic. We
 * recommend that you remove the reference to the certificate from Elastic Load
 * Balancing before using this command to delete the certificate. For more information,
 * see DeleteLoadBalancerListeners in the Elastic Load Balancing API
 * Reference.
 */
export const deleteServerCertificate: API.OperationMethod<
  DeleteServerCertificateRequest,
  DeleteServerCertificateResponse,
  DeleteServerCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServerCertificateName: 0 } },
  errors: [
    DeleteConflictException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServerCertificate",
})) as any;

export type DeleteServiceLinkedRoleError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Submits a service-linked role deletion request and returns a
 * `DeletionTaskId`, which you can use to check the status of the deletion.
 * Before you call this operation, confirm that the role has no active sessions and that
 * any resources used by the role in the linked service are deleted. If you call this
 * operation more than once for the same service-linked role and an earlier deletion task
 * is not complete, then the `DeletionTaskId` of the earlier request is
 * returned.
 *
 * If you submit a deletion request for a service-linked role whose linked service is
 * still accessing a resource, then the deletion task fails. If it fails, the GetServiceLinkedRoleDeletionStatus operation returns the reason for the
 * failure, usually including the resources that must be deleted. To delete the
 * service-linked role, you must first remove those resources from the linked service and
 * then submit the deletion request again. Resources are specific to the service that is
 * linked to the role. For more information about removing resources from a service, see
 * the Amazon Web Services documentation for your
 * service.
 *
 * For more information about service-linked roles, see Roles terms and concepts: Amazon Web Services service-linked role in the
 * *IAM User Guide*.
 */
export const deleteServiceLinkedRole: API.OperationMethod<
  DeleteServiceLinkedRoleRequest,
  DeleteServiceLinkedRoleResponse,
  DeleteServiceLinkedRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceLinkedRole",
})) as any;

export type DeleteServiceSpecificCredentialError =
  | NoSuchEntityException
  | CommonErrors;
/**
 * Deletes the specified service-specific credential.
 */
export const deleteServiceSpecificCredential: API.OperationMethod<
  DeleteServiceSpecificCredentialRequest,
  DeleteServiceSpecificCredentialResponse,
  DeleteServiceSpecificCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, ServiceSpecificCredentialId: 0 },
  },
  errors: [NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceSpecificCredential",
})) as any;

export type DeleteSigningCertificateError =
  | ConcurrentModificationException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes a signing certificate associated with the specified IAM user.
 *
 * If you do not specify a user name, IAM determines the user name implicitly based on
 * the Amazon Web Services access key ID signing the request. This operation works for access keys under
 * the Amazon Web Services account. Consequently, you can use this operation to manage Amazon Web Services account root
 * user credentials even if the Amazon Web Services account has no associated IAM users.
 */
export const deleteSigningCertificate: API.OperationMethod<
  DeleteSigningCertificateRequest,
  DeleteSigningCertificateResponse,
  DeleteSigningCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, CertificateId: 0 } },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSigningCertificate",
})) as any;

export type DeleteSSHPublicKeyError = NoSuchEntityException | CommonErrors;
/**
 * Deletes the specified SSH public key.
 *
 * The SSH public key deleted by this operation is used only for authenticating the
 * associated IAM user to an CodeCommit repository. For more information about using SSH keys
 * to authenticate to an CodeCommit repository, see Set up CodeCommit for
 * SSH connections in the *CodeCommit User Guide*.
 */
export const deleteSSHPublicKey: API.OperationMethod<
  DeleteSSHPublicKeyRequest,
  DeleteSSHPublicKeyResponse,
  DeleteSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, SSHPublicKeyId: 0 } },
  errors: [NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSSHPublicKey",
})) as any;

export type DeleteUserError =
  | ConcurrentModificationException
  | DeleteConflictException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified IAM user. Unlike the Amazon Web Services Management Console, when you delete a user
 * programmatically, you must delete the items attached to the user manually, or the
 * deletion fails. For more information, see Deleting an IAM
 * user. Before attempting to delete a user, remove the following items:
 *
 * - Password (DeleteLoginProfile)
 *
 * - Access keys (DeleteAccessKey)
 *
 * - Signing certificate (DeleteSigningCertificate)
 *
 * - SSH public key (DeleteSSHPublicKey)
 *
 * - Git credentials (DeleteServiceSpecificCredential)
 *
 * - Multi-factor authentication (MFA) device (DeactivateMFADevice, DeleteVirtualMFADevice)
 *
 * - Inline policies (DeleteUserPolicy)
 *
 * - Attached managed policies (DetachUserPolicy)
 *
 * - Group memberships (RemoveUserFromGroup)
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0 } },
  errors: [
    ConcurrentModificationException,
    DeleteConflictException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DeleteUserPermissionsBoundaryError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the permissions boundary for the specified IAM user.
 *
 * Deleting the permissions boundary for a user might increase its permissions by
 * allowing the user to perform all the actions granted in its permissions policies.
 */
export const deleteUserPermissionsBoundary: API.OperationMethod<
  DeleteUserPermissionsBoundaryRequest,
  DeleteUserPermissionsBoundaryResponse,
  DeleteUserPermissionsBoundaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0 } },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPermissionsBoundary",
})) as any;

export type DeleteUserPolicyError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified inline policy that is embedded in the specified IAM
 * user.
 *
 * A user can also have managed policies attached to it. To detach a managed policy from
 * a user, use DetachUserPolicy.
 * For more information about policies, refer to Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const deleteUserPolicy: API.OperationMethod<
  DeleteUserPolicyRequest,
  DeleteUserPolicyResponse,
  DeleteUserPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, PolicyName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPolicy",
})) as any;

export type DeleteVirtualMFADeviceError =
  | ConcurrentModificationException
  | DeleteConflictException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes a virtual MFA device.
 *
 * You must deactivate a user's virtual MFA device before you can delete it. For
 * information about deactivating MFA devices, see DeactivateMFADevice.
 */
export const deleteVirtualMFADevice: API.OperationMethod<
  DeleteVirtualMFADeviceRequest,
  DeleteVirtualMFADeviceResponse,
  DeleteVirtualMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SerialNumber: 0 } },
  errors: [
    ConcurrentModificationException,
    DeleteConflictException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualMFADevice",
})) as any;

export type DetachGroupPolicyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified managed policy from the specified IAM group.
 *
 * A group can also have inline policies embedded with it. To delete an inline policy,
 * use DeleteGroupPolicy. For information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 */
export const detachGroupPolicy: API.OperationMethod<
  DetachGroupPolicyRequest,
  DetachGroupPolicyResponse,
  DetachGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, PolicyArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachGroupPolicy",
})) as any;

export type DetachRolePolicyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Removes the specified managed policy from the specified role.
 *
 * A role can also have inline policies embedded with it. To delete an inline policy, use
 * DeleteRolePolicy. For information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 */
export const detachRolePolicy: API.OperationMethod<
  DetachRolePolicyRequest,
  DetachRolePolicyResponse,
  DetachRolePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, PolicyArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachRolePolicy",
})) as any;

export type DetachUserPolicyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified managed policy from the specified user.
 *
 * A user can also have inline policies embedded with it. To delete an inline policy, use
 * DeleteUserPolicy. For information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 */
export const detachUserPolicy: API.OperationMethod<
  DetachUserPolicyRequest,
  DetachUserPolicyResponse,
  DetachUserPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, PolicyArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachUserPolicy",
})) as any;

export type DisableOrganizationsRootCredentialsManagementError =
  | AccountNotManagementOrDelegatedAdministratorException
  | OrganizationNotFoundException
  | OrganizationNotInAllFeaturesModeException
  | ServiceAccessNotEnabledException
  | CommonErrors;
/**
 * Disables the management of privileged root user credentials across member accounts in
 * your organization. When you disable this feature, the management account and the
 * delegated administrator for IAM can no longer manage root user credentials for member
 * accounts in your organization.
 */
export const disableOrganizationsRootCredentialsManagement: API.OperationMethod<
  DisableOrganizationsRootCredentialsManagementRequest,
  DisableOrganizationsRootCredentialsManagementResponse,
  DisableOrganizationsRootCredentialsManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { EnabledFeatures: D.list() },
  },
  errors: [
    AccountNotManagementOrDelegatedAdministratorException,
    OrganizationNotFoundException,
    OrganizationNotInAllFeaturesModeException,
    ServiceAccessNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationsRootCredentialsManagement",
})) as any;

export type DisableOrganizationsRootSessionsError =
  | AccountNotManagementOrDelegatedAdministratorException
  | OrganizationNotFoundException
  | OrganizationNotInAllFeaturesModeException
  | ServiceAccessNotEnabledException
  | CommonErrors;
/**
 * Disables root user sessions for privileged tasks across member accounts in your
 * organization. When you disable this feature, the management account and the delegated
 * administrator for IAM can no longer perform privileged tasks on member accounts in
 * your organization.
 */
export const disableOrganizationsRootSessions: API.OperationMethod<
  DisableOrganizationsRootSessionsRequest,
  DisableOrganizationsRootSessionsResponse,
  DisableOrganizationsRootSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { EnabledFeatures: D.list() },
  },
  errors: [
    AccountNotManagementOrDelegatedAdministratorException,
    OrganizationNotFoundException,
    OrganizationNotInAllFeaturesModeException,
    ServiceAccessNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationsRootSessions",
})) as any;

export type DisableOutboundWebIdentityFederationError =
  | FeatureDisabledException
  | CommonErrors;
/**
 * Disables the outbound identity federation feature for your Amazon Web Services account. When disabled, IAM principals in the account cannot
 * use the `GetWebIdentityToken` API to obtain JSON Web Tokens (JWTs) for authentication with external services. This operation
 * does not affect tokens that were issued before the feature was disabled.
 */
export const disableOutboundWebIdentityFederation: API.OperationMethod<
  DisableOutboundWebIdentityFederationRequest,
  DisableOutboundWebIdentityFederationResponse,
  DisableOutboundWebIdentityFederationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [FeatureDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOutboundWebIdentityFederation",
})) as any;

export type EnableMFADeviceError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | EntityTemporarilyUnmodifiableException
  | InvalidAuthenticationCodeException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Enables the specified MFA device and associates it with the specified IAM user. When
 * enabled, the MFA device is required for every subsequent login by the IAM user
 * associated with the device.
 */
export const enableMFADevice: API.OperationMethod<
  EnableMFADeviceRequest,
  EnableMFADeviceResponse,
  EnableMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserName: 0,
      SerialNumber: 0,
      AuthenticationCode1: 0,
      AuthenticationCode2: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    EntityTemporarilyUnmodifiableException,
    InvalidAuthenticationCodeException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableMFADevice",
})) as any;

export type EnableOrganizationsRootCredentialsManagementError =
  | AccountNotManagementOrDelegatedAdministratorException
  | CallerIsNotManagementAccountException
  | OrganizationNotFoundException
  | OrganizationNotInAllFeaturesModeException
  | ServiceAccessNotEnabledException
  | CommonErrors;
/**
 * Enables the management of privileged root user credentials across member accounts in your
 * organization. When you enable root credentials management for centralized root access, the management account and the delegated
 * administrator for IAM can manage root user credentials for member accounts in your
 * organization.
 *
 * Before you enable centralized root access, you must have an account configured with
 * the following settings:
 *
 * - You must manage your Amazon Web Services accounts in Organizations.
 *
 * - Enable trusted access for Identity and Access Management in Organizations. For details, see
 * IAM and Organizations in the Organizations User
 * Guide.
 */
export const enableOrganizationsRootCredentialsManagement: API.OperationMethod<
  EnableOrganizationsRootCredentialsManagementRequest,
  EnableOrganizationsRootCredentialsManagementResponse,
  EnableOrganizationsRootCredentialsManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { EnabledFeatures: D.list() },
  },
  errors: [
    AccountNotManagementOrDelegatedAdministratorException,
    CallerIsNotManagementAccountException,
    OrganizationNotFoundException,
    OrganizationNotInAllFeaturesModeException,
    ServiceAccessNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationsRootCredentialsManagement",
})) as any;

export type EnableOrganizationsRootSessionsError =
  | AccountNotManagementOrDelegatedAdministratorException
  | CallerIsNotManagementAccountException
  | OrganizationNotFoundException
  | OrganizationNotInAllFeaturesModeException
  | ServiceAccessNotEnabledException
  | CommonErrors;
/**
 * Allows the management account or delegated administrator to perform privileged tasks
 * on member accounts in your organization. For more information, see Centrally manage root access for member accounts in the Identity and Access Management
 * User Guide.
 *
 * Before you enable this feature, you must have an account configured with the following
 * settings:
 *
 * - You must manage your Amazon Web Services accounts in Organizations.
 *
 * - Enable trusted access for Identity and Access Management in Organizations. For details, see
 * IAM and Organizations in the Organizations User
 * Guide.
 */
export const enableOrganizationsRootSessions: API.OperationMethod<
  EnableOrganizationsRootSessionsRequest,
  EnableOrganizationsRootSessionsResponse,
  EnableOrganizationsRootSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { EnabledFeatures: D.list() },
  },
  errors: [
    AccountNotManagementOrDelegatedAdministratorException,
    CallerIsNotManagementAccountException,
    OrganizationNotFoundException,
    OrganizationNotInAllFeaturesModeException,
    ServiceAccessNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationsRootSessions",
})) as any;

export type EnableOutboundWebIdentityFederationError =
  | FeatureEnabledException
  | CommonErrors;
/**
 * Enables the outbound identity federation feature for your Amazon Web Services account. When enabled, IAM principals in your account
 * can use the `GetWebIdentityToken` API to obtain JSON Web Tokens (JWTs) for secure authentication with external services.
 * This operation also generates a unique issuer URL for your Amazon Web Services account.
 */
export const enableOutboundWebIdentityFederation: API.OperationMethod<
  EnableOutboundWebIdentityFederationRequest,
  EnableOutboundWebIdentityFederationResponse,
  EnableOutboundWebIdentityFederationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [FeatureEnabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOutboundWebIdentityFederation",
})) as any;

export type GenerateCredentialReportError =
  | LimitExceededException
  | ServiceFailureException
  | CommonErrors;
/**
 * Generates a credential report for the Amazon Web Services account. For more information about the
 * credential report, see Getting credential reports in
 * the *IAM User Guide*.
 */
export const generateCredentialReport: API.OperationMethod<
  GenerateCredentialReportRequest,
  GenerateCredentialReportResponse,
  GenerateCredentialReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [LimitExceededException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateCredentialReport",
})) as any;

export type GenerateOrganizationsAccessReportError =
  | ReportGenerationLimitExceededException
  | CommonErrors;
/**
 * Generates a report for service last accessed data for Organizations. You can generate a
 * report for any entities (organization root, organizational unit, or account) or policies
 * in your organization.
 *
 * To call this operation, you must be signed in using your Organizations management account
 * credentials. You can use your long-term IAM user or root user credentials, or temporary
 * credentials from assuming an IAM role. SCPs must be enabled for your organization
 * root. You must have the required IAM and Organizations permissions. For more information, see
 * Refining permissions using service last accessed data in the
 * *IAM User Guide*.
 *
 * You can generate a service last accessed data report for entities by specifying only
 * the entity's path. This data includes a list of services that are allowed by any service
 * control policies (SCPs) that apply to the entity.
 *
 * You can generate a service last accessed data report for a policy by specifying an
 * entity's path and an optional Organizations policy ID. This data includes a list of services that
 * are allowed by the specified SCP.
 *
 * For each service in both report types, the data includes the most recent account
 * activity that the policy allows to account principals in the entity or the entity's
 * children. For important information about the data, reporting period, permissions
 * required, troubleshooting, and supported Regions see Reducing permissions using
 * service last accessed data in the
 * *IAM User Guide*.
 *
 * The data includes all attempts to access Amazon Web Services, not just the successful ones. This
 * includes all attempts that were made using the Amazon Web Services Management Console, the Amazon Web Services API through any
 * of the SDKs, or any of the command line tools. An unexpected entry in the service
 * last accessed data does not mean that an account has been compromised, because the
 * request might have been denied. Refer to your CloudTrail logs as the authoritative
 * source for information about all API calls and whether they were successful or
 * denied access. For more information, see Logging IAM events with
 * CloudTrail in the *IAM User Guide*.
 *
 * This operation returns a `JobId`. Use this parameter in the
 * GetOrganizationsAccessReport
 * operation to check the status of
 * the report generation. To check the status of this request, use the `JobId`
 * parameter in the
 * GetOrganizationsAccessReport
 * operation and test the
 * `JobStatus` response parameter. When the job is complete, you can
 * retrieve the report.
 *
 * To generate a service last accessed data report for entities, specify an entity path
 * without specifying the optional Organizations policy ID. The type of entity that you specify
 * determines the data returned in the report.
 *
 * - **Root** – When you specify the
 * organizations root as the entity, the resulting report lists all of the services
 * allowed by SCPs that are attached to your root. For each service, the report
 * includes data for all accounts in your organization except the
 * management account, because the management account is not limited by SCPs.
 *
 * - **OU** – When you specify an
 * organizational unit (OU) as the entity, the resulting report lists all of the
 * services allowed by SCPs that are attached to the OU and its parents. For each
 * service, the report includes data for all accounts in the OU or its children.
 * This data excludes the management account, because the management account is not
 * limited by SCPs.
 *
 * - **management account** – When you specify the
 * management account, the resulting report lists all Amazon Web Services services, because the
 * management account is not limited by SCPs. For each service, the report includes
 * data for only the management account.
 *
 * - **Account** – When you specify another
 * account as the entity, the resulting report lists all of the services allowed by
 * SCPs that are attached to the account and its parents. For each service, the
 * report includes data for only the specified account.
 *
 * To generate a service last accessed data report for policies, specify an entity path
 * and the optional Organizations policy ID. The type of entity that you specify determines the data
 * returned for each service.
 *
 * - **Root** – When you specify the root
 * entity and a policy ID, the resulting report lists all of the services that are
 * allowed by the specified SCP. For each service, the report includes data for all
 * accounts in your organization to which the SCP applies. This data excludes the
 * management account, because the management account is not limited by SCPs. If the
 * SCP is not attached to any entities in the organization, then the report will
 * return a list of services with no data.
 *
 * - **OU** – When you specify an OU entity and
 * a policy ID, the resulting report lists all of the services that are allowed by
 * the specified SCP. For each service, the report includes data for all accounts
 * in the OU or its children to which the SCP applies. This means that other
 * accounts outside the OU that are affected by the SCP might not be included in
 * the data. This data excludes the management account, because the
 * management account is not limited by SCPs. If the SCP is not attached to the OU
 * or one of its children, the report will return a list of services with no
 * data.
 *
 * - **management account** – When you specify the
 * management account, the resulting report lists all Amazon Web Services services, because the
 * management account is not limited by SCPs. If you specify a policy ID in the CLI
 * or API, the policy is ignored. For each service, the report includes data for
 * only the management account.
 *
 * - **Account** – When you specify another
 * account entity and a policy ID, the resulting report lists all of the services
 * that are allowed by the specified SCP. For each service, the report includes
 * data for only the specified account. This means that other accounts in the
 * organization that are affected by the SCP might not be included in the data. If
 * the SCP is not attached to the account, the report will return a list of
 * services with no data.
 *
 * Service last accessed data does not use other policy types when determining
 * whether a principal could access a service. These other policy types include
 * identity-based policies, resource-based policies, access control lists, IAM
 * permissions boundaries, and STS assume role policies. It only applies SCP logic.
 * For more about the evaluation of policy types, see Evaluating policies in the
 * *IAM User Guide*.
 *
 * For more information about service last accessed data, see Reducing policy scope by
 * viewing user activity in the *IAM User Guide*.
 */
export const generateOrganizationsAccessReport: API.OperationMethod<
  GenerateOrganizationsAccessReportRequest,
  GenerateOrganizationsAccessReportResponse,
  GenerateOrganizationsAccessReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EntityPath: 0, OrganizationsPolicyId: 0 },
  },
  errors: [ReportGenerationLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateOrganizationsAccessReport",
})) as any;

export type GenerateServiceLastAccessedDetailsError =
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Generates a report that includes details about when an IAM resource (user, group,
 * role, or policy) was last used in an attempt to access Amazon Web Services services. Recent activity
 * usually appears within four hours. IAM reports activity for at least the last 400
 * days, or less if your Region began supporting this feature within the last year. For
 * more information, see Regions where data is tracked. For more information about services and
 * actions for which action last accessed information is displayed, see IAM
 * action last accessed information services and actions.
 *
 * The service last accessed data includes all attempts to access an Amazon Web Services API, not
 * just the successful ones. This includes all attempts that were made using the
 * Amazon Web Services Management Console, the Amazon Web Services API through any of the SDKs, or any of the command line tools.
 * An unexpected entry in the service last accessed data does not mean that your
 * account has been compromised, because the request might have been denied. Refer to
 * your CloudTrail logs as the authoritative source for information about all API calls
 * and whether they were successful or denied access. For more information, see Logging
 * IAM events with CloudTrail in the
 * *IAM User Guide*.
 *
 * The `GenerateServiceLastAccessedDetails` operation returns a
 * `JobId`. Use this parameter in the following operations to retrieve the
 * following details from your report:
 *
 * - GetServiceLastAccessedDetails – Use this operation for
 * users, groups, roles, or policies to list every Amazon Web Services service that the resource
 * could access using permissions policies. For each service, the response includes
 * information about the most recent access attempt.
 *
 * The `JobId` returned by
 * `GenerateServiceLastAccessedDetail` must be used by the same role
 * within a session, or by the same user when used to call
 * `GetServiceLastAccessedDetail`.
 *
 * - GetServiceLastAccessedDetailsWithEntities – Use this
 * operation for groups and policies to list information about the associated
 * entities (users or roles) that attempted to access a specific Amazon Web Services service.
 *
 * To check the status of the `GenerateServiceLastAccessedDetails` request,
 * use the `JobId` parameter in the same operations and test the
 * `JobStatus` response parameter.
 *
 * For additional information about the permissions policies that allow an identity
 * (user, group, or role) to access specific services, use the ListPoliciesGrantingServiceAccess operation.
 *
 * Service last accessed data does not use other policy types when determining
 * whether a resource could access a service. These other policy types include
 * resource-based policies, access control lists, Organizations policies, IAM permissions
 * boundaries, and STS assume role policies. It only applies permissions policy
 * logic. For more about the evaluation of policy types, see Evaluating policies in the
 * *IAM User Guide*.
 *
 * For more information about service and action last accessed data, see Reducing permissions using service last accessed data in the
 * *IAM User Guide*.
 */
export const generateServiceLastAccessedDetails: API.OperationMethod<
  GenerateServiceLastAccessedDetailsRequest,
  GenerateServiceLastAccessedDetailsResponse,
  GenerateServiceLastAccessedDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0, Granularity: 0 } },
  errors: [InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateServiceLastAccessedDetails",
})) as any;

export type GetAccessKeyLastUsedError = CommonErrors;
/**
 * Retrieves information about when the specified access key was last used. The
 * information includes the date and time of last use, along with the Amazon Web Services service and
 * Region that were specified in the last request made with that key.
 */
export const getAccessKeyLastUsed: API.OperationMethod<
  GetAccessKeyLastUsedRequest,
  GetAccessKeyLastUsedResponse,
  GetAccessKeyLastUsedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessKeyId: 0 },
    output: { AccessKeyLastUsed: { LastUsedDate: D.ts } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessKeyLastUsed",
})) as any;

export type GetAccountAuthorizationDetailsError =
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about all IAM users, groups, roles, and policies in your Amazon Web Services
 * account, including their relationships to one another. Use this operation to obtain a
 * snapshot of the configuration of IAM permissions (users, groups, roles, and policies)
 * in your account.
 *
 * Policies returned by this operation are URL-encoded compliant
 * with RFC 3986. You can use a URL
 * decoding method to convert the policy back to plain JSON text. For example, if you use Java, you
 * can use the `decode` method of the `java.net.URLDecoder` utility class in
 * the Java SDK. Other languages and SDKs provide similar functionality, and some SDKs do this decoding
 * automatically.
 *
 * You can optionally filter the results using the `Filter` parameter. You can
 * paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const getAccountAuthorizationDetails: API.PaginatedOperationMethod<
  GetAccountAuthorizationDetailsRequest,
  GetAccountAuthorizationDetailsResponse,
  GetAccountAuthorizationDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filter: 0, MaxItems: 0, Marker: 0 },
    output: {
      UserDetailList: D.list({
        CreateDate: D.ts,
        UserPolicyList: D.list({}),
        GroupList: D.list(),
        AttachedManagedPolicies: D.list({}),
        PermissionsBoundary: {},
        Tags: D.list({}),
      }),
      GroupDetailList: D.list({
        CreateDate: D.ts,
        GroupPolicyList: D.list({}),
        AttachedManagedPolicies: D.list({}),
      }),
      RoleDetailList: D.list({
        CreateDate: D.ts,
        InstanceProfileList: D.list(o_InstanceProfile),
        RolePolicyList: D.list({}),
        AttachedManagedPolicies: D.list({}),
        PermissionsBoundary: {},
        Tags: D.list({}),
        RoleLastUsed: o_RoleLastUsed,
      }),
      Policies: D.list({
        AttachmentCount: D.num,
        PermissionsBoundaryUsageCount: D.num,
        IsAttachable: D.bool,
        CreateDate: D.ts,
        UpdateDate: D.ts,
        PolicyVersionList: D.list(o_PolicyVersion),
      }),
      IsTruncated: D.bool,
    },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountAuthorizationDetails",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetAccountPasswordPolicyError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the password policy for the Amazon Web Services account. This tells you the complexity
 * requirements and mandatory rotation periods for the IAM user passwords in your account.
 * For more information about using a password policy, see Managing an IAM password
 * policy.
 */
export const getAccountPasswordPolicy: API.OperationMethod<
  GetAccountPasswordPolicyRequest,
  GetAccountPasswordPolicyResponse,
  GetAccountPasswordPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      PasswordPolicy: {
        MinimumPasswordLength: D.num,
        RequireSymbols: D.bool,
        RequireNumbers: D.bool,
        RequireUppercaseCharacters: D.bool,
        RequireLowercaseCharacters: D.bool,
        AllowUsersToChangePassword: D.bool,
        ExpirePasswords: D.bool,
        MaxPasswordAge: D.num,
        PasswordReusePrevention: D.num,
        HardExpiry: D.bool,
      },
    },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountPasswordPolicy",
})) as any;

export type GetAccountPropertiesError =
  | InvalidInputException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the account-level properties for the caller's Amazon Web Services account. Account
 * properties are configuration settings that control account-wide IAM features such as
 * Role Manager.
 *
 * The service returns properties as key-value pairs in
 * `Namespace/PropertyName` format. Each namespace groups related
 * configuration settings. Use PutAccountProperties to modify these properties.
 */
export const getAccountProperties: API.OperationMethod<
  GetAccountPropertiesRequest,
  GetAccountPropertiesResponse,
  GetAccountPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {}, output: { Properties: D.map() } },
  errors: [InvalidInputException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountProperties",
})) as any;

export type GetAccountSummaryError = ServiceFailureException | CommonErrors;
/**
 * Retrieves information about IAM entity usage and IAM quotas in the Amazon Web Services
 * account.
 *
 * For information about IAM quotas, see IAM and STS quotas in the
 * *IAM User Guide*.
 */
export const getAccountSummary: API.OperationMethod<
  GetAccountSummaryRequest,
  GetAccountSummaryResponse,
  GetAccountSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { SummaryMap: D.map(D.num) } },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSummary",
})) as any;

export type GetContextKeysForCustomPolicyError =
  | InvalidInputException
  | CommonErrors;
/**
 * Gets a list of all of the context keys referenced in the input policies. The policies
 * are supplied as a list of one or more strings. To get the context keys from policies
 * associated with an IAM user, group, or role, use GetContextKeysForPrincipalPolicy.
 *
 * Context keys are variables maintained by Amazon Web Services and its services that provide details
 * about the context of an API query request. Context keys can be evaluated by testing
 * against a value specified in an IAM policy. Use
 * `GetContextKeysForCustomPolicy` to understand what key names and values
 * you must supply when you call SimulateCustomPolicy. Note that all parameters are shown in unencoded form
 * here for clarity but must be URL encoded to be included as a part of a real HTML
 * request.
 */
export const getContextKeysForCustomPolicy: API.OperationMethod<
  GetContextKeysForCustomPolicyRequest,
  GetContextKeysForPolicyResponse,
  GetContextKeysForCustomPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyInputList: 0 },
    output: { ContextKeyNames: D.list() },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContextKeysForCustomPolicy",
})) as any;

export type GetContextKeysForPrincipalPolicyError =
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Gets a list of all of the context keys referenced in all the IAM policies that are
 * attached to the specified IAM entity. The entity can be an IAM user, group, or role.
 * If you specify a user, then the request also includes all of the policies attached to
 * groups that the user is a member of.
 *
 * You can optionally include a list of one or more additional policies, specified as
 * strings. If you want to include *only* a list of policies by string,
 * use GetContextKeysForCustomPolicy instead.
 *
 * **Note:** This operation discloses information about the
 * permissions granted to other users. If you do not want users to see other user's
 * permissions, then consider allowing them to use GetContextKeysForCustomPolicy instead.
 *
 * Context keys are variables maintained by Amazon Web Services and its services that provide details
 * about the context of an API query request. Context keys can be evaluated by testing
 * against a value in an IAM policy. Use GetContextKeysForPrincipalPolicy to understand what key names and values
 * you must supply when you call SimulatePrincipalPolicy. This operation doesn't return context keys
 * referenced by service control policies (SCPs). Only context keys referenced by the
 * identity-based policies attached to the specified entity, and any additional policies
 * that you provide, are included.
 */
export const getContextKeysForPrincipalPolicy: API.OperationMethod<
  GetContextKeysForPrincipalPolicyRequest,
  GetContextKeysForPolicyResponse,
  GetContextKeysForPrincipalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicySourceArn: 0, PolicyInputList: 0 },
    output: { ContextKeyNames: D.list() },
  },
  errors: [InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContextKeysForPrincipalPolicy",
})) as any;

export type GetCredentialReportError =
  | CredentialReportExpiredException
  | CredentialReportNotPresentException
  | CredentialReportNotReadyException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves a credential report for the Amazon Web Services account. For more information about the
 * credential report, see Getting credential reports in
 * the *IAM User Guide*.
 */
export const getCredentialReport: API.OperationMethod<
  GetCredentialReportRequest,
  GetCredentialReportResponse,
  GetCredentialReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: { Content: D.blob, GeneratedTime: D.ts },
  },
  errors: [
    CredentialReportExpiredException,
    CredentialReportNotPresentException,
    CredentialReportNotReadyException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentialReport",
})) as any;

export type GetDelegationRequestError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about a specific delegation request.
 *
 * If a delegation request has no owner or owner account, `GetDelegationRequest` for that delegation request can be called by any account.
 * If the owner account is assigned but there is
 * no owner id, only identities within that owner account can call `GetDelegationRequest`
 * for the delegation request. Once the delegation request is fully owned, the owner of the request gets
 * a default permission to get that delegation request. For more details, see
 *
 * Managing Permissions for Delegation Requests.
 */
export const getDelegationRequest: API.OperationMethod<
  GetDelegationRequestRequest,
  GetDelegationRequestResponse,
  GetDelegationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DelegationRequestId: 0, DelegationPermissionCheck: 0 },
    output: { DelegationRequest: o_DelegationRequest },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDelegationRequest",
})) as any;

export type GetGroupError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns a list of IAM users that are in the specified IAM group. You can paginate
 * the results using the `MaxItems` and `Marker` parameters.
 */
export const getGroup: API.PaginatedOperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { GroupName: 0, Marker: 0, MaxItems: 0 },
    output: { Group: o_Group, Users: D.list(o_User), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetGroupPolicyError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the specified inline policy document that is embedded in the specified IAM
 * group.
 *
 * Policies returned by this operation are URL-encoded compliant
 * with RFC 3986. You can use a URL
 * decoding method to convert the policy back to plain JSON text. For example, if you use Java, you
 * can use the `decode` method of the `java.net.URLDecoder` utility class in
 * the Java SDK. Other languages and SDKs provide similar functionality, and some SDKs do this decoding
 * automatically.
 *
 * An IAM group can also have managed policies attached to it. To retrieve a managed
 * policy document that is attached to a group, use GetPolicy to determine the
 * policy's default version, then use GetPolicyVersion to
 * retrieve the policy document.
 *
 * For more information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const getGroupPolicy: API.OperationMethod<
  GetGroupPolicyRequest,
  GetGroupPolicyResponse,
  GetGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, PolicyName: 0 } },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupPolicy",
})) as any;

export type GetHumanReadableSummaryError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves a human readable summary for a given entity. At this time, the only supported
 * entity type is `delegation-request`
 *
 * This method uses a Large Language Model (LLM) to generate the summary.
 *
 * If a delegation request has no owner or owner account, `GetHumanReadableSummary` for that delegation request can be called by any account.
 * If the owner account is assigned but there is
 * no owner id, only identities within that owner account can call `GetHumanReadableSummary`
 * for the delegation request to retrieve a summary of that request.
 * Once the delegation request is fully owned, the owner of the request gets
 * a default permission to get that delegation request. For more details, read
 * default permissions granted to delegation requests. These rules are identical to
 * GetDelegationRequest
 * API behavior, such that a party who has permissions to call
 * GetDelegationRequest
 * for a given delegation request will always be able to retrieve the human readable summary for that request.
 */
export const getHumanReadableSummary: API.OperationMethod<
  GetHumanReadableSummaryRequest,
  GetHumanReadableSummaryResponse,
  GetHumanReadableSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EntityArn: 0, Locale: 0 } },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHumanReadableSummary",
})) as any;

export type GetInstanceProfileError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about the specified instance profile, including the instance
 * profile's path, GUID, ARN, and role. For more information about instance profiles, see
 * Using
 * instance profiles in the *IAM User Guide*.
 */
export const getInstanceProfile: API.OperationMethod<
  GetInstanceProfileRequest,
  GetInstanceProfileResponse,
  GetInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceProfileName: 0 },
    output: { InstanceProfile: o_InstanceProfile },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceProfile",
})) as any;

export type GetLoginProfileError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the user name for the specified IAM user. A login profile is created when
 * you create a password for the user to access the Amazon Web Services Management Console. If the user does not exist
 * or does not have a password, the operation returns a 404 (`NoSuchEntity`)
 * error.
 *
 * If you create an IAM user with access to the console, the `CreateDate`
 * reflects the date you created the initial password for the user.
 *
 * If you create an IAM user with programmatic access, and then later add a password
 * for the user to access the Amazon Web Services Management Console, the `CreateDate` reflects the initial
 * password creation date. A user with programmatic access does not have a login profile
 * unless you create a password for the user to access the Amazon Web Services Management Console.
 */
export const getLoginProfile: API.OperationMethod<
  GetLoginProfileRequest,
  GetLoginProfileResponse,
  GetLoginProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0 },
    output: { LoginProfile: o_LoginProfile },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoginProfile",
})) as any;

export type GetMFADeviceError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about an MFA device for a specified user.
 */
export const getMFADevice: API.OperationMethod<
  GetMFADeviceRequest,
  GetMFADeviceResponse,
  GetMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SerialNumber: 0, UserName: 0 },
    output: { EnableDate: D.ts, Certifications: D.map() },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMFADevice",
})) as any;

export type GetOpenIDConnectProviderError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns information about the specified OpenID Connect (OIDC) provider resource object
 * in IAM.
 */
export const getOpenIDConnectProvider: API.OperationMethod<
  GetOpenIDConnectProviderRequest,
  GetOpenIDConnectProviderResponse,
  GetOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0 },
    output: {
      ClientIDList: D.list(),
      ThumbprintList: D.list(),
      CreateDate: D.ts,
      Tags: D.list({}),
    },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpenIDConnectProvider",
})) as any;

export type GetOrganizationsAccessReportError =
  | NoSuchEntityException
  | CommonErrors;
/**
 * Retrieves the service last accessed data report for Organizations that was previously
 * generated using the
 * GenerateOrganizationsAccessReport
 * operation. This operation
 * retrieves the status of your report job and the report contents.
 *
 * Depending on the parameters that you passed when you generated the report, the data
 * returned could include different information. For details, see GenerateOrganizationsAccessReport.
 *
 * To call this operation, you must be signed in to the management account in your
 * organization. SCPs must be enabled for your organization root. You must have permissions
 * to perform this operation. For more information, see Refining permissions using
 * service last accessed data in the
 * *IAM User Guide*.
 *
 * For each service that principals in an account (root user, IAM users, or IAM roles)
 * could access using SCPs, the operation returns details about the most recent access
 * attempt. If there was no attempt, the service is listed without details about the most
 * recent attempt to access the service. If the operation fails, it returns the reason that
 * it failed.
 *
 * By default, the list is sorted by service namespace.
 */
export const getOrganizationsAccessReport: API.OperationMethod<
  GetOrganizationsAccessReportRequest,
  GetOrganizationsAccessReportResponse,
  GetOrganizationsAccessReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxItems: 0, Marker: 0, SortKey: 0 },
    output: {
      JobCreationDate: D.ts,
      JobCompletionDate: D.ts,
      NumberOfServicesAccessible: D.num,
      NumberOfServicesNotAccessed: D.num,
      AccessDetails: D.list({
        LastAuthenticatedTime: D.ts,
        TotalAuthenticatedEntities: D.num,
      }),
      IsTruncated: D.bool,
      ErrorDetails: {},
    },
  },
  errors: [NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationsAccessReport",
})) as any;

export type GetOutboundWebIdentityFederationInfoError =
  | FeatureDisabledException
  | CommonErrors;
/**
 * Retrieves the configuration information for the outbound identity federation feature in your Amazon Web Services account. The response includes the unique issuer URL for your
 * Amazon Web Services account and the current enabled/disabled status of the feature. Use this operation to obtain the issuer URL that you need to configure trust relationships with external services.
 */
export const getOutboundWebIdentityFederationInfo: API.OperationMethod<
  GetOutboundWebIdentityFederationInfoRequest,
  GetOutboundWebIdentityFederationInfoResponse,
  GetOutboundWebIdentityFederationInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { JwtVendingEnabled: D.bool } },
  errors: [FeatureDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutboundWebIdentityFederationInfo",
})) as any;

export type GetPolicyError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about the specified managed policy, including the policy's
 * default version and the total number of IAM users, groups, and roles to which the
 * policy is attached. To retrieve the list of the specific users, groups, and roles that
 * the policy is attached to, use ListEntitiesForPolicy. This operation returns metadata about the policy. To
 * retrieve the actual policy document for a specific version of the policy, use GetPolicyVersion.
 *
 * This operation retrieves information about managed policies. To retrieve information
 * about an inline policy that is embedded with an IAM user, group, or role, use GetUserPolicy, GetGroupPolicy, or
 * GetRolePolicy.
 *
 * For more information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyArn: 0 },
    output: { Policy: o_Policy },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetPolicyVersionError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about the specified version of the specified managed policy,
 * including the policy document.
 *
 * Policies returned by this operation are URL-encoded compliant
 * with RFC 3986. You can use a URL
 * decoding method to convert the policy back to plain JSON text. For example, if you use Java, you
 * can use the `decode` method of the `java.net.URLDecoder` utility class in
 * the Java SDK. Other languages and SDKs provide similar functionality, and some SDKs do this decoding
 * automatically.
 *
 * To list the available versions for a policy, use ListPolicyVersions.
 *
 * This operation retrieves information about managed policies. To retrieve information
 * about an inline policy that is embedded in a user, group, or role, use GetUserPolicy, GetGroupPolicy, or
 * GetRolePolicy.
 *
 * For more information about the types of policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 *
 * For more information about managed policy versions, see Versioning for managed
 * policies in the *IAM User Guide*.
 */
export const getPolicyVersion: API.OperationMethod<
  GetPolicyVersionRequest,
  GetPolicyVersionResponse,
  GetPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyArn: 0, VersionId: 0 },
    output: { PolicyVersion: o_PolicyVersion },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyVersion",
})) as any;

export type GetRoleError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about the specified role, including the role's path, GUID, ARN,
 * and the role's trust policy that grants permission to assume the role. For more
 * information about roles, see IAM roles in the
 * *IAM User Guide*.
 *
 * Policies returned by this operation are URL-encoded compliant
 * with RFC 3986. You can use a URL
 * decoding method to convert the policy back to plain JSON text. For example, if you use Java, you
 * can use the `decode` method of the `java.net.URLDecoder` utility class in
 * the Java SDK. Other languages and SDKs provide similar functionality, and some SDKs do this decoding
 * automatically.
 */
export const getRole: API.OperationMethod<
  GetRoleRequest,
  GetRoleResponse,
  GetRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0 },
    output: { Role: o_Role },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRole",
})) as any;

export type GetRolePolicyError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the specified inline policy document that is embedded with the specified
 * IAM role.
 *
 * Policies returned by this operation are URL-encoded compliant
 * with RFC 3986. You can use a URL
 * decoding method to convert the policy back to plain JSON text. For example, if you use Java, you
 * can use the `decode` method of the `java.net.URLDecoder` utility class in
 * the Java SDK. Other languages and SDKs provide similar functionality, and some SDKs do this decoding
 * automatically.
 *
 * An IAM role can also have managed policies attached to it. To retrieve a managed
 * policy document that is attached to a role, use GetPolicy to determine the
 * policy's default version, then use GetPolicyVersion to
 * retrieve the policy document.
 *
 * For more information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 *
 * For more information about roles, see IAM roles in the
 * *IAM User Guide*.
 */
export const getRolePolicy: API.OperationMethod<
  GetRolePolicyRequest,
  GetRolePolicyResponse,
  GetRolePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, PolicyName: 0 } },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRolePolicy",
})) as any;

export type GetRoleTemplateVersionError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about a version of the specified role template. Role templates
 * define a reusable configuration—including role name and path patterns, trust
 * policy, inline and managed policies, permissions boundary, tags, and maximum session
 * duration—that you use to create IAM roles with AcquireRole.
 *
 * If you do not specify a minor version, the service returns the template's default
 * minor version.
 */
export const getRoleTemplateVersion: API.OperationMethod<
  GetRoleTemplateVersionRequest,
  GetRoleTemplateVersionResponse,
  GetRoleTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TemplateArn: 0, MinorVersion: 0 },
    output: {
      RoleTemplateVersion: {
        MajorVersion: D.num,
        DefaultMinorVersion: D.num,
        Enabled: D.bool,
        MinorVersion: D.num,
        InlinePolicyTemplates: D.list({}),
        ManagedPolicyArns: D.list(),
        ParametersDefinition: D.list({ IsRequired: D.bool, Immutable: D.bool }),
        RoleTagsTemplate: D.list({}),
        MaxSessionDuration: D.num,
        VersionEnabled: D.bool,
        CreateTimestamp: D.ts,
        UpdateTimestamp: D.ts,
      },
    },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoleTemplateVersion",
})) as any;

export type GetSAMLProviderError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns the SAML provider metadocument that was uploaded when the IAM SAML provider
 * resource object was created or updated.
 *
 * This operation requires Signature Version 4.
 */
export const getSAMLProvider: API.OperationMethod<
  GetSAMLProviderRequest,
  GetSAMLProviderResponse,
  GetSAMLProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SAMLProviderArn: 0 },
    output: {
      CreateDate: D.ts,
      ValidUntil: D.ts,
      Tags: D.list({}),
      PrivateKeyList: D.list({ Timestamp: D.ts }),
    },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSAMLProvider",
})) as any;

export type GetServerCertificateError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about the specified server certificate stored in IAM.
 *
 * For more information about working with server certificates, see Working
 * with server certificates in the *IAM User Guide*. This
 * topic includes a list of Amazon Web Services services that can use the server certificates that you
 * manage with IAM.
 */
export const getServerCertificate: API.OperationMethod<
  GetServerCertificateRequest,
  GetServerCertificateResponse,
  GetServerCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServerCertificateName: 0 },
    output: {
      ServerCertificate: {
        ServerCertificateMetadata: o_ServerCertificateMetadata,
        Tags: D.list({}),
      },
    },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServerCertificate",
})) as any;

export type GetServiceLastAccessedDetailsError =
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Retrieves a service last accessed report that was created using the
 * `GenerateServiceLastAccessedDetails` operation. You can use the
 * `JobId` parameter in `GetServiceLastAccessedDetails` to
 * retrieve the status of your report job. When the report is complete, you can retrieve
 * the generated report. The report includes a list of Amazon Web Services services that the resource
 * (user, group, role, or managed policy) can access.
 *
 * Service last accessed data does not use other policy types when determining
 * whether a resource could access a service. These other policy types include
 * resource-based policies, access control lists, Organizations policies, IAM permissions
 * boundaries, and STS assume role policies. It only applies permissions policy
 * logic. For more about the evaluation of policy types, see Evaluating policies in the
 * *IAM User Guide*.
 *
 * For each service that the resource could access using permissions policies, the
 * operation returns details about the most recent access attempt. If there was no attempt,
 * the service is listed without details about the most recent attempt to access the
 * service. If the operation fails, the `GetServiceLastAccessedDetails`
 * operation returns the reason that it failed.
 *
 * The `GetServiceLastAccessedDetails` operation returns a list of services.
 * This list includes the number of entities that have attempted to access the service and
 * the date and time of the last attempt. It also returns the ARN of the following entity,
 * depending on the resource ARN that you used to generate the report:
 *
 * - **User** – Returns the user ARN that you
 * used to generate the report
 *
 * - **Group** – Returns the ARN of the group
 * member (user) that last attempted to access the service
 *
 * - **Role** – Returns the role ARN that you
 * used to generate the report
 *
 * - **Policy** – Returns the ARN of the user
 * or role that last used the policy to attempt to access the service
 *
 * By default, the list is sorted by service namespace.
 *
 * If you specified `ACTION_LEVEL` granularity when you generated the report,
 * this operation returns service and action last accessed data. This includes the most
 * recent access attempt for each tracked action within a service. Otherwise, this
 * operation returns only service data.
 *
 * For more information about service and action last accessed data, see Reducing permissions using service last accessed data in the
 * *IAM User Guide*.
 */
export const getServiceLastAccessedDetails: API.OperationMethod<
  GetServiceLastAccessedDetailsRequest,
  GetServiceLastAccessedDetailsResponse,
  GetServiceLastAccessedDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, MaxItems: 0, Marker: 0 },
    output: {
      JobCreationDate: D.ts,
      ServicesLastAccessed: D.list({
        LastAuthenticated: D.ts,
        TotalAuthenticatedEntities: D.num,
        TrackedActionsLastAccessed: D.list({ LastAccessedTime: D.ts }),
      }),
      JobCompletionDate: D.ts,
      IsTruncated: D.bool,
      Error: {},
    },
  },
  errors: [InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceLastAccessedDetails",
})) as any;

export type GetServiceLastAccessedDetailsWithEntitiesError =
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * After you generate a group or policy report using the
 * `GenerateServiceLastAccessedDetails` operation, you can use the
 * `JobId` parameter in
 * `GetServiceLastAccessedDetailsWithEntities`. This operation retrieves the
 * status of your report job and a list of entities that could have used group or policy
 * permissions to access the specified service.
 *
 * - **Group** – For a group report, this
 * operation returns a list of users in the group that could have used the group’s
 * policies in an attempt to access the service.
 *
 * - **Policy** – For a policy report, this
 * operation returns a list of entities (users or roles) that could have used the
 * policy in an attempt to access the service.
 *
 * You can also use this operation for user or role reports to retrieve details about
 * those entities.
 *
 * If the operation fails, the `GetServiceLastAccessedDetailsWithEntities`
 * operation returns the reason that it failed.
 *
 * By default, the list of associated entities is sorted by date, with the most recent
 * access listed first.
 */
export const getServiceLastAccessedDetailsWithEntities: API.OperationMethod<
  GetServiceLastAccessedDetailsWithEntitiesRequest,
  GetServiceLastAccessedDetailsWithEntitiesResponse,
  GetServiceLastAccessedDetailsWithEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobId: 0, ServiceNamespace: 0, MaxItems: 0, Marker: 0 },
    output: {
      JobCreationDate: D.ts,
      JobCompletionDate: D.ts,
      EntityDetailsList: D.list({ EntityInfo: {}, LastAuthenticated: D.ts }),
      IsTruncated: D.bool,
      Error: {},
    },
  },
  errors: [InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceLastAccessedDetailsWithEntities",
})) as any;

export type GetServiceLinkedRoleDeletionStatusError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the status of your service-linked role deletion. After you use DeleteServiceLinkedRole to submit a service-linked role for deletion, you
 * can use the `DeletionTaskId` parameter in
 * `GetServiceLinkedRoleDeletionStatus` to check the status of the deletion.
 * If the deletion fails, this operation returns the reason that it failed, if that
 * information is returned by the service.
 */
export const getServiceLinkedRoleDeletionStatus: API.OperationMethod<
  GetServiceLinkedRoleDeletionStatusRequest,
  GetServiceLinkedRoleDeletionStatusResponse,
  GetServiceLinkedRoleDeletionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeletionTaskId: 0 },
    output: { Reason: { RoleUsageList: D.list({ Resources: D.list() }) } },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceLinkedRoleDeletionStatus",
})) as any;

export type GetSSHPublicKeyError =
  | NoSuchEntityException
  | UnrecognizedPublicKeyEncodingException
  | CommonErrors;
/**
 * Retrieves the specified SSH public key, including metadata about the key.
 *
 * The SSH public key retrieved by this operation is used only for authenticating the
 * associated IAM user to an CodeCommit repository. For more information about using SSH keys
 * to authenticate to an CodeCommit repository, see Set up CodeCommit for SSH
 * connections in the *CodeCommit User Guide*.
 */
export const getSSHPublicKey: API.OperationMethod<
  GetSSHPublicKeyRequest,
  GetSSHPublicKeyResponse,
  GetSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, SSHPublicKeyId: 0, Encoding: 0 },
    output: { SSHPublicKey: o_SSHPublicKey },
  },
  errors: [NoSuchEntityException, UnrecognizedPublicKeyEncodingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSSHPublicKey",
})) as any;

export type GetUserError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves information about the specified IAM user, including the user's creation
 * date, path, unique ID, and ARN.
 *
 * If you do not specify a user name, IAM determines the user name implicitly based on
 * the Amazon Web Services access key ID used to sign the request to this operation.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0 },
    output: { User: o_User },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
})) as any;

export type GetUserPolicyError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Retrieves the specified inline policy document that is embedded in the specified IAM
 * user.
 *
 * Policies returned by this operation are URL-encoded compliant
 * with RFC 3986. You can use a URL
 * decoding method to convert the policy back to plain JSON text. For example, if you use Java, you
 * can use the `decode` method of the `java.net.URLDecoder` utility class in
 * the Java SDK. Other languages and SDKs provide similar functionality, and some SDKs do this decoding
 * automatically.
 *
 * An IAM user can also have managed policies attached to it. To retrieve a managed
 * policy document that is attached to a user, use GetPolicy to determine the
 * policy's default version. Then use GetPolicyVersion to
 * retrieve the policy document.
 *
 * For more information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const getUserPolicy: API.OperationMethod<
  GetUserPolicyRequest,
  GetUserPolicyResponse,
  GetUserPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, PolicyName: 0 } },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserPolicy",
})) as any;

export type ListAccessKeysError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns information about the access key IDs associated with the specified IAM user.
 * If there is none, the operation returns an empty list.
 *
 * Although each user is limited to a small number of keys, you can still paginate the
 * results using the `MaxItems` and `Marker` parameters.
 *
 * If the `UserName` is not specified, the user name is determined implicitly
 * based on the Amazon Web Services access key ID used to sign the request. If a temporary access key is
 * used, then `UserName` is required. If a long-term key is assigned to the
 * user, then `UserName` is not required.
 *
 * This operation works for access keys under the Amazon Web Services account. If the Amazon Web Services account has
 * no associated users, the root user returns it's own access key IDs by running this
 * command.
 *
 * To ensure the security of your Amazon Web Services account, the secret access key is accessible
 * only during key and user creation.
 */
export const listAccessKeys: API.PaginatedOperationMethod<
  ListAccessKeysRequest,
  ListAccessKeysResponse,
  ListAccessKeysError,
  Credentials | HttpClient.HttpClient,
  AccessKeyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: {
      AccessKeyMetadata: D.list({ CreateDate: D.ts }),
      IsTruncated: D.bool,
    },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessKeys",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AccessKeyMetadata",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListAccountAliasesError = ServiceFailureException | CommonErrors;
/**
 * Lists the account alias associated with the Amazon Web Services account (Note: you can have only
 * one). For information about using an Amazon Web Services account alias, see Creating,
 * deleting, and listing an Amazon Web Services account alias in the
 * *IAM User Guide*.
 */
export const listAccountAliases: API.PaginatedOperationMethod<
  ListAccountAliasesRequest,
  ListAccountAliasesResponse,
  ListAccountAliasesError,
  Credentials | HttpClient.HttpClient,
  AccountAliasType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Marker: 0, MaxItems: 0 },
    output: { AccountAliases: D.list(), IsTruncated: D.bool },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAliases",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AccountAliases",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListAttachedGroupPoliciesError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists all managed policies that are attached to the specified IAM group.
 *
 * An IAM group can also have inline policies embedded with it. To list the inline
 * policies for a group, use ListGroupPolicies.
 * For information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters. You can use the `PathPrefix` parameter to limit the list of
 * policies to only those matching the specified path prefix. If there are no policies
 * attached to the specified group (or none that match the specified path prefix), the
 * operation returns an empty list.
 */
export const listAttachedGroupPolicies: API.PaginatedOperationMethod<
  ListAttachedGroupPoliciesRequest,
  ListAttachedGroupPoliciesResponse,
  ListAttachedGroupPoliciesError,
  Credentials | HttpClient.HttpClient,
  AttachedPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { GroupName: 0, PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: { AttachedPolicies: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedGroupPolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListAttachedRolePoliciesError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists all managed policies that are attached to the specified IAM role.
 *
 * An IAM role can also have inline policies embedded with it. To list the inline
 * policies for a role, use ListRolePolicies.
 * For information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters. You can use the `PathPrefix` parameter to limit the list of
 * policies to only those matching the specified path prefix. If there are no policies
 * attached to the specified role (or none that match the specified path prefix), the
 * operation returns an empty list.
 */
export const listAttachedRolePolicies: API.PaginatedOperationMethod<
  ListAttachedRolePoliciesRequest,
  ListAttachedRolePoliciesResponse,
  ListAttachedRolePoliciesError,
  Credentials | HttpClient.HttpClient,
  AttachedPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: { AttachedPolicies: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedRolePolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListAttachedUserPoliciesError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists all managed policies that are attached to the specified IAM user.
 *
 * An IAM user can also have inline policies embedded with it. To list the inline
 * policies for a user, use ListUserPolicies.
 * For information about policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters. You can use the `PathPrefix` parameter to limit the list of
 * policies to only those matching the specified path prefix. If there are no policies
 * attached to the specified group (or none that match the specified path prefix), the
 * operation returns an empty list.
 */
export const listAttachedUserPolicies: API.PaginatedOperationMethod<
  ListAttachedUserPoliciesRequest,
  ListAttachedUserPoliciesResponse,
  ListAttachedUserPoliciesError,
  Credentials | HttpClient.HttpClient,
  AttachedPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: { AttachedPolicies: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedUserPolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDelegationRequestsError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists delegation requests based on the specified criteria.
 *
 * If a delegation request has no owner, even if it is assigned to a specific account, it will not be part of the
 * `ListDelegationRequests` output for that account.
 *
 * For more details, see
 *
 * Managing Permissions for Delegation Requests.
 */
export const listDelegationRequests: API.OperationMethod<
  ListDelegationRequestsRequest,
  ListDelegationRequestsResponse,
  ListDelegationRequestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OwnerId: 0, Marker: 0, MaxItems: 0 },
    output: {
      DelegationRequests: D.list(o_DelegationRequest),
      isTruncated: D.bool,
    },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDelegationRequests",
})) as any;

export type ListEntitiesForPolicyError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists all IAM users, groups, and roles that the specified managed policy is attached
 * to.
 *
 * You can use the optional `EntityFilter` parameter to limit the results to a
 * particular type of entity (users, groups, or roles). For example, to list only the roles
 * that are attached to the specified policy, set `EntityFilter` to
 * `Role`.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listEntitiesForPolicy: API.PaginatedOperationMethod<
  ListEntitiesForPolicyRequest,
  ListEntitiesForPolicyResponse,
  ListEntitiesForPolicyError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyArn: 0,
      EntityFilter: 0,
      PathPrefix: 0,
      PolicyUsageFilter: 0,
      Marker: 0,
      MaxItems: 0,
    },
    output: {
      PolicyGroups: D.list({}),
      PolicyUsers: D.list({}),
      PolicyRoles: D.list({}),
      IsTruncated: D.bool,
    },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitiesForPolicy",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListGroupPoliciesError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the names of the inline policies that are embedded in the specified IAM
 * group.
 *
 * An IAM group can also have managed policies attached to it. To list the managed
 * policies that are attached to a group, use ListAttachedGroupPolicies. For more information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters. If there are no inline policies embedded with the specified group, the
 * operation returns an empty list.
 */
export const listGroupPolicies: API.PaginatedOperationMethod<
  ListGroupPoliciesRequest,
  ListGroupPoliciesResponse,
  ListGroupPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicyNameType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { GroupName: 0, Marker: 0, MaxItems: 0 },
    output: { PolicyNames: D.list(), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupPolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListGroupsError = ServiceFailureException | CommonErrors;
/**
 * Lists the IAM groups that have the specified path prefix.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: { Groups: D.list(o_Group), IsTruncated: D.bool },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Groups",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListGroupsForUserError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the IAM groups that the specified IAM user belongs to.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listGroupsForUser: API.PaginatedOperationMethod<
  ListGroupsForUserRequest,
  ListGroupsForUserResponse,
  ListGroupsForUserError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: { Groups: D.list(o_Group), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupsForUser",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Groups",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListInstanceProfilesError = ServiceFailureException | CommonErrors;
/**
 * Lists the instance profiles that have the specified path prefix. If there are none,
 * the operation returns an empty list. For more information about instance profiles, see
 * Using
 * instance profiles in the *IAM User Guide*.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. For example, this operation does not return tags, even though they are an attribute of the returned object. To view all of the information for an instance profile, see
 * GetInstanceProfile.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listInstanceProfiles: API.PaginatedOperationMethod<
  ListInstanceProfilesRequest,
  ListInstanceProfilesResponse,
  ListInstanceProfilesError,
  Credentials | HttpClient.HttpClient,
  InstanceProfile
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: {
      InstanceProfiles: D.list(o_InstanceProfile),
      IsTruncated: D.bool,
    },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceProfiles",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InstanceProfiles",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListInstanceProfilesForRoleError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the instance profiles that have the specified associated IAM role. If there
 * are none, the operation returns an empty list. For more information about instance
 * profiles, go to Using
 * instance profiles in the *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listInstanceProfilesForRole: API.PaginatedOperationMethod<
  ListInstanceProfilesForRoleRequest,
  ListInstanceProfilesForRoleResponse,
  ListInstanceProfilesForRoleError,
  Credentials | HttpClient.HttpClient,
  InstanceProfile
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, Marker: 0, MaxItems: 0 },
    output: {
      InstanceProfiles: D.list(o_InstanceProfile),
      IsTruncated: D.bool,
    },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceProfilesForRole",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InstanceProfiles",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListInstanceProfileTagsError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified IAM instance profile. The returned list of tags is sorted by tag key.
 * For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listInstanceProfileTags: API.PaginatedOperationMethod<
  ListInstanceProfileTagsRequest,
  ListInstanceProfileTagsResponse,
  ListInstanceProfileTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceProfileName: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceProfileTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListMFADevicesError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the MFA devices for an IAM user. If the request includes a IAM user name,
 * then this operation lists all the MFA devices associated with the specified user. If you
 * do not specify a user name, IAM determines the user name implicitly based on the Amazon Web Services
 * access key ID signing the request for this operation.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listMFADevices: API.PaginatedOperationMethod<
  ListMFADevicesRequest,
  ListMFADevicesResponse,
  ListMFADevicesError,
  Credentials | HttpClient.HttpClient,
  MFADevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: { MFADevices: D.list({ EnableDate: D.ts }), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMFADevices",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MFADevices",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListMFADeviceTagsError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified IAM virtual multi-factor authentication (MFA) device. The returned list of tags is
 * sorted by tag key. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listMFADeviceTags: API.PaginatedOperationMethod<
  ListMFADeviceTagsRequest,
  ListMFADeviceTagsResponse,
  ListMFADeviceTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SerialNumber: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMFADeviceTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListOpenIDConnectProvidersError =
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists information about the IAM OpenID Connect (OIDC) provider resource objects
 * defined in the Amazon Web Services account.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. For example, this operation does not return tags, even though they are an attribute of the returned object. To view all of the information for an OIDC provider, see GetOpenIDConnectProvider.
 */
export const listOpenIDConnectProviders: API.OperationMethod<
  ListOpenIDConnectProvidersRequest,
  ListOpenIDConnectProvidersResponse,
  ListOpenIDConnectProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { OpenIDConnectProviderList: D.list({}) },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpenIDConnectProviders",
})) as any;

export type ListOpenIDConnectProviderTagsError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified OpenID Connect (OIDC)-compatible
 * identity provider. The returned list of tags is sorted by tag key. For more information, see About web identity
 * federation.
 *
 * For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listOpenIDConnectProviderTags: API.PaginatedOperationMethod<
  ListOpenIDConnectProviderTagsRequest,
  ListOpenIDConnectProviderTagsResponse,
  ListOpenIDConnectProviderTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpenIDConnectProviderTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListOrganizationsFeaturesError =
  | AccountNotManagementOrDelegatedAdministratorException
  | OrganizationNotFoundException
  | OrganizationNotInAllFeaturesModeException
  | ServiceAccessNotEnabledException
  | CommonErrors;
/**
 * Lists the centralized root access features enabled for your organization. For more
 * information, see Centrally manage root access for member accounts.
 */
export const listOrganizationsFeatures: API.OperationMethod<
  ListOrganizationsFeaturesRequest,
  ListOrganizationsFeaturesResponse,
  ListOrganizationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { EnabledFeatures: D.list() },
  },
  errors: [
    AccountNotManagementOrDelegatedAdministratorException,
    OrganizationNotFoundException,
    OrganizationNotInAllFeaturesModeException,
    ServiceAccessNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationsFeatures",
})) as any;

export type ListPoliciesError = ServiceFailureException | CommonErrors;
/**
 * Lists all the managed policies that are available in your Amazon Web Services account, including
 * your own customer-defined managed policies and all Amazon Web Services managed policies.
 *
 * You can filter the list of policies that is returned using the optional
 * `OnlyAttached`, `Scope`, and `PathPrefix`
 * parameters. For example, to list only the customer managed policies in your Amazon Web Services
 * account, set `Scope` to `Local`. To list only Amazon Web Services managed
 * policies, set `Scope` to `AWS`.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 *
 * For more information about managed policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. For example, this operation does not return tags, even though they are an attribute of the returned object. To view all of the information for a customer manged policy, see
 * GetPolicy.
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
    input: {
      Scope: 0,
      OnlyAttached: 0,
      PathPrefix: 0,
      PolicyUsageFilter: 0,
      Marker: 0,
      MaxItems: 0,
    },
    output: { Policies: D.list(o_Policy), IsTruncated: D.bool },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Policies",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListPoliciesGrantingServiceAccessError =
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Retrieves a list of policies that the IAM identity (user, group, or role) can use to
 * access each specified service.
 *
 * This operation does not use other policy types when determining whether a resource
 * could access a service. These other policy types include resource-based policies,
 * access control lists, Organizations policies, IAM permissions boundaries, and STS
 * assume role policies. It only applies permissions policy logic. For more about the
 * evaluation of policy types, see Evaluating policies in the
 * *IAM User Guide*.
 *
 * The list of policies returned by the operation depends on the ARN of the identity that
 * you provide.
 *
 * - **User** – The list of policies includes
 * the managed and inline policies that are attached to the user directly. The list
 * also includes any additional managed and inline policies that are attached to
 * the group to which the user belongs.
 *
 * - **Group** – The list of policies includes
 * only the managed and inline policies that are attached to the group directly.
 * Policies that are attached to the group’s user are not included.
 *
 * - **Role** – The list of policies includes
 * only the managed and inline policies that are attached to the role.
 *
 * For each managed policy, this operation returns the ARN and policy name. For each
 * inline policy, it returns the policy name and the entity to which it is attached. Inline
 * policies do not have an ARN. For more information about these policy types, see Managed policies and inline policies in the
 * *IAM User Guide*.
 *
 * Policies that are attached to users and roles as permissions boundaries are not
 * returned. To view which managed policy is currently used to set the permissions boundary
 * for a user or role, use the GetUser or GetRole
 * operations.
 */
export const listPoliciesGrantingServiceAccess: API.OperationMethod<
  ListPoliciesGrantingServiceAccessRequest,
  ListPoliciesGrantingServiceAccessResponse,
  ListPoliciesGrantingServiceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Marker: 0, Arn: 0, ServiceNamespaces: 0 },
    output: {
      PoliciesGrantingServiceAccess: D.list({ Policies: D.list({}) }),
      IsTruncated: D.bool,
    },
  },
  errors: [InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPoliciesGrantingServiceAccess",
})) as any;

export type ListPolicyTagsError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified IAM customer managed policy.
 * The returned list of tags is sorted by tag key. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listPolicyTags: API.PaginatedOperationMethod<
  ListPolicyTagsRequest,
  ListPolicyTagsResponse,
  ListPolicyTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PolicyArn: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListPolicyVersionsError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists information about the versions of the specified managed policy, including the
 * version that is currently set as the policy's default version.
 *
 * For more information about managed policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const listPolicyVersions: API.PaginatedOperationMethod<
  ListPolicyVersionsRequest,
  ListPolicyVersionsResponse,
  ListPolicyVersionsError,
  Credentials | HttpClient.HttpClient,
  PolicyVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PolicyArn: 0, Marker: 0, MaxItems: 0 },
    output: { Versions: D.list(o_PolicyVersion), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Versions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListRolePoliciesError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the names of the inline policies that are embedded in the specified IAM
 * role.
 *
 * An IAM role can also have managed policies attached to it. To list the managed
 * policies that are attached to a role, use ListAttachedRolePolicies. For more information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters. If there are no inline policies embedded with the specified role, the
 * operation returns an empty list.
 */
export const listRolePolicies: API.PaginatedOperationMethod<
  ListRolePoliciesRequest,
  ListRolePoliciesResponse,
  ListRolePoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicyNameType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, Marker: 0, MaxItems: 0 },
    output: { PolicyNames: D.list(), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRolePolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListRolesError = ServiceFailureException | CommonErrors;
/**
 * Lists the IAM roles that have the specified path prefix. If there are none, the
 * operation returns an empty list. For more information about roles, see IAM roles in the
 * *IAM User Guide*.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. This operation does not return the following attributes, even though they are an attribute of the returned object:
 *
 * - PermissionsBoundary
 *
 * - RoleLastUsed
 *
 * - Tags
 *
 * To view all of the information for a role, see GetRole.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listRoles: API.PaginatedOperationMethod<
  ListRolesRequest,
  ListRolesResponse,
  ListRolesError,
  Credentials | HttpClient.HttpClient,
  Role
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: { Roles: D.list(o_Role), IsTruncated: D.bool },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoles",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Roles",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListRoleTagsError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified role. The returned list of tags is
 * sorted by tag key. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listRoleTags: API.PaginatedOperationMethod<
  ListRoleTagsRequest,
  ListRoleTagsResponse,
  ListRoleTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoleTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListSAMLProvidersError = ServiceFailureException | CommonErrors;
/**
 * Lists the SAML provider resource objects defined in IAM in the account.
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. For example, this operation does not return tags, even though they are an attribute of the returned object. To view all of the information for a SAML provider, see GetSAMLProvider.
 *
 * This operation requires Signature Version 4.
 */
export const listSAMLProviders: API.OperationMethod<
  ListSAMLProvidersRequest,
  ListSAMLProvidersResponse,
  ListSAMLProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: {
      SAMLProviderList: D.list({ ValidUntil: D.ts, CreateDate: D.ts }),
    },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSAMLProviders",
})) as any;

export type ListSAMLProviderTagsError =
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified Security Assertion Markup Language
 * (SAML) identity provider. The returned list of tags is sorted by tag key. For more information, see About SAML 2.0-based
 * federation.
 *
 * For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listSAMLProviderTags: API.PaginatedOperationMethod<
  ListSAMLProviderTagsRequest,
  ListSAMLProviderTagsResponse,
  ListSAMLProviderTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SAMLProviderArn: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSAMLProviderTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListServerCertificatesError =
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the server certificates stored in IAM that have the specified path prefix. If
 * none exist, the operation returns an empty list.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 *
 * For more information about working with server certificates, see Working
 * with server certificates in the *IAM User Guide*. This
 * topic also includes a list of Amazon Web Services services that can use the server certificates that
 * you manage with IAM.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. For example, this operation does not return tags, even though they are an attribute of the returned object. To view all of the information for a servercertificate, see
 * GetServerCertificate.
 */
export const listServerCertificates: API.PaginatedOperationMethod<
  ListServerCertificatesRequest,
  ListServerCertificatesResponse,
  ListServerCertificatesError,
  Credentials | HttpClient.HttpClient,
  ServerCertificateMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: {
      ServerCertificateMetadataList: D.list(o_ServerCertificateMetadata),
      IsTruncated: D.bool,
    },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServerCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ServerCertificateMetadataList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListServerCertificateTagsError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified IAM server certificate. The
 * returned list of tags is sorted by tag key. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * For certificates in a Region supported by Certificate Manager (ACM), we
 * recommend that you don't use IAM server certificates. Instead, use ACM to provision,
 * manage, and deploy your server certificates. For more information about IAM server
 * certificates, Working with server
 * certificates in the *IAM User Guide*.
 */
export const listServerCertificateTags: API.PaginatedOperationMethod<
  ListServerCertificateTagsRequest,
  ListServerCertificateTagsResponse,
  ListServerCertificateTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ServerCertificateName: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServerCertificateTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListServiceSpecificCredentialsError =
  | NoSuchEntityException
  | ServiceNotSupportedException
  | RequestLimitExceeded
  | InvalidInput
  | CommonErrors;
/**
 * Returns information about the service-specific credentials associated with the
 * specified IAM user. If none exists, the operation returns an empty list. The
 * service-specific credentials returned by this operation are used only for authenticating
 * the IAM user to a specific service. For more information about using service-specific
 * credentials to authenticate to an Amazon Web Services service, refer to the following docs:
 *
 * - For service-specific credentials with CodeCommit, refer to IAM credentials for CodeCommit: Git credentials, SSH keys, and Amazon Web Services access
 * keys in the *IAM User Guide*.
 *
 * - For service-specific credentials with Amazon Keyspaces (for Apache Cassandra), refer to Use IAM with
 * Amazon Keyspaces (for Apache Cassandra) in the
 * *IAM User Guide*.
 *
 * - For services that support long-term API keys, refer to API
 * keys for Amazon Web Services services in the
 * *IAM User Guide*.
 */
export const listServiceSpecificCredentials: API.OperationMethod<
  ListServiceSpecificCredentialsRequest,
  ListServiceSpecificCredentialsResponse,
  ListServiceSpecificCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, ServiceName: 0, AllUsers: 0, Marker: 0, MaxItems: 0 },
    output: {
      ServiceSpecificCredentials: D.list({
        CreateDate: D.ts,
        ExpirationDate: D.ts,
      }),
      IsTruncated: D.bool,
    },
  },
  errors: [
    NoSuchEntityException,
    ServiceNotSupportedException,
    RequestLimitExceeded,
    InvalidInput,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceSpecificCredentials",
})) as any;

export type ListSigningCertificatesError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns information about the signing certificates associated with the specified IAM
 * user. If none exists, the operation returns an empty list.
 *
 * Although each user is limited to a small number of signing certificates, you can still
 * paginate the results using the `MaxItems` and `Marker`
 * parameters.
 *
 * If the `UserName` field is not specified, the user name is determined
 * implicitly based on the Amazon Web Services access key ID used to sign the request for this operation.
 * This operation works for access keys under the Amazon Web Services account. Consequently, you can use
 * this operation to manage Amazon Web Services account root user credentials even if the Amazon Web Services account has no
 * associated users.
 */
export const listSigningCertificates: API.PaginatedOperationMethod<
  ListSigningCertificatesRequest,
  ListSigningCertificatesResponse,
  ListSigningCertificatesError,
  Credentials | HttpClient.HttpClient,
  SigningCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: { Certificates: D.list(o_SigningCertificate), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Certificates",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListSSHPublicKeysError = NoSuchEntityException | CommonErrors;
/**
 * Returns information about the SSH public keys associated with the specified IAM
 * user. If none exists, the operation returns an empty list.
 *
 * The SSH public keys returned by this operation are used only for authenticating the
 * IAM user to an CodeCommit repository. For more information about using SSH keys to
 * authenticate to an CodeCommit repository, see Set up CodeCommit for
 * SSH connections in the *CodeCommit User Guide*.
 *
 * Although each user is limited to a small number of keys, you can still paginate the
 * results using the `MaxItems` and `Marker` parameters.
 */
export const listSSHPublicKeys: API.PaginatedOperationMethod<
  ListSSHPublicKeysRequest,
  ListSSHPublicKeysResponse,
  ListSSHPublicKeysError,
  Credentials | HttpClient.HttpClient,
  SSHPublicKeyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: {
      SSHPublicKeys: D.list({ UploadDate: D.ts }),
      IsTruncated: D.bool,
    },
  },
  errors: [NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSSHPublicKeys",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SSHPublicKeys",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListUserPoliciesError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the names of the inline policies embedded in the specified IAM user.
 *
 * An IAM user can also have managed policies attached to it. To list the managed
 * policies that are attached to a user, use ListAttachedUserPolicies. For more information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters. If there are no inline policies embedded with the specified user, the
 * operation returns an empty list.
 */
export const listUserPolicies: API.PaginatedOperationMethod<
  ListUserPoliciesRequest,
  ListUserPoliciesResponse,
  ListUserPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicyNameType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: { PolicyNames: D.list(), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPolicies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListUsersError = ServiceFailureException | CommonErrors;
/**
 * Lists the IAM users that have the specified path prefix. If no path prefix is
 * specified, the operation returns all users in the Amazon Web Services account. If there are none, the
 * operation returns an empty list.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. This operation does not return the following attributes, even though they are an attribute of the returned object:
 *
 * - PermissionsBoundary
 *
 * - Tags
 *
 * To view all of the information for a user, see GetUser.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PathPrefix: 0, Marker: 0, MaxItems: 0 },
    output: { Users: D.list(o_User), IsTruncated: D.bool },
  },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListUserTagsError =
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified IAM user. The returned list of tags is sorted by tag key. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const listUserTags: API.PaginatedOperationMethod<
  ListUserTagsRequest,
  ListUserTagsResponse,
  ListUserTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Marker: 0, MaxItems: 0 },
    output: { Tags: D.list({}), IsTruncated: D.bool },
  },
  errors: [NoSuchEntityException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListVirtualMFADevicesError = CommonErrors;
/**
 * Lists the virtual MFA devices defined in the Amazon Web Services account by assignment status. If
 * you do not specify an assignment status, the operation returns a list of all virtual MFA
 * devices. Assignment status can be `Assigned`, `Unassigned`, or
 * `Any`.
 *
 * IAM resource-listing operations return a subset of the available
 * attributes for the resource. For example, this operation does not return tags, even though they are an attribute of the returned object. To view tag information for a virtual MFA device, see ListMFADeviceTags.
 *
 * You can paginate the results using the `MaxItems` and `Marker`
 * parameters.
 */
export const listVirtualMFADevices: API.PaginatedOperationMethod<
  ListVirtualMFADevicesRequest,
  ListVirtualMFADevicesResponse,
  ListVirtualMFADevicesError,
  Credentials | HttpClient.HttpClient,
  VirtualMFADevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AssignmentStatus: 0, Marker: 0, MaxItems: 0 },
    output: {
      VirtualMFADevices: D.list(o_VirtualMFADevice),
      IsTruncated: D.bool,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualMFADevices",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "VirtualMFADevices",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type PutAccountPropertiesError =
  | ConcurrentModificationException
  | InvalidInputException
  | ServiceFailureException
  | CommonErrors;
/**
 * Sets account-level properties for the caller's Amazon Web Services account. Account properties are
 * configuration settings that control account-wide IAM features such as Role
 * Manager.
 *
 * Specify properties as key-value pairs in
 * `Namespace/PropertyName` format. All properties in a single request must
 * belong to the same namespace. Use GetAccountProperties to view the current properties.
 */
export const putAccountProperties: API.OperationMethod<
  PutAccountPropertiesRequest,
  PutAccountPropertiesResponse,
  PutAccountPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Properties: D.map() } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountProperties",
})) as any;

export type PutGroupPolicyError =
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds or updates an inline policy document that is embedded in the specified IAM
 * group.
 *
 * A user can also have managed policies attached to it. To attach a managed policy to a
 * group, use
 * `AttachGroupPolicy`
 * . To create a new managed policy, use
 *
 * `CreatePolicy`
 * . For information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * For information about the maximum number of inline policies that you can embed in a
 * group, see IAM and STS quotas in the *IAM User Guide*.
 *
 * Because policy documents can be large, you should use POST rather than GET when
 * calling `PutGroupPolicy`. For general information about using the Query
 * API with IAM, see Making query requests in the
 * *IAM User Guide*.
 */
export const putGroupPolicy: API.OperationMethod<
  PutGroupPolicyRequest,
  PutGroupPolicyResponse,
  PutGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GroupName: 0, PolicyName: 0, PolicyDocument: 0 },
  },
  errors: [
    LimitExceededException,
    MalformedPolicyDocumentException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGroupPolicy",
})) as any;

export type PutRolePermissionsBoundaryError =
  | InvalidInputException
  | NoSuchEntityException
  | PolicyNotAttachableException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Adds or updates the policy that is specified as the IAM role's permissions boundary.
 * You can use an Amazon Web Services managed policy or a customer managed policy to set the boundary for
 * a role. Use the boundary to control the maximum permissions that the role can have.
 * Setting a permissions boundary is an advanced feature that can affect the permissions
 * for the role.
 *
 * You cannot set the boundary for a service-linked role.
 *
 * Policies used as permissions boundaries do not provide permissions. You must also
 * attach a permissions policy to the role. To learn how the effective permissions for
 * a role are evaluated, see IAM JSON policy
 * evaluation logic in the IAM User Guide.
 */
export const putRolePermissionsBoundary: API.OperationMethod<
  PutRolePermissionsBoundaryRequest,
  PutRolePermissionsBoundaryResponse,
  PutRolePermissionsBoundaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, PermissionsBoundary: 0 } },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    PolicyNotAttachableException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRolePermissionsBoundary",
})) as any;

export type PutRolePolicyError =
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Adds or updates an inline policy document that is embedded in the specified IAM
 * role.
 *
 * When you embed an inline policy in a role, the inline policy is used as part of the
 * role's access (permissions) policy. The role's trust policy is created at the same time
 * as the role, using
 * `CreateRole`
 * .
 * You can update a role's trust policy using
 * `UpdateAssumeRolePolicy`
 * . For more information about roles,
 * see IAM
 * roles in the *IAM User Guide*.
 *
 * A role can also have a managed policy attached to it. To attach a managed policy to a
 * role, use
 * `AttachRolePolicy`
 * . To create a new managed policy, use
 *
 * `CreatePolicy`
 * . For information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * For information about the maximum number of inline policies that you can embed with a
 * role, see IAM and STS quotas in the *IAM User Guide*.
 *
 * Because policy documents can be large, you should use POST rather than GET when
 * calling `PutRolePolicy`. For general information about using the Query
 * API with IAM, see Making query requests in the
 * *IAM User Guide*.
 */
export const putRolePolicy: API.OperationMethod<
  PutRolePolicyRequest,
  PutRolePolicyResponse,
  PutRolePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, PolicyName: 0, PolicyDocument: 0 },
  },
  errors: [
    LimitExceededException,
    MalformedPolicyDocumentException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRolePolicy",
})) as any;

export type PutUserPermissionsBoundaryError =
  | InvalidInputException
  | NoSuchEntityException
  | PolicyNotAttachableException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds or updates the policy that is specified as the IAM user's permissions
 * boundary. You can use an Amazon Web Services managed policy or a customer managed policy to set the
 * boundary for a user. Use the boundary to control the maximum permissions that the user
 * can have. Setting a permissions boundary is an advanced feature that can affect the
 * permissions for the user.
 *
 * Policies that are used as permissions boundaries do not provide permissions. You
 * must also attach a permissions policy to the user. To learn how the effective
 * permissions for a user are evaluated, see IAM JSON policy
 * evaluation logic in the IAM User Guide.
 */
export const putUserPermissionsBoundary: API.OperationMethod<
  PutUserPermissionsBoundaryRequest,
  PutUserPermissionsBoundaryResponse,
  PutUserPermissionsBoundaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, PermissionsBoundary: 0 } },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    PolicyNotAttachableException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUserPermissionsBoundary",
})) as any;

export type PutUserPolicyError =
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds or updates an inline policy document that is embedded in the specified IAM
 * user.
 *
 * An IAM user can also have a managed policy attached to it. To attach a managed
 * policy to a user, use
 * `AttachUserPolicy`
 * . To create a new managed policy, use
 *
 * `CreatePolicy`
 * . For information about policies, see Managed
 * policies and inline policies in the
 * *IAM User Guide*.
 *
 * For information about the maximum number of inline policies that you can embed in a
 * user, see IAM and STS quotas in the *IAM User Guide*.
 *
 * Because policy documents can be large, you should use POST rather than GET when
 * calling `PutUserPolicy`. For general information about using the Query
 * API with IAM, see Making query requests in the
 * *IAM User Guide*.
 */
export const putUserPolicy: API.OperationMethod<
  PutUserPolicyRequest,
  PutUserPolicyResponse,
  PutUserPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, PolicyName: 0, PolicyDocument: 0 },
  },
  errors: [
    LimitExceededException,
    MalformedPolicyDocumentException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUserPolicy",
})) as any;

export type RejectDelegationRequestError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Rejects a delegation request, denying the requested temporary access.
 *
 * Once a request is rejected, it cannot be accepted or updated later. Rejected requests expire after 7 days.
 *
 * When rejecting a request, an optional explanation can be added using the `Notes` request parameter.
 *
 * For more details, see
 *
 * Managing Permissions for Delegation Requests.
 */
export const rejectDelegationRequest: API.OperationMethod<
  RejectDelegationRequestRequest,
  RejectDelegationRequestResponse,
  RejectDelegationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DelegationRequestId: 0, Notes: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDelegationRequest",
})) as any;

export type RemoveClientIDFromOpenIDConnectProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified client ID (also known as audience) from the list of client IDs
 * registered for the specified IAM OpenID Connect (OIDC) provider resource
 * object.
 *
 * This operation is idempotent; it does not fail or return an error if you try to remove
 * a client ID that does not exist.
 */
export const removeClientIDFromOpenIDConnectProvider: API.OperationMethod<
  RemoveClientIDFromOpenIDConnectProviderRequest,
  RemoveClientIDFromOpenIDConnectProviderResponse,
  RemoveClientIDFromOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0, ClientID: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveClientIDFromOpenIDConnectProvider",
})) as any;

export type RemoveRoleFromInstanceProfileError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Removes the specified IAM role from the specified Amazon EC2 instance profile.
 *
 * Make sure that you do not have any Amazon EC2 instances running with the role you are
 * about to remove from the instance profile. Removing a role from an instance profile
 * that is associated with a running instance might break any applications running on
 * the instance.
 *
 * For more information about roles, see IAM roles in the
 * *IAM User Guide*. For more information about instance profiles,
 * see Using
 * instance profiles in the *IAM User Guide*.
 */
export const removeRoleFromInstanceProfile: API.OperationMethod<
  RemoveRoleFromInstanceProfileRequest,
  RemoveRoleFromInstanceProfileResponse,
  RemoveRoleFromInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceProfileName: 0, RoleName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRoleFromInstanceProfile",
})) as any;

export type RemoveUserFromGroupError =
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified user from the specified group.
 */
export const removeUserFromGroup: API.OperationMethod<
  RemoveUserFromGroupRequest,
  RemoveUserFromGroupResponse,
  RemoveUserFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, UserName: 0 } },
  errors: [
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveUserFromGroup",
})) as any;

export type ResetServiceSpecificCredentialError =
  | NoSuchEntityException
  | CommonErrors;
/**
 * Resets the password for a service-specific credential. The new password is Amazon Web Services
 * generated and cryptographically strong. It cannot be configured by the user. Resetting
 * the password immediately invalidates the previous password associated with this
 * user.
 */
export const resetServiceSpecificCredential: API.OperationMethod<
  ResetServiceSpecificCredentialRequest,
  ResetServiceSpecificCredentialResponse,
  ResetServiceSpecificCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, ServiceSpecificCredentialId: 0 },
    output: { ServiceSpecificCredential: o_ServiceSpecificCredential },
  },
  errors: [NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetServiceSpecificCredential",
})) as any;

export type ResyncMFADeviceError =
  | ConcurrentModificationException
  | InvalidAuthenticationCodeException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Synchronizes the specified MFA device with its IAM resource object on the Amazon Web Services
 * servers.
 *
 * For more information about creating and working with virtual MFA devices, see Using a virtual MFA
 * device in the *IAM User Guide*.
 */
export const resyncMFADevice: API.OperationMethod<
  ResyncMFADeviceRequest,
  ResyncMFADeviceResponse,
  ResyncMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserName: 0,
      SerialNumber: 0,
      AuthenticationCode1: 0,
      AuthenticationCode2: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAuthenticationCodeException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResyncMFADevice",
})) as any;

export type SendDelegationTokenError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Sends the exchange token for an accepted delegation request.
 *
 * The exchange token is sent to the partner via an asynchronous notification channel, established by the partner.
 *
 * The delegation request must be in the `ACCEPTED` state when calling this API. After the
 * `SendDelegationToken` API
 * call is successful, the request transitions to a `FINALIZED` state and cannot be rolled back. However, a user may reject
 * an accepted request before the `SendDelegationToken` API is called.
 *
 * For more details, see
 *
 * Managing Permissions for Delegation Requests.
 */
export const sendDelegationToken: API.OperationMethod<
  SendDelegationTokenRequest,
  SendDelegationTokenResponse,
  SendDelegationTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DelegationRequestId: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDelegationToken",
})) as any;

export type SetDefaultPolicyVersionError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Sets the specified version of the specified policy as the policy's default (operative)
 * version.
 *
 * This operation affects all users, groups, and roles that the policy is attached to. To
 * list the users, groups, and roles that the policy is attached to, use ListEntitiesForPolicy.
 *
 * For information about managed policies, see Managed policies and inline
 * policies in the *IAM User Guide*.
 */
export const setDefaultPolicyVersion: API.OperationMethod<
  SetDefaultPolicyVersionRequest,
  SetDefaultPolicyVersionResponse,
  SetDefaultPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PolicyArn: 0, VersionId: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultPolicyVersion",
})) as any;

export type SetSecurityTokenServicePreferencesError =
  | ServiceFailureException
  | CommonErrors;
/**
 * Sets the specified version of the global endpoint token as the token version used for
 * the Amazon Web Services account.
 *
 * By default, Security Token Service (STS) is available as a global service, and all STS requests
 * go to a single endpoint at `https://sts.amazonaws.com`. Amazon Web Services recommends
 * using Regional STS endpoints to reduce latency, build in redundancy, and increase
 * session token availability. For information about Regional endpoints for STS, see
 * Security Token Service
 * endpoints and quotas in the *Amazon Web Services General Reference*.
 *
 * If you make an STS call to the global endpoint, the resulting session tokens might
 * be valid in some Regions but not others. It depends on the version that is set in this
 * operation. Version 1 tokens are valid only in Amazon Web Services Regions that are
 * available by default. These tokens do not work in manually enabled Regions, such as Asia
 * Pacific (Hong Kong). Version 2 tokens are valid in all Regions. However, version 2
 * tokens are longer and might affect systems where you temporarily store tokens. For
 * information, see Activating and
 * deactivating STS in an Amazon Web Services Region in the
 * *IAM User Guide*.
 *
 * To view the current session token version, see the
 * `GlobalEndpointTokenVersion` entry in the response of the GetAccountSummary operation.
 */
export const setSecurityTokenServicePreferences: API.OperationMethod<
  SetSecurityTokenServicePreferencesRequest,
  SetSecurityTokenServicePreferencesResponse,
  SetSecurityTokenServicePreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GlobalEndpointTokenVersion: 0 } },
  errors: [ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSecurityTokenServicePreferences",
})) as any;

export type SimulateCustomPolicyError =
  | InvalidInputException
  | PolicyEvaluationException
  | CommonErrors;
/**
 * Simulate how a set of IAM policies and optionally a resource-based policy works with
 * a list of API operations and Amazon Web Services resources to determine the policies' effective
 * permissions. The policies are provided as strings.
 *
 * The simulation does not perform the API operations; it only checks the authorization
 * to determine if the simulated policies allow or deny the operations. You can simulate
 * resources that don't exist in your account.
 *
 * If you want to simulate existing policies that are attached to an IAM user, group,
 * or role, use SimulatePrincipalPolicy instead.
 *
 * Context keys are variables that are maintained by Amazon Web Services and its services and which
 * provide details about the context of an API query request. You can use the
 * `Condition` element of an IAM policy to evaluate context keys. To get
 * the list of context keys that the policies require for correct simulation, use GetContextKeysForCustomPolicy.
 *
 * If the output is long, you can use `MaxItems` and `Marker`
 * parameters to paginate the results.
 *
 * The IAM policy simulator evaluates statements in identity-based policies,
 * service control policies (SCPs) including their condition keys and resource
 * scoping, and the inputs that you provide during simulation. The policy
 * simulator results can differ from your live Amazon Web Services environment. We recommend that you check your policies
 * against your live Amazon Web Services environment after testing using the policy simulator to
 * confirm that you have the desired results. For more information about using the
 * policy simulator, see Testing IAM
 * policies with the IAM policy simulator in the
 * *IAM User Guide*.
 */
export const simulateCustomPolicy: API.PaginatedOperationMethod<
  SimulateCustomPolicyRequest,
  SimulatePolicyResponse,
  SimulateCustomPolicyError,
  Credentials | HttpClient.HttpClient,
  EvaluationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyInputList: 0,
      PermissionsBoundaryPolicyInputList: 0,
      OrderedOrganizationPolicyInputList: D.list({
        ServiceControlPolicyInputList: 0,
      }),
      ActionNames: 0,
      ResourceArns: 0,
      ResourcePolicy: 0,
      ResourceOwner: 0,
      CallerArn: 0,
      ContextEntries: D.list(i_ContextEntry),
      ResourceHandlingOption: 0,
      MaxItems: 0,
      Marker: 0,
    },
    output: {
      EvaluationResults: D.list(o_EvaluationResult),
      IsTruncated: D.bool,
    },
  },
  errors: [InvalidInputException, PolicyEvaluationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SimulateCustomPolicy",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EvaluationResults",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type SimulatePrincipalPolicyError =
  | InvalidInputException
  | NoSuchEntityException
  | PolicyEvaluationException
  | CommonErrors;
/**
 * Simulate how a set of IAM policies attached to an IAM entity works with a list of
 * API operations and Amazon Web Services resources to determine the policies' effective permissions. The
 * entity can be an IAM user, group, or role. If you specify a user, then the simulation
 * also includes all of the policies that are attached to groups that the user belongs to.
 * You can simulate resources that don't exist in your account.
 *
 * You can optionally include a list of one or more additional policies specified as
 * strings to include in the simulation. If you want to simulate only policies specified as
 * strings, use SimulateCustomPolicy instead.
 *
 * You can also optionally include one resource-based policy to be evaluated with each of
 * the resources included in the simulation for IAM users only.
 *
 * The simulation does not perform the API operations; it only checks the authorization
 * to determine if the simulated policies allow or deny the operations.
 *
 * For cross-account simulations, `EvalDecisionDetails` returns the decision
 * for each policy type (identity-based policy, resource-based policy, and permissions
 * boundary). This helps you identify which policy type is responsible for an allow or
 * deny decision when policies span multiple accounts.
 *
 * **Note:** This operation discloses information about the
 * permissions granted to other users. If you do not want users to see other user's
 * permissions, then consider allowing them to use SimulateCustomPolicy instead.
 *
 * Context keys are variables maintained by Amazon Web Services and its services that provide details
 * about the context of an API query request. You can use the `Condition`
 * element of an IAM policy to evaluate context keys. To get the list of context keys
 * that the policies require for correct simulation, use GetContextKeysForPrincipalPolicy.
 *
 * If the output is long, you can use the `MaxItems` and `Marker`
 * parameters to paginate the results.
 *
 * The IAM policy simulator evaluates statements in identity-based policies,
 * service control policies (SCPs) including their condition keys and resource
 * scoping, and the inputs that you provide during simulation. The policy
 * simulator results can differ from your live Amazon Web Services environment. We recommend that you check your policies
 * against your live Amazon Web Services environment after testing using the policy simulator to
 * confirm that you have the desired results. For more information about using the
 * policy simulator, see Testing IAM
 * policies with the IAM policy simulator in the
 * *IAM User Guide*.
 */
export const simulatePrincipalPolicy: API.PaginatedOperationMethod<
  SimulatePrincipalPolicyRequest,
  SimulatePolicyResponse,
  SimulatePrincipalPolicyError,
  Credentials | HttpClient.HttpClient,
  EvaluationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicySourceArn: 0,
      PolicyInputList: 0,
      PermissionsBoundaryPolicyInputList: 0,
      PolicyExclusionList: D.list({
        PolicyType: 0,
        PolicyArn: 0,
        InlinePolicyIdentifier: {
          PolicyName: 0,
          AttachmentType: 0,
          AttachmentName: 0,
        },
      }),
      ActionNames: 0,
      ResourceArns: 0,
      ResourcePolicy: 0,
      ResourceOwner: 0,
      CallerArn: 0,
      ContextEntries: D.list(i_ContextEntry),
      ResourceHandlingOption: 0,
      MaxItems: 0,
      Marker: 0,
    },
    output: {
      EvaluationResults: D.list(o_EvaluationResult),
      IsTruncated: D.bool,
    },
  },
  errors: [
    InvalidInputException,
    NoSuchEntityException,
    PolicyEvaluationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SimulatePrincipalPolicy",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EvaluationResults",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type TagInstanceProfileError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an IAM instance profile. If a tag with the same key name
 * already exists, then that tag is overwritten with the new value.
 *
 * Each tag consists of a key name and an associated value. By assigning tags to your resources, you can do the
 * following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM user-based
 * and resource-based policies. You can use tags to restrict access to only an IAM instance
 * profile that has a specified tag attached. For examples of policies that show how to use
 * tags to control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 */
export const tagInstanceProfile: API.OperationMethod<
  TagInstanceProfileRequest,
  TagInstanceProfileResponse,
  TagInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceProfileName: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagInstanceProfile",
})) as any;

export type TagMFADeviceError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an IAM virtual multi-factor authentication (MFA) device. If
 * a tag with the same key name already exists, then that tag is overwritten with the new
 * value.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM user-based
 * and resource-based policies. You can use tags to restrict access to only an IAM virtual
 * MFA device that has a specified tag attached. For examples of policies that show how to
 * use tags to control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 */
export const tagMFADevice: API.OperationMethod<
  TagMFADeviceRequest,
  TagMFADeviceResponse,
  TagMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SerialNumber: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagMFADevice",
})) as any;

export type TagOpenIDConnectProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an OpenID Connect (OIDC)-compatible identity provider. For
 * more information about these providers, see About web identity federation. If
 * a tag with the same key name already exists, then that tag is overwritten with the new
 * value.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM identity-based
 * and resource-based policies. You can use tags to restrict access to only an OIDC provider
 * that has a specified tag attached. For examples of policies that show how to use tags to
 * control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 */
export const tagOpenIDConnectProvider: API.OperationMethod<
  TagOpenIDConnectProviderRequest,
  TagOpenIDConnectProviderResponse,
  TagOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagOpenIDConnectProvider",
})) as any;

export type TagPolicyError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an IAM customer managed policy. If a tag with the same key
 * name already exists, then that tag is overwritten with the new value.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM user-based
 * and resource-based policies. You can use tags to restrict access to only an IAM customer
 * managed policy that has a specified tag attached. For examples of policies that show how
 * to use tags to control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 */
export const tagPolicy: API.OperationMethod<
  TagPolicyRequest,
  TagPolicyResponse,
  TagPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PolicyArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagPolicy",
})) as any;

export type TagRoleError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an IAM role. The role can be a regular role or a
 * service-linked role. If a tag with the same key name already exists, then that tag is
 * overwritten with the new value.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM user-based
 * and resource-based policies. You can use tags to restrict access to only an IAM role
 * that has a specified tag attached. You can also restrict access to only those resources
 * that have a certain tag attached. For examples of policies that show how to use tags to
 * control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - **Cost allocation** - Use tags to help track which
 * individuals and teams are using which Amazon Web Services resources.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 *
 * For more information about tagging, see Tagging IAM identities in the
 * *IAM User Guide*.
 */
export const tagRole: API.OperationMethod<
  TagRoleRequest,
  TagRoleResponse,
  TagRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagRole",
})) as any;

export type TagSAMLProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to a Security Assertion Markup Language (SAML) identity provider.
 * For more information about these providers, see About SAML 2.0-based federation .
 * If a tag with the same key name already exists, then that tag is overwritten with the new
 * value.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM user-based
 * and resource-based policies. You can use tags to restrict access to only a SAML identity
 * provider that has a specified tag attached. For examples of policies that show how to use
 * tags to control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 */
export const tagSAMLProvider: API.OperationMethod<
  TagSAMLProviderRequest,
  TagSAMLProviderResponse,
  TagSAMLProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SAMLProviderArn: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagSAMLProvider",
})) as any;

export type TagServerCertificateError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an IAM server certificate. If a tag with the same key name
 * already exists, then that tag is overwritten with the new value.
 *
 * For certificates in a Region supported by Certificate Manager (ACM), we
 * recommend that you don't use IAM server certificates. Instead, use ACM to provision,
 * manage, and deploy your server certificates. For more information about IAM server
 * certificates, Working with server
 * certificates in the *IAM User Guide*.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM user-based
 * and resource-based policies. You can use tags to restrict access to only a server
 * certificate that has a specified tag attached. For examples of policies that show how to
 * use tags to control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - **Cost allocation** - Use tags to help track which
 * individuals and teams are using which Amazon Web Services resources.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 */
export const tagServerCertificate: API.OperationMethod<
  TagServerCertificateRequest,
  TagServerCertificateResponse,
  TagServerCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServerCertificateName: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagServerCertificate",
})) as any;

export type TagUserError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Adds one or more tags to an IAM user. If a tag with the same key name already exists,
 * then that tag is overwritten with the new value.
 *
 * A tag consists of a key name and an associated value. By assigning tags to your
 * resources, you can do the following:
 *
 * - **Administrative grouping and discovery** - Attach
 * tags to resources to aid in organization and search. For example, you could search for all
 * resources with the key name *Project* and the value
 * *MyImportantProject*. Or search for all resources with the key name
 * *Cost Center* and the value *41200*.
 *
 * - **Access control** - Include tags in IAM identity-based
 * and resource-based policies. You can use tags to restrict access to only an IAM
 * requesting user that has a specified tag attached. You can also restrict access to only
 * those resources that have a certain tag attached. For examples of policies that show how
 * to use tags to control access, see Control access using IAM tags in the
 * *IAM User Guide*.
 *
 * - **Cost allocation** - Use tags to help track which
 * individuals and teams are using which Amazon Web Services resources.
 *
 * - If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request
 * fails and the resource is not created. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * - Amazon Web Services always interprets the tag `Value` as a single string. If you
 * need to store an array, you can store comma-separated values in the string. However, you
 * must interpret the value in your code.
 *
 * For more information about tagging, see Tagging IAM identities in the
 * *IAM User Guide*.
 */
export const tagUser: API.OperationMethod<
  TagUserRequest,
  TagUserResponse,
  TagUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagUser",
})) as any;

export type UntagInstanceProfileError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the IAM instance profile. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagInstanceProfile: API.OperationMethod<
  UntagInstanceProfileRequest,
  UntagInstanceProfileResponse,
  UntagInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceProfileName: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagInstanceProfile",
})) as any;

export type UntagMFADeviceError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the IAM virtual multi-factor authentication (MFA)
 * device. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagMFADevice: API.OperationMethod<
  UntagMFADeviceRequest,
  UntagMFADeviceResponse,
  UntagMFADeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SerialNumber: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagMFADevice",
})) as any;

export type UntagOpenIDConnectProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the specified OpenID Connect (OIDC)-compatible identity
 * provider in IAM. For more information about OIDC providers, see About web identity federation.
 * For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagOpenIDConnectProvider: API.OperationMethod<
  UntagOpenIDConnectProviderRequest,
  UntagOpenIDConnectProviderResponse,
  UntagOpenIDConnectProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0, TagKeys: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagOpenIDConnectProvider",
})) as any;

export type UntagPolicyError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the customer managed policy. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagPolicy: API.OperationMethod<
  UntagPolicyRequest,
  UntagPolicyResponse,
  UntagPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PolicyArn: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagPolicy",
})) as any;

export type UntagRoleError =
  | ConcurrentModificationException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the role. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagRole: API.OperationMethod<
  UntagRoleRequest,
  UntagRoleResponse,
  UntagRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagRole",
})) as any;

export type UntagSAMLProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Security Assertion Markup Language (SAML)
 * identity provider in IAM. For more information about these providers, see About web identity
 * federation. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagSAMLProvider: API.OperationMethod<
  UntagSAMLProviderRequest,
  UntagSAMLProviderResponse,
  UntagSAMLProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SAMLProviderArn: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagSAMLProvider",
})) as any;

export type UntagServerCertificateError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the IAM server certificate.
 * For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 *
 * For certificates in a Region supported by Certificate Manager (ACM), we
 * recommend that you don't use IAM server certificates. Instead, use ACM to provision,
 * manage, and deploy your server certificates. For more information about IAM server
 * certificates, Working with server
 * certificates in the *IAM User Guide*.
 */
export const untagServerCertificate: API.OperationMethod<
  UntagServerCertificateRequest,
  UntagServerCertificateResponse,
  UntagServerCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServerCertificateName: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagServerCertificate",
})) as any;

export type UntagUserError =
  | ConcurrentModificationException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Removes the specified tags from the user. For more information about tagging, see Tagging IAM resources in the
 * *IAM User Guide*.
 */
export const untagUser: API.OperationMethod<
  UntagUserRequest,
  UntagUserResponse,
  UntagUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagUser",
})) as any;

export type UpdateAccessKeyError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Changes the status of the specified access key from Active to Inactive, or vice versa.
 * This operation can be used to disable a user's key as part of a key rotation
 * workflow.
 *
 * If the `UserName` is not specified, the user name is determined implicitly
 * based on the Amazon Web Services access key ID used to sign the request. If a temporary access key is
 * used, then `UserName` is required. If a long-term key is assigned to the
 * user, then `UserName` is not required. This operation works for access keys
 * under the Amazon Web Services account. Consequently, you can use this operation to manage Amazon Web Services account root user
 * credentials even if the Amazon Web Services account has no associated users.
 *
 * For information about rotating keys, see Managing keys and certificates
 * in the *IAM User Guide*.
 */
export const updateAccessKey: API.OperationMethod<
  UpdateAccessKeyRequest,
  UpdateAccessKeyResponse,
  UpdateAccessKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, AccessKeyId: 0, Status: 0 },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessKey",
})) as any;

export type UpdateAccountPasswordPolicyError =
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Updates the password policy settings for the Amazon Web Services account.
 *
 * This operation does not support partial updates. No parameters are required, but
 * if you do not specify a parameter, that parameter's value reverts to its default
 * value. See the **Request Parameters** section for each
 * parameter's default value. Also note that some parameters do not allow the default
 * parameter to be explicitly set. Instead, to invoke the default value, do not include
 * that parameter when you invoke the operation.
 *
 * For more information about using a password policy, see Managing an IAM password
 * policy in the *IAM User Guide*.
 */
export const updateAccountPasswordPolicy: API.OperationMethod<
  UpdateAccountPasswordPolicyRequest,
  UpdateAccountPasswordPolicyResponse,
  UpdateAccountPasswordPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MinimumPasswordLength: 0,
      RequireSymbols: 0,
      RequireNumbers: 0,
      RequireUppercaseCharacters: 0,
      RequireLowercaseCharacters: 0,
      AllowUsersToChangePassword: 0,
      MaxPasswordAge: 0,
      PasswordReusePrevention: 0,
      HardExpiry: 0,
    },
  },
  errors: [
    LimitExceededException,
    MalformedPolicyDocumentException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountPasswordPolicy",
})) as any;

export type UpdateAssumeRolePolicyError =
  | LimitExceededException
  | MalformedPolicyDocumentException
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Updates the policy that grants an IAM entity permission to assume a role. This is
 * typically referred to as the "role trust policy". For more information about roles, see
 * Using roles to
 * delegate permissions and federate identities.
 */
export const updateAssumeRolePolicy: API.OperationMethod<
  UpdateAssumeRolePolicyRequest,
  UpdateAssumeRolePolicyResponse,
  UpdateAssumeRolePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RoleName: 0, PolicyDocument: 0 } },
  errors: [
    LimitExceededException,
    MalformedPolicyDocumentException,
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssumeRolePolicy",
})) as any;

export type UpdateDelegationRequestError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Updates an existing delegation request with additional information. When the delegation
 * request is updated, it reaches the `PENDING_APPROVAL` state.
 *
 * Once a delegation request has an owner, that owner gets a default permission to update the
 * delegation request. For more details, see
 *
 * Managing Permissions for Delegation Requests.
 */
export const updateDelegationRequest: API.OperationMethod<
  UpdateDelegationRequestRequest,
  UpdateDelegationRequestResponse,
  UpdateDelegationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DelegationRequestId: 0, Notes: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDelegationRequest",
})) as any;

export type UpdateGroupError =
  | EntityAlreadyExistsException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Updates the name and/or the path of the specified IAM group.
 *
 * You should understand the implications of changing a group's path or name. For
 * more information, see Renaming users and
 * groups in the *IAM User Guide*.
 *
 * The person making the request (the principal), must have permission to change the
 * role group with the old name and the new name. For example, to change the group
 * named `Managers` to `MGRs`, the principal must have a policy
 * that allows them to update both groups. If the principal has permission to update
 * the `Managers` group, but not the `MGRs` group, then the
 * update fails. For more information about permissions, see Access management.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GroupName: 0, NewPath: 0, NewGroupName: 0 },
  },
  errors: [
    EntityAlreadyExistsException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateLoginProfileError =
  | EntityTemporarilyUnmodifiableException
  | LimitExceededException
  | NoSuchEntityException
  | PasswordPolicyViolationException
  | ServiceFailureException
  | CommonErrors;
/**
 * Changes the password for the specified IAM user. You can use the CLI, the Amazon Web Services
 * API, or the **Users** page in the IAM console to change
 * the password for any IAM user. Use ChangePassword to
 * change your own password in the **My Security Credentials**
 * page in the Amazon Web Services Management Console.
 *
 * For more information about modifying passwords, see Managing passwords in the
 * *IAM User Guide*.
 */
export const updateLoginProfile: API.OperationMethod<
  UpdateLoginProfileRequest,
  UpdateLoginProfileResponse,
  UpdateLoginProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, Password: 0, PasswordResetRequired: 0 },
  },
  errors: [
    EntityTemporarilyUnmodifiableException,
    LimitExceededException,
    NoSuchEntityException,
    PasswordPolicyViolationException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoginProfile",
})) as any;

export type UpdateOpenIDConnectProviderThumbprintError =
  | ConcurrentModificationException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Replaces the existing list of server certificate thumbprints associated with an OpenID
 * Connect (OIDC) provider resource object with a new list of thumbprints.
 *
 * The list that you pass with this operation completely replaces the existing list of
 * thumbprints. (The lists are not merged.)
 *
 * Typically, you need to update a thumbprint only when the identity provider certificate
 * changes, which occurs rarely. However, if the provider's certificate
 * *does* change, any attempt to assume an IAM role that specifies
 * the OIDC provider as a principal fails until the certificate thumbprint is
 * updated.
 *
 * Amazon Web Services secures communication with OIDC identity providers (IdPs) using our library of
 * trusted root certificate authorities (CAs) to verify the JSON Web Key Set (JWKS)
 * endpoint's TLS certificate. If your OIDC IdP relies on a certificate that is not signed
 * by one of these trusted CAs, only then we secure communication using the thumbprints set
 * in the IdP's configuration.
 *
 * Trust for the OIDC provider is derived from the provider certificate and is
 * validated by the thumbprint. Therefore, it is best to limit access to the
 * `UpdateOpenIDConnectProviderThumbprint` operation to highly
 * privileged users.
 */
export const updateOpenIDConnectProviderThumbprint: API.OperationMethod<
  UpdateOpenIDConnectProviderThumbprintRequest,
  UpdateOpenIDConnectProviderThumbprintResponse,
  UpdateOpenIDConnectProviderThumbprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpenIDConnectProviderArn: 0, ThumbprintList: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOpenIDConnectProviderThumbprint",
})) as any;

export type UpdateRoleError =
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Updates the description or maximum session duration setting of a role.
 */
export const updateRole: API.OperationMethod<
  UpdateRoleRequest,
  UpdateRoleResponse,
  UpdateRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, Description: 0, MaxSessionDuration: 0 },
  },
  errors: [
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRole",
})) as any;

export type UpdateRoleDescriptionError =
  | NoSuchEntityException
  | ServiceFailureException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Use UpdateRole instead.
 *
 * Modifies only the description of a role. This operation performs the same function as
 * the `Description` parameter in the `UpdateRole` operation.
 */
export const updateRoleDescription: API.OperationMethod<
  UpdateRoleDescriptionRequest,
  UpdateRoleDescriptionResponse,
  UpdateRoleDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RoleName: 0, Description: 0 },
    output: { Role: o_Role },
  },
  errors: [
    NoSuchEntityException,
    ServiceFailureException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoleDescription",
})) as any;

export type UpdateSAMLProviderError =
  | ConcurrentModificationException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Updates the metadata document, SAML encryption settings, and private keys for an
 * existing SAML provider. To rotate private keys, add your new private key and then remove
 * the old key in a separate request.
 */
export const updateSAMLProvider: API.OperationMethod<
  UpdateSAMLProviderRequest,
  UpdateSAMLProviderResponse,
  UpdateSAMLProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SAMLMetadataDocument: 0,
      SAMLProviderArn: 0,
      AssertionEncryptionMode: 0,
      AddPrivateKey: 0,
      RemovePrivateKey: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSAMLProvider",
})) as any;

export type UpdateServerCertificateError =
  | EntityAlreadyExistsException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Updates the name and/or the path of the specified server certificate stored in
 * IAM.
 *
 * For more information about working with server certificates, see Working
 * with server certificates in the *IAM User Guide*. This
 * topic also includes a list of Amazon Web Services services that can use the server certificates that
 * you manage with IAM.
 *
 * You should understand the implications of changing a server certificate's path or
 * name. For more information, see Renaming a server certificate in the
 * *IAM User Guide*.
 *
 * The person making the request (the principal), must have permission to change the
 * server certificate with the old name and the new name. For example, to change the
 * certificate named `ProductionCert` to `ProdCert`, the
 * principal must have a policy that allows them to update both certificates. If the
 * principal has permission to update the `ProductionCert` group, but not
 * the `ProdCert` certificate, then the update fails. For more information
 * about permissions, see Access management in the *IAM User Guide*.
 */
export const updateServerCertificate: API.OperationMethod<
  UpdateServerCertificateRequest,
  UpdateServerCertificateResponse,
  UpdateServerCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServerCertificateName: 0,
      NewPath: 0,
      NewServerCertificateName: 0,
    },
  },
  errors: [
    EntityAlreadyExistsException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServerCertificate",
})) as any;

export type UpdateServiceSpecificCredentialError =
  | NoSuchEntityException
  | CommonErrors;
/**
 * Sets the status of a service-specific credential to `Active` or
 * `Inactive`. Service-specific credentials that are inactive cannot be used
 * for authentication to the service. This operation can be used to disable a user's
 * service-specific credential as part of a credential rotation work flow.
 */
export const updateServiceSpecificCredential: API.OperationMethod<
  UpdateServiceSpecificCredentialRequest,
  UpdateServiceSpecificCredentialResponse,
  UpdateServiceSpecificCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, ServiceSpecificCredentialId: 0, Status: 0 },
  },
  errors: [NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSpecificCredential",
})) as any;

export type UpdateSigningCertificateError =
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Changes the status of the specified user signing certificate from active to disabled,
 * or vice versa. This operation can be used to disable an IAM user's signing
 * certificate as part of a certificate rotation work flow.
 *
 * If the `UserName` field is not specified, the user name is determined
 * implicitly based on the Amazon Web Services access key ID used to sign the request. This operation
 * works for access keys under the Amazon Web Services account. Consequently, you can use this operation
 * to manage Amazon Web Services account root user credentials even if the Amazon Web Services account has no associated
 * users.
 */
export const updateSigningCertificate: API.OperationMethod<
  UpdateSigningCertificateRequest,
  UpdateSigningCertificateResponse,
  UpdateSigningCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, CertificateId: 0, Status: 0 },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSigningCertificate",
})) as any;

export type UpdateSSHPublicKeyError =
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Sets the status of an IAM user's SSH public key to active or inactive. SSH public
 * keys that are inactive cannot be used for authentication. This operation can be used to
 * disable a user's SSH public key as part of a key rotation work flow.
 *
 * The SSH public key affected by this operation is used only for authenticating the
 * associated IAM user to an CodeCommit repository. For more information about using SSH keys
 * to authenticate to an CodeCommit repository, see Set up CodeCommit for
 * SSH connections in the *CodeCommit User Guide*.
 */
export const updateSSHPublicKey: API.OperationMethod<
  UpdateSSHPublicKeyRequest,
  UpdateSSHPublicKeyResponse,
  UpdateSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, SSHPublicKeyId: 0, Status: 0 },
  },
  errors: [InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSSHPublicKey",
})) as any;

export type UpdateUserError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | EntityTemporarilyUnmodifiableException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Updates the name and/or the path of the specified IAM user.
 *
 * You should understand the implications of changing an IAM user's path or
 * name. For more information, see Renaming an IAM
 * user and Renaming an IAM
 * group in the *IAM User Guide*.
 *
 * To change a user name, the requester must have appropriate permissions on both
 * the source object and the target object. For example, to change Bob to Robert, the
 * entity making the request must have permission on Bob and Robert, or must have
 * permission on all (*). For more information about permissions, see Permissions and policies.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, NewPath: 0, NewUserName: 0 },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    EntityTemporarilyUnmodifiableException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

export type UploadServerCertificateError =
  | ConcurrentModificationException
  | EntityAlreadyExistsException
  | InvalidInputException
  | KeyPairMismatchException
  | LimitExceededException
  | MalformedCertificateException
  | ServiceFailureException
  | CommonErrors;
/**
 * Uploads a server certificate entity for the Amazon Web Services account. The server certificate
 * entity includes a public key certificate, a private key, and an optional certificate
 * chain, which should all be PEM-encoded.
 *
 * We recommend that you use Certificate Manager to
 * provision, manage, and deploy your server certificates. With ACM you can request a
 * certificate, deploy it to Amazon Web Services resources, and let ACM handle certificate renewals for
 * you. Certificates provided by ACM are free. For more information about using ACM,
 * see the Certificate Manager User
 * Guide.
 *
 * For more information about working with server certificates, see Working
 * with server certificates in the *IAM User Guide*. This
 * topic includes a list of Amazon Web Services services that can use the server certificates that you
 * manage with IAM.
 *
 * For information about the number of server certificates you can upload, see IAM and STS
 * quotas in the *IAM User Guide*.
 *
 * Because the body of the public key certificate, private key, and the certificate
 * chain can be large, you should use POST rather than GET when calling
 * `UploadServerCertificate`. For information about setting up
 * signatures and authorization through the API, see Signing Amazon Web Services API
 * requests in the *Amazon Web Services General Reference*. For general
 * information about using the Query API with IAM, see Calling the API by making HTTP query
 * requests in the *IAM User Guide*.
 */
export const uploadServerCertificate: API.OperationMethod<
  UploadServerCertificateRequest,
  UploadServerCertificateResponse,
  UploadServerCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Path: 0,
      ServerCertificateName: 0,
      CertificateBody: 0,
      PrivateKey: 0,
      CertificateChain: 0,
      Tags: D.list(i_Tag),
    },
    output: {
      ServerCertificateMetadata: o_ServerCertificateMetadata,
      Tags: D.list({}),
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityAlreadyExistsException,
    InvalidInputException,
    KeyPairMismatchException,
    LimitExceededException,
    MalformedCertificateException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadServerCertificate",
})) as any;

export type UploadSigningCertificateError =
  | ConcurrentModificationException
  | DuplicateCertificateException
  | EntityAlreadyExistsException
  | InvalidCertificateException
  | LimitExceededException
  | MalformedCertificateException
  | NoSuchEntityException
  | ServiceFailureException
  | CommonErrors;
/**
 * Uploads an X.509 signing certificate and associates it with the specified IAM user.
 * Some Amazon Web Services services require you to use certificates to validate requests that are signed
 * with a corresponding private key. When you upload the certificate, its default status is
 * `Active`.
 *
 * For information about when you would use an X.509 signing certificate, see Managing
 * server certificates in IAM in the
 * *IAM User Guide*.
 *
 * If the `UserName` is not specified, the IAM user name is determined
 * implicitly based on the Amazon Web Services access key ID used to sign the request. This operation
 * works for access keys under the Amazon Web Services account. Consequently, you can use this operation
 * to manage Amazon Web Services account root user credentials even if the Amazon Web Services account has no associated
 * users.
 *
 * Because the body of an X.509 certificate can be large, you should use POST rather
 * than GET when calling `UploadSigningCertificate`. For information about
 * setting up signatures and authorization through the API, see Signing
 * Amazon Web Services API requests in the *Amazon Web Services General Reference*. For
 * general information about using the Query API with IAM, see Making query
 * requests in the *IAM User Guide*.
 */
export const uploadSigningCertificate: API.OperationMethod<
  UploadSigningCertificateRequest,
  UploadSigningCertificateResponse,
  UploadSigningCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, CertificateBody: 0 },
    output: { Certificate: o_SigningCertificate },
  },
  errors: [
    ConcurrentModificationException,
    DuplicateCertificateException,
    EntityAlreadyExistsException,
    InvalidCertificateException,
    LimitExceededException,
    MalformedCertificateException,
    NoSuchEntityException,
    ServiceFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadSigningCertificate",
})) as any;

export type UploadSSHPublicKeyError =
  | DuplicateSSHPublicKeyException
  | InvalidPublicKeyException
  | LimitExceededException
  | NoSuchEntityException
  | UnrecognizedPublicKeyEncodingException
  | CommonErrors;
/**
 * Uploads an SSH public key and associates it with the specified IAM user.
 *
 * The SSH public key uploaded by this operation can be used only for authenticating the
 * associated IAM user to an CodeCommit repository. For more information about using SSH keys
 * to authenticate to an CodeCommit repository, see Set up CodeCommit for
 * SSH connections in the *CodeCommit User Guide*.
 */
export const uploadSSHPublicKey: API.OperationMethod<
  UploadSSHPublicKeyRequest,
  UploadSSHPublicKeyResponse,
  UploadSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserName: 0, SSHPublicKeyBody: 0 },
    output: { SSHPublicKey: o_SSHPublicKey },
  },
  errors: [
    DuplicateSSHPublicKeyException,
    InvalidPublicKeyException,
    LimitExceededException,
    NoSuchEntityException,
    UnrecognizedPublicKeyEncodingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadSSHPublicKey",
})) as any;

const i_ContextEntry: D.LazyStruct = () => ({
  ContextKeyName: 0,
  ContextKeyValues: 0,
  ContextKeyType: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_DelegationRequest: D.LazyStruct = () => ({
  Permissions: { Parameters: D.list({ Values: D.list() }) },
  RolePermissionRestrictionArns: D.list(),
  ExpirationTime: D.ts,
  CreateDate: D.ts,
  SessionDuration: D.num,
  OnlySendByOwner: D.bool,
  UpdatedTime: D.ts,
});
const o_EvaluationResult: D.LazyStruct = () => ({
  MatchedStatements: D.list(o_Statement),
  MissingContextValues: D.list(),
  OrganizationsDecisionDetail: { AllowedByOrganizations: D.bool },
  PermissionsBoundaryDecisionDetail: o_PermissionsBoundaryDecisionDetail,
  EvalDecisionDetails: D.map(),
  ResourceSpecificResults: D.list({
    MatchedStatements: D.list(o_Statement),
    MissingContextValues: D.list(),
    EvalDecisionDetails: D.map(),
    PermissionsBoundaryDecisionDetail: o_PermissionsBoundaryDecisionDetail,
  }),
});
const o_Group: D.LazyStruct = () => ({ CreateDate: D.ts });
const o_InstanceProfile: D.LazyStruct = () => ({
  CreateDate: D.ts,
  Roles: D.list(o_Role),
  Tags: D.list({}),
});
const o_LoginProfile: D.LazyStruct = () => ({
  CreateDate: D.ts,
  PasswordResetRequired: D.bool,
});
const o_Policy: D.LazyStruct = () => ({
  AttachmentCount: D.num,
  PermissionsBoundaryUsageCount: D.num,
  IsAttachable: D.bool,
  CreateDate: D.ts,
  UpdateDate: D.ts,
  Tags: D.list({}),
});
const o_PolicyVersion: D.LazyStruct = () => ({
  IsDefaultVersion: D.bool,
  CreateDate: D.ts,
});
const o_Role: D.LazyStruct = () => ({
  CreateDate: D.ts,
  MaxSessionDuration: D.num,
  PermissionsBoundary: {},
  Tags: D.list({}),
  RoleLastUsed: o_RoleLastUsed,
  SourceRoleTemplate: { TemplateMinorVersion: D.num },
});
const o_RoleLastUsed: D.LazyStruct = () => ({ LastUsedDate: D.ts });
const o_SSHPublicKey: D.LazyStruct = () => ({ UploadDate: D.ts });
const o_ServerCertificateMetadata: D.LazyStruct = () => ({
  UploadDate: D.ts,
  Expiration: D.ts,
});
const o_ServiceSpecificCredential: D.LazyStruct = () => ({
  CreateDate: D.ts,
  ExpirationDate: D.ts,
  ServicePassword: D.secret,
  ServiceCredentialSecret: D.secret,
});
const o_SigningCertificate: D.LazyStruct = () => ({ UploadDate: D.ts });
const o_User: D.LazyStruct = () => ({
  CreateDate: D.ts,
  PasswordLastUsed: D.ts,
  PermissionsBoundary: {},
  Tags: D.list({}),
});
const o_VirtualMFADevice: D.LazyStruct = () => ({
  Base32StringSeed: D.secretBlob,
  QRCodePNG: D.secretBlob,
  User: o_User,
  EnableDate: D.ts,
  Tags: D.list({}),
});
const o_PermissionsBoundaryDecisionDetail: D.LazyStruct = () => ({
  AllowedByPermissionsBoundary: D.bool,
});
const o_Statement: D.LazyStruct = () => ({
  StartPosition: o_Position,
  EndPosition: o_Position,
});
const o_Position: D.LazyStruct = () => ({ Line: D.num, Column: D.num });
