// ==========================================================================
// Street View Publish API (streetviewpublish v1)
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
  name: "streetviewpublish",
  version: "v1",
  rootUrl: "https://streetviewpublish.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface UploadRef {
  /** An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}" */
  uploadUrl?: string;
}

export const UploadRef: Schema.Schema<UploadRef> = Schema.suspend(() => Schema.Struct({
  uploadUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "UploadRef" }) as any as Schema.Schema<UploadRef>;

export interface PhotoId {
  /** A unique identifier for a photo. */
  id?: string;
}

export const PhotoId: Schema.Schema<PhotoId> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "PhotoId" }) as any as Schema.Schema<PhotoId>;

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface Level {
  /** Optional. Floor number, used for ordering. 0 indicates the ground level, 1 indicates the first level above ground level, -1 indicates the first level under ground level. Non-integer values are OK. */
  number?: number;
  /** Required. A name assigned to this Level, restricted to 3 characters. Consider how the elevator buttons would be labeled for this level if there was an elevator. */
  name?: string;
}

export const Level: Schema.Schema<Level> = Schema.suspend(() => Schema.Struct({
  number: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Level" }) as any as Schema.Schema<Level>;

export interface Pose {
  /** Latitude and longitude pair of the pose, as explained here: https://cloud.google.com/datastore/docs/reference/rest/Shared.Types/LatLng When creating a Photo, if the latitude and longitude pair are not provided, the geolocation from the exif header is used. A latitude and longitude pair not provided in the photo or exif header causes the photo process to fail. */
  latLngPair?: LatLng;
  /** Altitude of the pose in meters above WGS84 ellipsoid. NaN indicates an unmeasured quantity. */
  altitude?: number;
  /** The following pose parameters pertain to the center of the photo. They match https://developers.google.com/streetview/spherical-metadata. Compass heading, measured at the center of the photo in degrees clockwise from North. Value must be >=0 and <360. NaN indicates an unmeasured quantity. */
  heading?: number;
  /** Pitch, measured at the center of the photo in degrees. Value must be >=-90 and <= 90. A value of -90 means looking directly down, and a value of 90 means looking directly up. NaN indicates an unmeasured quantity. */
  pitch?: number;
  /** Roll, measured in degrees. Value must be >= 0 and <360. A value of 0 means level with the horizon. NaN indicates an unmeasured quantity. */
  roll?: number;
  /** Time of the GPS record since UTC epoch. */
  gpsRecordTimestampUnixEpoch?: string;
  /** Level (the floor in a building) used to configure vertical navigation. */
  level?: Level;
  /** The estimated horizontal accuracy of this pose in meters with 68% confidence (one standard deviation). For example, on Android, this value is available from this method: https://developer.android.com/reference/android/location/Location#getAccuracy(). Other platforms have different methods of obtaining similar accuracy estimations. */
  accuracyMeters?: number;
}

export const Pose: Schema.Schema<Pose> = Schema.suspend(() => Schema.Struct({
  latLngPair: Schema.optional(LatLng),
  altitude: Schema.optional(Schema.Number),
  heading: Schema.optional(Schema.Number),
  pitch: Schema.optional(Schema.Number),
  roll: Schema.optional(Schema.Number),
  gpsRecordTimestampUnixEpoch: Schema.optional(Schema.String),
  level: Schema.optional(Level),
  accuracyMeters: Schema.optional(Schema.Number),
})).annotate({ identifier: "Pose" }) as any as Schema.Schema<Pose>;

export interface Connection {
  /** Required. The destination of the connection from the containing photo to another photo. */
  target?: PhotoId;
}

export const Connection: Schema.Schema<Connection> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(PhotoId),
})).annotate({ identifier: "Connection" }) as any as Schema.Schema<Connection>;

export interface Place {
  /** Place identifier, as described in https://developers.google.com/places/place-id. */
  placeId?: string;
  /** Output only. The name of the place, localized to the language_code. */
  name?: string;
  /** Output only. The language_code that the name is localized with. This should be the language_code specified in the request, but may be a fallback. */
  languageCode?: string;
}

