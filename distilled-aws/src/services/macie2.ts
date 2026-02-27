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
const svc = T.AwsApiService({ sdkId: "Macie2", serviceShapeName: "Macie2" });
const auth = T.AwsAuthSigv4({ name: "macie2" });
const ver = T.ServiceVersion("2020-01-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
              `https://macie2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://macie2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://macie2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://macie2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type __timestampIso8601 = Date;
export type __stringMin1Max512PatternSS = string;
export type __stringMin3Max255PatternAZaZ093255 = string;
export type __stringMin1Max1024PatternSS = string;
export type __stringMin1Max128Pattern = string;
export type __stringMin71Max89PatternArnAwsAwsCnAwsUsGovMacie2AZ19920D12AllowListAZ0922 =
  string;
export type __stringMin22Max22PatternAZ0922 = string;
export type ClassificationScopeId = string;
export type SensitivityInspectionTemplateId = string;
export type ClassificationScopeName = string;
export type S3BucketName = string;
export type __stringMin1Max2048 = string;
export type __stringMin1Max64PatternW = string;
export type __stringMin1Max128 = string;
export type MaxResults = number;
export type NextToken = string;

//# Schemas
export interface AcceptInvitationRequest {
  administratorAccountId?: string;
  invitationId?: string;
  masterAccount?: string;
}
export const AcceptInvitationRequest = S.suspend(() =>
  S.Struct({
    administratorAccountId: S.optional(S.String),
    invitationId: S.optional(S.String),
    masterAccount: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/accept" }),
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
export type __listOf__string = string[];
export const __listOf__string = S.Array(S.String);
export interface BatchGetCustomDataIdentifiersRequest {
  ids?: string[];
}
export const BatchGetCustomDataIdentifiersRequest = S.suspend(() =>
  S.Struct({ ids: S.optional(__listOf__string) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetCustomDataIdentifiersRequest",
}) as any as S.Schema<BatchGetCustomDataIdentifiersRequest>;
export interface BatchGetCustomDataIdentifierSummary {
  arn?: string;
  createdAt?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  name?: string;
}
export const BatchGetCustomDataIdentifierSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    deleted: S.optional(S.Boolean),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetCustomDataIdentifierSummary",
}) as any as S.Schema<BatchGetCustomDataIdentifierSummary>;
export type __listOfBatchGetCustomDataIdentifierSummary =
  BatchGetCustomDataIdentifierSummary[];
export const __listOfBatchGetCustomDataIdentifierSummary = S.Array(
  BatchGetCustomDataIdentifierSummary,
);
export interface BatchGetCustomDataIdentifiersResponse {
  customDataIdentifiers?: BatchGetCustomDataIdentifierSummary[];
  notFoundIdentifierIds?: string[];
}
export const BatchGetCustomDataIdentifiersResponse = S.suspend(() =>
  S.Struct({
    customDataIdentifiers: S.optional(
      __listOfBatchGetCustomDataIdentifierSummary,
    ),
    notFoundIdentifierIds: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "BatchGetCustomDataIdentifiersResponse",
}) as any as S.Schema<BatchGetCustomDataIdentifiersResponse>;
export type AutomatedDiscoveryAccountStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const AutomatedDiscoveryAccountStatus = S.String;
export interface AutomatedDiscoveryAccountUpdate {
  accountId?: string;
  status?: AutomatedDiscoveryAccountStatus;
}
export const AutomatedDiscoveryAccountUpdate = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(AutomatedDiscoveryAccountStatus),
  }),
).annotate({
  identifier: "AutomatedDiscoveryAccountUpdate",
}) as any as S.Schema<AutomatedDiscoveryAccountUpdate>;
export type __listOfAutomatedDiscoveryAccountUpdate =
  AutomatedDiscoveryAccountUpdate[];
export const __listOfAutomatedDiscoveryAccountUpdate = S.Array(
  AutomatedDiscoveryAccountUpdate,
);
export interface BatchUpdateAutomatedDiscoveryAccountsRequest {
  accounts?: AutomatedDiscoveryAccountUpdate[];
}
export const BatchUpdateAutomatedDiscoveryAccountsRequest = S.suspend(() =>
  S.Struct({
    accounts: S.optional(__listOfAutomatedDiscoveryAccountUpdate),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/automated-discovery/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateAutomatedDiscoveryAccountsRequest",
}) as any as S.Schema<BatchUpdateAutomatedDiscoveryAccountsRequest>;
export type AutomatedDiscoveryAccountUpdateErrorCode =
  | "ACCOUNT_PAUSED"
  | "ACCOUNT_NOT_FOUND"
  | (string & {});
export const AutomatedDiscoveryAccountUpdateErrorCode = S.String;
export interface AutomatedDiscoveryAccountUpdateError {
  accountId?: string;
  errorCode?: AutomatedDiscoveryAccountUpdateErrorCode;
}
export const AutomatedDiscoveryAccountUpdateError = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    errorCode: S.optional(AutomatedDiscoveryAccountUpdateErrorCode),
  }),
).annotate({
  identifier: "AutomatedDiscoveryAccountUpdateError",
}) as any as S.Schema<AutomatedDiscoveryAccountUpdateError>;
export type __listOfAutomatedDiscoveryAccountUpdateError =
  AutomatedDiscoveryAccountUpdateError[];
export const __listOfAutomatedDiscoveryAccountUpdateError = S.Array(
  AutomatedDiscoveryAccountUpdateError,
);
export interface BatchUpdateAutomatedDiscoveryAccountsResponse {
  errors?: AutomatedDiscoveryAccountUpdateError[];
}
export const BatchUpdateAutomatedDiscoveryAccountsResponse = S.suspend(() =>
  S.Struct({
    errors: S.optional(__listOfAutomatedDiscoveryAccountUpdateError),
  }),
).annotate({
  identifier: "BatchUpdateAutomatedDiscoveryAccountsResponse",
}) as any as S.Schema<BatchUpdateAutomatedDiscoveryAccountsResponse>;
export interface S3WordsList {
  bucketName?: string;
  objectKey?: string;
}
export const S3WordsList = S.suspend(() =>
  S.Struct({
    bucketName: S.optional(S.String),
    objectKey: S.optional(S.String),
  }),
).annotate({ identifier: "S3WordsList" }) as any as S.Schema<S3WordsList>;
export interface AllowListCriteria {
  regex?: string;
  s3WordsList?: S3WordsList;
}
export const AllowListCriteria = S.suspend(() =>
  S.Struct({
    regex: S.optional(S.String),
    s3WordsList: S.optional(S3WordsList),
  }),
).annotate({
  identifier: "AllowListCriteria",
}) as any as S.Schema<AllowListCriteria>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateAllowListRequest {
  clientToken?: string;
  criteria?: AllowListCriteria;
  description?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAllowListRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    criteria: S.optional(AllowListCriteria),
    description: S.optional(S.String),
    name: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/allow-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAllowListRequest",
}) as any as S.Schema<CreateAllowListRequest>;
export interface CreateAllowListResponse {
  arn?: string;
  id?: string;
}
export const CreateAllowListResponse = S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "CreateAllowListResponse",
}) as any as S.Schema<CreateAllowListResponse>;
export type JobType = "ONE_TIME" | "SCHEDULED" | (string & {});
export const JobType = S.String;
export type ManagedDataIdentifierSelector =
  | "ALL"
  | "EXCLUDE"
  | "INCLUDE"
  | "NONE"
  | "RECOMMENDED"
  | (string & {});
export const ManagedDataIdentifierSelector = S.String;
export type JobComparator =
  | "EQ"
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "NE"
  | "CONTAINS"
  | "STARTS_WITH"
  | (string & {});
export const JobComparator = S.String;
export type SimpleCriterionKeyForJob =
  | "ACCOUNT_ID"
  | "S3_BUCKET_NAME"
  | "S3_BUCKET_EFFECTIVE_PERMISSION"
  | "S3_BUCKET_SHARED_ACCESS"
  | (string & {});
export const SimpleCriterionKeyForJob = S.String;
export interface SimpleCriterionForJob {
  comparator?: JobComparator;
  key?: SimpleCriterionKeyForJob;
  values?: string[];
}
export const SimpleCriterionForJob = S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(SimpleCriterionKeyForJob),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SimpleCriterionForJob",
}) as any as S.Schema<SimpleCriterionForJob>;
export interface TagCriterionPairForJob {
  key?: string;
  value?: string;
}
export const TagCriterionPairForJob = S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "TagCriterionPairForJob",
}) as any as S.Schema<TagCriterionPairForJob>;
export type __listOfTagCriterionPairForJob = TagCriterionPairForJob[];
export const __listOfTagCriterionPairForJob = S.Array(TagCriterionPairForJob);
export interface TagCriterionForJob {
  comparator?: JobComparator;
  tagValues?: TagCriterionPairForJob[];
}
export const TagCriterionForJob = S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    tagValues: S.optional(__listOfTagCriterionPairForJob),
  }),
).annotate({
  identifier: "TagCriterionForJob",
}) as any as S.Schema<TagCriterionForJob>;
export interface CriteriaForJob {
  simpleCriterion?: SimpleCriterionForJob;
  tagCriterion?: TagCriterionForJob;
}
export const CriteriaForJob = S.suspend(() =>
  S.Struct({
    simpleCriterion: S.optional(SimpleCriterionForJob),
    tagCriterion: S.optional(TagCriterionForJob),
  }),
).annotate({ identifier: "CriteriaForJob" }) as any as S.Schema<CriteriaForJob>;
export type __listOfCriteriaForJob = CriteriaForJob[];
export const __listOfCriteriaForJob = S.Array(CriteriaForJob);
export interface CriteriaBlockForJob {
  and?: CriteriaForJob[];
}
export const CriteriaBlockForJob = S.suspend(() =>
  S.Struct({ and: S.optional(__listOfCriteriaForJob) }),
).annotate({
  identifier: "CriteriaBlockForJob",
}) as any as S.Schema<CriteriaBlockForJob>;
export interface S3BucketCriteriaForJob {
  excludes?: CriteriaBlockForJob;
  includes?: CriteriaBlockForJob;
}
export const S3BucketCriteriaForJob = S.suspend(() =>
  S.Struct({
    excludes: S.optional(CriteriaBlockForJob),
    includes: S.optional(CriteriaBlockForJob),
  }),
).annotate({
  identifier: "S3BucketCriteriaForJob",
}) as any as S.Schema<S3BucketCriteriaForJob>;
export interface S3BucketDefinitionForJob {
  accountId?: string;
  buckets?: string[];
}
export const S3BucketDefinitionForJob = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    buckets: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "S3BucketDefinitionForJob",
}) as any as S.Schema<S3BucketDefinitionForJob>;
export type __listOfS3BucketDefinitionForJob = S3BucketDefinitionForJob[];
export const __listOfS3BucketDefinitionForJob = S.Array(
  S3BucketDefinitionForJob,
);
export type ScopeFilterKey =
  | "OBJECT_EXTENSION"
  | "OBJECT_LAST_MODIFIED_DATE"
  | "OBJECT_SIZE"
  | "OBJECT_KEY"
  | (string & {});
export const ScopeFilterKey = S.String;
export interface SimpleScopeTerm {
  comparator?: JobComparator;
  key?: ScopeFilterKey;
  values?: string[];
}
export const SimpleScopeTerm = S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(ScopeFilterKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SimpleScopeTerm",
}) as any as S.Schema<SimpleScopeTerm>;
export interface TagValuePair {
  key?: string;
  value?: string;
}
export const TagValuePair = S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "TagValuePair" }) as any as S.Schema<TagValuePair>;
export type __listOfTagValuePair = TagValuePair[];
export const __listOfTagValuePair = S.Array(TagValuePair);
export type TagTarget = "S3_OBJECT" | (string & {});
export const TagTarget = S.String;
export interface TagScopeTerm {
  comparator?: JobComparator;
  key?: string;
  tagValues?: TagValuePair[];
  target?: TagTarget;
}
export const TagScopeTerm = S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(S.String),
    tagValues: S.optional(__listOfTagValuePair),
    target: S.optional(TagTarget),
  }),
).annotate({ identifier: "TagScopeTerm" }) as any as S.Schema<TagScopeTerm>;
export interface JobScopeTerm {
  simpleScopeTerm?: SimpleScopeTerm;
  tagScopeTerm?: TagScopeTerm;
}
export const JobScopeTerm = S.suspend(() =>
  S.Struct({
    simpleScopeTerm: S.optional(SimpleScopeTerm),
    tagScopeTerm: S.optional(TagScopeTerm),
  }),
).annotate({ identifier: "JobScopeTerm" }) as any as S.Schema<JobScopeTerm>;
export type __listOfJobScopeTerm = JobScopeTerm[];
export const __listOfJobScopeTerm = S.Array(JobScopeTerm);
export interface JobScopingBlock {
  and?: JobScopeTerm[];
}
export const JobScopingBlock = S.suspend(() =>
  S.Struct({ and: S.optional(__listOfJobScopeTerm) }),
).annotate({
  identifier: "JobScopingBlock",
}) as any as S.Schema<JobScopingBlock>;
export interface Scoping {
  excludes?: JobScopingBlock;
  includes?: JobScopingBlock;
}
export const Scoping = S.suspend(() =>
  S.Struct({
    excludes: S.optional(JobScopingBlock),
    includes: S.optional(JobScopingBlock),
  }),
).annotate({ identifier: "Scoping" }) as any as S.Schema<Scoping>;
export interface S3JobDefinition {
  bucketCriteria?: S3BucketCriteriaForJob;
  bucketDefinitions?: S3BucketDefinitionForJob[];
  scoping?: Scoping;
}
export const S3JobDefinition = S.suspend(() =>
  S.Struct({
    bucketCriteria: S.optional(S3BucketCriteriaForJob),
    bucketDefinitions: S.optional(__listOfS3BucketDefinitionForJob),
    scoping: S.optional(Scoping),
  }),
).annotate({
  identifier: "S3JobDefinition",
}) as any as S.Schema<S3JobDefinition>;
export interface DailySchedule {}
export const DailySchedule = S.suspend(() => S.Struct({})).annotate({
  identifier: "DailySchedule",
}) as any as S.Schema<DailySchedule>;
export interface MonthlySchedule {
  dayOfMonth?: number;
}
export const MonthlySchedule = S.suspend(() =>
  S.Struct({ dayOfMonth: S.optional(S.Number) }),
).annotate({
  identifier: "MonthlySchedule",
}) as any as S.Schema<MonthlySchedule>;
export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export const DayOfWeek = S.String;
export interface WeeklySchedule {
  dayOfWeek?: DayOfWeek;
}
export const WeeklySchedule = S.suspend(() =>
  S.Struct({ dayOfWeek: S.optional(DayOfWeek) }),
).annotate({ identifier: "WeeklySchedule" }) as any as S.Schema<WeeklySchedule>;
export interface JobScheduleFrequency {
  dailySchedule?: DailySchedule;
  monthlySchedule?: MonthlySchedule;
  weeklySchedule?: WeeklySchedule;
}
export const JobScheduleFrequency = S.suspend(() =>
  S.Struct({
    dailySchedule: S.optional(DailySchedule),
    monthlySchedule: S.optional(MonthlySchedule),
    weeklySchedule: S.optional(WeeklySchedule),
  }),
).annotate({
  identifier: "JobScheduleFrequency",
}) as any as S.Schema<JobScheduleFrequency>;
export interface CreateClassificationJobRequest {
  allowListIds?: string[];
  clientToken?: string;
  customDataIdentifierIds?: string[];
  description?: string;
  initialRun?: boolean;
  jobType?: JobType;
  managedDataIdentifierIds?: string[];
  managedDataIdentifierSelector?: ManagedDataIdentifierSelector;
  name?: string;
  s3JobDefinition?: S3JobDefinition;
  samplingPercentage?: number;
  scheduleFrequency?: JobScheduleFrequency;
  tags?: { [key: string]: string | undefined };
}
export const CreateClassificationJobRequest = S.suspend(() =>
  S.Struct({
    allowListIds: S.optional(__listOf__string),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    customDataIdentifierIds: S.optional(__listOf__string),
    description: S.optional(S.String),
    initialRun: S.optional(S.Boolean),
    jobType: S.optional(JobType),
    managedDataIdentifierIds: S.optional(__listOf__string),
    managedDataIdentifierSelector: S.optional(ManagedDataIdentifierSelector),
    name: S.optional(S.String),
    s3JobDefinition: S.optional(S3JobDefinition),
    samplingPercentage: S.optional(S.Number),
    scheduleFrequency: S.optional(JobScheduleFrequency),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClassificationJobRequest",
}) as any as S.Schema<CreateClassificationJobRequest>;
export interface CreateClassificationJobResponse {
  jobArn?: string;
  jobId?: string;
}
export const CreateClassificationJobResponse = S.suspend(() =>
  S.Struct({ jobArn: S.optional(S.String), jobId: S.optional(S.String) }),
).annotate({
  identifier: "CreateClassificationJobResponse",
}) as any as S.Schema<CreateClassificationJobResponse>;
export type DataIdentifierSeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const DataIdentifierSeverity = S.String;
export interface SeverityLevel {
  occurrencesThreshold?: number;
  severity?: DataIdentifierSeverity;
}
export const SeverityLevel = S.suspend(() =>
  S.Struct({
    occurrencesThreshold: S.optional(S.Number),
    severity: S.optional(DataIdentifierSeverity),
  }),
).annotate({ identifier: "SeverityLevel" }) as any as S.Schema<SeverityLevel>;
export type SeverityLevelList = SeverityLevel[];
export const SeverityLevelList = S.Array(SeverityLevel);
export interface CreateCustomDataIdentifierRequest {
  clientToken?: string;
  description?: string;
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  name?: string;
  regex?: string;
  severityLevels?: SeverityLevel[];
  tags?: { [key: string]: string | undefined };
}
export const CreateCustomDataIdentifierRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    ignoreWords: S.optional(__listOf__string),
    keywords: S.optional(__listOf__string),
    maximumMatchDistance: S.optional(S.Number),
    name: S.optional(S.String),
    regex: S.optional(S.String),
    severityLevels: S.optional(SeverityLevelList),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomDataIdentifierRequest",
}) as any as S.Schema<CreateCustomDataIdentifierRequest>;
export interface CreateCustomDataIdentifierResponse {
  customDataIdentifierId?: string;
}
export const CreateCustomDataIdentifierResponse = S.suspend(() =>
  S.Struct({ customDataIdentifierId: S.optional(S.String) }),
).annotate({
  identifier: "CreateCustomDataIdentifierResponse",
}) as any as S.Schema<CreateCustomDataIdentifierResponse>;
export type FindingsFilterAction = "ARCHIVE" | "NOOP" | (string & {});
export const FindingsFilterAction = S.String;
export interface CriterionAdditionalProperties {
  eq?: string[];
  eqExactMatch?: string[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  neq?: string[];
}
export const CriterionAdditionalProperties = S.suspend(() =>
  S.Struct({
    eq: S.optional(__listOf__string),
    eqExactMatch: S.optional(__listOf__string),
    gt: S.optional(S.Number),
    gte: S.optional(S.Number),
    lt: S.optional(S.Number),
    lte: S.optional(S.Number),
    neq: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "CriterionAdditionalProperties",
}) as any as S.Schema<CriterionAdditionalProperties>;
export type Criterion = {
  [key: string]: CriterionAdditionalProperties | undefined;
};
export const Criterion = S.Record(
  S.String,
  CriterionAdditionalProperties.pipe(S.optional),
);
export interface FindingCriteria {
  criterion?: { [key: string]: CriterionAdditionalProperties | undefined };
}
export const FindingCriteria = S.suspend(() =>
  S.Struct({ criterion: S.optional(Criterion) }),
).annotate({
  identifier: "FindingCriteria",
}) as any as S.Schema<FindingCriteria>;
export interface CreateFindingsFilterRequest {
  action?: FindingsFilterAction;
  clientToken?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  name?: string;
  position?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateFindingsFilterRequest = S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    findingCriteria: S.optional(FindingCriteria),
    name: S.optional(S.String),
    position: S.optional(S.Number),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findingsfilters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFindingsFilterRequest",
}) as any as S.Schema<CreateFindingsFilterRequest>;
export interface CreateFindingsFilterResponse {
  arn?: string;
  id?: string;
}
export const CreateFindingsFilterResponse = S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "CreateFindingsFilterResponse",
}) as any as S.Schema<CreateFindingsFilterResponse>;
export interface CreateInvitationsRequest {
  accountIds?: string[];
  disableEmailNotification?: boolean;
  message?: string;
}
export const CreateInvitationsRequest = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(__listOf__string),
    disableEmailNotification: S.optional(S.Boolean),
    message: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInvitationsRequest",
}) as any as S.Schema<CreateInvitationsRequest>;
export type ErrorCode = "ClientError" | "InternalError" | (string & {});
export const ErrorCode = S.String;
export interface UnprocessedAccount {
  accountId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export const UnprocessedAccount = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedAccount",
}) as any as S.Schema<UnprocessedAccount>;
export type __listOfUnprocessedAccount = UnprocessedAccount[];
export const __listOfUnprocessedAccount = S.Array(UnprocessedAccount);
export interface CreateInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export const CreateInvitationsResponse = S.suspend(() =>
  S.Struct({ unprocessedAccounts: S.optional(__listOfUnprocessedAccount) }),
).annotate({
  identifier: "CreateInvitationsResponse",
}) as any as S.Schema<CreateInvitationsResponse>;
export interface AccountDetail {
  accountId?: string;
  email?: string;
}
export const AccountDetail = S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String), email: S.optional(S.String) }),
).annotate({ identifier: "AccountDetail" }) as any as S.Schema<AccountDetail>;
export interface CreateMemberRequest {
  account?: AccountDetail;
  tags?: { [key: string]: string | undefined };
}
export const CreateMemberRequest = S.suspend(() =>
  S.Struct({
    account: S.optional(AccountDetail),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMemberRequest",
}) as any as S.Schema<CreateMemberRequest>;
export interface CreateMemberResponse {
  arn?: string;
}
export const CreateMemberResponse = S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateMemberResponse",
}) as any as S.Schema<CreateMemberResponse>;
export type FindingType =
  | "SensitiveData:S3Object/Multiple"
  | "SensitiveData:S3Object/Financial"
  | "SensitiveData:S3Object/Personal"
  | "SensitiveData:S3Object/Credentials"
  | "SensitiveData:S3Object/CustomIdentifier"
  | "Policy:IAMUser/S3BucketPublic"
  | "Policy:IAMUser/S3BucketSharedExternally"
  | "Policy:IAMUser/S3BucketReplicatedExternally"
  | "Policy:IAMUser/S3BucketEncryptionDisabled"
  | "Policy:IAMUser/S3BlockPublicAccessDisabled"
  | "Policy:IAMUser/S3BucketSharedWithCloudFront"
  | (string & {});
export const FindingType = S.String;
export type __listOfFindingType = FindingType[];
export const __listOfFindingType = S.Array(FindingType);
export interface CreateSampleFindingsRequest {
  findingTypes?: FindingType[];
}
export const CreateSampleFindingsRequest = S.suspend(() =>
  S.Struct({ findingTypes: S.optional(__listOfFindingType) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/sample" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSampleFindingsRequest",
}) as any as S.Schema<CreateSampleFindingsRequest>;
export interface CreateSampleFindingsResponse {}
export const CreateSampleFindingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateSampleFindingsResponse",
}) as any as S.Schema<CreateSampleFindingsResponse>;
export interface DeclineInvitationsRequest {
  accountIds?: string[];
}
export const DeclineInvitationsRequest = S.suspend(() =>
  S.Struct({ accountIds: S.optional(__listOf__string) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/decline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeclineInvitationsRequest",
}) as any as S.Schema<DeclineInvitationsRequest>;
export interface DeclineInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export const DeclineInvitationsResponse = S.suspend(() =>
  S.Struct({ unprocessedAccounts: S.optional(__listOfUnprocessedAccount) }),
).annotate({
  identifier: "DeclineInvitationsResponse",
}) as any as S.Schema<DeclineInvitationsResponse>;
export interface DeleteAllowListRequest {
  id: string;
  ignoreJobChecks?: string;
}
export const DeleteAllowListRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    ignoreJobChecks: S.optional(S.String).pipe(T.HttpQuery("ignoreJobChecks")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/allow-lists/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAllowListRequest",
}) as any as S.Schema<DeleteAllowListRequest>;
export interface DeleteAllowListResponse {}
export const DeleteAllowListResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteAllowListResponse",
}) as any as S.Schema<DeleteAllowListResponse>;
export interface DeleteCustomDataIdentifierRequest {
  id: string;
}
export const DeleteCustomDataIdentifierRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/custom-data-identifiers/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomDataIdentifierRequest",
}) as any as S.Schema<DeleteCustomDataIdentifierRequest>;
export interface DeleteCustomDataIdentifierResponse {}
export const DeleteCustomDataIdentifierResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomDataIdentifierResponse",
}) as any as S.Schema<DeleteCustomDataIdentifierResponse>;
export interface DeleteFindingsFilterRequest {
  id: string;
}
export const DeleteFindingsFilterRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/findingsfilters/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFindingsFilterRequest",
}) as any as S.Schema<DeleteFindingsFilterRequest>;
export interface DeleteFindingsFilterResponse {}
export const DeleteFindingsFilterResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFindingsFilterResponse",
}) as any as S.Schema<DeleteFindingsFilterResponse>;
export interface DeleteInvitationsRequest {
  accountIds?: string[];
}
export const DeleteInvitationsRequest = S.suspend(() =>
  S.Struct({ accountIds: S.optional(__listOf__string) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/invitations/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInvitationsRequest",
}) as any as S.Schema<DeleteInvitationsRequest>;
export interface DeleteInvitationsResponse {
  unprocessedAccounts?: UnprocessedAccount[];
}
export const DeleteInvitationsResponse = S.suspend(() =>
  S.Struct({ unprocessedAccounts: S.optional(__listOfUnprocessedAccount) }),
).annotate({
  identifier: "DeleteInvitationsResponse",
}) as any as S.Schema<DeleteInvitationsResponse>;
export interface DeleteMemberRequest {
  id: string;
}
export const DeleteMemberRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/members/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemberRequest",
}) as any as S.Schema<DeleteMemberRequest>;
export interface DeleteMemberResponse {}
export const DeleteMemberResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteMemberResponse",
}) as any as S.Schema<DeleteMemberResponse>;
export interface BucketCriteriaAdditionalProperties {
  eq?: string[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  neq?: string[];
  prefix?: string;
}
export const BucketCriteriaAdditionalProperties = S.suspend(() =>
  S.Struct({
    eq: S.optional(__listOf__string),
    gt: S.optional(S.Number),
    gte: S.optional(S.Number),
    lt: S.optional(S.Number),
    lte: S.optional(S.Number),
    neq: S.optional(__listOf__string),
    prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "BucketCriteriaAdditionalProperties",
}) as any as S.Schema<BucketCriteriaAdditionalProperties>;
export type BucketCriteria = {
  [key: string]: BucketCriteriaAdditionalProperties | undefined;
};
export const BucketCriteria = S.Record(
  S.String,
  BucketCriteriaAdditionalProperties.pipe(S.optional),
);
export type OrderBy = "ASC" | "DESC" | (string & {});
export const OrderBy = S.String;
export interface BucketSortCriteria {
  attributeName?: string;
  orderBy?: OrderBy;
}
export const BucketSortCriteria = S.suspend(() =>
  S.Struct({
    attributeName: S.optional(S.String),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "BucketSortCriteria",
}) as any as S.Schema<BucketSortCriteria>;
export interface DescribeBucketsRequest {
  criteria?: { [key: string]: BucketCriteriaAdditionalProperties | undefined };
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: BucketSortCriteria;
}
export const DescribeBucketsRequest = S.suspend(() =>
  S.Struct({
    criteria: S.optional(BucketCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(BucketSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasources/s3" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBucketsRequest",
}) as any as S.Schema<DescribeBucketsRequest>;
export type AllowsUnencryptedObjectUploads =
  | "TRUE"
  | "FALSE"
  | "UNKNOWN"
  | (string & {});
export const AllowsUnencryptedObjectUploads = S.String;
export type AutomatedDiscoveryMonitoringStatus =
  | "MONITORED"
  | "NOT_MONITORED"
  | (string & {});
export const AutomatedDiscoveryMonitoringStatus = S.String;
export type BucketMetadataErrorCode =
  | "ACCESS_DENIED"
  | "BUCKET_COUNT_EXCEEDS_QUOTA"
  | (string & {});
export const BucketMetadataErrorCode = S.String;
export type IsDefinedInJob = "TRUE" | "FALSE" | "UNKNOWN" | (string & {});
export const IsDefinedInJob = S.String;
export type IsMonitoredByJob = "TRUE" | "FALSE" | "UNKNOWN" | (string & {});
export const IsMonitoredByJob = S.String;
export interface JobDetails {
  isDefinedInJob?: IsDefinedInJob;
  isMonitoredByJob?: IsMonitoredByJob;
  lastJobId?: string;
  lastJobRunTime?: Date;
}
export const JobDetails = S.suspend(() =>
  S.Struct({
    isDefinedInJob: S.optional(IsDefinedInJob),
    isMonitoredByJob: S.optional(IsMonitoredByJob),
    lastJobId: S.optional(S.String),
    lastJobRunTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "JobDetails" }) as any as S.Schema<JobDetails>;
export interface ObjectCountByEncryptionType {
  customerManaged?: number;
  kmsManaged?: number;
  s3Managed?: number;
  unencrypted?: number;
  unknown?: number;
}
export const ObjectCountByEncryptionType = S.suspend(() =>
  S.Struct({
    customerManaged: S.optional(S.Number),
    kmsManaged: S.optional(S.Number),
    s3Managed: S.optional(S.Number),
    unencrypted: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "ObjectCountByEncryptionType",
}) as any as S.Schema<ObjectCountByEncryptionType>;
export type EffectivePermission =
  | "PUBLIC"
  | "NOT_PUBLIC"
  | "UNKNOWN"
  | (string & {});
export const EffectivePermission = S.String;
export interface BlockPublicAccess {
  blockPublicAcls?: boolean;
  blockPublicPolicy?: boolean;
  ignorePublicAcls?: boolean;
  restrictPublicBuckets?: boolean;
}
export const BlockPublicAccess = S.suspend(() =>
  S.Struct({
    blockPublicAcls: S.optional(S.Boolean),
    blockPublicPolicy: S.optional(S.Boolean),
    ignorePublicAcls: S.optional(S.Boolean),
    restrictPublicBuckets: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "BlockPublicAccess",
}) as any as S.Schema<BlockPublicAccess>;
export interface AccountLevelPermissions {
  blockPublicAccess?: BlockPublicAccess;
}
export const AccountLevelPermissions = S.suspend(() =>
  S.Struct({ blockPublicAccess: S.optional(BlockPublicAccess) }),
).annotate({
  identifier: "AccountLevelPermissions",
}) as any as S.Schema<AccountLevelPermissions>;
export interface AccessControlList {
  allowsPublicReadAccess?: boolean;
  allowsPublicWriteAccess?: boolean;
}
export const AccessControlList = S.suspend(() =>
  S.Struct({
    allowsPublicReadAccess: S.optional(S.Boolean),
    allowsPublicWriteAccess: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AccessControlList",
}) as any as S.Schema<AccessControlList>;
export interface BucketPolicy {
  allowsPublicReadAccess?: boolean;
  allowsPublicWriteAccess?: boolean;
}
export const BucketPolicy = S.suspend(() =>
  S.Struct({
    allowsPublicReadAccess: S.optional(S.Boolean),
    allowsPublicWriteAccess: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BucketPolicy" }) as any as S.Schema<BucketPolicy>;
export interface BucketLevelPermissions {
  accessControlList?: AccessControlList;
  blockPublicAccess?: BlockPublicAccess;
  bucketPolicy?: BucketPolicy;
}
export const BucketLevelPermissions = S.suspend(() =>
  S.Struct({
    accessControlList: S.optional(AccessControlList),
    blockPublicAccess: S.optional(BlockPublicAccess),
    bucketPolicy: S.optional(BucketPolicy),
  }),
).annotate({
  identifier: "BucketLevelPermissions",
}) as any as S.Schema<BucketLevelPermissions>;
export interface BucketPermissionConfiguration {
  accountLevelPermissions?: AccountLevelPermissions;
  bucketLevelPermissions?: BucketLevelPermissions;
}
export const BucketPermissionConfiguration = S.suspend(() =>
  S.Struct({
    accountLevelPermissions: S.optional(AccountLevelPermissions),
    bucketLevelPermissions: S.optional(BucketLevelPermissions),
  }),
).annotate({
  identifier: "BucketPermissionConfiguration",
}) as any as S.Schema<BucketPermissionConfiguration>;
export interface BucketPublicAccess {
  effectivePermission?: EffectivePermission;
  permissionConfiguration?: BucketPermissionConfiguration;
}
export const BucketPublicAccess = S.suspend(() =>
  S.Struct({
    effectivePermission: S.optional(EffectivePermission),
    permissionConfiguration: S.optional(BucketPermissionConfiguration),
  }),
).annotate({
  identifier: "BucketPublicAccess",
}) as any as S.Schema<BucketPublicAccess>;
export interface ReplicationDetails {
  replicated?: boolean;
  replicatedExternally?: boolean;
  replicationAccounts?: string[];
}
export const ReplicationDetails = S.suspend(() =>
  S.Struct({
    replicated: S.optional(S.Boolean),
    replicatedExternally: S.optional(S.Boolean),
    replicationAccounts: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "ReplicationDetails",
}) as any as S.Schema<ReplicationDetails>;
export type Type =
  | "NONE"
  | "AES256"
  | "aws:kms"
  | "aws:kms:dsse"
  | (string & {});
export const Type = S.String;
export interface BucketServerSideEncryption {
  kmsMasterKeyId?: string;
  type?: Type;
}
export const BucketServerSideEncryption = S.suspend(() =>
  S.Struct({ kmsMasterKeyId: S.optional(S.String), type: S.optional(Type) }),
).annotate({
  identifier: "BucketServerSideEncryption",
}) as any as S.Schema<BucketServerSideEncryption>;
export type SharedAccess =
  | "EXTERNAL"
  | "INTERNAL"
  | "NOT_SHARED"
  | "UNKNOWN"
  | (string & {});
export const SharedAccess = S.String;
export interface KeyValuePair {
  key?: string;
  value?: string;
}
export const KeyValuePair = S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "KeyValuePair" }) as any as S.Schema<KeyValuePair>;
export type __listOfKeyValuePair = KeyValuePair[];
export const __listOfKeyValuePair = S.Array(KeyValuePair);
export interface ObjectLevelStatistics {
  fileType?: number;
  storageClass?: number;
  total?: number;
}
export const ObjectLevelStatistics = S.suspend(() =>
  S.Struct({
    fileType: S.optional(S.Number),
    storageClass: S.optional(S.Number),
    total: S.optional(S.Number),
  }),
).annotate({
  identifier: "ObjectLevelStatistics",
}) as any as S.Schema<ObjectLevelStatistics>;
export interface BucketMetadata {
  accountId?: string;
  allowsUnencryptedObjectUploads?: AllowsUnencryptedObjectUploads;
  automatedDiscoveryMonitoringStatus?: AutomatedDiscoveryMonitoringStatus;
  bucketArn?: string;
  bucketCreatedAt?: Date;
  bucketName?: string;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  errorCode?: BucketMetadataErrorCode;
  errorMessage?: string;
  jobDetails?: JobDetails;
  lastAutomatedDiscoveryTime?: Date;
  lastUpdated?: Date;
  objectCount?: number;
  objectCountByEncryptionType?: ObjectCountByEncryptionType;
  publicAccess?: BucketPublicAccess;
  region?: string;
  replicationDetails?: ReplicationDetails;
  sensitivityScore?: number;
  serverSideEncryption?: BucketServerSideEncryption;
  sharedAccess?: SharedAccess;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  tags?: KeyValuePair[];
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
  versioning?: boolean;
}
export const BucketMetadata = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    allowsUnencryptedObjectUploads: S.optional(AllowsUnencryptedObjectUploads),
    automatedDiscoveryMonitoringStatus: S.optional(
      AutomatedDiscoveryMonitoringStatus,
    ),
    bucketArn: S.optional(S.String),
    bucketCreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    bucketName: S.optional(S.String),
    classifiableObjectCount: S.optional(S.Number),
    classifiableSizeInBytes: S.optional(S.Number),
    errorCode: S.optional(BucketMetadataErrorCode),
    errorMessage: S.optional(S.String),
    jobDetails: S.optional(JobDetails),
    lastAutomatedDiscoveryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    objectCount: S.optional(S.Number),
    objectCountByEncryptionType: S.optional(ObjectCountByEncryptionType),
    publicAccess: S.optional(BucketPublicAccess),
    region: S.optional(S.String),
    replicationDetails: S.optional(ReplicationDetails),
    sensitivityScore: S.optional(S.Number),
    serverSideEncryption: S.optional(BucketServerSideEncryption),
    sharedAccess: S.optional(SharedAccess),
    sizeInBytes: S.optional(S.Number),
    sizeInBytesCompressed: S.optional(S.Number),
    tags: S.optional(__listOfKeyValuePair),
    unclassifiableObjectCount: S.optional(ObjectLevelStatistics),
    unclassifiableObjectSizeInBytes: S.optional(ObjectLevelStatistics),
    versioning: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BucketMetadata" }) as any as S.Schema<BucketMetadata>;
export type __listOfBucketMetadata = BucketMetadata[];
export const __listOfBucketMetadata = S.Array(BucketMetadata);
export interface DescribeBucketsResponse {
  buckets?: BucketMetadata[];
  nextToken?: string;
}
export const DescribeBucketsResponse = S.suspend(() =>
  S.Struct({
    buckets: S.optional(__listOfBucketMetadata),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeBucketsResponse",
}) as any as S.Schema<DescribeBucketsResponse>;
export interface DescribeClassificationJobRequest {
  jobId: string;
}
export const DescribeClassificationJobRequest = S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClassificationJobRequest",
}) as any as S.Schema<DescribeClassificationJobRequest>;
export type JobStatus =
  | "RUNNING"
  | "PAUSED"
  | "CANCELLED"
  | "COMPLETE"
  | "IDLE"
  | "USER_PAUSED"
  | (string & {});
export const JobStatus = S.String;
export type LastRunErrorStatusCode = "NONE" | "ERROR" | (string & {});
export const LastRunErrorStatusCode = S.String;
export interface LastRunErrorStatus {
  code?: LastRunErrorStatusCode;
}
export const LastRunErrorStatus = S.suspend(() =>
  S.Struct({ code: S.optional(LastRunErrorStatusCode) }),
).annotate({
  identifier: "LastRunErrorStatus",
}) as any as S.Schema<LastRunErrorStatus>;
export interface Statistics {
  approximateNumberOfObjectsToProcess?: number;
  numberOfRuns?: number;
}
export const Statistics = S.suspend(() =>
  S.Struct({
    approximateNumberOfObjectsToProcess: S.optional(S.Number),
    numberOfRuns: S.optional(S.Number),
  }),
).annotate({ identifier: "Statistics" }) as any as S.Schema<Statistics>;
export interface UserPausedDetails {
  jobExpiresAt?: Date;
  jobImminentExpirationHealthEventArn?: string;
  jobPausedAt?: Date;
}
export const UserPausedDetails = S.suspend(() =>
  S.Struct({
    jobExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobImminentExpirationHealthEventArn: S.optional(S.String),
    jobPausedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UserPausedDetails",
}) as any as S.Schema<UserPausedDetails>;
export interface DescribeClassificationJobResponse {
  allowListIds?: string[];
  clientToken?: string;
  createdAt?: Date;
  customDataIdentifierIds?: string[];
  description?: string;
  initialRun?: boolean;
  jobArn?: string;
  jobId?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  lastRunErrorStatus?: LastRunErrorStatus;
  lastRunTime?: Date;
  managedDataIdentifierIds?: string[];
  managedDataIdentifierSelector?: ManagedDataIdentifierSelector;
  name?: string;
  s3JobDefinition?: S3JobDefinition & {
    bucketDefinitions: (S3BucketDefinitionForJob & {
      accountId: string;
      buckets: __listOf__string;
    })[];
  };
  samplingPercentage?: number;
  scheduleFrequency?: JobScheduleFrequency;
  statistics?: Statistics;
  tags?: { [key: string]: string | undefined };
  userPausedDetails?: UserPausedDetails;
}
export const DescribeClassificationJobResponse = S.suspend(() =>
  S.Struct({
    allowListIds: S.optional(__listOf__string),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    customDataIdentifierIds: S.optional(__listOf__string),
    description: S.optional(S.String),
    initialRun: S.optional(S.Boolean),
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    jobStatus: S.optional(JobStatus),
    jobType: S.optional(JobType),
    lastRunErrorStatus: S.optional(LastRunErrorStatus),
    lastRunTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    managedDataIdentifierIds: S.optional(__listOf__string),
    managedDataIdentifierSelector: S.optional(ManagedDataIdentifierSelector),
    name: S.optional(S.String),
    s3JobDefinition: S.optional(S3JobDefinition),
    samplingPercentage: S.optional(S.Number),
    scheduleFrequency: S.optional(JobScheduleFrequency),
    statistics: S.optional(Statistics),
    tags: S.optional(TagMap),
    userPausedDetails: S.optional(UserPausedDetails),
  }),
).annotate({
  identifier: "DescribeClassificationJobResponse",
}) as any as S.Schema<DescribeClassificationJobResponse>;
export interface DescribeOrganizationConfigurationRequest {}
export const DescribeOrganizationConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/admin/configuration" }),
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
  autoEnable?: boolean;
  maxAccountLimitReached?: boolean;
}
export const DescribeOrganizationConfigurationResponse = S.suspend(() =>
  S.Struct({
    autoEnable: S.optional(S.Boolean),
    maxAccountLimitReached: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeOrganizationConfigurationResponse",
}) as any as S.Schema<DescribeOrganizationConfigurationResponse>;
export interface DisableMacieRequest {}
export const DisableMacieRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableMacieRequest",
}) as any as S.Schema<DisableMacieRequest>;
export interface DisableMacieResponse {}
export const DisableMacieResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DisableMacieResponse",
}) as any as S.Schema<DisableMacieResponse>;
export interface DisableOrganizationAdminAccountRequest {
  adminAccountId?: string;
}
export const DisableOrganizationAdminAccountRequest = S.suspend(() =>
  S.Struct({
    adminAccountId: S.optional(S.String).pipe(T.HttpQuery("adminAccountId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/admin" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
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
export interface DisassociateFromAdministratorAccountRequest {}
export const DisassociateFromAdministratorAccountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/administrator/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateFromAdministratorAccountRequest",
}) as any as S.Schema<DisassociateFromAdministratorAccountRequest>;
export interface DisassociateFromAdministratorAccountResponse {}
export const DisassociateFromAdministratorAccountResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateFromAdministratorAccountResponse",
}) as any as S.Schema<DisassociateFromAdministratorAccountResponse>;
export interface DisassociateFromMasterAccountRequest {}
export const DisassociateFromMasterAccountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/master/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateFromMasterAccountRequest",
}) as any as S.Schema<DisassociateFromMasterAccountRequest>;
export interface DisassociateFromMasterAccountResponse {}
export const DisassociateFromMasterAccountResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateFromMasterAccountResponse",
}) as any as S.Schema<DisassociateFromMasterAccountResponse>;
export interface DisassociateMemberRequest {
  id: string;
}
export const DisassociateMemberRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/disassociate/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMemberRequest",
}) as any as S.Schema<DisassociateMemberRequest>;
export interface DisassociateMemberResponse {}
export const DisassociateMemberResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberResponse",
}) as any as S.Schema<DisassociateMemberResponse>;
export type FindingPublishingFrequency =
  | "FIFTEEN_MINUTES"
  | "ONE_HOUR"
  | "SIX_HOURS"
  | (string & {});
export const FindingPublishingFrequency = S.String;
export type MacieStatus = "PAUSED" | "ENABLED" | (string & {});
export const MacieStatus = S.String;
export interface EnableMacieRequest {
  clientToken?: string;
  findingPublishingFrequency?: FindingPublishingFrequency;
  status?: MacieStatus;
}
export const EnableMacieRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    findingPublishingFrequency: S.optional(FindingPublishingFrequency),
    status: S.optional(MacieStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableMacieRequest",
}) as any as S.Schema<EnableMacieRequest>;
export interface EnableMacieResponse {}
export const EnableMacieResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "EnableMacieResponse",
}) as any as S.Schema<EnableMacieResponse>;
export interface EnableOrganizationAdminAccountRequest {
  adminAccountId?: string;
  clientToken?: string;
}
export const EnableOrganizationAdminAccountRequest = S.suspend(() =>
  S.Struct({
    adminAccountId: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/admin" }),
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
export interface GetAdministratorAccountRequest {}
export const GetAdministratorAccountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/administrator" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAdministratorAccountRequest",
}) as any as S.Schema<GetAdministratorAccountRequest>;
export type RelationshipStatus =
  | "Enabled"
  | "Paused"
  | "Invited"
  | "Created"
  | "Removed"
  | "Resigned"
  | "EmailVerificationInProgress"
  | "EmailVerificationFailed"
  | "RegionDisabled"
  | "AccountSuspended"
  | (string & {});
export const RelationshipStatus = S.String;
export interface Invitation {
  accountId?: string;
  invitationId?: string;
  invitedAt?: Date;
  relationshipStatus?: RelationshipStatus;
}
export const Invitation = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    invitationId: S.optional(S.String),
    invitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    relationshipStatus: S.optional(RelationshipStatus),
  }),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export interface GetAdministratorAccountResponse {
  administrator?: Invitation;
}
export const GetAdministratorAccountResponse = S.suspend(() =>
  S.Struct({ administrator: S.optional(Invitation) }),
).annotate({
  identifier: "GetAdministratorAccountResponse",
}) as any as S.Schema<GetAdministratorAccountResponse>;
export interface GetAllowListRequest {
  id: string;
}
export const GetAllowListRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/allow-lists/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAllowListRequest",
}) as any as S.Schema<GetAllowListRequest>;
export type AllowListStatusCode =
  | "OK"
  | "S3_OBJECT_NOT_FOUND"
  | "S3_USER_ACCESS_DENIED"
  | "S3_OBJECT_ACCESS_DENIED"
  | "S3_THROTTLED"
  | "S3_OBJECT_OVERSIZE"
  | "S3_OBJECT_EMPTY"
  | "UNKNOWN_ERROR"
  | (string & {});
export const AllowListStatusCode = S.String;
export interface AllowListStatus {
  code?: AllowListStatusCode;
  description?: string;
}
export const AllowListStatus = S.suspend(() =>
  S.Struct({
    code: S.optional(AllowListStatusCode),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AllowListStatus",
}) as any as S.Schema<AllowListStatus>;
export interface GetAllowListResponse {
  arn?: string;
  createdAt?: Date;
  criteria?: AllowListCriteria & {
    s3WordsList: S3WordsList & {
      bucketName: __stringMin3Max255PatternAZaZ093255;
      objectKey: __stringMin1Max1024PatternSS;
    };
  };
  description?: string;
  id?: string;
  name?: string;
  status?: AllowListStatus & { code: AllowListStatusCode };
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const GetAllowListResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    criteria: S.optional(AllowListCriteria),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(AllowListStatus),
    tags: S.optional(TagMap),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAllowListResponse",
}) as any as S.Schema<GetAllowListResponse>;
export interface GetAutomatedDiscoveryConfigurationRequest {}
export const GetAutomatedDiscoveryConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/automated-discovery/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAutomatedDiscoveryConfigurationRequest",
}) as any as S.Schema<GetAutomatedDiscoveryConfigurationRequest>;
export type AutoEnableMode = "ALL" | "NEW" | "NONE" | (string & {});
export const AutoEnableMode = S.String;
export type AutomatedDiscoveryStatus = "ENABLED" | "DISABLED" | (string & {});
export const AutomatedDiscoveryStatus = S.String;
export interface GetAutomatedDiscoveryConfigurationResponse {
  autoEnableOrganizationMembers?: AutoEnableMode;
  classificationScopeId?: string;
  disabledAt?: Date;
  firstEnabledAt?: Date;
  lastUpdatedAt?: Date;
  sensitivityInspectionTemplateId?: string;
  status?: AutomatedDiscoveryStatus;
}
export const GetAutomatedDiscoveryConfigurationResponse = S.suspend(() =>
  S.Struct({
    autoEnableOrganizationMembers: S.optional(AutoEnableMode),
    classificationScopeId: S.optional(S.String),
    disabledAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    firstEnabledAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sensitivityInspectionTemplateId: S.optional(S.String),
    status: S.optional(AutomatedDiscoveryStatus),
  }),
).annotate({
  identifier: "GetAutomatedDiscoveryConfigurationResponse",
}) as any as S.Schema<GetAutomatedDiscoveryConfigurationResponse>;
export interface GetBucketStatisticsRequest {
  accountId?: string;
}
export const GetBucketStatisticsRequest = S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasources/s3/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketStatisticsRequest",
}) as any as S.Schema<GetBucketStatisticsRequest>;
export interface BucketCountByEffectivePermission {
  publiclyAccessible?: number;
  publiclyReadable?: number;
  publiclyWritable?: number;
  unknown?: number;
}
export const BucketCountByEffectivePermission = S.suspend(() =>
  S.Struct({
    publiclyAccessible: S.optional(S.Number),
    publiclyReadable: S.optional(S.Number),
    publiclyWritable: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountByEffectivePermission",
}) as any as S.Schema<BucketCountByEffectivePermission>;
export interface BucketCountByEncryptionType {
  kmsManaged?: number;
  s3Managed?: number;
  unencrypted?: number;
  unknown?: number;
}
export const BucketCountByEncryptionType = S.suspend(() =>
  S.Struct({
    kmsManaged: S.optional(S.Number),
    s3Managed: S.optional(S.Number),
    unencrypted: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountByEncryptionType",
}) as any as S.Schema<BucketCountByEncryptionType>;
export interface BucketCountPolicyAllowsUnencryptedObjectUploads {
  allowsUnencryptedObjectUploads?: number;
  deniesUnencryptedObjectUploads?: number;
  unknown?: number;
}
export const BucketCountPolicyAllowsUnencryptedObjectUploads = S.suspend(() =>
  S.Struct({
    allowsUnencryptedObjectUploads: S.optional(S.Number),
    deniesUnencryptedObjectUploads: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountPolicyAllowsUnencryptedObjectUploads",
}) as any as S.Schema<BucketCountPolicyAllowsUnencryptedObjectUploads>;
export interface BucketCountBySharedAccessType {
  external?: number;
  internal?: number;
  notShared?: number;
  unknown?: number;
}
export const BucketCountBySharedAccessType = S.suspend(() =>
  S.Struct({
    external: S.optional(S.Number),
    internal: S.optional(S.Number),
    notShared: S.optional(S.Number),
    unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "BucketCountBySharedAccessType",
}) as any as S.Schema<BucketCountBySharedAccessType>;
export interface SensitivityAggregations {
  classifiableSizeInBytes?: number;
  publiclyAccessibleCount?: number;
  totalCount?: number;
  totalSizeInBytes?: number;
}
export const SensitivityAggregations = S.suspend(() =>
  S.Struct({
    classifiableSizeInBytes: S.optional(S.Number),
    publiclyAccessibleCount: S.optional(S.Number),
    totalCount: S.optional(S.Number),
    totalSizeInBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "SensitivityAggregations",
}) as any as S.Schema<SensitivityAggregations>;
export interface BucketStatisticsBySensitivity {
  classificationError?: SensitivityAggregations;
  notClassified?: SensitivityAggregations;
  notSensitive?: SensitivityAggregations;
  sensitive?: SensitivityAggregations;
}
export const BucketStatisticsBySensitivity = S.suspend(() =>
  S.Struct({
    classificationError: S.optional(SensitivityAggregations),
    notClassified: S.optional(SensitivityAggregations),
    notSensitive: S.optional(SensitivityAggregations),
    sensitive: S.optional(SensitivityAggregations),
  }),
).annotate({
  identifier: "BucketStatisticsBySensitivity",
}) as any as S.Schema<BucketStatisticsBySensitivity>;
export interface GetBucketStatisticsResponse {
  bucketCount?: number;
  bucketCountByEffectivePermission?: BucketCountByEffectivePermission;
  bucketCountByEncryptionType?: BucketCountByEncryptionType;
  bucketCountByObjectEncryptionRequirement?: BucketCountPolicyAllowsUnencryptedObjectUploads;
  bucketCountBySharedAccessType?: BucketCountBySharedAccessType;
  bucketStatisticsBySensitivity?: BucketStatisticsBySensitivity;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  lastUpdated?: Date;
  objectCount?: number;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
}
export const GetBucketStatisticsResponse = S.suspend(() =>
  S.Struct({
    bucketCount: S.optional(S.Number),
    bucketCountByEffectivePermission: S.optional(
      BucketCountByEffectivePermission,
    ),
    bucketCountByEncryptionType: S.optional(BucketCountByEncryptionType),
    bucketCountByObjectEncryptionRequirement: S.optional(
      BucketCountPolicyAllowsUnencryptedObjectUploads,
    ),
    bucketCountBySharedAccessType: S.optional(BucketCountBySharedAccessType),
    bucketStatisticsBySensitivity: S.optional(BucketStatisticsBySensitivity),
    classifiableObjectCount: S.optional(S.Number),
    classifiableSizeInBytes: S.optional(S.Number),
    lastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    objectCount: S.optional(S.Number),
    sizeInBytes: S.optional(S.Number),
    sizeInBytesCompressed: S.optional(S.Number),
    unclassifiableObjectCount: S.optional(ObjectLevelStatistics),
    unclassifiableObjectSizeInBytes: S.optional(ObjectLevelStatistics),
  }),
).annotate({
  identifier: "GetBucketStatisticsResponse",
}) as any as S.Schema<GetBucketStatisticsResponse>;
export interface GetClassificationExportConfigurationRequest {}
export const GetClassificationExportConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/classification-export-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClassificationExportConfigurationRequest",
}) as any as S.Schema<GetClassificationExportConfigurationRequest>;
export interface S3Destination {
  bucketName?: string;
  keyPrefix?: string;
  kmsKeyArn?: string;
}
export const S3Destination = S.suspend(() =>
  S.Struct({
    bucketName: S.optional(S.String),
    keyPrefix: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface ClassificationExportConfiguration {
  s3Destination?: S3Destination;
}
export const ClassificationExportConfiguration = S.suspend(() =>
  S.Struct({ s3Destination: S.optional(S3Destination) }),
).annotate({
  identifier: "ClassificationExportConfiguration",
}) as any as S.Schema<ClassificationExportConfiguration>;
export interface GetClassificationExportConfigurationResponse {
  configuration?: ClassificationExportConfiguration & {
    s3Destination: S3Destination & { bucketName: string; kmsKeyArn: string };
  };
}
export const GetClassificationExportConfigurationResponse = S.suspend(() =>
  S.Struct({ configuration: S.optional(ClassificationExportConfiguration) }),
).annotate({
  identifier: "GetClassificationExportConfigurationResponse",
}) as any as S.Schema<GetClassificationExportConfigurationResponse>;
export interface GetClassificationScopeRequest {
  id: string;
}
export const GetClassificationScopeRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/classification-scopes/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClassificationScopeRequest",
}) as any as S.Schema<GetClassificationScopeRequest>;
export type __listOfS3BucketName = string[];
export const __listOfS3BucketName = S.Array(S.String);
export interface S3ClassificationScopeExclusion {
  bucketNames?: string[];
}
export const S3ClassificationScopeExclusion = S.suspend(() =>
  S.Struct({ bucketNames: S.optional(__listOfS3BucketName) }),
).annotate({
  identifier: "S3ClassificationScopeExclusion",
}) as any as S.Schema<S3ClassificationScopeExclusion>;
export interface S3ClassificationScope {
  excludes?: S3ClassificationScopeExclusion;
}
export const S3ClassificationScope = S.suspend(() =>
  S.Struct({ excludes: S.optional(S3ClassificationScopeExclusion) }),
).annotate({
  identifier: "S3ClassificationScope",
}) as any as S.Schema<S3ClassificationScope>;
export interface GetClassificationScopeResponse {
  id?: string;
  name?: string;
  s3?: S3ClassificationScope & {
    excludes: S3ClassificationScopeExclusion & {
      bucketNames: __listOfS3BucketName;
    };
  };
}
export const GetClassificationScopeResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    s3: S.optional(S3ClassificationScope),
  }),
).annotate({
  identifier: "GetClassificationScopeResponse",
}) as any as S.Schema<GetClassificationScopeResponse>;
export interface GetCustomDataIdentifierRequest {
  id: string;
}
export const GetCustomDataIdentifierRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-data-identifiers/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCustomDataIdentifierRequest",
}) as any as S.Schema<GetCustomDataIdentifierRequest>;
export interface GetCustomDataIdentifierResponse {
  arn?: string;
  createdAt?: Date;
  deleted?: boolean;
  description?: string;
  id?: string;
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  name?: string;
  regex?: string;
  severityLevels?: (SeverityLevel & {
    occurrencesThreshold: number;
    severity: DataIdentifierSeverity;
  })[];
  tags?: { [key: string]: string | undefined };
}
export const GetCustomDataIdentifierResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    deleted: S.optional(S.Boolean),
    description: S.optional(S.String),
    id: S.optional(S.String),
    ignoreWords: S.optional(__listOf__string),
    keywords: S.optional(__listOf__string),
    maximumMatchDistance: S.optional(S.Number),
    name: S.optional(S.String),
    regex: S.optional(S.String),
    severityLevels: S.optional(SeverityLevelList),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetCustomDataIdentifierResponse",
}) as any as S.Schema<GetCustomDataIdentifierResponse>;
export interface SortCriteria {
  attributeName?: string;
  orderBy?: OrderBy;
}
export const SortCriteria = S.suspend(() =>
  S.Struct({
    attributeName: S.optional(S.String),
    orderBy: S.optional(OrderBy),
  }),
).annotate({ identifier: "SortCriteria" }) as any as S.Schema<SortCriteria>;
export interface GetFindingsRequest {
  findingIds?: string[];
  sortCriteria?: SortCriteria;
}
export const GetFindingsRequest = S.suspend(() =>
  S.Struct({
    findingIds: S.optional(__listOf__string),
    sortCriteria: S.optional(SortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/describe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsRequest",
}) as any as S.Schema<GetFindingsRequest>;
export type FindingCategory = "CLASSIFICATION" | "POLICY" | (string & {});
export const FindingCategory = S.String;
export type OriginType =
  | "SENSITIVE_DATA_DISCOVERY_JOB"
  | "AUTOMATED_SENSITIVE_DATA_DISCOVERY"
  | (string & {});
export const OriginType = S.String;
export interface Cell {
  cellReference?: string;
  column?: number;
  columnName?: string;
  row?: number;
}
export const Cell = S.suspend(() =>
  S.Struct({
    cellReference: S.optional(S.String),
    column: S.optional(S.Number),
    columnName: S.optional(S.String),
    row: S.optional(S.Number),
  }),
).annotate({ identifier: "Cell" }) as any as S.Schema<Cell>;
export type Cells = Cell[];
export const Cells = S.Array(Cell);
export interface Range {
  end?: number;
  start?: number;
  startColumn?: number;
}
export const Range = S.suspend(() =>
  S.Struct({
    end: S.optional(S.Number),
    start: S.optional(S.Number),
    startColumn: S.optional(S.Number),
  }),
).annotate({ identifier: "Range" }) as any as S.Schema<Range>;
export type Ranges = Range[];
export const Ranges = S.Array(Range);
export interface Page {
  lineRange?: Range;
  offsetRange?: Range;
  pageNumber?: number;
}
export const Page = S.suspend(() =>
  S.Struct({
    lineRange: S.optional(Range),
    offsetRange: S.optional(Range),
    pageNumber: S.optional(S.Number),
  }),
).annotate({ identifier: "Page" }) as any as S.Schema<Page>;
export type Pages = Page[];
export const Pages = S.Array(Page);
export interface Record {
  jsonPath?: string;
  recordIndex?: number;
}
export const Record = S.suspend(() =>
  S.Struct({
    jsonPath: S.optional(S.String),
    recordIndex: S.optional(S.Number),
  }),
).annotate({ identifier: "Record" }) as any as S.Schema<Record>;
export type Records = Record[];
export const Records = S.Array(Record);
export interface Occurrences {
  cells?: Cell[];
  lineRanges?: Range[];
  offsetRanges?: Range[];
  pages?: Page[];
  records?: Record[];
}
export const Occurrences = S.suspend(() =>
  S.Struct({
    cells: S.optional(Cells),
    lineRanges: S.optional(Ranges),
    offsetRanges: S.optional(Ranges),
    pages: S.optional(Pages),
    records: S.optional(Records),
  }),
).annotate({ identifier: "Occurrences" }) as any as S.Schema<Occurrences>;
export interface CustomDetection {
  arn?: string;
  count?: number;
  name?: string;
  occurrences?: Occurrences;
}
export const CustomDetection = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    count: S.optional(S.Number),
    name: S.optional(S.String),
    occurrences: S.optional(Occurrences),
  }),
).annotate({
  identifier: "CustomDetection",
}) as any as S.Schema<CustomDetection>;
export type CustomDetections = CustomDetection[];
export const CustomDetections = S.Array(CustomDetection);
export interface CustomDataIdentifiers {
  detections?: CustomDetection[];
  totalCount?: number;
}
export const CustomDataIdentifiers = S.suspend(() =>
  S.Struct({
    detections: S.optional(CustomDetections),
    totalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "CustomDataIdentifiers",
}) as any as S.Schema<CustomDataIdentifiers>;
export type SensitiveDataItemCategory =
  | "FINANCIAL_INFORMATION"
  | "PERSONAL_INFORMATION"
  | "CREDENTIALS"
  | "CUSTOM_IDENTIFIER"
  | (string & {});
export const SensitiveDataItemCategory = S.String;
export interface DefaultDetection {
  count?: number;
  occurrences?: Occurrences;
  type?: string;
}
export const DefaultDetection = S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    occurrences: S.optional(Occurrences),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultDetection",
}) as any as S.Schema<DefaultDetection>;
export type DefaultDetections = DefaultDetection[];
export const DefaultDetections = S.Array(DefaultDetection);
export interface SensitiveDataItem {
  category?: SensitiveDataItemCategory;
  detections?: DefaultDetection[];
  totalCount?: number;
}
export const SensitiveDataItem = S.suspend(() =>
  S.Struct({
    category: S.optional(SensitiveDataItemCategory),
    detections: S.optional(DefaultDetections),
    totalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SensitiveDataItem",
}) as any as S.Schema<SensitiveDataItem>;
export type SensitiveData = SensitiveDataItem[];
export const SensitiveData = S.Array(SensitiveDataItem);
export interface ClassificationResultStatus {
  code?: string;
  reason?: string;
}
export const ClassificationResultStatus = S.suspend(() =>
  S.Struct({ code: S.optional(S.String), reason: S.optional(S.String) }),
).annotate({
  identifier: "ClassificationResultStatus",
}) as any as S.Schema<ClassificationResultStatus>;
export interface ClassificationResult {
  additionalOccurrences?: boolean;
  customDataIdentifiers?: CustomDataIdentifiers;
  mimeType?: string;
  sensitiveData?: SensitiveDataItem[];
  sizeClassified?: number;
  status?: ClassificationResultStatus;
}
export const ClassificationResult = S.suspend(() =>
  S.Struct({
    additionalOccurrences: S.optional(S.Boolean),
    customDataIdentifiers: S.optional(CustomDataIdentifiers),
    mimeType: S.optional(S.String),
    sensitiveData: S.optional(SensitiveData),
    sizeClassified: S.optional(S.Number),
    status: S.optional(ClassificationResultStatus),
  }),
).annotate({
  identifier: "ClassificationResult",
}) as any as S.Schema<ClassificationResult>;
export interface ClassificationDetails {
  detailedResultsLocation?: string;
  jobArn?: string;
  jobId?: string;
  originType?: OriginType;
  result?: ClassificationResult;
}
export const ClassificationDetails = S.suspend(() =>
  S.Struct({
    detailedResultsLocation: S.optional(S.String),
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    originType: S.optional(OriginType),
    result: S.optional(ClassificationResult),
  }),
).annotate({
  identifier: "ClassificationDetails",
}) as any as S.Schema<ClassificationDetails>;
export type FindingActionType = "AWS_API_CALL" | (string & {});
export const FindingActionType = S.String;
export interface ApiCallDetails {
  api?: string;
  apiServiceName?: string;
  firstSeen?: Date;
  lastSeen?: Date;
}
export const ApiCallDetails = S.suspend(() =>
  S.Struct({
    api: S.optional(S.String),
    apiServiceName: S.optional(S.String),
    firstSeen: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastSeen: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "ApiCallDetails" }) as any as S.Schema<ApiCallDetails>;
export interface FindingAction {
  actionType?: FindingActionType;
  apiCallDetails?: ApiCallDetails;
}
export const FindingAction = S.suspend(() =>
  S.Struct({
    actionType: S.optional(FindingActionType),
    apiCallDetails: S.optional(ApiCallDetails),
  }),
).annotate({ identifier: "FindingAction" }) as any as S.Schema<FindingAction>;
export interface DomainDetails {
  domainName?: string;
}
export const DomainDetails = S.suspend(() =>
  S.Struct({ domainName: S.optional(S.String) }),
).annotate({ identifier: "DomainDetails" }) as any as S.Schema<DomainDetails>;
export interface IpCity {
  name?: string;
}
export const IpCity = S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "IpCity" }) as any as S.Schema<IpCity>;
export interface IpCountry {
  code?: string;
  name?: string;
}
export const IpCountry = S.suspend(() =>
  S.Struct({ code: S.optional(S.String), name: S.optional(S.String) }),
).annotate({ identifier: "IpCountry" }) as any as S.Schema<IpCountry>;
export interface IpGeoLocation {
  lat?: number;
  lon?: number;
}
export const IpGeoLocation = S.suspend(() =>
  S.Struct({ lat: S.optional(S.Number), lon: S.optional(S.Number) }),
).annotate({ identifier: "IpGeoLocation" }) as any as S.Schema<IpGeoLocation>;
export interface IpOwner {
  asn?: string;
  asnOrg?: string;
  isp?: string;
  org?: string;
}
export const IpOwner = S.suspend(() =>
  S.Struct({
    asn: S.optional(S.String),
    asnOrg: S.optional(S.String),
    isp: S.optional(S.String),
    org: S.optional(S.String),
  }),
).annotate({ identifier: "IpOwner" }) as any as S.Schema<IpOwner>;
export interface IpAddressDetails {
  ipAddressV4?: string;
  ipCity?: IpCity;
  ipCountry?: IpCountry;
  ipGeoLocation?: IpGeoLocation;
  ipOwner?: IpOwner;
}
export const IpAddressDetails = S.suspend(() =>
  S.Struct({
    ipAddressV4: S.optional(S.String),
    ipCity: S.optional(IpCity),
    ipCountry: S.optional(IpCountry),
    ipGeoLocation: S.optional(IpGeoLocation),
    ipOwner: S.optional(IpOwner),
  }),
).annotate({
  identifier: "IpAddressDetails",
}) as any as S.Schema<IpAddressDetails>;
export interface SessionContextAttributes {
  creationDate?: Date;
  mfaAuthenticated?: boolean;
}
export const SessionContextAttributes = S.suspend(() =>
  S.Struct({
    creationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    mfaAuthenticated: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SessionContextAttributes",
}) as any as S.Schema<SessionContextAttributes>;
export interface SessionIssuer {
  accountId?: string;
  arn?: string;
  principalId?: string;
  type?: string;
  userName?: string;
}
export const SessionIssuer = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    type: S.optional(S.String),
    userName: S.optional(S.String),
  }),
).annotate({ identifier: "SessionIssuer" }) as any as S.Schema<SessionIssuer>;
export interface SessionContext {
  attributes?: SessionContextAttributes;
  sessionIssuer?: SessionIssuer;
}
export const SessionContext = S.suspend(() =>
  S.Struct({
    attributes: S.optional(SessionContextAttributes),
    sessionIssuer: S.optional(SessionIssuer),
  }),
).annotate({ identifier: "SessionContext" }) as any as S.Schema<SessionContext>;
export interface AssumedRole {
  accessKeyId?: string;
  accountId?: string;
  arn?: string;
  principalId?: string;
  sessionContext?: SessionContext;
}
export const AssumedRole = S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    sessionContext: S.optional(SessionContext),
  }),
).annotate({ identifier: "AssumedRole" }) as any as S.Schema<AssumedRole>;
export interface AwsAccount {
  accountId?: string;
  principalId?: string;
}
export const AwsAccount = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    principalId: S.optional(S.String),
  }),
).annotate({ identifier: "AwsAccount" }) as any as S.Schema<AwsAccount>;
export interface AwsService {
  invokedBy?: string;
}
export const AwsService = S.suspend(() =>
  S.Struct({ invokedBy: S.optional(S.String) }),
).annotate({ identifier: "AwsService" }) as any as S.Schema<AwsService>;
export interface FederatedUser {
  accessKeyId?: string;
  accountId?: string;
  arn?: string;
  principalId?: string;
  sessionContext?: SessionContext;
}
export const FederatedUser = S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    sessionContext: S.optional(SessionContext),
  }),
).annotate({ identifier: "FederatedUser" }) as any as S.Schema<FederatedUser>;
export interface IamUser {
  accountId?: string;
  arn?: string;
  principalId?: string;
  userName?: string;
}
export const IamUser = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    userName: S.optional(S.String),
  }),
).annotate({ identifier: "IamUser" }) as any as S.Schema<IamUser>;
export interface UserIdentityRoot {
  accountId?: string;
  arn?: string;
  principalId?: string;
}
export const UserIdentityRoot = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
  }),
).annotate({
  identifier: "UserIdentityRoot",
}) as any as S.Schema<UserIdentityRoot>;
export type UserIdentityType =
  | "AssumedRole"
  | "IAMUser"
  | "FederatedUser"
  | "Root"
  | "AWSAccount"
  | "AWSService"
  | (string & {});
export const UserIdentityType = S.String;
export interface UserIdentity {
  assumedRole?: AssumedRole;
  awsAccount?: AwsAccount;
  awsService?: AwsService;
  federatedUser?: FederatedUser;
  iamUser?: IamUser;
  root?: UserIdentityRoot;
  type?: UserIdentityType;
}
export const UserIdentity = S.suspend(() =>
  S.Struct({
    assumedRole: S.optional(AssumedRole),
    awsAccount: S.optional(AwsAccount),
    awsService: S.optional(AwsService),
    federatedUser: S.optional(FederatedUser),
    iamUser: S.optional(IamUser),
    root: S.optional(UserIdentityRoot),
    type: S.optional(UserIdentityType),
  }),
).annotate({ identifier: "UserIdentity" }) as any as S.Schema<UserIdentity>;
export interface FindingActor {
  domainDetails?: DomainDetails;
  ipAddressDetails?: IpAddressDetails;
  userIdentity?: UserIdentity;
}
export const FindingActor = S.suspend(() =>
  S.Struct({
    domainDetails: S.optional(DomainDetails),
    ipAddressDetails: S.optional(IpAddressDetails),
    userIdentity: S.optional(UserIdentity),
  }),
).annotate({ identifier: "FindingActor" }) as any as S.Schema<FindingActor>;
export interface PolicyDetails {
  action?: FindingAction;
  actor?: FindingActor;
}
export const PolicyDetails = S.suspend(() =>
  S.Struct({
    action: S.optional(FindingAction),
    actor: S.optional(FindingActor),
  }),
).annotate({ identifier: "PolicyDetails" }) as any as S.Schema<PolicyDetails>;
export type EncryptionType =
  | "NONE"
  | "AES256"
  | "aws:kms"
  | "UNKNOWN"
  | "aws:kms:dsse"
  | (string & {});
export const EncryptionType = S.String;
export interface ServerSideEncryption {
  encryptionType?: EncryptionType;
  kmsMasterKeyId?: string;
}
export const ServerSideEncryption = S.suspend(() =>
  S.Struct({
    encryptionType: S.optional(EncryptionType),
    kmsMasterKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerSideEncryption",
}) as any as S.Schema<ServerSideEncryption>;
export interface S3BucketOwner {
  displayName?: string;
  id?: string;
}
export const S3BucketOwner = S.suspend(() =>
  S.Struct({ displayName: S.optional(S.String), id: S.optional(S.String) }),
).annotate({ identifier: "S3BucketOwner" }) as any as S.Schema<S3BucketOwner>;
export type KeyValuePairList = KeyValuePair[];
export const KeyValuePairList = S.Array(KeyValuePair);
export interface S3Bucket {
  allowsUnencryptedObjectUploads?: AllowsUnencryptedObjectUploads;
  arn?: string;
  createdAt?: Date;
  defaultServerSideEncryption?: ServerSideEncryption;
  name?: string;
  owner?: S3BucketOwner;
  publicAccess?: BucketPublicAccess;
  tags?: KeyValuePair[];
}
export const S3Bucket = S.suspend(() =>
  S.Struct({
    allowsUnencryptedObjectUploads: S.optional(AllowsUnencryptedObjectUploads),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    defaultServerSideEncryption: S.optional(ServerSideEncryption),
    name: S.optional(S.String),
    owner: S.optional(S3BucketOwner),
    publicAccess: S.optional(BucketPublicAccess),
    tags: S.optional(KeyValuePairList),
  }),
).annotate({ identifier: "S3Bucket" }) as any as S.Schema<S3Bucket>;
export type StorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "ONEZONE_IA"
  | "GLACIER"
  | "GLACIER_IR"
  | "OUTPOSTS"
  | (string & {});
export const StorageClass = S.String;
export interface S3Object {
  bucketArn?: string;
  eTag?: string;
  extension?: string;
  key?: string;
  lastModified?: Date;
  path?: string;
  publicAccess?: boolean;
  serverSideEncryption?: ServerSideEncryption;
  size?: number;
  storageClass?: StorageClass;
  tags?: KeyValuePair[];
  versionId?: string;
}
export const S3Object = S.suspend(() =>
  S.Struct({
    bucketArn: S.optional(S.String),
    eTag: S.optional(S.String),
    extension: S.optional(S.String),
    key: S.optional(S.String),
    lastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    path: S.optional(S.String),
    publicAccess: S.optional(S.Boolean),
    serverSideEncryption: S.optional(ServerSideEncryption),
    size: S.optional(S.Number),
    storageClass: S.optional(StorageClass),
    tags: S.optional(KeyValuePairList),
    versionId: S.optional(S.String),
  }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export interface ResourcesAffected {
  s3Bucket?: S3Bucket;
  s3Object?: S3Object;
}
export const ResourcesAffected = S.suspend(() =>
  S.Struct({ s3Bucket: S.optional(S3Bucket), s3Object: S.optional(S3Object) }),
).annotate({
  identifier: "ResourcesAffected",
}) as any as S.Schema<ResourcesAffected>;
export type SeverityDescription = "Low" | "Medium" | "High" | (string & {});
export const SeverityDescription = S.String;
export interface Severity {
  description?: SeverityDescription;
  score?: number;
}
export const Severity = S.suspend(() =>
  S.Struct({
    description: S.optional(SeverityDescription),
    score: S.optional(S.Number),
  }),
).annotate({ identifier: "Severity" }) as any as S.Schema<Severity>;
export interface Finding {
  accountId?: string;
  archived?: boolean;
  category?: FindingCategory;
  classificationDetails?: ClassificationDetails;
  count?: number;
  createdAt?: Date;
  description?: string;
  id?: string;
  partition?: string;
  policyDetails?: PolicyDetails;
  region?: string;
  resourcesAffected?: ResourcesAffected;
  sample?: boolean;
  schemaVersion?: string;
  severity?: Severity;
  title?: string;
  type?: FindingType;
  updatedAt?: Date;
}
export const Finding = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    archived: S.optional(S.Boolean),
    category: S.optional(FindingCategory),
    classificationDetails: S.optional(ClassificationDetails),
    count: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    partition: S.optional(S.String),
    policyDetails: S.optional(PolicyDetails),
    region: S.optional(S.String),
    resourcesAffected: S.optional(ResourcesAffected),
    sample: S.optional(S.Boolean),
    schemaVersion: S.optional(S.String),
    severity: S.optional(Severity),
    title: S.optional(S.String),
    type: S.optional(FindingType),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type __listOfFinding = Finding[];
export const __listOfFinding = S.Array(Finding);
export interface GetFindingsResponse {
  findings?: Finding[];
}
export const GetFindingsResponse = S.suspend(() =>
  S.Struct({ findings: S.optional(__listOfFinding) }),
).annotate({
  identifier: "GetFindingsResponse",
}) as any as S.Schema<GetFindingsResponse>;
export interface GetFindingsFilterRequest {
  id: string;
}
export const GetFindingsFilterRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findingsfilters/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsFilterRequest",
}) as any as S.Schema<GetFindingsFilterRequest>;
export interface GetFindingsFilterResponse {
  action?: FindingsFilterAction;
  arn?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  id?: string;
  name?: string;
  position?: number;
  tags?: { [key: string]: string | undefined };
}
export const GetFindingsFilterResponse = S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    arn: S.optional(S.String),
    description: S.optional(S.String),
    findingCriteria: S.optional(FindingCriteria),
    id: S.optional(S.String),
    name: S.optional(S.String),
    position: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetFindingsFilterResponse",
}) as any as S.Schema<GetFindingsFilterResponse>;
export interface GetFindingsPublicationConfigurationRequest {}
export const GetFindingsPublicationConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findings-publication-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsPublicationConfigurationRequest",
}) as any as S.Schema<GetFindingsPublicationConfigurationRequest>;
export interface SecurityHubConfiguration {
  publishClassificationFindings?: boolean;
  publishPolicyFindings?: boolean;
}
export const SecurityHubConfiguration = S.suspend(() =>
  S.Struct({
    publishClassificationFindings: S.optional(S.Boolean),
    publishPolicyFindings: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SecurityHubConfiguration",
}) as any as S.Schema<SecurityHubConfiguration>;
export interface GetFindingsPublicationConfigurationResponse {
  securityHubConfiguration?: SecurityHubConfiguration & {
    publishClassificationFindings: boolean;
    publishPolicyFindings: boolean;
  };
}
export const GetFindingsPublicationConfigurationResponse = S.suspend(() =>
  S.Struct({ securityHubConfiguration: S.optional(SecurityHubConfiguration) }),
).annotate({
  identifier: "GetFindingsPublicationConfigurationResponse",
}) as any as S.Schema<GetFindingsPublicationConfigurationResponse>;
export type GroupBy =
  | "resourcesAffected.s3Bucket.name"
  | "type"
  | "classificationDetails.jobId"
  | "severity.description"
  | (string & {});
export const GroupBy = S.String;
export type FindingStatisticsSortAttributeName =
  | "groupKey"
  | "count"
  | (string & {});
export const FindingStatisticsSortAttributeName = S.String;
export interface FindingStatisticsSortCriteria {
  attributeName?: FindingStatisticsSortAttributeName;
  orderBy?: OrderBy;
}
export const FindingStatisticsSortCriteria = S.suspend(() =>
  S.Struct({
    attributeName: S.optional(FindingStatisticsSortAttributeName),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "FindingStatisticsSortCriteria",
}) as any as S.Schema<FindingStatisticsSortCriteria>;
export interface GetFindingStatisticsRequest {
  findingCriteria?: FindingCriteria;
  groupBy?: GroupBy;
  size?: number;
  sortCriteria?: FindingStatisticsSortCriteria;
}
export const GetFindingStatisticsRequest = S.suspend(() =>
  S.Struct({
    findingCriteria: S.optional(FindingCriteria),
    groupBy: S.optional(GroupBy),
    size: S.optional(S.Number),
    sortCriteria: S.optional(FindingStatisticsSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingStatisticsRequest",
}) as any as S.Schema<GetFindingStatisticsRequest>;
export interface GroupCount {
  count?: number;
  groupKey?: string;
}
export const GroupCount = S.suspend(() =>
  S.Struct({ count: S.optional(S.Number), groupKey: S.optional(S.String) }),
).annotate({ identifier: "GroupCount" }) as any as S.Schema<GroupCount>;
export type __listOfGroupCount = GroupCount[];
export const __listOfGroupCount = S.Array(GroupCount);
export interface GetFindingStatisticsResponse {
  countsByGroup?: GroupCount[];
}
export const GetFindingStatisticsResponse = S.suspend(() =>
  S.Struct({ countsByGroup: S.optional(__listOfGroupCount) }),
).annotate({
  identifier: "GetFindingStatisticsResponse",
}) as any as S.Schema<GetFindingStatisticsResponse>;
export interface GetInvitationsCountRequest {}
export const GetInvitationsCountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitations/count" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInvitationsCountRequest",
}) as any as S.Schema<GetInvitationsCountRequest>;
export interface GetInvitationsCountResponse {
  invitationsCount?: number;
}
export const GetInvitationsCountResponse = S.suspend(() =>
  S.Struct({ invitationsCount: S.optional(S.Number) }),
).annotate({
  identifier: "GetInvitationsCountResponse",
}) as any as S.Schema<GetInvitationsCountResponse>;
export interface GetMacieSessionRequest {}
export const GetMacieSessionRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMacieSessionRequest",
}) as any as S.Schema<GetMacieSessionRequest>;
export interface GetMacieSessionResponse {
  createdAt?: Date;
  findingPublishingFrequency?: FindingPublishingFrequency;
  serviceRole?: string;
  status?: MacieStatus;
  updatedAt?: Date;
}
export const GetMacieSessionResponse = S.suspend(() =>
  S.Struct({
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    findingPublishingFrequency: S.optional(FindingPublishingFrequency),
    serviceRole: S.optional(S.String),
    status: S.optional(MacieStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetMacieSessionResponse",
}) as any as S.Schema<GetMacieSessionResponse>;
export interface GetMasterAccountRequest {}
export const GetMasterAccountRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/master" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMasterAccountRequest",
}) as any as S.Schema<GetMasterAccountRequest>;
export interface GetMasterAccountResponse {
  master?: Invitation;
}
export const GetMasterAccountResponse = S.suspend(() =>
  S.Struct({ master: S.optional(Invitation) }),
).annotate({
  identifier: "GetMasterAccountResponse",
}) as any as S.Schema<GetMasterAccountResponse>;
export interface GetMemberRequest {
  id: string;
}
export const GetMemberRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/members/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMemberRequest",
}) as any as S.Schema<GetMemberRequest>;
export interface GetMemberResponse {
  accountId?: string;
  administratorAccountId?: string;
  arn?: string;
  email?: string;
  invitedAt?: Date;
  masterAccountId?: string;
  relationshipStatus?: RelationshipStatus;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const GetMemberResponse = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    administratorAccountId: S.optional(S.String),
    arn: S.optional(S.String),
    email: S.optional(S.String),
    invitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    masterAccountId: S.optional(S.String),
    relationshipStatus: S.optional(RelationshipStatus),
    tags: S.optional(TagMap),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetMemberResponse",
}) as any as S.Schema<GetMemberResponse>;
export interface GetResourceProfileRequest {
  resourceArn?: string;
}
export const GetResourceProfileRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resource-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceProfileRequest",
}) as any as S.Schema<GetResourceProfileRequest>;
export interface ResourceStatistics {
  totalBytesClassified?: number;
  totalDetections?: number;
  totalDetectionsSuppressed?: number;
  totalItemsClassified?: number;
  totalItemsSensitive?: number;
  totalItemsSkipped?: number;
  totalItemsSkippedInvalidEncryption?: number;
  totalItemsSkippedInvalidKms?: number;
  totalItemsSkippedPermissionDenied?: number;
}
export const ResourceStatistics = S.suspend(() =>
  S.Struct({
    totalBytesClassified: S.optional(S.Number),
    totalDetections: S.optional(S.Number),
    totalDetectionsSuppressed: S.optional(S.Number),
    totalItemsClassified: S.optional(S.Number),
    totalItemsSensitive: S.optional(S.Number),
    totalItemsSkipped: S.optional(S.Number),
    totalItemsSkippedInvalidEncryption: S.optional(S.Number),
    totalItemsSkippedInvalidKms: S.optional(S.Number),
    totalItemsSkippedPermissionDenied: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourceStatistics",
}) as any as S.Schema<ResourceStatistics>;
export interface GetResourceProfileResponse {
  profileUpdatedAt?: Date;
  sensitivityScore?: number;
  sensitivityScoreOverridden?: boolean;
  statistics?: ResourceStatistics;
}
export const GetResourceProfileResponse = S.suspend(() =>
  S.Struct({
    profileUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sensitivityScore: S.optional(S.Number),
    sensitivityScoreOverridden: S.optional(S.Boolean),
    statistics: S.optional(ResourceStatistics),
  }),
).annotate({
  identifier: "GetResourceProfileResponse",
}) as any as S.Schema<GetResourceProfileResponse>;
export interface GetRevealConfigurationRequest {}
export const GetRevealConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/reveal-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRevealConfigurationRequest",
}) as any as S.Schema<GetRevealConfigurationRequest>;
export type RevealStatus = "ENABLED" | "DISABLED" | (string & {});
export const RevealStatus = S.String;
export interface RevealConfiguration {
  kmsKeyId?: string;
  status?: RevealStatus;
}
export const RevealConfiguration = S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    status: S.optional(RevealStatus),
  }),
).annotate({
  identifier: "RevealConfiguration",
}) as any as S.Schema<RevealConfiguration>;
export type RetrievalMode =
  | "CALLER_CREDENTIALS"
  | "ASSUME_ROLE"
  | (string & {});
export const RetrievalMode = S.String;
export interface RetrievalConfiguration {
  externalId?: string;
  retrievalMode?: RetrievalMode;
  roleName?: string;
}
export const RetrievalConfiguration = S.suspend(() =>
  S.Struct({
    externalId: S.optional(S.String),
    retrievalMode: S.optional(RetrievalMode),
    roleName: S.optional(S.String),
  }),
).annotate({
  identifier: "RetrievalConfiguration",
}) as any as S.Schema<RetrievalConfiguration>;
export interface GetRevealConfigurationResponse {
  configuration?: RevealConfiguration & { status: RevealStatus };
  retrievalConfiguration?: RetrievalConfiguration & {
    retrievalMode: RetrievalMode;
  };
}
export const GetRevealConfigurationResponse = S.suspend(() =>
  S.Struct({
    configuration: S.optional(RevealConfiguration),
    retrievalConfiguration: S.optional(RetrievalConfiguration),
  }),
).annotate({
  identifier: "GetRevealConfigurationResponse",
}) as any as S.Schema<GetRevealConfigurationResponse>;
export interface GetSensitiveDataOccurrencesRequest {
  findingId: string;
}
export const GetSensitiveDataOccurrencesRequest = S.suspend(() =>
  S.Struct({ findingId: S.String.pipe(T.HttpLabel("findingId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findings/{findingId}/reveal" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSensitiveDataOccurrencesRequest",
}) as any as S.Schema<GetSensitiveDataOccurrencesRequest>;
export interface DetectedDataDetails {
  value?: string;
}
export const DetectedDataDetails = S.suspend(() =>
  S.Struct({ value: S.optional(S.String) }),
).annotate({
  identifier: "DetectedDataDetails",
}) as any as S.Schema<DetectedDataDetails>;
export type __listOfDetectedDataDetails = DetectedDataDetails[];
export const __listOfDetectedDataDetails = S.Array(DetectedDataDetails);
export type SensitiveDataOccurrences = {
  [key: string]: DetectedDataDetails[] | undefined;
};
export const SensitiveDataOccurrences = S.Record(
  S.String,
  __listOfDetectedDataDetails.pipe(S.optional),
);
export type RevealRequestStatus =
  | "SUCCESS"
  | "PROCESSING"
  | "ERROR"
  | (string & {});
export const RevealRequestStatus = S.String;
export interface GetSensitiveDataOccurrencesResponse {
  error?: string;
  sensitiveDataOccurrences?: {
    [key: string]:
      | (DetectedDataDetails & { value: __stringMin1Max128 })[]
      | undefined;
  };
  status?: RevealRequestStatus;
}
export const GetSensitiveDataOccurrencesResponse = S.suspend(() =>
  S.Struct({
    error: S.optional(S.String),
    sensitiveDataOccurrences: S.optional(SensitiveDataOccurrences),
    status: S.optional(RevealRequestStatus),
  }),
).annotate({
  identifier: "GetSensitiveDataOccurrencesResponse",
}) as any as S.Schema<GetSensitiveDataOccurrencesResponse>;
export interface GetSensitiveDataOccurrencesAvailabilityRequest {
  findingId: string;
}
export const GetSensitiveDataOccurrencesAvailabilityRequest = S.suspend(() =>
  S.Struct({ findingId: S.String.pipe(T.HttpLabel("findingId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/findings/{findingId}/reveal/availability",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSensitiveDataOccurrencesAvailabilityRequest",
}) as any as S.Schema<GetSensitiveDataOccurrencesAvailabilityRequest>;
export type AvailabilityCode = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export const AvailabilityCode = S.String;
export type UnavailabilityReasonCode =
  | "OBJECT_EXCEEDS_SIZE_QUOTA"
  | "UNSUPPORTED_OBJECT_TYPE"
  | "UNSUPPORTED_FINDING_TYPE"
  | "INVALID_CLASSIFICATION_RESULT"
  | "OBJECT_UNAVAILABLE"
  | "ACCOUNT_NOT_IN_ORGANIZATION"
  | "MISSING_GET_MEMBER_PERMISSION"
  | "ROLE_TOO_PERMISSIVE"
  | "MEMBER_ROLE_TOO_PERMISSIVE"
  | "INVALID_RESULT_SIGNATURE"
  | "RESULT_NOT_SIGNED"
  | (string & {});
export const UnavailabilityReasonCode = S.String;
export type __listOfUnavailabilityReasonCode = UnavailabilityReasonCode[];
export const __listOfUnavailabilityReasonCode = S.Array(
  UnavailabilityReasonCode,
);
export interface GetSensitiveDataOccurrencesAvailabilityResponse {
  code?: AvailabilityCode;
  reasons?: UnavailabilityReasonCode[];
}
export const GetSensitiveDataOccurrencesAvailabilityResponse = S.suspend(() =>
  S.Struct({
    code: S.optional(AvailabilityCode),
    reasons: S.optional(__listOfUnavailabilityReasonCode),
  }),
).annotate({
  identifier: "GetSensitiveDataOccurrencesAvailabilityResponse",
}) as any as S.Schema<GetSensitiveDataOccurrencesAvailabilityResponse>;
export interface GetSensitivityInspectionTemplateRequest {
  id: string;
}
export const GetSensitivityInspectionTemplateRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/templates/sensitivity-inspections/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSensitivityInspectionTemplateRequest",
}) as any as S.Schema<GetSensitivityInspectionTemplateRequest>;
export interface SensitivityInspectionTemplateExcludes {
  managedDataIdentifierIds?: string[];
}
export const SensitivityInspectionTemplateExcludes = S.suspend(() =>
  S.Struct({ managedDataIdentifierIds: S.optional(__listOf__string) }),
).annotate({
  identifier: "SensitivityInspectionTemplateExcludes",
}) as any as S.Schema<SensitivityInspectionTemplateExcludes>;
export interface SensitivityInspectionTemplateIncludes {
  allowListIds?: string[];
  customDataIdentifierIds?: string[];
  managedDataIdentifierIds?: string[];
}
export const SensitivityInspectionTemplateIncludes = S.suspend(() =>
  S.Struct({
    allowListIds: S.optional(__listOf__string),
    customDataIdentifierIds: S.optional(__listOf__string),
    managedDataIdentifierIds: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SensitivityInspectionTemplateIncludes",
}) as any as S.Schema<SensitivityInspectionTemplateIncludes>;
export interface GetSensitivityInspectionTemplateResponse {
  description?: string;
  excludes?: SensitivityInspectionTemplateExcludes;
  includes?: SensitivityInspectionTemplateIncludes;
  name?: string;
  sensitivityInspectionTemplateId?: string;
}
export const GetSensitivityInspectionTemplateResponse = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    excludes: S.optional(SensitivityInspectionTemplateExcludes),
    includes: S.optional(SensitivityInspectionTemplateIncludes),
    name: S.optional(S.String),
    sensitivityInspectionTemplateId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSensitivityInspectionTemplateResponse",
}) as any as S.Schema<GetSensitivityInspectionTemplateResponse>;
export type UsageStatisticsFilterComparator =
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "EQ"
  | "NE"
  | "CONTAINS"
  | (string & {});
export const UsageStatisticsFilterComparator = S.String;
export type UsageStatisticsFilterKey =
  | "accountId"
  | "serviceLimit"
  | "freeTrialStartDate"
  | "total"
  | (string & {});
export const UsageStatisticsFilterKey = S.String;
export interface UsageStatisticsFilter {
  comparator?: UsageStatisticsFilterComparator;
  key?: UsageStatisticsFilterKey;
  values?: string[];
}
export const UsageStatisticsFilter = S.suspend(() =>
  S.Struct({
    comparator: S.optional(UsageStatisticsFilterComparator),
    key: S.optional(UsageStatisticsFilterKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "UsageStatisticsFilter",
}) as any as S.Schema<UsageStatisticsFilter>;
export type __listOfUsageStatisticsFilter = UsageStatisticsFilter[];
export const __listOfUsageStatisticsFilter = S.Array(UsageStatisticsFilter);
export type UsageStatisticsSortKey =
  | "accountId"
  | "total"
  | "serviceLimitValue"
  | "freeTrialStartDate"
  | (string & {});
export const UsageStatisticsSortKey = S.String;
export interface UsageStatisticsSortBy {
  key?: UsageStatisticsSortKey;
  orderBy?: OrderBy;
}
export const UsageStatisticsSortBy = S.suspend(() =>
  S.Struct({
    key: S.optional(UsageStatisticsSortKey),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "UsageStatisticsSortBy",
}) as any as S.Schema<UsageStatisticsSortBy>;
export type TimeRange = "MONTH_TO_DATE" | "PAST_30_DAYS" | (string & {});
export const TimeRange = S.String;
export interface GetUsageStatisticsRequest {
  filterBy?: UsageStatisticsFilter[];
  maxResults?: number;
  nextToken?: string;
  sortBy?: UsageStatisticsSortBy;
  timeRange?: TimeRange;
}
export const GetUsageStatisticsRequest = S.suspend(() =>
  S.Struct({
    filterBy: S.optional(__listOfUsageStatisticsFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortBy: S.optional(UsageStatisticsSortBy),
    timeRange: S.optional(TimeRange),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/usage/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsageStatisticsRequest",
}) as any as S.Schema<GetUsageStatisticsRequest>;
export type Currency = "USD" | (string & {});
export const Currency = S.String;
export type Unit = "TERABYTES" | (string & {});
export const Unit = S.String;
export interface ServiceLimit {
  isServiceLimited?: boolean;
  unit?: Unit;
  value?: number;
}
export const ServiceLimit = S.suspend(() =>
  S.Struct({
    isServiceLimited: S.optional(S.Boolean),
    unit: S.optional(Unit),
    value: S.optional(S.Number),
  }),
).annotate({ identifier: "ServiceLimit" }) as any as S.Schema<ServiceLimit>;
export type UsageType =
  | "DATA_INVENTORY_EVALUATION"
  | "SENSITIVE_DATA_DISCOVERY"
  | "AUTOMATED_SENSITIVE_DATA_DISCOVERY"
  | "AUTOMATED_OBJECT_MONITORING"
  | (string & {});
export const UsageType = S.String;
export interface UsageByAccount {
  currency?: Currency;
  estimatedCost?: string;
  serviceLimit?: ServiceLimit;
  type?: UsageType;
}
export const UsageByAccount = S.suspend(() =>
  S.Struct({
    currency: S.optional(Currency),
    estimatedCost: S.optional(S.String),
    serviceLimit: S.optional(ServiceLimit),
    type: S.optional(UsageType),
  }),
).annotate({ identifier: "UsageByAccount" }) as any as S.Schema<UsageByAccount>;
export type __listOfUsageByAccount = UsageByAccount[];
export const __listOfUsageByAccount = S.Array(UsageByAccount);
export interface UsageRecord {
  accountId?: string;
  automatedDiscoveryFreeTrialStartDate?: Date;
  freeTrialStartDate?: Date;
  usage?: UsageByAccount[];
}
export const UsageRecord = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    automatedDiscoveryFreeTrialStartDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    freeTrialStartDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    usage: S.optional(__listOfUsageByAccount),
  }),
).annotate({ identifier: "UsageRecord" }) as any as S.Schema<UsageRecord>;
export type __listOfUsageRecord = UsageRecord[];
export const __listOfUsageRecord = S.Array(UsageRecord);
export interface GetUsageStatisticsResponse {
  nextToken?: string;
  records?: UsageRecord[];
  timeRange?: TimeRange;
}
export const GetUsageStatisticsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    records: S.optional(__listOfUsageRecord),
    timeRange: S.optional(TimeRange),
  }),
).annotate({
  identifier: "GetUsageStatisticsResponse",
}) as any as S.Schema<GetUsageStatisticsResponse>;
export interface GetUsageTotalsRequest {
  timeRange?: string;
}
export const GetUsageTotalsRequest = S.suspend(() =>
  S.Struct({
    timeRange: S.optional(S.String).pipe(T.HttpQuery("timeRange")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/usage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsageTotalsRequest",
}) as any as S.Schema<GetUsageTotalsRequest>;
export interface UsageTotal {
  currency?: Currency;
  estimatedCost?: string;
  type?: UsageType;
}
export const UsageTotal = S.suspend(() =>
  S.Struct({
    currency: S.optional(Currency),
    estimatedCost: S.optional(S.String),
    type: S.optional(UsageType),
  }),
).annotate({ identifier: "UsageTotal" }) as any as S.Schema<UsageTotal>;
export type __listOfUsageTotal = UsageTotal[];
export const __listOfUsageTotal = S.Array(UsageTotal);
export interface GetUsageTotalsResponse {
  timeRange?: TimeRange;
  usageTotals?: UsageTotal[];
}
export const GetUsageTotalsResponse = S.suspend(() =>
  S.Struct({
    timeRange: S.optional(TimeRange),
    usageTotals: S.optional(__listOfUsageTotal),
  }),
).annotate({
  identifier: "GetUsageTotalsResponse",
}) as any as S.Schema<GetUsageTotalsResponse>;
export interface ListAllowListsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAllowListsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/allow-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAllowListsRequest",
}) as any as S.Schema<ListAllowListsRequest>;
export interface AllowListSummary {
  arn?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  name?: string;
  updatedAt?: Date;
}
export const AllowListSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AllowListSummary",
}) as any as S.Schema<AllowListSummary>;
export type __listOfAllowListSummary = AllowListSummary[];
export const __listOfAllowListSummary = S.Array(AllowListSummary);
export interface ListAllowListsResponse {
  allowLists?: AllowListSummary[];
  nextToken?: string;
}
export const ListAllowListsResponse = S.suspend(() =>
  S.Struct({
    allowLists: S.optional(__listOfAllowListSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAllowListsResponse",
}) as any as S.Schema<ListAllowListsResponse>;
export interface ListAutomatedDiscoveryAccountsRequest {
  accountIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomatedDiscoveryAccountsRequest = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(__listOf__string).pipe(T.HttpQuery("accountIds")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/automated-discovery/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAutomatedDiscoveryAccountsRequest",
}) as any as S.Schema<ListAutomatedDiscoveryAccountsRequest>;
export interface AutomatedDiscoveryAccount {
  accountId?: string;
  status?: AutomatedDiscoveryAccountStatus;
}
export const AutomatedDiscoveryAccount = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(AutomatedDiscoveryAccountStatus),
  }),
).annotate({
  identifier: "AutomatedDiscoveryAccount",
}) as any as S.Schema<AutomatedDiscoveryAccount>;
export type __listOfAutomatedDiscoveryAccount = AutomatedDiscoveryAccount[];
export const __listOfAutomatedDiscoveryAccount = S.Array(
  AutomatedDiscoveryAccount,
);
export interface ListAutomatedDiscoveryAccountsResponse {
  items?: AutomatedDiscoveryAccount[];
  nextToken?: string;
}
export const ListAutomatedDiscoveryAccountsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfAutomatedDiscoveryAccount),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomatedDiscoveryAccountsResponse",
}) as any as S.Schema<ListAutomatedDiscoveryAccountsResponse>;
export type ListJobsFilterKey =
  | "jobType"
  | "jobStatus"
  | "createdAt"
  | "name"
  | (string & {});
export const ListJobsFilterKey = S.String;
export interface ListJobsFilterTerm {
  comparator?: JobComparator;
  key?: ListJobsFilterKey;
  values?: string[];
}
export const ListJobsFilterTerm = S.suspend(() =>
  S.Struct({
    comparator: S.optional(JobComparator),
    key: S.optional(ListJobsFilterKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "ListJobsFilterTerm",
}) as any as S.Schema<ListJobsFilterTerm>;
export type __listOfListJobsFilterTerm = ListJobsFilterTerm[];
export const __listOfListJobsFilterTerm = S.Array(ListJobsFilterTerm);
export interface ListJobsFilterCriteria {
  excludes?: ListJobsFilterTerm[];
  includes?: ListJobsFilterTerm[];
}
export const ListJobsFilterCriteria = S.suspend(() =>
  S.Struct({
    excludes: S.optional(__listOfListJobsFilterTerm),
    includes: S.optional(__listOfListJobsFilterTerm),
  }),
).annotate({
  identifier: "ListJobsFilterCriteria",
}) as any as S.Schema<ListJobsFilterCriteria>;
export type ListJobsSortAttributeName =
  | "createdAt"
  | "jobStatus"
  | "name"
  | "jobType"
  | (string & {});
export const ListJobsSortAttributeName = S.String;
export interface ListJobsSortCriteria {
  attributeName?: ListJobsSortAttributeName;
  orderBy?: OrderBy;
}
export const ListJobsSortCriteria = S.suspend(() =>
  S.Struct({
    attributeName: S.optional(ListJobsSortAttributeName),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "ListJobsSortCriteria",
}) as any as S.Schema<ListJobsSortCriteria>;
export interface ListClassificationJobsRequest {
  filterCriteria?: ListJobsFilterCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: ListJobsSortCriteria;
}
export const ListClassificationJobsRequest = S.suspend(() =>
  S.Struct({
    filterCriteria: S.optional(ListJobsFilterCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(ListJobsSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClassificationJobsRequest",
}) as any as S.Schema<ListClassificationJobsRequest>;
export interface JobSummary {
  bucketCriteria?: S3BucketCriteriaForJob;
  bucketDefinitions?: S3BucketDefinitionForJob[];
  createdAt?: Date;
  jobId?: string;
  jobStatus?: JobStatus;
  jobType?: JobType;
  lastRunErrorStatus?: LastRunErrorStatus;
  name?: string;
  userPausedDetails?: UserPausedDetails;
}
export const JobSummary = S.suspend(() =>
  S.Struct({
    bucketCriteria: S.optional(S3BucketCriteriaForJob),
    bucketDefinitions: S.optional(__listOfS3BucketDefinitionForJob),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobId: S.optional(S.String),
    jobStatus: S.optional(JobStatus),
    jobType: S.optional(JobType),
    lastRunErrorStatus: S.optional(LastRunErrorStatus),
    name: S.optional(S.String),
    userPausedDetails: S.optional(UserPausedDetails),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type __listOfJobSummary = JobSummary[];
export const __listOfJobSummary = S.Array(JobSummary);
export interface ListClassificationJobsResponse {
  items?: (JobSummary & {
    bucketDefinitions: (S3BucketDefinitionForJob & {
      accountId: string;
      buckets: __listOf__string;
    })[];
  })[];
  nextToken?: string;
}
export const ListClassificationJobsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfJobSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClassificationJobsResponse",
}) as any as S.Schema<ListClassificationJobsResponse>;
export interface ListClassificationScopesRequest {
  name?: string;
  nextToken?: string;
}
export const ListClassificationScopesRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/classification-scopes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClassificationScopesRequest",
}) as any as S.Schema<ListClassificationScopesRequest>;
export interface ClassificationScopeSummary {
  id?: string;
  name?: string;
}
export const ClassificationScopeSummary = S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "ClassificationScopeSummary",
}) as any as S.Schema<ClassificationScopeSummary>;
export type __listOfClassificationScopeSummary = ClassificationScopeSummary[];
export const __listOfClassificationScopeSummary = S.Array(
  ClassificationScopeSummary,
);
export interface ListClassificationScopesResponse {
  classificationScopes?: ClassificationScopeSummary[];
  nextToken?: string;
}
export const ListClassificationScopesResponse = S.suspend(() =>
  S.Struct({
    classificationScopes: S.optional(__listOfClassificationScopeSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClassificationScopesResponse",
}) as any as S.Schema<ListClassificationScopesResponse>;
export interface ListCustomDataIdentifiersRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListCustomDataIdentifiersRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomDataIdentifiersRequest",
}) as any as S.Schema<ListCustomDataIdentifiersRequest>;
export interface CustomDataIdentifierSummary {
  arn?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  name?: string;
}
export const CustomDataIdentifierSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomDataIdentifierSummary",
}) as any as S.Schema<CustomDataIdentifierSummary>;
export type __listOfCustomDataIdentifierSummary = CustomDataIdentifierSummary[];
export const __listOfCustomDataIdentifierSummary = S.Array(
  CustomDataIdentifierSummary,
);
export interface ListCustomDataIdentifiersResponse {
  items?: CustomDataIdentifierSummary[];
  nextToken?: string;
}
export const ListCustomDataIdentifiersResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfCustomDataIdentifierSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomDataIdentifiersResponse",
}) as any as S.Schema<ListCustomDataIdentifiersResponse>;
export interface ListFindingsRequest {
  findingCriteria?: FindingCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: SortCriteria;
}
export const ListFindingsRequest = S.suspend(() =>
  S.Struct({
    findingCriteria: S.optional(FindingCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(SortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingsRequest",
}) as any as S.Schema<ListFindingsRequest>;
export interface ListFindingsResponse {
  findingIds?: string[];
  nextToken?: string;
}
export const ListFindingsResponse = S.suspend(() =>
  S.Struct({
    findingIds: S.optional(__listOf__string),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsResponse",
}) as any as S.Schema<ListFindingsResponse>;
export interface ListFindingsFiltersRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListFindingsFiltersRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findingsfilters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingsFiltersRequest",
}) as any as S.Schema<ListFindingsFiltersRequest>;
export interface FindingsFilterListItem {
  action?: FindingsFilterAction;
  arn?: string;
  id?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const FindingsFilterListItem = S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "FindingsFilterListItem",
}) as any as S.Schema<FindingsFilterListItem>;
export type __listOfFindingsFilterListItem = FindingsFilterListItem[];
export const __listOfFindingsFilterListItem = S.Array(FindingsFilterListItem);
export interface ListFindingsFiltersResponse {
  findingsFilterListItems?: FindingsFilterListItem[];
  nextToken?: string;
}
export const ListFindingsFiltersResponse = S.suspend(() =>
  S.Struct({
    findingsFilterListItems: S.optional(__listOfFindingsFilterListItem),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsFiltersResponse",
}) as any as S.Schema<ListFindingsFiltersResponse>;
export interface ListInvitationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListInvitationsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitations" }),
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
export type __listOfInvitation = Invitation[];
export const __listOfInvitation = S.Array(Invitation);
export interface ListInvitationsResponse {
  invitations?: Invitation[];
  nextToken?: string;
}
export const ListInvitationsResponse = S.suspend(() =>
  S.Struct({
    invitations: S.optional(__listOfInvitation),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvitationsResponse",
}) as any as S.Schema<ListInvitationsResponse>;
export interface ListManagedDataIdentifiersRequest {
  nextToken?: string;
}
export const ListManagedDataIdentifiersRequest = S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/managed-data-identifiers/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedDataIdentifiersRequest",
}) as any as S.Schema<ListManagedDataIdentifiersRequest>;
export interface ManagedDataIdentifierSummary {
  category?: SensitiveDataItemCategory;
  id?: string;
}
export const ManagedDataIdentifierSummary = S.suspend(() =>
  S.Struct({
    category: S.optional(SensitiveDataItemCategory),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedDataIdentifierSummary",
}) as any as S.Schema<ManagedDataIdentifierSummary>;
export type __listOfManagedDataIdentifierSummary =
  ManagedDataIdentifierSummary[];
export const __listOfManagedDataIdentifierSummary = S.Array(
  ManagedDataIdentifierSummary,
);
export interface ListManagedDataIdentifiersResponse {
  items?: ManagedDataIdentifierSummary[];
  nextToken?: string;
}
export const ListManagedDataIdentifiersResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(__listOfManagedDataIdentifierSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedDataIdentifiersResponse",
}) as any as S.Schema<ListManagedDataIdentifiersResponse>;
export interface ListMembersRequest {
  maxResults?: number;
  nextToken?: string;
  onlyAssociated?: string;
}
export const ListMembersRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    onlyAssociated: S.optional(S.String).pipe(T.HttpQuery("onlyAssociated")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/members" }),
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
export interface Member {
  accountId?: string;
  administratorAccountId?: string;
  arn?: string;
  email?: string;
  invitedAt?: Date;
  masterAccountId?: string;
  relationshipStatus?: RelationshipStatus;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const Member = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    administratorAccountId: S.optional(S.String),
    arn: S.optional(S.String),
    email: S.optional(S.String),
    invitedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    masterAccountId: S.optional(S.String),
    relationshipStatus: S.optional(RelationshipStatus),
    tags: S.optional(TagMap),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export type __listOfMember = Member[];
export const __listOfMember = S.Array(Member);
export interface ListMembersResponse {
  members?: Member[];
  nextToken?: string;
}
export const ListMembersResponse = S.suspend(() =>
  S.Struct({
    members: S.optional(__listOfMember),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersResponse",
}) as any as S.Schema<ListMembersResponse>;
export interface ListOrganizationAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListOrganizationAdminAccountsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/admin" }),
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
export type AdminStatus = "ENABLED" | "DISABLING_IN_PROGRESS" | (string & {});
export const AdminStatus = S.String;
export interface AdminAccount {
  accountId?: string;
  status?: AdminStatus;
}
export const AdminAccount = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(AdminStatus),
  }),
).annotate({ identifier: "AdminAccount" }) as any as S.Schema<AdminAccount>;
export type __listOfAdminAccount = AdminAccount[];
export const __listOfAdminAccount = S.Array(AdminAccount);
export interface ListOrganizationAdminAccountsResponse {
  adminAccounts?: AdminAccount[];
  nextToken?: string;
}
export const ListOrganizationAdminAccountsResponse = S.suspend(() =>
  S.Struct({
    adminAccounts: S.optional(__listOfAdminAccount),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrganizationAdminAccountsResponse",
}) as any as S.Schema<ListOrganizationAdminAccountsResponse>;
export interface ListResourceProfileArtifactsRequest {
  nextToken?: string;
  resourceArn?: string;
}
export const ListResourceProfileArtifactsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resource-profiles/artifacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceProfileArtifactsRequest",
}) as any as S.Schema<ListResourceProfileArtifactsRequest>;
export interface ResourceProfileArtifact {
  arn?: string;
  classificationResultStatus?: string;
  sensitive?: boolean;
}
export const ResourceProfileArtifact = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    classificationResultStatus: S.optional(S.String),
    sensitive: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResourceProfileArtifact",
}) as any as S.Schema<ResourceProfileArtifact>;
export type __listOfResourceProfileArtifact = ResourceProfileArtifact[];
export const __listOfResourceProfileArtifact = S.Array(ResourceProfileArtifact);
export interface ListResourceProfileArtifactsResponse {
  artifacts?: (ResourceProfileArtifact & {
    arn: string;
    classificationResultStatus: string;
  })[];
  nextToken?: string;
}
export const ListResourceProfileArtifactsResponse = S.suspend(() =>
  S.Struct({
    artifacts: S.optional(__listOfResourceProfileArtifact),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceProfileArtifactsResponse",
}) as any as S.Schema<ListResourceProfileArtifactsResponse>;
export interface ListResourceProfileDetectionsRequest {
  maxResults?: number;
  nextToken?: string;
  resourceArn?: string;
}
export const ListResourceProfileDetectionsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resource-profiles/detections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceProfileDetectionsRequest",
}) as any as S.Schema<ListResourceProfileDetectionsRequest>;
export type DataIdentifierType = "CUSTOM" | "MANAGED" | (string & {});
export const DataIdentifierType = S.String;
export interface Detection {
  arn?: string;
  count?: number;
  id?: string;
  name?: string;
  suppressed?: boolean;
  type?: DataIdentifierType;
}
export const Detection = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    count: S.optional(S.Number),
    id: S.optional(S.String),
    name: S.optional(S.String),
    suppressed: S.optional(S.Boolean),
    type: S.optional(DataIdentifierType),
  }),
).annotate({ identifier: "Detection" }) as any as S.Schema<Detection>;
export type __listOfDetection = Detection[];
export const __listOfDetection = S.Array(Detection);
export interface ListResourceProfileDetectionsResponse {
  detections?: Detection[];
  nextToken?: string;
}
export const ListResourceProfileDetectionsResponse = S.suspend(() =>
  S.Struct({
    detections: S.optional(__listOfDetection),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceProfileDetectionsResponse",
}) as any as S.Schema<ListResourceProfileDetectionsResponse>;
export interface ListSensitivityInspectionTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSensitivityInspectionTemplatesRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/templates/sensitivity-inspections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSensitivityInspectionTemplatesRequest",
}) as any as S.Schema<ListSensitivityInspectionTemplatesRequest>;
export interface SensitivityInspectionTemplatesEntry {
  id?: string;
  name?: string;
}
export const SensitivityInspectionTemplatesEntry = S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "SensitivityInspectionTemplatesEntry",
}) as any as S.Schema<SensitivityInspectionTemplatesEntry>;
export type __listOfSensitivityInspectionTemplatesEntry =
  SensitivityInspectionTemplatesEntry[];
export const __listOfSensitivityInspectionTemplatesEntry = S.Array(
  SensitivityInspectionTemplatesEntry,
);
export interface ListSensitivityInspectionTemplatesResponse {
  nextToken?: string;
  sensitivityInspectionTemplates?: SensitivityInspectionTemplatesEntry[];
}
export const ListSensitivityInspectionTemplatesResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    sensitivityInspectionTemplates: S.optional(
      __listOfSensitivityInspectionTemplatesEntry,
    ),
  }),
).annotate({
  identifier: "ListSensitivityInspectionTemplatesResponse",
}) as any as S.Schema<ListSensitivityInspectionTemplatesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutClassificationExportConfigurationRequest {
  configuration?: ClassificationExportConfiguration;
}
export const PutClassificationExportConfigurationRequest = S.suspend(() =>
  S.Struct({
    configuration: S.optional(ClassificationExportConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/classification-export-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutClassificationExportConfigurationRequest",
}) as any as S.Schema<PutClassificationExportConfigurationRequest>;
export interface PutClassificationExportConfigurationResponse {
  configuration?: ClassificationExportConfiguration & {
    s3Destination: S3Destination & { bucketName: string; kmsKeyArn: string };
  };
}
export const PutClassificationExportConfigurationResponse = S.suspend(() =>
  S.Struct({ configuration: S.optional(ClassificationExportConfiguration) }),
).annotate({
  identifier: "PutClassificationExportConfigurationResponse",
}) as any as S.Schema<PutClassificationExportConfigurationResponse>;
export interface PutFindingsPublicationConfigurationRequest {
  clientToken?: string;
  securityHubConfiguration?: SecurityHubConfiguration;
}
export const PutFindingsPublicationConfigurationRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    securityHubConfiguration: S.optional(SecurityHubConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/findings-publication-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFindingsPublicationConfigurationRequest",
}) as any as S.Schema<PutFindingsPublicationConfigurationRequest>;
export interface PutFindingsPublicationConfigurationResponse {}
export const PutFindingsPublicationConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutFindingsPublicationConfigurationResponse",
}) as any as S.Schema<PutFindingsPublicationConfigurationResponse>;
export type SearchResourcesComparator = "EQ" | "NE" | (string & {});
export const SearchResourcesComparator = S.String;
export type SearchResourcesSimpleCriterionKey =
  | "ACCOUNT_ID"
  | "S3_BUCKET_NAME"
  | "S3_BUCKET_EFFECTIVE_PERMISSION"
  | "S3_BUCKET_SHARED_ACCESS"
  | "AUTOMATED_DISCOVERY_MONITORING_STATUS"
  | (string & {});
export const SearchResourcesSimpleCriterionKey = S.String;
export interface SearchResourcesSimpleCriterion {
  comparator?: SearchResourcesComparator;
  key?: SearchResourcesSimpleCriterionKey;
  values?: string[];
}
export const SearchResourcesSimpleCriterion = S.suspend(() =>
  S.Struct({
    comparator: S.optional(SearchResourcesComparator),
    key: S.optional(SearchResourcesSimpleCriterionKey),
    values: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SearchResourcesSimpleCriterion",
}) as any as S.Schema<SearchResourcesSimpleCriterion>;
export interface SearchResourcesTagCriterionPair {
  key?: string;
  value?: string;
}
export const SearchResourcesTagCriterionPair = S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "SearchResourcesTagCriterionPair",
}) as any as S.Schema<SearchResourcesTagCriterionPair>;
export type __listOfSearchResourcesTagCriterionPair =
  SearchResourcesTagCriterionPair[];
export const __listOfSearchResourcesTagCriterionPair = S.Array(
  SearchResourcesTagCriterionPair,
);
export interface SearchResourcesTagCriterion {
  comparator?: SearchResourcesComparator;
  tagValues?: SearchResourcesTagCriterionPair[];
}
export const SearchResourcesTagCriterion = S.suspend(() =>
  S.Struct({
    comparator: S.optional(SearchResourcesComparator),
    tagValues: S.optional(__listOfSearchResourcesTagCriterionPair),
  }),
).annotate({
  identifier: "SearchResourcesTagCriterion",
}) as any as S.Schema<SearchResourcesTagCriterion>;
export interface SearchResourcesCriteria {
  simpleCriterion?: SearchResourcesSimpleCriterion;
  tagCriterion?: SearchResourcesTagCriterion;
}
export const SearchResourcesCriteria = S.suspend(() =>
  S.Struct({
    simpleCriterion: S.optional(SearchResourcesSimpleCriterion),
    tagCriterion: S.optional(SearchResourcesTagCriterion),
  }),
).annotate({
  identifier: "SearchResourcesCriteria",
}) as any as S.Schema<SearchResourcesCriteria>;
export type __listOfSearchResourcesCriteria = SearchResourcesCriteria[];
export const __listOfSearchResourcesCriteria = S.Array(SearchResourcesCriteria);
export interface SearchResourcesCriteriaBlock {
  and?: SearchResourcesCriteria[];
}
export const SearchResourcesCriteriaBlock = S.suspend(() =>
  S.Struct({ and: S.optional(__listOfSearchResourcesCriteria) }),
).annotate({
  identifier: "SearchResourcesCriteriaBlock",
}) as any as S.Schema<SearchResourcesCriteriaBlock>;
export interface SearchResourcesBucketCriteria {
  excludes?: SearchResourcesCriteriaBlock;
  includes?: SearchResourcesCriteriaBlock;
}
export const SearchResourcesBucketCriteria = S.suspend(() =>
  S.Struct({
    excludes: S.optional(SearchResourcesCriteriaBlock),
    includes: S.optional(SearchResourcesCriteriaBlock),
  }),
).annotate({
  identifier: "SearchResourcesBucketCriteria",
}) as any as S.Schema<SearchResourcesBucketCriteria>;
export type SearchResourcesSortAttributeName =
  | "ACCOUNT_ID"
  | "RESOURCE_NAME"
  | "S3_CLASSIFIABLE_OBJECT_COUNT"
  | "S3_CLASSIFIABLE_SIZE_IN_BYTES"
  | (string & {});
export const SearchResourcesSortAttributeName = S.String;
export interface SearchResourcesSortCriteria {
  attributeName?: SearchResourcesSortAttributeName;
  orderBy?: OrderBy;
}
export const SearchResourcesSortCriteria = S.suspend(() =>
  S.Struct({
    attributeName: S.optional(SearchResourcesSortAttributeName),
    orderBy: S.optional(OrderBy),
  }),
).annotate({
  identifier: "SearchResourcesSortCriteria",
}) as any as S.Schema<SearchResourcesSortCriteria>;
export interface SearchResourcesRequest {
  bucketCriteria?: SearchResourcesBucketCriteria;
  maxResults?: number;
  nextToken?: string;
  sortCriteria?: SearchResourcesSortCriteria;
}
export const SearchResourcesRequest = S.suspend(() =>
  S.Struct({
    bucketCriteria: S.optional(SearchResourcesBucketCriteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortCriteria: S.optional(SearchResourcesSortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasources/search-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchResourcesRequest",
}) as any as S.Schema<SearchResourcesRequest>;
export interface MatchingBucket {
  accountId?: string;
  automatedDiscoveryMonitoringStatus?: AutomatedDiscoveryMonitoringStatus;
  bucketName?: string;
  classifiableObjectCount?: number;
  classifiableSizeInBytes?: number;
  errorCode?: BucketMetadataErrorCode;
  errorMessage?: string;
  jobDetails?: JobDetails;
  lastAutomatedDiscoveryTime?: Date;
  objectCount?: number;
  objectCountByEncryptionType?: ObjectCountByEncryptionType;
  sensitivityScore?: number;
  sizeInBytes?: number;
  sizeInBytesCompressed?: number;
  unclassifiableObjectCount?: ObjectLevelStatistics;
  unclassifiableObjectSizeInBytes?: ObjectLevelStatistics;
}
export const MatchingBucket = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    automatedDiscoveryMonitoringStatus: S.optional(
      AutomatedDiscoveryMonitoringStatus,
    ),
    bucketName: S.optional(S.String),
    classifiableObjectCount: S.optional(S.Number),
    classifiableSizeInBytes: S.optional(S.Number),
    errorCode: S.optional(BucketMetadataErrorCode),
    errorMessage: S.optional(S.String),
    jobDetails: S.optional(JobDetails),
    lastAutomatedDiscoveryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    objectCount: S.optional(S.Number),
    objectCountByEncryptionType: S.optional(ObjectCountByEncryptionType),
    sensitivityScore: S.optional(S.Number),
    sizeInBytes: S.optional(S.Number),
    sizeInBytesCompressed: S.optional(S.Number),
    unclassifiableObjectCount: S.optional(ObjectLevelStatistics),
    unclassifiableObjectSizeInBytes: S.optional(ObjectLevelStatistics),
  }),
).annotate({ identifier: "MatchingBucket" }) as any as S.Schema<MatchingBucket>;
export interface MatchingResource {
  matchingBucket?: MatchingBucket;
}
export const MatchingResource = S.suspend(() =>
  S.Struct({ matchingBucket: S.optional(MatchingBucket) }),
).annotate({
  identifier: "MatchingResource",
}) as any as S.Schema<MatchingResource>;
export type __listOfMatchingResource = MatchingResource[];
export const __listOfMatchingResource = S.Array(MatchingResource);
export interface SearchResourcesResponse {
  matchingResources?: MatchingResource[];
  nextToken?: string;
}
export const SearchResourcesResponse = S.suspend(() =>
  S.Struct({
    matchingResources: S.optional(__listOfMatchingResource),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchResourcesResponse",
}) as any as S.Schema<SearchResourcesResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
export interface TestCustomDataIdentifierRequest {
  ignoreWords?: string[];
  keywords?: string[];
  maximumMatchDistance?: number;
  regex?: string;
  sampleText?: string;
}
export const TestCustomDataIdentifierRequest = S.suspend(() =>
  S.Struct({
    ignoreWords: S.optional(__listOf__string),
    keywords: S.optional(__listOf__string),
    maximumMatchDistance: S.optional(S.Number),
    regex: S.optional(S.String),
    sampleText: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-data-identifiers/test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestCustomDataIdentifierRequest",
}) as any as S.Schema<TestCustomDataIdentifierRequest>;
export interface TestCustomDataIdentifierResponse {
  matchCount?: number;
}
export const TestCustomDataIdentifierResponse = S.suspend(() =>
  S.Struct({ matchCount: S.optional(S.Number) }),
).annotate({
  identifier: "TestCustomDataIdentifierResponse",
}) as any as S.Schema<TestCustomDataIdentifierResponse>;
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
export interface UpdateAllowListRequest {
  criteria?: AllowListCriteria;
  description?: string;
  id: string;
  name?: string;
}
export const UpdateAllowListRequest = S.suspend(() =>
  S.Struct({
    criteria: S.optional(AllowListCriteria),
    description: S.optional(S.String),
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/allow-lists/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAllowListRequest",
}) as any as S.Schema<UpdateAllowListRequest>;
export interface UpdateAllowListResponse {
  arn?: string;
  id?: string;
}
export const UpdateAllowListResponse = S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "UpdateAllowListResponse",
}) as any as S.Schema<UpdateAllowListResponse>;
export interface UpdateAutomatedDiscoveryConfigurationRequest {
  autoEnableOrganizationMembers?: AutoEnableMode;
  status?: AutomatedDiscoveryStatus;
}
export const UpdateAutomatedDiscoveryConfigurationRequest = S.suspend(() =>
  S.Struct({
    autoEnableOrganizationMembers: S.optional(AutoEnableMode),
    status: S.optional(AutomatedDiscoveryStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/automated-discovery/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAutomatedDiscoveryConfigurationRequest",
}) as any as S.Schema<UpdateAutomatedDiscoveryConfigurationRequest>;
export interface UpdateAutomatedDiscoveryConfigurationResponse {}
export const UpdateAutomatedDiscoveryConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAutomatedDiscoveryConfigurationResponse",
}) as any as S.Schema<UpdateAutomatedDiscoveryConfigurationResponse>;
export interface UpdateClassificationJobRequest {
  jobId: string;
  jobStatus?: JobStatus;
}
export const UpdateClassificationJobRequest = S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    jobStatus: S.optional(JobStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClassificationJobRequest",
}) as any as S.Schema<UpdateClassificationJobRequest>;
export interface UpdateClassificationJobResponse {}
export const UpdateClassificationJobResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateClassificationJobResponse",
}) as any as S.Schema<UpdateClassificationJobResponse>;
export type ClassificationScopeUpdateOperation =
  | "ADD"
  | "REPLACE"
  | "REMOVE"
  | (string & {});
export const ClassificationScopeUpdateOperation = S.String;
export interface S3ClassificationScopeExclusionUpdate {
  bucketNames?: string[];
  operation?: ClassificationScopeUpdateOperation;
}
export const S3ClassificationScopeExclusionUpdate = S.suspend(() =>
  S.Struct({
    bucketNames: S.optional(__listOfS3BucketName),
    operation: S.optional(ClassificationScopeUpdateOperation),
  }),
).annotate({
  identifier: "S3ClassificationScopeExclusionUpdate",
}) as any as S.Schema<S3ClassificationScopeExclusionUpdate>;
export interface S3ClassificationScopeUpdate {
  excludes?: S3ClassificationScopeExclusionUpdate;
}
export const S3ClassificationScopeUpdate = S.suspend(() =>
  S.Struct({ excludes: S.optional(S3ClassificationScopeExclusionUpdate) }),
).annotate({
  identifier: "S3ClassificationScopeUpdate",
}) as any as S.Schema<S3ClassificationScopeUpdate>;
export interface UpdateClassificationScopeRequest {
  id: string;
  s3?: S3ClassificationScopeUpdate;
}
export const UpdateClassificationScopeRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    s3: S.optional(S3ClassificationScopeUpdate),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/classification-scopes/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClassificationScopeRequest",
}) as any as S.Schema<UpdateClassificationScopeRequest>;
export interface UpdateClassificationScopeResponse {}
export const UpdateClassificationScopeResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateClassificationScopeResponse",
}) as any as S.Schema<UpdateClassificationScopeResponse>;
export interface UpdateFindingsFilterRequest {
  action?: FindingsFilterAction;
  clientToken?: string;
  description?: string;
  findingCriteria?: FindingCriteria;
  id: string;
  name?: string;
  position?: number;
}
export const UpdateFindingsFilterRequest = S.suspend(() =>
  S.Struct({
    action: S.optional(FindingsFilterAction),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    findingCriteria: S.optional(FindingCriteria),
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    position: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/findingsfilters/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFindingsFilterRequest",
}) as any as S.Schema<UpdateFindingsFilterRequest>;
export interface UpdateFindingsFilterResponse {
  arn?: string;
  id?: string;
}
export const UpdateFindingsFilterResponse = S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "UpdateFindingsFilterResponse",
}) as any as S.Schema<UpdateFindingsFilterResponse>;
export interface UpdateMacieSessionRequest {
  findingPublishingFrequency?: FindingPublishingFrequency;
  status?: MacieStatus;
}
export const UpdateMacieSessionRequest = S.suspend(() =>
  S.Struct({
    findingPublishingFrequency: S.optional(FindingPublishingFrequency),
    status: S.optional(MacieStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/macie" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMacieSessionRequest",
}) as any as S.Schema<UpdateMacieSessionRequest>;
export interface UpdateMacieSessionResponse {}
export const UpdateMacieSessionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMacieSessionResponse",
}) as any as S.Schema<UpdateMacieSessionResponse>;
export interface UpdateMemberSessionRequest {
  id: string;
  status?: MacieStatus;
}
export const UpdateMemberSessionRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    status: S.optional(MacieStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/macie/members/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMemberSessionRequest",
}) as any as S.Schema<UpdateMemberSessionRequest>;
export interface UpdateMemberSessionResponse {}
export const UpdateMemberSessionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMemberSessionResponse",
}) as any as S.Schema<UpdateMemberSessionResponse>;
export interface UpdateOrganizationConfigurationRequest {
  autoEnable?: boolean;
}
export const UpdateOrganizationConfigurationRequest = S.suspend(() =>
  S.Struct({ autoEnable: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/admin/configuration" }),
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
export interface UpdateResourceProfileRequest {
  resourceArn?: string;
  sensitivityScoreOverride?: number;
}
export const UpdateResourceProfileRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    sensitivityScoreOverride: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/resource-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceProfileRequest",
}) as any as S.Schema<UpdateResourceProfileRequest>;
export interface UpdateResourceProfileResponse {}
export const UpdateResourceProfileResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResourceProfileResponse",
}) as any as S.Schema<UpdateResourceProfileResponse>;
export interface SuppressDataIdentifier {
  id?: string;
  type?: DataIdentifierType;
}
export const SuppressDataIdentifier = S.suspend(() =>
  S.Struct({ id: S.optional(S.String), type: S.optional(DataIdentifierType) }),
).annotate({
  identifier: "SuppressDataIdentifier",
}) as any as S.Schema<SuppressDataIdentifier>;
export type __listOfSuppressDataIdentifier = SuppressDataIdentifier[];
export const __listOfSuppressDataIdentifier = S.Array(SuppressDataIdentifier);
export interface UpdateResourceProfileDetectionsRequest {
  resourceArn?: string;
  suppressDataIdentifiers?: SuppressDataIdentifier[];
}
export const UpdateResourceProfileDetectionsRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
    suppressDataIdentifiers: S.optional(__listOfSuppressDataIdentifier),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/resource-profiles/detections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceProfileDetectionsRequest",
}) as any as S.Schema<UpdateResourceProfileDetectionsRequest>;
export interface UpdateResourceProfileDetectionsResponse {}
export const UpdateResourceProfileDetectionsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResourceProfileDetectionsResponse",
}) as any as S.Schema<UpdateResourceProfileDetectionsResponse>;
export interface UpdateRetrievalConfiguration {
  retrievalMode?: RetrievalMode;
  roleName?: string;
}
export const UpdateRetrievalConfiguration = S.suspend(() =>
  S.Struct({
    retrievalMode: S.optional(RetrievalMode),
    roleName: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateRetrievalConfiguration",
}) as any as S.Schema<UpdateRetrievalConfiguration>;
export interface UpdateRevealConfigurationRequest {
  configuration?: RevealConfiguration;
  retrievalConfiguration?: UpdateRetrievalConfiguration;
}
export const UpdateRevealConfigurationRequest = S.suspend(() =>
  S.Struct({
    configuration: S.optional(RevealConfiguration),
    retrievalConfiguration: S.optional(UpdateRetrievalConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/reveal-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRevealConfigurationRequest",
}) as any as S.Schema<UpdateRevealConfigurationRequest>;
export interface UpdateRevealConfigurationResponse {
  configuration?: RevealConfiguration & { status: RevealStatus };
  retrievalConfiguration?: RetrievalConfiguration & {
    retrievalMode: RetrievalMode;
  };
}
export const UpdateRevealConfigurationResponse = S.suspend(() =>
  S.Struct({
    configuration: S.optional(RevealConfiguration),
    retrievalConfiguration: S.optional(RetrievalConfiguration),
  }),
).annotate({
  identifier: "UpdateRevealConfigurationResponse",
}) as any as S.Schema<UpdateRevealConfigurationResponse>;
export interface UpdateSensitivityInspectionTemplateRequest {
  description?: string;
  excludes?: SensitivityInspectionTemplateExcludes;
  id: string;
  includes?: SensitivityInspectionTemplateIncludes;
}
export const UpdateSensitivityInspectionTemplateRequest = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    excludes: S.optional(SensitivityInspectionTemplateExcludes),
    id: S.String.pipe(T.HttpLabel("id")),
    includes: S.optional(SensitivityInspectionTemplateIncludes),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/templates/sensitivity-inspections/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSensitivityInspectionTemplateRequest",
}) as any as S.Schema<UpdateSensitivityInspectionTemplateRequest>;
export interface UpdateSensitivityInspectionTemplateResponse {}
export const UpdateSensitivityInspectionTemplateResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSensitivityInspectionTemplateResponse",
}) as any as S.Schema<UpdateSensitivityInspectionTemplateResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class UnprocessableEntityException extends S.TaggedErrorClass<UnprocessableEntityException>()(
  "UnprocessableEntityException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Accepts an Amazon Macie membership invitation that was received from a specific account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
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
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about one or more custom data identifiers.
 */
export const batchGetCustomDataIdentifiers: API.OperationMethod<
  BatchGetCustomDataIdentifiersRequest,
  BatchGetCustomDataIdentifiersResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetCustomDataIdentifiersRequest,
  output: BatchGetCustomDataIdentifiersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Changes the status of automated sensitive data discovery for one or more accounts.
 */
export const batchUpdateAutomatedDiscoveryAccounts: API.OperationMethod<
  BatchUpdateAutomatedDiscoveryAccountsRequest,
  BatchUpdateAutomatedDiscoveryAccountsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateAutomatedDiscoveryAccountsRequest,
  output: BatchUpdateAutomatedDiscoveryAccountsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates and defines the settings for an allow list.
 */
export const createAllowList: API.OperationMethod<
  CreateAllowListRequest,
  CreateAllowListResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAllowListRequest,
  output: CreateAllowListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates and defines the settings for a classification job.
 */
export const createClassificationJob: API.OperationMethod<
  CreateClassificationJobRequest,
  CreateClassificationJobResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateClassificationJobRequest,
  output: CreateClassificationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates and defines the criteria and other settings for a custom data identifier.
 */
export const createCustomDataIdentifier: API.OperationMethod<
  CreateCustomDataIdentifierRequest,
  CreateCustomDataIdentifierResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomDataIdentifierRequest,
  output: CreateCustomDataIdentifierResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates and defines the criteria and other settings for a findings filter.
 */
export const createFindingsFilter: API.OperationMethod<
  CreateFindingsFilterRequest,
  CreateFindingsFilterResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFindingsFilterRequest,
  output: CreateFindingsFilterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Sends an Amazon Macie membership invitation to one or more accounts.
 */
export const createInvitations: API.OperationMethod<
  CreateInvitationsRequest,
  CreateInvitationsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInvitationsRequest,
  output: CreateInvitationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates an account with an Amazon Macie administrator account.
 */
export const createMember: API.OperationMethod<
  CreateMemberRequest,
  CreateMemberResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMemberRequest,
  output: CreateMemberResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates sample findings.
 */
export const createSampleFindings: API.OperationMethod<
  CreateSampleFindingsRequest,
  CreateSampleFindingsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSampleFindingsRequest,
  output: CreateSampleFindingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Declines Amazon Macie membership invitations that were received from specific accounts.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest,
  DeclineInvitationsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeclineInvitationsRequest,
  output: DeclineInvitationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes an allow list.
 */
export const deleteAllowList: API.OperationMethod<
  DeleteAllowListRequest,
  DeleteAllowListResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAllowListRequest,
  output: DeleteAllowListResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Soft deletes a custom data identifier.
 */
export const deleteCustomDataIdentifier: API.OperationMethod<
  DeleteCustomDataIdentifierRequest,
  DeleteCustomDataIdentifierResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCustomDataIdentifierRequest,
  output: DeleteCustomDataIdentifierResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a findings filter.
 */
export const deleteFindingsFilter: API.OperationMethod<
  DeleteFindingsFilterRequest,
  DeleteFindingsFilterResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFindingsFilterRequest,
  output: DeleteFindingsFilterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes Amazon Macie membership invitations that were received from specific accounts.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInvitationsRequest,
  output: DeleteInvitationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the association between an Amazon Macie administrator account and an account.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberRequest,
  DeleteMemberResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMemberRequest,
  output: DeleteMemberResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves (queries) statistical data and other information about one or more S3 buckets that Amazon Macie monitors and analyzes for an account.
 */
export const describeBuckets: API.OperationMethod<
  DescribeBucketsRequest,
  DescribeBucketsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeBucketsRequest,
  ) => stream.Stream<
    DescribeBucketsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeBucketsRequest,
  ) => stream.Stream<
    BucketMetadata,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeBucketsRequest,
  output: DescribeBucketsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "buckets",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves the status and settings for a classification job.
 */
export const describeClassificationJob: API.OperationMethod<
  DescribeClassificationJobRequest,
  DescribeClassificationJobResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeClassificationJobRequest,
  output: DescribeClassificationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the Amazon Macie configuration settings for an organization in Organizations.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeOrganizationConfigurationRequest,
  output: DescribeOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disables Amazon Macie and deletes all settings and resources for a Macie account.
 */
export const disableMacie: API.OperationMethod<
  DisableMacieRequest,
  DisableMacieResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableMacieRequest,
  output: DisableMacieResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disables an account as the delegated Amazon Macie administrator account for an organization in Organizations.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableOrganizationAdminAccountRequest,
  output: DisableOrganizationAdminAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates a member account from its Amazon Macie administrator account.
 */
export const disassociateFromAdministratorAccount: API.OperationMethod<
  DisassociateFromAdministratorAccountRequest,
  DisassociateFromAdministratorAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateFromAdministratorAccountRequest,
  output: DisassociateFromAdministratorAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * (Deprecated) Disassociates a member account from its Amazon Macie administrator account. This operation has been replaced by the DisassociateFromAdministratorAccount operation.
 */
export const disassociateFromMasterAccount: API.OperationMethod<
  DisassociateFromMasterAccountRequest,
  DisassociateFromMasterAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateFromMasterAccountRequest,
  output: DisassociateFromMasterAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates an Amazon Macie administrator account from a member account.
 */
export const disassociateMember: API.OperationMethod<
  DisassociateMemberRequest,
  DisassociateMemberResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateMemberRequest,
  output: DisassociateMemberResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Enables Amazon Macie and specifies the configuration settings for a Macie account.
 */
export const enableMacie: API.OperationMethod<
  EnableMacieRequest,
  EnableMacieResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableMacieRequest,
  output: EnableMacieResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Designates an account as the delegated Amazon Macie administrator account for an organization in Organizations.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableOrganizationAdminAccountRequest,
  output: EnableOrganizationAdminAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about the Amazon Macie administrator account for an account.
 */
export const getAdministratorAccount: API.OperationMethod<
  GetAdministratorAccountRequest,
  GetAdministratorAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAdministratorAccountRequest,
  output: GetAdministratorAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the settings and status of an allow list.
 */
export const getAllowList: API.OperationMethod<
  GetAllowListRequest,
  GetAllowListResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAllowListRequest,
  output: GetAllowListResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the configuration settings and status of automated sensitive data discovery for an organization or standalone account.
 */
export const getAutomatedDiscoveryConfiguration: API.OperationMethod<
  GetAutomatedDiscoveryConfigurationRequest,
  GetAutomatedDiscoveryConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAutomatedDiscoveryConfigurationRequest,
  output: GetAutomatedDiscoveryConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves (queries) aggregated statistical data about all the S3 buckets that Amazon Macie monitors and analyzes for an account.
 */
export const getBucketStatistics: API.OperationMethod<
  GetBucketStatisticsRequest,
  GetBucketStatisticsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBucketStatisticsRequest,
  output: GetBucketStatisticsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the configuration settings for storing data classification results.
 */
export const getClassificationExportConfiguration: API.OperationMethod<
  GetClassificationExportConfigurationRequest,
  GetClassificationExportConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetClassificationExportConfigurationRequest,
  output: GetClassificationExportConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the classification scope settings for an account.
 */
export const getClassificationScope: API.OperationMethod<
  GetClassificationScopeRequest,
  GetClassificationScopeResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetClassificationScopeRequest,
  output: GetClassificationScopeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the criteria and other settings for a custom data identifier.
 */
export const getCustomDataIdentifier: API.OperationMethod<
  GetCustomDataIdentifierRequest,
  GetCustomDataIdentifierResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomDataIdentifierRequest,
  output: GetCustomDataIdentifierResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the details of one or more findings.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFindingsRequest,
  output: GetFindingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the criteria and other settings for a findings filter.
 */
export const getFindingsFilter: API.OperationMethod<
  GetFindingsFilterRequest,
  GetFindingsFilterResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFindingsFilterRequest,
  output: GetFindingsFilterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the configuration settings for publishing findings to Security Hub.
 */
export const getFindingsPublicationConfiguration: API.OperationMethod<
  GetFindingsPublicationConfigurationRequest,
  GetFindingsPublicationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFindingsPublicationConfigurationRequest,
  output: GetFindingsPublicationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves (queries) aggregated statistical data about findings.
 */
export const getFindingStatistics: API.OperationMethod<
  GetFindingStatisticsRequest,
  GetFindingStatisticsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFindingStatisticsRequest,
  output: GetFindingStatisticsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the count of Amazon Macie membership invitations that were received by an account.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest,
  GetInvitationsCountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInvitationsCountRequest,
  output: GetInvitationsCountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the status and configuration settings for an Amazon Macie account.
 */
export const getMacieSession: API.OperationMethod<
  GetMacieSessionRequest,
  GetMacieSessionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMacieSessionRequest,
  output: GetMacieSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * (Deprecated) Retrieves information about the Amazon Macie administrator account for an account. This operation has been replaced by the GetAdministratorAccount operation.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest,
  GetMasterAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMasterAccountRequest,
  output: GetMasterAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about an account that's associated with an Amazon Macie administrator account.
 */
export const getMember: API.OperationMethod<
  GetMemberRequest,
  GetMemberResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMemberRequest,
  output: GetMemberResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves (queries) sensitive data discovery statistics and the sensitivity score for an S3 bucket.
 */
export const getResourceProfile: API.OperationMethod<
  GetResourceProfileRequest,
  GetResourceProfileResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceProfileRequest,
  output: GetResourceProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the status and configuration settings for retrieving occurrences of sensitive data reported by findings.
 */
export const getRevealConfiguration: API.OperationMethod<
  GetRevealConfigurationRequest,
  GetRevealConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRevealConfigurationRequest,
  output: GetRevealConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves occurrences of sensitive data reported by a finding.
 */
export const getSensitiveDataOccurrences: API.OperationMethod<
  GetSensitiveDataOccurrencesRequest,
  GetSensitiveDataOccurrencesResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSensitiveDataOccurrencesRequest,
  output: GetSensitiveDataOccurrencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnprocessableEntityException,
  ],
}));
/**
 * Checks whether occurrences of sensitive data can be retrieved for a finding.
 */
export const getSensitiveDataOccurrencesAvailability: API.OperationMethod<
  GetSensitiveDataOccurrencesAvailabilityRequest,
  GetSensitiveDataOccurrencesAvailabilityResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSensitiveDataOccurrencesAvailabilityRequest,
  output: GetSensitiveDataOccurrencesAvailabilityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Retrieves the settings for the sensitivity inspection template for an account.
 */
export const getSensitivityInspectionTemplate: API.OperationMethod<
  GetSensitivityInspectionTemplateRequest,
  GetSensitivityInspectionTemplateResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSensitivityInspectionTemplateRequest,
  output: GetSensitivityInspectionTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves (queries) quotas and aggregated usage data for one or more accounts.
 */
export const getUsageStatistics: API.OperationMethod<
  GetUsageStatisticsRequest,
  GetUsageStatisticsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetUsageStatisticsRequest,
  ) => stream.Stream<
    GetUsageStatisticsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetUsageStatisticsRequest,
  ) => stream.Stream<
    UsageRecord,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetUsageStatisticsRequest,
  output: GetUsageStatisticsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "records",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves (queries) aggregated usage data for an account.
 */
export const getUsageTotals: API.OperationMethod<
  GetUsageTotalsRequest,
  GetUsageTotalsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsageTotalsRequest,
  output: GetUsageTotalsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves a subset of information about all the allow lists for an account.
 */
export const listAllowLists: API.OperationMethod<
  ListAllowListsRequest,
  ListAllowListsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAllowListsRequest,
  ) => stream.Stream<
    ListAllowListsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAllowListsRequest,
  ) => stream.Stream<
    AllowListSummary,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAllowListsRequest,
  output: ListAllowListsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "allowLists",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves the status of automated sensitive data discovery for one or more accounts.
 */
export const listAutomatedDiscoveryAccounts: API.OperationMethod<
  ListAutomatedDiscoveryAccountsRequest,
  ListAutomatedDiscoveryAccountsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAutomatedDiscoveryAccountsRequest,
  ) => stream.Stream<
    ListAutomatedDiscoveryAccountsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAutomatedDiscoveryAccountsRequest,
  ) => stream.Stream<
    AutomatedDiscoveryAccount,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAutomatedDiscoveryAccountsRequest,
  output: ListAutomatedDiscoveryAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a subset of information about one or more classification jobs.
 */
export const listClassificationJobs: API.OperationMethod<
  ListClassificationJobsRequest,
  ListClassificationJobsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClassificationJobsRequest,
  ) => stream.Stream<
    ListClassificationJobsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClassificationJobsRequest,
  ) => stream.Stream<
    JobSummary,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClassificationJobsRequest,
  output: ListClassificationJobsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a subset of information about the classification scope for an account.
 */
export const listClassificationScopes: API.OperationMethod<
  ListClassificationScopesRequest,
  ListClassificationScopesResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListClassificationScopesRequest,
  ) => stream.Stream<
    ListClassificationScopesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListClassificationScopesRequest,
  ) => stream.Stream<
    ClassificationScopeSummary,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListClassificationScopesRequest,
  output: ListClassificationScopesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "classificationScopes",
  } as const,
}));
/**
 * Retrieves a subset of information about the custom data identifiers for an account.
 */
export const listCustomDataIdentifiers: API.OperationMethod<
  ListCustomDataIdentifiersRequest,
  ListCustomDataIdentifiersResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCustomDataIdentifiersRequest,
  ) => stream.Stream<
    ListCustomDataIdentifiersResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCustomDataIdentifiersRequest,
  ) => stream.Stream<
    CustomDataIdentifierSummary,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomDataIdentifiersRequest,
  output: ListCustomDataIdentifiersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a subset of information about one or more findings.
 */
export const listFindings: API.OperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFindingsRequest,
  ) => stream.Stream<
    ListFindingsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFindingsRequest,
  ) => stream.Stream<
    string,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsRequest,
  output: ListFindingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingIds",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a subset of information about all the findings filters for an account.
 */
export const listFindingsFilters: API.OperationMethod<
  ListFindingsFiltersRequest,
  ListFindingsFiltersResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFindingsFiltersRequest,
  ) => stream.Stream<
    ListFindingsFiltersResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFindingsFiltersRequest,
  ) => stream.Stream<
    FindingsFilterListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsFiltersRequest,
  output: ListFindingsFiltersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsFilterListItems",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about Amazon Macie membership invitations that were received by an account.
 */
export const listInvitations: API.OperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListInvitationsRequest,
  ) => stream.Stream<
    ListInvitationsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListInvitationsRequest,
  ) => stream.Stream<
    Invitation,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invitations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about all the managed data identifiers that Amazon Macie currently provides.
 */
export const listManagedDataIdentifiers: API.OperationMethod<
  ListManagedDataIdentifiersRequest,
  ListManagedDataIdentifiersResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListManagedDataIdentifiersRequest,
  ) => stream.Stream<
    ListManagedDataIdentifiersResponse,
    CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedDataIdentifiersRequest,
  ) => stream.Stream<
    ManagedDataIdentifierSummary,
    CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedDataIdentifiersRequest,
  output: ListManagedDataIdentifiersResponse,
  errors: [],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
  } as const,
}));
/**
 * Retrieves information about the accounts that are associated with an Amazon Macie administrator account.
 */
export const listMembers: API.OperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMembersRequest,
  ) => stream.Stream<
    ListMembersResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMembersRequest,
  ) => stream.Stream<
    Member,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about the delegated Amazon Macie administrator account for an organization in Organizations.
 */
export const listOrganizationAdminAccounts: API.OperationMethod<
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOrganizationAdminAccountsRequest,
  ) => stream.Stream<
    ListOrganizationAdminAccountsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOrganizationAdminAccountsRequest,
  ) => stream.Stream<
    AdminAccount,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationAdminAccountsRequest,
  output: ListOrganizationAdminAccountsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "adminAccounts",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about objects that Amazon Macie selected from an S3 bucket for automated sensitive data discovery.
 */
export const listResourceProfileArtifacts: API.OperationMethod<
  ListResourceProfileArtifactsRequest,
  ListResourceProfileArtifactsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceProfileArtifactsRequest,
  ) => stream.Stream<
    ListResourceProfileArtifactsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceProfileArtifactsRequest,
  ) => stream.Stream<
    ResourceProfileArtifact,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceProfileArtifactsRequest,
  output: ListResourceProfileArtifactsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifacts",
  } as const,
}));
/**
 * Retrieves information about the types and amount of sensitive data that Amazon Macie found in an S3 bucket.
 */
export const listResourceProfileDetections: API.OperationMethod<
  ListResourceProfileDetectionsRequest,
  ListResourceProfileDetectionsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceProfileDetectionsRequest,
  ) => stream.Stream<
    ListResourceProfileDetectionsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceProfileDetectionsRequest,
  ) => stream.Stream<
    Detection,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceProfileDetectionsRequest,
  output: ListResourceProfileDetectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "detections",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a subset of information about the sensitivity inspection template for an account.
 */
export const listSensitivityInspectionTemplates: API.OperationMethod<
  ListSensitivityInspectionTemplatesRequest,
  ListSensitivityInspectionTemplatesResponse,
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSensitivityInspectionTemplatesRequest,
  ) => stream.Stream<
    ListSensitivityInspectionTemplatesResponse,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSensitivityInspectionTemplatesRequest,
  ) => stream.Stream<
    SensitivityInspectionTemplatesEntry,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSensitivityInspectionTemplatesRequest,
  output: ListSensitivityInspectionTemplatesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sensitivityInspectionTemplates",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves the tags (keys and values) that are associated with an Amazon Macie resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
}));
/**
 * Adds or updates the configuration settings for storing data classification results.
 */
export const putClassificationExportConfiguration: API.OperationMethod<
  PutClassificationExportConfigurationRequest,
  PutClassificationExportConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutClassificationExportConfigurationRequest,
  output: PutClassificationExportConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the configuration settings for publishing findings to Security Hub.
 */
export const putFindingsPublicationConfiguration: API.OperationMethod<
  PutFindingsPublicationConfigurationRequest,
  PutFindingsPublicationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutFindingsPublicationConfigurationRequest,
  output: PutFindingsPublicationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves (queries) statistical data and other information about Amazon Web Services resources that Amazon Macie monitors and analyzes for an account.
 */
export const searchResources: API.OperationMethod<
  SearchResourcesRequest,
  SearchResourcesResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: SearchResourcesRequest,
  ) => stream.Stream<
    SearchResourcesResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: SearchResourcesRequest,
  ) => stream.Stream<
    MatchingResource,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchResourcesRequest,
  output: SearchResourcesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "matchingResources",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Adds or updates one or more tags (keys and values) that are associated with an Amazon Macie resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
}));
/**
 * Tests criteria for a custom data identifier.
 */
export const testCustomDataIdentifier: API.OperationMethod<
  TestCustomDataIdentifierRequest,
  TestCustomDataIdentifierResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestCustomDataIdentifierRequest,
  output: TestCustomDataIdentifierResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes one or more tags (keys and values) from an Amazon Macie resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
}));
/**
 * Updates the settings for an allow list.
 */
export const updateAllowList: API.OperationMethod<
  UpdateAllowListRequest,
  UpdateAllowListResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAllowListRequest,
  output: UpdateAllowListResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Changes the configuration settings and status of automated sensitive data discovery for an organization or standalone account.
 */
export const updateAutomatedDiscoveryConfiguration: API.OperationMethod<
  UpdateAutomatedDiscoveryConfigurationRequest,
  UpdateAutomatedDiscoveryConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAutomatedDiscoveryConfigurationRequest,
  output: UpdateAutomatedDiscoveryConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Changes the status of a classification job.
 */
export const updateClassificationJob: API.OperationMethod<
  UpdateClassificationJobRequest,
  UpdateClassificationJobResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateClassificationJobRequest,
  output: UpdateClassificationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the classification scope settings for an account.
 */
export const updateClassificationScope: API.OperationMethod<
  UpdateClassificationScopeRequest,
  UpdateClassificationScopeResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateClassificationScopeRequest,
  output: UpdateClassificationScopeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the criteria and other settings for a findings filter.
 */
export const updateFindingsFilter: API.OperationMethod<
  UpdateFindingsFilterRequest,
  UpdateFindingsFilterResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFindingsFilterRequest,
  output: UpdateFindingsFilterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Suspends or re-enables Amazon Macie, or updates the configuration settings for a Macie account.
 */
export const updateMacieSession: API.OperationMethod<
  UpdateMacieSessionRequest,
  UpdateMacieSessionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMacieSessionRequest,
  output: UpdateMacieSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Enables an Amazon Macie administrator to suspend or re-enable Macie for a member account.
 */
export const updateMemberSession: API.OperationMethod<
  UpdateMemberSessionRequest,
  UpdateMemberSessionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMemberSessionRequest,
  output: UpdateMemberSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the Amazon Macie configuration settings for an organization in Organizations.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOrganizationConfigurationRequest,
  output: UpdateOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the sensitivity score for an S3 bucket.
 */
export const updateResourceProfile: API.OperationMethod<
  UpdateResourceProfileRequest,
  UpdateResourceProfileResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceProfileRequest,
  output: UpdateResourceProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the sensitivity scoring settings for an S3 bucket.
 */
export const updateResourceProfileDetections: API.OperationMethod<
  UpdateResourceProfileDetectionsRequest,
  UpdateResourceProfileDetectionsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceProfileDetectionsRequest,
  output: UpdateResourceProfileDetectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the status and configuration settings for retrieving occurrences of sensitive data reported by findings.
 */
export const updateRevealConfiguration: API.OperationMethod<
  UpdateRevealConfigurationRequest,
  UpdateRevealConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRevealConfigurationRequest,
  output: UpdateRevealConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the settings for the sensitivity inspection template for an account.
 */
export const updateSensitivityInspectionTemplate: API.OperationMethod<
  UpdateSensitivityInspectionTemplateRequest,
  UpdateSensitivityInspectionTemplateResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSensitivityInspectionTemplateRequest,
  output: UpdateSensitivityInspectionTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
