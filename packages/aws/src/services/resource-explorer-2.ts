import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Resource Explorer 2",
  target: "ResourceExplorer",
  version: "2022-07-28",
  sigv4: "resource-explorer-2",
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
                `https://resource-explorer-2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://resource-explorer-2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://resource-explorer-2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://resource-explorer-2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
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
  )<{
    readonly message: string;
    readonly Name: string;
    readonly Value: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly FieldList?: ValidationExceptionField[];
  }> {}
export interface AssociateDefaultViewInput {
  ViewArn: string;
}
export interface AssociateDefaultViewOutput {
  ViewArn?: string;
}
export type ViewArnList = string[];
export interface BatchGetViewInput {
  ViewArns?: string[];
}
export type ViewName = string;
export interface IncludedProperty {
  Name: string;
}
export type IncludedPropertyList = IncludedProperty[];
export interface SearchFilter {
  FilterString: string;
}
export interface View {
  ViewArn?: string;
  ViewName?: string;
  Owner?: string;
  LastUpdatedAt?: Date;
  Scope?: string;
  IncludedProperties?: IncludedProperty[];
  Filters?: SearchFilter;
}
export type ViewList = View[];
export interface BatchGetViewError_ {
  ViewArn: string;
  ErrorMessage: string;
}
export type BatchGetViewErrors = BatchGetViewError_[];
export interface BatchGetViewOutput {
  Views?: View[];
  Errors?: BatchGetViewError_[];
}
export type TagMap = { [key: string]: string | undefined };
export interface CreateIndexInput {
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type IndexState = string;
export interface CreateIndexOutput {
  Arn?: string;
  State?: string;
  CreatedAt?: Date;
}
export type RegionList = string[];
export interface CreateResourceExplorerSetupInput {
  RegionList: string[];
  AggregatorRegions?: string[];
  ViewName: string;
}
export interface CreateResourceExplorerSetupOutput {
  TaskId: string;
}
export interface CreateViewInput {
  ClientToken?: string;
  ViewName: string;
  IncludedProperties?: IncludedProperty[];
  Scope?: string;
  Filters?: SearchFilter;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateViewOutput {
  View?: View;
}
export interface DeleteIndexInput {
  Arn: string;
}
export interface DeleteIndexOutput {
  Arn?: string;
  State?: string;
  LastUpdatedAt?: Date;
}
export interface DeleteResourceExplorerSetupInput {
  RegionList?: string[];
  DeleteInAllRegions?: boolean;
}
export interface DeleteResourceExplorerSetupOutput {
  TaskId: string;
}
export interface DeleteViewInput {
  ViewArn: string;
}
export interface DeleteViewOutput {
  ViewArn?: string;
}
export interface DisassociateDefaultViewRequest {}
export interface DisassociateDefaultViewResponse {}
export interface GetAccountLevelServiceConfigurationRequest {}
export type AWSServiceAccessStatus = string;
export interface OrgConfiguration {
  AWSServiceAccessStatus: string;
  ServiceLinkedRole?: string;
}
export interface GetAccountLevelServiceConfigurationOutput {
  OrgConfiguration?: OrgConfiguration;
}
export interface GetDefaultViewRequest {}
export interface GetDefaultViewOutput {
  ViewArn?: string;
}
export interface GetIndexRequest {}
export type IndexType = string;
export interface GetIndexOutput {
  Arn?: string;
  Type?: string;
  State?: string;
  ReplicatingFrom?: string[];
  ReplicatingTo?: string[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetManagedViewInput {
  ManagedViewArn: string;
}
export interface ManagedView {
  ManagedViewArn?: string;
  ManagedViewName?: string;
  TrustedService?: string;
  LastUpdatedAt?: Date;
  Owner?: string;
  Scope?: string;
  IncludedProperties?: IncludedProperty[];
  Filters?: SearchFilter;
  ResourcePolicy?: string;
  Version?: string;
}
export interface GetManagedViewOutput {
  ManagedView?: ManagedView;
}
export interface GetResourceExplorerSetupInput {
  TaskId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type OperationStatus = string;
export interface Index {
  Region?: string;
  Arn?: string;
  Type?: string;
}
export interface ErrorDetails {
  Code?: string;
  Message?: string;
}
export interface IndexStatus {
  Status?: string;
  Index?: Index;
  ErrorDetails?: ErrorDetails;
}
export interface ViewStatus {
  Status?: string;
  View?: View;
  ErrorDetails?: ErrorDetails;
}
export interface RegionStatus {
  Region?: string;
  Index?: IndexStatus;
  View?: ViewStatus;
}
export type RegionStatusList = RegionStatus[];
export interface GetResourceExplorerSetupOutput {
  Regions?: RegionStatus[];
  NextToken?: string;
}
export interface GetServiceIndexRequest {}
export interface GetServiceIndexOutput {
  Arn?: string;
  Type?: string;
}
export interface GetServiceViewInput {
  ServiceViewArn: string;
}
export type ServiceViewName = string;
export type RecorderType = string;
export interface ServiceLinkedRecorderInfo {
  ServicePrincipal?: string;
  RecorderName?: string;
  RecorderType?: string;
}
export interface ServiceView {
  ServiceViewArn: string;
  ServiceViewName?: string;
  Filters?: SearchFilter;
  IncludedProperties?: IncludedProperty[];
  StreamingAccessForService?: string;
  ScopeType?: string;
  ServiceLinkedRecorder?: ServiceLinkedRecorderInfo;
}
export interface GetServiceViewOutput {
  View: ServiceView;
}
export interface GetViewInput {
  ViewArn: string;
}
export interface GetViewOutput {
  View?: View;
  Tags?: { [key: string]: string | undefined };
}
export interface ListIndexesInput {
  Type?: string;
  Regions?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type IndexList = Index[];
export interface ListIndexesOutput {
  Indexes?: Index[];
  NextToken?: string;
}
export type AccountId = string;
export type AccountIdList = string[];
export interface ListIndexesForMembersInput {
  AccountIdList: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface MemberIndex {
  AccountId?: string;
  Region?: string;
  Arn?: string;
  Type?: string;
}
export type MemberIndexList = MemberIndex[];
export interface ListIndexesForMembersOutput {
  Indexes?: MemberIndex[];
  NextToken?: string;
}
export interface ListManagedViewsInput {
  MaxResults?: number;
  NextToken?: string;
  ServicePrincipal?: string;
}
export type ManagedViewArnList = string[];
export interface ListManagedViewsOutput {
  NextToken?: string;
  ManagedViews?: string[];
}
export interface ListResourcesInput {
  Filters?: SearchFilter;
  MaxResults?: number;
  ViewArn?: string;
  NextToken?: string;
}
export interface ResourceProperty {
  Name?: string;
  LastReportedAt?: Date;
  Data?: any;
}
export type ResourcePropertyList = ResourceProperty[];
export interface Resource {
  Arn?: string;
  OwningAccountId?: string;
  Region?: string;
  ResourceType?: string;
  Service?: string;
  CfnResourceType?: string;
  LastReportedAt?: Date;
  Properties?: ResourceProperty[];
}
export type ResourceList = Resource[];
export interface ListResourcesOutput {
  Resources?: Resource[];
  NextToken?: string;
  ViewArn?: string;
}
export interface ListServiceIndexesInput {
  Regions?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface ListServiceIndexesOutput {
  Indexes?: Index[];
  NextToken?: string;
}
export interface ListServiceViewsInput {
  MaxResults?: number;
  NextToken?: string;
}
export type ServiceViewArnList = string[];
export interface ListServiceViewsOutput {
  NextToken?: string;
  ServiceViews?: string[];
}
export interface ListStreamingAccessForServicesInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface StreamingAccessDetails {
  ServicePrincipal: string;
  CreatedAt: Date;
}
export type StreamingAccessDetailsList = StreamingAccessDetails[];
export interface ListStreamingAccessForServicesOutput {
  StreamingAccessForServices: StreamingAccessDetails[];
  NextToken?: string;
}
export interface ListSupportedResourceTypesInput {
  NextToken?: string;
  MaxResults?: number;
}
export type CFNResourceTypeList = string[];
export interface SupportedResourceType {
  Service?: string;
  ResourceType?: string;
  CFNResourceTypes?: string[];
}
export type ResourceTypeList = SupportedResourceType[];
export interface ListSupportedResourceTypesOutput {
  ResourceTypes?: SupportedResourceType[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export interface ListViewsInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListViewsOutput {
  Views?: string[];
  NextToken?: string;
}
export type QueryString = string | redacted.Redacted<string>;
export interface SearchInput {
  QueryString: string | redacted.Redacted<string>;
  MaxResults?: number;
  ViewArn?: string;
  NextToken?: string;
}
export interface ResourceCount {
  TotalResources?: number;
  Complete?: boolean;
}
export interface SearchOutput {
  Resources?: Resource[];
  NextToken?: string;
  ViewArn?: string;
  Count?: ResourceCount;
}
export interface TagResourceInput {
  resourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type StringList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateIndexTypeInput {
  Arn: string;
  Type: string;
}
export interface UpdateIndexTypeOutput {
  Arn?: string;
  Type?: string;
  State?: string;
  LastUpdatedAt?: Date;
}
export interface UpdateViewInput {
  ViewArn: string;
  IncludedProperties?: IncludedProperty[];
  Filters?: SearchFilter;
}
export interface UpdateViewOutput {
  View?: View;
}
export interface ValidationExceptionField {
  Name: string;
  ValidationIssue: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateDefaultViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the specified view as the default for the Amazon Web Services Region in which you call this operation. When a user performs a Search that doesn't explicitly specify which view to use, then Amazon Web Services Resource Explorer automatically chooses this default view for searches performed in this Amazon Web Services Region.
 *
 * If an Amazon Web Services Region doesn't have a default view configured, then users must explicitly specify a view with every `Search` operation performed in that Region.
 */
export const associateDefaultView: API.OperationMethod<
  AssociateDefaultViewInput,
  AssociateDefaultViewOutput,
  AssociateDefaultViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /AssociateDefaultView",
    input: { ViewArn: 0 },
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
  operationName: "AssociateDefaultView",
})) as any;

export type BatchGetViewError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a list of views.
 */
export const batchGetView: API.OperationMethod<
  BatchGetViewInput,
  BatchGetViewOutput,
  BatchGetViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchGetView",
    input: { ViewArns: 0 },
    output: { Views: D.list(o_View) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetView",
})) as any;

export type CreateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Turns on Amazon Web Services Resource Explorer in the Amazon Web Services Region in which you called this operation by creating an index. Resource Explorer begins discovering the resources in this Region and stores the details about the resources in the index so that they can be queried by using the Search operation. You can create only one index in a Region.
 *
 * This operation creates only a *local* index. To promote the local index in one Amazon Web Services Region into the aggregator index for the Amazon Web Services account, use the UpdateIndexType operation. For more information, see Turning on cross-Region search by creating an aggregator index in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * For more details about what happens when you turn on Resource Explorer in an Amazon Web Services Region, see Turn on Resource Explorer to index your resources in an Amazon Web Services Region in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * If this is the first Amazon Web Services Region in which you've created an index for Resource Explorer, then this operation also creates a service-linked role in your Amazon Web Services account that allows Resource Explorer to enumerate your resources to populate the index.
 *
 * - **Action**: `resource-explorer-2:CreateIndex`
 *
 * **Resource**: The ARN of the index (as it will exist after the operation completes) in the Amazon Web Services Region and account in which you're trying to create the index. Use the wildcard character (`*`) at the end of the string to match the eventual UUID. For example, the following `Resource` element restricts the role or user to creating an index in only the `us-east-2` Region of the specified account.
 *
 * `"Resource": "arn:aws:resource-explorer-2:us-west-2:*<account-id>*:index/*"`
 *
 * Alternatively, you can use `"Resource": "*"` to allow the role or user to create an index in any Region.
 *
 * - **Action**: `iam:CreateServiceLinkedRole`
 *
 * **Resource**: No specific resource (*).
 *
 * This permission is required only the first time you create an index to turn on Resource Explorer in the account. Resource Explorer uses this to create the service-linked role needed to index the resources in your account. Resource Explorer uses the same service-linked role for all additional indexes you create afterwards.
 */
export const createIndex: API.OperationMethod<
  CreateIndexInput,
  CreateIndexOutput,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateIndex",
    input: { ClientToken: D.m({ idempotency: true }), Tags: 0 },
    output: { CreatedAt: D.ts },
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
  operationName: "CreateIndex",
})) as any;

export type CreateResourceExplorerSetupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Resource Explorer setup configuration across multiple Amazon Web Services Regions. This operation sets up indexes and views in the specified Regions. This operation can also be used to set an aggregator Region for cross-Region resource search.
 */
export const createResourceExplorerSetup: API.OperationMethod<
  CreateResourceExplorerSetupInput,
  CreateResourceExplorerSetupOutput,
  CreateResourceExplorerSetupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateResourceExplorerSetup",
    input: { RegionList: 0, AggregatorRegions: 0, ViewName: 0 },
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
  operationName: "CreateResourceExplorerSetup",
})) as any;

export type CreateViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a view that users can query by using the Search operation. Results from queries that you make using this view include only resources that match the view's `Filters`. For more information about Amazon Web Services Resource Explorer views, see Managing views in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * Only the principals with an IAM identity-based policy that grants `Allow` to the `Search` action on a `Resource` with the Amazon resource name (ARN) of this view can Search using views you create with this operation.
 */
export const createView: API.OperationMethod<
  CreateViewInput,
  CreateViewOutput,
  CreateViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateView",
    input: {
      ClientToken: D.m({ idempotency: true }),
      ViewName: 0,
      IncludedProperties: D.list(i_IncludedProperty),
      Scope: 0,
      Filters: i_SearchFilter,
      Tags: 0,
    },
    output: { View: o_View },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateView",
})) as any;

export type DeleteIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified index and turns off Amazon Web Services Resource Explorer in the specified Amazon Web Services Region. When you delete an index, Resource Explorer stops discovering and indexing resources in that Region. Resource Explorer also deletes all views in that Region. These actions occur as asynchronous background tasks. You can check to see when the actions are complete by using the GetIndex operation and checking the `Status` response value.
 *
 * If the index you delete is the aggregator index for the Amazon Web Services account, you must wait 24 hours before you can promote another local index to be the aggregator index for the account. Users can't perform account-wide searches using Resource Explorer until another aggregator index is configured.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexInput,
  DeleteIndexOutput,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteIndex",
    input: { Arn: 0 },
    output: { LastUpdatedAt: D.ts },
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
  operationName: "DeleteIndex",
})) as any;

export type DeleteResourceExplorerSetupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Resource Explorer setup configuration. This operation removes indexes and views from the specified Regions or all Regions where Resource Explorer is configured.
 */
export const deleteResourceExplorerSetup: API.OperationMethod<
  DeleteResourceExplorerSetupInput,
  DeleteResourceExplorerSetupOutput,
  DeleteResourceExplorerSetupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteResourceExplorerSetup",
    input: { RegionList: 0, DeleteInAllRegions: 0 },
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
  operationName: "DeleteResourceExplorerSetup",
})) as any;

export type DeleteViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified view.
 *
 * If the specified view is the default view for its Amazon Web Services Region, then all Search operations in that Region must explicitly specify the view to use until you configure a new default by calling the AssociateDefaultView operation.
 */
export const deleteView: API.OperationMethod<
  DeleteViewInput,
  DeleteViewOutput,
  DeleteViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteView",
    input: { ViewArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteView",
})) as any;

export type DisassociateDefaultViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * After you call this operation, the affected Amazon Web Services Region no longer has a default view. All Search operations in that Region must explicitly specify a view or the operation fails. You can configure a new default by calling the AssociateDefaultView operation.
 *
 * If an Amazon Web Services Region doesn't have a default view configured, then users must explicitly specify a view with every `Search` operation performed in that Region.
 */
export const disassociateDefaultView: API.OperationMethod<
  DisassociateDefaultViewRequest,
  DisassociateDefaultViewResponse,
  DisassociateDefaultViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /DisassociateDefaultView" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDefaultView",
})) as any;

export type GetAccountLevelServiceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the status of your account's Amazon Web Services service access, and validates the service linked role required to access the multi-account search feature. Only the management account can invoke this API call.
 */
export const getAccountLevelServiceConfiguration: API.OperationMethod<
  GetAccountLevelServiceConfigurationRequest,
  GetAccountLevelServiceConfigurationOutput,
  GetAccountLevelServiceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetAccountLevelServiceConfiguration",
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountLevelServiceConfiguration",
})) as any;

export type GetDefaultViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Amazon Resource Name (ARN) of the view that is the default for the Amazon Web Services Region in which you call this operation. You can then call GetView to retrieve the details of that view.
 */
export const getDefaultView: API.OperationMethod<
  GetDefaultViewRequest,
  GetDefaultViewOutput,
  GetDefaultViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetDefaultView" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultView",
})) as any;

export type GetIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about the Amazon Web Services Resource Explorer index in the Amazon Web Services Region in which you invoked the operation.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexOutput,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetIndex",
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
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
  operationName: "GetIndex",
})) as any;

export type GetManagedViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of the specified Amazon Web Services-managed view.
 */
export const getManagedView: API.OperationMethod<
  GetManagedViewInput,
  GetManagedViewOutput,
  GetManagedViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetManagedView",
    input: { ManagedViewArn: 0 },
    output: { ManagedView: { LastUpdatedAt: D.ts } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedView",
})) as any;

export type GetResourceExplorerSetupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and details of a Resource Explorer setup operation. This operation returns information about the progress of creating or deleting Resource Explorer configurations across Regions.
 */
export const getResourceExplorerSetup: API.PaginatedOperationMethod<
  GetResourceExplorerSetupInput,
  GetResourceExplorerSetupOutput,
  GetResourceExplorerSetupError,
  Credentials | HttpClient.HttpClient,
  RegionStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetResourceExplorerSetup",
    input: { TaskId: 0, MaxResults: 0, NextToken: 0 },
    output: { Regions: D.list({ View: { View: o_View } }) },
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
  operationName: "GetResourceExplorerSetup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetServiceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the Resource Explorer index in the current Amazon Web Services Region. This operation returns the ARN and type of the index if one exists.
 */
export const getServiceIndex: API.OperationMethod<
  GetServiceIndexRequest,
  GetServiceIndexOutput,
  GetServiceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetServiceIndex" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceIndex",
})) as any;

export type GetServiceViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific Resource Explorer service view. This operation returns the configuration and properties of the specified view.
 */
export const getServiceView: API.OperationMethod<
  GetServiceViewInput,
  GetServiceViewOutput,
  GetServiceViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetServiceView",
    input: { ServiceViewArn: 0 },
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
  operationName: "GetServiceView",
})) as any;

export type GetViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of the specified view.
 */
export const getView: API.OperationMethod<
  GetViewInput,
  GetViewOutput,
  GetViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetView",
    input: { ViewArn: 0 },
    output: { View: o_View },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetView",
})) as any;

export type ListIndexesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all of the indexes in Amazon Web Services Regions that are currently collecting resource information for Amazon Web Services Resource Explorer.
 */
export const listIndexes: API.PaginatedOperationMethod<
  ListIndexesInput,
  ListIndexesOutput,
  ListIndexesError,
  Credentials | HttpClient.HttpClient,
  Index
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListIndexes",
    input: { Type: 0, Regions: 0, MaxResults: 0, NextToken: 0 },
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
  operationName: "ListIndexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Indexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIndexesForMembersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of a member's indexes in all Amazon Web Services Regions that are currently collecting resource information for Amazon Web Services Resource Explorer. Only the management account or a delegated administrator with service access enabled can invoke this API call.
 */
export const listIndexesForMembers: API.PaginatedOperationMethod<
  ListIndexesForMembersInput,
  ListIndexesForMembersOutput,
  ListIndexesForMembersError,
  Credentials | HttpClient.HttpClient,
  MemberIndex
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListIndexesForMembers",
    input: { AccountIdList: 0, MaxResults: 0, NextToken: 0 },
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
  operationName: "ListIndexesForMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Indexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon resource names (ARNs) of the Amazon Web Services-managed views available in the Amazon Web Services Region in which you call this operation.
 */
export const listManagedViews: API.PaginatedOperationMethod<
  ListManagedViewsInput,
  ListManagedViewsOutput,
  ListManagedViewsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListManagedViews",
    input: { MaxResults: 0, NextToken: 0, ServicePrincipal: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ManagedViews",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of resources and their details that match the specified criteria. This query must use a view. If you don’t explicitly specify a view, then Resource Explorer uses the default view for the Amazon Web Services Region in which you call this operation.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesInput,
  ListResourcesOutput,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  Resource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListResources",
    input: { Filters: i_SearchFilter, MaxResults: 0, ViewArn: 0, NextToken: 0 },
    output: { Resources: D.list(o_Resource) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceIndexesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Resource Explorer indexes across the specified Amazon Web Services Regions. This operation returns information about indexes including their ARNs, types, and Regions.
 */
export const listServiceIndexes: API.PaginatedOperationMethod<
  ListServiceIndexesInput,
  ListServiceIndexesOutput,
  ListServiceIndexesError,
  Credentials | HttpClient.HttpClient,
  Index
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListServiceIndexes",
    input: { Regions: 0, MaxResults: 0, NextToken: 0 },
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
  operationName: "ListServiceIndexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Indexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Resource Explorer service views available in the current Amazon Web Services account. This operation returns the ARNs of available service views.
 */
export const listServiceViews: API.PaginatedOperationMethod<
  ListServiceViewsInput,
  ListServiceViewsOutput,
  ListServiceViewsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListServiceViews",
    input: { MaxResults: 0, NextToken: 0 },
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
  operationName: "ListServiceViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceViews",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamingAccessForServicesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Amazon Web Services services that have been granted streaming access to your Resource Explorer data. Streaming access allows Amazon Web Services services to receive real-time updates about your resources as they are indexed by Resource Explorer.
 */
export const listStreamingAccessForServices: API.PaginatedOperationMethod<
  ListStreamingAccessForServicesInput,
  ListStreamingAccessForServicesOutput,
  ListStreamingAccessForServicesError,
  Credentials | HttpClient.HttpClient,
  StreamingAccessDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStreamingAccessForServices",
    input: { MaxResults: 0, NextToken: 0 },
    output: { StreamingAccessForServices: D.list({ CreatedAt: D.ts }) },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamingAccessForServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StreamingAccessForServices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSupportedResourceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all resource types currently supported by Amazon Web Services Resource Explorer.
 */
export const listSupportedResourceTypes: API.PaginatedOperationMethod<
  ListSupportedResourceTypesInput,
  ListSupportedResourceTypesOutput,
  ListSupportedResourceTypesError,
  Credentials | HttpClient.HttpClient,
  SupportedResourceType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListSupportedResourceTypes",
    input: { NextToken: 0, MaxResults: 0 },
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
  operationName: "ListSupportedResourceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon resource names (ARNs) of the views available in the Amazon Web Services Region in which you call this operation.
 *
 * Always check the `NextToken` response parameter for a `null` value when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more results available. The `NextToken` response parameter value is `null` *only* when there are no more results to display.
 */
export const listViews: API.PaginatedOperationMethod<
  ListViewsInput,
  ListViewsOutput,
  ListViewsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListViews",
    input: { NextToken: 0, MaxResults: 0 },
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
  operationName: "ListViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Views",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for resources and displays details about all resources that match the specified criteria. You must specify a query string.
 *
 * All search queries must use a view. If you don't explicitly specify a view, then Amazon Web Services Resource Explorer uses the default view for the Amazon Web Services Region in which you call this operation. The results are the logical intersection of the results that match both the `QueryString` parameter supplied to this operation and the `SearchFilter` parameter attached to the view.
 *
 * For the complete syntax supported by the `QueryString` parameter, see Search query syntax reference for Resource Explorer.
 *
 * If your search results are empty, or are missing results that you think should be there, see Troubleshooting Resource Explorer search.
 */
export const search: API.PaginatedOperationMethod<
  SearchInput,
  SearchOutput,
  SearchError,
  Credentials | HttpClient.HttpClient,
  Resource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Search",
    input: { QueryString: 0, MaxResults: 0, ViewArn: 0, NextToken: 0 },
    output: { Resources: D.list(o_Resource) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Search",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tag key and value pairs to an Amazon Web Services Resource Explorer view or index.
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
    input: { resourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tag key and value pairs from an Amazon Web Services Resource Explorer view or index.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateIndexTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the type of the index from one of the following types to the other. For more information about indexes and the role they perform in Amazon Web Services Resource Explorer, see Turning on cross-Region search by creating an aggregator index in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * - ** `AGGREGATOR` index type**
 *
 * The index contains information about resources from all Amazon Web Services Regions in the Amazon Web Services account in which you've created a Resource Explorer index. Resource information from all other Regions is replicated to this Region's index.
 *
 * When you change the index type to `AGGREGATOR`, Resource Explorer turns on replication of all discovered resource information from the other Amazon Web Services Regions in your account to this index. You can then, from this Region only, perform resource search queries that span all Amazon Web Services Regions in the Amazon Web Services account. Turning on replication from all other Regions is performed by asynchronous background tasks. You can check the status of the asynchronous tasks by using the GetIndex operation. When the asynchronous tasks complete, the `Status` response of that operation changes from `UPDATING` to `ACTIVE`. After that, you can start to see results from other Amazon Web Services Regions in query results. However, it can take several hours for replication from all other Regions to complete.
 *
 * You can have only one aggregator index per Amazon Web Services account. Before you can promote a different index to be the aggregator index for the account, you must first demote the existing aggregator index to type `LOCAL`.
 *
 * - ** `LOCAL` index type**
 *
 * The index contains information about resources in only the Amazon Web Services Region in which the index exists. If an aggregator index in another Region exists, then information in this local index is replicated to the aggregator index.
 *
 * When you change the index type to `LOCAL`, Resource Explorer turns off the replication of resource information from all other Amazon Web Services Regions in the Amazon Web Services account to this Region. The aggregator index remains in the `UPDATING` state until all replication with other Regions successfully stops. You can check the status of the asynchronous task by using the GetIndex operation. When Resource Explorer successfully stops all replication with other Regions, the `Status` response of that operation changes from `UPDATING` to `ACTIVE`. Separately, the resource information from other Regions that was previously stored in the index is deleted within 30 days by another background task. Until that asynchronous task completes, some results from other Regions can continue to appear in search results.
 *
 * After you demote an aggregator index to a local index, you must wait 24 hours before you can promote another index to be the new aggregator index for the account.
 */
export const updateIndexType: API.OperationMethod<
  UpdateIndexTypeInput,
  UpdateIndexTypeOutput,
  UpdateIndexTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateIndexType",
    input: { Arn: 0, Type: 0 },
    output: { LastUpdatedAt: D.ts },
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
  operationName: "UpdateIndexType",
})) as any;

export type UpdateViewError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Modifies some of the details of a view. You can change the filter string and the list of included properties. You can't change the name of the view.
 */
export const updateView: API.OperationMethod<
  UpdateViewInput,
  UpdateViewOutput,
  UpdateViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateView",
    input: {
      ViewArn: 0,
      IncludedProperties: D.list(i_IncludedProperty),
      Filters: i_SearchFilter,
    },
    output: { View: o_View },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateView",
})) as any;

const i_IncludedProperty: D.LazyStruct = () => ({ Name: 0 });
const i_SearchFilter: D.LazyStruct = () => ({ FilterString: 0 });
const o_Resource: D.LazyStruct = () => ({
  LastReportedAt: D.ts,
  Properties: D.list({ LastReportedAt: D.ts }),
});
const o_View: D.LazyStruct = () => ({ LastUpdatedAt: D.ts });
