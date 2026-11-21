import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SecurityHub",
  serviceShapeName: "SecurityHubAPIService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "securityhub" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-10-26");
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
              `https://securityhub-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://securityhub-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://securityhub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://securityhub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://securityhub.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SecurityHub",
  service: "SecurityHub",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidAccessException
  extends /*@__PURE__*/ S.TaggedError<InvalidAccessException>()(
    "InvalidAccessException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class OrganizationalUnitNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationalUnitNotFoundException>()(
    "OrganizationalUnitNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotFoundException>()(
    "OrganizationNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type NonEmptyString = string;
export interface AcceptAdministratorInvitationRequest {
  AdministratorId?: string | undefined;
  InvitationId?: string | undefined;
}
export interface AcceptAdministratorInvitationResponse {}
export interface AcceptInvitationRequest {
  MasterId?: string | undefined;
  InvitationId?: string | undefined;
}
export interface AcceptInvitationResponse {}
export type AutomationRulesArnsList = string[];
export interface BatchDeleteAutomationRulesRequest {
  AutomationRulesArns?: string[] | undefined;
}
export interface UnprocessedAutomationRule {
  RuleArn?: string | undefined;
  ErrorCode?: number | undefined;
  ErrorMessage?: string | undefined;
}
export type UnprocessedAutomationRulesList = UnprocessedAutomationRule[];
export interface BatchDeleteAutomationRulesResponse {
  ProcessedAutomationRules?: string[] | undefined;
  UnprocessedAutomationRules?: UnprocessedAutomationRule[] | undefined;
}
export type StandardsSubscriptionArns = string[];
export interface BatchDisableStandardsRequest {
  StandardsSubscriptionArns?: string[] | undefined;
}
export type StandardsInputParameterMap = { [key: string]: string | undefined };
export type StandardsStatus =
  | "PENDING"
  | "READY"
  | "FAILED"
  | "DELETING"
  | "INCOMPLETE"
  | (string & {});
export type StandardsControlsUpdatable =
  | "READY_FOR_UPDATES"
  | "NOT_READY_FOR_UPDATES"
  | (string & {});
export type StatusReasonCode =
  | "NO_AVAILABLE_CONFIGURATION_RECORDER"
  | "MAXIMUM_NUMBER_OF_CONFIG_RULES_EXCEEDED"
  | "NO_AVAILABLE_MULTICLOUD_CONNECTOR"
  | "INTERNAL_ERROR"
  | (string & {});
export interface StandardsStatusReason {
  StatusReasonCode?: StatusReasonCode | undefined;
}
export type StandardsProvider = "AWS" | "Azure" | (string & {});
export interface StandardsSubscription {
  StandardsSubscriptionArn?: string | undefined;
  StandardsArn?: string | undefined;
  StandardsInput?: { [key: string]: string | undefined } | undefined;
  StandardsStatus?: StandardsStatus | undefined;
  StandardsControlsUpdatable?: StandardsControlsUpdatable | undefined;
  StandardsStatusReason?: StandardsStatusReason | undefined;
  Provider?: StandardsProvider | undefined;
}
export type StandardsSubscriptions = StandardsSubscription[];
export interface BatchDisableStandardsResponse {
  StandardsSubscriptions?:
    | (StandardsSubscription & {
        StandardsSubscriptionArn: NonEmptyString;
        StandardsArn: NonEmptyString;
        StandardsInput: StandardsInputParameterMap;
        StandardsStatus: StandardsStatus;
        StandardsStatusReason: StandardsStatusReason & { StatusReasonCode: StatusReasonCode };
      })[]
    | undefined;
}
export interface StandardsSubscriptionRequest {
  StandardsArn?: string | undefined;
  StandardsInput?: { [key: string]: string | undefined } | undefined;
}
export type StandardsSubscriptionRequests = StandardsSubscriptionRequest[];
export interface BatchEnableStandardsRequest {
  StandardsSubscriptionRequests?: StandardsSubscriptionRequest[] | undefined;
}
export interface BatchEnableStandardsResponse {
  StandardsSubscriptions?:
    | (StandardsSubscription & {
        StandardsSubscriptionArn: NonEmptyString;
        StandardsArn: NonEmptyString;
        StandardsInput: StandardsInputParameterMap;
        StandardsStatus: StandardsStatus;
        StandardsStatusReason: StandardsStatusReason & { StatusReasonCode: StatusReasonCode };
      })[]
    | undefined;
}
export interface BatchGetAutomationRulesRequest {
  AutomationRulesArns?: string[] | undefined;
}
export type RuleStatus = "ENABLED" | "DISABLED" | (string & {});
export type RuleOrderValue = number;
export type StringFilterComparison =
  | "EQUALS"
  | "PREFIX"
  | "NOT_EQUALS"
  | "PREFIX_NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "CONTAINS_WORD"
  | (string & {});
export interface StringFilter {
  Value?: string | undefined;
  Comparison?: StringFilterComparison | undefined;
}
export type StringFilterList = StringFilter[];
export type DateRangeUnit = "DAYS" | (string & {});
export type DateRangeComparison = "WITHIN" | "OLDER_THAN" | (string & {});
export interface DateRange {
  Value?: number | undefined;
  Unit?: DateRangeUnit | undefined;
  Comparison?: DateRangeComparison | undefined;
}
export interface DateFilter {
  Start?: string | undefined;
  End?: string | undefined;
  DateRange?: DateRange | undefined;
}
export type DateFilterList = DateFilter[];
export interface NumberFilter {
  Gte?: number | undefined;
  Lte?: number | undefined;
  Eq?: number | undefined;
  Gt?: number | undefined;
  Lt?: number | undefined;
}
export type NumberFilterList = NumberFilter[];
export type MapFilterComparison =
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | (string & {});
export interface MapFilter {
  Key?: string | undefined;
  Value?: string | undefined;
  Comparison?: MapFilterComparison | undefined;
}
export type MapFilterList = MapFilter[];
export interface AutomationRulesFindingFilters {
  ProductArn?: StringFilter[] | undefined;
  AwsAccountId?: StringFilter[] | undefined;
  Id?: StringFilter[] | undefined;
  GeneratorId?: StringFilter[] | undefined;
  Type?: StringFilter[] | undefined;
  FirstObservedAt?: DateFilter[] | undefined;
  LastObservedAt?: DateFilter[] | undefined;
  CreatedAt?: DateFilter[] | undefined;
  UpdatedAt?: DateFilter[] | undefined;
  Confidence?: NumberFilter[] | undefined;
  Criticality?: NumberFilter[] | undefined;
  Title?: StringFilter[] | undefined;
  Description?: StringFilter[] | undefined;
  SourceUrl?: StringFilter[] | undefined;
  ProductName?: StringFilter[] | undefined;
  CompanyName?: StringFilter[] | undefined;
  SeverityLabel?: StringFilter[] | undefined;
  ResourceType?: StringFilter[] | undefined;
  ResourceId?: StringFilter[] | undefined;
  ResourcePartition?: StringFilter[] | undefined;
  ResourceRegion?: StringFilter[] | undefined;
  ResourceTags?: MapFilter[] | undefined;
  ResourceDetailsOther?: MapFilter[] | undefined;
  ComplianceStatus?: StringFilter[] | undefined;
  ComplianceSecurityControlId?: StringFilter[] | undefined;
  ComplianceAssociatedStandardsId?: StringFilter[] | undefined;
  VerificationState?: StringFilter[] | undefined;
  WorkflowStatus?: StringFilter[] | undefined;
  RecordState?: StringFilter[] | undefined;
  RelatedFindingsProductArn?: StringFilter[] | undefined;
  RelatedFindingsId?: StringFilter[] | undefined;
  NoteText?: StringFilter[] | undefined;
  NoteUpdatedAt?: DateFilter[] | undefined;
  NoteUpdatedBy?: StringFilter[] | undefined;
  UserDefinedFields?: MapFilter[] | undefined;
  ResourceApplicationArn?: StringFilter[] | undefined;
  ResourceApplicationName?: StringFilter[] | undefined;
  AwsAccountName?: StringFilter[] | undefined;
  ResourceProvider?: StringFilter[] | undefined;
  ResourceOwnerAccountId?: StringFilter[] | undefined;
  ResourceOwnerOrgId?: StringFilter[] | undefined;
}
export type AutomationRulesActionType = "FINDING_FIELDS_UPDATE" | (string & {});
export interface NoteUpdate {
  Text?: string | undefined;
  UpdatedBy?: string | undefined;
}
export type RatioScale = number;
export type SeverityLabel =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export interface SeverityUpdate {
  Normalized?: number | undefined;
  Product?: number | undefined;
  Label?: SeverityLabel | undefined;
}
export type VerificationState =
  | "UNKNOWN"
  | "TRUE_POSITIVE"
  | "FALSE_POSITIVE"
  | "BENIGN_POSITIVE"
  | (string & {});
export type TypeList = string[];
export type FieldMap = { [key: string]: string | undefined };
export type WorkflowStatus = "NEW" | "NOTIFIED" | "RESOLVED" | "SUPPRESSED" | (string & {});
export interface WorkflowUpdate {
  Status?: WorkflowStatus | undefined;
}
export interface RelatedFinding {
  ProductArn?: string | undefined;
  Id?: string | undefined;
}
export type RelatedFindingList = RelatedFinding[];
export interface AutomationRulesFindingFieldsUpdate {
  Note?: NoteUpdate | undefined;
  Severity?: SeverityUpdate | undefined;
  VerificationState?: VerificationState | undefined;
  Confidence?: number | undefined;
  Criticality?: number | undefined;
  Types?: string[] | undefined;
  UserDefinedFields?: { [key: string]: string | undefined } | undefined;
  Workflow?: WorkflowUpdate | undefined;
  RelatedFindings?: RelatedFinding[] | undefined;
}
export interface AutomationRulesAction {
  Type?: AutomationRulesActionType | undefined;
  FindingFieldsUpdate?: AutomationRulesFindingFieldsUpdate | undefined;
}
export type ActionList = AutomationRulesAction[];
export interface AutomationRulesConfig {
  RuleArn?: string | undefined;
  RuleStatus?: RuleStatus | undefined;
  RuleOrder?: number | undefined;
  RuleName?: string | undefined;
  Description?: string | undefined;
  IsTerminal?: boolean | undefined;
  Criteria?: AutomationRulesFindingFilters | undefined;
  Actions?: AutomationRulesAction[] | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  CreatedBy?: string | undefined;
}
export type AutomationRulesConfigList = AutomationRulesConfig[];
export interface BatchGetAutomationRulesResponse {
  Rules?:
    | (AutomationRulesConfig & {
        Actions: (AutomationRulesAction & {
          FindingFieldsUpdate: AutomationRulesFindingFieldsUpdate & {
            Note: NoteUpdate & { Text: NonEmptyString; UpdatedBy: NonEmptyString };
            RelatedFindings: (RelatedFinding & {
              ProductArn: NonEmptyString;
              Id: NonEmptyString;
            })[];
          };
        })[];
      })[]
    | undefined;
  UnprocessedAutomationRules?: UnprocessedAutomationRule[] | undefined;
}
export type Target =
  | { AccountId: string; OrganizationalUnitId?: undefined; RootId?: undefined }
  | { AccountId?: undefined; OrganizationalUnitId: string; RootId?: undefined }
  | { AccountId?: undefined; OrganizationalUnitId?: undefined; RootId: string };
export interface ConfigurationPolicyAssociation {
  Target?: Target | undefined;
}
export type ConfigurationPolicyAssociationsList = ConfigurationPolicyAssociation[];
export interface BatchGetConfigurationPolicyAssociationsRequest {
  ConfigurationPolicyAssociationIdentifiers?: ConfigurationPolicyAssociation[] | undefined;
}
export type TargetType = "ACCOUNT" | "ORGANIZATIONAL_UNIT" | "ROOT" | (string & {});
export type AssociationType = "INHERITED" | "APPLIED" | (string & {});
export type ConfigurationPolicyAssociationStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "DISABLED"
  | (string & {});
export interface ConfigurationPolicyAssociationSummary {
  ConfigurationPolicyId?: string | undefined;
  TargetId?: string | undefined;
  TargetType?: TargetType | undefined;
  AssociationType?: AssociationType | undefined;
  UpdatedAt?: Date | undefined;
  AssociationStatus?: ConfigurationPolicyAssociationStatus | undefined;
  AssociationStatusMessage?: string | undefined;
}
export type ConfigurationPolicyAssociationList = ConfigurationPolicyAssociationSummary[];
export interface UnprocessedConfigurationPolicyAssociation {
  ConfigurationPolicyAssociationIdentifiers?: ConfigurationPolicyAssociation | undefined;
  ErrorCode?: string | undefined;
  ErrorReason?: string | undefined;
}
export type UnprocessedConfigurationPolicyAssociationList =
  UnprocessedConfigurationPolicyAssociation[];
export interface BatchGetConfigurationPolicyAssociationsResponse {
  ConfigurationPolicyAssociations?: ConfigurationPolicyAssociationSummary[] | undefined;
  UnprocessedConfigurationPolicyAssociations?:
    | UnprocessedConfigurationPolicyAssociation[]
    | undefined;
}
export type StringList = string[];
export interface BatchGetSecurityControlsRequest {
  SecurityControlIds?: string[] | undefined;
}
export type SeverityRating = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
export type ControlStatus = "ENABLED" | "DISABLED" | (string & {});
export type UpdateStatus = "READY" | "UPDATING" | (string & {});
export type ParameterValueType = "DEFAULT" | "CUSTOM" | (string & {});
export type IntegerList = number[];
export type ParameterValue =
  | {
      Integer: number;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList: number[];
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double: number;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String: string;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList: string[];
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean: boolean;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum: string;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList: string[];
    };
export interface ParameterConfiguration {
  ValueType?: ParameterValueType | undefined;
  Value?: ParameterValue | undefined;
}
export type Parameters = { [key: string]: ParameterConfiguration | undefined };
export type AlphaNumericNonEmptyString = string;
export type SecurityControlsProvider = "AWS" | "Azure" | (string & {});
export interface SecurityControl {
  SecurityControlId?: string | undefined;
  SecurityControlArn?: string | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  RemediationUrl?: string | undefined;
  SeverityRating?: SeverityRating | undefined;
  SecurityControlStatus?: ControlStatus | undefined;
  UpdateStatus?: UpdateStatus | undefined;
  Parameters?: { [key: string]: ParameterConfiguration | undefined } | undefined;
  LastUpdateReason?: string | undefined;
  Provider?: SecurityControlsProvider | undefined;
}
export type SecurityControls = SecurityControl[];
export type UnprocessedErrorCode =
  | "INVALID_INPUT"
  | "ACCESS_DENIED"
  | "NOT_FOUND"
  | "RESOURCE_NOT_FOUND"
  | "LIMIT_EXCEEDED"
  | (string & {});
export interface UnprocessedSecurityControl {
  SecurityControlId?: string | undefined;
  ErrorCode?: UnprocessedErrorCode | undefined;
  ErrorReason?: string | undefined;
}
export type UnprocessedSecurityControls = UnprocessedSecurityControl[];
export interface BatchGetSecurityControlsResponse {
  SecurityControls: (SecurityControl & {
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    RemediationUrl: NonEmptyString;
    SeverityRating: SeverityRating;
    SecurityControlStatus: ControlStatus;
    Parameters: {
      [key: string]: (ParameterConfiguration & { ValueType: ParameterValueType }) | undefined;
    };
  })[];
  UnprocessedIds?:
    | (UnprocessedSecurityControl & {
        SecurityControlId: NonEmptyString;
        ErrorCode: UnprocessedErrorCode;
      })[]
    | undefined;
}
export interface StandardsControlAssociationId {
  SecurityControlId?: string | undefined;
  StandardsArn?: string | undefined;
}
export type StandardsControlAssociationIds = StandardsControlAssociationId[];
export interface BatchGetStandardsControlAssociationsRequest {
  StandardsControlAssociationIds?: StandardsControlAssociationId[] | undefined;
}
export type AssociationStatus = "ENABLED" | "DISABLED" | (string & {});
export type RelatedRequirementsList = string[];
export type StandardsControlArnList = string[];
export interface StandardsControlAssociationDetail {
  StandardsArn?: string | undefined;
  SecurityControlId?: string | undefined;
  SecurityControlArn?: string | undefined;
  AssociationStatus?: AssociationStatus | undefined;
  RelatedRequirements?: string[] | undefined;
  UpdatedAt?: Date | undefined;
  UpdatedReason?: string | undefined;
  StandardsControlTitle?: string | undefined;
  StandardsControlDescription?: string | undefined;
  StandardsControlArns?: string[] | undefined;
}
export type StandardsControlAssociationDetails = StandardsControlAssociationDetail[];
export interface UnprocessedStandardsControlAssociation {
  StandardsControlAssociationId?: StandardsControlAssociationId | undefined;
  ErrorCode?: UnprocessedErrorCode | undefined;
  ErrorReason?: string | undefined;
}
export type UnprocessedStandardsControlAssociations = UnprocessedStandardsControlAssociation[];
export interface BatchGetStandardsControlAssociationsResponse {
  StandardsControlAssociationDetails: (StandardsControlAssociationDetail & {
    StandardsArn: NonEmptyString;
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    AssociationStatus: AssociationStatus;
  })[];
  UnprocessedAssociations?:
    | (UnprocessedStandardsControlAssociation & {
        StandardsControlAssociationId: StandardsControlAssociationId & {
          SecurityControlId: NonEmptyString;
          StandardsArn: NonEmptyString;
        };
        ErrorCode: UnprocessedErrorCode;
      })[]
    | undefined;
}
export interface Severity {
  Product?: number | undefined;
  Label?: SeverityLabel | undefined;
  Normalized?: number | undefined;
  Original?: string | undefined;
}
export interface Recommendation {
  Text?: string | undefined;
  Url?: string | undefined;
}
export interface Remediation {
  Recommendation?: Recommendation | undefined;
}
export type MalwareType =
  | "ADWARE"
  | "BLENDED_THREAT"
  | "BOTNET_AGENT"
  | "COIN_MINER"
  | "EXPLOIT_KIT"
  | "KEYLOGGER"
  | "MACRO"
  | "POTENTIALLY_UNWANTED"
  | "SPYWARE"
  | "RANSOMWARE"
  | "REMOTE_ACCESS"
  | "ROOTKIT"
  | "TROJAN"
  | "VIRUS"
  | "WORM"
  | (string & {});
export type MalwareState = "OBSERVED" | "REMOVAL_FAILED" | "REMOVED" | (string & {});
export interface Malware {
  Name?: string | undefined;
  Type?: MalwareType | undefined;
  Path?: string | undefined;
  State?: MalwareState | undefined;
}
export type MalwareList = Malware[];
export type NetworkDirection = "IN" | "OUT" | (string & {});
export interface PortRange {
  Begin?: number | undefined;
  End?: number | undefined;
}
export interface Network {
  Direction?: NetworkDirection | undefined;
  Protocol?: string | undefined;
  OpenPortRange?: PortRange | undefined;
  SourceIpV4?: string | undefined;
  SourceIpV6?: string | undefined;
  SourcePort?: number | undefined;
  SourceDomain?: string | undefined;
  SourceMac?: string | undefined;
  DestinationIpV4?: string | undefined;
  DestinationIpV6?: string | undefined;
  DestinationPort?: number | undefined;
  DestinationDomain?: string | undefined;
}
export type PortRangeList = PortRange[];
export interface NetworkPathComponentDetails {
  Address?: string[] | undefined;
  PortRanges?: PortRange[] | undefined;
}
export interface NetworkHeader {
  Protocol?: string | undefined;
  Destination?: NetworkPathComponentDetails | undefined;
  Source?: NetworkPathComponentDetails | undefined;
}
export interface NetworkPathComponent {
  ComponentId?: string | undefined;
  ComponentType?: string | undefined;
  Egress?: NetworkHeader | undefined;
  Ingress?: NetworkHeader | undefined;
}
export type NetworkPathList = NetworkPathComponent[];
export interface ProcessDetails {
  Name?: string | undefined;
  Path?: string | undefined;
  Pid?: number | undefined;
  ParentPid?: number | undefined;
  LaunchedAt?: string | undefined;
  TerminatedAt?: string | undefined;
}
export interface FilePaths {
  FilePath?: string | undefined;
  FileName?: string | undefined;
  ResourceId?: string | undefined;
  Hash?: string | undefined;
}
export type FilePathList = FilePaths[];
export interface Threat {
  Name?: string | undefined;
  Severity?: string | undefined;
  ItemCount?: number | undefined;
  FilePaths?: FilePaths[] | undefined;
}
export type ThreatList = Threat[];
export type ThreatIntelIndicatorType =
  | "DOMAIN"
  | "EMAIL_ADDRESS"
  | "HASH_MD5"
  | "HASH_SHA1"
  | "HASH_SHA256"
  | "HASH_SHA512"
  | "IPV4_ADDRESS"
  | "IPV6_ADDRESS"
  | "MUTEX"
  | "PROCESS"
  | "URL"
  | (string & {});
export type ThreatIntelIndicatorCategory =
  | "BACKDOOR"
  | "CARD_STEALER"
  | "COMMAND_AND_CONTROL"
  | "DROP_SITE"
  | "EXPLOIT_SITE"
  | "KEYLOGGER"
  | (string & {});
export interface ThreatIntelIndicator {
  Type?: ThreatIntelIndicatorType | undefined;
  Value?: string | undefined;
  Category?: ThreatIntelIndicatorCategory | undefined;
  LastObservedAt?: string | undefined;
  Source?: string | undefined;
  SourceUrl?: string | undefined;
}
export type ThreatIntelIndicatorList = ThreatIntelIndicator[];
export type Partition =
  | "aws"
  | "aws-cn"
  | "aws-us-gov"
  | "aws-us-iso"
  | "aws-us-iso-b"
  | "AzureCloud"
  | (string & {});
export type CloudProviderName = "Azure" | "AWS" | (string & {});
export interface ResourceOwnerAccount {
  Id?: string | undefined;
}
export interface ResourceOwnerOrg {
  Id?: string | undefined;
}
export interface ResourceOwner {
  Account?: ResourceOwnerAccount | undefined;
  Org?: ResourceOwnerOrg | undefined;
}
export interface ClassificationStatus {
  Code?: string | undefined;
  Reason?: string | undefined;
}
export interface Range {
  Start?: number | undefined;
  End?: number | undefined;
  StartColumn?: number | undefined;
}
export type Ranges = Range[];
export interface Page {
  PageNumber?: number | undefined;
  LineRange?: Range | undefined;
  OffsetRange?: Range | undefined;
}
export type Pages = Page[];
export interface Record {
  JsonPath?: string | undefined;
  RecordIndex?: number | undefined;
}
export type Records = Record[];
export interface Cell {
  Column?: number | undefined;
  Row?: number | undefined;
  ColumnName?: string | undefined;
  CellReference?: string | undefined;
}
export type Cells = Cell[];
export interface Occurrences {
  LineRanges?: Range[] | undefined;
  OffsetRanges?: Range[] | undefined;
  Pages?: Page[] | undefined;
  Records?: Record[] | undefined;
  Cells?: Cell[] | undefined;
}
export interface SensitiveDataDetections {
  Count?: number | undefined;
  Type?: string | undefined;
  Occurrences?: Occurrences | undefined;
}
export type SensitiveDataDetectionsList = SensitiveDataDetections[];
export interface SensitiveDataResult {
  Category?: string | undefined;
  Detections?: SensitiveDataDetections[] | undefined;
  TotalCount?: number | undefined;
}
export type SensitiveDataResultList = SensitiveDataResult[];
export interface CustomDataIdentifiersDetections {
  Count?: number | undefined;
  Arn?: string | undefined;
  Name?: string | undefined;
  Occurrences?: Occurrences | undefined;
}
export type CustomDataIdentifiersDetectionsList = CustomDataIdentifiersDetections[];
export interface CustomDataIdentifiersResult {
  Detections?: CustomDataIdentifiersDetections[] | undefined;
  TotalCount?: number | undefined;
}
export interface ClassificationResult {
  MimeType?: string | undefined;
  SizeClassified?: number | undefined;
  AdditionalOccurrences?: boolean | undefined;
  Status?: ClassificationStatus | undefined;
  SensitiveData?: SensitiveDataResult[] | undefined;
  CustomDataIdentifiers?: CustomDataIdentifiersResult | undefined;
}
export interface DataClassificationDetails {
  DetailedResultsLocation?: string | undefined;
  Result?: ClassificationResult | undefined;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails {
  OnDemandAllocationStrategy?: string | undefined;
  OnDemandBaseCapacity?: number | undefined;
  OnDemandPercentageAboveBaseCapacity?: number | undefined;
  SpotAllocationStrategy?: string | undefined;
  SpotInstancePools?: number | undefined;
  SpotMaxPrice?: string | undefined;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Version?: string | undefined;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails {
  InstanceType?: string | undefined;
  WeightedCapacity?: string | undefined;
}
export type AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesList =
  AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails[];
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails {
  LaunchTemplateSpecification?:
    | AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification
    | undefined;
  Overrides?:
    | AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails[]
    | undefined;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails {
  InstancesDistribution?:
    | AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails
    | undefined;
  LaunchTemplate?:
    | AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails
    | undefined;
}
export interface AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails {
  Value?: string | undefined;
}
export type AwsAutoScalingAutoScalingGroupAvailabilityZonesList =
  AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails[];
export interface AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Version?: string | undefined;
}
export interface AwsAutoScalingAutoScalingGroupDetails {
  LaunchConfigurationName?: string | undefined;
  LoadBalancerNames?: string[] | undefined;
  HealthCheckType?: string | undefined;
  HealthCheckGracePeriod?: number | undefined;
  CreatedTime?: string | undefined;
  MixedInstancesPolicy?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails | undefined;
  AvailabilityZones?: AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails[] | undefined;
  LaunchTemplate?:
    | AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification
    | undefined;
  CapacityRebalance?: boolean | undefined;
}
export interface AwsCodeBuildProjectArtifactsDetails {
  ArtifactIdentifier?: string | undefined;
  EncryptionDisabled?: boolean | undefined;
  Location?: string | undefined;
  Name?: string | undefined;
  NamespaceType?: string | undefined;
  OverrideArtifactName?: boolean | undefined;
  Packaging?: string | undefined;
  Path?: string | undefined;
  Type?: string | undefined;
}
export type AwsCodeBuildProjectArtifactsList = AwsCodeBuildProjectArtifactsDetails[];
export interface AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails {
  Name?: string | undefined;
  Type?: string | undefined;
  Value?: string | undefined;
}
export type AwsCodeBuildProjectEnvironmentEnvironmentVariablesList =
  AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails[];
export interface AwsCodeBuildProjectEnvironmentRegistryCredential {
  Credential?: string | undefined;
  CredentialProvider?: string | undefined;
}
export interface AwsCodeBuildProjectEnvironment {
  Certificate?: string | undefined;
  EnvironmentVariables?: AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails[] | undefined;
  PrivilegedMode?: boolean | undefined;
  ImagePullCredentialsType?: string | undefined;
  RegistryCredential?: AwsCodeBuildProjectEnvironmentRegistryCredential | undefined;
  Type?: string | undefined;
}
export interface AwsCodeBuildProjectSource {
  Type?: string | undefined;
  Location?: string | undefined;
  GitCloneDepth?: number | undefined;
  InsecureSsl?: boolean | undefined;
}
export interface AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails {
  GroupName?: string | undefined;
  Status?: string | undefined;
  StreamName?: string | undefined;
}
export interface AwsCodeBuildProjectLogsConfigS3LogsDetails {
  EncryptionDisabled?: boolean | undefined;
  Location?: string | undefined;
  Status?: string | undefined;
}
export interface AwsCodeBuildProjectLogsConfigDetails {
  CloudWatchLogs?: AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails | undefined;
  S3Logs?: AwsCodeBuildProjectLogsConfigS3LogsDetails | undefined;
}
export type NonEmptyStringList = string[];
export interface AwsCodeBuildProjectVpcConfig {
  VpcId?: string | undefined;
  Subnets?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
}
export interface AwsCodeBuildProjectDetails {
  EncryptionKey?: string | undefined;
  Artifacts?: AwsCodeBuildProjectArtifactsDetails[] | undefined;
  Environment?: AwsCodeBuildProjectEnvironment | undefined;
  Name?: string | undefined;
  Source?: AwsCodeBuildProjectSource | undefined;
  ServiceRole?: string | undefined;
  LogsConfig?: AwsCodeBuildProjectLogsConfigDetails | undefined;
  VpcConfig?: AwsCodeBuildProjectVpcConfig | undefined;
  SecondaryArtifacts?: AwsCodeBuildProjectArtifactsDetails[] | undefined;
}
export interface AwsCloudFrontDistributionCacheBehavior {
  ViewerProtocolPolicy?: string | undefined;
}
export type AwsCloudFrontDistributionCacheBehaviorsItemList =
  AwsCloudFrontDistributionCacheBehavior[];
export interface AwsCloudFrontDistributionCacheBehaviors {
  Items?: AwsCloudFrontDistributionCacheBehavior[] | undefined;
}
export interface AwsCloudFrontDistributionDefaultCacheBehavior {
  ViewerProtocolPolicy?: string | undefined;
}
export interface AwsCloudFrontDistributionLogging {
  Bucket?: string | undefined;
  Enabled?: boolean | undefined;
  IncludeCookies?: boolean | undefined;
  Prefix?: string | undefined;
}
export interface AwsCloudFrontDistributionOriginS3OriginConfig {
  OriginAccessIdentity?: string | undefined;
}
export interface AwsCloudFrontDistributionOriginSslProtocols {
  Items?: string[] | undefined;
  Quantity?: number | undefined;
}
export interface AwsCloudFrontDistributionOriginCustomOriginConfig {
  HttpPort?: number | undefined;
  HttpsPort?: number | undefined;
  OriginKeepaliveTimeout?: number | undefined;
  OriginProtocolPolicy?: string | undefined;
  OriginReadTimeout?: number | undefined;
  OriginSslProtocols?: AwsCloudFrontDistributionOriginSslProtocols | undefined;
}
export interface AwsCloudFrontDistributionOriginItem {
  DomainName?: string | undefined;
  Id?: string | undefined;
  OriginPath?: string | undefined;
  S3OriginConfig?: AwsCloudFrontDistributionOriginS3OriginConfig | undefined;
  CustomOriginConfig?: AwsCloudFrontDistributionOriginCustomOriginConfig | undefined;
}
export type AwsCloudFrontDistributionOriginItemList = AwsCloudFrontDistributionOriginItem[];
export interface AwsCloudFrontDistributionOrigins {
  Items?: AwsCloudFrontDistributionOriginItem[] | undefined;
}
export type AwsCloudFrontDistributionOriginGroupFailoverStatusCodesItemList = number[];
export interface AwsCloudFrontDistributionOriginGroupFailoverStatusCodes {
  Items?: number[] | undefined;
  Quantity?: number | undefined;
}
export interface AwsCloudFrontDistributionOriginGroupFailover {
  StatusCodes?: AwsCloudFrontDistributionOriginGroupFailoverStatusCodes | undefined;
}
export interface AwsCloudFrontDistributionOriginGroup {
  FailoverCriteria?: AwsCloudFrontDistributionOriginGroupFailover | undefined;
}
export type AwsCloudFrontDistributionOriginGroupsItemList = AwsCloudFrontDistributionOriginGroup[];
export interface AwsCloudFrontDistributionOriginGroups {
  Items?: AwsCloudFrontDistributionOriginGroup[] | undefined;
}
export interface AwsCloudFrontDistributionViewerCertificate {
  AcmCertificateArn?: string | undefined;
  Certificate?: string | undefined;
  CertificateSource?: string | undefined;
  CloudFrontDefaultCertificate?: boolean | undefined;
  IamCertificateId?: string | undefined;
  MinimumProtocolVersion?: string | undefined;
  SslSupportMethod?: string | undefined;
}
export interface AwsCloudFrontDistributionDetails {
  CacheBehaviors?: AwsCloudFrontDistributionCacheBehaviors | undefined;
  DefaultCacheBehavior?: AwsCloudFrontDistributionDefaultCacheBehavior | undefined;
  DefaultRootObject?: string | undefined;
  DomainName?: string | undefined;
  ETag?: string | undefined;
  LastModifiedTime?: string | undefined;
  Logging?: AwsCloudFrontDistributionLogging | undefined;
  Origins?: AwsCloudFrontDistributionOrigins | undefined;
  OriginGroups?: AwsCloudFrontDistributionOriginGroups | undefined;
  ViewerCertificate?: AwsCloudFrontDistributionViewerCertificate | undefined;
  Status?: string | undefined;
  WebAclId?: string | undefined;
}
export interface AwsEc2InstanceNetworkInterfacesDetails {
  NetworkInterfaceId?: string | undefined;
}
export type AwsEc2InstanceNetworkInterfacesList = AwsEc2InstanceNetworkInterfacesDetails[];
export interface AwsEc2InstanceMetadataOptions {
  HttpEndpoint?: string | undefined;
  HttpProtocolIpv6?: string | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpTokens?: string | undefined;
  InstanceMetadataTags?: string | undefined;
}
export interface AwsEc2InstanceMonitoringDetails {
  State?: string | undefined;
}
export interface AwsEc2InstanceDetails {
  Type?: string | undefined;
  ImageId?: string | undefined;
  IpV4Addresses?: string[] | undefined;
  IpV6Addresses?: string[] | undefined;
  KeyName?: string | undefined;
  IamInstanceProfileArn?: string | undefined;
  VpcId?: string | undefined;
  SubnetId?: string | undefined;
  LaunchedAt?: string | undefined;
  NetworkInterfaces?: AwsEc2InstanceNetworkInterfacesDetails[] | undefined;
  VirtualizationType?: string | undefined;
  MetadataOptions?: AwsEc2InstanceMetadataOptions | undefined;
  Monitoring?: AwsEc2InstanceMonitoringDetails | undefined;
}
export interface AwsEc2NetworkInterfaceAttachment {
  AttachTime?: string | undefined;
  AttachmentId?: string | undefined;
  DeleteOnTermination?: boolean | undefined;
  DeviceIndex?: number | undefined;
  InstanceId?: string | undefined;
  InstanceOwnerId?: string | undefined;
  Status?: string | undefined;
}
export interface AwsEc2NetworkInterfaceSecurityGroup {
  GroupName?: string | undefined;
  GroupId?: string | undefined;
}
export type AwsEc2NetworkInterfaceSecurityGroupList = AwsEc2NetworkInterfaceSecurityGroup[];
export interface AwsEc2NetworkInterfaceIpV6AddressDetail {
  IpV6Address?: string | undefined;
}
export type AwsEc2NetworkInterfaceIpV6AddressList = AwsEc2NetworkInterfaceIpV6AddressDetail[];
export interface AwsEc2NetworkInterfacePrivateIpAddressDetail {
  PrivateIpAddress?: string | undefined;
  PrivateDnsName?: string | undefined;
}
export type AwsEc2NetworkInterfacePrivateIpAddressList =
  AwsEc2NetworkInterfacePrivateIpAddressDetail[];
export interface AwsEc2NetworkInterfaceDetails {
  Attachment?: AwsEc2NetworkInterfaceAttachment | undefined;
  NetworkInterfaceId?: string | undefined;
  SecurityGroups?: AwsEc2NetworkInterfaceSecurityGroup[] | undefined;
  SourceDestCheck?: boolean | undefined;
  IpV6Addresses?: AwsEc2NetworkInterfaceIpV6AddressDetail[] | undefined;
  PrivateIpAddresses?: AwsEc2NetworkInterfacePrivateIpAddressDetail[] | undefined;
  PublicDnsName?: string | undefined;
  PublicIp?: string | undefined;
}
export interface AwsEc2SecurityGroupUserIdGroupPair {
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  PeeringStatus?: string | undefined;
  UserId?: string | undefined;
  VpcId?: string | undefined;
  VpcPeeringConnectionId?: string | undefined;
}
export type AwsEc2SecurityGroupUserIdGroupPairList = AwsEc2SecurityGroupUserIdGroupPair[];
export interface AwsEc2SecurityGroupIpRange {
  CidrIp?: string | undefined;
}
export type AwsEc2SecurityGroupIpRangeList = AwsEc2SecurityGroupIpRange[];
export interface AwsEc2SecurityGroupIpv6Range {
  CidrIpv6?: string | undefined;
}
export type AwsEc2SecurityGroupIpv6RangeList = AwsEc2SecurityGroupIpv6Range[];
export interface AwsEc2SecurityGroupPrefixListId {
  PrefixListId?: string | undefined;
}
export type AwsEc2SecurityGroupPrefixListIdList = AwsEc2SecurityGroupPrefixListId[];
export interface AwsEc2SecurityGroupIpPermission {
  IpProtocol?: string | undefined;
  FromPort?: number | undefined;
  ToPort?: number | undefined;
  UserIdGroupPairs?: AwsEc2SecurityGroupUserIdGroupPair[] | undefined;
  IpRanges?: AwsEc2SecurityGroupIpRange[] | undefined;
  Ipv6Ranges?: AwsEc2SecurityGroupIpv6Range[] | undefined;
  PrefixListIds?: AwsEc2SecurityGroupPrefixListId[] | undefined;
}
export type AwsEc2SecurityGroupIpPermissionList = AwsEc2SecurityGroupIpPermission[];
export interface AwsEc2SecurityGroupDetails {
  GroupName?: string | undefined;
  GroupId?: string | undefined;
  OwnerId?: string | undefined;
  VpcId?: string | undefined;
  IpPermissions?: AwsEc2SecurityGroupIpPermission[] | undefined;
  IpPermissionsEgress?: AwsEc2SecurityGroupIpPermission[] | undefined;
}
export interface AwsEc2VolumeAttachment {
  AttachTime?: string | undefined;
  DeleteOnTermination?: boolean | undefined;
  InstanceId?: string | undefined;
  Status?: string | undefined;
}
export type AwsEc2VolumeAttachmentList = AwsEc2VolumeAttachment[];
export interface AwsEc2VolumeDetails {
  CreateTime?: string | undefined;
  DeviceName?: string | undefined;
  Encrypted?: boolean | undefined;
  Size?: number | undefined;
  SnapshotId?: string | undefined;
  Status?: string | undefined;
  KmsKeyId?: string | undefined;
  Attachments?: AwsEc2VolumeAttachment[] | undefined;
  VolumeId?: string | undefined;
  VolumeType?: string | undefined;
  VolumeScanStatus?: string | undefined;
}
export interface CidrBlockAssociation {
  AssociationId?: string | undefined;
  CidrBlock?: string | undefined;
  CidrBlockState?: string | undefined;
}
export type CidrBlockAssociationList = CidrBlockAssociation[];
export interface Ipv6CidrBlockAssociation {
  AssociationId?: string | undefined;
  Ipv6CidrBlock?: string | undefined;
  CidrBlockState?: string | undefined;
}
export type Ipv6CidrBlockAssociationList = Ipv6CidrBlockAssociation[];
export interface AwsEc2VpcDetails {
  CidrBlockAssociationSet?: CidrBlockAssociation[] | undefined;
  Ipv6CidrBlockAssociationSet?: Ipv6CidrBlockAssociation[] | undefined;
  DhcpOptionsId?: string | undefined;
  State?: string | undefined;
}
export interface AwsEc2EipDetails {
  InstanceId?: string | undefined;
  PublicIp?: string | undefined;
  AllocationId?: string | undefined;
  AssociationId?: string | undefined;
  Domain?: string | undefined;
  PublicIpv4Pool?: string | undefined;
  NetworkBorderGroup?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  NetworkInterfaceOwnerId?: string | undefined;
  PrivateIpAddress?: string | undefined;
}
export interface AwsEc2SubnetDetails {
  AssignIpv6AddressOnCreation?: boolean | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  AvailableIpAddressCount?: number | undefined;
  CidrBlock?: string | undefined;
  DefaultForAz?: boolean | undefined;
  MapPublicIpOnLaunch?: boolean | undefined;
  OwnerId?: string | undefined;
  State?: string | undefined;
  SubnetArn?: string | undefined;
  SubnetId?: string | undefined;
  VpcId?: string | undefined;
  Ipv6CidrBlockAssociationSet?: Ipv6CidrBlockAssociation[] | undefined;
}
export interface AwsEc2NetworkAclAssociation {
  NetworkAclAssociationId?: string | undefined;
  NetworkAclId?: string | undefined;
  SubnetId?: string | undefined;
}
export type AwsEc2NetworkAclAssociationList = AwsEc2NetworkAclAssociation[];
export interface IcmpTypeCode {
  Code?: number | undefined;
  Type?: number | undefined;
}
export interface PortRangeFromTo {
  From?: number | undefined;
  To?: number | undefined;
}
export interface AwsEc2NetworkAclEntry {
  CidrBlock?: string | undefined;
  Egress?: boolean | undefined;
  IcmpTypeCode?: IcmpTypeCode | undefined;
  Ipv6CidrBlock?: string | undefined;
  PortRange?: PortRangeFromTo | undefined;
  Protocol?: string | undefined;
  RuleAction?: string | undefined;
  RuleNumber?: number | undefined;
}
export type AwsEc2NetworkAclEntryList = AwsEc2NetworkAclEntry[];
export interface AwsEc2NetworkAclDetails {
  IsDefault?: boolean | undefined;
  NetworkAclId?: string | undefined;
  OwnerId?: string | undefined;
  VpcId?: string | undefined;
  Associations?: AwsEc2NetworkAclAssociation[] | undefined;
  Entries?: AwsEc2NetworkAclEntry[] | undefined;
}
export interface AvailabilityZone {
  ZoneName?: string | undefined;
  SubnetId?: string | undefined;
}
export type AvailabilityZones = AvailabilityZone[];
export type SecurityGroups = string[];
export interface LoadBalancerState {
  Code?: string | undefined;
  Reason?: string | undefined;
}
export interface AwsElbv2LoadBalancerAttribute {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type AwsElbv2LoadBalancerAttributes = AwsElbv2LoadBalancerAttribute[];
export interface AwsElbv2LoadBalancerDetails {
  AvailabilityZones?: AvailabilityZone[] | undefined;
  CanonicalHostedZoneId?: string | undefined;
  CreatedTime?: string | undefined;
  DNSName?: string | undefined;
  IpAddressType?: string | undefined;
  Scheme?: string | undefined;
  SecurityGroups?: string[] | undefined;
  State?: LoadBalancerState | undefined;
  Type?: string | undefined;
  VpcId?: string | undefined;
  LoadBalancerAttributes?: AwsElbv2LoadBalancerAttribute[] | undefined;
}
export interface AwsElasticBeanstalkEnvironmentEnvironmentLink {
  EnvironmentName?: string | undefined;
  LinkName?: string | undefined;
}
export type AwsElasticBeanstalkEnvironmentEnvironmentLinks =
  AwsElasticBeanstalkEnvironmentEnvironmentLink[];
export interface AwsElasticBeanstalkEnvironmentOptionSetting {
  Namespace?: string | undefined;
  OptionName?: string | undefined;
  ResourceName?: string | undefined;
  Value?: string | undefined;
}
export type AwsElasticBeanstalkEnvironmentOptionSettings =
  AwsElasticBeanstalkEnvironmentOptionSetting[];
export interface AwsElasticBeanstalkEnvironmentTier {
  Name?: string | undefined;
  Type?: string | undefined;
  Version?: string | undefined;
}
export interface AwsElasticBeanstalkEnvironmentDetails {
  ApplicationName?: string | undefined;
  Cname?: string | undefined;
  DateCreated?: string | undefined;
  DateUpdated?: string | undefined;
  Description?: string | undefined;
  EndpointUrl?: string | undefined;
  EnvironmentArn?: string | undefined;
  EnvironmentId?: string | undefined;
  EnvironmentLinks?: AwsElasticBeanstalkEnvironmentEnvironmentLink[] | undefined;
  EnvironmentName?: string | undefined;
  OptionSettings?: AwsElasticBeanstalkEnvironmentOptionSetting[] | undefined;
  PlatformArn?: string | undefined;
  SolutionStackName?: string | undefined;
  Status?: string | undefined;
  Tier?: AwsElasticBeanstalkEnvironmentTier | undefined;
  VersionLabel?: string | undefined;
}
export interface AwsElasticsearchDomainDomainEndpointOptions {
  EnforceHTTPS?: boolean | undefined;
  TLSSecurityPolicy?: string | undefined;
}
export interface AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails {
  AvailabilityZoneCount?: number | undefined;
}
export interface AwsElasticsearchDomainElasticsearchClusterConfigDetails {
  DedicatedMasterCount?: number | undefined;
  DedicatedMasterEnabled?: boolean | undefined;
  DedicatedMasterType?: string | undefined;
  InstanceCount?: number | undefined;
  InstanceType?: string | undefined;
  ZoneAwarenessConfig?:
    | AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails
    | undefined;
  ZoneAwarenessEnabled?: boolean | undefined;
}
export interface AwsElasticsearchDomainEncryptionAtRestOptions {
  Enabled?: boolean | undefined;
  KmsKeyId?: string | undefined;
}
export interface AwsElasticsearchDomainLogPublishingOptionsLogConfig {
  CloudWatchLogsLogGroupArn?: string | undefined;
  Enabled?: boolean | undefined;
}
export interface AwsElasticsearchDomainLogPublishingOptions {
  IndexSlowLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig | undefined;
  SearchSlowLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig | undefined;
  AuditLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig | undefined;
}
export interface AwsElasticsearchDomainNodeToNodeEncryptionOptions {
  Enabled?: boolean | undefined;
}
export interface AwsElasticsearchDomainServiceSoftwareOptions {
  AutomatedUpdateDate?: string | undefined;
  Cancellable?: boolean | undefined;
  CurrentVersion?: string | undefined;
  Description?: string | undefined;
  NewVersion?: string | undefined;
  UpdateAvailable?: boolean | undefined;
  UpdateStatus?: string | undefined;
}
export interface AwsElasticsearchDomainVPCOptions {
  AvailabilityZones?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
  VPCId?: string | undefined;
}
export interface AwsElasticsearchDomainDetails {
  AccessPolicies?: string | undefined;
  DomainEndpointOptions?: AwsElasticsearchDomainDomainEndpointOptions | undefined;
  DomainId?: string | undefined;
  DomainName?: string | undefined;
  Endpoint?: string | undefined;
  Endpoints?: { [key: string]: string | undefined } | undefined;
  ElasticsearchVersion?: string | undefined;
  ElasticsearchClusterConfig?: AwsElasticsearchDomainElasticsearchClusterConfigDetails | undefined;
  EncryptionAtRestOptions?: AwsElasticsearchDomainEncryptionAtRestOptions | undefined;
  LogPublishingOptions?: AwsElasticsearchDomainLogPublishingOptions | undefined;
  NodeToNodeEncryptionOptions?: AwsElasticsearchDomainNodeToNodeEncryptionOptions | undefined;
  ServiceSoftwareOptions?: AwsElasticsearchDomainServiceSoftwareOptions | undefined;
  VPCOptions?: AwsElasticsearchDomainVPCOptions | undefined;
}
export interface AwsS3BucketServerSideEncryptionByDefault {
  SSEAlgorithm?: string | undefined;
  KMSMasterKeyID?: string | undefined;
}
export interface AwsS3BucketServerSideEncryptionRule {
  ApplyServerSideEncryptionByDefault?: AwsS3BucketServerSideEncryptionByDefault | undefined;
}
export type AwsS3BucketServerSideEncryptionRules = AwsS3BucketServerSideEncryptionRule[];
export interface AwsS3BucketServerSideEncryptionConfiguration {
  Rules?: AwsS3BucketServerSideEncryptionRule[] | undefined;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails {
  DaysAfterInitiation?: number | undefined;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails {
  Key?: string | undefined;
  Value?: string | undefined;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails {
  Prefix?: string | undefined;
  Tag?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails | undefined;
  Type?: string | undefined;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsList =
  AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails {
  Key?: string | undefined;
  Value?: string | undefined;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails {
  Operands?:
    | AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails[]
    | undefined;
  Prefix?: string | undefined;
  Tag?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails | undefined;
  Type?: string | undefined;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails {
  Predicate?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails | undefined;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails {
  Days?: number | undefined;
  StorageClass?: string | undefined;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsList =
  AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails {
  Date?: string | undefined;
  Days?: number | undefined;
  StorageClass?: string | undefined;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesTransitionsList =
  AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationRulesDetails {
  AbortIncompleteMultipartUpload?:
    | AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails
    | undefined;
  ExpirationDate?: string | undefined;
  ExpirationInDays?: number | undefined;
  ExpiredObjectDeleteMarker?: boolean | undefined;
  Filter?: AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails | undefined;
  ID?: string | undefined;
  NoncurrentVersionExpirationInDays?: number | undefined;
  NoncurrentVersionTransitions?:
    | AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails[]
    | undefined;
  Prefix?: string | undefined;
  Status?: string | undefined;
  Transitions?: AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails[] | undefined;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesList =
  AwsS3BucketBucketLifecycleConfigurationRulesDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationDetails {
  Rules?: AwsS3BucketBucketLifecycleConfigurationRulesDetails[] | undefined;
}
export interface AwsS3AccountPublicAccessBlockDetails {
  BlockPublicAcls?: boolean | undefined;
  BlockPublicPolicy?: boolean | undefined;
  IgnorePublicAcls?: boolean | undefined;
  RestrictPublicBuckets?: boolean | undefined;
}
export interface AwsS3BucketLoggingConfiguration {
  DestinationBucketName?: string | undefined;
  LogFilePrefix?: string | undefined;
}
export interface AwsS3BucketWebsiteConfigurationRedirectTo {
  Hostname?: string | undefined;
  Protocol?: string | undefined;
}
export interface AwsS3BucketWebsiteConfigurationRoutingRuleCondition {
  HttpErrorCodeReturnedEquals?: string | undefined;
  KeyPrefixEquals?: string | undefined;
}
export interface AwsS3BucketWebsiteConfigurationRoutingRuleRedirect {
  Hostname?: string | undefined;
  HttpRedirectCode?: string | undefined;
  Protocol?: string | undefined;
  ReplaceKeyPrefixWith?: string | undefined;
  ReplaceKeyWith?: string | undefined;
}
export interface AwsS3BucketWebsiteConfigurationRoutingRule {
  Condition?: AwsS3BucketWebsiteConfigurationRoutingRuleCondition | undefined;
  Redirect?: AwsS3BucketWebsiteConfigurationRoutingRuleRedirect | undefined;
}
export type AwsS3BucketWebsiteConfigurationRoutingRules =
  AwsS3BucketWebsiteConfigurationRoutingRule[];
export interface AwsS3BucketWebsiteConfiguration {
  ErrorDocument?: string | undefined;
  IndexDocumentSuffix?: string | undefined;
  RedirectAllRequestsTo?: AwsS3BucketWebsiteConfigurationRedirectTo | undefined;
  RoutingRules?: AwsS3BucketWebsiteConfigurationRoutingRule[] | undefined;
}
export type AwsS3BucketNotificationConfigurationEvents = string[];
export type AwsS3BucketNotificationConfigurationS3KeyFilterRuleName =
  | "Prefix"
  | "Suffix"
  | (string & {});
export interface AwsS3BucketNotificationConfigurationS3KeyFilterRule {
  Name?: AwsS3BucketNotificationConfigurationS3KeyFilterRuleName | undefined;
  Value?: string | undefined;
}
export type AwsS3BucketNotificationConfigurationS3KeyFilterRules =
  AwsS3BucketNotificationConfigurationS3KeyFilterRule[];
export interface AwsS3BucketNotificationConfigurationS3KeyFilter {
  FilterRules?: AwsS3BucketNotificationConfigurationS3KeyFilterRule[] | undefined;
}
export interface AwsS3BucketNotificationConfigurationFilter {
  S3KeyFilter?: AwsS3BucketNotificationConfigurationS3KeyFilter | undefined;
}
export interface AwsS3BucketNotificationConfigurationDetail {
  Events?: string[] | undefined;
  Filter?: AwsS3BucketNotificationConfigurationFilter | undefined;
  Destination?: string | undefined;
  Type?: string | undefined;
}
export type AwsS3BucketNotificationConfigurationDetails =
  AwsS3BucketNotificationConfigurationDetail[];
export interface AwsS3BucketNotificationConfiguration {
  Configurations?: AwsS3BucketNotificationConfigurationDetail[] | undefined;
}
export interface AwsS3BucketBucketVersioningConfiguration {
  IsMfaDeleteEnabled?: boolean | undefined;
  Status?: string | undefined;
}
export interface AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails {
  Days?: number | undefined;
  Mode?: string | undefined;
  Years?: number | undefined;
}
export interface AwsS3BucketObjectLockConfigurationRuleDetails {
  DefaultRetention?: AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails | undefined;
}
export interface AwsS3BucketObjectLockConfiguration {
  ObjectLockEnabled?: string | undefined;
  Rule?: AwsS3BucketObjectLockConfigurationRuleDetails | undefined;
}
export interface AwsS3BucketDetails {
  OwnerId?: string | undefined;
  OwnerName?: string | undefined;
  OwnerAccountId?: string | undefined;
  CreatedAt?: string | undefined;
  ServerSideEncryptionConfiguration?: AwsS3BucketServerSideEncryptionConfiguration | undefined;
  BucketLifecycleConfiguration?: AwsS3BucketBucketLifecycleConfigurationDetails | undefined;
  PublicAccessBlockConfiguration?: AwsS3AccountPublicAccessBlockDetails | undefined;
  AccessControlList?: string | undefined;
  BucketLoggingConfiguration?: AwsS3BucketLoggingConfiguration | undefined;
  BucketWebsiteConfiguration?: AwsS3BucketWebsiteConfiguration | undefined;
  BucketNotificationConfiguration?: AwsS3BucketNotificationConfiguration | undefined;
  BucketVersioningConfiguration?: AwsS3BucketBucketVersioningConfiguration | undefined;
  ObjectLockConfiguration?: AwsS3BucketObjectLockConfiguration | undefined;
  Name?: string | undefined;
}
export interface AwsS3ObjectDetails {
  LastModified?: string | undefined;
  ETag?: string | undefined;
  VersionId?: string | undefined;
  ContentType?: string | undefined;
  ServerSideEncryption?: string | undefined;
  SSEKMSKeyId?: string | undefined;
}
export interface AwsSecretsManagerSecretRotationRules {
  AutomaticallyAfterDays?: number | undefined;
}
export interface AwsSecretsManagerSecretDetails {
  RotationRules?: AwsSecretsManagerSecretRotationRules | undefined;
  RotationOccurredWithinFrequency?: boolean | undefined;
  KmsKeyId?: string | undefined;
  RotationEnabled?: boolean | undefined;
  RotationLambdaArn?: string | undefined;
  Deleted?: boolean | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
}
export type AwsIamAccessKeyStatus = "Active" | "Inactive" | (string & {});
export interface AwsIamAccessKeySessionContextAttributes {
  MfaAuthenticated?: boolean | undefined;
  CreationDate?: string | undefined;
}
export interface AwsIamAccessKeySessionContextSessionIssuer {
  Type?: string | undefined;
  PrincipalId?: string | undefined;
  Arn?: string | undefined;
  AccountId?: string | undefined;
  UserName?: string | undefined;
}
export interface AwsIamAccessKeySessionContext {
  Attributes?: AwsIamAccessKeySessionContextAttributes | undefined;
  SessionIssuer?: AwsIamAccessKeySessionContextSessionIssuer | undefined;
}
export interface AwsIamAccessKeyDetails {
  UserName?: string | undefined;
  Status?: AwsIamAccessKeyStatus | undefined;
  CreatedAt?: string | undefined;
  PrincipalId?: string | undefined;
  PrincipalType?: string | undefined;
  PrincipalName?: string | undefined;
  AccountId?: string | undefined;
  AccessKeyId?: string | undefined;
  SessionContext?: AwsIamAccessKeySessionContext | undefined;
}
export interface AwsIamAttachedManagedPolicy {
  PolicyName?: string | undefined;
  PolicyArn?: string | undefined;
}
export type AwsIamAttachedManagedPolicyList = AwsIamAttachedManagedPolicy[];
export interface AwsIamPermissionsBoundary {
  PermissionsBoundaryArn?: string | undefined;
  PermissionsBoundaryType?: string | undefined;
}
export interface AwsIamUserPolicy {
  PolicyName?: string | undefined;
}
export type AwsIamUserPolicyList = AwsIamUserPolicy[];
export interface AwsIamUserDetails {
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[] | undefined;
  CreateDate?: string | undefined;
  GroupList?: string[] | undefined;
  Path?: string | undefined;
  PermissionsBoundary?: AwsIamPermissionsBoundary | undefined;
  UserId?: string | undefined;
  UserName?: string | undefined;
  UserPolicyList?: AwsIamUserPolicy[] | undefined;
}
export interface AwsIamPolicyVersion {
  VersionId?: string | undefined;
  IsDefaultVersion?: boolean | undefined;
  CreateDate?: string | undefined;
}
export type AwsIamPolicyVersionList = AwsIamPolicyVersion[];
export interface AwsIamPolicyDetails {
  AttachmentCount?: number | undefined;
  CreateDate?: string | undefined;
  DefaultVersionId?: string | undefined;
  Description?: string | undefined;
  IsAttachable?: boolean | undefined;
  Path?: string | undefined;
  PermissionsBoundaryUsageCount?: number | undefined;
  PolicyId?: string | undefined;
  PolicyName?: string | undefined;
  PolicyVersionList?: AwsIamPolicyVersion[] | undefined;
  UpdateDate?: string | undefined;
}
export interface AwsApiGatewayV2RouteSettings {
  DetailedMetricsEnabled?: boolean | undefined;
  LoggingLevel?: string | undefined;
  DataTraceEnabled?: boolean | undefined;
  ThrottlingBurstLimit?: number | undefined;
  ThrottlingRateLimit?: number | undefined;
}
export interface AwsApiGatewayAccessLogSettings {
  Format?: string | undefined;
  DestinationArn?: string | undefined;
}
export interface AwsApiGatewayV2StageDetails {
  ClientCertificateId?: string | undefined;
  CreatedDate?: string | undefined;
  Description?: string | undefined;
  DefaultRouteSettings?: AwsApiGatewayV2RouteSettings | undefined;
  DeploymentId?: string | undefined;
  LastUpdatedDate?: string | undefined;
  RouteSettings?: AwsApiGatewayV2RouteSettings | undefined;
  StageName?: string | undefined;
  StageVariables?: { [key: string]: string | undefined } | undefined;
  AccessLogSettings?: AwsApiGatewayAccessLogSettings | undefined;
  AutoDeploy?: boolean | undefined;
  LastDeploymentStatusMessage?: string | undefined;
  ApiGatewayManaged?: boolean | undefined;
}
export interface AwsCorsConfiguration {
  AllowOrigins?: string[] | undefined;
  AllowCredentials?: boolean | undefined;
  ExposeHeaders?: string[] | undefined;
  MaxAge?: number | undefined;
  AllowMethods?: string[] | undefined;
  AllowHeaders?: string[] | undefined;
}
export interface AwsApiGatewayV2ApiDetails {
  ApiEndpoint?: string | undefined;
  ApiId?: string | undefined;
  ApiKeySelectionExpression?: string | undefined;
  CreatedDate?: string | undefined;
  Description?: string | undefined;
  Version?: string | undefined;
  Name?: string | undefined;
  ProtocolType?: string | undefined;
  RouteSelectionExpression?: string | undefined;
  CorsConfiguration?: AwsCorsConfiguration | undefined;
}
export interface AwsDynamoDbTableAttributeDefinition {
  AttributeName?: string | undefined;
  AttributeType?: string | undefined;
}
export type AwsDynamoDbTableAttributeDefinitionList = AwsDynamoDbTableAttributeDefinition[];
export interface AwsDynamoDbTableBillingModeSummary {
  BillingMode?: string | undefined;
  LastUpdateToPayPerRequestDateTime?: string | undefined;
}
export type SizeBytes = number;
export interface AwsDynamoDbTableKeySchema {
  AttributeName?: string | undefined;
  KeyType?: string | undefined;
}
export type AwsDynamoDbTableKeySchemaList = AwsDynamoDbTableKeySchema[];
export interface AwsDynamoDbTableProjection {
  NonKeyAttributes?: string[] | undefined;
  ProjectionType?: string | undefined;
}
export interface AwsDynamoDbTableProvisionedThroughput {
  LastDecreaseDateTime?: string | undefined;
  LastIncreaseDateTime?: string | undefined;
  NumberOfDecreasesToday?: number | undefined;
  ReadCapacityUnits?: number | undefined;
  WriteCapacityUnits?: number | undefined;
}
export interface AwsDynamoDbTableGlobalSecondaryIndex {
  Backfilling?: boolean | undefined;
  IndexArn?: string | undefined;
  IndexName?: string | undefined;
  IndexSizeBytes?: number | undefined;
  IndexStatus?: string | undefined;
  ItemCount?: number | undefined;
  KeySchema?: AwsDynamoDbTableKeySchema[] | undefined;
  Projection?: AwsDynamoDbTableProjection | undefined;
  ProvisionedThroughput?: AwsDynamoDbTableProvisionedThroughput | undefined;
}
export type AwsDynamoDbTableGlobalSecondaryIndexList = AwsDynamoDbTableGlobalSecondaryIndex[];
export interface AwsDynamoDbTableLocalSecondaryIndex {
  IndexArn?: string | undefined;
  IndexName?: string | undefined;
  KeySchema?: AwsDynamoDbTableKeySchema[] | undefined;
  Projection?: AwsDynamoDbTableProjection | undefined;
}
export type AwsDynamoDbTableLocalSecondaryIndexList = AwsDynamoDbTableLocalSecondaryIndex[];
export interface AwsDynamoDbTableProvisionedThroughputOverride {
  ReadCapacityUnits?: number | undefined;
}
export interface AwsDynamoDbTableReplicaGlobalSecondaryIndex {
  IndexName?: string | undefined;
  ProvisionedThroughputOverride?: AwsDynamoDbTableProvisionedThroughputOverride | undefined;
}
export type AwsDynamoDbTableReplicaGlobalSecondaryIndexList =
  AwsDynamoDbTableReplicaGlobalSecondaryIndex[];
export interface AwsDynamoDbTableReplica {
  GlobalSecondaryIndexes?: AwsDynamoDbTableReplicaGlobalSecondaryIndex[] | undefined;
  KmsMasterKeyId?: string | undefined;
  ProvisionedThroughputOverride?: AwsDynamoDbTableProvisionedThroughputOverride | undefined;
  RegionName?: string | undefined;
  ReplicaStatus?: string | undefined;
  ReplicaStatusDescription?: string | undefined;
}
export type AwsDynamoDbTableReplicaList = AwsDynamoDbTableReplica[];
export interface AwsDynamoDbTableRestoreSummary {
  SourceBackupArn?: string | undefined;
  SourceTableArn?: string | undefined;
  RestoreDateTime?: string | undefined;
  RestoreInProgress?: boolean | undefined;
}
export interface AwsDynamoDbTableSseDescription {
  InaccessibleEncryptionDateTime?: string | undefined;
  Status?: string | undefined;
  SseType?: string | undefined;
  KmsMasterKeyArn?: string | undefined;
}
export interface AwsDynamoDbTableStreamSpecification {
  StreamEnabled?: boolean | undefined;
  StreamViewType?: string | undefined;
}
export interface AwsDynamoDbTableDetails {
  AttributeDefinitions?: AwsDynamoDbTableAttributeDefinition[] | undefined;
  BillingModeSummary?: AwsDynamoDbTableBillingModeSummary | undefined;
  CreationDateTime?: string | undefined;
  GlobalSecondaryIndexes?: AwsDynamoDbTableGlobalSecondaryIndex[] | undefined;
  GlobalTableVersion?: string | undefined;
  ItemCount?: number | undefined;
  KeySchema?: AwsDynamoDbTableKeySchema[] | undefined;
  LatestStreamArn?: string | undefined;
  LatestStreamLabel?: string | undefined;
  LocalSecondaryIndexes?: AwsDynamoDbTableLocalSecondaryIndex[] | undefined;
  ProvisionedThroughput?: AwsDynamoDbTableProvisionedThroughput | undefined;
  Replicas?: AwsDynamoDbTableReplica[] | undefined;
  RestoreSummary?: AwsDynamoDbTableRestoreSummary | undefined;
  SseDescription?: AwsDynamoDbTableSseDescription | undefined;
  StreamSpecification?: AwsDynamoDbTableStreamSpecification | undefined;
  TableId?: string | undefined;
  TableName?: string | undefined;
  TableSizeBytes?: number | undefined;
  TableStatus?: string | undefined;
  DeletionProtectionEnabled?: boolean | undefined;
}
export interface AwsApiGatewayMethodSettings {
  MetricsEnabled?: boolean | undefined;
  LoggingLevel?: string | undefined;
  DataTraceEnabled?: boolean | undefined;
  ThrottlingBurstLimit?: number | undefined;
  ThrottlingRateLimit?: number | undefined;
  CachingEnabled?: boolean | undefined;
  CacheTtlInSeconds?: number | undefined;
  CacheDataEncrypted?: boolean | undefined;
  RequireAuthorizationForCacheControl?: boolean | undefined;
  UnauthorizedCacheControlHeaderStrategy?: string | undefined;
  HttpMethod?: string | undefined;
  ResourcePath?: string | undefined;
}
export type AwsApiGatewayMethodSettingsList = AwsApiGatewayMethodSettings[];
export interface AwsApiGatewayCanarySettings {
  PercentTraffic?: number | undefined;
  DeploymentId?: string | undefined;
  StageVariableOverrides?: { [key: string]: string | undefined } | undefined;
  UseStageCache?: boolean | undefined;
}
export interface AwsApiGatewayStageDetails {
  DeploymentId?: string | undefined;
  ClientCertificateId?: string | undefined;
  StageName?: string | undefined;
  Description?: string | undefined;
  CacheClusterEnabled?: boolean | undefined;
  CacheClusterSize?: string | undefined;
  CacheClusterStatus?: string | undefined;
  MethodSettings?: AwsApiGatewayMethodSettings[] | undefined;
  Variables?: { [key: string]: string | undefined } | undefined;
  DocumentationVersion?: string | undefined;
  AccessLogSettings?: AwsApiGatewayAccessLogSettings | undefined;
  CanarySettings?: AwsApiGatewayCanarySettings | undefined;
  TracingEnabled?: boolean | undefined;
  CreatedDate?: string | undefined;
  LastUpdatedDate?: string | undefined;
  WebAclArn?: string | undefined;
}
export interface AwsApiGatewayEndpointConfiguration {
  Types?: string[] | undefined;
}
export interface AwsApiGatewayRestApiDetails {
  Id?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  CreatedDate?: string | undefined;
  Version?: string | undefined;
  BinaryMediaTypes?: string[] | undefined;
  MinimumCompressionSize?: number | undefined;
  ApiKeySource?: string | undefined;
  EndpointConfiguration?: AwsApiGatewayEndpointConfiguration | undefined;
}
export interface AwsCloudTrailTrailDetails {
  CloudWatchLogsLogGroupArn?: string | undefined;
  CloudWatchLogsRoleArn?: string | undefined;
  HasCustomEventSelectors?: boolean | undefined;
  HomeRegion?: string | undefined;
  IncludeGlobalServiceEvents?: boolean | undefined;
  IsMultiRegionTrail?: boolean | undefined;
  IsOrganizationTrail?: boolean | undefined;
  KmsKeyId?: string | undefined;
  LogFileValidationEnabled?: boolean | undefined;
  Name?: string | undefined;
  S3BucketName?: string | undefined;
  S3KeyPrefix?: string | undefined;
  SnsTopicArn?: string | undefined;
  SnsTopicName?: string | undefined;
  TrailArn?: string | undefined;
}
export interface AwsSsmComplianceSummary {
  Status?: string | undefined;
  CompliantCriticalCount?: number | undefined;
  CompliantHighCount?: number | undefined;
  CompliantMediumCount?: number | undefined;
  ExecutionType?: string | undefined;
  NonCompliantCriticalCount?: number | undefined;
  CompliantInformationalCount?: number | undefined;
  NonCompliantInformationalCount?: number | undefined;
  CompliantUnspecifiedCount?: number | undefined;
  NonCompliantLowCount?: number | undefined;
  NonCompliantHighCount?: number | undefined;
  CompliantLowCount?: number | undefined;
  ComplianceType?: string | undefined;
  PatchBaselineId?: string | undefined;
  OverallSeverity?: string | undefined;
  NonCompliantMediumCount?: number | undefined;
  NonCompliantUnspecifiedCount?: number | undefined;
  PatchGroup?: string | undefined;
}
export interface AwsSsmPatch {
  ComplianceSummary?: AwsSsmComplianceSummary | undefined;
}
export interface AwsSsmPatchComplianceDetails {
  Patch?: AwsSsmPatch | undefined;
}
export interface AwsCertificateManagerCertificateResourceRecord {
  Name?: string | undefined;
  Type?: string | undefined;
  Value?: string | undefined;
}
export interface AwsCertificateManagerCertificateDomainValidationOption {
  DomainName?: string | undefined;
  ResourceRecord?: AwsCertificateManagerCertificateResourceRecord | undefined;
  ValidationDomain?: string | undefined;
  ValidationEmails?: string[] | undefined;
  ValidationMethod?: string | undefined;
  ValidationStatus?: string | undefined;
}
export type AwsCertificateManagerCertificateDomainValidationOptions =
  AwsCertificateManagerCertificateDomainValidationOption[];
export interface AwsCertificateManagerCertificateExtendedKeyUsage {
  Name?: string | undefined;
  OId?: string | undefined;
}
export type AwsCertificateManagerCertificateExtendedKeyUsages =
  AwsCertificateManagerCertificateExtendedKeyUsage[];
export interface AwsCertificateManagerCertificateKeyUsage {
  Name?: string | undefined;
}
export type AwsCertificateManagerCertificateKeyUsages = AwsCertificateManagerCertificateKeyUsage[];
export interface AwsCertificateManagerCertificateOptions {
  CertificateTransparencyLoggingPreference?: string | undefined;
}
export interface AwsCertificateManagerCertificateRenewalSummary {
  DomainValidationOptions?: AwsCertificateManagerCertificateDomainValidationOption[] | undefined;
  RenewalStatus?: string | undefined;
  RenewalStatusReason?: string | undefined;
  UpdatedAt?: string | undefined;
}
export interface AwsCertificateManagerCertificateDetails {
  CertificateAuthorityArn?: string | undefined;
  CreatedAt?: string | undefined;
  DomainName?: string | undefined;
  DomainValidationOptions?: AwsCertificateManagerCertificateDomainValidationOption[] | undefined;
  ExtendedKeyUsages?: AwsCertificateManagerCertificateExtendedKeyUsage[] | undefined;
  FailureReason?: string | undefined;
  ImportedAt?: string | undefined;
  InUseBy?: string[] | undefined;
  IssuedAt?: string | undefined;
  Issuer?: string | undefined;
  KeyAlgorithm?: string | undefined;
  KeyUsages?: AwsCertificateManagerCertificateKeyUsage[] | undefined;
  NotAfter?: string | undefined;
  NotBefore?: string | undefined;
  Options?: AwsCertificateManagerCertificateOptions | undefined;
  RenewalEligibility?: string | undefined;
  RenewalSummary?: AwsCertificateManagerCertificateRenewalSummary | undefined;
  Serial?: string | undefined;
  SignatureAlgorithm?: string | undefined;
  Status?: string | undefined;
  Subject?: string | undefined;
  SubjectAlternativeNames?: string[] | undefined;
  Type?: string | undefined;
}
export interface AwsRedshiftClusterClusterNode {
  NodeRole?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PublicIpAddress?: string | undefined;
}
export type AwsRedshiftClusterClusterNodes = AwsRedshiftClusterClusterNode[];
export interface AwsRedshiftClusterClusterParameterStatus {
  ParameterName?: string | undefined;
  ParameterApplyStatus?: string | undefined;
  ParameterApplyErrorDescription?: string | undefined;
}
export type AwsRedshiftClusterClusterParameterStatusList =
  AwsRedshiftClusterClusterParameterStatus[];
export interface AwsRedshiftClusterClusterParameterGroup {
  ClusterParameterStatusList?: AwsRedshiftClusterClusterParameterStatus[] | undefined;
  ParameterApplyStatus?: string | undefined;
  ParameterGroupName?: string | undefined;
}
export type AwsRedshiftClusterClusterParameterGroups = AwsRedshiftClusterClusterParameterGroup[];
export interface AwsRedshiftClusterClusterSecurityGroup {
  ClusterSecurityGroupName?: string | undefined;
  Status?: string | undefined;
}
export type AwsRedshiftClusterClusterSecurityGroups = AwsRedshiftClusterClusterSecurityGroup[];
export interface AwsRedshiftClusterClusterSnapshotCopyStatus {
  DestinationRegion?: string | undefined;
  ManualSnapshotRetentionPeriod?: number | undefined;
  RetentionPeriod?: number | undefined;
  SnapshotCopyGrantName?: string | undefined;
}
export interface AwsRedshiftClusterDeferredMaintenanceWindow {
  DeferMaintenanceEndTime?: string | undefined;
  DeferMaintenanceIdentifier?: string | undefined;
  DeferMaintenanceStartTime?: string | undefined;
}
export type AwsRedshiftClusterDeferredMaintenanceWindows =
  AwsRedshiftClusterDeferredMaintenanceWindow[];
export interface AwsRedshiftClusterElasticIpStatus {
  ElasticIp?: string | undefined;
  Status?: string | undefined;
}
export interface AwsRedshiftClusterEndpoint {
  Address?: string | undefined;
  Port?: number | undefined;
}
export interface AwsRedshiftClusterHsmStatus {
  HsmClientCertificateIdentifier?: string | undefined;
  HsmConfigurationIdentifier?: string | undefined;
  Status?: string | undefined;
}
export interface AwsRedshiftClusterIamRole {
  ApplyStatus?: string | undefined;
  IamRoleArn?: string | undefined;
}
export type AwsRedshiftClusterIamRoles = AwsRedshiftClusterIamRole[];
export interface AwsRedshiftClusterPendingModifiedValues {
  AutomatedSnapshotRetentionPeriod?: number | undefined;
  ClusterIdentifier?: string | undefined;
  ClusterType?: string | undefined;
  ClusterVersion?: string | undefined;
  EncryptionType?: string | undefined;
  EnhancedVpcRouting?: boolean | undefined;
  MaintenanceTrackName?: string | undefined;
  MasterUserPassword?: string | undefined;
  NodeType?: string | undefined;
  NumberOfNodes?: number | undefined;
  PubliclyAccessible?: boolean | undefined;
}
export interface AwsRedshiftClusterResizeInfo {
  AllowCancelResize?: boolean | undefined;
  ResizeType?: string | undefined;
}
export interface AwsRedshiftClusterRestoreStatus {
  CurrentRestoreRateInMegaBytesPerSecond?: number | undefined;
  ElapsedTimeInSeconds?: number | undefined;
  EstimatedTimeToCompletionInSeconds?: number | undefined;
  ProgressInMegaBytes?: number | undefined;
  SnapshotSizeInMegaBytes?: number | undefined;
  Status?: string | undefined;
}
export interface AwsRedshiftClusterVpcSecurityGroup {
  Status?: string | undefined;
  VpcSecurityGroupId?: string | undefined;
}
export type AwsRedshiftClusterVpcSecurityGroups = AwsRedshiftClusterVpcSecurityGroup[];
export interface AwsRedshiftClusterLoggingStatus {
  BucketName?: string | undefined;
  LastFailureMessage?: string | undefined;
  LastFailureTime?: string | undefined;
  LastSuccessfulDeliveryTime?: string | undefined;
  LoggingEnabled?: boolean | undefined;
  S3KeyPrefix?: string | undefined;
}
export interface AwsRedshiftClusterDetails {
  AllowVersionUpgrade?: boolean | undefined;
  AutomatedSnapshotRetentionPeriod?: number | undefined;
  AvailabilityZone?: string | undefined;
  ClusterAvailabilityStatus?: string | undefined;
  ClusterCreateTime?: string | undefined;
  ClusterIdentifier?: string | undefined;
  ClusterNodes?: AwsRedshiftClusterClusterNode[] | undefined;
  ClusterParameterGroups?: AwsRedshiftClusterClusterParameterGroup[] | undefined;
  ClusterPublicKey?: string | undefined;
  ClusterRevisionNumber?: string | undefined;
  ClusterSecurityGroups?: AwsRedshiftClusterClusterSecurityGroup[] | undefined;
  ClusterSnapshotCopyStatus?: AwsRedshiftClusterClusterSnapshotCopyStatus | undefined;
  ClusterStatus?: string | undefined;
  ClusterSubnetGroupName?: string | undefined;
  ClusterVersion?: string | undefined;
  DBName?: string | undefined;
  DeferredMaintenanceWindows?: AwsRedshiftClusterDeferredMaintenanceWindow[] | undefined;
  ElasticIpStatus?: AwsRedshiftClusterElasticIpStatus | undefined;
  ElasticResizeNumberOfNodeOptions?: string | undefined;
  Encrypted?: boolean | undefined;
  Endpoint?: AwsRedshiftClusterEndpoint | undefined;
  EnhancedVpcRouting?: boolean | undefined;
  ExpectedNextSnapshotScheduleTime?: string | undefined;
  ExpectedNextSnapshotScheduleTimeStatus?: string | undefined;
  HsmStatus?: AwsRedshiftClusterHsmStatus | undefined;
  IamRoles?: AwsRedshiftClusterIamRole[] | undefined;
  KmsKeyId?: string | undefined;
  MaintenanceTrackName?: string | undefined;
  ManualSnapshotRetentionPeriod?: number | undefined;
  MasterUsername?: string | undefined;
  NextMaintenanceWindowStartTime?: string | undefined;
  NodeType?: string | undefined;
  NumberOfNodes?: number | undefined;
  PendingActions?: string[] | undefined;
  PendingModifiedValues?: AwsRedshiftClusterPendingModifiedValues | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  PubliclyAccessible?: boolean | undefined;
  ResizeInfo?: AwsRedshiftClusterResizeInfo | undefined;
  RestoreStatus?: AwsRedshiftClusterRestoreStatus | undefined;
  SnapshotScheduleIdentifier?: string | undefined;
  SnapshotScheduleState?: string | undefined;
  VpcId?: string | undefined;
  VpcSecurityGroups?: AwsRedshiftClusterVpcSecurityGroup[] | undefined;
  LoggingStatus?: AwsRedshiftClusterLoggingStatus | undefined;
}
export interface AwsElbLoadBalancerBackendServerDescription {
  InstancePort?: number | undefined;
  PolicyNames?: string[] | undefined;
}
export type AwsElbLoadBalancerBackendServerDescriptions =
  AwsElbLoadBalancerBackendServerDescription[];
export interface AwsElbLoadBalancerHealthCheck {
  HealthyThreshold?: number | undefined;
  Interval?: number | undefined;
  Target?: string | undefined;
  Timeout?: number | undefined;
  UnhealthyThreshold?: number | undefined;
}
export interface AwsElbLoadBalancerInstance {
  InstanceId?: string | undefined;
}
export type AwsElbLoadBalancerInstances = AwsElbLoadBalancerInstance[];
export interface AwsElbLoadBalancerListener {
  InstancePort?: number | undefined;
  InstanceProtocol?: string | undefined;
  LoadBalancerPort?: number | undefined;
  Protocol?: string | undefined;
  SslCertificateId?: string | undefined;
}
export interface AwsElbLoadBalancerListenerDescription {
  Listener?: AwsElbLoadBalancerListener | undefined;
  PolicyNames?: string[] | undefined;
}
export type AwsElbLoadBalancerListenerDescriptions = AwsElbLoadBalancerListenerDescription[];
export interface AwsElbLoadBalancerAccessLog {
  EmitInterval?: number | undefined;
  Enabled?: boolean | undefined;
  S3BucketName?: string | undefined;
  S3BucketPrefix?: string | undefined;
}
export interface AwsElbLoadBalancerConnectionDraining {
  Enabled?: boolean | undefined;
  Timeout?: number | undefined;
}
export interface AwsElbLoadBalancerConnectionSettings {
  IdleTimeout?: number | undefined;
}
export interface AwsElbLoadBalancerCrossZoneLoadBalancing {
  Enabled?: boolean | undefined;
}
export interface AwsElbLoadBalancerAdditionalAttribute {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type AwsElbLoadBalancerAdditionalAttributeList = AwsElbLoadBalancerAdditionalAttribute[];
export interface AwsElbLoadBalancerAttributes {
  AccessLog?: AwsElbLoadBalancerAccessLog | undefined;
  ConnectionDraining?: AwsElbLoadBalancerConnectionDraining | undefined;
  ConnectionSettings?: AwsElbLoadBalancerConnectionSettings | undefined;
  CrossZoneLoadBalancing?: AwsElbLoadBalancerCrossZoneLoadBalancing | undefined;
  AdditionalAttributes?: AwsElbLoadBalancerAdditionalAttribute[] | undefined;
}
export interface AwsElbAppCookieStickinessPolicy {
  CookieName?: string | undefined;
  PolicyName?: string | undefined;
}
export type AwsElbAppCookieStickinessPolicies = AwsElbAppCookieStickinessPolicy[];
export interface AwsElbLbCookieStickinessPolicy {
  CookieExpirationPeriod?: number | undefined;
  PolicyName?: string | undefined;
}
export type AwsElbLbCookieStickinessPolicies = AwsElbLbCookieStickinessPolicy[];
export interface AwsElbLoadBalancerPolicies {
  AppCookieStickinessPolicies?: AwsElbAppCookieStickinessPolicy[] | undefined;
  LbCookieStickinessPolicies?: AwsElbLbCookieStickinessPolicy[] | undefined;
  OtherPolicies?: string[] | undefined;
}
export interface AwsElbLoadBalancerSourceSecurityGroup {
  GroupName?: string | undefined;
  OwnerAlias?: string | undefined;
}
export interface AwsElbLoadBalancerDetails {
  AvailabilityZones?: string[] | undefined;
  BackendServerDescriptions?: AwsElbLoadBalancerBackendServerDescription[] | undefined;
  CanonicalHostedZoneName?: string | undefined;
  CanonicalHostedZoneNameID?: string | undefined;
  CreatedTime?: string | undefined;
  DnsName?: string | undefined;
  HealthCheck?: AwsElbLoadBalancerHealthCheck | undefined;
  Instances?: AwsElbLoadBalancerInstance[] | undefined;
  ListenerDescriptions?: AwsElbLoadBalancerListenerDescription[] | undefined;
  LoadBalancerAttributes?: AwsElbLoadBalancerAttributes | undefined;
  LoadBalancerName?: string | undefined;
  Policies?: AwsElbLoadBalancerPolicies | undefined;
  Scheme?: string | undefined;
  SecurityGroups?: string[] | undefined;
  SourceSecurityGroup?: AwsElbLoadBalancerSourceSecurityGroup | undefined;
  Subnets?: string[] | undefined;
  VpcId?: string | undefined;
}
export interface AwsIamGroupPolicy {
  PolicyName?: string | undefined;
}
export type AwsIamGroupPolicyList = AwsIamGroupPolicy[];
export interface AwsIamGroupDetails {
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[] | undefined;
  CreateDate?: string | undefined;
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  GroupPolicyList?: AwsIamGroupPolicy[] | undefined;
  Path?: string | undefined;
}
export type AwsIamRoleAssumeRolePolicyDocument = string;
export interface AwsIamInstanceProfileRole {
  Arn?: string | undefined;
  AssumeRolePolicyDocument?: string | undefined;
  CreateDate?: string | undefined;
  Path?: string | undefined;
  RoleId?: string | undefined;
  RoleName?: string | undefined;
}
export type AwsIamInstanceProfileRoles = AwsIamInstanceProfileRole[];
export interface AwsIamInstanceProfile {
  Arn?: string | undefined;
  CreateDate?: string | undefined;
  InstanceProfileId?: string | undefined;
  InstanceProfileName?: string | undefined;
  Path?: string | undefined;
  Roles?: AwsIamInstanceProfileRole[] | undefined;
}
export type AwsIamInstanceProfileList = AwsIamInstanceProfile[];
export interface AwsIamRolePolicy {
  PolicyName?: string | undefined;
}
export type AwsIamRolePolicyList = AwsIamRolePolicy[];
export interface AwsIamRoleDetails {
  AssumeRolePolicyDocument?: string | undefined;
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[] | undefined;
  CreateDate?: string | undefined;
  InstanceProfileList?: AwsIamInstanceProfile[] | undefined;
  PermissionsBoundary?: AwsIamPermissionsBoundary | undefined;
  RoleId?: string | undefined;
  RoleName?: string | undefined;
  RolePolicyList?: AwsIamRolePolicy[] | undefined;
  MaxSessionDuration?: number | undefined;
  Path?: string | undefined;
}
export interface AwsKmsKeyDetails {
  AWSAccountId?: string | undefined;
  CreationDate?: number | undefined;
  KeyId?: string | undefined;
  KeyManager?: string | undefined;
  KeyState?: string | undefined;
  Origin?: string | undefined;
  Description?: string | undefined;
  KeyRotationStatus?: boolean | undefined;
}
export interface AwsLambdaFunctionCode {
  S3Bucket?: string | undefined;
  S3Key?: string | undefined;
  S3ObjectVersion?: string | undefined;
  ZipFile?: string | undefined;
}
export interface AwsLambdaFunctionDeadLetterConfig {
  TargetArn?: string | undefined;
}
export interface AwsLambdaFunctionEnvironmentError {
  ErrorCode?: string | undefined;
  Message?: string | undefined;
}
export interface AwsLambdaFunctionEnvironment {
  Variables?: { [key: string]: string | undefined } | undefined;
  Error?: AwsLambdaFunctionEnvironmentError | undefined;
}
export interface AwsLambdaFunctionLayer {
  Arn?: string | undefined;
  CodeSize?: number | undefined;
}
export type AwsLambdaFunctionLayerList = AwsLambdaFunctionLayer[];
export interface AwsLambdaFunctionTracingConfig {
  Mode?: string | undefined;
}
export interface AwsLambdaFunctionVpcConfig {
  SecurityGroupIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
  VpcId?: string | undefined;
}
export interface AwsLambdaFunctionDetails {
  Code?: AwsLambdaFunctionCode | undefined;
  CodeSha256?: string | undefined;
  DeadLetterConfig?: AwsLambdaFunctionDeadLetterConfig | undefined;
  Environment?: AwsLambdaFunctionEnvironment | undefined;
  FunctionName?: string | undefined;
  Handler?: string | undefined;
  KmsKeyArn?: string | undefined;
  LastModified?: string | undefined;
  Layers?: AwsLambdaFunctionLayer[] | undefined;
  MasterArn?: string | undefined;
  MemorySize?: number | undefined;
  RevisionId?: string | undefined;
  Role?: string | undefined;
  Runtime?: string | undefined;
  Timeout?: number | undefined;
  TracingConfig?: AwsLambdaFunctionTracingConfig | undefined;
  VpcConfig?: AwsLambdaFunctionVpcConfig | undefined;
  Version?: string | undefined;
  Architectures?: string[] | undefined;
  PackageType?: string | undefined;
}
export type AwsLambdaLayerVersionNumber = number;
export interface AwsLambdaLayerVersionDetails {
  Version?: number | undefined;
  CompatibleRuntimes?: string[] | undefined;
  CreatedDate?: string | undefined;
}
export interface AwsRdsDbInstanceAssociatedRole {
  RoleArn?: string | undefined;
  FeatureName?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbInstanceAssociatedRoles = AwsRdsDbInstanceAssociatedRole[];
export interface AwsRdsDbInstanceEndpoint {
  Address?: string | undefined;
  Port?: number | undefined;
  HostedZoneId?: string | undefined;
}
export interface AwsRdsDbInstanceVpcSecurityGroup {
  VpcSecurityGroupId?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbInstanceVpcSecurityGroups = AwsRdsDbInstanceVpcSecurityGroup[];
export interface AwsRdsDbParameterGroup {
  DbParameterGroupName?: string | undefined;
  ParameterApplyStatus?: string | undefined;
}
export type AwsRdsDbParameterGroups = AwsRdsDbParameterGroup[];
export interface AwsRdsDbSubnetGroupSubnetAvailabilityZone {
  Name?: string | undefined;
}
export interface AwsRdsDbSubnetGroupSubnet {
  SubnetIdentifier?: string | undefined;
  SubnetAvailabilityZone?: AwsRdsDbSubnetGroupSubnetAvailabilityZone | undefined;
  SubnetStatus?: string | undefined;
}
export type AwsRdsDbSubnetGroupSubnets = AwsRdsDbSubnetGroupSubnet[];
export interface AwsRdsDbSubnetGroup {
  DbSubnetGroupName?: string | undefined;
  DbSubnetGroupDescription?: string | undefined;
  VpcId?: string | undefined;
  SubnetGroupStatus?: string | undefined;
  Subnets?: AwsRdsDbSubnetGroupSubnet[] | undefined;
  DbSubnetGroupArn?: string | undefined;
}
export interface AwsRdsPendingCloudWatchLogsExports {
  LogTypesToEnable?: string[] | undefined;
  LogTypesToDisable?: string[] | undefined;
}
export interface AwsRdsDbProcessorFeature {
  Name?: string | undefined;
  Value?: string | undefined;
}
export type AwsRdsDbProcessorFeatures = AwsRdsDbProcessorFeature[];
export interface AwsRdsDbPendingModifiedValues {
  DbInstanceClass?: string | undefined;
  AllocatedStorage?: number | undefined;
  MasterUserPassword?: string | undefined;
  Port?: number | undefined;
  BackupRetentionPeriod?: number | undefined;
  MultiAZ?: boolean | undefined;
  EngineVersion?: string | undefined;
  LicenseModel?: string | undefined;
  Iops?: number | undefined;
  DbInstanceIdentifier?: string | undefined;
  StorageType?: string | undefined;
  CaCertificateIdentifier?: string | undefined;
  DbSubnetGroupName?: string | undefined;
  PendingCloudWatchLogsExports?: AwsRdsPendingCloudWatchLogsExports | undefined;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[] | undefined;
}
export interface AwsRdsDbOptionGroupMembership {
  OptionGroupName?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbOptionGroupMemberships = AwsRdsDbOptionGroupMembership[];
export interface AwsRdsDbStatusInfo {
  StatusType?: string | undefined;
  Normal?: boolean | undefined;
  Status?: string | undefined;
  Message?: string | undefined;
}
export type AwsRdsDbStatusInfos = AwsRdsDbStatusInfo[];
export interface AwsRdsDbDomainMembership {
  Domain?: string | undefined;
  Status?: string | undefined;
  Fqdn?: string | undefined;
  IamRoleName?: string | undefined;
}
export type AwsRdsDbDomainMemberships = AwsRdsDbDomainMembership[];
export interface AwsRdsDbInstanceDetails {
  AssociatedRoles?: AwsRdsDbInstanceAssociatedRole[] | undefined;
  CACertificateIdentifier?: string | undefined;
  DBClusterIdentifier?: string | undefined;
  DBInstanceIdentifier?: string | undefined;
  DBInstanceClass?: string | undefined;
  DbInstancePort?: number | undefined;
  DbiResourceId?: string | undefined;
  DBName?: string | undefined;
  DeletionProtection?: boolean | undefined;
  Endpoint?: AwsRdsDbInstanceEndpoint | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  IAMDatabaseAuthenticationEnabled?: boolean | undefined;
  InstanceCreateTime?: string | undefined;
  KmsKeyId?: string | undefined;
  PubliclyAccessible?: boolean | undefined;
  StorageEncrypted?: boolean | undefined;
  TdeCredentialArn?: string | undefined;
  VpcSecurityGroups?: AwsRdsDbInstanceVpcSecurityGroup[] | undefined;
  MultiAz?: boolean | undefined;
  EnhancedMonitoringResourceArn?: string | undefined;
  DbInstanceStatus?: string | undefined;
  MasterUsername?: string | undefined;
  AllocatedStorage?: number | undefined;
  PreferredBackupWindow?: string | undefined;
  BackupRetentionPeriod?: number | undefined;
  DbSecurityGroups?: string[] | undefined;
  DbParameterGroups?: AwsRdsDbParameterGroup[] | undefined;
  AvailabilityZone?: string | undefined;
  DbSubnetGroup?: AwsRdsDbSubnetGroup | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  PendingModifiedValues?: AwsRdsDbPendingModifiedValues | undefined;
  LatestRestorableTime?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  ReadReplicaSourceDBInstanceIdentifier?: string | undefined;
  ReadReplicaDBInstanceIdentifiers?: string[] | undefined;
  ReadReplicaDBClusterIdentifiers?: string[] | undefined;
  LicenseModel?: string | undefined;
  Iops?: number | undefined;
  OptionGroupMemberships?: AwsRdsDbOptionGroupMembership[] | undefined;
  CharacterSetName?: string | undefined;
  SecondaryAvailabilityZone?: string | undefined;
  StatusInfos?: AwsRdsDbStatusInfo[] | undefined;
  StorageType?: string | undefined;
  DomainMemberships?: AwsRdsDbDomainMembership[] | undefined;
  CopyTagsToSnapshot?: boolean | undefined;
  MonitoringInterval?: number | undefined;
  MonitoringRoleArn?: string | undefined;
  PromotionTier?: number | undefined;
  Timezone?: string | undefined;
  PerformanceInsightsEnabled?: boolean | undefined;
  PerformanceInsightsKmsKeyId?: string | undefined;
  PerformanceInsightsRetentionPeriod?: number | undefined;
  EnabledCloudWatchLogsExports?: string[] | undefined;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[] | undefined;
  ListenerEndpoint?: AwsRdsDbInstanceEndpoint | undefined;
  MaxAllocatedStorage?: number | undefined;
}
export interface AwsSnsTopicSubscription {
  Endpoint?: string | undefined;
  Protocol?: string | undefined;
}
export type AwsSnsTopicSubscriptionList = AwsSnsTopicSubscription[];
export interface AwsSnsTopicDetails {
  KmsMasterKeyId?: string | undefined;
  Subscription?: AwsSnsTopicSubscription[] | undefined;
  TopicName?: string | undefined;
  Owner?: string | undefined;
  SqsSuccessFeedbackRoleArn?: string | undefined;
  SqsFailureFeedbackRoleArn?: string | undefined;
  ApplicationSuccessFeedbackRoleArn?: string | undefined;
  FirehoseSuccessFeedbackRoleArn?: string | undefined;
  FirehoseFailureFeedbackRoleArn?: string | undefined;
  HttpSuccessFeedbackRoleArn?: string | undefined;
  HttpFailureFeedbackRoleArn?: string | undefined;
}
export interface AwsSqsQueueDetails {
  KmsDataKeyReusePeriodSeconds?: number | undefined;
  KmsMasterKeyId?: string | undefined;
  QueueName?: string | undefined;
  DeadLetterTargetArn?: string | undefined;
}
export interface WafAction {
  Type?: string | undefined;
}
export interface WafExcludedRule {
  RuleId?: string | undefined;
}
export type WafExcludedRuleList = WafExcludedRule[];
export interface WafOverrideAction {
  Type?: string | undefined;
}
export interface AwsWafWebAclRule {
  Action?: WafAction | undefined;
  ExcludedRules?: WafExcludedRule[] | undefined;
  OverrideAction?: WafOverrideAction | undefined;
  Priority?: number | undefined;
  RuleId?: string | undefined;
  Type?: string | undefined;
}
export type AwsWafWebAclRuleList = AwsWafWebAclRule[];
export interface AwsWafWebAclDetails {
  Name?: string | undefined;
  DefaultAction?: string | undefined;
  Rules?: AwsWafWebAclRule[] | undefined;
  WebAclId?: string | undefined;
}
export interface AwsRdsDbSnapshotDetails {
  DbSnapshotIdentifier?: string | undefined;
  DbInstanceIdentifier?: string | undefined;
  SnapshotCreateTime?: string | undefined;
  Engine?: string | undefined;
  AllocatedStorage?: number | undefined;
  Status?: string | undefined;
  Port?: number | undefined;
  AvailabilityZone?: string | undefined;
  VpcId?: string | undefined;
  InstanceCreateTime?: string | undefined;
  MasterUsername?: string | undefined;
  EngineVersion?: string | undefined;
  LicenseModel?: string | undefined;
  SnapshotType?: string | undefined;
  Iops?: number | undefined;
  OptionGroupName?: string | undefined;
  PercentProgress?: number | undefined;
  SourceRegion?: string | undefined;
  SourceDbSnapshotIdentifier?: string | undefined;
  StorageType?: string | undefined;
  TdeCredentialArn?: string | undefined;
  Encrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  Timezone?: string | undefined;
  IamDatabaseAuthenticationEnabled?: boolean | undefined;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[] | undefined;
  DbiResourceId?: string | undefined;
}
export interface AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute {
  AttributeName?: string | undefined;
  AttributeValues?: string[] | undefined;
}
export type AwsRdsDbClusterSnapshotDbClusterSnapshotAttributes =
  AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute[];
export interface AwsRdsDbClusterSnapshotDetails {
  AvailabilityZones?: string[] | undefined;
  SnapshotCreateTime?: string | undefined;
  Engine?: string | undefined;
  AllocatedStorage?: number | undefined;
  Status?: string | undefined;
  Port?: number | undefined;
  VpcId?: string | undefined;
  ClusterCreateTime?: string | undefined;
  MasterUsername?: string | undefined;
  EngineVersion?: string | undefined;
  LicenseModel?: string | undefined;
  SnapshotType?: string | undefined;
  PercentProgress?: number | undefined;
  StorageEncrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  DbClusterIdentifier?: string | undefined;
  DbClusterSnapshotIdentifier?: string | undefined;
  IamDatabaseAuthenticationEnabled?: boolean | undefined;
  DbClusterSnapshotAttributes?: AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute[] | undefined;
}
export interface AwsRdsDbClusterAssociatedRole {
  RoleArn?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbClusterAssociatedRoles = AwsRdsDbClusterAssociatedRole[];
export interface AwsRdsDbClusterOptionGroupMembership {
  DbClusterOptionGroupName?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbClusterOptionGroupMemberships = AwsRdsDbClusterOptionGroupMembership[];
export interface AwsRdsDbClusterMember {
  IsClusterWriter?: boolean | undefined;
  PromotionTier?: number | undefined;
  DbInstanceIdentifier?: string | undefined;
  DbClusterParameterGroupStatus?: string | undefined;
}
export type AwsRdsDbClusterMembers = AwsRdsDbClusterMember[];
export interface AwsRdsDbClusterDetails {
  AllocatedStorage?: number | undefined;
  AvailabilityZones?: string[] | undefined;
  BackupRetentionPeriod?: number | undefined;
  DatabaseName?: string | undefined;
  Status?: string | undefined;
  Endpoint?: string | undefined;
  ReaderEndpoint?: string | undefined;
  CustomEndpoints?: string[] | undefined;
  MultiAz?: boolean | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  Port?: number | undefined;
  MasterUsername?: string | undefined;
  PreferredBackupWindow?: string | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  ReadReplicaIdentifiers?: string[] | undefined;
  VpcSecurityGroups?: AwsRdsDbInstanceVpcSecurityGroup[] | undefined;
  HostedZoneId?: string | undefined;
  StorageEncrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  DbClusterResourceId?: string | undefined;
  AssociatedRoles?: AwsRdsDbClusterAssociatedRole[] | undefined;
  ClusterCreateTime?: string | undefined;
  EnabledCloudWatchLogsExports?: string[] | undefined;
  EngineMode?: string | undefined;
  DeletionProtection?: boolean | undefined;
  HttpEndpointEnabled?: boolean | undefined;
  ActivityStreamStatus?: string | undefined;
  CopyTagsToSnapshot?: boolean | undefined;
  CrossAccountClone?: boolean | undefined;
  DomainMemberships?: AwsRdsDbDomainMembership[] | undefined;
  DbClusterParameterGroup?: string | undefined;
  DbSubnetGroup?: string | undefined;
  DbClusterOptionGroupMemberships?: AwsRdsDbClusterOptionGroupMembership[] | undefined;
  DbClusterIdentifier?: string | undefined;
  DbClusterMembers?: AwsRdsDbClusterMember[] | undefined;
  IamDatabaseAuthenticationEnabled?: boolean | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
}
export interface AwsEcsClusterClusterSettingsDetails {
  Name?: string | undefined;
  Value?: string | undefined;
}
export type AwsEcsClusterClusterSettingsList = AwsEcsClusterClusterSettingsDetails[];
export interface AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails {
  CloudWatchEncryptionEnabled?: boolean | undefined;
  CloudWatchLogGroupName?: string | undefined;
  S3BucketName?: string | undefined;
  S3EncryptionEnabled?: boolean | undefined;
  S3KeyPrefix?: string | undefined;
}
export interface AwsEcsClusterConfigurationExecuteCommandConfigurationDetails {
  KmsKeyId?: string | undefined;
  LogConfiguration?:
    | AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails
    | undefined;
  Logging?: string | undefined;
}
export interface AwsEcsClusterConfigurationDetails {
  ExecuteCommandConfiguration?:
    | AwsEcsClusterConfigurationExecuteCommandConfigurationDetails
    | undefined;
}
export interface AwsEcsClusterDefaultCapacityProviderStrategyDetails {
  Base?: number | undefined;
  CapacityProvider?: string | undefined;
  Weight?: number | undefined;
}
export type AwsEcsClusterDefaultCapacityProviderStrategyList =
  AwsEcsClusterDefaultCapacityProviderStrategyDetails[];
export interface AwsEcsClusterDetails {
  ClusterArn?: string | undefined;
  ActiveServicesCount?: number | undefined;
  CapacityProviders?: string[] | undefined;
  ClusterSettings?: AwsEcsClusterClusterSettingsDetails[] | undefined;
  Configuration?: AwsEcsClusterConfigurationDetails | undefined;
  DefaultCapacityProviderStrategy?:
    | AwsEcsClusterDefaultCapacityProviderStrategyDetails[]
    | undefined;
  ClusterName?: string | undefined;
  RegisteredContainerInstancesCount?: number | undefined;
  RunningTasksCount?: number | undefined;
  Status?: string | undefined;
}
export interface AwsMountPoint {
  SourceVolume?: string | undefined;
  ContainerPath?: string | undefined;
}
export type AwsMountPointList = AwsMountPoint[];
export interface AwsEcsContainerDetails {
  Name?: string | undefined;
  Image?: string | undefined;
  MountPoints?: AwsMountPoint[] | undefined;
  Privileged?: boolean | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails {
  Condition?: string | undefined;
  ContainerName?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsDependsOnList =
  AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails {
  Name?: string | undefined;
  Value?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsEnvironmentList =
  AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails {
  Type?: string | undefined;
  Value?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesList =
  AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails {
  Hostname?: string | undefined;
  IpAddress?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsExtraHostsList =
  AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails {
  Options?: { [key: string]: string | undefined } | undefined;
  Type?: string | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails {
  Command?: string[] | undefined;
  Interval?: number | undefined;
  Retries?: number | undefined;
  StartPeriod?: number | undefined;
  Timeout?: number | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails {
  Add?: string[] | undefined;
  Drop?: string[] | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails {
  ContainerPath?: string | undefined;
  HostPath?: string | undefined;
  Permissions?: string[] | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesList =
  AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails {
  ContainerPath?: string | undefined;
  MountOptions?: string[] | undefined;
  Size?: number | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsList =
  AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails {
  Capabilities?:
    | AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails
    | undefined;
  Devices?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails[] | undefined;
  InitProcessEnabled?: boolean | undefined;
  MaxSwap?: number | undefined;
  SharedMemorySize?: number | undefined;
  Swappiness?: number | undefined;
  Tmpfs?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails[] | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails {
  Name?: string | undefined;
  ValueFrom?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsList =
  AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails {
  LogDriver?: string | undefined;
  Options?: { [key: string]: string | undefined } | undefined;
  SecretOptions?:
    | AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails[]
    | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails {
  ContainerPath?: string | undefined;
  ReadOnly?: boolean | undefined;
  SourceVolume?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsMountPointsList =
  AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails {
  ContainerPort?: number | undefined;
  HostPort?: number | undefined;
  Protocol?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsPortMappingsList =
  AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails {
  CredentialsParameter?: string | undefined;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails {
  Type?: string | undefined;
  Value?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsList =
  AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails {
  Name?: string | undefined;
  ValueFrom?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsSecretsList =
  AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails {
  Namespace?: string | undefined;
  Value?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsSystemControlsList =
  AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails {
  HardLimit?: number | undefined;
  Name?: string | undefined;
  SoftLimit?: number | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsUlimitsList =
  AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails {
  ReadOnly?: boolean | undefined;
  SourceContainer?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsVolumesFromList =
  AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsDetails {
  Command?: string[] | undefined;
  Cpu?: number | undefined;
  DependsOn?: AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails[] | undefined;
  DisableNetworking?: boolean | undefined;
  DnsSearchDomains?: string[] | undefined;
  DnsServers?: string[] | undefined;
  DockerLabels?: { [key: string]: string | undefined } | undefined;
  DockerSecurityOptions?: string[] | undefined;
  EntryPoint?: string[] | undefined;
  Environment?: AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails[] | undefined;
  EnvironmentFiles?: AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails[] | undefined;
  Essential?: boolean | undefined;
  ExtraHosts?: AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails[] | undefined;
  FirelensConfiguration?:
    | AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails
    | undefined;
  HealthCheck?: AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails | undefined;
  Hostname?: string | undefined;
  Image?: string | undefined;
  Interactive?: boolean | undefined;
  Links?: string[] | undefined;
  LinuxParameters?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails | undefined;
  LogConfiguration?: AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails | undefined;
  Memory?: number | undefined;
  MemoryReservation?: number | undefined;
  MountPoints?: AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails[] | undefined;
  Name?: string | undefined;
  PortMappings?: AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails[] | undefined;
  Privileged?: boolean | undefined;
  PseudoTerminal?: boolean | undefined;
  ReadonlyRootFilesystem?: boolean | undefined;
  RepositoryCredentials?:
    | AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails
    | undefined;
  ResourceRequirements?:
    | AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails[]
    | undefined;
  Secrets?: AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails[] | undefined;
  StartTimeout?: number | undefined;
  StopTimeout?: number | undefined;
  SystemControls?: AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails[] | undefined;
  Ulimits?: AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails[] | undefined;
  User?: string | undefined;
  VolumesFrom?: AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails[] | undefined;
  WorkingDirectory?: string | undefined;
}
export type AwsEcsTaskDefinitionContainerDefinitionsList =
  AwsEcsTaskDefinitionContainerDefinitionsDetails[];
export interface AwsEcsTaskDefinitionInferenceAcceleratorsDetails {
  DeviceName?: string | undefined;
  DeviceType?: string | undefined;
}
export type AwsEcsTaskDefinitionInferenceAcceleratorsList =
  AwsEcsTaskDefinitionInferenceAcceleratorsDetails[];
export interface AwsEcsTaskDefinitionPlacementConstraintsDetails {
  Expression?: string | undefined;
  Type?: string | undefined;
}
export type AwsEcsTaskDefinitionPlacementConstraintsList =
  AwsEcsTaskDefinitionPlacementConstraintsDetails[];
export interface AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails {
  Name?: string | undefined;
  Value?: string | undefined;
}
export type AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesList =
  AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails[];
export interface AwsEcsTaskDefinitionProxyConfigurationDetails {
  ContainerName?: string | undefined;
  ProxyConfigurationProperties?:
    | AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails[]
    | undefined;
  Type?: string | undefined;
}
export interface AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails {
  Autoprovision?: boolean | undefined;
  Driver?: string | undefined;
  DriverOpts?: { [key: string]: string | undefined } | undefined;
  Labels?: { [key: string]: string | undefined } | undefined;
  Scope?: string | undefined;
}
export interface AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails {
  AccessPointId?: string | undefined;
  Iam?: string | undefined;
}
export interface AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails {
  AuthorizationConfig?:
    | AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails
    | undefined;
  FilesystemId?: string | undefined;
  RootDirectory?: string | undefined;
  TransitEncryption?: string | undefined;
  TransitEncryptionPort?: number | undefined;
}
export interface AwsEcsTaskDefinitionVolumesHostDetails {
  SourcePath?: string | undefined;
}
export interface AwsEcsTaskDefinitionVolumesDetails {
  DockerVolumeConfiguration?:
    | AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails
    | undefined;
  EfsVolumeConfiguration?: AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails | undefined;
  Host?: AwsEcsTaskDefinitionVolumesHostDetails | undefined;
  Name?: string | undefined;
}
export type AwsEcsTaskDefinitionVolumesList = AwsEcsTaskDefinitionVolumesDetails[];
export interface AwsEcsTaskDefinitionDetails {
  ContainerDefinitions?: AwsEcsTaskDefinitionContainerDefinitionsDetails[] | undefined;
  Cpu?: string | undefined;
  ExecutionRoleArn?: string | undefined;
  Family?: string | undefined;
  InferenceAccelerators?: AwsEcsTaskDefinitionInferenceAcceleratorsDetails[] | undefined;
  IpcMode?: string | undefined;
  Memory?: string | undefined;
  NetworkMode?: string | undefined;
  PidMode?: string | undefined;
  PlacementConstraints?: AwsEcsTaskDefinitionPlacementConstraintsDetails[] | undefined;
  ProxyConfiguration?: AwsEcsTaskDefinitionProxyConfigurationDetails | undefined;
  RequiresCompatibilities?: string[] | undefined;
  TaskRoleArn?: string | undefined;
  Volumes?: AwsEcsTaskDefinitionVolumesDetails[] | undefined;
  Status?: string | undefined;
}
export interface VolumeMount {
  Name?: string | undefined;
  MountPath?: string | undefined;
}
export type VolumeMountList = VolumeMount[];
export interface ContainerDetails {
  ContainerRuntime?: string | undefined;
  Name?: string | undefined;
  ImageId?: string | undefined;
  ImageName?: string | undefined;
  LaunchedAt?: string | undefined;
  VolumeMounts?: VolumeMount[] | undefined;
  Privileged?: boolean | undefined;
}
export interface AwsRdsEventSubscriptionDetails {
  CustSubscriptionId?: string | undefined;
  CustomerAwsId?: string | undefined;
  Enabled?: boolean | undefined;
  EventCategoriesList?: string[] | undefined;
  EventSubscriptionArn?: string | undefined;
  SnsTopicArn?: string | undefined;
  SourceIdsList?: string[] | undefined;
  SourceType?: string | undefined;
  Status?: string | undefined;
  SubscriptionCreationTime?: string | undefined;
}
export interface AwsEcsServiceCapacityProviderStrategyDetails {
  Base?: number | undefined;
  CapacityProvider?: string | undefined;
  Weight?: number | undefined;
}
export type AwsEcsServiceCapacityProviderStrategyList =
  AwsEcsServiceCapacityProviderStrategyDetails[];
export interface AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails {
  Enable?: boolean | undefined;
  Rollback?: boolean | undefined;
}
export interface AwsEcsServiceDeploymentConfigurationDetails {
  DeploymentCircuitBreaker?:
    | AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails
    | undefined;
  MaximumPercent?: number | undefined;
  MinimumHealthyPercent?: number | undefined;
}
export interface AwsEcsServiceDeploymentControllerDetails {
  Type?: string | undefined;
}
export interface AwsEcsServiceLoadBalancersDetails {
  ContainerName?: string | undefined;
  ContainerPort?: number | undefined;
  LoadBalancerName?: string | undefined;
  TargetGroupArn?: string | undefined;
}
export type AwsEcsServiceLoadBalancersList = AwsEcsServiceLoadBalancersDetails[];
export interface AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails {
  AssignPublicIp?: string | undefined;
  SecurityGroups?: string[] | undefined;
  Subnets?: string[] | undefined;
}
export interface AwsEcsServiceNetworkConfigurationDetails {
  AwsVpcConfiguration?: AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails | undefined;
}
export interface AwsEcsServicePlacementConstraintsDetails {
  Expression?: string | undefined;
  Type?: string | undefined;
}
export type AwsEcsServicePlacementConstraintsList = AwsEcsServicePlacementConstraintsDetails[];
export interface AwsEcsServicePlacementStrategiesDetails {
  Field?: string | undefined;
  Type?: string | undefined;
}
export type AwsEcsServicePlacementStrategiesList = AwsEcsServicePlacementStrategiesDetails[];
export interface AwsEcsServiceServiceRegistriesDetails {
  ContainerName?: string | undefined;
  ContainerPort?: number | undefined;
  Port?: number | undefined;
  RegistryArn?: string | undefined;
}
export type AwsEcsServiceServiceRegistriesList = AwsEcsServiceServiceRegistriesDetails[];
export interface AwsEcsServiceDetails {
  CapacityProviderStrategy?: AwsEcsServiceCapacityProviderStrategyDetails[] | undefined;
  Cluster?: string | undefined;
  DeploymentConfiguration?: AwsEcsServiceDeploymentConfigurationDetails | undefined;
  DeploymentController?: AwsEcsServiceDeploymentControllerDetails | undefined;
  DesiredCount?: number | undefined;
  EnableEcsManagedTags?: boolean | undefined;
  EnableExecuteCommand?: boolean | undefined;
  HealthCheckGracePeriodSeconds?: number | undefined;
  LaunchType?: string | undefined;
  LoadBalancers?: AwsEcsServiceLoadBalancersDetails[] | undefined;
  Name?: string | undefined;
  NetworkConfiguration?: AwsEcsServiceNetworkConfigurationDetails | undefined;
  PlacementConstraints?: AwsEcsServicePlacementConstraintsDetails[] | undefined;
  PlacementStrategies?: AwsEcsServicePlacementStrategiesDetails[] | undefined;
  PlatformVersion?: string | undefined;
  PropagateTags?: string | undefined;
  Role?: string | undefined;
  SchedulingStrategy?: string | undefined;
  ServiceArn?: string | undefined;
  ServiceName?: string | undefined;
  ServiceRegistries?: AwsEcsServiceServiceRegistriesDetails[] | undefined;
  TaskDefinition?: string | undefined;
}
export interface AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails {
  DeleteOnTermination?: boolean | undefined;
  Encrypted?: boolean | undefined;
  Iops?: number | undefined;
  SnapshotId?: string | undefined;
  VolumeSize?: number | undefined;
  VolumeType?: string | undefined;
}
export interface AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails {
  DeviceName?: string | undefined;
  Ebs?: AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails | undefined;
  NoDevice?: boolean | undefined;
  VirtualName?: string | undefined;
}
export type AwsAutoScalingLaunchConfigurationBlockDeviceMappingsList =
  AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails[];
export interface AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails {
  Enabled?: boolean | undefined;
}
export interface AwsAutoScalingLaunchConfigurationMetadataOptions {
  HttpEndpoint?: string | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpTokens?: string | undefined;
}
export interface AwsAutoScalingLaunchConfigurationDetails {
  AssociatePublicIpAddress?: boolean | undefined;
  BlockDeviceMappings?: AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails[] | undefined;
  ClassicLinkVpcId?: string | undefined;
  ClassicLinkVpcSecurityGroups?: string[] | undefined;
  CreatedTime?: string | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: string | undefined;
  ImageId?: string | undefined;
  InstanceMonitoring?: AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails | undefined;
  InstanceType?: string | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  LaunchConfigurationName?: string | undefined;
  PlacementTenancy?: string | undefined;
  RamdiskId?: string | undefined;
  SecurityGroups?: string[] | undefined;
  SpotPrice?: string | undefined;
  UserData?: string | undefined;
  MetadataOptions?: AwsAutoScalingLaunchConfigurationMetadataOptions | undefined;
}
export interface AwsEc2VpnConnectionVgwTelemetryDetails {
  AcceptedRouteCount?: number | undefined;
  CertificateArn?: string | undefined;
  LastStatusChange?: string | undefined;
  OutsideIpAddress?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
}
export type AwsEc2VpnConnectionVgwTelemetryList = AwsEc2VpnConnectionVgwTelemetryDetails[];
export interface AwsEc2VpnConnectionOptionsTunnelOptionsDetails {
  DpdTimeoutSeconds?: number | undefined;
  IkeVersions?: string[] | undefined;
  OutsideIpAddress?: string | undefined;
  Phase1DhGroupNumbers?: number[] | undefined;
  Phase1EncryptionAlgorithms?: string[] | undefined;
  Phase1IntegrityAlgorithms?: string[] | undefined;
  Phase1LifetimeSeconds?: number | undefined;
  Phase2DhGroupNumbers?: number[] | undefined;
  Phase2EncryptionAlgorithms?: string[] | undefined;
  Phase2IntegrityAlgorithms?: string[] | undefined;
  Phase2LifetimeSeconds?: number | undefined;
  PreSharedKey?: string | undefined;
  RekeyFuzzPercentage?: number | undefined;
  RekeyMarginTimeSeconds?: number | undefined;
  ReplayWindowSize?: number | undefined;
  TunnelInsideCidr?: string | undefined;
}
export type AwsEc2VpnConnectionOptionsTunnelOptionsList =
  AwsEc2VpnConnectionOptionsTunnelOptionsDetails[];
export interface AwsEc2VpnConnectionOptionsDetails {
  StaticRoutesOnly?: boolean | undefined;
  TunnelOptions?: AwsEc2VpnConnectionOptionsTunnelOptionsDetails[] | undefined;
}
export interface AwsEc2VpnConnectionRoutesDetails {
  DestinationCidrBlock?: string | undefined;
  State?: string | undefined;
}
export type AwsEc2VpnConnectionRoutesList = AwsEc2VpnConnectionRoutesDetails[];
export interface AwsEc2VpnConnectionDetails {
  VpnConnectionId?: string | undefined;
  State?: string | undefined;
  CustomerGatewayId?: string | undefined;
  CustomerGatewayConfiguration?: string | undefined;
  Type?: string | undefined;
  VpnGatewayId?: string | undefined;
  Category?: string | undefined;
  VgwTelemetry?: AwsEc2VpnConnectionVgwTelemetryDetails[] | undefined;
  Options?: AwsEc2VpnConnectionOptionsDetails | undefined;
  Routes?: AwsEc2VpnConnectionRoutesDetails[] | undefined;
  TransitGatewayId?: string | undefined;
}
export interface AwsEcrContainerImageDetails {
  RegistryId?: string | undefined;
  RepositoryName?: string | undefined;
  Architecture?: string | undefined;
  ImageDigest?: string | undefined;
  ImageTags?: string[] | undefined;
  ImagePublishedAt?: string | undefined;
}
export interface AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails {
  Enabled?: boolean | undefined;
  KmsKeyId?: string | undefined;
}
export interface AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails {
  Enabled?: boolean | undefined;
}
export interface AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails {
  AutomatedUpdateDate?: string | undefined;
  Cancellable?: boolean | undefined;
  CurrentVersion?: string | undefined;
  Description?: string | undefined;
  NewVersion?: string | undefined;
  UpdateAvailable?: boolean | undefined;
  UpdateStatus?: string | undefined;
  OptionalDeployment?: boolean | undefined;
}
export interface AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails {
  AvailabilityZoneCount?: number | undefined;
}
export interface AwsOpenSearchServiceDomainClusterConfigDetails {
  InstanceCount?: number | undefined;
  WarmEnabled?: boolean | undefined;
  WarmCount?: number | undefined;
  DedicatedMasterEnabled?: boolean | undefined;
  ZoneAwarenessConfig?:
    | AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails
    | undefined;
  DedicatedMasterCount?: number | undefined;
  InstanceType?: string | undefined;
  WarmType?: string | undefined;
  ZoneAwarenessEnabled?: boolean | undefined;
  DedicatedMasterType?: string | undefined;
}
export interface AwsOpenSearchServiceDomainDomainEndpointOptionsDetails {
  CustomEndpointCertificateArn?: string | undefined;
  CustomEndpointEnabled?: boolean | undefined;
  EnforceHTTPS?: boolean | undefined;
  CustomEndpoint?: string | undefined;
  TLSSecurityPolicy?: string | undefined;
}
export interface AwsOpenSearchServiceDomainVpcOptionsDetails {
  SecurityGroupIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
}
export interface AwsOpenSearchServiceDomainLogPublishingOption {
  CloudWatchLogsLogGroupArn?: string | undefined;
  Enabled?: boolean | undefined;
}
export interface AwsOpenSearchServiceDomainLogPublishingOptionsDetails {
  IndexSlowLogs?: AwsOpenSearchServiceDomainLogPublishingOption | undefined;
  SearchSlowLogs?: AwsOpenSearchServiceDomainLogPublishingOption | undefined;
  AuditLogs?: AwsOpenSearchServiceDomainLogPublishingOption | undefined;
}
export interface AwsOpenSearchServiceDomainMasterUserOptionsDetails {
  MasterUserArn?: string | undefined;
  MasterUserName?: string | undefined;
  MasterUserPassword?: string | undefined;
}
export interface AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails {
  Enabled?: boolean | undefined;
  InternalUserDatabaseEnabled?: boolean | undefined;
  MasterUserOptions?: AwsOpenSearchServiceDomainMasterUserOptionsDetails | undefined;
}
export interface AwsOpenSearchServiceDomainDetails {
  Arn?: string | undefined;
  AccessPolicies?: string | undefined;
  DomainName?: string | undefined;
  Id?: string | undefined;
  DomainEndpoint?: string | undefined;
  EngineVersion?: string | undefined;
  EncryptionAtRestOptions?: AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails | undefined;
  NodeToNodeEncryptionOptions?:
    | AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails
    | undefined;
  ServiceSoftwareOptions?: AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails | undefined;
  ClusterConfig?: AwsOpenSearchServiceDomainClusterConfigDetails | undefined;
  DomainEndpointOptions?: AwsOpenSearchServiceDomainDomainEndpointOptionsDetails | undefined;
  VpcOptions?: AwsOpenSearchServiceDomainVpcOptionsDetails | undefined;
  LogPublishingOptions?: AwsOpenSearchServiceDomainLogPublishingOptionsDetails | undefined;
  DomainEndpoints?: { [key: string]: string | undefined } | undefined;
  AdvancedSecurityOptions?: AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails | undefined;
}
export interface AwsEc2VpcEndpointServiceServiceTypeDetails {
  ServiceType?: string | undefined;
}
export type AwsEc2VpcEndpointServiceServiceTypeList = AwsEc2VpcEndpointServiceServiceTypeDetails[];
export interface AwsEc2VpcEndpointServiceDetails {
  AcceptanceRequired?: boolean | undefined;
  AvailabilityZones?: string[] | undefined;
  BaseEndpointDnsNames?: string[] | undefined;
  ManagesVpcEndpoints?: boolean | undefined;
  GatewayLoadBalancerArns?: string[] | undefined;
  NetworkLoadBalancerArns?: string[] | undefined;
  PrivateDnsName?: string | undefined;
  ServiceId?: string | undefined;
  ServiceName?: string | undefined;
  ServiceState?: string | undefined;
  ServiceType?: AwsEc2VpcEndpointServiceServiceTypeDetails[] | undefined;
}
export interface AwsXrayEncryptionConfigDetails {
  KeyId?: string | undefined;
  Status?: string | undefined;
  Type?: string | undefined;
}
export interface AwsWafRateBasedRuleMatchPredicate {
  DataId?: string | undefined;
  Negated?: boolean | undefined;
  Type?: string | undefined;
}
export type AwsWafRateBasedRuleMatchPredicateList = AwsWafRateBasedRuleMatchPredicate[];
export interface AwsWafRateBasedRuleDetails {
  MetricName?: string | undefined;
  Name?: string | undefined;
  RateKey?: string | undefined;
  RateLimit?: number | undefined;
  RuleId?: string | undefined;
  MatchPredicates?: AwsWafRateBasedRuleMatchPredicate[] | undefined;
}
export interface AwsWafRegionalRateBasedRuleMatchPredicate {
  DataId?: string | undefined;
  Negated?: boolean | undefined;
  Type?: string | undefined;
}
export type AwsWafRegionalRateBasedRuleMatchPredicateList =
  AwsWafRegionalRateBasedRuleMatchPredicate[];
export interface AwsWafRegionalRateBasedRuleDetails {
  MetricName?: string | undefined;
  Name?: string | undefined;
  RateKey?: string | undefined;
  RateLimit?: number | undefined;
  RuleId?: string | undefined;
  MatchPredicates?: AwsWafRegionalRateBasedRuleMatchPredicate[] | undefined;
}
export interface AwsEcrRepositoryImageScanningConfigurationDetails {
  ScanOnPush?: boolean | undefined;
}
export interface AwsEcrRepositoryLifecyclePolicyDetails {
  LifecyclePolicyText?: string | undefined;
  RegistryId?: string | undefined;
}
export interface AwsEcrRepositoryDetails {
  Arn?: string | undefined;
  ImageScanningConfiguration?: AwsEcrRepositoryImageScanningConfigurationDetails | undefined;
  ImageTagMutability?: string | undefined;
  LifecyclePolicy?: AwsEcrRepositoryLifecyclePolicyDetails | undefined;
  RepositoryName?: string | undefined;
  RepositoryPolicyText?: string | undefined;
}
export interface AwsEksClusterResourcesVpcConfigDetails {
  SecurityGroupIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
  EndpointPublicAccess?: boolean | undefined;
}
export interface AwsEksClusterLoggingClusterLoggingDetails {
  Enabled?: boolean | undefined;
  Types?: string[] | undefined;
}
export type AwsEksClusterLoggingClusterLoggingList = AwsEksClusterLoggingClusterLoggingDetails[];
export interface AwsEksClusterLoggingDetails {
  ClusterLogging?: AwsEksClusterLoggingClusterLoggingDetails[] | undefined;
}
export interface AwsEksClusterDetails {
  Arn?: string | undefined;
  CertificateAuthorityData?: string | undefined;
  ClusterStatus?: string | undefined;
  Endpoint?: string | undefined;
  Name?: string | undefined;
  ResourcesVpcConfig?: AwsEksClusterResourcesVpcConfigDetails | undefined;
  RoleArn?: string | undefined;
  Version?: string | undefined;
  Logging?: AwsEksClusterLoggingDetails | undefined;
}
export interface FirewallPolicyStatefulRuleGroupReferencesDetails {
  ResourceArn?: string | undefined;
}
export type FirewallPolicyStatefulRuleGroupReferencesList =
  FirewallPolicyStatefulRuleGroupReferencesDetails[];
export interface StatelessCustomPublishMetricActionDimension {
  Value?: string | undefined;
}
export type StatelessCustomPublishMetricActionDimensionsList =
  StatelessCustomPublishMetricActionDimension[];
export interface StatelessCustomPublishMetricAction {
  Dimensions?: StatelessCustomPublishMetricActionDimension[] | undefined;
}
export interface StatelessCustomActionDefinition {
  PublishMetricAction?: StatelessCustomPublishMetricAction | undefined;
}
export interface FirewallPolicyStatelessCustomActionsDetails {
  ActionDefinition?: StatelessCustomActionDefinition | undefined;
  ActionName?: string | undefined;
}
export type FirewallPolicyStatelessCustomActionsList =
  FirewallPolicyStatelessCustomActionsDetails[];
export interface FirewallPolicyStatelessRuleGroupReferencesDetails {
  Priority?: number | undefined;
  ResourceArn?: string | undefined;
}
export type FirewallPolicyStatelessRuleGroupReferencesList =
  FirewallPolicyStatelessRuleGroupReferencesDetails[];
export interface FirewallPolicyDetails {
  StatefulRuleGroupReferences?: FirewallPolicyStatefulRuleGroupReferencesDetails[] | undefined;
  StatelessCustomActions?: FirewallPolicyStatelessCustomActionsDetails[] | undefined;
  StatelessDefaultActions?: string[] | undefined;
  StatelessFragmentDefaultActions?: string[] | undefined;
  StatelessRuleGroupReferences?: FirewallPolicyStatelessRuleGroupReferencesDetails[] | undefined;
}
export interface AwsNetworkFirewallFirewallPolicyDetails {
  FirewallPolicy?: FirewallPolicyDetails | undefined;
  FirewallPolicyArn?: string | undefined;
  FirewallPolicyId?: string | undefined;
  FirewallPolicyName?: string | undefined;
  Description?: string | undefined;
}
export interface AwsNetworkFirewallFirewallSubnetMappingsDetails {
  SubnetId?: string | undefined;
}
export type AwsNetworkFirewallFirewallSubnetMappingsList =
  AwsNetworkFirewallFirewallSubnetMappingsDetails[];
export interface AwsNetworkFirewallFirewallDetails {
  DeleteProtection?: boolean | undefined;
  Description?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallId?: string | undefined;
  FirewallName?: string | undefined;
  FirewallPolicyArn?: string | undefined;
  FirewallPolicyChangeProtection?: boolean | undefined;
  SubnetChangeProtection?: boolean | undefined;
  SubnetMappings?: AwsNetworkFirewallFirewallSubnetMappingsDetails[] | undefined;
  VpcId?: string | undefined;
}
export interface RuleGroupVariablesIpSetsDetails {
  Definition?: string[] | undefined;
}
export interface RuleGroupVariablesPortSetsDetails {
  Definition?: string[] | undefined;
}
export interface RuleGroupVariables {
  IpSets?: RuleGroupVariablesIpSetsDetails | undefined;
  PortSets?: RuleGroupVariablesPortSetsDetails | undefined;
}
export interface RuleGroupSourceListDetails {
  GeneratedRulesType?: string | undefined;
  TargetTypes?: string[] | undefined;
  Targets?: string[] | undefined;
}
export interface RuleGroupSourceStatefulRulesHeaderDetails {
  Destination?: string | undefined;
  DestinationPort?: string | undefined;
  Direction?: string | undefined;
  Protocol?: string | undefined;
  Source?: string | undefined;
  SourcePort?: string | undefined;
}
export type RuleGroupSourceStatefulRulesRuleOptionsSettingsList = string[];
export interface RuleGroupSourceStatefulRulesOptionsDetails {
  Keyword?: string | undefined;
  Settings?: string[] | undefined;
}
export type RuleGroupSourceStatefulRulesOptionsList = RuleGroupSourceStatefulRulesOptionsDetails[];
export interface RuleGroupSourceStatefulRulesDetails {
  Action?: string | undefined;
  Header?: RuleGroupSourceStatefulRulesHeaderDetails | undefined;
  RuleOptions?: RuleGroupSourceStatefulRulesOptionsDetails[] | undefined;
}
export type RuleGroupSourceStatefulRulesList = RuleGroupSourceStatefulRulesDetails[];
export interface RuleGroupSourceCustomActionsDetails {
  ActionDefinition?: StatelessCustomActionDefinition | undefined;
  ActionName?: string | undefined;
}
export type RuleGroupSourceCustomActionsList = RuleGroupSourceCustomActionsDetails[];
export interface RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts {
  FromPort?: number | undefined;
  ToPort?: number | undefined;
}
export type RuleGroupSourceStatelessRuleMatchAttributesDestinationPortsList =
  RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts[];
export interface RuleGroupSourceStatelessRuleMatchAttributesDestinations {
  AddressDefinition?: string | undefined;
}
export type RuleGroupSourceStatelessRuleMatchAttributesDestinationsList =
  RuleGroupSourceStatelessRuleMatchAttributesDestinations[];
export type RuleGroupSourceStatelessRuleMatchAttributesProtocolsList = number[];
export interface RuleGroupSourceStatelessRuleMatchAttributesSourcePorts {
  FromPort?: number | undefined;
  ToPort?: number | undefined;
}
export type RuleGroupSourceStatelessRuleMatchAttributesSourcePortsList =
  RuleGroupSourceStatelessRuleMatchAttributesSourcePorts[];
export interface RuleGroupSourceStatelessRuleMatchAttributesSources {
  AddressDefinition?: string | undefined;
}
export type RuleGroupSourceStatelessRuleMatchAttributesSourcesList =
  RuleGroupSourceStatelessRuleMatchAttributesSources[];
export interface RuleGroupSourceStatelessRuleMatchAttributesTcpFlags {
  Flags?: string[] | undefined;
  Masks?: string[] | undefined;
}
export type RuleGroupSourceStatelessRuleMatchAttributesTcpFlagsList =
  RuleGroupSourceStatelessRuleMatchAttributesTcpFlags[];
export interface RuleGroupSourceStatelessRuleMatchAttributes {
  DestinationPorts?: RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts[] | undefined;
  Destinations?: RuleGroupSourceStatelessRuleMatchAttributesDestinations[] | undefined;
  Protocols?: number[] | undefined;
  SourcePorts?: RuleGroupSourceStatelessRuleMatchAttributesSourcePorts[] | undefined;
  Sources?: RuleGroupSourceStatelessRuleMatchAttributesSources[] | undefined;
  TcpFlags?: RuleGroupSourceStatelessRuleMatchAttributesTcpFlags[] | undefined;
}
export interface RuleGroupSourceStatelessRuleDefinition {
  Actions?: string[] | undefined;
  MatchAttributes?: RuleGroupSourceStatelessRuleMatchAttributes | undefined;
}
export interface RuleGroupSourceStatelessRulesDetails {
  Priority?: number | undefined;
  RuleDefinition?: RuleGroupSourceStatelessRuleDefinition | undefined;
}
export type RuleGroupSourceStatelessRulesList = RuleGroupSourceStatelessRulesDetails[];
export interface RuleGroupSourceStatelessRulesAndCustomActionsDetails {
  CustomActions?: RuleGroupSourceCustomActionsDetails[] | undefined;
  StatelessRules?: RuleGroupSourceStatelessRulesDetails[] | undefined;
}
export interface RuleGroupSource {
  RulesSourceList?: RuleGroupSourceListDetails | undefined;
  RulesString?: string | undefined;
  StatefulRules?: RuleGroupSourceStatefulRulesDetails[] | undefined;
  StatelessRulesAndCustomActions?: RuleGroupSourceStatelessRulesAndCustomActionsDetails | undefined;
}
export interface RuleGroupDetails {
  RuleVariables?: RuleGroupVariables | undefined;
  RulesSource?: RuleGroupSource | undefined;
}
export interface AwsNetworkFirewallRuleGroupDetails {
  Capacity?: number | undefined;
  Description?: string | undefined;
  RuleGroup?: RuleGroupDetails | undefined;
  RuleGroupArn?: string | undefined;
  RuleGroupId?: string | undefined;
  RuleGroupName?: string | undefined;
  Type?: string | undefined;
}
export interface AwsRdsDbSecurityGroupEc2SecurityGroup {
  Ec2SecurityGroupId?: string | undefined;
  Ec2SecurityGroupName?: string | undefined;
  Ec2SecurityGroupOwnerId?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbSecurityGroupEc2SecurityGroups = AwsRdsDbSecurityGroupEc2SecurityGroup[];
export interface AwsRdsDbSecurityGroupIpRange {
  CidrIp?: string | undefined;
  Status?: string | undefined;
}
export type AwsRdsDbSecurityGroupIpRanges = AwsRdsDbSecurityGroupIpRange[];
export interface AwsRdsDbSecurityGroupDetails {
  DbSecurityGroupArn?: string | undefined;
  DbSecurityGroupDescription?: string | undefined;
  DbSecurityGroupName?: string | undefined;
  Ec2SecurityGroups?: AwsRdsDbSecurityGroupEc2SecurityGroup[] | undefined;
  IpRanges?: AwsRdsDbSecurityGroupIpRange[] | undefined;
  OwnerId?: string | undefined;
  VpcId?: string | undefined;
}
export interface AwsKinesisStreamStreamEncryptionDetails {
  EncryptionType?: string | undefined;
  KeyId?: string | undefined;
}
export interface AwsKinesisStreamDetails {
  Name?: string | undefined;
  Arn?: string | undefined;
  StreamEncryption?: AwsKinesisStreamStreamEncryptionDetails | undefined;
  ShardCount?: number | undefined;
  RetentionPeriodHours?: number | undefined;
}
export interface AwsEc2TransitGatewayDetails {
  Id?: string | undefined;
  Description?: string | undefined;
  DefaultRouteTablePropagation?: string | undefined;
  AutoAcceptSharedAttachments?: string | undefined;
  DefaultRouteTableAssociation?: string | undefined;
  TransitGatewayCidrBlocks?: string[] | undefined;
  AssociationDefaultRouteTableId?: string | undefined;
  PropagationDefaultRouteTableId?: string | undefined;
  VpnEcmpSupport?: string | undefined;
  DnsSupport?: string | undefined;
  MulticastSupport?: string | undefined;
  AmazonSideAsn?: number | undefined;
}
export interface AwsEfsAccessPointPosixUserDetails {
  Gid?: string | undefined;
  SecondaryGids?: string[] | undefined;
  Uid?: string | undefined;
}
export interface AwsEfsAccessPointRootDirectoryCreationInfoDetails {
  OwnerGid?: string | undefined;
  OwnerUid?: string | undefined;
  Permissions?: string | undefined;
}
export interface AwsEfsAccessPointRootDirectoryDetails {
  CreationInfo?: AwsEfsAccessPointRootDirectoryCreationInfoDetails | undefined;
  Path?: string | undefined;
}
export interface AwsEfsAccessPointDetails {
  AccessPointId?: string | undefined;
  Arn?: string | undefined;
  ClientToken?: string | undefined;
  FileSystemId?: string | undefined;
  PosixUser?: AwsEfsAccessPointPosixUserDetails | undefined;
  RootDirectory?: AwsEfsAccessPointRootDirectoryDetails | undefined;
}
export interface AwsCloudFormationStackDriftInformationDetails {
  StackDriftStatus?: string | undefined;
}
export interface AwsCloudFormationStackOutputsDetails {
  Description?: string | undefined;
  OutputKey?: string | undefined;
  OutputValue?: string | undefined;
}
export type AwsCloudFormationStackOutputsList = AwsCloudFormationStackOutputsDetails[];
export interface AwsCloudFormationStackDetails {
  Capabilities?: string[] | undefined;
  CreationTime?: string | undefined;
  Description?: string | undefined;
  DisableRollback?: boolean | undefined;
  DriftInformation?: AwsCloudFormationStackDriftInformationDetails | undefined;
  EnableTerminationProtection?: boolean | undefined;
  LastUpdatedTime?: string | undefined;
  NotificationArns?: string[] | undefined;
  Outputs?: AwsCloudFormationStackOutputsDetails[] | undefined;
  RoleArn?: string | undefined;
  StackId?: string | undefined;
  StackName?: string | undefined;
  StackStatus?: string | undefined;
  StackStatusReason?: string | undefined;
  TimeoutInMinutes?: number | undefined;
}
export interface AwsCloudWatchAlarmDimensionsDetails {
  Name?: string | undefined;
  Value?: string | undefined;
}
export type AwsCloudWatchAlarmDimensionsList = AwsCloudWatchAlarmDimensionsDetails[];
export interface AwsCloudWatchAlarmDetails {
  ActionsEnabled?: boolean | undefined;
  AlarmActions?: string[] | undefined;
  AlarmArn?: string | undefined;
  AlarmConfigurationUpdatedTimestamp?: string | undefined;
  AlarmDescription?: string | undefined;
  AlarmName?: string | undefined;
  ComparisonOperator?: string | undefined;
  DatapointsToAlarm?: number | undefined;
  Dimensions?: AwsCloudWatchAlarmDimensionsDetails[] | undefined;
  EvaluateLowSampleCountPercentile?: string | undefined;
  EvaluationPeriods?: number | undefined;
  ExtendedStatistic?: string | undefined;
  InsufficientDataActions?: string[] | undefined;
  MetricName?: string | undefined;
  Namespace?: string | undefined;
  OkActions?: string[] | undefined;
  Period?: number | undefined;
  Statistic?: string | undefined;
  Threshold?: number | undefined;
  ThresholdMetricId?: string | undefined;
  TreatMissingData?: string | undefined;
  Unit?: string | undefined;
}
export interface VpcInfoCidrBlockSetDetails {
  CidrBlock?: string | undefined;
}
export type VpcInfoCidrBlockSetList = VpcInfoCidrBlockSetDetails[];
export interface VpcInfoIpv6CidrBlockSetDetails {
  Ipv6CidrBlock?: string | undefined;
}
export type VpcInfoIpv6CidrBlockSetList = VpcInfoIpv6CidrBlockSetDetails[];
export interface VpcInfoPeeringOptionsDetails {
  AllowDnsResolutionFromRemoteVpc?: boolean | undefined;
  AllowEgressFromLocalClassicLinkToRemoteVpc?: boolean | undefined;
  AllowEgressFromLocalVpcToRemoteClassicLink?: boolean | undefined;
}
export interface AwsEc2VpcPeeringConnectionVpcInfoDetails {
  CidrBlock?: string | undefined;
  CidrBlockSet?: VpcInfoCidrBlockSetDetails[] | undefined;
  Ipv6CidrBlockSet?: VpcInfoIpv6CidrBlockSetDetails[] | undefined;
  OwnerId?: string | undefined;
  PeeringOptions?: VpcInfoPeeringOptionsDetails | undefined;
  Region?: string | undefined;
  VpcId?: string | undefined;
}
export interface AwsEc2VpcPeeringConnectionStatusDetails {
  Code?: string | undefined;
  Message?: string | undefined;
}
export interface AwsEc2VpcPeeringConnectionDetails {
  AccepterVpcInfo?: AwsEc2VpcPeeringConnectionVpcInfoDetails | undefined;
  ExpirationTime?: string | undefined;
  RequesterVpcInfo?: AwsEc2VpcPeeringConnectionVpcInfoDetails | undefined;
  Status?: AwsEc2VpcPeeringConnectionStatusDetails | undefined;
  VpcPeeringConnectionId?: string | undefined;
}
export interface AwsWafRegionalRuleGroupRulesActionDetails {
  Type?: string | undefined;
}
export interface AwsWafRegionalRuleGroupRulesDetails {
  Action?: AwsWafRegionalRuleGroupRulesActionDetails | undefined;
  Priority?: number | undefined;
  RuleId?: string | undefined;
  Type?: string | undefined;
}
export type AwsWafRegionalRuleGroupRulesList = AwsWafRegionalRuleGroupRulesDetails[];
export interface AwsWafRegionalRuleGroupDetails {
  MetricName?: string | undefined;
  Name?: string | undefined;
  RuleGroupId?: string | undefined;
  Rules?: AwsWafRegionalRuleGroupRulesDetails[] | undefined;
}
export interface AwsWafRegionalRulePredicateListDetails {
  DataId?: string | undefined;
  Negated?: boolean | undefined;
  Type?: string | undefined;
}
export type AwsWafRegionalRulePredicateList = AwsWafRegionalRulePredicateListDetails[];
export interface AwsWafRegionalRuleDetails {
  MetricName?: string | undefined;
  Name?: string | undefined;
  PredicateList?: AwsWafRegionalRulePredicateListDetails[] | undefined;
  RuleId?: string | undefined;
}
export interface AwsWafRegionalWebAclRulesListActionDetails {
  Type?: string | undefined;
}
export interface AwsWafRegionalWebAclRulesListOverrideActionDetails {
  Type?: string | undefined;
}
export interface AwsWafRegionalWebAclRulesListDetails {
  Action?: AwsWafRegionalWebAclRulesListActionDetails | undefined;
  OverrideAction?: AwsWafRegionalWebAclRulesListOverrideActionDetails | undefined;
  Priority?: number | undefined;
  RuleId?: string | undefined;
  Type?: string | undefined;
}
export type AwsWafRegionalWebAclRulesList = AwsWafRegionalWebAclRulesListDetails[];
export interface AwsWafRegionalWebAclDetails {
  DefaultAction?: string | undefined;
  MetricName?: string | undefined;
  Name?: string | undefined;
  RulesList?: AwsWafRegionalWebAclRulesListDetails[] | undefined;
  WebAclId?: string | undefined;
}
export interface AwsWafRulePredicateListDetails {
  DataId?: string | undefined;
  Negated?: boolean | undefined;
  Type?: string | undefined;
}
export type AwsWafRulePredicateList = AwsWafRulePredicateListDetails[];
export interface AwsWafRuleDetails {
  MetricName?: string | undefined;
  Name?: string | undefined;
  PredicateList?: AwsWafRulePredicateListDetails[] | undefined;
  RuleId?: string | undefined;
}
export interface AwsWafRuleGroupRulesActionDetails {
  Type?: string | undefined;
}
export interface AwsWafRuleGroupRulesDetails {
  Action?: AwsWafRuleGroupRulesActionDetails | undefined;
  Priority?: number | undefined;
  RuleId?: string | undefined;
  Type?: string | undefined;
}
export type AwsWafRuleGroupRulesList = AwsWafRuleGroupRulesDetails[];
export interface AwsWafRuleGroupDetails {
  MetricName?: string | undefined;
  Name?: string | undefined;
  RuleGroupId?: string | undefined;
  Rules?: AwsWafRuleGroupRulesDetails[] | undefined;
}
export interface AwsEcsTaskVolumeHostDetails {
  SourcePath?: string | undefined;
}
export interface AwsEcsTaskVolumeDetails {
  Name?: string | undefined;
  Host?: AwsEcsTaskVolumeHostDetails | undefined;
}
export type AwsEcsTaskVolumeDetailsList = AwsEcsTaskVolumeDetails[];
export type AwsEcsContainerDetailsList = AwsEcsContainerDetails[];
export interface AwsEcsTaskDetails {
  ClusterArn?: string | undefined;
  TaskDefinitionArn?: string | undefined;
  Version?: string | undefined;
  CreatedAt?: string | undefined;
  StartedAt?: string | undefined;
  StartedBy?: string | undefined;
  Group?: string | undefined;
  Volumes?: AwsEcsTaskVolumeDetails[] | undefined;
  Containers?: AwsEcsContainerDetails[] | undefined;
}
export interface AwsBackupBackupVaultNotificationsDetails {
  BackupVaultEvents?: string[] | undefined;
  SnsTopicArn?: string | undefined;
}
export interface AwsBackupBackupVaultDetails {
  BackupVaultArn?: string | undefined;
  BackupVaultName?: string | undefined;
  EncryptionKeyArn?: string | undefined;
  Notifications?: AwsBackupBackupVaultNotificationsDetails | undefined;
  AccessPolicy?: string | undefined;
}
export interface AwsBackupBackupPlanAdvancedBackupSettingsDetails {
  BackupOptions?: { [key: string]: string | undefined } | undefined;
  ResourceType?: string | undefined;
}
export type AwsBackupBackupPlanAdvancedBackupSettingsList =
  AwsBackupBackupPlanAdvancedBackupSettingsDetails[];
export interface AwsBackupBackupPlanLifecycleDetails {
  DeleteAfterDays?: number | undefined;
  MoveToColdStorageAfterDays?: number | undefined;
}
export interface AwsBackupBackupPlanRuleCopyActionsDetails {
  DestinationBackupVaultArn?: string | undefined;
  Lifecycle?: AwsBackupBackupPlanLifecycleDetails | undefined;
}
export type AwsBackupBackupPlanRuleCopyActionsList = AwsBackupBackupPlanRuleCopyActionsDetails[];
export interface AwsBackupBackupPlanRuleDetails {
  TargetBackupVault?: string | undefined;
  StartWindowMinutes?: number | undefined;
  ScheduleExpression?: string | undefined;
  RuleName?: string | undefined;
  RuleId?: string | undefined;
  EnableContinuousBackup?: boolean | undefined;
  CompletionWindowMinutes?: number | undefined;
  CopyActions?: AwsBackupBackupPlanRuleCopyActionsDetails[] | undefined;
  Lifecycle?: AwsBackupBackupPlanLifecycleDetails | undefined;
}
export type AwsBackupBackupPlanRuleList = AwsBackupBackupPlanRuleDetails[];
export interface AwsBackupBackupPlanBackupPlanDetails {
  BackupPlanName?: string | undefined;
  AdvancedBackupSettings?: AwsBackupBackupPlanAdvancedBackupSettingsDetails[] | undefined;
  BackupPlanRule?: AwsBackupBackupPlanRuleDetails[] | undefined;
}
export interface AwsBackupBackupPlanDetails {
  BackupPlan?: AwsBackupBackupPlanBackupPlanDetails | undefined;
  BackupPlanArn?: string | undefined;
  BackupPlanId?: string | undefined;
  VersionId?: string | undefined;
}
export interface AwsBackupRecoveryPointCalculatedLifecycleDetails {
  DeleteAt?: string | undefined;
  MoveToColdStorageAt?: string | undefined;
}
export interface AwsBackupRecoveryPointCreatedByDetails {
  BackupPlanArn?: string | undefined;
  BackupPlanId?: string | undefined;
  BackupPlanVersion?: string | undefined;
  BackupRuleId?: string | undefined;
}
export interface AwsBackupRecoveryPointLifecycleDetails {
  DeleteAfterDays?: number | undefined;
  MoveToColdStorageAfterDays?: number | undefined;
}
export interface AwsBackupRecoveryPointDetails {
  BackupSizeInBytes?: number | undefined;
  BackupVaultArn?: string | undefined;
  BackupVaultName?: string | undefined;
  CalculatedLifecycle?: AwsBackupRecoveryPointCalculatedLifecycleDetails | undefined;
  CompletionDate?: string | undefined;
  CreatedBy?: AwsBackupRecoveryPointCreatedByDetails | undefined;
  CreationDate?: string | undefined;
  EncryptionKeyArn?: string | undefined;
  IamRoleArn?: string | undefined;
  IsEncrypted?: boolean | undefined;
  LastRestoreTime?: string | undefined;
  Lifecycle?: AwsBackupRecoveryPointLifecycleDetails | undefined;
  RecoveryPointArn?: string | undefined;
  ResourceArn?: string | undefined;
  ResourceType?: string | undefined;
  SourceBackupVaultArn?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  StorageClass?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails {
  DeleteOnTermination?: boolean | undefined;
  Encrypted?: boolean | undefined;
  Iops?: number | undefined;
  KmsKeyId?: string | undefined;
  SnapshotId?: string | undefined;
  Throughput?: number | undefined;
  VolumeSize?: number | undefined;
  VolumeType?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails {
  DeviceName?: string | undefined;
  Ebs?: AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails | undefined;
  NoDevice?: string | undefined;
  VirtualName?: string | undefined;
}
export type AwsEc2LaunchTemplateDataBlockDeviceMappingSetList =
  AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails[];
export interface AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails {
  CapacityReservationId?: string | undefined;
  CapacityReservationResourceGroupArn?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails {
  CapacityReservationPreference?: string | undefined;
  CapacityReservationTarget?:
    | AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails
    | undefined;
}
export interface AwsEc2LaunchTemplateDataCpuOptionsDetails {
  CoreCount?: number | undefined;
  ThreadsPerCore?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataCreditSpecificationDetails {
  CpuCredits?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails {
  Type?: string | undefined;
}
export type AwsEc2LaunchTemplateDataElasticGpuSpecificationSetList =
  AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails[];
export interface AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails {
  Count?: number | undefined;
  Type?: string | undefined;
}
export type AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetList =
  AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails[];
export interface AwsEc2LaunchTemplateDataEnclaveOptionsDetails {
  Enabled?: boolean | undefined;
}
export interface AwsEc2LaunchTemplateDataHibernationOptionsDetails {
  Configured?: boolean | undefined;
}
export interface AwsEc2LaunchTemplateDataIamInstanceProfileDetails {
  Arn?: string | undefined;
  Name?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails {
  BlockDurationMinutes?: number | undefined;
  InstanceInterruptionBehavior?: string | undefined;
  MaxPrice?: string | undefined;
  SpotInstanceType?: string | undefined;
  ValidUntil?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails {
  MarketType?: string | undefined;
  SpotOptions?: AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails {
  Max?: number | undefined;
  Min?: number | undefined;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsDetails {
  AcceleratorCount?:
    | AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails
    | undefined;
  AcceleratorManufacturers?: string[] | undefined;
  AcceleratorNames?: string[] | undefined;
  AcceleratorTotalMemoryMiB?:
    | AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails
    | undefined;
  AcceleratorTypes?: string[] | undefined;
  BareMetal?: string | undefined;
  BaselineEbsBandwidthMbps?:
    | AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails
    | undefined;
  BurstablePerformance?: string | undefined;
  CpuManufacturers?: string[] | undefined;
  ExcludedInstanceTypes?: string[] | undefined;
  InstanceGenerations?: string[] | undefined;
  LocalStorage?: string | undefined;
  LocalStorageTypes?: string[] | undefined;
  MemoryGiBPerVCpu?:
    | AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails
    | undefined;
  MemoryMiB?: AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails | undefined;
  NetworkInterfaceCount?:
    | AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails
    | undefined;
  OnDemandMaxPricePercentageOverLowestPrice?: number | undefined;
  RequireHibernateSupport?: boolean | undefined;
  SpotMaxPricePercentageOverLowestPrice?: number | undefined;
  TotalLocalStorageGB?:
    | AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails
    | undefined;
  VCpuCount?: AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails | undefined;
}
export interface AwsEc2LaunchTemplateDataLicenseSetDetails {
  LicenseConfigurationArn?: string | undefined;
}
export type AwsEc2LaunchTemplateDataLicenseSetList = AwsEc2LaunchTemplateDataLicenseSetDetails[];
export interface AwsEc2LaunchTemplateDataMaintenanceOptionsDetails {
  AutoRecovery?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataMetadataOptionsDetails {
  HttpEndpoint?: string | undefined;
  HttpProtocolIpv6?: string | undefined;
  HttpTokens?: string | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  InstanceMetadataTags?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataMonitoringDetails {
  Enabled?: boolean | undefined;
}
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails {
  Ipv4Prefix?: string | undefined;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails {
  Ipv6Address?: string | undefined;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails {
  Ipv6Prefix?: string | undefined;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails {
  Primary?: boolean | undefined;
  PrivateIpAddress?: string | undefined;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails {
  AssociateCarrierIpAddress?: boolean | undefined;
  AssociatePublicIpAddress?: boolean | undefined;
  DeleteOnTermination?: boolean | undefined;
  Description?: string | undefined;
  DeviceIndex?: number | undefined;
  Groups?: string[] | undefined;
  InterfaceType?: string | undefined;
  Ipv4PrefixCount?: number | undefined;
  Ipv4Prefixes?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails[] | undefined;
  Ipv6AddressCount?: number | undefined;
  Ipv6Addresses?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails[] | undefined;
  Ipv6PrefixCount?: number | undefined;
  Ipv6Prefixes?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails[] | undefined;
  NetworkCardIndex?: number | undefined;
  NetworkInterfaceId?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PrivateIpAddresses?:
    | AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails[]
    | undefined;
  SecondaryPrivateIpAddressCount?: number | undefined;
  SubnetId?: string | undefined;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails[];
export interface AwsEc2LaunchTemplateDataPlacementDetails {
  Affinity?: string | undefined;
  AvailabilityZone?: string | undefined;
  GroupName?: string | undefined;
  HostId?: string | undefined;
  HostResourceGroupArn?: string | undefined;
  PartitionNumber?: number | undefined;
  SpreadDomain?: string | undefined;
  Tenancy?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails {
  EnableResourceNameDnsAAAARecord?: boolean | undefined;
  EnableResourceNameDnsARecord?: boolean | undefined;
  HostnameType?: string | undefined;
}
export interface AwsEc2LaunchTemplateDataDetails {
  BlockDeviceMappingSet?: AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails[] | undefined;
  CapacityReservationSpecification?:
    | AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails
    | undefined;
  CpuOptions?: AwsEc2LaunchTemplateDataCpuOptionsDetails | undefined;
  CreditSpecification?: AwsEc2LaunchTemplateDataCreditSpecificationDetails | undefined;
  DisableApiStop?: boolean | undefined;
  DisableApiTermination?: boolean | undefined;
  EbsOptimized?: boolean | undefined;
  ElasticGpuSpecificationSet?:
    | AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails[]
    | undefined;
  ElasticInferenceAcceleratorSet?:
    | AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails[]
    | undefined;
  EnclaveOptions?: AwsEc2LaunchTemplateDataEnclaveOptionsDetails | undefined;
  HibernationOptions?: AwsEc2LaunchTemplateDataHibernationOptionsDetails | undefined;
  IamInstanceProfile?: AwsEc2LaunchTemplateDataIamInstanceProfileDetails | undefined;
  ImageId?: string | undefined;
  InstanceInitiatedShutdownBehavior?: string | undefined;
  InstanceMarketOptions?: AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails | undefined;
  InstanceRequirements?: AwsEc2LaunchTemplateDataInstanceRequirementsDetails | undefined;
  InstanceType?: string | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  LicenseSet?: AwsEc2LaunchTemplateDataLicenseSetDetails[] | undefined;
  MaintenanceOptions?: AwsEc2LaunchTemplateDataMaintenanceOptionsDetails | undefined;
  MetadataOptions?: AwsEc2LaunchTemplateDataMetadataOptionsDetails | undefined;
  Monitoring?: AwsEc2LaunchTemplateDataMonitoringDetails | undefined;
  NetworkInterfaceSet?: AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails[] | undefined;
  Placement?: AwsEc2LaunchTemplateDataPlacementDetails | undefined;
  PrivateDnsNameOptions?: AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails | undefined;
  RamDiskId?: string | undefined;
  SecurityGroupIdSet?: string[] | undefined;
  SecurityGroupSet?: string[] | undefined;
  UserData?: string | undefined;
}
export interface AwsEc2LaunchTemplateDetails {
  LaunchTemplateName?: string | undefined;
  Id?: string | undefined;
  LaunchTemplateData?: AwsEc2LaunchTemplateDataDetails | undefined;
  DefaultVersionNumber?: number | undefined;
  LatestVersionNumber?: number | undefined;
}
export interface AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails {
  MinimumInstanceMetadataServiceVersion?: string | undefined;
}
export interface AwsSageMakerNotebookInstanceDetails {
  AcceleratorTypes?: string[] | undefined;
  AdditionalCodeRepositories?: string[] | undefined;
  DefaultCodeRepository?: string | undefined;
  DirectInternetAccess?: string | undefined;
  FailureReason?: string | undefined;
  InstanceMetadataServiceConfiguration?:
    | AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails
    | undefined;
  InstanceType?: string | undefined;
  KmsKeyId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  NotebookInstanceArn?: string | undefined;
  NotebookInstanceLifecycleConfigName?: string | undefined;
  NotebookInstanceName?: string | undefined;
  NotebookInstanceStatus?: string | undefined;
  PlatformIdentifier?: string | undefined;
  RoleArn?: string | undefined;
  RootAccess?: string | undefined;
  SecurityGroups?: string[] | undefined;
  SubnetId?: string | undefined;
  Url?: string | undefined;
  VolumeSizeInGB?: number | undefined;
}
export interface AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails {
  ImmunityTime?: number | undefined;
}
export interface AwsWafv2WebAclCaptchaConfigDetails {
  ImmunityTimeProperty?: AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails | undefined;
}
export interface AwsWafv2CustomHttpHeader {
  Name?: string | undefined;
  Value?: string | undefined;
}
export type AwsWafv2InsertHeadersList = AwsWafv2CustomHttpHeader[];
export interface AwsWafv2CustomRequestHandlingDetails {
  InsertHeaders?: AwsWafv2CustomHttpHeader[] | undefined;
}
export interface AwsWafv2ActionAllowDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails | undefined;
}
export interface AwsWafv2CustomResponseDetails {
  CustomResponseBodyKey?: string | undefined;
  ResponseCode?: number | undefined;
  ResponseHeaders?: AwsWafv2CustomHttpHeader[] | undefined;
}
export interface AwsWafv2ActionBlockDetails {
  CustomResponse?: AwsWafv2CustomResponseDetails | undefined;
}
export interface AwsWafv2WebAclActionDetails {
  Allow?: AwsWafv2ActionAllowDetails | undefined;
  Block?: AwsWafv2ActionBlockDetails | undefined;
}
export interface AwsWafv2RulesActionCaptchaDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails | undefined;
}
export interface AwsWafv2RulesActionCountDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails | undefined;
}
export interface AwsWafv2RulesActionDetails {
  Allow?: AwsWafv2ActionAllowDetails | undefined;
  Block?: AwsWafv2ActionBlockDetails | undefined;
  Captcha?: AwsWafv2RulesActionCaptchaDetails | undefined;
  Count?: AwsWafv2RulesActionCountDetails | undefined;
}
export interface AwsWafv2VisibilityConfigDetails {
  CloudWatchMetricsEnabled?: boolean | undefined;
  MetricName?: string | undefined;
  SampledRequestsEnabled?: boolean | undefined;
}
export interface AwsWafv2RulesDetails {
  Action?: AwsWafv2RulesActionDetails | undefined;
  Name?: string | undefined;
  OverrideAction?: string | undefined;
  Priority?: number | undefined;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails | undefined;
}
export type AwsWafv2RulesList = AwsWafv2RulesDetails[];
export interface AwsWafv2WebAclDetails {
  Name?: string | undefined;
  Arn?: string | undefined;
  ManagedbyFirewallManager?: boolean | undefined;
  Id?: string | undefined;
  Capacity?: number | undefined;
  CaptchaConfig?: AwsWafv2WebAclCaptchaConfigDetails | undefined;
  DefaultAction?: AwsWafv2WebAclActionDetails | undefined;
  Description?: string | undefined;
  Rules?: AwsWafv2RulesDetails[] | undefined;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails | undefined;
}
export interface AwsWafv2RuleGroupDetails {
  Capacity?: number | undefined;
  Description?: string | undefined;
  Id?: string | undefined;
  Name?: string | undefined;
  Arn?: string | undefined;
  Rules?: AwsWafv2RulesDetails[] | undefined;
  Scope?: string | undefined;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails | undefined;
}
export interface AssociationStateDetails {
  State?: string | undefined;
  StatusMessage?: string | undefined;
}
export interface AssociationSetDetails {
  AssociationState?: AssociationStateDetails | undefined;
  GatewayId?: string | undefined;
  Main?: boolean | undefined;
  RouteTableAssociationId?: string | undefined;
  RouteTableId?: string | undefined;
  SubnetId?: string | undefined;
}
export type AssociationSetList = AssociationSetDetails[];
export interface PropagatingVgwSetDetails {
  GatewayId?: string | undefined;
}
export type PropagatingVgwSetList = PropagatingVgwSetDetails[];
export interface RouteSetDetails {
  CarrierGatewayId?: string | undefined;
  CoreNetworkArn?: string | undefined;
  DestinationCidrBlock?: string | undefined;
  DestinationIpv6CidrBlock?: string | undefined;
  DestinationPrefixListId?: string | undefined;
  EgressOnlyInternetGatewayId?: string | undefined;
  GatewayId?: string | undefined;
  InstanceId?: string | undefined;
  InstanceOwnerId?: string | undefined;
  LocalGatewayId?: string | undefined;
  NatGatewayId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  Origin?: string | undefined;
  State?: string | undefined;
  TransitGatewayId?: string | undefined;
  VpcPeeringConnectionId?: string | undefined;
}
export type RouteSetList = RouteSetDetails[];
export interface AwsEc2RouteTableDetails {
  AssociationSet?: AssociationSetDetails[] | undefined;
  OwnerId?: string | undefined;
  PropagatingVgwSet?: PropagatingVgwSetDetails[] | undefined;
  RouteTableId?: string | undefined;
  RouteSet?: RouteSetDetails[] | undefined;
  VpcId?: string | undefined;
}
export interface AwsAmazonMqBrokerEncryptionOptionsDetails {
  KmsKeyId?: string | undefined;
  UseAwsOwnedKey?: boolean | undefined;
}
export interface AwsAmazonMqBrokerLdapServerMetadataDetails {
  Hosts?: string[] | undefined;
  RoleBase?: string | undefined;
  RoleName?: string | undefined;
  RoleSearchMatching?: string | undefined;
  RoleSearchSubtree?: boolean | undefined;
  ServiceAccountUsername?: string | undefined;
  UserBase?: string | undefined;
  UserRoleName?: string | undefined;
  UserSearchMatching?: string | undefined;
  UserSearchSubtree?: boolean | undefined;
}
export interface AwsAmazonMqBrokerLogsPendingDetails {
  Audit?: boolean | undefined;
  General?: boolean | undefined;
}
export interface AwsAmazonMqBrokerLogsDetails {
  Audit?: boolean | undefined;
  General?: boolean | undefined;
  AuditLogGroup?: string | undefined;
  GeneralLogGroup?: string | undefined;
  Pending?: AwsAmazonMqBrokerLogsPendingDetails | undefined;
}
export interface AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails {
  DayOfWeek?: string | undefined;
  TimeOfDay?: string | undefined;
  TimeZone?: string | undefined;
}
export interface AwsAmazonMqBrokerUsersDetails {
  PendingChange?: string | undefined;
  Username?: string | undefined;
}
export type AwsAmazonMqBrokerUsersList = AwsAmazonMqBrokerUsersDetails[];
export interface AwsAmazonMqBrokerDetails {
  AuthenticationStrategy?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  BrokerArn?: string | undefined;
  BrokerName?: string | undefined;
  DeploymentMode?: string | undefined;
  EncryptionOptions?: AwsAmazonMqBrokerEncryptionOptionsDetails | undefined;
  EngineType?: string | undefined;
  EngineVersion?: string | undefined;
  HostInstanceType?: string | undefined;
  BrokerId?: string | undefined;
  LdapServerMetadata?: AwsAmazonMqBrokerLdapServerMetadataDetails | undefined;
  Logs?: AwsAmazonMqBrokerLogsDetails | undefined;
  MaintenanceWindowStartTime?: AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails | undefined;
  PubliclyAccessible?: boolean | undefined;
  SecurityGroups?: string[] | undefined;
  StorageType?: string | undefined;
  SubnetIds?: string[] | undefined;
  Users?: AwsAmazonMqBrokerUsersDetails[] | undefined;
}
export interface AwsAppSyncGraphQlApiOpenIdConnectConfigDetails {
  AuthTtL?: number | undefined;
  ClientId?: string | undefined;
  IatTtL?: number | undefined;
  Issuer?: string | undefined;
}
export interface AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails {
  AuthorizerResultTtlInSeconds?: number | undefined;
  AuthorizerUri?: string | undefined;
  IdentityValidationExpression?: string | undefined;
}
export interface AwsAppSyncGraphQlApiUserPoolConfigDetails {
  AppIdClientRegex?: string | undefined;
  AwsRegion?: string | undefined;
  DefaultAction?: string | undefined;
  UserPoolId?: string | undefined;
}
export interface AwsAppSyncGraphQlApiLogConfigDetails {
  CloudWatchLogsRoleArn?: string | undefined;
  ExcludeVerboseContent?: boolean | undefined;
  FieldLogLevel?: string | undefined;
}
export interface AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails {
  AuthenticationType?: string | undefined;
  LambdaAuthorizerConfig?: AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails | undefined;
  OpenIdConnectConfig?: AwsAppSyncGraphQlApiOpenIdConnectConfigDetails | undefined;
  UserPoolConfig?: AwsAppSyncGraphQlApiUserPoolConfigDetails | undefined;
}
export type AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersList =
  AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails[];
export interface AwsAppSyncGraphQlApiDetails {
  ApiId?: string | undefined;
  Id?: string | undefined;
  OpenIdConnectConfig?: AwsAppSyncGraphQlApiOpenIdConnectConfigDetails | undefined;
  Name?: string | undefined;
  LambdaAuthorizerConfig?: AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails | undefined;
  XrayEnabled?: boolean | undefined;
  Arn?: string | undefined;
  UserPoolConfig?: AwsAppSyncGraphQlApiUserPoolConfigDetails | undefined;
  AuthenticationType?: string | undefined;
  LogConfig?: AwsAppSyncGraphQlApiLogConfigDetails | undefined;
  AdditionalAuthenticationProviders?:
    | AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails[]
    | undefined;
  WafWebAclArn?: string | undefined;
}
export interface AwsEventSchemasRegistryDetails {
  Description?: string | undefined;
  RegistryArn?: string | undefined;
  RegistryName?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesCloudTrailDetails {
  Status?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesDnsLogsDetails {
  Status?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesFlowLogsDetails {
  Status?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails {
  Status?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesKubernetesDetails {
  AuditLogs?: AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails {
  Reason?: string | undefined;
  Status?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails {
  EbsVolumes?:
    | AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails
    | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails {
  ScanEc2InstanceWithFindings?:
    | AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails
    | undefined;
  ServiceRole?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesS3LogsDetails {
  Status?: string | undefined;
}
export interface AwsGuardDutyDetectorDataSourcesDetails {
  CloudTrail?: AwsGuardDutyDetectorDataSourcesCloudTrailDetails | undefined;
  DnsLogs?: AwsGuardDutyDetectorDataSourcesDnsLogsDetails | undefined;
  FlowLogs?: AwsGuardDutyDetectorDataSourcesFlowLogsDetails | undefined;
  Kubernetes?: AwsGuardDutyDetectorDataSourcesKubernetesDetails | undefined;
  MalwareProtection?: AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails | undefined;
  S3Logs?: AwsGuardDutyDetectorDataSourcesS3LogsDetails | undefined;
}
export interface AwsGuardDutyDetectorFeaturesDetails {
  Name?: string | undefined;
  Status?: string | undefined;
}
export type AwsGuardDutyDetectorFeaturesList = AwsGuardDutyDetectorFeaturesDetails[];
export interface AwsGuardDutyDetectorDetails {
  DataSources?: AwsGuardDutyDetectorDataSourcesDetails | undefined;
  Features?: AwsGuardDutyDetectorFeaturesDetails[] | undefined;
  FindingPublishingFrequency?: string | undefined;
  ServiceRole?: string | undefined;
  Status?: string | undefined;
}
export interface AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails {
  LogGroupArn?: string | undefined;
}
export interface AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails {
  CloudWatchLogsLogGroup?:
    | AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails
    | undefined;
}
export type AwsStepFunctionStateMachineLoggingConfigurationDestinationsList =
  AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails[];
export interface AwsStepFunctionStateMachineLoggingConfigurationDetails {
  Destinations?: AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails[] | undefined;
  IncludeExecutionData?: boolean | undefined;
  Level?: string | undefined;
}
export interface AwsStepFunctionStateMachineTracingConfigurationDetails {
  Enabled?: boolean | undefined;
}
export interface AwsStepFunctionStateMachineDetails {
  Label?: string | undefined;
  LoggingConfiguration?: AwsStepFunctionStateMachineLoggingConfigurationDetails | undefined;
  Name?: string | undefined;
  RoleArn?: string | undefined;
  StateMachineArn?: string | undefined;
  Status?: string | undefined;
  TracingConfiguration?: AwsStepFunctionStateMachineTracingConfigurationDetails | undefined;
  Type?: string | undefined;
}
export interface AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails {
  EncryptionOption?: string | undefined;
  KmsKey?: string | undefined;
}
export interface AwsAthenaWorkGroupConfigurationResultConfigurationDetails {
  EncryptionConfiguration?:
    | AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails
    | undefined;
}
export interface AwsAthenaWorkGroupConfigurationDetails {
  ResultConfiguration?: AwsAthenaWorkGroupConfigurationResultConfigurationDetails | undefined;
}
export interface AwsAthenaWorkGroupDetails {
  Name?: string | undefined;
  Description?: string | undefined;
  State?: string | undefined;
  Configuration?: AwsAthenaWorkGroupConfigurationDetails | undefined;
}
export interface AwsEventsEventbusDetails {
  Arn?: string | undefined;
  Name?: string | undefined;
  Policy?: string | undefined;
}
export interface AwsDmsEndpointDetails {
  CertificateArn?: string | undefined;
  DatabaseName?: string | undefined;
  EndpointArn?: string | undefined;
  EndpointIdentifier?: string | undefined;
  EndpointType?: string | undefined;
  EngineName?: string | undefined;
  ExternalId?: string | undefined;
  ExtraConnectionAttributes?: string | undefined;
  KmsKeyId?: string | undefined;
  Port?: number | undefined;
  ServerName?: string | undefined;
  SslMode?: string | undefined;
  Username?: string | undefined;
}
export interface AwsEventsEndpointEventBusesDetails {
  EventBusArn?: string | undefined;
}
export type AwsEventsEndpointEventBusesList = AwsEventsEndpointEventBusesDetails[];
export interface AwsEventsEndpointReplicationConfigDetails {
  State?: string | undefined;
}
export interface AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails {
  HealthCheck?: string | undefined;
}
export interface AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails {
  Route?: string | undefined;
}
export interface AwsEventsEndpointRoutingConfigFailoverConfigDetails {
  Primary?: AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails | undefined;
  Secondary?: AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails | undefined;
}
export interface AwsEventsEndpointRoutingConfigDetails {
  FailoverConfig?: AwsEventsEndpointRoutingConfigFailoverConfigDetails | undefined;
}
export interface AwsEventsEndpointDetails {
  Arn?: string | undefined;
  Description?: string | undefined;
  EndpointId?: string | undefined;
  EndpointUrl?: string | undefined;
  EventBuses?: AwsEventsEndpointEventBusesDetails[] | undefined;
  Name?: string | undefined;
  ReplicationConfig?: AwsEventsEndpointReplicationConfigDetails | undefined;
  RoleArn?: string | undefined;
  RoutingConfig?: AwsEventsEndpointRoutingConfigDetails | undefined;
  State?: string | undefined;
  StateReason?: string | undefined;
}
export interface AwsDmsReplicationTaskDetails {
  CdcStartPosition?: string | undefined;
  CdcStartTime?: string | undefined;
  CdcStopPosition?: string | undefined;
  MigrationType?: string | undefined;
  Id?: string | undefined;
  ResourceIdentifier?: string | undefined;
  ReplicationInstanceArn?: string | undefined;
  ReplicationTaskIdentifier?: string | undefined;
  ReplicationTaskSettings?: string | undefined;
  SourceEndpointArn?: string | undefined;
  TableMappings?: string | undefined;
  TargetEndpointArn?: string | undefined;
  TaskData?: string | undefined;
}
export interface AwsDmsReplicationInstanceReplicationSubnetGroupDetails {
  ReplicationSubnetGroupIdentifier?: string | undefined;
}
export interface AwsDmsReplicationInstanceVpcSecurityGroupsDetails {
  VpcSecurityGroupId?: string | undefined;
}
export type AwsDmsReplicationInstanceVpcSecurityGroupsList =
  AwsDmsReplicationInstanceVpcSecurityGroupsDetails[];
export interface AwsDmsReplicationInstanceDetails {
  AllocatedStorage?: number | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  AvailabilityZone?: string | undefined;
  EngineVersion?: string | undefined;
  KmsKeyId?: string | undefined;
  MultiAZ?: boolean | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  PubliclyAccessible?: boolean | undefined;
  ReplicationInstanceClass?: string | undefined;
  ReplicationInstanceIdentifier?: string | undefined;
  ReplicationSubnetGroup?: AwsDmsReplicationInstanceReplicationSubnetGroupDetails | undefined;
  VpcSecurityGroups?: AwsDmsReplicationInstanceVpcSecurityGroupsDetails[] | undefined;
}
export interface AwsRoute53HostedZoneConfigDetails {
  Comment?: string | undefined;
}
export interface AwsRoute53HostedZoneObjectDetails {
  Id?: string | undefined;
  Name?: string | undefined;
  Config?: AwsRoute53HostedZoneConfigDetails | undefined;
}
export interface AwsRoute53HostedZoneVpcDetails {
  Id?: string | undefined;
  Region?: string | undefined;
}
export type AwsRoute53HostedZoneVpcsList = AwsRoute53HostedZoneVpcDetails[];
export type AwsRoute53HostedZoneNameServersList = string[];
export interface CloudWatchLogsLogGroupArnConfigDetails {
  CloudWatchLogsLogGroupArn?: string | undefined;
  HostedZoneId?: string | undefined;
  Id?: string | undefined;
}
export interface AwsRoute53QueryLoggingConfigDetails {
  CloudWatchLogsLogGroupArn?: CloudWatchLogsLogGroupArnConfigDetails | undefined;
}
export interface AwsRoute53HostedZoneDetails {
  HostedZone?: AwsRoute53HostedZoneObjectDetails | undefined;
  Vpcs?: AwsRoute53HostedZoneVpcDetails[] | undefined;
  NameServers?: string[] | undefined;
  QueryLoggingConfig?: AwsRoute53QueryLoggingConfigDetails | undefined;
}
export interface AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails {
  InCluster?: boolean | undefined;
  ClientBroker?: string | undefined;
}
export interface AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails {
  DataVolumeKMSKeyId?: string | undefined;
}
export interface AwsMskClusterClusterInfoEncryptionInfoDetails {
  EncryptionInTransit?:
    | AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails
    | undefined;
  EncryptionAtRest?: AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails | undefined;
}
export interface AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails {
  Enabled?: boolean | undefined;
}
export interface AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails {
  Enabled?: boolean | undefined;
}
export interface AwsMskClusterClusterInfoClientAuthenticationSaslDetails {
  Iam?: AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails | undefined;
  Scram?: AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails | undefined;
}
export interface AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails {
  Enabled?: boolean | undefined;
}
export interface AwsMskClusterClusterInfoClientAuthenticationTlsDetails {
  CertificateAuthorityArnList?: string[] | undefined;
  Enabled?: boolean | undefined;
}
export interface AwsMskClusterClusterInfoClientAuthenticationDetails {
  Sasl?: AwsMskClusterClusterInfoClientAuthenticationSaslDetails | undefined;
  Unauthenticated?: AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails | undefined;
  Tls?: AwsMskClusterClusterInfoClientAuthenticationTlsDetails | undefined;
}
export interface AwsMskClusterClusterInfoDetails {
  EncryptionInfo?: AwsMskClusterClusterInfoEncryptionInfoDetails | undefined;
  CurrentVersion?: string | undefined;
  NumberOfBrokerNodes?: number | undefined;
  ClusterName?: string | undefined;
  ClientAuthentication?: AwsMskClusterClusterInfoClientAuthenticationDetails | undefined;
  EnhancedMonitoring?: string | undefined;
}
export interface AwsMskClusterDetails {
  ClusterInfo?: AwsMskClusterClusterInfoDetails | undefined;
}
export interface AwsS3AccessPointVpcConfigurationDetails {
  VpcId?: string | undefined;
}
export interface AwsS3AccessPointDetails {
  AccessPointArn?: string | undefined;
  Alias?: string | undefined;
  Bucket?: string | undefined;
  BucketAccountId?: string | undefined;
  Name?: string | undefined;
  NetworkOrigin?: string | undefined;
  PublicAccessBlockConfiguration?: AwsS3AccountPublicAccessBlockDetails | undefined;
  VpcConfiguration?: AwsS3AccessPointVpcConfigurationDetails | undefined;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails {
  DirectoryId?: string | undefined;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails {
  ClientRootCertificateChain?: string | undefined;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails {
  SamlProviderArn?: string | undefined;
  SelfServiceSamlProviderArn?: string | undefined;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsDetails {
  Type?: string | undefined;
  ActiveDirectory?: AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails | undefined;
  MutualAuthentication?:
    | AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails
    | undefined;
  FederatedAuthentication?:
    | AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails
    | undefined;
}
export type AwsEc2ClientVpnEndpointAuthenticationOptionsList =
  AwsEc2ClientVpnEndpointAuthenticationOptionsDetails[];
export interface AwsEc2ClientVpnEndpointConnectionLogOptionsDetails {
  Enabled?: boolean | undefined;
  CloudwatchLogGroup?: string | undefined;
  CloudwatchLogStream?: string | undefined;
}
export interface AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails {
  Code?: string | undefined;
  Message?: string | undefined;
}
export interface AwsEc2ClientVpnEndpointClientConnectOptionsDetails {
  Enabled?: boolean | undefined;
  LambdaFunctionArn?: string | undefined;
  Status?: AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails | undefined;
}
export interface AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails {
  Enabled?: boolean | undefined;
  BannerText?: string | undefined;
}
export interface AwsEc2ClientVpnEndpointDetails {
  ClientVpnEndpointId?: string | undefined;
  Description?: string | undefined;
  ClientCidrBlock?: string | undefined;
  DnsServer?: string[] | undefined;
  SplitTunnel?: boolean | undefined;
  TransportProtocol?: string | undefined;
  VpnPort?: number | undefined;
  ServerCertificateArn?: string | undefined;
  AuthenticationOptions?: AwsEc2ClientVpnEndpointAuthenticationOptionsDetails[] | undefined;
  ConnectionLogOptions?: AwsEc2ClientVpnEndpointConnectionLogOptionsDetails | undefined;
  SecurityGroupIdSet?: string[] | undefined;
  VpcId?: string | undefined;
  SelfServicePortalUrl?: string | undefined;
  ClientConnectOptions?: AwsEc2ClientVpnEndpointClientConnectOptionsDetails | undefined;
  SessionTimeoutHours?: number | undefined;
  ClientLoginBannerOptions?: AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails | undefined;
}
export interface CodeRepositoryDetails {
  ProviderType?: string | undefined;
  ProjectName?: string | undefined;
  CodeSecurityIntegrationArn?: string | undefined;
}
export type AzureResourceDetails = unknown;
export interface ResourceDetails {
  AwsAutoScalingAutoScalingGroup?: AwsAutoScalingAutoScalingGroupDetails | undefined;
  AwsCodeBuildProject?: AwsCodeBuildProjectDetails | undefined;
  AwsCloudFrontDistribution?: AwsCloudFrontDistributionDetails | undefined;
  AwsEc2Instance?: AwsEc2InstanceDetails | undefined;
  AwsEc2NetworkInterface?: AwsEc2NetworkInterfaceDetails | undefined;
  AwsEc2SecurityGroup?: AwsEc2SecurityGroupDetails | undefined;
  AwsEc2Volume?: AwsEc2VolumeDetails | undefined;
  AwsEc2Vpc?: AwsEc2VpcDetails | undefined;
  AwsEc2Eip?: AwsEc2EipDetails | undefined;
  AwsEc2Subnet?: AwsEc2SubnetDetails | undefined;
  AwsEc2NetworkAcl?: AwsEc2NetworkAclDetails | undefined;
  AwsElbv2LoadBalancer?: AwsElbv2LoadBalancerDetails | undefined;
  AwsElasticBeanstalkEnvironment?: AwsElasticBeanstalkEnvironmentDetails | undefined;
  AwsElasticsearchDomain?: AwsElasticsearchDomainDetails | undefined;
  AwsS3Bucket?: AwsS3BucketDetails | undefined;
  AwsS3AccountPublicAccessBlock?: AwsS3AccountPublicAccessBlockDetails | undefined;
  AwsS3Object?: AwsS3ObjectDetails | undefined;
  AwsSecretsManagerSecret?: AwsSecretsManagerSecretDetails | undefined;
  AwsIamAccessKey?: AwsIamAccessKeyDetails | undefined;
  AwsIamUser?: AwsIamUserDetails | undefined;
  AwsIamPolicy?: AwsIamPolicyDetails | undefined;
  AwsApiGatewayV2Stage?: AwsApiGatewayV2StageDetails | undefined;
  AwsApiGatewayV2Api?: AwsApiGatewayV2ApiDetails | undefined;
  AwsDynamoDbTable?: AwsDynamoDbTableDetails | undefined;
  AwsApiGatewayStage?: AwsApiGatewayStageDetails | undefined;
  AwsApiGatewayRestApi?: AwsApiGatewayRestApiDetails | undefined;
  AwsCloudTrailTrail?: AwsCloudTrailTrailDetails | undefined;
  AwsSsmPatchCompliance?: AwsSsmPatchComplianceDetails | undefined;
  AwsCertificateManagerCertificate?: AwsCertificateManagerCertificateDetails | undefined;
  AwsRedshiftCluster?: AwsRedshiftClusterDetails | undefined;
  AwsElbLoadBalancer?: AwsElbLoadBalancerDetails | undefined;
  AwsIamGroup?: AwsIamGroupDetails | undefined;
  AwsIamRole?: AwsIamRoleDetails | undefined;
  AwsKmsKey?: AwsKmsKeyDetails | undefined;
  AwsLambdaFunction?: AwsLambdaFunctionDetails | undefined;
  AwsLambdaLayerVersion?: AwsLambdaLayerVersionDetails | undefined;
  AwsRdsDbInstance?: AwsRdsDbInstanceDetails | undefined;
  AwsSnsTopic?: AwsSnsTopicDetails | undefined;
  AwsSqsQueue?: AwsSqsQueueDetails | undefined;
  AwsWafWebAcl?: AwsWafWebAclDetails | undefined;
  AwsRdsDbSnapshot?: AwsRdsDbSnapshotDetails | undefined;
  AwsRdsDbClusterSnapshot?: AwsRdsDbClusterSnapshotDetails | undefined;
  AwsRdsDbCluster?: AwsRdsDbClusterDetails | undefined;
  AwsEcsCluster?: AwsEcsClusterDetails | undefined;
  AwsEcsContainer?: AwsEcsContainerDetails | undefined;
  AwsEcsTaskDefinition?: AwsEcsTaskDefinitionDetails | undefined;
  Container?: ContainerDetails | undefined;
  Other?: { [key: string]: string | undefined } | undefined;
  AwsRdsEventSubscription?: AwsRdsEventSubscriptionDetails | undefined;
  AwsEcsService?: AwsEcsServiceDetails | undefined;
  AwsAutoScalingLaunchConfiguration?: AwsAutoScalingLaunchConfigurationDetails | undefined;
  AwsEc2VpnConnection?: AwsEc2VpnConnectionDetails | undefined;
  AwsEcrContainerImage?: AwsEcrContainerImageDetails | undefined;
  AwsOpenSearchServiceDomain?: AwsOpenSearchServiceDomainDetails | undefined;
  AwsEc2VpcEndpointService?: AwsEc2VpcEndpointServiceDetails | undefined;
  AwsXrayEncryptionConfig?: AwsXrayEncryptionConfigDetails | undefined;
  AwsWafRateBasedRule?: AwsWafRateBasedRuleDetails | undefined;
  AwsWafRegionalRateBasedRule?: AwsWafRegionalRateBasedRuleDetails | undefined;
  AwsEcrRepository?: AwsEcrRepositoryDetails | undefined;
  AwsEksCluster?: AwsEksClusterDetails | undefined;
  AwsNetworkFirewallFirewallPolicy?: AwsNetworkFirewallFirewallPolicyDetails | undefined;
  AwsNetworkFirewallFirewall?: AwsNetworkFirewallFirewallDetails | undefined;
  AwsNetworkFirewallRuleGroup?: AwsNetworkFirewallRuleGroupDetails | undefined;
  AwsRdsDbSecurityGroup?: AwsRdsDbSecurityGroupDetails | undefined;
  AwsKinesisStream?: AwsKinesisStreamDetails | undefined;
  AwsEc2TransitGateway?: AwsEc2TransitGatewayDetails | undefined;
  AwsEfsAccessPoint?: AwsEfsAccessPointDetails | undefined;
  AwsCloudFormationStack?: AwsCloudFormationStackDetails | undefined;
  AwsCloudWatchAlarm?: AwsCloudWatchAlarmDetails | undefined;
  AwsEc2VpcPeeringConnection?: AwsEc2VpcPeeringConnectionDetails | undefined;
  AwsWafRegionalRuleGroup?: AwsWafRegionalRuleGroupDetails | undefined;
  AwsWafRegionalRule?: AwsWafRegionalRuleDetails | undefined;
  AwsWafRegionalWebAcl?: AwsWafRegionalWebAclDetails | undefined;
  AwsWafRule?: AwsWafRuleDetails | undefined;
  AwsWafRuleGroup?: AwsWafRuleGroupDetails | undefined;
  AwsEcsTask?: AwsEcsTaskDetails | undefined;
  AwsBackupBackupVault?: AwsBackupBackupVaultDetails | undefined;
  AwsBackupBackupPlan?: AwsBackupBackupPlanDetails | undefined;
  AwsBackupRecoveryPoint?: AwsBackupRecoveryPointDetails | undefined;
  AwsEc2LaunchTemplate?: AwsEc2LaunchTemplateDetails | undefined;
  AwsSageMakerNotebookInstance?: AwsSageMakerNotebookInstanceDetails | undefined;
  AwsWafv2WebAcl?: AwsWafv2WebAclDetails | undefined;
  AwsWafv2RuleGroup?: AwsWafv2RuleGroupDetails | undefined;
  AwsEc2RouteTable?: AwsEc2RouteTableDetails | undefined;
  AwsAmazonMqBroker?: AwsAmazonMqBrokerDetails | undefined;
  AwsAppSyncGraphQlApi?: AwsAppSyncGraphQlApiDetails | undefined;
  AwsEventSchemasRegistry?: AwsEventSchemasRegistryDetails | undefined;
  AwsGuardDutyDetector?: AwsGuardDutyDetectorDetails | undefined;
  AwsStepFunctionStateMachine?: AwsStepFunctionStateMachineDetails | undefined;
  AwsAthenaWorkGroup?: AwsAthenaWorkGroupDetails | undefined;
  AwsEventsEventbus?: AwsEventsEventbusDetails | undefined;
  AwsDmsEndpoint?: AwsDmsEndpointDetails | undefined;
  AwsEventsEndpoint?: AwsEventsEndpointDetails | undefined;
  AwsDmsReplicationTask?: AwsDmsReplicationTaskDetails | undefined;
  AwsDmsReplicationInstance?: AwsDmsReplicationInstanceDetails | undefined;
  AwsRoute53HostedZone?: AwsRoute53HostedZoneDetails | undefined;
  AwsMskCluster?: AwsMskClusterDetails | undefined;
  AwsS3AccessPoint?: AwsS3AccessPointDetails | undefined;
  AwsEc2ClientVpnEndpoint?: AwsEc2ClientVpnEndpointDetails | undefined;
  CodeRepository?: CodeRepositoryDetails | undefined;
  AzureResource?: any | undefined;
}
export interface Resource {
  Type?: string | undefined;
  Id?: string | undefined;
  Partition?: Partition | undefined;
  Region?: string | undefined;
  Provider?: CloudProviderName | undefined;
  Owner?: ResourceOwner | undefined;
  ResourceRole?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  DataClassification?: DataClassificationDetails | undefined;
  Details?: ResourceDetails | undefined;
  ApplicationName?: string | undefined;
  ApplicationArn?: string | undefined;
}
export type ResourceList = Resource[];
export type ComplianceStatus = "PASSED" | "WARNING" | "FAILED" | "NOT_AVAILABLE" | (string & {});
export interface StatusReason {
  ReasonCode?: string | undefined;
  Description?: string | undefined;
}
export type StatusReasonsList = StatusReason[];
export interface AssociatedStandard {
  StandardsId?: string | undefined;
}
export type AssociatedStandardsList = AssociatedStandard[];
export interface SecurityControlParameter {
  Name?: string | undefined;
  Value?: string[] | undefined;
}
export type SecurityControlParametersList = SecurityControlParameter[];
export interface Compliance {
  Status?: ComplianceStatus | undefined;
  RelatedRequirements?: string[] | undefined;
  StatusReasons?: StatusReason[] | undefined;
  SecurityControlId?: string | undefined;
  AssociatedStandards?: AssociatedStandard[] | undefined;
  SecurityControlParameters?: SecurityControlParameter[] | undefined;
}
export type WorkflowState =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "DEFERRED"
  | "RESOLVED"
  | (string & {});
export interface Workflow {
  Status?: WorkflowStatus | undefined;
}
export type RecordState = "ACTIVE" | "ARCHIVED" | (string & {});
export interface Note {
  Text?: string | undefined;
  UpdatedBy?: string | undefined;
  UpdatedAt?: string | undefined;
}
export interface SoftwarePackage {
  Name?: string | undefined;
  Version?: string | undefined;
  Epoch?: string | undefined;
  Release?: string | undefined;
  Architecture?: string | undefined;
  PackageManager?: string | undefined;
  FilePath?: string | undefined;
  FixedInVersion?: string | undefined;
  Remediation?: string | undefined;
  SourceLayerHash?: string | undefined;
  SourceLayerArn?: string | undefined;
}
export type SoftwarePackageList = SoftwarePackage[];
export interface Adjustment {
  Metric?: string | undefined;
  Reason?: string | undefined;
}
export type AdjustmentList = Adjustment[];
export interface Cvss {
  Version?: string | undefined;
  BaseScore?: number | undefined;
  BaseVector?: string | undefined;
  Source?: string | undefined;
  Adjustments?: Adjustment[] | undefined;
}
export type CvssList = Cvss[];
export interface VulnerabilityVendor {
  Name?: string | undefined;
  Url?: string | undefined;
  VendorSeverity?: string | undefined;
  VendorCreatedAt?: string | undefined;
  VendorUpdatedAt?: string | undefined;
}
export type VulnerabilityFixAvailable = "YES" | "NO" | "PARTIAL" | (string & {});
export type VulnerabilityExploitAvailable = "YES" | "NO" | (string & {});
export interface CodeVulnerabilitiesFilePath {
  EndLine?: number | undefined;
  FileName?: string | undefined;
  FilePath?: string | undefined;
  StartLine?: number | undefined;
}
export interface VulnerabilityCodeVulnerabilities {
  Cwes?: string[] | undefined;
  FilePath?: CodeVulnerabilitiesFilePath | undefined;
  SourceArn?: string | undefined;
}
export type VulnerabilityCodeVulnerabilitiesList = VulnerabilityCodeVulnerabilities[];
export interface Vulnerability {
  Id?: string | undefined;
  VulnerablePackages?: SoftwarePackage[] | undefined;
  Cvss?: Cvss[] | undefined;
  RelatedVulnerabilities?: string[] | undefined;
  Vendor?: VulnerabilityVendor | undefined;
  ReferenceUrls?: string[] | undefined;
  FixAvailable?: VulnerabilityFixAvailable | undefined;
  EpssScore?: number | undefined;
  ExploitAvailable?: VulnerabilityExploitAvailable | undefined;
  LastKnownExploitAt?: string | undefined;
  CodeVulnerabilities?: VulnerabilityCodeVulnerabilities[] | undefined;
}
export type VulnerabilityList = Vulnerability[];
export interface PatchSummary {
  Id?: string | undefined;
  InstalledCount?: number | undefined;
  MissingCount?: number | undefined;
  FailedCount?: number | undefined;
  InstalledOtherCount?: number | undefined;
  InstalledRejectedCount?: number | undefined;
  InstalledPendingReboot?: number | undefined;
  OperationStartTime?: string | undefined;
  OperationEndTime?: string | undefined;
  RebootOption?: string | undefined;
  Operation?: string | undefined;
}
export interface IpOrganizationDetails {
  Asn?: number | undefined;
  AsnOrg?: string | undefined;
  Isp?: string | undefined;
  Org?: string | undefined;
}
export interface Country {
  CountryCode?: string | undefined;
  CountryName?: string | undefined;
}
export interface City {
  CityName?: string | undefined;
}
export interface GeoLocation {
  Lon?: number | undefined;
  Lat?: number | undefined;
}
export interface ActionRemoteIpDetails {
  IpAddressV4?: string | undefined;
  Organization?: IpOrganizationDetails | undefined;
  Country?: Country | undefined;
  City?: City | undefined;
  GeoLocation?: GeoLocation | undefined;
}
export interface ActionRemotePortDetails {
  Port?: number | undefined;
  PortName?: string | undefined;
}
export interface ActionLocalPortDetails {
  Port?: number | undefined;
  PortName?: string | undefined;
}
export interface NetworkConnectionAction {
  ConnectionDirection?: string | undefined;
  RemoteIpDetails?: ActionRemoteIpDetails | undefined;
  RemotePortDetails?: ActionRemotePortDetails | undefined;
  LocalPortDetails?: ActionLocalPortDetails | undefined;
  Protocol?: string | undefined;
  Blocked?: boolean | undefined;
}
export interface AwsApiCallActionDomainDetails {
  Domain?: string | undefined;
}
export interface AwsApiCallAction {
  Api?: string | undefined;
  ServiceName?: string | undefined;
  CallerType?: string | undefined;
  RemoteIpDetails?: ActionRemoteIpDetails | undefined;
  DomainDetails?: AwsApiCallActionDomainDetails | undefined;
  AffectedResources?: { [key: string]: string | undefined } | undefined;
  FirstSeen?: string | undefined;
  LastSeen?: string | undefined;
}
export interface DnsRequestAction {
  Domain?: string | undefined;
  Protocol?: string | undefined;
  Blocked?: boolean | undefined;
}
export interface ActionLocalIpDetails {
  IpAddressV4?: string | undefined;
}
export interface PortProbeDetail {
  LocalPortDetails?: ActionLocalPortDetails | undefined;
  LocalIpDetails?: ActionLocalIpDetails | undefined;
  RemoteIpDetails?: ActionRemoteIpDetails | undefined;
}
export type PortProbeDetailList = PortProbeDetail[];
export interface PortProbeAction {
  PortProbeDetails?: PortProbeDetail[] | undefined;
  Blocked?: boolean | undefined;
}
export interface Action {
  ActionType?: string | undefined;
  NetworkConnectionAction?: NetworkConnectionAction | undefined;
  AwsApiCallAction?: AwsApiCallAction | undefined;
  DnsRequestAction?: DnsRequestAction | undefined;
  PortProbeAction?: PortProbeAction | undefined;
}
export interface FindingProviderSeverity {
  Label?: SeverityLabel | undefined;
  Original?: string | undefined;
}
export interface FindingProviderFields {
  Confidence?: number | undefined;
  Criticality?: number | undefined;
  RelatedFindings?: RelatedFinding[] | undefined;
  Severity?: FindingProviderSeverity | undefined;
  Types?: string[] | undefined;
}
export interface GeneratorDetails {
  Name?: string | undefined;
  Description?: string | undefined;
  Labels?: string[] | undefined;
}
export interface UserAccount {
  Uid?: string | undefined;
  Name?: string | undefined;
}
export interface ActorUser {
  Name?: string | undefined;
  Uid?: string | undefined;
  Type?: string | undefined;
  CredentialUid?: string | undefined;
  Account?: UserAccount | undefined;
}
export type ActorSessionMfaStatus = "ENABLED" | "DISABLED" | (string & {});
export interface ActorSession {
  Uid?: string | undefined;
  MfaStatus?: ActorSessionMfaStatus | undefined;
  CreatedTime?: number | undefined;
  Issuer?: string | undefined;
}
export interface Actor {
  Id?: string | undefined;
  User?: ActorUser | undefined;
  Session?: ActorSession | undefined;
}
export type ActorsList = Actor[];
export interface NetworkGeoLocation {
  City?: string | undefined;
  Country?: string | undefined;
  Lat?: number | undefined;
  Lon?: number | undefined;
}
export interface NetworkAutonomousSystem {
  Name?: string | undefined;
  Number?: number | undefined;
}
export type ConnectionDirection = "INBOUND" | "OUTBOUND" | (string & {});
export interface NetworkConnection {
  Direction?: ConnectionDirection | undefined;
}
export interface NetworkEndpoint {
  Id?: string | undefined;
  Ip?: string | undefined;
  Domain?: string | undefined;
  Port?: number | undefined;
  Location?: NetworkGeoLocation | undefined;
  AutonomousSystem?: NetworkAutonomousSystem | undefined;
  Connection?: NetworkConnection | undefined;
}
export type NetworkEndpointsList = NetworkEndpoint[];
export interface Indicator {
  Key?: string | undefined;
  Values?: string[] | undefined;
  Title?: string | undefined;
  Type?: string | undefined;
}
export type IndicatorsList = Indicator[];
export interface Signal {
  Type?: string | undefined;
  Id?: string | undefined;
  Title?: string | undefined;
  ProductArn?: string | undefined;
  ResourceIds?: string[] | undefined;
  SignalIndicators?: Indicator[] | undefined;
  Name?: string | undefined;
  CreatedAt?: number | undefined;
  UpdatedAt?: number | undefined;
  FirstSeenAt?: number | undefined;
  LastSeenAt?: number | undefined;
  Severity?: number | undefined;
  Count?: number | undefined;
  ActorIds?: string[] | undefined;
  EndpointIds?: string[] | undefined;
}
export type SignalsList = Signal[];
export interface Sequence {
  Uid?: string | undefined;
  Actors?: Actor[] | undefined;
  Endpoints?: NetworkEndpoint[] | undefined;
  Signals?: Signal[] | undefined;
  SequenceIndicators?: Indicator[] | undefined;
}
export interface Detection {
  Sequence?: Sequence | undefined;
}
export interface AwsSecurityFinding {
  SchemaVersion?: string | undefined;
  Id?: string | undefined;
  ProductArn?: string | undefined;
  ProductName?: string | undefined;
  CompanyName?: string | undefined;
  Region?: string | undefined;
  GeneratorId?: string | undefined;
  AwsAccountId?: string | undefined;
  Types?: string[] | undefined;
  FirstObservedAt?: string | undefined;
  LastObservedAt?: string | undefined;
  CreatedAt?: string | undefined;
  UpdatedAt?: string | undefined;
  Severity?: Severity | undefined;
  Confidence?: number | undefined;
  Criticality?: number | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  Remediation?: Remediation | undefined;
  SourceUrl?: string | undefined;
  ProductFields?: { [key: string]: string | undefined } | undefined;
  UserDefinedFields?: { [key: string]: string | undefined } | undefined;
  Malware?: Malware[] | undefined;
  Network?: Network | undefined;
  NetworkPath?: NetworkPathComponent[] | undefined;
  Process?: ProcessDetails | undefined;
  Threats?: Threat[] | undefined;
  ThreatIntelIndicators?: ThreatIntelIndicator[] | undefined;
  Resources?: Resource[] | undefined;
  Compliance?: Compliance | undefined;
  VerificationState?: VerificationState | undefined;
  WorkflowState?: WorkflowState | undefined;
  Workflow?: Workflow | undefined;
  RecordState?: RecordState | undefined;
  RelatedFindings?: RelatedFinding[] | undefined;
  Note?: Note | undefined;
  Vulnerabilities?: Vulnerability[] | undefined;
  PatchSummary?: PatchSummary | undefined;
  Action?: Action | undefined;
  FindingProviderFields?: FindingProviderFields | undefined;
  Sample?: boolean | undefined;
  GeneratorDetails?: GeneratorDetails | undefined;
  ProcessedAt?: string | undefined;
  AwsAccountName?: string | undefined;
  Detection?: Detection | undefined;
}
export type BatchImportFindingsRequestFindingList = AwsSecurityFinding[];
export interface BatchImportFindingsRequest {
  Findings?: AwsSecurityFinding[] | undefined;
}
export interface ImportFindingsError {
  Id?: string | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type ImportFindingsErrorList = ImportFindingsError[];
export interface BatchImportFindingsResponse {
  FailedCount: number;
  SuccessCount: number;
  FailedFindings?:
    | (ImportFindingsError & {
        Id: NonEmptyString;
        ErrorCode: NonEmptyString;
        ErrorMessage: NonEmptyString;
      })[]
    | undefined;
}
export interface UpdateAutomationRulesRequestItem {
  RuleArn?: string | undefined;
  RuleStatus?: RuleStatus | undefined;
  RuleOrder?: number | undefined;
  Description?: string | undefined;
  RuleName?: string | undefined;
  IsTerminal?: boolean | undefined;
  Criteria?: AutomationRulesFindingFilters | undefined;
  Actions?: AutomationRulesAction[] | undefined;
}
export type UpdateAutomationRulesRequestItemsList = UpdateAutomationRulesRequestItem[];
export interface BatchUpdateAutomationRulesRequest {
  UpdateAutomationRulesRequestItems?: UpdateAutomationRulesRequestItem[] | undefined;
}
export interface BatchUpdateAutomationRulesResponse {
  ProcessedAutomationRules?: string[] | undefined;
  UnprocessedAutomationRules?: UnprocessedAutomationRule[] | undefined;
}
export interface AwsSecurityFindingIdentifier {
  Id?: string | undefined;
  ProductArn?: string | undefined;
}
export type AwsSecurityFindingIdentifierList = AwsSecurityFindingIdentifier[];
export interface BatchUpdateFindingsRequest {
  FindingIdentifiers?: AwsSecurityFindingIdentifier[] | undefined;
  Note?: NoteUpdate | undefined;
  Severity?: SeverityUpdate | undefined;
  VerificationState?: VerificationState | undefined;
  Confidence?: number | undefined;
  Criticality?: number | undefined;
  Types?: string[] | undefined;
  UserDefinedFields?: { [key: string]: string | undefined } | undefined;
  Workflow?: WorkflowUpdate | undefined;
  RelatedFindings?: RelatedFinding[] | undefined;
}
export interface BatchUpdateFindingsUnprocessedFinding {
  FindingIdentifier?: AwsSecurityFindingIdentifier | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type BatchUpdateFindingsUnprocessedFindingsList = BatchUpdateFindingsUnprocessedFinding[];
export interface BatchUpdateFindingsResponse {
  ProcessedFindings: (AwsSecurityFindingIdentifier & {
    Id: NonEmptyString;
    ProductArn: NonEmptyString;
  })[];
  UnprocessedFindings: (BatchUpdateFindingsUnprocessedFinding & {
    FindingIdentifier: AwsSecurityFindingIdentifier & {
      Id: NonEmptyString;
      ProductArn: NonEmptyString;
    };
    ErrorCode: NonEmptyString;
    ErrorMessage: NonEmptyString;
  })[];
}
export type MetadataUidList = string[];
export interface OcsfFindingIdentifier {
  CloudAccountUid?: string | undefined;
  FindingInfoUid?: string | undefined;
  MetadataProductUid?: string | undefined;
}
export type OcsfFindingIdentifierList = OcsfFindingIdentifier[];
export interface BatchUpdateFindingsV2Request {
  MetadataUids?: string[] | undefined;
  FindingIdentifiers?: OcsfFindingIdentifier[] | undefined;
  Comment?: string | undefined;
  SeverityId?: number | undefined;
  StatusId?: number | undefined;
}
export interface BatchUpdateFindingsV2ProcessedFinding {
  FindingIdentifier?: OcsfFindingIdentifier | undefined;
  MetadataUid?: string | undefined;
}
export type BatchUpdateFindingsV2ProcessedFindingsList = BatchUpdateFindingsV2ProcessedFinding[];
export type BatchUpdateFindingsV2UnprocessedFindingErrorCode =
  | "ResourceNotFoundException"
  | "ValidationException"
  | "InternalServerException"
  | "ConflictException"
  | (string & {});
export interface BatchUpdateFindingsV2UnprocessedFinding {
  FindingIdentifier?: OcsfFindingIdentifier | undefined;
  MetadataUid?: string | undefined;
  ErrorCode?: BatchUpdateFindingsV2UnprocessedFindingErrorCode | undefined;
  ErrorMessage?: string | undefined;
}
export type BatchUpdateFindingsV2UnprocessedFindingsList =
  BatchUpdateFindingsV2UnprocessedFinding[];
export interface BatchUpdateFindingsV2Response {
  ProcessedFindings: (BatchUpdateFindingsV2ProcessedFinding & {
    FindingIdentifier: OcsfFindingIdentifier & {
      CloudAccountUid: NonEmptyString;
      FindingInfoUid: NonEmptyString;
      MetadataProductUid: NonEmptyString;
    };
  })[];
  UnprocessedFindings: (BatchUpdateFindingsV2UnprocessedFinding & {
    FindingIdentifier: OcsfFindingIdentifier & {
      CloudAccountUid: NonEmptyString;
      FindingInfoUid: NonEmptyString;
      MetadataProductUid: NonEmptyString;
    };
  })[];
}
export interface StandardsControlAssociationUpdate {
  StandardsArn?: string | undefined;
  SecurityControlId?: string | undefined;
  AssociationStatus?: AssociationStatus | undefined;
  UpdatedReason?: string | undefined;
}
export type StandardsControlAssociationUpdates = StandardsControlAssociationUpdate[];
export interface BatchUpdateStandardsControlAssociationsRequest {
  StandardsControlAssociationUpdates?: StandardsControlAssociationUpdate[] | undefined;
}
export interface UnprocessedStandardsControlAssociationUpdate {
  StandardsControlAssociationUpdate?: StandardsControlAssociationUpdate | undefined;
  ErrorCode?: UnprocessedErrorCode | undefined;
  ErrorReason?: string | undefined;
}
export type UnprocessedStandardsControlAssociationUpdates =
  UnprocessedStandardsControlAssociationUpdate[];
export interface BatchUpdateStandardsControlAssociationsResponse {
  UnprocessedAssociationUpdates?:
    | (UnprocessedStandardsControlAssociationUpdate & {
        StandardsControlAssociationUpdate: StandardsControlAssociationUpdate & {
          StandardsArn: NonEmptyString;
          SecurityControlId: NonEmptyString;
          AssociationStatus: AssociationStatus;
        };
        ErrorCode: UnprocessedErrorCode;
      })[]
    | undefined;
}
export type ExportJobId = string;
export interface CancelExportJobV2Request {
  ExportJobId: string;
}
export type ExportStatus = "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
export interface CancelExportJobV2Response {
  ExportJobId: string;
  Status: ExportStatus;
}
export interface CreateActionTargetRequest {
  Name?: string | undefined;
  Description?: string | undefined;
  Id?: string | undefined;
}
export interface CreateActionTargetResponse {
  ActionTargetArn: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateAggregatorV2Request {
  RegionLinkingMode?: string | undefined;
  LinkedRegions?: string[] | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export interface CreateAggregatorV2Response {
  AggregatorV2Arn?: string | undefined;
  AggregationRegion?: string | undefined;
  RegionLinkingMode?: string | undefined;
  LinkedRegions?: string[] | undefined;
}
export interface CreateAutomationRuleRequest {
  Tags?: { [key: string]: string | undefined } | undefined;
  RuleStatus?: RuleStatus | undefined;
  RuleOrder?: number | undefined;
  RuleName?: string | undefined;
  Description?: string | undefined;
  IsTerminal?: boolean | undefined;
  Criteria?: AutomationRulesFindingFilters | undefined;
  Actions?: AutomationRulesAction[] | undefined;
}
export interface CreateAutomationRuleResponse {
  RuleArn?: string | undefined;
}
export type RuleStatusV2 = "ENABLED" | "DISABLED" | (string & {});
export type RuleOrderValueV2 = number;
export type OcsfStringField =
  | "metadata.uid"
  | "activity_name"
  | "cloud.account.uid"
  | "cloud.provider"
  | "cloud.region"
  | "compliance.assessments.category"
  | "compliance.assessments.name"
  | "compliance.control"
  | "compliance.status"
  | "compliance.standards"
  | "finding_info.desc"
  | "finding_info.src_url"
  | "finding_info.title"
  | "finding_info.types"
  | "finding_info.uid"
  | "finding_info.related_events.traits.category"
  | "finding_info.related_events.uid"
  | "finding_info.related_events.product.uid"
  | "finding_info.related_events.title"
  | "impact"
  | "likelihood"
  | "metadata.product.name"
  | "metadata.product.uid"
  | "metadata.product.vendor_name"
  | "remediation.desc"
  | "remediation.references"
  | "resources.cloud_partition"
  | "resources.criticality"
  | "resources.name"
  | "resources.owner.account.uid"
  | "resources.owner.org.uid"
  | "resources.owner.account.name"
  | "resources.provider"
  | "resources.region"
  | "resources.type"
  | "resources.uid"
  | "severity"
  | "status"
  | "comment"
  | "vulnerabilities.fix_coverage"
  | "class_name"
  | "databucket.encryption_details.algorithm"
  | "databucket.encryption_details.key_uid"
  | "databucket.file.data_classifications.classifier_details.type"
  | "evidences.actor.user.account.uid"
  | "evidences.api.operation"
  | "evidences.api.response.error_message"
  | "evidences.api.service.name"
  | "evidences.connection_info.direction"
  | "evidences.connection_info.protocol_name"
  | "evidences.dst_endpoint.autonomous_system.name"
  | "evidences.dst_endpoint.location.city"
  | "evidences.dst_endpoint.location.country"
  | "evidences.src_endpoint.autonomous_system.name"
  | "evidences.src_endpoint.hostname"
  | "evidences.src_endpoint.location.city"
  | "evidences.src_endpoint.location.country"
  | "finding_info.analytic.name"
  | "malware.name"
  | "malware_scan_info.uid"
  | "malware.severity"
  | "resources.cloud_function.layers.uid_alt"
  | "resources.cloud_function.runtime"
  | "resources.cloud_function.user.uid"
  | "resources.device.encryption_details.key_uid"
  | "resources.device.image.uid"
  | "resources.image.architecture"
  | "resources.image.registry_uid"
  | "resources.image.repository_name"
  | "resources.image.uid"
  | "resources.subnet_info.uid"
  | "resources.vpc_uid"
  | "vulnerabilities.affected_code.file.path"
  | "vulnerabilities.affected_packages.name"
  | "vulnerabilities.cve.epss.score"
  | "vulnerabilities.cve.uid"
  | "vulnerabilities.related_vulnerabilities"
  | "cloud.account.name"
  | "vendor_attributes.severity"
  | (string & {});
export interface OcsfStringFilter {
  FieldName?: OcsfStringField | undefined;
  Filter?: StringFilter | undefined;
}
export type OcsfStringFilterList = OcsfStringFilter[];
export type OcsfDateField =
  | "finding_info.created_time_dt"
  | "finding_info.first_seen_time_dt"
  | "finding_info.last_seen_time_dt"
  | "finding_info.modified_time_dt"
  | "resources.image.created_time_dt"
  | "resources.image.last_used_time_dt"
  | "resources.modified_time_dt"
  | (string & {});
export interface OcsfDateFilter {
  FieldName?: OcsfDateField | undefined;
  Filter?: DateFilter | undefined;
}
export type OcsfDateFilterList = OcsfDateFilter[];
export type OcsfBooleanField =
  | "compliance.assessments.meets_criteria"
  | "vulnerabilities.is_exploit_available"
  | "vulnerabilities.is_fix_available"
  | (string & {});
export interface BooleanFilter {
  Value?: boolean | undefined;
}
export interface OcsfBooleanFilter {
  FieldName?: OcsfBooleanField | undefined;
  Filter?: BooleanFilter | undefined;
}
export type OcsfBooleanFilterList = OcsfBooleanFilter[];
export type OcsfNumberField =
  | "activity_id"
  | "compliance.status_id"
  | "confidence_score"
  | "severity_id"
  | "status_id"
  | "finding_info.related_events_count"
  | "evidences.api.response.code"
  | "evidences.dst_endpoint.autonomous_system.number"
  | "evidences.dst_endpoint.port"
  | "evidences.src_endpoint.autonomous_system.number"
  | "evidences.src_endpoint.port"
  | "resources.image.in_use_count"
  | "vulnerabilities.cve.cvss.base_score"
  | "vendor_attributes.severity_id"
  | (string & {});
export interface OcsfNumberFilter {
  FieldName?: OcsfNumberField | undefined;
  Filter?: NumberFilter | undefined;
}
export type OcsfNumberFilterList = OcsfNumberFilter[];
export type OcsfMapField =
  | "resources.tags"
  | "compliance.control_parameters"
  | "databucket.tags"
  | "finding_info.tags"
  | (string & {});
export interface OcsfMapFilter {
  FieldName?: OcsfMapField | undefined;
  Filter?: MapFilter | undefined;
}
export type OcsfMapFilterList = OcsfMapFilter[];
export type OcsfIpField = "evidences.dst_endpoint.ip" | "evidences.src_endpoint.ip" | (string & {});
export interface IpFilter {
  Cidr?: string | undefined;
}
export interface OcsfIpFilter {
  FieldName?: OcsfIpField | undefined;
  Filter?: IpFilter | undefined;
}
export type OcsfIpFilterList = OcsfIpFilter[];
export type AllowedOperators = "AND" | "OR" | (string & {});
export interface CompositeFilter {
  StringFilters?: OcsfStringFilter[] | undefined;
  DateFilters?: OcsfDateFilter[] | undefined;
  BooleanFilters?: OcsfBooleanFilter[] | undefined;
  NumberFilters?: OcsfNumberFilter[] | undefined;
  MapFilters?: OcsfMapFilter[] | undefined;
  IpFilters?: OcsfIpFilter[] | undefined;
  NestedCompositeFilters?: CompositeFilter[] | undefined;
  Operator?: AllowedOperators | undefined;
}
export type CompositeFilterList = CompositeFilter[];
export interface OcsfFindingFilters {
  CompositeFilters?: CompositeFilter[] | undefined;
  CompositeOperator?: AllowedOperators | undefined;
}
export type ResourcesStringField =
  | "ResourceGuid"
  | "ResourceId"
  | "AccountId"
  | "AccountName"
  | "Region"
  | "ResourceProvider"
  | "ResourceOwnerAccountId"
  | "ResourceOwnerOrgId"
  | "ResourceCloudPartition"
  | "ResourceRegion"
  | "ResourceCategory"
  | "ResourceType"
  | "ResourceName"
  | "FindingsSummary.FindingType"
  | "FindingsSummary.ProductName"
  | "ResourceSubCategory"
  | "DiscoveryType"
  | "ResourceInfo.AIDetails.HostResourceGuid"
  | "ResourceInfo.AIDetails.HostResourceType"
  | "ResourceInfo.AIDetails.CanonicalId"
  | "ResourceCriticality"
  | (string & {});
export interface ResourcesStringFilter {
  FieldName?: ResourcesStringField | undefined;
  Filter?: StringFilter | undefined;
}
export type ResourcesStringFilterList = ResourcesStringFilter[];
export type ResourcesDateField =
  | "ResourceDetailCaptureTime"
  | "ResourceCreationTime"
  | (string & {});
export interface ResourcesDateFilter {
  FieldName?: ResourcesDateField | undefined;
  Filter?: DateFilter | undefined;
}
export type ResourcesDateFilterList = ResourcesDateFilter[];
export type ResourcesNumberField =
  | "FindingsSummary.TotalFindings"
  | "FindingsSummary.Severities.Other"
  | "FindingsSummary.Severities.Fatal"
  | "FindingsSummary.Severities.Critical"
  | "FindingsSummary.Severities.High"
  | "FindingsSummary.Severities.Medium"
  | "FindingsSummary.Severities.Low"
  | "FindingsSummary.Severities.Informational"
  | "FindingsSummary.Severities.Unknown"
  | "ResourceInfo.AIDetails.SelfHostedAIModelResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedAIAgentResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedAIModelServingResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedAIExternalEndpointResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedAIDevelopmentResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedAIAgentFrameworkResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedAIAgentToolsAndIdentityResourceCount"
  | "ResourceInfo.AIDetails.SelfHostedTotalAIResourceCount"
  | (string & {});
export interface ResourcesNumberFilter {
  FieldName?: ResourcesNumberField | undefined;
  Filter?: NumberFilter | undefined;
}
export type ResourcesNumberFilterList = ResourcesNumberFilter[];
export type ResourcesMapField = "ResourceTags" | (string & {});
export interface ResourcesMapFilter {
  FieldName?: ResourcesMapField | undefined;
  Filter?: MapFilter | undefined;
}
export type ResourcesMapFilterList = ResourcesMapFilter[];
export interface ResourcesCompositeFilter {
  StringFilters?: ResourcesStringFilter[] | undefined;
  DateFilters?: ResourcesDateFilter[] | undefined;
  NumberFilters?: ResourcesNumberFilter[] | undefined;
  MapFilters?: ResourcesMapFilter[] | undefined;
  NestedCompositeFilters?: ResourcesCompositeFilter[] | undefined;
  Operator?: AllowedOperators | undefined;
}
export type ResourcesCompositeFilterList = ResourcesCompositeFilter[];
export interface ResourcesFilters {
  CompositeFilters?: ResourcesCompositeFilter[] | undefined;
  CompositeOperator?: AllowedOperators | undefined;
}
export type Criteria =
  | { OcsfFindingCriteria: OcsfFindingFilters; ResourceCriteria?: undefined }
  | { OcsfFindingCriteria?: undefined; ResourceCriteria: ResourcesFilters };
export type AutomationRulesActionTypeV2 =
  | "FINDING_FIELDS_UPDATE"
  | "EXTERNAL_INTEGRATION"
  | "RESOURCE_FIELDS_UPDATE"
  | (string & {});
export interface AutomationRulesFindingFieldsUpdateV2 {
  SeverityId?: number | undefined;
  Comment?: string | undefined;
  StatusId?: number | undefined;
}
export interface ExternalIntegrationConfiguration {
  ConnectorArn?: string | undefined;
}
export type ResourceCriticality =
  | "Very High"
  | "High"
  | "Medium"
  | "Low"
  | "Unknown"
  | (string & {});
export interface AutomationRulesResourceFieldsUpdateV2 {
  Criticality?: ResourceCriticality | undefined;
}
export interface AutomationRulesActionV2 {
  Type?: AutomationRulesActionTypeV2 | undefined;
  FindingFieldsUpdate?: AutomationRulesFindingFieldsUpdateV2 | undefined;
  ExternalIntegrationConfiguration?: ExternalIntegrationConfiguration | undefined;
  ResourceFieldsUpdate?: AutomationRulesResourceFieldsUpdateV2 | undefined;
}
export type AutomationRulesActionListV2 = AutomationRulesActionV2[];
export interface CreateAutomationRuleV2Request {
  RuleName?: string | undefined;
  RuleStatus?: RuleStatusV2 | undefined;
  Description?: string | undefined;
  RuleOrder?: number | undefined;
  Criteria?: Criteria | undefined;
  Actions?: AutomationRulesActionV2[] | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export interface CreateAutomationRuleV2Response {
  RuleArn?: string | undefined;
  RuleId?: string | undefined;
}
export type EnabledStandardIdentifierList = string[];
export type EnabledSecurityControlIdentifierList = string[];
export type DisabledSecurityControlIdentifierList = string[];
export interface SecurityControlCustomParameter {
  SecurityControlId?: string | undefined;
  Parameters?: { [key: string]: ParameterConfiguration | undefined } | undefined;
}
export type SecurityControlCustomParametersList = SecurityControlCustomParameter[];
export interface SecurityControlsConfiguration {
  EnabledSecurityControlIdentifiers?: string[] | undefined;
  DisabledSecurityControlIdentifiers?: string[] | undefined;
  SecurityControlCustomParameters?: SecurityControlCustomParameter[] | undefined;
}
export interface SecurityHubPolicy {
  ServiceEnabled?: boolean | undefined;
  EnabledStandardIdentifiers?: string[] | undefined;
  SecurityControlsConfiguration?: SecurityControlsConfiguration | undefined;
}
export type Policy = { SecurityHub: SecurityHubPolicy };
export interface CreateConfigurationPolicyRequest {
  Name?: string | undefined;
  Description?: string | undefined;
  ConfigurationPolicy?: Policy | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateConfigurationPolicyResponse {
  Arn?: string | undefined;
  Id?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  UpdatedAt?: Date | undefined;
  CreatedAt?: Date | undefined;
  ConfigurationPolicy?: Policy | undefined;
}
export type ScopeType = "TENANT" | "SUBSCRIPTION" | (string & {});
export type ScopeValueList = string[];
export interface AzureScopeConfiguration {
  ScopeType?: ScopeType | undefined;
  ScopeValues?: string[] | undefined;
}
export type AzureRegionList = string[];
export interface AzureProviderConfiguration {
  AWSConfigConnectorArn?: string | undefined;
  ScopeConfiguration?: AzureScopeConfiguration | undefined;
  AzureRegions?: string[] | undefined;
}
export type CspmProviderConfiguration = { Azure: AzureProviderConfiguration };
export interface CreateConnectorRequest {
  Name?: string | undefined;
  Description?: string | undefined;
  Provider?: CspmProviderConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export type CspmConnectorStatus =
  | "CONNECTED"
  | "DEGRADED"
  | "FAILED_TO_CONNECT"
  | "UNKNOWN"
  | (string & {});
export type CspmEnablementStatus =
  | "ENABLED"
  | "PENDING_ENABLEMENT"
  | "PENDING_UPDATE"
  | "PENDING_DELETION"
  | (string & {});
export interface CreateConnectorResponse {
  ConnectorArn: string;
  ConnectorId: string;
  ConnectorStatus?: CspmConnectorStatus | undefined;
  EnablementStatus?: CspmEnablementStatus | undefined;
}
export interface JiraCloudProviderConfiguration {
  ProjectKey?: string | undefined;
}
export interface ServiceNowProviderConfiguration {
  InstanceName?: string | undefined;
  SecretArn?: string | undefined;
}
export type ProviderConfiguration =
  | { JiraCloud: JiraCloudProviderConfiguration; ServiceNow?: undefined; Azure?: undefined }
  | { JiraCloud?: undefined; ServiceNow: ServiceNowProviderConfiguration; Azure?: undefined }
  | { JiraCloud?: undefined; ServiceNow?: undefined; Azure: AzureProviderConfiguration };
export interface CreateConnectorV2Request {
  Name?: string | undefined;
  Description?: string | undefined;
  Provider?: ProviderConfiguration | undefined;
  KmsKeyArn?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export type ConnectorStatus =
  | "CONNECTED"
  | "DEGRADED"
  | "FAILED_TO_CONNECT"
  | "PENDING_AUTHORIZATION"
  | "PENDING_CONFIGURATION"
  | "UNKNOWN"
  | (string & {});
export type EnablementStatus =
  | "ENABLED"
  | "PENDING_ENABLEMENT"
  | "FAILED_TO_ENABLE"
  | "PENDING_UPDATE"
  | "FAILED_TO_UPDATE"
  | "PENDING_DELETION"
  | "FAILED_TO_DELETE"
  | (string & {});
export interface CreateConnectorV2Response {
  ConnectorArn: string;
  ConnectorId: string;
  AuthUrl?: string | undefined;
  ConnectorStatus?: ConnectorStatus | undefined;
  EnablementStatus?: EnablementStatus | undefined;
}
export interface CreateFindingAggregatorRequest {
  RegionLinkingMode?: string | undefined;
  Regions?: string[] | undefined;
}
export interface CreateFindingAggregatorResponse {
  FindingAggregatorArn?: string | undefined;
  FindingAggregationRegion?: string | undefined;
  RegionLinkingMode?: string | undefined;
  Regions?: string[] | undefined;
}
export type IpFilterList = IpFilter[];
export interface KeywordFilter {
  Value?: string | undefined;
}
export type KeywordFilterList = KeywordFilter[];
export type BooleanFilterList = BooleanFilter[];
export interface AwsSecurityFindingFilters {
  ProductArn?: StringFilter[] | undefined;
  AwsAccountId?: StringFilter[] | undefined;
  Id?: StringFilter[] | undefined;
  GeneratorId?: StringFilter[] | undefined;
  Region?: StringFilter[] | undefined;
  Type?: StringFilter[] | undefined;
  FirstObservedAt?: DateFilter[] | undefined;
  LastObservedAt?: DateFilter[] | undefined;
  CreatedAt?: DateFilter[] | undefined;
  UpdatedAt?: DateFilter[] | undefined;
  SeverityProduct?: NumberFilter[] | undefined;
  SeverityNormalized?: NumberFilter[] | undefined;
  SeverityLabel?: StringFilter[] | undefined;
  Confidence?: NumberFilter[] | undefined;
  Criticality?: NumberFilter[] | undefined;
  Title?: StringFilter[] | undefined;
  Description?: StringFilter[] | undefined;
  RecommendationText?: StringFilter[] | undefined;
  SourceUrl?: StringFilter[] | undefined;
  ProductFields?: MapFilter[] | undefined;
  ProductName?: StringFilter[] | undefined;
  CompanyName?: StringFilter[] | undefined;
  UserDefinedFields?: MapFilter[] | undefined;
  MalwareName?: StringFilter[] | undefined;
  MalwareType?: StringFilter[] | undefined;
  MalwarePath?: StringFilter[] | undefined;
  MalwareState?: StringFilter[] | undefined;
  NetworkDirection?: StringFilter[] | undefined;
  NetworkProtocol?: StringFilter[] | undefined;
  NetworkSourceIpV4?: IpFilter[] | undefined;
  NetworkSourceIpV6?: IpFilter[] | undefined;
  NetworkSourcePort?: NumberFilter[] | undefined;
  NetworkSourceDomain?: StringFilter[] | undefined;
  NetworkSourceMac?: StringFilter[] | undefined;
  NetworkDestinationIpV4?: IpFilter[] | undefined;
  NetworkDestinationIpV6?: IpFilter[] | undefined;
  NetworkDestinationPort?: NumberFilter[] | undefined;
  NetworkDestinationDomain?: StringFilter[] | undefined;
  ProcessName?: StringFilter[] | undefined;
  ProcessPath?: StringFilter[] | undefined;
  ProcessPid?: NumberFilter[] | undefined;
  ProcessParentPid?: NumberFilter[] | undefined;
  ProcessLaunchedAt?: DateFilter[] | undefined;
  ProcessTerminatedAt?: DateFilter[] | undefined;
  ThreatIntelIndicatorType?: StringFilter[] | undefined;
  ThreatIntelIndicatorValue?: StringFilter[] | undefined;
  ThreatIntelIndicatorCategory?: StringFilter[] | undefined;
  ThreatIntelIndicatorLastObservedAt?: DateFilter[] | undefined;
  ThreatIntelIndicatorSource?: StringFilter[] | undefined;
  ThreatIntelIndicatorSourceUrl?: StringFilter[] | undefined;
  ResourceType?: StringFilter[] | undefined;
  ResourceId?: StringFilter[] | undefined;
  ResourcePartition?: StringFilter[] | undefined;
  ResourceRegion?: StringFilter[] | undefined;
  ResourceTags?: MapFilter[] | undefined;
  ResourceAwsEc2InstanceType?: StringFilter[] | undefined;
  ResourceAwsEc2InstanceImageId?: StringFilter[] | undefined;
  ResourceAwsEc2InstanceIpV4Addresses?: IpFilter[] | undefined;
  ResourceAwsEc2InstanceIpV6Addresses?: IpFilter[] | undefined;
  ResourceAwsEc2InstanceKeyName?: StringFilter[] | undefined;
  ResourceAwsEc2InstanceIamInstanceProfileArn?: StringFilter[] | undefined;
  ResourceAwsEc2InstanceVpcId?: StringFilter[] | undefined;
  ResourceAwsEc2InstanceSubnetId?: StringFilter[] | undefined;
  ResourceAwsEc2InstanceLaunchedAt?: DateFilter[] | undefined;
  ResourceAwsS3BucketOwnerId?: StringFilter[] | undefined;
  ResourceAwsS3BucketOwnerName?: StringFilter[] | undefined;
  ResourceAwsIamAccessKeyUserName?: StringFilter[] | undefined;
  ResourceAwsIamAccessKeyPrincipalName?: StringFilter[] | undefined;
  ResourceAwsIamAccessKeyStatus?: StringFilter[] | undefined;
  ResourceAwsIamAccessKeyCreatedAt?: DateFilter[] | undefined;
  ResourceAwsIamUserUserName?: StringFilter[] | undefined;
  ResourceContainerName?: StringFilter[] | undefined;
  ResourceContainerImageId?: StringFilter[] | undefined;
  ResourceContainerImageName?: StringFilter[] | undefined;
  ResourceContainerLaunchedAt?: DateFilter[] | undefined;
  ResourceDetailsOther?: MapFilter[] | undefined;
  ComplianceStatus?: StringFilter[] | undefined;
  VerificationState?: StringFilter[] | undefined;
  WorkflowState?: StringFilter[] | undefined;
  WorkflowStatus?: StringFilter[] | undefined;
  RecordState?: StringFilter[] | undefined;
  RelatedFindingsProductArn?: StringFilter[] | undefined;
  RelatedFindingsId?: StringFilter[] | undefined;
  NoteText?: StringFilter[] | undefined;
  NoteUpdatedAt?: DateFilter[] | undefined;
  NoteUpdatedBy?: StringFilter[] | undefined;
  Keyword?: KeywordFilter[] | undefined;
  FindingProviderFieldsConfidence?: NumberFilter[] | undefined;
  FindingProviderFieldsCriticality?: NumberFilter[] | undefined;
  FindingProviderFieldsRelatedFindingsId?: StringFilter[] | undefined;
  FindingProviderFieldsRelatedFindingsProductArn?: StringFilter[] | undefined;
  FindingProviderFieldsSeverityLabel?: StringFilter[] | undefined;
  FindingProviderFieldsSeverityOriginal?: StringFilter[] | undefined;
  FindingProviderFieldsTypes?: StringFilter[] | undefined;
  Sample?: BooleanFilter[] | undefined;
  ComplianceSecurityControlId?: StringFilter[] | undefined;
  ComplianceAssociatedStandardsId?: StringFilter[] | undefined;
  VulnerabilitiesExploitAvailable?: StringFilter[] | undefined;
  VulnerabilitiesFixAvailable?: StringFilter[] | undefined;
  ComplianceSecurityControlParametersName?: StringFilter[] | undefined;
  ComplianceSecurityControlParametersValue?: StringFilter[] | undefined;
  AwsAccountName?: StringFilter[] | undefined;
  ResourceApplicationName?: StringFilter[] | undefined;
  ResourceApplicationArn?: StringFilter[] | undefined;
  ResourceOwnerAccountId?: StringFilter[] | undefined;
  ResourceOwnerOrgId?: StringFilter[] | undefined;
  ResourceProvider?: StringFilter[] | undefined;
}
export interface CreateInsightRequest {
  Name?: string | undefined;
  Filters?: AwsSecurityFindingFilters | undefined;
  GroupByAttribute?: string | undefined;
}
export interface CreateInsightResponse {
  InsightArn: string;
}
export type AccountId = string;
export interface AccountDetails {
  AccountId?: string | undefined;
  Email?: string | undefined;
}
export type AccountDetailsList = AccountDetails[];
export interface CreateMembersRequest {
  AccountDetails?: AccountDetails[] | undefined;
}
export interface Result {
  AccountId?: string | undefined;
  ProcessingResult?: string | undefined;
}
export type ResultList = Result[];
export interface CreateMembersResponse {
  UnprocessedAccounts?: Result[] | undefined;
}
export type TicketCreationMode = "DRYRUN" | (string & {});
export interface CreateTicketV2Request {
  ConnectorId?: string | undefined;
  FindingMetadataUid?: string | undefined;
  ClientToken?: string | undefined;
  Mode?: TicketCreationMode | undefined;
}
export interface CreateTicketV2Response {
  TicketId: string;
  TicketSrcUrl?: string | undefined;
}
export type AccountIdList = string[];
export interface DeclineInvitationsRequest {
  AccountIds?: string[] | undefined;
}
export interface DeclineInvitationsResponse {
  UnprocessedAccounts?: Result[] | undefined;
}
export interface DeleteActionTargetRequest {
  ActionTargetArn: string;
}
export interface DeleteActionTargetResponse {
  ActionTargetArn: string;
}
export interface DeleteAggregatorV2Request {
  AggregatorV2Arn: string;
}
export interface DeleteAggregatorV2Response {}
export interface DeleteAutomationRuleV2Request {
  Identifier: string;
}
export interface DeleteAutomationRuleV2Response {}
export interface DeleteConfigurationPolicyRequest {
  Identifier: string;
}
export interface DeleteConfigurationPolicyResponse {}
export interface DeleteConnectorRequest {
  ConnectorId: string;
}
export interface DeleteConnectorResponse {
  EnablementStatus?: CspmEnablementStatus | undefined;
}
export interface DeleteConnectorV2Request {
  ConnectorId: string;
}
export interface DeleteConnectorV2Response {
  EnablementStatus?: EnablementStatus | undefined;
}
export interface DeleteFindingAggregatorRequest {
  FindingAggregatorArn: string;
}
export interface DeleteFindingAggregatorResponse {}
export interface DeleteInsightRequest {
  InsightArn: string;
}
export interface DeleteInsightResponse {
  InsightArn: string;
}
export interface DeleteInvitationsRequest {
  AccountIds?: string[] | undefined;
}
export interface DeleteInvitationsResponse {
  UnprocessedAccounts?: Result[] | undefined;
}
export interface DeleteMembersRequest {
  AccountIds?: string[] | undefined;
}
export interface DeleteMembersResponse {
  UnprocessedAccounts?: Result[] | undefined;
}
export type ArnList = string[];
export type NextToken = string;
export type MaxResults = number;
export interface DescribeActionTargetsRequest {
  ActionTargetArns?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ActionTarget {
  ActionTargetArn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
}
export type ActionTargetList = ActionTarget[];
export interface DescribeActionTargetsResponse {
  ActionTargets: (ActionTarget & {
    ActionTargetArn: NonEmptyString;
    Name: NonEmptyString;
    Description: NonEmptyString;
  })[];
  NextToken?: string | undefined;
}
export interface DescribeHubRequest {
  HubArn?: string | undefined;
}
export type ControlFindingGenerator = "STANDARD_CONTROL" | "SECURITY_CONTROL" | (string & {});
export interface DescribeHubResponse {
  HubArn?: string | undefined;
  SubscribedAt?: string | undefined;
  AutoEnableControls?: boolean | undefined;
  ControlFindingGenerator?: ControlFindingGenerator | undefined;
}
export interface DescribeOrganizationConfigurationRequest {}
export type AutoEnableStandards = "NONE" | "DEFAULT" | (string & {});
export type OrganizationConfigurationConfigurationType = "CENTRAL" | "LOCAL" | (string & {});
export type OrganizationConfigurationStatus =
  | "PENDING"
  | "ENABLED"
  | "FAILED"
  | "DISABLED"
  | (string & {});
export interface OrganizationConfiguration {
  ConfigurationType?: OrganizationConfigurationConfigurationType | undefined;
  Status?: OrganizationConfigurationStatus | undefined;
  StatusMessage?: string | undefined;
}
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean | undefined;
  MemberAccountLimitReached?: boolean | undefined;
  AutoEnableStandards?: AutoEnableStandards | undefined;
  OrganizationConfiguration?: OrganizationConfiguration | undefined;
}
export interface DescribeProductsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  ProductArn?: string | undefined;
}
export type CategoryList = string[];
export type IntegrationType =
  | "SEND_FINDINGS_TO_SECURITY_HUB"
  | "RECEIVE_FINDINGS_FROM_SECURITY_HUB"
  | "UPDATE_FINDINGS_IN_SECURITY_HUB"
  | (string & {});
export type IntegrationTypeList = IntegrationType[];
export interface Product {
  ProductArn?: string | undefined;
  ProductName?: string | undefined;
  CompanyName?: string | undefined;
  Description?: string | undefined;
  Categories?: string[] | undefined;
  IntegrationTypes?: IntegrationType[] | undefined;
  MarketplaceUrl?: string | undefined;
  ActivationUrl?: string | undefined;
  ProductSubscriptionResourcePolicy?: string | undefined;
}
export type ProductsList = Product[];
export interface DescribeProductsResponse {
  Products: (Product & { ProductArn: NonEmptyString })[];
  NextToken?: string | undefined;
}
export interface DescribeProductsV2Request {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type IntegrationV2Type =
  | "SEND_FINDINGS_TO_SECURITY_HUB"
  | "RECEIVE_FINDINGS_FROM_SECURITY_HUB"
  | "UPDATE_FINDINGS_IN_SECURITY_HUB"
  | "EXTENDED_PLAN"
  | (string & {});
export type IntegrationV2TypeList = IntegrationV2Type[];
export interface ProductV2 {
  ProductV2Name?: string | undefined;
  CompanyName?: string | undefined;
  Description?: string | undefined;
  Categories?: string[] | undefined;
  IntegrationV2Types?: IntegrationV2Type[] | undefined;
  MarketplaceUrl?: string | undefined;
  ActivationUrl?: string | undefined;
  MarketplaceProductId?: string | undefined;
}
export type ProductsV2List = ProductV2[];
export interface DescribeProductsV2Response {
  ProductsV2: ProductV2[];
  NextToken?: string | undefined;
}
export interface DescribeSecurityHubV2Request {}
export type IsoString = string;
export type FeatureNameKey = string;
export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export interface FeatureDetail {
  FeatureStatus?: FeatureStatus | undefined;
  UpdatedAt?: Date | undefined;
}
export type Features = { [key: string]: FeatureDetail | undefined };
export interface DescribeSecurityHubV2Response {
  HubV2Arn?: string | undefined;
  SubscribedAt?: string | undefined;
  Features?: { [key: string]: FeatureDetail | undefined } | undefined;
}
export type StandardsProviders = StandardsProvider[];
export interface DescribeStandardsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Providers?: StandardsProvider[] | undefined;
}
export interface StandardsManagedBy {
  Company?: string | undefined;
  Product?: string | undefined;
}
export interface Standard {
  StandardsArn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  EnabledByDefault?: boolean | undefined;
  Provider?: StandardsProvider | undefined;
  StandardsManagedBy?: StandardsManagedBy | undefined;
}
export type Standards = Standard[];
export interface DescribeStandardsResponse {
  Standards?: Standard[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeStandardsControlsRequest {
  StandardsSubscriptionArn: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface StandardsControl {
  StandardsControlArn?: string | undefined;
  ControlStatus?: ControlStatus | undefined;
  DisabledReason?: string | undefined;
  ControlStatusUpdatedAt?: Date | undefined;
  ControlId?: string | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  RemediationUrl?: string | undefined;
  SeverityRating?: SeverityRating | undefined;
  RelatedRequirements?: string[] | undefined;
}
export type StandardsControls = StandardsControl[];
export interface DescribeStandardsControlsResponse {
  Controls?: StandardsControl[] | undefined;
  NextToken?: string | undefined;
}
export interface DisableImportFindingsForProductRequest {
  ProductSubscriptionArn: string;
}
export interface DisableImportFindingsForProductResponse {}
export type SecurityHubFeature = "SecurityHub" | "SecurityHubV2" | (string & {});
export interface DisableOrganizationAdminAccountRequest {
  AdminAccountId?: string | undefined;
  Feature?: SecurityHubFeature | undefined;
}
export interface DisableOrganizationAdminAccountResponse {}
export interface DisableSecurityHubRequest {}
export interface DisableSecurityHubResponse {}
export type FeatureName = "NETWORK_SCANNING" | (string & {});
export interface DisableSecurityHubFeatureV2Request {
  FeatureName: FeatureName;
}
export interface DisableSecurityHubFeatureV2Response {}
export interface DisableSecurityHubV2Request {}
export interface DisableSecurityHubV2Response {}
export interface DisassociateFromAdministratorAccountRequest {}
export interface DisassociateFromAdministratorAccountResponse {}
export interface DisassociateFromMasterAccountRequest {}
export interface DisassociateFromMasterAccountResponse {}
export interface DisassociateMembersRequest {
  AccountIds?: string[] | undefined;
}
export interface DisassociateMembersResponse {}
export interface EnableImportFindingsForProductRequest {
  ProductArn?: string | undefined;
}
export interface EnableImportFindingsForProductResponse {
  ProductSubscriptionArn?: string | undefined;
}
export interface EnableOrganizationAdminAccountRequest {
  AdminAccountId?: string | undefined;
  Feature?: SecurityHubFeature | undefined;
}
export interface EnableOrganizationAdminAccountResponse {
  AdminAccountId?: string | undefined;
  Feature?: SecurityHubFeature | undefined;
}
export interface EnableSecurityHubRequest {
  Tags?: { [key: string]: string | undefined } | undefined;
  EnableDefaultStandards?: boolean | undefined;
  ControlFindingGenerator?: ControlFindingGenerator | undefined;
}
export interface EnableSecurityHubResponse {}
export interface EnableSecurityHubFeatureV2Request {
  FeatureName: FeatureName;
}
export interface EnableSecurityHubFeatureV2Response {}
export interface EnableSecurityHubV2Request {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface EnableSecurityHubV2Response {
  HubV2Arn?: string | undefined;
}
export interface GenerateRecommendedPolicyV2Request {
  MetadataUid: string;
}
export interface GenerateRecommendedPolicyV2Response {}
export interface GetAdministratorAccountRequest {}
export interface Invitation {
  AccountId?: string | undefined;
  InvitationId?: string | undefined;
  InvitedAt?: Date | undefined;
  MemberStatus?: string | undefined;
}
export interface GetAdministratorAccountResponse {
  Administrator?: Invitation | undefined;
}
export interface GetAggregatorV2Request {
  AggregatorV2Arn: string;
}
export interface GetAggregatorV2Response {
  AggregatorV2Arn?: string | undefined;
  AggregationRegion?: string | undefined;
  RegionLinkingMode?: string | undefined;
  LinkedRegions?: string[] | undefined;
}
export interface GetAutomationRuleV2Request {
  Identifier: string;
}
export interface GetAutomationRuleV2Response {
  RuleArn?: string | undefined;
  RuleId?: string | undefined;
  RuleOrder?: number | undefined;
  RuleName?: string | undefined;
  RuleStatus?: RuleStatusV2 | undefined;
  Description?: string | undefined;
  Criteria?: Criteria | undefined;
  Actions?:
    | (AutomationRulesActionV2 & {
        Type: AutomationRulesActionTypeV2;
        ResourceFieldsUpdate: AutomationRulesResourceFieldsUpdateV2 & {
          Criticality: ResourceCriticality;
        };
      })[]
    | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export interface GetConfigurationPolicyRequest {
  Identifier: string;
}
export interface GetConfigurationPolicyResponse {
  Arn?: string | undefined;
  Id?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  UpdatedAt?: Date | undefined;
  CreatedAt?: Date | undefined;
  ConfigurationPolicy?: Policy | undefined;
}
export interface GetConfigurationPolicyAssociationRequest {
  Target?: Target | undefined;
}
export interface GetConfigurationPolicyAssociationResponse {
  ConfigurationPolicyId?: string | undefined;
  TargetId?: string | undefined;
  TargetType?: TargetType | undefined;
  AssociationType?: AssociationType | undefined;
  UpdatedAt?: Date | undefined;
  AssociationStatus?: ConfigurationPolicyAssociationStatus | undefined;
  AssociationStatusMessage?: string | undefined;
}
export interface GetConnectorRequest {
  ConnectorId: string;
}
export type HealthIssueCode =
  | "AUTHENTICATION_FAILURE"
  | "STREAM_AUTHORIZATION_FAILURE"
  | "DISCOVERY_FAILURE"
  | "STREAM_LIMIT_EXCEEDED"
  | "STREAM_DISCONNECTED"
  | "RECORDING_FAILURE"
  | "NO_HEALTH_DATA"
  | (string & {});
export interface HealthIssue {
  Code?: HealthIssueCode | undefined;
  Message?: string | undefined;
}
export type HealthIssueList = HealthIssue[];
export interface CspmHealthCheck {
  ConnectorStatus?: CspmConnectorStatus | undefined;
  Message?: string | undefined;
  LastCheckedAt?: Date | undefined;
  Issues?: HealthIssue[] | undefined;
}
export interface AzureDetail {
  AWSConfigConnectorArn?: string | undefined;
  ScopeConfiguration?: AzureScopeConfiguration | undefined;
  AzureRegions?: string[] | undefined;
}
export type CspmProviderDetail = { Azure: AzureDetail };
export interface GetConnectorResponse {
  ConnectorArn?: string | undefined;
  ConnectorId: string;
  Name: string;
  Description?: string | undefined;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Health: CspmHealthCheck & {
    ConnectorStatus: CspmConnectorStatus;
    LastCheckedAt: Date;
    Issues: (HealthIssue & { Code: HealthIssueCode; Message: NonEmptyString })[];
  };
  ProviderDetail: CspmProviderDetail;
  CreatedBy?: string | undefined;
  EnablementStatus?: CspmEnablementStatus | undefined;
}
export interface GetConnectorV2Request {
  ConnectorId: string;
}
export interface HealthCheck {
  ConnectorStatus?: ConnectorStatus | undefined;
  Message?: string | undefined;
  LastCheckedAt?: Date | undefined;
  Issues?: HealthIssue[] | undefined;
}
export type ConnectorAuthStatus = "ACTIVE" | "FAILED" | (string & {});
export interface JiraCloudDetail {
  CloudId?: string | undefined;
  ProjectKey?: string | undefined;
  Domain?: string | undefined;
  AuthUrl?: string | undefined;
  AuthStatus?: ConnectorAuthStatus | undefined;
}
export interface ServiceNowDetail {
  InstanceName?: string | undefined;
  SecretArn?: string | undefined;
  AuthStatus?: ConnectorAuthStatus | undefined;
}
export type ProviderDetail =
  | { JiraCloud: JiraCloudDetail; ServiceNow?: undefined; Azure?: undefined }
  | { JiraCloud?: undefined; ServiceNow: ServiceNowDetail; Azure?: undefined }
  | { JiraCloud?: undefined; ServiceNow?: undefined; Azure: AzureDetail };
export interface GetConnectorV2Response {
  ConnectorArn?: string | undefined;
  ConnectorId: string;
  Name: string;
  Description?: string | undefined;
  KmsKeyArn?: string | undefined;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Health: HealthCheck & {
    ConnectorStatus: ConnectorStatus;
    LastCheckedAt: Date;
    Issues: (HealthIssue & { Code: HealthIssueCode; Message: NonEmptyString })[];
  };
  ProviderDetail: ProviderDetail;
  EnablementStatus?: EnablementStatus | undefined;
  EnablementStatusReason?: string | undefined;
}
export interface GetEnabledStandardsRequest {
  StandardsSubscriptionArns?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Providers?: StandardsProvider[] | undefined;
}
export interface GetEnabledStandardsResponse {
  StandardsSubscriptions?:
    | (StandardsSubscription & {
        StandardsSubscriptionArn: NonEmptyString;
        StandardsArn: NonEmptyString;
        StandardsInput: StandardsInputParameterMap;
        StandardsStatus: StandardsStatus;
        StandardsStatusReason: StandardsStatusReason & { StatusReasonCode: StatusReasonCode };
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface GetExportJobV2Request {
  ExportJobId: string;
}
export type ExportName = string;
export type ExportDataType = "FINDINGS" | (string & {});
export type FindingsExportFormat = "CSV" | "OCSF_JSON" | (string & {});
export type FindingsSelectableField =
  | "metadata.uid"
  | "activity_name"
  | "cloud.account.name"
  | "cloud.account.uid"
  | "cloud.provider"
  | "cloud.region"
  | "compliance.assessments.category"
  | "compliance.assessments.name"
  | "compliance.control"
  | "compliance.status"
  | "compliance.standards"
  | "finding_info.desc"
  | "finding_info.src_url"
  | "finding_info.title"
  | "finding_info.types"
  | "finding_info.uid"
  | "finding_info.related_events.traits.category"
  | "finding_info.related_events.uid"
  | "finding_info.related_events.product.uid"
  | "finding_info.related_events.title"
  | "metadata.product.feature.uid"
  | "metadata.product.name"
  | "metadata.product.uid"
  | "metadata.product.vendor_name"
  | "remediation.desc"
  | "remediation.references"
  | "resources.cloud_partition"
  | "resources.name"
  | "resources.owner.account.uid"
  | "resources.owner.org.uid"
  | "resources.owner.account.name"
  | "resources.provider"
  | "resources.region"
  | "resources.type"
  | "resources.uid"
  | "severity"
  | "status"
  | "comment"
  | "vulnerabilities.fix_coverage"
  | "class_name"
  | "databucket.encryption_details.algorithm"
  | "databucket.encryption_details.key_uid"
  | "databucket.file.data_classifications.classifier_details.type"
  | "evidences.actor.user.account.uid"
  | "evidences.api.operation"
  | "evidences.api.response.error_message"
  | "evidences.api.service.name"
  | "evidences.connection_info.direction"
  | "evidences.connection_info.protocol_name"
  | "evidences.dst_endpoint.autonomous_system.name"
  | "evidences.dst_endpoint.location.city"
  | "evidences.dst_endpoint.location.country"
  | "evidences.src_endpoint.autonomous_system.name"
  | "evidences.src_endpoint.hostname"
  | "evidences.src_endpoint.location.city"
  | "evidences.src_endpoint.location.country"
  | "finding_info.analytic.name"
  | "malware.name"
  | "malware_scan_info.uid"
  | "malware.severity"
  | "resources.cloud_function.layers.uid_alt"
  | "resources.cloud_function.runtime"
  | "resources.cloud_function.user.uid"
  | "resources.device.encryption_details.key_uid"
  | "resources.device.image.uid"
  | "resources.image.architecture"
  | "resources.image.registry_uid"
  | "resources.image.repository_name"
  | "resources.image.uid"
  | "resources.subnet_info.uid"
  | "resources.vpc_uid"
  | "vulnerabilities.affected_code.file.path"
  | "vulnerabilities.affected_packages.name"
  | "vulnerabilities.cve.cvss.vendor_name"
  | "vulnerabilities.cve.cvss.version"
  | "vulnerabilities.cve.epss.score"
  | "vulnerabilities.cve.uid"
  | "vulnerabilities.related_vulnerabilities"
  | "vendor_attributes.severity"
  | "activity_id"
  | "compliance.status_id"
  | "confidence_score"
  | "severity_id"
  | "status_id"
  | "finding_info.related_events_count"
  | "evidences.api.response.code"
  | "evidences.dst_endpoint.autonomous_system.number"
  | "evidences.dst_endpoint.port"
  | "evidences.src_endpoint.autonomous_system.number"
  | "evidences.src_endpoint.port"
  | "resources.image.in_use_count"
  | "vulnerabilities.cve.cvss.base_score"
  | "vendor_attributes.severity_id"
  | "finding_info.created_time_dt"
  | "finding_info.first_seen_time_dt"
  | "finding_info.last_seen_time_dt"
  | "finding_info.modified_time_dt"
  | "resources.image.created_time_dt"
  | "resources.image.last_used_time_dt"
  | "resources.modified_time_dt"
  | "compliance.assessments.meets_criteria"
  | "vulnerabilities.is_exploit_available"
  | "vulnerabilities.is_fix_available"
  | "resources.tags"
  | "compliance.control_parameters"
  | "databucket.tags"
  | "finding_info.tags"
  | "evidences.dst_endpoint.ip"
  | "evidences.src_endpoint.ip"
  | (string & {});
export type FindingsSelectedFieldList = FindingsSelectableField[];
export interface FindingsOutput {
  Format?: FindingsExportFormat | undefined;
  Filters?: OcsfFindingFilters | undefined;
  SelectedFields?: FindingsSelectableField[] | undefined;
}
export type ExportOutput = { Findings: FindingsOutput };
export interface AwsOrganizationScope {
  OrganizationId?: string | undefined;
  OrganizationalUnitId?: string | undefined;
}
export type AwsOrganizationScopeList = AwsOrganizationScope[];
export interface ExportScopes {
  AwsOrganizations?: AwsOrganizationScope[] | undefined;
}
export type S3ObjectPrefix = string;
export interface S3ExportDestination {
  BucketArn?: string | undefined;
  KmsKeyArn?: string | undefined;
  ObjectPrefix?: string | undefined;
}
export type ExportDestination = { S3: S3ExportDestination };
export type ExportFailureCode =
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "INTERNAL_ERROR"
  | (string & {});
export interface GetExportJobV2Response {
  ExportJobId: string;
  Name?: string | undefined;
  Status: ExportStatus;
  DataType: ExportDataType;
  OutputConfiguration?: ExportOutput | undefined;
  Scopes?: ExportScopes | undefined;
  Destination: ExportDestination;
  FailureCode?: ExportFailureCode | undefined;
  FailureMessage?: string | undefined;
  StartedAt: Date;
  EndedAt?: Date | undefined;
}
export interface GetFindingAggregatorRequest {
  FindingAggregatorArn: string;
}
export interface GetFindingAggregatorResponse {
  FindingAggregatorArn?: string | undefined;
  FindingAggregationRegion?: string | undefined;
  RegionLinkingMode?: string | undefined;
  Regions?: string[] | undefined;
}
export interface GetFindingHistoryRequest {
  FindingIdentifier?: AwsSecurityFindingIdentifier | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type FindingHistoryUpdateSourceType =
  | "BATCH_UPDATE_FINDINGS"
  | "BATCH_IMPORT_FINDINGS"
  | (string & {});
export interface FindingHistoryUpdateSource {
  Type?: FindingHistoryUpdateSourceType | undefined;
  Identity?: string | undefined;
}
export interface FindingHistoryUpdate {
  UpdatedField?: string | undefined;
  OldValue?: string | undefined;
  NewValue?: string | undefined;
}
export type FindingHistoryUpdatesList = FindingHistoryUpdate[];
export interface FindingHistoryRecord {
  FindingIdentifier?: AwsSecurityFindingIdentifier | undefined;
  UpdateTime?: Date | undefined;
  FindingCreated?: boolean | undefined;
  UpdateSource?: FindingHistoryUpdateSource | undefined;
  Updates?: FindingHistoryUpdate[] | undefined;
  NextToken?: string | undefined;
}
export type FindingHistoryRecordList = FindingHistoryRecord[];
export interface GetFindingHistoryResponse {
  Records?:
    | (FindingHistoryRecord & {
        FindingIdentifier: AwsSecurityFindingIdentifier & {
          Id: NonEmptyString;
          ProductArn: NonEmptyString;
        };
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type SortOrder = "asc" | "desc" | (string & {});
export interface SortCriterion {
  Field?: string | undefined;
  SortOrder?: SortOrder | undefined;
}
export type SortCriteria = SortCriterion[];
export interface GetFindingsRequest {
  Filters?: AwsSecurityFindingFilters | undefined;
  SortCriteria?: SortCriterion[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type AwsSecurityFindingList = AwsSecurityFinding[];
export interface GetFindingsResponse {
  Findings: (AwsSecurityFinding & {
    SchemaVersion: NonEmptyString;
    Id: NonEmptyString;
    ProductArn: NonEmptyString;
    GeneratorId: NonEmptyString;
    AwsAccountId: NonEmptyString;
    CreatedAt: NonEmptyString;
    UpdatedAt: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    Resources: (Resource & { Type: NonEmptyString; Id: NonEmptyString })[];
    Malware: (Malware & { Name: NonEmptyString })[];
    Compliance: Compliance & { StatusReasons: (StatusReason & { ReasonCode: NonEmptyString })[] };
    RelatedFindings: (RelatedFinding & { ProductArn: NonEmptyString; Id: NonEmptyString })[];
    Note: Note & { Text: NonEmptyString; UpdatedBy: NonEmptyString; UpdatedAt: NonEmptyString };
    Vulnerabilities: (Vulnerability & {
      Id: NonEmptyString;
      Vendor: VulnerabilityVendor & { Name: NonEmptyString };
    })[];
    PatchSummary: PatchSummary & { Id: NonEmptyString };
    FindingProviderFields: FindingProviderFields & {
      RelatedFindings: (RelatedFinding & { ProductArn: NonEmptyString; Id: NonEmptyString })[];
    };
  })[];
  NextToken?: string | undefined;
}
export type GroupByField =
  | "activity_name"
  | "cloud.account.uid"
  | "cloud.provider"
  | "cloud.region"
  | "compliance.assessments.name"
  | "compliance.status"
  | "compliance.control"
  | "finding_info.title"
  | "finding_info.related_events.traits.category"
  | "finding_info.types"
  | "impact"
  | "likelihood"
  | "metadata.product.name"
  | "metadata.product.uid"
  | "resources.type"
  | "resources.cloud_partition"
  | "resources.criticality"
  | "resources.name"
  | "resources.owner.account.uid"
  | "resources.owner.org.uid"
  | "resources.owner.account.name"
  | "resources.provider"
  | "resources.region"
  | "resources.uid"
  | "severity"
  | "status"
  | "vulnerabilities.fix_coverage"
  | "class_name"
  | "vulnerabilities.affected_packages.name"
  | "finding_info.analytic.name"
  | "compliance.standards"
  | "cloud.account.name"
  | "vendor_attributes.severity"
  | "metadata.product.vendor_name"
  | (string & {});
export interface GroupByRule {
  Filters?: OcsfFindingFilters | undefined;
  GroupByField?: GroupByField | undefined;
}
export type GroupByRules = GroupByRule[];
export interface FindingScopes {
  AwsOrganizations?: AwsOrganizationScope[] | undefined;
}
export type MaxStatisticResults = number;
export interface GetFindingStatisticsV2Request {
  GroupByRules?: GroupByRule[] | undefined;
  Scopes?: FindingScopes | undefined;
  SortOrder?: SortOrder | undefined;
  MaxStatisticResults?: number | undefined;
}
export interface GroupByValue {
  FieldValue?: string | undefined;
  Count?: number | undefined;
}
export type GroupByValues = GroupByValue[];
export interface GroupByResult {
  GroupByField?: string | undefined;
  GroupByValues?: GroupByValue[] | undefined;
}
export type GroupByResults = GroupByResult[];
export interface GetFindingStatisticsV2Response {
  GroupByResults?: GroupByResult[] | undefined;
}
export type FindingsTrendsStringField =
  | "account_id"
  | "region"
  | "finding_types"
  | "finding_status"
  | "finding_cve_ids"
  | "finding_compliance_status"
  | "finding_control_id"
  | "finding_class_name"
  | "finding_provider"
  | "finding_activity_name"
  | "resource_cloud_providers"
  | "resource_regions"
  | "resource_owner_ids"
  | "resource_owner_organization_ids"
  | (string & {});
export interface FindingsTrendsStringFilter {
  FieldName?: FindingsTrendsStringField | undefined;
  Filter?: StringFilter | undefined;
}
export type FindingsTrendsStringFilterList = FindingsTrendsStringFilter[];
export interface FindingsTrendsCompositeFilter {
  StringFilters?: FindingsTrendsStringFilter[] | undefined;
  NestedCompositeFilters?: FindingsTrendsCompositeFilter[] | undefined;
  Operator?: AllowedOperators | undefined;
}
export type FindingsTrendsCompositeFilterList = FindingsTrendsCompositeFilter[];
export interface FindingsTrendsFilters {
  CompositeFilters?: FindingsTrendsCompositeFilter[] | undefined;
  CompositeOperator?: AllowedOperators | undefined;
}
export interface GetFindingsTrendsV2Request {
  Filters?: FindingsTrendsFilters | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type GranularityField = "Daily" | "Weekly" | "Monthly" | (string & {});
export type TrendsValueCount = number;
export interface SeverityTrendsCount {
  Unknown?: number | undefined;
  Informational?: number | undefined;
  Low?: number | undefined;
  Medium?: number | undefined;
  High?: number | undefined;
  Critical?: number | undefined;
  Fatal?: number | undefined;
  Other?: number | undefined;
}
export interface TrendsValues {
  SeverityTrends?: SeverityTrendsCount | undefined;
}
export interface TrendsMetricsResult {
  Timestamp?: Date | undefined;
  TrendsValues?: TrendsValues | undefined;
}
export type TrendsMetrics = TrendsMetricsResult[];
export interface GetFindingsTrendsV2Response {
  Granularity: GranularityField;
  TrendsMetrics: (TrendsMetricsResult & {
    Timestamp: Date;
    TrendsValues: TrendsValues & {
      SeverityTrends: SeverityTrendsCount & {
        Unknown: TrendsValueCount;
        Informational: TrendsValueCount;
        Low: TrendsValueCount;
        Medium: TrendsValueCount;
        High: TrendsValueCount;
        Critical: TrendsValueCount;
        Fatal: TrendsValueCount;
        Other: TrendsValueCount;
      };
    };
  })[];
  NextToken?: string | undefined;
}
export interface GetFindingsV2Request {
  Filters?: OcsfFindingFilters | undefined;
  Scopes?: FindingScopes | undefined;
  SortCriteria?: SortCriterion[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type OcsfFinding = unknown;
export type OcsfFindingsList = any[];
export interface GetFindingsV2Response {
  Findings?: any[] | undefined;
  NextToken?: string | undefined;
}
export interface GetInsightResultsRequest {
  InsightArn: string;
}
export interface InsightResultValue {
  GroupByAttributeValue?: string | undefined;
  Count?: number | undefined;
}
export type InsightResultValueList = InsightResultValue[];
export interface InsightResults {
  InsightArn?: string | undefined;
  GroupByAttribute?: string | undefined;
  ResultValues?: InsightResultValue[] | undefined;
}
export interface GetInsightResultsResponse {
  InsightResults: InsightResults & {
    InsightArn: NonEmptyString;
    GroupByAttribute: NonEmptyString;
    ResultValues: (InsightResultValue & { GroupByAttributeValue: NonEmptyString; Count: number })[];
  };
}
export interface GetInsightsRequest {
  InsightArns?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface Insight {
  InsightArn?: string | undefined;
  Name?: string | undefined;
  Filters?: AwsSecurityFindingFilters | undefined;
  GroupByAttribute?: string | undefined;
}
export type InsightList = Insight[];
export interface GetInsightsResponse {
  Insights: (Insight & {
    InsightArn: NonEmptyString;
    Name: NonEmptyString;
    Filters: AwsSecurityFindingFilters;
    GroupByAttribute: NonEmptyString;
  })[];
  NextToken?: string | undefined;
}
export interface GetInvitationsCountRequest {}
export interface GetInvitationsCountResponse {
  InvitationsCount?: number | undefined;
}
export interface GetMasterAccountRequest {}
export interface GetMasterAccountResponse {
  Master?: Invitation | undefined;
}
export interface GetMembersRequest {
  AccountIds?: string[] | undefined;
}
export interface Member {
  AccountId?: string | undefined;
  Email?: string | undefined;
  MasterId?: string | undefined;
  AdministratorId?: string | undefined;
  MemberStatus?: string | undefined;
  InvitedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type MemberList = Member[];
export interface GetMembersResponse {
  Members?: Member[] | undefined;
  UnprocessedAccounts?: Result[] | undefined;
}
export interface GetRecommendedPolicyV2Request {
  MetadataUid: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type RecommendationType = "UNUSED_PERMISSION_RECOMMENDATION" | (string & {});
export interface UnusedPermissionsRecommendationStep {
  RecommendedAction?: string | undefined;
  ExistingPolicy?: string | undefined;
  ExistingPolicyId?: string | undefined;
  PolicyUpdatedAt?: Date | undefined;
  RecommendedPolicy?: string | undefined;
}
export type RecommendationStep = { UnusedPermissions: UnusedPermissionsRecommendationStep };
export type RecommendationSteps = RecommendationStep[];
export interface RecommendationError {
  Code?: string | undefined;
  Message?: string | undefined;
}
export type RecommendationStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
export interface GetRecommendedPolicyV2Response {
  NextToken?: string | undefined;
  RecommendationType?: RecommendationType | undefined;
  RecommendationSteps?: RecommendationStep[] | undefined;
  Error?: RecommendationError | undefined;
  Status?: RecommendationStatus | undefined;
  ResourceArn?: string | undefined;
}
export type RemediationStringUid = string;
export type RemediationStringField =
  | "Resource.Type"
  | "Priority"
  | "Status"
  | "Resource.Id"
  | "Resource.ResourceOwnerAccountId"
  | "Resource.CloudProvider"
  | (string & {});
export interface RemediationStringFilterCondition {
  Value?: string | undefined;
}
export interface RemediationStringFilter {
  FieldName?: RemediationStringField | undefined;
  Filter?: RemediationStringFilterCondition | undefined;
}
export type RemediationStringFilterList = RemediationStringFilter[];
export interface RemediationCompositeFilter {
  StringFilters?: RemediationStringFilter[] | undefined;
}
export type RemediationCompositeFilterList = RemediationCompositeFilter[];
export interface RemediationFilters {
  CompositeFilters?: RemediationCompositeFilter[] | undefined;
}
export type GuidanceFormat =
  | "All"
  | "AwsCli"
  | "Cli"
  | "Python"
  | "Terraform"
  | "Cdk"
  | "CloudFormation"
  | "IaC"
  | "Template"
  | (string & {});
export interface GetRemediationsV2Request {
  TargetUid?: string | undefined;
  MetadataUid?: string | undefined;
  Filters?: RemediationFilters | undefined;
  ShowGuidance?: boolean | undefined;
  GuidanceFormat?: GuidanceFormat | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface RemediationOutcome {
  ResolvedFindingsCount?: number | undefined;
  SeverityReductionFindingsCount?: number | undefined;
  SeverityUnchangedCount?: number | undefined;
}
export type RemediationPriority = "Critical" | "High" | "Medium" | "Low" | (string & {});
export type RemediationStringList = string[];
export interface KbArticle {
  Title?: string | undefined;
  Url?: string | undefined;
}
export type KbArticleList = KbArticle[];
export interface RemediationSummaryDetail {
  Action?: string | undefined;
  Description?: string | undefined;
  IsImmediate?: boolean | undefined;
  PostRemediationSteps?: string[] | undefined;
  KbArticles?: KbArticle[] | undefined;
}
export interface RemediationResource {
  AccountId?: string | undefined;
  Region?: string | undefined;
  ResourceOwnerAccountId?: string | undefined;
  ResourceOwnerOrgId?: string | undefined;
  Type?: string | undefined;
  Name?: string | undefined;
  Id?: string | undefined;
  ResourceGuid?: string | undefined;
  ResourceRegion?: string | undefined;
  CloudProvider?: CloudProviderName | undefined;
}
export type RemediationStatus = "New" | "Updated" | "Resolved" | (string & {});
export interface RemediationTrait {
  Type?: string | undefined;
  Title?: string | undefined;
}
export interface RemediationGuidanceContext {
  ProblemStatement?: string | undefined;
  RiskAssessment?: string | undefined;
  AffectedScope?: string | undefined;
  Prerequisites?: string[] | undefined;
}
export interface RemediationParameter {
  Name?: string | undefined;
  Type?: string | undefined;
  Description?: string | undefined;
  Required?: boolean | undefined;
}
export type RemediationParameterList = RemediationParameter[];
export interface RemediationStep {
  Phase?: string | undefined;
  Description?: string | undefined;
  Service?: string | undefined;
  Action?: string | undefined;
  Logic?: string | undefined;
  Inverse?: string | undefined;
  VerifyAfter?: string | undefined;
}
export type RemediationStepList = RemediationStep[];
export interface RemediationGuidanceSpecification {
  Parameters?: RemediationParameter[] | undefined;
  Steps?: RemediationStep[] | undefined;
  ExpectedEndState?: string | undefined;
  RequiredPermissions?: string[] | undefined;
}
export interface RemediationGuidanceExamples {
  AwsCli?: string | undefined;
  Cli?: string | undefined;
  Python?: string | undefined;
  Terraform?: string | undefined;
  Cdk?: string | undefined;
  CloudFormation?: string | undefined;
  IaC?: string | undefined;
  Template?: string | undefined;
}
export interface RemediationGuidanceMetadata {
  ResourceType?: string | undefined;
  ExposureType?: string | undefined;
  TraitTitles?: string[] | undefined;
  Reversibility?: string | undefined;
  FixEffect?: string | undefined;
  RiskLevel?: string | undefined;
  AutomationLevel?: string | undefined;
  HumanReviewRequired?: boolean | undefined;
  GeneratedAt?: Date | undefined;
  VerificationStatus?: string | undefined;
}
export interface RemediationGuidance {
  TargetTypeName?: string | undefined;
  Pattern?: string | undefined;
  Version?: string | undefined;
  Context?: RemediationGuidanceContext | undefined;
  Specification?: RemediationGuidanceSpecification | undefined;
  Examples?: RemediationGuidanceExamples | undefined;
  Metadata?: RemediationGuidanceMetadata | undefined;
}
export interface RemediationV2Item {
  TargetUid?: string | undefined;
  Outcome?: RemediationOutcome | undefined;
  Priority?: RemediationPriority | undefined;
  RemediationSummary?: RemediationSummaryDetail | undefined;
  Resource?: RemediationResource | undefined;
  Status?: RemediationStatus | undefined;
  Trait?: RemediationTrait | undefined;
  Guidance?: RemediationGuidance | undefined;
  UpdatedAt?: Date | undefined;
}
export type RemediationV2ItemList = RemediationV2Item[];
export interface GetRemediationsV2Response {
  Items: (RemediationV2Item & {
    TargetUid: NonEmptyString;
    Outcome: RemediationOutcome & {
      ResolvedFindingsCount: number;
      SeverityReductionFindingsCount: number;
      SeverityUnchangedCount: number;
    };
    Priority: RemediationPriority;
    RemediationSummary: RemediationSummaryDetail & {
      Action: NonEmptyString;
      IsImmediate: boolean;
      KbArticles: (KbArticle & { Title: NonEmptyString; Url: NonEmptyString })[];
    };
    Resource: RemediationResource & {
      AccountId: NonEmptyString;
      Region: NonEmptyString;
      Type: NonEmptyString;
      Id: NonEmptyString;
      ResourceRegion: NonEmptyString;
      CloudProvider: CloudProviderName;
    };
    Status: RemediationStatus;
    Trait: RemediationTrait & { Type: NonEmptyString; Title: NonEmptyString };
    Guidance: RemediationGuidance & {
      TargetTypeName: NonEmptyString;
      Pattern: NonEmptyString;
      Version: NonEmptyString;
      Context: RemediationGuidanceContext;
      Specification: RemediationGuidanceSpecification & {
        Parameters: (RemediationParameter & {
          Name: NonEmptyString;
          Type: NonEmptyString;
          Description: NonEmptyString;
        })[];
        Steps: (RemediationStep & {
          Phase: NonEmptyString;
          Description: NonEmptyString;
          Service: NonEmptyString;
          Action: NonEmptyString;
        })[];
      };
      Examples: RemediationGuidanceExamples;
      Metadata: RemediationGuidanceMetadata & {
        ResourceType: NonEmptyString;
        ExposureType: NonEmptyString;
        TraitTitles: RemediationStringList;
        Reversibility: NonEmptyString;
        FixEffect: NonEmptyString;
        RiskLevel: NonEmptyString;
      };
    };
  })[];
  NextToken?: string | undefined;
}
export type ResourceGroupByField =
  | "AccountId"
  | "AccountName"
  | "Region"
  | "ResourceProvider"
  | "ResourceOwnerAccountId"
  | "ResourceOwnerOrgId"
  | "ResourceCloudPartition"
  | "ResourceRegion"
  | "ResourceCategory"
  | "ResourceType"
  | "ResourceName"
  | "FindingsSummary.FindingType"
  | "ResourceSubCategory"
  | "DiscoveryType"
  | "ResourceInfo.AIDetails.HostResourceType"
  | "ResourceInfo.AIDetails.CanonicalId"
  | "ResourceCriticality"
  | (string & {});
export interface ResourceGroupByRule {
  GroupByField?: ResourceGroupByField | undefined;
  Filters?: ResourcesFilters | undefined;
}
export type ResourceGroupByRules = ResourceGroupByRule[];
export interface ResourceScopes {
  AwsOrganizations?: AwsOrganizationScope[] | undefined;
}
export interface GetResourcesStatisticsV2Request {
  GroupByRules?: ResourceGroupByRule[] | undefined;
  Scopes?: ResourceScopes | undefined;
  SortOrder?: SortOrder | undefined;
  MaxStatisticResults?: number | undefined;
}
export interface GetResourcesStatisticsV2Response {
  GroupByResults: GroupByResult[];
}
export type ResourcesTrendsStringField =
  | "account_id"
  | "region"
  | "resource_type"
  | "resource_category"
  | "resource_cloud_provider"
  | "resource_region"
  | "resource_owner_id"
  | "resource_owner_organization_id"
  | (string & {});
export interface ResourcesTrendsStringFilter {
  FieldName?: ResourcesTrendsStringField | undefined;
  Filter?: StringFilter | undefined;
}
export type ResourcesTrendsStringFilterList = ResourcesTrendsStringFilter[];
export interface ResourcesTrendsCompositeFilter {
  StringFilters?: ResourcesTrendsStringFilter[] | undefined;
  NestedCompositeFilters?: ResourcesTrendsCompositeFilter[] | undefined;
  Operator?: AllowedOperators | undefined;
}
export type ResourcesTrendsCompositeFilterList = ResourcesTrendsCompositeFilter[];
export interface ResourcesTrendsFilters {
  CompositeFilters?: ResourcesTrendsCompositeFilter[] | undefined;
  CompositeOperator?: AllowedOperators | undefined;
}
export interface GetResourcesTrendsV2Request {
  Filters?: ResourcesTrendsFilters | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ResourcesCount {
  AllResources?: number | undefined;
}
export interface ResourcesTrendsValues {
  ResourcesCount?: ResourcesCount | undefined;
}
export interface ResourcesTrendsMetricsResult {
  Timestamp?: Date | undefined;
  TrendsValues?: ResourcesTrendsValues | undefined;
}
export type ResourcesTrendsMetrics = ResourcesTrendsMetricsResult[];
export interface GetResourcesTrendsV2Response {
  Granularity: GranularityField;
  TrendsMetrics: (ResourcesTrendsMetricsResult & {
    Timestamp: Date;
    TrendsValues: ResourcesTrendsValues & {
      ResourcesCount: ResourcesCount & { AllResources: TrendsValueCount };
    };
  })[];
  NextToken?: string | undefined;
}
export interface GetResourcesV2Request {
  Filters?: ResourcesFilters | undefined;
  Scopes?: ResourceScopes | undefined;
  SortCriteria?: SortCriterion[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ResourceCategory =
  | "Compute"
  | "Database"
  | "Storage"
  | "Code"
  | "AI/ML"
  | "Identity"
  | "Network"
  | "Messaging"
  | "Other"
  | (string & {});
export interface ResourceSeverityBreakdown {
  Other?: number | undefined;
  Fatal?: number | undefined;
  Critical?: number | undefined;
  High?: number | undefined;
  Medium?: number | undefined;
  Low?: number | undefined;
  Informational?: number | undefined;
  Unknown?: number | undefined;
}
export interface ResourceFindingsSummary {
  FindingType?: string | undefined;
  ProductName?: string | undefined;
  TotalFindings?: number | undefined;
  Severities?: ResourceSeverityBreakdown | undefined;
}
export type ResourceFindingsSummaryList = ResourceFindingsSummary[];
export interface ResourceTag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type ResourceTagList = ResourceTag[];
export type ResourceConfig = unknown;
export type ResourceSubCategory =
  | "Model"
  | "ModelServing"
  | "Agent"
  | "AgentFramework"
  | "AgentToolsAndIdentity"
  | "SafetyAndGuardrail"
  | "KnowledgeAndData"
  | "OrchestrationAndPipeline"
  | "ExternalEndpoint"
  | "Development"
  | "Other"
  | (string & {});
export type DiscoveryType = "Managed" | "SelfHosted" | (string & {});
export interface AIDetails {
  HostResourceGuid?: string | undefined;
  HostResourceType?: string | undefined;
  CanonicalId?: string | undefined;
  SelfHostedAIModelResourceCount?: number | undefined;
  SelfHostedAIAgentResourceCount?: number | undefined;
  SelfHostedAIModelServingResourceCount?: number | undefined;
  SelfHostedAIExternalEndpointResourceCount?: number | undefined;
  SelfHostedAIDevelopmentResourceCount?: number | undefined;
  SelfHostedAIAgentFrameworkResourceCount?: number | undefined;
  SelfHostedAIAgentToolsAndIdentityResourceCount?: number | undefined;
  SelfHostedTotalAIResourceCount?: number | undefined;
}
export interface ResourceInfo {
  AIDetails?: AIDetails | undefined;
}
export type CriticalitySourceType =
  | "AutomationRule"
  | "ResourceName"
  | "TagInference"
  | (string & {});
export interface CriticalitySource {
  Source?: CriticalitySourceType | undefined;
  Reason?: string | undefined;
}
export type CriticalitySourceList = CriticalitySource[];
export interface ResourceResult {
  ResourceGuid?: string | undefined;
  ResourceId?: string | undefined;
  AccountId?: string | undefined;
  AccountName?: string | undefined;
  Region?: string | undefined;
  ResourceProvider?: string | undefined;
  ResourceOwnerAccountId?: string | undefined;
  ResourceOwnerOrgId?: string | undefined;
  ResourceCloudPartition?: string | undefined;
  ResourceRegion?: string | undefined;
  ResourceCategory?: ResourceCategory | undefined;
  ResourceType?: string | undefined;
  ResourceName?: string | undefined;
  ResourceCreationTimeDt?: string | undefined;
  ResourceDetailCaptureTimeDt?: string | undefined;
  FindingsSummary?: ResourceFindingsSummary[] | undefined;
  ResourceTags?: ResourceTag[] | undefined;
  ResourceConfig?: any | undefined;
  ResourceSubCategory?: ResourceSubCategory | undefined;
  DiscoveryType?: DiscoveryType | undefined;
  ResourceInfo?: ResourceInfo | undefined;
  ResourceCriticality?: ResourceCriticality | undefined;
  CriticalitySources?: CriticalitySource[] | undefined;
}
export type Resources = ResourceResult[];
export interface GetResourcesV2Response {
  Resources: (ResourceResult & {
    ResourceId: NonEmptyString;
    AccountId: NonEmptyString;
    Region: NonEmptyString;
    ResourceType: NonEmptyString;
    ResourceDetailCaptureTimeDt: NonEmptyString;
    ResourceConfig: ResourceConfig;
    FindingsSummary: (ResourceFindingsSummary & {
      FindingType: NonEmptyString;
      ProductName: NonEmptyString;
      TotalFindings: number;
    })[];
    ResourceTags: (ResourceTag & { Key: NonEmptyString; Value: NonEmptyString })[];
    CriticalitySources: (CriticalitySource & {
      Source: CriticalitySourceType;
      Reason: NonEmptyString;
    })[];
  })[];
  NextToken?: string | undefined;
}
export interface GetSecurityControlDefinitionRequest {
  SecurityControlId?: string | undefined;
}
export type RegionAvailabilityStatus = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export type SecurityControlProperty = "Parameters" | (string & {});
export type CustomizableProperties = SecurityControlProperty[];
export interface IntegerConfigurationOptions {
  DefaultValue?: number | undefined;
  Min?: number | undefined;
  Max?: number | undefined;
}
export interface IntegerListConfigurationOptions {
  DefaultValue?: number[] | undefined;
  Min?: number | undefined;
  Max?: number | undefined;
  MaxItems?: number | undefined;
}
export interface DoubleConfigurationOptions {
  DefaultValue?: number | undefined;
  Min?: number | undefined;
  Max?: number | undefined;
}
export interface StringConfigurationOptions {
  DefaultValue?: string | undefined;
  Re2Expression?: string | undefined;
  ExpressionDescription?: string | undefined;
}
export interface StringListConfigurationOptions {
  DefaultValue?: string[] | undefined;
  Re2Expression?: string | undefined;
  MaxItems?: number | undefined;
  ExpressionDescription?: string | undefined;
}
export interface BooleanConfigurationOptions {
  DefaultValue?: boolean | undefined;
}
export interface EnumConfigurationOptions {
  DefaultValue?: string | undefined;
  AllowedValues?: string[] | undefined;
}
export interface EnumListConfigurationOptions {
  DefaultValue?: string[] | undefined;
  MaxItems?: number | undefined;
  AllowedValues?: string[] | undefined;
}
export type ConfigurationOptions =
  | {
      Integer: IntegerConfigurationOptions;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList: IntegerListConfigurationOptions;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double: DoubleConfigurationOptions;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String: StringConfigurationOptions;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList: StringListConfigurationOptions;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean: BooleanConfigurationOptions;
      Enum?: undefined;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum: EnumConfigurationOptions;
      EnumList?: undefined;
    }
  | {
      Integer?: undefined;
      IntegerList?: undefined;
      Double?: undefined;
      String?: undefined;
      StringList?: undefined;
      Boolean?: undefined;
      Enum?: undefined;
      EnumList: EnumListConfigurationOptions;
    };
export interface ParameterDefinition {
  Description?: string | undefined;
  ConfigurationOptions?: ConfigurationOptions | undefined;
}
export type ParameterDefinitions = { [key: string]: ParameterDefinition | undefined };
export interface SecurityControlDefinition {
  SecurityControlId?: string | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  RemediationUrl?: string | undefined;
  SeverityRating?: SeverityRating | undefined;
  CurrentRegionAvailability?: RegionAvailabilityStatus | undefined;
  CustomizableProperties?: SecurityControlProperty[] | undefined;
  ParameterDefinitions?: { [key: string]: ParameterDefinition | undefined } | undefined;
  Provider?: SecurityControlsProvider | undefined;
}
export interface GetSecurityControlDefinitionResponse {
  SecurityControlDefinition: SecurityControlDefinition & {
    SecurityControlId: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    RemediationUrl: NonEmptyString;
    SeverityRating: SeverityRating;
    CurrentRegionAvailability: RegionAvailabilityStatus;
    ParameterDefinitions: {
      [key: string]:
        | (ParameterDefinition & {
            Description: NonEmptyString;
            ConfigurationOptions: ConfigurationOptions;
          })
        | undefined;
    };
  };
}
export type SoftwareStringField =
  | "AccountId"
  | "PackageName"
  | "PackageVersion"
  | "PackageType"
  | "Region"
  | "ResourceRegion"
  | "ResourceType"
  | "ResourceId"
  | "ResourceProvider"
  | "ResourceOwnerAccountId"
  | "ResourceOwnerOrgId"
  | "ResourceCloudPartition"
  | (string & {});
export interface SoftwareStringFilter {
  FieldName?: SoftwareStringField | undefined;
  Filter?: StringFilter | undefined;
}
export type SoftwareStringFilterList = SoftwareStringFilter[];
export interface SoftwareCompositeFilter {
  StringFilters?: SoftwareStringFilter[] | undefined;
  NestedCompositeFilters?: SoftwareCompositeFilter[] | undefined;
  Operator?: AllowedOperators | undefined;
}
export type SoftwareCompositeFilterList = SoftwareCompositeFilter[];
export interface SoftwareFilters {
  CompositeFilters?: SoftwareCompositeFilter[] | undefined;
  CompositeOperator?: AllowedOperators | undefined;
}
export interface SoftwareScopes {
  AwsOrganizations?: AwsOrganizationScope[] | undefined;
}
export interface GetSoftwareResourcesV2Request {
  PackageName?: string | undefined;
  PackageType?: string | undefined;
  PackageVersion?: string | undefined;
  Filters?: SoftwareFilters | undefined;
  Scopes?: SoftwareScopes | undefined;
  SortCriteria?: SortCriterion[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface SoftwareResourceResult {
  AccountId?: string | undefined;
  ResourceType?: string | undefined;
  Region?: string | undefined;
  ResourceId?: string | undefined;
  ResourceProvider?: string | undefined;
  ResourceOwnerOrgId?: string | undefined;
  ResourceOwnerAccountId?: string | undefined;
  ResourceCloudPartition?: string | undefined;
  ResourceRegion?: string | undefined;
}
export type SoftwareResourceResultList = SoftwareResourceResult[];
export interface GetSoftwareResourcesV2Response {
  SoftwareResources: (SoftwareResourceResult & {
    AccountId: NonEmptyString;
    ResourceType: NonEmptyString;
    Region: NonEmptyString;
    ResourceId: NonEmptyString;
  })[];
  NextToken?: string | undefined;
}
export type SoftwareGroupByField =
  | "AccountId"
  | "PackageName"
  | "PackageVersion"
  | "PackageType"
  | "Region"
  | "ResourceRegion"
  | "ResourceType"
  | "ResourceId"
  | "ResourceProvider"
  | "ResourceOwnerAccountId"
  | "ResourceOwnerOrgId"
  | "ResourceCloudPartition"
  | (string & {});
export interface SoftwareGroupByRule {
  GroupByField?: SoftwareGroupByField | undefined;
  Filters?: SoftwareFilters | undefined;
}
export type SoftwareGroupByRules = SoftwareGroupByRule[];
export interface GetSoftwareStatisticsV2Request {
  GroupByRules?: SoftwareGroupByRule[] | undefined;
  Scopes?: SoftwareScopes | undefined;
  SortOrder?: SortOrder | undefined;
  MaxStatisticResults?: number | undefined;
}
export interface GetSoftwareStatisticsV2Response {
  GroupByResults: GroupByResult[];
}
export interface GetSoftwareV2Request {
  Filters?: SoftwareFilters | undefined;
  Scopes?: SoftwareScopes | undefined;
  SortCriteria?: SortCriterion[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface SoftwareResult {
  PackageName?: string | undefined;
  PackageVersion?: string | undefined;
  PackageType?: string | undefined;
  ResourceCount?: number | undefined;
}
export type SoftwareList = SoftwareResult[];
export interface GetSoftwareV2Response {
  Software: (SoftwareResult & {
    PackageName: NonEmptyString;
    PackageType: NonEmptyString;
    ResourceCount: number;
  })[];
  NextToken?: string | undefined;
}
export interface InviteMembersRequest {
  AccountIds?: string[] | undefined;
}
export interface InviteMembersResponse {
  UnprocessedAccounts?: Result[] | undefined;
}
export interface ListAggregatorsV2Request {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface AggregatorV2 {
  AggregatorV2Arn?: string | undefined;
}
export type AggregatorV2List = AggregatorV2[];
export interface ListAggregatorsV2Response {
  AggregatorsV2?: AggregatorV2[] | undefined;
  NextToken?: string | undefined;
}
export interface ListAutomationRulesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface AutomationRulesMetadata {
  RuleArn?: string | undefined;
  RuleStatus?: RuleStatus | undefined;
  RuleOrder?: number | undefined;
  RuleName?: string | undefined;
  Description?: string | undefined;
  IsTerminal?: boolean | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
  CreatedBy?: string | undefined;
}
export type AutomationRulesMetadataList = AutomationRulesMetadata[];
export interface ListAutomationRulesResponse {
  AutomationRulesMetadata?: AutomationRulesMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListAutomationRulesV2Request {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface AutomationRulesActionTypeObjectV2 {
  Type?: AutomationRulesActionTypeV2 | undefined;
}
export type AutomationRulesActionTypeListV2 = AutomationRulesActionTypeObjectV2[];
export interface AutomationRulesMetadataV2 {
  RuleArn?: string | undefined;
  RuleId?: string | undefined;
  RuleOrder?: number | undefined;
  RuleName?: string | undefined;
  RuleStatus?: RuleStatusV2 | undefined;
  Description?: string | undefined;
  Actions?: AutomationRulesActionTypeObjectV2[] | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type AutomationRulesMetadataListV2 = AutomationRulesMetadataV2[];
export interface ListAutomationRulesV2Response {
  Rules?: AutomationRulesMetadataV2[] | undefined;
  NextToken?: string | undefined;
}
export interface ListConfigurationPoliciesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ConfigurationPolicySummary {
  Arn?: string | undefined;
  Id?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  UpdatedAt?: Date | undefined;
  ServiceEnabled?: boolean | undefined;
}
export type ConfigurationPolicySummaryList = ConfigurationPolicySummary[];
export interface ListConfigurationPoliciesResponse {
  ConfigurationPolicySummaries?: ConfigurationPolicySummary[] | undefined;
  NextToken?: string | undefined;
}
export interface AssociationFilters {
  ConfigurationPolicyId?: string | undefined;
  AssociationType?: AssociationType | undefined;
  AssociationStatus?: ConfigurationPolicyAssociationStatus | undefined;
}
export interface ListConfigurationPolicyAssociationsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: AssociationFilters | undefined;
}
export type ConfigurationPolicyAssociationSummaryList = ConfigurationPolicyAssociationSummary[];
export interface ListConfigurationPolicyAssociationsResponse {
  ConfigurationPolicyAssociationSummaries?: ConfigurationPolicyAssociationSummary[] | undefined;
  NextToken?: string | undefined;
}
export type CspmConnectorProviderName = "AZURE" | (string & {});
export interface ListConnectorsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  ProviderName?: CspmConnectorProviderName | undefined;
  ConnectorStatus?: CspmConnectorStatus | undefined;
  EnablementStatus?: CspmEnablementStatus | undefined;
}
export interface CspmProviderSummary {
  ProviderName?: CspmConnectorProviderName | undefined;
  ConnectorStatus?: CspmConnectorStatus | undefined;
  ProviderConfiguration?: CspmProviderDetail | undefined;
}
export interface CspmConnectorSummary {
  ConnectorArn?: string | undefined;
  ConnectorId?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  ProviderSummary?: CspmProviderSummary | undefined;
  CreatedAt?: Date | undefined;
  CreatedBy?: string | undefined;
  EnablementStatus?: CspmEnablementStatus | undefined;
}
export type CspmConnectorSummaryList = CspmConnectorSummary[];
export interface ListConnectorsResponse {
  NextToken?: string | undefined;
  Connectors: CspmConnectorSummary[];
}
export type ConnectorProviderName = "JIRA_CLOUD" | "SERVICENOW" | "AZURE" | (string & {});
export interface ListConnectorsV2Request {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  ProviderName?: ConnectorProviderName | undefined;
  ConnectorStatus?: ConnectorStatus | undefined;
  EnablementStatus?: EnablementStatus | undefined;
}
export interface ProviderSummary {
  ProviderName?: ConnectorProviderName | undefined;
  ConnectorStatus?: ConnectorStatus | undefined;
  ProviderConfiguration?: ProviderDetail | undefined;
}
export interface ConnectorSummary {
  ConnectorArn?: string | undefined;
  ConnectorId?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  ProviderSummary?: ProviderSummary | undefined;
  CreatedAt?: Date | undefined;
  EnablementStatus?: EnablementStatus | undefined;
  EnablementStatusReason?: string | undefined;
}
export type ConnectorSummaryList = ConnectorSummary[];
export interface ListConnectorsV2Response {
  NextToken?: string | undefined;
  Connectors: (ConnectorSummary & {
    ConnectorId: NonEmptyString;
    Name: NonEmptyString;
    ProviderSummary: ProviderSummary;
    CreatedAt: Date;
  })[];
}
export interface ListEnabledProductsForImportRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ProductSubscriptionArnList = string[];
export interface ListEnabledProductsForImportResponse {
  ProductSubscriptions?: string[] | undefined;
  NextToken?: string | undefined;
}
export type ExportMaxResults = number;
export interface ListExportJobsV2Request {
  Status?: ExportStatus | undefined;
  DataType?: ExportDataType | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface FindingsOutputSummary {
  Format?: FindingsExportFormat | undefined;
}
export type ExportOutputSummary = { Findings: FindingsOutputSummary };
export interface ExportSummary {
  ExportJobId?: string | undefined;
  Name?: string | undefined;
  Status?: ExportStatus | undefined;
  DataType?: ExportDataType | undefined;
  OutputConfiguration?: ExportOutputSummary | undefined;
  Scopes?: ExportScopes | undefined;
  Destination?: ExportDestination | undefined;
  FailureCode?: ExportFailureCode | undefined;
  FailureMessage?: string | undefined;
  StartedAt?: Date | undefined;
  EndedAt?: Date | undefined;
}
export type ExportSummaryList = ExportSummary[];
export interface ListExportJobsV2Response {
  Items: (ExportSummary & {
    ExportJobId: ExportJobId;
    Status: ExportStatus;
    DataType: ExportDataType;
    Destination: ExportDestination;
    StartedAt: Date;
  })[];
  NextToken?: string | undefined;
}
export interface ListExposuresByRemediationV2Request {
  TargetUid?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ExposureSeverity =
  | "Informational"
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | (string & {});
export type ExposureImpact = "Reduces" | "Resolves" | "Unchanged" | (string & {});
export interface ExposureFinding {
  MetadataUid?: string | undefined;
  Title?: string | undefined;
  PreviousSeverity?: ExposureSeverity | undefined;
  ProjectedSeverity?: ExposureSeverity | undefined;
  Impact?: ExposureImpact | undefined;
}
export type ExposureFindingItemsList = ExposureFinding[];
export interface ListExposuresByRemediationV2Response {
  Items: (ExposureFinding & {
    MetadataUid: NonEmptyString;
    Title: NonEmptyString;
    PreviousSeverity: ExposureSeverity;
    ProjectedSeverity: ExposureSeverity;
    Impact: ExposureImpact;
  })[];
  TargetUid: string;
  Resource: RemediationResource & {
    AccountId: NonEmptyString;
    Region: NonEmptyString;
    Type: NonEmptyString;
    Id: NonEmptyString;
    ResourceRegion: NonEmptyString;
    CloudProvider: CloudProviderName;
  };
  TotalCount: number;
  Trait: RemediationTrait & { Type: NonEmptyString; Title: NonEmptyString };
  NextToken?: string | undefined;
}
export interface ListFindingAggregatorsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface FindingAggregator {
  FindingAggregatorArn?: string | undefined;
}
export type FindingAggregatorList = FindingAggregator[];
export interface ListFindingAggregatorsResponse {
  FindingAggregators?: FindingAggregator[] | undefined;
  NextToken?: string | undefined;
}
export type FreeTrialAccountId = string;
export type FreeTrialAccountIdList = string[];
export type FreeTrialStatusValue = "ACTIVE" | "INACTIVE" | (string & {});
export type FreeTrialStatusValueList = FreeTrialStatusValue[];
export interface ListFreeTrialStatusesV2Request {
  AccountIds?: string[] | undefined;
  Statuses?: FreeTrialStatusValue[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type FreeTrialType = "SECURITY_HUB_V2" | "SECURITY_HUB_V2_MULTI_CLOUD_AZURE" | (string & {});
export interface FreeTrialStatus {
  FeatureType?: FreeTrialType | undefined;
  Status?: FreeTrialStatusValue | undefined;
  StartedAt?: Date | undefined;
  ExpiresAt?: Date | undefined;
}
export type FreeTrialStatusList = FreeTrialStatus[];
export interface AccountFreeTrialStatus {
  AccountId?: string | undefined;
  EvaluatedAt?: Date | undefined;
  FreeTrialStatuses?: FreeTrialStatus[] | undefined;
}
export type AccountFreeTrialStatusList = AccountFreeTrialStatus[];
export interface ListFreeTrialStatusesV2Response {
  AccountFreeTrialStatuses: (AccountFreeTrialStatus & {
    AccountId: FreeTrialAccountId;
    EvaluatedAt: Date;
    FreeTrialStatuses: (FreeTrialStatus & {
      FeatureType: FreeTrialType;
      Status: FreeTrialStatusValue;
      StartedAt: Date;
      ExpiresAt: Date;
    })[];
  })[];
  NextToken?: string | undefined;
}
export type CrossAccountMaxResults = number;
export interface ListInvitationsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type InvitationList = Invitation[];
export interface ListInvitationsResponse {
  Invitations?: Invitation[] | undefined;
  NextToken?: string | undefined;
}
export interface ListMembersRequest {
  OnlyAssociated?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListMembersResponse {
  Members?: Member[] | undefined;
  NextToken?: string | undefined;
}
export type AdminsMaxResults = number;
export interface ListOrganizationAdminAccountsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Feature?: SecurityHubFeature | undefined;
}
export type AdminStatus = "ENABLED" | "DISABLE_IN_PROGRESS" | (string & {});
export interface AdminAccount {
  AccountId?: string | undefined;
  Status?: AdminStatus | undefined;
}
export type AdminAccounts = AdminAccount[];
export interface ListOrganizationAdminAccountsResponse {
  AdminAccounts?: AdminAccount[] | undefined;
  NextToken?: string | undefined;
  Feature?: SecurityHubFeature | undefined;
}
export type SecurityControlsProviders = SecurityControlsProvider[];
export interface ListSecurityControlDefinitionsRequest {
  StandardsArn?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Providers?: SecurityControlsProvider[] | undefined;
}
export type SecurityControlDefinitions = SecurityControlDefinition[];
export interface ListSecurityControlDefinitionsResponse {
  SecurityControlDefinitions: (SecurityControlDefinition & {
    SecurityControlId: NonEmptyString;
    Title: NonEmptyString;
    Description: NonEmptyString;
    RemediationUrl: NonEmptyString;
    SeverityRating: SeverityRating;
    CurrentRegionAvailability: RegionAvailabilityStatus;
    ParameterDefinitions: {
      [key: string]:
        | (ParameterDefinition & {
            Description: NonEmptyString;
            ConfigurationOptions: ConfigurationOptions;
          })
        | undefined;
    };
  })[];
  NextToken?: string | undefined;
}
export interface ListStandardsControlAssociationsRequest {
  SecurityControlId?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface StandardsControlAssociationSummary {
  StandardsArn?: string | undefined;
  SecurityControlId?: string | undefined;
  SecurityControlArn?: string | undefined;
  AssociationStatus?: AssociationStatus | undefined;
  RelatedRequirements?: string[] | undefined;
  UpdatedAt?: Date | undefined;
  UpdatedReason?: string | undefined;
  StandardsControlTitle?: string | undefined;
  StandardsControlDescription?: string | undefined;
}
export type StandardsControlAssociationSummaries = StandardsControlAssociationSummary[];
export interface ListStandardsControlAssociationsResponse {
  StandardsControlAssociationSummaries: (StandardsControlAssociationSummary & {
    StandardsArn: NonEmptyString;
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    AssociationStatus: AssociationStatus;
  })[];
  NextToken?: string | undefined;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface RegisterConnectorV2Request {
  AuthCode?: string | undefined;
  AuthState?: string | undefined;
}
export interface RegisterConnectorV2Response {
  ConnectorArn?: string | undefined;
  ConnectorId: string;
}
export interface StartConfigurationPolicyAssociationRequest {
  ConfigurationPolicyIdentifier?: string | undefined;
  Target?: Target | undefined;
}
export interface StartConfigurationPolicyAssociationResponse {
  ConfigurationPolicyId?: string | undefined;
  TargetId?: string | undefined;
  TargetType?: TargetType | undefined;
  AssociationType?: AssociationType | undefined;
  UpdatedAt?: Date | undefined;
  AssociationStatus?: ConfigurationPolicyAssociationStatus | undefined;
  AssociationStatusMessage?: string | undefined;
}
export interface StartConfigurationPolicyDisassociationRequest {
  Target?: Target | undefined;
  ConfigurationPolicyIdentifier?: string | undefined;
}
export interface StartConfigurationPolicyDisassociationResponse {}
export interface StartExportJobV2Request {
  Name?: string | undefined;
  Destination?: ExportDestination | undefined;
  OutputConfiguration?: ExportOutput | undefined;
  Scopes?: ExportScopes | undefined;
  ClientToken?: string | undefined;
}
export interface StartExportJobV2Response {
  ExportJobId: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface UpdateActionTargetRequest {
  ActionTargetArn: string;
  Name?: string | undefined;
  Description?: string | undefined;
}
export interface UpdateActionTargetResponse {}
export interface UpdateAggregatorV2Request {
  AggregatorV2Arn: string;
  RegionLinkingMode?: string | undefined;
  LinkedRegions?: string[] | undefined;
}
export interface UpdateAggregatorV2Response {
  AggregatorV2Arn?: string | undefined;
  AggregationRegion?: string | undefined;
  RegionLinkingMode?: string | undefined;
  LinkedRegions?: string[] | undefined;
}
export interface UpdateAutomationRuleV2Request {
  Identifier: string;
  RuleStatus?: RuleStatusV2 | undefined;
  RuleOrder?: number | undefined;
  Description?: string | undefined;
  RuleName?: string | undefined;
  Criteria?: Criteria | undefined;
  Actions?: AutomationRulesActionV2[] | undefined;
}
export interface UpdateAutomationRuleV2Response {}
export interface UpdateConfigurationPolicyRequest {
  Identifier: string;
  Name?: string | undefined;
  Description?: string | undefined;
  UpdatedReason?: string | undefined;
  ConfigurationPolicy?: Policy | undefined;
}
export interface UpdateConfigurationPolicyResponse {
  Arn?: string | undefined;
  Id?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  UpdatedAt?: Date | undefined;
  CreatedAt?: Date | undefined;
  ConfigurationPolicy?: Policy | undefined;
}
export interface AzureUpdateConfiguration {
  ScopeConfiguration?: AzureScopeConfiguration | undefined;
  AzureRegions?: string[] | undefined;
}
export type CspmProviderUpdateConfiguration = { Azure: AzureUpdateConfiguration };
export interface UpdateConnectorRequest {
  ConnectorId: string;
  Description?: string | undefined;
  Provider?: CspmProviderUpdateConfiguration | undefined;
}
export interface UpdateConnectorResponse {
  ConnectorStatus?: CspmConnectorStatus | undefined;
  EnablementStatus?: CspmEnablementStatus | undefined;
}
export interface JiraCloudUpdateConfiguration {
  ProjectKey?: string | undefined;
}
export interface ServiceNowUpdateConfiguration {
  SecretArn?: string | undefined;
}
export type ProviderUpdateConfiguration =
  | { JiraCloud: JiraCloudUpdateConfiguration; ServiceNow?: undefined; Azure?: undefined }
  | { JiraCloud?: undefined; ServiceNow: ServiceNowUpdateConfiguration; Azure?: undefined }
  | { JiraCloud?: undefined; ServiceNow?: undefined; Azure: AzureUpdateConfiguration };
export interface UpdateConnectorV2Request {
  ConnectorId: string;
  Description?: string | undefined;
  Provider?: ProviderUpdateConfiguration | undefined;
}
export interface UpdateConnectorV2Response {
  ConnectorStatus?: ConnectorStatus | undefined;
  EnablementStatus?: EnablementStatus | undefined;
}
export interface UpdateFindingAggregatorRequest {
  FindingAggregatorArn?: string | undefined;
  RegionLinkingMode?: string | undefined;
  Regions?: string[] | undefined;
}
export interface UpdateFindingAggregatorResponse {
  FindingAggregatorArn?: string | undefined;
  FindingAggregationRegion?: string | undefined;
  RegionLinkingMode?: string | undefined;
  Regions?: string[] | undefined;
}
export interface UpdateFindingsRequest {
  Filters?: AwsSecurityFindingFilters | undefined;
  Note?: NoteUpdate | undefined;
  RecordState?: RecordState | undefined;
}
export interface UpdateFindingsResponse {}
export interface UpdateInsightRequest {
  InsightArn: string;
  Name?: string | undefined;
  Filters?: AwsSecurityFindingFilters | undefined;
  GroupByAttribute?: string | undefined;
}
export interface UpdateInsightResponse {}
export interface UpdateOrganizationConfigurationRequest {
  AutoEnable?: boolean | undefined;
  AutoEnableStandards?: AutoEnableStandards | undefined;
  OrganizationConfiguration?: OrganizationConfiguration | undefined;
}
export interface UpdateOrganizationConfigurationResponse {}
export interface UpdateSecurityControlRequest {
  SecurityControlId?: string | undefined;
  Parameters?: { [key: string]: ParameterConfiguration | undefined } | undefined;
  LastUpdateReason?: string | undefined;
}
export interface UpdateSecurityControlResponse {}
export interface UpdateSecurityHubConfigurationRequest {
  AutoEnableControls?: boolean | undefined;
  ControlFindingGenerator?: ControlFindingGenerator | undefined;
}
export interface UpdateSecurityHubConfigurationResponse {}
export interface UpdateStandardsControlRequest {
  StandardsControlArn: string;
  ControlStatus?: ControlStatus | undefined;
  DisabledReason?: string | undefined;
}
export interface UpdateStandardsControlResponse {}
export type AcceptAdministratorInvitationError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Accepts the invitation to be a member account and be monitored by the Security Hub CSPM administrator
 * account that the invitation was sent from.
 *
 * This operation is only used by member accounts that are not added through
 * Organizations.
 *
 * When the member account accepts the invitation, permission is granted to the administrator
 * account to view findings generated in the member account.
 */
export const acceptAdministratorInvitation: API.OperationMethod<
  AcceptAdministratorInvitationRequest & RegionInput,
  AcceptAdministratorInvitationResponse,
  AcceptAdministratorInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<AcceptAdministratorInvitationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<AcceptAdministratorInvitationResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAdministratorInvitation",
  telemetry: TELEMETRY,
  span: "AcceptAdministratorInvitation",
}));

export type AcceptInvitationError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This method is deprecated. Instead, use `AcceptAdministratorInvitation`.
 *
 * The Security Hub CSPM console continues to use `AcceptInvitation`. It will eventually change to use `AcceptAdministratorInvitation`. Any IAM policies that specifically control access to this function must continue to use `AcceptInvitation`. You should also add `AcceptAdministratorInvitation` to your policies to ensure that the correct permissions are in place after the console begins to use `AcceptAdministratorInvitation`.
 *
 * Accepts the invitation to be a member account and be monitored by the Security Hub CSPM administrator
 * account that the invitation was sent from.
 *
 * This operation is only used by member accounts that are not added through
 * Organizations.
 *
 * When the member account accepts the invitation, permission is granted to the administrator
 * account to view findings generated in the member account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest & RegionInput,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<AcceptInvitationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<AcceptInvitationResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
  telemetry: TELEMETRY,
  span: "AcceptInvitation",
}));

export type BatchDeleteAutomationRulesError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes one or more automation rules.
 */
export const batchDeleteAutomationRules: API.OperationMethod<
  BatchDeleteAutomationRulesRequest & RegionInput,
  BatchDeleteAutomationRulesResponse,
  BatchDeleteAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<BatchDeleteAutomationRulesRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<BatchDeleteAutomationRulesResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAutomationRules",
  telemetry: TELEMETRY,
  span: "BatchDeleteAutomationRules",
}));

export type BatchDisableStandardsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Disables the standards specified by the provided
 * `StandardsSubscriptionArns`.
 *
 * For more information, see Security Standards section of the Security Hub CSPM User
 * Guide.
 */
export const batchDisableStandards: API.OperationMethod<
  BatchDisableStandardsRequest & RegionInput,
  BatchDisableStandardsResponse,
  BatchDisableStandardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<BatchDisableStandardsRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<BatchDisableStandardsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisableStandards",
  telemetry: TELEMETRY,
  span: "BatchDisableStandards",
}));

export type BatchEnableStandardsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Enables the standards specified by the provided `StandardsArn`. To obtain the
 * ARN for a standard, use the `DescribeStandards`
 * operation.
 *
 * For more information, see the Security Standards
 * section of the *Security Hub CSPM User Guide*.
 */
export const batchEnableStandards: API.OperationMethod<
  BatchEnableStandardsRequest & RegionInput,
  BatchEnableStandardsResponse,
  BatchEnableStandardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1730, __c54, 2) as any as S.Schema<BatchEnableStandardsRequest>,
  output: __S(1632, __c51, 0) as any as S.Schema<BatchEnableStandardsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchEnableStandards",
  telemetry: TELEMETRY,
  span: "BatchEnableStandards",
}));

export type BatchGetAutomationRulesError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of details for automation rules based on rule Amazon Resource Names
 * (ARNs).
 */
export const batchGetAutomationRules: API.OperationMethod<
  BatchGetAutomationRulesRequest & RegionInput,
  BatchGetAutomationRulesResponse,
  BatchGetAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<BatchGetAutomationRulesRequest>,
  output: __S(1763, __c55, 3) as any as S.Schema<BatchGetAutomationRulesResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAutomationRules",
  telemetry: TELEMETRY,
  span: "BatchGetAutomationRules",
}));

export type BatchGetConfigurationPolicyAssociationsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns associations between an Security Hub CSPM configuration and a batch of target accounts, organizational units, or the root.
 * Only the Security Hub CSPM delegated administrator can invoke this operation from the home Region. A configuration
 * can refer to a configuration policy or to a self-managed configuration.
 */
export const batchGetConfigurationPolicyAssociations: API.OperationMethod<
  BatchGetConfigurationPolicyAssociationsRequest & RegionInput,
  BatchGetConfigurationPolicyAssociationsResponse,
  BatchGetConfigurationPolicyAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2018, __c63, 2) as any as S.Schema<BatchGetConfigurationPolicyAssociationsRequest>,
  output: __S(2021, __c63, 5) as any as S.Schema<BatchGetConfigurationPolicyAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetConfigurationPolicyAssociations",
  telemetry: TELEMETRY,
  span: "BatchGetConfigurationPolicyAssociations",
}));

export type BatchGetSecurityControlsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides details about a batch of security controls for the current Amazon Web Services account and Amazon Web Services Region.
 */
export const batchGetSecurityControls: API.OperationMethod<
  BatchGetSecurityControlsRequest & RegionInput,
  BatchGetSecurityControlsResponse,
  BatchGetSecurityControlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<BatchGetSecurityControlsRequest>,
  output: __S(2149, __c67, 5) as any as S.Schema<BatchGetSecurityControlsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecurityControls",
  telemetry: TELEMETRY,
  span: "BatchGetSecurityControls",
}));

export type BatchGetStandardsControlAssociationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * For a batch of security controls and standards, identifies whether each control is currently enabled or disabled in a standard.
 *
 * Calls to this operation return a `RESOURCE_NOT_FOUND_EXCEPTION` error when the standard subscription for the association has a `NOT_READY_FOR_UPDATES` value for `StandardsControlsUpdatable`.
 */
export const batchGetStandardsControlAssociations: API.OperationMethod<
  BatchGetStandardsControlAssociationsRequest & RegionInput,
  BatchGetStandardsControlAssociationsResponse,
  BatchGetStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2242, __c70, 2) as any as S.Schema<BatchGetStandardsControlAssociationsRequest>,
  output: __S(2247, __c70, 7) as any as S.Schema<BatchGetStandardsControlAssociationsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetStandardsControlAssociations",
  telemetry: TELEMETRY,
  span: "BatchGetStandardsControlAssociations",
}));

export type BatchImportFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Imports security findings generated by a finding provider into Security Hub CSPM.
 * This action is requested by the finding provider to import its findings into
 * Security Hub CSPM.
 *
 * `BatchImportFindings` must be called by one of the following:
 *
 * - The Amazon Web Services account that is associated with a finding if you are using
 * the default product ARN
 * or are a partner sending findings from within a customer's Amazon Web Services account.
 * In these cases, the identifier of the account that you are calling `BatchImportFindings`
 * from needs to be the same as the `AwsAccountId` attribute for the finding.
 *
 * - An Amazon Web Services account that Security Hub CSPM has allow-listed for an official partner
 * integration. In this case, you can call `BatchImportFindings` from the allow-listed
 * account and send findings from different customer accounts in the same batch.
 *
 * The maximum allowed size for a finding is 240 Kb. An error is returned for any finding
 * larger than 240 Kb.
 *
 * After a finding is created, `BatchImportFindings` cannot be used to update
 * the following finding fields and objects, which Security Hub CSPM customers use to manage their
 * investigation workflow.
 *
 * - `Note`
 *
 * - `UserDefinedFields`
 *
 * - `VerificationState`
 *
 * - `Workflow`
 *
 * Finding providers also should not use `BatchImportFindings` to update the following attributes.
 *
 * - `Confidence`
 *
 * - `Criticality`
 *
 * - `RelatedFindings`
 *
 * - `Severity`
 *
 * - `Types`
 *
 * Instead, finding providers use `FindingProviderFields` to provide values for these attributes.
 */
export const batchImportFindings: API.OperationMethod<
  BatchImportFindingsRequest & RegionInput,
  BatchImportFindingsResponse,
  BatchImportFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<BatchImportFindingsRequest>,
  output: __S(2275, __c71, 3) as any as S.Schema<BatchImportFindingsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchImportFindings",
  telemetry: TELEMETRY,
  span: "BatchImportFindings",
}));

export type BatchUpdateAutomationRulesError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates one or more automation rules based on rule Amazon Resource Names (ARNs)
 * and input parameters.
 */
export const batchUpdateAutomationRules: API.OperationMethod<
  BatchUpdateAutomationRulesRequest & RegionInput,
  BatchUpdateAutomationRulesResponse,
  BatchUpdateAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3170, __c99, 2) as any as S.Schema<BatchUpdateAutomationRulesRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<BatchUpdateAutomationRulesResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateAutomationRules",
  telemetry: TELEMETRY,
  span: "BatchUpdateAutomationRules",
}));

export type BatchUpdateFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Used by Security Hub CSPM customers to update information about their investigation into one or more findings.
 * Requested by administrator accounts or member accounts.
 * Administrator accounts can update findings for their account and their member accounts.
 * A member account can update findings only for their own account.
 * Administrator and member accounts can use this operation to update the following fields and objects for one or more findings:
 *
 * - `Confidence`
 *
 * - `Criticality`
 *
 * - `Note`
 *
 * - `RelatedFindings`
 *
 * - `Severity`
 *
 * - `Types`
 *
 * - `UserDefinedFields`
 *
 * - `VerificationState`
 *
 * - `Workflow`
 *
 * If you use this operation to update a finding, your updates don't affect the value for the `UpdatedAt` field of the finding.
 * Also note that it can take several minutes for Security Hub CSPM to process your request and update each finding specified in the request.
 *
 * You can configure IAM policies to restrict access to fields and field values.
 * For example, you might not want member accounts to be able to suppress findings or change the finding severity.
 * For more information see Configuring access to BatchUpdateFindings in the *Security Hub CSPM User Guide*.
 */
export const batchUpdateFindings: API.OperationMethod<
  BatchUpdateFindingsRequest & RegionInput,
  BatchUpdateFindingsResponse,
  BatchUpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3201, __c100, 1) as any as S.Schema<BatchUpdateFindingsRequest>,
  output: __S(3204, __c100, 4) as any as S.Schema<BatchUpdateFindingsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFindings",
  telemetry: TELEMETRY,
  span: "BatchUpdateFindings",
}));

export type BatchUpdateFindingsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about a customer's investigation into a finding. Delegated administrator accounts can update findings for their account and their member accounts. Member accounts can update findings for their own account.
 *
 * `BatchUpdateFindings` and `BatchUpdateFindingsV2` both use `securityhub:BatchUpdateFindings` in the `Action` element of an IAM policy statement.
 * You must have permission to perform the `securityhub:BatchUpdateFindings` action.
 * You can configure IAM policies to restrict access to specific finding fields or field values by using the `securityhub:OCSFSyntaxPath/` condition key, where `` is one of the following supported fields: `SeverityId`, `StatusId`, or `Comment`.
 *
 * To prevent a user from updating a specific field, use a `Null` condition with `securityhub:OCSFSyntaxPath/` set to `"false"`.
 * To prevent a user from setting a field to a specific value, use a `StringEquals` condition with `securityhub:OCSFSyntaxPath/` set to the disallowed value or list of values.
 *
 * Updates from `BatchUpdateFindingsV2` don't affect the value of `finding_info.modified_time`, `finding_info.modified_time_dt`, `time`, or `time_dt` for a finding.
 */
export const batchUpdateFindingsV2: API.OperationMethod<
  BatchUpdateFindingsV2Request & RegionInput,
  BatchUpdateFindingsV2Response,
  BatchUpdateFindingsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3266, __c102, 2) as any as S.Schema<BatchUpdateFindingsV2Request>,
  output: __S(3271, __c102, 7) as any as S.Schema<BatchUpdateFindingsV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFindingsV2",
  telemetry: TELEMETRY,
  span: "BatchUpdateFindingsV2",
}));

export type BatchUpdateStandardsControlAssociationsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * For a batch of security controls and standards, this operation updates the enablement status of a control in a standard.
 */
export const batchUpdateStandardsControlAssociations: API.OperationMethod<
  BatchUpdateStandardsControlAssociationsRequest & RegionInput,
  BatchUpdateStandardsControlAssociationsResponse,
  BatchUpdateStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3298, __c103, 2) as any as S.Schema<BatchUpdateStandardsControlAssociationsRequest>,
  output: __S(3301, __c103, 5) as any as S.Schema<BatchUpdateStandardsControlAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateStandardsControlAssociations",
  telemetry: TELEMETRY,
  span: "BatchUpdateStandardsControlAssociations",
}));

export type CancelExportJobV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a findings export job that is in progress. Security Hub transitions a running job to the `CANCELLED` state and returns the `ExportJobId` and its new `Status`. Canceling a job that is already in the `CANCELLED` state succeeds and returns the same result, so you can safely retry a cancel request.
 *
 * You can't cancel an export job that has already reached a terminal `SUCCEEDED` or `FAILED` state; in that case, this operation returns a `ConflictException`. If no export job matches the `ExportJobId` that you provide, this operation returns a `ResourceNotFoundException`.
 *
 * The `Status` value returned by this operation reflects the cancellation immediately, even though the job can take a short time to stop completely.
 */
export const cancelExportJobV2: API.OperationMethod<
  CancelExportJobV2Request & RegionInput,
  CancelExportJobV2Response,
  CancelExportJobV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<CancelExportJobV2Request>,
  output: __S(3329, __c104, 1) as any as S.Schema<CancelExportJobV2Response>,
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
  operationName: "CancelExportJobV2",
  telemetry: TELEMETRY,
  span: "CancelExportJobV2",
}));

export type CreateActionTargetError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a custom action target in Security Hub CSPM.
 *
 * You can use custom actions on findings and insights in Security Hub CSPM to trigger target actions
 * in Amazon CloudWatch Events.
 */
export const createActionTarget: API.OperationMethod<
  CreateActionTargetRequest & RegionInput,
  CreateActionTargetResponse,
  CreateActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<CreateActionTargetRequest>,
  output: __S(3392, __c106, 0) as any as S.Schema<CreateActionTargetResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActionTarget",
  telemetry: TELEMETRY,
  span: "CreateActionTarget",
}));

export type CreateAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables aggregation across Amazon Web Services Regions.
 */
export const createAggregatorV2: API.OperationMethod<
  CreateAggregatorV2Request & RegionInput,
  CreateAggregatorV2Response,
  CreateAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<CreateAggregatorV2Request>,
  output: __S(3456, __c108, 0) as any as S.Schema<CreateAggregatorV2Response>,
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
  operationName: "CreateAggregatorV2",
  telemetry: TELEMETRY,
  span: "CreateAggregatorV2",
}));

export type CreateAutomationRuleError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an automation rule based on input parameters.
 */
export const createAutomationRule: API.OperationMethod<
  CreateAutomationRuleRequest & RegionInput,
  CreateAutomationRuleResponse,
  CreateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<CreateAutomationRuleRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<CreateAutomationRuleResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomationRule",
  telemetry: TELEMETRY,
  span: "CreateAutomationRule",
}));

export type CreateAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a V2 automation rule.
 */
export const createAutomationRuleV2: API.OperationMethod<
  CreateAutomationRuleV2Request & RegionInput,
  CreateAutomationRuleV2Response,
  CreateAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<CreateAutomationRuleV2Request>,
  output: __S(3521, __c110, 1) as any as S.Schema<CreateAutomationRuleV2Response>,
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
  operationName: "CreateAutomationRuleV2",
  telemetry: TELEMETRY,
  span: "CreateAutomationRuleV2",
}));

export type CreateConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a configuration policy with the defined configuration. Only the Security Hub CSPM delegated administrator
 * can invoke this operation from the home Region.
 */
export const createConfigurationPolicy: API.OperationMethod<
  CreateConfigurationPolicyRequest & RegionInput,
  CreateConfigurationPolicyResponse,
  CreateConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<CreateConfigurationPolicyRequest>,
  output: __S(3781, __c118, 5) as any as S.Schema<CreateConfigurationPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationPolicy",
  telemetry: TELEMETRY,
  span: "CreateConfigurationPolicy",
}));

export type CreateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidAccessException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector to a third-party cloud provider in Security Hub CSPM. A connector establishes a connection between Security Hub CSPM and a third-party cloud provider, enabling Security Hub CSPM to ingest security findings and resource data from the connected environment.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest & RegionInput,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<CreateConnectorRequest>,
  output: __S(3809, __c119, 1) as any as S.Schema<CreateConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidAccessException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
  telemetry: TELEMETRY,
  span: "CreateConnector",
}));

export type CreateConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to create a connectorV2 based on input parameters.
 */
export const createConnectorV2: API.OperationMethod<
  CreateConnectorV2Request & RegionInput,
  CreateConnectorV2Response,
  CreateConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3938, __c123, 2) as any as S.Schema<CreateConnectorV2Request>,
  output: __S(3939, __c123, 3) as any as S.Schema<CreateConnectorV2Response>,
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
  operationName: "CreateConnectorV2",
  telemetry: TELEMETRY,
  span: "CreateConnectorV2",
}));

export type CreateFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Used to enable cross-Region aggregation. This operation can be invoked from the home Region only.
 *
 * For information about how cross-Region aggregation works, see Understanding cross-Region aggregation in Security Hub CSPM in the *Security Hub CSPM User Guide*.
 */
export const createFindingAggregator: API.OperationMethod<
  CreateFindingAggregatorRequest & RegionInput,
  CreateFindingAggregatorResponse,
  CreateFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<CreateFindingAggregatorRequest>,
  output: __S(4032, __c126, 0) as any as S.Schema<CreateFindingAggregatorResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFindingAggregator",
  telemetry: TELEMETRY,
  span: "CreateFindingAggregator",
}));

export type CreateInsightError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a custom insight in Security Hub CSPM. An insight is a consolidation of findings that relate
 * to a security issue that requires attention or remediation.
 *
 * To group the related findings in the insight, use the
 * `GroupByAttribute`.
 */
export const createInsight: API.OperationMethod<
  CreateInsightRequest & RegionInput,
  CreateInsightResponse,
  CreateInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<CreateInsightRequest>,
  output: __S(4096, __c128, 0) as any as S.Schema<CreateInsightResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInsight",
  telemetry: TELEMETRY,
  span: "CreateInsight",
}));

export type CreateMembersError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Creates a member association in Security Hub CSPM between the specified accounts and the account
 * used to make the request, which is the administrator account. If you are integrated with
 * Organizations, then the administrator account is designated by the organization management account.
 *
 * `CreateMembers` is always used to add accounts that are not organization
 * members.
 *
 * For accounts that are managed using Organizations, `CreateMembers` is only used
 * in the following cases:
 *
 * - Security Hub CSPM is not configured to automatically add new organization accounts.
 *
 * - The account was disassociated or deleted in Security Hub CSPM.
 *
 * This action can only be used by an account that has Security Hub CSPM enabled. To enable Security Hub CSPM, you
 * can use the `EnableSecurityHub` operation.
 *
 * For accounts that are not organization members, you create the account association and
 * then send an invitation to the member account. To send the invitation, you use the
 * `InviteMembers` operation. If the account owner accepts
 * the invitation, the account becomes a member account in Security Hub CSPM.
 *
 * Accounts that are managed using Organizations don't receive an invitation. They
 * automatically become a member account in Security Hub CSPM.
 *
 * - If the organization account does not have Security Hub CSPM enabled, then Security Hub CSPM and the default standards are automatically enabled. Note that Security Hub CSPM cannot be enabled automatically for the organization management account. The organization management account must enable Security Hub CSPM before the administrator account enables it as a member account.
 *
 * - For organization accounts that already have Security Hub CSPM enabled, Security Hub CSPM does not make any other changes to those accounts. It does not change their enabled standards or controls.
 *
 * A permissions policy is added that permits the administrator account to view the findings
 * generated in the member account.
 *
 * To remove the association between the administrator and member accounts, use the `DisassociateFromMasterAccount` or `DisassociateMembers` operation.
 */
export const createMembers: API.OperationMethod<
  CreateMembersRequest & RegionInput,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4162, __c130, 2) as any as S.Schema<CreateMembersRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<CreateMembersResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
  telemetry: TELEMETRY,
  span: "CreateMembers",
}));

export type CreateTicketV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to create a ticket in the chosen ITSM based on finding information for the provided finding metadata UID.
 */
export const createTicketV2: API.OperationMethod<
  CreateTicketV2Request & RegionInput,
  CreateTicketV2Response,
  CreateTicketV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<CreateTicketV2Request>,
  output: __S(4257, __c133, 1) as any as S.Schema<CreateTicketV2Response>,
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
  operationName: "CreateTicketV2",
  telemetry: TELEMETRY,
  span: "CreateTicketV2",
}));

export type DeclineInvitationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Declines invitations to become a Security Hub CSPM member account.
 *
 * A prospective member account uses this operation to decline an invitation to become a member.
 *
 * Only member accounts that aren't part of an Amazon Web Services organization should use this operation.
 * Organization accounts don't receive invitations.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest & RegionInput,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<DeclineInvitationsRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<DeclineInvitationsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
  telemetry: TELEMETRY,
  span: "DeclineInvitations",
}));

export type DeleteActionTargetError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a custom action target from Security Hub CSPM.
 *
 * Deleting a custom action target does not affect any findings or insights that were
 * already sent to Amazon CloudWatch Events using the custom action.
 */
export const deleteActionTarget: API.OperationMethod<
  DeleteActionTargetRequest & RegionInput,
  DeleteActionTargetResponse,
  DeleteActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<DeleteActionTargetRequest>,
  output: __S(3392, __c106, 0) as any as S.Schema<DeleteActionTargetResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActionTarget",
  telemetry: TELEMETRY,
  span: "DeleteActionTarget",
}));

export type DeleteAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the Aggregator V2.
 */
export const deleteAggregatorV2: API.OperationMethod<
  DeleteAggregatorV2Request & RegionInput,
  DeleteAggregatorV2Response,
  DeleteAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<DeleteAggregatorV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<DeleteAggregatorV2Response>,
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
  operationName: "DeleteAggregatorV2",
  telemetry: TELEMETRY,
  span: "DeleteAggregatorV2",
}));

export type DeleteAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a V2 automation rule.
 */
export const deleteAutomationRuleV2: API.OperationMethod<
  DeleteAutomationRuleV2Request & RegionInput,
  DeleteAutomationRuleV2Response,
  DeleteAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<DeleteAutomationRuleV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<DeleteAutomationRuleV2Response>,
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
  operationName: "DeleteAutomationRuleV2",
  telemetry: TELEMETRY,
  span: "DeleteAutomationRuleV2",
}));

export type DeleteConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a configuration policy. Only the Security Hub CSPM delegated administrator can invoke this operation
 * from the home Region. For the deletion to succeed, you must first disassociate a configuration policy from target accounts,
 * organizational units, or the root by invoking the `StartConfigurationPolicyDisassociation` operation.
 */
export const deleteConfigurationPolicy: API.OperationMethod<
  DeleteConfigurationPolicyRequest & RegionInput,
  DeleteConfigurationPolicyResponse,
  DeleteConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<DeleteConfigurationPolicyRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DeleteConfigurationPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationPolicy",
  telemetry: TELEMETRY,
  span: "DeleteConfigurationPolicy",
}));

export type DeleteConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidAccessException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a CSPM connector. When you delete a connector, Security Hub CSPM stops ingesting findings and resource data from the connected cloud provider environment.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest & RegionInput,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(4480, __c140, 0) as any as S.Schema<DeleteConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidAccessException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
  telemetry: TELEMETRY,
  span: "DeleteConnector",
}));

export type DeleteConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to delete a connectorV2.
 */
export const deleteConnectorV2: API.OperationMethod<
  DeleteConnectorV2Request & RegionInput,
  DeleteConnectorV2Response,
  DeleteConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<DeleteConnectorV2Request>,
  output: __S(4480, __c140, 0) as any as S.Schema<DeleteConnectorV2Response>,
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
  operationName: "DeleteConnectorV2",
  telemetry: TELEMETRY,
  span: "DeleteConnectorV2",
}));

export type DeleteFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Deletes a finding aggregator. When you delete the finding aggregator, you stop cross-Region aggregation. Finding replication stops
 * occurring from the linked Regions to the home Region.
 *
 * When you stop cross-Region aggregation, findings that were already replicated and sent to the home Region are still visible from
 * the home Region. However, new findings and finding updates are no longer replicated and sent to the home Region.
 */
export const deleteFindingAggregator: API.OperationMethod<
  DeleteFindingAggregatorRequest & RegionInput,
  DeleteFindingAggregatorResponse,
  DeleteFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<DeleteFindingAggregatorRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DeleteFindingAggregatorResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFindingAggregator",
  telemetry: TELEMETRY,
  span: "DeleteFindingAggregator",
}));

export type DeleteInsightError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the insight specified by the `InsightArn`.
 */
export const deleteInsight: API.OperationMethod<
  DeleteInsightRequest & RegionInput,
  DeleteInsightResponse,
  DeleteInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<DeleteInsightRequest>,
  output: __S(4096, __c128, 0) as any as S.Schema<DeleteInsightResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInsight",
  telemetry: TELEMETRY,
  span: "DeleteInsight",
}));

export type DeleteInvitationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Deletes invitations to become a Security Hub CSPM member account.
 *
 * A Security Hub CSPM administrator account can use this operation to delete invitations sent to one or more prospective member accounts.
 *
 * This operation is only used to delete invitations that are sent to prospective member accounts that aren't part of an Amazon Web Services organization.
 * Organization accounts don't receive invitations.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest & RegionInput,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<DeleteInvitationsRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<DeleteInvitationsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvitations",
  telemetry: TELEMETRY,
  span: "DeleteInvitations",
}));

export type DeleteMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified member accounts from Security Hub CSPM.
 *
 * You can invoke this API only to delete accounts that became members through invitation. You can't invoke this
 * API to delete accounts that belong to an Organizations organization.
 */
export const deleteMembers: API.OperationMethod<
  DeleteMembersRequest & RegionInput,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<DeleteMembersRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<DeleteMembersResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
  telemetry: TELEMETRY,
  span: "DeleteMembers",
}));

export type DescribeActionTargetsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of the custom action targets in Security Hub CSPM in your account.
 */
export const describeActionTargets: API.PaginatedOperationMethod<
  DescribeActionTargetsRequest & RegionInput,
  DescribeActionTargetsResponse,
  DescribeActionTargetsError,
  Credentials | HttpClient.HttpClient,
  ActionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<DescribeActionTargetsRequest>,
  output: __S(4675, __c146, 3) as any as S.Schema<DescribeActionTargetsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActionTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionTargets",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeActionTargets",
})) as any;

export type DescribeHubError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns details about the Hub resource in your account, including the
 * `HubArn` and the time when you enabled Security Hub CSPM.
 */
export const describeHub: API.OperationMethod<
  DescribeHubRequest & RegionInput,
  DescribeHubResponse,
  DescribeHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4704, __c147, 0) as any as S.Schema<DescribeHubRequest>,
  output: __S(4705, __c147, 1) as any as S.Schema<DescribeHubResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHub",
  telemetry: TELEMETRY,
  span: "DescribeHub",
}));

export type DescribeOrganizationConfigurationError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns information about the way your organization is configured in Security Hub CSPM. Only the
 * Security Hub CSPM administrator account can invoke this operation.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest & RegionInput,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<DescribeOrganizationConfigurationRequest>,
  output: __S(4737, __c148, 1) as any as S.Schema<DescribeOrganizationConfigurationResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
  telemetry: TELEMETRY,
  span: "DescribeOrganizationConfiguration",
}));

export type DescribeProductsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns information about product integrations in Security Hub CSPM.
 *
 * You can optionally provide an integration ARN. If you provide an integration ARN, then
 * the results only include that integration.
 *
 * If you don't provide an integration ARN, then the results include all of the available
 * product integrations.
 */
export const describeProducts: API.PaginatedOperationMethod<
  DescribeProductsRequest & RegionInput,
  DescribeProductsResponse,
  DescribeProductsError,
  Credentials | HttpClient.HttpClient,
  Product
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4800, __c150, 0) as any as S.Schema<DescribeProductsRequest>,
  output: __S(4803, __c150, 3) as any as S.Schema<DescribeProductsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProducts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Products",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeProducts",
})) as any;

export type DescribeProductsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the product integration.
 */
export const describeProductsV2: API.PaginatedOperationMethod<
  DescribeProductsV2Request & RegionInput,
  DescribeProductsV2Response,
  DescribeProductsV2Error,
  Credentials | HttpClient.HttpClient,
  ProductV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4864, __c152, 0) as any as S.Schema<DescribeProductsV2Request>,
  output: __S(4867, __c152, 3) as any as S.Schema<DescribeProductsV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductsV2",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeProductsV2",
})) as any;

export type DescribeSecurityHubV2Error =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about the service resource in your account.
 */
export const describeSecurityHubV2: API.OperationMethod<
  DescribeSecurityHubV2Request & RegionInput,
  DescribeSecurityHubV2Response,
  DescribeSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4896, __c153, 0) as any as S.Schema<DescribeSecurityHubV2Request>,
  output: __S(4899, __c153, 3) as any as S.Schema<DescribeSecurityHubV2Response>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityHubV2",
  telemetry: TELEMETRY,
  span: "DescribeSecurityHubV2",
}));

export type DescribeStandardsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of the available standards in Security Hub CSPM.
 *
 * For each standard, the results include the standard ARN, the name, and a description.
 */
export const describeStandards: API.PaginatedOperationMethod<
  DescribeStandardsRequest & RegionInput,
  DescribeStandardsResponse,
  DescribeStandardsError,
  Credentials | HttpClient.HttpClient,
  Standard
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4928, __c154, 0) as any as S.Schema<DescribeStandardsRequest>,
  output: __S(4932, __c154, 4) as any as S.Schema<DescribeStandardsResponse>,
  errors: [InternalException, InvalidAccessException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStandards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Standards",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeStandards",
})) as any;

export type DescribeStandardsControlsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of security standards controls.
 *
 * For each control, the results include information about whether it is currently enabled,
 * the severity, and a link to remediation information.
 *
 * This operation returns an empty list for standard subscriptions where `StandardsControlsUpdatable` has value `NOT_READY_FOR_UPDATES`.
 */
export const describeStandardsControls: API.PaginatedOperationMethod<
  DescribeStandardsControlsRequest & RegionInput,
  DescribeStandardsControlsResponse,
  DescribeStandardsControlsError,
  Credentials | HttpClient.HttpClient,
  StandardsControl
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4960, __c155, 0) as any as S.Schema<DescribeStandardsControlsRequest>,
  output: __S(4963, __c155, 3) as any as S.Schema<DescribeStandardsControlsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStandardsControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Controls",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeStandardsControls",
})) as any;

export type DisableImportFindingsForProductError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables the integration of the specified product with Security Hub CSPM. After the integration is
 * disabled, findings from that product are no longer sent to Security Hub CSPM.
 */
export const disableImportFindingsForProduct: API.OperationMethod<
  DisableImportFindingsForProductRequest & RegionInput,
  DisableImportFindingsForProductResponse,
  DisableImportFindingsForProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4992, __c156, 0) as any as S.Schema<DisableImportFindingsForProductRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisableImportFindingsForProductResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableImportFindingsForProduct",
  telemetry: TELEMETRY,
  span: "DisableImportFindingsForProduct",
}));

export type DisableOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Disables a Security Hub CSPM administrator account. Can only be called by the organization
 * management account.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest & RegionInput,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5024, __c157, 0) as any as S.Schema<DisableOrganizationAdminAccountRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisableOrganizationAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
  telemetry: TELEMETRY,
  span: "DisableOrganizationAdminAccount",
}));

export type DisableSecurityHubError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables Security Hub CSPM in your account only in the current Amazon Web Services Region. To disable Security Hub CSPM in all
 * Regions, you must submit one request per Region where you have enabled Security Hub CSPM.
 *
 * You can't disable Security Hub CSPM in an account that is currently the Security Hub CSPM administrator.
 *
 * When you disable Security Hub CSPM, your existing findings and insights and any Security Hub CSPM configuration
 * settings are deleted after 90 days and cannot be recovered. Any standards that were enabled
 * are disabled, and your administrator and member account associations are removed.
 *
 * If you want to save your existing findings, you must export them before you disable
 * Security Hub CSPM.
 */
export const disableSecurityHub: API.OperationMethod<
  DisableSecurityHubRequest & RegionInput,
  DisableSecurityHubResponse,
  DisableSecurityHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5056, __c158, 0) as any as S.Schema<DisableSecurityHubRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisableSecurityHubResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSecurityHub",
  telemetry: TELEMETRY,
  span: "DisableSecurityHub",
}));

export type DisableSecurityHubFeatureV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables an opt-in feature for the calling account in the current Amazon Web Services Region. The operation is idempotent. If the feature is already disabled, no changes are made. You cannot disable a feature that is managed by an organization policy.
 */
export const disableSecurityHubFeatureV2: API.OperationMethod<
  DisableSecurityHubFeatureV2Request & RegionInput,
  DisableSecurityHubFeatureV2Response,
  DisableSecurityHubFeatureV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5088, __c159, 0) as any as S.Schema<DisableSecurityHubFeatureV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisableSecurityHubFeatureV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSecurityHubFeatureV2",
  telemetry: TELEMETRY,
  span: "DisableSecurityHubFeatureV2",
}));

export type DisableSecurityHubV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disable the service for the current Amazon Web Services Region or specified Amazon Web Services Region. Disabling the service also disables all opt-in features that are currently enabled in that Region.
 */
export const disableSecurityHubV2: API.OperationMethod<
  DisableSecurityHubV2Request & RegionInput,
  DisableSecurityHubV2Response,
  DisableSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5120, __c160, 0) as any as S.Schema<DisableSecurityHubV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisableSecurityHubV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSecurityHubV2",
  telemetry: TELEMETRY,
  span: "DisableSecurityHubV2",
}));

export type DisassociateFromAdministratorAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the current Security Hub CSPM member account from the associated administrator
 * account.
 *
 * This operation is only used by accounts that are not part of an organization. For
 * organization accounts, only the administrator account can
 * disassociate a member account.
 */
export const disassociateFromAdministratorAccount: API.OperationMethod<
  DisassociateFromAdministratorAccountRequest & RegionInput,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5152, __c161, 0) as any as S.Schema<DisassociateFromAdministratorAccountRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisassociateFromAdministratorAccountResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromAdministratorAccount",
  telemetry: TELEMETRY,
  span: "DisassociateFromAdministratorAccount",
}));

export type DisassociateFromMasterAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This method is deprecated. Instead, use `DisassociateFromAdministratorAccount`.
 *
 * The Security Hub CSPM console continues to use `DisassociateFromMasterAccount`. It will eventually change to use `DisassociateFromAdministratorAccount`. Any IAM policies that specifically control access to this function must continue to use `DisassociateFromMasterAccount`. You should also add `DisassociateFromAdministratorAccount` to your policies to ensure that the correct permissions are in place after the console begins to use `DisassociateFromAdministratorAccount`.
 *
 * Disassociates the current Security Hub CSPM member account from the associated administrator
 * account.
 *
 * This operation is only used by accounts that are not part of an organization. For
 * organization accounts, only the administrator account can
 * disassociate a member account.
 */
export const disassociateFromMasterAccount: API.OperationMethod<
  DisassociateFromMasterAccountRequest & RegionInput,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5184, __c162, 0) as any as S.Schema<DisassociateFromMasterAccountRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisassociateFromMasterAccountResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromMasterAccount",
  telemetry: TELEMETRY,
  span: "DisassociateFromMasterAccount",
}));

export type DisassociateMembersError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified member accounts from the associated administrator account.
 *
 * Can be used to disassociate both accounts that are managed using Organizations and accounts that
 * were invited manually.
 */
export const disassociateMembers: API.OperationMethod<
  DisassociateMembersRequest & RegionInput,
  DisassociateMembersResponse,
  DisassociateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5216, __c163, 0) as any as S.Schema<DisassociateMembersRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<DisassociateMembersResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembers",
  telemetry: TELEMETRY,
  span: "DisassociateMembers",
}));

export type EnableImportFindingsForProductError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Enables the integration of a partner product with Security Hub CSPM. Integrated products send
 * findings to Security Hub CSPM.
 *
 * When you enable a product integration, a permissions policy that grants permission for
 * the product to send findings to Security Hub CSPM is applied.
 */
export const enableImportFindingsForProduct: API.OperationMethod<
  EnableImportFindingsForProductRequest & RegionInput,
  EnableImportFindingsForProductResponse,
  EnableImportFindingsForProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5248, __c164, 0) as any as S.Schema<EnableImportFindingsForProductRequest>,
  output: __S(5249, __c164, 1) as any as S.Schema<EnableImportFindingsForProductResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableImportFindingsForProduct",
  telemetry: TELEMETRY,
  span: "EnableImportFindingsForProduct",
}));

export type EnableOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Designates the Security Hub CSPM administrator account for an organization. Can only be called by
 * the organization management account.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest & RegionInput,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5280, __c165, 0) as any as S.Schema<EnableOrganizationAdminAccountRequest>,
  output: __S(5281, __c165, 1) as any as S.Schema<EnableOrganizationAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
  telemetry: TELEMETRY,
  span: "EnableOrganizationAdminAccount",
}));

export type EnableSecurityHubError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | LimitExceededException
  | ResourceConflictException
  | CommonErrors;
/**
 * Enables Security Hub CSPM for your account in the current Region or the Region you specify in the
 * request.
 *
 * When you enable Security Hub CSPM, you grant to Security Hub CSPM the permissions necessary to gather findings
 * from other services that are integrated with Security Hub CSPM.
 *
 * When you use the `EnableSecurityHub` operation to enable Security Hub CSPM, you also
 * automatically enable the following standards:
 *
 * - Center for Internet Security (CIS) Amazon Web Services Foundations Benchmark v1.2.0
 *
 * - Amazon Web Services Foundational Security Best Practices
 *
 * Other standards are not automatically enabled.
 *
 * To opt out of automatically enabled standards, set
 * `EnableDefaultStandards` to `false`.
 *
 * After you enable Security Hub CSPM, to enable a standard, use the `BatchEnableStandards` operation. To disable a standard, use the
 * `BatchDisableStandards` operation.
 *
 * To learn more, see the setup information in the *Security Hub CSPM User Guide*.
 */
export const enableSecurityHub: API.OperationMethod<
  EnableSecurityHubRequest & RegionInput,
  EnableSecurityHubResponse,
  EnableSecurityHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5312, __c166, 0) as any as S.Schema<EnableSecurityHubRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<EnableSecurityHubResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    LimitExceededException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSecurityHub",
  telemetry: TELEMETRY,
  span: "EnableSecurityHub",
}));

export type EnableSecurityHubFeatureV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables an opt-in feature for the calling account in the current Amazon Web Services Region. The service must be enabled before you can enable a feature. The operation is idempotent. If the feature is already enabled, no changes are made. You cannot enable a feature that is managed by an organization policy.
 */
export const enableSecurityHubFeatureV2: API.OperationMethod<
  EnableSecurityHubFeatureV2Request & RegionInput,
  EnableSecurityHubFeatureV2Response,
  EnableSecurityHubFeatureV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5344, __c167, 0) as any as S.Schema<EnableSecurityHubFeatureV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<EnableSecurityHubFeatureV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSecurityHubFeatureV2",
  telemetry: TELEMETRY,
  span: "EnableSecurityHubFeatureV2",
}));

export type EnableSecurityHubV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables the service in account for the current Amazon Web Services Region or specified Amazon Web Services Region.
 */
export const enableSecurityHubV2: API.OperationMethod<
  EnableSecurityHubV2Request & RegionInput,
  EnableSecurityHubV2Response,
  EnableSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5376, __c168, 0) as any as S.Schema<EnableSecurityHubV2Request>,
  output: __S(5377, __c168, 1) as any as S.Schema<EnableSecurityHubV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSecurityHubV2",
  telemetry: TELEMETRY,
  span: "EnableSecurityHubV2",
}));

export type GenerateRecommendedPolicyV2Error =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Begins the recommended policy generation to remediate a Security Hub finding.
 * `GenerateRecommendedPolicyV2` only supports findings for unused permissions.
 */
export const generateRecommendedPolicyV2: API.OperationMethod<
  GenerateRecommendedPolicyV2Request & RegionInput,
  GenerateRecommendedPolicyV2Response,
  GenerateRecommendedPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5408, __c169, 0) as any as S.Schema<GenerateRecommendedPolicyV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<GenerateRecommendedPolicyV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateRecommendedPolicyV2",
  telemetry: TELEMETRY,
  span: "GenerateRecommendedPolicyV2",
}));

export type GetAdministratorAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides the details for the Security Hub CSPM administrator account for the current member account.
 *
 * Can be used by both member accounts that are managed using Organizations and accounts that were
 * invited manually.
 */
export const getAdministratorAccount: API.OperationMethod<
  GetAdministratorAccountRequest & RegionInput,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5440, __c170, 0) as any as S.Schema<GetAdministratorAccountRequest>,
  output: __S(5441, __c170, 1) as any as S.Schema<GetAdministratorAccountResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdministratorAccount",
  telemetry: TELEMETRY,
  span: "GetAdministratorAccount",
}));

export type GetAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the configuration of the specified Aggregator V2.
 */
export const getAggregatorV2: API.OperationMethod<
  GetAggregatorV2Request & RegionInput,
  GetAggregatorV2Response,
  GetAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5504, __c172, 0) as any as S.Schema<GetAggregatorV2Request>,
  output: __S(3456, __c108, 0) as any as S.Schema<GetAggregatorV2Response>,
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
  operationName: "GetAggregatorV2",
  telemetry: TELEMETRY,
  span: "GetAggregatorV2",
}));

export type GetAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an automation rule for the V2 service.
 */
export const getAutomationRuleV2: API.OperationMethod<
  GetAutomationRuleV2Request & RegionInput,
  GetAutomationRuleV2Response,
  GetAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5536, __c173, 0) as any as S.Schema<GetAutomationRuleV2Request>,
  output: __S(5537, __c173, 1) as any as S.Schema<GetAutomationRuleV2Response>,
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
  operationName: "GetAutomationRuleV2",
  telemetry: TELEMETRY,
  span: "GetAutomationRuleV2",
}));

export type GetConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides information about a configuration policy. Only the Security Hub CSPM delegated administrator can invoke
 * this operation from the home Region.
 */
export const getConfigurationPolicy: API.OperationMethod<
  GetConfigurationPolicyRequest & RegionInput,
  GetConfigurationPolicyResponse,
  GetConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5568, __c174, 0) as any as S.Schema<GetConfigurationPolicyRequest>,
  output: __S(3781, __c118, 5) as any as S.Schema<GetConfigurationPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationPolicy",
  telemetry: TELEMETRY,
  span: "GetConfigurationPolicy",
}));

export type GetConfigurationPolicyAssociationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the association between a configuration and a target account, organizational unit, or the root. The
 * configuration can be a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can
 * invoke this operation from the home Region.
 */
export const getConfigurationPolicyAssociation: API.OperationMethod<
  GetConfigurationPolicyAssociationRequest & RegionInput,
  GetConfigurationPolicyAssociationResponse,
  GetConfigurationPolicyAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5600, __c175, 0) as any as S.Schema<GetConfigurationPolicyAssociationRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<GetConfigurationPolicyAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationPolicyAssociation",
  telemetry: TELEMETRY,
  span: "GetConfigurationPolicyAssociation",
}));

export type GetConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidAccessException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details for a CSPM connector based on the connector ID.
 */
export const getConnector: API.OperationMethod<
  GetConnectorRequest & RegionInput,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5632, __c176, 0) as any as S.Schema<GetConnectorRequest>,
  output: __S(5633, __c176, 1) as any as S.Schema<GetConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidAccessException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnector",
  telemetry: TELEMETRY,
  span: "GetConnector",
}));

export type GetConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to retrieve details for a connectorV2 based on connector id.
 */
export const getConnectorV2: API.OperationMethod<
  GetConnectorV2Request & RegionInput,
  GetConnectorV2Response,
  GetConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5696, __c178, 0) as any as S.Schema<GetConnectorV2Request>,
  output: __S(5697, __c178, 1) as any as S.Schema<GetConnectorV2Response>,
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
  operationName: "GetConnectorV2",
  telemetry: TELEMETRY,
  span: "GetConnectorV2",
}));

export type GetEnabledStandardsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of the standards that are currently enabled.
 */
export const getEnabledStandards: API.PaginatedOperationMethod<
  GetEnabledStandardsRequest & RegionInput,
  GetEnabledStandardsResponse,
  GetEnabledStandardsError,
  Credentials | HttpClient.HttpClient,
  StandardsSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5760, __c180, 0) as any as S.Schema<GetEnabledStandardsRequest>,
  output: __S(5761, __c180, 1) as any as S.Schema<GetEnabledStandardsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnabledStandards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StandardsSubscriptions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetEnabledStandards",
})) as any;

export type GetExportJobV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a single findings export job, including its current `Status`, the `Destination` it writes to, the `OutputConfiguration` it was started with, and its `StartedAt` and `EndedAt` timestamps. Use this operation to poll an export job that you started with `StartExportJobV2` until it reaches a terminal state (`SUCCEEDED`, `FAILED`, or `CANCELLED`).
 *
 * If the job failed, the response includes a `FailureCode` and `FailureMessage` that describe the reason. Input values such as `Scopes` and `Filters` are echoed back as they were submitted, with relative date ranges returned unresolved. If no export job matches the `ExportJobId` that you provide, this operation returns a `ResourceNotFoundException`.
 */
export const getExportJobV2: API.OperationMethod<
  GetExportJobV2Request & RegionInput,
  GetExportJobV2Response,
  GetExportJobV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5792, __c181, 0) as any as S.Schema<GetExportJobV2Request>,
  output: __S(5793, __c181, 1) as any as S.Schema<GetExportJobV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJobV2",
  telemetry: TELEMETRY,
  span: "GetExportJobV2",
}));

export type GetFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Returns the current configuration in the calling account for cross-Region aggregation. A finding aggregator is a resource that establishes
 * the home Region and any linked Regions.
 */
export const getFindingAggregator: API.OperationMethod<
  GetFindingAggregatorRequest & RegionInput,
  GetFindingAggregatorResponse,
  GetFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5920, __c185, 0) as any as S.Schema<GetFindingAggregatorRequest>,
  output: __S(4032, __c126, 0) as any as S.Schema<GetFindingAggregatorResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingAggregator",
  telemetry: TELEMETRY,
  span: "GetFindingAggregator",
}));

export type GetFindingHistoryError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns the history of a Security Hub CSPM finding. The history includes changes made to any fields in
 * the Amazon Web Services Security Finding Format (ASFF) except top-level timestamp fields, such as the `CreatedAt` and
 * `UpdatedAt` fields.
 *
 * This operation might return fewer results than the maximum number of results (`MaxResults`) specified in a request, even
 * when more results are available. If this occurs, the response includes a `NextToken` value, which you should use to retrieve
 * the next set of results in the response. The presence of a `NextToken` value in a response doesn't necessarily indicate
 * that the results are incomplete. However, you should continue to specify a `NextToken` value until you receive a
 * response that doesn't include this value.
 */
export const getFindingHistory: API.PaginatedOperationMethod<
  GetFindingHistoryRequest & RegionInput,
  GetFindingHistoryResponse,
  GetFindingHistoryError,
  Credentials | HttpClient.HttpClient,
  FindingHistoryRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5952, __c186, 0) as any as S.Schema<GetFindingHistoryRequest>,
  output: __S(5958, __c186, 6) as any as S.Schema<GetFindingHistoryResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetFindingHistory",
})) as any;

export type GetFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of findings that match the specified criteria.
 *
 * If cross-Region aggregation is enabled, then when you call `GetFindings` from the home Region, the results include all of the matching findings from both the home Region and linked Regions.
 */
export const getFindings: API.PaginatedOperationMethod<
  GetFindingsRequest & RegionInput,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient,
  AwsSecurityFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5984, __c187, 0) as any as S.Schema<GetFindingsRequest>,
  output: __S(5985, __c187, 1) as any as S.Schema<GetFindingsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Findings",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetFindings",
})) as any;

export type GetFindingStatisticsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns aggregated statistical data about findings.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you aggregate findings from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * `GetFindingStatisticsV2` uses `securityhub:GetAdhocInsightResults` in the `Action` element of an IAM policy statement.
 * You must have permission to perform the `securityhub:GetAdhocInsightResults` action.
 */
export const getFindingStatisticsV2: API.OperationMethod<
  GetFindingStatisticsV2Request & RegionInput,
  GetFindingStatisticsV2Response,
  GetFindingStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6050, __c189, 2) as any as S.Schema<GetFindingStatisticsV2Request>,
  output: __S(6084, __c190, 4) as any as S.Schema<GetFindingStatisticsV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingStatisticsV2",
  telemetry: TELEMETRY,
  span: "GetFindingStatisticsV2",
}));

export type GetFindingsTrendsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns findings trend data based on the specified criteria. This operation helps you analyze patterns and changes in findings over time.
 */
export const getFindingsTrendsV2: API.PaginatedOperationMethod<
  GetFindingsTrendsV2Request & RegionInput,
  GetFindingsTrendsV2Response,
  GetFindingsTrendsV2Error,
  Credentials | HttpClient.HttpClient,
  TrendsMetricsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6115, __c191, 3) as any as S.Schema<GetFindingsTrendsV2Request>,
  output: __S(6120, __c191, 8) as any as S.Schema<GetFindingsTrendsV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsTrendsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrendsMetrics",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetFindingsTrendsV2",
})) as any;

export type GetFindingsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of findings that match the specified criteria.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you retrieve findings from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * You can use the `Filters` parameter to refine results based on finding attributes. You can use `Scopes` and `Filters` independently or together. When both are provided, `Scopes` narrows the data set first, and then `Filters` refines results within that scoped data set.
 *
 * `GetFindings` and `GetFindingsV2` both use `securityhub:GetFindings` in the `Action` element of an IAM policy statement.
 * You must have permission to perform the `securityhub:GetFindings` action.
 */
export const getFindingsV2: API.PaginatedOperationMethod<
  GetFindingsV2Request & RegionInput,
  GetFindingsV2Response,
  GetFindingsV2Error,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6144, __c192, 0) as any as S.Schema<GetFindingsV2Request>,
  output: __S(6146, __c192, 2) as any as S.Schema<GetFindingsV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Findings",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetFindingsV2",
})) as any;

export type GetInsightResultsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the results of the Security Hub CSPM insight specified by the insight ARN.
 */
export const getInsightResults: API.OperationMethod<
  GetInsightResultsRequest & RegionInput,
  GetInsightResultsResponse,
  GetInsightResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6176, __c193, 0) as any as S.Schema<GetInsightResultsRequest>,
  output: __S(6180, __c193, 4) as any as S.Schema<GetInsightResultsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightResults",
  telemetry: TELEMETRY,
  span: "GetInsightResults",
}));

export type GetInsightsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists and describes insights for the specified insight ARNs.
 */
export const getInsights: API.PaginatedOperationMethod<
  GetInsightsRequest & RegionInput,
  GetInsightsResponse,
  GetInsightsError,
  Credentials | HttpClient.HttpClient,
  Insight
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6208, __c194, 0) as any as S.Schema<GetInsightsRequest>,
  output: __S(6211, __c194, 3) as any as S.Schema<GetInsightsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Insights",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetInsights",
})) as any;

export type GetInvitationsCountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Returns the count of all Security Hub CSPM membership invitations that were sent to the
 * calling member account, not including the currently accepted invitation.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest & RegionInput,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6240, __c195, 0) as any as S.Schema<GetInvitationsCountRequest>,
  output: __S(6241, __c195, 1) as any as S.Schema<GetInvitationsCountResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
  telemetry: TELEMETRY,
  span: "GetInvitationsCount",
}));

export type GetMasterAccountError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This method is deprecated. Instead, use `GetAdministratorAccount`.
 *
 * The Security Hub CSPM console continues to use `GetMasterAccount`. It will eventually change to use `GetAdministratorAccount`. Any IAM policies that specifically control access to this function must continue to use `GetMasterAccount`. You should also add `GetAdministratorAccount` to your policies to ensure that the correct permissions are in place after the console begins to use `GetAdministratorAccount`.
 *
 * Provides the details for the Security Hub CSPM administrator account for the current member account.
 *
 * Can be used by both member accounts that are managed using Organizations and accounts that were
 * invited manually.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest & RegionInput,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6272, __c196, 0) as any as S.Schema<GetMasterAccountRequest>,
  output: __S(6273, __c196, 1) as any as S.Schema<GetMasterAccountResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMasterAccount",
  telemetry: TELEMETRY,
  span: "GetMasterAccount",
}));

export type GetMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the details for the Security Hub CSPM member accounts for the specified account IDs.
 *
 * An administrator account can be either the delegated Security Hub CSPM administrator account for an
 * organization or an administrator account that enabled Security Hub CSPM manually.
 *
 * The results include both member accounts that are managed using Organizations and accounts that
 * were invited manually.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest & RegionInput,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6304, __c197, 0) as any as S.Schema<GetMembersRequest>,
  output: __S(6305, __c197, 1) as any as S.Schema<GetMembersResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
  telemetry: TELEMETRY,
  span: "GetMembers",
}));

export type GetRecommendedPolicyV2Error =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the recommended policy to remediate a Security Hub finding.
 * `GetRecommendedPolicyV2` only supports findings for unused permissions.
 */
export const getRecommendedPolicyV2: API.PaginatedOperationMethod<
  GetRecommendedPolicyV2Request & RegionInput,
  GetRecommendedPolicyV2Response,
  GetRecommendedPolicyV2Error,
  Credentials | HttpClient.HttpClient,
  RecommendationStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6368, __c199, 0) as any as S.Schema<GetRecommendedPolicyV2Request>,
  output: __S(6372, __c199, 4) as any as S.Schema<GetRecommendedPolicyV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendedPolicyV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecommendationSteps",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetRecommendedPolicyV2",
})) as any;

export type GetRemediationsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves remediation targets for the account, or for all member accounts if the caller is
 * the delegated administrator. Results are sorted by priority, highest first, and are paginated.
 * Use `TargetUid` or `MetadataUid` to scope the request to a single target
 * or finding.
 */
export const getRemediationsV2: API.PaginatedOperationMethod<
  GetRemediationsV2Request & RegionInput,
  GetRemediationsV2Response,
  GetRemediationsV2Error,
  Credentials | HttpClient.HttpClient,
  RemediationV2Item
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6405, __c200, 5) as any as S.Schema<GetRemediationsV2Request>,
  output: __S(6421, __c200, 21) as any as S.Schema<GetRemediationsV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemediationsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetRemediationsV2",
})) as any;

export type GetResourcesStatisticsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves statistical information about Amazon Web Services resources and their associated security findings.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you aggregate resources from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * If you set `GroupByField` to `ResourceSubCategory`, `ResourceInfo.AIDetails.HostResourceType`, or `ResourceInfo.AIDetails.CanonicalId`, you must include a `ResourceCategory` string filter with comparison set to `EQUALS` and value `AI/ML` in the corresponding `ResourceGroupByRule`.
 */
export const getResourcesStatisticsV2: API.OperationMethod<
  GetResourcesStatisticsV2Request & RegionInput,
  GetResourcesStatisticsV2Response,
  GetResourcesStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6466, __c202, 2) as any as S.Schema<GetResourcesStatisticsV2Request>,
  output: __S(6084, __c190, 4) as any as S.Schema<GetResourcesStatisticsV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesStatisticsV2",
  telemetry: TELEMETRY,
  span: "GetResourcesStatisticsV2",
}));

export type GetResourcesTrendsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns resource trend data based on the specified criteria. This operation helps you analyze patterns and changes in resource compliance over time.
 */
export const getResourcesTrendsV2: API.PaginatedOperationMethod<
  GetResourcesTrendsV2Request & RegionInput,
  GetResourcesTrendsV2Response,
  GetResourcesTrendsV2Error,
  Credentials | HttpClient.HttpClient,
  ResourcesTrendsMetricsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6499, __c203, 3) as any as S.Schema<GetResourcesTrendsV2Request>,
  output: __S(6504, __c203, 8) as any as S.Schema<GetResourcesTrendsV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesTrendsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrendsMetrics",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetResourcesTrendsV2",
})) as any;

export type GetResourcesV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of resources.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`, which lets you retrieve resources from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * You can use the `Filters` parameter to refine results based on resource attributes. You can use `Scopes` and `Filters` independently or together. When both are provided, `Scopes` narrows the data set first, and then `Filters` refines results within that scoped data set.
 *
 * For AI/ML resources, the response includes the `ResourceSubCategory` field. For self-hosted AI resources and their host resources, the response also includes `ResourceInfo` with AI-specific details. Self-hosted AI resources use a `ResourceType` with the `SelfHosted::AI::` prefix, such as `SelfHosted::AI::Model`, `SelfHosted::AI::Agent`, `SelfHosted::AI::InferenceEndpoint`, and `SelfHosted::AI::ExternalEndpoint`.
 *
 * If you filter by `ResourceSubCategory`, you must also include a `ResourceCategory` string filter with comparison set to `EQUALS` and value `AI/ML` in the same request.
 */
export const getResourcesV2: API.PaginatedOperationMethod<
  GetResourcesV2Request & RegionInput,
  GetResourcesV2Response,
  GetResourcesV2Error,
  Credentials | HttpClient.HttpClient,
  ResourceResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(6528, __c204, 0) as any as S.Schema<GetResourcesV2Request>,
  output: __S(6538, __c204, 10) as any as S.Schema<GetResourcesV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetResourcesV2",
})) as any;

export type GetSecurityControlDefinitionError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the definition of a security control. The definition includes the control title, description, Region availability, parameter definitions, and other details.
 */
export const getSecurityControlDefinition: API.OperationMethod<
  GetSecurityControlDefinitionRequest & RegionInput,
  GetSecurityControlDefinitionResponse,
  GetSecurityControlDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6560, __c205, 0) as any as S.Schema<GetSecurityControlDefinitionRequest>,
  output: __S(6561, __c205, 1) as any as S.Schema<GetSecurityControlDefinitionResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityControlDefinition",
  telemetry: TELEMETRY,
  span: "GetSecurityControlDefinition",
}));

export type GetSoftwareResourcesV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of resources that contain a specific software package. You identify the package with `PackageName` and `PackageType`. To narrow the results to one version of the package, include `PackageVersion`.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`. With `AwsOrganizations`, you can retrieve resources from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * You can use the `Filters` parameter to further refine results based on resource attributes, such as `ResourceType` or `Region`.
 *
 * This operation returns paginated results. To retrieve additional results, use the `NextToken` value from the previous response.
 */
export const getSoftwareResourcesV2: API.PaginatedOperationMethod<
  GetSoftwareResourcesV2Request & RegionInput,
  GetSoftwareResourcesV2Response,
  GetSoftwareResourcesV2Error,
  Credentials | HttpClient.HttpClient,
  SoftwareResourceResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetSoftwareResourcesV2Request>,
  output: __S(3, __c0, 3) as any as S.Schema<GetSoftwareResourcesV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareResourcesV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SoftwareResources",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetSoftwareResourcesV2",
})) as any;

export type GetSoftwareStatisticsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves aggregated counts of software packages installed on your resources, grouped by a field that you specify. For example, you can return the most common package types or the accounts with the most installed packages.
 *
 * Each count is the number of package-to-resource pairs that match the grouping value. A package installed on three resources contributes three to the count.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`. With `AwsOrganizations`, you can aggregate software from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * This operation doesn't paginate. Use `MaxStatisticResults` to control how many grouping values are returned.
 */
export const getSoftwareStatisticsV2: API.OperationMethod<
  GetSoftwareStatisticsV2Request & RegionInput,
  GetSoftwareStatisticsV2Response,
  GetSoftwareStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(66, __c2, 2) as any as S.Schema<GetSoftwareStatisticsV2Request>,
  output: __S(6084, __c190, 4) as any as S.Schema<GetSoftwareStatisticsV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareStatisticsV2",
  telemetry: TELEMETRY,
  span: "GetSoftwareStatisticsV2",
}));

export type GetSoftwareV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of software packages installed on your resources. Each result identifies a package by name, version, and type, and includes the number of resources that contain that package.
 *
 * You can use the `Scopes` parameter to define the data boundary for the query. Currently, `Scopes` supports `AwsOrganizations`. With `AwsOrganizations`, you can retrieve software from your entire organization or from specific organizational units. Only the delegated administrator account can use `Scopes`.
 *
 * You can use the `Filters` parameter to refine results based on package and resource attributes. You can use `Scopes` and `Filters` independently or together. When both are provided, `Scopes` narrows the data set first, and then `Filters` refines results within that scoped data set.
 *
 * To list the resources that contain a specific package, use `GetSoftwareResourcesV2`. To get counts of software grouped by a field, use `GetSoftwareStatisticsV2`.
 *
 * This operation returns paginated results. To retrieve additional results, use the `NextToken` value from the previous response.
 */
export const getSoftwareV2: API.PaginatedOperationMethod<
  GetSoftwareV2Request & RegionInput,
  GetSoftwareV2Response,
  GetSoftwareV2Error,
  Credentials | HttpClient.HttpClient,
  SoftwareResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<GetSoftwareV2Request>,
  output: __S(99, __c3, 3) as any as S.Schema<GetSoftwareV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Software",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetSoftwareV2",
})) as any;

export type InviteMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Invites other Amazon Web Services accounts to become member accounts for the Security Hub CSPM administrator account that
 * the invitation is sent from.
 *
 * This operation is only used to invite accounts that don't belong to an Amazon Web Services organization.
 * Organization accounts don't receive invitations.
 *
 * Before you can use this action to invite a member, you must first use the `CreateMembers` action to create the member account in Security Hub CSPM.
 *
 * When the account owner enables Security Hub CSPM and accepts the invitation to become a member
 * account, the administrator account can view the findings generated in the member account.
 */
export const inviteMembers: API.OperationMethod<
  InviteMembersRequest & RegionInput,
  InviteMembersResponse,
  InviteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<InviteMembersRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<InviteMembersResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteMembers",
  telemetry: TELEMETRY,
  span: "InviteMembers",
}));

export type ListAggregatorsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of V2 aggregators.
 */
export const listAggregatorsV2: API.PaginatedOperationMethod<
  ListAggregatorsV2Request & RegionInput,
  ListAggregatorsV2Response,
  ListAggregatorsV2Error,
  Credentials | HttpClient.HttpClient,
  AggregatorV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<ListAggregatorsV2Request>,
  output: __S(163, __c5, 3) as any as S.Schema<ListAggregatorsV2Response>,
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
  operationName: "ListAggregatorsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregatorsV2",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAggregatorsV2",
})) as any;

export type ListAutomationRulesError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * A list of automation rules and their metadata for the calling account.
 */
export const listAutomationRules: API.OperationMethod<
  ListAutomationRulesRequest & RegionInput,
  ListAutomationRulesResponse,
  ListAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<ListAutomationRulesRequest>,
  output: __S(195, __c6, 3) as any as S.Schema<ListAutomationRulesResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRules",
  telemetry: TELEMETRY,
  span: "ListAutomationRules",
}));

export type ListAutomationRulesV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of automation rules and metadata for the calling account.
 */
export const listAutomationRulesV2: API.OperationMethod<
  ListAutomationRulesV2Request & RegionInput,
  ListAutomationRulesV2Response,
  ListAutomationRulesV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<ListAutomationRulesV2Request>,
  output: __S(229, __c7, 5) as any as S.Schema<ListAutomationRulesV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRulesV2",
  telemetry: TELEMETRY,
  span: "ListAutomationRulesV2",
}));

export type ListConfigurationPoliciesError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the configuration policies that the Security Hub CSPM delegated administrator has created for your
 * organization. Only the delegated administrator can invoke this operation from the home Region.
 */
export const listConfigurationPolicies: API.PaginatedOperationMethod<
  ListConfigurationPoliciesRequest & RegionInput,
  ListConfigurationPoliciesResponse,
  ListConfigurationPoliciesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<ListConfigurationPoliciesRequest>,
  output: __S(259, __c8, 3) as any as S.Schema<ListConfigurationPoliciesResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationPolicySummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConfigurationPolicies",
})) as any;

export type ListConfigurationPolicyAssociationsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides information about the associations for your configuration policies and self-managed behavior. Only the
 * Security Hub CSPM delegated administrator can invoke this operation from the home Region.
 */
export const listConfigurationPolicyAssociations: API.PaginatedOperationMethod<
  ListConfigurationPolicyAssociationsRequest & RegionInput,
  ListConfigurationPolicyAssociationsResponse,
  ListConfigurationPolicyAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationPolicyAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(289, __c9, 1) as any as S.Schema<ListConfigurationPolicyAssociationsRequest>,
  output: __S(290, __c9, 2) as any as S.Schema<ListConfigurationPolicyAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationPolicyAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationPolicyAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConfigurationPolicyAssociations",
})) as any;

export type ListConnectorsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidAccessException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the CSPM connectors and their metadata for the calling account.
 */
export const listConnectors: API.OperationMethod<
  ListConnectorsRequest & RegionInput,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<ListConnectorsRequest>,
  output: __S(324, __c10, 4) as any as S.Schema<ListConnectorsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidAccessException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  telemetry: TELEMETRY,
  span: "ListConnectors",
}));

export type ListConnectorsV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to retrieve a list of connectorsV2 and their metadata for the calling account.
 */
export const listConnectorsV2: API.OperationMethod<
  ListConnectorsV2Request & RegionInput,
  ListConnectorsV2Response,
  ListConnectorsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<ListConnectorsV2Request>,
  output: __S(356, __c11, 4) as any as S.Schema<ListConnectorsV2Response>,
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
  operationName: "ListConnectorsV2",
  telemetry: TELEMETRY,
  span: "ListConnectorsV2",
}));

export type ListEnabledProductsForImportError =
  | InternalException
  | InvalidAccessException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists all findings-generating solutions (products) that you are subscribed to receive
 * findings from in Security Hub CSPM.
 */
export const listEnabledProductsForImport: API.PaginatedOperationMethod<
  ListEnabledProductsForImportRequest & RegionInput,
  ListEnabledProductsForImportResponse,
  ListEnabledProductsForImportError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<ListEnabledProductsForImportRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<ListEnabledProductsForImportResponse>,
  errors: [InternalException, InvalidAccessException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnabledProductsForImport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductSubscriptions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEnabledProductsForImport",
})) as any;

export type ListExportJobsV2Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the findings export jobs in your account as a paginated list of `ExportSummary` objects. You can filter the results by job `Status` or `DataType`.
 *
 * To page through the results, use the `MaxResults` and `NextToken` parameters. If the response includes a `NextToken` value, pass it in a subsequent request to retrieve the next page of results.
 *
 * Each `ExportSummary` reports the output `Format` of the job but not its full `OutputConfiguration`. To retrieve the filters and selected fields that a job was started with, call `GetExportJobV2`.
 */
export const listExportJobsV2: API.PaginatedOperationMethod<
  ListExportJobsV2Request & RegionInput,
  ListExportJobsV2Response,
  ListExportJobsV2Error,
  Credentials | HttpClient.HttpClient,
  ExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<ListExportJobsV2Request>,
  output: __S(421, __c13, 5) as any as S.Schema<ListExportJobsV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportJobsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListExportJobsV2",
})) as any;

export type ListExposuresByRemediationV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the exposure findings tied to a specific remediation target. Results are sorted by
 * previous severity, highest first, and are paginated.
 */
export const listExposuresByRemediationV2: API.PaginatedOperationMethod<
  ListExposuresByRemediationV2Request & RegionInput,
  ListExposuresByRemediationV2Response,
  ListExposuresByRemediationV2Error,
  Credentials | HttpClient.HttpClient,
  ExposureFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<ListExposuresByRemediationV2Request>,
  output: __S(451, __c14, 3) as any as S.Schema<ListExposuresByRemediationV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExposuresByRemediationV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListExposuresByRemediationV2",
})) as any;

export type ListFindingAggregatorsError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * If cross-Region aggregation is enabled, then `ListFindingAggregators` returns the Amazon Resource Name (ARN)
 * of the finding aggregator. You can run this operation from any Amazon Web Services Region.
 */
export const listFindingAggregators: API.PaginatedOperationMethod<
  ListFindingAggregatorsRequest & RegionInput,
  ListFindingAggregatorsResponse,
  ListFindingAggregatorsError,
  Credentials | HttpClient.HttpClient,
  FindingAggregator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<ListFindingAggregatorsRequest>,
  output: __S(483, __c15, 3) as any as S.Schema<ListFindingAggregatorsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindingAggregators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FindingAggregators",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFindingAggregators",
})) as any;

export type ListFreeTrialStatusesV2Error =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the free trial status of Security Hub features. A delegated Security Hub administrator can list the status for accounts in its organization. Any other account can list the status only for itself. Free trial status remains available after a feature is disabled.
 */
export const listFreeTrialStatusesV2: API.PaginatedOperationMethod<
  ListFreeTrialStatusesV2Request & RegionInput,
  ListFreeTrialStatusesV2Response,
  ListFreeTrialStatusesV2Error,
  Credentials | HttpClient.HttpClient,
  AccountFreeTrialStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<ListFreeTrialStatusesV2Request>,
  output: __S(517, __c16, 5) as any as S.Schema<ListFreeTrialStatusesV2Response>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFreeTrialStatusesV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountFreeTrialStatuses",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFreeTrialStatusesV2",
})) as any;

export type ListInvitationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * We recommend using Organizations instead of Security Hub CSPM invitations to manage your member accounts.
 * For information, see Managing Security Hub CSPM administrator and member accounts with Organizations
 * in the *Security Hub CSPM User Guide*.
 *
 * Lists all Security Hub CSPM membership invitations that were sent to the calling account.
 *
 * Only accounts that are managed by invitation can use this operation.
 * Accounts that are managed using the integration with Organizations don't receive invitations.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest & RegionInput,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  Invitation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<ListInvitationsRequest>,
  output: __S(546, __c17, 2) as any as S.Schema<ListInvitationsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Invitations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListInvitations",
})) as any;

export type ListMembersError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists details about all member accounts for the current Security Hub CSPM administrator
 * account.
 *
 * The results include both member accounts that belong to an organization and member
 * accounts that were invited manually.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest & RegionInput,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<ListMembersRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<ListMembersResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Members",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMembers",
})) as any;

export type ListOrganizationAdminAccountsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the Security Hub CSPM administrator accounts. Can only be called by the organization
 * management account.
 */
export const listOrganizationAdminAccounts: API.PaginatedOperationMethod<
  ListOrganizationAdminAccountsRequest & RegionInput,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListOrganizationAdminAccountsRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<ListOrganizationAdminAccountsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOrganizationAdminAccounts",
})) as any;

export type ListSecurityControlDefinitionsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists all of the security controls that apply to a specified standard.
 */
export const listSecurityControlDefinitions: API.PaginatedOperationMethod<
  ListSecurityControlDefinitionsRequest & RegionInput,
  ListSecurityControlDefinitionsResponse,
  ListSecurityControlDefinitionsError,
  Credentials | HttpClient.HttpClient,
  SecurityControlDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<ListSecurityControlDefinitionsRequest>,
  output: __S(642, __c20, 2) as any as S.Schema<ListSecurityControlDefinitionsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityControlDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityControlDefinitions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSecurityControlDefinitions",
})) as any;

export type ListStandardsControlAssociationsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | CommonErrors;
/**
 * Specifies whether a control is currently enabled or disabled in each enabled standard in the calling account.
 *
 * This operation omits standards control associations for standard subscriptions where `StandardsControlsUpdatable` has value `NOT_READY_FOR_UPDATES`.
 */
export const listStandardsControlAssociations: API.PaginatedOperationMethod<
  ListStandardsControlAssociationsRequest & RegionInput,
  ListStandardsControlAssociationsResponse,
  ListStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient,
  StandardsControlAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<ListStandardsControlAssociationsRequest>,
  output: __S(675, __c21, 3) as any as S.Schema<ListStandardsControlAssociationsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStandardsControlAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StandardsControlAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListStandardsControlAssociations",
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type RegisterConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to complete the authorization based on input parameters.
 */
export const registerConnectorV2: API.OperationMethod<
  RegisterConnectorV2Request & RegionInput,
  RegisterConnectorV2Response,
  RegisterConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<RegisterConnectorV2Request>,
  output: __S(737, __c23, 1) as any as S.Schema<RegisterConnectorV2Response>,
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
  operationName: "RegisterConnectorV2",
  telemetry: TELEMETRY,
  span: "RegisterConnectorV2",
}));

export type StartConfigurationPolicyAssociationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates a target account, organizational unit, or the root with a specified configuration. The target can be
 * associated with a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can
 * invoke this operation from the home Region.
 */
export const startConfigurationPolicyAssociation: API.OperationMethod<
  StartConfigurationPolicyAssociationRequest & RegionInput,
  StartConfigurationPolicyAssociationResponse,
  StartConfigurationPolicyAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<StartConfigurationPolicyAssociationRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<StartConfigurationPolicyAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationPolicyAssociation",
  telemetry: TELEMETRY,
  span: "StartConfigurationPolicyAssociation",
}));

export type StartConfigurationPolicyDisassociationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a target account, organizational unit, or the root from a specified configuration. When you
 * disassociate a configuration from its target, the target inherits the configuration of the closest parent. If there's no
 * configuration to inherit, the target retains its settings but becomes a self-managed account. A target can be disassociated from
 * a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can invoke this
 * operation from the home Region.
 */
export const startConfigurationPolicyDisassociation: API.OperationMethod<
  StartConfigurationPolicyDisassociationRequest & RegionInput,
  StartConfigurationPolicyDisassociationResponse,
  StartConfigurationPolicyDisassociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<StartConfigurationPolicyDisassociationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<StartConfigurationPolicyDisassociationResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationPolicyDisassociation",
  telemetry: TELEMETRY,
  span: "StartConfigurationPolicyDisassociation",
}));

export type StartExportJobV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OrganizationalUnitNotFoundException
  | OrganizationNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an ad hoc export job that writes Security Hub findings to an Amazon Simple Storage Service (Amazon S3) bucket that you own. Because the export runs asynchronously, this operation returns only the `ExportJobId` of the new job; it doesn't wait for the export to finish. Use `GetExportJobV2` to poll the job, and `ListExportJobsV2` to view the export jobs in your account.
 *
 * Security Hub allows only one export job in the `RUNNING` state per account at a time. If an export job is already running, this operation returns a `ServiceQuotaExceededException`. Wait for the running job to finish, or cancel it with `CancelExportJobV2`, before you start a new one.
 *
 * Specify the destination bucket and Amazon Web Services Key Management Service (Amazon Web Services KMS) key in the `Destination` parameter, and the output format (`CSV` or `OCSF_JSON`), optional filters, and field selection in the `OutputConfiguration` parameter. Before you call this operation, you must grant Security Hub permission to write to your bucket and use your Amazon Web Services KMS key by adding the bucket policy and key policy statements shown in the Examples section.
 *
 * Two identities use your Amazon Web Services KMS key, and each needs its own permission. Security Hub uses the key when it writes the export objects to your bucket. The IAM principal that calls `StartExportJobV2` must also have `kms:GenerateDataKey` and `kms:Decrypt` permissions on the key. The Examples section shows both grants.
 *
 * A delegated administrator can use the optional `Scopes` parameter to export findings for specific organizations or organizational units (OUs).
 *
 * To make the request idempotent, provide a `ClientToken`. If you retry a `StartExportJobV2` request with the same `ClientToken` and the same request parameters, Security Hub returns the `ExportJobId` of the original job instead of starting a new one. If you reuse a `ClientToken` with different request parameters, this operation returns a `ConflictException`.
 */
export const startExportJobV2: API.OperationMethod<
  StartExportJobV2Request & RegionInput,
  StartExportJobV2Response,
  StartExportJobV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<StartExportJobV2Request>,
  output: __S(833, __c26, 1) as any as S.Schema<StartExportJobV2Response>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OrganizationalUnitNotFoundException,
    OrganizationNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportJobV2",
  telemetry: TELEMETRY,
  span: "StartExportJobV2",
}));

export type TagResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateActionTargetError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the name and description of a custom action target in Security Hub CSPM.
 */
export const updateActionTarget: API.OperationMethod<
  UpdateActionTargetRequest & RegionInput,
  UpdateActionTargetResponse,
  UpdateActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<UpdateActionTargetRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateActionTargetResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionTarget",
  telemetry: TELEMETRY,
  span: "UpdateActionTarget",
}));

export type UpdateAggregatorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Udpates the configuration for the Aggregator V2.
 */
export const updateAggregatorV2: API.OperationMethod<
  UpdateAggregatorV2Request & RegionInput,
  UpdateAggregatorV2Response,
  UpdateAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<UpdateAggregatorV2Request>,
  output: __S(3456, __c108, 0) as any as S.Schema<UpdateAggregatorV2Response>,
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
  operationName: "UpdateAggregatorV2",
  telemetry: TELEMETRY,
  span: "UpdateAggregatorV2",
}));

export type UpdateAutomationRuleV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a V2 automation rule.
 */
export const updateAutomationRuleV2: API.OperationMethod<
  UpdateAutomationRuleV2Request & RegionInput,
  UpdateAutomationRuleV2Response,
  UpdateAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<UpdateAutomationRuleV2Request>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateAutomationRuleV2Response>,
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
  operationName: "UpdateAutomationRuleV2",
  telemetry: TELEMETRY,
  span: "UpdateAutomationRuleV2",
}));

export type UpdateConfigurationPolicyError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a configuration policy. Only the Security Hub CSPM delegated
 * administrator can invoke this operation from the home Region.
 */
export const updateConfigurationPolicy: API.OperationMethod<
  UpdateConfigurationPolicyRequest & RegionInput,
  UpdateConfigurationPolicyResponse,
  UpdateConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<UpdateConfigurationPolicyRequest>,
  output: __S(3781, __c118, 5) as any as S.Schema<UpdateConfigurationPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationPolicy",
  telemetry: TELEMETRY,
  span: "UpdateConfigurationPolicy",
}));

export type UpdateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidAccessException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a CSPM connector's configuration, such as the scope or regions for the connected cloud provider.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest & RegionInput,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1057, __c33, 1) as any as S.Schema<UpdateConnectorRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<UpdateConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidAccessException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
  telemetry: TELEMETRY,
  span: "UpdateConnector",
}));

export type UpdateConnectorV2Error =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grants permission to update a connectorV2 based on its id and input parameters.
 */
export const updateConnectorV2: API.OperationMethod<
  UpdateConnectorV2Request & RegionInput,
  UpdateConnectorV2Response,
  UpdateConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1122, __c35, 2) as any as S.Schema<UpdateConnectorV2Request>,
  output: __S(1089, __c34, 1) as any as S.Schema<UpdateConnectorV2Response>,
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
  operationName: "UpdateConnectorV2",
  telemetry: TELEMETRY,
  span: "UpdateConnectorV2",
}));

export type UpdateFindingAggregatorError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The *aggregation Region* is now called the *home Region*.
 *
 * Updates cross-Region aggregation settings. You can use this operation to update the Region linking mode and the list
 * of included or excluded Amazon Web Services Regions. However, you can't use this operation to change the home Region.
 *
 * You can invoke this operation from the current home Region only.
 */
export const updateFindingAggregator: API.OperationMethod<
  UpdateFindingAggregatorRequest & RegionInput,
  UpdateFindingAggregatorResponse,
  UpdateFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateFindingAggregatorRequest>,
  output: __S(4032, __c126, 0) as any as S.Schema<UpdateFindingAggregatorResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindingAggregator",
  telemetry: TELEMETRY,
  span: "UpdateFindingAggregator",
}));

export type UpdateFindingsError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * `UpdateFindings` is a deprecated operation. Instead of `UpdateFindings`, use
 * the `BatchUpdateFindings` operation.
 *
 * The `UpdateFindings` operation updates the `Note` and `RecordState` of the Security Hub CSPM aggregated
 * findings that the filter attributes specify. Any member account that can view the finding
 * can also see the update to the finding.
 *
 * Finding updates made with `UpdateFindings` aren't persisted if the same finding is later updated by the
 * finding provider through the `BatchImportFindings` operation. In addition, Security Hub CSPM doesn't
 * record updates made with `UpdateFindings` in the finding history.
 */
export const updateFindings: API.OperationMethod<
  UpdateFindingsRequest & RegionInput,
  UpdateFindingsResponse,
  UpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<UpdateFindingsRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateFindingsResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindings",
  telemetry: TELEMETRY,
  span: "UpdateFindings",
}));

export type UpdateInsightError =
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the Security Hub CSPM insight identified by the specified insight ARN.
 */
export const updateInsight: API.OperationMethod<
  UpdateInsightRequest & RegionInput,
  UpdateInsightResponse,
  UpdateInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<UpdateInsightRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateInsightResponse>,
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInsight",
  telemetry: TELEMETRY,
  span: "UpdateInsight",
}));

export type UpdateOrganizationConfigurationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the configuration of your organization in Security Hub CSPM. Only the
 * Security Hub CSPM administrator account can invoke this operation.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest & RegionInput,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<UpdateOrganizationConfigurationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateOrganizationConfiguration",
}));

export type UpdateSecurityControlError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the properties of a security control.
 */
export const updateSecurityControl: API.OperationMethod<
  UpdateSecurityControlRequest & RegionInput,
  UpdateSecurityControlResponse,
  UpdateSecurityControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<UpdateSecurityControlRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateSecurityControlResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityControl",
  telemetry: TELEMETRY,
  span: "UpdateSecurityControl",
}));

export type UpdateSecurityHubConfigurationError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates configuration options for Security Hub CSPM.
 */
export const updateSecurityHubConfiguration: API.OperationMethod<
  UpdateSecurityHubConfigurationRequest & RegionInput,
  UpdateSecurityHubConfigurationResponse,
  UpdateSecurityHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<UpdateSecurityHubConfigurationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateSecurityHubConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityHubConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateSecurityHubConfiguration",
}));

export type UpdateStandardsControlError =
  | AccessDeniedException
  | InternalException
  | InvalidAccessException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Used to control whether an individual security standard control is enabled or
 * disabled.
 *
 * Calls to this operation return a `RESOURCE_NOT_FOUND_EXCEPTION` error when the standard subscription for the control has `StandardsControlsUpdatable` value `NOT_READY_FOR_UPDATES`.
 */
export const updateStandardsControl: API.OperationMethod<
  UpdateStandardsControlRequest & RegionInput,
  UpdateStandardsControlResponse,
  UpdateStandardsControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<UpdateStandardsControlRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateStandardsControlResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStandardsControl",
  telemetry: TELEMETRY,
  span: "UpdateStandardsControl",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageName: S.optional(S.String),
          PackageType: S.optional(S.String),
          PackageVersion: S.optional(S.String),
          Filters: S.optional(__S(34, __c1, 2)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortCriteria: S.optional(__S(6017, __c188, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/softwarev2/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSoftwareResourcesV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Region: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceProvider: S.optional(S.String),
          ResourceOwnerOrgId: S.optional(S.String),
          ResourceOwnerAccountId: S.optional(S.String),
          ResourceCloudPartition: S.optional(S.String),
          ResourceRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwareResourceResult" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SoftwareResources: S.optional(__S(2, __c0, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSoftwareResourcesV2Response" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StringFilters: S.optional(__S(3617, __c113, 1)),
          NestedCompositeFilters: S.optional(
            S.suspend(() => __S(33, __c1, 1)).annotate({
              identifier: "SoftwareCompositeFilterList",
            }),
          ),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwareCompositeFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<SoftwareCompositeFilter> => __S(32, __c1, 0)).annotate(
          { identifier: "SoftwareCompositeFilter" },
        ),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          CompositeFilters: S.optional(__S(33, __c1, 1)),
          CompositeOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwareFilters" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupByField: S.optional(S.String), Filters: S.optional(__S(34, __c1, 2)) }),
      ).annotate({ identifier: "SoftwareGroupByRule" });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GroupByRules: S.optional(__S(65, __c2, 1)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortOrder: S.optional(S.String),
          MaxStatisticResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/softwarev2/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSoftwareStatisticsV2Request" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(34, __c1, 2)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortCriteria: S.optional(__S(6017, __c188, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/softwarev2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSoftwareV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PackageName: S.optional(S.String),
          PackageVersion: S.optional(S.String),
          PackageType: S.optional(S.String),
          ResourceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SoftwareResult" });
    case 2:
      return S.Array(__S(97, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Software: S.optional(__S(98, __c3, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetSoftwareV2Response" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/members/invite" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InviteMembersRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/aggregatorv2/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAggregatorsV2Request" });
    case 1:
      return S.suspend(() => S.Struct({ AggregatorV2Arn: S.optional(S.String) })).annotate({
        identifier: "AggregatorV2",
      });
    case 2:
      return S.Array(__S(161, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AggregatorsV2: S.optional(__S(162, __c5, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAggregatorsV2Response" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automationrules/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAutomationRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleArn: S.optional(S.String),
          RuleStatus: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          RuleName: S.optional(S.String),
          Description: S.optional(S.String),
          IsTerminal: S.optional(S.Boolean),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomationRulesMetadata" });
    case 2:
      return S.Array(__S(193, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutomationRulesMetadata: S.optional(__S(194, __c6, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationRulesResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automationrulesv2/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAutomationRulesV2Request" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.optional(S.String) })).annotate({
        identifier: "AutomationRulesActionTypeObjectV2",
      });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RuleArn: S.optional(S.String),
          RuleId: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          RuleName: S.optional(S.String),
          RuleStatus: S.optional(S.String),
          Description: S.optional(S.String),
          Actions: S.optional(__S(226, __c7, 2)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AutomationRulesMetadataV2" });
    case 4:
      return S.Array(__S(227, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Rules: S.optional(__S(228, __c7, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAutomationRulesV2Response" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/configurationPolicy/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ServiceEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ConfigurationPolicySummary" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicySummaries: S.optional(__S(258, __c8, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationPoliciesResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyId: S.optional(S.String),
          AssociationType: S.optional(S.String),
          AssociationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociationFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationPolicyAssociation/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationPolicyAssociationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyAssociationSummaries: S.optional(__S(2048, __c64, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationPolicyAssociationsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          ProviderName: S.optional(S.String).pipe(T.HttpQuery("ProviderName")),
          ConnectorStatus: S.optional(S.String).pipe(T.HttpQuery("ConnectorStatus")),
          EnablementStatus: S.optional(S.String).pipe(T.HttpQuery("EnablementStatus")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/connectors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProviderName: S.optional(S.String),
          ConnectorStatus: S.optional(S.String),
          ProviderConfiguration: S.optional(__S(3904, __c122, 0)),
        }),
      ).annotate({ identifier: "CspmProviderSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ProviderSummary: S.optional(__S(321, __c10, 1)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedBy: S.optional(S.String),
          EnablementStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CspmConnectorSummary" });
    case 3:
      return S.Array(__S(322, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Connectors: S.optional(__S(323, __c10, 3)) }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          ProviderName: S.optional(S.String).pipe(T.HttpQuery("ProviderName")),
          ConnectorStatus: S.optional(S.String).pipe(T.HttpQuery("ConnectorStatus")),
          EnablementStatus: S.optional(S.String).pipe(T.HttpQuery("EnablementStatus")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/connectorsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectorsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProviderName: S.optional(S.String),
          ConnectorStatus: S.optional(S.String),
          ProviderConfiguration: S.optional(__S(5730, __c179, 2)),
        }),
      ).annotate({ identifier: "ProviderSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ProviderSummary: S.optional(__S(353, __c11, 1)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EnablementStatus: S.optional(S.String),
          EnablementStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorSummary" });
    case 3:
      return S.Array(__S(354, __c11, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Connectors: S.optional(__S(355, __c11, 3)) }),
      ).annotate({ identifier: "ListConnectorsV2Response" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/productSubscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnabledProductsForImportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductSubscriptions: S.optional(__S(1504, __c47, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEnabledProductsForImportResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
          DataType: S.optional(S.String).pipe(T.HttpQuery("DataType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/exportjobsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListExportJobsV2Request" });
    case 1:
      return S.suspend(() => S.Struct({ Format: S.optional(S.String) })).annotate({
        identifier: "FindingsOutputSummary",
      });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ Findings: __S(417, __c13, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          ExportJobId: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          DataType: S.optional(S.String),
          OutputConfiguration: S.optional(__S(418, __c13, 2)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          Destination: S.optional(__S(5825, __c182, 1)),
          FailureCode: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExportSummary" });
    case 4:
      return S.Array(__S(419, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(420, __c13, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExportJobsV2Response" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetUid: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListExposuresByRemediationV2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExposuresByRemediationV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MetadataUid: S.optional(S.String),
          Title: S.optional(S.String),
          PreviousSeverity: S.optional(S.String),
          ProjectedSeverity: S.optional(S.String),
          Impact: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExposureFinding" });
    case 2:
      return S.Array(__S(449, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__S(450, __c14, 2)),
          TargetUid: S.optional(S.String),
          Resource: S.optional(__S(6432, __c201, 0)),
          TotalCount: S.optional(S.Number),
          Trait: S.optional(__S(6433, __c201, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListExposuresByRemediationV2Response" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/findingAggregator/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFindingAggregatorsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ FindingAggregatorArn: S.optional(S.String) })).annotate({
        identifier: "FindingAggregator",
      });
    case 2:
      return S.Array(__S(481, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FindingAggregators: S.optional(__S(482, __c15, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFindingAggregatorsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountIds: S.optional(__S(1504, __c47, 0)),
          Statuses: S.optional(__S(4832, __c151, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/freetrial/statusv2/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFreeTrialStatusesV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FeatureType: S.optional(S.String),
          Status: S.optional(S.String),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "FreeTrialStatus" });
    case 2:
      return S.Array(__S(513, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          EvaluatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FreeTrialStatuses: S.optional(__S(514, __c16, 2)),
        }),
      ).annotate({ identifier: "AccountFreeTrialStatus" });
    case 4:
      return S.Array(__S(515, __c16, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AccountFreeTrialStatuses: S.optional(__S(516, __c16, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFreeTrialStatusesV2Response" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/invitations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInvitationsRequest" });
    case 1:
      return S.Array(__S(5472, __c171, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Invitations: S.optional(__S(545, __c17, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInvitationsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OnlyAssociated: S.optional(S.Boolean).pipe(T.HttpQuery("OnlyAssociated")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/members" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Members: S.optional(__S(6337, __c198, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMembersResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          Feature: S.optional(S.String).pipe(T.HttpQuery("Feature")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/organization/admin" }),
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
        S.Struct({ AccountId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AdminAccount" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AdminAccounts: S.optional(__S(610, __c19, 2)),
          NextToken: S.optional(S.String),
          Feature: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOrganizationAdminAccountsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardsArn: S.optional(S.String).pipe(T.HttpQuery("StandardsArn")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          Providers: S.optional(__S(4832, __c151, 0)).pipe(T.HttpQuery("Providers")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/securityControls/definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityControlDefinitionsRequest" });
    case 1:
      return S.Array(__S(6602, __c206, 10));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SecurityControlDefinitions: S.optional(__S(641, __c20, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityControlDefinitionsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String).pipe(T.HttpQuery("SecurityControlId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/associations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListStandardsControlAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StandardsArn: S.optional(S.String),
          SecurityControlId: S.optional(S.String),
          SecurityControlArn: S.optional(S.String),
          AssociationStatus: S.optional(S.String),
          RelatedRequirements: S.optional(__S(1504, __c47, 0)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedReason: S.optional(S.String),
          StandardsControlTitle: S.optional(S.String),
          StandardsControlDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "StandardsControlAssociationSummary" });
    case 2:
      return S.Array(__S(673, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StandardsControlAssociationSummaries: S.optional(__S(674, __c21, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListStandardsControlAssociationsResponse" });
  }
}
function __c22(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(1664, __c52, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AuthCode: S.optional(S.String), AuthState: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/connectorsv2/register" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterConnectorV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConnectorArn: S.optional(S.String), ConnectorId: S.optional(S.String) }),
      ).annotate({ identifier: "RegisterConnectorV2Response" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyIdentifier: S.optional(S.String),
          Target: S.optional(__S(2112, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationPolicyAssociation/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartConfigurationPolicyAssociationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Target: S.optional(__S(2112, __c66, 0)),
          ConfigurationPolicyIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationPolicyAssociation/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartConfigurationPolicyDisassociationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Destination: S.optional(__S(5825, __c182, 1)),
          OutputConfiguration: S.optional(__S(5857, __c183, 1)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/exportjobsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartExportJobV2Request" });
    case 1:
      return S.suspend(() => S.Struct({ ExportJobId: S.optional(S.String) })).annotate({
        identifier: "StartExportJobV2Response",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__S(1664, __c52, 0)),
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__S(1504, __c47, 0)).pipe(T.HttpQuery("tagKeys")),
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActionTargetArn: S.String.pipe(T.HttpLabel("ActionTargetArn")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/actionTargets/{ActionTargetArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateActionTargetRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AggregatorV2Arn: S.String.pipe(T.HttpLabel("AggregatorV2Arn")),
          RegionLinkingMode: S.optional(S.String),
          LinkedRegions: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/aggregatorv2/update/{AggregatorV2Arn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAggregatorV2Request" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          RuleStatus: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          Description: S.optional(S.String),
          RuleName: S.optional(S.String),
          Criteria: S.optional(__S(3584, __c112, 0)),
          Actions: S.optional(__S(3589, __c112, 5)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/automationrulesv2/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAutomationRuleV2Request" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          UpdatedReason: S.optional(S.String),
          ConfigurationPolicy: S.optional(__S(3780, __c118, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/configurationPolicy/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationPolicyRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(1088, __c34, 0) })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")),
          Description: S.optional(S.String),
          Provider: S.optional(__S(1056, __c33, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/connectors/{ConnectorId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectorRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScopeConfiguration: S.optional(__S(3872, __c121, 0)),
          AzureRegions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AzureUpdateConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConnectorStatus: S.optional(S.String), EnablementStatus: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateConnectorResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SecretArn: S.optional(S.String) })).annotate({
        identifier: "ServiceNowUpdateConfiguration",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ JiraCloud: __S(3968, __c124, 0) }),
        /*@__PURE__*/ S.Struct({ ServiceNow: __S(1120, __c35, 0) }),
        /*@__PURE__*/ S.Struct({ Azure: __S(1088, __c34, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")),
          Description: S.optional(S.String),
          Provider: S.optional(__S(1121, __c35, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/connectorsv2/{ConnectorId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectorV2Request" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FindingAggregatorArn: S.optional(S.String),
          RegionLinkingMode: S.optional(S.String),
          Regions: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/findingAggregator/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFindingAggregatorRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(4130, __c129, 2)),
          Note: S.optional(__S(1856, __c58, 0)),
          RecordState: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "PATCH", uri: "/findings" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFindingsRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InsightArn: S.String.pipe(T.HttpLabel("InsightArn")),
          Name: S.optional(S.String),
          Filters: S.optional(__S(4130, __c129, 2)),
          GroupByAttribute: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/insights/{InsightArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateInsightRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoEnable: S.optional(S.Boolean),
          AutoEnableStandards: S.optional(S.String),
          OrganizationConfiguration: S.optional(__S(4768, __c149, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organization/configuration" }),
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
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String),
          Parameters: S.optional(__S(2210, __c69, 2)),
          LastUpdateReason: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/securityControl/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSecurityControlRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoEnableControls: S.optional(S.Boolean),
          ControlFindingGenerator: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "PATCH", uri: "/accounts" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSecurityHubConfigurationRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardsControlArn: S.String.pipe(T.HttpLabel("StandardsControlArn")),
          ControlStatus: S.optional(S.String),
          DisabledReason: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/standards/control/{StandardsControlArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStandardsControlRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdministratorId: S.optional(S.String),
          InvitationId: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/administrator" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptAdministratorInvitationRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptAdministratorInvitationResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MasterId: S.optional(S.String), InvitationId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/master" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptInvitationRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutomationRulesArns: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automationrules/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteAutomationRulesRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleArn: S.optional(S.String),
          ErrorCode: S.optional(S.Number),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedAutomationRule" });
    case 1:
      return S.Array(__S(1536, __c48, 0));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcessedAutomationRules: S.optional(__S(1504, __c47, 0)),
          UnprocessedAutomationRules: S.optional(__S(1537, __c48, 1)),
        }),
      ).annotate({ identifier: "BatchDeleteAutomationRulesResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StandardsSubscriptionArns: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/standards/deregister" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDisableStandardsRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StandardsSubscriptions: S.optional(__S(1698, __c53, 2)) }),
      ).annotate({ identifier: "BatchDisableStandardsResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ StatusReasonCode: S.optional(S.String) })).annotate({
        identifier: "StandardsStatusReason",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StandardsSubscriptionArn: S.optional(S.String),
          StandardsArn: S.optional(S.String),
          StandardsInput: S.optional(__S(1664, __c52, 0)),
          StandardsStatus: S.optional(S.String),
          StandardsControlsUpdatable: S.optional(S.String),
          StandardsStatusReason: S.optional(__S(1696, __c53, 0)),
          Provider: S.optional(S.String),
        }),
      ).annotate({ identifier: "StandardsSubscription" });
    case 2:
      return S.Array(__S(1697, __c53, 1));
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardsArn: S.optional(S.String),
          StandardsInput: S.optional(__S(1664, __c52, 0)),
        }),
      ).annotate({ identifier: "StandardsSubscriptionRequest" });
    case 1:
      return S.Array(__S(1728, __c54, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ StandardsSubscriptionRequests: S.optional(__S(1729, __c54, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/standards/register" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchEnableStandardsRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutomationRulesArns: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automationrules/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetAutomationRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleArn: S.optional(S.String),
          RuleStatus: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          RuleName: S.optional(S.String),
          Description: S.optional(S.String),
          IsTerminal: S.optional(S.Boolean),
          Criteria: S.optional(__S(1888, __c59, 0)),
          Actions: S.optional(__S(1891, __c59, 3)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomationRulesConfig" });
    case 2:
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Rules: S.optional(__S(1762, __c55, 2)),
          UnprocessedAutomationRules: S.optional(__S(1537, __c48, 1)),
        }),
      ).annotate({ identifier: "BatchGetAutomationRulesResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "WorkflowUpdate",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ProductArn: S.optional(S.String), Id: S.optional(S.String) }),
      ).annotate({ identifier: "RelatedFinding" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Normalized: S.optional(S.Number),
          Product: S.optional(S.Number),
          Label: S.optional(S.String),
        }),
      ).annotate({ identifier: "SeverityUpdate" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), UpdatedBy: S.optional(S.String) }),
      ).annotate({ identifier: "NoteUpdate" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductArn: S.optional(__S(1984, __c62, 0)),
          AwsAccountId: S.optional(__S(1984, __c62, 0)),
          Id: S.optional(__S(1984, __c62, 0)),
          GeneratorId: S.optional(__S(1984, __c62, 0)),
          Type: S.optional(__S(1984, __c62, 0)),
          FirstObservedAt: S.optional(__S(1985, __c62, 1)),
          LastObservedAt: S.optional(__S(1985, __c62, 1)),
          CreatedAt: S.optional(__S(1985, __c62, 1)),
          UpdatedAt: S.optional(__S(1985, __c62, 1)),
          Confidence: S.optional(__S(1986, __c62, 2)),
          Criticality: S.optional(__S(1986, __c62, 2)),
          Title: S.optional(__S(1984, __c62, 0)),
          Description: S.optional(__S(1984, __c62, 0)),
          SourceUrl: S.optional(__S(1984, __c62, 0)),
          ProductName: S.optional(__S(1984, __c62, 0)),
          CompanyName: S.optional(__S(1984, __c62, 0)),
          SeverityLabel: S.optional(__S(1984, __c62, 0)),
          ResourceType: S.optional(__S(1984, __c62, 0)),
          ResourceId: S.optional(__S(1984, __c62, 0)),
          ResourcePartition: S.optional(__S(1984, __c62, 0)),
          ResourceRegion: S.optional(__S(1984, __c62, 0)),
          ResourceTags: S.optional(__S(1987, __c62, 3)),
          ResourceDetailsOther: S.optional(__S(1987, __c62, 3)),
          ComplianceStatus: S.optional(__S(1984, __c62, 0)),
          ComplianceSecurityControlId: S.optional(__S(1984, __c62, 0)),
          ComplianceAssociatedStandardsId: S.optional(__S(1984, __c62, 0)),
          VerificationState: S.optional(__S(1984, __c62, 0)),
          WorkflowStatus: S.optional(__S(1984, __c62, 0)),
          RecordState: S.optional(__S(1984, __c62, 0)),
          RelatedFindingsProductArn: S.optional(__S(1984, __c62, 0)),
          RelatedFindingsId: S.optional(__S(1984, __c62, 0)),
          NoteText: S.optional(__S(1984, __c62, 0)),
          NoteUpdatedAt: S.optional(__S(1985, __c62, 1)),
          NoteUpdatedBy: S.optional(__S(1984, __c62, 0)),
          UserDefinedFields: S.optional(__S(1987, __c62, 3)),
          ResourceApplicationArn: S.optional(__S(1984, __c62, 0)),
          ResourceApplicationName: S.optional(__S(1984, __c62, 0)),
          AwsAccountName: S.optional(__S(1984, __c62, 0)),
          ResourceProvider: S.optional(__S(1984, __c62, 0)),
          ResourceOwnerAccountId: S.optional(__S(1984, __c62, 0)),
          ResourceOwnerOrgId: S.optional(__S(1984, __c62, 0)),
        }),
      ).annotate({ identifier: "AutomationRulesFindingFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Note: S.optional(__S(1856, __c58, 0)),
          Severity: S.optional(__S(1824, __c57, 0)),
          VerificationState: S.optional(S.String),
          Confidence: S.optional(S.Number),
          Criticality: S.optional(S.Number),
          Types: S.optional(__S(1504, __c47, 0)),
          UserDefinedFields: S.optional(__S(1664, __c52, 0)),
          Workflow: S.optional(__S(1792, __c56, 0)),
          RelatedFindings: S.optional(__S(1794, __c56, 2)),
        }),
      ).annotate({ identifier: "AutomationRulesFindingFieldsUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          FindingFieldsUpdate: S.optional(__S(1889, __c59, 1)),
        }),
      ).annotate({ identifier: "AutomationRulesAction" });
    case 3:
      return S.Array(__S(1890, __c59, 2));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Comparison: S.optional(S.String) }),
      ).annotate({ identifier: "StringFilter" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.Number),
          Unit: S.optional(S.String),
          Comparison: S.optional(S.String),
        }),
      ).annotate({ identifier: "DateRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Start: S.optional(S.String),
          End: S.optional(S.String),
          DateRange: S.optional(__S(1952, __c61, 0)),
        }),
      ).annotate({ identifier: "DateFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Gte: S.optional(S.Number),
          Lte: S.optional(S.Number),
          Eq: S.optional(S.Number),
          Gt: S.optional(S.Number),
          Lt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NumberFilter" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          Comparison: S.optional(S.String),
        }),
      ).annotate({ identifier: "MapFilter" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1920, __c60, 0));
    case 1:
      return S.Array(__S(1953, __c61, 1));
    case 2:
      return S.Array(__S(1954, __c61, 2));
    case 3:
      return S.Array(__S(1955, __c61, 3));
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Target: S.optional(__S(2112, __c66, 0)) })).annotate({
        identifier: "ConfigurationPolicyAssociation",
      });
    case 1:
      return S.Array(__S(2016, __c63, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyAssociationIdentifiers: S.optional(__S(2017, __c63, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationPolicyAssociation/batchget" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetConfigurationPolicyAssociationsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyAssociationIdentifiers: S.optional(__S(2016, __c63, 0)),
          ErrorCode: S.optional(S.String),
          ErrorReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedConfigurationPolicyAssociation" });
    case 4:
      return S.Array(__S(2019, __c63, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyAssociations: S.optional(__S(2048, __c64, 0)),
          UnprocessedConfigurationPolicyAssociations: S.optional(__S(2020, __c63, 4)),
        }),
      ).annotate({ identifier: "BatchGetConfigurationPolicyAssociationsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2080, __c65, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationPolicyId: S.optional(S.String),
          TargetId: S.optional(S.String),
          TargetType: S.optional(S.String),
          AssociationType: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          AssociationStatus: S.optional(S.String),
          AssociationStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationPolicyAssociationSummary" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ AccountId: S.String }),
        /*@__PURE__*/ S.Struct({ OrganizationalUnitId: S.String }),
        /*@__PURE__*/ S.Struct({ RootId: S.String }),
      ]);
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecurityControlIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/securityControls/batchGet" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetSecurityControlsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String),
          SecurityControlArn: S.optional(S.String),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          RemediationUrl: S.optional(S.String),
          SeverityRating: S.optional(S.String),
          SecurityControlStatus: S.optional(S.String),
          UpdateStatus: S.optional(S.String),
          Parameters: S.optional(__S(2210, __c69, 2)),
          LastUpdateReason: S.optional(S.String),
          Provider: S.optional(S.String),
        }),
      ).annotate({ identifier: "SecurityControl" });
    case 2:
      return S.Array(__S(2145, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedSecurityControl" });
    case 4:
      return S.Array(__S(2147, __c67, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          SecurityControls: S.optional(__S(2146, __c67, 2)),
          UnprocessedIds: S.optional(__S(2148, __c67, 4)),
        }),
      ).annotate({ identifier: "BatchGetSecurityControlsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Integer: S.Number }),
        /*@__PURE__*/ S.Struct({ IntegerList: __S(2176, __c68, 0) }),
        /*@__PURE__*/ S.Struct({ Double: S.Number }),
        /*@__PURE__*/ S.Struct({ String: S.String }),
        /*@__PURE__*/ S.Struct({ StringList: __S(1504, __c47, 0) }),
        /*@__PURE__*/ S.Struct({ Boolean: S.Boolean }),
        /*@__PURE__*/ S.Struct({ Enum: S.String }),
        /*@__PURE__*/ S.Struct({ EnumList: __S(1504, __c47, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ ValueType: S.optional(S.String), Value: S.optional(__S(2208, __c69, 0)) }),
      ).annotate({ identifier: "ParameterConfiguration" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2209, __c69, 1).pipe(S.optional));
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecurityControlId: S.optional(S.String), StandardsArn: S.optional(S.String) }),
      ).annotate({ identifier: "StandardsControlAssociationId" });
    case 1:
      return S.Array(__S(2240, __c70, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ StandardsControlAssociationIds: S.optional(__S(2241, __c70, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/associations/batchGet" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetStandardsControlAssociationsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StandardsArn: S.optional(S.String),
          SecurityControlId: S.optional(S.String),
          SecurityControlArn: S.optional(S.String),
          AssociationStatus: S.optional(S.String),
          RelatedRequirements: S.optional(__S(1504, __c47, 0)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedReason: S.optional(S.String),
          StandardsControlTitle: S.optional(S.String),
          StandardsControlDescription: S.optional(S.String),
          StandardsControlArns: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "StandardsControlAssociationDetail" });
    case 4:
      return S.Array(__S(2243, __c70, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          StandardsControlAssociationId: S.optional(__S(2240, __c70, 0)),
          ErrorCode: S.optional(S.String),
          ErrorReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedStandardsControlAssociation" });
    case 6:
      return S.Array(__S(2245, __c70, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          StandardsControlAssociationDetails: S.optional(__S(2244, __c70, 4)),
          UnprocessedAssociations: S.optional(__S(2246, __c70, 6)),
        }),
      ).annotate({ identifier: "BatchGetStandardsControlAssociationsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Findings: S.optional(__S(3078, __c96, 6)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/findings/import" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchImportFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportFindingsError" });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FailedCount: S.optional(S.Number),
          SuccessCount: S.optional(S.Number),
          FailedFindings: S.optional(__S(2274, __c71, 2)),
        }),
      ).annotate({ identifier: "BatchImportFindingsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2336, __c73, 0));
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.optional(S.String) })).annotate({
        identifier: "AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Product: S.optional(S.Number),
          Label: S.optional(S.String),
          Normalized: S.optional(S.Number),
          Original: S.optional(S.String),
        }),
      ).annotate({ identifier: "Severity" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), Url: S.optional(S.String) }),
      ).annotate({ identifier: "Recommendation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Recommendation: S.optional(__S(2369, __c74, 1)) }),
      ).annotate({ identifier: "Remediation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Path: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "Malware" });
    case 4:
      return S.Array(__S(2371, __c74, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Begin: S.optional(S.Number), End: S.optional(S.Number) }),
      ).annotate({ identifier: "PortRange" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Direction: S.optional(S.String),
          Protocol: S.optional(S.String),
          OpenPortRange: S.optional(__S(2373, __c74, 5)),
          SourceIpV4: S.optional(S.String),
          SourceIpV6: S.optional(S.String),
          SourcePort: S.optional(S.Number),
          SourceDomain: S.optional(S.String),
          SourceMac: S.optional(S.String),
          DestinationIpV4: S.optional(S.String),
          DestinationIpV6: S.optional(S.String),
          DestinationPort: S.optional(S.Number),
          DestinationDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "Network" });
    case 7:
      return S.Array(__S(2373, __c74, 5));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(__S(1504, __c47, 0)),
          PortRanges: S.optional(__S(2375, __c74, 7)),
        }),
      ).annotate({ identifier: "NetworkPathComponentDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Protocol: S.optional(S.String),
          Destination: S.optional(__S(2376, __c74, 8)),
          Source: S.optional(__S(2376, __c74, 8)),
        }),
      ).annotate({ identifier: "NetworkHeader" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ComponentId: S.optional(S.String),
          ComponentType: S.optional(S.String),
          Egress: S.optional(__S(2377, __c74, 9)),
          Ingress: S.optional(__S(2377, __c74, 9)),
        }),
      ).annotate({ identifier: "NetworkPathComponent" });
    case 11:
      return S.Array(__S(2378, __c74, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Path: S.optional(S.String),
          Pid: S.optional(S.Number),
          ParentPid: S.optional(S.Number),
          LaunchedAt: S.optional(S.String),
          TerminatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProcessDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          FilePath: S.optional(S.String),
          FileName: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Hash: S.optional(S.String),
        }),
      ).annotate({ identifier: "FilePaths" });
    case 14:
      return S.Array(__S(2381, __c74, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Severity: S.optional(S.String),
          ItemCount: S.optional(S.Number),
          FilePaths: S.optional(__S(2382, __c74, 14)),
        }),
      ).annotate({ identifier: "Threat" });
    case 16:
      return S.Array(__S(2383, __c74, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Value: S.optional(S.String),
          Category: S.optional(S.String),
          LastObservedAt: S.optional(S.String),
          Source: S.optional(S.String),
          SourceUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "ThreatIntelIndicator" });
    case 18:
      return S.Array(__S(2385, __c74, 17));
    case 19:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "ResourceOwnerAccount",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Account: S.optional(__S(2387, __c74, 19)),
          Org: S.optional(__S(2387, __c74, 19)),
        }),
      ).annotate({ identifier: "ResourceOwner" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "ClassificationStatus" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Start: S.optional(S.Number),
          End: S.optional(S.Number),
          StartColumn: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Range" });
    case 23:
      return S.Array(__S(2390, __c74, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          PageNumber: S.optional(S.Number),
          LineRange: S.optional(__S(2390, __c74, 22)),
          OffsetRange: S.optional(__S(2390, __c74, 22)),
        }),
      ).annotate({ identifier: "Page" });
    case 25:
      return S.Array(__S(2392, __c74, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({ JsonPath: S.optional(S.String), RecordIndex: S.optional(S.Number) }),
      ).annotate({ identifier: "Record" });
    case 27:
      return S.Array(__S(2394, __c74, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          Column: S.optional(S.Number),
          Row: S.optional(S.Number),
          ColumnName: S.optional(S.String),
          CellReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "Cell" });
    case 29:
      return S.Array(__S(2396, __c74, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          LineRanges: S.optional(__S(2391, __c74, 23)),
          OffsetRanges: S.optional(__S(2391, __c74, 23)),
          Pages: S.optional(__S(2393, __c74, 25)),
          Records: S.optional(__S(2395, __c74, 27)),
          Cells: S.optional(__S(2397, __c74, 29)),
        }),
      ).annotate({ identifier: "Occurrences" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          Count: S.optional(S.Number),
          Type: S.optional(S.String),
          Occurrences: S.optional(__S(2398, __c74, 30)),
        }),
      ).annotate({ identifier: "SensitiveDataDetections" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2399, __c74, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Category: S.optional(S.String),
          Detections: S.optional(__S(2400, __c75, 0)),
          TotalCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SensitiveDataResult" });
    case 2:
      return S.Array(__S(2401, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Count: S.optional(S.Number),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Occurrences: S.optional(__S(2398, __c74, 30)),
        }),
      ).annotate({ identifier: "CustomDataIdentifiersDetections" });
    case 4:
      return S.Array(__S(2403, __c75, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Detections: S.optional(__S(2404, __c75, 4)), TotalCount: S.optional(S.Number) }),
      ).annotate({ identifier: "CustomDataIdentifiersResult" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          MimeType: S.optional(S.String),
          SizeClassified: S.optional(S.Number),
          AdditionalOccurrences: S.optional(S.Boolean),
          Status: S.optional(__S(2389, __c74, 21)),
          SensitiveData: S.optional(__S(2402, __c75, 2)),
          CustomDataIdentifiers: S.optional(__S(2405, __c75, 5)),
        }),
      ).annotate({ identifier: "ClassificationResult" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DetailedResultsLocation: S.optional(S.String),
          Result: S.optional(__S(2406, __c75, 6)),
        }),
      ).annotate({ identifier: "DataClassificationDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          OnDemandAllocationStrategy: S.optional(S.String),
          OnDemandBaseCapacity: S.optional(S.Number),
          OnDemandPercentageAboveBaseCapacity: S.optional(S.Number),
          SpotAllocationStrategy: S.optional(S.String),
          SpotInstancePools: S.optional(S.Number),
          SpotMaxPrice: S.optional(S.String),
        }),
      ).annotate({
        identifier:
          "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplateId: S.optional(S.String),
          LaunchTemplateName: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({
        identifier:
          "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ InstanceType: S.optional(S.String), WeightedCapacity: S.optional(S.String) }),
      ).annotate({
        identifier:
          "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails",
      });
    case 11:
      return S.Array(__S(2410, __c75, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplateSpecification: S.optional(__S(2409, __c75, 9)),
          Overrides: S.optional(__S(2411, __c75, 11)),
        }),
      ).annotate({
        identifier: "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          InstancesDistribution: S.optional(__S(2408, __c75, 8)),
          LaunchTemplate: S.optional(__S(2412, __c75, 12)),
        }),
      ).annotate({ identifier: "AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          LaunchConfigurationName: S.optional(S.String),
          LoadBalancerNames: S.optional(__S(1504, __c47, 0)),
          HealthCheckType: S.optional(S.String),
          HealthCheckGracePeriod: S.optional(S.Number),
          CreatedTime: S.optional(S.String),
          MixedInstancesPolicy: S.optional(__S(2413, __c75, 13)),
          AvailabilityZones: S.optional(__S(2304, __c72, 0)),
          LaunchTemplate: S.optional(__S(2409, __c75, 9)),
          CapacityRebalance: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsAutoScalingAutoScalingGroupDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ArtifactIdentifier: S.optional(S.String),
          EncryptionDisabled: S.optional(S.Boolean),
          Location: S.optional(S.String),
          Name: S.optional(S.String),
          NamespaceType: S.optional(S.String),
          OverrideArtifactName: S.optional(S.Boolean),
          Packaging: S.optional(S.String),
          Path: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectArtifactsDetails" });
    case 16:
      return S.Array(__S(2415, __c75, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Value: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails" });
    case 18:
      return S.Array(__S(2417, __c75, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({ Credential: S.optional(S.String), CredentialProvider: S.optional(S.String) }),
      ).annotate({ identifier: "AwsCodeBuildProjectEnvironmentRegistryCredential" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Certificate: S.optional(S.String),
          EnvironmentVariables: S.optional(__S(2418, __c75, 18)),
          PrivilegedMode: S.optional(S.Boolean),
          ImagePullCredentialsType: S.optional(S.String),
          RegistryCredential: S.optional(__S(2419, __c75, 19)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectEnvironment" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Location: S.optional(S.String),
          GitCloneDepth: S.optional(S.Number),
          InsecureSsl: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectSource" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          Status: S.optional(S.String),
          StreamName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          EncryptionDisabled: S.optional(S.Boolean),
          Location: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectLogsConfigS3LogsDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogs: S.optional(__S(2422, __c75, 22)),
          S3Logs: S.optional(__S(2423, __c75, 23)),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectLogsConfigDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          VpcId: S.optional(S.String),
          Subnets: S.optional(__S(1504, __c47, 0)),
          SecurityGroupIds: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectVpcConfig" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          EncryptionKey: S.optional(S.String),
          Artifacts: S.optional(__S(2416, __c75, 16)),
          Environment: S.optional(__S(2420, __c75, 20)),
          Name: S.optional(S.String),
          Source: S.optional(__S(2421, __c75, 21)),
          ServiceRole: S.optional(S.String),
          LogsConfig: S.optional(__S(2424, __c75, 24)),
          VpcConfig: S.optional(__S(2425, __c75, 25)),
          SecondaryArtifacts: S.optional(__S(2416, __c75, 16)),
        }),
      ).annotate({ identifier: "AwsCodeBuildProjectDetails" });
    case 27:
      return S.suspend(() => S.Struct({ ViewerProtocolPolicy: S.optional(S.String) })).annotate({
        identifier: "AwsCloudFrontDistributionCacheBehavior",
      });
    case 28:
      return S.Array(__S(2427, __c75, 27));
    case 29:
      return S.suspend(() => S.Struct({ Items: S.optional(__S(2428, __c75, 28)) })).annotate({
        identifier: "AwsCloudFrontDistributionCacheBehaviors",
      });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          IncludeCookies: S.optional(S.Boolean),
          Prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudFrontDistributionLogging" });
    case 31:
      return S.suspend(() => S.Struct({ OriginAccessIdentity: S.optional(S.String) })).annotate({
        identifier: "AwsCloudFrontDistributionOriginS3OriginConfig",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1504, __c47, 0)), Quantity: S.optional(S.Number) }),
      ).annotate({ identifier: "AwsCloudFrontDistributionOriginSslProtocols" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HttpPort: S.optional(S.Number),
          HttpsPort: S.optional(S.Number),
          OriginKeepaliveTimeout: S.optional(S.Number),
          OriginProtocolPolicy: S.optional(S.String),
          OriginReadTimeout: S.optional(S.Number),
          OriginSslProtocols: S.optional(__S(2432, __c76, 0)),
        }),
      ).annotate({ identifier: "AwsCloudFrontDistributionOriginCustomOriginConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          Id: S.optional(S.String),
          OriginPath: S.optional(S.String),
          S3OriginConfig: S.optional(__S(2431, __c75, 31)),
          CustomOriginConfig: S.optional(__S(2433, __c76, 1)),
        }),
      ).annotate({ identifier: "AwsCloudFrontDistributionOriginItem" });
    case 3:
      return S.Array(__S(2434, __c76, 2));
    case 4:
      return S.suspend(() => S.Struct({ Items: S.optional(__S(2435, __c76, 3)) })).annotate({
        identifier: "AwsCloudFrontDistributionOrigins",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2176, __c68, 0)), Quantity: S.optional(S.Number) }),
      ).annotate({ identifier: "AwsCloudFrontDistributionOriginGroupFailoverStatusCodes" });
    case 6:
      return S.suspend(() => S.Struct({ StatusCodes: S.optional(__S(2437, __c76, 5)) })).annotate({
        identifier: "AwsCloudFrontDistributionOriginGroupFailover",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ FailoverCriteria: S.optional(__S(2438, __c76, 6)) }),
      ).annotate({ identifier: "AwsCloudFrontDistributionOriginGroup" });
    case 8:
      return S.Array(__S(2439, __c76, 7));
    case 9:
      return S.suspend(() => S.Struct({ Items: S.optional(__S(2440, __c76, 8)) })).annotate({
        identifier: "AwsCloudFrontDistributionOriginGroups",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AcmCertificateArn: S.optional(S.String),
          Certificate: S.optional(S.String),
          CertificateSource: S.optional(S.String),
          CloudFrontDefaultCertificate: S.optional(S.Boolean),
          IamCertificateId: S.optional(S.String),
          MinimumProtocolVersion: S.optional(S.String),
          SslSupportMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudFrontDistributionViewerCertificate" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CacheBehaviors: S.optional(__S(2429, __c75, 29)),
          DefaultCacheBehavior: S.optional(__S(2427, __c75, 27)),
          DefaultRootObject: S.optional(S.String),
          DomainName: S.optional(S.String),
          ETag: S.optional(S.String),
          LastModifiedTime: S.optional(S.String),
          Logging: S.optional(__S(2430, __c75, 30)),
          Origins: S.optional(__S(2436, __c76, 4)),
          OriginGroups: S.optional(__S(2441, __c76, 9)),
          ViewerCertificate: S.optional(__S(2442, __c76, 10)),
          Status: S.optional(S.String),
          WebAclId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudFrontDistributionDetails" });
    case 12:
      return S.suspend(() => S.Struct({ NetworkInterfaceId: S.optional(S.String) })).annotate({
        identifier: "AwsEc2InstanceNetworkInterfacesDetails",
      });
    case 13:
      return S.Array(__S(2444, __c76, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          HttpEndpoint: S.optional(S.String),
          HttpProtocolIpv6: S.optional(S.String),
          HttpPutResponseHopLimit: S.optional(S.Number),
          HttpTokens: S.optional(S.String),
          InstanceMetadataTags: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2InstanceMetadataOptions" });
    case 15:
      return S.suspend(() => S.Struct({ State: S.optional(S.String) })).annotate({
        identifier: "AwsEc2InstanceMonitoringDetails",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          ImageId: S.optional(S.String),
          IpV4Addresses: S.optional(__S(1504, __c47, 0)),
          IpV6Addresses: S.optional(__S(1504, __c47, 0)),
          KeyName: S.optional(S.String),
          IamInstanceProfileArn: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          LaunchedAt: S.optional(S.String),
          NetworkInterfaces: S.optional(__S(2445, __c76, 13)),
          VirtualizationType: S.optional(S.String),
          MetadataOptions: S.optional(__S(2446, __c76, 14)),
          Monitoring: S.optional(__S(2447, __c76, 15)),
        }),
      ).annotate({ identifier: "AwsEc2InstanceDetails" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AttachTime: S.optional(S.String),
          AttachmentId: S.optional(S.String),
          DeleteOnTermination: S.optional(S.Boolean),
          DeviceIndex: S.optional(S.Number),
          InstanceId: S.optional(S.String),
          InstanceOwnerId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2NetworkInterfaceAttachment" });
    case 18:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), GroupId: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2NetworkInterfaceSecurityGroup" });
    case 19:
      return S.Array(__S(2450, __c76, 18));
    case 20:
      return S.suspend(() => S.Struct({ IpV6Address: S.optional(S.String) })).annotate({
        identifier: "AwsEc2NetworkInterfaceIpV6AddressDetail",
      });
    case 21:
      return S.Array(__S(2452, __c76, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({ PrivateIpAddress: S.optional(S.String), PrivateDnsName: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2NetworkInterfacePrivateIpAddressDetail" });
    case 23:
      return S.Array(__S(2454, __c76, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(2449, __c76, 17)),
          NetworkInterfaceId: S.optional(S.String),
          SecurityGroups: S.optional(__S(2451, __c76, 19)),
          SourceDestCheck: S.optional(S.Boolean),
          IpV6Addresses: S.optional(__S(2453, __c76, 21)),
          PrivateIpAddresses: S.optional(__S(2455, __c76, 23)),
          PublicDnsName: S.optional(S.String),
          PublicIp: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2NetworkInterfaceDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.optional(S.String),
          GroupName: S.optional(S.String),
          PeeringStatus: S.optional(S.String),
          UserId: S.optional(S.String),
          VpcId: S.optional(S.String),
          VpcPeeringConnectionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2SecurityGroupUserIdGroupPair" });
    case 26:
      return S.Array(__S(2457, __c76, 25));
    case 27:
      return S.suspend(() => S.Struct({ CidrIp: S.optional(S.String) })).annotate({
        identifier: "AwsEc2SecurityGroupIpRange",
      });
    case 28:
      return S.Array(__S(2459, __c76, 27));
    case 29:
      return S.suspend(() => S.Struct({ CidrIpv6: S.optional(S.String) })).annotate({
        identifier: "AwsEc2SecurityGroupIpv6Range",
      });
    case 30:
      return S.Array(__S(2461, __c76, 29));
    case 31:
      return S.suspend(() => S.Struct({ PrefixListId: S.optional(S.String) })).annotate({
        identifier: "AwsEc2SecurityGroupPrefixListId",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2463, __c76, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          IpProtocol: S.optional(S.String),
          FromPort: S.optional(S.Number),
          ToPort: S.optional(S.Number),
          UserIdGroupPairs: S.optional(__S(2458, __c76, 26)),
          IpRanges: S.optional(__S(2460, __c76, 28)),
          Ipv6Ranges: S.optional(__S(2462, __c76, 30)),
          PrefixListIds: S.optional(__S(2464, __c77, 0)),
        }),
      ).annotate({ identifier: "AwsEc2SecurityGroupIpPermission" });
    case 2:
      return S.Array(__S(2465, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          GroupId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          VpcId: S.optional(S.String),
          IpPermissions: S.optional(__S(2466, __c77, 2)),
          IpPermissionsEgress: S.optional(__S(2466, __c77, 2)),
        }),
      ).annotate({ identifier: "AwsEc2SecurityGroupDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AttachTime: S.optional(S.String),
          DeleteOnTermination: S.optional(S.Boolean),
          InstanceId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VolumeAttachment" });
    case 5:
      return S.Array(__S(2468, __c77, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          CreateTime: S.optional(S.String),
          DeviceName: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          Size: S.optional(S.Number),
          SnapshotId: S.optional(S.String),
          Status: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Attachments: S.optional(__S(2469, __c77, 5)),
          VolumeId: S.optional(S.String),
          VolumeType: S.optional(S.String),
          VolumeScanStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VolumeDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          CidrBlock: S.optional(S.String),
          CidrBlockState: S.optional(S.String),
        }),
      ).annotate({ identifier: "CidrBlockAssociation" });
    case 8:
      return S.Array(__S(2471, __c77, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          Ipv6CidrBlock: S.optional(S.String),
          CidrBlockState: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ipv6CidrBlockAssociation" });
    case 10:
      return S.Array(__S(2473, __c77, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          CidrBlockAssociationSet: S.optional(__S(2472, __c77, 8)),
          Ipv6CidrBlockAssociationSet: S.optional(__S(2474, __c77, 10)),
          DhcpOptionsId: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VpcDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          PublicIp: S.optional(S.String),
          AllocationId: S.optional(S.String),
          AssociationId: S.optional(S.String),
          Domain: S.optional(S.String),
          PublicIpv4Pool: S.optional(S.String),
          NetworkBorderGroup: S.optional(S.String),
          NetworkInterfaceId: S.optional(S.String),
          NetworkInterfaceOwnerId: S.optional(S.String),
          PrivateIpAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2EipDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          AssignIpv6AddressOnCreation: S.optional(S.Boolean),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          AvailableIpAddressCount: S.optional(S.Number),
          CidrBlock: S.optional(S.String),
          DefaultForAz: S.optional(S.Boolean),
          MapPublicIpOnLaunch: S.optional(S.Boolean),
          OwnerId: S.optional(S.String),
          State: S.optional(S.String),
          SubnetArn: S.optional(S.String),
          SubnetId: S.optional(S.String),
          VpcId: S.optional(S.String),
          Ipv6CidrBlockAssociationSet: S.optional(__S(2474, __c77, 10)),
        }),
      ).annotate({ identifier: "AwsEc2SubnetDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          NetworkAclAssociationId: S.optional(S.String),
          NetworkAclId: S.optional(S.String),
          SubnetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2NetworkAclAssociation" });
    case 15:
      return S.Array(__S(2478, __c77, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.Number), Type: S.optional(S.Number) }),
      ).annotate({ identifier: "IcmpTypeCode" });
    case 17:
      return S.suspend(() =>
        S.Struct({ From: S.optional(S.Number), To: S.optional(S.Number) }),
      ).annotate({ identifier: "PortRangeFromTo" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          CidrBlock: S.optional(S.String),
          Egress: S.optional(S.Boolean),
          IcmpTypeCode: S.optional(__S(2480, __c77, 16)),
          Ipv6CidrBlock: S.optional(S.String),
          PortRange: S.optional(__S(2481, __c77, 17)),
          Protocol: S.optional(S.String),
          RuleAction: S.optional(S.String),
          RuleNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEc2NetworkAclEntry" });
    case 19:
      return S.Array(__S(2482, __c77, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          IsDefault: S.optional(S.Boolean),
          NetworkAclId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          VpcId: S.optional(S.String),
          Associations: S.optional(__S(2479, __c77, 15)),
          Entries: S.optional(__S(2483, __c77, 19)),
        }),
      ).annotate({ identifier: "AwsEc2NetworkAclDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({ ZoneName: S.optional(S.String), SubnetId: S.optional(S.String) }),
      ).annotate({ identifier: "AvailabilityZone" });
    case 22:
      return S.Array(__S(2485, __c77, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(2486, __c77, 22)),
          CanonicalHostedZoneId: S.optional(S.String),
          CreatedTime: S.optional(S.String),
          DNSName: S.optional(S.String),
          IpAddressType: S.optional(S.String),
          Scheme: S.optional(S.String),
          SecurityGroups: S.optional(__S(1504, __c47, 0)),
          State: S.optional(__S(2389, __c74, 21)),
          Type: S.optional(S.String),
          VpcId: S.optional(S.String),
          LoadBalancerAttributes: S.optional(__S(3137, __c98, 1)),
        }),
      ).annotate({ identifier: "AwsElbv2LoadBalancerDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({ EnvironmentName: S.optional(S.String), LinkName: S.optional(S.String) }),
      ).annotate({ identifier: "AwsElasticBeanstalkEnvironmentEnvironmentLink" });
    case 25:
      return S.Array(__S(2488, __c77, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          OptionName: S.optional(S.String),
          ResourceName: S.optional(S.String),
          Value: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElasticBeanstalkEnvironmentOptionSetting" });
    case 27:
      return S.Array(__S(2490, __c77, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElasticBeanstalkEnvironmentTier" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.optional(S.String),
          Cname: S.optional(S.String),
          DateCreated: S.optional(S.String),
          DateUpdated: S.optional(S.String),
          Description: S.optional(S.String),
          EndpointUrl: S.optional(S.String),
          EnvironmentArn: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          EnvironmentLinks: S.optional(__S(2489, __c77, 25)),
          EnvironmentName: S.optional(S.String),
          OptionSettings: S.optional(__S(2491, __c77, 27)),
          PlatformArn: S.optional(S.String),
          SolutionStackName: S.optional(S.String),
          Status: S.optional(S.String),
          Tier: S.optional(__S(2492, __c77, 28)),
          VersionLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElasticBeanstalkEnvironmentDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({ EnforceHTTPS: S.optional(S.Boolean), TLSSecurityPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "AwsElasticsearchDomainDomainEndpointOptions" });
    case 31:
      return S.suspend(() => S.Struct({ AvailabilityZoneCount: S.optional(S.Number) })).annotate({
        identifier: "AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DedicatedMasterCount: S.optional(S.Number),
          DedicatedMasterEnabled: S.optional(S.Boolean),
          DedicatedMasterType: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          InstanceType: S.optional(S.String),
          ZoneAwarenessConfig: S.optional(__S(2495, __c77, 31)),
          ZoneAwarenessEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsElasticsearchDomainElasticsearchClusterConfigDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), KmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "AwsElasticsearchDomainEncryptionAtRestOptions" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsElasticsearchDomainLogPublishingOptionsLogConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          IndexSlowLogs: S.optional(__S(2498, __c78, 2)),
          SearchSlowLogs: S.optional(__S(2498, __c78, 2)),
          AuditLogs: S.optional(__S(2498, __c78, 2)),
        }),
      ).annotate({ identifier: "AwsElasticsearchDomainLogPublishingOptions" });
    case 4:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "AwsElasticsearchDomainNodeToNodeEncryptionOptions",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AutomatedUpdateDate: S.optional(S.String),
          Cancellable: S.optional(S.Boolean),
          CurrentVersion: S.optional(S.String),
          Description: S.optional(S.String),
          NewVersion: S.optional(S.String),
          UpdateAvailable: S.optional(S.Boolean),
          UpdateStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElasticsearchDomainServiceSoftwareOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(1504, __c47, 0)),
          SecurityGroupIds: S.optional(__S(1504, __c47, 0)),
          SubnetIds: S.optional(__S(1504, __c47, 0)),
          VPCId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElasticsearchDomainVPCOptions" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AccessPolicies: S.optional(S.String),
          DomainEndpointOptions: S.optional(__S(2494, __c77, 30)),
          DomainId: S.optional(S.String),
          DomainName: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Endpoints: S.optional(__S(1664, __c52, 0)),
          ElasticsearchVersion: S.optional(S.String),
          ElasticsearchClusterConfig: S.optional(__S(2496, __c78, 0)),
          EncryptionAtRestOptions: S.optional(__S(2497, __c78, 1)),
          LogPublishingOptions: S.optional(__S(2499, __c78, 3)),
          NodeToNodeEncryptionOptions: S.optional(__S(2500, __c78, 4)),
          ServiceSoftwareOptions: S.optional(__S(2501, __c78, 5)),
          VPCOptions: S.optional(__S(2502, __c78, 6)),
        }),
      ).annotate({ identifier: "AwsElasticsearchDomainDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({ SSEAlgorithm: S.optional(S.String), KMSMasterKeyID: S.optional(S.String) }),
      ).annotate({ identifier: "AwsS3BucketServerSideEncryptionByDefault" });
    case 9:
      return S.suspend(() =>
        S.Struct({ ApplyServerSideEncryptionByDefault: S.optional(__S(2504, __c78, 8)) }),
      ).annotate({ identifier: "AwsS3BucketServerSideEncryptionRule" });
    case 10:
      return S.Array(__S(2505, __c78, 9));
    case 11:
      return S.suspend(() => S.Struct({ Rules: S.optional(__S(2506, __c78, 10)) })).annotate({
        identifier: "AwsS3BucketServerSideEncryptionConfiguration",
      });
    case 12:
      return S.suspend(() => S.Struct({ DaysAfterInitiation: S.optional(S.Number) })).annotate({
        identifier:
          "AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(3136, __c98, 0)),
          Type: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails",
      });
    case 14:
      return S.Array(__S(2509, __c78, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Operands: S.optional(__S(2510, __c78, 14)),
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(3136, __c98, 0)),
          Type: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails",
      });
    case 16:
      return S.suspend(() => S.Struct({ Predicate: S.optional(__S(2511, __c78, 15)) })).annotate({
        identifier: "AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({ Days: S.optional(S.Number), StorageClass: S.optional(S.String) }),
      ).annotate({
        identifier:
          "AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails",
      });
    case 18:
      return S.Array(__S(2513, __c78, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(S.String),
          Days: S.optional(S.Number),
          StorageClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails" });
    case 20:
      return S.Array(__S(2515, __c78, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          AbortIncompleteMultipartUpload: S.optional(__S(2508, __c78, 12)),
          ExpirationDate: S.optional(S.String),
          ExpirationInDays: S.optional(S.Number),
          ExpiredObjectDeleteMarker: S.optional(S.Boolean),
          Filter: S.optional(__S(2512, __c78, 16)),
          ID: S.optional(S.String),
          NoncurrentVersionExpirationInDays: S.optional(S.Number),
          NoncurrentVersionTransitions: S.optional(__S(2514, __c78, 18)),
          Prefix: S.optional(S.String),
          Status: S.optional(S.String),
          Transitions: S.optional(__S(2516, __c78, 20)),
        }),
      ).annotate({ identifier: "AwsS3BucketBucketLifecycleConfigurationRulesDetails" });
    case 22:
      return S.Array(__S(2517, __c78, 21));
    case 23:
      return S.suspend(() => S.Struct({ Rules: S.optional(__S(2518, __c78, 22)) })).annotate({
        identifier: "AwsS3BucketBucketLifecycleConfigurationDetails",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          BlockPublicAcls: S.optional(S.Boolean),
          BlockPublicPolicy: S.optional(S.Boolean),
          IgnorePublicAcls: S.optional(S.Boolean),
          RestrictPublicBuckets: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsS3AccountPublicAccessBlockDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          DestinationBucketName: S.optional(S.String),
          LogFilePrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3BucketLoggingConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({ Hostname: S.optional(S.String), Protocol: S.optional(S.String) }),
      ).annotate({ identifier: "AwsS3BucketWebsiteConfigurationRedirectTo" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          HttpErrorCodeReturnedEquals: S.optional(S.String),
          KeyPrefixEquals: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3BucketWebsiteConfigurationRoutingRuleCondition" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Hostname: S.optional(S.String),
          HttpRedirectCode: S.optional(S.String),
          Protocol: S.optional(S.String),
          ReplaceKeyPrefixWith: S.optional(S.String),
          ReplaceKeyWith: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3BucketWebsiteConfigurationRoutingRuleRedirect" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Condition: S.optional(__S(2523, __c78, 27)),
          Redirect: S.optional(__S(2524, __c78, 28)),
        }),
      ).annotate({ identifier: "AwsS3BucketWebsiteConfigurationRoutingRule" });
    case 30:
      return S.Array(__S(2525, __c78, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          ErrorDocument: S.optional(S.String),
          IndexDocumentSuffix: S.optional(S.String),
          RedirectAllRequestsTo: S.optional(__S(2522, __c78, 26)),
          RoutingRules: S.optional(__S(2526, __c78, 30)),
        }),
      ).annotate({ identifier: "AwsS3BucketWebsiteConfiguration" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AwsS3BucketNotificationConfigurationS3KeyFilterRule" });
    case 1:
      return S.Array(__S(2528, __c79, 0));
    case 2:
      return S.suspend(() => S.Struct({ FilterRules: S.optional(__S(2529, __c79, 1)) })).annotate({
        identifier: "AwsS3BucketNotificationConfigurationS3KeyFilter",
      });
    case 3:
      return S.suspend(() => S.Struct({ S3KeyFilter: S.optional(__S(2530, __c79, 2)) })).annotate({
        identifier: "AwsS3BucketNotificationConfigurationFilter",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Events: S.optional(__S(1504, __c47, 0)),
          Filter: S.optional(__S(2531, __c79, 3)),
          Destination: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3BucketNotificationConfigurationDetail" });
    case 5:
      return S.Array(__S(2532, __c79, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Configurations: S.optional(__S(2533, __c79, 5)) }),
      ).annotate({ identifier: "AwsS3BucketNotificationConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({ IsMfaDeleteEnabled: S.optional(S.Boolean), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsS3BucketBucketVersioningConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Days: S.optional(S.Number),
          Mode: S.optional(S.String),
          Years: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ DefaultRetention: S.optional(__S(2536, __c79, 8)) }),
      ).annotate({ identifier: "AwsS3BucketObjectLockConfigurationRuleDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ObjectLockEnabled: S.optional(S.String),
          Rule: S.optional(__S(2537, __c79, 9)),
        }),
      ).annotate({ identifier: "AwsS3BucketObjectLockConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          OwnerName: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          ServerSideEncryptionConfiguration: S.optional(__S(2507, __c78, 11)),
          BucketLifecycleConfiguration: S.optional(__S(2519, __c78, 23)),
          PublicAccessBlockConfiguration: S.optional(__S(2520, __c78, 24)),
          AccessControlList: S.optional(S.String),
          BucketLoggingConfiguration: S.optional(__S(2521, __c78, 25)),
          BucketWebsiteConfiguration: S.optional(__S(2527, __c78, 31)),
          BucketNotificationConfiguration: S.optional(__S(2534, __c79, 6)),
          BucketVersioningConfiguration: S.optional(__S(2535, __c79, 7)),
          ObjectLockConfiguration: S.optional(__S(2538, __c79, 10)),
          Name: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3BucketDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          LastModified: S.optional(S.String),
          ETag: S.optional(S.String),
          VersionId: S.optional(S.String),
          ContentType: S.optional(S.String),
          ServerSideEncryption: S.optional(S.String),
          SSEKMSKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsS3ObjectDetails" });
    case 13:
      return S.suspend(() => S.Struct({ AutomaticallyAfterDays: S.optional(S.Number) })).annotate({
        identifier: "AwsSecretsManagerSecretRotationRules",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          RotationRules: S.optional(__S(2541, __c79, 13)),
          RotationOccurredWithinFrequency: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          RotationEnabled: S.optional(S.Boolean),
          RotationLambdaArn: S.optional(S.String),
          Deleted: S.optional(S.Boolean),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsSecretsManagerSecretDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({ MfaAuthenticated: S.optional(S.Boolean), CreationDate: S.optional(S.String) }),
      ).annotate({ identifier: "AwsIamAccessKeySessionContextAttributes" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          Arn: S.optional(S.String),
          AccountId: S.optional(S.String),
          UserName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamAccessKeySessionContextSessionIssuer" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(2543, __c79, 15)),
          SessionIssuer: S.optional(__S(2544, __c79, 16)),
        }),
      ).annotate({ identifier: "AwsIamAccessKeySessionContext" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          PrincipalType: S.optional(S.String),
          PrincipalName: S.optional(S.String),
          AccountId: S.optional(S.String),
          AccessKeyId: S.optional(S.String),
          SessionContext: S.optional(__S(2545, __c79, 17)),
        }),
      ).annotate({ identifier: "AwsIamAccessKeyDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({ PolicyName: S.optional(S.String), PolicyArn: S.optional(S.String) }),
      ).annotate({ identifier: "AwsIamAttachedManagedPolicy" });
    case 20:
      return S.Array(__S(2547, __c79, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          PermissionsBoundaryArn: S.optional(S.String),
          PermissionsBoundaryType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamPermissionsBoundary" });
    case 22:
      return S.suspend(() => S.Struct({ PolicyName: S.optional(S.String) })).annotate({
        identifier: "AwsIamUserPolicy",
      });
    case 23:
      return S.Array(__S(2550, __c79, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          AttachedManagedPolicies: S.optional(__S(2548, __c79, 20)),
          CreateDate: S.optional(S.String),
          GroupList: S.optional(__S(1504, __c47, 0)),
          Path: S.optional(S.String),
          PermissionsBoundary: S.optional(__S(2549, __c79, 21)),
          UserId: S.optional(S.String),
          UserName: S.optional(S.String),
          UserPolicyList: S.optional(__S(2551, __c79, 23)),
        }),
      ).annotate({ identifier: "AwsIamUserDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          VersionId: S.optional(S.String),
          IsDefaultVersion: S.optional(S.Boolean),
          CreateDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamPolicyVersion" });
    case 26:
      return S.Array(__S(2553, __c79, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          AttachmentCount: S.optional(S.Number),
          CreateDate: S.optional(S.String),
          DefaultVersionId: S.optional(S.String),
          Description: S.optional(S.String),
          IsAttachable: S.optional(S.Boolean),
          Path: S.optional(S.String),
          PermissionsBoundaryUsageCount: S.optional(S.Number),
          PolicyId: S.optional(S.String),
          PolicyName: S.optional(S.String),
          PolicyVersionList: S.optional(__S(2554, __c79, 26)),
          UpdateDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamPolicyDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          DetailedMetricsEnabled: S.optional(S.Boolean),
          LoggingLevel: S.optional(S.String),
          DataTraceEnabled: S.optional(S.Boolean),
          ThrottlingBurstLimit: S.optional(S.Number),
          ThrottlingRateLimit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsApiGatewayV2RouteSettings" });
    case 29:
      return S.suspend(() =>
        S.Struct({ Format: S.optional(S.String), DestinationArn: S.optional(S.String) }),
      ).annotate({ identifier: "AwsApiGatewayAccessLogSettings" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          ClientCertificateId: S.optional(S.String),
          CreatedDate: S.optional(S.String),
          Description: S.optional(S.String),
          DefaultRouteSettings: S.optional(__S(2556, __c79, 28)),
          DeploymentId: S.optional(S.String),
          LastUpdatedDate: S.optional(S.String),
          RouteSettings: S.optional(__S(2556, __c79, 28)),
          StageName: S.optional(S.String),
          StageVariables: S.optional(__S(1664, __c52, 0)),
          AccessLogSettings: S.optional(__S(2557, __c79, 29)),
          AutoDeploy: S.optional(S.Boolean),
          LastDeploymentStatusMessage: S.optional(S.String),
          ApiGatewayManaged: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsApiGatewayV2StageDetails" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          AllowOrigins: S.optional(__S(1504, __c47, 0)),
          AllowCredentials: S.optional(S.Boolean),
          ExposeHeaders: S.optional(__S(1504, __c47, 0)),
          MaxAge: S.optional(S.Number),
          AllowMethods: S.optional(__S(1504, __c47, 0)),
          AllowHeaders: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsCorsConfiguration" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiEndpoint: S.optional(S.String),
          ApiId: S.optional(S.String),
          ApiKeySelectionExpression: S.optional(S.String),
          CreatedDate: S.optional(S.String),
          Description: S.optional(S.String),
          Version: S.optional(S.String),
          Name: S.optional(S.String),
          ProtocolType: S.optional(S.String),
          RouteSelectionExpression: S.optional(S.String),
          CorsConfiguration: S.optional(__S(2559, __c79, 31)),
        }),
      ).annotate({ identifier: "AwsApiGatewayV2ApiDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), AttributeType: S.optional(S.String) }),
      ).annotate({ identifier: "AwsDynamoDbTableAttributeDefinition" });
    case 2:
      return S.Array(__S(2561, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BillingMode: S.optional(S.String),
          LastUpdateToPayPerRequestDateTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableBillingModeSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), KeyType: S.optional(S.String) }),
      ).annotate({ identifier: "AwsDynamoDbTableKeySchema" });
    case 5:
      return S.Array(__S(2564, __c80, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          NonKeyAttributes: S.optional(__S(1504, __c47, 0)),
          ProjectionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableProjection" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          LastDecreaseDateTime: S.optional(S.String),
          LastIncreaseDateTime: S.optional(S.String),
          NumberOfDecreasesToday: S.optional(S.Number),
          ReadCapacityUnits: S.optional(S.Number),
          WriteCapacityUnits: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableProvisionedThroughput" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Backfilling: S.optional(S.Boolean),
          IndexArn: S.optional(S.String),
          IndexName: S.optional(S.String),
          IndexSizeBytes: S.optional(S.Number),
          IndexStatus: S.optional(S.String),
          ItemCount: S.optional(S.Number),
          KeySchema: S.optional(__S(2565, __c80, 5)),
          Projection: S.optional(__S(2566, __c80, 6)),
          ProvisionedThroughput: S.optional(__S(2567, __c80, 7)),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableGlobalSecondaryIndex" });
    case 9:
      return S.Array(__S(2568, __c80, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          IndexArn: S.optional(S.String),
          IndexName: S.optional(S.String),
          KeySchema: S.optional(__S(2565, __c80, 5)),
          Projection: S.optional(__S(2566, __c80, 6)),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableLocalSecondaryIndex" });
    case 11:
      return S.Array(__S(2570, __c80, 10));
    case 12:
      return S.suspend(() => S.Struct({ ReadCapacityUnits: S.optional(S.Number) })).annotate({
        identifier: "AwsDynamoDbTableProvisionedThroughputOverride",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.optional(S.String),
          ProvisionedThroughputOverride: S.optional(__S(2572, __c80, 12)),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableReplicaGlobalSecondaryIndex" });
    case 14:
      return S.Array(__S(2573, __c80, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          GlobalSecondaryIndexes: S.optional(__S(2574, __c80, 14)),
          KmsMasterKeyId: S.optional(S.String),
          ProvisionedThroughputOverride: S.optional(__S(2572, __c80, 12)),
          RegionName: S.optional(S.String),
          ReplicaStatus: S.optional(S.String),
          ReplicaStatusDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableReplica" });
    case 16:
      return S.Array(__S(2575, __c80, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          SourceBackupArn: S.optional(S.String),
          SourceTableArn: S.optional(S.String),
          RestoreDateTime: S.optional(S.String),
          RestoreInProgress: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableRestoreSummary" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          InaccessibleEncryptionDateTime: S.optional(S.String),
          Status: S.optional(S.String),
          SseType: S.optional(S.String),
          KmsMasterKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableSseDescription" });
    case 19:
      return S.suspend(() =>
        S.Struct({ StreamEnabled: S.optional(S.Boolean), StreamViewType: S.optional(S.String) }),
      ).annotate({ identifier: "AwsDynamoDbTableStreamSpecification" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AttributeDefinitions: S.optional(__S(2562, __c80, 2)),
          BillingModeSummary: S.optional(__S(2563, __c80, 3)),
          CreationDateTime: S.optional(S.String),
          GlobalSecondaryIndexes: S.optional(__S(2569, __c80, 9)),
          GlobalTableVersion: S.optional(S.String),
          ItemCount: S.optional(S.Number),
          KeySchema: S.optional(__S(2565, __c80, 5)),
          LatestStreamArn: S.optional(S.String),
          LatestStreamLabel: S.optional(S.String),
          LocalSecondaryIndexes: S.optional(__S(2571, __c80, 11)),
          ProvisionedThroughput: S.optional(__S(2567, __c80, 7)),
          Replicas: S.optional(__S(2576, __c80, 16)),
          RestoreSummary: S.optional(__S(2577, __c80, 17)),
          SseDescription: S.optional(__S(2578, __c80, 18)),
          StreamSpecification: S.optional(__S(2579, __c80, 19)),
          TableId: S.optional(S.String),
          TableName: S.optional(S.String),
          TableSizeBytes: S.optional(S.Number),
          TableStatus: S.optional(S.String),
          DeletionProtectionEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsDynamoDbTableDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          MetricsEnabled: S.optional(S.Boolean),
          LoggingLevel: S.optional(S.String),
          DataTraceEnabled: S.optional(S.Boolean),
          ThrottlingBurstLimit: S.optional(S.Number),
          ThrottlingRateLimit: S.optional(S.Number),
          CachingEnabled: S.optional(S.Boolean),
          CacheTtlInSeconds: S.optional(S.Number),
          CacheDataEncrypted: S.optional(S.Boolean),
          RequireAuthorizationForCacheControl: S.optional(S.Boolean),
          UnauthorizedCacheControlHeaderStrategy: S.optional(S.String),
          HttpMethod: S.optional(S.String),
          ResourcePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsApiGatewayMethodSettings" });
    case 22:
      return S.Array(__S(2581, __c80, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          PercentTraffic: S.optional(S.Number),
          DeploymentId: S.optional(S.String),
          StageVariableOverrides: S.optional(__S(1664, __c52, 0)),
          UseStageCache: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsApiGatewayCanarySettings" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          DeploymentId: S.optional(S.String),
          ClientCertificateId: S.optional(S.String),
          StageName: S.optional(S.String),
          Description: S.optional(S.String),
          CacheClusterEnabled: S.optional(S.Boolean),
          CacheClusterSize: S.optional(S.String),
          CacheClusterStatus: S.optional(S.String),
          MethodSettings: S.optional(__S(2582, __c80, 22)),
          Variables: S.optional(__S(1664, __c52, 0)),
          DocumentationVersion: S.optional(S.String),
          AccessLogSettings: S.optional(__S(2557, __c79, 29)),
          CanarySettings: S.optional(__S(2583, __c80, 23)),
          TracingEnabled: S.optional(S.Boolean),
          CreatedDate: S.optional(S.String),
          LastUpdatedDate: S.optional(S.String),
          WebAclArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsApiGatewayStageDetails" });
    case 25:
      return S.suspend(() => S.Struct({ Types: S.optional(__S(1504, __c47, 0)) })).annotate({
        identifier: "AwsApiGatewayEndpointConfiguration",
      });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedDate: S.optional(S.String),
          Version: S.optional(S.String),
          BinaryMediaTypes: S.optional(__S(1504, __c47, 0)),
          MinimumCompressionSize: S.optional(S.Number),
          ApiKeySource: S.optional(S.String),
          EndpointConfiguration: S.optional(__S(2585, __c80, 25)),
        }),
      ).annotate({ identifier: "AwsApiGatewayRestApiDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          CloudWatchLogsRoleArn: S.optional(S.String),
          HasCustomEventSelectors: S.optional(S.Boolean),
          HomeRegion: S.optional(S.String),
          IncludeGlobalServiceEvents: S.optional(S.Boolean),
          IsMultiRegionTrail: S.optional(S.Boolean),
          IsOrganizationTrail: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          LogFileValidationEnabled: S.optional(S.Boolean),
          Name: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3KeyPrefix: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SnsTopicName: S.optional(S.String),
          TrailArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudTrailTrailDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          CompliantCriticalCount: S.optional(S.Number),
          CompliantHighCount: S.optional(S.Number),
          CompliantMediumCount: S.optional(S.Number),
          ExecutionType: S.optional(S.String),
          NonCompliantCriticalCount: S.optional(S.Number),
          CompliantInformationalCount: S.optional(S.Number),
          NonCompliantInformationalCount: S.optional(S.Number),
          CompliantUnspecifiedCount: S.optional(S.Number),
          NonCompliantLowCount: S.optional(S.Number),
          NonCompliantHighCount: S.optional(S.Number),
          CompliantLowCount: S.optional(S.Number),
          ComplianceType: S.optional(S.String),
          PatchBaselineId: S.optional(S.String),
          OverallSeverity: S.optional(S.String),
          NonCompliantMediumCount: S.optional(S.Number),
          NonCompliantUnspecifiedCount: S.optional(S.Number),
          PatchGroup: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsSsmComplianceSummary" });
    case 29:
      return S.suspend(() =>
        S.Struct({ ComplianceSummary: S.optional(__S(2588, __c80, 28)) }),
      ).annotate({ identifier: "AwsSsmPatch" });
    case 30:
      return S.suspend(() => S.Struct({ Patch: S.optional(__S(2589, __c80, 29)) })).annotate({
        identifier: "AwsSsmPatchComplianceDetails",
      });
    case 31:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          ResourceRecord: S.optional(__S(2417, __c75, 17)),
          ValidationDomain: S.optional(S.String),
          ValidationEmails: S.optional(__S(1504, __c47, 0)),
          ValidationMethod: S.optional(S.String),
          ValidationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCertificateManagerCertificateDomainValidationOption" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2591, __c80, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), OId: S.optional(S.String) }),
      ).annotate({ identifier: "AwsCertificateManagerCertificateExtendedKeyUsage" });
    case 2:
      return S.Array(__S(2593, __c81, 1));
    case 3:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AwsCertificateManagerCertificateKeyUsage",
      });
    case 4:
      return S.Array(__S(2595, __c81, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ CertificateTransparencyLoggingPreference: S.optional(S.String) }),
      ).annotate({ identifier: "AwsCertificateManagerCertificateOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DomainValidationOptions: S.optional(__S(2592, __c81, 0)),
          RenewalStatus: S.optional(S.String),
          RenewalStatusReason: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCertificateManagerCertificateRenewalSummary" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityArn: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          DomainName: S.optional(S.String),
          DomainValidationOptions: S.optional(__S(2592, __c81, 0)),
          ExtendedKeyUsages: S.optional(__S(2594, __c81, 2)),
          FailureReason: S.optional(S.String),
          ImportedAt: S.optional(S.String),
          InUseBy: S.optional(__S(1504, __c47, 0)),
          IssuedAt: S.optional(S.String),
          Issuer: S.optional(S.String),
          KeyAlgorithm: S.optional(S.String),
          KeyUsages: S.optional(__S(2596, __c81, 4)),
          NotAfter: S.optional(S.String),
          NotBefore: S.optional(S.String),
          Options: S.optional(__S(2597, __c81, 5)),
          RenewalEligibility: S.optional(S.String),
          RenewalSummary: S.optional(__S(2598, __c81, 6)),
          Serial: S.optional(S.String),
          SignatureAlgorithm: S.optional(S.String),
          Status: S.optional(S.String),
          Subject: S.optional(S.String),
          SubjectAlternativeNames: S.optional(__S(1504, __c47, 0)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCertificateManagerCertificateDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          NodeRole: S.optional(S.String),
          PrivateIpAddress: S.optional(S.String),
          PublicIpAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterClusterNode" });
    case 9:
      return S.Array(__S(2600, __c81, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          ParameterName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
          ParameterApplyErrorDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterClusterParameterStatus" });
    case 11:
      return S.Array(__S(2602, __c81, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          ClusterParameterStatusList: S.optional(__S(2603, __c81, 11)),
          ParameterApplyStatus: S.optional(S.String),
          ParameterGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterClusterParameterGroup" });
    case 13:
      return S.Array(__S(2604, __c81, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ ClusterSecurityGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRedshiftClusterClusterSecurityGroup" });
    case 15:
      return S.Array(__S(2606, __c81, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          DestinationRegion: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          RetentionPeriod: S.optional(S.Number),
          SnapshotCopyGrantName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterClusterSnapshotCopyStatus" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          DeferMaintenanceEndTime: S.optional(S.String),
          DeferMaintenanceIdentifier: S.optional(S.String),
          DeferMaintenanceStartTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterDeferredMaintenanceWindow" });
    case 18:
      return S.Array(__S(2609, __c81, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({ ElasticIp: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRedshiftClusterElasticIpStatus" });
    case 20:
      return S.suspend(() =>
        S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
      ).annotate({ identifier: "AwsRedshiftClusterEndpoint" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          HsmClientCertificateIdentifier: S.optional(S.String),
          HsmConfigurationIdentifier: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterHsmStatus" });
    case 22:
      return S.suspend(() =>
        S.Struct({ ApplyStatus: S.optional(S.String), IamRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRedshiftClusterIamRole" });
    case 23:
      return S.Array(__S(2614, __c81, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          ClusterIdentifier: S.optional(S.String),
          ClusterType: S.optional(S.String),
          ClusterVersion: S.optional(S.String),
          EncryptionType: S.optional(S.String),
          EnhancedVpcRouting: S.optional(S.Boolean),
          MaintenanceTrackName: S.optional(S.String),
          MasterUserPassword: S.optional(S.String),
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterPendingModifiedValues" });
    case 25:
      return S.suspend(() =>
        S.Struct({ AllowCancelResize: S.optional(S.Boolean), ResizeType: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRedshiftClusterResizeInfo" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          CurrentRestoreRateInMegaBytesPerSecond: S.optional(S.Number),
          ElapsedTimeInSeconds: S.optional(S.Number),
          EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
          ProgressInMegaBytes: S.optional(S.Number),
          SnapshotSizeInMegaBytes: S.optional(S.Number),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterRestoreStatus" });
    case 27:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), VpcSecurityGroupId: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRedshiftClusterVpcSecurityGroup" });
    case 28:
      return S.Array(__S(2619, __c81, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          LastFailureMessage: S.optional(S.String),
          LastFailureTime: S.optional(S.String),
          LastSuccessfulDeliveryTime: S.optional(S.String),
          LoggingEnabled: S.optional(S.Boolean),
          S3KeyPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterLoggingStatus" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          AllowVersionUpgrade: S.optional(S.Boolean),
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          ClusterAvailabilityStatus: S.optional(S.String),
          ClusterCreateTime: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          ClusterNodes: S.optional(__S(2601, __c81, 9)),
          ClusterParameterGroups: S.optional(__S(2605, __c81, 13)),
          ClusterPublicKey: S.optional(S.String),
          ClusterRevisionNumber: S.optional(S.String),
          ClusterSecurityGroups: S.optional(__S(2607, __c81, 15)),
          ClusterSnapshotCopyStatus: S.optional(__S(2608, __c81, 16)),
          ClusterStatus: S.optional(S.String),
          ClusterSubnetGroupName: S.optional(S.String),
          ClusterVersion: S.optional(S.String),
          DBName: S.optional(S.String),
          DeferredMaintenanceWindows: S.optional(__S(2610, __c81, 18)),
          ElasticIpStatus: S.optional(__S(2611, __c81, 19)),
          ElasticResizeNumberOfNodeOptions: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          Endpoint: S.optional(__S(2612, __c81, 20)),
          EnhancedVpcRouting: S.optional(S.Boolean),
          ExpectedNextSnapshotScheduleTime: S.optional(S.String),
          ExpectedNextSnapshotScheduleTimeStatus: S.optional(S.String),
          HsmStatus: S.optional(__S(2613, __c81, 21)),
          IamRoles: S.optional(__S(2615, __c81, 23)),
          KmsKeyId: S.optional(S.String),
          MaintenanceTrackName: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          NextMaintenanceWindowStartTime: S.optional(S.String),
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          PendingActions: S.optional(__S(1504, __c47, 0)),
          PendingModifiedValues: S.optional(__S(2616, __c81, 24)),
          PreferredMaintenanceWindow: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          ResizeInfo: S.optional(__S(2617, __c81, 25)),
          RestoreStatus: S.optional(__S(2618, __c81, 26)),
          SnapshotScheduleIdentifier: S.optional(S.String),
          SnapshotScheduleState: S.optional(S.String),
          VpcId: S.optional(S.String),
          VpcSecurityGroups: S.optional(__S(2620, __c81, 28)),
          LoggingStatus: S.optional(__S(2621, __c81, 29)),
        }),
      ).annotate({ identifier: "AwsRedshiftClusterDetails" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          InstancePort: S.optional(S.Number),
          PolicyNames: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerBackendServerDescription" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2623, __c81, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          HealthyThreshold: S.optional(S.Number),
          Interval: S.optional(S.Number),
          Target: S.optional(S.String),
          Timeout: S.optional(S.Number),
          UnhealthyThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerHealthCheck" });
    case 2:
      return S.suspend(() => S.Struct({ InstanceId: S.optional(S.String) })).annotate({
        identifier: "AwsElbLoadBalancerInstance",
      });
    case 3:
      return S.Array(__S(2626, __c82, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          InstancePort: S.optional(S.Number),
          InstanceProtocol: S.optional(S.String),
          LoadBalancerPort: S.optional(S.Number),
          Protocol: S.optional(S.String),
          SslCertificateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerListener" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Listener: S.optional(__S(2628, __c82, 4)),
          PolicyNames: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerListenerDescription" });
    case 6:
      return S.Array(__S(2629, __c82, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          EmitInterval: S.optional(S.Number),
          Enabled: S.optional(S.Boolean),
          S3BucketName: S.optional(S.String),
          S3BucketPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerAccessLog" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), Timeout: S.optional(S.Number) }),
      ).annotate({ identifier: "AwsElbLoadBalancerConnectionDraining" });
    case 9:
      return S.suspend(() => S.Struct({ IdleTimeout: S.optional(S.Number) })).annotate({
        identifier: "AwsElbLoadBalancerConnectionSettings",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AccessLog: S.optional(__S(2631, __c82, 7)),
          ConnectionDraining: S.optional(__S(2632, __c82, 8)),
          ConnectionSettings: S.optional(__S(2633, __c82, 9)),
          CrossZoneLoadBalancing: S.optional(__S(2500, __c78, 4)),
          AdditionalAttributes: S.optional(__S(3137, __c98, 1)),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerAttributes" });
    case 11:
      return S.suspend(() =>
        S.Struct({ CookieName: S.optional(S.String), PolicyName: S.optional(S.String) }),
      ).annotate({ identifier: "AwsElbAppCookieStickinessPolicy" });
    case 12:
      return S.Array(__S(2635, __c82, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          CookieExpirationPeriod: S.optional(S.Number),
          PolicyName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElbLbCookieStickinessPolicy" });
    case 14:
      return S.Array(__S(2637, __c82, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          AppCookieStickinessPolicies: S.optional(__S(2636, __c82, 12)),
          LbCookieStickinessPolicies: S.optional(__S(2638, __c82, 14)),
          OtherPolicies: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerPolicies" });
    case 16:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), OwnerAlias: S.optional(S.String) }),
      ).annotate({ identifier: "AwsElbLoadBalancerSourceSecurityGroup" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(1504, __c47, 0)),
          BackendServerDescriptions: S.optional(__S(2624, __c82, 0)),
          CanonicalHostedZoneName: S.optional(S.String),
          CanonicalHostedZoneNameID: S.optional(S.String),
          CreatedTime: S.optional(S.String),
          DnsName: S.optional(S.String),
          HealthCheck: S.optional(__S(2625, __c82, 1)),
          Instances: S.optional(__S(2627, __c82, 3)),
          ListenerDescriptions: S.optional(__S(2630, __c82, 6)),
          LoadBalancerAttributes: S.optional(__S(2634, __c82, 10)),
          LoadBalancerName: S.optional(S.String),
          Policies: S.optional(__S(2639, __c82, 15)),
          Scheme: S.optional(S.String),
          SecurityGroups: S.optional(__S(1504, __c47, 0)),
          SourceSecurityGroup: S.optional(__S(2640, __c82, 16)),
          Subnets: S.optional(__S(1504, __c47, 0)),
          VpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsElbLoadBalancerDetails" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          AttachedManagedPolicies: S.optional(__S(2548, __c79, 20)),
          CreateDate: S.optional(S.String),
          GroupId: S.optional(S.String),
          GroupName: S.optional(S.String),
          GroupPolicyList: S.optional(__S(2551, __c79, 23)),
          Path: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamGroupDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssumeRolePolicyDocument: S.optional(S.String),
          CreateDate: S.optional(S.String),
          Path: S.optional(S.String),
          RoleId: S.optional(S.String),
          RoleName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamInstanceProfileRole" });
    case 20:
      return S.Array(__S(2643, __c82, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreateDate: S.optional(S.String),
          InstanceProfileId: S.optional(S.String),
          InstanceProfileName: S.optional(S.String),
          Path: S.optional(S.String),
          Roles: S.optional(__S(2644, __c82, 20)),
        }),
      ).annotate({ identifier: "AwsIamInstanceProfile" });
    case 22:
      return S.Array(__S(2645, __c82, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AssumeRolePolicyDocument: S.optional(S.String),
          AttachedManagedPolicies: S.optional(__S(2548, __c79, 20)),
          CreateDate: S.optional(S.String),
          InstanceProfileList: S.optional(__S(2646, __c82, 22)),
          PermissionsBoundary: S.optional(__S(2549, __c79, 21)),
          RoleId: S.optional(S.String),
          RoleName: S.optional(S.String),
          RolePolicyList: S.optional(__S(2551, __c79, 23)),
          MaxSessionDuration: S.optional(S.Number),
          Path: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsIamRoleDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          AWSAccountId: S.optional(S.String),
          CreationDate: S.optional(S.Number),
          KeyId: S.optional(S.String),
          KeyManager: S.optional(S.String),
          KeyState: S.optional(S.String),
          Origin: S.optional(S.String),
          Description: S.optional(S.String),
          KeyRotationStatus: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsKmsKeyDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.optional(S.String),
          S3Key: S.optional(S.String),
          S3ObjectVersion: S.optional(S.String),
          ZipFile: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsLambdaFunctionCode" });
    case 26:
      return S.suspend(() => S.Struct({ TargetArn: S.optional(S.String) })).annotate({
        identifier: "AwsLambdaFunctionDeadLetterConfig",
      });
    case 27:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "AwsLambdaFunctionEnvironmentError" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Variables: S.optional(__S(1664, __c52, 0)),
          Error: S.optional(__S(2651, __c82, 27)),
        }),
      ).annotate({ identifier: "AwsLambdaFunctionEnvironment" });
    case 29:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), CodeSize: S.optional(S.Number) }),
      ).annotate({ identifier: "AwsLambdaFunctionLayer" });
    case 30:
      return S.Array(__S(2653, __c82, 29));
    case 31:
      return S.suspend(() => S.Struct({ Mode: S.optional(S.String) })).annotate({
        identifier: "AwsLambdaFunctionTracingConfig",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityGroupIds: S.optional(__S(1504, __c47, 0)),
          SubnetIds: S.optional(__S(1504, __c47, 0)),
          VpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsLambdaFunctionVpcConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Code: S.optional(__S(2649, __c82, 25)),
          CodeSha256: S.optional(S.String),
          DeadLetterConfig: S.optional(__S(2650, __c82, 26)),
          Environment: S.optional(__S(2652, __c82, 28)),
          FunctionName: S.optional(S.String),
          Handler: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          LastModified: S.optional(S.String),
          Layers: S.optional(__S(2654, __c82, 30)),
          MasterArn: S.optional(S.String),
          MemorySize: S.optional(S.Number),
          RevisionId: S.optional(S.String),
          Role: S.optional(S.String),
          Runtime: S.optional(S.String),
          Timeout: S.optional(S.Number),
          TracingConfig: S.optional(__S(2655, __c82, 31)),
          VpcConfig: S.optional(__S(2656, __c83, 0)),
          Version: S.optional(S.String),
          Architectures: S.optional(__S(1504, __c47, 0)),
          PackageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsLambdaFunctionDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Version: S.optional(S.Number),
          CompatibleRuntimes: S.optional(__S(1504, __c47, 0)),
          CreatedDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsLambdaLayerVersionDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          FeatureName: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbInstanceAssociatedRole" });
    case 4:
      return S.Array(__S(2659, __c83, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          Port: S.optional(S.Number),
          HostedZoneId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbInstanceEndpoint" });
    case 6:
      return S.suspend(() =>
        S.Struct({ VpcSecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRdsDbInstanceVpcSecurityGroup" });
    case 7:
      return S.Array(__S(2662, __c83, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          DbParameterGroupName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbParameterGroup" });
    case 9:
      return S.Array(__S(2664, __c83, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(__S(2595, __c81, 3)),
          SubnetStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbSubnetGroupSubnet" });
    case 11:
      return S.Array(__S(2666, __c83, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          DbSubnetGroupName: S.optional(S.String),
          DbSubnetGroupDescription: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetGroupStatus: S.optional(S.String),
          Subnets: S.optional(__S(2667, __c83, 11)),
          DbSubnetGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbSubnetGroup" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          LogTypesToEnable: S.optional(__S(1504, __c47, 0)),
          LogTypesToDisable: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsRdsPendingCloudWatchLogsExports" });
    case 14:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRdsDbProcessorFeature" });
    case 15:
      return S.Array(__S(2670, __c83, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          DbInstanceClass: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          MasterUserPassword: S.optional(S.String),
          Port: S.optional(S.Number),
          BackupRetentionPeriod: S.optional(S.Number),
          MultiAZ: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          DbInstanceIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          CaCertificateIdentifier: S.optional(S.String),
          DbSubnetGroupName: S.optional(S.String),
          PendingCloudWatchLogsExports: S.optional(__S(2669, __c83, 13)),
          ProcessorFeatures: S.optional(__S(2671, __c83, 15)),
        }),
      ).annotate({ identifier: "AwsRdsDbPendingModifiedValues" });
    case 17:
      return S.suspend(() =>
        S.Struct({ OptionGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRdsDbOptionGroupMembership" });
    case 18:
      return S.Array(__S(2673, __c83, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          StatusType: S.optional(S.String),
          Normal: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbStatusInfo" });
    case 20:
      return S.Array(__S(2675, __c83, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          Status: S.optional(S.String),
          Fqdn: S.optional(S.String),
          IamRoleName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbDomainMembership" });
    case 22:
      return S.Array(__S(2677, __c83, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          AssociatedRoles: S.optional(__S(2660, __c83, 4)),
          CACertificateIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          DbInstancePort: S.optional(S.Number),
          DbiResourceId: S.optional(S.String),
          DBName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          Endpoint: S.optional(__S(2661, __c83, 5)),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          InstanceCreateTime: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          StorageEncrypted: S.optional(S.Boolean),
          TdeCredentialArn: S.optional(S.String),
          VpcSecurityGroups: S.optional(__S(2663, __c83, 7)),
          MultiAz: S.optional(S.Boolean),
          EnhancedMonitoringResourceArn: S.optional(S.String),
          DbInstanceStatus: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          DbSecurityGroups: S.optional(__S(1504, __c47, 0)),
          DbParameterGroups: S.optional(__S(2665, __c83, 9)),
          AvailabilityZone: S.optional(S.String),
          DbSubnetGroup: S.optional(__S(2668, __c83, 12)),
          PreferredMaintenanceWindow: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(2672, __c83, 16)),
          LatestRestorableTime: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          ReadReplicaSourceDBInstanceIdentifier: S.optional(S.String),
          ReadReplicaDBInstanceIdentifiers: S.optional(__S(1504, __c47, 0)),
          ReadReplicaDBClusterIdentifiers: S.optional(__S(1504, __c47, 0)),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          OptionGroupMemberships: S.optional(__S(2674, __c83, 18)),
          CharacterSetName: S.optional(S.String),
          SecondaryAvailabilityZone: S.optional(S.String),
          StatusInfos: S.optional(__S(2676, __c83, 20)),
          StorageType: S.optional(S.String),
          DomainMemberships: S.optional(__S(2678, __c83, 22)),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          Timezone: S.optional(S.String),
          PerformanceInsightsEnabled: S.optional(S.Boolean),
          PerformanceInsightsKmsKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          EnabledCloudWatchLogsExports: S.optional(__S(1504, __c47, 0)),
          ProcessorFeatures: S.optional(__S(2671, __c83, 15)),
          ListenerEndpoint: S.optional(__S(2661, __c83, 5)),
          MaxAllocatedStorage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsRdsDbInstanceDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({ Endpoint: S.optional(S.String), Protocol: S.optional(S.String) }),
      ).annotate({ identifier: "AwsSnsTopicSubscription" });
    case 25:
      return S.Array(__S(2680, __c83, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          KmsMasterKeyId: S.optional(S.String),
          Subscription: S.optional(__S(2681, __c83, 25)),
          TopicName: S.optional(S.String),
          Owner: S.optional(S.String),
          SqsSuccessFeedbackRoleArn: S.optional(S.String),
          SqsFailureFeedbackRoleArn: S.optional(S.String),
          ApplicationSuccessFeedbackRoleArn: S.optional(S.String),
          FirehoseSuccessFeedbackRoleArn: S.optional(S.String),
          FirehoseFailureFeedbackRoleArn: S.optional(S.String),
          HttpSuccessFeedbackRoleArn: S.optional(S.String),
          HttpFailureFeedbackRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsSnsTopicDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          KmsDataKeyReusePeriodSeconds: S.optional(S.Number),
          KmsMasterKeyId: S.optional(S.String),
          QueueName: S.optional(S.String),
          DeadLetterTargetArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsSqsQueueDetails" });
    case 28:
      return S.suspend(() => S.Struct({ Type: S.optional(S.String) })).annotate({
        identifier: "WafAction",
      });
    case 29:
      return S.suspend(() => S.Struct({ RuleId: S.optional(S.String) })).annotate({
        identifier: "WafExcludedRule",
      });
    case 30:
      return S.Array(__S(2685, __c83, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(2684, __c83, 28)),
          ExcludedRules: S.optional(__S(2686, __c83, 30)),
          OverrideAction: S.optional(__S(2684, __c83, 28)),
          Priority: S.optional(S.Number),
          RuleId: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafWebAclRule" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2687, __c83, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DefaultAction: S.optional(S.String),
          Rules: S.optional(__S(2688, __c84, 0)),
          WebAclId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafWebAclDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DbSnapshotIdentifier: S.optional(S.String),
          DbInstanceIdentifier: S.optional(S.String),
          SnapshotCreateTime: S.optional(S.String),
          Engine: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          VpcId: S.optional(S.String),
          InstanceCreateTime: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Iops: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          PercentProgress: S.optional(S.Number),
          SourceRegion: S.optional(S.String),
          SourceDbSnapshotIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          Timezone: S.optional(S.String),
          IamDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          ProcessorFeatures: S.optional(__S(2671, __c83, 15)),
          DbiResourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbSnapshotDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeValues: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute" });
    case 4:
      return S.Array(__S(2691, __c84, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(1504, __c47, 0)),
          SnapshotCreateTime: S.optional(S.String),
          Engine: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          VpcId: S.optional(S.String),
          ClusterCreateTime: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          PercentProgress: S.optional(S.Number),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbClusterIdentifier: S.optional(S.String),
          DbClusterSnapshotIdentifier: S.optional(S.String),
          IamDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          DbClusterSnapshotAttributes: S.optional(__S(2692, __c84, 4)),
        }),
      ).annotate({ identifier: "AwsRdsDbClusterSnapshotDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRdsDbClusterAssociatedRole" });
    case 7:
      return S.Array(__S(2694, __c84, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ DbClusterOptionGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRdsDbClusterOptionGroupMembership" });
    case 9:
      return S.Array(__S(2696, __c84, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          IsClusterWriter: S.optional(S.Boolean),
          PromotionTier: S.optional(S.Number),
          DbInstanceIdentifier: S.optional(S.String),
          DbClusterParameterGroupStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbClusterMember" });
    case 11:
      return S.Array(__S(2698, __c84, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          AllocatedStorage: S.optional(S.Number),
          AvailabilityZones: S.optional(__S(1504, __c47, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
          DatabaseName: S.optional(S.String),
          Status: S.optional(S.String),
          Endpoint: S.optional(S.String),
          ReaderEndpoint: S.optional(S.String),
          CustomEndpoints: S.optional(__S(1504, __c47, 0)),
          MultiAz: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          ReadReplicaIdentifiers: S.optional(__S(1504, __c47, 0)),
          VpcSecurityGroups: S.optional(__S(2663, __c83, 7)),
          HostedZoneId: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbClusterResourceId: S.optional(S.String),
          AssociatedRoles: S.optional(__S(2695, __c84, 7)),
          ClusterCreateTime: S.optional(S.String),
          EnabledCloudWatchLogsExports: S.optional(__S(1504, __c47, 0)),
          EngineMode: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          HttpEndpointEnabled: S.optional(S.Boolean),
          ActivityStreamStatus: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          CrossAccountClone: S.optional(S.Boolean),
          DomainMemberships: S.optional(__S(2678, __c83, 22)),
          DbClusterParameterGroup: S.optional(S.String),
          DbSubnetGroup: S.optional(S.String),
          DbClusterOptionGroupMemberships: S.optional(__S(2697, __c84, 9)),
          DbClusterIdentifier: S.optional(S.String),
          DbClusterMembers: S.optional(__S(2699, __c84, 11)),
          IamDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsRdsDbClusterDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          CloudWatchEncryptionEnabled: S.optional(S.Boolean),
          CloudWatchLogGroupName: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3EncryptionEnabled: S.optional(S.Boolean),
          S3KeyPrefix: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          KmsKeyId: S.optional(S.String),
          LogConfiguration: S.optional(__S(2701, __c84, 13)),
          Logging: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsClusterConfigurationExecuteCommandConfigurationDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({ ExecuteCommandConfiguration: S.optional(__S(2702, __c84, 14)) }),
      ).annotate({ identifier: "AwsEcsClusterConfigurationDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Base: S.optional(S.Number),
          CapacityProvider: S.optional(S.String),
          Weight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcsClusterDefaultCapacityProviderStrategyDetails" });
    case 17:
      return S.Array(__S(2704, __c84, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          ActiveServicesCount: S.optional(S.Number),
          CapacityProviders: S.optional(__S(1504, __c47, 0)),
          ClusterSettings: S.optional(__S(2671, __c83, 15)),
          Configuration: S.optional(__S(2703, __c84, 15)),
          DefaultCapacityProviderStrategy: S.optional(__S(2705, __c84, 17)),
          ClusterName: S.optional(S.String),
          RegisteredContainerInstancesCount: S.optional(S.Number),
          RunningTasksCount: S.optional(S.Number),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsClusterDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({ SourceVolume: S.optional(S.String), ContainerPath: S.optional(S.String) }),
      ).annotate({ identifier: "AwsMountPoint" });
    case 20:
      return S.Array(__S(2707, __c84, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Image: S.optional(S.String),
          MountPoints: S.optional(__S(2708, __c84, 20)),
          Privileged: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsEcsContainerDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({ Condition: S.optional(S.String), ContainerName: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails" });
    case 23:
      return S.Array(__S(2710, __c84, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails" });
    case 25:
      return S.Array(__S(2712, __c84, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({ Hostname: S.optional(S.String), IpAddress: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails" });
    case 27:
      return S.Array(__S(2714, __c84, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({ Options: S.optional(__S(1664, __c52, 0)), Type: S.optional(S.String) }),
      ).annotate({
        identifier: "AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails",
      });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Command: S.optional(__S(1504, __c47, 0)),
          Interval: S.optional(S.Number),
          Retries: S.optional(S.Number),
          StartPeriod: S.optional(S.Number),
          Timeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({ Add: S.optional(__S(1504, __c47, 0)), Drop: S.optional(__S(1504, __c47, 0)) }),
      ).annotate({
        identifier: "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails",
      });
    case 31:
      return S.suspend(() =>
        S.Struct({
          ContainerPath: S.optional(S.String),
          HostPath: S.optional(S.String),
          Permissions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({
        identifier: "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2719, __c84, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContainerPath: S.optional(S.String),
          MountOptions: S.optional(__S(1504, __c47, 0)),
          Size: S.optional(S.Number),
        }),
      ).annotate({
        identifier: "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails",
      });
    case 2:
      return S.Array(__S(2721, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Capabilities: S.optional(__S(2718, __c84, 30)),
          Devices: S.optional(__S(2720, __c85, 0)),
          InitProcessEnabled: S.optional(S.Boolean),
          MaxSwap: S.optional(S.Number),
          SharedMemorySize: S.optional(S.Number),
          Swappiness: S.optional(S.Number),
          Tmpfs: S.optional(__S(2722, __c85, 2)),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), ValueFrom: S.optional(S.String) }),
      ).annotate({
        identifier: "AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails",
      });
    case 5:
      return S.Array(__S(2724, __c85, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          LogDriver: S.optional(S.String),
          Options: S.optional(__S(1664, __c52, 0)),
          SecretOptions: S.optional(__S(2725, __c85, 5)),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ContainerPath: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          SourceVolume: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails" });
    case 8:
      return S.Array(__S(2727, __c85, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          ContainerPort: S.optional(S.Number),
          HostPort: S.optional(S.Number),
          Protocol: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails" });
    case 10:
      return S.Array(__S(2729, __c85, 9));
    case 11:
      return S.suspend(() => S.Struct({ CredentialsParameter: S.optional(S.String) })).annotate({
        identifier: "AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ Namespace: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails" });
    case 13:
      return S.Array(__S(2732, __c85, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          HardLimit: S.optional(S.Number),
          Name: S.optional(S.String),
          SoftLimit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails" });
    case 15:
      return S.Array(__S(2734, __c85, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ ReadOnly: S.optional(S.Boolean), SourceContainer: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails" });
    case 17:
      return S.Array(__S(2736, __c85, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Command: S.optional(__S(1504, __c47, 0)),
          Cpu: S.optional(S.Number),
          DependsOn: S.optional(__S(2711, __c84, 23)),
          DisableNetworking: S.optional(S.Boolean),
          DnsSearchDomains: S.optional(__S(1504, __c47, 0)),
          DnsServers: S.optional(__S(1504, __c47, 0)),
          DockerLabels: S.optional(__S(1664, __c52, 0)),
          DockerSecurityOptions: S.optional(__S(1504, __c47, 0)),
          EntryPoint: S.optional(__S(1504, __c47, 0)),
          Environment: S.optional(__S(2671, __c83, 15)),
          EnvironmentFiles: S.optional(__S(2713, __c84, 25)),
          Essential: S.optional(S.Boolean),
          ExtraHosts: S.optional(__S(2715, __c84, 27)),
          FirelensConfiguration: S.optional(__S(2716, __c84, 28)),
          HealthCheck: S.optional(__S(2717, __c84, 29)),
          Hostname: S.optional(S.String),
          Image: S.optional(S.String),
          Interactive: S.optional(S.Boolean),
          Links: S.optional(__S(1504, __c47, 0)),
          LinuxParameters: S.optional(__S(2723, __c85, 3)),
          LogConfiguration: S.optional(__S(2726, __c85, 6)),
          Memory: S.optional(S.Number),
          MemoryReservation: S.optional(S.Number),
          MountPoints: S.optional(__S(2728, __c85, 8)),
          Name: S.optional(S.String),
          PortMappings: S.optional(__S(2730, __c85, 10)),
          Privileged: S.optional(S.Boolean),
          PseudoTerminal: S.optional(S.Boolean),
          ReadonlyRootFilesystem: S.optional(S.Boolean),
          RepositoryCredentials: S.optional(__S(2731, __c85, 11)),
          ResourceRequirements: S.optional(__S(2713, __c84, 25)),
          Secrets: S.optional(__S(2725, __c85, 5)),
          StartTimeout: S.optional(S.Number),
          StopTimeout: S.optional(S.Number),
          SystemControls: S.optional(__S(2733, __c85, 13)),
          Ulimits: S.optional(__S(2735, __c85, 15)),
          User: S.optional(S.String),
          VolumesFrom: S.optional(__S(2737, __c85, 17)),
          WorkingDirectory: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionContainerDefinitionsDetails" });
    case 19:
      return S.Array(__S(2738, __c85, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({ DeviceName: S.optional(S.String), DeviceType: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionInferenceAcceleratorsDetails" });
    case 21:
      return S.Array(__S(2740, __c85, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({ Expression: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionPlacementConstraintsDetails" });
    case 23:
      return S.Array(__S(2742, __c85, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          ProxyConfigurationProperties: S.optional(__S(2671, __c83, 15)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionProxyConfigurationDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          Autoprovision: S.optional(S.Boolean),
          Driver: S.optional(S.String),
          DriverOpts: S.optional(__S(1664, __c52, 0)),
          Labels: S.optional(__S(1664, __c52, 0)),
          Scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails" });
    case 26:
      return S.suspend(() =>
        S.Struct({ AccessPointId: S.optional(S.String), Iam: S.optional(S.String) }),
      ).annotate({
        identifier: "AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails",
      });
    case 27:
      return S.suspend(() =>
        S.Struct({
          AuthorizationConfig: S.optional(__S(2746, __c85, 26)),
          FilesystemId: S.optional(S.String),
          RootDirectory: S.optional(S.String),
          TransitEncryption: S.optional(S.String),
          TransitEncryptionPort: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails" });
    case 28:
      return S.suspend(() => S.Struct({ SourcePath: S.optional(S.String) })).annotate({
        identifier: "AwsEcsTaskDefinitionVolumesHostDetails",
      });
    case 29:
      return S.suspend(() =>
        S.Struct({
          DockerVolumeConfiguration: S.optional(__S(2745, __c85, 25)),
          EfsVolumeConfiguration: S.optional(__S(2747, __c85, 27)),
          Host: S.optional(__S(2748, __c85, 28)),
          Name: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionVolumesDetails" });
    case 30:
      return S.Array(__S(2749, __c85, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          ContainerDefinitions: S.optional(__S(2739, __c85, 19)),
          Cpu: S.optional(S.String),
          ExecutionRoleArn: S.optional(S.String),
          Family: S.optional(S.String),
          InferenceAccelerators: S.optional(__S(2741, __c85, 21)),
          IpcMode: S.optional(S.String),
          Memory: S.optional(S.String),
          NetworkMode: S.optional(S.String),
          PidMode: S.optional(S.String),
          PlacementConstraints: S.optional(__S(2743, __c85, 23)),
          ProxyConfiguration: S.optional(__S(2744, __c85, 24)),
          RequiresCompatibilities: S.optional(__S(1504, __c47, 0)),
          TaskRoleArn: S.optional(S.String),
          Volumes: S.optional(__S(2750, __c85, 30)),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsTaskDefinitionDetails" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), MountPath: S.optional(S.String) }),
      ).annotate({ identifier: "VolumeMount" });
    case 1:
      return S.Array(__S(2752, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContainerRuntime: S.optional(S.String),
          Name: S.optional(S.String),
          ImageId: S.optional(S.String),
          ImageName: S.optional(S.String),
          LaunchedAt: S.optional(S.String),
          VolumeMounts: S.optional(__S(2753, __c86, 1)),
          Privileged: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ContainerDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CustSubscriptionId: S.optional(S.String),
          CustomerAwsId: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          EventCategoriesList: S.optional(__S(1504, __c47, 0)),
          EventSubscriptionArn: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceIdsList: S.optional(__S(1504, __c47, 0)),
          SourceType: S.optional(S.String),
          Status: S.optional(S.String),
          SubscriptionCreationTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsEventSubscriptionDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Enable: S.optional(S.Boolean), Rollback: S.optional(S.Boolean) }),
      ).annotate({
        identifier: "AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DeploymentCircuitBreaker: S.optional(__S(2756, __c86, 4)),
          MaximumPercent: S.optional(S.Number),
          MinimumHealthyPercent: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcsServiceDeploymentConfigurationDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          ContainerPort: S.optional(S.Number),
          LoadBalancerName: S.optional(S.String),
          TargetGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsServiceLoadBalancersDetails" });
    case 7:
      return S.Array(__S(2758, __c86, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AssignPublicIp: S.optional(S.String),
          SecurityGroups: S.optional(__S(1504, __c47, 0)),
          Subnets: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ AwsVpcConfiguration: S.optional(__S(2760, __c86, 8)) }),
      ).annotate({ identifier: "AwsEcsServiceNetworkConfigurationDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({ Field: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcsServicePlacementStrategiesDetails" });
    case 11:
      return S.Array(__S(2762, __c86, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          ContainerPort: S.optional(S.Number),
          Port: S.optional(S.Number),
          RegistryArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsServiceServiceRegistriesDetails" });
    case 13:
      return S.Array(__S(2764, __c86, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderStrategy: S.optional(__S(2705, __c84, 17)),
          Cluster: S.optional(S.String),
          DeploymentConfiguration: S.optional(__S(2757, __c86, 5)),
          DeploymentController: S.optional(__S(2684, __c83, 28)),
          DesiredCount: S.optional(S.Number),
          EnableEcsManagedTags: S.optional(S.Boolean),
          EnableExecuteCommand: S.optional(S.Boolean),
          HealthCheckGracePeriodSeconds: S.optional(S.Number),
          LaunchType: S.optional(S.String),
          LoadBalancers: S.optional(__S(2759, __c86, 7)),
          Name: S.optional(S.String),
          NetworkConfiguration: S.optional(__S(2761, __c86, 9)),
          PlacementConstraints: S.optional(__S(2743, __c85, 23)),
          PlacementStrategies: S.optional(__S(2763, __c86, 11)),
          PlatformVersion: S.optional(S.String),
          PropagateTags: S.optional(S.String),
          Role: S.optional(S.String),
          SchedulingStrategy: S.optional(S.String),
          ServiceArn: S.optional(S.String),
          ServiceName: S.optional(S.String),
          ServiceRegistries: S.optional(__S(2765, __c86, 13)),
          TaskDefinition: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcsServiceDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          DeleteOnTermination: S.optional(S.Boolean),
          Encrypted: S.optional(S.Boolean),
          Iops: S.optional(S.Number),
          SnapshotId: S.optional(S.String),
          VolumeSize: S.optional(S.Number),
          VolumeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          DeviceName: S.optional(S.String),
          Ebs: S.optional(__S(2767, __c86, 15)),
          NoDevice: S.optional(S.Boolean),
          VirtualName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails" });
    case 17:
      return S.Array(__S(2768, __c86, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          HttpEndpoint: S.optional(S.String),
          HttpPutResponseHopLimit: S.optional(S.Number),
          HttpTokens: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAutoScalingLaunchConfigurationMetadataOptions" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AssociatePublicIpAddress: S.optional(S.Boolean),
          BlockDeviceMappings: S.optional(__S(2769, __c86, 17)),
          ClassicLinkVpcId: S.optional(S.String),
          ClassicLinkVpcSecurityGroups: S.optional(__S(1504, __c47, 0)),
          CreatedTime: S.optional(S.String),
          EbsOptimized: S.optional(S.Boolean),
          IamInstanceProfile: S.optional(S.String),
          ImageId: S.optional(S.String),
          InstanceMonitoring: S.optional(__S(2500, __c78, 4)),
          InstanceType: S.optional(S.String),
          KernelId: S.optional(S.String),
          KeyName: S.optional(S.String),
          LaunchConfigurationName: S.optional(S.String),
          PlacementTenancy: S.optional(S.String),
          RamdiskId: S.optional(S.String),
          SecurityGroups: S.optional(__S(1504, __c47, 0)),
          SpotPrice: S.optional(S.String),
          UserData: S.optional(S.String),
          MetadataOptions: S.optional(__S(2770, __c86, 18)),
        }),
      ).annotate({ identifier: "AwsAutoScalingLaunchConfigurationDetails" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AcceptedRouteCount: S.optional(S.Number),
          CertificateArn: S.optional(S.String),
          LastStatusChange: S.optional(S.String),
          OutsideIpAddress: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VpnConnectionVgwTelemetryDetails" });
    case 21:
      return S.Array(__S(2772, __c86, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          DpdTimeoutSeconds: S.optional(S.Number),
          IkeVersions: S.optional(__S(1504, __c47, 0)),
          OutsideIpAddress: S.optional(S.String),
          Phase1DhGroupNumbers: S.optional(__S(2176, __c68, 0)),
          Phase1EncryptionAlgorithms: S.optional(__S(1504, __c47, 0)),
          Phase1IntegrityAlgorithms: S.optional(__S(1504, __c47, 0)),
          Phase1LifetimeSeconds: S.optional(S.Number),
          Phase2DhGroupNumbers: S.optional(__S(2176, __c68, 0)),
          Phase2EncryptionAlgorithms: S.optional(__S(1504, __c47, 0)),
          Phase2IntegrityAlgorithms: S.optional(__S(1504, __c47, 0)),
          Phase2LifetimeSeconds: S.optional(S.Number),
          PreSharedKey: S.optional(S.String),
          RekeyFuzzPercentage: S.optional(S.Number),
          RekeyMarginTimeSeconds: S.optional(S.Number),
          ReplayWindowSize: S.optional(S.Number),
          TunnelInsideCidr: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VpnConnectionOptionsTunnelOptionsDetails" });
    case 23:
      return S.Array(__S(2774, __c86, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          StaticRoutesOnly: S.optional(S.Boolean),
          TunnelOptions: S.optional(__S(2775, __c86, 23)),
        }),
      ).annotate({ identifier: "AwsEc2VpnConnectionOptionsDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({ DestinationCidrBlock: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2VpnConnectionRoutesDetails" });
    case 26:
      return S.Array(__S(2777, __c86, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          VpnConnectionId: S.optional(S.String),
          State: S.optional(S.String),
          CustomerGatewayId: S.optional(S.String),
          CustomerGatewayConfiguration: S.optional(S.String),
          Type: S.optional(S.String),
          VpnGatewayId: S.optional(S.String),
          Category: S.optional(S.String),
          VgwTelemetry: S.optional(__S(2773, __c86, 21)),
          Options: S.optional(__S(2776, __c86, 24)),
          Routes: S.optional(__S(2778, __c86, 26)),
          TransitGatewayId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VpnConnectionDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          RegistryId: S.optional(S.String),
          RepositoryName: S.optional(S.String),
          Architecture: S.optional(S.String),
          ImageDigest: S.optional(S.String),
          ImageTags: S.optional(__S(1504, __c47, 0)),
          ImagePublishedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcrContainerImageDetails" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          AutomatedUpdateDate: S.optional(S.String),
          Cancellable: S.optional(S.Boolean),
          CurrentVersion: S.optional(S.String),
          Description: S.optional(S.String),
          NewVersion: S.optional(S.String),
          UpdateAvailable: S.optional(S.Boolean),
          UpdateStatus: S.optional(S.String),
          OptionalDeployment: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          InstanceCount: S.optional(S.Number),
          WarmEnabled: S.optional(S.Boolean),
          WarmCount: S.optional(S.Number),
          DedicatedMasterEnabled: S.optional(S.Boolean),
          ZoneAwarenessConfig: S.optional(__S(2495, __c77, 31)),
          DedicatedMasterCount: S.optional(S.Number),
          InstanceType: S.optional(S.String),
          WarmType: S.optional(S.String),
          ZoneAwarenessEnabled: S.optional(S.Boolean),
          DedicatedMasterType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainClusterConfigDetails" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          CustomEndpointCertificateArn: S.optional(S.String),
          CustomEndpointEnabled: S.optional(S.Boolean),
          EnforceHTTPS: S.optional(S.Boolean),
          CustomEndpoint: S.optional(S.String),
          TLSSecurityPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainDomainEndpointOptionsDetails" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityGroupIds: S.optional(__S(1504, __c47, 0)),
          SubnetIds: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainVpcOptionsDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MasterUserArn: S.optional(S.String),
          MasterUserName: S.optional(S.String),
          MasterUserPassword: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainMasterUserOptionsDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          InternalUserDatabaseEnabled: S.optional(S.Boolean),
          MasterUserOptions: S.optional(__S(2785, __c87, 1)),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AccessPolicies: S.optional(S.String),
          DomainName: S.optional(S.String),
          Id: S.optional(S.String),
          DomainEndpoint: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          EncryptionAtRestOptions: S.optional(__S(2497, __c78, 1)),
          NodeToNodeEncryptionOptions: S.optional(__S(2500, __c78, 4)),
          ServiceSoftwareOptions: S.optional(__S(2781, __c86, 29)),
          ClusterConfig: S.optional(__S(2782, __c86, 30)),
          DomainEndpointOptions: S.optional(__S(2783, __c86, 31)),
          VpcOptions: S.optional(__S(2784, __c87, 0)),
          LogPublishingOptions: S.optional(__S(2499, __c78, 3)),
          DomainEndpoints: S.optional(__S(1664, __c52, 0)),
          AdvancedSecurityOptions: S.optional(__S(2786, __c87, 2)),
        }),
      ).annotate({ identifier: "AwsOpenSearchServiceDomainDetails" });
    case 4:
      return S.suspend(() => S.Struct({ ServiceType: S.optional(S.String) })).annotate({
        identifier: "AwsEc2VpcEndpointServiceServiceTypeDetails",
      });
    case 5:
      return S.Array(__S(2788, __c87, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          AcceptanceRequired: S.optional(S.Boolean),
          AvailabilityZones: S.optional(__S(1504, __c47, 0)),
          BaseEndpointDnsNames: S.optional(__S(1504, __c47, 0)),
          ManagesVpcEndpoints: S.optional(S.Boolean),
          GatewayLoadBalancerArns: S.optional(__S(1504, __c47, 0)),
          NetworkLoadBalancerArns: S.optional(__S(1504, __c47, 0)),
          PrivateDnsName: S.optional(S.String),
          ServiceId: S.optional(S.String),
          ServiceName: S.optional(S.String),
          ServiceState: S.optional(S.String),
          ServiceType: S.optional(__S(2789, __c87, 5)),
        }),
      ).annotate({ identifier: "AwsEc2VpcEndpointServiceDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          KeyId: S.optional(S.String),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsXrayEncryptionConfigDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DataId: S.optional(S.String),
          Negated: S.optional(S.Boolean),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafRateBasedRuleMatchPredicate" });
    case 9:
      return S.Array(__S(2792, __c87, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Name: S.optional(S.String),
          RateKey: S.optional(S.String),
          RateLimit: S.optional(S.Number),
          RuleId: S.optional(S.String),
          MatchPredicates: S.optional(__S(2793, __c87, 9)),
        }),
      ).annotate({ identifier: "AwsWafRateBasedRuleDetails" });
    case 11:
      return S.suspend(() => S.Struct({ ScanOnPush: S.optional(S.Boolean) })).annotate({
        identifier: "AwsEcrRepositoryImageScanningConfigurationDetails",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ LifecyclePolicyText: S.optional(S.String), RegistryId: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEcrRepositoryLifecyclePolicyDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ImageScanningConfiguration: S.optional(__S(2795, __c87, 11)),
          ImageTagMutability: S.optional(S.String),
          LifecyclePolicy: S.optional(__S(2796, __c87, 12)),
          RepositoryName: S.optional(S.String),
          RepositoryPolicyText: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEcrRepositoryDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          SecurityGroupIds: S.optional(__S(1504, __c47, 0)),
          SubnetIds: S.optional(__S(1504, __c47, 0)),
          EndpointPublicAccess: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsEksClusterResourcesVpcConfigDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), Types: S.optional(__S(1504, __c47, 0)) }),
      ).annotate({ identifier: "AwsEksClusterLoggingClusterLoggingDetails" });
    case 16:
      return S.Array(__S(2799, __c87, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ ClusterLogging: S.optional(__S(2800, __c87, 16)) }),
      ).annotate({ identifier: "AwsEksClusterLoggingDetails" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CertificateAuthorityData: S.optional(S.String),
          ClusterStatus: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Name: S.optional(S.String),
          ResourcesVpcConfig: S.optional(__S(2798, __c87, 14)),
          RoleArn: S.optional(S.String),
          Version: S.optional(S.String),
          Logging: S.optional(__S(2801, __c87, 17)),
        }),
      ).annotate({ identifier: "AwsEksClusterDetails" });
    case 19:
      return S.suspend(() => S.Struct({ ResourceArn: S.optional(S.String) })).annotate({
        identifier: "FirewallPolicyStatefulRuleGroupReferencesDetails",
      });
    case 20:
      return S.Array(__S(2803, __c87, 19));
    case 21:
      return S.suspend(() => S.Struct({ Dimensions: S.optional(__S(2304, __c72, 0)) })).annotate({
        identifier: "StatelessCustomPublishMetricAction",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({ PublishMetricAction: S.optional(__S(2805, __c87, 21)) }),
      ).annotate({ identifier: "StatelessCustomActionDefinition" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          ActionDefinition: S.optional(__S(2806, __c87, 22)),
          ActionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallPolicyStatelessCustomActionsDetails" });
    case 24:
      return S.Array(__S(2807, __c87, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({ Priority: S.optional(S.Number), ResourceArn: S.optional(S.String) }),
      ).annotate({ identifier: "FirewallPolicyStatelessRuleGroupReferencesDetails" });
    case 26:
      return S.Array(__S(2809, __c87, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          StatefulRuleGroupReferences: S.optional(__S(2804, __c87, 20)),
          StatelessCustomActions: S.optional(__S(2808, __c87, 24)),
          StatelessDefaultActions: S.optional(__S(1504, __c47, 0)),
          StatelessFragmentDefaultActions: S.optional(__S(1504, __c47, 0)),
          StatelessRuleGroupReferences: S.optional(__S(2810, __c87, 26)),
        }),
      ).annotate({ identifier: "FirewallPolicyDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicy: S.optional(__S(2811, __c87, 27)),
          FirewallPolicyArn: S.optional(S.String),
          FirewallPolicyId: S.optional(S.String),
          FirewallPolicyName: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsNetworkFirewallFirewallPolicyDetails" });
    case 29:
      return S.suspend(() => S.Struct({ SubnetId: S.optional(S.String) })).annotate({
        identifier: "AwsNetworkFirewallFirewallSubnetMappingsDetails",
      });
    case 30:
      return S.Array(__S(2813, __c87, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          DeleteProtection: S.optional(S.Boolean),
          Description: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallId: S.optional(S.String),
          FirewallName: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
          FirewallPolicyChangeProtection: S.optional(S.Boolean),
          SubnetChangeProtection: S.optional(S.Boolean),
          SubnetMappings: S.optional(__S(2814, __c87, 30)),
          VpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsNetworkFirewallFirewallDetails" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Definition: S.optional(__S(1504, __c47, 0)) })).annotate({
        identifier: "RuleGroupVariablesIpSetsDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IpSets: S.optional(__S(2816, __c88, 0)),
          PortSets: S.optional(__S(2816, __c88, 0)),
        }),
      ).annotate({ identifier: "RuleGroupVariables" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          GeneratedRulesType: S.optional(S.String),
          TargetTypes: S.optional(__S(1504, __c47, 0)),
          Targets: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "RuleGroupSourceListDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(S.String),
          DestinationPort: S.optional(S.String),
          Direction: S.optional(S.String),
          Protocol: S.optional(S.String),
          Source: S.optional(S.String),
          SourcePort: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatefulRulesHeaderDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Keyword: S.optional(S.String), Settings: S.optional(__S(1504, __c47, 0)) }),
      ).annotate({ identifier: "RuleGroupSourceStatefulRulesOptionsDetails" });
    case 5:
      return S.Array(__S(2820, __c88, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          Header: S.optional(__S(2819, __c88, 3)),
          RuleOptions: S.optional(__S(2821, __c88, 5)),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatefulRulesDetails" });
    case 7:
      return S.Array(__S(2822, __c88, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ FromPort: S.optional(S.Number), ToPort: S.optional(S.Number) }),
      ).annotate({ identifier: "RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts" });
    case 9:
      return S.Array(__S(2824, __c88, 8));
    case 10:
      return S.suspend(() => S.Struct({ AddressDefinition: S.optional(S.String) })).annotate({
        identifier: "RuleGroupSourceStatelessRuleMatchAttributesDestinations",
      });
    case 11:
      return S.Array(__S(2826, __c88, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Flags: S.optional(__S(1504, __c47, 0)),
          Masks: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatelessRuleMatchAttributesTcpFlags" });
    case 13:
      return S.Array(__S(2828, __c88, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          DestinationPorts: S.optional(__S(2825, __c88, 9)),
          Destinations: S.optional(__S(2827, __c88, 11)),
          Protocols: S.optional(__S(2176, __c68, 0)),
          SourcePorts: S.optional(__S(2825, __c88, 9)),
          Sources: S.optional(__S(2827, __c88, 11)),
          TcpFlags: S.optional(__S(2829, __c88, 13)),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatelessRuleMatchAttributes" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Actions: S.optional(__S(1504, __c47, 0)),
          MatchAttributes: S.optional(__S(2830, __c88, 14)),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatelessRuleDefinition" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Priority: S.optional(S.Number),
          RuleDefinition: S.optional(__S(2831, __c88, 15)),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatelessRulesDetails" });
    case 17:
      return S.Array(__S(2832, __c88, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          CustomActions: S.optional(__S(2808, __c87, 24)),
          StatelessRules: S.optional(__S(2833, __c88, 17)),
        }),
      ).annotate({ identifier: "RuleGroupSourceStatelessRulesAndCustomActionsDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          RulesSourceList: S.optional(__S(2818, __c88, 2)),
          RulesString: S.optional(S.String),
          StatefulRules: S.optional(__S(2823, __c88, 7)),
          StatelessRulesAndCustomActions: S.optional(__S(2834, __c88, 18)),
        }),
      ).annotate({ identifier: "RuleGroupSource" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          RuleVariables: S.optional(__S(2817, __c88, 1)),
          RulesSource: S.optional(__S(2835, __c88, 19)),
        }),
      ).annotate({ identifier: "RuleGroupDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Capacity: S.optional(S.Number),
          Description: S.optional(S.String),
          RuleGroup: S.optional(__S(2836, __c88, 20)),
          RuleGroupArn: S.optional(S.String),
          RuleGroupId: S.optional(S.String),
          RuleGroupName: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsNetworkFirewallRuleGroupDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Ec2SecurityGroupId: S.optional(S.String),
          Ec2SecurityGroupName: S.optional(S.String),
          Ec2SecurityGroupOwnerId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbSecurityGroupEc2SecurityGroup" });
    case 23:
      return S.Array(__S(2838, __c88, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({ CidrIp: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRdsDbSecurityGroupIpRange" });
    case 25:
      return S.Array(__S(2840, __c88, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          DbSecurityGroupArn: S.optional(S.String),
          DbSecurityGroupDescription: S.optional(S.String),
          DbSecurityGroupName: S.optional(S.String),
          Ec2SecurityGroups: S.optional(__S(2839, __c88, 23)),
          IpRanges: S.optional(__S(2841, __c88, 25)),
          OwnerId: S.optional(S.String),
          VpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsRdsDbSecurityGroupDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({ EncryptionType: S.optional(S.String), KeyId: S.optional(S.String) }),
      ).annotate({ identifier: "AwsKinesisStreamStreamEncryptionDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          StreamEncryption: S.optional(__S(2843, __c88, 27)),
          ShardCount: S.optional(S.Number),
          RetentionPeriodHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsKinesisStreamDetails" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Description: S.optional(S.String),
          DefaultRouteTablePropagation: S.optional(S.String),
          AutoAcceptSharedAttachments: S.optional(S.String),
          DefaultRouteTableAssociation: S.optional(S.String),
          TransitGatewayCidrBlocks: S.optional(__S(1504, __c47, 0)),
          AssociationDefaultRouteTableId: S.optional(S.String),
          PropagationDefaultRouteTableId: S.optional(S.String),
          VpnEcmpSupport: S.optional(S.String),
          DnsSupport: S.optional(S.String),
          MulticastSupport: S.optional(S.String),
          AmazonSideAsn: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEc2TransitGatewayDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Gid: S.optional(S.String),
          SecondaryGids: S.optional(__S(1504, __c47, 0)),
          Uid: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEfsAccessPointPosixUserDetails" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          OwnerGid: S.optional(S.String),
          OwnerUid: S.optional(S.String),
          Permissions: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEfsAccessPointRootDirectoryCreationInfoDetails" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CreationInfo: S.optional(__S(2847, __c88, 31)), Path: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEfsAccessPointRootDirectoryDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessPointId: S.optional(S.String),
          Arn: S.optional(S.String),
          ClientToken: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          PosixUser: S.optional(__S(2846, __c88, 30)),
          RootDirectory: S.optional(__S(2848, __c89, 0)),
        }),
      ).annotate({ identifier: "AwsEfsAccessPointDetails" });
    case 2:
      return S.suspend(() => S.Struct({ StackDriftStatus: S.optional(S.String) })).annotate({
        identifier: "AwsCloudFormationStackDriftInformationDetails",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          OutputKey: S.optional(S.String),
          OutputValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudFormationStackOutputsDetails" });
    case 4:
      return S.Array(__S(2851, __c89, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Capabilities: S.optional(__S(1504, __c47, 0)),
          CreationTime: S.optional(S.String),
          Description: S.optional(S.String),
          DisableRollback: S.optional(S.Boolean),
          DriftInformation: S.optional(__S(2850, __c89, 2)),
          EnableTerminationProtection: S.optional(S.Boolean),
          LastUpdatedTime: S.optional(S.String),
          NotificationArns: S.optional(__S(1504, __c47, 0)),
          Outputs: S.optional(__S(2852, __c89, 4)),
          RoleArn: S.optional(S.String),
          StackId: S.optional(S.String),
          StackName: S.optional(S.String),
          StackStatus: S.optional(S.String),
          StackStatusReason: S.optional(S.String),
          TimeoutInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsCloudFormationStackDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ActionsEnabled: S.optional(S.Boolean),
          AlarmActions: S.optional(__S(1504, __c47, 0)),
          AlarmArn: S.optional(S.String),
          AlarmConfigurationUpdatedTimestamp: S.optional(S.String),
          AlarmDescription: S.optional(S.String),
          AlarmName: S.optional(S.String),
          ComparisonOperator: S.optional(S.String),
          DatapointsToAlarm: S.optional(S.Number),
          Dimensions: S.optional(__S(2671, __c83, 15)),
          EvaluateLowSampleCountPercentile: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          ExtendedStatistic: S.optional(S.String),
          InsufficientDataActions: S.optional(__S(1504, __c47, 0)),
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          OkActions: S.optional(__S(1504, __c47, 0)),
          Period: S.optional(S.Number),
          Statistic: S.optional(S.String),
          Threshold: S.optional(S.Number),
          ThresholdMetricId: S.optional(S.String),
          TreatMissingData: S.optional(S.String),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudWatchAlarmDetails" });
    case 7:
      return S.suspend(() => S.Struct({ CidrBlock: S.optional(S.String) })).annotate({
        identifier: "VpcInfoCidrBlockSetDetails",
      });
    case 8:
      return S.Array(__S(2855, __c89, 7));
    case 9:
      return S.suspend(() => S.Struct({ Ipv6CidrBlock: S.optional(S.String) })).annotate({
        identifier: "VpcInfoIpv6CidrBlockSetDetails",
      });
    case 10:
      return S.Array(__S(2857, __c89, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          AllowDnsResolutionFromRemoteVpc: S.optional(S.Boolean),
          AllowEgressFromLocalClassicLinkToRemoteVpc: S.optional(S.Boolean),
          AllowEgressFromLocalVpcToRemoteClassicLink: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VpcInfoPeeringOptionsDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          CidrBlock: S.optional(S.String),
          CidrBlockSet: S.optional(__S(2856, __c89, 8)),
          Ipv6CidrBlockSet: S.optional(__S(2858, __c89, 10)),
          OwnerId: S.optional(S.String),
          PeeringOptions: S.optional(__S(2859, __c89, 11)),
          Region: S.optional(S.String),
          VpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VpcPeeringConnectionVpcInfoDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          AccepterVpcInfo: S.optional(__S(2860, __c89, 12)),
          ExpirationTime: S.optional(S.String),
          RequesterVpcInfo: S.optional(__S(2860, __c89, 12)),
          Status: S.optional(__S(3104, __c97, 0)),
          VpcPeeringConnectionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2VpcPeeringConnectionDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(2684, __c83, 28)),
          Priority: S.optional(S.Number),
          RuleId: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafRegionalRuleGroupRulesDetails" });
    case 15:
      return S.Array(__S(2862, __c89, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Name: S.optional(S.String),
          RuleGroupId: S.optional(S.String),
          Rules: S.optional(__S(2863, __c89, 15)),
        }),
      ).annotate({ identifier: "AwsWafRegionalRuleGroupDetails" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Name: S.optional(S.String),
          PredicateList: S.optional(__S(2793, __c87, 9)),
          RuleId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafRegionalRuleDetails" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(2684, __c83, 28)),
          OverrideAction: S.optional(__S(2684, __c83, 28)),
          Priority: S.optional(S.Number),
          RuleId: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafRegionalWebAclRulesListDetails" });
    case 19:
      return S.Array(__S(2866, __c89, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          DefaultAction: S.optional(S.String),
          MetricName: S.optional(S.String),
          Name: S.optional(S.String),
          RulesList: S.optional(__S(2867, __c89, 19)),
          WebAclId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsWafRegionalWebAclDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Host: S.optional(__S(2748, __c85, 28)) }),
      ).annotate({ identifier: "AwsEcsTaskVolumeDetails" });
    case 22:
      return S.Array(__S(2869, __c89, 21));
    case 23:
      return S.Array(__S(2709, __c84, 21));
    case 24:
      return S.suspend(() =>
        S.Struct({
          ClusterArn: S.optional(S.String),
          TaskDefinitionArn: S.optional(S.String),
          Version: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          StartedAt: S.optional(S.String),
          StartedBy: S.optional(S.String),
          Group: S.optional(S.String),
          Volumes: S.optional(__S(2870, __c89, 22)),
          Containers: S.optional(__S(2871, __c89, 23)),
        }),
      ).annotate({ identifier: "AwsEcsTaskDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          BackupVaultEvents: S.optional(__S(1504, __c47, 0)),
          SnsTopicArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsBackupBackupVaultNotificationsDetails" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          BackupVaultArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          Notifications: S.optional(__S(2873, __c89, 25)),
          AccessPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsBackupBackupVaultDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          BackupOptions: S.optional(__S(1664, __c52, 0)),
          ResourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsBackupBackupPlanAdvancedBackupSettingsDetails" });
    case 28:
      return S.Array(__S(2875, __c89, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          DeleteAfterDays: S.optional(S.Number),
          MoveToColdStorageAfterDays: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsBackupBackupPlanLifecycleDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          DestinationBackupVaultArn: S.optional(S.String),
          Lifecycle: S.optional(__S(2877, __c89, 29)),
        }),
      ).annotate({ identifier: "AwsBackupBackupPlanRuleCopyActionsDetails" });
    case 31:
      return S.Array(__S(2878, __c89, 30));
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetBackupVault: S.optional(S.String),
          StartWindowMinutes: S.optional(S.Number),
          ScheduleExpression: S.optional(S.String),
          RuleName: S.optional(S.String),
          RuleId: S.optional(S.String),
          EnableContinuousBackup: S.optional(S.Boolean),
          CompletionWindowMinutes: S.optional(S.Number),
          CopyActions: S.optional(__S(2879, __c89, 31)),
          Lifecycle: S.optional(__S(2877, __c89, 29)),
        }),
      ).annotate({ identifier: "AwsBackupBackupPlanRuleDetails" });
    case 1:
      return S.Array(__S(2880, __c90, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackupPlanName: S.optional(S.String),
          AdvancedBackupSettings: S.optional(__S(2876, __c89, 28)),
          BackupPlanRule: S.optional(__S(2881, __c90, 1)),
        }),
      ).annotate({ identifier: "AwsBackupBackupPlanBackupPlanDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          BackupPlan: S.optional(__S(2882, __c90, 2)),
          BackupPlanArn: S.optional(S.String),
          BackupPlanId: S.optional(S.String),
          VersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsBackupBackupPlanDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ DeleteAt: S.optional(S.String), MoveToColdStorageAt: S.optional(S.String) }),
      ).annotate({ identifier: "AwsBackupRecoveryPointCalculatedLifecycleDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          BackupPlanArn: S.optional(S.String),
          BackupPlanId: S.optional(S.String),
          BackupPlanVersion: S.optional(S.String),
          BackupRuleId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsBackupRecoveryPointCreatedByDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          BackupSizeInBytes: S.optional(S.Number),
          BackupVaultArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          CalculatedLifecycle: S.optional(__S(2884, __c90, 4)),
          CompletionDate: S.optional(S.String),
          CreatedBy: S.optional(__S(2885, __c90, 5)),
          CreationDate: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          IsEncrypted: S.optional(S.Boolean),
          LastRestoreTime: S.optional(S.String),
          Lifecycle: S.optional(__S(2877, __c89, 29)),
          RecoveryPointArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          SourceBackupVaultArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          StorageClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsBackupRecoveryPointDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DeleteOnTermination: S.optional(S.Boolean),
          Encrypted: S.optional(S.Boolean),
          Iops: S.optional(S.Number),
          KmsKeyId: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          Throughput: S.optional(S.Number),
          VolumeSize: S.optional(S.Number),
          VolumeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DeviceName: S.optional(S.String),
          Ebs: S.optional(__S(2887, __c90, 7)),
          NoDevice: S.optional(S.String),
          VirtualName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails" });
    case 9:
      return S.Array(__S(2888, __c90, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationId: S.optional(S.String),
          CapacityReservationResourceGroupArn: S.optional(S.String),
        }),
      ).annotate({
        identifier:
          "AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationPreference: S.optional(S.String),
          CapacityReservationTarget: S.optional(__S(2890, __c90, 10)),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({ CoreCount: S.optional(S.Number), ThreadsPerCore: S.optional(S.Number) }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataCpuOptionsDetails" });
    case 13:
      return S.suspend(() => S.Struct({ CpuCredits: S.optional(S.String) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataCreditSpecificationDetails",
      });
    case 14:
      return S.Array(__S(2684, __c83, 28));
    case 15:
      return S.suspend(() =>
        S.Struct({ Count: S.optional(S.Number), Type: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails" });
    case 16:
      return S.Array(__S(2895, __c90, 15));
    case 17:
      return S.suspend(() => S.Struct({ Configured: S.optional(S.Boolean) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataHibernationOptionsDetails",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataIamInstanceProfileDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          BlockDurationMinutes: S.optional(S.Number),
          InstanceInterruptionBehavior: S.optional(S.String),
          MaxPrice: S.optional(S.String),
          SpotInstanceType: S.optional(S.String),
          ValidUntil: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          MarketType: S.optional(S.String),
          SpotOptions: S.optional(__S(2899, __c90, 19)),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Max: S.optional(S.Number), Min: S.optional(S.Number) }),
      ).annotate({
        identifier: "AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          AcceleratorCount: S.optional(__S(2901, __c90, 21)),
          AcceleratorManufacturers: S.optional(__S(1504, __c47, 0)),
          AcceleratorNames: S.optional(__S(1504, __c47, 0)),
          AcceleratorTotalMemoryMiB: S.optional(__S(2901, __c90, 21)),
          AcceleratorTypes: S.optional(__S(1504, __c47, 0)),
          BareMetal: S.optional(S.String),
          BaselineEbsBandwidthMbps: S.optional(__S(2901, __c90, 21)),
          BurstablePerformance: S.optional(S.String),
          CpuManufacturers: S.optional(__S(1504, __c47, 0)),
          ExcludedInstanceTypes: S.optional(__S(1504, __c47, 0)),
          InstanceGenerations: S.optional(__S(1504, __c47, 0)),
          LocalStorage: S.optional(S.String),
          LocalStorageTypes: S.optional(__S(1504, __c47, 0)),
          MemoryGiBPerVCpu: S.optional(__S(2901, __c90, 21)),
          MemoryMiB: S.optional(__S(2901, __c90, 21)),
          NetworkInterfaceCount: S.optional(__S(2901, __c90, 21)),
          OnDemandMaxPricePercentageOverLowestPrice: S.optional(S.Number),
          RequireHibernateSupport: S.optional(S.Boolean),
          SpotMaxPricePercentageOverLowestPrice: S.optional(S.Number),
          TotalLocalStorageGB: S.optional(__S(2901, __c90, 21)),
          VCpuCount: S.optional(__S(2901, __c90, 21)),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataInstanceRequirementsDetails" });
    case 23:
      return S.suspend(() => S.Struct({ LicenseConfigurationArn: S.optional(S.String) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataLicenseSetDetails",
      });
    case 24:
      return S.Array(__S(2903, __c90, 23));
    case 25:
      return S.suspend(() => S.Struct({ AutoRecovery: S.optional(S.String) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataMaintenanceOptionsDetails",
      });
    case 26:
      return S.suspend(() =>
        S.Struct({
          HttpEndpoint: S.optional(S.String),
          HttpProtocolIpv6: S.optional(S.String),
          HttpTokens: S.optional(S.String),
          HttpPutResponseHopLimit: S.optional(S.Number),
          InstanceMetadataTags: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataMetadataOptionsDetails" });
    case 27:
      return S.suspend(() => S.Struct({ Ipv4Prefix: S.optional(S.String) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails",
      });
    case 28:
      return S.Array(__S(2907, __c90, 27));
    case 29:
      return S.suspend(() => S.Struct({ Ipv6Address: S.optional(S.String) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails",
      });
    case 30:
      return S.Array(__S(2909, __c90, 29));
    case 31:
      return S.suspend(() => S.Struct({ Ipv6Prefix: S.optional(S.String) })).annotate({
        identifier: "AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2911, __c90, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({ Primary: S.optional(S.Boolean), PrivateIpAddress: S.optional(S.String) }),
      ).annotate({
        identifier: "AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails",
      });
    case 2:
      return S.Array(__S(2913, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociateCarrierIpAddress: S.optional(S.Boolean),
          AssociatePublicIpAddress: S.optional(S.Boolean),
          DeleteOnTermination: S.optional(S.Boolean),
          Description: S.optional(S.String),
          DeviceIndex: S.optional(S.Number),
          Groups: S.optional(__S(1504, __c47, 0)),
          InterfaceType: S.optional(S.String),
          Ipv4PrefixCount: S.optional(S.Number),
          Ipv4Prefixes: S.optional(__S(2908, __c90, 28)),
          Ipv6AddressCount: S.optional(S.Number),
          Ipv6Addresses: S.optional(__S(2910, __c90, 30)),
          Ipv6PrefixCount: S.optional(S.Number),
          Ipv6Prefixes: S.optional(__S(2912, __c91, 0)),
          NetworkCardIndex: S.optional(S.Number),
          NetworkInterfaceId: S.optional(S.String),
          PrivateIpAddress: S.optional(S.String),
          PrivateIpAddresses: S.optional(__S(2914, __c91, 2)),
          SecondaryPrivateIpAddressCount: S.optional(S.Number),
          SubnetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails" });
    case 4:
      return S.Array(__S(2915, __c91, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Affinity: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          GroupName: S.optional(S.String),
          HostId: S.optional(S.String),
          HostResourceGroupArn: S.optional(S.String),
          PartitionNumber: S.optional(S.Number),
          SpreadDomain: S.optional(S.String),
          Tenancy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataPlacementDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          EnableResourceNameDnsAAAARecord: S.optional(S.Boolean),
          EnableResourceNameDnsARecord: S.optional(S.Boolean),
          HostnameType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          BlockDeviceMappingSet: S.optional(__S(2889, __c90, 9)),
          CapacityReservationSpecification: S.optional(__S(2891, __c90, 11)),
          CpuOptions: S.optional(__S(2892, __c90, 12)),
          CreditSpecification: S.optional(__S(2893, __c90, 13)),
          DisableApiStop: S.optional(S.Boolean),
          DisableApiTermination: S.optional(S.Boolean),
          EbsOptimized: S.optional(S.Boolean),
          ElasticGpuSpecificationSet: S.optional(__S(2894, __c90, 14)),
          ElasticInferenceAcceleratorSet: S.optional(__S(2896, __c90, 16)),
          EnclaveOptions: S.optional(__S(2500, __c78, 4)),
          HibernationOptions: S.optional(__S(2897, __c90, 17)),
          IamInstanceProfile: S.optional(__S(2898, __c90, 18)),
          ImageId: S.optional(S.String),
          InstanceInitiatedShutdownBehavior: S.optional(S.String),
          InstanceMarketOptions: S.optional(__S(2900, __c90, 20)),
          InstanceRequirements: S.optional(__S(2902, __c90, 22)),
          InstanceType: S.optional(S.String),
          KernelId: S.optional(S.String),
          KeyName: S.optional(S.String),
          LicenseSet: S.optional(__S(2904, __c90, 24)),
          MaintenanceOptions: S.optional(__S(2905, __c90, 25)),
          MetadataOptions: S.optional(__S(2906, __c90, 26)),
          Monitoring: S.optional(__S(2500, __c78, 4)),
          NetworkInterfaceSet: S.optional(__S(2916, __c91, 4)),
          Placement: S.optional(__S(2917, __c91, 5)),
          PrivateDnsNameOptions: S.optional(__S(2918, __c91, 6)),
          RamDiskId: S.optional(S.String),
          SecurityGroupIdSet: S.optional(__S(1504, __c47, 0)),
          SecurityGroupSet: S.optional(__S(1504, __c47, 0)),
          UserData: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDataDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplateName: S.optional(S.String),
          Id: S.optional(S.String),
          LaunchTemplateData: S.optional(__S(2919, __c91, 7)),
          DefaultVersionNumber: S.optional(S.Number),
          LatestVersionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEc2LaunchTemplateDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ MinimumInstanceMetadataServiceVersion: S.optional(S.String) }),
      ).annotate({ identifier: "AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AcceleratorTypes: S.optional(__S(1504, __c47, 0)),
          AdditionalCodeRepositories: S.optional(__S(1504, __c47, 0)),
          DefaultCodeRepository: S.optional(S.String),
          DirectInternetAccess: S.optional(S.String),
          FailureReason: S.optional(S.String),
          InstanceMetadataServiceConfiguration: S.optional(__S(2921, __c91, 9)),
          InstanceType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          NetworkInterfaceId: S.optional(S.String),
          NotebookInstanceArn: S.optional(S.String),
          NotebookInstanceLifecycleConfigName: S.optional(S.String),
          NotebookInstanceName: S.optional(S.String),
          NotebookInstanceStatus: S.optional(S.String),
          PlatformIdentifier: S.optional(S.String),
          RoleArn: S.optional(S.String),
          RootAccess: S.optional(S.String),
          SecurityGroups: S.optional(__S(1504, __c47, 0)),
          SubnetId: S.optional(S.String),
          Url: S.optional(S.String),
          VolumeSizeInGB: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsSageMakerNotebookInstanceDetails" });
    case 11:
      return S.suspend(() => S.Struct({ ImmunityTime: S.optional(S.Number) })).annotate({
        identifier: "AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ ImmunityTimeProperty: S.optional(__S(2923, __c91, 11)) }),
      ).annotate({ identifier: "AwsWafv2WebAclCaptchaConfigDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({ InsertHeaders: S.optional(__S(2671, __c83, 15)) }),
      ).annotate({ identifier: "AwsWafv2CustomRequestHandlingDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({ CustomRequestHandling: S.optional(__S(2925, __c91, 13)) }),
      ).annotate({ identifier: "AwsWafv2ActionAllowDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          CustomResponseBodyKey: S.optional(S.String),
          ResponseCode: S.optional(S.Number),
          ResponseHeaders: S.optional(__S(2671, __c83, 15)),
        }),
      ).annotate({ identifier: "AwsWafv2CustomResponseDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({ CustomResponse: S.optional(__S(2927, __c91, 15)) }),
      ).annotate({ identifier: "AwsWafv2ActionBlockDetails" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Allow: S.optional(__S(2926, __c91, 14)),
          Block: S.optional(__S(2928, __c91, 16)),
        }),
      ).annotate({ identifier: "AwsWafv2WebAclActionDetails" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Allow: S.optional(__S(2926, __c91, 14)),
          Block: S.optional(__S(2928, __c91, 16)),
          Captcha: S.optional(__S(2926, __c91, 14)),
          Count: S.optional(__S(2926, __c91, 14)),
        }),
      ).annotate({ identifier: "AwsWafv2RulesActionDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          CloudWatchMetricsEnabled: S.optional(S.Boolean),
          MetricName: S.optional(S.String),
          SampledRequestsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsWafv2VisibilityConfigDetails" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(__S(2930, __c91, 18)),
          Name: S.optional(S.String),
          OverrideAction: S.optional(S.String),
          Priority: S.optional(S.Number),
          VisibilityConfig: S.optional(__S(2931, __c91, 19)),
        }),
      ).annotate({ identifier: "AwsWafv2RulesDetails" });
    case 21:
      return S.Array(__S(2932, __c91, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          ManagedbyFirewallManager: S.optional(S.Boolean),
          Id: S.optional(S.String),
          Capacity: S.optional(S.Number),
          CaptchaConfig: S.optional(__S(2924, __c91, 12)),
          DefaultAction: S.optional(__S(2929, __c91, 17)),
          Description: S.optional(S.String),
          Rules: S.optional(__S(2933, __c91, 21)),
          VisibilityConfig: S.optional(__S(2931, __c91, 19)),
        }),
      ).annotate({ identifier: "AwsWafv2WebAclDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Capacity: S.optional(S.Number),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Rules: S.optional(__S(2933, __c91, 21)),
          Scope: S.optional(S.String),
          VisibilityConfig: S.optional(__S(2931, __c91, 19)),
        }),
      ).annotate({ identifier: "AwsWafv2RuleGroupDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({ State: S.optional(S.String), StatusMessage: S.optional(S.String) }),
      ).annotate({ identifier: "AssociationStateDetails" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          AssociationState: S.optional(__S(2936, __c91, 24)),
          GatewayId: S.optional(S.String),
          Main: S.optional(S.Boolean),
          RouteTableAssociationId: S.optional(S.String),
          RouteTableId: S.optional(S.String),
          SubnetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociationSetDetails" });
    case 26:
      return S.Array(__S(2937, __c91, 25));
    case 27:
      return S.suspend(() => S.Struct({ GatewayId: S.optional(S.String) })).annotate({
        identifier: "PropagatingVgwSetDetails",
      });
    case 28:
      return S.Array(__S(2939, __c91, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          CarrierGatewayId: S.optional(S.String),
          CoreNetworkArn: S.optional(S.String),
          DestinationCidrBlock: S.optional(S.String),
          DestinationIpv6CidrBlock: S.optional(S.String),
          DestinationPrefixListId: S.optional(S.String),
          EgressOnlyInternetGatewayId: S.optional(S.String),
          GatewayId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceOwnerId: S.optional(S.String),
          LocalGatewayId: S.optional(S.String),
          NatGatewayId: S.optional(S.String),
          NetworkInterfaceId: S.optional(S.String),
          Origin: S.optional(S.String),
          State: S.optional(S.String),
          TransitGatewayId: S.optional(S.String),
          VpcPeeringConnectionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteSetDetails" });
    case 30:
      return S.Array(__S(2941, __c91, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          AssociationSet: S.optional(__S(2938, __c91, 26)),
          OwnerId: S.optional(S.String),
          PropagatingVgwSet: S.optional(__S(2940, __c91, 28)),
          RouteTableId: S.optional(S.String),
          RouteSet: S.optional(__S(2942, __c91, 30)),
          VpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2RouteTableDetails" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KmsKeyId: S.optional(S.String), UseAwsOwnedKey: S.optional(S.Boolean) }),
      ).annotate({ identifier: "AwsAmazonMqBrokerEncryptionOptionsDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Hosts: S.optional(__S(1504, __c47, 0)),
          RoleBase: S.optional(S.String),
          RoleName: S.optional(S.String),
          RoleSearchMatching: S.optional(S.String),
          RoleSearchSubtree: S.optional(S.Boolean),
          ServiceAccountUsername: S.optional(S.String),
          UserBase: S.optional(S.String),
          UserRoleName: S.optional(S.String),
          UserSearchMatching: S.optional(S.String),
          UserSearchSubtree: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsAmazonMqBrokerLdapServerMetadataDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Audit: S.optional(S.Boolean), General: S.optional(S.Boolean) }),
      ).annotate({ identifier: "AwsAmazonMqBrokerLogsPendingDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Audit: S.optional(S.Boolean),
          General: S.optional(S.Boolean),
          AuditLogGroup: S.optional(S.String),
          GeneralLogGroup: S.optional(S.String),
          Pending: S.optional(__S(2946, __c92, 2)),
        }),
      ).annotate({ identifier: "AwsAmazonMqBrokerLogsDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DayOfWeek: S.optional(S.String),
          TimeOfDay: S.optional(S.String),
          TimeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({ PendingChange: S.optional(S.String), Username: S.optional(S.String) }),
      ).annotate({ identifier: "AwsAmazonMqBrokerUsersDetails" });
    case 6:
      return S.Array(__S(2949, __c92, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          AuthenticationStrategy: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          BrokerArn: S.optional(S.String),
          BrokerName: S.optional(S.String),
          DeploymentMode: S.optional(S.String),
          EncryptionOptions: S.optional(__S(2944, __c92, 0)),
          EngineType: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
          BrokerId: S.optional(S.String),
          LdapServerMetadata: S.optional(__S(2945, __c92, 1)),
          Logs: S.optional(__S(2947, __c92, 3)),
          MaintenanceWindowStartTime: S.optional(__S(2948, __c92, 4)),
          PubliclyAccessible: S.optional(S.Boolean),
          SecurityGroups: S.optional(__S(1504, __c47, 0)),
          StorageType: S.optional(S.String),
          SubnetIds: S.optional(__S(1504, __c47, 0)),
          Users: S.optional(__S(2950, __c92, 6)),
        }),
      ).annotate({ identifier: "AwsAmazonMqBrokerDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AuthTtL: S.optional(S.Number),
          ClientId: S.optional(S.String),
          IatTtL: S.optional(S.Number),
          Issuer: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAppSyncGraphQlApiOpenIdConnectConfigDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          AuthorizerResultTtlInSeconds: S.optional(S.Number),
          AuthorizerUri: S.optional(S.String),
          IdentityValidationExpression: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AppIdClientRegex: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          DefaultAction: S.optional(S.String),
          UserPoolId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAppSyncGraphQlApiUserPoolConfigDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsRoleArn: S.optional(S.String),
          ExcludeVerboseContent: S.optional(S.Boolean),
          FieldLogLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAppSyncGraphQlApiLogConfigDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AuthenticationType: S.optional(S.String),
          LambdaAuthorizerConfig: S.optional(__S(2953, __c92, 9)),
          OpenIdConnectConfig: S.optional(__S(2952, __c92, 8)),
          UserPoolConfig: S.optional(__S(2954, __c92, 10)),
        }),
      ).annotate({ identifier: "AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails" });
    case 13:
      return S.Array(__S(2956, __c92, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.optional(S.String),
          Id: S.optional(S.String),
          OpenIdConnectConfig: S.optional(__S(2952, __c92, 8)),
          Name: S.optional(S.String),
          LambdaAuthorizerConfig: S.optional(__S(2953, __c92, 9)),
          XrayEnabled: S.optional(S.Boolean),
          Arn: S.optional(S.String),
          UserPoolConfig: S.optional(__S(2954, __c92, 10)),
          AuthenticationType: S.optional(S.String),
          LogConfig: S.optional(__S(2955, __c92, 11)),
          AdditionalAuthenticationProviders: S.optional(__S(2957, __c92, 13)),
          WafWebAclArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsAppSyncGraphQlApiDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          RegistryArn: S.optional(S.String),
          RegistryName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEventSchemasRegistryDetails" });
    case 16:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "AwsGuardDutyDetectorDataSourcesCloudTrailDetails",
      });
    case 17:
      return S.suspend(() => S.Struct({ AuditLogs: S.optional(__S(2960, __c92, 16)) })).annotate({
        identifier: "AwsGuardDutyDetectorDataSourcesKubernetesDetails",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({ Reason: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({
        identifier:
          "AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails",
      });
    case 19:
      return S.suspend(() => S.Struct({ EbsVolumes: S.optional(__S(2962, __c92, 18)) })).annotate({
        identifier:
          "AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          ScanEc2InstanceWithFindings: S.optional(__S(2963, __c92, 19)),
          ServiceRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          CloudTrail: S.optional(__S(2960, __c92, 16)),
          DnsLogs: S.optional(__S(2960, __c92, 16)),
          FlowLogs: S.optional(__S(2960, __c92, 16)),
          Kubernetes: S.optional(__S(2961, __c92, 17)),
          MalwareProtection: S.optional(__S(2964, __c92, 20)),
          S3Logs: S.optional(__S(2960, __c92, 16)),
        }),
      ).annotate({ identifier: "AwsGuardDutyDetectorDataSourcesDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "AwsGuardDutyDetectorFeaturesDetails" });
    case 23:
      return S.Array(__S(2966, __c92, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          DataSources: S.optional(__S(2965, __c92, 21)),
          Features: S.optional(__S(2967, __c92, 23)),
          FindingPublishingFrequency: S.optional(S.String),
          ServiceRole: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsGuardDutyDetectorDetails" });
    case 25:
      return S.suspend(() => S.Struct({ LogGroupArn: S.optional(S.String) })).annotate({
        identifier:
          "AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails",
      });
    case 26:
      return S.suspend(() =>
        S.Struct({ CloudWatchLogsLogGroup: S.optional(__S(2969, __c92, 25)) }),
      ).annotate({
        identifier: "AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails",
      });
    case 27:
      return S.Array(__S(2970, __c92, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__S(2971, __c92, 27)),
          IncludeExecutionData: S.optional(S.Boolean),
          Level: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsStepFunctionStateMachineLoggingConfigurationDetails" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Label: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(2972, __c92, 28)),
          Name: S.optional(S.String),
          RoleArn: S.optional(S.String),
          StateMachineArn: S.optional(S.String),
          Status: S.optional(S.String),
          TracingConfiguration: S.optional(__S(2500, __c78, 4)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsStepFunctionStateMachineDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({ EncryptionOption: S.optional(S.String), KmsKey: S.optional(S.String) }),
      ).annotate({
        identifier:
          "AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails",
      });
    case 31:
      return S.suspend(() =>
        S.Struct({ EncryptionConfiguration: S.optional(__S(2974, __c92, 30)) }),
      ).annotate({ identifier: "AwsAthenaWorkGroupConfigurationResultConfigurationDetails" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResultConfiguration: S.optional(__S(2975, __c92, 31)) }),
      ).annotate({ identifier: "AwsAthenaWorkGroupConfigurationDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          Configuration: S.optional(__S(2976, __c93, 0)),
        }),
      ).annotate({ identifier: "AwsAthenaWorkGroupDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEventsEventbusDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          EndpointArn: S.optional(S.String),
          EndpointIdentifier: S.optional(S.String),
          EndpointType: S.optional(S.String),
          EngineName: S.optional(S.String),
          ExternalId: S.optional(S.String),
          ExtraConnectionAttributes: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Port: S.optional(S.Number),
          ServerName: S.optional(S.String),
          SslMode: S.optional(S.String),
          Username: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsDmsEndpointDetails" });
    case 4:
      return S.suspend(() => S.Struct({ EventBusArn: S.optional(S.String) })).annotate({
        identifier: "AwsEventsEndpointEventBusesDetails",
      });
    case 5:
      return S.Array(__S(2980, __c93, 4));
    case 6:
      return S.suspend(() => S.Struct({ HealthCheck: S.optional(S.String) })).annotate({
        identifier: "AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails",
      });
    case 7:
      return S.suspend(() => S.Struct({ Route: S.optional(S.String) })).annotate({
        identifier: "AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Primary: S.optional(__S(2982, __c93, 6)),
          Secondary: S.optional(__S(2983, __c93, 7)),
        }),
      ).annotate({ identifier: "AwsEventsEndpointRoutingConfigFailoverConfigDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ FailoverConfig: S.optional(__S(2984, __c93, 8)) }),
      ).annotate({ identifier: "AwsEventsEndpointRoutingConfigDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
          EndpointId: S.optional(S.String),
          EndpointUrl: S.optional(S.String),
          EventBuses: S.optional(__S(2981, __c93, 5)),
          Name: S.optional(S.String),
          ReplicationConfig: S.optional(__S(2447, __c76, 15)),
          RoleArn: S.optional(S.String),
          RoutingConfig: S.optional(__S(2985, __c93, 9)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEventsEndpointDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CdcStartPosition: S.optional(S.String),
          CdcStartTime: S.optional(S.String),
          CdcStopPosition: S.optional(S.String),
          MigrationType: S.optional(S.String),
          Id: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          ReplicationInstanceArn: S.optional(S.String),
          ReplicationTaskIdentifier: S.optional(S.String),
          ReplicationTaskSettings: S.optional(S.String),
          SourceEndpointArn: S.optional(S.String),
          TableMappings: S.optional(S.String),
          TargetEndpointArn: S.optional(S.String),
          TaskData: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsDmsReplicationTaskDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({ ReplicationSubnetGroupIdentifier: S.optional(S.String) }),
      ).annotate({ identifier: "AwsDmsReplicationInstanceReplicationSubnetGroupDetails" });
    case 13:
      return S.suspend(() => S.Struct({ VpcSecurityGroupId: S.optional(S.String) })).annotate({
        identifier: "AwsDmsReplicationInstanceVpcSecurityGroupsDetails",
      });
    case 14:
      return S.Array(__S(2989, __c93, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          AllocatedStorage: S.optional(S.Number),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          AvailabilityZone: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          PreferredMaintenanceWindow: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          ReplicationInstanceClass: S.optional(S.String),
          ReplicationInstanceIdentifier: S.optional(S.String),
          ReplicationSubnetGroup: S.optional(__S(2988, __c93, 12)),
          VpcSecurityGroups: S.optional(__S(2990, __c93, 14)),
        }),
      ).annotate({ identifier: "AwsDmsReplicationInstanceDetails" });
    case 16:
      return S.suspend(() => S.Struct({ Comment: S.optional(S.String) })).annotate({
        identifier: "AwsRoute53HostedZoneConfigDetails",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Config: S.optional(__S(2992, __c93, 16)),
        }),
      ).annotate({ identifier: "AwsRoute53HostedZoneObjectDetails" });
    case 18:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Region: S.optional(S.String) }),
      ).annotate({ identifier: "AwsRoute53HostedZoneVpcDetails" });
    case 19:
      return S.Array(__S(2994, __c93, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          HostedZoneId: S.optional(S.String),
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchLogsLogGroupArnConfigDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({ CloudWatchLogsLogGroupArn: S.optional(__S(2996, __c93, 20)) }),
      ).annotate({ identifier: "AwsRoute53QueryLoggingConfigDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          HostedZone: S.optional(__S(2993, __c93, 17)),
          Vpcs: S.optional(__S(2995, __c93, 19)),
          NameServers: S.optional(__S(1504, __c47, 0)),
          QueryLoggingConfig: S.optional(__S(2997, __c93, 21)),
        }),
      ).annotate({ identifier: "AwsRoute53HostedZoneDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({ InCluster: S.optional(S.Boolean), ClientBroker: S.optional(S.String) }),
      ).annotate({
        identifier: "AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails",
      });
    case 24:
      return S.suspend(() => S.Struct({ DataVolumeKMSKeyId: S.optional(S.String) })).annotate({
        identifier: "AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({
          EncryptionInTransit: S.optional(__S(2999, __c93, 23)),
          EncryptionAtRest: S.optional(__S(3000, __c93, 24)),
        }),
      ).annotate({ identifier: "AwsMskClusterClusterInfoEncryptionInfoDetails" });
    case 26:
      return S.suspend(() =>
        S.Struct({ Iam: S.optional(__S(2500, __c78, 4)), Scram: S.optional(__S(2500, __c78, 4)) }),
      ).annotate({ identifier: "AwsMskClusterClusterInfoClientAuthenticationSaslDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityArnList: S.optional(__S(1504, __c47, 0)),
          Enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AwsMskClusterClusterInfoClientAuthenticationTlsDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Sasl: S.optional(__S(3002, __c93, 26)),
          Unauthenticated: S.optional(__S(2500, __c78, 4)),
          Tls: S.optional(__S(3003, __c93, 27)),
        }),
      ).annotate({ identifier: "AwsMskClusterClusterInfoClientAuthenticationDetails" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          EncryptionInfo: S.optional(__S(3001, __c93, 25)),
          CurrentVersion: S.optional(S.String),
          NumberOfBrokerNodes: S.optional(S.Number),
          ClusterName: S.optional(S.String),
          ClientAuthentication: S.optional(__S(3004, __c93, 28)),
          EnhancedMonitoring: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsMskClusterClusterInfoDetails" });
    case 30:
      return S.suspend(() => S.Struct({ ClusterInfo: S.optional(__S(3005, __c93, 29)) })).annotate({
        identifier: "AwsMskClusterDetails",
      });
    case 31:
      return S.suspend(() => S.Struct({ VpcId: S.optional(S.String) })).annotate({
        identifier: "AwsS3AccessPointVpcConfigurationDetails",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessPointArn: S.optional(S.String),
          Alias: S.optional(S.String),
          Bucket: S.optional(S.String),
          BucketAccountId: S.optional(S.String),
          Name: S.optional(S.String),
          NetworkOrigin: S.optional(S.String),
          PublicAccessBlockConfiguration: S.optional(__S(2520, __c78, 24)),
          VpcConfiguration: S.optional(__S(3007, __c93, 31)),
        }),
      ).annotate({ identifier: "AwsS3AccessPointDetails" });
    case 1:
      return S.suspend(() => S.Struct({ DirectoryId: S.optional(S.String) })).annotate({
        identifier: "AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ ClientRootCertificateChain: S.optional(S.String) }),
      ).annotate({
        identifier: "AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SamlProviderArn: S.optional(S.String),
          SelfServiceSamlProviderArn: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          ActiveDirectory: S.optional(__S(3009, __c94, 1)),
          MutualAuthentication: S.optional(__S(3010, __c94, 2)),
          FederatedAuthentication: S.optional(__S(3011, __c94, 3)),
        }),
      ).annotate({ identifier: "AwsEc2ClientVpnEndpointAuthenticationOptionsDetails" });
    case 5:
      return S.Array(__S(3012, __c94, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          CloudwatchLogGroup: S.optional(S.String),
          CloudwatchLogStream: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2ClientVpnEndpointConnectionLogOptionsDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          LambdaFunctionArn: S.optional(S.String),
          Status: S.optional(__S(3104, __c97, 0)),
        }),
      ).annotate({ identifier: "AwsEc2ClientVpnEndpointClientConnectOptionsDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), BannerText: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ClientVpnEndpointId: S.optional(S.String),
          Description: S.optional(S.String),
          ClientCidrBlock: S.optional(S.String),
          DnsServer: S.optional(__S(1504, __c47, 0)),
          SplitTunnel: S.optional(S.Boolean),
          TransportProtocol: S.optional(S.String),
          VpnPort: S.optional(S.Number),
          ServerCertificateArn: S.optional(S.String),
          AuthenticationOptions: S.optional(__S(3013, __c94, 5)),
          ConnectionLogOptions: S.optional(__S(3014, __c94, 6)),
          SecurityGroupIdSet: S.optional(__S(1504, __c47, 0)),
          VpcId: S.optional(S.String),
          SelfServicePortalUrl: S.optional(S.String),
          ClientConnectOptions: S.optional(__S(3015, __c94, 7)),
          SessionTimeoutHours: S.optional(S.Number),
          ClientLoginBannerOptions: S.optional(__S(3016, __c94, 8)),
        }),
      ).annotate({ identifier: "AwsEc2ClientVpnEndpointDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ProviderType: S.optional(S.String),
          ProjectName: S.optional(S.String),
          CodeSecurityIntegrationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeRepositoryDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AwsAutoScalingAutoScalingGroup: S.optional(__S(2414, __c75, 14)),
          AwsCodeBuildProject: S.optional(__S(2426, __c75, 26)),
          AwsCloudFrontDistribution: S.optional(__S(2443, __c76, 11)),
          AwsEc2Instance: S.optional(__S(2448, __c76, 16)),
          AwsEc2NetworkInterface: S.optional(__S(2456, __c76, 24)),
          AwsEc2SecurityGroup: S.optional(__S(2467, __c77, 3)),
          AwsEc2Volume: S.optional(__S(2470, __c77, 6)),
          AwsEc2Vpc: S.optional(__S(2475, __c77, 11)),
          AwsEc2Eip: S.optional(__S(2476, __c77, 12)),
          AwsEc2Subnet: S.optional(__S(2477, __c77, 13)),
          AwsEc2NetworkAcl: S.optional(__S(2484, __c77, 20)),
          AwsElbv2LoadBalancer: S.optional(__S(2487, __c77, 23)),
          AwsElasticBeanstalkEnvironment: S.optional(__S(2493, __c77, 29)),
          AwsElasticsearchDomain: S.optional(__S(2503, __c78, 7)),
          AwsS3Bucket: S.optional(__S(2539, __c79, 11)),
          AwsS3AccountPublicAccessBlock: S.optional(__S(2520, __c78, 24)),
          AwsS3Object: S.optional(__S(2540, __c79, 12)),
          AwsSecretsManagerSecret: S.optional(__S(2542, __c79, 14)),
          AwsIamAccessKey: S.optional(__S(2546, __c79, 18)),
          AwsIamUser: S.optional(__S(2552, __c79, 24)),
          AwsIamPolicy: S.optional(__S(2555, __c79, 27)),
          AwsApiGatewayV2Stage: S.optional(__S(2558, __c79, 30)),
          AwsApiGatewayV2Api: S.optional(__S(2560, __c80, 0)),
          AwsDynamoDbTable: S.optional(__S(2580, __c80, 20)),
          AwsApiGatewayStage: S.optional(__S(2584, __c80, 24)),
          AwsApiGatewayRestApi: S.optional(__S(2586, __c80, 26)),
          AwsCloudTrailTrail: S.optional(__S(2587, __c80, 27)),
          AwsSsmPatchCompliance: S.optional(__S(2590, __c80, 30)),
          AwsCertificateManagerCertificate: S.optional(__S(2599, __c81, 7)),
          AwsRedshiftCluster: S.optional(__S(2622, __c81, 30)),
          AwsElbLoadBalancer: S.optional(__S(2641, __c82, 17)),
          AwsIamGroup: S.optional(__S(2642, __c82, 18)),
          AwsIamRole: S.optional(__S(2647, __c82, 23)),
          AwsKmsKey: S.optional(__S(2648, __c82, 24)),
          AwsLambdaFunction: S.optional(__S(2657, __c83, 1)),
          AwsLambdaLayerVersion: S.optional(__S(2658, __c83, 2)),
          AwsRdsDbInstance: S.optional(__S(2679, __c83, 23)),
          AwsSnsTopic: S.optional(__S(2682, __c83, 26)),
          AwsSqsQueue: S.optional(__S(2683, __c83, 27)),
          AwsWafWebAcl: S.optional(__S(2689, __c84, 1)),
          AwsRdsDbSnapshot: S.optional(__S(2690, __c84, 2)),
          AwsRdsDbClusterSnapshot: S.optional(__S(2693, __c84, 5)),
          AwsRdsDbCluster: S.optional(__S(2700, __c84, 12)),
          AwsEcsCluster: S.optional(__S(2706, __c84, 18)),
          AwsEcsContainer: S.optional(__S(2709, __c84, 21)),
          AwsEcsTaskDefinition: S.optional(__S(2751, __c85, 31)),
          Container: S.optional(__S(2754, __c86, 2)),
          Other: S.optional(__S(1664, __c52, 0)),
          AwsRdsEventSubscription: S.optional(__S(2755, __c86, 3)),
          AwsEcsService: S.optional(__S(2766, __c86, 14)),
          AwsAutoScalingLaunchConfiguration: S.optional(__S(2771, __c86, 19)),
          AwsEc2VpnConnection: S.optional(__S(2779, __c86, 27)),
          AwsEcrContainerImage: S.optional(__S(2780, __c86, 28)),
          AwsOpenSearchServiceDomain: S.optional(__S(2787, __c87, 3)),
          AwsEc2VpcEndpointService: S.optional(__S(2790, __c87, 6)),
          AwsXrayEncryptionConfig: S.optional(__S(2791, __c87, 7)),
          AwsWafRateBasedRule: S.optional(__S(2794, __c87, 10)),
          AwsWafRegionalRateBasedRule: S.optional(__S(2794, __c87, 10)),
          AwsEcrRepository: S.optional(__S(2797, __c87, 13)),
          AwsEksCluster: S.optional(__S(2802, __c87, 18)),
          AwsNetworkFirewallFirewallPolicy: S.optional(__S(2812, __c87, 28)),
          AwsNetworkFirewallFirewall: S.optional(__S(2815, __c87, 31)),
          AwsNetworkFirewallRuleGroup: S.optional(__S(2837, __c88, 21)),
          AwsRdsDbSecurityGroup: S.optional(__S(2842, __c88, 26)),
          AwsKinesisStream: S.optional(__S(2844, __c88, 28)),
          AwsEc2TransitGateway: S.optional(__S(2845, __c88, 29)),
          AwsEfsAccessPoint: S.optional(__S(2849, __c89, 1)),
          AwsCloudFormationStack: S.optional(__S(2853, __c89, 5)),
          AwsCloudWatchAlarm: S.optional(__S(2854, __c89, 6)),
          AwsEc2VpcPeeringConnection: S.optional(__S(2861, __c89, 13)),
          AwsWafRegionalRuleGroup: S.optional(__S(2864, __c89, 16)),
          AwsWafRegionalRule: S.optional(__S(2865, __c89, 17)),
          AwsWafRegionalWebAcl: S.optional(__S(2868, __c89, 20)),
          AwsWafRule: S.optional(__S(2865, __c89, 17)),
          AwsWafRuleGroup: S.optional(__S(2864, __c89, 16)),
          AwsEcsTask: S.optional(__S(2872, __c89, 24)),
          AwsBackupBackupVault: S.optional(__S(2874, __c89, 26)),
          AwsBackupBackupPlan: S.optional(__S(2883, __c90, 3)),
          AwsBackupRecoveryPoint: S.optional(__S(2886, __c90, 6)),
          AwsEc2LaunchTemplate: S.optional(__S(2920, __c91, 8)),
          AwsSageMakerNotebookInstance: S.optional(__S(2922, __c91, 10)),
          AwsWafv2WebAcl: S.optional(__S(2934, __c91, 22)),
          AwsWafv2RuleGroup: S.optional(__S(2935, __c91, 23)),
          AwsEc2RouteTable: S.optional(__S(2943, __c91, 31)),
          AwsAmazonMqBroker: S.optional(__S(2951, __c92, 7)),
          AwsAppSyncGraphQlApi: S.optional(__S(2958, __c92, 14)),
          AwsEventSchemasRegistry: S.optional(__S(2959, __c92, 15)),
          AwsGuardDutyDetector: S.optional(__S(2968, __c92, 24)),
          AwsStepFunctionStateMachine: S.optional(__S(2973, __c92, 29)),
          AwsAthenaWorkGroup: S.optional(__S(2977, __c93, 1)),
          AwsEventsEventbus: S.optional(__S(2978, __c93, 2)),
          AwsDmsEndpoint: S.optional(__S(2979, __c93, 3)),
          AwsEventsEndpoint: S.optional(__S(2986, __c93, 10)),
          AwsDmsReplicationTask: S.optional(__S(2987, __c93, 11)),
          AwsDmsReplicationInstance: S.optional(__S(2991, __c93, 15)),
          AwsRoute53HostedZone: S.optional(__S(2998, __c93, 22)),
          AwsMskCluster: S.optional(__S(3006, __c93, 30)),
          AwsS3AccessPoint: S.optional(__S(3008, __c94, 0)),
          AwsEc2ClientVpnEndpoint: S.optional(__S(3017, __c94, 9)),
          CodeRepository: S.optional(__S(3018, __c94, 10)),
          AzureResource: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ResourceDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Id: S.optional(S.String),
          Partition: S.optional(S.String),
          Region: S.optional(S.String),
          Provider: S.optional(S.String),
          Owner: S.optional(__S(2388, __c74, 20)),
          ResourceRole: S.optional(S.String),
          Tags: S.optional(__S(1664, __c52, 0)),
          DataClassification: S.optional(__S(2407, __c75, 7)),
          Details: S.optional(__S(3019, __c94, 11)),
          ApplicationName: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Resource" });
    case 13:
      return S.Array(__S(3020, __c94, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ ReasonCode: S.optional(S.String), Description: S.optional(S.String) }),
      ).annotate({ identifier: "StatusReason" });
    case 15:
      return S.Array(__S(3022, __c94, 14));
    case 16:
      return S.suspend(() => S.Struct({ StandardsId: S.optional(S.String) })).annotate({
        identifier: "AssociatedStandard",
      });
    case 17:
      return S.Array(__S(3024, __c94, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(__S(1504, __c47, 0)) }),
      ).annotate({ identifier: "SecurityControlParameter" });
    case 19:
      return S.Array(__S(3026, __c94, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          RelatedRequirements: S.optional(__S(1504, __c47, 0)),
          StatusReasons: S.optional(__S(3023, __c94, 15)),
          SecurityControlId: S.optional(S.String),
          AssociatedStandards: S.optional(__S(3025, __c94, 17)),
          SecurityControlParameters: S.optional(__S(3027, __c94, 19)),
        }),
      ).annotate({ identifier: "Compliance" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Text: S.optional(S.String),
          UpdatedBy: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "Note" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          Epoch: S.optional(S.String),
          Release: S.optional(S.String),
          Architecture: S.optional(S.String),
          PackageManager: S.optional(S.String),
          FilePath: S.optional(S.String),
          FixedInVersion: S.optional(S.String),
          Remediation: S.optional(S.String),
          SourceLayerHash: S.optional(S.String),
          SourceLayerArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SoftwarePackage" });
    case 23:
      return S.Array(__S(3030, __c94, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({ Metric: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "Adjustment" });
    case 25:
      return S.Array(__S(3032, __c94, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          Version: S.optional(S.String),
          BaseScore: S.optional(S.Number),
          BaseVector: S.optional(S.String),
          Source: S.optional(S.String),
          Adjustments: S.optional(__S(3033, __c94, 25)),
        }),
      ).annotate({ identifier: "Cvss" });
    case 27:
      return S.Array(__S(3034, __c94, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Url: S.optional(S.String),
          VendorSeverity: S.optional(S.String),
          VendorCreatedAt: S.optional(S.String),
          VendorUpdatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "VulnerabilityVendor" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          EndLine: S.optional(S.Number),
          FileName: S.optional(S.String),
          FilePath: S.optional(S.String),
          StartLine: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CodeVulnerabilitiesFilePath" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Cwes: S.optional(__S(1504, __c47, 0)),
          FilePath: S.optional(__S(3037, __c94, 29)),
          SourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "VulnerabilityCodeVulnerabilities" });
    case 31:
      return S.Array(__S(3038, __c94, 30));
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          VulnerablePackages: S.optional(__S(3031, __c94, 23)),
          Cvss: S.optional(__S(3035, __c94, 27)),
          RelatedVulnerabilities: S.optional(__S(1504, __c47, 0)),
          Vendor: S.optional(__S(3036, __c94, 28)),
          ReferenceUrls: S.optional(__S(1504, __c47, 0)),
          FixAvailable: S.optional(S.String),
          EpssScore: S.optional(S.Number),
          ExploitAvailable: S.optional(S.String),
          LastKnownExploitAt: S.optional(S.String),
          CodeVulnerabilities: S.optional(__S(3039, __c94, 31)),
        }),
      ).annotate({ identifier: "Vulnerability" });
    case 1:
      return S.Array(__S(3040, __c95, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          InstalledCount: S.optional(S.Number),
          MissingCount: S.optional(S.Number),
          FailedCount: S.optional(S.Number),
          InstalledOtherCount: S.optional(S.Number),
          InstalledRejectedCount: S.optional(S.Number),
          InstalledPendingReboot: S.optional(S.Number),
          OperationStartTime: S.optional(S.String),
          OperationEndTime: S.optional(S.String),
          RebootOption: S.optional(S.String),
          Operation: S.optional(S.String),
        }),
      ).annotate({ identifier: "PatchSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Asn: S.optional(S.Number),
          AsnOrg: S.optional(S.String),
          Isp: S.optional(S.String),
          Org: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpOrganizationDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ CountryCode: S.optional(S.String), CountryName: S.optional(S.String) }),
      ).annotate({ identifier: "Country" });
    case 5:
      return S.suspend(() => S.Struct({ CityName: S.optional(S.String) })).annotate({
        identifier: "City",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ Lon: S.optional(S.Number), Lat: S.optional(S.Number) }),
      ).annotate({ identifier: "GeoLocation" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          IpAddressV4: S.optional(S.String),
          Organization: S.optional(__S(3043, __c95, 3)),
          Country: S.optional(__S(3044, __c95, 4)),
          City: S.optional(__S(3045, __c95, 5)),
          GeoLocation: S.optional(__S(3046, __c95, 6)),
        }),
      ).annotate({ identifier: "ActionRemoteIpDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Port: S.optional(S.Number), PortName: S.optional(S.String) }),
      ).annotate({ identifier: "ActionRemotePortDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ConnectionDirection: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(3047, __c95, 7)),
          RemotePortDetails: S.optional(__S(3048, __c95, 8)),
          LocalPortDetails: S.optional(__S(3048, __c95, 8)),
          Protocol: S.optional(S.String),
          Blocked: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NetworkConnectionAction" });
    case 10:
      return S.suspend(() => S.Struct({ Domain: S.optional(S.String) })).annotate({
        identifier: "AwsApiCallActionDomainDetails",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Api: S.optional(S.String),
          ServiceName: S.optional(S.String),
          CallerType: S.optional(S.String),
          RemoteIpDetails: S.optional(__S(3047, __c95, 7)),
          DomainDetails: S.optional(__S(3050, __c95, 10)),
          AffectedResources: S.optional(__S(1664, __c52, 0)),
          FirstSeen: S.optional(S.String),
          LastSeen: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsApiCallAction" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          Protocol: S.optional(S.String),
          Blocked: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DnsRequestAction" });
    case 13:
      return S.suspend(() => S.Struct({ IpAddressV4: S.optional(S.String) })).annotate({
        identifier: "ActionLocalIpDetails",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          LocalPortDetails: S.optional(__S(3048, __c95, 8)),
          LocalIpDetails: S.optional(__S(3053, __c95, 13)),
          RemoteIpDetails: S.optional(__S(3047, __c95, 7)),
        }),
      ).annotate({ identifier: "PortProbeDetail" });
    case 15:
      return S.Array(__S(3054, __c95, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          PortProbeDetails: S.optional(__S(3055, __c95, 15)),
          Blocked: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PortProbeAction" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ActionType: S.optional(S.String),
          NetworkConnectionAction: S.optional(__S(3049, __c95, 9)),
          AwsApiCallAction: S.optional(__S(3051, __c95, 11)),
          DnsRequestAction: S.optional(__S(3052, __c95, 12)),
          PortProbeAction: S.optional(__S(3056, __c95, 16)),
        }),
      ).annotate({ identifier: "Action" });
    case 18:
      return S.suspend(() =>
        S.Struct({ Label: S.optional(S.String), Original: S.optional(S.String) }),
      ).annotate({ identifier: "FindingProviderSeverity" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Confidence: S.optional(S.Number),
          Criticality: S.optional(S.Number),
          RelatedFindings: S.optional(__S(1794, __c56, 2)),
          Severity: S.optional(__S(3058, __c95, 18)),
          Types: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "FindingProviderFields" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Labels: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "GeneratorDetails" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Uid: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "UserAccount" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Uid: S.optional(S.String),
          Type: S.optional(S.String),
          CredentialUid: S.optional(S.String),
          Account: S.optional(__S(3061, __c95, 21)),
        }),
      ).annotate({ identifier: "ActorUser" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          MfaStatus: S.optional(S.String),
          CreatedTime: S.optional(S.Number),
          Issuer: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActorSession" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          User: S.optional(__S(3062, __c95, 22)),
          Session: S.optional(__S(3063, __c95, 23)),
        }),
      ).annotate({ identifier: "Actor" });
    case 25:
      return S.Array(__S(3064, __c95, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(S.String),
          Country: S.optional(S.String),
          Lat: S.optional(S.Number),
          Lon: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NetworkGeoLocation" });
    case 27:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Number: S.optional(S.Number) }),
      ).annotate({ identifier: "NetworkAutonomousSystem" });
    case 28:
      return S.suspend(() => S.Struct({ Direction: S.optional(S.String) })).annotate({
        identifier: "NetworkConnection",
      });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Ip: S.optional(S.String),
          Domain: S.optional(S.String),
          Port: S.optional(S.Number),
          Location: S.optional(__S(3066, __c95, 26)),
          AutonomousSystem: S.optional(__S(3067, __c95, 27)),
          Connection: S.optional(__S(3068, __c95, 28)),
        }),
      ).annotate({ identifier: "NetworkEndpoint" });
    case 30:
      return S.Array(__S(3069, __c95, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(1504, __c47, 0)),
          Title: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Indicator" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(3071, __c95, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Id: S.optional(S.String),
          Title: S.optional(S.String),
          ProductArn: S.optional(S.String),
          ResourceIds: S.optional(__S(1504, __c47, 0)),
          SignalIndicators: S.optional(__S(3072, __c96, 0)),
          Name: S.optional(S.String),
          CreatedAt: S.optional(S.Number),
          UpdatedAt: S.optional(S.Number),
          FirstSeenAt: S.optional(S.Number),
          LastSeenAt: S.optional(S.Number),
          Severity: S.optional(S.Number),
          Count: S.optional(S.Number),
          ActorIds: S.optional(__S(1504, __c47, 0)),
          EndpointIds: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "Signal" });
    case 2:
      return S.Array(__S(3073, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.String),
          Actors: S.optional(__S(3065, __c95, 25)),
          Endpoints: S.optional(__S(3070, __c95, 30)),
          Signals: S.optional(__S(3074, __c96, 2)),
          SequenceIndicators: S.optional(__S(3072, __c96, 0)),
        }),
      ).annotate({ identifier: "Sequence" });
    case 4:
      return S.suspend(() => S.Struct({ Sequence: S.optional(__S(3075, __c96, 3)) })).annotate({
        identifier: "Detection",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SchemaVersion: S.optional(S.String),
          Id: S.optional(S.String),
          ProductArn: S.optional(S.String),
          ProductName: S.optional(S.String),
          CompanyName: S.optional(S.String),
          Region: S.optional(S.String),
          GeneratorId: S.optional(S.String),
          AwsAccountId: S.optional(S.String),
          Types: S.optional(__S(1504, __c47, 0)),
          FirstObservedAt: S.optional(S.String),
          LastObservedAt: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
          Severity: S.optional(__S(2368, __c74, 0)),
          Confidence: S.optional(S.Number),
          Criticality: S.optional(S.Number),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          Remediation: S.optional(__S(2370, __c74, 2)),
          SourceUrl: S.optional(S.String),
          ProductFields: S.optional(__S(1664, __c52, 0)),
          UserDefinedFields: S.optional(__S(1664, __c52, 0)),
          Malware: S.optional(__S(2372, __c74, 4)),
          Network: S.optional(__S(2374, __c74, 6)),
          NetworkPath: S.optional(__S(2379, __c74, 11)),
          Process: S.optional(__S(2380, __c74, 12)),
          Threats: S.optional(__S(2384, __c74, 16)),
          ThreatIntelIndicators: S.optional(__S(2386, __c74, 18)),
          Resources: S.optional(__S(3021, __c94, 13)),
          Compliance: S.optional(__S(3028, __c94, 20)),
          VerificationState: S.optional(S.String),
          WorkflowState: S.optional(S.String),
          Workflow: S.optional(__S(1792, __c56, 0)),
          RecordState: S.optional(S.String),
          RelatedFindings: S.optional(__S(1794, __c56, 2)),
          Note: S.optional(__S(3029, __c94, 21)),
          Vulnerabilities: S.optional(__S(3041, __c95, 1)),
          PatchSummary: S.optional(__S(3042, __c95, 2)),
          Action: S.optional(__S(3057, __c95, 17)),
          FindingProviderFields: S.optional(__S(3059, __c95, 19)),
          Sample: S.optional(S.Boolean),
          GeneratorDetails: S.optional(__S(3060, __c95, 20)),
          ProcessedAt: S.optional(S.String),
          AwsAccountName: S.optional(S.String),
          Detection: S.optional(__S(3076, __c96, 4)),
        }),
      ).annotate({ identifier: "AwsSecurityFinding" });
    case 6:
      return S.Array(__S(3077, __c96, 5));
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "AwsEc2VpcPeeringConnectionStatusDetails" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AwsElbv2LoadBalancerAttribute" });
    case 1:
      return S.Array(__S(3136, __c98, 0));
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleArn: S.optional(S.String),
          RuleStatus: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          Description: S.optional(S.String),
          RuleName: S.optional(S.String),
          IsTerminal: S.optional(S.Boolean),
          Criteria: S.optional(__S(1888, __c59, 0)),
          Actions: S.optional(__S(1891, __c59, 3)),
        }),
      ).annotate({ identifier: "UpdateAutomationRulesRequestItem" });
    case 1:
      return S.Array(__S(3168, __c99, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ UpdateAutomationRulesRequestItems: S.optional(__S(3169, __c99, 1)) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/automationrules/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateAutomationRulesRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(3232, __c101, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          FindingIdentifiers: S.optional(__S(3200, __c100, 0)),
          Note: S.optional(__S(1856, __c58, 0)),
          Severity: S.optional(__S(1824, __c57, 0)),
          VerificationState: S.optional(S.String),
          Confidence: S.optional(S.Number),
          Criticality: S.optional(S.Number),
          Types: S.optional(__S(1504, __c47, 0)),
          UserDefinedFields: S.optional(__S(1664, __c52, 0)),
          Workflow: S.optional(__S(1792, __c56, 0)),
          RelatedFindings: S.optional(__S(1794, __c56, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/findings/batchupdate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateFindingsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FindingIdentifier: S.optional(__S(3232, __c101, 0)),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchUpdateFindingsUnprocessedFinding" });
    case 3:
      return S.Array(__S(3202, __c100, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProcessedFindings: S.optional(__S(3200, __c100, 0)),
          UnprocessedFindings: S.optional(__S(3203, __c100, 3)),
        }),
      ).annotate({ identifier: "BatchUpdateFindingsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), ProductArn: S.optional(S.String) }),
      ).annotate({ identifier: "AwsSecurityFindingIdentifier" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudAccountUid: S.optional(S.String),
          FindingInfoUid: S.optional(S.String),
          MetadataProductUid: S.optional(S.String),
        }),
      ).annotate({ identifier: "OcsfFindingIdentifier" });
    case 1:
      return S.Array(__S(3264, __c102, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MetadataUids: S.optional(__S(1504, __c47, 0)),
          FindingIdentifiers: S.optional(__S(3265, __c102, 1)),
          Comment: S.optional(S.String),
          SeverityId: S.optional(S.Number),
          StatusId: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/findingsv2/batchupdatev2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateFindingsV2Request" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FindingIdentifier: S.optional(__S(3264, __c102, 0)),
          MetadataUid: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchUpdateFindingsV2ProcessedFinding" });
    case 4:
      return S.Array(__S(3267, __c102, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          FindingIdentifier: S.optional(__S(3264, __c102, 0)),
          MetadataUid: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchUpdateFindingsV2UnprocessedFinding" });
    case 6:
      return S.Array(__S(3269, __c102, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ProcessedFindings: S.optional(__S(3268, __c102, 4)),
          UnprocessedFindings: S.optional(__S(3270, __c102, 6)),
        }),
      ).annotate({ identifier: "BatchUpdateFindingsV2Response" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardsArn: S.optional(S.String),
          SecurityControlId: S.optional(S.String),
          AssociationStatus: S.optional(S.String),
          UpdatedReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "StandardsControlAssociationUpdate" });
    case 1:
      return S.Array(__S(3296, __c103, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ StandardsControlAssociationUpdates: S.optional(__S(3297, __c103, 1)) }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/associations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchUpdateStandardsControlAssociationsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StandardsControlAssociationUpdate: S.optional(__S(3296, __c103, 0)),
          ErrorCode: S.optional(S.String),
          ErrorReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedStandardsControlAssociationUpdate" });
    case 4:
      return S.Array(__S(3299, __c103, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ UnprocessedAssociationUpdates: S.optional(__S(3300, __c103, 4)) }),
      ).annotate({ identifier: "BatchUpdateStandardsControlAssociationsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportJobId: S.String.pipe(T.HttpLabel("ExportJobId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/exportjobsv2/{ExportJobId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelExportJobV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExportJobId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "CancelExportJobV2Response" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Id: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/actionTargets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateActionTargetRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ActionTargetArn: S.optional(S.String) })).annotate({
        identifier: "CreateActionTargetResponse",
      });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegionLinkingMode: S.optional(S.String),
          LinkedRegions: S.optional(__S(1504, __c47, 0)),
          Tags: S.optional(__S(1664, __c52, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/aggregatorv2/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAggregatorV2Request" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AggregatorV2Arn: S.optional(S.String),
          AggregationRegion: S.optional(S.String),
          RegionLinkingMode: S.optional(S.String),
          LinkedRegions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "CreateAggregatorV2Response" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tags: S.optional(__S(1664, __c52, 0)),
          RuleStatus: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          RuleName: S.optional(S.String),
          Description: S.optional(S.String),
          IsTerminal: S.optional(S.Boolean),
          Criteria: S.optional(__S(1888, __c59, 0)),
          Actions: S.optional(__S(1891, __c59, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automationrules/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAutomationRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RuleArn: S.optional(S.String) })).annotate({
        identifier: "CreateAutomationRuleResponse",
      });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleStatus: S.optional(S.String),
          Description: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          Criteria: S.optional(__S(3584, __c112, 0)),
          Actions: S.optional(__S(3589, __c112, 5)),
          Tags: S.optional(__S(1664, __c52, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automationrulesv2/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAutomationRuleV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleArn: S.optional(S.String), RuleId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateAutomationRuleV2Response" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.optional(S.Boolean) })).annotate({
        identifier: "BooleanFilter",
      });
    case 1:
      return S.suspend(() => S.Struct({ Cidr: S.optional(S.String) })).annotate({
        identifier: "IpFilter",
      });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ OcsfFindingCriteria: __S(3654, __c114, 6) }),
        /*@__PURE__*/ S.Struct({ ResourceCriteria: __S(3714, __c116, 2) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          SeverityId: S.optional(S.Number),
          Comment: S.optional(S.String),
          StatusId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutomationRulesFindingFieldsUpdateV2" });
    case 2:
      return S.suspend(() => S.Struct({ ConnectorArn: S.optional(S.String) })).annotate({
        identifier: "ExternalIntegrationConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ Criticality: S.optional(S.String) })).annotate({
        identifier: "AutomationRulesResourceFieldsUpdateV2",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          FindingFieldsUpdate: S.optional(__S(3585, __c112, 1)),
          ExternalIntegrationConfiguration: S.optional(__S(3586, __c112, 2)),
          ResourceFieldsUpdate: S.optional(__S(3587, __c112, 3)),
        }),
      ).annotate({ identifier: "AutomationRulesActionV2" });
    case 5:
      return S.Array(__S(3588, __c112, 4));
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(1920, __c60, 0)) }),
      ).annotate({ identifier: "OcsfStringFilter" });
    case 1:
      return S.Array(__S(3616, __c113, 0));
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(3552, __c111, 0)) }),
      ).annotate({ identifier: "OcsfBooleanFilter" });
    case 1:
      return S.Array(__S(3648, __c114, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(3553, __c111, 1)) }),
      ).annotate({ identifier: "OcsfIpFilter" });
    case 3:
      return S.Array(__S(3650, __c114, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StringFilters: S.optional(__S(3617, __c113, 1)),
          DateFilters: S.optional(__S(3681, __c115, 1)),
          BooleanFilters: S.optional(__S(3649, __c114, 1)),
          NumberFilters: S.optional(__S(3683, __c115, 3)),
          MapFilters: S.optional(__S(3685, __c115, 5)),
          IpFilters: S.optional(__S(3651, __c114, 3)),
          NestedCompositeFilters: S.optional(
            S.suspend(() => __S(3653, __c114, 5)).annotate({ identifier: "CompositeFilterList" }),
          ),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "CompositeFilter" });
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<CompositeFilter> => __S(3652, __c114, 4)).annotate({
          identifier: "CompositeFilter",
        }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          CompositeFilters: S.optional(__S(3653, __c114, 5)),
          CompositeOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "OcsfFindingFilters" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(1953, __c61, 1)) }),
      ).annotate({ identifier: "OcsfDateFilter" });
    case 1:
      return S.Array(__S(3680, __c115, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(1954, __c61, 2)) }),
      ).annotate({ identifier: "OcsfNumberFilter" });
    case 3:
      return S.Array(__S(3682, __c115, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(1955, __c61, 3)) }),
      ).annotate({ identifier: "OcsfMapFilter" });
    case 5:
      return S.Array(__S(3684, __c115, 4));
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StringFilters: S.optional(__S(3617, __c113, 1)),
          DateFilters: S.optional(__S(3681, __c115, 1)),
          NumberFilters: S.optional(__S(3683, __c115, 3)),
          MapFilters: S.optional(__S(3685, __c115, 5)),
          NestedCompositeFilters: S.optional(
            S.suspend(() => __S(3713, __c116, 1)).annotate({
              identifier: "ResourcesCompositeFilterList",
            }),
          ),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcesCompositeFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<ResourcesCompositeFilter> =>
          __S(3712, __c116, 0),
        ).annotate({ identifier: "ResourcesCompositeFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          CompositeFilters: S.optional(__S(3713, __c116, 1)),
          CompositeOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcesFilters" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ConfigurationPolicy: S.optional(__S(3780, __c118, 4)),
          Tags: S.optional(__S(1664, __c52, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationPolicy/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationPolicyRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String),
          Parameters: S.optional(__S(2210, __c69, 2)),
        }),
      ).annotate({ identifier: "SecurityControlCustomParameter" });
    case 1:
      return S.Array(__S(3776, __c118, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EnabledSecurityControlIdentifiers: S.optional(__S(1504, __c47, 0)),
          DisabledSecurityControlIdentifiers: S.optional(__S(1504, __c47, 0)),
          SecurityControlCustomParameters: S.optional(__S(3777, __c118, 1)),
        }),
      ).annotate({ identifier: "SecurityControlsConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ServiceEnabled: S.optional(S.Boolean),
          EnabledStandardIdentifiers: S.optional(__S(1504, __c47, 0)),
          SecurityControlsConfiguration: S.optional(__S(3778, __c118, 2)),
        }),
      ).annotate({ identifier: "SecurityHubPolicy" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ SecurityHub: __S(3779, __c118, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ConfigurationPolicy: S.optional(__S(3780, __c118, 4)),
        }),
      ).annotate({ identifier: "CreateConfigurationPolicyResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Provider: S.optional(__S(3904, __c122, 0)),
          Tags: S.optional(__S(1664, __c52, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          ConnectorStatus: S.optional(S.String),
          EnablementStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectorResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AWSConfigConnectorArn: S.optional(S.String),
          ScopeConfiguration: S.optional(__S(3872, __c121, 0)),
          AzureRegions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "AzureProviderConfiguration" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScopeType: S.optional(S.String), ScopeValues: S.optional(__S(1504, __c47, 0)) }),
      ).annotate({ identifier: "AzureScopeConfiguration" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(3840, __c120, 0) })]);
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceName: S.optional(S.String), SecretArn: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceNowProviderConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ JiraCloud: __S(3968, __c124, 0) }),
        /*@__PURE__*/ S.Struct({ ServiceNow: __S(3936, __c123, 0) }),
        /*@__PURE__*/ S.Struct({ Azure: __S(3840, __c120, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Provider: S.optional(__S(3937, __c123, 1)),
          KmsKeyArn: S.optional(S.String),
          Tags: S.optional(__S(1664, __c52, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connectorsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorV2Request" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          AuthUrl: S.optional(S.String),
          ConnectorStatus: S.optional(S.String),
          EnablementStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectorV2Response" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProjectKey: S.optional(S.String) })).annotate({
        identifier: "JiraCloudProviderConfiguration",
      });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegionLinkingMode: S.optional(S.String),
          Regions: S.optional(__S(1504, __c47, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/findingAggregator/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFindingAggregatorRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FindingAggregatorArn: S.optional(S.String),
          FindingAggregationRegion: S.optional(S.String),
          RegionLinkingMode: S.optional(S.String),
          Regions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "CreateFindingAggregatorResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Filters: S.optional(__S(4130, __c129, 2)),
          GroupByAttribute: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/insights" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInsightRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InsightArn: S.optional(S.String) })).annotate({
        identifier: "CreateInsightResponse",
      });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(3553, __c111, 1));
    case 1:
      return S.Array(__S(3552, __c111, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProductArn: S.optional(__S(1984, __c62, 0)),
          AwsAccountId: S.optional(__S(1984, __c62, 0)),
          Id: S.optional(__S(1984, __c62, 0)),
          GeneratorId: S.optional(__S(1984, __c62, 0)),
          Region: S.optional(__S(1984, __c62, 0)),
          Type: S.optional(__S(1984, __c62, 0)),
          FirstObservedAt: S.optional(__S(1985, __c62, 1)),
          LastObservedAt: S.optional(__S(1985, __c62, 1)),
          CreatedAt: S.optional(__S(1985, __c62, 1)),
          UpdatedAt: S.optional(__S(1985, __c62, 1)),
          SeverityProduct: S.optional(__S(1986, __c62, 2)),
          SeverityNormalized: S.optional(__S(1986, __c62, 2)),
          SeverityLabel: S.optional(__S(1984, __c62, 0)),
          Confidence: S.optional(__S(1986, __c62, 2)),
          Criticality: S.optional(__S(1986, __c62, 2)),
          Title: S.optional(__S(1984, __c62, 0)),
          Description: S.optional(__S(1984, __c62, 0)),
          RecommendationText: S.optional(__S(1984, __c62, 0)),
          SourceUrl: S.optional(__S(1984, __c62, 0)),
          ProductFields: S.optional(__S(1987, __c62, 3)),
          ProductName: S.optional(__S(1984, __c62, 0)),
          CompanyName: S.optional(__S(1984, __c62, 0)),
          UserDefinedFields: S.optional(__S(1987, __c62, 3)),
          MalwareName: S.optional(__S(1984, __c62, 0)),
          MalwareType: S.optional(__S(1984, __c62, 0)),
          MalwarePath: S.optional(__S(1984, __c62, 0)),
          MalwareState: S.optional(__S(1984, __c62, 0)),
          NetworkDirection: S.optional(__S(1984, __c62, 0)),
          NetworkProtocol: S.optional(__S(1984, __c62, 0)),
          NetworkSourceIpV4: S.optional(__S(4128, __c129, 0)),
          NetworkSourceIpV6: S.optional(__S(4128, __c129, 0)),
          NetworkSourcePort: S.optional(__S(1986, __c62, 2)),
          NetworkSourceDomain: S.optional(__S(1984, __c62, 0)),
          NetworkSourceMac: S.optional(__S(1984, __c62, 0)),
          NetworkDestinationIpV4: S.optional(__S(4128, __c129, 0)),
          NetworkDestinationIpV6: S.optional(__S(4128, __c129, 0)),
          NetworkDestinationPort: S.optional(__S(1986, __c62, 2)),
          NetworkDestinationDomain: S.optional(__S(1984, __c62, 0)),
          ProcessName: S.optional(__S(1984, __c62, 0)),
          ProcessPath: S.optional(__S(1984, __c62, 0)),
          ProcessPid: S.optional(__S(1986, __c62, 2)),
          ProcessParentPid: S.optional(__S(1986, __c62, 2)),
          ProcessLaunchedAt: S.optional(__S(1985, __c62, 1)),
          ProcessTerminatedAt: S.optional(__S(1985, __c62, 1)),
          ThreatIntelIndicatorType: S.optional(__S(1984, __c62, 0)),
          ThreatIntelIndicatorValue: S.optional(__S(1984, __c62, 0)),
          ThreatIntelIndicatorCategory: S.optional(__S(1984, __c62, 0)),
          ThreatIntelIndicatorLastObservedAt: S.optional(__S(1985, __c62, 1)),
          ThreatIntelIndicatorSource: S.optional(__S(1984, __c62, 0)),
          ThreatIntelIndicatorSourceUrl: S.optional(__S(1984, __c62, 0)),
          ResourceType: S.optional(__S(1984, __c62, 0)),
          ResourceId: S.optional(__S(1984, __c62, 0)),
          ResourcePartition: S.optional(__S(1984, __c62, 0)),
          ResourceRegion: S.optional(__S(1984, __c62, 0)),
          ResourceTags: S.optional(__S(1987, __c62, 3)),
          ResourceAwsEc2InstanceType: S.optional(__S(1984, __c62, 0)),
          ResourceAwsEc2InstanceImageId: S.optional(__S(1984, __c62, 0)),
          ResourceAwsEc2InstanceIpV4Addresses: S.optional(__S(4128, __c129, 0)),
          ResourceAwsEc2InstanceIpV6Addresses: S.optional(__S(4128, __c129, 0)),
          ResourceAwsEc2InstanceKeyName: S.optional(__S(1984, __c62, 0)),
          ResourceAwsEc2InstanceIamInstanceProfileArn: S.optional(__S(1984, __c62, 0)),
          ResourceAwsEc2InstanceVpcId: S.optional(__S(1984, __c62, 0)),
          ResourceAwsEc2InstanceSubnetId: S.optional(__S(1984, __c62, 0)),
          ResourceAwsEc2InstanceLaunchedAt: S.optional(__S(1985, __c62, 1)),
          ResourceAwsS3BucketOwnerId: S.optional(__S(1984, __c62, 0)),
          ResourceAwsS3BucketOwnerName: S.optional(__S(1984, __c62, 0)),
          ResourceAwsIamAccessKeyUserName: S.optional(__S(1984, __c62, 0)),
          ResourceAwsIamAccessKeyPrincipalName: S.optional(__S(1984, __c62, 0)),
          ResourceAwsIamAccessKeyStatus: S.optional(__S(1984, __c62, 0)),
          ResourceAwsIamAccessKeyCreatedAt: S.optional(__S(1985, __c62, 1)),
          ResourceAwsIamUserUserName: S.optional(__S(1984, __c62, 0)),
          ResourceContainerName: S.optional(__S(1984, __c62, 0)),
          ResourceContainerImageId: S.optional(__S(1984, __c62, 0)),
          ResourceContainerImageName: S.optional(__S(1984, __c62, 0)),
          ResourceContainerLaunchedAt: S.optional(__S(1985, __c62, 1)),
          ResourceDetailsOther: S.optional(__S(1987, __c62, 3)),
          ComplianceStatus: S.optional(__S(1984, __c62, 0)),
          VerificationState: S.optional(__S(1984, __c62, 0)),
          WorkflowState: S.optional(__S(1984, __c62, 0)),
          WorkflowStatus: S.optional(__S(1984, __c62, 0)),
          RecordState: S.optional(__S(1984, __c62, 0)),
          RelatedFindingsProductArn: S.optional(__S(1984, __c62, 0)),
          RelatedFindingsId: S.optional(__S(1984, __c62, 0)),
          NoteText: S.optional(__S(1984, __c62, 0)),
          NoteUpdatedAt: S.optional(__S(1985, __c62, 1)),
          NoteUpdatedBy: S.optional(__S(1984, __c62, 0)),
          Keyword: S.optional(__S(2304, __c72, 0)),
          FindingProviderFieldsConfidence: S.optional(__S(1986, __c62, 2)),
          FindingProviderFieldsCriticality: S.optional(__S(1986, __c62, 2)),
          FindingProviderFieldsRelatedFindingsId: S.optional(__S(1984, __c62, 0)),
          FindingProviderFieldsRelatedFindingsProductArn: S.optional(__S(1984, __c62, 0)),
          FindingProviderFieldsSeverityLabel: S.optional(__S(1984, __c62, 0)),
          FindingProviderFieldsSeverityOriginal: S.optional(__S(1984, __c62, 0)),
          FindingProviderFieldsTypes: S.optional(__S(1984, __c62, 0)),
          Sample: S.optional(__S(4129, __c129, 1)),
          ComplianceSecurityControlId: S.optional(__S(1984, __c62, 0)),
          ComplianceAssociatedStandardsId: S.optional(__S(1984, __c62, 0)),
          VulnerabilitiesExploitAvailable: S.optional(__S(1984, __c62, 0)),
          VulnerabilitiesFixAvailable: S.optional(__S(1984, __c62, 0)),
          ComplianceSecurityControlParametersName: S.optional(__S(1984, __c62, 0)),
          ComplianceSecurityControlParametersValue: S.optional(__S(1984, __c62, 0)),
          AwsAccountName: S.optional(__S(1984, __c62, 0)),
          ResourceApplicationName: S.optional(__S(1984, __c62, 0)),
          ResourceApplicationArn: S.optional(__S(1984, __c62, 0)),
          ResourceOwnerAccountId: S.optional(__S(1984, __c62, 0)),
          ResourceOwnerOrgId: S.optional(__S(1984, __c62, 0)),
          ResourceProvider: S.optional(__S(1984, __c62, 0)),
        }),
      ).annotate({ identifier: "AwsSecurityFindingFilters" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Email: S.optional(S.String) }),
      ).annotate({ identifier: "AccountDetails" });
    case 1:
      return S.Array(__S(4160, __c130, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AccountDetails: S.optional(__S(4161, __c130, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/members" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMembersRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UnprocessedAccounts: S.optional(__S(4225, __c132, 1)) }),
      ).annotate({ identifier: "CreateMembersResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), ProcessingResult: S.optional(S.String) }),
      ).annotate({ identifier: "Result" });
    case 1:
      return S.Array(__S(4224, __c132, 0));
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorId: S.optional(S.String),
          FindingMetadataUid: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Mode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/ticketsv2" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTicketV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TicketId: S.optional(S.String), TicketSrcUrl: S.optional(S.String) }),
      ).annotate({ identifier: "CreateTicketV2Response" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/invitations/decline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeclineInvitationsRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActionTargetArn: S.String.pipe(T.HttpLabel("ActionTargetArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/actionTargets/{ActionTargetArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteActionTargetRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AggregatorV2Arn: S.String.pipe(T.HttpLabel("AggregatorV2Arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/aggregatorv2/delete/{AggregatorV2Arn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAggregatorV2Request" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/automationrulesv2/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAutomationRuleV2Request" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/configurationPolicy/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationPolicyRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connectors/{ConnectorId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EnablementStatus: S.optional(S.String) })).annotate({
        identifier: "DeleteConnectorResponse",
      });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connectorsv2/{ConnectorId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorV2Request" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FindingAggregatorArn: S.String.pipe(T.HttpLabel("FindingAggregatorArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/findingAggregator/delete/{FindingAggregatorArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFindingAggregatorRequest" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InsightArn: S.String.pipe(T.HttpLabel("InsightArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/insights/{InsightArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInsightRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/invitations/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInvitationsRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/members/delete" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMembersRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActionTargetArns: S.optional(__S(1504, __c47, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/actionTargets/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeActionTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActionTargetArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionTarget" });
    case 2:
      return S.Array(__S(4673, __c146, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ActionTargets: S.optional(__S(4674, __c146, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeActionTargetsResponse" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HubArn: S.optional(S.String).pipe(T.HttpQuery("HubArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/accounts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHubRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HubArn: S.optional(S.String),
          SubscribedAt: S.optional(S.String),
          AutoEnableControls: S.optional(S.Boolean),
          ControlFindingGenerator: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeHubResponse" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/organization/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOrganizationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoEnable: S.optional(S.Boolean),
          MemberAccountLimitReached: S.optional(S.Boolean),
          AutoEnableStandards: S.optional(S.String),
          OrganizationConfiguration: S.optional(__S(4768, __c149, 0)),
        }),
      ).annotate({ identifier: "DescribeOrganizationConfigurationResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrganizationConfiguration" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          ProductArn: S.optional(S.String).pipe(T.HttpQuery("ProductArn")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/products" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProductsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductArn: S.optional(S.String),
          ProductName: S.optional(S.String),
          CompanyName: S.optional(S.String),
          Description: S.optional(S.String),
          Categories: S.optional(__S(1504, __c47, 0)),
          IntegrationTypes: S.optional(__S(4832, __c151, 0)),
          MarketplaceUrl: S.optional(S.String),
          ActivationUrl: S.optional(S.String),
          ProductSubscriptionResourcePolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Product" });
    case 2:
      return S.Array(__S(4801, __c150, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Products: S.optional(__S(4802, __c150, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeProductsResponse" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/productsV2" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProductsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductV2Name: S.optional(S.String),
          CompanyName: S.optional(S.String),
          Description: S.optional(S.String),
          Categories: S.optional(__S(1504, __c47, 0)),
          IntegrationV2Types: S.optional(__S(4832, __c151, 0)),
          MarketplaceUrl: S.optional(S.String),
          ActivationUrl: S.optional(S.String),
          MarketplaceProductId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProductV2" });
    case 2:
      return S.Array(__S(4865, __c152, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ProductsV2: S.optional(__S(4866, __c152, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeProductsV2Response" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/hubv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSecurityHubV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FeatureStatus: S.optional(S.String),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "FeatureDetail" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(4897, __c153, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          HubV2Arn: S.optional(S.String),
          SubscribedAt: S.optional(S.String),
          Features: S.optional(__S(4898, __c153, 2)),
        }),
      ).annotate({ identifier: "DescribeSecurityHubV2Response" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          Providers: S.optional(__S(4832, __c151, 0)).pipe(T.HttpQuery("Providers")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/standards" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeStandardsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Company: S.optional(S.String), Product: S.optional(S.String) }),
      ).annotate({ identifier: "StandardsManagedBy" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StandardsArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EnabledByDefault: S.optional(S.Boolean),
          Provider: S.optional(S.String),
          StandardsManagedBy: S.optional(__S(4929, __c154, 1)),
        }),
      ).annotate({ identifier: "Standard" });
    case 3:
      return S.Array(__S(4930, __c154, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Standards: S.optional(__S(4931, __c154, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeStandardsResponse" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardsSubscriptionArn: S.String.pipe(T.HttpLabel("StandardsSubscriptionArn")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/standards/controls/{StandardsSubscriptionArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeStandardsControlsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StandardsControlArn: S.optional(S.String),
          ControlStatus: S.optional(S.String),
          DisabledReason: S.optional(S.String),
          ControlStatusUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ControlId: S.optional(S.String),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          RemediationUrl: S.optional(S.String),
          SeverityRating: S.optional(S.String),
          RelatedRequirements: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "StandardsControl" });
    case 2:
      return S.Array(__S(4961, __c155, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Controls: S.optional(__S(4962, __c155, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeStandardsControlsResponse" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductSubscriptionArn: S.String.pipe(T.HttpLabel("ProductSubscriptionArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/productSubscriptions/{ProductSubscriptionArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableImportFindingsForProductRequest" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdminAccountId: S.optional(S.String), Feature: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organization/admin/disable" }),
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
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/accounts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableSecurityHubRequest" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FeatureName: S.String.pipe(T.HttpLabel("FeatureName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/hubv2/feature/{FeatureName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableSecurityHubFeatureV2Request" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/hubv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableSecurityHubV2Request" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DisassociateFromAdministratorAccountRequest" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DisassociateFromMasterAccountRequest" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/members/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMembersRequest" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProductArn: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/productSubscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableImportFindingsForProductRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ProductSubscriptionArn: S.optional(S.String) })).annotate({
        identifier: "EnableImportFindingsForProductResponse",
      });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdminAccountId: S.optional(S.String), Feature: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organization/admin/enable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableOrganizationAdminAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AdminAccountId: S.optional(S.String), Feature: S.optional(S.String) }),
      ).annotate({ identifier: "EnableOrganizationAdminAccountResponse" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tags: S.optional(__S(1664, __c52, 0)),
          EnableDefaultStandards: S.optional(S.Boolean),
          ControlFindingGenerator: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/accounts" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableSecurityHubRequest" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FeatureName: S.String.pipe(T.HttpLabel("FeatureName")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/hubv2/feature/{FeatureName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableSecurityHubFeatureV2Request" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(1664, __c52, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/hubv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableSecurityHubV2Request" });
    case 1:
      return S.suspend(() => S.Struct({ HubV2Arn: S.optional(S.String) })).annotate({
        identifier: "EnableSecurityHubV2Response",
      });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MetadataUid: S.String.pipe(T.HttpLabel("MetadataUid")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/recommendedPolicyV2/{MetadataUid}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateRecommendedPolicyV2Request" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/administrator" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAdministratorAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Administrator: S.optional(__S(5472, __c171, 0)) }),
      ).annotate({ identifier: "GetAdministratorAccountResponse" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          InvitationId: S.optional(S.String),
          InvitedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MemberStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Invitation" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AggregatorV2Arn: S.String.pipe(T.HttpLabel("AggregatorV2Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/aggregatorv2/get/{AggregatorV2Arn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAggregatorV2Request" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automationrulesv2/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomationRuleV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleArn: S.optional(S.String),
          RuleId: S.optional(S.String),
          RuleOrder: S.optional(S.Number),
          RuleName: S.optional(S.String),
          RuleStatus: S.optional(S.String),
          Description: S.optional(S.String),
          Criteria: S.optional(__S(3584, __c112, 0)),
          Actions: S.optional(__S(3589, __c112, 5)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetAutomationRuleV2Response" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/configurationPolicy/get/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationPolicyRequest" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Target: S.optional(__S(2112, __c66, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationPolicyAssociation/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationPolicyAssociationRequest" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connectors/{ConnectorId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Health: S.optional(__S(5666, __c177, 2)),
          ProviderDetail: S.optional(__S(3904, __c122, 0)),
          CreatedBy: S.optional(S.String),
          EnablementStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectorResponse" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "HealthIssue" });
    case 1:
      return S.Array(__S(5664, __c177, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectorStatus: S.optional(S.String),
          Message: S.optional(S.String),
          LastCheckedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Issues: S.optional(__S(5665, __c177, 1)),
        }),
      ).annotate({ identifier: "CspmHealthCheck" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connectorsv2/{ConnectorId+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          ConnectorId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Health: S.optional(__S(5666, __c177, 2)),
          ProviderDetail: S.optional(__S(5730, __c179, 2)),
          EnablementStatus: S.optional(S.String),
          EnablementStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectorV2Response" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudId: S.optional(S.String),
          ProjectKey: S.optional(S.String),
          Domain: S.optional(S.String),
          AuthUrl: S.optional(S.String),
          AuthStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "JiraCloudDetail" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceName: S.optional(S.String),
          SecretArn: S.optional(S.String),
          AuthStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceNowDetail" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ JiraCloud: __S(5728, __c179, 0) }),
        /*@__PURE__*/ S.Struct({ ServiceNow: __S(5729, __c179, 1) }),
        /*@__PURE__*/ S.Struct({ Azure: __S(3840, __c120, 0) }),
      ]);
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardsSubscriptionArns: S.optional(__S(1504, __c47, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Providers: S.optional(__S(4832, __c151, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/standards/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnabledStandardsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StandardsSubscriptions: S.optional(__S(1698, __c53, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetEnabledStandardsResponse" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportJobId: S.String.pipe(T.HttpLabel("ExportJobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/exportjobsv2/{ExportJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExportJobV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExportJobId: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          DataType: S.optional(S.String),
          OutputConfiguration: S.optional(__S(5857, __c183, 1)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          Destination: S.optional(__S(5825, __c182, 1)),
          FailureCode: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetExportJobV2Response" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          ObjectPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ExportDestination" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ S3: __S(5824, __c182, 0) })]);
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Format: S.optional(S.String),
          Filters: S.optional(__S(3654, __c114, 6)),
          SelectedFields: S.optional(__S(4832, __c151, 0)),
        }),
      ).annotate({ identifier: "FindingsOutput" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Findings: __S(5856, __c183, 0) })]);
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.optional(S.String),
          OrganizationalUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsOrganizationScope" });
    case 1:
      return S.Array(__S(5888, __c184, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AwsOrganizations: S.optional(__S(5889, __c184, 1)) }),
      ).annotate({ identifier: "ExportScopes" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FindingAggregatorArn: S.String.pipe(T.HttpLabel("FindingAggregatorArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/findingAggregator/get/{FindingAggregatorArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingAggregatorRequest" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FindingIdentifier: S.optional(__S(3232, __c101, 0)),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/findingHistory/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Identity: S.optional(S.String) }),
      ).annotate({ identifier: "FindingHistoryUpdateSource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          UpdatedField: S.optional(S.String),
          OldValue: S.optional(S.String),
          NewValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingHistoryUpdate" });
    case 3:
      return S.Array(__S(5954, __c186, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          FindingIdentifier: S.optional(__S(3232, __c101, 0)),
          UpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FindingCreated: S.optional(S.Boolean),
          UpdateSource: S.optional(__S(5953, __c186, 1)),
          Updates: S.optional(__S(5955, __c186, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingHistoryRecord" });
    case 5:
      return S.Array(__S(5956, __c186, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Records: S.optional(__S(5957, __c186, 5)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetFindingHistoryResponse" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(4130, __c129, 2)),
          SortCriteria: S.optional(__S(6017, __c188, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/findings" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Findings: S.optional(__S(3078, __c96, 6)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetFindingsResponse" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Field: S.optional(S.String), SortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "SortCriterion" });
    case 1:
      return S.Array(__S(6016, __c188, 0));
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Filters: S.optional(__S(3654, __c114, 6)), GroupByField: S.optional(S.String) }),
      ).annotate({ identifier: "GroupByRule" });
    case 1:
      return S.Array(__S(6048, __c189, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GroupByRules: S.optional(__S(6049, __c189, 1)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortOrder: S.optional(S.String),
          MaxStatisticResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/findingsv2/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingStatisticsV2Request" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldValue: S.optional(S.String), Count: S.optional(S.Number) }),
      ).annotate({ identifier: "GroupByValue" });
    case 1:
      return S.Array(__S(6080, __c190, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GroupByField: S.optional(S.String),
          GroupByValues: S.optional(__S(6081, __c190, 1)),
        }),
      ).annotate({ identifier: "GroupByResult" });
    case 3:
      return S.Array(__S(6082, __c190, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ GroupByResults: S.optional(__S(6083, __c190, 3)) }),
      ).annotate({ identifier: "GetFindingStatisticsV2Response" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StringFilters: S.optional(__S(3617, __c113, 1)),
          NestedCompositeFilters: S.optional(
            S.suspend(() => __S(6113, __c191, 1)).annotate({
              identifier: "FindingsTrendsCompositeFilterList",
            }),
          ),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingsTrendsCompositeFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<FindingsTrendsCompositeFilter> =>
          __S(6112, __c191, 0),
        ).annotate({ identifier: "FindingsTrendsCompositeFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          CompositeFilters: S.optional(__S(6113, __c191, 1)),
          CompositeOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingsTrendsFilters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(6114, __c191, 2)),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/findingsTrendsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFindingsTrendsV2Request" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Unknown: S.optional(S.Number),
          Informational: S.optional(S.Number),
          Low: S.optional(S.Number),
          Medium: S.optional(S.Number),
          High: S.optional(S.Number),
          Critical: S.optional(S.Number),
          Fatal: S.optional(S.Number),
          Other: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SeverityTrendsCount" });
    case 5:
      return S.suspend(() =>
        S.Struct({ SeverityTrends: S.optional(__S(6116, __c191, 4)) }),
      ).annotate({ identifier: "TrendsValues" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TrendsValues: S.optional(__S(6117, __c191, 5)),
        }),
      ).annotate({ identifier: "TrendsMetricsResult" });
    case 7:
      return S.Array(__S(6118, __c191, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Granularity: S.optional(S.String),
          TrendsMetrics: S.optional(__S(6119, __c191, 7)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetFindingsTrendsV2Response" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(3654, __c114, 6)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortCriteria: S.optional(__S(6017, __c188, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/findingsv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFindingsV2Request" });
    case 1:
      return S.Array(S.Any);
    case 2:
      return S.suspend(() =>
        S.Struct({ Findings: S.optional(__S(6145, __c192, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetFindingsV2Response" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InsightArn: S.String.pipe(T.HttpLabel("InsightArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/insights/results/{InsightArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInsightResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GroupByAttributeValue: S.optional(S.String), Count: S.optional(S.Number) }),
      ).annotate({ identifier: "InsightResultValue" });
    case 2:
      return S.Array(__S(6177, __c193, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InsightArn: S.optional(S.String),
          GroupByAttribute: S.optional(S.String),
          ResultValues: S.optional(__S(6178, __c193, 2)),
        }),
      ).annotate({ identifier: "InsightResults" });
    case 4:
      return S.suspend(() =>
        S.Struct({ InsightResults: S.optional(__S(6179, __c193, 3)) }),
      ).annotate({ identifier: "GetInsightResultsResponse" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InsightArns: S.optional(__S(1504, __c47, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/insights/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInsightsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InsightArn: S.optional(S.String),
          Name: S.optional(S.String),
          Filters: S.optional(__S(4130, __c129, 2)),
          GroupByAttribute: S.optional(S.String),
        }),
      ).annotate({ identifier: "Insight" });
    case 2:
      return S.Array(__S(6209, __c194, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Insights: S.optional(__S(6210, __c194, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetInsightsResponse" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/invitations/count" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInvitationsCountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ InvitationsCount: S.optional(S.Number) })).annotate({
        identifier: "GetInvitationsCountResponse",
      });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/master" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMasterAccountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Master: S.optional(__S(5472, __c171, 0)) })).annotate({
        identifier: "GetMasterAccountResponse",
      });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(1504, __c47, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/members/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Members: S.optional(__S(6337, __c198, 1)),
          UnprocessedAccounts: S.optional(__S(4225, __c132, 1)),
        }),
      ).annotate({ identifier: "GetMembersResponse" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Email: S.optional(S.String),
          MasterId: S.optional(S.String),
          AdministratorId: S.optional(S.String),
          MemberStatus: S.optional(S.String),
          InvitedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Member" });
    case 1:
      return S.Array(__S(6336, __c198, 0));
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetadataUid: S.String.pipe(T.HttpLabel("MetadataUid")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/recommendedPolicyV2/{MetadataUid}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendedPolicyV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommendedAction: S.optional(S.String),
          ExistingPolicy: S.optional(S.String),
          ExistingPolicyId: S.optional(S.String),
          PolicyUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          RecommendedPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnusedPermissionsRecommendationStep" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ UnusedPermissions: __S(6369, __c199, 1) })]);
    case 3:
      return S.Array(__S(6370, __c199, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecommendationType: S.optional(S.String),
          RecommendationSteps: S.optional(__S(6371, __c199, 3)),
          Error: S.optional(__S(3104, __c97, 0)),
          Status: S.optional(S.String),
          ResourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRecommendedPolicyV2Response" });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Filter: S.optional(__S(2336, __c73, 0)) }),
      ).annotate({ identifier: "RemediationStringFilter" });
    case 1:
      return S.Array(__S(6400, __c200, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ StringFilters: S.optional(__S(6401, __c200, 1)) }),
      ).annotate({ identifier: "RemediationCompositeFilter" });
    case 3:
      return S.Array(__S(6402, __c200, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ CompositeFilters: S.optional(__S(6403, __c200, 3)) }),
      ).annotate({ identifier: "RemediationFilters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          TargetUid: S.optional(S.String),
          MetadataUid: S.optional(S.String),
          Filters: S.optional(__S(6404, __c200, 4)),
          ShowGuidance: S.optional(S.Boolean),
          GuidanceFormat: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetRemediationsV2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRemediationsV2Request" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ResolvedFindingsCount: S.optional(S.Number),
          SeverityReductionFindingsCount: S.optional(S.Number),
          SeverityUnchangedCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RemediationOutcome" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Title: S.optional(S.String), Url: S.optional(S.String) }),
      ).annotate({ identifier: "KbArticle" });
    case 8:
      return S.Array(__S(6407, __c200, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          Description: S.optional(S.String),
          IsImmediate: S.optional(S.Boolean),
          PostRemediationSteps: S.optional(__S(1504, __c47, 0)),
          KbArticles: S.optional(__S(6408, __c200, 8)),
        }),
      ).annotate({ identifier: "RemediationSummaryDetail" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ProblemStatement: S.optional(S.String),
          RiskAssessment: S.optional(S.String),
          AffectedScope: S.optional(S.String),
          Prerequisites: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "RemediationGuidanceContext" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RemediationParameter" });
    case 12:
      return S.Array(__S(6411, __c200, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          Phase: S.optional(S.String),
          Description: S.optional(S.String),
          Service: S.optional(S.String),
          Action: S.optional(S.String),
          Logic: S.optional(S.String),
          Inverse: S.optional(S.String),
          VerifyAfter: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationStep" });
    case 14:
      return S.Array(__S(6413, __c200, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(6412, __c200, 12)),
          Steps: S.optional(__S(6414, __c200, 14)),
          ExpectedEndState: S.optional(S.String),
          RequiredPermissions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "RemediationGuidanceSpecification" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          AwsCli: S.optional(S.String),
          Cli: S.optional(S.String),
          Python: S.optional(S.String),
          Terraform: S.optional(S.String),
          Cdk: S.optional(S.String),
          CloudFormation: S.optional(S.String),
          IaC: S.optional(S.String),
          Template: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationGuidanceExamples" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ExposureType: S.optional(S.String),
          TraitTitles: S.optional(__S(1504, __c47, 0)),
          Reversibility: S.optional(S.String),
          FixEffect: S.optional(S.String),
          RiskLevel: S.optional(S.String),
          AutomationLevel: S.optional(S.String),
          HumanReviewRequired: S.optional(S.Boolean),
          GeneratedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          VerificationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationGuidanceMetadata" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          TargetTypeName: S.optional(S.String),
          Pattern: S.optional(S.String),
          Version: S.optional(S.String),
          Context: S.optional(__S(6410, __c200, 10)),
          Specification: S.optional(__S(6415, __c200, 15)),
          Examples: S.optional(__S(6416, __c200, 16)),
          Metadata: S.optional(__S(6417, __c200, 17)),
        }),
      ).annotate({ identifier: "RemediationGuidance" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          TargetUid: S.optional(S.String),
          Outcome: S.optional(__S(6406, __c200, 6)),
          Priority: S.optional(S.String),
          RemediationSummary: S.optional(__S(6409, __c200, 9)),
          Resource: S.optional(__S(6432, __c201, 0)),
          Status: S.optional(S.String),
          Trait: S.optional(__S(6433, __c201, 1)),
          Guidance: S.optional(__S(6418, __c200, 18)),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RemediationV2Item" });
    case 20:
      return S.Array(__S(6419, __c200, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(6420, __c200, 20)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetRemediationsV2Response" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Region: S.optional(S.String),
          ResourceOwnerAccountId: S.optional(S.String),
          ResourceOwnerOrgId: S.optional(S.String),
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          ResourceGuid: S.optional(S.String),
          ResourceRegion: S.optional(S.String),
          CloudProvider: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationResource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Title: S.optional(S.String) }),
      ).annotate({ identifier: "RemediationTrait" });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupByField: S.optional(S.String), Filters: S.optional(__S(3714, __c116, 2)) }),
      ).annotate({ identifier: "ResourceGroupByRule" });
    case 1:
      return S.Array(__S(6464, __c202, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GroupByRules: S.optional(__S(6465, __c202, 1)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortOrder: S.optional(S.String),
          MaxStatisticResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/resourcesv2/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcesStatisticsV2Request" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StringFilters: S.optional(__S(3617, __c113, 1)),
          NestedCompositeFilters: S.optional(
            S.suspend(() => __S(6497, __c203, 1)).annotate({
              identifier: "ResourcesTrendsCompositeFilterList",
            }),
          ),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcesTrendsCompositeFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<ResourcesTrendsCompositeFilter> =>
          __S(6496, __c203, 0),
        ).annotate({ identifier: "ResourcesTrendsCompositeFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          CompositeFilters: S.optional(__S(6497, __c203, 1)),
          CompositeOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcesTrendsFilters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(6498, __c203, 2)),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/resourcesTrendsv2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcesTrendsV2Request" });
    case 4:
      return S.suspend(() => S.Struct({ AllResources: S.optional(S.Number) })).annotate({
        identifier: "ResourcesCount",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ ResourcesCount: S.optional(__S(6500, __c203, 4)) }),
      ).annotate({ identifier: "ResourcesTrendsValues" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TrendsValues: S.optional(__S(6501, __c203, 5)),
        }),
      ).annotate({ identifier: "ResourcesTrendsMetricsResult" });
    case 7:
      return S.Array(__S(6502, __c203, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Granularity: S.optional(S.String),
          TrendsMetrics: S.optional(__S(6503, __c203, 7)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourcesTrendsV2Response" });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(3714, __c116, 2)),
          Scopes: S.optional(__S(5890, __c184, 2)),
          SortCriteria: S.optional(__S(6017, __c188, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/resourcesv2" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcesV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Other: S.optional(S.Number),
          Fatal: S.optional(S.Number),
          Critical: S.optional(S.Number),
          High: S.optional(S.Number),
          Medium: S.optional(S.Number),
          Low: S.optional(S.Number),
          Informational: S.optional(S.Number),
          Unknown: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResourceSeverityBreakdown" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FindingType: S.optional(S.String),
          ProductName: S.optional(S.String),
          TotalFindings: S.optional(S.Number),
          Severities: S.optional(__S(6529, __c204, 1)),
        }),
      ).annotate({ identifier: "ResourceFindingsSummary" });
    case 3:
      return S.Array(__S(6530, __c204, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          HostResourceGuid: S.optional(S.String),
          HostResourceType: S.optional(S.String),
          CanonicalId: S.optional(S.String),
          SelfHostedAIModelResourceCount: S.optional(S.Number),
          SelfHostedAIAgentResourceCount: S.optional(S.Number),
          SelfHostedAIModelServingResourceCount: S.optional(S.Number),
          SelfHostedAIExternalEndpointResourceCount: S.optional(S.Number),
          SelfHostedAIDevelopmentResourceCount: S.optional(S.Number),
          SelfHostedAIAgentFrameworkResourceCount: S.optional(S.Number),
          SelfHostedAIAgentToolsAndIdentityResourceCount: S.optional(S.Number),
          SelfHostedTotalAIResourceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AIDetails" });
    case 5:
      return S.suspend(() => S.Struct({ AIDetails: S.optional(__S(6532, __c204, 4)) })).annotate({
        identifier: "ResourceInfo",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ Source: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "CriticalitySource" });
    case 7:
      return S.Array(__S(6534, __c204, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          ResourceGuid: S.optional(S.String),
          ResourceId: S.optional(S.String),
          AccountId: S.optional(S.String),
          AccountName: S.optional(S.String),
          Region: S.optional(S.String),
          ResourceProvider: S.optional(S.String),
          ResourceOwnerAccountId: S.optional(S.String),
          ResourceOwnerOrgId: S.optional(S.String),
          ResourceCloudPartition: S.optional(S.String),
          ResourceRegion: S.optional(S.String),
          ResourceCategory: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceName: S.optional(S.String),
          ResourceCreationTimeDt: S.optional(S.String),
          ResourceDetailCaptureTimeDt: S.optional(S.String),
          FindingsSummary: S.optional(__S(6531, __c204, 3)),
          ResourceTags: S.optional(__S(3137, __c98, 1)),
          ResourceConfig: S.optional(S.Any),
          ResourceSubCategory: S.optional(S.String),
          DiscoveryType: S.optional(S.String),
          ResourceInfo: S.optional(__S(6533, __c204, 5)),
          ResourceCriticality: S.optional(S.String),
          CriticalitySources: S.optional(__S(6535, __c204, 7)),
        }),
      ).annotate({ identifier: "ResourceResult" });
    case 9:
      return S.Array(__S(6536, __c204, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ Resources: S.optional(__S(6537, __c204, 9)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetResourcesV2Response" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String).pipe(T.HttpQuery("SecurityControlId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/securityControl/definition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSecurityControlDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SecurityControlDefinition: S.optional(__S(6602, __c206, 10)) }),
      ).annotate({ identifier: "GetSecurityControlDefinitionResponse" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(S.Number),
          Min: S.optional(S.Number),
          Max: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IntegerConfigurationOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(__S(2176, __c68, 0)),
          Min: S.optional(S.Number),
          Max: S.optional(S.Number),
          MaxItems: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IntegerListConfigurationOptions" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(S.String),
          Re2Expression: S.optional(S.String),
          ExpressionDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "StringConfigurationOptions" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(__S(1504, __c47, 0)),
          Re2Expression: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          ExpressionDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "StringListConfigurationOptions" });
    case 4:
      return S.suspend(() => S.Struct({ DefaultValue: S.optional(S.Boolean) })).annotate({
        identifier: "BooleanConfigurationOptions",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(S.String),
          AllowedValues: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "EnumConfigurationOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(__S(1504, __c47, 0)),
          MaxItems: S.optional(S.Number),
          AllowedValues: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "EnumListConfigurationOptions" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Integer: __S(6592, __c206, 0) }),
        /*@__PURE__*/ S.Struct({ IntegerList: __S(6593, __c206, 1) }),
        /*@__PURE__*/ S.Struct({ Double: __S(6592, __c206, 0) }),
        /*@__PURE__*/ S.Struct({ String: __S(6594, __c206, 2) }),
        /*@__PURE__*/ S.Struct({ StringList: __S(6595, __c206, 3) }),
        /*@__PURE__*/ S.Struct({ Boolean: __S(6596, __c206, 4) }),
        /*@__PURE__*/ S.Struct({ Enum: __S(6597, __c206, 5) }),
        /*@__PURE__*/ S.Struct({ EnumList: __S(6598, __c206, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          ConfigurationOptions: S.optional(__S(6599, __c206, 7)),
        }),
      ).annotate({ identifier: "ParameterDefinition" });
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(6600, __c206, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({
          SecurityControlId: S.optional(S.String),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          RemediationUrl: S.optional(S.String),
          SeverityRating: S.optional(S.String),
          CurrentRegionAvailability: S.optional(S.String),
          CustomizableProperties: S.optional(__S(4832, __c151, 0)),
          ParameterDefinitions: S.optional(__S(6601, __c206, 9)),
          Provider: S.optional(S.String),
        }),
      ).annotate({ identifier: "SecurityControlDefinition" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
