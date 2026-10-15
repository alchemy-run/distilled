import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SSM Incidents",
  serviceShapeName: "SSMIncidents",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ssm-incidents" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://ssm-incidents-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ssm-incidents-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-incidents.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ssm-incidents.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ssm-incidents.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceIdentifier: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      retryAfter: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceIdentifier: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceIdentifier: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type FindingId = string;
export type FindingIdList = string[];
export interface BatchGetIncidentFindingsInput {
  incidentRecordArn: string;
  findingIds: string[];
}
export interface CodeDeployDeployment {
  startTime: Date;
  endTime?: Date;
  deploymentGroupArn: string;
  deploymentId: string;
}
export interface CloudFormationStackUpdate {
  startTime: Date;
  endTime?: Date;
  stackArn: string;
}
export type FindingDetails =
  | { codeDeployDeployment: CodeDeployDeployment; cloudFormationStackUpdate?: never }
  | { codeDeployDeployment?: never; cloudFormationStackUpdate: CloudFormationStackUpdate };
export interface Finding {
  id: string;
  creationTime: Date;
  lastModifiedTime: Date;
  details?: FindingDetails;
}
export type FindingList = Finding[];
export interface BatchGetIncidentFindingsError_ {
  findingId: string;
  code: string;
  message: string;
}
export type BatchGetIncidentFindingsErrorList = BatchGetIncidentFindingsError_[];
export interface BatchGetIncidentFindingsOutput {
  findings: Finding[];
  errors: BatchGetIncidentFindingsError_[];
}
export type RegionName = string;
export type SseKmsKey = string;
export interface RegionMapInputValue {
  sseKmsKeyId?: string;
}
export type RegionMapInput = { [key: string]: RegionMapInputValue | undefined };
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateReplicationSetInput {
  regions: { [key: string]: RegionMapInputValue | undefined };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateReplicationSetOutput {
  arn: string;
}
export type ResponsePlanName = string;
export type ResponsePlanDisplayName = string;
export type IncidentTitle = string;
export type Impact = number;
export type IncidentSummary = string;
export type DedupeString = string;
export type NotificationTargetItem = { snsTopicArn: string };
export type NotificationTargetSet = NotificationTargetItem[];
export interface IncidentTemplate {
  title: string;
  impact: number;
  summary?: string;
  dedupeString?: string;
  notificationTargets?: NotificationTargetItem[];
  incidentTags?: { [key: string]: string | undefined };
}
export interface EmptyChatChannel {}
export type SnsArn = string;
export type ChatbotSnsConfigurationSet = string[];
export type ChatChannel =
  | { empty: EmptyChatChannel; chatbotSns?: never }
  | { empty?: never; chatbotSns: string[] };
export type SsmContactsArn = string;
export type EngagementSet = string[];
export type RoleArn = string;
export type SsmTargetAccount = string;
export type SsmParameterValues = string[];
export type SsmParameters = { [key: string]: string[] | undefined };
export type VariableType = string;
export type DynamicSsmParameterValue = { variable: string };
export type DynamicSsmParameters = { [key: string]: DynamicSsmParameterValue | undefined };
export interface SsmAutomation {
  roleArn: string;
  documentName: string;
  documentVersion?: string;
  targetAccount?: string;
  parameters?: { [key: string]: string[] | undefined };
  dynamicParameters?: { [key: string]: DynamicSsmParameterValue | undefined };
}
export type Action = { ssmAutomation: SsmAutomation };
export type ActionsList = Action[];
export interface PagerDutyIncidentConfiguration {
  serviceId: string;
}
export interface PagerDutyConfiguration {
  name: string;
  secretId: string;
  pagerDutyIncidentConfiguration: PagerDutyIncidentConfiguration;
}
export type Integration = { pagerDutyConfiguration: PagerDutyConfiguration };
export type Integrations = Integration[];
export interface CreateResponsePlanInput {
  clientToken?: string;
  name: string;
  displayName?: string;
  incidentTemplate: IncidentTemplate;
  chatChannel?: ChatChannel;
  engagements?: string[];
  actions?: Action[];
  tags?: { [key: string]: string | undefined };
  integrations?: Integration[];
}
export interface CreateResponsePlanOutput {
  arn: string;
}
export type TimelineEventType = string;
export type EventData = string;
export type GeneratedId = string;
export type EventReference =
  | { resource: string; relatedItemId?: never }
  | { resource?: never; relatedItemId: string };
export type EventReferenceList = EventReference[];
export interface CreateTimelineEventInput {
  clientToken?: string;
  incidentRecordArn: string;
  eventTime: Date;
  eventType: string;
  eventData: string;
  eventReferences?: EventReference[];
}
export type UUID = string;
export interface CreateTimelineEventOutput {
  incidentRecordArn: string;
  eventId: string;
}
export interface DeleteIncidentRecordInput {
  arn: string;
}
export interface DeleteIncidentRecordOutput {}
export interface DeleteReplicationSetInput {
  arn: string;
}
export interface DeleteReplicationSetOutput {}
export type PolicyId = string;
export interface DeleteResourcePolicyInput {
  resourceArn: string;
  policyId: string;
}
export interface DeleteResourcePolicyOutput {}
export interface DeleteResponsePlanInput {
  arn: string;
}
export interface DeleteResponsePlanOutput {}
export interface DeleteTimelineEventInput {
  incidentRecordArn: string;
  eventId: string;
}
export interface DeleteTimelineEventOutput {}
export interface GetIncidentRecordInput {
  arn: string;
}
export type IncidentRecordStatus = string;
export type AutomationExecution = { ssmExecutionArn: string };
export type AutomationExecutionSet = AutomationExecution[];
export type ServicePrincipal = string;
export type IncidentSource = string;
export interface IncidentRecordSource {
  createdBy: string;
  invokedBy?: string;
  resourceArn?: string;
  source: string;
}
export interface IncidentRecord {
  arn: string;
  title: string;
  summary?: string;
  status: string;
  impact: number;
  creationTime: Date;
  resolvedTime?: Date;
  lastModifiedTime: Date;
  lastModifiedBy: string;
  automationExecutions?: AutomationExecution[];
  incidentRecordSource: IncidentRecordSource;
  dedupeString: string;
  chatChannel?: ChatChannel;
  notificationTargets?: NotificationTargetItem[];
}
export interface GetIncidentRecordOutput {
  incidentRecord: IncidentRecord;
}
export interface GetReplicationSetInput {
  arn: string;
}
export type RegionStatus = string;
export interface RegionInfo {
  sseKmsKeyId?: string;
  status: string;
  statusMessage?: string;
  statusUpdateDateTime: Date;
}
export type RegionInfoMap = { [key: string]: RegionInfo | undefined };
export type ReplicationSetStatus = string;
export interface ReplicationSet {
  arn?: string;
  regionMap: { [key: string]: RegionInfo | undefined };
  status: string;
  deletionProtected: boolean;
  createdTime: Date;
  createdBy: string;
  lastModifiedTime: Date;
  lastModifiedBy: string;
}
export interface GetReplicationSetOutput {
  replicationSet: ReplicationSet;
}
export type MaxResults = number;
export type NextToken = string;
export interface GetResourcePoliciesInput {
  resourceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type Policy = string;
export interface ResourcePolicy {
  policyDocument: string;
  policyId: string;
  ramResourceShareRegion: string;
}
export type ResourcePolicyList = ResourcePolicy[];
export interface GetResourcePoliciesOutput {
  resourcePolicies: ResourcePolicy[];
  nextToken?: string;
}
export interface GetResponsePlanInput {
  arn: string;
}
export interface GetResponsePlanOutput {
  arn: string;
  name: string;
  displayName?: string;
  incidentTemplate: IncidentTemplate;
  chatChannel?: ChatChannel;
  engagements?: string[];
  actions?: Action[];
  integrations?: Integration[];
}
export interface GetTimelineEventInput {
  incidentRecordArn: string;
  eventId: string;
}
export interface TimelineEvent {
  incidentRecordArn: string;
  eventId: string;
  eventTime: Date;
  eventUpdatedTime: Date;
  eventType: string;
  eventData: string;
  eventReferences?: EventReference[];
}
export interface GetTimelineEventOutput {
  event: TimelineEvent;
}
export interface ListIncidentFindingsInput {
  incidentRecordArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface FindingSummary {
  id: string;
  lastModifiedTime: Date;
}
export type FindingSummaryList = FindingSummary[];
export interface ListIncidentFindingsOutput {
  findings: FindingSummary[];
  nextToken?: string;
}
export type StringList = string[];
export type IntegerList = number[];
export type AttributeValueList =
  | { stringValues: string[]; integerValues?: never }
  | { stringValues?: never; integerValues: number[] };
export type Condition =
  | { before: Date; after?: never; equals?: never }
  | { before?: never; after: Date; equals?: never }
  | { before?: never; after?: never; equals: AttributeValueList };
export interface Filter {
  key: string;
  condition: Condition;
}
export type FilterList = Filter[];
export interface ListIncidentRecordsInput {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface IncidentRecordSummary {
  arn: string;
  title: string;
  status: string;
  impact: number;
  creationTime: Date;
  resolvedTime?: Date;
  incidentRecordSource: IncidentRecordSource;
}
export type IncidentRecordSummaryList = IncidentRecordSummary[];
export interface ListIncidentRecordsOutput {
  incidentRecordSummaries: IncidentRecordSummary[];
  nextToken?: string;
}
export interface ListRelatedItemsInput {
  incidentRecordArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type Url = string;
export type MetricDefinition = string;
export interface PagerDutyIncidentDetail {
  id: string;
  autoResolve?: boolean;
  secretId?: string;
}
export type ItemValue =
  | { arn: string; url?: never; metricDefinition?: never; pagerDutyIncidentDetail?: never }
  | { arn?: never; url: string; metricDefinition?: never; pagerDutyIncidentDetail?: never }
  | { arn?: never; url?: never; metricDefinition: string; pagerDutyIncidentDetail?: never }
  | {
      arn?: never;
      url?: never;
      metricDefinition?: never;
      pagerDutyIncidentDetail: PagerDutyIncidentDetail;
    };
export type ItemType = string;
export interface ItemIdentifier {
  value: ItemValue;
  type: string;
}
export interface RelatedItem {
  identifier: ItemIdentifier;
  title?: string;
  generatedId?: string;
}
export type RelatedItemList = RelatedItem[];
export interface ListRelatedItemsOutput {
  relatedItems: RelatedItem[];
  nextToken?: string;
}
export interface ListReplicationSetsInput {
  maxResults?: number;
  nextToken?: string;
}
export type ReplicationSetArnList = string[];
export interface ListReplicationSetsOutput {
  replicationSetArns: string[];
  nextToken?: string;
}
export interface ListResponsePlansInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ResponsePlanSummary {
  arn: string;
  name: string;
  displayName?: string;
}
export type ResponsePlanSummaryList = ResponsePlanSummary[];
export interface ListResponsePlansOutput {
  responsePlanSummaries: ResponsePlanSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export type TimelineEventSort = string;
export type SortOrder = string;
export interface ListTimelineEventsInput {
  incidentRecordArn: string;
  filters?: Filter[];
  sortBy?: string;
  sortOrder?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface EventSummary {
  incidentRecordArn: string;
  eventId: string;
  eventTime: Date;
  eventUpdatedTime: Date;
  eventType: string;
  eventReferences?: EventReference[];
}
export type EventSummaryList = EventSummary[];
export interface ListTimelineEventsOutput {
  eventSummaries: EventSummary[];
  nextToken?: string;
}
export interface PutResourcePolicyInput {
  resourceArn: string;
  policy: string;
}
export interface PutResourcePolicyOutput {
  policyId: string;
}
export type RawData = string;
export interface TriggerDetails {
  source: string;
  triggerArn?: string;
  timestamp: Date;
  rawData?: string;
}
export interface StartIncidentInput {
  clientToken?: string;
  responsePlanArn: string;
  title?: string;
  impact?: number;
  triggerDetails?: TriggerDetails;
  relatedItems?: RelatedItem[];
}
export interface StartIncidentOutput {
  incidentRecordArn: string;
}
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
export interface UpdateDeletionProtectionInput {
  arn: string;
  deletionProtected: boolean;
  clientToken?: string;
}
export interface UpdateDeletionProtectionOutput {}
export interface UpdateIncidentRecordInput {
  clientToken?: string;
  arn: string;
  title?: string;
  summary?: string;
  impact?: number;
  status?: string;
  chatChannel?: ChatChannel;
  notificationTargets?: NotificationTargetItem[];
}
export interface UpdateIncidentRecordOutput {}
export type RelatedItemsUpdate =
  | { itemToAdd: RelatedItem; itemToRemove?: never }
  | { itemToAdd?: never; itemToRemove: ItemIdentifier };
export interface UpdateRelatedItemsInput {
  clientToken?: string;
  incidentRecordArn: string;
  relatedItemsUpdate: RelatedItemsUpdate;
}
export interface UpdateRelatedItemsOutput {}
export interface AddRegionAction {
  regionName: string;
  sseKmsKeyId?: string;
}
export interface DeleteRegionAction {
  regionName: string;
}
export type UpdateReplicationSetAction =
  | { addRegionAction: AddRegionAction; deleteRegionAction?: never }
  | { addRegionAction?: never; deleteRegionAction: DeleteRegionAction };
export type UpdateActionList = UpdateReplicationSetAction[];
export interface UpdateReplicationSetInput {
  arn: string;
  actions: UpdateReplicationSetAction[];
  clientToken?: string;
}
export interface UpdateReplicationSetOutput {}
export type TagMapUpdate = { [key: string]: string | undefined };
export interface UpdateResponsePlanInput {
  clientToken?: string;
  arn: string;
  displayName?: string;
  incidentTemplateTitle?: string;
  incidentTemplateImpact?: number;
  incidentTemplateSummary?: string;
  incidentTemplateDedupeString?: string;
  incidentTemplateNotificationTargets?: NotificationTargetItem[];
  chatChannel?: ChatChannel;
  engagements?: string[];
  actions?: Action[];
  incidentTemplateTags?: { [key: string]: string | undefined };
  integrations?: Integration[];
}
export interface UpdateResponsePlanOutput {}
export interface UpdateTimelineEventInput {
  clientToken?: string;
  incidentRecordArn: string;
  eventId: string;
  eventTime?: Date;
  eventType?: string;
  eventData?: string;
  eventReferences?: EventReference[];
}
export interface UpdateTimelineEventOutput {}
export type ExceptionMessage = string;
export type ResourceType = string;
export type ServiceCode = string;
export type BatchGetIncidentFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about all specified findings for an incident, including descriptive details about each finding. A finding
 * represents a recent application environment change made by an CodeDeploy
 * deployment or an CloudFormation stack creation or update that can be investigated as a
 * potential cause of the incident.
 */
export const batchGetIncidentFindings: API.OperationMethod<
  BatchGetIncidentFindingsInput,
  BatchGetIncidentFindingsOutput,
  BatchGetIncidentFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<BatchGetIncidentFindingsInput>,
  output: __S(616, __c38, 8) as any as S.Schema<BatchGetIncidentFindingsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetIncidentFindings",
}));

export type CreateReplicationSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * A replication set replicates and encrypts your data to the provided Regions with the
 * provided KMS key.
 */
export const createReplicationSet: API.OperationMethod<
  CreateReplicationSetInput,
  CreateReplicationSetOutput,
  CreateReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(642, __c40, 2) as any as S.Schema<CreateReplicationSetInput>,
  output: __S(656, __c41, 0) as any as S.Schema<CreateReplicationSetOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationSet",
}));

export type CreateResponsePlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a response plan that automates the initial response to incidents. A response plan
 * engages contacts, starts chat channel collaboration, and initiates runbooks at the beginning
 * of an incident.
 */
export const createResponsePlan: API.OperationMethod<
  CreateResponsePlanInput,
  CreateResponsePlanOutput,
  CreateResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateResponsePlanInput>,
  output: __S(656, __c41, 0) as any as S.Schema<CreateResponsePlanOutput>,
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
  operationName: "CreateResponsePlan",
}));

