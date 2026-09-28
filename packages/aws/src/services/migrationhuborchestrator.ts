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
  sdkId: "MigrationHubOrchestrator",
  target: "AWSMigrationHubOrchestrator",
  version: "2021-08-28",
  sigv4: "migrationhub-orchestrator",
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
                `https://migrationhub-orchestrator-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://migrationhub-orchestrator-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://migrationhub-orchestrator.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://migrationhub-orchestrator.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessDeniedException",
    ["AuthError", "RetryableError"],
    { status: 403 },
  )<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["ConflictError", "RetryableError"],
    { status: 409 },
  )<{ readonly message: string }> {}
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
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type MigrationWorkflowId = string;
export type TemplateSource = { workflowId: string };
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateTemplateRequest {
  templateName: string;
  templateDescription?: string;
  templateSource: TemplateSource;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type StringMapKey = string;
export type StringMapValue = string;
export type StringMap = { [key: string]: string | undefined };
export interface CreateTemplateResponse {
  templateId?: string;
  templateArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type StepInputParametersKey = string;
export type StringValue = string;
export type StringListMember = string;
export type StringList = string[];
export type StepInput =
  | {
      integerValue: number;
      stringValue?: never;
      listOfStringsValue?: never;
      mapOfStringValue?: never;
    }
  | {
      integerValue?: never;
      stringValue: string;
      listOfStringsValue?: never;
      mapOfStringValue?: never;
    }
  | {
      integerValue?: never;
      stringValue?: never;
      listOfStringsValue: string[];
      mapOfStringValue?: never;
    }
  | {
      integerValue?: never;
      stringValue?: never;
      listOfStringsValue?: never;
      mapOfStringValue: { [key: string]: string | undefined };
    };
export type StepInputParameters = { [key: string]: StepInput | undefined };
export interface CreateMigrationWorkflowRequest {
  name: string;
  description?: string;
  templateId: string;
  applicationConfigurationId?: string;
  inputParameters: { [key: string]: StepInput | undefined };
  stepTargets?: string[];
  tags?: { [key: string]: string | undefined };
}
export type MigrationWorkflowStatusEnum = string;
export interface CreateMigrationWorkflowResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  templateId?: string;
  adsApplicationConfigurationId?: string;
  workflowInputs?: { [key: string]: StepInput | undefined };
  stepTargets?: string[];
  status?: string;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export type MigrationWorkflowName = string;
export type StepGroupId = string;
export type StepActionType = string;
export type MigrationWorkflowDescription = string;
export type S3Bucket = string;
export type S3Key = string;
export interface PlatformScriptKey {
  linux?: string;
  windows?: string;
}
export interface PlatformCommand {
  linux?: string;
  windows?: string;
}
export type RunEnvironment = string;
export type TargetType = string;
export interface WorkflowStepAutomationConfiguration {
  scriptLocationS3Bucket?: string;
  scriptLocationS3Key?: PlatformScriptKey;
  command?: PlatformCommand;
  runEnvironment?: string;
  targetType?: string;
}
export type WorkflowStepOutputName = string;
export type DataType = string;
export type MaxStringValue = string;
export type MaxStringList = string[];
export type WorkflowStepOutputUnion =
  | { integerValue: number; stringValue?: never; listOfStringValue?: never }
  | { integerValue?: never; stringValue: string; listOfStringValue?: never }
  | { integerValue?: never; stringValue?: never; listOfStringValue: string[] };
export interface WorkflowStepOutput {
  name?: string;
  dataType?: string;
  required?: boolean;
  value?: WorkflowStepOutputUnion;
}
export type WorkflowStepOutputList = WorkflowStepOutput[];
export interface CreateWorkflowStepRequest {
  name: string;
  stepGroupId: string;
  workflowId: string;
  stepActionType: string;
  description?: string;
  workflowStepAutomationConfiguration?: WorkflowStepAutomationConfiguration;
  stepTarget?: string[];
  outputs?: WorkflowStepOutput[];
  previous?: string[];
  next?: string[];
}
export interface CreateWorkflowStepResponse {
  id?: string;
  stepGroupId?: string;
  workflowId?: string;
  name?: string;
}
export type StepGroupName = string;
export type StepGroupDescription = string;
export interface CreateWorkflowStepGroupRequest {
  workflowId: string;
  name: string;
  description?: string;
  next?: string[];
  previous?: string[];
}
export interface Tool {
  name?: string;
  url?: string;
}
export type ToolsList = Tool[];
export interface CreateWorkflowStepGroupResponse {
  workflowId?: string;
  name?: string;
  id?: string;
  description?: string;
  tools?: Tool[];
  next?: string[];
  previous?: string[];
  creationTime?: Date;
}
export type TemplateId = string;
export interface DeleteTemplateRequest {
  id: string;
}
export interface DeleteTemplateResponse {}
export interface DeleteMigrationWorkflowRequest {
  id: string;
}
export interface DeleteMigrationWorkflowResponse {
  id?: string;
  arn?: string;
  status?: string;
}
export type StepId = string;
export interface DeleteWorkflowStepRequest {
  id: string;
  stepGroupId: string;
  workflowId: string;
}
export interface DeleteWorkflowStepResponse {}
export interface DeleteWorkflowStepGroupRequest {
  workflowId: string;
  id: string;
}
export interface DeleteWorkflowStepGroupResponse {}
export interface GetMigrationWorkflowTemplateRequest {
  id: string;
}
export type TemplateInputName = string;
export interface TemplateInput {
  inputName?: string;
  dataType?: string;
  required?: boolean;
}
export type TemplateInputList = TemplateInput[];
export type TemplateStatus = string;
export interface GetMigrationWorkflowTemplateResponse {
  id?: string;
  templateArn?: string;
  name?: string;
  description?: string;
  inputs?: TemplateInput[];
  tools?: Tool[];
  creationTime?: Date;
  owner?: string;
  status?: string;
  statusMessage?: string;
  templateClass?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetTemplateStepRequest {
  id: string;
  templateId: string;
  stepGroupId: string;
}
export interface StepOutput {
  name?: string;
  dataType?: string;
  required?: boolean;
}
export type StepOutputList = StepOutput[];
export interface StepAutomationConfiguration {
  scriptLocationS3Bucket?: string;
  scriptLocationS3Key?: PlatformScriptKey;
  command?: PlatformCommand;
  runEnvironment?: string;
  targetType?: string;
}
export interface GetTemplateStepResponse {
  id?: string;
  stepGroupId?: string;
  templateId?: string;
  name?: string;
  description?: string;
  stepActionType?: string;
  creationTime?: string;
  previous?: string[];
  next?: string[];
  outputs?: StepOutput[];
  stepAutomationConfiguration?: StepAutomationConfiguration;
}
export interface GetTemplateStepGroupRequest {
  templateId: string;
  id: string;
}
export type StepGroupStatus = string;
export interface GetTemplateStepGroupResponse {
  templateId?: string;
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  creationTime?: Date;
  lastModifiedTime?: Date;
  tools?: Tool[];
  previous?: string[];
  next?: string[];
}
export interface GetMigrationWorkflowRequest {
  id: string;
}
export interface GetMigrationWorkflowResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  templateId?: string;
  adsApplicationConfigurationId?: string;
  adsApplicationName?: string;
  status?: string;
  statusMessage?: string;
  creationTime?: Date;
  lastStartTime?: Date;
  lastStopTime?: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  tools?: Tool[];
  totalSteps?: number;
  completedSteps?: number;
  workflowInputs?: { [key: string]: StepInput | undefined };
  tags?: { [key: string]: string | undefined };
  workflowBucket?: string;
}
export interface GetWorkflowStepRequest {
  workflowId: string;
  stepGroupId: string;
  id: string;
}
export type Owner = string;
export type StepStatus = string;
export interface GetWorkflowStepResponse {
  name?: string;
  stepGroupId?: string;
  workflowId?: string;
  stepId?: string;
  description?: string;
  stepActionType?: string;
  owner?: string;
  workflowStepAutomationConfiguration?: WorkflowStepAutomationConfiguration;
  stepTarget?: string[];
  outputs?: WorkflowStepOutput[];
  previous?: string[];
  next?: string[];
  status?: string;
  statusMessage?: string;
  scriptOutputLocation?: string;
  creationTime?: Date;
  lastStartTime?: Date;
  endTime?: Date;
  noOfSrvCompleted?: number;
  noOfSrvFailed?: number;
  totalNoOfSrv?: number;
}
export interface GetWorkflowStepGroupRequest {
  id: string;
  workflowId: string;
}
export interface GetWorkflowStepGroupResponse {
  id?: string;
  workflowId?: string;
  name?: string;
  description?: string;
  status?: string;
  owner?: string;
  creationTime?: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  tools?: Tool[];
  previous?: string[];
  next?: string[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListPluginsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type PluginId = string;
export type PluginHealth = string;
export type IPAddress = string;
export type PluginVersion = string;
export interface PluginSummary {
  pluginId?: string;
  hostname?: string;
  status?: string;
  ipAddress?: string;
  version?: string;
  registeredTime?: string;
}
export type PluginSummaries = PluginSummary[];
export interface ListPluginsResponse {
  nextToken?: string;
  plugins?: PluginSummary[];
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type TemplateName = string;
export interface ListMigrationWorkflowTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
  name?: string;
}
export interface TemplateSummary {
  id?: string;
  name?: string;
  arn?: string;
  description?: string;
}
export type TemplateSummaryList = TemplateSummary[];
export interface ListMigrationWorkflowTemplatesResponse {
  nextToken?: string;
  templateSummary: TemplateSummary[];
}
export interface ListTemplateStepGroupsRequest {
  maxResults?: number;
  nextToken?: string;
  templateId: string;
}
export interface TemplateStepGroupSummary {
  id?: string;
  name?: string;
  previous?: string[];
  next?: string[];
}
export type TemplateStepGroupSummaryList = TemplateStepGroupSummary[];
export interface ListTemplateStepGroupsResponse {
  nextToken?: string;
  templateStepGroupSummary: TemplateStepGroupSummary[];
}
export interface ListTemplateStepsRequest {
  maxResults?: number;
  nextToken?: string;
  templateId: string;
  stepGroupId: string;
}
export interface TemplateStepSummary {
  id?: string;
  stepGroupId?: string;
  templateId?: string;
  name?: string;
  stepActionType?: string;
  targetType?: string;
  owner?: string;
  previous?: string[];
  next?: string[];
}
export type TemplateStepSummaryList = TemplateStepSummary[];
export interface ListTemplateStepsResponse {
  nextToken?: string;
  templateStepSummaryList?: TemplateStepSummary[];
}
export type ApplicationConfigurationName = string;
export interface ListMigrationWorkflowsRequest {
  maxResults?: number;
  nextToken?: string;
  templateId?: string;
  adsApplicationConfigurationName?: string;
  status?: string;
  name?: string;
}
export interface MigrationWorkflowSummary {
  id?: string;
  name?: string;
  templateId?: string;
  adsApplicationConfigurationName?: string;
  status?: string;
  creationTime?: Date;
  endTime?: Date;
  statusMessage?: string;
  completedSteps?: number;
  totalSteps?: number;
}
export type MigrationWorkflowSummaryList = MigrationWorkflowSummary[];
export interface ListMigrationWorkflowsResponse {
  nextToken?: string;
  migrationWorkflowSummary: MigrationWorkflowSummary[];
}
export interface ListWorkflowStepGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  workflowId: string;
}
export interface WorkflowStepGroupSummary {
  id?: string;
  name?: string;
  owner?: string;
  status?: string;
  previous?: string[];
  next?: string[];
}
export type WorkflowStepGroupsSummaryList = WorkflowStepGroupSummary[];
export interface ListWorkflowStepGroupsResponse {
  nextToken?: string;
  workflowStepGroupsSummary: WorkflowStepGroupSummary[];
}
export interface ListWorkflowStepsRequest {
  nextToken?: string;
  maxResults?: number;
  workflowId: string;
  stepGroupId: string;
}
export interface WorkflowStepSummary {
  stepId?: string;
  name?: string;
  stepActionType?: string;
  owner?: string;
  previous?: string[];
  next?: string[];
  status?: string;
  statusMessage?: string;
  noOfSrvCompleted?: number;
  noOfSrvFailed?: number;
  totalNoOfSrv?: number;
  description?: string;
  scriptLocation?: string;
}
export type WorkflowStepsSummaryList = WorkflowStepSummary[];
export interface ListWorkflowStepsResponse {
  nextToken?: string;
  workflowStepsSummary: WorkflowStepSummary[];
}
export interface RetryWorkflowStepRequest {
  workflowId: string;
  stepGroupId: string;
  id: string;
}
export interface RetryWorkflowStepResponse {
  stepGroupId?: string;
  workflowId?: string;
  id?: string;
  status?: string;
}
export interface StartMigrationWorkflowRequest {
  id: string;
}
export interface StartMigrationWorkflowResponse {
  id?: string;
  arn?: string;
  status?: string;
  statusMessage?: string;
  lastStartTime?: Date;
}
export interface StopMigrationWorkflowRequest {
  id: string;
}
export interface StopMigrationWorkflowResponse {
  id?: string;
  arn?: string;
  status?: string;
  statusMessage?: string;
  lastStopTime?: Date;
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
export interface UpdateTemplateRequest {
  id: string;
  templateName?: string;
  templateDescription?: string;
  clientToken?: string;
}
export interface UpdateTemplateResponse {
  templateId?: string;
  templateArn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateMigrationWorkflowRequest {
  id: string;
  name?: string;
  description?: string;
  inputParameters?: { [key: string]: StepInput | undefined };
  stepTargets?: string[];
}
export interface UpdateMigrationWorkflowResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  templateId?: string;
  adsApplicationConfigurationId?: string;
  workflowInputs?: { [key: string]: StepInput | undefined };
  stepTargets?: string[];
  status?: string;
  creationTime?: Date;
  lastModifiedTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export type StepName = string;
export type StepDescription = string;
export interface UpdateWorkflowStepRequest {
  id: string;
  stepGroupId: string;
  workflowId: string;
  name?: string;
  description?: string;
  stepActionType?: string;
  workflowStepAutomationConfiguration?: WorkflowStepAutomationConfiguration;
  stepTarget?: string[];
  outputs?: WorkflowStepOutput[];
  previous?: string[];
  next?: string[];
  status?: string;
}
export interface UpdateWorkflowStepResponse {
  id?: string;
  stepGroupId?: string;
  workflowId?: string;
  name?: string;
}
export interface UpdateWorkflowStepGroupRequest {
  workflowId: string;
  id: string;
  name?: string;
  description?: string;
  next?: string[];
  previous?: string[];
}
export interface UpdateWorkflowStepGroupResponse {
  workflowId?: string;
  name?: string;
  id?: string;
  description?: string;
  tools?: Tool[];
  next?: string[];
  previous?: string[];
  lastModifiedTime?: Date;
}
export type CreateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a migration workflow template.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /template",
    input: {
      templateName: 0,
      templateDescription: 0,
      templateSource: { workflowId: 0 },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
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
  operationName: "CreateTemplate",
})) as any;

export type CreateWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a workflow to orchestrate your migrations.
 */
export const createWorkflow: API.OperationMethod<
  CreateMigrationWorkflowRequest,
  CreateMigrationWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /migrationworkflow/",
    input: {
      name: 0,
      description: 0,
      templateId: 0,
      applicationConfigurationId: 0,
      inputParameters: D.map(i_StepInput),
      stepTargets: 0,
      tags: 0,
    },
    output: { creationTime: D.ts },
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
  operationName: "CreateWorkflow",
})) as any;

export type CreateWorkflowStepError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a step in the migration workflow.
 */
export const createWorkflowStep: API.OperationMethod<
  CreateWorkflowStepRequest,
  CreateWorkflowStepResponse,
  CreateWorkflowStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflowstep",
    input: {
      name: 0,
      stepGroupId: 0,
      workflowId: 0,
      stepActionType: 0,
      description: 0,
      workflowStepAutomationConfiguration:
        i_WorkflowStepAutomationConfiguration,
      stepTarget: 0,
      outputs: D.list(i_WorkflowStepOutput),
      previous: 0,
      next: 0,
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
  operationName: "CreateWorkflowStep",
})) as any;

export type CreateWorkflowStepGroupError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a step group in a migration workflow.
 */
export const createWorkflowStepGroup: API.OperationMethod<
  CreateWorkflowStepGroupRequest,
  CreateWorkflowStepGroupResponse,
  CreateWorkflowStepGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflowstepgroups",
    input: { workflowId: 0, name: 0, description: 0, next: 0, previous: 0 },
    output: { creationTime: D.ts },
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
  operationName: "CreateWorkflowStepGroup",
})) as any;

export type DeleteTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a migration workflow template.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /template/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplate",
})) as any;

export type DeleteWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a migration workflow. You must pause a running workflow in Migration Hub Orchestrator console to
 * delete it.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteMigrationWorkflowRequest,
  DeleteMigrationWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /migrationworkflow/{id}",
    input: { id: 0 },
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
  operationName: "DeleteWorkflow",
})) as any;

export type DeleteWorkflowStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a step in a migration workflow. Pause the workflow to delete a running
 * step.
 */
export const deleteWorkflowStep: API.OperationMethod<
  DeleteWorkflowStepRequest,
  DeleteWorkflowStepResponse,
  DeleteWorkflowStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workflowstep/{id}",
    input: {
      id: 0,
      stepGroupId: D.m({ query: "stepGroupId" }),
      workflowId: D.m({ query: "workflowId" }),
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
  operationName: "DeleteWorkflowStep",
})) as any;

export type DeleteWorkflowStepGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a step group in a migration workflow.
 */
export const deleteWorkflowStepGroup: API.OperationMethod<
  DeleteWorkflowStepGroupRequest,
  DeleteWorkflowStepGroupResponse,
  DeleteWorkflowStepGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workflowstepgroup/{id}",
    input: { workflowId: D.m({ query: "workflowId" }), id: 0 },
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
  operationName: "DeleteWorkflowStepGroup",
})) as any;

export type GetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get the template you want to use for creating a migration workflow.
 */
export const getTemplate: API.OperationMethod<
  GetMigrationWorkflowTemplateRequest,
  GetMigrationWorkflowTemplateResponse,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /migrationworkflowtemplate/{id}",
    input: { id: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
})) as any;

export type GetTemplateStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a specific step in a template.
 */
export const getTemplateStep: API.OperationMethod<
  GetTemplateStepRequest,
  GetTemplateStepResponse,
  GetTemplateStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /templatestep/{id}",
    input: {
      id: 0,
      templateId: D.m({ query: "templateId" }),
      stepGroupId: D.m({ query: "stepGroupId" }),
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
  operationName: "GetTemplateStep",
})) as any;

export type GetTemplateStepGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a step group in a template.
 */
export const getTemplateStepGroup: API.OperationMethod<
  GetTemplateStepGroupRequest,
  GetTemplateStepGroupResponse,
  GetTemplateStepGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /templates/{templateId}/stepgroups/{id}",
    input: { templateId: 0, id: 0 },
    output: { creationTime: D.ts, lastModifiedTime: D.ts },
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
  operationName: "GetTemplateStepGroup",
})) as any;

export type GetWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get migration workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetMigrationWorkflowRequest,
  GetMigrationWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /migrationworkflow/{id}",
    input: { id: 0 },
    output: {
      creationTime: D.ts,
      lastStartTime: D.ts,
      lastStopTime: D.ts,
      lastModifiedTime: D.ts,
      endTime: D.ts,
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
  operationName: "GetWorkflow",
})) as any;

export type GetWorkflowStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Get a step in the migration workflow.
 */
export const getWorkflowStep: API.OperationMethod<
  GetWorkflowStepRequest,
  GetWorkflowStepResponse,
  GetWorkflowStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflowstep/{id}",
    input: {
      workflowId: D.m({ query: "workflowId" }),
      stepGroupId: D.m({ query: "stepGroupId" }),
      id: 0,
    },
    output: { creationTime: D.ts, lastStartTime: D.ts, endTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowStep",
})) as any;

export type GetWorkflowStepGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the step group of a migration workflow.
 */
export const getWorkflowStepGroup: API.OperationMethod<
  GetWorkflowStepGroupRequest,
  GetWorkflowStepGroupResponse,
  GetWorkflowStepGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflowstepgroup/{id}",
    input: { id: 0, workflowId: D.m({ query: "workflowId" }) },
    output: { creationTime: D.ts, lastModifiedTime: D.ts, endTime: D.ts },
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
  operationName: "GetWorkflowStepGroup",
})) as any;

export type ListPluginsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * List AWS Migration Hub Orchestrator plugins.
 */
export const listPlugins: API.PaginatedOperationMethod<
  ListPluginsRequest,
  ListPluginsResponse,
  ListPluginsError,
  Credentials | HttpClient.HttpClient,
  PluginSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /plugins",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlugins",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plugins",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the tags added to a resource.
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
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * List the templates available in Migration Hub Orchestrator to create a migration workflow.
 */
export const listTemplates: API.PaginatedOperationMethod<
  ListMigrationWorkflowTemplatesRequest,
  ListMigrationWorkflowTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /migrationworkflowtemplates",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      name: D.m({ query: "name" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTemplateStepGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the step groups in a template.
 */
export const listTemplateStepGroups: API.PaginatedOperationMethod<
  ListTemplateStepGroupsRequest,
  ListTemplateStepGroupsResponse,
  ListTemplateStepGroupsError,
  Credentials | HttpClient.HttpClient,
  TemplateStepGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /templatestepgroups/{templateId}",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      templateId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateStepGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateStepGroupSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTemplateStepsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the steps in a template.
 */
export const listTemplateSteps: API.PaginatedOperationMethod<
  ListTemplateStepsRequest,
  ListTemplateStepsResponse,
  ListTemplateStepsError,
  Credentials | HttpClient.HttpClient,
  TemplateStepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /templatesteps",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      templateId: D.m({ query: "templateId" }),
      stepGroupId: D.m({ query: "stepGroupId" }),
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
  operationName: "ListTemplateSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateStepSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the migration workflows.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListMigrationWorkflowsRequest,
  ListMigrationWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  MigrationWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /migrationworkflows",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      templateId: D.m({ query: "templateId" }),
      adsApplicationConfigurationName: D.m({
        query: "adsApplicationConfigurationName",
      }),
      status: D.m({ query: "status" }),
      name: D.m({ query: "name" }),
    },
    output: {
      migrationWorkflowSummary: D.list({ creationTime: D.ts, endTime: D.ts }),
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
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "migrationWorkflowSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowStepGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the step groups in a migration workflow.
 */
export const listWorkflowStepGroups: API.PaginatedOperationMethod<
  ListWorkflowStepGroupsRequest,
  ListWorkflowStepGroupsResponse,
  ListWorkflowStepGroupsError,
  Credentials | HttpClient.HttpClient,
  WorkflowStepGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflowstepgroups",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      workflowId: D.m({ query: "workflowId" }),
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
  operationName: "ListWorkflowStepGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowStepGroupsSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowStepsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the steps in a workflow.
 */
export const listWorkflowSteps: API.PaginatedOperationMethod<
  ListWorkflowStepsRequest,
  ListWorkflowStepsResponse,
  ListWorkflowStepsError,
  Credentials | HttpClient.HttpClient,
  WorkflowStepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow/{workflowId}/workflowstepgroups/{stepGroupId}/workflowsteps",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      workflowId: 0,
      stepGroupId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowStepsSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RetryWorkflowStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retry a failed step in a migration workflow.
 */
export const retryWorkflowStep: API.OperationMethod<
  RetryWorkflowStepRequest,
  RetryWorkflowStepResponse,
  RetryWorkflowStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /retryworkflowstep/{id}",
    input: {
      workflowId: D.m({ query: "workflowId" }),
      stepGroupId: D.m({ query: "stepGroupId" }),
      id: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryWorkflowStep",
})) as any;

export type StartWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start a migration workflow.
 */
export const startWorkflow: API.OperationMethod<
  StartMigrationWorkflowRequest,
  StartMigrationWorkflowResponse,
  StartWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /migrationworkflow/{id}/start",
    input: { id: 0 },
    output: { lastStartTime: D.ts },
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
  operationName: "StartWorkflow",
})) as any;

export type StopWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop an ongoing migration workflow.
 */
export const stopWorkflow: API.OperationMethod<
  StopMigrationWorkflowRequest,
  StopMigrationWorkflowResponse,
  StopWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /migrationworkflow/{id}/stop",
    input: { id: 0 },
    output: { lastStopTime: D.ts },
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
  operationName: "StopWorkflow",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource by specifying its Amazon Resource Name (ARN).
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
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the tags for a resource.
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
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a migration workflow template.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /template/{id}",
    input: {
      id: 0,
      templateName: 0,
      templateDescription: 0,
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
  operationName: "UpdateTemplate",
})) as any;

export type UpdateWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a migration workflow.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateMigrationWorkflowRequest,
  UpdateMigrationWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /migrationworkflow/{id}",
    input: {
      id: 0,
      name: 0,
      description: 0,
      inputParameters: D.map(i_StepInput),
      stepTargets: 0,
    },
    output: { creationTime: D.ts, lastModifiedTime: D.ts },
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
  operationName: "UpdateWorkflow",
})) as any;

export type UpdateWorkflowStepError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a step in a migration workflow.
 */
export const updateWorkflowStep: API.OperationMethod<
  UpdateWorkflowStepRequest,
  UpdateWorkflowStepResponse,
  UpdateWorkflowStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflowstep/{id}",
    input: {
      id: 0,
      stepGroupId: 0,
      workflowId: 0,
      name: 0,
      description: 0,
      stepActionType: 0,
      workflowStepAutomationConfiguration:
        i_WorkflowStepAutomationConfiguration,
      stepTarget: 0,
      outputs: D.list(i_WorkflowStepOutput),
      previous: 0,
      next: 0,
      status: 0,
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
  operationName: "UpdateWorkflowStep",
})) as any;

export type UpdateWorkflowStepGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the step group in a migration workflow.
 */
export const updateWorkflowStepGroup: API.OperationMethod<
  UpdateWorkflowStepGroupRequest,
  UpdateWorkflowStepGroupResponse,
  UpdateWorkflowStepGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflowstepgroup/{id}",
    input: {
      workflowId: D.m({ query: "workflowId" }),
      id: 0,
      name: 0,
      description: 0,
      next: 0,
      previous: 0,
    },
    output: { lastModifiedTime: D.ts },
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
  operationName: "UpdateWorkflowStepGroup",
})) as any;

const i_StepInput: D.LazyStruct = () => ({
  integerValue: 0,
  stringValue: 0,
  listOfStringsValue: 0,
  mapOfStringValue: 0,
});
const i_WorkflowStepAutomationConfiguration: D.LazyStruct = () => ({
  scriptLocationS3Bucket: 0,
  scriptLocationS3Key: { linux: 0, windows: 0 },
  command: { linux: 0, windows: 0 },
  runEnvironment: 0,
  targetType: 0,
});
const i_WorkflowStepOutput: D.LazyStruct = () => ({
  name: 0,
  dataType: 0,
  required: 0,
  value: { integerValue: 0, stringValue: 0, listOfStringValue: 0 },
});
