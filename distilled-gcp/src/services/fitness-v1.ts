// ==========================================================================
// Fitness API (fitness v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "fitness",
  version: "v1",
  rootUrl: "https://fitness.googleapis.com/",
  servicePath: "fitness/v1/users/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DataTypeField {
  /** Defines the name and format of data. Unlike data type names, field names are not namespaced, and only need to be unique within the data type. */
  name?: string;
  /** The different supported formats for each field in a data type. */
  format?: "integer" | "floatPoint" | "string" | "map" | "integerList" | "floatList" | "blob" | (string & {});
  optional?: boolean;
}

export const DataTypeField: Schema.Schema<DataTypeField> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  optional: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DataTypeField" }) as any as Schema.Schema<DataTypeField>;

export interface DataType {
  /** Each data type has a unique, namespaced, name. All data types in the com.google namespace are shared as part of the platform. */
  name?: string;
  /** A field represents one dimension of a data type. */
  field?: Array<DataTypeField>;
}

export const DataType: Schema.Schema<DataType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  field: Schema.optional(Schema.Array(DataTypeField)),
})).annotate({ identifier: "DataType" }) as any as Schema.Schema<DataType>;

export interface Device {
  /** The serial number or other unique ID for the hardware. This field is obfuscated when read by any REST or Android client that did not create the data source. Only the data source creator will see the uid field in clear and normal form. The obfuscation preserves equality; that is, given two IDs, if id1 == id2, obfuscated(id1) == obfuscated(id2). */
  uid?: string;
  /** A constant representing the type of the device. */
  type?: "unknown" | "phone" | "tablet" | "watch" | "chestStrap" | "scale" | "headMounted" | "smartDisplay" | (string & {});
  /** Version string for the device hardware/software. */
  version?: string;
  /** End-user visible model name for the device. */
  model?: string;
  /** Manufacturer of the product/hardware. */
  manufacturer?: string;
}

export const Device: Schema.Schema<Device> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
})).annotate({ identifier: "Device" }) as any as Schema.Schema<Device>;

export interface Application {
  /** Package name for this application. This is used as a unique identifier when created by Android applications, but cannot be specified by REST clients. REST clients will have their developer project number reflected into the Data Source data stream IDs, instead of the packageName. */
  packageName?: string;
  /** Version of the application. You should update this field whenever the application changes in a way that affects the computation of the data. */
  version?: string;
  /** An optional URI that can be used to link back to the application. */
  detailsUrl?: string;
  /** The name of this application. This is required for REST clients, but we do not enforce uniqueness of this name. It is provided as a matter of convenience for other developers who would like to identify which REST created an Application or Data Source. */
  name?: string;
}

export const Application: Schema.Schema<Application> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  detailsUrl: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface DataSource {
  /** A unique identifier for the data stream produced by this data source. The identifier includes: - The physical device's manufacturer, model, and serial number (UID). - The application's package name or name. Package name is used when the data source was created by an Android application. The developer project number is used when the data source was created by a REST client. - The data source's type. - The data source's stream name. Note that not all attributes of the data source are used as part of the stream identifier. In particular, the version of the hardware/the application isn't used. This allows us to preserve the same stream through version updates. This also means that two DataSource objects may represent the same data stream even if they're not equal. The exact format of the data stream ID created by an Android application is: type:dataType.name:application.packageName:device.manufacturer:device.model:device.uid:dataStreamName The exact format of the data stream ID created by a REST client is: type:dataType.name:developer project number:device.manufacturer:device.model:device.uid:dataStreamName When any of the optional fields that make up the data stream ID are absent, they will be omitted from the data stream ID. The minimum viable data stream ID would be: type:dataType.name:developer project number Finally, the developer project number and device UID are obfuscated when read by any REST or Android client that did not create the data source. Only the data source creator will see the developer project number in clear and normal form. This means a client will see a different set of data_stream_ids than another client with different credentials. */
  dataStreamId?: string;
  /** An end-user visible name for this data source. */
  name?: string;
  /** The stream name uniquely identifies this particular data source among other data sources of the same type from the same underlying producer. Setting the stream name is optional, but should be done whenever an application exposes two streams for the same data type, or when a device has two equivalent sensors. */
  dataStreamName?: string;
  /** A constant describing the type of this data source. Indicates whether this data source produces raw or derived data. */
  type?: "raw" | "derived" | (string & {});
  /** The data type defines the schema for a stream of data being collected by, inserted into, or queried from the Fitness API. */
  dataType?: DataType;
  /** Representation of an integrated device (such as a phone or a wearable) that can hold sensors. */
  device?: Device;
  /** Information about an application which feeds sensor data into the platform. */
  application?: Application;
  /** DO NOT POPULATE THIS FIELD. It is never populated in responses from the platform, and is ignored in queries. It will be removed in a future version entirely. */
  dataQualityStandard?: Array<"dataQualityUnknown" | "dataQualityBloodPressureEsh2002" | "dataQualityBloodPressureEsh2010" | "dataQualityBloodPressureAami" | "dataQualityBloodPressureBhsAA" | "dataQualityBloodPressureBhsAB" | "dataQualityBloodPressureBhsBA" | "dataQualityBloodPressureBhsBB" | "dataQualityBloodGlucoseIso151972003" | "dataQualityBloodGlucoseIso151972013" | (string & {})>;
}