export const Place: Schema.Schema<Place> = Schema.suspend(() => Schema.Struct({
  placeId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "Place" }) as any as Schema.Schema<Place>;

export interface Photo {
  /** Required. Output only. Required when updating a photo. Output only when creating a photo. Identifier for the photo, which is unique among all photos in Google. */
  photoId?: PhotoId;
  /** Input only. Required when creating a photo. Input only. The resource URL where the photo bytes are uploaded to. */
  uploadReference?: UploadRef;
  /** Output only. The download URL for the photo bytes. This field is set only when GetPhotoRequest.view is set to PhotoView.INCLUDE_DOWNLOAD_URL. */
  downloadUrl?: string;
  /** Output only. The thumbnail URL for showing a preview of the given photo. */
  thumbnailUrl?: string;
  /** Output only. The share link for the photo. */
  shareLink?: string;
  /** Optional. Pose of the photo. */
  pose?: Pose;
  /** Optional. Connections to other photos. A connection represents the link from this photo to another photo. */
  connections?: Array<Connection>;
  /** Optional. Absolute time when the photo was captured. When the photo has no exif timestamp, this is used to set a timestamp in the photo metadata. */
  captureTime?: string;
  /** Output only. Time when the image was uploaded. */
  uploadTime?: string;
  /** Optional. Places where this photo belongs. */
  places?: Array<Place>;
  /** Output only. View count of the photo. */
  viewCount?: string;
  /** Output only. Status of rights transfer on this photo. */
  transferStatus?: "TRANSFER_STATUS_UNKNOWN" | "NEVER_TRANSFERRED" | "PENDING" | "COMPLETED" | "REJECTED" | "EXPIRED" | "CANCELLED" | "RECEIVED_VIA_TRANSFER" | (string & {});
  /** Output only. Status in Google Maps, whether this photo was published or rejected. */
  mapsPublishStatus?: "UNSPECIFIED_MAPS_PUBLISH_STATUS" | "PUBLISHED" | "REJECTED_UNKNOWN" | (string & {});
}

export const Photo: Schema.Schema<Photo> = Schema.suspend(() => Schema.Struct({
  photoId: Schema.optional(PhotoId),
  uploadReference: Schema.optional(UploadRef),
  downloadUrl: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
  shareLink: Schema.optional(Schema.String),
  pose: Schema.optional(Pose),
  connections: Schema.optional(Schema.Array(Connection)),
  captureTime: Schema.optional(Schema.String),
  uploadTime: Schema.optional(Schema.String),
  places: Schema.optional(Schema.Array(Place)),
  viewCount: Schema.optional(Schema.String),
  transferStatus: Schema.optional(Schema.String),
  mapsPublishStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "Photo" }) as any as Schema.Schema<Photo>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface PhotoResponse {
  /** The status for the operation to get or update a single photo in the batch request. */
  status?: Status;
  /** The Photo resource, if the request was successful. */
  photo?: Photo;
}

export const PhotoResponse: Schema.Schema<PhotoResponse> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Status),
  photo: Schema.optional(Photo),
})).annotate({ identifier: "PhotoResponse" }) as any as Schema.Schema<PhotoResponse>;

export interface BatchGetPhotosResponse {
  /** List of results for each individual Photo requested, in the same order as the requests in BatchGetPhotos. */
  results?: Array<PhotoResponse>;
}

export const BatchGetPhotosResponse: Schema.Schema<BatchGetPhotosResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(PhotoResponse)),
})).annotate({ identifier: "BatchGetPhotosResponse" }) as any as Schema.Schema<BatchGetPhotosResponse>;

