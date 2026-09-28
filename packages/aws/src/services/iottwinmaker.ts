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
  sdkId: "IoTTwinMaker",
  target: "AWSIoTTwinMaker",
  version: "2021-11-29",
  sigv4: "iottwinmaker",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iottwinmaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://iottwinmaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConnectorFailureException
  extends /*@__PURE__*/ TE.TaggedError("ConnectorFailureException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class ConnectorTimeoutException
  extends /*@__PURE__*/ TE.TaggedError("ConnectorTimeoutException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class QueryTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryTimeoutException",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
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
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Id = string;
export type Name = string;
export type ComponentPath = string;
export type ExternalIdProperty = { [key: string]: string | undefined };
export type EntityId = string;
export interface EntityPropertyReference {
  componentName?: string;
  componentPath?: string;
  externalIdProperty?: { [key: string]: string | undefined };
  entityId?: string;
  propertyName: string;
}
export type DataValueList = DataValue[];
export type DataValueMap = { [key: string]: DataValue | undefined };
export interface RelationshipValue {
  targetEntityId?: string;
  targetComponentName?: string;
}
export type Expression = string;
export interface DataValue {
  booleanValue?: boolean;
  doubleValue?: number;
  integerValue?: number;
  longValue?: number;
  stringValue?: string;
  listValue?: DataValue[];
  mapValue?: { [key: string]: DataValue | undefined };
  relationshipValue?: RelationshipValue;
  expression?: string;
}
export interface PropertyValue {
  timestamp?: Date;
  value: DataValue;
  time?: string;
}
export type PropertyValues = PropertyValue[];
export interface PropertyValueEntry {
  entityPropertyReference: EntityPropertyReference;
  propertyValues?: PropertyValue[];
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
  code?: string;
  message?: string;
}
export interface MetadataTransferJobStatus {
  state?: string;
  error?: ErrorDetails;
  queuedPosition?: number;
}
export interface MetadataTransferJobProgress {
  totalCount?: number;
  succeededCount?: number;
  skippedCount?: number;
  failedCount?: number;
}
export interface CancelMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export type ComponentTypeId = string;
export type Description = string;
export type Type = string;
export interface Relationship {
  targetComponentTypeId?: string;
  relationshipType?: string;
}
export interface DataType {
  type: string;
  nestedType?: DataType;
  allowedValues?: DataValue[];
  unitOfMeasure?: string;
  relationship?: Relationship;
}
export type Value = string;
export type Configuration = { [key: string]: string | undefined };
export type PropertyDisplayName = string;
export interface PropertyDefinitionRequest {
  dataType?: DataType;
  isRequiredInEntity?: boolean;
  isExternalId?: boolean;
  isStoredExternally?: boolean;
  isTimeSeries?: boolean;
  defaultValue?: DataValue;
  configuration?: { [key: string]: string | undefined };
  displayName?: string;
}
export type PropertyDefinitionsRequest = {
  [key: string]: PropertyDefinitionRequest | undefined;
};
export type ExtendsFrom = string[];
export type RequiredProperties = string[];
export type Scope = string;
export type LambdaArn = string;
export interface LambdaFunction {
  arn: string;
}
export interface DataConnector {
  lambda?: LambdaFunction;
  isNative?: boolean;
}
export interface FunctionRequest {
  requiredProperties?: string[];
  scope?: string;
  implementedBy?: DataConnector;
}
export type FunctionsRequest = { [key: string]: FunctionRequest | undefined };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type GroupType = string;
export type PropertyNames = string[];
export interface PropertyGroupRequest {
  groupType?: string;
  propertyNames?: string[];
}
export type PropertyGroupsRequest = {
  [key: string]: PropertyGroupRequest | undefined;
};
export type ComponentTypeName = string;
export interface CompositeComponentTypeRequest {
  componentTypeId?: string;
}
export type CompositeComponentTypesRequest = {
  [key: string]: CompositeComponentTypeRequest | undefined;
};
export interface CreateComponentTypeRequest {
  workspaceId: string;
  isSingleton?: boolean;
  componentTypeId: string;
  description?: string;
  propertyDefinitions?: {
    [key: string]: PropertyDefinitionRequest | undefined;
  };
  extendsFrom?: string[];
  functions?: { [key: string]: FunctionRequest | undefined };
  tags?: { [key: string]: string | undefined };
  propertyGroups?: { [key: string]: PropertyGroupRequest | undefined };
  componentTypeName?: string;
  compositeComponentTypes?: {
    [key: string]: CompositeComponentTypeRequest | undefined;
  };
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
  definition?: PropertyDefinitionRequest;
  value?: DataValue;
  updateType?: string;
}
export type PropertyRequests = { [key: string]: PropertyRequest | undefined };
export type PropertyGroupUpdateType = string;
export interface ComponentPropertyGroupRequest {
  groupType?: string;
  propertyNames?: string[];
  updateType?: string;
}
export type ComponentPropertyGroupRequests = {
  [key: string]: ComponentPropertyGroupRequest | undefined;
};
export interface ComponentRequest {
  description?: string;
  componentTypeId?: string;
  properties?: { [key: string]: PropertyRequest | undefined };
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined };
}
export type ComponentsMapRequest = {
  [key: string]: ComponentRequest | undefined;
};
export interface CompositeComponentRequest {
  description?: string;
  properties?: { [key: string]: PropertyRequest | undefined };
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined };
}
export type CompositeComponentsMapRequest = {
  [key: string]: CompositeComponentRequest | undefined;
};
export type ParentEntityId = string;
export interface CreateEntityRequest {
  workspaceId: string;
  entityId?: string;
  entityName: string;
  description?: string;
  components?: { [key: string]: ComponentRequest | undefined };
  compositeComponents?: {
    [key: string]: CompositeComponentRequest | undefined;
  };
  parentEntityId?: string;
  tags?: { [key: string]: string | undefined };
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
  assetModelId?: string;
  assetModelExternalId?: string;
  includeOffspring?: boolean;
  includeAssets?: boolean;
}
export interface FilterByAsset {
  assetId?: string;
  assetExternalId?: string;
  includeOffspring?: boolean;
  includeAssetModel?: boolean;
}
export type IotSiteWiseSourceConfigurationFilter =
  | { filterByAssetModel: FilterByAssetModel; filterByAsset?: never }
  | { filterByAssetModel?: never; filterByAsset: FilterByAsset };
