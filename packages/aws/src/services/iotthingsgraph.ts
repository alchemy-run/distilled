import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "IoTThingsGraph",
  target: "IotThingsGraphFrontEndService",
  version: "2018-09-06",
  sigv4: "iotthingsgraph",
  protocol: awsJson1_1Protocol,
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
                `https://iotthingsgraph-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://iotthingsgraph-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iotthingsgraph.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://iotthingsgraph.${Region}.amazonaws.com`);
          }
          return e(
            `https://iotthingsgraph.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
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
export type ThingName = string;
export type Urn = string;
export type Version = number;
export interface AssociateEntityToThingRequest {
  thingName: string;
  entityId: string;
  namespaceVersion?: number;
}
export interface AssociateEntityToThingResponse {}
export type DefinitionLanguage = "GRAPHQL" | (string & {});
export type DefinitionText = string;
export interface DefinitionDocument {
  language: DefinitionLanguage;
  text: string;
}
export interface CreateFlowTemplateRequest {
  definition: DefinitionDocument;
  compatibleNamespaceVersion?: number;
}
export type Arn = string;
export interface FlowTemplateSummary {
  id?: string;
  arn?: string;
  revisionNumber?: number;
  createdAt?: Date;
}
export interface CreateFlowTemplateResponse {
  summary?: FlowTemplateSummary;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export type DeploymentTarget = "GREENGRASS" | "CLOUD" | (string & {});
export type GroupName = string;
export type S3BucketName = string;
export type Enabled = boolean;
export type RoleArn = string;
export interface MetricsConfiguration {
  cloudMetricEnabled?: boolean;
  metricRuleRoleArn?: string;
}
export interface CreateSystemInstanceRequest {
  tags?: Tag[];
  definition: DefinitionDocument;
  target: DeploymentTarget;
  greengrassGroupName?: string;
  s3BucketName?: string;
  metricsConfiguration?: MetricsConfiguration;
  flowActionsRoleArn?: string;
}
export type SystemInstanceDeploymentStatus =
  | "NOT_DEPLOYED"
  | "BOOTSTRAP"
  | "DEPLOY_IN_PROGRESS"
  | "DEPLOYED_IN_TARGET"
  | "UNDEPLOY_IN_PROGRESS"
  | "FAILED"
  | "PENDING_DELETE"
  | "DELETED_IN_TARGET"
  | (string & {});
export type GreengrassGroupId = string;
export type GreengrassGroupVersionId = string;
export interface SystemInstanceSummary {
  id?: string;
  arn?: string;
  status?: SystemInstanceDeploymentStatus;
  target?: DeploymentTarget;
  greengrassGroupName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  greengrassGroupId?: string;
  greengrassGroupVersionId?: string;
}
export interface CreateSystemInstanceResponse {
  summary?: SystemInstanceSummary;
}
export interface CreateSystemTemplateRequest {
  definition: DefinitionDocument;
  compatibleNamespaceVersion?: number;
}
export interface SystemTemplateSummary {
  id?: string;
  arn?: string;
  revisionNumber?: number;
  createdAt?: Date;
}
export interface CreateSystemTemplateResponse {
  summary?: SystemTemplateSummary;
}
export interface DeleteFlowTemplateRequest {
  id: string;
}
export interface DeleteFlowTemplateResponse {}
export interface DeleteNamespaceRequest {}
export type NamespaceName = string;
export interface DeleteNamespaceResponse {
  namespaceArn?: string;
  namespaceName?: string;
}
export interface DeleteSystemInstanceRequest {
  id?: string;
}
export interface DeleteSystemInstanceResponse {}
export interface DeleteSystemTemplateRequest {
  id: string;
}
export interface DeleteSystemTemplateResponse {}
export interface DeploySystemInstanceRequest {
  id?: string;
}
export type GreengrassDeploymentId = string;
export interface DeploySystemInstanceResponse {
  summary: SystemInstanceSummary;
  greengrassDeploymentId?: string;
}
export interface DeprecateFlowTemplateRequest {
  id: string;
}
export interface DeprecateFlowTemplateResponse {}
export interface DeprecateSystemTemplateRequest {
  id: string;
}
export interface DeprecateSystemTemplateResponse {}
export interface DescribeNamespaceRequest {
  namespaceName?: string;
}
export interface DescribeNamespaceResponse {
  namespaceArn?: string;
  namespaceName?: string;
  trackingNamespaceName?: string;
  trackingNamespaceVersion?: number;
  namespaceVersion?: number;
}
export type EntityType =
  | "DEVICE"
  | "SERVICE"
  | "DEVICE_MODEL"
  | "CAPABILITY"
  | "STATE"
  | "ACTION"
  | "EVENT"
  | "PROPERTY"
  | "MAPPING"
  | "ENUM"
  | (string & {});
export interface DissociateEntityFromThingRequest {
  thingName: string;
  entityType: EntityType;
}
export interface DissociateEntityFromThingResponse {}
export type Urns = string[];
export interface GetEntitiesRequest {
  ids: string[];
  namespaceVersion?: number;
}
export interface EntityDescription {
  id?: string;
  arn?: string;
  type?: EntityType;
  createdAt?: Date;
  definition?: DefinitionDocument;
}
export type EntityDescriptions = EntityDescription[];
export interface GetEntitiesResponse {
  descriptions?: EntityDescription[];
}
export interface GetFlowTemplateRequest {
  id: string;
  revisionNumber?: number;
}
export interface FlowTemplateDescription {
  summary?: FlowTemplateSummary;
  definition?: DefinitionDocument;
  validatedNamespaceVersion?: number;
}
export interface GetFlowTemplateResponse {
  description?: FlowTemplateDescription;
}
export type NextToken = string;
export type MaxResults = number;
export interface GetFlowTemplateRevisionsRequest {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export type FlowTemplateSummaries = FlowTemplateSummary[];
export interface GetFlowTemplateRevisionsResponse {
  summaries?: FlowTemplateSummary[];
  nextToken?: string;
}
export interface GetNamespaceDeletionStatusRequest {}
export type NamespaceDeletionStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type NamespaceDeletionStatusErrorCodes =
  | "VALIDATION_FAILED"
  | (string & {});
export interface GetNamespaceDeletionStatusResponse {
  namespaceArn?: string;
  namespaceName?: string;
  status?: NamespaceDeletionStatus;
  errorCode?: NamespaceDeletionStatusErrorCodes;
  errorMessage?: string;
}
export interface GetSystemInstanceRequest {
  id: string;
}
export interface DependencyRevision {
  id?: string;
  revisionNumber?: number;
}
export type DependencyRevisions = DependencyRevision[];
export interface SystemInstanceDescription {
  summary?: SystemInstanceSummary;
  definition?: DefinitionDocument;
  s3BucketName?: string;
  metricsConfiguration?: MetricsConfiguration;
  validatedNamespaceVersion?: number;
  validatedDependencyRevisions?: DependencyRevision[];
  flowActionsRoleArn?: string;
}
export interface GetSystemInstanceResponse {
  description?: SystemInstanceDescription;
}
export interface GetSystemTemplateRequest {
  id: string;
  revisionNumber?: number;
}
export interface SystemTemplateDescription {
  summary?: SystemTemplateSummary;
  definition?: DefinitionDocument;
  validatedNamespaceVersion?: number;
}
export interface GetSystemTemplateResponse {
  description?: SystemTemplateDescription;
}
export interface GetSystemTemplateRevisionsRequest {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export type SystemTemplateSummaries = SystemTemplateSummary[];
export interface GetSystemTemplateRevisionsResponse {
  summaries?: SystemTemplateSummary[];
  nextToken?: string;
}
export type UploadId = string;
export interface GetUploadStatusRequest {
  uploadId: string;
}
export type UploadStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type StringList = string[];
export interface GetUploadStatusResponse {
  uploadId: string;
  uploadStatus: UploadStatus;
  namespaceArn?: string;
  namespaceName?: string;
  namespaceVersion?: number;
  failureReason?: string[];
  createdDate: Date;
}
export type FlowExecutionId = string;
export interface ListFlowExecutionMessagesRequest {
  flowExecutionId: string;
  nextToken?: string;
  maxResults?: number;
}
export type FlowExecutionMessageId = string;
export type FlowExecutionEventType =
  | "EXECUTION_STARTED"
  | "EXECUTION_FAILED"
  | "EXECUTION_ABORTED"
  | "EXECUTION_SUCCEEDED"
  | "STEP_STARTED"
  | "STEP_FAILED"
  | "STEP_SUCCEEDED"
  | "ACTIVITY_SCHEDULED"
  | "ACTIVITY_STARTED"
  | "ACTIVITY_FAILED"
  | "ACTIVITY_SUCCEEDED"
  | "START_FLOW_EXECUTION_TASK"
  | "SCHEDULE_NEXT_READY_STEPS_TASK"
  | "THING_ACTION_TASK"
  | "THING_ACTION_TASK_FAILED"
  | "THING_ACTION_TASK_SUCCEEDED"
  | "ACKNOWLEDGE_TASK_MESSAGE"
  | (string & {});
export type FlowExecutionMessagePayload = string;
export interface FlowExecutionMessage {
  messageId?: string;
  eventType?: FlowExecutionEventType;
  timestamp?: Date;
  payload?: string;
}
export type FlowExecutionMessages = FlowExecutionMessage[];
export interface ListFlowExecutionMessagesResponse {
  messages?: FlowExecutionMessage[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  maxResults?: number;
  resourceArn: string;
  nextToken?: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
  nextToken?: string;
}
export type EntityTypes = EntityType[];
export type EntityFilterName =
  | "NAME"
  | "NAMESPACE"
  | "SEMANTIC_TYPE_PATH"
  | "REFERENCED_ENTITY_ID"
  | (string & {});
export type EntityFilterValue = string;
export type EntityFilterValues = string[];
export interface EntityFilter {
  name?: EntityFilterName;
  value?: string[];
}
export type EntityFilters = EntityFilter[];
export interface SearchEntitiesRequest {
  entityTypes: EntityType[];
  filters?: EntityFilter[];
  nextToken?: string;
  maxResults?: number;
  namespaceVersion?: number;
}
export interface SearchEntitiesResponse {
  descriptions?: EntityDescription[];
  nextToken?: string;
}
export interface SearchFlowExecutionsRequest {
  systemInstanceId: string;
  flowExecutionId?: string;
  startTime?: Date;
  endTime?: Date;
  nextToken?: string;
  maxResults?: number;
}
export type FlowExecutionStatus =
  | "RUNNING"
  | "ABORTED"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface FlowExecutionSummary {
  flowExecutionId?: string;
  status?: FlowExecutionStatus;
  systemInstanceId?: string;
  flowTemplateId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type FlowExecutionSummaries = FlowExecutionSummary[];
export interface SearchFlowExecutionsResponse {
  summaries?: FlowExecutionSummary[];
  nextToken?: string;
}
export type FlowTemplateFilterName = "DEVICE_MODEL_ID" | (string & {});
export type FlowTemplateFilterValue = string;
export type FlowTemplateFilterValues = string[];
export interface FlowTemplateFilter {
  name: FlowTemplateFilterName;
  value: string[];
}
export type FlowTemplateFilters = FlowTemplateFilter[];
export interface SearchFlowTemplatesRequest {
  filters?: FlowTemplateFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface SearchFlowTemplatesResponse {
  summaries?: FlowTemplateSummary[];
  nextToken?: string;
}
export type SystemInstanceFilterName =
  | "SYSTEM_TEMPLATE_ID"
  | "STATUS"
  | "GREENGRASS_GROUP_NAME"
  | (string & {});
export type SystemInstanceFilterValue = string;
export type SystemInstanceFilterValues = string[];
export interface SystemInstanceFilter {
  name?: SystemInstanceFilterName;
  value?: string[];
}
export type SystemInstanceFilters = SystemInstanceFilter[];
export interface SearchSystemInstancesRequest {
  filters?: SystemInstanceFilter[];
  nextToken?: string;
  maxResults?: number;
}
export type SystemInstanceSummaries = SystemInstanceSummary[];
export interface SearchSystemInstancesResponse {
  summaries?: SystemInstanceSummary[];
  nextToken?: string;
}
export type SystemTemplateFilterName = "FLOW_TEMPLATE_ID" | (string & {});
export type SystemTemplateFilterValue = string;
export type SystemTemplateFilterValues = string[];
export interface SystemTemplateFilter {
  name: SystemTemplateFilterName;
  value: string[];
}
export type SystemTemplateFilters = SystemTemplateFilter[];
export interface SearchSystemTemplatesRequest {
  filters?: SystemTemplateFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface SearchSystemTemplatesResponse {
  summaries?: SystemTemplateSummary[];
  nextToken?: string;
}
export interface SearchThingsRequest {
  entityId: string;
  nextToken?: string;
  maxResults?: number;
  namespaceVersion?: number;
}
export type ThingArn = string;
export interface Thing {
  thingArn?: string;
  thingName?: string;
}
export type Things = Thing[];
export interface SearchThingsResponse {
  things?: Thing[];
  nextToken?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export interface UndeploySystemInstanceRequest {
  id?: string;
}
export interface UndeploySystemInstanceResponse {
  summary?: SystemInstanceSummary;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateFlowTemplateRequest {
  id: string;
  definition: DefinitionDocument;
  compatibleNamespaceVersion?: number;
}
export interface UpdateFlowTemplateResponse {
  summary?: FlowTemplateSummary;
}
export interface UpdateSystemTemplateRequest {
  id: string;
  definition: DefinitionDocument;
  compatibleNamespaceVersion?: number;
}
export interface UpdateSystemTemplateResponse {
  summary?: SystemTemplateSummary;
}
export type SyncWithPublicNamespace = boolean;
export type DeprecateExistingEntities = boolean;
export interface UploadEntityDefinitionsRequest {
  document?: DefinitionDocument;
  syncWithPublicNamespace?: boolean;
  deprecateExistingEntities?: boolean;
}
export interface UploadEntityDefinitionsResponse {
  uploadId: string;
}
export type ErrorMessage = string;
export type AssociateEntityToThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a device with a concrete thing that is in the user's registry.
 *
 * A thing can be associated with only one device at a time. If you associate a thing with a new device id, its previous association will be removed.
 */
export const associateEntityToThing: API.OperationMethod<
  AssociateEntityToThingRequest,
  AssociateEntityToThingResponse,
  AssociateEntityToThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { thingName: 0, entityId: 0, namespaceVersion: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEntityToThing",
})) as any;

export type CreateFlowTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a workflow template. Workflows can be created only in the user's namespace. (The public namespace contains only
 * entities.) The workflow can contain only entities in the specified namespace. The workflow is validated against the entities in the
 * latest version of the user's namespace unless another namespace version is specified in the request.
 */
export const createFlowTemplate: API.OperationMethod<
  CreateFlowTemplateRequest,
  CreateFlowTemplateResponse,
  CreateFlowTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { definition: i_DefinitionDocument, compatibleNamespaceVersion: 0 },
    output: { summary: o_FlowTemplateSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlowTemplate",
})) as any;

export type CreateSystemInstanceError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a system instance.
 *
 * This action validates the system instance, prepares the deployment-related resources. For Greengrass deployments, it updates the Greengrass group that is
 * specified by the `greengrassGroupName` parameter. It also adds a file to the S3 bucket specified by the `s3BucketName` parameter. You need to
 * call `DeploySystemInstance` after running this action.
 *
 * For Greengrass deployments, since this action modifies and adds resources to a Greengrass group and an S3 bucket on the caller's behalf, the calling identity must have write permissions
 * to both the specified Greengrass group and S3 bucket. Otherwise, the call will fail with an authorization error.
 *
 * For cloud deployments, this action requires a `flowActionsRoleArn` value. This is an IAM role
 * that has permissions to access AWS services, such as AWS Lambda and AWS IoT, that the flow uses when it executes.
 *
 * If the definition document doesn't specify a version of the user's namespace, the latest version will be used by default.
 */
export const createSystemInstance: API.OperationMethod<
  CreateSystemInstanceRequest,
  CreateSystemInstanceResponse,
  CreateSystemInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      tags: D.list(i_Tag),
      definition: i_DefinitionDocument,
      target: 0,
      greengrassGroupName: 0,
      s3BucketName: 0,
      metricsConfiguration: { cloudMetricEnabled: 0, metricRuleRoleArn: 0 },
      flowActionsRoleArn: 0,
    },
    output: { summary: o_SystemInstanceSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSystemInstance",
})) as any;

export type CreateSystemTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a system. The system is validated against the entities in the
 * latest version of the user's namespace unless another namespace version is specified in the request.
 */
export const createSystemTemplate: API.OperationMethod<
  CreateSystemTemplateRequest,
  CreateSystemTemplateResponse,
  CreateSystemTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { definition: i_DefinitionDocument, compatibleNamespaceVersion: 0 },
    output: { summary: o_SystemTemplateSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSystemTemplate",
})) as any;

export type DeleteFlowTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a workflow. Any new system or deployment that contains this workflow will fail to update or deploy.
 * Existing deployments that contain the workflow will continue to run (since they use a snapshot of the workflow taken at the time of deployment).
 */
export const deleteFlowTemplate: API.OperationMethod<
  DeleteFlowTemplateRequest,
  DeleteFlowTemplateResponse,
  DeleteFlowTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlowTemplate",
})) as any;

export type DeleteNamespaceError =
  | InternalFailureException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified namespace. This action deletes all of the entities in the namespace. Delete the systems and flows that use entities in the namespace before performing this action. This action takes no
 * request parameters.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
})) as any;

export type DeleteSystemInstanceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a system instance.
 * Only system instances that have never been deployed, or that have been undeployed can be deleted.
 *
 * Users can create a new system instance that has the same ID as a deleted system instance.
 */
export const deleteSystemInstance: API.OperationMethod<
  DeleteSystemInstanceRequest,
  DeleteSystemInstanceResponse,
  DeleteSystemInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSystemInstance",
})) as any;

export type DeleteSystemTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a system. New deployments can't contain the system after its deletion.
 * Existing deployments that contain the system will continue to work because they use a snapshot of the system that is taken when it is deployed.
 */
export const deleteSystemTemplate: API.OperationMethod<
  DeleteSystemTemplateRequest,
  DeleteSystemTemplateResponse,
  DeleteSystemTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSystemTemplate",
})) as any;

export type DeploySystemInstanceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * **Greengrass and Cloud Deployments**
 *
 * Deploys the system instance to the target specified in `CreateSystemInstance`.
 *
 * **Greengrass Deployments**
 *
 * If the system or any workflows and entities have been updated before this action is called, then the deployment will create a new Amazon Simple Storage Service
 * resource file and then deploy it.
 *
 * Since this action creates a Greengrass deployment on the caller's behalf, the calling identity must have write permissions
 * to the specified Greengrass group. Otherwise, the call will fail with an authorization error.
 *
 * For information about the artifacts that get added to your Greengrass core device when you use this API, see AWS IoT Things Graph and AWS IoT Greengrass.
 */
export const deploySystemInstance: API.OperationMethod<
  DeploySystemInstanceRequest,
  DeploySystemInstanceResponse,
  DeploySystemInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { summary: o_SystemInstanceSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeploySystemInstance",
})) as any;

export type DeprecateFlowTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deprecates the specified workflow. This action marks the workflow for deletion. Deprecated flows can't be deployed, but existing deployments will continue to run.
 */
export const deprecateFlowTemplate: API.OperationMethod<
  DeprecateFlowTemplateRequest,
  DeprecateFlowTemplateResponse,
  DeprecateFlowTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateFlowTemplate",
})) as any;

export type DeprecateSystemTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deprecates the specified system.
 */
export const deprecateSystemTemplate: API.OperationMethod<
  DeprecateSystemTemplateRequest,
  DeprecateSystemTemplateResponse,
  DeprecateSystemTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateSystemTemplate",
})) as any;

export type DescribeNamespaceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the latest version of the user's namespace and the public version that it is tracking.
 */
export const describeNamespace: API.OperationMethod<
  DescribeNamespaceRequest,
  DescribeNamespaceResponse,
  DescribeNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { namespaceName: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNamespace",
})) as any;

export type DissociateEntityFromThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Dissociates a device entity from a concrete thing. The action takes only the type of the entity that you need to dissociate because only
 * one entity of a particular type can be associated with a thing.
 */
export const dissociateEntityFromThing: API.OperationMethod<
  DissociateEntityFromThingRequest,
  DissociateEntityFromThingResponse,
  DissociateEntityFromThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { thingName: 0, entityType: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DissociateEntityFromThing",
})) as any;

export type GetEntitiesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets definitions of the specified entities. Uses the latest version of the user's namespace by default. This API returns the
 * following TDM entities.
 *
 * - Properties
 *
 * - States
 *
 * - Events
 *
 * - Actions
 *
 * - Capabilities
 *
 * - Mappings
 *
 * - Devices
 *
 * - Device Models
 *
 * - Services
 *
 * This action doesn't return definitions for systems, flows, and deployments.
 */
export const getEntities: API.OperationMethod<
  GetEntitiesRequest,
  GetEntitiesResponse,
  GetEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ids: 0, namespaceVersion: 0 },
    output: { descriptions: D.list(o_EntityDescription) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntities",
})) as any;

export type GetFlowTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the latest version of the `DefinitionDocument` and `FlowTemplateSummary` for the specified workflow.
 */
export const getFlowTemplate: API.OperationMethod<
  GetFlowTemplateRequest,
  GetFlowTemplateResponse,
  GetFlowTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, revisionNumber: 0 },
    output: { description: { summary: o_FlowTemplateSummary } },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowTemplate",
})) as any;

export type GetFlowTemplateRevisionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets revisions of the specified workflow. Only the last 100 revisions are stored. If the workflow has been deprecated,
 * this action will return revisions that occurred before the deprecation. This action won't work for workflows that have been deleted.
 */
export const getFlowTemplateRevisions: API.PaginatedOperationMethod<
  GetFlowTemplateRevisionsRequest,
  GetFlowTemplateRevisionsResponse,
  GetFlowTemplateRevisionsError,
  Credentials | HttpClient.HttpClient,
  FlowTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, nextToken: 0, maxResults: 0 },
    output: { summaries: D.list(o_FlowTemplateSummary) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowTemplateRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetNamespaceDeletionStatusError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the status of a namespace deletion task.
 */
export const getNamespaceDeletionStatus: API.OperationMethod<
  GetNamespaceDeletionStatusRequest,
  GetNamespaceDeletionStatusResponse,
  GetNamespaceDeletionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespaceDeletionStatus",
})) as any;

export type GetSystemInstanceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a system instance.
 */
export const getSystemInstance: API.OperationMethod<
  GetSystemInstanceRequest,
  GetSystemInstanceResponse,
  GetSystemInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { description: { summary: o_SystemInstanceSummary } },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSystemInstance",
})) as any;

export type GetSystemTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a system.
 */
export const getSystemTemplate: API.OperationMethod<
  GetSystemTemplateRequest,
  GetSystemTemplateResponse,
  GetSystemTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, revisionNumber: 0 },
    output: { description: { summary: o_SystemTemplateSummary } },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSystemTemplate",
})) as any;

export type GetSystemTemplateRevisionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets revisions made to the specified system template. Only the previous 100 revisions are stored. If the system has been deprecated, this action will return
 * the revisions that occurred before its deprecation. This action won't work with systems that have been deleted.
 */
export const getSystemTemplateRevisions: API.PaginatedOperationMethod<
  GetSystemTemplateRevisionsRequest,
  GetSystemTemplateRevisionsResponse,
  GetSystemTemplateRevisionsError,
  Credentials | HttpClient.HttpClient,
  SystemTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, nextToken: 0, maxResults: 0 },
    output: { summaries: D.list(o_SystemTemplateSummary) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSystemTemplateRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetUploadStatusError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the status of the specified upload.
 */
export const getUploadStatus: API.OperationMethod<
  GetUploadStatusRequest,
  GetUploadStatusResponse,
  GetUploadStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { uploadId: 0 },
    output: { createdDate: D.ts },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUploadStatus",
})) as any;

export type ListFlowExecutionMessagesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of objects that contain information about events in a flow execution.
 */
export const listFlowExecutionMessages: API.PaginatedOperationMethod<
  ListFlowExecutionMessagesRequest,
  ListFlowExecutionMessagesResponse,
  ListFlowExecutionMessagesError,
  Credentials | HttpClient.HttpClient,
  FlowExecutionMessage
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { flowExecutionId: 0, nextToken: 0, maxResults: 0 },
    output: { messages: D.list({ timestamp: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowExecutionMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all tags on an AWS IoT Things Graph resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, resourceArn: 0, nextToken: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchEntitiesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for entities of the specified type. You can search for entities in your namespace and the public namespace that you're tracking.
 */
export const searchEntities: API.PaginatedOperationMethod<
  SearchEntitiesRequest,
  SearchEntitiesResponse,
  SearchEntitiesError,
  Credentials | HttpClient.HttpClient,
  EntityDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      entityTypes: 0,
      filters: D.list({ name: 0, value: 0 }),
      nextToken: 0,
      maxResults: 0,
      namespaceVersion: 0,
    },
    output: { descriptions: D.list(o_EntityDescription) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchEntities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "descriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchFlowExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for AWS IoT Things Graph workflow execution instances.
 */
export const searchFlowExecutions: API.PaginatedOperationMethod<
  SearchFlowExecutionsRequest,
  SearchFlowExecutionsResponse,
  SearchFlowExecutionsError,
  Credentials | HttpClient.HttpClient,
  FlowExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      systemInstanceId: 0,
      flowExecutionId: 0,
      startTime: 0,
      endTime: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { summaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFlowExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchFlowTemplatesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for summary information about workflows.
 */
export const searchFlowTemplates: API.PaginatedOperationMethod<
  SearchFlowTemplatesRequest,
  SearchFlowTemplatesResponse,
  SearchFlowTemplatesError,
  Credentials | HttpClient.HttpClient,
  FlowTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, value: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: { summaries: D.list(o_FlowTemplateSummary) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFlowTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSystemInstancesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for system instances in the user's account.
 */
export const searchSystemInstances: API.PaginatedOperationMethod<
  SearchSystemInstancesRequest,
  SearchSystemInstancesResponse,
  SearchSystemInstancesError,
  Credentials | HttpClient.HttpClient,
  SystemInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, value: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: { summaries: D.list(o_SystemInstanceSummary) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSystemInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSystemTemplatesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for summary information about systems in the user's account. You can filter by the ID of a workflow to return only systems that use the specified workflow.
 */
export const searchSystemTemplates: API.PaginatedOperationMethod<
  SearchSystemTemplatesRequest,
  SearchSystemTemplatesResponse,
  SearchSystemTemplatesError,
  Credentials | HttpClient.HttpClient,
  SystemTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, value: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: { summaries: D.list(o_SystemTemplateSummary) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSystemTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchThingsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for things associated with the specified entity. You can search by both device and device model.
 *
 * For example, if two different devices, camera1 and camera2, implement the camera device model, the user can associate thing1 to camera1 and thing2 to camera2.
 * `SearchThings(camera2)` will return only thing2, but `SearchThings(camera)` will return both thing1 and thing2.
 *
 * This action searches for exact matches and doesn't perform partial text matching.
 */
export const searchThings: API.PaginatedOperationMethod<
  SearchThingsRequest,
  SearchThingsResponse,
  SearchThingsError,
  Credentials | HttpClient.HttpClient,
  Thing
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { entityId: 0, nextToken: 0, maxResults: 0, namespaceVersion: 0 },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchThings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a tag for the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UndeploySystemInstanceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a system instance from its target (Cloud or Greengrass).
 */
export const undeploySystemInstance: API.OperationMethod<
  UndeploySystemInstanceRequest,
  UndeploySystemInstanceResponse,
  UndeploySystemInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { summary: o_SystemInstanceSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeploySystemInstance",
})) as any;

export type UntagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes a tag from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateFlowTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the specified workflow. All deployed systems and system instances that use the workflow will see the changes in the flow when it is redeployed. If you don't want this
 * behavior, copy the workflow (creating a new workflow with a different ID), and update the copy. The workflow can contain only entities in the specified namespace.
 */
export const updateFlowTemplate: API.OperationMethod<
  UpdateFlowTemplateRequest,
  UpdateFlowTemplateResponse,
  UpdateFlowTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      definition: i_DefinitionDocument,
      compatibleNamespaceVersion: 0,
    },
    output: { summary: o_FlowTemplateSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowTemplate",
})) as any;

export type UpdateSystemTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the specified system. You don't need to run this action after updating a workflow. Any deployment that uses the system will see the changes in the system when it is redeployed.
 */
export const updateSystemTemplate: API.OperationMethod<
  UpdateSystemTemplateRequest,
  UpdateSystemTemplateResponse,
  UpdateSystemTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      definition: i_DefinitionDocument,
      compatibleNamespaceVersion: 0,
    },
    output: { summary: o_SystemTemplateSummary },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSystemTemplate",
})) as any;

export type UploadEntityDefinitionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Asynchronously uploads one or more entity definitions to the user's namespace. The `document` parameter is required if
 * `syncWithPublicNamespace` and `deleteExistingEntites` are false. If the `syncWithPublicNamespace` parameter is set to
 * `true`, the user's namespace will synchronize with the latest version of the public namespace. If `deprecateExistingEntities` is set to true,
 * all entities in the latest version will be deleted before the new `DefinitionDocument` is uploaded.
 *
 * When a user uploads entity definitions for the first time, the service creates a new namespace for the user. The new namespace tracks the public namespace. Currently users
 * can have only one namespace. The namespace version increments whenever a user uploads entity definitions that are backwards-incompatible and whenever a user sets the
 * `syncWithPublicNamespace` parameter or the `deprecateExistingEntities` parameter to `true`.
 *
 * The IDs for all of the entities should be in URN format. Each entity must be in the user's namespace. Users can't create entities in the public namespace, but entity definitions can refer to entities in the public namespace.
 *
 * Valid entities are `Device`, `DeviceModel`, `Service`, `Capability`, `State`, `Action`, `Event`, `Property`,
 * `Mapping`, `Enum`.
 */
export const uploadEntityDefinitions: API.OperationMethod<
  UploadEntityDefinitionsRequest,
  UploadEntityDefinitionsResponse,
  UploadEntityDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      document: i_DefinitionDocument,
      syncWithPublicNamespace: 0,
      deprecateExistingEntities: 0,
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadEntityDefinitions",
})) as any;

const i_DefinitionDocument: D.LazyStruct = () => ({ language: 0, text: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_EntityDescription: D.LazyStruct = () => ({ createdAt: D.ts });
const o_FlowTemplateSummary: D.LazyStruct = () => ({ createdAt: D.ts });
const o_SystemInstanceSummary: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_SystemTemplateSummary: D.LazyStruct = () => ({ createdAt: D.ts });