export type CreateTimelineEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom timeline event on the incident details page of an incident record.
 * Incident Manager automatically creates timeline events that mark key moments during an incident.
 * You can create custom timeline events to mark important events that Incident Manager can detect
 * automatically.
 */
export const createTimelineEvent: API.OperationMethod<
  CreateTimelineEventInput,
  CreateTimelineEventOutput,
  CreateTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateTimelineEventInput>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateTimelineEventOutput>,
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
  operationName: "CreateTimelineEvent",
}));

export type DeleteIncidentRecordError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an incident record from Incident Manager.
 */
export const deleteIncidentRecord: API.OperationMethod<
  DeleteIncidentRecordInput,
  DeleteIncidentRecordOutput,
  DeleteIncidentRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteIncidentRecordInput>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteIncidentRecordOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIncidentRecord",
}));

export type DeleteReplicationSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all Regions in your replication set. Deleting the replication set deletes all
 * Incident Manager data.
 */
export const deleteReplicationSet: API.OperationMethod<
  DeleteReplicationSetInput,
  DeleteReplicationSetOutput,
  DeleteReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteReplicationSetInput>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteReplicationSetOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationSet",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy that Resource Access Manager uses to share your Incident Manager
 * resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteResourcePolicyInput>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteResourcePolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteResponsePlanError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified response plan. Deleting a response plan stops all linked CloudWatch alarms and EventBridge events from creating an incident with this response
 * plan.
 */
