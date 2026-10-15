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
  sdkId: "Customer Profiles",
  serviceShapeName: "CustomerProfiles_20200815",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "profile" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-08-15");
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
              `https://profile-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://profile-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://profile.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://profile.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://profile.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type DestinationArnString = string;
export type DestinationRoleArn = string;
export interface AssociateStreamForSegmentsRequest {
  DomainName: string;
  DestinationArn: string;
  DestinationRoleArn: string;
}
export interface AssociateStreamForSegmentsResponse {}
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
export type BatchPutProfileObjectRequestItemList = BatchPutProfileObjectRequestItem[];
export interface BatchPutProfileObjectRequest {
  DomainName: string;
  ObjectTypeName: string;
  Items: BatchPutProfileObjectRequestItem[];
}
export interface BatchPutProfileObjectResponseItem {
  Id: string;
  ProfileObjectUniqueKey: string;
}
export type BatchPutProfileObjectResponseList = BatchPutProfileObjectResponseItem[];
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
export type Operator = "EQUAL_TO" | "GREATER_THAN" | "LESS_THAN" | "NOT_EQUAL_TO" | (string & {});
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
export type AttributeMap = { [key: string]: FilterAttributeDimension | undefined };
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
  | "RECENT_OCCURRENCES"
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
export type ReadinessStatus = "PREPARING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
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
export type AttributeMatchingModel = "ONE_TO_ONE" | "MANY_TO_MANY" | (string & {});
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
export type RuleBasedMatchingStatus = "PENDING" | "IN_PROGRESS" | "ACTIVE" | (string & {});
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
export type EventTriggerLogicalOperator = "ANY" | "ALL" | "NONE" | (string & {});
export interface EventTriggerCondition {
  EventTriggerDimensions: EventTriggerDimension[];
  LogicalOperator: EventTriggerLogicalOperator;
}
export type EventTriggerConditions = EventTriggerCondition[];
export type OptionalLong = number;
export type PeriodUnit = "MINUTES" | "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | (string & {});
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
export type RecommenderSchemaFields = { [key: string]: RecommenderSchemaField[] | undefined };
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
  | "LIST_CONTAINS"
  | "LIST_CONTAINS_ALL"
  | (string & {});
export interface AttributeDimension {
  DimensionType: AttributeDimensionType;
  Values: string[];
}
export type CustomAttributes = { [key: string]: AttributeDimension | undefined };
export type ProfileTypeDimensionType = "INCLUSIVE" | "EXCLUSIVE" | (string & {});
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
      CalculatedAttributes: { [key: string]: CalculatedAttributeDimension | undefined };
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
export interface DeleteSegmentSubscriptionRequest {
  DomainName: string;
  SegmentDefinitionName: string;
}
export interface DeleteSegmentSubscriptionResponse {
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
export interface DisassociateStreamForSegmentsRequest {
  DomainName: string;
}
export interface DisassociateStreamForSegmentsResponse {
  Message?: string;
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
export type DomainObjectTypeFields = { [key: string]: DomainObjectTypeField | undefined };
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
export type EventStreamDestinationStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
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
export type RecommenderFilterAttributeValue = string | redacted.Redacted<string>;
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
export type SegmentSnapshotStatus = "COMPLETED" | "IN_PROGRESS" | "FAILED" | (string & {});
export interface GetSegmentSnapshotResponse {
  SnapshotId: string;
  Status: SegmentSnapshotStatus;
  StatusMessage?: string;
  DataFormat: DataFormat;
  EncryptionKey?: string;
  RoleArn?: string;
  DestinationUri?: string;
}
export interface GetSegmentSubscriptionRequest {
  DomainName: string;
  SegmentDefinitionName: string;
}
export type SegmentSubscriptionStatus =
  | "STARTING"
  | "RUNNING"
  | "STOPPED"
  | "FAILED"
  | (string & {});
export type IntervalValue = number;
export type ScheduleConfigurationUnit = "HOURLY" | (string & {});
export interface ScheduleConfiguration {
  Interval: number;
  Unit?: ScheduleConfigurationUnit;
}
export interface ScheduledExecutions {
  NextExecutedAt?: Date;
  LastExecutedAt?: Date;
}
export interface GetSegmentSubscriptionResponse {
  Status?: SegmentSubscriptionStatus;
  Message?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  ScheduledExecutions?: ScheduledExecutions;
  StartedAt?: Date;
  LastUpdatedAt?: Date;
}
export type MatchType = "RULE_BASED_MATCHING" | "ML_BASED_MATCHING" | (string & {});
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
export interface GetStreamForSegmentsRequest {
  DomainName: string;
}
export type EventSubscriptionSegmentStatus =
  | "STARTING"
  | "RUNNING"
  | "STOPPED"
  | "FAILED"
  | (string & {});
export interface AssociatedSegment {
  SegmentName?: string;
  Status?: EventSubscriptionSegmentStatus;
  Message?: string;
}
export type AssociatedSegmentsList = AssociatedSegment[];
export type EventSubscriptionState = "RUNNING" | "UNHEALTHY" | "STOPPED" | (string & {});
export interface GetStreamForSegmentsResponse {
  AssociatedAt?: Date;
  AssociatedSegments?: AssociatedSegment[];
  DomainName?: string;
  DestinationArn?: string;
  DestinationRoleArn?: string;
  State?: EventSubscriptionState;
  DisassociatedAt?: Date;
  FailureReason?: string;
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
export type StatusReason = "VALIDATION_FAILURE" | "INTERNAL_FAILURE" | (string & {});
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
export type CalculatedAttributeDefinitionsList = ListCalculatedAttributeDefinitionItem[];
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
export type CalculatedAttributesForProfileList = ListCalculatedAttributeForProfileItem[];
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
export type ListObjectTypeAttributeValuesList = ListObjectTypeAttributeValuesItem[];
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
export interface ListSegmentSubscriptionEventsRequest {
  DomainName: string;
  SegmentDefinitionName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SubscriptionEventType = "LIVE" | "SCHEDULE" | (string & {});
export type SubscriptionEvent = "JOINED" | "LEFT" | (string & {});
export interface SubscriptionEventItem {
  ProfileId?: string;
  UpdatedAt?: Date;
  EventType?: SubscriptionEventType;
  Event?: SubscriptionEvent;
}
export type SubscriptionEventsList = SubscriptionEventItem[];
export interface ListSegmentSubscriptionEventsResponse {
  Events?: SubscriptionEventItem[];
  NextToken?: string;
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
export interface PutSegmentSubscriptionRequest {
  DomainName: string;
  SegmentDefinitionName: string;
  ScheduleConfiguration?: ScheduleConfiguration;
}
export interface PutSegmentSubscriptionResponse {
  Status?: SegmentSubscriptionStatus;
  ScheduleConfiguration?: ScheduleConfiguration;
  StartedAt?: Date;
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
export type KeyValuesList = string[];
export interface Recommender {
  Name: string;
  Filters?: RecommenderFilter[];
  PromotionalFilters?: RecommenderPromotionalFilter[];
}
export interface RecommendationMetadata {
  Columns?: string[];
}
export interface SearchRecommendationsRequest {
  DomainName: string;
  KeyName: string;
  KeyValues: string[];
  Recommender: Recommender;
  CandidateIds?: string[];
  Context?: { [key: string]: string | undefined };
  Diversity?: RecommendationDiversityConfig;
  Metadata?: RecommendationMetadata;
  MaxRecommendations?: number;
}
export interface SearchRecommendationsResponse {
  ProfileId?: string;
  Recommendations?: Recommendation[];
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
  input: __S(1312, __c82, 0) as any as S.Schema<AddProfileKeyRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<AddProfileKeyResponse>,
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
}));

export type AssociateStreamForSegmentsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an Amazon Kinesis data stream to receive segment membership events for a given
 * domain. This is a domain-level configuration that applies to all segment
 * subscriptions within the domain. A domain can have only one associated stream at a time.
 */
export const associateStreamForSegments: API.OperationMethod<
  AssociateStreamForSegmentsRequest,
  AssociateStreamForSegmentsResponse,
  AssociateStreamForSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<AssociateStreamForSegmentsRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<AssociateStreamForSegmentsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateStreamForSegments",
}));

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
  input: __S(1808, __c113, 0) as any as S.Schema<BatchGetCalculatedAttributeForProfileRequest>,
  output: __S(1813, __c113, 5) as any as S.Schema<BatchGetCalculatedAttributeForProfileResponse>,
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
}));

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
  input: __S(2016, __c126, 0) as any as S.Schema<BatchGetProfileRequest>,
  output: __S(2019, __c126, 3) as any as S.Schema<BatchGetProfileResponse>,
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
}));

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
  input: __S(2274, __c142, 2) as any as S.Schema<BatchPutProfileObjectRequest>,
  output: __S(2279, __c142, 7) as any as S.Schema<BatchPutProfileObjectResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateCalculatedAttributeDefinitionRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateCalculatedAttributeDefinitionResponse>,
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
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<CreateDomainRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<CreateDomainResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<CreateDomainLayoutRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<CreateDomainLayoutResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<CreateEventStreamRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<CreateEventStreamResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<CreateEventTriggerRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<CreateEventTriggerResponse>,
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
}));

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
  input: __S(548, __c34, 4) as any as S.Schema<CreateIntegrationWorkflowRequest>,
  output: __S(549, __c34, 5) as any as S.Schema<CreateIntegrationWorkflowResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<CreateProfileRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<CreateProfileResponse>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<CreateRecommenderRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<CreateRecommenderResponse>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<CreateRecommenderFilterRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<CreateRecommenderFilterResponse>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<CreateRecommenderSchemaRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<CreateRecommenderSchemaResponse>,
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
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<CreateSegmentDefinitionRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<CreateSegmentDefinitionResponse>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<CreateSegmentEstimateRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<CreateSegmentEstimateResponse>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<CreateSegmentSnapshotRequest>,
  output: __S(769, __c48, 1) as any as S.Schema<CreateSegmentSnapshotResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<CreateUploadJobRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<CreateUploadJobResponse>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<DeleteCalculatedAttributeDefinitionRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<DeleteCalculatedAttributeDefinitionResponse>,
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
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<DeleteDomainRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<DeleteDomainResponse>,
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
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<DeleteDomainLayoutRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<DeleteDomainLayoutResponse>,
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
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<DeleteDomainObjectTypeRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<DeleteDomainObjectTypeResponse>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<DeleteEventStreamRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<DeleteEventStreamResponse>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<DeleteEventTriggerRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<DeleteEventTriggerResponse>,
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
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<DeleteIntegrationRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<DeleteIntegrationResponse>,
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
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<DeleteProfileRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteProfileResponse>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<DeleteProfileKeyRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteProfileKeyResponse>,
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
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<DeleteProfileObjectRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteProfileObjectResponse>,
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
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<DeleteProfileObjectTypeRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<DeleteProfileObjectTypeResponse>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<DeleteRecommenderRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<DeleteRecommenderResponse>,
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
}));

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
  input: __S(1040, __c65, 0) as any as S.Schema<DeleteRecommenderFilterRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<DeleteRecommenderFilterResponse>,
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
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<DeleteRecommenderSchemaRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<DeleteRecommenderSchemaResponse>,
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
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<DeleteSegmentDefinitionRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteSegmentDefinitionResponse>,
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
}));

export type DeleteSegmentSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a segment subscription for membership events. All active event notifications for
 * this segment are stopped.
 */
export const deleteSegmentSubscription: API.OperationMethod<
  DeleteSegmentSubscriptionRequest,
  DeleteSegmentSubscriptionResponse,
  DeleteSegmentSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<DeleteSegmentSubscriptionRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteSegmentSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSegmentSubscription",
}));

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
  input: __S(1104, __c69, 0) as any as S.Schema<DeleteWorkflowRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<DeleteWorkflowResponse>,
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
}));

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
  input: __S(1121, __c70, 1) as any as S.Schema<DetectProfileObjectTypeRequest>,
  output: __S(1124, __c70, 4) as any as S.Schema<DetectProfileObjectTypeResponse>,
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
}));

export type DisassociateStreamForSegmentsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates the Amazon Kinesis data stream configured for segment membership events. All
 * active segment subscriptions delivering events to this stream are eventually stopped.
 */
export const disassociateStreamForSegments: API.OperationMethod<
  DisassociateStreamForSegmentsRequest,
  DisassociateStreamForSegmentsResponse,
  DisassociateStreamForSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<DisassociateStreamForSegmentsRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DisassociateStreamForSegmentsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateStreamForSegments",
}));

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
  input: __S(1168, __c73, 0) as any as S.Schema<GetAutoMergingPreviewRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<GetAutoMergingPreviewResponse>,
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
}));

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
  input: __S(1184, __c74, 0) as any as S.Schema<GetCalculatedAttributeDefinitionRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<GetCalculatedAttributeDefinitionResponse>,
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
}));

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
  input: __S(1200, __c75, 0) as any as S.Schema<GetCalculatedAttributeForProfileRequest>,
  output: __S(1216, __c76, 0) as any as S.Schema<GetCalculatedAttributeForProfileResponse>,
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
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<GetDomainRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<GetDomainResponse>,
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
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<GetDomainLayoutRequest>,
  output: __S(1249, __c78, 1) as any as S.Schema<GetDomainLayoutResponse>,
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
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<GetDomainObjectTypeRequest>,
  output: __S(1265, __c79, 1) as any as S.Schema<GetDomainObjectTypeResponse>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<GetEventStreamRequest>,
  output: __S(1298, __c81, 2) as any as S.Schema<GetEventStreamResponse>,
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
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<GetEventTriggerRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<GetEventTriggerResponse>,
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
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<GetIdentityResolutionJobRequest>,
  output: __S(1377, __c86, 1) as any as S.Schema<GetIdentityResolutionJobResponse>,
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
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<GetIntegrationRequest>,
  output: __S(1424, __c89, 0) as any as S.Schema<GetIntegrationResponse>,
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
}));

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
 * For example, two or more profiles--with spelling mistakes such as **John Doe** and **Jhn Doe**, or different casing
 * email addresses such as **JOHN_DOE@ANYCOMPANY.COM** and
 * **johndoe@anycompany.com**, or different phone number
 * formats such as **555-010-0000** and **+1-555-010-0000**--can be detected as belonging to the same customer **John Doe** and merged into a unified profile.
 */
export const getMatches: API.OperationMethod<
  GetMatchesRequest,
  GetMatchesResponse,
  GetMatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<GetMatchesRequest>,
  output: __S(1443, __c90, 3) as any as S.Schema<GetMatchesResponse>,
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
}));

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
  input: __S(1456, __c91, 0) as any as S.Schema<GetObjectTypeAttributeStatisticsRequest>,
  output: __S(1459, __c91, 3) as any as S.Schema<GetObjectTypeAttributeStatisticsResponse>,
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
}));

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
  input: __S(1472, __c92, 0) as any as S.Schema<GetProfileHistoryRecordRequest>,
  output: __S(1473, __c92, 1) as any as S.Schema<GetProfileHistoryRecordResponse>,
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
}));

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
  input: __S(1488, __c93, 0) as any as S.Schema<GetProfileObjectTypeRequest>,
  output: __S(1489, __c93, 1) as any as S.Schema<GetProfileObjectTypeResponse>,
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
}));

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
 * A template is a predefined ProfileObjectType, such as "Salesforce-Account" or
 * "Salesforce-Contact." When a user sends a ProfileObject, using the PutProfileObject API,
 * with an ObjectTypeName that matches one of the TemplateIds, it uses the mappings from the
 * template.
 */
export const getProfileObjectTypeTemplate: API.OperationMethod<
  GetProfileObjectTypeTemplateRequest,
  GetProfileObjectTypeTemplateResponse,
  GetProfileObjectTypeTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<GetProfileObjectTypeTemplateRequest>,
  output: __S(1505, __c94, 1) as any as S.Schema<GetProfileObjectTypeTemplateResponse>,
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
}));

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
  input: __S(1521, __c95, 1) as any as S.Schema<GetProfileRecommendationsRequest>,
  output: __S(1522, __c95, 2) as any as S.Schema<GetProfileRecommendationsResponse>,
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
}));

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
  input: __S(1552, __c97, 0) as any as S.Schema<GetRecommenderRequest>,
  output: __S(1556, __c97, 4) as any as S.Schema<GetRecommenderResponse>,
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
}));

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
  input: __S(1616, __c101, 0) as any as S.Schema<GetRecommenderFilterRequest>,
  output: __S(1617, __c101, 1) as any as S.Schema<GetRecommenderFilterResponse>,
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
}));

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
  input: __S(1632, __c102, 0) as any as S.Schema<GetRecommenderSchemaRequest>,
  output: __S(1648, __c103, 0) as any as S.Schema<GetRecommenderSchemaResponse>,
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
}));

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
  input: __S(1664, __c104, 0) as any as S.Schema<GetSegmentDefinitionRequest>,
  output: __S(1665, __c104, 1) as any as S.Schema<GetSegmentDefinitionResponse>,
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
}));

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
  input: __S(1680, __c105, 0) as any as S.Schema<GetSegmentEstimateRequest>,
  output: __S(1681, __c105, 1) as any as S.Schema<GetSegmentEstimateResponse>,
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
}));

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
  input: __S(1696, __c106, 0) as any as S.Schema<GetSegmentMembershipRequest>,
  output: __S(1701, __c106, 5) as any as S.Schema<GetSegmentMembershipResponse>,
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
}));

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
  input: __S(1712, __c107, 0) as any as S.Schema<GetSegmentSnapshotRequest>,
  output: __S(1713, __c107, 1) as any as S.Schema<GetSegmentSnapshotResponse>,
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
}));

export type GetSegmentSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the current subscription configuration, execution schedule, and status for
 * segment membership events.
 */
export const getSegmentSubscription: API.OperationMethod<
  GetSegmentSubscriptionRequest,
  GetSegmentSubscriptionResponse,
  GetSegmentSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<GetSegmentSubscriptionRequest>,
  output: __S(1730, __c108, 2) as any as S.Schema<GetSegmentSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentSubscription",
}));

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
  input: __S(1760, __c110, 0) as any as S.Schema<GetSimilarProfilesRequest>,
  output: __S(1761, __c110, 1) as any as S.Schema<GetSimilarProfilesResponse>,
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

export type GetStreamForSegmentsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the segment membership event stream configured for a specific
 * domain, including the stream state and associated segments.
 */
export const getStreamForSegments: API.OperationMethod<
  GetStreamForSegmentsRequest,
  GetStreamForSegmentsResponse,
  GetStreamForSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<GetStreamForSegmentsRequest>,
  output: __S(1779, __c111, 3) as any as S.Schema<GetStreamForSegmentsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamForSegments",
}));

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
  input: __S(1792, __c112, 0) as any as S.Schema<GetUploadJobRequest>,
  output: __S(1794, __c112, 2) as any as S.Schema<GetUploadJobResponse>,
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
}));

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
  input: __S(1840, __c115, 0) as any as S.Schema<GetUploadJobPathRequest>,
  output: __S(1841, __c115, 1) as any as S.Schema<GetUploadJobPathResponse>,
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
}));

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
  input: __S(1856, __c116, 0) as any as S.Schema<GetWorkflowRequest>,
  output: __S(1861, __c116, 5) as any as S.Schema<GetWorkflowResponse>,
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
}));

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
  input: __S(1872, __c117, 0) as any as S.Schema<GetWorkflowStepsRequest>,
  output: __S(1876, __c117, 4) as any as S.Schema<GetWorkflowStepsResponse>,
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
}));

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
  input: __S(1888, __c118, 0) as any as S.Schema<ListAccountIntegrationsRequest>,
  output: __S(1905, __c119, 1) as any as S.Schema<ListAccountIntegrationsResponse>,
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
}));

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
  input: __S(1920, __c120, 0) as any as S.Schema<ListCalculatedAttributeDefinitionsRequest>,
  output: __S(1923, __c120, 3) as any as S.Schema<ListCalculatedAttributeDefinitionsResponse>,
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
}));

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
  input: __S(1936, __c121, 0) as any as S.Schema<ListCalculatedAttributesForProfileRequest>,
  output: __S(1938, __c121, 2) as any as S.Schema<ListCalculatedAttributesForProfileResponse>,
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
}));

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
  input: __S(1952, __c122, 0) as any as S.Schema<ListDomainLayoutsRequest>,
  output: __S(1955, __c122, 3) as any as S.Schema<ListDomainLayoutsResponse>,
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
  input: __S(1968, __c123, 0) as any as S.Schema<ListDomainObjectTypesRequest>,
  output: __S(1971, __c123, 3) as any as S.Schema<ListDomainObjectTypesResponse>,
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
  input: __S(1984, __c124, 0) as any as S.Schema<ListDomainsRequest>,
  output: __S(1987, __c124, 3) as any as S.Schema<ListDomainsResponse>,
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
}));

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
  input: __S(2000, __c125, 0) as any as S.Schema<ListEventStreamsRequest>,
  output: __S(2004, __c125, 4) as any as S.Schema<ListEventStreamsResponse>,
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
  input: __S(2096, __c131, 0) as any as S.Schema<ListEventTriggersRequest>,
  output: __S(2099, __c131, 3) as any as S.Schema<ListEventTriggersResponse>,
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
  input: __S(2112, __c132, 0) as any as S.Schema<ListIdentityResolutionJobsRequest>,
  output: __S(2115, __c132, 3) as any as S.Schema<ListIdentityResolutionJobsResponse>,
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
}));

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
  input: __S(2128, __c133, 0) as any as S.Schema<ListIntegrationsRequest>,
  output: __S(1905, __c119, 1) as any as S.Schema<ListIntegrationsResponse>,
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
}));

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
  input: __S(2144, __c134, 0) as any as S.Schema<ListObjectTypeAttributesRequest>,
  output: __S(2147, __c134, 3) as any as S.Schema<ListObjectTypeAttributesResponse>,
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
  input: __S(2160, __c135, 0) as any as S.Schema<ListObjectTypeAttributeValuesRequest>,
  output: __S(2163, __c135, 3) as any as S.Schema<ListObjectTypeAttributeValuesResponse>,
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
}));

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
  input: __S(2176, __c136, 0) as any as S.Schema<ProfileAttributeValuesRequest>,
  output: __S(2179, __c136, 3) as any as S.Schema<ProfileAttributeValuesResponse>,
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
}));

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
  input: __S(2192, __c137, 0) as any as S.Schema<ListProfileHistoryRecordsRequest>,
  output: __S(2195, __c137, 3) as any as S.Schema<ListProfileHistoryRecordsResponse>,
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
}));

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
  input: __S(2208, __c138, 0) as any as S.Schema<ListProfileObjectsRequest>,
  output: __S(2211, __c138, 3) as any as S.Schema<ListProfileObjectsResponse>,
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
}));

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
  input: __S(2240, __c140, 0) as any as S.Schema<ListProfileObjectTypesRequest>,
  output: __S(2243, __c140, 3) as any as S.Schema<ListProfileObjectTypesResponse>,
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
}));

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
  input: __S(2256, __c141, 0) as any as S.Schema<ListProfileObjectTypeTemplatesRequest>,
  output: __S(2259, __c141, 3) as any as S.Schema<ListProfileObjectTypeTemplatesResponse>,
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
}));

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
  input: __S(2288, __c143, 0) as any as S.Schema<ListRecommenderFiltersRequest>,
  output: __S(2291, __c143, 3) as any as S.Schema<ListRecommenderFiltersResponse>,
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
  input: __S(2304, __c144, 0) as any as S.Schema<ListRecommenderRecipesRequest>,
  output: __S(2307, __c144, 3) as any as S.Schema<ListRecommenderRecipesResponse>,
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
  input: __S(2320, __c145, 0) as any as S.Schema<ListRecommendersRequest>,
  output: __S(2323, __c145, 3) as any as S.Schema<ListRecommendersResponse>,
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
  input: __S(2336, __c146, 0) as any as S.Schema<ListRecommenderSchemasRequest>,
  output: __S(2338, __c146, 2) as any as S.Schema<ListRecommenderSchemasResponse>,
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
  input: __S(2352, __c147, 0) as any as S.Schema<ListRuleBasedMatchesRequest>,
  output: __S(2353, __c147, 1) as any as S.Schema<ListRuleBasedMatchesResponse>,
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
  input: __S(2368, __c148, 0) as any as S.Schema<ListSegmentDefinitionsRequest>,
  output: __S(2371, __c148, 3) as any as S.Schema<ListSegmentDefinitionsResponse>,
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

export type ListSegmentSubscriptionEventsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the most recent membership events for a segment. Each event represents a profile
 * that entered or exited the segment.
 *
 * This operation is paginated.
 */
export const listSegmentSubscriptionEvents: API.PaginatedOperationMethod<
  ListSegmentSubscriptionEventsRequest,
  ListSegmentSubscriptionEventsResponse,
  ListSegmentSubscriptionEventsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionEventItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2384, __c149, 0) as any as S.Schema<ListSegmentSubscriptionEventsRequest>,
  output: __S(2387, __c149, 3) as any as S.Schema<ListSegmentSubscriptionEventsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSegmentSubscriptionEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
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
  input: __S(2400, __c150, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2401, __c150, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(2416, __c151, 0) as any as S.Schema<ListUploadJobsRequest>,
  output: __S(2419, __c151, 3) as any as S.Schema<ListUploadJobsResponse>,
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
  input: __S(2432, __c152, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(2435, __c152, 3) as any as S.Schema<ListWorkflowsResponse>,
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
}));

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
  input: __S(81, __c5, 1) as any as S.Schema<MergeProfilesRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<MergeProfilesResponse>,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeProfiles",
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<PutDomainObjectTypeRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<PutDomainObjectTypeResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<PutIntegrationRequest>,
  output: __S(1424, __c89, 0) as any as S.Schema<PutIntegrationResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<PutProfileObjectRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<PutProfileObjectResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<PutProfileObjectTypeRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<PutProfileObjectTypeResponse>,
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
}));

export type PutSegmentSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates a segment subscription for membership events. When a subscription is
 * created, an initial snapshot is taken and the system begins monitoring for membership
 * changes.
 *
 * You can optionally set a schedule configuration interval to control how often membership
 * snapshots are run. The interval can be from 1 to 24 hours. If not set, the interval defaults
 * to 24 hours. Scheduled snapshots run on
 * a best-effort basis. If a scheduled snapshot takes longer than the configured interval, the
 * next scheduled run does not start until the in-progress snapshot completes, so a run might
 * be delayed or skipped and is not guaranteed to occur at exactly the requested time.
 *
 * For Classic segments, membership events are generated from these scheduled snapshots and
 * also in near real-time as profile attribute changes occur. For SQL segments, membership
 * events are generated only from the scheduled snapshots.
 */
export const putSegmentSubscription: API.OperationMethod<
  PutSegmentSubscriptionRequest,
  PutSegmentSubscriptionResponse,
  PutSegmentSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<PutSegmentSubscriptionRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<PutSegmentSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSegmentSubscription",
}));

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
  input: __S(177, __c11, 1) as any as S.Schema<SearchProfilesRequest>,
  output: __S(178, __c11, 2) as any as S.Schema<SearchProfilesResponse>,
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
}));

export type SearchRecommendationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves recommendations for a profile in a specific domain. The profile is identified
 * using a search key, which consists of a `KeyName` and a `KeyValues` list.
 * The `KeyName` can be a predefined key (for example, `_profileId`,
 * `_phone`, `_email`) or a custom-defined key.
 *
 * The search key must match exactly one profile. If no profile matches the search key, the
 * operation returns a `ResourceNotFoundException`. If more than one profile matches
 * the search key, the operation returns a `BadRequestException`. You can use the
 * SearchProfiles API to review the matching profiles.
 */
export const searchRecommendations: API.OperationMethod<
  SearchRecommendationsRequest,
  SearchRecommendationsResponse,
  SearchRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(194, __c12, 2) as any as S.Schema<SearchRecommendationsRequest>,
  output: __S(195, __c12, 3) as any as S.Schema<SearchRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRecommendations",
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<StartRecommenderRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<StartRecommenderResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<StartUploadJobRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<StartUploadJobResponse>,
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
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<StopRecommenderRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<StopRecommenderResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<StopUploadJobRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<StopUploadJobResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1600, __c100, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<UpdateCalculatedAttributeDefinitionRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<UpdateCalculatedAttributeDefinitionResponse>,
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
}));

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
 * After a domain is created, the name can't be changed.
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
  input: __S(400, __c25, 0) as any as S.Schema<UpdateDomainRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<UpdateDomainResponse>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<UpdateDomainLayoutRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<UpdateDomainLayoutResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<UpdateEventTriggerRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<UpdateEventTriggerResponse>,
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
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<UpdateProfileRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<UpdateProfileResponse>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<UpdateRecommenderRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<UpdateRecommenderResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          CalculatedAttributeName: S.String.pipe(T.HttpLabel("CalculatedAttributeName")),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          AttributeDetails: __S(66, __c4, 2),
          Conditions: S.optional(__S(70, __c4, 6)),
          Filter: S.optional(__S(52, __c3, 4)),
          Statistic: S.String,
          UseHistoricalData: S.optional(S.Boolean),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCalculatedAttributeDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          AttributeDetails: S.optional(__S(66, __c4, 2)),
          Conditions: S.optional(__S(70, __c4, 6)),
          Filter: S.optional(__S(52, __c3, 4)),
          Statistic: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UseHistoricalData: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Readiness: S.optional(__S(16, __c1, 0)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "CreateCalculatedAttributeDefinitionResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProgressPercentage: S.optional(S.Number), Message: S.optional(S.String) }),
      ).annotate({ identifier: "Readiness" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DimensionType: S.String, Values: __S(1328, __c83, 0) }),
      ).annotate({ identifier: "FilterAttributeDimension" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(32, __c2, 0).pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Attributes: __S(33, __c2, 1) })).annotate({
        identifier: "FilterDimension",
      });
    case 1:
      return S.Array(__S(48, __c3, 0));
    case 2:
      return S.suspend(() => S.Struct({ Type: S.String, Dimensions: __S(49, __c3, 1) })).annotate({
        identifier: "FilterGroup",
      });
    case 3:
      return S.Array(__S(50, __c3, 2));
    case 4:
      return S.suspend(() => S.Struct({ Include: S.String, Groups: __S(51, __c3, 3) })).annotate({
        identifier: "Filter",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({
        identifier: "AttributeItem",
      });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Attributes: __S(65, __c4, 1), Expression: S.String }),
      ).annotate({ identifier: "AttributeDetails" });
    case 3:
      return S.suspend(() => S.Struct({ Start: S.Number, End: S.Number })).annotate({
        identifier: "ValueRange",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.Number),
          Unit: S.optional(S.String),
          ValueRange: S.optional(__S(67, __c4, 3)),
          TimestampSource: S.optional(S.String),
          TimestampFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "Range" });
    case 5:
      return S.suspend(() => S.Struct({ Value: S.String, Operator: S.String })).annotate({
        identifier: "Threshold",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Range: S.optional(__S(68, __c4, 4)),
          ObjectCount: S.optional(S.Number),
          Threshold: S.optional(__S(69, __c4, 5)),
        }),
      ).annotate({ identifier: "Conditions" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountNumber: S.optional(S.String),
          AdditionalInformation: S.optional(S.String),
          PartyType: S.optional(S.String),
          BusinessName: S.optional(S.String),
          FirstName: S.optional(S.String),
          MiddleName: S.optional(S.String),
          LastName: S.optional(S.String),
          BirthDate: S.optional(S.String),
          Gender: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
          MobilePhoneNumber: S.optional(S.String),
          HomePhoneNumber: S.optional(S.String),
          BusinessPhoneNumber: S.optional(S.String),
          EmailAddress: S.optional(S.String),
          PersonalEmailAddress: S.optional(S.String),
          BusinessEmailAddress: S.optional(S.String),
          Address: S.optional(S.String),
          ShippingAddress: S.optional(S.String),
          MailingAddress: S.optional(S.String),
          BillingAddress: S.optional(S.String),
          Attributes: S.optional(__S(2032, __c127, 0)),
          ProfileType: S.optional(S.String),
          EngagementPreferences: S.optional(S.String),
        }),
      ).annotate({ identifier: "FieldSourceProfileIds" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MainProfileId: S.String,
          ProfileIdsToBeMerged: __S(1328, __c83, 0),
          FieldSourceProfileIds: S.optional(__S(80, __c5, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/objects/merge" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "MergeProfilesRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
          Description: S.optional(SensitiveString),
          EncryptionKey: S.optional(S.String),
          Fields: __S(1281, __c80, 1),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/domain-object-types/{ObjectTypeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDomainObjectTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          EncryptionKey: S.optional(S.String),
          Fields: S.optional(__S(1281, __c80, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "PutDomainObjectTypeResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          Uri: S.optional(S.String),
          ObjectTypeName: S.optional(S.String),
          ObjectTypeNames: S.optional(__S(2032, __c127, 0)),
          Tags: S.optional(__S(2032, __c127, 0)),
          FlowDefinition: S.optional(__S(573, __c35, 13)),
          RoleArn: S.optional(S.String),
          EventTriggerNames: S.optional(__S(1328, __c83, 0)),
          Scope: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutIntegrationRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.String,
          Object: SensitiveString,
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/profiles/objects" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutProfileObjectRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ProfileObjectUniqueKey: S.optional(S.String) })).annotate({
        identifier: "PutProfileObjectResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
          Description: SensitiveString,
          TemplateId: S.optional(S.String),
          ExpirationDays: S.optional(S.Number),
          EncryptionKey: S.optional(S.String),
          AllowProfileCreation: S.optional(S.Boolean),
          SourceLastUpdatedTimestampFormat: S.optional(S.String),
          MaxProfileObjectCount: S.optional(S.Number),
          SourcePriority: S.optional(S.Number),
          Fields: S.optional(__S(801, __c50, 1)),
          Keys: S.optional(__S(1138, __c71, 2)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/object-types/{ObjectTypeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutProfileObjectTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.String,
          Description: SensitiveString,
          TemplateId: S.optional(S.String),
          ExpirationDays: S.optional(S.Number),
          EncryptionKey: S.optional(S.String),
          AllowProfileCreation: S.optional(S.Boolean),
          SourceLastUpdatedTimestampFormat: S.optional(S.String),
          MaxProfileObjectCount: S.optional(S.Number),
          MaxAvailableProfileObjectCount: S.optional(S.Number),
          SourcePriority: S.optional(S.Number),
          Fields: S.optional(__S(801, __c50, 1)),
          Keys: S.optional(__S(1138, __c71, 2)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "PutProfileObjectTypeResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
          ScheduleConfiguration: S.optional(__S(1744, __c109, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}/subscriptions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSegmentSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          ScheduleConfiguration: S.optional(__S(1744, __c109, 0)),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PutSegmentSubscriptionResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2224, __c139, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          KeyName: S.String,
          Values: __S(1328, __c83, 0),
          AdditionalSearchKeys: S.optional(__S(176, __c11, 0)),
          LogicalOperator: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchProfilesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2048, __c128, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchProfilesResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Filters: S.optional(__S(1538, __c96, 2)),
          PromotionalFilters: S.optional(__S(1540, __c96, 4)),
        }),
      ).annotate({ identifier: "Recommender" });
    case 1:
      return S.suspend(() => S.Struct({ Columns: S.optional(__S(1328, __c83, 0)) })).annotate({
        identifier: "RecommendationMetadata",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          KeyName: S.String,
          KeyValues: __S(1328, __c83, 0),
          Recommender: __S(192, __c12, 0),
          CandidateIds: S.optional(__S(1328, __c83, 0)),
          Context: S.optional(__S(2032, __c127, 0)),
          Diversity: S.optional(__S(1542, __c96, 6)),
          Metadata: S.optional(__S(193, __c12, 1)),
          MaxRecommendations: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchRecommendationsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.optional(S.String),
          Recommendations: S.optional(__S(1545, __c96, 9)),
        }),
      ).annotate({ identifier: "SearchRecommendationsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderName: S.String.pipe(T.HttpLabel("RecommenderName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/recommenders/{RecommenderName}/start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRecommenderRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/upload-jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartUploadJobRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DefaultExpirationDays: S.Number,
          DefaultEncryptionKey: S.optional(S.String),
          DeadLetterQueueUrl: S.optional(S.String),
          Matching: S.optional(__S(256, __c16, 0)),
          RuleBasedMatching: S.optional(__S(257, __c16, 1)),
          DataStore: S.optional(__S(258, __c16, 2)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          DefaultExpirationDays: S.Number,
          DefaultEncryptionKey: S.optional(S.String),
          DeadLetterQueueUrl: S.optional(S.String),
          Matching: S.optional(__S(294, __c18, 6)),
          RuleBasedMatching: S.optional(__S(295, __c18, 7)),
          DataStore: S.optional(__S(296, __c18, 8)),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "CreateDomainResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          JobSchedule: S.optional(__S(288, __c18, 0)),
          AutoMerging: S.optional(__S(304, __c19, 0)),
          ExportingConfig: S.optional(__S(290, __c18, 2)),
        }),
      ).annotate({ identifier: "MatchingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          MatchingRules: S.optional(__S(292, __c18, 4)),
          MaxAllowedRuleLevelForMerging: S.optional(S.Number),
          MaxAllowedRuleLevelForMatching: S.optional(S.Number),
          AttributeTypesSelector: S.optional(__S(293, __c18, 5)),
          ConflictResolution: S.optional(__S(274, __c17, 2)),
          ExportingConfig: S.optional(__S(290, __c18, 2)),
        }),
      ).annotate({ identifier: "RuleBasedMatchingRequest" });
    case 2:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "DataStoreRequest",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1328, __c83, 0));
    case 1:
      return S.suspend(() => S.Struct({ MatchingAttributesList: __S(272, __c17, 0) })).annotate({
        identifier: "Consolidation",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ ConflictResolvingModel: S.String, SourceName: S.optional(S.String) }),
      ).annotate({ identifier: "ConflictResolution" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DayOfTheWeek: S.String, Time: S.String })).annotate({
        identifier: "JobSchedule",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3BucketName: S.String, S3KeyName: S.optional(S.String) }),
      ).annotate({ identifier: "S3ExportingConfig" });
    case 2:
      return S.suspend(() => S.Struct({ S3Exporting: S.optional(__S(289, __c18, 1)) })).annotate({
        identifier: "ExportingConfig",
      });
    case 3:
      return S.suspend(() => S.Struct({ Rule: __S(1328, __c83, 0) })).annotate({
        identifier: "MatchingRule",
      });
    case 4:
      return S.Array(__S(291, __c18, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AttributeMatchingModel: S.String,
          Address: S.optional(__S(1328, __c83, 0)),
          PhoneNumber: S.optional(__S(1328, __c83, 0)),
          EmailAddress: S.optional(__S(1328, __c83, 0)),
        }),
      ).annotate({ identifier: "AttributeTypesSelector" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          JobSchedule: S.optional(__S(288, __c18, 0)),
          AutoMerging: S.optional(__S(304, __c19, 0)),
          ExportingConfig: S.optional(__S(290, __c18, 2)),
        }),
      ).annotate({ identifier: "MatchingResponse" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          MatchingRules: S.optional(__S(292, __c18, 4)),
          Status: S.optional(S.String),
          MaxAllowedRuleLevelForMerging: S.optional(S.Number),
          MaxAllowedRuleLevelForMatching: S.optional(S.Number),
          AttributeTypesSelector: S.optional(__S(293, __c18, 5)),
          ConflictResolution: S.optional(__S(274, __c17, 2)),
          ExportingConfig: S.optional(__S(290, __c18, 2)),
        }),
      ).annotate({ identifier: "RuleBasedMatchingResponse" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), Readiness: S.optional(__S(16, __c1, 0)) }),
      ).annotate({ identifier: "DataStoreResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          Consolidation: S.optional(__S(273, __c17, 1)),
          ConflictResolution: S.optional(__S(274, __c17, 2)),
          MinAllowedConfidenceScoreForMerging: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutoMerging" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderName: S.String.pipe(T.HttpLabel("RecommenderName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/recommenders/{RecommenderName}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopRecommenderRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/upload-jobs/{JobId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopUploadJobRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(2032, __c127, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1328, __c83, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          CalculatedAttributeName: S.String.pipe(T.HttpLabel("CalculatedAttributeName")),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Conditions: S.optional(__S(70, __c4, 6)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCalculatedAttributeDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Statistic: S.optional(S.String),
          Conditions: S.optional(__S(70, __c4, 6)),
          AttributeDetails: S.optional(__S(66, __c4, 2)),
          UseHistoricalData: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Readiness: S.optional(__S(16, __c1, 0)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "UpdateCalculatedAttributeDefinitionResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DefaultExpirationDays: S.optional(S.Number),
          DefaultEncryptionKey: S.optional(S.String),
          DeadLetterQueueUrl: S.optional(S.String),
          Matching: S.optional(__S(256, __c16, 0)),
          RuleBasedMatching: S.optional(__S(257, __c16, 1)),
          DataStore: S.optional(__S(258, __c16, 2)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          DefaultExpirationDays: S.optional(S.Number),
          DefaultEncryptionKey: S.optional(S.String),
          DeadLetterQueueUrl: S.optional(S.String),
          Matching: S.optional(__S(294, __c18, 6)),
          RuleBasedMatching: S.optional(__S(295, __c18, 7)),
          DataStore: S.optional(__S(296, __c18, 8)),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "UpdateDomainResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          LayoutDefinitionName: S.String.pipe(T.HttpLabel("LayoutDefinitionName")),
          Description: S.optional(SensitiveString),
          DisplayName: S.optional(S.String),
          IsDefault: S.optional(S.Boolean),
          LayoutType: S.optional(S.String),
          Layout: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/layouts/{LayoutDefinitionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainLayoutRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LayoutDefinitionName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          DisplayName: S.optional(S.String),
          IsDefault: S.optional(S.Boolean),
          LayoutType: S.optional(S.String),
          Layout: S.optional(SensitiveString),
          Version: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "UpdateDomainLayoutResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EventTriggerName: S.String.pipe(T.HttpLabel("EventTriggerName")),
          ObjectTypeName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          EventTriggerConditions: S.optional(__S(533, __c33, 5)),
          SegmentFilter: S.optional(S.String),
          EventTriggerLimits: S.optional(__S(536, __c33, 8)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/event-triggers/{EventTriggerName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventTriggerRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileId: S.String,
          AdditionalInformation: S.optional(SensitiveString),
          AccountNumber: S.optional(SensitiveString),
          PartyType: S.optional(S.String),
          BusinessName: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          MiddleName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BirthDate: S.optional(SensitiveString),
          Gender: S.optional(S.String),
          PhoneNumber: S.optional(SensitiveString),
          MobilePhoneNumber: S.optional(SensitiveString),
          HomePhoneNumber: S.optional(SensitiveString),
          BusinessPhoneNumber: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          PersonalEmailAddress: S.optional(SensitiveString),
          BusinessEmailAddress: S.optional(SensitiveString),
          Address: S.optional(__S(2064, __c129, 0)),
          ShippingAddress: S.optional(__S(2064, __c129, 0)),
          MailingAddress: S.optional(__S(2064, __c129, 0)),
          BillingAddress: S.optional(__S(2064, __c129, 0)),
          Attributes: S.optional(__S(2032, __c127, 0)),
          PartyTypeString: S.optional(SensitiveString),
          GenderString: S.optional(SensitiveString),
          ProfileType: S.optional(S.String),
          EngagementPreferences: S.optional(__S(2067, __c129, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{DomainName}/profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfileRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderName: S.String.pipe(T.HttpLabel("RecommenderName")),
          Description: S.optional(SensitiveString),
          RecommenderConfig: S.optional(__S(632, __c39, 8)),
          RecommenderVersionName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/domains/{DomainName}/recommenders/{RecommenderName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRecommenderRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RecommenderName: S.String })).annotate({
        identifier: "UpdateRecommenderResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          LayoutDefinitionName: S.String.pipe(T.HttpLabel("LayoutDefinitionName")),
          Description: SensitiveString,
          DisplayName: S.String,
          IsDefault: S.optional(S.Boolean),
          LayoutType: S.String,
          Layout: SensitiveString,
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/layouts/{LayoutDefinitionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainLayoutRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LayoutDefinitionName: S.String,
          Description: SensitiveString,
          DisplayName: S.String,
          IsDefault: S.optional(S.Boolean),
          LayoutType: S.String,
          Layout: SensitiveString,
          Version: S.String,
          Tags: S.optional(__S(2032, __c127, 0)),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateDomainLayoutResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          Uri: S.String,
          EventStreamName: S.String.pipe(T.HttpLabel("EventStreamName")),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/event-streams/{EventStreamName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEventStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventStreamArn: S.String, Tags: S.optional(__S(2032, __c127, 0)) }),
      ).annotate({ identifier: "CreateEventStreamResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EventTriggerName: S.String.pipe(T.HttpLabel("EventTriggerName")),
          ObjectTypeName: S.String,
          Description: S.optional(SensitiveString),
          EventTriggerConditions: __S(533, __c33, 5),
          SegmentFilter: S.optional(S.String),
          EventTriggerLimits: S.optional(__S(536, __c33, 8)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/event-triggers/{EventTriggerName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEventTriggerRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Source: S.optional(S.String),
          FieldName: S.optional(S.String),
          ComparisonOperator: S.String,
          Values: __S(1328, __c83, 0),
        }),
      ).annotate({ identifier: "ObjectAttribute" });
    case 1:
      return S.Array(__S(528, __c33, 0));
    case 2:
      return S.suspend(() => S.Struct({ ObjectAttributes: __S(529, __c33, 1) })).annotate({
        identifier: "EventTriggerDimension",
      });
    case 3:
      return S.Array(__S(530, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ EventTriggerDimensions: __S(531, __c33, 3), LogicalOperator: S.String }),
      ).annotate({ identifier: "EventTriggerCondition" });
    case 5:
      return S.Array(__S(532, __c33, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Unit: S.String,
          Value: S.Number,
          MaxInvocationsPerProfile: S.optional(S.Number),
          Unlimited: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Period" });
    case 7:
      return S.Array(__S(534, __c33, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          EventExpiration: S.optional(S.Number),
          Periods: S.optional(__S(535, __c33, 7)),
        }),
      ).annotate({ identifier: "EventTriggerLimits" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          EventTriggerName: S.optional(S.String),
          ObjectTypeName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          EventTriggerConditions: S.optional(__S(533, __c33, 5)),
          SegmentFilter: S.optional(S.String),
          EventTriggerLimits: S.optional(__S(536, __c33, 8)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "CreateEventTriggerResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Batch" });
    case 1:
      return S.Array(__S(544, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FlowDefinition: __S(573, __c35, 13), Batches: S.optional(__S(545, __c34, 1)) }),
      ).annotate({ identifier: "AppflowIntegration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ AppflowIntegration: S.optional(__S(546, __c34, 2)) }),
      ).annotate({ identifier: "IntegrationConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          WorkflowType: S.String,
          IntegrationConfig: __S(547, __c34, 3),
          ObjectTypeName: S.String,
          RoleArn: S.String,
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/workflows/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIntegrationWorkflowRequest" });
    case 5:
      return S.suspend(() => S.Struct({ WorkflowId: S.String, Message: S.String })).annotate({
        identifier: "CreateIntegrationWorkflowResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DatetimeTypeFieldName: S.optional(S.String) })).annotate({
        identifier: "IncrementalPullConfig",
      });
    case 1:
      return S.suspend(() => S.Struct({ Object: S.String })).annotate({
        identifier: "MarketoSourceProperties",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ BucketName: S.String, BucketPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3SourceProperties" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Object: S.String,
          EnableDynamicFieldUpdate: S.optional(S.Boolean),
          IncludeDeletedRecords: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SalesforceSourceProperties" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Marketo: S.optional(__S(561, __c35, 1)),
          S3: S.optional(__S(562, __c35, 2)),
          Salesforce: S.optional(__S(563, __c35, 3)),
          ServiceNow: S.optional(__S(561, __c35, 1)),
          Zendesk: S.optional(__S(561, __c35, 1)),
        }),
      ).annotate({ identifier: "SourceConnectorProperties" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConnectorProfileName: S.optional(S.String),
          ConnectorType: S.String,
          IncrementalPullConfig: S.optional(__S(560, __c35, 0)),
          SourceConnectorProperties: __S(564, __c35, 4),
        }),
      ).annotate({ identifier: "SourceFlowConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Marketo: S.optional(S.String),
          S3: S.optional(S.String),
          Salesforce: S.optional(S.String),
          ServiceNow: S.optional(S.String),
          Zendesk: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorOperator" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          ConnectorOperator: S.optional(__S(566, __c35, 6)),
          DestinationField: S.optional(S.String),
          SourceFields: __S(1328, __c83, 0),
          TaskProperties: S.optional(__S(567, __c35, 7)),
          TaskType: S.String,
        }),
      ).annotate({ identifier: "Task" });
    case 9:
      return S.Array(__S(568, __c35, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          ScheduleExpression: S.String,
          DataPullMode: S.optional(S.String),
          ScheduleStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScheduleEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Timezone: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          FirstExecutionFrom: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ScheduledTriggerProperties" });
    case 11:
      return S.suspend(() => S.Struct({ Scheduled: S.optional(__S(570, __c35, 10)) })).annotate({
        identifier: "TriggerProperties",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ TriggerType: S.String, TriggerProperties: S.optional(__S(571, __c35, 11)) }),
      ).annotate({ identifier: "TriggerConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          FlowName: S.String,
          KmsArn: S.String,
          SourceFlowConfig: __S(565, __c35, 5),
          Tasks: __S(569, __c35, 9),
          TriggerConfig: __S(572, __c35, 12),
        }),
      ).annotate({ identifier: "FlowDefinition" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          AccountNumber: S.optional(SensitiveString),
          AdditionalInformation: S.optional(SensitiveString),
          PartyType: S.optional(S.String),
          BusinessName: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          MiddleName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BirthDate: S.optional(SensitiveString),
          Gender: S.optional(S.String),
          PhoneNumber: S.optional(SensitiveString),
          MobilePhoneNumber: S.optional(SensitiveString),
          HomePhoneNumber: S.optional(SensitiveString),
          BusinessPhoneNumber: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          PersonalEmailAddress: S.optional(SensitiveString),
          BusinessEmailAddress: S.optional(SensitiveString),
          Address: S.optional(__S(2064, __c129, 0)),
          ShippingAddress: S.optional(__S(2064, __c129, 0)),
          MailingAddress: S.optional(__S(2064, __c129, 0)),
          BillingAddress: S.optional(__S(2064, __c129, 0)),
          Attributes: S.optional(__S(2032, __c127, 0)),
          PartyTypeString: S.optional(SensitiveString),
          GenderString: S.optional(SensitiveString),
          ProfileType: S.optional(S.String),
          EngagementPreferences: S.optional(__S(2067, __c129, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProfileRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProfileId: S.String })).annotate({
        identifier: "CreateProfileResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderName: S.String.pipe(T.HttpLabel("RecommenderName")),
          RecommenderRecipeName: S.String,
          RecommenderConfig: S.optional(__S(632, __c39, 8)),
          Description: S.optional(SensitiveString),
          RecommenderSchemaName: S.optional(S.String),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/recommenders/{RecommenderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRecommenderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RecommenderArn: S.String, Tags: S.optional(__S(2032, __c127, 0)) }),
      ).annotate({ identifier: "CreateRecommenderResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventType: S.String,
          EventValueThreshold: S.optional(S.Number),
          EventWeight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EventParameters" });
    case 1:
      return S.Array(__S(624, __c39, 0));
    case 2:
      return S.suspend(() => S.Struct({ EventParametersList: __S(625, __c39, 1) })).annotate({
        identifier: "EventsConfig",
      });
    case 3:
      return S.suspend(() => S.Struct({ MinProvisionedTPS: S.optional(S.Number) })).annotate({
        identifier: "InferenceConfig",
      });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(1328, __c83, 0).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({ Name: S.String, CapType: S.String, Target: S.String }),
      ).annotate({ identifier: "DiversityColumn" });
    case 6:
      return S.Array(__S(629, __c39, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ DiversityColumns: S.optional(__S(630, __c39, 6)) }),
      ).annotate({ identifier: "DiversityConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          EventsConfig: S.optional(__S(626, __c39, 2)),
          TrainingFrequency: S.optional(S.Number),
          InferenceConfig: S.optional(__S(627, __c39, 3)),
          IncludedColumns: S.optional(__S(628, __c39, 4)),
          ExcludedColumns: S.optional(__S(628, __c39, 4)),
          DiversityConfig: S.optional(__S(631, __c39, 7)),
        }),
      ).annotate({ identifier: "RecommenderConfig" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderFilterName: S.String.pipe(T.HttpLabel("RecommenderFilterName")),
          RecommenderFilterExpression: SensitiveString,
          RecommenderSchemaName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/recommender-filters/{RecommenderFilterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRecommenderFilterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RecommenderFilterArn: S.String, Tags: S.optional(__S(2032, __c127, 0)) }),
      ).annotate({ identifier: "CreateRecommenderFilterResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderSchemaName: S.String.pipe(T.HttpLabel("RecommenderSchemaName")),
          Fields: __S(674, __c42, 2),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/recommender-schemas/{RecommenderSchemaName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRecommenderSchemaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommenderSchemaArn: S.String,
          RecommenderSchemaName: S.String,
          Fields: __S(674, __c42, 2),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "CreateRecommenderSchemaResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetFieldName: S.String,
          ContentType: S.optional(S.String),
          FeatureType: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommenderSchemaField" });
    case 1:
      return S.Array(__S(672, __c42, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(673, __c42, 1).pipe(S.optional));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
          DisplayName: S.String,
          Description: S.optional(SensitiveString),
          SegmentGroups: S.optional(__S(731, __c45, 11)),
          SegmentSqlQuery: S.optional(SensitiveString),
          SegmentSort: S.optional(__S(738, __c46, 2)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSegmentDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SegmentDefinitionName: S.String,
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SegmentDefinitionArn: S.optional(S.String),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "CreateSegmentDefinitionResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          City: S.optional(__S(32, __c2, 0)),
          Country: S.optional(__S(32, __c2, 0)),
          County: S.optional(__S(32, __c2, 0)),
          PostalCode: S.optional(__S(32, __c2, 0)),
          Province: S.optional(__S(32, __c2, 0)),
          State: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "AddressDimension" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DimensionType: S.String, Values: __S(704, __c44, 0) }),
      ).annotate({ identifier: "ProfileTypeDimension" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountNumber: S.optional(__S(32, __c2, 0)),
          AdditionalInformation: S.optional(__S(32, __c2, 0)),
          FirstName: S.optional(__S(32, __c2, 0)),
          LastName: S.optional(__S(32, __c2, 0)),
          MiddleName: S.optional(__S(32, __c2, 0)),
          GenderString: S.optional(__S(32, __c2, 0)),
          PartyTypeString: S.optional(__S(32, __c2, 0)),
          BirthDate: S.optional(__S(32, __c2, 0)),
          PhoneNumber: S.optional(__S(32, __c2, 0)),
          BusinessName: S.optional(__S(32, __c2, 0)),
          BusinessPhoneNumber: S.optional(__S(32, __c2, 0)),
          HomePhoneNumber: S.optional(__S(32, __c2, 0)),
          MobilePhoneNumber: S.optional(__S(32, __c2, 0)),
          EmailAddress: S.optional(__S(32, __c2, 0)),
          PersonalEmailAddress: S.optional(__S(32, __c2, 0)),
          BusinessEmailAddress: S.optional(__S(32, __c2, 0)),
          Address: S.optional(__S(720, __c45, 0)),
          ShippingAddress: S.optional(__S(720, __c45, 0)),
          MailingAddress: S.optional(__S(720, __c45, 0)),
          BillingAddress: S.optional(__S(720, __c45, 0)),
          Attributes: S.optional(__S(33, __c2, 1)),
          ProfileType: S.optional(__S(721, __c45, 1)),
        }),
      ).annotate({ identifier: "ProfileAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DimensionType: S.String,
          Values: __S(1328, __c83, 0),
          ConditionOverrides: S.optional(__S(1825, __c114, 1)),
        }),
      ).annotate({ identifier: "CalculatedAttributeDimension" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(723, __c45, 3).pipe(S.optional));
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ProfileAttributes: __S(722, __c45, 2) }),
        /*@__PURE__*/ S.Struct({ CalculatedAttributes: __S(724, __c45, 4) }),
      ]);
    case 6:
      return S.Array(__S(725, __c45, 5));
    case 7:
      return S.suspend(() => S.Struct({ SegmentDefinitionName: S.optional(S.String) })).annotate({
        identifier: "SourceSegment",
      });
    case 8:
      return S.Array(__S(727, __c45, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Dimensions: S.optional(__S(726, __c45, 6)),
          SourceSegments: S.optional(__S(728, __c45, 8)),
          SourceType: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Group" });
    case 10:
      return S.Array(__S(729, __c45, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__S(730, __c45, 10)), Include: S.optional(S.String) }),
      ).annotate({ identifier: "SegmentGroup" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DataType: S.optional(S.String),
          Order: S.String,
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "SortAttribute" });
    case 1:
      return S.Array(__S(736, __c46, 0));
    case 2:
      return S.suspend(() => S.Struct({ Attributes: __S(737, __c46, 1) })).annotate({
        identifier: "SegmentSort",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentQuery: S.optional(__S(731, __c45, 11)),
          SegmentSqlQuery: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/segment-estimates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSegmentEstimateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          EstimateId: S.optional(S.String),
          StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
        }),
      ).annotate({ identifier: "CreateSegmentEstimateResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
          DataFormat: S.String,
          EncryptionKey: S.optional(S.String),
          RoleArn: S.optional(S.String),
          DestinationUri: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/segments/{SegmentDefinitionName}/snapshots",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSegmentSnapshotRequest" });
    case 1:
      return S.suspend(() => S.Struct({ SnapshotId: S.String })).annotate({
        identifier: "CreateSegmentSnapshotResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DisplayName: S.String,
          Fields: __S(801, __c50, 1),
          UniqueKey: S.String,
          DataExpiry: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/upload-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUploadJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.String })).annotate({
        identifier: "CreateUploadJobResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Source: S.optional(S.String),
          Target: S.optional(S.String),
          ContentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ObjectTypeField" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(800, __c50, 0).pipe(S.optional));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          CalculatedAttributeName: S.String.pipe(T.HttpLabel("CalculatedAttributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCalculatedAttributeDefinitionRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{DomainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Message: S.String })).annotate({
        identifier: "DeleteDomainResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          LayoutDefinitionName: S.String.pipe(T.HttpLabel("LayoutDefinitionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/layouts/{LayoutDefinitionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainLayoutRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/domain-object-types/{ObjectTypeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainObjectTypeRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EventStreamName: S.String.pipe(T.HttpLabel("EventStreamName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/event-streams/{EventStreamName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventStreamRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EventTriggerName: S.String.pipe(T.HttpLabel("EventTriggerName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/event-triggers/{EventTriggerName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventTriggerRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")), Uri: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/integrations/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIntegrationRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfileRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Message: S.optional(S.String) })).annotate({
        identifier: "DeleteProfileResponse",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          KeyName: S.String,
          Values: __S(1328, __c83, 0),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/keys/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfileKeyRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          ProfileObjectUniqueKey: S.String,
          ObjectTypeName: S.String,
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/objects/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfileObjectRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/object-types/{ObjectTypeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfileObjectTypeRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderName: S.String.pipe(T.HttpLabel("RecommenderName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/recommenders/{RecommenderName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecommenderRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderFilterName: S.String.pipe(T.HttpLabel("RecommenderFilterName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/recommender-filters/{RecommenderFilterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecommenderFilterRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderSchemaName: S.String.pipe(T.HttpLabel("RecommenderSchemaName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/recommender-schemas/{RecommenderSchemaName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecommenderSchemaRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSegmentDefinitionRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}/subscriptions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSegmentSubscriptionRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          WorkflowId: S.String.pipe(T.HttpLabel("WorkflowId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{DomainName}/workflows/{WorkflowId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkflowRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Objects: __S(1120, __c70, 0),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/detect/object-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DetectProfileObjectTypeRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SourceLastUpdatedTimestampFormat: S.optional(S.String),
          Fields: S.optional(__S(801, __c50, 1)),
          Keys: S.optional(__S(1138, __c71, 2)),
        }),
      ).annotate({ identifier: "DetectedProfileObjectType" });
    case 3:
      return S.Array(__S(1122, __c70, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ DetectedProfileObjectTypes: S.optional(__S(1123, __c70, 3)) }),
      ).annotate({ identifier: "DetectProfileObjectTypeResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StandardIdentifiers: S.optional(__S(704, __c44, 0)),
          FieldNames: S.optional(__S(1328, __c83, 0)),
        }),
      ).annotate({ identifier: "ObjectTypeKey" });
    case 1:
      return S.Array(__S(1136, __c71, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1137, __c71, 1).pipe(S.optional));
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{DomainName}/segment-streams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateStreamForSegmentsRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          Consolidation: __S(273, __c17, 1),
          ConflictResolution: __S(274, __c17, 2),
          MinAllowedConfidenceScoreForMerging: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/identity-resolution-jobs/auto-merging-preview",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutoMergingPreviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          NumberOfMatchesInSample: S.optional(S.Number),
          NumberOfProfilesInSample: S.optional(S.Number),
          NumberOfProfilesWillBeMerged: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetAutoMergingPreviewResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          CalculatedAttributeName: S.String.pipe(T.HttpLabel("CalculatedAttributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCalculatedAttributeDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Statistic: S.optional(S.String),
          Filter: S.optional(__S(52, __c3, 4)),
          Conditions: S.optional(__S(70, __c4, 6)),
          AttributeDetails: S.optional(__S(66, __c4, 2)),
          UseHistoricalData: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Readiness: S.optional(__S(16, __c1, 0)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetCalculatedAttributeDefinitionResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          CalculatedAttributeName: S.String.pipe(T.HttpLabel("CalculatedAttributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/profile/{ProfileId}/calculated-attributes/{CalculatedAttributeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCalculatedAttributeForProfileRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          IsDataPartial: S.optional(S.String),
          Value: S.optional(S.String),
          LastObjectTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetCalculatedAttributeForProfileResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileCount: S.optional(S.Number),
          MeteringProfileCount: S.optional(S.Number),
          ObjectCount: S.optional(S.Number),
          TotalSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DomainStats" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          DefaultExpirationDays: S.optional(S.Number),
          DefaultEncryptionKey: S.optional(S.String),
          DeadLetterQueueUrl: S.optional(S.String),
          Stats: S.optional(__S(1233, __c77, 1)),
          Matching: S.optional(__S(294, __c18, 6)),
          RuleBasedMatching: S.optional(__S(295, __c18, 7)),
          DataStore: S.optional(__S(296, __c18, 8)),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetDomainResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          LayoutDefinitionName: S.String.pipe(T.HttpLabel("LayoutDefinitionName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/layouts/{LayoutDefinitionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainLayoutRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LayoutDefinitionName: S.String,
          Description: SensitiveString,
          DisplayName: S.String,
          IsDefault: S.optional(S.Boolean),
          LayoutType: S.String,
          Layout: SensitiveString,
          Version: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetDomainLayoutResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/domain-object-types/{ObjectTypeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainObjectTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.String,
          Description: S.optional(SensitiveString),
          EncryptionKey: S.optional(S.String),
          Fields: S.optional(__S(1281, __c80, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetDomainObjectTypeResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Source: S.String,
          Target: S.String,
          ContentType: S.optional(S.String),
          FeatureType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainObjectTypeField" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(1280, __c80, 0).pipe(S.optional));
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EventStreamName: S.String.pipe(T.HttpLabel("EventStreamName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/event-streams/{EventStreamName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Uri: S.String,
          Status: S.String,
          UnhealthySince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventStreamDestinationDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          EventStreamArn: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          State: S.String,
          StoppedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DestinationDetails: __S(1297, __c81, 1),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetEventStreamResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          KeyName: S.String,
          Values: __S(1328, __c83, 0),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/keys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddProfileKeyRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyName: S.optional(S.String), Values: S.optional(__S(1328, __c83, 0)) }),
      ).annotate({ identifier: "AddProfileKeyResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EventTriggerName: S.String.pipe(T.HttpLabel("EventTriggerName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/event-triggers/{EventTriggerName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventTriggerRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/identity-resolution-jobs/{JobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIdentityResolutionJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          JobId: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          JobStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AutoMerging: S.optional(__S(304, __c19, 0)),
          ExportingLocation: S.optional(__S(1393, __c87, 1)),
          JobStats: S.optional(__S(1394, __c87, 2)),
        }),
      ).annotate({ identifier: "GetIdentityResolutionJobResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3BucketName: S.optional(S.String), S3KeyName: S.optional(S.String) }),
      ).annotate({ identifier: "S3ExportingLocation" });
    case 1:
      return S.suspend(() => S.Struct({ S3Exporting: S.optional(__S(1392, __c87, 0)) })).annotate({
        identifier: "ExportingLocation",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NumberOfProfilesReviewed: S.optional(S.Number),
          NumberOfMatchesFound: S.optional(S.Number),
          NumberOfMergesDone: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobStats" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")), Uri: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntegrationRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          Uri: S.String,
          ObjectTypeName: S.optional(S.String),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Tags: S.optional(__S(2032, __c127, 0)),
          ObjectTypeNames: S.optional(__S(2032, __c127, 0)),
          WorkflowId: S.optional(S.String),
          IsUnstructured: S.optional(S.Boolean),
          RoleArn: S.optional(S.String),
          EventTriggerNames: S.optional(__S(1328, __c83, 0)),
          Scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetIntegrationResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/matches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMatchesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MatchId: S.optional(S.String),
          ProfileIds: S.optional(__S(1328, __c83, 0)),
          ConfidenceScore: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MatchItem" });
    case 2:
      return S.Array(__S(1441, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MatchGenerationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PotentialMatches: S.optional(S.Number),
          Matches: S.optional(__S(1442, __c90, 2)),
        }),
      ).annotate({ identifier: "GetMatchesResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
          AttributeName: S.String.pipe(T.HttpLabel("AttributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/object-types/{ObjectTypeName}/attributes/{AttributeName}/statistics",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectTypeAttributeStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ P5: S.Number, P25: S.Number, P50: S.Number, P75: S.Number, P95: S.Number }),
      ).annotate({ identifier: "GetObjectTypeAttributeStatisticsPercentiles" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Maximum: S.Number,
          Minimum: S.Number,
          Average: S.Number,
          StandardDeviation: S.Number,
          Percentiles: __S(1457, __c91, 1),
        }),
      ).annotate({ identifier: "GetObjectTypeAttributeStatisticsStats" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Statistics: __S(1458, __c91, 2),
          CalculatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetObjectTypeAttributeStatisticsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          Id: S.String.pipe(T.HttpLabel("Id")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/profiles/{ProfileId}/history-records/{Id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileHistoryRecordRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ObjectTypeName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActionType: S.String,
          ProfileObjectUniqueKey: S.optional(S.String),
          Content: S.optional(SensitiveString),
          PerformedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetProfileHistoryRecordResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/object-types/{ObjectTypeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileObjectTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.String,
          Description: SensitiveString,
          TemplateId: S.optional(S.String),
          ExpirationDays: S.optional(S.Number),
          EncryptionKey: S.optional(S.String),
          AllowProfileCreation: S.optional(S.Boolean),
          SourceLastUpdatedTimestampFormat: S.optional(S.String),
          MaxAvailableProfileObjectCount: S.optional(S.Number),
          MaxProfileObjectCount: S.optional(S.Number),
          SourcePriority: S.optional(S.Number),
          Fields: S.optional(__S(801, __c50, 1)),
          Keys: S.optional(__S(1138, __c71, 2)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetProfileObjectTypeResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateId: S.String.pipe(T.HttpLabel("TemplateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templates/{TemplateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileObjectTypeTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateId: S.optional(S.String),
          SourceName: S.optional(S.String),
          SourceObject: S.optional(S.String),
          AllowProfileCreation: S.optional(S.Boolean),
          SourceLastUpdatedTimestampFormat: S.optional(S.String),
          Fields: S.optional(__S(801, __c50, 1)),
          Keys: S.optional(__S(1138, __c71, 2)),
        }),
      ).annotate({ identifier: "GetProfileObjectTypeTemplateResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MetadataColumns: S.optional(__S(1328, __c83, 0)) }),
      ).annotate({ identifier: "MetadataConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          RecommenderName: S.String,
          Context: S.optional(__S(2032, __c127, 0)),
          RecommenderFilters: S.optional(__S(1538, __c96, 2)),
          RecommenderPromotionalFilters: S.optional(__S(1540, __c96, 4)),
          CandidateIds: S.optional(__S(1328, __c83, 0)),
          MaxResults: S.optional(S.Number),
          MetadataConfig: S.optional(__S(1520, __c95, 0)),
          DiversityConfig: S.optional(__S(1542, __c96, 6)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/profiles/{ProfileId}/recommendations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileRecommendationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Recommendations: S.optional(__S(1545, __c96, 9)) }),
      ).annotate({ identifier: "GetProfileRecommendationsResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(1536, __c96, 0)) }),
      ).annotate({ identifier: "RecommenderFilter" });
    case 2:
      return S.Array(__S(1537, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Values: S.optional(__S(1536, __c96, 0)),
          PromotionName: S.optional(S.String),
          PercentPromotedItems: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RecommenderPromotionalFilter" });
    case 4:
      return S.Array(__S(1539, __c96, 3));
    case 5:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Values: S.optional(__S(1541, __c96, 5)) }),
      ).annotate({ identifier: "RecommendationDiversityConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
          Code: S.optional(SensitiveString),
          Type: S.optional(SensitiveString),
          Category: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          AdditionalInformation: S.optional(SensitiveString),
          ImageLink: S.optional(SensitiveString),
          Link: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Price: S.optional(SensitiveString),
          Attributes: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "CatalogItem" });
    case 8:
      return S.suspend(() =>
        S.Struct({ CatalogItem: S.optional(__S(1543, __c96, 7)), Score: S.optional(S.Number) }),
      ).annotate({ identifier: "Recommendation" });
    case 9:
      return S.Array(__S(1544, __c96, 8));
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderName: S.String.pipe(T.HttpLabel("RecommenderName")),
          TrainingMetricsCount: S.optional(S.Number).pipe(T.HttpQuery("training-metrics-count")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/recommenders/{RecommenderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommenderRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Metrics: S.optional(__S(1553, __c97, 1)),
          RecommenderVersionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrainingMetrics" });
    case 3:
      return S.Array(__S(1554, __c97, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RecommenderName: S.String,
          RecommenderRecipeName: S.String,
          RecommenderSchemaName: S.optional(S.String),
          RecommenderConfig: S.optional(__S(632, __c39, 8)),
          Description: S.optional(SensitiveString),
          Status: S.optional(S.String),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          LatestRecommenderUpdate: S.optional(__S(1568, __c98, 0)),
          ActiveRecommenderVersionName: S.optional(S.String),
          TrainingMetrics: S.optional(__S(1555, __c97, 3)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "GetRecommenderResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecommenderConfig: S.optional(__S(632, __c39, 8)),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
          RecommenderVersionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommenderUpdate" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DestinationArn: S.String,
          DestinationRoleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/segment-streams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateStreamForSegmentsRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateStreamForSegmentsResponse",
      });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderFilterName: S.String.pipe(T.HttpLabel("RecommenderFilterName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/recommender-filters/{RecommenderFilterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommenderFilterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommenderFilterName: S.String,
          RecommenderFilterExpression: SensitiveString,
          RecommenderSchemaName: S.optional(S.String),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          Description: S.optional(SensitiveString),
          FailureReason: S.optional(S.String),
          Tags: __S(2032, __c127, 0),
        }),
      ).annotate({ identifier: "GetRecommenderFilterResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          RecommenderSchemaName: S.String.pipe(T.HttpLabel("RecommenderSchemaName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/recommender-schemas/{RecommenderSchemaName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommenderSchemaRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecommenderSchemaName: S.String,
          Fields: __S(674, __c42, 2),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
        }),
      ).annotate({ identifier: "GetRecommenderSchemaResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSegmentDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SegmentDefinitionName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          SegmentGroups: S.optional(__S(731, __c45, 11)),
          SegmentSort: S.optional(__S(738, __c46, 2)),
          SegmentDefinitionArn: S.String,
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
          SegmentSqlQuery: S.optional(SensitiveString),
          SegmentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSegmentDefinitionResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          EstimateId: S.String.pipe(T.HttpLabel("EstimateId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/segment-estimates/{EstimateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSegmentEstimateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          EstimateId: S.optional(S.String),
          Status: S.optional(S.String),
          Estimate: S.optional(S.String),
          Message: S.optional(S.String),
          StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
        }),
      ).annotate({ identifier: "GetSegmentEstimateResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
          ProfileIds: __S(1328, __c83, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/segments/{SegmentDefinitionName}/membership",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSegmentMembershipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          QueryResult: S.String,
          Profile: S.optional(__S(2081, __c130, 1)),
        }),
      ).annotate({ identifier: "ProfileQueryResult" });
    case 2:
      return S.Array(__S(1697, __c106, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String, Message: S.String, Status: S.optional(S.Number) }),
      ).annotate({ identifier: "ProfileQueryFailures" });
    case 4:
      return S.Array(__S(1699, __c106, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          SegmentDefinitionName: S.optional(S.String),
          Profiles: S.optional(__S(1698, __c106, 2)),
          Failures: S.optional(__S(1700, __c106, 4)),
          LastComputedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetSegmentMembershipResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
          SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/segments/{SegmentDefinitionName}/snapshots/{SnapshotId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSegmentSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.String,
          Status: S.String,
          StatusMessage: S.optional(S.String),
          DataFormat: S.String,
          EncryptionKey: S.optional(S.String),
          RoleArn: S.optional(S.String),
          DestinationUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSegmentSnapshotResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}/subscriptions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSegmentSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextExecutedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastExecutedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ScheduledExecutions" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          ScheduleConfiguration: S.optional(__S(1744, __c109, 0)),
          ScheduledExecutions: S.optional(__S(1729, __c108, 1)),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetSegmentSubscriptionResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Interval: S.Number, Unit: S.optional(S.String) })).annotate(
        { identifier: "ScheduleConfiguration" },
      );
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MatchType: S.String,
          SearchKey: S.String,
          SearchValue: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/matches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSimilarProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileIds: S.optional(__S(1328, __c83, 0)),
          MatchId: S.optional(S.String),
          MatchType: S.optional(S.String),
          RuleLevel: S.optional(S.Number),
          ConfidenceScore: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSimilarProfilesResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/segment-streams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStreamForSegmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SegmentName: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedSegment" });
    case 2:
      return S.Array(__S(1777, __c111, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssociatedSegments: S.optional(__S(1778, __c111, 2)),
          DomainName: S.optional(S.String),
          DestinationArn: S.optional(S.String),
          DestinationRoleArn: S.optional(S.String),
          State: S.optional(S.String),
          DisassociatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetStreamForSegmentsResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/upload-jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUploadJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdatedRecords: S.optional(S.Number),
          CreatedRecords: S.optional(S.Number),
          FailedRecords: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResultsSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Fields: S.optional(__S(801, __c50, 1)),
          UniqueKey: S.optional(S.String),
          ResultsSummary: S.optional(__S(1793, __c112, 1)),
          DataExpiry: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetUploadJobResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.String.pipe(T.HttpLabel("CalculatedAttributeName")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileIds: __S(1328, __c83, 0),
          ConditionOverrides: S.optional(__S(1825, __c114, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{DomainName}/calculated-attributes/{CalculatedAttributeName}/batch-get-for-profiles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetCalculatedAttributeForProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Message: S.String, ProfileId: S.String }),
      ).annotate({ identifier: "BatchGetCalculatedAttributeForProfileError" });
    case 2:
      return S.Array(__S(1809, __c113, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          IsDataPartial: S.optional(S.String),
          ProfileId: S.optional(S.String),
          Value: S.optional(S.String),
          LastObjectTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CalculatedAttributeValue" });
    case 4:
      return S.Array(__S(1811, __c113, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Errors: S.optional(__S(1810, __c113, 2)),
          CalculatedAttributeValues: S.optional(__S(1812, __c113, 4)),
          ConditionOverrides: S.optional(__S(1825, __c114, 1)),
        }),
      ).annotate({ identifier: "BatchGetCalculatedAttributeForProfileResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Start: S.Number, End: S.optional(S.Number), Unit: S.String }),
      ).annotate({ identifier: "RangeOverride" });
    case 1:
      return S.suspend(() => S.Struct({ Range: S.optional(__S(1824, __c114, 0)) })).annotate({
        identifier: "ConditionOverrides",
      });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/upload-jobs/{JobId}/path" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUploadJobPathRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Url: S.String,
          ClientToken: S.optional(S.String),
          ValidUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetUploadJobPathResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          WorkflowId: S.String.pipe(T.HttpLabel("WorkflowId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/workflows/{WorkflowId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceConnectorType: S.String,
          ConnectorProfileName: S.String,
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppflowIntegrationWorkflowAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({ AppflowIntegration: S.optional(__S(1857, __c116, 1)) }),
      ).annotate({ identifier: "WorkflowAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({ RecordsProcessed: S.Number, StepsCompleted: S.Number, TotalSteps: S.Number }),
      ).annotate({ identifier: "AppflowIntegrationWorkflowMetrics" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AppflowIntegration: S.optional(__S(1859, __c116, 3)) }),
      ).annotate({ identifier: "WorkflowMetrics" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          WorkflowId: S.optional(S.String),
          WorkflowType: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorDescription: S.optional(S.String),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Attributes: S.optional(__S(1858, __c116, 2)),
          Metrics: S.optional(__S(1860, __c116, 4)),
        }),
      ).annotate({ identifier: "GetWorkflowResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          WorkflowId: S.String.pipe(T.HttpLabel("WorkflowId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/workflows/{WorkflowId}/steps" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowName: S.String,
          Status: S.String,
          ExecutionMessage: S.String,
          RecordsProcessed: S.Number,
          BatchRecordsStartTime: S.String,
          BatchRecordsEndTime: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AppflowIntegrationWorkflowStep" });
    case 2:
      return S.suspend(() =>
        S.Struct({ AppflowIntegration: S.optional(__S(1873, __c117, 1)) }),
      ).annotate({ identifier: "WorkflowStepItem" });
    case 3:
      return S.Array(__S(1874, __c117, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          WorkflowId: S.optional(S.String),
          WorkflowType: S.optional(S.String),
          Items: S.optional(__S(1875, __c117, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWorkflowStepsResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Uri: S.String,
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          IncludeHidden: S.optional(S.Boolean).pipe(T.HttpQuery("include-hidden")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/integrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccountIntegrationsRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1424, __c89, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1904, __c119, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountIntegrationsResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/calculated-attributes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCalculatedAttributeDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatedAttributeName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UseHistoricalData: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "ListCalculatedAttributeDefinitionItem" });
    case 2:
      return S.Array(__S(1921, __c120, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1922, __c120, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCalculatedAttributeDefinitionsResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/profile/{ProfileId}/calculated-attributes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCalculatedAttributesForProfileRequest" });
    case 1:
      return S.Array(__S(1216, __c76, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1937, __c121, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCalculatedAttributesForProfileResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/layouts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainLayoutsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LayoutDefinitionName: S.String,
          Description: SensitiveString,
          DisplayName: S.String,
          IsDefault: S.optional(S.Boolean),
          LayoutType: S.String,
          Tags: S.optional(__S(2032, __c127, 0)),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "LayoutItem" });
    case 2:
      return S.Array(__S(1953, __c122, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1954, __c122, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainLayoutsResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/domain-object-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainObjectTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.String,
          Description: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "DomainObjectTypesListItem" });
    case 2:
      return S.Array(__S(1969, __c123, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1970, __c123, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainObjectTypesResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/domains" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "ListDomainItem" });
    case 2:
      return S.Array(__S(1985, __c124, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(1986, __c124, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/event-streams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventStreamsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Uri: S.String,
          Status: S.String,
          UnhealthySince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DestinationSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          EventStreamName: S.String,
          EventStreamArn: S.String,
          State: S.String,
          StoppedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DestinationSummary: S.optional(__S(2001, __c125, 1)),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "EventStreamSummary" });
    case 3:
      return S.Array(__S(2002, __c125, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2003, __c125, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventStreamsResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileIds: __S(1328, __c83, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/batch-get-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Message: S.String, ProfileId: S.String }),
      ).annotate({ identifier: "BatchGetProfileError" });
    case 2:
      return S.Array(__S(2017, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Errors: S.optional(__S(2018, __c126, 2)),
          Profiles: S.optional(__S(2048, __c128, 0)),
        }),
      ).annotate({ identifier: "BatchGetProfileResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2081, __c130, 1));
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Address1: S.optional(S.String),
          Address2: S.optional(S.String),
          Address3: S.optional(S.String),
          Address4: S.optional(S.String),
          City: S.optional(S.String),
          County: S.optional(S.String),
          State: S.optional(S.String),
          Province: S.optional(S.String),
          Country: S.optional(S.String),
          PostalCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Address" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyName: S.optional(S.String),
          KeyValue: S.optional(S.String),
          ProfileId: S.optional(S.String),
          ContactType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContactPreference" });
    case 2:
      return S.Array(__S(2065, __c129, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Phone: S.optional(__S(2066, __c129, 2)),
          Email: S.optional(__S(2066, __c129, 2)),
        }),
      ).annotate({ identifier: "EngagementPreferences" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1344, __c84, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.optional(S.String),
          AccountNumber: S.optional(SensitiveString),
          AdditionalInformation: S.optional(SensitiveString),
          PartyType: S.optional(S.String),
          BusinessName: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          MiddleName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BirthDate: S.optional(SensitiveString),
          Gender: S.optional(S.String),
          PhoneNumber: S.optional(SensitiveString),
          MobilePhoneNumber: S.optional(SensitiveString),
          HomePhoneNumber: S.optional(SensitiveString),
          BusinessPhoneNumber: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          PersonalEmailAddress: S.optional(SensitiveString),
          BusinessEmailAddress: S.optional(SensitiveString),
          Address: S.optional(__S(2064, __c129, 0)),
          ShippingAddress: S.optional(__S(2064, __c129, 0)),
          MailingAddress: S.optional(__S(2064, __c129, 0)),
          BillingAddress: S.optional(__S(2064, __c129, 0)),
          Attributes: S.optional(__S(2032, __c127, 0)),
          FoundByItems: S.optional(__S(2080, __c130, 0)),
          PartyTypeString: S.optional(SensitiveString),
          GenderString: S.optional(SensitiveString),
          ProfileType: S.optional(S.String),
          EngagementPreferences: S.optional(__S(2067, __c129, 3)),
        }),
      ).annotate({ identifier: "Profile" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/event-triggers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventTriggersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.optional(S.String),
          EventTriggerName: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "EventTriggerSummaryItem" });
    case 2:
      return S.Array(__S(2097, __c131, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2098, __c131, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventTriggersResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/identity-resolution-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIdentityResolutionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          JobId: S.optional(S.String),
          Status: S.optional(S.String),
          JobStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobStats: S.optional(__S(1394, __c87, 2)),
          ExportingLocation: S.optional(__S(1393, __c87, 1)),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityResolutionJob" });
    case 2:
      return S.Array(__S(2113, __c132, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IdentityResolutionJobsList: S.optional(__S(2114, __c132, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIdentityResolutionJobsResponse" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          IncludeHidden: S.optional(S.Boolean).pipe(T.HttpQuery("include-hidden")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIntegrationsRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/object-types/{ObjectTypeName}/attributes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListObjectTypeAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.String,
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ListObjectTypeAttributeItem" });
    case 2:
      return S.Array(__S(2145, __c134, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2146, __c134, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListObjectTypeAttributesResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String.pipe(T.HttpLabel("ObjectTypeName")),
          AttributeName: S.String.pipe(T.HttpLabel("AttributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/object-types/{ObjectTypeName}/attributes/{AttributeName}/values",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListObjectTypeAttributeValuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: SensitiveString,
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ListObjectTypeAttributeValuesItem" });
    case 2:
      return S.Array(__S(2161, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2162, __c135, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListObjectTypeAttributeValuesResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          AttributeName: S.String.pipe(T.HttpLabel("AttributeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/profile-attributes/{AttributeName}/values",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ProfileAttributeValuesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Value: S.optional(S.String) })).annotate({
        identifier: "AttributeValueItem",
      });
    case 2:
      return S.Array(__S(2177, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          AttributeName: S.optional(S.String),
          Items: S.optional(__S(2178, __c136, 2)),
          StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
        }),
      ).annotate({ identifier: "ProfileAttributeValuesResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ProfileId: S.String,
          ObjectTypeName: S.optional(S.String),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          ActionType: S.optional(S.String),
          PerformedBy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/history-records" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfileHistoryRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ObjectTypeName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActionType: S.String,
          ProfileObjectUniqueKey: S.optional(S.String),
          PerformedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProfileHistoryRecord" });
    case 2:
      return S.Array(__S(2193, __c137, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProfileHistoryRecords: S.optional(__S(2194, __c137, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfileHistoryRecordsResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String,
          ProfileId: S.String,
          ObjectFilter: S.optional(__S(2224, __c139, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/profiles/objects" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfileObjectsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.optional(S.String),
          ProfileObjectUniqueKey: S.optional(S.String),
          Object: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListProfileObjectsItem" });
    case 2:
      return S.Array(__S(2209, __c138, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2210, __c138, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProfileObjectsResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KeyName: S.String, Values: __S(1328, __c83, 0) })).annotate(
        { identifier: "ObjectFilter" },
      );
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/object-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfileObjectTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectTypeName: S.String,
          Description: S.String,
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxProfileObjectCount: S.optional(S.Number),
          MaxAvailableProfileObjectCount: S.optional(S.Number),
          SourcePriority: S.optional(S.Number),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "ListProfileObjectTypeItem" });
    case 2:
      return S.Array(__S(2241, __c140, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2242, __c140, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProfileObjectTypesResponse" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/templates" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProfileObjectTypeTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateId: S.optional(S.String),
          SourceName: S.optional(S.String),
          SourceObject: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfileObjectTypeTemplateItem" });
    case 2:
      return S.Array(__S(2257, __c141, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2258, __c141, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProfileObjectTypeTemplatesResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String, Object: SensitiveString })).annotate({
        identifier: "BatchPutProfileObjectRequestItem",
      });
    case 1:
      return S.Array(__S(2272, __c142, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ObjectTypeName: S.String,
          Items: __S(2273, __c142, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{DomainName}/profiles/objects/batch-put-profile-object",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchPutProfileObjectRequest" });
    case 3:
      return S.suspend(() => S.Struct({ Id: S.String, ProfileObjectUniqueKey: S.String })).annotate(
        { identifier: "BatchPutProfileObjectResponseItem" },
      );
    case 4:
      return S.Array(__S(2275, __c142, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Code: S.Number, Message: S.optional(S.String) }),
      ).annotate({ identifier: "BatchPutProfileObjectErrorItem" });
    case 6:
      return S.Array(__S(2277, __c142, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Successful: S.optional(__S(2276, __c142, 4)),
          Failed: S.optional(__S(2278, __c142, 6)),
        }),
      ).annotate({ identifier: "BatchPutProfileObjectResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/recommender-filters" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommenderFiltersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommenderFilterName: S.optional(S.String),
          RecommenderSchemaName: S.optional(S.String),
          RecommenderFilterExpression: S.optional(SensitiveString),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(SensitiveString),
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
          Tags: S.optional(__S(2032, __c127, 0)),
        }),
      ).annotate({ identifier: "RecommenderFilterSummary" });
    case 2:
      return S.Array(__S(2289, __c143, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecommenderFilters: S.optional(__S(2290, __c143, 2)),
        }),
      ).annotate({ identifier: "ListRecommenderFiltersResponse" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/recommender-recipes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommenderRecipesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), description: S.optional(S.String) }),
      ).annotate({ identifier: "RecommenderRecipe" });
    case 2:
      return S.Array(__S(2305, __c144, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecommenderRecipes: S.optional(__S(2306, __c144, 2)),
        }),
      ).annotate({ identifier: "ListRecommenderRecipesResponse" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/recommenders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommenderName: S.optional(S.String),
          RecipeName: S.optional(S.String),
          RecommenderSchemaName: S.optional(S.String),
          RecommenderConfig: S.optional(__S(632, __c39, 8)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(SensitiveString),
          Status: S.optional(S.String),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
          FailureReason: S.optional(S.String),
          LatestRecommenderUpdate: S.optional(__S(1568, __c98, 0)),
        }),
      ).annotate({ identifier: "RecommenderSummary" });
    case 2:
      return S.Array(__S(2321, __c145, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Recommenders: S.optional(__S(2322, __c145, 2)),
        }),
      ).annotate({ identifier: "ListRecommendersResponse" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/recommender-schemas" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommenderSchemasRequest" });
    case 1:
      return S.Array(__S(1648, __c103, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecommenderSchemas: S.optional(__S(2337, __c146, 1)),
        }),
      ).annotate({ identifier: "ListRecommenderSchemasResponse" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/profiles/ruleBasedMatches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRuleBasedMatchesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MatchIds: S.optional(__S(1328, __c83, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRuleBasedMatchesResponse" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/segment-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSegmentDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SegmentDefinitionName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(SensitiveString),
          SegmentDefinitionArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(2032, __c127, 0)),
          SegmentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SegmentDefinitionItem" });
    case 2:
      return S.Array(__S(2369, __c148, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Items: S.optional(__S(2370, __c148, 2)) }),
      ).annotate({ identifier: "ListSegmentDefinitionsResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          SegmentDefinitionName: S.String.pipe(T.HttpLabel("SegmentDefinitionName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/domains/{DomainName}/segment-definitions/{SegmentDefinitionName}/subscription-events",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSegmentSubscriptionEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventType: S.optional(S.String),
          Event: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubscriptionEventItem" });
    case 2:
      return S.Array(__S(2385, __c149, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Events: S.optional(__S(2386, __c149, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSegmentSubscriptionEventsResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(2032, __c127, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domains/{DomainName}/upload-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUploadJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataExpiry: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UploadJobItem" });
    case 2:
      return S.Array(__S(2417, __c151, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Items: S.optional(__S(2418, __c151, 2)) }),
      ).annotate({ identifier: "ListUploadJobsResponse" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          WorkflowType: S.optional(S.String),
          Status: S.optional(S.String),
          QueryStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          QueryEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{DomainName}/workflows" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowType: S.String,
          WorkflowId: S.String,
          Status: S.String,
          StatusDescription: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ListWorkflowsItem" });
    case 2:
      return S.Array(__S(2433, __c152, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(2434, __c152, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