export interface ListPhotosResponse {
  /** List of photos. The pageSize field in the request determines the number of items returned. */
  photos?: Array<Photo>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListPhotosResponse: Schema.Schema<ListPhotosResponse> = Schema.suspend(() => Schema.Struct({
  photos: Schema.optional(Schema.Array(Photo)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPhotosResponse" }) as any as Schema.Schema<ListPhotosResponse>;

export interface UpdatePhotoRequest {
  /** Required. Photo object containing the new metadata. */
  photo?: Photo;
  /** Required. Mask that identifies fields on the photo metadata to update. If not present, the old Photo metadata is entirely replaced with the new Photo metadata in this request. The update fails if invalid fields are specified. Multiple fields can be specified in a comma-delimited list. The following fields are valid: * `pose.heading` * `pose.lat_lng_pair` * `pose.pitch` * `pose.roll` * `pose.level` * `pose.altitude` * `connections` * `places` > Note: When updateMask contains repeated fields, the entire set of repeated values get replaced with the new contents. For example, if updateMask contains `connections` and `UpdatePhotoRequest.photo.connections` is empty, all connections are removed. */
  updateMask?: string;
}

export const UpdatePhotoRequest: Schema.Schema<UpdatePhotoRequest> = Schema.suspend(() => Schema.Struct({
  photo: Schema.optional(Photo),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdatePhotoRequest" }) as any as Schema.Schema<UpdatePhotoRequest>;

export interface BatchUpdatePhotosRequest {
  /** Required. List of UpdatePhotoRequests. */
  updatePhotoRequests?: Array<UpdatePhotoRequest>;
}

export const BatchUpdatePhotosRequest: Schema.Schema<BatchUpdatePhotosRequest> = Schema.suspend(() => Schema.Struct({
  updatePhotoRequests: Schema.optional(Schema.Array(UpdatePhotoRequest)),
})).annotate({ identifier: "BatchUpdatePhotosRequest" }) as any as Schema.Schema<BatchUpdatePhotosRequest>;

export interface BatchUpdatePhotosResponse {
  /** List of results for each individual Photo updated, in the same order as the request. */
  results?: Array<PhotoResponse>;
}

export const BatchUpdatePhotosResponse: Schema.Schema<BatchUpdatePhotosResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(PhotoResponse)),
})).annotate({ identifier: "BatchUpdatePhotosResponse" }) as any as Schema.Schema<BatchUpdatePhotosResponse>;

export interface BatchDeletePhotosRequest {
  /** Required. IDs of the Photos. HTTP GET requests require the following syntax for the URL query parameter: `photoIds=&photoIds=&...`. */
  photoIds?: Array<string>;
}

export const BatchDeletePhotosRequest: Schema.Schema<BatchDeletePhotosRequest> = Schema.suspend(() => Schema.Struct({
  photoIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeletePhotosRequest" }) as any as Schema.Schema<BatchDeletePhotosRequest>;

export interface BatchDeletePhotosResponse {
  /** The status for the operation to delete a single Photo in the batch request. */
  status?: Array<Status>;
}

export const BatchDeletePhotosResponse: Schema.Schema<BatchDeletePhotosResponse> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "BatchDeletePhotosResponse" }) as any as Schema.Schema<BatchDeletePhotosResponse>;

export interface Measurement3d {
  /** The timestamp of the IMU measurement. */
  captureTime?: string;
  /** The sensor measurement in the x axis. */
  x?: number;
  /** The sensor measurement in the y axis. */
  y?: number;
  /** The sensor measurement in the z axis. */
  z?: number;
}

export const Measurement3d: Schema.Schema<Measurement3d> = Schema.suspend(() => Schema.Struct({
  captureTime: Schema.optional(Schema.String),
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
  z: Schema.optional(Schema.Number),
})).annotate({ identifier: "Measurement3d" }) as any as Schema.Schema<Measurement3d>;

export interface Imu {
  /** The accelerometer measurements in meters/sec^2 with increasing timestamps from devices. */
  accelMpsps?: Array<Measurement3d>;
  /** The gyroscope measurements in radians/sec with increasing timestamps from devices. */
  gyroRps?: Array<Measurement3d>;
  /** The magnetometer measurements of the magnetic field in microtesla (uT) with increasing timestamps from devices. */
  magUt?: Array<Measurement3d>;
}

export const Imu: Schema.Schema<Imu> = Schema.suspend(() => Schema.Struct({
  accelMpsps: Schema.optional(Schema.Array(Measurement3d)),
  gyroRps: Schema.optional(Schema.Array(Measurement3d)),
  magUt: Schema.optional(Schema.Array(Measurement3d)),
})).annotate({ identifier: "Imu" }) as any as Schema.Schema<Imu>;

export interface InsufficientGpsFailureDetails {
  /** The number of GPS points that were found in the video. */
  gpsPointsFound?: number;
}

export const InsufficientGpsFailureDetails: Schema.Schema<InsufficientGpsFailureDetails> = Schema.suspend(() => Schema.Struct({
  gpsPointsFound: Schema.optional(Schema.Number),
})).annotate({ identifier: "InsufficientGpsFailureDetails" }) as any as Schema.Schema<InsufficientGpsFailureDetails>;

export interface GpsDataGapFailureDetails {
  /** The duration of the gap in GPS data that was found. */
  gapDuration?: string;
  /** Relative time (from the start of the video stream) when the gap started. */
  gapStartTime?: string;
}

export const GpsDataGapFailureDetails: Schema.Schema<GpsDataGapFailureDetails> = Schema.suspend(() => Schema.Struct({
  gapDuration: Schema.optional(Schema.String),
  gapStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GpsDataGapFailureDetails" }) as any as Schema.Schema<GpsDataGapFailureDetails>;

export interface ImuDataGapFailureDetails {
  /** The duration of the gap in IMU data that was found. */
  gapDuration?: string;
  /** Relative time (from the start of the video stream) when the gap started. */
  gapStartTime?: string;
}

export const ImuDataGapFailureDetails: Schema.Schema<ImuDataGapFailureDetails> = Schema.suspend(() => Schema.Struct({
  gapDuration: Schema.optional(Schema.String),
  gapStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ImuDataGapFailureDetails" }) as any as Schema.Schema<ImuDataGapFailureDetails>;

export interface NotOutdoorsFailureDetails {
  /** Relative time (from the start of the video stream) when an indoor frame was found. */
  startTime?: string;
}

export const NotOutdoorsFailureDetails: Schema.Schema<NotOutdoorsFailureDetails> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "NotOutdoorsFailureDetails" }) as any as Schema.Schema<NotOutdoorsFailureDetails>;

export interface NoOverlapGpsFailureDetails {
  /** Time of first recorded GPS point. */
  gpsStartTime?: string;
  /** Time of last recorded GPS point. */
  gpsEndTime?: string;
  /** Start time of video. */
  videoStartTime?: string;
  /** End time of video. */
  videoEndTime?: string;
}

export const NoOverlapGpsFailureDetails: Schema.Schema<NoOverlapGpsFailureDetails> = Schema.suspend(() => Schema.Struct({
  gpsStartTime: Schema.optional(Schema.String),
  gpsEndTime: Schema.optional(Schema.String),
  videoStartTime: Schema.optional(Schema.String),
  videoEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "NoOverlapGpsFailureDetails" }) as any as Schema.Schema<NoOverlapGpsFailureDetails>;

export interface ProcessingFailureDetails {
  /** See InsufficientGpsFailureDetails. */
  insufficientGpsDetails?: InsufficientGpsFailureDetails;
  /** See GpsDataGapFailureDetails. */
  gpsDataGapDetails?: GpsDataGapFailureDetails;
  /** See ImuDataGapFailureDetails. */
  imuDataGapDetails?: ImuDataGapFailureDetails;
  /** See NotOutdoorsFailureDetails. */
  notOutdoorsDetails?: NotOutdoorsFailureDetails;
  /** See NoOverlapGpsFailureDetails. */
  noOverlapGpsDetails?: NoOverlapGpsFailureDetails;
}

export const ProcessingFailureDetails: Schema.Schema<ProcessingFailureDetails> = Schema.suspend(() => Schema.Struct({
  insufficientGpsDetails: Schema.optional(InsufficientGpsFailureDetails),
  gpsDataGapDetails: Schema.optional(GpsDataGapFailureDetails),
  imuDataGapDetails: Schema.optional(ImuDataGapFailureDetails),
  notOutdoorsDetails: Schema.optional(NotOutdoorsFailureDetails),
  noOverlapGpsDetails: Schema.optional(NoOverlapGpsFailureDetails),
})).annotate({ identifier: "ProcessingFailureDetails" }) as any as Schema.Schema<ProcessingFailureDetails>;

export interface LatLngBounds {
  /** The southwest corner of these bounds. */
  southwest?: LatLng;
  /** The northeast corner of these bounds. */
  northeast?: LatLng;
}

export const LatLngBounds: Schema.Schema<LatLngBounds> = Schema.suspend(() => Schema.Struct({
  southwest: Schema.optional(LatLng),
  northeast: Schema.optional(LatLng),
})).annotate({ identifier: "LatLngBounds" }) as any as Schema.Schema<LatLngBounds>;

export interface PhotoSequence {
  /** Output only. Unique identifier for the photo sequence. This also acts as a long running operation ID if uploading is performed asynchronously. */
  id?: string;
  /** Output only. Photos with increasing timestamps. */
  photos?: Array<Photo>;
  /** Input only. Required when creating photo sequence. The resource name where the bytes of the photo sequence (in the form of video) are uploaded. */
  uploadReference?: UploadRef;
  /** Optional. Absolute time when the photo sequence starts to be captured. If the photo sequence is a video, this is the start time of the video. If this field is populated in input, it overrides the capture time in the video or XDM file. */
  captureTimeOverride?: string;
  /** Output only. The time this photo sequence was created in uSV Store service. */
  uploadTime?: string;
  /** Input only. Raw GPS measurements with increasing timestamps from the device that aren't time synced with each photo. These raw measurements will be used to infer the pose of each frame. Required in input when InputType is VIDEO and raw GPS measurements are not in Camera Motion Metadata Track (CAMM). User can indicate which takes precedence using gps_source if raw GPS measurements are provided in both raw_gps_timeline and Camera Motion Metadata Track (CAMM). */
  rawGpsTimeline?: Array<Pose>;
  /** Input only. If both raw_gps_timeline and the Camera Motion Metadata Track (CAMM) contain GPS measurements, indicate which takes precedence. */
  gpsSource?: "PHOTO_SEQUENCE" | "CAMERA_MOTION_METADATA_TRACK" | (string & {});
  /** Input only. Three axis IMU data for the collection. If this data is too large to put in the request, then it should be put in the CAMM track for the video. This data always takes precedence over the equivalent CAMM data, if it exists. */
  imu?: Imu;
  /** Output only. The processing state of this sequence. */
  processingState?: "PROCESSING_STATE_UNSPECIFIED" | "PENDING" | "PROCESSING" | "PROCESSED" | "FAILED" | (string & {});
  /** Output only. If this sequence has processing_state = FAILED, this will contain the reason why it failed. If the processing_state is any other value, this field will be unset. */
  failureReason?: "PROCESSING_FAILURE_REASON_UNSPECIFIED" | "LOW_RESOLUTION" | "DUPLICATE" | "INSUFFICIENT_GPS" | "NO_OVERLAP_GPS" | "INVALID_GPS" | "FAILED_TO_REFINE_POSITIONS" | "TAKEDOWN" | "CORRUPT_VIDEO" | "INTERNAL" | "INVALID_VIDEO_FORMAT" | "INVALID_VIDEO_DIMENSIONS" | "INVALID_CAPTURE_TIME" | "GPS_DATA_GAP" | "JUMPY_GPS" | "INVALID_IMU" | "INSUFFICIENT_IMU" | "INSUFFICIENT_OVERLAP_TIME_SERIES" | "IMU_DATA_GAP" | "UNSUPPORTED_CAMERA" | "NOT_OUTDOORS" | "INSUFFICIENT_VIDEO_FRAMES" | "INSUFFICIENT_MOVEMENT" | "MAST_DOWN" | "CAMERA_COVERED" | (string & {});
  /** Output only. If this sequence has `failure_reason` set, this may contain additional details about the failure. */
  failureDetails?: ProcessingFailureDetails;
  /** Output only. The computed distance of the photo sequence in meters. */
  distanceMeters?: number;
  /** Output only. A rectangular box that encapsulates every image in this photo sequence. */
  sequenceBounds?: LatLngBounds;
  /** Output only. The total number of views that all the published images in this PhotoSequence have received. */
  viewCount?: string;
  /** Output only. The filename of the upload. Does not include the directory path. Only available if the sequence was uploaded on a platform that provides the filename. */
  filename?: string;
}

export const PhotoSequence: Schema.Schema<PhotoSequence> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  photos: Schema.optional(Schema.Array(Photo)),
  uploadReference: Schema.optional(UploadRef),
  captureTimeOverride: Schema.optional(Schema.String),
  uploadTime: Schema.optional(Schema.String),
  rawGpsTimeline: Schema.optional(Schema.Array(Pose)),
  gpsSource: Schema.optional(Schema.String),
  imu: Schema.optional(Imu),
  processingState: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  failureDetails: Schema.optional(ProcessingFailureDetails),
  distanceMeters: Schema.optional(Schema.Number),
  sequenceBounds: Schema.optional(LatLngBounds),
  viewCount: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
})).annotate({ identifier: "PhotoSequence" }) as any as Schema.Schema<PhotoSequence>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListPhotoSequencesResponse {
  /** List of photo sequences via Operation interface. The maximum number of items returned is based on the pageSize field in the request. Each item in the list can have three possible states, * `Operation.done` = false, if the processing of PhotoSequence is not finished yet. * `Operation.done` = true and `Operation.error` is populated, if there was an error in processing. * `Operation.done` = true and `Operation.response` contains a PhotoSequence message, In each sequence, only Id is populated. */
  photoSequences?: Array<Operation>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListPhotoSequencesResponse: Schema.Schema<ListPhotoSequencesResponse> = Schema.suspend(() => Schema.Struct({
  photoSequences: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPhotoSequencesResponse" }) as any as Schema.Schema<ListPhotoSequencesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates an upload session to start uploading photo bytes. The method uses the upload URL of the returned UploadRef to upload the bytes for the Photo. In addition to the photo requirements shown in https://support.google.com/maps/answer/7012050?ref_topic=6275604, the photo must meet the following requirements: * Photo Sphere XMP metadata must be included in the photo metadata. See https://developers.google.com/streetview/spherical-metadata for the required fields. * The pixel size of the photo must meet the size requirements listed in https://support.google.com/maps/answer/7012050?ref_topic=6275604, and the photo must be a full 360 horizontally. After the upload completes, the method uses UploadRef with CreatePhoto to create the Photo object entry. */
export interface StartUploadPhotoRequest {
  /** Request body */
  body?: Empty;
}

export const StartUploadPhotoRequest = Schema.Struct({
  body: Schema.optional(Empty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/photo:startUpload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartUploadPhotoRequest>;

export type StartUploadPhotoResponse = UploadRef;
export const StartUploadPhotoResponse = UploadRef;

export type StartUploadPhotoError = CommonErrors;

export const startUploadPhoto: API.OperationMethod<StartUploadPhotoRequest, StartUploadPhotoResponse, StartUploadPhotoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartUploadPhotoRequest,
  output: StartUploadPhotoResponse,
  errors: [],
}));

/** After the client finishes uploading the photo with the returned UploadRef, CreatePhoto publishes the uploaded Photo to Street View on Google Maps. Currently, the only way to set heading, pitch, and roll in CreatePhoto is through the [Photo Sphere XMP metadata](https://developers.google.com/streetview/spherical-metadata) in the photo bytes. CreatePhoto ignores the `pose.heading`, `pose.pitch`, `pose.roll`, `pose.altitude`, and `pose.level` fields in Pose. This method returns the following error codes: * google.rpc.Code.INVALID_ARGUMENT if the request is malformed or if the uploaded photo is not a 360 photo. * google.rpc.Code.NOT_FOUND if the upload reference does not exist. * google.rpc.Code.RESOURCE_EXHAUSTED if the account has reached the storage limit. */
export interface CreatePhotoRequest {
  /** Request body */
  body?: Photo;
}

export const CreatePhotoRequest = Schema.Struct({
  body: Schema.optional(Photo).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/photo", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePhotoRequest>;

export type CreatePhotoResponse = Photo;
export const CreatePhotoResponse = Photo;

export type CreatePhotoError = CommonErrors;

export const createPhoto: API.OperationMethod<CreatePhotoRequest, CreatePhotoResponse, CreatePhotoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePhotoRequest,
  output: CreatePhotoResponse,
  errors: [],
}));

/** Gets the metadata of the specified Photo. This method returns the following error codes: * google.rpc.Code.PERMISSION_DENIED if the requesting user did not create the requested Photo. * google.rpc.Code.NOT_FOUND if the requested Photo does not exist. * google.rpc.Code.UNAVAILABLE if the requested Photo is still being indexed. */
export interface GetPhotoRequest {
  /** Required. ID of the Photo. */
  photoId: string;
  /** Required. Specifies if a download URL for the photo bytes should be returned in the Photo response. */
  view?: "BASIC" | "INCLUDE_DOWNLOAD_URL" | (string & {});
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. If language_code is unspecified, the user's language preference for Google services is used. */
  languageCode?: string;
}

export const GetPhotoRequest = Schema.Struct({
  photoId: Schema.String.pipe(T.HttpPath("photoId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/photo/{photoId}" }),
  svc,
) as unknown as Schema.Schema<GetPhotoRequest>;

export type GetPhotoResponse = Photo;
export const GetPhotoResponse = Photo;

export type GetPhotoError = CommonErrors;

export const getPhoto: API.OperationMethod<GetPhotoRequest, GetPhotoResponse, GetPhotoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPhotoRequest,
  output: GetPhotoResponse,
  errors: [],
}));

/** Updates the metadata of a Photo, such as pose, place association, connections, etc. Changing the pixels of a photo is not supported. Only the fields specified in the updateMask field are used. If `updateMask` is not present, the update applies to all fields. This method returns the following error codes: * google.rpc.Code.PERMISSION_DENIED if the requesting user did not create the requested photo. * google.rpc.Code.INVALID_ARGUMENT if the request is malformed. * google.rpc.Code.NOT_FOUND if the requested photo does not exist. * google.rpc.Code.UNAVAILABLE if the requested Photo is still being indexed. */
export interface UpdatePhotoRequest_Op {
  /** A unique identifier for a photo. */
  id: string;
  /** Required. Mask that identifies fields on the photo metadata to update. If not present, the old Photo metadata is entirely replaced with the new Photo metadata in this request. The update fails if invalid fields are specified. Multiple fields can be specified in a comma-delimited list. The following fields are valid: * `pose.heading` * `pose.lat_lng_pair` * `pose.pitch` * `pose.roll` * `pose.level` * `pose.altitude` * `connections` * `places` > Note: When updateMask contains repeated fields, the entire set of repeated values get replaced with the new contents. For example, if updateMask contains `connections` and `UpdatePhotoRequest.photo.connections` is empty, all connections are removed. */
  updateMask?: string;
  /** Request body */
  body?: Photo;
}

export const UpdatePhotoRequest_Op = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Photo).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/photo/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePhotoRequest_Op>;

export type UpdatePhotoResponse = Photo;
export const UpdatePhotoResponse = Photo;

export type UpdatePhotoError = CommonErrors;

export const updatePhoto: API.OperationMethod<UpdatePhotoRequest_Op, UpdatePhotoResponse, UpdatePhotoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePhotoRequest_Op,
  output: UpdatePhotoResponse,
  errors: [],
}));

/** Deletes a Photo and its metadata. This method returns the following error codes: * google.rpc.Code.PERMISSION_DENIED if the requesting user did not create the requested photo. * google.rpc.Code.NOT_FOUND if the photo ID does not exist. */
export interface DeletePhotoRequest {
  /** Required. ID of the Photo. */
  photoId: string;
}

export const DeletePhotoRequest = Schema.Struct({
  photoId: Schema.String.pipe(T.HttpPath("photoId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/photo/{photoId}" }),
  svc,
) as unknown as Schema.Schema<DeletePhotoRequest>;

export type DeletePhotoResponse = Empty;
export const DeletePhotoResponse = Empty;

export type DeletePhotoError = CommonErrors;

export const deletePhoto: API.OperationMethod<DeletePhotoRequest, DeletePhotoResponse, DeletePhotoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePhotoRequest,
  output: DeletePhotoResponse,
  errors: [],
}));

/** Gets the metadata of the specified Photo batch. Note that if BatchGetPhotos fails, either critical fields are missing or there is an authentication error. Even if BatchGetPhotos succeeds, individual photos in the batch may have failures. These failures are specified in each PhotoResponse.status in BatchGetPhotosResponse.results. See GetPhoto for specific failures that can occur per photo. */
export interface BatchGetPhotosRequest {
  /** Required. IDs of the Photos. For HTTP GET requests, the URL query parameter should be `photoIds=&photoIds=&...`. */
  photoIds?: string[];
  /** Required. Specifies if a download URL for the photo bytes should be returned in the Photo response. */
  view?: "BASIC" | "INCLUDE_DOWNLOAD_URL" | (string & {});
  /** Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. If language_code is unspecified, the user's language preference for Google services is used. */
  languageCode?: string;
}

export const BatchGetPhotosRequest = Schema.Struct({
  photoIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("photoIds")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/photos:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetPhotosRequest>;

export type BatchGetPhotosResponse_Op = BatchGetPhotosResponse;
export const BatchGetPhotosResponse_Op = BatchGetPhotosResponse;

export type BatchGetPhotosError = CommonErrors;

export const batchGetPhotos: API.OperationMethod<BatchGetPhotosRequest, BatchGetPhotosResponse_Op, BatchGetPhotosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetPhotosRequest,
  output: BatchGetPhotosResponse_Op,
  errors: [],
}));

/** Lists all the Photos that belong to the user. > Note: Recently created photos that are still being indexed are not returned in the response. */
export interface ListPhotosRequest {
  /** Required. Specifies if a download URL for the photos bytes should be returned in the Photos response. */
  view?: "BASIC" | "INCLUDE_DOWNLOAD_URL" | (string & {});
  /** Optional. The maximum number of photos to return. `pageSize` must be non-negative. If `pageSize` is zero or is not provided, the default page size of 100 is used. The number of photos returned in the response may be less than `pageSize` if the number of photos that belong to the user is less than `pageSize`. */
  pageSize?: number;
  /** Optional. The nextPageToken value returned from a previous ListPhotos request, if any. */
  pageToken?: string;
  /** Optional. The filter expression. For example: `placeId=ChIJj61dQgK6j4AR4GeTYWZsKWw`. The filters supported are: `placeId`, `min_latitude`, `max_latitude`, `min_longitude`, `max_longitude`. See https://google.aip.dev/160 for more information. */
  filter?: string;
  /** Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. If language_code is unspecified, the user's language preference for Google services is used. */
  languageCode?: string;
}

export const ListPhotosRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/photos" }),
  svc,
) as unknown as Schema.Schema<ListPhotosRequest>;