export const DataSource: Schema.Schema<DataSource> = Schema.suspend(() => Schema.Struct({
  dataStreamId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  dataStreamName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  dataType: Schema.optional(DataType),
  device: Schema.optional(Device),
  application: Schema.optional(Application),
  dataQualityStandard: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DataSource" }) as any as Schema.Schema<DataSource>;

export interface ListDataSourcesResponse {
  /** A previously created data source. */
  dataSource?: Array<DataSource>;
}

export const ListDataSourcesResponse: Schema.Schema<ListDataSourcesResponse> = Schema.suspend(() => Schema.Struct({
  dataSource: Schema.optional(Schema.Array(DataSource)),
})).annotate({ identifier: "ListDataSourcesResponse" }) as any as Schema.Schema<ListDataSourcesResponse>;

export interface MapValue {
  /** Floating point value. */
  fpVal?: number;
}

export const MapValue: Schema.Schema<MapValue> = Schema.suspend(() => Schema.Struct({
  fpVal: Schema.optional(Schema.Number),
})).annotate({ identifier: "MapValue" }) as any as Schema.Schema<MapValue>;

export interface ValueMapValEntry {
  key?: string;
  value?: MapValue;
}

export const ValueMapValEntry: Schema.Schema<ValueMapValEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(MapValue),
})).annotate({ identifier: "ValueMapValEntry" }) as any as Schema.Schema<ValueMapValEntry>;

export interface Value {
  /** Integer value. When this is set, other values must not be set. */
  intVal?: number;
  /** Floating point value. When this is set, other values must not be set. */
  fpVal?: number;
  /** String value. When this is set, other values must not be set. Strings should be kept small whenever possible. Data streams with large string values and high data frequency may be down sampled. */
  stringVal?: string;
  /** Map value. The valid key space and units for the corresponding value of each entry should be documented as part of the data type definition. Keys should be kept small whenever possible. Data streams with large keys and high data frequency may be down sampled. */
  mapVal?: Array<ValueMapValEntry>;
}

export const Value: Schema.Schema<Value> = Schema.suspend(() => Schema.Struct({
  intVal: Schema.optional(Schema.Number),
  fpVal: Schema.optional(Schema.Number),
  stringVal: Schema.optional(Schema.String),
  mapVal: Schema.optional(Schema.Array(ValueMapValEntry)),
})).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface DataPoint {
  /** The start time of the interval represented by this data point, in nanoseconds since epoch. */
  startTimeNanos?: string;
  /** The end time of the interval represented by this data point, in nanoseconds since epoch. */
  endTimeNanos?: string;
  /** The data type defining the format of the values in this data point. */
  dataTypeName?: string;
  /** If the data point is contained in a dataset for a derived data source, this field will be populated with the data source stream ID that created the data point originally. WARNING: do not rely on this field for anything other than debugging. The value of this field, if it is set at all, is an implementation detail and is not guaranteed to remain consistent. */
  originDataSourceId?: string;
  /** Values of each data type field for the data point. It is expected that each value corresponding to a data type field will occur in the same order that the field is listed with in the data type specified in a data source. Only one of integer and floating point fields will be populated, depending on the format enum value within data source's type field. */
  value?: Array<Value>;
  /** Indicates the last time this data point was modified. Useful only in contexts where we are listing the data changes, rather than representing the current state of the data. */
  modifiedTimeMillis?: string;
  /** The raw timestamp from the original SensorEvent. */
  rawTimestampNanos?: string;
  /** DO NOT USE THIS FIELD. It is ignored, and not stored. */
  computationTimeMillis?: string;
}

export const DataPoint: Schema.Schema<DataPoint> = Schema.suspend(() => Schema.Struct({
  startTimeNanos: Schema.optional(Schema.String),
  endTimeNanos: Schema.optional(Schema.String),
  dataTypeName: Schema.optional(Schema.String),
  originDataSourceId: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Value)),
  modifiedTimeMillis: Schema.optional(Schema.String),
  rawTimestampNanos: Schema.optional(Schema.String),
  computationTimeMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "DataPoint" }) as any as Schema.Schema<DataPoint>;

