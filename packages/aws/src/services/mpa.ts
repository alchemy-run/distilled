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
  sdkId: "MPA",
  target: "AWSFluffyCoreService",
  version: "2022-07-26",
  sigv4: "mpa",
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
              `https://mpa-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://mpa.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string; readonly ResourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type SessionArn = string;
export interface CancelSessionRequest {
  SessionArn: string;
}
export interface CancelSessionResponse {}
export type Token = string;
export interface MofNApprovalStrategy {
  MinApprovalsRequired: number;
}
export type ApprovalStrategy = { MofN: MofNApprovalStrategy };
export type IdentityId = string;
export interface ApprovalTeamRequestApprover {
  PrimaryIdentityId: string;
  PrimaryIdentitySourceArn: string;
}
export type ApprovalTeamRequestApprovers = ApprovalTeamRequestApprover[];
export type Description = string | redacted.Redacted<string>;
export type QualifiedPolicyArn = string;
export interface PolicyReference {
  PolicyArn: string;
}
export type PoliciesReferences = PolicyReference[];
export type ApprovalTeamName = string;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export type Tags = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CreateApprovalTeamRequest {
  ClientToken?: string;
  ApprovalStrategy: ApprovalStrategy;
  Approvers: ApprovalTeamRequestApprover[];
  Description: string | redacted.Redacted<string>;
  Policies: PolicyReference[];
  Name: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type IsoTimestamp = Date;
export type ApprovalTeamArn = string;
export interface CreateApprovalTeamResponse {
  CreationTime?: Date;
  Arn?: string;
  Name?: string;
  VersionId?: string;
}
export type IdcInstanceArn = string;
export interface IamIdentityCenter {
  InstanceArn: string;
  Region: string;
}
export interface IdentitySourceParameters {
  IamIdentityCenter?: IamIdentityCenter;
}
export interface CreateIdentitySourceRequest {
  IdentitySourceParameters: IdentitySourceParameters;
  ClientToken?: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type IdentitySourceType = "IAM_IDENTITY_CENTER" | (string & {});
export interface CreateIdentitySourceResponse {
  IdentitySourceType?: IdentitySourceType;
  IdentitySourceArn?: string;
  CreationTime?: Date;
}
export interface DeleteIdentitySourceRequest {
  IdentitySourceArn: string;
}
export interface DeleteIdentitySourceResponse {}
export interface DeleteInactiveApprovalTeamVersionRequest {
  Arn: string;
  VersionId: string;
}
export interface DeleteInactiveApprovalTeamVersionResponse {}
export interface GetApprovalTeamRequest {
  Arn: string;
}
export type ApprovalStrategyResponse = { MofN: MofNApprovalStrategy };
export type ParticipantId = string;
export type IdentityStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "INVALID"
  | (string & {});
export type ApproverLastActivity =
  | "VOTED"
  | "BASELINED"
  | "RESPONDED_TO_INVITATION"
  | (string & {});
export type MfaType = "EMAIL_OTP" | (string & {});
export type MfaSyncStatus = "IN_SYNC" | "OUT_OF_SYNC" | (string & {});
export interface MfaMethod {
  Type: MfaType;
  SyncStatus: MfaSyncStatus;
}
export type MfaMethods = MfaMethod[];
export interface GetApprovalTeamResponseApprover {
  ApproverId?: string;
  ResponseTime?: Date;
  PrimaryIdentityId?: string;
  PrimaryIdentitySourceArn?: string;
  PrimaryIdentityStatus?: IdentityStatus;
  LastActivity?: ApproverLastActivity;
  LastActivityTime?: Date;
  PendingBaselineSessionArn?: string;
  MfaMethods?: MfaMethod[];
}
export type GetApprovalTeamResponseApprovers =
  GetApprovalTeamResponseApprover[];
export type ApprovalTeamStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETING"
  | "PENDING"
  | (string & {});
export type ApprovalTeamStatusCode =
  | "VALIDATING"
  | "PENDING_ACTIVATION"
  | "FAILED_VALIDATION"
  | "FAILED_ACTIVATION"
  | "UPDATE_PENDING_APPROVAL"
  | "UPDATE_PENDING_ACTIVATION"
  | "UPDATE_FAILED_APPROVAL"
  | "UPDATE_FAILED_ACTIVATION"
  | "UPDATE_FAILED_VALIDATION"
  | "DELETE_PENDING_APPROVAL"
  | "DELETE_FAILED_APPROVAL"
  | "DELETE_FAILED_VALIDATION"
  | (string & {});
export type Message = string;
export interface PendingUpdate {
  VersionId?: string;
  Description?: string;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  Status?: ApprovalTeamStatus;
  StatusCode?: ApprovalTeamStatusCode;
  StatusMessage?: string;
  Approvers?: GetApprovalTeamResponseApprover[];
  UpdateInitiationTime?: Date;
}
export interface GetApprovalTeamResponse {
  CreationTime?: Date;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  Approvers?: GetApprovalTeamResponseApprover[];
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Name?: string;
  Status?: ApprovalTeamStatus;
  StatusCode?: ApprovalTeamStatusCode;
  StatusMessage?: string;
  UpdateSessionArn?: string;
  VersionId?: string;
  Policies?: PolicyReference[];
  LastUpdateTime?: Date;
  PendingUpdate?: PendingUpdate;
}
export interface GetIdentitySourceRequest {
  IdentitySourceArn: string;
}
export interface IamIdentityCenterForGet {
  InstanceArn?: string;
  ApprovalPortalUrl?: string;
  Region?: string;
}
export type IdentitySourceParametersForGet = {
  IamIdentityCenter: IamIdentityCenterForGet;
};
export type IdentitySourceStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "ERROR"
  | (string & {});
export type IdentitySourceStatusCode =
  | "ACCESS_DENIED"
  | "DELETION_FAILED"
  | "IDC_INSTANCE_NOT_FOUND"
  | "IDC_INSTANCE_NOT_VALID"
  | (string & {});
export interface GetIdentitySourceResponse {
  IdentitySourceType?: IdentitySourceType;
  IdentitySourceParameters?: IdentitySourceParametersForGet;
  IdentitySourceArn?: string;
  CreationTime?: Date;
  Status?: IdentitySourceStatus;
  StatusCode?: IdentitySourceStatusCode;
  StatusMessage?: string;
}
export interface GetPolicyVersionRequest {
  PolicyVersionArn: string;
}
export type UnqualifiedPolicyArn = string;
export type PolicyVersionId = number;
export type PolicyType = "AWS_MANAGED" | "AWS_RAM" | (string & {});
export type PolicyName = string;
export type PolicyStatus = "ATTACHABLE" | "DEPRECATED" | (string & {});
export type PolicyDocument = string | redacted.Redacted<string>;
export interface PolicyVersion {
  Arn: string;
  PolicyArn: string;
  VersionId: number;
  PolicyType: PolicyType;
  IsDefault: boolean;
  Name: string;
  Status: PolicyStatus;
  CreationTime: Date;
  LastUpdatedTime: Date;
  Document: string | redacted.Redacted<string>;
}
export interface GetPolicyVersionResponse {
  PolicyVersion: PolicyVersion;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
  PolicyName: string;
  PolicyType: PolicyType;
}
export interface GetResourcePolicyResponse {
  ResourceArn: string;
  PolicyType: PolicyType;
  PolicyVersionArn?: string;
  PolicyName: string;
  PolicyDocument: string | redacted.Redacted<string>;
}
export interface GetSessionRequest {
  SessionArn: string;
}
export type SessionKey = string | redacted.Redacted<string>;
export type SessionValue = string | redacted.Redacted<string>;
export type SessionMetadata = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type SessionStatus =
  | "PENDING"
  | "CANCELLED"
  | "APPROVED"
  | "FAILED"
  | "CREATING"
  | (string & {});
export type SessionStatusCode =
  | "REJECTED"
  | "EXPIRED"
  | "CONFIGURATION_CHANGED"
  | "ALL_APPROVERS_IN_SESSION"
  | (string & {});
export type SessionExecutionStatus =
  | "EXECUTED"
  | "FAILED"
  | "PENDING"
  | (string & {});
export type ActionName = string;
export type ServicePrincipal = string;
export type AccountId = string;
export type Region = string;
export type RequesterComment = string | redacted.Redacted<string>;
export type ActionCompletionStrategy =
  | "AUTO_COMPLETION_UPON_APPROVAL"
  | (string & {});
export type SessionResponse =
  | "APPROVED"
  | "REJECTED"
  | "NO_RESPONSE"
  | (string & {});
export interface GetSessionResponseApproverResponse {
  ApproverId?: string;
  IdentitySourceArn?: string;
  IdentityId?: string;
  Response?: SessionResponse;
  ResponseTime?: Date;
}
export type GetSessionResponseApproverResponses =
  GetSessionResponseApproverResponse[];
export type AdditionalSecurityRequirement =
  | "APPROVER_VERIFICATION_REQUIRED"
  | (string & {});
export type AdditionalSecurityRequirements = AdditionalSecurityRequirement[];
export interface GetSessionResponse {
  SessionArn?: string;
  ApprovalTeamArn?: string;
  ApprovalTeamName?: string;
  ProtectedResourceArn?: string;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  InitiationTime?: Date;
  ExpirationTime?: Date;
  CompletionTime?: Date;
  Description?: string | redacted.Redacted<string>;
  Metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Status?: SessionStatus;
  StatusCode?: SessionStatusCode;
  StatusMessage?: string;
  ExecutionStatus?: SessionExecutionStatus;
  ActionName?: string;
  RequesterServicePrincipal?: string;
  RequesterPrincipalArn?: string;
  RequesterAccountId?: string;
  RequesterRegion?: string;
  RequesterComment?: string | redacted.Redacted<string>;
  ActionCompletionStrategy?: ActionCompletionStrategy;
  ApproverResponses?: GetSessionResponseApproverResponse[];
  AdditionalSecurityRequirements?: AdditionalSecurityRequirement[];
}
export type MaxResults = number;
export interface ListApprovalTeamsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListApprovalTeamsResponseApprovalTeam {
  CreationTime?: Date;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  Arn?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Status?: ApprovalTeamStatus;
  StatusCode?: ApprovalTeamStatusCode;
  StatusMessage?: string;
}
export type ListApprovalTeamsResponseApprovalTeams =
  ListApprovalTeamsResponseApprovalTeam[];
export interface ListApprovalTeamsResponse {
  NextToken?: string;
  ApprovalTeams?: ListApprovalTeamsResponseApprovalTeam[];
}
export interface ListIdentitySourcesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface IamIdentityCenterForList {
  InstanceArn?: string;
  ApprovalPortalUrl?: string;
  Region?: string;
}
export type IdentitySourceParametersForList = {
  IamIdentityCenter: IamIdentityCenterForList;
};
export interface IdentitySourceForList {
  IdentitySourceType?: IdentitySourceType;
  IdentitySourceParameters?: IdentitySourceParametersForList;
  IdentitySourceArn?: string;
  CreationTime?: Date;
  Status?: IdentitySourceStatus;
  StatusCode?: IdentitySourceStatusCode;
  StatusMessage?: string;
}
export type IdentitySources = IdentitySourceForList[];
export interface ListIdentitySourcesResponse {
  NextToken?: string;
  IdentitySources?: IdentitySourceForList[];
}
export interface ListPoliciesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Policy {
  Arn: string;
  DefaultVersion: number;
  PolicyType: PolicyType;
  Name: string;
}
export type Policies = Policy[];
export interface ListPoliciesResponse {
  NextToken?: string;
  Policies?: Policy[];
}
export interface ListPolicyVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
  PolicyArn: string;
}
export interface PolicyVersionSummary {
  Arn: string;
  PolicyArn: string;
  VersionId: number;
  PolicyType: PolicyType;
  IsDefault: boolean;
  Name: string;
  Status: PolicyStatus;
  CreationTime: Date;
  LastUpdatedTime: Date;
}
export type PolicyVersions = PolicyVersionSummary[];
export interface ListPolicyVersionsResponse {
  NextToken?: string;
  PolicyVersions?: PolicyVersionSummary[];
}
export interface ListResourcePoliciesRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListResourcePoliciesResponseResourcePolicy {
  PolicyArn?: string;
  PolicyType?: PolicyType;
  PolicyName?: string;
}
export type ListResourcePoliciesResponseResourcePolicies =
  ListResourcePoliciesResponseResourcePolicy[];
export interface ListResourcePoliciesResponse {
  NextToken?: string;
  ResourcePolicies?: ListResourcePoliciesResponseResourcePolicy[];
}
export type FilterField =
  | "ActionName"
  | "ApprovalTeamName"
  | "VotingTime"
  | "Vote"
  | "SessionStatus"
  | "InitiationTime"
  | (string & {});
export type Operator =
  | "EQ"
  | "NE"
  | "GT"
  | "LT"
  | "GTE"
  | "LTE"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "BETWEEN"
  | (string & {});
export interface Filter {
  FieldName?: FilterField;
  Operator?: Operator;
  Value?: string;
}
export type Filters = Filter[];
export interface ListSessionsRequest {
  ApprovalTeamArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export interface ListSessionsResponseSession {
  SessionArn?: string;
  ApprovalTeamName?: string;
  ApprovalTeamArn?: string;
  InitiationTime?: Date;
  ExpirationTime?: Date;
  CompletionTime?: Date;
  Description?: string | redacted.Redacted<string>;
  ActionName?: string;
  ProtectedResourceArn?: string;
  RequesterServicePrincipal?: string;
  RequesterPrincipalArn?: string;
  RequesterRegion?: string;
  RequesterAccountId?: string;
  Status?: SessionStatus;
  StatusCode?: SessionStatusCode;
  StatusMessage?: string;
  ActionCompletionStrategy?: ActionCompletionStrategy;
  AdditionalSecurityRequirements?: AdditionalSecurityRequirement[];
}
export type ListSessionsResponseSessions = ListSessionsResponseSession[];
export interface ListSessionsResponse {
  NextToken?: string;
  Sessions?: ListSessionsResponseSession[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface StartActiveApprovalTeamDeletionRequest {
  PendingWindowDays?: number;
  Arn: string;
}
export interface StartActiveApprovalTeamDeletionResponse {
  DeletionCompletionTime?: Date;
  DeletionStartTime?: Date;
}
export type StartApprovalTeamBaselineApproverIds = string[];
export interface StartApprovalTeamBaselineRequest {
  Arn: string;
  ApproverIds?: string[];
}
export interface StartApprovalTeamBaselineResponse {
  BaselineSessionArn?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export type UpdateAction = "SYNCHRONIZE_MFA_DEVICES" | (string & {});
export type UpdateActions = UpdateAction[];
export interface UpdateApprovalTeamRequest {
  ApprovalStrategy?: ApprovalStrategy;
  Approvers?: ApprovalTeamRequestApprover[];
  Description?: string | redacted.Redacted<string>;
  Arn: string;
  UpdateActions?: UpdateAction[];
}
export interface UpdateApprovalTeamResponse {
  VersionId?: string;
}
export type CancelSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an approval session. For more information, see Session in the *Multi-party approval User Guide*.
 */
export const cancelSession: API.OperationMethod<
  CancelSessionRequest,
  CancelSessionResponse,
  CancelSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sessions/{SessionArn}",
    input: { SessionArn: 0 },
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
  operationName: "CancelSession",
})) as any;

export type CreateApprovalTeamError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new approval team. For more information, see Approval team in the *Multi-party approval User Guide*.
 */
export const createApprovalTeam: API.OperationMethod<
  CreateApprovalTeamRequest,
  CreateApprovalTeamResponse,
  CreateApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /approval-teams",
    input: {
      ClientToken: D.m({ idempotency: true }),
      ApprovalStrategy: i_ApprovalStrategy,
      Approvers: D.list(i_ApprovalTeamRequestApprover),
      Description: 0,
      Policies: D.list({ PolicyArn: 0 }),
      Name: 0,
      Tags: 0,
    },
    output: { CreationTime: D.ts },
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
  operationName: "CreateApprovalTeam",
})) as any;

export type CreateIdentitySourceError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new identity source. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const createIdentitySource: API.OperationMethod<
  CreateIdentitySourceRequest,
  CreateIdentitySourceResponse,
  CreateIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identity-sources",
    input: {
      IdentitySourceParameters: {
        IamIdentityCenter: { InstanceArn: 0, Region: 0 },
      },
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentitySource",
})) as any;

export type DeleteIdentitySourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an identity source. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const deleteIdentitySource: API.OperationMethod<
  DeleteIdentitySourceRequest,
  DeleteIdentitySourceResponse,
  DeleteIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /identity-sources/{IdentitySourceArn}",
    input: { IdentitySourceArn: 0 },
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
  operationName: "DeleteIdentitySource",
})) as any;

export type DeleteInactiveApprovalTeamVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an inactive approval team. For more information, see Team health in the *Multi-party approval User Guide*.
 *
 * You can also use this operation to delete a team draft. For more information, see Interacting with drafts in the *Multi-party approval User Guide*.
 */
export const deleteInactiveApprovalTeamVersion: API.OperationMethod<
  DeleteInactiveApprovalTeamVersionRequest,
  DeleteInactiveApprovalTeamVersionResponse,
  DeleteInactiveApprovalTeamVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /approval-teams/{Arn}/{VersionId}",
    input: { Arn: 0, VersionId: 0 },
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
  operationName: "DeleteInactiveApprovalTeamVersion",
})) as any;

export type GetApprovalTeamError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for an approval team.
 */
export const getApprovalTeam: API.OperationMethod<
  GetApprovalTeamRequest,
  GetApprovalTeamResponse,
  GetApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /approval-teams/{Arn}",
    input: { Arn: 0 },
    output: {
      CreationTime: D.ts,
      Approvers: D.list(o_GetApprovalTeamResponseApprover),
      Description: D.secret,
      LastUpdateTime: D.ts,
      PendingUpdate: {
        Approvers: D.list(o_GetApprovalTeamResponseApprover),
        UpdateInitiationTime: D.ts,
      },
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
  operationName: "GetApprovalTeam",
})) as any;

export type GetIdentitySourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for an identity source. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const getIdentitySource: API.OperationMethod<
  GetIdentitySourceRequest,
  GetIdentitySourceResponse,
  GetIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /identity-sources/{IdentitySourceArn}",
    input: { IdentitySourceArn: 0 },
    output: { CreationTime: D.ts },
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
  operationName: "GetIdentitySource",
})) as any;

export type GetPolicyVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for the version of a policy. Policies define the permissions for team resources.
 */
export const getPolicyVersion: API.OperationMethod<
  GetPolicyVersionRequest,
  GetPolicyVersionResponse,
  GetPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy-versions/{PolicyVersionArn}",
    input: { PolicyVersionArn: 0 },
    output: {
      PolicyVersion: {
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
        Document: D.secret,
      },
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
  operationName: "GetPolicyVersion",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a policy for a resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetResourcePolicy",
    input: { ResourceArn: 0, PolicyName: 0, PolicyType: 0 },
    output: { PolicyDocument: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for an approval session. For more information, see Session in the *Multi-party approval User Guide*.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sessions/{SessionArn}",
    input: { SessionArn: 0 },
    output: {
      InitiationTime: D.ts,
      ExpirationTime: D.ts,
      CompletionTime: D.ts,
      Description: D.secret,
      Metadata: D.map(D.secret),
      RequesterComment: D.secret,
      ApproverResponses: D.list({ ResponseTime: D.ts }),
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
  operationName: "GetSession",
})) as any;

export type ListApprovalTeamsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of approval teams.
 */
export const listApprovalTeams: API.PaginatedOperationMethod<
  ListApprovalTeamsRequest,
  ListApprovalTeamsResponse,
  ListApprovalTeamsError,
  Credentials | HttpClient.HttpClient,
  ListApprovalTeamsResponseApprovalTeam
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /approval-teams/?List",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      ApprovalTeams: D.list({ CreationTime: D.ts, Description: D.secret }),
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
  operationName: "ListApprovalTeams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApprovalTeams",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentitySourcesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of identity sources. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const listIdentitySources: API.PaginatedOperationMethod<
  ListIdentitySourcesRequest,
  ListIdentitySourcesResponse,
  ListIdentitySourcesError,
  Credentials | HttpClient.HttpClient,
  IdentitySourceForList
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /identity-sources/?List",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { IdentitySources: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentitySources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IdentitySources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of policies. Policies define the permissions for team resources.
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
    http: "POST /policies/?List",
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
  operationName: "ListPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Policies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPolicyVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the versions for policies. Policies define the permissions for team resources.
 */
export const listPolicyVersions: API.PaginatedOperationMethod<
  ListPolicyVersionsRequest,
  ListPolicyVersionsResponse,
  ListPolicyVersionsError,
  Credentials | HttpClient.HttpClient,
  PolicyVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /policies/{PolicyArn}/?List",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      PolicyArn: 0,
    },
    output: {
      PolicyVersions: D.list({ CreationTime: D.ts, LastUpdatedTime: D.ts }),
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
  operationName: "ListPolicyVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicyVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcePoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of policies for a resource.
 */
export const listResourcePolicies: API.PaginatedOperationMethod<
  ListResourcePoliciesRequest,
  ListResourcePoliciesResponse,
  ListResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ListResourcePoliciesResponseResourcePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /resource-policies/{ResourceArn}/?List",
    input: {
      ResourceArn: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
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
  operationName: "ListResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourcePolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of approval sessions. For more information, see Session in the *Multi-party approval User Guide*.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  ListSessionsResponseSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /approval-teams/{ApprovalTeamArn}/sessions/?List",
    input: {
      ApprovalTeamArn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list({ FieldName: 0, Operator: 0, Value: 0 }),
    },
    output: {
      Sessions: D.list({
        InitiationTime: D.ts,
        ExpirationTime: D.ts,
        CompletionTime: D.ts,
        Description: D.secret,
      }),
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
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the tags for a resource.
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
    output: { Tags: D.map(D.secret) },
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
  operationName: "ListTagsForResource",
})) as any;

export type StartActiveApprovalTeamDeletionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the deletion process for an active approval team.
 *
 * **Deletions require team approval**
 *
 * Requests to delete an active team must be approved by the team.
 */
export const startActiveApprovalTeamDeletion: API.OperationMethod<
  StartActiveApprovalTeamDeletionRequest,
  StartActiveApprovalTeamDeletionResponse,
  StartActiveApprovalTeamDeletionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /approval-teams/{Arn}?Delete",
    input: { PendingWindowDays: 0, Arn: 0 },
    output: { DeletionCompletionTime: D.ts, DeletionStartTime: D.ts },
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
  operationName: "StartActiveApprovalTeamDeletion",
})) as any;

export type StartApprovalTeamBaselineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a baseline session for specified approvers on an `ACTIVE` approval team.
 */
export const startApprovalTeamBaseline: API.OperationMethod<
  StartApprovalTeamBaselineRequest,
  StartApprovalTeamBaselineResponse,
  StartApprovalTeamBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /approval-teams/{Arn}/baseline",
    input: { Arn: 0, ApproverIds: 0 },
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
  operationName: "StartApprovalTeamBaseline",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource tag. Each tag is a label consisting of a user-defined key and value. Tags can help you manage, identify, organize, search for, and filter resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a resource tag. Each tag is a label consisting of a user-defined key and value. Tags can help you manage, identify, organize, search for, and filter resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: 0 },
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
  operationName: "UntagResource",
})) as any;

export type UpdateApprovalTeamError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an approval team. You can request to update the team description, approval threshold, and approvers in the team.
 *
 * **Updates require team approval**
 *
 * Updates to an active team must be approved by the team.
 */
export const updateApprovalTeam: API.OperationMethod<
  UpdateApprovalTeamRequest,
  UpdateApprovalTeamResponse,
  UpdateApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /approval-teams/{Arn}",
    input: {
      ApprovalStrategy: i_ApprovalStrategy,
      Approvers: D.list(i_ApprovalTeamRequestApprover),
      Description: 0,
      Arn: 0,
      UpdateActions: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalTeam",
})) as any;

const i_ApprovalStrategy: D.LazyStruct = () => ({
  MofN: { MinApprovalsRequired: 0 },
});
const i_ApprovalTeamRequestApprover: D.LazyStruct = () => ({
  PrimaryIdentityId: 0,
  PrimaryIdentitySourceArn: 0,
});
const o_GetApprovalTeamResponseApprover: D.LazyStruct = () => ({
  ResponseTime: D.ts,
  LastActivityTime: D.ts,
});
