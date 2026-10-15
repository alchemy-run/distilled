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
  sdkId: "Detective",
  serviceShapeName: "AmazonDetective",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "detective" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-10-26");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.detective.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://api.detective.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.detective.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ErrorCode: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      ErrorCodeReason: /*@__PURE__*/ S.optional(S.String),
      SubErrorCode: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      SubErrorCodeReason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Resources: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(448, __c28, 0)).annotate({ identifier: "ResourceList" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ErrorCode: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      ErrorCodeReason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DatasourcePackageIngestState = "STARTED" | "STOPPED" | "DISABLED" | (string & {});
export interface TimestampForCollection {
  Timestamp?: Date;
}
export type LastIngestStateChangeDates = {
  [key in DatasourcePackageIngestState]?: TimestampForCollection;
};
export type DatasourcePackageIngestHistory = {
  [key in DatasourcePackage]?: { [key: string]: TimestampForCollection | undefined };
};
export interface MembershipDatasources {
  AccountId?: string;
  GraphArn?: string;
  DatasourcePackageIngestHistory?: {
    [key: string]: { [key: string]: TimestampForCollection | undefined } | undefined;
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
export type MemberDisabledReason = "VOLUME_TOO_HIGH" | "VOLUME_UNKNOWN" | (string & {});
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
  VolumeUsageByDatasourcePackage?: { [key: string]: DatasourcePackageUsageInfo | undefined };
  DatasourcePackageIngestStates?: { [key: string]: DatasourcePackageIngestState | undefined };
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
export type Severity = "INFORMATIONAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
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
  DatasourcePackages?: { [key: string]: DatasourcePackageIngestDetail | undefined };
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
  input: __S(464, __c29, 0) as any as S.Schema<AcceptInvitationRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<AcceptInvitationResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<BatchGetGraphMemberDatasourcesRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<BatchGetGraphMemberDatasourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetGraphMemberDatasources",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<BatchGetMembershipDatasourcesRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<BatchGetMembershipDatasourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMembershipDatasources",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateGraphRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateGraphResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraph",
}));

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
  input: __S(34, __c2, 2) as any as S.Schema<CreateMembersRequest>,
  output: __S(35, __c2, 3) as any as S.Schema<CreateMembersResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<DeleteGraphRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<DeleteGraphResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraph",
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<DeleteMembersRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<DeleteMembersResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<DescribeOrganizationConfigurationRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<DescribeOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<DisableOrganizationAdminAccountRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<DisableOrganizationAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DisassociateMembershipRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<DisassociateMembershipResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<EnableOrganizationAdminAccountRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<EnableOrganizationAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<GetInvestigationRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<GetInvestigationResponse>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<GetMembersRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetMembersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<ListDatasourcePackagesRequest>,
  output: __S(195, __c12, 3) as any as S.Schema<ListDatasourcePackagesResponse>,
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
  input: __S(208, __c13, 0) as any as S.Schema<ListGraphsRequest>,
  output: __S(211, __c13, 3) as any as S.Schema<ListGraphsResponse>,
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
  input: __S(224, __c14, 0) as any as S.Schema<ListIndicatorsRequest>,
  output: __S(236, __c14, 12) as any as S.Schema<ListIndicatorsResponse>,
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
}));

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
  input: __S(244, __c15, 4) as any as S.Schema<ListInvestigationsRequest>,
  output: __S(247, __c15, 7) as any as S.Schema<ListInvestigationsResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<ListInvitationsRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<ListInvitationsResponse>,
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
  input: __S(272, __c17, 0) as any as S.Schema<ListMembersRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<ListMembersResponse>,
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
  input: __S(288, __c18, 0) as any as S.Schema<ListOrganizationAdminAccountsRequest>,
  output: __S(291, __c18, 3) as any as S.Schema<ListOrganizationAdminAccountsResponse>,
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
  input: __S(304, __c19, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<RejectInvitationRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<RejectInvitationResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<StartInvestigationRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<StartInvestigationResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<StartMonitoringMemberRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<StartMonitoringMemberResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(401, __c25, 1) as any as S.Schema<UpdateDatasourcePackagesRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<UpdateDatasourcePackagesResponse>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<UpdateInvestigationStateRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<UpdateInvestigationStateResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<UpdateOrganizationConfigurationRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<UpdateOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(16, __c1, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/graph" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGraphRequest" });
    case 1:
      return S.suspend(() => S.Struct({ GraphArn: S.optional(S.String) })).annotate({
        identifier: "CreateGraphResponse",
      });
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
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, EmailAddress: SensitiveString }),
      ).annotate({ identifier: "Account" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.String,
          Message: S.optional(SensitiveString),
          DisableEmailNotification: S.optional(S.Boolean),
          Accounts: __S(33, __c2, 1),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/graph/members" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMembersRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Members: S.optional(__S(52, __c3, 4)),
          UnprocessedAccounts: S.optional(__S(513, __c32, 1)),
        }),
      ).annotate({ identifier: "CreateMembersResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeUsageInBytes: S.optional(S.Number),
          VolumeUsageUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DatasourcePackageUsageInfo" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(48, __c3, 0).pipe(S.optional));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          EmailAddress: S.optional(SensitiveString),
          GraphArn: S.optional(S.String),
          MasterId: S.optional(S.String),
          AdministratorId: S.optional(S.String),
          Status: S.optional(S.String),
          DisabledReason: S.optional(S.String),
          InvitedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          VolumeUsageInBytes: S.optional(S.Number),
          VolumeUsageUpdatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PercentOfGraphUtilization: S.optional(S.Number),
          PercentOfGraphUtilizationUpdatedTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          InvitationType: S.optional(S.String),
          VolumeUsageByDatasourcePackage: S.optional(__S(49, __c3, 1)),
          DatasourcePackageIngestStates: S.optional(__S(50, __c3, 2)),
        }),
      ).annotate({ identifier: "MemberDetail" });
    case 4:
      return S.Array(__S(51, __c3, 3));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/graph/removal" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGraphRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, AccountIds: __S(448, __c28, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/members/removal" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountIds: S.optional(__S(448, __c28, 0)),
          UnprocessedAccounts: S.optional(__S(513, __c32, 1)),
        }),
      ).annotate({ identifier: "DeleteMembersResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/orgs/describeOrganizationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOrganizationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AutoEnable: S.optional(S.Boolean) })).annotate({
        identifier: "DescribeOrganizationConfigurationResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/orgs/disableAdminAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableOrganizationAdminAccountRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/membership/removal" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMembershipRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/orgs/enableAdminAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableOrganizationAdminAccountRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, InvestigationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigations/getInvestigation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInvestigationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.optional(S.String),
          InvestigationId: S.optional(S.String),
          EntityArn: S.optional(S.String),
          EntityType: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ScopeStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ScopeEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Status: S.optional(S.String),
          Severity: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetInvestigationResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, AccountIds: __S(448, __c28, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/members/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MemberDetails: S.optional(__S(52, __c3, 4)),
          UnprocessedAccounts: S.optional(__S(513, __c32, 1)),
        }),
      ).annotate({ identifier: "GetMembersResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/datasources/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDatasourcePackagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatasourcePackageIngestState: S.optional(S.String),
          LastIngestStateChange: S.optional(__S(545, __c34, 1)),
        }),
      ).annotate({ identifier: "DatasourcePackageIngestDetail" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(193, __c12, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DatasourcePackages: S.optional(__S(194, __c12, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatasourcePackagesResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/graphs/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGraphsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Graph" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ GraphList: S.optional(__S(210, __c13, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGraphsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.String,
          InvestigationId: S.String,
          IndicatorType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigations/listIndicators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIndicatorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Tactic: S.optional(S.String),
          Technique: S.optional(S.String),
          Procedure: S.optional(S.String),
          IpAddress: S.optional(S.String),
          APIName: S.optional(S.String),
          APISuccessCount: S.optional(S.Number),
          APIFailureCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TTPsObservedDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StartingIpAddress: S.optional(S.String),
          EndingIpAddress: S.optional(S.String),
          StartingLocation: S.optional(S.String),
          EndingLocation: S.optional(S.String),
          HourlyTimeDelta: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImpossibleTravelDetail" });
    case 3:
      return S.suspend(() =>
        S.Struct({ IpAddress: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "FlaggedIpAddressDetail" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          IpAddress: S.optional(S.String),
          IsNewForEntireAccount: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NewGeolocationDetail" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Aso: S.optional(S.String), IsNewForEntireAccount: S.optional(S.Boolean) }),
      ).annotate({ identifier: "NewAsoDetail" });
    case 6:
      return S.suspend(() =>
        S.Struct({ UserAgent: S.optional(S.String), IsNewForEntireAccount: S.optional(S.Boolean) }),
      ).annotate({ identifier: "NewUserAgentDetail" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Type: S.optional(S.String),
          IpAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "RelatedFindingDetail" });
    case 8:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "RelatedFindingGroupDetail",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          TTPsObservedDetail: S.optional(__S(225, __c14, 1)),
          ImpossibleTravelDetail: S.optional(__S(226, __c14, 2)),
          FlaggedIpAddressDetail: S.optional(__S(227, __c14, 3)),
          NewGeolocationDetail: S.optional(__S(228, __c14, 4)),
          NewAsoDetail: S.optional(__S(229, __c14, 5)),
          NewUserAgentDetail: S.optional(__S(230, __c14, 6)),
          RelatedFindingDetail: S.optional(__S(231, __c14, 7)),
          RelatedFindingGroupDetail: S.optional(__S(232, __c14, 8)),
        }),
      ).annotate({ identifier: "IndicatorDetail" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          IndicatorType: S.optional(S.String),
          IndicatorDetail: S.optional(__S(233, __c14, 9)),
        }),
      ).annotate({ identifier: "Indicator" });
    case 11:
      return S.Array(__S(234, __c14, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.optional(S.String),
          InvestigationId: S.optional(S.String),
          NextToken: S.optional(S.String),
          Indicators: S.optional(__S(235, __c14, 11)),
        }),
      ).annotate({ identifier: "ListIndicatorsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.String })).annotate({
        identifier: "StringFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartInclusive: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndInclusive: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DateFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Severity: S.optional(__S(240, __c15, 0)),
          Status: S.optional(__S(240, __c15, 0)),
          State: S.optional(__S(240, __c15, 0)),
          EntityArn: S.optional(__S(240, __c15, 0)),
          CreatedTime: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "FilterCriteria" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Field: S.optional(S.String), SortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "SortCriteria" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          FilterCriteria: S.optional(__S(242, __c15, 2)),
          SortCriteria: S.optional(__S(243, __c15, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigations/listInvestigations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInvestigationsRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          InvestigationId: S.optional(S.String),
          Severity: S.optional(S.String),
          Status: S.optional(S.String),
          State: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EntityArn: S.optional(S.String),
          EntityType: S.optional(S.String),
        }),
      ).annotate({ identifier: "InvestigationDetail" });
    case 6:
      return S.Array(__S(245, __c15, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          InvestigationDetails: S.optional(__S(246, __c15, 6)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListInvestigationsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/invitations/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInvitationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Invitations: S.optional(__S(52, __c3, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInvitationsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/members/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MemberDetails: S.optional(__S(52, __c3, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMembersResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/orgs/adminAccountslist" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOrganizationAdminAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          GraphArn: S.optional(S.String),
          DelegationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Administrator" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Administrators: S.optional(__S(290, __c18, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOrganizationAdminAccountsResponse" });
  }
}
function __c19(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/invitation/removal" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectInvitationRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GraphArn: S.String,
          EntityArn: S.String,
          ScopeStartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ScopeEndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigations/startInvestigation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInvestigationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ InvestigationId: S.optional(S.String) })).annotate({
        identifier: "StartInvestigationResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, AccountId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/member/monitoringstate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMonitoringMemberRequest" });
  }
}
function __c23(j: number): any {
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(448, __c28, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, DatasourcePackages: __S(400, __c25, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/datasources/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDatasourcePackagesRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, InvestigationId: S.String, State: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigations/updateInvestigationState" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateInvestigationStateRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, AutoEnable: S.optional(S.Boolean) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/orgs/updateOrganizationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOrganizationConfigurationRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/invitation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptInvitationRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AcceptInvitationResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.String, AccountIds: __S(448, __c28, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graph/datasources/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetGraphMemberDatasourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MemberDatasources: S.optional(__S(530, __c33, 2)),
          UnprocessedAccounts: S.optional(__S(513, __c32, 1)),
        }),
      ).annotate({ identifier: "BatchGetGraphMemberDatasourcesResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "UnprocessedAccount" });
    case 1:
      return S.Array(__S(512, __c32, 0));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(545, __c34, 1).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          GraphArn: S.optional(S.String),
          DatasourcePackageIngestHistory: S.optional(__S(528, __c33, 0)),
        }),
      ).annotate({ identifier: "MembershipDatasources" });
    case 2:
      return S.Array(__S(529, __c33, 1));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))) }),
      ).annotate({ identifier: "TimestampForCollection" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(544, __c34, 0).pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GraphArns: __S(448, __c28, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/membership/datasources/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetMembershipDatasourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GraphArn: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "UnprocessedGraph" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MembershipDatasources: S.optional(__S(530, __c33, 2)),
          UnprocessedGraphs: S.optional(__S(562, __c35, 2)),
        }),
      ).annotate({ identifier: "BatchGetMembershipDatasourcesResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