export const deleteResponsePlan: API.OperationMethod<
  DeleteResponsePlanInput,
  DeleteResponsePlanOutput,
  DeleteResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteResponsePlanInput>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteResponsePlanOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResponsePlan",
}));

export type DeleteTimelineEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a timeline event from an incident.
 */
export const deleteTimelineEvent: API.OperationMethod<
  DeleteTimelineEventInput,
  DeleteTimelineEventOutput,
  DeleteTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteTimelineEventInput>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteTimelineEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTimelineEvent",
}));

export type GetIncidentRecordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details for the specified incident record.
 */
export const getIncidentRecord: API.OperationMethod<
  GetIncidentRecordInput,
  GetIncidentRecordOutput,
  GetIncidentRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetIncidentRecordInput>,
  output: __S(196, __c12, 4) as any as S.Schema<GetIncidentRecordOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIncidentRecord",
}));

export type GetReplicationSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve your Incident Manager replication set.
 */
export const getReplicationSet: API.OperationMethod<
  GetReplicationSetInput,
  GetReplicationSetOutput,
  GetReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetReplicationSetInput>,
  output: __S(228, __c14, 4) as any as S.Schema<GetReplicationSetOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationSet",
}));

export type GetResourcePoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource policies attached to the specified response plan.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesInput,
  GetResourcePoliciesOutput,
  GetResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ResourcePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetResourcePoliciesInput>,
  output: __S(243, __c15, 3) as any as S.Schema<GetResourcePoliciesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourcePolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResponsePlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified response plan.
 */
