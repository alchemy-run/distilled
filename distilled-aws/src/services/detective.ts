import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Detective",
  serviceShapeName: "AmazonDetective",
});
const auth = T.AwsAuthSigv4({ name: "detective" });
const ver = T.ServiceVersion("2018-10-26");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type GraphArn = string;
export type ErrorMessage = string;
export type ErrorCodeReason = string;
export type AccountId = string;
export type UnprocessedReason = string;
export type TagKey = string;
export type TagValue = string;
export type Resource = string;
export type EmailMessage = string | redacted.Redacted<string>;
export type EmailAddress = string | redacted.Redacted<string>;
export type ByteValue = number;
export type Percentage = number;
export type InvestigationId = string;
export type EntityArn = string;
export type PaginationToken = string;
export type MemberResultsLimit = number;
export type AiPaginationToken = string;
export type MaxResults = number;
export type Tactic = string;
export type Technique = string;
export type Procedure = string;
export type IpAddress = string;
export type APIName = string;
export type APISuccessCount = number;
export type APIFailureCount = number;
export type Location = string;
export type HourlyTimeDelta = number;
export type IsNewForEntireAccount = boolean;
export type Aso = string;
export type UserAgent = string;
export type Type = string;
export type Id = string;
export type Value = string;

//# Schemas
export interface AcceptInvitationRequest {
  GraphArn: string;
}
export const AcceptInvitationRequest = S.suspend(() =>
  S.Struct({ GraphArn: S.String }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/invitation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptInvitationRequest",
}) as any as S.Schema<AcceptInvitationRequest>;
export interface AcceptInvitationResponse {}
export const AcceptInvitationResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "AcceptInvitationResponse",
}) as any as S.Schema<AcceptInvitationResponse>;
export type ErrorCode =
  | "INVALID_GRAPH_ARN"
  | "INVALID_REQUEST_BODY"
  | "INTERNAL_ERROR"
  | (string & {});