export type IotSiteWiseSourceConfigurationFilters =
  IotSiteWiseSourceConfigurationFilter[];
export interface IotSiteWiseSourceConfiguration {
  filters?: IotSiteWiseSourceConfigurationFilter[];
}
export interface FilterByComponentType {
  componentTypeId: string;
}
export interface FilterByEntity {
  entityId: string;
}
export type IotTwinMakerSourceConfigurationFilter =
  | { filterByComponentType: FilterByComponentType; filterByEntity?: never }
  | { filterByComponentType?: never; filterByEntity: FilterByEntity };
export type IotTwinMakerSourceConfigurationFilters =
  IotTwinMakerSourceConfigurationFilter[];
export interface IotTwinMakerSourceConfiguration {
  workspace: string;
  filters?: IotTwinMakerSourceConfigurationFilter[];
}
export interface SourceConfiguration {
  type: string;
  s3Configuration?: S3SourceConfiguration;
  iotSiteWiseConfiguration?: IotSiteWiseSourceConfiguration;
  iotTwinMakerConfiguration?: IotTwinMakerSourceConfiguration;
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
  s3Configuration?: S3DestinationConfiguration;
  iotTwinMakerConfiguration?: IotTwinMakerDestinationConfiguration;
}
export interface CreateMetadataTransferJobRequest {
  metadataTransferJobId?: string;
  description?: string;
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
  description?: string;
  capabilities?: string[];
  tags?: { [key: string]: string | undefined };
  sceneMetadata?: { [key: string]: string | undefined };
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
  tags?: { [key: string]: string | undefined };
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
  description?: string;
  s3Location?: string;
  role?: string;
  tags?: { [key: string]: string | undefined };
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
  isRecursive?: boolean;
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
  message?: string;
}
export type QueryStatement = string;
export type QueryServiceMaxResults = number;
export type NextToken = string;
export interface ExecuteQueryRequest {
  workspaceId: string;
  queryStatement: string;
  maxResults?: number;
  nextToken?: string;
}
export type ColumnName = string;
export type ColumnType = string;
export interface ColumnDescription {
  name?: string;
  type?: string;
}
export type ColumnDescriptions = ColumnDescription[];
export type QueryResultValue = unknown;
export type RowData = any[];
export interface Row {
  rowData?: any[];
}
export type Rows = Row[];
export interface ExecuteQueryResponse {
  columnDescriptions?: ColumnDescription[];
  rows?: Row[];
  nextToken?: string;
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
  defaultValue?: DataValue;
  configuration?: { [key: string]: string | undefined };
  displayName?: string;
}
export type PropertyDefinitionsResponse = {
  [key: string]: PropertyDefinitionResponse | undefined;
};
export interface FunctionResponse {
  requiredProperties?: string[];
  scope?: string;
  implementedBy?: DataConnector;
  isInherited?: boolean;
}
export type FunctionsResponse = { [key: string]: FunctionResponse | undefined };
export interface Status {
  state?: string;
  error?: ErrorDetails;
}
export interface PropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export type PropertyGroupsResponse = {
  [key: string]: PropertyGroupResponse | undefined;
};
export interface CompositeComponentTypeResponse {
  componentTypeId?: string;
  isInherited?: boolean;
}
export type CompositeComponentTypesResponse = {
  [key: string]: CompositeComponentTypeResponse | undefined;
};
export interface GetComponentTypeResponse {
  workspaceId: string;
  isSingleton?: boolean;
  componentTypeId: string;
  description?: string;
  propertyDefinitions?: {
    [key: string]: PropertyDefinitionResponse | undefined;
  };
  extendsFrom?: string[];
  functions?: { [key: string]: FunctionResponse | undefined };
  creationDateTime: Date;
  updateDateTime: Date;
  arn: string;
  isAbstract?: boolean;
  isSchemaInitialized?: boolean;
  status?: Status;
  propertyGroups?: { [key: string]: PropertyGroupResponse | undefined };
  syncSource?: string;
  componentTypeName?: string;
  compositeComponentTypes?: {
    [key: string]: CompositeComponentTypeResponse | undefined;
  };
}
export interface GetEntityRequest {
  workspaceId: string;
  entityId: string;
}
export interface PropertyResponse {
  definition?: PropertyDefinitionResponse;
  value?: DataValue;
  areAllPropertyValuesReturned?: boolean;
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
  definedIn?: string;
  description?: string;
  propertyGroups?: {
    [key: string]: ComponentPropertyGroupResponse | undefined;
  };
  status: Status;
  syncSource?: string;
  componentPath?: string;
}
export type CompositeComponentResponse = {
  [key: string]: ComponentSummary | undefined;
};
export interface ComponentResponse {
  componentName?: string;
  description?: string;
  componentTypeId?: string;
  status?: Status;
  definedIn?: string;
  properties?: { [key: string]: PropertyResponse | undefined };
  propertyGroups?: {
    [key: string]: ComponentPropertyGroupResponse | undefined;
  };
  syncSource?: string;
  areAllPropertiesReturned?: boolean;
  compositeComponents?: { [key: string]: ComponentSummary | undefined };
  areAllCompositeComponentsReturned?: boolean;
}
export type ComponentsMap = { [key: string]: ComponentResponse | undefined };
export interface GetEntityResponse {
  entityId: string;
  entityName: string;
  arn: string;
  status: Status;
  workspaceId: string;
  description?: string;
  components?: { [key: string]: ComponentResponse | undefined };
  parentEntityId: string;
  hasChildEntities: boolean;
  creationDateTime: Date;
  updateDateTime: Date;
  syncSource?: string;
  areAllComponentsReturned?: boolean;
}
export interface GetMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export interface GetMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  description?: string;
  sources: SourceConfiguration[];
  destination: DestinationConfiguration;
  metadataTransferJobRole: string;
  reportUrl?: string;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export interface GetPricingPlanRequest {}