export type ListPhotosResponse_Op = ListPhotosResponse;
export const ListPhotosResponse_Op = ListPhotosResponse;

export type ListPhotosError = CommonErrors;

export const listPhotos = API.makePaginated(() => ({
  input: ListPhotosRequest,
  output: ListPhotosResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the metadata of Photos, such as pose, place association, connections, etc. Changing the pixels of photos is not supported. Note that if BatchUpdatePhotos fails, either critical fields are missing or there is an authentication error. Even if BatchUpdatePhotos succeeds, individual photos in the batch may have failures. These failures are specified in each PhotoResponse.status in BatchUpdatePhotosResponse.results. See UpdatePhoto for specific failures that can occur per photo. Only the fields specified in updateMask field are used. If `updateMask` is not present, the update applies to all fields. The number of UpdatePhotoRequest messages in a BatchUpdatePhotosRequest must not exceed 20. > Note: To update Pose.altitude, Pose.latLngPair has to be filled as well. Otherwise, the request will fail. */
export interface BatchUpdatePhotosRequest_Op {
  /** Request body */
  body?: BatchUpdatePhotosRequest;
}

export const BatchUpdatePhotosRequest_Op = Schema.Struct({
  body: Schema.optional(BatchUpdatePhotosRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/photos:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdatePhotosRequest_Op>;

export type BatchUpdatePhotosResponse_Op = BatchUpdatePhotosResponse;
export const BatchUpdatePhotosResponse_Op = BatchUpdatePhotosResponse;

export type BatchUpdatePhotosError = CommonErrors;

export const batchUpdatePhotos: API.OperationMethod<BatchUpdatePhotosRequest_Op, BatchUpdatePhotosResponse_Op, BatchUpdatePhotosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdatePhotosRequest_Op,
  output: BatchUpdatePhotosResponse_Op,
  errors: [],
}));

/** Deletes a list of Photos and their metadata. Note that if BatchDeletePhotos fails, either critical fields are missing or there is an authentication error. Even if BatchDeletePhotos succeeds, individual photos in the batch may have failures. These failures are specified in each PhotoResponse.status in BatchDeletePhotosResponse.results. See DeletePhoto for specific failures that can occur per photo. */
export interface BatchDeletePhotosRequest_Op {
  /** Request body */
  body?: BatchDeletePhotosRequest;
}

export const BatchDeletePhotosRequest_Op = Schema.Struct({
  body: Schema.optional(BatchDeletePhotosRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/photos:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeletePhotosRequest_Op>;

export type BatchDeletePhotosResponse_Op = BatchDeletePhotosResponse;
export const BatchDeletePhotosResponse_Op = BatchDeletePhotosResponse;

export type BatchDeletePhotosError = CommonErrors;

export const batchDeletePhotos: API.OperationMethod<BatchDeletePhotosRequest_Op, BatchDeletePhotosResponse_Op, BatchDeletePhotosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeletePhotosRequest_Op,
  output: BatchDeletePhotosResponse_Op,
  errors: [],
}));

/** Creates an upload session to start uploading photo sequence data. The upload URL of the returned UploadRef is used to upload the data for the `photoSequence`. After the upload is complete, the UploadRef is used with CreatePhotoSequence to create the PhotoSequence object entry. */
export interface StartUploadPhotoSequenceRequest {
  /** Request body */
  body?: Empty;
}

export const StartUploadPhotoSequenceRequest = Schema.Struct({
  body: Schema.optional(Empty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/photoSequence:startUpload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartUploadPhotoSequenceRequest>;

export type StartUploadPhotoSequenceResponse = UploadRef;
export const StartUploadPhotoSequenceResponse = UploadRef;

export type StartUploadPhotoSequenceError = CommonErrors;

export const startUploadPhotoSequence: API.OperationMethod<StartUploadPhotoSequenceRequest, StartUploadPhotoSequenceResponse, StartUploadPhotoSequenceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartUploadPhotoSequenceRequest,
  output: StartUploadPhotoSequenceResponse,
  errors: [],
}));

/** After the client finishes uploading the PhotoSequence with the returned UploadRef, CreatePhotoSequence extracts a sequence of 360 photos from a video or Extensible Device Metadata (XDM, http://www.xdm.org/) to be published to Street View on Google Maps. `CreatePhotoSequence` returns an Operation, with the PhotoSequence Id set in the `Operation.name` field. This method returns the following error codes: * google.rpc.Code.INVALID_ARGUMENT if the request is malformed. * google.rpc.Code.NOT_FOUND if the upload reference does not exist. */
export interface CreatePhotoSequenceRequest {
  /** Required. The input form of PhotoSequence. */
  inputType?: "INPUT_TYPE_UNSPECIFIED" | "VIDEO" | "XDM" | (string & {});
  /** Request body */
  body?: PhotoSequence;
}

export const CreatePhotoSequenceRequest = Schema.Struct({
  inputType: Schema.optional(Schema.String).pipe(T.HttpQuery("inputType")),
  body: Schema.optional(PhotoSequence).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/photoSequence", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePhotoSequenceRequest>;

export type CreatePhotoSequenceResponse = Operation;
export const CreatePhotoSequenceResponse = Operation;

export type CreatePhotoSequenceError = CommonErrors;

export const createPhotoSequence: API.OperationMethod<CreatePhotoSequenceRequest, CreatePhotoSequenceResponse, CreatePhotoSequenceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePhotoSequenceRequest,
  output: CreatePhotoSequenceResponse,
  errors: [],
}));

/** Gets the metadata of the specified PhotoSequence via the Operation interface. This method returns the following three types of responses: * `Operation.done` = false, if the processing of PhotoSequence is not finished yet. * `Operation.done` = true and `Operation.error` is populated, if there was an error in processing. * `Operation.done` = true and `Operation.response` is poulated, which contains a PhotoSequence message. This method returns the following error codes: * google.rpc.Code.PERMISSION_DENIED if the requesting user did not create the requested PhotoSequence. * google.rpc.Code.NOT_FOUND if the requested PhotoSequence does not exist. */
export interface GetPhotoSequenceRequest {
  /** Required. ID of the photo sequence. */
  sequenceId: string;
  /** Specifies if a download URL for the photo sequence should be returned in `download_url` of individual photos in the PhotoSequence response. > Note: Currently not implemented. */
  view?: "BASIC" | "INCLUDE_DOWNLOAD_URL" | (string & {});
  /** Optional. The filter expression. For example: `published_status=PUBLISHED`. The filters supported are: `published_status`. See https://google.aip.dev/160 for more information. */
  filter?: string;
}

export const GetPhotoSequenceRequest = Schema.Struct({
  sequenceId: Schema.String.pipe(T.HttpPath("sequenceId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/photoSequence/{sequenceId}" }),
  svc,
) as unknown as Schema.Schema<GetPhotoSequenceRequest>;

export type GetPhotoSequenceResponse = Operation;
export const GetPhotoSequenceResponse = Operation;

export type GetPhotoSequenceError = CommonErrors;

export const getPhotoSequence: API.OperationMethod<GetPhotoSequenceRequest, GetPhotoSequenceResponse, GetPhotoSequenceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPhotoSequenceRequest,
  output: GetPhotoSequenceResponse,
  errors: [],
}));

