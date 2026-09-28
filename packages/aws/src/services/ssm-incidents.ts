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
  sdkId: "SSM Incidents",
  target: "SSMIncidents",
  version: "2018-05-10",
  sigv4: "ssm-incidents",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ssm-incidents.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ssm-incidents.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceIdentifier?: string;
    readonly resourceType?: string;
    readonly retryAfter?: Date;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceIdentifier?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceIdentifier?: string;
    readonly resourceType?: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
  | {
      codeDeployDeployment: CodeDeployDeployment;
      cloudFormationStackUpdate?: never;
    }
  | {
      codeDeployDeployment?: never;
      cloudFormationStackUpdate: CloudFormationStackUpdate;
    };
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
export type BatchGetIncidentFindingsErrorList =
  BatchGetIncidentFindingsError_[];
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
export type DynamicSsmParameters = {
  [key: string]: DynamicSsmParameterValue | undefined;
};
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
  | {
      arn: string;
      url?: never;
      metricDefinition?: never;
      pagerDutyIncidentDetail?: never;
    }
  | {
      arn?: never;
      url: string;
      metricDefinition?: never;
      pagerDutyIncidentDetail?: never;
    }
  | {
      arn?: never;
      url?: never;
      metricDefinition: string;
      pagerDutyIncidentDetail?: never;
    }
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
  descriptor: {
    service: svc,
    http: "POST /batchGetIncidentFindings",
    input: { incidentRecordArn: 0, findingIds: 0 },
    output: {
      findings: D.list({
        creationTime: D.ts,
        lastModifiedTime: D.ts,
        details: {
          codeDeployDeployment: { startTime: D.ts, endTime: D.ts },
          cloudFormationStackUpdate: { startTime: D.ts, endTime: D.ts },
        },
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
  operationName: "BatchGetIncidentFindings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /createReplicationSet",
    input: {
      regions: D.map({ sseKmsKeyId: 0 }),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
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
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /createResponsePlan",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      displayName: 0,
      incidentTemplate: {
        title: 0,
        impact: 0,
        summary: 0,
        dedupeString: 0,
        notificationTargets: D.list(i_NotificationTargetItem),
        incidentTags: 0,
      },
      chatChannel: i_ChatChannel,
      engagements: 0,
      actions: D.list(i_Action),
      tags: 0,
      integrations: D.list(i_Integration),
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
  operationName: "CreateResponsePlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /createTimelineEvent",
    input: {
      clientToken: D.m({ idempotency: true }),
      incidentRecordArn: 0,
      eventTime: 0,
      eventType: 0,
      eventData: 0,
      eventReferences: D.list(i_EventReference),
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
  operationName: "CreateTimelineEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteIncidentRecord",
    input: { arn: 0 },
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
  operationName: "DeleteIncidentRecord",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteReplicationSet",
    input: { arn: D.m({ query: "arn" }) },
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
  operationName: "DeleteReplicationSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteResourcePolicy",
    input: { resourceArn: 0, policyId: 0 },
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
  operationName: "DeleteResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteResponsePlan",
    input: { arn: 0 },
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
  operationName: "DeleteResponsePlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteTimelineEvent",
    input: { incidentRecordArn: 0, eventId: 0 },
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
  operationName: "DeleteTimelineEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /getIncidentRecord",
    input: { arn: D.m({ query: "arn" }) },
    output: {
      incidentRecord: {
        creationTime: D.ts,
        resolvedTime: D.ts,
        lastModifiedTime: D.ts,
      },
    },
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
  operationName: "GetIncidentRecord",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /getReplicationSet",
    input: { arn: D.m({ query: "arn" }) },
    output: {
      replicationSet: {
        regionMap: D.map({ statusUpdateDateTime: D.ts }),
        createdTime: D.ts,
        lastModifiedTime: D.ts,
      },
    },
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
  operationName: "GetReplicationSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getResourcePolicies",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      maxResults: 0,
      nextToken: 0,
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
  descriptor: {
    service: svc,
    http: "GET /getResponsePlan",
    input: { arn: D.m({ query: "arn" }) },
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
  operationName: "GetResponsePlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /getTimelineEvent",
    input: {
      incidentRecordArn: D.m({ query: "incidentRecordArn" }),
      eventId: D.m({ query: "eventId" }),
    },
    output: { event: { eventTime: D.ts, eventUpdatedTime: D.ts } },
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
  operationName: "GetTimelineEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listIncidentFindings",
    input: { incidentRecordArn: 0, maxResults: 0, nextToken: 0 },
    output: { findings: D.list({ lastModifiedTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /listIncidentRecords",
    input: { filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    output: {
      incidentRecordSummaries: D.list({
        creationTime: D.ts,
        resolvedTime: D.ts,
      }),
    },
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
  descriptor: {
    service: svc,
    http: "POST /listRelatedItems",
    input: { incidentRecordArn: 0, maxResults: 0, nextToken: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /listReplicationSets",
    input: { maxResults: 0, nextToken: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /listResponsePlans",
    input: { maxResults: 0, nextToken: 0 },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listTimelineEvents",
    input: {
      incidentRecordArn: 0,
      filters: D.list(i_Filter),
      sortBy: 0,
      sortOrder: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      eventSummaries: D.list({ eventTime: D.ts, eventUpdatedTime: D.ts }),
    },
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
  descriptor: {
    service: svc,
    http: "POST /putResourcePolicy",
    input: { resourceArn: 0, policy: 0 },
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
  operationName: "PutResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /startIncident",
    input: {
      clientToken: D.m({ idempotency: true }),
      responsePlanArn: 0,
      title: 0,
      impact: 0,
      triggerDetails: { source: 0, triggerArn: 0, timestamp: 0, rawData: 0 },
      relatedItems: D.list(i_RelatedItem),
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
  operationName: "StartIncident",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateDeletionProtection",
    input: {
      arn: 0,
      deletionProtected: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateDeletionProtection",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateIncidentRecord",
    input: {
      clientToken: D.m({ idempotency: true }),
      arn: 0,
      title: 0,
      summary: 0,
      impact: 0,
      status: 0,
      chatChannel: i_ChatChannel,
      notificationTargets: D.list(i_NotificationTargetItem),
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
  operationName: "UpdateIncidentRecord",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateRelatedItems",
    input: {
      clientToken: D.m({ idempotency: true }),
      incidentRecordArn: 0,
      relatedItemsUpdate: {
        itemToAdd: i_RelatedItem,
        itemToRemove: i_ItemIdentifier,
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
  operationName: "UpdateRelatedItems",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateReplicationSet",
    input: {
      arn: 0,
      actions: D.list({
        addRegionAction: { regionName: 0, sseKmsKeyId: 0 },
        deleteRegionAction: { regionName: 0 },
      }),
      clientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateReplicationSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateResponsePlan",
    input: {
      clientToken: D.m({ idempotency: true }),
      arn: 0,
      displayName: 0,
      incidentTemplateTitle: 0,
      incidentTemplateImpact: 0,
      incidentTemplateSummary: 0,
      incidentTemplateDedupeString: 0,
      incidentTemplateNotificationTargets: D.list(i_NotificationTargetItem),
      chatChannel: i_ChatChannel,
      engagements: 0,
      actions: D.list(i_Action),
      incidentTemplateTags: 0,
      integrations: D.list(i_Integration),
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
  operationName: "UpdateResponsePlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateTimelineEvent",
    input: {
      clientToken: D.m({ idempotency: true }),
      incidentRecordArn: 0,
      eventId: 0,
      eventTime: 0,
      eventType: 0,
      eventData: 0,
      eventReferences: D.list(i_EventReference),
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
  operationName: "UpdateTimelineEvent",
})) as any;

const i_Action: D.LazyStruct = () => ({
  ssmAutomation: {
    roleArn: 0,
    documentName: 0,
    documentVersion: 0,
    targetAccount: 0,
    parameters: 0,
    dynamicParameters: D.map({ variable: 0 }),
  },
});
const i_ChatChannel: D.LazyStruct = () => ({ empty: {}, chatbotSns: 0 });
const i_EventReference: D.LazyStruct = () => ({
  resource: 0,
  relatedItemId: 0,
});
const i_Filter: D.LazyStruct = () => ({
  key: 0,
  condition: {
    before: 0,
    after: 0,
    equals: { stringValues: 0, integerValues: 0 },
  },
});
const i_Integration: D.LazyStruct = () => ({
  pagerDutyConfiguration: {
    name: 0,
    secretId: 0,
    pagerDutyIncidentConfiguration: { serviceId: 0 },
  },
});
const i_ItemIdentifier: D.LazyStruct = () => ({
  value: {
    arn: 0,
    url: 0,
    metricDefinition: 0,
    pagerDutyIncidentDetail: { id: 0, autoResolve: 0, secretId: 0 },
  },
  type: 0,
});
const i_NotificationTargetItem: D.LazyStruct = () => ({ snsTopicArn: 0 });
const i_RelatedItem: D.LazyStruct = () => ({
  identifier: i_ItemIdentifier,
  title: 0,
  generatedId: 0,
});