export type BundleName = string;
export type PricingBundles = string[];
export type PricingTier = string;
export interface BundleInformation {
  bundleNames: string[];
  pricingTier?: string;
}
export type PricingMode = string;
export type UpdateReason = string;
export interface PricingPlan {
  billableEntityCount?: number;
  bundleInformation?: BundleInformation;
  effectiveDateTime: Date;
  pricingMode: string;
  updateDateTime: Date;
  updateReason: string;
}
export interface GetPricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan;
}
export type SelectedPropertyList = string[];
export type MaxResults = number;
export type Order = string;
export interface OrderBy {
  order?: string;
  propertyName: string;
}
export type OrderByList = OrderBy[];
export interface PropertyFilter {
  propertyName?: string;
  operator?: string;
  value?: DataValue;
}
export type PropertyFilters = PropertyFilter[];
export interface TabularConditions {
  orderBy?: OrderBy[];
  propertyFilters?: PropertyFilter[];
}
export interface GetPropertyValueRequest {
  componentName?: string;
  componentPath?: string;
  componentTypeId?: string;
  entityId?: string;
  selectedProperties: string[];
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
  propertyGroupName?: string;
  tabularConditions?: TabularConditions;
}
export interface PropertyLatestValue {
  propertyReference: EntityPropertyReference;
  propertyValue?: DataValue;
}
export type PropertyLatestValueMap = {
  [key: string]: PropertyLatestValue | undefined;
};
export type PropertyTableValue = { [key: string]: DataValue | undefined };
export type TabularPropertyValue = { [key: string]: DataValue | undefined }[];
export type TabularPropertyValues = {
  [key: string]: DataValue | undefined;
}[][];
export interface GetPropertyValueResponse {
  propertyValues?: { [key: string]: PropertyLatestValue | undefined };
  nextToken?: string;
  tabularPropertyValues?: { [key: string]: DataValue | undefined }[][];
}
export type InterpolationType = string;
export type IntervalInSeconds = number;
export interface InterpolationParameters {
  interpolationType?: string;
  intervalInSeconds?: number;
}
export type OrderByTime = string;
export interface GetPropertyValueHistoryRequest {
  workspaceId: string;
  entityId?: string;
  componentName?: string;
  componentPath?: string;
  componentTypeId?: string;
  selectedProperties: string[];
  propertyFilters?: PropertyFilter[];
  startDateTime?: Date;
  endDateTime?: Date;
  interpolation?: InterpolationParameters;
  nextToken?: string;
  maxResults?: number;
  orderByTime?: string;
  startTime?: string;
  endTime?: string;
}
export type Values = PropertyValue[];
export interface PropertyValueHistory {
  entityPropertyReference: EntityPropertyReference;
  values?: PropertyValue[];
}
export type PropertyValueList = PropertyValueHistory[];
export interface GetPropertyValueHistoryResponse {
  propertyValues: PropertyValueHistory[];
  nextToken?: string;
}
export interface GetSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export type GeneratedSceneMetadataMap = { [key: string]: string | undefined };
export type SceneErrorCode = string;
export interface SceneError {
  code?: string;
  message?: string;
}
export interface GetSceneResponse {
  workspaceId: string;
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
  capabilities?: string[];
  sceneMetadata?: { [key: string]: string | undefined };
  generatedSceneMetadata?: { [key: string]: string | undefined };
  error?: SceneError;
}
export interface GetSyncJobRequest {
  syncSource: string;
  workspaceId?: string;
}
export interface SyncJobStatus {
  state?: string;
  error?: ErrorDetails;
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
  description?: string;
  linkedServices?: string[];
  s3Location?: string;
  role?: string;
  creationDateTime: Date;
  updateDateTime: Date;
}
export interface ListComponentsRequest {
  workspaceId: string;
  entityId: string;
  componentPath?: string;
  maxResults?: number;
  nextToken?: string;
}
export type ComponentSummaries = ComponentSummary[];
export interface ListComponentsResponse {
  componentSummaries: ComponentSummary[];
  nextToken?: string;
}
export type ListComponentTypesFilter =
  | { extendsFrom: string; namespace?: never; isAbstract?: never }
  | { extendsFrom?: never; namespace: string; isAbstract?: never }
  | { extendsFrom?: never; namespace?: never; isAbstract: boolean };