export interface Dataset {
  /** The smallest start time of all data points in this possibly partial representation of the dataset. Time is in nanoseconds from epoch. This should also match the first part of the dataset identifier. */
  minStartTimeNs?: string;
  /** The largest end time of all data points in this possibly partial representation of the dataset. Time is in nanoseconds from epoch. This should also match the second part of the dataset identifier. */
  maxEndTimeNs?: string;
  /** The data stream ID of the data source that created the points in this dataset. */
  dataSourceId?: string;
  /** A partial list of data points contained in the dataset, ordered by endTimeNanos. This list is considered complete when retrieving a small dataset and partial when patching a dataset or retrieving a dataset that is too large to include in a single response. */
  point?: Array<DataPoint>;
  /** This token will be set when a dataset is received in response to a GET request and the dataset is too large to be included in a single response. Provide this value in a subsequent GET request to return the next page of data points within this dataset. */
  nextPageToken?: string;
}

export const Dataset: Schema.Schema<Dataset> = Schema.suspend(() => Schema.Struct({
  minStartTimeNs: Schema.optional(Schema.String),
  maxEndTimeNs: Schema.optional(Schema.String),
  dataSourceId: Schema.optional(Schema.String),
  point: Schema.optional(Schema.Array(DataPoint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Dataset" }) as any as Schema.Schema<Dataset>;

export interface AggregateBy {
  /** The data type to aggregate. All data sources providing this data type will contribute data to the aggregation. The response will contain a single dataset for this data type name. The dataset will have a data source ID of derived::com.google.android.gms:aggregated. If the user has no data for this data type, an empty data set will be returned. Note: Data can be aggregated by either the dataTypeName or the dataSourceId, not both. */
  dataTypeName?: string;
  /** A data source ID to aggregate. Only data from the specified data source ID will be included in the aggregation. If specified, this data source must exist; the OAuth scopes in the supplied credentials must grant read access to this data type. The dataset in the response will have the same data source ID. Note: Data can be aggregated by either the dataTypeName or the dataSourceId, not both. */
  dataSourceId?: string;
}

export const AggregateBy: Schema.Schema<AggregateBy> = Schema.suspend(() => Schema.Struct({
  dataTypeName: Schema.optional(Schema.String),
  dataSourceId: Schema.optional(Schema.String),
})).annotate({ identifier: "AggregateBy" }) as any as Schema.Schema<AggregateBy>;

export interface BucketByTimePeriod {
  type?: "day" | "week" | "month" | (string & {});
  value?: number;
  /** org.joda.timezone.DateTimeZone */
  timeZoneId?: string;
}

export const BucketByTimePeriod: Schema.Schema<BucketByTimePeriod> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
  timeZoneId: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketByTimePeriod" }) as any as Schema.Schema<BucketByTimePeriod>;

export interface BucketByTime {
  /** Specifies that result buckets aggregate data by exactly durationMillis time frames. Time frames that contain no data will be included in the response with an empty dataset. */
  durationMillis?: string;
  period?: BucketByTimePeriod;
}

export const BucketByTime: Schema.Schema<BucketByTime> = Schema.suspend(() => Schema.Struct({
  durationMillis: Schema.optional(Schema.String),
  period: Schema.optional(BucketByTimePeriod),
})).annotate({ identifier: "BucketByTime" }) as any as Schema.Schema<BucketByTime>;

export interface BucketBySession {
  /** Specifies that only sessions of duration longer than minDurationMillis are considered and used as a container for aggregated data. */
  minDurationMillis?: string;
}

export const BucketBySession: Schema.Schema<BucketBySession> = Schema.suspend(() => Schema.Struct({
  minDurationMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketBySession" }) as any as Schema.Schema<BucketBySession>;

export interface BucketByActivity {
  /** Specifies that only activity segments of duration longer than minDurationMillis are considered and used as a container for aggregated data. */
  minDurationMillis?: string;
  /** The default activity stream will be used if a specific activityDataSourceId is not specified. */
  activityDataSourceId?: string;
}

export const BucketByActivity: Schema.Schema<BucketByActivity> = Schema.suspend(() => Schema.Struct({
  minDurationMillis: Schema.optional(Schema.String),
  activityDataSourceId: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketByActivity" }) as any as Schema.Schema<BucketByActivity>;

export interface AggregateRequest {
  /** The start of a window of time. Data that intersects with this time window will be aggregated. The time is in milliseconds since epoch, inclusive. */
  startTimeMillis?: string;
  /** The end of a window of time. Data that intersects with this time window will be aggregated. The time is in milliseconds since epoch, inclusive. The maximum allowed difference between start_time_millis // and end_time_millis is 7776000000 (roughly 90 days). */
  endTimeMillis?: string;
  /** The specification of data to be aggregated. At least one aggregateBy spec must be provided. All data that is specified will be aggregated using the same bucketing criteria. There will be one dataset in the response for every aggregateBy spec. */
  aggregateBy?: Array<AggregateBy>;
  /** DO NOT POPULATE THIS FIELD. It is ignored. */
  filteredDataQualityStandard?: Array<"dataQualityUnknown" | "dataQualityBloodPressureEsh2002" | "dataQualityBloodPressureEsh2010" | "dataQualityBloodPressureAami" | "dataQualityBloodPressureBhsAA" | "dataQualityBloodPressureBhsAB" | "dataQualityBloodPressureBhsBA" | "dataQualityBloodPressureBhsBB" | "dataQualityBloodGlucoseIso151972003" | "dataQualityBloodGlucoseIso151972013" | (string & {})>;
  /** Specifies that data be aggregated by a single time interval. Mutually exclusive of other bucketing specifications. */
  bucketByTime?: BucketByTime;
  /** Specifies that data be aggregated by user sessions. Data that does not fall within the time range of a session will not be included in the response. Mutually exclusive of other bucketing specifications. */
  bucketBySession?: BucketBySession;
  /** Specifies that data be aggregated by the type of activity being performed when the data was recorded. All data that was recorded during a certain activity type (.for the given time range) will be aggregated into the same bucket. Data that was recorded while the user was not active will not be included in the response. Mutually exclusive of other bucketing specifications. */
  bucketByActivityType?: BucketByActivity;
  /** Specifies that data be aggregated each activity segment recorded for a user. Similar to bucketByActivitySegment, but bucketing is done for each activity segment rather than all segments of the same type. Mutually exclusive of other bucketing specifications. */
  bucketByActivitySegment?: BucketByActivity;
}

export const AggregateRequest: Schema.Schema<AggregateRequest> = Schema.suspend(() => Schema.Struct({
  startTimeMillis: Schema.optional(Schema.String),
  endTimeMillis: Schema.optional(Schema.String),
  aggregateBy: Schema.optional(Schema.Array(AggregateBy)),
  filteredDataQualityStandard: Schema.optional(Schema.Array(Schema.String)),
  bucketByTime: Schema.optional(BucketByTime),
  bucketBySession: Schema.optional(BucketBySession),
  bucketByActivityType: Schema.optional(BucketByActivity),
  bucketByActivitySegment: Schema.optional(BucketByActivity),
})).annotate({ identifier: "AggregateRequest" }) as any as Schema.Schema<AggregateRequest>;

export interface Session {
  /** A client-generated identifier that is unique across all sessions owned by this particular user. */
  id?: string;
  /** A human readable name of the session. */
  name?: string;
  /** A description for this session. */
  description?: string;
  /** A start time, in milliseconds since epoch, inclusive. */
  startTimeMillis?: string;
  /** An end time, in milliseconds since epoch, inclusive. */
  endTimeMillis?: string;
  /** A timestamp that indicates when the session was last modified. */
  modifiedTimeMillis?: string;
  /** The application that created the session. */
  application?: Application;
  /** The type of activity this session represents. */
  activityType?: number;
  /** Session active time. While start_time_millis and end_time_millis define the full session time, the active time can be shorter and specified by active_time_millis. If the inactive time during the session is known, it should also be inserted via a com.google.activity.segment data point with a STILL activity value */
  activeTimeMillis?: string;
}

export const Session: Schema.Schema<Session> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  startTimeMillis: Schema.optional(Schema.String),
  endTimeMillis: Schema.optional(Schema.String),
  modifiedTimeMillis: Schema.optional(Schema.String),
  application: Schema.optional(Application),
  activityType: Schema.optional(Schema.Number),
  activeTimeMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "Session" }) as any as Schema.Schema<Session>;

export interface AggregateBucket {
  /** The type of a bucket signifies how the data aggregation is performed in the bucket. */
  type?: "unknown" | "time" | "session" | "activityType" | "activitySegment" | (string & {});
  /** The start time for the aggregated data, in milliseconds since epoch, inclusive. */
  startTimeMillis?: string;
  /** The end time for the aggregated data, in milliseconds since epoch, inclusive. */
  endTimeMillis?: string;
  /** There will be one dataset per AggregateBy in the request. */
  dataset?: Array<Dataset>;
  /** Available for Bucket.Type.SESSION */
  session?: Session;
  /** Available for Bucket.Type.ACTIVITY_TYPE, Bucket.Type.ACTIVITY_SEGMENT */
  activity?: number;
}

export const AggregateBucket: Schema.Schema<AggregateBucket> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  startTimeMillis: Schema.optional(Schema.String),
  endTimeMillis: Schema.optional(Schema.String),
  dataset: Schema.optional(Schema.Array(Dataset)),
  session: Schema.optional(Session),
  activity: Schema.optional(Schema.Number),
})).annotate({ identifier: "AggregateBucket" }) as any as Schema.Schema<AggregateBucket>;

export interface AggregateResponse {
  /** A list of buckets containing the aggregated data. */
  bucket?: Array<AggregateBucket>;
}

export const AggregateResponse: Schema.Schema<AggregateResponse> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.Array(AggregateBucket)),
})).annotate({ identifier: "AggregateResponse" }) as any as Schema.Schema<AggregateResponse>;

export interface ListSessionsResponse {
  /** Sessions starting before endTime of the request and ending after startTime of the request up to (endTime of the request + 1 day). */
  session?: Array<Session>;
  /** If includeDeleted is set to true in the request, and startTime and endTime are omitted, this will include sessions which were deleted since the last sync. */
  deletedSession?: Array<Session>;
  /** The sync token which is used to sync further changes. This will only be provided if both startTime and endTime are omitted from the request. */
  nextPageToken?: string;
  /** Flag to indicate server has more data to transfer. DO NOT USE THIS FIELD. It is never populated in responses from the server. */
  hasMoreData?: boolean;
}

export const ListSessionsResponse: Schema.Schema<ListSessionsResponse> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.Array(Session)),
  deletedSession: Schema.optional(Schema.Array(Session)),
  nextPageToken: Schema.optional(Schema.String),
  hasMoreData: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ListSessionsResponse" }) as any as Schema.Schema<ListSessionsResponse>;

export interface ListDataPointChangesResponse {
  /** Inserted data points for the user. */
  insertedDataPoint?: Array<DataPoint>;
  /** Deleted data points for the user. Note, for modifications this should be parsed before handling insertions. */
  deletedDataPoint?: Array<DataPoint>;
  /** The continuation token, which is used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
  /** The data stream ID of the data source with data point changes. */
  dataSourceId?: string;
}

export const ListDataPointChangesResponse: Schema.Schema<ListDataPointChangesResponse> = Schema.suspend(() => Schema.Struct({
  insertedDataPoint: Schema.optional(Schema.Array(DataPoint)),
  deletedDataPoint: Schema.optional(Schema.Array(DataPoint)),
  nextPageToken: Schema.optional(Schema.String),
  dataSourceId: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDataPointChangesResponse" }) as any as Schema.Schema<ListDataPointChangesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a new data source that is unique across all data sources belonging to this user. A data source is a unique source of sensor data. Data sources can expose raw data coming from hardware sensors on local or companion devices. They can also expose derived data, created by transforming or merging other data sources. Multiple data sources can exist for the same data type. Every data point in every dataset inserted into or read from the Fitness API has an associated data source. Each data source produces a unique stream of dataset updates, with a unique data source identifier. Not all changes to data source affect the data stream ID, so that data collected by updated versions of the same application/device can still be considered to belong to the same data source. Data sources are identified using a string generated by the server, based on the contents of the source being created. The dataStreamId field should not be set when invoking this method. It will be automatically generated by the server with the correct format. If a dataStreamId is set, it must match the format that the server would generate. This format is a combination of some fields from the data source, and has a specific order. If it doesn't match, the request will fail with an error. Specifying a DataType which is not a known type (beginning with "com.google.") will create a DataSource with a *custom data type*. Custom data types are only readable by the application that created them. Custom data types are *deprecated*; use standard data types instead. In addition to the data source fields included in the data source ID, the developer project number that is authenticated when creating the data source is included. This developer project number is obfuscated when read by any other developer reading public data types. */
export interface CreateUsersDataSourcesRequest {
  /** Create the data source for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** Request body */
  body?: DataSource;
}

export const CreateUsersDataSourcesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{userId}/dataSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUsersDataSourcesRequest>;

export type CreateUsersDataSourcesResponse = DataSource;
export const CreateUsersDataSourcesResponse = DataSource;

export type CreateUsersDataSourcesError = CommonErrors;

export const createUsersDataSources: API.OperationMethod<CreateUsersDataSourcesRequest, CreateUsersDataSourcesResponse, CreateUsersDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateUsersDataSourcesRequest,
  output: CreateUsersDataSourcesResponse,
  errors: [],
}));

/** Lists all data sources that are visible to the developer, using the OAuth scopes provided. The list is not exhaustive; the user may have private data sources that are only visible to other developers, or calls using other scopes. */
export interface ListUsersDataSourcesRequest {
  /** List data sources for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The names of data types to include in the list. If not specified, all data sources will be returned. */
  dataTypeName?: string[];
}

export const ListUsersDataSourcesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataTypeName: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("dataTypeName")),
}).pipe(
  T.Http({ method: "GET", path: "{userId}/dataSources" }),
  svc,
) as unknown as Schema.Schema<ListUsersDataSourcesRequest>;