export const getResponsePlan: API.OperationMethod<
  GetResponsePlanInput,
  GetResponsePlanOutput,
  GetResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetResponsePlanInput>,
  output: __S(257, __c16, 1) as any as S.Schema<GetResponsePlanOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponsePlan",
}));

export type GetTimelineEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a timeline event based on its ID and incident record.
 */
export const getTimelineEvent: API.OperationMethod<
  GetTimelineEventInput,
  GetTimelineEventOutput,
  GetTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetTimelineEventInput>,
  output: __S(274, __c17, 2) as any as S.Schema<GetTimelineEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimelineEvent",
}));

export type ListIncidentFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the IDs of findings, plus their last modified times, that have been
 * identified for a specified incident. A finding represents a recent application environment
 * change made by an CloudFormation stack creation or update or an CodeDeploy
 * deployment that can be investigated as a potential cause of the incident.
 */
export const listIncidentFindings: API.PaginatedOperationMethod<
  ListIncidentFindingsInput,
  ListIncidentFindingsOutput,
  ListIncidentFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListIncidentFindingsInput>,
  output: __S(291, __c18, 3) as any as S.Schema<ListIncidentFindingsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIncidentFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIncidentRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all incident records in your account. Use this command to retrieve the Amazon
 * Resource Name (ARN) of the incident record you want to update.
 */
