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
  sdkId: "Launch Wizard",
  target: "LaunchWizard",
  version: "2018-05-10",
  sigv4: "launchwizard",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceLimitException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type WorkloadStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
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
export type DeploymentPatternVersionFilterKey =
  | "updateFromVersion"
  | (string & {});
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
export type DeploymentPatternVersionDataSummaryList =
  DeploymentPatternVersionDataSummary[];
export interface ListDeploymentPatternVersionsOutput {
  deploymentPatternVersions?: DeploymentPatternVersionDataSummary[];
  nextToken?: string;
}
export type DeploymentFilterKey =
  | "WORKLOAD_NAME"
  | "DEPLOYMENT_STATUS"
  | (string & {});
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
export type WorkloadDeploymentPatternDataSummaryList =
  WorkloadDeploymentPatternDataSummary[];
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
  descriptor: {
    service: svc,
    http: "POST /createDeployment",
    input: {
      workloadName: 0,
      deploymentPatternName: 0,
      name: 0,
      specifications: 0,
      dryRun: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteDeployment",
    input: { deploymentId: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getDeployment",
    input: { deploymentId: 0 },
    output: {
      deployment: { createdAt: D.ts, modifiedAt: D.ts, deletedAt: D.ts },
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getDeploymentPatternVersion",
    input: {
      workloadName: 0,
      deploymentPatternName: 0,
      deploymentPatternVersionName: 0,
    },
    body: true,
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentPatternVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getWorkload",
    input: { workloadName: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkload",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getWorkloadDeploymentPattern",
    input: { workloadName: 0, deploymentPatternName: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadDeploymentPattern",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listDeploymentEvents",
    input: { deploymentId: 0, maxResults: 0, nextToken: 0 },
    output: { deploymentEvents: D.list({ timestamp: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /listDeploymentPatternVersions",
    input: {
      workloadName: 0,
      deploymentPatternName: 0,
      maxResults: 0,
      nextToken: 0,
      filters: D.list({ name: 0, values: 0 }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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

export type ListDeploymentsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /listDeployments",
    input: {
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { deployments: D.list(o_DeploymentDataSummary) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listWorkloadDeploymentPatterns",
    input: { workloadName: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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

export type ListWorkloadsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /listWorkloads",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateDeployment",
    input: {
      deploymentId: 0,
      specifications: 0,
      workloadVersionName: 0,
      deploymentPatternVersionName: 0,
      dryRun: 0,
      force: 0,
    },
    output: { deployment: o_DeploymentDataSummary },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
})) as any;

const o_DeploymentDataSummary: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
});