export type ListUsersDataSourcesResponse = ListDataSourcesResponse;
export const ListUsersDataSourcesResponse = ListDataSourcesResponse;

export type ListUsersDataSourcesError = CommonErrors;

export const listUsersDataSources: API.OperationMethod<ListUsersDataSourcesRequest, ListUsersDataSourcesResponse, ListUsersDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListUsersDataSourcesRequest,
  output: ListUsersDataSourcesResponse,
  errors: [],
}));

/** Updates the specified data source. The dataStreamId, dataType, type, dataStreamName, and device properties with the exception of version, cannot be modified. Data sources are identified by their dataStreamId. */
export interface UpdateUsersDataSourcesRequest {
  /** Update the data source for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source to update. */
  dataSourceId: string;
  /** Request body */
  body?: DataSource;
}

export const UpdateUsersDataSourcesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{userId}/dataSources/{dataSourceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUsersDataSourcesRequest>;

export type UpdateUsersDataSourcesResponse = DataSource;
export const UpdateUsersDataSourcesResponse = DataSource;

export type UpdateUsersDataSourcesError = CommonErrors;

export const updateUsersDataSources: API.OperationMethod<UpdateUsersDataSourcesRequest, UpdateUsersDataSourcesResponse, UpdateUsersDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUsersDataSourcesRequest,
  output: UpdateUsersDataSourcesResponse,
  errors: [],
}));

