import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "IoTTwinMaker",
  serviceShapeName: "AWSIoTTwinMaker",
});
const auth = T.AwsAuthSigv4({ name: "iottwinmaker" });
const ver = T.ServiceVersion("2021-11-29");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type Id = string;
export type Name = string;
export type ComponentPath = string;
export type EntityId = string;
export type Expression = string;
export type ErrorMessage = string;
export type TwinMakerArn = string;
export type MetadataTransferJobState = string;
export type ErrorCode = string;
export type ComponentTypeId = string;
export type Description = string;
export type Type = string;
export type Value = string;
export type PropertyDisplayName = string;
export type Scope = string;
export type LambdaArn = string;
export type TagKey = string;
export type TagValue = string;
export type GroupType = string;
export type ComponentTypeName = string;
export type State = string;
export type EntityName = string;
export type PropertyUpdateType = string;
export type PropertyGroupUpdateType = string;
export type ParentEntityId = string;
export type SourceType = string;
export type S3SourceLocation = string;
export type Uuid = string;
export type SiteWiseExternalId = string;
export type DestinationType = string;
export type S3DestinationLocation = string;
export type S3Url = string;
export type SceneCapability = string;
export type SceneMetadataValue = string;
export type SyncSource = string;
export type RoleArn = string;
export type SyncJobState = string;
export type S3Location = string;
export type WorkspaceDeleteMessage = string;
export type QueryStatement = string;
export type QueryServiceMaxResults = number;
export type NextToken = string;
export type ColumnName = string;
export type ColumnType = string;
export type QueryResultValue = unknown;
export type BundleName = string;
export type PricingTier = string;
export type PricingMode = string;
export type UpdateReason = string;
export type MaxResults = number;
export type Order = string;
export type InterpolationType = string;
export type IntervalInSeconds = number;
export type OrderByTime = string;
export type SceneErrorCode = string;
export type IdOrArn = string;
export type LinkedService = string;
export type SyncResourceState = string;
export type SyncResourceType = string;
export type ExceptionMessage = string;
export type ComponentUpdateType = string;
export type ParentEntityUpdateType = string;