export const ErrorCode = S.String;
export type AccountIdExtendedList = string[];
export const AccountIdExtendedList = S.Array(S.String);
export interface BatchGetGraphMemberDatasourcesRequest {
  GraphArn: string;
  AccountIds: string[];
}
export const BatchGetGraphMemberDatasourcesRequest = S.suspend(() =>
  S.Struct({ GraphArn: S.String, AccountIds: AccountIdExtendedList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph/datasources/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetGraphMemberDatasourcesRequest",
}) as any as S.Schema<BatchGetGraphMemberDatasourcesRequest>;
export type DatasourcePackage =
  | "DETECTIVE_CORE"
  | "EKS_AUDIT"
  | "ASFF_SECURITYHUB_FINDING"
  | (string & {});
export const DatasourcePackage = S.String;
export type DatasourcePackageIngestState =
  | "STARTED"
  | "STOPPED"
  | "DISABLED"
  | (string & {});
export const DatasourcePackageIngestState = S.String;
export interface TimestampForCollection {
  Timestamp?: Date;
}
export const TimestampForCollection = S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "TimestampForCollection",
}) as any as S.Schema<TimestampForCollection>;
export type LastIngestStateChangeDates = {
  [key in DatasourcePackageIngestState]?: TimestampForCollection;
};
export const LastIngestStateChangeDates = S.Record(
  DatasourcePackageIngestState,
  TimestampForCollection.pipe(S.optional),
);
export type DatasourcePackageIngestHistory = {
  [key in DatasourcePackage]?: {
    [key: string]: TimestampForCollection | undefined;
  };
};
export const DatasourcePackageIngestHistory = S.Record(
  DatasourcePackage,
  LastIngestStateChangeDates.pipe(S.optional),
);
export interface MembershipDatasources {
  AccountId?: string;
  GraphArn?: string;
  DatasourcePackageIngestHistory?: {
    [key: string]:
      | { [key: string]: TimestampForCollection | undefined }
      | undefined;
  };
}
export const MembershipDatasources = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    GraphArn: S.optional(S.String),
    DatasourcePackageIngestHistory: S.optional(DatasourcePackageIngestHistory),
  }),
).annotate({
  identifier: "MembershipDatasources",
}) as any as S.Schema<MembershipDatasources>;
export type MembershipDatasourcesList = MembershipDatasources[];
export const MembershipDatasourcesList = S.Array(MembershipDatasources);
export interface UnprocessedAccount {
  AccountId?: string;
  Reason?: string;
}
export const UnprocessedAccount = S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), Reason: S.optional(S.String) }),
).annotate({
  identifier: "UnprocessedAccount",
}) as any as S.Schema<UnprocessedAccount>;
export type UnprocessedAccountList = UnprocessedAccount[];
export const UnprocessedAccountList = S.Array(UnprocessedAccount);
export interface BatchGetGraphMemberDatasourcesResponse {
  MemberDatasources?: MembershipDatasources[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export const BatchGetGraphMemberDatasourcesResponse = S.suspend(() =>
  S.Struct({
    MemberDatasources: S.optional(MembershipDatasourcesList),
    UnprocessedAccounts: S.optional(UnprocessedAccountList),
  }),
).annotate({
  identifier: "BatchGetGraphMemberDatasourcesResponse",
}) as any as S.Schema<BatchGetGraphMemberDatasourcesResponse>;
export type GraphArnList = string[];
export const GraphArnList = S.Array(S.String);
export interface BatchGetMembershipDatasourcesRequest {
  GraphArns: string[];
}
export const BatchGetMembershipDatasourcesRequest = S.suspend(() =>
  S.Struct({ GraphArns: GraphArnList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/membership/datasources/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetMembershipDatasourcesRequest",
}) as any as S.Schema<BatchGetMembershipDatasourcesRequest>;
export interface UnprocessedGraph {
  GraphArn?: string;
  Reason?: string;
}
export const UnprocessedGraph = S.suspend(() =>
  S.Struct({ GraphArn: S.optional(S.String), Reason: S.optional(S.String) }),
).annotate({
  identifier: "UnprocessedGraph",
}) as any as S.Schema<UnprocessedGraph>;
export type UnprocessedGraphList = UnprocessedGraph[];
export const UnprocessedGraphList = S.Array(UnprocessedGraph);
export interface BatchGetMembershipDatasourcesResponse {
  MembershipDatasources?: MembershipDatasources[];
  UnprocessedGraphs?: UnprocessedGraph[];
}
export const BatchGetMembershipDatasourcesResponse = S.suspend(() =>
  S.Struct({
    MembershipDatasources: S.optional(MembershipDatasourcesList),
    UnprocessedGraphs: S.optional(UnprocessedGraphList),
  }),
).annotate({
  identifier: "BatchGetMembershipDatasourcesResponse",
}) as any as S.Schema<BatchGetMembershipDatasourcesResponse>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateGraphRequest {
  Tags?: { [key: string]: string | undefined };
}
export const CreateGraphRequest = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGraphRequest",
}) as any as S.Schema<CreateGraphRequest>;
export interface CreateGraphResponse {
  GraphArn?: string;
}
export const CreateGraphResponse = S.suspend(() =>
  S.Struct({ GraphArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateGraphResponse",
}) as any as S.Schema<CreateGraphResponse>;
export type ResourceList = string[];
export const ResourceList = S.Array(S.String);
export interface Account {
  AccountId: string;
  EmailAddress: string | redacted.Redacted<string>;
}
export const Account = S.suspend(() =>
  S.Struct({ AccountId: S.String, EmailAddress: SensitiveString }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export type AccountList = Account[];
export const AccountList = S.Array(Account);
export interface CreateMembersRequest {
  GraphArn: string;
  Message?: string | redacted.Redacted<string>;
  DisableEmailNotification?: boolean;
  Accounts: Account[];
}
export const CreateMembersRequest = S.suspend(() =>
  S.Struct({
    GraphArn: S.String,
    Message: S.optional(SensitiveString),
    DisableEmailNotification: S.optional(S.Boolean),
    Accounts: AccountList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMembersRequest",
}) as any as S.Schema<CreateMembersRequest>;
export type MemberStatus =
  | "INVITED"
  | "VERIFICATION_IN_PROGRESS"
  | "VERIFICATION_FAILED"
  | "ENABLED"
  | "ACCEPTED_BUT_DISABLED"
  | (string & {});
export const MemberStatus = S.String;
export type MemberDisabledReason =
  | "VOLUME_TOO_HIGH"
  | "VOLUME_UNKNOWN"
  | (string & {});
export const MemberDisabledReason = S.String;
export type InvitationType = "INVITATION" | "ORGANIZATION" | (string & {});
export const InvitationType = S.String;
export interface DatasourcePackageUsageInfo {
  VolumeUsageInBytes?: number;
  VolumeUsageUpdateTime?: Date;
}
export const DatasourcePackageUsageInfo = S.suspend(() =>
  S.Struct({
    VolumeUsageInBytes: S.optional(S.Number),
    VolumeUsageUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DatasourcePackageUsageInfo",
}) as any as S.Schema<DatasourcePackageUsageInfo>;
export type VolumeUsageByDatasourcePackage = {
  [key in DatasourcePackage]?: DatasourcePackageUsageInfo;
};
export const VolumeUsageByDatasourcePackage = S.Record(
  DatasourcePackage,
  DatasourcePackageUsageInfo.pipe(S.optional),
);
export type DatasourcePackageIngestStates = {
  [key in DatasourcePackage]?: DatasourcePackageIngestState;
};
export const DatasourcePackageIngestStates = S.Record(
  DatasourcePackage,
  DatasourcePackageIngestState.pipe(S.optional),
);
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
export const MemberDetail = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    EmailAddress: S.optional(SensitiveString),
    GraphArn: S.optional(S.String),
    MasterId: S.optional(S.String),
    AdministratorId: S.optional(S.String),
    Status: S.optional(MemberStatus),
    DisabledReason: S.optional(MemberDisabledReason),
    InvitedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    VolumeUsageInBytes: S.optional(S.Number),
    VolumeUsageUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PercentOfGraphUtilization: S.optional(S.Number),
    PercentOfGraphUtilizationUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    InvitationType: S.optional(InvitationType),
    VolumeUsageByDatasourcePackage: S.optional(VolumeUsageByDatasourcePackage),
    DatasourcePackageIngestStates: S.optional(DatasourcePackageIngestStates),
  }),
).annotate({ identifier: "MemberDetail" }) as any as S.Schema<MemberDetail>;
export type MemberDetailList = MemberDetail[];
export const MemberDetailList = S.Array(MemberDetail);
export interface CreateMembersResponse {
  Members?: MemberDetail[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export const CreateMembersResponse = S.suspend(() =>
  S.Struct({
    Members: S.optional(MemberDetailList),
    UnprocessedAccounts: S.optional(UnprocessedAccountList),
  }),
).annotate({
  identifier: "CreateMembersResponse",
}) as any as S.Schema<CreateMembersResponse>;
export interface DeleteGraphRequest {
  GraphArn: string;
}
export const DeleteGraphRequest = S.suspend(() =>
  S.Struct({ GraphArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph/removal" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGraphRequest",
}) as any as S.Schema<DeleteGraphRequest>;
export interface DeleteGraphResponse {}
export const DeleteGraphResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteGraphResponse",
}) as any as S.Schema<DeleteGraphResponse>;
export type AccountIdList = string[];
export const AccountIdList = S.Array(S.String);
export interface DeleteMembersRequest {
  GraphArn: string;
  AccountIds: string[];
}
export const DeleteMembersRequest = S.suspend(() =>
  S.Struct({ GraphArn: S.String, AccountIds: AccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph/members/removal" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMembersRequest",
}) as any as S.Schema<DeleteMembersRequest>;
export interface DeleteMembersResponse {
  AccountIds?: string[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export const DeleteMembersResponse = S.suspend(() =>
  S.Struct({
    AccountIds: S.optional(AccountIdList),
    UnprocessedAccounts: S.optional(UnprocessedAccountList),
  }),
).annotate({
  identifier: "DeleteMembersResponse",
}) as any as S.Schema<DeleteMembersResponse>;
export interface DescribeOrganizationConfigurationRequest {
  GraphArn: string;
}
export const DescribeOrganizationConfigurationRequest = S.suspend(() =>
  S.Struct({ GraphArn: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/orgs/describeOrganizationConfiguration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeOrganizationConfigurationRequest",
}) as any as S.Schema<DescribeOrganizationConfigurationRequest>;
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
}
export const DescribeOrganizationConfigurationResponse = S.suspend(() =>
  S.Struct({ AutoEnable: S.optional(S.Boolean) }),
).annotate({
  identifier: "DescribeOrganizationConfigurationResponse",
}) as any as S.Schema<DescribeOrganizationConfigurationResponse>;
export interface DisableOrganizationAdminAccountRequest {}
export const DisableOrganizationAdminAccountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisableOrganizationAdminAccountRequest",
}) as any as S.Schema<DisableOrganizationAdminAccountRequest>;
export interface DisableOrganizationAdminAccountResponse {}
export const DisableOrganizationAdminAccountResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableOrganizationAdminAccountResponse",
}) as any as S.Schema<DisableOrganizationAdminAccountResponse>;
export interface DisassociateMembershipRequest {
  GraphArn: string;
}
export const DisassociateMembershipRequest = S.suspend(() =>
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
).annotate({
  identifier: "DisassociateMembershipRequest",
}) as any as S.Schema<DisassociateMembershipRequest>;
export interface DisassociateMembershipResponse {}
export const DisassociateMembershipResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMembershipResponse",
}) as any as S.Schema<DisassociateMembershipResponse>;
export interface EnableOrganizationAdminAccountRequest {
  AccountId: string;
}
export const EnableOrganizationAdminAccountRequest = S.suspend(() =>
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
).annotate({
  identifier: "EnableOrganizationAdminAccountRequest",
}) as any as S.Schema<EnableOrganizationAdminAccountRequest>;
export interface EnableOrganizationAdminAccountResponse {}
export const EnableOrganizationAdminAccountResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableOrganizationAdminAccountResponse",
}) as any as S.Schema<EnableOrganizationAdminAccountResponse>;
export interface GetInvestigationRequest {
  GraphArn: string;
  InvestigationId: string;
}
export const GetInvestigationRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetInvestigationRequest",
}) as any as S.Schema<GetInvestigationRequest>;
export type EntityType = "IAM_ROLE" | "IAM_USER" | (string & {});
export const EntityType = S.String;
export type Status = "RUNNING" | "FAILED" | "SUCCESSFUL" | (string & {});
export const Status = S.String;
export type Severity =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export const Severity = S.String;
export type State = "ACTIVE" | "ARCHIVED" | (string & {});
export const State = S.String;
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
export const GetInvestigationResponse = S.suspend(() =>
  S.Struct({
    GraphArn: S.optional(S.String),
    InvestigationId: S.optional(S.String),
    EntityArn: S.optional(S.String),
    EntityType: S.optional(EntityType),
    CreatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ScopeStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ScopeEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(Status),
    Severity: S.optional(Severity),
    State: S.optional(State),
  }),
).annotate({
  identifier: "GetInvestigationResponse",
}) as any as S.Schema<GetInvestigationResponse>;
export interface GetMembersRequest {
  GraphArn: string;
  AccountIds: string[];
}
export const GetMembersRequest = S.suspend(() =>
  S.Struct({ GraphArn: S.String, AccountIds: AccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph/members/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMembersRequest",
}) as any as S.Schema<GetMembersRequest>;
export interface GetMembersResponse {
  MemberDetails?: MemberDetail[];
  UnprocessedAccounts?: UnprocessedAccount[];
}
export const GetMembersResponse = S.suspend(() =>
  S.Struct({
    MemberDetails: S.optional(MemberDetailList),
    UnprocessedAccounts: S.optional(UnprocessedAccountList),
  }),
).annotate({
  identifier: "GetMembersResponse",
}) as any as S.Schema<GetMembersResponse>;
export interface ListDatasourcePackagesRequest {
  GraphArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatasourcePackagesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListDatasourcePackagesRequest",
}) as any as S.Schema<ListDatasourcePackagesRequest>;
export interface DatasourcePackageIngestDetail {
  DatasourcePackageIngestState?: DatasourcePackageIngestState;
  LastIngestStateChange?: { [key: string]: TimestampForCollection | undefined };
}
export const DatasourcePackageIngestDetail = S.suspend(() =>
  S.Struct({
    DatasourcePackageIngestState: S.optional(DatasourcePackageIngestState),
    LastIngestStateChange: S.optional(LastIngestStateChangeDates),
  }),
).annotate({
  identifier: "DatasourcePackageIngestDetail",
}) as any as S.Schema<DatasourcePackageIngestDetail>;
export type DatasourcePackageIngestDetails = {
  [key in DatasourcePackage]?: DatasourcePackageIngestDetail;
};
export const DatasourcePackageIngestDetails = S.Record(
  DatasourcePackage,
  DatasourcePackageIngestDetail.pipe(S.optional),
);
export interface ListDatasourcePackagesResponse {
  DatasourcePackages?: {
    [key: string]: DatasourcePackageIngestDetail | undefined;
  };
  NextToken?: string;
}
export const ListDatasourcePackagesResponse = S.suspend(() =>
  S.Struct({
    DatasourcePackages: S.optional(DatasourcePackageIngestDetails),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasourcePackagesResponse",
}) as any as S.Schema<ListDatasourcePackagesResponse>;
export interface ListGraphsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListGraphsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graphs/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGraphsRequest",
}) as any as S.Schema<ListGraphsRequest>;
export interface Graph {
  Arn?: string;
  CreatedTime?: Date;
}
export const Graph = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Graph" }) as any as S.Schema<Graph>;
export type GraphList = Graph[];
export const GraphList = S.Array(Graph);
export interface ListGraphsResponse {
  GraphList?: Graph[];
  NextToken?: string;
}
export const ListGraphsResponse = S.suspend(() =>
  S.Struct({
    GraphList: S.optional(GraphList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGraphsResponse",
}) as any as S.Schema<ListGraphsResponse>;
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
export const IndicatorType = S.String;
export interface ListIndicatorsRequest {
  GraphArn: string;
  InvestigationId: string;
  IndicatorType?: IndicatorType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListIndicatorsRequest = S.suspend(() =>
  S.Struct({
    GraphArn: S.String,
    InvestigationId: S.String,
    IndicatorType: S.optional(IndicatorType),
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
).annotate({
  identifier: "ListIndicatorsRequest",
}) as any as S.Schema<ListIndicatorsRequest>;
export interface TTPsObservedDetail {
  Tactic?: string;
  Technique?: string;
  Procedure?: string;
  IpAddress?: string;
  APIName?: string;
  APISuccessCount?: number;
  APIFailureCount?: number;
}
export const TTPsObservedDetail = S.suspend(() =>
  S.Struct({
    Tactic: S.optional(S.String),
    Technique: S.optional(S.String),
    Procedure: S.optional(S.String),
    IpAddress: S.optional(S.String),
    APIName: S.optional(S.String),
    APISuccessCount: S.optional(S.Number),
    APIFailureCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "TTPsObservedDetail",
}) as any as S.Schema<TTPsObservedDetail>;
export interface ImpossibleTravelDetail {
  StartingIpAddress?: string;
  EndingIpAddress?: string;
  StartingLocation?: string;
  EndingLocation?: string;
  HourlyTimeDelta?: number;
}
export const ImpossibleTravelDetail = S.suspend(() =>
  S.Struct({
    StartingIpAddress: S.optional(S.String),
    EndingIpAddress: S.optional(S.String),
    StartingLocation: S.optional(S.String),
    EndingLocation: S.optional(S.String),
    HourlyTimeDelta: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImpossibleTravelDetail",
}) as any as S.Schema<ImpossibleTravelDetail>;
export type Reason = "AWS_THREAT_INTELLIGENCE" | (string & {});
export const Reason = S.String;
export interface FlaggedIpAddressDetail {
  IpAddress?: string;
  Reason?: Reason;
}
export const FlaggedIpAddressDetail = S.suspend(() =>
  S.Struct({ IpAddress: S.optional(S.String), Reason: S.optional(Reason) }),
).annotate({
  identifier: "FlaggedIpAddressDetail",
}) as any as S.Schema<FlaggedIpAddressDetail>;
export interface NewGeolocationDetail {
  Location?: string;
  IpAddress?: string;
  IsNewForEntireAccount?: boolean;
}
export const NewGeolocationDetail = S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String),
    IpAddress: S.optional(S.String),
    IsNewForEntireAccount: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NewGeolocationDetail",
}) as any as S.Schema<NewGeolocationDetail>;
export interface NewAsoDetail {
  Aso?: string;
  IsNewForEntireAccount?: boolean;
}
export const NewAsoDetail = S.suspend(() =>
  S.Struct({
    Aso: S.optional(S.String),
    IsNewForEntireAccount: S.optional(S.Boolean),
  }),
).annotate({ identifier: "NewAsoDetail" }) as any as S.Schema<NewAsoDetail>;
export interface NewUserAgentDetail {
  UserAgent?: string;
  IsNewForEntireAccount?: boolean;
}
export const NewUserAgentDetail = S.suspend(() =>
  S.Struct({
    UserAgent: S.optional(S.String),
    IsNewForEntireAccount: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NewUserAgentDetail",
}) as any as S.Schema<NewUserAgentDetail>;
export interface RelatedFindingDetail {
  Arn?: string;
  Type?: string;
  IpAddress?: string;
}
export const RelatedFindingDetail = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
    IpAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "RelatedFindingDetail",
}) as any as S.Schema<RelatedFindingDetail>;
export interface RelatedFindingGroupDetail {
  Id?: string;
}
export const RelatedFindingGroupDetail = S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "RelatedFindingGroupDetail",
}) as any as S.Schema<RelatedFindingGroupDetail>;
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
export const IndicatorDetail = S.suspend(() =>
  S.Struct({
    TTPsObservedDetail: S.optional(TTPsObservedDetail),
    ImpossibleTravelDetail: S.optional(ImpossibleTravelDetail),
    FlaggedIpAddressDetail: S.optional(FlaggedIpAddressDetail),
    NewGeolocationDetail: S.optional(NewGeolocationDetail),
    NewAsoDetail: S.optional(NewAsoDetail),
    NewUserAgentDetail: S.optional(NewUserAgentDetail),
    RelatedFindingDetail: S.optional(RelatedFindingDetail),
    RelatedFindingGroupDetail: S.optional(RelatedFindingGroupDetail),
  }),
).annotate({
  identifier: "IndicatorDetail",
}) as any as S.Schema<IndicatorDetail>;
export interface Indicator {
  IndicatorType?: IndicatorType;
  IndicatorDetail?: IndicatorDetail;
}
export const Indicator = S.suspend(() =>
  S.Struct({
    IndicatorType: S.optional(IndicatorType),
    IndicatorDetail: S.optional(IndicatorDetail),
  }),
).annotate({ identifier: "Indicator" }) as any as S.Schema<Indicator>;
export type Indicators = Indicator[];
export const Indicators = S.Array(Indicator);
export interface ListIndicatorsResponse {
  GraphArn?: string;
  InvestigationId?: string;
  NextToken?: string;
  Indicators?: Indicator[];
}
export const ListIndicatorsResponse = S.suspend(() =>
  S.Struct({
    GraphArn: S.optional(S.String),
    InvestigationId: S.optional(S.String),
    NextToken: S.optional(S.String),
    Indicators: S.optional(Indicators),
  }),
).annotate({
  identifier: "ListIndicatorsResponse",
}) as any as S.Schema<ListIndicatorsResponse>;
export interface StringFilter {
  Value: string;
}
export const StringFilter = S.suspend(() =>
  S.Struct({ Value: S.String }),
).annotate({ identifier: "StringFilter" }) as any as S.Schema<StringFilter>;
export interface DateFilter {
  StartInclusive: Date;
  EndInclusive: Date;
}
export const DateFilter = S.suspend(() =>
  S.Struct({
    StartInclusive: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndInclusive: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "DateFilter" }) as any as S.Schema<DateFilter>;
export interface FilterCriteria {
  Severity?: StringFilter;
  Status?: StringFilter;
  State?: StringFilter;
  EntityArn?: StringFilter;
  CreatedTime?: DateFilter;
}
export const FilterCriteria = S.suspend(() =>
  S.Struct({
    Severity: S.optional(StringFilter),
    Status: S.optional(StringFilter),
    State: S.optional(StringFilter),
    EntityArn: S.optional(StringFilter),
    CreatedTime: S.optional(DateFilter),
  }),
).annotate({ identifier: "FilterCriteria" }) as any as S.Schema<FilterCriteria>;
export type Field = "SEVERITY" | "STATUS" | "CREATED_TIME" | (string & {});
export const Field = S.String;
export type SortOrder = "ASC" | "DESC" | (string & {});
export const SortOrder = S.String;
export interface SortCriteria {
  Field?: Field;
  SortOrder?: SortOrder;
}
export const SortCriteria = S.suspend(() =>
  S.Struct({ Field: S.optional(Field), SortOrder: S.optional(SortOrder) }),
).annotate({ identifier: "SortCriteria" }) as any as S.Schema<SortCriteria>;
export interface ListInvestigationsRequest {
  GraphArn: string;
  NextToken?: string;
  MaxResults?: number;
  FilterCriteria?: FilterCriteria;
  SortCriteria?: SortCriteria;
}
export const ListInvestigationsRequest = S.suspend(() =>
  S.Struct({
    GraphArn: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    FilterCriteria: S.optional(FilterCriteria),
    SortCriteria: S.optional(SortCriteria),
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
).annotate({
  identifier: "ListInvestigationsRequest",
}) as any as S.Schema<ListInvestigationsRequest>;
export interface InvestigationDetail {
  InvestigationId?: string;
  Severity?: Severity;
  Status?: Status;
  State?: State;
  CreatedTime?: Date;
  EntityArn?: string;
  EntityType?: EntityType;
}
export const InvestigationDetail = S.suspend(() =>
  S.Struct({
    InvestigationId: S.optional(S.String),
    Severity: S.optional(Severity),
    Status: S.optional(Status),
    State: S.optional(State),
    CreatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EntityArn: S.optional(S.String),
    EntityType: S.optional(EntityType),
  }),
).annotate({
  identifier: "InvestigationDetail",
}) as any as S.Schema<InvestigationDetail>;
export type InvestigationDetails = InvestigationDetail[];
export const InvestigationDetails = S.Array(InvestigationDetail);
export interface ListInvestigationsResponse {
  InvestigationDetails?: InvestigationDetail[];
  NextToken?: string;
}
export const ListInvestigationsResponse = S.suspend(() =>
  S.Struct({
    InvestigationDetails: S.optional(InvestigationDetails),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvestigationsResponse",
}) as any as S.Schema<ListInvestigationsResponse>;
export interface ListInvitationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListInvitationsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvitationsRequest",
}) as any as S.Schema<ListInvitationsRequest>;
export interface ListInvitationsResponse {
  Invitations?: MemberDetail[];
  NextToken?: string;
}
export const ListInvitationsResponse = S.suspend(() =>
  S.Struct({
    Invitations: S.optional(MemberDetailList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvitationsResponse",
}) as any as S.Schema<ListInvitationsResponse>;
export interface ListMembersRequest {
  GraphArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMembersRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListMembersRequest",
}) as any as S.Schema<ListMembersRequest>;
export interface ListMembersResponse {
  MemberDetails?: MemberDetail[];
  NextToken?: string;
}
export const ListMembersResponse = S.suspend(() =>
  S.Struct({
    MemberDetails: S.optional(MemberDetailList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersResponse",
}) as any as S.Schema<ListMembersResponse>;
export interface ListOrganizationAdminAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListOrganizationAdminAccountsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/orgs/adminAccountslist" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOrganizationAdminAccountsRequest",
}) as any as S.Schema<ListOrganizationAdminAccountsRequest>;
export interface Administrator {
  AccountId?: string;
  GraphArn?: string;
  DelegationTime?: Date;
}
export const Administrator = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    GraphArn: S.optional(S.String),
    DelegationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Administrator" }) as any as S.Schema<Administrator>;
export type AdministratorList = Administrator[];
export const AdministratorList = S.Array(Administrator);
export interface ListOrganizationAdminAccountsResponse {
  Administrators?: Administrator[];
  NextToken?: string;
}
export const ListOrganizationAdminAccountsResponse = S.suspend(() =>
  S.Struct({
    Administrators: S.optional(AdministratorList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrganizationAdminAccountsResponse",
}) as any as S.Schema<ListOrganizationAdminAccountsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RejectInvitationRequest {
  GraphArn: string;
}
export const RejectInvitationRequest = S.suspend(() =>
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
).annotate({
  identifier: "RejectInvitationRequest",
}) as any as S.Schema<RejectInvitationRequest>;
export interface RejectInvitationResponse {}
export const RejectInvitationResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "RejectInvitationResponse",
}) as any as S.Schema<RejectInvitationResponse>;
export interface StartInvestigationRequest {
  GraphArn: string;
  EntityArn: string;
  ScopeStartTime: Date;
  ScopeEndTime: Date;
}
export const StartInvestigationRequest = S.suspend(() =>
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
).annotate({
  identifier: "StartInvestigationRequest",
}) as any as S.Schema<StartInvestigationRequest>;
export interface StartInvestigationResponse {
  InvestigationId?: string;
}
export const StartInvestigationResponse = S.suspend(() =>
  S.Struct({ InvestigationId: S.optional(S.String) }),
).annotate({
  identifier: "StartInvestigationResponse",
}) as any as S.Schema<StartInvestigationResponse>;
export interface StartMonitoringMemberRequest {
  GraphArn: string;
  AccountId: string;
}
export const StartMonitoringMemberRequest = S.suspend(() =>
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
).annotate({
  identifier: "StartMonitoringMemberRequest",
}) as any as S.Schema<StartMonitoringMemberRequest>;
export interface StartMonitoringMemberResponse {}
export const StartMonitoringMemberResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartMonitoringMemberResponse",
}) as any as S.Schema<StartMonitoringMemberResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type DatasourcePackageList = DatasourcePackage[];
export const DatasourcePackageList = S.Array(DatasourcePackage);
export interface UpdateDatasourcePackagesRequest {
  GraphArn: string;
  DatasourcePackages: DatasourcePackage[];
}
export const UpdateDatasourcePackagesRequest = S.suspend(() =>
  S.Struct({
    GraphArn: S.String,
    DatasourcePackages: DatasourcePackageList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graph/datasources/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDatasourcePackagesRequest",
}) as any as S.Schema<UpdateDatasourcePackagesRequest>;
export interface UpdateDatasourcePackagesResponse {}
export const UpdateDatasourcePackagesResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDatasourcePackagesResponse",
}) as any as S.Schema<UpdateDatasourcePackagesResponse>;
export interface UpdateInvestigationStateRequest {
  GraphArn: string;
  InvestigationId: string;
  State: State;
}
export const UpdateInvestigationStateRequest = S.suspend(() =>
  S.Struct({
    GraphArn: S.String,
    InvestigationId: S.String,
    State: State,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/investigations/updateInvestigationState",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateInvestigationStateRequest",
}) as any as S.Schema<UpdateInvestigationStateRequest>;
export interface UpdateInvestigationStateResponse {}
export const UpdateInvestigationStateResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateInvestigationStateResponse",
}) as any as S.Schema<UpdateInvestigationStateResponse>;
export interface UpdateOrganizationConfigurationRequest {
  GraphArn: string;
  AutoEnable?: boolean;
}
export const UpdateOrganizationConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "UpdateOrganizationConfigurationRequest",
}) as any as S.Schema<UpdateOrganizationConfigurationRequest>;
export interface UpdateOrganizationConfigurationResponse {}
export const UpdateOrganizationConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateOrganizationConfigurationResponse",
}) as any as S.Schema<UpdateOrganizationConfigurationResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  {
    Message: S.optional(S.String),
    ErrorCode: S.optional(ErrorCode),
    ErrorCodeReason: S.optional(S.String),
    SubErrorCode: S.optional(ErrorCode),
    SubErrorCodeReason: S.optional(S.String),
  },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    Message: S.optional(S.String),
    ErrorCode: S.optional(ErrorCode),
    ErrorCodeReason: S.optional(S.String),
  },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.optional(S.String), Resources: S.optional(ResourceList) },
).pipe(C.withQuotaError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}

