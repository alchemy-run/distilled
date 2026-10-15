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
  sdkId: "MigrationHubOrchestrator",
  serviceShapeName: "AWSMigrationHubOrchestrator",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "migrationhub-orchestrator" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-08-28");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://migrationhub-orchestrator.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://migrationhub-orchestrator.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://migrationhub-orchestrator.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(403), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withAuthError, C.withRetryableError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(409), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
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
  input: __S(113, __c28, 1) as any as S.Schema<CreateTemplateRequest>,
  output: __S(116, __c29, 0) as any as S.Schema<CreateTemplateResponse>,
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
}));

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
  input: __S(124, __c31, 0) as any as S.Schema<CreateMigrationWorkflowRequest>,
  output: __S(125, __c31, 1) as any as S.Schema<CreateMigrationWorkflowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
}));

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
  input: __S(136, __c34, 0) as any as S.Schema<CreateWorkflowStepRequest>,
  output: __S(148, __c37, 0) as any as S.Schema<CreateWorkflowStepResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflowStep",
}));

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
  input: __S(152, __c38, 0) as any as S.Schema<CreateWorkflowStepGroupRequest>,
  output: __S(153, __c38, 1) as any as S.Schema<CreateWorkflowStepGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflowStepGroup",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteTemplateRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteTemplateResponse>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<DeleteMigrationWorkflowRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<DeleteMigrationWorkflowResponse>,
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
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<DeleteWorkflowStepRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteWorkflowStepResponse>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DeleteWorkflowStepGroupRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteWorkflowStepGroupResponse>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<GetMigrationWorkflowTemplateRequest>,
  output: __S(23, __c5, 3) as any as S.Schema<GetMigrationWorkflowTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<GetTemplateStepRequest>,
  output: __S(27, __c6, 3) as any as S.Schema<GetTemplateStepResponse>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<GetTemplateStepGroupRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<GetTemplateStepGroupResponse>,
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
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<GetMigrationWorkflowRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<GetMigrationWorkflowResponse>,
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
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<GetWorkflowStepRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<GetWorkflowStepResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowStep",
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<GetWorkflowStepGroupRequest>,
  output: __S(41, __c10, 1) as any as S.Schema<GetWorkflowStepGroupResponse>,
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
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<ListPluginsRequest>,
  output: __S(47, __c11, 3) as any as S.Schema<ListPluginsResponse>,
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
  input: __S(48, __c12, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(49, __c12, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(52, __c13, 0) as any as S.Schema<ListMigrationWorkflowTemplatesRequest>,
  output: __S(55, __c13, 3) as any as S.Schema<ListMigrationWorkflowTemplatesResponse>,
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
  input: __S(56, __c14, 0) as any as S.Schema<ListTemplateStepGroupsRequest>,
  output: __S(59, __c14, 3) as any as S.Schema<ListTemplateStepGroupsResponse>,
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
  input: __S(60, __c15, 0) as any as S.Schema<ListTemplateStepsRequest>,
  output: __S(63, __c15, 3) as any as S.Schema<ListTemplateStepsResponse>,
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
  input: __S(64, __c16, 0) as any as S.Schema<ListMigrationWorkflowsRequest>,
  output: __S(67, __c16, 3) as any as S.Schema<ListMigrationWorkflowsResponse>,
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
  input: __S(68, __c17, 0) as any as S.Schema<ListWorkflowStepGroupsRequest>,
  output: __S(71, __c17, 3) as any as S.Schema<ListWorkflowStepGroupsResponse>,
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
  input: __S(72, __c18, 0) as any as S.Schema<ListWorkflowStepsRequest>,
  output: __S(75, __c18, 3) as any as S.Schema<ListWorkflowStepsResponse>,
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
  input: __S(76, __c19, 0) as any as S.Schema<RetryWorkflowStepRequest>,
  output: __S(77, __c19, 1) as any as S.Schema<RetryWorkflowStepResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryWorkflowStep",
}));

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
  input: __S(80, __c20, 0) as any as S.Schema<StartMigrationWorkflowRequest>,
  output: __S(81, __c20, 1) as any as S.Schema<StartMigrationWorkflowResponse>,
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
}));

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
  input: __S(84, __c21, 0) as any as S.Schema<StopMigrationWorkflowRequest>,
  output: __S(85, __c21, 1) as any as S.Schema<StopMigrationWorkflowResponse>,
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
}));