/** Returns the specified data source. */
export interface GetUsersDataSourcesRequest {
  /** Retrieve a data source for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source to retrieve. */
  dataSourceId: string;
}

export const GetUsersDataSourcesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
}).pipe(
  T.Http({ method: "GET", path: "{userId}/dataSources/{dataSourceId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersDataSourcesRequest>;

export type GetUsersDataSourcesResponse = DataSource;
export const GetUsersDataSourcesResponse = DataSource;

export type GetUsersDataSourcesError = CommonErrors;

export const getUsersDataSources: API.OperationMethod<GetUsersDataSourcesRequest, GetUsersDataSourcesResponse, GetUsersDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersDataSourcesRequest,
  output: GetUsersDataSourcesResponse,
  errors: [],
}));

/** Deletes the specified data source. The request will fail if the data source contains any data points. */
export interface DeleteUsersDataSourcesRequest {
  /** Retrieve a data source for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source to delete. */
  dataSourceId: string;
}

export const DeleteUsersDataSourcesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{userId}/dataSources/{dataSourceId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersDataSourcesRequest>;

export type DeleteUsersDataSourcesResponse = DataSource;
export const DeleteUsersDataSourcesResponse = DataSource;

export type DeleteUsersDataSourcesError = CommonErrors;

export const deleteUsersDataSources: API.OperationMethod<DeleteUsersDataSourcesRequest, DeleteUsersDataSourcesResponse, DeleteUsersDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersDataSourcesRequest,
  output: DeleteUsersDataSourcesResponse,
  errors: [],
}));