//# Operations
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcceptInvitationRequest,
  output: AcceptInvitationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Gets data source package information for the behavior graph.
 */
export const batchGetGraphMemberDatasources: API.OperationMethod<
  BatchGetGraphMemberDatasourcesRequest,
  BatchGetGraphMemberDatasourcesResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetGraphMemberDatasourcesRequest,
  output: BatchGetGraphMemberDatasourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Gets information on the data source package history for an account.
 */
export const batchGetMembershipDatasources: API.OperationMethod<
  BatchGetMembershipDatasourcesRequest,
  BatchGetMembershipDatasourcesResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetMembershipDatasourcesRequest,
  output: BatchGetMembershipDatasourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGraphRequest,
  output: CreateGraphResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMembersRequest,
  output: CreateMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGraphRequest,
  output: DeleteGraphResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMembersRequest,
  output: DeleteMembersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeOrganizationConfigurationRequest,
  output: DescribeOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableOrganizationAdminAccountRequest,
  output: DisableOrganizationAdminAccountResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateMembershipRequest,
  output: DisassociateMembershipResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableOrganizationAdminAccountRequest,
  output: EnableOrganizationAdminAccountResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
/**
 * Detective investigations lets you investigate IAM users and IAM roles using indicators of compromise. An indicator of compromise (IOC) is an artifact observed in or on a network, system, or environment that can (with a high level of confidence) identify malicious activity or a security incident. `GetInvestigation` returns the investigation results of an investigation for a behavior graph.
 */
