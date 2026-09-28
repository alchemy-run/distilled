import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "SecurityHub",
  target: "SecurityHubAPIService",
  version: "2018-10-26",
  sigv4: "securityhub",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://securityhub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://securityhub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string; readonly Code?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly Code?: string }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string; readonly Code?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class InvalidAccessException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAccessException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class OrganizationalUnitNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationalUnitNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export type NonEmptyString = string;
export interface AcceptAdministratorInvitationRequest {
  AdministratorId?: string;
  InvitationId?: string;
}
export interface AcceptAdministratorInvitationResponse {}
export interface AcceptInvitationRequest {
  MasterId?: string;
  InvitationId?: string;
}
export interface AcceptInvitationResponse {}
export type AutomationRulesArnsList = string[];
export interface BatchDeleteAutomationRulesRequest {
  AutomationRulesArns?: string[];
}
export interface UnprocessedAutomationRule {
  RuleArn?: string;
  ErrorCode?: number;
  ErrorMessage?: string;
}
export type UnprocessedAutomationRulesList = UnprocessedAutomationRule[];
export interface BatchDeleteAutomationRulesResponse {
  ProcessedAutomationRules?: string[];
  UnprocessedAutomationRules?: UnprocessedAutomationRule[];
}
export type StandardsSubscriptionArns = string[];
export interface BatchDisableStandardsRequest {
  StandardsSubscriptionArns?: string[];
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
  StatusReasonCode?: StatusReasonCode;
}
export type StandardsProvider = "AWS" | "Azure" | (string & {});
export interface StandardsSubscription {
  StandardsSubscriptionArn?: string;
  StandardsArn?: string;
  StandardsInput?: { [key: string]: string | undefined };
  StandardsStatus?: StandardsStatus;
  StandardsControlsUpdatable?: StandardsControlsUpdatable;
  StandardsStatusReason?: StandardsStatusReason;
  Provider?: StandardsProvider;
}
export type StandardsSubscriptions = StandardsSubscription[];
export interface BatchDisableStandardsResponse {
  StandardsSubscriptions?: (StandardsSubscription & {
    StandardsSubscriptionArn: NonEmptyString;
    StandardsArn: NonEmptyString;
    StandardsInput: StandardsInputParameterMap;
    StandardsStatus: StandardsStatus;
    StandardsStatusReason: StandardsStatusReason & {
      StatusReasonCode: StatusReasonCode;
    };
  })[];
}
export interface StandardsSubscriptionRequest {
  StandardsArn?: string;
  StandardsInput?: { [key: string]: string | undefined };
}
export type StandardsSubscriptionRequests = StandardsSubscriptionRequest[];
export interface BatchEnableStandardsRequest {
  StandardsSubscriptionRequests?: StandardsSubscriptionRequest[];
}
export interface BatchEnableStandardsResponse {
  StandardsSubscriptions?: (StandardsSubscription & {
    StandardsSubscriptionArn: NonEmptyString;
    StandardsArn: NonEmptyString;
    StandardsInput: StandardsInputParameterMap;
    StandardsStatus: StandardsStatus;
    StandardsStatusReason: StandardsStatusReason & {
      StatusReasonCode: StatusReasonCode;
    };
  })[];
}
export interface BatchGetAutomationRulesRequest {
  AutomationRulesArns?: string[];
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
  Value?: string;
  Comparison?: StringFilterComparison;
}
export type StringFilterList = StringFilter[];
export type DateRangeUnit = "DAYS" | (string & {});
export type DateRangeComparison = "WITHIN" | "OLDER_THAN" | (string & {});
export interface DateRange {
  Value?: number;
  Unit?: DateRangeUnit;
  Comparison?: DateRangeComparison;
}
export interface DateFilter {
  Start?: string;
  End?: string;
  DateRange?: DateRange;
}
export type DateFilterList = DateFilter[];
export interface NumberFilter {
  Gte?: number;
  Lte?: number;
  Eq?: number;
  Gt?: number;
  Lt?: number;
}
export type NumberFilterList = NumberFilter[];
export type MapFilterComparison =
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | (string & {});
export interface MapFilter {
  Key?: string;
  Value?: string;
  Comparison?: MapFilterComparison;
}
export type MapFilterList = MapFilter[];
export interface AutomationRulesFindingFilters {
  ProductArn?: StringFilter[];
  AwsAccountId?: StringFilter[];
  Id?: StringFilter[];
  GeneratorId?: StringFilter[];
  Type?: StringFilter[];
  FirstObservedAt?: DateFilter[];
  LastObservedAt?: DateFilter[];
  CreatedAt?: DateFilter[];
  UpdatedAt?: DateFilter[];
  Confidence?: NumberFilter[];
  Criticality?: NumberFilter[];
  Title?: StringFilter[];
  Description?: StringFilter[];
  SourceUrl?: StringFilter[];
  ProductName?: StringFilter[];
  CompanyName?: StringFilter[];
  SeverityLabel?: StringFilter[];
  ResourceType?: StringFilter[];
  ResourceId?: StringFilter[];
  ResourcePartition?: StringFilter[];
  ResourceRegion?: StringFilter[];
  ResourceTags?: MapFilter[];
  ResourceDetailsOther?: MapFilter[];
  ComplianceStatus?: StringFilter[];
  ComplianceSecurityControlId?: StringFilter[];
  ComplianceAssociatedStandardsId?: StringFilter[];
  VerificationState?: StringFilter[];
  WorkflowStatus?: StringFilter[];
  RecordState?: StringFilter[];
  RelatedFindingsProductArn?: StringFilter[];
  RelatedFindingsId?: StringFilter[];
  NoteText?: StringFilter[];
  NoteUpdatedAt?: DateFilter[];
  NoteUpdatedBy?: StringFilter[];
  UserDefinedFields?: MapFilter[];
  ResourceApplicationArn?: StringFilter[];
  ResourceApplicationName?: StringFilter[];
  AwsAccountName?: StringFilter[];
  ResourceProvider?: StringFilter[];
  ResourceOwnerAccountId?: StringFilter[];
  ResourceOwnerOrgId?: StringFilter[];
}
export type AutomationRulesActionType = "FINDING_FIELDS_UPDATE" | (string & {});
export interface NoteUpdate {
  Text?: string;
  UpdatedBy?: string;
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
  Normalized?: number;
  Product?: number;
  Label?: SeverityLabel;
}
export type VerificationState =
  | "UNKNOWN"
  | "TRUE_POSITIVE"
  | "FALSE_POSITIVE"
  | "BENIGN_POSITIVE"
  | (string & {});
export type TypeList = string[];
export type FieldMap = { [key: string]: string | undefined };
export type WorkflowStatus =
  | "NEW"
  | "NOTIFIED"
  | "RESOLVED"
  | "SUPPRESSED"
  | (string & {});
export interface WorkflowUpdate {
  Status?: WorkflowStatus;
}
export interface RelatedFinding {
  ProductArn?: string;
  Id?: string;
}
export type RelatedFindingList = RelatedFinding[];
export interface AutomationRulesFindingFieldsUpdate {
  Note?: NoteUpdate;
  Severity?: SeverityUpdate;
  VerificationState?: VerificationState;
  Confidence?: number;
  Criticality?: number;
  Types?: string[];
  UserDefinedFields?: { [key: string]: string | undefined };
  Workflow?: WorkflowUpdate;
  RelatedFindings?: RelatedFinding[];
}
export interface AutomationRulesAction {
  Type?: AutomationRulesActionType;
  FindingFieldsUpdate?: AutomationRulesFindingFieldsUpdate;
}
export type ActionList = AutomationRulesAction[];
export interface AutomationRulesConfig {
  RuleArn?: string;
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  RuleName?: string;
  Description?: string;
  IsTerminal?: boolean;
  Criteria?: AutomationRulesFindingFilters;
  Actions?: AutomationRulesAction[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
}
export type AutomationRulesConfigList = AutomationRulesConfig[];
export interface BatchGetAutomationRulesResponse {
  Rules?: (AutomationRulesConfig & {
    Actions: (AutomationRulesAction & {
      FindingFieldsUpdate: AutomationRulesFindingFieldsUpdate & {
        Note: NoteUpdate & { Text: NonEmptyString; UpdatedBy: NonEmptyString };
        RelatedFindings: (RelatedFinding & {
          ProductArn: NonEmptyString;
          Id: NonEmptyString;
        })[];
      };
    })[];
  })[];
  UnprocessedAutomationRules?: UnprocessedAutomationRule[];
}
export type Target =
  | { AccountId: string; OrganizationalUnitId?: never; RootId?: never }
  | { AccountId?: never; OrganizationalUnitId: string; RootId?: never }
  | { AccountId?: never; OrganizationalUnitId?: never; RootId: string };
export interface ConfigurationPolicyAssociation {
  Target?: Target;
}
export type ConfigurationPolicyAssociationsList =
  ConfigurationPolicyAssociation[];
export interface BatchGetConfigurationPolicyAssociationsRequest {
  ConfigurationPolicyAssociationIdentifiers?: ConfigurationPolicyAssociation[];
}
export type TargetType =
  | "ACCOUNT"
  | "ORGANIZATIONAL_UNIT"
  | "ROOT"
  | (string & {});
export type AssociationType = "INHERITED" | "APPLIED" | (string & {});
export type ConfigurationPolicyAssociationStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface ConfigurationPolicyAssociationSummary {
  ConfigurationPolicyId?: string;
  TargetId?: string;
  TargetType?: TargetType;
  AssociationType?: AssociationType;
  UpdatedAt?: Date;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
  AssociationStatusMessage?: string;
}
export type ConfigurationPolicyAssociationList =
  ConfigurationPolicyAssociationSummary[];
export interface UnprocessedConfigurationPolicyAssociation {
  ConfigurationPolicyAssociationIdentifiers?: ConfigurationPolicyAssociation;
  ErrorCode?: string;
  ErrorReason?: string;
}
export type UnprocessedConfigurationPolicyAssociationList =
  UnprocessedConfigurationPolicyAssociation[];
export interface BatchGetConfigurationPolicyAssociationsResponse {
  ConfigurationPolicyAssociations?: ConfigurationPolicyAssociationSummary[];
  UnprocessedConfigurationPolicyAssociations?: UnprocessedConfigurationPolicyAssociation[];
}
export type StringList = string[];
export interface BatchGetSecurityControlsRequest {
  SecurityControlIds?: string[];
}
export type SeverityRating =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export type ControlStatus = "ENABLED" | "DISABLED" | (string & {});
export type UpdateStatus = "READY" | "UPDATING" | (string & {});
export type ParameterValueType = "DEFAULT" | "CUSTOM" | (string & {});
export type IntegerList = number[];
export type ParameterValue =
  | {
      Integer: number;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList: number[];
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double: number;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String: string;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList: string[];
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean: boolean;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum: string;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList: string[];
    };
export interface ParameterConfiguration {
  ValueType?: ParameterValueType;
  Value?: ParameterValue;
}
export type Parameters = { [key: string]: ParameterConfiguration | undefined };
export type AlphaNumericNonEmptyString = string;
export type SecurityControlsProvider = "AWS" | "Azure" | (string & {});
export interface SecurityControl {
  SecurityControlId?: string;
  SecurityControlArn?: string;
  Title?: string;
  Description?: string;
  RemediationUrl?: string;
  SeverityRating?: SeverityRating;
  SecurityControlStatus?: ControlStatus;
  UpdateStatus?: UpdateStatus;
  Parameters?: { [key: string]: ParameterConfiguration | undefined };
  LastUpdateReason?: string;
  Provider?: SecurityControlsProvider;
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
  SecurityControlId?: string;
  ErrorCode?: UnprocessedErrorCode;
  ErrorReason?: string;
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
      [key: string]:
        | (ParameterConfiguration & { ValueType: ParameterValueType })
        | undefined;
    };
  })[];
  UnprocessedIds?: (UnprocessedSecurityControl & {
    SecurityControlId: NonEmptyString;
    ErrorCode: UnprocessedErrorCode;
  })[];
}
export interface StandardsControlAssociationId {
  SecurityControlId?: string;
  StandardsArn?: string;
}
export type StandardsControlAssociationIds = StandardsControlAssociationId[];
export interface BatchGetStandardsControlAssociationsRequest {
  StandardsControlAssociationIds?: StandardsControlAssociationId[];
}
export type AssociationStatus = "ENABLED" | "DISABLED" | (string & {});
export type RelatedRequirementsList = string[];
export type StandardsControlArnList = string[];
export interface StandardsControlAssociationDetail {
  StandardsArn?: string;
  SecurityControlId?: string;
  SecurityControlArn?: string;
  AssociationStatus?: AssociationStatus;
  RelatedRequirements?: string[];
  UpdatedAt?: Date;
  UpdatedReason?: string;
  StandardsControlTitle?: string;
  StandardsControlDescription?: string;
  StandardsControlArns?: string[];
}
export type StandardsControlAssociationDetails =
  StandardsControlAssociationDetail[];
export interface UnprocessedStandardsControlAssociation {
  StandardsControlAssociationId?: StandardsControlAssociationId;
  ErrorCode?: UnprocessedErrorCode;
  ErrorReason?: string;
}
export type UnprocessedStandardsControlAssociations =
  UnprocessedStandardsControlAssociation[];
export interface BatchGetStandardsControlAssociationsResponse {
  StandardsControlAssociationDetails: (StandardsControlAssociationDetail & {
    StandardsArn: NonEmptyString;
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    AssociationStatus: AssociationStatus;
  })[];
  UnprocessedAssociations?: (UnprocessedStandardsControlAssociation & {
    StandardsControlAssociationId: StandardsControlAssociationId & {
      SecurityControlId: NonEmptyString;
      StandardsArn: NonEmptyString;
    };
    ErrorCode: UnprocessedErrorCode;
  })[];
}
export interface Severity {
  Product?: number;
  Label?: SeverityLabel;
  Normalized?: number;
  Original?: string;
}
export interface Recommendation {
  Text?: string;
  Url?: string;
}
export interface Remediation {
  Recommendation?: Recommendation;
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
export type MalwareState =
  | "OBSERVED"
  | "REMOVAL_FAILED"
  | "REMOVED"
  | (string & {});
export interface Malware {
  Name?: string;
  Type?: MalwareType;
  Path?: string;
  State?: MalwareState;
}
export type MalwareList = Malware[];
export type NetworkDirection = "IN" | "OUT" | (string & {});
export interface PortRange {
  Begin?: number;
  End?: number;
}
export interface Network {
  Direction?: NetworkDirection;
  Protocol?: string;
  OpenPortRange?: PortRange;
  SourceIpV4?: string;
  SourceIpV6?: string;
  SourcePort?: number;
  SourceDomain?: string;
  SourceMac?: string;
  DestinationIpV4?: string;
  DestinationIpV6?: string;
  DestinationPort?: number;
  DestinationDomain?: string;
}
export type PortRangeList = PortRange[];
export interface NetworkPathComponentDetails {
  Address?: string[];
  PortRanges?: PortRange[];
}
export interface NetworkHeader {
  Protocol?: string;
  Destination?: NetworkPathComponentDetails;
  Source?: NetworkPathComponentDetails;
}
export interface NetworkPathComponent {
  ComponentId?: string;
  ComponentType?: string;
  Egress?: NetworkHeader;
  Ingress?: NetworkHeader;
}
export type NetworkPathList = NetworkPathComponent[];
export interface ProcessDetails {
  Name?: string;
  Path?: string;
  Pid?: number;
  ParentPid?: number;
  LaunchedAt?: string;
  TerminatedAt?: string;
}
export interface FilePaths {
  FilePath?: string;
  FileName?: string;
  ResourceId?: string;
  Hash?: string;
}
export type FilePathList = FilePaths[];
export interface Threat {
  Name?: string;
  Severity?: string;
  ItemCount?: number;
  FilePaths?: FilePaths[];
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
  Type?: ThreatIntelIndicatorType;
  Value?: string;
  Category?: ThreatIntelIndicatorCategory;
  LastObservedAt?: string;
  Source?: string;
  SourceUrl?: string;
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
  Id?: string;
}
export interface ResourceOwnerOrg {
  Id?: string;
}
export interface ResourceOwner {
  Account?: ResourceOwnerAccount;
  Org?: ResourceOwnerOrg;
}
export interface ClassificationStatus {
  Code?: string;
  Reason?: string;
}
export interface Range {
  Start?: number;
  End?: number;
  StartColumn?: number;
}
export type Ranges = Range[];
export interface Page {
  PageNumber?: number;
  LineRange?: Range;
  OffsetRange?: Range;
}
export type Pages = Page[];
export interface Record {
  JsonPath?: string;
  RecordIndex?: number;
}
export type Records = Record[];
export interface Cell {
  Column?: number;
  Row?: number;
  ColumnName?: string;
  CellReference?: string;
}
export type Cells = Cell[];
export interface Occurrences {
  LineRanges?: Range[];
  OffsetRanges?: Range[];
  Pages?: Page[];
  Records?: Record[];
  Cells?: Cell[];
}
export interface SensitiveDataDetections {
  Count?: number;
  Type?: string;
  Occurrences?: Occurrences;
}
export type SensitiveDataDetectionsList = SensitiveDataDetections[];
export interface SensitiveDataResult {
  Category?: string;
  Detections?: SensitiveDataDetections[];
  TotalCount?: number;
}
export type SensitiveDataResultList = SensitiveDataResult[];
export interface CustomDataIdentifiersDetections {
  Count?: number;
  Arn?: string;
  Name?: string;
  Occurrences?: Occurrences;
}
export type CustomDataIdentifiersDetectionsList =
  CustomDataIdentifiersDetections[];
export interface CustomDataIdentifiersResult {
  Detections?: CustomDataIdentifiersDetections[];
  TotalCount?: number;
}
export interface ClassificationResult {
  MimeType?: string;
  SizeClassified?: number;
  AdditionalOccurrences?: boolean;
  Status?: ClassificationStatus;
  SensitiveData?: SensitiveDataResult[];
  CustomDataIdentifiers?: CustomDataIdentifiersResult;
}
export interface DataClassificationDetails {
  DetailedResultsLocation?: string;
  Result?: ClassificationResult;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails {
  OnDemandAllocationStrategy?: string;
  OnDemandBaseCapacity?: number;
  OnDemandPercentageAboveBaseCapacity?: number;
  SpotAllocationStrategy?: string;
  SpotInstancePools?: number;
  SpotMaxPrice?: string;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails {
  InstanceType?: string;
  WeightedCapacity?: string;
}
export type AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesList =
  AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails[];
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails {
  LaunchTemplateSpecification?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateLaunchTemplateSpecification;
  Overrides?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateOverridesListDetails[];
}
export interface AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails {
  InstancesDistribution?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyInstancesDistributionDetails;
  LaunchTemplate?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyLaunchTemplateDetails;
}
export interface AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails {
  Value?: string;
}
export type AwsAutoScalingAutoScalingGroupAvailabilityZonesList =
  AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails[];
export interface AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export interface AwsAutoScalingAutoScalingGroupDetails {
  LaunchConfigurationName?: string;
  LoadBalancerNames?: string[];
  HealthCheckType?: string;
  HealthCheckGracePeriod?: number;
  CreatedTime?: string;
  MixedInstancesPolicy?: AwsAutoScalingAutoScalingGroupMixedInstancesPolicyDetails;
  AvailabilityZones?: AwsAutoScalingAutoScalingGroupAvailabilityZonesListDetails[];
  LaunchTemplate?: AwsAutoScalingAutoScalingGroupLaunchTemplateLaunchTemplateSpecification;
  CapacityRebalance?: boolean;
}
export interface AwsCodeBuildProjectArtifactsDetails {
  ArtifactIdentifier?: string;
  EncryptionDisabled?: boolean;
  Location?: string;
  Name?: string;
  NamespaceType?: string;
  OverrideArtifactName?: boolean;
  Packaging?: string;
  Path?: string;
  Type?: string;
}
export type AwsCodeBuildProjectArtifactsList =
  AwsCodeBuildProjectArtifactsDetails[];
export interface AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails {
  Name?: string;
  Type?: string;
  Value?: string;
}
export type AwsCodeBuildProjectEnvironmentEnvironmentVariablesList =
  AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails[];
export interface AwsCodeBuildProjectEnvironmentRegistryCredential {
  Credential?: string;
  CredentialProvider?: string;
}
export interface AwsCodeBuildProjectEnvironment {
  Certificate?: string;
  EnvironmentVariables?: AwsCodeBuildProjectEnvironmentEnvironmentVariablesDetails[];
  PrivilegedMode?: boolean;
  ImagePullCredentialsType?: string;
  RegistryCredential?: AwsCodeBuildProjectEnvironmentRegistryCredential;
  Type?: string;
}
export interface AwsCodeBuildProjectSource {
  Type?: string;
  Location?: string;
  GitCloneDepth?: number;
  InsecureSsl?: boolean;
}
export interface AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails {
  GroupName?: string;
  Status?: string;
  StreamName?: string;
}
export interface AwsCodeBuildProjectLogsConfigS3LogsDetails {
  EncryptionDisabled?: boolean;
  Location?: string;
  Status?: string;
}
export interface AwsCodeBuildProjectLogsConfigDetails {
  CloudWatchLogs?: AwsCodeBuildProjectLogsConfigCloudWatchLogsDetails;
  S3Logs?: AwsCodeBuildProjectLogsConfigS3LogsDetails;
}
export type NonEmptyStringList = string[];
export interface AwsCodeBuildProjectVpcConfig {
  VpcId?: string;
  Subnets?: string[];
  SecurityGroupIds?: string[];
}
export interface AwsCodeBuildProjectDetails {
  EncryptionKey?: string;
  Artifacts?: AwsCodeBuildProjectArtifactsDetails[];
  Environment?: AwsCodeBuildProjectEnvironment;
  Name?: string;
  Source?: AwsCodeBuildProjectSource;
  ServiceRole?: string;
  LogsConfig?: AwsCodeBuildProjectLogsConfigDetails;
  VpcConfig?: AwsCodeBuildProjectVpcConfig;
  SecondaryArtifacts?: AwsCodeBuildProjectArtifactsDetails[];
}
export interface AwsCloudFrontDistributionCacheBehavior {
  ViewerProtocolPolicy?: string;
}
export type AwsCloudFrontDistributionCacheBehaviorsItemList =
  AwsCloudFrontDistributionCacheBehavior[];
export interface AwsCloudFrontDistributionCacheBehaviors {
  Items?: AwsCloudFrontDistributionCacheBehavior[];
}
export interface AwsCloudFrontDistributionDefaultCacheBehavior {
  ViewerProtocolPolicy?: string;
}
export interface AwsCloudFrontDistributionLogging {
  Bucket?: string;
  Enabled?: boolean;
  IncludeCookies?: boolean;
  Prefix?: string;
}
export interface AwsCloudFrontDistributionOriginS3OriginConfig {
  OriginAccessIdentity?: string;
}
export interface AwsCloudFrontDistributionOriginSslProtocols {
  Items?: string[];
  Quantity?: number;
}
export interface AwsCloudFrontDistributionOriginCustomOriginConfig {
  HttpPort?: number;
  HttpsPort?: number;
  OriginKeepaliveTimeout?: number;
  OriginProtocolPolicy?: string;
  OriginReadTimeout?: number;
  OriginSslProtocols?: AwsCloudFrontDistributionOriginSslProtocols;
}
export interface AwsCloudFrontDistributionOriginItem {
  DomainName?: string;
  Id?: string;
  OriginPath?: string;
  S3OriginConfig?: AwsCloudFrontDistributionOriginS3OriginConfig;
  CustomOriginConfig?: AwsCloudFrontDistributionOriginCustomOriginConfig;
}
export type AwsCloudFrontDistributionOriginItemList =
  AwsCloudFrontDistributionOriginItem[];
export interface AwsCloudFrontDistributionOrigins {
  Items?: AwsCloudFrontDistributionOriginItem[];
}
export type AwsCloudFrontDistributionOriginGroupFailoverStatusCodesItemList =
  number[];
export interface AwsCloudFrontDistributionOriginGroupFailoverStatusCodes {
  Items?: number[];
  Quantity?: number;
}
export interface AwsCloudFrontDistributionOriginGroupFailover {
  StatusCodes?: AwsCloudFrontDistributionOriginGroupFailoverStatusCodes;
}
export interface AwsCloudFrontDistributionOriginGroup {
  FailoverCriteria?: AwsCloudFrontDistributionOriginGroupFailover;
}
export type AwsCloudFrontDistributionOriginGroupsItemList =
  AwsCloudFrontDistributionOriginGroup[];
export interface AwsCloudFrontDistributionOriginGroups {
  Items?: AwsCloudFrontDistributionOriginGroup[];
}
export interface AwsCloudFrontDistributionViewerCertificate {
  AcmCertificateArn?: string;
  Certificate?: string;
  CertificateSource?: string;
  CloudFrontDefaultCertificate?: boolean;
  IamCertificateId?: string;
  MinimumProtocolVersion?: string;
  SslSupportMethod?: string;
}
export interface AwsCloudFrontDistributionDetails {
  CacheBehaviors?: AwsCloudFrontDistributionCacheBehaviors;
  DefaultCacheBehavior?: AwsCloudFrontDistributionDefaultCacheBehavior;
  DefaultRootObject?: string;
  DomainName?: string;
  ETag?: string;
  LastModifiedTime?: string;
  Logging?: AwsCloudFrontDistributionLogging;
  Origins?: AwsCloudFrontDistributionOrigins;
  OriginGroups?: AwsCloudFrontDistributionOriginGroups;
  ViewerCertificate?: AwsCloudFrontDistributionViewerCertificate;
  Status?: string;
  WebAclId?: string;
}
export interface AwsEc2InstanceNetworkInterfacesDetails {
  NetworkInterfaceId?: string;
}
export type AwsEc2InstanceNetworkInterfacesList =
  AwsEc2InstanceNetworkInterfacesDetails[];
export interface AwsEc2InstanceMetadataOptions {
  HttpEndpoint?: string;
  HttpProtocolIpv6?: string;
  HttpPutResponseHopLimit?: number;
  HttpTokens?: string;
  InstanceMetadataTags?: string;
}
export interface AwsEc2InstanceMonitoringDetails {
  State?: string;
}
export interface AwsEc2InstanceDetails {
  Type?: string;
  ImageId?: string;
  IpV4Addresses?: string[];
  IpV6Addresses?: string[];
  KeyName?: string;
  IamInstanceProfileArn?: string;
  VpcId?: string;
  SubnetId?: string;
  LaunchedAt?: string;
  NetworkInterfaces?: AwsEc2InstanceNetworkInterfacesDetails[];
  VirtualizationType?: string;
  MetadataOptions?: AwsEc2InstanceMetadataOptions;
  Monitoring?: AwsEc2InstanceMonitoringDetails;
}
export interface AwsEc2NetworkInterfaceAttachment {
  AttachTime?: string;
  AttachmentId?: string;
  DeleteOnTermination?: boolean;
  DeviceIndex?: number;
  InstanceId?: string;
  InstanceOwnerId?: string;
  Status?: string;
}
export interface AwsEc2NetworkInterfaceSecurityGroup {
  GroupName?: string;
  GroupId?: string;
}
export type AwsEc2NetworkInterfaceSecurityGroupList =
  AwsEc2NetworkInterfaceSecurityGroup[];
export interface AwsEc2NetworkInterfaceIpV6AddressDetail {
  IpV6Address?: string;
}
export type AwsEc2NetworkInterfaceIpV6AddressList =
  AwsEc2NetworkInterfaceIpV6AddressDetail[];
export interface AwsEc2NetworkInterfacePrivateIpAddressDetail {
  PrivateIpAddress?: string;
  PrivateDnsName?: string;
}
export type AwsEc2NetworkInterfacePrivateIpAddressList =
  AwsEc2NetworkInterfacePrivateIpAddressDetail[];
export interface AwsEc2NetworkInterfaceDetails {
  Attachment?: AwsEc2NetworkInterfaceAttachment;
  NetworkInterfaceId?: string;
  SecurityGroups?: AwsEc2NetworkInterfaceSecurityGroup[];
  SourceDestCheck?: boolean;
  IpV6Addresses?: AwsEc2NetworkInterfaceIpV6AddressDetail[];
  PrivateIpAddresses?: AwsEc2NetworkInterfacePrivateIpAddressDetail[];
  PublicDnsName?: string;
  PublicIp?: string;
}
export interface AwsEc2SecurityGroupUserIdGroupPair {
  GroupId?: string;
  GroupName?: string;
  PeeringStatus?: string;
  UserId?: string;
  VpcId?: string;
  VpcPeeringConnectionId?: string;
}
export type AwsEc2SecurityGroupUserIdGroupPairList =
  AwsEc2SecurityGroupUserIdGroupPair[];
export interface AwsEc2SecurityGroupIpRange {
  CidrIp?: string;
}
export type AwsEc2SecurityGroupIpRangeList = AwsEc2SecurityGroupIpRange[];
export interface AwsEc2SecurityGroupIpv6Range {
  CidrIpv6?: string;
}
export type AwsEc2SecurityGroupIpv6RangeList = AwsEc2SecurityGroupIpv6Range[];
export interface AwsEc2SecurityGroupPrefixListId {
  PrefixListId?: string;
}
export type AwsEc2SecurityGroupPrefixListIdList =
  AwsEc2SecurityGroupPrefixListId[];
export interface AwsEc2SecurityGroupIpPermission {
  IpProtocol?: string;
  FromPort?: number;
  ToPort?: number;
  UserIdGroupPairs?: AwsEc2SecurityGroupUserIdGroupPair[];
  IpRanges?: AwsEc2SecurityGroupIpRange[];
  Ipv6Ranges?: AwsEc2SecurityGroupIpv6Range[];
  PrefixListIds?: AwsEc2SecurityGroupPrefixListId[];
}
export type AwsEc2SecurityGroupIpPermissionList =
  AwsEc2SecurityGroupIpPermission[];
export interface AwsEc2SecurityGroupDetails {
  GroupName?: string;
  GroupId?: string;
  OwnerId?: string;
  VpcId?: string;
  IpPermissions?: AwsEc2SecurityGroupIpPermission[];
  IpPermissionsEgress?: AwsEc2SecurityGroupIpPermission[];
}
export interface AwsEc2VolumeAttachment {
  AttachTime?: string;
  DeleteOnTermination?: boolean;
  InstanceId?: string;
  Status?: string;
}
export type AwsEc2VolumeAttachmentList = AwsEc2VolumeAttachment[];
export interface AwsEc2VolumeDetails {
  CreateTime?: string;
  DeviceName?: string;
  Encrypted?: boolean;
  Size?: number;
  SnapshotId?: string;
  Status?: string;
  KmsKeyId?: string;
  Attachments?: AwsEc2VolumeAttachment[];
  VolumeId?: string;
  VolumeType?: string;
  VolumeScanStatus?: string;
}
export interface CidrBlockAssociation {
  AssociationId?: string;
  CidrBlock?: string;
  CidrBlockState?: string;
}
export type CidrBlockAssociationList = CidrBlockAssociation[];
export interface Ipv6CidrBlockAssociation {
  AssociationId?: string;
  Ipv6CidrBlock?: string;
  CidrBlockState?: string;
}
export type Ipv6CidrBlockAssociationList = Ipv6CidrBlockAssociation[];
export interface AwsEc2VpcDetails {
  CidrBlockAssociationSet?: CidrBlockAssociation[];
  Ipv6CidrBlockAssociationSet?: Ipv6CidrBlockAssociation[];
  DhcpOptionsId?: string;
  State?: string;
}
export interface AwsEc2EipDetails {
  InstanceId?: string;
  PublicIp?: string;
  AllocationId?: string;
  AssociationId?: string;
  Domain?: string;
  PublicIpv4Pool?: string;
  NetworkBorderGroup?: string;
  NetworkInterfaceId?: string;
  NetworkInterfaceOwnerId?: string;
  PrivateIpAddress?: string;
}
export interface AwsEc2SubnetDetails {
  AssignIpv6AddressOnCreation?: boolean;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  AvailableIpAddressCount?: number;
  CidrBlock?: string;
  DefaultForAz?: boolean;
  MapPublicIpOnLaunch?: boolean;
  OwnerId?: string;
  State?: string;
  SubnetArn?: string;
  SubnetId?: string;
  VpcId?: string;
  Ipv6CidrBlockAssociationSet?: Ipv6CidrBlockAssociation[];
}
export interface AwsEc2NetworkAclAssociation {
  NetworkAclAssociationId?: string;
  NetworkAclId?: string;
  SubnetId?: string;
}
export type AwsEc2NetworkAclAssociationList = AwsEc2NetworkAclAssociation[];
export interface IcmpTypeCode {
  Code?: number;
  Type?: number;
}
export interface PortRangeFromTo {
  From?: number;
  To?: number;
}
export interface AwsEc2NetworkAclEntry {
  CidrBlock?: string;
  Egress?: boolean;
  IcmpTypeCode?: IcmpTypeCode;
  Ipv6CidrBlock?: string;
  PortRange?: PortRangeFromTo;
  Protocol?: string;
  RuleAction?: string;
  RuleNumber?: number;
}
export type AwsEc2NetworkAclEntryList = AwsEc2NetworkAclEntry[];
export interface AwsEc2NetworkAclDetails {
  IsDefault?: boolean;
  NetworkAclId?: string;
  OwnerId?: string;
  VpcId?: string;
  Associations?: AwsEc2NetworkAclAssociation[];
  Entries?: AwsEc2NetworkAclEntry[];
}
export interface AvailabilityZone {
  ZoneName?: string;
  SubnetId?: string;
}
export type AvailabilityZones = AvailabilityZone[];
export type SecurityGroups = string[];
export interface LoadBalancerState {
  Code?: string;
  Reason?: string;
}
export interface AwsElbv2LoadBalancerAttribute {
  Key?: string;
  Value?: string;
}
export type AwsElbv2LoadBalancerAttributes = AwsElbv2LoadBalancerAttribute[];
export interface AwsElbv2LoadBalancerDetails {
  AvailabilityZones?: AvailabilityZone[];
  CanonicalHostedZoneId?: string;
  CreatedTime?: string;
  DNSName?: string;
  IpAddressType?: string;
  Scheme?: string;
  SecurityGroups?: string[];
  State?: LoadBalancerState;
  Type?: string;
  VpcId?: string;
  LoadBalancerAttributes?: AwsElbv2LoadBalancerAttribute[];
}
export interface AwsElasticBeanstalkEnvironmentEnvironmentLink {
  EnvironmentName?: string;
  LinkName?: string;
}
export type AwsElasticBeanstalkEnvironmentEnvironmentLinks =
  AwsElasticBeanstalkEnvironmentEnvironmentLink[];
export interface AwsElasticBeanstalkEnvironmentOptionSetting {
  Namespace?: string;
  OptionName?: string;
  ResourceName?: string;
  Value?: string;
}
export type AwsElasticBeanstalkEnvironmentOptionSettings =
  AwsElasticBeanstalkEnvironmentOptionSetting[];
export interface AwsElasticBeanstalkEnvironmentTier {
  Name?: string;
  Type?: string;
  Version?: string;
}
export interface AwsElasticBeanstalkEnvironmentDetails {
  ApplicationName?: string;
  Cname?: string;
  DateCreated?: string;
  DateUpdated?: string;
  Description?: string;
  EndpointUrl?: string;
  EnvironmentArn?: string;
  EnvironmentId?: string;
  EnvironmentLinks?: AwsElasticBeanstalkEnvironmentEnvironmentLink[];
  EnvironmentName?: string;
  OptionSettings?: AwsElasticBeanstalkEnvironmentOptionSetting[];
  PlatformArn?: string;
  SolutionStackName?: string;
  Status?: string;
  Tier?: AwsElasticBeanstalkEnvironmentTier;
  VersionLabel?: string;
}
export interface AwsElasticsearchDomainDomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: string;
}
export interface AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails {
  AvailabilityZoneCount?: number;
}
export interface AwsElasticsearchDomainElasticsearchClusterConfigDetails {
  DedicatedMasterCount?: number;
  DedicatedMasterEnabled?: boolean;
  DedicatedMasterType?: string;
  InstanceCount?: number;
  InstanceType?: string;
  ZoneAwarenessConfig?: AwsElasticsearchDomainElasticsearchClusterConfigZoneAwarenessConfigDetails;
  ZoneAwarenessEnabled?: boolean;
}
export interface AwsElasticsearchDomainEncryptionAtRestOptions {
  Enabled?: boolean;
  KmsKeyId?: string;
}
export interface AwsElasticsearchDomainLogPublishingOptionsLogConfig {
  CloudWatchLogsLogGroupArn?: string;
  Enabled?: boolean;
}
export interface AwsElasticsearchDomainLogPublishingOptions {
  IndexSlowLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig;
  SearchSlowLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig;
  AuditLogs?: AwsElasticsearchDomainLogPublishingOptionsLogConfig;
}
export interface AwsElasticsearchDomainNodeToNodeEncryptionOptions {
  Enabled?: boolean;
}
export interface AwsElasticsearchDomainServiceSoftwareOptions {
  AutomatedUpdateDate?: string;
  Cancellable?: boolean;
  CurrentVersion?: string;
  Description?: string;
  NewVersion?: string;
  UpdateAvailable?: boolean;
  UpdateStatus?: string;
}
export interface AwsElasticsearchDomainVPCOptions {
  AvailabilityZones?: string[];
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  VPCId?: string;
}
export interface AwsElasticsearchDomainDetails {
  AccessPolicies?: string;
  DomainEndpointOptions?: AwsElasticsearchDomainDomainEndpointOptions;
  DomainId?: string;
  DomainName?: string;
  Endpoint?: string;
  Endpoints?: { [key: string]: string | undefined };
  ElasticsearchVersion?: string;
  ElasticsearchClusterConfig?: AwsElasticsearchDomainElasticsearchClusterConfigDetails;
  EncryptionAtRestOptions?: AwsElasticsearchDomainEncryptionAtRestOptions;
  LogPublishingOptions?: AwsElasticsearchDomainLogPublishingOptions;
  NodeToNodeEncryptionOptions?: AwsElasticsearchDomainNodeToNodeEncryptionOptions;
  ServiceSoftwareOptions?: AwsElasticsearchDomainServiceSoftwareOptions;
  VPCOptions?: AwsElasticsearchDomainVPCOptions;
}
export interface AwsS3BucketServerSideEncryptionByDefault {
  SSEAlgorithm?: string;
  KMSMasterKeyID?: string;
}
export interface AwsS3BucketServerSideEncryptionRule {
  ApplyServerSideEncryptionByDefault?: AwsS3BucketServerSideEncryptionByDefault;
}
export type AwsS3BucketServerSideEncryptionRules =
  AwsS3BucketServerSideEncryptionRule[];
export interface AwsS3BucketServerSideEncryptionConfiguration {
  Rules?: AwsS3BucketServerSideEncryptionRule[];
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails {
  DaysAfterInitiation?: number;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails {
  Key?: string;
  Value?: string;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails {
  Prefix?: string;
  Tag?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsTagDetails;
  Type?: string;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsList =
  AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails {
  Key?: string;
  Value?: string;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails {
  Operands?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateOperandsDetails[];
  Prefix?: string;
  Tag?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateTagDetails;
  Type?: string;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails {
  Predicate?: AwsS3BucketBucketLifecycleConfigurationRulesFilterPredicateDetails;
}
export interface AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails {
  Days?: number;
  StorageClass?: string;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsList =
  AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails {
  Date?: string;
  Days?: number;
  StorageClass?: string;
}
export type AwsS3BucketBucketLifecycleConfigurationRulesTransitionsList =
  AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationRulesDetails {
  AbortIncompleteMultipartUpload?: AwsS3BucketBucketLifecycleConfigurationRulesAbortIncompleteMultipartUploadDetails;
  ExpirationDate?: string;
  ExpirationInDays?: number;
  ExpiredObjectDeleteMarker?: boolean;
  Filter?: AwsS3BucketBucketLifecycleConfigurationRulesFilterDetails;
  ID?: string;
  NoncurrentVersionExpirationInDays?: number;
  NoncurrentVersionTransitions?: AwsS3BucketBucketLifecycleConfigurationRulesNoncurrentVersionTransitionsDetails[];
  Prefix?: string;
  Status?: string;
  Transitions?: AwsS3BucketBucketLifecycleConfigurationRulesTransitionsDetails[];
}
export type AwsS3BucketBucketLifecycleConfigurationRulesList =
  AwsS3BucketBucketLifecycleConfigurationRulesDetails[];
export interface AwsS3BucketBucketLifecycleConfigurationDetails {
  Rules?: AwsS3BucketBucketLifecycleConfigurationRulesDetails[];
}
export interface AwsS3AccountPublicAccessBlockDetails {
  BlockPublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
  IgnorePublicAcls?: boolean;
  RestrictPublicBuckets?: boolean;
}
export interface AwsS3BucketLoggingConfiguration {
  DestinationBucketName?: string;
  LogFilePrefix?: string;
}
export interface AwsS3BucketWebsiteConfigurationRedirectTo {
  Hostname?: string;
  Protocol?: string;
}
export interface AwsS3BucketWebsiteConfigurationRoutingRuleCondition {
  HttpErrorCodeReturnedEquals?: string;
  KeyPrefixEquals?: string;
}
export interface AwsS3BucketWebsiteConfigurationRoutingRuleRedirect {
  Hostname?: string;
  HttpRedirectCode?: string;
  Protocol?: string;
  ReplaceKeyPrefixWith?: string;
  ReplaceKeyWith?: string;
}
export interface AwsS3BucketWebsiteConfigurationRoutingRule {
  Condition?: AwsS3BucketWebsiteConfigurationRoutingRuleCondition;
  Redirect?: AwsS3BucketWebsiteConfigurationRoutingRuleRedirect;
}
export type AwsS3BucketWebsiteConfigurationRoutingRules =
  AwsS3BucketWebsiteConfigurationRoutingRule[];
export interface AwsS3BucketWebsiteConfiguration {
  ErrorDocument?: string;
  IndexDocumentSuffix?: string;
  RedirectAllRequestsTo?: AwsS3BucketWebsiteConfigurationRedirectTo;
  RoutingRules?: AwsS3BucketWebsiteConfigurationRoutingRule[];
}
export type AwsS3BucketNotificationConfigurationEvents = string[];
export type AwsS3BucketNotificationConfigurationS3KeyFilterRuleName =
  | "Prefix"
  | "Suffix"
  | (string & {});
export interface AwsS3BucketNotificationConfigurationS3KeyFilterRule {
  Name?: AwsS3BucketNotificationConfigurationS3KeyFilterRuleName;
  Value?: string;
}
export type AwsS3BucketNotificationConfigurationS3KeyFilterRules =
  AwsS3BucketNotificationConfigurationS3KeyFilterRule[];
export interface AwsS3BucketNotificationConfigurationS3KeyFilter {
  FilterRules?: AwsS3BucketNotificationConfigurationS3KeyFilterRule[];
}
export interface AwsS3BucketNotificationConfigurationFilter {
  S3KeyFilter?: AwsS3BucketNotificationConfigurationS3KeyFilter;
}
export interface AwsS3BucketNotificationConfigurationDetail {
  Events?: string[];
  Filter?: AwsS3BucketNotificationConfigurationFilter;
  Destination?: string;
  Type?: string;
}
export type AwsS3BucketNotificationConfigurationDetails =
  AwsS3BucketNotificationConfigurationDetail[];
export interface AwsS3BucketNotificationConfiguration {
  Configurations?: AwsS3BucketNotificationConfigurationDetail[];
}
export interface AwsS3BucketBucketVersioningConfiguration {
  IsMfaDeleteEnabled?: boolean;
  Status?: string;
}
export interface AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails {
  Days?: number;
  Mode?: string;
  Years?: number;
}
export interface AwsS3BucketObjectLockConfigurationRuleDetails {
  DefaultRetention?: AwsS3BucketObjectLockConfigurationRuleDefaultRetentionDetails;
}
export interface AwsS3BucketObjectLockConfiguration {
  ObjectLockEnabled?: string;
  Rule?: AwsS3BucketObjectLockConfigurationRuleDetails;
}
export interface AwsS3BucketDetails {
  OwnerId?: string;
  OwnerName?: string;
  OwnerAccountId?: string;
  CreatedAt?: string;
  ServerSideEncryptionConfiguration?: AwsS3BucketServerSideEncryptionConfiguration;
  BucketLifecycleConfiguration?: AwsS3BucketBucketLifecycleConfigurationDetails;
  PublicAccessBlockConfiguration?: AwsS3AccountPublicAccessBlockDetails;
  AccessControlList?: string;
  BucketLoggingConfiguration?: AwsS3BucketLoggingConfiguration;
  BucketWebsiteConfiguration?: AwsS3BucketWebsiteConfiguration;
  BucketNotificationConfiguration?: AwsS3BucketNotificationConfiguration;
  BucketVersioningConfiguration?: AwsS3BucketBucketVersioningConfiguration;
  ObjectLockConfiguration?: AwsS3BucketObjectLockConfiguration;
  Name?: string;
}
export interface AwsS3ObjectDetails {
  LastModified?: string;
  ETag?: string;
  VersionId?: string;
  ContentType?: string;
  ServerSideEncryption?: string;
  SSEKMSKeyId?: string;
}
export interface AwsSecretsManagerSecretRotationRules {
  AutomaticallyAfterDays?: number;
}
export interface AwsSecretsManagerSecretDetails {
  RotationRules?: AwsSecretsManagerSecretRotationRules;
  RotationOccurredWithinFrequency?: boolean;
  KmsKeyId?: string;
  RotationEnabled?: boolean;
  RotationLambdaArn?: string;
  Deleted?: boolean;
  Name?: string;
  Description?: string;
}
export type AwsIamAccessKeyStatus = "Active" | "Inactive" | (string & {});
export interface AwsIamAccessKeySessionContextAttributes {
  MfaAuthenticated?: boolean;
  CreationDate?: string;
}
export interface AwsIamAccessKeySessionContextSessionIssuer {
  Type?: string;
  PrincipalId?: string;
  Arn?: string;
  AccountId?: string;
  UserName?: string;
}
export interface AwsIamAccessKeySessionContext {
  Attributes?: AwsIamAccessKeySessionContextAttributes;
  SessionIssuer?: AwsIamAccessKeySessionContextSessionIssuer;
}
export interface AwsIamAccessKeyDetails {
  UserName?: string;
  Status?: AwsIamAccessKeyStatus;
  CreatedAt?: string;
  PrincipalId?: string;
  PrincipalType?: string;
  PrincipalName?: string;
  AccountId?: string;
  AccessKeyId?: string;
  SessionContext?: AwsIamAccessKeySessionContext;
}
export interface AwsIamAttachedManagedPolicy {
  PolicyName?: string;
  PolicyArn?: string;
}
export type AwsIamAttachedManagedPolicyList = AwsIamAttachedManagedPolicy[];
export interface AwsIamPermissionsBoundary {
  PermissionsBoundaryArn?: string;
  PermissionsBoundaryType?: string;
}
export interface AwsIamUserPolicy {
  PolicyName?: string;
}
export type AwsIamUserPolicyList = AwsIamUserPolicy[];
export interface AwsIamUserDetails {
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[];
  CreateDate?: string;
  GroupList?: string[];
  Path?: string;
  PermissionsBoundary?: AwsIamPermissionsBoundary;
  UserId?: string;
  UserName?: string;
  UserPolicyList?: AwsIamUserPolicy[];
}
export interface AwsIamPolicyVersion {
  VersionId?: string;
  IsDefaultVersion?: boolean;
  CreateDate?: string;
}
export type AwsIamPolicyVersionList = AwsIamPolicyVersion[];
export interface AwsIamPolicyDetails {
  AttachmentCount?: number;
  CreateDate?: string;
  DefaultVersionId?: string;
  Description?: string;
  IsAttachable?: boolean;
  Path?: string;
  PermissionsBoundaryUsageCount?: number;
  PolicyId?: string;
  PolicyName?: string;
  PolicyVersionList?: AwsIamPolicyVersion[];
  UpdateDate?: string;
}
export interface AwsApiGatewayV2RouteSettings {
  DetailedMetricsEnabled?: boolean;
  LoggingLevel?: string;
  DataTraceEnabled?: boolean;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
}
export interface AwsApiGatewayAccessLogSettings {
  Format?: string;
  DestinationArn?: string;
}
export interface AwsApiGatewayV2StageDetails {
  ClientCertificateId?: string;
  CreatedDate?: string;
  Description?: string;
  DefaultRouteSettings?: AwsApiGatewayV2RouteSettings;
  DeploymentId?: string;
  LastUpdatedDate?: string;
  RouteSettings?: AwsApiGatewayV2RouteSettings;
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  AccessLogSettings?: AwsApiGatewayAccessLogSettings;
  AutoDeploy?: boolean;
  LastDeploymentStatusMessage?: string;
  ApiGatewayManaged?: boolean;
}
export interface AwsCorsConfiguration {
  AllowOrigins?: string[];
  AllowCredentials?: boolean;
  ExposeHeaders?: string[];
  MaxAge?: number;
  AllowMethods?: string[];
  AllowHeaders?: string[];
}
export interface AwsApiGatewayV2ApiDetails {
  ApiEndpoint?: string;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CreatedDate?: string;
  Description?: string;
  Version?: string;
  Name?: string;
  ProtocolType?: string;
  RouteSelectionExpression?: string;
  CorsConfiguration?: AwsCorsConfiguration;
}
export interface AwsDynamoDbTableAttributeDefinition {
  AttributeName?: string;
  AttributeType?: string;
}
export type AwsDynamoDbTableAttributeDefinitionList =
  AwsDynamoDbTableAttributeDefinition[];
export interface AwsDynamoDbTableBillingModeSummary {
  BillingMode?: string;
  LastUpdateToPayPerRequestDateTime?: string;
}
export type SizeBytes = number;
export interface AwsDynamoDbTableKeySchema {
  AttributeName?: string;
  KeyType?: string;
}
export type AwsDynamoDbTableKeySchemaList = AwsDynamoDbTableKeySchema[];
export interface AwsDynamoDbTableProjection {
  NonKeyAttributes?: string[];
  ProjectionType?: string;
}
export interface AwsDynamoDbTableProvisionedThroughput {
  LastDecreaseDateTime?: string;
  LastIncreaseDateTime?: string;
  NumberOfDecreasesToday?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
}
export interface AwsDynamoDbTableGlobalSecondaryIndex {
  Backfilling?: boolean;
  IndexArn?: string;
  IndexName?: string;
  IndexSizeBytes?: number;
  IndexStatus?: string;
  ItemCount?: number;
  KeySchema?: AwsDynamoDbTableKeySchema[];
  Projection?: AwsDynamoDbTableProjection;
  ProvisionedThroughput?: AwsDynamoDbTableProvisionedThroughput;
}
export type AwsDynamoDbTableGlobalSecondaryIndexList =
  AwsDynamoDbTableGlobalSecondaryIndex[];
export interface AwsDynamoDbTableLocalSecondaryIndex {
  IndexArn?: string;
  IndexName?: string;
  KeySchema?: AwsDynamoDbTableKeySchema[];
  Projection?: AwsDynamoDbTableProjection;
}
export type AwsDynamoDbTableLocalSecondaryIndexList =
  AwsDynamoDbTableLocalSecondaryIndex[];
export interface AwsDynamoDbTableProvisionedThroughputOverride {
  ReadCapacityUnits?: number;
}
export interface AwsDynamoDbTableReplicaGlobalSecondaryIndex {
  IndexName?: string;
  ProvisionedThroughputOverride?: AwsDynamoDbTableProvisionedThroughputOverride;
}
export type AwsDynamoDbTableReplicaGlobalSecondaryIndexList =
  AwsDynamoDbTableReplicaGlobalSecondaryIndex[];
export interface AwsDynamoDbTableReplica {
  GlobalSecondaryIndexes?: AwsDynamoDbTableReplicaGlobalSecondaryIndex[];
  KmsMasterKeyId?: string;
  ProvisionedThroughputOverride?: AwsDynamoDbTableProvisionedThroughputOverride;
  RegionName?: string;
  ReplicaStatus?: string;
  ReplicaStatusDescription?: string;
}
export type AwsDynamoDbTableReplicaList = AwsDynamoDbTableReplica[];
export interface AwsDynamoDbTableRestoreSummary {
  SourceBackupArn?: string;
  SourceTableArn?: string;
  RestoreDateTime?: string;
  RestoreInProgress?: boolean;
}
export interface AwsDynamoDbTableSseDescription {
  InaccessibleEncryptionDateTime?: string;
  Status?: string;
  SseType?: string;
  KmsMasterKeyArn?: string;
}
export interface AwsDynamoDbTableStreamSpecification {
  StreamEnabled?: boolean;
  StreamViewType?: string;
}
export interface AwsDynamoDbTableDetails {
  AttributeDefinitions?: AwsDynamoDbTableAttributeDefinition[];
  BillingModeSummary?: AwsDynamoDbTableBillingModeSummary;
  CreationDateTime?: string;
  GlobalSecondaryIndexes?: AwsDynamoDbTableGlobalSecondaryIndex[];
  GlobalTableVersion?: string;
  ItemCount?: number;
  KeySchema?: AwsDynamoDbTableKeySchema[];
  LatestStreamArn?: string;
  LatestStreamLabel?: string;
  LocalSecondaryIndexes?: AwsDynamoDbTableLocalSecondaryIndex[];
  ProvisionedThroughput?: AwsDynamoDbTableProvisionedThroughput;
  Replicas?: AwsDynamoDbTableReplica[];
  RestoreSummary?: AwsDynamoDbTableRestoreSummary;
  SseDescription?: AwsDynamoDbTableSseDescription;
  StreamSpecification?: AwsDynamoDbTableStreamSpecification;
  TableId?: string;
  TableName?: string;
  TableSizeBytes?: number;
  TableStatus?: string;
  DeletionProtectionEnabled?: boolean;
}
export interface AwsApiGatewayMethodSettings {
  MetricsEnabled?: boolean;
  LoggingLevel?: string;
  DataTraceEnabled?: boolean;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
  CachingEnabled?: boolean;
  CacheTtlInSeconds?: number;
  CacheDataEncrypted?: boolean;
  RequireAuthorizationForCacheControl?: boolean;
  UnauthorizedCacheControlHeaderStrategy?: string;
  HttpMethod?: string;
  ResourcePath?: string;
}
export type AwsApiGatewayMethodSettingsList = AwsApiGatewayMethodSettings[];
export interface AwsApiGatewayCanarySettings {
  PercentTraffic?: number;
  DeploymentId?: string;
  StageVariableOverrides?: { [key: string]: string | undefined };
  UseStageCache?: boolean;
}
export interface AwsApiGatewayStageDetails {
  DeploymentId?: string;
  ClientCertificateId?: string;
  StageName?: string;
  Description?: string;
  CacheClusterEnabled?: boolean;
  CacheClusterSize?: string;
  CacheClusterStatus?: string;
  MethodSettings?: AwsApiGatewayMethodSettings[];
  Variables?: { [key: string]: string | undefined };
  DocumentationVersion?: string;
  AccessLogSettings?: AwsApiGatewayAccessLogSettings;
  CanarySettings?: AwsApiGatewayCanarySettings;
  TracingEnabled?: boolean;
  CreatedDate?: string;
  LastUpdatedDate?: string;
  WebAclArn?: string;
}
export interface AwsApiGatewayEndpointConfiguration {
  Types?: string[];
}
export interface AwsApiGatewayRestApiDetails {
  Id?: string;
  Name?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: string;
  BinaryMediaTypes?: string[];
  MinimumCompressionSize?: number;
  ApiKeySource?: string;
  EndpointConfiguration?: AwsApiGatewayEndpointConfiguration;
}
export interface AwsCloudTrailTrailDetails {
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  HasCustomEventSelectors?: boolean;
  HomeRegion?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  IsOrganizationTrail?: boolean;
  KmsKeyId?: string;
  LogFileValidationEnabled?: boolean;
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicArn?: string;
  SnsTopicName?: string;
  TrailArn?: string;
}
export interface AwsSsmComplianceSummary {
  Status?: string;
  CompliantCriticalCount?: number;
  CompliantHighCount?: number;
  CompliantMediumCount?: number;
  ExecutionType?: string;
  NonCompliantCriticalCount?: number;
  CompliantInformationalCount?: number;
  NonCompliantInformationalCount?: number;
  CompliantUnspecifiedCount?: number;
  NonCompliantLowCount?: number;
  NonCompliantHighCount?: number;
  CompliantLowCount?: number;
  ComplianceType?: string;
  PatchBaselineId?: string;
  OverallSeverity?: string;
  NonCompliantMediumCount?: number;
  NonCompliantUnspecifiedCount?: number;
  PatchGroup?: string;
}
export interface AwsSsmPatch {
  ComplianceSummary?: AwsSsmComplianceSummary;
}
export interface AwsSsmPatchComplianceDetails {
  Patch?: AwsSsmPatch;
}
export interface AwsCertificateManagerCertificateResourceRecord {
  Name?: string;
  Type?: string;
  Value?: string;
}
export interface AwsCertificateManagerCertificateDomainValidationOption {
  DomainName?: string;
  ResourceRecord?: AwsCertificateManagerCertificateResourceRecord;
  ValidationDomain?: string;
  ValidationEmails?: string[];
  ValidationMethod?: string;
  ValidationStatus?: string;
}
export type AwsCertificateManagerCertificateDomainValidationOptions =
  AwsCertificateManagerCertificateDomainValidationOption[];
export interface AwsCertificateManagerCertificateExtendedKeyUsage {
  Name?: string;
  OId?: string;
}
export type AwsCertificateManagerCertificateExtendedKeyUsages =
  AwsCertificateManagerCertificateExtendedKeyUsage[];
export interface AwsCertificateManagerCertificateKeyUsage {
  Name?: string;
}
export type AwsCertificateManagerCertificateKeyUsages =
  AwsCertificateManagerCertificateKeyUsage[];
export interface AwsCertificateManagerCertificateOptions {
  CertificateTransparencyLoggingPreference?: string;
}
export interface AwsCertificateManagerCertificateRenewalSummary {
  DomainValidationOptions?: AwsCertificateManagerCertificateDomainValidationOption[];
  RenewalStatus?: string;
  RenewalStatusReason?: string;
  UpdatedAt?: string;
}
export interface AwsCertificateManagerCertificateDetails {
  CertificateAuthorityArn?: string;
  CreatedAt?: string;
  DomainName?: string;
  DomainValidationOptions?: AwsCertificateManagerCertificateDomainValidationOption[];
  ExtendedKeyUsages?: AwsCertificateManagerCertificateExtendedKeyUsage[];
  FailureReason?: string;
  ImportedAt?: string;
  InUseBy?: string[];
  IssuedAt?: string;
  Issuer?: string;
  KeyAlgorithm?: string;
  KeyUsages?: AwsCertificateManagerCertificateKeyUsage[];
  NotAfter?: string;
  NotBefore?: string;
  Options?: AwsCertificateManagerCertificateOptions;
  RenewalEligibility?: string;
  RenewalSummary?: AwsCertificateManagerCertificateRenewalSummary;
  Serial?: string;
  SignatureAlgorithm?: string;
  Status?: string;
  Subject?: string;
  SubjectAlternativeNames?: string[];
  Type?: string;
}
export interface AwsRedshiftClusterClusterNode {
  NodeRole?: string;
  PrivateIpAddress?: string;
  PublicIpAddress?: string;
}
export type AwsRedshiftClusterClusterNodes = AwsRedshiftClusterClusterNode[];
export interface AwsRedshiftClusterClusterParameterStatus {
  ParameterName?: string;
  ParameterApplyStatus?: string;
  ParameterApplyErrorDescription?: string;
}
export type AwsRedshiftClusterClusterParameterStatusList =
  AwsRedshiftClusterClusterParameterStatus[];
export interface AwsRedshiftClusterClusterParameterGroup {
  ClusterParameterStatusList?: AwsRedshiftClusterClusterParameterStatus[];
  ParameterApplyStatus?: string;
  ParameterGroupName?: string;
}
export type AwsRedshiftClusterClusterParameterGroups =
  AwsRedshiftClusterClusterParameterGroup[];
export interface AwsRedshiftClusterClusterSecurityGroup {
  ClusterSecurityGroupName?: string;
  Status?: string;
}
export type AwsRedshiftClusterClusterSecurityGroups =
  AwsRedshiftClusterClusterSecurityGroup[];
export interface AwsRedshiftClusterClusterSnapshotCopyStatus {
  DestinationRegion?: string;
  ManualSnapshotRetentionPeriod?: number;
  RetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
}
export interface AwsRedshiftClusterDeferredMaintenanceWindow {
  DeferMaintenanceEndTime?: string;
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: string;
}
export type AwsRedshiftClusterDeferredMaintenanceWindows =
  AwsRedshiftClusterDeferredMaintenanceWindow[];
export interface AwsRedshiftClusterElasticIpStatus {
  ElasticIp?: string;
  Status?: string;
}
export interface AwsRedshiftClusterEndpoint {
  Address?: string;
  Port?: number;
}
export interface AwsRedshiftClusterHsmStatus {
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  Status?: string;
}
export interface AwsRedshiftClusterIamRole {
  ApplyStatus?: string;
  IamRoleArn?: string;
}
export type AwsRedshiftClusterIamRoles = AwsRedshiftClusterIamRole[];
export interface AwsRedshiftClusterPendingModifiedValues {
  AutomatedSnapshotRetentionPeriod?: number;
  ClusterIdentifier?: string;
  ClusterType?: string;
  ClusterVersion?: string;
  EncryptionType?: string;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  MasterUserPassword?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
}
export interface AwsRedshiftClusterResizeInfo {
  AllowCancelResize?: boolean;
  ResizeType?: string;
}
export interface AwsRedshiftClusterRestoreStatus {
  CurrentRestoreRateInMegaBytesPerSecond?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ProgressInMegaBytes?: number;
  SnapshotSizeInMegaBytes?: number;
  Status?: string;
}
export interface AwsRedshiftClusterVpcSecurityGroup {
  Status?: string;
  VpcSecurityGroupId?: string;
}
export type AwsRedshiftClusterVpcSecurityGroups =
  AwsRedshiftClusterVpcSecurityGroup[];
export interface AwsRedshiftClusterLoggingStatus {
  BucketName?: string;
  LastFailureMessage?: string;
  LastFailureTime?: string;
  LastSuccessfulDeliveryTime?: string;
  LoggingEnabled?: boolean;
  S3KeyPrefix?: string;
}
export interface AwsRedshiftClusterDetails {
  AllowVersionUpgrade?: boolean;
  AutomatedSnapshotRetentionPeriod?: number;
  AvailabilityZone?: string;
  ClusterAvailabilityStatus?: string;
  ClusterCreateTime?: string;
  ClusterIdentifier?: string;
  ClusterNodes?: AwsRedshiftClusterClusterNode[];
  ClusterParameterGroups?: AwsRedshiftClusterClusterParameterGroup[];
  ClusterPublicKey?: string;
  ClusterRevisionNumber?: string;
  ClusterSecurityGroups?: AwsRedshiftClusterClusterSecurityGroup[];
  ClusterSnapshotCopyStatus?: AwsRedshiftClusterClusterSnapshotCopyStatus;
  ClusterStatus?: string;
  ClusterSubnetGroupName?: string;
  ClusterVersion?: string;
  DBName?: string;
  DeferredMaintenanceWindows?: AwsRedshiftClusterDeferredMaintenanceWindow[];
  ElasticIpStatus?: AwsRedshiftClusterElasticIpStatus;
  ElasticResizeNumberOfNodeOptions?: string;
  Encrypted?: boolean;
  Endpoint?: AwsRedshiftClusterEndpoint;
  EnhancedVpcRouting?: boolean;
  ExpectedNextSnapshotScheduleTime?: string;
  ExpectedNextSnapshotScheduleTimeStatus?: string;
  HsmStatus?: AwsRedshiftClusterHsmStatus;
  IamRoles?: AwsRedshiftClusterIamRole[];
  KmsKeyId?: string;
  MaintenanceTrackName?: string;
  ManualSnapshotRetentionPeriod?: number;
  MasterUsername?: string;
  NextMaintenanceWindowStartTime?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  PendingActions?: string[];
  PendingModifiedValues?: AwsRedshiftClusterPendingModifiedValues;
  PreferredMaintenanceWindow?: string;
  PubliclyAccessible?: boolean;
  ResizeInfo?: AwsRedshiftClusterResizeInfo;
  RestoreStatus?: AwsRedshiftClusterRestoreStatus;
  SnapshotScheduleIdentifier?: string;
  SnapshotScheduleState?: string;
  VpcId?: string;
  VpcSecurityGroups?: AwsRedshiftClusterVpcSecurityGroup[];
  LoggingStatus?: AwsRedshiftClusterLoggingStatus;
}
export interface AwsElbLoadBalancerBackendServerDescription {
  InstancePort?: number;
  PolicyNames?: string[];
}
export type AwsElbLoadBalancerBackendServerDescriptions =
  AwsElbLoadBalancerBackendServerDescription[];
export interface AwsElbLoadBalancerHealthCheck {
  HealthyThreshold?: number;
  Interval?: number;
  Target?: string;
  Timeout?: number;
  UnhealthyThreshold?: number;
}
export interface AwsElbLoadBalancerInstance {
  InstanceId?: string;
}
export type AwsElbLoadBalancerInstances = AwsElbLoadBalancerInstance[];
export interface AwsElbLoadBalancerListener {
  InstancePort?: number;
  InstanceProtocol?: string;
  LoadBalancerPort?: number;
  Protocol?: string;
  SslCertificateId?: string;
}
export interface AwsElbLoadBalancerListenerDescription {
  Listener?: AwsElbLoadBalancerListener;
  PolicyNames?: string[];
}
export type AwsElbLoadBalancerListenerDescriptions =
  AwsElbLoadBalancerListenerDescription[];
export interface AwsElbLoadBalancerAccessLog {
  EmitInterval?: number;
  Enabled?: boolean;
  S3BucketName?: string;
  S3BucketPrefix?: string;
}
export interface AwsElbLoadBalancerConnectionDraining {
  Enabled?: boolean;
  Timeout?: number;
}
export interface AwsElbLoadBalancerConnectionSettings {
  IdleTimeout?: number;
}
export interface AwsElbLoadBalancerCrossZoneLoadBalancing {
  Enabled?: boolean;
}
export interface AwsElbLoadBalancerAdditionalAttribute {
  Key?: string;
  Value?: string;
}
export type AwsElbLoadBalancerAdditionalAttributeList =
  AwsElbLoadBalancerAdditionalAttribute[];
export interface AwsElbLoadBalancerAttributes {
  AccessLog?: AwsElbLoadBalancerAccessLog;
  ConnectionDraining?: AwsElbLoadBalancerConnectionDraining;
  ConnectionSettings?: AwsElbLoadBalancerConnectionSettings;
  CrossZoneLoadBalancing?: AwsElbLoadBalancerCrossZoneLoadBalancing;
  AdditionalAttributes?: AwsElbLoadBalancerAdditionalAttribute[];
}
export interface AwsElbAppCookieStickinessPolicy {
  CookieName?: string;
  PolicyName?: string;
}
export type AwsElbAppCookieStickinessPolicies =
  AwsElbAppCookieStickinessPolicy[];
export interface AwsElbLbCookieStickinessPolicy {
  CookieExpirationPeriod?: number;
  PolicyName?: string;
}
export type AwsElbLbCookieStickinessPolicies = AwsElbLbCookieStickinessPolicy[];
export interface AwsElbLoadBalancerPolicies {
  AppCookieStickinessPolicies?: AwsElbAppCookieStickinessPolicy[];
  LbCookieStickinessPolicies?: AwsElbLbCookieStickinessPolicy[];
  OtherPolicies?: string[];
}
export interface AwsElbLoadBalancerSourceSecurityGroup {
  GroupName?: string;
  OwnerAlias?: string;
}
export interface AwsElbLoadBalancerDetails {
  AvailabilityZones?: string[];
  BackendServerDescriptions?: AwsElbLoadBalancerBackendServerDescription[];
  CanonicalHostedZoneName?: string;
  CanonicalHostedZoneNameID?: string;
  CreatedTime?: string;
  DnsName?: string;
  HealthCheck?: AwsElbLoadBalancerHealthCheck;
  Instances?: AwsElbLoadBalancerInstance[];
  ListenerDescriptions?: AwsElbLoadBalancerListenerDescription[];
  LoadBalancerAttributes?: AwsElbLoadBalancerAttributes;
  LoadBalancerName?: string;
  Policies?: AwsElbLoadBalancerPolicies;
  Scheme?: string;
  SecurityGroups?: string[];
  SourceSecurityGroup?: AwsElbLoadBalancerSourceSecurityGroup;
  Subnets?: string[];
  VpcId?: string;
}
export interface AwsIamGroupPolicy {
  PolicyName?: string;
}
export type AwsIamGroupPolicyList = AwsIamGroupPolicy[];
export interface AwsIamGroupDetails {
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[];
  CreateDate?: string;
  GroupId?: string;
  GroupName?: string;
  GroupPolicyList?: AwsIamGroupPolicy[];
  Path?: string;
}
export type AwsIamRoleAssumeRolePolicyDocument = string;
export interface AwsIamInstanceProfileRole {
  Arn?: string;
  AssumeRolePolicyDocument?: string;
  CreateDate?: string;
  Path?: string;
  RoleId?: string;
  RoleName?: string;
}
export type AwsIamInstanceProfileRoles = AwsIamInstanceProfileRole[];
export interface AwsIamInstanceProfile {
  Arn?: string;
  CreateDate?: string;
  InstanceProfileId?: string;
  InstanceProfileName?: string;
  Path?: string;
  Roles?: AwsIamInstanceProfileRole[];
}
export type AwsIamInstanceProfileList = AwsIamInstanceProfile[];
export interface AwsIamRolePolicy {
  PolicyName?: string;
}
export type AwsIamRolePolicyList = AwsIamRolePolicy[];
export interface AwsIamRoleDetails {
  AssumeRolePolicyDocument?: string;
  AttachedManagedPolicies?: AwsIamAttachedManagedPolicy[];
  CreateDate?: string;
  InstanceProfileList?: AwsIamInstanceProfile[];
  PermissionsBoundary?: AwsIamPermissionsBoundary;
  RoleId?: string;
  RoleName?: string;
  RolePolicyList?: AwsIamRolePolicy[];
  MaxSessionDuration?: number;
  Path?: string;
}
export interface AwsKmsKeyDetails {
  AWSAccountId?: string;
  CreationDate?: number;
  KeyId?: string;
  KeyManager?: string;
  KeyState?: string;
  Origin?: string;
  Description?: string;
  KeyRotationStatus?: boolean;
}
export interface AwsLambdaFunctionCode {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  ZipFile?: string;
}
export interface AwsLambdaFunctionDeadLetterConfig {
  TargetArn?: string;
}
export interface AwsLambdaFunctionEnvironmentError {
  ErrorCode?: string;
  Message?: string;
}
export interface AwsLambdaFunctionEnvironment {
  Variables?: { [key: string]: string | undefined };
  Error?: AwsLambdaFunctionEnvironmentError;
}
export interface AwsLambdaFunctionLayer {
  Arn?: string;
  CodeSize?: number;
}
export type AwsLambdaFunctionLayerList = AwsLambdaFunctionLayer[];
export interface AwsLambdaFunctionTracingConfig {
  Mode?: string;
}
export interface AwsLambdaFunctionVpcConfig {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  VpcId?: string;
}
export interface AwsLambdaFunctionDetails {
  Code?: AwsLambdaFunctionCode;
  CodeSha256?: string;
  DeadLetterConfig?: AwsLambdaFunctionDeadLetterConfig;
  Environment?: AwsLambdaFunctionEnvironment;
  FunctionName?: string;
  Handler?: string;
  KmsKeyArn?: string;
  LastModified?: string;
  Layers?: AwsLambdaFunctionLayer[];
  MasterArn?: string;
  MemorySize?: number;
  RevisionId?: string;
  Role?: string;
  Runtime?: string;
  Timeout?: number;
  TracingConfig?: AwsLambdaFunctionTracingConfig;
  VpcConfig?: AwsLambdaFunctionVpcConfig;
  Version?: string;
  Architectures?: string[];
  PackageType?: string;
}
export type AwsLambdaLayerVersionNumber = number;
export interface AwsLambdaLayerVersionDetails {
  Version?: number;
  CompatibleRuntimes?: string[];
  CreatedDate?: string;
}
export interface AwsRdsDbInstanceAssociatedRole {
  RoleArn?: string;
  FeatureName?: string;
  Status?: string;
}
export type AwsRdsDbInstanceAssociatedRoles = AwsRdsDbInstanceAssociatedRole[];
export interface AwsRdsDbInstanceEndpoint {
  Address?: string;
  Port?: number;
  HostedZoneId?: string;
}
export interface AwsRdsDbInstanceVpcSecurityGroup {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export type AwsRdsDbInstanceVpcSecurityGroups =
  AwsRdsDbInstanceVpcSecurityGroup[];
export interface AwsRdsDbParameterGroup {
  DbParameterGroupName?: string;
  ParameterApplyStatus?: string;
}
export type AwsRdsDbParameterGroups = AwsRdsDbParameterGroup[];
export interface AwsRdsDbSubnetGroupSubnetAvailabilityZone {
  Name?: string;
}
export interface AwsRdsDbSubnetGroupSubnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AwsRdsDbSubnetGroupSubnetAvailabilityZone;
  SubnetStatus?: string;
}
export type AwsRdsDbSubnetGroupSubnets = AwsRdsDbSubnetGroupSubnet[];
export interface AwsRdsDbSubnetGroup {
  DbSubnetGroupName?: string;
  DbSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: AwsRdsDbSubnetGroupSubnet[];
  DbSubnetGroupArn?: string;
}
export interface AwsRdsPendingCloudWatchLogsExports {
  LogTypesToEnable?: string[];
  LogTypesToDisable?: string[];
}
export interface AwsRdsDbProcessorFeature {
  Name?: string;
  Value?: string;
}
export type AwsRdsDbProcessorFeatures = AwsRdsDbProcessorFeature[];
export interface AwsRdsDbPendingModifiedValues {
  DbInstanceClass?: string;
  AllocatedStorage?: number;
  MasterUserPassword?: string;
  Port?: number;
  BackupRetentionPeriod?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  LicenseModel?: string;
  Iops?: number;
  DbInstanceIdentifier?: string;
  StorageType?: string;
  CaCertificateIdentifier?: string;
  DbSubnetGroupName?: string;
  PendingCloudWatchLogsExports?: AwsRdsPendingCloudWatchLogsExports;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[];
}
export interface AwsRdsDbOptionGroupMembership {
  OptionGroupName?: string;
  Status?: string;
}
export type AwsRdsDbOptionGroupMemberships = AwsRdsDbOptionGroupMembership[];
export interface AwsRdsDbStatusInfo {
  StatusType?: string;
  Normal?: boolean;
  Status?: string;
  Message?: string;
}
export type AwsRdsDbStatusInfos = AwsRdsDbStatusInfo[];
export interface AwsRdsDbDomainMembership {
  Domain?: string;
  Status?: string;
  Fqdn?: string;
  IamRoleName?: string;
}
export type AwsRdsDbDomainMemberships = AwsRdsDbDomainMembership[];
export interface AwsRdsDbInstanceDetails {
  AssociatedRoles?: AwsRdsDbInstanceAssociatedRole[];
  CACertificateIdentifier?: string;
  DBClusterIdentifier?: string;
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  DbInstancePort?: number;
  DbiResourceId?: string;
  DBName?: string;
  DeletionProtection?: boolean;
  Endpoint?: AwsRdsDbInstanceEndpoint;
  Engine?: string;
  EngineVersion?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  InstanceCreateTime?: string;
  KmsKeyId?: string;
  PubliclyAccessible?: boolean;
  StorageEncrypted?: boolean;
  TdeCredentialArn?: string;
  VpcSecurityGroups?: AwsRdsDbInstanceVpcSecurityGroup[];
  MultiAz?: boolean;
  EnhancedMonitoringResourceArn?: string;
  DbInstanceStatus?: string;
  MasterUsername?: string;
  AllocatedStorage?: number;
  PreferredBackupWindow?: string;
  BackupRetentionPeriod?: number;
  DbSecurityGroups?: string[];
  DbParameterGroups?: AwsRdsDbParameterGroup[];
  AvailabilityZone?: string;
  DbSubnetGroup?: AwsRdsDbSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: AwsRdsDbPendingModifiedValues;
  LatestRestorableTime?: string;
  AutoMinorVersionUpgrade?: boolean;
  ReadReplicaSourceDBInstanceIdentifier?: string;
  ReadReplicaDBInstanceIdentifiers?: string[];
  ReadReplicaDBClusterIdentifiers?: string[];
  LicenseModel?: string;
  Iops?: number;
  OptionGroupMemberships?: AwsRdsDbOptionGroupMembership[];
  CharacterSetName?: string;
  SecondaryAvailabilityZone?: string;
  StatusInfos?: AwsRdsDbStatusInfo[];
  StorageType?: string;
  DomainMemberships?: AwsRdsDbDomainMembership[];
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  PromotionTier?: number;
  Timezone?: string;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKmsKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnabledCloudWatchLogsExports?: string[];
  ProcessorFeatures?: AwsRdsDbProcessorFeature[];
  ListenerEndpoint?: AwsRdsDbInstanceEndpoint;
  MaxAllocatedStorage?: number;
}
export interface AwsSnsTopicSubscription {
  Endpoint?: string;
  Protocol?: string;
}
export type AwsSnsTopicSubscriptionList = AwsSnsTopicSubscription[];
export interface AwsSnsTopicDetails {
  KmsMasterKeyId?: string;
  Subscription?: AwsSnsTopicSubscription[];
  TopicName?: string;
  Owner?: string;
  SqsSuccessFeedbackRoleArn?: string;
  SqsFailureFeedbackRoleArn?: string;
  ApplicationSuccessFeedbackRoleArn?: string;
  FirehoseSuccessFeedbackRoleArn?: string;
  FirehoseFailureFeedbackRoleArn?: string;
  HttpSuccessFeedbackRoleArn?: string;
  HttpFailureFeedbackRoleArn?: string;
}
export interface AwsSqsQueueDetails {
  KmsDataKeyReusePeriodSeconds?: number;
  KmsMasterKeyId?: string;
  QueueName?: string;
  DeadLetterTargetArn?: string;
}
export interface WafAction {
  Type?: string;
}
export interface WafExcludedRule {
  RuleId?: string;
}
export type WafExcludedRuleList = WafExcludedRule[];
export interface WafOverrideAction {
  Type?: string;
}
export interface AwsWafWebAclRule {
  Action?: WafAction;
  ExcludedRules?: WafExcludedRule[];
  OverrideAction?: WafOverrideAction;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export type AwsWafWebAclRuleList = AwsWafWebAclRule[];
export interface AwsWafWebAclDetails {
  Name?: string;
  DefaultAction?: string;
  Rules?: AwsWafWebAclRule[];
  WebAclId?: string;
}
export interface AwsRdsDbSnapshotDetails {
  DbSnapshotIdentifier?: string;
  DbInstanceIdentifier?: string;
  SnapshotCreateTime?: string;
  Engine?: string;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  InstanceCreateTime?: string;
  MasterUsername?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  SnapshotType?: string;
  Iops?: number;
  OptionGroupName?: string;
  PercentProgress?: number;
  SourceRegion?: string;
  SourceDbSnapshotIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  Timezone?: string;
  IamDatabaseAuthenticationEnabled?: boolean;
  ProcessorFeatures?: AwsRdsDbProcessorFeature[];
  DbiResourceId?: string;
}
export interface AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute {
  AttributeName?: string;
  AttributeValues?: string[];
}
export type AwsRdsDbClusterSnapshotDbClusterSnapshotAttributes =
  AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute[];
export interface AwsRdsDbClusterSnapshotDetails {
  AvailabilityZones?: string[];
  SnapshotCreateTime?: string;
  Engine?: string;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  VpcId?: string;
  ClusterCreateTime?: string;
  MasterUsername?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  SnapshotType?: string;
  PercentProgress?: number;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbClusterIdentifier?: string;
  DbClusterSnapshotIdentifier?: string;
  IamDatabaseAuthenticationEnabled?: boolean;
  DbClusterSnapshotAttributes?: AwsRdsDbClusterSnapshotDbClusterSnapshotAttribute[];
}
export interface AwsRdsDbClusterAssociatedRole {
  RoleArn?: string;
  Status?: string;
}
export type AwsRdsDbClusterAssociatedRoles = AwsRdsDbClusterAssociatedRole[];
export interface AwsRdsDbClusterOptionGroupMembership {
  DbClusterOptionGroupName?: string;
  Status?: string;
}
export type AwsRdsDbClusterOptionGroupMemberships =
  AwsRdsDbClusterOptionGroupMembership[];
export interface AwsRdsDbClusterMember {
  IsClusterWriter?: boolean;
  PromotionTier?: number;
  DbInstanceIdentifier?: string;
  DbClusterParameterGroupStatus?: string;
}
export type AwsRdsDbClusterMembers = AwsRdsDbClusterMember[];
export interface AwsRdsDbClusterDetails {
  AllocatedStorage?: number;
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  DatabaseName?: string;
  Status?: string;
  Endpoint?: string;
  ReaderEndpoint?: string;
  CustomEndpoints?: string[];
  MultiAz?: boolean;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  MasterUsername?: string;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  ReadReplicaIdentifiers?: string[];
  VpcSecurityGroups?: AwsRdsDbInstanceVpcSecurityGroup[];
  HostedZoneId?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbClusterResourceId?: string;
  AssociatedRoles?: AwsRdsDbClusterAssociatedRole[];
  ClusterCreateTime?: string;
  EnabledCloudWatchLogsExports?: string[];
  EngineMode?: string;
  DeletionProtection?: boolean;
  HttpEndpointEnabled?: boolean;
  ActivityStreamStatus?: string;
  CopyTagsToSnapshot?: boolean;
  CrossAccountClone?: boolean;
  DomainMemberships?: AwsRdsDbDomainMembership[];
  DbClusterParameterGroup?: string;
  DbSubnetGroup?: string;
  DbClusterOptionGroupMemberships?: AwsRdsDbClusterOptionGroupMembership[];
  DbClusterIdentifier?: string;
  DbClusterMembers?: AwsRdsDbClusterMember[];
  IamDatabaseAuthenticationEnabled?: boolean;
  AutoMinorVersionUpgrade?: boolean;
}
export interface AwsEcsClusterClusterSettingsDetails {
  Name?: string;
  Value?: string;
}
export type AwsEcsClusterClusterSettingsList =
  AwsEcsClusterClusterSettingsDetails[];
export interface AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails {
  CloudWatchEncryptionEnabled?: boolean;
  CloudWatchLogGroupName?: string;
  S3BucketName?: string;
  S3EncryptionEnabled?: boolean;
  S3KeyPrefix?: string;
}
export interface AwsEcsClusterConfigurationExecuteCommandConfigurationDetails {
  KmsKeyId?: string;
  LogConfiguration?: AwsEcsClusterConfigurationExecuteCommandConfigurationLogConfigurationDetails;
  Logging?: string;
}
export interface AwsEcsClusterConfigurationDetails {
  ExecuteCommandConfiguration?: AwsEcsClusterConfigurationExecuteCommandConfigurationDetails;
}
export interface AwsEcsClusterDefaultCapacityProviderStrategyDetails {
  Base?: number;
  CapacityProvider?: string;
  Weight?: number;
}
export type AwsEcsClusterDefaultCapacityProviderStrategyList =
  AwsEcsClusterDefaultCapacityProviderStrategyDetails[];
export interface AwsEcsClusterDetails {
  ClusterArn?: string;
  ActiveServicesCount?: number;
  CapacityProviders?: string[];
  ClusterSettings?: AwsEcsClusterClusterSettingsDetails[];
  Configuration?: AwsEcsClusterConfigurationDetails;
  DefaultCapacityProviderStrategy?: AwsEcsClusterDefaultCapacityProviderStrategyDetails[];
  ClusterName?: string;
  RegisteredContainerInstancesCount?: number;
  RunningTasksCount?: number;
  Status?: string;
}
export interface AwsMountPoint {
  SourceVolume?: string;
  ContainerPath?: string;
}
export type AwsMountPointList = AwsMountPoint[];
export interface AwsEcsContainerDetails {
  Name?: string;
  Image?: string;
  MountPoints?: AwsMountPoint[];
  Privileged?: boolean;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails {
  Condition?: string;
  ContainerName?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsDependsOnList =
  AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails {
  Name?: string;
  Value?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsEnvironmentList =
  AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails {
  Type?: string;
  Value?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesList =
  AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails {
  Hostname?: string;
  IpAddress?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsExtraHostsList =
  AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails {
  Options?: { [key: string]: string | undefined };
  Type?: string;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails {
  Command?: string[];
  Interval?: number;
  Retries?: number;
  StartPeriod?: number;
  Timeout?: number;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails {
  Add?: string[];
  Drop?: string[];
}
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails {
  ContainerPath?: string;
  HostPath?: string;
  Permissions?: string[];
}
export type AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesList =
  AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails {
  ContainerPath?: string;
  MountOptions?: string[];
  Size?: number;
}
export type AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsList =
  AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails {
  Capabilities?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersCapabilitiesDetails;
  Devices?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDevicesDetails[];
  InitProcessEnabled?: boolean;
  MaxSwap?: number;
  SharedMemorySize?: number;
  Swappiness?: number;
  Tmpfs?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersTmpfsDetails[];
}
export interface AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails {
  Name?: string;
  ValueFrom?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsList =
  AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails {
  LogDriver?: string;
  Options?: { [key: string]: string | undefined };
  SecretOptions?: AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationSecretOptionsDetails[];
}
export interface AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails {
  ContainerPath?: string;
  ReadOnly?: boolean;
  SourceVolume?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsMountPointsList =
  AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails {
  ContainerPort?: number;
  HostPort?: number;
  Protocol?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsPortMappingsList =
  AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails {
  CredentialsParameter?: string;
}
export interface AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails {
  Type?: string;
  Value?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsList =
  AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails {
  Name?: string;
  ValueFrom?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsSecretsList =
  AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails {
  Namespace?: string;
  Value?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsSystemControlsList =
  AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails {
  HardLimit?: number;
  Name?: string;
  SoftLimit?: number;
}
export type AwsEcsTaskDefinitionContainerDefinitionsUlimitsList =
  AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails {
  ReadOnly?: boolean;
  SourceContainer?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsVolumesFromList =
  AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails[];
export interface AwsEcsTaskDefinitionContainerDefinitionsDetails {
  Command?: string[];
  Cpu?: number;
  DependsOn?: AwsEcsTaskDefinitionContainerDefinitionsDependsOnDetails[];
  DisableNetworking?: boolean;
  DnsSearchDomains?: string[];
  DnsServers?: string[];
  DockerLabels?: { [key: string]: string | undefined };
  DockerSecurityOptions?: string[];
  EntryPoint?: string[];
  Environment?: AwsEcsTaskDefinitionContainerDefinitionsEnvironmentDetails[];
  EnvironmentFiles?: AwsEcsTaskDefinitionContainerDefinitionsEnvironmentFilesDetails[];
  Essential?: boolean;
  ExtraHosts?: AwsEcsTaskDefinitionContainerDefinitionsExtraHostsDetails[];
  FirelensConfiguration?: AwsEcsTaskDefinitionContainerDefinitionsFirelensConfigurationDetails;
  HealthCheck?: AwsEcsTaskDefinitionContainerDefinitionsHealthCheckDetails;
  Hostname?: string;
  Image?: string;
  Interactive?: boolean;
  Links?: string[];
  LinuxParameters?: AwsEcsTaskDefinitionContainerDefinitionsLinuxParametersDetails;
  LogConfiguration?: AwsEcsTaskDefinitionContainerDefinitionsLogConfigurationDetails;
  Memory?: number;
  MemoryReservation?: number;
  MountPoints?: AwsEcsTaskDefinitionContainerDefinitionsMountPointsDetails[];
  Name?: string;
  PortMappings?: AwsEcsTaskDefinitionContainerDefinitionsPortMappingsDetails[];
  Privileged?: boolean;
  PseudoTerminal?: boolean;
  ReadonlyRootFilesystem?: boolean;
  RepositoryCredentials?: AwsEcsTaskDefinitionContainerDefinitionsRepositoryCredentialsDetails;
  ResourceRequirements?: AwsEcsTaskDefinitionContainerDefinitionsResourceRequirementsDetails[];
  Secrets?: AwsEcsTaskDefinitionContainerDefinitionsSecretsDetails[];
  StartTimeout?: number;
  StopTimeout?: number;
  SystemControls?: AwsEcsTaskDefinitionContainerDefinitionsSystemControlsDetails[];
  Ulimits?: AwsEcsTaskDefinitionContainerDefinitionsUlimitsDetails[];
  User?: string;
  VolumesFrom?: AwsEcsTaskDefinitionContainerDefinitionsVolumesFromDetails[];
  WorkingDirectory?: string;
}
export type AwsEcsTaskDefinitionContainerDefinitionsList =
  AwsEcsTaskDefinitionContainerDefinitionsDetails[];
export interface AwsEcsTaskDefinitionInferenceAcceleratorsDetails {
  DeviceName?: string;
  DeviceType?: string;
}
export type AwsEcsTaskDefinitionInferenceAcceleratorsList =
  AwsEcsTaskDefinitionInferenceAcceleratorsDetails[];
export interface AwsEcsTaskDefinitionPlacementConstraintsDetails {
  Expression?: string;
  Type?: string;
}
export type AwsEcsTaskDefinitionPlacementConstraintsList =
  AwsEcsTaskDefinitionPlacementConstraintsDetails[];
export interface AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails {
  Name?: string;
  Value?: string;
}
export type AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesList =
  AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails[];
export interface AwsEcsTaskDefinitionProxyConfigurationDetails {
  ContainerName?: string;
  ProxyConfigurationProperties?: AwsEcsTaskDefinitionProxyConfigurationProxyConfigurationPropertiesDetails[];
  Type?: string;
}
export interface AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails {
  Autoprovision?: boolean;
  Driver?: string;
  DriverOpts?: { [key: string]: string | undefined };
  Labels?: { [key: string]: string | undefined };
  Scope?: string;
}
export interface AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails {
  AccessPointId?: string;
  Iam?: string;
}
export interface AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails {
  AuthorizationConfig?: AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationAuthorizationConfigDetails;
  FilesystemId?: string;
  RootDirectory?: string;
  TransitEncryption?: string;
  TransitEncryptionPort?: number;
}
export interface AwsEcsTaskDefinitionVolumesHostDetails {
  SourcePath?: string;
}
export interface AwsEcsTaskDefinitionVolumesDetails {
  DockerVolumeConfiguration?: AwsEcsTaskDefinitionVolumesDockerVolumeConfigurationDetails;
  EfsVolumeConfiguration?: AwsEcsTaskDefinitionVolumesEfsVolumeConfigurationDetails;
  Host?: AwsEcsTaskDefinitionVolumesHostDetails;
  Name?: string;
}
export type AwsEcsTaskDefinitionVolumesList =
  AwsEcsTaskDefinitionVolumesDetails[];
export interface AwsEcsTaskDefinitionDetails {
  ContainerDefinitions?: AwsEcsTaskDefinitionContainerDefinitionsDetails[];
  Cpu?: string;
  ExecutionRoleArn?: string;
  Family?: string;
  InferenceAccelerators?: AwsEcsTaskDefinitionInferenceAcceleratorsDetails[];
  IpcMode?: string;
  Memory?: string;
  NetworkMode?: string;
  PidMode?: string;
  PlacementConstraints?: AwsEcsTaskDefinitionPlacementConstraintsDetails[];
  ProxyConfiguration?: AwsEcsTaskDefinitionProxyConfigurationDetails;
  RequiresCompatibilities?: string[];
  TaskRoleArn?: string;
  Volumes?: AwsEcsTaskDefinitionVolumesDetails[];
  Status?: string;
}
export interface VolumeMount {
  Name?: string;
  MountPath?: string;
}
export type VolumeMountList = VolumeMount[];
export interface ContainerDetails {
  ContainerRuntime?: string;
  Name?: string;
  ImageId?: string;
  ImageName?: string;
  LaunchedAt?: string;
  VolumeMounts?: VolumeMount[];
  Privileged?: boolean;
}
export interface AwsRdsEventSubscriptionDetails {
  CustSubscriptionId?: string;
  CustomerAwsId?: string;
  Enabled?: boolean;
  EventCategoriesList?: string[];
  EventSubscriptionArn?: string;
  SnsTopicArn?: string;
  SourceIdsList?: string[];
  SourceType?: string;
  Status?: string;
  SubscriptionCreationTime?: string;
}
export interface AwsEcsServiceCapacityProviderStrategyDetails {
  Base?: number;
  CapacityProvider?: string;
  Weight?: number;
}
export type AwsEcsServiceCapacityProviderStrategyList =
  AwsEcsServiceCapacityProviderStrategyDetails[];
export interface AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails {
  Enable?: boolean;
  Rollback?: boolean;
}
export interface AwsEcsServiceDeploymentConfigurationDetails {
  DeploymentCircuitBreaker?: AwsEcsServiceDeploymentConfigurationDeploymentCircuitBreakerDetails;
  MaximumPercent?: number;
  MinimumHealthyPercent?: number;
}
export interface AwsEcsServiceDeploymentControllerDetails {
  Type?: string;
}
export interface AwsEcsServiceLoadBalancersDetails {
  ContainerName?: string;
  ContainerPort?: number;
  LoadBalancerName?: string;
  TargetGroupArn?: string;
}
export type AwsEcsServiceLoadBalancersList =
  AwsEcsServiceLoadBalancersDetails[];
export interface AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails {
  AssignPublicIp?: string;
  SecurityGroups?: string[];
  Subnets?: string[];
}
export interface AwsEcsServiceNetworkConfigurationDetails {
  AwsVpcConfiguration?: AwsEcsServiceNetworkConfigurationAwsVpcConfigurationDetails;
}
export interface AwsEcsServicePlacementConstraintsDetails {
  Expression?: string;
  Type?: string;
}
export type AwsEcsServicePlacementConstraintsList =
  AwsEcsServicePlacementConstraintsDetails[];
export interface AwsEcsServicePlacementStrategiesDetails {
  Field?: string;
  Type?: string;
}
export type AwsEcsServicePlacementStrategiesList =
  AwsEcsServicePlacementStrategiesDetails[];
export interface AwsEcsServiceServiceRegistriesDetails {
  ContainerName?: string;
  ContainerPort?: number;
  Port?: number;
  RegistryArn?: string;
}
export type AwsEcsServiceServiceRegistriesList =
  AwsEcsServiceServiceRegistriesDetails[];
export interface AwsEcsServiceDetails {
  CapacityProviderStrategy?: AwsEcsServiceCapacityProviderStrategyDetails[];
  Cluster?: string;
  DeploymentConfiguration?: AwsEcsServiceDeploymentConfigurationDetails;
  DeploymentController?: AwsEcsServiceDeploymentControllerDetails;
  DesiredCount?: number;
  EnableEcsManagedTags?: boolean;
  EnableExecuteCommand?: boolean;
  HealthCheckGracePeriodSeconds?: number;
  LaunchType?: string;
  LoadBalancers?: AwsEcsServiceLoadBalancersDetails[];
  Name?: string;
  NetworkConfiguration?: AwsEcsServiceNetworkConfigurationDetails;
  PlacementConstraints?: AwsEcsServicePlacementConstraintsDetails[];
  PlacementStrategies?: AwsEcsServicePlacementStrategiesDetails[];
  PlatformVersion?: string;
  PropagateTags?: string;
  Role?: string;
  SchedulingStrategy?: string;
  ServiceArn?: string;
  ServiceName?: string;
  ServiceRegistries?: AwsEcsServiceServiceRegistriesDetails[];
  TaskDefinition?: string;
}
export interface AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails {
  DeleteOnTermination?: boolean;
  Encrypted?: boolean;
  Iops?: number;
  SnapshotId?: string;
  VolumeSize?: number;
  VolumeType?: string;
}
export interface AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails {
  DeviceName?: string;
  Ebs?: AwsAutoScalingLaunchConfigurationBlockDeviceMappingsEbsDetails;
  NoDevice?: boolean;
  VirtualName?: string;
}
export type AwsAutoScalingLaunchConfigurationBlockDeviceMappingsList =
  AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails[];
export interface AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails {
  Enabled?: boolean;
}
export interface AwsAutoScalingLaunchConfigurationMetadataOptions {
  HttpEndpoint?: string;
  HttpPutResponseHopLimit?: number;
  HttpTokens?: string;
}
export interface AwsAutoScalingLaunchConfigurationDetails {
  AssociatePublicIpAddress?: boolean;
  BlockDeviceMappings?: AwsAutoScalingLaunchConfigurationBlockDeviceMappingsDetails[];
  ClassicLinkVpcId?: string;
  ClassicLinkVpcSecurityGroups?: string[];
  CreatedTime?: string;
  EbsOptimized?: boolean;
  IamInstanceProfile?: string;
  ImageId?: string;
  InstanceMonitoring?: AwsAutoScalingLaunchConfigurationInstanceMonitoringDetails;
  InstanceType?: string;
  KernelId?: string;
  KeyName?: string;
  LaunchConfigurationName?: string;
  PlacementTenancy?: string;
  RamdiskId?: string;
  SecurityGroups?: string[];
  SpotPrice?: string;
  UserData?: string;
  MetadataOptions?: AwsAutoScalingLaunchConfigurationMetadataOptions;
}
export interface AwsEc2VpnConnectionVgwTelemetryDetails {
  AcceptedRouteCount?: number;
  CertificateArn?: string;
  LastStatusChange?: string;
  OutsideIpAddress?: string;
  Status?: string;
  StatusMessage?: string;
}
export type AwsEc2VpnConnectionVgwTelemetryList =
  AwsEc2VpnConnectionVgwTelemetryDetails[];
export interface AwsEc2VpnConnectionOptionsTunnelOptionsDetails {
  DpdTimeoutSeconds?: number;
  IkeVersions?: string[];
  OutsideIpAddress?: string;
  Phase1DhGroupNumbers?: number[];
  Phase1EncryptionAlgorithms?: string[];
  Phase1IntegrityAlgorithms?: string[];
  Phase1LifetimeSeconds?: number;
  Phase2DhGroupNumbers?: number[];
  Phase2EncryptionAlgorithms?: string[];
  Phase2IntegrityAlgorithms?: string[];
  Phase2LifetimeSeconds?: number;
  PreSharedKey?: string;
  RekeyFuzzPercentage?: number;
  RekeyMarginTimeSeconds?: number;
  ReplayWindowSize?: number;
  TunnelInsideCidr?: string;
}
export type AwsEc2VpnConnectionOptionsTunnelOptionsList =
  AwsEc2VpnConnectionOptionsTunnelOptionsDetails[];
export interface AwsEc2VpnConnectionOptionsDetails {
  StaticRoutesOnly?: boolean;
  TunnelOptions?: AwsEc2VpnConnectionOptionsTunnelOptionsDetails[];
}
export interface AwsEc2VpnConnectionRoutesDetails {
  DestinationCidrBlock?: string;
  State?: string;
}
export type AwsEc2VpnConnectionRoutesList = AwsEc2VpnConnectionRoutesDetails[];
export interface AwsEc2VpnConnectionDetails {
  VpnConnectionId?: string;
  State?: string;
  CustomerGatewayId?: string;
  CustomerGatewayConfiguration?: string;
  Type?: string;
  VpnGatewayId?: string;
  Category?: string;
  VgwTelemetry?: AwsEc2VpnConnectionVgwTelemetryDetails[];
  Options?: AwsEc2VpnConnectionOptionsDetails;
  Routes?: AwsEc2VpnConnectionRoutesDetails[];
  TransitGatewayId?: string;
}
export interface AwsEcrContainerImageDetails {
  RegistryId?: string;
  RepositoryName?: string;
  Architecture?: string;
  ImageDigest?: string;
  ImageTags?: string[];
  ImagePublishedAt?: string;
}
export interface AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails {
  Enabled?: boolean;
  KmsKeyId?: string;
}
export interface AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails {
  Enabled?: boolean;
}
export interface AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails {
  AutomatedUpdateDate?: string;
  Cancellable?: boolean;
  CurrentVersion?: string;
  Description?: string;
  NewVersion?: string;
  UpdateAvailable?: boolean;
  UpdateStatus?: string;
  OptionalDeployment?: boolean;
}
export interface AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails {
  AvailabilityZoneCount?: number;
}
export interface AwsOpenSearchServiceDomainClusterConfigDetails {
  InstanceCount?: number;
  WarmEnabled?: boolean;
  WarmCount?: number;
  DedicatedMasterEnabled?: boolean;
  ZoneAwarenessConfig?: AwsOpenSearchServiceDomainClusterConfigZoneAwarenessConfigDetails;
  DedicatedMasterCount?: number;
  InstanceType?: string;
  WarmType?: string;
  ZoneAwarenessEnabled?: boolean;
  DedicatedMasterType?: string;
}
export interface AwsOpenSearchServiceDomainDomainEndpointOptionsDetails {
  CustomEndpointCertificateArn?: string;
  CustomEndpointEnabled?: boolean;
  EnforceHTTPS?: boolean;
  CustomEndpoint?: string;
  TLSSecurityPolicy?: string;
}
export interface AwsOpenSearchServiceDomainVpcOptionsDetails {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export interface AwsOpenSearchServiceDomainLogPublishingOption {
  CloudWatchLogsLogGroupArn?: string;
  Enabled?: boolean;
}
export interface AwsOpenSearchServiceDomainLogPublishingOptionsDetails {
  IndexSlowLogs?: AwsOpenSearchServiceDomainLogPublishingOption;
  SearchSlowLogs?: AwsOpenSearchServiceDomainLogPublishingOption;
  AuditLogs?: AwsOpenSearchServiceDomainLogPublishingOption;
}
export interface AwsOpenSearchServiceDomainMasterUserOptionsDetails {
  MasterUserArn?: string;
  MasterUserName?: string;
  MasterUserPassword?: string;
}
export interface AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  MasterUserOptions?: AwsOpenSearchServiceDomainMasterUserOptionsDetails;
}
export interface AwsOpenSearchServiceDomainDetails {
  Arn?: string;
  AccessPolicies?: string;
  DomainName?: string;
  Id?: string;
  DomainEndpoint?: string;
  EngineVersion?: string;
  EncryptionAtRestOptions?: AwsOpenSearchServiceDomainEncryptionAtRestOptionsDetails;
  NodeToNodeEncryptionOptions?: AwsOpenSearchServiceDomainNodeToNodeEncryptionOptionsDetails;
  ServiceSoftwareOptions?: AwsOpenSearchServiceDomainServiceSoftwareOptionsDetails;
  ClusterConfig?: AwsOpenSearchServiceDomainClusterConfigDetails;
  DomainEndpointOptions?: AwsOpenSearchServiceDomainDomainEndpointOptionsDetails;
  VpcOptions?: AwsOpenSearchServiceDomainVpcOptionsDetails;
  LogPublishingOptions?: AwsOpenSearchServiceDomainLogPublishingOptionsDetails;
  DomainEndpoints?: { [key: string]: string | undefined };
  AdvancedSecurityOptions?: AwsOpenSearchServiceDomainAdvancedSecurityOptionsDetails;
}
export interface AwsEc2VpcEndpointServiceServiceTypeDetails {
  ServiceType?: string;
}
export type AwsEc2VpcEndpointServiceServiceTypeList =
  AwsEc2VpcEndpointServiceServiceTypeDetails[];
export interface AwsEc2VpcEndpointServiceDetails {
  AcceptanceRequired?: boolean;
  AvailabilityZones?: string[];
  BaseEndpointDnsNames?: string[];
  ManagesVpcEndpoints?: boolean;
  GatewayLoadBalancerArns?: string[];
  NetworkLoadBalancerArns?: string[];
  PrivateDnsName?: string;
  ServiceId?: string;
  ServiceName?: string;
  ServiceState?: string;
  ServiceType?: AwsEc2VpcEndpointServiceServiceTypeDetails[];
}
export interface AwsXrayEncryptionConfigDetails {
  KeyId?: string;
  Status?: string;
  Type?: string;
}
export interface AwsWafRateBasedRuleMatchPredicate {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export type AwsWafRateBasedRuleMatchPredicateList =
  AwsWafRateBasedRuleMatchPredicate[];
export interface AwsWafRateBasedRuleDetails {
  MetricName?: string;
  Name?: string;
  RateKey?: string;
  RateLimit?: number;
  RuleId?: string;
  MatchPredicates?: AwsWafRateBasedRuleMatchPredicate[];
}
export interface AwsWafRegionalRateBasedRuleMatchPredicate {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export type AwsWafRegionalRateBasedRuleMatchPredicateList =
  AwsWafRegionalRateBasedRuleMatchPredicate[];
export interface AwsWafRegionalRateBasedRuleDetails {
  MetricName?: string;
  Name?: string;
  RateKey?: string;
  RateLimit?: number;
  RuleId?: string;
  MatchPredicates?: AwsWafRegionalRateBasedRuleMatchPredicate[];
}
export interface AwsEcrRepositoryImageScanningConfigurationDetails {
  ScanOnPush?: boolean;
}
export interface AwsEcrRepositoryLifecyclePolicyDetails {
  LifecyclePolicyText?: string;
  RegistryId?: string;
}
export interface AwsEcrRepositoryDetails {
  Arn?: string;
  ImageScanningConfiguration?: AwsEcrRepositoryImageScanningConfigurationDetails;
  ImageTagMutability?: string;
  LifecyclePolicy?: AwsEcrRepositoryLifecyclePolicyDetails;
  RepositoryName?: string;
  RepositoryPolicyText?: string;
}
export interface AwsEksClusterResourcesVpcConfigDetails {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  EndpointPublicAccess?: boolean;
}
export interface AwsEksClusterLoggingClusterLoggingDetails {
  Enabled?: boolean;
  Types?: string[];
}
export type AwsEksClusterLoggingClusterLoggingList =
  AwsEksClusterLoggingClusterLoggingDetails[];
export interface AwsEksClusterLoggingDetails {
  ClusterLogging?: AwsEksClusterLoggingClusterLoggingDetails[];
}
export interface AwsEksClusterDetails {
  Arn?: string;
  CertificateAuthorityData?: string;
  ClusterStatus?: string;
  Endpoint?: string;
  Name?: string;
  ResourcesVpcConfig?: AwsEksClusterResourcesVpcConfigDetails;
  RoleArn?: string;
  Version?: string;
  Logging?: AwsEksClusterLoggingDetails;
}
export interface FirewallPolicyStatefulRuleGroupReferencesDetails {
  ResourceArn?: string;
}
export type FirewallPolicyStatefulRuleGroupReferencesList =
  FirewallPolicyStatefulRuleGroupReferencesDetails[];
export interface StatelessCustomPublishMetricActionDimension {
  Value?: string;
}
export type StatelessCustomPublishMetricActionDimensionsList =
  StatelessCustomPublishMetricActionDimension[];
export interface StatelessCustomPublishMetricAction {
  Dimensions?: StatelessCustomPublishMetricActionDimension[];
}
export interface StatelessCustomActionDefinition {
  PublishMetricAction?: StatelessCustomPublishMetricAction;
}
export interface FirewallPolicyStatelessCustomActionsDetails {
  ActionDefinition?: StatelessCustomActionDefinition;
  ActionName?: string;
}
export type FirewallPolicyStatelessCustomActionsList =
  FirewallPolicyStatelessCustomActionsDetails[];
export interface FirewallPolicyStatelessRuleGroupReferencesDetails {
  Priority?: number;
  ResourceArn?: string;
}
export type FirewallPolicyStatelessRuleGroupReferencesList =
  FirewallPolicyStatelessRuleGroupReferencesDetails[];
export interface FirewallPolicyDetails {
  StatefulRuleGroupReferences?: FirewallPolicyStatefulRuleGroupReferencesDetails[];
  StatelessCustomActions?: FirewallPolicyStatelessCustomActionsDetails[];
  StatelessDefaultActions?: string[];
  StatelessFragmentDefaultActions?: string[];
  StatelessRuleGroupReferences?: FirewallPolicyStatelessRuleGroupReferencesDetails[];
}
export interface AwsNetworkFirewallFirewallPolicyDetails {
  FirewallPolicy?: FirewallPolicyDetails;
  FirewallPolicyArn?: string;
  FirewallPolicyId?: string;
  FirewallPolicyName?: string;
  Description?: string;
}
export interface AwsNetworkFirewallFirewallSubnetMappingsDetails {
  SubnetId?: string;
}
export type AwsNetworkFirewallFirewallSubnetMappingsList =
  AwsNetworkFirewallFirewallSubnetMappingsDetails[];
export interface AwsNetworkFirewallFirewallDetails {
  DeleteProtection?: boolean;
  Description?: string;
  FirewallArn?: string;
  FirewallId?: string;
  FirewallName?: string;
  FirewallPolicyArn?: string;
  FirewallPolicyChangeProtection?: boolean;
  SubnetChangeProtection?: boolean;
  SubnetMappings?: AwsNetworkFirewallFirewallSubnetMappingsDetails[];
  VpcId?: string;
}
export interface RuleGroupVariablesIpSetsDetails {
  Definition?: string[];
}
export interface RuleGroupVariablesPortSetsDetails {
  Definition?: string[];
}
export interface RuleGroupVariables {
  IpSets?: RuleGroupVariablesIpSetsDetails;
  PortSets?: RuleGroupVariablesPortSetsDetails;
}
export interface RuleGroupSourceListDetails {
  GeneratedRulesType?: string;
  TargetTypes?: string[];
  Targets?: string[];
}
export interface RuleGroupSourceStatefulRulesHeaderDetails {
  Destination?: string;
  DestinationPort?: string;
  Direction?: string;
  Protocol?: string;
  Source?: string;
  SourcePort?: string;
}
export type RuleGroupSourceStatefulRulesRuleOptionsSettingsList = string[];
export interface RuleGroupSourceStatefulRulesOptionsDetails {
  Keyword?: string;
  Settings?: string[];
}
export type RuleGroupSourceStatefulRulesOptionsList =
  RuleGroupSourceStatefulRulesOptionsDetails[];
export interface RuleGroupSourceStatefulRulesDetails {
  Action?: string;
  Header?: RuleGroupSourceStatefulRulesHeaderDetails;
  RuleOptions?: RuleGroupSourceStatefulRulesOptionsDetails[];
}
export type RuleGroupSourceStatefulRulesList =
  RuleGroupSourceStatefulRulesDetails[];
export interface RuleGroupSourceCustomActionsDetails {
  ActionDefinition?: StatelessCustomActionDefinition;
  ActionName?: string;
}
export type RuleGroupSourceCustomActionsList =
  RuleGroupSourceCustomActionsDetails[];
export interface RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts {
  FromPort?: number;
  ToPort?: number;
}
export type RuleGroupSourceStatelessRuleMatchAttributesDestinationPortsList =
  RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts[];
export interface RuleGroupSourceStatelessRuleMatchAttributesDestinations {
  AddressDefinition?: string;
}
export type RuleGroupSourceStatelessRuleMatchAttributesDestinationsList =
  RuleGroupSourceStatelessRuleMatchAttributesDestinations[];
export type RuleGroupSourceStatelessRuleMatchAttributesProtocolsList = number[];
export interface RuleGroupSourceStatelessRuleMatchAttributesSourcePorts {
  FromPort?: number;
  ToPort?: number;
}
export type RuleGroupSourceStatelessRuleMatchAttributesSourcePortsList =
  RuleGroupSourceStatelessRuleMatchAttributesSourcePorts[];
export interface RuleGroupSourceStatelessRuleMatchAttributesSources {
  AddressDefinition?: string;
}
export type RuleGroupSourceStatelessRuleMatchAttributesSourcesList =
  RuleGroupSourceStatelessRuleMatchAttributesSources[];
export interface RuleGroupSourceStatelessRuleMatchAttributesTcpFlags {
  Flags?: string[];
  Masks?: string[];
}
export type RuleGroupSourceStatelessRuleMatchAttributesTcpFlagsList =
  RuleGroupSourceStatelessRuleMatchAttributesTcpFlags[];
export interface RuleGroupSourceStatelessRuleMatchAttributes {
  DestinationPorts?: RuleGroupSourceStatelessRuleMatchAttributesDestinationPorts[];
  Destinations?: RuleGroupSourceStatelessRuleMatchAttributesDestinations[];
  Protocols?: number[];
  SourcePorts?: RuleGroupSourceStatelessRuleMatchAttributesSourcePorts[];
  Sources?: RuleGroupSourceStatelessRuleMatchAttributesSources[];
  TcpFlags?: RuleGroupSourceStatelessRuleMatchAttributesTcpFlags[];
}
export interface RuleGroupSourceStatelessRuleDefinition {
  Actions?: string[];
  MatchAttributes?: RuleGroupSourceStatelessRuleMatchAttributes;
}
export interface RuleGroupSourceStatelessRulesDetails {
  Priority?: number;
  RuleDefinition?: RuleGroupSourceStatelessRuleDefinition;
}
export type RuleGroupSourceStatelessRulesList =
  RuleGroupSourceStatelessRulesDetails[];
export interface RuleGroupSourceStatelessRulesAndCustomActionsDetails {
  CustomActions?: RuleGroupSourceCustomActionsDetails[];
  StatelessRules?: RuleGroupSourceStatelessRulesDetails[];
}
export interface RuleGroupSource {
  RulesSourceList?: RuleGroupSourceListDetails;
  RulesString?: string;
  StatefulRules?: RuleGroupSourceStatefulRulesDetails[];
  StatelessRulesAndCustomActions?: RuleGroupSourceStatelessRulesAndCustomActionsDetails;
}
export interface RuleGroupDetails {
  RuleVariables?: RuleGroupVariables;
  RulesSource?: RuleGroupSource;
}
export interface AwsNetworkFirewallRuleGroupDetails {
  Capacity?: number;
  Description?: string;
  RuleGroup?: RuleGroupDetails;
  RuleGroupArn?: string;
  RuleGroupId?: string;
  RuleGroupName?: string;
  Type?: string;
}
export interface AwsRdsDbSecurityGroupEc2SecurityGroup {
  Ec2SecurityGroupId?: string;
  Ec2SecurityGroupName?: string;
  Ec2SecurityGroupOwnerId?: string;
  Status?: string;
}
export type AwsRdsDbSecurityGroupEc2SecurityGroups =
  AwsRdsDbSecurityGroupEc2SecurityGroup[];
export interface AwsRdsDbSecurityGroupIpRange {
  CidrIp?: string;
  Status?: string;
}
export type AwsRdsDbSecurityGroupIpRanges = AwsRdsDbSecurityGroupIpRange[];
export interface AwsRdsDbSecurityGroupDetails {
  DbSecurityGroupArn?: string;
  DbSecurityGroupDescription?: string;
  DbSecurityGroupName?: string;
  Ec2SecurityGroups?: AwsRdsDbSecurityGroupEc2SecurityGroup[];
  IpRanges?: AwsRdsDbSecurityGroupIpRange[];
  OwnerId?: string;
  VpcId?: string;
}
export interface AwsKinesisStreamStreamEncryptionDetails {
  EncryptionType?: string;
  KeyId?: string;
}
export interface AwsKinesisStreamDetails {
  Name?: string;
  Arn?: string;
  StreamEncryption?: AwsKinesisStreamStreamEncryptionDetails;
  ShardCount?: number;
  RetentionPeriodHours?: number;
}
export interface AwsEc2TransitGatewayDetails {
  Id?: string;
  Description?: string;
  DefaultRouteTablePropagation?: string;
  AutoAcceptSharedAttachments?: string;
  DefaultRouteTableAssociation?: string;
  TransitGatewayCidrBlocks?: string[];
  AssociationDefaultRouteTableId?: string;
  PropagationDefaultRouteTableId?: string;
  VpnEcmpSupport?: string;
  DnsSupport?: string;
  MulticastSupport?: string;
  AmazonSideAsn?: number;
}
export interface AwsEfsAccessPointPosixUserDetails {
  Gid?: string;
  SecondaryGids?: string[];
  Uid?: string;
}
export interface AwsEfsAccessPointRootDirectoryCreationInfoDetails {
  OwnerGid?: string;
  OwnerUid?: string;
  Permissions?: string;
}
export interface AwsEfsAccessPointRootDirectoryDetails {
  CreationInfo?: AwsEfsAccessPointRootDirectoryCreationInfoDetails;
  Path?: string;
}
export interface AwsEfsAccessPointDetails {
  AccessPointId?: string;
  Arn?: string;
  ClientToken?: string;
  FileSystemId?: string;
  PosixUser?: AwsEfsAccessPointPosixUserDetails;
  RootDirectory?: AwsEfsAccessPointRootDirectoryDetails;
}
export interface AwsCloudFormationStackDriftInformationDetails {
  StackDriftStatus?: string;
}
export interface AwsCloudFormationStackOutputsDetails {
  Description?: string;
  OutputKey?: string;
  OutputValue?: string;
}
export type AwsCloudFormationStackOutputsList =
  AwsCloudFormationStackOutputsDetails[];
export interface AwsCloudFormationStackDetails {
  Capabilities?: string[];
  CreationTime?: string;
  Description?: string;
  DisableRollback?: boolean;
  DriftInformation?: AwsCloudFormationStackDriftInformationDetails;
  EnableTerminationProtection?: boolean;
  LastUpdatedTime?: string;
  NotificationArns?: string[];
  Outputs?: AwsCloudFormationStackOutputsDetails[];
  RoleArn?: string;
  StackId?: string;
  StackName?: string;
  StackStatus?: string;
  StackStatusReason?: string;
  TimeoutInMinutes?: number;
}
export interface AwsCloudWatchAlarmDimensionsDetails {
  Name?: string;
  Value?: string;
}
export type AwsCloudWatchAlarmDimensionsList =
  AwsCloudWatchAlarmDimensionsDetails[];
export interface AwsCloudWatchAlarmDetails {
  ActionsEnabled?: boolean;
  AlarmActions?: string[];
  AlarmArn?: string;
  AlarmConfigurationUpdatedTimestamp?: string;
  AlarmDescription?: string;
  AlarmName?: string;
  ComparisonOperator?: string;
  DatapointsToAlarm?: number;
  Dimensions?: AwsCloudWatchAlarmDimensionsDetails[];
  EvaluateLowSampleCountPercentile?: string;
  EvaluationPeriods?: number;
  ExtendedStatistic?: string;
  InsufficientDataActions?: string[];
  MetricName?: string;
  Namespace?: string;
  OkActions?: string[];
  Period?: number;
  Statistic?: string;
  Threshold?: number;
  ThresholdMetricId?: string;
  TreatMissingData?: string;
  Unit?: string;
}
export interface VpcInfoCidrBlockSetDetails {
  CidrBlock?: string;
}
export type VpcInfoCidrBlockSetList = VpcInfoCidrBlockSetDetails[];
export interface VpcInfoIpv6CidrBlockSetDetails {
  Ipv6CidrBlock?: string;
}
export type VpcInfoIpv6CidrBlockSetList = VpcInfoIpv6CidrBlockSetDetails[];
export interface VpcInfoPeeringOptionsDetails {
  AllowDnsResolutionFromRemoteVpc?: boolean;
  AllowEgressFromLocalClassicLinkToRemoteVpc?: boolean;
  AllowEgressFromLocalVpcToRemoteClassicLink?: boolean;
}
export interface AwsEc2VpcPeeringConnectionVpcInfoDetails {
  CidrBlock?: string;
  CidrBlockSet?: VpcInfoCidrBlockSetDetails[];
  Ipv6CidrBlockSet?: VpcInfoIpv6CidrBlockSetDetails[];
  OwnerId?: string;
  PeeringOptions?: VpcInfoPeeringOptionsDetails;
  Region?: string;
  VpcId?: string;
}
export interface AwsEc2VpcPeeringConnectionStatusDetails {
  Code?: string;
  Message?: string;
}
export interface AwsEc2VpcPeeringConnectionDetails {
  AccepterVpcInfo?: AwsEc2VpcPeeringConnectionVpcInfoDetails;
  ExpirationTime?: string;
  RequesterVpcInfo?: AwsEc2VpcPeeringConnectionVpcInfoDetails;
  Status?: AwsEc2VpcPeeringConnectionStatusDetails;
  VpcPeeringConnectionId?: string;
}
export interface AwsWafRegionalRuleGroupRulesActionDetails {
  Type?: string;
}
export interface AwsWafRegionalRuleGroupRulesDetails {
  Action?: AwsWafRegionalRuleGroupRulesActionDetails;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export type AwsWafRegionalRuleGroupRulesList =
  AwsWafRegionalRuleGroupRulesDetails[];
export interface AwsWafRegionalRuleGroupDetails {
  MetricName?: string;
  Name?: string;
  RuleGroupId?: string;
  Rules?: AwsWafRegionalRuleGroupRulesDetails[];
}
export interface AwsWafRegionalRulePredicateListDetails {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export type AwsWafRegionalRulePredicateList =
  AwsWafRegionalRulePredicateListDetails[];
export interface AwsWafRegionalRuleDetails {
  MetricName?: string;
  Name?: string;
  PredicateList?: AwsWafRegionalRulePredicateListDetails[];
  RuleId?: string;
}
export interface AwsWafRegionalWebAclRulesListActionDetails {
  Type?: string;
}
export interface AwsWafRegionalWebAclRulesListOverrideActionDetails {
  Type?: string;
}
export interface AwsWafRegionalWebAclRulesListDetails {
  Action?: AwsWafRegionalWebAclRulesListActionDetails;
  OverrideAction?: AwsWafRegionalWebAclRulesListOverrideActionDetails;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export type AwsWafRegionalWebAclRulesList =
  AwsWafRegionalWebAclRulesListDetails[];
export interface AwsWafRegionalWebAclDetails {
  DefaultAction?: string;
  MetricName?: string;
  Name?: string;
  RulesList?: AwsWafRegionalWebAclRulesListDetails[];
  WebAclId?: string;
}
export interface AwsWafRulePredicateListDetails {
  DataId?: string;
  Negated?: boolean;
  Type?: string;
}
export type AwsWafRulePredicateList = AwsWafRulePredicateListDetails[];
export interface AwsWafRuleDetails {
  MetricName?: string;
  Name?: string;
  PredicateList?: AwsWafRulePredicateListDetails[];
  RuleId?: string;
}
export interface AwsWafRuleGroupRulesActionDetails {
  Type?: string;
}
export interface AwsWafRuleGroupRulesDetails {
  Action?: AwsWafRuleGroupRulesActionDetails;
  Priority?: number;
  RuleId?: string;
  Type?: string;
}
export type AwsWafRuleGroupRulesList = AwsWafRuleGroupRulesDetails[];
export interface AwsWafRuleGroupDetails {
  MetricName?: string;
  Name?: string;
  RuleGroupId?: string;
  Rules?: AwsWafRuleGroupRulesDetails[];
}
export interface AwsEcsTaskVolumeHostDetails {
  SourcePath?: string;
}
export interface AwsEcsTaskVolumeDetails {
  Name?: string;
  Host?: AwsEcsTaskVolumeHostDetails;
}
export type AwsEcsTaskVolumeDetailsList = AwsEcsTaskVolumeDetails[];
export type AwsEcsContainerDetailsList = AwsEcsContainerDetails[];
export interface AwsEcsTaskDetails {
  ClusterArn?: string;
  TaskDefinitionArn?: string;
  Version?: string;
  CreatedAt?: string;
  StartedAt?: string;
  StartedBy?: string;
  Group?: string;
  Volumes?: AwsEcsTaskVolumeDetails[];
  Containers?: AwsEcsContainerDetails[];
}
export interface AwsBackupBackupVaultNotificationsDetails {
  BackupVaultEvents?: string[];
  SnsTopicArn?: string;
}
export interface AwsBackupBackupVaultDetails {
  BackupVaultArn?: string;
  BackupVaultName?: string;
  EncryptionKeyArn?: string;
  Notifications?: AwsBackupBackupVaultNotificationsDetails;
  AccessPolicy?: string;
}
export interface AwsBackupBackupPlanAdvancedBackupSettingsDetails {
  BackupOptions?: { [key: string]: string | undefined };
  ResourceType?: string;
}
export type AwsBackupBackupPlanAdvancedBackupSettingsList =
  AwsBackupBackupPlanAdvancedBackupSettingsDetails[];
export interface AwsBackupBackupPlanLifecycleDetails {
  DeleteAfterDays?: number;
  MoveToColdStorageAfterDays?: number;
}
export interface AwsBackupBackupPlanRuleCopyActionsDetails {
  DestinationBackupVaultArn?: string;
  Lifecycle?: AwsBackupBackupPlanLifecycleDetails;
}
export type AwsBackupBackupPlanRuleCopyActionsList =
  AwsBackupBackupPlanRuleCopyActionsDetails[];
export interface AwsBackupBackupPlanRuleDetails {
  TargetBackupVault?: string;
  StartWindowMinutes?: number;
  ScheduleExpression?: string;
  RuleName?: string;
  RuleId?: string;
  EnableContinuousBackup?: boolean;
  CompletionWindowMinutes?: number;
  CopyActions?: AwsBackupBackupPlanRuleCopyActionsDetails[];
  Lifecycle?: AwsBackupBackupPlanLifecycleDetails;
}
export type AwsBackupBackupPlanRuleList = AwsBackupBackupPlanRuleDetails[];
export interface AwsBackupBackupPlanBackupPlanDetails {
  BackupPlanName?: string;
  AdvancedBackupSettings?: AwsBackupBackupPlanAdvancedBackupSettingsDetails[];
  BackupPlanRule?: AwsBackupBackupPlanRuleDetails[];
}
export interface AwsBackupBackupPlanDetails {
  BackupPlan?: AwsBackupBackupPlanBackupPlanDetails;
  BackupPlanArn?: string;
  BackupPlanId?: string;
  VersionId?: string;
}
export interface AwsBackupRecoveryPointCalculatedLifecycleDetails {
  DeleteAt?: string;
  MoveToColdStorageAt?: string;
}
export interface AwsBackupRecoveryPointCreatedByDetails {
  BackupPlanArn?: string;
  BackupPlanId?: string;
  BackupPlanVersion?: string;
  BackupRuleId?: string;
}
export interface AwsBackupRecoveryPointLifecycleDetails {
  DeleteAfterDays?: number;
  MoveToColdStorageAfterDays?: number;
}
export interface AwsBackupRecoveryPointDetails {
  BackupSizeInBytes?: number;
  BackupVaultArn?: string;
  BackupVaultName?: string;
  CalculatedLifecycle?: AwsBackupRecoveryPointCalculatedLifecycleDetails;
  CompletionDate?: string;
  CreatedBy?: AwsBackupRecoveryPointCreatedByDetails;
  CreationDate?: string;
  EncryptionKeyArn?: string;
  IamRoleArn?: string;
  IsEncrypted?: boolean;
  LastRestoreTime?: string;
  Lifecycle?: AwsBackupRecoveryPointLifecycleDetails;
  RecoveryPointArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  SourceBackupVaultArn?: string;
  Status?: string;
  StatusMessage?: string;
  StorageClass?: string;
}
export interface AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails {
  DeleteOnTermination?: boolean;
  Encrypted?: boolean;
  Iops?: number;
  KmsKeyId?: string;
  SnapshotId?: string;
  Throughput?: number;
  VolumeSize?: number;
  VolumeType?: string;
}
export interface AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails {
  DeviceName?: string;
  Ebs?: AwsEc2LaunchTemplateDataBlockDeviceMappingSetEbsDetails;
  NoDevice?: string;
  VirtualName?: string;
}
export type AwsEc2LaunchTemplateDataBlockDeviceMappingSetList =
  AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails[];
export interface AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails {
  CapacityReservationId?: string;
  CapacityReservationResourceGroupArn?: string;
}
export interface AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails {
  CapacityReservationPreference?: string;
  CapacityReservationTarget?: AwsEc2LaunchTemplateDataCapacityReservationSpecificationCapacityReservationTargetDetails;
}
export interface AwsEc2LaunchTemplateDataCpuOptionsDetails {
  CoreCount?: number;
  ThreadsPerCore?: number;
}
export interface AwsEc2LaunchTemplateDataCreditSpecificationDetails {
  CpuCredits?: string;
}
export interface AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails {
  Type?: string;
}
export type AwsEc2LaunchTemplateDataElasticGpuSpecificationSetList =
  AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails[];
export interface AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails {
  Count?: number;
  Type?: string;
}
export type AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetList =
  AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails[];
export interface AwsEc2LaunchTemplateDataEnclaveOptionsDetails {
  Enabled?: boolean;
}
export interface AwsEc2LaunchTemplateDataHibernationOptionsDetails {
  Configured?: boolean;
}
export interface AwsEc2LaunchTemplateDataIamInstanceProfileDetails {
  Arn?: string;
  Name?: string;
}
export interface AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails {
  BlockDurationMinutes?: number;
  InstanceInterruptionBehavior?: string;
  MaxPrice?: string;
  SpotInstanceType?: string;
  ValidUntil?: string;
}
export interface AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails {
  MarketType?: string;
  SpotOptions?: AwsEc2LaunchTemplateDataInstanceMarketOptionsSpotOptionsDetails;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails {
  Max?: number;
  Min?: number;
}
export interface AwsEc2LaunchTemplateDataInstanceRequirementsDetails {
  AcceleratorCount?: AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorCountDetails;
  AcceleratorManufacturers?: string[];
  AcceleratorNames?: string[];
  AcceleratorTotalMemoryMiB?: AwsEc2LaunchTemplateDataInstanceRequirementsAcceleratorTotalMemoryMiBDetails;
  AcceleratorTypes?: string[];
  BareMetal?: string;
  BaselineEbsBandwidthMbps?: AwsEc2LaunchTemplateDataInstanceRequirementsBaselineEbsBandwidthMbpsDetails;
  BurstablePerformance?: string;
  CpuManufacturers?: string[];
  ExcludedInstanceTypes?: string[];
  InstanceGenerations?: string[];
  LocalStorage?: string;
  LocalStorageTypes?: string[];
  MemoryGiBPerVCpu?: AwsEc2LaunchTemplateDataInstanceRequirementsMemoryGiBPerVCpuDetails;
  MemoryMiB?: AwsEc2LaunchTemplateDataInstanceRequirementsMemoryMiBDetails;
  NetworkInterfaceCount?: AwsEc2LaunchTemplateDataInstanceRequirementsNetworkInterfaceCountDetails;
  OnDemandMaxPricePercentageOverLowestPrice?: number;
  RequireHibernateSupport?: boolean;
  SpotMaxPricePercentageOverLowestPrice?: number;
  TotalLocalStorageGB?: AwsEc2LaunchTemplateDataInstanceRequirementsTotalLocalStorageGBDetails;
  VCpuCount?: AwsEc2LaunchTemplateDataInstanceRequirementsVCpuCountDetails;
}
export interface AwsEc2LaunchTemplateDataLicenseSetDetails {
  LicenseConfigurationArn?: string;
}
export type AwsEc2LaunchTemplateDataLicenseSetList =
  AwsEc2LaunchTemplateDataLicenseSetDetails[];
export interface AwsEc2LaunchTemplateDataMaintenanceOptionsDetails {
  AutoRecovery?: string;
}
export interface AwsEc2LaunchTemplateDataMetadataOptionsDetails {
  HttpEndpoint?: string;
  HttpProtocolIpv6?: string;
  HttpTokens?: string;
  HttpPutResponseHopLimit?: number;
  InstanceMetadataTags?: string;
}
export interface AwsEc2LaunchTemplateDataMonitoringDetails {
  Enabled?: boolean;
}
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails {
  Ipv4Prefix?: string;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails {
  Ipv6Address?: string;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails {
  Ipv6Prefix?: string;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails {
  Primary?: boolean;
  PrivateIpAddress?: string;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails[];
export interface AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails {
  AssociateCarrierIpAddress?: boolean;
  AssociatePublicIpAddress?: boolean;
  DeleteOnTermination?: boolean;
  Description?: string;
  DeviceIndex?: number;
  Groups?: string[];
  InterfaceType?: string;
  Ipv4PrefixCount?: number;
  Ipv4Prefixes?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv4PrefixesDetails[];
  Ipv6AddressCount?: number;
  Ipv6Addresses?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6AddressesDetails[];
  Ipv6PrefixCount?: number;
  Ipv6Prefixes?: AwsEc2LaunchTemplateDataNetworkInterfaceSetIpv6PrefixesDetails[];
  NetworkCardIndex?: number;
  NetworkInterfaceId?: string;
  PrivateIpAddress?: string;
  PrivateIpAddresses?: AwsEc2LaunchTemplateDataNetworkInterfaceSetPrivateIpAddressesDetails[];
  SecondaryPrivateIpAddressCount?: number;
  SubnetId?: string;
}
export type AwsEc2LaunchTemplateDataNetworkInterfaceSetList =
  AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails[];
export interface AwsEc2LaunchTemplateDataPlacementDetails {
  Affinity?: string;
  AvailabilityZone?: string;
  GroupName?: string;
  HostId?: string;
  HostResourceGroupArn?: string;
  PartitionNumber?: number;
  SpreadDomain?: string;
  Tenancy?: string;
}
export interface AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails {
  EnableResourceNameDnsAAAARecord?: boolean;
  EnableResourceNameDnsARecord?: boolean;
  HostnameType?: string;
}
export interface AwsEc2LaunchTemplateDataDetails {
  BlockDeviceMappingSet?: AwsEc2LaunchTemplateDataBlockDeviceMappingSetDetails[];
  CapacityReservationSpecification?: AwsEc2LaunchTemplateDataCapacityReservationSpecificationDetails;
  CpuOptions?: AwsEc2LaunchTemplateDataCpuOptionsDetails;
  CreditSpecification?: AwsEc2LaunchTemplateDataCreditSpecificationDetails;
  DisableApiStop?: boolean;
  DisableApiTermination?: boolean;
  EbsOptimized?: boolean;
  ElasticGpuSpecificationSet?: AwsEc2LaunchTemplateDataElasticGpuSpecificationSetDetails[];
  ElasticInferenceAcceleratorSet?: AwsEc2LaunchTemplateDataElasticInferenceAcceleratorSetDetails[];
  EnclaveOptions?: AwsEc2LaunchTemplateDataEnclaveOptionsDetails;
  HibernationOptions?: AwsEc2LaunchTemplateDataHibernationOptionsDetails;
  IamInstanceProfile?: AwsEc2LaunchTemplateDataIamInstanceProfileDetails;
  ImageId?: string;
  InstanceInitiatedShutdownBehavior?: string;
  InstanceMarketOptions?: AwsEc2LaunchTemplateDataInstanceMarketOptionsDetails;
  InstanceRequirements?: AwsEc2LaunchTemplateDataInstanceRequirementsDetails;
  InstanceType?: string;
  KernelId?: string;
  KeyName?: string;
  LicenseSet?: AwsEc2LaunchTemplateDataLicenseSetDetails[];
  MaintenanceOptions?: AwsEc2LaunchTemplateDataMaintenanceOptionsDetails;
  MetadataOptions?: AwsEc2LaunchTemplateDataMetadataOptionsDetails;
  Monitoring?: AwsEc2LaunchTemplateDataMonitoringDetails;
  NetworkInterfaceSet?: AwsEc2LaunchTemplateDataNetworkInterfaceSetDetails[];
  Placement?: AwsEc2LaunchTemplateDataPlacementDetails;
  PrivateDnsNameOptions?: AwsEc2LaunchTemplateDataPrivateDnsNameOptionsDetails;
  RamDiskId?: string;
  SecurityGroupIdSet?: string[];
  SecurityGroupSet?: string[];
  UserData?: string;
}
export interface AwsEc2LaunchTemplateDetails {
  LaunchTemplateName?: string;
  Id?: string;
  LaunchTemplateData?: AwsEc2LaunchTemplateDataDetails;
  DefaultVersionNumber?: number;
  LatestVersionNumber?: number;
}
export interface AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails {
  MinimumInstanceMetadataServiceVersion?: string;
}
export interface AwsSageMakerNotebookInstanceDetails {
  AcceleratorTypes?: string[];
  AdditionalCodeRepositories?: string[];
  DefaultCodeRepository?: string;
  DirectInternetAccess?: string;
  FailureReason?: string;
  InstanceMetadataServiceConfiguration?: AwsSageMakerNotebookInstanceMetadataServiceConfigurationDetails;
  InstanceType?: string;
  KmsKeyId?: string;
  NetworkInterfaceId?: string;
  NotebookInstanceArn?: string;
  NotebookInstanceLifecycleConfigName?: string;
  NotebookInstanceName?: string;
  NotebookInstanceStatus?: string;
  PlatformIdentifier?: string;
  RoleArn?: string;
  RootAccess?: string;
  SecurityGroups?: string[];
  SubnetId?: string;
  Url?: string;
  VolumeSizeInGB?: number;
}
export interface AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails {
  ImmunityTime?: number;
}
export interface AwsWafv2WebAclCaptchaConfigDetails {
  ImmunityTimeProperty?: AwsWafv2WebAclCaptchaConfigImmunityTimePropertyDetails;
}
export interface AwsWafv2CustomHttpHeader {
  Name?: string;
  Value?: string;
}
export type AwsWafv2InsertHeadersList = AwsWafv2CustomHttpHeader[];
export interface AwsWafv2CustomRequestHandlingDetails {
  InsertHeaders?: AwsWafv2CustomHttpHeader[];
}
export interface AwsWafv2ActionAllowDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails;
}
export interface AwsWafv2CustomResponseDetails {
  CustomResponseBodyKey?: string;
  ResponseCode?: number;
  ResponseHeaders?: AwsWafv2CustomHttpHeader[];
}
export interface AwsWafv2ActionBlockDetails {
  CustomResponse?: AwsWafv2CustomResponseDetails;
}
export interface AwsWafv2WebAclActionDetails {
  Allow?: AwsWafv2ActionAllowDetails;
  Block?: AwsWafv2ActionBlockDetails;
}
export interface AwsWafv2RulesActionCaptchaDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails;
}
export interface AwsWafv2RulesActionCountDetails {
  CustomRequestHandling?: AwsWafv2CustomRequestHandlingDetails;
}
export interface AwsWafv2RulesActionDetails {
  Allow?: AwsWafv2ActionAllowDetails;
  Block?: AwsWafv2ActionBlockDetails;
  Captcha?: AwsWafv2RulesActionCaptchaDetails;
  Count?: AwsWafv2RulesActionCountDetails;
}
export interface AwsWafv2VisibilityConfigDetails {
  CloudWatchMetricsEnabled?: boolean;
  MetricName?: string;
  SampledRequestsEnabled?: boolean;
}
export interface AwsWafv2RulesDetails {
  Action?: AwsWafv2RulesActionDetails;
  Name?: string;
  OverrideAction?: string;
  Priority?: number;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails;
}
export type AwsWafv2RulesList = AwsWafv2RulesDetails[];
export interface AwsWafv2WebAclDetails {
  Name?: string;
  Arn?: string;
  ManagedbyFirewallManager?: boolean;
  Id?: string;
  Capacity?: number;
  CaptchaConfig?: AwsWafv2WebAclCaptchaConfigDetails;
  DefaultAction?: AwsWafv2WebAclActionDetails;
  Description?: string;
  Rules?: AwsWafv2RulesDetails[];
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails;
}
export interface AwsWafv2RuleGroupDetails {
  Capacity?: number;
  Description?: string;
  Id?: string;
  Name?: string;
  Arn?: string;
  Rules?: AwsWafv2RulesDetails[];
  Scope?: string;
  VisibilityConfig?: AwsWafv2VisibilityConfigDetails;
}
export interface AssociationStateDetails {
  State?: string;
  StatusMessage?: string;
}
export interface AssociationSetDetails {
  AssociationState?: AssociationStateDetails;
  GatewayId?: string;
  Main?: boolean;
  RouteTableAssociationId?: string;
  RouteTableId?: string;
  SubnetId?: string;
}
export type AssociationSetList = AssociationSetDetails[];
export interface PropagatingVgwSetDetails {
  GatewayId?: string;
}
export type PropagatingVgwSetList = PropagatingVgwSetDetails[];
export interface RouteSetDetails {
  CarrierGatewayId?: string;
  CoreNetworkArn?: string;
  DestinationCidrBlock?: string;
  DestinationIpv6CidrBlock?: string;
  DestinationPrefixListId?: string;
  EgressOnlyInternetGatewayId?: string;
  GatewayId?: string;
  InstanceId?: string;
  InstanceOwnerId?: string;
  LocalGatewayId?: string;
  NatGatewayId?: string;
  NetworkInterfaceId?: string;
  Origin?: string;
  State?: string;
  TransitGatewayId?: string;
  VpcPeeringConnectionId?: string;
}
export type RouteSetList = RouteSetDetails[];
export interface AwsEc2RouteTableDetails {
  AssociationSet?: AssociationSetDetails[];
  OwnerId?: string;
  PropagatingVgwSet?: PropagatingVgwSetDetails[];
  RouteTableId?: string;
  RouteSet?: RouteSetDetails[];
  VpcId?: string;
}
export interface AwsAmazonMqBrokerEncryptionOptionsDetails {
  KmsKeyId?: string;
  UseAwsOwnedKey?: boolean;
}
export interface AwsAmazonMqBrokerLdapServerMetadataDetails {
  Hosts?: string[];
  RoleBase?: string;
  RoleName?: string;
  RoleSearchMatching?: string;
  RoleSearchSubtree?: boolean;
  ServiceAccountUsername?: string;
  UserBase?: string;
  UserRoleName?: string;
  UserSearchMatching?: string;
  UserSearchSubtree?: boolean;
}
export interface AwsAmazonMqBrokerLogsPendingDetails {
  Audit?: boolean;
  General?: boolean;
}
export interface AwsAmazonMqBrokerLogsDetails {
  Audit?: boolean;
  General?: boolean;
  AuditLogGroup?: string;
  GeneralLogGroup?: string;
  Pending?: AwsAmazonMqBrokerLogsPendingDetails;
}
export interface AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails {
  DayOfWeek?: string;
  TimeOfDay?: string;
  TimeZone?: string;
}
export interface AwsAmazonMqBrokerUsersDetails {
  PendingChange?: string;
  Username?: string;
}
export type AwsAmazonMqBrokerUsersList = AwsAmazonMqBrokerUsersDetails[];
export interface AwsAmazonMqBrokerDetails {
  AuthenticationStrategy?: string;
  AutoMinorVersionUpgrade?: boolean;
  BrokerArn?: string;
  BrokerName?: string;
  DeploymentMode?: string;
  EncryptionOptions?: AwsAmazonMqBrokerEncryptionOptionsDetails;
  EngineType?: string;
  EngineVersion?: string;
  HostInstanceType?: string;
  BrokerId?: string;
  LdapServerMetadata?: AwsAmazonMqBrokerLdapServerMetadataDetails;
  Logs?: AwsAmazonMqBrokerLogsDetails;
  MaintenanceWindowStartTime?: AwsAmazonMqBrokerMaintenanceWindowStartTimeDetails;
  PubliclyAccessible?: boolean;
  SecurityGroups?: string[];
  StorageType?: string;
  SubnetIds?: string[];
  Users?: AwsAmazonMqBrokerUsersDetails[];
}
export interface AwsAppSyncGraphQlApiOpenIdConnectConfigDetails {
  AuthTtL?: number;
  ClientId?: string;
  IatTtL?: number;
  Issuer?: string;
}
export interface AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails {
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerUri?: string;
  IdentityValidationExpression?: string;
}
export interface AwsAppSyncGraphQlApiUserPoolConfigDetails {
  AppIdClientRegex?: string;
  AwsRegion?: string;
  DefaultAction?: string;
  UserPoolId?: string;
}
export interface AwsAppSyncGraphQlApiLogConfigDetails {
  CloudWatchLogsRoleArn?: string;
  ExcludeVerboseContent?: boolean;
  FieldLogLevel?: string;
}
export interface AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails {
  AuthenticationType?: string;
  LambdaAuthorizerConfig?: AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails;
  OpenIdConnectConfig?: AwsAppSyncGraphQlApiOpenIdConnectConfigDetails;
  UserPoolConfig?: AwsAppSyncGraphQlApiUserPoolConfigDetails;
}
export type AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersList =
  AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails[];
export interface AwsAppSyncGraphQlApiDetails {
  ApiId?: string;
  Id?: string;
  OpenIdConnectConfig?: AwsAppSyncGraphQlApiOpenIdConnectConfigDetails;
  Name?: string;
  LambdaAuthorizerConfig?: AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails;
  XrayEnabled?: boolean;
  Arn?: string;
  UserPoolConfig?: AwsAppSyncGraphQlApiUserPoolConfigDetails;
  AuthenticationType?: string;
  LogConfig?: AwsAppSyncGraphQlApiLogConfigDetails;
  AdditionalAuthenticationProviders?: AwsAppSyncGraphQlApiAdditionalAuthenticationProvidersDetails[];
  WafWebAclArn?: string;
}
export interface AwsEventSchemasRegistryDetails {
  Description?: string;
  RegistryArn?: string;
  RegistryName?: string;
}
export interface AwsGuardDutyDetectorDataSourcesCloudTrailDetails {
  Status?: string;
}
export interface AwsGuardDutyDetectorDataSourcesDnsLogsDetails {
  Status?: string;
}
export interface AwsGuardDutyDetectorDataSourcesFlowLogsDetails {
  Status?: string;
}
export interface AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails {
  Status?: string;
}
export interface AwsGuardDutyDetectorDataSourcesKubernetesDetails {
  AuditLogs?: AwsGuardDutyDetectorDataSourcesKubernetesAuditLogsDetails;
}
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails {
  Reason?: string;
  Status?: string;
}
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails {
  EbsVolumes?: AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsEbsVolumesDetails;
}
export interface AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails {
  ScanEc2InstanceWithFindings?: AwsGuardDutyDetectorDataSourcesMalwareProtectionScanEc2InstanceWithFindingsDetails;
  ServiceRole?: string;
}
export interface AwsGuardDutyDetectorDataSourcesS3LogsDetails {
  Status?: string;
}
export interface AwsGuardDutyDetectorDataSourcesDetails {
  CloudTrail?: AwsGuardDutyDetectorDataSourcesCloudTrailDetails;
  DnsLogs?: AwsGuardDutyDetectorDataSourcesDnsLogsDetails;
  FlowLogs?: AwsGuardDutyDetectorDataSourcesFlowLogsDetails;
  Kubernetes?: AwsGuardDutyDetectorDataSourcesKubernetesDetails;
  MalwareProtection?: AwsGuardDutyDetectorDataSourcesMalwareProtectionDetails;
  S3Logs?: AwsGuardDutyDetectorDataSourcesS3LogsDetails;
}
export interface AwsGuardDutyDetectorFeaturesDetails {
  Name?: string;
  Status?: string;
}
export type AwsGuardDutyDetectorFeaturesList =
  AwsGuardDutyDetectorFeaturesDetails[];
export interface AwsGuardDutyDetectorDetails {
  DataSources?: AwsGuardDutyDetectorDataSourcesDetails;
  Features?: AwsGuardDutyDetectorFeaturesDetails[];
  FindingPublishingFrequency?: string;
  ServiceRole?: string;
  Status?: string;
}
export interface AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails {
  LogGroupArn?: string;
}
export interface AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails {
  CloudWatchLogsLogGroup?: AwsStepFunctionStateMachineLoggingConfigurationDestinationsCloudWatchLogsLogGroupDetails;
}
export type AwsStepFunctionStateMachineLoggingConfigurationDestinationsList =
  AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails[];
export interface AwsStepFunctionStateMachineLoggingConfigurationDetails {
  Destinations?: AwsStepFunctionStateMachineLoggingConfigurationDestinationsDetails[];
  IncludeExecutionData?: boolean;
  Level?: string;
}
export interface AwsStepFunctionStateMachineTracingConfigurationDetails {
  Enabled?: boolean;
}
export interface AwsStepFunctionStateMachineDetails {
  Label?: string;
  LoggingConfiguration?: AwsStepFunctionStateMachineLoggingConfigurationDetails;
  Name?: string;
  RoleArn?: string;
  StateMachineArn?: string;
  Status?: string;
  TracingConfiguration?: AwsStepFunctionStateMachineTracingConfigurationDetails;
  Type?: string;
}
export interface AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails {
  EncryptionOption?: string;
  KmsKey?: string;
}
export interface AwsAthenaWorkGroupConfigurationResultConfigurationDetails {
  EncryptionConfiguration?: AwsAthenaWorkGroupConfigurationResultConfigurationEncryptionConfigurationDetails;
}
export interface AwsAthenaWorkGroupConfigurationDetails {
  ResultConfiguration?: AwsAthenaWorkGroupConfigurationResultConfigurationDetails;
}
export interface AwsAthenaWorkGroupDetails {
  Name?: string;
  Description?: string;
  State?: string;
  Configuration?: AwsAthenaWorkGroupConfigurationDetails;
}
export interface AwsEventsEventbusDetails {
  Arn?: string;
  Name?: string;
  Policy?: string;
}
export interface AwsDmsEndpointDetails {
  CertificateArn?: string;
  DatabaseName?: string;
  EndpointArn?: string;
  EndpointIdentifier?: string;
  EndpointType?: string;
  EngineName?: string;
  ExternalId?: string;
  ExtraConnectionAttributes?: string;
  KmsKeyId?: string;
  Port?: number;
  ServerName?: string;
  SslMode?: string;
  Username?: string;
}
export interface AwsEventsEndpointEventBusesDetails {
  EventBusArn?: string;
}
export type AwsEventsEndpointEventBusesList =
  AwsEventsEndpointEventBusesDetails[];
export interface AwsEventsEndpointReplicationConfigDetails {
  State?: string;
}
export interface AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails {
  HealthCheck?: string;
}
export interface AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails {
  Route?: string;
}
export interface AwsEventsEndpointRoutingConfigFailoverConfigDetails {
  Primary?: AwsEventsEndpointRoutingConfigFailoverConfigPrimaryDetails;
  Secondary?: AwsEventsEndpointRoutingConfigFailoverConfigSecondaryDetails;
}
export interface AwsEventsEndpointRoutingConfigDetails {
  FailoverConfig?: AwsEventsEndpointRoutingConfigFailoverConfigDetails;
}
export interface AwsEventsEndpointDetails {
  Arn?: string;
  Description?: string;
  EndpointId?: string;
  EndpointUrl?: string;
  EventBuses?: AwsEventsEndpointEventBusesDetails[];
  Name?: string;
  ReplicationConfig?: AwsEventsEndpointReplicationConfigDetails;
  RoleArn?: string;
  RoutingConfig?: AwsEventsEndpointRoutingConfigDetails;
  State?: string;
  StateReason?: string;
}
export interface AwsDmsReplicationTaskDetails {
  CdcStartPosition?: string;
  CdcStartTime?: string;
  CdcStopPosition?: string;
  MigrationType?: string;
  Id?: string;
  ResourceIdentifier?: string;
  ReplicationInstanceArn?: string;
  ReplicationTaskIdentifier?: string;
  ReplicationTaskSettings?: string;
  SourceEndpointArn?: string;
  TableMappings?: string;
  TargetEndpointArn?: string;
  TaskData?: string;
}
export interface AwsDmsReplicationInstanceReplicationSubnetGroupDetails {
  ReplicationSubnetGroupIdentifier?: string;
}
export interface AwsDmsReplicationInstanceVpcSecurityGroupsDetails {
  VpcSecurityGroupId?: string;
}
export type AwsDmsReplicationInstanceVpcSecurityGroupsList =
  AwsDmsReplicationInstanceVpcSecurityGroupsDetails[];
export interface AwsDmsReplicationInstanceDetails {
  AllocatedStorage?: number;
  AutoMinorVersionUpgrade?: boolean;
  AvailabilityZone?: string;
  EngineVersion?: string;
  KmsKeyId?: string;
  MultiAZ?: boolean;
  PreferredMaintenanceWindow?: string;
  PubliclyAccessible?: boolean;
  ReplicationInstanceClass?: string;
  ReplicationInstanceIdentifier?: string;
  ReplicationSubnetGroup?: AwsDmsReplicationInstanceReplicationSubnetGroupDetails;
  VpcSecurityGroups?: AwsDmsReplicationInstanceVpcSecurityGroupsDetails[];
}
export interface AwsRoute53HostedZoneConfigDetails {
  Comment?: string;
}
export interface AwsRoute53HostedZoneObjectDetails {
  Id?: string;
  Name?: string;
  Config?: AwsRoute53HostedZoneConfigDetails;
}
export interface AwsRoute53HostedZoneVpcDetails {
  Id?: string;
  Region?: string;
}
export type AwsRoute53HostedZoneVpcsList = AwsRoute53HostedZoneVpcDetails[];
export type AwsRoute53HostedZoneNameServersList = string[];
export interface CloudWatchLogsLogGroupArnConfigDetails {
  CloudWatchLogsLogGroupArn?: string;
  HostedZoneId?: string;
  Id?: string;
}
export interface AwsRoute53QueryLoggingConfigDetails {
  CloudWatchLogsLogGroupArn?: CloudWatchLogsLogGroupArnConfigDetails;
}
export interface AwsRoute53HostedZoneDetails {
  HostedZone?: AwsRoute53HostedZoneObjectDetails;
  Vpcs?: AwsRoute53HostedZoneVpcDetails[];
  NameServers?: string[];
  QueryLoggingConfig?: AwsRoute53QueryLoggingConfigDetails;
}
export interface AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails {
  InCluster?: boolean;
  ClientBroker?: string;
}
export interface AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails {
  DataVolumeKMSKeyId?: string;
}
export interface AwsMskClusterClusterInfoEncryptionInfoDetails {
  EncryptionInTransit?: AwsMskClusterClusterInfoEncryptionInfoEncryptionInTransitDetails;
  EncryptionAtRest?: AwsMskClusterClusterInfoEncryptionInfoEncryptionAtRestDetails;
}
export interface AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails {
  Enabled?: boolean;
}
export interface AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails {
  Enabled?: boolean;
}
export interface AwsMskClusterClusterInfoClientAuthenticationSaslDetails {
  Iam?: AwsMskClusterClusterInfoClientAuthenticationSaslIamDetails;
  Scram?: AwsMskClusterClusterInfoClientAuthenticationSaslScramDetails;
}
export interface AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails {
  Enabled?: boolean;
}
export interface AwsMskClusterClusterInfoClientAuthenticationTlsDetails {
  CertificateAuthorityArnList?: string[];
  Enabled?: boolean;
}
export interface AwsMskClusterClusterInfoClientAuthenticationDetails {
  Sasl?: AwsMskClusterClusterInfoClientAuthenticationSaslDetails;
  Unauthenticated?: AwsMskClusterClusterInfoClientAuthenticationUnauthenticatedDetails;
  Tls?: AwsMskClusterClusterInfoClientAuthenticationTlsDetails;
}
export interface AwsMskClusterClusterInfoDetails {
  EncryptionInfo?: AwsMskClusterClusterInfoEncryptionInfoDetails;
  CurrentVersion?: string;
  NumberOfBrokerNodes?: number;
  ClusterName?: string;
  ClientAuthentication?: AwsMskClusterClusterInfoClientAuthenticationDetails;
  EnhancedMonitoring?: string;
}
export interface AwsMskClusterDetails {
  ClusterInfo?: AwsMskClusterClusterInfoDetails;
}
export interface AwsS3AccessPointVpcConfigurationDetails {
  VpcId?: string;
}
export interface AwsS3AccessPointDetails {
  AccessPointArn?: string;
  Alias?: string;
  Bucket?: string;
  BucketAccountId?: string;
  Name?: string;
  NetworkOrigin?: string;
  PublicAccessBlockConfiguration?: AwsS3AccountPublicAccessBlockDetails;
  VpcConfiguration?: AwsS3AccessPointVpcConfigurationDetails;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails {
  DirectoryId?: string;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails {
  ClientRootCertificateChain?: string;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails {
  SamlProviderArn?: string;
  SelfServiceSamlProviderArn?: string;
}
export interface AwsEc2ClientVpnEndpointAuthenticationOptionsDetails {
  Type?: string;
  ActiveDirectory?: AwsEc2ClientVpnEndpointAuthenticationOptionsActiveDirectoryDetails;
  MutualAuthentication?: AwsEc2ClientVpnEndpointAuthenticationOptionsMutualAuthenticationDetails;
  FederatedAuthentication?: AwsEc2ClientVpnEndpointAuthenticationOptionsFederatedAuthenticationDetails;
}
export type AwsEc2ClientVpnEndpointAuthenticationOptionsList =
  AwsEc2ClientVpnEndpointAuthenticationOptionsDetails[];
export interface AwsEc2ClientVpnEndpointConnectionLogOptionsDetails {
  Enabled?: boolean;
  CloudwatchLogGroup?: string;
  CloudwatchLogStream?: string;
}
export interface AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails {
  Code?: string;
  Message?: string;
}
export interface AwsEc2ClientVpnEndpointClientConnectOptionsDetails {
  Enabled?: boolean;
  LambdaFunctionArn?: string;
  Status?: AwsEc2ClientVpnEndpointClientConnectOptionsStatusDetails;
}
export interface AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails {
  Enabled?: boolean;
  BannerText?: string;
}
export interface AwsEc2ClientVpnEndpointDetails {
  ClientVpnEndpointId?: string;
  Description?: string;
  ClientCidrBlock?: string;
  DnsServer?: string[];
  SplitTunnel?: boolean;
  TransportProtocol?: string;
  VpnPort?: number;
  ServerCertificateArn?: string;
  AuthenticationOptions?: AwsEc2ClientVpnEndpointAuthenticationOptionsDetails[];
  ConnectionLogOptions?: AwsEc2ClientVpnEndpointConnectionLogOptionsDetails;
  SecurityGroupIdSet?: string[];
  VpcId?: string;
  SelfServicePortalUrl?: string;
  ClientConnectOptions?: AwsEc2ClientVpnEndpointClientConnectOptionsDetails;
  SessionTimeoutHours?: number;
  ClientLoginBannerOptions?: AwsEc2ClientVpnEndpointClientLoginBannerOptionsDetails;
}
export interface CodeRepositoryDetails {
  ProviderType?: string;
  ProjectName?: string;
  CodeSecurityIntegrationArn?: string;
}
export type AzureResourceDetails = unknown;
export interface ResourceDetails {
  AwsAutoScalingAutoScalingGroup?: AwsAutoScalingAutoScalingGroupDetails;
  AwsCodeBuildProject?: AwsCodeBuildProjectDetails;
  AwsCloudFrontDistribution?: AwsCloudFrontDistributionDetails;
  AwsEc2Instance?: AwsEc2InstanceDetails;
  AwsEc2NetworkInterface?: AwsEc2NetworkInterfaceDetails;
  AwsEc2SecurityGroup?: AwsEc2SecurityGroupDetails;
  AwsEc2Volume?: AwsEc2VolumeDetails;
  AwsEc2Vpc?: AwsEc2VpcDetails;
  AwsEc2Eip?: AwsEc2EipDetails;
  AwsEc2Subnet?: AwsEc2SubnetDetails;
  AwsEc2NetworkAcl?: AwsEc2NetworkAclDetails;
  AwsElbv2LoadBalancer?: AwsElbv2LoadBalancerDetails;
  AwsElasticBeanstalkEnvironment?: AwsElasticBeanstalkEnvironmentDetails;
  AwsElasticsearchDomain?: AwsElasticsearchDomainDetails;
  AwsS3Bucket?: AwsS3BucketDetails;
  AwsS3AccountPublicAccessBlock?: AwsS3AccountPublicAccessBlockDetails;
  AwsS3Object?: AwsS3ObjectDetails;
  AwsSecretsManagerSecret?: AwsSecretsManagerSecretDetails;
  AwsIamAccessKey?: AwsIamAccessKeyDetails;
  AwsIamUser?: AwsIamUserDetails;
  AwsIamPolicy?: AwsIamPolicyDetails;
  AwsApiGatewayV2Stage?: AwsApiGatewayV2StageDetails;
  AwsApiGatewayV2Api?: AwsApiGatewayV2ApiDetails;
  AwsDynamoDbTable?: AwsDynamoDbTableDetails;
  AwsApiGatewayStage?: AwsApiGatewayStageDetails;
  AwsApiGatewayRestApi?: AwsApiGatewayRestApiDetails;
  AwsCloudTrailTrail?: AwsCloudTrailTrailDetails;
  AwsSsmPatchCompliance?: AwsSsmPatchComplianceDetails;
  AwsCertificateManagerCertificate?: AwsCertificateManagerCertificateDetails;
  AwsRedshiftCluster?: AwsRedshiftClusterDetails;
  AwsElbLoadBalancer?: AwsElbLoadBalancerDetails;
  AwsIamGroup?: AwsIamGroupDetails;
  AwsIamRole?: AwsIamRoleDetails;
  AwsKmsKey?: AwsKmsKeyDetails;
  AwsLambdaFunction?: AwsLambdaFunctionDetails;
  AwsLambdaLayerVersion?: AwsLambdaLayerVersionDetails;
  AwsRdsDbInstance?: AwsRdsDbInstanceDetails;
  AwsSnsTopic?: AwsSnsTopicDetails;
  AwsSqsQueue?: AwsSqsQueueDetails;
  AwsWafWebAcl?: AwsWafWebAclDetails;
  AwsRdsDbSnapshot?: AwsRdsDbSnapshotDetails;
  AwsRdsDbClusterSnapshot?: AwsRdsDbClusterSnapshotDetails;
  AwsRdsDbCluster?: AwsRdsDbClusterDetails;
  AwsEcsCluster?: AwsEcsClusterDetails;
  AwsEcsContainer?: AwsEcsContainerDetails;
  AwsEcsTaskDefinition?: AwsEcsTaskDefinitionDetails;
  Container?: ContainerDetails;
  Other?: { [key: string]: string | undefined };
  AwsRdsEventSubscription?: AwsRdsEventSubscriptionDetails;
  AwsEcsService?: AwsEcsServiceDetails;
  AwsAutoScalingLaunchConfiguration?: AwsAutoScalingLaunchConfigurationDetails;
  AwsEc2VpnConnection?: AwsEc2VpnConnectionDetails;
  AwsEcrContainerImage?: AwsEcrContainerImageDetails;
  AwsOpenSearchServiceDomain?: AwsOpenSearchServiceDomainDetails;
  AwsEc2VpcEndpointService?: AwsEc2VpcEndpointServiceDetails;
  AwsXrayEncryptionConfig?: AwsXrayEncryptionConfigDetails;
  AwsWafRateBasedRule?: AwsWafRateBasedRuleDetails;
  AwsWafRegionalRateBasedRule?: AwsWafRegionalRateBasedRuleDetails;
  AwsEcrRepository?: AwsEcrRepositoryDetails;
  AwsEksCluster?: AwsEksClusterDetails;
  AwsNetworkFirewallFirewallPolicy?: AwsNetworkFirewallFirewallPolicyDetails;
  AwsNetworkFirewallFirewall?: AwsNetworkFirewallFirewallDetails;
  AwsNetworkFirewallRuleGroup?: AwsNetworkFirewallRuleGroupDetails;
  AwsRdsDbSecurityGroup?: AwsRdsDbSecurityGroupDetails;
  AwsKinesisStream?: AwsKinesisStreamDetails;
  AwsEc2TransitGateway?: AwsEc2TransitGatewayDetails;
  AwsEfsAccessPoint?: AwsEfsAccessPointDetails;
  AwsCloudFormationStack?: AwsCloudFormationStackDetails;
  AwsCloudWatchAlarm?: AwsCloudWatchAlarmDetails;
  AwsEc2VpcPeeringConnection?: AwsEc2VpcPeeringConnectionDetails;
  AwsWafRegionalRuleGroup?: AwsWafRegionalRuleGroupDetails;
  AwsWafRegionalRule?: AwsWafRegionalRuleDetails;
  AwsWafRegionalWebAcl?: AwsWafRegionalWebAclDetails;
  AwsWafRule?: AwsWafRuleDetails;
  AwsWafRuleGroup?: AwsWafRuleGroupDetails;
  AwsEcsTask?: AwsEcsTaskDetails;
  AwsBackupBackupVault?: AwsBackupBackupVaultDetails;
  AwsBackupBackupPlan?: AwsBackupBackupPlanDetails;
  AwsBackupRecoveryPoint?: AwsBackupRecoveryPointDetails;
  AwsEc2LaunchTemplate?: AwsEc2LaunchTemplateDetails;
  AwsSageMakerNotebookInstance?: AwsSageMakerNotebookInstanceDetails;
  AwsWafv2WebAcl?: AwsWafv2WebAclDetails;
  AwsWafv2RuleGroup?: AwsWafv2RuleGroupDetails;
  AwsEc2RouteTable?: AwsEc2RouteTableDetails;
  AwsAmazonMqBroker?: AwsAmazonMqBrokerDetails;
  AwsAppSyncGraphQlApi?: AwsAppSyncGraphQlApiDetails;
  AwsEventSchemasRegistry?: AwsEventSchemasRegistryDetails;
  AwsGuardDutyDetector?: AwsGuardDutyDetectorDetails;
  AwsStepFunctionStateMachine?: AwsStepFunctionStateMachineDetails;
  AwsAthenaWorkGroup?: AwsAthenaWorkGroupDetails;
  AwsEventsEventbus?: AwsEventsEventbusDetails;
  AwsDmsEndpoint?: AwsDmsEndpointDetails;
  AwsEventsEndpoint?: AwsEventsEndpointDetails;
  AwsDmsReplicationTask?: AwsDmsReplicationTaskDetails;
  AwsDmsReplicationInstance?: AwsDmsReplicationInstanceDetails;
  AwsRoute53HostedZone?: AwsRoute53HostedZoneDetails;
  AwsMskCluster?: AwsMskClusterDetails;
  AwsS3AccessPoint?: AwsS3AccessPointDetails;
  AwsEc2ClientVpnEndpoint?: AwsEc2ClientVpnEndpointDetails;
  CodeRepository?: CodeRepositoryDetails;
  AzureResource?: any;
}
export interface Resource {
  Type?: string;
  Id?: string;
  Partition?: Partition;
  Region?: string;
  Provider?: CloudProviderName;
  Owner?: ResourceOwner;
  ResourceRole?: string;
  Tags?: { [key: string]: string | undefined };
  DataClassification?: DataClassificationDetails;
  Details?: ResourceDetails;
  ApplicationName?: string;
  ApplicationArn?: string;
}
export type ResourceList = Resource[];
export type ComplianceStatus =
  | "PASSED"
  | "WARNING"
  | "FAILED"
  | "NOT_AVAILABLE"
  | (string & {});
export interface StatusReason {
  ReasonCode?: string;
  Description?: string;
}
export type StatusReasonsList = StatusReason[];
export interface AssociatedStandard {
  StandardsId?: string;
}
export type AssociatedStandardsList = AssociatedStandard[];
export interface SecurityControlParameter {
  Name?: string;
  Value?: string[];
}
export type SecurityControlParametersList = SecurityControlParameter[];
export interface Compliance {
  Status?: ComplianceStatus;
  RelatedRequirements?: string[];
  StatusReasons?: StatusReason[];
  SecurityControlId?: string;
  AssociatedStandards?: AssociatedStandard[];
  SecurityControlParameters?: SecurityControlParameter[];
}
export type WorkflowState =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "DEFERRED"
  | "RESOLVED"
  | (string & {});
export interface Workflow {
  Status?: WorkflowStatus;
}
export type RecordState = "ACTIVE" | "ARCHIVED" | (string & {});
export interface Note {
  Text?: string;
  UpdatedBy?: string;
  UpdatedAt?: string;
}
export interface SoftwarePackage {
  Name?: string;
  Version?: string;
  Epoch?: string;
  Release?: string;
  Architecture?: string;
  PackageManager?: string;
  FilePath?: string;
  FixedInVersion?: string;
  Remediation?: string;
  SourceLayerHash?: string;
  SourceLayerArn?: string;
}
export type SoftwarePackageList = SoftwarePackage[];
export interface Adjustment {
  Metric?: string;
  Reason?: string;
}
export type AdjustmentList = Adjustment[];
export interface Cvss {
  Version?: string;
  BaseScore?: number;
  BaseVector?: string;
  Source?: string;
  Adjustments?: Adjustment[];
}
export type CvssList = Cvss[];
export interface VulnerabilityVendor {
  Name?: string;
  Url?: string;
  VendorSeverity?: string;
  VendorCreatedAt?: string;
  VendorUpdatedAt?: string;
}
export type VulnerabilityFixAvailable =
  | "YES"
  | "NO"
  | "PARTIAL"
  | (string & {});
export type VulnerabilityExploitAvailable = "YES" | "NO" | (string & {});
export interface CodeVulnerabilitiesFilePath {
  EndLine?: number;
  FileName?: string;
  FilePath?: string;
  StartLine?: number;
}
export interface VulnerabilityCodeVulnerabilities {
  Cwes?: string[];
  FilePath?: CodeVulnerabilitiesFilePath;
  SourceArn?: string;
}
export type VulnerabilityCodeVulnerabilitiesList =
  VulnerabilityCodeVulnerabilities[];
export interface Vulnerability {
  Id?: string;
  VulnerablePackages?: SoftwarePackage[];
  Cvss?: Cvss[];
  RelatedVulnerabilities?: string[];
  Vendor?: VulnerabilityVendor;
  ReferenceUrls?: string[];
  FixAvailable?: VulnerabilityFixAvailable;
  EpssScore?: number;
  ExploitAvailable?: VulnerabilityExploitAvailable;
  LastKnownExploitAt?: string;
  CodeVulnerabilities?: VulnerabilityCodeVulnerabilities[];
}
export type VulnerabilityList = Vulnerability[];
export interface PatchSummary {
  Id?: string;
  InstalledCount?: number;
  MissingCount?: number;
  FailedCount?: number;
  InstalledOtherCount?: number;
  InstalledRejectedCount?: number;
  InstalledPendingReboot?: number;
  OperationStartTime?: string;
  OperationEndTime?: string;
  RebootOption?: string;
  Operation?: string;
}
export interface IpOrganizationDetails {
  Asn?: number;
  AsnOrg?: string;
  Isp?: string;
  Org?: string;
}
export interface Country {
  CountryCode?: string;
  CountryName?: string;
}
export interface City {
  CityName?: string;
}
export interface GeoLocation {
  Lon?: number;
  Lat?: number;
}
export interface ActionRemoteIpDetails {
  IpAddressV4?: string;
  Organization?: IpOrganizationDetails;
  Country?: Country;
  City?: City;
  GeoLocation?: GeoLocation;
}
export interface ActionRemotePortDetails {
  Port?: number;
  PortName?: string;
}
export interface ActionLocalPortDetails {
  Port?: number;
  PortName?: string;
}
export interface NetworkConnectionAction {
  ConnectionDirection?: string;
  RemoteIpDetails?: ActionRemoteIpDetails;
  RemotePortDetails?: ActionRemotePortDetails;
  LocalPortDetails?: ActionLocalPortDetails;
  Protocol?: string;
  Blocked?: boolean;
}
export interface AwsApiCallActionDomainDetails {
  Domain?: string;
}
export interface AwsApiCallAction {
  Api?: string;
  ServiceName?: string;
  CallerType?: string;
  RemoteIpDetails?: ActionRemoteIpDetails;
  DomainDetails?: AwsApiCallActionDomainDetails;
  AffectedResources?: { [key: string]: string | undefined };
  FirstSeen?: string;
  LastSeen?: string;
}
export interface DnsRequestAction {
  Domain?: string;
  Protocol?: string;
  Blocked?: boolean;
}
export interface ActionLocalIpDetails {
  IpAddressV4?: string;
}
export interface PortProbeDetail {
  LocalPortDetails?: ActionLocalPortDetails;
  LocalIpDetails?: ActionLocalIpDetails;
  RemoteIpDetails?: ActionRemoteIpDetails;
}
export type PortProbeDetailList = PortProbeDetail[];
export interface PortProbeAction {
  PortProbeDetails?: PortProbeDetail[];
  Blocked?: boolean;
}
export interface Action {
  ActionType?: string;
  NetworkConnectionAction?: NetworkConnectionAction;
  AwsApiCallAction?: AwsApiCallAction;
  DnsRequestAction?: DnsRequestAction;
  PortProbeAction?: PortProbeAction;
}
export interface FindingProviderSeverity {
  Label?: SeverityLabel;
  Original?: string;
}
export interface FindingProviderFields {
  Confidence?: number;
  Criticality?: number;
  RelatedFindings?: RelatedFinding[];
  Severity?: FindingProviderSeverity;
  Types?: string[];
}
export interface GeneratorDetails {
  Name?: string;
  Description?: string;
  Labels?: string[];
}
export interface UserAccount {
  Uid?: string;
  Name?: string;
}
export interface ActorUser {
  Name?: string;
  Uid?: string;
  Type?: string;
  CredentialUid?: string;
  Account?: UserAccount;
}
export type ActorSessionMfaStatus = "ENABLED" | "DISABLED" | (string & {});
export interface ActorSession {
  Uid?: string;
  MfaStatus?: ActorSessionMfaStatus;
  CreatedTime?: number;
  Issuer?: string;
}
export interface Actor {
  Id?: string;
  User?: ActorUser;
  Session?: ActorSession;
}
export type ActorsList = Actor[];
export interface NetworkGeoLocation {
  City?: string;
  Country?: string;
  Lat?: number;
  Lon?: number;
}
export interface NetworkAutonomousSystem {
  Name?: string;
  Number?: number;
}
export type ConnectionDirection = "INBOUND" | "OUTBOUND" | (string & {});
export interface NetworkConnection {
  Direction?: ConnectionDirection;
}
export interface NetworkEndpoint {
  Id?: string;
  Ip?: string;
  Domain?: string;
  Port?: number;
  Location?: NetworkGeoLocation;
  AutonomousSystem?: NetworkAutonomousSystem;
  Connection?: NetworkConnection;
}
export type NetworkEndpointsList = NetworkEndpoint[];
export interface Indicator {
  Key?: string;
  Values?: string[];
  Title?: string;
  Type?: string;
}
export type IndicatorsList = Indicator[];
export interface Signal {
  Type?: string;
  Id?: string;
  Title?: string;
  ProductArn?: string;
  ResourceIds?: string[];
  SignalIndicators?: Indicator[];
  Name?: string;
  CreatedAt?: number;
  UpdatedAt?: number;
  FirstSeenAt?: number;
  LastSeenAt?: number;
  Severity?: number;
  Count?: number;
  ActorIds?: string[];
  EndpointIds?: string[];
}
export type SignalsList = Signal[];
export interface Sequence {
  Uid?: string;
  Actors?: Actor[];
  Endpoints?: NetworkEndpoint[];
  Signals?: Signal[];
  SequenceIndicators?: Indicator[];
}
export interface Detection {
  Sequence?: Sequence;
}
export interface AwsSecurityFinding {
  SchemaVersion?: string;
  Id?: string;
  ProductArn?: string;
  ProductName?: string;
  CompanyName?: string;
  Region?: string;
  GeneratorId?: string;
  AwsAccountId?: string;
  Types?: string[];
  FirstObservedAt?: string;
  LastObservedAt?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  Severity?: Severity;
  Confidence?: number;
  Criticality?: number;
  Title?: string;
  Description?: string;
  Remediation?: Remediation;
  SourceUrl?: string;
  ProductFields?: { [key: string]: string | undefined };
  UserDefinedFields?: { [key: string]: string | undefined };
  Malware?: Malware[];
  Network?: Network;
  NetworkPath?: NetworkPathComponent[];
  Process?: ProcessDetails;
  Threats?: Threat[];
  ThreatIntelIndicators?: ThreatIntelIndicator[];
  Resources?: Resource[];
  Compliance?: Compliance;
  VerificationState?: VerificationState;
  WorkflowState?: WorkflowState;
  Workflow?: Workflow;
  RecordState?: RecordState;
  RelatedFindings?: RelatedFinding[];
  Note?: Note;
  Vulnerabilities?: Vulnerability[];
  PatchSummary?: PatchSummary;
  Action?: Action;
  FindingProviderFields?: FindingProviderFields;
  Sample?: boolean;
  GeneratorDetails?: GeneratorDetails;
  ProcessedAt?: string;
  AwsAccountName?: string;
  Detection?: Detection;
}
export type BatchImportFindingsRequestFindingList = AwsSecurityFinding[];
export interface BatchImportFindingsRequest {
  Findings?: AwsSecurityFinding[];
}
export interface ImportFindingsError {
  Id?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type ImportFindingsErrorList = ImportFindingsError[];
export interface BatchImportFindingsResponse {
  FailedCount: number;
  SuccessCount: number;
  FailedFindings?: (ImportFindingsError & {
    Id: NonEmptyString;
    ErrorCode: NonEmptyString;
    ErrorMessage: NonEmptyString;
  })[];
}
export interface UpdateAutomationRulesRequestItem {
  RuleArn?: string;
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  Description?: string;
  RuleName?: string;
  IsTerminal?: boolean;
  Criteria?: AutomationRulesFindingFilters;
  Actions?: AutomationRulesAction[];
}
export type UpdateAutomationRulesRequestItemsList =
  UpdateAutomationRulesRequestItem[];
export interface BatchUpdateAutomationRulesRequest {
  UpdateAutomationRulesRequestItems?: UpdateAutomationRulesRequestItem[];
}
export interface BatchUpdateAutomationRulesResponse {
  ProcessedAutomationRules?: string[];
  UnprocessedAutomationRules?: UnprocessedAutomationRule[];
}
export interface AwsSecurityFindingIdentifier {
  Id?: string;
  ProductArn?: string;
}
export type AwsSecurityFindingIdentifierList = AwsSecurityFindingIdentifier[];
export interface BatchUpdateFindingsRequest {
  FindingIdentifiers?: AwsSecurityFindingIdentifier[];
  Note?: NoteUpdate;
  Severity?: SeverityUpdate;
  VerificationState?: VerificationState;
  Confidence?: number;
  Criticality?: number;
  Types?: string[];
  UserDefinedFields?: { [key: string]: string | undefined };
  Workflow?: WorkflowUpdate;
  RelatedFindings?: RelatedFinding[];
}
export interface BatchUpdateFindingsUnprocessedFinding {
  FindingIdentifier?: AwsSecurityFindingIdentifier;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type BatchUpdateFindingsUnprocessedFindingsList =
  BatchUpdateFindingsUnprocessedFinding[];
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
  CloudAccountUid?: string;
  FindingInfoUid?: string;
  MetadataProductUid?: string;
}
export type OcsfFindingIdentifierList = OcsfFindingIdentifier[];
export interface BatchUpdateFindingsV2Request {
  MetadataUids?: string[];
  FindingIdentifiers?: OcsfFindingIdentifier[];
  Comment?: string;
  SeverityId?: number;
  StatusId?: number;
}
export interface BatchUpdateFindingsV2ProcessedFinding {
  FindingIdentifier?: OcsfFindingIdentifier;
  MetadataUid?: string;
}
export type BatchUpdateFindingsV2ProcessedFindingsList =
  BatchUpdateFindingsV2ProcessedFinding[];
export type BatchUpdateFindingsV2UnprocessedFindingErrorCode =
  | "ResourceNotFoundException"
  | "ValidationException"
  | "InternalServerException"
  | "ConflictException"
  | (string & {});
export interface BatchUpdateFindingsV2UnprocessedFinding {
  FindingIdentifier?: OcsfFindingIdentifier;
  MetadataUid?: string;
  ErrorCode?: BatchUpdateFindingsV2UnprocessedFindingErrorCode;
  ErrorMessage?: string;
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
  StandardsArn?: string;
  SecurityControlId?: string;
  AssociationStatus?: AssociationStatus;
  UpdatedReason?: string;
}
export type StandardsControlAssociationUpdates =
  StandardsControlAssociationUpdate[];
export interface BatchUpdateStandardsControlAssociationsRequest {
  StandardsControlAssociationUpdates?: StandardsControlAssociationUpdate[];
}
export interface UnprocessedStandardsControlAssociationUpdate {
  StandardsControlAssociationUpdate?: StandardsControlAssociationUpdate;
  ErrorCode?: UnprocessedErrorCode;
  ErrorReason?: string;
}
export type UnprocessedStandardsControlAssociationUpdates =
  UnprocessedStandardsControlAssociationUpdate[];
export interface BatchUpdateStandardsControlAssociationsResponse {
  UnprocessedAssociationUpdates?: (UnprocessedStandardsControlAssociationUpdate & {
    StandardsControlAssociationUpdate: StandardsControlAssociationUpdate & {
      StandardsArn: NonEmptyString;
      SecurityControlId: NonEmptyString;
      AssociationStatus: AssociationStatus;
    };
    ErrorCode: UnprocessedErrorCode;
  })[];
}
export interface CreateActionTargetRequest {
  Name?: string;
  Description?: string;
  Id?: string;
}
export interface CreateActionTargetResponse {
  ActionTargetArn: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateAggregatorV2Request {
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export interface CreateAggregatorV2Response {
  AggregatorV2Arn?: string;
  AggregationRegion?: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export interface CreateAutomationRuleRequest {
  Tags?: { [key: string]: string | undefined };
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  RuleName?: string;
  Description?: string;
  IsTerminal?: boolean;
  Criteria?: AutomationRulesFindingFilters;
  Actions?: AutomationRulesAction[];
}
export interface CreateAutomationRuleResponse {
  RuleArn?: string;
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
  | "vulnerabilities.cve.epss.score"
  | "vulnerabilities.cve.uid"
  | "vulnerabilities.related_vulnerabilities"
  | "cloud.account.name"
  | "vendor_attributes.severity"
  | (string & {});
export interface OcsfStringFilter {
  FieldName?: OcsfStringField;
  Filter?: StringFilter;
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
  FieldName?: OcsfDateField;
  Filter?: DateFilter;
}
export type OcsfDateFilterList = OcsfDateFilter[];
export type OcsfBooleanField =
  | "compliance.assessments.meets_criteria"
  | "vulnerabilities.is_exploit_available"
  | "vulnerabilities.is_fix_available"
  | (string & {});
export interface BooleanFilter {
  Value?: boolean;
}
export interface OcsfBooleanFilter {
  FieldName?: OcsfBooleanField;
  Filter?: BooleanFilter;
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
  FieldName?: OcsfNumberField;
  Filter?: NumberFilter;
}
export type OcsfNumberFilterList = OcsfNumberFilter[];
export type OcsfMapField =
  | "resources.tags"
  | "compliance.control_parameters"
  | "databucket.tags"
  | "finding_info.tags"
  | (string & {});
export interface OcsfMapFilter {
  FieldName?: OcsfMapField;
  Filter?: MapFilter;
}
export type OcsfMapFilterList = OcsfMapFilter[];
export type OcsfIpField =
  | "evidences.dst_endpoint.ip"
  | "evidences.src_endpoint.ip"
  | (string & {});
export interface IpFilter {
  Cidr?: string;
}
export interface OcsfIpFilter {
  FieldName?: OcsfIpField;
  Filter?: IpFilter;
}
export type OcsfIpFilterList = OcsfIpFilter[];
export type AllowedOperators = "AND" | "OR" | (string & {});
export interface CompositeFilter {
  StringFilters?: OcsfStringFilter[];
  DateFilters?: OcsfDateFilter[];
  BooleanFilters?: OcsfBooleanFilter[];
  NumberFilters?: OcsfNumberFilter[];
  MapFilters?: OcsfMapFilter[];
  IpFilters?: OcsfIpFilter[];
  NestedCompositeFilters?: CompositeFilter[];
  Operator?: AllowedOperators;
}
export type CompositeFilterList = CompositeFilter[];
export interface OcsfFindingFilters {
  CompositeFilters?: CompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export type Criteria = { OcsfFindingCriteria: OcsfFindingFilters };
export type AutomationRulesActionTypeV2 =
  | "FINDING_FIELDS_UPDATE"
  | "EXTERNAL_INTEGRATION"
  | (string & {});
export interface AutomationRulesFindingFieldsUpdateV2 {
  SeverityId?: number;
  Comment?: string;
  StatusId?: number;
}
export interface ExternalIntegrationConfiguration {
  ConnectorArn?: string;
}
export interface AutomationRulesActionV2 {
  Type?: AutomationRulesActionTypeV2;
  FindingFieldsUpdate?: AutomationRulesFindingFieldsUpdateV2;
  ExternalIntegrationConfiguration?: ExternalIntegrationConfiguration;
}
export type AutomationRulesActionListV2 = AutomationRulesActionV2[];
export interface CreateAutomationRuleV2Request {
  RuleName?: string;
  RuleStatus?: RuleStatusV2;
  Description?: string;
  RuleOrder?: number;
  Criteria?: Criteria;
  Actions?: AutomationRulesActionV2[];
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export interface CreateAutomationRuleV2Response {
  RuleArn?: string;
  RuleId?: string;
}
export type EnabledStandardIdentifierList = string[];
export type EnabledSecurityControlIdentifierList = string[];
export type DisabledSecurityControlIdentifierList = string[];
export interface SecurityControlCustomParameter {
  SecurityControlId?: string;
  Parameters?: { [key: string]: ParameterConfiguration | undefined };
}
export type SecurityControlCustomParametersList =
  SecurityControlCustomParameter[];
export interface SecurityControlsConfiguration {
  EnabledSecurityControlIdentifiers?: string[];
  DisabledSecurityControlIdentifiers?: string[];
  SecurityControlCustomParameters?: SecurityControlCustomParameter[];
}
export interface SecurityHubPolicy {
  ServiceEnabled?: boolean;
  EnabledStandardIdentifiers?: string[];
  SecurityControlsConfiguration?: SecurityControlsConfiguration;
}
export type Policy = { SecurityHub: SecurityHubPolicy };
export interface CreateConfigurationPolicyRequest {
  Name?: string;
  Description?: string;
  ConfigurationPolicy?: Policy;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateConfigurationPolicyResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  ConfigurationPolicy?: Policy;
}
export type ScopeType = "TENANT" | "SUBSCRIPTION" | (string & {});
export type ScopeValueList = string[];
export interface AzureScopeConfiguration {
  ScopeType?: ScopeType;
  ScopeValues?: string[];
}
export type AzureRegionList = string[];
export interface AzureProviderConfiguration {
  AWSConfigConnectorArn?: string;
  ScopeConfiguration?: AzureScopeConfiguration;
  AzureRegions?: string[];
}
export type CspmProviderConfiguration = { Azure: AzureProviderConfiguration };
export interface CreateConnectorRequest {
  Name?: string;
  Description?: string;
  Provider?: CspmProviderConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
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
  ConnectorStatus?: CspmConnectorStatus;
  EnablementStatus?: CspmEnablementStatus;
}
export interface JiraCloudProviderConfiguration {
  ProjectKey?: string;
}
export interface ServiceNowProviderConfiguration {
  InstanceName?: string;
  SecretArn?: string;
}
export type ProviderConfiguration =
  | {
      JiraCloud: JiraCloudProviderConfiguration;
      ServiceNow?: never;
      Azure?: never;
    }
  | {
      JiraCloud?: never;
      ServiceNow: ServiceNowProviderConfiguration;
      Azure?: never;
    }
  | {
      JiraCloud?: never;
      ServiceNow?: never;
      Azure: AzureProviderConfiguration;
    };
export interface CreateConnectorV2Request {
  Name?: string;
  Description?: string;
  Provider?: ProviderConfiguration;
  KmsKeyArn?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
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
  AuthUrl?: string;
  ConnectorStatus?: ConnectorStatus;
  EnablementStatus?: EnablementStatus;
}
export interface CreateFindingAggregatorRequest {
  RegionLinkingMode?: string;
  Regions?: string[];
}
export interface CreateFindingAggregatorResponse {
  FindingAggregatorArn?: string;
  FindingAggregationRegion?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export type IpFilterList = IpFilter[];
export interface KeywordFilter {
  Value?: string;
}
export type KeywordFilterList = KeywordFilter[];
export type BooleanFilterList = BooleanFilter[];
export interface AwsSecurityFindingFilters {
  ProductArn?: StringFilter[];
  AwsAccountId?: StringFilter[];
  Id?: StringFilter[];
  GeneratorId?: StringFilter[];
  Region?: StringFilter[];
  Type?: StringFilter[];
  FirstObservedAt?: DateFilter[];
  LastObservedAt?: DateFilter[];
  CreatedAt?: DateFilter[];
  UpdatedAt?: DateFilter[];
  SeverityProduct?: NumberFilter[];
  SeverityNormalized?: NumberFilter[];
  SeverityLabel?: StringFilter[];
  Confidence?: NumberFilter[];
  Criticality?: NumberFilter[];
  Title?: StringFilter[];
  Description?: StringFilter[];
  RecommendationText?: StringFilter[];
  SourceUrl?: StringFilter[];
  ProductFields?: MapFilter[];
  ProductName?: StringFilter[];
  CompanyName?: StringFilter[];
  UserDefinedFields?: MapFilter[];
  MalwareName?: StringFilter[];
  MalwareType?: StringFilter[];
  MalwarePath?: StringFilter[];
  MalwareState?: StringFilter[];
  NetworkDirection?: StringFilter[];
  NetworkProtocol?: StringFilter[];
  NetworkSourceIpV4?: IpFilter[];
  NetworkSourceIpV6?: IpFilter[];
  NetworkSourcePort?: NumberFilter[];
  NetworkSourceDomain?: StringFilter[];
  NetworkSourceMac?: StringFilter[];
  NetworkDestinationIpV4?: IpFilter[];
  NetworkDestinationIpV6?: IpFilter[];
  NetworkDestinationPort?: NumberFilter[];
  NetworkDestinationDomain?: StringFilter[];
  ProcessName?: StringFilter[];
  ProcessPath?: StringFilter[];
  ProcessPid?: NumberFilter[];
  ProcessParentPid?: NumberFilter[];
  ProcessLaunchedAt?: DateFilter[];
  ProcessTerminatedAt?: DateFilter[];
  ThreatIntelIndicatorType?: StringFilter[];
  ThreatIntelIndicatorValue?: StringFilter[];
  ThreatIntelIndicatorCategory?: StringFilter[];
  ThreatIntelIndicatorLastObservedAt?: DateFilter[];
  ThreatIntelIndicatorSource?: StringFilter[];
  ThreatIntelIndicatorSourceUrl?: StringFilter[];
  ResourceType?: StringFilter[];
  ResourceId?: StringFilter[];
  ResourcePartition?: StringFilter[];
  ResourceRegion?: StringFilter[];
  ResourceTags?: MapFilter[];
  ResourceAwsEc2InstanceType?: StringFilter[];
  ResourceAwsEc2InstanceImageId?: StringFilter[];
  ResourceAwsEc2InstanceIpV4Addresses?: IpFilter[];
  ResourceAwsEc2InstanceIpV6Addresses?: IpFilter[];
  ResourceAwsEc2InstanceKeyName?: StringFilter[];
  ResourceAwsEc2InstanceIamInstanceProfileArn?: StringFilter[];
  ResourceAwsEc2InstanceVpcId?: StringFilter[];
  ResourceAwsEc2InstanceSubnetId?: StringFilter[];
  ResourceAwsEc2InstanceLaunchedAt?: DateFilter[];
  ResourceAwsS3BucketOwnerId?: StringFilter[];
  ResourceAwsS3BucketOwnerName?: StringFilter[];
  ResourceAwsIamAccessKeyUserName?: StringFilter[];
  ResourceAwsIamAccessKeyPrincipalName?: StringFilter[];
  ResourceAwsIamAccessKeyStatus?: StringFilter[];
  ResourceAwsIamAccessKeyCreatedAt?: DateFilter[];
  ResourceAwsIamUserUserName?: StringFilter[];
  ResourceContainerName?: StringFilter[];
  ResourceContainerImageId?: StringFilter[];
  ResourceContainerImageName?: StringFilter[];
  ResourceContainerLaunchedAt?: DateFilter[];
  ResourceDetailsOther?: MapFilter[];
  ComplianceStatus?: StringFilter[];
  VerificationState?: StringFilter[];
  WorkflowState?: StringFilter[];
  WorkflowStatus?: StringFilter[];
  RecordState?: StringFilter[];
  RelatedFindingsProductArn?: StringFilter[];
  RelatedFindingsId?: StringFilter[];
  NoteText?: StringFilter[];
  NoteUpdatedAt?: DateFilter[];
  NoteUpdatedBy?: StringFilter[];
  Keyword?: KeywordFilter[];
  FindingProviderFieldsConfidence?: NumberFilter[];
  FindingProviderFieldsCriticality?: NumberFilter[];
  FindingProviderFieldsRelatedFindingsId?: StringFilter[];
  FindingProviderFieldsRelatedFindingsProductArn?: StringFilter[];
  FindingProviderFieldsSeverityLabel?: StringFilter[];
  FindingProviderFieldsSeverityOriginal?: StringFilter[];
  FindingProviderFieldsTypes?: StringFilter[];
  Sample?: BooleanFilter[];
  ComplianceSecurityControlId?: StringFilter[];
  ComplianceAssociatedStandardsId?: StringFilter[];
  VulnerabilitiesExploitAvailable?: StringFilter[];
  VulnerabilitiesFixAvailable?: StringFilter[];
  ComplianceSecurityControlParametersName?: StringFilter[];
  ComplianceSecurityControlParametersValue?: StringFilter[];
  AwsAccountName?: StringFilter[];
  ResourceApplicationName?: StringFilter[];
  ResourceApplicationArn?: StringFilter[];
  ResourceOwnerAccountId?: StringFilter[];
  ResourceOwnerOrgId?: StringFilter[];
  ResourceProvider?: StringFilter[];
}
export interface CreateInsightRequest {
  Name?: string;
  Filters?: AwsSecurityFindingFilters;
  GroupByAttribute?: string;
}
export interface CreateInsightResponse {
  InsightArn: string;
}
export type AccountId = string;
export interface AccountDetails {
  AccountId?: string;
  Email?: string;
}
export type AccountDetailsList = AccountDetails[];
export interface CreateMembersRequest {
  AccountDetails?: AccountDetails[];
}
export interface Result {
  AccountId?: string;
  ProcessingResult?: string;
}
export type ResultList = Result[];
export interface CreateMembersResponse {
  UnprocessedAccounts?: Result[];
}
export type TicketCreationMode = "DRYRUN" | (string & {});
export interface CreateTicketV2Request {
  ConnectorId?: string;
  FindingMetadataUid?: string;
  ClientToken?: string;
  Mode?: TicketCreationMode;
}
export interface CreateTicketV2Response {
  TicketId: string;
  TicketSrcUrl?: string;
}
export type AccountIdList = string[];
export interface DeclineInvitationsRequest {
  AccountIds?: string[];
}
export interface DeclineInvitationsResponse {
  UnprocessedAccounts?: Result[];
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
  EnablementStatus?: CspmEnablementStatus;
}
export interface DeleteConnectorV2Request {
  ConnectorId: string;
}
export interface DeleteConnectorV2Response {
  EnablementStatus?: EnablementStatus;
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
  AccountIds?: string[];
}
export interface DeleteInvitationsResponse {
  UnprocessedAccounts?: Result[];
}
export interface DeleteMembersRequest {
  AccountIds?: string[];
}
export interface DeleteMembersResponse {
  UnprocessedAccounts?: Result[];
}
export type ArnList = string[];
export type NextToken = string;
export type MaxResults = number;
export interface DescribeActionTargetsRequest {
  ActionTargetArns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ActionTarget {
  ActionTargetArn?: string;
  Name?: string;
  Description?: string;
}
export type ActionTargetList = ActionTarget[];
export interface DescribeActionTargetsResponse {
  ActionTargets: (ActionTarget & {
    ActionTargetArn: NonEmptyString;
    Name: NonEmptyString;
    Description: NonEmptyString;
  })[];
  NextToken?: string;
}
export interface DescribeHubRequest {
  HubArn?: string;
}
export type ControlFindingGenerator =
  | "STANDARD_CONTROL"
  | "SECURITY_CONTROL"
  | (string & {});
export interface DescribeHubResponse {
  HubArn?: string;
  SubscribedAt?: string;
  AutoEnableControls?: boolean;
  ControlFindingGenerator?: ControlFindingGenerator;
}
export interface DescribeOrganizationConfigurationRequest {}
export type AutoEnableStandards = "NONE" | "DEFAULT" | (string & {});
export type OrganizationConfigurationConfigurationType =
  | "CENTRAL"
  | "LOCAL"
  | (string & {});
export type OrganizationConfigurationStatus =
  | "PENDING"
  | "ENABLED"
  | "FAILED"
  | (string & {});
export interface OrganizationConfiguration {
  ConfigurationType?: OrganizationConfigurationConfigurationType;
  Status?: OrganizationConfigurationStatus;
  StatusMessage?: string;
}
export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
  MemberAccountLimitReached?: boolean;
  AutoEnableStandards?: AutoEnableStandards;
  OrganizationConfiguration?: OrganizationConfiguration;
}
export interface DescribeProductsRequest {
  NextToken?: string;
  MaxResults?: number;
  ProductArn?: string;
}
export type CategoryList = string[];
export type IntegrationType =
  | "SEND_FINDINGS_TO_SECURITY_HUB"
  | "RECEIVE_FINDINGS_FROM_SECURITY_HUB"
  | "UPDATE_FINDINGS_IN_SECURITY_HUB"
  | (string & {});
export type IntegrationTypeList = IntegrationType[];
export interface Product {
  ProductArn?: string;
  ProductName?: string;
  CompanyName?: string;
  Description?: string;
  Categories?: string[];
  IntegrationTypes?: IntegrationType[];
  MarketplaceUrl?: string;
  ActivationUrl?: string;
  ProductSubscriptionResourcePolicy?: string;
}
export type ProductsList = Product[];
export interface DescribeProductsResponse {
  Products: (Product & { ProductArn: NonEmptyString })[];
  NextToken?: string;
}
export interface DescribeProductsV2Request {
  NextToken?: string;
  MaxResults?: number;
}
export type IntegrationV2Type =
  | "SEND_FINDINGS_TO_SECURITY_HUB"
  | "RECEIVE_FINDINGS_FROM_SECURITY_HUB"
  | "UPDATE_FINDINGS_IN_SECURITY_HUB"
  | "EXTENDED_PLAN"
  | (string & {});
export type IntegrationV2TypeList = IntegrationV2Type[];
export interface ProductV2 {
  ProductV2Name?: string;
  CompanyName?: string;
  Description?: string;
  Categories?: string[];
  IntegrationV2Types?: IntegrationV2Type[];
  MarketplaceUrl?: string;
  ActivationUrl?: string;
  MarketplaceProductId?: string;
}
export type ProductsV2List = ProductV2[];
export interface DescribeProductsV2Response {
  ProductsV2: ProductV2[];
  NextToken?: string;
}
export interface DescribeSecurityHubV2Request {}
export type IsoString = string;
export type FeatureNameKey = string;
export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export interface FeatureDetail {
  FeatureStatus?: FeatureStatus;
  UpdatedAt?: Date;
}
export type Features = { [key: string]: FeatureDetail | undefined };
export interface DescribeSecurityHubV2Response {
  HubV2Arn?: string;
  SubscribedAt?: string;
  Features?: { [key: string]: FeatureDetail | undefined };
}
export type StandardsProviders = StandardsProvider[];
export interface DescribeStandardsRequest {
  NextToken?: string;
  MaxResults?: number;
  Providers?: StandardsProvider[];
}
export interface StandardsManagedBy {
  Company?: string;
  Product?: string;
}
export interface Standard {
  StandardsArn?: string;
  Name?: string;
  Description?: string;
  EnabledByDefault?: boolean;
  Provider?: StandardsProvider;
  StandardsManagedBy?: StandardsManagedBy;
}
export type Standards = Standard[];
export interface DescribeStandardsResponse {
  Standards?: Standard[];
  NextToken?: string;
}
export interface DescribeStandardsControlsRequest {
  StandardsSubscriptionArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface StandardsControl {
  StandardsControlArn?: string;
  ControlStatus?: ControlStatus;
  DisabledReason?: string;
  ControlStatusUpdatedAt?: Date;
  ControlId?: string;
  Title?: string;
  Description?: string;
  RemediationUrl?: string;
  SeverityRating?: SeverityRating;
  RelatedRequirements?: string[];
}
export type StandardsControls = StandardsControl[];
export interface DescribeStandardsControlsResponse {
  Controls?: StandardsControl[];
  NextToken?: string;
}
export interface DisableImportFindingsForProductRequest {
  ProductSubscriptionArn: string;
}
export interface DisableImportFindingsForProductResponse {}
export type SecurityHubFeature =
  | "SecurityHub"
  | "SecurityHubV2"
  | (string & {});
export interface DisableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
  Feature?: SecurityHubFeature;
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
  AccountIds?: string[];
}
export interface DisassociateMembersResponse {}
export interface EnableImportFindingsForProductRequest {
  ProductArn?: string;
}
export interface EnableImportFindingsForProductResponse {
  ProductSubscriptionArn?: string;
}
export interface EnableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
  Feature?: SecurityHubFeature;
}
export interface EnableOrganizationAdminAccountResponse {
  AdminAccountId?: string;
  Feature?: SecurityHubFeature;
}
export interface EnableSecurityHubRequest {
  Tags?: { [key: string]: string | undefined };
  EnableDefaultStandards?: boolean;
  ControlFindingGenerator?: ControlFindingGenerator;
}
export interface EnableSecurityHubResponse {}
export interface EnableSecurityHubFeatureV2Request {
  FeatureName: FeatureName;
}
export interface EnableSecurityHubFeatureV2Response {}
export interface EnableSecurityHubV2Request {
  Tags?: { [key: string]: string | undefined };
}
export interface EnableSecurityHubV2Response {
  HubV2Arn?: string;
}
export interface GenerateRecommendedPolicyV2Request {
  MetadataUid: string;
}
export interface GenerateRecommendedPolicyV2Response {}
export interface GetAdministratorAccountRequest {}
export interface Invitation {
  AccountId?: string;
  InvitationId?: string;
  InvitedAt?: Date;
  MemberStatus?: string;
}
export interface GetAdministratorAccountResponse {
  Administrator?: Invitation;
}
export interface GetAggregatorV2Request {
  AggregatorV2Arn: string;
}
export interface GetAggregatorV2Response {
  AggregatorV2Arn?: string;
  AggregationRegion?: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export interface GetAutomationRuleV2Request {
  Identifier: string;
}
export interface GetAutomationRuleV2Response {
  RuleArn?: string;
  RuleId?: string;
  RuleOrder?: number;
  RuleName?: string;
  RuleStatus?: RuleStatusV2;
  Description?: string;
  Criteria?: Criteria;
  Actions?: (AutomationRulesActionV2 & { Type: AutomationRulesActionTypeV2 })[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetConfigurationPolicyRequest {
  Identifier: string;
}
export interface GetConfigurationPolicyResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  ConfigurationPolicy?: Policy;
}
export interface GetConfigurationPolicyAssociationRequest {
  Target?: Target;
}
export interface GetConfigurationPolicyAssociationResponse {
  ConfigurationPolicyId?: string;
  TargetId?: string;
  TargetType?: TargetType;
  AssociationType?: AssociationType;
  UpdatedAt?: Date;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
  AssociationStatusMessage?: string;
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
  Code?: HealthIssueCode;
  Message?: string;
}
export type HealthIssueList = HealthIssue[];
export interface CspmHealthCheck {
  ConnectorStatus?: CspmConnectorStatus;
  Message?: string;
  LastCheckedAt?: Date;
  Issues?: HealthIssue[];
}
export interface AzureDetail {
  AWSConfigConnectorArn?: string;
  ScopeConfiguration?: AzureScopeConfiguration;
  AzureRegions?: string[];
}
export type CspmProviderDetail = { Azure: AzureDetail };
export interface GetConnectorResponse {
  ConnectorArn?: string;
  ConnectorId: string;
  Name: string;
  Description?: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Health: CspmHealthCheck & {
    ConnectorStatus: CspmConnectorStatus;
    LastCheckedAt: Date;
    Issues: (HealthIssue & {
      Code: HealthIssueCode;
      Message: NonEmptyString;
    })[];
  };
  ProviderDetail: CspmProviderDetail;
  CreatedBy?: string;
  EnablementStatus?: CspmEnablementStatus;
}
export interface GetConnectorV2Request {
  ConnectorId: string;
}
export interface HealthCheck {
  ConnectorStatus?: ConnectorStatus;
  Message?: string;
  LastCheckedAt?: Date;
  Issues?: HealthIssue[];
}
export type ConnectorAuthStatus = "ACTIVE" | "FAILED" | (string & {});
export interface JiraCloudDetail {
  CloudId?: string;
  ProjectKey?: string;
  Domain?: string;
  AuthUrl?: string;
  AuthStatus?: ConnectorAuthStatus;
}
export interface ServiceNowDetail {
  InstanceName?: string;
  SecretArn?: string;
  AuthStatus?: ConnectorAuthStatus;
}
export type ProviderDetail =
  | { JiraCloud: JiraCloudDetail; ServiceNow?: never; Azure?: never }
  | { JiraCloud?: never; ServiceNow: ServiceNowDetail; Azure?: never }
  | { JiraCloud?: never; ServiceNow?: never; Azure: AzureDetail };
export interface GetConnectorV2Response {
  ConnectorArn?: string;
  ConnectorId: string;
  Name: string;
  Description?: string;
  KmsKeyArn?: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Health: HealthCheck & {
    ConnectorStatus: ConnectorStatus;
    LastCheckedAt: Date;
    Issues: (HealthIssue & {
      Code: HealthIssueCode;
      Message: NonEmptyString;
    })[];
  };
  ProviderDetail: ProviderDetail;
  EnablementStatus?: EnablementStatus;
  EnablementStatusReason?: string;
}
export interface GetEnabledStandardsRequest {
  StandardsSubscriptionArns?: string[];
  NextToken?: string;
  MaxResults?: number;
  Providers?: StandardsProvider[];
}
export interface GetEnabledStandardsResponse {
  StandardsSubscriptions?: (StandardsSubscription & {
    StandardsSubscriptionArn: NonEmptyString;
    StandardsArn: NonEmptyString;
    StandardsInput: StandardsInputParameterMap;
    StandardsStatus: StandardsStatus;
    StandardsStatusReason: StandardsStatusReason & {
      StatusReasonCode: StatusReasonCode;
    };
  })[];
  NextToken?: string;
}
export interface GetFindingAggregatorRequest {
  FindingAggregatorArn: string;
}
export interface GetFindingAggregatorResponse {
  FindingAggregatorArn?: string;
  FindingAggregationRegion?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export interface GetFindingHistoryRequest {
  FindingIdentifier?: AwsSecurityFindingIdentifier;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export type FindingHistoryUpdateSourceType =
  | "BATCH_UPDATE_FINDINGS"
  | "BATCH_IMPORT_FINDINGS"
  | (string & {});
export interface FindingHistoryUpdateSource {
  Type?: FindingHistoryUpdateSourceType;
  Identity?: string;
}
export interface FindingHistoryUpdate {
  UpdatedField?: string;
  OldValue?: string;
  NewValue?: string;
}
export type FindingHistoryUpdatesList = FindingHistoryUpdate[];
export interface FindingHistoryRecord {
  FindingIdentifier?: AwsSecurityFindingIdentifier;
  UpdateTime?: Date;
  FindingCreated?: boolean;
  UpdateSource?: FindingHistoryUpdateSource;
  Updates?: FindingHistoryUpdate[];
  NextToken?: string;
}
export type FindingHistoryRecordList = FindingHistoryRecord[];
export interface GetFindingHistoryResponse {
  Records?: (FindingHistoryRecord & {
    FindingIdentifier: AwsSecurityFindingIdentifier & {
      Id: NonEmptyString;
      ProductArn: NonEmptyString;
    };
  })[];
  NextToken?: string;
}
export type SortOrder = "asc" | "desc" | (string & {});
export interface SortCriterion {
  Field?: string;
  SortOrder?: SortOrder;
}
export type SortCriteria = SortCriterion[];
export interface GetFindingsRequest {
  Filters?: AwsSecurityFindingFilters;
  SortCriteria?: SortCriterion[];
  NextToken?: string;
  MaxResults?: number;
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
    Compliance: Compliance & {
      StatusReasons: (StatusReason & { ReasonCode: NonEmptyString })[];
    };
    RelatedFindings: (RelatedFinding & {
      ProductArn: NonEmptyString;
      Id: NonEmptyString;
    })[];
    Note: Note & {
      Text: NonEmptyString;
      UpdatedBy: NonEmptyString;
      UpdatedAt: NonEmptyString;
    };
    Vulnerabilities: (Vulnerability & {
      Id: NonEmptyString;
      Vendor: VulnerabilityVendor & { Name: NonEmptyString };
    })[];
    PatchSummary: PatchSummary & { Id: NonEmptyString };
    FindingProviderFields: FindingProviderFields & {
      RelatedFindings: (RelatedFinding & {
        ProductArn: NonEmptyString;
        Id: NonEmptyString;
      })[];
    };
  })[];
  NextToken?: string;
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
  | "metadata.product.name"
  | "metadata.product.uid"
  | "resources.type"
  | "resources.cloud_partition"
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
  Filters?: OcsfFindingFilters;
  GroupByField?: GroupByField;
}
export type GroupByRules = GroupByRule[];
export interface AwsOrganizationScope {
  OrganizationId?: string;
  OrganizationalUnitId?: string;
}
export type AwsOrganizationScopeList = AwsOrganizationScope[];
export interface FindingScopes {
  AwsOrganizations?: AwsOrganizationScope[];
}
export type MaxStatisticResults = number;
export interface GetFindingStatisticsV2Request {
  GroupByRules?: GroupByRule[];
  Scopes?: FindingScopes;
  SortOrder?: SortOrder;
  MaxStatisticResults?: number;
}
export interface GroupByValue {
  FieldValue?: string;
  Count?: number;
}
export type GroupByValues = GroupByValue[];
export interface GroupByResult {
  GroupByField?: string;
  GroupByValues?: GroupByValue[];
}
export type GroupByResults = GroupByResult[];
export interface GetFindingStatisticsV2Response {
  GroupByResults?: GroupByResult[];
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
  FieldName?: FindingsTrendsStringField;
  Filter?: StringFilter;
}
export type FindingsTrendsStringFilterList = FindingsTrendsStringFilter[];
export interface FindingsTrendsCompositeFilter {
  StringFilters?: FindingsTrendsStringFilter[];
  NestedCompositeFilters?: FindingsTrendsCompositeFilter[];
  Operator?: AllowedOperators;
}
export type FindingsTrendsCompositeFilterList = FindingsTrendsCompositeFilter[];
export interface FindingsTrendsFilters {
  CompositeFilters?: FindingsTrendsCompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export interface GetFindingsTrendsV2Request {
  Filters?: FindingsTrendsFilters;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export type GranularityField = "Daily" | "Weekly" | "Monthly" | (string & {});
export type TrendsValueCount = number;
export interface SeverityTrendsCount {
  Unknown?: number;
  Informational?: number;
  Low?: number;
  Medium?: number;
  High?: number;
  Critical?: number;
  Fatal?: number;
  Other?: number;
}
export interface TrendsValues {
  SeverityTrends?: SeverityTrendsCount;
}
export interface TrendsMetricsResult {
  Timestamp?: Date;
  TrendsValues?: TrendsValues;
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
  NextToken?: string;
}
export interface GetFindingsV2Request {
  Filters?: OcsfFindingFilters;
  Scopes?: FindingScopes;
  SortCriteria?: SortCriterion[];
  NextToken?: string;
  MaxResults?: number;
}
export type OcsfFinding = unknown;
export type OcsfFindingsList = any[];
export interface GetFindingsV2Response {
  Findings?: any[];
  NextToken?: string;
}
export interface GetInsightResultsRequest {
  InsightArn: string;
}
export interface InsightResultValue {
  GroupByAttributeValue?: string;
  Count?: number;
}
export type InsightResultValueList = InsightResultValue[];
export interface InsightResults {
  InsightArn?: string;
  GroupByAttribute?: string;
  ResultValues?: InsightResultValue[];
}
export interface GetInsightResultsResponse {
  InsightResults: InsightResults & {
    InsightArn: NonEmptyString;
    GroupByAttribute: NonEmptyString;
    ResultValues: (InsightResultValue & {
      GroupByAttributeValue: NonEmptyString;
      Count: number;
    })[];
  };
}
export interface GetInsightsRequest {
  InsightArns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface Insight {
  InsightArn?: string;
  Name?: string;
  Filters?: AwsSecurityFindingFilters;
  GroupByAttribute?: string;
}
export type InsightList = Insight[];
export interface GetInsightsResponse {
  Insights: (Insight & {
    InsightArn: NonEmptyString;
    Name: NonEmptyString;
    Filters: AwsSecurityFindingFilters;
    GroupByAttribute: NonEmptyString;
  })[];
  NextToken?: string;
}
export interface GetInvitationsCountRequest {}
export interface GetInvitationsCountResponse {
  InvitationsCount?: number;
}
export interface GetMasterAccountRequest {}
export interface GetMasterAccountResponse {
  Master?: Invitation;
}
export interface GetMembersRequest {
  AccountIds?: string[];
}
export interface Member {
  AccountId?: string;
  Email?: string;
  MasterId?: string;
  AdministratorId?: string;
  MemberStatus?: string;
  InvitedAt?: Date;
  UpdatedAt?: Date;
}
export type MemberList = Member[];
export interface GetMembersResponse {
  Members?: Member[];
  UnprocessedAccounts?: Result[];
}
export interface GetRecommendedPolicyV2Request {
  MetadataUid: string;
  NextToken?: string;
  MaxResults?: number;
}
export type RecommendationType =
  | "UNUSED_PERMISSION_RECOMMENDATION"
  | (string & {});
export interface UnusedPermissionsRecommendationStep {
  RecommendedAction?: string;
  ExistingPolicy?: string;
  ExistingPolicyId?: string;
  PolicyUpdatedAt?: Date;
  RecommendedPolicy?: string;
}
export type RecommendationStep = {
  UnusedPermissions: UnusedPermissionsRecommendationStep;
};
export type RecommendationSteps = RecommendationStep[];
export interface RecommendationError {
  Code?: string;
  Message?: string;
}
export type RecommendationStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface GetRecommendedPolicyV2Response {
  NextToken?: string;
  RecommendationType?: RecommendationType;
  RecommendationSteps?: RecommendationStep[];
  Error?: RecommendationError;
  Status?: RecommendationStatus;
  ResourceArn?: string;
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
  | (string & {});
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
  | (string & {});
export interface ResourcesStringFilter {
  FieldName?: ResourcesStringField;
  Filter?: StringFilter;
}
export type ResourcesStringFilterList = ResourcesStringFilter[];
export type ResourcesDateField =
  | "ResourceDetailCaptureTime"
  | "ResourceCreationTime"
  | (string & {});
export interface ResourcesDateFilter {
  FieldName?: ResourcesDateField;
  Filter?: DateFilter;
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
  FieldName?: ResourcesNumberField;
  Filter?: NumberFilter;
}
export type ResourcesNumberFilterList = ResourcesNumberFilter[];
export type ResourcesMapField = "ResourceTags" | (string & {});
export interface ResourcesMapFilter {
  FieldName?: ResourcesMapField;
  Filter?: MapFilter;
}
export type ResourcesMapFilterList = ResourcesMapFilter[];
export interface ResourcesCompositeFilter {
  StringFilters?: ResourcesStringFilter[];
  DateFilters?: ResourcesDateFilter[];
  NumberFilters?: ResourcesNumberFilter[];
  MapFilters?: ResourcesMapFilter[];
  NestedCompositeFilters?: ResourcesCompositeFilter[];
  Operator?: AllowedOperators;
}
export type ResourcesCompositeFilterList = ResourcesCompositeFilter[];
export interface ResourcesFilters {
  CompositeFilters?: ResourcesCompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export interface ResourceGroupByRule {
  GroupByField?: ResourceGroupByField;
  Filters?: ResourcesFilters;
}
export type ResourceGroupByRules = ResourceGroupByRule[];
export interface ResourceScopes {
  AwsOrganizations?: AwsOrganizationScope[];
}
export interface GetResourcesStatisticsV2Request {
  GroupByRules?: ResourceGroupByRule[];
  Scopes?: ResourceScopes;
  SortOrder?: SortOrder;
  MaxStatisticResults?: number;
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
  FieldName?: ResourcesTrendsStringField;
  Filter?: StringFilter;
}
export type ResourcesTrendsStringFilterList = ResourcesTrendsStringFilter[];
export interface ResourcesTrendsCompositeFilter {
  StringFilters?: ResourcesTrendsStringFilter[];
  NestedCompositeFilters?: ResourcesTrendsCompositeFilter[];
  Operator?: AllowedOperators;
}
export type ResourcesTrendsCompositeFilterList =
  ResourcesTrendsCompositeFilter[];
export interface ResourcesTrendsFilters {
  CompositeFilters?: ResourcesTrendsCompositeFilter[];
  CompositeOperator?: AllowedOperators;
}
export interface GetResourcesTrendsV2Request {
  Filters?: ResourcesTrendsFilters;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export interface ResourcesCount {
  AllResources?: number;
}
export interface ResourcesTrendsValues {
  ResourcesCount?: ResourcesCount;
}
export interface ResourcesTrendsMetricsResult {
  Timestamp?: Date;
  TrendsValues?: ResourcesTrendsValues;
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
  NextToken?: string;
}
export interface GetResourcesV2Request {
  Filters?: ResourcesFilters;
  Scopes?: ResourceScopes;
  SortCriteria?: SortCriterion[];
  NextToken?: string;
  MaxResults?: number;
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
  Other?: number;
  Fatal?: number;
  Critical?: number;
  High?: number;
  Medium?: number;
  Low?: number;
  Informational?: number;
  Unknown?: number;
}
export interface ResourceFindingsSummary {
  FindingType?: string;
  ProductName?: string;
  TotalFindings?: number;
  Severities?: ResourceSeverityBreakdown;
}
export type ResourceFindingsSummaryList = ResourceFindingsSummary[];
export interface ResourceTag {
  Key?: string;
  Value?: string;
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
  HostResourceGuid?: string;
  HostResourceType?: string;
  CanonicalId?: string;
  SelfHostedAIModelResourceCount?: number;
  SelfHostedAIAgentResourceCount?: number;
  SelfHostedAIModelServingResourceCount?: number;
  SelfHostedAIExternalEndpointResourceCount?: number;
  SelfHostedAIDevelopmentResourceCount?: number;
  SelfHostedAIAgentFrameworkResourceCount?: number;
  SelfHostedAIAgentToolsAndIdentityResourceCount?: number;
  SelfHostedTotalAIResourceCount?: number;
}
export interface ResourceInfo {
  AIDetails?: AIDetails;
}
export interface ResourceResult {
  ResourceGuid?: string;
  ResourceId?: string;
  AccountId?: string;
  AccountName?: string;
  Region?: string;
  ResourceProvider?: string;
  ResourceOwnerAccountId?: string;
  ResourceOwnerOrgId?: string;
  ResourceCloudPartition?: string;
  ResourceRegion?: string;
  ResourceCategory?: ResourceCategory;
  ResourceType?: string;
  ResourceName?: string;
  ResourceCreationTimeDt?: string;
  ResourceDetailCaptureTimeDt?: string;
  FindingsSummary?: ResourceFindingsSummary[];
  ResourceTags?: ResourceTag[];
  ResourceConfig?: any;
  ResourceSubCategory?: ResourceSubCategory;
  DiscoveryType?: DiscoveryType;
  ResourceInfo?: ResourceInfo;
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
    ResourceTags: (ResourceTag & {
      Key: NonEmptyString;
      Value: NonEmptyString;
    })[];
  })[];
  NextToken?: string;
}
export interface GetSecurityControlDefinitionRequest {
  SecurityControlId?: string;
}
export type RegionAvailabilityStatus =
  | "AVAILABLE"
  | "UNAVAILABLE"
  | (string & {});
export type SecurityControlProperty = "Parameters" | (string & {});
export type CustomizableProperties = SecurityControlProperty[];
export interface IntegerConfigurationOptions {
  DefaultValue?: number;
  Min?: number;
  Max?: number;
}
export interface IntegerListConfigurationOptions {
  DefaultValue?: number[];
  Min?: number;
  Max?: number;
  MaxItems?: number;
}
export interface DoubleConfigurationOptions {
  DefaultValue?: number;
  Min?: number;
  Max?: number;
}
export interface StringConfigurationOptions {
  DefaultValue?: string;
  Re2Expression?: string;
  ExpressionDescription?: string;
}
export interface StringListConfigurationOptions {
  DefaultValue?: string[];
  Re2Expression?: string;
  MaxItems?: number;
  ExpressionDescription?: string;
}
export interface BooleanConfigurationOptions {
  DefaultValue?: boolean;
}
export interface EnumConfigurationOptions {
  DefaultValue?: string;
  AllowedValues?: string[];
}
export interface EnumListConfigurationOptions {
  DefaultValue?: string[];
  MaxItems?: number;
  AllowedValues?: string[];
}
export type ConfigurationOptions =
  | {
      Integer: IntegerConfigurationOptions;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList: IntegerListConfigurationOptions;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double: DoubleConfigurationOptions;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String: StringConfigurationOptions;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList: StringListConfigurationOptions;
      Boolean?: never;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean: BooleanConfigurationOptions;
      Enum?: never;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum: EnumConfigurationOptions;
      EnumList?: never;
    }
  | {
      Integer?: never;
      IntegerList?: never;
      Double?: never;
      String?: never;
      StringList?: never;
      Boolean?: never;
      Enum?: never;
      EnumList: EnumListConfigurationOptions;
    };
export interface ParameterDefinition {
  Description?: string;
  ConfigurationOptions?: ConfigurationOptions;
}
export type ParameterDefinitions = {
  [key: string]: ParameterDefinition | undefined;
};
export interface SecurityControlDefinition {
  SecurityControlId?: string;
  Title?: string;
  Description?: string;
  RemediationUrl?: string;
  SeverityRating?: SeverityRating;
  CurrentRegionAvailability?: RegionAvailabilityStatus;
  CustomizableProperties?: SecurityControlProperty[];
  ParameterDefinitions?: { [key: string]: ParameterDefinition | undefined };
  Provider?: SecurityControlsProvider;
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
export interface InviteMembersRequest {
  AccountIds?: string[];
}
export interface InviteMembersResponse {
  UnprocessedAccounts?: Result[];
}
export interface ListAggregatorsV2Request {
  NextToken?: string;
  MaxResults?: number;
}
export interface AggregatorV2 {
  AggregatorV2Arn?: string;
}
export type AggregatorV2List = AggregatorV2[];
export interface ListAggregatorsV2Response {
  AggregatorsV2?: AggregatorV2[];
  NextToken?: string;
}
export interface ListAutomationRulesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface AutomationRulesMetadata {
  RuleArn?: string;
  RuleStatus?: RuleStatus;
  RuleOrder?: number;
  RuleName?: string;
  Description?: string;
  IsTerminal?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
}
export type AutomationRulesMetadataList = AutomationRulesMetadata[];
export interface ListAutomationRulesResponse {
  AutomationRulesMetadata?: AutomationRulesMetadata[];
  NextToken?: string;
}
export interface ListAutomationRulesV2Request {
  NextToken?: string;
  MaxResults?: number;
}
export interface AutomationRulesActionTypeObjectV2 {
  Type?: AutomationRulesActionTypeV2;
}
export type AutomationRulesActionTypeListV2 =
  AutomationRulesActionTypeObjectV2[];
export interface AutomationRulesMetadataV2 {
  RuleArn?: string;
  RuleId?: string;
  RuleOrder?: number;
  RuleName?: string;
  RuleStatus?: RuleStatusV2;
  Description?: string;
  Actions?: AutomationRulesActionTypeObjectV2[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type AutomationRulesMetadataListV2 = AutomationRulesMetadataV2[];
export interface ListAutomationRulesV2Response {
  Rules?: AutomationRulesMetadataV2[];
  NextToken?: string;
}
export interface ListConfigurationPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ConfigurationPolicySummary {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  ServiceEnabled?: boolean;
}
export type ConfigurationPolicySummaryList = ConfigurationPolicySummary[];
export interface ListConfigurationPoliciesResponse {
  ConfigurationPolicySummaries?: ConfigurationPolicySummary[];
  NextToken?: string;
}
export interface AssociationFilters {
  ConfigurationPolicyId?: string;
  AssociationType?: AssociationType;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
}
export interface ListConfigurationPolicyAssociationsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: AssociationFilters;
}
export type ConfigurationPolicyAssociationSummaryList =
  ConfigurationPolicyAssociationSummary[];
export interface ListConfigurationPolicyAssociationsResponse {
  ConfigurationPolicyAssociationSummaries?: ConfigurationPolicyAssociationSummary[];
  NextToken?: string;
}
export type CspmConnectorProviderName = "AZURE" | (string & {});
export interface ListConnectorsRequest {
  NextToken?: string;
  MaxResults?: number;
  ProviderName?: CspmConnectorProviderName;
  ConnectorStatus?: CspmConnectorStatus;
  EnablementStatus?: CspmEnablementStatus;
}
export interface CspmProviderSummary {
  ProviderName?: CspmConnectorProviderName;
  ConnectorStatus?: CspmConnectorStatus;
  ProviderConfiguration?: CspmProviderDetail;
}
export interface CspmConnectorSummary {
  ConnectorArn?: string;
  ConnectorId?: string;
  Name?: string;
  Description?: string;
  ProviderSummary?: CspmProviderSummary;
  CreatedAt?: Date;
  CreatedBy?: string;
  EnablementStatus?: CspmEnablementStatus;
}
export type CspmConnectorSummaryList = CspmConnectorSummary[];
export interface ListConnectorsResponse {
  NextToken?: string;
  Connectors: CspmConnectorSummary[];
}
export type ConnectorProviderName =
  | "JIRA_CLOUD"
  | "SERVICENOW"
  | "AZURE"
  | (string & {});
export interface ListConnectorsV2Request {
  NextToken?: string;
  MaxResults?: number;
  ProviderName?: ConnectorProviderName;
  ConnectorStatus?: ConnectorStatus;
  EnablementStatus?: EnablementStatus;
}
export interface ProviderSummary {
  ProviderName?: ConnectorProviderName;
  ConnectorStatus?: ConnectorStatus;
  ProviderConfiguration?: ProviderDetail;
}
export interface ConnectorSummary {
  ConnectorArn?: string;
  ConnectorId?: string;
  Name?: string;
  Description?: string;
  ProviderSummary?: ProviderSummary;
  CreatedAt?: Date;
  EnablementStatus?: EnablementStatus;
  EnablementStatusReason?: string;
}
export type ConnectorSummaryList = ConnectorSummary[];
export interface ListConnectorsV2Response {
  NextToken?: string;
  Connectors: (ConnectorSummary & {
    ConnectorId: NonEmptyString;
    Name: NonEmptyString;
    ProviderSummary: ProviderSummary;
    CreatedAt: Date;
  })[];
}
export interface ListEnabledProductsForImportRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type ProductSubscriptionArnList = string[];
export interface ListEnabledProductsForImportResponse {
  ProductSubscriptions?: string[];
  NextToken?: string;
}
export interface ListFindingAggregatorsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface FindingAggregator {
  FindingAggregatorArn?: string;
}
export type FindingAggregatorList = FindingAggregator[];
export interface ListFindingAggregatorsResponse {
  FindingAggregators?: FindingAggregator[];
  NextToken?: string;
}
export type FreeTrialAccountId = string;
export type FreeTrialAccountIdList = string[];
export type FreeTrialStatusValue = "ACTIVE" | "INACTIVE" | (string & {});
export type FreeTrialStatusValueList = FreeTrialStatusValue[];
export interface ListFreeTrialStatusesV2Request {
  AccountIds?: string[];
  Statuses?: FreeTrialStatusValue[];
  MaxResults?: number;
  NextToken?: string;
}
export type FreeTrialType =
  | "SECURITY_HUB_V2"
  | "SECURITY_HUB_V2_MULTI_CLOUD_AZURE"
  | (string & {});
export interface FreeTrialStatus {
  FeatureType?: FreeTrialType;
  Status?: FreeTrialStatusValue;
  StartedAt?: Date;
  ExpiresAt?: Date;
}
export type FreeTrialStatusList = FreeTrialStatus[];
export interface AccountFreeTrialStatus {
  AccountId?: string;
  EvaluatedAt?: Date;
  FreeTrialStatuses?: FreeTrialStatus[];
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
  NextToken?: string;
}
export type CrossAccountMaxResults = number;
export interface ListInvitationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type InvitationList = Invitation[];
export interface ListInvitationsResponse {
  Invitations?: Invitation[];
  NextToken?: string;
}
export interface ListMembersRequest {
  OnlyAssociated?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListMembersResponse {
  Members?: Member[];
  NextToken?: string;
}
export type AdminsMaxResults = number;
export interface ListOrganizationAdminAccountsRequest {
  MaxResults?: number;
  NextToken?: string;
  Feature?: SecurityHubFeature;
}
export type AdminStatus = "ENABLED" | "DISABLE_IN_PROGRESS" | (string & {});
export interface AdminAccount {
  AccountId?: string;
  Status?: AdminStatus;
}
export type AdminAccounts = AdminAccount[];
export interface ListOrganizationAdminAccountsResponse {
  AdminAccounts?: AdminAccount[];
  NextToken?: string;
  Feature?: SecurityHubFeature;
}
export type SecurityControlsProviders = SecurityControlsProvider[];
export interface ListSecurityControlDefinitionsRequest {
  StandardsArn?: string;
  NextToken?: string;
  MaxResults?: number;
  Providers?: SecurityControlsProvider[];
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
  NextToken?: string;
}
export interface ListStandardsControlAssociationsRequest {
  SecurityControlId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface StandardsControlAssociationSummary {
  StandardsArn?: string;
  SecurityControlId?: string;
  SecurityControlArn?: string;
  AssociationStatus?: AssociationStatus;
  RelatedRequirements?: string[];
  UpdatedAt?: Date;
  UpdatedReason?: string;
  StandardsControlTitle?: string;
  StandardsControlDescription?: string;
}
export type StandardsControlAssociationSummaries =
  StandardsControlAssociationSummary[];
export interface ListStandardsControlAssociationsResponse {
  StandardsControlAssociationSummaries: (StandardsControlAssociationSummary & {
    StandardsArn: NonEmptyString;
    SecurityControlId: NonEmptyString;
    SecurityControlArn: NonEmptyString;
    AssociationStatus: AssociationStatus;
  })[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface RegisterConnectorV2Request {
  AuthCode?: string;
  AuthState?: string;
}
export interface RegisterConnectorV2Response {
  ConnectorArn?: string;
  ConnectorId: string;
}
export interface StartConfigurationPolicyAssociationRequest {
  ConfigurationPolicyIdentifier?: string;
  Target?: Target;
}
export interface StartConfigurationPolicyAssociationResponse {
  ConfigurationPolicyId?: string;
  TargetId?: string;
  TargetType?: TargetType;
  AssociationType?: AssociationType;
  UpdatedAt?: Date;
  AssociationStatus?: ConfigurationPolicyAssociationStatus;
  AssociationStatusMessage?: string;
}
export interface StartConfigurationPolicyDisassociationRequest {
  Target?: Target;
  ConfigurationPolicyIdentifier?: string;
}
export interface StartConfigurationPolicyDisassociationResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateActionTargetRequest {
  ActionTargetArn: string;
  Name?: string;
  Description?: string;
}
export interface UpdateActionTargetResponse {}
export interface UpdateAggregatorV2Request {
  AggregatorV2Arn: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export interface UpdateAggregatorV2Response {
  AggregatorV2Arn?: string;
  AggregationRegion?: string;
  RegionLinkingMode?: string;
  LinkedRegions?: string[];
}
export interface UpdateAutomationRuleV2Request {
  Identifier: string;
  RuleStatus?: RuleStatusV2;
  RuleOrder?: number;
  Description?: string;
  RuleName?: string;
  Criteria?: Criteria;
  Actions?: AutomationRulesActionV2[];
}
export interface UpdateAutomationRuleV2Response {}
export interface UpdateConfigurationPolicyRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
  UpdatedReason?: string;
  ConfigurationPolicy?: Policy;
}
export interface UpdateConfigurationPolicyResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
  ConfigurationPolicy?: Policy;
}
export interface AzureUpdateConfiguration {
  ScopeConfiguration?: AzureScopeConfiguration;
  AzureRegions?: string[];
}
export type CspmProviderUpdateConfiguration = {
  Azure: AzureUpdateConfiguration;
};
export interface UpdateConnectorRequest {
  ConnectorId: string;
  Description?: string;
  Provider?: CspmProviderUpdateConfiguration;
}
export interface UpdateConnectorResponse {
  ConnectorStatus?: CspmConnectorStatus;
  EnablementStatus?: CspmEnablementStatus;
}
export interface JiraCloudUpdateConfiguration {
  ProjectKey?: string;
}
export interface ServiceNowUpdateConfiguration {
  SecretArn?: string;
}
export type ProviderUpdateConfiguration =
  | {
      JiraCloud: JiraCloudUpdateConfiguration;
      ServiceNow?: never;
      Azure?: never;
    }
  | {
      JiraCloud?: never;
      ServiceNow: ServiceNowUpdateConfiguration;
      Azure?: never;
    }
  | { JiraCloud?: never; ServiceNow?: never; Azure: AzureUpdateConfiguration };
export interface UpdateConnectorV2Request {
  ConnectorId: string;
  Description?: string;
  Provider?: ProviderUpdateConfiguration;
}
export interface UpdateConnectorV2Response {
  ConnectorStatus?: ConnectorStatus;
  EnablementStatus?: EnablementStatus;
}
export interface UpdateFindingAggregatorRequest {
  FindingAggregatorArn?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export interface UpdateFindingAggregatorResponse {
  FindingAggregatorArn?: string;
  FindingAggregationRegion?: string;
  RegionLinkingMode?: string;
  Regions?: string[];
}
export interface UpdateFindingsRequest {
  Filters?: AwsSecurityFindingFilters;
  Note?: NoteUpdate;
  RecordState?: RecordState;
}
export interface UpdateFindingsResponse {}
export interface UpdateInsightRequest {
  InsightArn: string;
  Name?: string;
  Filters?: AwsSecurityFindingFilters;
  GroupByAttribute?: string;
}
export interface UpdateInsightResponse {}
export interface UpdateOrganizationConfigurationRequest {
  AutoEnable?: boolean;
  AutoEnableStandards?: AutoEnableStandards;
  OrganizationConfiguration?: OrganizationConfiguration;
}
export interface UpdateOrganizationConfigurationResponse {}
export interface UpdateSecurityControlRequest {
  SecurityControlId?: string;
  Parameters?: { [key: string]: ParameterConfiguration | undefined };
  LastUpdateReason?: string;
}
export interface UpdateSecurityControlResponse {}
export interface UpdateSecurityHubConfigurationRequest {
  AutoEnableControls?: boolean;
  ControlFindingGenerator?: ControlFindingGenerator;
}
export interface UpdateSecurityHubConfigurationResponse {}
export interface UpdateStandardsControlRequest {
  StandardsControlArn: string;
  ControlStatus?: ControlStatus;
  DisabledReason?: string;
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
  AcceptAdministratorInvitationRequest,
  AcceptAdministratorInvitationResponse,
  AcceptAdministratorInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /administrator",
    input: { AdministratorId: 0, InvitationId: 0 },
    body: true,
  },
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
})) as any;

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
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /master",
    input: { MasterId: 0, InvitationId: 0 },
    body: true,
  },
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
})) as any;

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
  BatchDeleteAutomationRulesRequest,
  BatchDeleteAutomationRulesResponse,
  BatchDeleteAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /automationrules/delete",
    input: { AutomationRulesArns: 0 },
    body: true,
  },
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
})) as any;

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
  BatchDisableStandardsRequest,
  BatchDisableStandardsResponse,
  BatchDisableStandardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /standards/deregister",
    input: { StandardsSubscriptionArns: 0 },
    body: true,
  },
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
})) as any;

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
  BatchEnableStandardsRequest,
  BatchEnableStandardsResponse,
  BatchEnableStandardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /standards/register",
    input: {
      StandardsSubscriptionRequests: D.list({
        StandardsArn: 0,
        StandardsInput: 0,
      }),
    },
    body: true,
  },
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
})) as any;

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
  BatchGetAutomationRulesRequest,
  BatchGetAutomationRulesResponse,
  BatchGetAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /automationrules/get",
    input: { AutomationRulesArns: 0 },
    output: { Rules: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
    body: true,
  },
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
})) as any;

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
  BatchGetConfigurationPolicyAssociationsRequest,
  BatchGetConfigurationPolicyAssociationsResponse,
  BatchGetConfigurationPolicyAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationPolicyAssociation/batchget",
    input: {
      ConfigurationPolicyAssociationIdentifiers: D.list({ Target: i_Target }),
    },
    output: {
      ConfigurationPolicyAssociations: D.list(
        o_ConfigurationPolicyAssociationSummary,
      ),
    },
    body: true,
  },
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
})) as any;

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
  BatchGetSecurityControlsRequest,
  BatchGetSecurityControlsResponse,
  BatchGetSecurityControlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /securityControls/batchGet",
    input: { SecurityControlIds: 0 },
    body: true,
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecurityControls",
})) as any;

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
  BatchGetStandardsControlAssociationsRequest,
  BatchGetStandardsControlAssociationsResponse,
  BatchGetStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /associations/batchGet",
    input: {
      StandardsControlAssociationIds: D.list({
        SecurityControlId: 0,
        StandardsArn: 0,
      }),
    },
    output: { StandardsControlAssociationDetails: D.list({ UpdatedAt: D.ts }) },
    body: true,
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetStandardsControlAssociations",
})) as any;

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
  BatchImportFindingsRequest,
  BatchImportFindingsResponse,
  BatchImportFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/import",
    input: {
      Findings: D.list({
        SchemaVersion: 0,
        Id: 0,
        ProductArn: 0,
        ProductName: 0,
        CompanyName: 0,
        Region: 0,
        GeneratorId: 0,
        AwsAccountId: 0,
        Types: 0,
        FirstObservedAt: 0,
        LastObservedAt: 0,
        CreatedAt: 0,
        UpdatedAt: 0,
        Severity: { Product: 0, Label: 0, Normalized: 0, Original: 0 },
        Confidence: 0,
        Criticality: 0,
        Title: 0,
        Description: 0,
        Remediation: { Recommendation: { Text: 0, Url: 0 } },
        SourceUrl: 0,
        ProductFields: 0,
        UserDefinedFields: 0,
        Malware: D.list({ Name: 0, Type: 0, Path: 0, State: 0 }),
        Network: {
          Direction: 0,
          Protocol: 0,
          OpenPortRange: i_PortRange,
          SourceIpV4: 0,
          SourceIpV6: 0,
          SourcePort: 0,
          SourceDomain: 0,
          SourceMac: 0,
          DestinationIpV4: 0,
          DestinationIpV6: 0,
          DestinationPort: 0,
          DestinationDomain: 0,
        },
        NetworkPath: D.list({
          ComponentId: 0,
          ComponentType: 0,
          Egress: i_NetworkHeader,
          Ingress: i_NetworkHeader,
        }),
        Process: {
          Name: 0,
          Path: 0,
          Pid: 0,
          ParentPid: 0,
          LaunchedAt: 0,
          TerminatedAt: 0,
        },
        Threats: D.list({
          Name: 0,
          Severity: 0,
          ItemCount: 0,
          FilePaths: D.list({
            FilePath: 0,
            FileName: 0,
            ResourceId: 0,
            Hash: 0,
          }),
        }),
        ThreatIntelIndicators: D.list({
          Type: 0,
          Value: 0,
          Category: 0,
          LastObservedAt: 0,
          Source: 0,
          SourceUrl: 0,
        }),
        Resources: D.list({
          Type: 0,
          Id: 0,
          Partition: 0,
          Region: 0,
          Provider: 0,
          Owner: { Account: { Id: 0 }, Org: { Id: 0 } },
          ResourceRole: 0,
          Tags: 0,
          DataClassification: {
            DetailedResultsLocation: 0,
            Result: {
              MimeType: 0,
              SizeClassified: 0,
              AdditionalOccurrences: 0,
              Status: { Code: 0, Reason: 0 },
              SensitiveData: D.list({
                Category: 0,
                Detections: D.list({
                  Count: 0,
                  Type: 0,
                  Occurrences: i_Occurrences,
                }),
                TotalCount: 0,
              }),
              CustomDataIdentifiers: {
                Detections: D.list({
                  Count: 0,
                  Arn: 0,
                  Name: 0,
                  Occurrences: i_Occurrences,
                }),
                TotalCount: 0,
              },
            },
          },
          Details: {
            AwsAutoScalingAutoScalingGroup: {
              LaunchConfigurationName: 0,
              LoadBalancerNames: 0,
              HealthCheckType: 0,
              HealthCheckGracePeriod: 0,
              CreatedTime: 0,
              MixedInstancesPolicy: {
                InstancesDistribution: {
                  OnDemandAllocationStrategy: 0,
                  OnDemandBaseCapacity: 0,
                  OnDemandPercentageAboveBaseCapacity: 0,
                  SpotAllocationStrategy: 0,
                  SpotInstancePools: 0,
                  SpotMaxPrice: 0,
                },
                LaunchTemplate: {
                  LaunchTemplateSpecification: {
                    LaunchTemplateId: 0,
                    LaunchTemplateName: 0,
                    Version: 0,
                  },
                  Overrides: D.list({ InstanceType: 0, WeightedCapacity: 0 }),
                },
              },
              AvailabilityZones: D.list({ Value: 0 }),
              LaunchTemplate: {
                LaunchTemplateId: 0,
                LaunchTemplateName: 0,
                Version: 0,
              },
              CapacityRebalance: 0,
            },
            AwsCodeBuildProject: {
              EncryptionKey: 0,
              Artifacts: D.list(i_AwsCodeBuildProjectArtifactsDetails),
              Environment: {
                Certificate: 0,
                EnvironmentVariables: D.list({ Name: 0, Type: 0, Value: 0 }),
                PrivilegedMode: 0,
                ImagePullCredentialsType: 0,
                RegistryCredential: { Credential: 0, CredentialProvider: 0 },
                Type: 0,
              },
              Name: 0,
              Source: {
                Type: 0,
                Location: 0,
                GitCloneDepth: 0,
                InsecureSsl: 0,
              },
              ServiceRole: 0,
              LogsConfig: {
                CloudWatchLogs: { GroupName: 0, Status: 0, StreamName: 0 },
                S3Logs: { EncryptionDisabled: 0, Location: 0, Status: 0 },
              },
              VpcConfig: { VpcId: 0, Subnets: 0, SecurityGroupIds: 0 },
              SecondaryArtifacts: D.list(i_AwsCodeBuildProjectArtifactsDetails),
            },
            AwsCloudFrontDistribution: {
              CacheBehaviors: { Items: D.list({ ViewerProtocolPolicy: 0 }) },
              DefaultCacheBehavior: { ViewerProtocolPolicy: 0 },
              DefaultRootObject: 0,
              DomainName: 0,
              ETag: 0,
              LastModifiedTime: 0,
              Logging: { Bucket: 0, Enabled: 0, IncludeCookies: 0, Prefix: 0 },
              Origins: {
                Items: D.list({
                  DomainName: 0,
                  Id: 0,
                  OriginPath: 0,
                  S3OriginConfig: { OriginAccessIdentity: 0 },
                  CustomOriginConfig: {
                    HttpPort: 0,
                    HttpsPort: 0,
                    OriginKeepaliveTimeout: 0,
                    OriginProtocolPolicy: 0,
                    OriginReadTimeout: 0,
                    OriginSslProtocols: { Items: 0, Quantity: 0 },
                  },
                }),
              },
              OriginGroups: {
                Items: D.list({
                  FailoverCriteria: { StatusCodes: { Items: 0, Quantity: 0 } },
                }),
              },
              ViewerCertificate: {
                AcmCertificateArn: 0,
                Certificate: 0,
                CertificateSource: 0,
                CloudFrontDefaultCertificate: 0,
                IamCertificateId: 0,
                MinimumProtocolVersion: 0,
                SslSupportMethod: 0,
              },
              Status: 0,
              WebAclId: 0,
            },
            AwsEc2Instance: {
              Type: 0,
              ImageId: 0,
              IpV4Addresses: 0,
              IpV6Addresses: 0,
              KeyName: 0,
              IamInstanceProfileArn: 0,
              VpcId: 0,
              SubnetId: 0,
              LaunchedAt: 0,
              NetworkInterfaces: D.list({ NetworkInterfaceId: 0 }),
              VirtualizationType: 0,
              MetadataOptions: {
                HttpEndpoint: 0,
                HttpProtocolIpv6: 0,
                HttpPutResponseHopLimit: 0,
                HttpTokens: 0,
                InstanceMetadataTags: 0,
              },
              Monitoring: { State: 0 },
            },
            AwsEc2NetworkInterface: {
              Attachment: {
                AttachTime: 0,
                AttachmentId: 0,
                DeleteOnTermination: 0,
                DeviceIndex: 0,
                InstanceId: 0,
                InstanceOwnerId: 0,
                Status: 0,
              },
              NetworkInterfaceId: 0,
              SecurityGroups: D.list({ GroupName: 0, GroupId: 0 }),
              SourceDestCheck: 0,
              IpV6Addresses: D.list({ IpV6Address: 0 }),
              PrivateIpAddresses: D.list({
                PrivateIpAddress: 0,
                PrivateDnsName: 0,
              }),
              PublicDnsName: 0,
              PublicIp: 0,
            },
            AwsEc2SecurityGroup: {
              GroupName: 0,
              GroupId: 0,
              OwnerId: 0,
              VpcId: 0,
              IpPermissions: D.list(i_AwsEc2SecurityGroupIpPermission),
              IpPermissionsEgress: D.list(i_AwsEc2SecurityGroupIpPermission),
            },
            AwsEc2Volume: {
              CreateTime: 0,
              DeviceName: 0,
              Encrypted: 0,
              Size: 0,
              SnapshotId: 0,
              Status: 0,
              KmsKeyId: 0,
              Attachments: D.list({
                AttachTime: 0,
                DeleteOnTermination: 0,
                InstanceId: 0,
                Status: 0,
              }),
              VolumeId: 0,
              VolumeType: 0,
              VolumeScanStatus: 0,
            },
            AwsEc2Vpc: {
              CidrBlockAssociationSet: D.list({
                AssociationId: 0,
                CidrBlock: 0,
                CidrBlockState: 0,
              }),
              Ipv6CidrBlockAssociationSet: D.list(i_Ipv6CidrBlockAssociation),
              DhcpOptionsId: 0,
              State: 0,
            },
            AwsEc2Eip: {
              InstanceId: 0,
              PublicIp: 0,
              AllocationId: 0,
              AssociationId: 0,
              Domain: 0,
              PublicIpv4Pool: 0,
              NetworkBorderGroup: 0,
              NetworkInterfaceId: 0,
              NetworkInterfaceOwnerId: 0,
              PrivateIpAddress: 0,
            },
            AwsEc2Subnet: {
              AssignIpv6AddressOnCreation: 0,
              AvailabilityZone: 0,
              AvailabilityZoneId: 0,
              AvailableIpAddressCount: 0,
              CidrBlock: 0,
              DefaultForAz: 0,
              MapPublicIpOnLaunch: 0,
              OwnerId: 0,
              State: 0,
              SubnetArn: 0,
              SubnetId: 0,
              VpcId: 0,
              Ipv6CidrBlockAssociationSet: D.list(i_Ipv6CidrBlockAssociation),
            },
            AwsEc2NetworkAcl: {
              IsDefault: 0,
              NetworkAclId: 0,
              OwnerId: 0,
              VpcId: 0,
              Associations: D.list({
                NetworkAclAssociationId: 0,
                NetworkAclId: 0,
                SubnetId: 0,
              }),
              Entries: D.list({
                CidrBlock: 0,
                Egress: 0,
                IcmpTypeCode: { Code: 0, Type: 0 },
                Ipv6CidrBlock: 0,
                PortRange: { From: 0, To: 0 },
                Protocol: 0,
                RuleAction: 0,
                RuleNumber: 0,
              }),
            },
            AwsElbv2LoadBalancer: {
              AvailabilityZones: D.list({ ZoneName: 0, SubnetId: 0 }),
              CanonicalHostedZoneId: 0,
              CreatedTime: 0,
              DNSName: 0,
              IpAddressType: 0,
              Scheme: 0,
              SecurityGroups: 0,
              State: { Code: 0, Reason: 0 },
              Type: 0,
              VpcId: 0,
              LoadBalancerAttributes: D.list({ Key: 0, Value: 0 }),
            },
            AwsElasticBeanstalkEnvironment: {
              ApplicationName: 0,
              Cname: 0,
              DateCreated: 0,
              DateUpdated: 0,
              Description: 0,
              EndpointUrl: 0,
              EnvironmentArn: 0,
              EnvironmentId: 0,
              EnvironmentLinks: D.list({ EnvironmentName: 0, LinkName: 0 }),
              EnvironmentName: 0,
              OptionSettings: D.list({
                Namespace: 0,
                OptionName: 0,
                ResourceName: 0,
                Value: 0,
              }),
              PlatformArn: 0,
              SolutionStackName: 0,
              Status: 0,
              Tier: { Name: 0, Type: 0, Version: 0 },
              VersionLabel: 0,
            },
            AwsElasticsearchDomain: {
              AccessPolicies: 0,
              DomainEndpointOptions: { EnforceHTTPS: 0, TLSSecurityPolicy: 0 },
              DomainId: 0,
              DomainName: 0,
              Endpoint: 0,
              Endpoints: 0,
              ElasticsearchVersion: 0,
              ElasticsearchClusterConfig: {
                DedicatedMasterCount: 0,
                DedicatedMasterEnabled: 0,
                DedicatedMasterType: 0,
                InstanceCount: 0,
                InstanceType: 0,
                ZoneAwarenessConfig: { AvailabilityZoneCount: 0 },
                ZoneAwarenessEnabled: 0,
              },
              EncryptionAtRestOptions: { Enabled: 0, KmsKeyId: 0 },
              LogPublishingOptions: {
                IndexSlowLogs:
                  i_AwsElasticsearchDomainLogPublishingOptionsLogConfig,
                SearchSlowLogs:
                  i_AwsElasticsearchDomainLogPublishingOptionsLogConfig,
                AuditLogs:
                  i_AwsElasticsearchDomainLogPublishingOptionsLogConfig,
              },
              NodeToNodeEncryptionOptions: { Enabled: 0 },
              ServiceSoftwareOptions: {
                AutomatedUpdateDate: 0,
                Cancellable: 0,
                CurrentVersion: 0,
                Description: 0,
                NewVersion: 0,
                UpdateAvailable: 0,
                UpdateStatus: 0,
              },
              VPCOptions: {
                AvailabilityZones: 0,
                SecurityGroupIds: 0,
                SubnetIds: 0,
                VPCId: 0,
              },
            },
            AwsS3Bucket: {
              OwnerId: 0,
              OwnerName: 0,
              OwnerAccountId: 0,
              CreatedAt: 0,
              ServerSideEncryptionConfiguration: {
                Rules: D.list({
                  ApplyServerSideEncryptionByDefault: {
                    SSEAlgorithm: 0,
                    KMSMasterKeyID: 0,
                  },
                }),
              },
              BucketLifecycleConfiguration: {
                Rules: D.list({
                  AbortIncompleteMultipartUpload: { DaysAfterInitiation: 0 },
                  ExpirationDate: 0,
                  ExpirationInDays: 0,
                  ExpiredObjectDeleteMarker: 0,
                  Filter: {
                    Predicate: {
                      Operands: D.list({
                        Prefix: 0,
                        Tag: { Key: 0, Value: 0 },
                        Type: 0,
                      }),
                      Prefix: 0,
                      Tag: { Key: 0, Value: 0 },
                      Type: 0,
                    },
                  },
                  ID: 0,
                  NoncurrentVersionExpirationInDays: 0,
                  NoncurrentVersionTransitions: D.list({
                    Days: 0,
                    StorageClass: 0,
                  }),
                  Prefix: 0,
                  Status: 0,
                  Transitions: D.list({ Date: 0, Days: 0, StorageClass: 0 }),
                }),
              },
              PublicAccessBlockConfiguration:
                i_AwsS3AccountPublicAccessBlockDetails,
              AccessControlList: 0,
              BucketLoggingConfiguration: {
                DestinationBucketName: 0,
                LogFilePrefix: 0,
              },
              BucketWebsiteConfiguration: {
                ErrorDocument: 0,
                IndexDocumentSuffix: 0,
                RedirectAllRequestsTo: { Hostname: 0, Protocol: 0 },
                RoutingRules: D.list({
                  Condition: {
                    HttpErrorCodeReturnedEquals: 0,
                    KeyPrefixEquals: 0,
                  },
                  Redirect: {
                    Hostname: 0,
                    HttpRedirectCode: 0,
                    Protocol: 0,
                    ReplaceKeyPrefixWith: 0,
                    ReplaceKeyWith: 0,
                  },
                }),
              },
              BucketNotificationConfiguration: {
                Configurations: D.list({
                  Events: 0,
                  Filter: {
                    S3KeyFilter: { FilterRules: D.list({ Name: 0, Value: 0 }) },
                  },
                  Destination: 0,
                  Type: 0,
                }),
              },
              BucketVersioningConfiguration: {
                IsMfaDeleteEnabled: 0,
                Status: 0,
              },
              ObjectLockConfiguration: {
                ObjectLockEnabled: 0,
                Rule: { DefaultRetention: { Days: 0, Mode: 0, Years: 0 } },
              },
              Name: 0,
            },
            AwsS3AccountPublicAccessBlock:
              i_AwsS3AccountPublicAccessBlockDetails,
            AwsS3Object: {
              LastModified: 0,
              ETag: 0,
              VersionId: 0,
              ContentType: 0,
              ServerSideEncryption: 0,
              SSEKMSKeyId: 0,
            },
            AwsSecretsManagerSecret: {
              RotationRules: { AutomaticallyAfterDays: 0 },
              RotationOccurredWithinFrequency: 0,
              KmsKeyId: 0,
              RotationEnabled: 0,
              RotationLambdaArn: 0,
              Deleted: 0,
              Name: 0,
              Description: 0,
            },
            AwsIamAccessKey: {
              UserName: 0,
              Status: 0,
              CreatedAt: 0,
              PrincipalId: 0,
              PrincipalType: 0,
              PrincipalName: 0,
              AccountId: 0,
              AccessKeyId: 0,
              SessionContext: {
                Attributes: { MfaAuthenticated: 0, CreationDate: 0 },
                SessionIssuer: {
                  Type: 0,
                  PrincipalId: 0,
                  Arn: 0,
                  AccountId: 0,
                  UserName: 0,
                },
              },
            },
            AwsIamUser: {
              AttachedManagedPolicies: D.list(i_AwsIamAttachedManagedPolicy),
              CreateDate: 0,
              GroupList: 0,
              Path: 0,
              PermissionsBoundary: i_AwsIamPermissionsBoundary,
              UserId: 0,
              UserName: 0,
              UserPolicyList: D.list({ PolicyName: 0 }),
            },
            AwsIamPolicy: {
              AttachmentCount: 0,
              CreateDate: 0,
              DefaultVersionId: 0,
              Description: 0,
              IsAttachable: 0,
              Path: 0,
              PermissionsBoundaryUsageCount: 0,
              PolicyId: 0,
              PolicyName: 0,
              PolicyVersionList: D.list({
                VersionId: 0,
                IsDefaultVersion: 0,
                CreateDate: 0,
              }),
              UpdateDate: 0,
            },
            AwsApiGatewayV2Stage: {
              ClientCertificateId: 0,
              CreatedDate: 0,
              Description: 0,
              DefaultRouteSettings: i_AwsApiGatewayV2RouteSettings,
              DeploymentId: 0,
              LastUpdatedDate: 0,
              RouteSettings: i_AwsApiGatewayV2RouteSettings,
              StageName: 0,
              StageVariables: 0,
              AccessLogSettings: i_AwsApiGatewayAccessLogSettings,
              AutoDeploy: 0,
              LastDeploymentStatusMessage: 0,
              ApiGatewayManaged: 0,
            },
            AwsApiGatewayV2Api: {
              ApiEndpoint: 0,
              ApiId: 0,
              ApiKeySelectionExpression: 0,
              CreatedDate: 0,
              Description: 0,
              Version: 0,
              Name: 0,
              ProtocolType: 0,
              RouteSelectionExpression: 0,
              CorsConfiguration: {
                AllowOrigins: 0,
                AllowCredentials: 0,
                ExposeHeaders: 0,
                MaxAge: 0,
                AllowMethods: 0,
                AllowHeaders: 0,
              },
            },
            AwsDynamoDbTable: {
              AttributeDefinitions: D.list({
                AttributeName: 0,
                AttributeType: 0,
              }),
              BillingModeSummary: {
                BillingMode: 0,
                LastUpdateToPayPerRequestDateTime: 0,
              },
              CreationDateTime: 0,
              GlobalSecondaryIndexes: D.list({
                Backfilling: 0,
                IndexArn: 0,
                IndexName: 0,
                IndexSizeBytes: 0,
                IndexStatus: 0,
                ItemCount: 0,
                KeySchema: D.list(i_AwsDynamoDbTableKeySchema),
                Projection: i_AwsDynamoDbTableProjection,
                ProvisionedThroughput: i_AwsDynamoDbTableProvisionedThroughput,
              }),
              GlobalTableVersion: 0,
              ItemCount: 0,
              KeySchema: D.list(i_AwsDynamoDbTableKeySchema),
              LatestStreamArn: 0,
              LatestStreamLabel: 0,
              LocalSecondaryIndexes: D.list({
                IndexArn: 0,
                IndexName: 0,
                KeySchema: D.list(i_AwsDynamoDbTableKeySchema),
                Projection: i_AwsDynamoDbTableProjection,
              }),
              ProvisionedThroughput: i_AwsDynamoDbTableProvisionedThroughput,
              Replicas: D.list({
                GlobalSecondaryIndexes: D.list({
                  IndexName: 0,
                  ProvisionedThroughputOverride:
                    i_AwsDynamoDbTableProvisionedThroughputOverride,
                }),
                KmsMasterKeyId: 0,
                ProvisionedThroughputOverride:
                  i_AwsDynamoDbTableProvisionedThroughputOverride,
                RegionName: 0,
                ReplicaStatus: 0,
                ReplicaStatusDescription: 0,
              }),
              RestoreSummary: {
                SourceBackupArn: 0,
                SourceTableArn: 0,
                RestoreDateTime: 0,
                RestoreInProgress: 0,
              },
              SseDescription: {
                InaccessibleEncryptionDateTime: 0,
                Status: 0,
                SseType: 0,
                KmsMasterKeyArn: 0,
              },
              StreamSpecification: { StreamEnabled: 0, StreamViewType: 0 },
              TableId: 0,
              TableName: 0,
              TableSizeBytes: 0,
              TableStatus: 0,
              DeletionProtectionEnabled: 0,
            },
            AwsApiGatewayStage: {
              DeploymentId: 0,
              ClientCertificateId: 0,
              StageName: 0,
              Description: 0,
              CacheClusterEnabled: 0,
              CacheClusterSize: 0,
              CacheClusterStatus: 0,
              MethodSettings: D.list({
                MetricsEnabled: 0,
                LoggingLevel: 0,
                DataTraceEnabled: 0,
                ThrottlingBurstLimit: 0,
                ThrottlingRateLimit: 0,
                CachingEnabled: 0,
                CacheTtlInSeconds: 0,
                CacheDataEncrypted: 0,
                RequireAuthorizationForCacheControl: 0,
                UnauthorizedCacheControlHeaderStrategy: 0,
                HttpMethod: 0,
                ResourcePath: 0,
              }),
              Variables: 0,
              DocumentationVersion: 0,
              AccessLogSettings: i_AwsApiGatewayAccessLogSettings,
              CanarySettings: {
                PercentTraffic: 0,
                DeploymentId: 0,
                StageVariableOverrides: 0,
                UseStageCache: 0,
              },
              TracingEnabled: 0,
              CreatedDate: 0,
              LastUpdatedDate: 0,
              WebAclArn: 0,
            },
            AwsApiGatewayRestApi: {
              Id: 0,
              Name: 0,
              Description: 0,
              CreatedDate: 0,
              Version: 0,
              BinaryMediaTypes: 0,
              MinimumCompressionSize: 0,
              ApiKeySource: 0,
              EndpointConfiguration: { Types: 0 },
            },
            AwsCloudTrailTrail: {
              CloudWatchLogsLogGroupArn: 0,
              CloudWatchLogsRoleArn: 0,
              HasCustomEventSelectors: 0,
              HomeRegion: 0,
              IncludeGlobalServiceEvents: 0,
              IsMultiRegionTrail: 0,
              IsOrganizationTrail: 0,
              KmsKeyId: 0,
              LogFileValidationEnabled: 0,
              Name: 0,
              S3BucketName: 0,
              S3KeyPrefix: 0,
              SnsTopicArn: 0,
              SnsTopicName: 0,
              TrailArn: 0,
            },
            AwsSsmPatchCompliance: {
              Patch: {
                ComplianceSummary: {
                  Status: 0,
                  CompliantCriticalCount: 0,
                  CompliantHighCount: 0,
                  CompliantMediumCount: 0,
                  ExecutionType: 0,
                  NonCompliantCriticalCount: 0,
                  CompliantInformationalCount: 0,
                  NonCompliantInformationalCount: 0,
                  CompliantUnspecifiedCount: 0,
                  NonCompliantLowCount: 0,
                  NonCompliantHighCount: 0,
                  CompliantLowCount: 0,
                  ComplianceType: 0,
                  PatchBaselineId: 0,
                  OverallSeverity: 0,
                  NonCompliantMediumCount: 0,
                  NonCompliantUnspecifiedCount: 0,
                  PatchGroup: 0,
                },
              },
            },
            AwsCertificateManagerCertificate: {
              CertificateAuthorityArn: 0,
              CreatedAt: 0,
              DomainName: 0,
              DomainValidationOptions: D.list(
                i_AwsCertificateManagerCertificateDomainValidationOption,
              ),
              ExtendedKeyUsages: D.list({ Name: 0, OId: 0 }),
              FailureReason: 0,
              ImportedAt: 0,
              InUseBy: 0,
              IssuedAt: 0,
              Issuer: 0,
              KeyAlgorithm: 0,
              KeyUsages: D.list({ Name: 0 }),
              NotAfter: 0,
              NotBefore: 0,
              Options: { CertificateTransparencyLoggingPreference: 0 },
              RenewalEligibility: 0,
              RenewalSummary: {
                DomainValidationOptions: D.list(
                  i_AwsCertificateManagerCertificateDomainValidationOption,
                ),
                RenewalStatus: 0,
                RenewalStatusReason: 0,
                UpdatedAt: 0,
              },
              Serial: 0,
              SignatureAlgorithm: 0,
              Status: 0,
              Subject: 0,
              SubjectAlternativeNames: 0,
              Type: 0,
            },
            AwsRedshiftCluster: {
              AllowVersionUpgrade: 0,
              AutomatedSnapshotRetentionPeriod: 0,
              AvailabilityZone: 0,
              ClusterAvailabilityStatus: 0,
              ClusterCreateTime: 0,
              ClusterIdentifier: 0,
              ClusterNodes: D.list({
                NodeRole: 0,
                PrivateIpAddress: 0,
                PublicIpAddress: 0,
              }),
              ClusterParameterGroups: D.list({
                ClusterParameterStatusList: D.list({
                  ParameterName: 0,
                  ParameterApplyStatus: 0,
                  ParameterApplyErrorDescription: 0,
                }),
                ParameterApplyStatus: 0,
                ParameterGroupName: 0,
              }),
              ClusterPublicKey: 0,
              ClusterRevisionNumber: 0,
              ClusterSecurityGroups: D.list({
                ClusterSecurityGroupName: 0,
                Status: 0,
              }),
              ClusterSnapshotCopyStatus: {
                DestinationRegion: 0,
                ManualSnapshotRetentionPeriod: 0,
                RetentionPeriod: 0,
                SnapshotCopyGrantName: 0,
              },
              ClusterStatus: 0,
              ClusterSubnetGroupName: 0,
              ClusterVersion: 0,
              DBName: 0,
              DeferredMaintenanceWindows: D.list({
                DeferMaintenanceEndTime: 0,
                DeferMaintenanceIdentifier: 0,
                DeferMaintenanceStartTime: 0,
              }),
              ElasticIpStatus: { ElasticIp: 0, Status: 0 },
              ElasticResizeNumberOfNodeOptions: 0,
              Encrypted: 0,
              Endpoint: { Address: 0, Port: 0 },
              EnhancedVpcRouting: 0,
              ExpectedNextSnapshotScheduleTime: 0,
              ExpectedNextSnapshotScheduleTimeStatus: 0,
              HsmStatus: {
                HsmClientCertificateIdentifier: 0,
                HsmConfigurationIdentifier: 0,
                Status: 0,
              },
              IamRoles: D.list({ ApplyStatus: 0, IamRoleArn: 0 }),
              KmsKeyId: 0,
              MaintenanceTrackName: 0,
              ManualSnapshotRetentionPeriod: 0,
              MasterUsername: 0,
              NextMaintenanceWindowStartTime: 0,
              NodeType: 0,
              NumberOfNodes: 0,
              PendingActions: 0,
              PendingModifiedValues: {
                AutomatedSnapshotRetentionPeriod: 0,
                ClusterIdentifier: 0,
                ClusterType: 0,
                ClusterVersion: 0,
                EncryptionType: 0,
                EnhancedVpcRouting: 0,
                MaintenanceTrackName: 0,
                MasterUserPassword: 0,
                NodeType: 0,
                NumberOfNodes: 0,
                PubliclyAccessible: 0,
              },
              PreferredMaintenanceWindow: 0,
              PubliclyAccessible: 0,
              ResizeInfo: { AllowCancelResize: 0, ResizeType: 0 },
              RestoreStatus: {
                CurrentRestoreRateInMegaBytesPerSecond: 0,
                ElapsedTimeInSeconds: 0,
                EstimatedTimeToCompletionInSeconds: 0,
                ProgressInMegaBytes: 0,
                SnapshotSizeInMegaBytes: 0,
                Status: 0,
              },
              SnapshotScheduleIdentifier: 0,
              SnapshotScheduleState: 0,
              VpcId: 0,
              VpcSecurityGroups: D.list({ Status: 0, VpcSecurityGroupId: 0 }),
              LoggingStatus: {
                BucketName: 0,
                LastFailureMessage: 0,
                LastFailureTime: 0,
                LastSuccessfulDeliveryTime: 0,
                LoggingEnabled: 0,
                S3KeyPrefix: 0,
              },
            },
            AwsElbLoadBalancer: {
              AvailabilityZones: 0,
              BackendServerDescriptions: D.list({
                InstancePort: 0,
                PolicyNames: 0,
              }),
              CanonicalHostedZoneName: 0,
              CanonicalHostedZoneNameID: 0,
              CreatedTime: 0,
              DnsName: 0,
              HealthCheck: {
                HealthyThreshold: 0,
                Interval: 0,
                Target: 0,
                Timeout: 0,
                UnhealthyThreshold: 0,
              },
              Instances: D.list({ InstanceId: 0 }),
              ListenerDescriptions: D.list({
                Listener: {
                  InstancePort: 0,
                  InstanceProtocol: 0,
                  LoadBalancerPort: 0,
                  Protocol: 0,
                  SslCertificateId: 0,
                },
                PolicyNames: 0,
              }),
              LoadBalancerAttributes: {
                AccessLog: {
                  EmitInterval: 0,
                  Enabled: 0,
                  S3BucketName: 0,
                  S3BucketPrefix: 0,
                },
                ConnectionDraining: { Enabled: 0, Timeout: 0 },
                ConnectionSettings: { IdleTimeout: 0 },
                CrossZoneLoadBalancing: { Enabled: 0 },
                AdditionalAttributes: D.list({ Key: 0, Value: 0 }),
              },
              LoadBalancerName: 0,
              Policies: {
                AppCookieStickinessPolicies: D.list({
                  CookieName: 0,
                  PolicyName: 0,
                }),
                LbCookieStickinessPolicies: D.list({
                  CookieExpirationPeriod: 0,
                  PolicyName: 0,
                }),
                OtherPolicies: 0,
              },
              Scheme: 0,
              SecurityGroups: 0,
              SourceSecurityGroup: { GroupName: 0, OwnerAlias: 0 },
              Subnets: 0,
              VpcId: 0,
            },
            AwsIamGroup: {
              AttachedManagedPolicies: D.list(i_AwsIamAttachedManagedPolicy),
              CreateDate: 0,
              GroupId: 0,
              GroupName: 0,
              GroupPolicyList: D.list({ PolicyName: 0 }),
              Path: 0,
            },
            AwsIamRole: {
              AssumeRolePolicyDocument: 0,
              AttachedManagedPolicies: D.list(i_AwsIamAttachedManagedPolicy),
              CreateDate: 0,
              InstanceProfileList: D.list({
                Arn: 0,
                CreateDate: 0,
                InstanceProfileId: 0,
                InstanceProfileName: 0,
                Path: 0,
                Roles: D.list({
                  Arn: 0,
                  AssumeRolePolicyDocument: 0,
                  CreateDate: 0,
                  Path: 0,
                  RoleId: 0,
                  RoleName: 0,
                }),
              }),
              PermissionsBoundary: i_AwsIamPermissionsBoundary,
              RoleId: 0,
              RoleName: 0,
              RolePolicyList: D.list({ PolicyName: 0 }),
              MaxSessionDuration: 0,
              Path: 0,
            },
            AwsKmsKey: {
              AWSAccountId: 0,
              CreationDate: 0,
              KeyId: 0,
              KeyManager: 0,
              KeyState: 0,
              Origin: 0,
              Description: 0,
              KeyRotationStatus: 0,
            },
            AwsLambdaFunction: {
              Code: { S3Bucket: 0, S3Key: 0, S3ObjectVersion: 0, ZipFile: 0 },
              CodeSha256: 0,
              DeadLetterConfig: { TargetArn: 0 },
              Environment: {
                Variables: 0,
                Error: { ErrorCode: 0, Message: 0 },
              },
              FunctionName: 0,
              Handler: 0,
              KmsKeyArn: 0,
              LastModified: 0,
              Layers: D.list({ Arn: 0, CodeSize: 0 }),
              MasterArn: 0,
              MemorySize: 0,
              RevisionId: 0,
              Role: 0,
              Runtime: 0,
              Timeout: 0,
              TracingConfig: { Mode: 0 },
              VpcConfig: { SecurityGroupIds: 0, SubnetIds: 0, VpcId: 0 },
              Version: 0,
              Architectures: 0,
              PackageType: 0,
            },
            AwsLambdaLayerVersion: {
              Version: 0,
              CompatibleRuntimes: 0,
              CreatedDate: 0,
            },
            AwsRdsDbInstance: {
              AssociatedRoles: D.list({
                RoleArn: 0,
                FeatureName: 0,
                Status: 0,
              }),
              CACertificateIdentifier: 0,
              DBClusterIdentifier: 0,
              DBInstanceIdentifier: 0,
              DBInstanceClass: 0,
              DbInstancePort: 0,
              DbiResourceId: 0,
              DBName: 0,
              DeletionProtection: 0,
              Endpoint: i_AwsRdsDbInstanceEndpoint,
              Engine: 0,
              EngineVersion: 0,
              IAMDatabaseAuthenticationEnabled: 0,
              InstanceCreateTime: 0,
              KmsKeyId: 0,
              PubliclyAccessible: 0,
              StorageEncrypted: 0,
              TdeCredentialArn: 0,
              VpcSecurityGroups: D.list(i_AwsRdsDbInstanceVpcSecurityGroup),
              MultiAz: 0,
              EnhancedMonitoringResourceArn: 0,
              DbInstanceStatus: 0,
              MasterUsername: 0,
              AllocatedStorage: 0,
              PreferredBackupWindow: 0,
              BackupRetentionPeriod: 0,
              DbSecurityGroups: 0,
              DbParameterGroups: D.list({
                DbParameterGroupName: 0,
                ParameterApplyStatus: 0,
              }),
              AvailabilityZone: 0,
              DbSubnetGroup: {
                DbSubnetGroupName: 0,
                DbSubnetGroupDescription: 0,
                VpcId: 0,
                SubnetGroupStatus: 0,
                Subnets: D.list({
                  SubnetIdentifier: 0,
                  SubnetAvailabilityZone: { Name: 0 },
                  SubnetStatus: 0,
                }),
                DbSubnetGroupArn: 0,
              },
              PreferredMaintenanceWindow: 0,
              PendingModifiedValues: {
                DbInstanceClass: 0,
                AllocatedStorage: 0,
                MasterUserPassword: 0,
                Port: 0,
                BackupRetentionPeriod: 0,
                MultiAZ: 0,
                EngineVersion: 0,
                LicenseModel: 0,
                Iops: 0,
                DbInstanceIdentifier: 0,
                StorageType: 0,
                CaCertificateIdentifier: 0,
                DbSubnetGroupName: 0,
                PendingCloudWatchLogsExports: {
                  LogTypesToEnable: 0,
                  LogTypesToDisable: 0,
                },
                ProcessorFeatures: D.list(i_AwsRdsDbProcessorFeature),
              },
              LatestRestorableTime: 0,
              AutoMinorVersionUpgrade: 0,
              ReadReplicaSourceDBInstanceIdentifier: 0,
              ReadReplicaDBInstanceIdentifiers: 0,
              ReadReplicaDBClusterIdentifiers: 0,
              LicenseModel: 0,
              Iops: 0,
              OptionGroupMemberships: D.list({ OptionGroupName: 0, Status: 0 }),
              CharacterSetName: 0,
              SecondaryAvailabilityZone: 0,
              StatusInfos: D.list({
                StatusType: 0,
                Normal: 0,
                Status: 0,
                Message: 0,
              }),
              StorageType: 0,
              DomainMemberships: D.list(i_AwsRdsDbDomainMembership),
              CopyTagsToSnapshot: 0,
              MonitoringInterval: 0,
              MonitoringRoleArn: 0,
              PromotionTier: 0,
              Timezone: 0,
              PerformanceInsightsEnabled: 0,
              PerformanceInsightsKmsKeyId: 0,
              PerformanceInsightsRetentionPeriod: 0,
              EnabledCloudWatchLogsExports: 0,
              ProcessorFeatures: D.list(i_AwsRdsDbProcessorFeature),
              ListenerEndpoint: i_AwsRdsDbInstanceEndpoint,
              MaxAllocatedStorage: 0,
            },
            AwsSnsTopic: {
              KmsMasterKeyId: 0,
              Subscription: D.list({ Endpoint: 0, Protocol: 0 }),
              TopicName: 0,
              Owner: 0,
              SqsSuccessFeedbackRoleArn: 0,
              SqsFailureFeedbackRoleArn: 0,
              ApplicationSuccessFeedbackRoleArn: 0,
              FirehoseSuccessFeedbackRoleArn: 0,
              FirehoseFailureFeedbackRoleArn: 0,
              HttpSuccessFeedbackRoleArn: 0,
              HttpFailureFeedbackRoleArn: 0,
            },
            AwsSqsQueue: {
              KmsDataKeyReusePeriodSeconds: 0,
              KmsMasterKeyId: 0,
              QueueName: 0,
              DeadLetterTargetArn: 0,
            },
            AwsWafWebAcl: {
              Name: 0,
              DefaultAction: 0,
              Rules: D.list({
                Action: { Type: 0 },
                ExcludedRules: D.list({ RuleId: 0 }),
                OverrideAction: { Type: 0 },
                Priority: 0,
                RuleId: 0,
                Type: 0,
              }),
              WebAclId: 0,
            },
            AwsRdsDbSnapshot: {
              DbSnapshotIdentifier: 0,
              DbInstanceIdentifier: 0,
              SnapshotCreateTime: 0,
              Engine: 0,
              AllocatedStorage: 0,
              Status: 0,
              Port: 0,
              AvailabilityZone: 0,
              VpcId: 0,
              InstanceCreateTime: 0,
              MasterUsername: 0,
              EngineVersion: 0,
              LicenseModel: 0,
              SnapshotType: 0,
              Iops: 0,
              OptionGroupName: 0,
              PercentProgress: 0,
              SourceRegion: 0,
              SourceDbSnapshotIdentifier: 0,
              StorageType: 0,
              TdeCredentialArn: 0,
              Encrypted: 0,
              KmsKeyId: 0,
              Timezone: 0,
              IamDatabaseAuthenticationEnabled: 0,
              ProcessorFeatures: D.list(i_AwsRdsDbProcessorFeature),
              DbiResourceId: 0,
            },
            AwsRdsDbClusterSnapshot: {
              AvailabilityZones: 0,
              SnapshotCreateTime: 0,
              Engine: 0,
              AllocatedStorage: 0,
              Status: 0,
              Port: 0,
              VpcId: 0,
              ClusterCreateTime: 0,
              MasterUsername: 0,
              EngineVersion: 0,
              LicenseModel: 0,
              SnapshotType: 0,
              PercentProgress: 0,
              StorageEncrypted: 0,
              KmsKeyId: 0,
              DbClusterIdentifier: 0,
              DbClusterSnapshotIdentifier: 0,
              IamDatabaseAuthenticationEnabled: 0,
              DbClusterSnapshotAttributes: D.list({
                AttributeName: 0,
                AttributeValues: 0,
              }),
            },
            AwsRdsDbCluster: {
              AllocatedStorage: 0,
              AvailabilityZones: 0,
              BackupRetentionPeriod: 0,
              DatabaseName: 0,
              Status: 0,
              Endpoint: 0,
              ReaderEndpoint: 0,
              CustomEndpoints: 0,
              MultiAz: 0,
              Engine: 0,
              EngineVersion: 0,
              Port: 0,
              MasterUsername: 0,
              PreferredBackupWindow: 0,
              PreferredMaintenanceWindow: 0,
              ReadReplicaIdentifiers: 0,
              VpcSecurityGroups: D.list(i_AwsRdsDbInstanceVpcSecurityGroup),
              HostedZoneId: 0,
              StorageEncrypted: 0,
              KmsKeyId: 0,
              DbClusterResourceId: 0,
              AssociatedRoles: D.list({ RoleArn: 0, Status: 0 }),
              ClusterCreateTime: 0,
              EnabledCloudWatchLogsExports: 0,
              EngineMode: 0,
              DeletionProtection: 0,
              HttpEndpointEnabled: 0,
              ActivityStreamStatus: 0,
              CopyTagsToSnapshot: 0,
              CrossAccountClone: 0,
              DomainMemberships: D.list(i_AwsRdsDbDomainMembership),
              DbClusterParameterGroup: 0,
              DbSubnetGroup: 0,
              DbClusterOptionGroupMemberships: D.list({
                DbClusterOptionGroupName: 0,
                Status: 0,
              }),
              DbClusterIdentifier: 0,
              DbClusterMembers: D.list({
                IsClusterWriter: 0,
                PromotionTier: 0,
                DbInstanceIdentifier: 0,
                DbClusterParameterGroupStatus: 0,
              }),
              IamDatabaseAuthenticationEnabled: 0,
              AutoMinorVersionUpgrade: 0,
            },
            AwsEcsCluster: {
              ClusterArn: 0,
              ActiveServicesCount: 0,
              CapacityProviders: 0,
              ClusterSettings: D.list({ Name: 0, Value: 0 }),
              Configuration: {
                ExecuteCommandConfiguration: {
                  KmsKeyId: 0,
                  LogConfiguration: {
                    CloudWatchEncryptionEnabled: 0,
                    CloudWatchLogGroupName: 0,
                    S3BucketName: 0,
                    S3EncryptionEnabled: 0,
                    S3KeyPrefix: 0,
                  },
                  Logging: 0,
                },
              },
              DefaultCapacityProviderStrategy: D.list({
                Base: 0,
                CapacityProvider: 0,
                Weight: 0,
              }),
              ClusterName: 0,
              RegisteredContainerInstancesCount: 0,
              RunningTasksCount: 0,
              Status: 0,
            },
            AwsEcsContainer: i_AwsEcsContainerDetails,
            AwsEcsTaskDefinition: {
              ContainerDefinitions: D.list({
                Command: 0,
                Cpu: 0,
                DependsOn: D.list({ Condition: 0, ContainerName: 0 }),
                DisableNetworking: 0,
                DnsSearchDomains: 0,
                DnsServers: 0,
                DockerLabels: 0,
                DockerSecurityOptions: 0,
                EntryPoint: 0,
                Environment: D.list({ Name: 0, Value: 0 }),
                EnvironmentFiles: D.list({ Type: 0, Value: 0 }),
                Essential: 0,
                ExtraHosts: D.list({ Hostname: 0, IpAddress: 0 }),
                FirelensConfiguration: { Options: 0, Type: 0 },
                HealthCheck: {
                  Command: 0,
                  Interval: 0,
                  Retries: 0,
                  StartPeriod: 0,
                  Timeout: 0,
                },
                Hostname: 0,
                Image: 0,
                Interactive: 0,
                Links: 0,
                LinuxParameters: {
                  Capabilities: { Add: 0, Drop: 0 },
                  Devices: D.list({
                    ContainerPath: 0,
                    HostPath: 0,
                    Permissions: 0,
                  }),
                  InitProcessEnabled: 0,
                  MaxSwap: 0,
                  SharedMemorySize: 0,
                  Swappiness: 0,
                  Tmpfs: D.list({ ContainerPath: 0, MountOptions: 0, Size: 0 }),
                },
                LogConfiguration: {
                  LogDriver: 0,
                  Options: 0,
                  SecretOptions: D.list({ Name: 0, ValueFrom: 0 }),
                },
                Memory: 0,
                MemoryReservation: 0,
                MountPoints: D.list({
                  ContainerPath: 0,
                  ReadOnly: 0,
                  SourceVolume: 0,
                }),
                Name: 0,
                PortMappings: D.list({
                  ContainerPort: 0,
                  HostPort: 0,
                  Protocol: 0,
                }),
                Privileged: 0,
                PseudoTerminal: 0,
                ReadonlyRootFilesystem: 0,
                RepositoryCredentials: { CredentialsParameter: 0 },
                ResourceRequirements: D.list({ Type: 0, Value: 0 }),
                Secrets: D.list({ Name: 0, ValueFrom: 0 }),
                StartTimeout: 0,
                StopTimeout: 0,
                SystemControls: D.list({ Namespace: 0, Value: 0 }),
                Ulimits: D.list({ HardLimit: 0, Name: 0, SoftLimit: 0 }),
                User: 0,
                VolumesFrom: D.list({ ReadOnly: 0, SourceContainer: 0 }),
                WorkingDirectory: 0,
              }),
              Cpu: 0,
              ExecutionRoleArn: 0,
              Family: 0,
              InferenceAccelerators: D.list({ DeviceName: 0, DeviceType: 0 }),
              IpcMode: 0,
              Memory: 0,
              NetworkMode: 0,
              PidMode: 0,
              PlacementConstraints: D.list({ Expression: 0, Type: 0 }),
              ProxyConfiguration: {
                ContainerName: 0,
                ProxyConfigurationProperties: D.list({ Name: 0, Value: 0 }),
                Type: 0,
              },
              RequiresCompatibilities: 0,
              TaskRoleArn: 0,
              Volumes: D.list({
                DockerVolumeConfiguration: {
                  Autoprovision: 0,
                  Driver: 0,
                  DriverOpts: 0,
                  Labels: 0,
                  Scope: 0,
                },
                EfsVolumeConfiguration: {
                  AuthorizationConfig: { AccessPointId: 0, Iam: 0 },
                  FilesystemId: 0,
                  RootDirectory: 0,
                  TransitEncryption: 0,
                  TransitEncryptionPort: 0,
                },
                Host: { SourcePath: 0 },
                Name: 0,
              }),
              Status: 0,
            },
            Container: {
              ContainerRuntime: 0,
              Name: 0,
              ImageId: 0,
              ImageName: 0,
              LaunchedAt: 0,
              VolumeMounts: D.list({ Name: 0, MountPath: 0 }),
              Privileged: 0,
            },
            Other: 0,
            AwsRdsEventSubscription: {
              CustSubscriptionId: 0,
              CustomerAwsId: 0,
              Enabled: 0,
              EventCategoriesList: 0,
              EventSubscriptionArn: 0,
              SnsTopicArn: 0,
              SourceIdsList: 0,
              SourceType: 0,
              Status: 0,
              SubscriptionCreationTime: 0,
            },
            AwsEcsService: {
              CapacityProviderStrategy: D.list({
                Base: 0,
                CapacityProvider: 0,
                Weight: 0,
              }),
              Cluster: 0,
              DeploymentConfiguration: {
                DeploymentCircuitBreaker: { Enable: 0, Rollback: 0 },
                MaximumPercent: 0,
                MinimumHealthyPercent: 0,
              },
              DeploymentController: { Type: 0 },
              DesiredCount: 0,
              EnableEcsManagedTags: 0,
              EnableExecuteCommand: 0,
              HealthCheckGracePeriodSeconds: 0,
              LaunchType: 0,
              LoadBalancers: D.list({
                ContainerName: 0,
                ContainerPort: 0,
                LoadBalancerName: 0,
                TargetGroupArn: 0,
              }),
              Name: 0,
              NetworkConfiguration: {
                AwsVpcConfiguration: {
                  AssignPublicIp: 0,
                  SecurityGroups: 0,
                  Subnets: 0,
                },
              },
              PlacementConstraints: D.list({ Expression: 0, Type: 0 }),
              PlacementStrategies: D.list({ Field: 0, Type: 0 }),
              PlatformVersion: 0,
              PropagateTags: 0,
              Role: 0,
              SchedulingStrategy: 0,
              ServiceArn: 0,
              ServiceName: 0,
              ServiceRegistries: D.list({
                ContainerName: 0,
                ContainerPort: 0,
                Port: 0,
                RegistryArn: 0,
              }),
              TaskDefinition: 0,
            },
            AwsAutoScalingLaunchConfiguration: {
              AssociatePublicIpAddress: 0,
              BlockDeviceMappings: D.list({
                DeviceName: 0,
                Ebs: {
                  DeleteOnTermination: 0,
                  Encrypted: 0,
                  Iops: 0,
                  SnapshotId: 0,
                  VolumeSize: 0,
                  VolumeType: 0,
                },
                NoDevice: 0,
                VirtualName: 0,
              }),
              ClassicLinkVpcId: 0,
              ClassicLinkVpcSecurityGroups: 0,
              CreatedTime: 0,
              EbsOptimized: 0,
              IamInstanceProfile: 0,
              ImageId: 0,
              InstanceMonitoring: { Enabled: 0 },
              InstanceType: 0,
              KernelId: 0,
              KeyName: 0,
              LaunchConfigurationName: 0,
              PlacementTenancy: 0,
              RamdiskId: 0,
              SecurityGroups: 0,
              SpotPrice: 0,
              UserData: 0,
              MetadataOptions: {
                HttpEndpoint: 0,
                HttpPutResponseHopLimit: 0,
                HttpTokens: 0,
              },
            },
            AwsEc2VpnConnection: {
              VpnConnectionId: 0,
              State: 0,
              CustomerGatewayId: 0,
              CustomerGatewayConfiguration: 0,
              Type: 0,
              VpnGatewayId: 0,
              Category: 0,
              VgwTelemetry: D.list({
                AcceptedRouteCount: 0,
                CertificateArn: 0,
                LastStatusChange: 0,
                OutsideIpAddress: 0,
                Status: 0,
                StatusMessage: 0,
              }),
              Options: {
                StaticRoutesOnly: 0,
                TunnelOptions: D.list({
                  DpdTimeoutSeconds: 0,
                  IkeVersions: 0,
                  OutsideIpAddress: 0,
                  Phase1DhGroupNumbers: 0,
                  Phase1EncryptionAlgorithms: 0,
                  Phase1IntegrityAlgorithms: 0,
                  Phase1LifetimeSeconds: 0,
                  Phase2DhGroupNumbers: 0,
                  Phase2EncryptionAlgorithms: 0,
                  Phase2IntegrityAlgorithms: 0,
                  Phase2LifetimeSeconds: 0,
                  PreSharedKey: 0,
                  RekeyFuzzPercentage: 0,
                  RekeyMarginTimeSeconds: 0,
                  ReplayWindowSize: 0,
                  TunnelInsideCidr: 0,
                }),
              },
              Routes: D.list({ DestinationCidrBlock: 0, State: 0 }),
              TransitGatewayId: 0,
            },
            AwsEcrContainerImage: {
              RegistryId: 0,
              RepositoryName: 0,
              Architecture: 0,
              ImageDigest: 0,
              ImageTags: 0,
              ImagePublishedAt: 0,
            },
            AwsOpenSearchServiceDomain: {
              Arn: 0,
              AccessPolicies: 0,
              DomainName: 0,
              Id: 0,
              DomainEndpoint: 0,
              EngineVersion: 0,
              EncryptionAtRestOptions: { Enabled: 0, KmsKeyId: 0 },
              NodeToNodeEncryptionOptions: { Enabled: 0 },
              ServiceSoftwareOptions: {
                AutomatedUpdateDate: 0,
                Cancellable: 0,
                CurrentVersion: 0,
                Description: 0,
                NewVersion: 0,
                UpdateAvailable: 0,
                UpdateStatus: 0,
                OptionalDeployment: 0,
              },
              ClusterConfig: {
                InstanceCount: 0,
                WarmEnabled: 0,
                WarmCount: 0,
                DedicatedMasterEnabled: 0,
                ZoneAwarenessConfig: { AvailabilityZoneCount: 0 },
                DedicatedMasterCount: 0,
                InstanceType: 0,
                WarmType: 0,
                ZoneAwarenessEnabled: 0,
                DedicatedMasterType: 0,
              },
              DomainEndpointOptions: {
                CustomEndpointCertificateArn: 0,
                CustomEndpointEnabled: 0,
                EnforceHTTPS: 0,
                CustomEndpoint: 0,
                TLSSecurityPolicy: 0,
              },
              VpcOptions: { SecurityGroupIds: 0, SubnetIds: 0 },
              LogPublishingOptions: {
                IndexSlowLogs: i_AwsOpenSearchServiceDomainLogPublishingOption,
                SearchSlowLogs: i_AwsOpenSearchServiceDomainLogPublishingOption,
                AuditLogs: i_AwsOpenSearchServiceDomainLogPublishingOption,
              },
              DomainEndpoints: 0,
              AdvancedSecurityOptions: {
                Enabled: 0,
                InternalUserDatabaseEnabled: 0,
                MasterUserOptions: {
                  MasterUserArn: 0,
                  MasterUserName: 0,
                  MasterUserPassword: 0,
                },
              },
            },
            AwsEc2VpcEndpointService: {
              AcceptanceRequired: 0,
              AvailabilityZones: 0,
              BaseEndpointDnsNames: 0,
              ManagesVpcEndpoints: 0,
              GatewayLoadBalancerArns: 0,
              NetworkLoadBalancerArns: 0,
              PrivateDnsName: 0,
              ServiceId: 0,
              ServiceName: 0,
              ServiceState: 0,
              ServiceType: D.list({ ServiceType: 0 }),
            },
            AwsXrayEncryptionConfig: { KeyId: 0, Status: 0, Type: 0 },
            AwsWafRateBasedRule: {
              MetricName: 0,
              Name: 0,
              RateKey: 0,
              RateLimit: 0,
              RuleId: 0,
              MatchPredicates: D.list({ DataId: 0, Negated: 0, Type: 0 }),
            },
            AwsWafRegionalRateBasedRule: {
              MetricName: 0,
              Name: 0,
              RateKey: 0,
              RateLimit: 0,
              RuleId: 0,
              MatchPredicates: D.list({ DataId: 0, Negated: 0, Type: 0 }),
            },
            AwsEcrRepository: {
              Arn: 0,
              ImageScanningConfiguration: { ScanOnPush: 0 },
              ImageTagMutability: 0,
              LifecyclePolicy: { LifecyclePolicyText: 0, RegistryId: 0 },
              RepositoryName: 0,
              RepositoryPolicyText: 0,
            },
            AwsEksCluster: {
              Arn: 0,
              CertificateAuthorityData: 0,
              ClusterStatus: 0,
              Endpoint: 0,
              Name: 0,
              ResourcesVpcConfig: {
                SecurityGroupIds: 0,
                SubnetIds: 0,
                EndpointPublicAccess: 0,
              },
              RoleArn: 0,
              Version: 0,
              Logging: { ClusterLogging: D.list({ Enabled: 0, Types: 0 }) },
            },
            AwsNetworkFirewallFirewallPolicy: {
              FirewallPolicy: {
                StatefulRuleGroupReferences: D.list({ ResourceArn: 0 }),
                StatelessCustomActions: D.list({
                  ActionDefinition: i_StatelessCustomActionDefinition,
                  ActionName: 0,
                }),
                StatelessDefaultActions: 0,
                StatelessFragmentDefaultActions: 0,
                StatelessRuleGroupReferences: D.list({
                  Priority: 0,
                  ResourceArn: 0,
                }),
              },
              FirewallPolicyArn: 0,
              FirewallPolicyId: 0,
              FirewallPolicyName: 0,
              Description: 0,
            },
            AwsNetworkFirewallFirewall: {
              DeleteProtection: 0,
              Description: 0,
              FirewallArn: 0,
              FirewallId: 0,
              FirewallName: 0,
              FirewallPolicyArn: 0,
              FirewallPolicyChangeProtection: 0,
              SubnetChangeProtection: 0,
              SubnetMappings: D.list({ SubnetId: 0 }),
              VpcId: 0,
            },
            AwsNetworkFirewallRuleGroup: {
              Capacity: 0,
              Description: 0,
              RuleGroup: {
                RuleVariables: {
                  IpSets: { Definition: 0 },
                  PortSets: { Definition: 0 },
                },
                RulesSource: {
                  RulesSourceList: {
                    GeneratedRulesType: 0,
                    TargetTypes: 0,
                    Targets: 0,
                  },
                  RulesString: 0,
                  StatefulRules: D.list({
                    Action: 0,
                    Header: {
                      Destination: 0,
                      DestinationPort: 0,
                      Direction: 0,
                      Protocol: 0,
                      Source: 0,
                      SourcePort: 0,
                    },
                    RuleOptions: D.list({ Keyword: 0, Settings: 0 }),
                  }),
                  StatelessRulesAndCustomActions: {
                    CustomActions: D.list({
                      ActionDefinition: i_StatelessCustomActionDefinition,
                      ActionName: 0,
                    }),
                    StatelessRules: D.list({
                      Priority: 0,
                      RuleDefinition: {
                        Actions: 0,
                        MatchAttributes: {
                          DestinationPorts: D.list({ FromPort: 0, ToPort: 0 }),
                          Destinations: D.list({ AddressDefinition: 0 }),
                          Protocols: 0,
                          SourcePorts: D.list({ FromPort: 0, ToPort: 0 }),
                          Sources: D.list({ AddressDefinition: 0 }),
                          TcpFlags: D.list({ Flags: 0, Masks: 0 }),
                        },
                      },
                    }),
                  },
                },
              },
              RuleGroupArn: 0,
              RuleGroupId: 0,
              RuleGroupName: 0,
              Type: 0,
            },
            AwsRdsDbSecurityGroup: {
              DbSecurityGroupArn: 0,
              DbSecurityGroupDescription: 0,
              DbSecurityGroupName: 0,
              Ec2SecurityGroups: D.list({
                Ec2SecurityGroupId: 0,
                Ec2SecurityGroupName: 0,
                Ec2SecurityGroupOwnerId: 0,
                Status: 0,
              }),
              IpRanges: D.list({ CidrIp: 0, Status: 0 }),
              OwnerId: 0,
              VpcId: 0,
            },
            AwsKinesisStream: {
              Name: 0,
              Arn: 0,
              StreamEncryption: { EncryptionType: 0, KeyId: 0 },
              ShardCount: 0,
              RetentionPeriodHours: 0,
            },
            AwsEc2TransitGateway: {
              Id: 0,
              Description: 0,
              DefaultRouteTablePropagation: 0,
              AutoAcceptSharedAttachments: 0,
              DefaultRouteTableAssociation: 0,
              TransitGatewayCidrBlocks: 0,
              AssociationDefaultRouteTableId: 0,
              PropagationDefaultRouteTableId: 0,
              VpnEcmpSupport: 0,
              DnsSupport: 0,
              MulticastSupport: 0,
              AmazonSideAsn: 0,
            },
            AwsEfsAccessPoint: {
              AccessPointId: 0,
              Arn: 0,
              ClientToken: 0,
              FileSystemId: 0,
              PosixUser: { Gid: 0, SecondaryGids: 0, Uid: 0 },
              RootDirectory: {
                CreationInfo: { OwnerGid: 0, OwnerUid: 0, Permissions: 0 },
                Path: 0,
              },
            },
            AwsCloudFormationStack: {
              Capabilities: 0,
              CreationTime: 0,
              Description: 0,
              DisableRollback: 0,
              DriftInformation: { StackDriftStatus: 0 },
              EnableTerminationProtection: 0,
              LastUpdatedTime: 0,
              NotificationArns: 0,
              Outputs: D.list({ Description: 0, OutputKey: 0, OutputValue: 0 }),
              RoleArn: 0,
              StackId: 0,
              StackName: 0,
              StackStatus: 0,
              StackStatusReason: 0,
              TimeoutInMinutes: 0,
            },
            AwsCloudWatchAlarm: {
              ActionsEnabled: 0,
              AlarmActions: 0,
              AlarmArn: 0,
              AlarmConfigurationUpdatedTimestamp: 0,
              AlarmDescription: 0,
              AlarmName: 0,
              ComparisonOperator: 0,
              DatapointsToAlarm: 0,
              Dimensions: D.list({ Name: 0, Value: 0 }),
              EvaluateLowSampleCountPercentile: 0,
              EvaluationPeriods: 0,
              ExtendedStatistic: 0,
              InsufficientDataActions: 0,
              MetricName: 0,
              Namespace: 0,
              OkActions: 0,
              Period: 0,
              Statistic: 0,
              Threshold: 0,
              ThresholdMetricId: 0,
              TreatMissingData: 0,
              Unit: 0,
            },
            AwsEc2VpcPeeringConnection: {
              AccepterVpcInfo: i_AwsEc2VpcPeeringConnectionVpcInfoDetails,
              ExpirationTime: 0,
              RequesterVpcInfo: i_AwsEc2VpcPeeringConnectionVpcInfoDetails,
              Status: { Code: 0, Message: 0 },
              VpcPeeringConnectionId: 0,
            },
            AwsWafRegionalRuleGroup: {
              MetricName: 0,
              Name: 0,
              RuleGroupId: 0,
              Rules: D.list({
                Action: { Type: 0 },
                Priority: 0,
                RuleId: 0,
                Type: 0,
              }),
            },
            AwsWafRegionalRule: {
              MetricName: 0,
              Name: 0,
              PredicateList: D.list({ DataId: 0, Negated: 0, Type: 0 }),
              RuleId: 0,
            },
            AwsWafRegionalWebAcl: {
              DefaultAction: 0,
              MetricName: 0,
              Name: 0,
              RulesList: D.list({
                Action: { Type: 0 },
                OverrideAction: { Type: 0 },
                Priority: 0,
                RuleId: 0,
                Type: 0,
              }),
              WebAclId: 0,
            },
            AwsWafRule: {
              MetricName: 0,
              Name: 0,
              PredicateList: D.list({ DataId: 0, Negated: 0, Type: 0 }),
              RuleId: 0,
            },
            AwsWafRuleGroup: {
              MetricName: 0,
              Name: 0,
              RuleGroupId: 0,
              Rules: D.list({
                Action: { Type: 0 },
                Priority: 0,
                RuleId: 0,
                Type: 0,
              }),
            },
            AwsEcsTask: {
              ClusterArn: 0,
              TaskDefinitionArn: 0,
              Version: 0,
              CreatedAt: 0,
              StartedAt: 0,
              StartedBy: 0,
              Group: 0,
              Volumes: D.list({ Name: 0, Host: { SourcePath: 0 } }),
              Containers: D.list(i_AwsEcsContainerDetails),
            },
            AwsBackupBackupVault: {
              BackupVaultArn: 0,
              BackupVaultName: 0,
              EncryptionKeyArn: 0,
              Notifications: { BackupVaultEvents: 0, SnsTopicArn: 0 },
              AccessPolicy: 0,
            },
            AwsBackupBackupPlan: {
              BackupPlan: {
                BackupPlanName: 0,
                AdvancedBackupSettings: D.list({
                  BackupOptions: 0,
                  ResourceType: 0,
                }),
                BackupPlanRule: D.list({
                  TargetBackupVault: 0,
                  StartWindowMinutes: 0,
                  ScheduleExpression: 0,
                  RuleName: 0,
                  RuleId: 0,
                  EnableContinuousBackup: 0,
                  CompletionWindowMinutes: 0,
                  CopyActions: D.list({
                    DestinationBackupVaultArn: 0,
                    Lifecycle: i_AwsBackupBackupPlanLifecycleDetails,
                  }),
                  Lifecycle: i_AwsBackupBackupPlanLifecycleDetails,
                }),
              },
              BackupPlanArn: 0,
              BackupPlanId: 0,
              VersionId: 0,
            },
            AwsBackupRecoveryPoint: {
              BackupSizeInBytes: 0,
              BackupVaultArn: 0,
              BackupVaultName: 0,
              CalculatedLifecycle: { DeleteAt: 0, MoveToColdStorageAt: 0 },
              CompletionDate: 0,
              CreatedBy: {
                BackupPlanArn: 0,
                BackupPlanId: 0,
                BackupPlanVersion: 0,
                BackupRuleId: 0,
              },
              CreationDate: 0,
              EncryptionKeyArn: 0,
              IamRoleArn: 0,
              IsEncrypted: 0,
              LastRestoreTime: 0,
              Lifecycle: { DeleteAfterDays: 0, MoveToColdStorageAfterDays: 0 },
              RecoveryPointArn: 0,
              ResourceArn: 0,
              ResourceType: 0,
              SourceBackupVaultArn: 0,
              Status: 0,
              StatusMessage: 0,
              StorageClass: 0,
            },
            AwsEc2LaunchTemplate: {
              LaunchTemplateName: 0,
              Id: 0,
              LaunchTemplateData: {
                BlockDeviceMappingSet: D.list({
                  DeviceName: 0,
                  Ebs: {
                    DeleteOnTermination: 0,
                    Encrypted: 0,
                    Iops: 0,
                    KmsKeyId: 0,
                    SnapshotId: 0,
                    Throughput: 0,
                    VolumeSize: 0,
                    VolumeType: 0,
                  },
                  NoDevice: 0,
                  VirtualName: 0,
                }),
                CapacityReservationSpecification: {
                  CapacityReservationPreference: 0,
                  CapacityReservationTarget: {
                    CapacityReservationId: 0,
                    CapacityReservationResourceGroupArn: 0,
                  },
                },
                CpuOptions: { CoreCount: 0, ThreadsPerCore: 0 },
                CreditSpecification: { CpuCredits: 0 },
                DisableApiStop: 0,
                DisableApiTermination: 0,
                EbsOptimized: 0,
                ElasticGpuSpecificationSet: D.list({ Type: 0 }),
                ElasticInferenceAcceleratorSet: D.list({ Count: 0, Type: 0 }),
                EnclaveOptions: { Enabled: 0 },
                HibernationOptions: { Configured: 0 },
                IamInstanceProfile: { Arn: 0, Name: 0 },
                ImageId: 0,
                InstanceInitiatedShutdownBehavior: 0,
                InstanceMarketOptions: {
                  MarketType: 0,
                  SpotOptions: {
                    BlockDurationMinutes: 0,
                    InstanceInterruptionBehavior: 0,
                    MaxPrice: 0,
                    SpotInstanceType: 0,
                    ValidUntil: 0,
                  },
                },
                InstanceRequirements: {
                  AcceleratorCount: { Max: 0, Min: 0 },
                  AcceleratorManufacturers: 0,
                  AcceleratorNames: 0,
                  AcceleratorTotalMemoryMiB: { Max: 0, Min: 0 },
                  AcceleratorTypes: 0,
                  BareMetal: 0,
                  BaselineEbsBandwidthMbps: { Max: 0, Min: 0 },
                  BurstablePerformance: 0,
                  CpuManufacturers: 0,
                  ExcludedInstanceTypes: 0,
                  InstanceGenerations: 0,
                  LocalStorage: 0,
                  LocalStorageTypes: 0,
                  MemoryGiBPerVCpu: { Max: 0, Min: 0 },
                  MemoryMiB: { Max: 0, Min: 0 },
                  NetworkInterfaceCount: { Max: 0, Min: 0 },
                  OnDemandMaxPricePercentageOverLowestPrice: 0,
                  RequireHibernateSupport: 0,
                  SpotMaxPricePercentageOverLowestPrice: 0,
                  TotalLocalStorageGB: { Max: 0, Min: 0 },
                  VCpuCount: { Max: 0, Min: 0 },
                },
                InstanceType: 0,
                KernelId: 0,
                KeyName: 0,
                LicenseSet: D.list({ LicenseConfigurationArn: 0 }),
                MaintenanceOptions: { AutoRecovery: 0 },
                MetadataOptions: {
                  HttpEndpoint: 0,
                  HttpProtocolIpv6: 0,
                  HttpTokens: 0,
                  HttpPutResponseHopLimit: 0,
                  InstanceMetadataTags: 0,
                },
                Monitoring: { Enabled: 0 },
                NetworkInterfaceSet: D.list({
                  AssociateCarrierIpAddress: 0,
                  AssociatePublicIpAddress: 0,
                  DeleteOnTermination: 0,
                  Description: 0,
                  DeviceIndex: 0,
                  Groups: 0,
                  InterfaceType: 0,
                  Ipv4PrefixCount: 0,
                  Ipv4Prefixes: D.list({ Ipv4Prefix: 0 }),
                  Ipv6AddressCount: 0,
                  Ipv6Addresses: D.list({ Ipv6Address: 0 }),
                  Ipv6PrefixCount: 0,
                  Ipv6Prefixes: D.list({ Ipv6Prefix: 0 }),
                  NetworkCardIndex: 0,
                  NetworkInterfaceId: 0,
                  PrivateIpAddress: 0,
                  PrivateIpAddresses: D.list({
                    Primary: 0,
                    PrivateIpAddress: 0,
                  }),
                  SecondaryPrivateIpAddressCount: 0,
                  SubnetId: 0,
                }),
                Placement: {
                  Affinity: 0,
                  AvailabilityZone: 0,
                  GroupName: 0,
                  HostId: 0,
                  HostResourceGroupArn: 0,
                  PartitionNumber: 0,
                  SpreadDomain: 0,
                  Tenancy: 0,
                },
                PrivateDnsNameOptions: {
                  EnableResourceNameDnsAAAARecord: 0,
                  EnableResourceNameDnsARecord: 0,
                  HostnameType: 0,
                },
                RamDiskId: 0,
                SecurityGroupIdSet: 0,
                SecurityGroupSet: 0,
                UserData: 0,
              },
              DefaultVersionNumber: 0,
              LatestVersionNumber: 0,
            },
            AwsSageMakerNotebookInstance: {
              AcceleratorTypes: 0,
              AdditionalCodeRepositories: 0,
              DefaultCodeRepository: 0,
              DirectInternetAccess: 0,
              FailureReason: 0,
              InstanceMetadataServiceConfiguration: {
                MinimumInstanceMetadataServiceVersion: 0,
              },
              InstanceType: 0,
              KmsKeyId: 0,
              NetworkInterfaceId: 0,
              NotebookInstanceArn: 0,
              NotebookInstanceLifecycleConfigName: 0,
              NotebookInstanceName: 0,
              NotebookInstanceStatus: 0,
              PlatformIdentifier: 0,
              RoleArn: 0,
              RootAccess: 0,
              SecurityGroups: 0,
              SubnetId: 0,
              Url: 0,
              VolumeSizeInGB: 0,
            },
            AwsWafv2WebAcl: {
              Name: 0,
              Arn: 0,
              ManagedbyFirewallManager: 0,
              Id: 0,
              Capacity: 0,
              CaptchaConfig: { ImmunityTimeProperty: { ImmunityTime: 0 } },
              DefaultAction: {
                Allow: i_AwsWafv2ActionAllowDetails,
                Block: i_AwsWafv2ActionBlockDetails,
              },
              Description: 0,
              Rules: D.list(i_AwsWafv2RulesDetails),
              VisibilityConfig: i_AwsWafv2VisibilityConfigDetails,
            },
            AwsWafv2RuleGroup: {
              Capacity: 0,
              Description: 0,
              Id: 0,
              Name: 0,
              Arn: 0,
              Rules: D.list(i_AwsWafv2RulesDetails),
              Scope: 0,
              VisibilityConfig: i_AwsWafv2VisibilityConfigDetails,
            },
            AwsEc2RouteTable: {
              AssociationSet: D.list({
                AssociationState: { State: 0, StatusMessage: 0 },
                GatewayId: 0,
                Main: 0,
                RouteTableAssociationId: 0,
                RouteTableId: 0,
                SubnetId: 0,
              }),
              OwnerId: 0,
              PropagatingVgwSet: D.list({ GatewayId: 0 }),
              RouteTableId: 0,
              RouteSet: D.list({
                CarrierGatewayId: 0,
                CoreNetworkArn: 0,
                DestinationCidrBlock: 0,
                DestinationIpv6CidrBlock: 0,
                DestinationPrefixListId: 0,
                EgressOnlyInternetGatewayId: 0,
                GatewayId: 0,
                InstanceId: 0,
                InstanceOwnerId: 0,
                LocalGatewayId: 0,
                NatGatewayId: 0,
                NetworkInterfaceId: 0,
                Origin: 0,
                State: 0,
                TransitGatewayId: 0,
                VpcPeeringConnectionId: 0,
              }),
              VpcId: 0,
            },
            AwsAmazonMqBroker: {
              AuthenticationStrategy: 0,
              AutoMinorVersionUpgrade: 0,
              BrokerArn: 0,
              BrokerName: 0,
              DeploymentMode: 0,
              EncryptionOptions: { KmsKeyId: 0, UseAwsOwnedKey: 0 },
              EngineType: 0,
              EngineVersion: 0,
              HostInstanceType: 0,
              BrokerId: 0,
              LdapServerMetadata: {
                Hosts: 0,
                RoleBase: 0,
                RoleName: 0,
                RoleSearchMatching: 0,
                RoleSearchSubtree: 0,
                ServiceAccountUsername: 0,
                UserBase: 0,
                UserRoleName: 0,
                UserSearchMatching: 0,
                UserSearchSubtree: 0,
              },
              Logs: {
                Audit: 0,
                General: 0,
                AuditLogGroup: 0,
                GeneralLogGroup: 0,
                Pending: { Audit: 0, General: 0 },
              },
              MaintenanceWindowStartTime: {
                DayOfWeek: 0,
                TimeOfDay: 0,
                TimeZone: 0,
              },
              PubliclyAccessible: 0,
              SecurityGroups: 0,
              StorageType: 0,
              SubnetIds: 0,
              Users: D.list({ PendingChange: 0, Username: 0 }),
            },
            AwsAppSyncGraphQlApi: {
              ApiId: 0,
              Id: 0,
              OpenIdConnectConfig:
                i_AwsAppSyncGraphQlApiOpenIdConnectConfigDetails,
              Name: 0,
              LambdaAuthorizerConfig:
                i_AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails,
              XrayEnabled: 0,
              Arn: 0,
              UserPoolConfig: i_AwsAppSyncGraphQlApiUserPoolConfigDetails,
              AuthenticationType: 0,
              LogConfig: {
                CloudWatchLogsRoleArn: 0,
                ExcludeVerboseContent: 0,
                FieldLogLevel: 0,
              },
              AdditionalAuthenticationProviders: D.list({
                AuthenticationType: 0,
                LambdaAuthorizerConfig:
                  i_AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails,
                OpenIdConnectConfig:
                  i_AwsAppSyncGraphQlApiOpenIdConnectConfigDetails,
                UserPoolConfig: i_AwsAppSyncGraphQlApiUserPoolConfigDetails,
              }),
              WafWebAclArn: 0,
            },
            AwsEventSchemasRegistry: {
              Description: 0,
              RegistryArn: 0,
              RegistryName: 0,
            },
            AwsGuardDutyDetector: {
              DataSources: {
                CloudTrail: { Status: 0 },
                DnsLogs: { Status: 0 },
                FlowLogs: { Status: 0 },
                Kubernetes: { AuditLogs: { Status: 0 } },
                MalwareProtection: {
                  ScanEc2InstanceWithFindings: {
                    EbsVolumes: { Reason: 0, Status: 0 },
                  },
                  ServiceRole: 0,
                },
                S3Logs: { Status: 0 },
              },
              Features: D.list({ Name: 0, Status: 0 }),
              FindingPublishingFrequency: 0,
              ServiceRole: 0,
              Status: 0,
            },
            AwsStepFunctionStateMachine: {
              Label: 0,
              LoggingConfiguration: {
                Destinations: D.list({
                  CloudWatchLogsLogGroup: { LogGroupArn: 0 },
                }),
                IncludeExecutionData: 0,
                Level: 0,
              },
              Name: 0,
              RoleArn: 0,
              StateMachineArn: 0,
              Status: 0,
              TracingConfiguration: { Enabled: 0 },
              Type: 0,
            },
            AwsAthenaWorkGroup: {
              Name: 0,
              Description: 0,
              State: 0,
              Configuration: {
                ResultConfiguration: {
                  EncryptionConfiguration: { EncryptionOption: 0, KmsKey: 0 },
                },
              },
            },
            AwsEventsEventbus: { Arn: 0, Name: 0, Policy: 0 },
            AwsDmsEndpoint: {
              CertificateArn: 0,
              DatabaseName: 0,
              EndpointArn: 0,
              EndpointIdentifier: 0,
              EndpointType: 0,
              EngineName: 0,
              ExternalId: 0,
              ExtraConnectionAttributes: 0,
              KmsKeyId: 0,
              Port: 0,
              ServerName: 0,
              SslMode: 0,
              Username: 0,
            },
            AwsEventsEndpoint: {
              Arn: 0,
              Description: 0,
              EndpointId: 0,
              EndpointUrl: 0,
              EventBuses: D.list({ EventBusArn: 0 }),
              Name: 0,
              ReplicationConfig: { State: 0 },
              RoleArn: 0,
              RoutingConfig: {
                FailoverConfig: {
                  Primary: { HealthCheck: 0 },
                  Secondary: { Route: 0 },
                },
              },
              State: 0,
              StateReason: 0,
            },
            AwsDmsReplicationTask: {
              CdcStartPosition: 0,
              CdcStartTime: 0,
              CdcStopPosition: 0,
              MigrationType: 0,
              Id: 0,
              ResourceIdentifier: 0,
              ReplicationInstanceArn: 0,
              ReplicationTaskIdentifier: 0,
              ReplicationTaskSettings: 0,
              SourceEndpointArn: 0,
              TableMappings: 0,
              TargetEndpointArn: 0,
              TaskData: 0,
            },
            AwsDmsReplicationInstance: {
              AllocatedStorage: 0,
              AutoMinorVersionUpgrade: 0,
              AvailabilityZone: 0,
              EngineVersion: 0,
              KmsKeyId: 0,
              MultiAZ: 0,
              PreferredMaintenanceWindow: 0,
              PubliclyAccessible: 0,
              ReplicationInstanceClass: 0,
              ReplicationInstanceIdentifier: 0,
              ReplicationSubnetGroup: { ReplicationSubnetGroupIdentifier: 0 },
              VpcSecurityGroups: D.list({ VpcSecurityGroupId: 0 }),
            },
            AwsRoute53HostedZone: {
              HostedZone: { Id: 0, Name: 0, Config: { Comment: 0 } },
              Vpcs: D.list({ Id: 0, Region: 0 }),
              NameServers: 0,
              QueryLoggingConfig: {
                CloudWatchLogsLogGroupArn: {
                  CloudWatchLogsLogGroupArn: 0,
                  HostedZoneId: 0,
                  Id: 0,
                },
              },
            },
            AwsMskCluster: {
              ClusterInfo: {
                EncryptionInfo: {
                  EncryptionInTransit: { InCluster: 0, ClientBroker: 0 },
                  EncryptionAtRest: { DataVolumeKMSKeyId: 0 },
                },
                CurrentVersion: 0,
                NumberOfBrokerNodes: 0,
                ClusterName: 0,
                ClientAuthentication: {
                  Sasl: { Iam: { Enabled: 0 }, Scram: { Enabled: 0 } },
                  Unauthenticated: { Enabled: 0 },
                  Tls: { CertificateAuthorityArnList: 0, Enabled: 0 },
                },
                EnhancedMonitoring: 0,
              },
            },
            AwsS3AccessPoint: {
              AccessPointArn: 0,
              Alias: 0,
              Bucket: 0,
              BucketAccountId: 0,
              Name: 0,
              NetworkOrigin: 0,
              PublicAccessBlockConfiguration:
                i_AwsS3AccountPublicAccessBlockDetails,
              VpcConfiguration: { VpcId: 0 },
            },
            AwsEc2ClientVpnEndpoint: {
              ClientVpnEndpointId: 0,
              Description: 0,
              ClientCidrBlock: 0,
              DnsServer: 0,
              SplitTunnel: 0,
              TransportProtocol: 0,
              VpnPort: 0,
              ServerCertificateArn: 0,
              AuthenticationOptions: D.list({
                Type: 0,
                ActiveDirectory: { DirectoryId: 0 },
                MutualAuthentication: { ClientRootCertificateChain: 0 },
                FederatedAuthentication: {
                  SamlProviderArn: 0,
                  SelfServiceSamlProviderArn: 0,
                },
              }),
              ConnectionLogOptions: {
                Enabled: 0,
                CloudwatchLogGroup: 0,
                CloudwatchLogStream: 0,
              },
              SecurityGroupIdSet: 0,
              VpcId: 0,
              SelfServicePortalUrl: 0,
              ClientConnectOptions: {
                Enabled: 0,
                LambdaFunctionArn: 0,
                Status: { Code: 0, Message: 0 },
              },
              SessionTimeoutHours: 0,
              ClientLoginBannerOptions: { Enabled: 0, BannerText: 0 },
            },
            CodeRepository: {
              ProviderType: 0,
              ProjectName: 0,
              CodeSecurityIntegrationArn: 0,
            },
            AzureResource: 0,
          },
          ApplicationName: 0,
          ApplicationArn: 0,
        }),
        Compliance: {
          Status: 0,
          RelatedRequirements: 0,
          StatusReasons: D.list({ ReasonCode: 0, Description: 0 }),
          SecurityControlId: 0,
          AssociatedStandards: D.list({ StandardsId: 0 }),
          SecurityControlParameters: D.list({ Name: 0, Value: 0 }),
        },
        VerificationState: 0,
        WorkflowState: 0,
        Workflow: { Status: 0 },
        RecordState: 0,
        RelatedFindings: D.list(i_RelatedFinding),
        Note: { Text: 0, UpdatedBy: 0, UpdatedAt: 0 },
        Vulnerabilities: D.list({
          Id: 0,
          VulnerablePackages: D.list({
            Name: 0,
            Version: 0,
            Epoch: 0,
            Release: 0,
            Architecture: 0,
            PackageManager: 0,
            FilePath: 0,
            FixedInVersion: 0,
            Remediation: 0,
            SourceLayerHash: 0,
            SourceLayerArn: 0,
          }),
          Cvss: D.list({
            Version: 0,
            BaseScore: 0,
            BaseVector: 0,
            Source: 0,
            Adjustments: D.list({ Metric: 0, Reason: 0 }),
          }),
          RelatedVulnerabilities: 0,
          Vendor: {
            Name: 0,
            Url: 0,
            VendorSeverity: 0,
            VendorCreatedAt: 0,
            VendorUpdatedAt: 0,
          },
          ReferenceUrls: 0,
          FixAvailable: 0,
          EpssScore: 0,
          ExploitAvailable: 0,
          LastKnownExploitAt: 0,
          CodeVulnerabilities: D.list({
            Cwes: 0,
            FilePath: { EndLine: 0, FileName: 0, FilePath: 0, StartLine: 0 },
            SourceArn: 0,
          }),
        }),
        PatchSummary: {
          Id: 0,
          InstalledCount: 0,
          MissingCount: 0,
          FailedCount: 0,
          InstalledOtherCount: 0,
          InstalledRejectedCount: 0,
          InstalledPendingReboot: 0,
          OperationStartTime: 0,
          OperationEndTime: 0,
          RebootOption: 0,
          Operation: 0,
        },
        Action: {
          ActionType: 0,
          NetworkConnectionAction: {
            ConnectionDirection: 0,
            RemoteIpDetails: i_ActionRemoteIpDetails,
            RemotePortDetails: { Port: 0, PortName: 0 },
            LocalPortDetails: i_ActionLocalPortDetails,
            Protocol: 0,
            Blocked: 0,
          },
          AwsApiCallAction: {
            Api: 0,
            ServiceName: 0,
            CallerType: 0,
            RemoteIpDetails: i_ActionRemoteIpDetails,
            DomainDetails: { Domain: 0 },
            AffectedResources: 0,
            FirstSeen: 0,
            LastSeen: 0,
          },
          DnsRequestAction: { Domain: 0, Protocol: 0, Blocked: 0 },
          PortProbeAction: {
            PortProbeDetails: D.list({
              LocalPortDetails: i_ActionLocalPortDetails,
              LocalIpDetails: { IpAddressV4: 0 },
              RemoteIpDetails: i_ActionRemoteIpDetails,
            }),
            Blocked: 0,
          },
        },
        FindingProviderFields: {
          Confidence: 0,
          Criticality: 0,
          RelatedFindings: D.list(i_RelatedFinding),
          Severity: { Label: 0, Original: 0 },
          Types: 0,
        },
        Sample: 0,
        GeneratorDetails: { Name: 0, Description: 0, Labels: 0 },
        ProcessedAt: 0,
        AwsAccountName: 0,
        Detection: {
          Sequence: {
            Uid: 0,
            Actors: D.list({
              Id: 0,
              User: {
                Name: 0,
                Uid: 0,
                Type: 0,
                CredentialUid: 0,
                Account: { Uid: 0, Name: 0 },
              },
              Session: { Uid: 0, MfaStatus: 0, CreatedTime: 0, Issuer: 0 },
            }),
            Endpoints: D.list({
              Id: 0,
              Ip: 0,
              Domain: 0,
              Port: 0,
              Location: { City: 0, Country: 0, Lat: 0, Lon: 0 },
              AutonomousSystem: { Name: 0, Number: 0 },
              Connection: { Direction: 0 },
            }),
            Signals: D.list({
              Type: 0,
              Id: 0,
              Title: 0,
              ProductArn: 0,
              ResourceIds: 0,
              SignalIndicators: D.list(i_Indicator),
              Name: 0,
              CreatedAt: 0,
              UpdatedAt: 0,
              FirstSeenAt: 0,
              LastSeenAt: 0,
              Severity: 0,
              Count: 0,
              ActorIds: 0,
              EndpointIds: 0,
            }),
            SequenceIndicators: D.list(i_Indicator),
          },
        },
      }),
    },
    body: true,
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchImportFindings",
})) as any;

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
  BatchUpdateAutomationRulesRequest,
  BatchUpdateAutomationRulesResponse,
  BatchUpdateAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /automationrules/update",
    input: {
      UpdateAutomationRulesRequestItems: D.list({
        RuleArn: 0,
        RuleStatus: 0,
        RuleOrder: 0,
        Description: 0,
        RuleName: 0,
        IsTerminal: 0,
        Criteria: i_AutomationRulesFindingFilters,
        Actions: D.list(i_AutomationRulesAction),
      }),
    },
    body: true,
  },
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
})) as any;

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
 * If you use this operation to update a finding, your updates don’t affect the value for the `UpdatedAt` field of the finding.
 * Also note that it can take several minutes for Security Hub CSPM to process your request and update each finding specified in the request.
 *
 * You can configure IAM policies to restrict access to fields and field values.
 * For example, you might not want member accounts to be able to suppress findings or change the finding severity.
 * For more information see Configuring access to BatchUpdateFindings in the *Security Hub CSPM User Guide*.
 */
export const batchUpdateFindings: API.OperationMethod<
  BatchUpdateFindingsRequest,
  BatchUpdateFindingsResponse,
  BatchUpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /findings/batchupdate",
    input: {
      FindingIdentifiers: D.list(i_AwsSecurityFindingIdentifier),
      Note: i_NoteUpdate,
      Severity: i_SeverityUpdate,
      VerificationState: 0,
      Confidence: 0,
      Criticality: 0,
      Types: 0,
      UserDefinedFields: 0,
      Workflow: i_WorkflowUpdate,
      RelatedFindings: D.list(i_RelatedFinding),
    },
    body: true,
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFindings",
})) as any;

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
  BatchUpdateFindingsV2Request,
  BatchUpdateFindingsV2Response,
  BatchUpdateFindingsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /findingsv2/batchupdatev2",
    input: {
      MetadataUids: 0,
      FindingIdentifiers: D.list({
        CloudAccountUid: 0,
        FindingInfoUid: 0,
        MetadataProductUid: 0,
      }),
      Comment: 0,
      SeverityId: 0,
      StatusId: 0,
    },
    body: true,
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
  operationName: "BatchUpdateFindingsV2",
})) as any;

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
  BatchUpdateStandardsControlAssociationsRequest,
  BatchUpdateStandardsControlAssociationsResponse,
  BatchUpdateStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /associations",
    input: {
      StandardsControlAssociationUpdates: D.list({
        StandardsArn: 0,
        SecurityControlId: 0,
        AssociationStatus: 0,
        UpdatedReason: 0,
      }),
    },
    body: true,
  },
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
})) as any;

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
  CreateActionTargetRequest,
  CreateActionTargetResponse,
  CreateActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /actionTargets",
    input: { Name: 0, Description: 0, Id: 0 },
    body: true,
  },
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
})) as any;

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
  CreateAggregatorV2Request,
  CreateAggregatorV2Response,
  CreateAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /aggregatorv2/create",
    input: {
      RegionLinkingMode: 0,
      LinkedRegions: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateAggregatorV2",
})) as any;

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
  CreateAutomationRuleRequest,
  CreateAutomationRuleResponse,
  CreateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /automationrules/create",
    input: {
      Tags: 0,
      RuleStatus: 0,
      RuleOrder: 0,
      RuleName: 0,
      Description: 0,
      IsTerminal: 0,
      Criteria: i_AutomationRulesFindingFilters,
      Actions: D.list(i_AutomationRulesAction),
    },
    body: true,
  },
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
})) as any;

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
  CreateAutomationRuleV2Request,
  CreateAutomationRuleV2Response,
  CreateAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /automationrulesv2/create",
    input: {
      RuleName: 0,
      RuleStatus: 0,
      Description: 0,
      RuleOrder: 0,
      Criteria: i_Criteria,
      Actions: D.list(i_AutomationRulesActionV2),
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateAutomationRuleV2",
})) as any;

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
  CreateConfigurationPolicyRequest,
  CreateConfigurationPolicyResponse,
  CreateConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationPolicy/create",
    input: { Name: 0, Description: 0, ConfigurationPolicy: i_Policy, Tags: 0 },
    output: { UpdatedAt: D.ts, CreatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connectors",
    input: {
      Name: 0,
      Description: 0,
      Provider: { Azure: i_AzureProviderConfiguration },
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  CreateConnectorV2Request,
  CreateConnectorV2Response,
  CreateConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connectorsv2",
    input: {
      Name: 0,
      Description: 0,
      Provider: {
        JiraCloud: { ProjectKey: 0 },
        ServiceNow: { InstanceName: 0, SecretArn: 0 },
        Azure: i_AzureProviderConfiguration,
      },
      KmsKeyArn: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateConnectorV2",
})) as any;

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
  CreateFindingAggregatorRequest,
  CreateFindingAggregatorResponse,
  CreateFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingAggregator/create",
    input: { RegionLinkingMode: 0, Regions: 0 },
    body: true,
  },
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
})) as any;

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
  CreateInsightRequest,
  CreateInsightResponse,
  CreateInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /insights",
    input: {
      Name: 0,
      Filters: i_AwsSecurityFindingFilters,
      GroupByAttribute: 0,
    },
    body: true,
  },
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
})) as any;

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
  CreateMembersRequest,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members",
    input: { AccountDetails: D.list({ AccountId: 0, Email: 0 }) },
    body: true,
  },
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
})) as any;

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
  CreateTicketV2Request,
  CreateTicketV2Response,
  CreateTicketV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ticketsv2",
    input: {
      ConnectorId: 0,
      FindingMetadataUid: 0,
      ClientToken: D.m({ idempotency: true }),
      Mode: 0,
    },
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
  operationName: "CreateTicketV2",
})) as any;

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
  DeclineInvitationsRequest,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations/decline",
    input: { AccountIds: 0 },
    body: true,
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
})) as any;

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
  DeleteActionTargetRequest,
  DeleteActionTargetResponse,
  DeleteActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /actionTargets/{ActionTargetArn+}",
    input: { ActionTargetArn: 0 },
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActionTarget",
})) as any;

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
  DeleteAggregatorV2Request,
  DeleteAggregatorV2Response,
  DeleteAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /aggregatorv2/delete/{AggregatorV2Arn+}",
    input: { AggregatorV2Arn: 0 },
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
  operationName: "DeleteAggregatorV2",
})) as any;

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
  DeleteAutomationRuleV2Request,
  DeleteAutomationRuleV2Response,
  DeleteAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /automationrulesv2/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "DeleteAutomationRuleV2",
})) as any;

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
  DeleteConfigurationPolicyRequest,
  DeleteConfigurationPolicyResponse,
  DeleteConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /configurationPolicy/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /connectors/{ConnectorId+}",
    input: { ConnectorId: 0 },
  },
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
})) as any;

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
  DeleteConnectorV2Request,
  DeleteConnectorV2Response,
  DeleteConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /connectorsv2/{ConnectorId+}",
    input: { ConnectorId: 0 },
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
  operationName: "DeleteConnectorV2",
})) as any;

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
  DeleteFindingAggregatorRequest,
  DeleteFindingAggregatorResponse,
  DeleteFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /findingAggregator/delete/{FindingAggregatorArn+}",
    input: { FindingAggregatorArn: 0 },
  },
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
})) as any;

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
  DeleteInsightRequest,
  DeleteInsightResponse,
  DeleteInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /insights/{InsightArn+}",
    input: { InsightArn: 0 },
  },
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
})) as any;

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
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /invitations/delete",
    input: { AccountIds: 0 },
    body: true,
  },
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
})) as any;

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
  DeleteMembersRequest,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/delete",
    input: { AccountIds: 0 },
    body: true,
  },
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
})) as any;

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
  DescribeActionTargetsRequest,
  DescribeActionTargetsResponse,
  DescribeActionTargetsError,
  Credentials | HttpClient.HttpClient,
  ActionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /actionTargets/get",
    input: { ActionTargetArns: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
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
  DescribeHubRequest,
  DescribeHubResponse,
  DescribeHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts",
    input: { HubArn: D.m({ query: "HubArn" }) },
  },
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
})) as any;

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
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /organization/configuration",
    input: {},
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
})) as any;

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
  DescribeProductsRequest,
  DescribeProductsResponse,
  DescribeProductsError,
  Credentials | HttpClient.HttpClient,
  Product
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /products",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      ProductArn: D.m({ query: "ProductArn" }),
    },
  },
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
  DescribeProductsV2Request,
  DescribeProductsV2Response,
  DescribeProductsV2Error,
  Credentials | HttpClient.HttpClient,
  ProductV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /productsV2",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
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
  operationName: "DescribeProductsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProductsV2",
    pageSize: "MaxResults",
  } as const,
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
  DescribeSecurityHubV2Request,
  DescribeSecurityHubV2Response,
  DescribeSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /hubv2",
    input: {},
    output: { Features: D.map({ UpdatedAt: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityHubV2",
})) as any;

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
  DescribeStandardsRequest,
  DescribeStandardsResponse,
  DescribeStandardsError,
  Credentials | HttpClient.HttpClient,
  Standard
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /standards",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Providers: D.m({ query: "Providers" }),
    },
  },
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
  DescribeStandardsControlsRequest,
  DescribeStandardsControlsResponse,
  DescribeStandardsControlsError,
  Credentials | HttpClient.HttpClient,
  StandardsControl
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /standards/controls/{StandardsSubscriptionArn+}",
    input: {
      StandardsSubscriptionArn: 0,
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Controls: D.list({ ControlStatusUpdatedAt: D.ts }) },
  },
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
  DisableImportFindingsForProductRequest,
  DisableImportFindingsForProductResponse,
  DisableImportFindingsForProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /productSubscriptions/{ProductSubscriptionArn+}",
    input: { ProductSubscriptionArn: 0 },
  },
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
})) as any;

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
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/admin/disable",
    input: { AdminAccountId: 0, Feature: 0 },
    body: true,
  },
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
})) as any;

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
  DisableSecurityHubRequest,
  DisableSecurityHubResponse,
  DisableSecurityHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /accounts", input: {} },
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
})) as any;

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
  DisableSecurityHubFeatureV2Request,
  DisableSecurityHubFeatureV2Response,
  DisableSecurityHubFeatureV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /hubv2/feature/{FeatureName}",
    input: { FeatureName: 0 },
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
  operationName: "DisableSecurityHubFeatureV2",
})) as any;

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
  DisableSecurityHubV2Request,
  DisableSecurityHubV2Response,
  DisableSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /hubv2", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSecurityHubV2",
})) as any;

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
  DisassociateFromAdministratorAccountRequest,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /administrator/disassociate",
    input: {},
  },
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
})) as any;

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
  DisassociateFromMasterAccountRequest,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /master/disassociate", input: {} },
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
})) as any;

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
  DisassociateMembersRequest,
  DisassociateMembersResponse,
  DisassociateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/disassociate",
    input: { AccountIds: 0 },
    body: true,
  },
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
})) as any;

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
  EnableImportFindingsForProductRequest,
  EnableImportFindingsForProductResponse,
  EnableImportFindingsForProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /productSubscriptions",
    input: { ProductArn: 0 },
    body: true,
  },
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
})) as any;

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
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/admin/enable",
    input: { AdminAccountId: 0, Feature: 0 },
    body: true,
  },
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
})) as any;

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
  EnableSecurityHubRequest,
  EnableSecurityHubResponse,
  EnableSecurityHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts",
    input: { Tags: 0, EnableDefaultStandards: 0, ControlFindingGenerator: 0 },
    body: true,
  },
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
})) as any;

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
  EnableSecurityHubFeatureV2Request,
  EnableSecurityHubFeatureV2Response,
  EnableSecurityHubFeatureV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hubv2/feature/{FeatureName}",
    input: { FeatureName: 0 },
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
  operationName: "EnableSecurityHubFeatureV2",
})) as any;

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
  EnableSecurityHubV2Request,
  EnableSecurityHubV2Response,
  EnableSecurityHubV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hubv2",
    input: { Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSecurityHubV2",
})) as any;

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
  GenerateRecommendedPolicyV2Request,
  GenerateRecommendedPolicyV2Response,
  GenerateRecommendedPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recommendedPolicyV2/{MetadataUid}",
    input: { MetadataUid: 0 },
  },
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
})) as any;

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
  GetAdministratorAccountRequest,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /administrator",
    input: {},
    output: { Administrator: o_Invitation },
  },
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
})) as any;

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
  GetAggregatorV2Request,
  GetAggregatorV2Response,
  GetAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /aggregatorv2/get/{AggregatorV2Arn+}",
    input: { AggregatorV2Arn: 0 },
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
  operationName: "GetAggregatorV2",
})) as any;

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
  GetAutomationRuleV2Request,
  GetAutomationRuleV2Response,
  GetAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /automationrulesv2/{Identifier}",
    input: { Identifier: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "GetAutomationRuleV2",
})) as any;

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
  GetConfigurationPolicyRequest,
  GetConfigurationPolicyResponse,
  GetConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configurationPolicy/get/{Identifier}",
    input: { Identifier: 0 },
    output: { UpdatedAt: D.ts, CreatedAt: D.ts },
  },
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
})) as any;

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
  GetConfigurationPolicyAssociationRequest,
  GetConfigurationPolicyAssociationResponse,
  GetConfigurationPolicyAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationPolicyAssociation/get",
    input: { Target: i_Target },
    output: { UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  GetConnectorRequest,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connectors/{ConnectorId+}",
    input: { ConnectorId: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      Health: { LastCheckedAt: D.ts },
    },
  },
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
})) as any;

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
  GetConnectorV2Request,
  GetConnectorV2Response,
  GetConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connectorsv2/{ConnectorId+}",
    input: { ConnectorId: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      Health: { LastCheckedAt: D.ts },
    },
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
  operationName: "GetConnectorV2",
})) as any;

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
  GetEnabledStandardsRequest,
  GetEnabledStandardsResponse,
  GetEnabledStandardsError,
  Credentials | HttpClient.HttpClient,
  StandardsSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /standards/get",
    input: {
      StandardsSubscriptionArns: 0,
      NextToken: 0,
      MaxResults: 0,
      Providers: 0,
    },
    body: true,
  },
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
})) as any;

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
  GetFindingAggregatorRequest,
  GetFindingAggregatorResponse,
  GetFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /findingAggregator/get/{FindingAggregatorArn+}",
    input: { FindingAggregatorArn: 0 },
  },
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
})) as any;

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
  GetFindingHistoryRequest,
  GetFindingHistoryResponse,
  GetFindingHistoryError,
  Credentials | HttpClient.HttpClient,
  FindingHistoryRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingHistory/get",
    input: {
      FindingIdentifier: i_AwsSecurityFindingIdentifier,
      StartTime: D.tsAs("date-time"),
      EndTime: D.tsAs("date-time"),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Records: D.list({ UpdateTime: D.ts }) },
    body: true,
  },
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
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient,
  AwsSecurityFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings",
    input: {
      Filters: i_AwsSecurityFindingFilters,
      SortCriteria: D.list(i_SortCriterion),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
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
  GetFindingStatisticsV2Request,
  GetFindingStatisticsV2Response,
  GetFindingStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingsv2/statistics",
    input: {
      GroupByRules: D.list({ Filters: i_OcsfFindingFilters, GroupByField: 0 }),
      Scopes: i_FindingScopes,
      SortOrder: 0,
      MaxStatisticResults: 0,
    },
    body: true,
  },
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
})) as any;

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
  GetFindingsTrendsV2Request,
  GetFindingsTrendsV2Response,
  GetFindingsTrendsV2Error,
  Credentials | HttpClient.HttpClient,
  TrendsMetricsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingsTrendsv2",
    input: {
      Filters: {
        CompositeFilters: D.list(i_FindingsTrendsCompositeFilter),
        CompositeOperator: 0,
      },
      StartTime: D.tsAs("date-time"),
      EndTime: D.tsAs("date-time"),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { TrendsMetrics: D.list({ Timestamp: D.ts }) },
    body: true,
  },
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
  GetFindingsV2Request,
  GetFindingsV2Response,
  GetFindingsV2Error,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findingsv2",
    input: {
      Filters: i_OcsfFindingFilters,
      Scopes: i_FindingScopes,
      SortCriteria: D.list(i_SortCriterion),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
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
  GetInsightResultsRequest,
  GetInsightResultsResponse,
  GetInsightResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/results/{InsightArn+}",
    input: { InsightArn: 0 },
  },
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
})) as any;

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
  GetInsightsRequest,
  GetInsightsResponse,
  GetInsightsError,
  Credentials | HttpClient.HttpClient,
  Insight
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /insights/get",
    input: { InsightArns: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
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
  GetInvitationsCountRequest,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /invitations/count", input: {} },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
})) as any;

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
  GetMasterAccountRequest,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /master",
    input: {},
    output: { Master: o_Invitation },
  },
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
})) as any;

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
  GetMembersRequest,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/get",
    input: { AccountIds: 0 },
    output: { Members: D.list(o_Member) },
    body: true,
  },
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
})) as any;

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
  GetRecommendedPolicyV2Request,
  GetRecommendedPolicyV2Response,
  GetRecommendedPolicyV2Error,
  Credentials | HttpClient.HttpClient,
  RecommendationStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /recommendedPolicyV2/{MetadataUid}",
    input: {
      MetadataUid: 0,
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      RecommendationSteps: D.list({
        UnusedPermissions: { PolicyUpdatedAt: D.ts },
      }),
    },
  },
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
  GetResourcesStatisticsV2Request,
  GetResourcesStatisticsV2Response,
  GetResourcesStatisticsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /resourcesv2/statistics",
    input: {
      GroupByRules: D.list({ GroupByField: 0, Filters: i_ResourcesFilters }),
      Scopes: i_ResourceScopes,
      SortOrder: 0,
      MaxStatisticResults: 0,
    },
    body: true,
  },
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
})) as any;

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
  GetResourcesTrendsV2Request,
  GetResourcesTrendsV2Response,
  GetResourcesTrendsV2Error,
  Credentials | HttpClient.HttpClient,
  ResourcesTrendsMetricsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /resourcesTrendsv2",
    input: {
      Filters: {
        CompositeFilters: D.list(i_ResourcesTrendsCompositeFilter),
        CompositeOperator: 0,
      },
      StartTime: D.tsAs("date-time"),
      EndTime: D.tsAs("date-time"),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { TrendsMetrics: D.list({ Timestamp: D.ts }) },
    body: true,
  },
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
  GetResourcesV2Request,
  GetResourcesV2Response,
  GetResourcesV2Error,
  Credentials | HttpClient.HttpClient,
  ResourceResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /resourcesv2",
    input: {
      Filters: i_ResourcesFilters,
      Scopes: i_ResourceScopes,
      SortCriteria: D.list(i_SortCriterion),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
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
  GetSecurityControlDefinitionRequest,
  GetSecurityControlDefinitionResponse,
  GetSecurityControlDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /securityControl/definition",
    input: { SecurityControlId: D.m({ query: "SecurityControlId" }) },
  },
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
  InviteMembersRequest,
  InviteMembersResponse,
  InviteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/invite",
    input: { AccountIds: 0 },
    body: true,
  },
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
})) as any;

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
  ListAggregatorsV2Request,
  ListAggregatorsV2Response,
  ListAggregatorsV2Error,
  Credentials | HttpClient.HttpClient,
  AggregatorV2
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /aggregatorv2/list",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
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
  operationName: "ListAggregatorsV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregatorsV2",
    pageSize: "MaxResults",
  } as const,
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
  ListAutomationRulesRequest,
  ListAutomationRulesResponse,
  ListAutomationRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /automationrules/list",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      AutomationRulesMetadata: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
  },
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
})) as any;

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
  ListAutomationRulesV2Request,
  ListAutomationRulesV2Response,
  ListAutomationRulesV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /automationrulesv2/list",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Rules: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
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
  operationName: "ListAutomationRulesV2",
})) as any;

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
  ListConfigurationPoliciesRequest,
  ListConfigurationPoliciesResponse,
  ListConfigurationPoliciesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /configurationPolicy/list",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { ConfigurationPolicySummaries: D.list({ UpdatedAt: D.ts }) },
  },
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
  ListConfigurationPolicyAssociationsRequest,
  ListConfigurationPolicyAssociationsResponse,
  ListConfigurationPolicyAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationPolicyAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationPolicyAssociation/list",
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filters: {
        ConfigurationPolicyId: 0,
        AssociationType: 0,
        AssociationStatus: 0,
      },
    },
    output: {
      ConfigurationPolicyAssociationSummaries: D.list(
        o_ConfigurationPolicyAssociationSummary,
      ),
    },
    body: true,
  },
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
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connectors",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      ProviderName: D.m({ query: "ProviderName" }),
      ConnectorStatus: D.m({ query: "ConnectorStatus" }),
      EnablementStatus: D.m({ query: "EnablementStatus" }),
    },
    output: { Connectors: D.list({ CreatedAt: D.ts }) },
  },
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
})) as any;

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
  ListConnectorsV2Request,
  ListConnectorsV2Response,
  ListConnectorsV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connectorsv2",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      ProviderName: D.m({ query: "ProviderName" }),
      ConnectorStatus: D.m({ query: "ConnectorStatus" }),
      EnablementStatus: D.m({ query: "EnablementStatus" }),
    },
    output: { Connectors: D.list({ CreatedAt: D.ts }) },
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
  operationName: "ListConnectorsV2",
})) as any;

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
  ListEnabledProductsForImportRequest,
  ListEnabledProductsForImportResponse,
  ListEnabledProductsForImportError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /productSubscriptions",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  ListFindingAggregatorsRequest,
  ListFindingAggregatorsResponse,
  ListFindingAggregatorsError,
  Credentials | HttpClient.HttpClient,
  FindingAggregator
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /findingAggregator/list",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  ListFreeTrialStatusesV2Request,
  ListFreeTrialStatusesV2Response,
  ListFreeTrialStatusesV2Error,
  Credentials | HttpClient.HttpClient,
  AccountFreeTrialStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /freetrial/statusv2/list",
    input: { AccountIds: 0, Statuses: 0, MaxResults: 0, NextToken: 0 },
    output: {
      AccountFreeTrialStatuses: D.list({
        EvaluatedAt: D.ts,
        FreeTrialStatuses: D.list({ StartedAt: D.ts, ExpiresAt: D.ts }),
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
  operationName: "ListFreeTrialStatusesV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountFreeTrialStatuses",
    pageSize: "MaxResults",
  } as const,
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
  ListInvitationsRequest,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  Invitation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /invitations",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Invitations: D.list(o_Invitation) },
  },
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
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /members",
    input: {
      OnlyAssociated: D.m({ query: "OnlyAssociated" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Members: D.list(o_Member) },
  },
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
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /organization/admin",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      Feature: D.m({ query: "Feature" }),
    },
  },
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
  ListSecurityControlDefinitionsRequest,
  ListSecurityControlDefinitionsResponse,
  ListSecurityControlDefinitionsError,
  Credentials | HttpClient.HttpClient,
  SecurityControlDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /securityControls/definitions",
    input: {
      StandardsArn: D.m({ query: "StandardsArn" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Providers: D.m({ query: "Providers" }),
    },
  },
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
  ListStandardsControlAssociationsRequest,
  ListStandardsControlAssociationsResponse,
  ListStandardsControlAssociationsError,
  Credentials | HttpClient.HttpClient,
  StandardsControlAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /associations",
    input: {
      SecurityControlId: D.m({ query: "SecurityControlId" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      StandardsControlAssociationSummaries: D.list({ UpdatedAt: D.ts }),
    },
  },
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
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  RegisterConnectorV2Request,
  RegisterConnectorV2Response,
  RegisterConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connectorsv2/register",
    input: { AuthCode: 0, AuthState: 0 },
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
  operationName: "RegisterConnectorV2",
})) as any;

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
  StartConfigurationPolicyAssociationRequest,
  StartConfigurationPolicyAssociationResponse,
  StartConfigurationPolicyAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationPolicyAssociation/associate",
    input: { ConfigurationPolicyIdentifier: 0, Target: i_Target },
    output: { UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
 * disassociate a configuration from its target, the target inherits the configuration of the closest parent. If there’s no
 * configuration to inherit, the target retains its settings but becomes a self-managed account. A target can be disassociated from
 * a configuration policy or self-managed behavior. Only the Security Hub CSPM delegated administrator can invoke this
 * operation from the home Region.
 */
export const startConfigurationPolicyDisassociation: API.OperationMethod<
  StartConfigurationPolicyDisassociationRequest,
  StartConfigurationPolicyDisassociationResponse,
  StartConfigurationPolicyDisassociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationPolicyAssociation/disassociate",
    input: { Target: i_Target, ConfigurationPolicyIdentifier: 0 },
    body: true,
  },
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
})) as any;

export type TagResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to a resource.
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
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from a resource.
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
  errors: [InternalException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  UpdateActionTargetRequest,
  UpdateActionTargetResponse,
  UpdateActionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /actionTargets/{ActionTargetArn+}",
    input: { ActionTargetArn: 0, Name: 0, Description: 0 },
    body: true,
  },
  errors: [
    InternalException,
    InvalidAccessException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionTarget",
})) as any;

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
  UpdateAggregatorV2Request,
  UpdateAggregatorV2Response,
  UpdateAggregatorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /aggregatorv2/update/{AggregatorV2Arn+}",
    input: { AggregatorV2Arn: 0, RegionLinkingMode: 0, LinkedRegions: 0 },
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
  operationName: "UpdateAggregatorV2",
})) as any;

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
  UpdateAutomationRuleV2Request,
  UpdateAutomationRuleV2Response,
  UpdateAutomationRuleV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /automationrulesv2/{Identifier}",
    input: {
      Identifier: 0,
      RuleStatus: 0,
      RuleOrder: 0,
      Description: 0,
      RuleName: 0,
      Criteria: i_Criteria,
      Actions: D.list(i_AutomationRulesActionV2),
    },
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
  operationName: "UpdateAutomationRuleV2",
})) as any;

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
  UpdateConfigurationPolicyRequest,
  UpdateConfigurationPolicyResponse,
  UpdateConfigurationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /configurationPolicy/{Identifier}",
    input: {
      Identifier: 0,
      Name: 0,
      Description: 0,
      UpdatedReason: 0,
      ConfigurationPolicy: i_Policy,
    },
    output: { UpdatedAt: D.ts, CreatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  UpdateConnectorRequest,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /connectors/{ConnectorId+}",
    input: {
      ConnectorId: 0,
      Description: 0,
      Provider: { Azure: i_AzureUpdateConfiguration },
    },
    body: true,
  },
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
})) as any;

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
  UpdateConnectorV2Request,
  UpdateConnectorV2Response,
  UpdateConnectorV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /connectorsv2/{ConnectorId+}",
    input: {
      ConnectorId: 0,
      Description: 0,
      Provider: {
        JiraCloud: { ProjectKey: 0 },
        ServiceNow: { SecretArn: 0 },
        Azure: i_AzureUpdateConfiguration,
      },
    },
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
  operationName: "UpdateConnectorV2",
})) as any;

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
  UpdateFindingAggregatorRequest,
  UpdateFindingAggregatorResponse,
  UpdateFindingAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /findingAggregator/update",
    input: { FindingAggregatorArn: 0, RegionLinkingMode: 0, Regions: 0 },
    body: true,
  },
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
})) as any;

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
  UpdateFindingsRequest,
  UpdateFindingsResponse,
  UpdateFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /findings",
    input: {
      Filters: i_AwsSecurityFindingFilters,
      Note: i_NoteUpdate,
      RecordState: 0,
    },
    body: true,
  },
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
})) as any;

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
  UpdateInsightRequest,
  UpdateInsightResponse,
  UpdateInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /insights/{InsightArn+}",
    input: {
      InsightArn: 0,
      Name: 0,
      Filters: i_AwsSecurityFindingFilters,
      GroupByAttribute: 0,
    },
    body: true,
  },
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
})) as any;

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
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/configuration",
    input: {
      AutoEnable: 0,
      AutoEnableStandards: 0,
      OrganizationConfiguration: {
        ConfigurationType: 0,
        Status: 0,
        StatusMessage: 0,
      },
    },
    body: true,
  },
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
})) as any;

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
  UpdateSecurityControlRequest,
  UpdateSecurityControlResponse,
  UpdateSecurityControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /securityControl/update",
    input: {
      SecurityControlId: 0,
      Parameters: D.map(i_ParameterConfiguration),
      LastUpdateReason: 0,
    },
    body: true,
  },
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
})) as any;

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
  UpdateSecurityHubConfigurationRequest,
  UpdateSecurityHubConfigurationResponse,
  UpdateSecurityHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /accounts",
    input: { AutoEnableControls: 0, ControlFindingGenerator: 0 },
    body: true,
  },
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
})) as any;

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
  UpdateStandardsControlRequest,
  UpdateStandardsControlResponse,
  UpdateStandardsControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /standards/control/{StandardsControlArn+}",
    input: { StandardsControlArn: 0, ControlStatus: 0, DisabledReason: 0 },
    body: true,
  },
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
})) as any;

const i_ActionLocalPortDetails: D.LazyStruct = () => ({ Port: 0, PortName: 0 });
const i_ActionRemoteIpDetails: D.LazyStruct = () => ({
  IpAddressV4: 0,
  Organization: { Asn: 0, AsnOrg: 0, Isp: 0, Org: 0 },
  Country: { CountryCode: 0, CountryName: 0 },
  City: { CityName: 0 },
  GeoLocation: { Lon: 0, Lat: 0 },
});
const i_AutomationRulesAction: D.LazyStruct = () => ({
  Type: 0,
  FindingFieldsUpdate: {
    Note: i_NoteUpdate,
    Severity: i_SeverityUpdate,
    VerificationState: 0,
    Confidence: 0,
    Criticality: 0,
    Types: 0,
    UserDefinedFields: 0,
    Workflow: i_WorkflowUpdate,
    RelatedFindings: D.list(i_RelatedFinding),
  },
});
const i_AutomationRulesActionV2: D.LazyStruct = () => ({
  Type: 0,
  FindingFieldsUpdate: { SeverityId: 0, Comment: 0, StatusId: 0 },
  ExternalIntegrationConfiguration: { ConnectorArn: 0 },
});
const i_AutomationRulesFindingFilters: D.LazyStruct = () => ({
  ProductArn: D.list(i_StringFilter),
  AwsAccountId: D.list(i_StringFilter),
  Id: D.list(i_StringFilter),
  GeneratorId: D.list(i_StringFilter),
  Type: D.list(i_StringFilter),
  FirstObservedAt: D.list(i_DateFilter),
  LastObservedAt: D.list(i_DateFilter),
  CreatedAt: D.list(i_DateFilter),
  UpdatedAt: D.list(i_DateFilter),
  Confidence: D.list(i_NumberFilter),
  Criticality: D.list(i_NumberFilter),
  Title: D.list(i_StringFilter),
  Description: D.list(i_StringFilter),
  SourceUrl: D.list(i_StringFilter),
  ProductName: D.list(i_StringFilter),
  CompanyName: D.list(i_StringFilter),
  SeverityLabel: D.list(i_StringFilter),
  ResourceType: D.list(i_StringFilter),
  ResourceId: D.list(i_StringFilter),
  ResourcePartition: D.list(i_StringFilter),
  ResourceRegion: D.list(i_StringFilter),
  ResourceTags: D.list(i_MapFilter),
  ResourceDetailsOther: D.list(i_MapFilter),
  ComplianceStatus: D.list(i_StringFilter),
  ComplianceSecurityControlId: D.list(i_StringFilter),
  ComplianceAssociatedStandardsId: D.list(i_StringFilter),
  VerificationState: D.list(i_StringFilter),
  WorkflowStatus: D.list(i_StringFilter),
  RecordState: D.list(i_StringFilter),
  RelatedFindingsProductArn: D.list(i_StringFilter),
  RelatedFindingsId: D.list(i_StringFilter),
  NoteText: D.list(i_StringFilter),
  NoteUpdatedAt: D.list(i_DateFilter),
  NoteUpdatedBy: D.list(i_StringFilter),
  UserDefinedFields: D.list(i_MapFilter),
  ResourceApplicationArn: D.list(i_StringFilter),
  ResourceApplicationName: D.list(i_StringFilter),
  AwsAccountName: D.list(i_StringFilter),
  ResourceProvider: D.list(i_StringFilter),
  ResourceOwnerAccountId: D.list(i_StringFilter),
  ResourceOwnerOrgId: D.list(i_StringFilter),
});
const i_AwsApiGatewayAccessLogSettings: D.LazyStruct = () => ({
  Format: 0,
  DestinationArn: 0,
});
const i_AwsApiGatewayV2RouteSettings: D.LazyStruct = () => ({
  DetailedMetricsEnabled: 0,
  LoggingLevel: 0,
  DataTraceEnabled: 0,
  ThrottlingBurstLimit: 0,
  ThrottlingRateLimit: 0,
});
const i_AwsAppSyncGraphQlApiLambdaAuthorizerConfigDetails: D.LazyStruct =
  () => ({
    AuthorizerResultTtlInSeconds: 0,
    AuthorizerUri: 0,
    IdentityValidationExpression: 0,
  });
const i_AwsAppSyncGraphQlApiOpenIdConnectConfigDetails: D.LazyStruct = () => ({
  AuthTtL: 0,
  ClientId: 0,
  IatTtL: 0,
  Issuer: 0,
});
const i_AwsAppSyncGraphQlApiUserPoolConfigDetails: D.LazyStruct = () => ({
  AppIdClientRegex: 0,
  AwsRegion: 0,
  DefaultAction: 0,
  UserPoolId: 0,
});
const i_AwsBackupBackupPlanLifecycleDetails: D.LazyStruct = () => ({
  DeleteAfterDays: 0,
  MoveToColdStorageAfterDays: 0,
});
const i_AwsCertificateManagerCertificateDomainValidationOption: D.LazyStruct =
  () => ({
    DomainName: 0,
    ResourceRecord: { Name: 0, Type: 0, Value: 0 },
    ValidationDomain: 0,
    ValidationEmails: 0,
    ValidationMethod: 0,
    ValidationStatus: 0,
  });
const i_AwsCodeBuildProjectArtifactsDetails: D.LazyStruct = () => ({
  ArtifactIdentifier: 0,
  EncryptionDisabled: 0,
  Location: 0,
  Name: 0,
  NamespaceType: 0,
  OverrideArtifactName: 0,
  Packaging: 0,
  Path: 0,
  Type: 0,
});
const i_AwsDynamoDbTableKeySchema: D.LazyStruct = () => ({
  AttributeName: 0,
  KeyType: 0,
});
const i_AwsDynamoDbTableProjection: D.LazyStruct = () => ({
  NonKeyAttributes: 0,
  ProjectionType: 0,
});
const i_AwsDynamoDbTableProvisionedThroughput: D.LazyStruct = () => ({
  LastDecreaseDateTime: 0,
  LastIncreaseDateTime: 0,
  NumberOfDecreasesToday: 0,
  ReadCapacityUnits: 0,
  WriteCapacityUnits: 0,
});
const i_AwsDynamoDbTableProvisionedThroughputOverride: D.LazyStruct = () => ({
  ReadCapacityUnits: 0,
});
const i_AwsEc2SecurityGroupIpPermission: D.LazyStruct = () => ({
  IpProtocol: 0,
  FromPort: 0,
  ToPort: 0,
  UserIdGroupPairs: D.list({
    GroupId: 0,
    GroupName: 0,
    PeeringStatus: 0,
    UserId: 0,
    VpcId: 0,
    VpcPeeringConnectionId: 0,
  }),
  IpRanges: D.list({ CidrIp: 0 }),
  Ipv6Ranges: D.list({ CidrIpv6: 0 }),
  PrefixListIds: D.list({ PrefixListId: 0 }),
});
const i_AwsEc2VpcPeeringConnectionVpcInfoDetails: D.LazyStruct = () => ({
  CidrBlock: 0,
  CidrBlockSet: D.list({ CidrBlock: 0 }),
  Ipv6CidrBlockSet: D.list({ Ipv6CidrBlock: 0 }),
  OwnerId: 0,
  PeeringOptions: {
    AllowDnsResolutionFromRemoteVpc: 0,
    AllowEgressFromLocalClassicLinkToRemoteVpc: 0,
    AllowEgressFromLocalVpcToRemoteClassicLink: 0,
  },
  Region: 0,
  VpcId: 0,
});
const i_AwsEcsContainerDetails: D.LazyStruct = () => ({
  Name: 0,
  Image: 0,
  MountPoints: D.list({ SourceVolume: 0, ContainerPath: 0 }),
  Privileged: 0,
});
const i_AwsElasticsearchDomainLogPublishingOptionsLogConfig: D.LazyStruct =
  () => ({ CloudWatchLogsLogGroupArn: 0, Enabled: 0 });
const i_AwsIamAttachedManagedPolicy: D.LazyStruct = () => ({
  PolicyName: 0,
  PolicyArn: 0,
});
const i_AwsIamPermissionsBoundary: D.LazyStruct = () => ({
  PermissionsBoundaryArn: 0,
  PermissionsBoundaryType: 0,
});
const i_AwsOpenSearchServiceDomainLogPublishingOption: D.LazyStruct = () => ({
  CloudWatchLogsLogGroupArn: 0,
  Enabled: 0,
});
const i_AwsRdsDbDomainMembership: D.LazyStruct = () => ({
  Domain: 0,
  Status: 0,
  Fqdn: 0,
  IamRoleName: 0,
});
const i_AwsRdsDbInstanceEndpoint: D.LazyStruct = () => ({
  Address: 0,
  Port: 0,
  HostedZoneId: 0,
});
const i_AwsRdsDbInstanceVpcSecurityGroup: D.LazyStruct = () => ({
  VpcSecurityGroupId: 0,
  Status: 0,
});
const i_AwsRdsDbProcessorFeature: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_AwsS3AccountPublicAccessBlockDetails: D.LazyStruct = () => ({
  BlockPublicAcls: 0,
  BlockPublicPolicy: 0,
  IgnorePublicAcls: 0,
  RestrictPublicBuckets: 0,
});
const i_AwsSecurityFindingFilters: D.LazyStruct = () => ({
  ProductArn: D.list(i_StringFilter),
  AwsAccountId: D.list(i_StringFilter),
  Id: D.list(i_StringFilter),
  GeneratorId: D.list(i_StringFilter),
  Region: D.list(i_StringFilter),
  Type: D.list(i_StringFilter),
  FirstObservedAt: D.list(i_DateFilter),
  LastObservedAt: D.list(i_DateFilter),
  CreatedAt: D.list(i_DateFilter),
  UpdatedAt: D.list(i_DateFilter),
  SeverityProduct: D.list(i_NumberFilter),
  SeverityNormalized: D.list(i_NumberFilter),
  SeverityLabel: D.list(i_StringFilter),
  Confidence: D.list(i_NumberFilter),
  Criticality: D.list(i_NumberFilter),
  Title: D.list(i_StringFilter),
  Description: D.list(i_StringFilter),
  RecommendationText: D.list(i_StringFilter),
  SourceUrl: D.list(i_StringFilter),
  ProductFields: D.list(i_MapFilter),
  ProductName: D.list(i_StringFilter),
  CompanyName: D.list(i_StringFilter),
  UserDefinedFields: D.list(i_MapFilter),
  MalwareName: D.list(i_StringFilter),
  MalwareType: D.list(i_StringFilter),
  MalwarePath: D.list(i_StringFilter),
  MalwareState: D.list(i_StringFilter),
  NetworkDirection: D.list(i_StringFilter),
  NetworkProtocol: D.list(i_StringFilter),
  NetworkSourceIpV4: D.list(i_IpFilter),
  NetworkSourceIpV6: D.list(i_IpFilter),
  NetworkSourcePort: D.list(i_NumberFilter),
  NetworkSourceDomain: D.list(i_StringFilter),
  NetworkSourceMac: D.list(i_StringFilter),
  NetworkDestinationIpV4: D.list(i_IpFilter),
  NetworkDestinationIpV6: D.list(i_IpFilter),
  NetworkDestinationPort: D.list(i_NumberFilter),
  NetworkDestinationDomain: D.list(i_StringFilter),
  ProcessName: D.list(i_StringFilter),
  ProcessPath: D.list(i_StringFilter),
  ProcessPid: D.list(i_NumberFilter),
  ProcessParentPid: D.list(i_NumberFilter),
  ProcessLaunchedAt: D.list(i_DateFilter),
  ProcessTerminatedAt: D.list(i_DateFilter),
  ThreatIntelIndicatorType: D.list(i_StringFilter),
  ThreatIntelIndicatorValue: D.list(i_StringFilter),
  ThreatIntelIndicatorCategory: D.list(i_StringFilter),
  ThreatIntelIndicatorLastObservedAt: D.list(i_DateFilter),
  ThreatIntelIndicatorSource: D.list(i_StringFilter),
  ThreatIntelIndicatorSourceUrl: D.list(i_StringFilter),
  ResourceType: D.list(i_StringFilter),
  ResourceId: D.list(i_StringFilter),
  ResourcePartition: D.list(i_StringFilter),
  ResourceRegion: D.list(i_StringFilter),
  ResourceTags: D.list(i_MapFilter),
  ResourceAwsEc2InstanceType: D.list(i_StringFilter),
  ResourceAwsEc2InstanceImageId: D.list(i_StringFilter),
  ResourceAwsEc2InstanceIpV4Addresses: D.list(i_IpFilter),
  ResourceAwsEc2InstanceIpV6Addresses: D.list(i_IpFilter),
  ResourceAwsEc2InstanceKeyName: D.list(i_StringFilter),
  ResourceAwsEc2InstanceIamInstanceProfileArn: D.list(i_StringFilter),
  ResourceAwsEc2InstanceVpcId: D.list(i_StringFilter),
  ResourceAwsEc2InstanceSubnetId: D.list(i_StringFilter),
  ResourceAwsEc2InstanceLaunchedAt: D.list(i_DateFilter),
  ResourceAwsS3BucketOwnerId: D.list(i_StringFilter),
  ResourceAwsS3BucketOwnerName: D.list(i_StringFilter),
  ResourceAwsIamAccessKeyUserName: D.list(i_StringFilter),
  ResourceAwsIamAccessKeyPrincipalName: D.list(i_StringFilter),
  ResourceAwsIamAccessKeyStatus: D.list(i_StringFilter),
  ResourceAwsIamAccessKeyCreatedAt: D.list(i_DateFilter),
  ResourceAwsIamUserUserName: D.list(i_StringFilter),
  ResourceContainerName: D.list(i_StringFilter),
  ResourceContainerImageId: D.list(i_StringFilter),
  ResourceContainerImageName: D.list(i_StringFilter),
  ResourceContainerLaunchedAt: D.list(i_DateFilter),
  ResourceDetailsOther: D.list(i_MapFilter),
  ComplianceStatus: D.list(i_StringFilter),
  VerificationState: D.list(i_StringFilter),
  WorkflowState: D.list(i_StringFilter),
  WorkflowStatus: D.list(i_StringFilter),
  RecordState: D.list(i_StringFilter),
  RelatedFindingsProductArn: D.list(i_StringFilter),
  RelatedFindingsId: D.list(i_StringFilter),
  NoteText: D.list(i_StringFilter),
  NoteUpdatedAt: D.list(i_DateFilter),
  NoteUpdatedBy: D.list(i_StringFilter),
  Keyword: D.list({ Value: 0 }),
  FindingProviderFieldsConfidence: D.list(i_NumberFilter),
  FindingProviderFieldsCriticality: D.list(i_NumberFilter),
  FindingProviderFieldsRelatedFindingsId: D.list(i_StringFilter),
  FindingProviderFieldsRelatedFindingsProductArn: D.list(i_StringFilter),
  FindingProviderFieldsSeverityLabel: D.list(i_StringFilter),
  FindingProviderFieldsSeverityOriginal: D.list(i_StringFilter),
  FindingProviderFieldsTypes: D.list(i_StringFilter),
  Sample: D.list(i_BooleanFilter),
  ComplianceSecurityControlId: D.list(i_StringFilter),
  ComplianceAssociatedStandardsId: D.list(i_StringFilter),
  VulnerabilitiesExploitAvailable: D.list(i_StringFilter),
  VulnerabilitiesFixAvailable: D.list(i_StringFilter),
  ComplianceSecurityControlParametersName: D.list(i_StringFilter),
  ComplianceSecurityControlParametersValue: D.list(i_StringFilter),
  AwsAccountName: D.list(i_StringFilter),
  ResourceApplicationName: D.list(i_StringFilter),
  ResourceApplicationArn: D.list(i_StringFilter),
  ResourceOwnerAccountId: D.list(i_StringFilter),
  ResourceOwnerOrgId: D.list(i_StringFilter),
  ResourceProvider: D.list(i_StringFilter),
});
const i_AwsSecurityFindingIdentifier: D.LazyStruct = () => ({
  Id: 0,
  ProductArn: 0,
});
const i_AwsWafv2ActionAllowDetails: D.LazyStruct = () => ({
  CustomRequestHandling: i_AwsWafv2CustomRequestHandlingDetails,
});
const i_AwsWafv2ActionBlockDetails: D.LazyStruct = () => ({
  CustomResponse: {
    CustomResponseBodyKey: 0,
    ResponseCode: 0,
    ResponseHeaders: D.list(i_AwsWafv2CustomHttpHeader),
  },
});
const i_AwsWafv2RulesDetails: D.LazyStruct = () => ({
  Action: {
    Allow: i_AwsWafv2ActionAllowDetails,
    Block: i_AwsWafv2ActionBlockDetails,
    Captcha: { CustomRequestHandling: i_AwsWafv2CustomRequestHandlingDetails },
    Count: { CustomRequestHandling: i_AwsWafv2CustomRequestHandlingDetails },
  },
  Name: 0,
  OverrideAction: 0,
  Priority: 0,
  VisibilityConfig: i_AwsWafv2VisibilityConfigDetails,
});
const i_AwsWafv2VisibilityConfigDetails: D.LazyStruct = () => ({
  CloudWatchMetricsEnabled: 0,
  MetricName: 0,
  SampledRequestsEnabled: 0,
});
const i_AzureProviderConfiguration: D.LazyStruct = () => ({
  AWSConfigConnectorArn: 0,
  ScopeConfiguration: i_AzureScopeConfiguration,
  AzureRegions: 0,
});
const i_AzureUpdateConfiguration: D.LazyStruct = () => ({
  ScopeConfiguration: i_AzureScopeConfiguration,
  AzureRegions: 0,
});
const i_Criteria: D.LazyStruct = () => ({
  OcsfFindingCriteria: i_OcsfFindingFilters,
});
const i_FindingScopes: D.LazyStruct = () => ({
  AwsOrganizations: D.list(i_AwsOrganizationScope),
});
const i_FindingsTrendsCompositeFilter: D.LazyStruct = () => ({
  StringFilters: D.list({ FieldName: 0, Filter: i_StringFilter }),
  NestedCompositeFilters: D.list(i_FindingsTrendsCompositeFilter),
  Operator: 0,
});
const i_Indicator: D.LazyStruct = () => ({
  Key: 0,
  Values: 0,
  Title: 0,
  Type: 0,
});
const i_Ipv6CidrBlockAssociation: D.LazyStruct = () => ({
  AssociationId: 0,
  Ipv6CidrBlock: 0,
  CidrBlockState: 0,
});
const i_NetworkHeader: D.LazyStruct = () => ({
  Protocol: 0,
  Destination: i_NetworkPathComponentDetails,
  Source: i_NetworkPathComponentDetails,
});
const i_NoteUpdate: D.LazyStruct = () => ({ Text: 0, UpdatedBy: 0 });
const i_Occurrences: D.LazyStruct = () => ({
  LineRanges: D.list(i_Range),
  OffsetRanges: D.list(i_Range),
  Pages: D.list({ PageNumber: 0, LineRange: i_Range, OffsetRange: i_Range }),
  Records: D.list({ JsonPath: 0, RecordIndex: 0 }),
  Cells: D.list({ Column: 0, Row: 0, ColumnName: 0, CellReference: 0 }),
});
const i_OcsfFindingFilters: D.LazyStruct = () => ({
  CompositeFilters: D.list(i_CompositeFilter),
  CompositeOperator: 0,
});
const i_ParameterConfiguration: D.LazyStruct = () => ({
  ValueType: 0,
  Value: {
    Integer: 0,
    IntegerList: 0,
    Double: 0,
    String: 0,
    StringList: 0,
    Boolean: 0,
    Enum: 0,
    EnumList: 0,
  },
});
const i_Policy: D.LazyStruct = () => ({
  SecurityHub: {
    ServiceEnabled: 0,
    EnabledStandardIdentifiers: 0,
    SecurityControlsConfiguration: {
      EnabledSecurityControlIdentifiers: 0,
      DisabledSecurityControlIdentifiers: 0,
      SecurityControlCustomParameters: D.list({
        SecurityControlId: 0,
        Parameters: D.map(i_ParameterConfiguration),
      }),
    },
  },
});
const i_PortRange: D.LazyStruct = () => ({ Begin: 0, End: 0 });
const i_RelatedFinding: D.LazyStruct = () => ({ ProductArn: 0, Id: 0 });
const i_ResourceScopes: D.LazyStruct = () => ({
  AwsOrganizations: D.list(i_AwsOrganizationScope),
});
const i_ResourcesFilters: D.LazyStruct = () => ({
  CompositeFilters: D.list(i_ResourcesCompositeFilter),
  CompositeOperator: 0,
});
const i_ResourcesTrendsCompositeFilter: D.LazyStruct = () => ({
  StringFilters: D.list({ FieldName: 0, Filter: i_StringFilter }),
  NestedCompositeFilters: D.list(i_ResourcesTrendsCompositeFilter),
  Operator: 0,
});
const i_SeverityUpdate: D.LazyStruct = () => ({
  Normalized: 0,
  Product: 0,
  Label: 0,
});
const i_SortCriterion: D.LazyStruct = () => ({ Field: 0, SortOrder: 0 });
const i_StatelessCustomActionDefinition: D.LazyStruct = () => ({
  PublishMetricAction: { Dimensions: D.list({ Value: 0 }) },
});
const i_Target: D.LazyStruct = () => ({
  AccountId: 0,
  OrganizationalUnitId: 0,
  RootId: 0,
});
const i_WorkflowUpdate: D.LazyStruct = () => ({ Status: 0 });
const o_ConfigurationPolicyAssociationSummary: D.LazyStruct = () => ({
  UpdatedAt: D.ts,
});
const o_Invitation: D.LazyStruct = () => ({ InvitedAt: D.ts });
const o_Member: D.LazyStruct = () => ({ InvitedAt: D.ts, UpdatedAt: D.ts });
const i_AwsOrganizationScope: D.LazyStruct = () => ({
  OrganizationId: 0,
  OrganizationalUnitId: 0,
});
const i_AwsWafv2CustomHttpHeader: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_AwsWafv2CustomRequestHandlingDetails: D.LazyStruct = () => ({
  InsertHeaders: D.list(i_AwsWafv2CustomHttpHeader),
});
const i_AzureScopeConfiguration: D.LazyStruct = () => ({
  ScopeType: 0,
  ScopeValues: 0,
});
const i_BooleanFilter: D.LazyStruct = () => ({ Value: 0 });
const i_CompositeFilter: D.LazyStruct = () => ({
  StringFilters: D.list({ FieldName: 0, Filter: i_StringFilter }),
  DateFilters: D.list({ FieldName: 0, Filter: i_DateFilter }),
  BooleanFilters: D.list({ FieldName: 0, Filter: i_BooleanFilter }),
  NumberFilters: D.list({ FieldName: 0, Filter: i_NumberFilter }),
  MapFilters: D.list({ FieldName: 0, Filter: i_MapFilter }),
  IpFilters: D.list({ FieldName: 0, Filter: i_IpFilter }),
  NestedCompositeFilters: D.list(i_CompositeFilter),
  Operator: 0,
});
const i_DateFilter: D.LazyStruct = () => ({
  Start: 0,
  End: 0,
  DateRange: { Value: 0, Unit: 0, Comparison: 0 },
});
const i_IpFilter: D.LazyStruct = () => ({ Cidr: 0 });
const i_MapFilter: D.LazyStruct = () => ({ Key: 0, Value: 0, Comparison: 0 });
const i_NetworkPathComponentDetails: D.LazyStruct = () => ({
  Address: 0,
  PortRanges: D.list(i_PortRange),
});
const i_NumberFilter: D.LazyStruct = () => ({
  Gte: 0,
  Lte: 0,
  Eq: 0,
  Gt: 0,
  Lt: 0,
});
const i_Range: D.LazyStruct = () => ({ Start: 0, End: 0, StartColumn: 0 });
const i_ResourcesCompositeFilter: D.LazyStruct = () => ({
  StringFilters: D.list({ FieldName: 0, Filter: i_StringFilter }),
  DateFilters: D.list({ FieldName: 0, Filter: i_DateFilter }),
  NumberFilters: D.list({ FieldName: 0, Filter: i_NumberFilter }),
  MapFilters: D.list({ FieldName: 0, Filter: i_MapFilter }),
  NestedCompositeFilters: D.list(i_ResourcesCompositeFilter),
  Operator: 0,
});
const i_StringFilter: D.LazyStruct = () => ({ Value: 0, Comparison: 0 });
