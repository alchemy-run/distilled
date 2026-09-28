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
  sdkId: "Service Catalog AppRegistry",
  target: "AWS242AppRegistry",
  version: "2020-06-24",
  sigv4: "servicecatalog",
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
                `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(
                  `https://servicecatalog-appregistry.${Region}.amazonaws.com`,
                );
              }
              return e(
                `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string; readonly serviceCode?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ApplicationSpecifier = string;
export type AttributeGroupSpecifier = string;
export interface AssociateAttributeGroupRequest {
  application: string;
  attributeGroup: string;
}
export type ApplicationArn = string;
export type AttributeGroupArn = string;
export interface AssociateAttributeGroupResponse {
  applicationArn?: string;
  attributeGroupArn?: string;
}
export type ResourceType = "CFN_STACK" | "RESOURCE_TAG_VALUE" | (string & {});
export type ResourceSpecifier = string;
export type AssociationOption =
  | "APPLY_APPLICATION_TAG"
  | "SKIP_APPLICATION_TAG"
  | (string & {});
export type Options = AssociationOption[];
export interface AssociateResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
  options?: AssociationOption[];
}
export type Arn = string;
export interface AssociateResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
  options?: AssociationOption[];
}
export type Name = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export type ApplicationId = string;
export type ApplicationTagDefinition = { [key: string]: string | undefined };
export interface Application {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
  applicationTag?: { [key: string]: string | undefined };
}
export interface CreateApplicationResponse {
  application?: Application;
}
export type Attributes = string;
export interface CreateAttributeGroupRequest {
  name: string;
  description?: string;
  attributes: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export type AttributeGroupId = string;
export interface AttributeGroup {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAttributeGroupResponse {
  attributeGroup?: AttributeGroup;
}
export interface DeleteApplicationRequest {
  application: string;
}
export interface ApplicationSummary {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export interface DeleteApplicationResponse {
  application?: ApplicationSummary;
}
export interface DeleteAttributeGroupRequest {
  attributeGroup: string;
}
export type CreatedBy = string;
export interface AttributeGroupSummary {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  createdBy?: string;
}
export interface DeleteAttributeGroupResponse {
  attributeGroup?: AttributeGroupSummary;
}
export interface DisassociateAttributeGroupRequest {
  application: string;
  attributeGroup: string;
}
export interface DisassociateAttributeGroupResponse {
  applicationArn?: string;
  attributeGroupArn?: string;
}
export interface DisassociateResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
}
export interface DisassociateResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
}
export interface GetApplicationRequest {
  application: string;
}
export type AssociationCount = number;
export type ResourceGroupState =
  | "CREATING"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export interface ResourceGroup {
  state?: ResourceGroupState;
  arn?: string;
  errorMessage?: string;
}
export interface Integrations {
  resourceGroup?: ResourceGroup;
  applicationTagResourceGroup?: ResourceGroup;
}
export interface GetApplicationResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  associatedResourceCount?: number;
  tags?: { [key: string]: string | undefined };
  integrations?: Integrations;
  applicationTag?: { [key: string]: string | undefined };
}
export type NextToken = string;
export type ResourceItemStatus =
  | "SUCCESS"
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | (string & {});
export type GetAssociatedResourceFilter = ResourceItemStatus[];
export type MaxResults = number;
export interface GetAssociatedResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
  nextToken?: string;
  resourceTagStatus?: ResourceItemStatus[];
  maxResults?: number;
}
export interface ResourceIntegrations {
  resourceGroup?: ResourceGroup;
}
export interface Resource {
  name?: string;
  arn?: string;
  associationTime?: Date;
  integrations?: ResourceIntegrations;
}
export type ApplicationTagStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILURE"
  | (string & {});
export type ResourcesListItemErrorMessage = string;
export type ResourceItemType = string;
export interface ResourcesListItem {
  resourceArn?: string;
  errorMessage?: string;
  status?: string;
  resourceType?: string;
}
export type ResourcesList = ResourcesListItem[];
export interface ApplicationTagResult {
  applicationTagStatus?: ApplicationTagStatus;
  errorMessage?: string;
  resources?: ResourcesListItem[];
  nextToken?: string;
}
export interface GetAssociatedResourceResponse {
  resource?: Resource;
  options?: AssociationOption[];
  applicationTagResult?: ApplicationTagResult;
}
export interface GetAttributeGroupRequest {
  attributeGroup: string;
}
export interface GetAttributeGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  attributes?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
  createdBy?: string;
}
export interface GetConfigurationRequest {}
export type TagKeyConfig = string;
export interface TagQueryConfiguration {
  tagKey?: string;
}
export interface AppRegistryConfiguration {
  tagQueryConfiguration?: TagQueryConfiguration;
}
export interface GetConfigurationResponse {
  configuration?: AppRegistryConfiguration;
}
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type ApplicationSummaries = ApplicationSummary[];
export interface ListApplicationsResponse {
  applications?: ApplicationSummary[];
  nextToken?: string;
}
export interface ListAssociatedAttributeGroupsRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export type AttributeGroupIds = string[];
export interface ListAssociatedAttributeGroupsResponse {
  attributeGroups?: string[];
  nextToken?: string;
}
export interface ListAssociatedResourcesRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ResourceDetails {
  tagValue?: string;
}
export interface ResourceInfo {
  name?: string;
  arn?: string;
  resourceType?: ResourceType;
  resourceDetails?: ResourceDetails;
  options?: AssociationOption[];
}
export type Resources = ResourceInfo[];
export interface ListAssociatedResourcesResponse {
  resources?: ResourceInfo[];
  nextToken?: string;
}
export interface ListAttributeGroupsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type AttributeGroupSummaries = AttributeGroupSummary[];
export interface ListAttributeGroupsResponse {
  attributeGroups?: AttributeGroupSummary[];
  nextToken?: string;
}
export interface ListAttributeGroupsForApplicationRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AttributeGroupDetails {
  id?: string;
  arn?: string;
  name?: string;
  createdBy?: string;
}
export type AttributeGroupDetailsList = AttributeGroupDetails[];
export interface ListAttributeGroupsForApplicationResponse {
  attributeGroupsDetails?: AttributeGroupDetails[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutConfigurationRequest {
  configuration: AppRegistryConfiguration;
}
export interface PutConfigurationResponse {}
export interface SyncResourceRequest {
  resourceType: ResourceType;
  resource: string;
}
export type SyncAction = "START_SYNC" | "NO_ACTION" | (string & {});
export interface SyncResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
  actionTaken?: SyncAction;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationRequest {
  application: string;
  name?: string;
  description?: string;
}
export interface UpdateApplicationResponse {
  application?: Application;
}
export interface UpdateAttributeGroupRequest {
  attributeGroup: string;
  name?: string;
  description?: string;
  attributes?: string;
}
export interface UpdateAttributeGroupResponse {
  attributeGroup?: AttributeGroup;
}
export type AssociateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an attribute group with an application to augment the application's metadata
 * with the group's attributes. This feature enables applications to be described with
 * user-defined details that are machine-readable, such as third-party integrations.
 */
export const associateAttributeGroup: API.OperationMethod<
  AssociateAttributeGroupRequest,
  AssociateAttributeGroupResponse,
  AssociateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /applications/{application}/attribute-groups/{attributeGroup}",
    input: { application: 0, attributeGroup: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAttributeGroup",
})) as any;

export type AssociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a resource with an application.
 * The resource can be specified by its ARN or name.
 * The application can be specified by ARN, ID, or name.
 *
 * **Minimum permissions**
 *
 * You must have the following permissions to associate a resource using the `OPTIONS` parameter set to `APPLY_APPLICATION_TAG`.
 *
 * - `tag:GetResources`
 *
 * - `tag:TagResources`
 *
 * You must also have these additional permissions if you don't use the `AWSServiceCatalogAppRegistryFullAccess` policy.
 * For more information, see AWSServiceCatalogAppRegistryFullAccess in the AppRegistry Administrator Guide.
 *
 * - `resource-groups:AssociateResource`
 *
 * - `cloudformation:UpdateStack`
 *
 * - `cloudformation:DescribeStacks`
 *
 * In addition, you must have the tagging permission defined by the Amazon Web Services service that creates the resource.
 * For more information, see TagResources in the *Resource Groups Tagging API Reference*.
 */
export const associateResource: API.OperationMethod<
  AssociateResourceRequest,
  AssociateResourceResponse,
  AssociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /applications/{application}/resources/{resourceType}/{resource}",
    input: { application: 0, resourceType: 0, resource: 0, options: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResource",
})) as any;

export type CreateApplicationError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new application that is the top-level node in a hierarchy of related cloud resource abstractions.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      name: 0,
      description: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { application: o_Application },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new attribute group as a container for user-defined attributes. This feature
 * enables users to have full control over their cloud application's metadata in a rich
 * machine-readable format to facilitate integration with automated workflows and third-party
 * tools.
 */
export const createAttributeGroup: API.OperationMethod<
  CreateAttributeGroupRequest,
  CreateAttributeGroupResponse,
  CreateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /attribute-groups",
    input: {
      name: 0,
      description: 0,
      attributes: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { attributeGroup: o_AttributeGroup },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAttributeGroup",
})) as any;

export type DeleteApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application that is specified either by its application ID, name, or ARN. All associated attribute groups and resources must be disassociated from it before deleting an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{application}",
    input: { application: 0 },
    output: { application: o_ApplicationSummary },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteAttributeGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an attribute group, specified either by its attribute group ID, name, or ARN.
 */
export const deleteAttributeGroup: API.OperationMethod<
  DeleteAttributeGroupRequest,
  DeleteAttributeGroupResponse,
  DeleteAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /attribute-groups/{attributeGroup}",
    input: { attributeGroup: 0 },
    output: { attributeGroup: o_AttributeGroupSummary },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributeGroup",
})) as any;

export type DisassociateAttributeGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an attribute group from an application to remove the extra attributes contained in the attribute group from the application's metadata. This operation reverts `AssociateAttributeGroup`.
 */
export const disassociateAttributeGroup: API.OperationMethod<
  DisassociateAttributeGroupRequest,
  DisassociateAttributeGroupResponse,
  DisassociateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{application}/attribute-groups/{attributeGroup}",
    input: { application: 0, attributeGroup: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAttributeGroup",
})) as any;

export type DisassociateResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a resource from application.
 * Both the resource and the application can be specified either by ID or name.
 *
 * **Minimum permissions**
 *
 * You must have the following permissions to remove a resource that's been associated with an application using the `APPLY_APPLICATION_TAG` option for AssociateResource.
 *
 * - `tag:GetResources`
 *
 * - `tag:UntagResources`
 *
 * You must also have the following permissions if you don't use the `AWSServiceCatalogAppRegistryFullAccess` policy.
 * For more information, see AWSServiceCatalogAppRegistryFullAccess in the AppRegistry Administrator Guide.
 *
 * - `resource-groups:DisassociateResource`
 *
 * - `cloudformation:UpdateStack`
 *
 * - `cloudformation:DescribeStacks`
 *
 * In addition, you must have the tagging permission defined by the Amazon Web Services service that creates the resource.
 * For more information, see UntagResources in the *Resource Groups Tagging API Reference*.
 */
export const disassociateResource: API.OperationMethod<
  DisassociateResourceRequest,
  DisassociateResourceResponse,
  DisassociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{application}/resources/{resourceType}/{resource}",
    input: { application: 0, resourceType: 0, resource: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResource",
})) as any;

export type GetApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata information
 * about one
 * of your applications.
 * The application can be specified
 * by its ARN, ID, or name
 * (which is unique
 * within one account
 * in one region
 * at a given point
 * in time).
 * Specify
 * by ARN or ID
 * in automated workflows
 * if you want
 * to make sure
 * that the exact same application is returned or a `ResourceNotFoundException` is thrown,
 * avoiding the ABA addressing problem.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{application}",
    input: { application: 0 },
    output: { creationTime: D.ts, lastUpdateTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

export type GetAssociatedResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the resource associated with the application.
 */
export const getAssociatedResource: API.OperationMethod<
  GetAssociatedResourceRequest,
  GetAssociatedResourceResponse,
  GetAssociatedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{application}/resources/{resourceType}/{resource}",
    input: {
      application: 0,
      resourceType: 0,
      resource: 0,
      nextToken: D.m({ query: "nextToken" }),
      resourceTagStatus: D.m({ query: "resourceTagStatus" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { resource: { associationTime: D.ts } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedResource",
})) as any;

export type GetAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an attribute group
 * by its ARN, ID, or name.
 * The attribute group can be specified
 * by its ARN, ID, or name.
 */
export const getAttributeGroup: API.OperationMethod<
  GetAttributeGroupRequest,
  GetAttributeGroupResponse,
  GetAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /attribute-groups/{attributeGroup}",
    input: { attributeGroup: 0 },
    output: { creationTime: D.ts, lastUpdateTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributeGroup",
})) as any;

export type GetConfigurationError = InternalServerException | CommonErrors;
/**
 * Retrieves a `TagKey` configuration
 * from an account.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /configuration" },
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
})) as any;

export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all of your applications. Results are paginated.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { applications: D.list(o_ApplicationSummary) },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedAttributeGroupsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attribute groups that are associated with specified application. Results are paginated.
 */
export const listAssociatedAttributeGroups: API.PaginatedOperationMethod<
  ListAssociatedAttributeGroupsRequest,
  ListAssociatedAttributeGroupsResponse,
  ListAssociatedAttributeGroupsError,
  Credentials | HttpClient.HttpClient,
  AttributeGroupId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{application}/attribute-groups",
    input: {
      application: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedAttributeGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedResourcesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all
 * of the resources
 * that are associated
 * with the specified application.
 * Results are paginated.
 *
 * If you share an application,
 * and a consumer account associates a tag query
 * to the application,
 * all of the users
 * who can access the application
 * can also view the tag values
 * in all accounts
 * that are associated
 * with it
 * using this API.
 */
export const listAssociatedResources: API.PaginatedOperationMethod<
  ListAssociatedResourcesRequest,
  ListAssociatedResourcesResponse,
  ListAssociatedResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{application}/resources",
    input: {
      application: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttributeGroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attribute groups which you have access to. Results are paginated.
 */
export const listAttributeGroups: API.PaginatedOperationMethod<
  ListAttributeGroupsRequest,
  ListAttributeGroupsResponse,
  ListAttributeGroupsError,
  Credentials | HttpClient.HttpClient,
  AttributeGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /attribute-groups",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { attributeGroups: D.list(o_AttributeGroupSummary) },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttributeGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttributeGroupsForApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the details of all attribute groups associated with a specific application. The results display in pages.
 */
export const listAttributeGroupsForApplication: API.PaginatedOperationMethod<
  ListAttributeGroupsForApplicationRequest,
  ListAttributeGroupsForApplicationResponse,
  ListAttributeGroupsForApplicationError,
  Credentials | HttpClient.HttpClient,
  AttributeGroupDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{application}/attribute-group-details",
    input: {
      application: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttributeGroupsForApplication",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroupsDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the tags on the resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutConfigurationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Associates a `TagKey` configuration
 * to an account.
 */
export const putConfiguration: API.OperationMethod<
  PutConfigurationRequest,
  PutConfigurationResponse,
  PutConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /configuration",
    input: { configuration: { tagQueryConfiguration: { tagKey: 0 } } },
    body: true,
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfiguration",
})) as any;

export type SyncResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Syncs the resource with current AppRegistry records.
 *
 * Specifically, the resource’s AppRegistry system tags sync with its associated application. We remove the resource's AppRegistry system tags if it does not associate with the application. The caller must have permissions to read and update the resource.
 */
export const syncResource: API.OperationMethod<
  SyncResourceRequest,
  SyncResourceResponse,
  SyncResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sync/{resourceType}/{resource}",
    input: { resourceType: 0, resource: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SyncResource",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
 *
 * Each tag consists of a key and an optional value. If a tag with the same key is already associated with the resource, this action updates its value.
 *
 * This operation returns an empty response if the call was successful.
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
 * Removes tags from a resource.
 *
 * This operation returns an empty response if the call was successful.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing application with new attributes.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{application}",
    input: { application: 0, name: 0, description: 0 },
    output: { application: o_Application },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing attribute group with new details.
 */
export const updateAttributeGroup: API.OperationMethod<
  UpdateAttributeGroupRequest,
  UpdateAttributeGroupResponse,
  UpdateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /attribute-groups/{attributeGroup}",
    input: { attributeGroup: 0, name: 0, description: 0, attributes: 0 },
    output: { attributeGroup: o_AttributeGroup },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAttributeGroup",
})) as any;

const o_Application: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdateTime: D.ts,
});
const o_ApplicationSummary: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdateTime: D.ts,
});
const o_AttributeGroup: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdateTime: D.ts,
});
const o_AttributeGroupSummary: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdateTime: D.ts,
});
