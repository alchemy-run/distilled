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
  sdkId: "Detective",
  target: "AmazonDetective",
  version: "2018-10-26",
  sigv4: "detective",
  protocol: restJson1Protocol,
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
            UseDualStack === true
          ) {
            return e(
              `https://detective.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://detective-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://detective.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://detective-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://api.detective-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://api.detective-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.detective.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.detective.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message?: string;
    readonly ErrorCode?: ErrorCode;
    readonly ErrorCodeReason?: string;
    readonly SubErrorCode?: ErrorCode;
    readonly SubErrorCodeReason?: string;
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string; readonly Resources?: string[] }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly ErrorCode?: ErrorCode;
    readonly ErrorCodeReason?: string;
  }> {}
export type GraphArn = string;
export interface AcceptInvitationRequest {
  GraphArn: string;
}
export interface AcceptInvitationResponse {}
export type AccountId = string;
export type AccountIdExtendedList = string[];
export interface BatchGetGraphMemberDatasourcesRequest {
  GraphArn: string;
  AccountIds: string[];
}
export type DatasourcePackage =
  | "DETECTIVE_CORE"
  | "EKS_AUDIT"
  | "ASFF_SECURITYHUB_FINDING"
  | (string & {});
export type DatasourcePackageIngestState =
  | "STARTED"
  | "STOPPED"
  | "DISABLED"
  | (string & {});
export interface TimestampForCollection {
  Timestamp?: Date;
}
export type LastIngestStateChangeDates = {
  [key in DatasourcePackageIngestState]?: TimestampForCollection;
};
export type DatasourcePackageIngestHistory = {
  [key in DatasourcePackage]?: {
    [key: string]: TimestampForCollection | undefined;
  };
};
export interface MembershipDatasources {
  AccountId?: string;
  GraphArn?: string;
  DatasourcePackageIngestHistory?: {
    [key: string]:
      | { [key: string]: TimestampForCollection | undefined }
      | undefined;
  };
}
export type MembershipDatasourcesList = MembershipDatasources[];
export type UnprocessedReason = string;
export interface UnprocessedAccount {
  AccountId?: string;
  Reason?: string;
}
export type UnprocessedAccountList = UnprocessedAccount[];
export interface BatchGetGraphMemberDatasourcesResponse {
  MemberDatasources?: MembershipDatasources[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export type GraphArnList = string[];
export interface BatchGetMembershipDatasourcesRequest {
  GraphArns: string[];
}
export interface UnprocessedGraph {
  GraphArn?: string;
  Reason?: string;
}
export type UnprocessedGraphList = UnprocessedGraph[];
export interface BatchGetMembershipDatasourcesResponse {
  MembershipDatasources?: MembershipDatasources[];
  UnprocessedGraphs?: UnprocessedGraph[];
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateGraphRequest {
  Tags?: { [key: string]: string | undefined };
}
export interface CreateGraphResponse {
  GraphArn?: string;
}
export type EmailMessage = string | redacted.Redacted<string>;
export type EmailAddress = string | redacted.Redacted<string>;
export interface Account {
  AccountId: string;
  EmailAddress: string | redacted.Redacted<string>;
}
export type AccountList = Account[];
export interface CreateMembersRequest {
  GraphArn: string;
  Message?: string | redacted.Redacted<string>;
  DisableEmailNotification?: boolean;
  Accounts: Account[];
}
export type MemberStatus =
  | "INVITED"
  | "VERIFICATION_IN_PROGRESS"
  | "VERIFICATION_FAILED"
  | "ENABLED"
  | "ACCEPTED_BUT_DISABLED"
  | (string & {});
export type MemberDisabledReason =
  | "VOLUME_TOO_HIGH"
  | "VOLUME_UNKNOWN"
  | (string & {});
export type ByteValue = number;
export type Percentage = number;
export type InvitationType = "INVITATION" | "ORGANIZATION" | (string & {});
export interface DatasourcePackageUsageInfo {
  VolumeUsageInBytes?: number;
  VolumeUsageUpdateTime?: Date;
}
export type VolumeUsageByDatasourcePackage = {
  [key in DatasourcePackage]?: DatasourcePackageUsageInfo;
};
export type DatasourcePackageIngestStates = {
  [key in DatasourcePackage]?: DatasourcePackageIngestState;
};
export interface MemberDetail {
  AccountId?: string;
  EmailAddress?: string | redacted.Redacted<string>;
  GraphArn?: string;
  MasterId?: string;
  AdministratorId?: string;
  Status?: MemberStatus;
  DisabledReason?: MemberDisabledReason;
  InvitedTime?: Date;
  UpdatedTime?: Date;
  VolumeUsageInBytes?: number;
  VolumeUsageUpdatedTime?: Date;
  PercentOfGraphUtilization?: number;
  PercentOfGraphUtilizationUpdatedTime?: Date;
  InvitationType?: InvitationType;
  VolumeUsageByDatasourcePackage?: {
    [key: string]: DatasourcePackageUsageInfo | undefined;
  };
  DatasourcePackageIngestStates?: {
    [key: string]: DatasourcePackageIngestState | undefined;
  };
}
export type MemberDetailList = MemberDetail[];
export interface CreateMembersResponse {
  Members?: MemberDetail[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export interface DeleteGraphRequest {
  GraphArn: string;
}
export interface DeleteGraphResponse {}
export type AccountIdList = string[];
export interface DeleteMembersRequest {
  GraphArn: string;
  AccountIds: string[];
}
export interface DeleteMembersResponse {
  AccountIds?: string[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export interface DescribeOrganizationConfigurationRequest {
  GraphArn: string;
}
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
}
export interface DisableOrganizationAdminAccountRequest {}
export interface DisableOrganizationAdminAccountResponse {}
export interface DisassociateMembershipRequest {
  GraphArn: string;
}
export interface DisassociateMembershipResponse {}
export interface EnableOrganizationAdminAccountRequest {
  AccountId: string;
}
export interface EnableOrganizationAdminAccountResponse {}
export type InvestigationId = string;
export interface GetInvestigationRequest {
  GraphArn: string;
  InvestigationId: string;
}
export type EntityArn = string;
export type EntityType = "IAM_ROLE" | "IAM_USER" | (string & {});
export type Status = "RUNNING" | "FAILED" | "SUCCESSFUL" | (string & {});
export type Severity =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export type State = "ACTIVE" | "ARCHIVED" | (string & {});
export interface GetInvestigationResponse {
  GraphArn?: string;
  InvestigationId?: string;
  EntityArn?: string;
  EntityType?: EntityType;
  CreatedTime?: Date;
  ScopeStartTime?: Date;
  ScopeEndTime?: Date;
  Status?: Status;
  Severity?: Severity;
  State?: State;
}
export interface GetMembersRequest {
  GraphArn: string;
  AccountIds: string[];
}
export interface GetMembersResponse {
  MemberDetails?: MemberDetail[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export type PaginationToken = string;
export type MemberResultsLimit = number;
export interface ListDatasourcePackagesRequest {
  GraphArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DatasourcePackageIngestDetail {
  DatasourcePackageIngestState?: DatasourcePackageIngestState;
  LastIngestStateChange?: { [key: string]: TimestampForCollection | undefined };
}
export type DatasourcePackageIngestDetails = {
  [key in DatasourcePackage]?: DatasourcePackageIngestDetail;
};
export interface ListDatasourcePackagesResponse {
  DatasourcePackages?: {
    [key: string]: DatasourcePackageIngestDetail | undefined;
  };
  NextToken?: string;
}
export interface ListGraphsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface Graph {
  Arn?: string;
  CreatedTime?: Date;
}
export type GraphList = Graph[];
export interface ListGraphsResponse {
  GraphList?: Graph[];
  NextToken?: string;
}
export type IndicatorType =
  | "TTP_OBSERVED"
  | "IMPOSSIBLE_TRAVEL"
  | "FLAGGED_IP_ADDRESS"
  | "NEW_GEOLOCATION"
  | "NEW_ASO"
  | "NEW_USER_AGENT"
  | "RELATED_FINDING"
  | "RELATED_FINDING_GROUP"
  | (string & {});
export type AiPaginationToken = string;
export type MaxResults = number;
export interface ListIndicatorsRequest {
  GraphArn: string;
  InvestigationId: string;
  IndicatorType?: IndicatorType;
  NextToken?: string;
  MaxResults?: number;
}
export type Tactic = string;
export type Technique = string;
export type Procedure = string;
export type IpAddress = string;
export type APIName = string;
export type APISuccessCount = number;
export type APIFailureCount = number;
export interface TTPsObservedDetail {
  Tactic?: string;
  Technique?: string;
  Procedure?: string;
  IpAddress?: string;
  APIName?: string;
  APISuccessCount?: number;
  APIFailureCount?: number;
}
export type Location = string;
export type HourlyTimeDelta = number;
export interface ImpossibleTravelDetail {
  StartingIpAddress?: string;
  EndingIpAddress?: string;
  StartingLocation?: string;
  EndingLocation?: string;
  HourlyTimeDelta?: number;
}
export type Reason = "AWS_THREAT_INTELLIGENCE" | (string & {});
export interface FlaggedIpAddressDetail {
  IpAddress?: string;
  Reason?: Reason;
}
export type IsNewForEntireAccount = boolean;
export interface NewGeolocationDetail {
  Location?: string;
  IpAddress?: string;
  IsNewForEntireAccount?: boolean;
}
export type Aso = string;
export interface NewAsoDetail {
  Aso?: string;
  IsNewForEntireAccount?: boolean;
}
export type UserAgent = string;
export interface NewUserAgentDetail {
  UserAgent?: string;
  IsNewForEntireAccount?: boolean;
}
export type Type = string;
export interface RelatedFindingDetail {
  Arn?: string;
  Type?: string;
  IpAddress?: string;
}
export type Id = string;
export interface RelatedFindingGroupDetail {
  Id?: string;
}
export interface IndicatorDetail {
  TTPsObservedDetail?: TTPsObservedDetail;
  ImpossibleTravelDetail?: ImpossibleTravelDetail;
  FlaggedIpAddressDetail?: FlaggedIpAddressDetail;
  NewGeolocationDetail?: NewGeolocationDetail;
  NewAsoDetail?: NewAsoDetail;
  NewUserAgentDetail?: NewUserAgentDetail;
  RelatedFindingDetail?: RelatedFindingDetail;
  RelatedFindingGroupDetail?: RelatedFindingGroupDetail;
}
export interface Indicator {
  IndicatorType?: IndicatorType;
  IndicatorDetail?: IndicatorDetail;
}
export type Indicators = Indicator[];
export interface ListIndicatorsResponse {
  GraphArn?: string;
  InvestigationId?: string;
  NextToken?: string;
  Indicators?: Indicator[];
}
export type Value = string;
export interface StringFilter {
  Value: string;
}
export interface DateFilter {
  StartInclusive: Date;
  EndInclusive: Date;
}
export interface FilterCriteria {
  Severity?: StringFilter;
  Status?: StringFilter;
  State?: StringFilter;
  EntityArn?: StringFilter;
  CreatedTime?: DateFilter;
}
export type Field = "SEVERITY" | "STATUS" | "CREATED_TIME" | (string & {});
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface SortCriteria {
  Field?: Field;
  SortOrder?: SortOrder;
}
export interface ListInvestigationsRequest {
  GraphArn: string;
  NextToken?: string;
  MaxResults?: number;
  FilterCriteria?: FilterCriteria;
  SortCriteria?: SortCriteria;
}
export interface InvestigationDetail {
  InvestigationId?: string;
  Severity?: Severity;
  Status?: Status;
  State?: State;
  CreatedTime?: Date;
  EntityArn?: string;
  EntityType?: EntityType;
}
export type InvestigationDetails = InvestigationDetail[];
export interface ListInvestigationsResponse {
  InvestigationDetails?: InvestigationDetail[];
  NextToken?: string;
}
export interface ListInvitationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListInvitationsResponse {
  Invitations?: MemberDetail[];
  NextToken?: string;
}
export interface ListMembersRequest {
  GraphArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListMembersResponse {
  MemberDetails?: MemberDetail[];
  NextToken?: string;
}
export interface ListOrganizationAdminAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface Administrator {
  AccountId?: string;
  GraphArn?: string;
  DelegationTime?: Date;
}
export type AdministratorList = Administrator[];
export interface ListOrganizationAdminAccountsResponse {
  Administrators?: Administrator[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface RejectInvitationRequest {
  GraphArn: string;
}
export interface RejectInvitationResponse {}
export interface StartInvestigationRequest {
  GraphArn: string;
  EntityArn: string;
  ScopeStartTime: Date;
  ScopeEndTime: Date;
}
export interface StartInvestigationResponse {
  InvestigationId?: string;
}
export interface StartMonitoringMemberRequest {
  GraphArn: string;
  AccountId: string;
}
export interface StartMonitoringMemberResponse {}
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
export type DatasourcePackageList = DatasourcePackage[];
export interface UpdateDatasourcePackagesRequest {
  GraphArn: string;
  DatasourcePackages: DatasourcePackage[];
}
export interface UpdateDatasourcePackagesResponse {}
export interface UpdateInvestigationStateRequest {
  GraphArn: string;
  InvestigationId: string;
  State: State;
}
export interface UpdateInvestigationStateResponse {}
export interface UpdateOrganizationConfigurationRequest {
  GraphArn: string;
  AutoEnable?: boolean;
}
export interface UpdateOrganizationConfigurationResponse {}
export type ErrorMessage = string;
export type ErrorCode =
  | "INVALID_GRAPH_ARN"
  | "INVALID_REQUEST_BODY"
  | "INTERNAL_ERROR"
  | (string & {});
export type ErrorCodeReason = string;
export type Resource = string;
export type ResourceList = string[];
export type AcceptInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Accepts an invitation for the member account to contribute data to a behavior graph.
 * This operation can only be called by an invited member account.
 *
 * The request provides the ARN of behavior graph.
 *
 * The member account status in the graph must be `INVITED`.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /invitation",
    input: { GraphArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
})) as any;

export type BatchGetGraphMemberDatasourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets data source package information for the behavior graph.
 */
export const batchGetGraphMemberDatasources: API.OperationMethod<
  BatchGetGraphMemberDatasourcesRequest,
  BatchGetGraphMemberDatasourcesResponse,
  BatchGetGraphMemberDatasourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/datasources/get",
    input: { GraphArn: 0, AccountIds: 0 },
    output: { MemberDatasources: D.list(o_MembershipDatasources) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetGraphMemberDatasources",
})) as any;

export type BatchGetMembershipDatasourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information on the data source package history for an account.
 */
export const batchGetMembershipDatasources: API.OperationMethod<
  BatchGetMembershipDatasourcesRequest,
  BatchGetMembershipDatasourcesResponse,
  BatchGetMembershipDatasourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /membership/datasources/get",
    input: { GraphArns: 0 },
    output: { MembershipDatasources: D.list(o_MembershipDatasources) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMembershipDatasources",
})) as any;

export type CreateGraphError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new behavior graph for the calling account, and sets that account as the
 * administrator account. This operation is called by the account that is enabling Detective.
 *
 * The operation also enables Detective for the calling account in the currently
 * selected Region. It returns the ARN of the new behavior graph.
 *
 * `CreateGraph` triggers a process to create the corresponding data tables for
 * the new behavior graph.
 *
 * An account can only be the administrator account for one behavior graph within a Region.
 * If the same account calls `CreateGraph` with the same administrator account, it
 * always returns the same behavior graph ARN. It does not create a new behavior graph.
 */
export const createGraph: API.OperationMethod<
  CreateGraphRequest,
  CreateGraphResponse,
  CreateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph",
    input: { Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraph",
})) as any;

export type CreateMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * `CreateMembers` is used to send invitations to accounts. For the organization
 * behavior graph, the Detective administrator account uses
 * `CreateMembers` to enable organization accounts as member accounts.
 *
 * For invited accounts, `CreateMembers` sends a request to invite the specified
 * Amazon Web Services accounts to be member accounts in the behavior graph. This operation
 * can only be called by the administrator account for a behavior graph.
 *
 * `CreateMembers` verifies the accounts and then invites the verified accounts.
 * The administrator can optionally specify to not send invitation emails to the member
 * accounts. This would be used when the administrator manages their member accounts
 * centrally.
 *
 * For organization accounts in the organization behavior graph, `CreateMembers`
 * attempts to enable the accounts. The organization accounts do not receive
 * invitations.
 *
 * The request provides the behavior graph ARN and the list of accounts to invite or to
 * enable.
 *
 * The response separates the requested accounts into two lists:
 *
 * - The accounts that `CreateMembers` was able to process. For invited
 * accounts, includes member accounts that are being verified, that have passed
 * verification and are to be invited, and that have failed verification. For
 * organization accounts in the organization behavior graph, includes accounts that can
 * be enabled and that cannot be enabled.
 *
 * - The accounts that `CreateMembers` was unable to process. This list
 * includes accounts that were already invited to be member accounts in the behavior
 * graph.
 */
export const createMembers: API.OperationMethod<
  CreateMembersRequest,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/members",
    input: {
      GraphArn: 0,
      Message: 0,
      DisableEmailNotification: 0,
      Accounts: D.list({ AccountId: 0, EmailAddress: 0 }),
    },
    output: { Members: D.list(o_MemberDetail) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
})) as any;

export type DeleteGraphError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disables the specified behavior graph and queues it to be deleted. This operation
 * removes the behavior graph from each member account's list of behavior graphs.
 *
 * `DeleteGraph` can only be called by the administrator account for a behavior
 * graph.
 */
export const deleteGraph: API.OperationMethod<
  DeleteGraphRequest,
  DeleteGraphResponse,
  DeleteGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/removal",
    input: { GraphArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraph",
})) as any;

export type DeleteMembersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified member accounts from the behavior graph. The removed accounts no
 * longer contribute data to the behavior graph. This operation can only be called by the
 * administrator account for the behavior graph.
 *
 * For invited accounts, the removed accounts are deleted from the list of accounts in the
 * behavior graph. To restore the account, the administrator account must send another
 * invitation.
 *
 * For organization accounts in the organization behavior graph, the Detective
 * administrator account can always enable the organization account again. Organization
 * accounts that are not enabled as member accounts are not included in the
 * `ListMembers` results for the organization behavior graph.
 *
 * An administrator account cannot use `DeleteMembers` to remove their own
 * account from the behavior graph. To disable a behavior graph, the administrator account
 * uses the `DeleteGraph` API method.
 */
export const deleteMembers: API.OperationMethod<
  DeleteMembersRequest,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/members/removal",
    input: { GraphArn: 0, AccountIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
})) as any;

export type DescribeOrganizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the configuration for the organization behavior graph.
 * Currently indicates whether to automatically enable new organization accounts as member
 * accounts.
 *
 * Can only be called by the Detective administrator account for the organization.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /orgs/describeOrganizationConfiguration",
    input: { GraphArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
})) as any;

export type DisableOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Removes the Detective administrator account in the current Region. Deletes the
 * organization behavior graph.
 *
 * Can only be called by the organization management account.
 *
 * Removing the Detective administrator account does not affect the delegated
 * administrator account for Detective in Organizations.
 *
 * To remove the delegated administrator account in Organizations, use the Organizations API. Removing the delegated administrator account also removes the Detective administrator account in all Regions, except for Regions where the Detective administrator account is the organization management account.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /orgs/disableAdminAccount" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
})) as any;

export type DisassociateMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the member account from the specified behavior graph. This operation can only be
 * called by an invited member account that has the `ENABLED` status.
 *
 * `DisassociateMembership` cannot be called by an organization account in the
 * organization behavior graph. For the organization behavior graph, the Detective
 * administrator account determines which organization accounts to enable or disable as member
 * accounts.
 */
export const disassociateMembership: API.OperationMethod<
  DisassociateMembershipRequest,
  DisassociateMembershipResponse,
  DisassociateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /membership/removal",
    input: { GraphArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembership",
})) as any;

export type EnableOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Designates the Detective administrator account for the organization in the
 * current Region.
 *
 * If the account does not have Detective enabled, then enables Detective
 * for that account and creates a new behavior graph.
 *
 * Can only be called by the organization management account.
 *
 * If the organization has a delegated administrator account in Organizations, then the
 * Detective administrator account must be either the delegated administrator
 * account or the organization management account.
 *
 * If the organization does not have a delegated administrator account in Organizations, then you can choose any account in the organization. If you choose an account other
 * than the organization management account, Detective calls Organizations to
 * make that account the delegated administrator account for Detective. The
 * organization management account cannot be the delegated administrator account.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /orgs/enableAdminAccount",
    input: { AccountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
})) as any;

export type GetInvestigationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Detective investigations lets you investigate IAM users and IAM roles using indicators of compromise. An indicator of compromise (IOC) is an artifact observed in or on a network, system, or environment that can (with a high level of confidence) identify malicious activity or a security incident. `GetInvestigation` returns the investigation results of an investigation for a behavior graph.
 */
export const getInvestigation: API.OperationMethod<
  GetInvestigationRequest,
  GetInvestigationResponse,
  GetInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /investigations/getInvestigation",
    input: { GraphArn: 0, InvestigationId: 0 },
    output: { CreatedTime: D.ts, ScopeStartTime: D.ts, ScopeEndTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigation",
})) as any;

export type GetMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the membership details for specified member accounts for a behavior
 * graph.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/members/get",
    input: { GraphArn: 0, AccountIds: 0 },
    output: { MemberDetails: D.list(o_MemberDetail) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
})) as any;

export type ListDatasourcePackagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists data source packages in the behavior graph.
 */
export const listDatasourcePackages: API.PaginatedOperationMethod<
  ListDatasourcePackagesRequest,
  ListDatasourcePackagesResponse,
  ListDatasourcePackagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/datasources/list",
    input: { GraphArn: 0, NextToken: 0, MaxResults: 0 },
    output: {
      DatasourcePackages: D.map({
        LastIngestStateChange: D.map(o_TimestampForCollection),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasourcePackages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGraphsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of behavior graphs that the calling account is an administrator account
 * of. This operation can only be called by an administrator account.
 *
 * Because an account can currently only be the administrator of one behavior graph within
 * a Region, the results always contain a single behavior graph.
 */
export const listGraphs: API.PaginatedOperationMethod<
  ListGraphsRequest,
  ListGraphsResponse,
  ListGraphsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /graphs/list",
    input: { NextToken: 0, MaxResults: 0 },
    output: { GraphList: D.list({ CreatedTime: D.ts }) },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIndicatorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Gets the indicators from an investigation. You can use the information from the indicators to determine if an IAM user and/or IAM role is involved in an unusual activity that could indicate malicious behavior and its impact.
 */
export const listIndicators: API.OperationMethod<
  ListIndicatorsRequest,
  ListIndicatorsResponse,
  ListIndicatorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /investigations/listIndicators",
    input: {
      GraphArn: 0,
      InvestigationId: 0,
      IndicatorType: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndicators",
})) as any;

export type ListInvestigationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Detective investigations lets you investigate IAM users and
 * IAM roles using indicators of compromise. An indicator of compromise
 * (IOC) is an artifact observed in or on a network, system, or environment that can (with a
 * high level of confidence) identify malicious activity or a security incident.
 * `ListInvestigations` lists all active Detective
 * investigations.
 */
export const listInvestigations: API.OperationMethod<
  ListInvestigationsRequest,
  ListInvestigationsResponse,
  ListInvestigationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /investigations/listInvestigations",
    input: {
      GraphArn: 0,
      NextToken: 0,
      MaxResults: 0,
      FilterCriteria: {
        Severity: i_StringFilter,
        Status: i_StringFilter,
        State: i_StringFilter,
        EntityArn: i_StringFilter,
        CreatedTime: {
          StartInclusive: D.tsAs("date-time"),
          EndInclusive: D.tsAs("date-time"),
        },
      },
      SortCriteria: { Field: 0, SortOrder: 0 },
    },
    output: { InvestigationDetails: D.list({ CreatedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigations",
})) as any;

export type ListInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of open and accepted behavior graph invitations for the member
 * account. This operation can only be called by an invited member account.
 *
 * Open invitations are invitations that the member account has not responded to.
 *
 * The results do not include behavior graphs for which the member account declined the
 * invitation. The results also do not include behavior graphs that the member account
 * resigned from or was removed from.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations/list",
    input: { NextToken: 0, MaxResults: 0 },
    output: { Invitations: D.list(o_MemberDetail) },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of member accounts for a behavior graph.
 *
 * For invited accounts, the results do not include member accounts that were removed from
 * the behavior graph.
 *
 * For the organization behavior graph, the results do not include organization accounts
 * that the Detective administrator account has not enabled as member
 * accounts.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/members/list",
    input: { GraphArn: 0, NextToken: 0, MaxResults: 0 },
    output: { MemberDetails: D.list(o_MemberDetail) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrganizationAdminAccountsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Detective administrator account for an
 * organization. Can only be called by the organization management account.
 */
export const listOrganizationAdminAccounts: API.PaginatedOperationMethod<
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /orgs/adminAccountslist",
    input: { NextToken: 0, MaxResults: 0 },
    output: { Administrators: D.list({ DelegationTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tag values that are assigned to a behavior graph.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RejectInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Rejects an invitation to contribute the account data to a behavior graph. This operation
 * must be called by an invited member account that has the `INVITED`
 * status.
 *
 * `RejectInvitation` cannot be called by an organization account in the
 * organization behavior graph. In the organization behavior graph, organization accounts do
 * not receive an invitation.
 */
export const rejectInvitation: API.OperationMethod<
  RejectInvitationRequest,
  RejectInvitationResponse,
  RejectInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitation/removal",
    input: { GraphArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInvitation",
})) as any;

export type StartInvestigationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Detective investigations lets you investigate IAM users and IAM roles using indicators of compromise. An indicator of compromise (IOC) is an artifact observed in or on a network, system, or environment that can (with a high level of confidence) identify malicious activity or a security incident. `StartInvestigation` initiates an investigation on an entity in a behavior graph.
 */
export const startInvestigation: API.OperationMethod<
  StartInvestigationRequest,
  StartInvestigationResponse,
  StartInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /investigations/startInvestigation",
    input: {
      GraphArn: 0,
      EntityArn: 0,
      ScopeStartTime: D.tsAs("date-time"),
      ScopeEndTime: D.tsAs("date-time"),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInvestigation",
})) as any;

export type StartMonitoringMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Sends a request to enable data ingest for a member account that has a status of
 * `ACCEPTED_BUT_DISABLED`.
 *
 * For valid member accounts, the status is updated as follows.
 *
 * - If Detective enabled the member account, then the new status is
 * `ENABLED`.
 *
 * - If Detective cannot enable the member account, the status remains
 * `ACCEPTED_BUT_DISABLED`.
 */
export const startMonitoringMember: API.OperationMethod<
  StartMonitoringMemberRequest,
  StartMonitoringMemberResponse,
  StartMonitoringMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/member/monitoringstate",
    input: { GraphArn: 0, AccountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitoringMember",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Applies tag values to a behavior graph.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
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
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a behavior graph.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDatasourcePackagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data source package for the Detective behavior graph.
 */
export const updateDatasourcePackages: API.OperationMethod<
  UpdateDatasourcePackagesRequest,
  UpdateDatasourcePackagesResponse,
  UpdateDatasourcePackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graph/datasources/update",
    input: { GraphArn: 0, DatasourcePackages: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasourcePackages",
})) as any;

export type UpdateInvestigationStateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the state of an investigation.
 */
export const updateInvestigationState: API.OperationMethod<
  UpdateInvestigationStateRequest,
  UpdateInvestigationStateResponse,
  UpdateInvestigationStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /investigations/updateInvestigationState",
    input: { GraphArn: 0, InvestigationId: 0, State: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInvestigationState",
})) as any;

export type UpdateOrganizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for the Organizations integration in the current Region.
 * Can only be called by the Detective administrator account for the
 * organization.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /orgs/updateOrganizationConfiguration",
    input: { GraphArn: 0, AutoEnable: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
})) as any;

const i_StringFilter: D.LazyStruct = () => ({ Value: 0 });
const o_MemberDetail: D.LazyStruct = () => ({
  EmailAddress: D.secret,
  InvitedTime: D.ts,
  UpdatedTime: D.ts,
  VolumeUsageUpdatedTime: D.ts,
  PercentOfGraphUtilizationUpdatedTime: D.ts,
  VolumeUsageByDatasourcePackage: D.map({ VolumeUsageUpdateTime: D.ts }),
});
const o_MembershipDatasources: D.LazyStruct = () => ({
  DatasourcePackageIngestHistory: D.map(D.map(o_TimestampForCollection)),
});
const o_TimestampForCollection: D.LazyStruct = () => ({ Timestamp: D.ts });
