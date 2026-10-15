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
  sdkId: "Service Catalog AppRegistry",
  serviceShapeName: "AWS242AppRegistry",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "servicecatalog" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-06-24");
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
              return e(`https://servicecatalog-appregistry.${Region}.amazonaws.com`);
            }
            return e(
              `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://servicecatalog-appregistry.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type AssociationOption = "APPLY_APPLICATION_TAG" | "SKIP_APPLICATION_TAG" | (string & {});
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
export type ResourceItemStatus = "SUCCESS" | "FAILED" | "IN_PROGRESS" | "SKIPPED" | (string & {});
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
export type ApplicationTagStatus = "IN_PROGRESS" | "SUCCESS" | "FAILURE" | (string & {});
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
  input: __S(208, __c26, 0) as any as S.Schema<AssociateAttributeGroupRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<AssociateAttributeGroupResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<AssociateResourceRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<AssociateResourceResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<CreateApplicationResponse>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<CreateAttributeGroupRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<CreateAttributeGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAttributeGroup",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DeleteApplicationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<DeleteAttributeGroupRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<DeleteAttributeGroupResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributeGroup",
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<DisassociateAttributeGroupRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<DisassociateAttributeGroupResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAttributeGroup",
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<DisassociateResourceRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<DisassociateResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResource",
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(50, __c6, 2) as any as S.Schema<GetApplicationResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<GetAssociatedResourceRequest>,
  output: __S(70, __c8, 6) as any as S.Schema<GetAssociatedResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedResource",
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<GetAttributeGroupRequest>,
  output: __S(73, __c9, 1) as any as S.Schema<GetAttributeGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributeGroup",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<GetConfigurationRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<GetConfigurationResponse>,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
}));

export type ListApplicationsError = InternalServerException | ValidationException | CommonErrors;
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
  input: __S(96, __c12, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(98, __c12, 2) as any as S.Schema<ListApplicationsResponse>,
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
  input: __S(104, __c13, 0) as any as S.Schema<ListAssociatedAttributeGroupsRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<ListAssociatedAttributeGroupsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
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
  input: __S(120, __c15, 0) as any as S.Schema<ListAssociatedResourcesRequest>,
  output: __S(124, __c15, 4) as any as S.Schema<ListAssociatedResourcesResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
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

export type ListAttributeGroupsError = InternalServerException | ValidationException | CommonErrors;
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
  input: __S(128, __c16, 0) as any as S.Schema<ListAttributeGroupsRequest>,
  output: __S(130, __c16, 2) as any as S.Schema<ListAttributeGroupsResponse>,
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
  input: __S(136, __c17, 0) as any as S.Schema<ListAttributeGroupsForApplicationRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<ListAttributeGroupsForApplicationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
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
  input: __S(144, __c18, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<PutConfigurationRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<PutConfigurationResponse>,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfiguration",
}));

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
 * Specifically, the resource's AppRegistry system tags sync with its associated application. We remove the resource's AppRegistry system tags if it does not associate with the application. The caller must have permissions to read and update the resource.
 */
export const syncResource: API.OperationMethod<
  SyncResourceRequest,
  SyncResourceResponse,
  SyncResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<SyncResourceRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<SyncResourceResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<TagResourceResponse>,
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
  input: __S(184, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<UpdateApplicationResponse>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<UpdateAttributeGroupRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<UpdateAttributeGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAttributeGroup",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ application: S.String.pipe(T.HttpLabel("application")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{application}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ application: S.optional(__S(8, __c1, 0)) })).annotate({
        identifier: "DeleteApplicationResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/attribute-groups/{attributeGroup}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAttributeGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ attributeGroup: S.optional(__S(24, __c3, 0)) })).annotate({
        identifier: "DeleteAttributeGroupResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttributeGroupSummary" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{application}/attribute-groups/{attributeGroup}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateAttributeGroupRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          resourceType: S.String.pipe(T.HttpLabel("resourceType")),
          resource: S.String.pipe(T.HttpLabel("resource")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{application}/resources/{resourceType}/{resource}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ applicationArn: S.optional(S.String), resourceArn: S.optional(S.String) }),
      ).annotate({ identifier: "DisassociateResourceResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ application: S.String.pipe(T.HttpLabel("application")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{application}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceGroup: S.optional(__S(56, __c7, 0)),
          applicationTagResourceGroup: S.optional(__S(56, __c7, 0)),
        }),
      ).annotate({ identifier: "Integrations" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          associatedResourceCount: S.optional(S.Number),
          tags: S.optional(__S(256, __c32, 0)),
          integrations: S.optional(__S(49, __c6, 1)),
          applicationTag: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "GetApplicationResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          state: S.optional(S.String),
          arn: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceGroup" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          resourceType: S.String.pipe(T.HttpLabel("resourceType")),
          resource: S.String.pipe(T.HttpLabel("resource")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          resourceTagStatus: S.optional(__S(232, __c29, 0)).pipe(T.HttpQuery("resourceTagStatus")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{application}/resources/{resourceType}/{resource}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssociatedResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceGroup: S.optional(__S(56, __c7, 0)) })).annotate({
        identifier: "ResourceIntegrations",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          associationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          integrations: S.optional(__S(65, __c8, 1)),
        }),
      ).annotate({ identifier: "Resource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          errorMessage: S.optional(S.String),
          status: S.optional(S.String),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcesListItem" });
    case 4:
      return S.Array(__S(67, __c8, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          applicationTagStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
          resources: S.optional(__S(68, __c8, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationTagResult" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          resource: S.optional(__S(66, __c8, 2)),
          options: S.optional(__S(232, __c29, 0)),
          applicationTagResult: S.optional(__S(69, __c8, 5)),
        }),
      ).annotate({ identifier: "GetAssociatedResourceResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/attribute-groups/{attributeGroup}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAttributeGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          attributes: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(256, __c32, 0)),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAttributeGroupResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/configuration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ configuration: S.optional(__S(89, __c11, 1)) })).annotate({
        identifier: "GetConfigurationResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ tagKey: S.optional(S.String) })).annotate({
        identifier: "TagQueryConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ tagQueryConfiguration: S.optional(__S(88, __c11, 0)) }),
      ).annotate({ identifier: "AppRegistryConfiguration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ applications: S.optional(__S(97, __c12, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{application}/attribute-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedAttributeGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attributeGroups: S.optional(__S(112, __c14, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAssociatedAttributeGroupsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{application}/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedResourcesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tagValue: S.optional(S.String) })).annotate({
        identifier: "ResourceDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          resourceType: S.optional(S.String),
          resourceDetails: S.optional(__S(121, __c15, 1)),
          options: S.optional(__S(232, __c29, 0)),
        }),
      ).annotate({ identifier: "ResourceInfo" });
    case 3:
      return S.Array(__S(122, __c15, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ resources: S.optional(__S(123, __c15, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssociatedResourcesResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/attribute-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAttributeGroupsRequest" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          attributeGroups: S.optional(__S(129, __c16, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAttributeGroupsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{application}/attribute-group-details" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAttributeGroupsForApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttributeGroupDetails" });
    case 2:
      return S.Array(__S(137, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          attributeGroupsDetails: S.optional(__S(138, __c17, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAttributeGroupsForApplicationResponse" });
  }
}
function __c18(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(256, __c32, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ configuration: __S(89, __c11, 1) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/configuration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutConfigurationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "PutConfigurationResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String.pipe(T.HttpLabel("resourceType")),
          resource: S.String.pipe(T.HttpLabel("resource")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sync/{resourceType}/{resource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SyncResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationArn: S.optional(S.String),
          resourceArn: S.optional(S.String),
          actionTaken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SyncResourceResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(256, __c32, 0),
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
          tagKeys: __S(112, __c14, 0).pipe(T.HttpQuery("tagKeys")),
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
          application: S.String.pipe(T.HttpLabel("application")),
          name: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/applications/{application}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          attributes: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/attribute-groups/{attributeGroup}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAttributeGroupRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{application}/attribute-groups/{attributeGroup}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateAttributeGroupRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationArn: S.optional(S.String), attributeGroupArn: S.optional(S.String) }),
      ).annotate({ identifier: "AssociateAttributeGroupResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          application: S.String.pipe(T.HttpLabel("application")),
          resourceType: S.String.pipe(T.HttpLabel("resourceType")),
          resource: S.String.pipe(T.HttpLabel("resource")),
          options: S.optional(__S(232, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/applications/{application}/resources/{resourceType}/{resource}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationArn: S.optional(S.String),
          resourceArn: S.optional(S.String),
          options: S.optional(__S(232, __c29, 0)),
        }),
      ).annotate({ identifier: "AssociateResourceResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(256, __c32, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(256, __c32, 0)),
          applicationTag: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "Application" });
    case 1:
      return S.suspend(() => S.Struct({ application: S.optional(__S(248, __c31, 0)) })).annotate({
        identifier: "CreateApplicationResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          attributes: S.String,
          tags: S.optional(__S(256, __c32, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/attribute-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAttributeGroupRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "AttributeGroup" });
    case 1:
      return S.suspend(() => S.Struct({ attributeGroup: S.optional(__S(272, __c34, 0)) })).annotate(
        { identifier: "CreateAttributeGroupResponse" },
      );
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