export const getInvestigation: API.OperationMethod<
  GetInvestigationRequest,
  GetInvestigationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInvestigationRequest,
  output: GetInvestigationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
/**
 * Returns the membership details for specified member accounts for a behavior
 * graph.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest,
  GetMembersResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMembersRequest,
  output: GetMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Lists data source packages in the behavior graph.
 */
export const listDatasourcePackages: API.OperationMethod<
  ListDatasourcePackagesRequest,
  ListDatasourcePackagesResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDatasourcePackagesRequest,
  ) => stream.Stream<
    ListDatasourcePackagesResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDatasourcePackagesRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatasourcePackagesRequest,
  output: ListDatasourcePackagesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns the list of behavior graphs that the calling account is an administrator account
 * of. This operation can only be called by an administrator account.
 *
 * Because an account can currently only be the administrator of one behavior graph within
 * a Region, the results always contain a single behavior graph.
 */
export const listGraphs: API.OperationMethod<
  ListGraphsRequest,
  ListGraphsResponse,
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListGraphsRequest,
  ) => stream.Stream<
    ListGraphsResponse,
    | AccessDeniedException
    | InternalServerException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListGraphsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGraphsRequest,
  output: ListGraphsResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Gets the indicators from an investigation. You can use the information from the indicators to determine if an IAM user and/or IAM role is involved in an unusual activity that could indicate malicious behavior and its impact.
 */