//# Schemas
export type ExternalIdProperty = { [key: string]: string | undefined };
export const ExternalIdProperty = S.Record(S.String, S.String.pipe(S.optional));
export interface EntityPropertyReference {
  componentName?: string;
  componentPath?: string;
  externalIdProperty?: { [key: string]: string | undefined };
  entityId?: string;
  propertyName: string;
}
export const EntityPropertyReference = S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    externalIdProperty: S.optional(ExternalIdProperty),
    entityId: S.optional(S.String),
    propertyName: S.String,
  }),
).annotate({
  identifier: "EntityPropertyReference",
}) as any as S.Schema<EntityPropertyReference>;
export type DataValueList = DataValue[];
export const DataValueList = S.Array(
  S.suspend((): S.Schema<DataValue> => DataValue).annotate({
    identifier: "DataValue",
  }),
) as any as S.Schema<DataValueList>;
export type DataValueMap = { [key: string]: DataValue | undefined };
export const DataValueMap = S.Record(
  S.String,
  S.suspend((): S.Schema<DataValue> => DataValue)
    .annotate({ identifier: "DataValue" })
    .pipe(S.optional),
) as any as S.Schema<DataValueMap>;
export interface RelationshipValue {
  targetEntityId?: string;
  targetComponentName?: string;
}
export const RelationshipValue = S.suspend(() =>
  S.Struct({
    targetEntityId: S.optional(S.String),
    targetComponentName: S.optional(S.String),
  }),
).annotate({
  identifier: "RelationshipValue",
}) as any as S.Schema<RelationshipValue>;
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
export const DataValue = S.suspend(() =>
  S.Struct({
    booleanValue: S.optional(S.Boolean),
    doubleValue: S.optional(S.Number),
    integerValue: S.optional(S.Number),
    longValue: S.optional(S.Number),
    stringValue: S.optional(S.String),
    listValue: S.optional(
      S.suspend(() => DataValueList).annotate({ identifier: "DataValueList" }),
    ),
    mapValue: S.optional(
      S.suspend(() => DataValueMap).annotate({ identifier: "DataValueMap" }),
    ),
    relationshipValue: S.optional(RelationshipValue),
    expression: S.optional(S.String),
  }),
).annotate({ identifier: "DataValue" }) as any as S.Schema<DataValue>;
export interface PropertyValue {
  timestamp?: Date;
  value: DataValue;
  time?: string;
}
export const PropertyValue = S.suspend(() =>
  S.Struct({
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    value: DataValue,
    time: S.optional(S.String),
  }),
).annotate({ identifier: "PropertyValue" }) as any as S.Schema<PropertyValue>;
export type PropertyValues = PropertyValue[];
export const PropertyValues = S.Array(PropertyValue);
export interface PropertyValueEntry {
  entityPropertyReference: EntityPropertyReference;
  propertyValues?: PropertyValue[];
}
export const PropertyValueEntry = S.suspend(() =>
  S.Struct({
    entityPropertyReference: EntityPropertyReference,
    propertyValues: S.optional(PropertyValues),
  }),
).annotate({
  identifier: "PropertyValueEntry",
}) as any as S.Schema<PropertyValueEntry>;
export type Entries = PropertyValueEntry[];
export const Entries = S.Array(PropertyValueEntry);
export interface BatchPutPropertyValuesRequest {
  workspaceId: string;
  entries: PropertyValueEntry[];
}
export const BatchPutPropertyValuesRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entries: Entries,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entity-properties",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutPropertyValuesRequest",
}) as any as S.Schema<BatchPutPropertyValuesRequest>;
export interface BatchPutPropertyError {
  errorCode: string;
  errorMessage: string;
  entry: PropertyValueEntry;
}
export const BatchPutPropertyError = S.suspend(() =>
  S.Struct({
    errorCode: S.String,
    errorMessage: S.String,
    entry: PropertyValueEntry,
  }),
).annotate({
  identifier: "BatchPutPropertyError",
}) as any as S.Schema<BatchPutPropertyError>;
export type Errors = BatchPutPropertyError[];
export const Errors = S.Array(BatchPutPropertyError);
export interface BatchPutPropertyErrorEntry {
  errors: BatchPutPropertyError[];
}
export const BatchPutPropertyErrorEntry = S.suspend(() =>
  S.Struct({ errors: Errors }),
).annotate({
  identifier: "BatchPutPropertyErrorEntry",
}) as any as S.Schema<BatchPutPropertyErrorEntry>;
export type ErrorEntries = BatchPutPropertyErrorEntry[];
export const ErrorEntries = S.Array(BatchPutPropertyErrorEntry);
export interface BatchPutPropertyValuesResponse {
  errorEntries: BatchPutPropertyErrorEntry[];
}
export const BatchPutPropertyValuesResponse = S.suspend(() =>
  S.Struct({ errorEntries: ErrorEntries }),
).annotate({
  identifier: "BatchPutPropertyValuesResponse",
}) as any as S.Schema<BatchPutPropertyValuesResponse>;
export interface CancelMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export const CancelMetadataTransferJobRequest = S.suspend(() =>
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
).annotate({
  identifier: "CancelMetadataTransferJobRequest",
}) as any as S.Schema<CancelMetadataTransferJobRequest>;
export interface ErrorDetails {
  code?: string;
  message?: string;
}
export const ErrorDetails = S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface MetadataTransferJobStatus {
  state?: string;
  error?: ErrorDetails;
  queuedPosition?: number;
}
export const MetadataTransferJobStatus = S.suspend(() =>
  S.Struct({
    state: S.optional(S.String),
    error: S.optional(ErrorDetails),
    queuedPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "MetadataTransferJobStatus",
}) as any as S.Schema<MetadataTransferJobStatus>;
export interface MetadataTransferJobProgress {
  totalCount?: number;
  succeededCount?: number;
  skippedCount?: number;
  failedCount?: number;
}
export const MetadataTransferJobProgress = S.suspend(() =>
  S.Struct({
    totalCount: S.optional(S.Number),
    succeededCount: S.optional(S.Number),
    skippedCount: S.optional(S.Number),
    failedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "MetadataTransferJobProgress",
}) as any as S.Schema<MetadataTransferJobProgress>;
export interface CancelMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export const CancelMetadataTransferJobResponse = S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
    progress: S.optional(MetadataTransferJobProgress),
  }),
).annotate({
  identifier: "CancelMetadataTransferJobResponse",
}) as any as S.Schema<CancelMetadataTransferJobResponse>;
export interface Relationship {
  targetComponentTypeId?: string;
  relationshipType?: string;
}
export const Relationship = S.suspend(() =>
  S.Struct({
    targetComponentTypeId: S.optional(S.String),
    relationshipType: S.optional(S.String),
  }),
).annotate({ identifier: "Relationship" }) as any as S.Schema<Relationship>;
export interface DataType {
  type: string;
  nestedType?: DataType;
  allowedValues?: DataValue[];
  unitOfMeasure?: string;
  relationship?: Relationship;
}
export const DataType = S.suspend(() =>
  S.Struct({
    type: S.String,
    nestedType: S.optional(
      S.suspend((): S.Schema<DataType> => DataType).annotate({
        identifier: "DataType",
      }),
    ),
    allowedValues: S.optional(
      S.suspend(() => DataValueList).annotate({ identifier: "DataValueList" }),
    ),
    unitOfMeasure: S.optional(S.String),
    relationship: S.optional(Relationship),
  }),
).annotate({ identifier: "DataType" }) as any as S.Schema<DataType>;
export type Configuration = { [key: string]: string | undefined };
export const Configuration = S.Record(S.String, S.String.pipe(S.optional));
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
export const PropertyDefinitionRequest = S.suspend(() =>
  S.Struct({
    dataType: S.optional(DataType),
    isRequiredInEntity: S.optional(S.Boolean),
    isExternalId: S.optional(S.Boolean),
    isStoredExternally: S.optional(S.Boolean),
    isTimeSeries: S.optional(S.Boolean),
    defaultValue: S.optional(DataValue),
    configuration: S.optional(Configuration),
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyDefinitionRequest",
}) as any as S.Schema<PropertyDefinitionRequest>;
export type PropertyDefinitionsRequest = {
  [key: string]: PropertyDefinitionRequest | undefined;
};
export const PropertyDefinitionsRequest = S.Record(
  S.String,
  PropertyDefinitionRequest.pipe(S.optional),
);
export type ExtendsFrom = string[];
export const ExtendsFrom = S.Array(S.String);
export type RequiredProperties = string[];
export const RequiredProperties = S.Array(S.String);
export interface LambdaFunction {
  arn: string;
}
export const LambdaFunction = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({ identifier: "LambdaFunction" }) as any as S.Schema<LambdaFunction>;
export interface DataConnector {
  lambda?: LambdaFunction;
  isNative?: boolean;
}
export const DataConnector = S.suspend(() =>
  S.Struct({
    lambda: S.optional(LambdaFunction),
    isNative: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DataConnector" }) as any as S.Schema<DataConnector>;
export interface FunctionRequest {
  requiredProperties?: string[];
  scope?: string;
  implementedBy?: DataConnector;
}
export const FunctionRequest = S.suspend(() =>
  S.Struct({
    requiredProperties: S.optional(RequiredProperties),
    scope: S.optional(S.String),
    implementedBy: S.optional(DataConnector),
  }),
).annotate({
  identifier: "FunctionRequest",
}) as any as S.Schema<FunctionRequest>;
export type FunctionsRequest = { [key: string]: FunctionRequest | undefined };
export const FunctionsRequest = S.Record(
  S.String,
  FunctionRequest.pipe(S.optional),
);
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export type PropertyNames = string[];
export const PropertyNames = S.Array(S.String);
export interface PropertyGroupRequest {
  groupType?: string;
  propertyNames?: string[];
}
export const PropertyGroupRequest = S.suspend(() =>
  S.Struct({
    groupType: S.optional(S.String),
    propertyNames: S.optional(PropertyNames),
  }),
).annotate({
  identifier: "PropertyGroupRequest",
}) as any as S.Schema<PropertyGroupRequest>;
export type PropertyGroupsRequest = {
  [key: string]: PropertyGroupRequest | undefined;
};
export const PropertyGroupsRequest = S.Record(
  S.String,
  PropertyGroupRequest.pipe(S.optional),
);
export interface CompositeComponentTypeRequest {
  componentTypeId?: string;
}
export const CompositeComponentTypeRequest = S.suspend(() =>
  S.Struct({ componentTypeId: S.optional(S.String) }),
).annotate({
  identifier: "CompositeComponentTypeRequest",
}) as any as S.Schema<CompositeComponentTypeRequest>;
export type CompositeComponentTypesRequest = {
  [key: string]: CompositeComponentTypeRequest | undefined;
};
export const CompositeComponentTypesRequest = S.Record(
  S.String,
  CompositeComponentTypeRequest.pipe(S.optional),
);
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
export const CreateComponentTypeRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    isSingleton: S.optional(S.Boolean),
    componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
    description: S.optional(S.String),
    propertyDefinitions: S.optional(PropertyDefinitionsRequest),
    extendsFrom: S.optional(ExtendsFrom),
    functions: S.optional(FunctionsRequest),
    tags: S.optional(TagMap),
    propertyGroups: S.optional(PropertyGroupsRequest),
    componentTypeName: S.optional(S.String),
    compositeComponentTypes: S.optional(CompositeComponentTypesRequest),
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
).annotate({
  identifier: "CreateComponentTypeRequest",
}) as any as S.Schema<CreateComponentTypeRequest>;
export interface CreateComponentTypeResponse {
  arn: string;
  creationDateTime: Date;
  state: string;
}
export const CreateComponentTypeResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "CreateComponentTypeResponse",
}) as any as S.Schema<CreateComponentTypeResponse>;
export interface PropertyRequest {
  definition?: PropertyDefinitionRequest;
  value?: DataValue;
  updateType?: string;
}
export const PropertyRequest = S.suspend(() =>
  S.Struct({
    definition: S.optional(PropertyDefinitionRequest),
    value: S.optional(DataValue),
    updateType: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyRequest",
}) as any as S.Schema<PropertyRequest>;
export type PropertyRequests = { [key: string]: PropertyRequest | undefined };
export const PropertyRequests = S.Record(
  S.String,
  PropertyRequest.pipe(S.optional),
);
export interface ComponentPropertyGroupRequest {
  groupType?: string;
  propertyNames?: string[];
  updateType?: string;
}
export const ComponentPropertyGroupRequest = S.suspend(() =>
  S.Struct({
    groupType: S.optional(S.String),
    propertyNames: S.optional(PropertyNames),
    updateType: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentPropertyGroupRequest",
}) as any as S.Schema<ComponentPropertyGroupRequest>;
export type ComponentPropertyGroupRequests = {
  [key: string]: ComponentPropertyGroupRequest | undefined;
};
export const ComponentPropertyGroupRequests = S.Record(
  S.String,
  ComponentPropertyGroupRequest.pipe(S.optional),
);
export interface ComponentRequest {
  description?: string;
  componentTypeId?: string;
  properties?: { [key: string]: PropertyRequest | undefined };
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined };
}
export const ComponentRequest = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    properties: S.optional(PropertyRequests),
    propertyGroups: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "ComponentRequest",
}) as any as S.Schema<ComponentRequest>;
export type ComponentsMapRequest = {
  [key: string]: ComponentRequest | undefined;
};
export const ComponentsMapRequest = S.Record(
  S.String,
  ComponentRequest.pipe(S.optional),
);
export interface CompositeComponentRequest {
  description?: string;
  properties?: { [key: string]: PropertyRequest | undefined };
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined };
}
export const CompositeComponentRequest = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    properties: S.optional(PropertyRequests),
    propertyGroups: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "CompositeComponentRequest",
}) as any as S.Schema<CompositeComponentRequest>;
export type CompositeComponentsMapRequest = {
  [key: string]: CompositeComponentRequest | undefined;
};
export const CompositeComponentsMapRequest = S.Record(
  S.String,
  CompositeComponentRequest.pipe(S.optional),
);
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
export const CreateEntityRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.optional(S.String),
    entityName: S.String,
    description: S.optional(S.String),
    components: S.optional(ComponentsMapRequest),
    compositeComponents: S.optional(CompositeComponentsMapRequest),
    parentEntityId: S.optional(S.String),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreateEntityRequest",
}) as any as S.Schema<CreateEntityRequest>;
export interface CreateEntityResponse {
  entityId: string;
  arn: string;
  creationDateTime: Date;
  state: string;
}
export const CreateEntityResponse = S.suspend(() =>
  S.Struct({
    entityId: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "CreateEntityResponse",
}) as any as S.Schema<CreateEntityResponse>;
export interface S3SourceConfiguration {
  location: string;
}
export const S3SourceConfiguration = S.suspend(() =>
  S.Struct({ location: S.String }),
).annotate({
  identifier: "S3SourceConfiguration",
}) as any as S.Schema<S3SourceConfiguration>;
export interface FilterByAssetModel {
  assetModelId?: string;
  assetModelExternalId?: string;
  includeOffspring?: boolean;
  includeAssets?: boolean;
}
export const FilterByAssetModel = S.suspend(() =>
  S.Struct({
    assetModelId: S.optional(S.String),
    assetModelExternalId: S.optional(S.String),
    includeOffspring: S.optional(S.Boolean),
    includeAssets: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FilterByAssetModel",
}) as any as S.Schema<FilterByAssetModel>;
export interface FilterByAsset {
  assetId?: string;
  assetExternalId?: string;
  includeOffspring?: boolean;
  includeAssetModel?: boolean;
}
export const FilterByAsset = S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String),
    assetExternalId: S.optional(S.String),
    includeOffspring: S.optional(S.Boolean),
    includeAssetModel: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FilterByAsset" }) as any as S.Schema<FilterByAsset>;
export type IotSiteWiseSourceConfigurationFilter =
  | { filterByAssetModel: FilterByAssetModel; filterByAsset?: never }
  | { filterByAssetModel?: never; filterByAsset: FilterByAsset };
export const IotSiteWiseSourceConfigurationFilter = S.Union([
  S.Struct({ filterByAssetModel: FilterByAssetModel }),
  S.Struct({ filterByAsset: FilterByAsset }),
]);
export type IotSiteWiseSourceConfigurationFilters =
  IotSiteWiseSourceConfigurationFilter[];
export const IotSiteWiseSourceConfigurationFilters = S.Array(
  IotSiteWiseSourceConfigurationFilter,
);
export interface IotSiteWiseSourceConfiguration {
  filters?: IotSiteWiseSourceConfigurationFilter[];
}
export const IotSiteWiseSourceConfiguration = S.suspend(() =>
  S.Struct({ filters: S.optional(IotSiteWiseSourceConfigurationFilters) }),
).annotate({
  identifier: "IotSiteWiseSourceConfiguration",
}) as any as S.Schema<IotSiteWiseSourceConfiguration>;
export interface FilterByComponentType {
  componentTypeId: string;
}
export const FilterByComponentType = S.suspend(() =>
  S.Struct({ componentTypeId: S.String }),
).annotate({
  identifier: "FilterByComponentType",
}) as any as S.Schema<FilterByComponentType>;
export interface FilterByEntity {
  entityId: string;
}
export const FilterByEntity = S.suspend(() =>
  S.Struct({ entityId: S.String }),
).annotate({ identifier: "FilterByEntity" }) as any as S.Schema<FilterByEntity>;
export type IotTwinMakerSourceConfigurationFilter =
  | { filterByComponentType: FilterByComponentType; filterByEntity?: never }
  | { filterByComponentType?: never; filterByEntity: FilterByEntity };
export const IotTwinMakerSourceConfigurationFilter = S.Union([
  S.Struct({ filterByComponentType: FilterByComponentType }),
  S.Struct({ filterByEntity: FilterByEntity }),
]);
export type IotTwinMakerSourceConfigurationFilters =
  IotTwinMakerSourceConfigurationFilter[];
export const IotTwinMakerSourceConfigurationFilters = S.Array(
  IotTwinMakerSourceConfigurationFilter,
);
export interface IotTwinMakerSourceConfiguration {
  workspace: string;
  filters?: IotTwinMakerSourceConfigurationFilter[];
}
export const IotTwinMakerSourceConfiguration = S.suspend(() =>
  S.Struct({
    workspace: S.String,
    filters: S.optional(IotTwinMakerSourceConfigurationFilters),
  }),
).annotate({
  identifier: "IotTwinMakerSourceConfiguration",
}) as any as S.Schema<IotTwinMakerSourceConfiguration>;
export interface SourceConfiguration {
  type: string;
  s3Configuration?: S3SourceConfiguration;
  iotSiteWiseConfiguration?: IotSiteWiseSourceConfiguration;
  iotTwinMakerConfiguration?: IotTwinMakerSourceConfiguration;
}
export const SourceConfiguration = S.suspend(() =>
  S.Struct({
    type: S.String,
    s3Configuration: S.optional(S3SourceConfiguration),
    iotSiteWiseConfiguration: S.optional(IotSiteWiseSourceConfiguration),
    iotTwinMakerConfiguration: S.optional(IotTwinMakerSourceConfiguration),
  }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type SourceConfigurations = SourceConfiguration[];
export const SourceConfigurations = S.Array(SourceConfiguration);
export interface S3DestinationConfiguration {
  location: string;
}
export const S3DestinationConfiguration = S.suspend(() =>
  S.Struct({ location: S.String }),
).annotate({
  identifier: "S3DestinationConfiguration",
}) as any as S.Schema<S3DestinationConfiguration>;
export interface IotTwinMakerDestinationConfiguration {
  workspace: string;
}
export const IotTwinMakerDestinationConfiguration = S.suspend(() =>
  S.Struct({ workspace: S.String }),
).annotate({
  identifier: "IotTwinMakerDestinationConfiguration",
}) as any as S.Schema<IotTwinMakerDestinationConfiguration>;
export interface DestinationConfiguration {
  type: string;
  s3Configuration?: S3DestinationConfiguration;
  iotTwinMakerConfiguration?: IotTwinMakerDestinationConfiguration;
}
export const DestinationConfiguration = S.suspend(() =>
  S.Struct({
    type: S.String,
    s3Configuration: S.optional(S3DestinationConfiguration),
    iotTwinMakerConfiguration: S.optional(IotTwinMakerDestinationConfiguration),
  }),
).annotate({
  identifier: "DestinationConfiguration",
}) as any as S.Schema<DestinationConfiguration>;
export interface CreateMetadataTransferJobRequest {
  metadataTransferJobId?: string;
  description?: string;
  sources: SourceConfiguration[];
  destination: DestinationConfiguration;
}
export const CreateMetadataTransferJobRequest = S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.optional(S.String),
    description: S.optional(S.String),
    sources: SourceConfigurations,
    destination: DestinationConfiguration,
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
).annotate({
  identifier: "CreateMetadataTransferJobRequest",
}) as any as S.Schema<CreateMetadataTransferJobRequest>;
export interface CreateMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  status: MetadataTransferJobStatus;
}
export const CreateMetadataTransferJobResponse = S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
  }),
).annotate({
  identifier: "CreateMetadataTransferJobResponse",
}) as any as S.Schema<CreateMetadataTransferJobResponse>;
export type SceneCapabilities = string[];
export const SceneCapabilities = S.Array(S.String);
export type SceneMetadataMap = { [key: string]: string | undefined };
export const SceneMetadataMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation: string;
  description?: string;
  capabilities?: string[];
  tags?: { [key: string]: string | undefined };
  sceneMetadata?: { [key: string]: string | undefined };
}
export const CreateSceneRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String,
    contentLocation: S.String,
    description: S.optional(S.String),
    capabilities: S.optional(SceneCapabilities),
    tags: S.optional(TagMap),
    sceneMetadata: S.optional(SceneMetadataMap),
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
).annotate({
  identifier: "CreateSceneRequest",
}) as any as S.Schema<CreateSceneRequest>;
export interface CreateSceneResponse {
  arn: string;
  creationDateTime: Date;
}
export const CreateSceneResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateSceneResponse",
}) as any as S.Schema<CreateSceneResponse>;
export interface CreateSyncJobRequest {
  workspaceId: string;
  syncSource: string;
  syncRole: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSyncJobRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
    syncRole: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSyncJobRequest",
}) as any as S.Schema<CreateSyncJobRequest>;
export interface CreateSyncJobResponse {
  arn: string;
  creationDateTime: Date;
  state: string;
}
export const CreateSyncJobResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "CreateSyncJobResponse",
}) as any as S.Schema<CreateSyncJobResponse>;
export interface CreateWorkspaceRequest {
  workspaceId: string;
  description?: string;
  s3Location?: string;
  role?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateWorkspaceRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    description: S.optional(S.String),
    s3Location: S.optional(S.String),
    role: S.optional(S.String),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreateWorkspaceRequest",
}) as any as S.Schema<CreateWorkspaceRequest>;
export interface CreateWorkspaceResponse {
  arn: string;
  creationDateTime: Date;
}
export const CreateWorkspaceResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateWorkspaceResponse",
}) as any as S.Schema<CreateWorkspaceResponse>;
export interface DeleteComponentTypeRequest {
  workspaceId: string;
  componentTypeId: string;
}
export const DeleteComponentTypeRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteComponentTypeRequest",
}) as any as S.Schema<DeleteComponentTypeRequest>;
export interface DeleteComponentTypeResponse {
  state: string;
}
export const DeleteComponentTypeResponse = S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "DeleteComponentTypeResponse",
}) as any as S.Schema<DeleteComponentTypeResponse>;
export interface DeleteEntityRequest {
  workspaceId: string;
  entityId: string;
  isRecursive?: boolean;
}
export const DeleteEntityRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
    isRecursive: S.optional(S.Boolean).pipe(T.HttpQuery("isRecursive")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/entities/{entityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEntityRequest",
}) as any as S.Schema<DeleteEntityRequest>;
export interface DeleteEntityResponse {
  state: string;
}
export const DeleteEntityResponse = S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "DeleteEntityResponse",
}) as any as S.Schema<DeleteEntityResponse>;
export interface DeleteSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export const DeleteSceneRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String.pipe(T.HttpLabel("sceneId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/scenes/{sceneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSceneRequest",
}) as any as S.Schema<DeleteSceneRequest>;
export interface DeleteSceneResponse {}
export const DeleteSceneResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteSceneResponse",
}) as any as S.Schema<DeleteSceneResponse>;
export interface DeleteSyncJobRequest {
  workspaceId: string;
  syncSource: string;
}
export const DeleteSyncJobRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSyncJobRequest",
}) as any as S.Schema<DeleteSyncJobRequest>;
export interface DeleteSyncJobResponse {
  state: string;
}
export const DeleteSyncJobResponse = S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "DeleteSyncJobResponse",
}) as any as S.Schema<DeleteSyncJobResponse>;
export interface DeleteWorkspaceRequest {
  workspaceId: string;
}
export const DeleteWorkspaceRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteWorkspaceRequest",
}) as any as S.Schema<DeleteWorkspaceRequest>;
export interface DeleteWorkspaceResponse {
  message?: string;
}
export const DeleteWorkspaceResponse = S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "DeleteWorkspaceResponse",
}) as any as S.Schema<DeleteWorkspaceResponse>;
export interface ExecuteQueryRequest {
  workspaceId: string;
  queryStatement: string;
  maxResults?: number;
  nextToken?: string;
}
export const ExecuteQueryRequest = S.suspend(() =>
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
).annotate({
  identifier: "ExecuteQueryRequest",
}) as any as S.Schema<ExecuteQueryRequest>;
export interface ColumnDescription {
  name?: string;
  type?: string;
}
export const ColumnDescription = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), type: S.optional(S.String) }),
).annotate({
  identifier: "ColumnDescription",
}) as any as S.Schema<ColumnDescription>;
export type ColumnDescriptions = ColumnDescription[];
export const ColumnDescriptions = S.Array(ColumnDescription);
export type RowData = any[];
export const RowData = S.Array(S.Any);
export interface Row {
  rowData?: any[];
}
export const Row = S.suspend(() =>
  S.Struct({ rowData: S.optional(RowData) }),
).annotate({ identifier: "Row" }) as any as S.Schema<Row>;
export type Rows = Row[];
export const Rows = S.Array(Row);
export interface ExecuteQueryResponse {
  columnDescriptions?: ColumnDescription[];
  rows?: Row[];
  nextToken?: string;
}
export const ExecuteQueryResponse = S.suspend(() =>
  S.Struct({
    columnDescriptions: S.optional(ColumnDescriptions),
    rows: S.optional(Rows),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecuteQueryResponse",
}) as any as S.Schema<ExecuteQueryResponse>;
export interface GetComponentTypeRequest {
  workspaceId: string;
  componentTypeId: string;
}
export const GetComponentTypeRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetComponentTypeRequest",
}) as any as S.Schema<GetComponentTypeRequest>;
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
export const PropertyDefinitionResponse = S.suspend(() =>
  S.Struct({
    dataType: DataType,
    isTimeSeries: S.Boolean,
    isRequiredInEntity: S.Boolean,
    isExternalId: S.Boolean,
    isStoredExternally: S.Boolean,
    isImported: S.Boolean,
    isFinal: S.Boolean,
    isInherited: S.Boolean,
    defaultValue: S.optional(DataValue),
    configuration: S.optional(Configuration),
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyDefinitionResponse",
}) as any as S.Schema<PropertyDefinitionResponse>;
export type PropertyDefinitionsResponse = {
  [key: string]: PropertyDefinitionResponse | undefined;
};
export const PropertyDefinitionsResponse = S.Record(
  S.String,
  PropertyDefinitionResponse.pipe(S.optional),
);
export interface FunctionResponse {
  requiredProperties?: string[];
  scope?: string;
  implementedBy?: DataConnector;
  isInherited?: boolean;
}
export const FunctionResponse = S.suspend(() =>
  S.Struct({
    requiredProperties: S.optional(RequiredProperties),
    scope: S.optional(S.String),
    implementedBy: S.optional(DataConnector),
    isInherited: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FunctionResponse",
}) as any as S.Schema<FunctionResponse>;
export type FunctionsResponse = { [key: string]: FunctionResponse | undefined };
export const FunctionsResponse = S.Record(
  S.String,
  FunctionResponse.pipe(S.optional),
);
export interface Status {
  state?: string;
  error?: ErrorDetails;
}
export const Status = S.suspend(() =>
  S.Struct({ state: S.optional(S.String), error: S.optional(ErrorDetails) }),
).annotate({ identifier: "Status" }) as any as S.Schema<Status>;
export interface PropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export const PropertyGroupResponse = S.suspend(() =>
  S.Struct({
    groupType: S.String,
    propertyNames: PropertyNames,
    isInherited: S.Boolean,
  }),
).annotate({
  identifier: "PropertyGroupResponse",
}) as any as S.Schema<PropertyGroupResponse>;
export type PropertyGroupsResponse = {
  [key: string]: PropertyGroupResponse | undefined;
};
export const PropertyGroupsResponse = S.Record(
  S.String,
  PropertyGroupResponse.pipe(S.optional),
);
export interface CompositeComponentTypeResponse {
  componentTypeId?: string;
  isInherited?: boolean;
}
export const CompositeComponentTypeResponse = S.suspend(() =>
  S.Struct({
    componentTypeId: S.optional(S.String),
    isInherited: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CompositeComponentTypeResponse",
}) as any as S.Schema<CompositeComponentTypeResponse>;
export type CompositeComponentTypesResponse = {
  [key: string]: CompositeComponentTypeResponse | undefined;
};
export const CompositeComponentTypesResponse = S.Record(
  S.String,
  CompositeComponentTypeResponse.pipe(S.optional),
);
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
export const GetComponentTypeResponse = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    isSingleton: S.optional(S.Boolean),
    componentTypeId: S.String,
    description: S.optional(S.String),
    propertyDefinitions: S.optional(PropertyDefinitionsResponse),
    extendsFrom: S.optional(ExtendsFrom),
    functions: S.optional(FunctionsResponse),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    arn: S.String,
    isAbstract: S.optional(S.Boolean),
    isSchemaInitialized: S.optional(S.Boolean),
    status: S.optional(Status),
    propertyGroups: S.optional(PropertyGroupsResponse),
    syncSource: S.optional(S.String),
    componentTypeName: S.optional(S.String),
    compositeComponentTypes: S.optional(CompositeComponentTypesResponse),
  }),
).annotate({
  identifier: "GetComponentTypeResponse",
}) as any as S.Schema<GetComponentTypeResponse>;
export interface GetEntityRequest {
  workspaceId: string;
  entityId: string;
}
export const GetEntityRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/entities/{entityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEntityRequest",
}) as any as S.Schema<GetEntityRequest>;
export interface PropertyResponse {
  definition?: PropertyDefinitionResponse;
  value?: DataValue;
  areAllPropertyValuesReturned?: boolean;
}
export const PropertyResponse = S.suspend(() =>
  S.Struct({
    definition: S.optional(PropertyDefinitionResponse),
    value: S.optional(DataValue),
    areAllPropertyValuesReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PropertyResponse",
}) as any as S.Schema<PropertyResponse>;
export type PropertyResponses = { [key: string]: PropertyResponse | undefined };
export const PropertyResponses = S.Record(
  S.String,
  PropertyResponse.pipe(S.optional),
);
export interface ComponentPropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export const ComponentPropertyGroupResponse = S.suspend(() =>
  S.Struct({
    groupType: S.String,
    propertyNames: PropertyNames,
    isInherited: S.Boolean,
  }),
).annotate({
  identifier: "ComponentPropertyGroupResponse",
}) as any as S.Schema<ComponentPropertyGroupResponse>;
export type ComponentPropertyGroupResponses = {
  [key: string]: ComponentPropertyGroupResponse | undefined;
};
export const ComponentPropertyGroupResponses = S.Record(
  S.String,
  ComponentPropertyGroupResponse.pipe(S.optional),
);
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
export const ComponentSummary = S.suspend(() =>
  S.Struct({
    componentName: S.String,
    componentTypeId: S.String,
    definedIn: S.optional(S.String),
    description: S.optional(S.String),
    propertyGroups: S.optional(ComponentPropertyGroupResponses),
    status: Status,
    syncSource: S.optional(S.String),
    componentPath: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentSummary",
}) as any as S.Schema<ComponentSummary>;
export type CompositeComponentResponse = {
  [key: string]: ComponentSummary | undefined;
};
export const CompositeComponentResponse = S.Record(
  S.String,
  ComponentSummary.pipe(S.optional),
);
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
export const ComponentResponse = S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    description: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    status: S.optional(Status),
    definedIn: S.optional(S.String),
    properties: S.optional(PropertyResponses),
    propertyGroups: S.optional(ComponentPropertyGroupResponses),
    syncSource: S.optional(S.String),
    areAllPropertiesReturned: S.optional(S.Boolean),
    compositeComponents: S.optional(CompositeComponentResponse),
    areAllCompositeComponentsReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ComponentResponse",
}) as any as S.Schema<ComponentResponse>;
export type ComponentsMap = { [key: string]: ComponentResponse | undefined };
export const ComponentsMap = S.Record(
  S.String,
  ComponentResponse.pipe(S.optional),
);
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
export const GetEntityResponse = S.suspend(() =>
  S.Struct({
    entityId: S.String,
    entityName: S.String,
    arn: S.String,
    status: Status,
    workspaceId: S.String,
    description: S.optional(S.String),
    components: S.optional(ComponentsMap),
    parentEntityId: S.String,
    hasChildEntities: S.Boolean,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    syncSource: S.optional(S.String),
    areAllComponentsReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetEntityResponse",
}) as any as S.Schema<GetEntityResponse>;
export interface GetMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export const GetMetadataTransferJobRequest = S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String.pipe(T.HttpLabel("metadataTransferJobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/metadata-transfer-jobs/{metadataTransferJobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMetadataTransferJobRequest",
}) as any as S.Schema<GetMetadataTransferJobRequest>;
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
export const GetMetadataTransferJobResponse = S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    description: S.optional(S.String),
    sources: SourceConfigurations,
    destination: DestinationConfiguration,
    metadataTransferJobRole: S.String,
    reportUrl: S.optional(S.String),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
    progress: S.optional(MetadataTransferJobProgress),
  }),
).annotate({
  identifier: "GetMetadataTransferJobResponse",
}) as any as S.Schema<GetMetadataTransferJobResponse>;
export interface GetPricingPlanRequest {}
export const GetPricingPlanRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/pricingplan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPricingPlanRequest",
}) as any as S.Schema<GetPricingPlanRequest>;
export type PricingBundles = string[];
export const PricingBundles = S.Array(S.String);
export interface BundleInformation {
  bundleNames: string[];
  pricingTier?: string;
}
export const BundleInformation = S.suspend(() =>
  S.Struct({ bundleNames: PricingBundles, pricingTier: S.optional(S.String) }),
).annotate({
  identifier: "BundleInformation",
}) as any as S.Schema<BundleInformation>;
export interface PricingPlan {
  billableEntityCount?: number;
  bundleInformation?: BundleInformation;
  effectiveDateTime: Date;
  pricingMode: string;
  updateDateTime: Date;
  updateReason: string;
}
export const PricingPlan = S.suspend(() =>
  S.Struct({
    billableEntityCount: S.optional(S.Number),
    bundleInformation: S.optional(BundleInformation),
    effectiveDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    pricingMode: S.String,
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateReason: S.String,
  }),
).annotate({ identifier: "PricingPlan" }) as any as S.Schema<PricingPlan>;
export interface GetPricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan;
}
export const GetPricingPlanResponse = S.suspend(() =>
  S.Struct({
    currentPricingPlan: PricingPlan,
    pendingPricingPlan: S.optional(PricingPlan),
  }),
).annotate({
  identifier: "GetPricingPlanResponse",
}) as any as S.Schema<GetPricingPlanResponse>;
export type SelectedPropertyList = string[];
export const SelectedPropertyList = S.Array(S.String);
export interface OrderBy {
  order?: string;
  propertyName: string;
}
export const OrderBy = S.suspend(() =>
  S.Struct({ order: S.optional(S.String), propertyName: S.String }),
).annotate({ identifier: "OrderBy" }) as any as S.Schema<OrderBy>;
export type OrderByList = OrderBy[];
export const OrderByList = S.Array(OrderBy);
export interface PropertyFilter {
  propertyName?: string;
  operator?: string;
  value?: DataValue;
}
export const PropertyFilter = S.suspend(() =>
  S.Struct({
    propertyName: S.optional(S.String),
    operator: S.optional(S.String),
    value: S.optional(DataValue),
  }),
).annotate({ identifier: "PropertyFilter" }) as any as S.Schema<PropertyFilter>;
export type PropertyFilters = PropertyFilter[];
export const PropertyFilters = S.Array(PropertyFilter);
export interface TabularConditions {
  orderBy?: OrderBy[];
  propertyFilters?: PropertyFilter[];
}
export const TabularConditions = S.suspend(() =>
  S.Struct({
    orderBy: S.optional(OrderByList),
    propertyFilters: S.optional(PropertyFilters),
  }),
).annotate({
  identifier: "TabularConditions",
}) as any as S.Schema<TabularConditions>;
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
export const GetPropertyValueRequest = S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    entityId: S.optional(S.String),
    selectedProperties: SelectedPropertyList,
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    propertyGroupName: S.optional(S.String),
    tabularConditions: S.optional(TabularConditions),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entity-properties/value",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertyValueRequest",
}) as any as S.Schema<GetPropertyValueRequest>;
export interface PropertyLatestValue {
  propertyReference: EntityPropertyReference;
  propertyValue?: DataValue;
}
export const PropertyLatestValue = S.suspend(() =>
  S.Struct({
    propertyReference: EntityPropertyReference,
    propertyValue: S.optional(DataValue),
  }),
).annotate({
  identifier: "PropertyLatestValue",
}) as any as S.Schema<PropertyLatestValue>;
export type PropertyLatestValueMap = {
  [key: string]: PropertyLatestValue | undefined;
};
export const PropertyLatestValueMap = S.Record(
  S.String,
  PropertyLatestValue.pipe(S.optional),
);
export type PropertyTableValue = { [key: string]: DataValue | undefined };
export const PropertyTableValue = S.Record(
  S.String,
  S.suspend((): S.Schema<DataValue> => DataValue)
    .annotate({ identifier: "DataValue" })
    .pipe(S.optional),
);
export type TabularPropertyValue = { [key: string]: DataValue | undefined }[];
export const TabularPropertyValue = S.Array(PropertyTableValue);
export type TabularPropertyValues = {
  [key: string]: DataValue | undefined;
}[][];
export const TabularPropertyValues = S.Array(TabularPropertyValue);
export interface GetPropertyValueResponse {
  propertyValues?: { [key: string]: PropertyLatestValue | undefined };
  nextToken?: string;
  tabularPropertyValues?: { [key: string]: DataValue | undefined }[][];
}
export const GetPropertyValueResponse = S.suspend(() =>
  S.Struct({
    propertyValues: S.optional(PropertyLatestValueMap),
    nextToken: S.optional(S.String),
    tabularPropertyValues: S.optional(TabularPropertyValues),
  }),
).annotate({
  identifier: "GetPropertyValueResponse",
}) as any as S.Schema<GetPropertyValueResponse>;
export interface InterpolationParameters {
  interpolationType?: string;
  intervalInSeconds?: number;
}
export const InterpolationParameters = S.suspend(() =>
  S.Struct({
    interpolationType: S.optional(S.String),
    intervalInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "InterpolationParameters",
}) as any as S.Schema<InterpolationParameters>;
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
export const GetPropertyValueHistoryRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.optional(S.String),
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    selectedProperties: SelectedPropertyList,
    propertyFilters: S.optional(PropertyFilters),
    startDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    interpolation: S.optional(InterpolationParameters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    orderByTime: S.optional(S.String),
    startTime: S.optional(S.String),
    endTime: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entity-properties/history",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertyValueHistoryRequest",
}) as any as S.Schema<GetPropertyValueHistoryRequest>;
export type Values = PropertyValue[];
export const Values = S.Array(PropertyValue);
export interface PropertyValueHistory {
  entityPropertyReference: EntityPropertyReference;
  values?: PropertyValue[];
}
export const PropertyValueHistory = S.suspend(() =>
  S.Struct({
    entityPropertyReference: EntityPropertyReference,
    values: S.optional(Values),
  }),
).annotate({
  identifier: "PropertyValueHistory",
}) as any as S.Schema<PropertyValueHistory>;
export type PropertyValueList = PropertyValueHistory[];
export const PropertyValueList = S.Array(PropertyValueHistory);
export interface GetPropertyValueHistoryResponse {
  propertyValues: PropertyValueHistory[];
  nextToken?: string;
}
export const GetPropertyValueHistoryResponse = S.suspend(() =>
  S.Struct({
    propertyValues: PropertyValueList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPropertyValueHistoryResponse",
}) as any as S.Schema<GetPropertyValueHistoryResponse>;
export interface GetSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export const GetSceneRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String.pipe(T.HttpLabel("sceneId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/scenes/{sceneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSceneRequest",
}) as any as S.Schema<GetSceneRequest>;
export type GeneratedSceneMetadataMap = { [key: string]: string | undefined };
export const GeneratedSceneMetadataMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SceneError {
  code?: string;
  message?: string;
}
export const SceneError = S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "SceneError" }) as any as S.Schema<SceneError>;
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
export const GetSceneResponse = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    sceneId: S.String,
    contentLocation: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
    capabilities: S.optional(SceneCapabilities),
    sceneMetadata: S.optional(SceneMetadataMap),
    generatedSceneMetadata: S.optional(GeneratedSceneMetadataMap),
    error: S.optional(SceneError),
  }),
).annotate({
  identifier: "GetSceneResponse",
}) as any as S.Schema<GetSceneResponse>;
export interface GetSyncJobRequest {
  syncSource: string;
  workspaceId?: string;
}
export const GetSyncJobRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetSyncJobRequest",
}) as any as S.Schema<GetSyncJobRequest>;
export interface SyncJobStatus {
  state?: string;
  error?: ErrorDetails;
}
export const SyncJobStatus = S.suspend(() =>
  S.Struct({ state: S.optional(S.String), error: S.optional(ErrorDetails) }),
).annotate({ identifier: "SyncJobStatus" }) as any as S.Schema<SyncJobStatus>;
export interface GetSyncJobResponse {
  arn: string;
  workspaceId: string;
  syncSource: string;
  syncRole: string;
  status: SyncJobStatus;
  creationDateTime: Date;
  updateDateTime: Date;
}
export const GetSyncJobResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    workspaceId: S.String,
    syncSource: S.String,
    syncRole: S.String,
    status: SyncJobStatus,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetSyncJobResponse",
}) as any as S.Schema<GetSyncJobResponse>;
export interface GetWorkspaceRequest {
  workspaceId: string;
}
export const GetWorkspaceRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetWorkspaceRequest",
}) as any as S.Schema<GetWorkspaceRequest>;
export type LinkedServices = string[];
export const LinkedServices = S.Array(S.String);
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
export const GetWorkspaceResponse = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    description: S.optional(S.String),
    linkedServices: S.optional(LinkedServices),
    s3Location: S.optional(S.String),
    role: S.optional(S.String),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetWorkspaceResponse",
}) as any as S.Schema<GetWorkspaceResponse>;
export interface ListComponentsRequest {
  workspaceId: string;
  entityId: string;
  componentPath?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListComponentsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListComponentsRequest",
}) as any as S.Schema<ListComponentsRequest>;
export type ComponentSummaries = ComponentSummary[];
export const ComponentSummaries = S.Array(ComponentSummary);
export interface ListComponentsResponse {
  componentSummaries: ComponentSummary[];
  nextToken?: string;
}
export const ListComponentsResponse = S.suspend(() =>
  S.Struct({
    componentSummaries: ComponentSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentsResponse",
}) as any as S.Schema<ListComponentsResponse>;
export type ListComponentTypesFilter =
  | { extendsFrom: string; namespace?: never; isAbstract?: never }
  | { extendsFrom?: never; namespace: string; isAbstract?: never }
  | { extendsFrom?: never; namespace?: never; isAbstract: boolean };
export const ListComponentTypesFilter = S.Union([
  S.Struct({ extendsFrom: S.String }),
  S.Struct({ namespace: S.String }),
  S.Struct({ isAbstract: S.Boolean }),
]);
export type ListComponentTypesFilters = ListComponentTypesFilter[];
export const ListComponentTypesFilters = S.Array(ListComponentTypesFilter);
export interface ListComponentTypesRequest {
  workspaceId: string;
  filters?: ListComponentTypesFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const ListComponentTypesRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    filters: S.optional(ListComponentTypesFilters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/component-types-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentTypesRequest",
}) as any as S.Schema<ListComponentTypesRequest>;
export interface ComponentTypeSummary {
  arn: string;
  componentTypeId: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
  status?: Status;
  componentTypeName?: string;
}
export const ComponentTypeSummary = S.suspend(() =>
  S.Struct({
    arn: S.String,
    componentTypeId: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
    status: S.optional(Status),
    componentTypeName: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentTypeSummary",
}) as any as S.Schema<ComponentTypeSummary>;
export type ComponentTypeSummaries = ComponentTypeSummary[];
export const ComponentTypeSummaries = S.Array(ComponentTypeSummary);
export interface ListComponentTypesResponse {
  workspaceId: string;
  componentTypeSummaries: ComponentTypeSummary[];
  nextToken?: string;
  maxResults?: number;
}
export const ListComponentTypesResponse = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    componentTypeSummaries: ComponentTypeSummaries,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "ListComponentTypesResponse",
}) as any as S.Schema<ListComponentTypesResponse>;
export type ListEntitiesFilter =
  | { parentEntityId: string; componentTypeId?: never; externalId?: never }
  | { parentEntityId?: never; componentTypeId: string; externalId?: never }
  | { parentEntityId?: never; componentTypeId?: never; externalId: string };