export const listIncidentRecords: API.PaginatedOperationMethod<
  ListIncidentRecordsInput,
  ListIncidentRecordsOutput,
  ListIncidentRecordsError,
  Credentials | HttpClient.HttpClient,
  IncidentRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListIncidentRecordsInput>,
  output: __S(307, __c19, 3) as any as S.Schema<ListIncidentRecordsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIncidentRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "incidentRecordSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRelatedItemsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all related items for an incident record.
 */
export const listRelatedItems: API.PaginatedOperationMethod<
  ListRelatedItemsInput,
  ListRelatedItemsOutput,
  ListRelatedItemsError,
  Credentials | HttpClient.HttpClient,
  RelatedItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListRelatedItemsInput>,
  output: __S(337, __c21, 1) as any as S.Schema<ListRelatedItemsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelatedItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relatedItems",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReplicationSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details about the replication set configured in your account.
 */
export const listReplicationSets: API.PaginatedOperationMethod<
  ListReplicationSetsInput,
  ListReplicationSetsOutput,
  ListReplicationSetsError,
  Credentials | HttpClient.HttpClient,
  Arn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListReplicationSetsInput>,
  output: __S(385, __c24, 1) as any as S.Schema<ListReplicationSetsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplicationSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "replicationSetArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResponsePlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all response plans in your account.
 */
export const listResponsePlans: API.PaginatedOperationMethod<
  ListResponsePlansInput,
  ListResponsePlansOutput,
  ListResponsePlansError,
  Credentials | HttpClient.HttpClient,
  ResponsePlanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListResponsePlansInput>,
  output: __S(403, __c25, 3) as any as S.Schema<ListResponsePlansOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponsePlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "responsePlanSummaries",
    pageSize: "maxResults",
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
 * Lists the tags that are attached to the specified response plan or incident.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type ListTimelineEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists timeline events for the specified incident record.
 */
export const listTimelineEvents: API.PaginatedOperationMethod<
  ListTimelineEventsInput,
  ListTimelineEventsOutput,
  ListTimelineEventsError,
  Credentials | HttpClient.HttpClient,
  EventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListTimelineEventsInput>,
  output: __S(435, __c27, 3) as any as S.Schema<ListTimelineEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTimelineEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a resource policy to the specified response plan. The resource policy is used to
 * share the response plan using Resource Access Manager (RAM). For more
 * information about cross-account sharing, see Cross-Region and cross-account incident management.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<PutResourcePolicyInput>,
  output: __S(449, __c28, 1) as any as S.Schema<PutResourcePolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type StartIncidentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Used to start an incident from CloudWatch alarms, EventBridge events, or
 * manually.
 */
export const startIncident: API.OperationMethod<
  StartIncidentInput,
  StartIncidentOutput,
  StartIncidentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(465, __c29, 1) as any as S.Schema<StartIncidentInput>,
  output: __S(466, __c29, 2) as any as S.Schema<StartIncidentOutput>,
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
  operationName: "StartIncident",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a response plan.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
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
  operationName: "UntagResource",
}));

export type UpdateDeletionProtectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update deletion protection to either allow or deny deletion of the final Region in a
 * replication set.
 */