export const listIndicators: API.OperationMethod<
  ListIndicatorsRequest,
  ListIndicatorsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListIndicatorsRequest,
  output: ListIndicatorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListInvestigationsRequest,
  output: ListInvestigationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
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
export const listInvitations: API.OperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse,
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListInvitationsRequest,
  ) => stream.Stream<
    ListInvitationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListInvitationsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listMembers: API.OperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMembersRequest,
  ) => stream.Stream<
    ListMembersResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMembersRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns information about the Detective administrator account for an
 * organization. Can only be called by the organization management account.
 */
export const listOrganizationAdminAccounts: API.OperationMethod<
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOrganizationAdminAccountsRequest,
  ) => stream.Stream<
    ListOrganizationAdminAccountsResponse,
    | AccessDeniedException
    | InternalServerException
    | TooManyRequestsException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOrganizationAdminAccountsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | TooManyRequestsException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationAdminAccountsRequest,
  output: ListOrganizationAdminAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns the tag values that are assigned to a behavior graph.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RejectInvitationRequest,
  output: RejectInvitationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Detective investigations lets you investigate IAM users and IAM roles using indicators of compromise. An indicator of compromise (IOC) is an artifact observed in or on a network, system, or environment that can (with a high level of confidence) identify malicious activity or a security incident. `StartInvestigation` initiates an investigation on an entity in a behavior graph.
 */
export const startInvestigation: API.OperationMethod<
  StartInvestigationRequest,
  StartInvestigationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartInvestigationRequest,
  output: StartInvestigationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartMonitoringMemberRequest,
  output: StartMonitoringMemberResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
/**
 * Applies tag values to a behavior graph.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Removes tags from a behavior graph.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Starts a data source package for the Detective behavior graph.
 */
export const updateDatasourcePackages: API.OperationMethod<
  UpdateDatasourcePackagesRequest,
  UpdateDatasourcePackagesResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDatasourcePackagesRequest,
  output: UpdateDatasourcePackagesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
/**
 * Updates the state of an investigation.
 */
export const updateInvestigationState: API.OperationMethod<
  UpdateInvestigationStateRequest,
  UpdateInvestigationStateResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateInvestigationStateRequest,
  output: UpdateInvestigationStateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
/**
 * Updates the configuration for the Organizations integration in the current Region.
 * Can only be called by the Detective administrator account for the
 * organization.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOrganizationConfigurationRequest,
  output: UpdateOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