export const ListEntitiesFilter = S.Union([
  S.Struct({ parentEntityId: S.String }),
  S.Struct({ componentTypeId: S.String }),
  S.Struct({ externalId: S.String }),
]);
export type ListEntitiesFilters = ListEntitiesFilter[];
export const ListEntitiesFilters = S.Array(ListEntitiesFilter);
export interface ListEntitiesRequest {
  workspaceId: string;
  filters?: ListEntitiesFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListEntitiesRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    filters: S.optional(ListEntitiesFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entities-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntitiesRequest",
}) as any as S.Schema<ListEntitiesRequest>;
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
export const EntitySummary = S.suspend(() =>
  S.Struct({
    entityId: S.String,
    entityName: S.String,
    arn: S.String,
    parentEntityId: S.optional(S.String),
    status: Status,
    description: S.optional(S.String),
    hasChildEntities: S.optional(S.Boolean),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "EntitySummary" }) as any as S.Schema<EntitySummary>;
export type EntitySummaries = EntitySummary[];
export const EntitySummaries = S.Array(EntitySummary);
export interface ListEntitiesResponse {
  entitySummaries?: EntitySummary[];
  nextToken?: string;
}
export const ListEntitiesResponse = S.suspend(() =>
  S.Struct({
    entitySummaries: S.optional(EntitySummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntitiesResponse",
}) as any as S.Schema<ListEntitiesResponse>;
export type ListMetadataTransferJobsFilter =
  | { workspaceId: string; state?: never }
  | { workspaceId?: never; state: string };
export const ListMetadataTransferJobsFilter = S.Union([
  S.Struct({ workspaceId: S.String }),
  S.Struct({ state: S.String }),
]);
export type ListMetadataTransferJobsFilters = ListMetadataTransferJobsFilter[];
export const ListMetadataTransferJobsFilters = S.Array(
  ListMetadataTransferJobsFilter,
);
export interface ListMetadataTransferJobsRequest {
  sourceType: string;
  destinationType: string;
  filters?: ListMetadataTransferJobsFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const ListMetadataTransferJobsRequest = S.suspend(() =>
  S.Struct({
    sourceType: S.String,
    destinationType: S.String,
    filters: S.optional(ListMetadataTransferJobsFilters),
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
).annotate({
  identifier: "ListMetadataTransferJobsRequest",
}) as any as S.Schema<ListMetadataTransferJobsRequest>;
export interface MetadataTransferJobSummary {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export const MetadataTransferJobSummary = S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
    progress: S.optional(MetadataTransferJobProgress),
  }),
).annotate({
  identifier: "MetadataTransferJobSummary",
}) as any as S.Schema<MetadataTransferJobSummary>;
export type MetadataTransferJobSummaries = MetadataTransferJobSummary[];
export const MetadataTransferJobSummaries = S.Array(MetadataTransferJobSummary);
export interface ListMetadataTransferJobsResponse {
  metadataTransferJobSummaries: MetadataTransferJobSummary[];
  nextToken?: string;
}
export const ListMetadataTransferJobsResponse = S.suspend(() =>
  S.Struct({
    metadataTransferJobSummaries: MetadataTransferJobSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMetadataTransferJobsResponse",
}) as any as S.Schema<ListMetadataTransferJobsResponse>;
export interface ListPropertiesRequest {
  workspaceId: string;
  componentName?: string;
  componentPath?: string;
  entityId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListPropertiesRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    entityId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/properties-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPropertiesRequest",
}) as any as S.Schema<ListPropertiesRequest>;
export interface PropertySummary {
  definition?: PropertyDefinitionResponse;
  propertyName: string;
  value?: DataValue;
  areAllPropertyValuesReturned?: boolean;
}
export const PropertySummary = S.suspend(() =>
  S.Struct({
    definition: S.optional(PropertyDefinitionResponse),
    propertyName: S.String,
    value: S.optional(DataValue),
    areAllPropertyValuesReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PropertySummary",
}) as any as S.Schema<PropertySummary>;
export type PropertySummaries = PropertySummary[];
export const PropertySummaries = S.Array(PropertySummary);
export interface ListPropertiesResponse {
  propertySummaries: PropertySummary[];
  nextToken?: string;
}
export const ListPropertiesResponse = S.suspend(() =>
  S.Struct({
    propertySummaries: PropertySummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPropertiesResponse",
}) as any as S.Schema<ListPropertiesResponse>;
export interface ListScenesRequest {
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListScenesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListScenesRequest",
}) as any as S.Schema<ListScenesRequest>;
export interface SceneSummary {
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
}
export const SceneSummary = S.suspend(() =>
  S.Struct({
    sceneId: S.String,
    contentLocation: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "SceneSummary" }) as any as S.Schema<SceneSummary>;
export type SceneSummaries = SceneSummary[];
export const SceneSummaries = S.Array(SceneSummary);
export interface ListScenesResponse {
  sceneSummaries?: SceneSummary[];
  nextToken?: string;
}
export const ListScenesResponse = S.suspend(() =>
  S.Struct({
    sceneSummaries: S.optional(SceneSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListScenesResponse",
}) as any as S.Schema<ListScenesResponse>;
export interface ListSyncJobsRequest {
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSyncJobsRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/sync-jobs-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSyncJobsRequest",
}) as any as S.Schema<ListSyncJobsRequest>;
export interface SyncJobSummary {
  arn?: string;
  workspaceId?: string;
  syncSource?: string;
  status?: SyncJobStatus;
  creationDateTime?: Date;
  updateDateTime?: Date;
}
export const SyncJobSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workspaceId: S.optional(S.String),
    syncSource: S.optional(S.String),
    status: S.optional(SyncJobStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SyncJobSummary" }) as any as S.Schema<SyncJobSummary>;
export type SyncJobSummaries = SyncJobSummary[];
export const SyncJobSummaries = S.Array(SyncJobSummary);
export interface ListSyncJobsResponse {
  syncJobSummaries?: SyncJobSummary[];
  nextToken?: string;
}
export const ListSyncJobsResponse = S.suspend(() =>
  S.Struct({
    syncJobSummaries: S.optional(SyncJobSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSyncJobsResponse",
}) as any as S.Schema<ListSyncJobsResponse>;
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
export const SyncResourceFilter = S.Union([
  S.Struct({ state: S.String }),
  S.Struct({ resourceType: S.String }),
  S.Struct({ resourceId: S.String }),
  S.Struct({ externalId: S.String }),
]);
export type SyncResourceFilters = SyncResourceFilter[];
export const SyncResourceFilters = S.Array(SyncResourceFilter);
export interface ListSyncResourcesRequest {
  workspaceId: string;
  syncSource: string;
  filters?: SyncResourceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListSyncResourcesRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
    filters: S.optional(SyncResourceFilters),
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
).annotate({
  identifier: "ListSyncResourcesRequest",
}) as any as S.Schema<ListSyncResourcesRequest>;
export interface SyncResourceStatus {
  state?: string;
  error?: ErrorDetails;
}
export const SyncResourceStatus = S.suspend(() =>
  S.Struct({ state: S.optional(S.String), error: S.optional(ErrorDetails) }),
).annotate({
  identifier: "SyncResourceStatus",
}) as any as S.Schema<SyncResourceStatus>;
export interface SyncResourceSummary {
  resourceType?: string;
  externalId?: string;
  resourceId?: string;
  status?: SyncResourceStatus;
  updateDateTime?: Date;
}
export const SyncResourceSummary = S.suspend(() =>
  S.Struct({
    resourceType: S.optional(S.String),
    externalId: S.optional(S.String),
    resourceId: S.optional(S.String),
    status: S.optional(SyncResourceStatus),
    updateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SyncResourceSummary",
}) as any as S.Schema<SyncResourceSummary>;
export type SyncResourceSummaries = SyncResourceSummary[];
export const SyncResourceSummaries = S.Array(SyncResourceSummary);
export interface ListSyncResourcesResponse {
  syncResources?: SyncResourceSummary[];
  nextToken?: string;
}
export const ListSyncResourcesResponse = S.suspend(() =>
  S.Struct({
    syncResources: S.optional(SyncResourceSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSyncResourcesResponse",
}) as any as S.Schema<ListSyncResourcesResponse>;
export interface ListTagsForResourceRequest {
  resourceARN: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({
    resourceARN: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
  nextToken?: string;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWorkspacesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkspacesRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkspacesRequest",
}) as any as S.Schema<ListWorkspacesRequest>;
export interface WorkspaceSummary {
  workspaceId: string;
  arn: string;
  description?: string;
  linkedServices?: string[];
  creationDateTime: Date;
  updateDateTime: Date;
}
export const WorkspaceSummary = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    description: S.optional(S.String),
    linkedServices: S.optional(LinkedServices),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "WorkspaceSummary",
}) as any as S.Schema<WorkspaceSummary>;
export type WorkspaceSummaries = WorkspaceSummary[];
export const WorkspaceSummaries = S.Array(WorkspaceSummary);
export interface ListWorkspacesResponse {
  workspaceSummaries?: WorkspaceSummary[];
  nextToken?: string;
}
export const ListWorkspacesResponse = S.suspend(() =>
  S.Struct({
    workspaceSummaries: S.optional(WorkspaceSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkspacesResponse",
}) as any as S.Schema<ListWorkspacesResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ resourceARN: S.String, tags: TagMap }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpQuery("resourceARN")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
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
export const UpdateComponentTypeRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    isSingleton: S.optional(S.Boolean),
    componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
    description: S.optional(S.String),
    propertyDefinitions: S.optional(PropertyDefinitionsRequest),
    extendsFrom: S.optional(ExtendsFrom),
    functions: S.optional(FunctionsRequest),
    propertyGroups: S.optional(PropertyGroupsRequest),
    componentTypeName: S.optional(S.String),
    compositeComponentTypes: S.optional(CompositeComponentTypesRequest),
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
).annotate({
  identifier: "UpdateComponentTypeRequest",
}) as any as S.Schema<UpdateComponentTypeRequest>;
export interface UpdateComponentTypeResponse {
  workspaceId: string;
  arn: string;
  componentTypeId: string;
  state: string;
}
export const UpdateComponentTypeResponse = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    componentTypeId: S.String,
    state: S.String,
  }),
).annotate({
  identifier: "UpdateComponentTypeResponse",
}) as any as S.Schema<UpdateComponentTypeResponse>;
export interface ComponentUpdateRequest {
  updateType?: string;
  description?: string;
  componentTypeId?: string;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined };
  propertyGroupUpdates?: {
    [key: string]: ComponentPropertyGroupRequest | undefined;
  };
}
export const ComponentUpdateRequest = S.suspend(() =>
  S.Struct({
    updateType: S.optional(S.String),
    description: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    propertyUpdates: S.optional(PropertyRequests),
    propertyGroupUpdates: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "ComponentUpdateRequest",
}) as any as S.Schema<ComponentUpdateRequest>;
export type ComponentUpdatesMapRequest = {
  [key: string]: ComponentUpdateRequest | undefined;
};
export const ComponentUpdatesMapRequest = S.Record(
  S.String,
  ComponentUpdateRequest.pipe(S.optional),
);
export interface CompositeComponentUpdateRequest {
  updateType?: string;
  description?: string;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined };
  propertyGroupUpdates?: {
    [key: string]: ComponentPropertyGroupRequest | undefined;
  };
}
export const CompositeComponentUpdateRequest = S.suspend(() =>
  S.Struct({
    updateType: S.optional(S.String),
    description: S.optional(S.String),
    propertyUpdates: S.optional(PropertyRequests),
    propertyGroupUpdates: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "CompositeComponentUpdateRequest",
}) as any as S.Schema<CompositeComponentUpdateRequest>;
export type CompositeComponentUpdatesMapRequest = {
  [key: string]: CompositeComponentUpdateRequest | undefined;
};
export const CompositeComponentUpdatesMapRequest = S.Record(
  S.String,
  CompositeComponentUpdateRequest.pipe(S.optional),
);
export interface ParentEntityUpdateRequest {
  updateType: string;
  parentEntityId?: string;
}
export const ParentEntityUpdateRequest = S.suspend(() =>
  S.Struct({ updateType: S.String, parentEntityId: S.optional(S.String) }),
).annotate({
  identifier: "ParentEntityUpdateRequest",
}) as any as S.Schema<ParentEntityUpdateRequest>;
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
export const UpdateEntityRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
    entityName: S.optional(S.String),
    description: S.optional(S.String),
    componentUpdates: S.optional(ComponentUpdatesMapRequest),
    compositeComponentUpdates: S.optional(CompositeComponentUpdatesMapRequest),
    parentEntityUpdate: S.optional(ParentEntityUpdateRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/entities/{entityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEntityRequest",
}) as any as S.Schema<UpdateEntityRequest>;
export interface UpdateEntityResponse {
  updateDateTime: Date;
  state: string;
}
export const UpdateEntityResponse = S.suspend(() =>
  S.Struct({
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "UpdateEntityResponse",
}) as any as S.Schema<UpdateEntityResponse>;
export interface UpdatePricingPlanRequest {
  pricingMode: string;
  bundleNames?: string[];
}
export const UpdatePricingPlanRequest = S.suspend(() =>
  S.Struct({
    pricingMode: S.String,
    bundleNames: S.optional(PricingBundles),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/pricingplan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePricingPlanRequest",
}) as any as S.Schema<UpdatePricingPlanRequest>;
export interface UpdatePricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan;
}
export const UpdatePricingPlanResponse = S.suspend(() =>
  S.Struct({
    currentPricingPlan: PricingPlan,
    pendingPricingPlan: S.optional(PricingPlan),
  }),
).annotate({
  identifier: "UpdatePricingPlanResponse",
}) as any as S.Schema<UpdatePricingPlanResponse>;
export interface UpdateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation?: string;
  description?: string;
  capabilities?: string[];
  sceneMetadata?: { [key: string]: string | undefined };
}
export const UpdateSceneRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String.pipe(T.HttpLabel("sceneId")),
    contentLocation: S.optional(S.String),
    description: S.optional(S.String),
    capabilities: S.optional(SceneCapabilities),
    sceneMetadata: S.optional(SceneMetadataMap),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/scenes/{sceneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSceneRequest",
}) as any as S.Schema<UpdateSceneRequest>;
export interface UpdateSceneResponse {
  updateDateTime: Date;
}
export const UpdateSceneResponse = S.suspend(() =>
  S.Struct({ updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
).annotate({
  identifier: "UpdateSceneResponse",
}) as any as S.Schema<UpdateSceneResponse>;
export interface UpdateWorkspaceRequest {
  workspaceId: string;
  description?: string;
  role?: string;
  s3Location?: string;
}
export const UpdateWorkspaceRequest = S.suspend(() =>
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
).annotate({
  identifier: "UpdateWorkspaceRequest",
}) as any as S.Schema<UpdateWorkspaceRequest>;
export interface UpdateWorkspaceResponse {
  updateDateTime: Date;
}
export const UpdateWorkspaceResponse = S.suspend(() =>
  S.Struct({ updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
).annotate({
  identifier: "UpdateWorkspaceResponse",
}) as any as S.Schema<UpdateWorkspaceResponse>;

//# Errors
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class QueryTimeoutException extends S.TaggedErrorClass<QueryTimeoutException>()(
  "QueryTimeoutException",
  { message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ConnectorFailureException extends S.TaggedErrorClass<ConnectorFailureException>()(
  "ConnectorFailureException",
  { message: S.optional(S.String) },
) {}
export class ConnectorTimeoutException extends S.TaggedErrorClass<ConnectorTimeoutException>()(
  "ConnectorTimeoutException",
  { message: S.optional(S.String) },
) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Sets values for multiple time series properties.
 */
export const batchPutPropertyValues: (
  input: BatchPutPropertyValuesRequest,
) => effect.Effect<
  BatchPutPropertyValuesResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchPutPropertyValuesRequest,
  output: BatchPutPropertyValuesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Cancels the metadata transfer job.
 */
export const cancelMetadataTransferJob: (
  input: CancelMetadataTransferJobRequest,
) => effect.Effect<
  CancelMetadataTransferJobResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelMetadataTransferJobRequest,
  output: CancelMetadataTransferJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a component type.
 */
export const createComponentType: (
  input: CreateComponentTypeRequest,
) => effect.Effect<
  CreateComponentTypeResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateComponentTypeRequest,
  output: CreateComponentTypeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates an entity.
 */
export const createEntity: (
  input: CreateEntityRequest,
) => effect.Effect<
  CreateEntityResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEntityRequest,
  output: CreateEntityResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a new metadata transfer job.
 */
export const createMetadataTransferJob: (
  input: CreateMetadataTransferJobRequest,
) => effect.Effect<
  CreateMetadataTransferJobResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMetadataTransferJobRequest,
  output: CreateMetadataTransferJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a scene.
 */
export const createScene: (
  input: CreateSceneRequest,
) => effect.Effect<
  CreateSceneResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSceneRequest,
  output: CreateSceneResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * This action creates a SyncJob.
 */
export const createSyncJob: (
  input: CreateSyncJobRequest,
) => effect.Effect<
  CreateSyncJobResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSyncJobRequest,
  output: CreateSyncJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a workplace.
 */
export const createWorkspace: (
  input: CreateWorkspaceRequest,
) => effect.Effect<
  CreateWorkspaceResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspaceRequest,
  output: CreateWorkspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a component type.
 */
export const deleteComponentType: (
  input: DeleteComponentTypeRequest,
) => effect.Effect<
  DeleteComponentTypeResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteComponentTypeRequest,
  output: DeleteComponentTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes an entity.
 */
export const deleteEntity: (
  input: DeleteEntityRequest,
) => effect.Effect<
  DeleteEntityResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEntityRequest,
  output: DeleteEntityResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a scene.
 */
export const deleteScene: (
  input: DeleteSceneRequest,
) => effect.Effect<
  DeleteSceneResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSceneRequest,
  output: DeleteSceneResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Delete the SyncJob.
 */
export const deleteSyncJob: (
  input: DeleteSyncJobRequest,
) => effect.Effect<
  DeleteSyncJobResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSyncJobRequest,
  output: DeleteSyncJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a workspace.
 */
export const deleteWorkspace: (
  input: DeleteWorkspaceRequest,
) => effect.Effect<
  DeleteWorkspaceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceRequest,
  output: DeleteWorkspaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Run queries to access information from your knowledge graph of entities within
 * individual workspaces.
 *
 * The ExecuteQuery action only works with Amazon Web Services Java SDK2.
 * ExecuteQuery will not work with any Amazon Web Services Java SDK version < 2.x.
 */
export const executeQuery: {
  (
    input: ExecuteQueryRequest,
  ): effect.Effect<
    ExecuteQueryResponse,
    | AccessDeniedException
    | InternalServerException
    | QueryTimeoutException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ExecuteQueryRequest,
  ) => stream.Stream<
    ExecuteQueryResponse,
    | AccessDeniedException
    | InternalServerException
    | QueryTimeoutException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ExecuteQueryRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | QueryTimeoutException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ExecuteQueryRequest,
  output: ExecuteQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    QueryTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about a component type.
 */
export const getComponentType: (
  input: GetComponentTypeRequest,
) => effect.Effect<
  GetComponentTypeResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetComponentTypeRequest,
  output: GetComponentTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about an entity.
 */
export const getEntity: (
  input: GetEntityRequest,
) => effect.Effect<
  GetEntityResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEntityRequest,
  output: GetEntityResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets a nmetadata transfer job.
 */
export const getMetadataTransferJob: (
  input: GetMetadataTransferJobRequest,
) => effect.Effect<
  GetMetadataTransferJobResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMetadataTransferJobRequest,
  output: GetMetadataTransferJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets the pricing plan.
 */
export const getPricingPlan: (
  input: GetPricingPlanRequest,
) => effect.Effect<
  GetPricingPlanResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPricingPlanRequest,
  output: GetPricingPlanResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets the property values for a component, component type, entity, or workspace.
 *
 * You must specify a value for either `componentName`,
 * `componentTypeId`, `entityId`, or `workspaceId`.
 */
export const getPropertyValue: {
  (
    input: GetPropertyValueRequest,
  ): effect.Effect<
    GetPropertyValueResponse,
    | AccessDeniedException
    | ConnectorFailureException
    | ConnectorTimeoutException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: GetPropertyValueRequest,
  ) => stream.Stream<
    GetPropertyValueResponse,
    | AccessDeniedException
    | ConnectorFailureException
    | ConnectorTimeoutException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetPropertyValueRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | ConnectorFailureException
    | ConnectorTimeoutException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetPropertyValueRequest,
  output: GetPropertyValueResponse,
  errors: [
    AccessDeniedException,
    ConnectorFailureException,
    ConnectorTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about the history of a time series property value for a component,
 * component type, entity, or workspace.
 *
 * You must specify a value for `workspaceId`. For entity-specific queries,
 * specify values for `componentName` and `entityId`. For cross-entity
 * quries, specify a value for `componentTypeId`.
 */
export const getPropertyValueHistory: {
  (
    input: GetPropertyValueHistoryRequest,
  ): effect.Effect<
    GetPropertyValueHistoryResponse,
    | AccessDeniedException
    | ConnectorFailureException
    | ConnectorTimeoutException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: GetPropertyValueHistoryRequest,
  ) => stream.Stream<
    GetPropertyValueHistoryResponse,
    | AccessDeniedException
    | ConnectorFailureException
    | ConnectorTimeoutException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetPropertyValueHistoryRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | ConnectorFailureException
    | ConnectorTimeoutException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetPropertyValueHistoryRequest,
  output: GetPropertyValueHistoryResponse,
  errors: [
    AccessDeniedException,
    ConnectorFailureException,
    ConnectorTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about a scene.
 */
export const getScene: (
  input: GetSceneRequest,
) => effect.Effect<
  GetSceneResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSceneRequest,
  output: GetSceneResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets the SyncJob.
 */
export const getSyncJob: (
  input: GetSyncJobRequest,
) => effect.Effect<
  GetSyncJobResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSyncJobRequest,
  output: GetSyncJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about a workspace.
 */
export const getWorkspace: (
  input: GetWorkspaceRequest,
) => effect.Effect<
  GetWorkspaceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkspaceRequest,
  output: GetWorkspaceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * This API lists the components of an entity.
 */
export const listComponents: {
  (
    input: ListComponentsRequest,
  ): effect.Effect<
    ListComponentsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListComponentsRequest,
  ) => stream.Stream<
    ListComponentsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListComponentsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsRequest,
  output: ListComponentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all component types in a workspace.
 */
export const listComponentTypes: {
  (
    input: ListComponentTypesRequest,
  ): effect.Effect<
    ListComponentTypesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListComponentTypesRequest,
  ) => stream.Stream<
    ListComponentTypesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListComponentTypesRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListComponentTypesRequest,
  output: ListComponentTypesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all entities in a workspace.
 */
export const listEntities: {
  (
    input: ListEntitiesRequest,
  ): effect.Effect<
    ListEntitiesResponse,
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListEntitiesRequest,
  ) => stream.Stream<
    ListEntitiesResponse,
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEntitiesRequest,
  ) => stream.Stream<
    unknown,
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEntitiesRequest,
  output: ListEntitiesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists the metadata transfer jobs.
 */
export const listMetadataTransferJobs: {
  (
    input: ListMetadataTransferJobsRequest,
  ): effect.Effect<
    ListMetadataTransferJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListMetadataTransferJobsRequest,
  ) => stream.Stream<
    ListMetadataTransferJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMetadataTransferJobsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMetadataTransferJobsRequest,
  output: ListMetadataTransferJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * This API lists the properties of a component.
 */
export const listProperties: {
  (
    input: ListPropertiesRequest,
  ): effect.Effect<
    ListPropertiesResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListPropertiesRequest,
  ) => stream.Stream<
    ListPropertiesResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPropertiesRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPropertiesRequest,
  output: ListPropertiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all scenes in a workspace.
 */
export const listScenes: {
  (
    input: ListScenesRequest,
  ): effect.Effect<
    ListScenesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListScenesRequest,
  ) => stream.Stream<
    ListScenesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListScenesRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScenesRequest,
  output: ListScenesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * List all SyncJobs.
 */
export const listSyncJobs: {
  (
    input: ListSyncJobsRequest,
  ): effect.Effect<
    ListSyncJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListSyncJobsRequest,
  ) => stream.Stream<
    ListSyncJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSyncJobsRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSyncJobsRequest,
  output: ListSyncJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists the sync resources.
 */
export const listSyncResources: {
  (
    input: ListSyncResourcesRequest,
  ): effect.Effect<
    ListSyncResourcesResponse,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListSyncResourcesRequest,
  ) => stream.Stream<
    ListSyncResourcesResponse,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSyncResourcesRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSyncResourcesRequest,
  output: ListSyncResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all tags associated with a resource.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  AccessDeniedException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
}));
/**
 * Retrieves information about workspaces in the current account.
 */
export const listWorkspaces: {
  (
    input: ListWorkspacesRequest,
  ): effect.Effect<
    ListWorkspacesResponse,
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListWorkspacesRequest,
  ) => stream.Stream<
    ListWorkspacesResponse,
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkspacesRequest,
  ) => stream.Stream<
    unknown,
    | InternalServerException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspacesRequest,
  output: ListWorkspacesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Adds tags to a resource.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | AccessDeniedException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
}));
/**
 * Removes tags from a resource.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  AccessDeniedException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
}));
/**
 * Updates information in a component type.
 */
export const updateComponentType: (
  input: UpdateComponentTypeRequest,
) => effect.Effect<
  UpdateComponentTypeResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateComponentTypeRequest,
  output: UpdateComponentTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates an entity.
 */
export const updateEntity: (
  input: UpdateEntityRequest,
) => effect.Effect<
  UpdateEntityResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEntityRequest,
  output: UpdateEntityResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Update the pricing plan.
 */
export const updatePricingPlan: (
  input: UpdatePricingPlanRequest,
) => effect.Effect<
  UpdatePricingPlanResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePricingPlanRequest,
  output: UpdatePricingPlanResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a scene.
 */
export const updateScene: (
  input: UpdateSceneRequest,
) => effect.Effect<
  UpdateSceneResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSceneRequest,
  output: UpdateSceneResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a workspace.
 */
export const updateWorkspace: (
  input: UpdateWorkspaceRequest,
) => effect.Effect<
  UpdateWorkspaceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceRequest,
  output: UpdateWorkspaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