export type ListComponentTypesFilters = ListComponentTypesFilter[];
export interface ListComponentTypesRequest {
  workspaceId: string;
  filters?: ListComponentTypesFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface ComponentTypeSummary {
  arn: string;
  componentTypeId: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
  status?: Status;
  componentTypeName?: string;
}
export type ComponentTypeSummaries = ComponentTypeSummary[];
export interface ListComponentTypesResponse {
  workspaceId: string;
  componentTypeSummaries: ComponentTypeSummary[];
  nextToken?: string;
  maxResults?: number;
}
export type ListEntitiesFilter =
  | { parentEntityId: string; componentTypeId?: never; externalId?: never }
  | { parentEntityId?: never; componentTypeId: string; externalId?: never }
  | { parentEntityId?: never; componentTypeId?: never; externalId: string };
export type ListEntitiesFilters = ListEntitiesFilter[];
export interface ListEntitiesRequest {
  workspaceId: string;
  filters?: ListEntitiesFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface EntitySummary {
  entityId: string;
  entityName: string;
  arn: string;
  parentEntityId?: string;
  status: Status;
  description?: string;
  hasChildEntities?: boolean;
  creationDateTime: Date;
  updateDateTime: Date;
}
export type EntitySummaries = EntitySummary[];
export interface ListEntitiesResponse {
  entitySummaries?: EntitySummary[];
  nextToken?: string;
}
export type ListMetadataTransferJobsFilter =
  | { workspaceId: string; state?: never }
  | { workspaceId?: never; state: string };
export type ListMetadataTransferJobsFilters = ListMetadataTransferJobsFilter[];
export interface ListMetadataTransferJobsRequest {
  sourceType: string;
  destinationType: string;
  filters?: ListMetadataTransferJobsFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface MetadataTransferJobSummary {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export type MetadataTransferJobSummaries = MetadataTransferJobSummary[];
export interface ListMetadataTransferJobsResponse {
  metadataTransferJobSummaries: MetadataTransferJobSummary[];
  nextToken?: string;
}
export interface ListPropertiesRequest {
  workspaceId: string;
  componentName?: string;
  componentPath?: string;
  entityId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface PropertySummary {
  definition?: PropertyDefinitionResponse;
  propertyName: string;
  value?: DataValue;
  areAllPropertyValuesReturned?: boolean;
}
export type PropertySummaries = PropertySummary[];
export interface ListPropertiesResponse {
  propertySummaries: PropertySummary[];
  nextToken?: string;
}
export interface ListScenesRequest {
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface SceneSummary {
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
}
export type SceneSummaries = SceneSummary[];
export interface ListScenesResponse {
  sceneSummaries?: SceneSummary[];
  nextToken?: string;
}
export interface ListSyncJobsRequest {
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface SyncJobSummary {
  arn?: string;
  workspaceId?: string;
  syncSource?: string;
  status?: SyncJobStatus;
  creationDateTime?: Date;
  updateDateTime?: Date;
}
export type SyncJobSummaries = SyncJobSummary[];
export interface ListSyncJobsResponse {
  syncJobSummaries?: SyncJobSummary[];
  nextToken?: string;
}
export type SyncResourceState = string;
export type SyncResourceType = string;
export type SyncResourceFilter =
  | {
      state: string;
      resourceType?: never;
      resourceId?: never;
      externalId?: never;
    }
  | {
      state?: never;
      resourceType: string;
      resourceId?: never;
      externalId?: never;
    }
  | {
      state?: never;
      resourceType?: never;
      resourceId: string;
      externalId?: never;
    }
  | {
      state?: never;
      resourceType?: never;
      resourceId?: never;
      externalId: string;
    };
export type SyncResourceFilters = SyncResourceFilter[];
export interface ListSyncResourcesRequest {
  workspaceId: string;
  syncSource: string;
  filters?: SyncResourceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface SyncResourceStatus {
  state?: string;
  error?: ErrorDetails;
}
export interface SyncResourceSummary {
  resourceType?: string;
  externalId?: string;
  resourceId?: string;
  status?: SyncResourceStatus;
  updateDateTime?: Date;
}
export type SyncResourceSummaries = SyncResourceSummary[];
export interface ListSyncResourcesResponse {
  syncResources?: SyncResourceSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceARN: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
  nextToken?: string;
}
export interface ListWorkspacesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface WorkspaceSummary {
  workspaceId: string;
  arn: string;
  description?: string;
  linkedServices?: string[];
  creationDateTime: Date;
  updateDateTime: Date;
}
export type WorkspaceSummaries = WorkspaceSummary[];
export interface ListWorkspacesResponse {
  workspaceSummaries?: WorkspaceSummary[];
  nextToken?: string;
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
  isSingleton?: boolean;
  componentTypeId: string;
  description?: string;
  propertyDefinitions?: {
    [key: string]: PropertyDefinitionRequest | undefined;
  };
  extendsFrom?: string[];
  functions?: { [key: string]: FunctionRequest | undefined };
  propertyGroups?: { [key: string]: PropertyGroupRequest | undefined };
  componentTypeName?: string;
  compositeComponentTypes?: {
    [key: string]: CompositeComponentTypeRequest | undefined;
  };
}
export interface UpdateComponentTypeResponse {
  workspaceId: string;
  arn: string;
  componentTypeId: string;
  state: string;
}
export type ComponentUpdateType = string;
export interface ComponentUpdateRequest {
  updateType?: string;
  description?: string;
  componentTypeId?: string;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined };
  propertyGroupUpdates?: {
    [key: string]: ComponentPropertyGroupRequest | undefined;
  };
}
export type ComponentUpdatesMapRequest = {
  [key: string]: ComponentUpdateRequest | undefined;
};
export interface CompositeComponentUpdateRequest {
  updateType?: string;
  description?: string;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined };
  propertyGroupUpdates?: {
    [key: string]: ComponentPropertyGroupRequest | undefined;
  };
}
export type CompositeComponentUpdatesMapRequest = {
  [key: string]: CompositeComponentUpdateRequest | undefined;
};
export type ParentEntityUpdateType = string;
export interface ParentEntityUpdateRequest {
  updateType: string;
  parentEntityId?: string;
}
export interface UpdateEntityRequest {
  workspaceId: string;
  entityId: string;
  entityName?: string;
  description?: string;
  componentUpdates?: { [key: string]: ComponentUpdateRequest | undefined };
  compositeComponentUpdates?: {
    [key: string]: CompositeComponentUpdateRequest | undefined;
  };
  parentEntityUpdate?: ParentEntityUpdateRequest;
}
export interface UpdateEntityResponse {
  updateDateTime: Date;
  state: string;
}
export interface UpdatePricingPlanRequest {
  pricingMode: string;
  bundleNames?: string[];
}
export interface UpdatePricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan;
}
export interface UpdateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation?: string;
  description?: string;
  capabilities?: string[];
  sceneMetadata?: { [key: string]: string | undefined };
}
export interface UpdateSceneResponse {
  updateDateTime: Date;
}
export interface UpdateWorkspaceRequest {
  workspaceId: string;
  description?: string;
  role?: string;
  s3Location?: string;
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
  BatchPutPropertyValuesRequest,
  BatchPutPropertyValuesResponse,
  BatchPutPropertyValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/entity-properties",
    input: {
      workspaceId: 0,
      entries: D.list({
        entityPropertyReference: {
          componentName: 0,
          componentPath: 0,
          externalIdProperty: 0,
          entityId: 0,
          propertyName: 0,
        },
        propertyValues: D.list({ timestamp: 0, value: i_DataValue, time: 0 }),
      }),
    },
    output: {
      errorEntries: D.list({
        errors: D.list({ entry: { propertyValues: D.list(o_PropertyValue) } }),
      }),
    },
    body: true,
  },
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
})) as any;

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
  CancelMetadataTransferJobRequest,
  CancelMetadataTransferJobResponse,
  CancelMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /metadata-transfer-jobs/{metadataTransferJobId}/cancel",
    input: { metadataTransferJobId: 0 },
    output: { updateDateTime: D.ts },
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
  operationName: "CancelMetadataTransferJob",
  endpointHostPrefix: "api.",
})) as any;

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
  CreateComponentTypeRequest,
  CreateComponentTypeResponse,
  CreateComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/component-types/{componentTypeId}",
    input: {
      workspaceId: 0,
      isSingleton: 0,
      componentTypeId: 0,
      description: 0,
      propertyDefinitions: D.map(i_PropertyDefinitionRequest),
      extendsFrom: 0,
      functions: D.map(i_FunctionRequest),
      tags: 0,
      propertyGroups: D.map(i_PropertyGroupRequest),
      componentTypeName: 0,
      compositeComponentTypes: D.map(i_CompositeComponentTypeRequest),
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
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
})) as any;

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
  CreateEntityRequest,
  CreateEntityResponse,
  CreateEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/entities",
    input: {
      workspaceId: 0,
      entityId: 0,
      entityName: 0,
      description: 0,
      components: D.map({
        description: 0,
        componentTypeId: 0,
        properties: D.map(i_PropertyRequest),
        propertyGroups: D.map(i_ComponentPropertyGroupRequest),
      }),
      compositeComponents: D.map({
        description: 0,
        properties: D.map(i_PropertyRequest),
        propertyGroups: D.map(i_ComponentPropertyGroupRequest),
      }),
      parentEntityId: 0,
      tags: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
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
})) as any;

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
  CreateMetadataTransferJobRequest,
  CreateMetadataTransferJobResponse,
  CreateMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata-transfer-jobs",
    input: {
      metadataTransferJobId: 0,
      description: 0,
      sources: D.list({
        type: 0,
        s3Configuration: { location: 0 },
        iotSiteWiseConfiguration: {
          filters: D.list({
            filterByAssetModel: {
              assetModelId: 0,
              assetModelExternalId: 0,
              includeOffspring: 0,
              includeAssets: 0,
            },
            filterByAsset: {
              assetId: 0,
              assetExternalId: 0,
              includeOffspring: 0,
              includeAssetModel: 0,
            },
          }),
        },
        iotTwinMakerConfiguration: {
          workspace: 0,
          filters: D.list({
            filterByComponentType: { componentTypeId: 0 },
            filterByEntity: { entityId: 0 },
          }),
        },
      }),
      destination: {
        type: 0,
        s3Configuration: { location: 0 },
        iotTwinMakerConfiguration: { workspace: 0 },
      },
    },
    output: { creationDateTime: D.ts },
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
  operationName: "CreateMetadataTransferJob",
  endpointHostPrefix: "api.",
})) as any;

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
  CreateSceneRequest,
  CreateSceneResponse,
  CreateSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/scenes",
    input: {
      workspaceId: 0,
      sceneId: 0,
      contentLocation: 0,
      description: 0,
      capabilities: 0,
      tags: 0,
      sceneMetadata: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
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
})) as any;

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
  CreateSyncJobRequest,
  CreateSyncJobResponse,
  CreateSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/sync-jobs/{syncSource}",
    input: { workspaceId: 0, syncSource: 0, syncRole: 0, tags: 0 },
    output: { creationDateTime: D.ts },
    body: true,
  },
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
})) as any;

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
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}",
    input: { workspaceId: 0, description: 0, s3Location: 0, role: 0, tags: 0 },
    output: { creationDateTime: D.ts },
    body: true,
  },
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
})) as any;

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
  DeleteComponentTypeRequest,
  DeleteComponentTypeResponse,
  DeleteComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/component-types/{componentTypeId}",
    input: { workspaceId: 0, componentTypeId: 0 },
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
  operationName: "DeleteComponentType",
  endpointHostPrefix: "api.",
})) as any;

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
  DeleteEntityRequest,
  DeleteEntityResponse,
  DeleteEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/entities/{entityId}",
    input: {
      workspaceId: 0,
      entityId: 0,
      isRecursive: D.m({ query: "isRecursive" }),
    },
  },
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
})) as any;

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
  DeleteSceneRequest,
  DeleteSceneResponse,
  DeleteSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/scenes/{sceneId}",
    input: { workspaceId: 0, sceneId: 0 },
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
  operationName: "DeleteScene",
  endpointHostPrefix: "api.",
})) as any;

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
  DeleteSyncJobRequest,
  DeleteSyncJobResponse,
  DeleteSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/sync-jobs/{syncSource}",
    input: { workspaceId: 0, syncSource: 0 },
  },
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
})) as any;

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
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}",
    input: { workspaceId: 0 },
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
  operationName: "DeleteWorkspace",
  endpointHostPrefix: "api.",
})) as any;

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
  ExecuteQueryRequest,
  ExecuteQueryResponse,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /queries/execution",
    input: { workspaceId: 0, queryStatement: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  GetComponentTypeRequest,
  GetComponentTypeResponse,
  GetComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/component-types/{componentTypeId}",
    input: { workspaceId: 0, componentTypeId: 0 },
    output: { creationDateTime: D.ts, updateDateTime: D.ts },
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
  operationName: "GetComponentType",
  endpointHostPrefix: "api.",
})) as any;

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
  GetEntityRequest,
  GetEntityResponse,
  GetEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/entities/{entityId}",
    input: { workspaceId: 0, entityId: 0 },
    output: { creationDateTime: D.ts, updateDateTime: D.ts },
  },
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
})) as any;

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
  GetMetadataTransferJobRequest,
  GetMetadataTransferJobResponse,
  GetMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /metadata-transfer-jobs/{metadataTransferJobId}",
    input: { metadataTransferJobId: 0 },
    output: { creationDateTime: D.ts, updateDateTime: D.ts },
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
  operationName: "GetMetadataTransferJob",
  endpointHostPrefix: "api.",
})) as any;

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
  GetPricingPlanRequest,
  GetPricingPlanResponse,
  GetPricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /pricingplan",
    input: {},
    output: {
      currentPricingPlan: o_PricingPlan,
      pendingPricingPlan: o_PricingPlan,
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
  operationName: "GetPricingPlan",
  endpointHostPrefix: "api.",
})) as any;

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
  GetPropertyValueRequest,
  GetPropertyValueResponse,
  GetPropertyValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/entity-properties/value",
    input: {
      componentName: 0,
      componentPath: 0,
      componentTypeId: 0,
      entityId: 0,
      selectedProperties: 0,
      workspaceId: 0,
      maxResults: 0,
      nextToken: 0,
      propertyGroupName: 0,
      tabularConditions: {
        orderBy: D.list({ order: 0, propertyName: 0 }),
        propertyFilters: D.list(i_PropertyFilter),
      },
    },
    body: true,
  },
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
  GetPropertyValueHistoryRequest,
  GetPropertyValueHistoryResponse,
  GetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/entity-properties/history",
    input: {
      workspaceId: 0,
      entityId: 0,
      componentName: 0,
      componentPath: 0,
      componentTypeId: 0,
      selectedProperties: 0,
      propertyFilters: D.list(i_PropertyFilter),
      startDateTime: 0,
      endDateTime: 0,
      interpolation: { interpolationType: 0, intervalInSeconds: 0 },
      nextToken: 0,
      maxResults: 0,
      orderByTime: 0,
      startTime: 0,
      endTime: 0,
    },
    output: { propertyValues: D.list({ values: D.list(o_PropertyValue) }) },
    body: true,
  },
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
  GetSceneRequest,
  GetSceneResponse,
  GetSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/scenes/{sceneId}",
    input: { workspaceId: 0, sceneId: 0 },
    output: { creationDateTime: D.ts, updateDateTime: D.ts },
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
  operationName: "GetScene",
  endpointHostPrefix: "api.",
})) as any;

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
  GetSyncJobRequest,
  GetSyncJobResponse,
  GetSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sync-jobs/{syncSource}",
    input: { syncSource: 0, workspaceId: D.m({ query: "workspace" }) },
    output: { creationDateTime: D.ts, updateDateTime: D.ts },
  },
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
})) as any;

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
  GetWorkspaceRequest,
  GetWorkspaceResponse,
  GetWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}",
    input: { workspaceId: 0 },
    output: { creationDateTime: D.ts, updateDateTime: D.ts },
  },
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
})) as any;

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
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/entities/{entityId}/components-list",
    input: {
      workspaceId: 0,
      entityId: 0,
      componentPath: 0,
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
  operationName: "ListComponents",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
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
  ListComponentTypesRequest,
  ListComponentTypesResponse,
  ListComponentTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/component-types-list",
    input: {
      workspaceId: 0,
      filters: D.list({ extendsFrom: 0, namespace: 0, isAbstract: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      componentTypeSummaries: D.list({
        creationDateTime: D.ts,
        updateDateTime: D.ts,
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
  operationName: "ListComponentTypes",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
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
  ListEntitiesRequest,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/entities-list",
    input: {
      workspaceId: 0,
      filters: D.list({ parentEntityId: 0, componentTypeId: 0, externalId: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      entitySummaries: D.list({ creationDateTime: D.ts, updateDateTime: D.ts }),
    },
    body: true,
  },
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
  ListMetadataTransferJobsRequest,
  ListMetadataTransferJobsResponse,
  ListMetadataTransferJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata-transfer-jobs-list",
    input: {
      sourceType: 0,
      destinationType: 0,
      filters: D.list({ workspaceId: 0, state: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      metadataTransferJobSummaries: D.list({
        creationDateTime: D.ts,
        updateDateTime: D.ts,
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
  operationName: "ListMetadataTransferJobs",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
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
  ListPropertiesRequest,
  ListPropertiesResponse,
  ListPropertiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/properties-list",
    input: {
      workspaceId: 0,
      componentName: 0,
      componentPath: 0,
      entityId: 0,
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
  operationName: "ListProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
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
  ListScenesRequest,
  ListScenesResponse,
  ListScenesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/scenes-list",
    input: { workspaceId: 0, maxResults: 0, nextToken: 0 },
    output: {
      sceneSummaries: D.list({ creationDateTime: D.ts, updateDateTime: D.ts }),
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
  operationName: "ListScenes",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
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
  ListSyncJobsRequest,
  ListSyncJobsResponse,
  ListSyncJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/sync-jobs-list",
    input: { workspaceId: 0, maxResults: 0, nextToken: 0 },
    output: {
      syncJobSummaries: D.list({
        creationDateTime: D.ts,
        updateDateTime: D.ts,
      }),
    },
    body: true,
  },
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
  ListSyncResourcesRequest,
  ListSyncResourcesResponse,
  ListSyncResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/sync-jobs/{syncSource}/resources-list",
    input: {
      workspaceId: 0,
      syncSource: 0,
      filters: D.list({
        state: 0,
        resourceType: 0,
        resourceId: 0,
        externalId: 0,
      }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { syncResources: D.list({ updateDateTime: D.ts }) },
    body: true,
  },
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
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags-list",
    input: { resourceARN: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
})) as any;

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
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workspaces-list",
    input: { maxResults: 0, nextToken: 0 },
    output: {
      workspaceSummaries: D.list({
        creationDateTime: D.ts,
        updateDateTime: D.ts,
      }),
    },
    body: true,
  },
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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags",
    input: { resourceARN: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags",
    input: {
      resourceARN: D.m({ query: "resourceARN" }),
      tagKeys: D.m({ query: "tagKeys" }),
    },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
})) as any;

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
  UpdateComponentTypeRequest,
  UpdateComponentTypeResponse,
  UpdateComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/component-types/{componentTypeId}",
    input: {
      workspaceId: 0,
      isSingleton: 0,
      componentTypeId: 0,
      description: 0,
      propertyDefinitions: D.map(i_PropertyDefinitionRequest),
      extendsFrom: 0,
      functions: D.map(i_FunctionRequest),
      propertyGroups: D.map(i_PropertyGroupRequest),
      componentTypeName: 0,
      compositeComponentTypes: D.map(i_CompositeComponentTypeRequest),
    },
    body: true,
  },
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
})) as any;

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
  UpdateEntityRequest,
  UpdateEntityResponse,
  UpdateEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/entities/{entityId}",
    input: {
      workspaceId: 0,
      entityId: 0,
      entityName: 0,
      description: 0,
      componentUpdates: D.map({
        updateType: 0,
        description: 0,
        componentTypeId: 0,
        propertyUpdates: D.map(i_PropertyRequest),
        propertyGroupUpdates: D.map(i_ComponentPropertyGroupRequest),
      }),
      compositeComponentUpdates: D.map({
        updateType: 0,
        description: 0,
        propertyUpdates: D.map(i_PropertyRequest),
        propertyGroupUpdates: D.map(i_ComponentPropertyGroupRequest),
      }),
      parentEntityUpdate: { updateType: 0, parentEntityId: 0 },
    },
    output: { updateDateTime: D.ts },
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
  operationName: "UpdateEntity",
  endpointHostPrefix: "api.",
})) as any;

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
  UpdatePricingPlanRequest,
  UpdatePricingPlanResponse,
  UpdatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /pricingplan",
    input: { pricingMode: 0, bundleNames: 0 },
    output: {
      currentPricingPlan: o_PricingPlan,
      pendingPricingPlan: o_PricingPlan,
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
  operationName: "UpdatePricingPlan",
  endpointHostPrefix: "api.",
})) as any;

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
  UpdateSceneRequest,
  UpdateSceneResponse,
  UpdateSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/scenes/{sceneId}",
    input: {
      workspaceId: 0,
      sceneId: 0,
      contentLocation: 0,
      description: 0,
      capabilities: 0,
      sceneMetadata: 0,
    },
    output: { updateDateTime: D.ts },
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
  operationName: "UpdateScene",
  endpointHostPrefix: "api.",
})) as any;

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
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  UpdateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}",
    input: { workspaceId: 0, description: 0, role: 0, s3Location: 0 },
    output: { updateDateTime: D.ts },
    body: true,
  },
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
})) as any;