export const updateDeletionProtection: API.OperationMethod<
  UpdateDeletionProtectionInput,
  UpdateDeletionProtectionOutput,
  UpdateDeletionProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<UpdateDeletionProtectionInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateDeletionProtectionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeletionProtection",
}));

export type UpdateIncidentRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the details of an incident record. You can use this operation to update an incident
 * record from the defined chat channel. For more information about using actions in chat
 * channels, see Interacting through chat.
 */
export const updateIncidentRecord: API.OperationMethod<
  UpdateIncidentRecordInput,
  UpdateIncidentRecordOutput,
  UpdateIncidentRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<UpdateIncidentRecordInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateIncidentRecordOutput>,
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
  operationName: "UpdateIncidentRecord",
}));

export type UpdateRelatedItemsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add or remove related items from the related items tab of an incident record.
 */
export const updateRelatedItems: API.OperationMethod<
  UpdateRelatedItemsInput,
  UpdateRelatedItemsOutput,
  UpdateRelatedItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(545, __c34, 1) as any as S.Schema<UpdateRelatedItemsInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateRelatedItemsOutput>,
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
  operationName: "UpdateRelatedItems",
}));

export type UpdateReplicationSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add or delete Regions from your replication set.
 */
export const updateReplicationSet: API.OperationMethod<
  UpdateReplicationSetInput,
  UpdateReplicationSetOutput,
  UpdateReplicationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(564, __c35, 4) as any as S.Schema<UpdateReplicationSetInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateReplicationSetOutput>,
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
  operationName: "UpdateReplicationSet",
}));

export type UpdateResponsePlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified response plan.
 */
export const updateResponsePlan: API.OperationMethod<
  UpdateResponsePlanInput,
  UpdateResponsePlanOutput,
  UpdateResponsePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<UpdateResponsePlanInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateResponsePlanOutput>,
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
  operationName: "UpdateResponsePlan",
}));

export type UpdateTimelineEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a timeline event. You can update events of type `Custom Event`.
 */
