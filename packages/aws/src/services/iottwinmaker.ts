import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "IoTTwinMaker",
  serviceShapeName: "AWSIoTTwinMaker",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iottwinmaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-11-29");
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
              `https://iottwinmaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://iottwinmaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iottwinmaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://iottwinmaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://iottwinmaker.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "IoTTwinMaker",
  service: "IoTTwinMaker",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConnectorFailureException
  extends /*@__PURE__*/ S.TaggedError<ConnectorFailureException>()(
    "ConnectorFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class ConnectorTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ConnectorTimeoutException>()(
    "ConnectorTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class QueryTimeoutException
  extends /*@__PURE__*/ S.TaggedError<QueryTimeoutException>()(
    "QueryTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Id = string;
export type Name = string;
export type ComponentPath = string;
export type ExternalIdProperty = { [key: string]: string | undefined };
export type EntityId = string;
export interface EntityPropertyReference {
  componentName?: string | undefined;
  componentPath?: string | undefined;
  externalIdProperty?: { [key: string]: string | undefined } | undefined;
  entityId?: string | undefined;
  propertyName: string;
}
export type DataValueList = DataValue[];
export type DataValueMap = { [key: string]: DataValue | undefined };
export interface RelationshipValue {
  targetEntityId?: string | undefined;
  targetComponentName?: string | undefined;
}
export type Expression = string;
export interface DataValue {
  booleanValue?: boolean | undefined;
  doubleValue?: number | undefined;
  integerValue?: number | undefined;
  longValue?: number | undefined;
  stringValue?: string | undefined;
  listValue?: DataValue[] | undefined;
  mapValue?: { [key: string]: DataValue | undefined } | undefined;
  relationshipValue?: RelationshipValue | undefined;
  expression?: string | undefined;
}
export interface PropertyValue {
  timestamp?: Date | undefined;
  value: DataValue;
  time?: string | undefined;
}
export type PropertyValues = PropertyValue[];
export interface PropertyValueEntry {
  entityPropertyReference: EntityPropertyReference;
  propertyValues?: PropertyValue[] | undefined;
}
export type Entries = PropertyValueEntry[];
export interface BatchPutPropertyValuesRequest {
  workspaceId: string;
  entries: PropertyValueEntry[];
}
export interface BatchPutPropertyError {
  errorCode: string;
  errorMessage: string;
  entry: PropertyValueEntry;
}
export type Errors = BatchPutPropertyError[];
export interface BatchPutPropertyErrorEntry {
  errors: BatchPutPropertyError[];
}
export type ErrorEntries = BatchPutPropertyErrorEntry[];
export interface BatchPutPropertyValuesResponse {
  errorEntries: BatchPutPropertyErrorEntry[];
}
export interface CancelMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export type TwinMakerArn = string;
export type MetadataTransferJobState = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface ErrorDetails {
  code?: string | undefined;
  message?: string | undefined;
}
export interface MetadataTransferJobStatus {
  state?: string | undefined;
  error?: ErrorDetails | undefined;
  queuedPosition?: number | undefined;
}
export interface MetadataTransferJobProgress {
  totalCount?: number | undefined;
  succeededCount?: number | undefined;
  skippedCount?: number | undefined;
  failedCount?: number | undefined;
}
export interface CancelMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress | undefined;
}
export type ComponentTypeId = string;
export type Description = string;
export type Type = string;
export interface Relationship {
  targetComponentTypeId?: string | undefined;
  relationshipType?: string | undefined;
}
export interface DataType {
  type: string;
  nestedType?: DataType | undefined;
  allowedValues?: DataValue[] | undefined;
  unitOfMeasure?: string | undefined;
  relationship?: Relationship | undefined;
}
export type Value = string;
export type Configuration = { [key: string]: string | undefined };
export type PropertyDisplayName = string;
export interface PropertyDefinitionRequest {
  dataType?: DataType | undefined;
  isRequiredInEntity?: boolean | undefined;
  isExternalId?: boolean | undefined;
  isStoredExternally?: boolean | undefined;
  isTimeSeries?: boolean | undefined;
  defaultValue?: DataValue | undefined;
  configuration?: { [key: string]: string | undefined } | undefined;
  displayName?: string | undefined;
}
export type PropertyDefinitionsRequest = { [key: string]: PropertyDefinitionRequest | undefined };
export type ExtendsFrom = string[];
export type RequiredProperties = string[];
export type Scope = string;
export type LambdaArn = string;
export interface LambdaFunction {
  arn: string;
}
export interface DataConnector {
  lambda?: LambdaFunction | undefined;
  isNative?: boolean | undefined;
}
export interface FunctionRequest {
  requiredProperties?: string[] | undefined;
  scope?: string | undefined;
  implementedBy?: DataConnector | undefined;
}
export type FunctionsRequest = { [key: string]: FunctionRequest | undefined };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type GroupType = string;
export type PropertyNames = string[];
export interface PropertyGroupRequest {
  groupType?: string | undefined;
  propertyNames?: string[] | undefined;
}
export type PropertyGroupsRequest = { [key: string]: PropertyGroupRequest | undefined };
export type ComponentTypeName = string;
export interface CompositeComponentTypeRequest {
  componentTypeId?: string | undefined;
}
export type CompositeComponentTypesRequest = {
  [key: string]: CompositeComponentTypeRequest | undefined;
};
export interface CreateComponentTypeRequest {
  workspaceId: string;
  isSingleton?: boolean | undefined;
  componentTypeId: string;
  description?: string | undefined;
  propertyDefinitions?: { [key: string]: PropertyDefinitionRequest | undefined } | undefined;
  extendsFrom?: string[] | undefined;
  functions?: { [key: string]: FunctionRequest | undefined } | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  propertyGroups?: { [key: string]: PropertyGroupRequest | undefined } | undefined;
  componentTypeName?: string | undefined;
  compositeComponentTypes?:
    | { [key: string]: CompositeComponentTypeRequest | undefined }
    | undefined;
}
export type State = string;
export interface CreateComponentTypeResponse {
  arn: string;
  creationDateTime: Date;
  state: string;
}
export type EntityName = string;
export type PropertyUpdateType = string;
export interface PropertyRequest {
  definition?: PropertyDefinitionRequest | undefined;
  value?: DataValue | undefined;
  updateType?: string | undefined;
}
export type PropertyRequests = { [key: string]: PropertyRequest | undefined };
export type PropertyGroupUpdateType = string;
export interface ComponentPropertyGroupRequest {
  groupType?: string | undefined;
  propertyNames?: string[] | undefined;
  updateType?: string | undefined;
}
export type ComponentPropertyGroupRequests = {
  [key: string]: ComponentPropertyGroupRequest | undefined;
};
export interface ComponentRequest {
  description?: string | undefined;
  componentTypeId?: string | undefined;
  properties?: { [key: string]: PropertyRequest | undefined } | undefined;
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined } | undefined;
}
export type ComponentsMapRequest = { [key: string]: ComponentRequest | undefined };
export interface CompositeComponentRequest {
  description?: string | undefined;
  properties?: { [key: string]: PropertyRequest | undefined } | undefined;
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined } | undefined;
}
export type CompositeComponentsMapRequest = {
  [key: string]: CompositeComponentRequest | undefined;
};
export type ParentEntityId = string;
export interface CreateEntityRequest {
  workspaceId: string;
  entityId?: string | undefined;
  entityName: string;
  description?: string | undefined;
  components?: { [key: string]: ComponentRequest | undefined } | undefined;
  compositeComponents?: { [key: string]: CompositeComponentRequest | undefined } | undefined;
  parentEntityId?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateEntityResponse {
  entityId: string;
  arn: string;
  creationDateTime: Date;
  state: string;
}
export type SourceType = string;
export type S3SourceLocation = string;
export interface S3SourceConfiguration {
  location: string;
}
export type Uuid = string;
export type SiteWiseExternalId = string;
export interface FilterByAssetModel {
  assetModelId?: string | undefined;
  assetModelExternalId?: string | undefined;
  includeOffspring?: boolean | undefined;
  includeAssets?: boolean | undefined;
}
export interface FilterByAsset {
  assetId?: string | undefined;
  assetExternalId?: string | undefined;
  includeOffspring?: boolean | undefined;
  includeAssetModel?: boolean | undefined;
}
export type IotSiteWiseSourceConfigurationFilter =
  | { filterByAssetModel: FilterByAssetModel; filterByAsset?: undefined }
  | { filterByAssetModel?: undefined; filterByAsset: FilterByAsset };
export type IotSiteWiseSourceConfigurationFilters = IotSiteWiseSourceConfigurationFilter[];
export interface IotSiteWiseSourceConfiguration {
  filters?: IotSiteWiseSourceConfigurationFilter[] | undefined;
}
export interface FilterByComponentType {
  componentTypeId: string;
}
export interface FilterByEntity {
  entityId: string;
}
export type IotTwinMakerSourceConfigurationFilter =
  | { filterByComponentType: FilterByComponentType; filterByEntity?: undefined }
  | { filterByComponentType?: undefined; filterByEntity: FilterByEntity };
export type IotTwinMakerSourceConfigurationFilters = IotTwinMakerSourceConfigurationFilter[];
export interface IotTwinMakerSourceConfiguration {
  workspace: string;
  filters?: IotTwinMakerSourceConfigurationFilter[] | undefined;
}
export interface SourceConfiguration {
  type: string;
  s3Configuration?: S3SourceConfiguration | undefined;
  iotSiteWiseConfiguration?: IotSiteWiseSourceConfiguration | undefined;
  iotTwinMakerConfiguration?: IotTwinMakerSourceConfiguration | undefined;
}
export type SourceConfigurations = SourceConfiguration[];
export type DestinationType = string;
export type S3DestinationLocation = string;
export interface S3DestinationConfiguration {
  location: string;
}
export interface IotTwinMakerDestinationConfiguration {
  workspace: string;
}
export interface DestinationConfiguration {
  type: string;
  s3Configuration?: S3DestinationConfiguration | undefined;
  iotTwinMakerConfiguration?: IotTwinMakerDestinationConfiguration | undefined;
}
export interface CreateMetadataTransferJobRequest {
  metadataTransferJobId?: string | undefined;
  description?: string | undefined;
  sources: SourceConfiguration[];
  destination: DestinationConfiguration;
}
export interface CreateMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  status: MetadataTransferJobStatus;
}
export type S3Url = string;
export type SceneCapability = string;
export type SceneCapabilities = string[];
export type SceneMetadataValue = string;
export type SceneMetadataMap = { [key: string]: string | undefined };
export interface CreateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation: string;
  description?: string | undefined;
  capabilities?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  sceneMetadata?: { [key: string]: string | undefined } | undefined;
}
export interface CreateSceneResponse {
  arn: string;
  creationDateTime: Date;
}
export type SyncSource = string;
export type RoleArn = string;
export interface CreateSyncJobRequest {
  workspaceId: string;
  syncSource: string;
  syncRole: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type SyncJobState = string;
export interface CreateSyncJobResponse {
  arn: string;
  creationDateTime: Date;
  state: string;
}
export type S3Location = string;
export interface CreateWorkspaceRequest {
  workspaceId: string;
  description?: string | undefined;
  s3Location?: string | undefined;
  role?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateWorkspaceResponse {
  arn: string;
  creationDateTime: Date;
}
export interface DeleteComponentTypeRequest {
  workspaceId: string;
  componentTypeId: string;
}
export interface DeleteComponentTypeResponse {
  state: string;
}
export interface DeleteEntityRequest {
  workspaceId: string;
  entityId: string;
  isRecursive?: boolean | undefined;
}
export interface DeleteEntityResponse {
  state: string;
}
export interface DeleteSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export interface DeleteSceneResponse {}
export interface DeleteSyncJobRequest {
  workspaceId: string;
  syncSource: string;
}
export interface DeleteSyncJobResponse {
  state: string;
}
export interface DeleteWorkspaceRequest {
  workspaceId: string;
}
export type WorkspaceDeleteMessage = string;
export interface DeleteWorkspaceResponse {
  message?: string | undefined;
}
export type QueryStatement = string;
export type QueryServiceMaxResults = number;
export type NextToken = string;
export interface ExecuteQueryRequest {
  workspaceId: string;
  queryStatement: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type ColumnName = string;
export type ColumnType = string;
export interface ColumnDescription {
  name?: string | undefined;
  type?: string | undefined;
}
export type ColumnDescriptions = ColumnDescription[];
export type QueryResultValue = unknown;
export type RowData = any[];
export interface Row {
  rowData?: any[] | undefined;
}
export type Rows = Row[];
export interface ExecuteQueryResponse {
  columnDescriptions?: ColumnDescription[] | undefined;
  rows?: Row[] | undefined;
  nextToken?: string | undefined;
}
export interface GetComponentTypeRequest {
  workspaceId: string;
  componentTypeId: string;
}
export interface PropertyDefinitionResponse {
  dataType: DataType;
  isTimeSeries: boolean;
  isRequiredInEntity: boolean;
  isExternalId: boolean;
  isStoredExternally: boolean;
  isImported: boolean;
  isFinal: boolean;
  isInherited: boolean;
  defaultValue?: DataValue | undefined;
  configuration?: { [key: string]: string | undefined } | undefined;
  displayName?: string | undefined;
}
export type PropertyDefinitionsResponse = { [key: string]: PropertyDefinitionResponse | undefined };
export interface FunctionResponse {
  requiredProperties?: string[] | undefined;
  scope?: string | undefined;
  implementedBy?: DataConnector | undefined;
  isInherited?: boolean | undefined;
}
export type FunctionsResponse = { [key: string]: FunctionResponse | undefined };
export interface Status {
  state?: string | undefined;
  error?: ErrorDetails | undefined;
}
export interface PropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export type PropertyGroupsResponse = { [key: string]: PropertyGroupResponse | undefined };
export interface CompositeComponentTypeResponse {
  componentTypeId?: string | undefined;
  isInherited?: boolean | undefined;
}
export type CompositeComponentTypesResponse = {
  [key: string]: CompositeComponentTypeResponse | undefined;
};
export interface GetComponentTypeResponse {
  workspaceId: string;
  isSingleton?: boolean | undefined;
  componentTypeId: string;
  description?: string | undefined;
  propertyDefinitions?: { [key: string]: PropertyDefinitionResponse | undefined } | undefined;
  extendsFrom?: string[] | undefined;
  functions?: { [key: string]: FunctionResponse | undefined } | undefined;
  creationDateTime: Date;
  updateDateTime: Date;
  arn: string;
  isAbstract?: boolean | undefined;
  isSchemaInitialized?: boolean | undefined;
  status?: Status | undefined;
  propertyGroups?: { [key: string]: PropertyGroupResponse | undefined } | undefined;
  syncSource?: string | undefined;
  componentTypeName?: string | undefined;
  compositeComponentTypes?:
    | { [key: string]: CompositeComponentTypeResponse | undefined }
    | undefined;
}
export interface GetEntityRequest {
  workspaceId: string;
  entityId: string;
}
export interface PropertyResponse {
  definition?: PropertyDefinitionResponse | undefined;
  value?: DataValue | undefined;
  areAllPropertyValuesReturned?: boolean | undefined;
}
export type PropertyResponses = { [key: string]: PropertyResponse | undefined };
export interface ComponentPropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export type ComponentPropertyGroupResponses = {
  [key: string]: ComponentPropertyGroupResponse | undefined;
};
export interface ComponentSummary {
  componentName: string;
  componentTypeId: string;
  definedIn?: string | undefined;
  description?: string | undefined;
  propertyGroups?: { [key: string]: ComponentPropertyGroupResponse | undefined } | undefined;
  status: Status;
  syncSource?: string | undefined;
  componentPath?: string | undefined;
}
export type CompositeComponentResponse = { [key: string]: ComponentSummary | undefined };
export interface ComponentResponse {
  componentName?: string | undefined;
  description?: string | undefined;
  componentTypeId?: string | undefined;
  status?: Status | undefined;
  definedIn?: string | undefined;
  properties?: { [key: string]: PropertyResponse | undefined } | undefined;
  propertyGroups?: { [key: string]: ComponentPropertyGroupResponse | undefined } | undefined;
  syncSource?: string | undefined;
  areAllPropertiesReturned?: boolean | undefined;
  compositeComponents?: { [key: string]: ComponentSummary | undefined } | undefined;
  areAllCompositeComponentsReturned?: boolean | undefined;
}
export type ComponentsMap = { [key: string]: ComponentResponse | undefined };
export interface GetEntityResponse {
  entityId: string;
  entityName: string;
  arn: string;
  status: Status;
  workspaceId: string;
  description?: string | undefined;
  components?: { [key: string]: ComponentResponse | undefined } | undefined;
  parentEntityId: string;
  hasChildEntities: boolean;
  creationDateTime: Date;
  updateDateTime: Date;
  syncSource?: string | undefined;
  areAllComponentsReturned?: boolean | undefined;
}
export interface GetMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export interface GetMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  description?: string | undefined;
  sources: SourceConfiguration[];
  destination: DestinationConfiguration;
  metadataTransferJobRole: string;
  reportUrl?: string | undefined;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress | undefined;
}
export interface GetPricingPlanRequest {}
export type BundleName = string;
export type PricingBundles = string[];
export type PricingTier = string;
export interface BundleInformation {
  bundleNames: string[];
  pricingTier?: string | undefined;
}
export type PricingMode = string;
export type UpdateReason = string;
export interface PricingPlan {
  billableEntityCount?: number | undefined;
  bundleInformation?: BundleInformation | undefined;
  effectiveDateTime: Date;
  pricingMode: string;
  updateDateTime: Date;
  updateReason: string;
}
export interface GetPricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan | undefined;
}
export type SelectedPropertyList = string[];
export type MaxResults = number;
export type Order = string;
export interface OrderBy {
  order?: string | undefined;
  propertyName: string;
}
export type OrderByList = OrderBy[];
export interface PropertyFilter {
  propertyName?: string | undefined;
  operator?: string | undefined;
  value?: DataValue | undefined;
}
export type PropertyFilters = PropertyFilter[];
export interface TabularConditions {
  orderBy?: OrderBy[] | undefined;
  propertyFilters?: PropertyFilter[] | undefined;
}
export interface GetPropertyValueRequest {
  componentName?: string | undefined;
  componentPath?: string | undefined;
  componentTypeId?: string | undefined;
  entityId?: string | undefined;
  selectedProperties: string[];
  workspaceId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  propertyGroupName?: string | undefined;
  tabularConditions?: TabularConditions | undefined;
}
export interface PropertyLatestValue {
  propertyReference: EntityPropertyReference;
  propertyValue?: DataValue | undefined;
}
export type PropertyLatestValueMap = { [key: string]: PropertyLatestValue | undefined };
export type PropertyTableValue = { [key: string]: DataValue | undefined };
export type TabularPropertyValue = { [key: string]: DataValue | undefined }[];
export type TabularPropertyValues = { [key: string]: DataValue | undefined }[][];
export interface GetPropertyValueResponse {
  propertyValues?: { [key: string]: PropertyLatestValue | undefined } | undefined;
  nextToken?: string | undefined;
  tabularPropertyValues?: { [key: string]: DataValue | undefined }[][] | undefined;
}
export type InterpolationType = string;
export type IntervalInSeconds = number;
export interface InterpolationParameters {
  interpolationType?: string | undefined;
  intervalInSeconds?: number | undefined;
}
export type OrderByTime = string;
export interface GetPropertyValueHistoryRequest {
  workspaceId: string;
  entityId?: string | undefined;
  componentName?: string | undefined;
  componentPath?: string | undefined;
  componentTypeId?: string | undefined;
  selectedProperties: string[];
  propertyFilters?: PropertyFilter[] | undefined;
  startDateTime?: Date | undefined;
  endDateTime?: Date | undefined;
  interpolation?: InterpolationParameters | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  orderByTime?: string | undefined;
  startTime?: string | undefined;
  endTime?: string | undefined;
}
export type Values = PropertyValue[];
export interface PropertyValueHistory {
  entityPropertyReference: EntityPropertyReference;
  values?: PropertyValue[] | undefined;
}
export type PropertyValueList = PropertyValueHistory[];
export interface GetPropertyValueHistoryResponse {
  propertyValues: PropertyValueHistory[];
  nextToken?: string | undefined;
}
export interface GetSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export type GeneratedSceneMetadataMap = { [key: string]: string | undefined };
export type SceneErrorCode = string;
export interface SceneError {
  code?: string | undefined;
  message?: string | undefined;
}
export interface GetSceneResponse {
  workspaceId: string;
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string | undefined;
  capabilities?: string[] | undefined;
  sceneMetadata?: { [key: string]: string | undefined } | undefined;
  generatedSceneMetadata?: { [key: string]: string | undefined } | undefined;
  error?: SceneError | undefined;
}
export interface GetSyncJobRequest {
  syncSource: string;
  workspaceId?: string | undefined;
}
export interface SyncJobStatus {
  state?: string | undefined;
  error?: ErrorDetails | undefined;
}
export interface GetSyncJobResponse {
  arn: string;
  workspaceId: string;
  syncSource: string;
  syncRole: string;
  status: SyncJobStatus;
  creationDateTime: Date;
  updateDateTime: Date;
}
export type IdOrArn = string;
export interface GetWorkspaceRequest {
  workspaceId: string;
}
export type LinkedService = string;
export type LinkedServices = string[];
export interface GetWorkspaceResponse {
  workspaceId: string;
  arn: string;
  description?: string | undefined;
  linkedServices?: string[] | undefined;
  s3Location?: string | undefined;
  role?: string | undefined;
  creationDateTime: Date;
  updateDateTime: Date;
}
export interface ListComponentsRequest {
  workspaceId: string;
  entityId: string;
  componentPath?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type ComponentSummaries = ComponentSummary[];
export interface ListComponentsResponse {
  componentSummaries: ComponentSummary[];
  nextToken?: string | undefined;
}
export type ListComponentTypesFilter =
  | { extendsFrom: string; namespace?: undefined; isAbstract?: undefined }
  | { extendsFrom?: undefined; namespace: string; isAbstract?: undefined }
  | { extendsFrom?: undefined; namespace?: undefined; isAbstract: boolean };
export type ListComponentTypesFilters = ListComponentTypesFilter[];
export interface ListComponentTypesRequest {
  workspaceId: string;
  filters?: ListComponentTypesFilter[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ComponentTypeSummary {
  arn: string;
  componentTypeId: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string | undefined;
  status?: Status | undefined;
  componentTypeName?: string | undefined;
}
export type ComponentTypeSummaries = ComponentTypeSummary[];
export interface ListComponentTypesResponse {
  workspaceId: string;
  componentTypeSummaries: ComponentTypeSummary[];
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type ListEntitiesFilter =
  | { parentEntityId: string; componentTypeId?: undefined; externalId?: undefined }
  | { parentEntityId?: undefined; componentTypeId: string; externalId?: undefined }
  | { parentEntityId?: undefined; componentTypeId?: undefined; externalId: string };
export type ListEntitiesFilters = ListEntitiesFilter[];
export interface ListEntitiesRequest {
  workspaceId: string;
  filters?: ListEntitiesFilter[] | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface EntitySummary {
  entityId: string;
  entityName: string;
  arn: string;
  parentEntityId?: string | undefined;
  status: Status;
  description?: string | undefined;
  hasChildEntities?: boolean | undefined;
  creationDateTime: Date;
  updateDateTime: Date;
}
export type EntitySummaries = EntitySummary[];
export interface ListEntitiesResponse {
  entitySummaries?: EntitySummary[] | undefined;
  nextToken?: string | undefined;
}
export type ListMetadataTransferJobsFilter =
  | { workspaceId: string; state?: undefined }
  | { workspaceId?: undefined; state: string };
export type ListMetadataTransferJobsFilters = ListMetadataTransferJobsFilter[];
export interface ListMetadataTransferJobsRequest {
  sourceType: string;
  destinationType: string;
  filters?: ListMetadataTransferJobsFilter[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface MetadataTransferJobSummary {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress | undefined;
}
export type MetadataTransferJobSummaries = MetadataTransferJobSummary[];
export interface ListMetadataTransferJobsResponse {
  metadataTransferJobSummaries: MetadataTransferJobSummary[];
  nextToken?: string | undefined;
}
export interface ListPropertiesRequest {
  workspaceId: string;
  componentName?: string | undefined;
  componentPath?: string | undefined;
  entityId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PropertySummary {
  definition?: PropertyDefinitionResponse | undefined;
  propertyName: string;
  value?: DataValue | undefined;
  areAllPropertyValuesReturned?: boolean | undefined;
}
export type PropertySummaries = PropertySummary[];
export interface ListPropertiesResponse {
  propertySummaries: PropertySummary[];
  nextToken?: string | undefined;
}
export interface ListScenesRequest {
  workspaceId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface SceneSummary {
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string | undefined;
}
export type SceneSummaries = SceneSummary[];
export interface ListScenesResponse {
  sceneSummaries?: SceneSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListSyncJobsRequest {
  workspaceId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface SyncJobSummary {
  arn?: string | undefined;
  workspaceId?: string | undefined;
  syncSource?: string | undefined;
  status?: SyncJobStatus | undefined;
  creationDateTime?: Date | undefined;
  updateDateTime?: Date | undefined;
}
export type SyncJobSummaries = SyncJobSummary[];
export interface ListSyncJobsResponse {
  syncJobSummaries?: SyncJobSummary[] | undefined;
  nextToken?: string | undefined;
}
export type SyncResourceState = string;
export type SyncResourceType = string;
export type SyncResourceFilter =
  | { state: string; resourceType?: undefined; resourceId?: undefined; externalId?: undefined }
  | { state?: undefined; resourceType: string; resourceId?: undefined; externalId?: undefined }
  | { state?: undefined; resourceType?: undefined; resourceId: string; externalId?: undefined }
  | { state?: undefined; resourceType?: undefined; resourceId?: undefined; externalId: string };
export type SyncResourceFilters = SyncResourceFilter[];
export interface ListSyncResourcesRequest {
  workspaceId: string;
  syncSource: string;
  filters?: SyncResourceFilter[] | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface SyncResourceStatus {
  state?: string | undefined;
  error?: ErrorDetails | undefined;
}
export interface SyncResourceSummary {
  resourceType?: string | undefined;
  externalId?: string | undefined;
  resourceId?: string | undefined;
  status?: SyncResourceStatus | undefined;
  updateDateTime?: Date | undefined;
}
export type SyncResourceSummaries = SyncResourceSummary[];
export interface ListSyncResourcesResponse {
  syncResources?: SyncResourceSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  resourceARN: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
  nextToken?: string | undefined;
}
export interface ListWorkspacesRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface WorkspaceSummary {
  workspaceId: string;
  arn: string;
  description?: string | undefined;
  linkedServices?: string[] | undefined;
  creationDateTime: Date;
  updateDateTime: Date;
}
export type WorkspaceSummaries = WorkspaceSummary[];
export interface ListWorkspacesResponse {
  workspaceSummaries?: WorkspaceSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateComponentTypeRequest {
  workspaceId: string;
  isSingleton?: boolean | undefined;
  componentTypeId: string;
  description?: string | undefined;
  propertyDefinitions?: { [key: string]: PropertyDefinitionRequest | undefined } | undefined;
  extendsFrom?: string[] | undefined;
  functions?: { [key: string]: FunctionRequest | undefined } | undefined;
  propertyGroups?: { [key: string]: PropertyGroupRequest | undefined } | undefined;
  componentTypeName?: string | undefined;
  compositeComponentTypes?:
    | { [key: string]: CompositeComponentTypeRequest | undefined }
    | undefined;
}
export interface UpdateComponentTypeResponse {
  workspaceId: string;
  arn: string;
  componentTypeId: string;
  state: string;
}
export type ComponentUpdateType = string;
export interface ComponentUpdateRequest {
  updateType?: string | undefined;
  description?: string | undefined;
  componentTypeId?: string | undefined;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined } | undefined;
  propertyGroupUpdates?: { [key: string]: ComponentPropertyGroupRequest | undefined } | undefined;
}
export type ComponentUpdatesMapRequest = { [key: string]: ComponentUpdateRequest | undefined };
export interface CompositeComponentUpdateRequest {
  updateType?: string | undefined;
  description?: string | undefined;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined } | undefined;
  propertyGroupUpdates?: { [key: string]: ComponentPropertyGroupRequest | undefined } | undefined;
}
export type CompositeComponentUpdatesMapRequest = {
  [key: string]: CompositeComponentUpdateRequest | undefined;
};
export type ParentEntityUpdateType = string;
export interface ParentEntityUpdateRequest {
  updateType: string;
  parentEntityId?: string | undefined;
}
export interface UpdateEntityRequest {
  workspaceId: string;
  entityId: string;
  entityName?: string | undefined;
  description?: string | undefined;
  componentUpdates?: { [key: string]: ComponentUpdateRequest | undefined } | undefined;
  compositeComponentUpdates?:
    | { [key: string]: CompositeComponentUpdateRequest | undefined }
    | undefined;
  parentEntityUpdate?: ParentEntityUpdateRequest | undefined;
}
export interface UpdateEntityResponse {
  updateDateTime: Date;
  state: string;
}
export interface UpdatePricingPlanRequest {
  pricingMode: string;
  bundleNames?: string[] | undefined;
}
export interface UpdatePricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan | undefined;
}
export interface UpdateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation?: string | undefined;
  description?: string | undefined;
  capabilities?: string[] | undefined;
  sceneMetadata?: { [key: string]: string | undefined } | undefined;
}
export interface UpdateSceneResponse {
  updateDateTime: Date;
}
export interface UpdateWorkspaceRequest {
  workspaceId: string;
  description?: string | undefined;
  role?: string | undefined;
  s3Location?: string | undefined;
}
export interface UpdateWorkspaceResponse {
  updateDateTime: Date;
}
export type ExceptionMessage = string;
export type BatchPutPropertyValuesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets values for multiple time series properties.
 */
export const batchPutPropertyValues: API.OperationMethod<
  BatchPutPropertyValuesRequest & RegionInput,
  BatchPutPropertyValuesResponse,
  BatchPutPropertyValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<BatchPutPropertyValuesRequest>,
  output: __S(7, __c0, 7) as any as S.Schema<BatchPutPropertyValuesResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutPropertyValues",
  endpointHostPrefix: "data.",
  telemetry: TELEMETRY,
  span: "BatchPutPropertyValues",
}));

export type CancelMetadataTransferJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the metadata transfer job.
 */
export const cancelMetadataTransferJob: API.OperationMethod<
  CancelMetadataTransferJobRequest & RegionInput,
  CancelMetadataTransferJobResponse,
  CancelMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CancelMetadataTransferJobRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CancelMetadataTransferJobResponse>,
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
  operationName: "CancelMetadataTransferJob",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CancelMetadataTransferJob",
}));

export type CreateComponentTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a component type.
 */
export const createComponentType: API.OperationMethod<
  CreateComponentTypeRequest & RegionInput,
  CreateComponentTypeResponse,
  CreateComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateComponentTypeRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<CreateComponentTypeResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponentType",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CreateComponentType",
}));

export type CreateEntityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an entity.
 */
export const createEntity: API.OperationMethod<
  CreateEntityRequest & RegionInput,
  CreateEntityResponse,
  CreateEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(260, __c16, 4) as any as S.Schema<CreateEntityRequest>,
  output: __S(261, __c16, 5) as any as S.Schema<CreateEntityResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntity",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CreateEntity",
}));

export type CreateMetadataTransferJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new metadata transfer job.
 */
export const createMetadataTransferJob: API.OperationMethod<
  CreateMetadataTransferJobRequest & RegionInput,
  CreateMetadataTransferJobResponse,
  CreateMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreateMetadataTransferJobRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<CreateMetadataTransferJobResponse>,
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
  operationName: "CreateMetadataTransferJob",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CreateMetadataTransferJob",
}));

export type CreateSceneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scene.
 */
export const createScene: API.OperationMethod<
  CreateSceneRequest & RegionInput,
  CreateSceneResponse,
  CreateSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateSceneRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<CreateSceneResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScene",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CreateScene",
}));

export type CreateSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action creates a SyncJob.
 */
export const createSyncJob: API.OperationMethod<
  CreateSyncJobRequest & RegionInput,
  CreateSyncJobResponse,
  CreateSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<CreateSyncJobRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<CreateSyncJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSyncJob",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CreateSyncJob",
}));

export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a workplace.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest & RegionInput,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<CreateWorkspaceRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<CreateWorkspaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspace",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "CreateWorkspace",
}));

export type DeleteComponentTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a component type.
 */
export const deleteComponentType: API.OperationMethod<
  DeleteComponentTypeRequest & RegionInput,
  DeleteComponentTypeResponse,
  DeleteComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DeleteComponentTypeRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteComponentTypeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponentType",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "DeleteComponentType",
}));

export type DeleteEntityError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an entity.
 */
export const deleteEntity: API.OperationMethod<
  DeleteEntityRequest & RegionInput,
  DeleteEntityResponse,
  DeleteEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteEntityRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteEntityResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntity",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "DeleteEntity",
}));

export type DeleteSceneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a scene.
 */
export const deleteScene: API.OperationMethod<
  DeleteSceneRequest & RegionInput,
  DeleteSceneResponse,
  DeleteSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteSceneRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteSceneResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScene",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "DeleteScene",
}));

export type DeleteSyncJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the SyncJob.
 */
export const deleteSyncJob: API.OperationMethod<
  DeleteSyncJobRequest & RegionInput,
  DeleteSyncJobResponse,
  DeleteSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteSyncJobRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<DeleteSyncJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSyncJob",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "DeleteSyncJob",
}));

export type DeleteWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workspace.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest & RegionInput,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteWorkspaceRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<DeleteWorkspaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspace",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "DeleteWorkspace",
}));

export type ExecuteQueryError =
  | AccessDeniedException
  | InternalServerException
  | QueryTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Run queries to access information from your knowledge graph of entities within
 * individual workspaces.
 *
 * The ExecuteQuery action only works with Amazon Web Services Java SDK2.
 * ExecuteQuery will not work with any Amazon Web Services Java SDK version < 2.x.
 */
export const executeQuery: API.PaginatedOperationMethod<
  ExecuteQueryRequest & RegionInput,
  ExecuteQueryResponse,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ExecuteQueryRequest>,
  output: __S(502, __c31, 6) as any as S.Schema<ExecuteQueryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    QueryTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ExecuteQuery",
})) as any;

export type GetComponentTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a component type.
 */
export const getComponentType: API.OperationMethod<
  GetComponentTypeRequest & RegionInput,
  GetComponentTypeResponse,
  GetComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<GetComponentTypeRequest>,
  output: __S(518, __c32, 6) as any as S.Schema<GetComponentTypeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponentType",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetComponentType",
}));

export type GetEntityError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an entity.
 */
export const getEntity: API.OperationMethod<
  GetEntityRequest & RegionInput,
  GetEntityResponse,
  GetEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<GetEntityRequest>,
  output: __S(582, __c36, 6) as any as S.Schema<GetEntityResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntity",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetEntity",
}));

export type GetMetadataTransferJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a nmetadata transfer job.
 */
export const getMetadataTransferJob: API.OperationMethod<
  GetMetadataTransferJobRequest & RegionInput,
  GetMetadataTransferJobResponse,
  GetMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<GetMetadataTransferJobRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<GetMetadataTransferJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetadataTransferJob",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetMetadataTransferJob",
}));

export type GetPricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the pricing plan.
 */
export const getPricingPlan: API.OperationMethod<
  GetPricingPlanRequest & RegionInput,
  GetPricingPlanResponse,
  GetPricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<GetPricingPlanRequest>,
  output: __S(642, __c40, 2) as any as S.Schema<GetPricingPlanResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPricingPlan",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetPricingPlan",
}));

export type GetPropertyValueError =
  | AccessDeniedException
  | ConnectorFailureException
  | ConnectorTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the property values for a component, component type, entity, or workspace.
 *
 * You must specify a value for either `componentName`,
 * `componentTypeId`, `entityId`, or `workspaceId`.
 */
export const getPropertyValue: API.PaginatedOperationMethod<
  GetPropertyValueRequest & RegionInput,
  GetPropertyValueResponse,
  GetPropertyValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(659, __c41, 3) as any as S.Schema<GetPropertyValueRequest>,
  output: __S(665, __c41, 9) as any as S.Schema<GetPropertyValueResponse>,
  errors: [
    AccessDeniedException,
    ConnectorFailureException,
    ConnectorTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertyValue",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetPropertyValue",
})) as any;

export type GetPropertyValueHistoryError =
  | AccessDeniedException
  | ConnectorFailureException
  | ConnectorTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the history of a time series property value for a component,
 * component type, entity, or workspace.
 *
 * You must specify a value for `workspaceId`. For entity-specific queries,
 * specify values for `componentName` and `entityId`. For cross-entity
 * quries, specify a value for `componentTypeId`.
 */
export const getPropertyValueHistory: API.PaginatedOperationMethod<
  GetPropertyValueHistoryRequest & RegionInput,
  GetPropertyValueHistoryResponse,
  GetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(689, __c43, 1) as any as S.Schema<GetPropertyValueHistoryRequest>,
  output: __S(692, __c43, 4) as any as S.Schema<GetPropertyValueHistoryResponse>,
  errors: [
    AccessDeniedException,
    ConnectorFailureException,
    ConnectorTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertyValueHistory",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetPropertyValueHistory",
})) as any;

export type GetSceneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a scene.
 */
export const getScene: API.OperationMethod<
  GetSceneRequest & RegionInput,
  GetSceneResponse,
  GetSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetSceneRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<GetSceneResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScene",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetScene",
}));

export type GetSyncJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the SyncJob.
 */
export const getSyncJob: API.OperationMethod<
  GetSyncJobRequest & RegionInput,
  GetSyncJobResponse,
  GetSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<GetSyncJobRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetSyncJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSyncJob",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetSyncJob",
}));

export type GetWorkspaceError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a workspace.
 */
export const getWorkspace: API.OperationMethod<
  GetWorkspaceRequest & RegionInput,
  GetWorkspaceResponse,
  GetWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<GetWorkspaceRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<GetWorkspaceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkspace",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "GetWorkspace",
}));

export type ListComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API lists the components of an entity.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest & RegionInput,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<ListComponentsRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<ListComponentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListComponents",
})) as any;

export type ListComponentTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all component types in a workspace.
 */
export const listComponentTypes: API.PaginatedOperationMethod<
  ListComponentTypesRequest & RegionInput,
  ListComponentTypesResponse,
  ListComponentTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(770, __c48, 2) as any as S.Schema<ListComponentTypesRequest>,
  output: __S(773, __c48, 5) as any as S.Schema<ListComponentTypesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentTypes",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListComponentTypes",
})) as any;

export type ListEntitiesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all entities in a workspace.
 */
export const listEntities: API.PaginatedOperationMethod<
  ListEntitiesRequest & RegionInput,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(786, __c49, 2) as any as S.Schema<ListEntitiesRequest>,
  output: __S(789, __c49, 5) as any as S.Schema<ListEntitiesResponse>,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntities",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEntities",
})) as any;

export type ListMetadataTransferJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the metadata transfer jobs.
 */
export const listMetadataTransferJobs: API.PaginatedOperationMethod<
  ListMetadataTransferJobsRequest & RegionInput,
  ListMetadataTransferJobsResponse,
  ListMetadataTransferJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(802, __c50, 2) as any as S.Schema<ListMetadataTransferJobsRequest>,
  output: __S(805, __c50, 5) as any as S.Schema<ListMetadataTransferJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetadataTransferJobs",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMetadataTransferJobs",
})) as any;

export type ListPropertiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API lists the properties of a component.
 */
export const listProperties: API.PaginatedOperationMethod<
  ListPropertiesRequest & RegionInput,
  ListPropertiesResponse,
  ListPropertiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<ListPropertiesRequest>,
  output: __S(819, __c51, 3) as any as S.Schema<ListPropertiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProperties",
})) as any;

export type ListScenesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all scenes in a workspace.
 */
export const listScenes: API.PaginatedOperationMethod<
  ListScenesRequest & RegionInput,
  ListScenesResponse,
  ListScenesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<ListScenesRequest>,
  output: __S(835, __c52, 3) as any as S.Schema<ListScenesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScenes",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListScenes",
})) as any;

export type ListSyncJobsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all SyncJobs.
 */
export const listSyncJobs: API.PaginatedOperationMethod<
  ListSyncJobsRequest & RegionInput,
  ListSyncJobsResponse,
  ListSyncJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<ListSyncJobsRequest>,
  output: __S(851, __c53, 3) as any as S.Schema<ListSyncJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyncJobs",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSyncJobs",
})) as any;

export type ListSyncResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the sync resources.
 */
export const listSyncResources: API.PaginatedOperationMethod<
  ListSyncResourcesRequest & RegionInput,
  ListSyncResourcesResponse,
  ListSyncResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(866, __c54, 2) as any as S.Schema<ListSyncResourcesRequest>,
  output: __S(869, __c54, 5) as any as S.Schema<ListSyncResourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyncResources",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSyncResources",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(881, __c55, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListWorkspacesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about workspaces in the current account.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest & RegionInput,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<ListWorkspacesRequest>,
  output: __S(899, __c56, 3) as any as S.Schema<ListWorkspacesResponse>,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListWorkspaces",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<TagResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateComponentTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information in a component type.
 */
export const updateComponentType: API.OperationMethod<
  UpdateComponentTypeRequest & RegionInput,
  UpdateComponentTypeResponse,
  UpdateComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<UpdateComponentTypeRequest>,
  output: __S(945, __c59, 1) as any as S.Schema<UpdateComponentTypeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponentType",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "UpdateComponentType",
}));

export type UpdateEntityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an entity.
 */
export const updateEntity: API.OperationMethod<
  UpdateEntityRequest & RegionInput,
  UpdateEntityResponse,
  UpdateEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(965, __c60, 5) as any as S.Schema<UpdateEntityRequest>,
  output: __S(966, __c60, 6) as any as S.Schema<UpdateEntityResponse>,
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
  operationName: "UpdateEntity",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "UpdateEntity",
}));

export type UpdatePricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the pricing plan.
 */
export const updatePricingPlan: API.OperationMethod<
  UpdatePricingPlanRequest & RegionInput,
  UpdatePricingPlanResponse,
  UpdatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<UpdatePricingPlanRequest>,
  output: __S(642, __c40, 2) as any as S.Schema<UpdatePricingPlanResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePricingPlan",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "UpdatePricingPlan",
}));

export type UpdateSceneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a scene.
 */
export const updateScene: API.OperationMethod<
  UpdateSceneRequest & RegionInput,
  UpdateSceneResponse,
  UpdateSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<UpdateSceneRequest>,
  output: __S(1008, __c63, 0) as any as S.Schema<UpdateSceneResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScene",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "UpdateScene",
}));

export type UpdateWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a workspace.
 */
export const updateWorkspace: API.OperationMethod<
  UpdateWorkspaceRequest & RegionInput,
  UpdateWorkspaceResponse,
  UpdateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<UpdateWorkspaceRequest>,
  output: __S(1008, __c63, 0) as any as S.Schema<UpdateWorkspaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspace",
  endpointHostPrefix: "api.",
  telemetry: TELEMETRY,
  span: "UpdateWorkspace",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          entityPropertyReference: __S(48, __c3, 0),
          propertyValues: S.optional(__S(65, __c4, 1)),
        }),
      ).annotate({ identifier: "PropertyValueEntry" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entries: __S(1, __c0, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/entity-properties" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchPutPropertyValuesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ errorCode: S.String, errorMessage: S.String, entry: __S(0, __c0, 0) }),
      ).annotate({ identifier: "BatchPutPropertyError" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() => S.Struct({ errors: __S(4, __c0, 4) })).annotate({
        identifier: "BatchPutPropertyErrorEntry",
      });
    case 6:
      return S.Array(__S(5, __c0, 5));
    case 7:
      return S.suspend(() => S.Struct({ errorEntries: __S(6, __c0, 6) })).annotate({
        identifier: "BatchPutPropertyValuesResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<DataValue> => __S(35, __c2, 3)).annotate({
          identifier: "DataValue",
        }),
      );
    case 1:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend((): S.Schema<DataValue> => __S(35, __c2, 3))
          .annotate({ identifier: "DataValue" })
          .pipe(S.optional),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          targetEntityId: S.optional(S.String),
          targetComponentName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RelationshipValue" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          booleanValue: S.optional(S.Boolean),
          doubleValue: S.optional(S.Number),
          integerValue: S.optional(S.Number),
          longValue: S.optional(S.Number),
          stringValue: S.optional(S.String),
          listValue: S.optional(
            S.suspend(() => __S(32, __c2, 0)).annotate({ identifier: "DataValueList" }),
          ),
          mapValue: S.optional(
            S.suspend(() => __S(33, __c2, 1)).annotate({ identifier: "DataValueMap" }),
          ),
          relationshipValue: S.optional(__S(34, __c2, 2)),
          expression: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataValue" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentName: S.optional(S.String),
          componentPath: S.optional(S.String),
          externalIdProperty: S.optional(__S(16, __c1, 0)),
          entityId: S.optional(S.String),
          propertyName: S.String,
        }),
      ).annotate({ identifier: "EntityPropertyReference" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          value: __S(35, __c2, 3),
          time: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropertyValue" });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.String.pipe(T.HttpLabel("metadataTransferJobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/metadata-transfer-jobs/{metadataTransferJobId}/cancel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMetadataTransferJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.String,
          arn: S.String,
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: __S(112, __c7, 0),
          progress: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "CancelMetadataTransferJobResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetails" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          state: S.optional(S.String),
          error: S.optional(__S(96, __c6, 0)),
          queuedPosition: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetadataTransferJobStatus" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          totalCount: S.optional(S.Number),
          succeededCount: S.optional(S.Number),
          skippedCount: S.optional(S.Number),
          failedCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetadataTransferJobProgress" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          isSingleton: S.optional(S.Boolean),
          componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
          description: S.optional(S.String),
          propertyDefinitions: S.optional(__S(240, __c15, 0)),
          extendsFrom: S.optional(__S(160, __c10, 0)),
          functions: S.optional(__S(242, __c15, 2)),
          tags: S.optional(__S(16, __c1, 0)),
          propertyGroups: S.optional(__S(244, __c15, 4)),
          componentTypeName: S.optional(S.String),
          compositeComponentTypes: S.optional(__S(246, __c15, 6)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateComponentTypeRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetComponentTypeId: S.optional(S.String),
          relationshipType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Relationship" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          nestedType: S.optional(
            S.suspend((): S.Schema<DataType> => __S(177, __c11, 1)).annotate({
              identifier: "DataType",
            }),
          ),
          allowedValues: S.optional(
            S.suspend(() => __S(32, __c2, 0)).annotate({ identifier: "DataValueList" }),
          ),
          unitOfMeasure: S.optional(S.String),
          relationship: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "DataType" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataType: S.optional(__S(177, __c11, 1)),
          isRequiredInEntity: S.optional(S.Boolean),
          isExternalId: S.optional(S.Boolean),
          isStoredExternally: S.optional(S.Boolean),
          isTimeSeries: S.optional(S.Boolean),
          defaultValue: S.optional(__S(35, __c2, 3)),
          configuration: S.optional(__S(16, __c1, 0)),
          displayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropertyDefinitionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          state: S.String,
        }),
      ).annotate({ identifier: "CreateComponentTypeResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "LambdaFunction",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ lambda: S.optional(__S(224, __c14, 0)), isNative: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DataConnector" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(192, __c12, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          requiredProperties: S.optional(__S(160, __c10, 0)),
          scope: S.optional(S.String),
          implementedBy: S.optional(__S(225, __c14, 1)),
        }),
      ).annotate({ identifier: "FunctionRequest" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(241, __c15, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          groupType: S.optional(S.String),
          propertyNames: S.optional(__S(160, __c10, 0)),
        }),
      ).annotate({ identifier: "PropertyGroupRequest" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(243, __c15, 3).pipe(S.optional));
    case 5:
      return S.suspend(() => S.Struct({ componentTypeId: S.optional(S.String) })).annotate({
        identifier: "CompositeComponentTypeRequest",
      });
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(245, __c15, 5).pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          componentTypeId: S.optional(S.String),
          properties: S.optional(__S(273, __c17, 1)),
          propertyGroups: S.optional(__S(275, __c17, 3)),
        }),
      ).annotate({ identifier: "ComponentRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(256, __c16, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          properties: S.optional(__S(273, __c17, 1)),
          propertyGroups: S.optional(__S(275, __c17, 3)),
        }),
      ).annotate({ identifier: "CompositeComponentRequest" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(258, __c16, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entityId: S.optional(S.String),
          entityName: S.String,
          description: S.optional(S.String),
          components: S.optional(__S(257, __c16, 1)),
          compositeComponents: S.optional(__S(259, __c16, 3)),
          parentEntityId: S.optional(S.String),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/entities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEntityRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          entityId: S.String,
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          state: S.String,
        }),
      ).annotate({ identifier: "CreateEntityResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          definition: S.optional(__S(192, __c12, 0)),
          value: S.optional(__S(35, __c2, 3)),
          updateType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropertyRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(272, __c17, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          groupType: S.optional(S.String),
          propertyNames: S.optional(__S(160, __c10, 0)),
          updateType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentPropertyGroupRequest" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(274, __c17, 2).pipe(S.optional));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.optional(S.String),
          description: S.optional(S.String),
          sources: __S(316, __c19, 12),
          destination: __S(318, __c19, 14),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/metadata-transfer-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMetadataTransferJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.String,
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: __S(112, __c7, 0),
        }),
      ).annotate({ identifier: "CreateMetadataTransferJobResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ location: S.String })).annotate({
        identifier: "S3SourceConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assetModelId: S.optional(S.String),
          assetModelExternalId: S.optional(S.String),
          includeOffspring: S.optional(S.Boolean),
          includeAssets: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FilterByAssetModel" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          assetId: S.optional(S.String),
          assetExternalId: S.optional(S.String),
          includeOffspring: S.optional(S.Boolean),
          includeAssetModel: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FilterByAsset" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ filterByAssetModel: __S(305, __c19, 1) }),
        /*@__PURE__*/ S.Struct({ filterByAsset: __S(306, __c19, 2) }),
      ]);
    case 4:
      return S.Array(__S(307, __c19, 3));
    case 5:
      return S.suspend(() => S.Struct({ filters: S.optional(__S(308, __c19, 4)) })).annotate({
        identifier: "IotSiteWiseSourceConfiguration",
      });
    case 6:
      return S.suspend(() => S.Struct({ componentTypeId: S.String })).annotate({
        identifier: "FilterByComponentType",
      });
    case 7:
      return S.suspend(() => S.Struct({ entityId: S.String })).annotate({
        identifier: "FilterByEntity",
      });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ filterByComponentType: __S(310, __c19, 6) }),
        /*@__PURE__*/ S.Struct({ filterByEntity: __S(311, __c19, 7) }),
      ]);
    case 9:
      return S.Array(__S(312, __c19, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ workspace: S.String, filters: S.optional(__S(313, __c19, 9)) }),
      ).annotate({ identifier: "IotTwinMakerSourceConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          s3Configuration: S.optional(__S(304, __c19, 0)),
          iotSiteWiseConfiguration: S.optional(__S(309, __c19, 5)),
          iotTwinMakerConfiguration: S.optional(__S(314, __c19, 10)),
        }),
      ).annotate({ identifier: "SourceConfiguration" });
    case 12:
      return S.Array(__S(315, __c19, 11));
    case 13:
      return S.suspend(() => S.Struct({ workspace: S.String })).annotate({
        identifier: "IotTwinMakerDestinationConfiguration",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          s3Configuration: S.optional(__S(304, __c19, 0)),
          iotTwinMakerConfiguration: S.optional(__S(317, __c19, 13)),
        }),
      ).annotate({ identifier: "DestinationConfiguration" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          sceneId: S.String,
          contentLocation: S.String,
          description: S.optional(S.String),
          capabilities: S.optional(__S(160, __c10, 0)),
          tags: S.optional(__S(16, __c1, 0)),
          sceneMetadata: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/scenes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSceneRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateSceneResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          syncSource: S.String.pipe(T.HttpLabel("syncSource")),
          syncRole: S.String,
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSyncJobRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          description: S.optional(S.String),
          s3Location: S.optional(S.String),
          role: S.optional(S.String),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkspaceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteComponentTypeRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ state: S.String })).annotate({
        identifier: "DeleteComponentTypeResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entityId: S.String.pipe(T.HttpLabel("entityId")),
          isRecursive: S.optional(S.Boolean).pipe(T.HttpQuery("isRecursive")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/entities/{entityId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEntityRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          sceneId: S.String.pipe(T.HttpLabel("sceneId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/scenes/{sceneId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSceneRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteSceneResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          syncSource: S.String.pipe(T.HttpLabel("syncSource")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSyncJobRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkspaceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ message: S.optional(S.String) })).annotate({
        identifier: "DeleteWorkspaceResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          queryStatement: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/queries/execution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExecuteQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "ColumnDescription" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.Array(S.Any);
    case 4:
      return S.suspend(() => S.Struct({ rowData: S.optional(__S(499, __c31, 3)) })).annotate({
        identifier: "Row",
      });
    case 5:
      return S.Array(__S(500, __c31, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          columnDescriptions: S.optional(__S(498, __c31, 2)),
          rows: S.optional(__S(501, __c31, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExecuteQueryResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetComponentTypeRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(560, __c35, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          requiredProperties: S.optional(__S(160, __c10, 0)),
          scope: S.optional(S.String),
          implementedBy: S.optional(__S(225, __c14, 1)),
          isInherited: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FunctionResponse" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(514, __c32, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({ componentTypeId: S.optional(S.String), isInherited: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CompositeComponentTypeResponse" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(516, __c32, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          isSingleton: S.optional(S.Boolean),
          componentTypeId: S.String,
          description: S.optional(S.String),
          propertyDefinitions: S.optional(__S(513, __c32, 1)),
          extendsFrom: S.optional(__S(160, __c10, 0)),
          functions: S.optional(__S(515, __c32, 3)),
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          arn: S.String,
          isAbstract: S.optional(S.Boolean),
          isSchemaInitialized: S.optional(S.Boolean),
          status: S.optional(__S(528, __c33, 0)),
          propertyGroups: S.optional(__S(545, __c34, 1)),
          syncSource: S.optional(S.String),
          componentTypeName: S.optional(S.String),
          compositeComponentTypes: S.optional(__S(517, __c32, 5)),
        }),
      ).annotate({ identifier: "GetComponentTypeResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ state: S.optional(S.String), error: S.optional(__S(96, __c6, 0)) }),
      ).annotate({ identifier: "Status" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          groupType: S.String,
          propertyNames: __S(160, __c10, 0),
          isInherited: S.Boolean,
        }),
      ).annotate({ identifier: "PropertyGroupResponse" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(544, __c34, 0).pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataType: __S(177, __c11, 1),
          isTimeSeries: S.Boolean,
          isRequiredInEntity: S.Boolean,
          isExternalId: S.Boolean,
          isStoredExternally: S.Boolean,
          isImported: S.Boolean,
          isFinal: S.Boolean,
          isInherited: S.Boolean,
          defaultValue: S.optional(__S(35, __c2, 3)),
          configuration: S.optional(__S(16, __c1, 0)),
          displayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropertyDefinitionResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entityId: S.String.pipe(T.HttpLabel("entityId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/entities/{entityId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEntityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          definition: S.optional(__S(560, __c35, 0)),
          value: S.optional(__S(35, __c2, 3)),
          areAllPropertyValuesReturned: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PropertyResponse" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(577, __c36, 1).pipe(S.optional));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(592, __c37, 0).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          componentName: S.optional(S.String),
          description: S.optional(S.String),
          componentTypeId: S.optional(S.String),
          status: S.optional(__S(528, __c33, 0)),
          definedIn: S.optional(S.String),
          properties: S.optional(__S(578, __c36, 2)),
          propertyGroups: S.optional(__S(545, __c34, 1)),
          syncSource: S.optional(S.String),
          areAllPropertiesReturned: S.optional(S.Boolean),
          compositeComponents: S.optional(__S(579, __c36, 3)),
          areAllCompositeComponentsReturned: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ComponentResponse" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(580, __c36, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          entityId: S.String,
          entityName: S.String,
          arn: S.String,
          status: __S(528, __c33, 0),
          workspaceId: S.String,
          description: S.optional(S.String),
          components: S.optional(__S(581, __c36, 5)),
          parentEntityId: S.String,
          hasChildEntities: S.Boolean,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          syncSource: S.optional(S.String),
          areAllComponentsReturned: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetEntityResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentName: S.String,
          componentTypeId: S.String,
          definedIn: S.optional(S.String),
          description: S.optional(S.String),
          propertyGroups: S.optional(__S(545, __c34, 1)),
          status: __S(528, __c33, 0),
          syncSource: S.optional(S.String),
          componentPath: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentSummary" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.String.pipe(T.HttpLabel("metadataTransferJobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/metadata-transfer-jobs/{metadataTransferJobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMetadataTransferJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.String,
          arn: S.String,
          description: S.optional(S.String),
          sources: __S(316, __c19, 12),
          destination: __S(318, __c19, 14),
          metadataTransferJobRole: S.String,
          reportUrl: S.optional(S.String),
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: __S(112, __c7, 0),
          progress: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "GetMetadataTransferJobResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/pricingplan" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPricingPlanRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bundleNames: __S(160, __c10, 0), pricingTier: S.optional(S.String) }),
      ).annotate({ identifier: "BundleInformation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billableEntityCount: S.optional(S.Number),
          bundleInformation: S.optional(__S(640, __c40, 0)),
          effectiveDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          pricingMode: S.String,
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateReason: S.String,
        }),
      ).annotate({ identifier: "PricingPlan" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          currentPricingPlan: __S(641, __c40, 1),
          pendingPricingPlan: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "GetPricingPlanResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ order: S.optional(S.String), propertyName: S.String }),
      ).annotate({ identifier: "OrderBy" });
    case 1:
      return S.Array(__S(656, __c41, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          orderBy: S.optional(__S(657, __c41, 1)),
          propertyFilters: S.optional(__S(673, __c42, 1)),
        }),
      ).annotate({ identifier: "TabularConditions" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          componentName: S.optional(S.String),
          componentPath: S.optional(S.String),
          componentTypeId: S.optional(S.String),
          entityId: S.optional(S.String),
          selectedProperties: __S(160, __c10, 0),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          propertyGroupName: S.optional(S.String),
          tabularConditions: S.optional(__S(658, __c41, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/entity-properties/value" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPropertyValueRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          propertyReference: __S(48, __c3, 0),
          propertyValue: S.optional(__S(35, __c2, 3)),
        }),
      ).annotate({ identifier: "PropertyLatestValue" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(660, __c41, 4).pipe(S.optional));
    case 6:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend((): S.Schema<DataValue> => __S(35, __c2, 3))
          .annotate({ identifier: "DataValue" })
          .pipe(S.optional),
      );
    case 7:
      return S.Array(__S(662, __c41, 6));
    case 8:
      return S.Array(__S(663, __c41, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          propertyValues: S.optional(__S(661, __c41, 5)),
          nextToken: S.optional(S.String),
          tabularPropertyValues: S.optional(__S(664, __c41, 8)),
        }),
      ).annotate({ identifier: "GetPropertyValueResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          propertyName: S.optional(S.String),
          operator: S.optional(S.String),
          value: S.optional(__S(35, __c2, 3)),
        }),
      ).annotate({ identifier: "PropertyFilter" });
    case 1:
      return S.Array(__S(672, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          interpolationType: S.optional(S.String),
          intervalInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InterpolationParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entityId: S.optional(S.String),
          componentName: S.optional(S.String),
          componentPath: S.optional(S.String),
          componentTypeId: S.optional(S.String),
          selectedProperties: __S(160, __c10, 0),
          propertyFilters: S.optional(__S(673, __c42, 1)),
          startDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          interpolation: S.optional(__S(688, __c43, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          orderByTime: S.optional(S.String),
          startTime: S.optional(S.String),
          endTime: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/entity-properties/history" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPropertyValueHistoryRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          entityPropertyReference: __S(48, __c3, 0),
          values: S.optional(__S(65, __c4, 1)),
        }),
      ).annotate({ identifier: "PropertyValueHistory" });
    case 3:
      return S.Array(__S(690, __c43, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ propertyValues: __S(691, __c43, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetPropertyValueHistoryResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          sceneId: S.String.pipe(T.HttpLabel("sceneId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/scenes/{sceneId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSceneRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          sceneId: S.String,
          contentLocation: S.String,
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(S.String),
          capabilities: S.optional(__S(160, __c10, 0)),
          sceneMetadata: S.optional(__S(16, __c1, 0)),
          generatedSceneMetadata: S.optional(__S(16, __c1, 0)),
          error: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "GetSceneResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          syncSource: S.String.pipe(T.HttpLabel("syncSource")),
          workspaceId: S.optional(S.String).pipe(T.HttpQuery("workspace")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sync-jobs/{syncSource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSyncJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          workspaceId: S.String,
          syncSource: S.String,
          syncRole: S.String,
          status: __S(528, __c33, 0),
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetSyncJobResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkspaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          arn: S.String,
          description: S.optional(S.String),
          linkedServices: S.optional(__S(160, __c10, 0)),
          s3Location: S.optional(S.String),
          role: S.optional(S.String),
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetWorkspaceResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entityId: S.String.pipe(T.HttpLabel("entityId")),
          componentPath: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workspaces/{workspaceId}/entities/{entityId}/components-list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComponentsRequest" });
    case 1:
      return S.Array(__S(592, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ componentSummaries: __S(753, __c47, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListComponentsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ extendsFrom: S.String }),
        /*@__PURE__*/ S.Struct({ namespace: S.String }),
        /*@__PURE__*/ S.Struct({ isAbstract: S.Boolean }),
      ]);
    case 1:
      return S.Array(__S(768, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          filters: S.optional(__S(769, __c48, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/component-types-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComponentTypesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          componentTypeId: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(S.String),
          status: S.optional(__S(528, __c33, 0)),
          componentTypeName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentTypeSummary" });
    case 4:
      return S.Array(__S(771, __c48, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          componentTypeSummaries: __S(772, __c48, 4),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ListComponentTypesResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ parentEntityId: S.String }),
        /*@__PURE__*/ S.Struct({ componentTypeId: S.String }),
        /*@__PURE__*/ S.Struct({ externalId: S.String }),
      ]);
    case 1:
      return S.Array(__S(784, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          filters: S.optional(__S(785, __c49, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/entities-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEntitiesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          entityId: S.String,
          entityName: S.String,
          arn: S.String,
          parentEntityId: S.optional(S.String),
          status: __S(528, __c33, 0),
          description: S.optional(S.String),
          hasChildEntities: S.optional(S.Boolean),
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "EntitySummary" });
    case 4:
      return S.Array(__S(787, __c49, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          entitySummaries: S.optional(__S(788, __c49, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEntitiesResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ workspaceId: S.String }),
        /*@__PURE__*/ S.Struct({ state: S.String }),
      ]);
    case 1:
      return S.Array(__S(800, __c50, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          sourceType: S.String,
          destinationType: S.String,
          filters: S.optional(__S(801, __c50, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/metadata-transfer-jobs-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMetadataTransferJobsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobId: S.String,
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: __S(112, __c7, 0),
          progress: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "MetadataTransferJobSummary" });
    case 4:
      return S.Array(__S(803, __c50, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          metadataTransferJobSummaries: __S(804, __c50, 4),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMetadataTransferJobsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          componentName: S.optional(S.String),
          componentPath: S.optional(S.String),
          entityId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/properties-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPropertiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          definition: S.optional(__S(560, __c35, 0)),
          propertyName: S.String,
          value: S.optional(__S(35, __c2, 3)),
          areAllPropertyValuesReturned: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PropertySummary" });
    case 2:
      return S.Array(__S(817, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ propertySummaries: __S(818, __c51, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPropertiesResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/scenes-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListScenesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sceneId: S.String,
          contentLocation: S.String,
          arn: S.String,
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "SceneSummary" });
    case 2:
      return S.Array(__S(833, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sceneSummaries: S.optional(__S(834, __c52, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListScenesResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/sync-jobs-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSyncJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          workspaceId: S.optional(S.String),
          syncSource: S.optional(S.String),
          status: S.optional(__S(528, __c33, 0)),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SyncJobSummary" });
    case 2:
      return S.Array(__S(849, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          syncJobSummaries: S.optional(__S(850, __c53, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSyncJobsResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ state: S.String }),
        /*@__PURE__*/ S.Struct({ resourceType: S.String }),
        /*@__PURE__*/ S.Struct({ resourceId: S.String }),
        /*@__PURE__*/ S.Struct({ externalId: S.String }),
      ]);
    case 1:
      return S.Array(__S(864, __c54, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          syncSource: S.String.pipe(T.HttpLabel("syncSource")),
          filters: S.optional(__S(865, __c54, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}/resources-list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSyncResourcesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          externalId: S.optional(S.String),
          resourceId: S.optional(S.String),
          status: S.optional(__S(528, __c33, 0)),
          updateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SyncResourceSummary" });
    case 4:
      return S.Array(__S(867, __c54, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          syncResources: S.optional(__S(868, __c54, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSyncResourcesResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/tags-list" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(16, __c1, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/workspaces-list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWorkspacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          arn: S.String,
          description: S.optional(S.String),
          linkedServices: S.optional(__S(160, __c10, 0)),
          creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "WorkspaceSummary" });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workspaceSummaries: S.optional(__S(898, __c56, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkspacesResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tags: __S(16, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String.pipe(T.HttpQuery("resourceARN")),
          tagKeys: __S(160, __c10, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(T.all(T.Http({ method: "DELETE", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          isSingleton: S.optional(S.Boolean),
          componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
          description: S.optional(S.String),
          propertyDefinitions: S.optional(__S(240, __c15, 0)),
          extendsFrom: S.optional(__S(160, __c10, 0)),
          functions: S.optional(__S(242, __c15, 2)),
          propertyGroups: S.optional(__S(244, __c15, 4)),
          componentTypeName: S.optional(S.String),
          compositeComponentTypes: S.optional(__S(246, __c15, 6)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateComponentTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          arn: S.String,
          componentTypeId: S.String,
          state: S.String,
        }),
      ).annotate({ identifier: "UpdateComponentTypeResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          updateType: S.optional(S.String),
          description: S.optional(S.String),
          componentTypeId: S.optional(S.String),
          propertyUpdates: S.optional(__S(273, __c17, 1)),
          propertyGroupUpdates: S.optional(__S(275, __c17, 3)),
        }),
      ).annotate({ identifier: "ComponentUpdateRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(960, __c60, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          updateType: S.optional(S.String),
          description: S.optional(S.String),
          propertyUpdates: S.optional(__S(273, __c17, 1)),
          propertyGroupUpdates: S.optional(__S(275, __c17, 3)),
        }),
      ).annotate({ identifier: "CompositeComponentUpdateRequest" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(962, __c60, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({ updateType: S.String, parentEntityId: S.optional(S.String) }),
      ).annotate({ identifier: "ParentEntityUpdateRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          entityId: S.String.pipe(T.HttpLabel("entityId")),
          entityName: S.optional(S.String),
          description: S.optional(S.String),
          componentUpdates: S.optional(__S(961, __c60, 1)),
          compositeComponentUpdates: S.optional(__S(963, __c60, 3)),
          parentEntityUpdate: S.optional(__S(964, __c60, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/entities/{entityId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEntityRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          state: S.String,
        }),
      ).annotate({ identifier: "UpdateEntityResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pricingMode: S.String, bundleNames: S.optional(__S(160, __c10, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/pricingplan" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePricingPlanRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          sceneId: S.String.pipe(T.HttpLabel("sceneId")),
          contentLocation: S.optional(S.String),
          description: S.optional(S.String),
          capabilities: S.optional(__S(160, __c10, 0)),
          sceneMetadata: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/scenes/{sceneId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSceneRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
      ).annotate({ identifier: "UpdateSceneResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          description: S.optional(S.String),
          role: S.optional(S.String),
          s3Location: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkspaceRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