const i_ComponentPropertyGroupRequest: D.LazyStruct = () => ({
  groupType: 0,
  propertyNames: 0,
  updateType: 0,
});
const i_CompositeComponentTypeRequest: D.LazyStruct = () => ({
  componentTypeId: 0,
});
const i_DataValue: D.LazyStruct = () => ({
  booleanValue: 0,
  doubleValue: 0,
  integerValue: 0,
  longValue: 0,
  stringValue: 0,
  listValue: D.list(i_DataValue),
  mapValue: D.map(i_DataValue),
  relationshipValue: { targetEntityId: 0, targetComponentName: 0 },
  expression: 0,
});
const i_FunctionRequest: D.LazyStruct = () => ({
  requiredProperties: 0,
  scope: 0,
  implementedBy: { lambda: { arn: 0 }, isNative: 0 },
});
const i_PropertyDefinitionRequest: D.LazyStruct = () => ({
  dataType: i_DataType,
  isRequiredInEntity: 0,
  isExternalId: 0,
  isStoredExternally: 0,
  isTimeSeries: 0,
  defaultValue: i_DataValue,
  configuration: 0,
  displayName: 0,
});
const i_PropertyFilter: D.LazyStruct = () => ({
  propertyName: 0,
  operator: 0,
  value: i_DataValue,
});
const i_PropertyGroupRequest: D.LazyStruct = () => ({
  groupType: 0,
  propertyNames: 0,
});
const i_PropertyRequest: D.LazyStruct = () => ({
  definition: i_PropertyDefinitionRequest,
  value: i_DataValue,
  updateType: 0,
});
const o_PricingPlan: D.LazyStruct = () => ({
  effectiveDateTime: D.ts,
  updateDateTime: D.ts,
});
const o_PropertyValue: D.LazyStruct = () => ({ timestamp: D.ts });
const i_DataType: D.LazyStruct = () => ({
  type: 0,
  nestedType: i_DataType,
  allowedValues: D.list(i_DataValue),
  unitOfMeasure: 0,
  relationship: { targetComponentTypeId: 0, relationshipType: 0 },
});