/** Deletes a PhotoSequence and its metadata. This method returns the following error codes: * google.rpc.Code.PERMISSION_DENIED if the requesting user did not create the requested photo sequence. * google.rpc.Code.NOT_FOUND if the photo sequence ID does not exist. * google.rpc.Code.FAILED_PRECONDITION if the photo sequence ID is not yet finished processing. */
export interface DeletePhotoSequenceRequest {
  /** Required. ID of the PhotoSequence. */
  sequenceId: string;
}

export const DeletePhotoSequenceRequest = Schema.Struct({
  sequenceId: Schema.String.pipe(T.HttpPath("sequenceId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/photoSequence/{sequenceId}" }),
  svc,
) as unknown as Schema.Schema<DeletePhotoSequenceRequest>;

export type DeletePhotoSequenceResponse = Empty;
export const DeletePhotoSequenceResponse = Empty;

export type DeletePhotoSequenceError = CommonErrors;

export const deletePhotoSequence: API.OperationMethod<DeletePhotoSequenceRequest, DeletePhotoSequenceResponse, DeletePhotoSequenceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePhotoSequenceRequest,
  output: DeletePhotoSequenceResponse,
  errors: [],
}));

/** Lists all the PhotoSequences that belong to the user, in descending CreatePhotoSequence timestamp order. */
export interface ListPhotoSequencesRequest {
  /** Optional. The maximum number of photo sequences to return. `pageSize` must be non-negative. If `pageSize` is zero or is not provided, the default page size of 100 is used. The number of photo sequences returned in the response may be less than `pageSize` if the number of matches is less than `pageSize`. This is currently unimplemented but is in process. */
  pageSize?: number;
  /** Optional. The nextPageToken value returned from a previous ListPhotoSequences request, if any. */
  pageToken?: string;
  /** Optional. The filter expression. For example: `imagery_type=SPHERICAL`. The filters supported are: `imagery_type`, `processing_state`, `min_latitude`, `max_latitude`, `min_longitude`, `max_longitude`, `filename_query`, `min_capture_time_seconds`, `max_capture_time_seconds. See https://google.aip.dev/160 for more information. Filename queries should sent as a Phrase in order to support multiple words and special characters by adding escaped quotes. Ex: filename_query="example of a phrase.mp4" */
  filter?: string;
}

export const ListPhotoSequencesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/photoSequences" }),
  svc,
) as unknown as Schema.Schema<ListPhotoSequencesRequest>;

export type ListPhotoSequencesResponse_Op = ListPhotoSequencesResponse;
export const ListPhotoSequencesResponse_Op = ListPhotoSequencesResponse;

export type ListPhotoSequencesError = CommonErrors;

export const listPhotoSequences = API.makePaginated(() => ({
  input: ListPhotoSequencesRequest,
  output: ListPhotoSequencesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

