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
  sdkId: "Launch Wizard",
  serviceShapeName: "LaunchWizard",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "launchwizard" });
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
              `https://launchwizard-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://launchwizard-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://launchwizard.{R}.{D}","properties":{},"headers":{}}');

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceLimitException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitException>()(
    "ResourceLimitException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type WorkloadName = string;
export type DeploymentPatternName = string;
export type DeploymentName = string;
export type KeyString = string;
export type ValueString = string;
export type DeploymentSpecifications = { [key: string]: string | undefined };
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateDeploymentInput {
  workloadName: string;
  deploymentPatternName: string;
  name: string;
  specifications: { [key: string]: string | undefined };
  dryRun?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type DeploymentId = string;
export interface CreateDeploymentOutput {
  deploymentId?: string;
}
export interface DeleteDeploymentInput {
  deploymentId: string;
}
export type DeploymentStatus =
  | "COMPLETED"
  | "CREATING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_INITIATING"
  | "DELETE_FAILED"
  | "DELETED"
  | "FAILED"
  | "IN_PROGRESS"
  | "VALIDATING"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETED"
  | "UPDATE_FAILED"
  | "UPDATE_ROLLBACK_COMPLETED"
  | "UPDATE_ROLLBACK_FAILED"
  | (string & {});
export interface DeleteDeploymentOutput {
  status?: DeploymentStatus;
  statusReason?: string;
}
export interface GetDeploymentInput {
  deploymentId: string;
}
export interface DeploymentData {
  name?: string;
  id?: string;
  workloadName?: string;
  patternName?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  modifiedAt?: Date;
  specifications?: { [key: string]: string | undefined };
  resourceGroup?: string;
  deletedAt?: Date;
  tags?: { [key: string]: string | undefined };
  deploymentArn?: string;
}
export interface GetDeploymentOutput {
  deployment?: DeploymentData;
}
export type DeploymentPatternVersionName = string;
export interface GetDeploymentPatternVersionInput {
  workloadName: string;
  deploymentPatternName: string;
  deploymentPatternVersionName: string;
}
export interface DeploymentPatternVersionDataSummary {
  deploymentPatternVersionName?: string;
  description?: string;
  documentationUrl?: string;
  workloadName?: string;
  deploymentPatternName?: string;
}
export interface GetDeploymentPatternVersionOutput {
  deploymentPatternVersion?: DeploymentPatternVersionDataSummary;
}
export interface GetWorkloadInput {
  workloadName: string;
}
export type WorkloadStatus = "ACTIVE" | "INACTIVE" | "DISABLED" | "DELETED" | (string & {});
export interface ManagementAccountConstraint {}
export type ServicePrincipalType = string;
export interface DelegatedAdminConstraint {
  servicePrincipal: string;
}
export type AccountConstraint =
  | { managementAccount: ManagementAccountConstraint; delegatedAdmin?: never }
  | { managementAccount?: never; delegatedAdmin: DelegatedAdminConstraint };
export type AccountConstraintsList = AccountConstraint[];
export interface WorkloadData {
  workloadName?: string;
  displayName?: string;
  status?: WorkloadStatus;
  accountConstraints?: AccountConstraint[];
  description?: string;
  documentationUrl?: string;
  iconUrl?: string;
  statusMessage?: string;
}
export interface GetWorkloadOutput {
  workload?: WorkloadData;
}
export interface GetWorkloadDeploymentPatternInput {
  workloadName: string;
  deploymentPatternName: string;
}
export type WorkloadVersionName = string;
export type WorkloadDeploymentPatternStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export type AllowedValues = string[];
export interface DeploymentConditionalField {
  name?: string;
  value?: string;
  comparator?: string;
}
export type SpecificationsConditionalData = DeploymentConditionalField[];
export interface DeploymentSpecificationsField {
  name?: string;
  description?: string;
  allowedValues?: string[];
  required?: string;
  conditionals?: DeploymentConditionalField[];
}
export type DeploymentSpecificationsData = DeploymentSpecificationsField[];
export interface WorkloadDeploymentPatternData {
  workloadName?: string;
  deploymentPatternName?: string;
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  displayName?: string;
  description?: string;
  status?: WorkloadDeploymentPatternStatus;
  statusMessage?: string;
  accountConstraints?: AccountConstraint[];
  specifications?: DeploymentSpecificationsField[];
}
export interface GetWorkloadDeploymentPatternOutput {
  workloadDeploymentPattern?: WorkloadDeploymentPatternData;
}
export type MaxDeploymentEventResults = number;
export type NextToken = string;
export interface ListDeploymentEventsInput {
  deploymentId: string;
  maxResults?: number;
  nextToken?: string;
}
export type EventStatus =
  | "CANCELED"
  | "CANCELING"
  | "COMPLETED"
  | "CREATED"
  | "FAILED"
  | "IN_PROGRESS"
  | "PENDING"
  | "TIMED_OUT"
  | (string & {});
export type DeploymentEventMetadataKey = string;
export type DeploymentEventMetadataValue = string;
export type DeploymentEventMetadata = { [key: string]: string | undefined };
export interface DeploymentEventDataSummary {
  name?: string;
  description?: string;
  status?: EventStatus;
  statusReason?: string;
  timestamp?: Date;
  metadata?: { [key: string]: string | undefined };
}
export type DeploymentEventDataSummaryList = DeploymentEventDataSummary[];
export interface ListDeploymentEventsOutput {
  deploymentEvents?: DeploymentEventDataSummary[];
  nextToken?: string;
}
export type MaxWorkloadResults = number;
export type DeploymentPatternVersionFilterKey = "updateFromVersion" | (string & {});
export type DeploymentPatternVersionFilterValue = string;
export type DeploymentPatternVersionFilterValues = string[];
export interface DeploymentPatternVersionFilter {
  name: DeploymentPatternVersionFilterKey;
  values: string[];
}
export type FilterList = DeploymentPatternVersionFilter[];
export interface ListDeploymentPatternVersionsInput {
  workloadName: string;
  deploymentPatternName: string;
  maxResults?: number;
  nextToken?: string;
  filters?: DeploymentPatternVersionFilter[];
}
export type DeploymentPatternVersionDataSummaryList = DeploymentPatternVersionDataSummary[];
export interface ListDeploymentPatternVersionsOutput {
  deploymentPatternVersions?: DeploymentPatternVersionDataSummary[];
  nextToken?: string;
}
export type DeploymentFilterKey = "WORKLOAD_NAME" | "DEPLOYMENT_STATUS" | (string & {});
export type DeploymentFilterValue = string;
export type DeploymentFilterValues = string[];
export interface DeploymentFilter {
  name?: DeploymentFilterKey;
  values?: string[];
}
export type DeploymentFilterList = DeploymentFilter[];
export type MaxDeploymentResults = number;
export interface ListDeploymentsInput {
  filters?: DeploymentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface DeploymentDataSummary {
  name?: string;
  id?: string;
  workloadName?: string;
  patternName?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  modifiedAt?: Date;
}
export type DeploymentDataSummaryList = DeploymentDataSummary[];
export interface ListDeploymentsOutput {
  deployments?: DeploymentDataSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export type MaxWorkloadDeploymentPatternResults = number;
export interface ListWorkloadDeploymentPatternsInput {
  workloadName: string;
  maxResults?: number;
  nextToken?: string;
}
export interface WorkloadDeploymentPatternDataSummary {
  workloadName?: string;
  deploymentPatternName?: string;
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  displayName?: string;
  description?: string;
  status?: WorkloadDeploymentPatternStatus;
  statusMessage?: string;
  accountConstraints?: AccountConstraint[];
}
export type WorkloadDeploymentPatternDataSummaryList = WorkloadDeploymentPatternDataSummary[];
export interface ListWorkloadDeploymentPatternsOutput {
  workloadDeploymentPatterns?: WorkloadDeploymentPatternDataSummary[];
  nextToken?: string;
}
export interface ListWorkloadsInput {
  maxResults?: number;
  nextToken?: string;
}
export interface WorkloadDataSummary {
  workloadName?: string;
  displayName?: string;
  status?: WorkloadStatus;
  accountConstraints?: AccountConstraint[];
}
export type WorkloadDataSummaryList = WorkloadDataSummary[];
export interface ListWorkloadsOutput {
  workloads?: WorkloadDataSummary[];
  nextToken?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateDeploymentInput {
  deploymentId: string;
  specifications: { [key: string]: string | undefined };
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  dryRun?: boolean;
  force?: boolean;
}
export interface UpdateDeploymentOutput {
  deployment?: DeploymentDataSummary;
}
export type CreateDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a deployment for the given workload. Deployments created by this operation are not available in the Launch Wizard console to use the `Clone deployment` action on.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentInput,
  CreateDeploymentOutput,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<CreateDeploymentInput>,
  output: __S(81, __c10, 1) as any as S.Schema<CreateDeploymentOutput>,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type DeleteDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentInput,
  DeleteDeploymentOutput,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteDeploymentInput>,
  output: __S(97, __c12, 1) as any as S.Schema<DeleteDeploymentOutput>,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type GetDeploymentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetDeploymentInput>,
  output: __S(106, __c13, 2) as any as S.Schema<GetDeploymentOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentPatternVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about a deployment pattern version.
 */
export const getDeploymentPatternVersion: API.OperationMethod<
  GetDeploymentPatternVersionInput,
  GetDeploymentPatternVersionOutput,
  GetDeploymentPatternVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetDeploymentPatternVersionInput>,
  output: __S(113, __c14, 1) as any as S.Schema<GetDeploymentPatternVersionOutput>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentPatternVersion",
}));

export type GetWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a workload.
 */
export const getWorkload: API.OperationMethod<
  GetWorkloadInput,
  GetWorkloadOutput,
  GetWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<GetWorkloadInput>,
  output: __S(130, __c16, 2) as any as S.Schema<GetWorkloadOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkload",
}));

export type GetWorkloadDeploymentPatternError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a given workload and deployment pattern, including the available specifications. You can use the ListWorkloads operation to discover the available workload names and the ListWorkloadDeploymentPatterns operation to discover the available deployment pattern names of a given workload.
 */
export const getWorkloadDeploymentPattern: API.OperationMethod<
  GetWorkloadDeploymentPatternInput,
  GetWorkloadDeploymentPatternOutput,
  GetWorkloadDeploymentPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GetWorkloadDeploymentPatternInput>,
  output: __S(158, __c19, 6) as any as S.Schema<GetWorkloadDeploymentPatternOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadDeploymentPattern",
}));

export type ListDeploymentEventsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the events of a deployment.
 */
export const listDeploymentEvents: API.PaginatedOperationMethod<
  ListDeploymentEventsInput,
  ListDeploymentEventsOutput,
  ListDeploymentEventsError,
  Credentials | HttpClient.HttpClient,
  DeploymentEventDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListDeploymentEventsInput>,
  output: __S(3, __c0, 3) as any as S.Schema<ListDeploymentEventsOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentPatternVersionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployment pattern versions.
 */
export const listDeploymentPatternVersions: API.PaginatedOperationMethod<
  ListDeploymentPatternVersionsInput,
  ListDeploymentPatternVersionsOutput,
  ListDeploymentPatternVersionsError,
  Credentials | HttpClient.HttpClient,
  DeploymentPatternVersionDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(10, __c1, 2) as any as S.Schema<ListDeploymentPatternVersionsInput>,
  output: __S(12, __c1, 4) as any as S.Schema<ListDeploymentPatternVersionsOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentPatternVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentPatternVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the deployments that have been created.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(18, __c2, 2) as any as S.Schema<ListDeploymentsInput>,
  output: __S(20, __c2, 4) as any as S.Schema<ListDeploymentsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(33, __c4, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWorkloadDeploymentPatternsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workload deployment patterns for a given workload name. You can use the ListWorkloads operation to discover the available workload names.
 */
export const listWorkloadDeploymentPatterns: API.PaginatedOperationMethod<
  ListWorkloadDeploymentPatternsInput,
  ListWorkloadDeploymentPatternsOutput,
  ListWorkloadDeploymentPatternsError,
  Credentials | HttpClient.HttpClient,
  WorkloadDeploymentPatternDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<ListWorkloadDeploymentPatternsInput>,
  output: __S(43, __c5, 3) as any as S.Schema<ListWorkloadDeploymentPatternsOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadDeploymentPatterns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloadDeploymentPatterns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkloadsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the available workload names. You can use the ListWorkloadDeploymentPatterns operation to discover the available deployment patterns for a given workload.
 */
export const listWorkloads: API.PaginatedOperationMethod<
  ListWorkloadsInput,
  ListWorkloadsOutput,
  ListWorkloadsError,
  Credentials | HttpClient.HttpClient,
  WorkloadDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListWorkloadsInput>,
  output: __S(51, __c6, 3) as any as S.Schema<ListWorkloadsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloads",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloads",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the given resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<TagResourceInput>,
  output: __S(144, __c18, 0) as any as S.Schema<TagResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the given resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(144, __c18, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a deployment.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentInput,
  UpdateDeploymentOutput,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<UpdateDeploymentInput>,
  output: __S(73, __c9, 1) as any as S.Schema<UpdateDeploymentOutput>,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listDeploymentEvents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metadata: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "DeploymentEventDataSummary" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          deploymentEvents: S.optional(__S(2, __c0, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDeploymentEventsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(160, __c20, 0) })).annotate({
        identifier: "DeploymentPatternVersionFilter",
      });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.String,
          deploymentPatternName: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(9, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listDeploymentPatternVersions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentPatternVersionsInput" });
    case 3:
      return S.Array(__S(120, __c15, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          deploymentPatternVersions: S.optional(__S(11, __c1, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDeploymentPatternVersionsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(160, __c20, 0)) }),
      ).annotate({ identifier: "DeploymentFilter" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(17, __c2, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listDeployments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDeploymentsInput" });
    case 3:
      return S.Array(__S(24, __c3, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({ deployments: S.optional(__S(19, __c2, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDeploymentsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          workloadName: S.optional(S.String),
          patternName: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeploymentDataSummary" });
  }
}
function __c4(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(88, __c11, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listWorkloadDeploymentPatterns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkloadDeploymentPatternsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.optional(S.String),
          deploymentPatternName: S.optional(S.String),
          workloadVersionName: S.optional(S.String),
          deploymentPatternVersionName: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          accountConstraints: S.optional(__S(138, __c17, 2)),
        }),
      ).annotate({ identifier: "WorkloadDeploymentPatternDataSummary" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workloadDeploymentPatterns: S.optional(__S(42, __c5, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkloadDeploymentPatternsOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listWorkloads" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWorkloadsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.optional(S.String),
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          accountConstraints: S.optional(__S(138, __c17, 2)),
        }),
      ).annotate({ identifier: "WorkloadDataSummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ workloads: S.optional(__S(50, __c6, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkloadsOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(88, __c11, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(160, __c20, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          specifications: __S(88, __c11, 0),
          workloadVersionName: S.optional(S.String),
          deploymentPatternVersionName: S.optional(S.String),
          dryRun: S.optional(S.Boolean),
          force: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/updateDeployment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDeploymentInput" });
    case 1:
      return S.suspend(() => S.Struct({ deployment: S.optional(__S(24, __c3, 0)) })).annotate({
        identifier: "UpdateDeploymentOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.String,
          deploymentPatternName: S.String,
          name: S.String,
          specifications: __S(88, __c11, 0),
          dryRun: S.optional(S.Boolean),
          tags: S.optional(__S(88, __c11, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/createDeployment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDeploymentInput" });
    case 1:
      return S.suspend(() => S.Struct({ deploymentId: S.optional(S.String) })).annotate({
        identifier: "CreateDeploymentOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/deleteDeployment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeploymentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), statusReason: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteDeploymentOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/getDeployment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          workloadName: S.optional(S.String),
          patternName: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          specifications: S.optional(__S(88, __c11, 0)),
          resourceGroup: S.optional(S.String),
          deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(88, __c11, 0)),
          deploymentArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentData" });
    case 2:
      return S.suspend(() => S.Struct({ deployment: S.optional(__S(105, __c13, 1)) })).annotate({
        identifier: "GetDeploymentOutput",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.String,
          deploymentPatternName: S.String,
          deploymentPatternVersionName: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getDeploymentPatternVersion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentPatternVersionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deploymentPatternVersion: S.optional(__S(120, __c15, 0)) }),
      ).annotate({ identifier: "GetDeploymentPatternVersionOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentPatternVersionName: S.optional(S.String),
          description: S.optional(S.String),
          documentationUrl: S.optional(S.String),
          workloadName: S.optional(S.String),
          deploymentPatternName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentPatternVersionDataSummary" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workloadName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/getWorkload" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkloadInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.optional(S.String),
          displayName: S.optional(S.String),
          status: S.optional(S.String),
          accountConstraints: S.optional(__S(138, __c17, 2)),
          description: S.optional(S.String),
          documentationUrl: S.optional(S.String),
          iconUrl: S.optional(S.String),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkloadData" });
    case 2:
      return S.suspend(() => S.Struct({ workload: S.optional(__S(129, __c16, 1)) })).annotate({
        identifier: "GetWorkloadOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ servicePrincipal: S.String })).annotate({
        identifier: "DelegatedAdminConstraint",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ managementAccount: __S(144, __c18, 0) }),
        /*@__PURE__*/ S.Struct({ delegatedAdmin: __S(136, __c17, 0) }),
      ]);
    case 2:
      return S.Array(__S(137, __c17, 1));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ManagementAccountConstraint" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workloadName: S.String, deploymentPatternName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getWorkloadDeploymentPattern" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkloadDeploymentPatternInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          value: S.optional(S.String),
          comparator: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentConditionalField" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          allowedValues: S.optional(__S(160, __c20, 0)),
          required: S.optional(S.String),
          conditionals: S.optional(__S(154, __c19, 2)),
        }),
      ).annotate({ identifier: "DeploymentSpecificationsField" });
    case 4:
      return S.Array(__S(155, __c19, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          workloadName: S.optional(S.String),
          deploymentPatternName: S.optional(S.String),
          workloadVersionName: S.optional(S.String),
          deploymentPatternVersionName: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          accountConstraints: S.optional(__S(138, __c17, 2)),
          specifications: S.optional(__S(156, __c19, 4)),
        }),
      ).annotate({ identifier: "WorkloadDeploymentPatternData" });
    case 6:
      return S.suspend(() =>
        S.Struct({ workloadDeploymentPattern: S.optional(__S(157, __c19, 5)) }),
      ).annotate({ identifier: "GetWorkloadDeploymentPatternOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