/** Adds data points to a dataset. The dataset need not be previously created. All points within the given dataset will be returned with subsquent calls to retrieve this dataset. Data points can belong to more than one dataset. This method does not use patch semantics: the data points provided are merely inserted, with no existing data replaced. */
export interface PatchUsersDataSourcesDatasetsRequest {
  /** Patch a dataset for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source that created the dataset. */
  dataSourceId: string;
  /** This field is not used, and can be safely omitted. */
  datasetId: string;
  /** Request body */
  body?: Dataset;
}

export const PatchUsersDataSourcesDatasetsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "{userId}/dataSources/{dataSourceId}/datasets/{datasetId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersDataSourcesDatasetsRequest>;

export type PatchUsersDataSourcesDatasetsResponse = Dataset;
export const PatchUsersDataSourcesDatasetsResponse = Dataset;

export type PatchUsersDataSourcesDatasetsError = CommonErrors;

export const patchUsersDataSourcesDatasets: API.OperationMethod<PatchUsersDataSourcesDatasetsRequest, PatchUsersDataSourcesDatasetsResponse, PatchUsersDataSourcesDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersDataSourcesDatasetsRequest,
  output: PatchUsersDataSourcesDatasetsResponse,
  errors: [],
}));

/** Returns a dataset containing all data points whose start and end times overlap with the specified range of the dataset minimum start time and maximum end time. Specifically, any data point whose start time is less than or equal to the dataset end time and whose end time is greater than or equal to the dataset start time. */
export interface GetUsersDataSourcesDatasetsRequest {
  /** Retrieve a dataset for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source that created the dataset. */
  dataSourceId: string;
  /** Dataset identifier that is a composite of the minimum data point start time and maximum data point end time represented as nanoseconds from the epoch. The ID is formatted like: "startTime-endTime" where startTime and endTime are 64 bit integers. */
  datasetId: string;
  /** The continuation token, which is used to page through large datasets. To get the next page of a dataset, set this parameter to the value of nextPageToken from the previous response. Each subsequent call will yield a partial dataset with data point end timestamps that are strictly smaller than those in the previous partial response. */
  pageToken?: string;
  /** If specified, no more than this many data points will be included in the dataset. If there are more data points in the dataset, nextPageToken will be set in the dataset response. The limit is applied from the end of the time range. That is, if pageToken is absent, the limit most recent data points will be returned. */
  limit?: number;
}

export const GetUsersDataSourcesDatasetsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
}).pipe(
  T.Http({ method: "GET", path: "{userId}/dataSources/{dataSourceId}/datasets/{datasetId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersDataSourcesDatasetsRequest>;

export type GetUsersDataSourcesDatasetsResponse = Dataset;
export const GetUsersDataSourcesDatasetsResponse = Dataset;

export type GetUsersDataSourcesDatasetsError = CommonErrors;

export const getUsersDataSourcesDatasets = API.makePaginated(() => ({
  input: GetUsersDataSourcesDatasetsRequest,
  output: GetUsersDataSourcesDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Performs an inclusive delete of all data points whose start and end times have any overlap with the time range specified by the dataset ID. For most data types, the entire data point will be deleted. For data types where the time span represents a consistent value (such as com.google.activity.segment), and a data point straddles either end point of the dataset, only the overlapping portion of the data point will be deleted. */
export interface DeleteUsersDataSourcesDatasetsRequest {
  /** Delete a dataset for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source that created the dataset. */
  dataSourceId: string;
  /** Dataset identifier that is a composite of the minimum data point start time and maximum data point end time represented as nanoseconds from the epoch. The ID is formatted like: "startTime-endTime" where startTime and endTime are 64 bit integers. */
  datasetId: string;
}

export const DeleteUsersDataSourcesDatasetsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{userId}/dataSources/{dataSourceId}/datasets/{datasetId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersDataSourcesDatasetsRequest>;

export interface DeleteUsersDataSourcesDatasetsResponse {}
export const DeleteUsersDataSourcesDatasetsResponse: Schema.Schema<DeleteUsersDataSourcesDatasetsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersDataSourcesDatasetsResponse>;

export type DeleteUsersDataSourcesDatasetsError = CommonErrors;

export const deleteUsersDataSourcesDatasets: API.OperationMethod<DeleteUsersDataSourcesDatasetsRequest, DeleteUsersDataSourcesDatasetsResponse, DeleteUsersDataSourcesDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersDataSourcesDatasetsRequest,
  output: DeleteUsersDataSourcesDatasetsResponse,
  errors: [],
}));

/** Queries for user's data point changes for a particular data source. */
export interface ListUsersDataSourcesDataPointChangesRequest {
  /** List data points for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The data stream ID of the data source that created the dataset. */
  dataSourceId: string;
  /** The continuation token, which is used to page through large result sets. To get the next page of results, set this parameter to the value of nextPageToken from the previous response. */
  pageToken?: string;
  /** If specified, no more than this many data point changes will be included in the response. */
  limit?: number;
}

export const ListUsersDataSourcesDataPointChangesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  dataSourceId: Schema.String.pipe(T.HttpPath("dataSourceId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
}).pipe(
  T.Http({ method: "GET", path: "{userId}/dataSources/{dataSourceId}/dataPointChanges" }),
  svc,
) as unknown as Schema.Schema<ListUsersDataSourcesDataPointChangesRequest>;

export type ListUsersDataSourcesDataPointChangesResponse = ListDataPointChangesResponse;
export const ListUsersDataSourcesDataPointChangesResponse = ListDataPointChangesResponse;

export type ListUsersDataSourcesDataPointChangesError = CommonErrors;

export const listUsersDataSourcesDataPointChanges = API.makePaginated(() => ({
  input: ListUsersDataSourcesDataPointChangesRequest,
  output: ListUsersDataSourcesDataPointChangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Aggregates data of a certain type or stream into buckets divided by a given type of boundary. Multiple data sets of multiple types and from multiple sources can be aggregated into exactly one bucket type per request. */
export interface AggregateUsersDatasetRequest {
  /** Aggregate data for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** Request body */
  body?: AggregateRequest;
}

export const AggregateUsersDatasetRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(AggregateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{userId}/dataset:aggregate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AggregateUsersDatasetRequest>;

export type AggregateUsersDatasetResponse = AggregateResponse;
export const AggregateUsersDatasetResponse = AggregateResponse;

export type AggregateUsersDatasetError = CommonErrors;

export const aggregateUsersDataset: API.OperationMethod<AggregateUsersDatasetRequest, AggregateUsersDatasetResponse, AggregateUsersDatasetError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AggregateUsersDatasetRequest,
  output: AggregateUsersDatasetResponse,
  errors: [],
}));

/** Updates or insert a given session. */
export interface UpdateUsersSessionsRequest {
  /** Create sessions for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The ID of the session to be created. */
  sessionId: string;
  /** Request body */
  body?: Session;
}

export const UpdateUsersSessionsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  body: Schema.optional(Session).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{userId}/sessions/{sessionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUsersSessionsRequest>;

export type UpdateUsersSessionsResponse = Session;
export const UpdateUsersSessionsResponse = Session;

export type UpdateUsersSessionsError = CommonErrors;

export const updateUsersSessions: API.OperationMethod<UpdateUsersSessionsRequest, UpdateUsersSessionsResponse, UpdateUsersSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUsersSessionsRequest,
  output: UpdateUsersSessionsResponse,
  errors: [],
}));

/** Lists sessions previously created. */
export interface ListUsersSessionsRequest {
  /** List sessions for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** An RFC3339 timestamp. Only sessions starting before endTime and ending after startTime up to (endTime + 1 day) will be included in the response. If this time is omitted but endTime is specified, all sessions starting before endTime and ending after the start of time up to (endTime + 1 day) will be returned. */
  startTime?: string;
  /** An RFC3339 timestamp. Only sessions starting before endTime and ending after startTime up to (endTime + 1 day) will be included in the response. If this time is omitted but startTime is specified, all sessions ending after startTime to the end of time will be returned. */
  endTime?: string;
  /** If true, and if both startTime and endTime are omitted, session deletions will be returned. */
  includeDeleted?: boolean;
  /** The continuation token, which is used for incremental syncing. To get the next batch of changes, set this parameter to the value of nextPageToken from the previous response. The page token is ignored if either start or end time is specified. If none of start time, end time, and the page token is specified, sessions modified in the last 30 days are returned. */
  pageToken?: string;
  /** If non-empty, only sessions with these activity types should be returned. */
  activityType?: number[];
}

export const ListUsersSessionsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  activityType: Schema.optional(Schema.Array(Schema.Number)).pipe(T.HttpQuery("activityType")),
}).pipe(
  T.Http({ method: "GET", path: "{userId}/sessions" }),
  svc,
) as unknown as Schema.Schema<ListUsersSessionsRequest>;

export type ListUsersSessionsResponse = ListSessionsResponse;
export const ListUsersSessionsResponse = ListSessionsResponse;

export type ListUsersSessionsError = CommonErrors;

export const listUsersSessions = API.makePaginated(() => ({
  input: ListUsersSessionsRequest,
  output: ListUsersSessionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a session specified by the given session ID. */
export interface DeleteUsersSessionsRequest {
  /** Delete a session for the person identified. Use me to indicate the authenticated user. Only me is supported at this time. */
  userId: string;
  /** The ID of the session to be deleted. */
  sessionId: string;
}

export const DeleteUsersSessionsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{userId}/sessions/{sessionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersSessionsRequest>;

export interface DeleteUsersSessionsResponse {}
export const DeleteUsersSessionsResponse: Schema.Schema<DeleteUsersSessionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersSessionsResponse>;

export type DeleteUsersSessionsError = CommonErrors;

export const deleteUsersSessions: API.OperationMethod<DeleteUsersSessionsRequest, DeleteUsersSessionsResponse, DeleteUsersSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersSessionsRequest,
  output: DeleteUsersSessionsResponse,
  errors: [],
}));

