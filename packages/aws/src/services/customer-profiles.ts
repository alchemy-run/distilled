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
  sdkId: "Customer Profiles",
  target: "CustomerProfiles_20200815",
  version: "2020-08-15",
  sigv4: "profile",
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
                `https://profile-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://profile-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://profile.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://profile.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export type Uuid = string;
export type Name = string;
export type String1To255 = string;
export type RequestValueList = string[];
export interface AddProfileKeyRequest {
  ProfileId: string;
  KeyName: string;
  Values: string[];
  DomainName: string;
}
export interface AddProfileKeyResponse {
  KeyName?: string;
  Values?: string[];
}
export type TypeName = string;
export type BatchGetCalculatedAttributeForProfileIdList = string[];
export type Start = number;
export type End = number;
export type RangeUnit = "DAYS" | (string & {});
export interface RangeOverride {
  Start: number;
  End?: number;
  Unit: RangeUnit;
}
export interface ConditionOverrides {
  Range?: RangeOverride;
}
export interface BatchGetCalculatedAttributeForProfileRequest {
  CalculatedAttributeName: string;
  DomainName: string;
  ProfileIds: string[];
  ConditionOverrides?: ConditionOverrides;
}
export type String1To1000 = string;
export interface BatchGetCalculatedAttributeForProfileError_ {
  Code: string;
  Message: string;
  ProfileId: string;
}
export type BatchGetCalculatedAttributeForProfileErrorList =
  BatchGetCalculatedAttributeForProfileError_[];
export type DisplayName = string;
export interface CalculatedAttributeValue {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  IsDataPartial?: string;
  ProfileId?: string;
  Value?: string;
  LastObjectTimestamp?: Date;
}
export type CalculatedAttributeValueList = CalculatedAttributeValue[];
export interface BatchGetCalculatedAttributeForProfileResponse {
  Errors?: BatchGetCalculatedAttributeForProfileError_[];
  CalculatedAttributeValues?: CalculatedAttributeValue[];
  ConditionOverrides?: ConditionOverrides;
}
export type BatchGetProfileIdList = string[];
export interface BatchGetProfileRequest {
  DomainName: string;
  ProfileIds: string[];
}
export interface BatchGetProfileError_ {
  Code: string;
  Message: string;
  ProfileId: string;
}
export type BatchGetProfileErrorList = BatchGetProfileError_[];
export type SensitiveString1To255 = string | redacted.Redacted<string>;
export type SensitiveString1To1000 = string | redacted.Redacted<string>;
export type PartyType = "INDIVIDUAL" | "BUSINESS" | "OTHER" | (string & {});
export type Gender = "MALE" | "FEMALE" | "UNSPECIFIED" | (string & {});
export interface Address {
  Address1?: string;
  Address2?: string;
  Address3?: string;
  Address4?: string;
  City?: string;
  County?: string;
  State?: string;
  Province?: string;
  Country?: string;
  PostalCode?: string;
}
export type Attributes = { [key: string]: string | undefined };
export interface FoundByKeyValue {
  KeyName?: string;
  Values?: string[];
}
export type FoundByList = FoundByKeyValue[];
export type ProfileType = "ACCOUNT_PROFILE" | "PROFILE" | (string & {});
export type ContactType =
  | "PhoneNumber"
  | "MobilePhoneNumber"
  | "HomePhoneNumber"
  | "BusinessPhoneNumber"
  | "EmailAddress"
  | "PersonalEmailAddress"
  | "BusinessEmailAddress"
  | (string & {});
export interface ContactPreference {
  KeyName?: string;
  KeyValue?: string;
  ProfileId?: string;
  ContactType?: ContactType;
}
export type PhonePreferenceList = ContactPreference[];
export type EmailPreferenceList = ContactPreference[];
export interface EngagementPreferences {
  Phone?: ContactPreference[];
  Email?: ContactPreference[];
}
export interface Profile {
  ProfileId?: string;
  AccountNumber?: string | redacted.Redacted<string>;
  AdditionalInformation?: string | redacted.Redacted<string>;
  PartyType?: PartyType;
  BusinessName?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  MiddleName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BirthDate?: string | redacted.Redacted<string>;
  Gender?: Gender;
  PhoneNumber?: string | redacted.Redacted<string>;
  MobilePhoneNumber?: string | redacted.Redacted<string>;
  HomePhoneNumber?: string | redacted.Redacted<string>;
  BusinessPhoneNumber?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  PersonalEmailAddress?: string | redacted.Redacted<string>;
  BusinessEmailAddress?: string | redacted.Redacted<string>;
  Address?: Address;
  ShippingAddress?: Address;
  MailingAddress?: Address;
  BillingAddress?: Address;
  Attributes?: { [key: string]: string | undefined };
  FoundByItems?: FoundByKeyValue[];
  PartyTypeString?: string | redacted.Redacted<string>;
  GenderString?: string | redacted.Redacted<string>;
  ProfileType?: ProfileType;
  EngagementPreferences?: EngagementPreferences;
}
export type ProfileList = Profile[];
export interface BatchGetProfileResponse {
  Errors?: BatchGetProfileError_[];
  Profiles?: Profile[];
}
export type StringifiedJson = string | redacted.Redacted<string>;
export interface BatchPutProfileObjectRequestItem {
  Id: string;
  Object: string | redacted.Redacted<string>;
}
export type BatchPutProfileObjectRequestItemList =
  BatchPutProfileObjectRequestItem[];
export interface BatchPutProfileObjectRequest {
  DomainName: string;
  ObjectTypeName: string;
  Items: BatchPutProfileObjectRequestItem[];
}
export interface BatchPutProfileObjectResponseItem {
  Id: string;
  ProfileObjectUniqueKey: string;
}
export type BatchPutProfileObjectResponseList =
  BatchPutProfileObjectResponseItem[];
export type ResponseCode = number;
export type Text = string;
export interface BatchPutProfileObjectErrorItem {
  Id: string;
  Code: number;
  Message?: string;
}
export type BatchPutProfileObjectErrorList = BatchPutProfileObjectErrorItem[];
export interface BatchPutProfileObjectResponse {
  Successful?: BatchPutProfileObjectResponseItem[];
  Failed?: BatchPutProfileObjectErrorItem[];
}
export type SensitiveText = string | redacted.Redacted<string>;
export type AttributeName = string;
export interface AttributeItem {
  Name: string;
}
export type AttributeList = AttributeItem[];
export interface AttributeDetails {
  Attributes: AttributeItem[];
  Expression: string;
}
export type Value = number;
export type Unit = "DAYS" | (string & {});
export type ValueRangeStart = number;
export type ValueRangeEnd = number;
export interface ValueRange {
  Start: number;
  End: number;
}
export interface Range {
  Value?: number;
  Unit?: Unit;
  ValueRange?: ValueRange;
  TimestampSource?: string;
  TimestampFormat?: string;
}
export type ObjectCount = number;
export type Operator =
  | "EQUAL_TO"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "NOT_EQUAL_TO"
  | (string & {});
export interface Threshold {
  Value: string;
  Operator: Operator;
}
export interface Conditions {
  Range?: Range;
  ObjectCount?: number;
  Threshold?: Threshold;
}
export type Include = "ALL" | "ANY" | "NONE" | (string & {});
export type Type = "ALL" | "ANY" | "NONE" | (string & {});
export type FilterDimensionType =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | "CONTAINS"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | "BEFORE"
  | "AFTER"
  | "BETWEEN"
  | "NOT_BETWEEN"
  | "ON"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "EQUAL"
  | (string & {});
export type ValueList = string[];
export interface FilterAttributeDimension {
  DimensionType: FilterDimensionType;
  Values: string[];
}
export type AttributeMap = {
  [key: string]: FilterAttributeDimension | undefined;
};
export interface FilterDimension {
  Attributes: { [key: string]: FilterAttributeDimension | undefined };
}
export type FilterDimensionList = FilterDimension[];
export interface FilterGroup {
  Type: Type;
  Dimensions: FilterDimension[];
}
export type GroupList = FilterGroup[];
export interface Filter {
  Include: Include;
  Groups: FilterGroup[];
}
export type Statistic =
  | "FIRST_OCCURRENCE"
  | "LAST_OCCURRENCE"
  | "COUNT"
  | "SUM"
  | "MINIMUM"
  | "MAXIMUM"
  | "AVERAGE"
  | "MAX_OCCURRENCE"
  | (string & {});
export type OptionalBoolean = boolean;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateCalculatedAttributeDefinitionRequest {
  DomainName: string;
  CalculatedAttributeName: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  AttributeDetails: AttributeDetails;
  Conditions?: Conditions;
  Filter?: Filter;
  Statistic: Statistic;
  UseHistoricalData?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export type ReadinessStatus =
  | "PREPARING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type PercentageInteger = number;
export interface Readiness {
  ProgressPercentage?: number;
  Message?: string;
}
export interface CreateCalculatedAttributeDefinitionResponse {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  AttributeDetails?: AttributeDetails;
  Conditions?: Conditions;
  Filter?: Filter;
  Statistic?: Statistic;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  UseHistoricalData?: boolean;
  Status?: ReadinessStatus;
  Readiness?: Readiness;
  Tags?: { [key: string]: string | undefined };
}
export type ExpirationDaysInteger = number;
export type EncryptionKey = string;
export type SqsQueueUrl = string;
export type JobScheduleDayOfTheWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export type JobScheduleTime = string;
export interface JobSchedule {
  DayOfTheWeek: JobScheduleDayOfTheWeek;
  Time: string;
}
export type MatchingAttributes = string[];
export type MatchingAttributesList = string[][];
export interface Consolidation {
  MatchingAttributesList: string[][];
}
export type ConflictResolvingModel = "RECENCY" | "SOURCE" | (string & {});
export interface ConflictResolution {
  ConflictResolvingModel: ConflictResolvingModel;
  SourceName?: string;
}
export type Double0To1 = number;
export interface AutoMerging {
  Enabled: boolean;
  Consolidation?: Consolidation;
  ConflictResolution?: ConflictResolution;
  MinAllowedConfidenceScoreForMerging?: number;
}
export type S3BucketName = string;
export type S3KeyNameCustomerOutputConfig = string;
export interface S3ExportingConfig {
  S3BucketName: string;
  S3KeyName?: string;
}
export interface ExportingConfig {
  S3Exporting?: S3ExportingConfig;
}
export interface MatchingRequest {
  Enabled: boolean;
  JobSchedule?: JobSchedule;
  AutoMerging?: AutoMerging;
  ExportingConfig?: ExportingConfig;
}
export type MatchingRuleAttributeList = string[];
export interface MatchingRule {
  Rule: string[];
}
export type MatchingRules = MatchingRule[];
export type MaxAllowedRuleLevelForMerging = number;
export type MaxAllowedRuleLevelForMatching = number;
export type AttributeMatchingModel =
  | "ONE_TO_ONE"
  | "MANY_TO_MANY"
  | (string & {});
export type AddressList = string[];
export type PhoneNumberList = string[];
export type EmailList = string[];
export interface AttributeTypesSelector {
  AttributeMatchingModel: AttributeMatchingModel;
  Address?: string[];
  PhoneNumber?: string[];
  EmailAddress?: string[];
}
export interface RuleBasedMatchingRequest {
  Enabled: boolean;
  MatchingRules?: MatchingRule[];
  MaxAllowedRuleLevelForMerging?: number;
  MaxAllowedRuleLevelForMatching?: number;
  AttributeTypesSelector?: AttributeTypesSelector;
  ConflictResolution?: ConflictResolution;
  ExportingConfig?: ExportingConfig;
}
export interface DataStoreRequest {
  Enabled?: boolean;
}
export interface CreateDomainRequest {
  DomainName: string;
  DefaultExpirationDays: number;
  DefaultEncryptionKey?: string;
  DeadLetterQueueUrl?: string;
  Matching?: MatchingRequest;
  RuleBasedMatching?: RuleBasedMatchingRequest;
  DataStore?: DataStoreRequest;
  Tags?: { [key: string]: string | undefined };
}
export interface MatchingResponse {
  Enabled?: boolean;
  JobSchedule?: JobSchedule;
  AutoMerging?: AutoMerging;
  ExportingConfig?: ExportingConfig;
}
export type RuleBasedMatchingStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "ACTIVE"
  | (string & {});
export interface RuleBasedMatchingResponse {
  Enabled?: boolean;
  MatchingRules?: MatchingRule[];
  Status?: RuleBasedMatchingStatus;
  MaxAllowedRuleLevelForMerging?: number;
  MaxAllowedRuleLevelForMatching?: number;
  AttributeTypesSelector?: AttributeTypesSelector;
  ConflictResolution?: ConflictResolution;
  ExportingConfig?: ExportingConfig;
}
export interface DataStoreResponse {
  Enabled?: boolean;
  Readiness?: Readiness;
}
export interface CreateDomainResponse {
  DomainName: string;
  DefaultExpirationDays: number;
  DefaultEncryptionKey?: string;
  DeadLetterQueueUrl?: string;
  Matching?: MatchingResponse;
  RuleBasedMatching?: RuleBasedMatchingResponse;
  DataStore?: DataStoreResponse;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export type LayoutType = "PROFILE_EXPLORER" | (string & {});
export type SensitiveString1To2000000 = string | redacted.Redacted<string>;
export interface CreateDomainLayoutRequest {
  DomainName: string;
  LayoutDefinitionName: string;
  Description: string | redacted.Redacted<string>;
  DisplayName: string;
  IsDefault?: boolean;
  LayoutType: LayoutType;
  Layout: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDomainLayoutResponse {
  LayoutDefinitionName: string;
  Description: string | redacted.Redacted<string>;
  DisplayName: string;
  IsDefault?: boolean;
  LayoutType: LayoutType;
  Layout: string | redacted.Redacted<string>;
  Version: string;
  Tags?: { [key: string]: string | undefined };
  CreatedAt: Date;
  LastUpdatedAt?: Date;
}
export interface CreateEventStreamRequest {
  DomainName: string;
  Uri: string;
  EventStreamName: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateEventStreamResponse {
  EventStreamArn: string;
  Tags?: { [key: string]: string | undefined };
}
export type FieldName = string;
export type ComparisonOperator =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | "CONTAINS"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "EQUAL"
  | "BEFORE"
  | "AFTER"
  | "ON"
  | "BETWEEN"
  | "NOT_BETWEEN"
  | (string & {});
export type EventTriggerValues = string[];
export interface ObjectAttribute {
  Source?: string;
  FieldName?: string;
  ComparisonOperator: ComparisonOperator;
  Values: string[];
}
export type ObjectAttributes = ObjectAttribute[];
export interface EventTriggerDimension {
  ObjectAttributes: ObjectAttribute[];
}
export type EventTriggerDimensions = EventTriggerDimension[];
export type EventTriggerLogicalOperator =
  | "ANY"
  | "ALL"
  | "NONE"
  | (string & {});
export interface EventTriggerCondition {
  EventTriggerDimensions: EventTriggerDimension[];
  LogicalOperator: EventTriggerLogicalOperator;
}
export type EventTriggerConditions = EventTriggerCondition[];
export type OptionalLong = number;
export type PeriodUnit =
  | "MINUTES"
  | "HOURS"
  | "DAYS"
  | "WEEKS"
  | "MONTHS"
  | (string & {});
export type MaxSize60 = number;
export type MaxSize1000 = number;
export interface Period {
  Unit: PeriodUnit;
  Value: number;
  MaxInvocationsPerProfile?: number;
  Unlimited?: boolean;
}
export type Periods = Period[];
export interface EventTriggerLimits {
  EventExpiration?: number;
  Periods?: Period[];
}
export interface CreateEventTriggerRequest {
  DomainName: string;
  EventTriggerName: string;
  ObjectTypeName: string;
  Description?: string | redacted.Redacted<string>;
  EventTriggerConditions: EventTriggerCondition[];
  SegmentFilter?: string;
  EventTriggerLimits?: EventTriggerLimits;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateEventTriggerResponse {
  EventTriggerName?: string;
  ObjectTypeName?: string;
  Description?: string | redacted.Redacted<string>;
  EventTriggerConditions?: EventTriggerCondition[];
  SegmentFilter?: string;
  EventTriggerLimits?: EventTriggerLimits;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type WorkflowType = "APPFLOW_INTEGRATION" | (string & {});
export type FlowDescription = string;
export type FlowName = string;
export type KmsArn = string;
export type ConnectorProfileName = string;
export type SourceConnectorType =
  | "Salesforce"
  | "Marketo"
  | "Zendesk"
  | "Servicenow"
  | "S3"
  | (string & {});
export type DatetimeTypeFieldName = string;
export interface IncrementalPullConfig {
  DatetimeTypeFieldName?: string;
}
export interface MarketoSourceProperties {
  Object: string;
}
export type BucketName = string;
export type BucketPrefix = string;
export interface S3SourceProperties {
  BucketName: string;
  BucketPrefix?: string;
}
export interface SalesforceSourceProperties {
  Object: string;
  EnableDynamicFieldUpdate?: boolean;
  IncludeDeletedRecords?: boolean;
}
export interface ServiceNowSourceProperties {
  Object: string;
}
export interface ZendeskSourceProperties {
  Object: string;
}
export interface SourceConnectorProperties {
  Marketo?: MarketoSourceProperties;
  S3?: S3SourceProperties;
  Salesforce?: SalesforceSourceProperties;
  ServiceNow?: ServiceNowSourceProperties;
  Zendesk?: ZendeskSourceProperties;
}
export interface SourceFlowConfig {
  ConnectorProfileName?: string;
  ConnectorType: SourceConnectorType;
  IncrementalPullConfig?: IncrementalPullConfig;
  SourceConnectorProperties: SourceConnectorProperties;
}
export type MarketoConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type S3ConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type SalesforceConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "CONTAINS"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type ServiceNowConnectorOperator =
  | "PROJECTION"
  | "CONTAINS"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type ZendeskConnectorOperator =
  | "PROJECTION"
  | "GREATER_THAN"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export interface ConnectorOperator {
  Marketo?: MarketoConnectorOperator;
  S3?: S3ConnectorOperator;
  Salesforce?: SalesforceConnectorOperator;
  ServiceNow?: ServiceNowConnectorOperator;
  Zendesk?: ZendeskConnectorOperator;
}
export type DestinationField = string;
export type StringTo2048 = string;
export type SourceFields = string[];
export type OperatorPropertiesKeys =
  | "VALUE"
  | "VALUES"
  | "DATA_TYPE"
  | "UPPER_BOUND"
  | "LOWER_BOUND"
  | "SOURCE_DATA_TYPE"
  | "DESTINATION_DATA_TYPE"
  | "VALIDATION_ACTION"
  | "MASK_VALUE"
  | "MASK_LENGTH"
  | "TRUNCATE_LENGTH"
  | "MATH_OPERATION_FIELDS_ORDER"
  | "CONCAT_FORMAT"
  | "SUBFIELD_CATEGORY_MAP"
  | (string & {});
export type Property = string;
export type TaskPropertiesMap = { [key in OperatorPropertiesKeys]?: string };
export type TaskType =
  | "Arithmetic"
  | "Filter"
  | "Map"
  | "Mask"
  | "Merge"
  | "Truncate"
  | "Validate"
  | (string & {});
export interface Task {
  ConnectorOperator?: ConnectorOperator;
  DestinationField?: string;
  SourceFields: string[];
  TaskProperties?: { [key: string]: string | undefined };
  TaskType: TaskType;
}
export type Tasks = Task[];
export type TriggerType = "Scheduled" | "Event" | "OnDemand" | (string & {});
export type ScheduleExpression = string;
export type DataPullMode = "Incremental" | "Complete" | (string & {});
export type Timezone = string;
export type ScheduleOffset = number;
export interface ScheduledTriggerProperties {
  ScheduleExpression: string;
  DataPullMode?: DataPullMode;
  ScheduleStartTime?: Date;
  ScheduleEndTime?: Date;
  Timezone?: string;
  ScheduleOffset?: number;
  FirstExecutionFrom?: Date;
}
export interface TriggerProperties {
  Scheduled?: ScheduledTriggerProperties;
}
export interface TriggerConfig {
  TriggerType: TriggerType;
  TriggerProperties?: TriggerProperties;
}
export interface FlowDefinition {
  Description?: string;
  FlowName: string;
  KmsArn: string;
  SourceFlowConfig: SourceFlowConfig;
  Tasks: Task[];
  TriggerConfig: TriggerConfig;
}
export interface Batch {
  StartTime: Date;
  EndTime: Date;
}
export type Batches = Batch[];
export interface AppflowIntegration {
  FlowDefinition: FlowDefinition;
  Batches?: Batch[];
}
export interface IntegrationConfig {
  AppflowIntegration?: AppflowIntegration;
}
export type RoleArn = string;
export interface CreateIntegrationWorkflowRequest {
  DomainName: string;
  WorkflowType: WorkflowType;
  IntegrationConfig: IntegrationConfig;
  ObjectTypeName: string;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateIntegrationWorkflowResponse {
  WorkflowId: string;
  Message: string;
}
export interface CreateProfileRequest {
  DomainName: string;
  AccountNumber?: string | redacted.Redacted<string>;
  AdditionalInformation?: string | redacted.Redacted<string>;
  PartyType?: PartyType;
  BusinessName?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  MiddleName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BirthDate?: string | redacted.Redacted<string>;
  Gender?: Gender;
  PhoneNumber?: string | redacted.Redacted<string>;
  MobilePhoneNumber?: string | redacted.Redacted<string>;
  HomePhoneNumber?: string | redacted.Redacted<string>;
  BusinessPhoneNumber?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  PersonalEmailAddress?: string | redacted.Redacted<string>;
  BusinessEmailAddress?: string | redacted.Redacted<string>;
  Address?: Address;
  ShippingAddress?: Address;
  MailingAddress?: Address;
  BillingAddress?: Address;
  Attributes?: { [key: string]: string | undefined };
  PartyTypeString?: string | redacted.Redacted<string>;
  GenderString?: string | redacted.Redacted<string>;
  ProfileType?: ProfileType;
  EngagementPreferences?: EngagementPreferences;
}
export interface CreateProfileResponse {
  ProfileId: string;
}
export type RecommenderRecipeName =
  | "recommended-for-you"
  | "similar-items"
  | "frequently-paired-items"
  | "popular-items"
  | "trending-now"
  | "personalized-ranking"
  | (string & {});
export type EventParametersEventTypeString = string;
export type EventParametersEventWeightDouble = number;
export interface EventParameters {
  EventType: string;
  EventValueThreshold?: number;
  EventWeight?: number;
}
export type EventParametersList = EventParameters[];
export interface EventsConfig {
  EventParametersList: EventParameters[];
}
export type RecommenderConfigTrainingFrequencyInteger = number;
export type InferenceConfigMinProvisionedTPSInteger = number;
export interface InferenceConfig {
  MinProvisionedTPS?: number;
}
export type ColumnNamesList = string[];
export type IncludedColumns = { [key: string]: string[] | undefined };
export type DiversityCapType = "PERCENTAGE" | "VALUE" | (string & {});
export type DiversityTargetExpression = string;
export interface DiversityColumn {
  Name: string;
  CapType: DiversityCapType;
  Target: string;
}
export type DiversityColumnsList = DiversityColumn[];
export interface DiversityConfig {
  DiversityColumns?: DiversityColumn[];
}
export interface RecommenderConfig {
  EventsConfig?: EventsConfig;
  TrainingFrequency?: number;
  InferenceConfig?: InferenceConfig;
  IncludedColumns?: { [key: string]: string[] | undefined };
  ExcludedColumns?: { [key: string]: string[] | undefined };
  DiversityConfig?: DiversityConfig;
}
export interface CreateRecommenderRequest {
  DomainName: string;
  RecommenderName: string;
  RecommenderRecipeName: RecommenderRecipeName;
  RecommenderConfig?: RecommenderConfig;
  Description?: string | redacted.Redacted<string>;
  RecommenderSchemaName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type Arn = string;
export interface CreateRecommenderResponse {
  RecommenderArn: string;
  Tags?: { [key: string]: string | undefined };
}
export type RecommenderFilterName = string;
export type RecommenderFilterExpression = string | redacted.Redacted<string>;
export interface CreateRecommenderFilterRequest {
  DomainName: string;
  RecommenderFilterName: string;
  RecommenderFilterExpression: string | redacted.Redacted<string>;
  RecommenderSchemaName?: string;
  Description?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRecommenderFilterResponse {
  RecommenderFilterArn: string;
  Tags?: { [key: string]: string | undefined };
}
export type ContentType = "STRING" | "NUMBER" | (string & {});
export type FeatureType = "TEXTUAL" | "CATEGORICAL" | (string & {});
export interface RecommenderSchemaField {
  TargetFieldName: string;
  ContentType?: ContentType;
  FeatureType?: FeatureType;
}
export type RecommenderSchemaFieldList = RecommenderSchemaField[];
export type RecommenderSchemaFields = {
  [key: string]: RecommenderSchemaField[] | undefined;
};
export interface CreateRecommenderSchemaRequest {
  DomainName: string;
  RecommenderSchemaName: string;
  Fields: { [key: string]: RecommenderSchemaField[] | undefined };
  Tags?: { [key: string]: string | undefined };
}
export type RecommenderSchemaStatus = "ACTIVE" | "DELETING" | (string & {});
export interface CreateRecommenderSchemaResponse {
  RecommenderSchemaArn: string;
  RecommenderSchemaName: string;
  Fields: { [key: string]: RecommenderSchemaField[] | undefined };
  CreatedAt: Date;
  Status: RecommenderSchemaStatus;
  Tags?: { [key: string]: string | undefined };
}
export type SensitiveString1To4000 = string | redacted.Redacted<string>;
export type StringDimensionType =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | "CONTAINS"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | (string & {});
export type Values = string[];
export interface ProfileDimension {
  DimensionType: StringDimensionType;
  Values: string[];
}
export type ExtraLengthValues = string[];
export interface ExtraLengthValueProfileDimension {
  DimensionType: StringDimensionType;
  Values: string[];
}
export type DateDimensionType =
  | "BEFORE"
  | "AFTER"
  | "BETWEEN"
  | "NOT_BETWEEN"
  | "ON"
  | (string & {});
export type DateValues = string[];
export interface DateDimension {
  DimensionType: DateDimensionType;
  Values: string[];
}
export interface AddressDimension {
  City?: ProfileDimension;
  Country?: ProfileDimension;
  County?: ProfileDimension;
  PostalCode?: ProfileDimension;
  Province?: ProfileDimension;
  State?: ProfileDimension;
}
export type AttributeDimensionType =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | "CONTAINS"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | "BEFORE"
  | "AFTER"
  | "BETWEEN"
  | "NOT_BETWEEN"
  | "ON"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "EQUAL"
  | (string & {});
export interface AttributeDimension {
  DimensionType: AttributeDimensionType;
  Values: string[];
}
export type CustomAttributes = {
  [key: string]: AttributeDimension | undefined;
};
export type ProfileTypeDimensionType =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | (string & {});
export type ProfileTypeValues = ProfileType[];
export interface ProfileTypeDimension {
  DimensionType: ProfileTypeDimensionType;
  Values: ProfileType[];
}
export interface ProfileAttributes {
  AccountNumber?: ProfileDimension;
  AdditionalInformation?: ExtraLengthValueProfileDimension;
  FirstName?: ProfileDimension;
  LastName?: ProfileDimension;
  MiddleName?: ProfileDimension;
  GenderString?: ProfileDimension;
  PartyTypeString?: ProfileDimension;
  BirthDate?: DateDimension;
  PhoneNumber?: ProfileDimension;
  BusinessName?: ProfileDimension;
  BusinessPhoneNumber?: ProfileDimension;
  HomePhoneNumber?: ProfileDimension;
  MobilePhoneNumber?: ProfileDimension;
  EmailAddress?: ProfileDimension;
  PersonalEmailAddress?: ProfileDimension;
  BusinessEmailAddress?: ProfileDimension;
  Address?: AddressDimension;
  ShippingAddress?: AddressDimension;
  MailingAddress?: AddressDimension;
  BillingAddress?: AddressDimension;
  Attributes?: { [key: string]: AttributeDimension | undefined };
  ProfileType?: ProfileTypeDimension;
}
export interface CalculatedAttributeDimension {
  DimensionType: AttributeDimensionType;
  Values: string[];
  ConditionOverrides?: ConditionOverrides;
}
export type CalculatedCustomAttributes = {
  [key: string]: CalculatedAttributeDimension | undefined;
};
export type Dimension =
  | { ProfileAttributes: ProfileAttributes; CalculatedAttributes?: never }
  | {
      ProfileAttributes?: never;
      CalculatedAttributes: {
        [key: string]: CalculatedAttributeDimension | undefined;
      };
    };
export type DimensionList = Dimension[];
export interface SourceSegment {
  SegmentDefinitionName?: string;
}
export type SourceSegmentList = SourceSegment[];
export type IncludeOptions = "ALL" | "ANY" | "NONE" | (string & {});
export interface Group {
  Dimensions?: Dimension[];
  SourceSegments?: SourceSegment[];
  SourceType?: IncludeOptions;
  Type?: IncludeOptions;
}
export type SegmentGroupList = Group[];
export interface SegmentGroup {
  Groups?: Group[];
  Include?: IncludeOptions;
}
export type SensitiveString1To50000 = string | redacted.Redacted<string>;
export type SegmentSortDataType = "STRING" | "NUMBER" | "DATE" | (string & {});
export type SegmentSortOrder = "ASC" | "DESC" | (string & {});
export type SortAttributeType = "PROFILE" | "CALCULATED" | (string & {});
export interface SortAttribute {
  Name: string;
  DataType?: SegmentSortDataType;
  Order: SegmentSortOrder;
  Type?: SortAttributeType;
}
export type SortAttributeList = SortAttribute[];
export interface SegmentSort {
  Attributes: SortAttribute[];
}
export interface CreateSegmentDefinitionRequest {
  DomainName: string;
  SegmentDefinitionName: string;
  DisplayName: string;
  Description?: string | redacted.Redacted<string>;
  SegmentGroups?: SegmentGroup;
  SegmentSqlQuery?: string | redacted.Redacted<string>;
  SegmentSort?: SegmentSort;
  Tags?: { [key: string]: string | undefined };
}
export type SegmentDefinitionArn = string;
export interface CreateSegmentDefinitionResponse {
  SegmentDefinitionName: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  SegmentDefinitionArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface SegmentGroupStructure {
  Groups?: Group[];
  Include?: IncludeOptions;
}
export interface CreateSegmentEstimateRequest {
  DomainName: string;
  SegmentQuery?: SegmentGroupStructure;
  SegmentSqlQuery?: string | redacted.Redacted<string>;
}
export type StatusCode = number;
export interface CreateSegmentEstimateResponse {
  DomainName?: string;
  EstimateId?: string;
  StatusCode?: number;
}
export type DataFormat = "CSV" | "JSONL" | "ORC" | (string & {});
export interface CreateSegmentSnapshotRequest {
  DomainName: string;
  SegmentDefinitionName: string;
  DataFormat: DataFormat;
  EncryptionKey?: string;
  RoleArn?: string;
  DestinationUri?: string;
}
export interface CreateSegmentSnapshotResponse {
  SnapshotId: string;
}
export type FieldContentType =
  | "STRING"
  | "NUMBER"
  | "PHONE_NUMBER"
  | "EMAIL_ADDRESS"
  | "NAME"
  | (string & {});
export interface ObjectTypeField {
  Source?: string;
  Target?: string;
  ContentType?: FieldContentType;
}
export type FieldMap = { [key: string]: ObjectTypeField | undefined };
export interface CreateUploadJobRequest {
  DomainName: string;
  DisplayName: string;
  Fields: { [key: string]: ObjectTypeField | undefined };
  UniqueKey: string;
  DataExpiry?: number;
}
export interface CreateUploadJobResponse {
  JobId: string;
}
export interface DeleteCalculatedAttributeDefinitionRequest {
  DomainName: string;
  CalculatedAttributeName: string;
}
export interface DeleteCalculatedAttributeDefinitionResponse {}
export interface DeleteDomainRequest {
  DomainName: string;
}
export type Message = string;
export interface DeleteDomainResponse {
  Message: string;
}
export interface DeleteDomainLayoutRequest {
  DomainName: string;
  LayoutDefinitionName: string;
}
export interface DeleteDomainLayoutResponse {
  Message: string;
}
export interface DeleteDomainObjectTypeRequest {
  DomainName: string;
  ObjectTypeName: string;
}
export interface DeleteDomainObjectTypeResponse {}
export interface DeleteEventStreamRequest {
  DomainName: string;
  EventStreamName: string;
}
export interface DeleteEventStreamResponse {}
export interface DeleteEventTriggerRequest {
  DomainName: string;
  EventTriggerName: string;
}
export interface DeleteEventTriggerResponse {
  Message: string;
}
export interface DeleteIntegrationRequest {
  DomainName: string;
  Uri: string;
}
export interface DeleteIntegrationResponse {
  Message: string;
}
export interface DeleteProfileRequest {
  ProfileId: string;
  DomainName: string;
}
export interface DeleteProfileResponse {
  Message?: string;
}
export interface DeleteProfileKeyRequest {
  ProfileId: string;
  KeyName: string;
  Values: string[];
  DomainName: string;
}
export interface DeleteProfileKeyResponse {
  Message?: string;
}
export interface DeleteProfileObjectRequest {
  ProfileId: string;
  ProfileObjectUniqueKey: string;
  ObjectTypeName: string;
  DomainName: string;
}
export interface DeleteProfileObjectResponse {
  Message?: string;
}
export interface DeleteProfileObjectTypeRequest {
  DomainName: string;
  ObjectTypeName: string;
}
export interface DeleteProfileObjectTypeResponse {
  Message: string;
}
export interface DeleteRecommenderRequest {
  DomainName: string;
  RecommenderName: string;
}
export interface DeleteRecommenderResponse {}
export interface DeleteRecommenderFilterRequest {
  DomainName: string;
  RecommenderFilterName: string;
}
export interface DeleteRecommenderFilterResponse {
  Message: string;
}
export interface DeleteRecommenderSchemaRequest {
  DomainName: string;
  RecommenderSchemaName: string;
}
export interface DeleteRecommenderSchemaResponse {}
export interface DeleteSegmentDefinitionRequest {
  DomainName: string;
  SegmentDefinitionName: string;
}
export interface DeleteSegmentDefinitionResponse {
  Message?: string;
}
export interface DeleteWorkflowRequest {
  DomainName: string;
  WorkflowId: string;
}
export interface DeleteWorkflowResponse {}
export type Objects = (string | redacted.Redacted<string>)[];
export interface DetectProfileObjectTypeRequest {
  Objects: (string | redacted.Redacted<string>)[];
  DomainName: string;
}
export type StandardIdentifier =
  | "PROFILE"
  | "ASSET"
  | "CASE"
  | "DEVICE"
  | "WEB_ANALYTICS"
  | "ORDER"
  | "COMMUNICATION_RECORD"
  | "AIR_PREFERENCE"
  | "HOTEL_PREFERENCE"
  | "AIR_BOOKING"
  | "AIR_SEGMENT"
  | "HOTEL_RESERVATION"
  | "HOTEL_STAY_REVENUE"
  | "LOYALTY"
  | "LOYALTY_TRANSACTION"
  | "LOYALTY_PROMOTION"
  | "UNIQUE"
  | "SECONDARY"
  | "LOOKUP_ONLY"
  | "NEW_ONLY"
  | (string & {});
export type StandardIdentifierList = StandardIdentifier[];
export type FieldNameList = string[];
export interface ObjectTypeKey {
  StandardIdentifiers?: StandardIdentifier[];
  FieldNames?: string[];
}
export type ObjectTypeKeyList = ObjectTypeKey[];
export type KeyMap = { [key: string]: ObjectTypeKey[] | undefined };
export interface DetectedProfileObjectType {
  SourceLastUpdatedTimestampFormat?: string;
  Fields?: { [key: string]: ObjectTypeField | undefined };
  Keys?: { [key: string]: ObjectTypeKey[] | undefined };
}
export type DetectedProfileObjectTypes = DetectedProfileObjectType[];
export interface DetectProfileObjectTypeResponse {
  DetectedProfileObjectTypes?: DetectedProfileObjectType[];
}
export interface GetAutoMergingPreviewRequest {
  DomainName: string;
  Consolidation: Consolidation;
  ConflictResolution: ConflictResolution;
  MinAllowedConfidenceScoreForMerging?: number;
}
export interface GetAutoMergingPreviewResponse {
  DomainName: string;
  NumberOfMatchesInSample?: number;
  NumberOfProfilesInSample?: number;
  NumberOfProfilesWillBeMerged?: number;
}
export interface GetCalculatedAttributeDefinitionRequest {
  DomainName: string;
  CalculatedAttributeName: string;
}
export interface GetCalculatedAttributeDefinitionResponse {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Statistic?: Statistic;
  Filter?: Filter;
  Conditions?: Conditions;
  AttributeDetails?: AttributeDetails;
  UseHistoricalData?: boolean;
  Status?: ReadinessStatus;
  Readiness?: Readiness;
  Tags?: { [key: string]: string | undefined };
}
export interface GetCalculatedAttributeForProfileRequest {
  DomainName: string;
  ProfileId: string;
  CalculatedAttributeName: string;
}
export interface GetCalculatedAttributeForProfileResponse {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  IsDataPartial?: string;
  Value?: string;
  LastObjectTimestamp?: Date;
}
export interface GetDomainRequest {
  DomainName: string;
}
export interface DomainStats {
  ProfileCount?: number;
  MeteringProfileCount?: number;
  ObjectCount?: number;
  TotalSize?: number;
}
export interface GetDomainResponse {
  DomainName: string;
  DefaultExpirationDays?: number;
  DefaultEncryptionKey?: string;
  DeadLetterQueueUrl?: string;
  Stats?: DomainStats;
  Matching?: MatchingResponse;
  RuleBasedMatching?: RuleBasedMatchingResponse;
  DataStore?: DataStoreResponse;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetDomainLayoutRequest {
  DomainName: string;
  LayoutDefinitionName: string;
}
export interface GetDomainLayoutResponse {
  LayoutDefinitionName: string;
  Description: string | redacted.Redacted<string>;
  DisplayName: string;
  IsDefault?: boolean;
  LayoutType: LayoutType;
  Layout: string | redacted.Redacted<string>;
  Version: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetDomainObjectTypeRequest {
  DomainName: string;
  ObjectTypeName: string;
}
export type SensitiveString1To10000 = string | redacted.Redacted<string>;
export type DomainObjectTypeFieldName = string;
export interface DomainObjectTypeField {
  Source: string;
  Target: string;
  ContentType?: ContentType;
  FeatureType?: FeatureType;
}
export type DomainObjectTypeFields = {
  [key: string]: DomainObjectTypeField | undefined;
};
export interface GetDomainObjectTypeResponse {
  ObjectTypeName: string;
  Description?: string | redacted.Redacted<string>;
  EncryptionKey?: string;
  Fields?: { [key: string]: DomainObjectTypeField | undefined };
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetEventStreamRequest {
  DomainName: string;
  EventStreamName: string;
}
export type EventStreamState = "RUNNING" | "STOPPED" | (string & {});
export type EventStreamDestinationStatus =
  | "HEALTHY"
  | "UNHEALTHY"
  | (string & {});
export interface EventStreamDestinationDetails {
  Uri: string;
  Status: EventStreamDestinationStatus;
  UnhealthySince?: Date;
  Message?: string;
}
export interface GetEventStreamResponse {
  DomainName: string;
  EventStreamArn: string;
  CreatedAt: Date;
  State: EventStreamState;
  StoppedSince?: Date;
  DestinationDetails: EventStreamDestinationDetails;
  Tags?: { [key: string]: string | undefined };
}
export interface GetEventTriggerRequest {
  DomainName: string;
  EventTriggerName: string;
}
export interface GetEventTriggerResponse {
  EventTriggerName?: string;
  ObjectTypeName?: string;
  Description?: string | redacted.Redacted<string>;
  EventTriggerConditions?: EventTriggerCondition[];
  SegmentFilter?: string;
  EventTriggerLimits?: EventTriggerLimits;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetIdentityResolutionJobRequest {
  DomainName: string;
  JobId: string;
}
export type IdentityResolutionJobStatus =
  | "PENDING"
  | "PREPROCESSING"
  | "FIND_MATCHING"
  | "MERGING"
  | "COMPLETED"
  | "PARTIAL_SUCCESS"
  | "FAILED"
  | (string & {});
export type S3KeyName = string;
export interface S3ExportingLocation {
  S3BucketName?: string;
  S3KeyName?: string;
}
export interface ExportingLocation {
  S3Exporting?: S3ExportingLocation;
}
export interface JobStats {
  NumberOfProfilesReviewed?: number;
  NumberOfMatchesFound?: number;
  NumberOfMergesDone?: number;
}
export interface GetIdentityResolutionJobResponse {
  DomainName?: string;
  JobId?: string;
  Status?: IdentityResolutionJobStatus;
  Message?: string;
  JobStartTime?: Date;
  JobEndTime?: Date;
  LastUpdatedAt?: Date;
  JobExpirationTime?: Date;
  AutoMerging?: AutoMerging;
  ExportingLocation?: ExportingLocation;
  JobStats?: JobStats;
}
export interface GetIntegrationRequest {
  DomainName: string;
  Uri: string;
}
export type ObjectTypeNames = { [key: string]: string | undefined };
export type EventTriggerNames = string[];
export type Scope = "PROFILE" | "DOMAIN" | (string & {});
export interface GetIntegrationResponse {
  DomainName: string;
  Uri: string;
  ObjectTypeName?: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
  ObjectTypeNames?: { [key: string]: string | undefined };
  WorkflowId?: string;
  IsUnstructured?: boolean;
  RoleArn?: string;
  EventTriggerNames?: string[];
  Scope?: Scope;
}
export type Token = string;
export type MaxSize100 = number;
export interface GetMatchesRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
}
export type MatchesNumber = number;
export type ProfileIdList = string[];
export interface MatchItem {
  MatchId?: string;
  ProfileIds?: string[];
  ConfidenceScore?: number;
}
export type MatchesList = MatchItem[];
export interface GetMatchesResponse {
  NextToken?: string;
  MatchGenerationDate?: Date;
  PotentialMatches?: number;
  Matches?: MatchItem[];
}
export interface GetObjectTypeAttributeStatisticsRequest {
  DomainName: string;
  ObjectTypeName: string;
  AttributeName: string;
}
export interface GetObjectTypeAttributeStatisticsPercentiles {
  P5: number;
  P25: number;
  P50: number;
  P75: number;
  P95: number;
}
export interface GetObjectTypeAttributeStatisticsStats {
  Maximum: number;
  Minimum: number;
  Average: number;
  StandardDeviation: number;
  Percentiles: GetObjectTypeAttributeStatisticsPercentiles;
}
export interface GetObjectTypeAttributeStatisticsResponse {
  Statistics: GetObjectTypeAttributeStatisticsStats;
  CalculatedAt: Date;
}
export interface GetProfileHistoryRecordRequest {
  DomainName: string;
  ProfileId: string;
  Id: string;
}
export type ActionType =
  | "ADDED_PROFILE_KEY"
  | "DELETED_PROFILE_KEY"
  | "CREATED"
  | "UPDATED"
  | "INGESTED"
  | "DELETED_BY_CUSTOMER"
  | "EXPIRED"
  | "MERGED"
  | "DELETED_BY_MERGE"
  | (string & {});
export interface GetProfileHistoryRecordResponse {
  Id: string;
  ObjectTypeName: string;
  CreatedAt: Date;
  LastUpdatedAt?: Date;
  ActionType: ActionType;
  ProfileObjectUniqueKey?: string;
  Content?: string | redacted.Redacted<string>;
  PerformedBy?: string;
}
export interface GetProfileObjectTypeRequest {
  DomainName: string;
  ObjectTypeName: string;
}
export type MinSize0 = number;
export type MinSize1 = number;
export interface GetProfileObjectTypeResponse {
  ObjectTypeName: string;
  Description: string | redacted.Redacted<string>;
  TemplateId?: string;
  ExpirationDays?: number;
  EncryptionKey?: string;
  AllowProfileCreation?: boolean;
  SourceLastUpdatedTimestampFormat?: string;
  MaxAvailableProfileObjectCount?: number;
  MaxProfileObjectCount?: number;
  SourcePriority?: number;
  Fields?: { [key: string]: ObjectTypeField | undefined };
  Keys?: { [key: string]: ObjectTypeKey[] | undefined };
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetProfileObjectTypeTemplateRequest {
  TemplateId: string;
}
export interface GetProfileObjectTypeTemplateResponse {
  TemplateId?: string;
  SourceName?: string;
  SourceObject?: string;
  AllowProfileCreation?: boolean;
  SourceLastUpdatedTimestampFormat?: string;
  Fields?: { [key: string]: ObjectTypeField | undefined };
  Keys?: { [key: string]: ObjectTypeKey[] | undefined };
}
export type ContextKey = string;
export type RecommenderContext = { [key: string]: string | undefined };
export type RecommenderFilterAttributeName = string;
export type RecommenderFilterAttributeValue =
  | string
  | redacted.Redacted<string>;
export type RecommenderFilterValues = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface RecommenderFilter {
  Name?: string;
  Values?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type RecommenderFilters = RecommenderFilter[];
export type PercentPromotedItems = number;
export interface RecommenderPromotionalFilter {
  Name?: string;
  Values?: { [key: string]: string | redacted.Redacted<string> | undefined };
  PromotionName?: string;
  PercentPromotedItems?: number;
}
export type RecommenderPromotionalFilters = RecommenderPromotionalFilter[];
export type CandidateIdList = string[];
export type MaxSize500 = number;
export type MetadataColumnName = string;
export type MetadataColumnsList = string[];
export interface MetadataConfig {
  MetadataColumns?: string[];
}
export type DiversityPlaceholderName = string;
export type DiversityCapValue = number;
export type DiversityValuesMap = { [key: string]: number | undefined };
export interface RecommendationDiversityConfig {
  Enabled: boolean;
  Values?: { [key: string]: number | undefined };
}
export interface GetProfileRecommendationsRequest {
  DomainName: string;
  ProfileId: string;
  RecommenderName: string;
  Context?: { [key: string]: string | undefined };
  RecommenderFilters?: RecommenderFilter[];
  RecommenderPromotionalFilters?: RecommenderPromotionalFilter[];
  CandidateIds?: string[];
  MaxResults?: number;
  MetadataConfig?: MetadataConfig;
  DiversityConfig?: RecommendationDiversityConfig;
}
export interface CatalogItem {
  Id?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  Code?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Category?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  AdditionalInformation?: string | redacted.Redacted<string>;
  ImageLink?: string | redacted.Redacted<string>;
  Link?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Price?: string | redacted.Redacted<string>;
  Attributes?: { [key: string]: string | undefined };
}
export interface Recommendation {
  CatalogItem?: CatalogItem;
  Score?: number;
}
export type Recommendations = Recommendation[];
export interface GetProfileRecommendationsResponse {
  Recommendations?: Recommendation[];
}
export type GetRecommenderRequestTrainingMetricsCountInteger = number;
export interface GetRecommenderRequest {
  DomainName: string;
  RecommenderName: string;
  TrainingMetricsCount?: number;
}
export type RecommenderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "ACTIVE"
  | "FAILED"
  | "STOPPING"
  | "INACTIVE"
  | "STARTING"
  | "DELETING"
  | (string & {});
export type RecommenderVersionName = string;
export interface RecommenderUpdate {
  RecommenderConfig?: RecommenderConfig;
  Status?: RecommenderStatus;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  FailureReason?: string;
  RecommenderVersionName?: string;
}
export type TrainingMetricName =
  | "hit"
  | "coverage"
  | "recall"
  | "popularity"
  | "freshness"
  | "similarity"
  | "mean_reciprocal_rank_at_25"
  | "normalized_discounted_cumulative_gain_at_5"
  | "normalized_discounted_cumulative_gain_at_10"
  | "normalized_discounted_cumulative_gain_at_25"
  | "precision_at_5"
  | "precision_at_10"
  | "precision_at_25"
  | (string & {});
export type Metrics = { [key in TrainingMetricName]?: number };
export interface TrainingMetrics {
  Time?: Date;
  Metrics?: { [key: string]: number | undefined };
  RecommenderVersionName?: string;
}
export type TrainingMetricsList = TrainingMetrics[];
export interface GetRecommenderResponse {
  RecommenderName: string;
  RecommenderRecipeName: RecommenderRecipeName;
  RecommenderSchemaName?: string;
  RecommenderConfig?: RecommenderConfig;
  Description?: string | redacted.Redacted<string>;
  Status?: RecommenderStatus;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  FailureReason?: string;
  LatestRecommenderUpdate?: RecommenderUpdate;
  ActiveRecommenderVersionName?: string;
  TrainingMetrics?: TrainingMetrics[];
  Tags?: { [key: string]: string | undefined };
}
export interface GetRecommenderFilterRequest {
  DomainName: string;
  RecommenderFilterName: string;
}
export type RecommenderFilterStatus =
  | "ACTIVE"
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "DELETING"
  | (string & {});
export interface GetRecommenderFilterResponse {
  RecommenderFilterName: string;
  RecommenderFilterExpression: string | redacted.Redacted<string>;
  RecommenderSchemaName?: string;
  CreatedAt: Date;
  Status: RecommenderFilterStatus;
  Description?: string | redacted.Redacted<string>;
  FailureReason?: string;
  Tags: { [key: string]: string | undefined };
}
export interface GetRecommenderSchemaRequest {
  DomainName: string;
  RecommenderSchemaName: string;
}
export interface GetRecommenderSchemaResponse {
  RecommenderSchemaName: string;
  Fields: { [key: string]: RecommenderSchemaField[] | undefined };
  CreatedAt: Date;
  Status: RecommenderSchemaStatus;
}
export interface GetSegmentDefinitionRequest {
  DomainName: string;
  SegmentDefinitionName: string;
}
export type SegmentType = "CLASSIC" | "ENHANCED" | (string & {});
export interface GetSegmentDefinitionResponse {
  SegmentDefinitionName?: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  SegmentGroups?: SegmentGroup;
  SegmentSort?: SegmentSort;
  SegmentDefinitionArn: string;
  CreatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
  SegmentSqlQuery?: string | redacted.Redacted<string>;
  SegmentType?: SegmentType;
}
export interface GetSegmentEstimateRequest {
  DomainName: string;
  EstimateId: string;
}
export type EstimateStatus = "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
export interface GetSegmentEstimateResponse {
  DomainName?: string;
  EstimateId?: string;
  Status?: EstimateStatus;
  Estimate?: string;
  Message?: string;
  StatusCode?: number;
}
export type ProfileIds = string[];
export interface GetSegmentMembershipRequest {
  DomainName: string;
  SegmentDefinitionName: string;
  ProfileIds: string[];
}
export type ProfileId = string;
export type QueryResult = "PRESENT" | "ABSENT" | (string & {});
export interface ProfileQueryResult {
  ProfileId: string;
  QueryResult: QueryResult;
  Profile?: Profile;
}
export type Profiles = ProfileQueryResult[];
export type GetSegmentMembershipMessage = string;
export type GetSegmentMembershipStatus = number;
export interface ProfileQueryFailures {
  ProfileId: string;
  Message: string;
  Status?: number;
}
export type Failures = ProfileQueryFailures[];
export interface GetSegmentMembershipResponse {
  SegmentDefinitionName?: string;
  Profiles?: ProfileQueryResult[];
  Failures?: ProfileQueryFailures[];
  LastComputedAt?: Date;
}
export interface GetSegmentSnapshotRequest {
  DomainName: string;
  SegmentDefinitionName: string;
  SnapshotId: string;
}
export type SegmentSnapshotStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export interface GetSegmentSnapshotResponse {
  SnapshotId: string;
  Status: SegmentSnapshotStatus;
  StatusMessage?: string;
  DataFormat: DataFormat;
  EncryptionKey?: string;
  RoleArn?: string;
  DestinationUri?: string;
}
export type MatchType =
  | "RULE_BASED_MATCHING"
  | "ML_BASED_MATCHING"
  | (string & {});
export interface GetSimilarProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
  MatchType: MatchType;
  SearchKey: string;
  SearchValue: string;
}
export type RuleLevel = number;
export interface GetSimilarProfilesResponse {
  ProfileIds?: string[];
  MatchId?: string;
  MatchType?: MatchType;
  RuleLevel?: number;
  ConfidenceScore?: number;
  NextToken?: string;
}
export interface GetUploadJobRequest {
  DomainName: string;
  JobId: string;
}
export type UploadJobStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "PARTIALLY_SUCCEEDED"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export type StatusReason =
  | "VALIDATION_FAILURE"
  | "INTERNAL_FAILURE"
  | (string & {});
export interface ResultsSummary {
  UpdatedRecords?: number;
  CreatedRecords?: number;
  FailedRecords?: number;
}
export interface GetUploadJobResponse {
  JobId?: string;
  DisplayName?: string;
  Status?: UploadJobStatus;
  StatusReason?: StatusReason;
  CreatedAt?: Date;
  CompletedAt?: Date;
  Fields?: { [key: string]: ObjectTypeField | undefined };
  UniqueKey?: string;
  ResultsSummary?: ResultsSummary;
  DataExpiry?: number;
}
export interface GetUploadJobPathRequest {
  DomainName: string;
  JobId: string;
}
export interface GetUploadJobPathResponse {
  Url: string;
  ClientToken?: string;
  ValidUntil?: Date;
}
export interface GetWorkflowRequest {
  DomainName: string;
  WorkflowId: string;
}
export type Status =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | "SPLIT"
  | "RETRY"
  | "CANCELLED"
  | (string & {});
export interface AppflowIntegrationWorkflowAttributes {
  SourceConnectorType: SourceConnectorType;
  ConnectorProfileName: string;
  RoleArn?: string;
}
export interface WorkflowAttributes {
  AppflowIntegration?: AppflowIntegrationWorkflowAttributes;
}
export interface AppflowIntegrationWorkflowMetrics {
  RecordsProcessed: number;
  StepsCompleted: number;
  TotalSteps: number;
}
export interface WorkflowMetrics {
  AppflowIntegration?: AppflowIntegrationWorkflowMetrics;
}
export interface GetWorkflowResponse {
  WorkflowId?: string;
  WorkflowType?: WorkflowType;
  Status?: Status;
  ErrorDescription?: string;
  StartDate?: Date;
  LastUpdatedAt?: Date;
  Attributes?: WorkflowAttributes;
  Metrics?: WorkflowMetrics;
}
export interface GetWorkflowStepsRequest {
  DomainName: string;
  WorkflowId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AppflowIntegrationWorkflowStep {
  FlowName: string;
  Status: Status;
  ExecutionMessage: string;
  RecordsProcessed: number;
  BatchRecordsStartTime: string;
  BatchRecordsEndTime: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
}
export interface WorkflowStepItem {
  AppflowIntegration?: AppflowIntegrationWorkflowStep;
}
export type WorkflowStepsList = WorkflowStepItem[];
export interface GetWorkflowStepsResponse {
  WorkflowId?: string;
  WorkflowType?: WorkflowType;
  Items?: WorkflowStepItem[];
  NextToken?: string;
}
export interface ListAccountIntegrationsRequest {
  Uri: string;
  NextToken?: string;
  MaxResults?: number;
  IncludeHidden?: boolean;
}
export interface ListIntegrationItem {
  DomainName: string;
  Uri: string;
  ObjectTypeName?: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
  ObjectTypeNames?: { [key: string]: string | undefined };
  WorkflowId?: string;
  IsUnstructured?: boolean;
  RoleArn?: string;
  EventTriggerNames?: string[];
  Scope?: Scope;
}
export type IntegrationList = ListIntegrationItem[];
export interface ListAccountIntegrationsResponse {
  Items?: ListIntegrationItem[];
  NextToken?: string;
}
export interface ListCalculatedAttributeDefinitionsRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListCalculatedAttributeDefinitionItem {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  UseHistoricalData?: boolean;
  Status?: ReadinessStatus;
  Tags?: { [key: string]: string | undefined };
}
export type CalculatedAttributeDefinitionsList =
  ListCalculatedAttributeDefinitionItem[];
export interface ListCalculatedAttributeDefinitionsResponse {
  Items?: ListCalculatedAttributeDefinitionItem[];
  NextToken?: string;
}
export interface ListCalculatedAttributesForProfileRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
  ProfileId: string;
}
export interface ListCalculatedAttributeForProfileItem {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  IsDataPartial?: string;
  Value?: string;
  LastObjectTimestamp?: Date;
}
export type CalculatedAttributesForProfileList =
  ListCalculatedAttributeForProfileItem[];
export interface ListCalculatedAttributesForProfileResponse {
  Items?: ListCalculatedAttributeForProfileItem[];
  NextToken?: string;
}
export interface ListDomainLayoutsRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface LayoutItem {
  LayoutDefinitionName: string;
  Description: string | redacted.Redacted<string>;
  DisplayName: string;
  IsDefault?: boolean;
  LayoutType: LayoutType;
  Tags?: { [key: string]: string | undefined };
  CreatedAt: Date;
  LastUpdatedAt: Date;
}
export type LayoutList = LayoutItem[];
export interface ListDomainLayoutsResponse {
  Items?: LayoutItem[];
  NextToken?: string;
}
export interface ListDomainObjectTypesRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DomainObjectTypesListItem {
  ObjectTypeName: string;
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type DomainObjectTypesList = DomainObjectTypesListItem[];
export interface ListDomainObjectTypesResponse {
  Items?: DomainObjectTypesListItem[];
  NextToken?: string;
}
export interface ListDomainsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListDomainItem {
  DomainName: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export type DomainList = ListDomainItem[];
export interface ListDomainsResponse {
  Items?: ListDomainItem[];
  NextToken?: string;
}
export interface ListEventStreamsRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DestinationSummary {
  Uri: string;
  Status: EventStreamDestinationStatus;
  UnhealthySince?: Date;
}
export interface EventStreamSummary {
  DomainName: string;
  EventStreamName: string;
  EventStreamArn: string;
  State: EventStreamState;
  StoppedSince?: Date;
  DestinationSummary?: DestinationSummary;
  Tags?: { [key: string]: string | undefined };
}
export type EventStreamSummaryList = EventStreamSummary[];
export interface ListEventStreamsResponse {
  Items?: EventStreamSummary[];
  NextToken?: string;
}
export interface ListEventTriggersRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface EventTriggerSummaryItem {
  ObjectTypeName?: string;
  EventTriggerName?: string;
  Description?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type EventTriggerSummaryList = EventTriggerSummaryItem[];
export interface ListEventTriggersResponse {
  Items?: EventTriggerSummaryItem[];
  NextToken?: string;
}
export interface ListIdentityResolutionJobsRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface IdentityResolutionJob {
  DomainName?: string;
  JobId?: string;
  Status?: IdentityResolutionJobStatus;
  JobStartTime?: Date;
  JobEndTime?: Date;
  JobStats?: JobStats;
  ExportingLocation?: ExportingLocation;
  Message?: string;
}
export type IdentityResolutionJobsList = IdentityResolutionJob[];
export interface ListIdentityResolutionJobsResponse {
  IdentityResolutionJobsList?: IdentityResolutionJob[];
  NextToken?: string;
}
export interface ListIntegrationsRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
  IncludeHidden?: boolean;
}
export interface ListIntegrationsResponse {
  Items?: ListIntegrationItem[];
  NextToken?: string;
}
export interface ListObjectTypeAttributesRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
  ObjectTypeName: string;
}
export interface ListObjectTypeAttributeItem {
  AttributeName: string;
  LastUpdatedAt: Date;
}
export type ListObjectTypeAttributesList = ListObjectTypeAttributeItem[];
export interface ListObjectTypeAttributesResponse {
  Items?: ListObjectTypeAttributeItem[];
  NextToken?: string;
}
export interface ListObjectTypeAttributeValuesRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
  ObjectTypeName: string;
  AttributeName: string;
}
export interface ListObjectTypeAttributeValuesItem {
  Value: string | redacted.Redacted<string>;
  LastUpdatedAt: Date;
}
export type ListObjectTypeAttributeValuesList =
  ListObjectTypeAttributeValuesItem[];
export interface ListObjectTypeAttributeValuesResponse {
  Items?: ListObjectTypeAttributeValuesItem[];
  NextToken?: string;
}
export interface ProfileAttributeValuesRequest {
  DomainName: string;
  AttributeName: string;
}
export interface AttributeValueItem {
  Value?: string;
}
export type AttributeValueItemList = AttributeValueItem[];
export interface ProfileAttributeValuesResponse {
  DomainName?: string;
  AttributeName?: string;
  Items?: AttributeValueItem[];
  StatusCode?: number;
}
export interface ListProfileHistoryRecordsRequest {
  DomainName: string;
  ProfileId: string;
  ObjectTypeName?: string;
  NextToken?: string;
  MaxResults?: number;
  ActionType?: ActionType;
  PerformedBy?: string;
}
export interface ProfileHistoryRecord {
  Id: string;
  ObjectTypeName: string;
  CreatedAt: Date;
  LastUpdatedAt?: Date;
  ActionType: ActionType;
  ProfileObjectUniqueKey?: string;
  PerformedBy?: string;
}
export type ProfileHistoryRecords = ProfileHistoryRecord[];
export interface ListProfileHistoryRecordsResponse {
  ProfileHistoryRecords?: ProfileHistoryRecord[];
  NextToken?: string;
}
export interface ObjectFilter {
  KeyName: string;
  Values: string[];
}
export interface ListProfileObjectsRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
  ObjectTypeName: string;
  ProfileId: string;
  ObjectFilter?: ObjectFilter;
}
export interface ListProfileObjectsItem {
  ObjectTypeName?: string;
  ProfileObjectUniqueKey?: string;
  Object?: string | redacted.Redacted<string>;
}
export type ProfileObjectList = ListProfileObjectsItem[];
export interface ListProfileObjectsResponse {
  Items?: ListProfileObjectsItem[];
  NextToken?: string;
}
export interface ListProfileObjectTypesRequest {
  DomainName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListProfileObjectTypeItem {
  ObjectTypeName: string;
  Description: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  MaxProfileObjectCount?: number;
  MaxAvailableProfileObjectCount?: number;
  SourcePriority?: number;
  Tags?: { [key: string]: string | undefined };
}
export type ProfileObjectTypeList = ListProfileObjectTypeItem[];
export interface ListProfileObjectTypesResponse {
  Items?: ListProfileObjectTypeItem[];
  NextToken?: string;
}
export interface ListProfileObjectTypeTemplatesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListProfileObjectTypeTemplateItem {
  TemplateId?: string;
  SourceName?: string;
  SourceObject?: string;
}
export type ProfileObjectTypeTemplateList = ListProfileObjectTypeTemplateItem[];
export interface ListProfileObjectTypeTemplatesResponse {
  Items?: ListProfileObjectTypeTemplateItem[];
  NextToken?: string;
}
export interface ListRecommenderFiltersRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RecommenderFilterSummary {
  RecommenderFilterName?: string;
  RecommenderSchemaName?: string;
  RecommenderFilterExpression?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  Description?: string | redacted.Redacted<string>;
  Status?: RecommenderFilterStatus;
  FailureReason?: string;
  Tags?: { [key: string]: string | undefined };
}
export type RecommenderFilterSummaryList = RecommenderFilterSummary[];
export interface ListRecommenderFiltersResponse {
  NextToken?: string;
  RecommenderFilters?: RecommenderFilterSummary[];
}
export type ListRecommenderRecipesRequestMaxResultsInteger = number;
export interface ListRecommenderRecipesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface RecommenderRecipe {
  name?: RecommenderRecipeName;
  description?: string;
}
export type RecommenderRecipesList = RecommenderRecipe[];
export interface ListRecommenderRecipesResponse {
  NextToken?: string;
  RecommenderRecipes?: RecommenderRecipe[];
}
export type ListRecommendersRequestMaxResultsInteger = number;
export interface ListRecommendersRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RecommenderSummary {
  RecommenderName?: string;
  RecipeName?: RecommenderRecipeName;
  RecommenderSchemaName?: string;
  RecommenderConfig?: RecommenderConfig;
  CreatedAt?: Date;
  Description?: string | redacted.Redacted<string>;
  Status?: RecommenderStatus;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
  FailureReason?: string;
  LatestRecommenderUpdate?: RecommenderUpdate;
}
export type RecommenderSummaryList = RecommenderSummary[];
export interface ListRecommendersResponse {
  NextToken?: string;
  Recommenders?: RecommenderSummary[];
}
export interface ListRecommenderSchemasRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RecommenderSchemaSummary {
  RecommenderSchemaName: string;
  Fields: { [key: string]: RecommenderSchemaField[] | undefined };
  CreatedAt: Date;
  Status: RecommenderSchemaStatus;
}
export type RecommenderSchemaSummaryList = RecommenderSchemaSummary[];
export interface ListRecommenderSchemasResponse {
  NextToken?: string;
  RecommenderSchemas?: RecommenderSchemaSummary[];
}
export interface ListRuleBasedMatchesRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
}
export type MatchIdList = string[];
export interface ListRuleBasedMatchesResponse {
  MatchIds?: string[];
  NextToken?: string;
}
export interface ListSegmentDefinitionsRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface SegmentDefinitionItem {
  SegmentDefinitionName?: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  SegmentDefinitionArn?: string;
  CreatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
  SegmentType?: SegmentType;
}
export type SegmentDefinitionsList = SegmentDefinitionItem[];
export interface ListSegmentDefinitionsResponse {
  NextToken?: string;
  Items?: SegmentDefinitionItem[];
}
export type TagArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListUploadJobsRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface UploadJobItem {
  JobId?: string;
  DisplayName?: string;
  Status?: UploadJobStatus;
  StatusReason?: StatusReason;
  CreatedAt?: Date;
  CompletedAt?: Date;
  DataExpiry?: number;
}
export type UploadJobsList = UploadJobItem[];
export interface ListUploadJobsResponse {
  NextToken?: string;
  Items?: UploadJobItem[];
}
export interface ListWorkflowsRequest {
  DomainName: string;
  WorkflowType?: WorkflowType;
  Status?: Status;
  QueryStartDate?: Date;
  QueryEndDate?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListWorkflowsItem {
  WorkflowType: WorkflowType;
  WorkflowId: string;
  Status: Status;
  StatusDescription: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
}
export type WorkflowList = ListWorkflowsItem[];
export interface ListWorkflowsResponse {
  Items?: ListWorkflowsItem[];
  NextToken?: string;
}
export type ProfileIdToBeMergedList = string[];
export type AttributeSourceIdMap = { [key: string]: string | undefined };
export interface FieldSourceProfileIds {
  AccountNumber?: string;
  AdditionalInformation?: string;
  PartyType?: string;
  BusinessName?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  BirthDate?: string;
  Gender?: string;
  PhoneNumber?: string;
  MobilePhoneNumber?: string;
  HomePhoneNumber?: string;
  BusinessPhoneNumber?: string;
  EmailAddress?: string;
  PersonalEmailAddress?: string;
  BusinessEmailAddress?: string;
  Address?: string;
  ShippingAddress?: string;
  MailingAddress?: string;
  BillingAddress?: string;
  Attributes?: { [key: string]: string | undefined };
  ProfileType?: string;
  EngagementPreferences?: string;
}
export interface MergeProfilesRequest {
  DomainName: string;
  MainProfileId: string;
  ProfileIdsToBeMerged: string[];
  FieldSourceProfileIds?: FieldSourceProfileIds;
}
export interface MergeProfilesResponse {
  Message?: string;
}
export interface PutDomainObjectTypeRequest {
  DomainName: string;
  ObjectTypeName: string;
  Description?: string | redacted.Redacted<string>;
  EncryptionKey?: string;
  Fields: { [key: string]: DomainObjectTypeField | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface PutDomainObjectTypeResponse {
  ObjectTypeName?: string;
  Description?: string | redacted.Redacted<string>;
  EncryptionKey?: string;
  Fields?: { [key: string]: DomainObjectTypeField | undefined };
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface PutIntegrationRequest {
  DomainName: string;
  Uri?: string;
  ObjectTypeName?: string;
  ObjectTypeNames?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
  FlowDefinition?: FlowDefinition;
  RoleArn?: string;
  EventTriggerNames?: string[];
  Scope?: Scope;
}
export interface PutIntegrationResponse {
  DomainName: string;
  Uri: string;
  ObjectTypeName?: string;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
  ObjectTypeNames?: { [key: string]: string | undefined };
  WorkflowId?: string;
  IsUnstructured?: boolean;
  RoleArn?: string;
  EventTriggerNames?: string[];
  Scope?: Scope;
}
export interface PutProfileObjectRequest {
  ObjectTypeName: string;
  Object: string | redacted.Redacted<string>;
  DomainName: string;
}
export interface PutProfileObjectResponse {
  ProfileObjectUniqueKey?: string;
}
export interface PutProfileObjectTypeRequest {
  DomainName: string;
  ObjectTypeName: string;
  Description: string | redacted.Redacted<string>;
  TemplateId?: string;
  ExpirationDays?: number;
  EncryptionKey?: string;
  AllowProfileCreation?: boolean;
  SourceLastUpdatedTimestampFormat?: string;
  MaxProfileObjectCount?: number;
  SourcePriority?: number;
  Fields?: { [key: string]: ObjectTypeField | undefined };
  Keys?: { [key: string]: ObjectTypeKey[] | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface PutProfileObjectTypeResponse {
  ObjectTypeName: string;
  Description: string | redacted.Redacted<string>;
  TemplateId?: string;
  ExpirationDays?: number;
  EncryptionKey?: string;
  AllowProfileCreation?: boolean;
  SourceLastUpdatedTimestampFormat?: string;
  MaxProfileObjectCount?: number;
  MaxAvailableProfileObjectCount?: number;
  SourcePriority?: number;
  Fields?: { [key: string]: ObjectTypeField | undefined };
  Keys?: { [key: string]: ObjectTypeKey[] | undefined };
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface AdditionalSearchKey {
  KeyName: string;
  Values: string[];
}
export type AdditionalSearchKeysList = AdditionalSearchKey[];
export type LogicalOperator = "AND" | "OR" | (string & {});
export interface SearchProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
  DomainName: string;
  KeyName: string;
  Values: string[];
  AdditionalSearchKeys?: AdditionalSearchKey[];
  LogicalOperator?: LogicalOperator;
}
export interface SearchProfilesResponse {
  Items?: Profile[];
  NextToken?: string;
}
export interface StartRecommenderRequest {
  DomainName: string;
  RecommenderName: string;
}
export interface StartRecommenderResponse {}
export interface StartUploadJobRequest {
  DomainName: string;
  JobId: string;
}
export interface StartUploadJobResponse {}
export interface StopRecommenderRequest {
  DomainName: string;
  RecommenderName: string;
}
export interface StopRecommenderResponse {}
export interface StopUploadJobRequest {
  DomainName: string;
  JobId: string;
}
export interface StopUploadJobResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCalculatedAttributeDefinitionRequest {
  DomainName: string;
  CalculatedAttributeName: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  Conditions?: Conditions;
}
export interface UpdateCalculatedAttributeDefinitionResponse {
  CalculatedAttributeName?: string;
  DisplayName?: string;
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Statistic?: Statistic;
  Conditions?: Conditions;
  AttributeDetails?: AttributeDetails;
  UseHistoricalData?: boolean;
  Status?: ReadinessStatus;
  Readiness?: Readiness;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateDomainRequest {
  DomainName: string;
  DefaultExpirationDays?: number;
  DefaultEncryptionKey?: string;
  DeadLetterQueueUrl?: string;
  Matching?: MatchingRequest;
  RuleBasedMatching?: RuleBasedMatchingRequest;
  DataStore?: DataStoreRequest;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateDomainResponse {
  DomainName: string;
  DefaultExpirationDays?: number;
  DefaultEncryptionKey?: string;
  DeadLetterQueueUrl?: string;
  Matching?: MatchingResponse;
  RuleBasedMatching?: RuleBasedMatchingResponse;
  DataStore?: DataStoreResponse;
  CreatedAt: Date;
  LastUpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateDomainLayoutRequest {
  DomainName: string;
  LayoutDefinitionName: string;
  Description?: string | redacted.Redacted<string>;
  DisplayName?: string;
  IsDefault?: boolean;
  LayoutType?: LayoutType;
  Layout?: string | redacted.Redacted<string>;
}
export interface UpdateDomainLayoutResponse {
  LayoutDefinitionName?: string;
  Description?: string | redacted.Redacted<string>;
  DisplayName?: string;
  IsDefault?: boolean;
  LayoutType?: LayoutType;
  Layout?: string | redacted.Redacted<string>;
  Version?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateEventTriggerRequest {
  DomainName: string;
  EventTriggerName: string;
  ObjectTypeName?: string;
  Description?: string | redacted.Redacted<string>;
  EventTriggerConditions?: EventTriggerCondition[];
  SegmentFilter?: string;
  EventTriggerLimits?: EventTriggerLimits;
}
export interface UpdateEventTriggerResponse {
  EventTriggerName?: string;
  ObjectTypeName?: string;
  Description?: string | redacted.Redacted<string>;
  EventTriggerConditions?: EventTriggerCondition[];
  SegmentFilter?: string;
  EventTriggerLimits?: EventTriggerLimits;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type SensitiveString0To1000 = string | redacted.Redacted<string>;
export type SensitiveString0To255 = string | redacted.Redacted<string>;
export type String0To255 = string;
export interface UpdateAddress {
  Address1?: string;
  Address2?: string;
  Address3?: string;
  Address4?: string;
  City?: string;
  County?: string;
  State?: string;
  Province?: string;
  Country?: string;
  PostalCode?: string;
}
export type UpdateAttributes = { [key: string]: string | undefined };
export interface UpdateProfileRequest {
  DomainName: string;
  ProfileId: string;
  AdditionalInformation?: string | redacted.Redacted<string>;
  AccountNumber?: string | redacted.Redacted<string>;
  PartyType?: PartyType;
  BusinessName?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  MiddleName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BirthDate?: string | redacted.Redacted<string>;
  Gender?: Gender;
  PhoneNumber?: string | redacted.Redacted<string>;
  MobilePhoneNumber?: string | redacted.Redacted<string>;
  HomePhoneNumber?: string | redacted.Redacted<string>;
  BusinessPhoneNumber?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  PersonalEmailAddress?: string | redacted.Redacted<string>;
  BusinessEmailAddress?: string | redacted.Redacted<string>;
  Address?: UpdateAddress;
  ShippingAddress?: UpdateAddress;
  MailingAddress?: UpdateAddress;
  BillingAddress?: UpdateAddress;
  Attributes?: { [key: string]: string | undefined };
  PartyTypeString?: string | redacted.Redacted<string>;
  GenderString?: string | redacted.Redacted<string>;
  ProfileType?: ProfileType;
  EngagementPreferences?: EngagementPreferences;
}
export interface UpdateProfileResponse {
  ProfileId: string;
}
export interface UpdateRecommenderRequest {
  DomainName: string;
  RecommenderName: string;
  Description?: string | redacted.Redacted<string>;
  RecommenderConfig?: RecommenderConfig;
  RecommenderVersionName?: string;
}
export interface UpdateRecommenderResponse {
  RecommenderName: string;
}
export type AddProfileKeyError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a new key value with a specific profile, such as a Contact Record
 * ContactId.
 *
 * A profile object can have a single unique key and any number of additional keys that can
 * be used to identify the profile that it belongs to.
 */
export const addProfileKey: API.OperationMethod<
  AddProfileKeyRequest,
  AddProfileKeyResponse,
  AddProfileKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/keys",
    input: { ProfileId: 0, KeyName: 0, Values: 0, DomainName: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddProfileKey",
})) as any;

export type BatchGetCalculatedAttributeForProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Fetch the possible attribute values given the attribute name.
 */
export const batchGetCalculatedAttributeForProfile: API.OperationMethod<
  BatchGetCalculatedAttributeForProfileRequest,
  BatchGetCalculatedAttributeForProfileResponse,
  BatchGetCalculatedAttributeForProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}/batch-get-for-profiles",
    input: {
      CalculatedAttributeName: 0,
      DomainName: 0,
      ProfileIds: 0,
      ConditionOverrides: i_ConditionOverrides,
    },
    output: {
      CalculatedAttributeValues: D.list({ LastObjectTimestamp: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCalculatedAttributeForProfile",
})) as any;

export type BatchGetProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get a batch of profiles.
 */
export const batchGetProfile: API.OperationMethod<
  BatchGetProfileRequest,
  BatchGetProfileResponse,
  BatchGetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/batch-get-profiles",
    input: { DomainName: 0, ProfileIds: 0 },
    output: { Profiles: D.list(o_Profile) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetProfile",
})) as any;

export type BatchPutProfileObjectError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds multiple profile objects to a domain of a given ObjectType in a single API call.
 *
 * When adding a specific profile object, like a Contact Record, an inferred profile can
 * get created if it is not mapped to an existing profile. The resulting profile will only
 * have a phone number populated in the standard ProfileObject. Any additional Contact Records
 * with the same phone number will be mapped to the same inferred profile.
 *
 * When a ProfileObject is created and if a ProfileObjectType already exists for the
 * ProfileObject, it will provide data to a standard profile depending on the
 * ProfileObjectType definition.
 *
 * BatchPutProfileObject needs an ObjectType, which can be created using
 * PutProfileObjectType.
 */
export const batchPutProfileObject: API.OperationMethod<
  BatchPutProfileObjectRequest,
  BatchPutProfileObjectResponse,
  BatchPutProfileObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/profiles/objects/batch-put-profile-object",
    input: {
      DomainName: 0,
      ObjectTypeName: 0,
      Items: D.list({ Id: 0, Object: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutProfileObject",
})) as any;

export type CreateCalculatedAttributeDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new calculated attribute definition. After creation, new object data ingested
 * into Customer Profiles will be included in the calculated attribute, which can be retrieved
 * for a profile using the GetCalculatedAttributeForProfile API. Defining a calculated attribute makes it
 * available for all profiles within a domain. Each calculated attribute can only reference
 * one `ObjectType` and at most, two fields from that
 * `ObjectType`.
 */
export const createCalculatedAttributeDefinition: API.OperationMethod<
  CreateCalculatedAttributeDefinitionRequest,
  CreateCalculatedAttributeDefinitionResponse,
  CreateCalculatedAttributeDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
    input: {
      DomainName: 0,
      CalculatedAttributeName: 0,
      DisplayName: 0,
      Description: 0,
      AttributeDetails: { Attributes: D.list({ Name: 0 }), Expression: 0 },
      Conditions: i_Conditions,
      Filter: {
        Include: 0,
        Groups: D.list({
          Type: 0,
          Dimensions: D.list({
            Attributes: D.map({ DimensionType: 0, Values: 0 }),
          }),
        }),
      },
      Statistic: 0,
      UseHistoricalData: 0,
      Tags: 0,
    },
    output: {
      Description: D.secret,
      Statistic: D.secret,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCalculatedAttributeDefinition",
})) as any;

export type CreateDomainError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a domain, which is a container for all customer data, such as customer profile
 * attributes, object types, profile keys, and encryption keys. You can create multiple
 * domains, and each domain can have multiple third-party integrations.
 *
 * Each Connect Customer instance can be associated with only one domain. Multiple
 * Connect Customer instances can be associated with one domain.
 *
 * Use this API or UpdateDomain to
 * enable identity
 * resolution: set `Matching` to true.
 *
 * To prevent cross-service impersonation when you call this API, see Cross-service confused deputy prevention for sample policies that you should
 * apply.
 *
 * It is not possible to associate a Customer Profiles domain with an Amazon Connect Instance directly from
 * the API. If you would like to create a domain and associate a Customer Profiles domain, use the Amazon Connect
 * admin website. For more information, see Enable Customer Profiles.
 *
 * Each Amazon Connect instance can be associated with only one domain. Multiple Amazon Connect instances
 * can be associated with one domain.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}",
    input: {
      DomainName: 0,
      DefaultExpirationDays: 0,
      DefaultEncryptionKey: 0,
      DeadLetterQueueUrl: 0,
      Matching: i_MatchingRequest,
      RuleBasedMatching: i_RuleBasedMatchingRequest,
      DataStore: i_DataStoreRequest,
      Tags: 0,
    },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

export type CreateDomainLayoutError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the layout to view data for a specific domain. This API can only be invoked from
 * the Amazon Connect admin website.
 */
export const createDomainLayout: API.OperationMethod<
  CreateDomainLayoutRequest,
  CreateDomainLayoutResponse,
  CreateDomainLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/layouts/{LayoutDefinitionName}",
    input: {
      DomainName: 0,
      LayoutDefinitionName: 0,
      Description: 0,
      DisplayName: 0,
      IsDefault: 0,
      LayoutType: 0,
      Layout: 0,
      Tags: 0,
    },
    output: {
      Description: D.secret,
      Layout: D.secret,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainLayout",
})) as any;

export type CreateEventStreamError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an event stream, which is a subscription to real-time events, such as when
 * profiles are created and updated through Connect Customer Customer Profiles.
 *
 * Each event stream can be associated with only one Kinesis Data Stream destination in the
 * same region and Amazon Web Services account as the customer profiles domain
 */
export const createEventStream: API.OperationMethod<
  CreateEventStreamRequest,
  CreateEventStreamResponse,
  CreateEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/event-streams/{EventStreamName}",
    input: { DomainName: 0, Uri: 0, EventStreamName: 0, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventStream",
})) as any;

export type CreateEventTriggerError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an event trigger, which specifies the rules when to perform action based on
 * customer's ingested data.
 *
 * Each event stream can be associated with only one integration in the same region and AWS
 * account as the event stream.
 */
export const createEventTrigger: API.OperationMethod<
  CreateEventTriggerRequest,
  CreateEventTriggerResponse,
  CreateEventTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/event-triggers/{EventTriggerName}",
    input: {
      DomainName: 0,
      EventTriggerName: 0,
      ObjectTypeName: 0,
      Description: 0,
      EventTriggerConditions: D.list(i_EventTriggerCondition),
      SegmentFilter: 0,
      EventTriggerLimits: i_EventTriggerLimits,
      Tags: 0,
    },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventTrigger",
})) as any;

export type CreateIntegrationWorkflowError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an integration workflow. An integration workflow is an async process which
 * ingests historic data and sets up an integration for ongoing updates. The supported Amazon AppFlow sources are Salesforce, ServiceNow, and Marketo.
 */
export const createIntegrationWorkflow: API.OperationMethod<
  CreateIntegrationWorkflowRequest,
  CreateIntegrationWorkflowResponse,
  CreateIntegrationWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/workflows/integrations",
    input: {
      DomainName: 0,
      WorkflowType: 0,
      IntegrationConfig: {
        AppflowIntegration: {
          FlowDefinition: i_FlowDefinition,
          Batches: D.list({ StartTime: 0, EndTime: 0 }),
        },
      },
      ObjectTypeName: 0,
      RoleArn: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationWorkflow",
})) as any;

export type CreateProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a standard profile.
 *
 * A standard profile represents the following attributes for a customer profile in a
 * domain.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  CreateProfileResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles",
    input: {
      DomainName: 0,
      AccountNumber: 0,
      AdditionalInformation: 0,
      PartyType: 0,
      BusinessName: 0,
      FirstName: 0,
      MiddleName: 0,
      LastName: 0,
      BirthDate: 0,
      Gender: 0,
      PhoneNumber: 0,
      MobilePhoneNumber: 0,
      HomePhoneNumber: 0,
      BusinessPhoneNumber: 0,
      EmailAddress: 0,
      PersonalEmailAddress: 0,
      BusinessEmailAddress: 0,
      Address: i_Address,
      ShippingAddress: i_Address,
      MailingAddress: i_Address,
      BillingAddress: i_Address,
      Attributes: 0,
      PartyTypeString: 0,
      GenderString: 0,
      ProfileType: 0,
      EngagementPreferences: i_EngagementPreferences,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
})) as any;

export type CreateRecommenderError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a recommender
 */
export const createRecommender: API.OperationMethod<
  CreateRecommenderRequest,
  CreateRecommenderResponse,
  CreateRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/recommenders/{RecommenderName}",
    input: {
      DomainName: 0,
      RecommenderName: 0,
      RecommenderRecipeName: 0,
      RecommenderConfig: i_RecommenderConfig,
      Description: 0,
      RecommenderSchemaName: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommender",
})) as any;

export type CreateRecommenderFilterError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a recommender filter. A recommender filter specifies which items to include or exclude from recommendations.
 */
export const createRecommenderFilter: API.OperationMethod<
  CreateRecommenderFilterRequest,
  CreateRecommenderFilterResponse,
  CreateRecommenderFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/recommender-filters/{RecommenderFilterName}",
    input: {
      DomainName: 0,
      RecommenderFilterName: 0,
      RecommenderFilterExpression: 0,
      RecommenderSchemaName: 0,
      Description: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommenderFilter",
})) as any;

export type CreateRecommenderSchemaError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a recommender schema. A recommender schema defines the set of data columns available for training recommenders and filters under a domain.
 */
export const createRecommenderSchema: API.OperationMethod<
  CreateRecommenderSchemaRequest,
  CreateRecommenderSchemaResponse,
  CreateRecommenderSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/recommender-schemas/{RecommenderSchemaName}",
    input: {
      DomainName: 0,
      RecommenderSchemaName: 0,
      Fields: D.map(
        D.list({ TargetFieldName: 0, ContentType: 0, FeatureType: 0 }),
      ),
      Tags: 0,
    },
    output: { CreatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommenderSchema",
})) as any;

export type CreateSegmentDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a segment definition associated to the given domain.
 */
export const createSegmentDefinition: API.OperationMethod<
  CreateSegmentDefinitionRequest,
  CreateSegmentDefinitionResponse,
  CreateSegmentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/segment-definitions/{SegmentDefinitionName}",
    input: {
      DomainName: 0,
      SegmentDefinitionName: 0,
      DisplayName: 0,
      Description: 0,
      SegmentGroups: { Groups: D.list(i_Group), Include: 0 },
      SegmentSqlQuery: 0,
      SegmentSort: {
        Attributes: D.list({ Name: 0, DataType: 0, Order: 0, Type: 0 }),
      },
      Tags: 0,
    },
    output: { Description: D.secret, CreatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSegmentDefinition",
})) as any;

export type CreateSegmentEstimateError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a segment estimate query.
 */
export const createSegmentEstimate: API.OperationMethod<
  CreateSegmentEstimateRequest,
  CreateSegmentEstimateResponse,
  CreateSegmentEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/segment-estimates",
    input: {
      DomainName: 0,
      SegmentQuery: { Groups: D.list(i_Group), Include: 0 },
      SegmentSqlQuery: 0,
    },
    output: { StatusCode: D.m({ status: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSegmentEstimate",
})) as any;

export type CreateSegmentSnapshotError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Triggers a job to export a segment to a specified destination.
 */
export const createSegmentSnapshot: API.OperationMethod<
  CreateSegmentSnapshotRequest,
  CreateSegmentSnapshotResponse,
  CreateSegmentSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/segments/{SegmentDefinitionName}/snapshots",
    input: {
      DomainName: 0,
      SegmentDefinitionName: 0,
      DataFormat: 0,
      EncryptionKey: 0,
      RoleArn: 0,
      DestinationUri: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSegmentSnapshot",
})) as any;

export type CreateUploadJobError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Upload job to ingest data for segment imports. The metadata is created for
 * the job with the provided field mapping and unique key.
 */
export const createUploadJob: API.OperationMethod<
  CreateUploadJobRequest,
  CreateUploadJobResponse,
  CreateUploadJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/upload-jobs",
    input: {
      DomainName: 0,
      DisplayName: 0,
      Fields: D.map(i_ObjectTypeField),
      UniqueKey: 0,
      DataExpiry: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUploadJob",
})) as any;

export type DeleteCalculatedAttributeDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an existing calculated attribute definition. Note that deleting a default
 * calculated attribute is possible, however once deleted, you will be unable to undo that
 * action and will need to recreate it on your own using the
 * CreateCalculatedAttributeDefinition API if you want it back.
 */
export const deleteCalculatedAttributeDefinition: API.OperationMethod<
  DeleteCalculatedAttributeDefinitionRequest,
  DeleteCalculatedAttributeDefinitionResponse,
  DeleteCalculatedAttributeDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
    input: { DomainName: 0, CalculatedAttributeName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCalculatedAttributeDefinition",
})) as any;

export type DeleteDomainError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a specific domain and all of its customer data, such as customer profile
 * attributes and their related objects.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}",
    input: { DomainName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

export type DeleteDomainLayoutError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the layout used to view data for a specific domain. This API can only be invoked
 * from the Amazon Connect admin website.
 */
export const deleteDomainLayout: API.OperationMethod<
  DeleteDomainLayoutRequest,
  DeleteDomainLayoutResponse,
  DeleteDomainLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/layouts/{LayoutDefinitionName}",
    input: { DomainName: 0, LayoutDefinitionName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainLayout",
})) as any;

export type DeleteDomainObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Delete a DomainObjectType for the given Domain and ObjectType name.
 */
export const deleteDomainObjectType: API.OperationMethod<
  DeleteDomainObjectTypeRequest,
  DeleteDomainObjectTypeResponse,
  DeleteDomainObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/domain-object-types/{ObjectTypeName}",
    input: { DomainName: 0, ObjectTypeName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainObjectType",
})) as any;

export type DeleteEventStreamError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disables and deletes the specified event stream.
 */
export const deleteEventStream: API.OperationMethod<
  DeleteEventStreamRequest,
  DeleteEventStreamResponse,
  DeleteEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/event-streams/{EventStreamName}",
    input: { DomainName: 0, EventStreamName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventStream",
})) as any;

export type DeleteEventTriggerError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disable and deletes the Event Trigger.
 *
 * You cannot delete an Event Trigger with an active Integration associated.
 */
export const deleteEventTrigger: API.OperationMethod<
  DeleteEventTriggerRequest,
  DeleteEventTriggerResponse,
  DeleteEventTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/event-triggers/{EventTriggerName}",
    input: { DomainName: 0, EventTriggerName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventTrigger",
})) as any;

export type DeleteIntegrationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes an integration from a specific domain.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/integrations/delete",
    input: { DomainName: 0, Uri: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
})) as any;

export type DeleteProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the standard customer profile and all data pertaining to the profile.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileRequest,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/delete",
    input: { ProfileId: 0, DomainName: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
})) as any;

export type DeleteProfileKeyError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a searchable key from a customer profile.
 */
export const deleteProfileKey: API.OperationMethod<
  DeleteProfileKeyRequest,
  DeleteProfileKeyResponse,
  DeleteProfileKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/keys/delete",
    input: { ProfileId: 0, KeyName: 0, Values: 0, DomainName: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfileKey",
})) as any;

export type DeleteProfileObjectError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes an object associated with a profile of a given ProfileObjectType.
 */
export const deleteProfileObject: API.OperationMethod<
  DeleteProfileObjectRequest,
  DeleteProfileObjectResponse,
  DeleteProfileObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/objects/delete",
    input: {
      ProfileId: 0,
      ProfileObjectUniqueKey: 0,
      ObjectTypeName: 0,
      DomainName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfileObject",
})) as any;

export type DeleteProfileObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a ProfileObjectType from a specific domain as well as removes all the
 * ProfileObjects of that type. It also disables integrations from this specific
 * ProfileObjectType. In addition, it scrubs all of the fields of the standard profile that
 * were populated from this ProfileObjectType.
 */
export const deleteProfileObjectType: API.OperationMethod<
  DeleteProfileObjectTypeRequest,
  DeleteProfileObjectTypeResponse,
  DeleteProfileObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/object-types/{ObjectTypeName}",
    input: { DomainName: 0, ObjectTypeName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfileObjectType",
})) as any;

export type DeleteRecommenderError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a recommender.
 */
export const deleteRecommender: API.OperationMethod<
  DeleteRecommenderRequest,
  DeleteRecommenderResponse,
  DeleteRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/recommenders/{RecommenderName}",
    input: { DomainName: 0, RecommenderName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommender",
})) as any;

export type DeleteRecommenderFilterError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a recommender filter from a domain.
 */
export const deleteRecommenderFilter: API.OperationMethod<
  DeleteRecommenderFilterRequest,
  DeleteRecommenderFilterResponse,
  DeleteRecommenderFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/recommender-filters/{RecommenderFilterName}",
    input: { DomainName: 0, RecommenderFilterName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommenderFilter",
})) as any;

export type DeleteRecommenderSchemaError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a recommender schema from a domain.
 */
export const deleteRecommenderSchema: API.OperationMethod<
  DeleteRecommenderSchemaRequest,
  DeleteRecommenderSchemaResponse,
  DeleteRecommenderSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/recommender-schemas/{RecommenderSchemaName}",
    input: { DomainName: 0, RecommenderSchemaName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommenderSchema",
})) as any;

export type DeleteSegmentDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a segment definition from the domain.
 */
export const deleteSegmentDefinition: API.OperationMethod<
  DeleteSegmentDefinitionRequest,
  DeleteSegmentDefinitionResponse,
  DeleteSegmentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/segment-definitions/{SegmentDefinitionName}",
    input: { DomainName: 0, SegmentDefinitionName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSegmentDefinition",
})) as any;

export type DeleteWorkflowError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified workflow and all its corresponding resources. This is an async
 * process.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /domains/{DomainName}/workflows/{WorkflowId}",
    input: { DomainName: 0, WorkflowId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
})) as any;

export type DetectProfileObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The process of detecting profile object type mapping by using given objects.
 */
export const detectProfileObjectType: API.OperationMethod<
  DetectProfileObjectTypeRequest,
  DetectProfileObjectTypeResponse,
  DetectProfileObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/detect/object-types",
    input: { Objects: 0, DomainName: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectProfileObjectType",
})) as any;

export type GetAutoMergingPreviewError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Tests the auto-merging settings of your Identity Resolution Job without merging your data. It randomly
 * selects a sample of matching groups from the existing matching results, and applies the
 * automerging settings that you provided. You can then view the number of profiles in the
 * sample, the number of matches, and the number of profiles identified to be merged. This
 * enables you to evaluate the accuracy of the attributes in your matching list.
 *
 * You can't view which profiles are matched and would be merged.
 *
 * We strongly recommend you use this API to do a dry run of the automerging process
 * before running the Identity Resolution Job. Include **at least** two matching
 * attributes. If your matching list includes too few attributes (such as only
 * `FirstName` or only `LastName`), there may be a large number of
 * matches. This increases the chances of erroneous merges.
 */
export const getAutoMergingPreview: API.OperationMethod<
  GetAutoMergingPreviewRequest,
  GetAutoMergingPreviewResponse,
  GetAutoMergingPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/identity-resolution-jobs/auto-merging-preview",
    input: {
      DomainName: 0,
      Consolidation: i_Consolidation,
      ConflictResolution: i_ConflictResolution,
      MinAllowedConfidenceScoreForMerging: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoMergingPreview",
})) as any;

export type GetCalculatedAttributeDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides more information on a calculated attribute definition for Customer
 * Profiles.
 */
export const getCalculatedAttributeDefinition: API.OperationMethod<
  GetCalculatedAttributeDefinitionRequest,
  GetCalculatedAttributeDefinitionResponse,
  GetCalculatedAttributeDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
    input: { DomainName: 0, CalculatedAttributeName: 0 },
    output: {
      Description: D.secret,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      Statistic: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculatedAttributeDefinition",
})) as any;

export type GetCalculatedAttributeForProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieve a calculated attribute for a customer profile.
 */
export const getCalculatedAttributeForProfile: API.OperationMethod<
  GetCalculatedAttributeForProfileRequest,
  GetCalculatedAttributeForProfileResponse,
  GetCalculatedAttributeForProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/profile/{ProfileId}/calculated-attributes/{CalculatedAttributeName}",
    input: { DomainName: 0, ProfileId: 0, CalculatedAttributeName: 0 },
    output: { LastObjectTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculatedAttributeForProfile",
})) as any;

export type GetDomainError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about a specific domain.
 */
export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResponse,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}",
    input: { DomainName: 0 },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
})) as any;

export type GetDomainLayoutError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the layout to view data for a specific domain. This API can only be invoked from
 * the Amazon Connect admin website.
 */
export const getDomainLayout: API.OperationMethod<
  GetDomainLayoutRequest,
  GetDomainLayoutResponse,
  GetDomainLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/layouts/{LayoutDefinitionName}",
    input: { DomainName: 0, LayoutDefinitionName: 0 },
    output: {
      Description: D.secret,
      Layout: D.secret,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainLayout",
})) as any;

export type GetDomainObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Return a DomainObjectType for the input Domain and ObjectType names.
 */
export const getDomainObjectType: API.OperationMethod<
  GetDomainObjectTypeRequest,
  GetDomainObjectTypeResponse,
  GetDomainObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/domain-object-types/{ObjectTypeName}",
    input: { DomainName: 0, ObjectTypeName: 0 },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainObjectType",
})) as any;

export type GetEventStreamError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the specified event stream in a specific domain.
 */
export const getEventStream: API.OperationMethod<
  GetEventStreamRequest,
  GetEventStreamResponse,
  GetEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/event-streams/{EventStreamName}",
    input: { DomainName: 0, EventStreamName: 0 },
    output: {
      CreatedAt: D.ts,
      StoppedSince: D.ts,
      DestinationDetails: { UnhealthySince: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventStream",
})) as any;

export type GetEventTriggerError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get a specific Event Trigger from the domain.
 */
export const getEventTrigger: API.OperationMethod<
  GetEventTriggerRequest,
  GetEventTriggerResponse,
  GetEventTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/event-triggers/{EventTriggerName}",
    input: { DomainName: 0, EventTriggerName: 0 },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventTrigger",
})) as any;

export type GetIdentityResolutionJobError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about an Identity Resolution Job in a specific domain.
 *
 * Identity Resolution Jobs are set up using the Amazon Connect admin console. For more information, see Use
 * Identity Resolution to consolidate similar profiles.
 */
export const getIdentityResolutionJob: API.OperationMethod<
  GetIdentityResolutionJobRequest,
  GetIdentityResolutionJobResponse,
  GetIdentityResolutionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/identity-resolution-jobs/{JobId}",
    input: { DomainName: 0, JobId: 0 },
    output: {
      JobStartTime: D.ts,
      JobEndTime: D.ts,
      LastUpdatedAt: D.ts,
      JobExpirationTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityResolutionJob",
})) as any;

export type GetIntegrationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns an integration for a domain.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  GetIntegrationResponse,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/integrations",
    input: { DomainName: 0, Uri: 0 },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
})) as any;

export type GetMatchesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Before calling this API, use CreateDomain or
 * UpdateDomain to
 * enable identity resolution: set `Matching` to true.
 *
 * GetMatches returns potentially matching profiles, based on the results of the latest run
 * of a machine learning process.
 *
 * The process of matching duplicate profiles. If `Matching` = `true`, Amazon Connect Customer Profiles starts a weekly
 * batch process called Identity Resolution Job. If you do not specify a date and time for Identity Resolution Job to run, by default it runs every
 * Saturday at 12AM UTC to detect duplicate profiles in your domains.
 *
 * After the Identity Resolution Job completes, use the
 * GetMatches
 * API to return and review the results. Or, if you have configured `ExportingConfig` in the `MatchingRequest`, you can download the results from
 * S3.
 *
 * Amazon Connect uses the following profile attributes to identify matches:
 *
 * - PhoneNumber
 *
 * - HomePhoneNumber
 *
 * - BusinessPhoneNumber
 *
 * - MobilePhoneNumber
 *
 * - EmailAddress
 *
 * - PersonalEmailAddress
 *
 * - BusinessEmailAddress
 *
 * - FullName
 *
 * For example, two or more profiles—with spelling mistakes such as **John Doe** and **Jhn Doe**, or different casing
 * email addresses such as **JOHN_DOE@ANYCOMPANY.COM** and
 * **johndoe@anycompany.com**, or different phone number
 * formats such as **555-010-0000** and **+1-555-010-0000**—can be detected as belonging to the same customer **John Doe** and merged into a unified profile.
 */
export const getMatches: API.OperationMethod<
  GetMatchesRequest,
  GetMatchesResponse,
  GetMatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/matches",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
    },
    output: { MatchGenerationDate: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMatches",
})) as any;

export type GetObjectTypeAttributeStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The GetObjectTypeAttributeValues API delivers statistical insights about attributes within a specific object type, but is exclusively available for domains with data store enabled. This API performs daily calculations to provide statistical information about your attribute values, helping you understand patterns and trends in your data. The statistical calculations are performed once per day, providing a consistent snapshot of your attribute data characteristics.
 *
 * You'll receive null values in two scenarios:
 *
 * During the first period after enabling data vault (unless a calculation cycle occurs, which happens once daily).
 *
 * For attributes that don't contain numeric values.
 */
export const getObjectTypeAttributeStatistics: API.OperationMethod<
  GetObjectTypeAttributeStatisticsRequest,
  GetObjectTypeAttributeStatisticsResponse,
  GetObjectTypeAttributeStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/object-types/{ObjectTypeName}/attributes/{AttributeName}/statistics",
    input: { DomainName: 0, ObjectTypeName: 0, AttributeName: 0 },
    output: { CalculatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectTypeAttributeStatistics",
})) as any;

export type GetProfileHistoryRecordError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a history record for a specific profile, for a specific domain.
 */
export const getProfileHistoryRecord: API.OperationMethod<
  GetProfileHistoryRecordRequest,
  GetProfileHistoryRecordResponse,
  GetProfileHistoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/profiles/{ProfileId}/history-records/{Id}",
    input: { DomainName: 0, ProfileId: 0, Id: 0 },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts, Content: D.secret },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileHistoryRecord",
})) as any;

export type GetProfileObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the object types for a specific domain.
 */
export const getProfileObjectType: API.OperationMethod<
  GetProfileObjectTypeRequest,
  GetProfileObjectTypeResponse,
  GetProfileObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/object-types/{ObjectTypeName}",
    input: { DomainName: 0, ObjectTypeName: 0 },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileObjectType",
})) as any;

export type GetProfileObjectTypeTemplateError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the template information for a specific object type.
 *
 * A template is a predefined ProfileObjectType, such as “Salesforce-Account” or
 * “Salesforce-Contact.” When a user sends a ProfileObject, using the PutProfileObject API,
 * with an ObjectTypeName that matches one of the TemplateIds, it uses the mappings from the
 * template.
 */
export const getProfileObjectTypeTemplate: API.OperationMethod<
  GetProfileObjectTypeTemplateRequest,
  GetProfileObjectTypeTemplateResponse,
  GetProfileObjectTypeTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /templates/{TemplateId}",
    input: { TemplateId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileObjectTypeTemplate",
})) as any;

export type GetProfileRecommendationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Fetches the recommendations for a profile in the input Customer Profiles domain. Fetches all the profile recommendations
 */
export const getProfileRecommendations: API.OperationMethod<
  GetProfileRecommendationsRequest,
  GetProfileRecommendationsResponse,
  GetProfileRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/{ProfileId}/recommendations",
    input: {
      DomainName: 0,
      ProfileId: 0,
      RecommenderName: 0,
      Context: 0,
      RecommenderFilters: D.list({ Name: 0, Values: 0 }),
      RecommenderPromotionalFilters: D.list({
        Name: 0,
        Values: 0,
        PromotionName: 0,
        PercentPromotedItems: 0,
      }),
      CandidateIds: 0,
      MaxResults: 0,
      MetadataConfig: { MetadataColumns: 0 },
      DiversityConfig: { Enabled: 0, Values: 0 },
    },
    output: {
      Recommendations: D.list({
        CatalogItem: {
          Id: D.secret,
          Name: D.secret,
          Code: D.secret,
          Type: D.secret,
          Category: D.secret,
          Description: D.secret,
          AdditionalInformation: D.secret,
          ImageLink: D.secret,
          Link: D.secret,
          CreatedAt: D.ts,
          UpdatedAt: D.ts,
          Price: D.secret,
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileRecommendations",
})) as any;

export type GetRecommenderError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a recommender.
 */
export const getRecommender: API.OperationMethod<
  GetRecommenderRequest,
  GetRecommenderResponse,
  GetRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/recommenders/{RecommenderName}",
    input: {
      DomainName: 0,
      RecommenderName: 0,
      TrainingMetricsCount: D.m({ query: "training-metrics-count" }),
    },
    output: {
      Description: D.secret,
      LastUpdatedAt: D.ts,
      CreatedAt: D.ts,
      LatestRecommenderUpdate: o_RecommenderUpdate,
      TrainingMetrics: D.list({ Time: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommender",
})) as any;

export type GetRecommenderFilterError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a specific recommender filter in a domain.
 */
export const getRecommenderFilter: API.OperationMethod<
  GetRecommenderFilterRequest,
  GetRecommenderFilterResponse,
  GetRecommenderFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/recommender-filters/{RecommenderFilterName}",
    input: { DomainName: 0, RecommenderFilterName: 0 },
    output: {
      RecommenderFilterExpression: D.secret,
      CreatedAt: D.ts,
      Description: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommenderFilter",
})) as any;

export type GetRecommenderSchemaError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a specific recommender schema in a domain.
 */
export const getRecommenderSchema: API.OperationMethod<
  GetRecommenderSchemaRequest,
  GetRecommenderSchemaResponse,
  GetRecommenderSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/recommender-schemas/{RecommenderSchemaName}",
    input: { DomainName: 0, RecommenderSchemaName: 0 },
    output: { CreatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommenderSchema",
})) as any;

export type GetSegmentDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a segment definition from the domain.
 */
export const getSegmentDefinition: API.OperationMethod<
  GetSegmentDefinitionRequest,
  GetSegmentDefinitionResponse,
  GetSegmentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/segment-definitions/{SegmentDefinitionName}",
    input: { DomainName: 0, SegmentDefinitionName: 0 },
    output: {
      Description: D.secret,
      SegmentGroups: {
        Groups: D.list({
          Dimensions: D.list({
            ProfileAttributes: { ProfileType: { Values: D.list(D.secret) } },
          }),
        }),
      },
      CreatedAt: D.ts,
      SegmentSqlQuery: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentDefinition",
})) as any;

export type GetSegmentEstimateError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the result of a segment estimate query.
 */
export const getSegmentEstimate: API.OperationMethod<
  GetSegmentEstimateRequest,
  GetSegmentEstimateResponse,
  GetSegmentEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/segment-estimates/{EstimateId}",
    input: { DomainName: 0, EstimateId: 0 },
    output: { StatusCode: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentEstimate",
})) as any;

export type GetSegmentMembershipError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Determines if the given profiles are within a segment.
 */
export const getSegmentMembership: API.OperationMethod<
  GetSegmentMembershipRequest,
  GetSegmentMembershipResponse,
  GetSegmentMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/segments/{SegmentDefinitionName}/membership",
    input: { DomainName: 0, SegmentDefinitionName: 0, ProfileIds: 0 },
    output: { Profiles: D.list({ Profile: o_Profile }), LastComputedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentMembership",
})) as any;

export type GetSegmentSnapshotError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieve the latest status of a segment snapshot.
 */
export const getSegmentSnapshot: API.OperationMethod<
  GetSegmentSnapshotRequest,
  GetSegmentSnapshotResponse,
  GetSegmentSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/segments/{SegmentDefinitionName}/snapshots/{SnapshotId}",
    input: { DomainName: 0, SegmentDefinitionName: 0, SnapshotId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentSnapshot",
})) as any;

export type GetSimilarProfilesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a set of profiles that belong to the same matching group using the
 * `matchId` or `profileId`. You can also specify the type of
 * matching that you want for finding similar profiles using either
 * `RULE_BASED_MATCHING` or `ML_BASED_MATCHING`.
 */
export const getSimilarProfiles: API.PaginatedOperationMethod<
  GetSimilarProfilesRequest,
  GetSimilarProfilesResponse,
  GetSimilarProfilesError,
  Credentials | HttpClient.HttpClient,
  Uuid
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/matches",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
      MatchType: 0,
      SearchKey: 0,
      SearchValue: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSimilarProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUploadJobError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API retrieves the details of a specific upload job.
 */
export const getUploadJob: API.OperationMethod<
  GetUploadJobRequest,
  GetUploadJobResponse,
  GetUploadJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/upload-jobs/{JobId}",
    input: { DomainName: 0, JobId: 0 },
    output: { CreatedAt: D.ts, CompletedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUploadJob",
})) as any;

export type GetUploadJobPathError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API retrieves the pre-signed URL and client token for uploading the file associated
 * with the upload job.
 */
export const getUploadJobPath: API.OperationMethod<
  GetUploadJobPathRequest,
  GetUploadJobPathResponse,
  GetUploadJobPathError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/upload-jobs/{JobId}/path",
    input: { DomainName: 0, JobId: 0 },
    output: { ValidUntil: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUploadJobPath",
})) as any;

export type GetWorkflowError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get details of specified workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/workflows/{WorkflowId}",
    input: { DomainName: 0, WorkflowId: 0 },
    output: { StartDate: D.ts, LastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
})) as any;

export type GetWorkflowStepsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get granular list of steps in workflow.
 */
export const getWorkflowSteps: API.OperationMethod<
  GetWorkflowStepsRequest,
  GetWorkflowStepsResponse,
  GetWorkflowStepsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/workflows/{WorkflowId}/steps",
    input: {
      DomainName: 0,
      WorkflowId: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      Items: D.list({
        AppflowIntegration: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowSteps",
})) as any;

export type ListAccountIntegrationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the integrations associated to a specific URI in the AWS account.
 */
export const listAccountIntegrations: API.OperationMethod<
  ListAccountIntegrationsRequest,
  ListAccountIntegrationsResponse,
  ListAccountIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /integrations",
    input: {
      Uri: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      IncludeHidden: D.m({ query: "include-hidden" }),
    },
    output: { Items: D.list(o_ListIntegrationItem) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountIntegrations",
})) as any;

export type ListCalculatedAttributeDefinitionsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists calculated attribute definitions for Customer Profiles
 */
export const listCalculatedAttributeDefinitions: API.OperationMethod<
  ListCalculatedAttributeDefinitionsRequest,
  ListCalculatedAttributeDefinitionsResponse,
  ListCalculatedAttributeDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/calculated-attributes",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      Items: D.list({
        Description: D.secret,
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCalculatedAttributeDefinitions",
})) as any;

export type ListCalculatedAttributesForProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieve a list of calculated attributes for a customer profile.
 */
export const listCalculatedAttributesForProfile: API.OperationMethod<
  ListCalculatedAttributesForProfileRequest,
  ListCalculatedAttributesForProfileResponse,
  ListCalculatedAttributesForProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/profile/{ProfileId}/calculated-attributes",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
      ProfileId: 0,
    },
    output: { Items: D.list({ LastObjectTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCalculatedAttributesForProfile",
})) as any;

export type ListDomainLayoutsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the existing layouts that can be used to view data for a specific domain. This API
 * can only be invoked from the Amazon Connect admin website.
 */
export const listDomainLayouts: API.PaginatedOperationMethod<
  ListDomainLayoutsRequest,
  ListDomainLayoutsResponse,
  ListDomainLayoutsError,
  Credentials | HttpClient.HttpClient,
  LayoutItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/layouts",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      Items: D.list({
        Description: D.secret,
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainLayouts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainObjectTypesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List all DomainObjectType(s) in a Customer Profiles domain.
 */
export const listDomainObjectTypes: API.PaginatedOperationMethod<
  ListDomainObjectTypesRequest,
  ListDomainObjectTypesResponse,
  ListDomainObjectTypesError,
  Credentials | HttpClient.HttpClient,
  DomainObjectTypesListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/domain-object-types",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      Items: D.list({
        Description: D.secret,
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainObjectTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all the domains for an AWS account that have been created.
 */
export const listDomains: API.OperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
})) as any;

export type ListEventStreamsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all the event streams in a specific domain.
 */
export const listEventStreams: API.PaginatedOperationMethod<
  ListEventStreamsRequest,
  ListEventStreamsResponse,
  ListEventStreamsError,
  Credentials | HttpClient.HttpClient,
  EventStreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/event-streams",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      Items: D.list({
        StoppedSince: D.ts,
        DestinationSummary: { UnhealthySince: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventTriggersError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List all Event Triggers under a domain.
 */
export const listEventTriggers: API.PaginatedOperationMethod<
  ListEventTriggersRequest,
  ListEventTriggersResponse,
  ListEventTriggersError,
  Credentials | HttpClient.HttpClient,
  EventTriggerSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/event-triggers",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventTriggers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentityResolutionJobsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the Identity Resolution Jobs in your domain. The response sorts the list by
 * `JobStartTime`.
 */
export const listIdentityResolutionJobs: API.OperationMethod<
  ListIdentityResolutionJobsRequest,
  ListIdentityResolutionJobsResponse,
  ListIdentityResolutionJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/identity-resolution-jobs",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      IdentityResolutionJobsList: D.list({
        JobStartTime: D.ts,
        JobEndTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityResolutionJobs",
})) as any;

export type ListIntegrationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the integrations in your domain.
 */
export const listIntegrations: API.OperationMethod<
  ListIntegrationsRequest,
  ListIntegrationsResponse,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/integrations",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      IncludeHidden: D.m({ query: "include-hidden" }),
    },
    output: { Items: D.list(o_ListIntegrationItem) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
})) as any;

export type ListObjectTypeAttributesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Fetch the possible attribute values given the attribute name.
 */
export const listObjectTypeAttributes: API.PaginatedOperationMethod<
  ListObjectTypeAttributesRequest,
  ListObjectTypeAttributesResponse,
  ListObjectTypeAttributesError,
  Credentials | HttpClient.HttpClient,
  ListObjectTypeAttributeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/object-types/{ObjectTypeName}/attributes",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
      ObjectTypeName: 0,
    },
    output: { Items: D.list({ LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectTypeAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectTypeAttributeValuesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The ListObjectTypeAttributeValues API provides access to the most recent distinct values for any specified attribute, making it valuable for real-time data validation and consistency checks within your object types. This API works across domain, supporting both custom and standard object types. The API accepts the object type name, attribute name, and domain name as input parameters and returns values up to the storage limit of approximately 350KB.
 */
export const listObjectTypeAttributeValues: API.OperationMethod<
  ListObjectTypeAttributeValuesRequest,
  ListObjectTypeAttributeValuesResponse,
  ListObjectTypeAttributeValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/object-types/{ObjectTypeName}/attributes/{AttributeName}/values",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
      ObjectTypeName: 0,
      AttributeName: 0,
    },
    output: { Items: D.list({ Value: D.secret, LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectTypeAttributeValues",
})) as any;

export type ListProfileAttributeValuesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Fetch the possible attribute values given the attribute name.
 */
export const listProfileAttributeValues: API.OperationMethod<
  ProfileAttributeValuesRequest,
  ProfileAttributeValuesResponse,
  ListProfileAttributeValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/profile-attributes/{AttributeName}/values",
    input: { DomainName: 0, AttributeName: 0 },
    output: { StatusCode: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileAttributeValues",
})) as any;

export type ListProfileHistoryRecordsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of history records for a specific profile, for a specific domain.
 */
export const listProfileHistoryRecords: API.OperationMethod<
  ListProfileHistoryRecordsRequest,
  ListProfileHistoryRecordsResponse,
  ListProfileHistoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/history-records",
    input: {
      DomainName: 0,
      ProfileId: 0,
      ObjectTypeName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      ActionType: 0,
      PerformedBy: 0,
    },
    output: {
      ProfileHistoryRecords: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileHistoryRecords",
})) as any;

export type ListProfileObjectsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of objects associated with a profile of a given ProfileObjectType.
 */
export const listProfileObjects: API.OperationMethod<
  ListProfileObjectsRequest,
  ListProfileObjectsResponse,
  ListProfileObjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/objects",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
      ObjectTypeName: 0,
      ProfileId: 0,
      ObjectFilter: { KeyName: 0, Values: 0 },
    },
    output: { Items: D.list({ Object: D.secret }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileObjects",
})) as any;

export type ListProfileObjectTypesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the templates available within the service.
 */
export const listProfileObjectTypes: API.OperationMethod<
  ListProfileObjectTypesRequest,
  ListProfileObjectTypesResponse,
  ListProfileObjectTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/object-types",
    input: {
      DomainName: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileObjectTypes",
})) as any;

export type ListProfileObjectTypeTemplatesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of the template information for object types.
 */
export const listProfileObjectTypeTemplates: API.OperationMethod<
  ListProfileObjectTypeTemplatesRequest,
  ListProfileObjectTypeTemplatesResponse,
  ListProfileObjectTypeTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /templates",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileObjectTypeTemplates",
})) as any;

export type ListRecommenderFiltersError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of recommender filters in the specified domain.
 */
export const listRecommenderFilters: API.PaginatedOperationMethod<
  ListRecommenderFiltersRequest,
  ListRecommenderFiltersResponse,
  ListRecommenderFiltersError,
  Credentials | HttpClient.HttpClient,
  RecommenderFilterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/recommender-filters",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      RecommenderFilters: D.list({
        RecommenderFilterExpression: D.secret,
        CreatedAt: D.ts,
        Description: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommenderFilters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecommenderFilters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecommenderRecipesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of available recommender recipes that can be used to create recommenders.
 */
export const listRecommenderRecipes: API.PaginatedOperationMethod<
  ListRecommenderRecipesRequest,
  ListRecommenderRecipesResponse,
  ListRecommenderRecipesError,
  Credentials | HttpClient.HttpClient,
  RecommenderRecipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /recommender-recipes",
    input: {
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommenderRecipes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecommenderRecipes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecommendersError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of recommenders in the specified domain.
 */
export const listRecommenders: API.PaginatedOperationMethod<
  ListRecommendersRequest,
  ListRecommendersResponse,
  ListRecommendersError,
  Credentials | HttpClient.HttpClient,
  RecommenderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/recommenders",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: {
      Recommenders: D.list({
        CreatedAt: D.ts,
        Description: D.secret,
        LastUpdatedAt: D.ts,
        LatestRecommenderUpdate: o_RecommenderUpdate,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommenders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recommenders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecommenderSchemasError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of recommender schemas in the specified domain.
 */
export const listRecommenderSchemas: API.PaginatedOperationMethod<
  ListRecommenderSchemasRequest,
  ListRecommenderSchemasResponse,
  ListRecommenderSchemasError,
  Credentials | HttpClient.HttpClient,
  RecommenderSchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/recommender-schemas",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { RecommenderSchemas: D.list({ CreatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommenderSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecommenderSchemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRuleBasedMatchesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a set of `MatchIds` that belong to the given domain.
 */
export const listRuleBasedMatches: API.PaginatedOperationMethod<
  ListRuleBasedMatchesRequest,
  ListRuleBasedMatchesResponse,
  ListRuleBasedMatchesError,
  Credentials | HttpClient.HttpClient,
  String1To255
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/profiles/ruleBasedMatches",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleBasedMatches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MatchIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSegmentDefinitionsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all segment definitions under a domain.
 */
export const listSegmentDefinitions: API.PaginatedOperationMethod<
  ListSegmentDefinitionsRequest,
  ListSegmentDefinitionsResponse,
  ListSegmentDefinitionsError,
  Credentials | HttpClient.HttpClient,
  SegmentDefinitionItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/segment-definitions",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Items: D.list({ Description: D.secret, CreatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSegmentDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Displays the tags associated with an Amazon Connect Customer Profiles resource. In Connect
 * Customer Profiles, domains, profile object types, and integrations can be tagged.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListUploadJobsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API retrieves a list of upload jobs for the specified domain.
 */
export const listUploadJobs: API.PaginatedOperationMethod<
  ListUploadJobsRequest,
  ListUploadJobsResponse,
  ListUploadJobsError,
  Credentials | HttpClient.HttpClient,
  UploadJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /domains/{DomainName}/upload-jobs",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "max-results" }),
      NextToken: D.m({ query: "next-token" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, CompletedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUploadJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Query to list all workflows.
 */
export const listWorkflows: API.OperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/workflows",
    input: {
      DomainName: 0,
      WorkflowType: 0,
      Status: 0,
      QueryStartDate: 0,
      QueryEndDate: 0,
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
})) as any;

export type MergeProfilesError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Runs an AWS Lambda job that does the following:
 *
 * - All the profileKeys in the `ProfileToBeMerged` will be moved to the
 * main profile.
 *
 * - All the objects in the `ProfileToBeMerged` will be moved to the main
 * profile.
 *
 * - All the `ProfileToBeMerged` will be deleted at the end.
 *
 * - All the profileKeys in the `ProfileIdsToBeMerged` will be moved to the
 * main profile.
 *
 * - Standard fields are merged as follows:
 *
 * - Fields are always "union"-ed if there are no conflicts in standard fields or
 * attributeKeys.
 *
 * - When there are conflicting fields:
 *
 * - If no `SourceProfileIds` entry is specified, the main
 * Profile value is always taken.
 *
 * - If a `SourceProfileIds` entry is specified, the specified
 * profileId is always taken, even if it is a NULL value.
 *
 * You can use MergeProfiles together with GetMatches, which
 * returns potentially matching profiles, or use it with the results of another matching
 * system. After profiles have been merged, they cannot be separated (unmerged).
 */
export const mergeProfiles: API.OperationMethod<
  MergeProfilesRequest,
  MergeProfilesResponse,
  MergeProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/objects/merge",
    input: {
      DomainName: 0,
      MainProfileId: 0,
      ProfileIdsToBeMerged: 0,
      FieldSourceProfileIds: {
        AccountNumber: 0,
        AdditionalInformation: 0,
        PartyType: 0,
        BusinessName: 0,
        FirstName: 0,
        MiddleName: 0,
        LastName: 0,
        BirthDate: 0,
        Gender: 0,
        PhoneNumber: 0,
        MobilePhoneNumber: 0,
        HomePhoneNumber: 0,
        BusinessPhoneNumber: 0,
        EmailAddress: 0,
        PersonalEmailAddress: 0,
        BusinessEmailAddress: 0,
        Address: 0,
        ShippingAddress: 0,
        MailingAddress: 0,
        BillingAddress: 0,
        Attributes: 0,
        ProfileType: 0,
        EngagementPreferences: 0,
      },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeProfiles",
})) as any;

export type PutDomainObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Create/Update a DomainObjectType in a Customer Profiles domain. To create a new DomainObjectType, Data Store needs to be enabled on the Domain.
 */
export const putDomainObjectType: API.OperationMethod<
  PutDomainObjectTypeRequest,
  PutDomainObjectTypeResponse,
  PutDomainObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/domain-object-types/{ObjectTypeName}",
    input: {
      DomainName: 0,
      ObjectTypeName: 0,
      Description: 0,
      EncryptionKey: 0,
      Fields: D.map({ Source: 0, Target: 0, ContentType: 0, FeatureType: 0 }),
      Tags: 0,
    },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDomainObjectType",
})) as any;

export type PutIntegrationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds an integration between the service and a third-party service, which includes
 * Amazon AppFlow and Amazon Connect.
 *
 * An integration can belong to only one domain.
 *
 * To add or remove tags on an existing Integration, see TagResource
 * /
 * UntagResource.
 */
export const putIntegration: API.OperationMethod<
  PutIntegrationRequest,
  PutIntegrationResponse,
  PutIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/integrations",
    input: {
      DomainName: 0,
      Uri: 0,
      ObjectTypeName: 0,
      ObjectTypeNames: 0,
      Tags: 0,
      FlowDefinition: i_FlowDefinition,
      RoleArn: 0,
      EventTriggerNames: 0,
      Scope: 0,
    },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegration",
})) as any;

export type PutProfileObjectError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds additional objects to customer profiles of a given ObjectType.
 *
 * When adding a specific profile object, like a Contact Record, an inferred profile can
 * get created if it is not mapped to an existing profile. The resulting profile will only
 * have a phone number populated in the standard ProfileObject. Any additional Contact Records
 * with the same phone number will be mapped to the same inferred profile.
 *
 * When a ProfileObject is created and if a ProfileObjectType already exists for the
 * ProfileObject, it will provide data to a standard profile depending on the
 * ProfileObjectType definition.
 *
 * PutProfileObject needs an ObjectType, which can be created using
 * PutProfileObjectType.
 */
export const putProfileObject: API.OperationMethod<
  PutProfileObjectRequest,
  PutProfileObjectResponse,
  PutProfileObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/profiles/objects",
    input: { ObjectTypeName: 0, Object: 0, DomainName: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProfileObject",
})) as any;

export type PutProfileObjectTypeError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Defines a ProfileObjectType.
 *
 * To add or remove tags on an existing ObjectType, see
 * TagResource/UntagResource.
 */
export const putProfileObjectType: API.OperationMethod<
  PutProfileObjectTypeRequest,
  PutProfileObjectTypeResponse,
  PutProfileObjectTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/object-types/{ObjectTypeName}",
    input: {
      DomainName: 0,
      ObjectTypeName: 0,
      Description: 0,
      TemplateId: 0,
      ExpirationDays: 0,
      EncryptionKey: 0,
      AllowProfileCreation: 0,
      SourceLastUpdatedTimestampFormat: 0,
      MaxProfileObjectCount: 0,
      SourcePriority: 0,
      Fields: D.map(i_ObjectTypeField),
      Keys: D.map(D.list({ StandardIdentifiers: 0, FieldNames: 0 })),
      Tags: 0,
    },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProfileObjectType",
})) as any;

export type SearchProfilesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for profiles within a specific domain using one or more predefined search keys
 * (e.g., _fullName, _phone, _email, _account, etc.) and/or custom-defined search keys. A
 * search key is a data type pair that consists of a `KeyName` and
 * `Values` list.
 *
 * This operation supports searching for profiles with a minimum of 1 key-value(s) pair and
 * up to 5 key-value(s) pairs using either `AND` or `OR` logic.
 */
export const searchProfiles: API.OperationMethod<
  SearchProfilesRequest,
  SearchProfilesResponse,
  SearchProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains/{DomainName}/profiles/search",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
      DomainName: 0,
      KeyName: 0,
      Values: 0,
      AdditionalSearchKeys: D.list({ KeyName: 0, Values: 0 }),
      LogicalOperator: 0,
    },
    output: { Items: D.list(o_Profile) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProfiles",
})) as any;

export type StartRecommenderError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a recommender that was previously stopped. Starting a recommender resumes its ability to generate recommendations.
 */
export const startRecommender: API.OperationMethod<
  StartRecommenderRequest,
  StartRecommenderResponse,
  StartRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/recommenders/{RecommenderName}/start",
    input: { DomainName: 0, RecommenderName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommender",
})) as any;

export type StartUploadJobError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API starts the processing of an upload job to ingest profile data.
 */
export const startUploadJob: API.OperationMethod<
  StartUploadJobRequest,
  StartUploadJobResponse,
  StartUploadJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/upload-jobs/{JobId}",
    input: { DomainName: 0, JobId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUploadJob",
})) as any;

export type StopRecommenderError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Stops a recommender, suspending its ability to generate recommendations. The recommender can be restarted later using StartRecommender.
 */
export const stopRecommender: API.OperationMethod<
  StopRecommenderRequest,
  StopRecommenderResponse,
  StopRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/recommenders/{RecommenderName}/stop",
    input: { DomainName: 0, RecommenderName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRecommender",
})) as any;

export type StopUploadJobError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This API stops the processing of an upload job.
 */
export const stopUploadJob: API.OperationMethod<
  StopUploadJobRequest,
  StopUploadJobResponse,
  StopUploadJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/upload-jobs/{JobId}/stop",
    input: { DomainName: 0, JobId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopUploadJob",
})) as any;

export type TagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Amazon Connect Customer Profiles
 * resource. Tags can help you organize and categorize your resources. You can also use them
 * to scope user permissions by granting a user permission to access or change only resources
 * with certain tag values. In Connect Customer Profiles, domains, profile object types, and
 * integrations can be tagged.
 *
 * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of
 * characters.
 *
 * You can use the TagResource action with a resource that already has tags. If you specify
 * a new tag key, this tag is appended to the list of tags associated with the resource. If
 * you specify a tag key that is already associated with the resource, the new tag value that
 * you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Amazon Connect Customer Profiles resource. In Connect
 * Customer Profiles, domains, profile object types, and integrations can be tagged.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCalculatedAttributeDefinitionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing calculated attribute definition. When updating the Conditions, note
 * that increasing the date range of a calculated attribute will not trigger inclusion of
 * historical data greater than the current date range.
 */
export const updateCalculatedAttributeDefinition: API.OperationMethod<
  UpdateCalculatedAttributeDefinitionRequest,
  UpdateCalculatedAttributeDefinitionResponse,
  UpdateCalculatedAttributeDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
    input: {
      DomainName: 0,
      CalculatedAttributeName: 0,
      DisplayName: 0,
      Description: 0,
      Conditions: i_Conditions,
    },
    output: {
      Description: D.secret,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      Statistic: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCalculatedAttributeDefinition",
})) as any;

export type UpdateDomainError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of a domain, including creating or selecting a dead letter queue
 * or an encryption key.
 *
 * After a domain is created, the name can’t be changed.
 *
 * Use this API or CreateDomain to
 * enable identity
 * resolution: set `Matching` to true.
 *
 * To prevent cross-service impersonation when you call this API, see Cross-service confused deputy prevention for sample policies that you should
 * apply.
 *
 * To add or remove tags on an existing Domain, see TagResource/UntagResource.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainRequest,
  UpdateDomainResponse,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}",
    input: {
      DomainName: 0,
      DefaultExpirationDays: 0,
      DefaultEncryptionKey: 0,
      DeadLetterQueueUrl: 0,
      Matching: i_MatchingRequest,
      RuleBasedMatching: i_RuleBasedMatchingRequest,
      DataStore: i_DataStoreRequest,
      Tags: 0,
    },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomain",
})) as any;

export type UpdateDomainLayoutError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the layout used to view data for a specific domain. This API can only be invoked
 * from the Amazon Connect admin website.
 */
export const updateDomainLayout: API.OperationMethod<
  UpdateDomainLayoutRequest,
  UpdateDomainLayoutResponse,
  UpdateDomainLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/layouts/{LayoutDefinitionName}",
    input: {
      DomainName: 0,
      LayoutDefinitionName: 0,
      Description: 0,
      DisplayName: 0,
      IsDefault: 0,
      LayoutType: 0,
      Layout: 0,
    },
    output: {
      Description: D.secret,
      Layout: D.secret,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainLayout",
})) as any;

export type UpdateEventTriggerError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Update the properties of an Event Trigger.
 */
export const updateEventTrigger: API.OperationMethod<
  UpdateEventTriggerRequest,
  UpdateEventTriggerResponse,
  UpdateEventTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/event-triggers/{EventTriggerName}",
    input: {
      DomainName: 0,
      EventTriggerName: 0,
      ObjectTypeName: 0,
      Description: 0,
      EventTriggerConditions: D.list(i_EventTriggerCondition),
      SegmentFilter: 0,
      EventTriggerLimits: i_EventTriggerLimits,
    },
    output: { Description: D.secret, CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventTrigger",
})) as any;

export type UpdateProfileError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of a profile. The ProfileId is required for updating a customer
 * profile.
 *
 * When calling the UpdateProfile API, specifying an empty string value means that any
 * existing value will be removed. Not specifying a string value means that any value already
 * there will be kept.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /domains/{DomainName}/profiles",
    input: {
      DomainName: 0,
      ProfileId: 0,
      AdditionalInformation: 0,
      AccountNumber: 0,
      PartyType: 0,
      BusinessName: 0,
      FirstName: 0,
      MiddleName: 0,
      LastName: 0,
      BirthDate: 0,
      Gender: 0,
      PhoneNumber: 0,
      MobilePhoneNumber: 0,
      HomePhoneNumber: 0,
      BusinessPhoneNumber: 0,
      EmailAddress: 0,
      PersonalEmailAddress: 0,
      BusinessEmailAddress: 0,
      Address: i_UpdateAddress,
      ShippingAddress: i_UpdateAddress,
      MailingAddress: i_UpdateAddress,
      BillingAddress: i_UpdateAddress,
      Attributes: 0,
      PartyTypeString: 0,
      GenderString: 0,
      ProfileType: 0,
      EngagementPreferences: i_EngagementPreferences,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfile",
})) as any;

export type UpdateRecommenderError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of an existing recommender, allowing you to modify its configuration and description.
 */
export const updateRecommender: API.OperationMethod<
  UpdateRecommenderRequest,
  UpdateRecommenderResponse,
  UpdateRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /domains/{DomainName}/recommenders/{RecommenderName}",
    input: {
      DomainName: 0,
      RecommenderName: 0,
      Description: 0,
      RecommenderConfig: i_RecommenderConfig,
      RecommenderVersionName: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommender",
})) as any;

const i_Address: D.LazyStruct = () => ({
  Address1: 0,
  Address2: 0,
  Address3: 0,
  Address4: 0,
  City: 0,
  County: 0,
  State: 0,
  Province: 0,
  Country: 0,
  PostalCode: 0,
});
const i_ConditionOverrides: D.LazyStruct = () => ({
  Range: { Start: 0, End: 0, Unit: 0 },
});
const i_Conditions: D.LazyStruct = () => ({
  Range: {
    Value: 0,
    Unit: 0,
    ValueRange: { Start: 0, End: 0 },
    TimestampSource: 0,
    TimestampFormat: 0,
  },
  ObjectCount: 0,
  Threshold: { Value: 0, Operator: 0 },
});
const i_ConflictResolution: D.LazyStruct = () => ({
  ConflictResolvingModel: 0,
  SourceName: 0,
});
const i_Consolidation: D.LazyStruct = () => ({ MatchingAttributesList: 0 });
const i_DataStoreRequest: D.LazyStruct = () => ({ Enabled: 0 });
const i_EngagementPreferences: D.LazyStruct = () => ({
  Phone: D.list(i_ContactPreference),
  Email: D.list(i_ContactPreference),
});
const i_EventTriggerCondition: D.LazyStruct = () => ({
  EventTriggerDimensions: D.list({
    ObjectAttributes: D.list({
      Source: 0,
      FieldName: 0,
      ComparisonOperator: 0,
      Values: 0,
    }),
  }),
  LogicalOperator: 0,
});
const i_EventTriggerLimits: D.LazyStruct = () => ({
  EventExpiration: 0,
  Periods: D.list({
    Unit: 0,
    Value: 0,
    MaxInvocationsPerProfile: 0,
    Unlimited: 0,
  }),
});
const i_FlowDefinition: D.LazyStruct = () => ({
  Description: 0,
  FlowName: 0,
  KmsArn: 0,
  SourceFlowConfig: {
    ConnectorProfileName: 0,
    ConnectorType: 0,
    IncrementalPullConfig: { DatetimeTypeFieldName: 0 },
    SourceConnectorProperties: {
      Marketo: { Object: 0 },
      S3: { BucketName: 0, BucketPrefix: 0 },
      Salesforce: {
        Object: 0,
        EnableDynamicFieldUpdate: 0,
        IncludeDeletedRecords: 0,
      },
      ServiceNow: { Object: 0 },
      Zendesk: { Object: 0 },
    },
  },
  Tasks: D.list({
    ConnectorOperator: {
      Marketo: 0,
      S3: 0,
      Salesforce: 0,
      ServiceNow: 0,
      Zendesk: 0,
    },
    DestinationField: 0,
    SourceFields: 0,
    TaskProperties: 0,
    TaskType: 0,
  }),
  TriggerConfig: {
    TriggerType: 0,
    TriggerProperties: {
      Scheduled: {
        ScheduleExpression: 0,
        DataPullMode: 0,
        ScheduleStartTime: 0,
        ScheduleEndTime: 0,
        Timezone: 0,
        ScheduleOffset: 0,
        FirstExecutionFrom: 0,
      },
    },
  },
});
const i_Group: D.LazyStruct = () => ({
  Dimensions: D.list({
    ProfileAttributes: {
      AccountNumber: i_ProfileDimension,
      AdditionalInformation: { DimensionType: 0, Values: 0 },
      FirstName: i_ProfileDimension,
      LastName: i_ProfileDimension,
      MiddleName: i_ProfileDimension,
      GenderString: i_ProfileDimension,
      PartyTypeString: i_ProfileDimension,
      BirthDate: { DimensionType: 0, Values: 0 },
      PhoneNumber: i_ProfileDimension,
      BusinessName: i_ProfileDimension,
      BusinessPhoneNumber: i_ProfileDimension,
      HomePhoneNumber: i_ProfileDimension,
      MobilePhoneNumber: i_ProfileDimension,
      EmailAddress: i_ProfileDimension,
      PersonalEmailAddress: i_ProfileDimension,
      BusinessEmailAddress: i_ProfileDimension,
      Address: i_AddressDimension,
      ShippingAddress: i_AddressDimension,
      MailingAddress: i_AddressDimension,
      BillingAddress: i_AddressDimension,
      Attributes: D.map({ DimensionType: 0, Values: 0 }),
      ProfileType: { DimensionType: 0, Values: 0 },
    },
    CalculatedAttributes: D.map({
      DimensionType: 0,
      Values: 0,
      ConditionOverrides: i_ConditionOverrides,
    }),
  }),
  SourceSegments: D.list({ SegmentDefinitionName: 0 }),
  SourceType: 0,
  Type: 0,
});
const i_MatchingRequest: D.LazyStruct = () => ({
  Enabled: 0,
  JobSchedule: { DayOfTheWeek: 0, Time: 0 },
  AutoMerging: {
    Enabled: 0,
    Consolidation: i_Consolidation,
    ConflictResolution: i_ConflictResolution,
    MinAllowedConfidenceScoreForMerging: 0,
  },
  ExportingConfig: i_ExportingConfig,
});
const i_ObjectTypeField: D.LazyStruct = () => ({
  Source: 0,
  Target: 0,
  ContentType: 0,
});
const i_RecommenderConfig: D.LazyStruct = () => ({
  EventsConfig: {
    EventParametersList: D.list({
      EventType: 0,
      EventValueThreshold: 0,
      EventWeight: 0,
    }),
  },
  TrainingFrequency: 0,
  InferenceConfig: { MinProvisionedTPS: 0 },
  IncludedColumns: 0,
  ExcludedColumns: 0,
  DiversityConfig: {
    DiversityColumns: D.list({ Name: 0, CapType: 0, Target: 0 }),
  },
});
const i_RuleBasedMatchingRequest: D.LazyStruct = () => ({
  Enabled: 0,
  MatchingRules: D.list({ Rule: 0 }),
  MaxAllowedRuleLevelForMerging: 0,
  MaxAllowedRuleLevelForMatching: 0,
  AttributeTypesSelector: {
    AttributeMatchingModel: 0,
    Address: 0,
    PhoneNumber: 0,
    EmailAddress: 0,
  },
  ConflictResolution: i_ConflictResolution,
  ExportingConfig: i_ExportingConfig,
});
const i_UpdateAddress: D.LazyStruct = () => ({
  Address1: 0,
  Address2: 0,
  Address3: 0,
  Address4: 0,
  City: 0,
  County: 0,
  State: 0,
  Province: 0,
  Country: 0,
  PostalCode: 0,
});
const o_ListIntegrationItem: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
});
const o_Profile: D.LazyStruct = () => ({
  AccountNumber: D.secret,
  AdditionalInformation: D.secret,
  PartyType: D.secret,
  BusinessName: D.secret,
  FirstName: D.secret,
  MiddleName: D.secret,
  LastName: D.secret,
  BirthDate: D.secret,
  Gender: D.secret,
  PhoneNumber: D.secret,
  MobilePhoneNumber: D.secret,
  HomePhoneNumber: D.secret,
  BusinessPhoneNumber: D.secret,
  EmailAddress: D.secret,
  PersonalEmailAddress: D.secret,
  BusinessEmailAddress: D.secret,
  PartyTypeString: D.secret,
  GenderString: D.secret,
  ProfileType: D.secret,
});
const o_RecommenderUpdate: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
});
const i_AddressDimension: D.LazyStruct = () => ({
  City: i_ProfileDimension,
  Country: i_ProfileDimension,
  County: i_ProfileDimension,
  PostalCode: i_ProfileDimension,
  Province: i_ProfileDimension,
  State: i_ProfileDimension,
});
const i_ContactPreference: D.LazyStruct = () => ({
  KeyName: 0,
  KeyValue: 0,
  ProfileId: 0,
  ContactType: 0,
});
const i_ExportingConfig: D.LazyStruct = () => ({
  S3Exporting: { S3BucketName: 0, S3KeyName: 0 },
});
const i_ProfileDimension: D.LazyStruct = () => ({
  DimensionType: 0,
  Values: 0,
});
