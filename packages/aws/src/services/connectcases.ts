import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ConnectCases",
  serviceShapeName: "AmazonConnectCases",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cases" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-10-03");
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
              `https://cases-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://cases-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://cases.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cases.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cases.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ConnectCases",
  service: "ConnectCases",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainId = string;
export type ContactArn = string;
export interface Contact {
  contactArn: string;
}
export type CommentBody = string;
export type CommentBodyTextType = string;
export interface CommentContent {
  body: string;
  contentType: string;
}
export type FileArn = string;
export interface FileContent {
  fileArn: string;
}
export type SlaName = string | redacted.Redacted<string>;
export type SlaType = string;
export type FieldId = string;
export interface EmptyFieldValue {}
export type FieldValueUnion =
  | {
      stringValue: string;
      doubleValue?: undefined;
      booleanValue?: undefined;
      emptyValue?: undefined;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue: number;
      booleanValue?: undefined;
      emptyValue?: undefined;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue?: undefined;
      booleanValue: boolean;
      emptyValue?: undefined;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue?: undefined;
      booleanValue?: undefined;
      emptyValue: EmptyFieldValue;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue?: undefined;
      booleanValue?: undefined;
      emptyValue?: undefined;
      userArnValue: string;
    };
export type SlaFieldValueUnionList = FieldValueUnion[];
export type TargetSlaMinutes = number;
export interface SlaInputConfiguration {
  name: string | redacted.Redacted<string>;
  type: string;
  fieldId?: string | undefined;
  targetFieldValues?: FieldValueUnion[] | undefined;
  targetSlaMinutes: number;
}
export type SlaInputContent = { slaInputConfiguration: SlaInputConfiguration };
export type CaseId = string;
export interface ConnectCaseInputContent {
  caseId: string;
}
export interface FieldValue {
  id: string;
  value: FieldValueUnion;
}
export type FieldValueList = FieldValue[];
export interface CustomInputContent {
  fields: FieldValue[];
}
export type RelatedItemInputContent =
  | {
      contact: Contact;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment: CommentContent;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file: FileContent;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla: SlaInputContent;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase: ConnectCaseInputContent;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom: CustomInputContent;
    };
export type ReferenceId = string;
export type CaseIdentifierUnion =
  | { caseId: string; referenceId?: undefined }
  | { caseId?: undefined; referenceId: string };
export interface BatchCreateRelatedItemIdentifier {
  caseIdentifier: CaseIdentifierUnion;
}
export type BatchCreateRelatedItemIdentifierList = BatchCreateRelatedItemIdentifier[];
export type UserArn = string;
export type CustomEntity = string | redacted.Redacted<string>;
export type UserUnion =
  | { userArn: string; customEntity?: undefined }
  | { userArn?: undefined; customEntity: string | redacted.Redacted<string> };
export interface BatchCreateRelatedItemRequest {
  domainId: string;
  content: RelatedItemInputContent;
  cases: BatchCreateRelatedItemIdentifier[];
  performedBy?: UserUnion | undefined;
  clientToken?: string | undefined;
}
export type ReferenceNumber = string;
export interface CaseIdentifier {
  caseId?: string | undefined;
  referenceNumber?: string | undefined;
  referenceId?: string | undefined;
}
export type RelatedItemId = string;
export type RelatedItemArn = string;
export interface BatchCreateRelatedItemSuccessEntry {
  caseIdentifier: CaseIdentifier;
  relatedItemId: string;
  relatedItemArn: string;
}
export type BatchCreateRelatedItemSuccessEntryList = BatchCreateRelatedItemSuccessEntry[];
export interface BatchCreateRelatedItemErrorEntry {
  caseIdentifier: CaseIdentifier;
  errorCode: string;
  errorMessage: string;
}
export type BatchCreateRelatedItemErrorEntryList = BatchCreateRelatedItemErrorEntry[];
export interface BatchCreateRelatedItemResponse {
  successfulItems: BatchCreateRelatedItemSuccessEntry[];
  failedItems: BatchCreateRelatedItemErrorEntry[];
}
export type CaseRuleId = string;
export interface CaseRuleIdentifier {
  id: string;
}
export type CaseRuleIdentifierList = CaseRuleIdentifier[];
export interface BatchGetCaseRuleRequest {
  domainId: string;
  caseRules: CaseRuleIdentifier[];
}
export type CaseRuleName = string;
export type CaseRuleArn = string;
export type OperandOne = { fieldId: string };
export interface EmptyOperandValue {}
export type OperandTwo =
  | {
      stringValue: string;
      booleanValue?: undefined;
      doubleValue?: undefined;
      emptyValue?: undefined;
    }
  | {
      stringValue?: undefined;
      booleanValue: boolean;
      doubleValue?: undefined;
      emptyValue?: undefined;
    }
  | {
      stringValue?: undefined;
      booleanValue?: undefined;
      doubleValue: number;
      emptyValue?: undefined;
    }
  | {
      stringValue?: undefined;
      booleanValue?: undefined;
      doubleValue?: undefined;
      emptyValue: EmptyOperandValue;
    };
export interface BooleanOperands {
  operandOne: OperandOne;
  operandTwo: OperandTwo;
  result: boolean;
}
export interface CompoundCondition {
  conditions: BooleanCondition[];
}
export type BooleanCondition =
  | { equalTo: BooleanOperands; notEqualTo?: undefined; andAll?: undefined; orAll?: undefined }
  | { equalTo?: undefined; notEqualTo: BooleanOperands; andAll?: undefined; orAll?: undefined }
  | { equalTo?: undefined; notEqualTo?: undefined; andAll: CompoundCondition; orAll?: undefined }
  | { equalTo?: undefined; notEqualTo?: undefined; andAll?: undefined; orAll: CompoundCondition };
export type BooleanConditionList = BooleanCondition[];
export interface RequiredCaseRule {
  defaultValue: boolean;
  conditions: BooleanCondition[];
}
export type ParentChildFieldOptionValue = string;
export type ParentChildFieldOptionValueList = string[];
export interface ParentChildFieldOptionsMapping {
  parentFieldOptionValue: string;
  childFieldOptionValues: string[];
}
export type ParentChildFieldOptionsMappingList = ParentChildFieldOptionsMapping[];
export interface FieldOptionsCaseRule {
  parentFieldId?: string | undefined;
  childFieldId?: string | undefined;
  parentChildFieldOptionsMappings: ParentChildFieldOptionsMapping[];
}
export interface HiddenCaseRule {
  defaultValue: boolean;
  conditions: BooleanCondition[];
}
export type CaseRuleDetails =
  | { required: RequiredCaseRule; fieldOptions?: undefined; hidden?: undefined }
  | { required?: undefined; fieldOptions: FieldOptionsCaseRule; hidden?: undefined }
  | { required?: undefined; fieldOptions?: undefined; hidden: HiddenCaseRule };
export type CaseRuleDescription = string;
export type Deleted = boolean;
export type CreatedTime = Date;
export type LastModifiedTime = Date;
export type Tags = { [key: string]: string | undefined };
export interface GetCaseRuleResponse {
  caseRuleId: string;
  name: string;
  caseRuleArn: string;
  rule: CaseRuleDetails;
  description?: string | undefined;
  deleted?: boolean | undefined;
  createdTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type BatchGetCaseRuleList = GetCaseRuleResponse[];
export interface CaseRuleError {
  id: string;
  errorCode: string;
  message?: string | undefined;
}
export type BatchGetCaseRuleErrorList = CaseRuleError[];
export type BatchGetCaseRuleUnprocessedList = string[];
export interface BatchGetCaseRuleResponse {
  caseRules: GetCaseRuleResponse[];
  errors: CaseRuleError[];
  unprocessedCaseRules?: string[] | undefined;
}
export interface FieldIdentifier {
  id: string;
}
export type BatchGetFieldIdentifierList = FieldIdentifier[];
export interface BatchGetFieldRequest {
  domainId: string;
  fields: FieldIdentifier[];
}
export type FieldName = string;
export type FieldArn = string;
export type FieldDescription = string;
export type FieldType = string;
export type FieldNamespace = string;
export interface TextAttributes {
  isMultiline: boolean;
}
export type FieldAttributes = { text: TextAttributes };
export interface GetFieldResponse {
  fieldId: string;
  name: string;
  fieldArn: string;
  description?: string | undefined;
  type: string;
  namespace: string;
  tags?: { [key: string]: string | undefined } | undefined;
  deleted?: boolean | undefined;
  createdTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
  attributes?: FieldAttributes | undefined;
}
export type BatchGetFieldList = GetFieldResponse[];
export interface FieldError {
  id: string;
  errorCode: string;
  message?: string | undefined;
}
export type BatchGetFieldErrorList = FieldError[];
export interface BatchGetFieldResponse {
  fields: GetFieldResponse[];
  errors: FieldError[];
}
export type FieldOptionName = string;
export type FieldOptionValue = string;
export interface FieldOption {
  name: string;
  value: string;
  active: boolean;
}
export type FieldOptionsList = FieldOption[];
export interface BatchPutFieldOptionsRequest {
  domainId: string;
  fieldId: string;
  options: FieldOption[];
}
export interface FieldOptionError {
  message: string;
  errorCode: string;
  value: string;
}
export type FieldOptionErrorList = FieldOptionError[];
export interface BatchPutFieldOptionsResponse {
  errors?: FieldOptionError[] | undefined;
}
export interface BatchUpdateCaseIdentifier {
  caseIdentifier: CaseIdentifierUnion;
}
export type BatchUpdateCaseIdentifierList = BatchUpdateCaseIdentifier[];
export type FieldIdentifierUnion =
  | { id: string; name?: undefined }
  | { id?: undefined; name: string };
export interface FieldValueInput {
  fieldIdentifier: FieldIdentifierUnion;
  value: FieldValueUnion;
}
export type FieldValueInputList = FieldValueInput[];
export type CaseTitle = string | redacted.Redacted<string>;
export type CaseStatus = string;
export type CustomerProfileArn = string;
export interface BatchUpdateCaseRequest {
  domainId: string;
  cases: BatchUpdateCaseIdentifier[];
  fields: FieldValueInput[];
  performedBy?: UserUnion | undefined;
  title?: string | redacted.Redacted<string> | undefined;
  status?: string | undefined;
  customerId?: string | undefined;
  clientToken?: string | undefined;
}
export interface BatchUpdateCaseSuccessEntry {
  caseIdentifier: CaseIdentifier;
}
export type BatchUpdateCaseSuccessEntryList = BatchUpdateCaseSuccessEntry[];
export interface BatchUpdateCaseErrorEntry {
  caseIdentifier: CaseIdentifier;
  errorCode: string;
  errorMessage: string;
}
export type BatchUpdateCaseErrorEntryList = BatchUpdateCaseErrorEntry[];
export interface BatchUpdateCaseResponse {
  successfulCases: BatchUpdateCaseSuccessEntry[];
  failedCases: BatchUpdateCaseErrorEntry[];
}
export type TemplateId = string;
export type MutableTagKey = string;
export type TagValueString = string;
export type MutableTags = { [key: string]: string | undefined };
export interface CreateCaseRequest {
  domainId: string;
  templateId: string;
  fields: FieldValue[];
  clientToken?: string | undefined;
  performedBy?: UserUnion | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type CaseArn = string;
export interface CreateCaseResponse {
  caseId: string;
  caseArn: string;
}
export interface CreateCaseRuleRequest {
  domainId: string;
  name: string;
  description?: string | undefined;
  rule: CaseRuleDetails;
}
export interface CreateCaseRuleResponse {
  caseRuleId: string;
  caseRuleArn: string;
}
export type DomainName = string;
export interface CreateDomainRequest {
  name: string;
}
export type DomainArn = string;
export type DomainStatus = string;
export interface CreateDomainResponse {
  domainId: string;
  domainArn: string;
  domainStatus: string;
}
export interface CreateFieldRequest {
  domainId: string;
  name: string;
  type: string;
  description?: string | undefined;
  attributes?: FieldAttributes | undefined;
}
export interface CreateFieldResponse {
  fieldId: string;
  fieldArn: string;
}
export type LayoutName = string;
export interface FieldItem {
  id: string;
}
export type FieldList = FieldItem[];
export interface FieldGroup {
  name?: string | undefined;
  fields: FieldItem[];
}
export type Section = { fieldGroup: FieldGroup };
export type SectionsList = Section[];
export interface LayoutSections {
  sections?: Section[] | undefined;
}
export interface BasicLayout {
  topPanel?: LayoutSections | undefined;
  moreInfo?: LayoutSections | undefined;
}
export type LayoutContent = { basic: BasicLayout };
export interface CreateLayoutRequest {
  domainId: string;
  name: string;
  content: LayoutContent;
}
export type LayoutId = string;
export type LayoutArn = string;
export interface CreateLayoutResponse {
  layoutId: string;
  layoutArn: string;
}
export type RelatedItemType = string;
export interface CreateRelatedItemRequest {
  domainId: string;
  caseId: string;
  type: string;
  content: RelatedItemInputContent;
  performedBy?: UserUnion | undefined;
}
export interface CreateRelatedItemResponse {
  relatedItemId: string;
  relatedItemArn: string;
}
export type TemplateName = string;
export type TemplateDescription = string;
export interface LayoutConfiguration {
  defaultLayout?: string | undefined;
}
export interface RequiredField {
  fieldId: string;
}
export type RequiredFieldList = RequiredField[];
export type TemplateStatus = string;
export interface TemplateRule {
  caseRuleId: string;
  fieldId?: string | undefined;
}
export type TemplateCaseRuleList = TemplateRule[];
export type TagPropagationResourceType = string;
export interface TagPropagationConfiguration {
  resourceType: string;
  tagMap: { [key: string]: string | undefined };
}
export type TagPropagationConfigurationList = TagPropagationConfiguration[];
export interface CreateTemplateRequest {
  domainId: string;
  name: string;
  description?: string | undefined;
  layoutConfiguration?: LayoutConfiguration | undefined;
  requiredFields?: RequiredField[] | undefined;
  status?: string | undefined;
  rules?: TemplateRule[] | undefined;
  tagPropagationConfigurations?: TagPropagationConfiguration[] | undefined;
}
export type TemplateArn = string;
export interface CreateTemplateResponse {
  templateId: string;
  templateArn: string;
}
export interface DeleteCaseRequest {
  domainId: string;
  caseId: string;
}
export interface DeleteCaseResponse {}
export interface DeleteCaseRuleRequest {
  domainId: string;
  caseRuleId: string;
}
export interface DeleteCaseRuleResponse {}
export interface DeleteDomainRequest {
  domainId: string;
}
export interface DeleteDomainResponse {}
export interface DeleteFieldRequest {
  domainId: string;
  fieldId: string;
}
export interface DeleteFieldResponse {}
export interface DeleteLayoutRequest {
  domainId: string;
  layoutId: string;
}
export interface DeleteLayoutResponse {}
export interface DeleteRelatedItemRequest {
  domainId: string;
  caseId: string;
  relatedItemId: string;
}
export interface DeleteRelatedItemResponse {}
export interface DeleteTemplateRequest {
  domainId: string;
  templateId: string;
}
export interface DeleteTemplateResponse {}
export type FieldIdentifierList = FieldIdentifier[];
export type NextToken = string;
export interface GetCaseRequest {
  caseId: string;
  domainId: string;
  fields: FieldIdentifier[];
  nextToken?: string | undefined;
}
export interface GetCaseResponse {
  fields: FieldValue[];
  templateId: string;
  nextToken?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetCaseAuditEventsRequest {
  caseId: string;
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type AuditEventId = string;
export type AuditEventType = string;
export type AuditEventDateTime = Date;
export type AuditEventFieldId = string;
export type AuditEventFieldValueUnion =
  | {
      stringValue: string;
      doubleValue?: undefined;
      booleanValue?: undefined;
      emptyValue?: undefined;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue: number;
      booleanValue?: undefined;
      emptyValue?: undefined;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue?: undefined;
      booleanValue: boolean;
      emptyValue?: undefined;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue?: undefined;
      booleanValue?: undefined;
      emptyValue: EmptyFieldValue;
      userArnValue?: undefined;
    }
  | {
      stringValue?: undefined;
      doubleValue?: undefined;
      booleanValue?: undefined;
      emptyValue?: undefined;
      userArnValue: string;
    };
export interface AuditEventField {
  eventFieldId: string;
  oldValue?: AuditEventFieldValueUnion | undefined;
  newValue: AuditEventFieldValueUnion;
}
export type AuditEventFieldList = AuditEventField[];
export type IamPrincipalArn = string;
export interface AuditEventPerformedBy {
  user?: UserUnion | undefined;
  iamPrincipalArn: string;
}
export interface AuditMergeMetadata {
  mergeEventId: string;
  primaryCaseId: string;
  secondaryCaseId: string;
}
export interface AuditEvent {
  eventId: string;
  type: string;
  relatedItemType?: string | undefined;
  performedTime: Date;
  fields: AuditEventField[];
  performedBy?: AuditEventPerformedBy | undefined;
  mergeMetadata?: AuditMergeMetadata | undefined;
}
export type AuditEventsList = AuditEvent[];
export interface GetCaseAuditEventsResponse {
  nextToken?: string | undefined;
  auditEvents: AuditEvent[];
}
export interface GetCaseEventConfigurationRequest {
  domainId: string;
}
export interface CaseEventIncludedData {
  fields: FieldIdentifier[];
}
export interface RelatedItemEventIncludedData {
  includeContent: boolean;
}
export interface EventIncludedData {
  caseData?: CaseEventIncludedData | undefined;
  relatedItemData?: RelatedItemEventIncludedData | undefined;
}
export interface EventBridgeConfiguration {
  enabled: boolean;
  includedData?: EventIncludedData | undefined;
}
export interface GetCaseEventConfigurationResponse {
  eventBridge: EventBridgeConfiguration;
}
export interface GetDomainRequest {
  domainId: string;
}
export interface GetDomainResponse {
  domainId: string;
  domainArn: string;
  name: string;
  createdTime: Date;
  domainStatus: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetLayoutRequest {
  domainId: string;
  layoutId: string;
}
export interface GetLayoutResponse {
  layoutId: string;
  layoutArn: string;
  name: string;
  content: LayoutContent;
  tags?: { [key: string]: string | undefined } | undefined;
  deleted?: boolean | undefined;
  createdTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
}
export interface GetMergeCasesStatusRequest {
  domainId: string;
  caseId: string;
}
export type MergeStatus = string;
export type CaseIdList = string[];
export interface GetMergeCasesStatusResponse {
  status: string;
  primaryCaseId?: string | undefined;
  secondaryCaseIds?: string[] | undefined;
}
export interface GetTemplateRequest {
  domainId: string;
  templateId: string;
}
export interface GetTemplateResponse {
  templateId: string;
  templateArn: string;
  name: string;
  description?: string | undefined;
  layoutConfiguration?: LayoutConfiguration | undefined;
  requiredFields?: RequiredField[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  status: string;
  deleted?: boolean | undefined;
  createdTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
  rules?: TemplateRule[] | undefined;
  tagPropagationConfigurations?: TagPropagationConfiguration[] | undefined;
}
export type MaxResults = number;
export interface ListCaseRulesRequest {
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type RuleType = string;
export interface CaseRuleSummary {
  caseRuleId: string;
  name: string;
  caseRuleArn: string;
  ruleType: string;
  description?: string | undefined;
}
export type CaseRuleSummaryList = CaseRuleSummary[];
export interface ListCaseRulesResponse {
  caseRules: CaseRuleSummary[];
  nextToken?: string | undefined;
}
export interface ListCasesForContactRequest {
  domainId: string;
  contactArn: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface CaseSummary {
  caseId: string;
  templateId: string;
}
export type CaseSummaryList = CaseSummary[];
export interface ListCasesForContactResponse {
  cases: CaseSummary[];
  nextToken?: string | undefined;
}
export interface ListDomainsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface DomainSummary {
  domainId: string;
  domainArn: string;
  name: string;
}
export type DomainSummaryList = DomainSummary[];
export interface ListDomainsResponse {
  domains: DomainSummary[];
  nextToken?: string | undefined;
}
export type Value = string;
export type ValuesList = string[];
export interface ListFieldOptionsRequest {
  domainId: string;
  fieldId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  values?: string[] | undefined;
}
export interface ListFieldOptionsResponse {
  options: FieldOption[];
  nextToken?: string | undefined;
}
export interface ListFieldsRequest {
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface FieldSummary {
  fieldId: string;
  fieldArn: string;
  name: string;
  type: string;
  namespace: string;
  attributes?: FieldAttributes | undefined;
}
export type FieldSummaryList = FieldSummary[];
export interface ListFieldsResponse {
  fields: FieldSummary[];
  nextToken?: string | undefined;
}
export interface ListLayoutsRequest {
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface LayoutSummary {
  layoutId: string;
  layoutArn: string;
  name: string;
}
export type LayoutSummaryList = LayoutSummary[];
export interface ListLayoutsResponse {
  layouts: LayoutSummary[];
  nextToken?: string | undefined;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export type TemplateStatusFilters = string[];
export interface ListTemplatesRequest {
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  status?: string[] | undefined;
}
export interface TemplateSummary {
  templateId: string;
  templateArn: string;
  name: string;
  status: string;
  tagPropagationConfigurations?: TagPropagationConfiguration[] | undefined;
}
export type TemplateSummaryList = TemplateSummary[];
export interface ListTemplatesResponse {
  templates: TemplateSummary[];
  nextToken?: string | undefined;
}
export interface PutCaseEventConfigurationRequest {
  domainId: string;
  eventBridge: EventBridgeConfiguration;
}
export interface PutCaseEventConfigurationResponse {}
export type Channel = string;
export type ChannelList = string[];
export interface ContactFilter {
  channel?: string[] | undefined;
  contactArn?: string | undefined;
}
export interface CommentFilter {}
export interface FileFilter {
  fileArn?: string | undefined;
}
export type SlaStatus = string;
export interface SlaFilter {
  name?: string | redacted.Redacted<string> | undefined;
  status?: string | undefined;
}
export interface ConnectCaseFilter {
  caseId?: string | undefined;
}
export type FieldFilter =
  | {
      equalTo: FieldValue;
      contains?: undefined;
      greaterThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThan?: undefined;
      lessThanOrEqualTo?: undefined;
    }
  | {
      equalTo?: undefined;
      contains: FieldValue;
      greaterThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThan?: undefined;
      lessThanOrEqualTo?: undefined;
    }
  | {
      equalTo?: undefined;
      contains?: undefined;
      greaterThan: FieldValue;
      greaterThanOrEqualTo?: undefined;
      lessThan?: undefined;
      lessThanOrEqualTo?: undefined;
    }
  | {
      equalTo?: undefined;
      contains?: undefined;
      greaterThan?: undefined;
      greaterThanOrEqualTo: FieldValue;
      lessThan?: undefined;
      lessThanOrEqualTo?: undefined;
    }
  | {
      equalTo?: undefined;
      contains?: undefined;
      greaterThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThan: FieldValue;
      lessThanOrEqualTo?: undefined;
    }
  | {
      equalTo?: undefined;
      contains?: undefined;
      greaterThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThan?: undefined;
      lessThanOrEqualTo: FieldValue;
    };
export type CustomFieldsFilterList = CustomFieldsFilter[];
export type CustomFieldsFilter =
  | { field: FieldFilter; not?: undefined; andAll?: undefined; orAll?: undefined }
  | { field?: undefined; not: CustomFieldsFilter; andAll?: undefined; orAll?: undefined }
  | { field?: undefined; not?: undefined; andAll: CustomFieldsFilter[]; orAll?: undefined }
  | { field?: undefined; not?: undefined; andAll?: undefined; orAll: CustomFieldsFilter[] };
export interface CustomFilter {
  fields?: CustomFieldsFilter | undefined;
}
export type RelatedItemTypeFilter =
  | {
      contact: ContactFilter;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment: CommentFilter;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file: FileFilter;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla: SlaFilter;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase: ConnectCaseFilter;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom: CustomFilter;
    };
export type RelatedItemFilterList = RelatedItemTypeFilter[];
export type SearchAllRelatedItemsSortProperty = string;
export type Order = string;
export interface SearchAllRelatedItemsSort {
  sortProperty: string;
  sortOrder: string;
}
export type SearchAllRelatedItemsSortList = SearchAllRelatedItemsSort[];
export interface SearchAllRelatedItemsRequest {
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  filters?: RelatedItemTypeFilter[] | undefined;
  sorts?: SearchAllRelatedItemsSort[] | undefined;
}
export type AssociationTime = Date;
export type ConnectedToSystemTime = Date;
export interface ContactContent {
  contactArn: string;
  channel: string;
  connectedToSystemTime: Date;
}
export type SlaTargetTime = Date;
export type SlaCompletionTime = Date;
export interface SlaConfiguration {
  name: string | redacted.Redacted<string>;
  type: string;
  status: string;
  fieldId?: string | undefined;
  targetFieldValues?: FieldValueUnion[] | undefined;
  targetTime: Date;
  completionTime?: Date | undefined;
}
export interface SlaContent {
  slaConfiguration: SlaConfiguration;
}
export interface ConnectCaseContent {
  caseId: string;
}
export interface CustomContent {
  fields: FieldValue[];
}
export type RelatedItemContent =
  | {
      contact: ContactContent;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment: CommentContent;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file: FileContent;
      sla?: undefined;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla: SlaContent;
      connectCase?: undefined;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase: ConnectCaseContent;
      custom?: undefined;
    }
  | {
      contact?: undefined;
      comment?: undefined;
      file?: undefined;
      sla?: undefined;
      connectCase?: undefined;
      custom: CustomContent;
    };
export interface SearchAllRelatedItemsResponseItem {
  relatedItemId: string;
  caseId: string;
  type: string;
  associationTime: Date;
  content: RelatedItemContent;
  performedBy?: UserUnion | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type SearchAllRelatedItemsResponseItemList = SearchAllRelatedItemsResponseItem[];
export interface SearchAllRelatedItemsResponse {
  nextToken?: string | undefined;
  relatedItems: SearchAllRelatedItemsResponseItem[];
}
export type SearchTagKey = string;
export interface TagValue {
  key?: string | undefined;
  value?: string | undefined;
}
export type TagFilter = { equalTo: TagValue };
export type CaseFilterList = CaseFilter[];
export type CaseFilter =
  | { field: FieldFilter; not?: undefined; tag?: undefined; andAll?: undefined; orAll?: undefined }
  | { field?: undefined; not: CaseFilter; tag?: undefined; andAll?: undefined; orAll?: undefined }
  | { field?: undefined; not?: undefined; tag: TagFilter; andAll?: undefined; orAll?: undefined }
  | { field?: undefined; not?: undefined; tag?: undefined; andAll: CaseFilter[]; orAll?: undefined }
  | {
      field?: undefined;
      not?: undefined;
      tag?: undefined;
      andAll?: undefined;
      orAll: CaseFilter[];
    };
export interface Sort {
  fieldId: string;
  sortOrder: string;
}
export type SortList = Sort[];
export interface SearchCasesRequest {
  domainId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  searchTerm?: string | undefined;
  filter?: CaseFilter | undefined;
  sorts?: Sort[] | undefined;
  fields?: FieldIdentifier[] | undefined;
}
export interface SearchCasesResponseItem {
  caseId: string;
  templateId: string;
  fields: FieldValue[];
  tags?: { [key: string]: string | undefined } | undefined;
}
export type SearchCasesResponseItemList = SearchCasesResponseItem[];
export type TotalCount = number;
export interface SearchCasesResponse {
  nextToken?: string | undefined;
  cases: SearchCasesResponseItem[];
  totalCount?: number | undefined;
}
export interface SearchRelatedItemsRequest {
  domainId: string;
  caseId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  filters?: RelatedItemTypeFilter[] | undefined;
}
export interface SearchRelatedItemsResponseItem {
  relatedItemId: string;
  type: string;
  associationTime: Date;
  content: RelatedItemContent;
  tags?: { [key: string]: string | undefined } | undefined;
  performedBy?: UserUnion | undefined;
}
export type SearchRelatedItemsResponseItemList = SearchRelatedItemsResponseItem[];
export interface SearchRelatedItemsResponse {
  nextToken?: string | undefined;
  relatedItems: SearchRelatedItemsResponseItem[];
}
export interface FieldsConfiguration {
  fieldIds: FieldIdentifier[];
  sourceCaseId: string;
}
export type FieldsConfigurationList = FieldsConfiguration[];
export interface RelatedItemsConfiguration {
  comment?: boolean | undefined;
  connectCase?: boolean | undefined;
  contact?: boolean | undefined;
  custom?: boolean | undefined;
}
export interface StartMergeCasesRequest {
  domainId: string;
  caseId: string;
  secondaryCaseIds: string[];
  fieldsConfiguration?: FieldsConfiguration[] | undefined;
  relatedItemsConfiguration?: RelatedItemsConfiguration | undefined;
  performedBy?: UserUnion | undefined;
}
export interface StartMergeCasesResponse {}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKey = string;
export type TagKeyList = string[];
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCaseRequest {
  domainId: string;
  caseId: string;
  fields: FieldValue[];
  performedBy?: UserUnion | undefined;
}
export interface UpdateCaseResponse {}
export interface UpdateCaseRuleRequest {
  domainId: string;
  caseRuleId: string;
  name?: string | undefined;
  description?: string | undefined;
  rule?: CaseRuleDetails | undefined;
}
export interface UpdateCaseRuleResponse {}
export interface UpdateFieldRequest {
  domainId: string;
  fieldId: string;
  name?: string | undefined;
  description?: string | undefined;
  attributes?: FieldAttributes | undefined;
}
export interface UpdateFieldResponse {}
export interface UpdateLayoutRequest {
  domainId: string;
  layoutId: string;
  name?: string | undefined;
  content?: LayoutContent | undefined;
}
export interface UpdateLayoutResponse {}
export interface CommentUpdateContent {
  body: string;
  contentType: string;
}
export interface CustomUpdateContent {
  fields: FieldValue[];
}
export type RelatedItemUpdateContent =
  | { comment: CommentUpdateContent; custom?: undefined }
  | { comment?: undefined; custom: CustomUpdateContent };
export interface UpdateRelatedItemRequest {
  domainId: string;
  caseId: string;
  relatedItemId: string;
  content: RelatedItemUpdateContent;
  performedBy?: UserUnion | undefined;
}
export interface UpdateRelatedItemResponse {
  relatedItemId: string;
  relatedItemArn: string;
  type: string;
  content: RelatedItemContent;
  associationTime: Date;
  tags?: { [key: string]: string | undefined } | undefined;
  lastUpdatedUser?: UserUnion | undefined;
  createdBy?: UserUnion | undefined;
}
export interface UpdateTemplateRequest {
  domainId: string;
  templateId: string;
  name?: string | undefined;
  description?: string | undefined;
  layoutConfiguration?: LayoutConfiguration | undefined;
  requiredFields?: RequiredField[] | undefined;
  status?: string | undefined;
  rules?: TemplateRule[] | undefined;
  tagPropagationConfigurations?: TagPropagationConfiguration[] | undefined;
}
export interface UpdateTemplateResponse {}
export type BatchCreateRelatedItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a comment and associates it with multiple cases in a single request. All cases must belong to the same domain. This operation supports only the Comment related item type.
 *
 * Each case is processed independently. If some cases fail, the remaining cases still receive the related item. To determine whether individual items failed, inspect the `failedItems` array in the response.
 *
 * The entire request fails, and no related items are created, in the following cases:
 *
 * - The specified domain doesn't exist.
 *
 * - A reference ID doesn't match any case in the domain.
 *
 * - The request contains duplicate case IDs.
 *
 * - The content isn't comment content.
 *
 * This operation uses the same IAM action as CreateRelatedItem (`cases:CreateRelatedItem`). You can use the `cases:IsBatchAction` condition key in IAM policies to allow or deny batch operations independently from single-case operations.
 *
 * If you provide a value for `performedBy.userArn`, you must also have DescribeUser permission on the ARN of the user that you provide.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const batchCreateRelatedItem: API.OperationMethod<
  BatchCreateRelatedItemRequest & RegionInput,
  BatchCreateRelatedItemResponse,
  BatchCreateRelatedItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<BatchCreateRelatedItemRequest>,
  output: __S(851, __c53, 3) as any as S.Schema<BatchCreateRelatedItemResponse>,
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
  operationName: "BatchCreateRelatedItem",
  telemetry: TELEMETRY,
  span: "BatchCreateRelatedItem",
}));

export type BatchGetCaseRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a batch of case rules. In the Connect Customer admin website, case rules are known as *case field conditions*. For more information about case field conditions, see Add case field conditions to a case template.
 */
export const batchGetCaseRule: API.OperationMethod<
  BatchGetCaseRuleRequest & RegionInput,
  BatchGetCaseRuleResponse,
  BatchGetCaseRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<BatchGetCaseRuleRequest>,
  output: __S(979, __c61, 3) as any as S.Schema<BatchGetCaseRuleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCaseRule",
  telemetry: TELEMETRY,
  span: "BatchGetCaseRule",
}));

export type BatchGetFieldError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the description for the list of fields in the request parameters.
 */
export const batchGetField: API.OperationMethod<
  BatchGetFieldRequest & RegionInput,
  BatchGetFieldResponse,
  BatchGetFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<BatchGetFieldRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<BatchGetFieldResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetField",
  telemetry: TELEMETRY,
  span: "BatchGetField",
}));

export type BatchPutFieldOptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and updates a set of field options for a single select field in a Cases domain.
 */
export const batchPutFieldOptions: API.OperationMethod<
  BatchPutFieldOptionsRequest & RegionInput,
  BatchPutFieldOptionsResponse,
  BatchPutFieldOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchPutFieldOptionsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<BatchPutFieldOptionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutFieldOptions",
  telemetry: TELEMETRY,
  span: "BatchPutFieldOptions",
}));

export type BatchUpdateCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates fields on multiple cases in a single request. All cases must belong to the same domain. Set the title, status, and customer ID through the top-level `title`, `status`, and `customerId` parameters, and set other fields through the `fields` array.
 *
 * Each case is processed independently. If some cases fail, the remaining cases are still updated. To determine whether individual cases failed, inspect the `failedCases` array in the response.
 *
 * The entire request fails, and no cases are updated, in the following cases:
 *
 * - The specified domain doesn't exist.
 *
 * - A reference ID doesn't match any case in the domain.
 *
 * - The request contains duplicate case IDs.
 *
 * - The request doesn't specify any update. Provide at least one entry in `fields`, or a `title`, `status`, or `customerId`.
 *
 * - A field identifier in `fields` doesn't resolve to a field in the domain, for example, an unknown field name.
 *
 * - A field name contains a pipe (`|`) or comma (`,`) character.
 *
 * - `fields` includes `title`, `status`, or `customerId`.
 *
 * This operation uses the same IAM action as UpdateCase (`cases:UpdateCase`). You can use the `cases:IsBatchAction` condition key in IAM policies to allow or deny batch operations independently from single-case operations.
 *
 * If you provide a value for `performedBy.userArn`, you must also have DescribeUser permission on the ARN of the user that you provide.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const batchUpdateCase: API.OperationMethod<
  BatchUpdateCaseRequest & RegionInput,
  BatchUpdateCaseResponse,
  BatchUpdateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(35, __c2, 3) as any as S.Schema<BatchUpdateCaseRequest>,
  output: __S(38, __c2, 6) as any as S.Schema<BatchUpdateCaseResponse>,
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
  operationName: "BatchUpdateCase",
  telemetry: TELEMETRY,
  span: "BatchUpdateCase",
}));

export type CreateCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If you provide a value for `PerformedBy.UserArn`, you must also have the connect:DescribeUser permission on the user ARN that you provide.
 *
 * Creates a case in the specified Cases domain. Case system and custom fields are taken as an array id/value pairs with a declared data types.
 *
 * When creating a case from a template that has tag propagation configurations, the specified tags are automatically applied to the case.
 *
 * The following field is always required when creating a case:
 *
 * - `title`
 *
 * The following field may be required depending on the template configuration:
 *
 * - `customer_id` - Required only if the template's `requiredFields` list includes `customer_id`. When required, provide the full customer profile ARN in this format: `arn:aws:profile:your_AWS_Region:your_AWS_account_ID:domains/your_profiles_domain_name/profiles/profile_ID`. When not required, the field is optional and can be omitted, added, changed, or removed after case creation.
 */
export const createCase: API.OperationMethod<
  CreateCaseRequest & RegionInput,
  CreateCaseResponse,
  CreateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateCaseRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateCaseResponse>,
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
  operationName: "CreateCase",
  telemetry: TELEMETRY,
  span: "CreateCase",
}));

export type CreateCaseRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new case rule. In the Connect Customer admin website, case rules are known as *case field conditions*. For more information about case field conditions, see Add case field conditions to a case template.
 */
export const createCaseRule: API.OperationMethod<
  CreateCaseRuleRequest & RegionInput,
  CreateCaseRuleResponse,
  CreateCaseRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateCaseRuleRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateCaseRuleResponse>,
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
  operationName: "CreateCaseRule",
  telemetry: TELEMETRY,
  span: "CreateCaseRule",
}));

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain, which is a container for all case data, such as cases, fields, templates and layouts. Each Connect Customer instance can be associated with only one Cases domain.
 *
 * This will not associate your connect instance to Cases domain. Instead, use the Connect Customer CreateIntegrationAssociation API. You need specific IAM permissions to successfully associate the Cases domain. For more information, see Onboard to Cases.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest & RegionInput,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateDomainRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateDomainResponse>,
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
  operationName: "CreateDomain",
  telemetry: TELEMETRY,
  span: "CreateDomain",
}));

export type CreateFieldError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a field in the Cases domain. This field is used to define the case object model (that is, defines what data can be captured on cases) in a Cases domain.
 */
export const createField: API.OperationMethod<
  CreateFieldRequest & RegionInput,
  CreateFieldResponse,
  CreateFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateFieldRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CreateFieldResponse>,
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
  operationName: "CreateField",
  telemetry: TELEMETRY,
  span: "CreateField",
}));

export type CreateLayoutError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a layout in the Cases domain. Layouts define the following configuration in the top section and More Info tab of the Cases user interface:
 *
 * - Fields to display to the users
 *
 * - Field ordering
 *
 * Title and Status fields cannot be part of layouts since they are not configurable.
 */
export const createLayout: API.OperationMethod<
  CreateLayoutRequest & RegionInput,
  CreateLayoutResponse,
  CreateLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateLayoutRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateLayoutResponse>,
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
  operationName: "CreateLayout",
  telemetry: TELEMETRY,
  span: "CreateLayout",
}));

export type CreateRelatedItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a related item (comments, tasks, and contacts) and associates it with a case.
 *
 * There's a quota for the number of fields allowed in a Custom type related item. See Connect Customer Cases quotas.
 *
 * **Use cases**
 *
 * Following are examples of related items that you may want to associate with a case:
 *
 * - Related contacts, such as calls, chats, emails tasks
 *
 * - Comments, for agent notes
 *
 * - SLAs, to capture target resolution goals
 *
 * - Cases, to capture related Connect Customer Cases
 *
 * - Files, such as policy documentation or customer-provided attachments
 *
 * - Custom related items, which provide flexibility for you to define related items that such as bookings, orders, products, notices, and more
 *
 * **Important things to know**
 *
 * - If you are associating a contact to a case by passing in `Contact` for a `type`, you must have DescribeContact permission on the ARN of the contact that you provide in `content.contact.contactArn`.
 *
 * - A Related Item is a resource that is associated with a case. It may or may not have an external identifier linking it to an external resource (for example, a `contactArn`). All Related Items have their own internal identifier, the `relatedItemArn`. Examples of related items include `comments` and `contacts`.
 *
 * - If you provide a value for `performedBy.userArn`, you must also have DescribeUser permission on the ARN of the user that you provide.
 *
 * - If the case is the secondary case of a merge that is running, the request fails with a `ConflictException`. For more information, see StartMergeCases.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const createRelatedItem: API.OperationMethod<
  CreateRelatedItemRequest & RegionInput,
  CreateRelatedItemResponse,
  CreateRelatedItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateRelatedItemRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateRelatedItemResponse>,
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
  operationName: "CreateRelatedItem",
  telemetry: TELEMETRY,
  span: "CreateRelatedItem",
}));

export type CreateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a template in the Cases domain. This template is used to define the case object model (that is, to define what data can be captured on cases) in a Cases domain. A template must have a unique name within a domain, and it must reference existing field IDs and layout IDs. Additionally, multiple fields with same IDs are not allowed within the same Template. A template can be either Active or Inactive, as indicated by its status. Inactive templates cannot be used to create cases.
 *
 * Other template APIs are:
 *
 * - DeleteTemplate
 *
 * - GetTemplate
 *
 * - ListTemplates
 *
 * - UpdateTemplate
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest & RegionInput,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateTemplateRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<CreateTemplateResponse>,
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
  operationName: "CreateTemplate",
  telemetry: TELEMETRY,
  span: "CreateTemplate",
}));

export type DeleteCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The DeleteCase API permanently deletes a case and all its associated resources from the cases data store. After a successful deletion, you cannot:
 *
 * - Retrieve related items
 *
 * - Access audit history
 *
 * - Perform any operations that require the CaseID
 *
 * You can't delete a case while it's part of a merge that is running, as either the primary or the secondary case. The request fails with a `ConflictException`. For more information, see StartMergeCases.
 *
 * This action is irreversible. After you delete a case, you cannot recover its data.
 */
export const deleteCase: API.OperationMethod<
  DeleteCaseRequest & RegionInput,
  DeleteCaseResponse,
  DeleteCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteCaseRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteCaseResponse>,
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
  operationName: "DeleteCase",
  telemetry: TELEMETRY,
  span: "DeleteCase",
}));

export type DeleteCaseRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a case rule. In the Connect Customer admin website, case rules are known as *case field conditions*. For more information about case field conditions, see Add case field conditions to a case template.
 */
export const deleteCaseRule: API.OperationMethod<
  DeleteCaseRuleRequest & RegionInput,
  DeleteCaseRuleResponse,
  DeleteCaseRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeleteCaseRuleRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteCaseRuleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCaseRule",
  telemetry: TELEMETRY,
  span: "DeleteCaseRule",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Cases domain.
 *
 * After deleting your domain you must disassociate the deleted domain from your Connect Customer instance with another API call before being able to use Cases again with this Connect Customer instance. See DeleteIntegrationAssociation.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest & RegionInput,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DeleteDomainRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteDomainResponse>,
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
  operationName: "DeleteDomain",
  telemetry: TELEMETRY,
  span: "DeleteDomain",
}));

export type DeleteFieldError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a field from a Cases template.
 *
 * After a field is deleted:
 *
 * - You can still retrieve the field by calling `BatchGetField`.
 *
 * - You cannot update a deleted field by calling `UpdateField`; it throws a `ValidationException`.
 *
 * - Deleted fields are not included in the `ListFields` response.
 *
 * - Calling `CreateCase` with a deleted field throws a `ValidationException` denoting which field identifiers in the request have been deleted.
 *
 * - Calling `GetCase` with a deleted field identifier returns the deleted field's value if one exists.
 *
 * - Calling `UpdateCase` with a deleted field ID throws a `ValidationException` if the case does not already contain a value for the deleted field. Otherwise it succeeds, allowing you to update or remove (using `emptyValue: {}`) the field's value from the case.
 *
 * - `GetTemplate` does not return field IDs for deleted fields.
 *
 * - `GetLayout` does not return field IDs for deleted fields.
 *
 * - Calling `SearchCases` with the deleted field ID as a filter returns any cases that have a value for the deleted field that matches the filter criteria.
 *
 * - Calling `SearchCases` with a `searchTerm` value that matches a deleted field's value on a case returns the case in the response.
 *
 * - Calling `BatchPutFieldOptions` with a deleted field ID throw a `ValidationException`.
 *
 * - Calling `GetCaseEventConfiguration` does not return field IDs for deleted fields.
 */
export const deleteField: API.OperationMethod<
  DeleteFieldRequest & RegionInput,
  DeleteFieldResponse,
  DeleteFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeleteFieldRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteFieldResponse>,
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
  operationName: "DeleteField",
  telemetry: TELEMETRY,
  span: "DeleteField",
}));

export type DeleteLayoutError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a layout from a Cases template. You can delete up to 100 layouts per domain.
 *
 * After a layout is deleted:
 *
 * - You can still retrieve the layout by calling `GetLayout`.
 *
 * - You cannot update a deleted layout by calling `UpdateLayout`; it throws a `ValidationException`.
 *
 * - Deleted layouts are not included in the `ListLayouts` response.
 */
export const deleteLayout: API.OperationMethod<
  DeleteLayoutRequest & RegionInput,
  DeleteLayoutResponse,
  DeleteLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DeleteLayoutRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteLayoutResponse>,
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
  operationName: "DeleteLayout",
  telemetry: TELEMETRY,
  span: "DeleteLayout",
}));

export type DeleteRelatedItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the related item resource under a case.
 *
 * This API cannot be used on a FILE type related attachment. To delete this type of file, use the DeleteAttachedFile API
 *
 * If the case is the secondary case of a merge that is running, the request fails with a `ConflictException`. For more information, see StartMergeCases.
 */
export const deleteRelatedItem: API.OperationMethod<
  DeleteRelatedItemRequest & RegionInput,
  DeleteRelatedItemResponse,
  DeleteRelatedItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DeleteRelatedItemRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteRelatedItemResponse>,
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
  operationName: "DeleteRelatedItem",
  telemetry: TELEMETRY,
  span: "DeleteRelatedItem",
}));

export type DeleteTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Cases template. You can delete up to 100 templates per domain.
 *
 * After a Cases template is deleted:
 *
 * - You can still retrieve the template by calling `GetTemplate`.
 *
 * - You cannot update the template.
 *
 * - You cannot create a case by using the deleted template.
 *
 * - Deleted templates are not included in the `ListTemplates` response.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest & RegionInput,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeleteTemplateRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteTemplateResponse>,
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
  operationName: "DeleteTemplate",
  telemetry: TELEMETRY,
  span: "DeleteTemplate",
}));

export type GetCaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific case if it exists.
 */
export const getCase: API.PaginatedOperationMethod<
  GetCaseRequest & RegionInput,
  GetCaseResponse,
  GetCaseError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetCaseRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<GetCaseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCase",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
  telemetry: TELEMETRY,
  span: "GetCase",
})) as any;

export type GetCaseAuditEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the audit history about a specific case if it exists.
 */
export const getCaseAuditEvents: API.PaginatedOperationMethod<
  GetCaseAuditEventsRequest & RegionInput,
  GetCaseAuditEventsResponse,
  GetCaseAuditEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetCaseAuditEventsRequest>,
  output: __S(359, __c22, 7) as any as S.Schema<GetCaseAuditEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAuditEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetCaseAuditEvents",
})) as any;

export type GetCaseEventConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the case event publishing configuration.
 */
export const getCaseEventConfiguration: API.OperationMethod<
  GetCaseEventConfigurationRequest & RegionInput,
  GetCaseEventConfigurationResponse,
  GetCaseEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetCaseEventConfigurationRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetCaseEventConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseEventConfiguration",
  telemetry: TELEMETRY,
  span: "GetCaseEventConfiguration",
}));

export type GetDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific domain if it exists.
 */
export const getDomain: API.OperationMethod<
  GetDomainRequest & RegionInput,
  GetDomainResponse,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetDomainRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<GetDomainResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
  telemetry: TELEMETRY,
  span: "GetDomain",
}));

export type GetLayoutError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details for the requested layout.
 */
export const getLayout: API.OperationMethod<
  GetLayoutRequest & RegionInput,
  GetLayoutResponse,
  GetLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetLayoutRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<GetLayoutResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayout",
  telemetry: TELEMETRY,
  span: "GetLayout",
}));

export type GetMergeCasesStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the merge status of a case. Use this operation to track a merge that you started with StartMergeCases, or to check whether a case is part of a merge before you modify it.
 *
 * The operation returns the following, depending on the case:
 *
 * - For the primary case or the secondary case of a merge that is running, it returns `IN_PROGRESS`.
 *
 * - For a case that was merged into another case as the secondary case, it returns `COMPLETED`.
 *
 * - For any other case, it returns a `ResourceNotFoundException`. This includes the primary case after its merge finishes.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const getMergeCasesStatus: API.OperationMethod<
  GetMergeCasesStatusRequest & RegionInput,
  GetMergeCasesStatusResponse,
  GetMergeCasesStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetMergeCasesStatusRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<GetMergeCasesStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeCasesStatus",
  telemetry: TELEMETRY,
  span: "GetMergeCasesStatus",
}));

export type GetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details for the requested template. Other template APIs are:
 *
 * - CreateTemplate
 *
 * - DeleteTemplate
 *
 * - ListTemplates
 *
 * - UpdateTemplate
 */
export const getTemplate: API.OperationMethod<
  GetTemplateRequest & RegionInput,
  GetTemplateResponse,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<GetTemplateRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
  telemetry: TELEMETRY,
  span: "GetTemplate",
}));

export type ListCaseRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all case rules in a Cases domain. In the Connect Customer admin website, case rules are known as *case field conditions*. For more information about case field conditions, see Add case field conditions to a case template.
 */
export const listCaseRules: API.PaginatedOperationMethod<
  ListCaseRulesRequest & RegionInput,
  ListCaseRulesResponse,
  ListCaseRulesError,
  Credentials | HttpClient.HttpClient,
  CaseRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListCaseRulesRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListCaseRulesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCaseRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "caseRules",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCaseRules",
})) as any;

export type ListCasesForContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists cases for a given contact.
 */
export const listCasesForContact: API.PaginatedOperationMethod<
  ListCasesForContactRequest & RegionInput,
  ListCasesForContactResponse,
  ListCasesForContactError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListCasesForContactRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListCasesForContactResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCasesForContact",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCasesForContact",
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all cases domains in the Amazon Web Services account. Each list item is a condensed summary object of the domain.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest & RegionInput,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListDomainsRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListDomainsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDomains",
})) as any;

export type ListFieldOptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the field options for a field identifier in the domain.
 */
export const listFieldOptions: API.PaginatedOperationMethod<
  ListFieldOptionsRequest & RegionInput,
  ListFieldOptionsResponse,
  ListFieldOptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListFieldOptionsRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<ListFieldOptionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFieldOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFieldOptions",
})) as any;

export type ListFieldsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all fields in a Cases domain.
 */
export const listFields: API.PaginatedOperationMethod<
  ListFieldsRequest & RegionInput,
  ListFieldsResponse,
  ListFieldsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListFieldsRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListFieldsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFields",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFields",
})) as any;

export type ListLayoutsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all layouts in the given cases domain. Each list item is a condensed summary object of the layout.
 */
export const listLayouts: API.PaginatedOperationMethod<
  ListLayoutsRequest & RegionInput,
  ListLayoutsResponse,
  ListLayoutsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListLayoutsRequest>,
  output: __S(547, __c34, 3) as any as S.Schema<ListLayoutsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayouts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListLayouts",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the templates in a Cases domain. Each list item is a condensed summary object of the template.
 *
 * Other template APIs are:
 *
 * - CreateTemplate
 *
 * - DeleteTemplate
 *
 * - GetTemplate
 *
 * - UpdateTemplate
 */
export const listTemplates: API.PaginatedOperationMethod<
  ListTemplatesRequest & RegionInput,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListTemplatesRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<ListTemplatesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTemplates",
})) as any;

export type PutCaseEventConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds case event publishing configuration. For a complete list of fields you can add to the event message, see Create case fields in the *Connect Customer Administrator Guide*.
 */
export const putCaseEventConfiguration: API.OperationMethod<
  PutCaseEventConfigurationRequest & RegionInput,
  PutCaseEventConfigurationResponse,
  PutCaseEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<PutCaseEventConfigurationRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<PutCaseEventConfigurationResponse>,
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
  operationName: "PutCaseEventConfiguration",
  telemetry: TELEMETRY,
  span: "PutCaseEventConfiguration",
}));

export type SearchAllRelatedItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for related items across all cases within a domain. This is a global search operation that returns related items from multiple cases, unlike the case-specific SearchRelatedItems API.
 *
 * **Use cases**
 *
 * Following are common uses cases for this API:
 *
 * - Find cases with similar issues across the domain. For example, search for all cases containing comments about "product defect" to identify patterns and existing solutions.
 *
 * - Locate all cases associated with specific contacts or orders. For example, find all cases linked to a contactArn to understand the complete customer journey.
 *
 * - Monitor SLA compliance across cases. For example, search for all cases with "Active" SLA status to prioritize remediation efforts.
 *
 * **Important things to know**
 *
 * - This API returns case identifiers, not complete case objects. To retrieve full case details, you must make additional calls to the GetCase API for each returned case ID.
 *
 * - This API searches across related items content, not case fields. Use the SearchCases API to search within case field values.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const searchAllRelatedItems: API.PaginatedOperationMethod<
  SearchAllRelatedItemsRequest & RegionInput,
  SearchAllRelatedItemsResponse,
  SearchAllRelatedItemsError,
  Credentials | HttpClient.HttpClient,
  SearchAllRelatedItemsResponseItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(610, __c38, 2) as any as S.Schema<SearchAllRelatedItemsRequest>,
  output: __S(613, __c38, 5) as any as S.Schema<SearchAllRelatedItemsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAllRelatedItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relatedItems",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchAllRelatedItems",
})) as any;

export type SearchCasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for cases within their associated Cases domain. Search results are returned as a paginated list of abridged case documents.
 *
 * For `customer_id` you must provide the full customer profile ARN in this format: ` arn:aws:profile:your AWS Region:your AWS account ID:domains/profiles domain name/profiles/profile ID`.
 */
export const searchCases: API.PaginatedOperationMethod<
  SearchCasesRequest & RegionInput,
  SearchCasesResponse,
  SearchCasesError,
  Credentials | HttpClient.HttpClient,
  SearchCasesResponseItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(678, __c42, 6) as any as S.Schema<SearchCasesRequest>,
  output: __S(681, __c42, 9) as any as S.Schema<SearchCasesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cases",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchCases",
})) as any;

export type SearchRelatedItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for related items that are associated with a case.
 *
 * If no filters are provided, this returns all related items associated with a case.
 */
export const searchRelatedItems: API.PaginatedOperationMethod<
  SearchRelatedItemsRequest & RegionInput,
  SearchRelatedItemsResponse,
  SearchRelatedItemsError,
  Credentials | HttpClient.HttpClient,
  SearchRelatedItemsResponseItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<SearchRelatedItemsRequest>,
  output: __S(691, __c43, 3) as any as S.Schema<SearchRelatedItemsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRelatedItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relatedItems",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchRelatedItems",
})) as any;

export type StartMergeCasesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Merges a secondary case into a primary case. The primary case, which you specify in the request URI, remains active. Both cases must belong to the same domain.
 *
 * The merge runs asynchronously. To track its progress, call GetMergeCasesStatus. When the merge finishes, the selected field values and related items from the secondary case are on the primary case, the two cases are linked, and the secondary case is closed. Both cases record the merge in their audit history. For more information, see GetCaseAuditEvents.
 *
 * **Important things to know**
 *
 * - Both cases must have the same customer, or at least one of them must have no customer.
 *
 * - While the merge runs, you can't modify the secondary case or its related items, and you can't delete the primary case. These requests return a `ConflictException`.
 *
 * - After the merge, the secondary case can be reopened, updated, and deleted, but it can't be merged again.
 *
 * The request fails with a `ValidationException`, and no merge starts, if:
 *
 * - The primary case and the secondary case are the same case.
 *
 * - Either case is closed.
 *
 * - Both cases have a customer, and the customers are different.
 *
 * - `fieldsConfiguration` selects a field that can't be merged, or a field that the secondary case doesn't have.
 *
 * - After the merge, the primary case would have more than 500 field values, or would exceed the maximum case size.
 *
 * The request fails with a `ServiceQuotaExceededException` if, after the merge, either case would exceed the quota for related items per case. For the primary case, the count is its existing related items, plus the related items moved from the secondary case, plus the new case link. See Connect Customer Cases quotas.
 *
 * The request fails with a `ConflictException` if either case is already part of a merge that is running, or was previously merged into another case as the secondary case.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const startMergeCases: API.OperationMethod<
  StartMergeCasesRequest & RegionInput,
  StartMergeCasesResponse,
  StartMergeCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(707, __c44, 3) as any as S.Schema<StartMergeCasesRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<StartMergeCasesResponse>,
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
  operationName: "StartMergeCases",
  telemetry: TELEMETRY,
  span: "StartMergeCases",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untags a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If you provide a value for `PerformedBy.UserArn`, you must also have the connect:DescribeUser permission on the user ARN that you provide.
 *
 * Updates the values of fields on a case. Fields to be updated are received as an array of id/value pairs identical to the `CreateCase` input.
 *
 * If the case is the secondary case of a merge that is running, the request fails with a `ConflictException`. For more information, see StartMergeCases.
 *
 * If the action is successful, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const updateCase: API.OperationMethod<
  UpdateCaseRequest & RegionInput,
  UpdateCaseResponse,
  UpdateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateCaseRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UpdateCaseResponse>,
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
  operationName: "UpdateCase",
  telemetry: TELEMETRY,
  span: "UpdateCase",
}));

export type UpdateCaseRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a case rule. In the Connect Customer admin website, case rules are known as *case field conditions*. For more information about case field conditions, see Add case field conditions to a case template.
 */
export const updateCaseRule: API.OperationMethod<
  UpdateCaseRuleRequest & RegionInput,
  UpdateCaseRuleResponse,
  UpdateCaseRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<UpdateCaseRuleRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UpdateCaseRuleResponse>,
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
  operationName: "UpdateCaseRule",
  telemetry: TELEMETRY,
  span: "UpdateCaseRule",
}));

export type UpdateFieldError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an existing field.
 */
export const updateField: API.OperationMethod<
  UpdateFieldRequest & RegionInput,
  UpdateFieldResponse,
  UpdateFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<UpdateFieldRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UpdateFieldResponse>,
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
  operationName: "UpdateField",
  telemetry: TELEMETRY,
  span: "UpdateField",
}));

export type UpdateLayoutError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the attributes of an existing layout.
 *
 * If the action is successful, the service sends back an HTTP 200 response with an empty HTTP body.
 *
 * A `ValidationException` is returned when you add non-existent `fieldIds` to a layout.
 *
 * Title and Status fields cannot be part of layouts because they are not configurable.
 */
export const updateLayout: API.OperationMethod<
  UpdateLayoutRequest & RegionInput,
  UpdateLayoutResponse,
  UpdateLayoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<UpdateLayoutRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UpdateLayoutResponse>,
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
  operationName: "UpdateLayout",
  telemetry: TELEMETRY,
  span: "UpdateLayout",
}));

export type UpdateRelatedItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the content of a related item associated with a case. The following related item types are supported:
 *
 * - **Comment** - Update the text content of an existing comment
 *
 * - **Custom** - Update the fields of a custom related item. You can add, modify, and remove fields from a custom related item. There's a quota for the number of fields allowed in a Custom type related item. See Connect Customer Cases quotas.
 *
 * **Important things to know**
 *
 * - When updating a Custom related item, all existing and new fields, and their associated values should be included in the request. Fields not included as part of this request will be removed.
 *
 * - If you provide a value for `performedBy.userArn`, you must also have DescribeUser permission on the ARN of the user that you provide.
 *
 * - System case fields cannot be used in a custom related item.
 *
 * - If the case is the secondary case of a merge that is running, the request fails with a `ConflictException`. For more information, see StartMergeCases.
 *
 * **Endpoints**: See Connect Customer endpoints and quotas.
 */
export const updateRelatedItem: API.OperationMethod<
  UpdateRelatedItemRequest & RegionInput,
  UpdateRelatedItemResponse,
  UpdateRelatedItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(817, __c51, 1) as any as S.Schema<UpdateRelatedItemRequest>,
  output: __S(818, __c51, 2) as any as S.Schema<UpdateRelatedItemResponse>,
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
  operationName: "UpdateRelatedItem",
  telemetry: TELEMETRY,
  span: "UpdateRelatedItem",
}));

export type UpdateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the attributes of an existing template. The template attributes that can be modified include `name`, `description`, `layoutConfiguration`, `requiredFields`, and `status`. At least one of these attributes must not be null. If a null value is provided for a given attribute, that attribute is ignored and its current value is preserved.
 *
 * Other template APIs are:
 *
 * - CreateTemplate
 *
 * - DeleteTemplate
 *
 * - GetTemplate
 *
 * - ListTemplates
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest & RegionInput,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<UpdateTemplateRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UpdateTemplateResponse>,
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
  operationName: "UpdateTemplate",
  telemetry: TELEMETRY,
  span: "UpdateTemplate",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          fieldId: S.String.pipe(T.HttpLabel("fieldId")),
          options: __S(17, __c1, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/fields/{fieldId}/options" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchPutFieldOptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ message: S.String, errorCode: S.String, value: S.String }),
      ).annotate({ identifier: "FieldOptionError" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() => S.Struct({ errors: S.optional(__S(2, __c0, 2)) })).annotate({
        identifier: "BatchPutFieldOptionsResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, value: S.String, active: S.Boolean }),
      ).annotate({ identifier: "FieldOption" });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ id: S.String }),
        /*@__PURE__*/ S.Struct({ name: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ fieldIdentifier: __S(32, __c2, 0), value: __S(880, __c55, 0) }),
      ).annotate({ identifier: "FieldValueInput" });
    case 2:
      return S.Array(__S(33, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          cases: __S(866, __c54, 2),
          fields: __S(34, __c2, 2),
          performedBy: S.optional(__S(896, __c56, 0)),
          title: S.optional(SensitiveString),
          status: S.optional(S.String),
          customerId: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/cases:batchUpdateCase" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateCaseRequest" });
    case 4:
      return S.suspend(() => S.Struct({ caseIdentifier: __S(867, __c54, 3) })).annotate({
        identifier: "BatchUpdateCaseSuccessEntry",
      });
    case 5:
      return S.Array(__S(36, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ successfulCases: __S(37, __c2, 5), failedCases: __S(869, __c54, 5) }),
      ).annotate({ identifier: "BatchUpdateCaseResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          templateId: S.String,
          fields: __S(913, __c57, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          performedBy: S.optional(__S(896, __c56, 0)),
          tags: S.optional(__S(64, __c4, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCaseRequest" });
    case 1:
      return S.suspend(() => S.Struct({ caseId: S.String, caseArn: S.String })).annotate({
        identifier: "CreateCaseResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          name: S.String,
          description: S.optional(S.String),
          rule: __S(1018, __c63, 10),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/case-rules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCaseRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ caseRuleId: S.String, caseRuleArn: S.String })).annotate({
        identifier: "CreateCaseRuleResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/domains" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ domainId: S.String, domainArn: S.String, domainStatus: S.String }),
      ).annotate({ identifier: "CreateDomainResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          name: S.String,
          type: S.String,
          description: S.optional(S.String),
          attributes: S.optional(__S(1089, __c68, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/fields" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFieldRequest" });
    case 1:
      return S.suspend(() => S.Struct({ fieldId: S.String, fieldArn: S.String })).annotate({
        identifier: "CreateFieldResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          name: S.String,
          content: __S(149, __c9, 5),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/layouts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLayoutRequest" });
    case 1:
      return S.suspend(() => S.Struct({ layoutId: S.String, layoutArn: S.String })).annotate({
        identifier: "CreateLayoutResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), fields: __S(1041, __c65, 1) }),
      ).annotate({ identifier: "FieldGroup" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ fieldGroup: __S(144, __c9, 0) })]);
    case 2:
      return S.Array(__S(145, __c9, 1));
    case 3:
      return S.suspend(() => S.Struct({ sections: S.optional(__S(146, __c9, 2)) })).annotate({
        identifier: "LayoutSections",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          topPanel: S.optional(__S(147, __c9, 3)),
          moreInfo: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "BasicLayout" });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ basic: __S(148, __c9, 4) })]);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          type: S.String,
          content: __S(931, __c58, 3),
          performedBy: S.optional(__S(896, __c56, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases/{caseId}/related-items/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRelatedItemRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ relatedItemId: S.String, relatedItemArn: S.String }),
      ).annotate({ identifier: "CreateRelatedItemResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          name: S.String,
          description: S.optional(S.String),
          layoutConfiguration: S.optional(__S(208, __c13, 0)),
          requiredFields: S.optional(__S(210, __c13, 2)),
          status: S.optional(S.String),
          rules: S.optional(__S(212, __c13, 4)),
          tagPropagationConfigurations: S.optional(__S(193, __c12, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ templateId: S.String, templateArn: S.String })).annotate({
        identifier: "CreateTemplateResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceType: S.String, tagMap: __S(64, __c4, 0) }),
      ).annotate({ identifier: "TagPropagationConfiguration" });
    case 1:
      return S.Array(__S(192, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ defaultLayout: S.optional(S.String) })).annotate({
        identifier: "LayoutConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ fieldId: S.String })).annotate({
        identifier: "RequiredField",
      });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ caseRuleId: S.String, fieldId: S.optional(S.String) }),
      ).annotate({ identifier: "TemplateRule" });
    case 4:
      return S.Array(__S(211, __c13, 3));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{domainId}/cases/{caseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCaseRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseRuleId: S.String.pipe(T.HttpLabel("caseRuleId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{domainId}/case-rules/{caseRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCaseRuleRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{domainId}" }),
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          fieldId: S.String.pipe(T.HttpLabel("fieldId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{domainId}/fields/{fieldId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFieldRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          layoutId: S.String.pipe(T.HttpLabel("layoutId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{domainId}/layouts/{layoutId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLayoutRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          relatedItemId: S.String.pipe(T.HttpLabel("relatedItemId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domains/{domainId}/cases/{caseId}/related-items/{relatedItemId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRelatedItemRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          templateId: S.String.pipe(T.HttpLabel("templateId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domains/{domainId}/templates/{templateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTemplateRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          fields: __S(1041, __c65, 1),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases/{caseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fields: __S(913, __c57, 1),
          templateId: S.String,
          nextToken: S.optional(S.String),
          tags: S.optional(__S(1056, __c66, 0)),
        }),
      ).annotate({ identifier: "GetCaseResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases/{caseId}/audit-history" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCaseAuditEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventFieldId: S.String,
          oldValue: S.optional(__S(880, __c55, 0)),
          newValue: __S(880, __c55, 0),
        }),
      ).annotate({ identifier: "AuditEventField" });
    case 2:
      return S.Array(__S(353, __c22, 1)).pipe(/*@__PURE__*/ T.Sparse());
    case 3:
      return S.suspend(() =>
        S.Struct({ user: S.optional(__S(896, __c56, 0)), iamPrincipalArn: S.String }),
      ).annotate({ identifier: "AuditEventPerformedBy" });
    case 4:
      return S.suspend(() =>
        S.Struct({ mergeEventId: S.String, primaryCaseId: S.String, secondaryCaseId: S.String }),
      ).annotate({ identifier: "AuditMergeMetadata" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          type: S.String,
          relatedItemType: S.optional(S.String),
          performedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          fields: __S(354, __c22, 2),
          performedBy: S.optional(__S(355, __c22, 3)),
          mergeMetadata: S.optional(__S(356, __c22, 4)),
        }),
      ).annotate({ identifier: "AuditEvent" });
    case 6:
      return S.Array(__S(357, __c22, 5)).pipe(/*@__PURE__*/ T.Sparse());
    case 7:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), auditEvents: __S(358, __c22, 6) }),
      ).annotate({ identifier: "GetCaseAuditEventsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/case-event-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCaseEventConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ eventBridge: __S(387, __c24, 3) })).annotate({
        identifier: "GetCaseEventConfigurationResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fields: __S(1041, __c65, 1) })).annotate({
        identifier: "CaseEventIncludedData",
      });
    case 1:
      return S.suspend(() => S.Struct({ includeContent: S.Boolean })).annotate({
        identifier: "RelatedItemEventIncludedData",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          caseData: S.optional(__S(384, __c24, 0)),
          relatedItemData: S.optional(__S(385, __c24, 1)),
        }),
      ).annotate({ identifier: "EventIncludedData" });
    case 3:
      return S.suspend(() =>
        S.Struct({ enabled: S.Boolean, includedData: S.optional(__S(386, __c24, 2)) }),
      ).annotate({ identifier: "EventBridgeConfiguration" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}" }),
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
          domainId: S.String,
          domainArn: S.String,
          name: S.String,
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          domainStatus: S.String,
          tags: S.optional(__S(1056, __c66, 0)),
        }),
      ).annotate({ identifier: "GetDomainResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          layoutId: S.String.pipe(T.HttpLabel("layoutId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/layouts/{layoutId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLayoutRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          layoutId: S.String,
          layoutArn: S.String,
          name: S.String,
          content: __S(149, __c9, 5),
          tags: S.optional(__S(1056, __c66, 0)),
          deleted: S.optional(S.Boolean),
          createdTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetLayoutResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases/{caseId}/merge-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMergeCasesStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          primaryCaseId: S.optional(S.String),
          secondaryCaseIds: S.optional(__S(992, __c62, 0)),
        }),
      ).annotate({ identifier: "GetMergeCasesStatusResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          templateId: S.String.pipe(T.HttpLabel("templateId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/templates/{templateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateId: S.String,
          templateArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          layoutConfiguration: S.optional(__S(208, __c13, 0)),
          requiredFields: S.optional(__S(210, __c13, 2)),
          tags: S.optional(__S(1056, __c66, 0)),
          status: S.String,
          deleted: S.optional(S.Boolean),
          createdTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          rules: S.optional(__S(212, __c13, 4)),
          tagPropagationConfigurations: S.optional(__S(193, __c12, 1)),
        }),
      ).annotate({ identifier: "GetTemplateResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/rules-list/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCaseRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          caseRuleId: S.String,
          name: S.String,
          caseRuleArn: S.String,
          ruleType: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CaseRuleSummary" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ caseRules: __S(466, __c29, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCaseRulesResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          contactArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/list-cases-for-contact" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCasesForContactRequest" });
    case 1:
      return S.suspend(() => S.Struct({ caseId: S.String, templateId: S.String })).annotate({
        identifier: "CaseSummary",
      });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ cases: __S(482, __c30, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCasesForContactResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/domains-list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ domainId: S.String, domainArn: S.String, name: S.String }),
      ).annotate({ identifier: "DomainSummary" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ domains: __S(498, __c31, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          fieldId: S.String.pipe(T.HttpLabel("fieldId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          values: S.optional(__S(992, __c62, 0)).pipe(T.HttpQuery("values")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/fields/{fieldId}/options-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFieldOptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ options: __S(17, __c1, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFieldOptionsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/fields-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFieldsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fieldId: S.String,
          fieldArn: S.String,
          name: S.String,
          type: S.String,
          namespace: S.String,
          attributes: S.optional(__S(1089, __c68, 1)),
        }),
      ).annotate({ identifier: "FieldSummary" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ fields: __S(530, __c33, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFieldsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/layouts-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLayoutsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ layoutId: S.String, layoutArn: S.String, name: S.String }),
      ).annotate({ identifier: "LayoutSummary" });
    case 2:
      return S.Array(__S(545, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ layouts: __S(546, __c34, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLayoutsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(1056, __c66, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(__S(992, __c62, 0)).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/templates-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateId: S.String,
          templateArn: S.String,
          name: S.String,
          status: S.String,
          tagPropagationConfigurations: S.optional(__S(193, __c12, 1)),
        }),
      ).annotate({ identifier: "TemplateSummary" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ templates: __S(578, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTemplatesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          eventBridge: __S(387, __c24, 3),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/case-event-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutCaseEventConfigurationRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ sortProperty: S.String, sortOrder: S.String })).annotate({
        identifier: "SearchAllRelatedItemsSort",
      });
    case 1:
      return S.Array(__S(608, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(648, __c40, 8)),
          sorts: S.optional(__S(609, __c38, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/related-items-search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchAllRelatedItemsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          relatedItemId: S.String,
          caseId: S.String,
          type: S.String,
          associationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          content: __S(659, __c41, 3),
          performedBy: S.optional(__S(896, __c56, 0)),
          tags: S.optional(__S(1056, __c66, 0)),
        }),
      ).annotate({ identifier: "SearchAllRelatedItemsResponseItem" });
    case 4:
      return S.Array(__S(611, __c38, 3)).pipe(/*@__PURE__*/ T.Sparse());
    case 5:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), relatedItems: __S(612, __c38, 4) }),
      ).annotate({ identifier: "SearchAllRelatedItemsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ equalTo: __S(912, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ contains: __S(912, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ greaterThan: __S(912, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ greaterThanOrEqualTo: __S(912, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ lessThan: __S(912, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ lessThanOrEqualTo: __S(912, __c57, 0) }),
      ]);
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ channel: S.optional(__S(992, __c62, 0)), contactArn: S.optional(S.String) }),
      ).annotate({ identifier: "ContactFilter" });
    case 1:
      return S.suspend(() => S.Struct({ fileArn: S.optional(S.String) })).annotate({
        identifier: "FileFilter",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.optional(SensitiveString), status: S.optional(S.String) }),
      ).annotate({ identifier: "SlaFilter" });
    case 3:
      return S.suspend(() => S.Struct({ caseId: S.optional(S.String) })).annotate({
        identifier: "ConnectCaseFilter",
      });
    case 4:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(645, __c40, 5)).annotate({
          identifier: "CustomFieldsFilter",
        }),
      );
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ field: __S(624, __c39, 0) }),
        /*@__PURE__*/ S.Struct({
          not: /*@__PURE__*/ S.suspend(() => __S(645, __c40, 5)).annotate({
            identifier: "CustomFieldsFilter",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          andAll: /*@__PURE__*/ S.suspend(() => __S(644, __c40, 4)).annotate({
            identifier: "CustomFieldsFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          orAll: /*@__PURE__*/ S.suspend(() => __S(644, __c40, 4)).annotate({
            identifier: "CustomFieldsFilterList",
          }),
        }),
      ]);
    case 6:
      return S.suspend(() => S.Struct({ fields: S.optional(__S(645, __c40, 5)) })).annotate({
        identifier: "CustomFilter",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contact: __S(640, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ comment: __S(960, __c60, 0) }),
        /*@__PURE__*/ S.Struct({ file: __S(641, __c40, 1) }),
        /*@__PURE__*/ S.Struct({ sla: __S(642, __c40, 2) }),
        /*@__PURE__*/ S.Struct({ connectCase: __S(643, __c40, 3) }),
        /*@__PURE__*/ S.Struct({ custom: __S(646, __c40, 6) }),
      ]);
    case 8:
      return S.Array(__S(647, __c40, 7));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contactArn: S.String,
          channel: S.String,
          connectedToSystemTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ContactContent" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          type: S.String,
          status: S.String,
          fieldId: S.optional(S.String),
          targetFieldValues: S.optional(__S(946, __c59, 2)),
          targetTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          completionTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SlaConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ slaConfiguration: __S(657, __c41, 1) })).annotate({
        identifier: "SlaContent",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contact: __S(656, __c41, 0) }),
        /*@__PURE__*/ S.Struct({ comment: __S(944, __c59, 0) }),
        /*@__PURE__*/ S.Struct({ file: __S(945, __c59, 1) }),
        /*@__PURE__*/ S.Struct({ sla: __S(658, __c41, 2) }),
        /*@__PURE__*/ S.Struct({ connectCase: __S(947, __c59, 3) }),
        /*@__PURE__*/ S.Struct({ custom: __S(948, __c59, 4) }),
      ]);
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "TagValue" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ equalTo: __S(672, __c42, 0) })]);
    case 2:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(675, __c42, 3)).annotate({ identifier: "CaseFilter" }),
      );
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ field: __S(624, __c39, 0) }),
        /*@__PURE__*/ S.Struct({
          not: /*@__PURE__*/ S.suspend(() => __S(675, __c42, 3)).annotate({
            identifier: "CaseFilter",
          }),
        }),
        /*@__PURE__*/ S.Struct({ tag: __S(673, __c42, 1) }),
        /*@__PURE__*/ S.Struct({
          andAll: /*@__PURE__*/ S.suspend(() => __S(674, __c42, 2)).annotate({
            identifier: "CaseFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          orAll: /*@__PURE__*/ S.suspend(() => __S(674, __c42, 2)).annotate({
            identifier: "CaseFilterList",
          }),
        }),
      ]);
    case 4:
      return S.suspend(() => S.Struct({ fieldId: S.String, sortOrder: S.String })).annotate({
        identifier: "Sort",
      });
    case 5:
      return S.Array(__S(676, __c42, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          searchTerm: S.optional(S.String),
          filter: S.optional(__S(675, __c42, 3)),
          sorts: S.optional(__S(677, __c42, 5)),
          fields: S.optional(__S(1041, __c65, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases-search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchCasesRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String,
          templateId: S.String,
          fields: __S(913, __c57, 1),
          tags: S.optional(__S(1056, __c66, 0)),
        }),
      ).annotate({ identifier: "SearchCasesResponseItem" });
    case 8:
      return S.Array(__S(679, __c42, 7)).pipe(/*@__PURE__*/ T.Sparse());
    case 9:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          cases: __S(680, __c42, 8),
          totalCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchCasesResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(648, __c40, 8)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/domains/{domainId}/cases/{caseId}/related-items-search",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchRelatedItemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          relatedItemId: S.String,
          type: S.String,
          associationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          content: __S(659, __c41, 3),
          tags: S.optional(__S(1056, __c66, 0)),
          performedBy: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "SearchRelatedItemsResponseItem" });
    case 2:
      return S.Array(__S(689, __c43, 1)).pipe(/*@__PURE__*/ T.Sparse());
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), relatedItems: __S(690, __c43, 2) }),
      ).annotate({ identifier: "SearchRelatedItemsResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fieldIds: __S(1041, __c65, 1), sourceCaseId: S.String }),
      ).annotate({ identifier: "FieldsConfiguration" });
    case 1:
      return S.Array(__S(704, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          comment: S.optional(S.Boolean),
          connectCase: S.optional(S.Boolean),
          contact: S.optional(S.Boolean),
          custom: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RelatedItemsConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          secondaryCaseIds: __S(992, __c62, 0),
          fieldsConfiguration: S.optional(__S(705, __c44, 1)),
          relatedItemsConfiguration: S.optional(__S(706, __c44, 2)),
          performedBy: S.optional(__S(896, __c56, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/cases/{caseId}/merge" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMergeCasesRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: __S(1056, __c66, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          tagKeys: __S(992, __c62, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          fields: __S(913, __c57, 1),
          performedBy: S.optional(__S(896, __c56, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/cases/{caseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCaseRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseRuleId: S.String.pipe(T.HttpLabel("caseRuleId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          rule: S.optional(__S(1018, __c63, 10)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/case-rules/{caseRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCaseRuleRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          fieldId: S.String.pipe(T.HttpLabel("fieldId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          attributes: S.optional(__S(1089, __c68, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/fields/{fieldId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFieldRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          layoutId: S.String.pipe(T.HttpLabel("layoutId")),
          name: S.optional(S.String),
          content: S.optional(__S(149, __c9, 5)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/layouts/{layoutId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLayoutRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ comment: __S(944, __c59, 0) }),
        /*@__PURE__*/ S.Struct({ custom: __S(948, __c59, 4) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          relatedItemId: S.String.pipe(T.HttpLabel("relatedItemId")),
          content: __S(816, __c51, 0),
          performedBy: S.optional(__S(896, __c56, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/domains/{domainId}/cases/{caseId}/related-items/{relatedItemId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRelatedItemRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          relatedItemId: S.String,
          relatedItemArn: S.String,
          type: S.String,
          content: __S(659, __c41, 3),
          associationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          tags: S.optional(__S(1056, __c66, 0)),
          lastUpdatedUser: S.optional(__S(896, __c56, 0)),
          createdBy: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "UpdateRelatedItemResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          templateId: S.String.pipe(T.HttpLabel("templateId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          layoutConfiguration: S.optional(__S(208, __c13, 0)),
          requiredFields: S.optional(__S(210, __c13, 2)),
          status: S.optional(S.String),
          rules: S.optional(__S(212, __c13, 4)),
          tagPropagationConfigurations: S.optional(__S(193, __c12, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/domains/{domainId}/templates/{templateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTemplateRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          content: __S(931, __c58, 3),
          cases: __S(866, __c54, 2),
          performedBy: S.optional(__S(896, __c56, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cases:batchCreateRelatedItem" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateRelatedItemRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          caseIdentifier: __S(867, __c54, 3),
          relatedItemId: S.String,
          relatedItemArn: S.String,
        }),
      ).annotate({ identifier: "BatchCreateRelatedItemSuccessEntry" });
    case 2:
      return S.Array(__S(849, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ successfulItems: __S(850, __c53, 2), failedItems: __S(869, __c54, 5) }),
      ).annotate({ identifier: "BatchCreateRelatedItemResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ caseId: S.String }),
        /*@__PURE__*/ S.Struct({ referenceId: S.String }),
      ]);
    case 1:
      return S.suspend(() => S.Struct({ caseIdentifier: __S(864, __c54, 0) })).annotate({
        identifier: "BatchCreateRelatedItemIdentifier",
      });
    case 2:
      return S.Array(__S(865, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          caseId: S.optional(S.String),
          referenceNumber: S.optional(S.String),
          referenceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CaseIdentifier" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          caseIdentifier: __S(867, __c54, 3),
          errorCode: S.String,
          errorMessage: S.String,
        }),
      ).annotate({ identifier: "BatchCreateRelatedItemErrorEntry" });
    case 5:
      return S.Array(__S(868, __c54, 4));
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ doubleValue: S.Number }),
        /*@__PURE__*/ S.Struct({ booleanValue: S.Boolean }),
        /*@__PURE__*/ S.Struct({ emptyValue: __S(960, __c60, 0) }),
        /*@__PURE__*/ S.Struct({ userArnValue: S.String }),
      ]);
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userArn: S.String }),
        /*@__PURE__*/ S.Struct({ customEntity: SensitiveString }),
      ]);
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, value: __S(880, __c55, 0) })).annotate({
        identifier: "FieldValue",
      });
    case 1:
      return S.Array(__S(912, __c57, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ contactArn: S.String })).annotate({
        identifier: "Contact",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          type: S.String,
          fieldId: S.optional(S.String),
          targetFieldValues: S.optional(__S(946, __c59, 2)),
          targetSlaMinutes: S.Number,
        }),
      ).annotate({ identifier: "SlaInputConfiguration" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ slaInputConfiguration: __S(929, __c58, 1) })]);
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contact: __S(928, __c58, 0) }),
        /*@__PURE__*/ S.Struct({ comment: __S(944, __c59, 0) }),
        /*@__PURE__*/ S.Struct({ file: __S(945, __c59, 1) }),
        /*@__PURE__*/ S.Struct({ sla: __S(930, __c58, 2) }),
        /*@__PURE__*/ S.Struct({ connectCase: __S(947, __c59, 3) }),
        /*@__PURE__*/ S.Struct({ custom: __S(948, __c59, 4) }),
      ]);
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ body: S.String, contentType: S.String })).annotate({
        identifier: "CommentContent",
      });
    case 1:
      return S.suspend(() => S.Struct({ fileArn: S.String })).annotate({
        identifier: "FileContent",
      });
    case 2:
      return S.Array(__S(880, __c55, 0));
    case 3:
      return S.suspend(() => S.Struct({ caseId: S.String })).annotate({
        identifier: "ConnectCaseInputContent",
      });
    case 4:
      return S.suspend(() => S.Struct({ fields: __S(913, __c57, 1) })).annotate({
        identifier: "CustomInputContent",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "EmptyFieldValue" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          caseRules: __S(1041, __c65, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/rules-batch" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetCaseRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          caseRuleId: S.String,
          name: S.String,
          caseRuleArn: S.String,
          rule: __S(1018, __c63, 10),
          description: S.optional(S.String),
          deleted: S.optional(S.Boolean),
          createdTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(1056, __c66, 0)),
        }),
      ).annotate({ identifier: "GetCaseRuleResponse" });
    case 2:
      return S.Array(__S(977, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          caseRules: __S(978, __c61, 2),
          errors: __S(1025, __c64, 1),
          unprocessedCaseRules: S.optional(__S(992, __c62, 0)),
        }),
      ).annotate({ identifier: "BatchGetCaseRuleResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ fieldId: S.String })]);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ booleanValue: S.Boolean }),
        /*@__PURE__*/ S.Struct({ doubleValue: S.Number }),
        /*@__PURE__*/ S.Struct({ emptyValue: __S(960, __c60, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          operandOne: __S(1008, __c63, 0),
          operandTwo: __S(1009, __c63, 1),
          result: S.Boolean,
        }),
      ).annotate({ identifier: "BooleanOperands" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          conditions: S.suspend(() => __S(1013, __c63, 5)).annotate({
            identifier: "BooleanConditionList",
          }),
        }),
      ).annotate({ identifier: "CompoundCondition" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ equalTo: __S(1010, __c63, 2) }),
        /*@__PURE__*/ S.Struct({ notEqualTo: __S(1010, __c63, 2) }),
        /*@__PURE__*/ S.Struct({
          andAll: /*@__PURE__*/ S.suspend((): S.Schema<CompoundCondition> =>
            __S(1011, __c63, 3),
          ).annotate({ identifier: "CompoundCondition" }),
        }),
        /*@__PURE__*/ S.Struct({
          orAll: /*@__PURE__*/ S.suspend((): S.Schema<CompoundCondition> =>
            __S(1011, __c63, 3),
          ).annotate({ identifier: "CompoundCondition" }),
        }),
      ]);
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(1012, __c63, 4)).annotate({
          identifier: "BooleanCondition",
        }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({ defaultValue: S.Boolean, conditions: __S(1013, __c63, 5) }),
      ).annotate({ identifier: "RequiredCaseRule" });
    case 7:
      return S.suspend(() =>
        S.Struct({ parentFieldOptionValue: S.String, childFieldOptionValues: __S(992, __c62, 0) }),
      ).annotate({ identifier: "ParentChildFieldOptionsMapping" });
    case 8:
      return S.Array(__S(1015, __c63, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          parentFieldId: S.optional(S.String),
          childFieldId: S.optional(S.String),
          parentChildFieldOptionsMappings: __S(1016, __c63, 8),
        }),
      ).annotate({ identifier: "FieldOptionsCaseRule" });
    case 10:
      return S.Union([
        /*@__PURE__*/ S.Struct({ required: __S(1014, __c63, 6) }),
        /*@__PURE__*/ S.Struct({ fieldOptions: __S(1017, __c63, 9) }),
        /*@__PURE__*/ S.Struct({ hidden: __S(1014, __c63, 6) }),
      ]);
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, errorCode: S.String, message: S.optional(S.String) }),
      ).annotate({ identifier: "CaseRuleError" });
    case 1:
      return S.Array(__S(1024, __c64, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String })).annotate({
        identifier: "CaseRuleIdentifier",
      });
    case 1:
      return S.Array(__S(1040, __c65, 0));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional)).pipe(
        /*@__PURE__*/ T.Sparse(),
      );
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String.pipe(T.HttpLabel("domainId")),
          fields: __S(1041, __c65, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domains/{domainId}/fields-batch" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetFieldRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fieldId: S.String,
          name: S.String,
          fieldArn: S.String,
          description: S.optional(S.String),
          type: S.String,
          namespace: S.String,
          tags: S.optional(__S(1056, __c66, 0)),
          deleted: S.optional(S.Boolean),
          createdTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          attributes: S.optional(__S(1089, __c68, 1)),
        }),
      ).annotate({ identifier: "GetFieldResponse" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ fields: __S(1074, __c67, 2), errors: __S(1025, __c64, 1) }),
      ).annotate({ identifier: "BatchGetFieldResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ isMultiline: S.Boolean })).annotate({
        identifier: "TextAttributes",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ text: __S(1088, __c68, 0) })]);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