export const updateTimelineEvent: API.OperationMethod<
  UpdateTimelineEventInput,
  UpdateTimelineEventOutput,
  UpdateTimelineEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<UpdateTimelineEventInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateTimelineEventOutput>,
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
  operationName: "UpdateTimelineEvent",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          displayName: S.optional(S.String),
          incidentTemplate: __S(48, __c3, 0),
          chatChannel: S.optional(__S(34, __c2, 2)),
          engagements: S.optional(__S(624, __c39, 0)),
          actions: S.optional(__S(69, __c4, 5)),
          tags: S.optional(__S(672, __c42, 0)),
          integrations: S.optional(__S(73, __c4, 9)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createResponsePlan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResponsePlanInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "EmptyChatChannel" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ snsTopicArn: S.String })]);
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ empty: __S(16, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ chatbotSns: __S(624, __c39, 0) }),
      ]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          impact: S.Number,
          summary: S.optional(S.String),
          dedupeString: S.optional(S.String),
          notificationTargets: S.optional(__S(33, __c2, 1)),
          incidentTags: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "IncidentTemplate" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(624, __c39, 0).pipe(S.optional));
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ variable: S.String })]);
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(65, __c4, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          documentName: S.String,
          documentVersion: S.optional(S.String),
          targetAccount: S.optional(S.String),
          parameters: S.optional(__S(64, __c4, 0)),
          dynamicParameters: S.optional(__S(66, __c4, 2)),
        }),
      ).annotate({ identifier: "SsmAutomation" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ ssmAutomation: __S(67, __c4, 3) })]);
    case 5:
      return S.Array(__S(68, __c4, 4));
    case 6:
      return S.suspend(() => S.Struct({ serviceId: S.String })).annotate({
        identifier: "PagerDutyIncidentConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          secretId: S.String,
          pagerDutyIncidentConfiguration: __S(70, __c4, 6),
        }),
      ).annotate({ identifier: "PagerDutyConfiguration" });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ pagerDutyConfiguration: __S(71, __c4, 7) })]);
    case 9:
      return S.Array(__S(72, __c4, 8));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          incidentRecordArn: S.String,
          eventTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          eventData: S.String,
          eventReferences: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createTimelineEvent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTimelineEventInput" });
    case 1:
      return S.suspend(() => S.Struct({ incidentRecordArn: S.String, eventId: S.String })).annotate(
        { identifier: "CreateTimelineEventOutput" },
      );
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ resource: S.String }),
        /*@__PURE__*/ S.Struct({ relatedItemId: S.String }),
      ]);
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteIncidentRecord" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIncidentRecordInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteReplicationSet" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReplicationSetInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, policyId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteResourcePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteResponsePlan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResponsePlanInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ incidentRecordArn: S.String, eventId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteTimelineEvent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTimelineEventInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/getIncidentRecord" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIncidentRecordInput" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ ssmExecutionArn: S.String })]);
    case 2:
      return S.Array(__S(193, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          title: S.String,
          summary: S.optional(S.String),
          status: S.String,
          impact: S.Number,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          resolvedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedBy: S.String,
          automationExecutions: S.optional(__S(194, __c12, 2)),
          incidentRecordSource: __S(208, __c13, 0),
          dedupeString: S.String,
          chatChannel: S.optional(__S(34, __c2, 2)),
          notificationTargets: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "IncidentRecord" });
    case 4:
      return S.suspend(() => S.Struct({ incidentRecord: __S(195, __c12, 3) })).annotate({
        identifier: "GetIncidentRecordOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdBy: S.String,
          invokedBy: S.optional(S.String),
          resourceArn: S.optional(S.String),
          source: S.String,
        }),
      ).annotate({ identifier: "IncidentRecordSource" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/getReplicationSet" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetReplicationSetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sseKmsKeyId: S.optional(S.String),
          status: S.String,
          statusMessage: S.optional(S.String),
          statusUpdateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "RegionInfo" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(225, __c14, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          regionMap: __S(226, __c14, 2),
          status: S.String,
          deletionProtected: S.Boolean,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdBy: S.String,
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedBy: S.String,
        }),
      ).annotate({ identifier: "ReplicationSet" });
    case 4:
      return S.suspend(() => S.Struct({ replicationSet: __S(227, __c14, 3) })).annotate({
        identifier: "GetReplicationSetOutput",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getResourcePolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePoliciesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyDocument: S.String,
          policyId: S.String,
          ramResourceShareRegion: S.String,
        }),
      ).annotate({ identifier: "ResourcePolicy" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ resourcePolicies: __S(242, __c15, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetResourcePoliciesOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/getResponsePlan" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResponsePlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          displayName: S.optional(S.String),
          incidentTemplate: __S(48, __c3, 0),
          chatChannel: S.optional(__S(34, __c2, 2)),
          engagements: S.optional(__S(624, __c39, 0)),
          actions: S.optional(__S(69, __c4, 5)),
          integrations: S.optional(__S(73, __c4, 9)),
        }),
      ).annotate({ identifier: "GetResponsePlanOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          incidentRecordArn: S.String.pipe(T.HttpQuery("incidentRecordArn")),
          eventId: S.String.pipe(T.HttpQuery("eventId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/getTimelineEvent" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTimelineEventInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          incidentRecordArn: S.String,
          eventId: S.String,
          eventTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          eventData: S.String,
          eventReferences: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "TimelineEvent" });
    case 2:
      return S.suspend(() => S.Struct({ event: __S(273, __c17, 1) })).annotate({
        identifier: "GetTimelineEventOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          incidentRecordArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listIncidentFindings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIncidentFindingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "FindingSummary" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ findings: __S(290, __c18, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIncidentFindingsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(324, __c20, 4)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listIncidentRecords" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIncidentRecordsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          title: S.String,
          status: S.String,
          impact: S.Number,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          resolvedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          incidentRecordSource: __S(208, __c13, 0),
        }),
      ).annotate({ identifier: "IncidentRecordSummary" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ incidentRecordSummaries: __S(306, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIncidentRecordsOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValues: __S(624, __c39, 0) }),
        /*@__PURE__*/ S.Struct({ integerValues: __S(320, __c20, 0) }),
      ]);
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          before: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
        /*@__PURE__*/ S.Struct({
          after: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
        /*@__PURE__*/ S.Struct({ equals: __S(321, __c20, 1) }),
      ]);
    case 3:
      return S.suspend(() => S.Struct({ key: S.String, condition: __S(322, __c20, 2) })).annotate({
        identifier: "Filter",
      });
    case 4:
      return S.Array(__S(323, __c20, 3));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          incidentRecordArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listRelatedItems" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRelatedItemsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ relatedItems: __S(352, __c22, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRelatedItemsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(371, __c23, 3));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          autoResolve: S.optional(S.Boolean),
          secretId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PagerDutyIncidentDetail" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ arn: S.String }),
        /*@__PURE__*/ S.Struct({ url: S.String }),
        /*@__PURE__*/ S.Struct({ metricDefinition: S.String }),
        /*@__PURE__*/ S.Struct({ pagerDutyIncidentDetail: __S(368, __c23, 0) }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ value: __S(369, __c23, 1), type: S.String })).annotate({
        identifier: "ItemIdentifier",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          identifier: __S(370, __c23, 2),
          title: S.optional(S.String),
          generatedId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RelatedItem" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listReplicationSets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReplicationSetsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ replicationSetArns: __S(624, __c39, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReplicationSetsOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listResponsePlans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResponsePlansInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, name: S.String, displayName: S.optional(S.String) }),
      ).annotate({ identifier: "ResponsePlanSummary" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ responsePlanSummaries: __S(402, __c25, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResponsePlansOutput" });
  }
}
function __c26(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: __S(672, __c42, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          incidentRecordArn: S.String,
          filters: S.optional(__S(324, __c20, 4)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listTimelineEvents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTimelineEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          incidentRecordArn: S.String,
          eventId: S.String,
          eventTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          eventReferences: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "EventSummary" });
    case 2:
      return S.Array(__S(433, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ eventSummaries: __S(434, __c27, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTimelineEventsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, policy: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/putResourcePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ policyId: S.String })).annotate({
        identifier: "PutResourcePolicyOutput",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          triggerArn: S.optional(S.String),
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          rawData: S.optional(S.String),
        }),
      ).annotate({ identifier: "TriggerDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          responsePlanArn: S.String,
          title: S.optional(S.String),
          impact: S.optional(S.Number),
          triggerDetails: S.optional(__S(464, __c29, 0)),
          relatedItems: S.optional(__S(352, __c22, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/startIncident" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartIncidentInput" });
    case 2:
      return S.suspend(() => S.Struct({ incidentRecordArn: S.String })).annotate({
        identifier: "StartIncidentOutput",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(672, __c42, 0),
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(624, __c39, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          deletionProtected: S.Boolean,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateDeletionProtection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDeletionProtectionInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          arn: S.String,
          title: S.optional(S.String),
          summary: S.optional(S.String),
          impact: S.optional(S.Number),
          status: S.optional(S.String),
          chatChannel: S.optional(__S(34, __c2, 2)),
          notificationTargets: S.optional(__S(33, __c2, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateIncidentRecord" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIncidentRecordInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ itemToAdd: __S(371, __c23, 3) }),
        /*@__PURE__*/ S.Struct({ itemToRemove: __S(370, __c23, 2) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          incidentRecordArn: S.String,
          relatedItemsUpdate: __S(544, __c34, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateRelatedItems" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRelatedItemsInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ regionName: S.String, sseKmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "AddRegionAction" });
    case 1:
      return S.suspend(() => S.Struct({ regionName: S.String })).annotate({
        identifier: "DeleteRegionAction",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ addRegionAction: __S(560, __c35, 0) }),
        /*@__PURE__*/ S.Struct({ deleteRegionAction: __S(561, __c35, 1) }),
      ]);
    case 3:
      return S.Array(__S(562, __c35, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          actions: __S(563, __c35, 3),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateReplicationSet" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReplicationSetInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          arn: S.String,
          displayName: S.optional(S.String),
          incidentTemplateTitle: S.optional(S.String),
          incidentTemplateImpact: S.optional(S.Number),
          incidentTemplateSummary: S.optional(S.String),
          incidentTemplateDedupeString: S.optional(S.String),
          incidentTemplateNotificationTargets: S.optional(__S(33, __c2, 1)),
          chatChannel: S.optional(__S(34, __c2, 2)),
          engagements: S.optional(__S(624, __c39, 0)),
          actions: S.optional(__S(69, __c4, 5)),
          incidentTemplateTags: S.optional(__S(672, __c42, 0)),
          integrations: S.optional(__S(73, __c4, 9)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateResponsePlan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResponsePlanInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          incidentRecordArn: S.String,
          eventId: S.String,
          eventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          eventType: S.optional(S.String),
          eventData: S.optional(S.String),
          eventReferences: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateTimelineEvent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTimelineEventInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ incidentRecordArn: S.String, findingIds: __S(624, __c39, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/batchGetIncidentFindings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetIncidentFindingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentGroupArn: S.String,
          deploymentId: S.String,
        }),
      ).annotate({ identifier: "CodeDeployDeployment" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stackArn: S.String,
        }),
      ).annotate({ identifier: "CloudFormationStackUpdate" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ codeDeployDeployment: __S(609, __c38, 1) }),
        /*@__PURE__*/ S.Struct({ cloudFormationStackUpdate: __S(610, __c38, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          details: S.optional(__S(611, __c38, 3)),
        }),
      ).annotate({ identifier: "Finding" });
    case 5:
      return S.Array(__S(612, __c38, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ findingId: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "BatchGetIncidentFindingsError" });
    case 7:
      return S.Array(__S(614, __c38, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ findings: __S(613, __c38, 5), errors: __S(615, __c38, 7) }),
      ).annotate({ identifier: "BatchGetIncidentFindingsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ sseKmsKeyId: S.optional(S.String) })).annotate({
        identifier: "RegionMapInputValue",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(640, __c40, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          regions: __S(641, __c40, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(672, __c42, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createReplicationSet" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateReplicationSetInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "CreateReplicationSetOutput",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