export type TagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Tag a resource by specifying its Amazon Resource Name (ARN).
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Deletes the tags for a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(92, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(96, __c24, 0) as any as S.Schema<UpdateTemplateRequest>,
  output: __S(116, __c29, 0) as any as S.Schema<UpdateTemplateResponse>,
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
}));

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
  input: __S(100, __c25, 0) as any as S.Schema<UpdateMigrationWorkflowRequest>,
  output: __S(101, __c25, 1) as any as S.Schema<UpdateMigrationWorkflowResponse>,
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
}));

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
  input: __S(104, __c26, 0) as any as S.Schema<UpdateWorkflowStepRequest>,
  output: __S(148, __c37, 0) as any as S.Schema<UpdateWorkflowStepResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflowStep",
}));

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
  input: __S(108, __c27, 0) as any as S.Schema<UpdateWorkflowStepGroupRequest>,
  output: __S(109, __c27, 1) as any as S.Schema<UpdateWorkflowStepGroupResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/template/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTemplateRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteTemplateResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/migrationworkflow/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMigrationWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteMigrationWorkflowResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          stepGroupId: S.String.pipe(T.HttpQuery("stepGroupId")),
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workflowstep/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkflowStepRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workflowstepgroup/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkflowStepGroupRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/migrationworkflowtemplate/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMigrationWorkflowTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputName: S.optional(S.String),
          dataType: S.optional(S.String),
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TemplateInput" });
    case 2:
      return S.Array(__S(21, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          templateArn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          inputs: S.optional(__S(22, __c5, 2)),
          tools: S.optional(__S(157, __c39, 1)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          owner: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          templateClass: S.optional(S.String),
          tags: S.optional(__S(120, __c30, 0)),
        }),
      ).annotate({ identifier: "GetMigrationWorkflowTemplateResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          templateId: S.String.pipe(T.HttpQuery("templateId")),
          stepGroupId: S.String.pipe(T.HttpQuery("stepGroupId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/templatestep/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTemplateStepRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          dataType: S.optional(S.String),
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StepOutput" });
    case 2:
      return S.Array(__S(25, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          stepGroupId: S.optional(S.String),
          templateId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          stepActionType: S.optional(S.String),
          creationTime: S.optional(S.String),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
          outputs: S.optional(__S(26, __c6, 2)),
          stepAutomationConfiguration: S.optional(__S(141, __c35, 1)),
        }),
      ).annotate({ identifier: "GetTemplateStepResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateId: S.String.pipe(T.HttpLabel("templateId")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templates/{templateId}/stepgroups/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTemplateStepGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateId: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tools: S.optional(__S(157, __c39, 1)),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
        }),
      ).annotate({ identifier: "GetTemplateStepGroupResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/migrationworkflow/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMigrationWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          templateId: S.optional(S.String),
          adsApplicationConfigurationId: S.optional(S.String),
          adsApplicationName: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastStopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tools: S.optional(__S(157, __c39, 1)),
          totalSteps: S.optional(S.Number),
          completedSteps: S.optional(S.Number),
          workflowInputs: S.optional(__S(129, __c32, 1)),
          tags: S.optional(__S(120, __c30, 0)),
          workflowBucket: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMigrationWorkflowResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
          stepGroupId: S.String.pipe(T.HttpQuery("stepGroupId")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/workflowstep/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkflowStepRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          stepGroupId: S.optional(S.String),
          workflowId: S.optional(S.String),
          stepId: S.optional(S.String),
          description: S.optional(S.String),
          stepActionType: S.optional(S.String),
          owner: S.optional(S.String),
          workflowStepAutomationConfiguration: S.optional(__S(141, __c35, 1)),
          stepTarget: S.optional(__S(132, __c33, 0)),
          outputs: S.optional(__S(146, __c36, 2)),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          scriptOutputLocation: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          noOfSrvCompleted: S.optional(S.Number),
          noOfSrvFailed: S.optional(S.Number),
          totalNoOfSrv: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetWorkflowStepResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflowstepgroup/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowStepGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          workflowId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          owner: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tools: S.optional(__S(157, __c39, 1)),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
        }),
      ).annotate({ identifier: "GetWorkflowStepGroupResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/plugins" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPluginsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pluginId: S.optional(S.String),
          hostname: S.optional(S.String),
          status: S.optional(S.String),
          ipAddress: S.optional(S.String),
          version: S.optional(S.String),
          registeredTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "PluginSummary" });
    case 2:
      return S.Array(__S(45, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), plugins: S.optional(__S(46, __c11, 2)) }),
      ).annotate({ identifier: "ListPluginsResponse" });
  }
}
function __c12(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(120, __c30, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/migrationworkflowtemplates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMigrationWorkflowTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "TemplateSummary" });
    case 2:
      return S.Array(__S(53, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), templateSummary: __S(54, __c13, 2) }),
      ).annotate({ identifier: "ListMigrationWorkflowTemplatesResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          templateId: S.String.pipe(T.HttpLabel("templateId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templatestepgroups/{templateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTemplateStepGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
        }),
      ).annotate({ identifier: "TemplateStepGroupSummary" });
    case 2:
      return S.Array(__S(57, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), templateStepGroupSummary: __S(58, __c14, 2) }),
      ).annotate({ identifier: "ListTemplateStepGroupsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          templateId: S.String.pipe(T.HttpQuery("templateId")),
          stepGroupId: S.String.pipe(T.HttpQuery("stepGroupId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/templatesteps" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTemplateStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          stepGroupId: S.optional(S.String),
          templateId: S.optional(S.String),
          name: S.optional(S.String),
          stepActionType: S.optional(S.String),
          targetType: S.optional(S.String),
          owner: S.optional(S.String),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
        }),
      ).annotate({ identifier: "TemplateStepSummary" });
    case 2:
      return S.Array(__S(61, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          templateStepSummaryList: S.optional(__S(62, __c15, 2)),
        }),
      ).annotate({ identifier: "ListTemplateStepsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          templateId: S.optional(S.String).pipe(T.HttpQuery("templateId")),
          adsApplicationConfigurationName: S.optional(S.String).pipe(
            T.HttpQuery("adsApplicationConfigurationName"),
          ),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/migrationworkflows" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMigrationWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          templateId: S.optional(S.String),
          adsApplicationConfigurationName: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusMessage: S.optional(S.String),
          completedSteps: S.optional(S.Number),
          totalSteps: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MigrationWorkflowSummary" });
    case 2:
      return S.Array(__S(65, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), migrationWorkflowSummary: __S(66, __c16, 2) }),
      ).annotate({ identifier: "ListMigrationWorkflowsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflowstepgroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowStepGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          owner: S.optional(S.String),
          status: S.optional(S.String),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
        }),
      ).annotate({ identifier: "WorkflowStepGroupSummary" });
    case 2:
      return S.Array(__S(69, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), workflowStepGroupsSummary: __S(70, __c17, 2) }),
      ).annotate({ identifier: "ListWorkflowStepGroupsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          workflowId: S.String.pipe(T.HttpLabel("workflowId")),
          stepGroupId: S.String.pipe(T.HttpLabel("stepGroupId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workflow/{workflowId}/workflowstepgroups/{stepGroupId}/workflowsteps",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepId: S.optional(S.String),
          name: S.optional(S.String),
          stepActionType: S.optional(S.String),
          owner: S.optional(S.String),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          noOfSrvCompleted: S.optional(S.Number),
          noOfSrvFailed: S.optional(S.Number),
          totalNoOfSrv: S.optional(S.Number),
          description: S.optional(S.String),
          scriptLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowStepSummary" });
    case 2:
      return S.Array(__S(73, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), workflowStepsSummary: __S(74, __c18, 2) }),
      ).annotate({ identifier: "ListWorkflowStepsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
          stepGroupId: S.String.pipe(T.HttpQuery("stepGroupId")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/retryworkflowstep/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RetryWorkflowStepRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepGroupId: S.optional(S.String),
          workflowId: S.optional(S.String),
          id: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "RetryWorkflowStepResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/migrationworkflow/{id}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMigrationWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StartMigrationWorkflowResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/migrationworkflow/{id}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopMigrationWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          lastStopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StopMigrationWorkflowResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(120, __c30, 0),
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
          tagKeys: __S(132, __c33, 0).pipe(T.HttpQuery("tagKeys")),
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
          id: S.String.pipe(T.HttpLabel("id")),
          templateName: S.optional(S.String),
          templateDescription: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/template/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTemplateRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          inputParameters: S.optional(__S(129, __c32, 1)),
          stepTargets: S.optional(__S(132, __c33, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/migrationworkflow/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMigrationWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          templateId: S.optional(S.String),
          adsApplicationConfigurationId: S.optional(S.String),
          workflowInputs: S.optional(__S(129, __c32, 1)),
          stepTargets: S.optional(__S(132, __c33, 0)),
          status: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(120, __c30, 0)),
        }),
      ).annotate({ identifier: "UpdateMigrationWorkflowResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          stepGroupId: S.String,
          workflowId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          stepActionType: S.optional(S.String),
          workflowStepAutomationConfiguration: S.optional(__S(141, __c35, 1)),
          stepTarget: S.optional(__S(132, __c33, 0)),
          outputs: S.optional(__S(146, __c36, 2)),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workflowstep/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkflowStepRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
          id: S.String.pipe(T.HttpLabel("id")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          next: S.optional(__S(132, __c33, 0)),
          previous: S.optional(__S(132, __c33, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workflowstepgroup/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkflowStepGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.optional(S.String),
          name: S.optional(S.String),
          id: S.optional(S.String),
          description: S.optional(S.String),
          tools: S.optional(__S(157, __c39, 1)),
          next: S.optional(__S(132, __c33, 0)),
          previous: S.optional(__S(132, __c33, 0)),
          lastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateWorkflowStepGroupResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ workflowId: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          templateDescription: S.optional(S.String),
          templateSource: __S(112, __c28, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(120, __c30, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/template" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTemplateRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateId: S.optional(S.String),
          templateArn: S.optional(S.String),
          tags: S.optional(__S(120, __c30, 0)),
        }),
      ).annotate({ identifier: "CreateTemplateResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          templateId: S.String,
          applicationConfigurationId: S.optional(S.String),
          inputParameters: __S(129, __c32, 1),
          stepTargets: S.optional(__S(132, __c33, 0)),
          tags: S.optional(__S(120, __c30, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/migrationworkflow/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMigrationWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          templateId: S.optional(S.String),
          adsApplicationConfigurationId: S.optional(S.String),
          workflowInputs: S.optional(__S(129, __c32, 1)),
          stepTargets: S.optional(__S(132, __c33, 0)),
          status: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(120, __c30, 0)),
        }),
      ).annotate({ identifier: "CreateMigrationWorkflowResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ integerValue: S.Number }),
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ listOfStringsValue: __S(132, __c33, 0) }),
        /*@__PURE__*/ S.Struct({ mapOfStringValue: __S(120, __c30, 0) }),
      ]);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(128, __c32, 0).pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          stepGroupId: S.String,
          workflowId: S.String,
          stepActionType: S.String,
          description: S.optional(S.String),
          workflowStepAutomationConfiguration: S.optional(__S(141, __c35, 1)),
          stepTarget: S.optional(__S(132, __c33, 0)),
          outputs: S.optional(__S(146, __c36, 2)),
          previous: S.optional(__S(132, __c33, 0)),
          next: S.optional(__S(132, __c33, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/workflowstep" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWorkflowStepRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ linux: S.optional(S.String), windows: S.optional(S.String) }),
      ).annotate({ identifier: "PlatformScriptKey" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scriptLocationS3Bucket: S.optional(S.String),
          scriptLocationS3Key: S.optional(__S(140, __c35, 0)),
          command: S.optional(__S(140, __c35, 0)),
          runEnvironment: S.optional(S.String),
          targetType: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowStepAutomationConfiguration" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ integerValue: S.Number }),
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ listOfStringValue: __S(132, __c33, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          dataType: S.optional(S.String),
          required: S.optional(S.Boolean),
          value: S.optional(__S(144, __c36, 0)),
        }),
      ).annotate({ identifier: "WorkflowStepOutput" });
    case 2:
      return S.Array(__S(145, __c36, 1));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          stepGroupId: S.optional(S.String),
          workflowId: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateWorkflowStepResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.String,
          name: S.String,
          description: S.optional(S.String),
          next: S.optional(__S(132, __c33, 0)),
          previous: S.optional(__S(132, __c33, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workflowstepgroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkflowStepGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowId: S.optional(S.String),
          name: S.optional(S.String),
          id: S.optional(S.String),
          description: S.optional(S.String),
          tools: S.optional(__S(157, __c39, 1)),
          next: S.optional(__S(132, __c33, 0)),
          previous: S.optional(__S(132, __c33, 0)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateWorkflowStepGroupResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), url: S.optional(S.String) }),
      ).annotate({ identifier: "Tool" });
    case 1:
      return S.Array(__S(156, __c39, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
